import nodemailer from 'nodemailer'

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

export async function sendPasswordResetEmail(
  to: string,
  token: string,
): Promise<{ success: boolean }> {
  const base =
    process.env.NEXT_PUBLIC_APP_URL ??
    process.env.NEXTAUTH_URL ??
    'http://localhost:3000'
  const resetUrl = `${base}/auth/reset-password?token=${token}`
  const from = process.env.SMTP_FROM ?? 'My Tutor <noreply@mytutor.app>'

  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.log('[email] SMTP credentials missing — reset link (dev only):', resetUrl)
    return { success: false }
  }

  try {
    await makeTransport().sendMail({
      from,
      to,
      subject: 'Password reset — My Tutor',
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
          <h2 style="margin:0 0 16px;font-size:18px;font-weight:700;color:#F0F6FC;">Password Reset</h2>
          <p style="margin:0 0 24px;font-size:14px;color:#8B949E;line-height:1.6;">
            We received a request to reset the password for your account.<br>
            Click the button below to set a new password.
          </p>
          <a href="${resetUrl}"
            style="display:inline-block;background:#F78166;color:#fff;text-decoration:none;padding:14px 28px;border-radius:8px;font-size:14px;font-weight:700;">
            Reset password
          </a>
        </td></tr>
        <tr><td style="padding:16px 32px 28px;border-top:1px solid #30363D;">
          <p style="margin:0;font-size:12px;color:#484F58;line-height:1.6;">
            Link valid for <strong style="color:#8B949E;">1 hour</strong>.
            If you did not request a password reset — ignore this email.
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`,
      text: `Password Reset — My Tutor\n\nClick the link to reset your password:\n${resetUrl}\n\nLink valid for 1 hour.`,
    })
    return { success: true }
  } catch (err) {
    console.error('[email] Failed to send reset email:', err)
    console.log('[email] Reset link (dev fallback):', resetUrl)
    return { success: false }
  }
}
