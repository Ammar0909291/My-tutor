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
import { detectNavigationIntent } from '@/lib/learn/navigationIntent'

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
  it('true when the current lesson is not yet completed but the next lesson is unlocked (students can move forward like a book; confirmLessonSwitch records the completion server-side)', () => {
    const current = lesson({ order: 3 })
    const next = lesson({ order: 4 })
    const ok = canAdvanceToNextLesson(current, next, {
      progress: progress({ completedLessons: [1, 2] }), // 3 not completed
      topicProgressMap: {}, availableTopicSlugs: ['phys.topic.4'],
    })
    expect(ok).toBe(true)
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

// ─── Intent Detector ─────────────────────────────────────────────────────────

describe('detectNavigationIntent — English', () => {
  it('next lesson', () => expect(detectNavigationIntent('next lesson')).toEqual({ kind: 'next' }))
  it('next', () => expect(detectNavigationIntent('next')).toEqual({ kind: 'next' }))
  it('continue to next', () => expect(detectNavigationIntent('continue to next')).toEqual({ kind: 'next' }))
  it('start next lesson', () => expect(detectNavigationIntent('start next lesson')).toEqual({ kind: 'next' }))
  it('previous lesson', () => expect(detectNavigationIntent('previous lesson')).toEqual({ kind: 'previous' }))
  it('go back', () => expect(detectNavigationIntent('go back')).toEqual({ kind: 'previous' }))
  it('restart lesson', () => expect(detectNavigationIntent('restart lesson')).toEqual({ kind: 'restart' }))
  it('start over', () => expect(detectNavigationIntent('start over')).toEqual({ kind: 'restart' }))
  it('review lesson', () => expect(detectNavigationIntent('review lesson')).toEqual({ kind: 'review' }))
  it('revision', () => expect(detectNavigationIntent('revision')).toEqual({ kind: 'review' }))
  it('resume lesson', () => expect(detectNavigationIntent('resume lesson')).toEqual({ kind: 'resume' }))
  it('lesson 5', () => expect(detectNavigationIntent('lesson 5')).toEqual({ kind: 'lesson_n', lessonNum: 5 }))
  it('go to lesson 12', () => expect(detectNavigationIntent('go to lesson 12')).toEqual({ kind: 'lesson_n', lessonNum: 12 }))
  it('open lesson 3', () => expect(detectNavigationIntent('open lesson 3')).toEqual({ kind: 'lesson_n', lessonNum: 3 }))
  it('jump to lesson 7', () => expect(detectNavigationIntent('jump to lesson 7')).toEqual({ kind: 'lesson_n', lessonNum: 7 }))
  it('bare number 15', () => expect(detectNavigationIntent('15')).toEqual({ kind: 'lesson_n', lessonNum: 15 }))
  it('case-insensitive NEXT LESSON', () => expect(detectNavigationIntent('NEXT LESSON')).toEqual({ kind: 'next' }))
  it('trims whitespace', () => expect(detectNavigationIntent('  next lesson  ')).toEqual({ kind: 'next' }))
})

describe('detectNavigationIntent — Russian', () => {
  it('следующий урок', () => expect(detectNavigationIntent('следующий урок')).toEqual({ kind: 'next' }))
  it('следующий', () => expect(detectNavigationIntent('следующий')).toEqual({ kind: 'next' }))
  it('далее', () => expect(detectNavigationIntent('далее')).toEqual({ kind: 'next' }))
  it('предыдущий урок', () => expect(detectNavigationIntent('предыдущий урок')).toEqual({ kind: 'previous' }))
  it('назад', () => expect(detectNavigationIntent('назад')).toEqual({ kind: 'previous' }))
  it('начать заново', () => expect(detectNavigationIntent('начать заново')).toEqual({ kind: 'restart' }))
  it('заново', () => expect(detectNavigationIntent('заново')).toEqual({ kind: 'restart' }))
  it('повторить урок', () => expect(detectNavigationIntent('повторить урок')).toEqual({ kind: 'review' }))
  it('урок 5', () => expect(detectNavigationIntent('урок 5')).toEqual({ kind: 'lesson_n', lessonNum: 5 }))
  it('перейти к уроку 8', () => expect(detectNavigationIntent('перейти к уроку 8')).toEqual({ kind: 'lesson_n', lessonNum: 8 }))
})

describe('detectNavigationIntent — Hindi / Hinglish', () => {
  it('agla lesson', () => expect(detectNavigationIntent('agla lesson')).toEqual({ kind: 'next' }))
  it('pichla lesson', () => expect(detectNavigationIntent('pichla lesson')).toEqual({ kind: 'previous' }))
  it('dobara shuru', () => expect(detectNavigationIntent('dobara shuru')).toEqual({ kind: 'restart' }))
  it('review karo', () => expect(detectNavigationIntent('review karo')).toEqual({ kind: 'review' }))
  it('resume karo', () => expect(detectNavigationIntent('resume karo')).toEqual({ kind: 'resume' }))
})

describe('detectNavigationIntent — non-navigation content (must return null)', () => {
  it('ignores a teaching question', () => expect(detectNavigationIntent('can you explain what a function is?')).toBeNull())
  it('ignores a long sentence', () => expect(detectNavigationIntent('I finished lesson 5, what should I do next in the curriculum?')).toBeNull())
  it('ignores empty string', () => expect(detectNavigationIntent('')).toBeNull())
  it('ignores a math question', () => expect(detectNavigationIntent('how do I solve a quadratic equation step by step?')).toBeNull())
  it('ignores "can you review my code?"', () => expect(detectNavigationIntent('can you review my code?')).toBeNull())
  it('ignores "I want to continue learning about loops"', () => expect(detectNavigationIntent('I want to continue learning about loops')).toBeNull())
  it('ignores "I don\'t understand the previous example"', () => expect(detectNavigationIntent("I don't understand the previous example")).toBeNull())
  it('ignores "let me try the next example"', () => expect(detectNavigationIntent("let me try the next example")).toBeNull())
})
