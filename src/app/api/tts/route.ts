import { NextResponse } from 'next/server'
import { z } from 'zod'
import { auth } from '@/lib/auth'
import { synthesizeSpeech } from '@/lib/voice/elevenlabs'

// Map onboarding voice keys → ElevenLabs voice IDs.
// Set ELEVENLABS_VOICE_MARIA_ID / ELEVENLABS_VOICE_DMITRY_ID in .env to use
// distinct voices per character; falls back to the default voice otherwise.
const VOICE_MAP: Record<string, string> = {
  alexei: process.env.ELEVENLABS_VOICE_ID ?? 'pNInz6obpgDQGcFmaJgB',
  maria:
    process.env.ELEVENLABS_VOICE_MARIA_ID ??
    process.env.ELEVENLABS_VOICE_ID ??
    'pNInz6obpgDQGcFmaJgB',
  dmitry:
    process.env.ELEVENLABS_VOICE_DMITRY_ID ??
    process.env.ELEVENLABS_VOICE_ID ??
    'pNInz6obpgDQGcFmaJgB',
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

    const resolvedVoice = (voiceId && VOICE_MAP[voiceId]) ?? VOICE_MAP.alexei
    const clean = stripForTTS(text)

    if (!clean) return NextResponse.json({ error: 'No speakable text' }, { status: 400 })

    const audioBuffer = await synthesizeSpeech(clean, resolvedVoice)

    return new Response(audioBuffer, {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Content-Length': String(audioBuffer.byteLength),
        'Cache-Control': 'no-store',
      },
    })
  } catch (err) {
    if (err instanceof z.ZodError) return NextResponse.json({ error: err.errors[0].message }, { status: 400 })
    console.error('[tts]', err)
    return NextResponse.json({ error: 'Speech synthesis failed' }, { status: 500 })
  }
}
