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
