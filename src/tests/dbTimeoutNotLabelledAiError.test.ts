/**
 * A database timeout is not an AI failure (2026-10-02).
 *
 * MEASURED in production at 17:59:59 UTC: a turn returned 500 "AI service
 * temporarily unavailable" while the provider had answered fine — the cause
 * was `chat-assistant-message timed out after 8000ms`, a DB write. The route's
 * inner catch labelled every error inside the turn as an AI error, so the
 * outer catch that already tells DB timeouts and outages apart (503 with
 * `kind`) never saw them.
 */
import { describe, it, expect, vi, afterEach } from 'vitest'
import { driveTurns } from './support/turnHarness'
import { TimeoutError } from '@/lib/net/timeout'

let failAssistantWrite: (() => Error) | null = null

const h = await vi.hoisted(async () => (await import('./support/turnHarness')).createHarness())
vi.mock('@/lib/auth', () => ({ auth: () => h.auth() }))
vi.mock('@/lib/db/prisma', () => ({
  prisma: new Proxy({}, {
    get(_t, model: string) {
      const inner = (h.prisma as Record<string, unknown>)[model]
      if (model !== 'message' || !inner) return inner
      return new Proxy(inner as Record<string, unknown>, {
        get(_t2, method: string) {
          const fn = (inner as Record<string, (a: unknown) => Promise<unknown>>)[method]
          if (method !== 'create') return fn
          return async (arg: { data?: { role?: string } }) => {
            if (failAssistantWrite && arg?.data?.role === 'ASSISTANT') throw failAssistantWrite()
            return fn(arg)
          }
        },
      })
    },
  }),
}))
vi.mock('@/lib/rateLimit', () => ({ checkRateLimit: async () => ({ allowed: true }), rateLimitResponse: () => new Response('{}', { status: 429 }) }))
vi.mock('@/lib/ai/router', async (o) => ({ ...(await o<Record<string, unknown>>()), routeAI: (...a: unknown[]) => h.routeAI(...a) }))
const { POST } = await import('@/app/api/learn/chat/route')

const baseRouteAI = h.routeAI
afterEach(() => { failAssistantWrite = null; h.routeAI = baseRouteAI; h.state.messages = []; h.state.snapshot = {} })

const turn = () => driveTurns(h, POST, [{ learnerSays: 'ok', modelReplies: 'A galvanic cell turns a chemical reaction into an electric current.' }])

describe('the chat route labels a failed turn by what actually failed', () => {
  it('a DB write timeout is a retryable 503 db_timeout, not "AI service unavailable"', async () => {
    failAssistantWrite = () => new TimeoutError(8000, 'chat-assistant-message')
    const [t] = await turn()
    expect(t.status).toBe(503)
    expect(t.body.kind).toBe('db_timeout')
    expect(String(t.body.error)).not.toMatch(/AI service/)
    expect(t.logs.some((l) => l.includes('[learn/chat] AI error'))).toBe(false)
  }, 120_000)

  it('a lost DB connection is a 503 db_unavailable', async () => {
    failAssistantWrite = () => Object.assign(new Error("Can't reach database server"), { code: 'P1001' })
    const [t] = await turn()
    expect(t.status).toBe(503)
    expect(t.body.kind).toBe('db_unavailable')
  }, 120_000)

  it('any other error keeps the existing 500 (a provider failure never reaches here: it is served as degraded copy)', async () => {
    failAssistantWrite = () => new Error('unexpected')
    const [t] = await turn()
    expect(t.status).toBe(500)
    expect(String(t.body.error)).toMatch(/AI service temporarily unavailable/)
  }, 120_000)
})
