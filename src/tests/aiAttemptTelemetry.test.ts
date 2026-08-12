import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { createFailoverRouter } from '@/lib/ai/providers/failoverRouter'
import { AITimeoutError, AIRateLimitError, type AIProvider } from '@/lib/ai/providers/types'
import { resetProviderMetrics } from '@/lib/ai/providers/metrics'

/**
 * P16 — per-attempt provider telemetry.
 *
 * A production question ("per Gemini attempt, show HTTP status / model /
 * latency / tokens / finish reason") was unanswerable from the logs: every
 * field except finishReason was measured and discarded, or never captured.
 * These tests pin that one line per ATTEMPT is emitted, on success AND on
 * failure, carrying those fields.
 */

const lines: string[] = []
let spy: ReturnType<typeof vi.spyOn>

beforeEach(() => {
  lines.length = 0
  resetProviderMetrics()
  spy = vi.spyOn(console, 'log').mockImplementation((...a: unknown[]) => {
    lines.push(a.join(' '))
  })
})
afterEach(() => spy.mockRestore())

const attempts = () => lines.filter((l) => l.startsWith('[ai/attempt]'))

function provider(over: Partial<AIProvider> & { name: string }): AIProvider {
  return {
    model: 'test-model',
    complete: async () => ({ text: 'hi', finishReason: 'stop', provider: over.name }),
    healthCheck: async () => true,
    ...over,
  } as AIProvider
}

const REQ = { messages: [{ role: 'user' as const, content: 'q' }], systemPrompt: 's', maxTokens: 100, temperature: 0.7 }

describe('successful attempt', () => {
  it('logs model, latency, status, finish reason and tokens', async () => {
    const r = createFailoverRouter({
      providers: [provider({
        name: 'gemini',
        model: 'gemini-3.5-flash-lite',
        complete: async () => ({
          text: 'hello', finishReason: 'STOP', provider: 'gemini',
          usage: { promptTokens: 1234, completionTokens: 56 },
        }),
      })],
    })
    await r.complete(REQ)
    const line = attempts()[0]
    expect(line).toContain('provider=gemini')
    expect(line).toContain('model=gemini-3.5-flash-lite')
    expect(line).toContain('outcome=ok')
    expect(line).toContain('http_status=200')
    expect(line).toContain('finish_reason=STOP')
    expect(line).toContain('prompt_tokens=1234')
    expect(line).toContain('completion_tokens=56')
    expect(line).toMatch(/elapsed_ms=\d+/)
  })

  it('says "not_reported" rather than 0 when a provider omits usage', async () => {
    const r = createFailoverRouter({ providers: [provider({ name: 'groq' })] })
    await r.complete(REQ)
    expect(attempts()[0]).toContain('prompt_tokens=not_reported')
  })
})

describe('failed attempt', () => {
  it('logs the failure with elapsed time and error identity', async () => {
    const r = createFailoverRouter({
      providers: [
        provider({ name: 'gemini', complete: async () => { throw new AITimeoutError('gemini') } }),
        provider({ name: 'groq' }),
      ],
    })
    await r.complete(REQ)
    const fail = attempts().find((l) => l.includes('outcome=fail'))!
    expect(fail).toContain('provider=gemini')
    expect(fail).toContain('error_name=AITimeoutError')
    expect(fail).toContain('failure_kind=timeout')
    expect(fail).toMatch(/elapsed_ms=\d+/)
  })

  it('surfaces the HTTP status when the provider carries one', async () => {
    const r = createFailoverRouter({
      providers: [
        provider({ name: 'gemini', complete: async () => { throw new AIRateLimitError('gemini') } }),
        provider({ name: 'groq' }),
      ],
    })
    await r.complete(REQ)
    const fail = attempts().find((l) => l.includes('outcome=fail'))!
    expect(fail).toContain('failure_kind=rateLimit')
  })

  it('reads a raw SDK error status off err.status', async () => {
    const r = createFailoverRouter({
      providers: [
        provider({ name: 'gemini', complete: async () => { throw Object.assign(new Error('bad key'), { status: 403 }) } }),
        provider({ name: 'groq' }),
      ],
    })
    await r.complete(REQ)
    expect(attempts().find((l) => l.includes('outcome=fail'))!).toContain('http_status=403')
  })

  it('flags an instant failure as not having reached the network', async () => {
    const r = createFailoverRouter({
      providers: [
        provider({ name: 'gemini', complete: async () => { throw new Error('no key configured') } }),
        provider({ name: 'groq' }),
      ],
    })
    await r.complete(REQ)
    expect(attempts().find((l) => l.includes('outcome=fail'))!).toContain('reached_network=unlikely')
  })

  it('emits one line per attempt across the whole chain', async () => {
    const r = createFailoverRouter({
      providers: [
        provider({ name: 'gemini', complete: async () => { throw new Error('x') } }),
        provider({ name: 'openrouter', complete: async () => { throw new Error('y') } }),
        provider({ name: 'groq' }),
      ],
    })
    await r.complete(REQ)
    expect(attempts()).toHaveLength(3)
    expect(attempts()[2]).toContain('outcome=ok')
  })
})

describe('telemetry never breaks a turn', () => {
  it('a successful call still returns its text', async () => {
    const r = createFailoverRouter({ providers: [provider({ name: 'gemini' })] })
    await expect(r.complete(REQ)).resolves.toMatchObject({ text: 'hi' })
  })

  it('a total chain failure still throws the last error, unchanged', async () => {
    const r = createFailoverRouter({
      providers: [provider({ name: 'gemini', complete: async () => { throw new Error('boom') } })],
    })
    await expect(r.complete(REQ)).rejects.toThrow('boom')
  })
})

/**
 * INVERTED 2026-08-12 (owner instruction): gemini-only is now the DEFAULT, and
 * `AI_PROVIDER_MODE=failover` is the explicit opt-out that restores the chain.
 * These assertions previously pinned the opposite polarity; they are updated
 * rather than removed, because the property worth guarding is unchanged — the
 * switch must have exactly one meaning, and a typo must fail toward the narrow
 * chain rather than silently fanning back out to four providers.
 */
describe('gemini-only mode — default ON, opt-out via failover', () => {
  const KEY = 'AI_PROVIDER_MODE'
  const prev = process.env[KEY]
  afterEach(() => {
    if (prev === undefined) delete process.env[KEY]
    else process.env[KEY] = prev
    vi.resetModules()
  })

  it('is ON when the variable is unset — this is the default', async () => {
    delete process.env[KEY]
    vi.resetModules()
    const { isGeminiOnlyMode } = await import('@/lib/ai/router')
    expect(isGeminiOnlyMode()).toBe(true)
  })

  it('stays ON for any value that is not the exact opt-out', async () => {
    // Including the OLD opt-in spelling: a deployment still carrying
    // AI_PROVIDER_MODE=gemini_only keeps getting gemini only, so the
    // inversion cannot surprise an existing environment.
    for (const v of ['', 'full', 'groq_only', 'gemini', 'GEMINI', '1', 'true', 'gemini_only']) {
      process.env[KEY] = v
      vi.resetModules()
      const { isGeminiOnlyMode } = await import('@/lib/ai/router')
      expect(isGeminiOnlyMode(), `value ${JSON.stringify(v)}`).toBe(true)
    }
  })

  it('is OFF only for failover, case- and whitespace-insensitive', async () => {
    for (const v of ['failover', 'FAILOVER', ' failover ']) {
      process.env[KEY] = v
      vi.resetModules()
      const { isGeminiOnlyMode } = await import('@/lib/ai/router')
      expect(isGeminiOnlyMode(), `value ${JSON.stringify(v)}`).toBe(false)
    }
  })

  it('the chain contains ONLY gemini by default', async () => {
    delete process.env[KEY]
    process.env.GEMINI_API_KEY = 'k'
    process.env.GROQ_API_KEY = 'k'
    process.env.OPENROUTER_API_KEY = 'k'
    vi.resetModules()
    const { getAIRouter } = await import('@/lib/ai/router')
    expect(getAIRouter().providerNames).toEqual(['gemini'])
  })

  it('the chain still contains the fallbacks when explicitly opted out', async () => {
    process.env[KEY] = 'failover'
    process.env.GEMINI_API_KEY = 'k'
    process.env.GROQ_API_KEY = 'k'
    process.env.OPENROUTER_API_KEY = 'k'
    vi.resetModules()
    const { getAIRouter } = await import('@/lib/ai/router')
    expect(getAIRouter().providerNames).toEqual(['gemini', 'openrouter', 'groq'])
  })
})

describe('no same-provider retry in gemini-only mode', () => {
  it('a retryable failure is attempted ONCE, not twice', async () => {
    let calls = 0
    const r = createFailoverRouter({
      providers: [provider({
        name: 'gemini',
        complete: async () => { calls++; throw new AITimeoutError('gemini') },
      })],
      disableSameProviderRetry: true,
    })
    await expect(r.complete(REQ)).rejects.toThrow()
    expect(calls).toBe(1)
    expect(attempts()).toHaveLength(1)
  })

  it('the retry still happens by default — normal deployments unchanged', async () => {
    let calls = 0
    const r = createFailoverRouter({
      providers: [provider({
        name: 'gemini',
        complete: async () => { calls++; throw new AITimeoutError('gemini') },
      })],
    })
    await expect(r.complete(REQ)).rejects.toThrow()
    expect(calls).toBe(2)
  })

  it('a single-provider chain never reports a failover', async () => {
    const r = createFailoverRouter({
      providers: [provider({ name: 'gemini', complete: async () => { throw new Error('x') } })],
      disableSameProviderRetry: true,
    })
    await expect(r.complete(REQ)).rejects.toThrow('x')
    expect(lines.some((l) => l.includes('failing over to'))).toBe(false)
  })

  it('success in isolation mode still returns normally', async () => {
    const r = createFailoverRouter({
      providers: [provider({ name: 'gemini' })],
      disableSameProviderRetry: true,
    })
    await expect(r.complete(REQ)).resolves.toMatchObject({ text: 'hi' })
  })
})

describe('P17 — total_tokens', () => {
  it('sums reported usage', async () => {
    const r = createFailoverRouter({
      providers: [provider({
        name: 'gemini',
        complete: async () => ({
          text: 'x', finishReason: 'STOP', provider: 'gemini',
          usage: { promptTokens: 100, completionTokens: 25 },
        }),
      })],
    })
    await r.complete(REQ)
    expect(attempts()[0]).toContain('total_tokens=125')
  })

  it('reads not_reported — never 0 — when usage is absent', async () => {
    const r = createFailoverRouter({ providers: [provider({ name: 'groq' })] })
    await r.complete(REQ)
    expect(attempts()[0]).toContain('total_tokens=not_reported')
  })
})
