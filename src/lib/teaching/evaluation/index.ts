/**
 * WP-5 — read-only evaluation (shadow mode).
 *
 * Three offline evaluators over recorded spine trajectories, plus the first
 * reader of DecisionRecorded v2. Nothing here writes, and nothing in the
 * runtime imports it: behaviour is byte-identical with or without this
 * module, which is what "shadow" means.
 *
 *   Phase 1 Stage 2  → goldStandard.ts     (TQ-5 gates + dimensions)
 *   Phase 2 Stage V2 → visualQuality.ts    (VD-9 criteria)
 *   Phase 3 Stage S2 → adaptationPublish.ts (publish at AF4, adapt nothing)
 */
export {
  decodeDecision, decodeDecisions, v2Coverage,
  type Availability, type Read, type DecisionCore,
  type DecodedDecision, type V2Coverage,
} from './decisionRecord'

export {
  evaluateTrajectory,
  type GateVerdict, type GateResult, type DimensionScore,
  type DimensionResult, type GoldStandardReport,
} from './goldStandard'

export {
  evaluateVisualQuality,
  type CriterionVerdict, type CriterionResult, type VisualQualityReport,
} from './visualQuality'

export {
  publishAdaptationSupport, archetypeDefaults,
  type AdaptationAvailability, type PublishedSupport, type AdaptationPublishReport,
} from './adaptationPublish'

// ── WP-9 — Phase 1 Stage 3–7, Phase 2 V3–V6, H-2. Evaluation only. ──────────
export {
  AXES, closure, closureAxes, changedAxes, evaluateReteachLegality, paraphraseBaseline,
  type Axis, type LegalityVerdict, type LegalityResult, type LegalityInputs,
  type ParaphraseBaseline,
} from './differenceOperator'

export {
  buildFailedAttemptSet, approachAlreadyFailed,
  type AttemptOutcome, type FailedAttemptSet,
} from './approachHistory'

export {
  CONTRAINDICATIONS, CONTRAINDICATION_REASON,
  evaluateAdmission, auditProjection, evaluateFallback, evaluateWithdrawal,
  type ContraindicationCode, type AdmissionVerdict, type AdmissionResult,
  type AdmissionInputs, type ProjectionAudit, type FallbackVerdict,
  type FallbackResult, type WithdrawalResult, type WithdrawalInputs,
} from './visualAdmission'
