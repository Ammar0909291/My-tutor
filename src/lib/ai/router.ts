import { consumeAIBudget } from '@/lib/ai/budget'
import { captureError } from '@/lib/monitoring'
import { createGeminiProvider } from './providers/gemini'
import { createOpenRouterProvider } from './providers/openrouter'
import { createFailoverRouter } from './providers/failoverRouter'
import type { AIProvider, AICompletionRequest } from './providers/types'
import { AIProviderError } from './providers/types'

// ─── Provider configuration (env-var driven) ─────────────────────────────────
const GEMINI_API_KEY = process.env.GEMINI_API_KEY ?? ''
// 'gemini-2.5-flash' (this constant's value until 2026-07-25) returns a hard
// 404 "no longer available to new users" for any Google AI Studio key issued
// after Gemini 3's release — reproduced directly against the Generative
// Language API with a live production key. 'gemini-3.5-flash' is confirmed
// working (finishReason STOP, real text) against the same key/account.
const GEMINI_MODEL = process.env.GEMINI_MODEL ?? 'gemini-3.5-flash'
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY ?? ''
const OPENROUTER_MODEL = process.env.OPENROUTER_MODEL ?? 'deepseek/deepseek-chat-v3.1'

let _router: ReturnType<typeof createFailoverRouter> | null = null

function getRouter() {
  if (_router) return _router
  const primary = createGeminiProvider(GEMINI_API_KEY, GEMINI_MODEL)
  const fallback = createOpenRouterProvider(OPENROUTER_API_KEY, OPENROUTER_MODEL)
  _router = createFailoverRouter({ primary, fallback })
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
