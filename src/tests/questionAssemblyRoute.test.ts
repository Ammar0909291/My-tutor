/**
 * Turn assembly, Phase 3 step 5 through the real route: a learner's question
 * (nothing graded, no card) logs [assembled-question] in shadow and serves the
 * live reply; with TURN_ASSEMBLY_QUESTION_MODE=serve it serves the assembled one.
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
  assetId: `probe-${n}`, conceptId: 'phys.mech.normal-force',
  stem: `Q${n}: A book rests on a table. Which force balances its weight (case ${n})?`,
  choices: [{ text: `The normal force (${n})`, isCorrect: true }, { text: `Friction (${n})`, isCorrect: false }],
}))
// No authored probes: no card can attach, so this is a plain question turn
// (a turn with a card on screen is the attach assembler's).
const LANE = { probes: [] as typeof PROBES, subjectSlug: 'physics', conceptId: 'phys.mech.normal-force', lessonTitle: 'Normal Force' }
const ANSWER = 'The normal force is the push a surface gives back, perpendicular to it. On a flat table it balances the weight, so the book does not accelerate.'
// Two questions back to the learner: the first one goes, the last one stays.
const REPLY = `${ANSWER} Does that make sense so far?\n\nWhat do you think changes when the table is tilted?`

const textOf = (t: TurnResult) => String((t.body as { text?: string }).text ?? '')
const lineOf = (t: TurnResult) => {
  const l = t.logs.find((x) => x.includes('[assembled-question]'))
  return l ? JSON.parse(l.slice(l.indexOf('{'))) : null
}

async function questionTurn(): Promise<TurnResult> {
  h.state.messages = []; h.state.snapshot = {}
  const res = await driveTurns(h, POST, [
    { learnerSays: 'ok', modelReplies: 'The normal force acts perpendicular to a surface. It is a contact force.' },
    { learnerSays: 'why does the table push back on the book?', modelReplies: REPLY },
  ] as never, LANE)
  return res[1]
}

afterEach(() => { delete process.env.TURN_ASSEMBLY_MODE; delete process.env.TURN_ASSEMBLY_QUESTION_MODE })

describe('learner-question assembly (Phase 3 step 5)', () => {
  it('off: no line', async () => {
    expect(lineOf(await questionTurn())).toBeNull()
  }, 180_000)

  it('shadow, also under global serve: logs before/after and serves the live reply', async () => {
    const off = await questionTurn()
    process.env.TURN_ASSEMBLY_MODE = 'serve'
    const t = await questionTurn()
    const logged = lineOf(t)
    expect(logged, 'no [assembled-question] line').not.toBeNull()
    expect(logged.served).toBe('live')
    expect(textOf(t)).toBe(textOf(off))
    // The live path keeps the confirm-back: two questions back to the learner.
    expect(textOf(off)).toContain('Does that make sense')
    expect(logged.before.learnerQuestions).toBe(2)
    expect(logged.after.learnerQuestions).toBe(1)
    expect(logged.changed).toBe(true)
  }, 180_000)

  it('serve (own switch): the assembled reply is sent and stored', async () => {
    process.env.TURN_ASSEMBLY_MODE = 'serve'
    process.env.TURN_ASSEMBLY_QUESTION_MODE = 'serve'
    const t = await questionTurn()
    const logged = lineOf(t)
    expect(logged).not.toBeNull()
    expect(textOf(t)).not.toContain('Does that make sense')
    expect(logged.served).toBe('assembled')
    expect(textOf(t).endsWith('What do you think changes when the table is tilted?')).toBe(true)
    const stored = [...h.state.messages].reverse().find((m) => m.role === 'ASSISTANT')!
    expect(stored.content).toBe(textOf(t))
  }, 180_000)

  it('every learner question logs a line, card on screen or not (the attach assembler owns a card turn\'s text)', async () => {
    process.env.TURN_ASSEMBLY_MODE = 'shadow'
    h.state.messages = []; h.state.snapshot = {}
    const res = await driveTurns(h, POST, [
      { learnerSays: 'ok', modelReplies: 'The normal force acts perpendicular to a surface. It is a contact force.' },
      { learnerSays: 'quiz me', modelReplies: "Here's one." },
      { learnerSays: 'why does the table push back on the book?', modelReplies: REPLY },
    ] as never, { ...LANE, probes: PROBES })
    const t = res[2]
    const logged = lineOf(t)
    expect(logged, 'no [assembled-question] line').not.toBeNull()
    const card = Boolean((t.body as { mcq?: unknown }).mcq)
    expect(logged.cardOnScreen).toBe(card)
    if (card) { expect(logged.changed).toBe(false); expect(logged.served).toBe('live') }
  }, 180_000)
})
