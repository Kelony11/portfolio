import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";

import { verifyTurnstile } from "./turnstile";
import { connectDB } from "./db";
import { Contact } from "./models/ContactSchema";

dotenv.config();

// Validate required environment variables
if (!process.env.MONGODB_URI) {
  console.error("❌ MONGODB_URI is required in environment variables");
  process.exit(1);
}

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 8080;
const MONGODB_URI = process.env.MONGODB_URI;
const NODE_ENV = process.env.NODE_ENV || 'development';

/* =========================
   CORS (Put BEFORE helmet!)
========================= */

const allowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://10.0.0.31:5173",
  "http://172.16.1.153:5173",
  "https://kelvinihezue.com",
  "https://www.kelvinihezue.com",
  "http://localhost:5173/"
];

app.set("trust proxy", 1);

app.use(cors({
  origin: NODE_ENV === 'production' ? allowedOrigins : '*',
  credentials: true,
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
/* =========================
   Security & Parsing
========================= */

// Security headers - configure helmet to not interfere with CORS
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" },
  crossOriginEmbedderPolicy: false,
}));

// Parse JSON with size limit (safe for contact forms)
app.use(express.json({ limit: "50kb" }));

/* =========================
   Rate limiting (contact only)
========================= */

const contactLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    ok: false,
    error: "RATE_LIMIT",
    message: "Too many requests. Try again later.",
  },
});

/* =========================
   Health Check (AWS uses this)
========================= */

app.get("/", (_req, res) => {
  res.status(200).send("OK");
});

app.get("/health", (_req, res) => {
  res.status(200).json({
    ok: true,
    service: "portfolio-backend",
    status: "up",
    timestamp: new Date().toISOString(),
  });
});

/* =========================
   Contact Endpoint
========================= */


app.post("/api/contact", contactLimiter, async (req, res) => {

  try {
    const {
      name,
      email,
      message,
      phone,
      phoneType,
      wantsReply,
      turnstileToken,
      company,
    } = req.body;

    // if (process.env.NODE_ENV){ 

    // }

    // Honeypot (bots think they succeeded)
    if (company) return res.status(200).json({ ok: true });

    if (!name || !email || !message) {
      return res.status(400).json({ ok: false, error: "MISSING_FIELDS" });
    }

    if (!turnstileToken) {
      return res.status(400).json({
        ok: false,
        error: "CAPTCHA_REQUIRED",
        message: "Captcha required.",
      });
    }

    // Get client IP safely (Cloudflare / proxy / local)
    const ip =
      (req.headers["cf-connecting-ip"] as string) ||
      (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() ||
      req.ip;


    const result = await verifyTurnstile(turnstileToken, ip);

    if (!result.success) {
      return res.status(400).json({
        ok: false,
        error: "CAPTCHA_FAILED",
        message: "Captcha failed. Please try again.",
      });
    }

    const normalizedEmail = String(email).toLowerCase().trim();

    // Enforce 1 message per 7 days
    const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;
    const since = new Date(Date.now() - SEVEN_DAYS_MS);

    const recent = await Contact.findOne({
      email: normalizedEmail,
      createdAt: { $gte: since },
    }).sort({ createdAt: -1 });

    if (recent) {
      const nextAllowedAt = new Date(
        recent.createdAt.getTime() + SEVEN_DAYS_MS
      );

      return res.status(429).json({
        ok: false,
        error: "MESSAGE_LIMIT",
        message: "You can only send one message every 7 days.",
        nextAllowedAt: nextAllowedAt.toISOString(),
      });
    }

    const doc = await Contact.create({
      name,
      email: normalizedEmail,
      message,
      phone: phone || undefined,
      phoneType: phoneType || undefined,
      wantsReply: wantsReply === "yes" || wantsReply === true,
    });

    return res.status(201).json({ ok: true, id: doc._id });
  } catch (err) {
    console.error("❌ /api/contact error:", err);
    return res.status(500).json({ ok: false, error: "SERVER_ERROR" });
  }
});

/* =========================
   Start Server AFTER DB
========================= */

let server: ReturnType<typeof app.listen>;

async function startServer() {
  try {
    // Connect to database first
    await connectDB(MONGODB_URI, {
      reuseExisting: true,
      label: NODE_ENV,
    });
    
    // Start server only after successful DB connection
    server = app.listen(PORT, '0.0.0.0', () => {
      console.log(`✅ Server running on port ${PORT} in ${NODE_ENV} mode`);
      console.log(`✅ Health check: http://localhost:${PORT}/health`);
    });
    
    // Handle server errors
    server.on('error', (error: NodeJS.ErrnoException) => {
      if (error.code === 'EADDRINUSE') {
        console.error(`❌ Port ${PORT} is already in use`);
      } else {
        console.error('❌ Server error:', error);
      }
      process.exit(1);
    });
    
  } catch (err) {
    console.error("❌ Failed to start server:", err);
    process.exit(1);
  }
}

/* =========================
   Graceful Shutdown
========================= */

async function gracefulShutdown(signal: string) {
  console.log(`\n⚠️  ${signal} received. Starting graceful shutdown...`);
  
  // Close server to stop accepting new connections
  if (server) {
    server.close(() => {
      console.log('✅ HTTP server closed');
    });
  }
  
  // Close database connection
  try {
    const mongoose = await import('mongoose');
    await mongoose.default.connection.close();
    console.log('✅ Database connection closed');
  } catch (err) {
    console.error('❌ Error closing database:', err);
  }
  
  process.exit(0);
}

// Handle graceful shutdown signals
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// Handle uncaught errors
process.on('uncaughtException', (err) => {
  console.error('❌ Uncaught Exception:', err);
  gracefulShutdown('UNCAUGHT_EXCEPTION');
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
  gracefulShutdown('UNHANDLED_REJECTION');
});

// Start the application
startServer();