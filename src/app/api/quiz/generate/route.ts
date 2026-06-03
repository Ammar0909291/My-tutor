import { NextResponse } from 'next/server'
import { z } from 'zod'
import { auth } from '@/lib/auth'
import { generateJSON } from '@/lib/ai/client'

const schema = z.object({ subject: z.string(), topic: z.string().optional(), lang: z.enum(['ru', 'en', 'hi']) })

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await req.json()
    const { subject, topic, lang } = schema.parse(body)

    const topicStr = topic || subject
    const langInstruction = lang === 'ru' ? 'in Russian' : lang === 'hi' ? 'in Hindi' : 'in English'

    const prompt = `Generate 5 multiple choice questions about "${topicStr}" ${langInstruction}.
Return ONLY this JSON array (no other text, no markdown):
[{"question":"...","options":["a","b","c","d"],"correctIndex":0,"explanation":"..."}]
Make questions practical about code behavior. Difficulty: beginner level.`

    try {
      const result = await generateJSON(prompt, 1500)
      const questions = Array.isArray(result) ? result : []
      return NextResponse.json({ success: true, questions })
    } catch (error: any) {
      console.error('[quiz/generate] AI error:', error.message)
      return NextResponse.json(
        { error: { message: error.message || 'AI failed' } },
        { status: 500 },
      )
    }
  } catch (err) {
    console.error('[quiz/generate]', err)
    return NextResponse.json({ success: false, error: 'Failed to generate quiz' }, { status: 500 })
  }
}
