/**
 * ISS-08 (masterplan P0) — autonomy negation + anchoring guard, with fixtures.
 *
 * WHY THE ASYMMETRY MATTERS. A false positive appends [LESSON_COMPLETE] and
 * advances a learner past a concept they just said they were not done with —
 * the hollow advancement the mastery gate exists to prevent. A false negative
 * costs one repeated request. The fixtures below are weighted accordingly:
 * every ambiguous form is asserted to NOT advance.
 */
import { describe, it, expect } from 'vitest'
import { detectAutonomyRequest } from '@/lib/teaching/conversationState'

/** Genuine requests to advance — these MUST still be honored. Regressing any
 *  of these would make the platform ignore an explicit learner instruction,
 *  which is its own failure (P3 learner autonomy). */
const ADVANCE = [
  'move on',
  "let's move on",
  'can we move on',
  'ready to move on',
  'next topic please',
  'next lesson',
  'skip this',
  "let's continue",
  'ok I get it, move on',
  'MOVE ON',
  "move on, I'm not confused",     // negator AFTER the phrase — still advance
]

/** Requests to STAY, or mentions of the phrase. None may advance. */
const STAY = [
  "I don't want to move on",
  "I don't want to move on yet",
  'not ready to move on',
  "I'm not ready to move on",
  'can we not move on yet',
  'no, next topic is too fast',
  'wait before we move on',
  'stop, I need to move on later',
  "don't skip this",
  'never skip this part',
  'hold on — can we move on after one more example?',
  'I would rather not move on',
  'until I understand this, no next topic',
  'unless you explain it again, skip this is a bad idea',
]

/** Mentions rather than instructions. */
const MENTIONS = [
  'what does "move on" mean here?',
  "the book says to 'move on' after each section",
  'what do you mean by move on',
]

describe('ISS-08 — genuine advance requests still work', () => {
  it.each(ADVANCE)('advances on %j', (msg) => {
    expect(detectAutonomyRequest(msg)).toBe(true)
  })
})

describe('ISS-08 — negated forms never advance', () => {
  it.each(STAY)('does NOT advance on %j', (msg) => {
    expect(detectAutonomyRequest(msg)).toBe(false)
  })
})

describe('ISS-08 — mentions are not instructions', () => {
  it.each(MENTIONS)('does NOT advance on %j', (msg) => {
    expect(detectAutonomyRequest(msg)).toBe(false)
  })
})

describe('ISS-08 — unrelated messages are untouched', () => {
  it.each([
    'what is Henry\'s law?',
    'the ball moves faster on a slope',
    '',
    'ok',
  ])('does not fire on %j', (msg) => {
    expect(detectAutonomyRequest(msg)).toBe(false)
  })

  it('is deterministic and total', () => {
    for (const m of [...ADVANCE, ...STAY, ...MENTIONS]) {
      expect(detectAutonomyRequest(m)).toBe(detectAutonomyRequest(m))
    }
  })
})
