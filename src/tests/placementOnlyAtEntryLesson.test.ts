/**
 * Placement verification is about the ENTRY lesson, never the lesson a learner
 * opened (2026-09-28, physics certification unit 2, intermediate accounts):
 * inside phys.mech.conservation-of-momentum the learner's answers were folded as
 * calibration results, the downward adjustment cleared activeLessonSlug, and the
 * next turn taught lesson one (SI units) inside the momentum lesson.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { isEligibleForPlacementVerification, shouldApplyDownwardAdjustment } from '@/lib/teaching/placementVerification'

describe('placement scope', () => {
  it('a learner in a lesson they opened, not the entry lesson, is not placement-probed', () => {
    expect(isEligibleForPlacementVerification({ nothingCompleted: true, currentLesson: 30, entryOrder: 30, taughtLesson: 52 })).toBe(false)
  })
  it('and is never lowered mid-lesson', () => {
    expect(shouldApplyDownwardAdjustment({ currentLesson: 30, originalEntryOrder: 30, taughtLesson: 52 })).toBe(false)
  })
  it('on the entry lesson itself, placement works exactly as before', () => {
    expect(isEligibleForPlacementVerification({ nothingCompleted: true, currentLesson: 30, entryOrder: 30, taughtLesson: 30 })).toBe(true)
    expect(shouldApplyDownwardAdjustment({ currentLesson: 30, originalEntryOrder: 30, taughtLesson: 30 })).toBe(true)
  })
  it('an unknown taught lesson keeps the previous behaviour', () => {
    expect(isEligibleForPlacementVerification({ nothingCompleted: true, currentLesson: 30, entryOrder: 30 })).toBe(true)
    expect(shouldApplyDownwardAdjustment({ currentLesson: 30, originalEntryOrder: 30, taughtLesson: null })).toBe(true)
  })
  it('the route passes the taught lesson to both checks', () => {
    const route = readFileSync('src/app/api/learn/chat/route.ts', 'utf8')
    expect(route.match(/taughtLesson: lessonCtx\?\.currentLesson \?\? null/g)?.length).toBe(2)
  })
})
