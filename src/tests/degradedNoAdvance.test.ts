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
