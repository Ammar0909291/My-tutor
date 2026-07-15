/**
 * Stage 12 — VERIFY. Owner: Output Verifier (RS §9).
 *
 * K3 SCOPE: INTERFACE ONLY, PASS-THROUGH. K5 implements the 15 rule codes
 * and the two-attempt rejection protocol. The interface exists here so K5's
 * work is a stage-body swap, not a pipeline change.
 *
 * The default verifier passes every draft and records `resolution:
 * 'passthrough'`. Tests can inject a spy verifier to assert the pipeline
 * routes drafts through this seam.
 */
import type { KernelState, Stage, VerificationResult, RenderDraft, RenderPlan } from '../types'

export interface Verifier {
  verify(draft: RenderDraft, plan: RenderPlan): Promise<VerificationResult>
}

export const passthroughVerifier: Verifier = {
  async verify() {
    return { verdict: 'PASS', violations: [], attempt: 1, resolution: 'passthrough' }
  },
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
