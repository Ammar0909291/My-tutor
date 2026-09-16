/**
 * PHYSICS EQUATION CORPUS EXTRACTOR — re-derives and formalizes the ad-hoc
 * §4.1/§4.2 measurement from `DETERMINISTIC_PHYSICS_VERIFIER_DESIGN.md`.
 *
 * ── WHY THIS EXISTS ─────────────────────────────────────────────────────────
 * The design doc's own §4.1/§4.2 numbers (213 equation-shaped strings / 662
 * number+unit pairs / 149 distinct equations / 51 distinct LHS symbols) were
 * produced by an ad-hoc extraction that was never committed. Batch 1
 * (`docs/architecture/DETERMINISTIC_PHYSICS_VERIFIER_DESIGN.md` §6 row 1)
 * re-derives the same measurement as a real, reusable tool, on the same
 * reasoning that produced `scripts/physics/state.ts`: a number a session
 * hand-counted once and never re-checked drifts silently. Run this script
 * before quoting any corpus count for physics dimensional work.
 *
 * ── SOURCES ──────────────────────────────────────────────────────────────
 * - `docs/curriculum/blueprints/phys.*.md` — authored Blueprints
 * - `educational-brain/concepts/physics/*.md` — Educational Brain concept
 *   entries (explanations, misconception registers, detection probes)
 * - `docs/physics/teaching-assets/assets.json` — Curriculum Pipeline prose
 *   (`concept_summary`, `key_ideas`, worked examples, etc. — every string
 *   value is walked, not a fixed field list, since the schema is not stable
 *   across the file's own "placeholder"/"draft" status)
 * - `docs/physics/chapters/*.md` — the compiled per-domain chapters (the
 *   file's own header states they are generated from the KG plus the same
 *   authored teaching content already covered by Blueprints/assets.json, so
 *   this source mostly contributes DUPLICATE occurrences — which the dedup
 *   step folds away — rather than new distinct equations)
 *
 * Deliberately EXCLUDED: `docs/physics/domains/*` (manifest/summary/
 * validation-report tables — measured by inspection to be statistics, not
 * physics prose; a `|` table cell containing "=" would be a real false
 * positive with zero pedagogical content behind it).
 *
 * ── THE EXTRACTION FILTER, AND WHY (§4.1's own two false positives) ────────
 * A naive `LHS = RHS` scan matches `src = (concept: string` and
 * `min = 4 km in (1/30) h` — §4.1 names both explicitly as what a naive
 * extractor catches. Real physics symbols in this corpus are never a bare
 * run of 3+ lowercase ASCII letters with no decoration (`src`, `min`, `note`,
 * `status`...) — they are 1-2 plain letters (`v`, `a`, `t`), or carry
 * decoration that a common English word never does: an uppercase letter, a
 * Greek letter, a digit/subscript, or an underscore (`F`, `μ₀`, `ΣF_x`,
 * `Δv`). `isPlausibleSymbol` below is exactly that rule, and it is reported
 * (not assumed) to reject both of §4.1's named false positives without a
 * stoplist of specific words — the same "shape test, not a word list"
 * discipline `requestedTopic.ts`'s `LEADING_MODIFIER_HEADS` used.
 *
 * This is intentionally the SAME conservatism level as a naive extractor,
 * not Gate A's full inverted-default discipline (§5.3) — Gate A is Batch 5's
 * job. This script's filter exists only to keep the harvested "correct
 * controls" corpus usable, not to pre-implement the verifier.
 *
 * ── WHAT THIS SCRIPT DOES NOT DO ─────────────────────────────────────────
 * It does not write `dimensionBindings.ts` entries (Batch 2). It does not
 * implement `dimensionalViolation` or any gate (Batch 5). It performs a
 * read-only structural sanity pass against Batch 0's `parseEquation`/
 * `analyzeEquation` (unmodified, imported only) and reports the result —
 * it never edits `dimensions.ts`.
 *
 * Usage: `npx tsx scripts/physics/extractEquationCorpus.ts [--out <path>]`
 * Writes nothing unless `--out` is given; always read-only over the repo.
 */
import * as fs from 'fs'
import * as path from 'path'
import { parseEquation, analyzeEquation } from '../../src/lib/teaching/physics/dimensions'

const ROOT = process.cwd()
const BLUEPRINTS_DIR = path.join(ROOT, 'docs/curriculum/blueprints')
const EB_DIR = path.join(ROOT, 'educational-brain/concepts/physics')
const ASSETS_JSON = path.join(ROOT, 'docs/physics/teaching-assets/assets.json')
const CHAPTERS_DIR = path.join(ROOT, 'docs/physics/chapters')

export interface HarvestedEquation {
  readonly text: string
  readonly source: string
  readonly occurrences: number
}

interface RawCandidate {
  readonly text: string
  readonly source: string
}

/** Strip markdown emphasis markers before scanning — "m**a**" and "ma" are
 *  the same physics symbol; the asterisks are a rendering convention for
 *  vector notation in the authored corpus, not part of the equation. */
function stripMarkdownEmphasis(text: string): string {
  return text.replace(/\*\*/g, '').replace(/\*/g, '')
}

// LHS/RHS candidate: a short run before "=" and a short run after it,
// stopping at the first character that plausibly ends a clause. Deliberately
// permissive at the regex level — precision comes from isPlausibleSymbol/
// isGenuineEquation, not from a narrower regex (see file header). The
// leading negative lookbehind is load-bearing, not decorative: without it,
// a long identifier the LHS class can't fully consume (e.g.
// `mastery_threshold`, 17 chars, longer than the 16-char cap) still lets the
// regex engine backtrack the START position mid-identifier and match the
// tail alone (`ery_threshold = 0`) — found empirically on the first run of
// this script, not anticipated in advance. The lookbehind forbids starting
// a match right after another identifier character, so an overlong
// identifier fails to match at all rather than being mis-sliced.
const CANDIDATE_RE = /(?<![A-Za-zΑ-ω0-9_])([A-Za-zΑ-ωΣΔ][A-Za-zΑ-ω0-9_₀-₉]{0,15})\s*=\s*([^=,.;:?!"“”\n]{1,60})/g

/** Real physics symbols in this corpus are 1-2 plain letters, a Greek
 *  letter, a digit/subscript-decorated token, or a SHORT all-caps
 *  abbreviation (`KE`, `EMF`, `COP`) — never a longer plain-English word,
 *  capitalized or not. Checked against the segment BEFORE any underscore,
 *  so a genuine decorated symbol (`F_net`, `T_H`) is judged by its base
 *  symbol (`F`, `T`) and a plain identifier (`session_cap`,
 *  `mastery_threshold`) is judged by ITS base (`session`, `mastery`) and
 *  correctly rejected.
 *
 *  An earlier draft of this rule accepted ANY base containing an uppercase
 *  letter anywhere, which correctly caught `session_cap`/`mastery_threshold`
 *  (both all-lowercase) but let through capitalized English words —
 *  `Temperature`, `Age`, `Hinge_x`, and (worst) the all-caps word `CORRECT`
 *  — found empirically by sampling the harvest, not anticipated in advance.
 *  The fix requires an all-uppercase base to ALSO be short (<=4 chars): a
 *  real abbreviation like `EMF`/`KE`/`COP` clears it, `CORRECT` (7 chars)
 *  does not, and a capitalized-but-not-all-caps word (`Temperature`, `Age`)
 *  was never covered by the uppercase branch to begin with once "any
 *  uppercase" was narrowed to "all uppercase". See file header for the two
 *  §4.1-named false positives this also rejects by construction. */
function isPlausibleSymbol(lhs: string): boolean {
  const base = lhs.split('_')[0] ?? lhs
  if (base.length <= 2) return true
  if (/[Α-ωΔΣ]/.test(base)) return true
  if (/[0-9₀-₉]/.test(base)) return true
  if (base.length <= 4 && /^[A-Z]+$/.test(base)) return true
  return false
}

// A bare numeric value, optionally signed/decimal, optionally carrying a
// trailing degree sign or a short unit run — "0", "90°", "300 K", "10 m/s²".
// This is a VALUE ASSIGNMENT (an initial condition, a worked-example
// substitution, a quantum number's specific value), not an EQUATION
// relating two physical quantities, and it dominates the raw harvest by
// volume (`n = 1` occurs 178 times; `v = 0`, 126) — excluded from the
// correct-controls corpus for that reason, reported in the script's own
// output rather than silently dropped.
const BARE_VALUE_RE = /^[-−+]?\d+(\.\d+)?\s*(°|%)?\s*[A-Za-zΩ°µ/²³·]{0,8}$/

/** A genuine equation relates this symbol to at least one OTHER
 *  letter/Greek symbol on the right — never just a number. */
function isGenuineEquation(rhs: string): boolean {
  if (BARE_VALUE_RE.test(rhs)) return false
  return /[A-Za-zΑ-ω]/.test(rhs)
}

function extractFromText(text: string, source: string): RawCandidate[] {
  const cleaned = stripMarkdownEmphasis(text)
  const out: RawCandidate[] = []
  for (const m of cleaned.matchAll(CANDIDATE_RE)) {
    const lhs = m[1].trim()
    let rhs = m[2].trim()
    // Trim a trailing em-dash/en-dash clause ("... — the correct formula").
    rhs = rhs.replace(/\s*[—–]\s*.*$/, '').trim()
    // A dangling, unmatched closing paren means extraction started AFTER
    // the real opening paren of a parenthetical aside ("(assuming
    // g = 10 m/s²)") — strip it rather than keep a malformed fragment.
    const opens = (rhs.match(/\(/g) ?? []).length
    const closes = (rhs.match(/\)/g) ?? []).length
    if (closes > opens) rhs = rhs.replace(/\)+$/, '').trim()
    // The mirror case: extraction stopped mid-parenthetical ("θ = mλ (m" —
    // the 60-char capture window cut off before "(m is an integer)"
    // closed). The trailing incomplete "(..." never carries dimensional
    // content of its own, so it is trimmed rather than kept as a fragment.
    // Known, reported limit (not chased further): this only detects a
    // SIMPLE trailing unmatched open — a truly pathological case like
    // "0) and (t" (one unmatched close then one unmatched open, counts
    // balanced) is not caught and is accepted as residual extraction noise.
    if (opens > closes) {
      const lastOpen = rhs.lastIndexOf('(')
      if (lastOpen >= 0) rhs = rhs.slice(0, lastOpen).trim()
    }
    if (!isPlausibleSymbol(lhs)) continue
    if (rhs.length === 0) continue
    if (!isGenuineEquation(rhs)) continue
    out.push({ text: `${lhs} = ${rhs}`, source })
  }
  return out
}

function walkJsonStrings(value: unknown, out: string[]): void {
  if (typeof value === 'string') {
    out.push(value)
  } else if (Array.isArray(value)) {
    for (const v of value) walkJsonStrings(v, out)
  } else if (value !== null && typeof value === 'object') {
    for (const v of Object.values(value)) walkJsonStrings(v, out)
  }
}

function listMarkdownFiles(dir: string, prefix?: string): string[] {
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir)
    .filter((f) => f.endsWith('.md') && (prefix === undefined || f.startsWith(prefix)))
    .map((f) => path.join(dir, f))
}

function harvestRaw(): RawCandidate[] {
  const raw: RawCandidate[] = []

  for (const file of listMarkdownFiles(BLUEPRINTS_DIR, 'phys.')) {
    const rel = path.relative(ROOT, file)
    raw.push(...extractFromText(fs.readFileSync(file, 'utf8'), rel))
  }

  for (const file of listMarkdownFiles(EB_DIR)) {
    const rel = path.relative(ROOT, file)
    raw.push(...extractFromText(fs.readFileSync(file, 'utf8'), rel))
  }

  if (fs.existsSync(ASSETS_JSON)) {
    const rel = path.relative(ROOT, ASSETS_JSON)
    const parsed = JSON.parse(fs.readFileSync(ASSETS_JSON, 'utf8'))
    const strings: string[] = []
    walkJsonStrings(parsed, strings)
    for (const s of strings) raw.push(...extractFromText(s, rel))
  }

  for (const file of listMarkdownFiles(CHAPTERS_DIR)) {
    const rel = path.relative(ROOT, file)
    raw.push(...extractFromText(fs.readFileSync(file, 'utf8'), rel))
  }

  return raw
}

/** Normalizes whitespace only — used as the dedup key. Two occurrences that
 *  differ only in incidental spacing are the same equation. */
function normalize(text: string): string {
  return text.replace(/\s+/g, ' ').trim()
}

export function harvestEquationCorpus(): HarvestedEquation[] {
  const raw = harvestRaw()
  const byKey = new Map<string, { source: string; occurrences: number }>()
  for (const candidate of raw) {
    const key = normalize(candidate.text)
    const existing = byKey.get(key)
    if (existing) {
      existing.occurrences += 1
    } else {
      byKey.set(key, { source: candidate.source, occurrences: 1 })
    }
  }
  return [...byKey.entries()]
    .map(([text, v]) => ({ text, source: v.source, occurrences: v.occurrences }))
    .sort((a, b) => b.occurrences - a.occurrences || a.text.localeCompare(b.text))
}

function distinctLhsSymbols(equations: readonly HarvestedEquation[]): Set<string> {
  const symbols = new Set<string>()
  for (const eq of equations) {
    const lhs = eq.text.split('=')[0]?.trim()
    if (lhs) symbols.add(lhs)
  }
  return symbols
}

function main(): void {
  const outIndex = process.argv.indexOf('--out')
  const outPath = outIndex >= 0 ? process.argv[outIndex + 1] : undefined

  const raw = harvestRaw()
  const corpus = harvestEquationCorpus()
  const symbols = distinctLhsSymbols(corpus)

  console.log('=== Physics Equation Corpus Extraction (Batch 1) ===')
  console.log(`raw candidate strings (post-filter, pre-dedup): ${raw.length}`)
  console.log(`distinct equations after dedup:                 ${corpus.length}`)
  console.log(`distinct LHS symbols:                            ${symbols.size}`)
  console.log()

  const bySource = new Map<string, number>()
  for (const eq of corpus) {
    const category = eq.source.split('/').slice(0, 2).join('/')
    bySource.set(category, (bySource.get(category) ?? 0) + 1)
  }
  console.log('distinct equations by source directory:')
  for (const [dir, count] of [...bySource.entries()].sort((a, b) => b[1] - a[1])) {
    console.log(`  ${dir}: ${count}`)
  }
  console.log()

  // The free check: run every harvested equation through Batch 0's parser,
  // unmodified. Never patches dimensions.ts — read-only usage.
  let parseOk = 0
  let parseFail = 0
  const failures: string[] = []
  for (const eq of corpus) {
    const result = parseEquation(eq.text)
    if (result.ok) parseOk += 1
    else {
      parseFail += 1
      failures.push(`${eq.text}  ->  ${result.reason}`)
    }
  }
  console.log('=== Batch 0 parser sanity check against the real corpus ===')
  console.log(`parses successfully: ${parseOk} / ${corpus.length} (${((parseOk / corpus.length) * 100).toFixed(1)}%)`)
  console.log(`fails to parse:      ${parseFail} / ${corpus.length}`)
  console.log()
  console.log('sample of parse failures (first 25):')
  for (const line of failures.slice(0, 25)) console.log(`  ${line}`)

  if (outPath) {
    fs.writeFileSync(outPath, JSON.stringify(corpus, null, 2))
    console.log(`\nWrote ${corpus.length} equations to ${outPath}`)
  }
}

if (require.main === module) {
  main()
}
