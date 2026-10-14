/**
 * AUTHORED EXPLANATION TEXT, AS A LEARNER SHOULD READ IT.
 *
 * CHEM-003 (2026-10-05, chemistry real-learner run, provider=memory): the
 * authored explanation was served verbatim — "Phenol … LOOKS like an alcohol
 * but behaves dramatically differently, because the oxygen's lone pair can
 * DELOCALIZE … (resonance, connecting directly to the electronic effects
 * concept covered earlier) … STRONGER ACID … ORTHO/PARA-DIRECTING …".
 * The capitals are the author's emphasis for a reviewer, and "covered earlier"
 * / "connecting to the arenes reactivity concept" point at units the learner
 * may never have seen (77 such references in chemistrySeedAssets.ts alone).
 *
 * The asset bootstrap is create-only, so editing every entry would not reach
 * production; this runs on the text at serve time instead. Two rewrites only:
 *  - an ALL-CAPS emphasis word (4+ letters, or a short English function word)
 *    goes to lower case; acronyms, formulas, Roman numerals stay;
 *  - a cross-reference clause to another unit/concept is removed.
 * Nothing else in the text changes.
 *
 * Third rewrite (2026-10-14, chemistry real-learner QA, "Modern Periodic Law"): an electron configuration is authored
 * as plain digits — "[Ar]3d6 4s2" — and served as "…3d6 4s2", where the occupancy digit reads as part of the label
 * (3d-six-four-s-two) while the tutor's own replies in the same lesson wrote "3d⁶ 4s²". A subshell label (principal
 * number 1-7, then s/p/d/f) followed by 1-2 occupancy digits is shown with a superscript occupancy.
 */

const ACRONYMS = new Set([
  'HOMO', 'LUMO', 'VSEPR', 'CFSE', 'LFSE', 'NADH', 'NADPH', 'FADH', 'SATP', 'PTFE', 'HPLC', 'EDTA',
  'IUPAC', 'LCAO', 'HCFC', 'HDPE', 'LDPE', 'PETN', 'NIST', 'MSDS', 'BODMAS', 'PEMDAS',
  'HMBC', 'HSQC', 'HRMS', 'COSY', 'NOESY', 'DEPT', 'MALDI', 'ABAB', 'ABCABC', 'IUPAC',
])
/** Names the corpus writes in capitals for emphasis — shown as names, "BOYLE" -> "Boyle". */
const NAMES = new Set([
  'ARRHENIUS', 'AUFBAU', 'AVOGADRO', 'BAEYER', 'BEER', 'BORN', 'BOYLE', 'BROGLIE', 'CELSIUS', 'CHAPMAN', 'CHARLES',
  'CRAFTS', 'DEBYE', 'DOWNS', 'FARADAY', 'FRENKEL', 'FRIEDEL', 'GRAHAM', 'HALL', 'HASSELBALCH', 'HEISENBERG',
  'HENDERSON', 'HENRY', 'HESS', 'HOFF', 'HOFMANN', 'HUND', 'KNOEVENAGEL', 'LAMBERT', 'LEWIS', 'LONDON', 'LOWRY',
  'LUSSAC', 'MARKOVNIKOV', 'NATTA', 'NERNST', 'PAULI', 'PERKIN', 'RAOULT', 'REFORMATSKY', 'SANDMEYER', 'SCHOTTKY',
  'TOLLENS', 'TYNDALL', 'VILLIGER', 'WAALS', 'WALDEN', 'WILKINSON', 'WITTIG', 'ZAITSEV', 'ZIEGLER', 'HÜCKEL',
  'BRØNSTED', 'BRÖNSTED', 'DIELS', 'ALDER', 'GRIGNARD', 'CLAISEN', 'KOLBE', 'WURTZ', 'CANNIZZARO', 'MOSELEY',
  'CHATELIER', 'LANGMUIR', 'FREUNDLICH', 'SCHRÖDINGER', 'BOHR', 'KOHLRAUSCH', 'GIBBS', 'HELMHOLTZ', 'HABER',
  'OSTWALD', 'DALTON', 'KEKULÉ', 'FISCHER', 'WERNER', 'CLAPEYRON', 'CLAUSIUS', 'KELVIN', 'JOULE', 'HARDY',
  'SCHULZE', 'RUTHERFORD', 'MENDELEEV', 'PLANCK', 'GAY', 'HÉROULT', 'HUNDS', 'KOSSEL', 'MOND', 'SOLVAY', 'BOSCH',
])
/** A condensed formula written in capitals (COOH, RCHO, RCOOR) — never a word to lower. */
const FORMULA_RE = /^[CHONRSPX]+$/
const SHORT_EMPHASIS = new Set(['TWO', 'AND', 'NOT', 'ALL', 'ONE', 'ANY', 'BUT', 'ARE', 'CAN', 'HAS', 'ITS', 'OWN', 'THE', 'FEW', 'BOTH', 'NON', 'NOR', 'ALL', 'NOW', 'YET', 'TOO', 'OUT'])
const ROMAN_RE = /^[IVXLCDM]+$/

export function lowerEmphasis(text: string): string {
  return text.replace(/(?<![\p{L}\p{N}])\p{Lu}{3,}(?![\p{L}\p{N}])/gu, (w, offset: number, whole: string) => {
    if (ACRONYMS.has(w) || ROMAN_RE.test(w) || (FORMULA_RE.test(w) && w.length <= 6)) return w
    if (NAMES.has(w)) return w[0] + w.slice(1).toLowerCase()
    if (w.length < 4 && !SHORT_EMPHASIS.has(w)) return w
    // Part of a formula or a code ("ATP-ase", "SN2", "NaCl") — leave it.
    const prev = whole[offset - 1] ?? ''
    const next = whole[offset + w.length] ?? ''
    if (/[0-9]/.test(next) || /[0-9]/.test(prev)) return w
    // A sentence-initial capital stays capitalised ("FALSE — …" -> "False — …").
    const atSentenceStart = /(?:^|[.!?:]["”’']?\s+|\n\s*|["“'‘]\s*)$/.test(whole.slice(Math.max(0, offset - 4), offset)) || offset === 0
    const lower = w.toLowerCase()
    return atSentenceStart ? lower[0].toUpperCase() + lower.slice(1) : lower
  })
}

/** "covered earlier", "connecting (directly) to the X concept/unit", "(see the Y unit)". */
function dropCrossReferences(text: string): string {
  return text
    // a whole parenthetical that is only a pointer: "(covered earlier)", "(as covered earlier in the … unit)"
    .replace(/\s*\((?:as\s+)?(?:covered|discussed|introduced|seen)\s+(?:earlier|before|previously)[^()]*\)/gi, '')
    // ", connecting (directly) to the electronic effects concept covered earlier" inside a clause
    .replace(/,?\s*(?:connecting|linking|tying\s+back)\s+(?:directly\s+)?(?:back\s+)?to\s+the\s+[^,;:()—.]*?\b(?:concept|unit|topic|lesson)\b(?:\s+(?:covered|discussed|introduced|seen)\s+(?:earlier|before|previously)(?:\s+in\s+the\s+[^,;:()—.]*?\bunit\b)?)?/gi, '')
    // ", as covered earlier", " covered earlier in the atmosphere chemistry unit"
    .replace(/,?\s*(?:as\s+)?(?:covered|discussed|introduced)\s+(?:earlier|previously)(?:\s+in\s+the\s+[^,;:()—.]*?\b(?:unit|concept|lesson|topic)\b)?/gi, '')
    // a parenthetical left empty or with a dangling comma: "(resonance, )" -> "(resonance)"
    .replace(/\(\s*([^()]*?)[\s,;]+\)/g, (m, inner: string) => (inner.trim() ? `(${inner.trim()})` : ''))
    .replace(/\s*[—–-]\s*\)/g, ')')
    .replace(/\s*\((?:both|all|each|the [\w\s-]+ concepts?|[\w\s-]+ concept)\)/gi, '')
    .replace(/\(\s*\)/g, '')
    .replace(/[ \t]{2,}/g, ' ')
    .replace(/\s+([,.;:])/g, '$1')
}

const SUPERSCRIPT_DIGIT: Record<string, string> = { '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹' }

/**
 * "3d6 4s2" -> "3d⁶ 4s²", "[Ar]3d10" -> "[Ar]3d¹⁰". Only a whole token: it must not start inside a longer word or number ("A3d6",
 * "13d6"), and the occupancy is at most 2 digits (an s/p/d/f subshell holds at most 14). A bare label ("3d", "4s") is left alone.
 */
export function superscriptOrbitalOccupancy(text: string): string {
  return text.replace(/(?<![\p{L}\p{N}])([1-7][spdf])(\d{1,2})(?![\p{L}\p{N}])/gu, (_m, label: string, occ: string) =>
    label + [...occ].map((d) => SUPERSCRIPT_DIGIT[d]).join(''))
}

export function authoredProseForLearner(text: string): string {
  if (typeof text !== 'string' || !text) return text
  return superscriptOrbitalOccupancy(lowerEmphasis(dropCrossReferences(text)))
}
