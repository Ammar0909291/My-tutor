/**
 * K5 — Verifier lexicons (RS §9.2 term/pattern lists).
 *
 * Pack-supplied at runtime once C4 packs carry them; K5 v1 ships a
 * conservative English seed. RS §20 discipline: LOG-only for languages
 * without a shipped lexicon, so a Russian or Hindi turn is never
 * spuriously rejected by an English-only match.
 */

/** Calculation-demand patterns for V-STAGE (Stage-6 imperative asks).
 *  Matched only when stageCeiling < 6. */
export const CALCULATION_DEMAND_PATTERNS: RegExp[] = [
  /\bcalculate\b/i, /\bcompute\b/i, /\bsolve for\b/i,
  /\bfind the (value|answer|result|sum|product|difference|quotient)\b/i,
  /\bwhat (?:is|are) [0-9]+\s*[+\-*/×÷=]\s*/i,
  /\b[0-9]+\s*[+\-*/×÷]\s*[0-9]+\s*=\s*\?/,
  /\bevaluate\s+(?:the|this)?\s*(?:expression|equation)\b/i,
]

/** Formula/notation patterns for V-VOC-FORMULA (banned before FORMALIZE). */
export const FORMULA_PATTERNS: RegExp[] = [
  /\\frac\{/, /\\sqrt/, /\\sum/, /\\int/,
  /\b[a-zA-Z]\s*=\s*[a-zA-Z0-9]/,      // simple variable=expression
  /[√∫∑∏∞≈≠≤≥±×÷]/,                    // math glyphs
  /\bf\([a-z]\)/,                       // f(x) notation
  /\^\{?\d+/,                           // exponent
]

/** IPA / phonetic notation for V-VOC-REG at beginner. */
export const IPA_PATTERNS: RegExp[] = [
  /\/[əɪʊʌæɔɛθðʃʒŋɹʔ]+\//,             // slashed IPA
  /\[[əɪʊʌæɔɛθðʃʒŋɹʔ]+\]/,             // bracketed
]

/** Banned praise/mockery patterns per affect band (RS §9.2 V-PRAISE).
 *  MVP: enforce during recovery/strained states (matched energy law). */
export const HYPERBOLIC_PRAISE_PATTERNS: RegExp[] = [
  /\b(amazing|awesome|brilliant|genius|wonderful|fantastic|superstar)\b/i,
  /\b(you're|you are) (so |such )?(smart|clever|brilliant|amazing)\b/i,
  /🎉|🌟|🏆|💯/,
]

/** Assessment-result emission patterns (V-ASSESS). */
export const ASSESSMENT_RESULT_PATTERN =
  /\[ASSESSMENT_RESULT[^\]]*\]/i

/** Lesson-completion emission (V-COMPLETE). */
export const LESSON_COMPLETE_PATTERN = /\[LESSON_COMPLETE\]/i

/** Tag whitelist (V-TAG). Any bracketed tag not in this list is STRIPPED. */
export const DEFAULT_LEGAL_TAGS = [
  'VISUAL', 'HINT', 'LESSON_COMPLETE', 'ASSESSMENT_RESULT',
  'INLINE_PRACTICE', 'WE', 'LESSON',
] as const

/** Generic bracket-tag scanner: matches `[TAG ...]` or `[TAG]`. Used to
 *  detect tags the verifier does NOT know are legal (V-TAG). */
export const BRACKET_TAG_PATTERN = /\[([A-Z][A-Z_]*(?:\s[^\]]*)?)\]/g

/**
 * Detect if a message includes an imperative task masquerading as
 * teaching (ISS-11): an ASK-shaped demand that has no question mark.
 * These count as "questions" for V-Q1/V-Q2 accounting.
 */
export const IMPERATIVE_TASK_PATTERNS: RegExp[] = [
  /\b(try|compute|calculate|solve|write|tell me|say back|show me|list)\b\s+(what|how|why|when|where|which|that|the|it|a )/i,
  /\b(finish|complete)\s+(this|the|it)\b/i,
]

/** Concept-term seed banned before NAME. This is a PLACEHOLDER — the
 *  authoritative list arrives per-concept from CEKR/CS4 packs. */
export const CONCEPT_TERM_SEED = [
  'inertia', 'inertial frame', 'derivative', 'integral',
  'phoneme', 'grapheme', 'morpheme',
]

/** Registered technical-term seed for V-TERMS accounting. Very
 *  conservative in MVP; real per-subject registries land with SDK/CEKR. */
export const TECHNICAL_TERM_SEED = [
  'velocity', 'acceleration', 'momentum', 'force', 'mass',
  'inertia', 'newton', 'joule',
  'numerator', 'denominator', 'variable', 'equation', 'coefficient',
  'phoneme', 'grapheme', 'morpheme', 'syntax', 'phonology',
]
