import Groq from 'groq-sdk'
import { consumeAIBudget } from '@/lib/ai/budget'
import { captureError } from '@/lib/monitoring'

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY || '', timeout: 20000, maxRetries: 2 })

// ─── Groq (India + Global) ────────────────────────────────────────────────────
interface GroqCallResult {
  text: string
  finishReason: string | null
}

async function callGroq(
  messages: { role: 'user' | 'assistant'; content: string }[],
  systemPrompt: string,
  maxTokens = 800,
): Promise<GroqCallResult> {
  const req = {
    model: 'openai/gpt-oss-20b' as const,
    messages: [
      { role: 'system' as const, content: systemPrompt },
      ...messages.slice(-6),
    ],
    max_tokens: maxTokens,
    temperature: 0.7,
  }
  await consumeAIBudget()
  const response = await groq.chat.completions.create(req)
  const text = response.choices[0]?.message?.content ?? ''
  const finishReason = response.choices[0]?.finish_reason ?? null
  // Diagnostic for the empty-content/"cut off" failure class: 'length' means
  // max_tokens was hit before the model finished (the reasoning-budget
  // theory below); 'stop'/other with empty text is a different, rarer case
  // worth distinguishing in logs if it recurs. Logged on EVERY call (not
  // just failures) so a future occurrence has real evidence instead of
  // requiring another guess — see route.ts's [learn/chat] finish_reason log.
  console.log('[routeAI] Groq finish_reason:', finishReason, text ? '(non-empty)' : '(EMPTY content)')
  if (text) return { text, finishReason }
  // Empty content (null choice or null message). gpt-oss-20b is a reasoning
  // model that spends completion tokens on internal reasoning before the
  // final answer — the likely cause here is the reasoning consuming the
  // whole max_tokens budget before any final content was emitted, not a
  // one-off transient glitch. Retrying with the SAME max_tokens would very
  // plausibly exhaust the same way again (this is the root cause traced to
  // the recurring "Sorry, I got cut off" message in production). Retry with
  // a materially larger budget so the retry has real headroom to actually
  // finish reasoning and still produce a final answer.
  console.warn('[routeAI] Groq returned empty content (finish_reason:', finishReason, '), retrying once with a larger token budget')
  await consumeAIBudget()
  const retry = await groq.chat.completions.create({ ...req, max_tokens: Math.max(req.max_tokens * 2, 2048) })
  const retryText = retry.choices[0]?.message?.content ?? ''
  const retryFinishReason = retry.choices[0]?.finish_reason ?? null
  console.log('[routeAI] Groq retry finish_reason:', retryFinishReason, retryText ? '(non-empty)' : '(EMPTY content — retry also failed)')
  return { text: retryText, finishReason: retryFinishReason }
}

// ─── YandexGPT (Russia only) ──────────────────────────────────────────────────
async function callYandexGPT(
  messages: { role: 'user' | 'assistant'; content: string }[],
  systemPrompt: string,
  maxTokens = 800,
): Promise<GroqCallResult> {
  if (!process.env.YANDEX_API_KEY || !process.env.YANDEX_FOLDER_ID) {
    console.warn('Yandex credentials missing — falling back to Groq')
    return callGroq(messages, systemPrompt, maxTokens)
  }

  try {
    const yandexMessages = [
      { role: 'system', text: systemPrompt },
      ...messages.slice(-6).map((m) => ({
        role: m.role === 'user' ? 'user' : 'assistant',
        text: m.content,
      })),
    ]

    const response = await fetch(
      'https://llm.api.cloud.yandex.net/foundationModels/v1/completion',
      {
        method: 'POST',
        headers: {
          'Authorization': `Api-Key ${process.env.YANDEX_API_KEY}`,
          'x-folder-id': process.env.YANDEX_FOLDER_ID,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          modelUri: `gpt://${process.env.YANDEX_FOLDER_ID}/yandexgpt-lite/latest`,
          completionOptions: {
            stream: false,
            temperature: 0.7,
            maxTokens: maxTokens.toString(),
          },
          messages: yandexMessages,
        }),
        signal: AbortSignal.timeout(25000),
      },
    )

    if (!response.ok) {
      console.error('YandexGPT error:', response.status)
      return callGroq(messages, systemPrompt, maxTokens)
    }

    const data = await response.json()
    const text = data.result?.alternatives?.[0]?.message?.text ?? ''
    // Yandex's closest equivalent to finish_reason is alternatives[0].status
    // (e.g. "ALTERNATIVE_STATUS_FINAL" / "ALTERNATIVE_STATUS_TRUNCATED_FINAL").
    const finishReason = data.result?.alternatives?.[0]?.status ?? null
    return { text, finishReason }
  } catch (error: any) {
    console.error('YandexGPT exception:', error.message)
    return callGroq(messages, systemPrompt, maxTokens)
  }
}

// ─── Main router ──────────────────────────────────────────────────────────────
export interface RouteAIResult {
  text: string
  provider: string
  // The provider's own reason the completion ended ('stop', 'length', etc.
  // for Groq; Yandex's alternatives[0].status; null for the fallback path
  // or errors before any response was received). Threaded through to
  // route.ts so an empty-response failure logs WHY it was empty instead of
  // just THAT it was empty — see the "Sorry, I got cut off" investigation.
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
  console.log('AI Router: country =', country)

  try {
    if (country === 'ru') {
      console.log('→ Routing to YandexGPT')
      const { text, finishReason } = await callYandexGPT(messages, systemPrompt, maxTokens)
      return { text, provider: 'yandex', finishReason }
    }
    console.log('→ Routing to Groq')
    const { text, finishReason } = await callGroq(messages, systemPrompt, maxTokens)
    return { text, provider: 'groq', finishReason }
  } catch (error: any) {
    console.error('routeAI error:', error.message)
    if (error.message?.includes('timeout') || error.message?.includes('timed out')) {
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

// ─── JSON generation (always Groq — faster for structured output) ─────────────
export async function routeJSON(
  prompt: string,
  maxTokens = 1500,
): Promise<any> {
  // routeJSON never throws (callers expect null on failure) — a spent budget
  // degrades to null the same way a provider error does.
  try { await consumeAIBudget() } catch { return null }
  try {
    const response = await groq.chat.completions.create({
      model: 'openai/gpt-oss-20b',
      messages: [{
        role: 'user',
        content: prompt + '\n\nReturn ONLY valid JSON. No markdown. No explanation.',
      }],
      max_tokens: maxTokens,
      temperature: 0.3,
    })
    const text = response.choices[0]?.message?.content ?? '[]'
    const clean = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
    try { return JSON.parse(clean) } catch { return null }
  } catch (error: any) {
    // Swallowed failure — without reporting it would be invisible in production.
    console.error('routeJSON error:', error.message)
    captureError(error, { route: 'lib/ai/routeJSON', tags: { provider: 'groq' } })
    return null
  }
}
