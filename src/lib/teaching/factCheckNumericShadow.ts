/**
 * NUMERIC FACT-CHECK — STEP 3, PRODUCTION SHADOW (owner instruction
 * 2026-10-04: "Production shadow only — N1 + N2"). Observe what N1 (written
 * arithmetic) and N2 ("N times more") would flag on the served tutor reply,
 * and log it. Nothing else.
 *
 * Contract, enforced by construction and pinned by factCheckNumericShadow.test.ts:
 *  - Only `checkArithmetic` and `checkRatioClaims` are imported. N3
 *    (`checkAgainstAuthored`) and the `checkNumericClaims` aggregate are not
 *    reachable from here, whatever authored content exists (Step 2: N3
 *    precision 9.1 %, not approved).
 *  - Input is a string, output is a plain record: there is no way to hand back
 *    an edited reply, request a retry, or touch grading/mastery/progress.
 *  - The record carries tutor text and the concept id only — no learner text,
 *    no user/session id, no email.
 *  - There is no serve mode.
 *
 * EXPERIMENT CLOSED 2026-10-04 — NOT READY FOR ENFORCEMENT (owner). Production
 * precision 6.3 % (docs/qa/numeric-fact-check-step3/REPORT.md). The shadow is
 * OFF by default; it runs only if NUMERIC_FACT_CHECK_MODE=shadow is set
 * explicitly. N1/N2 enforcement and N3 are NOT APPROVED.
 */
import { checkArithmetic, checkRatioClaims, type NumericFlag } from './factCheckNumeric'

export type NumericShadowMode = 'off' | 'shadow'

export function numericFactCheckMode(): NumericShadowMode {
  return process.env.NUMERIC_FACT_CHECK_MODE?.trim().toLowerCase() === 'shadow' ? 'shadow' : 'off'
}

export interface NumericShadowFinding {
  detector: 'N1' | 'N2'
  type: 'arithmetic' | 'ratio'
  /** The number as the tutor wrote it. */
  claimed: string
  /** What the reply's own inputs give. */
  expected: string
  reason: string
  /** The tutor sentence (tutor text only), capped. */
  sentence: string
}

export interface NumericShadowRecord {
  detectors: 'N1+N2'
  conceptId: string | null
  at: string
  chars: number
  /** Descriptive only: "=" signs (with a digit present) and "N times more" phrases. */
  candidate: { equations: number; ratioPhrases: number }
  n1: number
  n2: number
  /** no-candidate = the reply has no digit at all. */
  outcome: 'flagged' | 'abstained' | 'no-candidate'
  findings: NumericShadowFinding[]
}

const RATIO_HINT = /[\d⁰¹²³⁴⁵⁶⁷⁸⁹]\s*(?:times|×|[-‑]fold)\s+(?:more|less|greater|larger|bigger|higher|lower|smaller|brighter|dimmer|faster|slower|stronger|weaker|longer|shorter|as)\b/gi

const toFinding = (f: NumericFlag): NumericShadowFinding => ({
  detector: f.kind === 'arithmetic' ? 'N1' : 'N2',
  type: f.kind === 'arithmetic' ? 'arithmetic' : 'ratio',
  claimed: f.claimed.slice(0, 60),
  expected: f.expected.slice(0, 120),
  reason: f.detail.slice(0, 240),
  sentence: f.sentence.slice(0, 240),
})

/** Run N1 + N2 over a served reply. Pure: reads the string, returns a record. */
export function numericShadowRecord(text: string, conceptId: string | null, now: Date = new Date()): NumericShadowRecord {
  const equations = /\d/.test(text) ? (text.match(/[=≈≃]/g) ?? []).length : 0
  const ratioPhrases = (text.match(RATIO_HINT) ?? []).length
  const base = { detectors: 'N1+N2' as const, conceptId, at: now.toISOString(), chars: text.length, candidate: { equations, ratioPhrases } }
  // N1 and N2 always run in full on any reply with a digit — the counts above
  // only describe the reply, they never narrow what the detectors see.
  if (!/\d/.test(text)) return { ...base, n1: 0, n2: 0, outcome: 'no-candidate', findings: [] }
  const n1 = checkArithmetic(text)
  const n2 = checkRatioClaims(text)
  const findings = [...n1, ...n2].slice(0, 4).map(toFinding)
  return { ...base, n1: n1.length, n2: n2.length, outcome: n1.length + n2.length > 0 ? 'flagged' : 'abstained', findings }
}
