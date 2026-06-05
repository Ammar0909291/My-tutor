import { NextResponse } from 'next/server'
import { z } from 'zod'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db/prisma'
import { generateAIResponse, buildTutorSystemPrompt } from '@/lib/ai/client'
import { MessageRole } from '@prisma/client'

const schema = z.object({
  sessionId: z.string(),
  message: z.string().min(1).max(8000),
})

export async function POST(req: Request) {
  console.log('GROQ KEY EXISTS:', !!process.env.GROQ_API_KEY)

  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 })
  }

  const userId = session.user.id

  try {
    const body = await req.json()
    const { sessionId, message } = schema.parse(body)

    const learnSession = await prisma.learnSession.findUnique({
      where: { id: sessionId, userId },
      include: {
        subject: true,
        messages: { orderBy: { createdAt: 'asc' } },
      },
    })
    if (!learnSession) {
      return NextResponse.json({ success: false, error: 'Session not found' }, { status: 404 })
    }

    const profile = await prisma.profile.findUnique({ where: { userId } })

    await prisma.message.create({
      data: { sessionId, role: MessageRole.USER, content: message },
    })

    const snapshot = learnSession.contextSnapshot as Record<string, unknown> | null
    const memoryContext = typeof snapshot?.memoryContext === 'string' ? snapshot.memoryContext : null

    const teachingLang = (profile?.teachingLanguage ?? 'en') as 'ru' | 'en' | 'hi'
    const systemPrompt = buildTutorSystemPrompt(
      learnSession.subject.name,
      profile?.selfDescription ?? 'level unknown',
      profile?.learningGoals ?? profile?.selfDescription ?? 'general learning',
      memoryContext,
      teachingLang,
    )

    const historyMessages = learnSession.messages
      .filter((m) => m.role !== MessageRole.SYSTEM)
      .map((m) => ({
        role: m.role === MessageRole.USER ? ('user' as const) : ('assistant' as const),
        content: m.content,
      }))

    try {
      const text = await generateAIResponse(
        [...historyMessages, { role: 'user', content: message }],
        systemPrompt,
        1024,
      )

      if (!text) {
        return NextResponse.json({ success: false, error: 'Empty response from model' }, { status: 502 })
      }

      await prisma.message.create({
        data: { sessionId, role: MessageRole.ASSISTANT, content: text },
      })

      return NextResponse.json({ success: true, text })
    } catch (error: any) {
      console.error('[learn/chat] AI error:', error.message)
      return NextResponse.json({ success: false, error: error.message || 'AI failed' }, { status: 500 })
    }
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ success: false, error: err.errors[0].message }, { status: 400 })
    }
    console.error('[learn/chat]', err)
    const msg = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ success: false, error: msg }, { status: 500 })
  }
}
