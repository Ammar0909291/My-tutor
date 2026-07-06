/**
 * HIGH-2: normalize email before lookup so casing/whitespace differences
 * don't create duplicate identities. Extracted verbatim from the three
 * independent copies of this logic in src/lib/auth/config.ts (Credentials
 * authorize, signIn callback, jwt callback).
 */
export function canonicalEmail(raw: string): string {
  return raw.trim().toLowerCase()
}

/**
 * Pure parsing/matching logic for ADMIN_EMAILS, extracted so it can be unit
 * tested without depending on process.env or importing next-auth (kept in
 * this framework-free file rather than src/lib/auth/admin.ts, which
 * imports the full '@/lib/auth' NextAuth instance and can't be imported
 * from tests). src/lib/auth/admin.ts's isAdminEmail() is the production
 * entry point; this is the deterministic part of it.
 */
export function isAdminEmailMatch(email: string, adminEmailsRaw: string): boolean {
  if (!adminEmailsRaw.trim()) return false
  return adminEmailsRaw
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean)
    .includes(email.toLowerCase())
}
