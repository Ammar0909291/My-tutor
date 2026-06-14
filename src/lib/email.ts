import nodemailer from 'nodemailer'
import { reportError, recordFailure, maskEmail } from '@/lib/monitoring'

function makeTransport() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST ?? 'smtp.gmail.com',
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })
}

function smtpReady() {
  return !!(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS)
}

const FROM = () => process.env.SMTP_FROM ?? 'My Tutor <noreply@mytutor.app>'
const APP_URL = () => process.env.NEXT_PUBLIC_APP_URL ?? process.env.NEXTAUTH_URL ?? 'http://localhost:3000'

export async function sendPasswordResetEmail(to: string, token: string): Promise<{ success: boolean; error?: string }> {
  const resetUrl = `${APP_URL()}/auth/reset-password?token=${token}`

  if (!smtpReady()) {
    if (process.env.NODE_ENV !== 'production') {
      console.log('[email] SMTP not configured — RESET LINK (dev only):', resetUrl)
    } else {
      // DEF-EJ-11: in production this is an operational failure — surface it.
      recordFailure('smtp.not_configured')
      reportError('smtp.password_reset', new Error('SMTP not configured'), { to: maskEmail(to) })
    }
    return { success: false, error: 'SMTP not configured' }
  }

  try {
    await makeTransport().sendMail({
      from: FROM(),
      to,
      subject: 'Сброс пароля — My Tutor',
      html: `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#0D1117;font-family:Inter,system-ui,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr><td align="center" style="padding:40px 16px;">
      <table width="480" cellpadding="0" cellspacing="0" style="background:#161B22;border:1px solid #30363D;border-radius:12px;overflow:hidden;">
        <tr><td style="padding:32px 32px 24px;">
          <p style="margin:0 0 4px;font-size:22px;">🔥</p>
          <h1 style="margin:0 0 8px;font-size:22px;font-weight:800;color:#F78166;">My Tutor</h1>
          <h2 style="margin:0 0 16px;font-size:18px;font-weight:700;color:#F0F6FC;">Сброс пароля</h2>
          <p style="margin:0 0 24px;font-size:14px;color:#8B949E;line-height:1.6;">
            Мы получили запрос на сброс пароля для вашего аккаунта.<br>
            Нажмите кнопку ниже, чтобы установить новый пароль.
          </p>
          <a href="${resetUrl}"
            style="display:inline-block;background:#F78166;color:#fff;text-decoration:none;padding:14px 28px;border-radius:8px;font-size:14px;font-weight:700;">
            Сбросить пароль
          </a>
        </td></tr>
        <tr><td style="padding:16px 32px 28px;border-top:1px solid #30363D;">
          <p style="margin:0;font-size:12px;color:#484F58;line-height:1.6;">
            Ссылка действительна <strong style="color:#8B949E;">1 час</strong>.
            Если вы не запрашивали сброс пароля — просто проигнорируйте это письмо.
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`,
      text: `Сброс пароля — My Tutor\n\nПерейдите по ссылке для сброса пароля:\n${resetUrl}\n\nСсылка действительна 1 час.`,
    })
    return { success: true }
  } catch (err: any) {
    // DEF-EJ-11: route SMTP send failures to the monitoring hook (with a
    // masked recipient — never the SMTP credentials) so ops can alert.
    reportError('smtp.password_reset', err, { to: maskEmail(to) })
    return { success: false, error: err?.message ?? 'send failed' }
  }
}
