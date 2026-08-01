/**
 * WP-9 — Stage 3–7, V3–V6, H-2. The assertions that matter: nothing is
 * enforced, absence never becomes a FAIL, and unknown is never cleared.
 */
import { describe, it, expect } from 'vitest'
import {
  AXES, closure, closureAxes, changedAxes, evaluateReteachLegality, paraphraseBaseline,
  buildFailedAttemptSet, approachAlreadyFailed,
  CONTRAINDICATIONS, evaluateAdmission, auditProjection, evaluateFallback, evaluateWithdrawal,
  type AttemptOutcome,
} from '@/lib/teaching/evaluation'
import type { AttemptVectorV2 } from '@/lib/evidence-spine/types'
import type { VisualIntent } from '@/lib/teaching/visualIntent'

const A: AttemptVectorV2 = { channel: 'verbal', representation: 'narrative', concreteness: 'symbolic', agency: 'tutor-does' }

describe('WP-9 · Stage 3 — closure is total and pure', () => {
  it('defines a result for every axis', () => {
    for (const ax of AXES) expect(Array.isArray(closureAxes(ax))).toBe(true)
  })

  it('is pure — same inputs, same output', () => {
    const a = closure(A, 'channel', 'visual')
    const b = closure(A, 'channel', 'visual')
    expect(a).toEqual(b)
  })

  it('forces INSTANCE on every axis change, and representation↔concreteness co-vary', () => {
    expect(closureAxes('channel')).toContain('instance')
    expect(closureAxes('representation')).toContain('concreteness')
    expect(closureAxes('concreteness')).toContain('representation')
  })

  it('does not force the three entries §7.4.3 disproves', () => {
    expect(closureAxes('method')).not.toContain('channel')
    expect(closureAxes('method')).not.toContain('representation')
    expect(closureAxes('channel')).not.toContain('method')
  })
})

describe('WP-9 · Stage 3 — L1–L5, never FAIL on missing instrumentation', () => {
  it('returns NOT_EVALUABLE when a vector was never captured', () => {
    expect(evaluateReteachLegality({ from: null, to: A }).verdict).toBe('NOT_EVALUABLE')
  })

  it('returns INSUFFICIENT_EVIDENCE, not PARAPHRASE, when nothing was declared', () => {
    expect(evaluateReteachLegality({ from: {}, to: {} }).verdict).toBe('INSUFFICIENT_EVIDENCE')
  })

  it('calls an unchanged declared vector PARAPHRASE (L1)', () => {
    const r = evaluateReteachLegality({ from: A, to: { ...A } })
    expect(r.verdict).toBe('PARAPHRASE')
    expect(r.rule).toBe('L1')
  })

  it('withholds a verdict when no diagnosis was recorded (L2)', () => {
    const r = evaluateReteachLegality({ from: A, to: { ...A, channel: 'visual' } })
    expect(r.verdict).toBe('NOT_EVALUABLE')
    expect(r.detail).toContain('mandatory fabrication')
  })

  it('flags a change outside the closure as ILLEGAL (L3)', () => {
    const r = evaluateReteachLegality({
      from: A, to: { ...A, channel: 'visual', agency: 'learner-does' },
      diagnosisAxis: 'channel', failedAttempts: [],
    })
    expect(r.verdict).toBe('ILLEGAL')
    expect(r.rule).toBe('L3')
  })

  it('treats an unknown failed-attempt set as unknown, not empty (L4)', () => {
    const r = evaluateReteachLegality({ from: A, to: { ...A, channel: 'visual' }, diagnosisAxis: 'channel' })
    expect(r.verdict).toBe('NOT_EVALUABLE')
    expect(r.rule).toBe('L4')
  })

  it('stops at L5 rather than claiming a clean pass', () => {
    const r = evaluateReteachLegality({
      from: A, to: { ...A, channel: 'visual' }, diagnosisAxis: 'channel', failedAttempts: [],
    })
    expect(r.rule).toBe('L5')
    expect(r.verdict).toBe('NOT_EVALUABLE')
  })

  it('reports the paraphrase rate as null when nothing was decidable', () => {
    const b = paraphraseBaseline([evaluateReteachLegality({ from: null, to: null })])
    expect(b.rate).toBeNull()
    expect(b.notEvaluable).toBe(1)
  })
})

describe('WP-9 · H-2 — failedAttempts derived, never duplicated', () => {
  const attempts: AttemptOutcome[] = [
    { conceptId: 'c1', vector: A, failed: true, seq: 1 },
    { conceptId: 'c1', vector: { ...A }, failed: true, seq: 2 },       // same approach
    { conceptId: 'c1', vector: { ...A, channel: 'visual' }, failed: true, seq: 3 },
    { conceptId: 'c1', vector: null, failed: true, seq: 4 },
    { conceptId: 'c1', vector: A, failed: null, seq: 5 },              // unobserved
    { conceptId: 'c2', vector: A, failed: true, seq: 6 },
  ]

  it('compacts repeats and scopes to the concept', () => {
    const s = buildFailedAttemptSet('c1', attempts)
    expect(s.vectors).toHaveLength(2)
    expect(s.failedWithoutVector).toBe(1)
    expect(s.outcomeUnknown).toBe(1)
  })

  it('never records an unobserved attempt as a failure', () => {
    const s = buildFailedAttemptSet('c1', [{ conceptId: 'c1', vector: A, failed: null, seq: 1 }])
    expect(s.vectors).toHaveLength(0)
  })

  it('answers L4 directly, and null when the candidate declared nothing', () => {
    const s = buildFailedAttemptSet('c1', attempts)
    expect(approachAlreadyFailed(s, A)).toBe(true)
    expect(approachAlreadyFailed(s, { ...A, agency: 'joint' })).toBe(false)
    expect(approachAlreadyFailed(s, {})).toBeNull()
  })
})

describe('WP-9 · V3 — unknown contraindications are never cleared', () => {
  const intent: VisualIntent = { purpose: 'STRUCTURE-REVEAL', claim: 'It has two layers.' }
  const allClear = Object.fromEntries(CONTRAINDICATIONS.map((c) => [c, false]))

  it('withholds a verdict when nothing was recorded', () => {
    const r = evaluateAdmission({ intent })
    expect(r.verdict).toBe('NOT_EVALUABLE')
    expect(r.unknownContraindications).toHaveLength(10)
  })

  it('withholds a verdict when only some were recorded', () => {
    expect(evaluateAdmission({ intent, contraindications: { N1: false } }).verdict).toBe('NOT_EVALUABLE')
  })

  it('refuses on any hard no', () => {
    const r = evaluateAdmission({ intent, contraindications: { ...allClear, N6: true } })
    expect(r.verdict).toBe('WOULD_REFUSE')
    expect(r.firedContraindications).toEqual(['N6'])
  })

  it('admits only when all ten are recorded and clear — and applies nothing', () => {
    const r = evaluateAdmission({ intent, contraindications: allClear })
    expect(r.verdict).toBe('WOULD_ADMIT')
    expect(r.applied).toBe(false)
  })
})

describe('WP-9 · V4/V5/V6', () => {
  const intent: VisualIntent = {
    purpose: 'PROCESS-TRACE', claim: 'The current flows one way.',
    fallbackContract: ['stepped-sequence'],
  }

  it('V4 audits the WP-7 projection and detects a leaked renderer name', () => {
    expect(auditProjection(intent).leaksProductionIdentifier).toBe(false)
    const leaky = { ...intent, claim: 'rendered via scene_spec' }
    expect(auditProjection(leaky).leaksProductionIdentifier).toBe(true)
  })

  it('V5 flags an improvised degradation', () => {
    expect(evaluateFallback(intent, 'stepped-sequence').verdict).toBe('AUTHORIZED')
    expect(evaluateFallback(intent, 'matrix').verdict).toBe('UNAUTHORIZED_DEGRADATION')
    expect(evaluateFallback({ ...intent, fallbackContract: undefined }, 'matrix').verdict).toBe('NOT_EVALUABLE')
  })

  it('V6 fails MG-1 on a gate passed with the visual present, and never certifies', () => {
    const r = evaluateWithdrawal({ gatePassed: true, visualPresentAtGate: true })
    expect(r.mg1).toBe('FAIL')
    expect(r.certifiesMastery).toBe(false)
    expect(evaluateWithdrawal({}).mg1).toBe('NOT_EVALUABLE')
  })
})
