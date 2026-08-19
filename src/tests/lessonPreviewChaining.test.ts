import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import path from 'path'
import {
  findNextLesson, findPreviousLesson,
  type CurriculumLesson, type CurriculumProgress,
} from '@/lib/curriculum/lessonNavigation'

/**
 * ── PREVIEW-TO-PREVIEW CHAINING ─────────────────────────────────────────────
 *
 * REPORTED (phone, after the lessonSwitchAnchor.test.ts fix landed): tapping
 * Next once correctly opens the N+1 preview, but a second tap does not
 * cleanly advance to N+2 — the learner is forced through the "Start Lesson?"
 * confirm dialog (or, on the Previous button, straight into an immediate
 * commit) on every single hop, even though nothing was ever started.
 *
 * ROOT CAUSE, confirmed by reading LessonScreen.tsx directly:
 *   - The Next button's onClick unconditionally called `requestLessonSwitch`,
 *     which always opens `lessonSwitchDialog` (the "Currently: X / Switch to:
 *     Y" confirm modal) — even when X was never actually started, i.e. the
 *     learner was already on an unstarted preview and there was nothing to
 *     warn about leaving.
 *   - The Previous button's onClick called `startRevision` DIRECTLY — which
 *     immediately calls `callLessonInit(sessionId, 'review', lesson)`, a real
 *     commit (patches TopicProgress, writes activeLessonSlug) with no preview
 *     step at all. So paging Previous while already previewing silently
 *     STARTED the previous lesson instead of just re-staging the preview.
 *
 * Neither branch checked whether a preview was already up. This file models
 * the exact reducer LessonScreen now uses (`isPreviewing` / `stageLessonPreview`
 * vs. `requestLessonSwitch` / `startRevision`) and separately asserts, from the
 * real source, that the shipped handlers implement it.
 */

const LESSONS: CurriculumLesson[] = [
  { id: 'l1', subjectCode: 'chemistry', unit: 1, unitTitle: 'U', lesson: 1, order: 1, lessonTitle: 'Nature of Matter', lessonGoal: 'g', topicSlug: 'chem.found.matter' },
  { id: 'l2', subjectCode: 'chemistry', unit: 1, unitTitle: 'U', lesson: 2, order: 2, lessonTitle: 'States of Matter', lessonGoal: 'g', topicSlug: 'chem.found.states-of-matter' },
  { id: 'l3', subjectCode: 'chemistry', unit: 1, unitTitle: 'U', lesson: 3, order: 3, lessonTitle: 'Pure Substances and Mixtures', lessonGoal: 'g', topicSlug: 'chem.found.pure-substances' },
  { id: 'l4', subjectCode: 'chemistry', unit: 1, unitTitle: 'U', lesson: 4, order: 4, lessonTitle: 'Physical Quantities and SI Units', lessonGoal: 'g', topicSlug: 'chem.found.si-units' },
  { id: 'l5', subjectCode: 'chemistry', unit: 1, unitTitle: 'U', lesson: 5, order: 5, lessonTitle: 'Measurement Uncertainty', lessonGoal: 'g', topicSlug: 'chem.found.uncertainty' },
]

/** A minimal reducer mirroring LessonScreen's client state for this flow. */
interface ClientState {
  progress: CurriculumProgress // real, server-confirmed progress
  pendingLesson: CurriculumLesson | null // preview target, unstarted
  lessonStarted: boolean
  dialogOpenFor: CurriculumLesson | null // lessonSwitchDialog
  mutationCount: number // increments on any progress-mutating action
}

function isPreviewing(s: ClientState) { return s.pendingLesson !== null }

function navAnchor(s: ClientState): CurriculumProgress {
  return s.pendingLesson?.topicSlug ? { ...s.progress, activeLessonSlug: s.pendingLesson.topicSlug } : s.progress
}

/** Direct re-stage — no dialog, no mutation (the fix). */
function stageLessonPreview(s: ClientState, target: CurriculumLesson): ClientState {
  return { ...s, pendingLesson: target, lessonStarted: false, dialogOpenFor: null }
}

/** Leaving a genuinely started lesson opens the confirm dialog. */
function requestLessonSwitch(s: ClientState, target: CurriculumLesson): ClientState {
  return { ...s, dialogOpenFor: target }
}

/** Confirming the dialog stages the preview (still no commit). */
function confirmDialog(s: ClientState): ClientState {
  if (!s.dialogOpenFor) return s
  return stageLessonPreview(s, s.dialogOpenFor)
}

/** Pressing "Start Lesson" on a preview — the only thing that commits. */
function pressStartLesson(s: ClientState): ClientState {
  if (!s.pendingLesson) return s
  const target = s.pendingLesson
  return {
    ...s,
    progress: { ...s.progress, activeLessonSlug: target.topicSlug ?? null },
    pendingLesson: null,
    lessonStarted: true,
    mutationCount: s.mutationCount + 1,
  }
}

function tapNext(s: ClientState): ClientState {
  const next = findNextLesson(LESSONS, navAnchor(s))
  if (!next) return s
  return isPreviewing(s) ? stageLessonPreview(s, next) : requestLessonSwitch(s, next)
}

function tapPrevious(s: ClientState): ClientState {
  const prev = findPreviousLesson(LESSONS, navAnchor(s))
  if (!prev) return s
  return isPreviewing(s) ? stageLessonPreview(s, prev) : requestLessonSwitch(s, prev)
}

const STARTED_ON_3: ClientState = {
  progress: { currentLesson: 1, completedLessons: [], activeLessonSlug: 'chem.found.pure-substances' },
  pendingLesson: null,
  lessonStarted: true,
  dialogOpenFor: null,
  mutationCount: 0,
}

describe('preview-to-preview chaining: start N -> Next -> Next -> Previous -> Previous -> Start', () => {
  it('tap Next from an active lesson opens the confirm dialog, no mutation yet', () => {
    const s1 = tapNext(STARTED_ON_3)
    expect(s1.dialogOpenFor?.order).toBe(4)
    expect(s1.pendingLesson).toBeNull()
    expect(s1.mutationCount).toBe(0)
  })

  it('confirming stages the N+1 preview — still no mutation', () => {
    const s1 = tapNext(STARTED_ON_3)
    const s2 = confirmDialog(s1)
    expect(s2.pendingLesson?.order).toBe(4)
    expect(s2.lessonStarted).toBe(false)
    expect(s2.dialogOpenFor).toBeNull()
    expect(s2.mutationCount).toBe(0)
    expect(s2.progress.activeLessonSlug).toBe('chem.found.pure-substances') // unchanged (still lesson 3)
  })

  it('a SECOND tap of Next, while previewing, advances straight to N+2 — no dialog, no re-render of N+1', () => {
    let s = confirmDialog(tapNext(STARTED_ON_3))
    expect(s.pendingLesson?.order).toBe(4)
    s = tapNext(s) // second Next
    expect(s.dialogOpenFor).toBeNull() // no confirm dialog this time
    expect(s.pendingLesson?.order).toBe(5) // N+2, not N+1 again
    expect(s.mutationCount).toBe(0)
  })

  it('tapping Previous twice from the N+2 preview returns to the N (starting) preview, still with no mutation', () => {
    let s = confirmDialog(tapNext(STARTED_ON_3)) // preview 4
    s = tapNext(s) // preview 5
    expect(s.pendingLesson?.order).toBe(5)
    s = tapPrevious(s) // preview 4
    expect(s.dialogOpenFor).toBeNull()
    expect(s.pendingLesson?.order).toBe(4)
    expect(s.mutationCount).toBe(0)
    s = tapPrevious(s) // preview 3 — back to where the learner started
    expect(s.dialogOpenFor).toBeNull()
    expect(s.pendingLesson?.order).toBe(3)
    expect(s.mutationCount).toBe(0)
    // Real progress is untouched throughout — the whole chain was pure browsing.
    expect(s.progress.activeLessonSlug).toBe('chem.found.pure-substances')
  })

  it('confirming Start on a preview DOES mutate — and only then', () => {
    let s = confirmDialog(tapNext(STARTED_ON_3)) // preview 4
    s = tapNext(s) // preview 5
    s = tapPrevious(s) // preview 4
    expect(s.mutationCount).toBe(0)
    s = pressStartLesson(s) // learner explicitly starts lesson 4
    expect(s.mutationCount).toBe(1)
    expect(s.progress.activeLessonSlug).toBe('chem.found.si-units')
    expect(s.pendingLesson).toBeNull()
    expect(s.lessonStarted).toBe(true)
  })

  it('WITHOUT the fix (old behaviour), a second Next re-opens a dialog instead of chaining', () => {
    // The reported dead end, pinned as a passing test so the fix isn't decorative.
    function oldTapNext(s: ClientState): ClientState {
      const next = findNextLesson(LESSONS, navAnchor(s))
      return next ? requestLessonSwitch(s, next) : s // always the dialog, even mid-preview
    }
    let s = confirmDialog(oldTapNext(STARTED_ON_3)) // preview 4
    s = oldTapNext(s) // second Next, old behaviour
    expect(s.dialogOpenFor?.order).toBe(5) // a dialog reopens instead of silently chaining
    expect(s.pendingLesson?.order).toBe(4) // still stuck on the first preview until confirmed again
  })
})

describe('LessonScreen implements preview-to-preview chaining without a dialog or a commit', () => {
  const SRC = readFileSync(path.join(process.cwd(), 'src/components/learn/LessonScreen.tsx'), 'utf8')

  it('defines isPreviewing from pendingLesson', () => {
    expect(SRC).toMatch(/const isPreviewing = pendingLesson !== null/)
  })

  it('defines a dialog-free stageLessonPreview whose only immediate calls are setPendingLesson/setMessages/setLessonStarted — every side effect is deferred', () => {
    expect(SRC).toMatch(/const stageLessonPreview = useCallback/)
    const start = SRC.indexOf('const stageLessonPreview = useCallback')
    const end = SRC.indexOf('const confirmLessonSwitch = useCallback', start)
    const body = SRC.slice(start, end)
    // Every callLessonInit/startRevision/markLessonSkipped call in this body
    // is reached only through an assignment to pendingLessonRunRef.current —
    // i.e. it runs later, on the "Start Lesson" click, never synchronously here.
    expect(body).toMatch(/pendingLessonRunRef\.current = async \(\) => \{/)
    const sideEffectCalls = [...body.matchAll(/(callLessonInit|startRevision\(target\)|markLessonSkipped)\(/g)]
    expect(sideEffectCalls.length).toBeGreaterThan(0)
    for (const m of sideEffectCalls) {
      const before = body.slice(0, m.index)
      const lastRunRefAssign = before.lastIndexOf('pendingLessonRunRef.current = async () => {')
      const lastReturn = before.lastIndexOf('\n    return\n')
      // The nearest preceding runRef assignment must be closer than any
      // preceding top-level `return` that would have ended a branch.
      expect(lastRunRefAssign).toBeGreaterThan(-1)
      expect(lastRunRefAssign).toBeGreaterThan(lastReturn)
    }
  })

  it('the Next button branches on isPreviewing: stageLessonPreview when previewing, requestLessonSwitch otherwise', () => {
    const idx = SRC.indexOf("onClick={() => {\n                      if (!nextLessonData) return")
    expect(idx).toBeGreaterThan(-1)
    const block = SRC.slice(idx, idx + 400)
    expect(block).toMatch(/if \(isPreviewing\) \{ stageLessonPreview\(nextLessonData\); return \}/)
    expect(block).toMatch(/requestLessonSwitch\(nextLessonData\)/)
  })

  it('the Previous button branches on isPreviewing: stageLessonPreview when previewing, startRevision (direct commit) otherwise', () => {
    const idx = SRC.indexOf("onClick={() => {\n                      if (!previousLessonData) return")
    expect(idx).toBeGreaterThan(-1)
    const block = SRC.slice(idx, idx + 400)
    expect(block).toMatch(/if \(isPreviewing\) \{ stageLessonPreview\(previousLessonData\); return \}/)
    expect(block).toMatch(/void startRevision\(previousLessonData\)/)
  })

  it('the chat-typed "next lesson" / "previous lesson" intents share the same isPreviewing branch (no separate mobile/desktop path)', () => {
    expect(SRC).toMatch(/if \(isPreviewing\) \{ stageLessonPreview\(nextLessonData\) \} else \{ requestLessonSwitch\(nextLessonData\) \}/)
    expect(SRC).toMatch(/if \(isPreviewing\) \{ stageLessonPreview\(previousLessonData\) \} else \{ await startRevision\(previousLessonData\) \}/)
  })

  it('there is exactly one Previous/Next control pair in the file (no mobile-only duplicate)', () => {
    const nextButtonCount = (SRC.match(/aria-label=\{t\('nav_next_lesson'\)\}/g) ?? []).length
    const prevButtonCount = (SRC.match(/aria-label=\{t\('nav_previous_lesson'\)\}/g) ?? []).length
    expect(nextButtonCount).toBe(1)
    expect(prevButtonCount).toBe(1)
  })

  it('the dead LessonNavigationPanel component (a second, unused Prev/Next implementation) stays unimported', () => {
    expect(SRC).not.toMatch(/import .*LessonNavigationPanel/)
  })
})
