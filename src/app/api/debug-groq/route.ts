import { NextResponse } from 'next/server'

export async function GET() {
  const key = process.env.OPENROUTER_API_KEY
  const keyPreview = key ? `${key.slice(0, 10)}...${key.slice(-4)}` : 'MISSING'

  const models = [
    'mistralai/mistral-7b-instruct:free',
    'google/gemma-2-9b-it:free',
    'meta-llama/llama-3.2-3b-instruct:free',
    'qwen/qwen-2-7b-instruct:free',
  ]

  const results: Record<string, unknown> = {}

  for (const model of models) {
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
    results[model] = { status: res.status, body: data }
  }

  return NextResponse.json({ keyPreview, results })
}
