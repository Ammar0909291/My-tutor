import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db/prisma'
import { withRetry } from '@/lib/db/withRetry'
import { isAdminEmail } from '@/lib/auth/admin'

/**
 * Sprint G, Part 8 — Analytics Center (executive dashboard).
 * GET /api/analytics/center — admin-only (ADMIN_EMAILS, same gate as
 * /admin/ai-usage). Aggregates EXISTING tables into platform-wide metrics:
 * active learners, completion rates, retention, average mastery, popular
 * subjects, roadmap completion. Read-only — no PII beyond what admins already
 * see in the AI usage dashboard (counts and aggregates only).
 */
const DAY_MS = 86_400_000

export async function GET() {
  const session = await auth()
  if (!session?.user?.email || !isAdminEmail(session.user.email)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  try {
    const now = new Date()
    const since7d = new Date(now.getTime() - 7 * DAY_MS)
    const since30d = new Date(now.getTime() - 30 * DAY_MS)

    const [
      totalLearners,
      active7d,
      active30d,
      subjectAnalytics,
      completedRoadmaps,
      activeRoadmaps,
      knowledgeRetention,
      enrollmentsByCount,
    ] = await Promise.all([
      withRetry(() => prisma.profile.count()),
      withRetry(() => prisma.studySession.findMany({ where: { date: { gte: since7d } }, select: { userId: true }, distinct: ['userId'], take: 5000 })),
      withRetry(() => prisma.studySession.findMany({ where: { date: { gte: since30d } }, select: { userId: true }, distinct: ['userId'], take: 5000 })),
      withRetry(() => prisma.subjectAnalytics.findMany({ select: { progressPercent: true, subject: { select: { name: true, slug: true } } }, take: 2000 })),
      withRetry(() => prisma.roadmapEnrollment.count({ where: { status: 'COMPLETED' } })),
      withRetry(() => prisma.roadmapEnrollment.count({ where: { status: 'ACTIVE' } })),
      withRetry(() => prisma.knowledgeRetention.findMany({ where: { subjectId: { not: null } }, select: { retentionScore: true }, take: 2000 })),
      withRetry(() => prisma.profileSubject.groupBy({ by: ['subjectId'], _count: { _all: true }, orderBy: { _count: { subjectId: 'desc' } }, take: 6 })),
    ])

    const subjectIds = enrollmentsByCount.map((e) => e.subjectId)
    const subjects = subjectIds.length
      ? await withRetry(() => prisma.subject.findMany({ where: { id: { in: subjectIds } }, select: { id: true, name: true, slug: true } }))
      : []
    const subjectById = new Map(subjects.map((s) => [s.id, s]))

    const avgMastery = subjectAnalytics.length
      ? Math.round(subjectAnalytics.reduce((sum, s) => sum + s.progressPercent, 0) / subjectAnalytics.length)
      : 0
    const avgRetention = knowledgeRetention.length
      ? Math.round(knowledgeRetention.reduce((sum, k) => sum + k.retentionScore, 0) / knowledgeRetention.length)
      : 0
    const totalRoadmapEnrollments = completedRoadmaps + activeRoadmaps
    const roadmapCompletionRate = totalRoadmapEnrollments > 0 ? Math.round((completedRoadmaps / totalRoadmapEnrollments) * 100) : 0

    const masteredCount = subjectAnalytics.filter((s) => s.progressPercent >= 70).length
    const completionRate = subjectAnalytics.length > 0 ? Math.round((masteredCount / subjectAnalytics.length) * 100) : 0

    return NextResponse.json({
      activeLearners: { last7Days: active7d.length, last30Days: active30d.length, totalLearners },
      completion: { rate: completionRate, mastered: masteredCount, totalSubjectEnrollments: subjectAnalytics.length },
      retention: { averageScore: avgRetention, sampledTopics: knowledgeRetention.length },
      mastery: { averageProgressPercent: avgMastery },
      popularSubjects: enrollmentsByCount.map((e) => ({
        name: subjectById.get(e.subjectId)?.name ?? 'Unknown',
        slug: subjectById.get(e.subjectId)?.slug ?? '',
        learners: e._count._all,
      })),
      roadmaps: { active: activeRoadmaps, completed: completedRoadmaps, completionRate: roadmapCompletionRate },
    })
  } catch (err) {
    console.error('[GET /api/analytics/center]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
