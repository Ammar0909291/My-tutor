import { NextResponse } from 'next/server'
import Groq from 'groq-sdk'

export async function GET() {
  const key = process.env.GROQ_API_KEY
  const keyPreview = key ? `${key.slice(0, 8)}...${key.slice(-4)}` : 'MISSING'

  try {
    const groq = new Groq({ apiKey: key })
    const completion = await groq.chat.completions.create({
      model: 'llama-3.1-8b-instant',
      messages: [{ role: 'user', content: 'Say ok' }],
      max_tokens: 10,
    })
    return NextResponse.json({ keyPreview, status: 'success', response: completion.choices[0].message.content })
  } catch (err: unknown) {
    const error = err as { status?: number; message?: string }
    return NextResponse.json({ keyPreview, status: 'error', code: error?.status, message: error?.message })
  }
}
