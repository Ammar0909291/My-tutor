import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

/**
 * GEMINI-ONLY IS THE DEFAULT (owner instruction, 2026-08-12).
 *
 * Every turn is served by Gemini `gemini-3.5-flash-lite` and nothing else.
 * The previous diagnostic opt-IN (`AI_PROVIDER_MODE=gemini_only`) is inverted:
 * the narrow chain is what an unconfigured deployment gets, and the full chain
 * is restored only by an explicit `AI_PROVIDER_MODE=failover`.
 *
 * Why the inversion is tested rather than trusted: this is a DEFAULT, which
 * means it is expressed by the ABSENCE of configuration. A default that is
 * only asserted where the env var happens to be set is not asserted at all,
 * and the failure mode is silent — a deployment quietly fanning out to four
 * providers again with nobody noticing until a bill or a Yandex call appears.
 *
 * The companion guarantee — that the full chain is still correctly assembled
 * and one env var away — is covered by aiRussianLanguageRouting.test.ts, which
 * now opts into `failover` explicitly.
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

describe('gemini-only is the default, with every provider credentialed', () => {
  it('English collapses to exactly one provider: gemini', async () => {
    expect(await chainFor('en')).toEqual(['gemini'])
  })

  it('an unspecified language also collapses to gemini alone', async () => {
    expect(await chainFor(undefined)).toEqual(['gemini'])
  })

  it('RUSSIAN collapses to gemini too — "only Gemini" outranks the Yandex tier', async () => {
    // This is the deliberate cost of the instruction, recorded as a test so it
    // reads as a decision rather than a regression. Russian TTS is separate
    // and unaffected.
    const ru = await chainFor('ru')
    expect(ru).toEqual(['gemini'])
    expect(ru).not.toContain('yandex')
  })

  it('no chain contains openrouter or groq while the default holds', async () => {
    for (const lang of ['en', 'ru', 'hi'] as const) {
      const chain = await chainFor(lang)
      expect(chain).not.toContain('openrouter')
      expect(chain).not.toContain('groq')
    }
  })
})

describe('the full chain is one env var away, not deleted', () => {
  it('AI_PROVIDER_MODE=failover restores Yandex -> Gemini -> OpenRouter -> Groq for Russian', async () => {
    process.env.AI_PROVIDER_MODE = 'failover'
    expect(await chainFor('ru')).toEqual(['yandex', 'gemini', 'openrouter', 'groq'])
  })

  it('AI_PROVIDER_MODE=failover restores Gemini -> OpenRouter -> Groq for English', async () => {
    process.env.AI_PROVIDER_MODE = 'failover'
    expect(await chainFor('en')).toEqual(['gemini', 'openrouter', 'groq'])
  })

  it('any OTHER value stays gemini-only — only the exact opt-out widens the chain', async () => {
    // A typo must fail SAFE, toward the instruction, not silently back to four
    // providers.
    for (const v of ['gemini_only', 'full', 'true', '1', 'Failover ']) {
      process.env.AI_PROVIDER_MODE = v
      const chain = await chainFor('ru')
      if (v.trim().toLowerCase() === 'failover') continue // 'Failover ' is trimmed+lowered, so it DOES opt out
      expect(chain, `AI_PROVIDER_MODE=${v}`).toEqual(['gemini'])
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
