/**
 * K5 — Verifier rules (RS §9.2, 15 codes).
 *
 * Each rule is a pure function `(text, ctx) => Violation | null`. The
 * verifier composes them; ordering is stable and documented.
 *
 * Text pre-processing: code fences (```...```) are excluded from all
 * scans — a Python snippet may legitimately contain `?` or `calculate`.
 * The RS's `repliesWithQuestion` uses the same excision; K5 reuses that
 * helper via kernel/conversationState.
 */
import { repliesWithQuestion } from '@/lib/teaching/conversationState'
import type { VerifierContext, Violation } from './types'
import { CAPABILITY_DEMAND_PATTERNS } from '@/lib/teaching/capabilityModel'
import {
  CALCULATION_DEMAND_PATTERNS, FORMULA_PATTERNS, IPA_PATTERNS,
  HYPERBOLIC_PRAISE_PATTERNS, ASSESSMENT_RESULT_PATTERN,
  LESSON_COMPLETE_PATTERN, BRACKET_TAG_PATTERN, DEFAULT_LEGAL_TAGS,
  IMPERATIVE_TASK_PATTERNS, CONCEPT_TERM_SEED, TECHNICAL_TERM_SEED,
  CLOSE_NEW_CONTENT_PATTERNS,
} from './lexicons'
import {
  normalizeForComparison, detectExactDuplicate, detectNearDuplicate,
  detectDuplicateQuestion, detectRepeatedRecoveryScript, detectPhaseOscillation,
  DEFAULT_SIMILARITY_THRESHOLD, type TurnHistory,
} from './history'

/** Excise ```code``` blocks; scans run on the remainder. Pure. */
export function withoutCodeFences(text: string): string {
  return text.replace(/```[\s\S]*?```/g, '')
}

/** Paragraph = a blank-line-separated block. Code blocks count as one. */
export function paragraphCount(text: string): number {
  const trimmed = text.trim()
  if (trimmed === '') return 0
  const parts = trimmed.split(/\n\s*\n+/).filter((p) => p.trim().length > 0)
  return parts.length
}

/** Count question-shaped moves. Question marks OUTSIDE code fences +
 *  imperative-task patterns (ISS-11 remediation). */
export function questionCount(text: string): number {
  const clean = withoutCodeFences(text)
  const marks = (clean.match(/[?？؟]/g) ?? []).length
  const imperatives = IMPERATIVE_TASK_PATTERNS.reduce(
    (n, re) => n + (clean.match(new RegExp(re.source, re.flags.includes('g') ? re.flags : re.flags + 'g')) ?? []).length,
    0,
  )
  return marks + imperatives
}

function match(re: RegExp, text: string): string | null {
  const m = re.exec(text)
  return m ? m[0].slice(0, 80) : null
}

// ── V-Q1 · question count > budget ──────────────────────────────────────────
export function vQ1(text: string, ctx: VerifierContext): Violation | null {
  const q = questionCount(text)
  if (q > ctx.budgets.maxQuestions) {
    return { code: 'V-Q1', severity: 'REJECT', matched: `${q} question(s)`,
             detail: `budget=${ctx.budgets.maxQuestions}` }
  }
  return null
}

// ── V-Q2 · non-ASK move ending in a question ────────────────────────────────
export function vQ2(text: string, ctx: VerifierContext): Violation | null {
  const nonAsk = ctx.move === 'TEACH' || ctx.move === 'SHOW' ||
                 ctx.move === 'RECOVER' || ctx.move === 'CLOSE'
  if (!nonAsk) return null
  const clean = withoutCodeFences(text).trim()
  if (clean.length === 0) return null
  // Does the final sentence end with a question mark?
  if (/[?？؟]\s*$/.test(clean)) {
    return { code: 'V-Q2', severity: 'REJECT', matched: clean.slice(-60),
             detail: `move=${ctx.move} must not end in a question` }
  }
  return null
}

// ── V-STAGE · calculation demand while ceiling < 6 ──────────────────────────
export function vStage(text: string, ctx: VerifierContext): Violation | null {
  if (ctx.stageCeiling >= 6) return null
  const clean = withoutCodeFences(text)
  for (const re of CALCULATION_DEMAND_PATTERNS) {
    const m = match(re, clean)
    if (m) return { code: 'V-STAGE', severity: 'REJECT', matched: m,
                    detail: `stageCeiling=${ctx.stageCeiling} < 6` }
  }
  return null
}

// ── V-VOC-NAME · concept term before NAME gate ─────────────────────────────
export function vVocName(text: string, ctx: VerifierContext): Violation | null {
  if (ctx.vocabularyUnlocked) return null
  const clean = withoutCodeFences(text).toLowerCase()
  const banned = ctx.bannedConceptTerms.length > 0 ? ctx.bannedConceptTerms : CONCEPT_TERM_SEED
  for (const term of banned) {
    const t = term.toLowerCase()
    // Word-boundary match; escape any special regex chars in the term.
    const escaped = t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    if (new RegExp(`\\b${escaped}\\b`).test(clean)) {
      return { code: 'V-VOC-NAME', severity: 'REJECT', matched: term,
               detail: 'vocabularyUnlocked=false' }
    }
  }
  return null
}

// ── V-VOC-FORMULA · formula before FORMALIZE ────────────────────────────────
export function vVocFormula(text: string, ctx: VerifierContext): Violation | null {
  if (ctx.formulaUnlocked) return null
  const clean = withoutCodeFences(text)
  for (const re of FORMULA_PATTERNS) {
    const m = match(re, clean)
    if (m) return { code: 'V-VOC-FORMULA', severity: 'REJECT', matched: m,
                    detail: 'formulaUnlocked=false' }
  }
  return null
}

// ── V-VOC-REG · register-banned tokens ──────────────────────────────────────
export function vVocReg(text: string, ctx: VerifierContext): Violation | null {
  const clean = withoutCodeFences(text)
  // Explicit bans from the pack (per-turn vocabularyBans).
  for (const term of ctx.vocabularyBans) {
    const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    if (new RegExp(`\\b${escaped}\\b`, 'i').test(clean)) {
      return { code: 'V-VOC-REG', severity: 'REJECT', matched: term,
               detail: 'explicit pack ban' }
    }
  }
  // Beginner + IPA notation.
  if (ctx.contentRegister === 'beginner') {
    for (const re of IPA_PATTERNS) {
      const m = match(re, clean)
      if (m) return { code: 'V-VOC-REG', severity: 'REJECT', matched: m,
                      detail: 'IPA at beginner register' }
    }
  }
  return null
}

// ── V-TERMS · too many new technical terms this response ────────────────────
export function vTerms(text: string, ctx: VerifierContext): Violation | null {
  const clean = withoutCodeFences(text).toLowerCase()
  const introduced = new Set<string>()
  for (const term of TECHNICAL_TERM_SEED) {
    const escaped = term.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    if (new RegExp(`\\b${escaped}\\b`).test(clean)) introduced.add(term)
  }
  if (introduced.size > ctx.budgets.maxNewTerms) {
    return { code: 'V-TERMS', severity: 'REJECT',
             matched: [...introduced].slice(0, 3).join(', '),
             detail: `introduced=${introduced.size} > budget=${ctx.budgets.maxNewTerms}` }
  }
  return null
}

// ── V-LEN · paragraph count > budget ────────────────────────────────────────
export function vLen(text: string, ctx: VerifierContext): Violation | null {
  if (ctx.budgets.maxParagraphs === null) return null
  const p = paragraphCount(text)
  if (p > ctx.budgets.maxParagraphs) {
    return { code: 'V-LEN', severity: 'REJECT',
             matched: `${p} paragraph(s)`,
             detail: `budget=${ctx.budgets.maxParagraphs}` }
  }
  return null
}

// ── V-CAP · demands an operation whose capability is NO ────────────────────
/**
 * Real as of the Capability Model milestone (was a stub returning null).
 *
 * Rejects a draft that asks the learner to PERFORM an operation their
 * capability state records as OBSERVED_NO or STATED_NO. Demand patterns are
 * imported from capabilityModel — the single owner of capability semantics —
 * so the verifier holds no second lexicon and cannot drift from the model.
 *
 * Matches the imperative form only. "Multiplication is repeated addition" is
 * legal teaching about an operation the learner cannot yet do; "multiply 6 by
 * 7" is a demand that they do it. That distinction is the whole rule: the
 * Brain may decide to TEACH a missing operation, and must never demand it.
 */
export function vCap(text: string, ctx: VerifierContext): Violation | null {
  if (!ctx.noCapabilities || ctx.noCapabilities.length === 0) return null
  const clean = withoutCodeFences(text)
  for (const id of ctx.noCapabilities) {
    const re = CAPABILITY_DEMAND_PATTERNS[id as keyof typeof CAPABILITY_DEMAND_PATTERNS]
    if (!re) continue
    const m = match(re, clean)
    if (m) {
      return { code: 'V-CAP', severity: 'REJECT', matched: m,
               detail: `capability '${id}' is NO for this learner` }
    }
  }
  return null
}

// ── V-REC · recovery turn contains a question or new content ───────────────
export function vRec(text: string, ctx: VerifierContext): Violation | null {
  if (ctx.move !== 'RECOVER') return null
  if (repliesWithQuestion(text)) {
    return { code: 'V-REC', severity: 'REJECT', matched: 'question in recovery',
             detail: 'recovery turns emit no questions' }
  }
  // New-content proxy: introducing any registered technical term during
  // recovery is banned.
  const clean = withoutCodeFences(text).toLowerCase()
  for (const term of TECHNICAL_TERM_SEED) {
    const escaped = term.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    if (new RegExp(`\\b${escaped}\\b`).test(clean)) {
      return { code: 'V-REC', severity: 'REJECT', matched: term,
               detail: 'new technical term during recovery' }
    }
  }
  return null
}

// ── V-ASSESS · [ASSESSMENT_RESULT ...] when not scoring ────────────────────
export function vAssess(text: string, ctx: VerifierContext): Violation | null {
  if (ctx.assessmentActive) return null
  const m = match(ASSESSMENT_RESULT_PATTERN, text)
  if (m) return { code: 'V-ASSESS', severity: 'REJECT', matched: m,
                  detail: 'assessment machine != SCORING/CONCLUDING' }
  return null
}

// ── V-TAG · non-whitelisted tag → STRIP (not reject) ───────────────────────
export function vTag(text: string, ctx: VerifierContext): Violation | null {
  const legal = new Set(ctx.legalTags.length > 0 ? ctx.legalTags : DEFAULT_LEGAL_TAGS)
  BRACKET_TAG_PATTERN.lastIndex = 0
  let m: RegExpExecArray | null
  while ((m = BRACKET_TAG_PATTERN.exec(text)) !== null) {
    const first = m[1].split(/\s/)[0]
    if (!legal.has(first)) {
      return { code: 'V-TAG', severity: 'STRIP', matched: m[0].slice(0, 60),
               detail: 'unknown tag' }
    }
  }
  return null
}

/** Auto-repair for V-TAG: strip unknown bracket tags. Pure. */
export function stripUnknownTags(text: string, legalTagsIn: string[]): string {
  const legal = new Set(legalTagsIn.length > 0 ? legalTagsIn : DEFAULT_LEGAL_TAGS)
  return text.replace(BRACKET_TAG_PATTERN, (whole, inner: string) => {
    const first = inner.split(/\s/)[0]
    return legal.has(first) ? whole : ''
  })
}

// ── V-COMPLETE · [LESSON_COMPLETE] when not authorized ─────────────────────
export function vComplete(text: string, ctx: VerifierContext): Violation | null {
  if (ctx.lessonCompletionAuthorized) return null
  const m = match(LESSON_COMPLETE_PATTERN, text)
  if (m) return { code: 'V-COMPLETE', severity: 'REJECT', matched: m,
                  detail: 'lessonCompletionAuthorized=false' }
  return null
}

// ── V-PRAISE · hyperbolic praise during strained/flooded band ──────────────
export function vPraise(text: string, ctx: VerifierContext): Violation | null {
  if (ctx.affectBand === 'calm') return null    // gentle praise OK in calm
  const clean = withoutCodeFences(text)
  for (const re of HYPERBOLIC_PRAISE_PATTERNS) {
    const m = match(re, clean)
    if (m) return { code: 'V-PRAISE', severity: 'REJECT', matched: m,
                    detail: `banned praise under affectBand=${ctx.affectBand}` }
  }
  return null
}

// ── V-REACT · LOG-only in v1 ────────────────────────────────────────────────
export function vReact(text: string, ctx: VerifierContext): Violation | null {
  if (!ctx.reactMandated) return null
  // Heuristic: does the response reference ANY word from the learner
  // text (>3 chars, alphabetic)? Advisory — never rejects.
  const clean = withoutCodeFences(text).toLowerCase()
  const learnerWords = (ctx.learnerText || '').toLowerCase()
    .split(/[^a-z0-9']+/).filter((w) => w.length >= 4)
  const anyReferenced = learnerWords.some((w) => clean.includes(w))
  if (!anyReferenced && learnerWords.length > 0) {
    return { code: 'V-REACT', severity: 'LOG', matched: 'no learner-word overlap',
             detail: 'REACT mandated but response does not reference learner content' }
  }
  return null
}

// ── V-CLOSE · CLOSE move introduces new content ────────────────────────────
/**
 * RS I-14: "CLOSE contains no new content." The invariant is stated in the
 * spec and was enforced by no rule — §9.2's 15 codes have no CLOSE-specific
 * check, so a CLOSE turn that carried on teaching passed the gate as long as
 * it did not end in a question (V-Q2). Filed as a spec-bug candidate against
 * RS §9.2; implemented here as the 16th code.
 *
 * "New content" is read exactly as the other rules read it, reusing their
 * lexicons rather than inventing a third notion of novelty: introducing a
 * registered technical term, or demanding a calculation. A CLOSE turn should
 * be naming what was learned, forecasting next, and leaving one open loop —
 * none of which requires either.
 */
export function vClose(text: string, ctx: VerifierContext): Violation | null {
  if (ctx.move !== 'CLOSE') return null
  const clean = withoutCodeFences(text)
  for (const re of CALCULATION_DEMAND_PATTERNS) {
    const m = match(re, clean)
    if (m) return { code: 'V-CLOSE', severity: 'REJECT', matched: m,
                    detail: 'CLOSE must not demand work (RS I-14)' }
  }
  // Structural, subject-independent: a turn still introducing content.
  for (const re of CLOSE_NEW_CONTENT_PATTERNS) {
    const m = match(re, clean)
    if (m) return { code: 'V-CLOSE', severity: 'REJECT', matched: m,
                    detail: 'CLOSE is still introducing content (RS I-14)' }
  }
  // Term-based, where a lexicon exists. Pack-supplied concept terms first;
  // the seed list is a fallback and covers only three subjects.
  const lower = clean.toLowerCase()
  const terms = ctx.bannedConceptTerms.length > 0 ? ctx.bannedConceptTerms : TECHNICAL_TERM_SEED
  for (const term of terms) {
    const escaped = term.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    if (new RegExp(`\\b${escaped}\\b`).test(lower)) {
      return { code: 'V-CLOSE', severity: 'REJECT', matched: term,
               detail: 'new technical term during CLOSE (RS I-14)' }
    }
  }
  return null
}

// ── S1 (Runtime Redesign Mission Parts 3/4) — history-aware rules ──────────
//
// All five read ctx.turnHistory, which is optional: when the caller hasn't
// wired history yet, ctx.turnHistory is undefined and every rule below
// returns null immediately — byte-identical to pre-S1 behavior. This is the
// same additive-optionality convention this file already uses for
// ctx.noCapabilities (see vCap above).
//
// All five are LOG severity (types.ts SEVERITY table) until real-traffic
// false-positive rates are measured — never REJECT on an unvalidated
// threshold (design report §S7).

function emptyHistoryGuard(ctx: VerifierContext): TurnHistory | null {
  return ctx.turnHistory && ctx.turnHistory.turns ? ctx.turnHistory : null
}

// ── V-DUP-EXACT · byte-identical (normalized) to a recent turn ─────────────
export function vDupExact(text: string, ctx: VerifierContext): Violation | null {
  const history = emptyHistoryGuard(ctx)
  if (!history) return null
  const normalized = normalizeForComparison(withoutCodeFences(text))
  const result = detectExactDuplicate(normalized, history)
  if (result.isDuplicate) {
    return { code: 'V-DUP-EXACT', severity: 'LOG', matched: normalized.slice(0, 60),
             detail: `matches turn at ring index ${result.matchedIndex}` }
  }
  return null
}

// ── V-DUP-NEAR · near-duplicate of the immediately previous turn ──────────
export function vDupNear(text: string, ctx: VerifierContext): Violation | null {
  const history = emptyHistoryGuard(ctx)
  if (!history) return null
  const normalized = normalizeForComparison(withoutCodeFences(text))
  const tokens = new Set(normalized.split(' ').filter((w) => w.length > 0))
  const result = detectNearDuplicate(tokens, history, DEFAULT_SIMILARITY_THRESHOLD)
  if (result.isNearDuplicate) {
    return { code: 'V-DUP-NEAR', severity: 'LOG',
             matched: `similarity=${result.maxSimilarity.toFixed(2)}`,
             detail: `threshold=${DEFAULT_SIMILARITY_THRESHOLD}` }
  }
  return null
}

// ── V-DUP-QUESTION · near-duplicate question of a recent one ──────────────
export function vDupQuestion(text: string, ctx: VerifierContext): Violation | null {
  const history = emptyHistoryGuard(ctx)
  if (!history) return null
  const askedQuestion = repliesWithQuestion(text)
  if (!askedQuestion) return null
  const normalized = normalizeForComparison(withoutCodeFences(text))
  const tokens = new Set(normalized.split(' ').filter((w) => w.length > 0))
  const result = detectDuplicateQuestion(tokens, askedQuestion, history, DEFAULT_SIMILARITY_THRESHOLD)
  if (result.isNearDuplicate) {
    return { code: 'V-DUP-QUESTION', severity: 'LOG',
             matched: `similarity=${result.maxSimilarity.toFixed(2)}`,
             detail: `matches question at ring index ${result.matchedIndex}` }
  }
  return null
}

// ── V-REC-REPEAT · recovery script near-duplicates an earlier rung ────────
export function vRecRepeat(text: string, ctx: VerifierContext): Violation | null {
  const history = emptyHistoryGuard(ctx)
  if (!history) return null
  const recoveryKey = ctx.recoveryKey ?? null
  if (!recoveryKey) return null
  const normalized = normalizeForComparison(withoutCodeFences(text))
  const tokens = new Set(normalized.split(' ').filter((w) => w.length > 0))
  const result = detectRepeatedRecoveryScript(tokens, recoveryKey, history, DEFAULT_SIMILARITY_THRESHOLD)
  if (result.isNearDuplicate) {
    return { code: 'V-REC-REPEAT', severity: 'LOG',
             matched: `similarity=${result.maxSimilarity.toFixed(2)}`,
             detail: `recoveryKey=${recoveryKey} repeats rung at ring index ${result.matchedIndex}` }
  }
  return null
}

// ── V-OSCILLATE · phase sequence shows an A→B→A→B cycle ───────────────────
export function vOscillate(_text: string, ctx: VerifierContext): Violation | null {
  const history = emptyHistoryGuard(ctx)
  if (!history) return null
  const phaseAfter = ctx.phaseAfter ?? null
  const result = detectPhaseOscillation(phaseAfter, history)
  if (result.isOscillating && result.cycle) {
    return { code: 'V-OSCILLATE', severity: 'LOG',
             matched: `${result.cycle[0]}↔${result.cycle[1]}`,
             detail: 'phase sequence oscillated A→B→A→B over the last 4 turns' }
  }
  return null
}

/** Ordered rule set. Authorization gates (V-ASSESS, V-COMPLETE) run
 *  BEFORE V-TAG so an illegally-emitted control tag REJECTS rather
 *  than being quietly stripped. V-TAG then handles all remaining
 *  unknown tags via auto-repair. Everything after V-TAG scans the
 *  stripped text (a lingering unknown tag would otherwise contaminate
 *  V-LEN paragraph counts). */
export const RULES = [
  vAssess, vComplete,
  vTag,
  vQ1, vQ2, vStage, vVocName, vVocFormula, vVocReg,
  vTerms, vLen, vCap, vRec, vClose, vPraise, vReact,
  // S1 — history-aware, LOG severity (see block above). Ordered last: none
  // of them strip or reject, so their position cannot affect any earlier
  // rule's view of the text.
  vDupExact, vDupNear, vDupQuestion, vRecRepeat, vOscillate,
] as const
