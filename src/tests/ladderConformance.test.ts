/**
 * S5 — Ladder Conformance (ISS-01 burn-down instrument).
 *
 * WHY THIS FILE EXISTS, AND WHY IT PINS FAILURES RATHER THAN FIXING THEM.
 *
 * The runtime redesign's S5 step was scoped as "wire kernel/tsm/machine.ts
 * as the live authority behind ConversationState, via the authored
 * phases.ts mapping." Executing that as specified would have silently
 * broken lesson completion for every learner. This suite is the evidence,
 * and the guard against it being attempted again without the reconciliation
 * decision first (see docs/architecture/ISS_01_LADDER_RECONCILIATION.md).
 *
 * Three independent defects, all verified here by exhaustive enumeration
 * rather than sampling — both ladders are PURE functions over a SMALL
 * FINITE state space, so a static test proves strictly more than a
 * production shadow observer could, at zero runtime cost. (This is the one
 * place the codebase's usual shadow/parity promotion discipline does NOT
 * apply: parity.ts exists for decisions that depend on real learner data.
 * A total function over 6 states does not.)
 *
 *   D1  ORDER INVERSION. legacyToCanonical maps CHECK→ASSESS (canonical
 *       index 8) and PRACTICE→INDEPENDENT (canonical index 6). Legacy
 *       orders CHECK(3) BEFORE PRACTICE(4); canonical orders
 *       INDEPENDENT(6) BEFORE ASSESS(8). The mapping round-trips to
 *       identity — so it looks correct — while inverting the very order
 *       relation every up/down transition is computed from.
 *
 *   D2  MASTERY BECOMES UNREACHABLE. Both machines write the same two
 *       fields (correctAtCheck, correctAtPractice) under DIFFERENT gate
 *       semantics and DIFFERENT thresholds. Walking each ladder to TRANSFER
 *       on all-correct answers: legacy arrives with check=1/practice=2,
 *       which satisfies masteryGate (requires >=1 and >=2). Canonical
 *       arrives with check=2/practice=1, which does NOT. Under the
 *       canonical machine as authority, masteryVerified() could never
 *       become true, so [LESSON_COMPLETE] could never be authorized and NO
 *       LESSON COULD EVER COMPLETE.
 *
 *   D3  7 OF 12 TRANSITIONS DIVERGE. Including two that are pedagogically
 *       serious in opposite directions: a single correct answer at legacy
 *       CHECK jumps straight to TRANSFER under canonical (skipping
 *       PRACTICE — the assessment-skip the mission exists to prevent),
 *       while a failure at TRANSFER drops to CHECK under canonical vs
 *       PRACTICE under legacy.
 *
 * These are NOT a mechanical migration away. Legacy CHECK is a FORMATIVE
 * check immediately after guidance ("did that land?"); canonical ASSESS is
 * a SUMMATIVE gate near the end. They are different pedagogical objects
 * that the mapping conflates. Choosing between them is a teaching decision,
 * not a refactor — which is exactly why S5 stops here.
 *
 * WHEN ISS-01 IS RESOLVED: the `pinned` expectations below become the
 * change-detector for the fix. Every one that flips from divergent to
 * agreeing is a burn-down item completed. The D2 characterization test in
 * particular MUST be inverted (canonical must satisfy masteryGate) before
 * any wiring is attempted.
 */
import { describe, it, expect } from 'vitest'
import {
  initialConversationState, advanceConversationState, PHASE_ORDER,
  type ConversationState, type TeachingPhase,
} from '@/lib/teaching/conversationState'
import { machineFromLegacy, step } from '@/lib/kernel/tsm/machine'
import { canonicalToLegacy, legacyToCanonical, PHASE_ORDER_10 } from '@/lib/kernel/tsm/phases'
import { masteryVerified } from '@/lib/teaching/masteryGate'

const CONCEPT = 'phys.mech.newtons-first-law'

function legacyStep(phase: TeachingPhase, signalCorrect: boolean): ConversationState {
  return advanceConversationState(
    { ...initialConversationState(CONCEPT), phase, demonstrated: true },
    { askedQuestion: false, signalCorrect, recoveryFired: false },
  )
}

function canonicalStepAsLegacy(phase: TeachingPhase, signalCorrect: boolean): TeachingPhase {
  const m0 = machineFromLegacy(phase, { demonstrated: true })
  const m1 = step(m0, {
    signalCorrect,
    signalConfidence: signalCorrect ? 'high' : null,
    recoveryFired: false,
    // Most generous reading for the canonical machine: grant the own-words
    // gate, so any divergence found is structural and not an artifact of
    // withholding evidence the canonical ladder needs.
    learnerRestated: true,
  })
  return canonicalToLegacy(m1.state.phase) as TeachingPhase
}

// ── D1 · the mapping round-trips but inverts the order relation ────────────

describe('D1 — legacy/canonical mapping inverts the CHECK/PRACTICE order', () => {
  it('round-trips to identity for every legacy phase (why the defect is invisible)', () => {
    for (const lp of PHASE_ORDER) {
      expect(canonicalToLegacy(legacyToCanonical(lp))).toBe(lp)
    }
  })

  it('PINNED DEFECT: legacy orders CHECK before PRACTICE; canonical orders them the other way', () => {
    const legacyCheckIdx = PHASE_ORDER.indexOf('CHECK')
    const legacyPracticeIdx = PHASE_ORDER.indexOf('PRACTICE')
    expect(legacyCheckIdx).toBeLessThan(legacyPracticeIdx)

    const canonCheckIdx = PHASE_ORDER_10.indexOf(legacyToCanonical('CHECK'))       // ASSESS = 8
    const canonPracticeIdx = PHASE_ORDER_10.indexOf(legacyToCanonical('PRACTICE')) // INDEPENDENT = 6

    // The inversion. When ISS-01 is fixed this expectation must be REVERSED
    // to `toBeLessThan`, matching the legacy order the live product ships.
    expect(canonCheckIdx).toBeGreaterThan(canonPracticeIdx)
  })
})

// ── D2 · mastery is unreachable under the canonical machine ────────────────

describe('D2 — canonical ladder cannot satisfy masteryGate (blocks all completion)', () => {
  function walkLegacyToTransfer(): ConversationState {
    let s: ConversationState = { ...initialConversationState(CONCEPT), demonstrated: true }
    for (let i = 0; i < 30 && s.phase !== 'TRANSFER'; i++) {
      s = advanceConversationState(s, { askedQuestion: false, signalCorrect: true, recoveryFired: false })
    }
    return s
  }

  function walkCanonicalToTransfer(): { correctAtCheck: number; correctAtPractice: number } {
    let m = machineFromLegacy('OBSERVE', { demonstrated: true })
    for (let i = 0; i < 30 && m.phase !== 'TRANSFER'; i++) {
      m = step(m, { signalCorrect: true, signalConfidence: 'high', recoveryFired: false, learnerRestated: true }).state
    }
    return { correctAtCheck: m.correctAtCheck, correctAtPractice: m.correctAtPractice }
  }

  it('legacy ladder arrives at TRANSFER with mastery VERIFIED (the shipping behaviour)', () => {
    const s = walkLegacyToTransfer()
    expect(s.phase).toBe('TRANSFER')
    expect(s.correctAtCheck).toBe(1)
    expect(s.correctAtPractice).toBe(2)
    expect(masteryVerified(s)).toBe(true)
  })

  it('PINNED DEFECT: canonical ladder arrives at TRANSFER with mastery NOT verified', () => {
    const { correctAtCheck, correctAtPractice } = walkCanonicalToTransfer()
    // Same field names, inverted thresholds: canonical gates INDEPENDENT at
    // correctAtCheck>=2 and ASSESS at correctAtPractice>=1; masteryGate wants
    // correctAtCheck>=1 and correctAtPractice>=2.
    expect(correctAtCheck).toBe(2)
    expect(correctAtPractice).toBe(1)

    const asConversationState: ConversationState = {
      ...initialConversationState(CONCEPT), correctAtCheck, correctAtPractice,
    }
    // THE BLOCKER. Wiring the canonical machine as authority today would make
    // this the live behaviour: no learner could ever complete a lesson.
    // This expectation MUST be inverted to `true` before S5 proceeds.
    expect(masteryVerified(asConversationState)).toBe(false)
  })
})

// ── D3 · exhaustive per-transition divergence ─────────────────────────────

describe('D3 — exhaustive transition conformance across the full state space', () => {
  /** Every (phase x outcome) pair, with the currently-observed result of
   *  each ladder. `agrees` is the burn-down column: it must become all-true
   *  before the canonical machine can take authority. */
  const PINNED: Array<{
    from: TeachingPhase; correct: boolean; legacy: TeachingPhase; canonical: TeachingPhase; agrees: boolean
  }> = [
    // success
    { from: 'OBSERVE',     correct: true,  legacy: 'DEMONSTRATE', canonical: 'DEMONSTRATE', agrees: true  },
    { from: 'DEMONSTRATE', correct: true,  legacy: 'GUIDE',       canonical: 'DEMONSTRATE', agrees: false },
    { from: 'GUIDE',       correct: true,  legacy: 'CHECK',       canonical: 'PRACTICE',    agrees: false },
    { from: 'CHECK',       correct: true,  legacy: 'PRACTICE',    canonical: 'TRANSFER',    agrees: false },
    { from: 'PRACTICE',    correct: true,  legacy: 'PRACTICE',    canonical: 'PRACTICE',    agrees: true  },
    { from: 'TRANSFER',    correct: true,  legacy: 'TRANSFER',    canonical: 'TRANSFER',    agrees: true  },
    // failure
    { from: 'OBSERVE',     correct: false, legacy: 'DEMONSTRATE', canonical: 'DEMONSTRATE', agrees: true  },
    { from: 'DEMONSTRATE', correct: false, legacy: 'DEMONSTRATE', canonical: 'DEMONSTRATE', agrees: true  },
    { from: 'GUIDE',       correct: false, legacy: 'DEMONSTRATE', canonical: 'GUIDE',       agrees: false },
    { from: 'CHECK',       correct: false, legacy: 'GUIDE',       canonical: 'CHECK',       agrees: false },
    { from: 'PRACTICE',    correct: false, legacy: 'CHECK',       canonical: 'GUIDE',       agrees: false },
    { from: 'TRANSFER',    correct: false, legacy: 'PRACTICE',    canonical: 'CHECK',       agrees: false },
  ]

  it.each(PINNED)(
    'from $from (correct=$correct): legacy->$legacy, canonical->$canonical',
    ({ from, correct, legacy, canonical, agrees }) => {
      expect(legacyStep(from, correct).phase).toBe(legacy)
      expect(canonicalStepAsLegacy(from, correct)).toBe(canonical)
      expect(legacy === canonical).toBe(agrees)
    },
  )

  it('PINNED: 7 of 12 transitions diverge — the ISS-01 burn-down list', () => {
    const diverging = PINNED.filter((p) => !p.agrees)
    // When ISS-01 is resolved this must become 0. Any change to either
    // ladder that moves this number will fail this test loudly rather than
    // silently altering how every learner is taught.
    expect(diverging).toHaveLength(7)
  })

  it('covers every phase in the live ladder (no transition left unenumerated)', () => {
    for (const phase of PHASE_ORDER) {
      expect(PINNED.filter((p) => p.from === phase)).toHaveLength(2) // one per outcome
    }
    expect(PINNED).toHaveLength(PHASE_ORDER.length * 2)
  })
})

// ── Guard: the machine must stay unwired until the above is resolved ───────

describe('S5 guard — the canonical machine has no production authority yet', () => {
  it('advanceConversationState remains the sole writer of the live phase', () => {
    // A behavioural assertion, not a grep: if some future change routes the
    // live ladder through the canonical machine, D3's divergences would make
    // this fail. Two correct answers from OBSERVE must reach GUIDE (legacy
    // semantics), never NAME/PRACTICE (canonical semantics).
    let s: ConversationState = { ...initialConversationState(CONCEPT), demonstrated: true }
    s = advanceConversationState(s, { askedQuestion: false, signalCorrect: true, recoveryFired: false })
    expect(s.phase).toBe('DEMONSTRATE')
    s = advanceConversationState(s, { askedQuestion: false, signalCorrect: true, recoveryFired: false })
    expect(s.phase).toBe('GUIDE')
  })
})
