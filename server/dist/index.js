"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const turnstile_1 = require("./turnstile");
const db_1 = require("./db");
const ContactSchema_1 = require("./models/ContactSchema");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;
const MONGODB_URI = process.env.MONGODB_URI || "";
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
];
app.use((0, cors_1.default)({
    origin: allowedOrigins,
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
}));
// app.options("*", cors());
/* =========================
   Security & Parsing
========================= */
// Security headers - configure helmet to not interfere with CORS
app.use((0, helmet_1.default)({
    crossOriginResourcePolicy: { policy: "cross-origin" },
    crossOriginEmbedderPolicy: false,
}));
// Parse JSON with size limit (safe for contact forms)
app.use(express_1.default.json({ limit: "50kb" }));
/* =========================
   Rate limiting (contact only)
========================= */
const contactLimiter = (0, express_rate_limit_1.default)({
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
        const { name, email, message, phone, phoneType, wantsReply, turnstileToken, company, } = req.body;
        // Honeypot (bots think they succeeded)
        if (company)
            return res.status(200).json({ ok: true });
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
        const ip = req.headers["cf-connecting-ip"] ||
            req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
            req.ip;
        const result = await (0, turnstile_1.verifyTurnstile)(turnstileToken, ip);
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
        const recent = await ContactSchema_1.Contact.findOne({
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
        const doc = await ContactSchema_1.Contact.create({
            name,
            email: normalizedEmail,
            message,
            phone: phone || undefined,
            phoneType: phoneType || undefined,
            wantsReply: wantsReply === "yes" || wantsReply === true,
        });
        return res.status(201).json({ ok: true, id: doc._id });
    }
    catch (err) {
        console.error("❌ /api/contact error:", err);
        return res.status(500).json({ ok: false, error: "SERVER_ERROR" });
    }
});
/* =========================
   Start Server AFTER DB
========================= */
(0, db_1.connectDB)(MONGODB_URI)
    .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(PORT, () => {
        console.log(`✅ Backend running on port ${PORT}`);
    });
})
    .catch((err) => {
    console.error("❌ MongoDB connection failed:", err);
    process.exit(1);
});
//# sourceMappingURL=index.js.map