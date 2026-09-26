/**
 * A RELIEVED PROBE MUST NOT REPLACE THE ANSWER (2026-09-26, live QA).
 *
 * Production, phys.qm.perturbation-theory: after two question-owned turns,
 * "show why the term is negative" was answered ONLY with the gate's canned
 * lead-in ("Let's see how … is sitting. Pick the one you think is right.") —
 * `probeStarvationRelieved: true`, `provider=gate`, no model call. The relief's
 * own contract says the probe rides ALONGSIDE the model's answer. The lead-in
 * renderer refused only explicit requests (diagram/example), and the gate
 * block told the model "LEAD-IN ONLY", so a plain question lost its answer.
 * (pcd007AssessmentLifecycle's version passed because its third turn was an
 * example request.)
 */
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { driveTurns, readLog, type TurnResult } from './support/turnHarness'
import { buildGateAssessmentBlock, replyIsOnlyAQuestion } from '@/lib/teaching/gateAssessment'

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

const CHEM = 'chem.redox.activity-series'
const PROBES = [1, 2, 3, 4, 5].map((n) => ({
  assetId: `probe-${n}`, conceptId: CHEM,
  stem: `Q${n}: authored gradeable question about ${CHEM}?`,
  choices: [
    { text: `Zinc (${n})`, isCorrect: true },
    { text: `Silver (${n})`, isCorrect: false },
    { text: `Gold (${n})`, isCorrect: false },
  ],
}))
const LANE = { probes: PROBES, subjectSlug: 'chemistry', conceptId: CHEM, lessonTitle: 'Activity Series' }
const gate = (t: TurnResult) => readLog(t, '[gate-eligibility]') as { probeStarvationRelieved: boolean } | null
const text = (t: TurnResult) => (t.body as { text?: string }).text ?? ''
const mcq = (t: TurnResult) => (t.body as { mcq?: { options: string[] } | null }).mcq ?? null
// The harness's systemPrompt is the LAST prompt routeAI saw; only meaningful
// on turns that actually called the model.
const prompted = (t: TurnResult) => ((t.body as { llmCallCount?: number }).llmCallCount ?? 0) > 0
const answer = (i: number) => `Answering your question. Point ${i}: here is the mechanism, spelled out.`

describe('relieved probe on plain question turns (no request frame)', () => {
  const QUESTIONS = ['why does that happen?', 'what does that mean here?', 'why is that the case?']

  it('the model answers the third question AND the authored probe is attached', async () => {
    const res = await driveTurns(h, POST, QUESTIONS.map((q, i) => ({ learnerSays: q, modelReplies: answer(i) })), LANE)
    const relieved = res.find((t) => gate(t)?.probeStarvationRelieved)
    expect(relieved).toBeTruthy()
    expect(text(relieved!)).toContain('Answering your question. Point 2')
    expect(text(relieved!)).not.toMatch(/Pick the one you think is right/)
    expect(mcq(relieved!)?.options.length).toBeGreaterThanOrEqual(2)
    // the model was called and told to answer first, not to write a lead-in only
    expect(prompted(relieved!)).toBe(true)
    expect(relieved!.systemPrompt).toContain('ANSWER IT FIRST')
    expect(relieved!.systemPrompt).not.toContain('LEAD-IN ONLY')
  }, 90_000)

  it('the imperative form from production ("show why …") behaves the same', async () => {
    const res = await driveTurns(h, POST, [
      { learnerSays: 'why does that happen?', modelReplies: answer(0) },
      { learnerSays: 'explain the mechanism again please', modelReplies: answer(1) },
      { learnerSays: 'show why the mechanism is spelled out that way', modelReplies: answer(2) },
    ], LANE)
    const relieved = res.find((t) => gate(t)?.probeStarvationRelieved)
    expect(relieved).toBeTruthy()
    expect(text(relieved!)).toContain('Answering your question. Point 2')
    expect(mcq(relieved!)).not.toBeNull()
  }, 90_000)
})

describe('a relieved probe yields to a clarifying question (2026-09-26, live QA)', () => {
  const CLARIFY = "So you'd like me to demonstrate why each contribution is negative for the ground state, correct?\n\nCould you confirm that this is what you're asking?"

  it('clarification-only reply → clarification shown, no quiz this turn, relief again next turn', async () => {
    const res = await driveTurns(h, POST, [
      { learnerSays: 'why does that happen?', modelReplies: answer(0) },
      { learnerSays: 'what does that mean here?', modelReplies: answer(1) },
      { learnerSays: 'why is that the case?', modelReplies: CLARIFY },
      { learnerSays: 'what does the mechanism look like step by step?', modelReplies: answer(3) },
    ], LANE)
    const [, , third, fourth] = res
    expect(gate(third)?.probeStarvationRelieved).toBe(true)
    expect(third.logs.some((l) => l.includes('relieved-probe-yielded-to-clarification'))).toBe(true)
    expect(text(third)).toContain('Could you confirm')
    expect(text(third)).not.toContain('Let me check your thinking')
    expect(mcq(third)).toBeNull()
    // the probe was not spent, and relief fires again on the next question
    expect(gate(fourth)?.probeStarvationRelieved).toBe(true)
    expect(text(fourth)).toContain('Answering your question. Point 3')
    expect(mcq(fourth)?.options.length).toBeGreaterThanOrEqual(2)
  }, 90_000)

  it('same for a request without "?" (the production shape)', async () => {
    const res = await driveTurns(h, POST, [
      { learnerSays: 'why does that happen?', modelReplies: answer(0) },
      { learnerSays: 'explain the mechanism again please', modelReplies: answer(1) },
      { learnerSays: 'show why the mechanism is spelled out that way', modelReplies: CLARIFY },
    ], LANE)
    const third = res[2]
    expect(gate(third)?.probeStarvationRelieved).toBe(true)
    expect(text(third)).toContain('Could you confirm')
    expect(mcq(third)).toBeNull()
  }, 90_000)

  it('control: an answer with a stray question still carries the relieved probe', async () => {
    const res = await driveTurns(h, POST, [
      { learnerSays: 'why does that happen?', modelReplies: answer(0) },
      { learnerSays: 'what does that mean here?', modelReplies: answer(1) },
      { learnerSays: 'why is that the case?', modelReplies: `${answer(2)}\n\nWhich electrode loses mass over time?` },
    ], LANE)
    const third = res[2]
    expect(gate(third)?.probeStarvationRelieved).toBe(true)
    expect(third.logs.some((l) => l.includes('relieved-probe-yielded-to-clarification'))).toBe(false)
    expect(mcq(third)).not.toBeNull()
    expect(text(third)).toContain('Answering your question. Point 2')
  }, 90_000)
})

describe('unchanged paths', () => {
  const tap = (mcqNow: { options: string[] } | null) => mcqNow ? (mcqNow.options.find((o) => o.startsWith('Zinc')) ?? mcqNow.options[0]) : 'ok, that makes sense'

  it('ordinary teaching turns: relief never fires, gate probes keep the lead-in-only contract', async () => {
    const res = await driveTurns(h, POST, Array.from({ length: 6 }, (_, i) => ({ learnerSays: tap, modelReplies: answer(i) })), LANE)
    expect(res.some((t) => gate(t)?.probeStarvationRelieved)).toBe(false)
    expect(res.some((t) => mcq(t) !== null)).toBe(true)
    expect(res.some((t) => prompted(t) && t.systemPrompt.includes('ANSWER IT FIRST'))).toBe(false)
  }, 90_000)

  it('a practice request after two questions still gets an authored probe, lead-in-only', async () => {
    const res = await driveTurns(h, POST, [
      { learnerSays: 'why does that happen?', modelReplies: answer(0) },
      { learnerSays: 'what does that mean here?', modelReplies: answer(1) },
      { learnerSays: 'give me a practice question', modelReplies: answer(2) },
    ], LANE)
    const last = res[2]
    expect(mcq(last)).not.toBeNull()
    if (prompted(last)) expect(last.systemPrompt).not.toContain('ANSWER IT FIRST')
  }, 90_000)
})

describe('the ordinary gate turn keeps its lead-in-only block', () => {
  it('without relief the block is unchanged', () => {
    const m = { question: 'q', options: ['a', 'b'], correctIndex: 0 } as Parameters<typeof buildGateAssessmentBlock>[0]
    expect(buildGateAssessmentBlock(m)).toContain('LEAD-IN ONLY')
    expect(buildGateAssessmentBlock(m, { answerLearnerFirst: false })).toBe(buildGateAssessmentBlock(m))
    const first = buildGateAssessmentBlock(m, { answerLearnerFirst: true })
    expect(first).toContain('ANSWER IT FIRST')
    expect(first).toContain('do NOT emit an MCQ tag')
    expect(first).not.toContain("'q'")
  })
})

describe('replyIsOnlyAQuestion', () => {
  it.each([
    ["So you'd like me to show why each term is negative, correct?\n\nCould you confirm that this is what you're asking?", true],
    ['Which term dominates for large n?', true],
    ['The denominator is negative for every excited state, so each term is negative. Which term dominates?', false],
    ['Each term is negative because the denominator is negative. Does that make sense?', false],
    ['Here is why.<!--SIGNAL correctness="false" confidence="high" confusion="false"-->', false],
    ['', false],
  ])('%j → %s', (t, want) => expect(replyIsOnlyAQuestion(t as string)).toBe(want))
})

