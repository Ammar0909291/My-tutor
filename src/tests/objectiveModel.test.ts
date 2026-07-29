/**
 * S2 (Runtime Redesign Mission Part 5) — Objective Model tests.
 *
 * Covers the ledger's read/reset contract, the advancement fold (attempts,
 * assessments, completion, stall detection), and the two new verifier
 * rules that consume it (V-OBJ, V-NOPROGRESS) — including the additive/
 * no-op contract when ctx.objectiveCompleted/objectiveStalled are
 * undefined, matching the existing verifier optionality convention.
 */
import { describe, it, expect } from 'vitest'
import {
  initialObjectiveState, readObjectiveState, advanceObjectiveState,
  isObjectiveLockedFromAssessment, hasStalled, NO_PROGRESS_TURN_THRESHOLD,
  type ObjectiveState,
} from '@/lib/teaching/objectiveModel'
import { initialConversationState, type ConversationState } from '@/lib/teaching/conversationState'
import { verify, type VerifierContext } from '@/lib/kernel/verifier'

function ctx(over: Partial<VerifierContext> = {}): VerifierContext {
  return {
    move: 'ASK', budgets: { maxQuestions: 1, maxParagraphs: 4, maxNewTerms: 2 },
    stageCeiling: 6, vocabularyBans: [],
    vocabularyUnlocked: true, formulaUnlocked: true,
    contentRegister: 'intermediate',
    assessmentActive: true, lessonCompletionAuthorized: false,
    reactMandated: false, affectBand: 'calm',
    bannedConceptTerms: [], learnerText: '',
    legalTags: ['VISUAL', 'HINT'],
    ...over,
  }
}

function stateWithMastery(over: Partial<ConversationState> = {}): ConversationState {
  return { ...initialConversationState('math.arith.fractions'), correctAtCheck: 1, correctAtPractice: 2, ...over }
}

describe('initialObjectiveState / readObjectiveState', () => {
  it('initial state has no completion, zero counters', () => {
    const s = initialObjectiveState('math.arith.fractions')
    expect(s.objectiveId).toBe('math.arith.fractions')
    expect(s.attemptCount).toBe(0)
    expect(s.assessmentCount).toBe(0)
    expect(s.completedAt).toBeNull()
    expect(s.turnsSinceProgress).toBe(0)
  })

  it('readObjectiveState is total: garbage in -> fresh state, never throws', () => {
    expect(readObjectiveState(undefined, 'x').objectiveId).toBe('x')
    expect(readObjectiveState(null, 'x').objectiveId).toBe('x')
    expect(readObjectiveState('garbage', 'x').objectiveId).toBe('x')
    expect(readObjectiveState({ objectiveId: 42 }, 'x').objectiveId).toBe('x')
  })

  it('resets when the objective (concept) changed — matching ConversationState contract', () => {
    const persisted = { objectiveId: 'math.arith.fractions', attemptCount: 5, assessmentCount: 2, completedAt: '2026-01-01T00:00:00Z', turnsSinceProgress: 3 }
    const same = readObjectiveState(persisted, 'math.arith.fractions')
    expect(same.attemptCount).toBe(5)
    const changed = readObjectiveState(persisted, 'math.arith.decimals')
    expect(changed.attemptCount).toBe(0)
    expect(changed.completedAt).toBeNull()
  })
})

describe('advanceObjectiveState', () => {
  it('increments attemptCount on any attempt', () => {
    const s0 = initialObjectiveState('x')
    const s1 = advanceObjectiveState(s0, {
      wasAttempt: true, wasAssessmentAttempt: false,
      stateAfterTurn: initialConversationState('x'), phaseAdvanced: false, nowIso: '2026-01-01T00:00:00Z',
    })
    expect(s1.attemptCount).toBe(1)
    expect(s1.assessmentCount).toBe(0)
  })

  it('increments assessmentCount only on wasAssessmentAttempt', () => {
    const s0 = initialObjectiveState('x')
    const s1 = advanceObjectiveState(s0, {
      wasAttempt: true, wasAssessmentAttempt: true,
      stateAfterTurn: initialConversationState('x'), phaseAdvanced: false, nowIso: '2026-01-01T00:00:00Z',
    })
    expect(s1.attemptCount).toBe(1)
    expect(s1.assessmentCount).toBe(1)
  })

  it('does not increment on a non-attempt turn (e.g. a diagnostic probe)', () => {
    const s0 = initialObjectiveState('x')
    const s1 = advanceObjectiveState(s0, {
      wasAttempt: false, wasAssessmentAttempt: false,
      stateAfterTurn: null, phaseAdvanced: false, nowIso: '2026-01-01T00:00:00Z',
    })
    expect(s1.attemptCount).toBe(0)
  })

  it('sets completedAt exactly once, when masteryVerified first becomes true', () => {
    const s0 = initialObjectiveState('x')
    const s1 = advanceObjectiveState(s0, {
      wasAttempt: true, wasAssessmentAttempt: true,
      stateAfterTurn: stateWithMastery(), phaseAdvanced: false, nowIso: '2026-06-01T00:00:00Z',
    })
    expect(s1.completedAt).toBe('2026-06-01T00:00:00Z')
    // A second turn after completion must NOT move the timestamp forward —
    // "mastery, once verified, is stable" (masteryGate.ts's own invariant).
    const s2 = advanceObjectiveState(s1, {
      wasAttempt: true, wasAssessmentAttempt: true,
      stateAfterTurn: stateWithMastery(), phaseAdvanced: false, nowIso: '2026-06-02T00:00:00Z',
    })
    expect(s2.completedAt).toBe('2026-06-01T00:00:00Z')
  })

  it('does not set completedAt when masteryVerified is false', () => {
    const s0 = initialObjectiveState('x')
    const s1 = advanceObjectiveState(s0, {
      wasAttempt: true, wasAssessmentAttempt: true,
      stateAfterTurn: initialConversationState('x'), phaseAdvanced: false, nowIso: '2026-01-01T00:00:00Z',
    })
    expect(s1.completedAt).toBeNull()
  })

  it('turnsSinceProgress resets on phase advancement', () => {
    const s0: ObjectiveState = { ...initialObjectiveState('x'), turnsSinceProgress: 5 }
    const s1 = advanceObjectiveState(s0, {
      wasAttempt: false, wasAssessmentAttempt: false,
      stateAfterTurn: null, phaseAdvanced: true, nowIso: '2026-01-01T00:00:00Z',
    })
    expect(s1.turnsSinceProgress).toBe(0)
  })

  it('turnsSinceProgress resets when new correct evidence appears on an attempt', () => {
    const s0: ObjectiveState = { ...initialObjectiveState('x'), turnsSinceProgress: 5 }
    const s1 = advanceObjectiveState(s0, {
      wasAttempt: true, wasAssessmentAttempt: true,
      stateAfterTurn: { ...initialConversationState('x'), correctAtCheck: 1 }, phaseAdvanced: false, nowIso: '2026-01-01T00:00:00Z',
    })
    expect(s1.turnsSinceProgress).toBe(0)
  })

  it('turnsSinceProgress increments when nothing advanced', () => {
    const s0: ObjectiveState = { ...initialObjectiveState('x'), turnsSinceProgress: 3 }
    const s1 = advanceObjectiveState(s0, {
      wasAttempt: false, wasAssessmentAttempt: false,
      stateAfterTurn: initialConversationState('x'), phaseAdvanced: false, nowIso: '2026-01-01T00:00:00Z',
    })
    expect(s1.turnsSinceProgress).toBe(4)
  })

  it('completing the objective always resets turnsSinceProgress, even with no phase change', () => {
    const s0: ObjectiveState = { ...initialObjectiveState('x'), turnsSinceProgress: 7 }
    const s1 = advanceObjectiveState(s0, {
      wasAttempt: true, wasAssessmentAttempt: true,
      stateAfterTurn: stateWithMastery(), phaseAdvanced: false, nowIso: '2026-01-01T00:00:00Z',
    })
    expect(s1.turnsSinceProgress).toBe(0)
  })
})

describe('isObjectiveLockedFromAssessment (I-3)', () => {
  it('false before completion', () => {
    expect(isObjectiveLockedFromAssessment(initialObjectiveState('x'))).toBe(false)
  })
  it('true once completedAt is set', () => {
    const s: ObjectiveState = { ...initialObjectiveState('x'), completedAt: '2026-01-01T00:00:00Z' }
    expect(isObjectiveLockedFromAssessment(s)).toBe(true)
  })
})

describe('hasStalled (I-10)', () => {
  it('false below threshold', () => {
    const s: ObjectiveState = { ...initialObjectiveState('x'), turnsSinceProgress: NO_PROGRESS_TURN_THRESHOLD - 1 }
    expect(hasStalled(s)).toBe(false)
  })
  it('true at or above threshold', () => {
    const s: ObjectiveState = { ...initialObjectiveState('x'), turnsSinceProgress: NO_PROGRESS_TURN_THRESHOLD }
    expect(hasStalled(s)).toBe(true)
  })
})

describe('verifier integration — V-OBJ / V-NOPROGRESS additive/no-op contract', () => {
  it('neither rule fires when ctx.objectiveCompleted/objectiveStalled are undefined', () => {
    const decision = verify('What is the numerator here?', ctx())
    expect(decision.violations.some((v) => v.code === 'V-OBJ' || v.code === 'V-NOPROGRESS')).toBe(false)
  })

  it('V-OBJ fires at LOG severity when an ASK move targets a completed objective', () => {
    const decision = verify('What is the numerator here?', ctx({ move: 'ASK', objectiveCompleted: true }))
    expect(decision.verdict).toBe('PASS')
    const v = decision.violations.find((x) => x.code === 'V-OBJ')
    expect(v).toBeDefined()
    expect(v?.severity).toBe('LOG')
  })

  it('V-OBJ does not fire for a non-question ASK-move draft (nothing to re-assess)', () => {
    const decision = verify('Take your time and think it over.', ctx({ move: 'ASK', objectiveCompleted: true }))
    expect(decision.violations.some((v) => v.code === 'V-OBJ')).toBe(false)
  })

  it('V-OBJ does not fire for a TEACH move even if objectiveCompleted (only ASK is assessment-shaped)', () => {
    const decision = verify('Here is a quick recap of fractions?', ctx({ move: 'TEACH', objectiveCompleted: true }))
    expect(decision.violations.some((v) => v.code === 'V-OBJ')).toBe(false)
  })

  it('V-NOPROGRESS fires at LOG severity when objectiveStalled is true', () => {
    const decision = verify('Some ordinary teaching text.', ctx({ move: 'TEACH', objectiveStalled: true }))
    expect(decision.verdict).toBe('PASS')
    const v = decision.violations.find((x) => x.code === 'V-NOPROGRESS')
    expect(v).toBeDefined()
    expect(v?.severity).toBe('LOG')
  })

  it('V-NOPROGRESS never rejects, regardless of any other rule state', () => {
    const decision = verify('x'.repeat(10), ctx({ move: 'TEACH', objectiveStalled: true }))
    expect(decision.verdict).not.toBe('REJECT')
  })
})
