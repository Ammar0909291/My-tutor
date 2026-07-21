/**
 * CUE Conversation Reader — reads THIS turn's message + visible history +
 * the detectors that already ran, and produces intent/confidence/summary.
 *
 * Reuses (never re-implements): recoveryGuard's detection result (passed in
 * — it already ran this turn), masteryGate's isBareAcknowledgement()/
 * detectLearnerRequest() (pure, shared with the route), the previous turn's
 * SIGNAL (contextSnapshot.lastSignal), and sessionLifecycle's episode.
 * Pure function — no I/O, no side effects.
 */
import { isBareAcknowledgement, detectLearnerRequest } from '@/lib/teaching/masteryGate'
import type { SessionEpisode } from '@/lib/teaching/sessionLifecycle'
import {
  type ConversationIntent, type ConversationSummary, type LearnerConfidence,
  type Sourced, type StudentIntent, sourced, unknownValue,
} from '../types'

export interface ConversationReaderInput {
  message: string
  history: Array<{ role: 'user' | 'assistant'; content: string }>
  /** recoveryGuard.detectFailureState() result the route already computed this turn (null = none). */
  recoveryKey: string | null
  /** Previous turn's SIGNAL from contextSnapshot.lastSignal. */
  lastSignal: { correctness?: boolean; confidence?: string } | null
  episode: SessionEpisode | null
  freshBoundary: boolean
  firstLessonActive: boolean
}

export interface ConversationReaderOutput {
  studentIntent: Sourced<StudentIntent>
  conversationIntent: Sourced<ConversationIntent>
  confidence: Sourced<LearnerConfidence>
  conversationSummary: ConversationSummary
}

const QUESTION_OPENERS = /^(what|why|how|when|where|which|who|can|could|would|does|do|did|is|are|will|should)\b/i

export function readConversation(input: ConversationReaderInput): ConversationReaderOutput {
  const message = input.message ?? ''
  const history = Array.isArray(input.history) ? input.history : []
  const lastAssistant = [...history].reverse().find((m) => m.role === 'assistant')
  const lastAssistantAskedQuestion = lastAssistant ? lastAssistant.content.includes('?') : false
  const trimmed = message.trim()
  const isQuestion = /\?\s*$/.test(trimmed) || QUESTION_OPENERS.test(trimmed)

  // Intent ladder — most reliable existing detector first, heuristics after.
  let studentIntent: Sourced<StudentIntent>
  if (input.recoveryKey) {
    studentIntent = sourced('expressing_distress', 'recoveryGuard', 0.9)
  } else if (isBareAcknowledgement(message)) {
    studentIntent = sourced('acknowledging', 'masteryGate', 0.85)
  } else if (detectLearnerRequest(message) !== null) {
    studentIntent = sourced('requesting_help', 'masteryGate', 0.8)
  } else if (isQuestion) {
    studentIntent = sourced('asking_question', 'conversationHeuristic', 0.7)
  } else if (lastAssistantAskedQuestion && trimmed.length > 0) {
    studentIntent = sourced('answering', 'conversationHeuristic', 0.6)
  } else {
    studentIntent = unknownValue<StudentIntent>() as Sourced<StudentIntent>
  }

  // Where the conversation IS — read from the states other systems already own.
  let conversationIntent: Sourced<ConversationIntent>
  if (input.recoveryKey) {
    conversationIntent = sourced('recovery', 'recoveryGuard', 0.9)
  } else if (input.episode?.phase === 'CLOSING') {
    // CLOSING outranks even the first-lesson protocol: a spent failure
    // budget ends the session in lesson one too (its budget is 1 for
    // exactly this reason — first-lesson/02 §2, decision-engine/07 §6).
    conversationIntent = sourced('session_closing', 'sessionLifecycle', 0.9)
  } else if (input.firstLessonActive) {
    conversationIntent = sourced('first_lesson', 'sessionLifecycle', 0.9)
  } else if (input.freshBoundary || input.episode?.phase === 'OPENING') {
    conversationIntent = sourced('session_opening', 'sessionLifecycle', 0.85)
  } else if (input.episode?.phase === 'CORE') {
    conversationIntent = sourced('core_teaching', 'sessionLifecycle', 0.85)
  } else {
    conversationIntent = unknownValue<ConversationIntent>() as Sourced<ConversationIntent>
  }

  // The learner's own signalled confidence — previous turn's SIGNAL tag.
  const sigConf = input.lastSignal?.confidence
  const confidence: Sourced<LearnerConfidence> =
    sigConf === 'high' || sigConf === 'medium' || sigConf === 'low'
      ? sourced(sigConf, 'signals:lastSignal', 0.6)
      : (unknownValue<LearnerConfidence>() as Sourced<LearnerConfidence>)

  const conversationSummary: ConversationSummary = {
    turnCount: history.length,
    userTurns: history.filter((m) => m.role === 'user').length,
    assistantTurns: history.filter((m) => m.role === 'assistant').length,
    lastAssistantAskedQuestion,
    currentMessageChars: message.length,
    currentMessageIsQuestion: isQuestion,
    helpRequestKind: detectLearnerRequest(message),
    source: 'conversationHeuristic',
  }

  return { studentIntent, conversationIntent, confidence, conversationSummary }
}
