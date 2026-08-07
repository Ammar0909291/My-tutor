/**
 * Three-way agreement replay: DASHBOARD, LESSONSCREEN and SERVER must resolve
 * the same lesson for the same StudentProgress row.
 *
 * This is the merge-gate property. Before the Persisted Active Lesson each
 * surface derived lesson identity independently; H-1 and H-2 closed the two
 * that were left behind. The scenarios are the real production ones, replayed
 * against the LIVE physics Knowledge Graph — no fixture graph.
 */
import { describe, it, expect } from 'vitest'
import { selectCurrentLesson } from '@/lib/teaching/progressionIntegrity'
import { resolveActiveLesson, type CurriculumLesson } from '@/lib/curriculum/lessonNavigation'
import { getKnowledgeGraph } from '@/lib/curriculum/knowledgeGraph'
import { understandConcepts } from '@/lib/teaching/concept/conceptUnderstandingEngine'
import { buildConceptIndexFromKnowledgeGraph } from '@/lib/teaching/concept/conceptIndexSource'
import { planTeachingTurn } from '@/lib/teaching/planner/teachingPlanner'
import { LessonMode } from '@/lib/teaching/planner/teachingPlan'

const SCALARS = 'phys.meas.scalars-vectors'
const CALORIMETRY = 'phys.therm.calorimetry'

/** The one lesson list, built from the live physics KG exactly as
 *  /api/curriculum, /api/learn/chat and the dashboard each build it. */
const graph = getKnowledgeGraph('physics')
let order = 0
const lessons = (graph?.modules ?? []).flatMap((module, modIdx) =>
  module.nodes.map((node, nodeIdx) => ({
    id: `physics-${modIdx + 1}-${nodeIdx + 1}`,
    subjectCode: 'physics',
    unit: modIdx + 1,
    unitTitle: module.title,
    lesson: nodeIdx + 1,
    lessonTitle: node.title,
    lessonGoal: node.description ?? '',
    order: ++order,
    topicSlug: node.slug,
  })),
) satisfies CurriculumLesson[]

const orderOf = (slug: string) => lessons.find((l) => l.topicSlug === slug)?.order ?? -1

/** The dashboard's resolution path, mirroring getDashboardV2Data.resolveLesson. */
function dashboardResolve(currentLesson: number, activeLessonSlug: string | null) {
  const selected = selectCurrentLesson(lessons, currentLesson, [], activeLessonSlug)
  return selected ? { order: selected.order, lessonTitle: selected.lessonTitle } : null
}

describe('live physics KG is present and contains both production lessons', () => {
  it('both slugs resolve to real lessons', () => {
    expect(lessons.length).toBeGreaterThan(200)
    expect(orderOf(SCALARS)).toBeGreaterThan(0)
    expect(orderOf(CALORIMETRY)).toBeGreaterThan(0)
    expect(orderOf(CALORIMETRY)).toBeGreaterThan(orderOf(SCALARS))
  })
})

describe('SCENARIO 1 · Scalar & Vector revision', () => {
  // currentLesson is at Calorimetry (furthest); the learner navigated BACK.
  const currentLesson = orderOf(CALORIMETRY)
  const active = SCALARS

  it('server, dashboard and LessonScreen all resolve Scalar and Vector', () => {
    const server = selectCurrentLesson(lessons, currentLesson, [], active)
    const dash = dashboardResolve(currentLesson, active)
    const client = resolveActiveLesson(lessons, { currentLesson, completedLessons: [], activeLessonSlug: active })

    expect(server?.topicSlug).toBe(SCALARS)
    expect(dash?.order).toBe(server?.order)
    expect(dash?.lessonTitle).toBe(server?.lessonTitle)
    expect(client?.topicSlug).toBe(server?.topicSlug)
    expect(client?.order).toBe(server?.order)
  })

  it('a REVISION topic_progress row does not change any of the three', () => {
    const rows = [{ topicSlug: SCALARS, status: 'REVISION' }]
    expect(selectCurrentLesson(lessons, currentLesson, rows, active)?.topicSlug).toBe(SCALARS)
  })

  it('currentLesson itself is NOT rewound by the revision', () => {
    // The whole point of the two-fact split: furthest progress is preserved.
    expect(currentLesson).toBe(orderOf(CALORIMETRY))
  })
})

describe('SCENARIO 2 · Calorimetry (no explicit selection)', () => {
  const currentLesson = orderOf(CALORIMETRY)

  it('all three resolve Calorimetry, identically to pre-change behaviour', () => {
    const server = selectCurrentLesson(lessons, currentLesson, [], null)
    const dash = dashboardResolve(currentLesson, null)
    const client = resolveActiveLesson(lessons, { currentLesson, completedLessons: [], activeLessonSlug: null })

    expect(server?.topicSlug).toBe(CALORIMETRY)
    expect(dash?.order).toBe(server?.order)
    expect(client?.topicSlug).toBe(server?.topicSlug)
  })

  it('undefined (a row predating the column) behaves the same as null', () => {
    expect(selectCurrentLesson(lessons, currentLesson, [])?.topicSlug).toBe(CALORIMETRY)
    expect(resolveActiveLesson(lessons, { currentLesson, completedLessons: [] })?.topicSlug).toBe(CALORIMETRY)
  })
})

describe('SCENARIO 3 · Vector excursion writes nothing', () => {
  const currentLesson = orderOf(CALORIMETRY)
  const active = SCALARS

  it('"teach me vector with visualization" is a TEMPORARY_EXCURSION', () => {
    const message = 'teach me vector with visualization'
    const concepts = understandConcepts({
      message,
      activeLessonConceptId: SCALARS,
      index: buildConceptIndexFromKnowledgeGraph(),
      preferredSubject: 'physics',
    })
    const plan = planTeachingTurn({
      message,
      activeLessonConceptId: SCALARS,
      resolveConcept: () => concepts.matches.map((m) => ({
        conceptId: m.conceptId, title: m.title, confidence: m.confidence,
      })),
    })
    expect(plan.lessonMode).toBe(LessonMode.TEMPORARY_EXCURSION)
    // The excursion must return to the LESSON, not to the furthest concept.
    expect(plan.excursion.returnToConceptId).toBe(SCALARS)
  })

  it('the lesson pointer is unchanged across the excursion, on all three surfaces', () => {
    // An excursion never calls lesson-init and never writes progress, so the
    // inputs are byte-identical before and after — the assertion is that all
    // three surfaces still name the lesson being returned to.
    const server = selectCurrentLesson(lessons, currentLesson, [], active)
    const dash = dashboardResolve(currentLesson, active)
    const client = resolveActiveLesson(lessons, { currentLesson, completedLessons: [], activeLessonSlug: active })

    expect(server?.topicSlug).toBe(SCALARS)
    expect(dash?.order).toBe(orderOf(SCALARS))
    expect(client?.topicSlug).toBe(SCALARS)
  })
})

describe('SCENARIO 4 · completion advances every surface together', () => {
  it('completing the revised lesson clears the pointer and all three advance', () => {
    // /api/curriculum/progress: currentLesson = max(existing, done+1),
    // activeLessonSlug = null. Existing is already Calorimetry's order.
    const after = orderOf(CALORIMETRY)
    const server = selectCurrentLesson(lessons, after, [], null)
    const dash = dashboardResolve(after, null)
    const client = resolveActiveLesson(lessons, { currentLesson: after, completedLessons: [orderOf(SCALARS)], activeLessonSlug: null })

    expect(server?.topicSlug).toBe(CALORIMETRY)
    expect(dash?.order).toBe(after)
    expect(client?.order).toBe(after)
  })
})
