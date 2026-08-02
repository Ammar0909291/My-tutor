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

/**
 * P17 — GEMINI-ONLY ISOLATION MODE (diagnostic, runtime switch only).
 *
 * `AI_PROVIDER_MODE=gemini_only` makes Gemini the sole provider so a 24-hour
 * window can answer one question: is Gemini itself healthy, or is failover
 * masking the real fault? Any other value (including unset) leaves the full
 * chain and today's production behaviour byte-for-byte unchanged.
 *
 * NOTHING IS DELETED. The provider factories, the chain order and the
 * failover algorithm are all untouched — this only narrows the provider LIST
 * handed to the existing router, which is the single place the chain is
 * assembled (verified 2026-08-02: getRouter() is the only caller of
 * createFailoverRouter in src/).
 */
export function isGeminiOnlyMode(): boolean {
  return (process.env.AI_PROVIDER_MODE ?? '').trim().toLowerCase() === 'gemini_only'
}

function getRouter() {
  if (_router) return _router

  if (isGeminiOnlyMode()) {
    // One provider in the list means the failover loop has nothing to fail
    // over TO: no OpenRouter call, no Groq call, no second-provider retry.
    //
    // disableSameProviderRetry is required for the diagnostic to be honest,
    // and the reason is arithmetic rather than preference. AITimeoutError is
    // declared retryable=true, so the primary tier would normally re-attempt
    // the SAME provider after a 500ms backoff. With Gemini's 30s cap that is
    // 30s + 0.5s + 30s = 60.5s against this route's 60s function budget — the
    // lambda would be killed before the degraded template could render, and
    // the learner would get a blank 504 instead of the fallback this mode is
    // specified to return "immediately". It also doubles the apparent Gemini
    // failure count, which would corrupt the very measurement being taken.
    console.log('[ai/router] AI_PROVIDER_MODE=gemini_only — failover and same-provider retry disabled for this deployment')
    _router = createFailoverRouter({
      providers: [createGeminiProvider(GEMINI_API_KEY, GEMINI_MODEL)],
      disableSameProviderRetry: true,
    })
    return _router
  }

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
  // SEV-1 (2026-08-02): the same-provider retry does not fit the function
  // budget on the tutor's own route, and the arithmetic is the same one this
  // file already documents for gemini_only mode above — it was simply never
  // applied to the path real learners use.
  //
  //   primary attempt + RETRY_BACKOFF_MS + primary retry
  //   = 30_000 + 500 + 30_000 = 60_500 ms
  //
  // against vercel.json's `api/learn/chat maxDuration: 60` = 60_000 ms. The
  // lambda was killed 500 ms INSIDE the second Gemini attempt, so failover to
  // Groq was never reached and route.ts's degraded path never rendered: the
  // learner got a blank 504 rather than a fallback answer. Suppressing the
  // retry removes 30_500 ms from the worst case and costs nothing a learner
  // can observe — a retryable failure now fails over to the next provider
  // instead of re-asking the one that just failed.
  _router = createFailoverRouter({
    providers: providers.length > 0 ? providers : candidates.map((c) => c.provider),
    disableSameProviderRetry: true,
  })
  return _router
}

export function getAIRouter() { return getRouter() }

// ─── Main router ─────────────────────────────────────────────────────────────
/** Conversation turns forwarded to the provider. See the note at the one use
 *  site below for why this is 20 and not 6. */
export const MAX_HISTORY_MESSAGES = 20

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
    // Was slice(-6). The live tutor chat route loads HISTORY_LIMIT=30 messages
    // and passes all of them here, so 24 of every 30 were discarded one line
    // before the provider call: only 3 exchanges reached the model. Production
    // evidence (2026-08-02 audit): 1501 of 1881 recorded turns — 79.8% — were
    // past message 6 in their session and therefore answered with a truncated
    // view of the conversation. That is the mechanism behind the tutor
    // re-asking questions the learner had already answered, because the
    // question and its answer had both scrolled out of context.
    //
    // This exact defect was already diagnosed and fixed in the other AI client
    // in this repo (lib/ai/client.ts generateAIResponse, which moved 6 -> 20
    // with a written root-cause note) — but never applied here, on the path
    // the tutor actually uses. Matching that already-made decision rather than
    // inventing a new number.
    messages: messages.slice(-MAX_HISTORY_MESSAGES),
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
