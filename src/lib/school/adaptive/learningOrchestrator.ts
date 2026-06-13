/**
 * Learning Intelligence Orchestrator (Sprint CG).
 * Deterministic — no AI, no new tables.
 *
 * Priority order (highest → lowest):
 *   1. failed_assessment      — latest chapter assessment failed, chapter incomplete
 *   2. prerequisite_gap       — HIGH-confidence KG prerequisite missing
 *   3. spaced_revision_due    — overdue node from spaced revision engine
 *   4. weak_topic             — severe weak topic (severity ≥ threshold)
 *   5. exam_readiness_risk    — subject readiness < 40% (Needs Preparation)
 *   6. mock_test_weakness     — recent mock weak node not yet mastered
 *   7. continue_chapter       — resume current chapter
 *   8. start_next_chapter     — begin first chapter for a new subject
 *
 * Returns exactly ONE recommendation — the highest-priority signal found.
 * All sub-calls are non-fatal (.catch(() => null)).
 */

import { prisma } from '@/lib/db/prisma'
import { getBoard } from '@/lib/education'
import { ALL_KG_NODES } from '@/lib/education'
import { chapterDisplayTitle, SCHOOL_SUBJECT_META, getSchoolChapters } from '@/lib/school/schoolRouting'
import { getSchoolProgressForSubjects } from '@/lib/school/schoolProgress'
import { ASSESSMENT_PASS_THRESHOLD } from '@/lib/school/assessment/assessmentTypes'

export type RecommendationType =
  | 'failed_assessment'
  | 'prerequisite_gap'
  | 'spaced_revision_due'
  | 'weak_topic'
  | 'exam_readiness_risk'
  | 'mock_test_weakness'
  | 'continue_chapter'
  | 'start_next_chapter'

export interface LearningRecommendation {
  type: RecommendationType
  priority: number           // 1 = highest
  title: string
  reason: string
  sourceSystem: string
  subjectSlug: string
  subjectLabel: string
  chapterId: string
  href: string
}

const NODE_TITLES = new Map(ALL_KG_NODES.map((n) => [n.id, n.title]))

function subjectLabel(slug: string): string {
  return SCHOOL_SUBJECT_META[slug]?.label ?? slug
}

function chapterHref(subjectSlug: string, chapterId: string, suffix = ''): string {
  return `/school/${subjectSlug}/chapter/${encodeURIComponent(chapterId)}${suffix}`
}

export async function getTopRecommendation(
  userId: string,
  board: string,
  grade: number,
): Promise<LearningRecommendation | null> {
  const slugs = getBoard(board)?.subjects ?? []
  if (slugs.length === 0) return null

  // Fetch shared data once for efficiency
  const [progressMap, assessmentRows] = await Promise.all([
    getSchoolProgressForSubjects(userId, board, grade, slugs).catch(() => new Map()),
    prisma.practiceSession.findMany({
      where: { userId, subjectSlug: { in: slugs }, kind: 'assessment', completedAt: { not: null } },
      orderBy: { completedAt: 'desc' },
      take: 40,
      select: { subjectSlug: true, chapterId: true, score: true },
    }).catch(() => [] as { subjectSlug: string; chapterId: string | null; score: number | null }[]),
  ])

  // ── Priority 1: Failed assessment ─────────────────────────────────────────
  const latestByChapter = new Map<string, { subjectSlug: string; chapterId: string; score: number }>()
  for (const row of assessmentRows) {
    if (!row.chapterId || typeof row.score !== 'number') continue
    const key = `${row.subjectSlug}:${row.chapterId}`
    if (!latestByChapter.has(key)) {
      latestByChapter.set(key, { subjectSlug: row.subjectSlug, chapterId: row.chapterId, score: row.score })
    }
  }
  for (const attempt of latestByChapter.values()) {
    if (attempt.score >= ASSESSMENT_PASS_THRESHOLD) continue
    const progress = progressMap.get(attempt.subjectSlug)
    const chapter = progress?.chapters.find((c: { id: string; order: number }) => c.id === attempt.chapterId)
    if (!chapter || progress!.completedOrders.has(chapter.order)) continue
    return {
      type: 'failed_assessment',
      priority: 1,
      title: chapterDisplayTitle(chapter.title),
      reason: `Last score: ${attempt.score}% — retake to complete this chapter`,
      sourceSystem: 'Assessment Engine',
      subjectSlug: attempt.subjectSlug,
      subjectLabel: subjectLabel(attempt.subjectSlug),
      chapterId: chapter.id,
      href: chapterHref(attempt.subjectSlug, chapter.id, '/assessment'),
    }
  }

  // ── Priority 2: High-confidence prerequisite gap ──────────────────────────
  try {
    const { detectPrerequisiteGap, findPrerequisiteChapter } = await import('./prerequisiteRecovery')
    const { getNodesForChapter } = await import('@/lib/education')
    for (const slug of slugs) {
      const p = progressMap.get(slug)
      if (!p) continue
      const current = p.position.current
      const chapters = getSchoolChapters(board, slug, grade)
      const fullChapter = chapters.find((c) => c.id === current.id)
      if (!fullChapter) continue
      const kgNodes = getNodesForChapter(fullChapter)
      const gap = await detectPrerequisiteGap(userId, slug, current.id, kgNodes).catch(() => null)
      if (!gap || gap.confidence !== 'high') continue
      const prereqChapter = findPrerequisiteChapter(board, slug, grade, gap.missingPrereqId)
      if (!prereqChapter) continue
      return {
        type: 'prerequisite_gap',
        priority: 2,
        title: prereqChapter.chapterTitle,
        reason: `Foundation review: "${gap.missingPrereqTitle}" needed for ${chapterDisplayTitle(current.title)}`,
        sourceSystem: 'Prerequisite Recovery',
        subjectSlug: slug,
        subjectLabel: subjectLabel(slug),
        chapterId: prereqChapter.chapterId,
        href: chapterHref(slug, prereqChapter.chapterId),
      }
    }
  } catch { /* non-fatal */ }

  // ── Priority 3: Spaced revision due ──────────────────────────────────────
  try {
    const { getDueRevisionsBySubjects } = await import('./spacedRevision')
    const dueRevisions = await getDueRevisionsBySubjects(userId, slugs).catch(() => [])
    if (dueRevisions.length > 0) {
      const due = dueRevisions[0]
      const chapters = getSchoolChapters(board, due.subjectSlug, grade)
      const chapter = chapters.find((c) => c.kgNodeIds.includes(due.nodeId))
      if (chapter) {
        return {
          type: 'spaced_revision_due',
          priority: 3,
          title: chapterDisplayTitle(chapter.title),
          reason: `"${due.title}" is due for memory refresh`,
          sourceSystem: 'Spaced Revision',
          subjectSlug: due.subjectSlug,
          subjectLabel: subjectLabel(due.subjectSlug),
          chapterId: chapter.id,
          href: chapterHref(due.subjectSlug, chapter.id),
        }
      }
    }
  } catch { /* non-fatal */ }

  // ── Priority 4: Severe weak topic ─────────────────────────────────────────
  try {
    const { getRecommendedRevisionChapter } = await import('./weakTopics')
    const revision = await getRecommendedRevisionChapter(userId, board, grade).catch(() => null)
    if (revision) {
      const topWeak = revision.weakTopicTitles[0]
      return {
        type: 'weak_topic',
        priority: 4,
        title: revision.chapterTitle,
        reason: topWeak ? `Weak area: "${topWeak}"` : 'Recommended revision based on recent mistakes',
        sourceSystem: 'Weak Topic Recovery',
        subjectSlug: revision.subjectSlug,
        subjectLabel: revision.subjectLabel,
        chapterId: revision.chapterId,
        href: chapterHref(revision.subjectSlug, revision.chapterId),
      }
    }
  } catch { /* non-fatal */ }

  // ── Priority 5: Exam readiness risk ───────────────────────────────────────
  try {
    const { getExamReadinessForAllSubjects } = await import('./examReadiness')
    const summary = await getExamReadinessForAllSubjects(userId, board, grade).catch(() => null)
    if (summary) {
      const atRisk = summary.subjects
        .filter((s) => s.level === 'needs_preparation' && s.confidence !== 'low')
        .sort((a, b) => a.readinessPercent - b.readinessPercent)[0]
      if (atRisk) {
        const p = progressMap.get(atRisk.subjectSlug)
        const chapter = p?.position.current
        if (chapter) {
          return {
            type: 'exam_readiness_risk',
            priority: 5,
            title: chapterDisplayTitle(chapter.title),
            reason: `${atRisk.subjectLabel} exam readiness is only ${atRisk.readinessPercent}% — focus needed`,
            sourceSystem: 'Exam Readiness',
            subjectSlug: atRisk.subjectSlug,
            subjectLabel: atRisk.subjectLabel,
            chapterId: chapter.id,
            href: chapterHref(atRisk.subjectSlug, chapter.id),
          }
        }
      }
    }
  } catch { /* non-fatal */ }

  // ── Priority 6: Recent mock test weakness ─────────────────────────────────
  try {
    const since14 = new Date(Date.now() - 14 * 86400000)
    const recentMock = await prisma.practiceSession.findFirst({
      where: { userId, subjectSlug: { in: slugs }, kind: 'mock', completedAt: { not: null }, createdAt: { gte: since14 } },
      orderBy: { completedAt: 'desc' },
      select: { subjectSlug: true, score: true },
    }).catch(() => null)
    if (recentMock && typeof recentMock.score === 'number' && recentMock.score < ASSESSMENT_PASS_THRESHOLD) {
      // Find the most severe weak node for this subject from mock mistakes
      const mockMistakes = await prisma.mistakeRecord.findMany({
        where: { userId, subjectSlug: recentMock.subjectSlug, category: 'mock_test', createdAt: { gte: since14 } },
        select: { topicSlug: true },
      }).catch(() => [] as { topicSlug: string }[])
      if (mockMistakes.length > 0) {
        const nodeId = mockMistakes[0].topicSlug
        const nodeTitle = NODE_TITLES.get(nodeId) ?? nodeId
        const chapters = getSchoolChapters(board, recentMock.subjectSlug, grade)
        const chapter = chapters.find((c) => c.kgNodeIds.includes(nodeId))
        if (chapter) {
          return {
            type: 'mock_test_weakness',
            priority: 6,
            title: chapterDisplayTitle(chapter.title),
            reason: `Mock test flagged weakness: "${nodeTitle}"`,
            sourceSystem: 'Mock Test',
            subjectSlug: recentMock.subjectSlug,
            subjectLabel: subjectLabel(recentMock.subjectSlug),
            chapterId: chapter.id,
            href: chapterHref(recentMock.subjectSlug, chapter.id),
          }
        }
      }
    }
  } catch { /* non-fatal */ }

  // ── Priority 7 & 8: Continue / start chapter ──────────────────────────────
  // Prefer most recently studied subject
  const sorted = slugs
    .map((slug) => ({ slug, p: progressMap.get(slug) }))
    .filter(({ p }) => p && p.completedCount < p.totalCount)
    .sort((a, b) => (b.p!.lastStudiedAt?.getTime() ?? 0) - (a.p!.lastStudiedAt?.getTime() ?? 0))

  for (const { slug, p } of sorted) {
    if (!p) continue
    const chapter = p.position.current
    const hasHistory = !!p.lastStudiedAt
    return {
      type: hasHistory ? 'continue_chapter' : 'start_next_chapter',
      priority: hasHistory ? 7 : 8,
      title: chapterDisplayTitle(chapter.title),
      reason: hasHistory ? 'Continue where you left off' : 'Start this chapter',
      sourceSystem: 'Progress Engine',
      subjectSlug: slug,
      subjectLabel: subjectLabel(slug),
      chapterId: chapter.id,
      href: chapterHref(slug, chapter.id),
    }
  }

  return null
}

/** Builds the PRIMARY LEARNING OBJECTIVE system prompt block for the tutor. */
export function buildPrimaryObjectiveBlock(rec: LearningRecommendation): string {
  return `\n\nPRIMARY LEARNING OBJECTIVE (source: ${rec.sourceSystem}):
Current priority: ${rec.title}
Reason: ${rec.reason}
Tutor instruction: Support this objective when relevant. If the student's questions relate to this topic, prioritise it. Do not force the topic if the student is working on something else.`
}

/** Heading label for each recommendation type — used in dashboard UI. */
export const RECOMMENDATION_LABELS: Record<RecommendationType, { heading: string; cta: string; color: string }> = {
  failed_assessment:   { heading: 'Retake Needed',       cta: 'Retake Assessment',     color: 'var(--coral)' },
  prerequisite_gap:    { heading: 'Foundation Gap',      cta: 'Review Foundation',     color: 'var(--purple)' },
  spaced_revision_due: { heading: 'Review Due',          cta: 'Quick Review',          color: 'var(--yellow)' },
  weak_topic:          { heading: 'Needs Revision',      cta: 'Review Weak Areas',     color: 'var(--yellow)' },
  exam_readiness_risk: { heading: 'Exam Prep Needed',    cta: 'Start Exam Prep',       color: 'var(--coral)' },
  mock_test_weakness:  { heading: 'Mock Weakness',       cta: 'Practice This Topic',   color: 'var(--yellow)' },
  continue_chapter:    { heading: 'Continue Learning',   cta: 'Continue',              color: 'var(--coral)' },
  start_next_chapter:  { heading: 'Start Learning',      cta: 'Start Chapter',         color: 'var(--coral)' },
}
