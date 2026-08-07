/**
 * Brain Runtime executor tests.
 *
 * Plans come from the REAL Teaching Planner -> Execution Planner chain, so
 * these prove the whole brain composes end to end. Subsystems are stub
 * dispatchers — the executor must not know or care what they really do.
 */
import { describe, it, expect } from 'vitest'
import { planTeachingTurn } from '@/lib/teaching/planner/teachingPlanner'
import type { ConceptResolver, PlannerInputs } from '@/lib/teaching/planner/teachingPlan'
import { planExecution } from '@/lib/teaching/execution/executionPlanner'
import { Subsystem, ExecutionStepKind } from '@/lib/teaching/execution/executionPlan'
import { executeRuntime } from '@/lib/teaching/runtime/runtimeExecutor'
import {
  createDispatcherRegistry, StepStatus, NextAction,
  type SubsystemDispatcher, type DispatchOutput,
} from '@/lib/teaching/runtime/runtimeContracts'
import { ExtractionMethod, type ConceptUnderstanding } from '@/lib/teaching/concept/conceptUnderstanding'

const CALORIMETRY = 'phys.therm.calorimetry'
const NEWTON_2 = 'phys.mech.newtons-second-law'

const resolver: ConceptResolver = (text) =>
  /newton'?s\s+second\s+law/i.test(text)
    ? [{ conceptId: NEWTON_2, title: "Newton's Second Law", confidence: 0.95 }]
    : []

const plan = (message: string, over: Partial<PlannerInputs> = {}) =>
  planExecution({
    plan: planTeachingTurn({ message, activeLessonConceptId: CALORIMETRY, resolveConcept: resolver, ...over }),
  })

/** Records every call so tests can assert ordering. */
function stub(subsystem: Subsystem, log: string[], behaviour: 'ok' | 'null' | 'throw' = 'ok'): SubsystemDispatcher {
  return {
    subsystem,
    execute: (input) => {
      log.push(subsystem)
      if (behaviour === 'throw') throw new Error(`${subsystem} exploded`)
      if (behaviour === 'null') return null
      const out: DispatchOutput = {
        subsystem,
        stepKind: input.stepKind,
        payload: { concept: input.inputs.conceptId, upstream: input.upstream?.subsystem ?? null },
        summary: `${subsystem} ran`,
      }
      return out
    },
  }
}

const allDispatchers = (log: string[]) => createDispatcherRegistry([
  stub(Subsystem.EXPLANATION_ENGINE, log),
  stub(Subsystem.VISUALIZATION_INTELLIGENCE_ENGINE, log),
  stub(Subsystem.ADR12_VISUAL_PRODUCTION, log),
  stub(Subsystem.ASSESSMENT_ENGINE, log),
  stub(Subsystem.LESSON_ENGINE, log),
  stub(Subsystem.CONCEPT_UNDERSTANDING, log),
])

describe('Brain Runtime · explanation dispatch', () => {
  it('invokes the Explanation Engine and collects its output', async () => {
    const log: string[] = []
    const r = await executeRuntime(plan("Explain Newton's Second Law"), allDispatchers(log))
    expect(log).toContain(Subsystem.EXPLANATION_ENGINE)
    expect(r.outputs.some(o => o.subsystem === Subsystem.EXPLANATION_ENGINE)).toBe(true)
    expect(r.completedSteps.some(s => s.kind === ExecutionStepKind.EXPLAIN)).toBe(true)
  })

  it('passes the target concept through to the dispatcher', async () => {
    const r = await executeRuntime(plan("Explain Newton's Second Law"), allDispatchers([]))
    const out = r.outputs.find(o => o.subsystem === Subsystem.EXPLANATION_ENGINE)!
    expect((out.payload as { concept: string }).concept).toBe(NEWTON_2)
  })
})

describe('Brain Runtime · visualization dispatch', () => {
  it('runs VIE then ADR 12, in that order, chaining the output forward', async () => {
    const log: string[] = []
    const r = await executeRuntime(plan("Explain Newton's Second Law with visualization."), allDispatchers(log))
    expect(log.indexOf(Subsystem.VISUALIZATION_INTELLIGENCE_ENGINE))
      .toBeLessThan(log.indexOf(Subsystem.ADR12_VISUAL_PRODUCTION))
    const adr12 = r.outputs.find(o => o.subsystem === Subsystem.ADR12_VISUAL_PRODUCTION)!
    expect((adr12.payload as { upstream: string }).upstream).toBe(Subsystem.VISUALIZATION_INTELLIGENCE_ENGINE)
  })

  it('records both chain members as invoked for the one step', async () => {
    const r = await executeRuntime(plan("Explain Newton's Second Law with visualization."), allDispatchers([]))
    const vis = r.allSteps.find(s => s.kind === ExecutionStepKind.VISUALIZE)!
    expect(vis.subsystemsInvoked).toEqual([
      Subsystem.VISUALIZATION_INTELLIGENCE_ENGINE, Subsystem.ADR12_VISUAL_PRODUCTION,
    ])
  })
})

describe('Brain Runtime · assessment dispatch', () => {
  it('invokes the Assessment Engine then halts to await the student', async () => {
    const log: string[] = []
    const r = await executeRuntime(plan('quiz me on this'), allDispatchers(log))
    expect(log).toContain(Subsystem.ASSESSMENT_ENGINE)
    expect(r.nextAction).toBe(NextAction.AWAIT_STUDENT_RESPONSE)
    expect(r.allSteps.some(s => s.kind === ExecutionStepKind.WAIT_FOR_STUDENT && s.status === StepStatus.HALTED)).toBe(true)
  })

  it('a wait invokes no subsystem at all', async () => {
    const log: string[] = []
    await executeRuntime(plan('quiz me on this'), allDispatchers(log))
    const wait = (await executeRuntime(plan('quiz me on this'), allDispatchers([])))
      .allSteps.find(s => s.kind === ExecutionStepKind.WAIT_FOR_STUDENT)!
    expect(wait.subsystemsInvoked).toEqual([])
  })
})

describe('Brain Runtime · lesson resume', () => {
  it('reports RESUME_LESSON with the lesson concept after an excursion', async () => {
    const r = await executeRuntime(plan("Explain Newton's Second Law with visualization."), allDispatchers([]))
    expect(r.nextAction).toBe(NextAction.RESUME_LESSON)
    expect(r.resumeConceptId).toBe(CALORIMETRY)
  })

  it('reports COMPLETE when nothing is owed', async () => {
    const r = await executeRuntime(plan('ok, got it'), allDispatchers([]))
    expect(r.nextAction).toBe(NextAction.COMPLETE)
    expect(r.resumeConceptId).toBeNull()
  })
})

describe('Brain Runtime · ambiguity path', () => {
  const ambiguous: ConceptUnderstanding = {
    primaryConceptId: 'phys.em.force',
    secondaryConceptIds: [], comparisonConceptIds: [],
    currentLessonReferenced: false, offTopic: true,
    ambiguityDetected: true,
    ambiguityCandidates: [
      { conceptId: 'phys.em.force', title: 'Force', subject: 'physics', confidence: 0.95 },
      { conceptId: 'phys.mech.force', title: 'Force', subject: 'physics', confidence: 0.95 },
    ],
    confidence: 0.57, extractionMethod: ExtractionMethod.EXACT_TITLE,
    matches: [], reasoning: [],
  }

  it('asks, then halts awaiting clarification — never teaching first', async () => {
    const p = planExecution({
      plan: planTeachingTurn({ message: 'explain force', activeLessonConceptId: CALORIMETRY }),
      concepts: ambiguous,
    })
    const log: string[] = []
    const r = await executeRuntime(p, allDispatchers(log))
    expect(r.nextAction).toBe(NextAction.AWAIT_CLARIFICATION)
    expect(r.allSteps[0].kind).toBe(ExecutionStepKind.ASK_DISAMBIGUATION)
    expect(log).not.toContain(Subsystem.VISUALIZATION_INTELLIGENCE_ENGINE)
  })
})

describe('Brain Runtime · failure handling', () => {
  it('a thrown subsystem never terminates the run', async () => {
    const log: string[] = []
    const registry = createDispatcherRegistry([
      stub(Subsystem.EXPLANATION_ENGINE, log),
      stub(Subsystem.VISUALIZATION_INTELLIGENCE_ENGINE, log, 'throw'),
      stub(Subsystem.ADR12_VISUAL_PRODUCTION, log),
      stub(Subsystem.LESSON_ENGINE, log),
    ])
    const r = await executeRuntime(plan("Explain Newton's Second Law with visualization."), registry)
    expect(r.completedSteps.some(s => s.kind === ExecutionStepKind.EXPLAIN)).toBe(true)
    expect(r.allSteps.some(s => s.kind === ExecutionStepKind.LESSON_RESUME)).toBe(true)
    expect(r.diagnostics.join(' ')).toContain('exploded')
  })

  it('a null-returning subsystem is handled exactly like a throw', async () => {
    const log: string[] = []
    const registry = createDispatcherRegistry([
      stub(Subsystem.EXPLANATION_ENGINE, log),
      stub(Subsystem.VISUALIZATION_INTELLIGENCE_ENGINE, log, 'null'),
      stub(Subsystem.LESSON_ENGINE, log),
    ])
    const r = await executeRuntime(plan("Explain Newton's Second Law with visualization."), registry)
    expect(r.allSteps.find(s => s.kind === ExecutionStepKind.VISUALIZE)!.status)
      .not.toBe(StepStatus.COMPLETED)
    expect(r.nextAction).toBe(NextAction.RESUME_LESSON)
  })

  it('respects the plan policy rather than inventing one', async () => {
    // VISUALIZE carries SUBSTITUTE_EXPLANATION; with the whole chain missing
    // the executor must fall back to the Explanation Engine, not skip blindly.
    const log: string[] = []
    const registry = createDispatcherRegistry([
      stub(Subsystem.EXPLANATION_ENGINE, log),
      stub(Subsystem.LESSON_ENGINE, log),
    ])
    const r = await executeRuntime(plan("Explain Newton's Second Law with visualization."), registry)
    expect(r.diagnostics.join(' ')).toContain('SUBSTITUTE_EXPLANATION')
    expect(log.filter(s => s === Subsystem.EXPLANATION_ENGINE).length).toBeGreaterThanOrEqual(2)
  })

  it('a substituted step reports SKIPPED, not COMPLETED — the real goal never happened', async () => {
    const log: string[] = []
    const registry = createDispatcherRegistry([
      stub(Subsystem.EXPLANATION_ENGINE, log),
      stub(Subsystem.LESSON_ENGINE, log),
    ])
    const r = await executeRuntime(plan("Explain Newton's Second Law with visualization."), registry)
    const vis = r.allSteps.find(s => s.kind === ExecutionStepKind.VISUALIZE)!
    expect(vis.status).toBe(StepStatus.SKIPPED)
    expect(vis.reason).toContain('substituted with')
    // ...but the substitute's output IS collected, so the turn still has content.
    expect(r.outputs.filter(o => o.subsystem === Subsystem.EXPLANATION_ENGINE).length).toBeGreaterThanOrEqual(2)
  })

  it('with no dispatchers at all, still returns a result', async () => {
    const r = await executeRuntime(plan("Explain Newton's Second Law with visualization."), {})
    expect(r.completedSteps).toEqual([])
    expect(r.skippedSteps.length).toBeGreaterThan(0)
    expect(r.executionId).toBeTruthy()
  })
})

describe('Brain Runtime · skipped and pending steps', () => {
  it('separates skipped (declined) from pending (never reached)', async () => {
    const log: string[] = []
    const registry = createDispatcherRegistry([
      stub(Subsystem.ASSESSMENT_ENGINE, log),
      stub(Subsystem.LESSON_ENGINE, log),
    ])
    const r = await executeRuntime(plan('quiz me on this'), registry)
    // The wait halts the run; anything after it is pending, not skipped.
    expect(r.allSteps.some(s => s.status === StepStatus.HALTED)).toBe(true)
    for (const p of r.pendingSteps) expect(p.reason).toBe('execution halted earlier')
  })

  it('every outcome carries its plan index for traceability', async () => {
    const p = plan("Explain Newton's Second Law with visualization.")
    const r = await executeRuntime(p, allDispatchers([]))
    expect(r.allSteps.map(s => s.index)).toEqual(p.orderedSteps.map((_, i) => i))
  })
})

describe('Brain Runtime · dispatcher ordering and determinism', () => {
  it('invokes subsystems strictly in plan order', async () => {
    const log: string[] = []
    await executeRuntime(plan("Explain Newton's Second Law with visualization."), allDispatchers(log))
    expect(log).toEqual([
      Subsystem.EXPLANATION_ENGINE,
      Subsystem.VISUALIZATION_INTELLIGENCE_ENGINE,
      Subsystem.ADR12_VISUAL_PRODUCTION,
      Subsystem.LESSON_ENGINE,
    ])
  })

  it('identical plan + dispatchers produce an identical result', async () => {
    const p = plan("Explain Newton's Second Law with visualization.")
    const a = await executeRuntime(p, allDispatchers([]))
    const b = await executeRuntime(p, allDispatchers([]))
    expect(a).toEqual(b)
  })

  it('does not mutate the ExecutionPlan', async () => {
    const p = plan("Explain Newton's Second Law with visualization.")
    const before = JSON.stringify(p)
    await executeRuntime(p, allDispatchers([]))
    expect(JSON.stringify(p)).toBe(before)
  })

  it('exposes prior outputs to later steps without the executor reading payloads', async () => {
    const seen: number[] = []
    const registry = createDispatcherRegistry([
      stub(Subsystem.EXPLANATION_ENGINE, []),
      {
        subsystem: Subsystem.VISUALIZATION_INTELLIGENCE_ENGINE,
        execute: (input) => {
          seen.push(input.context.priorOutputs.length)
          return { subsystem: Subsystem.VISUALIZATION_INTELLIGENCE_ENGINE, stepKind: input.stepKind, payload: null }
        },
      },
      stub(Subsystem.ADR12_VISUAL_PRODUCTION, []),
      stub(Subsystem.LESSON_ENGINE, []),
    ])
    await executeRuntime(plan("Explain Newton's Second Law with visualization."), registry)
    expect(seen[0]).toBeGreaterThan(0)
  })
})

describe('Brain Runtime · result aggregation', () => {
  it('buckets every step exactly once and echoes the executionId', async () => {
    const p = plan("Explain Newton's Second Law with visualization.")
    const r = await executeRuntime(p, allDispatchers([]))
    expect(r.executionId).toBe(p.executionId)
    const bucketed = r.completedSteps.length + r.skippedSteps.length + r.failedSteps.length + r.pendingSteps.length
    const halted = r.allSteps.filter(s => s.status === StepStatus.HALTED).length
    expect(bucketed + halted).toBe(r.allSteps.length)
  })

  it('always reports a diagnostics summary and a next action', async () => {
    const r = await executeRuntime(plan("Explain Newton's Second Law"), allDispatchers([]))
    expect(r.diagnostics.some(d => d.startsWith('Executed '))).toBe(true)
    expect(r.diagnostics.some(d => d.startsWith('Next action:'))).toBe(true)
  })
})
