import axios from "axios";

type TurnstileResponse = {
  success: boolean;
  "error-codes"?: string[];
  messages?: string[];
};

export async function verifyTurnstile(token: string, ip?: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY;

  if (!secret) {
    console.error("❌ TURNSTILE_SECRET_KEY is missing");
    return { success: false };
  }

  const data = new URLSearchParams({
    secret,
    response: token,
  });

  if (ip) data.append("remoteip", ip);

  try {
    const resp = await axios.post<TurnstileResponse>(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      data.toString(),
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        // ✅ KEY FIX: do NOT throw on 400
        validateStatus: () => true,
      }
    );

    return resp.data; // { success:false, error-codes:[...] } is fine
  } catch (err) {
    console.error("❌ Turnstile request failed:", err);
    return { success: false };
  }
}
