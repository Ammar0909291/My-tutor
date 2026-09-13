/**
 * A WRONG ANSWER MUST BE TOLD IT WAS WRONG, AND TOLD WHAT WAS RIGHT.
 *
 * ── THE DEFECT (ENG-D11, P1, five confirmed production instances) ───────────
 * `answerConfirmation.ts` guarantees a CONFIRMATION on a server-graded-correct
 * answer. There was never a symmetric guarantee on the other verdict, and
 * `confirmCorrectAnswer` returns the reply untouched for `correct !== true`. So
 * a learner who answered WRONG could be handed:
 *
 *   "I thought you were picking biography as the word that uses the
 *    'scrib/script' root. Is that right?"          (no verdict at all)
 *   "Here is your next question."                   (straight to the next MCQ)
 *   "Let's take one small step together. I'll walk through it with you and
 *    pause whenever it helps."                      (degraded-provider filler)
 *
 * In none of those does the learner find out they were wrong, let alone what the
 * answer was. The register's own words: "a weak learner who answers wrong and
 * gets no correction has no path to actually learn the correct answer."
 *
 * ── THIS FABRICATES NOTHING, WHICH IS THE WHOLE ARGUMENT ───────────────────
 * It fires ONLY on `correct === false` from `gradeMcqAnswer` — the server's
 * comparison against an AUTHORED, human-reviewed key, never the model's
 * self-report — and the answer it states is read out of that same authored
 * probe's own `options[correctIndex]`. Both halves are server ground truth. It
 * has no branch that can produce a correction from anything else, and it never
 * says a learner was wrong on a turn the server did not grade.
 *
 * Revealing a spent key is established practice here, not a new liberty:
 * `dontKnowCeiling.ts` already reveals `options[correctIndex]` verbatim, for the
 * same reason (a learner stuck in front of a question the server holds the key
 * to learns nothing from silence). The probe is consumed by the grade, so
 * nothing is given away that could still be earned.
 *
 * ── WHEN IT STAYS QUIET ────────────────────────────────────────────────────
 * Skipping requires BOTH halves to be present already: the reply must say the
 * answer was wrong AND name the right one. A conjunction, deliberately — a reply
 * that says "not quite" and then changes the subject leaves exactly the gap this
 * exists to close, and one that names the right answer without ever saying the
 * learner's was wrong reads as agreement. Either half alone is not enough.
 *
 * ── WHY IT MAY STAND ALONE ON AN EMPTY REPLY ───────────────────────────────
 * `confirmCorrectAnswer` refuses to attach to an empty reply, on the ground that
 * inventing a whole turn is beyond it. The asymmetry is intentional: praise
 * invented out of nothing is a fabricated turn, whereas the correction is a fact
 * the server already holds and the learner is owed. An empty reply after a wrong
 * answer is the content-free hold this register tracks separately; returning the
 * authored answer is strictly better than returning nothing.
 */

export interface TutorMcqLike {
  options?: unknown
  correctIndex?: unknown
}

export interface WrongAnswerCorrectionInput {
  /** The reply as it stands after the other post-model repairs. */
  text: string
  /** `gradeMcqAnswer`'s verdict for THIS turn. Null when nothing was graded. */
  correct: boolean | null
  /** The probe the server actually graded, for its authored key. */
  probe: TutorMcqLike | null | undefined
}

export interface WrongAnswerCorrectionResult {
  text: string
  /** True when a correction was added — for the turn log only. */
  added: boolean
  reason: 'added' | 'not-graded-wrong' | 'no-key' | 'already-corrected'
}

/** Typographic punctuation normalised before matching, exactly as
 *  `answerConfirmation.ts` does — the tutor writes "That's" with U+2019, and an
 *  ASCII-only pattern silently misses it. That is how the sibling criterion was
 *  first mis-measured at 2%. */
const flatten = (s: string) => s.replace(/[‘’ʼ]/g, "'").replace(/[“”]/g, '"')

/**
 * An EXPLICIT statement that the answer was wrong.
 *
 * Deliberately NOT a bare "no" or a bare "actually" — both are ordinary teaching
 * prose ("no two words are alike", "actually, this rule is older than you think")
 * and neither is a verdict on the learner's answer.
 */
export const STATES_INCORRECT = new RegExp([
  '\\bnot quite\\b', '\\bnot right\\b', "\\bisn'?t right\\b", '\\bnot correct\\b',
  "\\bisn'?t correct\\b", '\\bincorrect\\b', "\\bthat'?s wrong\\b", '\\bnot the right\\b',
  '\\bnot exactly\\b', '\\bclose, but\\b', '\\bnot the one\\b', '\\bgood try\\b',
  '\\bnice try\\b', '\\bthe answer is\\b', '\\bcorrect answer\\b',
].join('|'), 'i')

const norm = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9 ]+/g, ' ').replace(/\s+/g, ' ').trim()

const contentWords = (s: string) => norm(s).split(' ').filter((w) => w.length > 2)

/** The authored key, or null when the probe cannot supply one. Never guesses. */
function correctOption(probe: TutorMcqLike | null | undefined): string | null {
  if (!probe || typeof probe !== 'object') return null
  const options = Array.isArray(probe.options) ? probe.options : null
  const i = probe.correctIndex
  if (!options || typeof i !== 'number' || !Number.isInteger(i) || i < 0 || i >= options.length) {
    return null
  }
  const answer = options[i]
  return typeof answer === 'string' && answer.trim().length > 0 ? answer.trim() : null
}

/**
 * Does the reply already NAME the right answer?
 *
 * Containment first, for a short option a tutor quotes whole. Otherwise the
 * option's DISCRIMINATING words — the ones occurring in exactly one option — so
 * that vocabulary shared by every choice (which is every option's topic, and the
 * lesson's) can never be mistaken for having named one of them.
 */
function namesTheAnswer(text: string, probe: TutorMcqLike, answer: string): boolean {
  const t = norm(text)
  const a = norm(answer)
  if (a.length > 0 && t.includes(a)) return true

  const options = Array.isArray(probe.options) ? probe.options : []
  const occurrences = new Map<string, number>()
  for (const o of options) {
    if (typeof o !== 'string') continue
    for (const w of new Set(contentWords(o))) occurrences.set(w, (occurrences.get(w) ?? 0) + 1)
  }
  const said = new Set(contentWords(text))
  const discriminating = [...new Set(contentWords(answer))].filter((w) => occurrences.get(w) === 1)
  if (discriminating.length === 0) return false
  const hit = discriminating.filter((w) => said.has(w)).length
  return hit >= Math.min(2, discriminating.length)
}

/**
 * Prepend a correction when the server graded this turn's answer WRONG and the
 * reply does not already both say so and name the right answer.
 *
 * Total: never throws, and returns the input unchanged on every other verdict.
 */
export function stateCorrectionForWrongAnswer(
  input: WrongAnswerCorrectionInput,
): WrongAnswerCorrectionResult {
  const text = typeof input.text === 'string' ? input.text : ''
  if (input.correct !== false) return { text: input.text, added: false, reason: 'not-graded-wrong' }

  const answer = correctOption(input.probe)
  // No authored key means nothing truthful to say. Telling a learner they were
  // wrong without being able to say what was right is worse than silence, and
  // inventing the answer is the one thing this must never do.
  if (!answer) return { text: input.text, added: false, reason: 'no-key' }

  const flat = flatten(text)
  if (
    text.trim().length > 0
    && STATES_INCORRECT.test(flat)
    && namesTheAnswer(flat, input.probe as TutorMcqLike, answer)
  ) {
    return { text: input.text, added: false, reason: 'already-corrected' }
  }

  const correction = `Not quite — the answer is: ${answer}`
  const rest = text.trim()
  return {
    text: rest.length > 0 ? `${correction}\n\n${rest}` : correction,
    added: true,
    reason: 'added',
  }
}
