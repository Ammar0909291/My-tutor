/**
 * PHASE B — WHAT A NEW LESSON ATTEMPT CLEARS, IN ONE PLACE.
 *
 * There are four distinct boundaries in this runtime and they must not be
 * confused, because clearing at the wrong one destroys real learner progress:
 *
 *   RESUME SAME ATTEMPT  a refresh, a reconnect, the next turn. Clears
 *                        NOTHING. The pending MCQ is still on screen and must
 *                        still grade; the ladder, the excursion and the
 *                        teaching ledger are the attempt's real progress.
 *   CONCEPT SWITCH       handled by the readers themselves. conversationState,
 *                        teachingHistory, objectiveState and (as of Phase B)
 *                        narrativeState all reset when the stored conceptId
 *                        differs from the turn's. No caller cooperation.
 *   LESSON SWITCH        handled by identity where identity exists — the
 *                        excursion's `closed-lesson-changed` valve, and the
 *                        pending question's lesson key (pendingQuestion.ts).
 *                        This matters because a lesson switch does NOT always
 *                        open an attempt: `mode: 'next'` onto a lesson that
 *                        already has an IN_PROGRESS row clears nothing.
 *   NEW ATTEMPT          THIS module. The learner asked to do the lesson
 *                        again. Everything the previous attempt spent must be
 *                        unspent — and only a restart can see this, because
 *                        the concept and the lesson key are both unchanged, so
 *                        no keyed reader and no identity check can fire.
 *
 * WHY ONE MODULE AND NOT SIX CALLS AT THE CALL SITE. Phase 7L added the ladder
 * to lesson-init's delta as a third inline spread. Phase B found four more
 * stores with the same lifecycle, and a list of seven spreads in a route
 * handler is a boundary nobody can read or test as a whole. Each store's own
 * module still DEFINES its reset (the owner owns the rule — every function
 * composed below lives next to the state it retires); this module is the
 * single STATEMENT of which of them a new attempt triggers, so the boundary
 * can be asserted in one test instead of inferred from a route.
 *
 * WHAT IS DELIBERATELY ABSENT, and why — this list is the contract:
 *
 *   memoryContext          cross-session learner memory. Not per-attempt.
 *   placementVerification  a placement decision outlives any one lesson.
 *   pendingPlacementProbe  owned by its own ask-turn/answer-turn machine.
 *   questionLedger         anti-repetition across the SESSION. Clearing it
 *                          would let the tutor re-ask a question the learner
 *                          already answered minutes ago in the same sitting.
 *   sessionEpisode         already cleared at lesson OPEN (Phase 7K), which is
 *                          a wider boundary than this one — a resume needs a
 *                          fresh episode too, so it must not move here.
 *   sessionFailureCount    same owner as sessionEpisode.
 *   visualSession          same: cleared at lesson open, because a newly
 *                          opened client view is rendering nothing regardless
 *                          of whether an attempt was opened.
 *   currentConceptNodeId   the concept is unchanged by a restart; rewriting it
 *                          would make the keyed readers above fire spuriously.
 *   TopicProgress /        durable evidence in Postgres, not transient state.
 *   LessonAttempt rows     A restart opens a NEW row; the old one keeps its
 *                          record. Nothing here touches either.
 *
 * Pure module: no DB, no I/O. Returns a DELTA for writeSnapshotDelta, the
 * column's single sanctioned writer — every key is retired with an explicit
 * null rather than deleted, and every reader listed above already maps a
 * non-object to its own initial value, so this changes no reader.
 */

import { clearLadderForNewAttempt } from './conversationState'
import { clearPendingQuestionForNewAttempt } from './pendingQuestion'
import { clearTeachingHistoryForNewAttempt } from './teachingHistory'
import { clearExcursionForNewAttempt } from './excursion'
import { clearObjectiveForNewAttempt } from './objectiveModel'
import { clearNarrativeForNewAttempt } from './narrativeTracker'

/**
 * The snapshot delta for a lesson attempt that has just been OPENED.
 *
 * Call ONLY when an attempt was genuinely opened (lesson-init's
 * `openedNewAttempt`). A resume opens nothing and must clear nothing.
 */
export function clearTransientStateForNewAttempt(): Record<string, unknown> {
  return {
    ...clearLadderForNewAttempt(),
    ...clearPendingQuestionForNewAttempt(),
    ...clearTeachingHistoryForNewAttempt(),
    ...clearExcursionForNewAttempt(),
    ...clearObjectiveForNewAttempt(),
    ...clearNarrativeForNewAttempt(),
  }
}

/**
 * The exact key set the boundary above retires. Exported so a test can pin it:
 * a key added to the delta without being added here fails, and a key that
 * belongs to another boundary (episode, visual, placement, memory) cannot be
 * slipped in unnoticed.
 */
export const NEW_ATTEMPT_CLEARED_KEYS = [
  'conversationState',
  'excursion',
  'narrativeState',
  'objectiveState',
  'pendingMcq',
  'teachingHistory',
] as const
