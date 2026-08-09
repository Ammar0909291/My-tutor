/**
 * LESSON IDENTITY ⇄ EXCURSION RETURN ANCHOR.
 *
 * THE PRODUCTION FAILURE (verified against the live database, 2026-08-09,
 * session cmslsfnt10003l104d2jv2iin):
 *
 *   opener:  "Today you're starting Lesson 32 of 238 … Conservative and
 *             Non-Conservative Forces"
 *   learner: "Explain Viscosity with a diagram"   → excursion opens correctly
 *   learner: three doubts                          → excursion stays open (correct)
 *   learner: "I understand now"
 *   tutor:   "Now, returning to our main lesson on \"SI Units and Measurement\""
 *            …and then taught SI Units.
 *
 * The persisted state at that moment:
 *   profiles.currentLevel            = 'advanced'
 *   student_progress                 = NO ROW (created later, currentLesson 1)
 *   contextSnapshot.currentConceptNodeId = 'phys.meas.units'
 *
 * ROOT CAUSE — two resolvers, one missing tier. With no StudentProgress row,
 * /api/curriculum and getDashboardV2Data answer with the PLACEMENT ENTRY ORDER
 * (computeCurriculumEntryOrder → order 32 for physics/advanced). The chat route
 * had no such tier, so selectCurrentLesson fell through to its last resort,
 * lessons[0] → order 1, "SI Units and Measurement". The client displayed 32 and
 * the server taught 1, in the same session. The excursion then recorded its
 * return anchor faithfully — from the wrong lesson.
 *
 * These tests pin the two properties that failure needed: the resolvers must
 * agree, and the return anchor must be whatever the authoritative resolver says.
 */

import { describe, expect, it } from 'vitest'
import { selectCurrentLesson } from '@/lib/teaching/progressionIntegrity'
import { computeCurriculumEntryOrder } from '@/lib/curriculum/placement'
import { normalizeToCanonicalLevel } from '@/lib/curriculum/levels'
import { getKnowledgeGraph } from '@/lib/curriculum/knowledgeGraph'
import { resolveActiveLesson, type CurriculumLesson } from '@/lib/curriculum/lessonNavigation'
import {
  decideExcursion,
  parseExcursionState,
  NO_EXCURSION,
  type ExcursionState,
} from '@/lib/teaching/excursion'

const graph = getKnowledgeGraph('physics')!
let order = 0
const lessons = graph.modules.flatMap((module, modIdx) =>
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

const VISCOSITY = 'phys.mech.viscosity'
const SURFACE_TENSION = 'phys.mech.surface-tension'
const FIRST_LESSON = lessons[0]                       // phys.meas.units, "SI Units…"

/** The chat route's resolution, exactly as route.ts now computes it. */
function serverLesson(progress: {
  currentLesson?: number | null
  activeLessonSlug?: string | null
} | null, level: string | null | undefined) {
  const placementEntryOrder = progress
    ? null
    : computeCurriculumEntryOrder(graph, normalizeToCanonicalLevel(level))
  return selectCurrentLesson(
    lessons,
    progress?.currentLesson ?? placementEntryOrder,
    [],
    progress?.activeLessonSlug,
  ) ?? lessons[0]
}

/** /api/curriculum's resolution — `progress ?? defaultProgress`, then the client
 *  navigation helper the UI header uses. */
function clientLesson(progress: {
  currentLesson?: number | null
  activeLessonSlug?: string | null
  completedLessons?: number[]
} | null, level: string | null | undefined) {
  const effective = progress ?? {
    currentLesson: computeCurriculumEntryOrder(graph, normalizeToCanonicalLevel(level)),
    completedLessons: [] as number[],
  }
  return resolveActiveLesson(lessons, {
    currentLesson: effective.currentLesson ?? 1,
    completedLessons: effective.completedLessons ?? [],
    activeLessonSlug: effective.activeLessonSlug ?? null,
  })
}

// ── the exact production state ───────────────────────────────────────────────

describe('the reproduced production state: advanced learner, no progress row', () => {
  it('the placement entry order really is lesson 32, Conservative Forces', () => {
    const entry = computeCurriculumEntryOrder(graph, normalizeToCanonicalLevel('advanced'))
    expect(entry).toBe(32)
    expect(lessons[entry - 1].lessonTitle).toBe('Conservative and Non-Conservative Forces')
  })

  it('BOTH resolvers now answer the same lesson', () => {
    const server = serverLesson(null, 'advanced')
    const client = clientLesson(null, 'advanced')
    expect(server.topicSlug).toBe(client!.topicSlug)
    expect(server.lessonTitle).toBe('Conservative and Non-Conservative Forces')
    expect(server.order).toBe(32)
  })

  it('REGRESSION GUARD: the server must not fall back to lesson 1 any more', () => {
    // The pre-fix behaviour, reproduced by omitting the placement tier.
    const preFix = selectCurrentLesson(lessons, undefined, [], undefined) ?? lessons[0]
    expect(preFix.topicSlug).toBe(FIRST_LESSON.topicSlug)      // 'phys.meas.units'
    expect(preFix.lessonTitle).toBe('SI Units and Measurement')
    // …and the post-fix behaviour, which is the whole bug.
    expect(serverLesson(null, 'advanced').topicSlug).not.toBe(preFix.topicSlug)
  })

  it('the excursion return anchor follows the authoritative lesson', () => {
    const lesson = serverLesson(null, 'advanced')
    const d = decideExcursion({
      state: NO_EXCURSION,
      message: 'Explain Viscosity with a diagram',
      lessonConceptId: lesson.topicSlug,
      requestedConceptId: VISCOSITY,
      lastAssistantAskedQuestion: false,
    })
    expect(d.targetConceptId).toBe(VISCOSITY)
    expect(d.returnToConceptId).toBe(lesson.topicSlug)
    expect(d.returnToConceptId).not.toBe('phys.meas.units')
  })

  it('and closing it returns to THAT lesson, not to SI Units', () => {
    const lesson = serverLesson(null, 'advanced')
    const open: ExcursionState = {
      active: true, targetConceptId: VISCOSITY, returnToConceptId: lesson.topicSlug, turns: 3,
    }
    const closed = decideExcursion({
      state: open,
      message: 'I understand now',
      lessonConceptId: lesson.topicSlug,
      requestedConceptId: null,
      lastAssistantAskedQuestion: true,
    })
    expect(closed.justClosed).toBe(true)
    expect(closed.targetConceptId).toBe(lesson.topicSlug)
    expect(closed.targetConceptId).not.toBe('phys.meas.units')
  })
})

// ── resolver agreement, as a property ────────────────────────────────────────

describe('lesson identity agrees across every reader, for every state', () => {
  const cases: Array<{
    name: string
    progress: { currentLesson?: number | null; activeLessonSlug?: string | null } | null
    level: string | null
  }> = [
    { name: 'brand new beginner',       progress: null, level: 'beginner' },
    { name: 'brand new intermediate',   progress: null, level: 'intermediate' },
    { name: 'brand new advanced',       progress: null, level: 'advanced' },
    { name: 'brand new, level unknown', progress: null, level: null },
    { name: 'real row, lesson 1',       progress: { currentLesson: 1 }, level: 'advanced' },
    { name: 'real row, lesson 32',      progress: { currentLesson: 32 }, level: 'beginner' },
    { name: 'explicit navigation back', progress: { currentLesson: 32, activeLessonSlug: lessons[6].topicSlug }, level: 'advanced' },
  ]

  it.each(cases)('$name — server and client resolve the same lesson', ({ progress, level }) => {
    const server = serverLesson(progress, level)
    const client = clientLesson(progress, level)
    expect(client).not.toBeNull()
    expect(server.topicSlug).toBe(client!.topicSlug)
    expect(server.order).toBe(client!.order)
  })

  it('a real progress row always wins over the placement default', () => {
    // The placement default must never override genuine progress, in either
    // direction — an advanced learner who has actually reached lesson 3 is on
    // lesson 3, and a beginner row at 32 stays at 32.
    expect(serverLesson({ currentLesson: 3 }, 'advanced').order).toBe(3)
    expect(serverLesson({ currentLesson: 32 }, 'beginner').order).toBe(32)
  })

  it('explicit navigation still outranks everything', () => {
    const target = lessons[6]
    expect(serverLesson({ currentLesson: 32, activeLessonSlug: target.topicSlug }, 'advanced').topicSlug)
      .toBe(target.topicSlug)
  })
})

// ── the required regression cases A–H ────────────────────────────────────────

describe('excursion return anchor — cases A–H', () => {
  const LESSON = serverLesson(null, 'advanced').topicSlug     // Conservative Forces

  it('A · a normal lesson turn is unchanged and opens nothing', () => {
    const d = decideExcursion({
      state: NO_EXCURSION, message: 'a conservative force stores energy',
      lessonConceptId: LESSON, requestedConceptId: null, lastAssistantAskedQuestion: true,
    })
    expect(d.state).toEqual(NO_EXCURSION)
    expect(d.targetConceptId).toBe(LESSON)
  })

  it('B · Lesson A -> Concept B returns to Lesson A', () => {
    const d = decideExcursion({
      state: NO_EXCURSION, message: 'explain viscosity',
      lessonConceptId: LESSON, requestedConceptId: VISCOSITY, lastAssistantAskedQuestion: false,
    })
    expect(d.returnToConceptId).toBe(LESSON)
  })

  it('C · several doubts keep the anchor exactly where it was', () => {
    let state: ExcursionState = {
      active: true, targetConceptId: VISCOSITY, returnToConceptId: LESSON, turns: 0,
    }
    for (const message of ["I don't understand", 'still confused', 'I still don\'t get it', 'why?']) {
      const d = decideExcursion({
        state, message, lessonConceptId: LESSON, requestedConceptId: null,
        lastAssistantAskedQuestion: true,
      })
      expect(d.state.active, message).toBe(true)
      expect(d.returnToConceptId, message).toBe(LESSON)
      state = d.state
    }
  })

  it('D · Lesson A -> B -> C keeps ONE anchor, never a chain', () => {
    const first = decideExcursion({
      state: NO_EXCURSION, message: 'explain viscosity',
      lessonConceptId: LESSON, requestedConceptId: VISCOSITY, lastAssistantAskedQuestion: false,
    })
    const second = decideExcursion({
      state: first.state, message: 'now explain surface tension',
      lessonConceptId: LESSON, requestedConceptId: SURFACE_TENSION, lastAssistantAskedQuestion: false,
    })
    expect(second.targetConceptId).toBe(SURFACE_TENSION)
    expect(second.returnToConceptId).toBe(LESSON)
    expect(second.state.returnToConceptId).toBe(LESSON)
  })

  it('E · a refresh (snapshot round-trip) preserves the anchor', () => {
    const open = decideExcursion({
      state: NO_EXCURSION, message: 'explain viscosity',
      lessonConceptId: LESSON, requestedConceptId: VISCOSITY, lastAssistantAskedQuestion: false,
    }).state
    const revived = parseExcursionState(JSON.parse(JSON.stringify(open)))
    expect(revived).toEqual(open)
    expect(revived.returnToConceptId).toBe(LESSON)
  })

  it('F · satisfaction returns to Lesson A', () => {
    const d = decideExcursion({
      state: { active: true, targetConceptId: VISCOSITY, returnToConceptId: LESSON, turns: 2 },
      message: 'I understand now', lessonConceptId: LESSON, requestedConceptId: null,
      lastAssistantAskedQuestion: true,
    })
    expect(d.targetConceptId).toBe(LESSON)
    expect(d.state).toEqual(NO_EXCURSION)
  })

  it('G · an excursion opened from a NEW lesson returns to the new one', () => {
    const lessonB = lessons[40].topicSlug
    const d = decideExcursion({
      state: NO_EXCURSION, message: 'explain viscosity',
      lessonConceptId: lessonB, requestedConceptId: VISCOSITY, lastAssistantAskedQuestion: false,
    })
    expect(d.returnToConceptId).toBe(lessonB)
    expect(d.returnToConceptId).not.toBe(LESSON)
  })

  it('H · a STALE persisted anchor cannot capture the current lesson', () => {
    // The excursion carried in points at a lesson the learner is no longer on.
    const stale: ExcursionState = {
      active: true, targetConceptId: VISCOSITY, returnToConceptId: 'phys.meas.units', turns: 5,
    }
    const d = decideExcursion({
      state: stale, message: 'ok', lessonConceptId: LESSON,
      requestedConceptId: null, lastAssistantAskedQuestion: true,
    })
    // It is discarded, not honoured, and never becomes the teaching target.
    expect(d.transition).toBe('closed-lesson-changed')
    expect(d.targetConceptId).toBe(LESSON)
    expect(d.state).toEqual(NO_EXCURSION)
  })

  it('H · corrupt persisted state fails safe', () => {
    expect(parseExcursionState('nonsense')).toEqual(NO_EXCURSION)
    expect(parseExcursionState({ active: true, targetConceptId: VISCOSITY, returnToConceptId: 42 }).returnToConceptId)
      .toBeNull()
  })
})
