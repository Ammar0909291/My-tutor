/**
 * THE SYSTEM REFUSED THE COMPLETION AND TOLD THE LEARNER IT HAD GRANTED IT.
 *
 * ── THE MEASURED FAILURE ────────────────────────────────────────────────────
 * Corpus audit, Topic 2 (`phys.meas.dimensions`), real production, real learner
 * account, on the learner's FIRST correct answer of the lesson.
 *
 * The engine's own state for that very turn:
 *
 *   mastery: { verified: false, phase: 'OBSERVE', checkCorrect: 0,
 *              practiceCorrect: 0, checkRequired: 1, practiceRequired: 2,
 *              completionSuppressed: true, gatePending: true }
 *   completedLessons: []
 *
 * What the tutor said:
 *
 *   "🎉 Excellent work! …
 *    ✓ What you mastered — …
 *    ✓ Common mistakes — …
 *    ✓ Progress — You've completed Lesson 3 of 238. Next up is
 *      'Measurement Errors and Uncertainty'.
 *    ✓ What's coming — …"
 *
 * `gateLessonCompletion` worked perfectly. It stripped `[LESSON_COMPLETE]`, so
 * nothing was recorded and `completedLessons` stayed empty. But it is a TAG
 * gate, and the learner reads PROSE. The record and the claim disagreed, and
 * the learner was handed the false half — told they had finished a lesson they
 * had answered one question of, and named a next lesson they had not reached.
 *
 * This is hollow advancement, which the product's entire stance is defined
 * against, and it is the same lesson V-AFFIRM learned the hard way: enforcement
 * has to sit on the surface the learner actually receives.
 *
 * ── WHAT IS NOT MOCKED ──────────────────────────────────────────────────────
 * The real `enforceStance`, the real `gateLessonCompletion`, and real
 * `ConversationState` values. The production text is reproduced verbatim.
 */
import { describe, it, expect } from 'vitest'
import {
  enforceStance,
  claimsCompletionInProse,
  stripCompletionClaims,
} from '@/lib/teaching/stanceEnforcement'
import { initialConversationState } from '@/lib/teaching/conversationState'
import type { ConversationState } from '@/lib/teaching/conversationState'

/** The exact turn the learner received, reproduced verbatim. */
const PRODUCTION_TURN = [
  '🎉 Excellent work! You correctly grasped that every additive term and both sides of a physically meaningful equation must share the exact same dimensions.',
  '',
  '✓ What you mastered — you can now distinguish between a geometric dimension and a physical dimension, write derived dimensions like speed (`[LT⁻¹]`) and area (`[L²]`), and apply the principle of homogeneity to check if the dimensions on both sides of an equation match.',
  '✓ Common mistakes — treating dimensions like ordinary numbers (like writing `[2L]` instead of `[L²]` when multiplying lengths, or confusing specific units like metres with fundamental dimensions like length).',
  '✓ Progress — You\'ve completed Lesson 3 of 238. Next up is "Measurement Errors and Uncertainty".',
  '✓ What\'s coming — understanding how to handle measurement errors and uncertainty builds directly on your new grasp of dimensions and units, unlocking reliable measurement in every experiment you run.',
].join('\n')

/** The state that was actually in force: nothing practised, nothing verified. */
function unearnedState(): ConversationState {
  return { ...initialConversationState('phys.meas.dimensions'), phase: 'OBSERVE', correctAtCheck: 0, correctAtPractice: 0 }
}

/** A learner who genuinely met the bar: one check + two practice items. */
function earnedState(): ConversationState {
  return { ...initialConversationState('phys.meas.dimensions'), phase: 'TRANSFER', demonstrated: true, correctAtCheck: 1, correctAtPractice: 2 }
}

const run = (text: string, state: ConversationState) =>
  enforceStance({ text, state, move: null, misconceptionActive: false })

describe('the production turn', () => {
  it('is flagged as a false completion', () => {
    const v = run(PRODUCTION_TURN, unearnedState())
    expect(v.completionAuthorized).toBe(false)
    expect(v.violations.map((x) => x.code)).toContain('FALSE_MASTERY_COMPLETION')
  })

  it('no longer tells the learner they completed the lesson', () => {
    const { cleanText } = run(PRODUCTION_TURN, unearnedState())
    expect(cleanText).not.toMatch(/completed Lesson/i)
    expect(cleanText).not.toMatch(/Next up is/i)
  })

  it('keeps the praise and the recap — only the bookkeeping goes', () => {
    // The D3 precedent, applied again: keep the praise, drop the bookkeeping.
    // Deleting a correct explanation to remove one false clause would be a
    // second harm on top of the first.
    const { cleanText } = run(PRODUCTION_TURN, unearnedState())
    expect(cleanText).toContain('Excellent work')
    expect(cleanText).toContain('What you mastered')
    expect(cleanText).toContain('Common mistakes')
    expect(cleanText).toContain("What's coming")
  })

  it('leaves no orphaned bullet label behind', () => {
    const { cleanText } = run(PRODUCTION_TURN, unearnedState())
    expect(cleanText).not.toMatch(/✓ Progress\s*—\s*$/m)
  })
})

describe('a genuinely completed lesson still says so', () => {
  it('does not strip the claim when the learner earned it', () => {
    // The rule must not make it impossible to ever finish a lesson. This is
    // the assertion that stops the fix from becoming a new defect.
    const { cleanText, violations } = run(PRODUCTION_TURN, earnedState())
    expect(cleanText).toContain('completed Lesson 3')
    expect(violations.map((v) => v.code)).not.toContain('FALSE_MASTERY_COMPLETION')
  })
})

describe('praise is not a completion claim', () => {
  const state = unearnedState()
  for (const praise of [
    'Excellent work! You have got that exactly right.',
    'Well done — that is a really clear way of putting it.',
    "Spot on. You've figured out the tricky part there.",
    'Nice, you finished that calculation correctly.',
    'Great — you have mastered the trick of cancelling the time units.',
  ]) {
    it(`survives untouched: "${praise.slice(0, 34)}…"`, () => {
      const { cleanText, violations } = run(praise, state)
      expect(cleanText).toBe(praise)
      expect(violations.map((v) => v.code)).not.toContain('FALSE_MASTERY_COMPLETION')
    })
  }
})

describe('the claim forms that DO fire', () => {
  const state = unearnedState()
  for (const claim of [
    "You've completed this lesson — great job.",
    'You have finished the lesson on dimensional analysis.',
    'Lesson 3 is complete.',
    'This lesson is now complete.',
    'Next up is "Measurement Errors and Uncertainty".',
    'Time to move on to the next lesson.',
    'Your next lesson is Measurement Errors.',
  ]) {
    it(`is caught: "${claim.slice(0, 40)}…"`, () => {
      expect(claimsCompletionInProse(claim)).toBe(true)
      expect(run(claim, state).violations.map((v) => v.code))
        .toContain('FALSE_MASTERY_COMPLETION')
    })
  }
})

describe('it fires without a tag, which is the whole point', () => {
  it('the measured failure emitted no [LESSON_COMPLETE] at all', () => {
    // A rule that only fired alongside the tag would have missed this
    // entirely — the tag gate saw nothing to strip.
    expect(PRODUCTION_TURN).not.toMatch(/\[LESSON_COMPLETE\]/i)
    expect(run(PRODUCTION_TURN, unearnedState()).violations.length).toBeGreaterThan(0)
  })
})

describe('stripping never hands back an empty or broken turn', () => {
  it('keeps the original when the claim IS the whole message', () => {
    // Nothing honest is left to say, so the text stands and the violation is
    // what carries the signal — visible, rather than silently blanked.
    const only = 'You have completed this lesson.'
    const { cleanText, violations } = run(only, unearnedState())
    expect(cleanText.length).toBeGreaterThan(0)
    expect(violations.map((v) => v.code)).toContain('FALSE_MASTERY_COMPLETION')
  })

  it('is idempotent', () => {
    const once = stripCompletionClaims(PRODUCTION_TURN)
    expect(stripCompletionClaims(once)).toBe(once)
  })

  it('does not throw on empty or whitespace input', () => {
    expect(stripCompletionClaims('')).toBe('')
    expect(stripCompletionClaims('   \n\n  ')).toBe('')
  })

  it('leaves an ordinary teaching turn byte-identical', () => {
    const teaching =
      'Speed is not just distance. If a car travels 60 miles in one hour, you need both the miles and the hours. ' +
      'So the dimension of speed is length divided by time. What do you think the dimension of area is?'
    expect(stripCompletionClaims(teaching)).toBe(teaching)
    expect(claimsCompletionInProse(teaching)).toBe(false)
  })
})
