/**
 * A CORRECT ANSWER MUST BE TOLD IT WAS CORRECT.
 *
 * ── THE DEFECT ──────────────────────────────────────────────────────────────
 * Measured 2026-08-30 by `rubricScore.ts` across the physics certification
 * sweep and the chemistry baseline: of the answers a learner gave that the
 * SERVER graded correct against an authored key, only
 *
 *      physics    104 of 269   (39%)
 *      chemistry   26 of  46   (57%)
 *
 * were met with any acknowledgement that they were right. Blueprint criterion
 * 5's gate is >= 90%. Read in the transcripts it is worse than the number
 * looks, because of WHERE it lands. `phys.wave.spring-mass`, three consecutive
 * correct answers:
 *
 *      T14  "That's right. Let me check your thinking with this."     <- good
 *      T15  "Here is a question to check your understanding:"          <- none
 *      T16  "Let's take one small step together. I'll walk through it
 *            with you and pause whenever it helps."                    <- none
 *
 * The learner answered correctly and was offered remediation. There is no
 * recovery available to them from that: the one signal that tells a struggling
 * learner they are getting somewhere is the one being withheld, and the tutor's
 * next move actively implies the opposite.
 *
 * ── WHY THE RUNTIME AND NOT THE PROMPT ──────────────────────────────────────
 * The same reason `figureReference.ts`, `gateProbeContract` and
 * `withholdUngradedGateQuestion` live here: a prompt instruction is advisory,
 * and this repo has now measured several advisory rules being ignored. 61% is
 * not a model that misunderstands the instruction; it is a model that does not
 * reliably act on it.
 *
 * ── THIS FABRICATES NOTHING, AND THAT IS THE WHOLE ARGUMENT ─────────────────
 * It fires ONLY on `correct === true` from `gradeMcqAnswer`, which compares the
 * learner's choice against an AUTHORED, human-reviewed answer key. That is
 * server ground truth, not the model's self-report — the same distinction the
 * SIGNAL machinery exists to police. It states a fact the server already knows
 * and had simply failed to pass on.
 *
 * On a WRONG answer it does nothing at all. Telling a learner they were right
 * when they were not is the one failure mode here that would be worse than the
 * defect, so the function has no branch that can produce a confirmation from
 * anything other than `correct === true`.
 *
 * ── IT NEVER SPEAKS TWICE ───────────────────────────────────────────────────
 * If the reply already confirms, the text is returned untouched. The detector
 * is the same one `rubricScore.ts` scores with, deliberately, so the thing that
 * measures the criterion and the thing that enforces it cannot drift apart.
 */

/** Typographic punctuation normalised before matching. The tutor writes
 *  "That’s right." with U+2019; an ASCII-only pattern silently misses it,
 *  which is exactly how the scorer first measured this criterion at 2%. */
const flatten = (s: string) =>
  s.replace(/[‘’ʼ]/g, "'").replace(/[“”]/g, '"')

/**
 * An EXPLICIT statement that the answer was right.
 *
 * Deliberately NOT a bare "right" — "the right-hand side" is not praise. Every
 * alternative below was taken from a reply the tutor actually produced.
 */
export const CONFIRMS_CORRECT = new RegExp([
  '\\bcorrect\\b', '\\bexactly\\b', '\\bprecisely\\b', '\\bspot on\\b',
  '\\bwell done\\b', '\\bnicely done\\b', '\\bperfect\\b',
  "\\b(that|this) ?'?s right\\b", '\\bthat is right\\b',
  "\\byou'?re right\\b", '\\byou are right\\b', '\\bquite right\\b',
  "\\byou'?ve got it\\b", '\\bgot it right\\b', '\\byou nailed\\b',
  '\\bgood job\\b', '\\byes[,!.]',
].join('|'), 'i')

/**
 * Three phrasings, rotated deterministically.
 *
 * ONE fixed sentence would be the simplest thing that works, and this repo has
 * already measured why it is not enough: `fillerRepairStreak` exists because a
 * canned sentence repeated verbatim every turn reads as a machine, and a
 * struggling learner is the last person who should be talked to by a machine.
 * The rotation is keyed on a COUNT the caller already holds, so it is a pure
 * function of state and a test can pin every branch — no randomness.
 */
const PHRASINGS = [
  "That's right.",
  'Correct — well done.',
  'Yes, exactly right.',
] as const

export interface ConfirmationInput {
  /** The reply as it stands after the other post-model repairs. */
  text: string
  /** `gradeMcqAnswer`'s verdict for THIS turn. Null when nothing was graded. */
  correct: boolean | null
  /** How many answers this session has already had confirmed. Rotates the
   *  phrasing; any non-finite or negative value is treated as 0. */
  priorConfirmations?: number
}

export interface ConfirmationResult {
  text: string
  /** True when a confirmation was added — for the turn log, never for a claim
   *  about whether the learner was right. */
  added: boolean
}

/**
 * Prepend a confirmation when the server graded this turn's answer correct and
 * the reply does not already say so.
 *
 * Returns the input unchanged in every other case, including an empty or
 * whitespace-only reply: there is no sensible place to attach a confirmation to
 * nothing, and inventing a whole turn is beyond what this is allowed to do.
 */
export function confirmCorrectAnswer(input: ConfirmationInput): ConfirmationResult {
  const { text, correct } = input
  if (correct !== true) return { text, added: false }
  if (typeof text !== 'string' || text.trim().length === 0) return { text, added: false }
  if (CONFIRMS_CORRECT.test(flatten(text))) return { text, added: false }

  const n = input.priorConfirmations
  const index = Number.isFinite(n) && (n as number) >= 0 ? Math.floor(n as number) % PHRASINGS.length : 0
  return { text: `${PHRASINGS[index]} ${text.trimStart()}`, added: true }
}
