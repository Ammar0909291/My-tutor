/**
 * "quiz me" early in a lesson is never answered with no question (2026-09-28,
 * physics certification). At OBSERVE/DEMONSTRATE the surplus rule keeps a
 * bare-contract pool (3 probes) in reserve for mastery, and the ungraded-question
 * withhold then removed the model's own question too, so the learner who asked
 * for a question got the one-line concept fallback. Below GUIDE a model-written
 * question cannot reach the mastery record, so it is kept.
 */
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { withholdUngradedGateQuestion } from '@/lib/teaching/gateAssessment'
import { driveTurns, type TurnResult } from './support/turnHarness'

const h = await vi.hoisted(async () => (await import('./support/turnHarness')).createHarness())
vi.mock('@/lib/auth', () => ({ auth: () => h.auth() }))
vi.mock('@/lib/db/prisma', () => ({ prisma: h.prisma }))
vi.mock('@/lib/rateLimit', () => ({ checkRateLimit: async () => ({ allowed: true }), rateLimitResponse: () => new Response('{}', { status: 429 }) }))
vi.mock('@/lib/ai/router', async (o) => ({ ...(await o<Record<string, unknown>>()), routeAI: (...a: unknown[]) => h.routeAI(...a) }))
const { POST } = await import('@/app/api/learn/chat/route')
beforeEach(() => { h.state.messages = []; h.state.snapshot = {} })

const Q = 'Which of these is an SI base unit: the metre or the newton?'
const base = { text: `Sure. ${Q}`, hasStructuredMcq: false, questionOnScreen: false, gateSoughtThisTurn: true, conceptFallback: 'Units are agreed sizes.' }

describe('withholdUngradedGateQuestion, practice request', () => {
  it.each(['OBSERVE', 'DEMONSTRATE'])('keeps the model question at %s', (phase) => {
    expect(withholdUngradedGateQuestion({ ...base, phase, learnerRequestedPractice: true }))
      .toMatchObject({ withheld: false, reason: 'left-for-practice-request' })
  })
  it.each(['GUIDE', 'CHECK', 'PRACTICE'])('still withholds at %s, where the gate is the authority', (phase) => {
    expect(withholdUngradedGateQuestion({ ...base, phase, learnerRequestedPractice: true }).withheld).toBe(true)
  })
  it('control: without a practice request the question is still withheld at OBSERVE', () => {
    expect(withholdUngradedGateQuestion({ ...base, phase: 'OBSERVE' }).withheld).toBe(true)
  })
  it('with a quiz already on screen, "give me a practice question" is pointed at it, not given a second question', () => {
    const r = withholdUngradedGateQuestion({ ...base, phase: 'CHECK', questionOnScreen: true, learnerRequestedPractice: true, learnerAskedDirectQuestion: true,
      text: 'When a block slides down a ramp that has friction, what kind of work does the friction force do on the block?' })
    expect(r.withheld).toBe(true)
    expect(r.text).not.toMatch(/friction/)
  })
  it('control: a genuine direct question with a quiz on screen keeps its exemption', () => {
    expect(withholdUngradedGateQuestion({ ...base, phase: 'CHECK', questionOnScreen: true, learnerAskedDirectQuestion: true, text: 'Which direction does friction point here?' }))
      .toMatchObject({ withheld: false, reason: 'left-for-direct-question' })
  })
  it('a broken announcement is still repaired', () => {
    expect(withholdUngradedGateQuestion({ ...base, text: "Here's a quick question:", phase: 'OBSERVE', learnerRequestedPractice: true }))
      .toMatchObject({ withheld: true, reason: 'announced-question-never-delivered' })
  })
})

const PROBES = [1, 2, 3].map((n) => ({
  assetId: `probe-${n}`, conceptId: 'phys.meas.units', stem: `Q${n}: Which of these is an SI base unit?`,
  choices: [{ text: `The kilogram (${n})`, isCorrect: true }, { text: `The newton (${n})`, isCorrect: false }],
}))
const LANE = { probes: PROBES, subjectSlug: 'physics', conceptId: 'phys.meas.units', lessonTitle: 'SI Units and Measurement' }
const text = (t: TurnResult) => String((t.body as { text?: string }).text ?? '')

describe('route: "quiz me" at OBSERVE with a bare-contract pool', () => {
  // Issue B (2026-10-10, campaign product decision): an explicit request
  // outranks keeping the authored cards for the mastery check. The reserved
  // card is spent — logged, never silently — instead of the model question.
  it('the learner gets an authored card, and the spend of a reserved card is logged', async () => {
    await driveTurns(h, POST, [{ learnerSays: "ok, let's start", modelReplies: 'Two friends measure a plank.' }], LANE)
    const [q] = await driveTurns(h, POST, [{ learnerSays: 'quiz me', modelReplies: `Sure. ${Q}` }], LANE)
    const mcq = (q.body as { mcq?: { question: string } | null }).mcq ?? null
    expect(mcq).not.toBeNull()
    expect(PROBES.map((p) => p.stem)).toContain(mcq!.question)
    expect(q.logs.some((l) => l.includes('quiz-request-spends-reserved-card'))).toBe(true)
    expect(q.logs.some((l) => l.includes('below-guide-no-surplus'))).toBe(false)
  }, 120_000)
})
