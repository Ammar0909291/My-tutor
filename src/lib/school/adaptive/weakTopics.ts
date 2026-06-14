import { prisma } from '@/lib/db/prisma'
import { ALL_KG_NODES } from '@/lib/education'
import type { Chapter } from '@/lib/education'
import { getSchoolChapters, chapterDisplayTitle, SCHOOL_SUBJECT_META } from '@/lib/school/schoolRouting'

/**
 * Weak topic engine (Sprint BO) — deterministic scoring over existing
 * MistakeRecord + TopicProgress rows; no AI, no new tables.
 *
 * Scoring per weak node:
 *   base weight: assessment mistake = 3, practice mistake = 2, other = 1
 *   recency multiplier: ≤7 days = 2.0, ≤14 days = 1.5, ≤30 days = 1.0
 *   severity = Σ (weight × recency) over the node's mistakes
 *
 * Nodes whose TopicProgress is MASTERED are excluded — mastery recovers
 * the topic regardless of past mistakes.
 */

const LOOKBACK_DAYS = 30
const MAX_WEAK_TOPICS = 10

const CATEGORY_WEIGHTS: Record<string, number> = {
  chapter_assessment: 3,
  chapter_practice: 2,
}

const NODE_TITLES = new Map(ALL_KG_NODES.map((n) => [n.id, n.title]))

export interface WeakTopic {
  nodeId: string
  subjectSlug: string
  title: string
  severity: number
  lastSeen: Date
}

export interface RevisionChapter {
  subjectSlug: string
  chapterId: string
  chapterTitle: string
  weakTopics: WeakTopic[]
  severity: number
}

function recencyMultiplier(createdAt: Date, now: number): number {
  const ageDays = (now - createdAt.getTime()) / 86400000
  if (ageDays <= 7) return 2.0
  if (ageDays <= 14) return 1.5
  return 1.0
}

export async function getWeakTopics(userId: string): Promise<WeakTopic[]> {
  const since = new Date(Date.now() - LOOKBACK_DAYS * 86400000)
  const mistakes = await prisma.mistakeRecord.findMany({
    where: { userId, createdAt: { gte: since } },
    select: { subjectSlug: true, topicSlug: true, category: true, createdAt: true },
  }).catch(() => [] as { subjectSlug: string; topicSlug: string; category: string; createdAt: Date }[])
  if (mistakes.length === 0) return []

  // Exclude topics that have since been mastered
  const nodeIds = [...new Set(mistakes.map((m) => m.topicSlug))]
  const masteredRows = await prisma.topicProgress.findMany({
    where: { userId, topicSlug: { in: nodeIds }, status: 'MASTERED' },
    select: { subjectSlug: true, topicSlug: true },
  }).catch(() => [] as { subjectSlug: string; topicSlug: string }[])
  const mastered = new Set(masteredRows.map((r) => `${r.subjectSlug}:${r.topicSlug}`))

  const now = Date.now()
  const scores = new Map<string, WeakTopic>()
  for (const m of mistakes) {
    const key = `${m.subjectSlug}:${m.topicSlug}`
    if (mastered.has(key)) continue
    const weight = CATEGORY_WEIGHTS[m.category] ?? 1
    const score = weight * recencyMultiplier(m.createdAt, now)
    const existing = scores.get(key)
    if (existing) {
      existing.severity += score
      if (m.createdAt > existing.lastSeen) existing.lastSeen = m.createdAt
    } else {
      scores.set(key, {
        nodeId: m.topicSlug,
        subjectSlug: m.subjectSlug,
        title: NODE_TITLES.get(m.topicSlug) ?? m.topicSlug.replace(/[-_]/g, ' '),
        severity: score,
        lastSeen: m.createdAt,
      })
    }
  }

  return [...scores.values()]
    .sort((a, b) => b.severity - a.severity)
    .slice(0, MAX_WEAK_TOPICS)
}

export async function getWeakTopicsForSubject(userId: string, subjectSlug: string): Promise<WeakTopic[]> {
  const all = await getWeakTopics(userId)
  return all.filter((t) => t.subjectSlug === subjectSlug)
}

/**
 * Map weak KG nodes back to board chapters (Phase 2). Each chapter scores
 * the sum of its weak nodes' severities; chapters are returned strongest
 * first.
 */
export async function getRevisionChapters(
  userId: string,
  board: string,
  grade: number,
): Promise<RevisionChapter[]> {
  const weak = await getWeakTopics(userId)
  if (weak.length === 0) return []

  const bySubject = new Map<string, WeakTopic[]>()
  for (const t of weak) {
    const list = bySubject.get(t.subjectSlug) ?? []
    list.push(t)
    bySubject.set(t.subjectSlug, list)
  }

  const results: RevisionChapter[] = []
  for (const [subjectSlug, topics] of bySubject) {
    const chapters: Chapter[] = getSchoolChapters(board, subjectSlug, grade)
    for (const ch of chapters) {
      const hits = topics.filter((t) => ch.kgNodeIds.includes(t.nodeId))
      if (hits.length === 0) continue
      results.push({
        subjectSlug,
        chapterId: ch.id,
        chapterTitle: chapterDisplayTitle(ch.title),
        weakTopics: hits,
        severity: hits.reduce((sum, t) => sum + t.severity, 0),
      })
    }
  }

  return results.sort((a, b) => b.severity - a.severity)
}

export interface RevisionRecommendation {
  subjectSlug: string
  subjectLabel: string
  chapterId: string
  chapterTitle: string
  weakTopicTitles: string[]
}

/** Single top revision recommendation for the dashboard (Phase 3). */
export async function getRecommendedRevisionChapter(
  userId: string,
  board: string,
  grade: number,
): Promise<RevisionRecommendation | null> {
  const chapters = await getRevisionChapters(userId, board, grade)
  const top = chapters[0]
  if (!top) return null
  return {
    subjectSlug: top.subjectSlug,
    subjectLabel: SCHOOL_SUBJECT_META[top.subjectSlug]?.label ?? top.subjectSlug,
    chapterId: top.chapterId,
    chapterTitle: top.chapterTitle,
    weakTopicTitles: top.weakTopics.slice(0, 3).map((t) => t.title),
  }
}
