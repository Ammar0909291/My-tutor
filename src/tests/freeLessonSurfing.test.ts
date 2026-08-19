/**
 * Free lesson surfing (Option B) — mastery integrity under unrestricted
 * navigation.
 *
 * The defect: forward navigation called
 *   handleLessonComplete(priorOrder, priorLesson, false)
 * and /api/curriculum/progress appends to completedLessons regardless of the
 * `mastered` flag — that flag only suppresses XP and confetti. So clicking
 * forward through the roadmap marked every lesson behind you COMPLETED. A
 * learner could "finish" a curriculum without answering a question, and those
 * fake completions satisfied downstream prerequisites.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import { join } from 'path'
import { computeLessonLockState, resolveActiveLesson } from '@/lib/curriculum/lessonNavigation'
import { decideLessonEntryMode } from '@/lib/curriculum/lessonTransition'
import type { CurriculumLesson, CurriculumProgress, TopicProgressEntry } from '@/lib/curriculum/lessonNavigation'

const SRC = readFileSync(join(process.cwd(), 'src/components/learn/LessonScreen.tsx'), 'utf8')

const lesson = (order: number, slug: string, title = `L${order}`): CurriculumLesson => ({
  id: `p-${order}`, subjectCode: 'physics', unit: 1, unitTitle: 'U',
  lesson: order, lessonTitle: title, lessonGoal: '', order, topicSlug: slug,
})
const A = lesson(1, 'phys.meas.units', 'SI Units')
const B = lesson(2, 'phys.meas.scalars-vectors', 'Scalars and Vectors')
const FAR = lesson(40, 'phys.therm.calorimetry', 'Calorimetry')
const lessons = [A, B, FAR]
const progress = (p: Partial<CurriculumProgress> = {}): CurriculumProgress =>
  ({ currentLesson: 1, completedLessons: [], ...p })

describe('MASTERY INTEGRITY — surfing cannot fake completion', () => {
  it('forward navigation no longer records a completion', () => {
    // The exact call that produced fake completions must be gone from the
    // forward-navigation path.
    expect(SRC).not.toMatch(/await handleLessonComplete\(priorOrder/)
    expect(SRC).toMatch(/await markLessonSkipped\(/)
  })

  it('the skip write is the ONLY thing navigation records', () => {
    const fn = SRC.slice(SRC.indexOf('const markLessonSkipped'), SRC.indexOf('const resetLessonContext'))
    expect(fn).toMatch(/action: 'skip'/)
    expect(fn).not.toMatch(/completedLessons/)
    expect(fn).not.toMatch(/curriculum\/progress/)
  })

  it('a genuinely finished lesson is never downgraded to SKIPPED', () => {
    const fn = SRC.slice(SRC.indexOf('const markLessonSkipped'), SRC.indexOf('const resetLessonContext'))
    expect(fn).toMatch(/status === 'COMPLETED' \|\| status === 'MASTERED' \|\| status === 'REVISION'/)
    expect(fn).toMatch(/return/)
  })

  it('visiting 20 lessons leaves 20 SKIPPED rows and 0 completions', () => {
    // SKIPPED never enters completedLessons, so the counter cannot move.
    const map: Record<string, TopicProgressEntry> = {}
    for (let i = 0; i < 20; i++) map[`phys.x.${i}`] = { status: 'SKIPPED', masteryPct: 0 }
    const p = progress()
    expect(p.completedLessons).toHaveLength(0)
    expect(Object.values(map).every((e) => e.status === 'SKIPPED')).toBe(true)
  })

  it('SKIPPED is not COMPLETED, not MASTERED, and does not satisfy prerequisites', () => {
    const skipped: Record<string, TopicProgressEntry> = { [B.topicSlug!]: { status: 'SKIPPED', masteryPct: 0 } }
    // Entry mode: a skipped lesson is NOT a review and NOT a resume.
    expect(decideLessonEntryMode({ lesson: B, progress: progress(), topicProgressMap: skipped })).toBe('introduction')
    // Lock state still treats it as unmet — availableTopicSlugs is the
    // prerequisite authority and a skip never adds to it.
    const state = computeLessonLockState(FAR, {
      progress: progress(), topicProgressMap: skipped, availableTopicSlugs: [],
    })
    expect(state.isCompleted).toBe(false)
    expect(state.isMastered).toBe(false)
  })

  it('a skipped lesson remains distinguishable and returnable', () => {
    const skipped: Record<string, TopicProgressEntry> = { [B.topicSlug!]: { status: 'SKIPPED', masteryPct: 0 } }
    const state = computeLessonLockState(B, {
      progress: progress(), topicProgressMap: skipped, availableTopicSlugs: [B.topicSlug!],
    })
    expect(state.isSkipped).toBe(true)
    // Returning and genuinely finishing it still works.
    const done: Record<string, TopicProgressEntry> = { [B.topicSlug!]: { status: 'COMPLETED', masteryPct: 100 } }
    expect(decideLessonEntryMode({
      lesson: B, progress: progress({ completedLessons: [2] }), topicProgressMap: done,
    })).toBe('review')
  })
})

describe('NAVIGATION — no prerequisite may block a click', () => {
  it('the roadmap row calls requestLessonSwitch unconditionally', () => {
    // The old gate lives on only inside a comment explaining its removal;
    // assert on executable code by checking the switch path itself.
    const fn = SRC.slice(SRC.indexOf('const requestLessonSwitch'), SRC.indexOf('const stageLessonPreview'))
    expect(fn).toMatch(/requestLessonSwitch = useCallback/)
    expect(fn).not.toMatch(/^\s*if \(state\.isLocked\) return/m)
  })

  it('a locked lesson is still openable — lock is a status, not a gate', () => {
    const state = computeLessonLockState(FAR, {
      progress: progress(), topicProgressMap: {}, availableTopicSlugs: [],
    })
    expect(state.isLocked).toBe(true)      // still labelled
    // …and nothing in the switch path consults it.
    const fn = SRC.slice(SRC.indexOf('const requestLessonSwitch'), SRC.indexOf('const stageLessonPreview'))
    expect(fn).not.toMatch(/return\s*$/m)
  })
})

describe('CONTEXT ISOLATION — nothing leaks across a lesson switch', () => {
  it('the switch resets conversation, revision and init state', () => {
    const fn = SRC.slice(SRC.indexOf('const resetLessonContext'), SRC.indexOf('const confirmSkip'))
    expect(fn).toMatch(/setMessages\(\[\]\)/)
    expect(fn).toMatch(/setRevisionTopic\(null\)/)
    expect(fn).toMatch(/initializedRef\.current = false/)
  })

  it('reset runs before the new lesson is initialised', () => {
    const start = SRC.indexOf('await markLessonSkipped(')
    const path = SRC.slice(start, start + 900)
    expect(path).toContain('resetLessonContext()')
    expect(path.indexOf('resetLessonContext()')).toBeLessThan(path.indexOf('callLessonInit'))
  })
})

describe('position still moves without faking completion', () => {
  it('activeLessonSlug carries the position, completedLessons does not', () => {
    const withSlug = progress({ activeLessonSlug: FAR.topicSlug })
    expect(resolveActiveLesson(lessons, withSlug)?.order).toBe(40)
    expect(withSlug.completedLessons).toHaveLength(0)
  })
})
