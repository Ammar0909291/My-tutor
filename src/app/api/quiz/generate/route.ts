import { NextResponse } from 'next/server'
import { z } from 'zod'
import { auth } from '@/lib/auth'
import { chatWithFallback } from '@/lib/ai/client'

const schema = z.object({ subject: z.string(), topic: z.string().optional(), lang: z.enum(['ru', 'en', 'hi']) })

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await req.json()
    const { subject, topic, lang } = schema.parse(body)

    const topicStr = topic || subject
    const langInstruction = lang === 'ru' ? 'in Russian' : lang === 'hi' ? 'in Hindi' : 'in English'

    const completion = await chatWithFallback({
      messages: [
        {
          role: 'system',
          content: 'You are a quiz generator. Return ONLY valid JSON array, no markdown, no explanation.',
        },
        {
          role: 'user',
          content: `Generate 5 multiple choice questions about "${topicStr}" ${langInstruction}.
Return ONLY this JSON array (no other text):
[{"question":"...","options":["a","b","c","d"],"correctIndex":0,"explanation":"..."}]
Make questions practical about code behavior. Difficulty: beginner level.`,
        },
      ],
      temperature: 0.7,
      max_tokens: 1500,
    })

    const raw = completion.choices[0]?.message?.content ?? '[]'
    // Strip markdown code blocks if present
    const cleaned = raw.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
    const questions = JSON.parse(cleaned)

    return NextResponse.json({ success: true, questions })
  } catch (err) {
    console.error('[quiz/generate]', err)
    if (err instanceof SyntaxError) {
      return NextResponse.json({ success: true, questions: [] })
    }
    return NextResponse.json({ success: false, error: 'Failed to generate quiz' }, { status: 500 })
  }
}
