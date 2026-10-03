/**
 * A RIGHT ANSWER IS NOT CREDITED TO THE PREVIOUS QUESTION.
 *
 * ── THE DEFECT (production, 2026-10-03, math.trig.unit-circle, weak-learner QA)
 * The learner answered "(0, 1)" to "what are the coordinates of the point at
 * 180°?" — wrong; the server corrected it to (−1, 0) and served the next
 * question, "…the point at θ = 90°?". The learner answered "(0, 1)" again —
 * right this time. The reply:
 *
 *   "That's right. Can you walk me through how you decided that the point at
 *    180° should be (0, 1)?"
 *
 * and the next turn TAUGHT the false fact: "rotate half a turn (180°) you end
 * up straight up on the circle, where the x-coordinate is 0 and the y-coordinate
 * is 1." The grade was right; the model tied the answer to the question before.
 * The prompt's last line already names the graded question (5ba7e62a,
 * "THIS TURN'S ANSWER") and was live — a prompt line did not prevent it.
 *
 * A second shape (production, 2026-10-03, math.disc.combinations): after a
 * wrong "120" to one card and a right "Yes" to the next, the reply was "That's
 * right. I see you chose 120. How did you work out that number?" — the old
 * choice named as this turn's.
 *
 * ── WHAT THIS DOES ──────────────────────────────────────────────────────────
 * On a server-graded CORRECT turn only, a sentence is dropped when it
 *  (a) states the learner's chosen answer together with a number that appears
 *      in the PREVIOUS question but nowhere in the graded one (its stem or
 *      options), or
 *  (b) says the learner chose / picked / answered something that is not the
 *      chosen option — an answer-like value (it has a digit, or is another
 *      option of the graded card); a following sentence pointing back at it
 *      ("…that number?") goes with it.
 * Nothing else is touched: a wrong answer's correction is server-written, and
 * comparing the two questions without restating the answer is left alone.
 */

/** Numbers as written in a stem: 180, 180°, 2.5, 3/4 → "180", "2.5", "3/4". */
const NUMBER = /(?<![\d.\/])\d+(?:[.\/]\d+)?/g

function numbersIn(text: string): Set<string> {
  return new Set((text ?? '').match(NUMBER) ?? [])
}

/** Spacing and LaTeX delimiters removed, so "\((0, 1)\)" matches "(0, 1)". */
function squash(s: string): string {
  return (s ?? '').replace(/\\[()[\]]/g, '').replace(/\s+/g, '').toLowerCase()
}

function containsAnswer(sentence: string, answer: string): boolean {
  const a = squash(answer)
  if (!a) return false
  const s = squash(sentence)
  if (/^[\d.\/−-]+$/.test(a)) {
    // A bare number must stand alone: "5" is not inside "15".
    return new RegExp(`(?<![\\d.])${a.replace(/[.\/]/g, (c) => `\\${c}`)}(?![\\d.])`).test(s)
  }
  return s.includes(a)
}

/** Card questions in a stored tutor message: the line before an "A) …" line
 *  (the format appendMcqToHistoryText writes). */
function cardQuestionsIn(text: string): string[] {
  const lines = (text ?? '').split('\n')
  const out: string[] = []
  for (let i = 1; i < lines.length; i++) {
    if (/^A\) /.test(lines[i]) && lines[i - 1].trim()) out.push(lines[i - 1].trim())
  }
  return out
}

/**
 * The card question asked before the graded one. `tutorMessages` are the
 * stored tutor messages of this lesson, oldest first; the graded question is
 * the newest card, so the previous one is the card before it.
 */
export function previousCardQuestion(tutorMessages: readonly string[], current: string): string | null {
  const cur = squash(current)
  const cards = tutorMessages.flatMap(cardQuestionsIn)
  let i = cards.length - 1
  while (i >= 0 && squash(cards[i]) === cur) i--
  return i >= 0 ? cards[i] : null
}

export interface StaleAttributionInput {
  text: string
  /** The question the server just graded, with its options. */
  graded: { question: string; options: readonly string[] }
  /** The option the learner chose; only a CORRECT grade calls this. */
  chosen: string
  /** The question asked before the graded one. */
  previous: string | null
}

const CLAIMED_CHOICE = /\byou(?:'ve| have)?\s+(?:chose|chosen|picked|selected|answered|went with)\s+(?:option\s+)?(.+?)\s*(?:[.?!,;:]|$)/i
const BACK_REFERENCE = /\bthat (?:number|answer|choice|value|option|result)\b/i

/** "you chose 120" when 120 is not what was chosen this turn. */
function claimsOtherChoice(sentence: string, chosen: string, options: readonly string[]): boolean {
  const m = CLAIMED_CHOICE.exec(sentence)
  if (!m) return false
  const claimed = m[1].replace(/[*_"“”‘’']/g, '').trim()
  const c = squash(claimed)
  if (!c || containsAnswer(claimed, chosen) || squash(chosen).includes(c)) return false
  // A value, not a phrase: "120", "(0, 1)", "40 N", "3/4" — never "2 questions correctly".
  const isValue = /^[-−+(]?[\d\s.,/√π()−+-]*\d[\d\s.,/√π()−+-]*(?:\s?[a-z%°]{1,3})?\)?$/i.test(claimed)
  const answerLike = isValue || options.some((o) => o !== chosen && squash(o) === c)
  return answerLike
}

export function dropStaleQuestionAttribution(input: StaleAttributionInput): { text: string; dropped: string[] } {
  const { text, graded, chosen, previous } = input
  if (!text || !chosen) return { text, dropped: [] }
  const current = numbersIn([graded.question, ...graded.options].join(' '))
  const stale = previous ? [...numbersIn(previous)].filter((n) => !current.has(n)) : []
  const staleRe = stale.length
    ? new RegExp(`(?<![\\d.\\/])(?:${stale.map((n) => n.replace(/[.\/]/g, (c) => `\\${c}`)).join('|')})(?![\\d.\\/])`)
    : null
  const dropped: string[] = []
  const kept = text
    .split(/\n{2,}/)
    .map((para) => {
      let afterClaim = false
      return (para.match(/[^.!?]+(?:[.!?]+|$)/g) ?? [para])
        .filter((sentence) => {
          const claim = claimsOtherChoice(sentence, chosen, graded.options)
          const bad = claim
            || (afterClaim && BACK_REFERENCE.test(sentence))
            || (staleRe !== null && staleRe.test(sentence) && containsAnswer(sentence, chosen))
          afterClaim = claim
          if (bad) dropped.push(sentence.trim())
          return !bad
        })
        .join('')
        .trim()
    })
    .filter(Boolean)
    .join('\n\n')
  return dropped.length ? { text: kept, dropped } : { text, dropped }
}

/**
 * The confirmation used when the one regeneration repeats the attribution.
 * Measured (production, 2026-10-03 09:36 UTC, same unit-circle turn after the
 * fix above shipped): the sentence was dropped, the regeneration — which sees
 * the same history — wrote "Can you walk me through how you decided the point
 * at 180° is (0, 1)?" again. Built only from the graded card, so it is true by
 * construction.
 */
export function confirmGradedAnswer(question: string, chosen: string): string {
  const q = (question ?? '').trim()
  const a = (chosen ?? '').trim().replace(/[.\s]+$/, '')
  return q && a ? `That's right — the answer to "${q}" is ${a}.` : 'That\'s right.'
}
