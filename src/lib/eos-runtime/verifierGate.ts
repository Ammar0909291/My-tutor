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
import { runVerifierLoop, verify, type VerifierContext, type OutputEvent, type LoopResult } from '@/lib/kernel/verifier'
import type { VerifierMode } from './flags'

export interface GateInputs {
  draftText: string
  ctx: VerifierContext
  learnerText: string
  fallbackChain: string[]
  /** Called at most ONCE, and never in 'log' mode. MUST invoke the same
   *  LLM path with the SAME plan, just appending the violations text. */
  rerender: (violationAppendix: string) => Promise<string>
  /** 'enforce' runs RS §9.3 in full. 'log' verifies and reports but
   *  delivers the original draft byte-identically — no rerender, no
   *  template, no added cost or latency. Defaults to 'enforce' so existing
   *  callers keep their behaviour. */
  mode?: VerifierMode
}

export interface GateResult {
  finalText: string
  attempts: 1 | 2
  usedTemplate: boolean
  events: OutputEvent[]
  loopResult: LoopResult
  /** Which mode actually ran — needed by the metrics fold, since a log-mode
   *  violation is uncorrected by construction and an enforce-mode one is not. */
  mode: 'log' | 'enforce'
}

/** Total: never throws. On any internal failure, returns the original
 *  draftText unchanged (fail-open — matches the rest of the route's
 *  additive discipline). */
export async function verifierGate(inputs: GateInputs): Promise<GateResult> {
  const mode: 'log' | 'enforce' = inputs.mode === 'log' ? 'log' : 'enforce'
  try {
    // ── LOG-ONLY ────────────────────────────────────────────────────────
    // Single pure verify(); the draft is returned untouched. Not even the
    // STRIP auto-repair is applied — log mode's contract is that output is
    // byte-identical to the un-gated path, so any behaviour difference
    // observed during a log-mode canary is definitively NOT the verifier.
    if (mode === 'log') {
      const decision = verify(inputs.draftText, inputs.ctx, 1)
      const events: OutputEvent[] =
        decision.verdict === 'REJECT'
          ? [{ kind: 'OutputRejected', attempt: 1, violations: decision.violations },
             { kind: 'RenderCompleted', attempt: 1, finalResolution: 'passthrough' }]
          : [{ kind: 'RenderCompleted', attempt: 1, finalResolution: decision.resolution }]
      return {
        finalText: inputs.draftText,
        attempts: 1,
        usedTemplate: false,
        events,
        mode,
        loopResult: {
          finalText: inputs.draftText, attempts: 1, usedTemplate: false, fallbackUsed: null,
          decision: { ...decision, repairedText: inputs.draftText }, events,
        },
      }
    }

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
      mode,
    }
  } catch (err) {
    console.warn('[eos-runtime] verifier gate failed open:', err)
    return {
      finalText: inputs.draftText,
      attempts: 1, usedTemplate: false,
      events: [{ kind: 'RenderCompleted', attempt: 1, finalResolution: 'passthrough' }],
      mode,
      loopResult: {
        finalText: inputs.draftText, attempts: 1, usedTemplate: false, fallbackUsed: null,
        decision: { verdict: 'PASS', violations: [], attempt: 1, resolution: 'passthrough', repairedText: inputs.draftText },
        events: [],
      },
    }
  }
}
