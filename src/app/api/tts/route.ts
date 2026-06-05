import Groq from 'groq-sdk'
import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { cleanTextForTTS } from '@/lib/tts-cleaner'

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY || '' })

const VOICE_MAP: Record<string, string> = {
  en_male:   'Fritz-PlayAI',
  en_female: 'Celeste-PlayAI',
  en_warm:   'Arista-PlayAI',
  hi_male:   'Fritz-PlayAI',
  hi_female: 'Celeste-PlayAI',
  hi_warm:   'Arista-PlayAI',
  ru_male:   'Fritz-PlayAI',
  ru_female: 'Celeste-PlayAI',
  ru_warm:   'Arista-PlayAI',
}

async function yandexTTS(text: string, voice: string): Promise<Buffer | null> {
  if (!process.env.YANDEX_API_KEY || !process.env.YANDEX_FOLDER_ID) return null
  const voiceMap: Record<string, string> = { male: 'ermil', female: 'alena', warm: 'jane' }
  try {
    const params = new URLSearchParams({
      text,
      lang: 'ru-RU',
      voice: voiceMap[voice] || 'alena',
      format: 'mp3',
      folderId: process.env.YANDEX_FOLDER_ID,
    })
    const res = await fetch('https://tts.api.cloud.yandex.net/speech/v1/tts:synthesize', {
      method: 'POST',
      headers: {
        Authorization: `Api-Key ${process.env.YANDEX_API_KEY}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    })
    if (!res.ok) return null
    return Buffer.from(await res.arrayBuffer())
  } catch { return null }
}

export async function POST(req: Request) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { text, lang = 'en', voice = 'female' } = await req.json()
    if (!text) return NextResponse.json({ error: 'No text' }, { status: 400 })

    const clean = cleanTextForTTS(text)
    if (!clean.trim()) return NextResponse.json({ error: 'Empty' }, { status: 400 })

    let buffer: Buffer

    if (lang === 'ru') {
      const yandex = await yandexTTS(clean, voice)
      if (yandex) {
        return new NextResponse(yandex.buffer as ArrayBuffer, {
          headers: { 'Content-Type': 'audio/mpeg', 'Content-Length': yandex.length.toString(), 'Cache-Control': 'no-cache' },
        })
      }
      // fallback to Groq
    }

    const voiceKey = `${lang}_${voice}` as keyof typeof VOICE_MAP
    const selectedVoice = VOICE_MAP[voiceKey] || 'Celeste-PlayAI'
    const response = await groq.audio.speech.create({ model: 'playai-tts', voice: selectedVoice, input: clean, response_format: 'mp3' })
    buffer = Buffer.from(await response.arrayBuffer())

    return new NextResponse(buffer.buffer as ArrayBuffer, {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Content-Length': buffer.length.toString(),
        'Cache-Control': 'no-cache',
      },
    })
  } catch (error: any) {
    console.error('TTS error:', error.message)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
