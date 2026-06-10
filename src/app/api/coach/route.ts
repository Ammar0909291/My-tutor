import { NextResponse } from 'next/server'
import { z } from 'zod'
import { auth } from '@/lib/auth'
import { chatWithFallback } from '@/lib/ai/client'
import { checkRateLimit, rateLimitResponse } from '@/lib/rateLimit'

const schema = z.object({
  messages: z.array(z.object({ role: z.enum(['system', 'user', 'assistant']), content: z.string() })),
})

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { allowed } = await checkRateLimit(`rl:coach:${session.user.id}`, 30, 60)
  if (!allowed) return rateLimitResponse()

  try {
    const body = await req.json()
    const { messages } = schema.parse(body)

    const systemMsg = messages.find((m) => m.role === 'system')?.content ?? 'You are a helpful coding coach.'
    const chatMessages = messages
      .filter((m) => m.role !== 'system')
      .map((m) => ({ role: m.role as 'user' | 'assistant', content: m.content }))

    try {
      const completion = await chatWithFallback({
        messages: [{ role: 'system', content: systemMsg }, ...chatMessages],
        max_tokens: 1500,
      })
      const content = completion.choices[0]?.message?.content ?? ''
      return NextResponse.json({ content })
    } catch (error: any) {
      console.error('[coach] AI error:', error.message)
      return NextResponse.json({ error: { message: error.message || 'AI failed' } }, { status: 500 })
    }
  } catch (err) {
    console.error('[coach]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
