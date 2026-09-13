/**
 * PCD-007 / PCD-008 / PCD-011 — THE ASSESSMENT LIFECYCLE, DRIVEN END TO END.
 *
 * ── WHAT THE THREE DEFECTS ACTUALLY SHARE ──────────────────────────────────
 * The audit filed them as three causes: a chemistry phase-transition failure
 * (PCD-007), a model that writes prose questions instead of structured ones
 * (PCD-008), and `D4b-ANSWER-STUDENT-FIRST` setting the move away from 'ask'
 * at GUIDE (PCD-011). Driven through the REAL route, all three reduce to ONE
 * unbounded refusal, and the audit's own attribution is stale.
 *
 * MEASURED (the first test below, before the fix): a chemistry learner asking
 * a help question every turn runs ten turns with five ACTIVE authored probes
 * and is served NOTHING gradeable. `correctAtCheck` never leaves 0. The gate
 * log names the blocker on all ten turns and it is not the phase —
 * `phaseAllowsProbe` is TRUE throughout, because R81/R82/E1 already closed
 * that axis. The sole blocker is `arbitrationAllowsProbe:false`: LEARNER_REQUEST
 * and LEARNER_QUESTION each deny AUTHORED_PROBE, correctly, for their own turn,
 * and nothing bounds the run. `learnerRequestHonoured` is classified PRODUCTIVE
 * by turnProgress — it IS teaching — so stagnation stays 0 and rungs 1-3 never
 * fire. So PCD-011's "D4b" is a symptom of the same seam, and PCD-008's prose
 * question is what fills the slot the authored probe was refused.
 *
 * The fix is a third turnProgress counter and a ceiling: see
 * `foldProbeStarvedTurns`. These tests pin the ceiling AND everything it must
 * not touch.
 */
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { readFileSync } from 'fs'
import { driveTurns, readLog, type TurnResult } from './support/turnHarness'
import {
  foldProbeStarvedTurns,
  shouldRelieveProbeStarvation,
  PROBE_STARVATION_RELIEF_AT,
} from '@/lib/teaching/turnProgress'

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

const CHEM = 'chem.redox.activity-series'
const PHYS = 'phys.mech.collisions-inelastic'

const probesFor = (conceptId: string, right: string, wrong: [string, string]) =>
  [1, 2, 3, 4, 5].map((n) => ({
    assetId: `probe-${conceptId}-${n}`,
    conceptId,
    stem: `Q${n}: authored gradeable question about ${conceptId}?`,
    choices: [
      { text: `${right} (${n})`, isCorrect: true },
      { text: `${wrong[0]} (${n})`, isCorrect: false },
      { text: `${wrong[1]} (${n})`, isCorrect: false },
    ],
  }))

const CHEM_PROBES = probesFor(CHEM, 'Zinc', ['Silver', 'Gold'])
const PHYS_PROBES = probesFor(PHYS, 'Momentum is conserved', ['Energy is conserved', 'Neither'])

/** Help questions only — every one hands the turn to a question rung. */
const HELP = [
  'can you explain that more simply?',
  'why does that happen?',
  'can you give me an example?',
  'what does that mean here?',
  'can you go over that again?',
  'why is that the case?',
]
const answer = (i: number) => `Answering your question. Point ${i}: here is the mechanism, spelled out.`

const gate = (t: TurnResult) => readLog(t, '[gate-eligibility]') as {
  eligible: boolean; blockedBy: string[]; move: string; phase: string
  arbitrationRawAllowsProbe: boolean; probeStarvationRelieved: boolean
  probeStarvedTurnsBefore: number
} | null
const mcqOf = (t: TurnResult) => (t.body as { mcq?: { question: string; options: string[] } }).mcq ?? null
const masteryOf = (t: TurnResult) => (t.body as { mastery?: Record<string, unknown> }).mastery ?? null

beforeEach(() => { h.state.messages = []; h.state.snapshot = {} })

// ───────────────────────────────────────────────────────────────────────────
describe('the pure ceiling (no route): duration and nothing else', () => {
  it('counts only while the phase allowed a probe and arbitration alone withheld it', () => {
    expect(foldProbeStarvedTurns(0, { phaseAllowedProbe: true, arbitrationWasSoleBlocker: true })).toBe(1)
    expect(foldProbeStarvedTurns(1, { phaseAllowedProbe: true, arbitrationWasSoleBlocker: true })).toBe(2)
    // any other blocker, or a phase that would not have served one, resets
    expect(foldProbeStarvedTurns(5, { phaseAllowedProbe: false, arbitrationWasSoleBlocker: true })).toBe(0)
    expect(foldProbeStarvedTurns(5, { phaseAllowedProbe: true, arbitrationWasSoleBlocker: false })).toBe(0)
  })

  it('tolerates a corrupt stored counter without inventing relief', () => {
    for (const junk of [undefined, null, -3, NaN, 'lots', {}]) {
      expect(foldProbeStarvedTurns(junk, { phaseAllowedProbe: true, arbitrationWasSoleBlocker: true })).toBe(1)
    }
  })

  it('relieves only at or past the threshold, and the threshold is 2', () => {
    expect(PROBE_STARVATION_RELIEF_AT).toBe(2)
    expect(shouldRelieveProbeStarvation(0)).toBe(false)
    expect(shouldRelieveProbeStarvation(1)).toBe(false)
    expect(shouldRelieveProbeStarvation(2)).toBe(true)
    expect(shouldRelieveProbeStarvation(NaN)).toBe(false)
  })
})

// ───────────────────────────────────────────────────────────────────────────
describe('PCD-007 / PCD-011 — the question-owned run is now bounded (chemistry)', () => {
  it('a learner who only ever asks questions is served an authored probe within 3 turns', async () => {
    const res = await driveTurns(h, POST, HELP.map((q, i) => ({
      learnerSays: q, modelReplies: answer(i),
    })), { probes: CHEM_PROBES, subjectSlug: 'chemistry', conceptId: CHEM, lessonTitle: 'Activity Series' })

    const gates = res.map(gate)
    // THE ORIGINAL FAILURE, pinned as the precondition rather than assumed:
    // the phase was willing on every turn, and arbitration alone refused.
    expect(gates.slice(0, 3).every((g) => g?.phaseAllowsProbe !== false)).toBe(true)
    expect(gates[0]?.arbitrationRawAllowsProbe).toBe(false)
    expect(gates[0]?.blockedBy).toEqual(['arbitrationAllowsProbe'])

    // THE CEILING: the run is counted, and the third turn opens the gate.
    expect(gates[1]?.probeStarvedTurnsBefore).toBe(1)
    expect(gates[2]?.probeStarvedTurnsBefore).toBe(PROBE_STARVATION_RELIEF_AT)
    expect(gates[2]?.probeStarvationRelieved).toBe(true)
    expect(gates[2]?.eligible).toBe(true)

    // and it produced a real, server-keyed question with real options
    const served = res.slice(0, 3).map(mcqOf).find(Boolean)
    expect(served?.options.length).toBeGreaterThanOrEqual(2)
    expect(res.find((t) => readLog(t, '[turn-progress]') !== null)).toBeTruthy()
  }, 90_000)

  it('the answer to the learner is untouched — the probe rides alongside it', async () => {
    const res = await driveTurns(h, POST, HELP.slice(0, 3).map((q, i) => ({
      learnerSays: q, modelReplies: answer(i),
    })), { probes: CHEM_PROBES, subjectSlug: 'chemistry', conceptId: CHEM, lessonTitle: 'Activity Series' })
    const relieved = res.find((t) => gate(t)?.probeStarvationRelieved)!
    expect(relieved).toBeTruthy()
    // The model's reply to the question survives in full. Relief substitutes
    // WHICH question the turn carries; it never replaces the teaching.
    expect((relieved.body as { text: string }).text).toContain('Answering your question')
  }, 60_000)

  it('an inquisitive learner who then answers reaches VERIFIED mastery', async () => {
    // Alternate: ask, ask, then tap whatever is on screen. Before the ceiling
    // nothing was ever on screen to tap.
    const turns = Array.from({ length: 14 }, (_, i) => ({
      learnerSays: (mcq: { options: string[] } | null) =>
        mcq ? (mcq.options.find((o) => o.startsWith('Zinc')) ?? mcq.options[0]) : HELP[i % HELP.length],
      modelReplies: answer(i),
    }))
    const res = await driveTurns(h, POST, turns,
      { probes: CHEM_PROBES, subjectSlug: 'chemistry', conceptId: CHEM, lessonTitle: 'Activity Series' })
    const verified = res.map(masteryOf).find((m) => m?.verified === true)
    expect(verified).toMatchObject({ verified: true })
  }, 120_000)
})

describe('PCD-007 — the same ceiling in physics (it is one shared seam)', () => {
  it('physics reaches an authored probe on the same schedule', async () => {
    const res = await driveTurns(h, POST, HELP.slice(0, 3).map((q, i) => ({
      learnerSays: q, modelReplies: answer(i),
    })), { probes: PHYS_PROBES, subjectSlug: 'physics', conceptId: PHYS, lessonTitle: 'Inelastic Collisions' })
    expect(gate(res[2])?.probeStarvationRelieved).toBe(true)
    expect(res.slice(0, 3).map(mcqOf).some(Boolean)).toBe(true)
  }, 90_000)
})

// ───────────────────────────────────────────────────────────────────────────
describe('NEGATIVE CONTROLS — what the ceiling must never relieve', () => {
  it('DISTRESS is never relieved: recovery owns those turns absolutely', async () => {
    const DISTRESS = ['i am lost', 'sorry i dont understand this at all', 'i am lost', 'i am lost']
    const res = await driveTurns(h, POST, DISTRESS.map((q, i) => ({
      learnerSays: q, modelReplies: answer(i),
    })), { probes: CHEM_PROBES, subjectSlug: 'chemistry', conceptId: CHEM, lessonTitle: 'Activity Series' })
    // RECOVERY outranks the question rungs, so the owner is never relievable
    // and the counter can never arm. A frightened learner is not quizzed.
    expect(res.map(gate).some((g) => g?.probeStarvationRelieved)).toBe(false)
  }, 90_000)

  it('an ordinary lesson never arms the counter — relief is not the normal path', async () => {
    const res = await driveTurns(h, POST, Array.from({ length: 6 }, (_, i) => ({
      learnerSays: (mcq: { options: string[] } | null) =>
        mcq ? (mcq.options.find((o) => o.startsWith('Zinc')) ?? mcq.options[0]) : 'ok, that makes sense',
      modelReplies: answer(i),
    })), { probes: CHEM_PROBES, subjectSlug: 'chemistry', conceptId: CHEM, lessonTitle: 'Activity Series' })
    expect(res.map(gate).some((g) => g?.probeStarvationRelieved)).toBe(false)
  }, 90_000)

  it('relief never fires while ANOTHER gate term is also false', async () => {
    const res = await driveTurns(h, POST, HELP.map((q, i) => ({
      learnerSays: q, modelReplies: answer(i),
    })), { probes: CHEM_PROBES, subjectSlug: 'chemistry', conceptId: CHEM, lessonTitle: 'Activity Series' })
    for (const g of res.map(gate)) {
      if (!g?.probeStarvationRelieved) continue
      // On a relieved turn the ONLY term that was false is the arbitration one.
      expect(g.blockedBy).toEqual([])
      expect(g.arbitrationRawAllowsProbe).toBe(false)
    }
  }, 90_000)
})

// ───────────────────────────────────────────────────────────────────────────
describe('PCD-008 — a prose-formatted question is never graded, and no longer strands the learner', () => {
  it('the model writing an MCQ in prose produces NO mastery credit (safety half)', async () => {
    const res = await driveTurns(h, POST, [
      { learnerSays: 'ok', modelReplies: 'Zinc is more reactive than copper, so it displaces it.' },
      { learnerSays: 'got it', modelReplies: 'Now a question: which metal displaces copper? A) Zinc B) Silver C) Gold' },
      { learnerSays: 'A', modelReplies: 'Right!' },
    ], { probes: [], subjectSlug: 'chemistry', conceptId: CHEM, lessonTitle: 'Activity Series' })

    // The prose options never reach the learner as a gradeable item...
    expect(mcqOf(res[1])).toBeNull()
    // ...and the "A" that follows credits nothing. An unkeyed question must
    // never move an authoritative counter — this is the invariant, not a
    // preference.
    expect(masteryOf(res[2])).toMatchObject({ checkCorrect: 0, practiceCorrect: 0, verified: false })
  }, 60_000)

  it('the liveness half: with authored probes present the learner is not left ungradeable', async () => {
    // Same shape, but the concept holds authored probes — which is the real
    // state of every physics and chemistry concept (261/261, 186/186 at >= 5).
    const res = await driveTurns(h, POST, [
      ...HELP.slice(0, 3).map((q, i) => ({ learnerSays: q, modelReplies: `Which metal displaces copper? A) Zinc B) Silver C) Gold — ${answer(i)}` })),
    ], { probes: CHEM_PROBES, subjectSlug: 'chemistry', conceptId: CHEM, lessonTitle: 'Activity Series' })
    const served = res.map(mcqOf).find(Boolean)
    expect(served).toBeTruthy()
    // and what was served is the AUTHORED item, not the model's prose one
    expect(served!.options.some((o) => /^Zinc \(\d\)$/.test(o))).toBe(true)
  }, 90_000)
})

// ───────────────────────────────────────────────────────────────────────────
describe('STRUCTURAL — the ceiling cannot be widened by accident', () => {
  const ROUTE = readFileSync('src/app/api/learn/chat/route.ts', 'utf8')
  const BLOCK = ROUTE.slice(ROUTE.indexOf('const probeArbitration ='), ROUTE.indexOf('const gateEligible ='))

  it('only the two SEQUENCING rungs are relievable — never recovery, gap, close or complete', () => {
    expect(BLOCK).toContain("probeArbitration.owner === 'LEARNER_REQUEST'")
    expect(BLOCK).toContain("probeArbitration.owner === 'LEARNER_QUESTION'")
    for (const protectedOwner of ['RECOVERY', 'KNOWLEDGE_GAP', 'CLOSE', 'COMPLETE']) {
      expect(BLOCK, `${protectedOwner} must never be relievable`).not.toContain(`owner === '${protectedOwner}'`)
    }
  })

  it('"sole blocker" is read FROM the terms object, never re-derived beside it', () => {
    // A second copy of the gate's conditions is exactly how two guards drift.
    expect(BLOCK).toContain("Object.entries(gateTerms).every(([k, v]) => k === 'arbitrationAllowsProbe' || v === true)")
  })

  it('the relief is gated on the pure threshold predicate, not an inline number', () => {
    expect(BLOCK).toContain('shouldRelieveProbeStarvation(priorProbeStarvedTurnsHoisted)')
    expect(BLOCK).not.toMatch(/probeStarvedTurns\w*\s*>=\s*\d/)
  })

  it('the log distinguishes an arbitration-opened gate from a ceiling-opened one', () => {
    expect(ROUTE).toContain('arbitrationRawAllowsProbe,')
    expect(ROUTE).toContain('probeStarvationRelieved: probeStarvationRelievedHoisted,')
  })
})
