import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

/**
 * A/B provider-certification gate (2026-08-21).
 *
 * The override lets a certification run select a non-default Groq model
 * (`openai/gpt-oss-20b` instead of production's `openai/gpt-oss-120b`) for
 * ONE request, but only when BOTH a request header names a valid Groq model
 * AND the authenticated user's own DB row has `modelOverrideAllowed = true`
 * (checked in route.ts, never trusted from the request itself). This suite
 * pins routeAI's half of that contract: given an override value, it reaches
 * the Groq provider constructor; without one, production's default model is
 * used regardless of anything else.
 *
 * route.ts's half (header parsing + the DB lookup that decides whether to
 * pass an override at all) is covered by asserting on the actual source, not
 * a live DB — this suite cannot spin up a database, and that half is a thin,
 * already-reviewed read-then-branch with no routing logic of its own.
 *
 * 2026-09-16: extended with the provider-FORCING sibling gate
 * (`x-cert-provider`, `CertProviderOverride`), built for a real Groq-vs-Gemini
 * teaching comparison on two accounts. Same contract, same two guards
 * (closed allowlist + DB flag), one router-level difference: forcing a
 * provider builds a single-provider router (no failover at all), where the
 * groq-model override still lets Gemini/OpenRouter catch a Groq failure.
 * Gemini is mocked here the same way groq already is — the createGeminiProvider
 * constructor call is tracked so a test can assert it either fired or never
 * did, matching this file's own existing groqModelsRequested convention.
 */

const KEYS = ['GEMINI_API_KEY', 'OPENROUTER_API_KEY', 'GROQ_API_KEY', 'GROQ_MODEL', 'AI_PROVIDER_MODE'] as const
const saved: Record<string, string | undefined> = {}

let groqModelsRequested: string[] = []
let geminiCallCount = 0

vi.mock('@/lib/ai/providers/groq', () => ({
  createGroqProvider: (_key: string, model: string) => {
    groqModelsRequested.push(model)
    return {
      name: 'groq',
      model,
      complete: async () => ({ text: `groq:${model} ok`, finishReason: 'stop', provider: 'groq' }),
      healthCheck: async () => true,
    }
  },
}))

vi.mock('@/lib/ai/providers/gemini', () => ({
  createGeminiProvider: () => {
    geminiCallCount++
    return {
      name: 'gemini',
      complete: async () => ({ text: 'gemini ok', finishReason: 'stop', provider: 'gemini' }),
      healthCheck: async () => true,
    }
  },
}))

beforeEach(() => {
  for (const k of KEYS) saved[k] = process.env[k]
  process.env.GEMINI_API_KEY = 'g-key'
  process.env.OPENROUTER_API_KEY = ''
  process.env.GROQ_API_KEY = 'q-key'
  delete process.env.GROQ_MODEL
  delete process.env.AI_PROVIDER_MODE
  groqModelsRequested = []
  geminiCallCount = 0
  vi.resetModules()
})

afterEach(() => {
  for (const k of KEYS) {
    if (saved[k] === undefined) delete process.env[k]
    else process.env[k] = saved[k]
  }
  vi.restoreAllMocks()
})

describe('groq A/B certification override', () => {
  it('(a) no header/override -> production default model (20b, the only Groq model since 2026-09-08)', async () => {
    const { routeAI } = await import('@/lib/ai/router')
    const result = await routeAI(
      [{ role: 'user', content: 'hi' }], 'sys', 'IN', 800, 'en', undefined, undefined,
    )
    expect(result.provider).toBe('groq')
    expect(groqModelsRequested).toEqual(['openai/gpt-oss-20b'])
  })

  it('(b) header present but caller passes no override (flag=false case) -> still the default (20b)', async () => {
    // Simulates route.ts's branch when modelOverrideAllowed is false: it never
    // sets groqModelOverride at all, so routeAI is called exactly like (a).
    const { routeAI } = await import('@/lib/ai/router')
    const result = await routeAI(
      [{ role: 'user', content: 'hi' }], 'sys', 'IN', 800, 'en', undefined, undefined,
    )
    expect(result.provider).toBe('groq')
    expect(groqModelsRequested).toEqual(['openai/gpt-oss-20b'])
  })

  it('(c) header + flag=true, requesting the one allowed model -> that model is used', async () => {
    // 2026-09-08: with 120b removed, the allowlist holds 20b alone, so the
    // override can no longer CHANGE the model — it can only ever re-select the
    // default. The mechanism is kept and pinned so a future second model
    // reaches it through the allowlist rather than around it.
    const { routeAI } = await import('@/lib/ai/router')
    const result = await routeAI(
      [{ role: 'user', content: 'hi' }], 'sys', 'IN', 800, 'en', undefined, 'openai/gpt-oss-20b',
    )
    expect(result.provider).toBe('groq')
    expect(groqModelsRequested).toEqual(['openai/gpt-oss-20b'])
  })

  it('override does not leak into a subsequent unrelated request (no shared-router pollution)', async () => {
    const { routeAI } = await import('@/lib/ai/router')
    await routeAI([{ role: 'user', content: 'hi' }], 'sys', 'IN', 800, 'en', undefined, 'openai/gpt-oss-20b')
    await routeAI([{ role: 'user', content: 'hi' }], 'sys', 'IN', 800, 'en', undefined, undefined)
    expect(groqModelsRequested).toEqual(['openai/gpt-oss-20b', 'openai/gpt-oss-20b'])
  })

  it('isAllowedGroqCertModel rejects anything not on the closed allowlist (spoof resistance)', async () => {
    const { isAllowedGroqCertModel } = await import('@/lib/ai/router')
    expect(isAllowedGroqCertModel('openai/gpt-oss-20b')).toBe(true)
    // 120b was removed 2026-09-08 — a spoofed header naming it must be refused
    // exactly like any other unknown model, not quietly honoured.
    expect(isAllowedGroqCertModel('openai/gpt-oss-120b')).toBe(false)
    expect(isAllowedGroqCertModel('some-other-model')).toBe(false)
    expect(isAllowedGroqCertModel(undefined)).toBe(false)
    expect(isAllowedGroqCertModel(null)).toBe(false)
    expect(isAllowedGroqCertModel('')).toBe(false)
  })
})

describe('route.ts gate reads the flag from the DB, never the request (source assertion)', () => {
  it('queries prisma.user by session userId — not by any client-supplied field — before honouring the header', async () => {
    const fs = await import('node:fs')
    const src = fs.readFileSync(
      new URL('../app/api/learn/chat/route.ts', import.meta.url),
      'utf8',
    )
    // The override variable must only ever be set inside the branch that
    // follows a prisma lookup keyed on the AUTHENTICATED userId.
    // 2026-09-13 (PCD-002): the lookup is now wrapped in `boundedDbCall`, which
    // added two comment lines and a wrapper frame ahead of it, pushing the query
    // past the old 900-char window. Superseded slice, kept verbatim for history:
    //   src.slice(at, at + 900)
    // 2026-09-16: the gate's own comment was extended to describe the new
    // sibling x-cert-provider header (see the router.ts CertProviderOverride
    // addition), pushing `modelOverrideAllowed: true` to offset 1384 and
    // `isAllowedGroqCertModel(requestedCertModel)` to 987 from the anchor.
    // Superseded slice, kept verbatim for history:
    //   src.slice(at, at + 1400)
    // The assertions below are UNCHANGED — the invariant they state (the flag is
    // read from the DB by the authenticated userId, never from the request) is
    // exactly what still has to hold, now for both headers.
    const gateBlock = src.slice(
      src.indexOf('A/B provider-certification gate'),
      src.indexOf('A/B provider-certification gate') + 1900,
    )
    expect(gateBlock).toMatch(/req\.headers\.get\('x-cert-groq-model'\)/)
    expect(gateBlock).toMatch(/req\.headers\.get\('x-cert-provider'\)/)
    expect(gateBlock).toMatch(/prisma\.user\.findUnique/)
    expect(gateBlock).toMatch(/where:\s*{\s*id:\s*userId\s*}/)
    expect(gateBlock).toMatch(/modelOverrideAllowed:\s*true/)
    // The header is parsed via isAllowedGroqCertModel before it ever reaches
    // the DB-gated branch — a client cannot supply an arbitrary model string.
    expect(gateBlock).toMatch(/isAllowedGroqCertModel\(requestedCertModel\)/)
    // Same closed-allowlist discipline for the new provider header.
    expect(gateBlock).toMatch(/isAllowedCertProvider\(requestedCertProvider\)/)
  })
})

describe('provider-forcing A/B certification override (2026-09-16)', () => {
  it("isAllowedCertProvider accepts only 'groq'/'gemini' (spoof resistance)", async () => {
    const { isAllowedCertProvider } = await import('@/lib/ai/router')
    expect(isAllowedCertProvider('groq')).toBe(true)
    expect(isAllowedCertProvider('gemini')).toBe(true)
    expect(isAllowedCertProvider('openrouter')).toBe(false)
    expect(isAllowedCertProvider('yandex')).toBe(false)
    expect(isAllowedCertProvider(undefined)).toBe(false)
    expect(isAllowedCertProvider(null)).toBe(false)
    expect(isAllowedCertProvider('')).toBe(false)
  })

  it("forceProvider='gemini' pins the request to Gemini — the Groq provider constructor is never called", async () => {
    const { routeAI } = await import('@/lib/ai/router')
    const result = await routeAI(
      [{ role: 'user', content: 'hi' }], 'sys', 'IN', 800, 'en', undefined,
      undefined, undefined, 'gemini',
    )
    expect(result.provider).toBe('gemini')
    expect(result.text).toBe('gemini ok')
    expect(groqModelsRequested).toEqual([])
    expect(geminiCallCount).toBe(1)
  })

  it("forceProvider='groq' pins the request to Groq even without a groqModelOverride, and never touches Gemini", async () => {
    const { routeAI } = await import('@/lib/ai/router')
    const result = await routeAI(
      [{ role: 'user', content: 'hi' }], 'sys', 'IN', 800, 'en', undefined,
      undefined, undefined, 'groq',
    )
    expect(result.provider).toBe('groq')
    expect(groqModelsRequested).toEqual(['openai/gpt-oss-20b'])
    expect(geminiCallCount).toBe(0)
  })

  it('a forced provider does not leak into a subsequent unrelated request (no shared-router pollution)', async () => {
    // Not a constructor-call-count assertion: the default chain's candidates
    // array constructs a Gemini provider object during Groq-primary routing
    // too (it is a fallback tier, built whether or not it is ever invoked),
    // so createGeminiProvider firing again on the second call is expected
    // and does not by itself indicate pollution. What matters is the RESULT:
    // the second, unforced call's provider.
    const { routeAI } = await import('@/lib/ai/router')
    const forced = await routeAI([{ role: 'user', content: 'hi' }], 'sys', 'IN', 800, 'en', undefined, undefined, undefined, 'gemini')
    expect(forced.provider).toBe('gemini')
    const after = await routeAI([{ role: 'user', content: 'hi' }], 'sys', 'IN', 800, 'en', undefined, undefined, undefined, undefined)
    // The unforced follow-up call must still reach Groq (the real default
    // chain), not be silently pinned to Gemini by a polluted shared router.
    expect(after.provider).toBe('groq')
  })
})
