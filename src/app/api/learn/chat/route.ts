import { NextResponse } from 'next/server'
import { z } from 'zod'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db/prisma'
import { buildTutorSystemPrompt, getGeminiModel } from '@/lib/ai/client'
import { MessageRole } from '@prisma/client'

const schema = z.object({
  sessionId: z.string(),
  message: z.string().min(1).max(8000),
})

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const { sessionId, message } = schema.parse(body)

    const learnSession = await prisma.learnSession.findUnique({
      where: { id: sessionId, userId: session.user.id },
      include: {
        subject: true,
        messages: { orderBy: { createdAt: 'asc' } },
      },
    })

    if (!learnSession) {
      return NextResponse.json({ error: 'Session not found' }, { status: 404 })
    }

    const profile = await prisma.profile.findUnique({
      where: { userId: session.user.id },
    })

    // Persist user message before streaming
    await prisma.message.create({
      data: { sessionId, role: MessageRole.USER, content: message },
    })

    const systemPrompt = buildTutorSystemPrompt(
      learnSession.subject.name,
      profile?.selfDescription ?? 'уровень неизвестен',
      profile?.selfDescription ?? 'общее обучение'
    )

    // Build Gemini history — all previous messages except the current one
    const history = learnSession.messages.map((m) => ({
      role: m.role === MessageRole.USER ? ('user' as const) : ('model' as const),
      parts: [{ text: m.content }],
    }))

    const model = getGeminiModel(systemPrompt)
    const chat = model.startChat({ history })

    const encoder = new TextEncoder()
    let fullResponse = ''

    const readable = new ReadableStream({
      async start(controller) {
        try {
          const streamResult = await chat.sendMessageStream(message)

          for await (const chunk of streamResult.stream) {
            const text = chunk.text()
            if (text) {
              fullResponse += text
              controller.enqueue(
                encoder.encode(`data: ${JSON.stringify({ text })}\n\n`)
              )
            }
          }

          // Persist assistant message
          const finalResponse = await streamResult.response
          const usage = finalResponse.usageMetadata

          await prisma.message.create({
            data: {
              sessionId,
              role: MessageRole.ASSISTANT,
              content: fullResponse,
              inputTokens: usage?.promptTokenCount ?? null,
              outputTokens: usage?.candidatesTokenCount ?? null,
            },
          })

          controller.enqueue(encoder.encode('data: [DONE]\n\n'))
          controller.close()
        } catch (err) {
          console.error('[learn/chat stream]', err)
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify({ error: 'Stream failed' })}\n\n`)
          )
          controller.close()
        }
      },
    })

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache, no-transform',
        'X-Accel-Buffering': 'no',
      },
    })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.errors[0].message }, { status: 400 })
    }
    console.error('[learn/chat]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
