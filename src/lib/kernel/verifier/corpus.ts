/**
 * K5 — the false-positive corpus evaluator.
 *
 * WHAT THIS IS. The masterplan's K5 Definition of Done is "zero false-REJECT
 * on a 500-turn recorded corpus at enforce-time". `metrics.ts` already owns
 * the per-session counters and the honest distinction between an INFERRED
 * false-positive candidate and an ADJUDICATED one. What did not exist was the
 * thing that turns those counters into a go/no-go answer: a definition of the
 * corpus, and a function that evaluates one against a stated gate.
 *
 * WHAT THIS IS NOT. It is not wired into anything. It has no production
 * caller, reads no environment, performs no I/O, and cannot change a turn.
 * It lives beside the rules it measures rather than in a script directory so
 * that a change to `SEVERITY` or to `verify()` is compiled against it.
 *
 * WHY THE CORPUS CAN BE STATIC AT ALL. `verify(text, ctx, attempt)` is a
 * pure, deterministic, total function of the draft and the context
 * (verifier.ts's own header, RS T-4). So a recorded (draft, context) pair
 * replays byte-identically forever, and the corpus does not decay when the
 * runtime around it changes — only when a RULE changes, which is exactly when
 * you want to re-measure.
 *
 * ── DEFINITIONS, stated once ───────────────────────────────────────────────
 *
 *   REJECT-ELIGIBLE   A rule whose SEVERITY is 'REJECT'. Only these change
 *                     behaviour when the mode moves log → enforce. LOG and
 *                     STRIP rules are out of scope for this gate by
 *                     construction, and counting them would flatter it.
 *
 *   TRUE POSITIVE     A REJECT that a human reviewer, seeing the draft and
 *                     the decision it was rendered against, judges CORRECT:
 *                     the draft really did violate the Brain's decision, and
 *                     serving it would have taught the learner worse.
 *
 *   FALSE POSITIVE    A REJECT that a human reviewer judges WRONG: the draft
 *                     was a good turn and the rule misfired. This is the
 *                     number the gate is about, because enforce mode pays for
 *                     it with a wasted model call and, on a second failure,
 *                     with a template replacing real teaching.
 *
 *   CANDIDATE         A log-mode REJECT whose delivered draft was followed by
 *                     a clean learner turn (responded, no distress, no
 *                     non-answer). Evidence that the flag was probably wrong.
 *                     NEVER counted as a false positive: it is a prior for
 *                     sampling, not a verdict. `metrics.foldFalsePositiveCandidate`
 *                     owns this and this module does not restate its rule.
 *
 *   UNREVIEWED        A REJECT with no adjudication. The gate treats these as
 *                     UNKNOWN, never as true positives — an unreviewed reject
 *                     cannot count as evidence that the verifier is right.
 *
 * ── WHY THE GATE IS NOT "MAKE THE VERIFIER STRICTER" ───────────────────────
 * Nothing here proposes a new rule or a tighter threshold. A rule that has
 * never been measured on real drafts is not made safer by being made
 * stricter; it is made riskier. The gate's whole content is: measure, review
 * a sample, and require that the reviewed sample contains no misfires.
 */
import type { RuleCode, VerifierContext, VerifyDecision } from './types'
import { SEVERITY, RULE_CODES } from './types'
import { verify } from './verifier'

/** The REJECT-eligible rule set — the only codes enforce mode can act on. */
export const REJECT_ELIGIBLE_CODES: RuleCode[] =
  RULE_CODES.filter((c) => SEVERITY[c] === 'REJECT')

export type Adjudication = 'false_positive' | 'true_positive'

/** One recorded turn. Everything needed to replay the verifier exactly. */
export interface CorpusTurn {
  /** Stable id — a message id in production, a seed+index in simulation. */
  id: string
  /** Where it came from. A corpus of only authored fixtures proves the rules
   *  agree with their author; the gate requires production or simulation
   *  drafts to dominate. */
  source: 'production' | 'simulation' | 'authored-fixture'
  /** The draft as the model produced it, after tag cleaning, before the gate. */
  draftText: string
  /** The context the turn was rendered against. */
  ctx: VerifierContext
  /** What the learner did on the FOLLOWING turn, when the draft was actually
   *  delivered (log mode). Absent for simulation and fixture rows. */
  successor?: {
    learnerResponded: boolean
    learnerShowedDistress: boolean
    learnerNonAnswer: boolean
  }
  /** A human reviewer's verdict, when one exists. Truth. */
  adjudication?: Adjudication
}

export interface TurnEvaluation {
  id: string
  verdict: VerifyDecision['verdict']
  /** REJECT-severity codes only, sorted, deduplicated. */
  rejectCodes: RuleCode[]
  /** Log-mode inference. Never a verdict. */
  candidate: boolean
  adjudication: Adjudication | null
}

export interface CorpusEvaluation {
  turns: number
  bySource: Record<CorpusTurn['source'], number>
  /** Turns carrying >= 1 REJECT-severity violation — what enforce would act on. */
  rejects: number
  /** Share of turns enforce mode would have intervened on. The RS P-3 SLO
   *  denominator is every verified turn, so this is directly comparable. */
  rejectRate: number
  /** Per-code REJECT counts. A concentration in one code is almost always a
   *  lexicon defect rather than a model defect. */
  byCode: Partial<Record<RuleCode, number>>
  /** REJECTs a human has reviewed. */
  adjudicated: number
  falsePositives: number
  truePositives: number
  /** REJECTs with no review. Counted as UNKNOWN, never as correct. */
  unreviewedRejects: number
  /** Log-mode clean-successor inferences among the REJECTs. */
  candidates: number
  /** REJECT-eligible codes that the corpus never exercised. Each is a rule
   *  enforce mode could fire on in production having never been measured. */
  unexercisedCodes: RuleCode[]
  perTurn: TurnEvaluation[]
}

/** Replay the verifier over a corpus. Pure; deterministic; no I/O. */
export function evaluateCorpus(corpus: CorpusTurn[]): CorpusEvaluation {
  const byCode: Partial<Record<RuleCode, number>> = {}
  const bySource: Record<CorpusTurn['source'], number> =
    { production: 0, simulation: 0, 'authored-fixture': 0 }
  const perTurn: TurnEvaluation[] = []
  let rejects = 0, adjudicated = 0, falsePositives = 0, truePositives = 0, candidates = 0

  for (const t of corpus) {
    bySource[t.source] += 1
    const decision = verify(t.draftText, t.ctx, 1)
    const rejectCodes = [...new Set(
      decision.violations.filter((v) => v.severity === 'REJECT').map((v) => v.code),
    )].sort()
    const isReject = rejectCodes.length > 0
    if (isReject) {
      rejects += 1
      for (const c of rejectCodes) byCode[c] = (byCode[c] ?? 0) + 1
      if (t.adjudication) {
        adjudicated += 1
        if (t.adjudication === 'false_positive') falsePositives += 1
        else truePositives += 1
      }
    }
    // The candidate rule is metrics.ts's, restated by reference only: a clean
    // successor to a DELIVERED flagged draft. Simulation rows have no learner.
    const candidate = isReject && !!t.successor
      && t.successor.learnerResponded
      && !t.successor.learnerShowedDistress
      && !t.successor.learnerNonAnswer
    if (candidate) candidates += 1

    perTurn.push({
      id: t.id, verdict: decision.verdict, rejectCodes, candidate,
      adjudication: t.adjudication ?? null,
    })
  }

  const exercised = new Set(Object.keys(byCode) as RuleCode[])
  return {
    turns: corpus.length,
    bySource,
    rejects,
    rejectRate: corpus.length === 0 ? 0 : rejects / corpus.length,
    byCode,
    adjudicated,
    falsePositives,
    truePositives,
    unreviewedRejects: rejects - adjudicated,
    candidates,
    unexercisedCodes: REJECT_ELIGIBLE_CODES.filter((c) => !exercised.has(c)),
    perTurn,
  }
}

/**
 * The gate. Every number here is the masterplan's or the RS's, not a new
 * invention; where this module had to choose one (the review sample), the
 * choice is stated as a constant with its reason attached rather than buried
 * in a comparison.
 */
export interface EnforceGate {
  /** Masterplan K5 DoD: "a 500-turn recorded corpus". */
  minTurns: number
  /** Masterplan K5 DoD: "zero false-REJECT". Adjudicated only. */
  maxAdjudicatedFalsePositives: number
  /**
   * How many of the REJECTs must have been REVIEWED. Zero adjudicated false
   * positives out of zero reviews is not evidence of anything, and that is
   * the failure mode this constant exists to prevent. Set at 100% of rejects
   * up to a cap, then a floor of 30: below ~30 reviews a 0/N result is
   * consistent with a false-positive rate above 10%.
   */
  minReviewedRejects: number
  /** RS P-3: `cfg:driver.violationSlo = 5% of turns with any REJECT`. A
   *  corpus reject rate far above the SLO means the rules and the drafts
   *  disagree systematically — enforce first, ask later is the wrong order. */
  maxRejectRate: number
  /** A corpus made only of drafts written to exercise the rules proves the
   *  rules match their author. Real drafts must dominate. */
  minRealDraftShare: number
}

export const K5_ENFORCE_GATE: EnforceGate = {
  minTurns: 500,
  maxAdjudicatedFalsePositives: 0,
  minReviewedRejects: 30,
  maxRejectRate: 0.05,
  minRealDraftShare: 0.8,
}

export interface GateVerdict {
  pass: boolean
  /** Every unmet condition, in a stable order, phrased as what is missing. */
  reasons: string[]
  /** Conditions that passed — kept so a green result is auditable too. */
  satisfied: string[]
}

export function meetsEnforceGate(
  ev: CorpusEvaluation,
  gate: EnforceGate = K5_ENFORCE_GATE,
): GateVerdict {
  const reasons: string[] = []
  const satisfied: string[] = []
  const check = (ok: boolean, label: string, failure: string) =>
    ok ? satisfied.push(label) : reasons.push(failure)

  check(ev.turns >= gate.minTurns, 'corpus size',
    `corpus has ${ev.turns} turns, gate requires ${gate.minTurns}`)

  check(ev.falsePositives <= gate.maxAdjudicatedFalsePositives, 'zero adjudicated false positives',
    `${ev.falsePositives} adjudicated false positive(s); gate requires ${gate.maxAdjudicatedFalsePositives}`)

  const requiredReviews = Math.min(ev.rejects, gate.minReviewedRejects)
  check(ev.adjudicated >= requiredReviews, 'review sample',
    `${ev.adjudicated} of ${ev.rejects} rejects reviewed; gate requires at least ${requiredReviews}`)

  check(ev.rejectRate <= gate.maxRejectRate, 'reject rate within SLO',
    `reject rate ${(ev.rejectRate * 100).toFixed(1)}% exceeds the ${(gate.maxRejectRate * 100).toFixed(0)}% SLO`)

  const realShare = ev.turns === 0 ? 0
    : (ev.bySource.production + ev.bySource.simulation) / ev.turns
  check(realShare >= gate.minRealDraftShare, 'real-draft share',
    `${(realShare * 100).toFixed(0)}% of the corpus is production/simulation; gate requires ${(gate.minRealDraftShare * 100).toFixed(0)}%`)

  check(ev.unexercisedCodes.length === 0, 'every REJECT rule exercised',
    `never exercised by this corpus: ${ev.unexercisedCodes.join(', ')}`)

  return { pass: reasons.length === 0, reasons, satisfied }
}

/**
 * ROLLBACK CRITERIA for enforce mode, once it is on.
 *
 * These are read from the SAME `VerifierMetrics` the route already folds, so
 * enabling enforcement does not require new instrumentation. Any one of them
 * met ⇒ set ENABLE_OUTPUT_VERIFIER back to `log` (a flag flip; no deploy, no
 * data migration, because the verifier persists nothing a reader depends on).
 */
export interface RollbackSignal {
  /** Share of verified turns carrying any REJECT, over a rolling window. */
  rejectRate: number | null
  /** Share of REJECTs where the constrained re-render did NOT fix it, so the
   *  learner got a template instead of teaching. This is the number that
   *  measures harm, not the reject rate. */
  uncorrectedShare: number | null
  /** Any adjudicated false positive after enforcement began. */
  postEnforceFalsePositives: number
}

export const ROLLBACK_THRESHOLDS = {
  /** 2x the RS P-3 SLO: rejecting one turn in ten is a rule defect. */
  rejectRate: 0.10,
  /** More than one in twenty enforced turns ending in a template means the
   *  cure is worse than the disease — a template is a turn with no teaching. */
  uncorrectedShare: 0.05,
  /** Any adjudicated false positive in enforcement is a stop, because the
   *  entry gate required zero. */
  postEnforceFalsePositives: 1,
} as const

export function shouldRollback(s: RollbackSignal): { rollback: boolean; reasons: string[] } {
  const reasons: string[] = []
  if (s.rejectRate !== null && s.rejectRate >= ROLLBACK_THRESHOLDS.rejectRate) {
    reasons.push(`reject rate ${(s.rejectRate * 100).toFixed(1)}% >= ${(ROLLBACK_THRESHOLDS.rejectRate * 100).toFixed(0)}%`)
  }
  if (s.uncorrectedShare !== null && s.uncorrectedShare >= ROLLBACK_THRESHOLDS.uncorrectedShare) {
    reasons.push(`uncorrected share ${(s.uncorrectedShare * 100).toFixed(1)}% >= ${(ROLLBACK_THRESHOLDS.uncorrectedShare * 100).toFixed(0)}%`)
  }
  if (s.postEnforceFalsePositives >= ROLLBACK_THRESHOLDS.postEnforceFalsePositives) {
    reasons.push(`${s.postEnforceFalsePositives} adjudicated false positive(s) after enforcement began`)
  }
  return { rollback: reasons.length > 0, reasons }
}
