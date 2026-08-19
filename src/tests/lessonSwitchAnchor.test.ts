import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import path from 'path'
import {
  findNextLesson, findPreviousLesson, resolveActiveLesson,
  type CurriculumLesson, type CurriculumProgress,
} from '@/lib/curriculum/lessonNavigation'

/**
 * TAPPING "NEXT" TWICE MUST REACH TWO DIFFERENT LESSONS.
 *
 * `findNextLesson` / `findPreviousLesson` resolve their anchor from
 * `resolveActiveLesson`, i.e. from `progress.activeLessonSlug`. So the anchor
 * only moves if something writes that field when the learner switches lesson.
 *
 * `callLessonInit` SENDS `topicSlug` so the server records the selection — its
 * own comment says so — but nothing wrote the fact back into local state. The
 * consequence is a simulation below, not a guess: with the client's slug still
 * naming the lesson just left, "Next" keeps resolving to the same target, so a
 * second tap re-opens the lesson the learner is already on.
 *
 * It self-corrected only on the next /api/learn/chat turn, whose opportunistic
 * `data.lessonOrder` sync sets the resolved order and clears the slug. But
 * lesson-init renders an opening WITHOUT a chat turn — so the stale window is
 * exactly the window in which the navigation buttons are used.
 */

const LESSONS: CurriculumLesson[] = [
  { id: 'l1', subjectCode: 'chemistry', unit: 1, unitTitle: 'U', lesson: 1, order: 1, lessonTitle: 'Nature of Matter', lessonGoal: 'g', topicSlug: 'chem.found.matter' },
  { id: 'l2', subjectCode: 'chemistry', unit: 1, unitTitle: 'U', lesson: 2, order: 2, lessonTitle: 'States of Matter', lessonGoal: 'g', topicSlug: 'chem.found.states-of-matter' },
  { id: 'l3', subjectCode: 'chemistry', unit: 1, unitTitle: 'U', lesson: 3, order: 3, lessonTitle: 'Pure Substances and Mixtures', lessonGoal: 'g', topicSlug: 'chem.found.pure-substances' },
  { id: 'l4', subjectCode: 'chemistry', unit: 1, unitTitle: 'U', lesson: 4, order: 4, lessonTitle: 'Physical Quantities and SI Units', lessonGoal: 'g', topicSlug: 'chem.found.si-units' },
  { id: 'l5', subjectCode: 'chemistry', unit: 1, unitTitle: 'U', lesson: 5, order: 5, lessonTitle: 'Measurement Uncertainty', lessonGoal: 'g', topicSlug: 'chem.found.uncertainty' },
]

/** The production shape: counter behind, slug naming the open lesson. */
const START: CurriculumProgress = {
  currentLesson: 1,
  completedLessons: [],
  activeLessonSlug: 'chem.found.pure-substances',
}

/** What LessonScreen now does when a lesson-init succeeds. */
function afterSwitch(prev: CurriculumProgress, target: CurriculumLesson): CurriculumProgress {
  return prev.activeLessonSlug === (target.topicSlug ?? null)
    ? prev
    : { ...prev, activeLessonSlug: target.topicSlug ?? null, lastLessonTitle: target.lessonTitle }
}

/** The behaviour before this fix: the server was told, the client was not. */
function afterSwitchWithoutSync(prev: CurriculumProgress, _t: CurriculumLesson): CurriculumProgress {
  return prev
}

describe('the navigation anchor moves with the learner', () => {
  it('two taps of NEXT reach two different lessons', () => {
    let p = START
    const first = findNextLesson(LESSONS, p)
    expect(first?.order).toBe(4)
    p = afterSwitch(p, first!)
    const second = findNextLesson(LESSONS, p)
    expect(second?.order).toBe(5)
    expect(second?.order).not.toBe(first?.order)
  })

  it('WITHOUT the sync, the second tap re-opens the same lesson', () => {
    // The defect, stated as a passing test so the fix above is not decorative.
    let p = START
    const first = findNextLesson(LESSONS, p)
    p = afterSwitchWithoutSync(p, first!)
    const second = findNextLesson(LESSONS, p)
    expect(second?.order).toBe(first?.order)
  })

  it('two taps of PREVIOUS walk backwards, not in place', () => {
    let p = START
    const first = findPreviousLesson(LESSONS, p)
    expect(first?.order).toBe(2)
    p = afterSwitch(p, first!)
    const second = findPreviousLesson(LESSONS, p)
    expect(second?.order).toBe(1)
  })

  it('NEXT then PREVIOUS returns to where the learner started', () => {
    let p = START
    expect(resolveActiveLesson(LESSONS, p)?.order).toBe(3)
    const fwd = findNextLesson(LESSONS, p)!
    p = afterSwitch(p, fwd)
    expect(resolveActiveLesson(LESSONS, p)?.order).toBe(4)
    const back = findPreviousLesson(LESSONS, p)!
    p = afterSwitch(p, back)
    expect(resolveActiveLesson(LESSONS, p)?.order).toBe(3)
  })

  it('a legacy lesson with no topicSlug clears the slug rather than storing undefined', () => {
    const legacy = { ...LESSONS[3], topicSlug: undefined } as CurriculumLesson
    const p = afterSwitch(START, legacy)
    expect(p.activeLessonSlug).toBeNull()
    // and the anchor falls back to the counter, exactly as before this work
    expect(findNextLesson(LESSONS, p)?.order).toBe(2)
  })
})

describe('LessonScreen actually performs that sync', () => {
  const SRC = readFileSync(path.join(process.cwd(), 'src/components/learn/LessonScreen.tsx'), 'utf8')

  it('callLessonInit writes the target slug into local progress', () => {
    expect(SRC).toMatch(/activeLessonSlug: lesson\.topicSlug \?\? null/)
  })

  it('and bumps the progress generation, as an authoritative user action', () => {
    // Same contract skip/complete/restart use: an in-flight chat response must
    // not clobber the pointer afterwards with its pre-switch value.
    const idx = SRC.indexOf('activeLessonSlug: lesson.topicSlug ?? null')
    expect(idx).toBeGreaterThan(-1)
    const before = SRC.slice(Math.max(0, idx - 700), idx)
    expect(before).toContain('progressGenerationRef.current += 1')
  })
})

/**
 * ── SKIPPING FORWARD THROUGH PREVIEWS ───────────────────────────────────────
 *
 * REPORTED by a learner after the anchor fix landed: "if select next then it
 * shows me next lesson and I can not skip this lesson if I want to move next.
 * So I will enter into the current lesson then only can go to next lesson."
 *
 * The preview/welcome screen is where the nav buttons live between a switch and
 * the learner pressing "Start Lesson". `activeLessonSlug` is written only WHEN a
 * lesson is started (callLessonInit), so while a preview is up the anchor still
 * names the last-started lesson, and Next re-resolves to the same preview target
 * — a dead end. The lesson ON SCREEN during a preview is `pendingLesson`, and
 * LessonScreen now overlays its slug onto the nav anchor.
 */
describe('a learner can page forward through lesson previews without starting one', () => {
  // Started on lesson 3; activeLessonSlug names it.
  const STARTED_ON_3: CurriculumProgress = {
    currentLesson: 1, completedLessons: [], activeLessonSlug: 'chem.found.pure-substances',
  }

  // What LessonScreen computes for the nav buttons: overlay the previewed
  // lesson's slug when a preview is up, else the plain progress.
  function navAnchor(progress: CurriculumProgress, pending: CurriculumLesson | null): CurriculumProgress {
    return pending?.topicSlug ? { ...progress, activeLessonSlug: pending.topicSlug } : progress
  }

  it('WITHOUT the overlay, Next on a preview re-opens the same lesson', () => {
    // The reported dead end, as a passing test.
    const previewing4 = LESSONS.find((l) => l.order === 4)!
    // Bug: nav anchored on plain progress ignores the preview.
    expect(findNextLesson(LESSONS, STARTED_ON_3)?.order).toBe(3 + 1) // 4 — the preview itself
  })

  it('WITH the overlay, Next on a preview skips to the lesson after it', () => {
    const previewing4 = LESSONS.find((l) => l.order === 4)!
    expect(findNextLesson(LESSONS, navAnchor(STARTED_ON_3, previewing4))?.order).toBe(5)
    // Paging again advances again — 4 was never started, only previewed. At the
    // last lesson (5 of 5 in this fixture) Next is correctly null.
    const previewing5 = LESSONS.find((l) => l.order === 5)!
    expect(findNextLesson(LESSONS, navAnchor(STARTED_ON_3, previewing5))).toBeNull()
  })

  it('Previous on a preview steps back from the previewed lesson', () => {
    // Previewing 4 with nothing completed, Previous is the immediate prior by
    // order — lesson 3 — which is the lesson the learner actually came from.
    const previewing4 = LESSONS.find((l) => l.order === 4)!
    expect(findPreviousLesson(LESSONS, navAnchor(STARTED_ON_3, previewing4))?.order).toBe(3)
  })

  it('with no preview up, the anchor is exactly the plain progress', () => {
    expect(navAnchor(STARTED_ON_3, null)).toBe(STARTED_ON_3)
    expect(findNextLesson(LESSONS, navAnchor(STARTED_ON_3, null))?.order).toBe(4)
  })

  it('a previewed legacy lesson without a slug does not corrupt the anchor', () => {
    const legacy = { ...LESSONS.find((l) => l.order === 4)!, topicSlug: undefined } as CurriculumLesson
    expect(navAnchor(STARTED_ON_3, legacy)).toBe(STARTED_ON_3)
  })
})

describe('LessonScreen applies the preview overlay to the nav buttons', () => {
  const SRC = readFileSync(path.join(process.cwd(), 'src/components/learn/LessonScreen.tsx'), 'utf8')

  it('builds navAnchorProgress from pendingLesson', () => {
    expect(SRC).toMatch(/const navAnchorProgress = pendingLesson\?\.topicSlug/)
    expect(SRC).toMatch(/activeLessonSlug: pendingLesson\.topicSlug/)
  })

  it('the nav-button data is derived from navAnchorProgress, not raw progress', () => {
    expect(SRC).toMatch(/const nextLessonData = findNextLesson\(curriculumLessons, navAnchorProgress\)/)
    expect(SRC).toMatch(/const previousLessonData = findPreviousLesson\(curriculumLessons, navAnchorProgress\)/)
  })
})
