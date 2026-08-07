/**
 * Deterministic text derivation for the Educational Archetype Engine.
 *
 * Every label an archetype draws comes from the concept's own authored KG
 * `title` / `description` through these functions — never from the LLM, never
 * invented. Same input always yields byte-identical output, which is what makes
 * an archetype-generated figure inspectable and unit-testable.
 *
 * These helpers are intentionally conservative: when the source text does not
 * genuinely contain a sequence (or enough distinct terms), they return too
 * little rather than fabricating filler, and the calling archetype declines so
 * the resolver can try the next one. Producing a confident-looking diagram out
 * of nothing is worse than producing none.
 */

/** Collapse whitespace and trim. */
function tidy(s: string): string {
  return s.replace(/\s+/g, ' ').trim()
}

/** Clamp to `max` characters on a word boundary where possible. */
export function clamp(s: string, max: number): string {
  const t = tidy(s)
  if (t.length <= max) return t
  const cut = t.slice(0, max)
  const lastSpace = cut.lastIndexOf(' ')
  return (lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut).trim()
}

/** Sentence-case a fragment without destroying existing internal capitals. */
function sentenceCase(s: string): string {
  const t = tidy(s)
  if (!t) return t
  return t[0].toUpperCase() + t.slice(1)
}

/**
 * Split a description into ordered process steps.
 *
 * Recognises explicit sequence markers first (arrows, "then", numbered lists),
 * then falls back to sentence boundaries. Returns [] when fewer than two usable
 * steps exist — the signal for a process/flowchart/timeline archetype to
 * decline rather than draw a one-box "flowchart".
 */
export function extractSteps(description: string, maxSteps = 8): string[] {
  const text = tidy(description)
  if (!text) return []

  // Explicit sequence markers are strong evidence of a real process.
  const arrowSplit = text.split(/\s*(?:→|->|=>)\s*/)
  let parts: string[] = arrowSplit.length >= 2
    ? arrowSplit
    : text.split(/(?<=[.;])\s+|\s+then\s+/i)

  parts = parts
    .map((p) => p.replace(/^\s*\d+[.)]\s*/, ''))    // strip "1." / "2)" prefixes
    .map((p) => p.replace(/[.;,]\s*$/, ''))
    .map(tidy)
    .filter((p) => p.length >= 3)
    .map((p) => sentenceCase(clamp(p, 60)))          // process_flow title max = 60

  // De-duplicate while preserving order.
  const seen = new Set<string>()
  const out: string[] = []
  for (const p of parts) {
    const key = p.toLowerCase()
    if (seen.has(key)) continue
    seen.add(key)
    out.push(p)
    if (out.length >= maxSteps) break
  }
  return out.length >= 2 ? out : []
}

// Words that are never useful as a diagram label on their own.
const STOP_TERMS = new Set([
  'the', 'a', 'an', 'and', 'or', 'of', 'in', 'on', 'to', 'for', 'with', 'by',
  'is', 'are', 'was', 'were', 'be', 'being', 'been', 'as', 'at', 'from', 'that',
  'this', 'these', 'those', 'it', 'its', 'their', 'which', 'when', 'how', 'why',
  'concept', 'idea', 'study', 'understanding', 'introduction', 'basics', 'basic',
  'including', 'such', 'using', 'used', 'use', 'can', 'may', 'will', 'also',
])

/**
 * Pull short, distinct noun-ish phrases out of a concept's text, for use as
 * diagram labels. Deterministic and order-preserving.
 *
 * Returns fewer than `max` (possibly zero) when the source text is thin — the
 * caller decides whether that is enough to draw.
 */
export function extractKeyTerms(title: string, description: string, max = 6): string[] {
  const out: string[] = []
  const seen = new Set<string>()

  const push = (raw: string) => {
    const term = sentenceCase(clamp(raw.replace(/[^A-Za-z0-9 +\-/²³°]/g, ' '), 26))
    if (!term || term.length < 3) return
    const key = term.toLowerCase()
    if (seen.has(key)) return
    if (STOP_TERMS.has(key)) return
    seen.add(key)
    out.push(term)
  }

  // Comma / semicolon / conjunction separated fragments read as a list of parts.
  const fragments = tidy(description)
    .split(/[,;:]|\s+and\s+|\s+or\s+|\s+versus\s+|\s+vs\.?\s+/i)
    .map(tidy)
    .filter(Boolean)

  for (const frag of fragments) {
    // Prefer a short fragment wholesale; otherwise take its leading words.
    if (frag.length <= 26) push(frag)
    else push(frag.split(' ').slice(0, 3).join(' '))
    if (out.length >= max) break
  }

  // PASS 2 — compound sequences. Many concepts encode their own parts as a
  // hyphen/slash compound ("Subject-Verb-Object", "mass/energy"), which pass 1
  // sees as a single unsplittable fragment.
  if (out.length < 2) {
    const compound = `${title} ${description}`.match(/\b[A-Za-z]{3,}(?:[-/][A-Za-z]{3,}){1,4}\b/)
    if (compound) compound[0].split(/[-/]/).forEach(push)
  }

  // PASS 3 — significant words. A one-sentence description with no separators
  // still names the things it is about ("set", "subset", "element"). Taking
  // those in order yields honest, concept-specific labels rather than forcing
  // the concept down to text. Deterministic: no scoring, no inference.
  if (out.length < 2) {
    for (const w of tidy(description).split(/\s+/)) {
      const word = w.replace(/[^A-Za-z0-9-]/g, '')
      if (word.length < 4) continue
      if (STOP_TERMS.has(word.toLowerCase())) continue
      push(word)
      if (out.length >= max) break
    }
  }

  if (out.length === 0) push(title)
  return out.slice(0, max)
}

/**
 * The two things being contrasted, when a concept is genuinely comparative.
 * Returns null unless the text contains an explicit contrast marker — "vs",
 * "versus", "difference between X and Y", "compared to".
 */
export function extractComparisonPair(
  title: string,
  description: string,
): [string, string] | null {
  const haystack = `${title}. ${description}`
  const vs = haystack.match(
    /([A-Za-z][A-Za-z0-9 \-]{2,25}?)\s+(?:vs\.?|versus)\s+([A-Za-z][A-Za-z0-9 \-]{2,25})/i,
  )
  if (vs) return [sentenceCase(clamp(vs[1], 26)), sentenceCase(clamp(vs[2], 26))]

  const diff = haystack.match(
    /(?:difference|distinction|contrast)\s+between\s+([A-Za-z][A-Za-z0-9 \-]{2,25}?)\s+and\s+([A-Za-z][A-Za-z0-9 \-]{2,25})/i,
  )
  if (diff) return [sentenceCase(clamp(diff[1], 26)), sentenceCase(clamp(diff[2], 26))]

  return null
}

/** Case-insensitive whole-ish word test over a concept's title + description. */
export function mentions(haystack: string, needles: readonly string[]): boolean {
  const h = haystack.toLowerCase()
  return needles.some((n) => h.includes(n.toLowerCase()))
}
