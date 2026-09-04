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
 *   lock_timeout=8000 (ms) — see below; new, and the reason this file
 *                          changed.
 *
 * ── ROOT CAUSE #3: "statement_timeout" WAS NEVER REACHING POSTGRES ──────────
 *
 * Everything above about statement_timeout was TRUE AS AN INTENTION and FALSE
 * IN PRODUCTION. `statement_timeout` is not a connection-string parameter the
 * Prisma Postgres connector understands; it was appended to the URL, silently
 * ignored by the query engine, and Postgres kept its own default.
 *
 * MEASURED, twice, independently:
 *
 *  1. Production (2026-09-04): db statement_timeout = 120000, lock_timeout = 0,
 *     ZERO `57014 canceling statement due to statement timeout` events in 24h,
 *     against an observed INSERT that ran 83,994 ms without being cancelled.
 *
 *  2. Locally against a throwaway PostgreSQL 16 with the exact @prisma/client
 *     this repo installs (6.19.3), reading back `current_setting(...)`:
 *
 *       this function's OLD output ............ statement_timeout=0  lock_timeout=0
 *       options=-c statement_timeout=15000 .... statement_timeout=15s
 *       options=-c ... -c lock_timeout=8000 ... statement_timeout=15s lock_timeout=8s
 *
 *     and functionally, `select pg_sleep(5)`:
 *       old form (statement_timeout=1000) ..... ran the full 5,128 ms, no cancel
 *       options form (statement_timeout=1000) . cancelled at 1,070 ms, SQLSTATE 57014
 *
 *     The engine binary agrees: `connection_limit`, `pool_timeout`,
 *     `socket_timeout`, `connect_timeout`, `pgbouncer` and `options` all appear
 *     in libquery_engine; `statement_timeout` does not appear at all.
 *
 * So the timeouts move to `options`, which is libpq's documented passthrough
 * for server settings and IS understood by the engine. Verified to compose
 * with `pgbouncer=true` and with the existing pool params.
 *
 * ── WHY lock_timeout IS ADDED, AND WHY IT IS THE SHORTER OF THE TWO ─────────
 *
 * statement_timeout bounds a query that is RUNNING. It does not distinguish a
 * query blocked behind another transaction's row lock, and in production that
 * is what actually starved the pool: eight backends waited 1s-84s on ShareLock
 * for one learner's own `topic_progress` row while `lock_timeout` was 0. A
 * blocked writer should give up fast and let the caller retry, not sit in a
 * pool slot — so lock_timeout (8s) < statement_timeout (15s) < pool_timeout
 * (20s), each layer failing before the one outside it.
 *
 * ── THE LEGACY URL PARAM IS LEFT IN PLACE ──────────────────────────────────
 *
 * Removing `statement_timeout=` from the URL would be tidier and is NOT done:
 * an operator may already have it set in DATABASE_URL, this function's contract
 * is that operator config wins, and a param the engine ignores is inert either
 * way. It stays as the operator-visible declaration of intent; `options` is
 * what Postgres actually receives.
 *
 * ── WHAT THIS CANNOT VERIFY ────────────────────────────────────────────────
 *
 * Production connects through Supavisor in TRANSACTION mode (.env.example:
 * port 6543, `?pgbouncer=true`). Whether that pooler forwards the `options`
 * startup parameter to the backend was NOT tested here — it cannot be without
 * production traffic. If it does not, the effective fix is a role-level
 * `ALTER ROLE ... SET statement_timeout`, which is a database configuration
 * change and an owner decision. Check by reading back `current_setting(
 * 'statement_timeout')` from a production request after deploying.
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
    // The only form Postgres actually adopts — see ROOT CAUSE #3 above. Same
    // never-override contract as every param above: an operator who has set
    // `options` themselves keeps it verbatim, and the two PRISMA_* overrides
    // still choose the values.
    if (!u.searchParams.has('options')) {
      const statementMs = env.PRISMA_STATEMENT_TIMEOUT_MS ?? '15000'
      const lockMs = env.PRISMA_LOCK_TIMEOUT_MS ?? '8000'
      u.searchParams.set('options', `-c statement_timeout=${statementMs} -c lock_timeout=${lockMs}`)
    }
    return u.toString()
  } catch {
    // Unparseable URL (exotic escaping) — leave it exactly as provided
    // rather than risk mangling credentials.
    return rawUrl
  }
}
