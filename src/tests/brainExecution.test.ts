/**
 * Brain Execution (Milestone 4) — tests.
 *
 * Runs the Brain runtime ON (ENABLE_BRAIN_RUNTIME=1) and verifies every
 * decision end-to-end through the real pipeline (CUE → Decision Engine →
 * Dispatcher → execution block), plus the metrics surface the milestone
 * requires (turns / Groq calls / memory serves / decisions / fallbacks).
 */
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { understandStudentTurn, type UnderstandingInputs } from '@/lib/understanding'
import { decideTeaching, type TeachingDecision } from '@/lib/understanding/decisionEngine'
import { isBrainRuntimeEnabled, planDispatch, type DispatchPlan } from '@/lib/understanding/dispatcher'
import { buildBrainExecutionBlock, checkBrainCompliance } from '@/lib/understanding/execution'
import {
  recordDispatch, recordServe, recordCompliance, resetBrainMetrics, snapshotBrainMetrics,
  recordBrainEvent, getSessionBrainMetrics, type BrainEvent,
} from '@/lib/understanding/brainMetrics'

function inputs(overrides: Partial<UnderstandingInputs> = {}): UnderstandingInputs {
  return {
    message: '', history: [], recoveryKey: null, firstLessonActive: false,
    lastSignal: null, sessionFailureCount: 0, episode: null, freshBoundary: false,
    consecutivePriorKnowledgeProbes: 0,
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
    expect(block).toContain('misconception/remediation block appears above')
    expect(block).toContain('Misconception: "Bigger denominator = bigger fraction"')
    expect(block).toContain('you only render')
  })

  it('REVIEW_PREREQUISITE: prerequisite engine decides, LLM only teaches — KG prerequisite named', () => {
    const { decision, block } = pipeline({ sessionFailureCount: 2, conceptId: 'math.arith.fractions' }, false)
    expect(decision.decision).toBe('REVIEW_PREREQUISITE')
    expect(block).toContain('Prerequisite:')
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
    expect(block).toContain('Visual: force_diagram')
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

  it('TEACH_DIRECTLY: no known prerequisite → stop-probing engine decides, LLM only demonstrates (P0 execution-gap fix)', () => {
    const { decision, block } = pipeline({ sessionFailureCount: 2, conceptId: 'math.found.mathematical-thinking' }, false)
    expect(decision.decision).toBe('TEACH_DIRECTLY')
    expect(block).toContain('BRAIN DECISION (authoritative')
    expect(block).toContain('Stop probing')
    expect(block).toContain('demonstrate')
  })

  it('TEACH_DIRECTLY via the semantic question-loop path also gets an execution block', () => {
    const { decision, block } = pipeline({ consecutivePriorKnowledgeProbes: 2 }, false)
    expect(decision.decision).toBe('TEACH_DIRECTLY')
    expect(decision.ruleId).toBe('D0e-QUESTION-LOOP-BREAK')
    expect(block).not.toBe('')
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
      pipeline({ sessionFailureCount: 2, conceptId: 'math.found.mathematical-thinking' }, false),
    ]
    for (const { block } of cases) {
      expect(block).toContain('do NOT choose a different action')
      expect(block).toContain('The engine decided WHAT; you only render.')
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
    process.env.ENABLE_BRAIN_RUNTIME = '0'
    const p = pipeline({}, false)
    recordDispatch(p.plan, isBrainRuntimeEnabled())
    const m = snapshotBrainMetrics()
    expect(m.shadowTurns).toBe(1)
    expect(m.activeTurns).toBe(0)
  })
})

describe('Brain compliance validation (P0)', () => {
  it('no plan/decision this turn → trivially compliant', () => {
    expect(checkBrainCompliance('anything', null, null, false)).toEqual({
      compliant: true, reason: 'no Brain decision this turn',
    })
  })

  it('memory-served turn → trivially compliant, no LLM text to check', () => {
    const { plan, decision } = pipeline({
      assembled: { usedAssetIds: ['a1'], explanationConfidence: 0.9, explanationServingMode: 'exact' },
    }, true)
    const result = checkBrainCompliance('served text', plan, decision, false)
    expect(result.compliant).toBe(true)
    expect(result.reason).toMatch(/memory-served/)
  })

  it('ESCALATE_TO_LLM → trivially compliant, no structural directive to check', () => {
    const { plan, decision } = pipeline({}, false)
    expect(checkBrainCompliance('anything at all', plan, decision, false).compliant).toBe(true)
  })

  it('ASK_DIAGNOSTIC_QUESTION: compliant only if the response actually asks a question', () => {
    const { plan, decision } = pipeline({ pendingPlacementProbe: 'at' }, false)
    expect(checkBrainCompliance('Quick one — have you seen this before?', plan, decision, false).compliant).toBe(true)
    const violation = checkBrainCompliance('Here is the answer, no question here.', plan, decision, false)
    expect(violation.compliant).toBe(false)
    expect(violation.reason).toMatch(/asked no question/)
  })

  it('TEACH_DIRECTLY: compliant only if the response asks NO question', () => {
    const { plan, decision } = pipeline({ sessionFailureCount: 2, conceptId: 'math.found.mathematical-thinking' }, false)
    expect(checkBrainCompliance('Here is a worked example: 2+2=4.', plan, decision, false).compliant).toBe(true)
    const violation = checkBrainCompliance('Have you seen this before?', plan, decision, false)
    expect(violation.compliant).toBe(false)
    expect(violation.reason).toMatch(/asked one/)
  })

  it('VISUALIZATION: compliant only if a visual actually rendered', () => {
    const { plan, decision } = pipeline({
      message: 'please show me a diagram',
      lastSignal: { correctness: true },
      observations: { availableVisual: 'force_diagram', visualDetectionRan: true },
    }, false)
    expect(checkBrainCompliance('Here it is.', plan, decision, true).compliant).toBe(true)
    const violation = checkBrainCompliance('Here it is, in words only.', plan, decision, false)
    expect(violation.compliant).toBe(false)
    expect(violation.reason).toMatch(/no visual rendered/)
  })

  it('decisions with no unambiguous structural claim report compliant, not a fabricated check', () => {
    const { plan, decision } = pipeline({ lastSignal: { correctness: false } }, false)
    expect(decision.decision).toBe('PRACTICE')
    const result = checkBrainCompliance('anything at all', plan, decision, false)
    expect(result.compliant).toBe(true)
    expect(result.reason).toMatch(/no structural check defined/)
  })

  it('never throws on malformed inputs', () => {
    expect(() => checkBrainCompliance(undefined as never, {} as never, {} as never, false)).not.toThrow()
  })

  it('recordCompliance never silently ignores a violation — always logged, counters always incremented', () => {
    resetBrainMetrics()
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
    recordCompliance({ compliant: true, reason: 'ok' })
    recordCompliance({ compliant: false, reason: 'violation A' })
    recordCompliance({ compliant: false, reason: 'violation B' })
    const m = snapshotBrainMetrics()
    expect(m.complianceChecks).toBe(3)
    expect(m.complianceViolations).toBe(2)
    expect(warnSpy).toHaveBeenCalledTimes(2)
    expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('violation A'))
    warnSpy.mockRestore()
  })
})

// P1 — production-validation telemetry.
describe('Brain telemetry (P1)', () => {
  function event(overrides: Partial<BrainEvent> = {}): BrainEvent {
    return {
      version: 1, timestamp: new Date().toISOString(), sessionId: 's1', userId: 'u1', subjectSlug: 'physics',
      brainRuntimeActive: false, brainDecision: null, brainRuleId: null,
      compliant: null, complianceReason: null,
      explanationMemoryAvailable: false, explanationMemoryHit: false,
      fallbackReason: 'no_asset', llmUsed: true, provider: 'groq', latencyMs: 100,
      recoveryTriggered: false, recoveryKey: null, frustrationDetected: false,
      questionLoopDetected: false, directInstructionTriggered: false,
      brainLegacyDisagreement: false, visualFired: false, responseLength: 200,
      ...overrides,
    }
  }

  beforeEach(() => resetBrainMetrics())

  it('unknown session returns null, never a fabricated all-zero report', () => {
    expect(getSessionBrainMetrics('never-seen')).toBeNull()
  })

  it('one call per turn emits exactly one structured BRAIN_EVENT log line', () => {
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
    recordBrainEvent(event())
    const calls = logSpy.mock.calls.filter((c) => typeof c[0] === 'string' && c[0].startsWith('[learn/chat] BRAIN_EVENT='))
    expect(calls.length).toBe(1)
    const parsed = JSON.parse(calls[0][0].replace('[learn/chat] BRAIN_EVENT=', ''))
    expect(parsed.sessionId).toBe('s1')
    logSpy.mockRestore()
  })

  it('counters are correct: compliance/memory/llm/recovery/frustration/loop/direct-instruction percentages', () => {
    recordBrainEvent(event({ compliant: true, llmUsed: true, explanationMemoryHit: false }))
    recordBrainEvent(event({ compliant: false, llmUsed: true, explanationMemoryHit: false }))
    recordBrainEvent(event({ compliant: null, llmUsed: false, explanationMemoryHit: true, explanationMemoryAvailable: true }))
    recordBrainEvent(event({ recoveryTriggered: true, recoveryKey: 'dont_know' }))
    recordBrainEvent(event({ recoveryTriggered: true, frustrationDetected: true, recoveryKey: 'frustrated' }))
    recordBrainEvent(event({ questionLoopDetected: true }))
    recordBrainEvent(event({ directInstructionTriggered: true }))

    const m = getSessionBrainMetrics('s1')!
    expect(m.totalTurns).toBe(7)
    // compliance % is only over turns where a compliance check ran (2 of 7)
    expect(m.compliancePct).toBe(50)
    expect(m.explanationMemoryPct).toBeCloseTo((1 / 7) * 100, 1)
    expect(m.llmPct).toBeCloseTo((6 / 7) * 100, 1)
    expect(m.recoveryPct).toBeCloseTo((2 / 7) * 100, 1)
    expect(m.frustrationPct).toBeCloseTo((1 / 7) * 100, 1)
    expect(m.questionLoopPct).toBeCloseTo((1 / 7) * 100, 1)
    expect(m.directInstructionPct).toBeCloseTo((1 / 7) * 100, 1)
  })

  it('compliancePct is null when no compliance check ever ran this session', () => {
    recordBrainEvent(event({ compliant: null }))
    const m = getSessionBrainMetrics('s1')!
    expect(m.compliancePct).toBeNull()
  })

  it('average latency and Brain/legacy disagreements are counted correctly', () => {
    recordBrainEvent(event({ latencyMs: 100 }))
    recordBrainEvent(event({ latencyMs: 300 }))
    recordBrainEvent(event({ brainLegacyDisagreement: true }))
    const m = getSessionBrainMetrics('s1')!
    expect(m.avgLatencyMs).toBe(Math.round((100 + 300 + 100) / 3))
    expect(m.brainLegacyDisagreements).toBe(1)
    expect(m.brainLegacyDisagreementPct).toBeCloseTo((1 / 3) * 100, 1)
  })

  it('sessions are tracked independently', () => {
    recordBrainEvent(event({ sessionId: 'a', llmUsed: true }))
    recordBrainEvent(event({ sessionId: 'b', llmUsed: false, explanationMemoryHit: true, explanationMemoryAvailable: true }))
    expect(getSessionBrainMetrics('a')!.llmPct).toBe(100)
    expect(getSessionBrainMetrics('b')!.llmPct).toBe(0)
  })

  it('resetBrainMetrics clears session state too', () => {
    recordBrainEvent(event())
    resetBrainMetrics()
    expect(getSessionBrainMetrics('s1')).toBeNull()
  })

  it('never throws on malformed events', () => {
    expect(() => recordBrainEvent(null as never)).not.toThrow()
    expect(() => recordBrainEvent({} as never)).not.toThrow()
    expect(() => recordBrainEvent({ sessionId: 123 } as never)).not.toThrow()
  })

  it('logging failure never breaks metric recording (survives a throwing console.log)', () => {
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => { throw new Error('log sink down') })
    expect(() => recordBrainEvent(event({ sessionId: 'resilient' }))).not.toThrow()
    logSpy.mockRestore()
    // the counter fold runs in its own try/catch, independent of the log call
    expect(getSessionBrainMetrics('resilient')!.totalTurns).toBe(1)
  })
})
