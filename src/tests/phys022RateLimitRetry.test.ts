/**
 * PHYS-022 / PHYS-024 (2026-10-05) — stock "degraded" turns replaced teaching.
 *
 * Production logs, 2026-10-05 16:21 UTC, every degraded turn in the sample:
 *   groq   429 "Rate limit exceeded on groq"  elapsed ~100 ms (burst limit)
 *   gemini 402 "prepayment credits are depleted" (billing — owner)
 *   openrouter: no key, filtered out of the chain
 * so the chain was exhausted although Groq would have answered a second later.
 *
 * Fix: one bounded retry of a provider that refused with a FAST burst rate
 * limit, after its Retry-After, inside the same chain deadline. Never for a
 * timeout (a second full timeout is the PCD-002 budget breach) and never for a
 * daily quota (AIQuotaError cannot clear in seconds). And the first degraded
 * turn now says honestly that the answer did not come through.
 */
import { describe, it, expect } from 'vitest'
import { createFailoverRouter, retryAfterMs } from '@/lib/ai/providers/failoverRouter'
import { AIRateLimitError, AIQuotaError, AITimeoutError, AIProviderError } from '@/lib/ai/providers/types'
import type { AIProvider, AICompletionRequest } from '@/lib/ai/providers/types'
import { degradedCopy } from '@/lib/teaching/degradedCopy'

const REQ: AICompletionRequest = { messages: [{ role: 'user', content: 'next question please' }], systemPrompt: 's', maxTokens: 100, temperature: 0.7 }
const fastRetryAfter = () => Object.assign(new Error('429'), { headers: { 'retry-after': '0.05' } })

function provider(name: string, outcomes: Array<() => Promise<string>>): AIProvider & { calls: number } {
  const p = {
    name, model: `${name}-model`, calls: 0,
    async complete() {
      const f = outcomes[Math.min(p.calls, outcomes.length - 1)]
      p.calls++
      const text = await f()
      return { text, provider: name, finishReason: 'stop' }
    },
    async healthCheck() { return true },
  }
  return p as unknown as AIProvider & { calls: number }
}
const reject = (e: Error) => () => Promise.reject(e)
const ok = (t: string) => () => Promise.resolve(t)

describe('fast burst rate limit gets one bounded retry (PHYS-022/024)', () => {
  it('groq 429 fast, gemini 402: groq is retried once and its answer is served', async () => {
    const groq = provider('groq', [reject(new AIRateLimitError('groq', fastRetryAfter())), ok('Here is the next question.')])
    const gemini = provider('gemini', [reject(new AIProviderError('402 Payment Required — prepayment credits are depleted', 'gemini', 402, false))])
    const r = await createFailoverRouter({ providers: [groq, gemini], disableSameProviderRetry: true }).complete(REQ)
    expect(r.provider).toBe('groq')
    expect(r.text).toBe('Here is the next question.')
    expect(groq.calls).toBe(2)
    expect(gemini.calls).toBe(1)
  })

  it('a healthy fallback is still used first — no retry when gemini answers', async () => {
    const groq = provider('groq', [reject(new AIRateLimitError('groq', fastRetryAfter())), ok('late')])
    const gemini = provider('gemini', [ok('from gemini')])
    const r = await createFailoverRouter({ providers: [groq, gemini], disableSameProviderRetry: true }).complete(REQ)
    expect(r.provider).toBe('gemini')
    expect(groq.calls).toBe(1)
  })

  it('only one retry: a second 429 still exhausts the chain', async () => {
    const groq = provider('groq', [reject(new AIRateLimitError('groq', fastRetryAfter()))])
    await expect(createFailoverRouter({ providers: [groq], disableSameProviderRetry: true }).complete(REQ)).rejects.toThrow()
    expect(groq.calls).toBe(2)
  })

  it('never retries a daily quota or a timeout', async () => {
    const quota = provider('groq', [reject(new AIQuotaError('groq'))])
    await expect(createFailoverRouter({ providers: [quota], disableSameProviderRetry: true }).complete(REQ)).rejects.toThrow()
    expect(quota.calls).toBe(1)
    const slow = provider('groq', [reject(new AITimeoutError('groq'))])
    await expect(createFailoverRouter({ providers: [slow], disableSameProviderRetry: true }).complete(REQ)).rejects.toThrow()
    expect(slow.calls).toBe(1)
  })

  it('never retries past the chain deadline', async () => {
    const groq = provider('groq', [reject(new AIRateLimitError('groq', Object.assign(new Error('429'), { headers: { 'retry-after': '3' } })))])
    await expect(createFailoverRouter({ providers: [groq], disableSameProviderRetry: true, deadlineMs: 1_500 }).complete(REQ)).rejects.toThrow()
    expect(groq.calls).toBe(1)
  })

  it('reads Retry-After from plain and Headers-like objects', () => {
    expect(retryAfterMs(new AIRateLimitError('groq', fastRetryAfter()))).toBe(50)
    expect(retryAfterMs(new AIRateLimitError('groq', Object.assign(new Error('x'), { headers: new Headers({ 'retry-after': '2' }) })))).toBe(2000)
    expect(retryAfterMs(new AIRateLimitError('groq'))).toBeNull()
  })
})

describe('the first degraded turn is honest', () => {
  it('says the answer did not come through and to send again — no promise of a step', () => {
    const t = degradedCopy({ channel: 'server_degraded', consecutiveFailures: 1 })!
    expect(t).toMatch(/didn't come through/)
    expect(t).toMatch(/send your message again/)
    expect(t).not.toMatch(/one small step|We can continue from here/)
    expect(t).not.toContain('?')
  })
})
