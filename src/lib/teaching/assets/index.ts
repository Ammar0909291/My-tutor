/**
 * Public surface for Explanation Memory + the Teaching Action Repository.
 * Route.ts and admin API routes should import from here rather than reaching
 * into individual files directly.
 */
export { buildStudentState, gradeToGradeBand, type StudentState, type StudentStateInput } from './studentState'
export { scoreMatch, pickBest, DEFAULT_CONFIDENCE_THRESHOLD, type MatchableAsset, type MatchOptions } from './matcher'
export {
  findBestExplanation, captureGeneratedExplanation, listExplanationsForReview, reviewExplanationAsset,
  type ExplanationMatch, type CaptureExplanationInput,
} from './explanationMemory'
export {
  findBestProbe, captureGeneratedProbe, listProbesForReview, reviewProbeAsset, assembleLesson,
  type ProbeMatch, type CaptureProbeInput, type AssembledLesson,
} from './teachingActionRepository'
export type { ExplanationKind, ProbeKind, ProbeChoice } from './assetIdentity'

/**
 * Kill switch — defaults to enabled. Safe to leave on: with zero ACTIVE
 * assets (the state immediately after this build), every lookup misses and
 * the existing LLM pipeline runs completely unchanged. Set
 * DISABLE_EXPLANATION_MEMORY=true to force every turn through the LLM
 * regardless of catalogue state (e.g. while debugging).
 */
export function isExplanationMemoryEnabled(): boolean {
  return process.env.DISABLE_EXPLANATION_MEMORY !== 'true'
}
