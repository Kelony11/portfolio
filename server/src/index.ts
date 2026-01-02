import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import { verifyTurnstile } from "./turnstile";
import rateLimit from "express-rate-limit";

// External functions import 
import { connectDB } from "./db";
import { Contact } from "./models/ContactSchema";

dotenv.config();

const app = express();
const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;
const MONGODB_URI = process.env.MONGODB_URI || "";

// To avoid Spamming messages by the same user
const contactLimiter = rateLimit({
    // 10 min timer
    windowMs: 10 * 60 * 1000,
    max: 10,     // 10 request per IP per 10 min
    standardHeaders: true,
    legacyHeaders: false,

});


// Connect to MongoDB
connectDB(MONGODB_URI).catch((err) => {
    console.error("❌ Error: Could not connect to MongoDB", err);
    process.exit(1);
});

// Security headers
app.use(helmet());

// rate limiting anti-bot layer
app.use("/api/contact", contactLimiter);


// Parse Json bodies
app.use(express.json({ limit: "64kb" }));

// Allow multiple dev ports + optional env var
const allowedOrigins = [
  "http://localhost:5173", // Vite dev server
  "http://127.0.0.1:5173",
];

app.use(
  cors({
    origin: (origin, callback) => {
      // allow server-to-server & tools like curl/Postman
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "OPTIONS"],
    credentials: true,
  })
);

// IMPORTANT: Allow preflight requests
app.use(cors({
  origin: ["http://localhost:5173"],
  methods: ["GET","POST","PUT","DELETE"],
  credentials: true,
}));



// Health check
app.get("/health", (_req, res) => {
    res.json({
        ok: true,
        service: "portfolio-backend",
        timestamp: new Date().toISOString(),
    });
});

// 

// Start Server
app.listen(PORT, () => {
    console.log(`✅ Success: Backend running on http://localhost:${PORT}`);
});



// Function: Post info from frontend to the Database
app.post("/api/contact", async (req, res) => {
    // ✅ Allow CORS preflight
    if (req.method === "OPTIONS") {
        return res.sendStatus(204);
    }
    
    try {
        // Input variables
        const { name, email, message, phone, phoneType, wantsReply, turnstileToken, company } = req.body;

        // Honeypot (act like success)
        if (company) return res.status(200).json({ ok: true });

        if (!name || !email || !message ) {
            return res.status(400).json({ ok: false, error: "MISSING_FIELDS" });
        }

        // CAPTCHA check first before 7-day limit and accepting the message
        if (!turnstileToken) {
            return res.status(400).json({ ok: false, error: "CAPTCHA_REQUIRED"});
        }

        // Turnstile verify: using correct client IP 
        const ip = 
            (req.headers["cf-connecting-ip"] as string) ||
            (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() ||
            req.ip;

        const result = await verifyTurnstile(turnstileToken, ip);

        if (!result.success) {
            return res.status(400).json({ 
                ok: false,
                error: "CAPTCHA_FAILED",
                message:  "Captcha failed. Please try again.",
            });
        }

        const normalizedEmail = String(email).toLowerCase().trim();

        // ENFORCING " 1 Message per 7 days" check 

        // 7 days, 24 Hours, 60 Minutes, 1000 millisec.
        const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;
        
        const since = new Date(Date.now() - SEVEN_DAYS_MS);

        const recent = await Contact.findOne({
            email: normalizedEmail,
            createdAt: { $gte: since }, 
        }).sort({ createdAt: -1 });

        if (recent) {
            const nextAllowedAt = new Date(recent.createdAt.getTime() + SEVEN_DAYS_MS);

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
