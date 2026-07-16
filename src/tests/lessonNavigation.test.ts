/**
 * Previous/Next Lesson navigation — pure logic tests.
 *
 * Mission: implement Previous/Next Lesson navigation inside the Tutor Max
 * chat panel, reusing the existing CurriculumLesson/CurriculumProgress/
 * TopicProgress/availableTopicSlugs data (no new lesson state). These
 * tests exercise the real, imported functions the Curriculum Roadmap tree
 * and the new Lesson Navigation Panel both call — not a reimplemented
 * copy.
 */
import { describe, it, expect } from 'vitest'
import {
  computeLessonLockState, findPreviousLesson, findNextLesson, canAdvanceToNextLesson,
  type CurriculumLesson, type CurriculumProgress,
} from '@/lib/curriculum/lessonNavigation'

function lesson(over: Partial<CurriculumLesson> & { order: number }): CurriculumLesson {
  return {
    id: `l${over.order}`, subjectCode: 'physics', unit: 1, unitTitle: 'Unit 1',
    lesson: over.order, lessonTitle: `Lesson ${over.order}`, lessonGoal: `Goal ${over.order}`,
    topicSlug: `phys.topic.${over.order}`,
    ...over,
  }
}

const LESSONS: CurriculumLesson[] = [1, 2, 3, 4, 5].map((order) => lesson({ order }))

function progress(over: Partial<CurriculumProgress>): CurriculumProgress {
  return { currentLesson: 3, completedLessons: [1, 2], ...over }
}

describe('computeLessonLockState', () => {
  it('marks the current lesson as isCurrent, never locked', () => {
    const state = computeLessonLockState(lesson({ order: 3 }), {
      progress: progress({}), topicProgressMap: {}, availableTopicSlugs: [],
    })
    expect(state.isCurrent).toBe(true)
    expect(state.isLocked).toBe(false)
  })

  it('marks a completed lesson as isCompleted and isPrevious, never locked', () => {
    const state = computeLessonLockState(lesson({ order: 2 }), {
      progress: progress({}), topicProgressMap: {}, availableTopicSlugs: [],
    })
    expect(state.isCompleted).toBe(true)
    expect(state.isPrevious).toBe(true)
    expect(state.isLocked).toBe(false)
  })

  it('locks a future lesson whose topic is not yet in availableTopicSlugs', () => {
    const state = computeLessonLockState(lesson({ order: 5 }), {
      progress: progress({}), topicProgressMap: {}, availableTopicSlugs: ['phys.topic.4'],
    })
    expect(state.isLocked).toBe(true)
  })

  it('unlocks a future lesson once its topic appears in availableTopicSlugs', () => {
    const state = computeLessonLockState(lesson({ order: 4 }), {
      progress: progress({}), topicProgressMap: {}, availableTopicSlugs: ['phys.topic.4'],
    })
    expect(state.isLocked).toBe(false)
  })

  it('never locks a MASTERED topic even if absent from availableTopicSlugs', () => {
    const state = computeLessonLockState(lesson({ order: 5 }), {
      progress: progress({}),
      topicProgressMap: { 'phys.topic.5': { status: 'MASTERED', masteryPct: 95 } },
      availableTopicSlugs: [],
    })
    expect(state.isLocked).toBe(false)
    expect(state.isMastered).toBe(true)
  })

  it('a lesson with no topicSlug (legacy DB curriculum) is never locked', () => {
    const legacy = lesson({ order: 5, topicSlug: undefined })
    const state = computeLessonLockState(legacy, {
      progress: progress({}), topicProgressMap: {}, availableTopicSlugs: [],
    })
    expect(state.isLocked).toBe(false)
  })
})

describe('findPreviousLesson', () => {
  it('returns the nearest completed lesson before the current one', () => {
    const prev = findPreviousLesson(LESSONS, progress({}))
    expect(prev?.order).toBe(2)
  })

  it('skips a gap and finds the nearest completed lesson (not just order - 1)', () => {
    const prev = findPreviousLesson(LESSONS, progress({ currentLesson: 4, completedLessons: [1, 3] }))
    expect(prev?.order).toBe(3)
  })

  it('falls back to order - 1 when nothing before current is recorded as completed', () => {
    const prev = findPreviousLesson(LESSONS, progress({ currentLesson: 3, completedLessons: [] }))
    expect(prev?.order).toBe(2)
  })

  it('returns null at lesson 1 (nothing before it)', () => {
    const prev = findPreviousLesson(LESSONS, progress({ currentLesson: 1, completedLessons: [] }))
    expect(prev).toBeNull()
  })
})

describe('findNextLesson', () => {
  it('returns the immediate next lesson by order', () => {
    expect(findNextLesson(LESSONS, progress({}))?.order).toBe(4)
  })

  it('returns null past the last lesson', () => {
    expect(findNextLesson(LESSONS, progress({ currentLesson: 5 }))).toBeNull()
  })
})

describe('canAdvanceToNextLesson — never skip locked lessons', () => {
  it('false when the current lesson is not yet completed', () => {
    const current = lesson({ order: 3 })
    const next = lesson({ order: 4 })
    const ok = canAdvanceToNextLesson(current, next, {
      progress: progress({ completedLessons: [1, 2] }), // 3 not completed
      topicProgressMap: {}, availableTopicSlugs: ['phys.topic.4'],
    })
    expect(ok).toBe(false)
  })

  it('false when the next lesson is locked, even if current is completed', () => {
    const current = lesson({ order: 3 })
    const next = lesson({ order: 4 })
    const ok = canAdvanceToNextLesson(current, next, {
      progress: progress({ completedLessons: [1, 2, 3] }),
      topicProgressMap: {}, availableTopicSlugs: [], // 4 not unlocked
    })
    expect(ok).toBe(false)
  })

  it('true when current is completed and next is unlocked', () => {
    const current = lesson({ order: 3 })
    const next = lesson({ order: 4 })
    const ok = canAdvanceToNextLesson(current, next, {
      progress: progress({ completedLessons: [1, 2, 3] }),
      topicProgressMap: {}, availableTopicSlugs: ['phys.topic.4'],
    })
    expect(ok).toBe(true)
  })

  it('false when there is no next lesson (end of curriculum)', () => {
    const current = lesson({ order: 5 })
    const ok = canAdvanceToNextLesson(current, null, {
      progress: progress({ currentLesson: 5, completedLessons: [1, 2, 3, 4, 5] }),
      topicProgressMap: {}, availableTopicSlugs: [],
    })
    expect(ok).toBe(false)
  })
})
