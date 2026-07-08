/**
 * Detects and removes IPA (International Phonetic Alphabet) notation from
 * AI-generated tutor text. Used to keep beginner-level responses in plain
 * language — IPA symbols confuse new learners and are frequently mispronounced
 * by TTS engines, which read them letter-by-letter or skip them entirely.
 *
 * Three detection tiers, all scoped to avoid false positives on ordinary
 * multilingual text and punctuation:
 *  1. Characters in the IPA Extensions / Spacing Modifier Letters Unicode
 *     blocks (U+0250-02FF) have no legitimate use in English/Russian/Hindi
 *     lesson prose — stripped unconditionally wherever they appear.
 *  2. A small set of Latin/Greek letters that ARE used for IPA (æ, ð, ŋ, θ)
 *     but also have other legitimate uses (loanwords, math angles) — only
 *     stripped when they appear inside a short "/.../ " transcription span,
 *     which is the conventional way IPA is written and is otherwise never
 *     produced by this app's prompts (dates, fractions, "and/or", "km/h"
 *     contain no such characters and are left untouched).
 *  3. A single plain-ASCII consonant wrapped in slashes, e.g. /b/, /k/, /t/
 *     — for consonants whose IPA symbol happens to be an ordinary letter,
 *     tier 1/2 can't tell it apart from anything else by character alone.
 *     Restricted to exactly one letter so real slash usage ("and/or",
 *     "he/she", "3/4", "10/12/2026", "km/h") never matches — none of those
 *     have a single letter standing alone between two slashes.
 */

const IPA_BLOCK_CHAR = /[ɐ-˿]/
const AMBIGUOUS_IPA_LETTER = /[æðŋθÆÐŊΘ]/
const SINGLE_LETTER_SPAN = /^[a-zA-Z]$/
const SLASH_SPAN = /\/([^/\n]{1,30})\//g

function looksLikeIpa(inner: string): boolean {
  return IPA_BLOCK_CHAR.test(inner) || AMBIGUOUS_IPA_LETTER.test(inner) || SINGLE_LETTER_SPAN.test(inner)
}

export function containsIpaNotation(text: string): boolean {
  if (IPA_BLOCK_CHAR.test(text)) return true
  SLASH_SPAN.lastIndex = 0
  let match: RegExpExecArray | null
  while ((match = SLASH_SPAN.exec(text))) {
    if (AMBIGUOUS_IPA_LETTER.test(match[1]) || SINGLE_LETTER_SPAN.test(match[1])) return true
  }
  return false
}

export function stripIpaNotation(text: string): string {
  let out = text

  // Remove whole "/.../ " transcription spans first (both unambiguous IPA
  // block characters and ambiguous letters), so a fully-delimited phonetic
  // transcription like /ʃ/, /æ/, or /kæt/ disappears as one clean unit
  // instead of leaving empty "//" behind.
  out = out.replace(SLASH_SPAN, (full, inner: string) => (looksLikeIpa(inner) ? '' : full))

  // Residual safety net: strip any bare IPA-block characters that weren't
  // inside a "/.../ " span (unambiguous — this block has no other use).
  out = out.replace(IPA_BLOCK_CHAR, '')

  // Tidy up whitespace/punctuation left behind by removed spans, without
  // touching normal spacing elsewhere.
  out = out
    .replace(/[ \t]{2,}/g, ' ')
    .replace(/[ \t]+([.,!?;:])/g, '$1')
    .replace(/\(\s*\)/g, '')
  return out
}
