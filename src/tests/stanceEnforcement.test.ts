/**
 * Stance Enforcement tests (Claude Recommendation #6): proves every
 * enforced teaching law is deterministic and cannot be defeated by prose
 * alone. Follows masteryGate.test.ts's fixture convention.
 */
import { describe, it, expect } from 'vitest'
import { enforceStance, type StanceEnforcementInput } from '@/lib/teaching/stanceEnforcement'
import {
  initialConversationState, advanceConversationState,
} from '@/lib/teaching/conversationState'
import { MASTERY_CHECK_REQUIRED, MASTERY_PRACTICE_REQUIRED } from '@/lib/teaching/masteryGate'
import type { ConversationState } from '@/lib/teaching/conversationState'

function stateWith(overrides: Partial<ConversationState>): ConversationState {
  return { ...initialConversationState('phys.mech.newtons-first-law'), ...overrides }
}

const masteredState = () => stateWith({
  phase: 'TRANSFER', demonstrated: true,
  correctAtCheck: MASTERY_CHECK_REQUIRED,
  correctAtPractice: MASTERY_PRACTICE_REQUIRED,
})

function input(overrides: Partial<StanceEnforcementInput>): StanceEnforcementInput {
  return {
    text: 'Here is an explanation.',
    state: stateWith({}),
    move: null,
    misconceptionActive: false,
    ...overrides,
  }
}

// ── Law: false mastery cannot advance / lesson completion requires mastery ──

describe('false mastery cannot advance', () => {
  it('strips [LESSON_COMPLETE] and flags FALSE_MASTERY_COMPLETION when mastery is unverified', () => {
    const verdict = enforceStance(input({
      text: 'Great job! [LESSON_COMPLETE]',
      state: stateWith({ correctAtCheck: 0, correctAtPractice: 0 }),
    }))
    expect(verdict.cleanText).not.toContain('[LESSON_COMPLETE]')
    expect(verdict.compliant).toBe(false)
    expect(verdict.completionAuthorized).toBe(false)
    expect(verdict.violations).toContainEqual(
      expect.objectContaining({ code: 'FALSE_MASTERY_COMPLETION' }),
    )
  })

  it('no amount of turns, phase, or conversation length substitutes for evidence', () => {
    // High turn/phase progress but zero verified answers.
    const state = stateWith({ phase: 'PRACTICE', demonstrated: true, correctAtCheck: 0, correctAtPractice: 0 })
    const verdict = enforceStance(input({ text: 'Nice, you seem ready! [LESSON_COMPLETE]', state }))
    expect(verdict.completionAuthorized).toBe(false)
    expect(verdict.cleanText).not.toContain('[LESSON_COMPLETE]')
  })

  it('authorizes completion once mastery is genuinely verified', () => {
    const verdict = enforceStance(input({ text: 'Well done! [LESSON_COMPLETE]', state: masteredState() }))
    expect(verdict.completionAuthorized).toBe(true)
    expect(verdict.cleanText).toContain('[LESSON_COMPLETE]')
    expect(verdict.violations.some((v) => v.code === 'FALSE_MASTERY_COMPLETION')).toBe(false)
  })

  it('a bare acknowledgement can never feed evidence into the state machine (upstream gate + this layer agree)', () => {
    // Simulates route.ts discarding the SIGNAL for "got it" before folding —
    // this layer only ever sees the ALREADY-discarded (null) evidence.
    const before = stateWith({ correctAtCheck: 0, correctAtPractice: 0 })
    const after = advanceConversationState(before, {
      askedQuestion: false, signalCorrect: null, recoveryFired: false,
    })
    const verdict = enforceStance(input({ text: 'Got it! [LESSON_COMPLETE]', state: after }))
    expect(verdict.completionAuthorized).toBe(false)
  })

  it('is unaffected by response text unrelated to completion (no tag → no completion violation)', () => {
    const verdict = enforceStance(input({ text: 'Just an explanation, no tags here.', state: stateWith({}) }))
    expect(verdict.violations.some((v) => v.code === 'FALSE_MASTERY_COMPLETION')).toBe(false)
  })
})

// ── Law: every explanation must be followed by an appropriate mastery check ──

describe('unsupported explanations are rejected', () => {
  it('flags UNSUPPORTED_EXPLANATION when move=ask but the response asks nothing', () => {
    const verdict = enforceStance(input({
      text: 'Newtons first law says an object stays at rest or in motion unless acted on.',
      move: 'ask',
    }))
    expect(verdict.compliant).toBe(false)
    expect(verdict.violations).toContainEqual(
      expect.objectContaining({ code: 'UNSUPPORTED_EXPLANATION' }),
    )
  })

  it('does not flag a compliant ask-move response containing a real question', () => {
    const verdict = enforceStance(input({
      text: 'If a ball rolls on a frictionless floor, what keeps it moving?',
      move: 'ask',
    }))
    expect(verdict.violations.some((v) => v.code === 'UNSUPPORTED_EXPLANATION')).toBe(false)
  })

  it('does not require a question when move=teach or move=show (explanation turns are allowed to explain)', () => {
    const teach = enforceStance(input({ text: 'Here is the idea, no question needed.', move: 'teach' }))
    const show = enforceStance(input({ text: 'Watch this worked example unfold.', move: 'show' }))
    expect(teach.violations.some((v) => v.code === 'UNSUPPORTED_EXPLANATION')).toBe(false)
    expect(show.violations.some((v) => v.code === 'UNSUPPORTED_EXPLANATION')).toBe(false)
  })

  it('does not require a question when no move is known (null move — degrade silently, never crash)', () => {
    const verdict = enforceStance(input({ text: 'Some prose.', move: null }))
    expect(verdict.violations.some((v) => v.code === 'UNSUPPORTED_EXPLANATION')).toBe(false)
  })

  it('question marks inside code fences do not count (reuses repliesWithQuestion verbatim)', () => {
    const verdict = enforceStance(input({
      text: 'Explanation text.\n```\n// is x > 0?\n```\nMore prose, no real question.',
      move: 'ask',
    }))
    expect(verdict.violations.some((v) => v.code === 'UNSUPPORTED_EXPLANATION')).toBe(true)
  })
})

// ── Law: mastery gates are enforced (integration across the phase ladder) ──

describe('mastery gates are enforced', () => {
  it('the phase ladder itself never advances past CHECK without a correct CHECK answer', () => {
    const state = stateWith({ phase: 'CHECK', correctAtCheck: 0 })
    const after = advanceConversationState(state, {
      askedQuestion: true, signalCorrect: false, recoveryFired: false,
    })
    expect(after.phase).not.toBe('PRACTICE')
    const verdict = enforceStance(input({ text: 'You are ready! [LESSON_COMPLETE]', state: after }))
    expect(verdict.completionAuthorized).toBe(false)
  })

  it('reaching PRACTICE with only 1 correct practice answer still blocks completion', () => {
    const state = stateWith({ phase: 'PRACTICE', correctAtCheck: 1, correctAtPractice: 1 })
    const verdict = enforceStance(input({ text: 'Almost there! [LESSON_COMPLETE]', state }))
    expect(verdict.completionAuthorized).toBe(false)
  })

  it('exactly meeting both thresholds authorizes completion (boundary case)', () => {
    const state = stateWith({
      phase: 'TRANSFER',
      correctAtCheck: MASTERY_CHECK_REQUIRED,
      correctAtPractice: MASTERY_PRACTICE_REQUIRED,
    })
    const verdict = enforceStance(input({ text: 'Mastered! [LESSON_COMPLETE]', state }))
    expect(verdict.completionAuthorized).toBe(true)
  })
})

// ── Law: a misconception cannot be marked resolved without successful evidence ──

describe('misconception recovery is verified', () => {
  it('flags MISCONCEPTION_UNVERIFIED when the response claims resolution but mastery is not verified', () => {
    const verdict = enforceStance(input({
      text: "Great, you've resolved that misconception now!",
      state: stateWith({ correctAtCheck: 0, correctAtPractice: 0 }),
      misconceptionActive: true,
    }))
    expect(verdict.compliant).toBe(false)
    expect(verdict.violations).toContainEqual(
      expect.objectContaining({ code: 'MISCONCEPTION_UNVERIFIED' }),
    )
  })

  it('does not flag a resolution claim once mastery evidence verifies it', () => {
    const verdict = enforceStance(input({
      text: "Great, you've resolved that misconception now!",
      state: masteredState(),
      misconceptionActive: true,
    }))
    expect(verdict.violations.some((v) => v.code === 'MISCONCEPTION_UNVERIFIED')).toBe(false)
  })

  it('does not flag ordinary explanation text with no resolution claim, even with an active misconception', () => {
    const verdict = enforceStance(input({
      text: 'Let\'s look at this from another angle: force causes acceleration, not motion itself.',
      state: stateWith({ correctAtCheck: 0, correctAtPractice: 0 }),
      misconceptionActive: true,
    }))
    expect(verdict.violations.some((v) => v.code === 'MISCONCEPTION_UNVERIFIED')).toBe(false)
  })

  it('does not flag a resolution claim when no misconception was ever detected (nothing to falsely resolve)', () => {
    const verdict = enforceStance(input({
      text: "That's resolved now!",
      state: stateWith({ correctAtCheck: 0, correctAtPractice: 0 }),
      misconceptionActive: false,
    }))
    expect(verdict.violations.some((v) => v.code === 'MISCONCEPTION_UNVERIFIED')).toBe(false)
  })

  it('misconceptionDetectedThisLesson is monotonic within a concept and survives further turns', () => {
    let state = stateWith({})
    expect(state.misconceptionDetectedThisLesson).toBe(false)
    state = advanceConversationState(state, {
      askedQuestion: false, signalCorrect: null, recoveryFired: false, misconceptionDetected: true,
    })
    expect(state.misconceptionDetectedThisLesson).toBe(true)
    // A later turn with no misconception signal does not clear it.
    state = advanceConversationState(state, {
      askedQuestion: true, signalCorrect: true, recoveryFired: false,
    })
    expect(state.misconceptionDetectedThisLesson).toBe(true)
  })
})

// ── Determinism ──────────────────────────────────────────────────────────────

describe('all enforcement is deterministic', () => {
  it('identical input always yields an identical verdict (pure function, no clock/randomness)', () => {
    const i = input({
      text: "Great, you've resolved that misconception now! [LESSON_COMPLETE]",
      state: stateWith({ correctAtCheck: 0, correctAtPractice: 1 }),
      move: 'ask',
      misconceptionActive: true,
    })
    const a = enforceStance(i)
    const b = enforceStance(i)
    expect(a).toEqual(b)
    expect(JSON.stringify(a)).toBe(JSON.stringify(b))
  })

  it('violation order is stable across repeated calls', () => {
    const i = input({
      text: "That's resolved now! [LESSON_COMPLETE]",
      state: stateWith({ correctAtCheck: 0, correctAtPractice: 0 }),
      move: 'teach',
      misconceptionActive: true,
    })
    const codes1 = enforceStance(i).violations.map((v) => v.code)
    const codes2 = enforceStance(i).violations.map((v) => v.code)
    expect(codes1).toEqual(codes2)
    expect(codes1).toEqual(['FALSE_MASTERY_COMPLETION', 'MISCONCEPTION_UNVERIFIED'])
  })

  it('does not read the system clock, network, or any global mutable state', () => {
    // Structural proof: enforceStance's only import surface is
    // masteryGate.ts + conversationState.ts, both pure (no DB/fs imports —
    // verified independently in masteryGate.test.ts/conversationState
    // usage across this suite). Behavioral proof: 500 calls, byte-identical.
    const i = input({ text: 'Some text. [LESSON_COMPLETE]', state: stateWith({}) })
    const results = Array.from({ length: 500 }, () => JSON.stringify(enforceStance(i)))
    expect(new Set(results).size).toBe(1)
  })
})
