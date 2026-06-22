/**
 * Sprint BS — In-session mastery tracking & understanding checks.
 *
 * Lightweight, conversational micro-checkpoints the tutor weaves into a
 * lesson to verify understanding DURING teaching (not via Practice/Assessment).
 * Backed by the `LearningCheckpoint` table — no writes to MistakeRecord,
 * TopicProgress, or PracticeSession.
 */

/** A KG node the tutor can attach a checkpoint to, for weak-topic stats. */
export interface CheckpointNode {
  id: string
  title: string
}

/**
 * Result of the lightweight AI classifier that looks at the previous
 * assistant turn + the student's latest reply and decides whether the
 * assistant asked an understanding-check question, and if so, whether the
 * student's reply demonstrates understanding.
 */
export interface CheckpointEvaluation {
  /** True if the previous assistant message ended with a checkpoint question. */
  checkpointAsked: boolean
  /** The checkpoint question text, if asked. */
  question: string | null
  /** A concise statement of the expected/correct understanding. */
  expectedAnswer: string | null
  /** Whether the student's reply demonstrates understanding of that question. */
  passed: boolean
  /**
   * Whether the reply was a genuine attempt at an answer ("substantive") vs.
   * non-committal/off-topic/fatigue ("deflect_or_vague"), independent of `passed`.
   * Lets callers distinguish "attempted and got it wrong" from "didn't meaningfully
   * attempt" — the latter should never log a misconception.
   */
  engagement: 'substantive' | 'deflect_or_vague'
  /** Best-guess KG node the checkpoint relates to (id from the provided list), if any. */
  nodeId: string | null
}
