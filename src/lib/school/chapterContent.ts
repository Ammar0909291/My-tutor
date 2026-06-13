import { prisma } from '@/lib/db/prisma'
import { generateJSON } from '@/lib/ai/client'
import { getNodesForChapter, type Chapter } from '@/lib/education'
import { chapterDisplayTitle } from './schoolRouting'

/**
 * Chapter content (Sprint BL) — student-friendly "About this chapter" summary
 * and "What you will learn" objectives.
 *
 * AI output is cached globally per board/subject/grade/chapter (not per-user)
 * so the (slow, rate-limited) generation only happens once per chapter across
 * all students. Falls back to instant KG-derived content when there's no
 * cache yet and generation fails or is unavailable — the page never blocks
 * on AI.
 */

export interface ChapterContent {
  summary: string
  objectives: string[]
}

const BOARD_LABELS: Record<string, string> = {
  cbse: 'CBSE',
  up_board: 'UP Board',
}

const LANGUAGE = 'en'

function fallbackContent(chapter: Chapter): ChapterContent {
  const title = chapterDisplayTitle(chapter.title)
  const topics = getNodesForChapter(chapter).map((n) => n.title)

  const summary = topics.length > 0
    ? `This chapter, "${title}", covers ${topics.length} key topic${topics.length === 1 ? '' : 's'}: ${topics.join(', ')}. Working through these ideas step by step will help you build a strong foundation for what comes next.`
    : `This chapter, "${title}", is part of your course. Work through the lessons and practice questions to build your understanding.`

  const objectives = topics.length > 0
    ? topics.slice(0, 6).map((t) => `Learn about ${t}`)
    : [`Understand the key ideas in ${title}`]

  return { summary, objectives }
}

function languageNote(subjectName: string): string {
  return subjectName === 'Hindi'
    ? 'Write ALL content (summary, objectives) in Hindi (Devanagari script). Do not use Roman transliteration.'
    : ''
}

function buildPrompt(board: string, subjectName: string, grade: number, chapter: Chapter): string {
  const title = chapterDisplayTitle(chapter.title)
  const topics = getNodesForChapter(chapter).map((n) => n.title)
  const boardLabel = BOARD_LABELS[board] ?? board

  return [
    languageNote(subjectName),
    `You are writing for a ${boardLabel} Grade ${grade} ${subjectName} student opening the chapter "${title}".`,
    `Topics in this chapter: ${topics.length > 0 ? topics.join(', ') : title}.`,
    '',
    'Write two things:',
    '1. "summary": A friendly 150-250 word overview explaining what this chapter is about, why it matters, and where it is used in real life. Plain, student-friendly language, 2-3 short paragraphs as a single string. No headings, no bullet points, no markdown.',
    '2. "objectives": An array of 4-6 short "What you will learn" bullets written for a student (e.g. "What rational numbers are", "How to compare them"). Each under 12 words, plain text, no numbering.',
    '',
    'Return ONLY this JSON shape: { "summary": string, "objectives": string[] }',
  ].join('\n')
}

function isValidContent(data: unknown): data is ChapterContent {
  if (!data || typeof data !== 'object') return false
  const d = data as Record<string, unknown>
  return typeof d.summary === 'string' && d.summary.trim().length > 0
    && Array.isArray(d.objectives) && d.objectives.length > 0
    && d.objectives.every((o) => typeof o === 'string' && o.trim().length > 0)
}

export async function getChapterContent(
  board: string,
  subjectSlug: string,
  subjectName: string,
  grade: number,
  chapter: Chapter,
): Promise<ChapterContent> {
  const cached = await prisma.chapterContentCache.findUnique({
    where: { board_subjectSlug_grade_chapterId_language: { board, subjectSlug, grade, chapterId: chapter.id, language: LANGUAGE } },
  }).catch(() => null)

  if (cached && Array.isArray(cached.objectives)) {
    return { summary: cached.summary, objectives: cached.objectives as string[] }
  }

  const fallback = fallbackContent(chapter)
  const generated = await generateJSON(buildPrompt(board, subjectName, grade, chapter), 700)
  if (!isValidContent(generated)) return fallback

  const content: ChapterContent = {
    summary: generated.summary.trim(),
    objectives: generated.objectives.slice(0, 6).map((o) => o.trim()),
  }

  await prisma.chapterContentCache.create({
    data: { board, subjectSlug, grade, chapterId: chapter.id, language: LANGUAGE, summary: content.summary, objectives: content.objectives },
  }).catch(() => {})

  return content
}
