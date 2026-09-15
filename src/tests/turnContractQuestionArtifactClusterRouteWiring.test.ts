/**
 * Batch 4 of the Typed Turn Contract migration (design doc §6, "question-
 * artifact cluster", closing D4): the six independently-aliased
 * `mcqToServe(mcqHoisted, pendingMcqHoisted, mcqGradeHoisted)` call sites
 * collapsed into two resolved consts — `resolvedQuestionServed` (EPOCH A: the
 * delivery-compile point, the ungraded-question withhold, the snapshot
 * persist) and `resolvedQuestionServedFinal` (EPOCH B: the re-offer detector,
 * the late empty-guard, the response) — split into two because the
 * lesson-close override sits between them and is the last point any of the
 * three underlying locals (`mcqHoisted`/`pendingMcqHoisted`/
 * `mcqGradeHoisted`) can change this turn.
 *
 * These three scenarios are exactly what D4's six call sites existed to keep
 * in sync, driven end to end against the REAL route (not mirrored):
 *   (a) a gate-authored probe attaches this turn, and the exact probe the
 *       response carried is the one the NEXT turn grades correctly —
 *       served (response) === persisted (snapshot), A6 holding live, not
 *       just in shadow;
 *   (b) a probe attached one turn and not answered is carried FORWARD on the
 *       next — the served value now comes from `pendingMcqHoisted`, not
 *       `mcqHoisted`, and response/snapshot must still agree;
 *   (c) an ungradeable question the model announces but never delivers is
 *       WITHHELD, never shipped raw — `resolvedQuestionServed` and
 *       `resolvedQuestionServedFinal` being null must starve both
 *       `withholdUngradedGateQuestion`'s `questionOnScreen` term and the
 *       response's own `mcqForClient(resolvedQuestionServedFinal)`.
 * Every turn also asserts CONTRACT_ASSERT is clean — this batch's collapse
 * takes a real dependency on the invariant Batches 1-3 only ever logged in
 * shadow mode, per the design doc's own "compare-and-log becomes code takes a
 * dependency on this being true" escalation note for exactly this batch.
 */
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { driveTurns, readLog } from './support/turnHarness'
import { CONFIRMS_CORRECT } from '@/lib/teaching/answerConfirmation'

const h = await vi.hoisted(async () => (await import('./support/turnHarness')).createHarness())
vi.mock('@/lib/auth', () => ({ auth: () => h.auth() }))
vi.mock('@/lib/db/prisma', () => ({ prisma: h.prisma }))
vi.mock('@/lib/rateLimit', () => ({
  checkRateLimit: async () => ({ allowed: true }),
  rateLimitResponse: () => new Response('{}', { status: 429 }),
}))
vi.mock('@/lib/ai/router', async (o) => ({
  ...(await o<Record<string, unknown>>()),
  routeAI: (...a: unknown[]) => h.routeAI(...a),
}))
const { POST } = await import('@/app/api/learn/chat/route')

/** Five probes — E1's `mayAttachProbeBelowGuide` needs four AVAILABLE probes
 *  before it will attach one below GUIDE phase (one spent, three must
 *  survive); with fewer, the gate declines and nothing is ever served.
 *  Verified against the real route, matching turnContractAnswerVerdictClusterRouteWiring.test.ts. */
const PROBES = [1, 2, 3, 4, 5].map((n) => ({
  assetId: `probe-${n}`, conceptId: 'chem.elect.galvanic-cell',
  stem: `Q${n}: In a galvanic cell, where does oxidation occur?`,
  choices: [
    { text: `At the anode (${n})`, isCorrect: true },
    { text: `At the cathode (${n})`, isCorrect: false },
    { text: `In the salt bridge (${n})`, isCorrect: false },
  ],
}))

beforeEach(() => { h.state.messages = []; h.state.snapshot = {} })

describe('Typed Turn Contract Batch 4 — question-artifact cluster, real route', () => {
  it('(a) a gate-authored probe attaches, and the SAME probe grades correctly next turn', async () => {
    const res = await driveTurns(h, POST, [
      { learnerSays: 'ready', modelReplies: 'Oxidation happens at one electrode.' },
      { learnerSays: (onScreen) => onScreen?.options?.[0] ?? 'the anode', modelReplies: 'Here is your next question.' },
    ], { probes: PROBES })
    for (const t of res) {
      expect(t.status).toBe(200)
      expect(readLog(t, '[learn/chat] CONTRACT_ASSERT=')).toBeNull()
    }
    const [first, graded] = res
    // A probe was genuinely served this scenario — proves it exercises the
    // attach path, not accidentally the withhold path.
    expect((first.body as { mcq?: unknown }).mcq).toBeTruthy()
    const body = graded.body as { text?: string }
    // A correct tap against the served probe's own key must be confirmed —
    // the observable proof that the probe carried in the RESPONSE
    // (`resolvedQuestionServedFinal`) is the exact one `gradeMcqAnswer` reads
    // back from the PERSISTED snapshot (`resolvedQuestionServed`) next turn,
    // and that its `correctIndex` survived the round trip intact.
    expect(CONFIRMS_CORRECT.test(body.text ?? '')).toBe(true)
  })

  it('(b) a probe attached and not answered is carried forward — served and persisted still agree', async () => {
    const res = await driveTurns(h, POST, [
      { learnerSays: 'ready', modelReplies: 'Oxidation happens at one electrode.' },
      // A LEARNER_REQUEST (Phase 3, C6) denies AUTHORED_PROBE this turn — the
      // gate will not select a fresh probe, and the scripted reply carries no
      // <!--MCQ--> tag either, so `mcqHoisted` stays null and `mcqToServe`
      // must fall back to the still-pending, still-ungraded probe from turn 1.
      { learnerSays: 'can you explain that differently please', modelReplies: 'Sure — think of it as electrons leaving one side.' },
    ], { probes: PROBES })
    for (const t of res) {
      expect(t.status).toBe(200)
      expect(readLog(t, '[learn/chat] CONTRACT_ASSERT=')).toBeNull()
    }
    const [first, carried] = res
    const firstQ = (first.body as { mcq?: { question?: string } }).mcq?.question
    const carriedQ = (carried.body as { mcq?: { question?: string } }).mcq?.question
    expect(firstQ).toBeTruthy()
    // The identical question is still on screen on turn 2 — served from
    // `pendingMcqHoisted` via `resolvedQuestionServedFinal` (EPOCH B), not a
    // fresh attach, exactly as `mcqToServe`'s own contract requires
    // (`if (pending && !gradedThisTurn) return pending`).
    expect(carriedQ).toBe(firstQ)
    // And the persisted snapshot agrees with what the response carried —
    // this is A6, exercised live rather than only checked in shadow.
    const snap = carried.snapshot as { pendingMcq?: { question?: string } }
    expect(snap.pendingMcq?.question).toBe(firstQ)
  })

  it('(c) an announced-but-undelivered question is withheld, never shipped raw', async () => {
    // The exact production shape (torque T13/T14, questionDeliveryContract.test.ts):
    // the model announces a question and attaches nothing.
    const res = await driveTurns(h, POST, [
      { learnerSays: 'ok', modelReplies: 'Oxidation releases electrons at one electrode.' },
      { learnerSays: 'go on', modelReplies: "Let's check your understanding. Here's a quick question for you:" },
      { learnerSays: 'I am ready', modelReplies: "Good. Here's the question:" },
    ], { probes: PROBES })
    for (const t of res) {
      expect(t.status).toBe(200)
      expect(readLog(t, '[learn/chat] CONTRACT_ASSERT=')).toBeNull()
      const body = t.body as { text?: string; mcq?: unknown }
      const text = body.text ?? ''
      // The invariant `withholdUngradedGateQuestion` exists to enforce:
      // an announcement ending in a promise may not ship without an
      // artifact. `resolvedQuestionServed`/`resolvedQuestionServedFinal`
      // being null (nothing attached, nothing pending) is exactly what
      // starves both the withhold's own `questionOnScreen` term and the
      // response's `mcqForClient(resolvedQuestionServedFinal)` — so a bare
      // promise reaching the learner would mean one of the two resolved
      // consts disagreed with the other.
      const promisesWithNoArtifact = /:\s*$/.test(text.trim()) && !body.mcq
      expect(promisesWithNoArtifact).toBe(false)
    }
  })
})
