import { NextResponse } from 'next/server'
import OpenAI from 'openai'

export async function GET() {
  const key = process.env.OPENROUTER_API_KEY
  const keyPreview = key ? `${key.slice(0, 8)}...${key.slice(-4)}` : 'MISSING'

  try {
    const ai = new OpenAI({
      baseURL: 'https://openrouter.ai/api/v1',
      apiKey: key!,
    })
    const completion = await ai.chat.completions.create({
      model: 'meta-llama/llama-3.1-8b-instruct:free',
      messages: [{ role: 'user', content: 'Say ok' }],
      max_tokens: 10,
    })
    return NextResponse.json({ keyPreview, status: 'success', response: completion.choices[0].message.content })
  } catch (err: unknown) {
    const error = err as { status?: number; message?: string }
    return NextResponse.json({ keyPreview, status: 'error', code: error?.status, message: error?.message })
  }
}
