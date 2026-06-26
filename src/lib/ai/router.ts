import Groq from 'groq-sdk'
import { consumeAIBudget } from '@/lib/ai/budget'
import { captureError } from '@/lib/monitoring'

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY || '', timeout: 20000, maxRetries: 2 })

// ─── Groq (India + Global) ────────────────────────────────────────────────────
async function callGroq(
  messages: { role: 'user' | 'assistant'; content: string }[],
  systemPrompt: string,
  maxTokens = 800,
): Promise<string> {
  await consumeAIBudget()
  const response = await groq.chat.completions.create({
    model: 'openai/gpt-oss-20b',
    messages: [
      { role: 'system', content: systemPrompt },
      ...messages.slice(-6),
    ],
    max_tokens: maxTokens,
    temperature: 0.7,
  })
  return response.choices[0]?.message?.content ?? ''
}

// ─── YandexGPT (Russia only) ──────────────────────────────────────────────────
async function callYandexGPT(
  messages: { role: 'user' | 'assistant'; content: string }[],
  systemPrompt: string,
  maxTokens = 800,
): Promise<string> {
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
    return data.result?.alternatives?.[0]?.message?.text ?? ''
  } catch (error: any) {
    console.error('YandexGPT exception:', error.message)
    return callGroq(messages, systemPrompt, maxTokens)
  }
}

// ─── Main router ──────────────────────────────────────────────────────────────
export interface RouteAIResult {
  text: string
  provider: string
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
      const text = await callYandexGPT(messages, systemPrompt, maxTokens)
      return { text, provider: 'yandex' }
    }
    console.log('→ Routing to Groq')
    const text = await callGroq(messages, systemPrompt, maxTokens)
    return { text, provider: 'groq' }
  } catch (error: any) {
    console.error('routeAI error:', error.message)
    if (error.message?.includes('timeout') || error.message?.includes('timed out')) {
      const timeoutMsg: Record<string, string> = {
        en: 'Taking longer than usual. Please try again.',
        ru: 'Думаю дольше обычного. Попробуй ещё раз.',
        hi: 'Thoda time lag raha hai. Please try again.',
      }
      return { text: timeoutMsg[lang] || timeoutMsg.en, provider: 'fallback' }
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
