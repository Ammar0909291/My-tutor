import { prisma } from '@/lib/db/prisma'

// Raw data shapes returned from the DB layer.
// The service layer aggregates these into LearnerMemory.

export interface RawTopicRow {
  topicSlug: string
  status: string
  masteryPct: number
  attempts: number
  lastScore: number | null
  updatedAt: Date
}

export interface RawMistakeRow {
  topicSlug: string
  category: string
  createdAt: Date
}

export interface RawLearningProfile {
  confidenceLevel: number
  learningPace: string
  preferredLearningStyle: string
}

export interface RawRetentionRow {
  topic: string
  masteryScore: number
  confidenceScore: number
  decayScore: number
  reviewCount: number
  lastReviewedAt: Date | null
}

export interface RawSubjectAnalytics {
  trend: string
  weakTopics: string[]
  strongTopics: string[]
  progressPercent: number
}

export interface RawLearnerData {
  topicProgress: RawTopicRow[]
  recentMistakes: RawMistakeRow[]
  learningProfile: RawLearningProfile | null
  retentionMetrics: RawRetentionRow[]
  subjectAnalytics: RawSubjectAnalytics | null
  sessionMessageCount: number
  lastStudyDate: Date | null
}

const RECENT_MISTAKE_DAYS = 30

/**
 * Fetch all raw data needed to build a LearnerMemory in a single parallel
 * round-trip. All sub-queries are fault-tolerant — a failing optional table
 * (RetentionMetric, LearningProfile, SubjectAnalytics) degrades to an empty
 * result rather than rejecting the whole read.
 */
export async function fetchRawLearnerData(
  userId: string,
  subjectSlug: string,
  subjectId: string,
  sessionId?: string,
): Promise<RawLearnerData> {
  const cutoff = new Date(Date.now() - RECENT_MISTAKE_DAYS * 24 * 60 * 60 * 1000)

  const [
    topicProgress,
    recentMistakes,
    learningProfile,
    retentionMetrics,
    subjectAnalytics,
    sessionMessageCount,
    lastSession,
  ] = await Promise.all([
    prisma.topicProgress.findMany({
      where: { userId, subjectSlug },
      select: { topicSlug: true, status: true, masteryPct: true, attempts: true, lastScore: true, updatedAt: true },
    }),
    prisma.mistakeRecord.findMany({
      where: { userId, subjectSlug, createdAt: { gte: cutoff } },
      select: { topicSlug: true, category: true, createdAt: true },
      orderBy: { createdAt: 'desc' },
      take: 100,
    }),
    prisma.learningProfile.findUnique({
      where: { userId },
      select: { confidenceLevel: true, learningPace: true, preferredLearningStyle: true },
    }).catch(() => null),
    subjectId
      ? prisma.retentionMetric.findMany({
          where: { userId, subjectId },
          select: { topic: true, masteryScore: true, confidenceScore: true, decayScore: true, reviewCount: true, lastReviewedAt: true },
        }).catch(() => [])
      : Promise.resolve([]),
    subjectId
      ? prisma.subjectAnalytics.findUnique({
          where: { userId_subjectId: { userId, subjectId } },
          select: { trend: true, weakTopics: true, strongTopics: true, progressPercent: true },
        }).catch(() => null)
      : Promise.resolve(null),
    sessionId
      ? prisma.message.count({ where: { sessionId } }).catch(() => 0)
      : Promise.resolve(0),
    subjectId
      ? prisma.learnSession.findFirst({
          where: { userId, subjectId },
          orderBy: { startedAt: 'desc' },
          select: { startedAt: true },
        }).catch(() => null)
      : Promise.resolve(null),
  ])

  return {
    topicProgress,
    recentMistakes,
    learningProfile,
    retentionMetrics,
    subjectAnalytics: subjectAnalytics as RawSubjectAnalytics | null,
    sessionMessageCount,
    lastStudyDate: lastSession?.startedAt ?? null,
  }
}

/**
 * Lightweight fetch of only the data NOT available from a pre-existing chat-route
 * parallel query. Called by readLearnerMemoryFromPreload() to avoid re-fetching
 * topicProgress / learningProfile / subjectAnalytics that are already in memory.
 */
export async function fetchSupplementalData(
  userId: string,
  subjectSlug: string,
  subjectId: string,
  sessionId?: string,
): Promise<Pick<RawLearnerData, 'recentMistakes' | 'retentionMetrics' | 'sessionMessageCount' | 'lastStudyDate'>> {
  const cutoff = new Date(Date.now() - RECENT_MISTAKE_DAYS * 24 * 60 * 60 * 1000)

  const [recentMistakes, retentionMetrics, sessionMessageCount, lastSession] = await Promise.all([
    prisma.mistakeRecord.findMany({
      where: { userId, subjectSlug, createdAt: { gte: cutoff } },
      select: { topicSlug: true, category: true, createdAt: true },
      orderBy: { createdAt: 'desc' },
      take: 100,
    }),
    subjectId
      ? prisma.retentionMetric.findMany({
          where: { userId, subjectId },
          select: { topic: true, masteryScore: true, confidenceScore: true, decayScore: true, reviewCount: true, lastReviewedAt: true },
        }).catch(() => [])
      : Promise.resolve([]),
    sessionId ? prisma.message.count({ where: { sessionId } }).catch(() => 0) : Promise.resolve(0),
    subjectId
      ? prisma.learnSession.findFirst({
          where: { userId, subjectId },
          orderBy: { startedAt: 'desc' },
          select: { startedAt: true },
        }).catch(() => null)
      : Promise.resolve(null),
  ])

  return {
    recentMistakes,
    retentionMetrics,
    sessionMessageCount,
    lastStudyDate: lastSession?.startedAt ?? null,
  }
}
