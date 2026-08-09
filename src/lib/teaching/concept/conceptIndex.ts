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

/** A one-token concept title is admitted only in a message at or under this
 *  many normalized tokens. See the specificity floor in
 *  `resolveConceptMatches`. */
export const SINGLE_TOKEN_MATCH_MAX_MESSAGE_TOKENS = 25

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
 * The head of a KG title, i.e. the part before a gloss separator.
 *
 * Canonical KG titles frequently carry an explanatory suffix:
 *   "Newton's Second Law — F=ma"      -> "Newton's Second Law"
 *   "Newton's First Law — Inertia"    -> "Newton's First Law"
 * A learner writes the head, never the gloss, so requiring the whole title
 * made those concepts unmatchable. Splits on em/en dash, a spaced hyphen, or
 * a colon — all deterministic punctuation rules, not semantic matching.
 * Returns null when the title has no gloss.
 */
export function titleHead(title: string): string | null {
  const head = title.split(/\s+[—–]\s+|\s+-\s+|:\s+/)[0]?.trim()
  return head && head.length > 0 && head !== title.trim() ? head : null
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
  // Minimum 3 letters. Production evidence: a 2-letter acronym matched the
  // ordinary words "DO NOT" in a long message and resolved
  // "Damped Oscillations". SHM/RSA/GCD are unaffected.
  return acronym.length >= 3 ? acronym : null
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

// ── Compound titles ───────────────────────────────────────────────────────
//
// THE DEFECT THIS CLOSES (production, physics lesson "SI Units and
// Measurement"):
//
//   learner: "explain Viscosity diagram"
//   resolved: nothing
//
// The concept is phys.mech.viscosity, titled "Viscosity and Stokes' Law". Every
// match path above needs either the WHOLE title, an alias, or a title HEAD —
// and titleHead() only splits on a gloss separator (— – - :), which a
// conjunction is not. So the learner's own word for the concept could not
// reach it, the turn stayed on the lesson, and the authored figure was never
// requested. 341 of the 1,775 canonical titles are compound in exactly this
// way ("Surface Tension and Capillarity", "Total Internal Reflection and
// Critical Angle").
//
// The rule below is the narrowest thing that fixes the class, and it is NOT
// substring matching: a title is split on conjunctions only, and a conjunct is
// admitted ONLY when it names exactly one concept in the entire corpus.
//
//   • multi-word conjunct  -> admitted when exactly one concept owns it
//   • single-word conjunct -> admitted when the word occurs in exactly ONE
//     title in the whole corpus (document frequency 1)
//
// The single-word floor is what keeps ordinary topic vocabulary out. Measured
// against the live KGs: "viscosity" (df 1) and "capillarity" (df 1) are
// admitted; "energy" (df 19, from "Relativistic Momentum and Energy"),
// "addition" (df 10), "multiplication" (df 8) and "measurement" (df 3) are all
// rejected — each would otherwise have hijacked an unrelated request.
//
// Ranked at 0.8, below NORMALIZED_TITLE, so a concept whose FULL title is the
// phrase always wins: "reflection" still resolves to math.geom.reflection, not
// to the conjunct inside phys.opt.reflection.

/** Conjunction/list separators. Deliberately not a general phrase splitter. */
const TITLE_CONJUNCTION = /\s+and\s+|\s+or\s+|\s*&\s*|\s*,\s*|\s*\/\s*/i

/** Split a compound title into its conjuncts; empty when it is not compound. */
function titleConjuncts(title: string): string[] {
  const parts = title.split(TITLE_CONJUNCTION).map(p => p.trim()).filter(p => p.length > 0)
  return parts.length > 1 ? parts : []
}

/**
 * Derive each entry's unambiguous title conjuncts. Corpus-wide by
 * construction — the ambiguity test cannot be made per-entry, which is why
 * this lives in the index builder and not in the matcher.
 */
export function deriveTitleComponents(
  entries: readonly ConceptIndexEntry[],
): ReadonlyMap<string, readonly string[]> {
  // Document frequency: how many titles contain each significant token.
  const docFreq = new Map<string, number>()
  for (const e of entries) {
    for (const token of new Set(normalizeToTokens(e.title))) {
      docFreq.set(token, (docFreq.get(token) ?? 0) + 1)
    }
  }

  // Ownership: which concepts claim each conjunct.
  const owners = new Map<string, Set<string>>()
  const candidates = new Map<string, string[]>()
  for (const e of entries) {
    const fullKey = normalizeKey(e.title)
    for (const part of titleConjuncts(e.title)) {
      const key = normalizeKey(part)
      // A conjunct that normalizes away (stop words only) or that reproduces
      // the whole title carries no new reach.
      if (!key || key === fullKey) continue
      if (!owners.has(key)) owners.set(key, new Set())
      owners.get(key)!.add(e.conceptId)
      const list = candidates.get(e.conceptId) ?? []
      if (!list.includes(part)) list.push(part)
      candidates.set(e.conceptId, list)
    }
  }

  const out = new Map<string, readonly string[]>()
  for (const [conceptId, parts] of candidates) {
    const kept = parts.filter(part => {
      const key = normalizeKey(part)
      const claimants = owners.get(key)
      if (!claimants || claimants.size !== 1) return false      // ambiguous conjunct
      const tokens = normalizeToTokens(part).filter(t => !STOP_WORDS.has(t))
      if (tokens.length === 0) return false
      if (tokens.length === 1) return (docFreq.get(tokens[0]) ?? 0) === 1 // generic-word floor
      return true
    })
    if (kept.length > 0) out.set(conceptId, kept)
  }
  return out
}

/**
 * Build a searchable index from raw entries. Pure — this is the form used by
 * tests and by any caller that already has concept records in hand.
 */
export function buildConceptIndex(entries: readonly ConceptIndexEntry[]): readonly ConceptIndexEntry[] {
  const components = deriveTitleComponents(entries)
  return entries.map(e => ({
    ...e,
    aliases: [...(e.aliases ?? []), ...(CONCEPT_ALIASES[e.conceptId] ?? [])],
    components: [...(e.components ?? []), ...(components.get(e.conceptId) ?? [])],
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
 * (more specific) desc, then the lesson's own subject, then conceptId asc as
 * the final stable tie-break.
 *
 * `preferredSubject` is a RANKING signal only. It reorders equally-strong
 * matches so a chemistry lesson prefers a chemistry reading; it never removes
 * a concept, which is what let a chemistry lesson hide "vector" entirely.
 */
export function rankMatches(
  matches: readonly ConceptMatch[],
  preferredSubject?: string | null,
): readonly ConceptMatch[] {
  const preferred = (m: ConceptMatch) => (preferredSubject && m.subject === preferredSubject ? 0 : 1)
  return [...matches].sort((a, b) =>
    b.confidence - a.confidence ||
    b.matchedTokenCount - a.matchedTokenCount ||
    preferred(a) - preferred(b) ||
    a.conceptId.localeCompare(b.conceptId))
}

/**
 * Find every concept mentioned in `message`. At most one match per concept
 * (its strongest). Deterministic and side-effect free.
 */
export function resolveConceptMatches(
  message: string,
  index: readonly ConceptIndexEntry[],
  preferredSubject?: string | null,
): readonly ConceptMatch[] {
  const raw = message ?? ''
  if (raw.trim() === '') return []

  const messageTokens = normalizeToTokens(raw)
  const lowerRaw = raw.toLowerCase()
  const upperTokens = uppercaseTokens(raw)
  const out: ConceptMatch[] = []

  // SPECIFICITY FLOOR (production hardening).
  //
  // 213 canonical KG titles are a single word, and many are ordinary English:
  // Term, Field, Power, Work, Current, Set, Tree, Variable, Vector. Matching
  // those anywhere in a long message is noise, not a concept request — a
  // 3,459-character message produced 13 matches (Term, Field, Power, Tree,
  // Variable, …) none of which the learner had asked about.
  //
  // A learner asking about a concept says so briefly ("what is vector?",
  // "teach me vector with visualization"). So a ONE-TOKEN title is admitted
  // only in a short, focused message. Multi-token titles are unaffected at any
  // length, and an explicit concept id always matches. Deterministic, no
  // fuzzy/AI matching.
  const focusedMessage = messageTokens.length <= SINGLE_TOKEN_MATCH_MAX_MESSAGE_TOKENS

  for (const entry of index) {
    const candidates: { method: ExtractionMethod; text: string; tokens: number }[] = []

    // 1. A literal concept id in the text — unambiguous by construction.
    if (lowerRaw.includes(entry.conceptId.toLowerCase())) {
      candidates.push({ method: ExtractionMethod.CONCEPT_ID, text: entry.conceptId, tokens: entry.conceptId.split('.').length })
    }

    // 2. Exact title (case-insensitive), on TOKEN BOUNDARIES. A raw substring
    //    test also fired on fragments inside longer words.
    const exactTokens = normalizeToTokens(entry.title)
    if (entry.title
      && lowerRaw.includes(entry.title.toLowerCase())
      && containsTokenRun(messageTokens, exactTokens)
      && (exactTokens.length > 1 || focusedMessage)) {
      candidates.push({ method: ExtractionMethod.EXACT_TITLE, text: entry.title, tokens: exactTokens.length })
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
    if (significant.length > 0 && containsTokenRun(messageTokens, titleTokens)
      && (titleTokens.length > 1 || focusedMessage)) {
      candidates.push({ method: ExtractionMethod.NORMALIZED_TITLE, text: entry.title, tokens: titleTokens.length })
    }

    // 4b. The title's head, when the KG title carries a gloss suffix. The
    //     learner writes "Newton's Second Law", never "— F=ma".
    const head = titleHead(entry.title)
    if (head) {
      const headTokens = normalizeToTokens(head)
      if (headTokens.length > 0 && containsTokenRun(messageTokens, headTokens)
        && (headTokens.length > 1 || focusedMessage)) {
        candidates.push({ method: ExtractionMethod.NORMALIZED_TITLE, text: head, tokens: headTokens.length })
      }
    }

    // 4c. An unambiguous conjunct of a compound title ("Viscosity" inside
    //     "Viscosity and Stokes' Law"). Subject to the SAME specificity floor
    //     as a one-word title: admitted only in a short, focused message.
    for (const component of entry.components ?? []) {
      const componentTokens = normalizeToTokens(component)
      if (componentTokens.length === 0) continue
      if (!containsTokenRun(messageTokens, componentTokens)) continue
      if (componentTokens.length === 1 && !focusedMessage) continue
      candidates.push({
        method: ExtractionMethod.TITLE_COMPONENT,
        text: component,
        tokens: componentTokens.length,
      })
    }

    // 5. Acronym, only when written in caps by the student.
    const acronym = deriveAcronym(entry.title)
    if (acronym && upperTokens.has(acronym) && focusedMessage) {
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

  return rankMatches(out, preferredSubject)
}
