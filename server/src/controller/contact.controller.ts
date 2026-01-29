import { Request, Response } from "express";
import { createContactService } from "../services/contact.service";
import { sendPortfolioEmail } from "../utils/mailer";
import { contactTemplate, visitorTemplate } from "../utils/emailTemplates";


export const createContactController = async (req: Request, res: Response) => {

    // Contact router ( for mailing contact from submission)

    try {
        // Save to MongoDB (service)
        const result = await createContactService(req.body, res, req);
        const data = result.toObject();
        
        // 1) Send email to myself 
        await sendPortfolioEmail({
            type: "CONTACT",
            subject: `📥 Portfolio Alert: ${result.name} sent a message`,
            html: contactTemplate(data),
        })

        // 2) Auto-reply the visitor (Contact Section)
        if (data.wantsReply && data.email) {
            await sendPortfolioEmail({
                type: "CONTACT",
                to: data.email,
                ...(process.env.MAIL_TO ? { replyTo: process.env.MAIL_TO } : {}),
                subject: "Thanks for reaching out. Message received.",
                html: visitorTemplate(data),
            })
        }



        // Respond to frontend
        return res.status(201).json({ ok: true, data });

    } catch (err) {
        console.error("❌ /api/contact error:", err);
        return res.status(500).json({ ok: false, error: "SERVER_ERROR" });
    }
}