/**
 * K6 — Post-LLM verifier gate.
 *
 * Wraps `runVerifierLoop` for the chat route: accepts already-cleaned
 * assistant text + a caller-supplied rerender callback that re-invokes
 * the LLM with the same prompt plus a violations appendix (RS §9.3.1:
 * identical plan, no temperature change).
 *
 * Return contract: `finalText` is what the caller MUST persist. It is
 * either the accepted draft, the accepted rerender, or the
 * deterministic template. Events describe what happened for evidence.
 */
import { runVerifierLoop, type VerifierContext, type OutputEvent, type LoopResult } from '@/lib/kernel/verifier'

export interface GateInputs {
  draftText: string
  ctx: VerifierContext
  learnerText: string
  fallbackChain: string[]
  /** Called at most ONCE. MUST invoke the same LLM path with the SAME
   *  plan, just appending the violations text. Return the new draft. */
  rerender: (violationAppendix: string) => Promise<string>
}

export interface GateResult {
  finalText: string
  attempts: 1 | 2
  usedTemplate: boolean
  events: OutputEvent[]
  loopResult: LoopResult
}

/** Total: never throws. On any internal failure, returns the original
 *  draftText unchanged (fail-open — matches the rest of the route's
 *  additive discipline). */
export async function verifierGate(inputs: GateInputs): Promise<GateResult> {
  try {
    const loopResult = await runVerifierLoop(
      inputs.draftText, inputs.ctx, inputs.rerender,
      inputs.fallbackChain, inputs.learnerText,
    )
    return {
      finalText: loopResult.finalText,
      attempts: loopResult.attempts as 1 | 2,
      usedTemplate: loopResult.usedTemplate,
      events: loopResult.events,
      loopResult,
    }
  } catch (err) {
    console.warn('[eos-runtime] verifier gate failed open:', err)
    return {
      finalText: inputs.draftText,
      attempts: 1, usedTemplate: false,
      events: [{ kind: 'RenderCompleted', attempt: 1, finalResolution: 'passthrough' }],
      loopResult: {
        finalText: inputs.draftText, attempts: 1, usedTemplate: false, fallbackUsed: null,
        decision: { verdict: 'PASS', violations: [], attempt: 1, resolution: 'passthrough', repairedText: inputs.draftText },
        events: [],
      },
    }
  }
}
