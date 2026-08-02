import { describe, it, expect } from 'vitest'
import { PHASE_ORDER } from '@/lib/teaching/conversationState'
import {
  LESSON_STAGES,
  PROGRESS_PHASE_ORDER,
  buildLessonProgress,
  isProgressPhase,
  stageIndexForPhase,
} from '@/lib/teaching/lessonProgress'

describe('lessonProgress — ladder fidelity', () => {
  it('mirrors the engine PHASE_ORDER exactly (anti-drift guard)', () => {
    // The copy exists to keep the teaching engine out of the client bundle;
    // if the real ladder ever changes, this fails instead of the bar quietly
    // mis-reporting the learner's position.
    expect(PROGRESS_PHASE_ORDER).toEqual(PHASE_ORDER)
  })

  it('has exactly one stage per phase, in ladder order', () => {
    expect(LESSON_STAGES.map((s) => s.phase)).toEqual(PROGRESS_PHASE_ORDER)
  })

  it('exposes the six requested learner-facing stage names in order', () => {
    expect(LESSON_STAGES.map((s) => s.label)).toEqual([
      'Introduction', 'Explanation', 'Examples',
      'Guided Practice', 'Mastery Check', 'Summary',
    ])
  })
})

describe('stageIndexForPhase', () => {
  it('maps each phase to its ordinal', () => {
    expect(stageIndexForPhase('OBSERVE')).toBe(0)
    expect(stageIndexForPhase('GUIDE')).toBe(2)
    expect(stageIndexForPhase('TRANSFER')).toBe(5)
  })

  it('returns -1 for anything unrecognised', () => {
    expect(stageIndexForPhase(undefined)).toBe(-1)
    expect(stageIndexForPhase(null)).toBe(-1)
    expect(stageIndexForPhase('NOT_A_PHASE')).toBe(-1)
    expect(stageIndexForPhase(3)).toBe(-1)
  })
})

describe('isProgressPhase', () => {
  it('accepts real phases and rejects everything else', () => {
    expect(isProgressPhase('CHECK')).toBe(true)
    expect(isProgressPhase('check')).toBe(false)
    expect(isProgressPhase({})).toBe(false)
  })
})

describe('buildLessonProgress', () => {
  it('returns null before a trustworthy phase exists (renders nothing)', () => {
    expect(buildLessonProgress(undefined)).toBeNull()
    expect(buildLessonProgress('NOPE')).toBeNull()
  })

  it('advances monotonically across the arc', () => {
    const percents = PROGRESS_PHASE_ORDER.map((p) => buildLessonProgress(p)!.percent)
    expect(percents).toEqual([17, 33, 50, 67, 83, 100])
    for (let i = 1; i < percents.length; i++) {
      expect(percents[i]).toBeGreaterThan(percents[i - 1])
    }
  })

  it('reports the learner-facing stage for the phase', () => {
    expect(buildLessonProgress('DEMONSTRATE')!.stage.label).toBe('Explanation')
    expect(buildLessonProgress('PRACTICE')!.stage.label).toBe('Mastery Check')
  })

  it('is not "complete" merely by reaching the last stage', () => {
    const atSummary = buildLessonProgress('TRANSFER', false)!
    expect(atSummary.complete).toBe(false)
  })

  it('marks complete only when the server verified mastery', () => {
    const verified = buildLessonProgress('TRANSFER', true)!
    expect(verified.complete).toBe(true)
    expect(verified.percent).toBe(100)
  })

  it('pins to 100 when mastery is verified early', () => {
    const early = buildLessonProgress('CHECK', true)!
    expect(early.percent).toBe(100)
    expect(early.complete).toBe(true)
  })

  it('always reports the full stage count', () => {
    expect(buildLessonProgress('OBSERVE')!.totalStages).toBe(6)
  })
})
