/**
 * Lesson Planner (Sprint BY).
 * Derives a lightweight chapter roadmap from existing data — no AI, no new tables.
 *
 * Concept status per KG node:
 *   mastered  — TopicProgress COMPLETED/MASTERED/REVISION, or checkpoint pass rate ≥80% (≥2 checks)
 *   current   — TopicProgress IN_PROGRESS, or first non-mastered concept in order
 *   remaining — all non-mastered concepts after current
 */

import { prisma } from '@/lib/db/prisma'
import type { KnowledgeNode } from '@/lib/education'

export interface ConceptStatus {
  nodeId: string
  title: string
  status: 'mastered' | 'current' | 'remaining'
}

export interface LessonPlan {
  currentChapter: string
  currentConcept: ConceptStatus | null
  masteredConcepts: ConceptStatus[]
  remainingConcepts: ConceptStatus[]
  nextConcept: ConceptStatus | null
  recommendedCheckpoint: boolean
  recommendedPractice: boolean
  /** 0-100 rough chapter completion pct */
  estimatedCompletion: number
}

const CHECKPOINT_LOOKBACK_DAYS = 14

export async function buildLessonPlan(
  userId: string,
  subjectSlug: string,
  chapterId: string,
  chapterTitle: string,
  kgNodes: KnowledgeNode[],
): Promise<LessonPlan> {
  if (kgNodes.length === 0) {
    return {
      currentChapter: chapterTitle,
      currentConcept: null,
      masteredConcepts: [],
      remainingConcepts: [],
      nextConcept: null,
      recommendedCheckpoint: false,
      recommendedPractice: false,
      estimatedCompletion: 0,
    }
  }

  const nodeIds = kgNodes.map((n) => n.id)
  const since = new Date(Date.now() - CHECKPOINT_LOOKBACK_DAYS * 86400000)

  const [topicProgressRows, checkpointRows, practiceSessions] = await Promise.all([
    prisma.topicProgress.findMany({
      where: { userId, subjectSlug, topicSlug: { in: nodeIds } },
      select: { topicSlug: true, status: true, masteryPct: true },
    }).catch(() => [] as { topicSlug: string; status: string; masteryPct: number }[]),
    prisma.learningCheckpoint.findMany({
      where: { userId, subjectSlug, chapterId, createdAt: { gte: since } },
      select: { kgNodeId: true, passed: true },
    }).catch(() => [] as { kgNodeId: string | null; passed: boolean }[]),
    prisma.practiceSession.findMany({
      where: { userId, subjectSlug, chapterId, completedAt: { not: null } },
      select: { score: true, kind: true },
      orderBy: { createdAt: 'desc' },
      take: 5,
    }).catch(() => [] as { score: number | null; kind: string }[]),
  ])

  // Build per-node checkpoint pass rates
  const checkpointsByNode = new Map<string, { passed: number; total: number }>()
  for (const row of checkpointRows) {
    if (!row.kgNodeId) continue
    const entry = checkpointsByNode.get(row.kgNodeId) ?? { passed: 0, total: 0 }
    entry.total++
    if (row.passed) entry.passed++
    checkpointsByNode.set(row.kgNodeId, entry)
  }

  const progressBySlug = new Map(topicProgressRows.map((r) => [r.topicSlug, r]))

  // Classify each node
  const classified: ConceptStatus[] = kgNodes.map((node) => {
    const prog = progressBySlug.get(node.id)
    const cpStats = checkpointsByNode.get(node.id)

    const masteredByProgress = prog
      ? ['COMPLETED', 'MASTERED', 'REVISION'].includes(prog.status)
      : false
    const masteredByCheckpoint = cpStats
      ? cpStats.total >= 2 && cpStats.passed / cpStats.total >= 0.8
      : false

    if (masteredByProgress || masteredByCheckpoint) {
      return { nodeId: node.id, title: node.title, status: 'mastered' as const }
    }

    return { nodeId: node.id, title: node.title, status: 'remaining' as const }
  })

  // Find "current": prefer IN_PROGRESS from TopicProgress, else first remaining
  const inProgressNodeId = topicProgressRows.find((r) => r.status === 'IN_PROGRESS')?.topicSlug
  let currentIdx = inProgressNodeId
    ? classified.findIndex((c) => c.nodeId === inProgressNodeId && c.status === 'remaining')
    : -1
  if (currentIdx === -1) {
    currentIdx = classified.findIndex((c) => c.status === 'remaining')
  }

  if (currentIdx !== -1) {
    classified[currentIdx] = { ...classified[currentIdx], status: 'current' }
  }

  const masteredConcepts = classified.filter((c) => c.status === 'mastered')
  const currentConcept = classified.find((c) => c.status === 'current') ?? null
  const remainingAfterCurrent = classified.filter((c) => c.status === 'remaining')
  const nextConcept = remainingAfterCurrent[0] ?? null

  // Completion estimate: mastered + (0.5 if current exists) over total
  const totalNodes = kgNodes.length
  const completionScore = masteredConcepts.length + (currentConcept ? 0.5 : 0)
  const estimatedCompletion = totalNodes > 0
    ? Math.round((completionScore / totalNodes) * 100)
    : 0

  // Recommend checkpoint: current concept exists and no recent checkpoint checks for it
  const currentNodeCheckpoints = currentConcept
    ? checkpointsByNode.get(currentConcept.nodeId)
    : null
  const recommendedCheckpoint = currentConcept !== null && (!currentNodeCheckpoints || currentNodeCheckpoints.total < 2)

  // Recommend practice: low practice score or no completed practice sessions
  const completedPractice = practiceSessions.filter((s) => s.kind === 'practice')
  const avgPractice = completedPractice.length > 0
    ? completedPractice.reduce((s, r) => s + (r.score ?? 0), 0) / completedPractice.length
    : null
  const recommendedPractice = avgPractice === null || avgPractice < 70

  return {
    currentChapter: chapterTitle,
    currentConcept,
    masteredConcepts,
    remainingConcepts: remainingAfterCurrent,
    nextConcept,
    recommendedCheckpoint,
    recommendedPractice,
    estimatedCompletion,
  }
}

/** System prompt block injected into the tutor. */
export function buildLessonPlanBlock(plan: LessonPlan): string {
  if (!plan.currentConcept && plan.masteredConcepts.length === 0) return ''

  const lines: string[] = [
    `\n\nCURRENT LESSON PLAN — "${plan.currentChapter}":`,
  ]

  if (plan.masteredConcepts.length > 0) {
    lines.push(`Mastered (do NOT re-teach from scratch): ${plan.masteredConcepts.map((c) => c.title).join(', ')}`)
  }

  if (plan.currentConcept) {
    lines.push(`Current concept to teach NOW: ${plan.currentConcept.title}`)
  }

  if (plan.nextConcept) {
    lines.push(`Next concept (teach only after current is understood): ${plan.nextConcept.title}`)
  }

  if (plan.remainingConcepts.length > 1) {
    const upcoming = plan.remainingConcepts.slice(1).map((c) => c.title)
    lines.push(`Upcoming concepts (do NOT jump ahead): ${upcoming.join(', ')}`)
  }

  lines.push(
    `Instructions:`,
    `- Focus exclusively on the current concept unless the student asks about something else.`,
    `- Do not repeat explanations of mastered concepts — reference them as context only.`,
    `- When the current concept is understood, naturally transition to the next concept.`,
    `- Chapter completion: ${plan.estimatedCompletion}%.`,
  )

  if (plan.recommendedCheckpoint) {
    lines.push(`- Ask an understanding check question for "${plan.currentConcept?.title ?? 'the current concept'}" after your explanation.`)
  }
  if (plan.recommendedPractice) {
    lines.push(`- Encourage the student to try practice questions for this chapter when a natural break arises.`)
  }

  return lines.join('\n')
}

/** Flat card data for the chapter workspace UI. Max 4 visible items. */
export function getLessonPlanCardItems(plan: LessonPlan): Array<{ title: string; status: 'mastered' | 'current' | 'remaining' }> {
  const all: Array<{ title: string; status: 'mastered' | 'current' | 'remaining' }> = [
    ...plan.masteredConcepts.map((c) => ({ title: c.title, status: 'mastered' as const })),
    ...(plan.currentConcept ? [{ title: plan.currentConcept.title, status: 'current' as const }] : []),
    ...plan.remainingConcepts.map((c) => ({ title: c.title, status: 'remaining' as const })),
  ]

  // Show at most 4 items, keeping current visible
  if (all.length <= 4) return all

  const currentIdx = all.findIndex((c) => c.status === 'current')
  if (currentIdx === -1) return all.slice(0, 4)

  // Window: show up to 1 mastered before current, current, and fill rest with remaining
  const start = Math.max(0, currentIdx - 1)
  return all.slice(start, start + 4)
}
