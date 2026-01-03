import axios from "axios";

type TurnstileResult = {
  success: boolean;
  errorCodes?: string[];
};

export async function verifyTurnstile(
  token: string,
  remoteip?: string
): Promise<TurnstileResult> {
  const secret = process.env.TURNSTILE_SECRET_KEY;

  if (!secret) {
    console.error("❌ TURNSTILE_SECRET_KEY is missing");
    return { success: false, errorCodes: ["missing-secret"] };
  }

  try {
    const body = new URLSearchParams({
      secret,
      response: token,
    });

    if (remoteip) {
      body.append("remoteip", remoteip);
    }

    const response = await axios.post(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      body.toString(),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        timeout: 5000, // prevents EB from hanging → 500 errors
      }
    );

    return {
      success: Boolean(response.data?.success),
      errorCodes: response.data?.["error-codes"],
    };
  } catch (err: any) {
    console.error("❌ Turnstile verification failed:", err.message);
    return { success: false, errorCodes: ["request-failed"] };
  }
}
