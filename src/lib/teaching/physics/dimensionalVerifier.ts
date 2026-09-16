/**
 * DETERMINISTIC PHYSICS VERIFIER — the rule itself, Batch 3.
 *
 * Design: `docs/architecture/DETERMINISTIC_PHYSICS_VERIFIER_DESIGN.md` §5.2-
 * §5.6, §6 row 3 ("Shadow in both routes... Consume nothing. Repair
 * nothing. No DB write."). Batch 0 built the algebra/parser
 * (`./dimensions`); Batch 1 built the manufactured corpus
 * (`src/tests/support/physicsVerifierCorpus.ts`); Batch 2 populated
 * per-concept bindings for `phys.mech.*` (`./dimensionBindings`) and
 * verified equations directly against `analyzeEquation`. This file is
 * where `dimensionalViolation` — the actual three-gate rule §5.3/§5.4
 * describe — is built for the first time, and where it is wired into both
 * routes as a SHADOW: it computes and logs, it repairs nothing, it
 * rejects no turn, and nothing downstream reads its output yet (Batch 4).
 *
 * ── §5.1: WHY THIS IS NOT K5 ──────────────────────────────────────────────
 * K5's own recorded failure (`route.ts` L7955-7962) was reject-by-default
 * on a common shape ("ends in a question" rejects most good teaching
 * turns). This rule is abstain-by-default: `null` (pass) for anything it
 * cannot PROVE wrong — no binding, no extraction, an unbound symbol, no
 * assertion frame, a parse failure, or a dimensionally consistent
 * equation. Non-null only for a fully-bound, assertion-framed equation
 * with PROVABLY unequal dimensions on its two sides.
 *
 * ── THE THREE GATES (§5.3), ALL INVERTED-DEFAULT ────────────────────────────
 * GATE A — EXTRACTION. A conservative equation shape, never inside a code
 * fence or backtick span, never immediately preceded by ":". The symbol-
 * plausibility check below mirrors `scripts/physics/extractEquationCorpus.ts`'s
 * own `isPlausibleSymbol`/`isGenuineEquation` — re-implemented here, not
 * imported, because `src/lib` runtime code does not import from `scripts/`
 * (the reverse dependency direction this repo uses everywhere else). This
 * is the SAME conservatism, independently re-derived, not a shared module.
 *
 * GATE B — BINDING. Every symbol on both sides must appear in the target
 * concept's `ConceptDimensionBinding.symbols`. One unbound symbol ⇒
 * abstain, via `analyzeEquation` (Batch 0, unmodified) — never guessed.
 * Since only `phys.mech.*` concepts are bound (Batch 2), any other
 * concept's `binding` argument is simply `null` at the call site, and this
 * function's very first check makes that a total no-op.
 *
 * GATE C — ASSERTION FRAME. A WHITELIST, never a blacklist — this repo's
 * own documented exclusion-list trap (`DISCOURSE_NOUNS`, cited in the
 * design doc) is exactly what a blacklist here would repeat. An equation
 * is ASSERTED only if its sentence is a standalone display line, or the
 * equation is immediately preceded by "the formula is"/"we write"/"so", or
 * immediately followed by "tells us". Three explicit overrides pull an
 * otherwise-matching sentence back to NOT ASSERTED regardless: a question
 * mark anywhere in the sentence, the equation sitting inside quotation
 * marks, or an attribution verb ("writes"/"says"/"thinks"/"claims" and
 * their inflections) anywhere in the sentence — covering every Error
 * Analysis shape (§4.6) and Batch 1's own MUST_NOT_FIRE_CONTROLS fixture,
 * which is this gate's direct regression corpus.
 *
 * Gate A and Gate C are exported individually (`extractEquationCandidates`,
 * `isAssertedEquation`, `hasAssertedEquationFrame`) for the regression
 * suite, the same precedent `fieldLineSignGuard.ts` sets by exporting
 * `isInvertedFieldLineClaim`.
 *
 * ── TOTAL FUNCTION, NEVER THROWS (§5.4) ──────────────────────────────────
 * Every exported function that can fail returns a discriminated result or
 * `null`/`false`; the top-level pipeline is additionally wrapped in
 * try/catch as defense-in-depth, matching `dimensions.ts`'s own
 * `parseEquation` precedent — an observability/shadow layer must never be
 * the reason a turn breaks.
 *
 * ── NOT THIS BATCH ────────────────────────────────────────────────────────
 * No repair (§5.5 is Batch 5). No route decision changes. No DB write —
 * the 2026-08-31 egress incident is the standing reason no new per-turn
 * table is ever the answer to "measure this" (see `physicsDimTelemetry.ts`).
 * `dimensions.ts` and `dimensionBindings.ts` are read-only dependencies;
 * neither is modified here.
 */
import { analyzeEquation, dimensionsEqual, type Dimension } from './dimensions'
import type { ConceptDimensionBinding } from './dimensionBindings'

// ── Gate A: extraction ──────────────────────────────────────────────────

/**
 * Real physics symbols are 1-2 plain letters, a Greek letter, a
 * digit/subscript-decorated token, or a SHORT all-caps abbreviation — never
 * a longer plain-English word. Verbatim re-derivation of
 * `scripts/physics/extractEquationCorpus.ts`'s own rule (see that file's
 * header for the two false positives — "src", "min" — this rejects by
 * construction), not an import.
 */
function isPlausibleSymbol(lhs: string): boolean {
  const base = lhs.split('_')[0] ?? lhs
  if (base.length <= 2) return true
  if (/[Α-ωΔΣ]/.test(base)) return true
  if (/[0-9₀-₉]/.test(base)) return true
  if (base.length <= 4 && /^[A-Z]+$/.test(base)) return true
  return false
}

/** A bare numeric value ("0", "90°", "300 K") is a VALUE, not a relation
 *  between two physical quantities — see extractEquationCorpus.ts's own
 *  identical reasoning. */
const BARE_VALUE_RE = /^[-−+]?\d+(\.\d+)?\s*(°|%)?\s*[A-Za-zΩ°µ/²³·]{0,8}$/

function isGenuineEquationRhs(rhs: string): boolean {
  if (BARE_VALUE_RE.test(rhs)) return false
  return /[A-Za-zΑ-ω]/.test(rhs)
}

// Same shape as extractEquationCorpus.ts's CANDIDATE_RE, independently
// re-derived for this module (see file header).
const CANDIDATE_RE = /(?<![A-Za-zΑ-ω0-9_])([A-Za-zΑ-ωΣΔ][A-Za-zΑ-ω0-9_₀-₉]{0,15})\s*=\s*([^=,.;:?!""\n]{1,60})/g

export interface EquationCandidate {
  /** The candidate equation text, "LHS = RHS", trimmed. Never logged raw —
   *  see physicsDimTelemetry.ts's own PII discipline. */
  readonly text: string
  /** Offsets within the SENTENCE (not the whole draft) this candidate was
   *  found in — used by Gate C to test what surrounds the match. */
  readonly matchStart: number
  readonly matchEnd: number
}

/**
 * Gate A over a single sentence. Returns every equation-shaped candidate
 * that survives extraction — conservative shape, no code fence, no
 * backtick, no ":" immediately before it. Exported for the regression
 * suite (§4.1's two named false positives are pinned directly against
 * this function, not merely against the top-level rule).
 */
export function extractEquationCandidates(sentence: string): EquationCandidate[] {
  // "no code fence, no backticks" — a sentence carrying either is excluded
  // wholesale, never partially trusted.
  if (sentence.includes('```') || sentence.includes('`')) return []

  const out: EquationCandidate[] = []
  for (const m of sentence.matchAll(CANDIDATE_RE)) {
    const lhs = m[1]
    let rhs = m[2].trim()
    if (rhs.length === 0) continue
    // Trim a trailing em-dash clause, and a dangling unmatched trailing
    // paren — the same two normalizations extractEquationCorpus.ts applies,
    // kept simple here since this scans one generated sentence, not a
    // large mined corpus.
    rhs = rhs.replace(/\s*[—–]\s*.*$/, '').trim()
    const opens = (rhs.match(/\(/g) ?? []).length
    const closes = (rhs.match(/\)/g) ?? []).length
    if (closes > opens) rhs = rhs.replace(/\)+$/, '').trim()
    if (rhs.length === 0) continue

    if (!isPlausibleSymbol(lhs)) continue
    if (!isGenuineEquationRhs(rhs)) continue

    const matchStart = m.index ?? 0
    // "no ':' immediately before it" — skips whitespace, so "Mirror:
    // 1/v = ..." is excluded exactly as "label: value" shapes must be.
    const before = sentence.slice(0, matchStart).replace(/\s+$/, '')
    if (before.endsWith(':')) continue

    out.push({ text: `${lhs} = ${rhs}`, matchStart, matchEnd: matchStart + m[0].length })
  }
  return out
}

// ── Gate C: assertion frame ─────────────────────────────────────────────

const QUESTION_RE = /\?/
// "writes"/"writing"/"wrote" are unambiguous attribution regardless of
// subject. Bare "write" is genuinely ambiguous — it is BOTH the verb form
// "we write X = …" uses (whitelisted) AND the form "learners write X"/
// "students write X" uses (attribution, §4.6's own Error Analysis shape,
// and several of Batch 1's real MUST_NOT_FIRE_CONTROLS entries use exactly
// this plural-subject phrasing). A first draft blacklisted "writes?" (s
// optional) and, found by test, wrongly killed "we write" too. The fix:
// blacklist bare "write" UNLESS the immediately preceding word is "we" —
// the one subject the whitelist itself names.
const ATTRIBUTION_VERB_RE =
  /\b(?:writes|writing|wrote|says?|saying|said|thinks?|thinking|thought|claims?|claiming|claimed)\b|\b(?<!\bwe\s)write\b/i
// Tested against the text immediately BEFORE the candidate match.
const ASSERTED_PREFIX_RE = /(?:^|[.!?]\s+)(?:so|we\s+write|the\s+formula\s+is)\s*$/i
// Tested against the text immediately AFTER the candidate match.
const TELLS_US_SUFFIX_RE = /^\s*tells\s+us\b/i

/** True when there is an odd number of quote characters before `pos` — i.e.
 *  `pos` sits inside an open quotation. */
function isInsideQuotes(sentence: string, pos: number): boolean {
  const before = sentence.slice(0, pos)
  const count = (before.match(/["“”]/g) ?? []).length
  return count % 2 === 1
}

/**
 * Gate C over one already-extracted candidate. A WHITELIST: the default
 * answer is NOT ASSERTED. Exported for the regression suite, matching
 * `fieldLineSignGuard.ts`'s own `isInvertedFieldLineClaim` precedent.
 */
export function isAssertedEquation(sentence: string, candidate: EquationCandidate): boolean {
  // Three overrides that pull an otherwise-matching sentence back to NOT
  // ASSERTED — checked first, unconditionally, so no whitelist phrase can
  // out-argue them.
  if (QUESTION_RE.test(sentence)) return false
  if (ATTRIBUTION_VERB_RE.test(sentence)) return false
  if (isInsideQuotes(sentence, candidate.matchStart)) return false

  // A standalone display line: the whole sentence, trimmed of surrounding
  // whitespace and trailing sentence-ending punctuation, IS the equation.
  const trimmedSentence = sentence.trim().replace(/[.!?]+$/, '')
  if (trimmedSentence === candidate.text) return true

  const before = sentence.slice(0, candidate.matchStart)
  if (ASSERTED_PREFIX_RE.test(before)) return true

  const after = sentence.slice(candidate.matchEnd)
  if (TELLS_US_SUFFIX_RE.test(after)) return true

  return false
}

/**
 * Splits into sentences AND the whitespace between them — same technique
 * `fieldLineSignGuard.ts`'s own `sentencesWithGaps` uses (re-derived here
 * rather than imported, since that function is private to its module).
 * Even indices are content; odd indices are the original separators.
 */
function sentencesWithGaps(text: string): string[] {
  return text.split(/(?<=[.!?;])(\s+)/)
}

/**
 * Gate A + Gate C combined, over a whole draft: every equation candidate,
 * from every sentence, that is both extracted and asserted. Used by the
 * top-level rule (with Gate B/parsing layered on top) and directly by the
 * regression suite to test Gate A+C independent of any concept binding —
 * the property that matters for MUST_NOT_FIRE_CONTROLS, which must return
 * nothing here REGARDLESS of domain (§5.3's own framing for Gate C).
 */
export function extractAssertedEquations(draft: string): EquationCandidate[] {
  const sentences = sentencesWithGaps(draft)
  const out: EquationCandidate[] = []
  for (let i = 0; i < sentences.length; i += 2) {
    const sentence = sentences[i]
    for (const candidate of extractEquationCandidates(sentence)) {
      if (isAssertedEquation(sentence, candidate)) out.push(candidate)
    }
  }
  return out
}

/** True if `draft` contains at least one Gate-A+C-surviving equation,
 *  independent of any concept binding. */
export function hasAssertedEquationFrame(draft: string): boolean {
  return extractAssertedEquations(draft).length > 0
}

// ── The rule (§5.4) ──────────────────────────────────────────────────────

export interface DimensionalViolation {
  readonly conceptId: string
  /** Not logged raw by physicsDimTelemetry.ts — see its own PII discipline. */
  readonly equationText: string
  readonly lhsDimension: Dimension
  readonly rhsDimension: Dimension
}

/**
 * Which gate stopped classification, or how far it got. A diagnostic
 * summary for telemetry — never carries the equation text itself. The
 * value reported is the FURTHEST any candidate in the draft reached
 * through the pipeline (the flags accumulate across all candidates, not
 * just the first).
 */
export type PhysicsDimGate =
  | 'no-binding'
  | 'no-extraction'
  | 'no-assertion-frame'
  | 'parse-failure'
  | 'unbound-symbol'
  | 'consistent'
  | 'violation'

export interface PhysicsDimDiagnosis {
  readonly gate: PhysicsDimGate
  readonly violation: DimensionalViolation | null
}

/**
 * The full pipeline, TOTAL — never throws. Shared by `dimensionalViolation`
 * (the §5.4 rule) and `physicsDimTelemetry.ts` (the shadow log), so both
 * consume the identical classification rather than risking drift between
 * two re-derivations of the same three gates.
 */
export function diagnosePhysicsDim(
  draft: string,
  binding: ConceptDimensionBinding | null,
): PhysicsDimDiagnosis {
  try {
    if (!draft || !binding) return { gate: 'no-binding', violation: null }

    const sentences = sentencesWithGaps(draft)
    let sawCandidate = false
    let sawAssertedCandidate = false
    let sawParsedCandidate = false
    let sawBoundCandidate = false

    for (let i = 0; i < sentences.length; i += 2) {
      const sentence = sentences[i]
      const candidates = extractEquationCandidates(sentence)
      if (candidates.length > 0) sawCandidate = true

      for (const candidate of candidates) {
        if (!isAssertedEquation(sentence, candidate)) continue
        sawAssertedCandidate = true

        const analysis = analyzeEquation(candidate.text, binding.symbols)
        if (!analysis.parsed) continue
        sawParsedCandidate = true

        if (!analysis.lhs?.ok || !analysis.rhs?.ok) continue
        sawBoundCandidate = true

        if (dimensionsEqual(analysis.lhs.dimension, analysis.rhs.dimension)) continue

        return {
          gate: 'violation',
          violation: {
            conceptId: binding.conceptId,
            equationText: candidate.text,
            lhsDimension: analysis.lhs.dimension,
            rhsDimension: analysis.rhs.dimension,
          },
        }
      }
    }

    if (!sawCandidate) return { gate: 'no-extraction', violation: null }
    if (!sawAssertedCandidate) return { gate: 'no-assertion-frame', violation: null }
    if (!sawParsedCandidate) return { gate: 'parse-failure', violation: null }
    if (!sawBoundCandidate) return { gate: 'unbound-symbol', violation: null }
    return { gate: 'consistent', violation: null }
  } catch {
    // A shadow observability layer must never be the reason a turn
    // breaks — degrade to the safest classification, matching
    // dimensions.ts's own parseEquation defensive catch.
    return { gate: 'no-binding', violation: null }
  }
}

/**
 * A TOTAL function. Returns null (PASS) for everything it cannot prove
 * wrong. Non-null only when a fully-bound, assertion-framed equation has
 * provably unequal dimensions on its two sides (§5.4, verbatim).
 */
export function dimensionalViolation(
  draft: string,
  binding: ConceptDimensionBinding | null,
): DimensionalViolation | null {
  return diagnosePhysicsDim(draft, binding).violation
}
