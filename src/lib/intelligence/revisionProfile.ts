/**
 * Revision Profile — Educational Intelligence Sprint 1, Task 2.
 *
 * Aggregates already-persisted `TopicProgress` rows (mastery-percentage
 * signal) and the already-built Sprint N `VisualLearningProfile` /
 * `detectVisualWeaknesses()` (visual-engagement signal) into one
 * read-only `RevisionProfile`. Pure aggregation — no new schema, no
 * writes, no scoring/grading/XP semantics. Mirrors the architecture of
 * `src/lib/visuals/visualMasteryProfile.ts`: one pure builder plus one
 * thin Prisma-reading wrapper. Never calls into, modifies, or duplicates
 * `spacedRevision.ts` or `weakTopics.ts` (see
 * docs/EDUCATIONAL_INTELLIGENCE_REVISION_AUDIT.md) — those remain the
 * existing, untouched time-based and mistake-severity-based engines.
 */
import { prisma } from '@/lib/db/prisma'
import { ALL_KG_NODES } from '@/lib/education'
import {
  getVisualLearningProfile,
  detectVisualWeaknesses,
  type VisualWeaknessEntry,
} from '@/lib/visuals/visualMasteryProfile'

const NODE_TITLES = new Map(ALL_KG_NODES.map((n) => [n.id, n.title]))

function titleFor(topicSlug: string): string {
  return NODE_TITLES.get(topicSlug) ?? topicSlug.replace(/[-_]/g, ' ')
}

/** Minimal shape this module needs from a `TopicProgress` row — callers may pass full Prisma rows. */
export interface TopicProgressRow {
  subjectSlug: string
  topicSlug: string
  status: string
  masteryPct: number
  lastScore: number | null
}

/** One topic, classified as a strength or weakness by mastery percentage. Descriptive only — not a grade. */
export interface TopicMasterySignal {
  subjectSlug: string
  topicSlug: string
  title: string
  masteryPct: number
  status: string
  lastScore: number | null
}

/** masteryPct at/above this counts as a strength (mirrors VISUAL_STRENGTH_THRESHOLD_PCT's role for topics). */
export const TOPIC_STRENGTH_THRESHOLD_PCT = 75

/** masteryPct below this (and topic not MASTERED) counts as a weakness needing revision. */
export const TOPIC_WEAKNESS_THRESHOLD_PCT = 50

/** Example (per the Sprint 1 brief): `{ strengths: [...], weaknesses: [...], visualWeaknesses: [...], recommendedRevisionTopics: [...] }`. */
export interface RecommendedRevisionTopic {
  subjectSlug: string
  topicSlug: string
  title: string
  masteryPct: number
}

export interface RevisionProfile {
  strengths: TopicMasterySignal[]
  weaknesses: TopicMasterySignal[]
  visualWeaknesses: VisualWeaknessEntry[]
  recommendedRevisionTopics: RecommendedRevisionTopic[]
}

const MAX_RECOMMENDED_REVISION_TOPICS = 5

/**
 * Task 2 — builds the profile from already-fetched rows. Pure function:
 * no Prisma dependency, no I/O. `NOT_STARTED` topics are excluded from
 * both strengths and weaknesses — no attempt is not the same signal as
 * weak mastery (mirrors `detectVisualWeaknesses()` excluding never-shown
 * visual types).
 */
export function buildRevisionProfile(
  topicRows: TopicProgressRow[],
  visualWeaknesses: VisualWeaknessEntry[]
): RevisionProfile {
  const strengths: TopicMasterySignal[] = []
  const weaknesses: TopicMasterySignal[] = []

  for (const row of topicRows) {
    if (row.status === 'NOT_STARTED') continue

    const signal: TopicMasterySignal = {
      subjectSlug: row.subjectSlug,
      topicSlug: row.topicSlug,
      title: titleFor(row.topicSlug),
      masteryPct: row.masteryPct,
      status: row.status,
      lastScore: row.lastScore,
    }

    if (row.status === 'MASTERED' || row.masteryPct >= TOPIC_STRENGTH_THRESHOLD_PCT) {
      strengths.push(signal)
    } else if (row.masteryPct < TOPIC_WEAKNESS_THRESHOLD_PCT) {
      weaknesses.push(signal)
    }
  }

  strengths.sort((a, b) => b.masteryPct - a.masteryPct)
  weaknesses.sort((a, b) => a.masteryPct - b.masteryPct)

  const recommendedRevisionTopics: RecommendedRevisionTopic[] = weaknesses
    .slice(0, MAX_RECOMMENDED_REVISION_TOPICS)
    .map((w) => ({ subjectSlug: w.subjectSlug, topicSlug: w.topicSlug, title: w.title, masteryPct: w.masteryPct }))

  return { strengths, weaknesses, visualWeaknesses, recommendedRevisionTopics }
}

/**
 * Task 2 — loads a user's persisted `TopicProgress` and visual mastery
 * data, and builds their `RevisionProfile`. The only Prisma call this
 * module adds; read-only, queries `TopicProgress` exclusively (the
 * visual data comes from Sprint N's own, already-existing Prisma call).
 */
export async function getRevisionProfile(userId: string): Promise<RevisionProfile> {
  const topicRows = await prisma.topicProgress.findMany({
    where: { userId },
    select: { subjectSlug: true, topicSlug: true, status: true, masteryPct: true, lastScore: true },
  })

  const visualProfile = await getVisualLearningProfile(userId)
  const visualWeaknesses = detectVisualWeaknesses(visualProfile)

  return buildRevisionProfile(topicRows, visualWeaknesses)
}
