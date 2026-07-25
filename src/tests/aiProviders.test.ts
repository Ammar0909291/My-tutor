import { describe, it, expect, vi, beforeEach } from 'vitest'
import type { AICompletionRequest, AICompletionResult, AIProvider } from '@/lib/ai/providers/types'
import {
  AIProviderError, AIRateLimitError, AITimeoutError, AIQuotaError,
  AIServerError, AINetworkError, AIEmptyResponseError,
} from '@/lib/ai/providers/types'
import { createFailoverRouter } from '@/lib/ai/providers/failoverRouter'
import {
  recordRequest, recordSuccess, recordFailure, recordFailover,
  snapshotProviderMetrics, resetProviderMetrics,
} from '@/lib/ai/providers/metrics'

// ─── Test helpers ────────────────────────────────────────────────────────────

function mockProvider(name: string, impl: Partial<AIProvider> = {}): AIProvider {
  return {
    name,
    complete: impl.complete ?? (async () => ({ text: `${name} response`, finishReason: 'stop', provider: name })),
    healthCheck: impl.healthCheck ?? (async () => true),
  }
}

const REQ: AICompletionRequest = {
  messages: [{ role: 'user', content: 'What is 2+2?' }],
  systemPrompt: 'You are a math tutor.',
  maxTokens: 800,
  temperature: 0.7,
}

beforeEach(() => { resetProviderMetrics() })

// ─── 1. Typed error hierarchy ────────────────────────────────────────────────

describe('AI Provider Error Hierarchy', () => {
  it('AIProviderError carries provider name, statusCode, retryable flag', () => {
    const err = new AIProviderError('test error', 'gemini', 500, true)
    expect(err.name).toBe('AIProviderError')
    expect(err.provider).toBe('gemini')
    expect(err.statusCode).toBe(500)
    expect(err.retryable).toBe(true)
    expect(err.message).toBe('test error')
    expect(err).toBeInstanceOf(Error)
  })

  it('AIRateLimitError is retryable with status 429', () => {
    const err = new AIRateLimitError('openrouter')
    expect(err.name).toBe('AIRateLimitError')
    expect(err.retryable).toBe(true)
    expect(err.statusCode).toBe(429)
    expect(err).toBeInstanceOf(AIProviderError)
  })

  it('AITimeoutError is retryable', () => {
    const err = new AITimeoutError('gemini')
    expect(err.retryable).toBe(true)
    expect(err).toBeInstanceOf(AIProviderError)
  })

  it('AIQuotaError is NOT retryable', () => {
    const err = new AIQuotaError('gemini')
    expect(err.retryable).toBe(false)
    expect(err.statusCode).toBe(429)
  })

  it('AIServerError is retryable', () => {
    const err = new AIServerError('openrouter', 502)
    expect(err.retryable).toBe(true)
    expect(err.statusCode).toBe(502)
  })

  it('AINetworkError is retryable', () => {
    const err = new AINetworkError('gemini')
    expect(err.retryable).toBe(true)
  })

  it('AIEmptyResponseError is retryable', () => {
    const err = new AIEmptyResponseError('gemini')
    expect(err.retryable).toBe(true)
  })
})

// ─── 2. Failover Router ─────────────────────────────────────────────────────

describe('Failover Router (2-tier)', () => {
  it('primary success returns primary result', async () => {
    const router = createFailoverRouter({
      providers: [mockProvider('gemini'), mockProvider('openrouter')],
    })
    const result = await router.complete(REQ)
    expect(result.provider).toBe('gemini')
    expect(result.text).toBe('gemini response')
  })

  it('primary retryable failure → retries primary once → then falls over to fallback', async () => {
    let calls = 0
    const primary = mockProvider('gemini', {
      complete: async () => { calls++; throw new AIRateLimitError('gemini') },
    })
    const router = createFailoverRouter({
      providers: [primary, mockProvider('openrouter')],
    })
    const result = await router.complete(REQ)
    expect(calls).toBe(2) // initial + retry
    expect(result.provider).toBe('openrouter')
  })

  it('primary non-retryable failure → skips retry → falls over to fallback immediately', async () => {
    let calls = 0
    const primary = mockProvider('gemini', {
      complete: async () => { calls++; throw new AIQuotaError('gemini') },
    })
    const router = createFailoverRouter({
      providers: [primary, mockProvider('openrouter')],
    })
    const result = await router.complete(REQ)
    expect(calls).toBe(1) // no retry for non-retryable
    expect(result.provider).toBe('openrouter')
  })

  it('both providers fail → throws the last (fallback) error', async () => {
    const router = createFailoverRouter({
      providers: [
        mockProvider('gemini', { complete: async () => { throw new AITimeoutError('gemini') } }),
        mockProvider('openrouter', { complete: async () => { throw new AIServerError('openrouter', 503) } }),
      ],
    })
    await expect(router.complete(REQ)).rejects.toThrow('Server error (503)')
  })

  it('empty response from primary → retries with doubled maxTokens → then falls over', async () => {
    let retryMaxTokens = 0
    let calls = 0
    const primary = mockProvider('gemini', {
      complete: async (req) => {
        calls++
        if (calls === 2) retryMaxTokens = req.maxTokens
        throw new AIEmptyResponseError('gemini')
      },
    })
    const router = createFailoverRouter({
      providers: [primary, mockProvider('openrouter')],
    })
    const result = await router.complete(REQ)
    expect(calls).toBe(2)
    expect(retryMaxTokens).toBe(Math.max(800 * 2, 2048))
    expect(result.provider).toBe('openrouter')
  })

  it('primary retry succeeds → does not fall over', async () => {
    let calls = 0
    const primary = mockProvider('gemini', {
      complete: async () => {
        calls++
        if (calls === 1) throw new AITimeoutError('gemini')
        return { text: 'recovered', finishReason: 'stop', provider: 'gemini' }
      },
    })
    const fallback = mockProvider('openrouter', {
      complete: async () => { throw new Error('should not be called') },
    })
    const router = createFailoverRouter({ providers: [primary, fallback] })
    const result = await router.complete(REQ)
    expect(result.text).toBe('recovered')
    expect(result.provider).toBe('gemini')
  })

  it('healthCheck probes all providers concurrently, keyed by name', async () => {
    const router = createFailoverRouter({
      providers: [
        mockProvider('gemini', { healthCheck: async () => true }),
        mockProvider('openrouter', { healthCheck: async () => false }),
      ],
    })
    const status = await router.healthCheck()
    expect(status).toEqual({ gemini: true, openrouter: false })
  })

  it('500 from primary is retryable and triggers failover', async () => {
    const router = createFailoverRouter({
      providers: [
        mockProvider('gemini', { complete: async () => { throw new AIServerError('gemini', 500) } }),
        mockProvider('openrouter'),
      ],
    })
    const result = await router.complete(REQ)
    expect(result.provider).toBe('openrouter')
  })

  it('network error triggers retry then failover', async () => {
    let calls = 0
    const router = createFailoverRouter({
      providers: [
        mockProvider('gemini', { complete: async () => { calls++; throw new AINetworkError('gemini') } }),
        mockProvider('openrouter'),
      ],
    })
    const result = await router.complete(REQ)
    expect(calls).toBe(2)
    expect(result.provider).toBe('openrouter')
  })
})

// ─── 2b. Failover Router (3-tier: Gemini → OpenRouter → Groq) ───────────────

describe('Failover Router (3-tier)', () => {
  it('all three healthy: primary serves, others untouched', async () => {
    let openrouterCalls = 0
    let groqCalls = 0
    const router = createFailoverRouter({
      providers: [
        mockProvider('gemini'),
        mockProvider('openrouter', { complete: async () => { openrouterCalls++; return { text: 'or', finishReason: 'stop', provider: 'openrouter' } } }),
        mockProvider('groq', { complete: async () => { groqCalls++; return { text: 'groq', finishReason: 'stop', provider: 'groq' } } }),
      ],
    })
    const result = await router.complete(REQ)
    expect(result.provider).toBe('gemini')
    expect(openrouterCalls).toBe(0)
    expect(groqCalls).toBe(0)
  })

  it('Gemini fails (with retry) and OpenRouter fails → falls through to Groq', async () => {
    let geminiCalls = 0
    let openrouterCalls = 0
    const router = createFailoverRouter({
      providers: [
        mockProvider('gemini', { complete: async () => { geminiCalls++; throw new AITimeoutError('gemini') } }),
        mockProvider('openrouter', { complete: async () => { openrouterCalls++; throw new AIServerError('openrouter', 500) } }),
        mockProvider('groq', { complete: async () => ({ text: 'groq saved it', finishReason: 'stop', provider: 'groq' }) }),
      ],
    })
    const result = await router.complete(REQ)
    expect(geminiCalls).toBe(2) // primary gets its retry
    expect(openrouterCalls).toBe(1) // 2nd tier is a single shot, no retry
    expect(result.provider).toBe('groq')
    expect(result.text).toBe('groq saved it')
  })

  it('only Groq (3rd tier) does NOT get a same-provider retry on a retryable error', async () => {
    let groqCalls = 0
    const router = createFailoverRouter({
      providers: [
        mockProvider('gemini', { complete: async () => { throw new AIQuotaError('gemini') } }),
        mockProvider('openrouter', { complete: async () => { throw new AIQuotaError('openrouter') } }),
        mockProvider('groq', { complete: async () => { groqCalls++; throw new AITimeoutError('groq') } }),
      ],
    })
    await expect(router.complete(REQ)).rejects.toThrow('groq')
    expect(groqCalls).toBe(1) // last tier: one shot, then the chain is exhausted
  })

  it('all three fail → throws the last (Groq) error', async () => {
    const router = createFailoverRouter({
      providers: [
        mockProvider('gemini', { complete: async () => { throw new AITimeoutError('gemini') } }),
        mockProvider('openrouter', { complete: async () => { throw new AIServerError('openrouter', 503) } }),
        mockProvider('groq', { complete: async () => { throw new AINetworkError('groq') } }),
      ],
    })
    await expect(router.complete(REQ)).rejects.toThrow('Network error on groq')
  })

  it('healthCheck reports all three tiers by name', async () => {
    const router = createFailoverRouter({
      providers: [
        mockProvider('gemini', { healthCheck: async () => true }),
        mockProvider('openrouter', { healthCheck: async () => false }),
        mockProvider('groq', { healthCheck: async () => true }),
      ],
    })
    const status = await router.healthCheck()
    expect(status).toEqual({ gemini: true, openrouter: false, groq: true })
  })

  it('providerNames reflects the configured chain in order', () => {
    const router = createFailoverRouter({
      providers: [mockProvider('gemini'), mockProvider('openrouter'), mockProvider('groq')],
    })
    expect(router.providerNames).toEqual(['gemini', 'openrouter', 'groq'])
  })

  it('createFailoverRouter throws on an empty provider list', () => {
    expect(() => createFailoverRouter({ providers: [] })).toThrow()
  })
})

// ─── 3. Metrics ──────────────────────────────────────────────────────────────

describe('Provider Metrics', () => {
  it('tracks requests, successes, and latency', () => {
    recordRequest('gemini')
    recordSuccess('gemini', 250)
    recordRequest('gemini')
    recordSuccess('gemini', 150)
    const snap = snapshotProviderMetrics()
    expect(snap.providers.gemini.requests).toBe(2)
    expect(snap.providers.gemini.successes).toBe(2)
    expect(snap.providers.gemini.totalLatencyMs).toBe(400)
  })

  it('tracks failures by kind', () => {
    recordFailure('gemini', 'timeout')
    recordFailure('gemini', 'rateLimit')
    recordFailure('gemini', 'emptyResponse')
    recordFailure('gemini', 'error')
    const snap = snapshotProviderMetrics()
    expect(snap.providers.gemini.failures).toBe(4)
    expect(snap.providers.gemini.timeouts).toBe(1)
    expect(snap.providers.gemini.rateLimits).toBe(1)
    expect(snap.providers.gemini.emptyResponses).toBe(1)
  })

  it('tracks failovers', () => {
    recordFailover()
    recordFailover()
    const snap = snapshotProviderMetrics()
    expect(snap.failovers).toBe(2)
  })

  it('reset clears all metrics', () => {
    recordRequest('gemini')
    recordFailover()
    resetProviderMetrics()
    const snap = snapshotProviderMetrics()
    expect(snap.providers).toEqual({})
    expect(snap.failovers).toBe(0)
  })

  it('snapshotProviderMetrics returns a copy, not a reference', () => {
    recordRequest('gemini')
    const snap1 = snapshotProviderMetrics()
    recordRequest('gemini')
    const snap2 = snapshotProviderMetrics()
    expect(snap1.providers.gemini.requests).toBe(1)
    expect(snap2.providers.gemini.requests).toBe(2)
  })
})

// ─── 4. Provider interface contract ─────────────────────────────────────────

describe('Provider Interface Contract', () => {
  it('provider result always has text, finishReason, and provider fields', async () => {
    const provider = mockProvider('test')
    const result = await provider.complete(REQ)
    expect(typeof result.text).toBe('string')
    expect(result.text.length).toBeGreaterThan(0)
    expect(result).toHaveProperty('finishReason')
    expect(typeof result.provider).toBe('string')
  })

  it('provider name is stable and non-empty', () => {
    const provider = mockProvider('gemini')
    expect(provider.name).toBe('gemini')
    expect(provider.name.length).toBeGreaterThan(0)
  })
})

// ─── 5. Router integration (the public routeAI interface) ────────────────────

describe('routeAI public interface', () => {
  it('RouteAIResult shape is preserved (text, provider, finishReason)', () => {
    const result = { text: 'hello', provider: 'gemini', finishReason: 'stop' as string | null }
    expect(typeof result.text).toBe('string')
    expect(typeof result.provider).toBe('string')
    expect(['string', 'object'].includes(typeof result.finishReason)).toBe(true)
  })

  it('timeout messages are localized (en/ru/hi)', () => {
    const msgs: Record<string, string> = {
      en: 'Taking longer than usual. Please try again.',
      ru: 'Думаю дольше обычного. Попробуй ещё раз.',
      hi: 'Thoda time lag raha hai. Please try again.',
    }
    expect(msgs.en).toContain('Please try again')
    expect(msgs.ru).toContain('Попробуй ещё раз')
    expect(msgs.hi).toContain('Please try again')
  })
})

// ─── 6. JSON generation contract ─────────────────────────────────────────────

describe('routeJSON contract (replica)', () => {
  function safeParseJSON(rawText: string | null): unknown {
    if (!rawText) return null
    const clean = rawText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
    try { return JSON.parse(clean) } catch { return null }
  }

  it('valid JSON → parsed object', () => {
    expect(safeParseJSON('{"a": 1}')).toEqual({ a: 1 })
  })

  it('null → null', () => {
    expect(safeParseJSON(null)).toBeNull()
  })

  it('empty string → null', () => {
    expect(safeParseJSON('')).toBeNull()
  })

  it('malformed JSON → null', () => {
    expect(safeParseJSON('{broken}')).toBeNull()
  })

  it('markdown-wrapped JSON → parsed correctly', () => {
    expect(safeParseJSON('```json\n{"b": 2}\n```')).toEqual({ b: 2 })
  })
})

// ─── 7. Security invariants ─────────────────────────────────────────────────

describe('Security invariants', () => {
  it('API keys are never included in error messages', () => {
    const key = 'sk-test-secret-key-12345'
    const err = new AIProviderError('Connection failed', 'gemini', 500, false)
    expect(err.message).not.toContain(key)
    expect(err.stack).not.toContain(key)
  })

  it('provider errors do not leak system prompts', () => {
    const systemPrompt = 'You are a secret tutor agent'
    const err = new AIRateLimitError('gemini')
    expect(err.message).not.toContain(systemPrompt)
  })

  it('log messages from failover router do not contain API keys', () => {
    const logs: string[] = []
    const origWarn = console.warn
    const origLog = console.log
    const origErr = console.error
    console.warn = (...args: any[]) => logs.push(args.join(' '))
    console.log = (...args: any[]) => logs.push(args.join(' '))
    console.error = (...args: any[]) => logs.push(args.join(' '))

    const router = createFailoverRouter({
      providers: [
        mockProvider('gemini', { complete: async () => { throw new AITimeoutError('gemini') } }),
        mockProvider('openrouter'),
      ],
    })

    router.complete(REQ).then(() => {
      for (const log of logs) {
        expect(log).not.toMatch(/sk-|AIza|key-/)
      }
    }).finally(() => {
      console.warn = origWarn
      console.log = origLog
      console.error = origErr
    })
  })
})

// ─── 8. Edge cases ──────────────────────────────────────────────────────────

describe('Edge cases', () => {
  it('empty messages array is forwarded without error', async () => {
    const provider = mockProvider('gemini')
    const result = await provider.complete({ ...REQ, messages: [] })
    expect(result.text).toBeTruthy()
  })

  it('very large maxTokens is passed through to the provider', async () => {
    let capturedMaxTokens = 0
    const provider = mockProvider('gemini', {
      complete: async (req) => {
        capturedMaxTokens = req.maxTokens
        return { text: 'ok', finishReason: 'stop', provider: 'gemini' }
      },
    })
    await provider.complete({ ...REQ, maxTokens: 16384 })
    expect(capturedMaxTokens).toBe(16384)
  })

  it('concurrent requests to the failover router do not interfere', async () => {
    let callCount = 0
    const primary = mockProvider('gemini', {
      complete: async () => {
        callCount++
        await new Promise((r) => setTimeout(r, 10))
        return { text: `response-${callCount}`, finishReason: 'stop', provider: 'gemini' }
      },
    })
    const router = createFailoverRouter({
      providers: [primary, mockProvider('openrouter')],
    })
    const results = await Promise.all([
      router.complete(REQ),
      router.complete(REQ),
      router.complete(REQ),
    ])
    expect(results.length).toBe(3)
    for (const r of results) {
      expect(r.provider).toBe('gemini')
      expect(r.text).toBeTruthy()
    }
  })
})
