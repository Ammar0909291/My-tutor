import OpenAI from 'openai'
import { GoogleGenerativeAI } from '@google/generative-ai'

export const TUTOR_MODEL = 'google/gemma-3-27b-it:free'

// Fallback chain — tried in order when a model returns 429, 404, or 5xx
export const FALLBACK_MODELS = [
  'meta-llama/llama-3.3-70b-instruct:free',
  'deepseek/deepseek-chat-v3-0324:free',
  'google/gemma-3-27b-it:free',
  'mistralai/mistral-7b-instruct:free',
  'microsoft/phi-4:free',
  'qwen/qwen3-8b:free',
  'tngtech/deepseek-r1t-chimera:free',
]

const globalForAI = globalThis as unknown as { ai: OpenAI | undefined }

export const ai = globalForAI.ai ?? new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  // Placeholder prevents the SDK from throwing at import time when the key is
  // absent (e.g. during build). Real requests fail gracefully via try/catch.
  apiKey: process.env.OPENROUTER_API_KEY || 'missing-openrouter-key',
  defaultHeaders: {
    'HTTP-Referer': process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000',
    'X-Title': 'My Tutor',
  },
})

if (process.env.NODE_ENV !== 'production') globalForAI.ai = ai

function isRetryableError(err: unknown): boolean {
  if (err instanceof OpenAI.APIError) {
    // 404 = model not found on OpenRouter, also retry to try next model
    return err.status === 404 || err.status === 429 || err.status >= 500
  }
  const msg = err instanceof Error ? err.message : String(err)
  return msg.includes('404') || msg.includes('429') || msg.includes('Rate limit') || msg.includes('rate_limit')
}

type ChatParams = Parameters<typeof ai.chat.completions.create>[0]
type ChatMessage = { role: 'system' | 'user' | 'assistant'; content: string }

// ─── Gemini fallback (streaming) ──────────────────────────────────────────────

async function* geminiStream(messages: ChatMessage[]): AsyncIterable<OpenAI.Chat.Completions.ChatCompletionChunk> {
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) throw new Error('GEMINI_API_KEY not set')

  const genAI = new GoogleGenerativeAI(apiKey)
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' })

  const system = messages.find((m) => m.role === 'system')?.content ?? ''
  const history = messages
    .filter((m) => m.role !== 'system')
    .slice(0, -1)
    .map((m) => ({
      role: m.role === 'user' ? 'user' as const : 'model' as const,
      parts: [{ text: m.content }],
    }))
  const lastMsg = messages.filter((m) => m.role !== 'system').at(-1)?.content ?? ''

  const chat = model.startChat({
    systemInstruction: { role: 'user', parts: [{ text: system }] },
    history,
  })

  const result = await chat.sendMessageStream(lastMsg)

  for await (const chunk of result.stream) {
    const text = chunk.text()
    if (text) {
      yield {
        id: 'gemini',
        object: 'chat.completion.chunk',
        created: Date.now(),
        model: 'gemini-2.0-flash',
        choices: [{ index: 0, delta: { content: text }, finish_reason: null, logprobs: null }],
      } as OpenAI.Chat.Completions.ChatCompletionChunk
    }
  }
}

async function geminiComplete(
  messages: ChatMessage[],
  generationConfig?: { temperature?: number; maxOutputTokens?: number },
): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) throw new Error('GEMINI_API_KEY not set')

  const genAI = new GoogleGenerativeAI(apiKey)
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' })

  const system = messages.find((m) => m.role === 'system')?.content ?? ''
  const history = messages
    .filter((m) => m.role !== 'system')
    .slice(0, -1)
    .map((m) => ({
      role: m.role === 'user' ? 'user' as const : 'model' as const,
      parts: [{ text: m.content }],
    }))
  const lastMsg = messages.filter((m) => m.role !== 'system').at(-1)?.content ?? ''

  const chat = model.startChat({ systemInstruction: { role: 'user', parts: [{ text: system }] }, history, generationConfig })
  const result = await chat.sendMessage(lastMsg)
  return result.response.text()
}

// ─── Public API ───────────────────────────────────────────────────────────────

/** Non-streaming completion with OpenRouter fallback chain, then Gemini. */
export async function chatWithFallback(
  params: Omit<ChatParams, 'model' | 'stream'>
): Promise<OpenAI.Chat.Completions.ChatCompletion> {
  let lastErr: unknown
  for (const model of FALLBACK_MODELS) {
    try {
      return await ai.chat.completions.create({ ...params, model, stream: false })
    } catch (err) {
      if (isRetryableError(err)) { lastErr = err; continue }
      throw err
    }
  }

  // All OpenRouter models exhausted — try Gemini (skip if quota exhausted)
  if (process.env.GEMINI_API_KEY) {
    try {
      const messages = (params.messages ?? []) as ChatMessage[]
      const text = await geminiComplete(messages, {
        temperature: typeof params.temperature === 'number' ? params.temperature : undefined,
        maxOutputTokens: typeof params.max_tokens === 'number' ? params.max_tokens : undefined,
      })
      return {
        id: 'gemini-fallback',
        object: 'chat.completion',
        created: Date.now(),
        model: 'gemini-2.0-flash',
        choices: [{ index: 0, message: { role: 'assistant', content: text }, finish_reason: 'stop', logprobs: null }],
        usage: { prompt_tokens: 0, completion_tokens: 0, total_tokens: 0 },
      } as OpenAI.Chat.Completions.ChatCompletion
    } catch (geminiErr) {
      // 429 quota exceeded — surface original OpenRouter error instead
      const msg = geminiErr instanceof Error ? geminiErr.message : String(geminiErr)
      if (!msg.includes('429') && !msg.includes('quota')) throw geminiErr
    }
  }

  throw lastErr
}

/** Streaming completion with OpenRouter fallback chain, then Gemini. */
export async function chatStreamWithFallback(
  params: Omit<ChatParams, 'model' | 'stream'>
): Promise<{ stream: AsyncIterable<OpenAI.Chat.Completions.ChatCompletionChunk>; model: string }> {
  let lastErr: unknown
  for (const model of FALLBACK_MODELS) {
    try {
      const stream = await ai.chat.completions.create({ ...params, model, stream: true })
      return { stream, model }
    } catch (err) {
      if (isRetryableError(err)) { lastErr = err; continue }
      throw err
    }
  }

  // All OpenRouter models exhausted — try Gemini (skip if quota exhausted)
  if (process.env.GEMINI_API_KEY) {
    try {
      const messages = (params.messages ?? []) as ChatMessage[]
      return { stream: geminiStream(messages), model: 'gemini-2.0-flash' }
    } catch (geminiErr) {
      const msg = geminiErr instanceof Error ? geminiErr.message : String(geminiErr)
      if (!msg.includes('429') && !msg.includes('quota')) throw geminiErr
    }
  }

  throw lastErr
}

// ─── System Prompt ────────────────────────────────────────────────────────────

export function buildTutorSystemPrompt(
  subject: string,
  studentLevel: string,
  goals: string,
  memoryContext?: string | null,
  teachingLanguage: 'ru' | 'en' | 'hi' = 'ru',
) {
  if (teachingLanguage === 'en') {
    const memory = memoryContext ? `\n\nMemory from previous lessons:\n${memoryContext}\n` : ''
    return `You are an experienced ${subject} tutor who teaches in English.
Communicate ONLY in English unless the student explicitly asks otherwise.
Your goal is to teach step by step, adapting explanations to the student's level.

Student level: ${studentLevel}
Learning goals: ${goals}${memory}
Principles:
1. ▶ Explain simply using real-life analogies
2. 📌 After each explanation, ask a comprehension question
3. 💡 If the student is confused, change your approach and use a different example
4. ⚠️ Praise progress, but don't overdo it
5. ✅ When writing code, always explain every line
6. ❓ Notice when the student is tired or confused, and suggest a pause or simplification
7. 🔧 If there's data from previous lessons, start with a brief reminder and continue from where you left off

Response format:
- Speak like a live teacher, not an encyclopedia
- Use emojis sparingly for a friendly atmosphere
- Format code blocks in markdown with the language specified`
  }

  if (teachingLanguage === 'hi') {
    const memory = memoryContext ? `\n\nपिछले पाठों की याददाश्त:\n${memoryContext}\n` : ''
    return `आप एक अनुभवी ${subject} ट्यूटर हैं जो हिंदी में पढ़ाते हैं।
केवल हिंदी में बात करें, जब तक छात्र स्पष्ट रूप से कुछ और न माँगे।
आपका लक्ष्य छात्र को कदम-दर-कदम सिखाना है, उनके स्तर के अनुसार समझाना है।

छात्र का स्तर: ${studentLevel}
सीखने के लक्ष्य: ${goals}${memory}
काम के सिद्धांत:
1. ▶ सरल भाषा में समझाएं, असली जीवन के उदाहरण दें
2. 📌 हर explanation के बाद पूछें: क्या आप समझे?
3. 💡 अगर छात्र उलझा हो — अलग तरीके से समझाएं, नया उदाहरण दें
4. ⚠️ प्रगति की तारीफ करें, लेकिन ज़्यादा नहीं
5. ✅ जब कोड लिखें — हर line को हिंदी में समझाएं
6. ❓ ध्यान दें जब छात्र थका हो या उलझा हो, और pause या सरलीकरण सुझाएं
7. 🔧 पिछले पाठों का डेटा हो तो — शुरुआत में संक्षिप्त याद दिलाएं और वहीं से जारी रखें

जवाब का तरीका:
- एक जीवंत शिक्षक की तरह बात करें, encyclopaedia की तरह नहीं
- दोस्ताना माहौल के लिए emojis का संयमित उपयोग करें
- Code blocks को markdown में भाषा के साथ लिखें
- Code के comments जहाँ संभव हो हिंदी में लिखें`
  }

  // Default: Russian
  const memorySection = memoryContext ? `\n\nПамять о предыдущих уроках:\n${memoryContext}\n` : ''
  return `Ты — опытный русскоязычный преподаватель ${subject}.
Ты общаешься ТОЛЬКО на русском языке, если студент явно не попросит иначе.
Твоя задача — обучать студента шаг за шагом, адаптируя объяснения под его уровень.

Уровень студента: ${studentLevel}
Цели обучения: ${goals}${memorySection}
Принципы работы:
1. ▶ Объясняй просто и понятно, используй аналогии из реальной жизни
2. 📌 После каждого объяснения задавай проверочный вопрос
3. 💡 Если студент путается — измени подход, используй другой пример
4. ⚠️ Хвали за успехи, но не переусердствуй
5. ✅ Если пишешь код — всегда объясняй каждую строку
6. ❓ Замечай, когда студент устал или запутался, и предлагай паузу или упрощение
7. 🔧 Если есть данные о предыдущих уроках — начни с краткого напоминания о том, что изучалось, и продолжи с места остановки

Формат ответа:
- Говори как живой учитель, не как энциклопедия
- Используй эмодзи умеренно для дружелюбной атмосферы
- Блоки кода оформляй в markdown с указанием языка`
}

// ─── Curriculum Generator ─────────────────────────────────────────────────────

export function buildCurriculumPrompt(subject: string, selfDescription: string) {
  return `Составь персональный учебный план для студента по теме: ${subject}.

Самоописание студента: "${selfDescription}"

Верни ТОЛЬКО валидный JSON следующей структуры (без markdown, без пояснений):
{
  "title": "Название курса",
  "estimatedWeeks": число,
  "steps": [
    {
      "order": 1,
      "title": "Название темы",
      "description": "Краткое описание",
      "topics": ["тема1", "тема2"],
      "exercises": ["упражнение1"],
      "estimatedHours": число
    }
  ]
}

Адаптируй уровень сложности под описание студента. Создай от 8 до 15 шагов.`
}
