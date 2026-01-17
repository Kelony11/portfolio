import { Request, Response } from "express";
import { createContactService } from "../services/contact.service";

export const createContactController = async (req: Request, res: Response) => {

    try {
        const result = await createContactService(req.body, res, req);
        
        return res.status(201).json({ ok: true, data: result });

    } catch (err) {
        console.error("❌ /api/contact error:", err);
        return res.status(500).json({ ok: false, error: "SERVER_ERROR" });
    }
}