/**
 * MED-11: Password reset tokens stored as hashes.
 * MED-12: Password max-length enforcement.
 *
 * Contract test against the REAL production functions
 * (src/lib/auth/resetToken.ts, used by src/app/api/auth/forgot-password/
 * route.ts and src/app/api/auth/reset-password/route.ts) rather than a
 * hand-copied replica.
 */
import { describe, it, expect } from 'vitest'
import { randomBytes } from 'crypto'
import { hashResetToken, isPasswordLengthValid } from '@/lib/auth/resetToken'

describe('MED-11: reset token hashing', () => {
  it('raw token and stored hash differ', () => {
    const raw = randomBytes(32).toString('hex')
    expect(hashResetToken(raw)).not.toBe(raw)
  })

  it('same raw token always produces same hash (deterministic)', () => {
    const raw = 'abc123'
    expect(hashResetToken(raw)).toBe(hashResetToken(raw))
  })

  it('different raw tokens produce different hashes', () => {
    const a = randomBytes(32).toString('hex')
    const b = randomBytes(32).toString('hex')
    expect(hashResetToken(a)).not.toBe(hashResetToken(b))
  })

  it('hash is 64 hex chars (SHA-256)', () => {
    expect(hashResetToken('test')).toHaveLength(64)
  })

  it('reset flow: hash(rawToken) matches stored hash', () => {
    const raw = randomBytes(32).toString('hex')
    const stored = hashResetToken(raw)         // what forgot-password stores
    const incoming = hashResetToken(raw)       // what reset-password computes from client-supplied token
    expect(incoming).toBe(stored)
  })

  it('wrong raw token does not match stored hash', () => {
    const correct = randomBytes(32).toString('hex')
    const wrong   = randomBytes(32).toString('hex')
    expect(hashResetToken(wrong)).not.toBe(hashResetToken(correct))
  })
})

describe('MED-12: password length bounds', () => {
  it('8-char password accepted', () => {
    expect(isPasswordLengthValid('12345678')).toBe(true)
  })

  it('72-char password accepted', () => {
    expect(isPasswordLengthValid('a'.repeat(72))).toBe(true)
  })

  it('7-char password rejected', () => {
    expect(isPasswordLengthValid('1234567')).toBe(false)
  })

  it('73-char password rejected', () => {
    expect(isPasswordLengthValid('a'.repeat(73))).toBe(false)
  })

  it('empty string rejected', () => {
    expect(isPasswordLengthValid('')).toBe(false)
  })

  it('non-string values are rejected', () => {
    expect(isPasswordLengthValid(undefined)).toBe(false)
    expect(isPasswordLengthValid(null)).toBe(false)
    expect(isPasswordLengthValid(12345678)).toBe(false)
  })

  // NOTE: the previous version of this suite asserted distinct 'too short'
  // / 'too long (bcrypt truncation)' error messages from a hand-copied
  // validatePassword() replica. Those messages never existed in production —
  // src/app/api/auth/reset-password/route.ts returns one fixed message
  // ("Password must be between 8 and 72 characters") for every failure
  // case and does not distinguish which bound failed. isPasswordLengthValid()
  // is a boolean predicate matching exactly what production checks; the
  // route decides the (single) response message itself.
})
