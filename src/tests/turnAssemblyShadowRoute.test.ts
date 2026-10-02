/**
 * Turn assembly SHADOW through the real route (spec §8): on a graded tap the
 * served reply is byte-identical to mode off, and the assembled turn is logged.
 */
import { describe, it, expect, vi, afterEach } from 'vitest'
import { driveTurns, type TurnResult } from './support/turnHarness'

const h = await vi.hoisted(async () => (await import('./support/turnHarness')).createHarness())
vi.mock('@/lib/auth', () => ({ auth: () => h.auth() }))
vi.mock('@/lib/db/prisma', () => ({ prisma: h.prisma }))
vi.mock('@/lib/rateLimit', () => ({ checkRateLimit: async () => ({ allowed: true }), rateLimitResponse: () => new Response('{}', { status: 429 }) }))
vi.mock('@/lib/ai/router', async (o) => ({ ...(await o<Record<string, unknown>>()), routeAI: (...a: unknown[]) => h.routeAI(...a) }))
const { POST } = await import('@/app/api/learn/chat/route')

const PROBES = [1, 2, 3, 4, 5].map((n) => ({
  assetId: `probe-${n}`, conceptId: 'phys.mech.collisions-inelastic',
  stem: `Q${n}: Two carts stick together after colliding. What stays the same (case ${n})?`,
  choices: [{ text: `Total momentum (${n})`, isCorrect: true }, { text: `Total kinetic energy (${n})`, isCorrect: false }],
}))
const LANE = { probes: PROBES, subjectSlug: 'physics', conceptId: 'phys.mech.collisions-inelastic', lessonTitle: 'Inelastic Collisions' }
const SLOTS = JSON.stringify({ feedback: 'Momentum is conserved in every collision because no outside force acts on the two carts.', teaching: null })

const baseRouteAI = h.routeAI
let slotCalls = 0
const textOf = (t: TurnResult) => String((t.body as { text?: string }).text ?? '')

async function gradedTap(): Promise<TurnResult | null> {
  for (let i = 0; i < 12; i++) {
    h.state.messages = []; h.state.snapshot = {}
    const res = await driveTurns(h, POST, [
      { learnerSays: 'ok', modelReplies: 'Momentum is mass times velocity. In a collision the total momentum stays the same.' },
      { learnerSays: 'quiz me', modelReplies: "Here's one." },
      { learnerSays: (m: { options: string[] } | null) => (m ? m.options.find((o) => o.startsWith('Total momentum'))! : 'ok'), modelReplies: 'Correct, momentum is conserved.' },
    ] as never, LANE)
    if (res[2].logs.some((l) => l.includes('[mcq-grade]'))) return res[2]
  }
  return null
}

afterEach(() => { delete process.env.TURN_ASSEMBLY_MODE; h.routeAI = baseRouteAI })

describe('shadow mode leaves the served reply untouched', () => {
  it('logs [assembled-turn] and serves exactly what mode off serves', async () => {
    h.routeAI = async (...args: unknown[]) => {
      if (String(args[1] ?? '').includes('Return ONLY a JSON object')) { slotCalls++; return { text: SLOTS, provider: 'harness', finishReason: 'stop' } }
      return baseRouteAI(...args)
    }
    const off = await gradedTap()
    expect(off, 'no graded tap reached').not.toBeNull()
    expect(slotCalls).toBe(0)
    expect(off!.logs.some((l) => l.includes('[assembled-turn]'))).toBe(false)

    process.env.TURN_ASSEMBLY_MODE = 'shadow'
    const shadow = await gradedTap()
    expect(shadow).not.toBeNull()
    expect(slotCalls).toBeGreaterThan(0)
    expect(textOf(shadow!)).toBe(textOf(off!))
    const line = shadow!.logs.find((l) => l.includes('[assembled-turn]'))!
    expect(line).toBeTruthy()
    const logged = JSON.parse(line.slice(line.indexOf('{')))
    expect(logged.codes).toEqual([])
    expect(logged.assembledText).toMatch(/^(That's right\.|Correct — well done\.|Yes, exactly right\.)\n\n/)
    expect(logged.assembledText).toContain('Momentum is conserved in every collision')
    expect(logged.assembled.k2QuestionBesideCard).toBe(false)
    // Spec §2: whether the assembled text would close the concept exactly when
    // the served one did. A plain graded tap at this rung closes nothing either way.
    expect(logged.completionAgreement).toBe(true)
  }, 180_000)
})

describe('spec §4: one regeneration when a slot fails', () => {
  it('a question in the first reply is rejected, the second reply is used', async () => {
    let calls = 0
    h.routeAI = async (...args: unknown[]) => {
      const sys = String(args[1] ?? '')
      if (sys.includes('Return ONLY a JSON object')) {
        calls++
        const bad = JSON.stringify({ feedback: 'Momentum is conserved here. Can you say why that is true for every collision?', teaching: null })
        return { text: sys.includes('YOUR PREVIOUS ANSWER WAS REJECTED') ? SLOTS : bad, provider: 'harness', finishReason: 'stop' }
      }
      return baseRouteAI(...args)
    }
    process.env.TURN_ASSEMBLY_MODE = 'shadow'
    const t = await gradedTap()
    expect(t).not.toBeNull()
    const line = t!.logs.find((l) => l.includes('[assembled-turn]'))!
    const logged = JSON.parse(line.slice(line.indexOf('{')))
    expect(logged.attempts).toBe(2)
    expect(logged.codes).toEqual([])
    expect(logged.fallback).toBe(false)
    expect(logged.assembledText).not.toContain('?')
    expect(calls).toBeGreaterThanOrEqual(2)
  }, 180_000)
})
