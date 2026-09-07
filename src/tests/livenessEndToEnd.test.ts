/**
 * S1 — THE TWO FAILURES, DRIVEN THROUGH THE REAL ROUTE.
 *
 * livenessProof.test.ts proved both absorbing states are reachable IN THE FOLD.
 * That was not enough, and the gap was named before this file was written: a
 * hand-built TurnEvidence object proves the fold can hold a fixed point, not
 * that the RUNTIME ever reaches one. This file closes that gap by executing
 * `POST` from @/app/api/learn/chat/route with a scripted model.
 *
 * ── RESULTS, INCLUDING THE ONE THAT WENT AGAINST THE HYPOTHESIS ────────────
 *
 * L1 — THE PENDING-PROBE LATCH: CONFIRMED END-TO-END, and worse than modelled.
 *      Eight consecutive turns, eight DIFFERENT substantively-correct answers,
 *      five ACTIVE authored probes available. The gate is blocked by
 *      `noUnansweredProbeOnScreen` on every one of them — on most turns it is
 *      the SOLE blocker, and on several the engine's own move was 'ask', so
 *      the runtime WANTED to assess, had four unused reviewed probes, and
 *      could not reach them. The same question is re-served nine times.
 *      correctAtCheck never leaves 0.
 *
 * L2 — THE OBSERVE DOUBLE-LOCK: REFUTED AS STATED. Driven end-to-end, OBSERVE
 *      holds for FOUR turns (phaseAllowsProbe blocked, exactly the predicted
 *      mechanism) and then ESCAPES: the route supplies move='ask' often enough
 *      that `observeFailures` reaches its threshold and
 *      phaseAfterConcludedDiagnostic fires. A bounded delay, not an absorbing
 *      state. The fold-level proof was right about the fold and wrong about
 *      the runtime, and this file records that rather than quietly dropping it.
 *
 *      What DOES persist in that scenario is different and is pinned below:
 *      with no gradeable probe served, the model's PROSE questions cannot be
 *      graded, so eleven turns of correct answers produce zero mastery
 *      evidence while the gate reports ELIGIBLE. Starvation, not deadlock.
 */
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { driveTurns, readLog, type TurnResult } from './support/turnHarness'

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

const PROBES = [1, 2, 3, 4, 5].map((n) => ({
  assetId: `probe-${n}`,
  conceptId: 'chem.elect.galvanic-cell',
  stem: `Q${n}: In a galvanic cell, where does oxidation occur?`,
  choices: [
    { text: `At the anode (${n})`, isCorrect: true },
    { text: `At the cathode (${n})`, isCorrect: false },
    { text: `In the salt bridge (${n})`, isCorrect: false },
  ],
}))

const teach = (i: number) => `Teaching segment ${i}. Oxidation releases electrons at one electrode.`
const cs = (t: TurnResult) => (t.snapshot?.conversationState ?? {}) as Record<string, number | string>
const gate = (t: TurnResult) => readLog(t, '[gate-eligibility]') as
  { eligible: boolean; blockedBy: string[]; move: string } | null

beforeEach(() => { h.state.messages = []; h.state.snapshot = {} })

describe('P0 — the harness itself is sound (nothing below counts without this)', () => {
  it('a learner who TAPS reaches verified mastery through the real route', async () => {
    const res = await driveTurns(h, POST, Array.from({ length: 8 }, (_, i) => ({
      learnerSays: (mcq: { options: string[] } | null) =>
        mcq ? (mcq.options.find((o) => o.startsWith('At the anode')) ?? mcq.options[0]) : 'ok',
      modelReplies: teach(i),
    })), { probes: PROBES })

    const mastery = res.map((t) => (t.body as { mastery?: { verified?: boolean } }).mastery)
      .find((m) => m?.verified)
    expect(mastery).toMatchObject({ verified: true, checkCorrect: 1, practiceCorrect: 2 })
    // and it got there through the real ladder, not a shortcut
    expect(res.map((t) => cs(t).phase)).toContain('TRANSFER')
  }, 60_000)
})

describe('L1 — the pending-probe latch, END TO END', () => {
  // Every one of these is substantively CORRECT and every one is refused by
  // resolveMcqChoice (measured: 10 of 12 phrasings for this probe are).
  const TYPED_CORRECT = [
    'the anode', 'the negative electrode', 'where electrons are released',
    'the zinc side loses electrons', 'the electrode that gets eaten away',
    'the one where Zn becomes Zn2+', 'the electrode electrons flow away from',
    'the metal that dissolves',
  ]

  it('a learner who TYPES the right answer is locked out of assessment forever', async () => {
    const res = await driveTurns(h, POST, [
      { learnerSays: 'ok', modelReplies: teach(0) },
      ...TYPED_CORRECT.map((s, i) => ({ learnerSays: s, modelReplies: teach(i + 1) })),
    ], { probes: PROBES })

    const after = res.slice(1)
    // 1. the gate is shut on EVERY turn, by this one term
    for (const t of after) {
      expect(gate(t)?.eligible).toBe(false)
      expect(gate(t)?.blockedBy).toContain('noUnansweredProbeOnScreen')
    }
    // 2. and on most of them it is the ONLY thing shutting it — this is not
    //    some other policy legitimately declining the turn
    const soleBlocker = after.filter((t) => gate(t)?.blockedBy.length === 1)
    expect(soleBlocker.length).toBeGreaterThanOrEqual(5)
    // 3. the engine ITSELF wanted to ask on several of those turns
    expect(after.filter((t) => gate(t)?.move === 'ask').length).toBeGreaterThanOrEqual(3)
    // 4. the learner sees ONE question, forever
    const asked = new Set(res.map((t) => (t.body as { mcq?: { question?: string } }).mcq?.question)
      .filter(Boolean))
    expect(asked.size).toBe(1)
    // 5. four reviewed probes are never reached, and no mastery is ever banked
    const last = cs(res[res.length - 1])
    expect(last.correctAtCheck).toBe(0)
    expect(last.correctAtPractice).toBe(0)
  }, 60_000)
})

describe('L2 — REFUTED AS STATED, and what actually persists', () => {
  const PROSE = (i: number) => [
    `Quick check ${i}! For a weak acid HA, which expression gives [H+]?`,
    'A) sqrt(Ka x C)', 'B) Ka x C', 'C) Ka / C', 'D) C / Ka',
  ].join('\n')
  const SAID = [
    'stop asking me questions, just explain it', 'the square root of Ka times C',
    'because HA barely dissociates', 'so [H+] is much smaller than C',
    'Ka is small for a weak acid', 'you take the root of the product',
    'it is about one percent dissociated', 'the equilibrium sits far left',
    'so pH comes out around 3', 'because the acid is only partly ionised',
    'that is the approximation used',
  ]

  it('OBSERVE holds, then ESCAPES — a bounded delay, not an absorbing state', async () => {
    const res = await driveTurns(h, POST,
      SAID.map((s, i) => ({ learnerSays: s, modelReplies: PROSE(i) })),
      { probes: [], conceptId: 'chem.equil.weak-acid' })

    const phases = res.map((t) => cs(t).phase)
    // the predicted lock IS observed while it lasts...
    expect(gate(res[1])?.blockedBy).toContain('phaseAllowsProbe')
    expect(phases.slice(0, 4).every((p) => p === 'OBSERVE')).toBe(true)
    // ...and then the diagnostic concludes and the machine moves on.
    expect(phases).toContain('DEMONSTRATE')
    expect(Number(cs(res[res.length - 1]).observeFailures)).toBeGreaterThanOrEqual(2)
  }, 60_000)

  it('but eleven correct answers still bank ZERO evidence — starvation, not deadlock', async () => {
    const res = await driveTurns(h, POST,
      SAID.map((s, i) => ({ learnerSays: s, modelReplies: PROSE(i) })),
      { probes: [], conceptId: 'chem.equil.weak-acid' })

    // The gate is OPEN on the later turns and still nothing gradeable is put
    // to the learner, because there is no authored probe and a prose question
    // has no server-owned key. This is the shape the weak-acid session reports.
    expect(res.slice(-4).every((t) => gate(t)?.eligible === true)).toBe(true)
    const last = cs(res[res.length - 1])
    expect(last.correctAtCheck).toBe(0)
    expect(last.correctAtPractice).toBe(0)
  }, 60_000)
})
