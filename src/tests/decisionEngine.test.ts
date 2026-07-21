/**
 * Decision Engine v1 (Milestone 2) — shadow-mode tests.
 *
 * Pins: the full deterministic ladder D0–D8 (one test per rule), ladder
 * ORDER (preemption), the shadow invariant, confidence inheritance from
 * the CUE's readings, and the never-throws law. Decisions are produced
 * from real CUE output (understandStudentTurn), not hand-built objects,
 * so these tests also pin the CUE→Decision Engine contract.
 */
import { describe, it, expect } from 'vitest'
import { understandStudentTurn, type UnderstandingInputs } from '@/lib/understanding'
import { decideTeaching, type TeachingDecision } from '@/lib/understanding/decisionEngine'

function inputs(overrides: Partial<UnderstandingInputs> = {}): UnderstandingInputs {
  return {
    message: '',
    history: [],
    recoveryKey: null,
    firstLessonActive: false,
    lastSignal: null,
    sessionFailureCount: 0,
    episode: null,
    freshBoundary: false,
    lastSuccessfulTeachingStyle: null,
    conceptId: null,
    placement: null,
    pendingPlacementProbe: null,
    dueReviewCount: 0,
    strategyType: null,
    evidenceMove: null,
    assembled: null,
    memoryFallbackReason: null,
    observations: {},
    ...overrides,
  }
}

function decide(overrides: Partial<UnderstandingInputs> = {}): TeachingDecision {
  return decideTeaching(understandStudentTurn(inputs(overrides)))
}

const HIGH_MISCONCEPTION = {
  type: 'FRACTION_BIGGER_DENOMINATOR', label: 'Bigger denominator = bigger fraction',
  description: 'Believes 1/8 > 1/4', confidence: 'HIGH' as const, evidenceCount: 3, remediationSteps: [],
}

describe('Decision Engine — shadow invariants', () => {
  it('every decision is shadow, versioned, and JSON-serializable', () => {
    const d = decide()
    expect(d.shadow).toBe(true)
    expect(d.version).toBe(1)
    expect(() => JSON.stringify(d)).not.toThrow()
  })

  it('never throws, even on a malformed understanding object', () => {
    const d = decideTeaching(null as never)
    expect(d.decision).toBe('ESCALATE_TO_LLM')
    expect(d.ruleId).toBe('D9-ENGINE-ERROR')
    expect(d.confidence).toBe(0)
  })

  it('is deterministic: same understanding → same decision and rule', () => {
    const u = understandStudentTurn(inputs({ sessionFailureCount: 2, conceptId: 'phys.mech.newtons-first-law' }))
    const a = decideTeaching(u)
    const b = decideTeaching(u)
    expect(a.decision).toBe(b.decision)
    expect(a.ruleId).toBe(b.ruleId)
  })
})

describe('Decision Engine — the ladder, rule by rule', () => {
  it('D0: recovery preempts EVERYTHING, even a memory hit', () => {
    const d = decide({
      message: 'I give up', recoveryKey: 'i_give_up',
      assembled: { usedAssetIds: ['a1'], explanationConfidence: 0.9, explanationServingMode: 'exact' },
    })
    expect(d.decision).toBe('ESCALATE_TO_LLM')
    expect(d.ruleId).toBe('D0-RECOVERY-PREEMPT')
  })

  it('D0d: a fresh session opening on a non-first lesson outranks a stale FRAGILE mastery reading', () => {
    const d = decide({
      freshBoundary: true,
      firstLessonActive: false,
      // A left-over failure signal from before the boundary — would route
      // to D5-FRAGILE-CONSOLIDATE if the opening protocol didn't preempt it.
      lastSignal: { correctness: false },
    })
    expect(d.decision).toBe('ESCALATE_TO_LLM')
    expect(d.ruleId).toBe('D0d-SESSION-OPENING-PROTOCOL')
  })

  it('D0d does not fire on lesson one (D0c owns that introduction instead)', () => {
    const d = decide({ freshBoundary: true, firstLessonActive: true })
    expect(d.ruleId).toBe('D0c-FIRST-LESSON-PROTOCOL')
  })

  it('D0d does not fire mid-session (no freshBoundary, no OPENING episode)', () => {
    const d = decide({ freshBoundary: false, firstLessonActive: false, lastSignal: { correctness: true } })
    expect(d.ruleId).not.toBe('D0d-SESSION-OPENING-PROTOCOL')
  })

  it('D1: an assembled Explanation Memory turn is honored, with asset ids', () => {
    const d = decide({
      assembled: { usedAssetIds: ['a1', 'a2'], explanationConfidence: 0.9, explanationServingMode: 'exact' },
    })
    expect(d.decision).toBe('SERVE_EXPLANATION_MEMORY')
    expect(d.parameters.assetIds).toEqual(['a1', 'a2'])
  })

  it('D2: HIGH-confidence misconception outranks progression and practice', () => {
    const d = decide({
      lastSignal: { correctness: true },
      observations: { misconceptions: [HIGH_MISCONCEPTION] },
    })
    expect(d.decision).toBe('DETECT_MISCONCEPTION')
    expect(d.parameters.misconceptionLabel).toBe(HIGH_MISCONCEPTION.label)
  })

  it('D2 does not fire on MEDIUM/LOW confidence', () => {
    const d = decide({
      observations: { misconceptions: [{ ...HIGH_MISCONCEPTION, confidence: 'MEDIUM' as const }] },
    })
    expect(d.decision).not.toBe('DETECT_MISCONCEPTION')
  })

  it('D3: struggling with a known KG prerequisite → review that prerequisite', () => {
    // math.arith.fractions has KG prerequisites — a real edge, not a fixture.
    const d = decide({ sessionFailureCount: 2, conceptId: 'math.arith.fractions' })
    expect(d.decision).toBe('REVIEW_PREREQUISITE')
    expect(d.parameters.prerequisiteId).toBeTruthy()
    expect(d.parameters.conceptId).toBe('math.arith.fractions')
  })

  it('D3 falls through when no prerequisite is known', () => {
    const d = decide({ sessionFailureCount: 2 })
    expect(d.decision).not.toBe('REVIEW_PREREQUISITE')
  })

  // P0-2: after repeated non-landing turns (semantic — the SIGNAL tag's
  // correctness/confidence folded across turns, never a phrase list) with
  // no KG prerequisite to target, stop probing and teach directly.
  it('D3b: struggling with NO known prerequisite → stop probing, teach directly', () => {
    // math.found.mathematical-thinking is a real KG root (requires: []).
    const d = decide({ sessionFailureCount: 2, conceptId: 'math.found.mathematical-thinking' })
    expect(d.decision).toBe('TEACH_DIRECTLY')
    expect(d.ruleId).toBe('D3b-STOP-PROBING-TEACH-DIRECTLY')
    expect(d.parameters.conceptId).toBe('math.found.mathematical-thinking')
  })

  it('D3b does not fire on a single non-landing turn (not yet "struggling")', () => {
    const d = decide({ sessionFailureCount: 1, conceptId: 'math.found.mathematical-thinking', lastSignal: { correctness: false } })
    expect(d.decision).not.toBe('TEACH_DIRECTLY')
  })

  it('D3 still wins over D3b when a prerequisite IS known (more targeted intervention)', () => {
    const d = decide({ sessionFailureCount: 2, conceptId: 'math.arith.fractions' })
    expect(d.decision).toBe('REVIEW_PREREQUISITE')
    expect(d.decision).not.toBe('TEACH_DIRECTLY')
  })

  it('D4: placement probes in flight → keep diagnosing', () => {
    const d = decide({ pendingPlacementProbe: 'at' })
    expect(d.decision).toBe('ASK_DIAGNOSTIC_QUESTION')
    expect(d.ruleId).toBe('D4-PLACEMENT-PROBE')
  })

  it('D5: fragile mastery → practice, not advancement', () => {
    const d = decide({ lastSignal: { correctness: false } })
    expect(d.decision).toBe('PRACTICE')
    expect(d.ruleId).toBe('D5-FRAGILE-CONSOLIDATE')
  })

  it('D6: explicit help request + detected visual → serve the visualization', () => {
    const d = decide({
      message: 'please show me a diagram',
      lastSignal: { correctness: true },
      observations: { availableVisual: 'force_diagram', visualDetectionRan: true },
    })
    expect(d.decision).toBe('VISUALIZATION')
    expect(d.parameters.visualType).toBe('force_diagram')
  })

  it('D7: progressing + engaged (answering a pending question) → continue the lesson', () => {
    const d = decide({
      message: 'because the density is lower',
      history: [{ role: 'assistant', content: 'Why does ice float?' }],
      lastSignal: { correctness: true },
    })
    expect(d.decision).toBe('CONTINUE_LESSON')
    expect(d.ruleId).toBe('D7-PROGRESSING-CONTINUE')
  })

  it('D8: zero evidence → explicit LLM floor with the uncertainty count in the trace', () => {
    const d = decide()
    expect(d.decision).toBe('ESCALATE_TO_LLM')
    expect(d.ruleId).toBe('D8-LLM-FLOOR')
    expect(d.rationale.some((r) => r.includes('uncertainty'))).toBe(true)
  })
})

describe('Decision Engine — provenance and confidence discipline', () => {
  it('every decision names the STU fields it read and cites a rationale', () => {
    for (const d of [decide(), decide({ lastSignal: { correctness: false } }), decide({ pendingPlacementProbe: 'below' })]) {
      expect(d.rationale.length).toBeGreaterThan(0)
      expect(d.ruleId).toMatch(/^D\d/)
      expect(Array.isArray(d.inputsUsed)).toBe(true)
    }
  })

  it('confidence is inherited from the weakest CUE reading used (never invented)', () => {
    const floor = decide()
    expect(floor.confidence).toBe(0) // built entirely on unknowns
    const practice = decide({ lastSignal: { correctness: false } })
    expect(practice.confidence).toBeGreaterThan(0)
    expect(practice.confidence).toBeLessThanOrEqual(1)
  })
})
