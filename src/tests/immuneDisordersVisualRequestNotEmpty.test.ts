/**
 * Launch-readiness item 4 (2026-10-03): the empty reply on
 * bio.immuno.immune-disorders after an explicit visual request (QA,
 * 2026-09-24). Its runtime logs are past retention, so the exact chain cannot
 * be re-read. The documented class is "a repair empties the text" — the
 * empty-reply net (2026-09-28) closes it — and the figure half was the missing
 * Tier 0 binding (bioVisualGapFix, 2026-09-25). This pins the reported shape
 * end to end: the model's reply is nothing but references to a figure, the
 * figure-reference repair strips them, and the learner still gets text and the
 * concept's own figure. Production since 2026-09-29: 0 empty of 3,835
 * assistant rows (biology 0 of 411).
 */
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { driveTurns } from './support/turnHarness'

const h = await vi.hoisted(async () => (await import('./support/turnHarness')).createHarness())
vi.mock('@/lib/auth', () => ({ auth: () => h.auth() }))
vi.mock('@/lib/db/prisma', () => ({ prisma: h.prisma }))
vi.mock('@/lib/rateLimit', () => ({ checkRateLimit: async () => ({ allowed: true }), rateLimitResponse: () => new Response('{}', { status: 429 }) }))
vi.mock('@/lib/ai/router', async (o) => ({ ...(await o<Record<string, unknown>>()), routeAI: (...a: unknown[]) => h.routeAI(...a) }))
const { POST } = await import('@/app/api/learn/chat/route')
beforeEach(() => { h.state.messages = []; h.state.snapshot = {} })

const LANE = { subjectSlug: 'biology', conceptId: 'bio.immuno.immune-disorders', lessonTitle: 'Immune Disorders' }

describe('explicit visual request on bio.immuno.immune-disorders', () => {
  it('a reply made only of figure references still reaches the learner as text, with the concept figure', async () => {
    const [, t] = await driveTurns(h, POST, [
      { learnerSays: 'ok', modelReplies: 'Immune disorders happen when the immune system attacks the body, overreacts, or fails to defend it.' },
      { learnerSays: 'do you have picture', modelReplies: 'Look at the diagram on your screen. As shown in the figure above.' },
    ] as never, LANE)
    const body = t.body as { text?: string; sceneSpec?: unknown; visualSpec?: unknown; visual?: unknown }
    expect((body.text ?? '').trim().length).toBeGreaterThan(0)
    expect(Boolean(body.sceneSpec || body.visualSpec || body.visual)).toBe(true)
  }, 120_000)
})
