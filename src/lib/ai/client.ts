export const TUTOR_MODEL = 'llama-3.3-70b-versatile'

const FALLBACK_MODELS = [
  'llama-3.3-70b-versatile',
  'llama3-70b-8192',
  'llama-3.1-8b-instant',
  'gemma2-9b-it',
]

const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions'

// Read and sanitize the key at call time (not module load time) so that
// env vars set after import (e.g. via $env: in PowerShell) are always picked up.
function getGroqHeaders() {
  const key = (process.env.GROQ_API_KEY || '').trim().replace(/^["']|["']$/g, '')
  return {
    Authorization: `Bearer ${key}`,
    'Content-Type': 'application/json',
    Accept: 'application/json',
    // Node's undici User-Agent gets bot-blocked by Cloudflare (which fronts Groq).
    // A browser-like UA passes the same way PowerShell/curl does.
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  }
}

type ChatMessage = { role: 'system' | 'user' | 'assistant'; content: string }

type GroqCompletion = {
  choices?: { message?: { content?: string } }[]
}

/**
 * Call Groq's REST API directly with fetch — mirrors a plain curl/PowerShell
 * request (only Authorization + Content-Type). The groq-sdk adds extra
 * telemetry headers (x-stainless-*) that can trigger a "403 Forbidden" block
 * on some networks/proxies even with a valid key, so we bypass it entirely.
 * Tries each fallback model until one succeeds.
 */
async function groqChat(
  messages: ChatMessage[],
  opts: { temperature?: number; max_tokens?: number } = {},
): Promise<string> {
  let lastErr: unknown
  for (const model of FALLBACK_MODELS) {
    try {
      const res = await fetch(GROQ_URL, {
        method: 'POST',
        headers: getGroqHeaders(),
        body: JSON.stringify({
          model,
          messages,
          temperature: opts.temperature ?? 0.7,
          max_tokens: opts.max_tokens ?? 1024,
        }),
      })

      if (!res.ok) {
        const body = await res.text()
        // 401/403 = key/account issue: don't bother trying other models
        if (res.status === 401 || res.status === 403) {
          throw new Error(`Groq auth failed (${res.status}): ${body}`)
        }
        // 429 / 5xx — try the next fallback model
        lastErr = new Error(`Groq ${res.status}: ${body}`)
        continue
      }

      const data = (await res.json()) as GroqCompletion
      return data.choices?.[0]?.message?.content ?? ''
    } catch (err) {
      // Re-throw auth errors immediately
      if (err instanceof Error && err.message.startsWith('Groq auth failed')) throw err
      lastErr = err
    }
  }
  throw lastErr ?? new Error('Groq: all models failed')
}

// ─── Simple helpers ───────────────────────────────────────────────────────────

export async function generateAIResponse(
  messages: { role: 'user' | 'assistant'; content: string }[],
  systemPrompt: string,
  maxTokens = 1024,
): Promise<string> {
  return groqChat(
    [{ role: 'system', content: systemPrompt }, ...messages],
    { max_tokens: maxTokens, temperature: 0.7 },
  )
}

export async function generateJSON(prompt: string, maxTokens = 2048): Promise<unknown> {
  const text = await groqChat(
    [{ role: 'user', content: prompt + '\n\nRespond with ONLY valid JSON. No markdown, no explanation, no backticks.' }],
    { max_tokens: maxTokens, temperature: 0.3 },
  )
  const clean = (text || '[]').replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
  try { return JSON.parse(clean) } catch { return null }
}

export async function summarizeSession(
  messages: { role: string; content: string }[],
  lang: string,
): Promise<string> {
  if (!process.env.GROQ_API_KEY) return ''
  const prompt = lang === 'ru'
    ? 'Summarize this tutoring session in 2 sentences in Russian.'
    : lang === 'hi'
    ? 'इस session को 2 sentences में summarize करें।'
    : 'Summarize this tutoring session in 2 sentences in English.'
  try {
    return await groqChat(
      [
        { role: 'system', content: prompt },
        ...messages.map((m) => ({ role: m.role as 'user' | 'assistant', content: m.content })),
      ],
      { max_tokens: 200 },
    )
  } catch { return '' }
}

// ─── System Prompts ───────────────────────────────────────────────────────────

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
