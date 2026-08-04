import { describe, it, expect, vi, afterEach } from 'vitest'
import { readFileSync } from 'fs'
import { join } from 'path'
import { degradedCopy, degradedRung } from '@/lib/teaching/degradedCopy'
import { renderOutage, renderFallback, chooseFallback } from '@/lib/kernel/verifier/templateFallback'
import { pickRecoveryMessage } from '@/lib/learn/tutorRecovery'
import { makeLlmDriver } from '@/lib/kernel/stages/render'

/**
 * P19 finalization — three verified audit gaps.
 *
 * A production transcript showed two different degraded messages reaching one
 * learner in one session. The audit found three causes: a client that absorbed
 * provider failures into canned text, a render driver that labelled that text
 * provider:'llm', and two independent copy ladders on opposite sides of the
 * HTTP boundary.
 */

const CTX = { register: 'beginner' as const, learnerText: 'Got it' }
const BASE = chooseFallback(['SHOW_EASIEST_LEGAL'])

// ── GAP 3: one catalog, two channels ───────────────────────────────────────
describe('the catalog owns the escalation rule for both channels', () => {
  it('normalises junk failure counts identically, never throwing', () => {
    for (const n of [0, -5, Number.NaN, 1]) expect(degradedRung(n)).toBe(1)
    expect(degradedRung(3.9)).toBe(3)
  })

  it('server rung 1 returns null — the K5 teaching template owns that turn', () => {
    expect(degradedCopy({ channel: 'server_degraded', consecutiveFailures: 1 })).toBeNull()
  })

  it('server escalates on 2, then again on 3+', () => {
    const second = degradedCopy({ channel: 'server_degraded', consecutiveFailures: 2 })
    const third = degradedCopy({ channel: 'server_degraded', consecutiveFailures: 3 })
    expect(second).not.toBe(third)
    expect(third).toBe(degradedCopy({ channel: 'server_degraded', consecutiveFailures: 9 }))
  })

  it('client escalates on 2+, in every language', () => {
    for (const lang of ['en', 'ru', 'hi'] as const) {
      const first = degradedCopy({ channel: 'client_transport', consecutiveFailures: 1, lang })
      const later = degradedCopy({ channel: 'client_transport', consecutiveFailures: 2, lang })
      expect(first).toBeTruthy()
      expect(later).toBeTruthy()
      expect(first).not.toBe(later)
    }
  })

  it('falls back to English for an unknown language rather than returning nothing', () => {
    expect(degradedCopy({ channel: 'client_transport', consecutiveFailures: 1, lang: 'xx' as never }))
      .toBe(degradedCopy({ channel: 'client_transport', consecutiveFailures: 1, lang: 'en' }))
  })

  it('the two channels never emit each other\'s copy', () => {
    for (const n of [1, 2, 3, 7]) {
      expect(degradedCopy({ channel: 'server_degraded', consecutiveFailures: n }) ?? '')
        .not.toMatch(/I got cut off|reach the server/)
      expect(degradedCopy({ channel: 'client_transport', consecutiveFailures: n }))
        .not.toMatch(/isn't responding right now|thoughts together/)
    }
  })
})

describe('both consumers read from the catalog — no private wording survives', () => {
  it('renderOutage returns exactly the catalog copy past rung 1', () => {
    for (const n of [2, 3, 8]) {
      expect(renderOutage(n, BASE, CTX))
        .toBe(degradedCopy({ channel: 'server_degraded', consecutiveFailures: n }))
    }
  })

  it('renderOutage still serves the K5 teaching template on rung 1 (unchanged UX)', () => {
    expect(renderOutage(1, BASE, CTX)).toBe(renderFallback(BASE, CTX))
    expect(renderOutage(1, BASE, CTX)).toMatch(/one small step together/)
  })

  it('pickRecoveryMessage returns exactly the catalog copy, every language and rung', () => {
    for (const lang of ['en', 'ru', 'hi'] as const) {
      for (const n of [1, 2, 5]) {
        expect(pickRecoveryMessage(n, lang))
          .toBe(degradedCopy({ channel: 'client_transport', consecutiveFailures: n, lang }))
      }
    }
  })

  it('preserves the original wording verbatim — no UX redesign', () => {
    expect(pickRecoveryMessage(1, 'en'))
      .toBe("Sorry, I got cut off there for a second. Go ahead and try again — I'm still here.")
    expect(renderOutage(3, BASE, CTX)).toMatch(/isn't responding right now/)
    expect(renderOutage(3, BASE, CTX)).toMatch(/your progress is saved/)
  })
})

// ── GAP 1: the client propagates ───────────────────────────────────────────
describe('generateAIResponse propagates provider failures', () => {
  afterEach(() => { vi.resetModules(); vi.restoreAllMocks() })

  it('throws on a timeout instead of returning canned text', async () => {
    vi.resetModules()
    vi.doMock('@/lib/ai/budget', () => ({
      consumeAIBudget: async () => {},
      AIBudgetExceededError: class extends Error {},
    }))
    vi.doMock('@/lib/ai/router', () => ({
      MAX_HISTORY_MESSAGES: 20,
      getAIRouter: () => ({ complete: async () => { throw new Error('Request timed out on gemini') } }),
    }))
    const { generateAIResponse } = await import('@/lib/ai/client')
    await expect(generateAIResponse([{ role: 'user', content: 'q' }], 'sys'))
      .rejects.toThrow(/timed out/)
  })

  it('still returns text on success', async () => {
    vi.resetModules()
    vi.doMock('@/lib/ai/budget', () => ({
      consumeAIBudget: async () => {},
      AIBudgetExceededError: class extends Error {},
    }))
    vi.doMock('@/lib/ai/router', () => ({
      MAX_HISTORY_MESSAGES: 20,
      getAIRouter: () => ({ complete: async () => ({ text: 'real answer', finishReason: 'stop', provider: 'gemini' }) }),
    }))
    const { generateAIResponse } = await import('@/lib/ai/client')
    await expect(generateAIResponse([{ role: 'user', content: 'q' }], 'sys'))
      .resolves.toBe('real answer')
  })
})

// ── GAP 2: the render driver keeps degraded identity ───────────────────────
describe('kernel render driver preserves degraded-provider identity', () => {
  afterEach(() => { vi.resetModules(); vi.restoreAllMocks() })

  it('reports the degraded provider, never "llm", when the provider fails', async () => {
    vi.resetModules()
    vi.doMock('@/lib/ai/client', () => ({
      generateAIResponse: async () => { throw new Error('Request timed out on gemini') },
    }))
    const { makeLlmDriver: driverFactory } = await import('@/lib/kernel/stages/render')
    const { DEGRADED_PROVIDER, isDegradedProvider } = await import('@/lib/eos-runtime')
    const out = await driverFactory().render({ systemPrompt: 's', history: [] })
    expect(out.provider).toBe(DEGRADED_PROVIDER)
    expect(out.provider).not.toBe('llm')
    // The whole point: downstream must be able to SEE that it was degraded.
    expect(isDegradedProvider(out.provider)).toBe(true)
    expect(out.text.length).toBeGreaterThan(0)
  })

  it('still reports "llm" on a successful render', async () => {
    vi.resetModules()
    vi.doMock('@/lib/ai/client', () => ({ generateAIResponse: async () => 'taught' }))
    const { makeLlmDriver: driverFactory } = await import('@/lib/kernel/stages/render')
    const out = await driverFactory().render({ systemPrompt: 's', history: [] })
    expect(out.provider).toBe('llm')
    expect(out.text).toBe('taught')
  })

  it('is exported and constructible without provider credentials', () => {
    expect(typeof makeLlmDriver().render).toBe('function')
  })
})

// ── Repository sweep: no competing learner-facing degraded copy ────────────
describe('no competing degraded teaching copy remains', () => {
  const strip = (f: string) => readFileSync(join(process.cwd(), f), 'utf8')
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/^[ \t]*\/\/.*$/gm, '')

  const FORMER_OWNERS = [
    join('src', 'lib', 'ai', 'client.ts'),
    join('src', 'lib', 'ai', 'router.ts'),
    join('src', 'lib', 'learn', 'tutorRecovery.ts'),
    join('src', 'lib', 'kernel', 'verifier', 'templateFallback.ts'),
    join('src', 'lib', 'kernel', 'stages', 'render.ts'),
  ]

  it.each(FORMER_OWNERS)('%s hard-codes no learner-facing failure copy', (f) => {
    const src = strip(f)
    for (const s of [
      'Taking longer than usual',
      'Думаю дольше обычного',
      'Thoda time lag raha hai',
      'I got cut off',
      "isn't responding right now",
      'thoughts together on that one',
    ]) expect(src, `${f} still contains ${JSON.stringify(s)}`).not.toContain(s)
  })

  it('the catalog is the only module holding these strings', () => {
    const cat = readFileSync(join(process.cwd(), 'src', 'lib', 'teaching', 'degradedCopy.ts'), 'utf8')
    expect(cat).toContain('I got cut off')
    expect(cat).toContain("isn't responding right now")
    expect(cat).toContain('thoughts together on that one')
  })

  it('the catalog stays pure so the browser half can render it offline', () => {
    const cat = readFileSync(join(process.cwd(), 'src', 'lib', 'teaching', 'degradedCopy.ts'), 'utf8')
    expect(cat).not.toMatch(/^\s*import\s/m)
  })

  it('does not absorb auth, load shedding, UI diagnostics or feature errors', () => {
    const cat = readFileSync(join(process.cwd(), 'src', 'lib', 'teaching', 'degradedCopy.ts'), 'utf8')
      .replace(/\/\*[\s\S]*?\*\//g, '').replace(/^[ \t]*\/\/.*$/gm, '')
    for (const s of [
      'High demand right now',
      'AI service temporarily unavailable',
      'Unauthorized', 'Forbidden',
      'Image analysis is temporarily unavailable',
    ]) expect(cat).not.toContain(s)
  })
})
