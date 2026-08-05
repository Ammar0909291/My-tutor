/**
 * P0 — LESSON CONTINUATION. Locks the invariant that automatic progression
 * never waits for a user gesture.
 *
 * History this file exists to end: lesson continuation was fixed several times
 * and kept failing. Every previous fix corrected WHICH lesson was staged and in
 * WHAT mode — all correct, which is why each looked right in isolation. None
 * touched the hand-off: completeAndAdvance staged `pendingLesson` +
 * `pendingLessonRunRef` and returned, parking the learner on the "Start Lesson"
 * preview whose button is the ONLY caller of pendingLessonRunRef. Completion
 * therefore always required a click.
 *
 * The gate is CORRECT for manual navigation and WRONG for completion. These
 * tests pin both halves so a future edit cannot re-merge them.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import {
  planLessonAdvance, decideLessonEntryMode, shouldResetConversation,
} from '@/lib/curriculum/lessonTransition'
import type { CurriculumLesson, CurriculumProgress } from '@/lib/curriculum/knowledgeGraph'

const SRC = readFileSync(join(process.cwd(), 'src/components/learn/LessonScreen.tsx'), 'utf8')
/** Assertions about live behaviour must never be satisfied by prose. */
const stripComments = (s: string) =>
  s.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^[ \t]*\/\/.*$/gm, '')
const CODE = stripComments(SRC)

/** The body of completeAndAdvance, comments removed. */
function completeAndAdvanceBody(): string {
  const start = CODE.indexOf('const completeAndAdvance = useCallback(')
  expect(start, 'completeAndAdvance must exist').toBeGreaterThan(-1)
  const end = CODE.indexOf('completeAndAdvanceRef.current = completeAndAdvance', start)
  expect(end, 'completeAndAdvance must be assigned to its ref').toBeGreaterThan(start)
  return CODE.slice(start, end)
}

describe('automatic progression starts the next lesson without a gesture', () => {
  const body = completeAndAdvanceBody()

  it('does NOT park the transition behind pendingLessonRunRef', () => {
    // The regression in one assertion: staging a deferred runner here means the
    // learner must click "Start Lesson" to continue.
    expect(body).not.toMatch(/pendingLessonRunRef\.current\s*=\s*async/)
  })

  it('clears any pending hand-off rather than creating one', () => {
    expect(body).toMatch(/setPendingLesson\(null\)/)
    expect(body).toMatch(/pendingLessonRunRef\.current\s*=\s*null/)
    expect(body).not.toMatch(/setPendingLesson\(next\)/)
  })

  it('takes ownership of initialization, exactly as the Start Lesson click does', () => {
    // Without both of these the preview screen re-renders (it is gated on
    // `!lessonStarted && messages.length === 0`) and a late history restore can
    // clobber the lesson-init turn.
    expect(body).toMatch(/setLessonStarted\(true\)/)
    expect(body).toMatch(/initializedRef\.current\s*=\s*true/)
    expect(body).not.toMatch(/setLessonStarted\(false\)/)
  })

  it('invokes the shared lesson-init implementation directly', () => {
    expect(body).toMatch(/await callLessonInit\(/)
  })

  it('clears the previous lesson transcript before starting the next', () => {
    expect(body).toMatch(/setMessages\(\[\]\)/)
  })

  it('never advances on unsaved progress', () => {
    // A failed PATCH must leave the learner where they are; advancing on
    // unpersisted progress is the one unrecoverable outcome.
    expect(body).toMatch(/if \(!newProgress[^)]*\) return/)
  })
})

describe('every completion path funnels through the one implementation', () => {
  it('no completion path calls handleLessonComplete directly', () => {
    // completeAndAdvance is the only legitimate caller. Any other call site is
    // a second transition path — the defect class this locks out.
    const calls = [...CODE.matchAll(/handleLessonComplete\(/g)]
    // one definition + exactly one call, inside completeAndAdvance
    expect(completeAndAdvanceBody()).toMatch(/await handleLessonComplete\(/)
    expect(calls.length).toBeLessThanOrEqual(2)
  })

  it('all four completion entry points call completeAndAdvance', () => {
    // auto [LESSON_COMPLETE] (via ref, TDZ-safe), Complete-lesson button,
    // completion-card Next, and Skip-anyway.
    const direct = [...CODE.matchAll(/completeAndAdvance\(/g)].length
    const viaRef = [...CODE.matchAll(/completeAndAdvanceRef\.current\(/g)].length
    expect(direct + viaRef).toBeGreaterThanOrEqual(4)
  })
})

describe('manual navigation keeps its preview gate — the two must not re-merge', () => {
  it('the manual switch path still defers to pendingLessonRunRef', () => {
    // Requirement 4: automatic and manual progression must not interfere. They
    // share callLessonInit (one implementation) and differ only in entry policy.
    const start = CODE.indexOf('const confirmLessonSwitch')
    expect(start).toBeGreaterThan(-1)
    const region = CODE.slice(start, start + 2500)
    expect(region).toMatch(/pendingLessonRunRef\.current\s*=\s*async/)
  })

  it('the Start Lesson button remains the runner for manual transitions', () => {
    expect(CODE).toMatch(/const run = pendingLessonRunRef\.current/)
  })
})

describe('free navigation is preserved — no prerequisite enforcement', () => {
  it('the roadmap click is not gated on lock state', () => {
    // Locks are informational (badge + opacity) only. requestLessonSwitch must
    // be reachable for every lesson, including locked ones.
    const nav = CODE.indexOf('requestLessonSwitch(lesson)')
    expect(nav).toBeGreaterThan(-1)
    const before = CODE.slice(Math.max(0, nav - 400), nav)
    expect(before).not.toMatch(/if\s*\(\s*isLocked\s*\)\s*return/)
    expect(before).not.toMatch(/if\s*\(\s*!canNavigate\s*\)\s*return/)
  })

  it('requestLessonSwitch does not reject a locked target', () => {
    const start = CODE.indexOf('const requestLessonSwitch')
    expect(start).toBeGreaterThan(-1)
    const region = CODE.slice(start, start + 700)
    expect(region).not.toMatch(/state\.isLocked\s*\)\s*return/)
  })
})

describe('planLessonAdvance is deterministic and lock-blind', () => {
  const lessons: CurriculumLesson[] = [1, 2, 3].map((order) => ({
    order, lessonTitle: `L${order}`, lessonGoal: 'g', unit: 1, unitTitle: 'U', topicSlug: `t${order}`,
  })) as unknown as CurriculumLesson[]
  const progress = (currentLesson: number, completed: number[]): CurriculumProgress =>
    ({ currentLesson, completedLessons: completed }) as CurriculumProgress

  it('advances to the immediate next lesson by order', () => {
    const plan = planLessonAdvance(1, lessons, progress(2, [1]), {})
    expect(plan.next?.order).toBe(2)
    expect(plan.isFinalLesson).toBe(false)
  })

  it('is a pure function of its arguments — identical inputs, identical plan', () => {
    const a = planLessonAdvance(1, lessons, progress(2, [1]), {})
    const b = planLessonAdvance(1, lessons, progress(2, [1]), {})
    expect(a.next?.order).toBe(b.next?.order)
    expect(a.nextEntryMode).toBe(b.nextEntryMode)
  })

  it('reports the end of the curriculum instead of inventing a lesson', () => {
    const plan = planLessonAdvance(3, lessons, progress(3, [1, 2, 3]), {})
    expect(plan.next).toBeNull()
    expect(plan.isFinalLesson).toBe(true)
  })

  it('a freshly advanced lesson opens as an introduction, not a resume', () => {
    const plan = planLessonAdvance(1, lessons, progress(2, [1]), {})
    expect(plan.nextEntryMode).toBe('introduction')
  })

  it('entering a different lesson always resets the conversation', () => {
    expect(shouldResetConversation(1, 2)).toBe(true)
    expect(shouldResetConversation(null, 2)).toBe(true)
    expect(shouldResetConversation(2, 2)).toBe(false)
  })

  it('manual selection of a far lesson is honoured, not redirected', () => {
    // Requirement 3: choosing lesson 3 from lesson 1 begins lesson 3.
    const mode = decideLessonEntryMode({
      lesson: lessons[2], progress: progress(1, []), topicProgressMap: {},
    })
    expect(mode).toBe('introduction')
  })
})
