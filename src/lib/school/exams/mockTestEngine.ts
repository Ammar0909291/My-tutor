/**
 * Adaptive Mock Test Engine (Sprint CF).
 * No new tables — reuses PracticeSession with kind='mock'.
 *
 * Adaptive question mix per spec:
 *   40% weak topics  (MistakeRecord + failed checkpoints)
 *   30% average topics (IN_PROGRESS, partial mastery)
 *   30% strong topics (MASTERED/COMPLETED nodes)
 *
 * Question generation: delegates to generateChapterAssessment per chapter
 * then samples/merges into the target question count.
 */

import { generateJSON } from '@/lib/ai/client'
import { getNodesForChapter } from '@/lib/education'
import type { Chapter } from '@/lib/education'
import { getSchoolChapters, chapterDisplayTitle, SCHOOL_SUBJECT_META } from '@/lib/school/schoolRouting'
import { prisma } from '@/lib/db/prisma'
import type { PracticeQuestion } from '@/lib/school/practice/practiceTypes'
import { evaluatePracticeSession } from '@/lib/school/practice/evaluatePracticeAnswer'
import type { PracticeAnswer, QuestionReview } from '@/lib/school/practice/practiceTypes'

export type { MockTestType, MockTestResult } from './mockTestTypes'
export { MOCK_TEST_CONFIG } from './mockTestTypes'
import { MOCK_TEST_CONFIG, type MockTestType, type MockTestResult } from './mockTestTypes'

const BOARD_LABELS: Record<string, string> = { cbse: 'CBSE', up_board: 'UP Board' }

function gradeGuidance(grade: number): string {
  if (grade <= 6) return 'Simple language. Test core recall and basic understanding.'
  if (grade <= 8) return 'Moderate difficulty. Mix recall and application.'
  if (grade <= 10) return 'Standard difficulty. Mix recall, comprehension, and application.'
  return 'Higher difficulty with analysis and multi-step reasoning.'
}

function validateQuestion(q: unknown, nodeIds: string[]): PracticeQuestion | null {
  if (!q || typeof q !== 'object') return null
  const obj = q as Record<string, unknown>
  const id = String(obj.id ?? '')
  const type = String(obj.type ?? '')
  const nodeId = typeof obj.nodeId === 'string' && nodeIds.includes(obj.nodeId) ? obj.nodeId : nodeIds[0]
  const question = String(obj.question ?? '')
  if (!id || !question) return null

  if (type === 'mcq') {
    const options = Array.isArray(obj.options) ? obj.options.map(String) : []
    if (options.length !== 4) return null
    const correctIndex = typeof obj.correctIndex === 'number' ? obj.correctIndex : 0
    return { id, type: 'mcq', nodeId, question, options: options as [string, string, string, string], correctIndex, explanation: String(obj.explanation ?? '') }
  }
  if (type === 'true_false') {
    return { id, type: 'true_false', nodeId, question, correct: obj.correct !== false, explanation: String(obj.explanation ?? '') }
  }
  if (type === 'short_answer') {
    const keywords = Array.isArray(obj.keywords) ? obj.keywords.map(String) : []
    return { id, type: 'short_answer', nodeId, question, sampleAnswer: String(obj.sampleAnswer ?? ''), keywords }
  }
  return null
}

async function generateQuestionsForChapter(
  board: string,
  subjectSlug: string,
  subjectName: string,
  grade: number,
  chapter: Chapter,
  targetCount: number,
  nodeIdFilter?: string[],
): Promise<PracticeQuestion[]> {
  const nodes = getNodesForChapter(chapter).filter((n) => !nodeIdFilter || nodeIdFilter.includes(n.id))
  const nodeIds = nodes.length > 0 ? nodes.map((n) => n.id) : [chapter.id]
  const topics = nodes.length > 0 ? nodes.map((n) => n.title) : [chapterDisplayTitle(chapter.title)]

  const boardLabel = BOARD_LABELS[board] ?? board.toUpperCase()
  const topicLines = topics.slice(0, 6).map((t, i) => `  - "${nodeIds[i] ?? nodeIds[0]}": ${t}`).join('\n')

  const mcqCount = Math.max(1, Math.round(targetCount * 0.6))
  const tfCount = Math.max(0, Math.round(targetCount * 0.25))
  const saCount = Math.max(0, targetCount - mcqCount - tfCount)
  const total = mcqCount + tfCount + saCount

  const prompt = `You are generating questions for a ${boardLabel} Class ${grade} ${subjectName} MOCK TEST.
Chapter: "${chapterDisplayTitle(chapter.title)}"
Topics (node IDs):
${topicLines}

${gradeGuidance(grade)}

Create EXACTLY ${total} questions:
- q1–q${mcqCount}: type "mcq" (4 options, correctIndex 0–3)
- q${mcqCount + 1}–q${mcqCount + tfCount}: type "true_false"
- q${mcqCount + tfCount + 1}–q${total}: type "short_answer"

Return ONLY a JSON array:
[
  {"id":"q1","type":"mcq","nodeId":"<nodeId>","question":"...","options":["A","B","C","D"],"correctIndex":0,"explanation":"..."},
  ...
  {"id":"q${mcqCount + 1}","type":"true_false","nodeId":"<nodeId>","question":"True or false: ...","correct":true,"explanation":"..."},
  ...
  {"id":"q${mcqCount + tfCount + 1}","type":"short_answer","nodeId":"<nodeId>","question":"...","sampleAnswer":"...","keywords":["word1","word2"]},
  ...
]`

  try {
    const raw = await generateJSON(prompt, 2000)
    if (Array.isArray(raw)) {
      const valid = raw
        .map((q) => validateQuestion(q, nodeIds))
        .filter((q): q is PracticeQuestion => q !== null)
        .slice(0, total)
      if (valid.length >= Math.floor(total * 0.6)) return valid
    }
  } catch { /* fall through to fallback */ }

  // Fallback: minimal valid questions
  const fallback: PracticeQuestion[] = []
  for (let i = 0; i < Math.min(targetCount, nodeIds.length * 2); i++) {
    const nId = nodeIds[i % nodeIds.length]
    const t = topics[i % topics.length]
    fallback.push({
      id: `fq${i + 1}`,
      type: 'mcq',
      nodeId: nId,
      question: `Which of the following best describes "${t}"?`,
      options: [`${t} is a key concept`, 'It is not in this chapter', 'It belongs elsewhere', 'None of above'],
      correctIndex: 0,
      explanation: `"${t}" is a key concept in ${chapterDisplayTitle(chapter.title)}.`,
    })
  }
  return fallback
}

export async function generateMockTest(
  userId: string,
  board: string,
  subjectSlug: string,
  grade: number,
  testType: MockTestType,
): Promise<{ questions: PracticeQuestion[]; chapterIds: string[] }> {
  const config = MOCK_TEST_CONFIG[testType]
  const targetCount = config.questionCount
  const chapters = getSchoolChapters(board, subjectSlug, grade)
  if (chapters.length === 0) return { questions: [], chapterIds: [] }

  const since60 = new Date(Date.now() - 60 * 86400000)
  const allNodeIds = [...new Set(chapters.flatMap((c) => c.kgNodeIds))]

  const [topicRows, mistakeRows, checkpointRows] = await Promise.all([
    prisma.topicProgress.findMany({
      where: { userId, subjectSlug, topicSlug: { in: allNodeIds } },
      select: { topicSlug: true, status: true, masteryPct: true },
    }).catch(() => [] as { topicSlug: string; status: string; masteryPct: number }[]),
    prisma.mistakeRecord.findMany({
      where: { userId, subjectSlug, topicSlug: { in: allNodeIds }, createdAt: { gte: since60 } },
      select: { topicSlug: true },
    }).catch(() => [] as { topicSlug: string }[]),
    prisma.learningCheckpoint.findMany({
      where: { userId, subjectSlug, createdAt: { gte: since60 }, passed: false },
      select: { kgNodeId: true },
    }).catch(() => [] as { kgNodeId: string | null }[]),
  ])

  // Classify nodes into weak / average / strong
  const mistakeCount = new Map<string, number>()
  for (const m of mistakeRows) mistakeCount.set(m.topicSlug, (mistakeCount.get(m.topicSlug) ?? 0) + 1)
  const failedCheckpointNodes = new Set(checkpointRows.map((r) => r.kgNodeId).filter(Boolean) as string[])

  const progressMap = new Map(topicRows.map((r) => [r.topicSlug, r]))

  const weakNodes: string[] = []
  const avgNodes: string[] = []
  const strongNodes: string[] = []

  for (const nodeId of allNodeIds) {
    const p = progressMap.get(nodeId)
    const mistakes = mistakeCount.get(nodeId) ?? 0
    const failedCP = failedCheckpointNodes.has(nodeId)
    const mastered = p && (p.status === 'MASTERED' || p.status === 'COMPLETED')
    const inProgress = p && p.status === 'IN_PROGRESS'

    if ((mistakes >= 2 || failedCP) && !mastered) {
      weakNodes.push(nodeId)
    } else if (mastered && (p?.masteryPct ?? 0) >= 75) {
      strongNodes.push(nodeId)
    } else if (inProgress || mistakes === 1) {
      avgNodes.push(nodeId)
    } else {
      // Not started or unknown — treat as average
      avgNodes.push(nodeId)
    }
  }

  // Target counts per category
  const weakTarget = Math.round(targetCount * 0.40)
  const avgTarget = Math.round(targetCount * 0.30)
  const strongTarget = targetCount - weakTarget - avgTarget

  // Build node priority lists (capped to avoid over-sampling one chapter)
  const pickNodes = (pool: string[], count: number) => pool.slice(0, count)

  const selectedWeak = pickNodes(weakNodes, weakTarget)
  const selectedAvg = pickNodes(avgNodes, avgTarget)
  const selectedStrong = pickNodes(strongNodes, strongTarget)

  // Pad with avg/strong if pools are small
  const allSelected = new Set([...selectedWeak, ...selectedAvg, ...selectedStrong])
  const remaining = targetCount - allSelected.size
  if (remaining > 0) {
    const extras = allNodeIds.filter((id) => !allSelected.has(id)).slice(0, remaining)
    extras.forEach((id) => allSelected.add(id))
  }

  // Group selected nodes by chapter, generate questions per chapter
  const nodesByChapter = new Map<string, { chapter: Chapter; nodeIds: string[] }>()
  for (const nodeId of allSelected) {
    for (const chapter of chapters) {
      if (chapter.kgNodeIds.includes(nodeId)) {
        const entry = nodesByChapter.get(chapter.id) ?? { chapter, nodeIds: [] }
        entry.nodeIds.push(nodeId)
        nodesByChapter.set(chapter.id, entry)
        break
      }
    }
  }

  // Distribute question count proportionally across chapters
  const chapterEntries = [...nodesByChapter.values()]
  const subjectName = SCHOOL_SUBJECT_META[subjectSlug]?.label ?? subjectSlug
  const totalNodes = chapterEntries.reduce((s, e) => s + e.nodeIds.length, 0) || 1

  const allQuestions: PracticeQuestion[] = []
  for (const { chapter, nodeIds } of chapterEntries) {
    const chapterTarget = Math.max(1, Math.round((nodeIds.length / totalNodes) * targetCount))
    const qs = await generateQuestionsForChapter(board, subjectSlug, subjectName, grade, chapter, chapterTarget, nodeIds)
    // Prefix question IDs with chapter to avoid collisions
    allQuestions.push(...qs.map((q) => ({ ...q, id: `${chapter.id}__${q.id}` })))
  }

  // Trim / pad to exact target count
  const finalQuestions = allQuestions.slice(0, targetCount)

  const chapterIds = [...new Set(finalQuestions.map((q) => {
    for (const chapter of chapters) {
      if (chapter.kgNodeIds.includes(q.nodeId)) return chapter.id
    }
    return ''
  }).filter(Boolean))]

  return { questions: finalQuestions, chapterIds }
}

export function evaluateMockTest(
  sessionId: string,
  questions: PracticeQuestion[],
  answers: PracticeAnswer[],
  chapters: Chapter[],
  startedAt: Date,
): MockTestResult {
  const base = evaluatePracticeSession(sessionId, questions, answers)

  const timeTakenSeconds = Math.round((Date.now() - startedAt.getTime()) / 1000)

  // Build strong/weak topic ID sets
  const correctByNode = new Map<string, { correct: number; total: number }>()
  for (const r of base.review) {
    const q = questions.find((q) => q.id === r.questionId)
    if (!q) continue
    const entry = correctByNode.get(q.nodeId) ?? { correct: 0, total: 0 }
    entry.total++
    if (r.isCorrect) entry.correct++
    correctByNode.set(q.nodeId, entry)
  }

  const strongTopicIds: string[] = []
  const weakTopicIds: string[] = []
  for (const [nodeId, { correct, total }] of correctByNode) {
    const pct = total > 0 ? correct / total : 0
    if (pct >= 0.75) strongTopicIds.push(nodeId)
    else if (pct < 0.5) weakTopicIds.push(nodeId)
  }

  // Chapter breakdown
  const chapterBreakdown = chapters.map((ch) => {
    const chQs = base.review.filter((r) => {
      const q = questions.find((q) => q.id === r.questionId)
      return q && ch.kgNodeIds.includes(q.nodeId)
    })
    const correct = chQs.filter((r) => r.isCorrect).length
    return { chapterId: ch.id, chapterTitle: chapterDisplayTitle(ch.title), correct, total: chQs.length }
  }).filter((b) => b.total > 0)

  return {
    sessionId,
    score: base.accuracyPercent,
    totalQuestions: base.totalCount,
    correctCount: base.correctCount,
    timeTakenSeconds,
    strongTopicIds,
    weakTopicIds,
    strongTopicTitles: [],   // filled by API route using KG node titles
    weakTopicTitles: [],
    chapterBreakdown,
    review: base.review,
  }
}

/** Builds the MOCK TEST INSIGHTS system prompt block for the tutor. */
export function buildMockTestInsightsBlock(
  subjectLabel: string,
  score: number,
  strongTitles: string[],
  weakTitles: string[],
): string {
  if (strongTitles.length === 0 && weakTitles.length === 0) return ''
  const lines = [`\n\nMOCK TEST INSIGHTS — ${subjectLabel} (recent mock score: ${score}%)`]
  if (strongTitles.length > 0) lines.push(`Strong: ${strongTitles.slice(0, 4).join(', ')}`)
  if (weakTitles.length > 0) lines.push(`Weak: ${weakTitles.slice(0, 4).join(', ')}`)
  lines.push('Tutor: focus explanations on weak areas; build confidence by connecting to strong areas. Do not re-teach already strong topics from scratch.')
  return lines.join('\n')
}
