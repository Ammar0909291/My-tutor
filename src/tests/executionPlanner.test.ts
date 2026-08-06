/**
 * Execution Planner tests.
 *
 * Plans are built from REAL Teaching Planner output (planTeachingTurn), not
 * hand-written TeachingPlan literals — so these also prove the two layers
 * compose.
 */
import { describe, it, expect } from 'vitest'
import { planTeachingTurn } from '@/lib/teaching/planner/teachingPlanner'
import type { ConceptResolver, PlannerInputs } from '@/lib/teaching/planner/teachingPlan'
import { planExecution, type SubsystemAvailability } from '@/lib/teaching/execution/executionPlanner'
import {
  ExecutionStepKind, Subsystem, FailurePolicy, ExecutionMode, STEP_FROM_PLANNER,
} from '@/lib/teaching/execution/executionPlan'
import type { ConceptUnderstanding } from '@/lib/teaching/concept/conceptUnderstanding'
import { ExtractionMethod } from '@/lib/teaching/concept/conceptUnderstanding'

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

const teachingPlan = (message: string, over: Partial<PlannerInputs> = {}) =>
  planTeachingTurn({ message, activeLessonConceptId: CALORIMETRY, resolveConcept: resolver, ...over })

const kinds = (p: { orderedSteps: readonly { kind: ExecutionStepKind }[] }) => p.orderedSteps.map(s => s.kind)

const ambiguous: ConceptUnderstanding = {
  primaryConceptId: 'phys.em.force',
  secondaryConceptIds: [],
  comparisonConceptIds: [],
  currentLessonReferenced: false,
  offTopic: true,
  ambiguityDetected: true,
  ambiguityCandidates: [
    { conceptId: 'phys.em.force', title: 'Force', subject: 'physics', confidence: 0.95 },
    { conceptId: 'phys.mech.force', title: 'Force', subject: 'physics', confidence: 0.95 },
  ],
  confidence: 0.57,
  extractionMethod: ExtractionMethod.EXACT_TITLE,
  matches: [],
  reasoning: ['ambiguous'],
}

describe('Execution Planner · explanation flow', () => {
  it('schedules EXPLAIN against the Explanation Engine', () => {
    const p = planExecution({ plan: teachingPlan("Explain Newton's Second Law") })
    expect(kinds(p)).toContain(ExecutionStepKind.EXPLAIN)
    const explain = p.orderedSteps.find(s => s.kind === ExecutionStepKind.EXPLAIN)!
    expect(explain.subsystems).toEqual([Subsystem.EXPLANATION_ENGINE])
    expect(explain.inputs.conceptId).toBe(NEWTON_2)
    expect(explain.required).toBe(true)
  })

  it('passes comparison concepts through as step inputs', () => {
    const p = planExecution({ plan: teachingPlan("difference between Newton's Second Law and momentum") })
    const explain = p.orderedSteps.find(s => s.kind === ExecutionStepKind.EXPLAIN)!
    expect(explain.inputs.comparisonConceptIds).toEqual([NEWTON_2, MOMENTUM])
  })
})

describe('Execution Planner · visualization flow', () => {
  const p = planExecution({ plan: teachingPlan("Explain Newton's Second Law with visualization.") })

  it('chains VIE -> ADR 12, never a renderer directly', () => {
    const vis = p.orderedSteps.find(s => s.kind === ExecutionStepKind.VISUALIZE)!
    expect(vis.subsystems).toEqual([
      Subsystem.VISUALIZATION_INTELLIGENCE_ENGINE, Subsystem.ADR12_VISUAL_PRODUCTION,
    ])
    expect(vis.expectedOutput).toContain('VisualIntent')
  })

  it('runs the explanation before the visualization', () => {
    const order = kinds(p)
    expect(order.indexOf(ExecutionStepKind.EXPLAIN)).toBeLessThan(order.indexOf(ExecutionStepKind.VISUALIZE))
  })

  it('targets the requested concept, not the active lesson', () => {
    expect(p.targetConceptId).toBe(NEWTON_2)
    expect(p.targetConceptId).not.toBe(CALORIMETRY)
  })
})

describe('Execution Planner · assessment flow', () => {
  it('always waits for the student after asking an assessment item', () => {
    const p = planExecution({ plan: teachingPlan('quiz me on this') })
    const order = kinds(p)
    expect(order).toContain(ExecutionStepKind.ASSESS)
    expect(order[order.indexOf(ExecutionStepKind.ASSESS) + 1]).toBe(ExecutionStepKind.WAIT_FOR_STUDENT)
  })

  it('WAIT_FOR_STUDENT invokes no subsystem and cannot fail', () => {
    const p = planExecution({ plan: teachingPlan('quiz me on this') })
    const wait = p.orderedSteps.find(s => s.kind === ExecutionStepKind.WAIT_FOR_STUDENT)!
    expect(wait.subsystems).toEqual([])
    expect(wait.failurePolicy).toBe(FailurePolicy.NOT_APPLICABLE)
  })
})

describe('Execution Planner · ambiguity', () => {
  const p = planExecution({ plan: teachingPlan('explain force'), concepts: ambiguous })

  it('asks for clarification and waits, running no teaching step', () => {
    expect(p.executionMode).toBe(ExecutionMode.DISAMBIGUATION)
    expect(kinds(p)).toEqual([ExecutionStepKind.ASK_DISAMBIGUATION, ExecutionStepKind.WAIT_FOR_STUDENT])
    expect(kinds(p)).not.toContain(ExecutionStepKind.EXPLAIN)
  })

  it('carries the candidates into the question inputs', () => {
    const ask = p.orderedSteps[0]
    expect(ask.inputs.ambiguityCandidates).toEqual(['phys.em.force', 'phys.mech.force'])
    expect(ask.failurePolicy).toBe(FailurePolicy.REQUEST_CLARIFICATION)
  })

  it('defers rather than discards the original request', () => {
    expect(p.deferredSteps.length).toBeGreaterThan(0)
    expect(p.resumeInstruction.shouldResume).toBe(true)
  })
})

describe('Execution Planner · lesson continuation and resume', () => {
  it('plans LESSON_FLOW for an on-topic turn', () => {
    const p = planExecution({ plan: teachingPlan('ok, got it') })
    expect(p.executionMode).toBe(ExecutionMode.LESSON_FLOW)
    expect(kinds(p)).toEqual([ExecutionStepKind.LESSON_FLOW])
    expect(p.resumeInstruction.shouldResume).toBe(false)
  })

  it('plans LESSON_RESUME with the lesson concept as its input', () => {
    const p = planExecution({ plan: teachingPlan('back to the lesson') })
    expect(p.executionMode).toBe(ExecutionMode.LESSON_RESUME)
    const resume = p.orderedSteps.find(s => s.kind === ExecutionStepKind.LESSON_RESUME)!
    expect(resume.subsystems).toEqual([Subsystem.LESSON_ENGINE])
  })
})

describe('Execution Planner · excursion', () => {
  const p = planExecution({ plan: teachingPlan("Explain Newton's Second Law with visualization.") })

  it('runs in CONCEPT_EXCURSION mode and owes a return', () => {
    expect(p.executionMode).toBe(ExecutionMode.CONCEPT_EXCURSION)
    expect(p.resumeInstruction.shouldResume).toBe(true)
    expect(p.resumeInstruction.resumeConceptId).toBe(CALORIMETRY)
  })

  it('ends with LESSON_RESUME carrying the lesson concept', () => {
    const order = kinds(p)
    expect(order[order.length - 1]).toBe(ExecutionStepKind.LESSON_RESUME)
    const resume = p.orderedSteps[p.orderedSteps.length - 1]
    expect(resume.inputs.resumeConceptId).toBe(CALORIMETRY)
  })

  it('a permanent topic change owes no return', () => {
    const p2 = planExecution({ plan: teachingPlan("let's switch to momentum") })
    expect(p2.resumeInstruction.shouldResume).toBe(false)
    expect(kinds(p2)).not.toContain(ExecutionStepKind.LESSON_RESUME)
  })
})

describe('Execution Planner · subsystem ordering', () => {
  it('lists subsystemCalls de-duplicated, in first-use order', () => {
    const p = planExecution({ plan: teachingPlan("Explain Newton's Second Law with visualization.") })
    expect(p.subsystemCalls).toEqual([
      Subsystem.EXPLANATION_ENGINE,
      Subsystem.VISUALIZATION_INTELLIGENCE_ENGINE,
      Subsystem.ADR12_VISUAL_PRODUCTION,
      Subsystem.LESSON_ENGINE,
    ])
  })

  it('schedules UNDERSTAND first when no concept was resolved', () => {
    const plan = planTeachingTurn({ message: 'explain that', activeLessonConceptId: null })
    const p = planExecution({ plan })
    if (p.orderedSteps.length > 0) expect(kinds(p)[0]).toBe(ExecutionStepKind.UNDERSTAND)
    expect(p.orderedSteps.find(s => s.kind === ExecutionStepKind.UNDERSTAND)?.subsystems)
      .toEqual([Subsystem.CONCEPT_UNDERSTANDING])
  })

  it('maps every planner step to an executable kind', () => {
    expect(Object.values(STEP_FROM_PLANNER).every(k => k in ExecutionStepKind)).toBe(true)
  })
})

describe('Execution Planner · failure policy', () => {
  it('visualization unavailable -> explanation still runs', () => {
    const down: SubsystemAvailability = { [Subsystem.ADR12_VISUAL_PRODUCTION]: false }
    const p = planExecution({ plan: teachingPlan("Explain Newton's Second Law with visualization."), availability: down })
    expect(kinds(p)).not.toContain(ExecutionStepKind.VISUALIZE)
    expect(kinds(p)).toContain(ExecutionStepKind.EXPLAIN)
    expect(p.diagnostics.join(' ')).toContain('ADR12_VISUAL_PRODUCTION')
  })

  it('a down VIE alone is enough to drop the visual', () => {
    const down: SubsystemAvailability = { [Subsystem.VISUALIZATION_INTELLIGENCE_ENGINE]: false }
    const p = planExecution({ plan: teachingPlan("Explain Newton's Second Law with visualization."), availability: down })
    expect(kinds(p)).not.toContain(ExecutionStepKind.VISUALIZE)
  })

  it('assessment unavailable -> assessment skipped, turn survives', () => {
    const down: SubsystemAvailability = { [Subsystem.ASSESSMENT_ENGINE]: false }
    const p = planExecution({ plan: teachingPlan('quiz me on this'), availability: down })
    expect(kinds(p)).not.toContain(ExecutionStepKind.ASSESS)
    expect(p.diagnostics.join(' ')).toContain('Teaching continues')
  })

  it('no failure policy can terminate teaching', () => {
    const values: string[] = Object.values(FailurePolicy)
    expect(values).not.toContain('ABORT')
    expect(values).not.toContain('HALT')
    expect(values.every(v => ['SKIP_AND_CONTINUE', 'SUBSTITUTE_EXPLANATION', 'REQUEST_CLARIFICATION', 'NOT_APPLICABLE'].includes(v))).toBe(true)
  })

  it('everything down degrades to NO_OP rather than throwing', () => {
    const allDown: SubsystemAvailability = Object.fromEntries(
      Object.values(Subsystem).map(s => [s, false]),
    ) as SubsystemAvailability
    const p = planExecution({ plan: teachingPlan("Explain Newton's Second Law with visualization."), availability: allDown })
    expect(p.executionMode).toBe(ExecutionMode.NO_OP)
    expect(p.orderedSteps).toEqual([])
  })
})

describe('Execution Planner · determinism', () => {
  it('identical inputs produce a deeply-equal plan', () => {
    const plan = teachingPlan("Explain Newton's Second Law with visualization.")
    expect(planExecution({ plan })).toEqual(planExecution({ plan }))
  })

  it('executionId is content-derived, stable, and differs across plans', () => {
    const a = planExecution({ plan: teachingPlan("Explain Newton's Second Law with visualization.") })
    const b = planExecution({ plan: teachingPlan("Explain Newton's Second Law with visualization.") })
    const c = planExecution({ plan: teachingPlan('quiz me on this') })
    expect(a.executionId).toBe(b.executionId)
    expect(a.executionId).not.toBe(c.executionId)
    expect(a.executionId).toMatch(/^exec_[0-9a-f]{8}$/)
  })

  it('does not mutate the TeachingPlan it was given', () => {
    const plan = teachingPlan("Explain Newton's Second Law with visualization.")
    const before = JSON.stringify(plan)
    planExecution({ plan })
    expect(JSON.stringify(plan)).toBe(before)
  })

  it('always carries diagnostics, including the planner reasoning', () => {
    const p = planExecution({ plan: teachingPlan("Explain Newton's Second Law with visualization.") })
    expect(p.diagnostics.some(d => d.startsWith('[planner]'))).toBe(true)
  })
})
