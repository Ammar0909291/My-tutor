import { generateJSON } from '@/lib/ai/client'
import { getNodesForChapter } from '@/lib/education'
import type { Chapter } from '@/lib/education'
import { chapterDisplayTitle } from '@/lib/school/schoolRouting'
import type { PracticeQuestion } from '../practice/practiceTypes'
import { ASSESSMENT_MCQ_COUNT, ASSESSMENT_TF_COUNT, ASSESSMENT_SA_COUNT, ASSESSMENT_TOTAL } from './assessmentTypes'

const BOARD_LABELS: Record<string, string> = { cbse: 'CBSE', up_board: 'UP Board' }

function gradeGuidance(grade: number): string {
  if (grade <= 6) return 'Simple language. Test core recall and basic understanding. Avoid trick questions.'
  if (grade <= 8) return 'Moderate difficulty. Test understanding with application to simple scenarios.'
  if (grade <= 10) return 'Standard difficulty. Mix recall, comprehension, and application questions.'
  return 'Higher difficulty. Include analysis, application, and multi-step reasoning.'
}

function fallbackAssessment(chapter: Chapter, nodeIds: string[], topics: string[], subjectName?: string): PracticeQuestion[] {
  const title = chapterDisplayTitle(chapter.title)
  const qs: PracticeQuestion[] = []

  if (subjectName === 'Hindi') {
    for (let i = 0; i < ASSESSMENT_MCQ_COUNT; i++) {
      const nId = nodeIds[i % nodeIds.length]
      const t = topics[i % topics.length] ?? title
      qs.push({
        id: `q${i + 1}`, type: 'mcq', nodeId: nId,
        question: `"${t}" के बारे में कौन-सा कथन सही है?`,
        options: [`${t} इस पाठ की प्रमुख अवधारणा है`, 'यह इस पाठ में नहीं पढ़ाया जाता', 'यह किसी अन्य विषय से संबंधित है', 'इनमें से कोई नहीं'],
        correctIndex: 0,
        explanation: `"${t}" इस पाठ में पढ़ाई जाने वाली प्रमुख अवधारणा है।`,
      })
    }
    for (let i = 0; i < ASSESSMENT_TF_COUNT; i++) {
      const nId = nodeIds[i % nodeIds.length]
      const t = topics[i % topics.length] ?? title
      qs.push({
        id: `q${ASSESSMENT_MCQ_COUNT + i + 1}`, type: 'true_false', nodeId: nId,
        question: `सत्य या असत्य: "${t}" इस पाठ की विषय-वस्तु का हिस्सा है।`,
        correct: true,
        explanation: `हाँ, "${t}" इस पाठ में पढ़ाया जाता है।`,
      })
    }
    for (let i = 0; i < ASSESSMENT_SA_COUNT; i++) {
      const nId = nodeIds[i % nodeIds.length]
      const t = topics[i % topics.length] ?? title
      qs.push({
        id: `q${ASSESSMENT_MCQ_COUNT + ASSESSMENT_TF_COUNT + i + 1}`, type: 'short_answer', nodeId: nId,
        question: `"${t}" को अपने शब्दों में समझाइए।`,
        sampleAnswer: `"${t}" इस पाठ की एक महत्त्वपूर्ण अवधारणा है। इसे समझने से पाठ के मुख्य विचारों को सही ढंग से जानने और लागू करने में सहायता मिलती है।`,
        keywords: t.split(/\s+/).filter((w) => w.length > 2).slice(0, 4),
      })
    }
    return qs
  }

  for (let i = 0; i < ASSESSMENT_MCQ_COUNT; i++) {
    const nId = nodeIds[i % nodeIds.length]
    const t = topics[i % topics.length] ?? title
    qs.push({
      id: `q${i + 1}`, type: 'mcq', nodeId: nId,
      question: `Which statement best describes "${t}"?`,
      options: [`${t} is a key concept in this chapter`, 'It is not covered in this chapter', 'It belongs to a different subject', 'None of the above'],
      correctIndex: 0,
      explanation: `${t} is indeed a key concept covered in this chapter.`,
    })
  }
  for (let i = 0; i < ASSESSMENT_TF_COUNT; i++) {
    const nId = nodeIds[i % nodeIds.length]
    const t = topics[i % topics.length] ?? title
    qs.push({
      id: `q${ASSESSMENT_MCQ_COUNT + i + 1}`, type: 'true_false', nodeId: nId,
      question: `True or false: "${t}" is part of this chapter's content.`,
      correct: true,
      explanation: `Yes, "${t}" is covered in this chapter.`,
    })
  }
  for (let i = 0; i < ASSESSMENT_SA_COUNT; i++) {
    const nId = nodeIds[i % nodeIds.length]
    const t = topics[i % topics.length] ?? title
    qs.push({
      id: `q${ASSESSMENT_MCQ_COUNT + ASSESSMENT_TF_COUNT + i + 1}`, type: 'short_answer', nodeId: nId,
      question: `Explain in your own words what you understand about "${t}".`,
      sampleAnswer: `${t} is an important concept from this chapter. It involves understanding the core ideas and applying them correctly.`,
      keywords: t.toLowerCase().split(/\s+/).filter((w) => w.length > 3).slice(0, 4),
    })
  }
  return qs
}

function validateAndFixQuestion(q: unknown, nodeIds: string[], index: number): PracticeQuestion | null {
  if (!q || typeof q !== 'object') return null
  const o = q as Record<string, unknown>
  if (typeof o.question !== 'string' || !o.question.trim()) return null
  if (!o.type || !['mcq', 'true_false', 'short_answer'].includes(o.type as string)) return null

  const nodeId = nodeIds.includes(o.nodeId as string) ? (o.nodeId as string) : nodeIds[index % nodeIds.length]
  const id = `q${index + 1}`

  if (o.type === 'mcq') {
    if (!Array.isArray(o.options) || o.options.length < 4) return null
    const correctIndex = typeof o.correctIndex === 'number' ? Math.max(0, Math.min(3, o.correctIndex)) : 0
    return {
      id, type: 'mcq', nodeId,
      question: String(o.question).trim(),
      options: [String(o.options[0]), String(o.options[1]), String(o.options[2]), String(o.options[3])],
      correctIndex,
      explanation: typeof o.explanation === 'string' ? o.explanation.trim() : '',
    }
  }
  if (o.type === 'true_false') {
    return {
      id, type: 'true_false', nodeId,
      question: String(o.question).trim(),
      correct: o.correct === true,
      explanation: typeof o.explanation === 'string' ? o.explanation.trim() : '',
    }
  }
  if (o.type === 'short_answer') {
    return {
      id, type: 'short_answer', nodeId,
      question: String(o.question).trim(),
      sampleAnswer: typeof o.sampleAnswer === 'string' ? o.sampleAnswer.trim() : String(o.question),
      keywords: Array.isArray(o.keywords) ? o.keywords.filter((k): k is string => typeof k === 'string').slice(0, 6) : [],
    }
  }
  return null
}

function languageNote(subjectName: string): string {
  return subjectName === 'Hindi'
    ? 'Write ALL questions, options, explanations and sample answers in Hindi (Devanagari script). Do not use Roman transliteration.\n'
    : ''
}

const LIT_KG_PREFIXES = ['hindi.gadya.', 'hindi.padya.', 'hindi.sahitya_vishleshan.', 'hindi.kavya_bodh.']

function isHindiLiteratureChapter(chapterTitle: string, nodeIds: string[]): boolean {
  if (nodeIds.some((id) => LIT_KG_PREFIXES.some((p) => id.startsWith(p)))) return true
  const t = chapterTitle.toLowerCase()
  return t.includes('क्षितिज') || t.includes('आरोह') || t.includes('कृतिका') ||
    t.includes('वितान') || t.includes('वसंत') || t.includes('रिमझिम') ||
    t.includes('कहानी') || t.includes('कविता') || t.includes('पद्य') ||
    t.includes('गद्य') || t.includes('निबंध') || t.includes('रामकथा') ||
    t.includes('महाभारत') || t.includes('भारत की खोज') || t.includes('परिचय')
}

function hindiLiteratureGuidance(chapterTitle: string, nodeIds: string[]): string {
  if (!isHindiLiteratureChapter(chapterTitle, nodeIds)) return ''
  const isPoetry = nodeIds.some((id) => id.startsWith('hindi.padya.') || id.startsWith('hindi.kavya_bodh.'))
  const poetryExtra = isPoetry ? '\n- सप्रसंग व्याख्या (contextual explanation of a quoted verse — highest-weight question type)' : ''
  return `This is a Hindi LITERATURE chapter. Include questions on:${poetryExtra}
- विषय-वस्तु (central theme/idea of the text)
- पात्र-चित्रण (character description/analysis) if the text has characters
- भाव-सौंदर्य (emotional/poetic meaning) for poetry passages
- शिल्प-सौंदर्य / भाषाशैली (language style, literary devices used)
- गद्यांश/पद्यांश पर आधारित प्रश्न (passage-based comprehension questions)
- लेखक/कवि की मंशा (author's/poet's intent or message)
Short-answer questions should ask students to explain in 2–3 sentences using the text.
`
}

function buildPrompt(board: string, subjectName: string, grade: number, chapter: Chapter, topics: string[], nodeIds: string[]): string {
  const title = chapterDisplayTitle(chapter.title)
  const boardLabel = BOARD_LABELS[board] ?? board.toUpperCase()
  const topicLines = topics.slice(0, 8).map((t, i) => `  - "${nodeIds[i] ?? nodeIds[0]}": ${t}`).join('\n')

  return `${languageNote(subjectName)}You are creating a chapter ASSESSMENT (not just practice) for a ${boardLabel} Class ${grade} ${subjectName} student.
Chapter: "${title}"
Topics (use these node IDs):
${topicLines}

${gradeGuidance(grade)}
${hindiLiteratureGuidance(title, nodeIds)}
This is a formal assessment. Questions must be comprehensive and cover the chapter thoroughly.

Create EXACTLY ${ASSESSMENT_TOTAL} questions as a JSON array:
- Questions q1–q${ASSESSMENT_MCQ_COUNT}: type "mcq" (4 options, one correct, no trivially easy questions)
- Questions q${ASSESSMENT_MCQ_COUNT + 1}–q${ASSESSMENT_MCQ_COUNT + ASSESSMENT_TF_COUNT}: type "true_false"
- Questions q${ASSESSMENT_MCQ_COUNT + ASSESSMENT_TF_COUNT + 1}–q${ASSESSMENT_TOTAL}: type "short_answer"

Distribute nodeIds across questions to cover all topics evenly.

Return ONLY a JSON array (no markdown):
[
  {"id":"q1","type":"mcq","nodeId":"<nodeId>","question":"...","options":["A","B","C","D"],"correctIndex":0,"explanation":"..."},
  ...${ASSESSMENT_MCQ_COUNT - 1} more MCQ...
  {"id":"q${ASSESSMENT_MCQ_COUNT + 1}","type":"true_false","nodeId":"<nodeId>","question":"True or false: ...","correct":true,"explanation":"..."},
  ...${ASSESSMENT_TF_COUNT - 1} more T/F...
  {"id":"q${ASSESSMENT_MCQ_COUNT + ASSESSMENT_TF_COUNT + 1}","type":"short_answer","nodeId":"<nodeId>","question":"...","sampleAnswer":"2-3 sentence answer.","keywords":["word1","word2","word3"]},
  ...${ASSESSMENT_SA_COUNT - 1} more SA...
]`
}

export async function generateChapterAssessment(
  board: string,
  subjectSlug: string,
  subjectName: string,
  grade: number,
  chapter: Chapter,
): Promise<PracticeQuestion[]> {
  const nodes = getNodesForChapter(chapter)
  const nodeIds = nodes.length > 0 ? nodes.map((n) => n.id) : [chapter.id]
  const topics = nodes.length > 0 ? nodes.map((n) => n.title) : [chapterDisplayTitle(chapter.title)]

  const raw = await generateJSON(buildPrompt(board, subjectName, grade, chapter, topics, nodeIds), 2500)

  if (Array.isArray(raw) && raw.length >= ASSESSMENT_TOTAL - 3) {
    const valid = raw
      .map((q, i) => validateAndFixQuestion(q, nodeIds, i))
      .filter((q): q is PracticeQuestion => q !== null)
      .slice(0, ASSESSMENT_TOTAL)
    if (valid.length >= Math.floor(ASSESSMENT_TOTAL * 0.7)) return valid
  }

  return fallbackAssessment(chapter, nodeIds, topics, subjectName)
}
