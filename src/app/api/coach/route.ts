import { NextResponse } from 'next/server'
import { z } from 'zod'
import { auth } from '@/lib/auth'
import { generateAIResponse } from '@/lib/ai/client'

const schema = z.object({
  messages: z.array(z.object({ role: z.enum(['system', 'user', 'assistant']), content: z.string() })),
})

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await req.json()
    const { messages } = schema.parse(body)

    const systemMsg = messages.find((m) => m.role === 'system')?.content ?? 'You are a helpful coding coach.'
    const chatMessages = messages
      .filter((m) => m.role !== 'system')
      .map((m) => ({ role: m.role as 'user' | 'assistant', content: m.content }))

    try {
      const content = await generateAIResponse(chatMessages, systemMsg, 1500)
      return NextResponse.json({ content })
    } catch (error: any) {
      console.error('[coach] AI error:', error.message)
      return NextResponse.json(
        { error: { message: error.message || 'AI failed' } },
        { status: 500 },
      )
    }
  } catch (err) {
    console.error('[coach]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
