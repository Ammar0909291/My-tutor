import { describe, it, expect } from 'vitest'
import { readFileSync, readdirSync, existsSync } from 'node:fs'
import { join } from 'node:path'

/**
 * Guards the answer to "which provider serves a Russian learner?" so it cannot
 * rot again — in either direction.
 *
 * History this file exists to protect: 52152a18 replaced Groq/YandexGPT with
 * Gemini + OpenRouter, but the chat route and CLAUDE.md kept describing a
 * YandexGPT integration that no longer existed. This file was written to pin
 * the code as the source of truth, and it said so explicitly: "If YandexGPT is
 * genuinely reinstated, the assertions here are the checklist of what has to be
 * updated with it."
 *
 * 2026-08-04: YandexGPT WAS genuinely reinstated, as an intentional product
 * decision, so this file was walked as that checklist and inverted. What is
 * guarded now is the NEW truth, and one invariant that did not change: routing
 * keys off the learner's teaching LANGUAGE and never off their country.
 */

const AI_DIR = join(process.cwd(), 'src/lib/ai')
const PROVIDERS_DIR = join(AI_DIR, 'providers')

/** Router source with comments removed, so assertions about live behaviour are
 *  never satisfied (or broken) by explanatory prose. */
function stripComments(src: string): string {
  return src.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^[ \t]*\/\/.*$/gm, '')
}

/** The `candidates` array literal in router.ts — the chain itself. */
function candidatesBlock(): string {
  const src = readFileSync(join(AI_DIR, 'router.ts'), 'utf8')
  const start = src.indexOf('const candidates:')
  expect(start, 'router.ts must declare a `candidates` chain').toBeGreaterThan(-1)
  const end = src.indexOf('\n  ]', start)
  expect(end, 'the `candidates` array must be terminated').toBeGreaterThan(start)
  return src.slice(start, end)
}

describe('AI provider chain — the code is the source of truth', () => {
  it('ships exactly the four providers the chains claim', () => {
    const files = readdirSync(PROVIDERS_DIR).filter((f) => f.endsWith('.ts')).sort()
    expect(files).toContain('gemini.ts')
    expect(files).toContain('openrouter.ts')
    expect(files).toContain('groq.ts')
    expect(files).toContain('yandex.ts')
  })

  it('has a YandexGPT LLM provider, wired into the router', () => {
    expect(existsSync(join(PROVIDERS_DIR, 'yandex.ts'))).toBe(true)
    const router = readFileSync(join(AI_DIR, 'router.ts'), 'utf8')
    expect(router).toMatch(/createYandexProvider/)
    expect(router).toMatch(/from '\.\/providers\/yandex'/)
  })

  it('the router assembles Yandex -> Gemini -> OpenRouter -> Groq in that order', () => {
    // Scoped to the `candidates` array, which IS the chain. Searching the whole
    // file would match the gemini_only diagnostic block, which legitimately
    // constructs Gemini earlier and is not part of this ordering.
    const chain = candidatesBlock()
    const yandex = chain.indexOf('createYandexProvider(YANDEX_API_KEY')
    const gemini = chain.indexOf('createGeminiProvider(GEMINI_API_KEY')
    const openrouter = chain.indexOf('createOpenRouterProvider(OPENROUTER_API_KEY')
    const groq = chain.indexOf('createGroqProvider(GROQ_API_KEY')
    expect(yandex).toBeGreaterThan(-1)
    expect(gemini).toBeGreaterThan(yandex)
    expect(openrouter).toBeGreaterThan(gemini)
    expect(groq).toBeGreaterThan(openrouter)
  })

  it('the Yandex tier is gated on the teaching language, not on a country value', () => {
    const router = readFileSync(join(AI_DIR, 'router.ts'), 'utf8')
    // The chain key is derived from the language and nothing else.
    expect(router).toMatch(/export function chainKeyForLanguage\(/)
    expect(router).toMatch(/lang === 'ru' \? 'ru' : 'default'/)
    // Yandex is added on the chain key, never on a country comparison.
    expect(candidatesBlock()).toMatch(/chain === 'ru'/)
    expect(candidatesBlock()).not.toMatch(/\bcountry\b/)
  })

  it('no provider routes on `country` — it is documented as not a routing signal', () => {
    const router = readFileSync(join(AI_DIR, 'router.ts'), 'utf8')
    // country survives as a log field only. The marker string keeps the
    // intent legible at the one place a future edit would break it.
    expect(router).toContain('NOT A ROUTING SIGNAL')
    // Asserted against CODE ONLY — the prose deliberately mentions the old
    // `country === 'ru'` rule to explain what was replaced, and that mention
    // must not be mistaken for a live branch.
    const code = stripComments(router)
    expect(code).not.toMatch(/country\s*===/)
    expect(code).not.toMatch(/if\s*\(\s*country\b/)

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
    // The pre-52152a18 country-based claim must never come back.
    expect(md).not.toMatch(/AI: Groq primary .*YandexGPT fallback/)
    // Nor may the now-superseded "no Yandex provider" claim be stated as
    // current fact — it may only appear as history.
    expect(md).not.toMatch(/^\s*- AI .*There is NO YandexGPT LLM provider/m)
    // The live architecture: language-selected, explicitly not country.
    expect(md).toMatch(/YandexGPT/)
    expect(md).toMatch(/teaching language/i)
    expect(md).toMatch(/never their country|not their country|NOTHING else/i)
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
