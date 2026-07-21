/**
 * CUE Context Fusion — combines the five readers' outputs into the single
 * StudentTurnUnderstanding object.
 *
 * Pure assembly: no new inference happens here. Fusion's only jobs are
 * (1) putting every reading in one place, (2) resolving the teaching-mode
 * DESCRIPTION from the engines that already computed one (strategy >
 * evidence move > remembered style — a provenance-ranked read, not a
 * decision), and (3) making ignorance explicit: every 'unknown' field is
 * listed in `uncertainty` with its reason, and every field's source +
 * confidence is flattened into the provenance/confidenceScores maps.
 */
import type { ConversationReaderOutput } from './readers/conversationReader'
import type { StudentMemoryReaderOutput } from './readers/studentMemoryReader'
import type { ProgressReaderOutput } from './readers/progressReader'
import type { MisconceptionReaderOutput } from './readers/misconceptionReader'
import type { ExplanationMemoryReaderOutput } from './readers/explanationMemoryReader'
import {
  type ProvenanceSource, type Sourced, type StudentTurnUnderstanding,
  sourced, unknownValue,
} from './types'

export interface FusionExtras {
  /** teachingStrategy.type the route already computed this turn (strategyHoisted). */
  strategyType: string | null
  /** evidence-loop move ('teach'|'show'|'ask') the route already computed, if any. */
  evidenceMove: string | null
  /** detectVisual()/visualRegistry result the route already computed, if any. */
  availableVisual: string | null
  /** true when a visual detection path genuinely ran this turn. */
  visualDetectionRan: boolean
}

export function fuseUnderstanding(
  conversation: ConversationReaderOutput,
  studentMemory: StudentMemoryReaderOutput,
  progress: ProgressReaderOutput,
  misconceptions: MisconceptionReaderOutput,
  explanationMemory: ExplanationMemoryReaderOutput,
  extras: FusionExtras,
): StudentTurnUnderstanding {
  // Teaching-mode DESCRIPTION, provenance-ranked from the engines that
  // already produced one this turn. The CUE records; it does not choose.
  let recommendedTeachingMode: Sourced<string>
  if (extras.strategyType) {
    recommendedTeachingMode = sourced(extras.strategyType, 'teachingStrategy', 0.85)
  } else if (extras.evidenceMove) {
    recommendedTeachingMode = sourced(extras.evidenceMove, 'contextSnapshot', 0.6)
  } else if (studentMemory.lastSuccessfulTeachingStyle) {
    recommendedTeachingMode = sourced(studentMemory.lastSuccessfulTeachingStyle, 'contextSnapshot', 0.4)
  } else {
    recommendedTeachingMode = unknownValue() as Sourced<string>
  }

  let requiredVisualization: Sourced<string>
  if (extras.availableVisual) {
    requiredVisualization = sourced(extras.availableVisual, 'visualDetection', 0.8)
  } else if (extras.visualDetectionRan) {
    requiredVisualization = sourced('none', 'visualDetection', 0.8)
  } else {
    requiredVisualization = unknownValue() as Sourced<string>
  }

  const understanding: StudentTurnUnderstanding = {
    version: 1,
    computedAt: new Date().toISOString(),
    studentIntent: conversation.studentIntent,
    conversationIntent: conversation.conversationIntent,
    currentTopic: progress.currentTopic,
    prerequisiteTopic: progress.prerequisiteTopic,
    confidence: conversation.confidence,
    masteryState: studentMemory.masteryState,
    misconceptionCandidates: misconceptions.misconceptionCandidates,
    explanationMemoryHits: explanationMemory.explanationMemoryHits,
    progressState: progress.progressState,
    conversationSummary: conversation.conversationSummary,
    requiredVisualization,
    recommendedTeachingMode,
    uncertainty: [],
    provenance: {},
    confidenceScores: {},
  }

  // Flatten provenance + confidence, and make every unknown explicit.
  const sourcedFields: Array<[string, Sourced<string>]> = [
    ['studentIntent', understanding.studentIntent as Sourced<string>],
    ['conversationIntent', understanding.conversationIntent as Sourced<string>],
    ['currentTopic', understanding.currentTopic],
    ['prerequisiteTopic', understanding.prerequisiteTopic],
    ['confidence', understanding.confidence as Sourced<string>],
    ['masteryState', understanding.masteryState as Sourced<string>],
    ['progressState', understanding.progressState as Sourced<string>],
    ['requiredVisualization', understanding.requiredVisualization],
    ['recommendedTeachingMode', understanding.recommendedTeachingMode],
  ]
  for (const [name, field] of sourcedFields) {
    understanding.provenance[name] = field.source
    understanding.confidenceScores[name] = field.confidence
    if (field.value === 'unknown') {
      understanding.uncertainty.push(`${name}: no evidence available this turn`)
    }
  }
  if (!misconceptions.detectionRan) {
    understanding.uncertainty.push('misconceptionCandidates: detection did not run this turn (not the same as none detected)')
    understanding.provenance['misconceptionCandidates'] = 'unavailable' as ProvenanceSource
    understanding.confidenceScores['misconceptionCandidates'] = 0
  } else {
    understanding.provenance['misconceptionCandidates'] = 'misconceptionEngine'
    understanding.confidenceScores['misconceptionCandidates'] = 0.8
  }
  if (explanationMemory.memoryOutcome === 'served') {
    understanding.provenance['explanationMemoryHits'] = 'explanationMemory'
    understanding.confidenceScores['explanationMemoryHits'] = 0.9
  } else {
    understanding.uncertainty.push(`explanationMemoryHits: ${explanationMemory.memoryOutcome}`)
    understanding.provenance['explanationMemoryHits'] = 'explanationMemory'
    understanding.confidenceScores['explanationMemoryHits'] = 0
  }

  return understanding
}
