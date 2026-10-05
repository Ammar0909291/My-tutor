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
// great job added 2026-09-08: a real near-miss found by
// stripLeadingFalseConfirmation's own reproduction (physics
// kinematics-2d) — a Great job opener matched none of the existing
// phrasings, only its sibling good job did. Kept in the same relative
// position as good job below so the two files' diff stays minimal.
// The last two alternatives are identification praise. MEASURED on production
// (Biology, 2026-09-27): a WRONG answer to a model-invented quiz, graded wrong
// with the ladder stepped back, got the reply: Great, you have spotted the
// hypertrophy adaptation. None of the other phrasings matched, so the unbacked
// praise was never stripped. Kept in lockstep with scripts/qa/rubricScore.ts.
export const CONFIRMS_CORRECT = new RegExp([
  '\\bcorrect\\b', '\\bexactly\\b', '\\bprecisely\\b', '\\bspot on\\b',
  '\\bwell done\\b', '\\bnicely done\\b', '\\bperfect\\b',
  "\\b(that|this) ?'?s right\\b", '\\bthat is right\\b',
  "\\byou'?re right\\b", '\\byou are right\\b', '\\bquite right\\b',
  "\\byou'?ve got it\\b", '\\bgot it right\\b', '\\byou nailed\\b',
  '\\bgood job\\b', '\\bgreat job\\b', '\\byes[,!.]',
  "\\b(great|good|nice|excellent|brilliant)[,!]?\\s+(you'?ve|you have|you)\\s+(correctly\\s+)?(spotted|identified|picked|found|chosen|caught|got)\\b",
  '\\bwell spotted\\b', '\\bgood (catch|spot|eye)\\b',
].join('|'), 'i')

/**
 * PRAISE THE C5 DETECTOR DOES NOT COUNT AS A CONFIRMATION — used only to strip
 * an unbacked opening (stripLeadingFalseConfirmation), never to decide that a
 * correct answer was already confirmed, so CONFIRMS_CORRECT and its scorer copy
 * (confirmationDetectorParity) are unchanged.
 *
 * CHEM-134/CHEM-075 (2026-10-05): measured on wrong or non-answers — "That's a
 * solid observation—you've picked out the chloride ion" (wrong SN1 tap),
 * "Great, you've captured the key idea", "you've hit on the exact mechanism",
 * "That calculation is spot‑on" (non-breaking hyphen), "Great, you've followed
 * the calculations so far" (to "ok").
 */
const UNBACKED_PRAISE = new RegExp([
  '\\bspot[\\-\u2010\u2011]on\\b',
  '\\b(?:solid|great|good|sharp|excellent|astute|keen) (?:observation|point|thinking|reasoning|insight)\\b',
  "\\b(?:you'?ve|you have) (?:(?:correctly|rightly) )?(?:captured|hit on|nailed|pinpointed|picked out|followed)\\b",
].join('|'), 'i')

/**
 * THE OPENING CLAIM MUST NOT OUTRUN THE GRADE.
 *
 * ── THE DEFECT ──────────────────────────────────────────────────────────────
 * Found in a low-IQ-persona role-play QA session (2026-09-08), reproduced on
 * THREE different concepts across both subjects (phys.stat.phase-transitions,
 * phys.mech.kinematics-2d, chem.atomic.orbitals), always the same shape: the
 * learner typed a hedge with the full correct option text embedded ("im not
 * sure but maybe <exact option>"). `resolveMcqChoice` correctly refused to
 * grade it (a hedge is not a confident tap), so the I1 disambiguation lead-in
 * fired ("I couldn't tell which option your answer matched...") — but the
 * MODEL, reading the same raw learner text, recognised the embedded answer
 * and opened its own reply with "Exactly right — magnetization is the order
 * parameter..." The learner received both "I don't know what you picked" and
 * "you picked correctly" in the same message. The server never banked false
 * evidence (this is a presentation defect, not a grading one — `correctAt
 * Check`/`correctAtPractice` are untouched either way), but the contradiction
 * itself teaches the learner that "correct" means nothing.
 *
 * ── WHY ONLY THE OPENING SENTENCE, NOT EVERY MATCH OF CONFIRMS_CORRECT ──────
 * `CONFIRMS_CORRECT` also matches plain, correct, uncontroversial teaching —
 * "the correct answer was X" inside a wrong-answer remediation, "yes, that
 * follows from..." mid-explanation. Stripping every sentence that matches
 * anywhere in the reply would delete real teaching content the learner needs.
 * In every reproduced case the false claim was the OPENING clause — the
 * model's very first reaction to the learner's message, before any teaching
 * — so this is scoped to the first sentence only. A confirmation appearing
 * later in the reply is left alone; that shape was never observed and
 * stripping it blind would risk exactly the collateral damage described
 * above.
 */
export function stripLeadingFalseConfirmation(text: string): string {
  if (typeof text !== 'string') return text
  const trimmed = text.trim()
  if (!trimmed) return text
  const sentences = trimmed.split(/(?<=[.!?])\s+/)
  const [first, ...rest] = sentences
  if (!first || !(affirmsTheLearner(first) || UNBACKED_PRAISE.test(flatten(first)))) return text
  return rest.join(' ').trim()
}

/**
 * Does this sentence AFFIRM the learner, rather than merely use the words?
 *
 * MEASURED LIVE (2026-09-30, phys.meas.units, deployment 76916f3b): after a
 * wrong tap the model's reply was 148 characters and what shipped was the bare
 * "Not quite — the answer is: 4.7 × 10⁻⁶ F". The model had written a one-
 * sentence explanation; "the correct conversion …" or "… which is exactly
 * 10⁻⁶" matched CONFIRMS_CORRECT, the whole sentence was dropped as false
 * praise, and the learner lost the only reason they were given. "Correct" as
 * an attributive adjective ("the correct value") and "exactly"/"precisely"
 * qualifying a quantity ("exactly one millionth") describe the physics, not
 * the learner's answer, so they are neutralised before the test.
 */
export function affirmsTheLearner(sentence: string): boolean {
  const neutral = flatten(sentence)
    .replace(/\b(?:the|a|an|your|its|their|this|that|our)\s+(?:most\s+)?correct\b/gi, ' ')
    .replace(/\bcorrect(?:ly)?\s+(?:answer|value|option|unit|units|conversion|choice|result|form|way|approach|one|reading|expression|equation|sign|direction|magnitude)\b/gi, ' ')
    .replace(/\b(?:you|you'?re)\s+(?:think|believe|feel|guess)\b[^.!?]*?\bcorrect\b/gi, ' ')
    .replace(/\b(?:select|choose|pick|tap|click)\b[^.!?]*?\bcorrect\b/gi, ' ')
    .replace(/\b(?:which|what)\s+(?:one|option|answer|choice\s+)?\s*(?:is|was)\s+correct\b/gi, ' ')
    .replace(/\b(?:exactly|precisely)\s+(?=[\d(−-]|one\b|two\b|half\b|twice\b|zero\b|the\b|a\b|an\b|what\b|how\b|where\b|when\b|why\b|equal\b|as\b)/gi, ' ')
  return CONFIRMS_CORRECT.test(neutral)
}

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

/** The confirmation sentence for a correct answer, rotated by the confirmations already given. */
export function confirmationPhrase(priorConfirmations?: number): string {
  const n = priorConfirmations
  const i = Number.isFinite(n) && (n as number) >= 0 ? Math.floor(n as number) % PHRASINGS.length : 0
  return PHRASINGS[i]
}

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
/**
 * Does the reply STATE that the answer was right? A question is not a
 * statement: "Is that correct?" contains `\bcorrect\b` but confirms nothing.
 *
 * MEASURED (synthetic-student run, phys.mech.acceleration and
 * phys.mech.kinematics-1d, 2026-09-25, production `[c5]` log
 * `confirmed: true`): the server graded "3 m/s²" correct and the whole reply
 * was "So you calculated the train's average acceleration as 3 metres per
 * second squared, right? Is that correct?" — the learner was asked to grade
 * their own right answer, and the enforcer added nothing because the regex
 * found "correct" inside the question. `CONFIRMS_CORRECT` itself is unchanged
 * (confirmationDetectorParity pins it to the scorer); only the text it is
 * tested against drops the sentences that end in "?".
 */
export function statesCorrect(text: string): boolean {
  const statements = flatten(text)
    .split(/(?<=[.!?])\s+|\n+/)
    .filter((sentence) => sentence.trim().length > 0 && !sentence.trim().endsWith('?'))
    // A denial is never a confirmation: "not quite right" contains "quite
    // right", which CONFIRMS_CORRECT matches (see DENIES_CORRECT below).
    .filter((sentence) => !DENIES_CORRECT.test(sentence))
  // Per sentence, through affirmsTheLearner: "please select the option you
  // think is correct" is an instruction, not a verdict. MEASURED LIVE
  // (2026-09-30, phys.particle.standard-model turn 10): after a CREDITED right
  // answer the reply was "Got it — please select the option you think is
  // correct from the choices above". "correct" matched, so no confirmation was
  // added and the learner was told to answer a question they had just got right.
  return statements.some((sentence) => affirmsTheLearner(sentence))
}

/**
 * An explicit verdict that the learner's answer was WRONG.
 *
 * MEASURED (synthetic-student run, phys.mech.tension, 2026-09-25, production
 * `[mcq-grade] correct: true` + `[c5] confirmed: true`): the learner tapped the
 * authored key "49 N — it must balance the lamp's weight" and the whole reply
 * was "That's not quite right—if the lamp is accelerating, the tension need not
 * equal its weight…". The enforcer added nothing because "not quite right"
 * contains "quite right". The learner was told a right answer was wrong.
 *
 * Narrower than wrongAnswerCorrection's STATES_INCORRECT on purpose: that list
 * also carries "the answer is" / "correct answer", which appear in genuine
 * praise ("Correct — the answer is 49 N") and must never be stripped here.
 */
export const DENIES_CORRECT = new RegExp([
  '\\bnot quite\\b', '\\bnot (?:right|correct)\\b', "\\bisn'?t (?:right|correct)\\b",
  '\\bincorrect\\b', "\\bthat'?s wrong\\b", '\\bnot exactly\\b', '\\bclose,? but\\b',
  '\\b(?:good|nice) try\\b',
].join('|'), 'i')

/**
 * Drop an opening sentence that DENIES a server-graded-correct answer. Scoped
 * to the first sentence for the same reason as stripLeadingFalseConfirmation:
 * a later "not exactly" can be ordinary teaching prose.
 */
export function stripLeadingFalseDenial(text: string): string {
  if (typeof text !== 'string') return text
  const trimmed = text.trim()
  if (!trimmed) return text
  const [first, ...rest] = trimmed.split(/(?<=[.!?])\s+/)
  if (!first || !DENIES_CORRECT.test(flatten(first))) return text
  return rest.join(' ').trim()
}

export function confirmCorrectAnswer(input: ConfirmationInput): ConfirmationResult {
  const { correct } = input
  let { text } = input
  if (correct !== true) return { text, added: false }
  if (typeof text !== 'string' || text.trim().length === 0) return { text, added: false }
  // An instruction to pick from the choices ABOVE, on the turn that graded that
  // very pick, asks the learner to answer again what they just got right (live
  // QA 2026-09-30; see statesCorrect). A new question's options sit BELOW the
  // message, so "above" only ever points at the answered one.
  text = text.replace(
    /(^|(?<=[.!?])\s+)[^.!?\n]*\b(?:select|choose|pick|tap|click)\b[^.!?\n]*\b(?:option|answer|choice)s?\b[^.!?\n]*\babove\b[^.!?\n]*[.!?]?/gi,
    '',
  ).trim()
  // The grade is the authority: a reply that opens by calling a correct answer
  // wrong loses that sentence before the confirmation is added.
  const undenied = stripLeadingFalseDenial(text)
  const denied = undenied !== text
  text = undenied
  // CHEM-028 (2026-10-05): the verdict comes first — a confirmation that only
  // appears after a paragraph on something else is not one the learner reads.
  const opening = text.trim().split(/(?<=[.!?])\s+|\n+/)[0] ?? ''
  if (!denied && statesCorrect(opening)) return { text, added: false }
  if (text.trim().length === 0) {
    const n0 = input.priorConfirmations
    const i0 = Number.isFinite(n0) && (n0 as number) >= 0 ? Math.floor(n0 as number) % PHRASINGS.length : 0
    return { text: PHRASINGS[i0], added: true }
  }
  if (statesCorrect(opening) && statesCorrect(text)) return { text, added: true }

  const n = input.priorConfirmations
  const index = Number.isFinite(n) && (n as number) >= 0 ? Math.floor(n as number) % PHRASINGS.length : 0
  return { text: `${PHRASINGS[index]} ${text.trimStart()}`, added: true }
}
