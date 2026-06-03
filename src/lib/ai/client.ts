import Groq from 'groq-sdk'
import { GoogleGenerativeAI } from '@google/generative-ai'

if (!process.env.GROQ_API_KEY) {
  console.error('ERROR: GROQ_API_KEY missing — AI features will not work')
}

export const TUTOR_MODEL = 'llama-3.3-70b-versatile'

// Fallback chain — tried in order when primary returns 429 or 5xx
export const FALLBACK_MODELS = [
  'llama-3.3-70b-versatile',
  'llama3-70b-8192',
  'llama-3.1-8b-instant',
  'gemma2-9b-it',
]

const globalForAI = globalThis as unknown as { groq: Groq | undefined }

export const ai = globalForAI.groq ?? new Groq({
  // Placeholder prevents the SDK from throwing at import time when the key is
  // absent (e.g. during build). Real requests fail gracefully via try/catch.
  apiKey: process.env.GROQ_API_KEY || 'missing-groq-key',
})

if (process.env.NODE_ENV !== 'production') globalForAI.groq = ai

function isRetryableError(err: unknown): boolean {
  if (err instanceof Groq.APIError) {
    if (err.status === 401 || err.status === 403) {
      throw new Error('GROQ_API_KEY is missing or invalid. Please set GROQ_API_KEY in your .env file.')
    }
    return err.status === 429 || err.status >= 500
  }
  const msg = err instanceof Error ? err.message : String(err)
  return msg.includes('429') || msg.includes('Rate limit') || msg.includes('rate_limit') || msg.includes('overloaded')
}

type ChatMessage = { role: 'system' | 'user' | 'assistant'; content: string }
type CreateParams = {
  messages: ChatMessage[]
  temperature?: number
  max_tokens?: number
}

// ─── Gemini fallback ──────────────────────────────────────────────────────────

async function* geminiStream(messages: ChatMessage[]): AsyncIterable<Groq.Chat.Completions.ChatCompletionChunk> {
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
        choices: [{ index: 0, delta: { content: text, role: 'assistant' }, finish_reason: null, logprobs: null }],
      } as Groq.Chat.Completions.ChatCompletionChunk
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

  const chat = model.startChat({
    systemInstruction: { role: 'user', parts: [{ text: system }] },
    history,
    generationConfig,
  })
  const result = await chat.sendMessage(lastMsg)
  return result.response.text()
}

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Simple one-shot AI call. Prepends systemPrompt as a system message.
 * Uses the same Groq fallback chain as chatWithFallback.
 */
export async function generateAIResponse(
  messages: { role: 'user' | 'assistant'; content: string }[],
  systemPrompt: string,
): Promise<string> {
  if (!process.env.GROQ_API_KEY) {
    throw new Error('GROQ_API_KEY is missing from .env.local')
  }
  const completion = await chatWithFallback({
    messages: [{ role: 'system', content: systemPrompt }, ...messages],
    temperature: 0.7,
    max_tokens: 1024,
  })
  return completion.choices[0]?.message?.content ?? ''
}

/** Non-streaming completion with Groq fallback chain, then Gemini. */
export async function chatWithFallback(params: CreateParams): Promise<Groq.Chat.Completions.ChatCompletion> {
  let lastErr: unknown

  for (const model of FALLBACK_MODELS) {
    try {
      return await ai.chat.completions.create({
        model,
        messages: params.messages,
        temperature: params.temperature ?? 0.7,
        max_tokens: params.max_tokens ?? 1024,
        stream: false,
      })
    } catch (err) {
      if (isRetryableError(err)) { lastErr = err; continue }
      throw err
    }
  }

  // All Groq models exhausted — try Gemini
  if (process.env.GEMINI_API_KEY) {
    try {
      const text = await geminiComplete(params.messages, {
        temperature: params.temperature,
        maxOutputTokens: params.max_tokens,
      })
      return {
        id: 'gemini-fallback',
        object: 'chat.completion',
        created: Date.now(),
        model: 'gemini-2.0-flash',
        choices: [{
          index: 0,
          message: { role: 'assistant', content: text },
          finish_reason: 'stop',
          logprobs: null,
        }],
        usage: { prompt_tokens: 0, completion_tokens: 0, total_tokens: 0, queue_time: 0, prompt_time: 0, completion_time: 0, total_time: 0 },
      } as Groq.Chat.Completions.ChatCompletion
    } catch (geminiErr) {
      const msg = geminiErr instanceof Error ? geminiErr.message : String(geminiErr)
      if (!msg.includes('429') && !msg.includes('quota')) throw geminiErr
    }
  }

  throw lastErr
}

/** Streaming completion with Groq fallback chain, then Gemini. */
export async function chatStreamWithFallback(
  params: CreateParams,
): Promise<{ stream: AsyncIterable<Groq.Chat.Completions.ChatCompletionChunk>; model: string }> {
  let lastErr: unknown

  for (const model of FALLBACK_MODELS) {
    try {
      const stream = await ai.chat.completions.create({
        model,
        messages: params.messages,
        temperature: params.temperature ?? 0.7,
        max_tokens: params.max_tokens ?? 1024,
        stream: true,
      })
      return { stream, model }
    } catch (err) {
      if (isRetryableError(err)) { lastErr = err; continue }
      throw err
    }
  }

  // All Groq models exhausted — try Gemini
  if (process.env.GEMINI_API_KEY) {
    try {
      return { stream: geminiStream(params.messages), model: 'gemini-2.0-flash' }
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
  teachingLanguage: 'ru' | 'en' | 'hi' = 'en',
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
- Format code blocks in markdown with the language specified

LEARNING RULES:
1. After each explanation ask: "Got it? Reply: yes / no / partially"
2. If "no" — choose a DIFFERENT approach: analogy, real example, mini-code, smaller steps
3. If "partially" — ask "What exactly is unclear?"
4. NEVER move to next topic without confirmation of understanding
5. Max 3-4 sentences + code, then a question or task
6. Short student replies = fatigue → make it more engaging`
  }

  if (teachingLanguage === 'hi') {
    const memory = memoryContext ? `\n\nपिछले पाठों की याददाश्त:\n${memoryContext}\n` : ''
    return `आप एक अनुभवी ${subject} ट्यूटर हैं जो हिंदी में पढ़ाते हैं।
केवल हिंदी में बात करें, जब तक छात्र स्पष्ट रूप से कुछ और न माँगे।
आपका लक्ष्य छात्र को कदम-दर-कदम सिखाना है, उनके स्तर के अनुसार समझाना है।

छात्र का स्तर: ${studentLevel}
सीखने के लक्ष्य: ${goals}${memory}

HINGLISH SUPPORT:
- छात्र Hinglish में लिख सकते हैं (Hindi + English mix) — यह बिल्कुल ठीक है
- जब छात्र Hinglish में लिखे तो Hinglish में जवाब दें
- Technical terms English में रखें: variable, function, loop, array, pointer
- Casual Hindi use करें: yaar, bhai, dekho, samjho, easy hai, try karo`
  }

  // Russian
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
7. 🔧 Если есть данные о предыдущих уроках — начни с краткого напоминания

Формат ответа:
- Говори как живой учитель, не как энциклопедия
- Используй эмодзи умеренно для дружелюбной атмосферы
- Блоки кода оформляй в markdown с указанием языка

ПРАВИЛА ОБУЧЕНИЯ:
1. После каждого объяснения спроси: "Понял? Отвечай: да / нет / частично"
2. Если "нет" — выбери ДРУГОЙ подход: аналогия, реальный пример, мини-код, разбивка на шаги
3. Если "частично" — спроси "Что именно непонятно?"
4. НЕ переходи к новой теме пока не получишь подтверждение понимания
5. Максимум 3-4 предложения + код, потом вопрос или задание`
}

// ─── Curriculum Generator ─────────────────────────────────────────────────────

export function buildCurriculumPrompt(subject: string, selfDescription: string) {
  return `Create a personalized learning plan for a student on the topic: ${subject}.

Student self-description: "${selfDescription}"

Return ONLY valid JSON in the following structure (no markdown, no explanations):
{
  "title": "Course title",
  "estimatedWeeks": number,
  "steps": [
    {
      "order": 1,
      "title": "Topic title",
      "description": "Brief description",
      "topics": ["topic1", "topic2"],
      "exercises": ["exercise1"],
      "estimatedHours": number
    }
  ]
}

Adapt the difficulty level to the student's description. Create 8 to 15 steps.`
}
