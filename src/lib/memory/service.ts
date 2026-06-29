import type { TrackLevel, LearningSpeed, FatigueLevel } from '@/lib/teaching-engine/types'
import { fetchRawLearnerData, fetchSupplementalData } from './repository'
import type {
  RawLearnerData,
  RawTopicRow,
  RawMistakeRow,
  RawSubjectAnalytics,
  RawLearningProfile,
  RawRetentionRow,
} from './repository'
import type {
  LearnerMemory,
  WeakConcept,
  DetectedMisconception,
  TopicRetentionState,
  TeachingMemorySnapshot,
} from './types'

// ── Derivation helpers ────────────────────────────────────────────────────────

function deriveTrackLevel(masteredCount: number): TrackLevel {
  if (masteredCount < 3)  return 'T0'
  if (masteredCount < 15) return 'T1'
  if (masteredCount < 40) return 'T2'
  if (masteredCount < 80) return 'T3'
  return 'T4'
}

// Each tutor message exchange ≈ 120 seconds on task.
const SECONDS_PER_EXCHANGE = 120

function deriveFatigueLevel(messageCount: number): FatigueLevel {
  if (messageCount < 13) return 'low'
  if (messageCount < 26) return 'medium'
  return 'high'
}

function deriveLearningSpeed(pace: string | undefined): LearningSpeed {
  if (pace === 'FAST') return 'fast'
  if (pace === 'SLOW') return 'slow'
  return 'normal'
}

/**
 * Infer misconceptions from repeated MistakeRecord entries.
 * Groups by (topicSlug, category); requires at least 2 occurrences to surface.
 */
function inferMisconceptions(recentMistakes: RawMistakeRow[]): DetectedMisconception[] {
  const counts = new Map<string, { topicSlug: string; category: string; count: number }>()
  for (const m of recentMistakes) {
    const key = `${m.topicSlug}::${m.category}`
    const entry = counts.get(key)
    if (entry) { entry.count++ }
    else { counts.set(key, { topicSlug: m.topicSlug, category: m.category, count: 1 }) }
  }
  const result: DetectedMisconception[] = []
  for (const { topicSlug, category, count } of counts.values()) {
    if (count < 2) continue
    result.push({
      topicSlug,
      category,
      confidence: count >= 5 ? 'HIGH' : count >= 3 ? 'MEDIUM' : 'LOW',
      evidence: count,
    })
  }
  return result.sort((a, b) => b.evidence - a.evidence).slice(0, 10)
}

function deriveSuccessRate(analytics: RawSubjectAnalytics | null): number {
  if (!analytics) return 65
  if (analytics.trend === 'IMPROVING')  return 80
  if (analytics.trend === 'DECLINING')  return 45
  return 65
}

// ── Core aggregation ──────────────────────────────────────────────────────────

function aggregate(
  userId: string,
  subjectSlug: string,
  subjectId: string,
  raw: RawLearnerData,
): LearnerMemory {
  // Mastery buckets
  const masteredConcepts: string[] = []
  const inProgressConcepts: string[] = []
  const weakConcepts: WeakConcept[] = []

  for (const row of raw.topicProgress) {
    if (row.status === 'COMPLETED' || row.status === 'MASTERED') {
      masteredConcepts.push(row.topicSlug)
    } else if (row.status === 'IN_PROGRESS' || row.status === 'REVISION') {
      inProgressConcepts.push(row.topicSlug)
    }
    if (row.masteryPct > 0 && row.masteryPct < 70) {
      weakConcepts.push({
        slug: row.topicSlug,
        masteryPct: row.masteryPct,
        attempts: row.attempts,
        lastScore: row.lastScore ?? undefined,
      })
    }
  }

  // Retention map
  const retentionByTopic: Record<string, TopicRetentionState> = {}
  for (const r of raw.retentionMetrics) {
    retentionByTopic[r.topic] = {
      masteryScore: r.masteryScore,
      confidenceScore: r.confidenceScore,
      decayScore: r.decayScore,
      reviewCount: r.reviewCount,
      lastReviewedAt: r.lastReviewedAt ?? undefined,
    }
  }

  // Learning profile
  const lp = raw.learningProfile
  const learningSpeed    = deriveLearningSpeed(lp?.learningPace)
  const confidenceLevel  = lp?.confidenceLevel ?? 70
  const preferredStyle   = (lp?.preferredLearningStyle as LearnerMemory['preferredStyle']) ?? 'BALANCED'

  // History signals
  const analytics    = raw.subjectAnalytics
  const successRate  = deriveSuccessRate(analytics)
  const errorPatterns = analytics?.weakTopics ?? []

  const recentTopics = (raw.topicProgress as RawTopicRow[])
    .filter((r) => r.status !== 'NOT_STARTED')
    .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
    .slice(0, 5)
    .map((r) => r.topicSlug)

  return {
    userId,
    subjectSlug,
    subjectId,
    masteredConcepts,
    inProgressConcepts,
    weakConcepts: weakConcepts.sort((a, b) => a.masteryPct - b.masteryPct),
    activeMisconceptions: inferMisconceptions(raw.recentMistakes),
    learningSpeed,
    confidenceLevel,
    preferredStyle,
    retentionByTopic,
    trackLevel:    deriveTrackLevel(masteredConcepts.length),
    fatigueLevel:  deriveFatigueLevel(raw.sessionMessageCount),
    recentTopics,
    successRate,
    errorPatterns,
    timeOnTask:    raw.sessionMessageCount * SECONDS_PER_EXCHANGE,
    lastStudyDate: raw.lastStudyDate ?? undefined,
    computedAt:    new Date(),
  }
}

// ── Public read API ───────────────────────────────────────────────────────────

/**
 * Full read: fetches all data from DB and returns a LearnerMemory snapshot.
 * Use when no prior data has been fetched for this request.
 */
export async function readLearnerMemory(
  userId: string,
  subjectSlug: string,
  subjectId: string,
  opts?: { sessionId?: string },
): Promise<LearnerMemory> {
  const raw = await fetchRawLearnerData(userId, subjectSlug, subjectId, opts?.sessionId)
  return aggregate(userId, subjectSlug, subjectId, raw)
}

/**
 * Preload variant: accepts topicProgress, learningProfile, and subjectAnalytics
 * that were already fetched by the chat route's parallel query block, and only
 * fetches the supplemental data (recentMistakes, retentionMetrics, message count)
 * that isn't available from the preload. Avoids duplicate DB round-trips.
 */
export async function readLearnerMemoryFromPreload(
  userId: string,
  subjectSlug: string,
  subjectId: string,
  preloaded: {
    topicProgress: Array<{ topicSlug: string; status: string; masteryPct: number; attempts: number; lastScore: number | null; updatedAt: Date }>
    learningProfile: { confidenceLevel?: number; learningPace?: string; preferredLearningStyle?: string } | null
    subjectAnalytics: { trend?: string; weakTopics?: string[]; strongTopics?: string[]; progressPercent?: number } | null
  },
  opts?: { sessionId?: string },
): Promise<LearnerMemory> {
  const supp = await fetchSupplementalData(userId, subjectSlug, subjectId, opts?.sessionId)

  const raw: RawLearnerData = {
    topicProgress: preloaded.topicProgress as RawTopicRow[],
    learningProfile: preloaded.learningProfile
      ? {
          confidenceLevel:        preloaded.learningProfile.confidenceLevel ?? 70,
          learningPace:           preloaded.learningProfile.learningPace ?? 'STEADY',
          preferredLearningStyle: preloaded.learningProfile.preferredLearningStyle ?? 'BALANCED',
        }
      : null,
    subjectAnalytics: preloaded.subjectAnalytics
      ? {
          trend:           preloaded.subjectAnalytics.trend ?? 'STEADY',
          weakTopics:      preloaded.subjectAnalytics.weakTopics ?? [],
          strongTopics:    preloaded.subjectAnalytics.strongTopics ?? [],
          progressPercent: preloaded.subjectAnalytics.progressPercent ?? 0,
        }
      : null,
    recentMistakes:      supp.recentMistakes,
    retentionMetrics:    supp.retentionMetrics,
    sessionMessageCount: supp.sessionMessageCount,
    lastStudyDate:       supp.lastStudyDate,
  }

  return aggregate(userId, subjectSlug, subjectId, raw)
}

// ── Projection for Teaching Engine ───────────────────────────────────────────

/**
 * Extract the fields consumed by decide() from a full LearnerMemory.
 * Only MEDIUM/HIGH-confidence misconceptions are elevated to the Teaching Engine
 * to avoid noisy signals — LOW-confidence ones remain in the full snapshot for
 * analytics and recommendation use.
 */
export function toTeachingSnapshot(memory: LearnerMemory): TeachingMemorySnapshot {
  return {
    trackLevel:         memory.trackLevel,
    masteredConcepts:   memory.masteredConcepts,
    weakConcepts:       memory.weakConcepts.map((w) => w.slug),
    misconceptions:     memory.activeMisconceptions
                          .filter((m) => m.confidence !== 'LOW')
                          .map((m) => m.topicSlug),
    retentionScore:     memory.confidenceLevel,
    learningSpeed:      memory.learningSpeed,
    fatigueLevel:       memory.fatigueLevel,
    recentlyAttempted:  memory.inProgressConcepts.slice(0, 3),
    successRate:        memory.successRate,
    timeOnTask:         memory.timeOnTask,
    errorPatterns:      memory.errorPatterns,
  }
}
