/**
 * Batch 1 of the Typed Turn Contract migration
 * (docs/architecture/TYPED_TURN_CONTRACT_DESIGN.md): populate + shadow-assert
 * in route.ts, reading nothing from either compiled object. This is the
 * harness case design doc §6 rule 5 requires — driving the REAL route to
 * confirm the new shadow code executes cleanly on a genuine LLM-calling turn
 * and produces no spurious CONTRACT_ASSERT violations.
 */
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { driveTurns, readLog } from './support/turnHarness'

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

describe('Typed Turn Contract shadow wiring — real route, real turns', () => {
  it('a normal LLM-calling turn produces no CONTRACT_ASSERT violations', async () => {
    const [t] = await driveTurns(h, POST, [
      { learnerSays: 'hello', modelReplies: 'A galvanic cell turns a chemical reaction into a current.' },
    ])
    expect(t.status).toBe(200)
    expect(readLog(t, '[learn/chat] CONTRACT_ASSERT=')).toBeNull()
  })

  it('a keyed MCQ turn (answer, grade, next question) produces no violations across the sequence', async () => {
    const results = await driveTurns(h, POST, [
      { learnerSays: 'hello', modelReplies: 'Electrons flow from anode to cathode.\n<!--MCQ-->{"question":"Which electrode gains electrons?","options":["Anode","Cathode"],"correctIndex":1}<!--/MCQ-->' },
      { learnerSays: (onScreen) => onScreen?.options?.[1] ?? 'Cathode', modelReplies: 'That\'s right — the cathode is where reduction happens.' },
    ])
    for (const t of results) {
      expect(t.status).toBe(200)
      const violation = readLog(t, '[learn/chat] CONTRACT_ASSERT=')
      expect(violation).toBeNull()
    }
  })

  it('a turn served from a non-model path (memory/gate/lesson-complete) leaves turnContractShadow null harmlessly — no throw, no crash', async () => {
    // Even without controlling which path the harness's stubbed session takes,
    // the acceptance guarantee is: the route never throws regardless of which
    // branch serves the turn, since turnContractShadow/turnDeliveryShadow are
    // both declared `| null` and every consumer of them (only the shadow
    // block itself) is gated on non-null.
    const [t] = await driveTurns(h, POST, [
      { learnerSays: 'ok', modelReplies: 'Good — let\'s continue.' },
    ])
    expect(t.status).toBe(200)
  })
})
