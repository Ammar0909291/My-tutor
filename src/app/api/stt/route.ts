import Groq from 'groq-sdk'
import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { checkRateLimit, rateLimitResponse } from '@/lib/rateLimit'

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY || '' })

export async function POST(req: Request) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { allowed } = await checkRateLimit(`rl:stt:${session.user.id}`, 20, 60)
    if (!allowed) return rateLimitResponse()

    const formData = await req.formData()
    const audioFile = formData.get('audio') as File
    const lang = (formData.get('lang') as string) || 'en'

    if (!audioFile) {
      return NextResponse.json({ error: 'No audio' }, { status: 400 })
    }

    if (!process.env.GROQ_API_KEY) {
      console.error('[stt] GROQ_API_KEY not configured')
      return NextResponse.json({ error: 'Speech recognition unavailable' }, { status: 503 })
    }

    let transcription
    try {
      transcription = await groq.audio.transcriptions.create({
        file: audioFile,
        model: 'whisper-large-v3',
        language: lang,
        response_format: 'json',
      })
    } catch (groqErr: unknown) {
      const status = (groqErr as any)?.status
      const msg = (groqErr as any)?.message ?? 'unknown'
      console.error('[stt] Groq transcription failed:', status, msg)
      throw groqErr
    }

    return NextResponse.json({ text: transcription.text })
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'STT error'
    console.error('[stt] error:', msg)
    return NextResponse.json({ error: 'Speech recognition unavailable' }, { status: 503 })
  }
}
