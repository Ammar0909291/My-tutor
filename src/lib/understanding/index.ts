/**
 * Conversation Understanding Engine (CUE) — entry point.
 *
 * Milestone 1 of the Educational Brain Runtime. One call per student turn,
 * made by route.ts BEFORE any response is generated:
 *
 *   const understanding = understandStudentTurn(inputs)
 *
 * The CUE understands; it does not decide, generate text, call a model, or
 * touch the DB. Its inputs are facts the route has ALREADY computed with
 * the existing systems (recoveryGuard, signals, sessionLifecycle,
 * placementVerification, misconceptionEngine, teachingStrategy, Explanation
 * Memory, contextSnapshot) plus the in-memory Knowledge Graph — readers
 * wrap and unify those systems, never duplicate them.
 *
 * Failure law: understanding must never break a turn. Every reader runs
 * inside its own guard; a reader that throws contributes 'unknown' values
 * (with source 'unavailable'), and understandStudentTurn itself never
 * throws.
 */
import type { Misconception } from '@/lib/school/adaptive/misconceptionEngine'
import type { PlacementVerificationState } from '@/lib/teaching/placementVerification'
import type { SessionEpisode } from '@/lib/teaching/sessionLifecycle'
import { readConversation, type ConversationReaderOutput } from './readers/conversationReader'
import { readStudentMemory, type StudentMemoryReaderOutput } from './readers/studentMemoryReader'
import { readProgress, type ProgressReaderOutput } from './readers/progressReader'
import { readMisconceptions, type MisconceptionReaderOutput } from './readers/misconceptionReader'
import { readExplanationMemory, type ExplanationMemoryReaderOutput } from './readers/explanationMemoryReader'
import { fuseUnderstanding } from './fusion'
import { type ConversationSummary, type StudentTurnUnderstanding, unknownValue } from './types'

export type { StudentTurnUnderstanding } from './types'
export * from './types'

/**
 * Mutable per-turn collector the route fills at the existing call sites
 * where branch-scoped values (misconceptions, visuals) are computed —
 * so the CUE can read them at the single common understanding point
 * without re-running any engine or hoisting more locals.
 */
export interface CueObservations {
  misconceptions?: Misconception[]
  availableVisual?: string | null
  visualDetectionRan?: boolean
}

export interface UnderstandingInputs {
  message: string
  history: Array<{ role: 'user' | 'assistant'; content: string }>
  recoveryKey: string | null
  firstLessonActive: boolean
  lastSignal: { correctness?: boolean; confidence?: string } | null
  sessionFailureCount: number
  episode: SessionEpisode | null
  freshBoundary: boolean
  lastSuccessfulTeachingStyle: string | null
  conceptId: string | null
  placement: PlacementVerificationState | null
  pendingPlacementProbe: 'below' | 'at' | 'above' | null
  dueReviewCount: number
  strategyType: string | null
  evidenceMove: string | null
  assembled: {
    usedAssetIds: string[]
    explanationConfidence: number | null
    explanationServingMode: string | null
  } | null
  memoryFallbackReason: string | null
  observations: CueObservations
}

function guard<T>(run: () => T, fallback: T): T {
  try { return run() } catch { return fallback }
}

const CONVERSATION_FALLBACK: ConversationReaderOutput = {
  studentIntent: unknownValue() as ConversationReaderOutput['studentIntent'],
  conversationIntent: unknownValue() as ConversationReaderOutput['conversationIntent'],
  confidence: unknownValue() as ConversationReaderOutput['confidence'],
  conversationSummary: {
    turnCount: 0, userTurns: 0, assistantTurns: 0,
    lastAssistantAskedQuestion: false, currentMessageChars: 0,
    currentMessageIsQuestion: false, source: 'unavailable',
  } satisfies ConversationSummary,
}

export function understandStudentTurn(inputs: UnderstandingInputs): StudentTurnUnderstanding {
  const conversation = guard<ConversationReaderOutput>(() => readConversation({
    message: inputs.message,
    history: inputs.history,
    recoveryKey: inputs.recoveryKey,
    lastSignal: inputs.lastSignal,
    episode: inputs.episode,
    freshBoundary: inputs.freshBoundary,
    firstLessonActive: inputs.firstLessonActive,
  }), CONVERSATION_FALLBACK)

  const studentMemory = guard<StudentMemoryReaderOutput>(() => readStudentMemory({
    lastSignal: inputs.lastSignal,
    sessionFailureCount: inputs.sessionFailureCount,
    episode: inputs.episode,
    lastSuccessfulTeachingStyle: inputs.lastSuccessfulTeachingStyle,
  }), { masteryState: unknownValue() as StudentMemoryReaderOutput['masteryState'], lastSuccessfulTeachingStyle: null })

  const progress = guard<ProgressReaderOutput>(() => readProgress({
    conceptId: inputs.conceptId,
    placement: inputs.placement,
    pendingPlacementProbe: inputs.pendingPlacementProbe,
    dueReviewCount: inputs.dueReviewCount,
    episode: inputs.episode,
  }), {
    currentTopic: unknownValue() as ProgressReaderOutput['currentTopic'],
    prerequisiteTopic: unknownValue() as ProgressReaderOutput['prerequisiteTopic'],
    progressState: unknownValue() as ProgressReaderOutput['progressState'],
  })

  const misconceptions = guard<MisconceptionReaderOutput>(
    () => readMisconceptions({ detected: inputs.observations?.misconceptions ?? null }),
    { misconceptionCandidates: [], detectionRan: false },
  )

  const explanationMemory = guard<ExplanationMemoryReaderOutput>(
    () => readExplanationMemory({ assembled: inputs.assembled, fallbackReason: inputs.memoryFallbackReason }),
    { explanationMemoryHits: [], memoryOutcome: 'reader-error' },
  )

  return fuseUnderstanding(conversation, studentMemory, progress, misconceptions, explanationMemory, {
    strategyType: inputs.strategyType,
    evidenceMove: inputs.evidenceMove,
    availableVisual: inputs.observations?.availableVisual ?? null,
    visualDetectionRan: inputs.observations?.visualDetectionRan === true,
  })
}
