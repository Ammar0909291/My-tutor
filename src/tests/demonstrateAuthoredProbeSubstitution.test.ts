import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'

import { mayAttachProbeBelowGuide, CREDITS_REQUIRED_FOR_MASTERY } from '@/lib/teaching/masteryReachability'
import { probeToMcq, isProbeAttachablePhase, isMasteryGatePhase } from '@/lib/teaching/gateAssessment'
import { decideModelProbe } from '@/lib/teaching/inventedProbeGuard'
import { mcqToServe, probeKeyIsAuthored, mcqForClient } from '@/lib/teaching/mcq'
import { writePendingQuestion } from '@/lib/teaching/pendingQuestion'
import { advanceConversationState, initialConversationState } from '@/lib/teaching/conversationState'
import { masteryVerifiedStrict } from '@/lib/teaching/masteryGate'

/**
 * R3 — AN AUTHORED PROBE SUBSTITUTES FOR THE MODEL'S INVENTED ONE AT DEMONSTRATE.
 *
 * ── THE MEASUREMENT THAT FORCED THIS ────────────────────────────────────────
 * Physics Tier A batch 5 (2026-09-04, production, 4 workers): 25 concepts drawn
 * from the 63 that had previously returned UNMEASURED were re-run.
 *
 *   19 of 25 UNMEASURED, all `no-authored-match`
 *   18 of 19 persisted a `pendingMcq` carrying NO assetId — the MODEL's own
 *      invented question had become the graded item
 *   15 of those sat at DEMONSTRATE, move 'show', `strugglingOnThisConcept` FALSE
 *   all 19 concepts hold 4-6 ACTIVE gradeable authored probes at the served
 *      band, and 19/19 clear the surplus rule
 *
 * E1 had scoped DEMONSTRATE to a struggling learner on the premise that a
 * PROGRESSING learner's DEMONSTRATE turn is a quiet show turn. It is not: it
 * already carried a question, ungradeable, graded the next turn against a key
 * the model itself wrote.
 *
 * ── WHY THESE TESTS DRIVE THE REAL MODULES ──────────────────────────────────
 * The gate's phase condition is inline in route.ts and not exported; its exact
 * spelling is pinned by a2LadderGateReachability / e1DemonstrateProbeReachability.
 * `gateOpens` below mirrors that one expression so the DOWNSTREAM chain — the
 * real surplus rule, the real converter, the real guard, the real persist
 * helper, the real ladder fold — can be driven end to end. Nothing here asserts
 * on route source text.
 */

// ── the route's own gate condition, mirrored (source pinned elsewhere) ───────
//
// R81 (2026-09-07) adds OBSERVE, scoped to its own 'ask' turn exactly as
// GUIDE already is — elided here the same way GUIDE's own ask-restriction
// already was, per this mirror's established convention (source pinned in
// "0 — THE MIRROR IS COUPLED TO THE ROUTE" below).
function gateOpens(phase: string): boolean {
  return isMasteryGatePhase(phase) || phase === 'GUIDE' /* && move==='ask' */ || phase === 'DEMONSTRATE'
    || phase === 'OBSERVE' /* && move==='ask' */
}
function gateOpensPreFix(phase: string, struggling: boolean): boolean {
  return isMasteryGatePhase(phase) || phase === 'GUIDE' || (phase === 'DEMONSTRATE' && struggling)
}

/** A real authored probe shape, as `findBestProbe` returns it. */
const AUTHORED_PROBE = {
  assetId: 'asset-abc-123',
  stem: 'A 2 kg block is pushed with 10 N on a frictionless floor. What is its acceleration?',
  choices: [
    { text: '5 m/s²', isCorrect: true },
    { text: '20 m/s²', isCorrect: false },
    { text: '0.2 m/s²', isCorrect: false },
    { text: '12 m/s²', isCorrect: false },
  ],
}

/** What the model invents when nothing authoritative is attached. */
const INVENTED_MCQ = {
  question: 'Which of the following best describes acceleration?',
  options: ['Change in velocity over time', 'Distance over time', 'Force times mass'],
  correctIndex: 0,
}

/** The full serving decision for one turn, driving the real modules. */
function serveTurn(opts: {
  phase: string
  poolSize: number
  struggling?: boolean
  modelInvented?: typeof INVENTED_MCQ | null
  preFix?: boolean
}) {
  const modelMcq = opts.modelInvented === undefined ? INVENTED_MCQ : opts.modelInvented
  const eligible = opts.preFix
    ? gateOpensPreFix(opts.phase, opts.struggling === true)
    : gateOpens(opts.phase)

  // The gate runs the selector ONLY when eligible — so availability is genuine
  // knowledge there and genuine ignorance (null) otherwise.
  let gateMcq: ReturnType<typeof probeToMcq> = null
  let authoredProbesExist: boolean | null = null
  if (eligible) {
    authoredProbesExist = true
    const belowGuideBlocked =
      (opts.phase === 'DEMONSTRATE' || opts.phase === 'OBSERVE')
      && !mayAttachProbeBelowGuide(opts.phase, opts.poolSize)
    gateMcq = belowGuideBlocked ? null : probeToMcq(AUTHORED_PROBE)
  }

  const decision = decideModelProbe({
    probeWouldCountThisPhase: isProbeAttachablePhase(opts.phase),
    gateServedAuthoredProbe: gateMcq !== null,
    modelOfferedProbe: modelMcq !== null,
    authoredProbesExist,
    gateDeclinedByPolicy: !eligible,
  })

  let attached = gateMcq ?? (modelMcq as never)
  if (!decision.serve && modelMcq !== null && gateMcq === null) attached = null as never

  const served = mcqToServe(attached ?? null, null, null)
  const persisted = writePendingQuestion(served)
  return { eligible, gateMcq, decision, served, persisted }
}

describe('0 — THE MIRROR IS COUPLED TO THE ROUTE', () => {
  // Without this, every behavioural case below passes in BOTH the pre- and
  // post-fix states, because `gateOpens` mirrors route.ts rather than importing
  // it — the replica-drift trap this repo has been burned by before. Verified:
  // with route.ts reverted, this block fails and takes the rest with it.
  const ROUTE = readFileSync('src/app/api/learn/chat/route.ts', 'utf8')

  it('route.ts opens DEMONSTRATE unconditionally, as `gateOpens` assumes', () => {
    expect(ROUTE).toContain("(phaseBeforeTurn === 'DEMONSTRATE')")
    expect(ROUTE).not.toContain("phaseBeforeTurn === 'DEMONSTRATE' && ")
  })

  it('route.ts still gates GUIDE on the ask move, and now gates OBSERVE the identical way (R81)', () => {
    expect(ROUTE).toContain("(phaseBeforeTurn === 'GUIDE' && evidenceMoveHoisted === 'ask')")
    // SUPERSEDED 2026-09-07 (R81): OBSERVE now IS a disjunct, scoped to its
    // own 'ask' turn — the same restriction pattern as GUIDE, never
    // unconditional the way DEMONSTRATE is (DEMONSTRATE can be unconditional
    // only because decideNextMove never returns 'ask' there at all; OBSERVE
    // can, so it needs the same move guard GUIDE has).
    expect(ROUTE).toContain("(phaseBeforeTurn === 'OBSERVE' && evidenceMoveHoisted === 'ask')")
  })

  it('route.ts still delegates the early spend to the surplus rule', () => {
    expect(ROUTE).toContain('mayAttachProbeBelowGuide')
  })
})

describe('A — DEMONSTRATE, pool >= 4, no failures: the authored probe attaches', () => {
  const r = serveTurn({ phase: 'DEMONSTRATE', poolSize: 4, struggling: false })

  it('the gate opens for a learner who has NOT failed', () => {
    expect(r.eligible).toBe(true)
  })

  it('an authored probe is attached and is gradeable', () => {
    expect(r.gateMcq).not.toBeNull()
    expect(r.gateMcq!.correctIndex).toBe(0)
    expect(r.gateMcq!.options).toHaveLength(4)
    // exactly one correct choice survived conversion
    expect(AUTHORED_PROBE.choices.filter((c) => c.isCorrect)).toHaveLength(1)
  })

  it('decideModelProbe resolves as authored-served', () => {
    expect(r.decision.reason).toBe('authored-served')
    expect(r.decision.serve).toBe(false)
  })

  it('the persisted pendingMcq carries the assetId', () => {
    expect(probeKeyIsAuthored(r.persisted as never)).toBe(true)
    expect((r.persisted as { assetId?: string }).assetId).toBe('asset-abc-123')
  })

  it('and the learner-facing projection still leaks neither key nor assetId', () => {
    const client = mcqForClient(r.served) as Record<string, unknown>
    expect(client.correctIndex).toBeUndefined()
    expect(client.assetId).toBeUndefined()
  })
})

describe('B — DEMONSTRATE, pool = 3: the surplus rule refuses, old behaviour stands', () => {
  const r = serveTurn({ phase: 'DEMONSTRATE', poolSize: CREDITS_REQUIRED_FOR_MASTERY, struggling: false })

  it('mayAttachProbeBelowGuide is the thing that refuses', () => {
    expect(mayAttachProbeBelowGuide('DEMONSTRATE', 3)).toBe(false)
    expect(mayAttachProbeBelowGuide('DEMONSTRATE', 4)).toBe(true)
    expect(r.gateMcq).toBeNull()
  })

  it('the model MCQ is still governed by phase-does-not-count', () => {
    expect(r.decision.reason).toBe('phase-does-not-count')
    expect(r.decision.serve).toBe(true)
  })

  it('a bare-contract concept is therefore byte-identical to before the change', () => {
    expect(probeKeyIsAuthored(r.persisted as never)).toBe(false)
    expect((r.served as { question: string }).question).toBe(INVENTED_MCQ.question)
  })
})

describe('C — OBSERVE, pool >= 4: the authored probe substitutes too (R81)', () => {
  // MEASURED, the reason this reopened: 79 of 238 Mohd Physics Tier-A
  // concepts terminated UNMEASURED at turn 1, phaseBeforeTurn OBSERVE,
  // 100% phase-does-not-count, every one holding 4-12 ACTIVE production
  // probes — never a content gap. Mirrors describe blocks A/B exactly,
  // for the phase that previously had no substitution at any pool size.
  const r = serveTurn({ phase: 'OBSERVE', poolSize: 4, struggling: false })

  it('the gate opens', () => {
    expect(r.eligible).toBe(true)
  })

  it('an authored probe is attached and is gradeable', () => {
    expect(r.gateMcq).not.toBeNull()
    expect(r.gateMcq!.correctIndex).toBe(0)
  })

  it('decideModelProbe resolves as authored-served — no change needed to that module', () => {
    expect(r.decision.reason).toBe('authored-served')
    expect(r.decision.serve).toBe(false)
  })

  it('the persisted pendingMcq carries the assetId', () => {
    expect(probeKeyIsAuthored(r.persisted as never)).toBe(true)
  })
})

describe('D0 — OBSERVE, pool = 3: the surplus rule refuses, exactly as it does at DEMONSTRATE', () => {
  const r = serveTurn({ phase: 'OBSERVE', poolSize: CREDITS_REQUIRED_FOR_MASTERY, struggling: false })

  it('mayAttachProbeBelowGuide is the thing that refuses — same threshold, not a second one', () => {
    expect(mayAttachProbeBelowGuide('OBSERVE', 3)).toBe(false)
    expect(mayAttachProbeBelowGuide('OBSERVE', 4)).toBe(true)
    expect(r.gateMcq).toBeNull()
  })

  it('the model MCQ is still governed by phase-does-not-count', () => {
    expect(r.decision.reason).toBe('phase-does-not-count')
    expect(r.decision.serve).toBe(true)
  })

  it('a bare-contract concept is therefore byte-identical to before the change', () => {
    expect(probeKeyIsAuthored(r.persisted as never)).toBe(false)
    expect((r.served as { question: string }).question).toBe(INVENTED_MCQ.question)
  })
})

describe('D — SUBSTITUTION, not addition', () => {
  it('when the gate DECLINES, no authored question is fabricated', () => {
    const r = serveTurn({ phase: 'DEMONSTRATE', poolSize: 3, struggling: false })
    expect(r.gateMcq).toBeNull()
    // whatever is served is the model's own, unchanged — nothing invented by us
    expect((r.served as { question: string }).question).toBe(INVENTED_MCQ.question)
  })

  it('when the gate declines AND the model asked nothing, the turn stays question-free', () => {
    const r = serveTurn({ phase: 'DEMONSTRATE', poolSize: 3, struggling: false, modelInvented: null })
    expect(r.served).toBeNull()
    expect(r.persisted).toBeNull()
  })

  it('when the gate ATTACHES, the model-invented MCQ is NOT persisted', () => {
    const r = serveTurn({ phase: 'DEMONSTRATE', poolSize: 5, struggling: false })
    expect((r.served as { question: string }).question).toBe(AUTHORED_PROBE.stem)
    expect((r.served as { question: string }).question).not.toBe(INVENTED_MCQ.question)
    expect(probeKeyIsAuthored(r.persisted as never)).toBe(true)
  })

  it('a DEMONSTRATE turn where the model asked nothing gains no question when the gate attaches nothing', () => {
    // The gate opening is not by itself a question: with no probe convertible
    // and no model tag, the turn is still silent.
    const r = serveTurn({ phase: 'DEMONSTRATE', poolSize: 3, struggling: true, modelInvented: null })
    expect(r.served).toBeNull()
  })
})

describe('E — MASTERY INVARIANT: a DEMONSTRATE probe banks no mastery credit', () => {
  it('answering it correctly advances the phase and leaves the verified counters at 0', () => {
    let s = initialConversationState('phys.mech.newtons-second-law')
    // Reach DEMONSTRATE the way the real ladder does.
    s = advanceConversationState(s, { askedQuestion: false, signalCorrect: null, deliveredTeaching: true })
    s = advanceConversationState(s, { askedQuestion: true, signalCorrect: true, deliveredTeaching: true })
    expect(s.phase).toBe('DEMONSTRATE')

    // Now answer a SERVER-GRADED authored probe correctly, at DEMONSTRATE.
    const before = { ...s }
    s = advanceConversationState(s, {
      askedQuestion: true, signalCorrect: true, deliveredTeaching: true, serverGraded: true,
    })

    expect(s.verifiedCorrectAtCheck).toBe(0)
    expect(s.verifiedCorrectAtPractice).toBe(0)
    expect(s.correctAtCheck).toBe(before.correctAtCheck)
    expect(s.correctAtPractice).toBe(before.correctAtPractice)
    expect(masteryVerifiedStrict(s)).toBe(false)
  })

  it('no mastery credit is granted below CHECK/PRACTICE, for either key kind', () => {
    for (const serverGraded of [true, false]) {
      let s = initialConversationState('c')
      s = advanceConversationState(s, { askedQuestion: false, signalCorrect: null, deliveredTeaching: true })
      for (const phase of ['OBSERVE', 'DEMONSTRATE']) {
        void phase
        s = advanceConversationState(s, {
          askedQuestion: true, signalCorrect: true, deliveredTeaching: true, serverGraded,
        })
      }
      expect(s.verifiedCorrectAtCheck, `serverGraded=${serverGraded}`).toBe(0)
      expect(s.verifiedCorrectAtPractice, `serverGraded=${serverGraded}`).toBe(0)
      expect(masteryVerifiedStrict(s), `serverGraded=${serverGraded}`).toBe(false)
    }
  })

  it('the mastery thresholds themselves are untouched by this change', () => {
    expect(CREDITS_REQUIRED_FOR_MASTERY).toBe(3)
    const gate = readFileSync('src/lib/teaching/masteryGate.ts', 'utf8')
    expect(gate).toContain('export const MASTERY_CHECK_REQUIRED = 1')
    expect(gate).toContain('export const MASTERY_PRACTICE_REQUIRED = 2')
  })
})

describe('F — NEGATIVE CONTROL: these assertions fail against pre-fix behaviour', () => {
  it('PRE-FIX, a non-struggling DEMONSTRATE turn served the INVENTED question', () => {
    const pre = serveTurn({ phase: 'DEMONSTRATE', poolSize: 5, struggling: false, preFix: true })
    expect(pre.eligible).toBe(false)
    expect(pre.gateMcq).toBeNull()
    expect(pre.decision.reason).toBe('phase-does-not-count')
    expect(probeKeyIsAuthored(pre.persisted as never)).toBe(false)   // ← the defect
  })

  it('POST-FIX, the same turn serves the AUTHORED question', () => {
    const post = serveTurn({ phase: 'DEMONSTRATE', poolSize: 5, struggling: false })
    expect(post.eligible).toBe(true)
    expect(post.gateMcq).not.toBeNull()
    expect(post.decision.reason).toBe('authored-served')
    expect(probeKeyIsAuthored(post.persisted as never)).toBe(true)   // ← the fix
  })

  it('a STRUGGLING learner is unchanged by the fix — E1 already covered them', () => {
    const pre = serveTurn({ phase: 'DEMONSTRATE', poolSize: 5, struggling: true, preFix: true })
    const post = serveTurn({ phase: 'DEMONSTRATE', poolSize: 5, struggling: true })
    expect(pre.decision.reason).toBe(post.decision.reason)
    expect(probeKeyIsAuthored(pre.persisted as never)).toBe(true)
    expect(probeKeyIsAuthored(post.persisted as never)).toBe(true)
  })

  it('SUPERSEDED (R81): what actually SERVES is unchanged below the surplus floor, and differs at/above it', () => {
    // `eligible` is NOT the invariant to pin here — it only reflects the
    // PHASE test (`gateOpens`), which now fires unconditionally on OBSERVE's
    // own 'ask' turn, exactly as GUIDE's mirror already does elsewhere in this
    // file (move === 'ask' elided as a comment, same convention). R81 does
    // not scope the phase test itself by pool; the surplus rule
    // (`mayAttachProbeBelowGuide`, via `belowGuideBlocked` above) is what
    // decides whether the gate's probe actually reaches the learner. So the
    // invariant this test pins is what gets SERVED, matching R3's own
    // DEMONSTRATE negative control below.
    for (const pool of [0, 3]) {
      const pre = serveTurn({ phase: 'OBSERVE', poolSize: pool, struggling: false, preFix: true })
      const post = serveTurn({ phase: 'OBSERVE', poolSize: pool, struggling: false })
      // Below the floor, neither pre- nor post-fix serves an authored probe —
      // the bare-contract concept behaves exactly as before.
      expect(probeKeyIsAuthored(pre.persisted as never)).toBe(false)
      expect(probeKeyIsAuthored(post.persisted as never)).toBe(false)
    }
    // At and above the surplus floor, the fix changes exactly what R3's own
    // DEMONSTRATE negative control changed — PRE-FIX invented, POST-FIX authored.
    for (const pool of [4, 20]) {
      const pre = serveTurn({ phase: 'OBSERVE', poolSize: pool, struggling: false, preFix: true })
      const post = serveTurn({ phase: 'OBSERVE', poolSize: pool, struggling: false })
      expect(probeKeyIsAuthored(pre.persisted as never)).toBe(false)
      expect(probeKeyIsAuthored(post.persisted as never)).toBe(true)
    }
  })
})
