import { NextResponse } from 'next/server'
import { z } from 'zod'
import { auth } from '@/lib/auth'
import { chatWithFallback } from '@/lib/ai/client'
import { checkRateLimit, rateLimitResponse } from '@/lib/rateLimit'
import { quizSchema } from '@/lib/quizSchema'

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { allowed } = await checkRateLimit(`rl:quiz:${session.user.id}`, 20, 60)
  if (!allowed) return rateLimitResponse()

  try {
    const body = await req.json()
    const { subject, topic, lang } = quizSchema.parse(body)

    const topicStr = topic || subject
    const langInstruction = lang === 'ru' ? 'in Russian' : lang === 'hi' ? 'in Hindi' : 'in English'

    // Topic is wrapped in XML delimiters so it is treated as data, not as
    // additional instructions (mitigates prompt injection via topic/subject).
    const prompt = `Generate exactly 5 multiple choice questions for a beginner student. ${langInstruction}.
Topic: <topic>${topicStr}</topic>
Return ONLY a JSON array:
[{"question":"...","options":["a","b","c","d"],"correctIndex":0,"explanation":"..."}]`

    try {
      const completion = await chatWithFallback({
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 1500,
        temperature: 0.4,
      })
      const raw = completion.choices[0]?.message?.content ?? '[]'
      const jsonMatch = raw.match(/\[[\s\S]*\]/)
      const questions = jsonMatch ? JSON.parse(jsonMatch[0]) : []
      return NextResponse.json({ success: true, questions: Array.isArray(questions) ? questions : [] })
    } catch (error: any) {
      console.error('[quiz/generate] AI error:', error.message)
      return NextResponse.json({ success: false, error: 'Failed to generate quiz' }, { status: 502 })
    }
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ success: false, error: err.errors[0].message }, { status: 400 })
    }
    console.error('[quiz/generate]', err)
    return NextResponse.json({ success: false, error: 'Failed to generate quiz' }, { status: 500 })
  }
}
