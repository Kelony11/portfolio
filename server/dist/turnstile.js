"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyTurnstile = verifyTurnstile;
const axios_1 = __importDefault(require("axios"));
// Creating a Turnstile verification helper
async function verifyTurnstile(token, remoteip) {
    const secret = process.env.TURNSTILE_SECRET_KEY;
    if (!secret)
        throw new Error("Missing TURNSTILE_SECRET_KEY");
    const body = new URLSearchParams();
    body.append("secret", secret);
    body.append("response", token);
    if (remoteip)
        body.append("remoteip", remoteip);
    const resp = await axios_1.default.post("https://challenges.cloudflare.com/turnstile/v0/siteverify", body, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        timeout: 10000,
    });
    // Cloudflare returns { success: boolean, ... }
    return resp.data;
}
//# sourceMappingURL=turnstile.js.map