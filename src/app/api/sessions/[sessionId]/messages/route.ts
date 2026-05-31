import { NextResponse } from 'next/server'
import { z } from 'zod'
import { auth } from '@/lib/auth'
import { buildTutorSystemPrompt, getGeminiModel } from '@/lib/ai/client'
import { analyzeStudentMood } from '@/lib/ai/mood'
import { prisma } from '@/lib/db/prisma'
import { getSessionState, setSessionState } from '@/lib/redis/client'
import type { RedisSessionState } from '@/types'
import { MessageRole } from '@prisma/client'

const messageSchema = z.object({ content: z.string().min(1).max(8000) })

export async function POST(
  req: Request,
  { params }: { params: { sessionId: string } }
) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })

  const { sessionId } = params

  try {
    const body = await req.json()
    const { content } = messageSchema.parse(body)

    const learnSession = await prisma.learnSession.findUnique({
      where: { id: sessionId, userId: session.user.id },
      include: {
        subject: true,
        messages: { orderBy: { createdAt: 'asc' }, take: 40 },
      },
    })

    if (!learnSession) return NextResponse.json({ success: false, error: 'Session not found' }, { status: 404 })

    const profile = await prisma.profile.findUnique({ where: { userId: session.user.id } })

    await prisma.message.create({
      data: { sessionId, role: MessageRole.USER, content },
    })

    const systemPrompt = buildTutorSystemPrompt(
      learnSession.subject.name,
      profile?.currentLevel ?? profile?.selfDescription ?? 'неизвестный уровень',
      profile?.learningGoals ?? 'общее обучение'
    )

    const history = learnSession.messages.map((m) => ({
      role: m.role === MessageRole.USER ? ('user' as const) : ('model' as const),
      parts: [{ text: m.content }],
    }))

    const model = getGeminiModel(systemPrompt)
    const chat = model.startChat({ history })
    const result = await chat.sendMessage(content)
    const assistantContent = result.response.text()
    const usage = result.response.usageMetadata

    const assistantMessage = await prisma.message.create({
      data: {
        sessionId,
        role: MessageRole.ASSISTANT,
        content: assistantContent,
        inputTokens: usage?.promptTokenCount ?? null,
        outputTokens: usage?.candidatesTokenCount ?? null,
      },
    })

    // Async mood analysis every 5 messages
    const state = await getSessionState<RedisSessionState>(sessionId)
    if (state) {
      state.messageCount += 1
      state.lastActivity = new Date().toISOString()

      if (state.messageCount % 5 === 0) {
        const recent = learnSession.messages.slice(-6).map((m) => ({
          role: m.role,
          content: m.content,
        }))
        const mood = await analyzeStudentMood(recent)
        state.moodAnalysis = mood
        await prisma.learnSession.update({
          where: { id: sessionId },
          data: { moodAnalysis: mood },
        })
      }

      await setSessionState(sessionId, state)
    }

    return NextResponse.json({ success: true, data: assistantMessage })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ success: false, error: err.errors[0].message }, { status: 400 })
    }
    console.error('[messages/POST]', err)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}
