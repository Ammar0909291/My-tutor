/**
 * K5 — Verifier metrics (Masterplan K5 DoD: "violation-rate dashboard live";
 * RS P-3 `cfg:driver.violationSlo = 5% of turns with any REJECT`).
 *
 * The rules and the loop already existed on main; nothing aggregated their
 * output, so the SLO the spec defines was unmeasurable. This module is the
 * missing counter — pure, foldable, and stored on the existing
 * contextSnapshot alongside every other session-scoped counter. It creates no
 * authority: it decides nothing and is read by no decision path.
 *
 * The four required quantities, and what each is honestly capable of saying:
 *
 *   verifierViolations   total REJECT-severity violations observed. The
 *                        numerator of the RS P-3 SLO.
 *   byCode               which rule fired. A concentration in one code is
 *                        almost always a lexicon defect, not a model defect —
 *                        this is what tells the two apart.
 *   corrected            the constrained re-render fixed it (attempt 2 passed).
 *   uncorrected          the learner received a violating or template turn:
 *                        template fallback in enforce mode, or the violating
 *                        draft itself in log mode. This is the number that
 *                        matters — it counts turns where the Brain's decision
 *                        did NOT reach the student.
 *   falsePositives       see below. Deliberately NOT inferred from the
 *                        verifier alone.
 *
 * ── On false positives, honestly ──────────────────────────────────────────
 * A false positive is a REJECT on a draft that was actually fine. The
 * verifier cannot know this about itself; asserting otherwise would be the
 * verifier grading its own homework. Two real sources are used instead:
 *
 *   1. LOG-ONLY MODE IS THE INSTRUMENT. In log mode the flagged draft is
 *      delivered unchanged, so the next learner turn is an uncontaminated
 *      observation of what that draft actually caused. A flagged turn whose
 *      successor shows no distress signal and no non-answer is recorded as a
 *      false-positive candidate. This is why log mode must come first: it is
 *      the only configuration in which the question is answerable at all.
 *   2. HUMAN ADJUDICATION. `markAdjudicated` records a reviewer's verdict on
 *      a sampled flagged turn. Candidates are evidence; adjudications are
 *      truth. The two are counted separately and never merged.
 */

import type { RuleCode, Violation, VerifyDecision } from './types'
import type { OutputEvent } from './loop'

export interface VerifierMetrics {
  /** Turns on which the gate ran at all — the SLO denominator. */
  turnsVerified: number
  /** Turns with ≥1 REJECT-severity violation — the SLO numerator. */
  turnsWithReject: number
  /** Total REJECT-severity violations (a turn may carry several). */
  verifierViolations: number
  /** Per-rule breakdown. Sparse: absent key means zero. */
  byCode: Partial<Record<RuleCode, number>>
  /** Re-render repaired it (enforce mode, attempt 2 passed). */
  corrected: number
  /** The learner received a turn that violated the Brain's decision:
   *  template fallback (enforce) or the violating draft (log). */
  uncorrected: number
  /** STRIP-severity auto-repairs. Not failures — the gate working silently. */
  stripped: number
  /** Flagged in log mode, and the following learner turn showed no distress
   *  and no non-answer. Evidence of a likely false positive, not proof. */
  falsePositiveCandidates: number
  /** A human reviewed a flagged turn and judged the flag wrong. Truth. */
  falsePositivesAdjudicated: number
  /** A human reviewed a flagged turn and judged the flag correct. */
  truePositivesAdjudicated: number
}

export function initialVerifierMetrics(): VerifierMetrics {
  return {
    turnsVerified: 0, turnsWithReject: 0, verifierViolations: 0, byCode: {},
    corrected: 0, uncorrected: 0, stripped: 0,
    falsePositiveCandidates: 0, falsePositivesAdjudicated: 0, truePositivesAdjudicated: 0,
  }
}

/** Total: never throws, tolerates a partial/legacy stored shape. */
export function readVerifierMetrics(raw: unknown): VerifierMetrics {
  if (raw && typeof raw === 'object') {
    return { ...initialVerifierMetrics(), ...(raw as Partial<VerifierMetrics>),
             byCode: { ...((raw as VerifierMetrics).byCode ?? {}) } }
  }
  return initialVerifierMetrics()
}

export interface VerifierTurnOutcome {
  mode: 'log' | 'enforce'
  decision: Pick<VerifyDecision, 'verdict' | 'violations'>
  /** From LoopResult. In log mode always 1 / false. */
  attempts: number
  usedTemplate: boolean
}

/** Fold one verified turn. Pure. */
export function foldVerifierMetrics(
  prev: VerifierMetrics | undefined,
  outcome: VerifierTurnOutcome,
): VerifierMetrics {
  const m = readVerifierMetrics(prev)
  m.turnsVerified += 1

  const rejects = outcome.decision.violations.filter((v) => v.severity === 'REJECT')
  const strips = outcome.decision.violations.filter((v) => v.severity === 'STRIP')
  m.stripped += strips.length

  for (const v of outcome.decision.violations) {
    m.byCode[v.code] = (m.byCode[v.code] ?? 0) + 1
  }

  if (rejects.length === 0) return m

  m.turnsWithReject += 1
  m.verifierViolations += rejects.length

  if (outcome.mode === 'log') {
    // The violating draft was delivered by design. Always uncorrected —
    // that is the price of measuring, and it is why log mode is temporary.
    m.uncorrected += 1
  } else if (outcome.usedTemplate) {
    m.uncorrected += 1
  } else if (outcome.attempts >= 2) {
    m.corrected += 1
  } else {
    // REJECT on attempt 1 with no second attempt recorded: the loop is
    // mid-flight or the gate failed open. Counted as uncorrected — the
    // conservative reading, since we cannot prove the learner got a clean turn.
    m.uncorrected += 1
  }
  return m
}

/**
 * Second half of the log-mode instrument: the NEXT turn's learner signal
 * adjudicates the previous turn's flag. Called once, on the turn after a
 * flagged one, with what the learner actually did.
 *
 * Deliberately conservative — only a genuinely clean successor counts as a
 * false-positive candidate. Silence is not clean (it is ambiguous), and any
 * distress or non-answer means the flag may well have been right.
 */
export function foldFalsePositiveCandidate(
  prev: VerifierMetrics | undefined,
  successor: { learnerShowedDistress: boolean; learnerNonAnswer: boolean; learnerResponded: boolean },
): VerifierMetrics {
  const m = readVerifierMetrics(prev)
  if (successor.learnerResponded && !successor.learnerShowedDistress && !successor.learnerNonAnswer) {
    m.falsePositiveCandidates += 1
  }
  return m
}

/** Human review of a sampled flagged turn. Truth, not inference. */
export function markAdjudicated(
  prev: VerifierMetrics | undefined,
  verdict: 'false_positive' | 'true_positive',
): VerifierMetrics {
  const m = readVerifierMetrics(prev)
  if (verdict === 'false_positive') m.falsePositivesAdjudicated += 1
  else m.truePositivesAdjudicated += 1
  return m
}

/** The RS P-3 SLO figure: share of verified turns carrying any REJECT.
 *  Returns null below a minimum sample so a single early turn cannot read
 *  as a 100% violation rate on a dashboard. */
export function violationRate(m: VerifierMetrics, minSample = 20): number | null {
  if (m.turnsVerified < minSample) return null
  return m.turnsWithReject / m.turnsVerified
}

/** Compact tags for the existing evidence-tag array on the turn record —
 *  reuses the persistence path already carrying `verifier:rejected` etc.
 *  rather than adding a second one. */
export function verifierTags(outcome: VerifierTurnOutcome): string[] {
  const rejects = outcome.decision.violations.filter((v) => v.severity === 'REJECT')
  if (rejects.length === 0) return []
  const codes = [...new Set(rejects.map((v) => v.code))].sort()
  return [
    `verifier:mode:${outcome.mode}`,
    ...codes.map((c) => `verifier:violation:${c}`),
    outcome.mode === 'log' ? 'verifier:log-only-delivered' : '',
  ].filter(Boolean)
}

/** Group violations by code for a single turn — used by the gate's event
 *  payload and by tests. Pure. */
export function violationsByCode(violations: Violation[]): Partial<Record<RuleCode, number>> {
  const out: Partial<Record<RuleCode, number>> = {}
  for (const v of violations) out[v.code] = (out[v.code] ?? 0) + 1
  return out
}

/** Convenience for reading the loop's event stream in tests / dashboards. */
export function countEventKind(events: OutputEvent[], kind: OutputEvent['kind']): number {
  return events.filter((e) => e.kind === kind).length
}
