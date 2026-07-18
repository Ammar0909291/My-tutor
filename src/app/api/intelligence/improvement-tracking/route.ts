/**
 * Improvement Tracking API — Educational Intelligence Sprint 4, Task 4.
 *
 * GET only: returns the authenticated user's `RevisionProfile`,
 * `PracticeTargetPlan`, and `RetestCandidatePlan` (Sprints 1–3, reused
 * unmodified) plus the new `ImprovementSummary` (Sprint 4, Tasks 2/3).
 * Read-only. The only new Prisma reads are `PracticeSession` (never
 * read by any prior Educational Intelligence sprint) and a second,
 * parallel `EvidenceRecord(VISUAL)` read (the table is already read by
 * `getVisualLearningProfile()`; this route reads the same rows again
 * to recover per-row timestamps that the aggregate profile discards).
 * Used only by the dev-only Improvement Intelligence Viewer (Task 4);
 * no production UI calls it this sprint.
 */
import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db/prisma'
import { getRevisionProfile } from '@/lib/intelligence/revisionProfile'
import { generatePracticeTargets } from '@/lib/intelligence/practiceTargets'
import { generateRetestCandidates } from '@/lib/intelligence/retestCandidates'
import {
  analyzeImprovement,
  type TopicScoreHistoryRow,
  type VisualEvidenceHistoryRow,
} from '@/lib/intelligence/improvementTracking'
export async function GET() {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const userId = session.user.id

  const profile = await getRevisionProfile(userId)

  const attemptsRows = await prisma.topicProgress.findMany({
    where: { userId },
    select: { subjectSlug: true, topicSlug: true, attempts: true },
  })
  const targets = generatePracticeTargets(profile, attemptsRows)
  const retestCandidates = generateRetestCandidates(targets)

  const sessionRows = await prisma.practiceSession.findMany({
    where: { userId, completedAt: { not: null }, score: { not: null }, chapterId: null },
    select: { subjectSlug: true, topicSlug: true, score: true, completedAt: true },
  })

  const validTopicKeys = new Set(attemptsRows.map((r) => `${r.subjectSlug}:${r.topicSlug}`))
  const historyRows: TopicScoreHistoryRow[] = []
  for (const row of sessionRows) {
    if (validTopicKeys.has(`${row.subjectSlug}:${row.topicSlug}`)) {
      historyRows.push({
        subjectSlug: row.subjectSlug,
        topicSlug: row.topicSlug,
        score: row.score as number,
        completedAt: row.completedAt as Date,
      })
    }
  }

  const evidenceRows = await prisma.evidenceRecord.findMany({
    where: { userId, type: 'VISUAL' },
    select: { notes: true, createdAt: true },
  })
  const visualHistoryRows: VisualEvidenceHistoryRow[] = []
  for (const row of evidenceRows) {
    const notes = row.notes as { visualType?: string; shown?: number; completed?: number } | null
    if (!notes?.visualType) continue
    visualHistoryRows.push({
      visualType: notes.visualType,
      shown: notes.shown ?? 0,
      completed: notes.completed ?? 0,
      createdAt: row.createdAt,
    })
  }

  const improvement = analyzeImprovement(profile, historyRows, visualHistoryRows, targets, retestCandidates)

  return NextResponse.json({ profile, targets, retestCandidates, improvement })
}
