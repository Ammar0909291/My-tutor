/**
 * I8 — A LEARNER MESSAGE WITH CONTENT IS NEVER REPLACED BY DETERMINISTIC CONTENT
 * (2026-09-27, live study on a fresh account; see learnerEngagement.ts).
 * Harness preamble copied from relievedProbeAnswersLearnerFirst.test.ts.
 *
 * ORIGINAL HEADER: A RELIEVED PROBE MUST NOT REPLACE THE ANSWER (2026-09-26, live QA).
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
import { learnerMessageNeedsModelReply } from '@/lib/teaching/learnerEngagement'

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


const llm = (t: TurnResult) => (t.body as { llmCallCount?: number }).llmCallCount ?? 0

describe('the predicate', () => {
  it.each([
    'why is the first-order shift zero for even levels?',
    'can you explain it differently',
    'since gravitational waves are ripples of spacetime they must travel faster than light',
    'you skipped my point about the speed',
    'zinc must be less reactive than copper because it is lighter',
  ])('needs a reply: %s', (m) => expect(learnerMessageNeedsModelReply(m, { answeredPendingQuestion: false })).toBe(true))

  // "quiz me on this": a stock lead-in + authored quiz IS the right reply to it.
  it.each(['ok', 'ok, continue', 'got it', 'thanks', 'yes', 'ok, that makes sense', 'next', 'quiz me on this', ''])(
    'does not: %j', (m) => expect(learnerMessageNeedsModelReply(m, { answeredPendingQuestion: false })).toBe(false))

  it('a tap the server graded never does (the grade answers it)', () => {
    expect(learnerMessageNeedsModelReply('At the anode, where zinc is oxidised to zinc ions', { answeredPendingQuestion: true })).toBe(false)
  })
})

describe('the canned quiz lead-in yields to content', () => {
  it('a false claim gets the model (the probe may still ride along)', async () => {
    const [t] = await driveTurns(h, POST, [
      { learnerSays: 'zinc must be less reactive than copper because it is lighter', modelReplies: 'No — reactivity is not about mass. MODEL REPLY.' },
    ], LANE)
    expect(llm(t)).toBeGreaterThan(0)
    expect(text(t)).toContain('MODEL REPLY')
    expect(text(t)).not.toMatch(/Here's a question on|is sitting\. Pick/)
  }, 60_000)

  it('control: a low-content turn still gets the deterministic lead-in', async () => {
    const [t] = await driveTurns(h, POST, [{ learnerSays: 'ok, that makes sense', modelReplies: 'unused' }], LANE)
    expect(llm(t)).toBe(0)
    expect(mcq(t)).not.toBeNull()
  }, 60_000)
})

describe('the dropped-observation counter', () => {
  it('a turn the model never wrote does not arm the restate-and-confirm repair', async () => {
    const [first, second] = await driveTurns(h, POST, [
      { learnerSays: 'ok, that makes sense', modelReplies: 'unused' },
      { learnerSays: 'ok, that makes sense', modelReplies: 'MODEL REPLY.' },
    ], LANE)
    expect(llm(first)).toBe(0)
    expect(llm(second)).toBeGreaterThan(0)
    expect(second.systemPrompt).not.toContain('OBSERVATION REPAIR')
  }, 60_000)
})
