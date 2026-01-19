import nodemailer from "nodemailer";

type SendPortfolioEmailArgs = {
  type: "CONTACT" | "FEEDBACK" | "TEST";
  subject: string;
  html: string;
  replyTo?: string;
};

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT),
  secure: process.env.MAIL_SECURE === "true",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

export async function sendPortfolioEmail({
  type,
  subject,
  html,
  replyTo,
}: SendPortfolioEmailArgs) {
  return transporter.sendMail({
    from: `"Portfolio Bot" <${process.env.MAIL_USER}>`,
    to: process.env.MAIL_TO,
    subject: `[${type}] ${subject}`,
    html,
    ...(replyTo ? { replyTo } : {}),
  });
}
