/**
 * Turn assembly, Phase 3 step 2 through the real route: a turn that attaches a
 * card, and whose served text is not the graded assembled turn, carries no
 * question beside the card (K2). Shadow logs [assembled-attach] and serves the
 * live text unchanged; serve sends the assembled text and stores exactly it.
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
// A production K2 shape (Phase-0 hand-read): a confirm-back, teaching, then a
// second question of the model's own. The existing gate-contract stage drops
// the trailing question; the confirm-back survives it and reaches the learner.
const QUIZ_REPLY = 'Does that make sense so far? Momentum is the product of mass and velocity, and the carts share one velocity after they stick. Which quantity do you think survives the collision?'

const textOf = (t: TurnResult) => String((t.body as { text?: string }).text ?? '')
const mcqOf = (t: TurnResult) => (t.body as { mcq?: { question: string; options: string[] } | null }).mcq ?? null

async function cardTurn(): Promise<TurnResult | null> {
  for (let i = 0; i < 12; i++) {
    h.state.messages = []; h.state.snapshot = {}
    const res = await driveTurns(h, POST, [
      { learnerSays: 'ok', modelReplies: 'Momentum is mass times velocity. In a collision the total momentum stays the same.' },
      { learnerSays: 'quiz me', modelReplies: QUIZ_REPLY },
    ] as never, LANE)
    if (mcqOf(res[1])) return res[1]
  }
  return null
}

const attachLine = (t: TurnResult) => {
  const line = t.logs.find((l) => l.includes('[assembled-attach]'))
  return line ? JSON.parse(line.slice(line.indexOf('{'))) : null
}

afterEach(() => { delete process.env.TURN_ASSEMBLY_MODE })

describe('attach assembly (Phase 3 step 2)', () => {
  it('off: nothing is logged and the reply is untouched', async () => {
    const t = await cardTurn()
    expect(t, 'no card turn reached').not.toBeNull()
    expect(attachLine(t!)).toBeNull()
  }, 180_000)

  it('shadow: logs K2 before and after, and serves exactly what off serves', async () => {
    const off = await cardTurn()
    process.env.TURN_ASSEMBLY_MODE = 'shadow'
    const shadow = await cardTurn()
    expect(off).not.toBeNull()
    expect(shadow).not.toBeNull()
    expect(textOf(shadow!)).toBe(textOf(off!))
    const logged = attachLine(shadow!)
    expect(logged, 'no [assembled-attach] line').not.toBeNull()
    expect(logged.served).toBe('live')
    expect(textOf(off!)).toContain('?')
    expect(logged.before.k2QuestionBesideCard).toBe(true)
    expect(logged.changed).toBe(true)
    expect(logged.after.k2QuestionBesideCard).toBe(false)
  }, 180_000)

  it('serve: no question beside the card, one neutral lead-in, and the stored row is what was served', async () => {
    process.env.TURN_ASSEMBLY_MODE = 'serve'
    const t = await cardTurn()
    expect(t).not.toBeNull()
    const text = textOf(t!)
    expect(text).not.toContain('?')
    const { neutralLeadInFor } = await import('@/lib/teaching/gateAssessmentRenderer')
    const lead = neutralLeadInFor(mcqOf(t!)!.question)
    expect(text.split(lead).length - 1).toBe(1)
    const logged = attachLine(t!)
    expect(logged).not.toBeNull()
    expect(logged.changed).toBe(true)
    expect(logged.served).toBe('assembled')
    expect(logged.removed).toContain('Does that make sense so far?')
    expect(text.endsWith(logged.afterTail)).toBe(true)
    expect(text.startsWith('Momentum is the product of mass and velocity')).toBe(true)
    const { appendMcqToHistoryText } = await import('@/lib/teaching/mcq')
    const stored = [...h.state.messages].reverse().find((m) => m.role === 'ASSISTANT')!
    // Save once: the row is the served text, plus the card when this turn newly
    // attached it. A re-offered pending card is already in an earlier row and
    // is not appended twice (route: \`mcqToServeFinal\`, re-offer).
    expect([text, appendMcqToHistoryText(text, mcqOf(t!) as never)]).toContain(stored.content)
  }, 180_000)
})
