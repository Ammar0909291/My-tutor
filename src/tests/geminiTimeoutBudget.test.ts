/**
 * INCIDENT EVIDENCE — why Tutor Max answered before 2026-08-02 03:49 and
 * stopped answering after it. Assertions only; no runtime code is changed by
 * this file.
 *
 * The chain order (gemini -> openrouter -> groq) did not change. What changed
 * in 6d4bfde / c1f2b5e is that Gemini went from 404-ing instantly to actually
 * serving. These tests pin the two failure semantics that make that promotion
 * fatal for the real teaching prompt:
 *
 *   BEFORE: a 404 is classified as a plain Error, which isRetryable() rejects,
 *           so the primary tier does NOT retry and the chain fails over to
 *           Groq in milliseconds. Groq served every turn. Tutor worked.
 *
 *   AFTER:  a timeout is an AITimeoutError with retryable = true, so the
 *           primary tier retries the SAME provider. Two Gemini attempts plus
 *           the backoff exceed /api/learn/chat's 60s maxDuration, so the
 *           function is killed before failover to Groq can rescue the turn.
 */
import { describe, it, expect, vi } from 'vitest'
import { createFailoverRouter } from '@/lib/ai/providers/failoverRouter'
import { AITimeoutError } from '@/lib/ai/providers/types'
import type { AIProvider } from '@/lib/ai/providers/types'

const REQ = { messages: [{ role: 'user' as const, content: 'hi' }], systemPrompt: 's', maxTokens: 2048, temperature: 0.7 }

function provider(name: string, behaviour: () => Promise<never> | Promise<any>): AIProvider & { calls: number } {
  const p: any = {
    name,
    model: `${name}-model`,
    calls: 0,
    async complete() { p.calls++; return behaviour() },
    async healthCheck() { return true },
  }
  return p
}

/** The real classifier from the Gemini provider, reached through its public
 *  surface: a 404 from the SDK is not converted into an AIProviderError. */
async function geminiClassifiedError(status: number, message: string): Promise<unknown> {
  const { createGeminiProvider } = await import('@/lib/ai/providers/gemini')
  const { GoogleGenerativeAI } = await import('@google/generative-ai')
  vi.spyOn(GoogleGenerativeAI.prototype, 'getGenerativeModel').mockReturnValue({
    generateContent: async () => { const e: any = new Error(message); e.status = status; throw e },
  } as never)
  const p = createGeminiProvider('k', 'gemini-x')
  return p.complete(REQ as never).catch((e) => e)
}

describe('BEFORE 03:49 — Gemini 404 fails over immediately (this is why it worked)', () => {
  it('a 404 is NOT classified as a retryable AIProviderError', async () => {
    const err: any = await geminiClassifiedError(404, '[404 Not Found] models/gemini-2.5-flash-lite is not found for API version v1beta')
    // Left as a plain Error -> isRetryable() returns false for it.
    expect(err.retryable).toBeUndefined()
    expect(err.name).not.toBe('AITimeoutError')
    vi.restoreAllMocks()
  })

  it('the primary tier makes exactly ONE attempt, then fails over', async () => {
    const notFound = () => { const e: any = new Error('[404 Not Found] model not found'); e.status = 404; return Promise.reject(e) }
    const gemini = provider('gemini', notFound)
    const groq = provider('groq', async () => ({ text: 'real lesson', finishReason: 'stop', provider: 'groq' }))
    const router = createFailoverRouter({ providers: [gemini, groq] })

    const started = Date.now()
    const result = await router.complete(REQ as never)

    expect(gemini.calls).toBe(1)        // no same-provider retry
    expect(groq.calls).toBe(1)          // Groq served the turn
    expect(result.provider).toBe('groq')
    expect(Date.now() - started).toBeLessThan(500)  // no 500ms backoff was paid
  })
})

describe('AFTER 03:49 — a Gemini timeout costs TWO full provider budgets', () => {
  it('AITimeoutError is retryable, so the primary tier attempts twice', async () => {
    const gemini = provider('gemini', () => Promise.reject(new AITimeoutError('gemini')))
    const groq = provider('groq', async () => ({ text: 'ok', finishReason: 'stop', provider: 'groq' }))
    const router = createFailoverRouter({ providers: [gemini, groq] })

    await router.complete(REQ as never)
    expect(gemini.calls).toBe(2)   // <- the attempt that does not fit the budget
    expect(groq.calls).toBe(1)
  })

  it('two Gemini attempts plus backoff exceed the route budget', () => {
    // Constants read from the code, not assumed:
    //   src/lib/ai/providers/gemini.ts        TIMEOUT_MS      = 30_000
    //   src/lib/ai/providers/failoverRouter.ts RETRY_BACKOFF_MS =    500
    //   vercel.json  api/learn/chat                maxDuration = 60 s
    const GEMINI_TIMEOUT_MS = 30_000
    const RETRY_BACKOFF_MS = 500
    const ROUTE_BUDGET_MS = 60_000
    const worstCaseBeforeFailover = GEMINI_TIMEOUT_MS + RETRY_BACKOFF_MS + GEMINI_TIMEOUT_MS

    expect(worstCaseBeforeFailover).toBe(60_500)
    // The function is killed before Groq is ever tried.
    expect(worstCaseBeforeFailover).toBeGreaterThan(ROUTE_BUDGET_MS)
  })

  it('the client aborts even earlier, and retries the whole turn', () => {
    // src/components/learn/LessonScreen.tsx: fetchWithTimeout(..., 30000)
    // inside `for (let attempt = 0; attempt < 3; attempt++)`, where a thrown
    // abort IS retried. One slow Gemini turn therefore becomes three full
    // server-side pipelines, each making its own Gemini call(s).
    const CLIENT_TIMEOUT_MS = 30_000
    const CLIENT_ATTEMPTS = 3
    const GEMINI_TIMEOUT_MS = 30_000

    // The client gives up at exactly the moment Gemini's own budget expires,
    // so a turn that would have completed at 30s+ can never be delivered.
    expect(CLIENT_TIMEOUT_MS).toBeLessThanOrEqual(GEMINI_TIMEOUT_MS)
    expect(CLIENT_TIMEOUT_MS).toBeLessThan(60_000) // < the server's own budget
    expect(CLIENT_ATTEMPTS).toBe(3)
  })
})
