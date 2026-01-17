import { Request, Response } from "express";
import { createFeedbackService } from "../services/feedback.service";

export const createFeedBackController = async (req: Request, res: Response) => {
    try {
        
        const data = await createFeedbackService(req.body);
        return res.status(201).json({ ok: true, data });
    } catch (err) {
        console.error("❌ /api/feedback error:", err);

        return res.status(500).json({ ok: false, error: "SERVER_ERROR" });
    }
}