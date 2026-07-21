/**
 * Brain Validation Suite — Milestone 5.
 *
 * Validates whether the Brain Runtime decides like a human teacher.
 * Every scenario states (a) the classroom situation, (b) what a human
 * teacher would do, and asserts the pipeline (CUE → Decision Engine →
 * Dispatcher) does the same. Scenarios V8–V10 pin the Milestone 5 P0
 * fixes (closing protection, first-lesson protocol, request-kind
 * matching). The measurement block at the end produces the milestone's
 * required counts from a simulated mixed session, flag ON vs OFF.
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
    observations: {}, ...inputsSafe(overrides),
  }
}
function inputsSafe(o: Partial<UnderstandingInputs>): Partial<UnderstandingInputs> { return o }

function run(over: Partial<UnderstandingInputs>): { decision: TeachingDecision; plan: DispatchPlan } {
  const decision = decideTeaching(understandStudentTurn(inputs(over)))
  const plan = planDispatch(decision, { assembledAvailable: over.assembled != null })
  return { decision, plan }
}

const CLOSING_EPISODE = {
  startedAt: new Date().toISOString(), phase: 'CLOSING' as const,
  visibleFailures: 2, retroWinOwed: false, openingSatisfied: true,
}

beforeEach(() => { process.env.ENABLE_BRAIN_RUNTIME = '1'; resetBrainMetrics() })
afterEach(() => { delete process.env.ENABLE_BRAIN_RUNTIME })

describe('Brain Validation — would a human teacher do the same?', () => {
  it('V1: learner says "I give up" — teacher comforts, NEVER pushes content (even authored content)', () => {
    const { decision, plan } = run({
      message: 'I give up', recoveryKey: 'i_give_up',
      assembled: { usedAssetIds: ['a1'], explanationConfidence: 0.9, explanationServingMode: 'exact' },
    })
    expect(decision.ruleId).toBe('D0-RECOVERY-PREEMPT')
    expect(plan.executor).toBe('LLM_OPEN') // recovery script renders; no lesson, no quiz
  })

  it('V2: learner answered correctly and is engaged — teacher continues the lesson', () => {
    const { decision } = run({
      message: 'the object keeps moving at constant velocity',
      history: [{ role: 'assistant', content: 'What happens with no net force?' }],
      lastSignal: { correctness: true },
    })
    expect(decision.decision).toBe('CONTINUE_LESSON')
  })

  it('V3: learner just got one wrong — teacher consolidates at the same level, does not advance', () => {
    const { decision } = run({ lastSignal: { correctness: false } })
    expect(decision.decision).toBe('PRACTICE')
    expect(decision.rationale.join(' ')).toContain('not advancement')
  })

  it('V4: repeated failures on a concept with a known prerequisite — teacher steps back one step', () => {
    const { decision } = run({ sessionFailureCount: 2, conceptId: 'math.arith.fractions' })
    expect(decision.decision).toBe('REVIEW_PREREQUISITE')
    expect(decision.parameters.prerequisiteId).toBeTruthy()
  })

  it('V5: a HIGH-confidence misconception is active — teacher repairs it before anything else', () => {
    const { decision } = run({
      lastSignal: { correctness: true }, // even while "progressing"
      observations: {
        misconceptions: [{
          type: 'X', label: 'Heavier objects fall faster', description: 'd',
          confidence: 'HIGH', evidenceCount: 4, remediationSteps: [],
        }],
      },
    })
    expect(decision.decision).toBe('DETECT_MISCONCEPTION')
  })

  it('V6: vetted authored material exists for exactly this concept — teacher uses it (no improvisation)', () => {
    const { decision, plan } = run({
      assembled: { usedAssetIds: ['a1'], explanationConfidence: 0.92, explanationServingMode: 'exact' },
    })
    expect(decision.decision).toBe('SERVE_EXPLANATION_MEMORY')
    expect(plan.groqRequired).toBe(false)
  })

  it('V7: teacher does not know where the learner stands — diagnose before teaching', () => {
    const { decision } = run({ pendingPlacementProbe: 'at' })
    expect(decision.decision).toBe('ASK_DIAGNOSTIC_QUESTION')
  })

  it('V8 (P0 fix): session is CLOSING after spent failure budget — teacher closes warmly; no practice, no memory serve, no probes', () => {
    const fragileAtClose = run({ episode: CLOSING_EPISODE, lastSignal: { correctness: false } })
    expect(fragileAtClose.decision.ruleId).toBe('D0b-CLOSING-PROTECT')
    expect(fragileAtClose.decision.decision).toBe('ESCALATE_TO_LLM')
    // even authored content must not open new material inside the close:
    const memoryAtClose = run({
      episode: CLOSING_EPISODE,
      assembled: { usedAssetIds: ['a1'], explanationConfidence: 0.9, explanationServingMode: 'exact' },
    })
    expect(memoryAtClose.decision.ruleId).toBe('D0b-CLOSING-PROTECT')
  })

  it('V9 (P0 fix): lesson one with a complete beginner — the protocol outranks generic practice', () => {
    const { decision, plan } = run({ firstLessonActive: true, lastSignal: { correctness: false } })
    expect(decision.ruleId).toBe('D0c-FIRST-LESSON-PROTOCOL')
    // the first-lesson block (already injected) directs the renderer:
    expect(buildBrainExecutionBlock(plan, decision)).toBe('')
  })

  it('V10 (P0 fix): learner asks "explain it differently" — teacher re-explains; does NOT push an unrequested diagram', () => {
    const { decision } = run({
      message: 'can you explain it differently please',
      lastSignal: { correctness: true },
      observations: { availableVisual: 'force_diagram', visualDetectionRan: true },
    })
    expect(decision.decision).not.toBe('VISUALIZATION')
  })

  it('V11: learner asks for a diagram and one exists — teacher shows it', () => {
    const { decision } = run({
      message: 'please show me a diagram',
      lastSignal: { correctness: true },
      observations: { availableVisual: 'force_diagram', visualDetectionRan: true },
    })
    expect(decision.decision).toBe('VISUALIZATION')
  })

  it('V12: open question — teacher answers what was asked (P1: answer-student-first, ahead of the floor)', () => {
    const { decision } = run({ message: 'why is the sky blue?' })
    expect(decision.decision).toBe('ESCALATE_TO_LLM')
    expect(decision.ruleId).toBe('D4b-ANSWER-STUDENT-FIRST')
  })

  it('V14 (M6): confident-wrong — teacher treats it as a committed wrong rule, repairs before anything (migrated LAST-ANSWER READ)', () => {
    const { decision } = run({ lastSignal: { correctness: false, confidence: 'high' } })
    expect(decision.decision).toBe('DETECT_MISCONCEPTION')
    expect(decision.ruleId).toBe('D2b-CONFIDENT-WRONG')
    expect(decision.rationale.join(' ')).toContain('collide')
  })

  it('V15 (M6): hesitant-correct — right answer with shaky ownership → same-level practice, no advancement (migrated LAST-ANSWER READ)', () => {
    const { decision } = run({ lastSignal: { correctness: true, confidence: 'low' } })
    expect(decision.decision).toBe('PRACTICE')
    expect(decision.ruleId).toBe('D5-FRAGILE-CONSOLIDATE')
  })

  it('V16 (M6): an engine-catalogued HIGH misconception still outranks the bare confident-wrong signature', () => {
    const { decision } = run({
      lastSignal: { correctness: false, confidence: 'high' },
      observations: {
        misconceptions: [{
          type: 'X', label: 'Named misconception', description: 'd',
          confidence: 'HIGH', evidenceCount: 3, remediationSteps: [],
        }],
      },
    })
    expect(decision.ruleId).toBe('D2-MISCONCEPTION-HIGH')
    expect(decision.parameters.misconceptionLabel).toBe('Named misconception')
  })

  it('V13: recovery outranks closing outranks first-lesson (preemption order is total)', () => {
    const all = run({
      message: 'I give up', recoveryKey: 'i_give_up',
      episode: CLOSING_EPISODE, firstLessonActive: true,
    })
    expect(all.decision.ruleId).toBe('D0-RECOVERY-PREEMPT')
    const closingBeatsFirstLesson = run({ episode: CLOSING_EPISODE, firstLessonActive: true })
    expect(closingBeatsFirstLesson.decision.ruleId).toBe('D0b-CLOSING-PROTECT')
  })
})

describe('Brain Validation — milestone measurements (simulated mixed session)', () => {
  const TRAFFIC: Array<{ over: Partial<UnderstandingInputs>; assembled: boolean }> = [
    { over: { assembled: { usedAssetIds: ['a1'], explanationConfidence: 0.9, explanationServingMode: 'exact' } }, assembled: true },
    { over: { assembled: { usedAssetIds: ['a2'], explanationConfidence: 0.8, explanationServingMode: 'graded' } }, assembled: true },
    { over: { lastSignal: { correctness: false } }, assembled: false },
    { over: { sessionFailureCount: 2, conceptId: 'math.arith.fractions' }, assembled: false },
    { over: { pendingPlacementProbe: 'at' }, assembled: false },
    { over: { message: 'why is the sky blue?' }, assembled: false },
    { over: { message: 'I give up', recoveryKey: 'i_give_up' }, assembled: false },
    { over: { episode: CLOSING_EPISODE }, assembled: false },
    { over: { firstLessonActive: true }, assembled: false },
    { over: {
      message: 'because the density is lower',
      history: [{ role: 'assistant', content: 'Why does ice float?' }],
      lastSignal: { correctness: true },
    }, assembled: false },
  ]

  it('flag ON: counts Brain decisions, Groq calls, memory serves, fallbacks — zero incorrect dispatches', () => {
    expect(isBrainRuntimeEnabled()).toBe(true)
    let incorrectDispatches = 0
    for (const t of TRAFFIC) {
      const decision = decideTeaching(understandStudentTurn(inputs(t.over)))
      const plan = planDispatch(decision, { assembledAvailable: t.assembled })
      recordDispatch(plan, true)
      recordServe(plan.groqRequired ? 'llm' : 'memory')
      // an incorrect dispatch = memory executor without content, or a
      // renderer/open executor claiming groqRequired=false:
      if (plan.executor === 'EXPLANATION_MEMORY' && !t.assembled) incorrectDispatches += 1
      if (plan.executor !== 'EXPLANATION_MEMORY' && !plan.groqRequired) incorrectDispatches += 1
    }
    const m = snapshotBrainMetrics()
    expect(m.totalTurns).toBe(10)          // total turns
    expect(m.activeTurns).toBe(10)         // all Brain-governed (flag ON)
    expect(m.explanationMemoryServes).toBe(2) // memory decisions — Groq eliminated
    expect(m.groqCalls).toBe(8)            // Groq calls (renderer or open)
    expect(m.fallbacks).toBe(0)            // wrong fallbacks: none
    expect(incorrectDispatches).toBe(0)    // incorrect dispatches: none
    // decision distribution is fully accounted for:
    const decided = Object.values(m.decisions).reduce((a, b) => a + b, 0)
    expect(decided).toBe(10)
  })

  it('flag OFF: identical decisions are recorded as shadow — legacy serving untouched', () => {
    delete process.env.ENABLE_BRAIN_RUNTIME
    for (const t of TRAFFIC) {
      const decision = decideTeaching(understandStudentTurn(inputs(t.over)))
      const plan = planDispatch(decision, { assembledAvailable: t.assembled })
      recordDispatch(plan, isBrainRuntimeEnabled())
    }
    const m = snapshotBrainMetrics()
    expect(m.shadowTurns).toBe(10)
    expect(m.activeTurns).toBe(0)
  })

  it('flag ON vs OFF produce byte-identical decisions (the flag changes execution, never judgment)', () => {
    for (const t of TRAFFIC) {
      process.env.ENABLE_BRAIN_RUNTIME = '1'
      const on = decideTeaching(understandStudentTurn(inputs(t.over)))
      delete process.env.ENABLE_BRAIN_RUNTIME
      const off = decideTeaching(understandStudentTurn(inputs(t.over)))
      expect(on.decision).toBe(off.decision)
      expect(on.ruleId).toBe(off.ruleId)
    }
  })
})
