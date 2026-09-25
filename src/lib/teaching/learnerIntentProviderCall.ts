/**
 * EXPERIMENT — the one provider seam for learnerIntentInterpreter.ts.
 *
 * Kept out of route.ts on purpose: route.ts's provider call sites are pinned
 * by source-text guards (llmDependencyInstrumentation and siblings) that
 * exist to stop teaching-path calls being added silently. This call is not a
 * teaching-path call — it only runs for a cert-gated account on the A/B
 * header, and its cost is reported in the response's `intentExperiment`
 * field (`result.latencyMs`), NOT in `llmCallCount`, which keeps counting
 * teaching generations exactly as on Architecture A.
 */
import { routeAI, type CertProviderOverride, type TeachingLanguage } from '@/lib/ai/router'
import type { IntentCaller } from './learnerIntentInterpreter'

export function makeIntentCaller(opts: {
  country: string
  lang: TeachingLanguage
  userId: string
  groqModelOverride?: string
  forceProvider?: CertProviderOverride
  /** What is left of the route's own wall clock, read at call time. */
  remainingMs: () => number
}): IntentCaller {
  return async (systemPrompt, userPrompt, timeoutMs) => {
    // Never spend the primary generation's time: keep 30s of the route's
    // budget in reserve, or do not call at all.
    const budgetMs = Math.min(timeoutMs, opts.remainingMs() - 30_000)
    if (budgetMs <= 0) throw new Error('intent-experiment: no route budget')
    const routed = await routeAI(
      [{ role: 'user', content: userPrompt }], systemPrompt, opts.country, 600, opts.lang,
      { userId: opts.userId, purpose: 'intent-experiment' }, opts.groqModelOverride, budgetMs, opts.forceProvider,
    )
    return routed.text
  }
}
