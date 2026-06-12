import { generateJSON } from '@/lib/ai/client'
import { getNodesForChapter } from '@/lib/education'
import type { Chapter } from '@/lib/education'
import { chapterDisplayTitle } from '@/lib/school/schoolRouting'
import type { PracticeQuestion } from './practiceTypes'

const BOARD_LABELS: Record<string, string> = { cbse: 'CBSE', up_board: 'UP Board' }

function gradeGuidance(grade: number): string {
  if (grade <= 6) return 'Use very simple language and short sentences. Test basic recall only. Options must be clearly distinct.'
  if (grade <= 8) return 'Moderate difficulty. Test understanding of core concepts with some simple application.'
  if (grade <= 10) return 'Standard difficulty. Mix recall with application questions. Include real-world examples.'
  return 'Higher difficulty. Include analysis and multi-step reasoning appropriate for Class 11-12.'
}

function fallbackQuestions(chapter: Chapter, nodeId: string, topic: string): PracticeQuestion[] {
  const title = chapterDisplayTitle(chapter.title)
  return [
    {
      id: 'q1', type: 'mcq', nodeId,
      question: `Which of the following best describes the main concept in "${title}"?`,
      options: [topic, 'An unrelated concept', 'A concept from another subject', 'None of the above'],
      correctIndex: 0,
      explanation: `This chapter focuses on ${topic}.`,
    },
    {
      id: 'q2', type: 'mcq', nodeId,
      question: `"${title}" is a chapter in which subject area?`,
      options: ['This subject', 'Mathematics only', 'Science only', 'Language only'],
      correctIndex: 0,
      explanation: 'This chapter is part of the curriculum for this subject.',
    },
    {
      id: 'q3', type: 'mcq', nodeId,
      question: `Studying "${title}" helps students understand which key area?`,
      options: [topic, 'Unrelated topics', 'Advanced university concepts', 'None of these'],
      correctIndex: 0,
      explanation: `The chapter develops understanding of ${topic}.`,
    },
    {
      id: 'q4', type: 'true_false', nodeId,
      question: `True or false: "${title}" is an important chapter in this course.`,
      correct: true,
      explanation: 'Yes, this chapter is a key part of the curriculum.',
    },
    {
      id: 'q5', type: 'short_answer', nodeId,
      question: `In 2-3 sentences, explain what you understand about "${title}".`,
      sampleAnswer: `${title} covers ${topic} and related ideas. Understanding these concepts helps build a strong foundation for future topics.`,
      keywords: topic.toLowerCase().split(/\s+/).filter((w) => w.length > 3).slice(0, 4),
    },
  ]
}

function buildPrompt(
  board: string,
  subjectName: string,
  grade: number,
  chapter: Chapter,
  topics: string[],
  nodeIds: string[],
): string {
  const title = chapterDisplayTitle(chapter.title)
  const boardLabel = BOARD_LABELS[board] ?? board.toUpperCase()
  const topicLines = topics.slice(0, 6).map((t, i) => `  - "${nodeIds[i] ?? nodeIds[0]}": ${t}`).join('\n')

  return `You are creating practice questions for a ${boardLabel} Class ${grade} ${subjectName} student.
Chapter: "${title}"
Topics covered (use these node IDs when assigning nodeId):
${topicLines}

${gradeGuidance(grade)}

Create EXACTLY 5 questions as a JSON array:
- Questions q1, q2, q3: type "mcq" (4 options, one correct)
- Question q4: type "true_false"
- Question q5: type "short_answer"

Distribute nodeIds across questions based on the topic list above.

Return ONLY this JSON array (no markdown, no explanation):
[
  {"id":"q1","type":"mcq","nodeId":"<nodeId>","question":"...","options":["A text","B text","C text","D text"],"correctIndex":0,"explanation":"Brief reason"},
  {"id":"q2","type":"mcq","nodeId":"<nodeId>","question":"...","options":["A text","B text","C text","D text"],"correctIndex":1,"explanation":"Brief reason"},
  {"id":"q3","type":"mcq","nodeId":"<nodeId>","question":"...","options":["A text","B text","C text","D text"],"correctIndex":2,"explanation":"Brief reason"},
  {"id":"q4","type":"true_false","nodeId":"<nodeId>","question":"True or false: ...","correct":true,"explanation":"Brief reason"},
  {"id":"q5","type":"short_answer","nodeId":"<nodeId>","question":"...","sampleAnswer":"A 2-3 sentence model answer.","keywords":["word1","word2","word3"]}
]`
}

function validateAndFixQuestion(q: unknown, nodeIds: string[], index: number): PracticeQuestion | null {
  if (!q || typeof q !== 'object') return null
  const o = q as Record<string, unknown>
  if (typeof o.question !== 'string' || !o.question.trim()) return null
  if (!o.type || !['mcq', 'true_false', 'short_answer'].includes(o.type as string)) return null

  // Ensure nodeId is valid
  const nodeId = nodeIds.includes(o.nodeId as string) ? (o.nodeId as string) : (nodeIds[index % nodeIds.length] ?? nodeIds[0])
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

export async function generateChapterPractice(
  board: string,
  subjectSlug: string,
  subjectName: string,
  grade: number,
  chapter: Chapter,
): Promise<PracticeQuestion[]> {
  const nodes = getNodesForChapter(chapter)
  const nodeIds = nodes.length > 0 ? nodes.map((n) => n.id) : [chapter.id]
  const topics = nodes.length > 0 ? nodes.map((n) => n.title) : [chapterDisplayTitle(chapter.title)]

  const raw = await generateJSON(buildPrompt(board, subjectName, grade, chapter, topics, nodeIds), 1400)

  if (Array.isArray(raw) && raw.length >= 3) {
    const valid = raw
      .map((q, i) => validateAndFixQuestion(q, nodeIds, i))
      .filter((q): q is PracticeQuestion => q !== null)
      .slice(0, 5)
    if (valid.length >= 3) return valid
  }

  return fallbackQuestions(chapter, nodeIds[0], topics[0])
}
