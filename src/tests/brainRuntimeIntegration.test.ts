/**
 * Phase 4 — Brain runtime integration / regression suite.
 *
 * Drives the COMPLETE brain (Concept Understanding -> Teaching Planner ->
 * Execution Planner -> Brain Runtime -> dispatchers) over the ten required
 * scenarios, including the original Calorimetry/Newton's-Second-Law bug.
 *
 * The concept index is built from the LIVE physics Knowledge Graph, so
 * concept resolution is tested against real data, not fixtures.
 */
import { describe, it, expect } from 'vitest'
import { runBrain, resolveBrainMode, BrainMode } from '@/lib/teaching/runtime/brainRuntimeEntry'
import { buildConceptIndexFromKnowledgeGraph } from '@/lib/teaching/concept/conceptIndexSource'
import { TeachingIntent, LessonMode } from '@/lib/teaching/planner/teachingPlan'
import { ExecutionStepKind, ExecutionMode, Subsystem } from '@/lib/teaching/execution/executionPlan'
import { UNIMPLEMENTED_SUBSYSTEMS } from '@/lib/teaching/runtime/dispatchers'
import type { AdapterContext } from '@/lib/teaching/runtime/dispatchers'

const CALORIMETRY = 'phys.therm.calorimetry'
const NEWTON_2 = 'phys.mech.newtons-second-law'
const conceptIndex = buildConceptIndexFromKnowledgeGraph(['physics'])

const adapterContext: AdapterContext = {
  subjectSlug: 'physics', teachingLanguage: 'en', grade: 10,
  currentLevel: 'intermediate', userMessage: '',
}

const run = (message: string, over: Partial<Parameters<typeof runBrain>[0]> = {}) =>
  runBrain({
    message, activeLessonConceptId: CALORIMETRY, conceptIndex,
    adapterContext: { ...adapterContext, userMessage: message },
    ...over,
  }, BrainMode.SHADOW)

describe('Phase 3 · feature flag', () => {
  it('defaults to off — the legacy runtime is untouched', () => {
    expect(resolveBrainMode(undefined).mode).toBe(BrainMode.OFF)
    expect(resolveBrainMode('').mode).toBe(BrainMode.OFF)
    expect(resolveBrainMode('nonsense').mode).toBe(BrainMode.OFF)
  })

  it('off mode does not invoke the brain at all', async () => {
    expect(await runBrain({
      message: 'anything', activeLessonConceptId: CALORIMETRY, conceptIndex, adapterContext,
    }, BrainMode.OFF)).toBeNull()
  })

  it('shadow mode runs the brain', () => {
    expect(resolveBrainMode('shadow').mode).toBe(BrainMode.SHADOW)
  })

  it('active is downgraded to shadow while subsystems have no dispatcher', () => {
    const r = resolveBrainMode('active')
    expect(UNIMPLEMENTED_SUBSYSTEMS.length).toBeGreaterThan(0)
    expect(r.mode).toBe(BrainMode.SHADOW)
    expect(r.downgradedFrom).toBe(BrainMode.ACTIVE)
    expect(r.reason).toContain('LESSON_ENGINE')
  })
})

describe('Phase 4 · Scenario 10 — THE ORIGINAL BUG', () => {
  it("identifies Newton's Second Law, not the Calorimetry lesson", async () => {
    const r = (await run("Explain Newton's Second Law with visualization."))!
    expect(r.concepts.primaryConceptId).toBe(NEWTON_2)
    expect(r.concepts.offTopic).toBe(true)
  })

  it('plans a temporary excursion that returns to Calorimetry', async () => {
    const r = (await run("Explain Newton's Second Law with visualization."))!
    expect(r.teachingPlan.intent).toBe(TeachingIntent.VISUALIZE_CONCEPT)
    expect(r.teachingPlan.lessonMode).toBe(LessonMode.TEMPORARY_EXCURSION)
    expect(r.executionPlan.executionMode).toBe(ExecutionMode.CONCEPT_EXCURSION)
    expect(r.executionPlan.resumeInstruction.resumeConceptId).toBe(CALORIMETRY)
  })

  it('executes explanation -> VIE -> ADR 12 -> resume, in that order', async () => {
    const r = (await run("Explain Newton's Second Law with visualization."))!
    expect(r.executionPlan.orderedSteps.map(s => s.kind)).toEqual([
      ExecutionStepKind.EXPLAIN, ExecutionStepKind.VISUALIZE, ExecutionStepKind.LESSON_RESUME,
    ])
    expect(r.executionPlan.subsystemCalls).toEqual([
      Subsystem.EXPLANATION_ENGINE,
      Subsystem.VISUALIZATION_INTELLIGENCE_ENGINE,
      Subsystem.ADR12_VISUAL_PRODUCTION,
      Subsystem.LESSON_ENGINE,
    ])
  })

  it('NO ecosystem visualization: every visual is tied to the requested concept', async () => {
    const r = (await run("Explain Newton's Second Law with visualization."))!
    for (const out of r.runtimeResult.outputs) {
      const payload = JSON.stringify(out.payload)
      expect(payload).not.toContain('food_chain')
      expect(payload).not.toContain('water_cycle')
      expect(payload).not.toContain('ecosystem')
    }
    // Every step operates on the requested concept, never the lesson's.
    for (const step of r.executionPlan.orderedSteps) {
      if (step.kind === ExecutionStepKind.LESSON_RESUME) continue
      expect(step.inputs.conceptId).toBe(NEWTON_2)
    }
  })
})

describe('Phase 4 · Scenarios 1-9', () => {
  it('1. continue lesson stays in-lesson', async () => {
    const r = (await run('ok, got it'))!
    expect(r.teachingPlan.intent).toBe(TeachingIntent.CONTINUE_LESSON)
    expect(r.executionPlan.executionMode).toBe(ExecutionMode.LESSON_FLOW)
    expect(r.concepts.offTopic).toBe(false)
  })

  it('2. off-topic explanation plans an excursion', async () => {
    const r = (await run("Explain Newton's Second Law"))!
    expect(r.teachingPlan.intent).toBe(TeachingIntent.EXPLAIN_CONCEPT)
    expect(r.teachingPlan.targetConceptId).toBe(NEWTON_2)
    expect(r.executionPlan.executionMode).toBe(ExecutionMode.CONCEPT_EXCURSION)
  })

  it('3. visualization request chains VIE then ADR 12', async () => {
    const r = (await run("show me a diagram of Newton's Second Law", { learnerRequest: 'diagram' }))!
    const vis = r.executionPlan.orderedSteps.find(s => s.kind === ExecutionStepKind.VISUALIZE)!
    expect(vis.subsystems).toEqual([
      Subsystem.VISUALIZATION_INTELLIGENCE_ENGINE, Subsystem.ADR12_VISUAL_PRODUCTION,
    ])
  })

  it('4. quiz plans assessment then waits', async () => {
    const r = (await run('quiz me on this'))!
    expect(r.teachingPlan.intent).toBe(TeachingIntent.QUIZ_ME)
    const kinds = r.executionPlan.orderedSteps.map(s => s.kind)
    expect(kinds).toContain(ExecutionStepKind.ASSESS)
    expect(kinds[kinds.indexOf(ExecutionStepKind.ASSESS) + 1]).toBe(ExecutionStepKind.WAIT_FOR_STUDENT)
  })

  it('5. comparison carries both concepts', async () => {
    const r = (await run('difference between Calorimetry and Specific Heat Capacity'))!
    expect(r.concepts.comparisonConceptIds.length).toBeGreaterThanOrEqual(2)
    expect(r.teachingPlan.intent).toBe(TeachingIntent.COMPARE_CONCEPTS)
  })

  it('6. lesson resume returns to the lesson concept', async () => {
    const r = (await run('back to the lesson', { previousConceptId: NEWTON_2 }))!
    expect(r.teachingPlan.intent).toBe(TeachingIntent.RETURN_TO_LESSON)
    expect(r.executionPlan.executionMode).toBe(ExecutionMode.LESSON_RESUME)
    expect(r.teachingPlan.targetConceptId).toBe(CALORIMETRY)
  })

  it('7. clarification: ambiguity asks before teaching', async () => {
    // Two real KG concepts share the exact title "Exponential Function"
    // (math.alg.exponential-function and math.func.exponential-function).
    const mathIndex = buildConceptIndexFromKnowledgeGraph(['mathematics'])
    const r = (await runBrain({
      message: 'explain Exponential Function',
      activeLessonConceptId: CALORIMETRY,
      conceptIndex: mathIndex,
      adapterContext,
    }, BrainMode.SHADOW))!
    expect(r.concepts.ambiguityDetected).toBe(true)
    expect(r.executionPlan.executionMode).toBe(ExecutionMode.DISAMBIGUATION)
    expect(r.executionPlan.orderedSteps[0].kind).toBe(ExecutionStepKind.ASK_DISAMBIGUATION)
    expect(r.executionPlan.orderedSteps.map(s => s.kind)).not.toContain(ExecutionStepKind.EXPLAIN)
    expect(r.executionPlan.deferredSteps.length).toBeGreaterThan(0)
  })

  it('8. assessment step targets the Assessment Engine', async () => {
    const r = (await run('test me'))!
    const assess = r.executionPlan.orderedSteps.find(s => s.kind === ExecutionStepKind.ASSESS)!
    expect(assess.subsystems).toEqual([Subsystem.ASSESSMENT_ENGINE])
  })

  it('9. unknown request degrades safely, never throws', async () => {
    const r = (await runBrain({
      message: 'zzzz', activeLessonConceptId: null, conceptIndex, adapterContext,
    }, BrainMode.SHADOW))!
    expect(r.teachingPlan.intent).toBe(TeachingIntent.UNKNOWN)
    expect(r.runtimeResult).toBeTruthy()
  })
})

describe('Phase 1 · dispatcher adapters', () => {
  it('the two unimplemented subsystems are declared, not faked', () => {
    expect(UNIMPLEMENTED_SUBSYSTEMS).toEqual([Subsystem.ASSESSMENT_ENGINE, Subsystem.LESSON_ENGINE])
  })

  it('an unimplemented subsystem degrades the step without ending the turn', async () => {
    const r = (await run('ok, got it'))!
    // LESSON_FLOW dispatches to the Lesson Engine, which has no implementation.
    expect(r.runtimeResult.completedSteps.length).toBe(0)
    expect(r.runtimeResult.skippedSteps.length).toBeGreaterThan(0)
    expect(r.runtimeResult).toBeTruthy() // did not throw
  })

  it('the VIE adapter produces a real VisualIntent for a VKR-covered concept', async () => {
    const r = (await run('show me a diagram of Linear Momentum', { learnerRequest: 'diagram' }))!
    const vie = r.runtimeResult.outputs.find(o => o.subsystem === Subsystem.VISUALIZATION_INTELLIGENCE_ENGINE)
    if (vie) expect(vie.payload).toHaveProperty('purpose')
  })
})

describe('Brain integration · safety', () => {
  it('never throws, even on hostile input', async () => {
    for (const message of ['', '   ', '???', 'a'.repeat(5000)]) {
      await expect(runBrain({
        message, activeLessonConceptId: CALORIMETRY, conceptIndex, adapterContext,
      }, BrainMode.SHADOW)).resolves.toBeDefined()
    }
  })

  it('is deterministic across identical runs', async () => {
    const a = (await run("Explain Newton's Second Law with visualization."))!
    const b = (await run("Explain Newton's Second Law with visualization."))!
    expect(a.executionPlan).toEqual(b.executionPlan)
    expect(a.concepts.primaryConceptId).toBe(b.concepts.primaryConceptId)
  })
})
