import Groq from 'groq-sdk'
import { consumeAIBudget } from '@/lib/ai/budget'
import { captureError } from '@/lib/monitoring'

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || '',
  timeout: 20000,
  maxRetries: 2,
})

export async function generateAIResponse(
  messages: { role: 'user' | 'assistant'; content: string }[],
  systemPrompt: string,
  maxTokens = 800,
  lang: 'ru' | 'en' | 'hi' = 'en',
): Promise<string> {
  await consumeAIBudget() // propagates AIBudgetExceededError — callers already handle thrown provider errors
  try {
    const response = await groq.chat.completions.create({
      model: 'llama-3.1-8b-instant',
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages.slice(-6),
      ],
      max_tokens: maxTokens,
      temperature: 0.7,
    })
    return response.choices[0]?.message?.content ?? ''
  } catch (error: any) {
    console.error('Groq error:', error.message)
    if (error.message?.includes('timeout') || error.message?.includes('timed out')) {
      const timeoutMsg: Record<string, string> = {
        en: 'Taking longer than usual. Please try again.',
        ru: 'Думаю дольше обычного. Попробуй ещё раз.',
        hi: 'Thoda time lag raha hai. Please try again.',
      }
      return timeoutMsg[lang] || timeoutMsg.en
    }
    throw error
  }
}

export async function generateJSON(
  prompt: string,
  maxTokens = 1500,
): Promise<any> {
  // generateJSON never throws (callers expect null on failure) — a spent
  // budget degrades to null the same way a provider error does.
  try { await consumeAIBudget() } catch { return null }
  try {
    const response = await groq.chat.completions.create({
      model: 'llama-3.1-8b-instant',
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
    console.error('Groq JSON error:', error.message)
    captureError(error, { route: 'lib/ai/generateJSON', tags: { provider: 'groq' } })
    return null
  }
}

export async function summarizeSession(
  messages: { role: string; content: string }[],
  lang: string,
): Promise<string> {
  if (!process.env.GROQ_API_KEY) return ''
  try { await consumeAIBudget() } catch { return '' }
  const prompt = lang === 'ru'
    ? 'Summarize this tutoring session in 2 sentences in Russian.'
    : lang === 'hi'
    ? 'इस session को 2 sentences में summarize करें।'
    : 'Summarize this tutoring session in 2 sentences in English.'
  try {
    const response = await groq.chat.completions.create({
      model: 'llama-3.1-8b-instant',
      messages: [
        { role: 'system', content: prompt },
        ...messages.map((m) => ({ role: m.role as 'user' | 'assistant', content: m.content })),
      ],
      max_tokens: 200,
    })
    return response.choices[0]?.message?.content ?? ''
  } catch { return '' }
}

// ─── System Prompts ───────────────────────────────────────────────────────────

export interface LessonContext {
  currentLesson: number
  totalLessons: number
  lessonTitle: string
  lessonGoal: string
  unitTitle: string
  completedLessons: number[]
}

export function buildTutorSystemPrompt(
  subject: string,
  studentName: string,
  studentLevel: string,
  goals: string,
  memoryContext?: string | null,
  teachingLanguage: 'ru' | 'en' | 'hi' = 'en',
  lessonCtx?: LessonContext | null,
  _subjectType?: string,
) {
  const lessonBlock = lessonCtx
    ? teachingLanguage === 'ru'
      ? `\n\nТЕКУЩИЙ УРОК:\nУрок ${lessonCtx.currentLesson} из ${lessonCtx.totalLessons}: "${lessonCtx.lessonTitle}"\nРаздел: ${lessonCtx.unitTitle}\nЦель урока: ${lessonCtx.lessonGoal}\nПройдено уроков: ${lessonCtx.completedLessons.length} из ${lessonCtx.totalLessons}\n\nКогда студент явно говорит "понял", "готов к следующему" или "закончили урок" И ты уверен что цель урока достигнута — ответь СТРОГО в конце сообщения: [LESSON_COMPLETE]`
      : teachingLanguage === 'hi'
      ? `\n\nCURRENT LESSON:\nLesson ${lessonCtx.currentLesson} of ${lessonCtx.totalLessons}: "${lessonCtx.lessonTitle}"\nUnit: ${lessonCtx.unitTitle}\nLesson goal: ${lessonCtx.lessonGoal}\nCompleted: ${lessonCtx.completedLessons.length} of ${lessonCtx.totalLessons}\n\nJab student clearly kahe "samajh gaya", "next lesson" ya "done" AND lesson goal achieve ho jaye — reply ke BILKUL END mein likhein: [LESSON_COMPLETE]`
      : `\n\nCURRENT LESSON:\nLesson ${lessonCtx.currentLesson} of ${lessonCtx.totalLessons}: "${lessonCtx.lessonTitle}"\nUnit: ${lessonCtx.unitTitle}\nLesson goal: ${lessonCtx.lessonGoal}\nCompleted: ${lessonCtx.completedLessons.length} of ${lessonCtx.totalLessons}\n\nWhen the student clearly says "understood", "ready for next", or "done" AND you are confident the lesson goal is achieved — append EXACTLY at the very end: [LESSON_COMPLETE]`
    : ''

  if (teachingLanguage === 'en') {
    const memory = memoryContext ? `\n\nMemory from previous lessons:\n${memoryContext}\n` : ''
    return `You are an experienced ${subject} tutor who teaches in English.
Communicate ONLY in English unless the student explicitly asks otherwise.
Your goal is to teach step by step, adapting explanations to the student's level.
SUBJECT BOUNDARY: You teach ${subject} ONLY. If the student asks about a different subject, briefly acknowledge the question and redirect to the current ${subject} lesson — they can switch subjects from the dashboard. Cross-disciplinary connections that genuinely illuminate ${subject} are fine; teaching another subject is not.

Student name: ${studentName} — address the student by this name. Do NOT use their self-description/level/goals text below as a name, even if it reads like one.
Student level: ${studentLevel}
Learning goals: ${goals}${memory}${lessonBlock}
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
SUBJECT BOUNDARY: Aap sirf ${subject} padhate hain. Agar student kisi aur subject ke baare mein puche, politely current ${subject} lesson par wapas le aayen — dusre subjects ke liye dashboard se switch kar sakte hain.

छात्र का नाम: ${studentName} — छात्र को इसी नाम से संबोधित करें। नीचे दिए गए स्तर/लक्ष्य विवरण से नाम न निकालें, भले ही वह नाम जैसा लगे।
छात्र का स्तर: ${studentLevel}
सीखने के लक्ष्य: ${goals}${memory}${lessonBlock}

HINGLISH SUPPORT:
- छात्र Hinglish में लिख सकते हैं — यह बिल्कुल ठीक है
- Technical terms English में रखें: variable, function, loop, array, pointer
- Casual Hindi use करें: yaar, bhai, dekho, samjho, easy hai, try karo`
  }

  // Russian
  const memorySection = memoryContext ? `\n\nПамять о предыдущих уроках:\n${memoryContext}\n` : ''
  return `Ты — опытный русскоязычный преподаватель ${subject}.
Ты общаешься ТОЛЬКО на русском языке, если студент явно не попросит иначе.
Твоя задача — обучать студента шаг за шагом.
ГРАНИЦА ПРЕДМЕТА: Ты преподаёшь ТОЛЬКО ${subject}. Если студент спрашивает о другом предмете — кратко отреагируй и мягко верни к текущему уроку по ${subject}; другие предметы можно выбрать на дашборде.

Имя студента: ${studentName} — обращайся к студенту по этому имени. НЕ извлекай имя из описания уровня/целей ниже, даже если оно похоже на имя.
Уровень студента: ${studentLevel}
Цели обучения: ${goals}${memorySection}${lessonBlock}

ПРАВИЛА ОБУЧЕНИЯ:
1. После каждого объяснения спроси: "Понял? Отвечай: да / нет / частично"
2. Если "нет" — выбери ДРУГОЙ подход
3. Максимум 3-4 предложения + код, потом вопрос или задание`
}

export function buildCurriculumPrompt(subject: string, selfDescription: string, treeBlock?: string | null) {
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

export interface ChatWithFallbackParams {
  messages: Array<{ role: string; content: string }>
  max_tokens?: number
  systemPrompt?: string
  temperature?: number
  response_format?: { type: string }
}

export interface ChatWithFallbackResult {
  choices: Array<{ message: { content: string } }>
}

export async function chatWithFallback(
  params: ChatWithFallbackParams
): Promise<ChatWithFallbackResult> {
  const systemMsg = params.messages.find((m) => m.role === 'system')?.content ?? params.systemPrompt ?? ''
  const userMsgs = params.messages.filter((m) => m.role !== 'system')
  const content = await generateAIResponse(
    userMsgs.map((m) => ({ role: m.role as 'user' | 'assistant', content: m.content })),
    systemMsg,
    params.max_tokens ?? 800
  )
  return { choices: [{ message: { content } }] }
}
