/**
 * K5 — Verifier rejection loop (RS §9.3, normative).
 *
 * Exactly one constrained re-render on first REJECT; deterministic
 * template fallback on the second. NEVER a third LLM call. Every
 * violation emits an OutputRejected-shaped event via the recorder
 * callback (route.ts / evidence spine wires the sink).
 */
import type { VerifierContext, VerifyDecision, Violation } from './types'
import { verify, buildViolationAppendix } from './verifier'
import { chooseFallback, renderFallback, type FallbackKind } from './templateFallback'

/** Callable the loop uses to invoke the LLM on the first attempt AND
 *  the constrained re-render on the second. The caller MUST NOT vary
 *  temperature / seed / plan across the two attempts (RS §9.3.1). */
export interface RenderCallback {
  (violationAppendix: string): Promise<string>
}

export interface OutputEvent {
  kind: 'OutputRejected' | 'TemplateFallbackUsed' | 'RenderCompleted'
  attempt?: 1 | 2
  violations?: Violation[]
  fallback?: FallbackKind
  finalResolution?: VerifyDecision['resolution']
}

export interface LoopResult {
  finalText: string
  attempts: number
  usedTemplate: boolean
  fallbackUsed: FallbackKind | null
  decision: VerifyDecision
  events: OutputEvent[]
}

/** Drive the verifier through the two-attempt protocol. Total: never
 *  throws; template fallback guarantees a legal delivery. */
export async function runVerifierLoop(
  firstDraft: string,
  ctx: VerifierContext,
  render: RenderCallback,
  fallbackChain: string[],
  learnerText: string,
): Promise<LoopResult> {
  const events: OutputEvent[] = []

  // Attempt 1
  let decision = verify(firstDraft, ctx, 1)
  if (decision.verdict === 'PASS') {
    events.push({ kind: 'RenderCompleted', attempt: 1, finalResolution: decision.resolution })
    return { finalText: decision.repairedText, attempts: 1, usedTemplate: false,
             fallbackUsed: null, decision, events }
  }
  events.push({ kind: 'OutputRejected', attempt: 1, violations: decision.violations })

  // Attempt 2 — constrained re-render with the violation appendix.
  const appendix = buildViolationAppendix(decision.violations)
  const secondDraft = await render(appendix)
  const secondDecision = verify(secondDraft, ctx, 2)
  if (secondDecision.verdict === 'PASS') {
    events.push({ kind: 'RenderCompleted', attempt: 2, finalResolution: secondDecision.resolution })
    return { finalText: secondDecision.repairedText, attempts: 2, usedTemplate: false,
             fallbackUsed: null, decision: secondDecision, events }
  }
  events.push({ kind: 'OutputRejected', attempt: 2, violations: secondDecision.violations })

  // Template fallback — deterministic; no LLM.
  const fb = chooseFallback(fallbackChain)
  const templateText = renderFallback(fb, { register: ctx.contentRegister, learnerText })
  events.push({ kind: 'TemplateFallbackUsed', fallback: fb })

  // Sanity: verify the template itself. It MUST pass; if it doesn't
  // (a pack build defect), we deliver it anyway with the violations
  // logged — the RS's P-1 handler will page engineering.
  const templateDecision = verify(templateText, { ...ctx, move: null }, 2)
  return {
    finalText: templateText, attempts: 2, usedTemplate: true, fallbackUsed: fb,
    decision: { ...templateDecision, resolution: 'template' },
    events,
  }
}
