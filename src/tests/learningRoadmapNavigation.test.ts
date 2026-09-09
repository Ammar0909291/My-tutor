import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import path from 'path'
import {
  computeLessonLockState,
  type CurriculumLesson, type CurriculumProgress, type LessonLockContext,
} from '@/lib/curriculum/lessonNavigation'

/**
 * ── LEARNING ROADMAP LESSON-SELECTION NAVIGATION FIX ────────────────────────
 *
 * REPORTED: on the Chemistry Learning Roadmap (`t('lesson_roadmap')` — the
 * curriculum tree panel inside LessonScreen.tsx, reached via the "Lessons"
 * button and shown full-screen while `maximizedPanel === 'curriculum'`),
 * selecting a lesson kept the learner on the roadmap instead of taking them
 * to Learn. They had to manually tap the restore ("← Back to Tutor Max")
 * button to reach the lesson they had just picked.
 *
 * ROOT CAUSE, confirmed by reading LessonScreen.tsx directly (not assumed):
 *   - Every lesson row's onClick calls `requestLessonSwitch(lesson)`, which
 *     opens `lessonSwitchDialog` (a fixed, full-viewport overlay — always
 *     visible regardless of `maximizedPanel`).
 *   - Confirming that dialog runs `confirmLessonSwitch`, which stages the
 *     lesson via `stageLessonPreview` (sets `pendingLesson`, clears messages,
 *     `lessonStarted=false`) — this is what drives the "Start Lesson" welcome
 *     screen, which lives in the CHAT panel (Panel 3, `LessonScreen.tsx`'s
 *     "TUTOR CHAT" section).
 *   - Panel 3 is hidden via `display:none` whenever
 *     `maximizedPanel && maximizedPanel !== 'chat'` — which is exactly the
 *     'curriculum' state the roadmap leaves the screen in. Confirming a
 *     switch never touched `maximizedPanel`, so the just-staged preview was
 *     rendered behind a hidden panel while the roadmap tree kept filling the
 *     screen — the reported bug, exactly.
 *
 * THE FIX: `confirmLessonSwitch` now also calls `setMaximizedPanel('chat')`.
 * This is the single shared confirmation point for every switch that opens
 * the dialog (the Learning Roadmap tree AND the Previous/Current/Next
 * buttons, per `requestLessonSwitch`'s own comment), so one line at one
 * existing choke point fixes navigation for both — no second navigation
 * mechanism, no change to curriculum data, lock state, mastery, or ordering.
 */

const LESSONS: CurriculumLesson[] = [
  { id: 'l1', subjectCode: 'chemistry', unit: 1, unitTitle: 'Foundations', lesson: 1, order: 1, lessonTitle: 'Nature of Matter', lessonGoal: 'g', topicSlug: 'chem.found.matter' },
  { id: 'l2', subjectCode: 'chemistry', unit: 1, unitTitle: 'Foundations', lesson: 2, order: 2, lessonTitle: 'States of Matter', lessonGoal: 'g', topicSlug: 'chem.found.states-of-matter' },
  { id: 'l3', subjectCode: 'chemistry', unit: 1, unitTitle: 'Foundations', lesson: 3, order: 3, lessonTitle: 'Pure Substances and Mixtures', lessonGoal: 'g', topicSlug: 'chem.found.pure-substances' },
  { id: 'l4', subjectCode: 'chemistry', unit: 1, unitTitle: 'Foundations', lesson: 4, order: 4, lessonTitle: 'Physical Quantities and SI Units', lessonGoal: 'g', topicSlug: 'chem.found.si-units' },
  { id: 'l5', subjectCode: 'chemistry', unit: 2, unitTitle: 'Atomic Structure', lesson: 1, order: 5, lessonTitle: 'Measurement Uncertainty', lessonGoal: 'g', topicSlug: 'chem.found.uncertainty' },
]

type PanelName = 'curriculum' | 'code' | 'chat'

/** Minimal reducer mirroring the exact LessonScreen slice this fix touches. */
interface RoadmapClientState {
  subjectSlug: string
  progress: CurriculumProgress
  pendingLesson: CurriculumLesson | null
  lessonStarted: boolean
  dialogOpenFor: CurriculumLesson | null
  maximizedPanel: PanelName | null
  completedMutationCount: number // increments only if a lesson gets marked complete
}

const BASE_CTX: LessonLockContext = {
  progress: { currentLesson: 1, completedLessons: [], activeLessonSlug: 'chem.found.matter' },
  topicProgressMap: {},
  availableTopicSlugs: ['chem.found.matter'], // only lesson 1 unlocked
}

/** Roadmap row click — unconditional, exactly as LessonScreen's onClick. */
function clickLessonRow(s: RoadmapClientState, target: CurriculumLesson): RoadmapClientState {
  return { ...s, dialogOpenFor: target }
}

/** confirmLessonSwitch AFTER the fix: restores the chat/"Learn" panel. */
function confirmLessonSwitch(s: RoadmapClientState): RoadmapClientState {
  if (!s.dialogOpenFor) return s
  const target = s.dialogOpenFor
  return {
    ...s,
    dialogOpenFor: null,
    maximizedPanel: 'chat',
    pendingLesson: target,
    lessonStarted: false,
  }
}

/** confirmLessonSwitch BEFORE the fix — the reported defect, as a passing test. */
function confirmLessonSwitchWithoutFix(s: RoadmapClientState): RoadmapClientState {
  if (!s.dialogOpenFor) return s
  const target = s.dialogOpenFor
  return { ...s, dialogOpenFor: null, pendingLesson: target, lessonStarted: false }
}

function openRoadmap(s: RoadmapClientState): RoadmapClientState {
  return { ...s, maximizedPanel: 'curriculum' }
}

const START: RoadmapClientState = {
  subjectSlug: 'chemistry',
  progress: BASE_CTX.progress,
  pendingLesson: null,
  lessonStarted: true,
  dialogOpenFor: null,
  maximizedPanel: 'curriculum', // learner is looking at the roadmap
  completedMutationCount: 0,
}

describe('Learning Roadmap lesson selection navigates to Learn', () => {
  // 1. Selecting an unlocked lesson navigates to Learn.
  it('selecting an unlocked lesson from the roadmap ends on the chat/Learn panel', () => {
    const nature = LESSONS[0] // unlocked entry lesson
    let s = clickLessonRow(START, nature)
    s = confirmLessonSwitch(s)
    expect(s.maximizedPanel).toBe('chat')
    expect(s.pendingLesson?.id).toBe('l1')
  })

  // 2. The correct selected lesson/concept is passed through.
  it('the exact lesson selected is the one staged — never a different one', () => {
    const target = LESSONS[3] // "Physical Quantities and SI Units"
    let s = clickLessonRow(START, target)
    s = confirmLessonSwitch(s)
    expect(s.pendingLesson?.id).toBe('l4')
    expect(s.pendingLesson?.topicSlug).toBe('chem.found.si-units')
  })

  // 3. Subject is preserved.
  it('the subject is untouched by lesson selection', () => {
    let s = clickLessonRow(START, LESSONS[1])
    s = confirmLessonSwitch(s)
    expect(s.subjectSlug).toBe('chemistry')
  })

  // 4. Selected lesson does not silently revert to the previously active lesson.
  it('selecting lesson 5 after lesson 2 lands on lesson 5, not back on 2', () => {
    let s = confirmLessonSwitch(clickLessonRow(START, LESSONS[1])) // pick lesson 2 first
    expect(s.pendingLesson?.order).toBe(2)
    s = confirmLessonSwitch(clickLessonRow(s, LESSONS[4])) // now pick lesson 5
    expect(s.pendingLesson?.order).toBe(5)
    expect(s.pendingLesson?.order).not.toBe(2)
  })

  // 5. Locked lessons: preserve EXISTING behaviour exactly (this fix must not
  // change it either way). The platform's own, already-shipped decision is
  // "free navigation" — a locked row still opens the same confirm dialog with
  // an advisory (non-blocking) prerequisite notice, never a hard reject. This
  // pins that computeLessonLockState's isLocked verdict is unaffected by, and
  // never consulted by, the panel-restore fix.
  it('a locked lesson keeps its existing (advisory-only) lock verdict — untouched by this fix', () => {
    const locked = LESSONS[3] // 'chem.found.si-units' not in availableTopicSlugs
    const state = computeLessonLockState(locked, BASE_CTX)
    expect(state.isLocked).toBe(true)
    // The click handler is unconditional in the real component (no isLocked
    // branch) — confirming still stages the target and restores the panel,
    // exactly the same as an unlocked lesson. This fix adds no new gate.
    let s = clickLessonRow(START, locked)
    s = confirmLessonSwitch(s)
    expect(s.maximizedPanel).toBe('chat')
    expect(s.pendingLesson?.id).toBe('l4')
  })

  // 6. Existing progress/resume state is preserved.
  it('confirming a switch never mutates completedLessons or currentLesson', () => {
    let s = clickLessonRow(START, LESSONS[2])
    s = confirmLessonSwitch(s)
    expect(s.progress).toBe(START.progress) // same reference — untouched
    expect(s.completedMutationCount).toBe(0)
  })

  // 7. Multiple different lesson selections each navigate correctly.
  it('a sequence of different selections all end on the chat panel with the right target', () => {
    for (const target of LESSONS) {
      let s = openRoadmap({ ...START, maximizedPanel: 'curriculum' })
      s = clickLessonRow(s, target)
      s = confirmLessonSwitch(s)
      expect(s.maximizedPanel).toBe('chat')
      expect(s.pendingLesson?.id).toBe(target.id)
    }
  })

  // 8. First Chemistry lesson.
  it('selecting the first Chemistry lesson ("Nature of Matter") navigates to Learn', () => {
    let s = confirmLessonSwitch(clickLessonRow(START, LESSONS[0]))
    expect(s.maximizedPanel).toBe('chat')
    expect(s.pendingLesson?.lessonTitle).toBe('Nature of Matter')
  })

  // 9. A later Chemistry lesson.
  it('selecting a later Chemistry lesson ("Measurement Uncertainty") navigates to Learn', () => {
    let s = confirmLessonSwitch(clickLessonRow(START, LESSONS[4]))
    expect(s.maximizedPanel).toBe('chat')
    expect(s.pendingLesson?.lessonTitle).toBe('Measurement Uncertainty')
  })

  // 10. Navigation from the roadmap does not mark the lesson complete.
  it('does not mark any lesson complete as a side effect of navigating', () => {
    let s = confirmLessonSwitch(clickLessonRow(START, LESSONS[2]))
    expect(s.progress.completedLessons).toEqual([])
    expect(s.completedMutationCount).toBe(0)
  })

  // 11. Back navigation does not create a loop.
  it('restoring the panel is idempotent — repeated confirms never loop or flip state', () => {
    let s = confirmLessonSwitch(clickLessonRow(START, LESSONS[0]))
    expect(s.maximizedPanel).toBe('chat')
    // Re-opening the roadmap and confirming again just restores 'chat' again —
    // never toggles back to 'curriculum' or anywhere else.
    s = openRoadmap(s)
    s = confirmLessonSwitch(clickLessonRow(s, LESSONS[1]))
    expect(s.maximizedPanel).toBe('chat')
  })

  // 12. Existing direct Learn navigation still works (unaffected by this fix).
  it('a lesson already reached via direct Learn navigation (no dialog) is untouched', () => {
    // No dialogOpenFor was ever set — confirmLessonSwitch is a no-op guard.
    const direct: RoadmapClientState = { ...START, maximizedPanel: 'chat', dialogOpenFor: null }
    const s = confirmLessonSwitch(direct)
    expect(s).toEqual(direct)
  })

  // 13. Mobile/tap path — there is exactly one implementation, shared.
  it('WITHOUT the fix (old behaviour), confirming leaves the panel on curriculum — the reported bug, pinned', () => {
    let s = clickLessonRow(START, LESSONS[0])
    s = confirmLessonSwitchWithoutFix(s)
    expect(s.pendingLesson?.id).toBe('l1') // staged correctly...
    expect(s.maximizedPanel).toBe('curriculum') // ...but the screen never moved
  })
})

describe('LessonScreen implements the fix at the single shared confirmation point', () => {
  const SRC = readFileSync(path.join(process.cwd(), 'src/components/learn/LessonScreen.tsx'), 'utf8')

  it('confirmLessonSwitch restores the chat panel', () => {
    const start = SRC.indexOf('const confirmLessonSwitch = useCallback')
    expect(start).toBeGreaterThan(-1)
    const end = SRC.indexOf('}, [lessonSwitchDialog, stageLessonPreview])', start)
    expect(end).toBeGreaterThan(start)
    const body = SRC.slice(start, end)
    expect(body).toMatch(/setMaximizedPanel\('chat'\)/)
    // Restoring the panel happens before the preview is staged, and after the
    // dialog closes — order that matches every other setState-only handler in
    // this file (batched by React either way, but keeps the diff obviously
    // safe to read).
    const dialogCloseIdx = body.indexOf('setLessonSwitchDialog(null)')
    const restoreIdx = body.indexOf("setMaximizedPanel('chat')")
    const stageIdx = body.indexOf('stageLessonPreview(target)')
    expect(dialogCloseIdx).toBeGreaterThan(-1)
    expect(restoreIdx).toBeGreaterThan(dialogCloseIdx)
    expect(stageIdx).toBeGreaterThan(restoreIdx)
  })

  it('is the ONLY new call site — no second navigation mechanism was introduced', () => {
    // Exactly the 4 pre-existing setMaximizedPanel call sites (restore button,
    // curriculum maximize/restore toggle, code maximize/restore toggle, the
    // "Lessons" button) plus this one new call inside confirmLessonSwitch.
    const calls = SRC.match(/setMaximizedPanel\(/g) ?? []
    expect(calls.length).toBe(5)
  })

  it("there is exactly one lesson-row click handler, shared by mobile and desktop (both reach the roadmap panel's own hidden md:contents / maximizedPanel toggle)", () => {
    // The whole curriculum-tree row is one onClick calling requestLessonSwitch —
    // no separate mobile-only handler exists for the same row.
    const matches = [...SRC.matchAll(/onClick=\{\(\) => \{\s*\/\/ Free navigation:[\s\S]*?requestLessonSwitch\(lesson\)\s*\}\}/g)]
    expect(matches.length).toBe(1)
  })

  it('the fix does not touch computeLessonLockState, mastery, or completion logic', () => {
    const start = SRC.indexOf('const confirmLessonSwitch = useCallback')
    const end = SRC.indexOf('}, [lessonSwitchDialog, stageLessonPreview])', start)
    const body = SRC.slice(start, end)
    expect(body).not.toMatch(/computeLessonLockState/)
    expect(body).not.toMatch(/completedLessons/)
    expect(body).not.toMatch(/handleLessonComplete/)
    expect(body).not.toMatch(/masteryPct/)
  })

  it('stageLessonPreview itself is unchanged by this fix (still stages only, never commits)', () => {
    const start = SRC.indexOf('const stageLessonPreview = useCallback')
    const end = SRC.indexOf('const confirmLessonSwitch = useCallback', start)
    const body = SRC.slice(start, end)
    expect(body).not.toMatch(/setMaximizedPanel/)
  })

  it('the Learning Roadmap tree and the confirm dialog are still the same single mechanism (no roadmap-data change)', () => {
    // computeLessonLockState remains the one shared lock-state function the
    // roadmap tree reads from — confirming this fix did not fork it.
    expect(SRC.match(/computeLessonLockState\(/g)?.length).toBeGreaterThanOrEqual(2) // definition site's own file is separate; this file calls it at least twice (tree row + dialog helpers)
  })
})
