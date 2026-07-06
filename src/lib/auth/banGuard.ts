/**
 * Pure decision logic for the ban/soft-delete auth guards in
 * src/lib/auth/config.ts. Extracted so the decisions can be unit tested
 * without a DB — the DB fetches themselves (which rows to look up, when
 * to look up byEmail as a fallback, fail-open on transient errors) remain
 * in the callbacks, since that orchestration is request/DB-lifecycle
 * behavior, not deterministic logic.
 */

/**
 * HIGH-1: given the (already-resolved) DB row for a signing-in user's
 * email — or null if no row exists yet (first OAuth sign-in) — decide
 * whether sign-in should proceed. Extracted verbatim from the signIn
 * callback's `if (dbUser?.isDeleted) return false` / implicit `return true`.
 */
export function isSignInAllowed(dbUser: { isDeleted: boolean } | null | undefined): boolean {
  return !dbUser?.isDeleted
}

/**
 * MED-8: given the (already-resolved) DB rows looked up by token.sub and,
 * if that lookup came back empty, by email — decide the JWT's new `sub`.
 * Returning undefined invalidates the token immediately (route auth checks
 * see no user id) instead of waiting for JWT expiry. Extracted verbatim
 * from the jwt callback's re-validation branch.
 */
export function resolveJwtSub(
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
