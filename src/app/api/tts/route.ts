import { NextResponse } from 'next/server'

// TTS is now handled client-side via the Web Speech API.
export async function POST() {
  return NextResponse.json({ error: 'TTS is handled client-side' }, { status: 410 })
}
