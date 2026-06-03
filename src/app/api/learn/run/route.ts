import { NextResponse } from 'next/server'
import { z } from 'zod'
import { auth } from '@/lib/auth'
import { generateAIResponse } from '@/lib/ai/client'

const schema = z.object({
  code: z.string().max(10000),
  language: z.string().max(32),
})

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const { code, language } = schema.parse(body)

    const output = await generateAIResponse(
      [{ role: 'user', content: `Язык: ${language}\n\nКод:\n\`\`\`${language}\n${code}\n\`\`\`` }],
      'Ты — эмулятор компилятора и интерпретатора. Симулируй выполнение кода и верни ТОЛЬКО вывод программы (stdout/stderr). Без пояснений, без форматирования — только чистый текст вывода.',
      512,
    )
    return NextResponse.json({ success: true, output })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ success: false, error: err.errors[0].message }, { status: 400 })
    }
    console.error('[learn/run]', err)
    const msg = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ success: false, error: msg }, { status: 500 })
  }
}
