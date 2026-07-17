/**
 * CTO iteration — deterministic recovery triggering (decision-engine/03 §0
 * preemption + foundations/01 §3 scripts as retrieved content).
 */
import { describe, it, expect } from 'vitest'
import { detectFailureState, buildRecoveryBlock } from '@/lib/teaching/recoveryGuard'

describe('detectFailureState — strong utterances fire anywhere', () => {
  it.each([
    ['I give up', 'give_up'],
    ['ok fine I just give up on this whole thing honestly', 'give_up'],
    ["I'm so stupid, everyone else gets this", 'stupid'],
    ["i am scared of getting it wrong again", 'scared'],
    ['I hate maths and I always have', 'hate_subject'],
    ["this is just too hard for me", 'too_hard'],
    ["I can't do this", 'cant'],
  ])('%s → %s', (msg, key) => {
    expect(detectFailureState(msg)).toBe(key)
  })
})

describe('detectFailureState — mild utterances only when the message IS the utterance', () => {
  it('short "I don\'t know" fires', () => {
    expect(detectFailureState("I don't know")).toBe('dont_know')
    expect(detectFailureState("i dont know...")).toBe('dont_know')
  })
  it('long messages merely containing the phrase do NOT fire', () => {
    expect(detectFailureState(
      "I don't know if chapter 3 covers this but could you explain how photosynthesis relates to the carbon cycle in more detail please",
    )).toBeNull()
  })
  it("short \"I'm confused\" fires; incidental use in a long question does not", () => {
    expect(detectFailureState("I'm confused")).toBe('confused')
    expect(detectFailureState(
      "I'm confused about why the author of this very long historical passage decided to introduce the treaty before the war ended, can we go through the timeline",
    )).toBeNull()
  })
  it('honest guessing disclosure fires (Principle 8 reward path)', () => {
    expect(detectFailureState('that was a guess')).toBe('guessing')
  })
})

describe('detectFailureState — benign messages never fire', () => {
  it.each([
    "I can't wait to learn fractions!",
    'What is 3/4 of 80?',
    'yes',
    'The answer is 12',
    'Can we do harder ones?',
    // Substantive questions carry content and must not match the terse
    // one-word echo pattern.
    'Why does it fall down faster?',
    'What is the formula for kinetic energy?',
    'Where does the electron go after that?',
  ])('%s → null', (msg) => {
    expect(detectFailureState(msg)).toBeNull()
  })
})

// P1 (Student Confusion Detection & Teaching Strategy Adaptation):
// closes the detection gap the bug transcript surfaced — phrases the
// learner actually used that the pre-existing patterns missed entirely.
describe('detectFailureState — P1 coverage extension', () => {
  it.each([
    ['I know nothing', 'dont_know'],
    ["Don't know", 'dont_know'],
    ['dont know', 'dont_know'],
    ['dunno', 'dont_know'],
    ['Where?', 'dont_understand'],
    ['What?', 'dont_understand'],
    ['Why?', 'dont_understand'],
    ['This doesn\'t make sense', 'confused'],
    ["that doesn't make sense", 'confused'],
    ["I don't get it", 'dont_understand'],
    ["I still don't get it", 'dont_understand'],
  ] as const)('%s → %s', (msg, key) => {
    expect(detectFailureState(msg)).toBe(key)
  })

  it.each([
    'Why do you keep asking me questions?',
    'why are you asking me so many questions',
    'stop asking me questions',
    'quit asking so many questions',
    'too many questions',
    'why do you keep quizzing me',
  ])('too_many_questions: %s', (msg) => {
    expect(detectFailureState(msg)).toBe('too_many_questions')
  })

  it('a terse echo must be the WHOLE message, not part of a real question', () => {
    expect(detectFailureState('Where?')).toBe('dont_understand')
    expect(detectFailureState('Where does the river start?')).toBeNull()
    expect(detectFailureState('What am I supposed to do with this number?')).toBeNull()
  })

  it('a bare "don\'t know" (no subject pronoun) fires as its own short reply', () => {
    expect(detectFailureState("don't know")).toBe('dont_know')
    expect(detectFailureState('dunno')).toBe('dont_know')
  })
  it('the new bare-echo pattern does not fire on a longer message that merely starts with "don\'t know"', () => {
    // The existing "I don't know" MILD pattern (unchanged by this fix) still
    // fires within its 120-char window regardless of trailing content — this
    // asserts only that the NEW bare-echo pattern is whole-message-anchored
    // and contributes no additional false positives beyond that pre-existing
    // behavior. A message long enough to exceed MILD_MAX_LENGTH never fires.
    const over120Chars = "I don't know if that is really the right way to think about it, could you maybe walk through the whole derivation from the start please"
    expect(over120Chars.length).toBeGreaterThan(120)
    expect(detectFailureState(over120Chars)).toBeNull()
  })
})

describe('buildRecoveryBlock — too_many_questions (P1)', () => {
  it('stops questioning and switches to direct demonstration, general script', () => {
    const block = buildRecoveryBlock('too_many_questions', false)
    expect(block).toMatch(/STOP asking questions/i)
    expect(block).toMatch(/no question attached/i)
    expect(block).toMatch(/never asked to infer|not already been taught/i)
  })
  it('lesson-one variant bans questions for this turn and the next', () => {
    const block = buildRecoveryBlock('too_many_questions', true)
    expect(block).toMatch(/this turn and the next/i)
  })
  it('still preempts and bans answering with a question, like every other script', () => {
    const block = buildRecoveryBlock('too_many_questions', false)
    expect(block).toMatch(/PREEMPTS EVERYTHING/)
    expect(block).toMatch(/never answer it with a question/i)
  })
})

describe('buildRecoveryBlock — authored scripts, preemption, deltas', () => {
  it('preempts everything and bans questions-as-answers', () => {
    const block = buildRecoveryBlock('give_up', false)
    expect(block).toMatch(/PREEMPTS EVERYTHING/)
    expect(block).toMatch(/never answer it with a question/i)
    expect(block).toMatch(/No new content this turn/i)
  })
  it('general give-up: tutor takes over, no pep talk, no hand-back', () => {
    const block = buildRecoveryBlock('give_up', false)
    expect(block).toMatch(/NO pep talk/i)
    expect(block).toMatch(/Do not hand it back this turn/i)
  })
  it('lesson-one give-up ends the session on a win (first-lesson/05)', () => {
    expect(buildRecoveryBlock('give_up', true)).toMatch(/Teaching is over for this session/i)
  })
  it("lesson-one don't-know shrinks to echo, not two-choice", () => {
    expect(buildRecoveryBlock('dont_know', true)).toMatch(/ECHO/)
    expect(buildRecoveryBlock('dont_know', false)).toMatch(/two-choice/)
  })
  it('"I\'m stupid" answers with evidence, never bare reassurance', () => {
    const block = buildRecoveryBlock('stupid', false)
    expect(block).toMatch(/WITH EVIDENCE/i)
    expect(block).toMatch(/Reassurance .* is an opinion/i)
  })
  it('matched-energy guard on every script (mockery effect)', () => {
    expect(buildRecoveryBlock('confused', false)).toMatch(/reads as mockery/i)
  })
})
