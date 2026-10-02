/**
 * No database write outlives its response (2026-10-02).
 *
 * MEASURED in production `pg_stat_activity`: eight connections "idle in
 * transaction" for up to 658 s, last statements a `spine_events` INSERT, an
 * `explanation_assets` INSERT and plain BEGINs — writes the chat route started
 * and never awaited. A serverless instance freezes when its response returns,
 * so those transactions stayed open and two learners' next turns timed out
 * (`chat-assistant-message timed out after 8000ms` -> 500).
 *
 * Here the background writes are made slow (as a busy database makes them) and
 * the turn must not return while any of them is still running.
 */
import { describe, it, expect, vi } from 'vitest'
import { driveTurns } from './support/turnHarness'
import { withPendingWrites, trackWrite, settlePendingWrites } from '@/lib/db/pendingWrites'

const SLOW_MS = 250
const slow = { inFlight: 0, started: 0 }
const SLOW_WRITES: Record<string, string[]> = {
  spineEvent: ['create'],
  evidenceEvent: ['create'],
  mistakeRecord: ['create'],
}

const h = await vi.hoisted(async () => (await import('./support/turnHarness')).createHarness())
vi.mock('@/lib/auth', () => ({ auth: () => h.auth() }))
vi.mock('@/lib/db/prisma', () => ({
  prisma: new Proxy({}, {
    get(_t, model: string) {
      const inner = (h.prisma as Record<string, unknown>)[model]
      if (!SLOW_WRITES[model] || !inner) return inner
      return new Proxy(inner as Record<string, unknown>, {
        get(_t2, method: string) {
          const fn = (inner as Record<string, (a: unknown) => Promise<unknown>>)[method]
          if (!SLOW_WRITES[model].includes(method)) return fn
          return async (arg: unknown) => {
            slow.inFlight++; slow.started++
            try {
              await new Promise((r) => setTimeout(r, SLOW_MS))
              return await fn(arg)
            } finally { slow.inFlight-- }
          }
        },
      })
    },
  }),
}))
vi.mock('@/lib/rateLimit', () => ({ checkRateLimit: async () => ({ allowed: true }), rateLimitResponse: () => new Response('{}', { status: 429 }) }))
vi.mock('@/lib/ai/router', async (o) => ({ ...(await o<Record<string, unknown>>()), routeAI: (...a: unknown[]) => h.routeAI(...a) }))
const { POST } = await import('@/app/api/learn/chat/route')

describe('the chat route settles its background writes before replying', () => {
  it('no spine/evidence/mistake write is still running when the turn returns', async () => {
    const turns = await driveTurns(h, POST, [
      { learnerSays: 'ok', modelReplies: 'A galvanic cell turns a chemical reaction into an electric current.' },
      { learnerSays: 'i am confused', modelReplies: 'Let us take it slowly. Electrons flow from the anode to the cathode.' },
    ])
    expect(turns.every((t) => t.status === 200)).toBe(true)
    // The test only means something if slow writes actually ran.
    expect(slow.started).toBeGreaterThan(0)
    expect(slow.inFlight).toBe(0)
  }, 120_000)
})

describe('pendingWrites', () => {
  it('outside a scope trackWrite is a pass-through and settling waits for nothing', async () => {
    await expect(trackWrite(Promise.resolve(7))).resolves.toBe(7)
    expect(await settlePendingWrites(50)).toEqual({ waitedFor: 0, stillPending: 0, waitedMs: 0 })
  })

  it('waits for writes recorded before and during settling; a rejection never escapes', async () => {
    const done: string[] = []
    const r = await withPendingWrites(async () => {
      trackWrite(new Promise((res) => setTimeout(() => { done.push('a'); res(1) }, 30)).then(() => {
        trackWrite(new Promise((res) => setTimeout(() => { done.push('b'); res(2) }, 30)))
      }))
      trackWrite(Promise.reject(new Error('write failed'))).catch(() => {})
      return settlePendingWrites(2000)
    })
    expect(done).toEqual(['a', 'b'])
    expect(r.stillPending).toBe(0)
    expect(r.waitedFor).toBe(3)
  })

  it('stops at the cap and reports what is still running', async () => {
    const r = await withPendingWrites(async () => {
      trackWrite(new Promise((res) => setTimeout(res, 500)))
      return settlePendingWrites(40)
    })
    expect(r.stillPending).toBe(1)
    expect(r.waitedMs).toBeLessThan(400)
  })
})
