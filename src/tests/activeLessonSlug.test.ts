/**
 * Persisted Active Lesson.
 *
 * The production case these tests encode: student_progress.currentLesson = 74
 * ("Calorimetry"), the learner explicitly navigated back to lesson 7 ("Scalar
 * and Vector Quantities") to revise, the browser displayed lesson 7 and the
 * server kept teaching Calorimetry — because no server-side fact could
 * represent a backward move. currentLesson is monotonic by construction.
 */
import { describe, it, expect } from 'vitest'
import { selectCurrentLesson } from '@/lib/teaching/progressionIntegrity'
import { resolveActiveLesson } from '@/lib/curriculum/lessonNavigation'
import type { CurriculumLesson, CurriculumProgress } from '@/lib/curriculum/lessonNavigation'

const SCALARS = 'phys.meas.scalars-vectors'
const CALORIMETRY = 'phys.therm.calorimetry'

const lessons = [
  { order: 7, topicSlug: SCALARS, lessonTitle: 'Scalar and Vector Quantities' },
  { order: 74, topicSlug: CALORIMETRY, lessonTitle: 'Calorimetry' },
]

describe('selectCurrentLesson · activeLessonSlug tier', () => {
  it('resolves the exact production divergence: revision beats furthest progress', () => {
    const selected = selectCurrentLesson(lessons, 74, [], SCALARS)
    expect(selected?.topicSlug).toBe(SCALARS)
    expect(selected?.lessonTitle).toBe('Scalar and Vector Quantities')
  })

  it('outranks currentLesson even when topic_progress agrees with currentLesson', () => {
    const selected = selectCurrentLesson(lessons, 74, [
      { topicSlug: CALORIMETRY, status: 'IN_PROGRESS' },
    ], SCALARS)
    expect(selected?.topicSlug).toBe(SCALARS)
  })

  it('points FORWARD just as happily — it is a pointer, not a rewind', () => {
    expect(selectCurrentLesson(lessons, 7, [], CALORIMETRY)?.topicSlug).toBe(CALORIMETRY)
  })

  it('NULL is the pre-existing behaviour exactly — no backfill needed', () => {
    expect(selectCurrentLesson(lessons, 74, [], null)?.topicSlug).toBe(CALORIMETRY)
    expect(selectCurrentLesson(lessons, 74, [])?.topicSlug).toBe(CALORIMETRY)
    expect(selectCurrentLesson(lessons, 74, [], undefined)?.topicSlug).toBe(CALORIMETRY)
  })

  it('an empty or whitespace slug is treated as absent, not as a miss', () => {
    expect(selectCurrentLesson(lessons, 74, [], '')?.topicSlug).toBe(CALORIMETRY)
    expect(selectCurrentLesson(lessons, 74, [], '   ')?.topicSlug).toBe(CALORIMETRY)
  })

  it('a slug that no longer resolves degrades to the old tiers, never throws', () => {
    const selected = selectCurrentLesson(lessons, 74, [], 'chem.found.matter')
    expect(selected?.topicSlug).toBe(CALORIMETRY)
  })

  it('a stale slug falls through to topic_progress when currentLesson is unusable', () => {
    const selected = selectCurrentLesson(lessons, null, [
      { topicSlug: SCALARS, status: 'IN_PROGRESS' },
    ], 'gone.away')
    expect(selected?.topicSlug).toBe(SCALARS)
  })

  it('a stale slug with nothing else known still returns the first lesson', () => {
    expect(selectCurrentLesson(lessons, null, [], 'gone.away')?.topicSlug).toBe(SCALARS)
  })

  it('an empty lesson list returns null regardless of the slug', () => {
    expect(selectCurrentLesson([], 74, [], SCALARS)).toBeNull()
  })

  it('stays pure and order-invariant', () => {
    const reversed = [...lessons].reverse()
    expect(selectCurrentLesson(reversed, 74, [], SCALARS)?.topicSlug).toBe(SCALARS)
    expect(lessons[0]?.order).toBe(7)   // input not mutated
  })

  it('the excursion case writes nothing, so the pointer must be unchanged', () => {
    // A concept excursion ("teach me vector") never calls lesson-init, so
    // activeLessonSlug still names the lesson the learner will return to.
    const before = selectCurrentLesson(lessons, 74, [], SCALARS)
    const after = selectCurrentLesson(lessons, 74, [], SCALARS)
    expect(after?.topicSlug).toBe(before?.topicSlug)
    expect(after?.topicSlug).toBe(SCALARS)
  })

  it('after completion clears the pointer, the advanced counter governs', () => {
    // /api/curriculum/progress raises currentLesson and sets the slug to NULL.
    expect(selectCurrentLesson(lessons, 74, [], null)?.topicSlug).toBe(CALORIMETRY)
  })
})

// ── H-2: the client must resolve the SAME lesson as the server ────────────

const clientLessons: CurriculumLesson[] = [
  { id: 'p-1-7', subjectCode: 'physics', unit: 1, unitTitle: 'Measurement', lesson: 7, lessonTitle: 'Scalar and Vector Quantities', lessonGoal: '', order: 7, topicSlug: SCALARS },
  { id: 'p-9-74', subjectCode: 'physics', unit: 9, unitTitle: 'Thermodynamics', lesson: 4, lessonTitle: 'Calorimetry', lessonGoal: '', order: 74, topicSlug: CALORIMETRY },
]
const progress = (p: Partial<CurriculumProgress>): CurriculumProgress =>
  ({ currentLesson: 74, completedLessons: [], ...p })

describe('resolveActiveLesson · client/server agreement', () => {
  it('client agrees with the server on the revision case', () => {
    const client = resolveActiveLesson(clientLessons, progress({ activeLessonSlug: SCALARS }))
    const server = selectCurrentLesson(lessons, 74, [], SCALARS)
    expect(client?.topicSlug).toBe(SCALARS)
    expect(client?.topicSlug).toBe(server?.topicSlug)
    expect(client?.order).toBe(server?.order)
  })

  it('client agrees with the server on the Calorimetry (no override) case', () => {
    const client = resolveActiveLesson(clientLessons, progress({ activeLessonSlug: null }))
    const server = selectCurrentLesson(lessons, 74, [], null)
    expect(client?.topicSlug).toBe(CALORIMETRY)
    expect(client?.topicSlug).toBe(server?.topicSlug)
  })

  it('absent activeLessonSlug is the pre-existing client behaviour exactly', () => {
    expect(resolveActiveLesson(clientLessons, progress({}))?.order).toBe(74)
  })

  it('a stale slug degrades to currentLesson rather than breaking the screen', () => {
    expect(resolveActiveLesson(clientLessons, progress({ activeLessonSlug: 'gone.away' }))?.order).toBe(74)
  })

  it('legacy lessons with no topicSlug keep the old order-based behaviour', () => {
    const legacy: CurriculumLesson[] = [
      { id: 'c-1', subjectCode: 'c', unit: 1, unitTitle: 'U', lesson: 1, lessonTitle: 'Pointers', lessonGoal: '', order: 1 },
      { id: 'c-2', subjectCode: 'c', unit: 1, unitTitle: 'U', lesson: 2, lessonTitle: 'Structs', lessonGoal: '', order: 2 },
    ]
    expect(resolveActiveLesson(legacy, { currentLesson: 2, completedLessons: [] })?.order).toBe(2)
    expect(resolveActiveLesson(legacy, { currentLesson: 99, completedLessons: [] })?.order).toBe(1)
  })

  it('an empty lesson list returns null', () => {
    expect(resolveActiveLesson([], progress({ activeLessonSlug: SCALARS }))).toBeNull()
  })

  it('completion: clearing the slug moves the client off the finished lesson', () => {
    // The hazard the chat reconciliation guards: after completing lesson 7 the
    // server advances the order AND clears the slug. If the client kept the
    // stale slug, tier 0 would pin it to the lesson just finished.
    const stale = resolveActiveLesson(clientLessons, progress({ currentLesson: 74, activeLessonSlug: SCALARS }))
    expect(stale?.order).toBe(7)
    const reconciled = resolveActiveLesson(clientLessons, progress({ currentLesson: 74, activeLessonSlug: null }))
    expect(reconciled?.order).toBe(74)
  })
})
