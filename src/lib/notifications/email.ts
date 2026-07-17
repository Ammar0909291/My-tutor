// Resend Integration (development-only, resend.dev sandbox sender): this
// file used to maintain its own nodemailer transport, a parallel copy of
// the one in src/lib/email/index.ts. Consolidated onto the shared
// sendEmail()/emailReady() from that module — same Resend-first, SMTP-
// fallback transport every other email sender in the app now uses, so
// there is only one place that decides HOW an email leaves the server.
import { sendEmail as sendViaSharedTransport, emailReady } from '@/lib/email'

interface SendEmailOptions {
  to: string
  subject: string
  text: string
  html?: string
}

async function sendEmail(opts: SendEmailOptions): Promise<void> {
  if (!emailReady()) {
    console.log('[email] No email transport configured — skipping:', opts.subject, '→', opts.to)
    return
  }
  const result = await sendViaSharedTransport(opts)
  if (!result.success) {
    console.error('[email] Failed to send:', opts.subject, '→', opts.to, result.error)
  }
}

export async function sendStudyReminder(
  email: string,
  name: string,
  lang: string,
  daysSinceLastStudy: number,
): Promise<void> {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

  const content: Record<string, { subject: string; text: string }> = {
    ru: {
      subject: '🔥 Не забудь про урок сегодня!',
      text: `Привет, ${name}! Ты не занимался ${daysSinceLastStudy} дня. Твой репетитор ждёт тебя. Продолжи обучение: ${appUrl}/learn`,
    },
    en: {
      subject: "🔥 Don't forget your lesson today!",
      text: `Hi ${name}! You haven't studied for ${daysSinceLastStudy} days. Your tutor is waiting. Continue learning: ${appUrl}/learn`,
    },
    hi: {
      subject: '🔥 Aaj ka paath mat bhoolo!',
      text: `Namaste ${name}! Aapne ${daysSinceLastStudy} din se padhai nahi ki. Aapka tutor wait kar raha hai. Padhna jaari rakho: ${appUrl}/learn`,
    },
  }

  const c = content[lang] ?? content.en

  await sendEmail({
    to: email,
    subject: c.subject,
    text: c.text,
    html: `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#0D1117;font-family:Inter,system-ui,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr><td align="center" style="padding:40px 16px;">
      <table width="480" cellpadding="0" cellspacing="0" style="background:#161B22;border:1px solid #30363D;border-radius:12px;overflow:hidden;">
        <tr><td style="padding:32px;">
          <p style="margin:0 0 4px;font-size:28px;">🔥</p>
          <h1 style="margin:0 0 8px;font-size:22px;font-weight:800;color:#F78166;">My Tutor</h1>
          <p style="margin:0 0 20px;font-size:15px;color:#F0F6FC;line-height:1.6;">${c.text}</p>
          <a href="${appUrl}/learn"
            style="display:inline-block;background:#F78166;color:#fff;text-decoration:none;padding:14px 28px;border-radius:8px;font-size:14px;font-weight:700;">
            Continue Learning →
          </a>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`,
  })
}
