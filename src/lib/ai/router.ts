import { consumeAIBudget } from '@/lib/ai/budget'
import { captureError } from '@/lib/monitoring'
import { createGeminiProvider } from './providers/gemini'
import { createYandexProvider } from './providers/yandex'
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
// ─── YandexGPT (Russian TEACHING LANGUAGE only — never country) ───────────────
// Restored 2026-08-04 as an intentional product decision. Both credentials are
// required: YANDEX_FOLDER_ID is part of the model URI, not merely a header, so
// "configured" means both are present.
const YANDEX_API_KEY = process.env.YANDEX_API_KEY ?? ''
const YANDEX_FOLDER_ID = process.env.YANDEX_FOLDER_ID ?? ''
const YANDEX_MODEL = process.env.YANDEX_MODEL ?? 'yandexgpt-lite/latest'

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY ?? ''
const OPENROUTER_MODEL = process.env.OPENROUTER_MODEL ?? 'deepseek/deepseek-chat-v3.1'
// Third-tier automatic fallback — the model this app ran on before the
// Gemini/OpenRouter migration, kept as a proven-working last resort so a
// Gemini+OpenRouter outage together doesn't take teaching turns down.
const GROQ_API_KEY = process.env.GROQ_API_KEY ?? ''
const GROQ_MODEL = process.env.GROQ_MODEL ?? 'openai/gpt-oss-120b'

/** The teaching language the learner selected. This is the ONLY routing signal. */
export type TeachingLanguage = 'ru' | 'en' | 'hi'

/**
 * Which provider chain a teaching language maps to. THE SINGLE
 * PROVIDER-SELECTION AUTHORITY — nothing else in the codebase may branch on
 * language (or on country) to pick a provider.
 *
 * Explicitly NOT country-based. The pre-52152a18 router keyed YandexGPT off
 * `country === 'ru'`, which is the wrong signal twice over: a Russian-speaking
 * learner in India or Poland got an English-tuned provider, and an
 * English-speaking learner in Russia got YandexGPT. The learner's selected
 * teaching language is what the model has to actually produce, so it is what
 * selects the model — the same signal /api/tts already keys its Yandex voice
 * off (see src/app/api/tts/route.ts), which is what keeps TTS and LLM
 * consistent rather than two independent notions of "is this Russian".
 */
export function chainKeyForLanguage(lang: TeachingLanguage | undefined): 'ru' | 'default' {
  return lang === 'ru' ? 'ru' : 'default'
}

const _routers = new Map<'ru' | 'default', ReturnType<typeof createFailoverRouter>>

/**
 * GEMINI-ONLY MODE — NOW AN OPT-IN DIAGNOSTIC AGAIN (owner instruction,
 * 2026-08-20, reversing the 2026-08-12 inversion below).
 *
 * Reason for the reversal, stated plainly: Gemini alone had nothing to fail
 * over to, and Gemini started returning 429 rate-limit errors in production,
 * so every learner turn was landing on the degraded template — a total
 * teaching outage, not a degraded experience. GROQ_API_KEY has been
 * configured in production the whole time and was sitting unused.
 *
 * The default is once again the full multi-provider chain (see the
 * `candidates` array below): for the default (non-Russian) chain, Groq is
 * now PRIMARY and Gemini is the FALLBACK — reversed from the pre-2026-08-12
 * ordering, which had Gemini primary. This keeps Gemini fully wired and
 * reachable (nothing was removed) while making sure a Gemini outage no
 * longer means "nothing answers."
 *
 *     (unset, or anything else)        -> full chain, Groq primary [DEFAULT]
 *     AI_PROVIDER_MODE=gemini_only     -> Gemini alone (diagnostic escape
 *                                          hatch, symmetric with the old
 *                                          `failover` opt-out — kept in case
 *                                          gemini-only isolation is wanted
 *                                          again later; costs one env var)
 *
 * IT DOES NOT TOUCH YANDEXGPT FOR RUSSIAN TEACHING. The Russian chain is
 * assembled as its own array below (Yandex -> Gemini -> OpenRouter -> Groq,
 * byte-for-byte the 2026-08-04 order) and is not reordered by this change —
 * only the DEFAULT (non-Russian) chain's internal order changes. Russian
 * text-to-speech was never affected by any of this — `/api/tts` still routes
 * Russian audio to Yandex independently.
 */
export function isGeminiOnlyMode(): boolean {
  // Explicit opt-IN only. Anything else — including unset — uses the full
  // failover chain (Groq primary for the default chain).
  return (process.env.AI_PROVIDER_MODE ?? '').trim().toLowerCase() === 'gemini_only'
}

/**
 * A/B provider-certification gate (2026-08-21). Allowlist of Groq models a
 * certification run may request via the `x-cert-groq-model` header — the
 * header alone does nothing; the caller (route.ts) must ALSO have verified
 * the authenticated user's `modelOverrideAllowed` DB flag is true before
 * this value is ever honoured. Kept as a closed list (not "any string the
 * client sends") so a spoofed header can at most select a real Groq model,
 * never arbitrary provider config.
 */
const GROQ_CERT_MODEL_ALLOWLIST = ['openai/gpt-oss-20b', 'openai/gpt-oss-120b']

export function isAllowedGroqCertModel(model: string | null | undefined): model is string {
  return !!model && GROQ_CERT_MODEL_ALLOWLIST.includes(model)
}

function getRouter(lang?: TeachingLanguage, groqModelOverride?: string) {
  const chain = chainKeyForLanguage(lang)

  // A per-request override never uses (or pollutes) the shared cache — it is
  // a one-off router built for this single certification-gated request only,
  // and only the default (non-Russian) chain honours it.
  if (groqModelOverride && chain === 'default' && isGeminiOnlyMode() === false) {
    console.log(`[ai/router] cert override active — groq model=${groqModelOverride} (this request only)`)
    return createFailoverRouter({
      providers: [
        { key: GROQ_API_KEY, provider: createGroqProvider(GROQ_API_KEY, groqModelOverride) },
        { key: GEMINI_API_KEY, provider: createGeminiProvider(GEMINI_API_KEY, GEMINI_MODEL) },
        { key: OPENROUTER_API_KEY, provider: createOpenRouterProvider(OPENROUTER_API_KEY, OPENROUTER_MODEL) },
      ].filter((c) => c.key !== '').map((c) => c.provider),
      disableSameProviderRetry: true,
    })
  }

  const cached = _routers.get(chain)
  if (cached) return cached

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
    //
    // Language does not widen this: gemini_only means gemini only, for Russian
    // too. The diagnostic exists to measure Gemini in isolation, and a Russian
    // turn silently routed to YandexGPT would corrupt that measurement exactly
    // as a failover hop would.
    console.log('[ai/router] gemini-only mode (AI_PROVIDER_MODE=gemini_only) — failover and same-provider retry disabled; unset AI_PROVIDER_MODE to use the full chain')
    const geminiOnly = createFailoverRouter({
      providers: [createGeminiProvider(GEMINI_API_KEY, GEMINI_MODEL)],
      disableSameProviderRetry: true,
    })
    _routers.set(chain, geminiOnly)
    return geminiOnly
  }

  // Production evidence (Vercel runtime errors, 2026-07-25/26): OpenRouter
  // was attempted on every single request and failed every time with
  // "401 Missing Authentication header" — OPENROUTER_API_KEY is unset in
  // this deployment, so createOpenRouterProvider('', ...) was always a
  // guaranteed-fail real HTTP round-trip before falling through to the
  // next tier. Same risk exists for any provider whose key is unset.
  // Filtering out providers with no configured key removes that wasted
  // (and log-polluting) hop — behavior is otherwise identical, since an
  // empty-key provider could never have succeeded anyway. GROQ_API_KEY is
  // the one credential this app has always required (CLAUDE.md/.env.example),
  // so the chain is never empty in practice.
  //
  // Russian's chain is its own array — YandexGPT -> Gemini -> OpenRouter ->
  // Groq, byte-for-byte the 2026-08-04 order, deliberately NOT reordered by
  // the 2026-08-20 Groq-primary change below (see isGeminiOnlyMode()'s doc
  // comment for why). The Yandex tier is subject to the identical empty-key
  // filter — it needs BOTH credentials, so an unset YANDEX_FOLDER_ID drops it
  // rather than spending a guaranteed-fail round-trip on a request whose
  // model URI cannot be formed.
  //
  // The DEFAULT (non-Russian) chain is Groq -> Gemini -> OpenRouter
  // (2026-08-20, owner-authorized reversal of the Gemini-primary order this
  // chain used before 2026-08-12's Gemini-only default, reasoned above in
  // isGeminiOnlyMode()'s doc comment): Groq is the credential this app has
  // always required and was sitting completely unused while Gemini alone
  // absorbed a rate-limit outage. OpenRouter stays as a third tier — its key
  // is unset in production today, so it is filtered out below exactly as it
  // always was; nothing about its role changes.
  const candidates: Array<{ key: string; provider: AIProvider }> = chain === 'ru' ? [
    {
      key: YANDEX_API_KEY && YANDEX_FOLDER_ID ? YANDEX_API_KEY : '',
      provider: createYandexProvider(YANDEX_API_KEY, YANDEX_FOLDER_ID, YANDEX_MODEL),
    },
    { key: GEMINI_API_KEY, provider: createGeminiProvider(GEMINI_API_KEY, GEMINI_MODEL) },
    { key: OPENROUTER_API_KEY, provider: createOpenRouterProvider(OPENROUTER_API_KEY, OPENROUTER_MODEL) },
    { key: GROQ_API_KEY, provider: createGroqProvider(GROQ_API_KEY, GROQ_MODEL) },
  ] : [
    { key: GROQ_API_KEY, provider: createGroqProvider(GROQ_API_KEY, GROQ_MODEL) },
    { key: GEMINI_API_KEY, provider: createGeminiProvider(GEMINI_API_KEY, GEMINI_MODEL) },
    { key: OPENROUTER_API_KEY, provider: createOpenRouterProvider(OPENROUTER_API_KEY, OPENROUTER_MODEL) },
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
  const router = createFailoverRouter({
    providers: providers.length > 0 ? providers : candidates.map((c) => c.provider),
    disableSameProviderRetry: true,
  })
  _routers.set(chain, router)
  return router
}

/** Chain for the given teaching language; omit for the default (non-Russian)
 *  chain. Callers that generate no learner-facing prose (JSON, internal
 *  analysis) should omit it. */
export function getAIRouter(lang?: TeachingLanguage) { return getRouter(lang) }

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
  // NOT A ROUTING SIGNAL — deliberately. This was the YandexGPT selector
  // before 52152a18 (`country === 'ru'`), and restoring YandexGPT on the
  // learner's language rather than their location is the whole point of the
  // 2026-08-04 change: Russian in India, Poland or Russia all route to
  // YandexGPT, and English in Russia does not. Kept because it is genuinely
  // useful in logs, and read by no provider.
  country: string,
  maxTokens = 800,
  // THE routing signal: the learner's selected teaching language. Every call
  // site already passed it (chat route, verifier re-render, lesson-init), so
  // wiring it into provider selection needed no call-site changes.
  lang: TeachingLanguage = 'en',
  _meta?: Record<string, unknown>,
  // A/B provider-certification gate (2026-08-21). Set ONLY by the caller
  // after it has independently verified the authenticated user's DB flag —
  // routeAI performs no such verification itself, it just wires the value
  // through if given one. Ignored for the Russian chain and in gemini-only
  // diagnostic mode.
  groqModelOverride?: string,
): Promise<RouteAIResult> {
  console.log(
    `[ai/router] routing request, teaching_language=${lang} chain=${chainKeyForLanguage(lang)}` +
    ` country=${country} (country is not a routing signal)` +
    (groqModelOverride ? ` groq_model_override=${groqModelOverride}` : ''),
  )

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
    const result = await getRouter(lang, groqModelOverride).complete(req)
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

    // SEV-1 part 3 (2026-08-02): routeAI must REPORT failure, never absorb it.
    //
    // This used to special-case a timeout: when the chain was exhausted and the
    // last error happened to be an AITimeoutError, routeAI swallowed it and
    // returned canned text with provider:'fallback' instead of throwing. Every
    // other exhaustion threw. failoverRouter rethrows `lastErr` — the LAST
    // provider's error — so which branch ran depended on which provider was
    // last and how it failed.
    //
    // That breaks the P0 guarantee directly: a swallowed timeout is reported to
    // the caller as SUCCESS, so route.ts's degraded path (RS P-3) never runs
    // and lesson-init persists "Taking longer than usual. Please try again." as
    // the lesson opening. On the chat route the client then discards it
    // (LessonScreen's isFallbackResponse re-throws on provider==='fallback'),
    // so the learner received neither a Gemini answer NOR the degraded
    // template — the silent death this objective exists to remove.
    //
    // Every failure mode now reaches the one owner of degraded copy: the
    // caller's fallback path.
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
