/**
 * V-CONTRADICT — the tutor states a specific claim that contradicts a rule the
 * concept's own authored content states (owner-approved 2026-09-27: "authored-
 * claim check", LOG-only first).
 *
 * THE RECORDED SLIP. In the 2026-09-25 intent A/B the tutor twice told a
 * learner that the thermal ring closure of a 6π (hexatriene) system is
 * conrotatory. It is disrotatory. The authored Educational Brain entry states
 * the rule — educational-brain/concepts/chemistry/chem.org.pericyclic.md:
 *
 *   "Electrocyclic: 4n electrons → conrotatory (thermal), disrotatory
 *    (photochemical); 4n+2 electrons → disrotatory (thermal), conrotatory
 *    (photochemical)."
 *   "Cycloadditions: [4n+2] thermal = allowed; [4n] thermal = forbidden
 *    (allowed photochemically)."
 *
 * WHY NOT A TEXT DIFF AGAINST THE AUTHORED ENTRY. The entry states a CLASS
 * rule (4n+2 → disrotatory, thermal); the tutor states an INSTANCE (6π
 * hexatriene → conrotatory). A lexical comparison cannot know 6π is 4n+2, and
 * the table itself pairs "conrotatory" with "thermal" (for 4n), so the wrong
 * sentence looks consistent. Each check here therefore ENCODES one authored
 * rule, cites its source, and evaluates the tutor's instance against it.
 *
 * SCOPE, deliberately conservative — a check fires only when ONE sentence names
 * exactly one electron-count class, exactly one condition (thermal /
 * photochemical) and exactly one mode (conrotatory / disrotatory) or verdict
 * (allowed / forbidden), with no negation. Comparisons ("thermal is
 * disrotatory, photochemical is conrotatory") and anything ambiguous are
 * skipped: silence is the safe outcome for a checker whose job is to be right
 * when it speaks.
 *
 * LOG severity: it never rejects or rewrites a reply. Promotion to enforcement
 * is a separate owner decision once the logs show its precision on real
 * traffic — the same "measure in LOG before ENFORCE" discipline as S1/S2.
 */
import type { Violation } from './types'

type Cls = '4n' | '4n+2'
type Cond = 'thermal' | 'photochemical'

const THERMAL_RE = /\b(?:thermal(?:ly)?|heat(?:ed|ing)?|under\s+heat)\b|Δ/i
const PHOTO_RE = /\b(?:photochemical(?:ly)?|light|irradiat\w*|UV)\b|hν/i
const NEGATION_RE = /\b(?:not|never|isn'?t|aren'?t|rather\s+than|instead\s+of|unlike|as\s+opposed\s+to)\b|n't\b/i
/** The sentence reports someone else's (wrong) claim rather than asserting it —
 *  "if you call [2+2] thermally allowed…", "a common mistake is…". Measured on
 *  the authored corpus: the only two hits in 668k lines were misconception
 *  descriptions of exactly this shape. */
const ATTRIBUTED_RE = /\b(?:students?|learners?|if\s+you|you\s+(?:said|say|called|call|think|thought|claimed?|classif\w+|wrote)|misconceptions?|mistakes?|mistaken(?:ly)?|wrong(?:ly)?|incorrect(?:ly)?|error|confus\w+|classifies)\b/i

/** Named polyenes whose π-electron count is fixed. */
const NAMED_COUNT: ReadonlyArray<[RegExp, number]> = [
  [/\bbutadienes?\b/i, 4],
  [/\bhexatrienes?\b/i, 6],
  [/\boctatetraenes?\b/i, 8],
]

function electronClasses(s: string): Set<Cls> {
  const out = new Set<Cls>()
  if (/\b4n\s*\+\s*2\b/i.test(s)) out.add('4n+2')
  if (/\b4n\b(?!\s*\+)/i.test(s)) out.add('4n')
  for (const m of s.matchAll(/\b(\d{1,2})\s*(?:-\s*)?(?:π|pi)(?:\s*-?\s*electrons?)?(?![\w-]*bond)/gi)) {
    const n = Number(m[1])
    if (n >= 2 && n % 2 === 0) out.add(n % 4 === 0 ? '4n' : '4n+2')
  }
  for (const m of s.matchAll(/\b(\d{1,2})\s+electrons?\b/gi)) {
    const n = Number(m[1])
    if (n >= 2 && n % 2 === 0) out.add(n % 4 === 0 ? '4n' : '4n+2')
  }
  for (const [re, n] of NAMED_COUNT) if (re.test(s)) out.add(n % 4 === 0 ? '4n' : '4n+2')
  return out
}

function conditions(s: string): Set<Cond> {
  const out = new Set<Cond>()
  if (THERMAL_RE.test(s)) out.add('thermal')
  if (PHOTO_RE.test(s)) out.add('photochemical')
  return out
}

function sentences(text: string): string[] {
  return text
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .split(/(?<=[.!?;])\s+|\n+/)
    .map((x) => x.trim())
    .filter((x) => x.length > 0)
}

const one = <T>(set: Set<T>): T | null => (set.size === 1 ? [...set][0] : null)

/** Authored: 4n → con (thermal) / dis (photochemical); 4n+2 → dis (thermal) / con (photochemical). */
function electrocyclicExpected(cls: Cls, cond: Cond): 'conrotatory' | 'disrotatory' {
  if (cls === '4n') return cond === 'thermal' ? 'conrotatory' : 'disrotatory'
  return cond === 'thermal' ? 'disrotatory' : 'conrotatory'
}

function checkElectrocyclic(s: string): string | null {
  const modes = new Set<string>()
  if (/\bconrotatory\b/i.test(s)) modes.add('conrotatory')
  if (/\bdisrotatory\b/i.test(s)) modes.add('disrotatory')
  const mode = one(modes)
  if (!mode || NEGATION_RE.test(s) || ATTRIBUTED_RE.test(s)) return null
  const cls = one(electronClasses(s))
  const cond = one(conditions(s))
  if (!cls || !cond) return null
  const expected = electrocyclicExpected(cls, cond)
  return mode === expected ? null
    : `authored rule (chem.org.pericyclic): ${cls}-electron electrocyclic, ${cond} → ${expected}; the reply says ${mode}`
}

/** Authored: [4n+2] thermal = allowed; [4n] thermal = forbidden (allowed photochemically). */
function checkCycloaddition(s: string): string | null {
  const bracket = [...s.matchAll(/\[\s*(\d)\s*\+\s*(\d)\s*\]/g)]
  const totals = new Set<number>(bracket.map((m) => Number(m[1]) + Number(m[2])))
  if (/\bDiels[-\s–]Alder\b/i.test(s)) totals.add(6)
  const total = one(totals)
  if (total === null || total % 2 !== 0) return null
  const cls: Cls = total % 4 === 0 ? '4n' : '4n+2'
  const verdicts = new Set<string>()
  if (/\ballowed\b/i.test(s)) verdicts.add('allowed')
  if (/\bforbidden\b/i.test(s)) verdicts.add('forbidden')
  const verdict = one(verdicts)
  if (!verdict || NEGATION_RE.test(s) || ATTRIBUTED_RE.test(s)) return null
  const cond = one(conditions(s))
  if (!cond) return null
  // Only the cases the authored table states.
  const expected = cond === 'thermal' ? (cls === '4n+2' ? 'allowed' : 'forbidden')
    : cls === '4n' ? 'allowed' : null
  if (!expected || verdict === expected) return null
  return `authored rule (chem.org.pericyclic): ${cls} cycloaddition, ${cond} → ${expected}; the reply says ${verdict}`
}

const CHECKS: ReadonlyArray<(s: string) => string | null> = [checkElectrocyclic, checkCycloaddition]

/** The first authored-rule contradiction in the draft, or null. Pure. */
export function vContradict(text: string): Violation | null {
  for (const s of sentences(typeof text === 'string' ? text : '')) {
    for (const check of CHECKS) {
      const detail = check(s)
      if (detail) return { code: 'V-CONTRADICT', severity: 'LOG', matched: s.slice(0, 80), detail }
    }
  }
  return null
}
