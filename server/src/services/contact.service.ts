import { Contact } from "../models/ContactSchema";
import { verifyTurnstile } from "../turnstile";

export const createContactService = async (data: any, res: any, req: any) => {
    const {
        name,
        email,
        message,
        phone,
        phoneType,
        wantsReply,
        turnstileToken,
        company,
    } = data;

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

    const ip =
        (req.headers["cf-connecting-ip"] as string) ||
        (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() ||
        req.ip;


    const result = await verifyTurnstile(turnstileToken, ip);

    if (!result.success) {
        throw new Error("Captcha verification failed.");

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

        throw new Error("You can only send one message every 7 days.");
    }

    const doc = await Contact.create({
        name,
        email: normalizedEmail,
        message,
        phone: phone || undefined,
        phoneType: phoneType || undefined,
        wantsReply: wantsReply === "yes" || wantsReply === true,
    });

    return doc

}