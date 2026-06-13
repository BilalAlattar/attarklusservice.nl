import nodemailer from "nodemailer";

type Req = { method?: string; body: any };
type Res = {
  status(code: number): Res;
  json(data: unknown): void;
  setHeader(k: string, v: string): void;
  end(): void;
};

export default async function handler(req: Req, res: Res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { name, email, phone, message } = (req.body ?? {}) as Record<string, string>;

  // Server-side validation
  if (!name?.trim() || !email?.trim() || !phone?.trim() || !message?.trim()) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = Number(process.env.SMTP_PORT ?? "587");
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;

  if (!smtpHost || !smtpUser || !smtpPass) {
    return res.status(503).json({ error: "Email service not configured" });
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465,
    auth: { user: smtpUser, pass: smtpPass },
  });

  const html = `
    <div style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:24px">
      <h2 style="color:#d97706;margin:0 0 20px">Nieuw bericht — Attar Klusservice</h2>
      <table style="width:100%;border-collapse:collapse">
        <tr><td style="padding:10px 0;color:#64748b;width:120px">Naam</td><td style="padding:10px 0;font-weight:600">${name}</td></tr>
        <tr style="border-top:1px solid #e2e8f0"><td style="padding:10px 0;color:#64748b">E-mail</td><td style="padding:10px 0"><a href="mailto:${email}" style="color:#d97706">${email}</a></td></tr>
        <tr style="border-top:1px solid #e2e8f0"><td style="padding:10px 0;color:#64748b">Telefoon</td><td style="padding:10px 0"><a href="tel:${phone}" style="color:#d97706">${phone}</a></td></tr>
        <tr style="border-top:1px solid #e2e8f0"><td style="padding:10px 0;color:#64748b;vertical-align:top">Bericht</td><td style="padding:10px 0;white-space:pre-wrap">${message}</td></tr>
      </table>
      <hr style="border:none;border-top:1px solid #e2e8f0;margin:24px 0">
      <p style="color:#94a3b8;font-size:12px">Verstuurd via het contactformulier op attarklusservice.nl</p>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: `"Attar Klusservice — Website" <${smtpUser}>`,
      to: "sales@attarklusservice.nl",
      replyTo: email,
      subject: `Nieuw bericht van ${name}`,
      html,
    });
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Email send error:", err);
    return res.status(500).json({ error: "Failed to send email" });
  }
}
