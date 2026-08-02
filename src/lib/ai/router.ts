import { consumeAIBudget } from '@/lib/ai/budget'
import { captureError } from '@/lib/monitoring'
import { createGeminiProvider } from './providers/gemini'
import { createOpenRouterProvider } from './providers/openrouter'
import { createGroqProvider } from './providers/groq'
import { createFailoverRouter } from './providers/failoverRouter'
import type { AIProvider, AICompletionRequest } from './providers/types'
import { AIProviderError } from './providers/types'

// ─── Provider configuration (env-var driven) ─────────────────────────────────
const GEMINI_API_KEY = process.env.GEMINI_API_KEY ?? ''
// Model default: 'gemini-3.5-flash-lite'. The Gemini 2.5 family is deprecated
// and 404s on this project's API key — every turn silently failed over to Groq,
// which is why Gemini billing never moved. GEMINI_MODEL may still override, but
// it must NOT be set to a gemini-2.5-* value; resolveGeminiModel below rejects
// the deprecated family so a stale env var cannot resurrect the same outage.
// Verified 2026-08-01 against this project's key: gemini-2.5-flash-lite -> 404
// "no longer available to new users"; gemini-3.5-flash-lite -> 200 OK.
const GEMINI_MODEL = resolveGeminiModel(process.env.GEMINI_MODEL)

/** Ignores a deprecated gemini-2.5-* override so a stale Vercel env var cannot
 *  silently re-break the primary provider. Any other value is honoured as-is. */
export function resolveGeminiModel(configured: string | undefined): string {
  const fallback = 'gemini-3.5-flash-lite'
  if (!configured) return fallback
  if (/^gemini-2\.5[-.]/.test(configured)) {
    console.warn(
      `[ai/router] GEMINI_MODEL="${configured}" is a deprecated Gemini 2.5 model that 404s;` +
      ` using "${fallback}" instead`,
    )
    return fallback
  }
  return configured
}
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY ?? ''
const OPENROUTER_MODEL = process.env.OPENROUTER_MODEL ?? 'deepseek/deepseek-chat-v3.1'
// Third-tier automatic fallback — the model this app ran on before the
// Gemini/OpenRouter migration, kept as a proven-working last resort so a
// Gemini+OpenRouter outage together doesn't take teaching turns down.
const GROQ_API_KEY = process.env.GROQ_API_KEY ?? ''
const GROQ_MODEL = process.env.GROQ_MODEL ?? 'openai/gpt-oss-20b'

let _router: ReturnType<typeof createFailoverRouter> | null = null

function getRouter() {
  if (_router) return _router
  // Production evidence (Vercel runtime errors, 2026-07-25/26): OpenRouter
  // was attempted on every single request and failed every time with
  // "401 Missing Authentication header" — OPENROUTER_API_KEY is unset in
  // this deployment, so createOpenRouterProvider('', ...) was always a
  // guaranteed-fail real HTTP round-trip before falling through to the
  // next tier. Same risk exists for Gemini if GEMINI_API_KEY is unset.
  // Filtering out providers with no configured key removes that wasted
  // (and log-polluting) hop — behavior is otherwise identical, since an
  // empty-key provider could never have succeeded anyway. GROQ_API_KEY is
  // the one credential this app has always required (CLAUDE.md/.env.example),
  // so the chain is never empty in practice.
  const candidates: Array<{ key: string; provider: AIProvider }> = [
    { key: GEMINI_API_KEY, provider: createGeminiProvider(GEMINI_API_KEY, GEMINI_MODEL) },
    { key: OPENROUTER_API_KEY, provider: createOpenRouterProvider(OPENROUTER_API_KEY, OPENROUTER_MODEL) },
    { key: GROQ_API_KEY, provider: createGroqProvider(GROQ_API_KEY, GROQ_MODEL) },
  ]
  const providers = candidates.filter((c) => c.key !== '').map((c) => c.provider)
  if (providers.length === 0) {
    console.warn('[ai/router] no AI provider has a configured API key — falling back to the full chain so failures are at least visible per-provider')
  }
  _router = createFailoverRouter({
    providers: providers.length > 0 ? providers : candidates.map((c) => c.provider),
  })
  return _router
}

export function getAIRouter() { return getRouter() }

// ─── Main router ─────────────────────────────────────────────────────────────
export interface RouteAIResult {
  text: string
  provider: string
  finishReason: string | null
}

export async function routeAI(
  messages: { role: 'user' | 'assistant'; content: string }[],
  systemPrompt: string,
  country: string,
  maxTokens = 800,
  lang: 'ru' | 'en' | 'hi' = 'en',
  _meta?: Record<string, unknown>,
): Promise<RouteAIResult> {
  console.log('[ai/router] routing request, country =', country)

  await consumeAIBudget()

  const req: AICompletionRequest = {
    messages: messages.slice(-6),
    systemPrompt,
    maxTokens,
    temperature: 0.7,
  }

  try {
    const result = await getRouter().complete(req)
    console.log(
      `[ai/router] success provider=${result.provider} finish_reason=${result.finishReason}` +
      ` chars=${result.text.length}`,
    )
    return { text: result.text, provider: result.provider, finishReason: result.finishReason }
  } catch (error: any) {
    console.error('[ai/router] all providers failed:', error.message)
    captureError(error, {
      route: 'lib/ai/routeAI',
      tags: { provider: error instanceof AIProviderError ? error.provider : 'unknown' },
    })

    if (
      error.message?.includes('timeout') || error.message?.includes('timed out') ||
      error.name === 'AITimeoutError'
    ) {
      const timeoutMsg: Record<string, string> = {
        en: 'Taking longer than usual. Please try again.',
        ru: 'Думаю дольше обычного. Попробуй ещё раз.',
        hi: 'Thoda time lag raha hai. Please try again.',
      }
      return { text: timeoutMsg[lang] || timeoutMsg.en, provider: 'fallback', finishReason: null }
    }
    throw error
  }
}

// ─── JSON generation ─────────────────────────────────────────────────────────
export async function routeJSON(
  prompt: string,
  maxTokens = 1500,
): Promise<any> {
  try { await consumeAIBudget() } catch { return null }
  try {
    const req: AICompletionRequest = {
      messages: [{ role: 'user', content: prompt + '\n\nReturn ONLY valid JSON. No markdown. No explanation.' }],
      systemPrompt: 'You are a JSON generation assistant. Return ONLY valid JSON.',
      maxTokens,
      temperature: 0.3,
    }
    const result = await getRouter().complete(req)
    const clean = result.text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
    try { return JSON.parse(clean) } catch { return null }
  } catch (error: any) {
    console.error('[ai/router] routeJSON error:', error.message)
    captureError(error, { route: 'lib/ai/routeJSON', tags: { provider: 'gemini' } })
    return null
  }
}
