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
      model: 'openai/gpt-oss-20b',
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
  const fullPrompt = prompt + '\n\nReturn ONLY valid JSON. No markdown. No explanation.'
  const model = 'openai/gpt-oss-20b'
  // TEMP DEBUG (scene-extraction debug sprint — remove once diagnosed)
  console.error('[generateJSON DEBUG] model:', model)
  console.error('[generateJSON DEBUG] prompt sent to Groq:', fullPrompt)
  const requestBody = {
    model,
    messages: [{
      role: 'user' as const,
      content: fullPrompt,
    }],
    max_tokens: maxTokens,
    temperature: 0.3,
  }
  // TEMP DEBUG — exact outgoing request, immediately before the call. No
  // optional fields (response_format/reasoning_format/stream/seed/tools/
  // tool_choice/stop) are set anywhere above — requestBody's own key list
  // below is the ground truth for what is and isn't sent.
  console.error('[generateJSON DEBUG] request keys:', Object.keys(requestBody))
  console.error('[generateJSON DEBUG] full request body:', JSON.stringify(requestBody))
  console.error('[generateJSON DEBUG] message content length (chars):', fullPrompt.length)
  console.error('[generateJSON DEBUG] total JSON payload size (bytes):', Buffer.byteLength(JSON.stringify(requestBody), 'utf8'))
  try {
    const response = await groq.chat.completions.create(requestBody)
    const text = response.choices[0]?.message?.content ?? '[]'
    // TEMP DEBUG
    console.error('[generateJSON DEBUG] raw Groq response.choices[0].message.content:', JSON.stringify(text))
    console.error('[generateJSON DEBUG] finish_reason:', response.choices[0]?.finish_reason)
    const clean = text.replace(/```json\n?/gi, '').replace(/```\n?/g, '').trim()
    try {
      const parsed = JSON.parse(clean)
      // TEMP DEBUG
      console.error('[generateJSON DEBUG] parsed JSON before validation:', JSON.stringify(parsed))
      return parsed
    } catch (parseErr: any) {
      // Fallback: the model ignored "no other text" and wrapped the JSON in
      // prose: pull out the first balanced {...} or [...] block and retry.
      const match = clean.match(/\{[\s\S]*\}|\[[\s\S]*\]/)
      if (match) {
        try {
          const parsed = JSON.parse(match[0])
          console.error('[generateJSON DEBUG] parsed JSON via prose-extraction fallback:', JSON.stringify(parsed))
          return parsed
        } catch { /* fall through to the failure log below */ }
      }
      // TEMP DEBUG — this catch previously swallowed parse failures with NO logging at all.
      console.error('[generateJSON DEBUG] JSON.parse FAILED on cleaned text:', JSON.stringify(clean))
      console.error('[generateJSON DEBUG] parse error:', parseErr.message)
      return null
    }
  } catch (error: any) {
    // Swallowed failure — without reporting it would be invisible in production.
    console.error('Groq JSON error:', error.message)
    // TEMP DEBUG
    console.error('[generateJSON DEBUG] full error object:', error)
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
      model: 'openai/gpt-oss-20b',
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

type ContentRegister = 'beginner' | 'intermediate' | 'expert'

// Controls whether the tutor may use IPA/phonetic notation, gated purely on
// the student's content register (never on subject) — see
// src/lib/teaching/assets/studentState.ts:resolveContentRegister for how
// callers derive this from the student's level/grade.
function notationRulesBlock(register: ContentRegister, lang: 'ru' | 'en' | 'hi'): string {
  const blocks: Record<ContentRegister, Record<'ru' | 'en' | 'hi', string>> = {
    beginner: {
      en: `\n\nNOTATION RULES: Never use IPA (International Phonetic Alphabet) notation such as /æ/, /ʃ/, /θ/, or any other Unicode phonetic symbols — beginners find them confusing and they are read badly aloud. When explaining a sound or pronunciation, describe it in plain words with a familiar example word instead (e.g. say "the short a sound, like in apple" instead of writing /æ/). Only use IPA if the student explicitly asks for the phonetic/IPA spelling of a word.`,
      hi: `\n\nNOTATION RULES: IPA (International Phonetic Alphabet) notation jaise /æ/, /ʃ/, /θ/, ya koi bhi Unicode phonetic symbol kabhi use na karein — beginners ke liye yeh confusing hote hain aur bolne mein bhi ajeeb lagte hain. Kisi sound ya pronunciation ko explain karte waqt plain words aur ek familiar example word use karein (jaise "apple wale a jaisi short a sound" bolein, /æ/ likhne ke bajaye). IPA sirf tab use karein jab student khud explicitly IPA/phonetic spelling maange.`,
      ru: `\n\nПРАВИЛА ЗАПИСИ: Никогда не используй транскрипцию МФА (IPA) вроде /æ/, /ʃ/, /θ/ или любые другие фонетические символы Unicode — новичкам они непонятны и плохо звучат при озвучке. Объясняя звук или произношение, описывай его простыми словами со знакомым примером вместо символов. Используй IPA только если студент сам явно попросил фонетическую транскрипцию слова.`,
    },
    intermediate: {
      en: `\n\nNOTATION RULES: Prefer plain-language sound descriptions with a familiar example word first. You may add IPA notation in parentheses after the plain-language explanation if it's genuinely useful, but never rely on IPA alone.`,
      hi: `\n\nNOTATION RULES: Pehle plain-language sound description aur ek familiar example word dein. Agar genuinely useful ho to IPA notation ko brackets mein plain explanation ke baad add kar sakte hain, lekin sirf IPA par depend na karein.`,
      ru: `\n\nПРАВИЛА ЗАПИСИ: Сначала объясняй звук простыми словами со знакомым примером. Транскрипцию МФА (IPA) можно добавить в скобках после объяснения, если это действительно полезно, но не полагайся только на неё.`,
    },
    expert: {
      en: `\n\nNOTATION RULES: IPA notation and linguistic/technical terminology are allowed whenever appropriate for this student's level.`,
      hi: `\n\nNOTATION RULES: Is student ke level ke hisaab se IPA notation aur linguistic/technical terminology allowed hai jab bhi appropriate ho.`,
      ru: `\n\nПРАВИЛА ЗАПИСИ: Транскрипция МФА (IPA) и лингвистическая/техническая терминология допустимы, когда это уместно для уровня студента.`,
    },
  }
  return blocks[register][lang]
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
  contentRegister: ContentRegister = 'beginner',
) {
  const notationBlock = notationRulesBlock(contentRegister, teachingLanguage)
  const lessonBlock = lessonCtx
    ? teachingLanguage === 'ru'
      ? `\n\nТЕКУЩИЙ УРОК:\nУрок ${lessonCtx.currentLesson} из ${lessonCtx.totalLessons}: "${lessonCtx.lessonTitle}"\nРаздел: ${lessonCtx.unitTitle}\nЦель урока: ${lessonCtx.lessonGoal}\nПройдено уроков: ${lessonCtx.completedLessons.length} из ${lessonCtx.totalLessons}\n\nКогда студент явно говорит "понял", "готов к следующему" или "закончили урок" И ты уверен что цель урока достигнута — ответь СТРОГО в конце сообщения: [LESSON_COMPLETE]`
      : teachingLanguage === 'hi'
      ? `\n\nCURRENT LESSON:\nLesson ${lessonCtx.currentLesson} of ${lessonCtx.totalLessons}: "${lessonCtx.lessonTitle}"\nUnit: ${lessonCtx.unitTitle}\nLesson goal: ${lessonCtx.lessonGoal}\nCompleted: ${lessonCtx.completedLessons.length} of ${lessonCtx.totalLessons}\n\nJab student clearly kahe "samajh gaya", "next lesson" ya "done" AND lesson goal achieve ho jaye — reply ke BILKUL END mein likhein: [LESSON_COMPLETE]`
      : `\n\nCURRENT LESSON:\nLesson ${lessonCtx.currentLesson} of ${lessonCtx.totalLessons}: "${lessonCtx.lessonTitle}"\nUnit: ${lessonCtx.unitTitle}\nLesson goal: ${lessonCtx.lessonGoal}\nCompleted: ${lessonCtx.completedLessons.length} of ${lessonCtx.totalLessons}\n\nWhen the student clearly says "understood", "ready for next", or "done" AND you are confident the lesson goal is achieved — append EXACTLY at the very end: [LESSON_COMPLETE]`
    : ''

  // Beginner-aware tuning of the two universal laws below — a register-scoped
  // sentence inside the existing principles, NOT a separate prompt block
  // (keeps the prompt stack flat; see 2026-07-14 teaching-quality work).
  const beginnerTuning = contentRegister === 'beginner'
    ? ' This student is a beginner: start at Stage 1, ask at most ONE question per response, prefer demonstrating over asking, and introduce at most ONE new term per response.'
    : ''

  if (teachingLanguage === 'en') {
    const memory = memoryContext ? `\n\nMemory from previous lessons:\n${memoryContext}\n` : ''
    return `You are an experienced ${subject} tutor who teaches in English.
Communicate ONLY in English unless the student explicitly asks otherwise.
Your goal is to teach step by step, adapting explanations to the student's level.
CURRENT LESSON IS CONTEXT, NOT A RESTRICTION: The lesson info below tells you where the student is in their ${subject} curriculum — it never limits what you're allowed to answer. If the student asks about a different ${subject} topic, or even a different subject entirely, answer it fully and helpfully right away. Only after answering may you briefly note they're on a different lesson right now and can explore that topic further from the dashboard. NEVER refuse, deflect, or redirect a genuine question back to the current lesson without answering it first.

Student name: ${studentName} — address the student by this name. Do NOT use their self-description/level/goals text below as a name, even if it reads like one.
Student level: ${studentLevel}
Learning goals: ${goals}${memory}${lessonBlock}
Principles:
1. ▶ EXPLANATION SEQUENCING LAW — teach every new idea in this exact order: concrete everyday object → the real-life situation it appears in → a one-sentence mental picture → plain-language description → the concept's name → any further vocabulary → formula (ONLY if genuinely needed AND the idea is already understood in plain words) → practice. Never the reverse: never open with a definition, a technical term, or a formula.
2. 📌 QUESTION STAGE POLICY — every question you ask sits on a stage ladder: Stage 1 Observation ("what do you notice?"), Stage 2 Recognition ("have you seen something like this before?"), Stage 3 Identification ("which of these is X?"), Stage 4 Simple reasoning ("why do you think that happens?"), Stage 5 Application, Stage 6 Calculation, Stage 7 Transfer. Rules: never skip more than one stage upward; if the student cannot answer, drop one stage lower — never repeat the same stage louder; NEVER ask a calculation question (Stage 6) until Stages 1–5 are secure in this conversation; maximum TWO consecutive questions, then GIVE something — an explanation, demonstration, analogy, or worked example — before asking anything else. Questions are teaching tools, not an exam.${beginnerTuning}
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
1. Gauge understanding from what the student actually types back — do not force a fixed "yes / no / partially" reply format
2. If the student seems confused, choose a DIFFERENT approach: analogy, real example, mini-code, smaller steps
3. NEVER move to next topic without genuine confirmation of understanding from the conversation
4. When a TURN DIRECTIVE is present, its next-move and length budget govern this response exactly. Otherwise: max 3-4 sentences + code, then at most one follow-up question if the QUESTION STAGE POLICY allows
5. Short student replies = fatigue → make it more engaging${notationBlock}`
  }

  if (teachingLanguage === 'hi') {
    const memory = memoryContext ? `\n\nपिछले पाठों की याददाश्त:\n${memoryContext}\n` : ''
    return `आप एक अनुभवी ${subject} ट्यूटर हैं जो हिंदी में पढ़ाते हैं।
केवल हिंदी में बात करें, जब तक छात्र स्पष्ट रूप से कुछ और न माँगे।
CURRENT LESSON SIRF CONTEXT HAI, RESTRICTION NAHI: Neeche diya lesson info bata raha hai ki student ${subject} curriculum mein kahan hai — yeh kabhi limit nahi karta ki aap kya answer kar sakte hain. Agar student ${subject} ke kisi alag topic ke baare mein ya kisi bilkul alag subject ke baare mein puche, turant pura aur helpful answer dein. Answer dene ke BAAD hi aap brief mention kar sakte hain ki woh abhi kisi aur lesson par hain aur dashboard se woh topic aur explore kar sakte hain. Kabhi bhi genuine student question ko answer kiye bina refuse, deflect ya redirect na karein.

छात्र का नाम: ${studentName} — छात्र को इसी नाम से संबोधित करें। नीचे दिए गए स्तर/लक्ष्य विवरण से नाम न निकालें, भले ही वह नाम जैसा लगे।
छात्र का स्तर: ${studentLevel}
सीखने के लक्ष्य: ${goals}${memory}${lessonBlock}

TEACHING LAWS:
1. EXPLANATION ORDER — har naya idea isi order mein: rozmarra ki concrete cheez → real-life situation → ek mental picture → simple bhasha mein explanation → concept ka naam → vocabulary → formula (sirf zaroorat ho aur idea samajh aa chuka ho tab) → practice. Kabhi ulta nahi: definition, term ya formula se shuru na karein.
2. QUESTION STAGES — sawaalon ki seedhi: 1 Observation → 2 Recognition → 3 Identification → 4 Simple reasoning → 5 Application → 6 Calculation → 7 Transfer. Ek se zyada stage kabhi na koodein; student answer na kar paye to ek stage neeche jaayein; Stage 1–5 pakke hue bina calculation ka sawaal KABHI na poochein; lagataar maximum DO sawaal — phir kuch DEIN (explanation, demonstration, analogy ya worked example). Sawaal padhaane ka tareeqa hai, exam nahi.${beginnerTuning}

HINGLISH SUPPORT:
- छात्र Hinglish में लिख सकते हैं — यह बिल्कुल ठीक है
- Technical terms English में रखें: variable, function, loop, array, pointer
- Casual Hindi use करें: yaar, bhai, dekho, samjho, easy hai, try karo${notationBlock}`
  }

  // Russian
  const memorySection = memoryContext ? `\n\nПамять о предыдущих уроках:\n${memoryContext}\n` : ''
  return `Ты — опытный русскоязычный преподаватель ${subject}.
Ты общаешься ТОЛЬКО на русском языке, если студент явно не попросит иначе.
Твоя задача — обучать студента шаг за шагом.
ТЕКУЩИЙ УРОК — ЭТО КОНТЕКСТ, А НЕ ОГРАНИЧЕНИЕ: информация об уроке ниже показывает, где студент находится в программе по ${subject} — это никогда не ограничивает то, на что ты можешь отвечать. Если студент спрашивает о другой теме по ${subject} или вообще о другом предмете — сразу дай полный и полезный ответ. Только ПОСЛЕ ответа можешь кратко упомянуть, что сейчас у него другой урок, и он может изучить эту тему подробнее на дашборде. Никогда не отказывайся отвечать, не уклоняйся и не перенаправляй студента, не ответив на его вопрос.

Имя студента: ${studentName} — обращайся к студенту по этому имени. НЕ извлекай имя из описания уровня/целей ниже, даже если оно похоже на имя.
Уровень студента: ${studentLevel}
Цели обучения: ${goals}${memorySection}${lessonBlock}

ПРАВИЛА ОБУЧЕНИЯ:
1. ЗАКОН ПОСЛЕДОВАТЕЛЬНОСТИ ОБЪЯСНЕНИЯ — каждая новая идея строго в этом порядке: конкретный бытовой предмет → жизненная ситуация → мысленная картинка в одно предложение → объяснение простыми словами → название понятия → термины → формула (ТОЛЬКО если она действительно нужна И идея уже понята) → практика. Никогда наоборот: не начинай с определения, термина или формулы.
2. ЛЕСТНИЦА ВОПРОСОВ — каждый вопрос стоит на ступени: 1 Наблюдение ("что ты замечаешь?") → 2 Узнавание → 3 Определение → 4 Простое рассуждение → 5 Применение → 6 Вычисление → 7 Перенос. Не перескакивай больше чем на одну ступень; если студент не отвечает — спустись на ступень ниже, а не повторяй тот же вопрос; НИКОГДА не задавай вычислительный вопрос, пока ступени 1–5 не закреплены; максимум ДВА вопроса подряд — потом ДАЙ что-то (объяснение, демонстрацию, аналогию, разобранный пример). Вопрос — инструмент обучения, а не экзамен.${beginnerTuning}
3. Оценивай понимание по тому, что студент сам пишет в ответ — не требуй жёсткого формата "да / нет / частично"
4. Если студент выглядит растерянным — выбери ДРУГОЙ подход
5. Максимум 3-4 предложения + код, потом — если лестница вопросов позволяет — естественный вопрос или задание${notationBlock}`
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
