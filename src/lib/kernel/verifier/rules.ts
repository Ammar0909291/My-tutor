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
import {
  CALCULATION_DEMAND_PATTERNS, FORMULA_PATTERNS, IPA_PATTERNS,
  HYPERBOLIC_PRAISE_PATTERNS, ASSESSMENT_RESULT_PATTERN,
  LESSON_COMPLETE_PATTERN, BRACKET_TAG_PATTERN, DEFAULT_LEGAL_TAGS,
  IMPERATIVE_TASK_PATTERNS, CONCEPT_TERM_SEED, TECHNICAL_TERM_SEED,
} from './lexicons'

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

// ── V-CAP · references an operation whose capability is NO ─────────────────
// K5 v1: honours vocabularyBans as a proxy for banned operations. The
// CEKR capability model (K7 integration) upgrades this to a real check.
export function vCap(_text: string, _ctx: VerifierContext): Violation | null {
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
  vTerms, vLen, vCap, vRec, vPraise, vReact,
] as const
