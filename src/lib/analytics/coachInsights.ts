import { prisma } from '@/lib/db/prisma'
import { withRetry } from '@/lib/db/withRetry'
import { getDueReviews, daysSince } from '@/lib/mastery/spacedRepetition'
import { MASTERY_THRESHOLD_FOR_PROGRESSION } from '@/lib/mastery/levels'

function humanizeSlug(slug: string): string {
  return slug.replace(/[_-]+/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
}

/**
 * Derive fresh Smart Coach insight messages from current analytics state and
 * persist them as CoachInsight rows (capped, recent-first). Pure heuristic —
 * no AI call needed; cheap enough to run on each /api/analytics/insights GET.
 */
export async function generateCoachInsights(userId: string): Promise<void> {
  const [analytics, subjectAnalytics, profile, dueReviews, retentionMetrics] = await Promise.all([
    withRetry(() => prisma.learningAnalytics.findUnique({ where: { userId } })),
    withRetry(() => prisma.subjectAnalytics.findMany({ where: { userId }, include: { subject: true } })),
    withRetry(() => prisma.profile.findUnique({ where: { userId }, include: { subjects: { include: { subject: true } } } })),
    getDueReviews(userId).catch(() => ({ overdue: [], today: [], upcoming: [], all: [] })),
    withRetry(() => prisma.retentionMetric.findMany({ where: { userId }, include: { subject: true } })),
  ])

  const insights: { kind: 'PROGRESS' | 'STREAK_RISK' | 'REVIEW_NEEDED' | 'PACE_ESTIMATE' | 'FOCUS_RECOMMENDATION' | 'GENERAL'; message: string; severity: 'INFO' | 'POSITIVE' | 'WARNING'; subjectId?: string | null }[] = []

  // Streak risk
  if (analytics?.lastStudyDate) {
    const daysSince = Math.floor((Date.now() - new Date(analytics.lastStudyDate).getTime()) / 86400000)
    if (daysSince >= 3) {
      insights.push({ kind: 'STREAK_RISK', severity: 'WARNING', message: `You haven't studied in ${daysSince} days — jump back in to keep your momentum going.` })
    } else if ((analytics.currentStreakDays ?? 0) >= 3) {
      insights.push({ kind: 'PROGRESS', severity: 'POSITIVE', message: `You're on a ${analytics.currentStreakDays}-day streak — keep it up!` })
    }
  }

  // Per-subject: stale subjects + struggling subjects
  for (const sa of subjectAnalytics) {
    if (sa.lastStudiedAt) {
      const daysSince = Math.floor((Date.now() - new Date(sa.lastStudiedAt).getTime()) / 86400000)
      if (daysSince >= 7) {
        insights.push({ kind: 'STREAK_RISK', severity: 'WARNING', subjectId: sa.subjectId, message: `You haven't studied ${sa.subject.name} in ${daysSince} days — a quick review session would help retention.` })
      }
    }
    if (sa.trend === 'IMPROVING') {
      insights.push({ kind: 'PROGRESS', severity: 'POSITIVE', subjectId: sa.subjectId, message: `You're progressing faster than average in ${sa.subject.name} — great momentum!` })
    }
    if (sa.weakTopics.length > 0) {
      insights.push({ kind: 'REVIEW_NEEDED', severity: 'WARNING', subjectId: sa.subjectId, message: `${sa.weakTopics.slice(0, 2).join(' and ')} in ${sa.subject.name} could use review before moving on.` })
    }
  }

  // Multi-subject comparison / focus recommendation
  if (subjectAnalytics.length >= 2) {
    const ranked = [...subjectAnalytics].sort((a, b) => a.progressPercent - b.progressPercent)
    const weakest = ranked[0]
    const strongest = ranked[ranked.length - 1]
    if (strongest.progressPercent - weakest.progressPercent >= 20) {
      insights.push({
        kind: 'FOCUS_RECOMMENDATION',
        severity: 'INFO',
        subjectId: weakest.subjectId,
        message: `${strongest.subject.name} (${strongest.progressPercent}%) is ahead of ${weakest.subject.name} (${weakest.progressPercent}%) — consider giving ${weakest.subject.name} more attention this week.`,
      })
    }
  }

  // Pace estimate from primary enrolled subject
  if (profile?.subjects?.length) {
    const primary = profile.subjects[0]
    const remaining = 100 - primary.progressPercent
    if (remaining > 0 && analytics && analytics.totalStudyMinutes > 0) {
      const weeksOfData = Math.max(1, Math.floor((Date.now() - new Date(analytics.createdAt).getTime()) / (7 * 86400000)))
      const pctPerWeek = primary.progressPercent / weeksOfData
      if (pctPerWeek > 0) {
        const weeksLeft = Math.max(1, Math.ceil(remaining / pctPerWeek))
        insights.push({
          kind: 'PACE_ESTIMATE',
          severity: 'INFO',
          subjectId: primary.subjectId,
          message: `At your current pace, you'll complete ${primary.subject.name} in about ${weeksLeft} week${weeksLeft === 1 ? '' : 's'}.`,
        })
      }
    }
  }

  // Spaced repetition (Sprint C): surface the most overdue reviews —
  // "You haven't reviewed Algebra in 8 days."
  for (const schedule of dueReviews.overdue.slice(0, 3)) {
    const days = daysSince(schedule.lastReviewedAt) ?? daysSince(schedule.createdAt) ?? 0
    if (days <= 0) continue
    insights.push({
      kind: 'REVIEW_NEEDED',
      severity: 'WARNING',
      subjectId: schedule.subjectId,
      message: `You haven't reviewed ${schedule.topic} in ${days} day${days === 1 ? '' : 's'}.`,
    })
  }

  // Mastery model (Sprint C): flag concepts that have decayed below the
  // "Competent" threshold — "Functions mastery has dropped below 70%."
  const decaying = retentionMetrics
    .filter((m) => m.masteryScore < MASTERY_THRESHOLD_FOR_PROGRESSION && m.reviewCount >= 2)
    .sort((a, b) => a.masteryScore - b.masteryScore)
    .slice(0, 2)
  for (const m of decaying) {
    insights.push({
      kind: 'REVIEW_NEEDED',
      severity: 'WARNING',
      subjectId: m.subjectId,
      message: `${m.topic} mastery has dropped below ${MASTERY_THRESHOLD_FOR_PROGRESSION}%.`,
    })
  }

  // ── Sprint R: Behavioral / learning-style insights from real data ────────
  // These analyze actual behavior patterns (attempts, revision counts, mistake
  // trends, mastery trajectories) to surface personalized narrative insights
  // like "You learn faster through examples" or "You struggle with recursion".
  try {
    const [allTopicProgress, recentMistakes, learningProfile] = await Promise.all([
      withRetry(() => prisma.topicProgress.findMany({
        where: { userId },
        orderBy: { updatedAt: 'desc' },
        take: 100,
      })),
      withRetry(() => prisma.mistakeRecord.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        take: 100,
      })),
      withRetry(() => prisma.learningProfile.findUnique({ where: { userId } })),
    ])

    // Repetition pattern: high avg revisionCount → learner benefits from repetition
    const completedTopics = allTopicProgress.filter((t) => t.status === 'COMPLETED' || t.status === 'MASTERED')
    if (completedTopics.length >= 3) {
      const avgRevisions = completedTopics.reduce((s, t) => s + t.revisionCount, 0) / completedTopics.length
      const avgAttempts = completedTopics.reduce((s, t) => s + t.attempts, 0) / completedTopics.length

      if (avgRevisions >= 2) {
        insights.push({
          kind: 'GENERAL', severity: 'INFO',
          message: 'You retain concepts better through repetition — reviewing topics multiple times is working for you.',
        })
      } else if (avgAttempts <= 1.5 && completedTopics.length >= 5) {
        insights.push({
          kind: 'GENERAL', severity: 'POSITIVE',
          message: 'You tend to master topics quickly — you learn efficiently through focused practice sessions.',
        })
      }

      // High-mastery vs low-mastery topic split → what they excel at
      const masteredTopics = completedTopics.filter((t) => t.masteryPct >= 85)
      const strugglingTopics = completedTopics.filter((t) => t.masteryPct > 0 && t.masteryPct < 55)

      if (masteredTopics.length >= 2) {
        const sample = masteredTopics.slice(0, 2).map((t) => humanizeSlug(t.topicSlug)).join(' and ')
        insights.push({
          kind: 'PROGRESS', severity: 'POSITIVE',
          message: `You consistently excel in ${sample} — your mastery here is above 85%.`,
        })
      }

      if (strugglingTopics.length >= 2) {
        const sample = strugglingTopics.slice(0, 2).map((t) => humanizeSlug(t.topicSlug)).join(' and ')
        insights.push({
          kind: 'REVIEW_NEEDED', severity: 'WARNING',
          message: `You struggle with ${sample} — these topics need more reinforcement before you move on.`,
        })
      }
    }

    // Mistake pattern: repeated category → concept-specific struggle
    if (recentMistakes.length >= 5) {
      const catFreq = new Map<string, number>()
      for (const m of recentMistakes) {
        catFreq.set(m.category, (catFreq.get(m.category) ?? 0) + 1)
      }
      const topCategory = [...catFreq.entries()].sort((a, b) => b[1] - a[1])[0]
      if (topCategory && topCategory[1] >= 3) {
        const categoryLabel = humanizeSlug(topCategory[0])
        insights.push({
          kind: 'FOCUS_RECOMMENDATION', severity: 'WARNING',
          message: `You make ${topCategory[1]}× mistakes in "${categoryLabel}" — targeted practice on this area will accelerate your progress.`,
        })
      }

      // Topic-specific struggle: same topic has many mistakes
      const topicFreq = new Map<string, number>()
      for (const m of recentMistakes) {
        topicFreq.set(m.topicSlug, (topicFreq.get(m.topicSlug) ?? 0) + 1)
      }
      const topTopic = [...topicFreq.entries()].sort((a, b) => b[1] - a[1])[0]
      if (topTopic && topTopic[1] >= 4) {
        insights.push({
          kind: 'REVIEW_NEEDED', severity: 'WARNING',
          message: `You struggle with "${humanizeSlug(topTopic[0])}" — ${topTopic[1]} mistakes recorded. Revisit this topic before continuing.`,
        })
      }
    }

    // Pre-requisite ordering: if a topic has high mistakes AND a later topic has high mastery,
    // the learner skipped fundamentals — recommend review
    if (allTopicProgress.length >= 4 && recentMistakes.length >= 3) {
      const weakTopicSlugs = new Set(
        allTopicProgress.filter((t) => t.masteryPct > 0 && t.masteryPct < 60).map((t) => t.topicSlug)
      )
      const strongTopicSlugs = allTopicProgress
        .filter((t) => t.masteryPct >= 80 && !weakTopicSlugs.has(t.topicSlug))
        .map((t) => t.topicSlug)

      if (weakTopicSlugs.size >= 1 && strongTopicSlugs.length >= 1) {
        const weakSample = humanizeSlug([...weakTopicSlugs][0])
        const strongSample = humanizeSlug(strongTopicSlugs[0])
        insights.push({
          kind: 'FOCUS_RECOMMENDATION', severity: 'INFO',
          message: `Review "${weakSample}" before advancing in "${strongSample}" — a solid foundation here will prevent future gaps.`,
        })
      }
    }

    // Learning style from LearningProfile
    if (learningProfile?.preferredLearningStyle) {
      const styleMessages: Record<string, string> = {
        VISUAL: 'You learn faster through visual explanations and diagrams — your tutor uses visual analogies automatically.',
        PRACTICAL: 'You learn faster through examples and hands-on exercises — your tutor prioritizes worked examples for you.',
        THEORETICAL: 'You learn better through understanding underlying concepts — your tutor goes deeper into theory for you.',
        MIXED: 'You balance theory and practice well — your tutor adapts the mix based on each topic.',
      }
      const msg = styleMessages[learningProfile.preferredLearningStyle]
      if (msg) {
        insights.push({ kind: 'GENERAL', severity: 'INFO', message: msg })
      }
    }
  } catch {
    // behavioral insights are non-critical — never block the main flow
  }

  if (insights.length === 0) return

  // Replace stale auto-generated insights with the fresh batch (keep dismissed history out of the way)
  await withRetry(() => prisma.coachInsight.deleteMany({ where: { userId, dismissed: false } }))
  await withRetry(() => prisma.coachInsight.createMany({
    data: insights.slice(0, 12).map((i) => ({
      userId,
      subjectId: i.subjectId ?? null,
      kind: i.kind,
      message: i.message,
      severity: i.severity,
    })),
  }))
}
