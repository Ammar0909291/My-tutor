import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { sendTestEmail } from '@/lib/email'

const ORIGINAL_ENV = { ...process.env }

describe('sendTestEmail diagnostics', () => {
  beforeEach(() => {
    delete process.env.SMTP_HOST
    delete process.env.SMTP_USER
    delete process.env.SMTP_PASS
    delete process.env.SMTP_FROM
  })

  afterEach(() => {
    process.env = { ...ORIGINAL_ENV }
  })

  it('reports not-configured without attempting a connection when SMTP vars are missing', async () => {
    const result = await sendTestEmail('someone@example.com')
    expect(result.success).toBe(false)
    expect(result.smtpConfigured).toBe(false)
    expect(result.error).toMatch(/SMTP not configured/)
  })

  it('flags a FROM/SMTP_USER domain mismatch as a warning', async () => {
    process.env.SMTP_USER = 'mytutorapp@gmail.com'
    process.env.SMTP_FROM = 'My Tutor <noreply@mytutor.app>'
    // SMTP_HOST/PASS deliberately left unset so this stays a pure,
    // network-free check of the warning logic alone.
    const result = await sendTestEmail('someone@example.com')
    expect(result.fromDomainMismatchWarning).toMatch(/gmail\.com/)
    expect(result.fromDomainMismatchWarning).toMatch(/mytutor\.app/)
  })

  it('does not warn when FROM and SMTP_USER share a domain', async () => {
    process.env.SMTP_USER = 'noreply@mytutor.app'
    process.env.SMTP_FROM = 'My Tutor <noreply@mytutor.app>'
    const result = await sendTestEmail('someone@example.com')
    expect(result.fromDomainMismatchWarning).toBeUndefined()
  })
})
