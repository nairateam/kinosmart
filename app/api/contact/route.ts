import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const BUSINESS = {
    name: "Kinosmart NG",
    email: "info@kinosmartng.com",
    phones: ["+234 808 393 8612", "+234 816 995 6949"],
    address: "1st Floor, Suite 12, Toscanini Plaza, 26 Oriyomi Street off Olowu Street, Ikeja Lagos Nigeria (opp Computer Village Underbridge)",
    mapsUrl: "https://maps.app.goo.gl/CV42jGFUqKuMjS1h8",
    socials: [
        { label: "Facebook", url: "https://facebook.com/kinosmartng" },
        { label: "Instagram", url: "https://instagram.com/kinosmartng" },
        { label: "LinkedIn", url: "https://linkedin.com/company/kinosmartng" },
        { label: "Twitter / X", url: "https://twitter.com/kinosmartng" },
    ],
};

const adminHtml = (name: string, email: string, company: string | undefined, message: string) => `
<div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #111;">
    <h2 style="margin-bottom: 4px;">New contact form submission</h2>
    <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 16px 0;" />
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    ${company ? `<p><strong>Company:</strong> ${company}</p>` : ""}
    <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 16px 0;" />
    <p style="white-space: pre-wrap;">${message}</p>
</div>
`;

const userHtml = (name: string) => `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /></head>
<body style="margin:0;padding:0;background:#f9fafb;font-family:sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f9fafb;padding:40px 16px;">
  <tr>
    <td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:580px;background:#ffffff;border-radius:16px;border:1px solid #e5e7eb;overflow:hidden;">

        <!-- Header -->
        <tr>
          <td style="background:#111111;padding:28px 36px;">
            <p style="margin:0;font-size:22px;font-style:italic;color:#ffffff;font-family:Georgia,serif;">
              Kinos<span style="color:#FF9100;">mart.</span>
            </p>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:36px 36px 24px;">
            <h1 style="margin:0 0 12px;font-size:22px;color:#111111;font-weight:600;">
              Thanks for reaching out, ${name}!
            </h1>
            <p style="margin:0 0 16px;font-size:15px;color:#4b5563;line-height:1.7;">
              We've received your message and will get back to you within <strong>24 hours</strong> with a tailored response.
            </p>
            <p style="margin:0;font-size:15px;color:#4b5563;line-height:1.7;">
              In the meantime, feel free to reach us directly via any of the channels below.
            </p>
          </td>
        </tr>

        <!-- Divider -->
        <tr>
          <td style="padding:0 36px;">
            <hr style="border:none;border-top:1px solid #e5e7eb;" />
          </td>
        </tr>

        <!-- Contact details -->
        <tr>
          <td style="padding:24px 36px;">
            <p style="margin:0 0 14px;font-size:11px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:#9ca3af;">Contact us</p>

            <table cellpadding="0" cellspacing="0" width="100%">
              <tr>
                <td style="padding:6px 0;vertical-align:top;width:80px;">
                  <span style="font-size:11px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#9ca3af;">Phone</span>
                </td>
                <td style="padding:6px 0;vertical-align:top;">
                  ${BUSINESS.phones.map(p => `<span style="display:block;font-size:13px;color:#111111;">${p}</span>`).join("")}
                </td>
              </tr>
              <tr>
                <td style="padding:6px 0;vertical-align:top;width:80px;">
                  <span style="font-size:11px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#9ca3af;">Email</span>
                </td>
                <td style="padding:6px 0;vertical-align:top;">
                  <a href="mailto:${BUSINESS.email}" style="font-size:13px;color:#111111;text-decoration:none;">${BUSINESS.email}</a>
                </td>
              </tr>
              <tr>
                <td style="padding:6px 0;vertical-align:top;width:80px;">
                  <span style="font-size:11px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#9ca3af;">Address</span>
                </td>
                <td style="padding:6px 0;vertical-align:top;">
                  <a href="${BUSINESS.mapsUrl}" target="_blank" style="font-size:13px;color:#111111;text-decoration:none;line-height:1.6;">${BUSINESS.address}</a>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Divider -->
        <tr>
          <td style="padding:0 36px;">
            <hr style="border:none;border-top:1px solid #e5e7eb;" />
          </td>
        </tr>

        <!-- Socials -->
        <tr>
          <td style="padding:20px 36px;text-align:center;">
            ${BUSINESS.socials.map(s =>
    `<a href="${s.url}" target="_blank" style="display:inline-block;margin:0 10px;font-size:11px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#6b7280;text-decoration:none;">${s.label}</a>`
).join("")}
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#f9fafb;border-top:1px solid #e5e7eb;padding:16px 36px;text-align:center;">
            <p style="margin:0;font-size:11px;color:#9ca3af;">
              © ${new Date().getFullYear()} Kinosmart NG. All rights reserved.
            </p>
          </td>
        </tr>

      </table>
    </td>
  </tr>
</table>
</body>
</html>
`;

export async function POST(req: NextRequest) {
    try {
        const { name, email, company, message } = await req.json();

        if (!name || !email || !message) {
            return NextResponse.json(
                { error: "Name, email and message are required." },
                { status: 400 }
            );
        }

        await Promise.all([
            // Admin notification
            resend.emails.send({
                from: `${BUSINESS.name} <info@kinosmartng.com>`,
                to: BUSINESS.email,
                replyTo: email,
                subject: `New enquiry from ${name}${company ? ` · ${company}` : ""}`,
                html: adminHtml(name, email, company, message),
            }),

            // User confirmation
            resend.emails.send({
                from: `${BUSINESS.name} <info@kinosmartng.com>`,
                to: email,
                subject: "We've received your message — Kinosmart NG",
                html: userHtml(name),
            }),
        ]);

        return NextResponse.json({ success: true });
    } catch (err: any) {
        console.error("[contact]", err);
        return NextResponse.json(
            { error: "Failed to send message. Please try again." },
            { status: 500 }
        );
    }
}