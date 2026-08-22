/**
 * Subject Prelude CTA label — "Start Learning {Subject}" replaces the old
 * "Begin Lesson 1" / "Start Lesson 1" wording.
 *
 * Scope: this is a PRESENTATION-ONLY change. The button's onClick still calls
 * `completePrelude()`, which only ever POSTs `{ subjectCode }` and marks
 * `preludeViewedAt` — it never selects, writes, or reads a lesson/topic. The
 * actual starting lesson is chosen entirely by `computeCurriculumEntryOrder`
 * (src/lib/curriculum/placement.ts, covered by curriculumPlacement.test.ts —
 * reused here rather than duplicated) long before this screen ever renders.
 * These tests assert the label text and the fact that the wiring beneath it
 * is untouched, using the same source-text idiom the rest of the
 * LessonScreen/prelude suites already use (no jsdom/RTL renderer in this repo).
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { translations, t } from '@/lib/i18n'

const SUBJECT_NAMES = ['Physics', 'Mathematics', 'English'] as const

describe('prelude_continue_btn — dynamic "Start Learning {Subject}" label', () => {
  it('English: interpolating each subject name produces the exact required label', () => {
    for (const subject of SUBJECT_NAMES) {
      const label = t('en', 'prelude_continue_btn').replace('{subject}', subject)
      expect(label).toBe(`Start Learning ${subject}`)
    }
  })

  it('carries a {subject} placeholder in every language, not a hardcoded subject', () => {
    for (const lang of ['en', 'ru', 'hi'] as const) {
      expect(translations[lang].prelude_continue_btn).toContain('{subject}')
    }
  })

  it('the old "Begin Lesson 1" / "Start Lesson 1" wording is no longer present', () => {
    expect(translations.en.prelude_continue_btn).not.toContain('Lesson 1')
    expect(translations.en.prelude_continue_btn).not.toBe('Begin Lesson 1')
    expect(translations.en.prelude_continue_btn).not.toBe('Start Lesson 1')
  })

  it('the old Russian/Hindi "lesson 1" wording is no longer present', () => {
    expect(translations.ru.prelude_continue_btn).not.toContain('урок 1')
    expect(translations.hi.prelude_continue_btn).not.toContain('पाठ 1')
  })

  it('replay keeps its own distinct, unaffected label ("Back to learning")', () => {
    // The replay path (prelude_done_btn) is a different button entirely and
    // was never in scope for this change.
    expect(translations.en.prelude_done_btn).toBe('Back to learning')
  })
})

describe('the CTA reads subjectName the same way the rest of the screen already does', () => {
  const SRC = readFileSync(join(process.cwd(), 'src/components/learn/LessonScreen.tsx'), 'utf8')

  it('interpolates the same `subjectName` prop already passed to SubjectPreludeScreen', () => {
    // subjectName is a plain top-level prop of LessonScreen (see the Props
    // type), already passed to SubjectPreludeScreen for the header pill before
    // this change — proving it is safely available here and is not derived
    // from level/placement logic.
    expect(SRC).toContain("subjectName={subjectName}")
    expect(SRC).toContain(
      "continueLabel={preludeReplay ? t('prelude_done_btn') : t('prelude_continue_btn').replace('{subject}', subjectName)}",
    )
  })

  it('the label is never used as a routing key — onContinue is a plain, argument-free callback', () => {
    const start = SRC.indexOf('<SubjectPreludeScreen')
    const end = SRC.indexOf('/>', start)
    const block = SRC.slice(start, end)
    expect(block).toContain('onContinue={() => { void completePrelude() }}')
  })
})

describe('button action + placement are unaffected by the label change', () => {
  const SRC = readFileSync(join(process.cwd(), 'src/components/learn/LessonScreen.tsx'), 'utf8')

  it('completePrelude never selects, writes, or reads a lesson/topic — for any placement level', () => {
    // This function has no knowledge of skill level at all, so its behavior
    // is identical for Beginner, Intermediate and Advanced placements — the
    // starting lesson those levels selected (via computeCurriculumEntryOrder,
    // see curriculumPlacement.test.ts) is untouched by pressing this button.
    const start = SRC.indexOf('const completePrelude = useCallback')
    expect(start).toBeGreaterThan(-1)
    const body = SRC.slice(start, start + 1400)
    expect(body).toContain("JSON.stringify({ subjectCode: subjectSlug })")
    for (const forbidden of [
      'lessonOrder', 'topicSlug', 'activeLessonSlug', 'currentLesson:',
      'level:', 'skillLevel', 'placement',
    ]) {
      expect(body, `completePrelude must not reference ${forbidden}`).not.toContain(forbidden)
    }
  })

  it('the prelude still renders strictly before the Start Lesson entry gate, for every subject', () => {
    // Unchanged wiring: same gate condition as before this change, guarding
    // against the label edit having accidentally reordered the two screens.
    expect(SRC).toContain('preludeVisible && subjectPrelude')
    expect(SRC).toContain('!lessonStarted && messages.length === 0 && entryGateReady && !preludeVisible')
  })
})
