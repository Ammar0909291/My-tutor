/**
 * The prompt must state ONE lesson number, and it must be the right one.
 *
 * Reproduced live 2026-08-23, in TWO languages on the same lesson — the
 * learner opened Integers, which is lesson 78 of 908:
 *
 *   en   "**Lesson 1: Integers** Today we'll learn what integers are..."
 *   ru   "**Урок 1: Целые числа** Сегодня мы узнаем, что такое целые числа..."
 *
 * "1" is not a hallucination. It is a value the prompt itself supplied. The
 * system prompt carried TWO "Lesson N of M" strings:
 *
 *   CURRENT LESSON        Lesson 78 of 908: "Integers"          (correct)
 *   LESSON CLOSING FORMAT You've completed Lesson 1 of 908      (a COUNT)
 *
 * The second is `completedLessons.length + 1` — how many lessons the learner
 * has FINISHED — written in lesson-number phrasing. For any learner whose
 * completion count differs from their lesson's position, which is the ordinary
 * case, the prompt contradicts itself and the model can copy either.
 *
 * That same string has already caused one separate production defect: it is
 * the source of the "You've completed Lesson 3 of 238" false-completion claim
 * that stanceEnforcement's FALSE_MASTERY_COMPLETION rule exists to strip. This
 * removes the ambiguity at the source rather than at the output surface.
 *
 * The fix is a rephrasing, so this test asserts the PROPERTY, not the wording:
 * every "Lesson N of M" claim the prompt makes must name the current lesson.
 */
import { describe, it, expect } from 'vitest'
import { buildTutorSystemPrompt, type LessonContext } from '@/lib/ai/client'

const ctx = (over: Partial<LessonContext> = {}): LessonContext => ({
  currentLesson: 78,
  totalLessons: 908,
  lessonTitle: 'Integers',
  lessonGoal: 'work with positive and negative whole numbers',
  unitTitle: 'Mathematical Foundations',
  completedLessons: [],
  ...over,
})

/** Every number the prompt presents in "Lesson N of M" / «Урок N из M» form. */
function lessonNumberClaims(prompt: string): number[] {
  const out: number[] = []
  for (const m of prompt.matchAll(/(?:lesson|урок)\s*(\d{1,4})\s*(?:of|из)\s*(\d{1,4})/giu)) out.push(Number(m[1]))
  return out
}

describe('the prompt states one lesson number, and it is the right one', () => {
  for (const lang of ['en', 'ru', 'hi'] as const) {
    it(`${lang}: no "Lesson N of M" claim names anything but the current lesson`, () => {
      const prompt = buildTutorSystemPrompt('Mathematics', 'S', 'beginner', 'learn', null, lang, ctx())
      const claims = lessonNumberClaims(prompt)
      expect(claims.length).toBeGreaterThan(0)
      for (const n of claims) expect(n).toBe(78)
    })

    it(`${lang}: still holds when the completion count is non-zero and differs`, () => {
      // The dangerous shape is completions !== position. Here the learner has
      // finished 4 lessons while sitting on lesson 78, so a progress line
      // written as a lesson number would read "Lesson 5".
      const prompt = buildTutorSystemPrompt(
        'Mathematics', 'S', 'beginner', 'learn', null, lang, ctx({ completedLessons: [1, 2, 3, 4] }),
      )
      for (const n of lessonNumberClaims(prompt)) expect(n).toBe(78)
      expect(prompt).not.toMatch(/(?:lesson|урок)\s*5\s*(?:of|из)\s*908/iu)
    })
  }

  it('the progress line still reports the completion COUNT — it was rephrased, not removed', () => {
    const prompt = buildTutorSystemPrompt(
      'Mathematics', 'S', 'beginner', 'learn', null, 'en', ctx({ completedLessons: [1, 2, 3, 4] }),
    )
    expect(prompt).toContain('5 of 908 lessons')
  })
})
