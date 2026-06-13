/**
 * Knowledge Gap Bridging & Prerequisite Recovery (Sprint CB).
 * Deterministic — uses existing KG prerequisite links + TopicProgress +
 * MistakeRecord + LearningCheckpoint. No AI, no new tables.
 *
 * Algorithm:
 *   1. Find the weakest KG node(s) in the chapter (mistakes + failed checkpoints)
 *   2. Walk KG prerequisites for those nodes
 *   3. Return first gap where the prerequisite is NOT mastered
 *
 * Confidence = HIGH only when:
 *   - Node has recent mistakes (≥2) OR ≥1 failed checkpoint in last 7 days
 *   - AND the prerequisite node has never been mastered (no MASTERED/COMPLETED row)
 * Confidence = MEDIUM when:
 *   - Node has ≥1 mistake OR ≥1 failed checkpoint
 *   - AND prerequisite is IN_PROGRESS or NOT_STARTED with masteryPct < 50
 */

import { prisma } from '@/lib/db/prisma'
import { ALL_KG_NODES } from '@/lib/education'
import type { KnowledgeNode } from '@/lib/education'

export interface PrerequisiteGap {
  weakNodeId: string
  weakNodeTitle: string
  missingPrereqId: string
  missingPrereqTitle: string
  confidence: 'low' | 'medium' | 'high'
  subjectSlug: string
}

export interface PrerequisiteChapterTarget {
  chapterId: string
  chapterTitle: string
  subjectSlug: string
  missingPrereqTitle: string
}

const LOOKBACK_DAYS = 7
const KG_BY_ID = new Map(ALL_KG_NODES.map((n) => [n.id, n]))

/**
 * Detect the most likely prerequisite gap for the current chapter.
 * Returns null when there is no high/medium confidence gap.
 */
export async function detectPrerequisiteGap(
  userId: string,
  subjectSlug: string,
  chapterId: string,
  kgNodes: KnowledgeNode[],
): Promise<PrerequisiteGap | null> {
  if (kgNodes.length === 0) return null

  const nodeIds = kgNodes.map((n) => n.id)
  const since = new Date(Date.now() - LOOKBACK_DAYS * 86400000)

  const [mistakeRows, checkpointRows, progressRows] = await Promise.all([
    prisma.mistakeRecord.findMany({
      where: { userId, subjectSlug, topicSlug: { in: nodeIds }, createdAt: { gte: since } },
      select: { topicSlug: true },
    }).catch(() => [] as { topicSlug: string }[]),
    prisma.learningCheckpoint.findMany({
      where: { userId, subjectSlug, chapterId, createdAt: { gte: since } },
      select: { kgNodeId: true, passed: true },
    }).catch(() => [] as { kgNodeId: string | null; passed: boolean }[]),
    prisma.topicProgress.findMany({
      where: { userId },
      select: { topicSlug: true, subjectSlug: true, status: true, masteryPct: true },
    }).catch(() => [] as { topicSlug: string; subjectSlug: string; status: string; masteryPct: number }[]),
  ])

  // Build weakness scores per node (mistakes + failed checkpoints)
  const mistakeCount = new Map<string, number>()
  for (const m of mistakeRows) {
    mistakeCount.set(m.topicSlug, (mistakeCount.get(m.topicSlug) ?? 0) + 1)
  }
  const failedCheckpoints = new Map<string, number>()
  for (const c of checkpointRows) {
    if (!c.kgNodeId || c.passed) continue
    failedCheckpoints.set(c.kgNodeId, (failedCheckpoints.get(c.kgNodeId) ?? 0) + 1)
  }

  // Build a global progress map: topicSlug → status
  const progressMap = new Map(progressRows.map((r) => [`${r.subjectSlug}:${r.topicSlug}`, r]))

  function isMastered(nodeId: string): boolean {
    // Check if the node is mastered in ANY subject (prerequisite nodes may be from a different grade but same subject)
    const anyRow = progressRows.find((r) => r.topicSlug === nodeId)
    if (!anyRow) return false
    return anyRow.status === 'MASTERED' || anyRow.status === 'COMPLETED'
  }

  function isWeakOrUnstarted(nodeId: string): boolean {
    const anyRow = progressRows.find((r) => r.topicSlug === nodeId)
    if (!anyRow) return true // never touched
    return !['MASTERED', 'COMPLETED'].includes(anyRow.status) || anyRow.masteryPct < 60
  }

  // Sort chapter nodes by weakness (most struggling first)
  const scored = kgNodes
    .map((n) => ({
      node: n,
      score: (mistakeCount.get(n.id) ?? 0) * 2 + (failedCheckpoints.get(n.id) ?? 0),
    }))
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)

  if (scored.length === 0) return null

  // Walk prerequisites of the weakest node
  for (const { node, score } of scored) {
    for (const prereqId of node.prerequisites) {
      const prereqNode = KG_BY_ID.get(prereqId)
      if (!prereqNode) continue

      const prereqWeak = isWeakOrUnstarted(prereqId)
      if (!prereqWeak) continue // prerequisite is already mastered — not the cause

      // Confidence scoring
      const mistakes = mistakeCount.get(node.id) ?? 0
      const fails = failedCheckpoints.get(node.id) ?? 0
      let confidence: 'low' | 'medium' | 'high'
      if ((mistakes >= 2 || fails >= 1) && !isMastered(prereqId)) {
        confidence = 'high'
      } else if ((mistakes >= 1 || fails >= 1) && isWeakOrUnstarted(prereqId)) {
        confidence = 'medium'
      } else {
        confidence = 'low'
      }

      return {
        weakNodeId: node.id,
        weakNodeTitle: node.title,
        missingPrereqId: prereqId,
        missingPrereqTitle: prereqNode.title,
        confidence,
        subjectSlug,
      }
    }
  }

  return null
}

/** System prompt block for the tutor when a prerequisite gap is detected. */
export function buildPrerequisiteAlertBlock(gap: PrerequisiteGap): string {
  return `\n\nPREREQUISITE ALERT (confidence: ${gap.confidence}):
Student is currently struggling with: "${gap.weakNodeTitle}"
Likely missing prerequisite: "${gap.missingPrereqTitle}"
Instructions:
- Do NOT restart the chapter or re-teach the current topic from scratch.
- Begin with a very short (2–3 question) diagnostic to confirm the gap: "Let me check one quick thing — can you tell me [simple prerequisite question]?"
- If confirmed: give ONE compact worked example covering the prerequisite, then bridge back: "Now that we've refreshed [prerequisite], let's see how it applies to [current topic]."
- If NOT confirmed (student actually knows the prerequisite): skip the bridge and continue the current lesson normally.
- Keep the bridge to 3–4 exchanges maximum. The goal is a fast repair, not a full lesson.
- Celebrate when they connect the dots: "See how fractions made that easier?"`
}

/**
 * Find the chapter that introduces/covers the prerequisite node.
 * Used by the daily plan to create a bridge_prerequisite task.
 */
export function findPrerequisiteChapter(
  board: string,
  subjectSlug: string,
  grade: number,
  prereqNodeId: string,
): PrerequisiteChapterTarget | null {
  try {
    const { getSchoolChapters, chapterDisplayTitle } = require('@/lib/school/schoolRouting')
    const chapters = getSchoolChapters(board, subjectSlug, grade) as Array<{ id: string; title: string; kgNodeIds: string[] }>
    for (const ch of chapters) {
      if (ch.kgNodeIds.includes(prereqNodeId)) {
        const prereqNode = KG_BY_ID.get(prereqNodeId)
        return {
          chapterId: ch.id,
          chapterTitle: chapterDisplayTitle(ch.title),
          subjectSlug,
          missingPrereqTitle: prereqNode?.title ?? prereqNodeId,
        }
      }
    }
    // Try lower grades too (prerequisite might be from a previous grade)
    for (let g = grade - 1; g >= Math.max(grade - 3, 1); g--) {
      const lowerChapters = getSchoolChapters(board, subjectSlug, g) as Array<{ id: string; title: string; kgNodeIds: string[] }>
      for (const ch of lowerChapters) {
        if (ch.kgNodeIds.includes(prereqNodeId)) {
          const prereqNode = KG_BY_ID.get(prereqNodeId)
          return {
            chapterId: ch.id,
            chapterTitle: chapterDisplayTitle(ch.title),
            subjectSlug,
            missingPrereqTitle: prereqNode?.title ?? prereqNodeId,
          }
        }
      }
    }
  } catch { /* schoolRouting not available */ }
  return null
}
