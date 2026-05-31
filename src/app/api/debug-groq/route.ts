import { NextResponse } from 'next/server'

export async function GET() {
  const key = process.env.OPENROUTER_API_KEY

  // Fetch all available models from OpenRouter
  const res = await fetch('https://openrouter.ai/api/v1/models', {
    headers: { 'Authorization': `Bearer ${key}` },
  })
  const data = await res.json()

  // Filter for free models only
  const freeModels = (data.data ?? [])
    .filter((m: { id: string; pricing?: { prompt: string } }) =>
      m.id.endsWith(':free') || m.pricing?.prompt === '0'
    )
    .map((m: { id: string; name: string }) => ({ id: m.id, name: m.name }))
    .slice(0, 20)

  return NextResponse.json({ freeModels })
}
