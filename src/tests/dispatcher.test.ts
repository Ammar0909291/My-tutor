/**
 * Runtime Dispatcher (Milestone 3) — tests.
 *
 * Pins: the complete decision→engine routing table, the three-executor
 * model and its groqRequired invariant (Groq only when the plan says so),
 * the fallback laws (memory decision without content, malformed decision),
 * the feature flag default (OFF), and end-to-end CUE→Decision→Dispatch
 * consistency on real pipeline output.
 */
import { describe, it, expect, afterEach } from 'vitest'
import { understandStudentTurn, type UnderstandingInputs } from '@/lib/understanding'
import { decideTeaching, type TeachingDecision } from '@/lib/understanding/decisionEngine'
import { isBrainRuntimeEnabled, legacyDecisionBlocksSuppressed, planDispatch } from '@/lib/understanding/dispatcher'

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

function decisionOf(type: TeachingDecision['decision']): TeachingDecision {
  return {
    version: 1, computedAt: new Date().toISOString(), shadow: true,
    decision: type, ruleId: 'TEST', rationale: [], inputsUsed: [], confidence: 1, parameters: {},
  }
}

afterEach(() => { delete process.env.ENABLE_BRAIN_RUNTIME })

describe('Dispatcher — feature flag', () => {
  it('is OFF by default', () => {
    delete process.env.ENABLE_BRAIN_RUNTIME
    expect(isBrainRuntimeEnabled()).toBe(false)
    process.env.ENABLE_BRAIN_RUNTIME = 'false'
    expect(isBrainRuntimeEnabled()).toBe(false)
    process.env.ENABLE_BRAIN_RUNTIME = '0'
    expect(isBrainRuntimeEnabled()).toBe(false)
  })

  it('activates only on explicit 1/true', () => {
    process.env.ENABLE_BRAIN_RUNTIME = '1'
    expect(isBrainRuntimeEnabled()).toBe(true)
    process.env.ENABLE_BRAIN_RUNTIME = 'true'
    expect(isBrainRuntimeEnabled()).toBe(true)
  })

  it('M6: legacy decision blocks are suppressed exactly when the Brain runtime is ON (single decision authority)', () => {
    delete process.env.ENABLE_BRAIN_RUNTIME
    expect(legacyDecisionBlocksSuppressed()).toBe(false) // flag OFF: legacy blocks injected as before
    process.env.ENABLE_BRAIN_RUNTIME = '1'
    expect(legacyDecisionBlocksSuppressed()).toBe(true)  // flag ON: Brain execution block is the only decision text
  })
})

describe('Dispatcher — routing table (decision → existing engine)', () => {
  it('SERVE_EXPLANATION_MEMORY routes to Explanation Memory with NO Groq', () => {
    const p = planDispatch(decisionOf('SERVE_EXPLANATION_MEMORY'), { assembledAvailable: true })
    expect(p.executor).toBe('EXPLANATION_MEMORY')
    expect(p.groqRequired).toBe(false)
    expect(p.engine).toContain('assembleLesson')
  })

  it('ESCALATE_TO_LLM routes to the current routeAI pipeline', () => {
    const p = planDispatch(decisionOf('ESCALATE_TO_LLM'), { assembledAvailable: false })
    expect(p.executor).toBe('LLM_OPEN')
    expect(p.groqRequired).toBe(true)
    expect(p.engine).toContain('routeAI')
  })

  it('engine-directed decisions route to their existing engines with the LLM as renderer', () => {
    const table: Array<[TeachingDecision['decision'], string]> = [
      ['ASK_DIAGNOSTIC_QUESTION', 'placementVerification'],
      ['DETECT_MISCONCEPTION', 'misconceptionEngine'],
      ['REVIEW_PREREQUISITE', 'prerequisite'],
      ['TEACH_DIRECTLY', 'conversationState'],
      ['PRACTICE', 'teachingStrategy'],
      ['VISUALIZATION', 'detectVisual'],
      ['CONTINUE_LESSON', 'lesson runtime'],
    ]
    for (const [decision, engineFragment] of table) {
      const p = planDispatch(decisionOf(decision), { assembledAvailable: false })
      expect(p.executor).toBe('LLM_RENDERER')
      expect(p.groqRequired).toBe(true)
      expect(p.engine).toContain(engineFragment)
    }
  })

  it('groqRequired=false ONLY for the Explanation Memory executor (the Groq gate invariant)', () => {
    const all: TeachingDecision['decision'][] = [
      'SERVE_EXPLANATION_MEMORY', 'ASK_DIAGNOSTIC_QUESTION', 'DETECT_MISCONCEPTION',
      'REVIEW_PREREQUISITE', 'TEACH_DIRECTLY', 'PRACTICE', 'VISUALIZATION', 'CONTINUE_LESSON', 'ESCALATE_TO_LLM',
    ]
    for (const d of all) {
      const p = planDispatch(decisionOf(d), { assembledAvailable: true })
      expect(p.groqRequired).toBe(p.executor !== 'EXPLANATION_MEMORY')
    }
  })
})

describe('Dispatcher — fallback laws (never strand a turn)', () => {
  it('memory decision WITHOUT assembled content falls back to the current pipeline', () => {
    const p = planDispatch(decisionOf('SERVE_EXPLANATION_MEMORY'), { assembledAvailable: false })
    expect(p.executor).toBe('LLM_OPEN')
    expect(p.groqRequired).toBe(true)
    expect(p.note).toContain('FALLBACK')
  })

  it('a malformed decision degrades to the LLM pipeline instead of throwing', () => {
    const p = planDispatch(null as never, { assembledAvailable: false })
    expect(p.executor).toBe('LLM_OPEN')
    expect(p.groqRequired).toBe(true)
  })

  it('an unknown decision value degrades to the LLM pipeline', () => {
    const p = planDispatch(decisionOf('NOT_A_REAL_DECISION' as TeachingDecision['decision']), { assembledAvailable: false })
    expect(p.executor).toBe('LLM_OPEN')
  })
})

describe('Dispatcher — end-to-end consistency with the real pipeline', () => {
  it('CUE memory hit → D1 decision → memory executor, no Groq (the eliminated-call path)', () => {
    const u = understandStudentTurn(inputs({
      assembled: { usedAssetIds: ['a1'], explanationConfidence: 0.9, explanationServingMode: 'exact' },
    }))
    const d = decideTeaching(u)
    const p = planDispatch(d, { assembledAvailable: true })
    expect(d.decision).toBe('SERVE_EXPLANATION_MEMORY')
    expect(p.executor).toBe('EXPLANATION_MEMORY')
    expect(p.groqRequired).toBe(false)
  })

  it('recovery turn → D0 → open LLM (recovery scripts render through the existing pipeline)', () => {
    const u = understandStudentTurn(inputs({ message: 'I give up', recoveryKey: 'i_give_up' }))
    const p = planDispatch(decideTeaching(u), { assembledAvailable: false })
    expect(p.executor).toBe('LLM_OPEN')
  })

  it('zero-evidence turn → D8 floor → open LLM (flag-on behavior matches today)', () => {
    const u = understandStudentTurn(inputs())
    const p = planDispatch(decideTeaching(u), { assembledAvailable: false })
    expect(p.executor).toBe('LLM_OPEN')
    expect(p.groqRequired).toBe(true)
  })

  it('behavior-equivalence invariant: memory executor ⇔ assembled content exists', () => {
    // Flag-on serving must equal the legacy `if (assembled)` fork on every
    // reachable path: the dispatcher may pick EXPLANATION_MEMORY only when
    // content was genuinely assembled, and always does when D1 fired.
    const withMemory = planDispatch(decideTeaching(understandStudentTurn(inputs({
      assembled: { usedAssetIds: ['a1'], explanationConfidence: 0.9, explanationServingMode: 'exact' },
    }))), { assembledAvailable: true })
    expect(withMemory.executor).toBe('EXPLANATION_MEMORY')
    const withoutMemory = planDispatch(decideTeaching(understandStudentTurn(inputs())), { assembledAvailable: false })
    expect(withoutMemory.executor).not.toBe('EXPLANATION_MEMORY')
  })

  it('plans are JSON-serializable for shadow-compare logging', () => {
    const p = planDispatch(decisionOf('PRACTICE'), { assembledAvailable: false })
    expect(() => JSON.stringify(p)).not.toThrow()
    expect(p.version).toBe(1)
  })
})
