/**
 * HIGH-2: Email canonicalization — same identity regardless of case.
 * HIGH-1: Ban check logic.
 * MED-8: JWT invalidation on isDeleted.
 */
import { describe, it, expect } from 'vitest'

function canonicalEmail(raw: string): string {
  return raw.trim().toLowerCase()
}

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
  function signInAllowed(dbUser: { isDeleted: boolean } | null): boolean {
    if (!dbUser) return true // first OAuth sign-in: allow (NextAuth will create the row)
    return !dbUser.isDeleted
  }

  it('active user is allowed', () => {
    expect(signInAllowed({ isDeleted: false })).toBe(true)
  })

  it('deleted user is denied', () => {
    expect(signInAllowed({ isDeleted: true })).toBe(false)
  })

  it('new OAuth user (no DB row yet) is allowed through', () => {
    expect(signInAllowed(null)).toBe(true)
  })
})

describe('MED-8: JWT token invalidation on ban', () => {
  function resolveTokenSub(
    byId: { id: string; isDeleted: boolean } | null,
    byEmail: { id: string; isDeleted: boolean } | null,
    currentSub: string,
  ): string | undefined {
    if (!byId) {
      if (byEmail && !byEmail.isDeleted) return byEmail.id
      return undefined
    }
    if (byId.isDeleted) return undefined
    return currentSub
  }

  it('active user keeps their sub', () => {
    expect(resolveTokenSub({ id: 'u1', isDeleted: false }, null, 'u1')).toBe('u1')
  })

  it('deleted user gets sub set to undefined (immediate invalidation)', () => {
    expect(resolveTokenSub({ id: 'u1', isDeleted: true }, null, 'u1')).toBeUndefined()
  })

  it('missing user row with matching email heals to email-based id', () => {
    expect(resolveTokenSub(null, { id: 'u2', isDeleted: false }, 'old')).toBe('u2')
  })

  it('missing user row with deleted email-match returns undefined', () => {
    expect(resolveTokenSub(null, { id: 'u2', isDeleted: true }, 'old')).toBeUndefined()
  })

  it('missing user row with no email match returns undefined', () => {
    expect(resolveTokenSub(null, null, 'old')).toBeUndefined()
  })
})
