import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'

/**
 * /api/health REPORTS THE CONNECTION'S ACTUAL TIMEOUTS.
 *
 * ── WHY THIS DIAGNOSTIC EXISTS ──────────────────────────────────────────────
 * `poolConfig.ts` requests `statement_timeout` and `lock_timeout`. For the life
 * of this project that request was made as bare URL parameters, which the
 * Prisma Postgres query engine silently ignores — so the timeouts were never in
 * effect anywhere, and the only external symptom was an absence: no `57014`
 * cancellations, ever, including against an INSERT measured at 83,994 ms.
 *
 * It cannot be checked from the database side either. PostgreSQL exposes a GUC
 * only to the session holding it, so no operator query can report what the
 * app's pooled connections carry. The app has to ask on its own client.
 *
 * The specific open question: production connects through Supavisor in
 * TRANSACTION mode, which may accept the `options` startup parameter without
 * forwarding it. A working connection is not evidence of an adopted setting.
 *
 * ── WHAT THESE TESTS PIN ────────────────────────────────────────────────────
 * That the diagnostic stays a DIAGNOSTIC: read-only, non-fatal, gated behind a
 * successful db check, and reporting PostgreSQL's own answer rather than
 * echoing back what the app asked for. Source assertions, because the route
 * needs a live database to execute.
 */
const HEALTH = readFileSync('src/app/api/health/route.ts', 'utf-8')

describe('/api/health db timeout diagnostic', () => {
  it('asks PostgreSQL for both settings, on the app\'s own Prisma client', () => {
    expect(HEALTH).toMatch(/current_setting\('statement_timeout'\)/)
    expect(HEALTH).toMatch(/current_setting\('lock_timeout'\)/)
    expect(HEALTH).toMatch(/prisma\.\$queryRaw/)
  })

  it('reports the SERVER\'s answer, never the value the app requested', () => {
    // Echoing poolConfig's own input back would answer the wrong question and
    // would have looked correct throughout the entire period the setting was
    // being ignored.
    expect(HEALTH).not.toMatch(/PRISMA_STATEMENT_TIMEOUT_MS/)
    expect(HEALTH).not.toMatch(/withPoolParams/)
    expect(HEALTH).not.toMatch(/statementTimeout:\s*'?\d/)
  })

  it('is read-only — no write, no lock, no sleep', () => {
    // Scoped to the QUERY, not the file: the first version of this test scanned
    // the whole source and failed on the word "lock" inside a comment. A guard
    // that forces the prose to be reworded is testing the wrong thing.
    // Anchored inside the DIAGNOSTIC block: `indexOf('prisma.$queryRaw')`
    // alone finds the route's pre-existing `SELECT 1` liveness probe, which is
    // a different query with different rules. Caught by this test failing.
    const block = HEALTH.indexOf('let dbTimeouts')
    const start = HEALTH.indexOf('prisma.$queryRaw', block)
    const sql = HEALTH.slice(start, HEALTH.indexOf('`,', start))
    expect(start).toBeGreaterThan(0)
    for (const forbidden of [/\bINSERT\b/i, /\bUPDATE\b/i, /\bDELETE\b/i, /\bALTER\b/i,
                             /\bCREATE\b/i, /\bDROP\b/i, /\bGRANT\b/i, /pg_sleep/i,
                             /FOR UPDATE/i, /\bLOCK\s+TABLE\b/i, /\bSET\b/i]) {
      expect(sql).not.toMatch(forbidden)
    }
    // and it is a SELECT of exactly the two settings, nothing else
    expect(sql).toMatch(/SELECT current_setting\('statement_timeout'\)/)
    expect(sql).toMatch(/current_setting\('lock_timeout'\)/)
    expect(sql).not.toMatch(/\bFROM\b/i)
  })

  it('runs only when the db check already succeeded', () => {
    // A failing health check must not be made slower by a second query.
    const dbCheck = HEALTH.indexOf('db = true')
    const guard = HEALTH.indexOf('if (db) {')
    expect(dbCheck).toBeGreaterThan(0)
    expect(guard).toBeGreaterThan(dbCheck)
  })

  it('is non-fatal: on any error it reports null and never changes the status code', () => {
    expect(HEALTH).toMatch(/let dbTimeouts: \{ statementTimeout: string; lockTimeout: string \} \| null = null/)
    // The status expression must depend on `db` alone, as before.
    expect(HEALTH).toMatch(/status: db \? 'ok' : 'degraded'/)
    expect(HEALTH).toMatch(/\{ status: db \? 200 : 503 \}/)
    const block = HEALTH.slice(HEALTH.indexOf('if (db) {'))
    expect(block.slice(0, 900)).toMatch(/catch \{/)
  })

  it('is bounded, like every other check in this route', () => {
    const block = HEALTH.slice(HEALTH.indexOf('if (db) {'), HEALTH.indexOf('if (db) {') + 900)
    expect(block).toMatch(/Promise\.race/)
    expect(block).toMatch(/setTimeout\(\(\) => reject/)
  })

  it('surfaces the values in the response payload', () => {
    expect(HEALTH).toMatch(/db, dbTimeouts, redis: redisStatus/)
  })

  it('exposes ONLY the two settings — no connection string, no credentials', () => {
    const block = HEALTH.slice(HEALTH.indexOf('let dbTimeouts'), HEALTH.indexOf('return NextResponse.json'))
    expect(block).not.toMatch(/DATABASE_URL|pooledUrl|password|connection_limit/i)
  })
})
