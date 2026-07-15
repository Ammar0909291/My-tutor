/**
 * K3 kernel — barrel export.
 *
 * The kernel is intentionally small in K3 (the strangler frame). It grows
 * as stages migrate their logic in from route.ts and the existing modules
 * (recoveryGuard, conversationState, signals, sessionLifecycle,
 * placementVerification, firstLessonGuard) — one migration per follow-up.
 */
export * from './types'
export * from './context'
export * from './pipeline'
export * from './shadow'
export { ingestStage } from './stages/ingest'
export { senseStage, senseFromMessage } from './stages/sense'
export { commit1Stage } from './stages/commit1'
export { foldStage, buildStudentView } from './stages/fold'
export { interruptScanStage } from './stages/interruptScan'
export { scheduleStage } from './stages/schedule'
export { tsmStepStage } from './stages/tsmStep'
export { policyStage } from './stages/policy'
export { resolveStage } from './stages/resolve'
export { planStage } from './stages/plan'
export { renderStage, makeLlmDriver, type RenderDriver } from './stages/render'
export { verifyStage, passthroughVerifier, type Verifier } from './stages/verify'
export { commit2Stage } from './stages/commit2'
export { persistStage } from './stages/persist'
export { postStage } from './stages/post'
