import { createHash } from 'crypto'

/**
 * SHA-256 hash of a password-reset token (MED-11). Extracted verbatim from
 * src/app/api/auth/forgot-password/route.ts and
 * src/app/api/auth/reset-password/route.ts: the DB stores only this hash,
 * never the raw token, so a stolen DB snapshot cannot be used to reset a
 * password directly.
 */
export function hashResetToken(raw: string): string {
  return createHash('sha256').update(raw).digest('hex')
}

/**
 * MED-12: bcrypt silently truncates at 72 bytes, so reset passwords are
 * bounded to [8, 72] chars. Extracted verbatim from the combined condition
 * in src/app/api/auth/reset-password/route.ts — note production returns
 * the same error message ("Password must be between 8 and 72 characters")
 * for every failure case; it does not distinguish "too short" from
 * "too long" in the response.
 */
export function isPasswordLengthValid(password: unknown): boolean {
  return typeof password === 'string' && password.length >= 8 && password.length <= 72
}
