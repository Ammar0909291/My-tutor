import { NextResponse } from 'next/server'
import { z } from 'zod'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db/prisma'
import { withRetry } from '@/lib/db/withRetry'
import { getKnowledgeGraph, getAvailableNodes, getAllNodes } from '@/lib/curriculum/knowledgeGraph'
import { TopicStatus } from '@prisma/client'

/**
 * Knowledge-graph topic progress.
 *
 * GET  ?subject=<slug>  → all TopicProgress rows for the subject plus the
 *                         list of node slugs whose prerequisites are met.
 * PATCH { subjectSlug, topicSlug, action } → upsert a row through the topic
 *                         lifecycle. Actions: start | complete | start_revision
 *                         | skip | resume.
 *
 * This is the WRITE side of the KG loop — learn/chat, learnerProfile and the
 * curriculum route all read TopicProgress to build tutor context.
 */

export async function GET(req: Request) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const { searchParams } = new URL(req.url)
    const subjectSlug = searchParams.get('subject')
    if (!subjectSlug) {
      return NextResponse.json({ success: false, error: 'subject query param required' }, { status: 400 })
    }

    const rows = await withRetry(() => prisma.topicProgress.findMany({
      where: { userId: session.user.id, subjectSlug },
    }))

    // Available = prerequisites satisfied by completed/mastered/revision topics
    let availableNodes: string[] | undefined
    // lockReasons: for each still-locked node, the prerequisite nodes it's missing
    // (consumed by the curriculum tree UI to explain why a topic is locked).
    let lockReasons: Record<string, { missingPrereqs: { slug: string; title: string }[] }> | undefined
    const graph = getKnowledgeGraph(subjectSlug)
    if (graph) {
      const completed = new Set(
        rows
          .filter((r) => r.status === 'COMPLETED' || r.status === 'MASTERED' || r.status === 'REVISION')
          .map((r) => r.topicSlug),
      )
      const available = getAvailableNodes(graph, completed)
      availableNodes = available.map((n) => n.slug)

      const availableSlugs = new Set(availableNodes)
      const allNodes = getAllNodes(graph)
      const bySlug = new Map(allNodes.map((n) => [n.slug, n]))
      lockReasons = {}
      for (const node of allNodes) {
        if (completed.has(node.slug) || availableSlugs.has(node.slug)) continue
        const missingPrereqs = node.prerequisites
          .filter((p) => !completed.has(p))
          .map((p) => ({ slug: p, title: bySlug.get(p)?.title ?? p }))
        if (missingPrereqs.length > 0) lockReasons[node.slug] = { missingPrereqs }
      }
    }

    return NextResponse.json({ success: true, topicProgress: rows, availableNodes, lockReasons })
  } catch (err) {
    console.error('[topic-progress GET]', err)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}

const patchSchema = z.object({
  subjectSlug: z.string().min(1),
  topicSlug: z.string().min(1),
  action: z.enum(['start', 'complete', 'start_revision', 'skip', 'resume']),
})

export async function PATCH(req: Request) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await req.json()
    const { subjectSlug, topicSlug, action } = patchSchema.parse(body)
    const userId = session.user.id
    const now = new Date()

    const key = { userId_subjectSlug_topicSlug: { userId, subjectSlug, topicSlug } }
    const existing = await withRetry(() => prisma.topicProgress.findUnique({ where: key }))

    let data: {
      status: TopicStatus
      completedAt?: Date | null
      revisionCount?: number | { increment: number }
      lastRevisionAt?: Date
    }
    switch (action) {
      case 'start':
        // Never demote a finished topic back to IN_PROGRESS
        if (existing && (existing.status === 'COMPLETED' || existing.status === 'MASTERED')) {
          data = { status: existing.status }
        } else {
          data = { status: 'IN_PROGRESS' }
        }
        break
      case 'complete':
        // Preserve MASTERED if an assessment already promoted the topic
        data = {
          status: existing?.status === 'MASTERED' ? 'MASTERED' : 'COMPLETED',
          completedAt: existing?.completedAt ?? now,
        }
        break
      case 'start_revision':
        // MED-6: use atomic increment so concurrent start_revision calls cannot
        // both read the same revisionCount and overwrite each other.
        data = {
          status: 'REVISION',
          revisionCount: { increment: 1 },
          lastRevisionAt: now,
        }
        break
      case 'skip':
        data = { status: 'SKIPPED' }
        break
      case 'resume':
        // Back from SKIPPED / REVISION to the learner's working state
        data = {
          status:
            existing?.status === 'REVISION' && existing.completedAt
              ? (existing.masteryPct >= 80 ? 'MASTERED' : 'COMPLETED')
              : 'IN_PROGRESS',
        }
        break
    }

    // For the create branch we resolve the atomic increment to its initial value (1).
    const createData = {
      ...data,
      revisionCount: action === 'start_revision' ? 1 : (data.revisionCount as number | undefined),
    }
    const row = await withRetry(() => prisma.topicProgress.upsert({
      where: key,
      update: data,
      create: { userId, subjectSlug, topicSlug, ...createData },
    }))

    // Drop the cached learner-intelligence profile so the tutor's next chat
    // turn reflects this progress change immediately (Sprint AP cache).
    try {
      const { invalidateLearnerProfileCache } = await import('@/lib/ai/learnerProfile')
      invalidateLearnerProfileCache(userId)
    } catch { /* cache invalidation is best-effort */ }

    return NextResponse.json({
      success: true,
      topicProgress: { status: row.status, masteryPct: row.masteryPct, revisionCount: row.revisionCount },
    })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ success: false, error: err.errors[0].message }, { status: 400 })
    }
    console.error('[topic-progress PATCH]', err)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}
