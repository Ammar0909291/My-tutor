import { checkRateLimit } from '@/lib/rateLimit'

/**
 * Global AI request budget (Sprint AR) — protects the org-wide Groq quota.
 *
 * Per-user rate limits (30/min) don't stop N users from collectively
 * exhausting the provider quota (Groq free tier ≈ 30 req/min org-wide).
 * This adds one shared sliding window across ALL users, enforced at the
 * Groq call sites in client.ts/router.ts so every feature is covered.
 *
 * Opt-in by design: AI_GLOBAL_RPM unset or 0 disables it entirely (zero
 * behavior change). Recommended: set to your provider's per-minute quota
 * (Groq free tier: 30; paid tiers: see console.groq.com/settings/limits).
 * Fails open when Redis is unavailable, consistent with per-user limits.
 */
const AI_GLOBAL_RPM = Number(process.env.AI_GLOBAL_RPM ?? 0) || 0

export class AIBudgetExceededError extends Error {
  constructor() {
    super('AI request budget exceeded — please try again shortly')
    this.name = 'AIBudgetExceededError'
  }
}

/** Throws AIBudgetExceededError when the global per-minute budget is spent. */
export async function consumeAIBudget(): Promise<void> {
  if (!AI_GLOBAL_RPM) return
  const { allowed } = await checkRateLimit('rl:global:ai', AI_GLOBAL_RPM, 60)
  if (!allowed) {
    console.warn(`[ai/budget] global AI budget exhausted (${AI_GLOBAL_RPM}/min)`)
    throw new AIBudgetExceededError()
  }
}
