import { NextResponse } from 'next/server'
import { z } from 'zod'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db/prisma'
import { chatWithFallback } from '@/lib/ai/client'
import { MessageRole, SubscriptionStatus } from '@prisma/client'

const schema = z.object({ sessionId: z.string() })

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const { sessionId } = schema.parse(body)

    const learnSession = await prisma.learnSession.findUnique({
      where: { id: sessionId, userId: session.user.id },
      include: {
        subject: true,
        messages: { orderBy: { createdAt: 'asc' } },
      },
    })

    if (!learnSession) {
      return NextResponse.json({ success: false, error: 'Session not found' }, { status: 404 })
    }

    // Already ended
    if (learnSession.endedAt) {
      return NextResponse.json({ success: true })
    }

    let summary: string | null = null

    if (learnSession.messages.length > 0) {
      const transcript = learnSession.messages
        .map((m) => `${m.role === MessageRole.USER ? 'Студент' : 'Репетитор'}: ${m.content}`)
        .join('\n')
        .slice(0, 6000)

      try {
        const completion = await chatWithFallback({
          messages: [
            {
              role: 'system',
              content:
                'Ты помощник, который кратко резюмирует учебные сессии. Отвечай только на русском языке.',
            },
            {
              role: 'user',
              content: `Напиши краткое резюме этого урока в 2-3 предложениях на русском языке. Укажи тему урока и что было изучено.\n\nТранскрипт урока:\n${transcript}`,
            },
          ],
        })
        summary = completion.choices[0]?.message?.content ?? null
      } catch (err) {
        console.error('[sessions/end] summary generation failed', err)
      }
    }

    await prisma.learnSession.update({
      where: { id: sessionId },
      data: {
        summary,
        endedAt: new Date(),
        status: 'COMPLETED',
      },
    })

    // Mark free session as used so the user is prompted to subscribe next time.
    // DEF-EJ-03: the where clause MUST be scoped to the authenticated user's id
    // so a request can never flip another account's subscription flag. Covered
    // by scripts/security-guards.mjs.
    await prisma.subscription.updateMany({
      where: { userId: session.user.id, status: SubscriptionStatus.FREE, freeSessionUsed: false },
      data: { freeSessionUsed: true },
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ success: false, error: err.errors[0].message }, { status: 400 })
    }
    console.error('[sessions/end]', err)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}
