import { NextResponse } from 'next/server'
import { z } from 'zod'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db/prisma'
import { restartConcept } from '@/lib/teaching/conceptRestart'

/**
 * POST — restart one concept for the signed-in learner (Resume/Restart gate).
 * Every write is scoped to session.user.id; see src/lib/teaching/conceptRestart.ts
 * for exactly which rows are reset and which are kept. All-or-nothing: on any
 * failure the transaction rolls back and the response is success:false, so the
 * client never reports a reset that did not happen.
 */
const schema = z.object({
  subjectSlug: z.string().min(1),
  topicSlug: z.string().min(1).optional(),
  lessonOrder: z.number().int().positive().optional(),
  lessonTitle: z.string().optional(),
}).refine((b) => b.topicSlug || b.lessonOrder, { message: 'topicSlug or lessonOrder required' })

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  let body: z.infer<typeof schema>
  try {
    body = schema.parse(await req.json())
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid request' }, { status: 400 })
  }
  try {
    const result = await restartConcept(prisma, { userId: session.user.id, ...body })
    const progress = await prisma.studentProgress.findUnique({
      where: { userId_subjectCode: { userId: session.user.id, subjectCode: body.subjectSlug } },
    })
    return NextResponse.json({
      success: true,
      messagesDeleted: result.messagesDeleted,
      progress: progress ?? { currentLesson: 1, completedLessons: [] },
    })
  } catch (err) {
    console.error('[POST /api/learn/concept-restart]', err)
    return NextResponse.json({ success: false, error: 'Restart failed' }, { status: 500 })
  }
}
