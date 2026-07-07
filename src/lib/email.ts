import nodemailer from 'nodemailer'
import type { Lang } from '@/lib/i18n'
import { reportError, maskEmail } from '@/lib/monitoring'

function makeTransport() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST ?? 'smtp.gmail.com',
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    // Bound every phase of the SMTP conversation. Without these a blocked or
    // unreachable mail host hangs the request indefinitely (and our send-failure
    // logging never runs). 10s is generous for a healthy SMTP server.
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 10_000,
  })
}

function smtpReady() {
  return !!(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS)
}

const FROM = () => process.env.SMTP_FROM ?? 'My Tutor <noreply@mytutor.app>'
const APP_URL = () => process.env.NEXT_PUBLIC_APP_URL ?? process.env.NEXTAUTH_URL ?? 'http://localhost:3000'

// ─── Welcome email ────────────────────────────────────────────────────────────

export async function sendWelcomeEmail(to: string, name: string): Promise<void> {
  if (!smtpReady()) {
    console.log('[email] Welcome email skipped (SMTP not configured) for:', to)
    return
  }
  try {
    await makeTransport().sendMail({
      from: FROM(),
      to,
      subject: 'Welcome to My Tutor! 🔥',
      html: `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#0D1117;font-family:Inter,system-ui,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr><td align="center" style="padding:40px 16px;">
      <table width="480" cellpadding="0" cellspacing="0" style="background:#161B22;border:1px solid #30363D;border-radius:12px;overflow:hidden;">
        <tr><td style="padding:32px 32px 24px;">
          <p style="margin:0 0 4px;font-size:28px;">🔥</p>
          <h1 style="margin:0 0 8px;font-size:22px;font-weight:800;color:#F78166;">Welcome to My Tutor!</h1>
          <p style="margin:0 0 16px;font-size:16px;font-weight:600;color:#F0F6FC;">Hi ${name},</p>
          <p style="margin:0 0 24px;font-size:14px;color:#8B949E;line-height:1.6;">
            Your account has been created successfully.<br>
            Start learning C, C++, Python or English with your personal AI tutor — available 24/7,
            explains until you truly understand.
          </p>
          <a href="${APP_URL()}/onboarding"
            style="display:inline-block;background:#F78166;color:#fff;text-decoration:none;padding:14px 28px;border-radius:8px;font-size:14px;font-weight:700;">
            Start learning →
          </a>
        </td></tr>
        <tr><td style="padding:16px 32px 28px;border-top:1px solid #30363D;">
          <p style="margin:0;font-size:12px;color:#484F58;line-height:1.6;">
            You're receiving this because you signed up at My Tutor.
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`,
      text: `Welcome to My Tutor!\n\nHi ${name},\n\nYour account has been created.\nStart learning: ${APP_URL()}/onboarding\n`,
    })
    console.log('[email] Welcome email sent to:', to)
  } catch (err) {
    console.error('[email] Failed to send welcome email:', err)
    // Non-fatal — signup already succeeded
  }
}

// ─── Password reset email ─────────────────────────────────────────────────────

export async function sendPasswordResetEmail(
  to: string,
  token: string,
): Promise<{ success: boolean; error?: string }> {
  const resetUrl = `${APP_URL()}/auth/reset-password?token=${token}`
  const masked = maskEmail(to)

  if (!smtpReady()) {
    if (process.env.NODE_ENV !== 'production') {
      console.log('[email] SMTP not configured — RESET LINK (dev mode):', resetUrl)
      return { success: true }
    }
    const count = reportError('email.password-reset.smtp-not-configured', new Error('SMTP_HOST / SMTP_USER / SMTP_PASS not set'), { to: masked })
    console.error(`[email] sendPasswordResetEmail: SMTP not configured — email NOT sent to ${masked} (failure #${count})`)
    return { success: false, error: 'SMTP not configured' }
  }

  try {
    await makeTransport().sendMail({
      from: FROM(),
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
    console.log('[email] Password reset email sent to:', masked)
    return { success: true }
  } catch (err) {
    const errObj = err as Error & { code?: string; command?: string; response?: string; responseCode?: number }
    const msg = errObj.message ?? String(err)
    const count = reportError('email.password-reset.send-failed', err, {
      to: masked,
      code: errObj.code ?? null,
      command: errObj.command ?? null,
      responseCode: errObj.responseCode ?? null,
      response: errObj.response ?? null,
    })
    console.error(`[email] Failed to send reset email to ${masked} (failure #${count}):`, msg)
    if (process.env.NODE_ENV !== 'production') {
      console.log('[email] Reset link (dev fallback):', resetUrl)
    }
    return { success: false, error: msg }
  }
}

// ─── Email verification ───────────────────────────────────────────────────────

const VERIFY_COPY: Record<Lang, {
  subject: string
  heading: string
  greeting: (name: string) => string
  body: string
  button: string
  expiry: string
  footer: string
}> = {
  en: {
    subject: 'Verify your email — My Tutor',
    heading: 'Confirm your email address',
    greeting: (name) => `Hi ${name},`,
    body: 'Please confirm this is your email address to finish setting up your My Tutor account.',
    button: 'Verify email',
    expiry: 'This link expires in 24 hours. If you didn\'t create this account, you can safely ignore this email.',
    footer: 'You\'re receiving this because someone signed up at My Tutor with this email address.',
  },
  ru: {
    subject: 'Подтвердите ваш email — My Tutor',
    heading: 'Подтвердите адрес электронной почты',
    greeting: (name) => `Привет, ${name}!`,
    body: 'Подтвердите, что это ваш email — это последний шаг для завершения регистрации в My Tutor.',
    button: 'Подтвердить email',
    expiry: 'Ссылка действительна 24 часа. Если вы не создавали этот аккаунт, просто проигнорируйте письмо.',
    footer: 'Вы получили это письмо, потому что кто-то указал этот email при регистрации в My Tutor.',
  },
  hi: {
    subject: 'अपना ईमेल सत्यापित करें — My Tutor',
    heading: 'अपना ईमेल पता पुष्ट करें',
    greeting: (name) => `नमस्ते ${name},`,
    body: 'My Tutor में अपना खाता पूरा करने के लिए कृपया पुष्टि करें कि यह आपका ईमेल पता है।',
    button: 'ईमेल सत्यापित करें',
    expiry: 'यह लिंक 24 घंटे में समाप्त हो जाता है। अगर आपने यह खाता नहीं बनाया, तो इस ईमेल को नज़रअंदाज़ करें।',
    footer: 'आपको यह ईमेल इसलिए मिला है क्योंकि किसी ने इस पते से My Tutor पर साइन अप किया है।',
  },
}

export async function sendVerificationEmail(
  to: string,
  name: string,
  token: string,
  lang: Lang = 'en',
): Promise<{ success: boolean; error?: string }> {
  const copy = VERIFY_COPY[lang] ?? VERIFY_COPY.en
  const verifyUrl = `${APP_URL()}/auth/verify-email?token=${token}`

  if (!smtpReady()) {
    if (process.env.NODE_ENV !== 'production') {
      console.log('[email] SMTP not configured — VERIFICATION LINK (dev mode):', verifyUrl)
    }
    return { success: true }
  }

  try {
    await makeTransport().sendMail({
      from: FROM(),
      to,
      subject: copy.subject,
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
          <h2 style="margin:0 0 16px;font-size:18px;font-weight:700;color:#F0F6FC;">${copy.heading}</h2>
          <p style="margin:0 0 8px;font-size:14px;font-weight:600;color:#F0F6FC;">${copy.greeting(name)}</p>
          <p style="margin:0 0 24px;font-size:14px;color:#8B949E;line-height:1.6;">${copy.body}</p>
          <a href="${verifyUrl}"
            style="display:inline-block;background:#F78166;color:#fff;text-decoration:none;padding:14px 28px;border-radius:8px;font-size:14px;font-weight:700;">
            ${copy.button}
          </a>
        </td></tr>
        <tr><td style="padding:16px 32px 28px;border-top:1px solid #30363D;">
          <p style="margin:0;font-size:12px;color:#484F58;line-height:1.6;">${copy.expiry}</p>
          <p style="margin:8px 0 0;font-size:12px;color:#484F58;line-height:1.6;">${copy.footer}</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`,
      text: `${copy.heading}\n\n${copy.greeting(name)}\n\n${copy.body}\n\n${verifyUrl}\n\n${copy.expiry}`,
    })
    return { success: true }
  } catch (err) {
    console.error('[email] Failed to send verification email:', err instanceof Error ? err.message : 'unknown')
    if (process.env.NODE_ENV !== 'production') {
      console.log('[email] Verification link (dev fallback):', verifyUrl)
    }
    return { success: true, error: String(err) }
  }
}

// ─── Post-verification welcome email ──────────────────────────────────────────

const WELCOME_COPY: Record<Lang, {
  subject: string
  heading: string
  greeting: (name: string) => string
  intro: string
  subjectsLabel: string
  noSubjects: string
  gettingStartedLabel: string
  gettingStarted: string[]
  coachButton: string
  learnButton: string
  footer: string
}> = {
  en: {
    subject: "You're verified — let's start learning! 🎉",
    heading: 'Email verified!',
    greeting: (name) => `Hi ${name},`,
    intro: 'Your My Tutor account is fully set up and ready to go.',
    subjectsLabel: 'Your subjects',
    noSubjects: 'You haven\'t picked any subjects yet — add some from the Subject Library to get a personalized roadmap.',
    gettingStartedLabel: 'Getting started',
    gettingStarted: [
      'Open Learn to follow your personalized curriculum, lesson by lesson.',
      'Chat with your AI Coach any time you\'re stuck or want to practice.',
      'Track XP, streaks and milestones as you progress.',
    ],
    coachButton: 'Talk to your Coach →',
    learnButton: 'Go to Learn →',
    footer: 'You\'re receiving this because you verified your email at My Tutor.',
  },
  ru: {
    subject: 'Email подтверждён — начинаем учиться! 🎉',
    heading: 'Email подтверждён!',
    greeting: (name) => `Привет, ${name}!`,
    intro: 'Ваш аккаунт My Tutor полностью настроен и готов к работе.',
    subjectsLabel: 'Ваши предметы',
    noSubjects: 'Вы ещё не выбрали предметы — добавьте их из Библиотеки предметов, чтобы получить персональный план обучения.',
    gettingStartedLabel: 'С чего начать',
    gettingStarted: [
      'Откройте раздел «Учёба», чтобы проходить уроки по своему плану.',
      'Пишите ИИ-коучу в любое время — если что-то непонятно или хочется попрактиковаться.',
      'Следите за опытом (XP), сериями и достижениями по мере прогресса.',
    ],
    coachButton: 'Написать коучу →',
    learnButton: 'Перейти к учёбе →',
    footer: 'Вы получили это письмо, потому что подтвердили свой email в My Tutor.',
  },
  hi: {
    subject: 'ईमेल सत्यापित हो गया — सीखना शुरू करें! 🎉',
    heading: 'ईमेल सत्यापित हो गया!',
    greeting: (name) => `नमस्ते ${name},`,
    intro: 'आपका My Tutor खाता पूरी तरह से तैयार है।',
    subjectsLabel: 'आपके विषय',
    noSubjects: 'आपने अभी तक कोई विषय नहीं चुना — व्यक्तिगत रोडमैप पाने के लिए सब्जेक्ट लाइब्रेरी से कुछ विषय जोड़ें।',
    gettingStartedLabel: 'शुरुआत कैसे करें',
    gettingStarted: [
      'अपने व्यक्तिगत पाठ्यक्रम का पालन करने के लिए लर्न खोलें।',
      'जब भी अटकें या अभ्यास करना चाहें, अपने AI कोच से बात करें।',
      'आगे बढ़ते हुए XP, स्ट्रीक और माइलस्टोन ट्रैक करें।',
    ],
    coachButton: 'कोच से बात करें →',
    learnButton: 'लर्न पर जाएँ →',
    footer: 'आपको यह ईमेल इसलिए मिला क्योंकि आपने My Tutor पर अपना ईमेल सत्यापित किया है।',
  },
}

export async function sendVerifiedWelcomeEmail(
  to: string,
  name: string,
  lang: Lang = 'en',
  subjects: string[] = [],
): Promise<void> {
  const copy = WELCOME_COPY[lang] ?? WELCOME_COPY.en
  if (!smtpReady()) {
    console.log('[email] Welcome email skipped (SMTP not configured) for:', to)
    return
  }

  const subjectsHtml = subjects.length
    ? `<p style="margin:0 0 4px;font-size:13px;font-weight:700;color:#F0F6FC;">${copy.subjectsLabel}</p>
       <p style="margin:0 0 20px;font-size:14px;color:#8B949E;line-height:1.6;">${subjects.join(' · ')}</p>`
    : `<p style="margin:0 0 20px;font-size:14px;color:#8B949E;line-height:1.6;">${copy.noSubjects}</p>`

  const stepsHtml = copy.gettingStarted
    .map((step) => `<li style="margin:0 0 6px;">${step}</li>`)
    .join('')

  try {
    await makeTransport().sendMail({
      from: FROM(),
      to,
      subject: copy.subject,
      html: `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#0D1117;font-family:Inter,system-ui,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr><td align="center" style="padding:40px 16px;">
      <table width="480" cellpadding="0" cellspacing="0" style="background:#161B22;border:1px solid #30363D;border-radius:12px;overflow:hidden;">
        <tr><td style="padding:32px 32px 24px;">
          <p style="margin:0 0 4px;font-size:28px;">🎉</p>
          <h1 style="margin:0 0 8px;font-size:22px;font-weight:800;color:#F78166;">${copy.heading}</h1>
          <p style="margin:0 0 4px;font-size:16px;font-weight:600;color:#F0F6FC;">${copy.greeting(name)}</p>
          <p style="margin:0 0 20px;font-size:14px;color:#8B949E;line-height:1.6;">${copy.intro}</p>
          ${subjectsHtml}
          <p style="margin:0 0 4px;font-size:13px;font-weight:700;color:#F0F6FC;">${copy.gettingStartedLabel}</p>
          <ul style="margin:0 0 24px;padding-left:18px;font-size:14px;color:#8B949E;line-height:1.6;">${stepsHtml}</ul>
          <a href="${APP_URL()}/learn"
            style="display:inline-block;background:#F78166;color:#fff;text-decoration:none;padding:14px 24px;border-radius:8px;font-size:14px;font-weight:700;margin:0 8px 8px 0;">
            ${copy.learnButton}
          </a>
          <a href="${APP_URL()}/coach"
            style="display:inline-block;background:transparent;color:#F78166;text-decoration:none;padding:14px 24px;border-radius:8px;font-size:14px;font-weight:700;border:1px solid #F78166;">
            ${copy.coachButton}
          </a>
        </td></tr>
        <tr><td style="padding:16px 32px 28px;border-top:1px solid #30363D;">
          <p style="margin:0;font-size:12px;color:#484F58;line-height:1.6;">${copy.footer}</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`,
      text: `${copy.heading}\n\n${copy.greeting(name)}\n\n${copy.intro}\n\n${copy.learnButton} ${APP_URL()}/learn\n${copy.coachButton} ${APP_URL()}/coach`,
    })
    console.log('[email] Verified-welcome email sent to:', to)
  } catch (err) {
    console.error('[email] Failed to send verified-welcome email:', err)
  }
}
