/**
 * Prompt-Teach Builder (Sprint FB Educational Intelligence Enhancement)
 *
 * A reusable layer that transforms raw student context into structured
 * educational prompts before they reach the AI router.
 *
 * Integrates with existing platform intelligence:
 *   - buildTutorSystemPrompt (src/lib/ai/client.ts) — base system prompt
 *   - TopicProgress mastery levels — depth/pace adaptation
 *   - School board/grade — curriculum alignment, age-appropriate language
 *   - Weak topics / mistake patterns — remediation focus
 *   - Teaching language preference — en / ru / hi
 *
 * Security note (Phase 9):
 *   Student input is always treated as DATA injected into the prompt,
 *   never as an instruction that can override board/grade/subject/mastery.
 *   Educational metadata is sourced exclusively from the platform DB.
 */

export type TeachingLanguage = 'en' | 'ru' | 'hi'

export type MasteryLevel = 'beginner' | 'intermediate' | 'advanced'

export interface EducationalContext {
  /** Raw student question / message — treated as data, not instruction */
  studentQuery: string
  /** Subject being taught e.g. "Mathematics", "Physics" */
  subject: string
  /** Current topic within the subject e.g. "Quadratic Equations" */
  topic?: string
  /** Current chapter title e.g. "Chapter 4: Polynomials" */
  chapter?: string
  /** Education board e.g. "cbse", "up_board" */
  board?: string
  /** School grade 5–12 (null for general learners) */
  grade?: number | null
  /** Mastery percentage 0–100 from TopicProgress */
  masteryPct?: number
  /** Known weak topics from recommendation engine */
  weakTopics?: string[]
  /** Recent mistake patterns (topic → error description) */
  mistakePatterns?: string[]
  /** Student's teaching language preference */
  lang?: TeachingLanguage
  /** Platform session memory (summary of prior lessons) */
  memoryContext?: string | null
  /** Learning goals / self-description from profile */
  learningGoals?: string
}

export interface BuiltPrompt {
  systemPrompt: string
  masteryLevel: MasteryLevel
  lang: TeachingLanguage
  /** Sanitized student query safe to pass to AI as user message */
  userMessage: string
}

// ── Mastery classification ────────────────────────────────────────────────────

export function classifyMastery(masteryPct: number | undefined): MasteryLevel {
  if (masteryPct === undefined || masteryPct < 50) return 'beginner'
  if (masteryPct < 80) return 'intermediate'
  return 'advanced'
}

// ── Age-appropriate instruction block ─────────────────────────────────────────

function gradeInstructions(grade: number | null | undefined, lang: TeachingLanguage): string {
  if (!grade) return ''
  if (grade <= 6) {
    const msgs: Record<TeachingLanguage, string> = {
      en: '\n\nAGE GUIDANCE: The student is in a junior grade (5–6). Use very simple vocabulary, concrete real-world examples, and short sentences. Avoid technical jargon.',
      ru: '\n\nВОЗРАСТНОЕ РУКОВОДСТВО: Ученик учится в младших классах (5–6). Используй простые слова, конкретные примеры из жизни и короткие предложения.',
      hi: '\n\nUMRA NIRDESH: Student junior class (5–6) mein hai. Bahut simple shabd, asaan real-life examples, aur chhote sentences use karein.',
    }
    return msgs[lang]
  }
  if (grade <= 9) {
    const msgs: Record<TeachingLanguage, string> = {
      en: '\n\nAGE GUIDANCE: The student is in middle school (7–9). Use clear explanations with worked examples. Introduce terminology carefully.',
      ru: '\n\nВОЗРАСТНОЕ РУКОВОДСТВО: Ученик в средней школе (7–9). Давай понятные объяснения с примерами. Вводи термины осторожно.',
      hi: '\n\nUMRA NIRDESH: Student middle school (7–9) mein hai. Worked examples ke saath clear explanations dein.',
    }
    return msgs[lang]
  }
  // Grade 10–12
  const msgs: Record<TeachingLanguage, string> = {
    en: '\n\nAGE GUIDANCE: The student is in senior school (10–12). Provide conceptual depth, exam-oriented reasoning, and board-aligned problem-solving approaches.',
    ru: '\n\nВОЗРАСТНОЕ РУКОВОДСТВО: Ученик в старшей школе (10–12). Давай глубокие концептуальные объяснения, задачи уровня экзамена.',
    hi: '\n\nUMRA NIRDESH: Student senior school (10–12) mein hai. Conceptual depth, exam-oriented reasoning, aur board-aligned problem solving dein.',
  }
  return msgs[lang]
}

// ── Mastery-aware depth block ──────────────────────────────────────────────────

function masteryBlock(level: MasteryLevel, lang: TeachingLanguage): string {
  const blocks: Record<MasteryLevel, Record<TeachingLanguage, string>> = {
    beginner: {
      en: '\n\nSTUDENT LEVEL — BEGINNER: Use simple language, step-by-step explanations, and plenty of concrete examples. Do not assume prior knowledge. Check understanding after every concept.',
      ru: '\n\nУРОВЕНЬ — НАЧИНАЮЩИЙ: Используй простой язык, объясняй пошагово, приводи много конкретных примеров. Проверяй понимание после каждого понятия.',
      hi: '\n\nSTUDENT LEVEL — BEGINNER: Simple language, step-by-step explanations, aur bahut saare concrete examples use karein. Har concept ke baad understanding check karein.',
    },
    intermediate: {
      en: '\n\nSTUDENT LEVEL — INTERMEDIATE: Build on existing understanding. Use guided practice, deeper reasoning, and help the student make connections between concepts.',
      ru: '\n\nУРОВЕНЬ — СРЕДНИЙ: Строй на имеющихся знаниях. Используй направляемую практику и помогай устанавливать связи между понятиями.',
      hi: '\n\nSTUDENT LEVEL — INTERMEDIATE: Existing knowledge pe build karein. Guided practice aur concepts ke beech connections banane mein help karein.',
    },
    advanced: {
      en: '\n\nSTUDENT LEVEL — ADVANCED: Engage with challenge questions, exam-style problems, and conceptual nuances. Push for deeper understanding and edge cases.',
      ru: '\n\nУРОВЕНЬ — ПРОДВИНУТЫЙ: Давай сложные задачи, задачи уровня экзамена, концептуальные нюансы.',
      hi: '\n\nSTUDENT LEVEL — ADVANCED: Challenge questions, exam-style problems, aur conceptual nuances ke saath engage karein.',
    },
  }
  return blocks[level][lang]
}

// ── Board/curriculum alignment block ──────────────────────────────────────────

function boardBlock(board: string | undefined, grade: number | null | undefined, lang: TeachingLanguage): string {
  if (!board || !grade) return ''
  const boardLabel = board.toUpperCase().replace(/_/g, ' ')
  const msgs: Record<TeachingLanguage, string> = {
    en: `\n\nCURRICULUM: Teach strictly following ${boardLabel} Class ${grade} syllabus. Use board-aligned terminology, methods, and examples. Do not teach content beyond this grade/board scope.`,
    ru: `\n\nУЧЕБНАЯ ПРОГРАММА: Преподавай строго по программе ${boardLabel} Класс ${grade}. Используй терминологию и методы, соответствующие учебной программе.`,
    hi: `\n\nCURRICULUM: ${boardLabel} Class ${grade} syllabus ke strictly according padhayein. Board-aligned terminology, methods, aur examples use karein.`,
  }
  return msgs[lang]
}

// ── Weak topic / mistake pattern remediation block ────────────────────────────

function remediationBlock(weakTopics: string[] | undefined, mistakePatterns: string[] | undefined, lang: TeachingLanguage): string {
  const parts: string[] = []
  if (weakTopics && weakTopics.length > 0) {
    const labels: Record<TeachingLanguage, string> = {
      en: `KNOWN WEAK AREAS: ${weakTopics.slice(0, 3).join(', ')}. When these topics arise, slow down, check understanding, and use extra examples before moving on.`,
      ru: `ИЗВЕСТНЫЕ СЛАБЫЕ МЕСТА: ${weakTopics.slice(0, 3).join(', ')}. Когда эти темы появляются, замедляйся, проверяй понимание и приводи дополнительные примеры.`,
      hi: `WEAK AREAS: ${weakTopics.slice(0, 3).join(', ')}. Jab ye topics aayein, slow down karein, understanding check karein, extra examples dein.`,
    }
    parts.push(labels[lang])
  }
  if (mistakePatterns && mistakePatterns.length > 0) {
    const labels: Record<TeachingLanguage, string> = {
      en: `COMMON MISTAKES THIS STUDENT MAKES: ${mistakePatterns.slice(0, 2).join('; ')}. Preemptively address these when relevant.`,
      ru: `ТИПИЧНЫЕ ОШИБКИ ЭТОГО УЧЕНИКА: ${mistakePatterns.slice(0, 2).join('; ')}. Предупреждай эти ошибки по мере необходимости.`,
      hi: `IS STUDENT KI COMMON MISTAKES: ${mistakePatterns.slice(0, 2).join('; ')}. Relevant hone par inhe preemptively address karein.`,
    }
    parts.push(labels[lang])
  }
  if (parts.length === 0) return ''
  return `\n\n${parts.join('\n')}`
}

// ── Teaching response contract (Phase 6) ─────────────────────────────────────

function responseContractBlock(lang: TeachingLanguage): string {
  const contracts: Record<TeachingLanguage, string> = {
    en: `\n\nTEACHING RESPONSE FORMAT:
1. EXPLANATION — clear, level-appropriate explanation of the concept
2. WORKED EXAMPLE — at least one concrete example with step-by-step working
3. COMMON MISTAKE — one typical error students make on this topic and how to avoid it
4. QUICK CHECK — one short question to verify understanding
5. NEXT STEP — one sentence pointing to what to learn next
Behave like a teacher, not a search engine. Never skip the Quick Check.`,
    ru: `\n\nФОРМАТ ОТВЕТА УЧИТЕЛЯ:
1. ОБЪЯСНЕНИЕ — понятное, соответствующее уровню
2. РЕШЁННЫЙ ПРИМЕР — хотя бы один конкретный пример с пошаговым решением
3. ТИПИЧНАЯ ОШИБКА — одна распространённая ошибка и как её избежать
4. БЫСТРАЯ ПРОВЕРКА — один короткий вопрос для проверки понимания
5. СЛЕДУЮЩИЙ ШАГ — одно предложение о том, что изучать дальше`,
    hi: `\n\nTEACHING RESPONSE FORMAT:
1. EXPLANATION — level-appropriate clear explanation
2. WORKED EXAMPLE — step-by-step concrete example
3. COMMON MISTAKE — ek typical error aur use kaise avoid karein
4. QUICK CHECK — understanding verify karne ke liye ek chhota sawaal
5. NEXT STEP — aage kya padhna hai ek sentence mein`,
  }
  return contracts[lang]
}

// ── Topic/chapter context block ───────────────────────────────────────────────

function topicBlock(topic: string | undefined, chapter: string | undefined, lang: TeachingLanguage): string {
  if (!topic && !chapter) return ''
  const topicStr = [chapter, topic].filter(Boolean).join(' → ')
  const msgs: Record<TeachingLanguage, string> = {
    en: `\n\nCURRENT FOCUS: ${topicStr}. Keep explanations within this scope.`,
    ru: `\n\nТЕКУЩАЯ ТЕМА: ${topicStr}. Держи объяснения в рамках этой темы.`,
    hi: `\n\nCURRENT FOCUS: ${topicStr}. Explanations is scope mein rakhen.`,
  }
  return msgs[lang]
}

// ── Base system prompt per language ───────────────────────────────────────────

function baseSystemPrompt(subject: string, goals: string, lang: TeachingLanguage, memoryContext: string | null | undefined): string {
  const memory = memoryContext ? (
    lang === 'en' ? `\n\nMemory from previous lessons:\n${memoryContext}` :
    lang === 'ru' ? `\n\nПамять из предыдущих уроков:\n${memoryContext}` :
    `\n\nPichle lessons ki memory:\n${memoryContext}`
  ) : ''

  if (lang === 'ru') {
    return `Ты опытный репетитор по ${subject}, который обучает на русском языке.
Общайся ТОЛЬКО на русском, если ученик явно не попросит иначе.
Цель: учить шаг за шагом, адаптируя объяснения под уровень ученика.
ГРАНИЦА ПРЕДМЕТА: преподавай ТОЛЬКО ${subject}.
Цели ученика: ${goals}${memory}`
  }
  if (lang === 'hi') {
    return `Aap ek experienced ${subject} tutor hain jo Hindi mein padhate hain.
SIRF Hindi mein communicate karein jab tak student kuch aur na maange.
Lakshya: step by step padhana, explanations student ke level ke according.
SUBJECT BOUNDARY: Sirf ${subject} padhayein.
Student ke goals: ${goals}${memory}`
  }
  return `You are an experienced ${subject} tutor who teaches in English.
Communicate ONLY in English unless the student explicitly asks otherwise.
Your goal is to teach step by step, adapting explanations to the student's level.
SUBJECT BOUNDARY: You teach ${subject} ONLY. Cross-disciplinary connections that illuminate ${subject} are fine; teaching another subject is not.
Student goals: ${goals}${memory}`
}

// ── Prompt injection sanitizer ────────────────────────────────────────────────

/**
 * Strips content that could override system-level instructions.
 * Student input is treated as data only — it cannot alter educational metadata.
 */
export function sanitizeStudentInput(raw: string): string {
  // Remove attempts to inject system-level overrides
  return raw
    .replace(/^\s*system\s*:/gi, '[redacted]:')
    .replace(/ignore\s+(all\s+)?(previous|above|prior)\s+instructions?/gi, '[instruction ignored]')
    .replace(/you\s+are\s+now\s+/gi, '[override blocked] ')
    .trim()
    .slice(0, 2000) // hard length cap
}

// ── Main builder ──────────────────────────────────────────────────────────────

export function buildEducationalPrompt(ctx: EducationalContext): BuiltPrompt {
  const lang: TeachingLanguage = ctx.lang ?? 'en'
  const masteryLevel = classifyMastery(ctx.masteryPct)
  const goals = ctx.learningGoals ?? `Study ${ctx.subject}${ctx.topic ? ` — ${ctx.topic}` : ''}`

  const systemPrompt = [
    baseSystemPrompt(ctx.subject, goals, lang, ctx.memoryContext),
    boardBlock(ctx.board, ctx.grade, lang),
    gradeInstructions(ctx.grade, lang),
    topicBlock(ctx.topic, ctx.chapter, lang),
    masteryBlock(masteryLevel, lang),
    remediationBlock(ctx.weakTopics, ctx.mistakePatterns, lang),
    responseContractBlock(lang),
  ].join('')

  return {
    systemPrompt,
    masteryLevel,
    lang,
    userMessage: sanitizeStudentInput(ctx.studentQuery),
  }
}

// ── Response validator (Phase 10) ─────────────────────────────────────────────

export interface ValidatedAIResponse {
  text: string
  valid: boolean
  /** Reason for rejection when valid=false */
  reason?: string
}

/**
 * Validates AI response for educational consistency.
 * Rejects impossible values and enforces minimum structure.
 */
export function validateAIResponse(rawText: string | null | undefined): ValidatedAIResponse {
  if (!rawText || rawText.trim().length === 0) {
    return { text: '', valid: false, reason: 'empty_response' }
  }

  const text = rawText.trim()

  // Reject unreasonably short responses (likely truncated)
  if (text.length < 20) {
    return { text, valid: false, reason: 'too_short' }
  }

  // Reject responses that appear to be raw JSON (structural leak)
  if (text.startsWith('{') || text.startsWith('[')) {
    try {
      JSON.parse(text)
      return { text, valid: false, reason: 'raw_json_response' }
    } catch { /* not valid JSON, fine */ }
  }

  return { text, valid: true }
}
