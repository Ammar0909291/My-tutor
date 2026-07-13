/**
 * Public surface for Explanation Memory + the Teaching Action Repository.
 * Route.ts and admin API routes should import from here rather than reaching
 * into individual files directly.
 */
export { buildStudentState, gradeToGradeBand, resolveContentRegister, type StudentState, type StudentStateInput } from './studentState'
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
export { jaccardSimilarity, hashContent, DUPLICATE_SIMILARITY_THRESHOLD } from './similarity'
export { decideCaptureAction, type CaptureDecision, type LineageAsset } from './versioning'
export { rankAsset, rankAssets, computeFreshness, parseManualPriority, type RankableAsset, type RankedAsset, type RankingFactors } from './ranking'
export {
  getConceptAssetCounts, getDuplicateCandidates, getSubjectRepositoryReport, getVersionChainCount,
  type ConceptAssetCounts, type DuplicateCandidate, type SubjectRepositoryReport,
} from './repositoryStats'
export { captureTracker, type CaptureHealthStats } from './captureTracker'
export type { CaptureOutcome } from './versioning'
export { validateExplanationCandidate, validateProbeCandidate, type ValidationResult, type ValidateExplanationInput, type ValidateProbeInput } from './validation'
export { decomposeLesson, type DecomposedSection } from './lessonDecomposition'
export { extractProbes, type ExtractedProbe } from './probeExtraction'
export { ingestGeneratedLesson, type IngestLessonInput, type IngestLessonResult, type IngestedExplanation, type IngestedProbe } from './pipeline'

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
