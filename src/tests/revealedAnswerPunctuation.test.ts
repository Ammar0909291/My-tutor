/**
 * "…THE NORMAL FORCE DOUBLES.. LET ME CHECK YOUR THINKING WITH THIS."
 *
 * ── MEASURED LIVE ───────────────────────────────────────────────────────────
 * phys.mech.friction, 2026-09-01, disposable account, deployed app, driving a
 * CONFIDENTLY WRONG learner — the third struggle shape, and the one that
 * finally exercised the reveal path. Verbatim, at T9:
 *
 *   "Not quite — the answer was: It doubles because the normal force
 *    doubles.. Let me check your thinking with this."
 *
 * `withheldContinuation` built the sentence as
 *   `Not quite — the answer was: ${key}. ${tail}`
 * appending a full stop unconditionally, and the authored option text already
 * ended in one.
 *
 * ── WHY THIS IS THE SAME CLASS THE CODE ALREADY GUARDED ─────────────────────
 * One line above, the template already refuses a key that is itself a
 * question, so the caller's stripped '?' cannot come back in through the
 * answer key. Terminal punctuation is the identical concern and was missed.
 * Authored option texts are hand-written across six subjects, so whether one
 * ends in a stop is not something this template can assume in either
 * direction — which is why the fix normalises rather than trims the corpus.
 *
 * Small, deterministic, and server-side: it is the tutor's own assembled
 * sentence, not model output, so it is repaired at the source rather than
 * patched after the fact.
 */
import { describe, it, expect } from 'vitest'
import { withholdUngradedGateQuestion } from '@/lib/teaching/gateAssessment'

type Args = Parameters<typeof withholdUngradedGateQuestion>[0]
const reveal = (correctOptionText: string): string => {
  const out = withholdUngradedGateQuestion({
    text: 'Some teaching here. What do you think the answer is?',
    phase: 'CHECK',
    hasGradeableProbe: false,
    justGraded: { correct: false, correctOptionText },
  } as Args)
  return typeof out === 'string' ? out : (out as { text: string }).text
}

describe('A. the verbatim production string', () => {
  it('a key ending in a full stop no longer doubles it', () => {
    const t = reveal('It doubles because the normal force doubles.')
    expect(t).toContain('the answer was: It doubles because the normal force doubles.')
    expect(t).not.toContain('doubles..')
  })

  it('and the answer is still actually revealed', () => {
    // The point of the reveal is that the learner learns the answer; a
    // punctuation fix must not quietly drop it.
    expect(reveal('It doubles because the normal force doubles.'))
      .toContain('It doubles because the normal force doubles')
  })
})

describe('B. exactly one terminal stop, whatever the corpus supplies', () => {
  // Asserts the KEY AS RENDERED, then that exactly one stop follows it. A
  // first draft asserted `the answer was: <tail>`, which is wrong — the
  // template carries the whole key, not its tail — and the tests caught it.
  for (const [key, rendered] of [
    ['About 15 N', 'About 15 N.'],
    ['About 15 N.', 'About 15 N.'],
    ['Because it accelerates!', 'Because it accelerates!'],
    ['The force grows…', 'The force grows…'],
  ] as const) {
    it(`${JSON.stringify(key)} renders as ${JSON.stringify(rendered)}`, () => {
      const t = reveal(key)
      expect(t).toContain(`the answer was: ${rendered} `)
      expect(/\.\./.test(t)).toBe(false)
    })
  }
})

describe('C. the sibling guard that was already there still holds', () => {
  it('a key that is itself a question is not revealed at all', () => {
    // Pre-existing behaviour: the caller stripped a trailing '?', and it must
    // not return through the answer key.
    const t = reveal('What happens to the friction force?')
    expect(t).toContain('Not quite.')
    expect(t).not.toContain('What happens to the friction force')
  })

  it('an empty key falls back to the bare form', () => {
    expect(reveal('   ')).toContain('Not quite.')
  })
})
