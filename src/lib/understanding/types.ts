/**
 * Conversation Understanding Engine (CUE) — types.
 *
 * Milestone 1 of the Educational Brain Runtime (owner-approved 2026-07-21).
 * The CUE runs once per student turn, BEFORE any response is generated, and
 * produces exactly one structured object: StudentTurnUnderstanding.
 *
 * Design laws (from the CUE architectural review + Migration Blueprint):
 *  - The CUE UNDERSTANDS. It does not decide, does not generate text, does
 *    not call any model, does not write to the DB. Readers are pure
 *    functions over facts the runtime has already computed (or over the
 *    in-memory Knowledge Graph). No side effects anywhere in this module.
 *  - 'unknown' is always a valid value. A reader that lacks evidence says
 *    so via source='unavailable' + confidence 0 — it never guesses.
 *  - Every field carries provenance: WHICH existing system the value was
 *    read from, and a 0..1 confidence in the reading itself.
 *  - Reuse, never duplicate: values originate in the existing detectors
 *    (recoveryGuard, signals, sessionLifecycle, placementVerification,
 *    misconceptionEngine, teachingStrategy, Explanation Memory, KG). The
 *    CUE unifies their outputs; it re-implements none of them.
 */

/** Canonical provenance labels — each names the EXISTING system a value was read from. */
export type ProvenanceSource =
  | 'recoveryGuard'          // src/lib/teaching/recoveryGuard.ts detection (this turn)
  | 'masteryGate'            // src/lib/teaching/masteryGate.ts heuristics (this turn)
  | 'signals:lastSignal'     // previous turn's SIGNAL tag, persisted in contextSnapshot
  | 'sessionLifecycle'       // src/lib/teaching/sessionLifecycle.ts episode state
  | 'placementVerification'  // contextSnapshot.placementVerification state machine
  | 'teachingStrategy'       // src/lib/school/adaptive/teachingStrategy.ts (already computed this turn)
  | 'misconceptionEngine'    // src/lib/school/adaptive/misconceptionEngine.ts (already computed this turn)
  | 'explanationMemory'      // assembleLesson()/matcher.ts result (already computed this turn)
  | 'knowledgeGraph'         // src/lib/curriculum/knowledgeGraph.ts in-memory lookup
  | 'contextSnapshot'        // LearnSession.contextSnapshot persisted fields
  | 'visualDetection'        // detectVisual()/visualRegistry (already computed this turn)
  | 'conversationHeuristic'  // deterministic reading of the raw message/history
  | 'unavailable'            // not computed this turn / no evidence — value is 'unknown'

/** A value plus where it came from and how much the reading can be trusted (0..1). */
export interface Sourced<T> {
  value: T
  source: ProvenanceSource
  confidence: number
}

export function sourced<T>(value: T, source: ProvenanceSource, confidence: number): Sourced<T> {
  return { value, source, confidence }
}

export function unknownValue<T extends string>(reason?: string): Sourced<T | 'unknown'> {
  return { value: 'unknown', source: 'unavailable', confidence: 0, ...(reason ? { reason } : {}) } as Sourced<T | 'unknown'>
}

export type StudentIntent =
  | 'answering'            // responding to the tutor's pending question
  | 'asking_question'      // asking the tutor something
  | 'requesting_help'      // explicit help request (diagram / example / re-explain)
  | 'acknowledging'        // bare acknowledgement — not an answer (masteryGate rule)
  | 'expressing_distress'  // a recoveryGuard failure-state utterance
  | 'unknown'

export type ConversationIntent =
  | 'recovery'             // affect band preempts teaching this turn
  | 'first_lesson'         // first-lesson protocol is active
  | 'session_opening'      // fresh episode boundary — OPENING phase
  | 'core_teaching'        // mid-episode CORE work
  | 'session_closing'      // affect budget spent — CLOSING
  | 'unknown'

export type MasteryState =
  | 'struggling'           // repeated failures this session
  | 'fragile'              // last answer wrong, or failure count > 0
  | 'progressing'          // last answer right, no failures banked
  | 'unknown'

export type ProgressState =
  | 'placement_in_progress' // placement verification probes still running
  | 'reviews_due'           // spaced-revision items due before new content
  | 'on_track'              // normal progression, nothing blocking
  | 'unknown'

export type LearnerConfidence = 'high' | 'medium' | 'low' | 'unknown'

export interface MisconceptionCandidate {
  type: string
  label: string
  description: string
  confidence: 'HIGH' | 'MEDIUM' | 'LOW'
  evidenceCount: number
  source: ProvenanceSource
}

export interface ExplanationMemoryHit {
  assetId: string
  confidence: number | null
  servingMode: string | null
  source: ProvenanceSource
}

/** Deterministic, non-LLM summary of the visible conversation window. */
export interface ConversationSummary {
  turnCount: number
  userTurns: number
  assistantTurns: number
  lastAssistantAskedQuestion: boolean
  currentMessageChars: number
  currentMessageIsQuestion: boolean
  /** WHICH help the learner asked for (masteryGate.detectLearnerRequest) —
   *  preserved so the Decision Engine can match the response to the request
   *  (Milestone 5 P0 fix: a diagram is only the right answer to a diagram
   *  request, not to "explain differently"). */
  helpRequestKind: 'diagram' | 'real_life_example' | 'explain_differently' | null
  source: ProvenanceSource
}

/**
 * The CUE's single output object — one per student turn, computed before
 * the response is generated. This is the object the (future, Milestone 2+)
 * Decision Engine will consume. Nothing consumes it yet: Milestone 1 is
 * perception only, with zero behavior change.
 */
export interface StudentTurnUnderstanding {
  version: 1
  computedAt: string
  studentIntent: Sourced<StudentIntent>
  conversationIntent: Sourced<ConversationIntent>
  currentTopic: Sourced<string>            // KG concept id/title, or 'unknown'
  prerequisiteTopic: Sourced<string>       // first KG prerequisite, 'none', or 'unknown'
  confidence: Sourced<LearnerConfidence>   // the LEARNER's signalled confidence (last SIGNAL)
  masteryState: Sourced<MasteryState>
  misconceptionCandidates: MisconceptionCandidate[]
  explanationMemoryHits: ExplanationMemoryHit[]
  progressState: Sourced<ProgressState>
  conversationSummary: ConversationSummary
  requiredVisualization: Sourced<string>   // visual type name, 'none', or 'unknown'
  /** Descriptive READ of engines that already computed a mode this turn
   *  (teachingStrategy / evidence move / last successful style) — recorded
   *  with provenance; the CUE itself decides nothing. */
  recommendedTeachingMode: Sourced<string>
  /** Field names whose value is 'unknown' this turn, with the reason. */
  uncertainty: string[]
  /** field name → provenance source, flattened for quick inspection. */
  provenance: Record<string, ProvenanceSource>
  /** field name → confidence 0..1, flattened for quick inspection. */
  confidenceScores: Record<string, number>
}
