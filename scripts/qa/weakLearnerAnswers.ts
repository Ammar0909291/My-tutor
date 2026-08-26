/**
 * How a weak learner types their answer to a multiple-choice question.
 *
 * Extracted from phase-d-learning-loop.ts so it can be imported by a test
 * without executing the harness (that file calls main() at module load).
 * QA ONLY — no production code imports this.
 *
 * ── WHY THIS WAS REPAIRED TWICE ─────────────────────────────────────────────
 *
 * The first version did `text.replace(/[^\w\s]/g,' ')`, which destroyed any
 * option containing mathematics: "v = ωr" became "v 2 r". cedd8cc fixed that by
 * truncating on a WORD boundary and stripping nothing.
 *
 * It left the other half. Truncation ITSELF mangles a formula or a clause, and
 * the clean Phase E run sent two answers no human would ever type:
 *
 *     "maybe 1 khz × (1 +"
 *     "i think it is from the same side as the"
 *
 * The first graded WRONG on a turn the harness INTENDED to answer correctly —
 * so it cost the learner a rung and made that lesson unmeasurable. An
 * instrument that fabricates failures cannot be used to judge a product, and
 * this repository has now been within one step of that seven times.
 *
 * ── THE RULE ────────────────────────────────────────────────────────────────
 *
 * A learner reading an option off the screen types the whole thing when it is
 * short — which nearly every real option is, formulas included. Only a genuinely
 * long option gets shortened, and then only at a point a person could plausibly
 * stop: brackets balanced, not mid-operator, not on a dangling article or
 * conjunction. If no such point exists, the whole option is echoed. Echoing
 * more than a real learner might is harmless; echoing nonsense is not.
 *
 * Nothing is ever invented: the output is always a prefix of the option.
 */

/** Longer than this and a learner would paraphrase rather than copy it out. */
const ECHO_WHOLE_MAX_CHARS = 48

/** Ends on something that obviously has more to come. */
const DANGLING_END =
  /(?:[+\-×*/=^±·√]|\b(?:the|a|an|of|to|from|as|and|or|is|are|was|were|with|for|in|on|at|by|than|that|this|these|those|same|its|it|which|who|when|while|but|so|if|into|onto|per|over|under)\b)\s*$/i

function bracketsBalanced(s: string): boolean {
  const closers: Record<string, string> = { ')': '(', ']': '[', '}': '{' }
  const stack: string[] = []
  for (const ch of s) {
    if ('([{'.includes(ch)) stack.push(ch)
    else if (ch in closers && stack.pop() !== closers[ch]) return false
  }
  return stack.length === 0
}

/** Could a person have stopped typing here? */
function isPlausibleStop(prefix: string): boolean {
  return bracketsBalanced(prefix) && !DANGLING_END.test(prefix)
}

const tidy = (s: string) => s.replace(/[,;:]$/, '').trim()

export function echoOption(text: string, maxWords: number): string {
  const clean = text.trim()
  if (!clean) return clean
  const words = clean.split(/\s+/)

  // Short enough to copy out in full — the common case, and the one that keeps
  // formulas and numeric values intact.
  if (clean.length <= ECHO_WHOLE_MAX_CHARS || words.length <= maxWords) {
    return tidy(clean)
  }

  // Long option: the longest prefix a person could plausibly have stopped at.
  for (let n = maxWords; n >= 2; n--) {
    const prefix = tidy(words.slice(0, n).join(' '))
    if (prefix && isPlausibleStop(prefix)) return prefix
  }

  // No safe stopping point — echo the whole thing rather than a fragment.
  return tidy(clean)
}

export function weakCorrectAnswer(options: string[], correctIndex: number, variant: number): string {
  const text = options[correctIndex]
  const letter = 'ABCD'[correctIndex]
  switch (variant % 4) {
    case 0:  return `i think it is ${echoOption(text, 6).toLowerCase()} sir`
    case 1:  return `${letter}. but sir i not fully sure`
    case 2:  return `maybe ${echoOption(text, 5).toLowerCase()}`
    default: return `sir i think ${letter}`
  }
}

export function weakWrongAnswer(options: string[], correctIndex: number): string {
  const wrong = options.findIndex((_, i) => i !== correctIndex)
  return `i think it is ${echoOption(options[wrong], 6).toLowerCase()}`
}
