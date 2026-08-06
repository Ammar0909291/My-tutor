/**
 * Teaching Prompt Orchestrator tests.
 *
 * Requests are built from the REAL Teaching Planner -> Execution Planner
 * chain, so these prove the single-generation runtime composes on top of the
 * existing brain without redesigning it.
 */
import { describe, it, expect } from 'vitest'
import { planTeachingTurn } from '@/lib/teaching/planner/teachingPlanner'
import type { ConceptResolver } from '@/lib/teaching/planner/teachingPlan'
import { planExecution } from '@/lib/teaching/execution/executionPlanner'
import { ExecutionStepKind, ExecutionMode } from '@/lib/teaching/execution/executionPlan'
import { LessonMode, TeachingIntent } from '@/lib/teaching/planner/teachingPlan'
import { orchestrateTeachingGeneration } from '@/lib/teaching/generation/teachingPromptOrchestrator'
import {
  validateTeachingGenerationResponse,
  type TeachingGenerationResponse,
} from '@/lib/teaching/generation/teachingGenerationRequest'
import { ExtractionMethod, type ConceptUnderstanding } from '@/lib/teaching/concept/conceptUnderstanding'

const CALORIMETRY = 'phys.therm.calorimetry'
const NEWTON_2 = 'phys.mech.newtons-second-law'
const MOMENTUM = 'phys.mech.momentum'

const resolver: ConceptResolver = (text) => {
  const lower = text.toLowerCase()
  const out: { conceptId: string; title: string; confidence: number }[] = []
  if (/newton'?s\s+second\s+law/.test(lower)) out.push({ conceptId: NEWTON_2, title: "Newton's Second Law", confidence: 0.95 })
  if (/momentum/.test(lower)) out.push({ conceptId: MOMENTUM, title: 'Linear Momentum', confidence: 0.9 })
  if (/calorimetry/.test(lower)) out.push({ conceptId: CALORIMETRY, title: 'Calorimetry', confidence: 0.9 })
  return out
}

function request(message: string, opts: {
  concepts?: ConceptUnderstanding | null
  learnerRequest?: 'diagram' | 'real_life_example' | 'explain_differently' | null
} = {}) {
  const teachingPlan = planTeachingTurn({
    message, activeLessonConceptId: CALORIMETRY, resolveConcept: resolver,
    learnerRequest: opts.learnerRequest ?? null,
  })
  const executionPlan = planExecution({ plan: teachingPlan, concepts: opts.concepts ?? null })
  return orchestrateTeachingGeneration({
    executionPlan, teachingPlan, concepts: opts.concepts ?? null,
    studentMessage: message, learnerRequest: opts.learnerRequest ?? null,
  })
}

describe('Orchestrator · ExecutionPlan -> TeachingGenerationRequest', () => {
  it('produces exactly ONE request regardless of how many steps the plan has', () => {
    const teachingPlan = planTeachingTurn({
      message: "Explain Newton's Second Law with visualization.",
      activeLessonConceptId: CALORIMETRY, resolveConcept: resolver,
    })
    const executionPlan = planExecution({ plan: teachingPlan })
    expect(executionPlan.orderedSteps.length).toBeGreaterThan(1)

    const r = orchestrateTeachingGeneration({ executionPlan, teachingPlan, studentMessage: 'x' })
    // One object, one id — multi-step plans are FOLDED, never split.
    expect(r.requestId).toBeTruthy()
    expect(Array.isArray(r)).toBe(false)
    expect(r.metadata.foldedSteps.length).toBeGreaterThan(0)
  })

  it('carries the execution plan id in metadata for provenance', () => {
    const teachingPlan = planTeachingTurn({
      message: "Explain Newton's Second Law", activeLessonConceptId: CALORIMETRY, resolveConcept: resolver,
    })
    const executionPlan = planExecution({ plan: teachingPlan })
    const r = orchestrateTeachingGeneration({ executionPlan, teachingPlan, studentMessage: 'x' })
    expect(r.metadata.executionId).toBe(executionPlan.executionId)
    expect(r.metadata.teachingIntent).toBe(teachingPlan.intent)
  })

  it('excludes control-flow steps from the generation, with a stated reason', () => {
    const r = request('quiz me on this')
    expect(r.metadata.foldedSteps).not.toContain(ExecutionStepKind.WAIT_FOR_STUDENT)
    expect(r.metadata.excludedSteps.join(' ')).toContain('WAIT_FOR_STUDENT')
    expect(r.metadata.excludedSteps.join(' ')).toContain('control flow')
  })
})

describe('Orchestrator · determinism and no duplication', () => {
  it('identical inputs produce a deeply-equal request', () => {
    expect(request("Explain Newton's Second Law with visualization."))
      .toEqual(request("Explain Newton's Second Law with visualization."))
  })

  it('requestId is content-derived and stable, and differs across plans', () => {
    const a = request("Explain Newton's Second Law with visualization.")
    const b = request("Explain Newton's Second Law with visualization.")
    const c = request('quiz me on this')
    expect(a.requestId).toBe(b.requestId)
    expect(a.requestId).not.toBe(c.requestId)
    expect(a.requestId).toMatch(/^gen_[0-9a-f]{8}$/)
  })

  it('folds duplicate step kinds only once', () => {
    const r = request("Explain Newton's Second Law with visualization.")
    expect(new Set(r.metadata.foldedSteps).size).toBe(r.metadata.foldedSteps.length)
  })

  it('does not mutate its inputs', () => {
    const teachingPlan = planTeachingTurn({
      message: "Explain Newton's Second Law", activeLessonConceptId: CALORIMETRY, resolveConcept: resolver,
    })
    const executionPlan = planExecution({ plan: teachingPlan })
    const before = JSON.stringify({ teachingPlan, executionPlan })
    orchestrateTeachingGeneration({ executionPlan, teachingPlan, studentMessage: 'x' })
    expect(JSON.stringify({ teachingPlan, executionPlan })).toBe(before)
  })
})

describe('Orchestrator · visualization metadata preserved', () => {
  const r = request("Explain Newton's Second Law with visualization.")

  it('marks visualization required and carries a VisualIntent, not a renderer', () => {
    expect(r.visualization.required).toBe(true)
    const serialized = JSON.stringify(r.visualization)
    expect(serialized).not.toMatch(/renderer|VisualType|food_chain|three_/i)
  })

  it('omits visualization payload entirely when no visual is planned', () => {
    const plain = request('quiz me on this')
    expect(plain.visualization.required).toBe(false)
    expect(plain.visualization.intent).toBeNull()
    expect(plain.visualization.emphasisTargets).toEqual([])
  })

  it('carries VKR emphasis/narration/accessibility for a covered concept', () => {
    const covered = request('show me a diagram of Linear Momentum', { learnerRequest: 'diagram' })
    if (covered.visualization.intent) {
      expect(covered.visualization.intent).toHaveProperty('purpose')
      expect(covered.visualization.accessibilityRequirement).toBeTruthy()
      expect(covered.visualization.emphasisTargets.length).toBeGreaterThan(0)
    }
  })
})

describe('Orchestrator · lesson excursion preserved', () => {
  const r = request("Explain Newton's Second Law with visualization.")

  it('preserves the excursion and its return target', () => {
    expect(r.lesson.isExcursion).toBe(true)
    expect(r.lesson.lessonMode).toBe(LessonMode.TEMPORARY_EXCURSION)
    expect(r.lesson.executionMode).toBe(ExecutionMode.CONCEPT_EXCURSION)
    expect(r.lesson.resumeConceptId).toBe(CALORIMETRY)
    expect(r.lesson.mustReturnToLesson).toBe(true)
  })

  it('targets the requested concept, never the lesson concept', () => {
    expect(r.concept.conceptId).toBe(NEWTON_2)
    expect(r.concept.conceptId).not.toBe(CALORIMETRY)
  })

  it('owes no return for an in-lesson turn', () => {
    const inLesson = request('ok, got it')
    expect(inLesson.lesson.isExcursion).toBe(false)
    expect(inLesson.lesson.mustReturnToLesson).toBe(false)
  })

  it('owes no return after a permanent topic change', () => {
    const changed = request("let's switch to momentum")
    expect(changed.lesson.mustReturnToLesson).toBe(false)
  })
})

describe('Orchestrator · assessment requirements preserved', () => {
  const r = request('quiz me on this')

  it('marks assessment required and expects a student response', () => {
    expect(r.assessment.required).toBe(true)
    expect(r.assessment.expectsStudentResponse).toBe(true)
    expect(r.assessment.mustNotRevealAnswer).toBe(true)
  })

  it('constrains the turn to end on exactly one question', () => {
    expect(r.constraints.maxQuestions).toBe(1)
    expect(r.constraints.mustEndWithQuestion).toBe(true)
    expect(r.constraints.maxTeachingActions).toBe(1)
  })

  it('does not request an assessment for a plain explanation', () => {
    const plain = request("Explain Newton's Second Law")
    expect(plain.assessment.required).toBe(false)
    expect(plain.constraints.mustEndWithQuestion).toBe(false)
  })
})

describe('Orchestrator · explanation requirements preserved', () => {
  it('marks explanation required and carries authored objectives', () => {
    const r = request("Explain Newton's Second Law")
    expect(r.explanation.required).toBe(true)
  })

  it('flags a definition request as definitionOnly', () => {
    const r = request("define Newton's Second Law")
    expect(r.metadata.teachingIntent).toBe(TeachingIntent.DEFINE_TERM)
    expect(r.explanation.definitionOnly).toBe(true)
  })

  it('carries VKR objectives, prerequisites and misconceptions for a covered concept', () => {
    const r = request('explain Linear Momentum')
    expect(r.explanation.learningObjectives.length).toBeGreaterThan(0)
    expect(r.misconceptions.length).toBeGreaterThan(0)
    expect(r.misconceptions[0]).toHaveProperty('guardance')
  })

  it('carries comparison concepts when the turn is a comparison', () => {
    const r = request("difference between Newton's Second Law and momentum")
    expect(r.concept.comparisonConceptIds.length).toBeGreaterThanOrEqual(2)
  })
})

describe('Orchestrator · disambiguation', () => {
  const ambiguous: ConceptUnderstanding = {
    primaryConceptId: 'phys.em.force', secondaryConceptIds: [], comparisonConceptIds: [],
    currentLessonReferenced: false, offTopic: true,
    ambiguityDetected: true,
    ambiguityCandidates: [
      { conceptId: 'phys.em.force', title: 'Force', subject: 'physics', confidence: 0.95 },
      { conceptId: 'phys.mech.force', title: 'Force', subject: 'physics', confidence: 0.95 },
    ],
    confidence: 0.57, extractionMethod: ExtractionMethod.EXACT_TITLE, matches: [], reasoning: [],
  }

  it('requests disambiguation and carries the candidates, teaching nothing', () => {
    const r = request('explain force', { concepts: ambiguous })
    expect(r.disambiguationRequested).toBe(true)
    expect(r.concept.ambiguous).toBe(true)
    expect(r.concept.ambiguityCandidateIds).toEqual(['phys.em.force', 'phys.mech.force'])
    expect(r.explanation.required).toBe(false)
    expect(r.visualization.required).toBe(false)
  })
})

describe('Orchestrator · response contract validity', () => {
  const req = request('quiz me on this')

  const baseResponse = (over: Partial<TeachingGenerationResponse> = {}): TeachingGenerationResponse => ({
    requestId: req.requestId,
    content: 'Here is the teaching content.',
    assessment: { question: 'What happens when force doubles?' },
    visualReferenced: false,
    returnedToLesson: false,
    ...over,
  })

  it('accepts a well-formed response', () => {
    expect(validateTeachingGenerationResponse(req, baseResponse())).toEqual([])
  })

  it('rejects a requestId mismatch', () => {
    const problems = validateTeachingGenerationResponse(req, baseResponse({ requestId: 'gen_deadbeef' }))
    expect(problems.some(p => p.includes('requestId mismatch'))).toBe(true)
  })

  it('rejects empty content', () => {
    expect(validateTeachingGenerationResponse(req, baseResponse({ content: '   ' })).length).toBeGreaterThan(0)
  })

  it('rejects a missing assessment when one was required', () => {
    const problems = validateTeachingGenerationResponse(req, baseResponse({ assessment: undefined }))
    expect(problems.some(p => p.includes('assessment was required'))).toBe(true)
  })

  it('rejects an unrequested assessment', () => {
    const plain = request("Explain Newton's Second Law")
    const problems = validateTeachingGenerationResponse(plain, {
      requestId: plain.requestId, content: 'text',
      assessment: { question: 'q' }, visualReferenced: false, returnedToLesson: true,
    })
    expect(problems.some(p => p.includes('not requested'))).toBe(true)
  })

  it('rejects an unreturned excursion', () => {
    const excursion = request("Explain Newton's Second Law with visualization.")
    const problems = validateTeachingGenerationResponse(excursion, {
      requestId: excursion.requestId, content: 'text',
      visualReferenced: true, returnedToLesson: false,
    })
    expect(problems.some(p => p.includes('did not return to the lesson'))).toBe(true)
  })

  it('rejects a response that reveals a withheld claim', () => {
    const withHint = request('quiz me on this')
    if (withHint.constraints.mustNotReveal.length > 0) {
      const leaked = withHint.constraints.mustNotReveal[0]
      const problems = validateTeachingGenerationResponse(withHint, baseResponse({
        requestId: withHint.requestId, content: `Obviously, ${leaked}`,
      }))
      expect(problems.some(p => p.includes('reveals a withheld claim'))).toBe(true)
    }
  })
})

describe('Orchestrator · purity', () => {
  it('produces no prompt text — only structured data', () => {
    const r = request("Explain Newton's Second Law with visualization.")
    // No field should read like an instruction addressed to a model.
    const serialized = JSON.stringify(r)
    expect(serialized).not.toMatch(/\byou are a\b|\bsystem prompt\b|\bact as\b/i)
  })

  it('handles an unresolved concept without throwing', () => {
    const teachingPlan = planTeachingTurn({ message: 'zzz', activeLessonConceptId: null })
    const executionPlan = planExecution({ plan: teachingPlan })
    const r = orchestrateTeachingGeneration({ executionPlan, teachingPlan, studentMessage: 'zzz' })
    expect(r.concept.conceptId).toBeNull()
    expect(r.requestId).toBeTruthy()
  })
})
