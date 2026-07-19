import { describe, it, expect, vi, beforeEach } from 'vitest'

// ── Pure unit tests for AI router logic ─────────────────────────────────────
// The actual routeAI/routeJSON functions make network calls, so we test
// the observable contracts through pure replicas of the logic.

// Replica of routeJSON null-on-failure contract
async function safeParseJSON(rawText: string | null): Promise<unknown> {
  if (!rawText) return null
  const clean = rawText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
  try { return JSON.parse(clean) } catch { return null }
}

// Replica of timeout fallback logic in routeAI
function handleAIError(error: Error, lang: 'ru' | 'en' | 'hi'): string | null {
  const msg = error.message ?? ''
  if (msg.includes('timeout') || msg.includes('timed out')) {
    const msgs: Record<string, string> = {
      en: 'Taking longer than usual. Please try again.',
      ru: 'Думаю дольше обычного. Попробуй ещё раз.',
      hi: 'Thoda time lag raha hai. Please try again.',
    }
    return msgs[lang] ?? msgs.en
  }
  return null // non-timeout errors re-throw
}

// Replica of Yandex → Groq fallback: missing credentials → use Groq
function selectProvider(country: string, hasYandexCreds: boolean): string {
  if (country === 'ru' && hasYandexCreds) return 'yandex'
  return 'groq'
}

describe('AI router resilience', () => {
  describe('routeJSON null-on-failure contract', () => {
    it('valid JSON string → parsed object', async () => {
      const result = await safeParseJSON('{"score": 80, "passed": true}')
      expect(result).toEqual({ score: 80, passed: true })
    })

    it('null input → null', async () => {
      expect(await safeParseJSON(null)).toBeNull()
    })

    it('empty string → null', async () => {
      expect(await safeParseJSON('')).toBeNull()
    })

    it('malformed JSON → null (no throw)', async () => {
      expect(await safeParseJSON('{broken: json')).toBeNull()
    })

    it('markdown-wrapped JSON → parsed correctly', async () => {
      const result = await safeParseJSON('```json\n{"steps": [1, 2, 3]}\n```')
      expect(result).toEqual({ steps: [1, 2, 3] })
    })

    it('array JSON → parsed array', async () => {
      const result = await safeParseJSON('[{"id": "a"}, {"id": "b"}]')
      expect(Array.isArray(result)).toBe(true)
    })

    it('empty array string → empty array', async () => {
      expect(await safeParseJSON('[]')).toEqual([])
    })

    it('nested JSON → parsed correctly', async () => {
      const result = await safeParseJSON('{"feedback": {"score": 70, "topics": ["algebra"]}}')
      expect((result as any).feedback.score).toBe(70)
    })
  })

  describe('timeout fallback messages', () => {
    it('timeout error → English fallback', () => {
      const msg = handleAIError(new Error('Request timed out'), 'en')
      expect(msg).toBeTruthy()
      expect(msg).toContain('Please try again')
    })

    it('timeout error → Russian fallback', () => {
      const msg = handleAIError(new Error('timeout exceeded'), 'ru')
      expect(msg).toBeTruthy()
      expect(msg).toContain('Попробуй ещё раз')
    })

    it('timeout error → Hindi fallback', () => {
      const msg = handleAIError(new Error('Request timed out'), 'hi')
      expect(msg).toContain('Please try again')
    })

    it('non-timeout error → null (should re-throw)', () => {
      expect(handleAIError(new Error('Connection refused'), 'en')).toBeNull()
    })

    it('rate limit error → null (should re-throw)', () => {
      expect(handleAIError(new Error('Rate limit exceeded'), 'en')).toBeNull()
    })
  })

  describe('empty-completion retry budget (callGroq)', () => {
    // Replica of the retry max_tokens calculation in router.ts's callGroq —
    // an empty completion from a reasoning model likely means the original
    // budget was exhausted mid-reasoning, so the retry must get materially
    // more headroom, not the same budget that just failed.
    function retryMaxTokens(originalMaxTokens: number): number {
      return Math.max(originalMaxTokens * 2, 2048)
    }

    it('doubles a typical chat budget (1024 -> 2048)', () => {
      expect(retryMaxTokens(1024)).toBe(2048)
    })

    it('doubles a larger budget past the 2048 floor (2048 -> 4096)', () => {
      expect(retryMaxTokens(2048)).toBe(4096)
    })

    it('a tiny budget is still floored at 2048, not merely doubled', () => {
      expect(retryMaxTokens(100)).toBe(2048)
    })
  })

  describe('provider routing', () => {
    it('Russian user with Yandex creds → yandex', () => {
      expect(selectProvider('ru', true)).toBe('yandex')
    })

    it('Russian user without Yandex creds → groq fallback', () => {
      expect(selectProvider('ru', false)).toBe('groq')
    })

    it('non-Russian user → groq', () => {
      expect(selectProvider('in', true)).toBe('groq')
      expect(selectProvider('us', false)).toBe('groq')
    })

    it('empty country → groq', () => {
      expect(selectProvider('', false)).toBe('groq')
    })
  })
})
