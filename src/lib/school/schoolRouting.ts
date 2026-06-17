import { BOARD_CATALOGS, getBoard } from '@/lib/education'
import type { BoardSubjectCatalog, Chapter } from '@/lib/education'

/**
 * School Mode routing helpers (Sprint BH).
 *
 * School Mode consumes BoardSubjectCatalog directly (Sprint BE decision) —
 * no Curriculum rows are generated.
 *
 * Progress mapping (Sprint BH decision):
 *   • StudentProgress.subjectCode uses the namespaced form
 *     "<board>:<subjectSlug>:<grade>" (e.g. "cbse:mathematics:8") so school
 *     progress can never collide with global-mode rows for the same subject.
 *   • completedLessons[] is Int[] in the existing schema, so it stores
 *     completed chapter `order` values within the grade (schema unchanged —
 *     no duplicate progress architecture).
 *   • currentLesson stores the current chapter's `order`.
 *   • Mastery stays in TopicProgress keyed by the chapter's kgNodeIds
 *     (already valid topicSlug values) — wired in Sprint BJ.
 */

export function schoolSubjectCode(boardId: string, subjectSlug: string, grade: number): string {
  return `${boardId}:${subjectSlug}:${grade}`
}

export function getSchoolCatalog(boardId: string, subjectSlug: string): BoardSubjectCatalog | undefined {
  return BOARD_CATALOGS.find((c) => c.boardId === boardId && c.subjectSlug === subjectSlug)
}

export function getSchoolChapters(boardId: string, subjectSlug: string, grade: number): Chapter[] {
  const catalog = getSchoolCatalog(boardId, subjectSlug)
  const chapters = catalog?.grades.find((g) => g.grade === grade)?.chapters ?? []
  return [...chapters].sort((a, b) => a.order - b.order)
}

export function isSchoolSubject(boardId: string, subjectSlug: string): boolean {
  return getBoard(boardId)?.subjects.includes(subjectSlug) ?? false
}

export interface ChapterPosition {
  previous: Chapter | null
  current: Chapter
  next: Chapter | null
  completedCount: number
  totalCount: number
  percent: number
}

/**
 * Current chapter = first chapter (in order) not yet completed; when
 * everything is done, the last chapter stays current.
 */
export function getChapterPosition(chapters: Chapter[], completedChapterOrders: number[]): ChapterPosition | null {
  if (chapters.length === 0) return null
  const completed = new Set(completedChapterOrders)
  const idx = chapters.findIndex((c) => !completed.has(c.order))
  const currentIdx = idx === -1 ? chapters.length - 1 : idx
  const completedCount = chapters.filter((c) => completed.has(c.order)).length
  return {
    previous: currentIdx > 0 ? chapters[currentIdx - 1] : null,
    current: chapters[currentIdx],
    next: currentIdx < chapters.length - 1 ? chapters[currentIdx + 1] : null,
    completedCount,
    totalCount: chapters.length,
    percent: Math.round((completedCount / chapters.length) * 100),
  }
}

/**
 * Group chapters by unit/theme for the full-list view. SST/English chapter
 * titles carry a "[Theme]" or "Reader —" prefix; chapters without a
 * recognizable prefix group under the subject's default unit.
 */
export function groupChaptersByUnit(chapters: Chapter[]): { unit: string; chapters: Chapter[] }[] {
  const groups: { unit: string; chapters: Chapter[] }[] = []
  for (const ch of chapters) {
    const bracket = ch.title.match(/^\[([^\]]+)\]/)
    const dash = ch.title.match(/^([A-Za-z' ]+) — /)
    const unit = bracket?.[1] ?? dash?.[1] ?? 'Chapters'
    const last = groups[groups.length - 1]
    if (last && last.unit === unit) last.chapters.push(ch)
    else groups.push({ unit, chapters: [ch] })
  }
  return groups
}

/** Strip the "[Theme]" prefix for display — the unit heading already shows it. */
export function chapterDisplayTitle(title: string): string {
  return title.replace(/^\[[^\]]+\]\s*/, '')
}

export const SCHOOL_SUBJECT_META: Record<string, { label: string; icon: string; color: string; bg: string }> = {
  mathematics:    { label: 'Mathematics',    icon: '🔢', color: 'var(--blue)',   bg: 'var(--blue-muted)' },
  science:        { label: 'Science',        icon: '🔬', color: 'var(--green)',  bg: 'var(--green-muted)' },
  english:        { label: 'English',        icon: '📖', color: 'var(--yellow)', bg: 'var(--yellow-muted)' },
  hindi:          { label: 'Hindi',          icon: '📝', color: 'var(--coral)',  bg: 'var(--coral-muted)' },
  sanskrit:       { label: 'Sanskrit',       icon: '🕉️', color: 'var(--purple)', bg: 'var(--purple-muted)' },
  social_science: { label: 'Social Science', icon: '🌍', color: 'var(--purple)', bg: 'var(--coral-muted)' },
  // Sprint DC: senior-secondary (Grade 11–12) standalone stream subjects.
  physics:           { label: 'Physics',           icon: '⚛️', color: 'var(--blue)',   bg: 'var(--blue-muted)' },
  chemistry:         { label: 'Chemistry',         icon: '🧪', color: 'var(--green)',  bg: 'var(--green-muted)' },
  biology:           { label: 'Biology',           icon: '🧬', color: 'var(--green)',  bg: 'var(--green-muted)' },
  history:           { label: 'History',           icon: '📜', color: 'var(--purple)', bg: 'var(--coral-muted)' },
  geography:         { label: 'Geography',         icon: '🗺️', color: 'var(--yellow)', bg: 'var(--yellow-muted)' },
  political_science: { label: 'Political Science', icon: '⚖️', color: 'var(--purple)', bg: 'var(--coral-muted)' },
  economics:         { label: 'Economics',         icon: '📈', color: 'var(--coral)',  bg: 'var(--coral-muted)' },
  // Sprint DX: Commerce stream subjects (Grade 11–12).
  accountancy:       { label: 'Accountancy',       icon: '🧾', color: 'var(--blue)',   bg: 'var(--blue-muted)' },
  business_studies:  { label: 'Business Studies',  icon: '💼', color: 'var(--coral)',  bg: 'var(--coral-muted)' },
  // Sprint DY: Computer Science (Grades 9–12).
  computer_science:      { label: 'Computer Science',      icon: '💻', color: 'var(--blue)',   bg: 'var(--blue-muted)' },
  // Sprint EA: Information Technology (Grades 9–12).
  information_technology: { label: 'Information Technology', icon: '🖥️', color: 'var(--green)',  bg: 'var(--green-muted)' },
  // Sprint EB: Sociology (Grades 11–12).
  sociology:             { label: 'Sociology',             icon: '🏛️', color: 'var(--purple)', bg: 'var(--coral-muted)' },
  // Sprint EC: Psychology (Grades 11–12).
  psychology:            { label: 'Psychology',            icon: '🧠', color: 'var(--yellow)', bg: 'var(--yellow-muted)' },
  // Sprint ED: Urdu (Grades 6–12, CBSE + UP Board).
  urdu:                  { label: 'Urdu',                  icon: '📜', color: 'var(--green)',  bg: 'var(--green-muted)' },
}

/**
 * Subjects a student at a given grade should actually see — i.e. those with at
 * least one chapter at that grade. This keeps the grade-agnostic `board.subjects`
 * list (which includes both the 5–10 bundled subjects and the 11–12 streams)
 * from surfacing empty subjects: a Grade 7 student sees Science (not Physics);
 * a Grade 11 student sees Physics/Chemistry/Biology (not the now 5–10 Science).
 */
export function getGradeSubjects(boardId: string, grade: number): string[] {
  const all = getBoard(boardId)?.subjects ?? []
  return all.filter((slug) => getSchoolChapters(boardId, slug, grade).length > 0)
}

/**
 * Centralized mode guard for every /school/* route. The dashboard already
 * hides School subjects when `?mode=library` is active, but the /school/*
 * routes themselves had no equivalent check — a learner could navigate
 * straight to a school URL while "in" Library Mode. Each /school/* page
 * calls this once, passing its own `searchParams` prop (Next.js layouts
 * don't receive searchParams, so this can't live in a shared layout —
 * a shared helper keeps the actual check in one place instead).
 */
export function isLibraryModeRequest(searchParams?: Record<string, string | string[] | undefined>): boolean {
  const mode = searchParams?.mode
  return (Array.isArray(mode) ? mode[0] : mode) === 'library'
}
