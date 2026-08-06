/**
 * Teaching Planner — orchestration decision tests.
 *
 * The load-bearing case is the one from the investigation: a Newton's Second
 * Law visualization request while Calorimetry is the active lesson must plan
 * a temporary excursion to Newton's Second Law, not stay locked to the lesson.
 */
import { describe, it, expect } from 'vitest'
import { planTeachingTurn } from '@/lib/teaching/planner/teachingPlanner'
import {
  TeachingIntent, LessonMode, ExecutionStep,
  type ConceptResolver, type PlannerInputs,
} from '@/lib/teaching/planner/teachingPlan'

const CALORIMETRY = 'phys.therm.calorimetry'
const NEWTON_2 = 'phys.mech.newtons-second-law'
const MOMENTUM = 'phys.mech.momentum'

/** Deterministic stub resolver — the planner does not own concept
 *  resolution, so tests inject a fixed keyword table. */
const resolver: ConceptResolver = (text) => {
  const lower = text.toLowerCase()
  const out: { conceptId: string; title: string; confidence: number }[] = []
  if (/newton'?s\s+second\s+law/.test(lower)) out.push({ conceptId: NEWTON_2, title: "Newton's Second Law", confidence: 0.95 })
  if (/momentum/.test(lower)) out.push({ conceptId: MOMENTUM, title: 'Linear Momentum', confidence: 0.9 })
  if (/calorimetry/.test(lower)) out.push({ conceptId: CALORIMETRY, title: 'Calorimetry', confidence: 0.9 })
  return out
}

const inLesson = (message: string, over: Partial<PlannerInputs> = {}): PlannerInputs => ({
  message,
  activeLessonConceptId: CALORIMETRY,
  resolveConcept: resolver,
  ...over,
})

describe('Teaching Planner · the investigation case', () => {
  it('plans a temporary excursion for a visualization request about another concept', () => {
    const plan = planTeachingTurn(inLesson("Explain Newton's Second Law with visualization."))
    expect(plan.intent).toBe(TeachingIntent.VISUALIZE_CONCEPT)
    expect(plan.targetConceptId).toBe(NEWTON_2)
    expect(plan.lessonMode).toBe(LessonMode.TEMPORARY_EXCURSION)
    expect(plan.excursion).toEqual({ isExcursion: true, returnToConceptId: CALORIMETRY, returnToLesson: true })
  })

  it('requires BOTH explanation and visualization, sequenced explanation-first', () => {
    const plan = planTeachingTurn(inLesson("Explain Newton's Second Law with visualization."))
    expect(plan.requires.explanation).toBe(true)
    expect(plan.requires.visualization).toBe(true)
    expect(plan.executionSequence).toEqual([
      ExecutionStep.EXPLANATION, ExecutionStep.VISUALIZATION, ExecutionStep.LESSON_RESUME,
    ])
  })

  it('never targets the lesson concept when another concept was explicitly named', () => {
    const plan = planTeachingTurn(inLesson("Explain Newton's Second Law with visualization."))
    expect(plan.targetConceptId).not.toBe(CALORIMETRY)
  })

  it('classifies the noun form "visualization", which the legacy diagram regex misses', () => {
    // learnerRequest is deliberately null: the existing detectLearnerRequest()
    // returns null for this phrasing (proven in the investigation).
    const plan = planTeachingTurn(inLesson("Explain Newton's Second Law with visualization.", { learnerRequest: null }))
    expect(plan.intent).toBe(TeachingIntent.VISUALIZE_CONCEPT)
  })
})

describe('Teaching Planner · lesson continuation', () => {
  it('stays IN_LESSON for an unmarked message', () => {
    const plan = planTeachingTurn(inLesson('ok, got it'))
    expect(plan.intent).toBe(TeachingIntent.CONTINUE_LESSON)
    expect(plan.lessonMode).toBe(LessonMode.IN_LESSON)
    expect(plan.excursion.isExcursion).toBe(false)
    expect(plan.executionSequence).toEqual([ExecutionStep.LESSON_FLOW])
  })

  it('stays IN_LESSON when the named concept IS the lesson concept', () => {
    const plan = planTeachingTurn(inLesson('explain calorimetry'))
    expect(plan.targetConceptId).toBe(CALORIMETRY)
    expect(plan.lessonMode).toBe(LessonMode.IN_LESSON)
    expect(plan.excursion.isExcursion).toBe(false)
  })
})

describe('Teaching Planner · off-topic concept', () => {
  it('plans an excursion for a plain off-topic explanation request', () => {
    const plan = planTeachingTurn(inLesson("Explain Newton's Second Law"))
    expect(plan.intent).toBe(TeachingIntent.EXPLAIN_CONCEPT)
    expect(plan.targetConceptId).toBe(NEWTON_2)
    expect(plan.lessonMode).toBe(LessonMode.TEMPORARY_EXCURSION)
    expect(plan.executionSequence).toContain(ExecutionStep.LESSON_RESUME)
  })
})

describe('Teaching Planner · comparison', () => {
  it('needs a comparison marker AND two concepts', () => {
    const plan = planTeachingTurn(inLesson("difference between Newton's Second Law and momentum"))
    expect(plan.intent).toBe(TeachingIntent.COMPARE_CONCEPTS)
    expect(plan.comparisonConceptIds).toEqual([NEWTON_2, MOMENTUM])
  })

  it('a comparison marker with only one concept is not a comparison', () => {
    const plan = planTeachingTurn(inLesson("how is Newton's Second Law different"))
    expect(plan.intent).not.toBe(TeachingIntent.COMPARE_CONCEPTS)
    expect(plan.comparisonConceptIds).toEqual([])
  })
})

describe('Teaching Planner · quiz, solve, revise, define, example', () => {
  it('QUIZ_ME requires assessment only', () => {
    const plan = planTeachingTurn(inLesson('quiz me on this'))
    expect(plan.intent).toBe(TeachingIntent.QUIZ_ME)
    expect(plan.requires.assessment).toBe(true)
    expect(plan.requires.explanation).toBe(false)
    expect(plan.executionSequence).toContain(ExecutionStep.ASSESSMENT)
  })

  it('SOLVE_PROBLEM requires a worked solution', () => {
    const plan = planTeachingTurn(inLesson('solve this step-by-step'))
    expect(plan.intent).toBe(TeachingIntent.SOLVE_PROBLEM)
    expect(plan.requires.workedSolution).toBe(true)
  })

  it('REVISE_TOPIC schedules revision before explanation', () => {
    const plan = planTeachingTurn(inLesson('can we recap this'))
    expect(plan.intent).toBe(TeachingIntent.REVISE_TOPIC)
    expect(plan.executionSequence[0]).toBe(ExecutionStep.REVISION)
  })

  it('DEFINE_TERM needs a named concept', () => {
    const withConcept = planTeachingTurn(inLesson("define Newton's Second Law"))
    expect(withConcept.intent).toBe(TeachingIntent.DEFINE_TERM)
    const withoutConcept = planTeachingTurn(inLesson('what does that mean'))
    expect(withoutConcept.intent).not.toBe(TeachingIntent.DEFINE_TERM)
  })

  it('REAL_WORLD_EXAMPLE comes from the existing learnerRequest signal', () => {
    const plan = planTeachingTurn(inLesson('give me one', { learnerRequest: 'real_life_example' }))
    expect(plan.intent).toBe(TeachingIntent.REAL_WORLD_EXAMPLE)
  })
})

describe('Teaching Planner · follow-up', () => {
  it('a pronoun reference with no new concept is a follow-up, not an excursion', () => {
    const plan = planTeachingTurn(inLesson('why is that'))
    expect(plan.intent).toBe(TeachingIntent.FOLLOW_UP)
    expect(plan.lessonMode).toBe(LessonMode.IN_LESSON)
    expect(plan.excursion.isExcursion).toBe(false)
  })

  it('a follow-up mid-excursion stays on the excursion concept', () => {
    const plan = planTeachingTurn(inLesson('tell me more', { currentExcursionConceptId: NEWTON_2 }))
    expect(plan.intent).toBe(TeachingIntent.FOLLOW_UP)
    expect(plan.targetConceptId).toBe(NEWTON_2)
    expect(plan.lessonMode).toBe(LessonMode.TEMPORARY_EXCURSION)
  })
})

describe('Teaching Planner · change topic vs return to lesson', () => {
  it('CHANGE_TOPIC owes no return', () => {
    const plan = planTeachingTurn(inLesson("let's switch to momentum"))
    expect(plan.intent).toBe(TeachingIntent.CHANGE_TOPIC)
    expect(plan.lessonMode).toBe(LessonMode.LESSON_CHANGED)
    expect(plan.excursion.returnToLesson).toBe(false)
    expect(plan.executionSequence).not.toContain(ExecutionStep.LESSON_RESUME)
  })

  it('RETURN_TO_LESSON targets the lesson concept and resumes', () => {
    const plan = planTeachingTurn(inLesson('ok back to the lesson', { currentExcursionConceptId: NEWTON_2 }))
    expect(plan.intent).toBe(TeachingIntent.RETURN_TO_LESSON)
    expect(plan.targetConceptId).toBe(CALORIMETRY)
    expect(plan.lessonMode).toBe(LessonMode.IN_LESSON)
    expect(plan.executionSequence).toEqual([ExecutionStep.LESSON_RESUME])
  })

  it('an explicit return outranks a concept named in the same message', () => {
    const plan = planTeachingTurn(inLesson("back to the lesson, forget Newton's Second Law"))
    expect(plan.intent).toBe(TeachingIntent.RETURN_TO_LESSON)
  })
})

describe('Teaching Planner · unknown intent', () => {
  it('an empty message is UNKNOWN with zero confidence', () => {
    const plan = planTeachingTurn({ message: '   ', activeLessonConceptId: null })
    expect(plan.intent).toBe(TeachingIntent.UNKNOWN)
    expect(plan.confidence).toBe(0)
  })

  it('an unmarked message with no lesson and no concept is UNKNOWN', () => {
    const plan = planTeachingTurn({ message: 'hmm ok sure', activeLessonConceptId: null, resolveConcept: resolver })
    expect(plan.intent).toBe(TeachingIntent.UNKNOWN)
    expect(plan.lessonMode).toBe(LessonMode.NO_LESSON)
  })
})

describe('Teaching Planner · determinism and purity', () => {
  it('identical inputs produce a deeply-equal plan', () => {
    const inputs = inLesson("Explain Newton's Second Law with visualization.")
    expect(planTeachingTurn(inputs)).toEqual(planTeachingTurn(inputs))
  })

  it('does not mutate its inputs', () => {
    const inputs = inLesson("Explain Newton's Second Law")
    const snapshot = JSON.stringify({ ...inputs, resolveConcept: undefined })
    planTeachingTurn(inputs)
    expect(JSON.stringify({ ...inputs, resolveConcept: undefined })).toBe(snapshot)
  })

  it('ranks equal-confidence concepts deterministically by conceptId', () => {
    const tied: ConceptResolver = () => [
      { conceptId: 'zzz.b', title: 'B', confidence: 0.8 },
      { conceptId: 'aaa.a', title: 'A', confidence: 0.8 },
    ]
    const plan = planTeachingTurn({ message: 'explain them', activeLessonConceptId: CALORIMETRY, resolveConcept: tied })
    expect(plan.targetConceptId).toBe('aaa.a')
  })

  it('plans without a resolver: intent still classified, concept unresolved', () => {
    const plan = planTeachingTurn({ message: 'quiz me', activeLessonConceptId: CALORIMETRY })
    expect(plan.intent).toBe(TeachingIntent.QUIZ_ME)
    expect(plan.targetConceptId).toBe(CALORIMETRY)
  })

  it('always records reasoning for every plan', () => {
    const plan = planTeachingTurn(inLesson("Explain Newton's Second Law with visualization."))
    expect(plan.reasoning.length).toBeGreaterThan(0)
    expect(plan.reasoning.join(' ')).toContain(NEWTON_2)
  })
})
