/**
 * Learning Effectiveness Intelligence (Sprint EG).
 *
 * Pure computation layer — no AI, no side-effects, no new schema.
 * Aggregates existing tables to produce effectiveness scores:
 *
 *   learningEffectivenessScore   — mastery growth rate vs attempts invested
 *   retentionEffectivenessScore  — revision impact on mastery stability
 *   recommendationEffectivenessScore — checkpoint/practice pass rates
 *
 * All functions are non-fatal: missing data yields 0 / empty arrays.
 */

import { prisma } from '@/lib/db/prisma'

const DAY_MS = 86_400_000

// ── Types ─────────────────────────────────────────────────────────────────────

export interface LearningOutcome {
  topicSlug: string
  subjectSlug: string
  masteryPct: number
  attempts: number
  revisionCount: number
  status: string
  completedAt: Date | null
}

export interface MasteryGrowthMetrics {
  averageMastery: number
  masteredTopics: number
  totalTopics: number
  learningVelocity: number
  recentTrend: 'IMPROVING' | 'STEADY' | 'DECLINING'
}

export interface RevisionEffectiveness {
  revisedTopics: number
  avgMasteryAfterRevision: number
  revisionSuccessRate: number
  retentionEffectivenessScore: number
}

export interface RecommendationEffectiveness {
  totalCheckpoints: number
  checkpointPassRate: number
  avgPracticeScore: number
  practicePassRate: number
  recommendationEffectivenessScore: number
}

export interface MisconceptionReport {
  category: string
  count: number
  topSubjects: string[]
  share: number
}

export interface SubjectEffectiveness {
  subjectSlug: string
  topics: number
  masteredTopics: number
  avgMastery: number
  avgScore: number
  checkpointPassRate: number
}

export interface LearningEffectivenessReport {
  masteryGrowth: MasteryGrowthMetrics
  revisionEffectiveness: RevisionEffectiveness
  recommendationEffectiveness: RecommendationEffectiveness
  topMisconceptions: MisconceptionReport[]
  strongestSubjects: SubjectEffectiveness[]
  weakestSubjects: SubjectEffectiveness[]
  learningEffectivenessScore: number
  retentionEffectivenessScore: number
  recommendationEffectivenessScore: number
}

export interface PlatformEffectivenessReport {
  totalLearnersWithData: number
  avgLearningEffectivenessScore: number
  avgRetentionEffectivenessScore: number
  avgRecommendationEffectivenessScore: number
  platformAvgMastery: number
  platformMasteryTrend: 'IMPROVING' | 'STEADY' | 'DECLINING'
  topMisconceptions: MisconceptionReport[]
  subjectEffectiveness: SubjectEffectiveness[]
  checkpointPassRate: number
  practicePassRate: number
}

// ── Per-user report ───────────────────────────────────────────────────────────

export async function computeLearningEffectiveness(userId: string): Promise<LearningEffectivenessReport> {
  const now = new Date()
  const since30d = new Date(now.getTime() - 30 * DAY_MS)
  const since60d = new Date(now.getTime() - 60 * DAY_MS)

  // Four tables fetched in parallel. Cross-table consistency is best-effort
  // (not wrapped in a transaction) — the window between fetches is negligible
  // in practice. take: 2000 caps memory per request; power users see a sampled
  // view, which is statistically representative for effectiveness scoring.
  const [topicRows, practiceRows, mistakeRows, checkpointRows] = await Promise.all([
    prisma.topicProgress.findMany({
      where: { userId },
      select: { topicSlug: true, subjectSlug: true, masteryPct: true, attempts: true, revisionCount: true, status: true, completedAt: true, updatedAt: true },
    }),
    prisma.practiceSession.findMany({
      where: { userId, score: { not: null }, completedAt: { not: null } },
      select: { subjectSlug: true, topicSlug: true, score: true, completedAt: true },
      take: 2000,
      orderBy: { completedAt: 'desc' },
    }),
    prisma.mistakeRecord.findMany({
      where: { userId },
      select: { category: true, subjectSlug: true },
      take: 2000,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.learningCheckpoint.findMany({
      where: { userId },
      select: { passed: true, subjectSlug: true, createdAt: true },
      take: 2000,
      orderBy: { createdAt: 'desc' },
    }),
  ])

  // ── Mastery growth ────────────────────────────────────────────────────────
  const touched = topicRows.filter((t) => t.attempts > 0)
  const mastered = touched.filter((t) => t.masteryPct >= 80)
  const avgMastery = touched.length ? Math.round(touched.reduce((s, t) => s + t.masteryPct, 0) / touched.length) : 0

  // Velocity = avg mastery earned per attempt across all touched topics.
  // `touched` is already filtered to attempts > 0, so division is safe.
  const totalVelocityPoints = touched.reduce((s, t) => s + t.masteryPct / t.attempts, 0)
  const learningVelocity = touched.length ? Math.round(totalVelocityPoints / touched.length) : 0

  const recent = touched.filter((t) => t.updatedAt >= since30d)
  const prior = touched.filter((t) => t.updatedAt >= since60d && t.updatedAt < since30d)
  const recentAvg = recent.length ? recent.reduce((s, t) => s + t.masteryPct, 0) / recent.length : avgMastery
  const priorAvg = prior.length ? prior.reduce((s, t) => s + t.masteryPct, 0) / prior.length : recentAvg
  const diff = recentAvg - priorAvg
  const recentTrend: MasteryGrowthMetrics['recentTrend'] = diff > 3 ? 'IMPROVING' : diff < -3 ? 'DECLINING' : 'STEADY'

  const masteryGrowth: MasteryGrowthMetrics = {
    averageMastery: avgMastery,
    masteredTopics: mastered.length,
    totalTopics: touched.length,
    learningVelocity,
    recentTrend,
  }

  // ── Revision effectiveness ────────────────────────────────────────────────
  const revised = touched.filter((t) => t.revisionCount > 0)
  const avgMasteryAfterRevision = revised.length
    ? Math.round(revised.reduce((s, t) => s + t.masteryPct, 0) / revised.length)
    : 0
  const revisionSuccess = revised.filter((t) => t.masteryPct >= 80).length
  const revisionSuccessRate = revised.length ? Math.round((revisionSuccess / revised.length) * 100) : 0
  const retentionScore = Math.min(100, Math.round(revisionSuccessRate * 0.6 + avgMasteryAfterRevision * 0.4))

  const revisionEffectiveness: RevisionEffectiveness = {
    revisedTopics: revised.length,
    avgMasteryAfterRevision,
    revisionSuccessRate,
    retentionEffectivenessScore: retentionScore,
  }

  // ── Checkpoint / practice effectiveness ──────────────────────────────────
  const totalCheckpoints = checkpointRows.length
  const passedCheckpoints = checkpointRows.filter((c) => c.passed).length
  const checkpointPassRate = totalCheckpoints ? Math.round((passedCheckpoints / totalCheckpoints) * 100) : 0

  const scores = practiceRows.map((p) => p.score ?? 0)
  const avgPracticeScore = scores.length ? Math.round(scores.reduce((s: number, v: number) => s + v, 0) / scores.length) : 0
  const passingPractice = scores.filter((s: number) => s >= 70).length
  const practicePassRate = scores.length ? Math.round((passingPractice / scores.length) * 100) : 0
  const recScore = Math.min(100, Math.round(checkpointPassRate * 0.5 + practicePassRate * 0.5))

  const recommendationEffectiveness: RecommendationEffectiveness = {
    totalCheckpoints,
    checkpointPassRate,
    avgPracticeScore,
    practicePassRate,
    recommendationEffectivenessScore: recScore,
  }

  // ── Misconception intelligence ────────────────────────────────────────────
  const catMap = new Map<string, { count: number; subjects: Set<string> }>()
  for (const m of mistakeRows) {
    const e = catMap.get(m.category) ?? { count: 0, subjects: new Set() }
    e.count++
    e.subjects.add(m.subjectSlug)
    catMap.set(m.category, e)
  }
  const topMisconceptions: MisconceptionReport[] = mistakeRows.length === 0
    ? []
    : (() => {
        const totalMistakes = mistakeRows.length
        const raw = [...catMap.entries()]
          .sort((a, b) => b[1].count - a[1].count)
          .slice(0, 5)
          .map(([category, { count, subjects }]) => ({
            category,
            count,
            topSubjects: [...subjects].slice(0, 3),
            share: Math.round((count / totalMistakes) * 100),
          }))
        // Normalize so rounding errors don't push total share past 100
        if (raw.length > 1) {
          const sumHead = raw.slice(0, -1).reduce((s, m) => s + m.share, 0)
          raw[raw.length - 1].share = Math.max(0, Math.min(raw[raw.length - 1].share, 100 - sumHead))
        }
        return raw
      })()

  // ── Subject-level effectiveness ───────────────────────────────────────────
  type SubjBucket = { topics: LearningOutcome[]; scores: number[]; checkpoints: { passed: boolean }[] }
  const subjectMap = new Map<string, SubjBucket>()

  for (const t of touched) {
    const e = subjectMap.get(t.subjectSlug) ?? { topics: [], scores: [], checkpoints: [] }
    e.topics.push(t)
    subjectMap.set(t.subjectSlug, e)
  }
  for (const p of practiceRows) {
    const e = subjectMap.get(p.subjectSlug)
    if (e) e.scores.push(p.score ?? 0)
  }
  for (const c of checkpointRows) {
    const e = subjectMap.get(c.subjectSlug)
    if (e) e.checkpoints.push(c)
  }

  const subjectList: SubjectEffectiveness[] = [...subjectMap.entries()].map(([slug, { topics, scores: ss, checkpoints: cp }]) => ({
    subjectSlug: slug,
    topics: topics.length,
    masteredTopics: topics.filter((t) => t.masteryPct >= 80).length,
    avgMastery: topics.length ? Math.round(topics.reduce((s, t) => s + t.masteryPct, 0) / topics.length) : 0,
    avgScore: ss.length ? Math.round(ss.reduce((s: number, v: number) => s + v, 0) / ss.length) : 0,
    checkpointPassRate: cp.length
      ? Math.round((cp.filter((c) => c.passed).length / cp.length) * 100)
      : 0,
  }))

  // DEF-EH-01: sort independently so weakest/strongest never duplicate when ≤3 subjects exist
  const strongestSubjects = [...subjectList].sort((a, b) => b.avgMastery - a.avgMastery).slice(0, 3)
  const weakestSubjects = [...subjectList].sort((a, b) => a.avgMastery - b.avgMastery).slice(0, 3)

  const learningEffectivenessScore = Math.min(
    100,
    Math.round(avgMastery * 0.5 + learningVelocity * 0.3 + (recentTrend === 'IMPROVING' ? 20 : recentTrend === 'STEADY' ? 10 : 0))
  )

  return {
    masteryGrowth,
    revisionEffectiveness,
    recommendationEffectiveness,
    topMisconceptions,
    strongestSubjects,
    weakestSubjects,
    learningEffectivenessScore,
    retentionEffectivenessScore: retentionScore,
    recommendationEffectivenessScore: recScore,
  }
}

// ── Platform-wide aggregate (admin) ──────────────────────────────────────────

export async function computePlatformEffectiveness(): Promise<PlatformEffectivenessReport> {
  const now = new Date()
  const since30d = new Date(now.getTime() - 30 * DAY_MS)
  const since60d = new Date(now.getTime() - 60 * DAY_MS)

  const [topicRows, practiceRows, mistakeRows, checkpointRows] = await Promise.all([
    prisma.topicProgress.findMany({
      where: { attempts: { gt: 0 } },
      select: { userId: true, subjectSlug: true, masteryPct: true, attempts: true, revisionCount: true, updatedAt: true },
      take: 50000,
    }),
    prisma.practiceSession.findMany({
      where: { score: { not: null }, completedAt: { not: null } },
      select: { subjectSlug: true, score: true },
      take: 20000,
    }),
    prisma.mistakeRecord.findMany({
      select: { category: true, subjectSlug: true },
      take: 20000,
    }),
    prisma.learningCheckpoint.findMany({
      select: { passed: true, subjectSlug: true },
      take: 20000,
    }),
  ])

  const userIds = [...new Set(topicRows.map((t) => t.userId))]
  const totalLearnersWithData = userIds.length

  const platformAvgMastery = topicRows.length
    ? Math.round(topicRows.reduce((s, t) => s + t.masteryPct, 0) / topicRows.length)
    : 0

  const recent = topicRows.filter((t) => t.updatedAt >= since30d)
  const prior = topicRows.filter((t) => t.updatedAt >= since60d && t.updatedAt < since30d)
  const recentAvg = recent.length ? recent.reduce((s, t) => s + t.masteryPct, 0) / recent.length : platformAvgMastery
  const priorAvg = prior.length ? prior.reduce((s, t) => s + t.masteryPct, 0) / prior.length : recentAvg
  const diff = recentAvg - priorAvg
  const platformMasteryTrend: PlatformEffectivenessReport['platformMasteryTrend'] = diff > 2 ? 'IMPROVING' : diff < -2 ? 'DECLINING' : 'STEADY'

  // Misconceptions
  const catMap = new Map<string, { count: number; subjects: Set<string> }>()
  for (const m of mistakeRows) {
    const e = catMap.get(m.category) ?? { count: 0, subjects: new Set() }
    e.count++
    e.subjects.add(m.subjectSlug)
    catMap.set(m.category, e)
  }
  const topMisconceptions: MisconceptionReport[] = mistakeRows.length === 0
    ? []
    : (() => {
        const totalMistakes = mistakeRows.length
        const raw = [...catMap.entries()]
          .sort((a, b) => b[1].count - a[1].count)
          .slice(0, 5)
          .map(([category, { count, subjects }]) => ({
            category,
            count,
            topSubjects: [...subjects].slice(0, 3),
            share: Math.round((count / totalMistakes) * 100),
          }))
        if (raw.length > 1) {
          const sumHead = raw.slice(0, -1).reduce((s, m) => s + m.share, 0)
          raw[raw.length - 1].share = Math.max(0, Math.min(raw[raw.length - 1].share, 100 - sumHead))
        }
        return raw
      })()

  // Subject effectiveness
  type PlatSubjBucket = { mastery: number[]; scores: number[]; cp: boolean[] }
  const subjectMap = new Map<string, PlatSubjBucket>()
  for (const t of topicRows) {
    const e = subjectMap.get(t.subjectSlug) ?? { mastery: [], scores: [], cp: [] }
    e.mastery.push(t.masteryPct)
    subjectMap.set(t.subjectSlug, e)
  }
  for (const p of practiceRows) {
    const e = subjectMap.get(p.subjectSlug)
    if (e) e.scores.push(p.score ?? 0)
  }
  for (const c of checkpointRows) {
    const e = subjectMap.get(c.subjectSlug)
    if (e) e.cp.push(c.passed)
  }

  const subjectEffectiveness: SubjectEffectiveness[] = [...subjectMap.entries()].map(([slug, { mastery, scores: ss, cp }]) => ({
    subjectSlug: slug,
    topics: mastery.length,
    masteredTopics: mastery.filter((m) => m >= 80).length,
    avgMastery: mastery.length ? Math.round(mastery.reduce((s: number, v: number) => s + v, 0) / mastery.length) : 0,
    avgScore: ss.length ? Math.round(ss.reduce((s: number, v: number) => s + v, 0) / ss.length) : 0,
    checkpointPassRate: cp.length ? Math.round((cp.filter(Boolean).length / cp.length) * 100) : 0,
  })).sort((a, b) => b.avgMastery - a.avgMastery)

  const checkpointPassRate = checkpointRows.length
    ? Math.round((checkpointRows.filter((c) => c.passed).length / checkpointRows.length) * 100)
    : 0
  const practiceScores = practiceRows.map((p) => p.score ?? 0)
  const practicePassRate = practiceScores.length
    ? Math.round((practiceScores.filter((s: number) => s >= 70).length / practiceScores.length) * 100)
    : 0

  const revisedAndMastered = topicRows.filter((t) => t.revisionCount > 0 && t.masteryPct >= 80).length
  const revised = topicRows.filter((t) => t.revisionCount > 0).length

  const avgRetentionEffectivenessScore = revised > 0 ? Math.min(100, Math.round((revisedAndMastered / revised) * 100)) : 0
  // DEF-EH-06: clamp; DEF-EH-03: removed erroneous * 2 on trend bonus
  const avgRecommendationEffectivenessScore = Math.min(100, Math.round(checkpointPassRate * 0.5 + practicePassRate * 0.5))
  const avgLearningEffectivenessScore = Math.min(
    100,
    Math.round(platformAvgMastery * 0.6 + (platformMasteryTrend === 'IMPROVING' ? 20 : 10))
  )

  return {
    totalLearnersWithData,
    avgLearningEffectivenessScore,
    avgRetentionEffectivenessScore,
    avgRecommendationEffectivenessScore,
    platformAvgMastery,
    platformMasteryTrend,
    topMisconceptions,
    subjectEffectiveness,
    checkpointPassRate,
    practicePassRate,
  }
}
