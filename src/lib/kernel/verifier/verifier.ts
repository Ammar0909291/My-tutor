/**
 * K5 — Output Verifier (RS §9 core).
 *
 * verify(text, ctx, attempt) → VerifyDecision. Pure. Deterministic.
 * No I/O. No randomness. Same input → identical output across runs
 * (RS T-4 replay determinism).
 *
 * Rejection protocol (RS §9.3): the verifier itself is single-pass.
 * The 2-attempt loop lives in `runVerifierLoop` (see loop.ts) so the
 * pure rule engine is independently testable.
 */
import type { VerifierContext, VerifyDecision, Violation } from './types'
import { RULES, stripUnknownTags } from './rules'

export function verify(text: string, ctx: VerifierContext, attempt: 1 | 2 = 1): VerifyDecision {
  const violations: Violation[] = []
  let workingText = text

  for (const rule of RULES) {
    const v = rule(workingText, ctx)
    if (!v) continue
    if (v.severity === 'STRIP') {
      // Auto-repair for V-TAG and any future STRIP rules; no reject.
      violations.push(v)
      if (v.code === 'V-TAG') {
        workingText = stripUnknownTags(workingText, ctx.legalTags)
      }
      continue
    }
    if (v.severity === 'LOG') {
      violations.push(v)          // observational — never rejects
      continue
    }
    // REJECT — first REJECT stops evaluation (RS §9.3: violations
    // appendix names one primary violation; more can be collected but
    // the loop treats any REJECT as reject-worthy).
    violations.push(v)
  }

  const rejectPresent = violations.some((v) => v.severity === 'REJECT')
  const strippedOnly = !rejectPresent && violations.some((v) => v.severity === 'STRIP')

  const resolution: VerifyDecision['resolution'] =
    rejectPresent ? 'rerender'
    : strippedOnly ? 'stripped'
    : 'accepted'

  return {
    verdict: rejectPresent ? 'REJECT' : 'PASS',
    violations,
    attempt,
    resolution,
    repairedText: workingText,
  }
}

/** Build the violation appendix the constrained re-render receives. */
export function buildViolationAppendix(violations: Violation[]): string {
  const rejectViolations = violations.filter((v) => v.severity === 'REJECT')
  if (rejectViolations.length === 0) return ''
  const lines = ['\n\nVERIFICATION VIOLATIONS — the previous attempt violated the following runtime rules. Repair every one:']
  for (const v of rejectViolations) {
    const matched = v.matched ? ` (matched: ${JSON.stringify(v.matched)})` : ''
    const detail = v.detail ? ` — ${v.detail}` : ''
    lines.push(`- ${v.code}${matched}${detail}`)
  }
  return lines.join('\n')
}
