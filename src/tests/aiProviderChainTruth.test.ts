import { describe, it, expect } from 'vitest'
import { readFileSync, readdirSync, existsSync } from 'node:fs'
import { join } from 'node:path'

/**
 * Guards the ANSWER to "why isn't Russian using Yandex?" so it cannot rot again.
 *
 * It was stale documentation, not a bug. Commit 52152a18 ("feat(ai): production
 * AI provider layer") replaced Groq/YandexGPT with Gemini + OpenRouter; Groq was
 * later reinstated as a third tier and Yandex was not. But the chat route still
 * carried a comment reading "Route to YandexGPT whenever EITHER signal says
 * Russian", and CLAUDE.md still described Groq-primary-with-Yandex-fallback. Two
 * separate sources asserted a provider that does not exist, which is how an hour
 * gets spent looking for a broken integration that was deliberately deleted.
 *
 * These tests fail if the code and the description drift apart again — in
 * either direction. If YandexGPT is genuinely reinstated, the assertions here
 * are the checklist of what has to be updated with it.
 */

const AI_DIR = join(process.cwd(), 'src/lib/ai')
const PROVIDERS_DIR = join(AI_DIR, 'providers')

describe('AI provider chain — the code is the source of truth', () => {
  it('ships exactly the three providers the chain claims', () => {
    const files = readdirSync(PROVIDERS_DIR).filter((f) => f.endsWith('.ts')).sort()
    expect(files).toContain('gemini.ts')
    expect(files).toContain('openrouter.ts')
    expect(files).toContain('groq.ts')
  })

  it('has no YandexGPT LLM provider', () => {
    expect(existsSync(join(PROVIDERS_DIR, 'yandex.ts'))).toBe(false)
    const router = readFileSync(join(AI_DIR, 'router.ts'), 'utf8')
    // No Yandex provider may be constructed or imported by the router.
    expect(router).not.toMatch(/createYandexProvider|from '\.\/providers\/yandex'/)
  })

  it('the router assembles Gemini -> OpenRouter -> Groq in that order', () => {
    const router = readFileSync(join(AI_DIR, 'router.ts'), 'utf8')
    const gemini = router.indexOf('createGeminiProvider(GEMINI_API_KEY')
    const openrouter = router.indexOf('createOpenRouterProvider(OPENROUTER_API_KEY')
    const groq = router.indexOf('createGroqProvider(GROQ_API_KEY')
    expect(gemini).toBeGreaterThan(-1)
    expect(openrouter).toBeGreaterThan(gemini)
    expect(groq).toBeGreaterThan(openrouter)
  })

  it('no provider routes on `country` — it is vestigial and documented as such', () => {
    const router = readFileSync(join(AI_DIR, 'router.ts'), 'utf8')
    // Its only surviving use is the log line. If a real routing decision is
    // ever added, this test should be updated deliberately.
    const uses = (router.match(/\bcountry\b/g) ?? []).length
    expect(uses).toBeLessThanOrEqual(4) // signature, doc mentions, one console.log
    expect(router).toContain('VESTIGIAL')

    for (const f of readdirSync(PROVIDERS_DIR).filter((n) => n.endsWith('.ts'))) {
      const src = readFileSync(join(PROVIDERS_DIR, f), 'utf8')
      expect(src, `${f} must not read country`).not.toMatch(/\bcountry\b/)
    }
  })

  it('the chat route no longer claims Russian traffic goes to YandexGPT', () => {
    const route = readFileSync(join(process.cwd(), 'src/app/api/learn/chat/route.ts'), 'utf8')
    expect(route).not.toContain('Route to YandexGPT whenever')
  })

  it('CLAUDE.md describes the chain that actually exists', () => {
    const md = readFileSync(join(process.cwd(), 'CLAUDE.md'), 'utf8')
    // The stale claim must not come back.
    expect(md).not.toMatch(/AI: Groq primary .*YandexGPT fallback/)
    expect(md).toMatch(/NO YandexGPT LLM provider/)
  })
})

describe('Yandex text-to-speech is a separate, still-live integration', () => {
  it('Russian TTS is gated on the language and the Yandex credentials', () => {
    const tts = readFileSync(join(process.cwd(), 'src/app/api/tts/route.ts'), 'utf8')
    expect(tts).toContain('YANDEX_API_KEY')
    expect(tts).toContain('YANDEX_FOLDER_ID')
    // Gated on the teaching LANGUAGE, not the learner's country — 87d7a975.
    expect(tts).toMatch(/lang === 'ru' && process\.env\.YANDEX_API_KEY/)
  })

  it('removing the LLM provider did not remove the voice integration', () => {
    // The distinction that makes "Russian doesn't use Yandex" only half true.
    expect(existsSync(join(process.cwd(), 'src/app/api/tts/route.ts'))).toBe(true)
  })
})
