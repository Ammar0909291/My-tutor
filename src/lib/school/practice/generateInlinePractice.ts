/**
 * Inline practice question selection (chat-embedded, distinct from the
 * standalone practice section). Wires the existing AI generator
 * (generateChapterPractice.ts) into a turn's tutor response when the
 * Teaching Strategy Engine calls for application practice or detects a
 * stalemate (docs/STUDENT_MEMORY_AUDIT.md gap #3 follow-up).
 *
 * Pure selection logic — picks the first MCQ from whatever the generator
 * returns. No new DB table; the generator param defaults to the real AI
 * call but is injectable so this can be unit-tested without Groq/DB.
 */

import type { Chapter } from '@/lib/education'
import { generateChapterPractice } from './generateChapterPractice'
import type { MCQQuestion, PracticeQuestion } from './practiceTypes'

export interface InlinePracticeQuestion {
  question: string
  options: [string, string, string, string]
  answer: string
}

function isMCQ(q: PracticeQuestion): q is MCQQuestion {
  return q.type === 'mcq'
}

export async function generateInlinePractice(
  board: string,
  subjectSlug: string,
  subjectName: string,
  grade: number,
  chapter: Chapter,
  generator: (
    board: string, subjectSlug: string, subjectName: string, grade: number, chapter: Chapter,
  ) => Promise<PracticeQuestion[]> = generateChapterPractice,
): Promise<InlinePracticeQuestion | null> {
  const questions = await generator(board, subjectSlug, subjectName, grade, chapter)
  const mcq = questions.find(isMCQ)
  if (!mcq) return null
  return {
    question: mcq.question,
    options: mcq.options,
    answer: mcq.options[mcq.correctIndex],
  }
}
