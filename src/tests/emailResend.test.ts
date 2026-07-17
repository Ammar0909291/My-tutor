/**
 * Resend email integration — unit tests.
 *
 * Covers:
 *   - src/lib/email/resend.ts: the shared Resend client (isResendConfigured,
 *     getEmailFrom, sendViaResend).
 *   - src/lib/email/index.ts: emailReady()/sendEmail() dispatch to Resend
 *     first, SMTP as fallback, and never throw.
 *
 * The Resend SDK itself is mocked (no real network calls) — these tests
 * verify OUR dispatch/error-handling logic, not Resend's API.
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

const ORIGINAL_ENV = { ...process.env }

const sendMock = vi.fn()
vi.mock('resend', () => ({
  Resend: vi.fn().mockImplementation(function MockResend() {
    return { emails: { send: sendMock } }
  }),
}))

beforeEach(() => {
  sendMock.mockReset()
  delete process.env.RESEND_API_KEY
  delete process.env.EMAIL_FROM
  delete process.env.SMTP_HOST
  delete process.env.SMTP_USER
  delete process.env.SMTP_PASS
  delete process.env.SMTP_FROM
})

afterEach(() => {
  process.env = { ...ORIGINAL_ENV }
  vi.resetModules()
})

describe('isResendConfigured / getEmailFrom', () => {
  it('is not configured when RESEND_API_KEY is unset', async () => {
    const { isResendConfigured } = await import('@/lib/email/resend')
    expect(isResendConfigured()).toBe(false)
  })

  it('is configured once RESEND_API_KEY is set', async () => {
    process.env.RESEND_API_KEY = 're_test_key'
    const { isResendConfigured } = await import('@/lib/email/resend')
    expect(isResendConfigured()).toBe(true)
  })

  it('reads EMAIL_FROM first', async () => {
    process.env.EMAIL_FROM = 'My Tutor <onboarding@resend.dev>'
    process.env.SMTP_FROM = 'My Tutor <noreply@mytutor.app>'
    const { getEmailFrom } = await import('@/lib/email/resend')
    expect(getEmailFrom()).toBe('My Tutor <onboarding@resend.dev>')
  })

  it('falls back to SMTP_FROM when EMAIL_FROM is unset', async () => {
    process.env.SMTP_FROM = 'My Tutor <noreply@mytutor.app>'
    const { getEmailFrom } = await import('@/lib/email/resend')
    expect(getEmailFrom()).toBe('My Tutor <noreply@mytutor.app>')
  })

  it('falls back to the literal default when neither is set', async () => {
    const { getEmailFrom } = await import('@/lib/email/resend')
    expect(getEmailFrom()).toBe('My Tutor <noreply@mytutor.app>')
  })

  it('never hardcodes a value that ignores environment variables', async () => {
    process.env.EMAIL_FROM = 'Custom Sender <custom@example.com>'
    const { getEmailFrom } = await import('@/lib/email/resend')
    expect(getEmailFrom()).toBe('Custom Sender <custom@example.com>')
  })
})

describe('sendViaResend', () => {
  it('fails cleanly (no throw) when RESEND_API_KEY is not configured', async () => {
    const { sendViaResend } = await import('@/lib/email/resend')
    const result = await sendViaResend({ to: 'a@b.com', subject: 'Hi', text: 'Hello' })
    expect(result.success).toBe(false)
    expect(result.error).toMatch(/RESEND_API_KEY/)
  })

  it('fails cleanly when neither html nor text is provided', async () => {
    process.env.RESEND_API_KEY = 're_test_key'
    const { sendViaResend } = await import('@/lib/email/resend')
    const result = await sendViaResend({ to: 'a@b.com', subject: 'Hi' })
    expect(result.success).toBe(false)
    expect(sendMock).not.toHaveBeenCalled()
  })

  it('sends successfully and returns the message id', async () => {
    process.env.RESEND_API_KEY = 're_test_key'
    process.env.EMAIL_FROM = 'My Tutor <onboarding@resend.dev>'
    sendMock.mockResolvedValue({ data: { id: 'msg_123' }, error: null })

    const { sendViaResend } = await import('@/lib/email/resend')
    const result = await sendViaResend({ to: 'student@example.com', subject: 'Welcome', html: '<p>Hi</p>' })

    expect(result).toEqual({ success: true, id: 'msg_123' })
    expect(sendMock).toHaveBeenCalledWith(expect.objectContaining({
      from: 'My Tutor <onboarding@resend.dev>',
      to: 'student@example.com',
      subject: 'Welcome',
      html: '<p>Hi</p>',
    }))
  })

  it('returns a safe failure (never throws) when Resend reports an API error', async () => {
    process.env.RESEND_API_KEY = 're_test_key'
    sendMock.mockResolvedValue({ data: null, error: { name: 'validation_error', message: 'Invalid recipient', statusCode: 422 } })

    const { sendViaResend } = await import('@/lib/email/resend')
    const result = await sendViaResend({ to: 'bad-address', subject: 'X', text: 'Y' })

    expect(result.success).toBe(false)
    expect(result.error).toBe('Invalid recipient')
  })

  it('returns a safe failure (never throws) when the SDK call itself rejects', async () => {
    process.env.RESEND_API_KEY = 're_test_key'
    sendMock.mockRejectedValue(new Error('network timeout'))

    const { sendViaResend } = await import('@/lib/email/resend')
    // Must not throw — the promise resolves to a failure result instead.
    const result = await sendViaResend({ to: 'a@b.com', subject: 'X', text: 'Y' })

    expect(result.success).toBe(false)
    expect(result.error).toBe('network timeout')
  })
})

describe('src/lib/email — emailReady()/sendEmail() Resend-first dispatch', () => {
  it('emailReady is true when only Resend is configured', async () => {
    process.env.RESEND_API_KEY = 're_test_key'
    const { emailReady } = await import('@/lib/email')
    expect(emailReady()).toBe(true)
  })

  it('emailReady is true when only SMTP is configured', async () => {
    process.env.SMTP_HOST = 'smtp.example.com'
    process.env.SMTP_USER = 'user@example.com'
    process.env.SMTP_PASS = 'secret'
    const { emailReady } = await import('@/lib/email')
    expect(emailReady()).toBe(true)
  })

  it('emailReady is false when neither transport is configured', async () => {
    const { emailReady } = await import('@/lib/email')
    expect(emailReady()).toBe(false)
  })

  it('sendEmail uses Resend when RESEND_API_KEY is set, even if SMTP is ALSO configured', async () => {
    process.env.RESEND_API_KEY = 're_test_key'
    process.env.SMTP_HOST = 'smtp.example.com'
    process.env.SMTP_USER = 'user@example.com'
    process.env.SMTP_PASS = 'secret'
    sendMock.mockResolvedValue({ data: { id: 'msg_456' }, error: null })

    const { sendEmail } = await import('@/lib/email')
    const result = await sendEmail({ to: 'a@b.com', subject: 'X', text: 'Y' })

    expect(result.success).toBe(true)
    expect(sendMock).toHaveBeenCalledTimes(1)
  })

  it('sendEmail returns a safe failure when no transport is configured (never throws)', async () => {
    const { sendEmail } = await import('@/lib/email')
    const result = await sendEmail({ to: 'a@b.com', subject: 'X', text: 'Y' })
    expect(result.success).toBe(false)
    expect(result.error).toMatch(/No email transport configured/)
  })
})
