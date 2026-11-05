import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { createFailoverRouter } from '@/lib/ai/providers/failoverRouter'
import type { AICompletionRequest, AIProvider } from '@/lib/ai/providers/types'
import { AITimeoutError, AIRateLimitError, AIServerError } from '@/lib/ai/providers/types'
import { readFileSync, existsSync } from 'node:fs'

/**
 * Russian teaching language → the SAME Groq-first chain as every language (owner, 2026-11-05: "set Groq default for Russian, remove YandexGPT").
 *
 * Until then a Russian lesson ran on its own chain, YandexGPT -> Gemini -> OpenRouter -> Groq (restored 2026-08-04). That chain, the provider
 * (`providers/yandex.ts`) and the language-keyed branch are gone. Two things this file keeps pinned from the old one:
 *   - provider selection keys off the learner's TEACHING LANGUAGE and never off their country (and now the language does not change the chain at all);
 *   - Yandex SpeechKit text-to-speech is a different thing and still serves a Russian voice through /api/tts.
 */

const ALL_KEYS = ['YANDEX_API_KEY', 'YANDEX_FOLDER_ID', 'YANDEX_MODEL', 'GEMINI_API_KEY', 'OPENROUTER_API_KEY', 'GROQ_API_KEY', 'AI_PROVIDER_MODE'] as const
const saved: Record<string, string | undefined> = {}

beforeEach(() => {
  for (const k of ALL_KEYS) saved[k] = process.env[k]
  // Every LLM provider credentialed. The Yandex credentials stay SET on purpose: they still exist for SpeechKit, and must not pull Yandex back into the LLM chain.
  process.env.YANDEX_API_KEY = 'y-key'
  process.env.YANDEX_FOLDER_ID = 'y-folder'
  process.env.GEMINI_API_KEY = 'g-key'
  process.env.OPENROUTER_API_KEY = 'o-key'
  process.env.GROQ_API_KEY = 'q-key'
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

// ─── 1. Russian is Groq-first, like every language ───────────────────────────

describe('Russian teaching language selects Groq first', () => {
  it('ru chain is groq → gemini → openrouter, in that exact order', async () => {
    expect(await chainFor('ru')).toEqual(['groq', 'gemini', 'openrouter'])
  })

  it('groq is the PRIMARY tier for Russian, not merely present', async () => {
    expect((await chainFor('ru'))[0]).toBe('groq')
  })

  it('every language gets the identical chain (en, hi, ru, and callers that pass none)', async () => {
    const chains = await Promise.all((['ru', 'en', 'hi', undefined] as const).map((l) => chainFor(l)))
    for (const c of chains) expect(c).toEqual(['groq', 'gemini', 'openrouter'])
  })

  it('YandexGPT is gone from the LLM chain even with Yandex credentials set', async () => {
    for (const lang of ['ru', 'en', 'hi', undefined] as const) expect(await chainFor(lang), `lang=${lang}`).not.toContain('yandex')
  })

  it('routeAI with lang="ru" is answered by groq', async () => {
    vi.resetModules()
    const seen: string[] = []
    vi.doMock('@/lib/ai/providers/groq', () => ({
      createGroqProvider: () => ({
        name: 'groq',
        complete: async () => { seen.push('groq'); return { text: 'привет', finishReason: 'stop', provider: 'groq' } },
        healthCheck: async () => true,
      }),
    }))
    const { routeAI } = await import('@/lib/ai/router')
    const r = await routeAI([{ role: 'user', content: 'привет' }], 'sys', 'in', 800, 'ru')
    expect(seen).toEqual(['groq'])
    expect(r.provider).toBe('groq')
  })

  it('the Yandex LLM provider module and its export no longer exist', () => {
    expect(existsSync('src/lib/ai/providers/yandex.ts')).toBe(false)
    expect(readFileSync('src/lib/ai/providers/index.ts', 'utf8')).not.toMatch(/yandex/i)
    expect(readFileSync('src/lib/ai/router.ts', 'utf8')).not.toMatch(/createYandexProvider|providers\/yandex/)
  })
})

// ─── 2. Failover, tier by tier (generic providers: the chain's behaviour, not a vendor) ───

function failing(name: string, err: Error): AIProvider { return { name, complete: async () => { throw err }, healthCheck: async () => true } }
function succeeding(name: string): AIProvider {
  return { name, complete: async () => ({ text: `${name} ok`, finishReason: 'stop', provider: name }), healthCheck: async () => true }
}
const REQ: AICompletionRequest = { messages: [{ role: 'user', content: 'привет' }], systemPrompt: 'учитель', maxTokens: 800, temperature: 0.7 }

describe('the chain degrades one tier at a time', () => {
  it('Groq failure falls back to Gemini', async () => {
    const r = createFailoverRouter({ providers: [failing('groq', new AIServerError('groq', 500)), succeeding('gemini'), succeeding('openrouter')], disableSameProviderRetry: true })
    expect((await r.complete(REQ)).provider).toBe('gemini')
  })
  it('Groq + Gemini failure falls back to OpenRouter', async () => {
    const r = createFailoverRouter({ providers: [failing('groq', new AIRateLimitError('groq')), failing('gemini', new AIServerError('gemini', 503)), succeeding('openrouter')], disableSameProviderRetry: true })
    expect((await r.complete(REQ)).provider).toBe('openrouter')
  })
  it('the whole chain exhausting rethrows the LAST error, never a silent success', async () => {
    const last = new AIServerError('openrouter', 500)
    const r = createFailoverRouter({ providers: [failing('groq', new AITimeoutError('groq')), failing('gemini', new AITimeoutError('gemini')), failing('openrouter', last)], disableSameProviderRetry: true })
    await expect(r.complete(REQ)).rejects.toBe(last)
  })
})

// ─── 3. Country never routes; the credentials that remain are for TTS only ──

describe('Country never changes provider selection', () => {
  it('chainKeyForLanguage takes no country argument and returns one key for every language', async () => {
    const { chainKeyForLanguage } = await import('@/lib/ai/router')
    expect(chainKeyForLanguage.length).toBe(1)
    for (const l of ['ru', 'en', 'hi', undefined] as const) expect(chainKeyForLanguage(l)).toBe('default')
  })

  it('Russian language + any country is answered by groq; English + country "ru" too', async () => {
    for (const [country, lang] of [['in', 'ru'], ['pl', 'ru'], ['us', 'ru'], ['ru', 'ru'], ['', 'ru'], ['ru', 'en']] as const) {
      vi.resetModules()
      vi.doMock('@/lib/ai/providers/groq', () => ({
        createGroqProvider: () => ({ name: 'groq', complete: async () => ({ text: 'ok', finishReason: 'stop', provider: 'groq' }), healthCheck: async () => true }),
      }))
      const { routeAI } = await import('@/lib/ai/router')
      expect((await routeAI([{ role: 'user', content: 'q' }], 'sys', country, 800, lang)).provider, `country=${country} lang=${lang}`).toBe('groq')
      vi.doUnmock('@/lib/ai/providers/groq')
    }
  })

  it('Yandex SpeechKit is untouched: /api/tts still serves a Russian voice, keyed on the language', () => {
    const src = readFileSync('src/app/api/tts/route.ts', 'utf8')
    expect(src).toMatch(/lang === 'ru'/)
    expect(src).toMatch(/const \{ text, lang = 'en'/)
    expect(src).toMatch(/tts\.api\.cloud\.yandex\.net/)
  })
})

// ─── 4. Missing keys and the diagnostic mode ─────────────────────────────────

describe('Missing keys are filtered, and gemini_only still wins', () => {
  it('missing OpenRouter key is filtered out for Russian too', async () => {
    process.env.OPENROUTER_API_KEY = ''
    expect(await chainFor('ru')).toEqual(['groq', 'gemini'])
  })
  it('gemini_only isolation mode still wins over language', async () => {
    process.env.AI_PROVIDER_MODE = 'gemini_only'
    expect(await chainFor('ru')).toEqual(['gemini'])
    expect(await chainFor('en')).toEqual(['gemini'])
  })
  it('unset Yandex credentials change nothing for Russian (they were an LLM tier; now they are only TTS)', async () => {
    process.env.YANDEX_API_KEY = ''
    process.env.YANDEX_FOLDER_ID = ''
    expect(await chainFor('ru')).toEqual(['groq', 'gemini', 'openrouter'])
  })
})
