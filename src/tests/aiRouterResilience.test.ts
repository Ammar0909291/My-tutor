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

// RETIRED (audit 2026-08-02): routeAI used to convert a timeout at chain
// exhaustion into a canned learner-facing string with provider:'fallback',
// while every other exhaustion threw. That split made the degraded-message
// OWNER depend on the last provider's error kind and is why production showed
// two different degraded tutor messages. routeAI now throws for every failure
// mode; the single owner of degraded copy is route.ts's K6 degraded path.
//
// The real contract is tested against the real module in
// src/tests/degradedResponseOwnership.test.ts — this replica is kept only so
// the retired behaviour cannot be reintroduced here unnoticed.

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

  describe('routeAI authors no learner-facing copy', () => {
    it('the retired timeout-fallback strings are gone from the router module', async () => {
      const src = await import('node:fs/promises')
        .then((fs) => fs.readFile('src/lib/ai/router.ts', 'utf8'))
      // Assert on the STRING LITERALS, not the helper: the defect was copy
      // being authored here at all, in any language.
      expect(src).not.toContain("en: 'Taking longer than usual. Please try again.'")
      expect(src).not.toContain('Попробуй ещё раз')
      expect(src).not.toContain("provider: 'fallback'")
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
