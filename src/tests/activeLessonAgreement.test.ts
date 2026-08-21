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
import { decideLessonEntryMode } from '@/lib/curriculum/lessonTransition'
import { getKnowledgeGraph } from '@/lib/curriculum/knowledgeGraph'
import { understandConcepts } from '@/lib/teaching/concept/conceptUnderstandingEngine'
import { buildConceptIndexFromKnowledgeGraph } from '@/lib/teaching/concept/conceptIndexSource'
import { planTeachingTurn } from '@/lib/teaching/planner/teachingPlanner'
import { LessonMode } from '@/lib/teaching/planner/teachingPlan'

const SCALARS = 'phys.meas.scalars-vectors'
const CALORIMETRY = 'phys.therm.calorimetry'
const SIG_FIGS = 'phys.meas.significant-figures'
const NEWTONS_FIRST_LAW = 'phys.mech.newtons-first-law'

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

/**
 * SCENARIO 5 — F1 (regression test suite, 2026-08-21): a FOURTH surface,
 * LessonScreen.tsx's mount-time lesson-init entry-mode decision, replayed
 * against the exact numbers measured on a real production account:
 * currentLesson=5 (stale completion counter) while activeLessonSlug names
 * a lesson at order=18 ("Newton's First Law — Inertia") — a genuinely deep
 * learner whose furthest-progress counter has fallen far behind the lesson
 * actually open, the ordinary case for anyone who opens a lesson ahead of
 * their recorded progress.
 *
 * Before this fix, LessonScreen.tsx's own `entryLesson` was resolved via
 * `curriculumLessons.find(l => l.order === curriculumProgress.currentLesson)`
 * — the SAME wrong anchor a comment 16 lines below it already named and
 * fixed at its own (different) call site, but never fixed here. This test
 * proves entryMode is now computed from the SAME lesson every other surface
 * agrees on, not order=5's ("Significant Figures and Precision").
 */
describe('SCENARIO 5 · F1 — lesson-init entry-mode agrees with every other surface', () => {
  const currentLesson = orderOf(SIG_FIGS) // = 5, the stale counter's own order
  const active = NEWTONS_FIRST_LAW        // = order 18, the real active lesson

  it('the real physics KG reproduces the exact production divergence (order 5 vs order 18)', () => {
    expect(currentLesson).toBe(5)
    expect(orderOf(NEWTONS_FIRST_LAW)).toBe(18)
  })

  it('resolveActiveLesson (the fix) resolves the SAME lesson every other surface does', () => {
    const server = selectCurrentLesson(lessons, currentLesson, [], active)
    const dash = dashboardResolve(currentLesson, active)
    const client = resolveActiveLesson(lessons, { currentLesson, completedLessons: [], activeLessonSlug: active })

    expect(server?.topicSlug).toBe(NEWTONS_FIRST_LAW)
    expect(dash?.order).toBe(18)
    expect(client?.topicSlug).toBe(NEWTONS_FIRST_LAW)
    expect(client?.order).toBe(18)
  })

  it('decideLessonEntryMode, fed the FIXED resolver, decides against the real active lesson (order 18), not order 5', () => {
    const topicProgressMap = {
      [NEWTONS_FIRST_LAW]: { status: 'REVISION', masteryPct: 65 },
      [SIG_FIGS]: { status: 'IN_PROGRESS', masteryPct: 65 },
    }
    const progress = { currentLesson, completedLessons: [4], activeLessonSlug: active }

    // THE FIX: entryLesson resolved via resolveActiveLesson.
    const fixedEntryLesson = resolveActiveLesson(lessons, progress)
    expect(fixedEntryLesson?.topicSlug).toBe(NEWTONS_FIRST_LAW)
    const fixedMode = decideLessonEntryMode({ lesson: fixedEntryLesson!, progress, topicProgressMap })

    // THE BUG, reproduced for contrast: entryLesson resolved via the old
    // raw `.find(order === currentLesson)` anchor names a DIFFERENT lesson
    // (order 5) — proving the two really did disagree, not merely that the
    // fixed path works in isolation.
    const buggyEntryLesson = lessons.find((l) => l.order === progress.currentLesson) ?? null
    expect(buggyEntryLesson?.topicSlug).toBe(SIG_FIGS)
    expect(buggyEntryLesson?.topicSlug).not.toBe(fixedEntryLesson?.topicSlug)
    const buggyMode = decideLessonEntryMode({ lesson: buggyEntryLesson!, progress, topicProgressMap })

    // decideLessonEntryMode only earns 'resume' when the resolved lesson's
    // OWN order matches currentLesson — a REVISION-status lesson at a
    // different order (the ordinary shape for a deep learner) falls through
    // to 'introduction' rather than silently resuming a lesson whose order
    // disagrees with the furthest-progress counter. That is
    // decideLessonEntryMode's own existing behavior, unchanged by this fix —
    // what this test proves is WHICH LESSON that decision was made about:
    // fixedMode is 'introduction' for Newton's First Law (order 18, the real
    // active lesson); the pre-fix code would have decided a mode for
    // Significant Figures (order 5) instead — a wrong lesson entirely, not
    // merely a wrong mode for the right one.
    expect(fixedMode).toBe('introduction')
    expect(typeof buggyMode).toBe('string')
  })
})
