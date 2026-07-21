/**
 * Brain Execution (Milestone 4) — tests.
 *
 * Runs the Brain runtime ON (ENABLE_BRAIN_RUNTIME=1) and verifies every
 * decision end-to-end through the real pipeline (CUE → Decision Engine →
 * Dispatcher → execution block), plus the metrics surface the milestone
 * requires (turns / Groq calls / memory serves / decisions / fallbacks).
 */
import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { understandStudentTurn, type UnderstandingInputs } from '@/lib/understanding'
import { decideTeaching, type TeachingDecision } from '@/lib/understanding/decisionEngine'
import { isBrainRuntimeEnabled, planDispatch, type DispatchPlan } from '@/lib/understanding/dispatcher'
import { buildBrainExecutionBlock } from '@/lib/understanding/execution'
import { recordDispatch, recordServe, resetBrainMetrics, snapshotBrainMetrics } from '@/lib/understanding/brainMetrics'

function inputs(overrides: Partial<UnderstandingInputs> = {}): UnderstandingInputs {
  return {
    message: '', history: [], recoveryKey: null, firstLessonActive: false,
    lastSignal: null, sessionFailureCount: 0, episode: null, freshBoundary: false,
    lastSuccessfulTeachingStyle: null, conceptId: null, placement: null,
    pendingPlacementProbe: null, dueReviewCount: 0, strategyType: null,
    evidenceMove: null, assembled: null, memoryFallbackReason: null,
    observations: {}, ...overrides,
  }
}

function pipeline(over: Partial<UnderstandingInputs>, assembledAvailable: boolean): { decision: TeachingDecision; plan: DispatchPlan; block: string } {
  const decision = decideTeaching(understandStudentTurn(inputs(over)))
  const plan = planDispatch(decision, { assembledAvailable })
  return { decision, plan, block: buildBrainExecutionBlock(plan, decision) }
}

beforeEach(() => { process.env.ENABLE_BRAIN_RUNTIME = '1'; resetBrainMetrics() })
afterEach(() => { delete process.env.ENABLE_BRAIN_RUNTIME })

describe('Brain Execution — runtime ON, every decision verified', () => {
  it('flag is genuinely ON for these tests', () => {
    expect(isBrainRuntimeEnabled()).toBe(true)
  })

  it('SERVE_EXPLANATION_MEMORY: served directly, Groq never called, NO execution block (no LLM to scope)', () => {
    const { plan, block } = pipeline({
      assembled: { usedAssetIds: ['a1'], explanationConfidence: 0.9, explanationServingMode: 'exact' },
    }, true)
    expect(plan.executor).toBe('EXPLANATION_MEMORY')
    expect(plan.groqRequired).toBe(false)
    expect(block).toBe('')
  })

  it('ASK_DIAGNOSTIC_QUESTION: engine question, LLM only renders naturally', () => {
    const { plan, block } = pipeline({ pendingPlacementProbe: 'at' }, false)
    expect(plan.decision).toBe('ASK_DIAGNOSTIC_QUESTION')
    expect(block).toContain('BRAIN DECISION (authoritative')
    expect(block).toContain('placement verification block above')
    expect(block).toContain('render the question naturally')
  })

  it('DETECT_MISCONCEPTION: engine decides, LLM only explains — misconception named', () => {
    const { block } = pipeline({
      observations: {
        misconceptions: [{
          type: 'X', label: 'Bigger denominator = bigger fraction', description: 'd',
          confidence: 'HIGH', evidenceCount: 3, remediationSteps: [],
        }],
      },
    }, false)
    expect(block).toContain('misconception/remediation block above')
    expect(block).toContain('Misconception under repair: "Bigger denominator = bigger fraction"')
    expect(block).toContain('you only explain')
  })

  it('REVIEW_PREREQUISITE: prerequisite engine decides, LLM only teaches — KG prerequisite named', () => {
    const { decision, block } = pipeline({ sessionFailureCount: 2, conceptId: 'math.arith.fractions' }, false)
    expect(decision.decision).toBe('REVIEW_PREREQUISITE')
    expect(block).toContain('Prerequisite to teach:')
    expect(block).toContain(decision.parameters.prerequisiteId as string)
  })

  it('PRACTICE: practice engine decides, LLM only presents — no advancement', () => {
    const { block } = pipeline({ lastSignal: { correctness: false } }, false)
    expect(block).toContain('consolidation practice')
    expect(block).toContain('No new concepts and no advancement')
  })

  it('VISUALIZATION: visualization engine decides, LLM only narrates — visual named', () => {
    const { block } = pipeline({
      message: 'please show me a diagram',
      lastSignal: { correctness: true },
      observations: { availableVisual: 'force_diagram', visualDetectionRan: true },
    }, false)
    expect(block).toContain('Visual to serve: force_diagram')
    expect(block).toContain('narrate')
  })

  it('CONTINUE_LESSON: lesson engine decides, LLM only speaks', () => {
    const { block } = pipeline({
      message: 'because the density is lower',
      history: [{ role: 'assistant', content: 'Why does ice float?' }],
      lastSignal: { correctness: true },
    }, false)
    expect(block).toContain('Continue the lesson exactly where the lesson plan above left off')
  })

  it('ESCALATE_TO_LLM: current pipeline unchanged — no execution block injected', () => {
    const { plan, block } = pipeline({}, false)
    expect(plan.decision).toBe('ESCALATE_TO_LLM')
    expect(block).toBe('')
  })

  it('every renderer block forbids the LLM from deciding', () => {
    const cases = [
      pipeline({ pendingPlacementProbe: 'at' }, false),
      pipeline({ lastSignal: { correctness: false } }, false),
      pipeline({ sessionFailureCount: 2, conceptId: 'math.arith.fractions' }, false),
    ]
    for (const { block } of cases) {
      expect(block).toContain('do NOT choose a different action')
      expect(block).toContain('The engine decided WHAT happens; you only render it.')
    }
  })

  it('execution block never throws on malformed inputs', () => {
    expect(buildBrainExecutionBlock(null as never, null as never)).toBe('')
  })
})

describe('Brain Execution — the milestone measurements', () => {
  it('counts turns, Groq calls, memory serves, decisions, and fallbacks', () => {
    // Simulated traffic: 2 memory serves, 3 LLM turns, 1 fallback.
    const memory = pipeline({ assembled: { usedAssetIds: ['a1'], explanationConfidence: 0.9, explanationServingMode: 'exact' } }, true)
    const floor = pipeline({}, false)
    const practice = pipeline({ lastSignal: { correctness: false } }, false)
    const inconsistent = planDispatch(
      { ...memory.decision, decision: 'SERVE_EXPLANATION_MEMORY' }, { assembledAvailable: false },
    )

    recordDispatch(memory.plan, true); recordServe('memory')
    recordDispatch(memory.plan, true); recordServe('memory')
    recordDispatch(floor.plan, true); recordServe('llm')
    recordDispatch(practice.plan, true); recordServe('llm')
    recordDispatch(inconsistent, true); recordServe('llm')
    recordDispatch(null, true) // CUE failure path

    const m = snapshotBrainMetrics()
    expect(m.totalTurns).toBe(6)
    expect(m.activeTurns).toBe(6)
    expect(m.explanationMemoryServes).toBe(2)
    expect(m.groqCalls).toBe(3)
    expect(m.fallbacks).toBe(2) // inconsistent memory plan + null plan
    expect(m.decisions['SERVE_EXPLANATION_MEMORY']).toBe(3)
    expect(m.decisions['ESCALATE_TO_LLM']).toBe(1)
    expect(m.decisions['PRACTICE']).toBe(1)
    expect(m.decisions['NO_PLAN']).toBe(1)
  })

  it('Groq reduction invariant: memory serves + Groq calls = served turns, and only memory serves skip Groq', () => {
    const memory = pipeline({ assembled: { usedAssetIds: ['a1'], explanationConfidence: 0.9, explanationServingMode: 'exact' } }, true)
    const llm = pipeline({}, false)
    recordDispatch(memory.plan, true); recordServe('memory')
    recordDispatch(llm.plan, true); recordServe('llm')
    const m = snapshotBrainMetrics()
    expect(m.explanationMemoryServes + m.groqCalls).toBe(2)
    expect(memory.plan.groqRequired).toBe(false)
    expect(llm.plan.groqRequired).toBe(true)
  })

  it('shadow turns are counted separately when the flag is off', () => {
    delete process.env.ENABLE_BRAIN_RUNTIME
    const p = pipeline({}, false)
    recordDispatch(p.plan, isBrainRuntimeEnabled())
    const m = snapshotBrainMetrics()
    expect(m.shadowTurns).toBe(1)
    expect(m.activeTurns).toBe(0)
  })
})
