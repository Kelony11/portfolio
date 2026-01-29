import nodemailer from "nodemailer";

type SendPortfolioEmailArgs = {
  type: "CONTACT" | "FEEDBACK" | "TEST";
  subject: string;
  html: string;
  to?: string;
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
  subject,
  html,
  to,
  replyTo,
}: SendPortfolioEmailArgs) {
  return transporter.sendMail({
    from: `"Kelvin Ihezue" <${process.env.MAIL_USER}>`,
    to: to ?? process.env.MAIL_TO, 
    subject,
    html,
    ...(replyTo ? { replyTo } : {}),
  });
}
