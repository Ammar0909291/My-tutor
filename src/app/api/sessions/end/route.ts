import { NextResponse } from 'next/server'
import { z } from 'zod'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db/prisma'
import { summarizeSession, generateJSON } from '@/lib/ai/client'
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
      try {
        const profile = await prisma.profile.findUnique({ where: { userId: session.user.id } })
        const lang = profile?.teachingLanguage ?? 'en'
        const msgs = learnSession.messages
          .slice(0, 30)
          .map((m) => ({ role: m.role === MessageRole.USER ? 'user' : 'assistant', content: m.content.slice(0, 300) }))
        summary = await summarizeSession(msgs, lang) || null
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

    // Mark free session as used so the user is prompted to subscribe next time
    await prisma.subscription.updateMany({
      where: { userId: session.user.id, status: SubscriptionStatus.FREE, freeSessionUsed: false },
      data: { freeSessionUsed: true },
    })

    // +10 XP for completing a session
    await prisma.user.update({
      where: { id: session.user.id },
      data: { xpPoints: { increment: 10 } },
    })

    // Update streak logic
    try {
      const profile = await prisma.profile.findUnique({ where: { userId: session.user.id } })
      const yesterday = new Date()
      yesterday.setDate(yesterday.getDate() - 1)
      yesterday.setHours(0, 0, 0, 0)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      const lastStudy = profile?.lastStudyDate
      const isConsecutive = lastStudy && lastStudy >= yesterday && lastStudy < today
      const newStreak = isConsecutive ? (profile?.streakDays ?? 0) + 1 : 1
      await prisma.profile.update({
        where: { userId: session.user.id },
        data: {
          streakDays: newStreak,
          lastStudyDate: new Date(),
          totalSessions: { increment: 1 },
        },
      })
    } catch (err) {
      console.error('[sessions/end] streak update failed', err)
    }

    // Generate flashcards from session content
    if (learnSession.messages.length > 2) {
      try {
        const profile = await prisma.profile.findUnique({ where: { userId: session.user.id } })
        const lang = profile?.teachingLanguage ?? 'en'
        const lastMessages = learnSession.messages
          .slice(-20)
          .map((m) => `${m.role === MessageRole.USER ? 'Student' : 'Tutor'}: ${m.content.slice(0, 300)}`)
          .join('\n')

        const flashcards = await generateJSON(
          `Based on this tutoring session content, create 3 flashcard Q&A pairs about the key concepts. Return ONLY JSON array: [{"question":"...","answer":"...","topic":"..."}]. Keep answers under 2 sentences. Language: ${lang}\n\nSession:\n${lastMessages}`,
          800,
        )

        if (Array.isArray(flashcards) && flashcards.length > 0) {
          const tomorrow = new Date()
          tomorrow.setDate(tomorrow.getDate() + 1)
          await prisma.flashcard.createMany({
            data: flashcards.map((f: { question: string; answer: string; topic: string }) => ({
              userId: session.user.id,
              topic: f.topic ?? learnSession.subject.name,
              question: f.question,
              answer: f.answer,
              nextReview: tomorrow,
            })),
          })
        }
      } catch (err) {
        console.error('[sessions/end] flashcard generation failed', err)
      }
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ success: false, error: err.errors[0].message }, { status: 400 })
    }
    console.error('[sessions/end]', err)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}
