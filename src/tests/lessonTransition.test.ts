import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import {
  decideLessonEntryMode, lessonInitModeFor, planLessonAdvance, shouldResetConversation,
  type LessonEntryMode,
} from '@/lib/curriculum/lessonTransition'
import type { CurriculumLesson, CurriculumProgress, TopicProgressEntry } from '@/lib/curriculum/lessonNavigation'

const lesson = (order: number, topicSlug = `t${order}`): CurriculumLesson => ({
  order, topicSlug, lessonTitle: `Lesson ${order}`, lessonGoal: 'g', unitTitle: 'u',
} as CurriculumLesson)

const LESSONS = [1, 2, 3].map((n) => lesson(n))

const progress = (currentLesson: number, completedLessons: number[] = []): CurriculumProgress =>
  ({ currentLesson, completedLessons } as CurriculumProgress)

const tp = (slug: string, status: TopicProgressEntry['status']): Record<string, TopicProgressEntry> =>
  ({ [slug]: { status, masteryPct: 0, revisionCount: 0 } as TopicProgressEntry })

// ─── P0 · MANUAL LESSON ENTRY ────────────────────────────────────────────────

describe('lesson entry mode — first-time entry always introduces', () => {
  it('a never-started lesson gets an INTRODUCTION', () => {
    expect(decideLessonEntryMode({
      lesson: lesson(2), progress: progress(2), topicProgressMap: {},
    })).toBe('introduction')
  })

  it('NOT_STARTED topic progress is still an introduction', () => {
    expect(decideLessonEntryMode({
      lesson: lesson(2), progress: progress(2), topicProgressMap: tp('t2', 'NOT_STARTED'),
    })).toBe('introduction')
  })

  it('THE BUG: subject history must not suppress a new lesson introduction', () => {
    // The old check was `data.resumed && restoredAny` — true for every
    // returning learner. A learner with a completed lesson 1 opening lesson 2
    // for the first time must still be introduced to lesson 2.
    expect(decideLessonEntryMode({
      lesson: lesson(2),
      progress: progress(2, [1]),
      topicProgressMap: tp('t1', 'COMPLETED'),
    })).toBe('introduction')
  })

  it('deep link straight into an untouched later lesson introduces it', () => {
    expect(decideLessonEntryMode({
      lesson: lesson(3), progress: progress(1), topicProgressMap: {},
    })).toBe('introduction')
  })

  it('a lesson with no topicSlug still introduces rather than resuming', () => {
    expect(decideLessonEntryMode({
      lesson: { order: 2, topicSlug: undefined }, progress: progress(2), topicProgressMap: {},
    })).toBe('introduction')
  })
})

describe('lesson entry mode — resume only on genuine saved progress', () => {
  it('resumes an IN_PROGRESS lesson the learner is currently on', () => {
    expect(decideLessonEntryMode({
      lesson: lesson(2), progress: progress(2), topicProgressMap: tp('t2', 'IN_PROGRESS'),
    })).toBe('resume')
  })

  it('does NOT resume an IN_PROGRESS lesson that is not the current one', () => {
    // Progress was left on lesson 2 but the learner is opening lesson 3.
    expect(decideLessonEntryMode({
      lesson: lesson(3), progress: progress(2), topicProgressMap: tp('t3', 'IN_PROGRESS'),
    })).toBe('introduction')
  })
})

describe('lesson entry mode — completed lessons', () => {
  it.each(['COMPLETED', 'MASTERED'] as const)('%s becomes a review', (status) => {
    expect(decideLessonEntryMode({
      lesson: lesson(1), progress: progress(2), topicProgressMap: tp('t1', status),
    })).toBe('review')
  })

  it('completedLessons alone is enough to trigger review', () => {
    expect(decideLessonEntryMode({
      lesson: lesson(1), progress: progress(2, [1]), topicProgressMap: {},
    })).toBe('review')
  })

  it('completion outranks in-progress', () => {
    expect(decideLessonEntryMode({
      lesson: lesson(1), progress: progress(1, [1]), topicProgressMap: tp('t1', 'IN_PROGRESS'),
    })).toBe('review')
  })

  it('an explicit restart outranks everything', () => {
    expect(decideLessonEntryMode({
      lesson: lesson(1), progress: progress(1, [1]),
      topicProgressMap: tp('t1', 'MASTERED'), explicitRestart: true,
    })).toBe('restart')
  })
})

describe('entry mode → lesson-init mode mapping', () => {
  it('introduction maps to the full opening ("next")', () => {
    expect(lessonInitModeFor('introduction')).toBe('next')
  })

  it('every mode maps to a valid lesson-init mode', () => {
    const valid = ['restart', 'review', 'resume', 'next']
    for (const m of ['introduction', 'resume', 'review', 'restart'] as LessonEntryMode[]) {
      expect(valid).toContain(lessonInitModeFor(m))
    }
  })
})

// ─── P0 · LESSON PROGRESSION ─────────────────────────────────────────────────

describe('lesson advance plan — completing a lesson moves the learner on', () => {
  it('advances to the next lesson and introduces it', () => {
    const plan = planLessonAdvance(1, LESSONS, progress(2, [1]), {})
    expect(plan.next?.order).toBe(2)
    expect(plan.nextEntryMode).toBe('introduction')
    expect(plan.isFinalLesson).toBe(false)
  })

  it('THE BUG: never re-opens the lesson just completed', () => {
    const plan = planLessonAdvance(1, LESSONS, progress(2, [1]), {})
    expect(plan.next?.order).not.toBe(1)
  })

  it('is not fooled by stale progress that has not advanced yet', () => {
    // Server PATCH failed to advance currentLesson; the completed order still
    // determines the target, so the learner cannot be parked on the old lesson.
    const plan = planLessonAdvance(1, LESSONS, progress(1, [1]), {})
    expect(plan.next?.order).toBe(2)
  })

  it('reports the end of the curriculum instead of inventing a lesson', () => {
    const plan = planLessonAdvance(3, LESSONS, progress(3, [1, 2, 3]), {})
    expect(plan.next).toBeNull()
    expect(plan.nextEntryMode).toBeNull()
    expect(plan.isFinalLesson).toBe(true)
  })

  it('carries the skip (non-mastery) flag through', () => {
    expect(planLessonAdvance(1, LESSONS, progress(2, [1]), {}, { mastered: false }).mastered).toBe(false)
    expect(planLessonAdvance(1, LESSONS, progress(2, [1]), {}).mastered).toBe(true)
  })

  it('reviews the next lesson if it was somehow already completed', () => {
    const plan = planLessonAdvance(1, LESSONS, progress(2, [1, 2]), {})
    expect(plan.nextEntryMode).toBe('review')
  })
})

describe('conversation reset on transition', () => {
  it('resets when moving to a different lesson', () => {
    expect(shouldResetConversation(1, 2)).toBe(true)
  })
  it('does not reset when staying on the same lesson (refresh / resume)', () => {
    expect(shouldResetConversation(2, 2)).toBe(false)
  })
  it('resets when the current lesson is unknown', () => {
    expect(shouldResetConversation(null, 1)).toBe(true)
    expect(shouldResetConversation(undefined, 1)).toBe(true)
  })
})

// ─── STRUCTURAL LOCK · ONE CANONICAL TRANSITION PATH ─────────────────────────

describe('every completion entry point uses the canonical transition', () => {
  const SRC = readFileSync(join(process.cwd(), 'src/components/learn/LessonScreen.tsx'), 'utf8')

  it('handleLessonComplete is never called without an accompanying transition', () => {
    // THE INVARIANT. handleLessonComplete records progress but performs no
    // session transition; calling it alone is the production bug (three sites
    // did exactly that). It is legitimate only inside a function that also
    // moves the session, so every call must be awaited and live in one of the
    // two transitioning owners:
    //   completeAndAdvance   -> advances to the NEXT lesson
    //
    // FREE LESSON SURFING (Option B) narrowed this to ONE owner.
    // confirmLessonSwitch used to record the prior lesson as a silent
    // completion on the way to the chosen one; that appended to
    // completedLessons regardless of the `mastered` flag, so clicking forward
    // through the roadmap marked lessons COMPLETED that were never studied.
    // It now records SKIPPED via markLessonSkipped() and completes nothing.
    //
    // Comments are stripped before matching: the switch path documents the
    // removed call by name, which would otherwise look like a fire-and-forget
    // call site.
    const CODE = SRC.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/[^\n]*/g, '')
    const fireAndForget = CODE.match(/(?<!await )\bhandleLessonComplete\(/g) ?? []
    expect(fireAndForget).toHaveLength(0)

    const owners = ['const completeAndAdvance = useCallback']
    const ranges = owners.map((sig) => {
      const start = SRC.indexOf(sig)
      expect(start, `${sig} not found`).toBeGreaterThan(-1)
      return [start, start + 2200] as const
    })

    let offset = 0
    let calls = 0
    for (;;) {
      const i = SRC.indexOf('await handleLessonComplete(', offset)
      if (i === -1) break
      calls++
      expect(
        ranges.some(([a, b]) => i >= a && i <= b),
        `handleLessonComplete at index ${i} is outside a transitioning owner`,
      ).toBe(true)
      offset = i + 1
    }
    expect(calls).toBeGreaterThan(0)
  })

  it('the chosen-lesson switch path also starts the target lesson', () => {
    // This logic now lives in stageLessonPreview (extracted so preview-to-
    // preview chaining can call it directly, without the confirm dialog) —
    // confirmLessonSwitch is a thin wrapper that closes the dialog and
    // delegates to it.
    const start = SRC.indexOf('const stageLessonPreview = useCallback')
    // Widened from 2200: the Option B rationale comment sits inside this
    // callback and pushed the tail of the body past the old window.
    const body = SRC.slice(start, start + 3400)
    // Option B: the switch records a SKIP, never a completion.
    expect(body).not.toContain('await handleLessonComplete(')
    expect(body).toContain('await markLessonSkipped(')
    expect(body).toContain('resetLessonContext()')
    expect(body).toContain('callLessonInit(')
    expect(body).toContain('decideLessonEntryMode(')
  })

  it('completeAndAdvance both records completion and starts the next lesson', () => {
    const start = SRC.indexOf('const completeAndAdvance = useCallback')
    expect(start).toBeGreaterThan(-1)
    // Bounded by the ref assignment that immediately follows the callback
    // rather than by a fixed character count: the previous `start + 1800`
    // window silently excluded the tail of the function whenever the body or
    // its comments grew, failing on documentation changes that altered no
    // behaviour. The four assertions below are the actual invariant.
    const end = SRC.indexOf('completeAndAdvanceRef.current = completeAndAdvance', start)
    expect(end).toBeGreaterThan(start)
    const body = SRC.slice(start, end)
    expect(body).toContain('handleLessonComplete(')
    expect(body).toContain('planLessonAdvance(')
    expect(body).toContain('callLessonInit(')
    expect(body).toContain('setMessages([])')
  })

  it('is declared after callLessonInit — a TDZ crash tsc cannot catch', () => {
    expect(SRC.indexOf('const callLessonInit = useCallback'))
      .toBeLessThan(SRC.indexOf('const completeAndAdvance = useCallback'))
  })

  it('the ref used by the auto-complete path is assigned after the definition', () => {
    expect(SRC.indexOf('const completeAndAdvance = useCallback'))
      .toBeLessThan(SRC.indexOf('completeAndAdvanceRef.current = completeAndAdvance'))
  })

  it('the resume short-circuit is gated on the lesson-scoped entry mode', () => {
    // The old subject-scoped check must not return.
    expect(SRC).not.toMatch(/if \(data\.resumed && restoredAny\) return/)
    expect(SRC).toContain("entryMode !== 'introduction'")
  })
})
