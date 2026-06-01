import { NextResponse } from 'next/server'

// Voice synthesis is now handled client-side via the Web Speech API.
export async function POST() {
  return NextResponse.json({ success: false, error: 'Voice synthesis is handled client-side' }, { status: 410 })
}
