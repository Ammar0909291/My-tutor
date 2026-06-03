import { NextResponse } from 'next/server'
import { z } from 'zod'
import { auth } from '@/lib/auth'
import { chatWithFallback } from '@/lib/ai/client'

const schema = z.object({
  messages: z.array(z.object({ role: z.enum(['system', 'user', 'assistant']), content: z.string() })),
})

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await req.json()
    const { messages } = schema.parse(body)

    const completion = await chatWithFallback({ messages, temperature: 0.7, max_tokens: 1500 })
    const content = completion.choices[0]?.message?.content ?? ''
    return NextResponse.json({ content })
  } catch (err) {
    console.error('[coach]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
