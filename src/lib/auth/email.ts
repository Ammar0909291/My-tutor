/**
 * HIGH-2: normalize email before lookup so casing/whitespace differences
 * don't create duplicate identities. Extracted verbatim from the three
 * independent copies of this logic in src/lib/auth/config.ts (Credentials
 * authorize, signIn callback, jwt callback).
 */
export function canonicalEmail(raw: string): string {
  return raw.trim().toLowerCase()
}
