import { describe, it, expect, vi, beforeEach } from 'vitest'
import { driveTurns, readLog } from './support/turnHarness'
import { resolveRequestedConceptId, isOffDomainInstanceReference } from '@/lib/teaching/concept/requestedConcept'
import { detectLearnerRequest } from '@/lib/teaching/masteryGate'

/**
 * The remaining known issues after the learner-intent A/B (2026-09-26):
 *   1. a follow-up about what the tutor JUST taught opened an unresolved-topic detour;
 *   2. "the/this term" still jumped to algebra's Term in a physics lesson;
 *   3. "for example, …" inside an answer read as a request for an example;
 *   5. a model SIGNAL on a request turn (no '?') became a PROBE_OUTCOME row.
 * (Issue 4 — model factual slips — needs a content verifier, a deferred
 * primitive under CLAUDE.md; not addressed here.)
 */
const h = await vi.hoisted(async () => (await import('./support/turnHarness')).createHarness())
vi.mock('@/lib/auth', () => ({ auth: () => h.auth() }))
vi.mock('@/lib/db/prisma', () => ({ prisma: h.prisma }))
vi.mock('@/lib/rateLimit', () => ({
  checkRateLimit: async () => ({ allowed: true }),
  rateLimitResponse: () => new Response('{}', { status: 429 }),
}))
vi.mock('@/lib/ai/router', async (o) => ({ ...(await o<Record<string, unknown>>()), routeAI: (...a: unknown[]) => h.routeAI(...a) }))
// Records evidence writes (the real writer is fire-and-forget into prisma).
const evidence = vi.hoisted(() => [] as { category: string; outcome?: string }[])
vi.mock('@/lib/teaching/evidence/evidenceEngine', async (o) => ({
  ...(await o<Record<string, unknown>>()),
  appendEvidenceEvent: (i: { category: string; outcome?: string }) => { evidence.push(i) },
}))
const { POST } = await import('@/app/api/learn/chat/route')
beforeEach(() => { h.state.messages = []; h.state.snapshot = {}; evidence.length = 0 })
const misconceptionRows = () => evidence.filter((e) => e.category === 'MISCONCEPTION_DETECTED')

const PHYS = { subjectSlug: 'physics', conceptId: 'phys.qm.perturbation-theory', lessonTitle: 'Time-Independent Perturbation Theory' }
const TAUGHT = 'The second-order correction is a sum over states. For the ground state every term in the sum is negative, because each denominator is negative.'
const FOLLOW_UP = 'Please write out E_n^(2) explicitly and show why every term is negative when n is the ground state.'
const excursion = (logs: ReturnType<typeof readLog>) => logs as { unresolvedTopic?: string | null; active?: boolean } | null

describe('1. a follow-up about what the tutor just taught does not open a detour', () => {
  it('reuses the tutor\'s own words → no unresolved-topic detour', async () => {
    const [, t] = await driveTurns(h, POST, [
      { learnerSays: 'ok, continue', modelReplies: TAUGHT },
      { learnerSays: FOLLOW_UP, modelReplies: 'E2 = …' },
    ], PHYS)
    const e = excursion(readLog(t, '[excursion]'))
    expect(e?.unresolvedTopic ?? null).toBeNull()
    expect(e?.active ?? false).toBe(false)
  }, 60_000)

  it('control: a topic the tutor never mentioned still opens one', async () => {
    const [, t] = await driveTurns(h, POST, [
      { learnerSays: 'ok, continue', modelReplies: TAUGHT },
      { learnerSays: 'Can you explain Kubernetes pod scheduling?', modelReplies: 'x' },
    ], PHYS)
    expect(excursion(readLog(t, '[excursion]'))?.unresolvedTopic ?? null).not.toBeNull()
  }, 60_000)
})

describe('2. "the/this term" stays in the lesson (E4b)', () => {
  it.each([
    'show why the term is negative',
    'show why this term is negative',
    'why is that term zero?',
  ])('%s → no cross-subject target', (m) => {
    expect(resolveRequestedConceptId(m, PHYS.conceptId, 'physics')).toBeNull()
  })

  it('the rejected definite-article cases are untouched by the predicate', () => {
    // "teach me the derivative" / "what the derivative is": no continuing predicate → not an instance
    expect(isOffDomainInstanceReference('teach me the derivative', 'Derivative', 'math.calc.derivative', PHYS.conceptId)).toBe(false)
    expect(isOffDomainInstanceReference('teach me what the derivative is', 'Derivative', 'math.calc.derivative', PHYS.conceptId)).toBe(false)
    // explicit definition / named-topic requests still travel
    expect(resolveRequestedConceptId('what is a term?', PHYS.conceptId, 'physics')).toBe('math.alg.term')
    expect(resolveRequestedConceptId('explain photosynthesis to me please', PHYS.conceptId, 'physics')).toBe('bio.plant.photosynthesis')
  })
})

describe('3. "for example, …" inside an answer is not a request', () => {
  it.each([
    'for example, when I push a box it moves',
    'e.g. a ball rolling down a hill',
    'for instance the anode loses electrons',
  ])('%s → null', (m) => expect(detectLearnerRequest(m)).toBeNull())

  it.each([
    'like what, for example?',
    'for example?',
    'can you give me an example?',
    'give me a real-life example please',
  ])('%s → still an example request', (m) => expect(detectLearnerRequest(m)).toBe('real_life_example'))
})

describe('5. a model SIGNAL on a request turn is not answer evidence', () => {
  const SIGNAL_FAIL = '\n<!--SIGNAL correctness="false" confidence="high" confusion="false"-->'
  it('request (no "?") → correctness stripped', async () => {
    const [, t] = await driveTurns(h, POST, [
      { learnerSays: 'ok, continue', modelReplies: 'Teaching. Quick check: what sign do you expect?' },
      { learnerSays: "Give me the second-order energy correction and explain why it's negative for the ground state.", modelReplies: `E2 = …${SIGNAL_FAIL}` },
    ], PHYS)
    expect(t.logs.some((l) => l.startsWith('[learner-asked-question]'))).toBe(true)
  }, 60_000)

  it('control: a typed answer keeps its signal', async () => {
    const [, t] = await driveTurns(h, POST, [
      { learnerSays: 'ok, continue', modelReplies: 'Teaching. Quick check: what sign do you expect?' },
      { learnerSays: 'it comes out negative because the denominator is negative', modelReplies: `Yes.${SIGNAL_FAIL}` },
    ], PHYS)
    expect(t.logs.some((l) => l.startsWith('[learner-asked-question]'))).toBe(false)
  }, 60_000)
})

describe('5b. a misconception phrase on a question/request turn is not evidence (2026-09-26)', () => {
  const tag = (attrs: string) => `\n<!--SIGNAL ${attrs}-->`
  const setup = { learnerSays: 'ok, continue', modelReplies: 'Teaching. Quick check: what sign do you expect?' }

  it.each([
    ['question + correctness + phrase', 'why is that term zero?', 'correctness="false" confidence="high" confusion="false" phrase="why is that term zero"'],
    ['question + phrase only', 'why is that term zero?', 'confidence="high" confusion="false" phrase="why is that term zero"'],
    ['request (no "?") + phrase only', 'explain why the term vanishes for the ground state', 'confidence="high" confusion="false" phrase="the term vanishes"'],
  ])('%s → phrase dropped', async (_label, msg, attrs) => {
    const [, t] = await driveTurns(h, POST, [setup, { learnerSays: msg, modelReplies: `Here is why.${tag(attrs)}` }], PHYS)
    expect(t.logs.some((l) => l.startsWith('[learner-asked-question]'))).toBe(true)
    expect(readLog(t, '[ladder]')).toMatchObject({ correctness: null })
    expect(misconceptionRows()).toHaveLength(0)
  }, 60_000)

  it('control: a typed ANSWER with a phrase keeps it', async () => {
    const [, t] = await driveTurns(h, POST, [setup, {
      learnerSays: 'it is positive because you just add the energies',
      modelReplies: `Not quite.${tag('correctness="false" confidence="high" confusion="false" phrase="you just add the energies"')}`,
    }], PHYS)
    expect(t.logs.some((l) => l.startsWith('[learner-asked-question]'))).toBe(false)
    expect(misconceptionRows()).toHaveLength(1)
  }, 60_000)
})

