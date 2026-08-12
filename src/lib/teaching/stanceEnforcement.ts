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
import { gateLessonCompletion, masteryVerified, masteryVerifiedStrict } from './masteryGate'

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
  /**
   * True when an off-lesson concept excursion is open this turn
   * (`teaching/excursion.ts`). The lesson is PAUSED for completion purposes:
   * a detour must never finish the lesson it detoured from. Forwarded to the
   * existing gate rather than checked here, so completion authority stays in
   * one function.
   */
  excursionActive?: boolean
}

/** Prose patterns claiming a misconception is resolved. Deliberately
 *  narrow (few false positives) — this is a backstop against a specific
 *  failure mode (LLM narrates resolution it didn't verify), not a general
 *  sentiment classifier. */
const RESOLUTION_CLAIM_RE =
  /\b(you'?ve (?:got|figured out|worked out|fixed|corrected|resolved) (?:it|that|this)|that'?s (?:resolved|fixed|sorted) now|(?:the )?misconception(?:'?s| is)? (?:now )?(?:resolved|fixed|cleared|gone)|you'?re not confused (?:about|by) (?:that|this) anymore|no longer confusing)\b/i

/**
 * Prose claims about the learner's RECORD — that a lesson is finished, or that
 * they have moved on to the next one.
 *
 * ── WHY THIS EXISTS ─────────────────────────────────────────────────────────
 * Measured in production, corpus audit Topic 2, on the learner's FIRST correct
 * answer of the lesson. The engine's own state for that turn:
 *
 *   { verified: false, phase: 'OBSERVE', checkCorrect: 0, practiceCorrect: 0,
 *     practiceRequired: 2, completionSuppressed: true, gatePending: true }
 *   completedLessons: []
 *
 * and the tutor said, in prose:
 *
 *   "✓ Progress — You've completed Lesson 3 of 238. Next up is
 *    'Measurement Errors and Uncertainty'."
 *
 * `gateLessonCompletion` did its job perfectly: it stripped `[LESSON_COMPLETE]`
 * so nothing was recorded. But it is a TAG gate, and the learner reads PROSE.
 * The system refused the completion and told the learner it had granted it —
 * the record and the claim disagreed, and the learner was told the false half.
 *
 * That is hollow advancement, which this product's whole stance is defined
 * against, and it is the same lesson V-AFFIRM learned: enforcement has to sit
 * on the surface the learner actually receives.
 *
 * ── SCOPE, DELIBERATELY NARROW ──────────────────────────────────────────────
 * Bookkeeping only. Praise is NOT a completion claim and is never touched:
 * "excellent work", "you've got it", "well done" all survive, exactly as the
 * earlier D3 fix concluded — keep the praise, drop the bookkeeping. What is
 * caught is a statement about the learner's progress record or a move to the
 * next lesson, neither of which happened.
 */
const COMPLETION_CLAIM_RE =
  /(you(?:'ve| have)?\s+(?:just\s+)?(?:completed|finished|wrapped up|mastered)\s+(?:this\s+|the\s+)?lesson|(?:you(?:'ve| have)?\s+)?completed\s+lesson\s+\d+|lesson\s+\d+\s+(?:of\s+\d+\s+)?(?:is\s+)?complete|this\s+lesson\s+is\s+(?:now\s+)?(?:complete|finished|done)|next\s+up\s+is\b|on\s+to\s+the\s+next\s+lesson|moving\s+on\s+to\s+lesson\s+\d+|your\s+next\s+lesson\s+is\b)/i

/**
 * Removes the sentences (or list items) that make a false record claim, leaving
 * the rest of the turn intact.
 *
 * Sentence-level rather than whole-turn, for the same reason the D3 fix was
 * clause-level: the surrounding recap and praise are legitimate teaching that
 * the learner earned, and deleting a good explanation to remove one false
 * clause would be a second harm.
 */
export function claimsCompletionInProse(text: string): boolean {
  return COMPLETION_CLAIM_RE.test(text)
}

export function stripCompletionClaims(text: string): string {
  const units = text.split(/(\n+)/)
  const kept: string[] = []
  for (const unit of units) {
    if (/^\n+$/.test(unit)) { kept.push(unit); continue }
    // Within a line, drop only the offending sentences.
    const sentences = unit.split(/(?<=[.!?])\s+/)
    const survivors = sentences.filter((s) => !COMPLETION_CLAIM_RE.test(s))
    if (survivors.length === sentences.length) { kept.push(unit); continue }
    const rebuilt = survivors.join(' ').trim()
    // A bullet reduced to its own label ("✓ Progress —") is debris; drop it.
    if (rebuilt && !/^[-*✓•]?\s*[\p{L} ']{0,24}[—:-]\s*$/u.test(rebuilt)) kept.push(rebuilt)
  }
  return kept.join('').replace(/\n{3,}/g, '\n\n').trim()
}

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
  const completion = gateLessonCompletion(input.text, input.state, {
    excursionActive: input.excursionActive,
  })
  let cleanText = completion.cleanText
  if (completion.suppressed) {
    violations.push({
      code: 'FALSE_MASTERY_COMPLETION',
      detail: input.excursionActive
        ? '[LESSON_COMPLETE] was emitted while an off-lesson concept excursion was open — the lesson is paused, not finished — and was stripped'
        : '[LESSON_COMPLETE] was emitted without verified mastery evidence (masteryVerified(state) === false) and was stripped',
    })
  }

  // THE SAME LAW, ON THE SURFACE THE LEARNER ACTUALLY READS.
  //
  // The tag gate above governs what the SYSTEM records. This governs what the
  // learner is TOLD. They came apart in production — completion suppressed,
  // `completedLessons: []`, and the tutor announcing "You've completed Lesson 3
  // of 238. Next up is …" — and the learner was told the false half.
  //
  // Runs tag or no tag: the measured failure emitted no tag at all, so a rule
  // that only fired alongside one would have missed it entirely.
  //
  // The gate is the TRUTH of the claim, NOT `completion.authorized`. Writing
  // this the obvious way first produced a false positive that this module's own
  // test caught: `gateLessonCompletion` returns `authorized: false` for every
  // turn WITHOUT the tag, so a learner who had genuinely met the bar would have
  // had their true completion claim stripped. What makes the claim honest is
  // the learner's evidence — the same strict bar the tag gate itself uses — and
  // the lesson not being paused by an excursion.
  const completionIsTrue = !input.excursionActive && masteryVerifiedStrict(input.state)
  if (!completionIsTrue && COMPLETION_CLAIM_RE.test(cleanText)) {
    const stripped = stripCompletionClaims(cleanText)
    // Never hand back an empty turn. If the claim WAS the whole message there
    // is nothing honest left to say, so the caller keeps the original and the
    // violation stands — visible, rather than silently blanked.
    if (stripped.length >= 40) cleanText = stripped
    violations.push({
      code: 'FALSE_MASTERY_COMPLETION',
      detail:
        'the response claimed in PROSE that the lesson was completed or that the learner had moved on, ' +
        'while completion was not authorized; the offending sentences were stripped',
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
