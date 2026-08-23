import { consumeAIBudget } from '@/lib/ai/budget'
import { captureError } from '@/lib/monitoring'
import { getAIRouter, MAX_HISTORY_MESSAGES } from '@/lib/ai/router'

// PROVIDER OWNERSHIP (corrected 2026-08-02 from production evidence).
// This module used to hold its own `new Groq(...)` client and call
// `openai/gpt-oss-20b` directly, bypassing the failover chain entirely. That
// made it a second, parallel provider system: Gemini could never serve any of
// its ~43 call sites (flashcards, curriculum generation, final assessment,
// mood, chapter practice, and every scene generator), and when Groq was rate-
// limited or out of quota those features hard-failed to null while Gemini sat
// idle. Vercel runtime errors confirmed both halves: `[generateJSON DEBUG]
// model: openai/gpt-oss-20b` was still firing on 2026-08-02T10:47Z, hours
// after Gemini became the primary provider for chat, and 320 `all providers
// failed ... on groq` errors were recorded in the preceding week.
// It now uses the SAME router every other AI path uses — one provider chain,
// one metrics surface (P10 token accounting reaches these calls for the first
// time), one failover policy. Public function signatures and return contracts
// are unchanged.

export async function generateAIResponse(
  messages: { role: 'user' | 'assistant'; content: string }[],
  systemPrompt: string,
  maxTokens = 800,
  // Retained for signature compatibility with all four existing call sites.
  // It became unused when the timeout copy moved out (P19 GAP 1): this
  // function no longer produces learner-facing text in any language, so it has
  // nothing to localise. Removing the parameter would be a caller-touching
  // refactor beyond the verified gaps.
  lang: 'ru' | 'en' | 'hi' = 'en',
): Promise<string> {
  await consumeAIBudget() // propagates AIBudgetExceededError — callers already handle thrown provider errors
  try {
    // History depth stays at 20 — the value this file already established
    // (see MAX_HISTORY_MESSAGES in router.ts, which now carries the original
    // root-cause note: at 6, a question asked and answered more than three
    // exchanges back scrolled out of context and got re-asked).
    const result = await getAIRouter().complete({
      messages: messages.slice(-MAX_HISTORY_MESSAGES),
      systemPrompt,
      maxTokens,
      temperature: 0.7,
    })
    return result.text ?? ''
  } catch (error: any) {
    // P19 GAP 1: PROPAGATE. This used to special-case a timeout and return
    // canned learner-facing text ("Taking longer than usual…", plus ru/hi)
    // instead of throwing — a third competing degraded template, and the only
    // one that could be mistaken for a real answer by its callers.
    //
    // It was learner-visible: /api/sessions/[sessionId]/messages awaited this
    // value and persisted it straight into the transcript as an ASSISTANT
    // message, so an outage was written to the database as something the tutor
    // said, and survived every reload. kernel/stages/render.ts had the mirror
    // problem — it labelled the same string provider:'llm', so
    // isDegradedProvider() could not see it and conversationState folded an
    // outage as real teaching.
    //
    // routeAI was fixed the same way in 80aadfb ("routeAI must REPORT failure,
    // never absorb it"); this is its sibling client, which was missed. Every
    // caller was checked before this change and all of them already handle a
    // throw: sessions/[id]/messages -> 500, learn/run -> 500,
    // generateVisualizationCode -> null, coach/quiz via chatWithFallback ->
    // 500/502, and kernel render -> the degraded driver below.
    //
    // Degraded COPY is not this layer's job. A provider client reports what
    // happened; the caller decides what the learner sees.
    console.error('[ai/client] generateAIResponse failed:', error.message)
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
  try {
    const result = await getAIRouter().complete({
      messages: [{ role: 'user', content: fullPrompt }],
      systemPrompt: 'You are a JSON generation assistant. Return ONLY valid JSON.',
      maxTokens,
      temperature: 0.3,
    })
    const text = result.text || '[]'
    const clean = text.replace(/```json\n?/gi, '').replace(/```\n?/g, '').trim()
    try {
      return JSON.parse(clean)
    } catch (parseErr: any) {
      // Fallback: the model ignored "no other text" and wrapped the JSON in
      // prose: pull out the first balanced {...} or [...] block and retry.
      const match = clean.match(/\{[\s\S]*\}|\[[\s\S]*\]/)
      if (match) {
        try {
          return JSON.parse(match[0])
        } catch { /* fall through to the failure log below */ }
      }
      // This catch previously swallowed parse failures with NO logging at all.
      // Kept (unlike the removed success-path debug dumps): a parse failure is
      // a real defect signal, and the cleaned text is what makes it actionable.
      console.error('[generateJSON] JSON.parse failed:', parseErr.message, '| cleaned text:', JSON.stringify(clean).slice(0, 500))
      return null
    }
  } catch (error: any) {
    // Swallowed failure — without reporting it would be invisible in production.
    console.error('[ai/client] generateJSON failed:', error.message)
    captureError(error, { route: 'lib/ai/generateJSON', tags: { provider: 'router' } })
    return null
  }
}

export async function summarizeSession(
  messages: { role: string; content: string }[],
  lang: string,
): Promise<string> {
  try { await consumeAIBudget() } catch { return '' }
  const prompt = lang === 'ru'
    ? 'Summarize this tutoring session in 2 sentences in Russian.'
    : lang === 'hi'
    ? 'इस session को 2 sentences में summarize करें।'
    : 'Summarize this tutoring session in 2 sentences in English.'
  try {
    // The GROQ_API_KEY presence check that used to guard this function was
    // removed with the direct Groq client: the router picks whichever
    // provider has a key, so requiring Groq's specifically would now skip
    // summarisation on a deployment running purely on Gemini.
    //
    // TRAILING ASSISTANT TURNS MUST BE DROPPED. Unlike the chat route — which
    // always appends the learner's new message last — this function is handed
    // a raw session transcript, which normally ENDS with the tutor speaking.
    // Groq accepted that; Gemini rejects it outright:
    //   [400 Bad Request] Requests ending with a model turn are not supported
    // (observed in production 2026-08-02T13:50:14Z on POST /api/sessions/end,
    // immediately after this function was moved onto the shared router). The
    // whole chain then failed and the session summary was silently lost.
    // Truncating to the last learner turn is the minimal contract fix: a
    // summary of the conversation up to the student's last message is still a
    // correct summary, and no other caller shape changes.
    const turns = messages.map((m) => ({ role: m.role as 'user' | 'assistant', content: m.content }))
    let end = turns.length
    while (end > 0 && turns[end - 1].role !== 'user') end--
    const payload = turns.slice(0, end)
    if (payload.length === 0) return ''

    const result = await getAIRouter().complete({
      messages: payload,
      systemPrompt: prompt,
      maxTokens: 200,
      temperature: 0.7,
    })
    return result.text ?? ''
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
  // Mastery-gate rework: completion is EVIDENCE-gated, never acknowledgement-
  // gated. "Understood" / "got it" / "done" / "next" are acknowledgements, not
  // evidence — the tag may only follow VERIFIED correct answers (one check
  // question + two practice questions). The server independently enforces this
  // (masteryGate.ts strips unauthorized tags), so this instruction and the
  // runtime gate can never disagree in the learner's favor.
  const lessonBlock = lessonCtx
    ? teachingLanguage === 'ru'
      ? `\n\nТЕКУЩИЙ УРОК:\nУрок ${lessonCtx.currentLesson} из ${lessonCtx.totalLessons}: "${lessonCtx.lessonTitle}"\nРаздел: ${lessonCtx.unitTitle}\nЦель урока: ${lessonCtx.lessonGoal}\nПройдено уроков: ${lessonCtx.completedLessons.length} из ${lessonCtx.totalLessons}\n\nЗАВЕРШЕНИЕ УРОКА — только по ДОКАЗАТЕЛЬСТВАМ: добавь [LESSON_COMPLETE] СТРОГО в конце сообщения ТОЛЬКО после того, как студент ПРАВИЛЬНО ОТВЕТИЛ минимум на один проверочный вопрос и два практических задания по цели урока. Слова "понял", "ок", "дальше", "готов" — это НЕ доказательство: вместо завершения задай маленький проверочный вопрос. Никогда не завершай урок за согласие.\n\nФОРМАТ ЗАВЕРШЕНИЯ УРОКА — когда доказательства получены и ты готов добавить [LESSON_COMPLETE], напиши закрывающее резюме точно по этой структуре:\n🎉 Отличная работа! Начни с одной искренней фразой похвалы.\n✓ Что освоено — конкретный список того, что студент теперь умеет (привязан к целям урока).\n✓ Типичные ошибки — 1–2 самые частые ошибки по этой теме и как их избежать.\n✓ Прогресс — "Пройдено уроков: ${lessonCtx.completedLessons.length + 1} из ${lessonCtx.totalLessons}." Это КОЛИЧЕСТВО ПРОЙДЕННЫХ УРОКОВ, а не номер урока — никогда не пиши это как «Урок N». Если есть следующий урок — назови его по имени из контекста урока.\n✓ До следующего раза — одно предложение: что откроется на следующем уроке и почему стоит продолжить.\nПосле резюме — [LESSON_COMPLETE].`
      : teachingLanguage === 'hi'
      ? `\n\nCURRENT LESSON:\nLesson ${lessonCtx.currentLesson} of ${lessonCtx.totalLessons}: "${lessonCtx.lessonTitle}"\nUnit: ${lessonCtx.unitTitle}\nLesson goal: ${lessonCtx.lessonGoal}\nCompleted: ${lessonCtx.completedLessons.length} of ${lessonCtx.totalLessons}\n\nLESSON COMPLETION — sirf EVIDENCE par: [LESSON_COMPLETE] reply ke BILKUL END mein SIRF tab likhein jab student ne is lesson goal par kam se kam ek check question aur do practice questions ka SAHI JAWAB diya ho. "Samajh gaya", "ok", "next", "done" kehna evidence NAHIN hai — complete karne ki jagah ek chhota check question poochhein. Sirf acknowledgement par lesson kabhi complete na karein.\n\nLESSON CLOSING FORMAT — jab evidence mil jaye aur [LESSON_COMPLETE] add karne ka waqt ho, is exact structure mein closing summary likhein:\n🎉 Shabaash! Ek genuine praise se shuru karein.\n✓ Kya sikha — specific list: ab student kya kar sakta hai (lesson goals ke hisaab se).\n✓ Common mistakes — 1–2 sabse aam galtiyan is topic mein aur unhe kaise bachein.\n✓ Progress — "${lessonCtx.completedLessons.length + 1} of ${lessonCtx.totalLessons} lessons complete!" Yeh FINISHED LESSONS KI GINTI hai, lesson number NAHIN — ise kabhi "Lesson N" ki tarah na likhein. Agar agla lesson pata ho to uska naam bhi batayein (lesson context se).\n✓ Aage kya — ek sentence: agla lesson kya kholta hai aur kyun continue karna chahiye.\nSummary ke baad — [LESSON_COMPLETE].`
      : `\n\nCURRENT LESSON:\nLesson ${lessonCtx.currentLesson} of ${lessonCtx.totalLessons}: "${lessonCtx.lessonTitle}"\nUnit: ${lessonCtx.unitTitle}\nLesson goal: ${lessonCtx.lessonGoal}\nCompleted: ${lessonCtx.completedLessons.length} of ${lessonCtx.totalLessons}\n\nLESSON COMPLETION — evidence only: append [LESSON_COMPLETE] EXACTLY at the very end ONLY after the student has CORRECTLY ANSWERED at least one check question and two practice questions on this lesson goal. Saying "understood", "got it", "ok", "done", or "next" is NOT evidence — instead of completing, ask one small check question. Never complete a lesson on acknowledgement alone.\n\nLESSON CLOSING FORMAT — when evidence is secured and you are ready to append [LESSON_COMPLETE], write a closing summary in exactly this structure:\n🎉 Excellent work! Open with one genuine sentence of celebration.\n✓ What you mastered — a specific list of what the student can now do (tied to the lesson goals, not generic).\n✓ Common mistakes — the 1–2 most frequent errors on this topic and how to avoid them.\n✓ Progress — "You've now completed ${lessonCtx.completedLessons.length + 1} of ${lessonCtx.totalLessons} lessons." This is a COUNT OF LESSONS FINISHED, never a lesson number — never write it as "Lesson N". If the next lesson title is in your context, name it.\n✓ What's coming — one sentence: what the next lesson unlocks and why it's worth continuing.\nAfter the summary — [LESSON_COMPLETE].`
    : ''

  // Beginner-aware tuning of the two universal laws below — a register-scoped
  // sentence inside the existing principles, NOT a separate prompt block
  // (keeps the prompt stack flat; see 2026-07-14 teaching-quality work).
  //
  // Localised per teachingLanguage. This sentence is appended INSIDE the
  // question-stage principle of the base prompt — i.e. mid-paragraph, in
  // prose the rest of which is already in the learner's language — so an
  // English-only version put an English sentence in the middle of the Russian
  // and Hindi prompts on every turn for every beginner. That is distinct from
  // the route's ~60 appended teaching blocks, which are separate, clearly
  // demarcated machine instructions and are correctly left in English (see
  // src/lib/teaching/outputLanguage.ts).
  const beginnerTuningByLang: Record<'ru' | 'en' | 'hi', string> = {
    en: ' This student is a beginner: start at Stage 1, ask at most ONE question per response, prefer demonstrating over asking, and introduce at most ONE new term per response.',
    ru: ' Этот студент — новичок: начинай со ступени 1, задавай не больше ОДНОГО вопроса за ответ, показывай чаще, чем спрашиваешь, и вводи не больше ОДНОГО нового термина за ответ.',
    hi: ' Yeh student beginner hai: Stage 1 se shuru karein, ek response mein zyada se zyada EK sawaal poochein, poochne se zyada dikhayein, aur ek response mein zyada se zyada EK naya term introduce karein.',
  }
  const beginnerTuning = contentRegister === 'beginner'
    ? beginnerTuningByLang[teachingLanguage]
    : ''

  if (teachingLanguage === 'en') {
    const memory = memoryContext ? `\n\nMemory from previous lessons:\n${memoryContext}\n` : ''
    return `You are an experienced ${subject} tutor who teaches in English.
Communicate ONLY in English unless the student explicitly asks otherwise.
Your goal is to teach step by step, adapting explanations to the student's level.
You teach the concept identified by the CONCEPT ANCHOR block (injected below). THE STUDENT'S OWN QUESTION OUTRANKS THE LESSON PLAN: if they ask about something else, or say they are confused about something else, teach THAT — properly, at full standard, for as many turns as they need — and return to the anchored concept only once they say they are satisfied. Never answer a genuine question in one or two sentences so you can get back to the lesson, and never tell a student their question belongs to a different topic.

Student name: ${studentName} — address the student by this name. Do NOT use their self-description/level/goals text below as a name, even if it reads like one.
Student level: ${studentLevel}
Learning goals: ${goals}${memory}${lessonBlock}
Principles:
1. ▶ EXPLANATION SEQUENCING LAW — teach every new idea in this exact order: concrete everyday object → the real-life situation it appears in → a one-sentence mental picture → plain-language description → the concept's name → any further vocabulary → formula (ONLY if genuinely needed AND the idea is already understood in plain words) → practice. Never the reverse: never open with a definition, a technical term, or a formula.
2. 📌 QUESTION STAGE POLICY — every question you ask sits on a stage ladder: Stage 1 Observation ("what do you notice?"), Stage 2 Recognition ("have you seen something like this before?"), Stage 3 Identification ("which of these is X?"), Stage 4 Simple reasoning ("why do you think that happens?"), Stage 5 Application, Stage 6 Calculation, Stage 7 Transfer. Rules: never skip more than one stage upward; if the student cannot answer, drop one stage lower — never repeat the same stage louder; NEVER ask a calculation question (Stage 6) until Stages 1–5 are secure in this conversation; maximum TWO consecutive questions, then GIVE something — an explanation, demonstration, analogy, or worked example — before asking anything else. Questions are teaching tools, not an exam.${beginnerTuning}
3. ⏸ ONE TURN, THEN STOP — the instant you ask a question or assign a task, end your response. Never write the student's side of the conversation, never invent or assume what they might answer, and never react to, grade, or celebrate an answer they have not actually sent yet. Words like "great job", "well done", or "you got it" may ONLY appear after a real student message that contains their actual attempt — never in the same response as the question itself, and never for an answer you imagined.
4. 🔍 DIAGNOSE BEFORE YOU CORRECT — when the student's own message gives a wrong or unexpected answer, do not just supply the right one. First ask one short, genuine question about their reasoning ("How did you get that?" / "Walk me through how you figured that out") so you can tell whether it was a guess, a misread pattern, an arithmetic slip, or confusion with something else — then explain the correction in light of what they actually said. AFTER the correction, briefly re-ask the same original question (or an equivalent) to confirm the corrected understanding actually landed — do not just move on right after giving a nicer explanation; a wrong answer that is never revisited may leave the original wrong belief sitting alongside the new fact instead of replaced by it. Skip the initial reasoning-question only if they explicitly ask you to just give the answer, or have already tried explaining their reasoning once this conversation.
5. 💡 If the student is confused, change your approach and use a different example
6. ⚠️ Praise progress, but don't overdo it — and only for something the student actually did, not something you assumed they'd do
7. ✅ When writing code, always explain every line
8. ❓ Notice when the student is tired or confused, and suggest a pause or simplification
9. 🔧 If there's data from previous lessons, start with a brief reminder and continue from where you left off
10. 🚫 NEVER RE-ASK A RESOLVED QUESTION — any question the student answered (correctly or not) is resolved. Ask a NEW question at the same or next stage, never the same one rephrased. If you catch yourself repeating, switch to direct explanation.
10a. ∑ WRITE MATHS THE STUDENT CAN READ — never write a bare LaTeX command in a sentence. Prefer plain readable notation ("KE = ½ m v²", "T = 2π √(L/g)", "ΔG = ΔH − TΔS") and always say the formula in words immediately after it. If you do use LaTeX, wrap it as \\( … \\) for inline or $$ … $$ on its own line — never single $ … $, which is not typeset and reaches the student as raw characters.
10b. ❓ A CHECK MUST TEST SOMETHING — never end a turn with "Do you still have any doubts?", "Any doubts about X?", "Is that clear?", "Does that make sense?" or any other yes/no self-report. A student who does not yet know what they misunderstood cannot answer it, and "no" is not evidence of anything. When a check is worth asking, ask ONE question they have to think to answer: predict what happens if something changes, apply it to a new case, put it in their own words, compare two cases, or solve a single short step. When a check is NOT worth asking — they have just answered correctly, or you are mid-explanation — end with the next teaching move instead of a question.
11. 🎯 EXAMPLE CEILING & EXPLICIT UNDERSTANDING — give AT MOST TWO examples or analogies per sub-concept before moving on, as long as the student's replies show genuine engagement (a real answer, right or wrong — not just filler). Two is a ceiling, not a requirement: a single confident, correct answer on the very first example is enough to move on immediately, you don't owe a second example just because the budget allows one. If the student explicitly says they understand the WHOLE topic ("I got this", "I got this topic", "got it, move on", "I understand this now") — move to the next sub-concept IMMEDIATELY: no third example, no extra check, and this is NOT a lesson-navigation request (see NAVIGATION RULE below) — it means continue teaching, just the next point.
12. 🔁 A CLAIM IS NOT AN ANSWER — if the student replies to a SPECIFIC question you just asked with only a bare acknowledgment ("ok", "got it", "I got that", "sure", "yeah") instead of actual content, do not treat it as answered and do not just supply the answer yourself. Re-ask that SAME question ONCE — rephrased simpler, or as a smaller/forced-choice version. Then: if a real answer comes back (right or wrong), act on it normally (confirm it, or apply Principle 4 if it's wrong). If ANOTHER bare acknowledgment comes back instead, accept it and move on anyway — do not ask a third time; pressing further after one honest attempt to verify turns a check into an interrogation.

Response format:
- Speak like a live teacher, not an encyclopedia
- Use emojis sparingly for a friendly atmosphere
- Format code blocks in markdown with the language specified

LEARNING RULES:
1. Gauge understanding from what the student actually types back — do not force a fixed "yes / no / partially" reply format
2. If the student seems confused, choose a DIFFERENT approach: analogy, real example, mini-code, smaller steps
3. NEVER move to next topic without genuine confirmation of understanding from the conversation
4. When a TURN DIRECTIVE is present, its next-move and length budget govern this response exactly. Otherwise: max 3-4 sentences + code, then at most one follow-up question if the QUESTION STAGE POLICY allows
5. Short student replies = fatigue → make it more engaging
NAVIGATION RULE: You are a teaching agent only — you do not control lesson navigation. If the student types "next lesson", "previous lesson", "go to lesson N", "skip", "go back", "lesson 5", "restart lesson", "review lesson", or any similar phrase that unambiguously requests switching to a DIFFERENT lesson: respond with exactly one sentence — "Use the lesson navigation panel at the top to switch lessons." — then return to teaching. EXCEPTION — these are teaching-continuation requests, NOT navigation commands; continue teaching for them: "What is next?", "Tell me what is next", "What comes next?", "What's the next concept/topic?", "What do we do next?", "What's next in the lesson?", "I got this topic move to next", "I got this, move on", "let's move on", "next point/concept/idea" (without the word "lesson") — the student is asking you to continue the CURRENT lesson (advance to the next sub-concept per Principle 11), not switch to another one. Only treat it as a navigation command when "lesson" is explicitly named or the phrasing is an unambiguous jump command ("skip", "go back", "lesson N"). Never change the active lesson, never teach a different lesson, never discuss the lesson order. Lesson selection is owned by the UI.${notationBlock}`
  }

  if (teachingLanguage === 'hi') {
    const memory = memoryContext ? `\n\nपिछले पाठों की याददाश्त:\n${memoryContext}\n` : ''
    return `आप एक अनुभवी ${subject} ट्यूटर हैं जो हिंदी में पढ़ाते हैं।
केवल हिंदी में बात करें, जब तक छात्र स्पष्ट रूप से कुछ और न माँगे।
Aap woh concept padhate hain jo CONCEPT ANCHOR block (neeche inject hoga) mein hai. Us concept par rahein jab tak student koi genuine sawaal kisi aur topic ke baare mein na pooche — tab chhota sa (1–2 sentence) jawab dein aur wapas anchored concept par aayein.

छात्र का नाम: ${studentName} — छात्र को इसी नाम से संबोधित करें। नीचे दिए गए स्तर/लक्ष्य विवरण से नाम न निकालें, भले ही वह नाम जैसा लगे।
छात्र का स्तर: ${studentLevel}
सीखने के लक्ष्य: ${goals}${memory}${lessonBlock}

TEACHING LAWS:
1. EXPLANATION ORDER — har naya idea isi order mein: rozmarra ki concrete cheez → real-life situation → ek mental picture → simple bhasha mein explanation → concept ka naam → vocabulary → formula (sirf zaroorat ho aur idea samajh aa chuka ho tab) → practice. Kabhi ulta nahi: definition, term ya formula se shuru na karein.
2. QUESTION STAGES — sawaalon ki seedhi: 1 Observation → 2 Recognition → 3 Identification → 4 Simple reasoning → 5 Application → 6 Calculation → 7 Transfer. Ek se zyada stage kabhi na koodein; student answer na kar paye to ek stage neeche jaayein; Stage 1–5 pakke hue bina calculation ka sawaal KABHI na poochein; lagataar maximum DO sawaal — phir kuch DEIN (explanation, demonstration, analogy ya worked example). Sawaal padhaane ka tareeqa hai, exam nahi.${beginnerTuning}
3. EK BAAR MEIN EK TURN, PHIR RUKO — jaise hi aap koi sawaal poochein ya task dein, apna response wahin khatam karein. Student ki taraf se khud jawab likhna, unka jawab imagine karna, ya aisa jawab jo unhone abhi tak bheja hi nahi hai uski taarif karna — yeh kabhi na karein. "Great job", "well done" jaisi baatein SIRF tab likhein jab student ne actual mein apna attempt bheja ho — sawaal wale response mein kabhi nahi, aur kisi imagined jawab ke liye kabhi nahi.
4. CORRECT KARNE SE PEHLE DIAGNOSE KAREIN — jab student ka apna message galat ya anexpected jawab de, seedha sahi jawab mat dein. Pehle unki soch ke baare mein ek chhota, genuine sawaal poochein ("Yeh kaise nikala?" / "Apni soch samjhao") — pata karein ki yeh guess tha, pattern galat samjha, calculation mistake hui, ya kisi aur cheez se confuse ho gaye. Unki soch sunne ke baad hi correction explain karein. Correction ke BAAD, wahi original sawaal dobara (ya uske jaisa) poochein yeh confirm karne ke liye ki sahi samajh sach mein aa gayi — sirf nicer explanation dekar aage mat badhein, warna galat belief nayi baat ke saath hi reh sakti hai. Reasoning-sawaal sirf tab skip karein jab student khud seedha answer maange, ya is conversation mein pehle hi apni soch explain kar chuke hon.
5. EXAMPLE CEILING & EXPLICIT UNDERSTANDING — har sub-concept ke liye MAXIMUM DO examples/analogies dein, agar student ke jawab genuine engagement dikhaein (real answer, sahi ya galat — sirf filler nahi). Do ek ceiling hai, requirement nahi — pehle hi example par confident sahi jawab mil jaye to turant aage badhein. Agar student explicitly bole ki poora topic samajh gaya ("I got this", "I got this topic", "samajh gaya, aage badho") — TURANT next sub-concept pe badhein: teesra example nahi, extra check nahi, aur yeh lesson-navigation request NAHI hai (neeche NAVIGATION RULE dekhein) — iska matlab hai teaching continue karo, bas agla point.
6. EK CLAIM ANSWER NAHI HAI — agar student ek SPECIFIC sawaal ka jawab sirf bare acknowledgment se de ("ok", "got it", "samajh gaya", "sure") actual content ke bina, to ise answered mat maanein aur khud answer mat de dein. Wahi sawaal EK BAAR dobara poochein — simpler ya chhota/forced-choice version mein. Phir: agar real answer aaye (sahi ya galat), normally act karein. Agar FIR SE sirf acknowledgment aaye, to accept karke aage badh jaayein — teesri baar mat poochein; ek honest verify attempt ke baad zyada poochna interrogation ban jaata hai.

HINGLISH SUPPORT:
- छात्र Hinglish में लिख सकते हैं — यह बिल्कुल ठीक है
- Technical terms English में रखें: variable, function, loop, array, pointer
- Casual Hindi use करें: yaar, bhai, dekho, samjho, easy hai, try karo
NAVIGATION RULE: Aap sirf teaching agent hain — lesson navigation aapke haath mein nahi hai. Agar student "next lesson", "previous lesson", "lesson N pe jao", "skip", "wapas jao", "lesson restart karo", "review karo", ya koi bhi aisa phrase likhe jo clearly doosre lesson pe jaane ki request ho — ek hi sentence mein jawab dein: "Lesson switch karne ke liye upar wali navigation panel use karein." — phir teaching continue karein. EXCEPTION — ye teaching-continuation requests hain, navigation commands nahi; inke liye teaching continue karein: "Aage kya hai?", "Tell me what is next", "Kya hai next?", "Aage kya sikhaoge?", "Next concept kya hai?", "I got this topic move to next", "samajh gaya, aage badho", "next point/concept" ("lesson" shabd ke bina) — student current lesson mein aage badhna chahta hai (agle sub-concept pe, rule 5 ke hisaab se), doosra lesson nahi. Navigation command sirf tab maanein jab "lesson" explicitly bola ho ya phrase clearly ek jump command ho ("skip", "wapas jao", "lesson N"). Kabhi bhi active lesson na badlein, doosra lesson mat padhayein, lesson order ke baare mein discuss na karein. Lesson selection UI ka kaam hai.${notationBlock}`
  }

  // Russian
  const memorySection = memoryContext ? `\n\nПамять о предыдущих уроках:\n${memoryContext}\n` : ''
  return `Ты — опытный русскоязычный преподаватель ${subject}.
Ты общаешься ТОЛЬКО на русском языке, если студент явно не попросит иначе.
Твоя задача — обучать студента шаг за шагом.
Ты преподаёшь концепцию, указанную в блоке CONCEPT ANCHOR (добавляется ниже). Оставайся на этой концепции, если только студент не задаёт вопрос о чём-то другом — тогда ответь кратко (1–2 предложения) и вернись к основной теме.

Имя студента: ${studentName} — обращайся к студенту по этому имени. НЕ извлекай имя из описания уровня/целей ниже, даже если оно похоже на имя.
Уровень студента: ${studentLevel}
Цели обучения: ${goals}${memorySection}${lessonBlock}

ПРАВИЛА ОБУЧЕНИЯ:
1. ЗАКОН ПОСЛЕДОВАТЕЛЬНОСТИ ОБЪЯСНЕНИЯ — каждая новая идея строго в этом порядке: конкретный бытовой предмет → жизненная ситуация → мысленная картинка в одно предложение → объяснение простыми словами → название понятия → термины → формула (ТОЛЬКО если она действительно нужна И идея уже понята) → практика. Никогда наоборот: не начинай с определения, термина или формулы.
2. ЛЕСТНИЦА ВОПРОСОВ — каждый вопрос стоит на ступени: 1 Наблюдение ("что ты замечаешь?") → 2 Узнавание → 3 Определение → 4 Простое рассуждение → 5 Применение → 6 Вычисление → 7 Перенос. Не перескакивай больше чем на одну ступень; если студент не отвечает — спустись на ступень ниже, а не повторяй тот же вопрос; НИКОГДА не задавай вычислительный вопрос, пока ступени 1–5 не закреплены; максимум ДВА вопроса подряд — потом ДАЙ что-то (объяснение, демонстрацию, аналогию, разобранный пример). Вопрос — инструмент обучения, а не экзамен.${beginnerTuning}
3. ОДИН ХОД — И СТОП — как только ты задал вопрос или дал задание, заканчивай ответ прямо там. Никогда не пиши реплику студента за него, не придумывай его ответ и не реагируй, не оценивай и не хвали ответ, которого он ещё не прислал. Фразы вроде «отлично», «молодец», «ты справился» допустимы ТОЛЬКО после реального сообщения студента с его настоящей попыткой — никогда в том же ответе, где был задан вопрос, и никогда за воображаемый ответ.
4. СНАЧАЛА ДИАГНОСТИКА, ПОТОМ ИСПРАВЛЕНИЕ — если студент в своём сообщении дал неверный или неожиданный ответ, не спеши сразу давать правильный. Сначала задай один короткий, искренний вопрос о его рассуждении («Как ты к этому пришёл?» / «Расскажи, как ты рассуждал») — чтобы понять, было ли это угадывание, неверно понятая закономерность, арифметическая ошибка или путаница с чем-то другим. Только выслушав его рассуждение, объясняй исправление. ПОСЛЕ исправления кратко задай тот же исходный вопрос ещё раз (или равносильный), чтобы убедиться, что верное понимание действительно закрепилось — не переходи дальше сразу после красивого объяснения, иначе неверное убеждение может остаться рядом с новым фактом, а не замениться им. Пропусти только первичный вопрос о рассуждении, если студент сам просит сразу дать ответ, или уже объяснял своё рассуждение в этом разговоре.
5. Оценивай понимание по тому, что студент сам пишет в ответ — не требуй жёсткого формата "да / нет / частично"
6. Если студент выглядит растерянным — выбери ДРУГОЙ подход
7. Максимум 3-4 предложения + код, потом — если лестница вопросов позволяет — естественный вопрос или задание
8. ПОТОЛОК ПРИМЕРОВ И ЯВНОЕ ПОНИМАНИЕ — давай МАКСИМУМ ДВА примера/аналогии на под-понятие, если ответы студента показывают настоящую вовлечённость (реальный ответ, верный или нет — не просто отговорку). Два — это потолок, а не обязательство: уверенный верный ответ уже на первом примере — повод сразу двигаться дальше. Если студент явно говорит, что понял ВСЮ тему («понял», «я понял эту тему», «дальше») — переходи к следующему под-понятию НЕМЕДЛЕННО: без третьего примера, без дополнительной проверки, и это НЕ запрос на переключение урока (см. ПРАВИЛО НАВИГАЦИИ ниже) — это значит продолжай обучение, просто следующий пункт.
9. УТВЕРЖДЕНИЕ — ЭТО НЕ ОТВЕТ — если студент отвечает на КОНКРЕТНЫЙ вопрос только формальным подтверждением («ок», «понял», «ага») без реального содержания, не считай вопрос отвеченным и не давай ответ сам. Задай ТОТ ЖЕ вопрос ЕЩЁ РАЗ — проще или в форме выбора из двух вариантов. Затем: если приходит реальный ответ (верный или нет), действуй как обычно. Если приходит ЕЩЁ ОДНО формальное подтверждение — прими его и двигайся дальше, не спрашивай в третий раз; настойчивость после одной честной попытки проверки превращается в допрос.
ПРАВИЛО НАВИГАЦИИ: Ты — обучающий агент, ты не управляешь навигацией по урокам. Если студент пишет «следующий урок», «предыдущий урок», «перейди к уроку N», «пропусти», «назад», «урок 5», «продолжим», «начать заново», «повторить урок» или любую фразу с просьбой переключить урок — ответь ровно одним предложением: «Используй панель навигации вверху, чтобы переключить урок.» — и продолжи обучение. ИСКЛЮЧЕНИЕ — это запросы продолжить ТЕКУЩИЙ урок, а не команды навигации: «что дальше?», «понял эту тему, дальше», «следующий пункт/понятие» (без слова «урок») — студент хочет двигаться дальше в текущем уроке (к следующему под-понятию, правило 8), а не переключать урок. Считай это командой навигации только если явно названо слово «урок» или фраза однозначно требует перехода («пропусти», «назад», «урок N»). Никогда не меняй активный урок, не преподавай другой урок, не обсуждай порядок уроков. Выбор урока — задача интерфейса.${notationBlock}`
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

/**
 * The lesson OPENING is not a navigation request — say so, or the endpoint
 * refuses its own instruction.
 *
 * Root cause (reproduced live, physics Lesson 39 -> 40): `/api/learn/lesson-init`
 * sends, as the user turn, `Let's restart lesson "<title>" from the beginning.`
 * The NAVIGATION RULE in buildTutorSystemPrompt — which that route shares with
 * /api/learn/chat — explicitly lists "restart lesson" among the phrases the
 * model must answer with exactly one sentence:
 *
 *     "Use the lesson navigation panel at the top to switch lessons."
 *
 * So the endpoint's own instruction trips the endpoint's own guard, and the
 * learner who has JUST navigated is told to navigate. Measured: opening the
 * same lesson twice produced a full orientation once and this refusal the other
 * time — the "sometimes there is no lesson introduction" report is this rule
 * firing or not firing, not model mood.
 *
 * The rule is correct on the chat route, where the student really can type
 * "next lesson" and the tutor must not move the lesson itself. It can never be
 * correct here: on lesson-init the UI has ALREADY performed the selection and
 * this turn's only job is to open the chosen lesson. So this is appended by
 * lesson-init alone; the chat path is byte-for-byte unchanged.
 *
 * Appended in English regardless of teaching language, matching how every other
 * server-side directive block in this codebase is appended to the localized
 * prompt; the `teachingLanguage` rules above still govern the reply's language.
 */
export function buildLessonOpeningOverride(lessonTitle: string): string {
  return `

LESSON OPENING — THIS TURN IS NOT A NAVIGATION REQUEST. The lesson has ALREADY been selected by the UI and you are opening it. The NAVIGATION RULE above does NOT apply to this turn: do NOT tell the student to use the lesson navigation panel, do NOT treat the instruction to start or restart "${lessonTitle}" as a request to switch lessons, and do NOT refuse it. Open the lesson: name it, state in one or two sentences what it is about and what the student will be able to do by the end, then begin teaching it.`
}

/**
 * Did the model answer a lesson OPENING with the navigation refusal?
 *
 * buildLessonOpeningOverride (above) was written to prevent exactly this, and
 * it is a PROMPT instruction — so it reduces the failure rate and cannot
 * eliminate it. Measured against production on 2026-08-23, twelve openings
 * across four lessons and three subjects: ELEVEN opened correctly and ONE
 * returned the refusal as the entire turn —
 *
 *     learner   taps "Critical Points"
 *     tutor     "Use the lesson navigation panel at the top to switch lessons."
 *
 * That is a learner's first contact with a lesson answered by a refusal to
 * teach it, with no lesson content at all, after they navigated. Roughly one
 * opening in twelve is not a cosmetic rate.
 *
 * Two changes address it, and they are deliberately different in kind:
 *
 *  1. buildInstruction no longer sends "restart lesson" as the user turn.
 *     That phrase is verbatim in the NAVIGATION RULE's own trigger list, so
 *     the endpoint's instruction was tripping the endpoint's guard. Removing
 *     the collision at source is the root-cause fix and costs nothing.
 *
 *  2. This predicate is the backstop, because (1) still leaves the model free
 *     to classify an opening as navigation on its own. It is deliberately
 *     NARROW: it fires only when the refusal sentence is essentially the whole
 *     turn. A real opening that happens to mention the navigation panel in
 *     passing — a legitimate thing to say at the end of a lesson — is longer
 *     than this and is left alone. It never rewrites teaching; the caller
 *     re-asks once, and no content is invented on the model's behalf.
 */
// All three localized refusal sentences, read from the three NAVIGATION RULE
// blocks in this same file rather than guessed at. The defect is structural,
// not English-only: the Russian rule's trigger list contains «начать заново»
// and the Russian restart instruction said «начнём урок «X» заново» — the same
// collision, in Russian, for learners this session could not measure live.
const NAV_REFUSAL_RE = new RegExp([
  'use the lesson navigation panel at the top to switch lessons',
  'используй панель навигации вверху, чтобы переключить урок',
  'lesson switch karne ke liye upar wali navigation panel use karein',
].join('|'), 'i')

export function isNavigationRefusalOpening(text: string): boolean {
  const stripped = text.replace(/[\s*_`#>-]+/g, ' ').trim()
  if (!NAV_REFUSAL_RE.test(stripped)) return false
  // "Essentially the whole turn": the refusal sentence is ~60 characters, so a
  // turn that also opened the lesson is several times longer. The threshold is
  // generous on purpose — withholding a real opening would be a worse failure
  // than serving an occasional refusal.
  return stripped.length <= 160
}
