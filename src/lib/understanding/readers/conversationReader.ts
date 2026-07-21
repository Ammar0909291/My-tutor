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
/** P1 Human Teacher Reasoning: hedging markers in the CURRENT message. */
const HEDGE_RE = /\b(maybe|perhaps|possibly|probably|i think|i guess|not sure|i'?m guessing it)\b/i
/** A short answer phrased as a question ("is it 4?", "12?", "so it's the numerator?")
 *  while a question is pending — a tentative ANSWER, not a genuine question. */
const TENTATIVE_ANSWER_OPENER = /^(is it|was it|so it'?s|it'?s|could it be|would it be|maybe|perhaps)\b/i
const GENUINE_QUESTION_OPENER = /^(what|why|how|when|where|which|who)\b/i

export function readConversation(input: ConversationReaderInput): ConversationReaderOutput {
  const message = input.message ?? ''
  const history = Array.isArray(input.history) ? input.history : []
  const lastAssistant = [...history].reverse().find((m) => m.role === 'assistant')
  const lastAssistantAskedQuestion = lastAssistant ? lastAssistant.content.includes('?') : false
  const trimmed = message.trim()
  const isQuestion = /\?\s*$/.test(trimmed) || QUESTION_OPENERS.test(trimmed)

  // P1 Human Teacher Reasoning: "is it 4?" / "maybe 12?" after a pending
  // question is a hesitant ANSWER — the learner is offering a candidate
  // without ownership, not asking for information. Misreading it as a
  // question both misstates intent and hides the fragility signal.
  const tentativeAnswer = lastAssistantAskedQuestion && trimmed.length > 0 && (
    HEDGE_RE.test(trimmed) ||
    (/\?\s*$/.test(trimmed) && trimmed.length <= 40 && TENTATIVE_ANSWER_OPENER.test(trimmed)) ||
    (/\?\s*$/.test(trimmed) && trimmed.length <= 12 && !GENUINE_QUESTION_OPENER.test(trimmed))
  )
  const hedged = tentativeAnswer || (HEDGE_RE.test(trimmed) && trimmed.length > 0)

  // Intent ladder — most reliable existing detector first, heuristics after.
  let studentIntent: Sourced<StudentIntent>
  if (input.recoveryKey) {
    studentIntent = sourced('expressing_distress', 'recoveryGuard', 0.9)
  } else if (isBareAcknowledgement(message)) {
    studentIntent = sourced('acknowledging', 'masteryGate', 0.85)
  } else if (detectLearnerRequest(message) !== null) {
    studentIntent = sourced('requesting_help', 'masteryGate', 0.8)
  } else if (tentativeAnswer) {
    studentIntent = sourced('answering', 'conversationHeuristic', 0.7)
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

  // The learner's confidence: hedging in the CURRENT message is direct
  // evidence and outranks the previous turn's SIGNAL (P1 reasoning fix —
  // an expert teacher hears "maybe...?" as low confidence NOW, whatever
  // last turn looked like).
  const sigConf = input.lastSignal?.confidence
  const confidence: Sourced<LearnerConfidence> =
    hedged
      ? sourced('low', 'conversationHeuristic', 0.7)
      : sigConf === 'high' || sigConf === 'medium' || sigConf === 'low'
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
    hedged,
    source: 'conversationHeuristic',
  }

  return { studentIntent, conversationIntent, confidence, conversationSummary }
}
