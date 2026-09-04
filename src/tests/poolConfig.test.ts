import { describe, it, expect } from 'vitest'
import { withPoolParams } from '@/lib/db/poolConfig'

/**
 * P0 pool-exhaustion fix (production Vercel logs: "Timed out fetching a new
 * connection from the connection pool ... connection limit: 5"). The
 * datasource URL must always carry explicit, operator-overridable pool
 * params so Prisma never falls back to its tiny serverless-hostile default.
 */
describe('withPoolParams', () => {
  const BASE = 'postgresql://user:pass@ep-xyz-pooler.aws.neon.tech:5432/neondb?sslmode=require'

  it('appends serverless-appropriate defaults when the URL has none', () => {
    const out = new URL(withPoolParams(BASE, {})!)
    expect(out.searchParams.get('connection_limit')).toBe('15')
    expect(out.searchParams.get('pool_timeout')).toBe('20')
    expect(out.searchParams.get('sslmode')).toBe('require') // existing params kept
  })

  it('appends statement_timeout and socket_timeout — the "forever" backstop so no single query can starve the pool regardless of which route issued it', () => {
    const out = new URL(withPoolParams(BASE, {})!)
    // SUPERSEDED IN MEANING, KEPT ON PURPOSE. This assertion was written when
    // the URL parameter was believed to reach Postgres. It does not — see the
    // `options` tests below and poolConfig.ts's ROOT CAUSE #3. The param stays
    // as the operator-visible declaration of intent, so this still holds; it is
    // no longer the assertion that proves the timeout is ENFORCED.
    expect(out.searchParams.get('statement_timeout')).toBe('15000')
    expect(out.searchParams.get('socket_timeout')).toBe('20')
  })

  /**
   * ROOT CAUSE #3 — the timeouts must travel as `options`, which is the only
   * form the Prisma Postgres connector passes through to the server.
   *
   * MEASURED against a throwaway PostgreSQL 16 with the installed
   * @prisma/client (6.19.3), reading back `current_setting(...)`:
   *   this function's OLD output ......... statement_timeout=0  lock_timeout=0
   *   this function's NEW output ......... statement_timeout=15s lock_timeout=8s
   * and functionally `select pg_sleep(5)` went from running the full 5,128 ms
   * uncancelled to being cancelled at 1,070 ms with SQLSTATE 57014.
   *
   * These tests cannot re-run that (no database here), so they pin the SHAPE
   * that was measured to work. A future edit that drops `options` or moves a
   * timeout back to a bare parameter silently disables both timeouts again.
   */
  it('carries statement_timeout AND lock_timeout inside `options` — the only form Postgres adopts', () => {
    const opts = new URL(withPoolParams(BASE, {})!).searchParams.get('options')
    expect(opts).toBe('-c statement_timeout=15000 -c lock_timeout=8000')
  })

  it('lock_timeout < statement_timeout < pool_timeout — each layer fails before the one outside it', () => {
    const out = new URL(withPoolParams(BASE, {})!)
    const opts = out.searchParams.get('options')!
    const lockMs = Number(/lock_timeout=(\d+)/.exec(opts)![1])
    const statementMs = Number(/statement_timeout=(\d+)/.exec(opts)![1])
    const poolMs = Number(out.searchParams.get('pool_timeout')) * 1000
    expect(lockMs).toBeLessThan(statementMs)
    expect(statementMs).toBeLessThan(poolMs)
  })

  it('lock_timeout is bounded at all — 0 is what production had, and it is what let eight backends wait up to 84s', () => {
    const opts = new URL(withPoolParams(BASE, {})!).searchParams.get('options')!
    expect(Number(/lock_timeout=(\d+)/.exec(opts)![1])).toBeGreaterThan(0)
  })

  it('PRISMA_STATEMENT_TIMEOUT_MS / PRISMA_LOCK_TIMEOUT_MS choose the values inside `options`', () => {
    const opts = new URL(withPoolParams(BASE, {
      PRISMA_STATEMENT_TIMEOUT_MS: '9000',
      PRISMA_LOCK_TIMEOUT_MS: '4000',
    })!).searchParams.get('options')
    expect(opts).toBe('-c statement_timeout=9000 -c lock_timeout=4000')
  })

  it('never overrides an `options` the operator already set', () => {
    const out = new URL(withPoolParams(`${BASE}&options=${encodeURIComponent('-c statement_timeout=3000')}`, {})!)
    expect(out.searchParams.get('options')).toBe('-c statement_timeout=3000')
  })

  it('composes with a pgbouncer/transaction-pooler URL without disturbing it', () => {
    const out = new URL(withPoolParams('postgresql://u:p@host:6543/db?pgbouncer=true', {})!)
    expect(out.searchParams.get('pgbouncer')).toBe('true')
    expect(out.searchParams.get('options')).toContain('statement_timeout=15000')
  })

  it('statement_timeout stays below pool_timeout*1000 so a runaway query dies before starving every other waiter', () => {
    const out = new URL(withPoolParams(BASE, {})!)
    const statementMs = Number(out.searchParams.get('statement_timeout'))
    const poolMs = Number(out.searchParams.get('pool_timeout')) * 1000
    expect(statementMs).toBeLessThan(poolMs)
  })

  it('never overrides params already present in the URL (operator config wins)', () => {
    const out = new URL(withPoolParams(`${BASE}&connection_limit=3&pool_timeout=5&statement_timeout=1000&socket_timeout=2`, {})!)
    expect(out.searchParams.get('connection_limit')).toBe('3')
    expect(out.searchParams.get('pool_timeout')).toBe('5')
    expect(out.searchParams.get('statement_timeout')).toBe('1000')
    expect(out.searchParams.get('socket_timeout')).toBe('2')
  })

  it('honors PRISMA_CONNECTION_LIMIT / PRISMA_POOL_TIMEOUT / PRISMA_STATEMENT_TIMEOUT_MS / PRISMA_SOCKET_TIMEOUT env overrides', () => {
    const out = new URL(withPoolParams(BASE, {
      PRISMA_CONNECTION_LIMIT: '30',
      PRISMA_POOL_TIMEOUT: '25',
      PRISMA_STATEMENT_TIMEOUT_MS: '9000',
      PRISMA_SOCKET_TIMEOUT: '12',
    })!)
    expect(out.searchParams.get('connection_limit')).toBe('30')
    expect(out.searchParams.get('pool_timeout')).toBe('25')
    expect(out.searchParams.get('statement_timeout')).toBe('9000')
    expect(out.searchParams.get('socket_timeout')).toBe('12')
  })

  it('passes through undefined and unparseable URLs untouched', () => {
    expect(withPoolParams(undefined, {})).toBeUndefined()
    expect(withPoolParams('not a url at all', {})).toBe('not a url at all')
  })

  it('preserves credentials exactly (no mangling of user:pass)', () => {
    const out = withPoolParams('postgresql://u%40x:p%23w@host:6543/db?pgbouncer=true', {})!
    expect(out).toContain('u%40x:p%23w@host:6543')
    expect(new URL(out).searchParams.get('pgbouncer')).toBe('true')
  })
})
