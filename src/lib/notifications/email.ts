import nodemailer from 'nodemailer'

function makeTransport() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST ?? 'smtp.gmail.com',
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: process.env.SMTP_SECURE === 'true',
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  })
}

interface SendEmailOptions {
  to: string
  subject: string
  text: string
  html?: string
}

async function sendEmail(opts: SendEmailOptions): Promise<void> {
  const from = process.env.SMTP_FROM ?? 'My Tutor <noreply@mytutor.app>'

  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.log('[email] SMTP not configured — skipping:', opts.subject, '→', opts.to)
    return
  }

  await makeTransport().sendMail({ from, ...opts })
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
