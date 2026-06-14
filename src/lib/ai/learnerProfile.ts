import { prisma } from '@/lib/db/prisma'
import { withRetry } from '@/lib/db/withRetry'

export interface LearnerProfile {
  profileId: string
  strengths: string[]
  weaknesses: string[]
  learningStyle: string
  pace: 'slow' | 'medium' | 'fast'
  // Learner Intelligence fields
  estimatedLevel: 'beginner' | 'intermediate' | 'advanced'
  confidenceScore: number
  learningPace: 'FAST' | 'STEADY' | 'SLOW'
  explanationStyle: string
  consistencyRate: number
  topicsStruggling: string[]
  topicsMastered: string[]
  nextRecommendation: string
  strongConcepts: string[]
  weakConcepts: string[]
  mistakeTrend: Array<{ concept: string; category: string; count: number; recent?: boolean }>
  recommendedFocusAreas: string[]
  mode?: string
  recommendedDifficulty?: string
  averageMastery?: number
  studyStreak?: number
  lastActive?: string
}

// ── Sprint AP: short-TTL in-memory cache ──────────────────────────────────────
// The profile is rebuilt on EVERY /api/learn/chat message (6 queries each), yet
// its inputs only change when the learner completes practice/assessments — not
// between consecutive chat turns. A 60s TTL keeps the tutor context fresh-enough
// while collapsing the per-message cost to one build per minute per subject.
// Writes that feed the profile call invalidateLearnerProfileCache() so a learner
// returning from a practice session sees updated context immediately.
// Note: selfDescription/learningGoals params don't affect the computed output,
// so they're excluded from the cache key.
const PROFILE_CACHE_TTL_MS = 60_000
const profileCache = new Map<string, { value: LearnerProfile & { hasSignal: boolean }; expires: number }>()

export function invalidateLearnerProfileCache(userId: string) {
  for (const key of profileCache.keys()) {
    if (key.startsWith(`${userId}:`)) profileCache.delete(key)
  }
}

/**
 * Build a Learner Intelligence Profile from real DB data.
 * Aggregates: SubjectAnalytics, TopicProgress, MistakeRecord,
 * LearningProfile, LearningAnalytics, PracticeSession.
 * Cached in-memory for 60s per (userId, subjectSlug, subjectId).
 */
export async function buildLearnerIntelligenceProfile(
  userId: string,
  subjectSlug?: string,
  subjectId?: string | null,
  _selfDescription?: string | null,
  _learningGoals?: string | null,
): Promise<LearnerProfile & { hasSignal: boolean }> {
  const cacheKey = `${userId}:${subjectSlug ?? ''}:${subjectId ?? ''}`
  const cached = profileCache.get(cacheKey)
  if (cached && cached.expires > Date.now()) return cached.value

  const value = await buildLearnerIntelligenceProfileUncached(userId, subjectSlug, subjectId)
  profileCache.set(cacheKey, { value, expires: Date.now() + PROFILE_CACHE_TTL_MS })
  // Bound memory: drop expired entries opportunistically once the map grows.
  if (profileCache.size > 500) {
    const now = Date.now()
    for (const [k, v] of profileCache) {
      if (v.expires <= now) profileCache.delete(k)
    }
  }
  return value
}

async function buildLearnerIntelligenceProfileUncached(
  userId: string,
  subjectSlug?: string,
  subjectId?: string | null,
): Promise<LearnerProfile & { hasSignal: boolean }> {
  const [
    subjectAnalytics,
    topicRows,
    mistakeRows,
    learningProfile,
    analytics,
    recentPractice,
  ] = await Promise.all([
    subjectId
      ? withRetry(() => prisma.subjectAnalytics.findUnique({ where: { userId_subjectId: { userId, subjectId } } }))
      : subjectSlug
        ? withRetry(() => prisma.subjectAnalytics.findFirst({
            where: { userId, subject: { slug: subjectSlug } },
          }))
        : null,
    subjectSlug
      ? withRetry(() => prisma.topicProgress.findMany({
          where: { userId, subjectSlug },
          orderBy: { updatedAt: 'desc' },
          take: 50,
        }))
      : [],
    subjectSlug
      ? withRetry(() => prisma.mistakeRecord.findMany({
          where: { userId, subjectSlug },
          orderBy: { createdAt: 'desc' },
          take: 100,
        }))
      : [],
    withRetry(() => prisma.learningProfile.findUnique({ where: { userId } })),
    withRetry(() => prisma.learningAnalytics.findUnique({ where: { userId } })),
    subjectSlug
      ? withRetry(() => prisma.practiceSession.findMany({
          where: { userId, subjectSlug },
          orderBy: { createdAt: 'desc' },
          take: 20,
        }))
      : [],
  ])

  const hasSignal = !!(subjectAnalytics || topicRows.length > 0 || mistakeRows.length > 0)

  // ── Estimated level ──────────────────────────────────────────────────────────
  const avgMastery = topicRows.length > 0
    ? Math.round(topicRows.reduce((s, r) => s + r.masteryPct, 0) / topicRows.length)
    : (subjectAnalytics?.progressPercent ?? 0)

  const masteredCount = topicRows.filter((r) => r.status === 'MASTERED' || r.masteryPct >= 80).length
  const completedCount = topicRows.filter((r) => r.status === 'COMPLETED' || r.status === 'MASTERED').length
  const totalTopics = topicRows.length

  let estimatedLevel: 'beginner' | 'intermediate' | 'advanced' = 'beginner'
  if (avgMastery >= 70 || masteredCount >= 5) estimatedLevel = 'advanced'
  else if (avgMastery >= 40 || completedCount >= 3) estimatedLevel = 'intermediate'

  // Confidence score: how much data we have + how consistent scores are
  let confidenceScore = 0
  if (totalTopics >= 10) confidenceScore += 30
  else if (totalTopics >= 5) confidenceScore += 15
  else if (totalTopics >= 2) confidenceScore += 5
  if (mistakeRows.length >= 10) confidenceScore += 25
  else if (mistakeRows.length >= 3) confidenceScore += 10
  if (recentPractice.length >= 5) confidenceScore += 20
  else if (recentPractice.length >= 2) confidenceScore += 10
  if (subjectAnalytics) confidenceScore += 15
  if (analytics) confidenceScore += 10
  confidenceScore = Math.min(100, confidenceScore)

  // ── Learning pace ─────────────────────────────────────────────────────────────
  const dbPace = learningProfile?.learningPace ?? 'STEADY'
  const learningPace: 'FAST' | 'STEADY' | 'SLOW' = dbPace === 'FAST' ? 'FAST' : dbPace === 'SLOW' ? 'SLOW' : 'STEADY'

  // ── Explanation style ─────────────────────────────────────────────────────────
  const styleMap: Record<string, string> = {
    VISUAL: 'beginner_friendly',
    PRACTICAL: 'standard',
    THEORETICAL: 'technical',
    BALANCED: 'standard',
  }
  const explanationStyle = styleMap[learningProfile?.preferredLearningStyle ?? 'BALANCED'] ?? 'standard'

  // ── Strong / weak concepts ────────────────────────────────────────────────────
  const masteredTopics = topicRows
    .filter((r) => r.masteryPct >= 80 || r.status === 'MASTERED')
    .map((r) => r.topicSlug)
    .slice(0, 5)
  const strugglingTopics = topicRows
    .filter((r) => r.masteryPct < 40 && r.attempts >= 2)
    .sort((a, b) => a.masteryPct - b.masteryPct)
    .map((r) => r.topicSlug)
    .slice(0, 5)

  const strongFromAnalytics = subjectAnalytics?.strongTopics ?? []
  const weakFromAnalytics = subjectAnalytics?.weakTopics ?? []
  const strongConcepts = [...new Set([...masteredTopics, ...strongFromAnalytics])].slice(0, 5)
  const weakConcepts = [...new Set([...strugglingTopics, ...weakFromAnalytics])].slice(0, 5)

  // ── Mistake trend ─────────────────────────────────────────────────────────────
  const categoryCounts = new Map<string, { count: number; recent: boolean }>()
  const cutoff = Date.now() - 7 * 86400000
  for (const m of mistakeRows) {
    const existing = categoryCounts.get(m.category) ?? { count: 0, recent: false }
    categoryCounts.set(m.category, {
      count: existing.count + 1,
      recent: existing.recent || new Date(m.createdAt).getTime() > cutoff,
    })
  }
  const mistakeTrend = [...categoryCounts.entries()]
    .sort((a, b) => b[1].count - a[1].count)
    .slice(0, 3)
    .map(([category, { count, recent }]) => ({ concept: category, category, count, recent }))

  // ── Recommended focus ─────────────────────────────────────────────────────────
  const recommendedFocusAreas = [...new Set([
    ...weakConcepts.slice(0, 2),
    ...mistakeTrend.slice(0, 1).map((m) => m.category),
  ])].filter(Boolean).slice(0, 3)

  // ── Mode ──────────────────────────────────────────────────────────────────────
  let mode: string | undefined
  if (learningPace === 'SLOW' || avgMastery < 30) mode = 'SLOW_LEARNER'
  else if (estimatedLevel === 'advanced' && confidenceScore >= 60) mode = 'ADVANCED_LEARNER'

  // ── Difficulty recommendation ─────────────────────────────────────────────────
  const diffPref = learningProfile?.preferredDifficulty ?? 'ADAPTIVE'
  const recommendedDifficulty = diffPref === 'HARDER' ? 'hard'
    : diffPref === 'EASIER' ? 'easy' : 'adaptive'

  // ── Consistency rate ──────────────────────────────────────────────────────────
  const consistencyRate = analytics
    ? Math.min(100, Math.round(((analytics.currentStreakDays ?? 0) / 7) * 100))
    : 0

  return {
    profileId: userId,
    strengths: strongConcepts,
    weaknesses: weakConcepts,
    learningStyle: explanationStyle,
    pace: learningPace === 'FAST' ? 'fast' : learningPace === 'SLOW' ? 'slow' : 'medium',
    estimatedLevel,
    confidenceScore,
    learningPace,
    explanationStyle,
    consistencyRate,
    topicsStruggling: strugglingTopics,
    topicsMastered: masteredTopics,
    nextRecommendation: weakConcepts[0] ?? recommendedFocusAreas[0] ?? '',
    strongConcepts,
    weakConcepts,
    mistakeTrend,
    recommendedFocusAreas,
    mode,
    recommendedDifficulty,
    averageMastery: avgMastery,
    studyStreak: analytics?.currentStreakDays ?? 0,
    lastActive: analytics?.lastStudyDate?.toISOString(),
    hasSignal,
  }
}

export async function getLearnerProfile(_profileId: string): Promise<LearnerProfile | null> {
  return null
}

export async function updateLearnerProfile(
  _profileId: string,
  _data: Partial<LearnerProfile>
): Promise<void> {}

export function humanize(key: string): string {
  return key.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
}

export function formatLearnerIntelligenceContext(profile: LearnerProfile & { hasSignal: boolean }): string {
  if (!profile.hasSignal) return ''
  const lines: string[] = [
    `LEARNER INTELLIGENCE (derived from real usage data):`,
    `- Level: ${profile.estimatedLevel} (confidence: ${profile.confidenceScore}/100)`,
    `- Pace: ${profile.learningPace} | Style: ${profile.explanationStyle}`,
  ]
  if (profile.strongConcepts.length > 0)
    lines.push(`- Strong: ${profile.strongConcepts.join(', ')}`)
  if (profile.weakConcepts.length > 0)
    lines.push(`- Needs work: ${profile.weakConcepts.join(', ')}`)
  if (profile.mistakeTrend.length > 0)
    lines.push(`- Frequent mistakes: ${profile.mistakeTrend[0].category} (${profile.mistakeTrend[0].count}×)`)
  if (profile.mode)
    lines.push(`- Mode: ${profile.mode}`)
  return lines.join('\n')
}
