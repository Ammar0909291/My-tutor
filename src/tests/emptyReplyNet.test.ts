/**
 * Never a blank reply (2026-09-28, Physics Unit-1 certification pass 1: 2 of
 * ~690 production turns shipped text '' with no quiz). Whatever empties the
 * text, the final response carries something from the concept.
 */
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { readFileSync } from 'node:fs'
import { driveTurns } from './support/turnHarness'

const h = await vi.hoisted(async () => (await import('./support/turnHarness')).createHarness())
vi.mock('@/lib/auth', () => ({ auth: () => h.auth() }))
vi.mock('@/lib/db/prisma', () => ({ prisma: h.prisma }))
vi.mock('@/lib/rateLimit', () => ({
  checkRateLimit: async () => ({ allowed: true }),
  rateLimitResponse: () => new Response('{}', { status: 429 }),
}))
vi.mock('@/lib/ai/router', async (o) => ({ ...(await o<Record<string, unknown>>()), routeAI: (...a: unknown[]) => h.routeAI(...a) }))
const { POST } = await import('@/app/api/learn/chat/route')
beforeEach(() => { h.state.messages = []; h.state.snapshot = {} })

describe('never a blank reply', () => {
  it('a model turn that ends up empty still ships concept text', async () => {
    const [, t] = await driveTurns(h, POST, [
      { learnerSays: 'ok, continue', modelReplies: 'Tension is the pulling force transmitted through a rope.' },
      { learnerSays: 'continue', modelReplies: '   ' },
    ], { subjectSlug: 'physics', conceptId: 'phys.mech.tension', lessonTitle: 'Tension' })
    const body = t.body as { text?: string; mcq?: unknown }
    expect((body.text ?? '').trim().length > 0 || body.mcq != null).toBe(true)
  }, 60_000)

  it('the net runs after every rewriter and before the provenance log sees the final text', () => {
    const route = readFileSync('src/app/api/learn/chat/route.ts', 'utf8')
    const net = route.indexOf('[empty-reply-net]')
    const provenance = route.indexOf('// ── PHASE 0: TURN DECISION PROVENANCE')
    const ret = route.indexOf('success: true, text: cleanText, provider,')
    expect(net).toBeGreaterThan(route.indexOf('enforceQuestionDeliveryContract(cleanText, finalFallback)'))
    expect(provenance).toBeGreaterThan(net)
    expect(ret).toBeGreaterThan(provenance)
  })
})
