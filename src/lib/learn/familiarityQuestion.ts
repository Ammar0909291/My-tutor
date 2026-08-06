/**
 * The lesson opening's familiarity check, parsed out of the tutor's own text.
 *
 * The opening prompt asks for ONE confidence question, and the model writes it
 * as a single line of prose whose three answers are separated by slashes:
 *
 *   Before we begin — how familiar are you with this topic?
 *   🟢 I already know it / 🟡 I've seen it before / 🔴 Completely new to me
 *
 * That is a list of options rendered as a sentence. Nothing signals that
 * exactly one may be chosen, and answering means retyping an option by hand.
 *
 * PRESENTATION ONLY. This parses what the tutor already said so the UI can
 * offer the same three answers as a single-choice control; the chosen option is
 * then sent as the learner's own reply, byte-identical to what typing it
 * produced. The model is told nothing new and its calibration branch (step 9 of
 * the opening) reads exactly what it always read.
 *
 * The marker emojis are the parse anchor because all three teaching languages
 * emit the same three, so ru/hi work without a second parser.
 */

const FAMILIARITY_LINE_RE = /^.*🟢[^\n]*🟡[^\n]*🔴[^\n]*$/m

export interface FamiliarityQuestion {
  /** Text before the first option marker — the question itself. */
  question: string
  /** Exactly three answers, in the order the tutor offered them. */
  options: string[]
  /** The raw source line, so the caller can remove it from the printed text. */
  line: string
}

export function parseFamiliarityQuestion(text: string): FamiliarityQuestion | null {
  const match = text.match(FAMILIARITY_LINE_RE)
  if (!match) return null
  const line = match[0]
  const firstMarker = line.indexOf('🟢')
  const question = line.slice(0, firstMarker).replace(/[*_#>]/g, '').trim()
  const options = line
    .slice(firstMarker)
    .split(/(?=[🟢🟡🔴])/)
    .map((part) => part
      .replace(/[🟢🟡🔴]/g, '')
      // Strip the separator the tutor wrote between options, whichever side of
      // this fragment it landed on.
      .replace(/^\s*[/|·,]\s*/, '')
      .replace(/\s*[/|·,]\s*$/, '')
      .replace(/[*_#"]/g, '')
      .trim())
    .filter(Boolean)
  // Anything other than a clean three-option set is left as prose rather than
  // guessed at — a half-parsed control is worse than the sentence it replaced.
  return options.length === 3 ? { question, options, line } : null
}
