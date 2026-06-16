import { describe, it, expect, vi } from 'vitest'

// Tests for AI failure handling patterns — all using stubs, no real providers.

// ── Simulated AI call with error scenarios ────────────────────────────────────
type AIResponse = { text: string; provider: string }

async function callAIWithFallback(
  primaryFn: () => Promise<string>,
  fallbackText: string,
  lang: 'en' | 'ru' | 'hi' = 'en',
): Promise<AIResponse> {
  try {
    const text = await primaryFn()
    return { text, provider: 'primary' }
  } catch (err: any) {
    const msg: string = err?.message ?? ''
    if (msg.includes('timeout') || msg.includes('timed out')) {
      const timeouts: Record<string, string> = {
        en: 'Taking longer than usual. Please try again.',
        ru: 'Думаю дольше обычного. Попробуй ещё раз.',
        hi: 'Thoda time lag raha hai. Please try again.',
      }
      return { text: timeouts[lang] ?? timeouts.en, provider: 'fallback' }
    }
    return { text: fallbackText, provider: 'fallback' }
  }
}

// ── Simulated routeJSON with null-on-failure ───────────────────────────────────
async function safeJSON(fn: () => Promise<string>): Promise<unknown> {
  try {
    const raw = await fn()
    if (!raw) return null
    const clean = raw.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
    try { return JSON.parse(clean) } catch { return null }
  } catch {
    return null
  }
}

describe('AI failure handling', () => {
  describe('primary provider success', () => {
    it('successful response returned as-is', async () => {
      const result = await callAIWithFallback(async () => 'Hello, student!', 'fallback')
      expect(result.text).toBe('Hello, student!')
      expect(result.provider).toBe('primary')
    })
  })

  describe('timeout handling', () => {
    it('timeout error → localized fallback message (en)', async () => {
      const result = await callAIWithFallback(
        async () => { throw new Error('Request timed out after 20s') },
        'Error occurred',
        'en',
      )
      expect(result.provider).toBe('fallback')
      expect(result.text).toContain('Please try again')
    })

    it('timeout error → Russian fallback', async () => {
      const result = await callAIWithFallback(
        async () => { throw new Error('timeout') },
        'Error',
        'ru',
      )
      expect(result.text).toContain('Попробуй ещё раз')
    })

    it('non-timeout error → generic fallback, not crash', async () => {
      const result = await callAIWithFallback(
        async () => { throw new Error('Service unavailable') },
        'AI is temporarily unavailable',
      )
      expect(result.provider).toBe('fallback')
      expect(result.text).toBe('AI is temporarily unavailable')
    })
  })

  describe('routeJSON null-on-failure contract', () => {
    it('provider throws → returns null, no crash', async () => {
      const result = await safeJSON(async () => { throw new Error('API error') })
      expect(result).toBeNull()
    })

    it('provider returns empty string → null', async () => {
      const result = await safeJSON(async () => '')
      expect(result).toBeNull()
    })

    it('provider returns malformed JSON → null', async () => {
      const result = await safeJSON(async () => '{broken: json, no quotes}')
      expect(result).toBeNull()
    })

    it('provider returns valid JSON → parsed object', async () => {
      const result = await safeJSON(async () => '{"steps": [1, 2, 3]}')
      expect(result).toEqual({ steps: [1, 2, 3] })
    })

    it('provider returns markdown JSON → parsed correctly', async () => {
      const result = await safeJSON(async () => '```json\n{"score": 85}\n```')
      expect(result).toEqual({ score: 85 })
    })

    it('null return from provider → null', async () => {
      // @ts-expect-error: testing null return
      const result = await safeJSON(async () => null)
      expect(result).toBeNull()
    })
  })

  describe('AI budget exhaustion', () => {
    it('budget exceeded error → treated as null (graceful)', async () => {
      const result = await safeJSON(async () => {
        const err = new Error('AIBudgetExceededError')
        err.name = 'AIBudgetExceededError'
        throw err
      })
      expect(result).toBeNull()
    })

    it('budget exceeded in chat → fallback message returned', async () => {
      const result = await callAIWithFallback(
        async () => {
          const err = new Error('AIBudgetExceededError: daily budget spent')
          throw err
        },
        'Daily limit reached. Please try again tomorrow.',
      )
      expect(result.provider).toBe('fallback')
      expect(result.text).toContain('Daily limit')
    })
  })

  describe('AI response structure safety', () => {
    it('array when object expected → handle as null', async () => {
      const result = await safeJSON(async () => '[1, 2, 3]') // returns array, not object
      // Not null (it's valid JSON), but caller must validate schema
      expect(Array.isArray(result)).toBe(true)
    })

    it('number when object expected → caller validates', async () => {
      const result = await safeJSON(async () => '42')
      expect(typeof result).toBe('number')
    })

    it('deeply nested unexpected structure → parsed without crash', async () => {
      const result = await safeJSON(async () => '{"a":{"b":{"c":{"d":{"e":1}}}}}')
      expect(result).not.toBeNull()
    })
  })
})
