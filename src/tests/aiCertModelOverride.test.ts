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
 */

const KEYS = ['GEMINI_API_KEY', 'OPENROUTER_API_KEY', 'GROQ_API_KEY', 'GROQ_MODEL', 'AI_PROVIDER_MODE'] as const
const saved: Record<string, string | undefined> = {}

let groqModelsRequested: string[] = []

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

beforeEach(() => {
  for (const k of KEYS) saved[k] = process.env[k]
  process.env.GEMINI_API_KEY = 'g-key'
  process.env.OPENROUTER_API_KEY = ''
  process.env.GROQ_API_KEY = 'q-key'
  delete process.env.GROQ_MODEL
  delete process.env.AI_PROVIDER_MODE
  groqModelsRequested = []
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
  it('(a) no header/override -> production default model (120b)', async () => {
    const { routeAI } = await import('@/lib/ai/router')
    const result = await routeAI(
      [{ role: 'user', content: 'hi' }], 'sys', 'IN', 800, 'en', undefined, undefined,
    )
    expect(result.provider).toBe('groq')
    expect(groqModelsRequested).toEqual(['openai/gpt-oss-120b'])
  })

  it('(b) header present but caller passes no override (flag=false case) -> still 120b', async () => {
    // Simulates route.ts's branch when modelOverrideAllowed is false: it never
    // sets groqModelOverride at all, so routeAI is called exactly like (a).
    const { routeAI } = await import('@/lib/ai/router')
    const result = await routeAI(
      [{ role: 'user', content: 'hi' }], 'sys', 'IN', 800, 'en', undefined, undefined,
    )
    expect(result.provider).toBe('groq')
    expect(groqModelsRequested).toEqual(['openai/gpt-oss-120b'])
  })

  it('(c) header + flag=true (caller supplies override) -> 20b used for this request', async () => {
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
    expect(groqModelsRequested).toEqual(['openai/gpt-oss-20b', 'openai/gpt-oss-120b'])
  })

  it('isAllowedGroqCertModel rejects anything not on the closed allowlist (spoof resistance)', async () => {
    const { isAllowedGroqCertModel } = await import('@/lib/ai/router')
    expect(isAllowedGroqCertModel('openai/gpt-oss-20b')).toBe(true)
    expect(isAllowedGroqCertModel('openai/gpt-oss-120b')).toBe(true)
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
    const gateBlock = src.slice(
      src.indexOf('A/B provider-certification gate'),
      src.indexOf('A/B provider-certification gate') + 900,
    )
    expect(gateBlock).toMatch(/req\.headers\.get\('x-cert-groq-model'\)/)
    expect(gateBlock).toMatch(/prisma\.user\.findUnique/)
    expect(gateBlock).toMatch(/where:\s*{\s*id:\s*userId\s*}/)
    expect(gateBlock).toMatch(/modelOverrideAllowed:\s*true/)
    // The header is parsed via isAllowedGroqCertModel before it ever reaches
    // the DB-gated branch — a client cannot supply an arbitrary model string.
    expect(gateBlock).toMatch(/isAllowedGroqCertModel\(requestedCertModel\)/)
  })
})
