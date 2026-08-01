/**
 * WP-5 — read-only evaluation. Tests assert the three properties that make
 * this work safe: v1 rows decode, absent v2 fields read as NOT_CAPTURED
 * (never a default), and the Phase 3 loop adapts nothing.
 */
import { describe, it, expect } from 'vitest'
import type { SpineEventRecord } from '@/lib/evidence-spine/types'
import {
  decodeDecision, decodeDecisions, v2Coverage,
  evaluateTrajectory, evaluateVisualQuality,
  publishAdaptationSupport, archetypeDefaults,
} from '@/lib/teaching/evaluation'

let seq = 0
function ev(type: string, payload: unknown, schemaVersion = 1): SpineEventRecord {
  seq += 1
  return {
    eventId: `e${seq}`, seq, learnerId: 'L1', sessionId: 's1', turnId: `t${seq}`,
    type, schemaVersion, payload,
    source: { componentId: 'test', version: 1 },
    confidence: 1, idempotencyKey: `k${seq}`, occurredAt: new Date(),
  } as unknown as SpineEventRecord
}

const V1_DECISION = {
  move: 'teach', phase: 'CORE', recoveryPreempted: false,
  workedExampleFirst: true, stageCeiling: 2, provenance: ['r1'],
}

describe('WP-5 · decisionRecord — the first reader of v2', () => {
  it('decodes a v1 DecisionRecorded without error', () => {
    const d = decodeDecision(ev('DecisionRecorded', V1_DECISION, 1))
    expect(d).not.toBeNull()
    expect(d!.core.move).toBe('teach')
    expect(d!.core.workedExampleFirst).toBe(true)
  })

  it('reports every absent v2 field as NOT_CAPTURED, never a default', () => {
    const d = decodeDecision(ev('DecisionRecorded', V1_DECISION, 1))!
    expect(d.attemptVector.availability).toBe('NOT_CAPTURED')
    expect(d.adaptationState.availability).toBe('NOT_CAPTURED')
    expect(d.adjustmentRecord.availability).toBe('NOT_CAPTURED')
    expect(d.consumesReteachBudget.availability).toBe('NOT_CAPTURED')
    // The critical distinction: absent is not `false`.
    expect(d.consumesReteachBudget.value).toBeUndefined()
  })

  it('reads a v2 field when one is genuinely present', () => {
    const d = decodeDecision(ev('DecisionRecorded', {
      ...V1_DECISION, attemptVector: { channel: 'visual' }, consumesReteachBudget: false,
    }, 2))!
    expect(d.attemptVector.availability).toBe('CAPTURED')
    expect(d.attemptVector.value).toEqual({ channel: 'visual' })
    // Explicit false is CAPTURED — distinct from absent.
    expect(d.consumesReteachBudget.availability).toBe('CAPTURED')
    expect(d.consumesReteachBudget.value).toBe(false)
  })

  it('ignores non-DecisionRecorded events', () => {
    expect(decodeDecision(ev('AssistantRendered', { length: 10 }))).toBeNull()
  })

  it('counts coverage honestly on a v1-only trajectory', () => {
    const c = v2Coverage(decodeDecisions([
      ev('DecisionRecorded', V1_DECISION, 1),
      ev('DecisionRecorded', V1_DECISION, 1),
    ]))
    expect(c.decisions).toBe(2)
    expect(c.v1Decisions).toBe(2)
    expect(c.attemptVectorCaptured).toBe(0)
  })
})

describe('WP-5 · Phase 1 Stage 2 — TQ-5 trajectory evaluator', () => {
  it('reports gates needing uncaptured inputs as NOT_EVALUABLE, not FAIL', () => {
    const r = evaluateTrajectory([ev('DecisionRecorded', V1_DECISION, 1)])
    for (const id of ['G1', 'G2', 'G3', 'G4', 'G9', 'G10', 'G11']) {
      expect(r.gates.find(g => g.id === id)!.verdict).toBe('NOT_EVALUABLE')
    }
  })

  it('evaluates G6 from recorded askedQuestion', () => {
    const three = [
      ev('AssistantRendered', { askedQuestion: true }),
      ev('AssistantRendered', { askedQuestion: true }),
      ev('AssistantRendered', { askedQuestion: true }),
    ]
    expect(evaluateTrajectory(three).gates.find(g => g.id === 'G6')!.verdict).toBe('FAIL')
    expect(evaluateTrajectory([three[0]]).gates.find(g => g.id === 'G6')!.verdict).toBe('PASS')
  })

  it('marks S2 not scoreable — no working-capacity instrument exists', () => {
    const s2 = evaluateTrajectory([]).dimensions.find(d => d.id === 'S2')!
    expect(s2.scoreable).toBe(false)
    expect(s2.score).toBeNull()
  })

  it('scores S4 from event counts alone', () => {
    const r = evaluateTrajectory([
      ev('AssistantRendered', { askedQuestion: false }),
      ev('AnswerObserved', { correct: true }),
    ])
    const s4 = r.dimensions.find(d => d.id === 'S4')!
    expect(s4.scoreable).toBe(true)
    expect(s4.score).not.toBeNull()
  })
})

describe('WP-5 · Phase 2 Stage V2 — VD-9', () => {
  it('reports all seven criteria NOT_EVALUABLE without a VisualIntent', () => {
    const r = evaluateVisualQuality([ev('AssistantRendered', { length: 5 })])
    expect(r.criteria).toHaveLength(7)
    expect(r.criteriaEvaluable).toBe(0)
  })

  it('reports decorativeRate as null, not 0 — unmeasured is not zero', () => {
    expect(evaluateVisualQuality([]).decorativeRate).toBeNull()
  })
})

describe('WP-5 · Phase 3 Stage S2 — publish, hold', () => {
  it('publishes AF4 with archetype defaults when no ASV is captured', () => {
    const r = publishAdaptationSupport([ev('DecisionRecorded', V1_DECISION, 1)])
    expect(r.byAvailability.AF4).toBe(1)
    expect(r.published[0].vector).toEqual(archetypeDefaults())
    expect(r.published[0].reason).toContain('AF4')
  })

  it('adapts nothing — the S2 inert-safety proof', () => {
    const r = publishAdaptationSupport([
      ev('DecisionRecorded', V1_DECISION, 1),
      ev('DecisionRecorded', { ...V1_DECISION, adaptationState: { scaffoldDial: 3 } }, 2),
    ])
    expect(r.adaptedCount).toBe(0)
    expect(r.inertSafe).toBe(true)
    expect(r.published.every(p => p.adapted === false)).toBe(true)
  })

  it('holds a captured vector unchanged rather than moving a dial', () => {
    const r = publishAdaptationSupport([
      ev('DecisionRecorded', { ...V1_DECISION, adaptationState: { scaffoldDial: 3 } }, 2),
    ])
    expect(r.published[0].availability).toBe('AF3')
    expect(r.published[0].vector).toEqual({ scaffoldDial: 3 })
  })

  it('archetype defaults are empty — no fabricated state read', () => {
    expect(archetypeDefaults()).toEqual({})
  })
})
