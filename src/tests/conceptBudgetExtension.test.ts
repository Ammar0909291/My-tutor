/**
 * PROGRESS-AWARE BUDGET EXTENSION (owner-approved 2026-08-16).
 *
 * A learner who reaches the 12-turn concept budget while demonstrably
 * converting gets ONE +6 extension (hard cap 18). Measured motivation:
 * `turnsOnConcept` counts every non-degraded turn, and the ladder needs five
 * server-graded correct answers, so a weak learner who ASKS for each question
 * spent ~11 of 12 turns on the assessment sequence alone.
 * `chem.found.states-of-matter` closed as needsReview with mastered [] on the
 * very turn the learner advanced GUIDE -> CHECK.
 *
 * The extension buys TURNS, never certification: mastery is still
 * `correctAtPractice >= 2 || phase TRANSFER`, from server-graded evidence only.
 */
import { describe, it, expect } from 'vitest'
import {
  evaluateConceptBudget, qualifiesForBudgetExtension, effectiveTurnBudget,
  CONCEPT_TURN_BUDGET, BUDGET_EXTENSION_TURNS,
} from '@/lib/teaching/conceptBudget'
import {
  advanceConversationState, initialConversationState, readConversationState,
  type ConversationState, type TurnEvidence,
} from '@/lib/teaching/conversationState'

const CONCEPT = 'phys.meas.vector-products'

/** A learner sitting exactly at the base budget, converting: one graded-correct
 *  answer banked at an assessed rung, not currently failing, past diagnostics. */
function progressing(over: Partial<ConversationState> = {}): ConversationState {
  return {
    ...initialConversationState(CONCEPT),
    turnsOnConcept: CONCEPT_TURN_BUDGET,
    phase: 'PRACTICE',
    correctAtCheck: 1,
    correctAtPractice: 0,
    consecutiveFailures: 0,
    ...over,
  }
}

const CORRECT: TurnEvidence = { askedQuestion: false, signalCorrect: true, recoveryFired: false }
const WRONG: TurnEvidence = { askedQuestion: false, signalCorrect: false, recoveryFired: false }

describe('eligibility — exactly the three approved conditions', () => {
  it('1. a progressing learner qualifies at the base budget', () => {
    expect(qualifiesForBudgetExtension(progressing())).toBe(true)
  })

  it('2. zero graded-correct answers → no extension', () => {
    expect(qualifiesForBudgetExtension(
      progressing({ correctAtCheck: 0, correctAtPractice: 0 }),
    )).toBe(false)
  })

  it('3. consecutiveFailures > 0 → no extension', () => {
    expect(qualifiesForBudgetExtension(progressing({ consecutiveFailures: 1 }))).toBe(false)
  })

  it('4. a phase below CHECK → no extension', () => {
    for (const phase of ['OBSERVE', 'DEMONSTRATE', 'GUIDE'] as const) {
      expect(qualifiesForBudgetExtension(progressing({ phase }))).toBe(false)
    }
  })

  it('does not fire before the base budget is actually reached', () => {
    expect(qualifiesForBudgetExtension(
      progressing({ turnsOnConcept: CONCEPT_TURN_BUDGET - 1 }),
    )).toBe(false)
  })

  it('does not fire for a learner who has already mastered the concept', () => {
    // Nothing to extend; the flag would be spurious on a concept closing by mastery.
    expect(qualifiesForBudgetExtension(progressing({ correctAtPractice: 2 }))).toBe(false)
  })
})

describe('5. the extension is granted at most once', () => {
  it('a state already carrying the flag never re-qualifies', () => {
    expect(qualifiesForBudgetExtension(
      progressing({ budgetExtensionGranted: true, turnsOnConcept: 18 }),
    )).toBe(false)
  })

  it('the fold grants it once and the budget then stops re-granting', () => {
    let s = progressing({ turnsOnConcept: CONCEPT_TURN_BUDGET - 1 })
    s = advanceConversationState(s, CORRECT)          // reaches the base budget
    expect(s.budgetExtensionGranted).toBe(true)
    expect(effectiveTurnBudget(s)).toBe(CONCEPT_TURN_BUDGET + BUDGET_EXTENSION_TURNS)

    // Many more turns: still exactly one grant, cap unchanged.
    for (let i = 0; i < 8; i++) s = advanceConversationState(s, CORRECT)
    expect(effectiveTurnBudget(s)).toBe(18)
  })

  it('is not granted on the turn the learner fails', () => {
    // consecutiveFailures is set inside the failure branch; the grant is
    // evaluated at every exit, so it must observe the post-fold value.
    const s = advanceConversationState(
      progressing({ turnsOnConcept: CONCEPT_TURN_BUDGET - 1 }), WRONG,
    )
    expect(s.budgetExtensionGranted).toBe(false)
  })
})

describe('6/7/8 — what the extended budget does and does not change', () => {
  it('6. an extended learner without mastery closes at 18, marked for review', () => {
    const extended = progressing({ budgetExtensionGranted: true, turnsOnConcept: 17 })
    expect(evaluateConceptBudget(extended).status).not.toBe('exhausted')

    const spent = { ...extended, turnsOnConcept: 18 }
    const budget = evaluateConceptBudget(spent)
    expect(budget.status).toBe('exhausted')
    expect(budget.reason).toBe('turns')
    expect(budget.markForReview).toBe(true)
  })

  it('7. mastery before the cap closes normally, with no exhaustion', () => {
    const mastered = progressing({
      budgetExtensionGranted: true, turnsOnConcept: 15, correctAtPractice: 2,
    })
    const budget = evaluateConceptBudget(mastered)
    expect(budget.status).toBe('ok')
    expect(budget.reason).toBeNull()
    expect(budget.markForReview).toBe(false)
  })

  it('8. an UNextended learner still exhausts at 12 and is marked for review', () => {
    const budget = evaluateConceptBudget(progressing({ correctAtCheck: 0 }))
    expect(budget.status).toBe('exhausted')
    expect(budget.reason).toBe('turns')
    expect(budget.markForReview).toBe(true)
  })

  it('the extension never certifies mastery on its own', () => {
    const extended = progressing({ budgetExtensionGranted: true, turnsOnConcept: 13 })
    // Turns bought, evidence unchanged: still not mastered.
    expect(evaluateConceptBudget(extended).markForReview).toBe(false)
    expect(extended.correctAtPractice).toBeLessThan(2)
    expect(extended.phase).not.toBe('TRANSFER')
  })
})

describe('9. the flag survives serialization and restoration', () => {
  it('round-trips through JSON via readConversationState', () => {
    const granted = progressing({ budgetExtensionGranted: true })
    const restored = readConversationState(JSON.parse(JSON.stringify(granted)), CONCEPT)
    expect(restored.budgetExtensionGranted).toBe(true)
    expect(effectiveTurnBudget(restored)).toBe(18)
  })

  it('a pre-existing snapshot without the field defaults to false — no migration', () => {
    const legacy = { ...progressing() } as Record<string, unknown>
    delete legacy.budgetExtensionGranted
    const restored = readConversationState(legacy, CONCEPT)
    expect(restored.budgetExtensionGranted).toBe(false)
    expect(effectiveTurnBudget(restored)).toBe(CONCEPT_TURN_BUDGET)
  })

  it('a different concept resets it, like every other per-concept counter', () => {
    const restored = readConversationState(progressing({ budgetExtensionGranted: true }), 'other.concept')
    expect(restored.budgetExtensionGranted).toBe(false)
  })
})
