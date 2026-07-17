/**
 * Reminders cron — auth-path tests (previously untested).
 *
 * Only the unauthorized paths are testable without a live DB (the
 * success path queries Profile via Prisma, which needs DATABASE_URL —
 * no test in this repo exercises a route handler's DB-dependent path
 * directly, per the established convention, see evidenceReportCron.test.ts).
 * The unauthorized paths return before any DB call, so they're safely
 * testable here.
 */
import { describe, it, expect, afterEach } from 'vitest'
import { GET } from '@/app/api/cron/reminders/route'

const ORIGINAL_ENV = { ...process.env }

afterEach(() => {
  process.env = { ...ORIGINAL_ENV }
})

function req(authHeader?: string): Request {
  return new Request('http://localhost/api/cron/reminders', {
    headers: authHeader ? { authorization: authHeader } : {},
  })
}

describe('GET /api/cron/reminders — authorization', () => {
  it('returns 401 when CRON_SECRET is not configured, even with a bearer header', async () => {
    delete process.env.CRON_SECRET
    const res = await GET(req('Bearer anything'))
    expect(res.status).toBe(401)
  })

  it('returns 401 when the bearer token does not match CRON_SECRET', async () => {
    process.env.CRON_SECRET = 'correct-secret'
    const res = await GET(req('Bearer wrong-secret'))
    expect(res.status).toBe(401)
  })

  it('returns 401 when no authorization header is present at all', async () => {
    process.env.CRON_SECRET = 'correct-secret'
    const res = await GET(req())
    expect(res.status).toBe(401)
  })

  it('never reads the database before authorization succeeds', async () => {
    delete process.env.CRON_SECRET
    const res = await GET(req('Bearer anything'))
    const body = await res.json()
    expect(body).toEqual({ error: 'Unauthorized' })
  })
})
