/**
 * F1 (real-student session, 2026-08-22): a learner who explicitly said
 * "I just guessed" — checkCorrect 0, practiceCorrect 0, mastery.verified
 * false, topicProgress REVISION/masteryPct 0 — was told:
 *
 *   "That's Mathematical Thinking finished — nice work. Worth another look
 *    later: Mathematical Thinking."
 *
 * A celebratory close contradicted by its own next sentence, for a concept
 * the runtime's own evidence says was never mastered.
 *
 * INVARIANT: the opener may claim success only when `summary.mastered` is
 * non-empty. When nothing was mastered and something is queued for review,
 * the opener must say so honestly instead — never "finished — nice work".
 *
 * Scope, deliberately narrow: `shouldFinalizeLesson` only fires once every
 * required concept is in `closedConceptIds` (mastered ∪ needsReview), so a
 * real completion with `mastered=[]` always carries something in
 * `needsReview`. A summary with BOTH empty is not a state the completion
 * pipeline can reach — `curriculumLocalization.test.ts` already covers that
 * fixture and is deliberately left asserting the pre-fix wording for it, so
 * this file must not duplicate or contradict those assertions.
 */
import { describe, it, expect } from 'vitest'
import { buildLessonCloseText } from '@/lib/teaching/lessonCompletion'

const concept = (conceptId: string, title: string) => ({ conceptId, title })

describe('the close never claims success when nothing was mastered', () => {
  it('the exact reproduced case: zero mastery, one concept needing review', () => {
    const text = buildLessonCloseText('Mathematical Thinking', {
      mastered: [],
      needsReview: [concept('math.found.mathematical-thinking', 'Mathematical Thinking')],
    })
    expect(text).not.toMatch(/finished — nice work/)
    expect(text).not.toMatch(/finished\b/)
    expect(text).toContain('Mathematical Thinking')
    expect(text).toContain('Worth another look later: Mathematical Thinking.')
    // Still forward-looking, still says what to do next.
    expect(text).toContain('Press "Start next lesson"')
  })

  it('the already-finished re-serve of the same state (F2\'s exact text)', () => {
    const text = buildLessonCloseText('Mathematical Thinking', {
      mastered: [],
      needsReview: [concept('math.found.mathematical-thinking', 'Mathematical Thinking')],
    }, { alreadyFinished: true })
    expect(text).not.toMatch(/You've already finished/)
    expect(text).toContain('Mathematical Thinking')
    expect(text).toMatch(/haven't mastered it yet/)
  })

  it('untitled variant (no resolvable concept title) still avoids the false claim', () => {
    const text = buildLessonCloseText(null, {
      mastered: [],
      needsReview: [concept('math.found.mathematical-thinking', 'Mathematical Thinking')],
    }, { conceptId: null })
    expect(text).not.toMatch(/finished — nice work/)
    expect(text).toMatch(/pause this lesson/)
  })
})

describe('genuine success still reads as success (unchanged behavior)', () => {
  it('full mastery, nothing needing review', () => {
    const text = buildLessonCloseText('Nature of Matter', {
      mastered: [concept('chem.found.matter', 'Nature of Matter')],
      needsReview: [],
    })
    expect(text).toContain("That's Nature of Matter finished — nice work.")
    expect(text).toContain('You mastered: Nature of Matter.')
  })

  it('the already-finished variant for a genuinely mastered lesson is untouched', () => {
    const text = buildLessonCloseText('Nature of Matter', {
      mastered: [concept('chem.found.matter', 'Nature of Matter')],
      needsReview: [],
    }, { alreadyFinished: true })
    expect(text).toContain("You've already finished Nature of Matter.")
  })

  it('partial mastery — at least one concept mastered — keeps the success opener', () => {
    // A multi-concept lesson (future-shaped, per requiredConceptsForLesson's
    // own comment) where SOME concepts were mastered and one needs review.
    // The opener should not be softened just because review items exist
    // alongside real mastery — only when mastery is entirely absent.
    const text = buildLessonCloseText('Foundations', {
      mastered: [concept('math.found.a', 'Concept A')],
      needsReview: [concept('math.found.b', 'Concept B')],
    })
    expect(text).toContain("That's Foundations finished — nice work.")
    expect(text).toContain('You mastered: Concept A.')
    expect(text).toContain('Worth another look later: Concept B.')
  })
})

describe('the pre-existing degenerate fixture (mastered=[], needsReview=[]) is left alone', () => {
  // Not a reachable production state (see file header), and already asserted
  // by curriculumLocalization.test.ts — kept here as an explicit boundary so
  // this file's own invariant is never accidentally widened to cover it.
  it('does not fire the needs-review opener when needsReview is also empty', () => {
    const text = buildLessonCloseText('Nature of Matter', { mastered: [], needsReview: [] })
    expect(text).toContain("That's Nature of Matter finished — nice work.")
  })
})

describe('localizes correctly in all three languages', () => {
  const summary = {
    mastered: [] as never[],
    needsReview: [concept('math.found.mathematical-thinking', 'Mathematical Thinking')],
  }

  it('Russian: no English template leaks through, no false-success wording', () => {
    const text = buildLessonCloseText('Mathematical Thinking', summary, { lang: 'ru' })
    expect(text).toMatch(/[Ѐ-ӿ]/)
    expect(text).not.toMatch(/nice work|finished/)
  })

  it('Hindi: no English template leaks through, no false-success wording', () => {
    const text = buildLessonCloseText('Mathematical Thinking', summary, { lang: 'hi' })
    expect(text).toMatch(/[ऀ-ॿ]/)
    expect(text).not.toMatch(/nice work|finished/)
  })

  it('Russian already-finished variant', () => {
    const text = buildLessonCloseText('Mathematical Thinking', summary, { lang: 'ru', alreadyFinished: true })
    expect(text).toMatch(/[Ѐ-ӿ]/)
    expect(text).not.toMatch(/already finished/)
  })

  it('Hindi already-finished variant', () => {
    const text = buildLessonCloseText('Mathematical Thinking', summary, { lang: 'hi', alreadyFinished: true })
    expect(text).toMatch(/[ऀ-ॿ]/)
    expect(text).not.toMatch(/already finished/)
  })
})

describe('never leaks a curriculum id even on the needs-review path', () => {
  it('resolves a real id to its title, not the raw id, in the needs-review opener', () => {
    const text = buildLessonCloseText('math.found.mathematical-thinking', {
      mastered: [],
      needsReview: [concept('math.found.mathematical-thinking', 'math.found.mathematical-thinking')],
    }, { conceptId: 'math.found.mathematical-thinking' })
    expect(text).not.toContain('math.found.mathematical-thinking')
    expect(text).toContain('Mathematical Thinking')
  })
})
