/**
 * Prisma connection-pool configuration for serverless (P0, 2026-07-22).
 *
 * Root cause this fixes — from production Vercel logs:
 *   "Timed out fetching a new connection from the connection pool
 *    (Current connection pool timeout: 10, connection limit: 5)"
 *
 * Production's DATABASE_URL carries no pool params, so Prisma falls back to
 * its default connection_limit = number of CPUs (5 on Vercel) and
 * pool_timeout = 10s. One Vercel function instance serves MANY concurrent
 * requests through that single 5-connection pool; a traffic burst plus one
 * slow query (observed: /api/learner/profile-insights hitting the DB's own
 * statement timeout) starves the pool, and every queued query — including
 * /learn's 12s-budgeted user load — times out. That is what the
 * "Connection hiccup" screen was reporting.
 *
 * Fix: append explicit pool params to the datasource URL at client
 * construction, WITHOUT overriding anything already present — an operator
 * setting ?connection_limit=... in the Vercel env var always wins, as do
 * the PRISMA_CONNECTION_LIMIT / PRISMA_POOL_TIMEOUT env vars.
 *
 * Defaults: connection_limit=15 (safe against a pooled/pgbouncer URL, which
 * .env.example already prescribes for production; still modest for a direct
 * connection), pool_timeout=20 (rides out a several-second burst instead of
 * failing at 10s — page budgets of 12s+ mean a query that waits 11s and
 * then succeeds beats one that failed at 10s).
 */
export function withPoolParams(
  rawUrl: string | undefined,
  env: Record<string, string | undefined> = process.env,
): string | undefined {
  if (!rawUrl) return rawUrl
  try {
    const u = new URL(rawUrl)
    if (!u.searchParams.has('connection_limit')) {
      u.searchParams.set('connection_limit', env.PRISMA_CONNECTION_LIMIT ?? '15')
    }
    if (!u.searchParams.has('pool_timeout')) {
      u.searchParams.set('pool_timeout', env.PRISMA_POOL_TIMEOUT ?? '20')
    }
    return u.toString()
  } catch {
    // Unparseable URL (exotic escaping) — leave it exactly as provided
    // rather than risk mangling credentials.
    return rawUrl
  }
}
