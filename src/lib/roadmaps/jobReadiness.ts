import { prisma } from '@/lib/db/prisma'
import { withRetry } from '@/lib/db/withRetry'
import { ProjectStatus } from '@prisma/client'

export interface JobReadinessResult {
  profileId: string
  score: number
  updatedAt: Date
}

const PROJECT_STATUS_SCORE: Record<ProjectStatus, number> = {
  NOT_STARTED: 0,
  IN_PROGRESS: 35,
  SUBMITTED: 70,
  COMPLETED: 100,
}

function average(values: number[]): number {
  return values.length > 0 ? Math.round(values.reduce((a, b) => a + b, 0) / values.length) : 0
}

function readinessLabel(score: number): string {
  if (score >= 80) return 'Job Ready'
  if (score >= 55) return 'Almost There'
  if (score >= 25) return 'Building Skills'
  return 'Just Started'
}

/**
 * Recomputes a learner's JobReadiness row from their career profile, subject
 * mastery, assessment history, capstone submissions, and roadmap progress.
 * Returns null (no-op) for learners who haven't started a career roadmap yet
 * — there's nothing to score.
 */
export async function refreshJobReadiness(userId: string): Promise<JobReadinessResult | null> {
  const careerProfile = await withRetry(() => prisma.careerProfile.findUnique({ where: { userId } }))
  if (!careerProfile) return null

  const [analytics, assessmentResults, capstoneSubmissions, enrollments] = await withRetry(() => Promise.all([
    prisma.subjectAnalytics.findMany({ where: { userId } }),
    prisma.assessmentResult.findMany({ where: { userId }, orderBy: { completedAt: 'desc' }, take: 20 }),
    prisma.capstoneSubmission.findMany({ where: { userId } }),
    prisma.roadmapEnrollment.findMany({ where: { userId } }),
  ]))

  const skillsScore = Math.min(100, careerProfile.skills.length * 10)
  const masteryScore = average(analytics.map((a) => a.progressPercent))
  const assessmentsScore = average(assessmentResults.map((a) => a.score))
  const projectsScore = average(capstoneSubmissions.map((c) => PROJECT_STATUS_SCORE[c.status]))
  const roadmapScore = average(enrollments.map((e) => e.progressPct))

  const score = average([skillsScore, masteryScore, assessmentsScore, projectsScore, roadmapScore])
  const label = readinessLabel(score)

  const result = await withRetry(() => prisma.jobReadiness.upsert({
    where: { userId },
    update: { score, label, skillsScore, projectsScore, assessmentsScore, masteryScore, roadmapScore, computedAt: new Date() },
    create: { userId, score, label, skillsScore, projectsScore, assessmentsScore, masteryScore, roadmapScore },
  }))

  return { profileId: userId, score: result.score, updatedAt: result.updatedAt }
}
