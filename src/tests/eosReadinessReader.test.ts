/**
 * PHASE 4 — tests for the EOS readiness reader (`scripts/eos/aggregate.ts`).
 *
 * The reader exists because the K3/K4/K5 promotion gates are reviews of data
 * that route.ts writes and nothing reads. It cannot be exercised against the
 * database from this environment (no DATABASE_URL), so the whole of its
 * arithmetic is exercised here through the same pure function the CLI calls,
 * against snapshot shapes taken from what route.ts actually persists.
 *
 * The most important assertions are the NEGATIVE ones: a gate that reports
 * READY on three turns, or reports "zero false positives" out of zero
 * reviews, would be worse than no gate at all.
 */
import { describe, it, expect } from 'vitest'
import {
  aggregate, verdicts, formatReport, MIN_PARITY_TURNS,
  type SessionSnapshotRow,
} from '../../scripts/eos/aggregate'

function session(id: string, snapshot: Record<string, unknown> | null): SessionSnapshotRow {
  return { sessionId: id, contextSnapshot: snapshot }
}

/** A session whose kernel parity agreed on every turn. */
function agreeing(turns: number) {
  return { turnsCompared: turns, turnsAgreed: turns, byField: {} }
}
function diverging(turns: number, agreed: number, byField: Record<string, number>) {
  return { turnsCompared: turns, turnsAgreed: agreed, byField }
}

describe('aggregation across sessions', () => {
  it('merges parity counters and per-field divergences', () => {
    const r = aggregate([
      session('a', { kernelParity: agreeing(10) }),
      session('b', { kernelParity: diverging(10, 7, { move: 2, stageCeiling: 1 }) }),
      session('c', { kernelParity: diverging(5, 5, {}) }),
    ])
    expect(r.sessions).toBe(3)
    expect(r.sessionsWithKernelParity).toBe(3)
    expect(r.kernelParity.turnsCompared).toBe(25)
    expect(r.kernelParity.turnsAgreed).toBe(22)
    expect(r.kernelParity.byField).toEqual({ move: 2, stageCeiling: 1 })
  })

  it('keeps the K3 and K4 parities separate — they are opposite problems', () => {
    const r = aggregate([
      session('a', { kernelParity: agreeing(4), enginePolicyParity: diverging(4, 1, { move: 3 }) }),
    ])
    expect(r.kernelParity.turnsAgreed).toBe(4)
    expect(r.enginePolicyParity.byField).toEqual({ move: 3 })
  })

  it('merges verifier metrics including the per-code breakdown', () => {
    const r = aggregate([
      session('a', { verifierMetrics: { turnsVerified: 100, turnsWithReject: 3, verifierViolations: 3, byCode: { 'V-Q2': 3 }, corrected: 2, uncorrected: 1, stripped: 5, falsePositiveCandidates: 1, falsePositivesAdjudicated: 0, truePositivesAdjudicated: 2 } }),
      session('b', { verifierMetrics: { turnsVerified: 50, turnsWithReject: 1, verifierViolations: 1, byCode: { 'V-LEN': 1 }, corrected: 1, uncorrected: 0, stripped: 0, falsePositiveCandidates: 0, falsePositivesAdjudicated: 0, truePositivesAdjudicated: 1 } }),
    ])
    expect(r.verifier.turnsVerified).toBe(150)
    expect(r.verifier.byCode).toEqual({ 'V-Q2': 3, 'V-LEN': 1 })
    expect(r.verifier.truePositivesAdjudicated).toBe(3)
  })

  it('tolerates malformed, partial and absent snapshots without throwing', () => {
    const r = aggregate([
      session('a', null),
      { sessionId: 'b', contextSnapshot: 'not an object' },
      { sessionId: 'c', contextSnapshot: [1, 2, 3] },
      session('d', { kernelParity: { turnsCompared: 2 } }),   // partial shape
      session('e', {}),
    ])
    expect(r.sessions).toBe(5)
    expect(r.kernelParity.turnsCompared).toBe(2)
    expect(r.kernelParity.turnsAgreed).toBe(0)
  })
})

describe('the persisted-phase census — objective D answered from data', () => {
  it('buckets legacy, canonical and unrecognised phase values', () => {
    const r = aggregate([
      session('a', { conversationState: { phase: 'CHECK' } }),
      session('b', { conversationState: { phase: 'PRACTICE' } }),
      session('c', { conversationState: { phase: 'CHECK' } }),
      session('d', { conversationState: { phase: 'ASSESS' } }),      // canonical
      session('e', { conversationState: { phase: 'INDEPENDENT' } }), // canonical
      session('f', { conversationState: { phase: 'WAT' } }),         // neither
      session('g', { conversationState: {} }),                       // no phase
    ])
    expect(r.phases.legacy).toEqual({ CHECK: 2, PRACTICE: 1 })
    expect(r.phases.canonicalOnly).toEqual({ ASSESS: 1, INDEPENDENT: 1 })
    expect(r.phases.unrecognised).toEqual({ WAT: 1 })
    expect(r.phases.sessionsWithNoLadder).toBe(1)
  })

  it('DEMONSTRATE and TRANSFER count as legacy — they collide by name', () => {
    // Deliberate: the reader cannot tell a canonical DEMONSTRATE from a legacy
    // one, and neither can readConversationState. Reporting them as legacy is
    // the honest answer, and conversationStateMigration.test.ts records why
    // the collision is worse than a mismatch, not better.
    const r = aggregate([
      session('a', { conversationState: { phase: 'DEMONSTRATE' } }),
      session('b', { conversationState: { phase: 'TRANSFER' } }),
    ])
    expect(r.phases.canonicalOnly).toEqual({})
    expect(r.phases.legacy).toEqual({ DEMONSTRATE: 1, TRANSFER: 1 })
  })
})

describe('promotion verdicts', () => {
  it('INSUFFICIENT-DATA below the minimum sample, even at 100% agreement', () => {
    const v = verdicts(aggregate([session('a', {
      kernelParity: agreeing(3), enginePolicyParity: agreeing(3),
    })]))
    expect(v.k3ShadowToPrimary.verdict).toBe('INSUFFICIENT-DATA')
    expect(v.k4ShadowToPrimary.verdict).toBe('INSUFFICIENT-DATA')
    expect(v.k3ShadowToPrimary.detail).toContain(String(MIN_PARITY_TURNS))
  })

  it('NOT-READY when any field ever diverged, and it names the fields', () => {
    const v = verdicts(aggregate([session('a', {
      enginePolicyParity: diverging(MIN_PARITY_TURNS, MIN_PARITY_TURNS - 4, { move: 3, maxNewTerms: 1 }),
    })]))
    expect(v.k4ShadowToPrimary.verdict).toBe('NOT-READY')
    expect(v.k4ShadowToPrimary.detail).toContain('move=3')
    expect(v.k4ShadowToPrimary.detail).toContain('maxNewTerms=1')
  })

  it('READY only on a full sample with zero divergence', () => {
    const v = verdicts(aggregate([session('a', { kernelParity: agreeing(MIN_PARITY_TURNS) })]))
    expect(v.k3ShadowToPrimary.verdict).toBe('READY')
  })

  it('K5 is INSUFFICIENT-DATA when rejects exist but none were reviewed', () => {
    const v = verdicts(aggregate([session('a', {
      verifierMetrics: {
        turnsVerified: 600, turnsWithReject: 12, verifierViolations: 12, byCode: { 'V-Q2': 12 },
        corrected: 0, uncorrected: 12, stripped: 0,
        falsePositiveCandidates: 9, falsePositivesAdjudicated: 0, truePositivesAdjudicated: 0,
      },
    })]))
    expect(v.k5LogToEnforce.verdict).toBe('INSUFFICIENT-DATA')
    expect(v.k5LogToEnforce.detail).toContain('none adjudicated')
  })

  it('K5 is NOT-READY on a single adjudicated false positive', () => {
    const v = verdicts(aggregate([session('a', {
      verifierMetrics: {
        turnsVerified: 600, turnsWithReject: 12, verifierViolations: 12, byCode: {},
        corrected: 0, uncorrected: 12, stripped: 0,
        falsePositiveCandidates: 0, falsePositivesAdjudicated: 1, truePositivesAdjudicated: 11,
      },
    })]))
    expect(v.k5LogToEnforce.verdict).toBe('NOT-READY')
  })

  it('ladder cutover is UNSAFE the moment one canonical value is persisted', () => {
    const safe = verdicts(aggregate([session('a', { conversationState: { phase: 'CHECK' } })]))
    expect(safe.ladderCutoverSafety.verdict).toBe('SAFE')
    const unsafe = verdicts(aggregate([
      session('a', { conversationState: { phase: 'CHECK' } }),
      session('b', { conversationState: { phase: 'ASSESS' } }),
    ]))
    expect(unsafe.ladderCutoverSafety.verdict).toBe('UNSAFE')
    expect(unsafe.ladderCutoverSafety.detail).toContain('revoking earned mastery')
  })

  it('an EMPTY corpus is never READY on anything', () => {
    const v = verdicts(aggregate([]))
    expect(v.k3ShadowToPrimary.verdict).toBe('INSUFFICIENT-DATA')
    expect(v.k4ShadowToPrimary.verdict).toBe('INSUFFICIENT-DATA')
    expect(v.k5LogToEnforce.verdict).toBe('INSUFFICIENT-DATA')
  })
})

describe('the rendered report', () => {
  it('prints every gate and every verdict, and never throws on empty input', () => {
    const r = aggregate([])
    const text = formatReport(r, verdicts(r))
    for (const marker of [
      'K3 kernel parity', 'K4 engine parity', 'K5 verifier',
      'Persisted ladder vocabulary', 'Promotion verdicts',
      'ladder cutover safety',
    ]) expect(text).toContain(marker)
  })

  it('suppresses a rate below the minimum sample rather than printing a lie', () => {
    const r = aggregate([session('a', { kernelParity: agreeing(3) })])
    expect(formatReport(r, verdicts(r))).toContain('below minimum sample')
  })
})
