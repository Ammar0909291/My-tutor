/**
 * PHASE E — OBSERVE must be able to CONCLUDE, not only to be failed out of.
 *
 * WHAT THE FOLD DOES TODAY. `phaseAfterConcludedDiagnostic` — the transition
 * that means "we ran the diagnostic, it produced nothing, start teaching" — is
 * invoked at EXACTLY ONE place in `advanceConversationState`: inside
 * `if (failed)`. So it can only fire on a turn the learner answered WRONG or
 * fired a dont_know recovery.
 *
 * Measured against the real modules: a learner who keeps saying "say it more
 * simply" thirty times sits at OBSERVE with observeFailures 0 and
 * consecutiveDontKnows 0 — the counters that feed the transition never rise,
 * so it never fires. Every learner request, every practice request and every
 * no-signal turn leaves the phase exactly where it was.
 *
 * Live, isolated, zero degraded turns, budget 12:
 *   gauss-law 6 OBSERVE turns MASTERED · moment-of-inertia 5 MASTERED ·
 *   atomic-orbitals 8 MASTERED (needed the extension) ·
 *   titration 8 OBSERVE turns, 2 gradeable questions, budget exhausted.
 *
 * THE RULE PINNED HERE. `observeFailures`'s own comment defines it as "an
 * OBSERVE probe was run and produced nothing". A turn where the ENGINE decided
 * to ask and no gradeable answer came back is that fact, by that definition,
 * and it was simply never recorded. Recording it lets the EXISTING transition
 * fire, with the EXISTING >= 2 threshold. No new state, no new phase meaning,
 * and emphatically not "after N turns, skip OBSERVE".
 *
 * WHAT MUST NOT MOVE, and most of this file is about that: authored probes are
 * still barred from OBSERVE (267 of 374 concepts hold exactly the three the
 * mastery gates need), mastery still needs graded evidence, degraded turns
 * still teach nothing, and the perfect-learner path is byte-identical.
 */
import { describe, it, expect } from 'vitest'
import {
  advanceConversationState,
  decideNextMove,
  initialConversationState,
  type ConversationState,
  type NextMoveContext,
  type TeachingPhase,
  type TurnEvidence,
} from '@/lib/teaching/conversationState'
import { phaseAfterConcludedDiagnostic } from '@/lib/teaching/questionLegality'
import { isMasteryGatePhase, isProbeAttachablePhase } from '@/lib/teaching/gateAssessment'

const CTX: NextMoveContext = { recoveryTurn: false, workedExampleFirst: false }

const observing = (over: Partial<ConversationState> = {}): ConversationState => ({
  ...initialConversationState('chem.equil.titration'),
  phase: 'OBSERVE',
  taughtThisSession: true,
  ...over,
})

/** The engine asked, and nothing gradeable came back. */
const askedLearnedNothing: TurnEvidence = {
  askedQuestion: true,
  questionSanctioned: true,   // the engine's own decided move was 'ask'
  deliveredTeaching: false,
  signalCorrect: null,
  recoveryFired: false,
}

/** The shipped probe policy, spelled as route.ts spells it. */
const probeAttaches = (phase: TeachingPhase, move: 'teach' | 'show' | 'ask') =>
  (isMasteryGatePhase(phase) || (phase === 'GUIDE' && move === 'ask'))
  && isProbeAttachablePhase(phase)

// ── the new behaviour ───────────────────────────────────────────────────────

describe('an OBSERVE probe that produces nothing is recorded', () => {
  it('counts one unanswered engine question as a concluded probe', () => {
    const s = advanceConversationState(observing(), askedLearnedNothing)
    expect(s.observeFailures).toBe(1)
    expect(s.phase).toBe('OBSERVE')      // one is not yet a conclusion
  })

  it('concludes the diagnostic on the second one, via the existing transition', () => {
    let s = observing()
    s = advanceConversationState(s, askedLearnedNothing)
    s = advanceConversationState(s, askedLearnedNothing)
    expect(s.observeFailures).toBe(2)
    expect(s.phase).toBe('DEMONSTRATE')
    // and that is exactly what the existing transition function says
    expect(phaseAfterConcludedDiagnostic('OBSERVE', 2)).toBe('DEMONSTRATE')
  })

  /** OBSERVE turns consumed in a 12-turn budget by a learner of this shape. */
  const observeDwell = (ev: Partial<TurnEvidence>) => {
    let s = initialConversationState('c')
    let observeTurns = 0
    for (let n = 1; n <= 12; n++) {
      const move = decideNextMove(s, CTX)
      if (s.phase === 'OBSERVE') observeTurns++
      s = advanceConversationState(s, {
        askedQuestion: move === 'ask', questionSanctioned: move === 'ask',
        deliveredTeaching: move !== 'ask', recoveryFired: false, signalCorrect: null, ...ev,
      })
    }
    return observeTurns
  }

  it('bounds a learner who answers nothing (was all 12 turns)', () => {
    expect(observeDwell({})).toBeLessThanOrEqual(4)
  })

  it('bounds a learner who only asks for a picture (was all 12 turns)', () => {
    expect(observeDwell({ learnerRequest: 'diagram' })).toBeLessThanOrEqual(4)
  })

  it('does NOT bound a pure-remediation learner — a deliberate boundary', () => {
    // "explain_differently" returns early from the fold, in the remediation
    // branch that owns its own phase decision (the G-2 mastery-gate hold).
    // Firing a second phase decision inside that branch would put two
    // authorities on one transition, so this rule deliberately stays out of it
    // — and a learner who only ever asks to be re-explained is genuinely not
    // ready to be assessed. Pinned so the boundary is a decision, not a
    // silently-inherited accident.
    expect(observeDwell({ learnerRequest: 'explain_differently' })).toBe(12)
  })

  it('does NOT bound a provider outage — an outage is not a diagnostic result', () => {
    expect(observeDwell({ degradedTurn: true, deliveredTeaching: true })).toBe(12)
  })
})

// ── what must NOT count ─────────────────────────────────────────────────────

describe('only a real diagnostic result counts', () => {
  it('a turn the engine spent TEACHING is not a failed probe', () => {
    const s = advanceConversationState(observing(), {
      ...askedLearnedNothing, questionSanctioned: false, deliveredTeaching: true,
    })
    expect(s.observeFailures ?? 0).toBe(0)
    expect(s.phase).toBe('OBSERVE')
  })

  it('a model-volunteered question on a teach turn is not a failed probe', () => {
    // askedQuestion true (the model wrote a '?') but the ENGINE decided teach
    const s = advanceConversationState(observing(), {
      askedQuestion: true, questionSanctioned: false, deliveredTeaching: true,
      signalCorrect: null, recoveryFired: false,
    })
    expect(s.observeFailures ?? 0).toBe(0)
  })

  it('a degraded outage turn is not a diagnostic result', () => {
    let s = observing()
    for (let i = 0; i < 10; i++) {
      s = advanceConversationState(s, { ...askedLearnedNothing, degradedTurn: true })
    }
    expect(s.observeFailures ?? 0).toBe(0)
    expect(s.phase).toBe('OBSERVE')
    expect(s.demonstrated).toBe(false)
  })

  it('a recovery turn keeps using its own dont_know channel', () => {
    const s = advanceConversationState(observing(), {
      ...askedLearnedNothing, recoveryFired: true, dontKnowSignal: true,
    })
    // A dont_know at OBSERVE goes through the EXISTING failure branch and
    // raises BOTH counters — the fold's own comment says so and explains why
    // the transition takes max(), not sum(): "a dont_know at OBSERVE
    // increments both, and must still count as one failed probe". Pinned as
    // the pre-existing behaviour, which this change must not alter.
    expect(s.consecutiveDontKnows).toBe(1)
    expect(s.observeFailures).toBe(1)
  })

  it('a correct answer still leaves via the success path, not as a failure', () => {
    const s = advanceConversationState(observing(), { ...askedLearnedNothing, signalCorrect: true })
    expect(s.observeFailures ?? 0).toBe(0)
    expect(s.phase).toBe('DEMONSTRATE')
  })

  it('a wrong answer still goes through the existing failure branch', () => {
    const s = advanceConversationState(observing(), { ...askedLearnedNothing, signalCorrect: false })
    expect(s.observeFailures).toBe(1)
    expect(s.consecutiveFailures).toBe(1)
  })

  it('only OBSERVE is affected — GUIDE is untouched', () => {
    const s = advanceConversationState(observing({ phase: 'GUIDE', demonstrated: true }),
      askedLearnedNothing)
    expect(s.observeFailures ?? 0).toBe(0)
  })
})

// ── the contracts this must not weaken ──────────────────────────────────────

describe('the educational contract is unchanged', () => {
  it('never attaches an authored probe in OBSERVE', () => {
    let s = initialConversationState('c')
    let observeProbes = 0
    for (let n = 1; n <= 20; n++) {
      const move = decideNextMove(s, CTX)
      if (s.phase === 'OBSERVE' && probeAttaches(s.phase, move)) observeProbes++
      s = advanceConversationState(s, {
        askedQuestion: move === 'ask', questionSanctioned: move === 'ask',
        deliveredTeaching: move !== 'ask', recoveryFired: false, signalCorrect: null,
      })
    }
    expect(observeProbes).toBe(0)
  })

  it('never jumps OBSERVE past DEMONSTRATE', () => {
    let s = initialConversationState('c')
    for (let n = 1; n <= 20; n++) {
      const before = s.phase
      const move = decideNextMove(s, CTX)
      s = advanceConversationState(s, {
        askedQuestion: move === 'ask', questionSanctioned: move === 'ask',
        deliveredTeaching: move !== 'ask', recoveryFired: false, signalCorrect: null,
      })
      if (before === 'OBSERVE') {
        expect(['OBSERVE', 'DEMONSTRATE']).toContain(s.phase)
      }
    }
  })

  it('creates no mastery without graded evidence', () => {
    let s = initialConversationState('c')
    for (let n = 1; n <= 100; n++) {
      const move = decideNextMove(s, CTX)
      s = advanceConversationState(s, {
        askedQuestion: move === 'ask', questionSanctioned: move === 'ask',
        deliveredTeaching: move !== 'ask', recoveryFired: false, signalCorrect: null,
      })
    }
    expect(s.correctAtCheck).toBe(0)
    expect(s.correctAtPractice).toBe(0)
  })

  it('leaves the perfect-learner path byte-identical', () => {
    // a learner who answers correctly whenever asked never produces an
    // unanswered engine question, so this rule can never fire for them.
    let s = initialConversationState('c')
    const trail: TeachingPhase[] = []
    for (let n = 1; n <= 12; n++) {
      const move = decideNextMove(s, CTX)
      s = advanceConversationState(s, {
        askedQuestion: move === 'ask', questionSanctioned: move === 'ask',
        deliveredTeaching: move !== 'ask', recoveryFired: false,
        signalCorrect: move === 'ask' ? true : null,
      })
      trail.push(s.phase)
    }
    expect(s.correctAtCheck).toBeGreaterThanOrEqual(1)
    expect(s.correctAtPractice).toBeGreaterThanOrEqual(2)
    expect(s.observeFailures ?? 0).toBe(0)
    // Turn 1 stays at OBSERVE: nothing has been taught, so QL-1 removes ASK
    // and the move is 'show'. The rule under test needs the engine to have
    // ASKED, so it cannot fire on turn 1 either way.
    expect(trail[0]).toBe('OBSERVE')
  })

  it('preserves the two-concluded-diagnostic escape', () => {
    const s = observing({ observeFailures: 2, demonstrated: true })
    expect(decideNextMove(s, CTX)).toBe('show')
  })

  it('is byte-identical for callers that omit questionSanctioned', () => {
    const prev = observing()
    const s = advanceConversationState(prev, {
      askedQuestion: true, signalCorrect: null, recoveryFired: false,
    })
    expect(s.observeFailures ?? 0).toBe(0)
    expect(s.phase).toBe('OBSERVE')
  })
})
