import { prisma } from '@/lib/db/prisma'

/**
 * Sprint BS — persistence + derived stats for LearningCheckpoint rows.
 * No writes to MistakeRecord / TopicProgress / PracticeSession.
 */

const RETRY_WINDOW_MS = 30 * 60 * 1000
const PASS_RATE_LOOKBACK_DAYS = 14

export interface RecordCheckpointInput {
  userId: string
  board: string
  grade: number
  subjectSlug: string
  chapterId: string
  kgNodeId: string | null
  question: string
  answer: string
  userResponse: string
  passed: boolean
  hintUsed: boolean
}

export async function recordCheckpoint(input: RecordCheckpointInput): Promise<void> {
  await prisma.learningCheckpoint.create({
    data: {
      userId: input.userId,
      board: input.board,
      grade: input.grade,
      subjectSlug: input.subjectSlug,
      chapterId: input.chapterId,
      kgNodeId: input.kgNodeId,
      question: input.question.slice(0, 1000),
      answer: input.answer.slice(0, 1000),
      userResponse: input.userResponse.slice(0, 1000),
      passed: input.passed,
      hintUsed: input.hintUsed,
    },
  }).catch(() => {})
}

export interface PendingRetry {
  id: string
  question: string
  answer: string
  kgNodeId: string | null
}

/**
 * The most recent checkpoint for this chapter, if it failed and hasn't been
 * retried with a hint yet (within RETRY_WINDOW_MS). Drives the "give a hint
 * and retry once" branch of the tutor flow.
 */
export async function getPendingRetry(
  userId: string,
  subjectSlug: string,
  chapterId: string,
): Promise<PendingRetry | null> {
  const since = new Date(Date.now() - RETRY_WINDOW_MS)
  const last = await prisma.learningCheckpoint.findFirst({
    where: { userId, subjectSlug, chapterId, createdAt: { gte: since } },
    orderBy: { createdAt: 'desc' },
    select: { id: true, question: true, answer: true, kgNodeId: true, passed: true, hintUsed: true },
  }).catch(() => null)
  if (!last || last.passed || last.hintUsed) return null
  return { id: last.id, question: last.question, answer: last.answer, kgNodeId: last.kgNodeId }
}

/** Checkpoint pass rate across the lookback window — feeds the adaptive learning profile. */
export async function getCheckpointPassRate(userId: string): Promise<{ passRate: number | null; total: number }> {
  const since = new Date(Date.now() - PASS_RATE_LOOKBACK_DAYS * 86400000)
  const rows = await prisma.learningCheckpoint.findMany({
    where: { userId, createdAt: { gte: since } },
    select: { passed: true },
  }).catch(() => [])
  if (rows.length === 0) return { passRate: null, total: 0 }
  const passed = rows.filter((r) => r.passed).length
  return { passRate: Math.round((passed / rows.length) * 100), total: rows.length }
}

/**
 * Blended 0-100 understanding signal for a chapter, combining checkpoint pass
 * rate with practice status and assessment score. Returns null when no signal
 * exists at all (chapter workspace hides the card in that case).
 */
export async function getUnderstandingLevel(
  userId: string,
  subjectSlug: string,
  chapterId: string,
  practiceStatus: 'not_started' | 'in_progress' | 'mastered',
  assessmentScore: number | null,
  assessmentAttempts: number,
): Promise<number | null> {
  const since = new Date(Date.now() - PASS_RATE_LOOKBACK_DAYS * 86400000)
  const rows = await prisma.learningCheckpoint.findMany({
    where: { userId, subjectSlug, chapterId, createdAt: { gte: since } },
    select: { passed: true },
  }).catch(() => [])

  const signals: number[] = []
  if (rows.length > 0) {
    const passed = rows.filter((r) => r.passed).length
    signals.push(Math.round((passed / rows.length) * 100))
  }
  if (practiceStatus !== 'not_started') {
    signals.push(practiceStatus === 'mastered' ? 100 : 50)
  }
  if (assessmentAttempts > 0) {
    signals.push(assessmentScore ?? 0)
  }
  if (signals.length === 0) return null
  return Math.round(signals.reduce((a, b) => a + b, 0) / signals.length)
}
