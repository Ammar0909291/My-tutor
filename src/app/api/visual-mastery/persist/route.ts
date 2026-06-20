/**
 * Visual Mastery Persistence API — Visual Learning Sprint M, Task 3/4.
 *
 * POST: accepts a quiz-completion-time collector summary (not raw
 * per-click signals) and writes one EvidenceRecord per visual engine
 * observed, with type: VISUAL, weight: 0. Purely additive — never reads or
 * writes TopicProgress, StudentProgress, or any grading/XP table.
 *
 * GET: lists the authenticated user's persisted VISUAL evidence (most
 * recent first). Used only by the dev-only Visual Mastery Viewer
 * (Sprint M, Task 5) — the route itself is unrestricted like every other
 * authenticated API route, but no production UI calls it.
 */
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db/prisma'
import { buildVisualMasteryEvidence, type VisualMasteryPersistRequest } from '@/lib/visuals/visualMasteryPersistence'

const summaryEntrySchema = z.object({
  shown: z.number().int().min(0),
  interacted: z.number().int().min(0),
  completed: z.number().int().min(0),
})

const schema = z.object({
  subjectSlug: z.string().min(1).max(120),
  topicSlug: z.string().min(1).max(120),
  source: z.enum(['learn', 'practice', 'assessment', 'mock']),
  sessionId: z.string().max(120).optional(),
  summary: z.record(z.string(), summaryEntrySchema),
})

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json().catch(() => null)
  const parsed = schema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: 'Invalid input' }, { status: 400 })

  const payload = parsed.data as VisualMasteryPersistRequest
  const evidence = buildVisualMasteryEvidence(payload)
  if (evidence.length === 0) return NextResponse.json({ saved: 0 })

  await prisma.evidenceRecord.createMany({
    data: evidence.map((e) => ({ ...e, userId: session.user!.id })),
  })

  return NextResponse.json({ saved: evidence.length })
}

export async function GET() {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const records = await prisma.evidenceRecord.findMany({
    where: { userId: session.user.id, type: 'VISUAL' },
    orderBy: { createdAt: 'desc' },
    take: 50,
  })

  return NextResponse.json({ records })
}
