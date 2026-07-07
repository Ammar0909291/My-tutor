import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { chatWithFallback } from '@/lib/ai/client'
import { AIBudgetExceededError } from '@/lib/ai/budget'
import { checkRateLimit, rateLimitResponse } from '@/lib/rateLimit'
import { captureError } from '@/lib/monitoring'
import { coachSchema } from '@/lib/ai/coachSchema'

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { allowed } = await checkRateLimit(`rl:coach:${session.user.id}`, 30, 60)
  if (!allowed) return rateLimitResponse()

  try {
    const body = await req.json()
    const { messages } = coachSchema.parse(body)

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
      // Global AI budget spent — expected under load, not an error to report.
      if (error instanceof AIBudgetExceededError) {
        return NextResponse.json({ error: { message: 'High demand right now — please try again in a minute.' } }, { status: 429 })
      }
      // Log the real provider error server-side only — raw messages can leak
      // provider configuration to the client.
      console.error('[coach] AI error:', error.message)
      captureError(error, { route: 'api/coach', tags: { stage: 'ai' } })
      return NextResponse.json({ error: { message: 'AI service temporarily unavailable. Please try again.' } }, { status: 500 })
    }
  } catch (err) {
    console.error('[coach]', err)
    captureError(err, { route: 'api/coach' })
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
