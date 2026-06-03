import { NextResponse } from 'next/server'
import { z } from 'zod'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db/prisma'
import { chatWithFallback, buildTutorSystemPrompt } from '@/lib/ai/client'
import { MessageRole } from '@prisma/client'

const schema = z.object({
  sessionId: z.string(),
  message: z.string().min(1).max(8000),
})

export async function POST(req: Request) {
  const session = await auth()
  console.log('SESSION IN CHAT:', JSON.stringify(session))

  // Support id from token.sub (v5 standard) or fallback to email
  const userId = session?.user?.id ?? (session?.user?.email ? session.user.email : null)

  if (!session?.user || !userId) {
    return NextResponse.json({ error: { message: 'Forbidden' } }, { status: 403 })
  }

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

    const teachingLang = (profile?.teachingLanguage ?? 'ru') as 'ru' | 'en' | 'hi'
    const systemPrompt = buildTutorSystemPrompt(
      learnSession.subject.name,
      profile?.selfDescription ?? 'level unknown',
      profile?.learningGoals ?? profile?.selfDescription ?? 'general learning',
      memoryContext,
      teachingLang,
    )

    const messages = [
      { role: 'system' as const, content: systemPrompt },
      ...learnSession.messages
        .filter((m) => m.role !== MessageRole.SYSTEM)
        .map((m) => ({
          role: m.role === MessageRole.USER ? ('user' as const) : ('assistant' as const),
          content: m.content,
        })),
      { role: 'user' as const, content: message },
    ]

    // Single-response generation — return the full text at once, not word by word.
    const completion = await chatWithFallback({
      messages,
      temperature: 0.7,
      max_tokens: 1024,
    })
    const text = completion.choices[0]?.message?.content ?? ''
    if (!text) {
      return NextResponse.json({ success: false, error: 'Empty response from model' }, { status: 502 })
    }

    await prisma.message.create({
      data: {
        sessionId,
        role: MessageRole.ASSISTANT,
        content: text,
        inputTokens: completion.usage?.prompt_tokens ?? null,
        outputTokens: completion.usage?.completion_tokens ?? null,
      },
    })

    return NextResponse.json({ success: true, text })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ success: false, error: err.errors[0].message }, { status: 400 })
    }
    console.error('[learn/chat]', err)
    const msg = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ success: false, error: msg }, { status: 500 })
  }
}
