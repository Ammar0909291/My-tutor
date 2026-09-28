/**
 * A lesson-one learner who asks "quiz me" gets a reviewed question (2026-09-28,
 * Physics Unit-1 certification pass 2, production 1aa77824, phys.meas.units —
 * the entry lesson of every beginner). `notFirstLesson` refused the authored
 * probe; the invented-probe guard reads that as a POLICY refusal and withheld
 * the model's question too, so the learner got one KG sentence and no question.
 */
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { driveTurns, type TurnResult } from './support/turnHarness'

const h = await vi.hoisted(async () => (await import('./support/turnHarness')).createHarness())
vi.mock('@/lib/auth', () => ({ auth: () => h.auth() }))
vi.mock('@/lib/db/prisma', () => ({ prisma: h.prisma }))
vi.mock('@/lib/rateLimit', () => ({ checkRateLimit: async () => ({ allowed: true }), rateLimitResponse: () => new Response('{}', { status: 429 }) }))
vi.mock('@/lib/ai/router', async (o) => ({ ...(await o<Record<string, unknown>>()), routeAI: (...a: unknown[]) => h.routeAI(...a) }))
const { POST } = await import('@/app/api/learn/chat/route')

beforeEach(() => { h.state.messages = []; h.state.snapshot = {} })

const PROBES = [1, 2, 3].map((n) => ({
  assetId: `probe-${n}`, conceptId: 'phys.meas.units', stem: `Q${n}: Which of these is an SI base unit?`,
  choices: [{ text: `The kilogram (${n})`, isCorrect: true }, { text: `The newton (${n})`, isCorrect: false }],
}))
const LANE = { probes: PROBES, subjectSlug: 'physics', conceptId: 'phys.meas.units', lessonTitle: 'SI Units and Measurement', lessonOne: true }
const mcqOf = (t: TurnResult) => (t.body as { mcq?: { question?: string } | null }).mcq ?? null
const gateLog = (t: TurnResult) => JSON.parse(t.logs.find((l) => l.startsWith('[gate-eligibility] '))!.slice('[gate-eligibility] '.length))

async function warmUp() {
  await driveTurns(h, POST, [
    { learnerSays: "ok, let's start", modelReplies: 'Two friends measure a plank with their hands and disagree.' },
    { learnerSays: 'ok, continue', modelReplies: 'A number alone says nothing until the unit is named.' },
    { learnerSays: 'ok', modelReplies: 'Scientists agree on a small set of base units.' },
  ], LANE)
}

describe('lesson one, practice request', () => {
  it('"quiz me" is served an authored probe', async () => {
    await warmUp()
    const [q] = await driveTurns(h, POST, [{ learnerSays: 'quiz me', modelReplies: 'Here is a quick check.' }], LANE)
    expect(gateLog(q)).toMatchObject({ phase: 'GUIDE', notFirstLesson: true })
    expect(mcqOf(q)?.question).toMatch(/SI base unit/)
  }, 120_000)

  it('control: without a practice request lesson one still withholds the quiz', async () => {
    await warmUp()
    const [t] = await driveTurns(h, POST, [{ learnerSays: 'continue', modelReplies: 'Scientists agree on seven base units.' }], LANE)
    expect(gateLog(t)).toMatchObject({ phase: 'GUIDE', notFirstLesson: false })
    expect(mcqOf(t)).toBeNull()
  }, 120_000)
})
