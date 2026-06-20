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
import { getSchoolChapters } from '@/lib/school/schoolRouting'

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

  // For school chapter sessions (chapterId set), PracticeSession.topicSlug
  // is the chapter ID, not a KG-node topicSlug (see
  // docs/EDUCATIONAL_INTELLIGENCE_IMPROVEMENT_AUDIT.md) — expand each into
  // one history point per KG node it covers, via the same
  // chapter.kgNodeIds lookup the existing submit routes already use. For
  // legacy topic-level sessions (chapterId null), topicSlug is already a
  // KG-node ID — confirmed by checking it against the user's own
  // TopicProgress rows, so subject-level rows (e.g. mock tests, whose
  // topicSlug is the subjectSlug itself) are correctly excluded.
  const userProfile = await prisma.profile.findUnique({
    where: { userId },
    select: { educationBoard: true, grade: true },
  })

  const sessionRows = await prisma.practiceSession.findMany({
    where: { userId, completedAt: { not: null }, score: { not: null } },
    select: { subjectSlug: true, topicSlug: true, chapterId: true, score: true, completedAt: true },
  })

  const validTopicKeys = new Set(attemptsRows.map((r) => `${r.subjectSlug}:${r.topicSlug}`))
  const chaptersBySubject = new Map<string, ReturnType<typeof getSchoolChapters>>()

  const historyRows: TopicScoreHistoryRow[] = []
  for (const row of sessionRows) {
    if (row.chapterId === null) {
      if (validTopicKeys.has(`${row.subjectSlug}:${row.topicSlug}`)) {
        historyRows.push({
          subjectSlug: row.subjectSlug,
          topicSlug: row.topicSlug,
          score: row.score as number,
          completedAt: row.completedAt as Date,
        })
      }
      continue
    }
    if (!userProfile?.educationBoard || !userProfile?.grade) continue
    let chapters = chaptersBySubject.get(row.subjectSlug)
    if (!chapters) {
      chapters = getSchoolChapters(userProfile.educationBoard, row.subjectSlug, userProfile.grade)
      chaptersBySubject.set(row.subjectSlug, chapters)
    }
    const chapter = chapters.find((c) => c.id === row.topicSlug)
    if (!chapter) continue
    for (const kgNodeId of chapter.kgNodeIds) {
      historyRows.push({
        subjectSlug: row.subjectSlug,
        topicSlug: kgNodeId,
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
