/**
 * Stance Enforcement — Claude Recommendation #6: teaching-policy laws move
 * OUT of prompt prose and INTO deterministic runtime enforcement, so they
 * hold regardless of which LLM renders the turn.
 *
 * This is a THIN, PURE composition layer — no DB, no I/O, no new evidence
 * model. It is the single named chokepoint the mission asks for
 * ("a deterministic Stance Enforcement layer that validates lesson
 * progress before Tutor Max advances"), but every law it enforces either
 * ALREADY exists as a tested primitive elsewhere in this codebase (reused,
 * never reimplemented) or is a small, explicit addition built from those
 * same primitives. See STANCE_ENFORCEMENT.md in this directory for the
 * full audit of what was already enforced vs. what this module adds.
 *
 * Reused, not duplicated:
 *   - gateLessonCompletion / masteryVerified (masteryGate.ts) — the
 *     existing server-authoritative completion gate; this module is a
 *     thin wrapper, not a second implementation.
 *   - repliesWithQuestion (conversationState.ts) — the SAME question
 *     detector advanceConversationState already folds evidence with, used
 *     here to verify the rendered turn actually complied with a
 *     server-decided 'ask' move (Phase E), not merely that the engine
 *     DECIDED to ask.
 *   - ConversationState's evidence-gated phase ladder (correctAtCheck /
 *     correctAtPractice) — already the ONLY path to raise those counters;
 *     this module reuses masteryVerified() as the SAME bar a misconception
 *     must clear before it can be treated as addressed — no second
 *     mastery model.
 */
import type { ConversationState, NextMove } from './conversationState'
import { repliesWithQuestion } from './conversationState'
import { gateLessonCompletion, masteryVerified } from './masteryGate'

export type StanceViolationCode =
  | 'FALSE_MASTERY_COMPLETION'
  | 'UNSUPPORTED_EXPLANATION'
  | 'MISCONCEPTION_UNVERIFIED'

export interface StanceViolation {
  code: StanceViolationCode
  detail: string
}

export interface StanceVerdict {
  /** Text after any structural correction (today: [LESSON_COMPLETE]
   *  stripped when unauthorized — the only edit this layer performs;
   *  prose-level violations are reported, never silently rewritten). */
  cleanText: string
  /** True only when every enforced law held for this turn. */
  compliant: boolean
  violations: StanceViolation[]
  /** Mirrors gateLessonCompletion's authorization — true only when
   *  masteryVerified(state) at the time [LESSON_COMPLETE] was emitted. */
  completionAuthorized: boolean
}

export interface StanceEnforcementInput {
  /** The assistant's cleaned response text for this turn (SIGNAL tag and
   *  other control tags already stripped upstream). */
  text: string
  /** The conversation state AFTER this turn's evidence has been folded
   *  (advanceConversationState's output) — mastery/phase reflect this turn. */
  state: ConversationState
  /** The server-decided move for THIS turn (conversationState.decideNextMove
   *  output) — what the engine told the model to do, independent of what
   *  the model actually rendered. */
  move: NextMove | null
  /** Was a misconception detected on this concept at any point in the
   *  current lesson (ConversationState.misconceptionDetectedThisLesson)?
   *  Cheap, per-turn, no DB — see STANCE_ENFORCEMENT.md for how a richer cross-session
   *  source (Student Intelligence's MisconceptionState.activity) can
   *  supply this same boolean in a future integration without changing
   *  this module's contract. */
  misconceptionActive: boolean
}

/** Prose patterns claiming a misconception is resolved. Deliberately
 *  narrow (few false positives) — this is a backstop against a specific
 *  failure mode (LLM narrates resolution it didn't verify), not a general
 *  sentiment classifier. */
const RESOLUTION_CLAIM_RE =
  /\b(you'?ve (?:got|figured out|worked out|fixed|corrected|resolved) (?:it|that|this)|that'?s (?:resolved|fixed|sorted) now|(?:the )?misconception(?:'?s| is)? (?:now )?(?:resolved|fixed|cleared|gone)|you'?re not confused (?:about|by) (?:that|this) anymore|no longer confusing)\b/i

/**
 * The single Stance Enforcement chokepoint. Evaluates one already-rendered
 * turn against every currently-enforced teaching law and returns one
 * verdict. Pure; deterministic; never throws (a thrown error inside a
 * delegate would indicate a real bug, not an expected input — callers
 * should still wrap this per this codebase's fail-closed convention, same
 * as the existing gateLessonCompletion call site).
 */
export function enforceStance(input: StanceEnforcementInput): StanceVerdict {
  const violations: StanceViolation[] = []

  // Law: "student cannot advance without evidence" / "lesson completion
  // requires mastery, not conversation completion" / "false mastery
  // cannot advance". Delegates entirely to the existing gate — this is
  // the SAME check, not a parallel one.
  const completion = gateLessonCompletion(input.text, input.state)
  const cleanText = completion.cleanText
  if (completion.suppressed) {
    violations.push({
      code: 'FALSE_MASTERY_COMPLETION',
      detail: '[LESSON_COMPLETE] was emitted without verified mastery evidence (masteryVerified(state) === false) and was stripped',
    })
  }

  // Law: "every explanation must be followed by an appropriate mastery
  // check". The engine already DECIDES when a check is due (move==='ask');
  // this verifies the rendered turn actually complied — a TEACH/SHOW
  // response substituted for the required check is an unsupported
  // explanation: content without the verification it owes the learner.
  if (input.move === 'ask' && !repliesWithQuestion(cleanText)) {
    violations.push({
      code: 'UNSUPPORTED_EXPLANATION',
      detail: 'server-decided move was "ask" (a mastery check was due) but the rendered response contained no question',
    })
  }

  // Law: "a misconception cannot be marked resolved without successful
  // evidence". Reuses masteryVerified() as the SAME bar completion uses —
  // a misconception on this concept is only addressed once the learner
  // has independently cleared it, never from the model's own narrative.
  if (input.misconceptionActive && !masteryVerified(input.state) && RESOLUTION_CLAIM_RE.test(cleanText)) {
    violations.push({
      code: 'MISCONCEPTION_UNVERIFIED',
      detail: 'response claims the misconception is resolved but mastery evidence for this concept is not yet verified',
    })
  }

  return {
    cleanText,
    compliant: violations.length === 0,
    violations,
    completionAuthorized: completion.authorized,
  }
}
