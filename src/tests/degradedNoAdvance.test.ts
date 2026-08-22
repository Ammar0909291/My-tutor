import { describe, it, expect } from 'vitest'
import {
  advanceConversationState,
  initialConversationState,
  type ConversationState,
  type TurnEvidence,
} from '@/lib/teaching/conversationState'

/**
 * P4 — a failed AI generation must never advance the lesson stage.
 * A degraded turn is an outage template: content-free by construction, so the
 * learner received no teaching and must not be moved through the lesson.
 */

function evidence(over: Partial<TurnEvidence> = {}): TurnEvidence {
  return { askedQuestion: false, signalCorrect: null, recoveryFired: false, ...over }
}

function stateAt(phase: ConversationState['phase'], over: Partial<ConversationState> = {}): ConversationState {
  return { ...initialConversationState('c1'), phase, ...over }
}

describe('degraded turns never advance the lesson stage', () => {
  it('does not fire the DEMONSTRATE->GUIDE reachability rule', () => {
    // The dangerous case: `demonstrated` is already true from an earlier real
    // turn, so the rule would otherwise advance on a turn that taught nothing.
    const prev = stateAt('DEMONSTRATE', { demonstrated: true })
    const next = advanceConversationState(prev, evidence({ degradedTurn: true }))
    expect(next.phase).toBe('DEMONSTRATE')
  })

  it('still advances that rule on a real (non-degraded) turn', () => {
    const prev = stateAt('DEMONSTRATE', { demonstrated: true })
    const next = advanceConversationState(prev, evidence({ degradedTurn: false }))
    expect(next.phase).toBe('GUIDE')
  })

  it('holds the stage from every phase', () => {
    for (const phase of ['OBSERVE', 'DEMONSTRATE', 'GUIDE', 'CHECK', 'PRACTICE', 'TRANSFER'] as const) {
      const prev = stateAt(phase, { demonstrated: true, correctAtCheck: 1, correctAtPractice: 2 })
      const next = advanceConversationState(prev, evidence({ degradedTurn: true, signalCorrect: true }))
      expect(next.phase).toBe(phase)
    }
  })

  it('does not accrue time-in-phase for a turn that taught nothing', () => {
    const prev = stateAt('GUIDE', { turnsInCurrentPhase: 3 })
    const next = advanceConversationState(prev, evidence({ degradedTurn: true }))
    expect(next.turnsInCurrentPhase).toBe(3)
  })

  it('still refuses to claim the explanation happened', () => {
    const prev = stateAt('DEMONSTRATE')
    const next = advanceConversationState(prev, evidence({ degradedTurn: true }))
    expect(next.demonstrated).toBe(false)
    expect(next.taughtThisSession).toBe(false)
  })

  it('still folds learner-describing evidence — their message was real', () => {
    const prev = stateAt('GUIDE')
    const next = advanceConversationState(prev, evidence({ degradedTurn: true, misconceptionDetected: true }))
    expect(next.misconceptionDetectedThisLesson).toBe(true)
  })
})

// ── F7 — provider failure is not demonstrated mastery ───────────────────────
// Pinning the phase was not enough: the mastery counters are incremented in
// the success branch, which the degraded guard did not reach. Measured before
// the fix, at phase CHECK: phase pinned, but correctAtCheck 1 and
// verifiedCorrectAtCheck 1. The bar is correctAtCheck >= 1 plus
// correctAtPractice >= 2, so an outage could be spent as two thirds of a
// learner's practice requirement.
describe('F7 — a degraded turn banks no mastery evidence', () => {
  it('does not credit a CHECK even when the turn carries a correct signal', () => {
    const prev = stateAt('CHECK', { demonstrated: true })
    const next = advanceConversationState(prev, evidence({ signalCorrect: true, degradedTurn: true }))
    expect(next.phase).toBe('CHECK')
    expect(next.correctAtCheck).toBe(0)
    expect(next.verifiedCorrectAtCheck ?? 0).toBe(0)
  })

  it('does not credit a PRACTICE even when the turn carries a correct signal', () => {
    const prev = stateAt('PRACTICE', { demonstrated: true, correctAtCheck: 1 })
    const next = advanceConversationState(prev, evidence({ signalCorrect: true, degradedTurn: true }))
    expect(next.phase).toBe('PRACTICE')
    expect(next.correctAtPractice).toBe(0)
    expect(next.verifiedCorrectAtPractice ?? 0).toBe(0)
  })

  it('an outage cannot spend a learner toward the mastery bar', () => {
    // Two degraded turns in a row at PRACTICE would otherwise satisfy
    // correctAtPractice >= 2 outright.
    let s = stateAt('PRACTICE', { demonstrated: true, correctAtCheck: 1 })
    s = advanceConversationState(s, evidence({ signalCorrect: true, degradedTurn: true }))
    s = advanceConversationState(s, evidence({ signalCorrect: true, degradedTurn: true }))
    expect(s.correctAtPractice).toBe(0)
    expect(s.phase).toBe('PRACTICE')
  })

  it('mastery already earned by REAL turns is preserved, not erased', () => {
    // The guard pins to the previous value; it must not zero genuine progress.
    const prev = stateAt('PRACTICE', { demonstrated: true, correctAtCheck: 1, correctAtPractice: 1 })
    const next = advanceConversationState(prev, evidence({ signalCorrect: true, degradedTurn: true }))
    expect(next.correctAtCheck).toBe(1)
    expect(next.correctAtPractice).toBe(1)
  })

  it('a NON-degraded correct answer still credits mastery exactly as before', () => {
    const prev = stateAt('CHECK', { demonstrated: true })
    const next = advanceConversationState(prev, evidence({ signalCorrect: true }))
    expect(next.correctAtCheck).toBe(1)
    expect(next.phase).toBe('PRACTICE')
  })
})
