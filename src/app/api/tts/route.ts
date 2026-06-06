import Groq from 'groq-sdk'
import { NextResponse } from 'next/server'
import { cleanTextForTTS } from '@/lib/tts-cleaner'

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY || '' })

const VOICE_MAP: Record<string, string> = {
  ru_male:   'aoede',
  ru_female: 'aoede',
  ru_warm:   'aoede',
  en_male:   'aoede',
  en_female: 'aoede',
  en_warm:   'aoede',
  hi_male:   'aoede',
  hi_female: 'aoede',
  hi_warm:   'aoede',
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
  const models = ['canopylabs/orpheus-v1-english', 'playai-tts', 'tts-1']
  for (const model of models) {
    try {
      const response = await groq.audio.speech.create({ model, voice: selectedVoice, input: text, response_format: 'mp3' })
      const buf = Buffer.from(await response.arrayBuffer())
      console.log('TTS success with model:', model)
      return buf
    } catch (e: any) {
      console.error('TTS failed with model:', model, e.message)
    }
  }
  return null
}

export async function POST(req: Request) {
  try {
    const { text, lang = 'en', voice = 'female', country = 'global' } = await req.json()
    if (!text) return NextResponse.json({ error: 'No text' }, { status: 400 })

    const clean = cleanTextForTTS(text)
    if (!clean.trim()) return NextResponse.json({ error: 'Empty' }, { status: 400 })

    console.log('=== TTS CALLED ===')
    console.log('GROQ_API_KEY exists:', !!process.env.GROQ_API_KEY)
    console.log('Input text length:', text?.length)
    console.log('TTS request:', { lang, voice, country, textLength: clean.length })

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
    const msg = error instanceof Error ? error.message : 'TTS error'
    console.error('TTS error:', msg)
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
