import { NextResponse } from 'next/server'
import { z } from 'zod'
import { auth } from '@/lib/auth'
import { synthesizeSpeech } from '@/lib/voice/elevenlabs'

// Legacy onboarding key → voice ID map (kept for back-compat).
// New requests pass direct ElevenLabs voice IDs from the in-app picker.
const VOICE_KEY_MAP: Record<string, string> = {
  alexei: 'nPczCjzI2devNBz1zQrb', // Brian — male, confident
  maria:  '9BWtsMINqrJLrRacOk9x', // Aria — female, energetic
  dmitry: 'IKne3meq5aSn9XLyUdCD', // Charlie — warm, conversational
}

const DEFAULT_VOICE = process.env.ELEVENLABS_VOICE_ID ?? 'nPczCjzI2devNBz1zQrb'

function resolveVoice(voiceId: string | undefined): string {
  if (!voiceId) return DEFAULT_VOICE
  // Known onboarding key → mapped ID
  if (VOICE_KEY_MAP[voiceId]) return VOICE_KEY_MAP[voiceId]
  // Direct ElevenLabs voice ID (24-char alphanumeric)
  return voiceId
}

function stripForTTS(text: string): string {
  return text
    .replace(/```[\s\S]*?```/g, '')       // fenced code blocks
    .replace(/`[^`\n]+`/g, '')            // inline code
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // markdown links
    .replace(/^#{1,6}\s+/gm, '')          // headers
    .replace(/\*{1,3}([^*\n]+)\*{1,3}/g, '$1') // bold / italic
    .replace(/_{1,3}([^_\n]+)_{1,3}/g, '$1')
    .replace(/^[-*+]\s+/gm, '')           // bullet points
    .replace(/^\d+\.\s+/gm, '')           // numbered lists
    .replace(/\n{3,}/g, '\n\n')
    .trim()
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
    const clean = stripForTTS(text)

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
