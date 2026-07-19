/**
 * IPA (International Phonetic Alphabet) → speakable-approximation converter.
 *
 * Root cause this fixes (Lesson Flow sprint, item 6): src/lib/tts-cleaner.ts
 * used to call stripIpaNotation() unconditionally, DELETING every /.../
 * transcription before it ever reached the speech engine — a phonics lesson
 * teaching /kæt/ produced silence where "cat" should have been spoken. The
 * requirement is the opposite of stripping: speak the phonemes as closely as
 * a plain-text speech engine can approximate them.
 *
 * The Web Speech API (and most TTS backends this app calls) has no phoneme
 * input mode — there is no way to hand it "/kæt/" and get an exact IPA
 * realization. What IS possible, and is what this module does, is transliterate
 * each IPA symbol to the closest ordinary-letter spelling a general-purpose
 * English voice will pronounce close to correctly — the same technique
 * dictionaries use for a "pronunciation guide" line. This is a real,
 * substantive improvement over silence, not a perfect phonetic renderer.
 *
 * Scope: only text inside /.../ spans (the conventional IPA transcription
 * delimiter, and the only thing the previous stripper targeted) is converted.
 * Stress marks (ˈ primary, ˌ secondary) and the length mark (ː) carry no
 * segmental sound a plain-letter approximation can represent, so they are
 * dropped — that is not "stripping content," it is the same simplification
 * a phonetic respelling guide makes.
 */

// Longest-symbol-first so multi-character IPA sequences (affricates,
// diphthongs, r-colored vowels) match before their single-character
// components would.
// NOTE: the length mark (ː) and stress marks are stripped BEFORE this table
// is matched against (see PROSODY_MARKS below) — so no table entry may
// include 'ː'; a "long vowel" and its short counterpart necessarily collapse
// to the same entry (e.g. both iː and ɪ-adjacent /i/ inputs land on "ee"/"i"
// respectively via the bare-symbol entries below, not a digraph with ː).
const IPA_TO_APPROX_RAW: [string, string][] = [
  // Affricates
  ['tʃ', 'ch'], ['dʒ', 'j'],
  // R-colored vowels (ː already stripped by the time these match)
  ['ɜr', 'ur'], ['ɜ', 'er'], ['ɝ', 'ur'], ['ɚ', 'er'],
  ['ɪr', 'eer'], ['ɛr', 'air'], ['ɔr', 'or'], ['ɑr', 'ar'], ['ʊr', 'oor'],
  // Diphthongs
  ['eɪ', 'ay'], ['aɪ', 'eye'], ['ɔɪ', 'oy'], ['aʊ', 'ow'], ['oʊ', 'oh'],
  ['ɪə', 'eer'], ['eə', 'air'], ['ʊə', 'oor'],
  // Vowels (long/short collapse to one entry since the length mark is gone)
  ['i', 'ee'], ['u', 'oo'], ['ɑ', 'ah'], ['ɔ', 'aw'],
  ['æ', 'a'], ['ʌ', 'uh'], ['ɒ', 'o'], ['ɪ', 'i'], ['ʊ', 'oo'], ['ə', 'uh'], ['e', 'e'],
  // Consonants with no plain-letter equivalent
  ['θ', 'th'], ['ð', 'th'], ['ʃ', 'sh'], ['ʒ', 'zh'], ['ŋ', 'ng'],
  ['j', 'y'], ['ɹ', 'r'], ['ɾ', 't'], ['ʔ', ''],
  // IPA script-g (U+0261, the standard IPA symbol for /g/) — visually close
  // to ASCII 'g' but a distinct codepoint; both map to plain 'g'.
  ['ɡ', 'g'],
  // Ordinary-letter consonants/vowels pass through unchanged — listed so the
  // table is the single source of truth an author can audit, not because
  // the substitution changes anything.
  ['p', 'p'], ['b', 'b'], ['t', 't'], ['d', 'd'], ['k', 'k'], ['g', 'g'],
  ['f', 'f'], ['v', 'v'], ['s', 's'], ['z', 'z'], ['h', 'h'],
  ['m', 'm'], ['n', 'n'], ['l', 'l'], ['w', 'w'], ['r', 'r'], ['o', 'o'], ['a', 'a'],
]

const IPA_TO_APPROX: [string, string][] = [...IPA_TO_APPROX_RAW].sort((a, b) => b[0].length - a[0].length)

// Stress and length marks carry prosody, not a segment a plain-letter
// approximation can represent — dropped, not "stripped content." Stripped
// BEFORE table matching so digraph entries never need to account for them.
const PROSODY_MARKS = /[ˈˌː.‿]/g

/**
 * Converts one IPA transcription (the content between a pair of slashes,
 * slashes not included) into an approximate, speakable plain-text spelling.
 * Word boundaries (spaces) are preserved so connected-speech transcriptions
 * like "aɪ æm ˈɡoʊɪŋ tə ðə stɔːr" become a naturally spaced phrase.
 */
export function ipaToApproximateSpeech(ipa: string): string {
  const words = ipa.split(/\s+/).filter(Boolean)
  const rendered = words.map((word) => {
    let out = ''
    let i = 0
    const clean = word.replace(PROSODY_MARKS, '')
    while (i < clean.length) {
      let matched = false
      for (const [symbol, approx] of IPA_TO_APPROX) {
        if (clean.startsWith(symbol, i)) {
          out += approx
          i += symbol.length
          matched = true
          break
        }
      }
      if (!matched) { out += clean[i]; i += 1 }
    }
    return out
  })
  return rendered.join(' ')
}

const SLASH_TRANSCRIPTION = /\/([^/\n]{1,60})\//g

/**
 * Replaces every /.../ IPA transcription in `text` with its speakable
 * approximation, in place — the slashes themselves are removed since the
 * content they delimited is now ordinary (speakable) text, not notation.
 * Non-IPA slash usage ("and/or", "3/4", "km/h") is left untouched by the
 * same detection this module shares with the stripper it replaces.
 */
export function speakifyIpaNotation(text: string): string {
  return text.replace(SLASH_TRANSCRIPTION, (full, inner: string) => {
    if (!looksLikeIpaSpan(inner)) return full
    const approx = ipaToApproximateSpeech(inner)
    return approx.trim() ? approx : full
  })
}

// Mirrors ipaSanitizer.ts's detection tiers (IPA-block characters, the
// ambiguous æ/ð/ŋ/θ set, or a single bare letter) so a genuine IPA span is
// recognized the same way here as it was before — only the OUTCOME changes
// (speak it, don't delete it).
const IPA_BLOCK_CHAR = /[ɐ-˿]/
const AMBIGUOUS_IPA_LETTER = /[æðŋθÆÐŊΘ]/
const SINGLE_LETTER_SPAN = /^[a-zA-Z]$/

function looksLikeIpaSpan(inner: string): boolean {
  return IPA_BLOCK_CHAR.test(inner) || AMBIGUOUS_IPA_LETTER.test(inner) || SINGLE_LETTER_SPAN.test(inner)
}
