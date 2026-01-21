function escapeHtml(str: string = ""): string {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function contactTemplate(data: {
  name: string;
  email: string;
  phone?: string;
  wantsReply?: boolean;
  message: string;
}) {
  return `
    <div style="font-family: Arial, sans-serif;">
      <h2>New Contact Message</h2>
      <p><b>Email:</b> ${escapeHtml(data.email)}</p>
      <p><b>Phone:</b> ${escapeHtml(data.phone || "N/A")}</p>
      <p><b>Wants Reply:</b> ${data.wantsReply ? "Yes" : "No"}</p>
      <hr/>
      <p><b>Message:</b></p>
      <p>${escapeHtml(data.message).replace("/\n/g", "<br/>")}</p>
    </div>
  `;
}

export function feedbackTemplate(data: {
  type: string;
  message: string;
}) {
  return `
    <div style="font-family: Arial, sans-serif;">
      <h2>New Feedback Received</h2>
      <p><b>Feedback Type:</b> ${escapeHtml(data.type)}</p>
      <hr/>
      <p><b>Message:</b></p>
      <p>${escapeHtml(data.message).replace("/\n/g", "<br/>")}</p>
    </div>
  `;
}
