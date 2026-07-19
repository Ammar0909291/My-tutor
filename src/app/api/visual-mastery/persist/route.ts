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
import { buildVisualLearningProfile, detectVisualWeaknesses, type VisualEvidenceRow } from '@/lib/visuals/visualMasteryProfile'
import { buildVisualLearningRecommendations } from '@/lib/visuals/visualMasteryRecommendations'
import { generateVisualGuidance } from '@/lib/visuals/visualGuidance'

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

  try {
    await prisma.evidenceRecord.createMany({
      data: evidence.map((e) => ({ ...e, userId: session.user!.id })),
      skipDuplicates: true,
    })
    return NextResponse.json({ saved: evidence.length })
  } catch (err) {
    console.error('[POST /api/visual-mastery/persist]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET() {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const records = await prisma.evidenceRecord.findMany({
      where: { userId: session.user.id, type: 'VISUAL' },
      orderBy: { createdAt: 'desc' },
      take: 50,
    })

    // Sprint N, Task 2/3/4 — profile/weakness analysis built from the same rows
    // already fetched above (not a second query), purely additive to the
    // Sprint M response shape; existing callers reading `records` are unaffected.
    const profile = buildVisualLearningProfile(records as unknown as VisualEvidenceRow[])
    const weaknesses = detectVisualWeaknesses(profile)

    // Sprint O, Task 2/3/4 — recommendations derived from the same profile,
    // purely additive to the Sprint N response shape; existing fields unchanged.
    const recommendations = buildVisualLearningRecommendations(profile)

    // Sprint P, Task 2/3/4 — learner-facing guidance derived from the same
    // profile/weaknesses/recommendations, purely additive to the Sprint O
    // response shape; existing fields unchanged.
    const guidance = generateVisualGuidance(profile, weaknesses, recommendations)

    return NextResponse.json({ records, profile, weaknesses, recommendations, guidance })
  } catch (err) {
    console.error('[GET /api/visual-mastery/persist]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
