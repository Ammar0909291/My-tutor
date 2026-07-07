import { NextResponse } from 'next/server'
import { z } from 'zod'
import { auth } from '@/lib/auth'
import { generateAIResponse } from '@/lib/ai/client'

const schema = z.object({
  code: z.string().max(10000),
  language: z.string().max(32),
  stdin: z.string().max(1000).optional(),
})

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const { code, language, stdin } = schema.parse(body)

    const stdinSection = stdin?.trim() ? `\n\nstdin input:\n${stdin}` : ''
    const output = await generateAIResponse(
      [{ role: 'user', content: `Language: ${language}\n\nCode:\n\`\`\`${language}\n${code}\n\`\`\`${stdinSection}` }],
      'You are a compiler/interpreter emulator. Simulate executing the code and return ONLY the program output (stdout/stderr). No explanations, no formatting — only raw text output.',
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
