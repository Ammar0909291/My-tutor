import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { createFailoverRouter } from '@/lib/ai/providers/failoverRouter'
import { createYandexProvider } from '@/lib/ai/providers/yandex'
import type { AICompletionRequest, AIProvider } from '@/lib/ai/providers/types'
import {
  AITimeoutError, AIRateLimitError, AIQuotaError,
  AIServerError, AIEmptyResponseError,
} from '@/lib/ai/providers/types'
import { resetProviderMetrics, snapshotProviderMetrics } from '@/lib/ai/providers/metrics'

/**
 * Russian teaching language → YandexGPT (2026-08-04).
 *
 * The product decision under test: provider selection keys off the learner's
 * SELECTED TEACHING LANGUAGE and never off their country. The pre-52152a18
 * router keyed Yandex off `country === 'ru'`; these tests exist to make that
 * regression impossible to reintroduce silently.
 */

const ALL_KEYS = [
  'YANDEX_API_KEY', 'YANDEX_FOLDER_ID', 'YANDEX_MODEL',
  'GEMINI_API_KEY', 'OPENROUTER_API_KEY', 'GROQ_API_KEY', 'AI_PROVIDER_MODE',
] as const

const saved: Record<string, string | undefined> = {}

beforeEach(() => {
  for (const k of ALL_KEYS) saved[k] = process.env[k]
  // Every provider credentialed, so chain composition reflects LANGUAGE only
  // and never an incidentally-missing key.
  process.env.YANDEX_API_KEY = 'y-key'
  process.env.YANDEX_FOLDER_ID = 'y-folder'
  process.env.GEMINI_API_KEY = 'g-key'
  process.env.OPENROUTER_API_KEY = 'o-key'
  process.env.GROQ_API_KEY = 'q-key'
  // Gemini-only is once again an explicit opt-IN diagnostic (reverted
  // 2026-08-20, owner-authorized, after Gemini alone hit a rate-limit
  // outage with nothing to fail over to). The full chain — Groq primary for
  // the default chain, Yandex primary for Russian — is once again what an
  // unset AI_PROVIDER_MODE resolves to, so these tests no longer need to opt
  // in; deleting the explicit set is deliberate, not an oversight — it
  // proves the chain these tests protect IS the default again, not merely
  // reachable behind a flag. The single-provider escape hatch is pinned
  // separately, in aiDefaultProviderChain.test.ts / aiAttemptTelemetry.test.ts.
  delete process.env.AI_PROVIDER_MODE
  vi.resetModules()
})

afterEach(() => {
  for (const k of ALL_KEYS) {
    if (saved[k] === undefined) delete process.env[k]
    else process.env[k] = saved[k]
  }
  vi.restoreAllMocks()
})

async function chainFor(lang?: 'ru' | 'en' | 'hi'): Promise<string[]> {
  vi.resetModules()
  const { getAIRouter } = await import('@/lib/ai/router')
  return getAIRouter(lang).providerNames
}

// ─── 1. Russian selects YandexGPT first ──────────────────────────────────────

describe('Russian teaching language selects YandexGPT first', () => {
  it('ru chain is yandex → gemini → openrouter → groq, in that exact order', async () => {
    expect(await chainFor('ru')).toEqual(['yandex', 'gemini', 'openrouter', 'groq'])
  })

  it('yandex is the PRIMARY tier, not merely present in the chain', async () => {
    const chain = await chainFor('ru')
    expect(chain[0]).toBe('yandex')
  })

  it('routeAI with lang="ru" reaches the yandex-headed chain', async () => {
    vi.resetModules()
    const seen: string[] = []
    vi.doMock('@/lib/ai/providers/yandex', () => ({
      createYandexProvider: () => ({
        name: 'yandex',
        complete: async () => { seen.push('yandex'); return { text: 'привет', finishReason: 'ALTERNATIVE_STATUS_FINAL', provider: 'yandex' } },
        healthCheck: async () => true,
      }),
    }))
    const { routeAI } = await import('@/lib/ai/router')
    const r = await routeAI([{ role: 'user', content: 'привет' }], 'sys', 'in', 800, 'ru')
    expect(seen).toEqual(['yandex'])
    expect(r.provider).toBe('yandex')
  })
})

// ─── 2-4. Failover chain, tier by tier ───────────────────────────────────────

function failing(name: string, err: Error): AIProvider {
  return { name, complete: async () => { throw err }, healthCheck: async () => true }
}
function succeeding(name: string): AIProvider {
  return {
    name,
    complete: async () => ({ text: `${name} ok`, finishReason: 'stop', provider: name }),
    healthCheck: async () => true,
  }
}
const REQ: AICompletionRequest = {
  messages: [{ role: 'user', content: 'привет' }],
  systemPrompt: 'учитель',
  maxTokens: 800,
  temperature: 0.7,
}

describe('Russian failover chain degrades one tier at a time', () => {
  it('Yandex failure falls back to Gemini', async () => {
    const r = createFailoverRouter({
      providers: [
        failing('yandex', new AIServerError('yandex', 500)),
        succeeding('gemini'), succeeding('openrouter'), succeeding('groq'),
      ],
      disableSameProviderRetry: true,
    })
    const out = await r.complete(REQ)
    expect(out.provider).toBe('gemini')
  })

  it('Yandex + Gemini failure falls back to OpenRouter', async () => {
    const r = createFailoverRouter({
      providers: [
        failing('yandex', new AITimeoutError('yandex')),
        failing('gemini', new AIServerError('gemini', 503)),
        succeeding('openrouter'), succeeding('groq'),
      ],
      disableSameProviderRetry: true,
    })
    expect((await r.complete(REQ)).provider).toBe('openrouter')
  })

  it('Yandex + Gemini + OpenRouter failure falls back to Groq', async () => {
    const r = createFailoverRouter({
      providers: [
        failing('yandex', new AIRateLimitError('yandex')),
        failing('gemini', new AITimeoutError('gemini')),
        failing('openrouter', new AIServerError('openrouter', 500)),
        succeeding('groq'),
      ],
      disableSameProviderRetry: true,
    })
    expect((await r.complete(REQ)).provider).toBe('groq')
  })

  it('the whole Russian chain exhausting rethrows the LAST error, never a silent success', async () => {
    const last = new AIServerError('groq', 500)
    const r = createFailoverRouter({
      providers: [
        failing('yandex', new AITimeoutError('yandex')),
        failing('gemini', new AITimeoutError('gemini')),
        failing('openrouter', new AITimeoutError('openrouter')),
        failing('groq', last),
      ],
      disableSameProviderRetry: true,
    })
    await expect(r.complete(REQ)).rejects.toBe(last)
  })

  it('every tier is attempted exactly once — no duplicated Yandex attempt', async () => {
    const calls: string[] = []
    const count = (name: string, err: Error): AIProvider => ({
      name,
      complete: async () => { calls.push(name); throw err },
      healthCheck: async () => true,
    })
    const r = createFailoverRouter({
      providers: [
        count('yandex', new AITimeoutError('yandex')),
        count('gemini', new AITimeoutError('gemini')),
        count('openrouter', new AITimeoutError('openrouter')),
        succeeding('groq'),
      ],
      disableSameProviderRetry: true,
    })
    await r.complete(REQ)
    expect(calls).toEqual(['yandex', 'gemini', 'openrouter'])
  })
})

// ─── 5. Non-Russian languages never select YandexGPT ─────────────────────────

describe('Non-Russian languages never select YandexGPT', () => {
  it('English chain excludes yandex', async () => {
    expect(await chainFor('en')).toEqual(['groq', 'gemini', 'openrouter'])
  })

  it('Hindi chain excludes yandex', async () => {
    expect(await chainFor('hi')).toEqual(['groq', 'gemini', 'openrouter'])
  })

  it('omitted language (JSON/internal callers) excludes yandex', async () => {
    expect(await chainFor(undefined)).toEqual(['groq', 'gemini', 'openrouter'])
  })

  it('yandex never appears for a non-Russian language even with credentials set', async () => {
    for (const lang of ['en', 'hi', undefined] as const) {
      expect(await chainFor(lang), `lang=${lang}`).not.toContain('yandex')
    }
  })

  it('routeJSON (no language) never routes through yandex', async () => {
    vi.resetModules()
    let yandexCalled = false
    vi.doMock('@/lib/ai/providers/yandex', () => ({
      createYandexProvider: () => ({
        name: 'yandex',
        complete: async () => { yandexCalled = true; return { text: '{}', finishReason: 'stop', provider: 'yandex' } },
        healthCheck: async () => true,
      }),
    }))
    vi.doMock('@/lib/ai/providers/groq', () => ({
      createGroqProvider: () => ({
        name: 'groq',
        complete: async () => ({ text: '{"ok":true}', finishReason: 'stop', provider: 'groq' }),
        healthCheck: async () => true,
      }),
    }))
    const { routeJSON } = await import('@/lib/ai/router')
    expect(await routeJSON('give me json')).toEqual({ ok: true })
    expect(yandexCalled).toBe(false)
  })
})

// ─── 6-7. Country never routes; teaching language alone routes ───────────────

describe('Country alone never changes provider selection', () => {
  it('chainKeyForLanguage takes no country argument at all', async () => {
    const { chainKeyForLanguage } = await import('@/lib/ai/router')
    // Arity is the structural guarantee: a country cannot influence a function
    // that cannot receive one.
    expect(chainKeyForLanguage.length).toBe(1)
  })

  it('Russian language + non-Russian country still selects yandex first', async () => {
    for (const country of ['in', 'pl', 'us', 'ru', '']) {
      vi.resetModules()
      const seen: string[] = []
      vi.doMock('@/lib/ai/providers/yandex', () => ({
        createYandexProvider: () => ({
          name: 'yandex',
          complete: async () => { seen.push('yandex'); return { text: 'ok', finishReason: 'stop', provider: 'yandex' } },
          healthCheck: async () => true,
        }),
      }))
      const { routeAI } = await import('@/lib/ai/router')
      const r = await routeAI([{ role: 'user', content: 'q' }], 'sys', country, 800, 'ru')
      expect(r.provider, `country=${country}`).toBe('yandex')
      expect(seen, `country=${country}`).toEqual(['yandex'])
      vi.doUnmock('@/lib/ai/providers/yandex')
    }
  })

  it('English language + country "ru" does NOT select yandex', async () => {
    vi.resetModules()
    let yandexCalled = false
    vi.doMock('@/lib/ai/providers/yandex', () => ({
      createYandexProvider: () => ({
        name: 'yandex',
        complete: async () => { yandexCalled = true; return { text: 'x', finishReason: 'stop', provider: 'yandex' } },
        healthCheck: async () => true,
      }),
    }))
    // Groq is primary for the default (non-Russian) chain — mocked so this
    // stays a network-free unit test rather than accidentally proving the
    // point via a real HTTP call.
    vi.doMock('@/lib/ai/providers/groq', () => ({
      createGroqProvider: () => ({
        name: 'groq',
        complete: async () => ({ text: 'english answer', finishReason: 'stop', provider: 'groq' }),
        healthCheck: async () => true,
      }),
    }))
    const { routeAI } = await import('@/lib/ai/router')
    const r = await routeAI([{ role: 'user', content: 'q' }], 'sys', 'ru', 800, 'en')
    expect(r.provider).toBe('groq')
    expect(yandexCalled).toBe(false)
  })

  it('teaching language ALONE determines the chain — country varies, chain does not', async () => {
    const { chainKeyForLanguage } = await import('@/lib/ai/router')
    expect(chainKeyForLanguage('ru')).toBe('ru')
    expect(chainKeyForLanguage('en')).toBe('default')
    expect(chainKeyForLanguage('hi')).toBe('default')
    expect(chainKeyForLanguage(undefined)).toBe('default')
  })
})

// ─── 8. TTS and LLM use the same language signal ─────────────────────────────

describe('TTS and LLM key off the same language signal', () => {
  it('the TTS route selects Yandex on lang === "ru", not on country', async () => {
    const src = await import('node:fs').then((fs) =>
      fs.readFileSync('src/app/api/tts/route.ts', 'utf-8'))
    // The Yandex TTS branch is language-keyed...
    expect(src).toMatch(/lang === 'ru'/)
    // ...and the request body destructures `lang`, not `country`.
    expect(src).toMatch(/const \{ text, lang = 'en'/)
  })

  it('the LLM router selects Yandex on the same "ru" language value', async () => {
    const { chainKeyForLanguage } = await import('@/lib/ai/router')
    expect(chainKeyForLanguage('ru')).toBe('ru')
    expect((await chainFor('ru'))[0]).toBe('yandex')
  })

  it('both surfaces agree for every teaching language the app supports', async () => {
    const { chainKeyForLanguage } = await import('@/lib/ai/router')
    // 'ru' is the ONLY value that reaches a Yandex provider on either surface.
    const yandexLangs = (['ru', 'en', 'hi'] as const).filter(
      (l) => chainKeyForLanguage(l) === 'ru')
    expect(yandexLangs).toEqual(['ru'])
  })
})

// ─── 9. Metrics / logging still identify the active provider ─────────────────

describe('Metrics and logging identify YandexGPT as the active provider', () => {
  beforeEach(() => resetProviderMetrics())

  it('a successful yandex turn is recorded under the "yandex" key', async () => {
    const r = createFailoverRouter({ providers: [succeeding('yandex')], disableSameProviderRetry: true })
    await r.complete(REQ)
    const snap = snapshotProviderMetrics()
    expect(snap.summary.yandex.requests).toBe(1)
    expect(snap.summary.yandex.successes).toBe(1)
  })

  it('a yandex failure is recorded and counted as a failover', async () => {
    const r = createFailoverRouter({
      providers: [failing('yandex', new AITimeoutError('yandex')), succeeding('gemini')],
      disableSameProviderRetry: true,
    })
    await r.complete(REQ)
    const snap = snapshotProviderMetrics()
    expect(snap.providers.yandex.failures).toBe(1)
    expect(snap.providers.yandex.timeouts).toBe(1)
    expect(snap.summary.gemini.successes).toBe(1)
    expect(snap.failovers).toBe(1)
  })

  it('the per-attempt telemetry line names yandex and its model', async () => {
    const lines: string[] = []
    vi.spyOn(console, 'log').mockImplementation((m?: any) => { lines.push(String(m)) })
    const r = createFailoverRouter({
      providers: [{ ...succeeding('yandex'), model: 'yandexgpt-lite/latest' }],
      disableSameProviderRetry: true,
    })
    await r.complete(REQ)
    const attempt = lines.find((l) => l.startsWith('[ai/attempt]'))
    expect(attempt).toBeTruthy()
    expect(attempt).toContain('provider=yandex')
    expect(attempt).toContain('model=yandexgpt-lite/latest')
  })

  it('routeAI returns provider="yandex" so the UI badge can label the turn', async () => {
    vi.resetModules()
    vi.doMock('@/lib/ai/providers/yandex', () => ({
      createYandexProvider: () => ({
        name: 'yandex',
        complete: async () => ({ text: 'ответ', finishReason: 'stop', provider: 'yandex' }),
        healthCheck: async () => true,
      }),
    }))
    const { routeAI } = await import('@/lib/ai/router')
    expect((await routeAI([{ role: 'user', content: 'q' }], 's', 'in', 800, 'ru')).provider).toBe('yandex')
  })
})

// ─── 10. Non-Russian chain is unchanged ──────────────────────────────────────

describe('Default (non-Russian) provider chain is Groq-primary (2026-08-20)', () => {
  it('the default chain is Groq -> Gemini -> OpenRouter', async () => {
    expect(await chainFor('en')).toEqual(['groq', 'gemini', 'openrouter'])
  })

  it('missing keys are still filtered out of the default chain', async () => {
    process.env.OPENROUTER_API_KEY = ''
    expect(await chainFor('en')).toEqual(['groq', 'gemini'])
  })

  it('gemini_only isolation mode still wins over language routing', async () => {
    process.env.AI_PROVIDER_MODE = 'gemini_only'
    expect(await chainFor('ru')).toEqual(['gemini'])
    expect(await chainFor('en')).toEqual(['gemini'])
  })

  it('an unconfigured Yandex drops the tier — Russian starts at Gemini, chain intact', async () => {
    process.env.YANDEX_API_KEY = ''
    expect(await chainFor('ru')).toEqual(['gemini', 'openrouter', 'groq'])
  })

  it('YANDEX_API_KEY without YANDEX_FOLDER_ID also drops the tier (URI cannot be formed)', async () => {
    process.env.YANDEX_FOLDER_ID = ''
    expect(await chainFor('ru')).toEqual(['gemini', 'openrouter', 'groq'])
  })
})

// ─── Provider implementation contract ────────────────────────────────────────

describe('YandexGPT provider implements the shared AIProvider contract', () => {
  const provider = () => createYandexProvider('k', 'folder', 'yandexgpt-lite/latest')

  function mockFetch(impl: (url: string, init: any) => Promise<any>) {
    vi.stubGlobal('fetch', vi.fn(impl as any))
  }
  const okBody = (text: string) => ({
    ok: true,
    status: 200,
    json: async () => ({
      result: {
        alternatives: [{ message: { role: 'assistant', text }, status: 'ALTERNATIVE_STATUS_FINAL' }],
        usage: { inputTextTokens: '42', completionTokens: '7', totalTokens: '49' },
      },
    }),
  })

  it('name and model are exposed for telemetry', () => {
    expect(provider().name).toBe('yandex')
    expect(provider().model).toBe('yandexgpt-lite/latest')
  })

  it('returns text, finishReason and parsed numeric usage', async () => {
    mockFetch(async () => okBody('привет'))
    const out = await provider().complete(REQ)
    expect(out.text).toBe('привет')
    expect(out.provider).toBe('yandex')
    expect(out.finishReason).toBe('ALTERNATIVE_STATUS_FINAL')
    // Yandex reports token counts as STRINGS — they must arrive as numbers.
    expect(out.usage).toEqual({ promptTokens: 42, completionTokens: 7 })
  })

  it('sends the folder-scoped model URI and Api-Key auth', async () => {
    let captured: any
    mockFetch(async (_url, init) => { captured = JSON.parse(init.body); return okBody('ok') })
    await provider().complete(REQ)
    expect(captured.modelUri).toBe('gpt://folder/yandexgpt-lite/latest')
    expect(captured.completionOptions.maxTokens).toBe('800')
  })

  it('maps the system prompt to a system message and preserves roles', async () => {
    let captured: any
    mockFetch(async (_url, init) => { captured = JSON.parse(init.body); return okBody('ok') })
    await provider().complete({
      ...REQ,
      messages: [
        { role: 'user', content: 'a' },
        { role: 'assistant', content: 'b' },
        { role: 'user', content: 'c' },
      ],
    })
    expect(captured.messages).toEqual([
      { role: 'system', text: 'учитель' },
      { role: 'user', text: 'a' },
      { role: 'assistant', text: 'b' },
      { role: 'user', text: 'c' },
    ])
  })

  it('does NOT re-truncate history the caller already windowed', async () => {
    let captured: any
    mockFetch(async (_url, init) => { captured = JSON.parse(init.body); return okBody('ok') })
    const twenty = Array.from({ length: 20 }, (_, i) => ({ role: 'user' as const, content: `m${i}` }))
    await provider().complete({ ...REQ, messages: twenty })
    // 20 messages + 1 system. The old implementation sliced to 6 here.
    expect(captured.messages).toHaveLength(21)
  })

  it('throws AIEmptyResponseError on an empty completion', async () => {
    mockFetch(async () => okBody(''))
    await expect(provider().complete(REQ)).rejects.toBeInstanceOf(AIEmptyResponseError)
  })

  it('classifies 429 as retryable rate limit, and quota text as non-retryable', async () => {
    mockFetch(async () => ({ ok: false, status: 429, text: async () => 'too many requests' }))
    const rl = await provider().complete(REQ).catch((e) => e)
    expect(rl).toBeInstanceOf(AIRateLimitError)
    expect(rl.retryable).toBe(true)

    mockFetch(async () => ({ ok: false, status: 429, text: async () => 'quota exhausted' }))
    const q = await provider().complete(REQ).catch((e) => e)
    expect(q).toBeInstanceOf(AIQuotaError)
    expect(q.retryable).toBe(false)
  })

  it('classifies 5xx as a retryable server error', async () => {
    mockFetch(async () => ({ ok: false, status: 503, text: async () => 'unavailable' }))
    const e = await provider().complete(REQ).catch((x) => x)
    expect(e).toBeInstanceOf(AIServerError)
    expect(e.provider).toBe('yandex')
  })

  it('classifies 401 as a non-retryable failure that still fails over', async () => {
    mockFetch(async () => ({ ok: false, status: 401, text: async () => 'bad key' }))
    const e = await provider().complete(REQ).catch((x) => x)
    expect(e).toBeInstanceOf(AIServerError)
    expect(e.statusCode).toBe(401)
  })

  it('classifies an aborted request as AITimeoutError', async () => {
    mockFetch(async () => { const err: any = new Error('aborted'); err.name = 'TimeoutError'; throw err })
    await expect(provider().complete(REQ)).rejects.toBeInstanceOf(AITimeoutError)
  })

  it('never throws a raw provider error type that failover cannot classify', async () => {
    mockFetch(async () => { throw new Error('fetch failed') })
    const e = await provider().complete(REQ).catch((x) => x)
    expect(e.provider).toBe('yandex')
  })

  it('healthCheck returns false rather than throwing when the API is down', async () => {
    mockFetch(async () => { throw new Error('fetch failed') })
    expect(await provider().healthCheck()).toBe(false)
  })

  it('omits usage entirely when the API reports none — never a fabricated zero', async () => {
    mockFetch(async () => ({
      ok: true, status: 200,
      json: async () => ({ result: { alternatives: [{ message: { text: 'x' }, status: 'FINAL' }] } }),
    }))
    expect((await provider().complete(REQ)).usage).toBeUndefined()
  })
})
