/**
 * THE "READ MORE" PREVIEW: the first few sentences of a long tutor message, never cut inside a construct the message
 * renderer draws specially.
 *
 * DEFECT (live, 2026-10-14). The preview used to end at the Nth match of `[.!?…]+` anywhere in the text, so it cut
 *   - inside inline maths:  "\(e^{z}=1 + z + \frac{z^{2}}{2!}" → the factorial "!" ended a "sentence" and the learner saw the
 *     raw characters `\(e^{z}=1 + z + \frac{z^{2}}{2!` with a "Read more" under them (Euler's Formula);
 *   - inside bold:          "**“η = … = 0.4”**" → the decimal point ended a "sentence", leaving `**“η = 1 − Tc/Th = 1 − 300/500 = 0.`
 *     with a stray `**` (Carnot Cycle);
 *   - after "e.g." and mid-number.
 * Expanding "Read more" rendered both correctly, so this is a PREVIEW defect only — which is why the collapsed card, the
 * one every learner sees first, was the place raw syntax showed.
 *
 * A sentence end now has to be real: a run of `.!?…` (with any closing quote, bracket or emphasis marker) followed by
 * whitespace or the end of the text, whose cut position is NOT inside a protected span (display/inline maths, bold,
 * italic, inline code, fenced code — the very ranges `MessageContent` and the progressive reveal already use), and is not
 * the full stop of a known abbreviation. So "0.4", "2!}", "3.5 m/s" and "e.g." never end a sentence.
 *
 * Pure. No React, no DOM.
 */
import { computeProtectedRanges, isInsideProtected } from '@/lib/teaching/progressiveReveal'

/** Words whose trailing full stop is not the end of a sentence. Lower-case, without the dot. */
const ABBREVIATIONS = new Set([
  'e.g', 'i.e', 'vs', 'etc', 'fig', 'figs', 'eq', 'eqs', 'approx', 'cf', 'ca', 'no', 'nos', 'dr', 'mr', 'mrs', 'ms', 'prof', 'st', 'sec', 'ch', 'al',
])

/** A sentence end: terminal punctuation, optional closers, then whitespace or end. Closers include emphasis markers. */
const SENTENCE_END = /[.!?…]+[*_"'”’)\]]*(?=\s|$)/g

export function truncatePreview(text: string, n: number): { preview: string; hasMore: boolean } {
  const ranges = computeProtectedRanges(text)
  const cuts: number[] = []
  SENTENCE_END.lastIndex = 0
  let m: RegExpExecArray | null
  while ((m = SENTENCE_END.exec(text)) !== null) {
    const end = m.index + m[0].length
    if (isInsideProtected(end, ranges)) continue
    // A lone "." after an abbreviation ("e.g.", "Fig.", "approx.") is not a sentence end.
    if (m[0] === '.') {
      const word = /([A-Za-z]+(?:\.[A-Za-z]+)*)$/.exec(text.slice(0, m.index))?.[1]
      if (word && ABBREVIATIONS.has(word.toLowerCase())) continue
    }
    cuts.push(end)
  }
  if (cuts.length <= n) return { preview: text, hasMore: false }
  return { preview: text.slice(0, cuts[n - 1]).trim(), hasMore: true }
}
