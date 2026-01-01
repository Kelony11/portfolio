import axios from "axios";

// Creating a Turnstile verification helper

export async function verifyTurnstile(token: string, remoteip?: string) {
    const secret = process.env.TURNSTILE_SECRET_KEY;

    if (!secret) throw new Error("Missing TURNSTILE_SECRET_KEY");

    const body = new URLSearchParams();

    body.append("secret", secret);
    body.append("response", token);

    if (remoteip) body.append("remoteip", remoteip);

    const resp = await axios.post(
        "https://challenges.cloudflare.com/turnstile/v0/siteverify",
        body
    );

    return resp.data as { success: boolean; ["error-codes"]?: string[] };
}