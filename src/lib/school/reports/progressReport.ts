import { prisma } from '@/lib/db/prisma'
import { generateAIResponse } from '@/lib/ai/client'
import { ALL_KG_NODES } from '@/lib/education'
import { SCHOOL_SUBJECT_META, getSchoolChapters, chapterDisplayTitle, getGradeSubjects } from '@/lib/school/schoolRouting'
import { ASSESSMENT_PASS_THRESHOLD } from '@/lib/school/assessment/assessmentTypes'
import { type ProgressReport, type ReportWindow, REPORT_WINDOW_META } from './progressReportTypes'

export type { ProgressReport, ReportWindow, ReportRecommendation } from './progressReportTypes'
export { REPORT_WINDOW_META } from './progressReportTypes'

/**
 * AI Progress Reports (Sprint CJ) — concise, human-readable weekly/monthly
 * learning reports built entirely from existing platform data.
 *
 * All metrics are deterministic (TopicProgress, PracticeSession, StudyStreak,
 * achievements, exam readiness, weak topics, orchestrator). AI is used ONLY to
 * phrase the summary paragraph — when it's unavailable the report falls back to
 * a deterministic summary string. No new tables, no exports, no notifications.
 */

const NODE_TITLES = new Map(ALL_KG_NODES.map((n) => [n.id, n.title]))

function nodeTitle(id: string): string {
  return NODE_TITLES.get(id) ?? id
}

export async function generateProgressReport(
  userId: string,
  board: string,
  grade: number,
  window: ReportWindow,
): Promise<ProgressReport> {
  const meta = REPORT_WINDOW_META[window]
  const since = new Date(Date.now() - meta.days * 86400000)
  const slugs = getGradeSubjects(board, grade)

  // ── Gather all data in parallel (all non-fatal) ──────────────────────────
  const [
    completedTopics,
    assessments,
    practices,
    mocks,
    streak,
    recentAchievement,
    examReadiness,
    recommendation,
    overallRoadmap,
  ] = await Promise.all([
    prisma.topicProgress.findMany({
      where: {
        userId,
        subjectSlug: { in: slugs },
        status: { in: ['MASTERED', 'COMPLETED'] },
        completedAt: { gte: since },
      },
      select: { topicSlug: true, subjectSlug: true, masteryPct: true, completedAt: true },
      orderBy: { completedAt: 'desc' },
    }).catch(() => [] as { topicSlug: string; subjectSlug: string; masteryPct: number; completedAt: Date | null }[]),
    prisma.practiceSession.findMany({
      where: { userId, subjectSlug: { in: slugs }, kind: 'assessment', completedAt: { gte: since } },
      select: { score: true },
    }).catch(() => [] as { score: number | null }[]),
    prisma.practiceSession.findMany({
      where: { userId, subjectSlug: { in: slugs }, kind: 'practice', completedAt: { gte: since } },
      select: { id: true },
    }).catch(() => [] as { id: string }[]),
    prisma.practiceSession.findMany({
      where: { userId, subjectSlug: { in: slugs }, kind: 'mock', completedAt: { gte: since } },
      select: { id: true },
    }).catch(() => [] as { id: string }[]),
    import('@/lib/school/achievements/streakEngine').then((m) => m.getStudyStreak(userId)).catch(() => null),
    import('@/lib/school/achievements/achievementEngine').then((m) => m.getRecentAchievement(userId)).catch(() => null),
    import('@/lib/school/adaptive/examReadiness').then((m) => m.getExamReadinessForAllSubjects(userId, board, grade)).catch(() => null),
    import('@/lib/school/adaptive/learningOrchestrator').then((m) => m.getTopRecommendation(userId, board, grade)).catch(() => null),
    import('@/lib/school/roadmap/learningRoadmap').then((m) => m.getOverallRoadmap(userId, board, grade)).catch(() => null),
  ])

  // ── Section 1: Learning Summary — chapters completed in window ────────────
  // Map completed KG nodes to the chapters that contain them (dedup by chapter).
  const completedItems: string[] = []
  const seenChapters = new Set<string>()
  for (const slug of slugs) {
    const chapters = getSchoolChapters(board, slug, grade)
    const subjectNodes = completedTopics.filter((t) => t.subjectSlug === slug).map((t) => t.topicSlug)
    if (subjectNodes.length === 0) continue
    for (const ch of chapters) {
      if (seenChapters.has(ch.id)) continue
      // chapter counts as "touched this week" if any of its nodes were completed
      if (ch.kgNodeIds.some((n) => subjectNodes.includes(n))) {
        seenChapters.add(ch.id)
        completedItems.push(chapterDisplayTitle(ch.title))
      }
    }
  }

  // ── Section 2: Strengths — high-mastery completed topics + readiness strong ─
  const strengthSet = new Set<string>()
  for (const t of completedTopics) {
    if (t.masteryPct >= 80) strengthSet.add(nodeTitle(t.topicSlug))
  }
  if (examReadiness) {
    for (const subj of examReadiness.subjects) {
      for (const id of subj.strongTopicIds) strengthSet.add(nodeTitle(id))
    }
  }
  const strengths = [...strengthSet].slice(0, 6)

  // ── Section 3: Areas to Improve — weak topics ─────────────────────────────
  const weakSet = new Set<string>()
  try {
    const { getWeakTopics } = await import('@/lib/school/adaptive/weakTopics')
    const weak = await getWeakTopics(userId).catch(() => [])
    for (const w of weak.slice(0, 6)) weakSet.add(w.title)
  } catch { /* non-fatal */ }
  // Also fold in exam readiness risk topics
  if (examReadiness && weakSet.size < 6) {
    for (const subj of examReadiness.subjects) {
      for (const id of subj.riskTopicIds) {
        if (weakSet.size >= 6) break
        weakSet.add(nodeTitle(id))
      }
    }
  }
  const areasToImprove = [...weakSet].slice(0, 6)

  // ── Section 4: Study Habits ───────────────────────────────────────────────
  const assessmentsCompleted = assessments.length
  const passedAssessments = assessments.filter((a) => typeof a.score === 'number' && a.score >= ASSESSMENT_PASS_THRESHOLD).length
  const studyHabits = {
    currentStreak: streak?.currentStreak ?? 0,
    longestStreak: streak?.longestStreak ?? 0,
    activeDays: streak?.totalActiveDays ?? 0,
    assessmentsCompleted,
    practiceCompleted: practices.length,
    mocksCompleted: mocks.length,
    recentAchievement: recentAchievement ? { title: recentAchievement.title, icon: recentAchievement.icon } : null,
  }

  // ── Section 5: Recommendation ─────────────────────────────────────────────
  const reportRecommendation = recommendation
    ? {
        title: recommendation.title,
        reason: recommendation.reason,
        sourceSystem: recommendation.sourceSystem,
        href: recommendation.href,
      }
    : null

  // ── Summary text (AI-phrased, deterministic fallback) ─────────────────────
  const deterministicSummary = buildDeterministicSummary(
    meta.label, completedItems, strengths, areasToImprove, studyHabits.currentStreak, passedAssessments,
  )
  let summaryText = deterministicSummary
  try {
    const aiText = await generateAIResponse(
      [{
        role: 'user',
        content: `Write a warm, encouraging 2-3 sentence progress summary for a Class ${grade} student for the ${meta.label.toLowerCase()}. Use ONLY these facts, do not invent anything:
- Chapters worked on: ${completedItems.join(', ') || 'none yet'}
- Strengths: ${strengths.join(', ') || 'building up'}
- To improve: ${areasToImprove.join(', ') || 'none flagged'}
- Current streak: ${studyHabits.currentStreak} days
- Assessments passed: ${passedAssessments}
Keep it under 60 words, second person ("you"), no headings, no bullet points, no markdown.`,
      }],
      'You are a supportive school tutor writing a brief progress note. Be concise, specific, and encouraging. Never invent facts not provided.',
      150,
    )
    const trimmed = (aiText ?? '').trim()
    if (trimmed.length >= 20 && trimmed.length <= 600) summaryText = trimmed
  } catch { /* keep deterministic fallback */ }

  return {
    window,
    windowLabel: meta.label,
    generatedAt: new Date().toISOString(),
    summaryText,
    completedItems,
    strengths,
    areasToImprove,
    studyHabits,
    recommendation: reportRecommendation,
    roadmapStatus: overallRoadmap
      ? overallRoadmap.subjects.map((r) => ({ subjectLabel: r.subjectLabel, completedCount: r.completedCount, totalCount: r.totalCount }))
      : [],
  }
}

export function buildDeterministicSummary(
  windowLabel: string,
  completed: string[],
  strengths: string[],
  areas: string[],
  streak: number,
  passedAssessments: number,
): string {
  const parts: string[] = []
  if (completed.length > 0) {
    parts.push(`Over the ${windowLabel.toLowerCase()}, you made progress on ${completed.length} chapter${completed.length === 1 ? '' : 's'}.`)
  } else {
    parts.push(`This is a fresh start for the ${windowLabel.toLowerCase()} — let's build some momentum.`)
  }
  if (strengths.length > 0) parts.push(`You're showing real strength in ${strengths.slice(0, 2).join(' and ')}.`)
  if (streak > 0) parts.push(`Keep that ${streak}-day streak going!`)
  else if (areas.length > 0) parts.push(`A little focus on ${areas[0]} will go a long way.`)
  if (passedAssessments > 0) parts.push(`You passed ${passedAssessments} assessment${passedAssessments === 1 ? '' : 's'} — great work.`)
  return parts.join(' ')
}
