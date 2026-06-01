import { NextResponse } from 'next/server'
import { z } from 'zod'
import { auth } from '@/lib/auth'
import { synthesizeSpeech } from '@/lib/voice/elevenlabs'
import { cleanTextForTTS } from '@/lib/tts-cleaner'

// Onboarding key → ElevenLabs voice ID
const VOICE_KEY_MAP: Record<string, string> = {
  alexei: 'ErXwobaYiN019PkySvjV', // Antoni — male, confident
  maria:  'EXAVITQu4vr4xnSDxMaL', // Bella — female, warm
  dmitry: 'TxGEqnHWrfWFTfGW9XjX', // Josh — warm, conversational
}

const DEFAULT_VOICE = 'ErXwobaYiN019PkySvjV' // Antoni

function resolveVoice(voiceId: string | undefined): string {
  if (!voiceId) return DEFAULT_VOICE
  if (VOICE_KEY_MAP[voiceId]) return VOICE_KEY_MAP[voiceId]
  return voiceId
}

const schema = z.object({
  text: z.string().min(1).max(3000),
  voiceId: z.string().optional(),
})

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  if (!process.env.ELEVENLABS_API_KEY) {
    return NextResponse.json({ error: 'TTS not configured' }, { status: 503 })
  }

  try {
    const body = await req.json()
    const { text, voiceId } = schema.parse(body)

    const resolvedVoice = resolveVoice(voiceId)
    const clean = cleanTextForTTS(text)

    if (!clean) return NextResponse.json({ error: 'No speakable text' }, { status: 400 })

    const audio = await synthesizeSpeech(clean, resolvedVoice)

    return new Response(audio, {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Content-Length': String(audio.byteLength),
        'Cache-Control': 'no-store',
      },
    })
  } catch (err) {
    if (err instanceof z.ZodError) return NextResponse.json({ error: err.errors[0].message }, { status: 400 })
    const msg = err instanceof Error ? err.message : String(err)
    console.error('[tts]', err)
    const status = msg.includes('403') || msg.includes('401') ? 403 : 500
    return NextResponse.json({ error: msg, code: status === 403 ? 'AUTH_FAILED' : undefined }, { status })
  }
}
