/**
 * Concept index + deterministic resolver.
 *
 * Pure text matching only — no semantic/AI matching, no embeddings, no LLM,
 * no database. Every function here returns the same output for the same
 * input, forever.
 */

import {
  ExtractionMethod, METHOD_CONFIDENCE,
  type ConceptIndexEntry, type ConceptMatch,
} from './conceptUnderstanding'

// ── Normalization ─────────────────────────────────────────────────────────

/** Words that carry no identifying weight and must never match alone. */
const STOP_WORDS: ReadonlySet<string> = new Set([
  'a', 'an', 'the', 'of', 'in', 'on', 'and', 'or', 'to', 'for', 'with', 'is', 'are',
])

/**
 * Singularize a token. Deliberately conservative: only the three unambiguous
 * English patterns, so "gas" does not become "ga" and "physics" is left alone.
 */
export function singularize(token: string): string {
  if (token.length <= 3) return token
  if (/(ss|us|is)$/.test(token)) return token           // mass, radius, axis
  if (/ies$/.test(token)) return `${token.slice(0, -3)}y` // properties -> property
  if (/(ches|shes|xes|ses|zes)$/.test(token)) return token.slice(0, -2)
  if (/s$/.test(token)) return token.slice(0, -1)       // vectors -> vector
  return token
}

/**
 * Normalize free text to comparable tokens: lowercase, possessives stripped,
 * punctuation removed (including curly apostrophes and hyphens), whitespace
 * collapsed, each token singularized.
 */
export function normalizeToTokens(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[‘’ʼ]/g, "'")   // curly/modifier apostrophes -> ASCII
    .replace(/'s\b/g, '')                     // newton's -> newton
    .replace(/[^a-z0-9\s]+/g, ' ')            // drop remaining punctuation/hyphens
    .split(/\s+/)
    .filter(t => t.length > 0)
    .map(singularize)
}

/** Normalized comparison key for a phrase, stop words removed. */
export function normalizeKey(text: string): string {
  return normalizeToTokens(text).filter(t => !STOP_WORDS.has(t)).join(' ')
}

/**
 * Acronym for a multi-word title: initials of the significant words.
 * Returns null when the title yields fewer than 2 significant words or an
 * acronym shorter than 2 characters.
 */
export function deriveAcronym(title: string): string | null {
  const words = normalizeToTokens(title).filter(t => !STOP_WORDS.has(t))
  if (words.length < 2) return null
  const acronym = words.map(w => w[0]).join('').toUpperCase()
  return acronym.length >= 2 ? acronym : null
}

// ── Index construction ────────────────────────────────────────────────────

/**
 * A small, hand-maintained alias table for surface forms no normalization
 * rule could derive (formulas, common short names). Deliberately tiny and
 * explicit — this is data, not inference.
 */
export const CONCEPT_ALIASES: Readonly<Record<string, readonly string[]>> = {
  'phys.mech.newtons-second-law': ['f=ma', 'f = ma', 'second law of motion', 'newtons 2nd law'],
  'phys.mech.newtons-first-law': ['law of inertia', 'first law of motion', 'newtons 1st law'],
  'phys.mech.newtons-third-law': ['third law of motion', 'newtons 3rd law', 'action reaction'],
  'phys.therm.calorimetry': ['heat measurement'],
  'phys.mech.kinetic-energy': ['ke'],
  'phys.mech.potential-energy': ['pe'],
  'math.arith.fractions': ['fraction'],
  'bio.mol.dna-replication': ['dna copying'],
}

/**
 * Build a searchable index from raw entries. Pure — this is the form used by
 * tests and by any caller that already has concept records in hand.
 */
export function buildConceptIndex(entries: readonly ConceptIndexEntry[]): readonly ConceptIndexEntry[] {
  return entries.map(e => ({
    ...e,
    aliases: [...(e.aliases ?? []), ...(CONCEPT_ALIASES[e.conceptId] ?? [])],
  }))
}

// ── Matching ──────────────────────────────────────────────────────────────

/** Does `needle` appear as a contiguous token run inside `haystack`? */
function containsTokenRun(haystack: readonly string[], needle: readonly string[]): boolean {
  if (needle.length === 0 || needle.length > haystack.length) return false
  for (let i = 0; i <= haystack.length - needle.length; i++) {
    let hit = true
    for (let j = 0; j < needle.length; j++) {
      if (haystack[i + j] !== needle[j]) { hit = false; break }
    }
    if (hit) return true
  }
  return false
}

/** Uppercase tokens in the ORIGINAL message — acronyms only match when the
 *  student actually wrote them in caps, which keeps "he" from matching. */
function uppercaseTokens(message: string): ReadonlySet<string> {
  return new Set(
    message.split(/[^A-Za-z0-9]+/).filter(t => t.length >= 2 && t === t.toUpperCase() && /[A-Z]/.test(t)),
  )
}

/**
 * Rank matches deterministically: confidence desc, then longer matched span
 * (more specific) desc, then conceptId asc as the final stable tie-break.
 */
export function rankMatches(matches: readonly ConceptMatch[]): readonly ConceptMatch[] {
  return [...matches].sort((a, b) =>
    b.confidence - a.confidence ||
    b.matchedTokenCount - a.matchedTokenCount ||
    a.conceptId.localeCompare(b.conceptId))
}

/**
 * Find every concept mentioned in `message`. At most one match per concept
 * (its strongest). Deterministic and side-effect free.
 */
export function resolveConceptMatches(
  message: string,
  index: readonly ConceptIndexEntry[],
): readonly ConceptMatch[] {
  const raw = message ?? ''
  if (raw.trim() === '') return []

  const messageTokens = normalizeToTokens(raw)
  const lowerRaw = raw.toLowerCase()
  const upperTokens = uppercaseTokens(raw)
  const out: ConceptMatch[] = []

  for (const entry of index) {
    const candidates: { method: ExtractionMethod; text: string; tokens: number }[] = []

    // 1. A literal concept id in the text — unambiguous by construction.
    if (lowerRaw.includes(entry.conceptId.toLowerCase())) {
      candidates.push({ method: ExtractionMethod.CONCEPT_ID, text: entry.conceptId, tokens: entry.conceptId.split('.').length })
    }

    // 2. Exact title (case-insensitive, punctuation intact).
    if (entry.title && lowerRaw.includes(entry.title.toLowerCase())) {
      candidates.push({ method: ExtractionMethod.EXACT_TITLE, text: entry.title, tokens: normalizeToTokens(entry.title).length })
    }

    // 3. Registered aliases.
    for (const alias of entry.aliases ?? []) {
      const aliasTokens = normalizeToTokens(alias)
      if (aliasTokens.length > 0 && containsTokenRun(messageTokens, aliasTokens)) {
        candidates.push({ method: ExtractionMethod.ALIAS, text: alias, tokens: aliasTokens.length })
      }
    }

    // 4. Normalized title — case, punctuation, possessives, plurals.
    const titleTokens = normalizeToTokens(entry.title)
    const significant = titleTokens.filter(t => !STOP_WORDS.has(t))
    if (significant.length > 0 && containsTokenRun(messageTokens, titleTokens)) {
      candidates.push({ method: ExtractionMethod.NORMALIZED_TITLE, text: entry.title, tokens: titleTokens.length })
    }

    // 5. Acronym, only when written in caps by the student.
    const acronym = deriveAcronym(entry.title)
    if (acronym && upperTokens.has(acronym)) {
      candidates.push({ method: ExtractionMethod.ACRONYM, text: acronym, tokens: 1 })
    }

    if (candidates.length === 0) continue
    // Keep this concept's single strongest piece of evidence.
    const best = candidates.reduce((a, b) =>
      METHOD_CONFIDENCE[b.method] > METHOD_CONFIDENCE[a.method] ? b : a)
    out.push({
      conceptId: entry.conceptId,
      title: entry.title,
      subject: entry.subject,
      method: best.method,
      confidence: METHOD_CONFIDENCE[best.method],
      matchedText: best.text,
      matchedTokenCount: best.tokens,
    })
  }

  return rankMatches(out)
}
