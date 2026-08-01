/**
 * WP-8 — Control Plane Behaviour, shadow-first.
 *
 *   AH-1  asv.ts           the typed six-dial Adaptation State Vector
 *   AH-11 policyRules.ts   pressure/governor rules in basePack.ts's format,
 *                          Bands 2/4/5, exported and NOT registered
 *   §19.3 governor.ts      Phase 3 constants in the existing BrainConfig store,
 *                          read through the existing reader, no defaults
 *   S3–S7 shadowStages.ts  evaluate and report; apply nothing
 *
 * Only asv.ts's parser reaches the live path, through the single existing
 * declaration tag and the single existing emitTurn() call. Nothing else here
 * is imported by the runtime, so no teaching decision differs.
 */
export {
  ASV_HONESTY_CLASS, DIALS, readAsvAttributes, declaredDials, projectStandingAsv,
  type DialId, type AdaptationStateVector,
} from './asv'

export {
  GOVERNOR_CONSTANT_KEYS, resolveGovernorConstants, allSet,
  type GovernorConstantKey, type GovernorConstant, type ConstantAvailability,
} from './governor'

export {
  PHASE3_GOVERNOR_RULES, rulesCiteTheirSource, rulesAreInAuthorisedBands,
  band2IsSubtractiveOnly,
} from './policyRules'

export {
  evaluateS3, evaluateS4, evaluateS5, evaluateS6, evaluateS7, runShadowStages,
  type StageVerdict, type StageReport, type StageInputs, type ShadowRunReport,
} from './shadowStages'
