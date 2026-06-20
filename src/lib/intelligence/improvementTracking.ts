/**
 * Improvement Tracking — Educational Intelligence Sprint 4, Tasks 2/3.
 *
 * Answers "is the learner getting better?" by comparing the earliest
 * and latest already-persisted score/completion signal for each
 * topic/visual type — never by inventing a new mastery system.
 * `TopicProgress.masteryPct` is a single overwritten snapshot (see
 * docs/EDUCATIONAL_INTELLIGENCE_IMPROVEMENT_AUDIT.md), so the actual
 * "previous vs current" comparison comes from `PracticeSession`'s
 * never-overwritten, timestamped per-attempt scores and
 * `EvidenceRecord(VISUAL)`'s timestamped per-row evidence — both
 * already-persisted, read-only. Pure function, no Prisma dependency,
 * no writes, no grading/scoring changes. Reuses Sprint 1's
 * `RevisionProfile` (for titles) and Sprints 2/3's `PracticeTargetPlan`/
 * `RetestCandidatePlan` (for context-only flagging), never recomputing
 * any of them.
 */
import type { RevisionProfile } from './revisionProfile'
import type { PracticeTargetPlan } from './practiceTargets'
import type { RetestCandidatePlan } from './retestCandidates'

export type ImprovementStatus = 'improving' | 'stable' | 'declining'

/** Example (per the Sprint 4 brief): `{ topic: "Photosynthesis", previousMastery: 22, currentMastery: 48, improvementPct: 26, status: "improving" }`. */
export interface TopicImprovementEntry {
  topic: string
  previousMastery: number
  currentMastery: number
  improvementPct: number
  status: ImprovementStatus
  /** Present for topic-based entries; omitted for visual-based entries. */
  subjectSlug?: string
  topicSlug?: string
  /** Present for visual-based entries; omitted for topic-based entries. */
  visualType?: string
  /** True if this topic/visual area currently appears in the Sprint 2/3 practice-target or retest-candidate plans. Context only — never used to compute the trend itself. */
  flagged: boolean
}

export interface ImprovementSummary {
  improving: TopicImprovementEntry[]
  stable: TopicImprovementEntry[]
  declining: TopicImprovementEntry[]
}

/** One already-resolved (KG-node-keyed, not chapterId-keyed — see audit) timestamped practice/assessment score. */
export interface TopicScoreHistoryRow {
  subjectSlug: string
  topicSlug: string
  score: number
  completedAt: Date
}

/** One persisted `EvidenceRecord(type: VISUAL)` row's relevant fields, read a second time alongside `getVisualLearningProfile()`. */
export interface VisualEvidenceHistoryRow {
  visualType: string
  shown: number
  completed: number
  createdAt: Date
}

/** |improvementPct| below this magnitude is treated as no meaningful change. */
export const IMPROVEMENT_THRESHOLD_PCT = 10

function classify(improvementPct: number): ImprovementStatus {
  if (improvementPct >= IMPROVEMENT_THRESHOLD_PCT) return 'improving'
  if (improvementPct <= -IMPROVEMENT_THRESHOLD_PCT) return 'declining'
  return 'stable'
}

function titleMap(profile: RevisionProfile): Map<string, string> {
  const map = new Map<string, string>()
  for (const s of [...profile.strengths, ...profile.weaknesses]) {
    map.set(`${s.subjectSlug}:${s.topicSlug}`, s.title)
  }
  return map
}

function flaggedKeys(targets?: PracticeTargetPlan, retestCandidates?: RetestCandidatePlan): Set<string> {
  const keys = new Set<string>()
  const addAll = (list?: { subjectSlug?: string; topicSlug?: string; visualType?: string }[]) => {
    for (const item of list ?? []) {
      if (item.subjectSlug && item.topicSlug) keys.add(`${item.subjectSlug}:${item.topicSlug}`)
      if (item.visualType) keys.add(`visual:${item.visualType}`)
    }
  }
  if (targets) { addAll(targets.high); addAll(targets.medium); addAll(targets.low) }
  if (retestCandidates) { addAll(retestCandidates.high); addAll(retestCandidates.medium); addAll(retestCandidates.low) }
  return keys
}

/**
 * Task 3 — builds an improvement summary from already-persisted score
 * history. A topic/visual type needs at least two history points to
 * produce a trend; topics with only one attempt (or none) are omitted
 * rather than guessed at.
 */
export function analyzeImprovement(
  profile: RevisionProfile,
  historyRows: TopicScoreHistoryRow[] = [],
  visualHistoryRows: VisualEvidenceHistoryRow[] = [],
  targets?: PracticeTargetPlan,
  retestCandidates?: RetestCandidatePlan
): ImprovementSummary {
  const titles = titleMap(profile)
  const flagged = flaggedKeys(targets, retestCandidates)
  const summary: ImprovementSummary = { improving: [], stable: [], declining: [] }

  const byTopic = new Map<string, TopicScoreHistoryRow[]>()
  for (const row of historyRows) {
    const key = `${row.subjectSlug}:${row.topicSlug}`
    const list = byTopic.get(key) ?? []
    list.push(row)
    byTopic.set(key, list)
  }
  for (const [key, rows] of byTopic) {
    if (rows.length < 2) continue
    const sorted = [...rows].sort((a, b) => a.completedAt.getTime() - b.completedAt.getTime())
    const previousMastery = sorted[0].score
    const currentMastery = sorted[sorted.length - 1].score
    const improvementPct = currentMastery - previousMastery
    const status = classify(improvementPct)
    const [subjectSlug, topicSlug] = key.split(':')
    summary[status].push({
      topic: titles.get(key) ?? topicSlug.replace(/[-_]/g, ' '),
      previousMastery,
      currentMastery,
      improvementPct,
      status,
      subjectSlug,
      topicSlug,
      flagged: flagged.has(key),
    })
  }

  const byVisual = new Map<string, VisualEvidenceHistoryRow[]>()
  for (const row of visualHistoryRows) {
    const list = byVisual.get(row.visualType) ?? []
    list.push(row)
    byVisual.set(row.visualType, list)
  }
  for (const [visualType, rows] of byVisual) {
    if (rows.length < 2) continue
    const sorted = [...rows].sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
    const mid = Math.floor(sorted.length / 2)
    const rateOf = (group: VisualEvidenceHistoryRow[]) => {
      const shown = group.reduce((sum, r) => sum + r.shown, 0)
      const completed = group.reduce((sum, r) => sum + r.completed, 0)
      return shown > 0 ? Math.round((completed / shown) * 100) : 0
    }
    const previousMastery = rateOf(sorted.slice(0, mid))
    const currentMastery = rateOf(sorted.slice(mid))
    const improvementPct = currentMastery - previousMastery
    const status = classify(improvementPct)
    summary[status].push({
      topic: `${visualType} activities`,
      previousMastery,
      currentMastery,
      improvementPct,
      status,
      visualType,
      flagged: flagged.has(`visual:${visualType}`),
    })
  }

  return summary
}
