/**
 * LEAVING A FINISHED LESSON SAID ITS MASTERY WAS UNFINISHED.
 *
 * 2026-10-02 learner baseline (real account, chemistry): States of Matter was
 * mastered and recorded (completedLessons includes 2). "Next →" opened
 * "Leave current lesson?", which correctly hid the incomplete-work warning
 * but still listed "unfinished mastery remains recorded". That line is only
 * true of a lesson being left unfinished.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'

const SCREEN = readFileSync('src/components/learn/LessonScreen.tsx', 'utf8')
const dialog = SCREEN.slice(SCREEN.indexOf('const isCompletedNow ='), SCREEN.indexOf('lesson_dialog_prereq_intro'))

describe('leave dialog copy follows the lesson being left', () => {
  it('the "unfinished mastery" line is shown only when the lesson is not complete', () => {
    const at = dialog.indexOf("t('lesson_dialog_mastery_saved')")
    expect(at).toBeGreaterThan(-1)
    expect(dialog.slice(Math.max(0, at - 160), at)).toMatch(/isCompletedNow \? \[\] :|!isCompletedNow/)
  })

  it('the other reassurances stay for every leave', () => {
    expect(dialog).toContain("t('lesson_dialog_progress_saved')")
    expect(dialog).toContain("t('lesson_dialog_can_resume')")
  })
})
