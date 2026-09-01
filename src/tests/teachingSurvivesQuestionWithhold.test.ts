/**
 * THE TEACHING WENT OUT WITH THE QUESTION.
 *
 * ── THE DEFECT, MEASURED ON REAL TURNS ──────────────────────────────────────
 * `dropAnswerableContent` filtered at PARAGRAPH granularity: any paragraph
 * containing an answerable question was discarded whole. Models routinely put
 * the explanation and its question in ONE paragraph, so the explanation went
 * with it. This is the "PARAGRAPH-scoped withhold" limitation carried as an
 * open item since Phase 3.
 *
 * Four turns captured from live runs this session (physics, deployed app).
 * THREE lost every word of their teaching:
 *
 *   187ch -> 0    "The figure on your screen shows a block... which arrow is
 *                  the friction force?"
 *   119ch -> 0    "A concave mirror bulges away from you, so parallel rays
 *                  converge at the focus. What is the focal length...?"
 *   210ch -> 0    "When you push the book gently... Which force acts first?"
 *
 * Only the fourth, which put its question in a separate paragraph, survived —
 * which is exactly why the defect was invisible: the machinery works
 * perfectly on the shape the tests used.
 *
 * ── THE REPAIR ──────────────────────────────────────────────────────────────
 * Trim TRAILING question sentences instead of dropping the whole unit — the
 * same shape already applied to the walk-back earlier in this session.
 *
 * TRAILING ONLY. A question in the MIDDLE cannot be removed without risking
 * prose that no longer reads ("Consider this: what happens? The answer
 * is..."), so if anything answerable survives the trim, the paragraph is
 * discarded exactly as before. The change is conservative by construction: it
 * can only ever keep MORE teaching than the previous behaviour, never less.
 */
import { describe, it, expect } from 'vitest'
import { dropAnswerableContent } from '@/lib/teaching/gateAssessment'

const LIVE = {
  figure: 'The figure on your screen shows a block on a horizontal surface. A downward arrow '
    + 'labeled mg represents the block’s weight. Now, looking at the diagram, which arrow is the '
    + 'friction force?',
  mirror: 'A concave mirror bulges away from you, so parallel rays converge at the focus. '
    + 'What is the focal length of that mirror?',
  book: 'When you push the book gently, the bumps press together. Static friction grows just '
    + 'enough to balance your push, so the book stays still. If you push harder, kinetic friction '
    + 'takes over. Which force acts first?',
}

describe('A. the three live turns that lost everything', () => {
  it('keeps the figure description, drops only the question', () => {
    const out = dropAnswerableContent(LIVE.figure)
    expect(out).toContain('downward arrow labeled mg')
    expect(out).not.toContain('which arrow is the friction force')
  })

  it('STILL LOSES a SINGLE teaching sentence — the known, priced cost', () => {
    // One surviving sentence is indistinguishable, without a classifier, from
    // a content-free announcement ("Let me ask you something."). A first
    // version kept any remainder and the suite caught the regression: those
    // announcements survived as the ENTIRE turn, with no question and nothing
    // taught. Two-or-more is the discriminator that needs no vocabulary.
    //
    // So this real teaching sentence is still dropped, and the turn falls back
    // to the hand-off. Recorded as the honest price of not regressing the
    // lead-in case — 1 of the 3 measured live turns unfixed, not 0 of 3.
    expect(dropAnswerableContent(LIVE.mirror).trim()).toBe('')
  })

  it('and a content-free lead-in is still removed, which is why', () => {
    for (const t of [
      'Let me ask you something. What is the focal length of that mirror?',
      "Here's a quick check for you. Which force acts first?",
      'Some teaching here. What do you think the answer is?',
    ]) {
      expect(dropAnswerableContent(t).trim(), t).toBe('')
    }
  })

  it('keeps all three teaching sentences, drops only the question', () => {
    const out = dropAnswerableContent(LIVE.book)
    expect(out).toContain('bumps press together')
    expect(out).toContain('kinetic friction takes over')
    expect(out).not.toContain('Which force acts first')
  })
})

describe('B. the shape that already worked is unchanged', () => {
  it('a question in its own paragraph still drops, teaching still kept', () => {
    const out = dropAnswerableContent(
      'Friction resists sliding between two surfaces.\n\nWhich force acts first?',
    )
    expect(out).toBe('Friction resists sliding between two surfaces.')
  })

  it('a turn that is ONLY a question still yields nothing', () => {
    expect(dropAnswerableContent('Which force acts first?').trim()).toBe('')
  })

  it('a turn with no question is untouched', () => {
    const t = 'Friction resists sliding between two surfaces. It depends on the normal force.'
    expect(dropAnswerableContent(t)).toBe(t)
  })

  it('option lines still scope the cut, as before', () => {
    const out = dropAnswerableContent(
      'Static friction adjusts to the push.\n\nWhat is the maximum?\nA) 20 N\nB) 40 N',
    )
    expect(out).toContain('Static friction adjusts to the push.')
    expect(out).not.toContain('40 N')
  })
})

describe('C. the conservative fallback — a mid-paragraph question', () => {
  it('drops the paragraph when a question is not merely trailing', () => {
    // Trimming trailing sentences would leave the question stranded, so the
    // original all-or-nothing behaviour is kept for this shape.
    const out = dropAnswerableContent(
      'Which force acts first? The answer tells you which coefficient applies.',
    )
    expect(out.trim()).toBe('')
  })

  it('never returns text that still contains an answerable question', () => {
    // The invariant the whole function exists for.
    for (const t of [LIVE.figure, LIVE.mirror, LIVE.book,
      'Which force acts first? The answer tells you which coefficient applies.',
      'Teaching here. What is X? More teaching. What is Y?']) {
      const out = dropAnswerableContent(t)
      if (out.trim().length > 0) expect(out).not.toMatch(/\?/)
    }
  })
})
