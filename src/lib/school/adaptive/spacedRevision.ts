/**
 * Spaced Revision & Forgetting Curve Engine (Sprint CA).
 * Uses existing TopicProgress fields (completedAt, revisionCount, lastRevisionAt)
 * to compute review schedules — no new tables.
 *
 * Default intervals (days): 1 → 3 → 7 → 14 → 30 → 90
 * Correct review: advance stage (longer interval)
 * Failed review:  regress stage (shorter interval), floor at stage 0
 */

import { prisma } from '@/lib/db/prisma'
import { ALL_KG_NODES } from '@/lib/education'

/** Days between reviews per stage. Index = current revisionCount. */
export const REVIEW_INTERVALS_DAYS = [1, 3, 7, 14, 30, 90]

export interface RevisionState {
  nodeId: string
  subjectSlug: string
  title: string
  lastMasteredAt: Date | null
  nextReviewAt: Date | null
  /** 0-100: based on stage depth; higher = more durable memory */
  reviewStrength: number
  /** How many times successfully reviewed */
  reviewCount: number
  isDue: boolean
}

const NODE_TITLES = new Map(ALL_KG_NODES.map((n) => [n.id, n.title]))

function computeNextReviewAt(
  completedAt: Date | null,
  lastRevisionAt: Date | null,
  revisionCount: number,
): Date | null {
  const base = lastRevisionAt ?? completedAt
  if (!base) return null
  const stage = Math.min(revisionCount, REVIEW_INTERVALS_DAYS.length - 1)
  return new Date(base.getTime() + REVIEW_INTERVALS_DAYS[stage] * 86400000)
}

function computeStrength(revisionCount: number): number {
  const maxStage = REVIEW_INTERVALS_DAYS.length - 1
  return Math.round(Math.min(revisionCount / maxStage, 1) * 100)
}

/**
 * Get revision states for a set of KG node IDs.
 * Only nodes with TopicProgress COMPLETED/MASTERED/REVISION are returned.
 */
export async function getRevisionStates(
  userId: string,
  subjectSlug: string,
  nodeIds: string[],
): Promise<RevisionState[]> {
  if (nodeIds.length === 0) return []

  const rows = await prisma.topicProgress.findMany({
    where: {
      userId,
      subjectSlug,
      topicSlug: { in: nodeIds },
      status: { in: ['COMPLETED', 'MASTERED', 'REVISION'] },
    },
    select: {
      topicSlug: true,
      status: true,
      completedAt: true,
      revisionCount: true,
      lastRevisionAt: true,
    },
  }).catch(() => [])

  const now = Date.now()
  return rows.map((row) => {
    const nextReviewAt = computeNextReviewAt(row.completedAt, row.lastRevisionAt, row.revisionCount)
    return {
      nodeId: row.topicSlug,
      subjectSlug,
      title: NODE_TITLES.get(row.topicSlug) ?? row.topicSlug,
      lastMasteredAt: row.completedAt,
      nextReviewAt,
      reviewStrength: computeStrength(row.revisionCount),
      reviewCount: row.revisionCount,
      isDue: nextReviewAt !== null && nextReviewAt.getTime() <= now,
    }
  })
}

/**
 * Get overdue revision items — nodes due today or overdue.
 * Pass nodeIds to scope to a specific chapter; omit for all subject nodes.
 */
export async function getDueRevisions(
  userId: string,
  subjectSlug: string,
  nodeIds?: string[],
): Promise<RevisionState[]> {
  const rows = await prisma.topicProgress.findMany({
    where: {
      userId,
      subjectSlug,
      status: { in: ['COMPLETED', 'MASTERED', 'REVISION'] },
      ...(nodeIds && nodeIds.length > 0 ? { topicSlug: { in: nodeIds } } : {}),
    },
    select: {
      topicSlug: true,
      completedAt: true,
      revisionCount: true,
      lastRevisionAt: true,
    },
  }).catch(() => [])

  const now = Date.now()
  return rows
    .map((row) => {
      const nextReviewAt = computeNextReviewAt(row.completedAt, row.lastRevisionAt, row.revisionCount)
      return {
        nodeId: row.topicSlug,
        subjectSlug,
        title: NODE_TITLES.get(row.topicSlug) ?? row.topicSlug,
        lastMasteredAt: row.completedAt,
        nextReviewAt,
        reviewStrength: computeStrength(row.revisionCount),
        reviewCount: row.revisionCount,
        isDue: nextReviewAt !== null && nextReviewAt.getTime() <= now,
      }
    })
    .filter((s) => s.isDue)
}

/**
 * Record a revision attempt for a node.
 * passed = true  → advance stage (increase interval)
 * passed = false → regress stage (decrease interval), minimum 0
 *
 * Called from chat route after a passing/failing in-session checkpoint on
 * a previously-mastered node.
 */
export async function advanceRevision(
  userId: string,
  subjectSlug: string,
  nodeId: string,
  passed: boolean,
): Promise<void> {
  const key = { userId_subjectSlug_topicSlug: { userId, subjectSlug, topicSlug: nodeId } }
  const existing = await prisma.topicProgress.findUnique({ where: key, select: { revisionCount: true } }).catch(() => null)
  if (!existing) return

  const currentStage = existing.revisionCount
  const newStage = passed
    ? Math.min(currentStage + 1, REVIEW_INTERVALS_DAYS.length - 1)
    : Math.max(currentStage - 1, 0)

  await prisma.topicProgress.update({
    where: key,
    data: {
      revisionCount: newStage,
      lastRevisionAt: new Date(),
      status: passed ? 'MASTERED' : 'REVISION',
    },
  }).catch(() => {})
}

/** System prompt block injected when revisions are due. */
export function buildRevisionBlock(dueStates: RevisionState[]): string {
  if (dueStates.length === 0) return ''

  const titles = dueStates.slice(0, 3).map((s) => s.title)
  return `\n\nDUE FOR REVIEW — the following concepts were mastered earlier and are due for a memory refresh:
Concepts: ${titles.join(', ')}
Instructions for review mode:
- Begin with a quick recall question: "Can you tell me what you remember about [concept]?"
- Do NOT re-teach the entire topic from scratch — it was already mastered.
- Use 1-2 short questions to gauge retention, then fill only genuine gaps.
- If recall is good, confirm and move on — celebrate their retention.
- If recall is weak, give a compact 3-sentence refresher, then a follow-up check.
- Limit review to 3-4 exchanges per concept before returning to the main lesson.`
}

/**
 * Badge for the chapter workspace page.
 * Returns 'review_due' if any node is overdue,
 * 'recently_mastered' if mastered within the last 3 days but not yet due,
 * null otherwise.
 */
export function getRevisionBadge(
  states: RevisionState[],
): 'review_due' | 'recently_mastered' | null {
  if (states.some((s) => s.isDue)) return 'review_due'
  const threeDaysAgo = Date.now() - 3 * 86400000
  if (states.some((s) => s.lastMasteredAt && s.lastMasteredAt.getTime() >= threeDaysAgo)) {
    return 'recently_mastered'
  }
  return null
}

/**
 * Get overdue revision nodes across all subjects for a board/grade.
 * Used by the daily plan to inject revision tasks.
 */
export async function getDueRevisionsBySubjects(
  userId: string,
  subjectSlugs: string[],
): Promise<Array<{ nodeId: string; subjectSlug: string; title: string; nextReviewAt: Date | null }>> {
  if (subjectSlugs.length === 0) return []

  const rows = await prisma.topicProgress.findMany({
    where: {
      userId,
      subjectSlug: { in: subjectSlugs },
      status: { in: ['COMPLETED', 'MASTERED', 'REVISION'] },
    },
    select: {
      topicSlug: true,
      subjectSlug: true,
      completedAt: true,
      revisionCount: true,
      lastRevisionAt: true,
    },
  }).catch(() => [])

  const now = Date.now()
  return rows
    .filter((row) => {
      const next = computeNextReviewAt(row.completedAt, row.lastRevisionAt, row.revisionCount)
      return next !== null && next.getTime() <= now
    })
    .map((row) => ({
      nodeId: row.topicSlug,
      subjectSlug: row.subjectSlug,
      title: NODE_TITLES.get(row.topicSlug) ?? row.topicSlug,
      nextReviewAt: computeNextReviewAt(row.completedAt, row.lastRevisionAt, row.revisionCount),
    }))
    .sort((a, b) => (a.nextReviewAt?.getTime() ?? 0) - (b.nextReviewAt?.getTime() ?? 0))
}
