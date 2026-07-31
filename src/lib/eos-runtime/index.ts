/**
 * K6 — EOS Runtime integration barrel.
 *
 * Connects existing subsystems (M1 spine, K3 pipeline, K4 policy, C4
 * compiler, K5 verifier) into the live tutor route behind feature
 * flags. Nothing here is new architecture — it is wiring only.
 */
export * from './flags'
export { ensureBrainPacksLoaded, __resetBrainPacksLoaderForTests } from './packLoader'
export { verifierGate, type GateInputs, type GateResult } from './verifierGate'
export { buildVerifierContext, type BuildContextInput } from './buildContext'
export {
  policyGate, policyInputsFromState, NO_SIGNAL, DEFAULT_CALLER_FACTS,
  type PolicyGateResult, type LastSignalFacts, type CallerDecisionFacts,
} from './policyGate'
export {
  degradedTurn, DEFAULT_FALLBACK_CHAIN, DEGRADED_PROVIDER, isDegradedProvider,
  type DegradedTurn,
} from './degradedMode'
