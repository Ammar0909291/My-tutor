import { describe, it, expect } from 'vitest'
import { masteryVerified, masteryVerifiedStrict, gateLessonCompletion } from '@/lib/teaching/masteryGate'
import { initialConversationState, advanceConversationState } from '@/lib/teaching/conversationState'
import type { ConversationState } from '@/lib/teaching/conversationState'

function stateWith(overrides: Partial<ConversationState>): ConversationState {
  return { ...initialConversationState('test-concept'), ...overrides }
}

describe('masteryVerifiedStrict', () => {
  it('passes when verified counters meet thresholds', () => {
    const state = stateWith({
      correctAtCheck: 1,
      correctAtPractice: 2,
      verifiedCorrectAtCheck: 1,
      verifiedCorrectAtPractice: 2,
    })
    expect(masteryVerifiedStrict(state)).toBe(true)
  })

  it('fails when regular counters pass but verified counters do not (contradiction present)', () => {
    const state = stateWith({
      correctAtCheck: 1,
      correctAtPractice: 2,
      verifiedCorrectAtCheck: 0,
      verifiedCorrectAtPractice: 1,
      signalContradictions: 1,
    })
    expect(masteryVerified(state)).toBe(true)
    expect(masteryVerifiedStrict(state)).toBe(false)
  })

  it('falls back to regular mastery when no verified evidence AND no contradictions', () => {
    const state = stateWith({
      correctAtCheck: 1,
      correctAtPractice: 2,
      verifiedCorrectAtCheck: 0,
      verifiedCorrectAtPractice: 0,
      signalContradictions: 0,
    })
    expect(masteryVerifiedStrict(state)).toBe(true)
  })

  it('falls back to regular counters when verified fields are absent', () => {
    const state = stateWith({
      correctAtCheck: 1,
      correctAtPractice: 2,
    })
    delete (state as Record<string, unknown>).verifiedCorrectAtCheck
    delete (state as Record<string, unknown>).verifiedCorrectAtPractice
    expect(masteryVerifiedStrict(state)).toBe(true)
  })

  it('returns false for null state', () => {
    expect(masteryVerifiedStrict(null)).toBe(false)
  })
})

describe('gateLessonCompletion uses strict mastery', () => {
  it('strips [LESSON_COMPLETE] when regular mastery passes but strict fails (contradiction present)', () => {
    const state = stateWith({
      correctAtCheck: 1,
      correctAtPractice: 2,
      verifiedCorrectAtCheck: 0,
      verifiedCorrectAtPractice: 0,
      signalContradictions: 1,
    })
    const result = gateLessonCompletion(
      'Great job! [LESSON_COMPLETE]',
      state,
    )
    expect(result.authorized).toBe(false)
    expect(result.suppressed).toBe(true)
    expect(result.cleanText).not.toContain('LESSON_COMPLETE')
  })

  it('authorizes when strict mastery passes', () => {
    const state = stateWith({
      correctAtCheck: 1,
      correctAtPractice: 2,
      verifiedCorrectAtCheck: 1,
      verifiedCorrectAtPractice: 2,
    })
    const result = gateLessonCompletion(
      'Well done! [LESSON_COMPLETE]',
      state,
    )
    expect(result.authorized).toBe(true)
    expect(result.suppressed).toBe(false)
  })
})

describe('advanceConversationState folds verification status', () => {
  it('increments verified counters on a SERVER-GRADED correct answer at CHECK', () => {
    // Thread 1: a verified credit requires positive server-grade provenance.
    // A real authored-probe grade carries serverGraded:true AND status CLEAN.
    const state = stateWith({ phase: 'CHECK', demonstrated: true, taughtThisSession: true })
    const next = advanceConversationState(state, {
      askedQuestion: false,
      signalCorrect: true,
      recoveryFired: false,
      signalVerificationStatus: 'CLEAN',
      serverGraded: true,
    })
    expect(next.correctAtCheck).toBe(1)
    expect(next.verifiedCorrectAtCheck).toBe(1)
  })

  it('does NOT increment verified counters on SUSPICIOUS signal at CHECK', () => {
    const state = stateWith({ phase: 'CHECK', demonstrated: true, taughtThisSession: true })
    const next = advanceConversationState(state, {
      askedQuestion: false,
      signalCorrect: true,
      recoveryFired: false,
      signalVerificationStatus: 'SUSPICIOUS',
    })
    expect(next.correctAtCheck).toBe(1)
    expect(next.verifiedCorrectAtCheck).toBe(0)
  })

  it('does NOT increment verified counters on CONTRADICTED signal at PRACTICE', () => {
    const state = stateWith({
      phase: 'PRACTICE', demonstrated: true, taughtThisSession: true,
      correctAtCheck: 1,
    })
    const next = advanceConversationState(state, {
      askedQuestion: false,
      signalCorrect: true,
      recoveryFired: false,
      signalVerificationStatus: 'CONTRADICTED',
    })
    expect(next.correctAtPractice).toBe(1)
    expect(next.verifiedCorrectAtPractice).toBe(0)
  })

  it('a correct answer with NO server grade banks the plain credit but NO verified credit', () => {
    // Thread 1 (the free-response defect, closed): an ungraded prose answer the
    // model self-reports correct — clean status, no serverGraded — still moves
    // the plain ladder (so the lesson does not stall) but must NOT bank a
    // verified credit, because nothing graded it against an authored key. This
    // case used to assert verifiedCorrectAtCheck === 1 (undefined status → CLEAN
    // → verified), which was exactly the mechanism that let a self-report certify.
    const state = stateWith({ phase: 'CHECK', demonstrated: true, taughtThisSession: true })
    const next = advanceConversationState(state, {
      askedQuestion: false,
      signalCorrect: true,
      recoveryFired: false,
    })
    expect(next.correctAtCheck).toBe(1)
    expect(next.verifiedCorrectAtCheck).toBe(0)
  })

  it('folds signal contradiction counter', () => {
    const state = stateWith({ phase: 'OBSERVE', signalContradictions: 2 })
    const next = advanceConversationState(state, {
      askedQuestion: false,
      signalCorrect: true,
      recoveryFired: false,
      signalVerificationStatus: 'CONTRADICTED',
    })
    expect(next.signalContradictions).toBe(3)
  })

  it('folds parity violation counter', () => {
    const state = stateWith({ phase: 'GUIDE', parityViolations: 1 })
    const next = advanceConversationState(state, {
      askedQuestion: false,
      signalCorrect: null,
      recoveryFired: false,
      parityViolation: true,
    })
    expect(next.parityViolations).toBe(2)
  })

  it('does not increment parity violations on compliant turn', () => {
    const state = stateWith({ phase: 'GUIDE', parityViolations: 1 })
    const next = advanceConversationState(state, {
      askedQuestion: true,
      signalCorrect: null,
      recoveryFired: false,
      parityViolation: false,
    })
    expect(next.parityViolations).toBe(1)
  })
})
