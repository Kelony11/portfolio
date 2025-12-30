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

// CORS (allow your react dev server)
app.use(
    cors({
        origin: ["http://localhost:5174"], 
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

        const doc = await Contact.create({
            name,
            email, 
            message,
            phone: phone || undefined,
            phoneType: phoneType || undefined,
            wantsReply: wantsReply === "yes",
        });

        return res.status(201).json({ ok: true, id: doc._id });

    } catch (err) {
        return res.status(500).json({ ok: false, error: "❌ Server error" });
    }

});
