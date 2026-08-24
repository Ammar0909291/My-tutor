/**
 * PHASE 4 — the missing READER for the K3/K4/K5 promotion gates.
 *
 * WHAT WAS MISSING. route.ts writes three measurement records onto
 * `LearnSession.contextSnapshot` on every Library turn:
 *
 *   contextSnapshot.kernelParity        K3 — shadow pipeline vs the route
 *   contextSnapshot.enginePolicyParity  K4 — policy engine vs the route
 *   contextSnapshot.verifierMetrics     K5 — the RS P-3 violation SLO
 *
 * A repository-wide search for any of those keys outside route.ts returns
 * nothing. The masterplan's K4 gate is "replay diff vs pre-pack behavior
 * REVIEWED AND ACCEPTED" and its K5 gate is a violation-rate dashboard; both
 * are reviews of data that, today, no code can read back. That is the same
 * failure the parity observer itself was built to end ("an observation with
 * no observer proves nothing"), one layer up.
 *
 * This module is the reader, and nothing else. It is PURE: it takes the
 * already-parsed snapshot JSON of a set of sessions and folds it. It reaches
 * no database, reads no environment and imports nothing from the request
 * path, so it cannot affect a turn. `readiness-report.ts` beside it is the
 * thin CLI that supplies real rows.
 *
 * The per-session metrics were designed to be foldable (both `ParityMetrics`
 * and `VerifierMetrics` are counter bags with a documented `read*` that
 * tolerates partial shapes), so cross-session aggregation is a merge and
 * needs no new arithmetic.
 */
import {
  readParityMetrics, agreementRate,
  type ParityMetrics, type ParityField,
} from '../../src/lib/kernel/parity'
import {
  readVerifierMetrics, violationRate,
  type VerifierMetrics,
} from '../../src/lib/kernel/verifier/metrics'
import type { RuleCode } from '../../src/lib/kernel/verifier/types'
import { PHASE_ORDER } from '../../src/lib/teaching/conversationState'
import { PHASE_ORDER_10 } from '../../src/lib/kernel/tsm/phases'

/** One row as it comes out of the database: the parsed contextSnapshot. */
export interface SessionSnapshotRow {
  sessionId: string
  contextSnapshot: unknown
}

function snapshotObject(row: SessionSnapshotRow): Record<string, unknown> | null {
  const s = row.contextSnapshot
  return s && typeof s === 'object' && !Array.isArray(s) ? s as Record<string, unknown> : null
}

function mergeParity(a: ParityMetrics, b: ParityMetrics): ParityMetrics {
  const byField = { ...a.byField }
  for (const [k, v] of Object.entries(b.byField)) {
    byField[k as ParityField] = (byField[k as ParityField] ?? 0) + (v ?? 0)
  }
  return {
    turnsCompared: a.turnsCompared + b.turnsCompared,
    turnsAgreed: a.turnsAgreed + b.turnsAgreed,
    byField,
  }
}

function mergeVerifier(a: VerifierMetrics, b: VerifierMetrics): VerifierMetrics {
  const byCode = { ...a.byCode }
  for (const [k, v] of Object.entries(b.byCode)) {
    byCode[k as RuleCode] = (byCode[k as RuleCode] ?? 0) + (v ?? 0)
  }
  return {
    turnsVerified: a.turnsVerified + b.turnsVerified,
    turnsWithReject: a.turnsWithReject + b.turnsWithReject,
    verifierViolations: a.verifierViolations + b.verifierViolations,
    byCode,
    corrected: a.corrected + b.corrected,
    uncorrected: a.uncorrected + b.uncorrected,
    stripped: a.stripped + b.stripped,
    falsePositiveCandidates: a.falsePositiveCandidates + b.falsePositiveCandidates,
    falsePositivesAdjudicated: a.falsePositivesAdjudicated + b.falsePositivesAdjudicated,
    truePositivesAdjudicated: a.truePositivesAdjudicated + b.truePositivesAdjudicated,
  }
}

/**
 * The persisted-phase census — objective D's question, answered from data
 * rather than assumed. Counts which `conversationState.phase` values actually
 * exist, split into the three categories that matter for a cutover:
 * recognised legacy names, canonical names a legacy reader would DISCARD, and
 * anything else (which a legacy reader also discards).
 */
export interface PhaseCensus {
  legacy: Record<string, number>
  /** Canonical names present. Non-zero means a cutover has already written
   *  values the shipping reader cannot read — see conversationStateMigration
   *  .test.ts for what that costs. */
  canonicalOnly: Record<string, number>
  unrecognised: Record<string, number>
  sessionsWithNoLadder: number
}

export interface ReadinessReport {
  sessions: number
  sessionsWithKernelParity: number
  sessionsWithEngineParity: number
  sessionsWithVerifierMetrics: number
  kernelParity: ParityMetrics
  enginePolicyParity: ParityMetrics
  verifier: VerifierMetrics
  /** null below the minimum sample, exactly as the per-session helpers do. */
  kernelAgreementRate: number | null
  engineAgreementRate: number | null
  verifierViolationRate: number | null
  phases: PhaseCensus
}

const CANONICAL_ONLY = new Set(
  PHASE_ORDER_10.filter((p) => !(PHASE_ORDER as readonly string[]).includes(p)),
)

export function aggregate(rows: SessionSnapshotRow[]): ReadinessReport {
  let kernelParity: ParityMetrics = { turnsCompared: 0, turnsAgreed: 0, byField: {} }
  let enginePolicyParity: ParityMetrics = { turnsCompared: 0, turnsAgreed: 0, byField: {} }
  let verifier: VerifierMetrics = readVerifierMetrics(undefined)
  const phases: PhaseCensus = { legacy: {}, canonicalOnly: {}, unrecognised: {}, sessionsWithNoLadder: 0 }
  let sessionsWithKernelParity = 0, sessionsWithEngineParity = 0, sessionsWithVerifierMetrics = 0

  for (const row of rows) {
    const snap = snapshotObject(row)
    if (!snap) { phases.sessionsWithNoLadder += 1; continue }

    if (snap.kernelParity) {
      sessionsWithKernelParity += 1
      kernelParity = mergeParity(kernelParity, readParityMetrics(snap.kernelParity))
    }
    if (snap.enginePolicyParity) {
      sessionsWithEngineParity += 1
      enginePolicyParity = mergeParity(enginePolicyParity, readParityMetrics(snap.enginePolicyParity))
    }
    if (snap.verifierMetrics) {
      sessionsWithVerifierMetrics += 1
      verifier = mergeVerifier(verifier, readVerifierMetrics(snap.verifierMetrics))
    }

    const cs = snap.conversationState
    const phase = cs && typeof cs === 'object' ? (cs as { phase?: unknown }).phase : undefined
    if (typeof phase !== 'string') { phases.sessionsWithNoLadder += 1; continue }
    const bucket = (PHASE_ORDER as readonly string[]).includes(phase) ? phases.legacy
      : CANONICAL_ONLY.has(phase as never) ? phases.canonicalOnly
      : phases.unrecognised
    bucket[phase] = (bucket[phase] ?? 0) + 1
  }

  return {
    sessions: rows.length,
    sessionsWithKernelParity, sessionsWithEngineParity, sessionsWithVerifierMetrics,
    kernelParity, enginePolicyParity, verifier,
    kernelAgreementRate: agreementRate(kernelParity),
    engineAgreementRate: agreementRate(enginePolicyParity),
    verifierViolationRate: violationRate(verifier),
    phases,
  }
}

/**
 * The promotion questions, answered. Deliberately says UNKNOWN rather than
 * "ready" when the sample is too small: a gate that reads 100% agreement off
 * three turns is worse than no gate.
 */
export interface PromotionVerdicts {
  k3ShadowToPrimary: { verdict: 'READY' | 'NOT-READY' | 'INSUFFICIENT-DATA'; detail: string }
  k4ShadowToPrimary: { verdict: 'READY' | 'NOT-READY' | 'INSUFFICIENT-DATA'; detail: string }
  k5LogToEnforce: { verdict: 'READY' | 'NOT-READY' | 'INSUFFICIENT-DATA'; detail: string }
  ladderCutoverSafety: { verdict: 'SAFE' | 'UNSAFE'; detail: string }
}

/** Minimum turns before an agreement rate is allowed to mean anything. The
 *  masterplan supplies 500 for K5's corpus; the parity gates have no stated
 *  number, so the same 500 is used rather than inventing a smaller one. */
export const MIN_PARITY_TURNS = 500

export function verdicts(r: ReadinessReport): PromotionVerdicts {
  const parityVerdict = (m: ParityMetrics, label: string) => {
    if (m.turnsCompared < MIN_PARITY_TURNS) {
      return {
        verdict: 'INSUFFICIENT-DATA' as const,
        detail: `${m.turnsCompared} turns compared; ${MIN_PARITY_TURNS} required before an agreement rate means anything (${label})`,
      }
    }
    const diverging = Object.entries(m.byField).filter(([, n]) => (n ?? 0) > 0)
    if (diverging.length > 0) {
      return {
        verdict: 'NOT-READY' as const,
        detail: `${m.turnsCompared - m.turnsAgreed}/${m.turnsCompared} turns diverged; fields: ${diverging.map(([f, n]) => `${f}=${n}`).join(', ')}`,
      }
    }
    return { verdict: 'READY' as const, detail: `${m.turnsAgreed}/${m.turnsCompared} turns agreed on every field` }
  }

  const v = r.verifier
  const k5 = v.turnsVerified < MIN_PARITY_TURNS
    ? { verdict: 'INSUFFICIENT-DATA' as const, detail: `${v.turnsVerified} turns verified; the K5 gate requires a 500-turn corpus` }
    : v.falsePositivesAdjudicated > 0
      ? { verdict: 'NOT-READY' as const, detail: `${v.falsePositivesAdjudicated} adjudicated false positive(s); the gate requires zero` }
      : (v.falsePositivesAdjudicated + v.truePositivesAdjudicated) === 0
        ? { verdict: 'INSUFFICIENT-DATA' as const, detail: `${v.turnsWithReject} rejects, none adjudicated — zero false positives out of zero reviews is not evidence` }
        : { verdict: 'READY' as const, detail: `${v.truePositivesAdjudicated} reviewed rejects, 0 false positives, violation rate ${r.verifierViolationRate === null ? 'n/a' : (r.verifierViolationRate * 100).toFixed(1) + '%'}` }

  const canonicalCount = Object.values(r.phases.canonicalOnly).reduce((a, b) => a + b, 0)
  const unrecognisedCount = Object.values(r.phases.unrecognised).reduce((a, b) => a + b, 0)

  return {
    k3ShadowToPrimary: parityVerdict(r.kernelParity, 'kernel pipeline'),
    k4ShadowToPrimary: parityVerdict(r.enginePolicyParity, 'policy engine'),
    k5LogToEnforce: k5,
    ladderCutoverSafety: canonicalCount + unrecognisedCount === 0
      ? { verdict: 'SAFE', detail: 'every persisted ladder carries a legacy phase name; a rollback would discard nothing' }
      : { verdict: 'UNSAFE', detail: `${canonicalCount} canonical and ${unrecognisedCount} unrecognised persisted phase values; a legacy reader DISCARDS these, wiping the ladder and revoking earned mastery` },
  }
}

export function formatReport(r: ReadinessReport, v: PromotionVerdicts): string {
  const pct = (x: number | null) => x === null ? 'n/a (below minimum sample)' : `${(x * 100).toFixed(2)}%`
  const bag = (o: Record<string, number>) =>
    Object.keys(o).length === 0 ? '(none)' : Object.entries(o).sort().map(([k, n]) => `${k}=${n}`).join(' ')
  return [
    `EOS readiness — ${r.sessions} sessions`,
    '',
    `K3 kernel parity      sessions=${r.sessionsWithKernelParity} turns=${r.kernelParity.turnsCompared} agreed=${r.kernelParity.turnsAgreed} rate=${pct(r.kernelAgreementRate)}`,
    `                      byField: ${bag(r.kernelParity.byField as Record<string, number>)}`,
    `K4 engine parity      sessions=${r.sessionsWithEngineParity} turns=${r.enginePolicyParity.turnsCompared} agreed=${r.enginePolicyParity.turnsAgreed} rate=${pct(r.engineAgreementRate)}`,
    `                      byField: ${bag(r.enginePolicyParity.byField as Record<string, number>)}`,
    `K5 verifier           sessions=${r.sessionsWithVerifierMetrics} verified=${r.verifier.turnsVerified} rejects=${r.verifier.turnsWithReject} rate=${pct(r.verifierViolationRate)}`,
    `                      corrected=${r.verifier.corrected} uncorrected=${r.verifier.uncorrected} candidates=${r.verifier.falsePositiveCandidates}`,
    `                      adjudicated: false=${r.verifier.falsePositivesAdjudicated} true=${r.verifier.truePositivesAdjudicated}`,
    `                      byCode: ${bag(r.verifier.byCode as Record<string, number>)}`,
    '',
    'Persisted ladder vocabulary (ISS-01 / objective D):',
    `  legacy        ${bag(r.phases.legacy)}`,
    `  canonical     ${bag(r.phases.canonicalOnly)}`,
    `  unrecognised  ${bag(r.phases.unrecognised)}`,
    `  no ladder     ${r.phases.sessionsWithNoLadder}`,
    '',
    'Promotion verdicts:',
    `  K3 shadow -> primary   ${v.k3ShadowToPrimary.verdict}  — ${v.k3ShadowToPrimary.detail}`,
    `  K4 shadow -> primary   ${v.k4ShadowToPrimary.verdict}  — ${v.k4ShadowToPrimary.detail}`,
    `  K5 log -> enforce      ${v.k5LogToEnforce.verdict}  — ${v.k5LogToEnforce.detail}`,
    `  ladder cutover safety  ${v.ladderCutoverSafety.verdict}  — ${v.ladderCutoverSafety.detail}`,
  ].join('\n')
}
