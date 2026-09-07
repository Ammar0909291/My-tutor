/**
 * S0 ACCEPTANCE — does the harness actually drive the real route?
 *
 * If the happy path does not work here, nothing built on this harness counts.
 * That is the whole purpose of this file: prove the instrument before trusting
 * any verdict it produces. (This codebase's own history: "the harness has
 * nearly condemned the product for its own blind spot" four times.)
 */
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { createHarness, driveTurns, readLog } from './support/turnHarness'

const h = await vi.hoisted(async () => {
  const m = await import('./support/turnHarness')
  return m.createHarness()
})

vi.mock('@/lib/auth', () => ({ auth: () => h.auth() }))
vi.mock('@/lib/db/prisma', () => ({ prisma: h.prisma }))
vi.mock('@/lib/rateLimit', () => ({
  checkRateLimit: async () => ({ allowed: true }),
  rateLimitResponse: () => new Response(JSON.stringify({ error: 'rate' }), { status: 429 }),
}))
vi.mock('@/lib/ai/router', async (orig) => {
  const actual = await orig<Record<string, unknown>>()
  return { ...actual, routeAI: (...a: unknown[]) => h.routeAI(...a) }
})

const { POST } = await import('@/app/api/learn/chat/route')

beforeEach(() => {
  h.state.messages = []
  h.state.snapshot = {}
})

describe('S0 — the harness reaches the real route', () => {
  it('a turn returns 200 and produces a reply', async () => {
    const [t] = await driveTurns(h, POST, [
      { learnerSays: 'hello', modelReplies: 'A galvanic cell turns a chemical reaction into a current.' },
    ])
    expect(t.status).toBe(200)
    expect(JSON.stringify(t.body)).toContain('galvanic')
  })

  it('the real assessment gate ran, and published its terms', async () => {
    const [t] = await driveTurns(h, POST, [
      { learnerSays: 'hello', modelReplies: 'Electrons flow from anode to cathode.' },
    ])
    const gate = readLog(t, '[gate-eligibility]')
    expect(gate).not.toBeNull()
    expect(gate).toHaveProperty('phase')
    expect(gate).toHaveProperty('blockedBy')
  })

  it('conversation state is persisted across turns by the real fold', async () => {
    const res = await driveTurns(h, POST, [
      { learnerSays: 'hi', modelReplies: 'Let us start with what a cell does.' },
      { learnerSays: 'got it', modelReplies: 'Good. Next: the two electrodes.' },
    ])
    const last = res[res.length - 1].snapshot?.conversationState as Record<string, unknown> | undefined
    expect(last).toBeDefined()
    expect(typeof last?.phase).toBe('string')
  })
})
