import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";

// External functions import 
import { connectDB } from "./db";
import { Contact } from "./models/ContactSchema";

dotenv.config();

const app = express();
const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;
const MONGODB_URI = process.env.MONGODB_URI || "";

// Connect to MongoDB
connectDB(MONGODB_URI).catch((err) => {
    console.error("❌ Error: Could not connect to MongoDB", err);
    process.exit(1);
});

// Security headers
app.use(helmet());

// Parse Json bodies
app.use(express.json({ limit: "64kb" }));

// Alllow mutliple dev ports (localhost) 
const allowedOrigins = [process.env.CLIENT_URL].filter(
    (origin): origin is string => Boolean(origin)
);

// CORS (allow your react dev server)
app.use(
    cors({
        origin: (origin, callback) => {
            // allow non-browser tools (curl/postman) with no origin 
            if (!origin) return callback(null, true);
            if (allowedOrigins.includes(origin)) return callback(null, true);

            return callback(new Error(`❌ CORS blocked: ${origin}`));
        }, 
        methods: ["GET", "POST", "PUT", "DELETE"],
    })
);

// Health check
app.get("/health", (_req, res) => {
    res.json({
        ok: true,
        service: "portfolio-backend",
        timestamp: new Date().toISOString(),
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`✅ Success: Backend running on http://localhost:${PORT}`);
});



// Function: Post info from frontend to the Database
app.post("/api/contact", async (req, res) => {
    
    try {
        const { name, email, message, phone, phoneType, wantsReply } = req.body;

        if (!name || !email || !message ) {
            return res.status(400).json({ ok: false, error: "Missing fields" });
        }

        // ENFORCING " 1 Message per 7 days" check 

        // 7 days, 24 Hours, 60 Minutes, 1000 millisec.
        const SEVEN_DAYS_MS = 7 * 24 * 60 * 1000;
        
        const since = new Date(Date.now() - SEVEN_DAYS_MS)

        const recent = await Contact.findOne({
            email: email.toLowerCase().trim(),
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
            email: email.toLowerCase().trim(), 
            message,
            phone: phone || undefined,
            phoneType: phoneType || undefined,
            wantsReply: wantsReply === "yes" || wantsReply === true,
        });

        return res.status(201).json({ ok: true, id: doc._id });

    } catch (err) {
        return res.status(500).json({ ok: false, error: "❌ Server error" });
    }

});
