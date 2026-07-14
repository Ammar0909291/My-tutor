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
  ])('%s → null', (msg) => {
    expect(detectFailureState(msg)).toBeNull()
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
