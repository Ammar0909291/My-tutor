import Groq from 'groq-sdk'
import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { checkRateLimit, rateLimitResponse } from '@/lib/rateLimit'
import { extractVoiceTimingSignal, type WhisperVerboseTranscription } from '@/lib/voice/voiceSignal'

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

    let transcription: WhisperVerboseTranscription
    try {
      // Claude Recommendation #7 (Voice Signal Recovery): verbose_json
      // recovers per-segment start/end timestamps and log-probabilities at
      // zero extra latency for segment-level granularity (word-level would
      // cost more — not requested). The groq-sdk's typed response only
      // declares `{ text }`; the runtime payload carries the full Whisper
      // verbose_json shape (duration/segments), hence the cast.
      const raw = await groq.audio.transcriptions.create({
        file: audioFile,
        model: 'whisper-large-v3',
        language: lang,
        response_format: 'verbose_json',
        timestamp_granularities: ['segment'],
      })
      transcription = raw as unknown as WhisperVerboseTranscription
    } catch (groqErr: unknown) {
      const status = (groqErr as any)?.status
      const msg = (groqErr as any)?.message ?? 'unknown'
      console.error('[stt] Groq transcription failed:', status, msg)
      throw groqErr
    }

    // Telemetry only — never affects the transcript returned to the
    // client. Extraction is pure and never throws (malformed/missing
    // segment data degrades to nulls, not an error), so a transcription
    // that already succeeded can never fail here.
    const voiceSignal = extractVoiceTimingSignal(transcription)

    // Backward compatible: `text` is unchanged from the previous plain
    // `json` contract; `voiceSignal` is a new, additive field older
    // clients simply ignore.
    return NextResponse.json({ text: transcription.text, voiceSignal })
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'STT error'
    console.error('[stt] error:', msg)
    return NextResponse.json({ error: 'Speech recognition unavailable' }, { status: 503 })
  }
}
