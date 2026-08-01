/**
 * WP-5 — Phase 1 Stage 2: TQ-5 offline trajectory evaluator.
 *
 * Phase 1 §14.2 Stage 2: "Implement the gates and dimensions as a read-only
 * trajectory evaluator over recorded data. Still no behaviour change.
 * Produces the baseline every later stage is judged against."
 *
 * OVER RECORDED DATA is the operative phrase. Phase 1 §8.3/§8.4 already mark
 * each gate and dimension by what the runtime can honestly supply, and this
 * evaluator reproduces those markings rather than papering over them: a gate
 * whose input is not recorded returns NOT_EVALUABLE with the missing input
 * named. A NOT_EVALUABLE gate is a finding about instrumentation, never a
 * pass and never a failure — scoring it either way would invent evidence.
 *
 * Read-only and pure: takes a trajectory of already-committed spine events,
 * returns a report. No I/O, no writes, no runtime wiring.
 */
import type { SpineEventRecord } from '@/lib/evidence-spine/types'
import { decodeDecisions, v2Coverage, type DecodedDecision, type V2Coverage } from './decisionRecord'

export type GateVerdict = 'PASS' | 'FAIL' | 'NOT_EVALUABLE'

export interface GateResult {
  id: string
  verdict: GateVerdict
  /** Why — for NOT_EVALUABLE, the missing input, named. */
  detail: string
}

export type DimensionScore = 0 | 1 | 2 | 3
export interface DimensionResult {
  id: string
  name: string
  score: DimensionScore | null      // null when not scoreable
  scoreable: boolean
  /** Declared where the input is a proxy rather than an instrument. */
  proxy?: string
  detail: string
}

export interface GoldStandardReport {
  turns: number
  decisions: number
  coverage: V2Coverage
  gates: GateResult[]
  dimensions: DimensionResult[]
  /** Gates that could be evaluated at all. The headline WP-5 number. */
  gatesEvaluable: number
  dimensionsScoreable: number
}

const notEvaluable = (id: string, detail: string): GateResult =>
  ({ id, verdict: 'NOT_EVALUABLE', detail })

/**
 * Evaluate one trajectory (one lesson's committed spine events).
 *
 * Every gate below cites the input it needs. Where WP-3's v2 group is that
 * input, the gate reads it through decisionRecord.ts and reports
 * NOT_EVALUABLE while no producer populates it — which is today, always.
 */
export function evaluateTrajectory(events: readonly SpineEventRecord[]): GoldStandardReport {
  const ordered = [...events].sort((a, b) => a.seq - b.seq)
  const decisions = decodeDecisions(ordered)
  const coverage = v2Coverage(decisions)

  const answers = ordered.filter(e => e.type === 'AnswerObserved')
  const assistantTurns = ordered.filter(e => e.type === 'AssistantRendered')
  const lessonCompleted = ordered.some(e => e.type === 'LessonCompleted')

  const gates: GateResult[] = [
    // G1 — needs C-29 legality state (INSTRUCTED) on the decision record.
    notEvaluable('G1', 'No `C-29` capability state on the decision record; INSTRUCTED is not recorded.'),

    // G2 — needs assisted-vs-unassisted evidence. WP-4 added the carriers
    // (evidence_events.scaffoldLevel / hintDebt) but nothing populates them.
    notEvaluable('G2', 'Assisted/unassisted split needs scaffoldLevel + hintDebt (AH-6 carriers exist, unpopulated).'),

    // G3/G4 — need the AttemptVector: primary axis, closure, diagnosis.
    gateFromAttemptVector('G3', decisions,
      'Primary-axis + closure check needs attemptVector (WP-3 v2 field, no producer).'),
    gateFromAttemptVector('G4', decisions,
      'Recorded-diagnosis precondition needs attemptVector (WP-3 v2 field, no producer).'),

    // G5 — close/banked-win. LessonCompleted IS recorded today.
    lessonCompleted
      ? { id: 'G5', verdict: 'PASS', detail: 'LessonCompleted present in the trajectory.' }
      : { id: 'G5', verdict: 'FAIL', detail: 'Trajectory ends with no LessonCompleted event.' },

    // G6 — no more than 2 consecutive question-actions. AssistantRendered
    // carries askedQuestion today, so this one is genuinely evaluable.
    consecutiveQuestionGate(ordered),

    // G7/G8 — MEASURED gates requiring enumerated reason codes.
    notEvaluable('G7', 'Non-verbal representation + enumerated reason code are not recorded (Phase 2 V1 territory).'),
    notEvaluable('G8', 'Misconception-addressed/deferred reason codes are not on the decision record.'),

    // G9 — rationale + alternativesRejected[]. provenance[] is rule-path
    // lite, NOT alternativesRejected; treating it as such would be inference.
    notEvaluable('G9', '`alternativesRejected[]` is not a DecisionRecorded field; provenance[] is a rule path, not rejected alternatives.'),

    // G10 — correctness-consistency needs a C-36 semantic check.
    notEvaluable('G10', 'No `C-36` correctness-consistency check output is recorded.'),

    // G11 — REVISION scheduled.
    notEvaluable('G11', 'TQ-2 arc completion / REVISION scheduling is not recorded.'),
  ]

  const learnerProduction = answers.length
  const totalTurns = assistantTurns.length + learnerProduction

  const dimensions: DimensionResult[] = [
    dim('S1', 'Arc completeness', false, 'Arc phases are not recorded; TQ-2 arc state is unimplemented.'),
    // §8.4 marks S2 NYS outright — no working-capacity instrument exists.
    dim('S2', 'Load discipline', false, 'NOT YET SCOREABLE per Phase 1 §8.4 — no working-capacity instrument exists anywhere in the architecture.'),
    dim('S3', 'Representation richness', false, 'Needs attemptVector axis 3 (representation); no producer.'),
    // S4 — interaction balance is computable from event counts alone.
    interactionBalance(learnerProduction, totalTurns),
    dim('S5', 'Struggle calibration', false, 'Correctness present; latency and confidence are not on the spine payload (confidence is an LLM self-report proxy per Phase 1 §3.4).'),
    dim('S6', 'Responsiveness', false, 'Needs `alternativesRejected[]`; not recorded.'),
    dim('S7', 'Voice quality', false, 'PARTIAL by design (Phase 1 §8.4) — register/burst are measurable in text but not recorded on the spine.'),
    dim('S8', 'Assessment quality', false, 'Item discrimination + distractor mapping are not on the spine.'),
    dim('S9', 'Closure quality', false, 'Summary authorship (tutor vs learner) is not recorded.'),
    dim('S10', 'Efficiency', false, 'Needs a per-concept turn baseline; none is recorded.'),
  ]

  return {
    turns: totalTurns,
    decisions: decisions.length,
    coverage,
    gates,
    dimensions,
    gatesEvaluable: gates.filter(g => g.verdict !== 'NOT_EVALUABLE').length,
    dimensionsScoreable: dimensions.filter(d => d.scoreable).length,
  }
}

function gateFromAttemptVector(id: string, decisions: readonly DecodedDecision[], why: string): GateResult {
  const captured = decisions.filter(d => d.attemptVector.availability === 'CAPTURED')
  if (captured.length === 0) return notEvaluable(id, why)
  // A producer exists. Deliberately still NOT_EVALUABLE: evaluating the
  // primary-axis/closure rules is Phase 1 Stage 3 (TQ-4), which is WP-8/WP-9
  // work. WP-5 reads the field and reports that it is present; it does not
  // implement the filter.
  return notEvaluable(id, `attemptVector present on ${captured.length}/${decisions.length} decisions; rule evaluation is Stage 3, not Stage 2.`)
}

function consecutiveQuestionGate(ordered: readonly SpineEventRecord[]): GateResult {
  let run = 0
  let worst = 0
  for (const e of ordered) {
    if (e.type !== 'AssistantRendered') continue
    const p = e.payload as { askedQuestion?: boolean } | null
    if (p && p.askedQuestion === true) { run += 1; worst = Math.max(worst, run) }
    else run = 0
  }
  return worst > 2
    ? { id: 'G6', verdict: 'FAIL', detail: `${worst} consecutive question-actions (limit 2).` }
    : { id: 'G6', verdict: 'PASS', detail: `Longest question run: ${worst}.` }
}

function interactionBalance(learnerProduction: number, totalTurns: number): DimensionResult {
  if (totalTurns === 0) {
    return { id: 'S4', name: 'Interaction balance', score: null, scoreable: false, detail: 'Empty trajectory.' }
  }
  const share = learnerProduction / totalTurns
  // Phase 1 §8.4 bands: tutor-talk ≥90% = 1; ~70% = 2; learner ≥40% = 3.
  // The "≥1 extended production" half of band 3 is NOT measurable (length is
  // not recorded per answer), so band 3 is capped at 2 and declared.
  const score: DimensionScore = share <= 0.10 ? 1 : share < 0.40 ? 2 : 2
  return {
    id: 'S4', name: 'Interaction balance', score, scoreable: true,
    proxy: share >= 0.40 ? 'Band 3 requires ≥1 extended production, which is not recorded — capped at 2.' : undefined,
    detail: `Learner production ${learnerProduction}/${totalTurns} turns (${(share * 100).toFixed(0)}%).`,
  }
}

function dim(id: string, name: string, scoreable: boolean, detail: string): DimensionResult {
  return { id, name, score: null, scoreable, detail }
}
