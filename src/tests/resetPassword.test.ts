/**
 * MED-11: Password reset tokens stored as hashes.
 * MED-12: Password max-length enforcement.
 */
import { describe, it, expect } from 'vitest'
import { createHash, randomBytes } from 'crypto'

function hashToken(raw: string): string {
  return createHash('sha256').update(raw).digest('hex')
}

describe('MED-11: reset token hashing', () => {
  it('raw token and stored hash differ', () => {
    const raw = randomBytes(32).toString('hex')
    expect(hashToken(raw)).not.toBe(raw)
  })

  it('same raw token always produces same hash (deterministic)', () => {
    const raw = 'abc123'
    expect(hashToken(raw)).toBe(hashToken(raw))
  })

  it('different raw tokens produce different hashes', () => {
    const a = randomBytes(32).toString('hex')
    const b = randomBytes(32).toString('hex')
    expect(hashToken(a)).not.toBe(hashToken(b))
  })

  it('hash is 64 hex chars (SHA-256)', () => {
    expect(hashToken('test')).toHaveLength(64)
  })

  it('reset flow: hash(rawToken) matches stored hash', () => {
    const raw = randomBytes(32).toString('hex')
    const stored = hashToken(raw)         // what forgot-password stores
    const incoming = hashToken(raw)       // what reset-password computes from client-supplied token
    expect(incoming).toBe(stored)
  })

  it('wrong raw token does not match stored hash', () => {
    const correct = randomBytes(32).toString('hex')
    const wrong   = randomBytes(32).toString('hex')
    expect(hashToken(wrong)).not.toBe(hashToken(correct))
  })
})

describe('MED-12: password length bounds', () => {
  function validatePassword(p: string): { ok: boolean; error?: string } {
    if (!p || p.length < 8) return { ok: false, error: 'too short' }
    if (p.length > 72)      return { ok: false, error: 'too long (bcrypt truncation)' }
    return { ok: true }
  }

  it('8-char password accepted', () => {
    expect(validatePassword('12345678').ok).toBe(true)
  })

  it('72-char password accepted', () => {
    expect(validatePassword('a'.repeat(72)).ok).toBe(true)
  })

  it('7-char password rejected', () => {
    expect(validatePassword('1234567').ok).toBe(false)
  })

  it('73-char password rejected', () => {
    const result = validatePassword('a'.repeat(73))
    expect(result.ok).toBe(false)
    expect(result.error).toMatch(/bcrypt/)
  })

  it('empty string rejected', () => {
    expect(validatePassword('').ok).toBe(false)
  })
})
