import Groq from 'groq-sdk'
import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { checkRateLimit, rateLimitResponse } from '@/lib/rateLimit'
import { cleanTextForTTS } from '@/lib/tts-cleaner'

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY || '' })

// playai-tts valid voices — male/female/warm distinction
const VOICE_MAP: Record<string, string> = {
  ru_male:   'charon',
  ru_female: 'aoede',
  ru_warm:   'aoede',
  en_male:   'charon',
  en_female: 'aoede',
  en_warm:   'kore',
  hi_male:   'charon',
  hi_female: 'aoede',
  hi_warm:   'kore',
}

// ─── Yandex SpeechKit TTS (Russia region) ────────────────────────────────────
async function yandexTTS(text: string, voice: string): Promise<Buffer | null> {
  if (!process.env.YANDEX_API_KEY || !process.env.YANDEX_FOLDER_ID) return null

  const yandexVoice = voice === 'female' ? 'alena' : voice === 'warm' ? 'jane' : 'filipp'

  try {
    const params = new URLSearchParams({
      text,
      lang: 'ru-RU',
      voice: yandexVoice,
      format: 'mp3',
      folderId: process.env.YANDEX_FOLDER_ID,
    })
    const response = await fetch(
      `https://tts.api.cloud.yandex.net/speech/v1/tts:synthesize?${params}`,
      {
        method: 'POST',
        headers: { Authorization: `Api-Key ${process.env.YANDEX_API_KEY}` },
        signal: AbortSignal.timeout(15000),
      },
    )
    if (!response.ok) {
      console.error('Yandex TTS error:', response.status)
      return null
    }
    return Buffer.from(await response.arrayBuffer())
  } catch (e: any) {
    console.error('Yandex TTS exception:', e.message)
    return null
  }
}

// ─── Groq TTS ─────────────────────────────────────────────────────────────────
async function groqTTS(text: string, selectedVoice: string): Promise<Buffer | null> {
  // playai-tts is primary; tts-1 is legacy fallback
  for (const model of ['playai-tts', 'tts-1']) {
    try {
      const response = await groq.audio.speech.create({ model, voice: selectedVoice, input: text, response_format: 'mp3' })
      return Buffer.from(await response.arrayBuffer())
    } catch (e: any) {
      console.error('TTS failed with model:', model, e.message)
    }
  }
  return null
}

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { allowed } = await checkRateLimit(`rl:tts:${session.user.id}`, 30, 60)
  if (!allowed) return rateLimitResponse()

  try {
    const { text, lang = 'en', voice = 'female', country = 'global' } = await req.json()
    if (!text) return NextResponse.json({ error: 'No text' }, { status: 400 })

    const clean = cleanTextForTTS(text)
    if (!clean.trim()) return NextResponse.json({ error: 'Empty' }, { status: 400 })

    const voiceKey = `${lang}_${voice}` as keyof typeof VOICE_MAP
    const selectedGroqVoice = VOICE_MAP[voiceKey] || 'aoede'

    let buffer: Buffer | null = null

    if (country === 'ru' && process.env.YANDEX_API_KEY) {
      console.log('→ TTS: Yandex SpeechKit')
      buffer = await yandexTTS(clean, voice)
      if (!buffer) {
        console.log('Yandex TTS failed, falling back to Groq')
        buffer = await groqTTS(clean, selectedGroqVoice)
      }
    } else {
      console.log('→ TTS: Groq')
      buffer = await groqTTS(clean, selectedGroqVoice)
    }

    if (!buffer) {
      return NextResponse.json({ error: 'TTS unavailable' }, { status: 503 })
    }

    return new NextResponse(buffer.buffer as ArrayBuffer, {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Content-Length': buffer.length.toString(),
        'Cache-Control': 'no-cache',
      },
    })
  } catch (error: unknown) {
    console.error('TTS error:', error instanceof Error ? error.message : error)
    return NextResponse.json({ error: 'TTS unavailable' }, { status: 500 })
  }
}
