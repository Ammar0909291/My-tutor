/**
 * Prisma connection-pool configuration for serverless (P0, 2026-07-22;
 * extended same day after live production logs showed the pool-size fix
 * alone was insufficient).
 *
 * Root cause #1 (fixed by connection_limit/pool_timeout below) — from
 * production Vercel logs:
 *   "Timed out fetching a new connection from the connection pool
 *    (Current connection pool timeout: 10, connection limit: 5)"
 *
 * Production's DATABASE_URL carried no pool params, so Prisma fell back to
 * its default connection_limit = number of CPUs (5 on Vercel) and
 * pool_timeout = 10s. One Vercel function instance serves MANY concurrent
 * requests through that single 5-connection pool; a traffic burst starved
 * it, and every queued query — including /learn's 12s-budgeted user load —
 * timed out. That is what the "Connection hiccup" screen was reporting.
 *
 * Root cause #2 (fixed by statement_timeout/socket_timeout below) — the
 * pool-size fix alone does not stop the ORIGINAL trigger: a single slow or
 * runaway query holds a connection for as long as the database lets it,
 * which starves however many connections the pool has, at any size.
 * Confirmed live in production logs AFTER the pool-size fix deployed:
 * Postgres itself killing a plain profile.findUnique with
 * "57014 canceling statement due to statement timeout" — the DATABASE's
 * own (much longer, provider-default) statement timeout was the thing
 * finally bounding a stuck query, not anything in this app. A query that
 * hangs for the database's full timeout window still starves this app's
 * pool for that whole window. This is the actual "fix forever" layer: it
 * makes every query — issued by any route, written today or tomorrow —
 * self-bound at the CONNECTION level, so no single query can ever again
 * hold a pool slot past a fixed ceiling, independent of which endpoint
 * issued it or whether that endpoint remembered to add its own
 * withTimeout() wrapper.
 *
 * Fix: append explicit params to the datasource URL at client
 * construction, WITHOUT overriding anything already present — an operator
 * setting any of these in the Vercel env var always wins, as do the
 * matching PRISMA_* env var overrides.
 *
 * Defaults:
 *   connection_limit=15  — safe against a pooled/pgbouncer URL (which
 *                          .env.example already prescribes for production).
 *   pool_timeout=20       — rides out a several-second burst instead of
 *                          failing at 10s; page budgets of 12s+ mean a
 *                          query that waits 11s and succeeds beats one
 *                          that failed at 10s.
 *   statement_timeout=15000 (ms) — no single query may run past 15s;
 *                          Postgres itself cancels it, freeing the
 *                          connection back to the pool. Set below
 *                          pool_timeout*1000 so a query that's going to
 *                          fail dies before it can make every OTHER
 *                          waiter in the pool time out too.
 *   socket_timeout=20 (s) — network-level backstop for a connection that
 *                          hangs before even reaching query execution
 *                          (a TCP stall neither statement_timeout nor
 *                          pool_timeout covers).
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
    if (!u.searchParams.has('statement_timeout')) {
      u.searchParams.set('statement_timeout', env.PRISMA_STATEMENT_TIMEOUT_MS ?? '15000')
    }
    if (!u.searchParams.has('socket_timeout')) {
      u.searchParams.set('socket_timeout', env.PRISMA_SOCKET_TIMEOUT ?? '20')
    }
    return u.toString()
  } catch {
    // Unparseable URL (exotic escaping) — leave it exactly as provided
    // rather than risk mangling credentials.
    return rawUrl
  }
}
