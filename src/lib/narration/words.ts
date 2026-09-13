/**
 * Narrated Read-Along — word-level tokenization and index mapping.
 *
 * Pure, DOM-free, subject-agnostic. This is what turns sentence-level
 * highlighting into word-level highlighting: splitting a segment's rendered
 * text into individually-addressable words while preserving every character
 * of whitespace/punctuation exactly (concatenating every token's `text`
 * reproduces the original string), and mapping a word position in the
 * SPOKEN text (which `cleanTextForTTS` may have rewritten — a chemical
 * formula, a unit, a superscript expand into a different number of words)
 * onto the corresponding word in the RENDERED text.
 *
 * The mapping is EXACT when word counts match, which is the common case:
 * cleanTextForTTS leaves ordinary teaching prose untouched, only rewriting
 * the specific tokens it has rules for (formulas, units, symbols, LaTeX).
 * When the counts genuinely differ, `mapProportionalIndex` falls back to a
 * proportional estimate — the same honestly-labeled-approximation style
 * `timeSync.ts` already uses for segment-level audio-time mapping, for the
 * identical reason (no measured correspondence exists to fall back on).
 */

export interface WordToken {
  kind: 'word' | 'space'
  /** The literal substring — for 'space' this is the exact separator run
   *  (may be more than one character), for 'word' the word itself (with any
   *  attached punctuation, e.g. "don't", "cat,", "3.14"). */
  text: string
  /** 0-based index among 'word'-kind tokens only, in order. Present only on
   *  'word' tokens. */
  wordIndex?: number
}

/**
 * Splits `text` into word and whitespace-separator tokens. Concatenating
 * every token's `text` in order reproduces `text` exactly — no whitespace
 * is collapsed, no punctuation is stripped, nothing is reordered.
 */
export function tokenizeWords(text: string): WordToken[] {
  if (!text) return []
  const parts = text.split(/(\s+)/)
  const tokens: WordToken[] = []
  let wordIndex = 0
  for (const part of parts) {
    if (part === '') continue
    if (/^\s+$/.test(part)) {
      tokens.push({ kind: 'space', text: part })
    } else {
      tokens.push({ kind: 'word', text: part, wordIndex: wordIndex++ })
    }
  }
  return tokens
}

/** How many highlightable words `text` tokenizes into. */
export function wordCount(text: string): number {
  let count = 0
  for (const token of tokenizeWords(text)) {
    if (token.kind === 'word') count++
  }
  return count
}

/**
 * Maps a 0-based index in a source space of size `sourceCount` onto the
 * corresponding 0-based index in a target space of size `targetCount`.
 * Reduces to the IDENTITY mapping when the two counts are equal (the common
 * case for word-count mapping — most sentences tokenize to the same word
 * count before and after cleanTextForTTS); otherwise a proportional
 * estimate. Clamped into `[0, targetCount - 1]`.
 */
export function mapProportionalIndex(sourceIndex: number, sourceCount: number, targetCount: number): number {
  if (targetCount <= 0) return 0
  if (sourceCount <= 0) return 0
  const ratio = sourceIndex / sourceCount
  const mapped = Math.floor(ratio * targetCount)
  return Math.min(targetCount - 1, Math.max(0, mapped))
}

/**
 * Maps a character position within `spokenText` (as reported by a real
 * SpeechSynthesisUtterance `onboundary` event's `charIndex`) onto the
 * 0-based word index (among 'word'-kind tokens) that character falls
 * inside. A `charIndex` landing in a whitespace gap, before the first word,
 * or past the end of the text clamps to the nearest word rather than
 * returning something out of range.
 */
export function spokenCharIndexToWordIndex(spokenText: string, charIndex: number): number {
  const tokens = tokenizeWords(spokenText)
  let cursor = 0
  let lastWordIndex = 0
  for (const token of tokens) {
    const start = cursor
    const end = cursor + token.text.length
    // Once we've walked past charIndex, stop — otherwise a later word would
    // keep overwriting lastWordIndex, and a charIndex landing in a
    // whitespace gap (which never matches the `charIndex < end` check
    // below) would incorrectly resolve to the LAST word in the text
    // instead of the word immediately preceding the gap.
    if (start > charIndex) break
    if (token.kind === 'word') {
      lastWordIndex = token.wordIndex as number
      if (charIndex >= start && charIndex < end) return lastWordIndex
    }
    cursor = end
  }
  return lastWordIndex
}
