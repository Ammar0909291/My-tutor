/**
 * HIGH-2: Email canonicalization — same identity regardless of case.
 * HIGH-1: Ban check logic.
 * MED-8: JWT invalidation on isDeleted.
 *
 * Contract test against the REAL production functions
 * (src/lib/auth/email.ts, src/lib/auth/banGuard.ts, used by
 * src/lib/auth/config.ts) rather than hand-copied replicas.
 */
import { describe, it, expect } from 'vitest'
import { canonicalEmail } from '@/lib/auth/email'
import { isSignInAllowed, resolveJwtSub } from '@/lib/auth/banGuard'

describe('HIGH-2: email canonicalization', () => {
  it('lowercases mixed-case email', () => {
    expect(canonicalEmail('Test@School.com')).toBe('test@school.com')
  })

  it('trims surrounding whitespace', () => {
    expect(canonicalEmail('  user@example.com  ')).toBe('user@example.com')
  })

  it('all-caps resolves to lowercase', () => {
    expect(canonicalEmail('TEST@SCHOOL.COM')).toBe('test@school.com')
  })

  it('three case variants produce the same canonical form', () => {
    const variants = ['Test@School.com', 'test@school.com', 'TEST@SCHOOL.COM']
    const canonical = variants.map(canonicalEmail)
    expect(new Set(canonical).size).toBe(1)
  })
})

describe('HIGH-1: ban bypass prevention', () => {
  it('active user is allowed', () => {
    expect(isSignInAllowed({ isDeleted: false })).toBe(true)
  })

  it('deleted user is denied', () => {
    expect(isSignInAllowed({ isDeleted: true })).toBe(false)
  })

  it('new OAuth user (no DB row yet) is allowed through', () => {
    expect(isSignInAllowed(null)).toBe(true)
  })
})

describe('MED-8: JWT token invalidation on ban', () => {
  it('active user keeps their sub', () => {
    expect(resolveJwtSub({ id: 'u1', isDeleted: false }, null, 'u1')).toBe('u1')
  })

  it('deleted user gets sub set to undefined (immediate invalidation)', () => {
    expect(resolveJwtSub({ id: 'u1', isDeleted: true }, null, 'u1')).toBeUndefined()
  })

  it('missing user row with matching email heals to email-based id', () => {
    expect(resolveJwtSub(null, { id: 'u2', isDeleted: false }, 'old')).toBe('u2')
  })

  it('missing user row with deleted email-match returns undefined', () => {
    expect(resolveJwtSub(null, { id: 'u2', isDeleted: true }, 'old')).toBeUndefined()
  })

  it('missing user row with no email match returns undefined', () => {
    expect(resolveJwtSub(null, null, 'old')).toBeUndefined()
  })
})
