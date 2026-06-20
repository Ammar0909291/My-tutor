/**
 * Learning Difficulty Profile — Educational Intelligence Sprint 4
 * (Learning Difficulty Intelligence), Tasks 2/3.
 *
 * Identifies WHEN a learner is struggling by aggregating already-persisted
 * `TopicProgress` rows (mastery / attempts / revisions) and the
 * already-derived Sprint 1 `RevisionProfile` (weaknesses + visual
 * weaknesses) and Sprint 3 `RetestCandidatePlan` (retest flags) into a
 * read-only per-topic difficulty classification. Pure aggregation — no new
 * schema, no writes, no scoring/grading/XP semantics, no new mastery
 * system. Mirrors the architecture of `revisionProfile.ts` /
 * `practiceTargets.ts`: pure builder + classifier, plus one thin
 * Prisma-reading wrapper. DETECTION ONLY — this layer never attempts to
 * resolve difficulty (see docs/EDUCATIONAL_INTELLIGENCE_DIFFICULTY_AUDIT.md).
 */
import { prisma } from '@/lib/db/prisma'
import { ALL_KG_NODES } from '@/lib/education'
import { getRevisionProfile, type RevisionProfile } from './revisionProfile'
import { generatePracticeTargets } from './practiceTargets'
import { generateRetestCandidates, type RetestCandidatePlan } from './retestCandidates'

const NODE_TITLES = new Map(ALL_KG_NODES.map((n) => [n.id, n.title]))

function titleFor(topicSlug: string): string {
  return NODE_TITLES.get(topicSlug) ?? topicSlug.replace(/[-_]/g, ' ')
}

export type DifficultyLevel = 'low' | 'medium' | 'high'

/** Minimal shape this module needs from a `TopicProgress` row — callers may pass full Prisma rows. */
export interface TopicDifficultyRow {
  subjectSlug: string
  topicSlug: string
  status: string
  masteryPct: number
  attempts: number
  revisionCount: number
  lastScore: number | null
}

/** One topic, classified by how much the learner is struggling with it. Descriptive only — not a grade. */
export interface LearningDifficultyEntry {
  subjectSlug: string
  topicSlug: string
  topic: string
  masteryPct: number
  attempts: number
  revisions: number
  /** Whether this topic is currently flagged as a retest candidate (Sprint 3). 0 or 1. */
  retests: number
  /** Cross-cutting weak visual types (app's visual mastery is not topic-scoped — see audit). Context only. */
  visualWeaknesses: string[]
  difficultyLevel: DifficultyLevel
  /** Human-readable evidence behind the classification. */
  signals: string[]
}

export interface LearningDifficultyProfile {
  entries: LearningDifficultyEntry[]
  /** Profile-level weak visual types (from RevisionProfile.visualWeaknesses). */
  visualWeaknesses: string[]
  counts: Record<DifficultyLevel, number>
}

// ─── Classification thresholds (descriptive, NOT grading) ──────────────────────
/** masteryPct below this is severe weakness. */
export const MASTERY_SEVERE_PCT = 25
/** masteryPct below this is weakness (mirrors Sprint 1's TOPIC_WEAKNESS_THRESHOLD_PCT). */
export const MASTERY_WEAK_PCT = 50
/** masteryPct below this is shaky (not yet a strength). */
export const MASTERY_SHAKY_PCT = 75
/** attempts at/above this = heavy repeated retries. */
export const ATTEMPTS_HEAVY = 5
/** attempts at/above this = repeated retries (mirrors Sprint 2's ATTEMPT_ESCALATION_THRESHOLD). */
export const ATTEMPTS_REPEATED = 3
/** revisions at/above this = repeatedly re-revised. */
export const REVISIONS_REPEATED = 2

/** difficulty score → level. */
export const HIGH_SCORE_MIN = 5
export const MEDIUM_SCORE_MIN = 3

/**
 * Deterministic, evidence-based classifier. Returns the difficulty level and
 * the signals that produced it. Pure — no I/O, no randomness.
 */
/**
 * Note on visual weakness: the app's visual mastery is keyed by visual
 * type, NOT by topic (see audit), so it is a cross-cutting signal and is
 * deliberately NOT added to a topic's difficulty score — doing so would
 * uniformly inflate every topic whenever any visual weakness exists. It is
 * attached to struggling entries as context (and drives visual adaptations)
 * but never changes the LOW/MEDIUM/HIGH classification itself.
 */
export function classifyDifficulty(input: {
  masteryPct: number
  attempts: number
  revisions: number
  isRetestCandidate: boolean
}): { level: DifficultyLevel; score: number; signals: string[] } {
  const { masteryPct, attempts, revisions, isRetestCandidate } = input
  const signals: string[] = []
  let score = 0

  if (masteryPct < MASTERY_SEVERE_PCT) { score += 3; signals.push('severely weak mastery') }
  else if (masteryPct < MASTERY_WEAK_PCT) { score += 2; signals.push('weak mastery') }
  else if (masteryPct < MASTERY_SHAKY_PCT) { score += 1; signals.push('shaky mastery') }

  if (attempts >= ATTEMPTS_HEAVY) { score += 2; signals.push('many repeated retries') }
  else if (attempts >= ATTEMPTS_REPEATED) { score += 1; signals.push('repeated retries') }

  // Poor retention: re-revised repeatedly yet mastery is still below the weakness line.
  if (revisions >= REVISIONS_REPEATED) {
    score += 1
    signals.push('repeated revisions')
    if (masteryPct < MASTERY_WEAK_PCT) { score += 1; signals.push('poor retention (revised but still weak)') }
  }

  if (isRetestCandidate) { score += 1; signals.push('flagged for retesting') }

  const level: DifficultyLevel = score >= HIGH_SCORE_MIN ? 'high' : score >= MEDIUM_SCORE_MIN ? 'medium' : 'low'
  return { level, score, signals }
}

function retestTopicKeys(plan: RetestCandidatePlan): Set<string> {
  const keys = new Set<string>()
  for (const band of [plan.high, plan.medium, plan.low]) {
    for (const c of band) {
      if (c.subjectSlug && c.topicSlug) keys.add(`${c.subjectSlug}:${c.topicSlug}`)
    }
  }
  return keys
}

/**
 * Task 2/3 — builds the per-topic difficulty profile from already-fetched
 * rows and already-derived intelligence. Pure function: no Prisma, no I/O.
 * NOT_STARTED topics are excluded — no attempt is not a struggle signal
 * (mirrors `buildRevisionProfile`'s handling).
 */
export function buildLearningDifficultyProfile(
  topicRows: TopicDifficultyRow[],
  revisionProfile: RevisionProfile,
  retestPlan: RetestCandidatePlan
): LearningDifficultyProfile {
  const visualWeaknessLabels = revisionProfile.visualWeaknesses.map((v) => v.visualType)
  const retestKeys = retestTopicKeys(retestPlan)

  const entries: LearningDifficultyEntry[] = []
  for (const row of topicRows) {
    if (row.status === 'NOT_STARTED') continue
    const key = `${row.subjectSlug}:${row.topicSlug}`
    const isRetestCandidate = retestKeys.has(key)
    const { level, signals } = classifyDifficulty({
      masteryPct: row.masteryPct,
      attempts: row.attempts,
      revisions: row.revisionCount,
      isRetestCandidate,
    })

    entries.push({
      subjectSlug: row.subjectSlug,
      topicSlug: row.topicSlug,
      topic: titleFor(row.topicSlug),
      masteryPct: row.masteryPct,
      attempts: row.attempts,
      revisions: row.revisionCount,
      retests: isRetestCandidate ? 1 : 0,
      // Cross-cutting: attach weak visual types only to topics already struggling, as context.
      visualWeaknesses: level === 'low' ? [] : visualWeaknessLabels,
      difficultyLevel: level,
      signals,
    })
  }

  // Hardest first.
  const order: Record<DifficultyLevel, number> = { high: 0, medium: 1, low: 2 }
  entries.sort((a, b) => order[a.difficultyLevel] - order[b.difficultyLevel] || a.masteryPct - b.masteryPct)

  const counts: Record<DifficultyLevel, number> = { low: 0, medium: 0, high: 0 }
  for (const e of entries) counts[e.difficultyLevel]++

  return { entries, visualWeaknesses: visualWeaknessLabels, counts }
}

export interface DifficultySummary {
  high: LearningDifficultyEntry[]
  medium: LearningDifficultyEntry[]
  low: LearningDifficultyEntry[]
}

/**
 * Task 3 — groups the profile's entries into LOW / MEDIUM / HIGH bands.
 * Pure derivation over `buildLearningDifficultyProfile`'s output; no new
 * mastery computation.
 */
export function detectLearningDifficulties(profile: LearningDifficultyProfile): DifficultySummary {
  const summary: DifficultySummary = { high: [], medium: [], low: [] }
  for (const e of profile.entries) summary[e.difficultyLevel].push(e)
  return summary
}

/**
 * Task 2/3 — loads a user's persisted `TopicProgress` and already-derived
 * Sprint 1/2/3 intelligence, and builds their difficulty profile. The only
 * Prisma call this module adds is the `TopicProgress` read (attempts /
 * revisions / mastery); the RevisionProfile fetches its own data via Sprint
 * 1's existing wrapper. Read-only.
 */
export async function getLearningDifficultyProfile(userId: string): Promise<LearningDifficultyProfile> {
  const revisionProfile = await getRevisionProfile(userId)

  const topicRows = await prisma.topicProgress.findMany({
    where: { userId },
    select: {
      subjectSlug: true, topicSlug: true, status: true,
      masteryPct: true, attempts: true, revisionCount: true, lastScore: true,
    },
  })

  // Reuse Sprints 2/3 to derive the retest flags (no recomputation of mastery).
  const practiceTargets = generatePracticeTargets(
    revisionProfile,
    topicRows.map((r) => ({ subjectSlug: r.subjectSlug, topicSlug: r.topicSlug, attempts: r.attempts }))
  )
  const retestPlan = generateRetestCandidates(practiceTargets)

  return buildLearningDifficultyProfile(topicRows, revisionProfile, retestPlan)
}
