import type { BoardSubjectCatalog, Chapter } from '@/lib/education'
import {
  ALL_KG_NODES,
  BOARD_CATALOGS,
  getNodesForChapter,
  findUnmappedChapters,
  findUnusedKnowledgeNodes,
} from '@/lib/education'
import type { UnusedNodesReport } from '@/lib/education'

/**
 * Content Quality & Curriculum Integrity Engine (Sprint CL).
 *
 * Internal validation engine — NOT a user feature, NOT a dashboard.
 * Deterministic audit of BoardSubjectCatalog data: for every chapter, checks
 * whether the structural prerequisites for chapter summaries, revision notes,
 * practice generation, assessment generation, roadmap visibility, and lesson
 * planner coverage are present, then rolls results up into per-subject,
 * per-grade, and per-board coverage figures.
 *
 * Quality score per chapter:
 *   100 = fully covered   — valid roadmap entry + at least one valid KG node
 *   80  = minor gaps      — valid roadmap entry, but no KG nodes mapped
 *                            (summary/revision/practice/assessment fall back
 *                            to generic content; lesson planner has nothing
 *                            to track)
 *   50  = needs review    — kgNodeIds reference one or more nonexistent KG
 *                            nodes (partially broken mapping)
 *   0   = broken          — missing/invalid title or order, or a chapter ID
 *                            duplicated elsewhere in the audited set
 */

export interface ChapterQualityChecks {
  hasKgNodes: boolean
  hasChapterSummarySupport: boolean
  hasRevisionNoteSupport: boolean
  hasPracticeGenerationSupport: boolean
  hasAssessmentGenerationSupport: boolean
  hasRoadmapVisibility: boolean
  hasLessonPlannerCoverage: boolean
}

export type QualityScore = 0 | 50 | 80 | 100
export type QualityLabel = 'broken' | 'needs_review' | 'minor_gaps' | 'fully_covered'

export interface ChapterQualityResult {
  boardId: string
  subjectSlug: string
  grade: number
  chapterId: string
  chapterTitle: string
  order: number
  checks: ChapterQualityChecks
  score: QualityScore
  label: QualityLabel
  issues: string[]
}

export interface QualityCoverage {
  totalChapters: number
  fullyCovered: number
  minorGaps: number
  needsReview: number
  broken: number
  averageScore: number
  coveragePercent: number
}

export interface SubjectQualityCoverage extends QualityCoverage {
  boardId: string
  subjectSlug: string
}

export interface GradeQualityCoverage extends QualityCoverage {
  boardId: string
  subjectSlug: string
  grade: number
}

export interface BoardQualityCoverage extends QualityCoverage {
  boardId: string
  subjects: SubjectQualityCoverage[]
  grades: GradeQualityCoverage[]
}

export interface DeepValidationReport {
  /** KG nodes referenced by no chapter in any audited catalog, grouped by subject domain. */
  orphanKgNodes: UnusedNodesReport[]
  /** Chapter IDs that appear more than once across the audited catalogs. */
  duplicateChapterIds: string[]
  /** Chapter IDs with an empty kgNodeIds array. */
  emptyChapterMappings: string[]
  /** Chapters whose kgNodeIds reference KG node IDs that don't exist. */
  brokenSubjectReferences: Array<{ chapterId: string; missingNodeIds: string[] }>
  /** Chapters with missing/invalid title or order — cannot be shown in the roadmap. */
  missingRoadmapReferences: string[]
  /** Chapters with no KG nodes to drive revision-note generation (same as emptyChapterMappings). */
  missingRevisionNoteSupport: string[]
}

export interface AuditReport {
  generatedAt: string
  boardIds: string[]
  overall: QualityCoverage
  boards: BoardQualityCoverage[]
  chapters: ChapterQualityResult[]
  brokenChapters: ChapterQualityResult[]
  warnings: string[]
  deepValidation: DeepValidationReport
}

const KNOWN_NODE_IDS = new Set(ALL_KG_NODES.map((n) => n.id))

function hasValidTitle(chapter: Chapter): boolean {
  return typeof chapter.title === 'string' && chapter.title.trim().length > 0
}

function hasValidOrder(chapter: Chapter): boolean {
  return Number.isFinite(chapter.order) && chapter.order > 0
}

function brokenNodeIds(chapter: Chapter): string[] {
  return chapter.kgNodeIds.filter((id) => !KNOWN_NODE_IDS.has(id))
}

/** Audit a single chapter. `isDuplicateId` must be computed across the whole audited set. */
export function auditChapter(
  boardId: string,
  subjectSlug: string,
  grade: number,
  chapter: Chapter,
  isDuplicateId: boolean,
): ChapterQualityResult {
  const issues: string[] = []

  const validTitle = hasValidTitle(chapter)
  const validOrder = hasValidOrder(chapter)
  const missingNodeIds = brokenNodeIds(chapter)
  const hasAnyKgRefs = chapter.kgNodeIds.length > 0
  const hasBrokenRefs = missingNodeIds.length > 0

  const hasRoadmapVisibility = validTitle && validOrder && !isDuplicateId
  const hasKgNodes = hasAnyKgRefs && !hasBrokenRefs

  const checks: ChapterQualityChecks = {
    hasKgNodes,
    hasChapterSummarySupport: hasKgNodes,
    hasRevisionNoteSupport: hasKgNodes,
    hasPracticeGenerationSupport: hasKgNodes,
    hasAssessmentGenerationSupport: hasKgNodes,
    hasRoadmapVisibility,
    hasLessonPlannerCoverage: hasKgNodes,
  }

  let score: QualityScore
  let label: QualityLabel

  if (!hasRoadmapVisibility) {
    score = 0
    label = 'broken'
    if (!validTitle) issues.push('Missing or empty chapter title')
    if (!validOrder) issues.push(`Invalid chapter order (${chapter.order})`)
    if (isDuplicateId) issues.push(`Duplicate chapter ID "${chapter.id}"`)
  } else if (hasBrokenRefs) {
    score = 50
    label = 'needs_review'
    issues.push(`kgNodeIds reference nonexistent KG node(s): ${missingNodeIds.join(', ')}`)
  } else if (!hasAnyKgRefs) {
    score = 80
    label = 'minor_gaps'
    issues.push('No KG nodes mapped — summary/revision/practice/assessment will use generic fallback content and the lesson planner has nothing to track')
  } else {
    score = 100
    label = 'fully_covered'
  }

  return {
    boardId,
    subjectSlug,
    grade,
    chapterId: chapter.id,
    chapterTitle: chapter.title,
    order: chapter.order,
    checks,
    score,
    label,
    issues,
  }
}

/** Audit every chapter across the given catalogs. Duplicate chapter IDs are detected across the whole set. */
export function auditCatalogs(catalogs: BoardSubjectCatalog[]): ChapterQualityResult[] {
  const flattened: Array<{ catalog: BoardSubjectCatalog; grade: number; chapter: Chapter }> = []
  for (const catalog of catalogs) {
    for (const g of catalog.grades) {
      for (const chapter of g.chapters) {
        flattened.push({ catalog, grade: g.grade, chapter })
      }
    }
  }

  const idCounts = new Map<string, number>()
  for (const { chapter } of flattened) {
    idCounts.set(chapter.id, (idCounts.get(chapter.id) ?? 0) + 1)
  }

  return flattened.map(({ catalog, grade, chapter }) =>
    auditChapter(catalog.boardId, catalog.subjectSlug, grade, chapter, (idCounts.get(chapter.id) ?? 0) > 1),
  )
}

export function summarizeQuality(results: ChapterQualityResult[]): QualityCoverage {
  const totalChapters = results.length
  const fullyCovered = results.filter((r) => r.label === 'fully_covered').length
  const minorGaps = results.filter((r) => r.label === 'minor_gaps').length
  const needsReview = results.filter((r) => r.label === 'needs_review').length
  const broken = results.filter((r) => r.label === 'broken').length
  const averageScore = totalChapters > 0
    ? results.reduce((sum, r) => sum + r.score, 0) / totalChapters
    : 0

  return {
    totalChapters,
    fullyCovered,
    minorGaps,
    needsReview,
    broken,
    averageScore: Math.round(averageScore * 10) / 10,
    coveragePercent: Math.round(averageScore),
  }
}

/** Deep cross-chapter validation: orphan nodes, duplicates, empty mappings, broken refs, missing roadmap data. */
export function runDeepValidation(catalogs: BoardSubjectCatalog[]): DeepValidationReport {
  const orphanKgNodes = findUnusedKnowledgeNodes(catalogs)
  const brokenSubjectReferences = findUnmappedChapters(catalogs)

  const emptyChapterMappings: string[] = []
  const missingRoadmapReferences: string[] = []
  const idCounts = new Map<string, number>()

  for (const catalog of catalogs) {
    for (const g of catalog.grades) {
      for (const chapter of g.chapters) {
        idCounts.set(chapter.id, (idCounts.get(chapter.id) ?? 0) + 1)
        if (chapter.kgNodeIds.length === 0) emptyChapterMappings.push(chapter.id)
        if (!hasValidTitle(chapter) || !hasValidOrder(chapter)) missingRoadmapReferences.push(chapter.id)
      }
    }
  }

  const duplicateChapterIds = [...idCounts.entries()]
    .filter(([, count]) => count > 1)
    .map(([id]) => id)

  return {
    orphanKgNodes,
    duplicateChapterIds,
    emptyChapterMappings,
    brokenSubjectReferences,
    missingRoadmapReferences,
    missingRevisionNoteSupport: emptyChapterMappings,
  }
}

/** Build the full audit report for the given boards (default: all supported boards). */
export function buildAuditReport(boardIds: string[] = ['cbse', 'up_board']): AuditReport {
  const catalogs = BOARD_CATALOGS.filter((c) => boardIds.includes(c.boardId))
  const chapters = auditCatalogs(catalogs)

  const boards: BoardQualityCoverage[] = boardIds.map((boardId) => {
    const boardChapters = chapters.filter((c) => c.boardId === boardId)

    const subjectSlugs = [...new Set(boardChapters.map((c) => c.subjectSlug))]
    const subjects: SubjectQualityCoverage[] = subjectSlugs.map((subjectSlug) => ({
      boardId,
      subjectSlug,
      ...summarizeQuality(boardChapters.filter((c) => c.subjectSlug === subjectSlug)),
    }))

    const gradeKeys = [...new Set(boardChapters.map((c) => `${c.subjectSlug}::${c.grade}`))]
    const grades: GradeQualityCoverage[] = gradeKeys.map((key) => {
      const [subjectSlug, gradeStr] = key.split('::')
      const grade = Number(gradeStr)
      return {
        boardId,
        subjectSlug,
        grade,
        ...summarizeQuality(boardChapters.filter((c) => c.subjectSlug === subjectSlug && c.grade === grade)),
      }
    })

    return { boardId, subjects, grades, ...summarizeQuality(boardChapters) }
  })

  const brokenChapters = chapters.filter((c) => c.label === 'broken')
  const deepValidation = runDeepValidation(catalogs)

  const warnings: string[] = []
  for (const c of chapters) {
    if (c.label === 'needs_review' || c.label === 'minor_gaps') {
      warnings.push(`[${c.boardId}/${c.subjectSlug} G${c.grade}] ${c.chapterId} ("${c.chapterTitle}"): ${c.issues.join('; ')}`)
    }
  }
  if (deepValidation.orphanKgNodes.length > 0) {
    for (const r of deepValidation.orphanKgNodes) {
      warnings.push(`Orphan KG nodes in domain "${r.subject}": ${r.unusedNodes.length} node(s) not referenced by any audited chapter`)
    }
  }

  return {
    generatedAt: new Date().toISOString(),
    boardIds,
    overall: summarizeQuality(chapters),
    boards,
    chapters,
    brokenChapters,
    warnings,
    deepValidation,
  }
}

// ── AI Quality Sampling ──────────────────────────────────────────────────────

export interface AISampleTask {
  boardId: string
  subjectSlug: string
  grade: number
  chapter: Chapter
}

/**
 * Deterministically pick a small sample of chapters (one per catalog, from a
 * middle grade) for live AI-generation checks. Picking a chapter per catalog
 * keeps the sample representative without making mass AI calls.
 */
export function pickAISampleChapters(catalogs: BoardSubjectCatalog[], maxTotal = 8): AISampleTask[] {
  const tasks: AISampleTask[] = []
  for (const catalog of catalogs) {
    const gradesWithChapters = catalog.grades.filter((g) => g.chapters.length > 0)
    if (gradesWithChapters.length === 0) continue
    const mid = gradesWithChapters[Math.floor(gradesWithChapters.length / 2)]
    const chapter = mid.chapters[0]
    tasks.push({ boardId: catalog.boardId, subjectSlug: catalog.subjectSlug, grade: mid.grade, chapter })
  }
  return tasks.slice(0, maxTotal)
}

export interface AISampleResult {
  boardId: string
  subjectSlug: string
  grade: number
  chapterId: string
  chapterSummaryOk: boolean
  revisionNotesOk: boolean
  practiceGenerationOk: boolean
  assessmentGenerationOk: boolean
  errors: string[]
}
