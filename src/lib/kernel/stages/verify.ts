/**
 * Stage 12 — VERIFY. Owner: Output Verifier (RS §9).
 *
 * K3 shipped this stage as an interface + pass-through. K5 fills in the
 * real body via `enforcingVerifier`, which is a thin adapter over the
 * pure `verify()` function in `kernel/verifier`. The passthrough
 * verifier remains for tests and for callers that haven't opted into
 * enforcement yet (strangler discipline preserved).
 *
 * The full REJECT loop (constrained re-render + template fallback)
 * lives in `kernel/verifier/loop.ts` — the pipeline caller invokes it;
 * this stage only records the single-pass verify decision.
 */
import type { KernelState, Stage, VerificationResult, RenderDraft, RenderPlan } from '../types'
import { verify, type VerifierContext } from '../verifier'

export interface Verifier {
  verify(draft: RenderDraft, plan: RenderPlan): Promise<VerificationResult>
}

export const passthroughVerifier: Verifier = {
  async verify() {
    return { verdict: 'PASS', violations: [], attempt: 1, resolution: 'passthrough' }
  },
}

/** Build an enforcing verifier from a VerifierContext supplier. K3
 *  callers that provide the context get real enforcement; those that
 *  don't fall back to passthrough. */
export function enforcingVerifier(getContext: (draft: RenderDraft, plan: RenderPlan) => VerifierContext): Verifier {
  return {
    async verify(draft, plan) {
      const ctx = getContext(draft, plan)
      const decision = verify(draft.text, ctx, 1)
      return {
        verdict: decision.verdict,
        violations: decision.violations.map((v) => ({ code: v.code, matched: v.matched })),
        attempt: decision.attempt,
        resolution: decision.resolution as VerificationResult['resolution'],
      }
    },
  }
}

export function verifyStage(verifier: Verifier = passthroughVerifier): Stage<KernelState, KernelState> {
  return {
    name: 'VERIFY',
    async run(state) {
      if (!state.draft || !state.plan) throw new Error('VERIFY: draft or plan missing')
      const verification = await verifier.verify(state.draft, state.plan)
      return { ...state, verification }
    },
  }
}
