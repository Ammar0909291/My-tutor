/**
 * Inline practice question selection (chat-embedded, distinct from the
 * standalone practice section). Wires the existing AI generator
 * (generateChapterPractice.ts) into a turn's tutor response when the
 * Teaching Strategy Engine calls for application practice or detects a
 * stalemate (docs/STUDENT_MEMORY_AUDIT.md gap #3 follow-up).
 *
 * Pure selection logic — picks the first MCQ from whichever question list
 * is in play. No new DB table: when userId+prisma are supplied, reuses an
 * existing PracticeSession row (already written by the standalone practice
 * section) from the last 24h for this chapter instead of paying for a
 * second full AI generation call every matching turn. Falls through to the
 * real AI generator on a cache miss. The generator param defaults to the
 * real AI call but is injectable so this can be unit-tested without
 * Groq/DB.
 */

import type { PrismaClient } from '@prisma/client'
import type { Chapter } from '@/lib/education'
import { generateChapterPractice } from './generateChapterPractice'
import type { MCQQuestion, PracticeQuestion } from './practiceTypes'

export interface InlinePracticeQuestion {
  question: string
  options: [string, string, string, string]
  answer: string
}

const CACHE_WINDOW_MS = 24 * 60 * 60 * 1000

function isMCQ(q: PracticeQuestion): q is MCQQuestion {
  return q.type === 'mcq'
}

function selectFromQuestions(questions: PracticeQuestion[]): InlinePracticeQuestion | null {
  const mcq = questions.find(isMCQ)
  if (!mcq) return null
  return {
    question: mcq.question,
    options: mcq.options,
    answer: mcq.options[mcq.correctIndex],
  }
}

/**
 * Looks up the most recent PracticeSession for this userId+chapter within
 * the last 24h and returns its stored questions, or null on a cache miss
 * (no session, or session older than the window) — never throws.
 */
async function findCachedQuestions(
  prisma: PrismaClient,
  userId: string,
  chapterId: string,
): Promise<PracticeQuestion[] | null> {
  const session = await prisma.practiceSession.findFirst({
    where: { userId, chapterId, createdAt: { gte: new Date(Date.now() - CACHE_WINDOW_MS) } },
    orderBy: { createdAt: 'desc' },
  }).catch(() => null)
  if (!session?.questions) return null
  return session.questions as unknown as PracticeQuestion[]
}

export async function generateInlinePractice(
  board: string,
  subjectSlug: string,
  subjectName: string,
  grade: number,
  chapter: Chapter,
  userId?: string | null,
  prisma?: PrismaClient,
  generator: (
    board: string, subjectSlug: string, subjectName: string, grade: number, chapter: Chapter,
  ) => Promise<PracticeQuestion[]> = generateChapterPractice,
): Promise<InlinePracticeQuestion | null> {
  if (userId && prisma) {
    const cached = await findCachedQuestions(prisma, userId, chapter.id)
    if (cached) {
      const fromCache = selectFromQuestions(cached)
      if (fromCache) return fromCache
      // Cached session exists but has no usable MCQ — fall through to AI.
    }
  }

  const questions = await generator(board, subjectSlug, subjectName, grade, chapter)
  return selectFromQuestions(questions)
}

const INLINE_PRACTICE_TAG_RE = /\[INLINE_PRACTICE\]/gi

/**
 * Strip the `[INLINE_PRACTICE]` control tag the system prompt instructs the AI
 * to end its response with (see route.ts). Pure string transform — case
 * insensitive, removes every occurrence, trims the result. The structured
 * InlinePracticeQuestion this tag accompanies is attached to the JSON response
 * independently of whether the tag is actually present in the AI's text, so
 * this function only needs to keep the persisted/returned text clean.
 */
export function parseInlinePracticeTag(text: string): string {
  return text.replace(INLINE_PRACTICE_TAG_RE, '').trim()
}
