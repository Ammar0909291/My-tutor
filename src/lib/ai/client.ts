import OpenAI from 'openai'

export const TUTOR_MODEL = 'google/gemma-4-31b-it:free'

// Fallback chain — tried in order when a model returns 429 or 5xx
export const FALLBACK_MODELS = [
  'google/gemma-4-31b-it:free',
  'openai/gpt-oss-20b:free',
  'qwen/qwen3-next-80b-a3b-instruct:free',
  'google/gemma-4-26b-a4b-it:free',
  'openai/gpt-oss-120b:free',
]

const globalForAI = globalThis as unknown as { ai: OpenAI | undefined }

export const ai = globalForAI.ai ?? new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY!,
  defaultHeaders: {
    'HTTP-Referer': process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000',
    'X-Title': 'My Tutor',
  },
})

if (process.env.NODE_ENV !== 'production') globalForAI.ai = ai

function isRetryableError(err: unknown): boolean {
  if (err instanceof OpenAI.APIError) {
    return err.status === 429 || err.status >= 500
  }
  return false
}

type ChatParams = Parameters<typeof ai.chat.completions.create>[0]

/** Non-streaming completion with automatic model fallback. */
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
  throw lastErr
}

/** Streaming completion with automatic model fallback. */
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
  throw lastErr
}

// ─── System Prompt ────────────────────────────────────────────────────────────

export function buildTutorSystemPrompt(
  subject: string,
  studentLevel: string,
  goals: string,
  memoryContext?: string | null
) {
  const memorySection = memoryContext
    ? `\n\nПамять о предыдущих уроках:\n${memoryContext}\n`
    : ''

  return `Ты — опытный русскоязычный преподаватель ${subject}.
Ты общаешься ТОЛЬКО на русском языке, если студент явно не попросит иначе.
Твоя задача — обучать студента шаг за шагом, адаптируя объяснения под его уровень.

Уровень студента: ${studentLevel}
Цели обучения: ${goals}${memorySection}
Принципы работы:
1. Объясняй просто и понятно, используй аналогии из реальной жизни
2. После каждого объяснения задавай проверочный вопрос
3. Если студент путается — измени подход, используй другой пример
4. Хвали за успехи, но не переусердствуй
5. Если пишешь код — всегда объясняй каждую строку
6. Замечай, когда студент устал или запутался, и предлагай паузу или упрощение
7. Если есть данные о предыдущих уроках — начни с краткого напоминания о том, что изучалось, и продолжи с места остановки

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
