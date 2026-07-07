/**
 * Exam Readiness Engine (Sprint CE) — deterministic, no AI, no new tables.
 *
 * Readiness formula (0–100):
 *   masteryCoverage    (40%) — % of chapter KG nodes mastered or completed
 *   assessmentStrength (30%) — % of assessments passed (≥70%) weighted by recency
 *   revisionCoverage   (20%) — % of mastered nodes NOT overdue for review
 *   weakTopicRisk      (10%) — inverse of weak-topic penalty
 *
 * Levels:
 *   0–39   Needs Preparation
 *   40–69  Developing
 *   70–84  Exam Ready
 *   85–100 Strongly Prepared
 */

import { prisma } from '@/lib/db/prisma'
import { ASSESSMENT_PASS_THRESHOLD } from '@/lib/school/assessment/assessmentTypes'
import { getSchoolChapters, SCHOOL_SUBJECT_META, getGradeSubjects } from '@/lib/school/schoolRouting'
import { REVIEW_INTERVALS_DAYS } from './spacedRevision'

export interface ExamReadiness {
  subjectSlug: string
  subjectLabel: string
  readinessPercent: number
  level: 'needs_preparation' | 'developing' | 'exam_ready' | 'strongly_prepared'
  levelLabel: string
  masteryCoverage: number      // 0–100
  assessmentStrength: number   // 0–100
  revisionCoverage: number     // 0–100
  weakTopicRisk: number        // 0–100 (higher = more risk)
  strongTopicIds: string[]
  riskTopicIds: string[]
  confidence: 'low' | 'medium' | 'high'
}

export interface ExamReadinessSummary {
  subjects: ExamReadiness[]
  overallReadiness: number
  readiestSubject: string | null
  weakestSubject: string | null
}

function readinessLevel(pct: number): ExamReadiness['level'] {
  if (pct >= 85) return 'strongly_prepared'
  if (pct >= 70) return 'exam_ready'
  if (pct >= 40) return 'developing'
  return 'needs_preparation'
}

function readinessLevelLabel(level: ExamReadiness['level']): string {
  if (level === 'strongly_prepared') return 'Strongly Prepared'
  if (level === 'exam_ready') return 'Exam Ready'
  if (level === 'developing') return 'Developing'
  return 'Needs Preparation'
}

function computeNextReviewAt(lastMasteredAt: Date | null, revisionCount: number): Date | null {
  if (!lastMasteredAt) return null
  const stage = Math.min(revisionCount, REVIEW_INTERVALS_DAYS.length - 1)
  return new Date(lastMasteredAt.getTime() + REVIEW_INTERVALS_DAYS[stage] * 86400000)
}

export async function getExamReadinessForSubject(
  userId: string,
  board: string,
  grade: number,
  subjectSlug: string,
): Promise<ExamReadiness> {
  const meta = SCHOOL_SUBJECT_META[subjectSlug] ?? { label: subjectSlug }
  const chapters = getSchoolChapters(board, subjectSlug, grade)
  const allNodeIds = [...new Set(chapters.flatMap((c) => c.kgNodeIds))]

  const since60 = new Date(Date.now() - 60 * 86400000)
  const now = Date.now()

  const [topicRows, assessmentRows, mistakeRows] = await Promise.all([
    prisma.topicProgress.findMany({
      where: { userId, subjectSlug, topicSlug: { in: allNodeIds } },
      select: { topicSlug: true, status: true, masteryPct: true, completedAt: true, revisionCount: true, lastRevisionAt: true },
    }).catch(() => [] as { topicSlug: string; status: string; masteryPct: number; completedAt: Date | null; revisionCount: number; lastRevisionAt: Date | null }[]),
    // Include both chapter assessments and subject-level mocks (Sprint CF)
    prisma.practiceSession.findMany({
      where: { userId, subjectSlug, kind: { in: ['assessment', 'mock'] }, completedAt: { not: null }, createdAt: { gte: since60 } },
      select: { score: true, createdAt: true, kind: true },
    }).catch(() => [] as { score: number | null; createdAt: Date; kind: string }[]),
    prisma.mistakeRecord.findMany({
      where: { userId, subjectSlug, topicSlug: { in: allNodeIds }, createdAt: { gte: since60 } },
      select: { topicSlug: true, createdAt: true },
    }).catch(() => [] as { topicSlug: string; createdAt: Date }[]),
  ])

  const progressByNode = new Map(topicRows.map((r) => [r.topicSlug, r]))

  // ── masteryCoverage (40%) ──────────────────────────────────────────────────
  const masteredNodes = allNodeIds.filter((id) => {
    const r = progressByNode.get(id)
    return r && (r.status === 'MASTERED' || r.status === 'COMPLETED')
  })
  const masteryCoverage = allNodeIds.length > 0
    ? Math.round((masteredNodes.length / allNodeIds.length) * 100)
    : 0

  // ── assessmentStrength (30%) ───────────────────────────────────────────────
  let assessmentStrength = 50 // neutral default when no assessments
  if (assessmentRows.length > 0) {
    // Recency weight: more recent attempts count more
    let weightedPass = 0
    let totalWeight = 0
    for (const row of assessmentRows) {
      const ageDays = (now - row.createdAt.getTime()) / 86400000
      // Mock tests count 1.5× (multi-chapter, more exam-representative — Sprint CF)
      const kindMultiplier = (row as { kind?: string }).kind === 'mock' ? 1.5 : 1
      const w = (ageDays <= 7 ? 2 : ageDays <= 30 ? 1.5 : 1) * kindMultiplier
      totalWeight += w
      if (typeof row.score === 'number' && row.score >= ASSESSMENT_PASS_THRESHOLD) weightedPass += w
    }
    assessmentStrength = totalWeight > 0 ? Math.round((weightedPass / totalWeight) * 100) : 50
  }

  // ── revisionCoverage (20%) ────────────────────────────────────────────────
  // % of mastered nodes not overdue
  let revisionCoverage = 100
  if (masteredNodes.length > 0) {
    const overdueCount = masteredNodes.filter((id) => {
      const r = progressByNode.get(id)
      if (!r) return false
      const nextAt = computeNextReviewAt(r.completedAt ?? r.lastRevisionAt, r.revisionCount)
      return nextAt !== null && nextAt.getTime() <= now
    }).length
    revisionCoverage = Math.round(((masteredNodes.length - overdueCount) / masteredNodes.length) * 100)
  }

  // ── weakTopicRisk (10%) ───────────────────────────────────────────────────
  const mistakeCount = new Map<string, number>()
  for (const m of mistakeRows) {
    mistakeCount.set(m.topicSlug, (mistakeCount.get(m.topicSlug) ?? 0) + 1)
  }
  const weakNodeIds = allNodeIds.filter((id) => {
    const mistakes = mistakeCount.get(id) ?? 0
    const r = progressByNode.get(id)
    const mastered = r && (r.status === 'MASTERED' || r.status === 'COMPLETED')
    return mistakes >= 2 && !mastered
  })
  // Risk: 0 = no risk (good), 100 = very high risk (bad)
  const weakTopicRisk = allNodeIds.length > 0
    ? Math.round((weakNodeIds.length / Math.max(allNodeIds.length, 1)) * 100)
    : 0

  // ── readinessPercent ──────────────────────────────────────────────────────
  const readinessPercent = Math.round(
    masteryCoverage * 0.40 +
    assessmentStrength * 0.30 +
    revisionCoverage * 0.20 +
    (100 - weakTopicRisk) * 0.10
  )

  // ── strong / risk topic ids ───────────────────────────────────────────────
  const strongTopicIds = masteredNodes
    .filter((id) => (progressByNode.get(id)?.masteryPct ?? 0) >= 80)
    .slice(0, 5)

  const riskTopicIds = [
    ...weakNodeIds,
    ...allNodeIds.filter((id) => {
      const r = progressByNode.get(id)
      return r && r.status === 'IN_PROGRESS' && r.masteryPct < 50
    }),
  ].filter((id, i, arr) => arr.indexOf(id) === i).slice(0, 5)

  // ── confidence ───────────────────────────────────────────────────────────
  // More data = higher confidence
  const dataPoints = topicRows.length + assessmentRows.length
  const confidence: ExamReadiness['confidence'] =
    dataPoints >= 10 ? 'high' : dataPoints >= 3 ? 'medium' : 'low'

  const level = readinessLevel(readinessPercent)

  return {
    subjectSlug,
    subjectLabel: meta.label,
    readinessPercent,
    level,
    levelLabel: readinessLevelLabel(level),
    masteryCoverage,
    assessmentStrength,
    revisionCoverage,
    weakTopicRisk,
    strongTopicIds,
    riskTopicIds,
    confidence,
  }
}

export async function getExamReadinessForAllSubjects(
  userId: string,
  board: string,
  grade: number,
): Promise<ExamReadinessSummary> {
  const slugs = getGradeSubjects(board, grade)
  if (slugs.length === 0) {
    return { subjects: [], overallReadiness: 0, readiestSubject: null, weakestSubject: null }
  }

  const subjects = await Promise.all(
    slugs.map((s) => getExamReadinessForSubject(userId, board, grade, s).catch(() => ({
      subjectSlug: s,
      subjectLabel: SCHOOL_SUBJECT_META[s]?.label ?? s,
      readinessPercent: 0,
      level: 'needs_preparation' as const,
      levelLabel: 'Needs Preparation',
      masteryCoverage: 0,
      assessmentStrength: 50,
      revisionCoverage: 100,
      weakTopicRisk: 0,
      strongTopicIds: [],
      riskTopicIds: [],
      confidence: 'low' as const,
    })))
  )

  const overallReadiness = subjects.length > 0
    ? Math.round(subjects.reduce((s, r) => s + r.readinessPercent, 0) / subjects.length)
    : 0

  const sorted = [...subjects].sort((a, b) => b.readinessPercent - a.readinessPercent)
  return {
    subjects,
    overallReadiness,
    readiestSubject: sorted[0]?.subjectSlug ?? null,
    weakestSubject: sorted[sorted.length - 1]?.subjectSlug ?? null,
  }
}

/**
 * Builds the EXAM READINESS system prompt block for the tutor.
 * Only included when the subject has medium/high confidence.
 */
export function buildExamReadinessBlock(
  readiness: ExamReadiness,
  nodeIdToTitle: (id: string) => string,
): string {
  if (readiness.confidence === 'low') return ''

  const strongTitles = readiness.strongTopicIds.map(nodeIdToTitle).filter(Boolean)
  const riskTitles = readiness.riskTopicIds.map(nodeIdToTitle).filter(Boolean)

  const lines = [
    `\n\nEXAM READINESS — ${readiness.subjectLabel}: ${readiness.readinessPercent}% (${readiness.levelLabel})`,
  ]
  if (strongTitles.length > 0) {
    lines.push(`Strong areas: ${strongTitles.join(', ')}`)
  }
  if (riskTitles.length > 0) {
    lines.push(`Risk areas: ${riskTitles.join(', ')}`)
  }
  lines.push(
    readiness.level === 'strongly_prepared' || readiness.level === 'exam_ready'
      ? 'Tutor: student is exam-ready; focus on consolidation and challenge questions. Avoid re-teaching already-mastered topics.'
      : 'Tutor: student needs exam preparation. Prioritize explaining risk areas with worked examples. Reinforce weak concepts before moving forward.',
  )
  return lines.join('\n')
}

/**
 * Lightweight summary for the learning profile.
 */
export function buildExamReadinessSummaryText(summary: ExamReadinessSummary): string {
  if (summary.subjects.length === 0) return ''
  const lines = summary.subjects.map(
    (s) => `${s.subjectLabel}: ${s.readinessPercent}% (${s.levelLabel})`
  )
  return lines.join(', ')
}
