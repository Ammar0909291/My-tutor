import { NextResponse } from 'next/server'

// TTS is handled server-side via /api/tts (Groq PlayAI + optional Yandex)
export async function POST() {
  return NextResponse.json({ success: false, error: 'Use /api/tts instead' }, { status: 410 })
}
