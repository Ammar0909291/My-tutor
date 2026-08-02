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
  _router = createFailoverRouter({
    providers: providers.length > 0 ? providers : candidates.map((c) => c.provider),
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
  // Retained positionally (three call sites pass it) but no longer read: since
  // routeAI stopped authoring learner-facing copy, it has no text to localise.
  // The degraded copy — and its localisation — belong to the single owner in
  // route.ts. See the catch block below.
  _lang: 'ru' | 'en' | 'hi' = 'en',
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

    // SINGLE OWNER OF DEGRADED LEARNER COPY (audit 2026-08-02).
    //
    // This used to special-case a timeout: when the chain was exhausted and
    // the LAST provider's error happened to be an AITimeoutError, routeAI
    // swallowed the failure and returned a canned "Taking longer than usual"
    // string with provider:'fallback' instead of throwing. Every other
    // exhaustion (401, quota, empty response, server error) threw.
    //
    // That made the failure OWNER depend on the error kind of whichever
    // provider was last in the chain, and produced the two-message bug:
    //   · threw  → route.ts's K6 degraded path → K5 renderOutage() ladder,
    //              consecutiveOutages incremented, provider='degraded'
    //   · caught → success:true + provider:'fallback' → the client's
    //              isFallbackResponse() re-threw it → a SECOND, independent
    //              ladder (pickRecoveryMessage) with different copy, an
    //              in-memory counter, and no server record of the outage.
    // Same outage, two different tutor messages, chosen non-deterministically.
    //
    // routeAI now reports failure and never authors learner-facing text. The
    // degraded-turn owner is route.ts (RS P-3: degradedTurn + renderOutage).
    // This also stops the timeout string from being returned as a verifier
    // re-render draft (route.ts's rerender callback), where it could be
    // verified and served to the learner as a real teaching turn.
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
