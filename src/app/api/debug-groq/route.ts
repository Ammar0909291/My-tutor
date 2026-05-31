import { NextResponse } from 'next/server'

export async function GET() {
  const key = process.env.OPENROUTER_API_KEY
  const keyPreview = key ? `${key.slice(0, 10)}...${key.slice(-4)}` : 'MISSING'

  // Try a few free models
  const models = [
    'mistralai/mistral-7b-instruct:free',
    'google/gemma-2-9b-it:free',
    'meta-llama/llama-3.2-3b-instruct:free',
    'qwen/qwen-2-7b-instruct:free',
  ]

  for (const model of models) {
    try {
      const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${key}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model,
          messages: [{ role: 'user', content: 'Say ok' }],
          max_tokens: 5,
        }),
      })
      const data = await res.json()
      if (res.ok) {
        return NextResponse.json({ keyPreview, status: 'success', model, response: data.choices?.[0]?.message?.content })
      }
    } catch {}
  }

  return NextResponse.json({ keyPreview, status: 'error', message: 'No free models worked' })
}
