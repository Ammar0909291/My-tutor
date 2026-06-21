// Narration Source Extraction — Visual Learning Sprint U, Task 2.
// Pure, deterministic conversion of a tutor's explanation text into ordered
// narration segments, reusing the Sprint S LessonTimeline shape. No AI calls,
// no LLM prompts, no database writes, no Tutor Max changes — this only
// restructures text Tutor Max already produced. See
// docs/VISUAL_LEARNING_SPRINT_U_AUDIT.md.

import type { LessonSegment, LessonTimeline } from './lessonSegments'

/**
 * Splits explanation text into ordered narration beats: blank-line/paragraph
 * breaks first, then sentence boundaries within a paragraph. Deterministic —
 * the same input always produces the same segments.
 */
function splitIntoLines(text: string): string[] {
  return text
    .replace(/\r\n/g, '\n')
    .split(/\n+|(?<=[.!?])\s+/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
}

/**
 * Converts a tutor explanation string into a LessonTimeline whose segment i
 * aligns to visual step i+1 (1-based) — the same convention
 * tutorVisualSync.ts's timelineFromNarrationLines() already uses, so the
 * result feeds the existing Sprint S sync layer unchanged.
 */
export function extractNarrationSegments(text: string, visualType?: string): LessonTimeline {
  const lines = splitIntoLines(text)
  const segments: LessonSegment[] = lines.map((narration, i) => ({
    id: `${visualType ?? 'narration'}-seg-${i + 1}`,
    narration,
    visualStep: i + 1,
  }))
  return { visualType, segments }
}
