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

  it('never overrides params already present in the URL (operator config wins)', () => {
    const out = new URL(withPoolParams(`${BASE}&connection_limit=3&pool_timeout=5`, {})!)
    expect(out.searchParams.get('connection_limit')).toBe('3')
    expect(out.searchParams.get('pool_timeout')).toBe('5')
  })

  it('honors PRISMA_CONNECTION_LIMIT / PRISMA_POOL_TIMEOUT env overrides', () => {
    const out = new URL(withPoolParams(BASE, { PRISMA_CONNECTION_LIMIT: '30', PRISMA_POOL_TIMEOUT: '25' })!)
    expect(out.searchParams.get('connection_limit')).toBe('30')
    expect(out.searchParams.get('pool_timeout')).toBe('25')
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
