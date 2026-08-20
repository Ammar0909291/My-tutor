import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

/**
 * GROQ-PRIMARY IS THE DEFAULT (owner-authorized reversal, 2026-08-20).
 *
 * Formerly `aiGeminiOnlyDefault.test.ts`, pinning the 2026-08-12 gemini-only
 * default. That default was reversed the same day it caused a real outage:
 * Gemini alone had nothing to fail over to, Gemini started returning 429s in
 * production, and GROQ_API_KEY had been configured and unused the whole time.
 *
 * The new default (unset `AI_PROVIDER_MODE`, or any value other than the
 * exact `gemini_only` escape hatch): the full multi-provider chain, with the
 * default (non-Russian) chain now Groq-primary / Gemini-fallback /
 * OpenRouter-third. Gemini is NOT removed — it is fully wired and reachable,
 * just no longer first. `AI_PROVIDER_MODE=gemini_only` is kept as a
 * diagnostic escape hatch (the old opt-in spelling, now reinstated as the
 * one non-default value), symmetric with the old `failover` opt-out it
 * replaces.
 *
 * Why the default is tested rather than trusted: this is a DEFAULT, which
 * means it is expressed by the ABSENCE of configuration. A default that is
 * only asserted where the env var happens to be set is not asserted at all.
 *
 * The Russian chain's own composition (Yandex -> Gemini -> OpenRouter ->
 * Groq, unreordered) is covered by aiRussianLanguageRouting.test.ts.
 */
const KEYS = [
  'YANDEX_API_KEY', 'YANDEX_FOLDER_ID', 'GEMINI_API_KEY',
  'OPENROUTER_API_KEY', 'GROQ_API_KEY', 'AI_PROVIDER_MODE', 'GEMINI_MODEL',
] as const

const saved: Record<string, string | undefined> = {}

beforeEach(() => {
  for (const k of KEYS) saved[k] = process.env[k]
  // EVERY provider credentialed. If the chain still collapses to Gemini, that
  // is the mode deciding it — not an incidentally missing key, which is the
  // one way this test could pass for the wrong reason.
  process.env.YANDEX_API_KEY = 'y-key'
  process.env.YANDEX_FOLDER_ID = 'y-folder'
  process.env.GEMINI_API_KEY = 'g-key'
  process.env.OPENROUTER_API_KEY = 'o-key'
  process.env.GROQ_API_KEY = 'q-key'
  delete process.env.AI_PROVIDER_MODE
  delete process.env.GEMINI_MODEL
  vi.resetModules()
})

afterEach(() => {
  for (const k of KEYS) {
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

describe('Groq-primary is the default, with every provider credentialed', () => {
  it('English chain is Groq -> Gemini -> OpenRouter', async () => {
    expect(await chainFor('en')).toEqual(['groq', 'gemini', 'openrouter'])
  })

  it('an unspecified language also defaults to the Groq-primary chain', async () => {
    expect(await chainFor(undefined)).toEqual(['groq', 'gemini', 'openrouter'])
  })

  it('Hindi also defaults to the Groq-primary chain', async () => {
    expect(await chainFor('hi')).toEqual(['groq', 'gemini', 'openrouter'])
  })

  it('RUSSIAN keeps YandexGPT primary — the default-chain reversal does not touch it', async () => {
    expect(await chainFor('ru')).toEqual(['yandex', 'gemini', 'openrouter', 'groq'])
  })

  it('Gemini is present, second, and reachable — not removed', async () => {
    for (const lang of ['en', 'ru', 'hi'] as const) {
      const chain = await chainFor(lang)
      expect(chain, `lang=${lang}`).toContain('gemini')
    }
  })
})

describe('gemini_only remains an opt-in diagnostic escape hatch, not deleted', () => {
  it('AI_PROVIDER_MODE=gemini_only collapses English to gemini alone', async () => {
    process.env.AI_PROVIDER_MODE = 'gemini_only'
    expect(await chainFor('en')).toEqual(['gemini'])
  })

  it('AI_PROVIDER_MODE=gemini_only collapses Russian to gemini alone too', async () => {
    // Isolation mode outranks language routing — the diagnostic exists to
    // measure Gemini alone, so a Russian turn silently routed to YandexGPT
    // would corrupt that measurement exactly as a failover hop would.
    process.env.AI_PROVIDER_MODE = 'gemini_only'
    const ru = await chainFor('ru')
    expect(ru).toEqual(['gemini'])
    expect(ru).not.toContain('yandex')
  })

  it('is case- and whitespace-insensitive', async () => {
    for (const v of ['GEMINI_ONLY', ' gemini_only ', 'Gemini_Only']) {
      process.env.AI_PROVIDER_MODE = v
      expect(await chainFor('en'), `AI_PROVIDER_MODE=${JSON.stringify(v)}`).toEqual(['gemini'])
    }
  })

  it('any OTHER value — including the old "failover" opt-out spelling — stays on the default Groq-primary chain', async () => {
    // A typo, or a stale deployment still carrying the old opt-out value,
    // must fail SAFE toward the full chain, not toward single-provider
    // isolation.
    for (const v of ['failover', 'full', 'true', '1', 'gemini']) {
      process.env.AI_PROVIDER_MODE = v
      const chain = await chainFor('en')
      expect(chain, `AI_PROVIDER_MODE=${v}`).toEqual(['groq', 'gemini', 'openrouter'])
    }
  })
})

describe('the model is gemini-3.5-flash-lite', () => {
  it('defaults to gemini-3.5-flash-lite when GEMINI_MODEL is unset', async () => {
    const { resolveGeminiModel } = await import('@/lib/ai/router')
    expect(resolveGeminiModel(undefined)).toBe('gemini-3.5-flash-lite')
  })

  it('refuses a deprecated gemini-2.5-* override, which 404s on this key', async () => {
    const { resolveGeminiModel } = await import('@/lib/ai/router')
    expect(resolveGeminiModel('gemini-2.5-flash-lite')).toBe('gemini-3.5-flash-lite')
    expect(resolveGeminiModel('gemini-2.5-pro')).toBe('gemini-3.5-flash-lite')
  })
})
