export declare function verifyTurnstile(token: string, remoteip?: string): Promise<{
    success: boolean;
    "error-codes"?: string[];
    challenge_ts?: string;
    hostname?: string;
    action?: string;
    cdata?: string;
}>;
//# sourceMappingURL=turnstile.d.ts.map