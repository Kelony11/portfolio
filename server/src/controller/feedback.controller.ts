import { Request, Response } from "express";
import { createFeedbackService } from "../services/feedback.service";
import { sendPortfolioEmail } from "../utils/mailer";
import { feedbackTemplate } from "../utils/emailTemplates";

export const createFeedBackController = async (req: Request, res: Response) => {
  try {
    const result = await createFeedbackService(req.body);
    const data = result.toObject();

    await sendPortfolioEmail({
      type: "FEEDBACK",
      subject: "📥 Portfolio Alert: New feedback received",
      html: feedbackTemplate(data),
    });

    return res.status(201).json({ ok: true, data });
  } catch (err) {
    console.error("❌ /api/feedback error:", err);
    return res.status(500).json({ ok: false, error: "SERVER_ERROR" });
  }
};
