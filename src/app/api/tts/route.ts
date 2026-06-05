import Groq from 'groq-sdk'
import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { cleanTextForTTS } from '@/lib/tts-cleaner'

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY || '' })

const GROQ_VOICE_MAP: Record<string, string> = {
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

const YANDEX_VOICE_MAP: Record<string, string> = {
  male:   'ermil',
  female: 'alena',
  warm:   'jane',
}

async function generateYandexTTS(text: string, voice: string): Promise<Buffer | null> {
  if (!process.env.YANDEX_API_KEY || !process.env.YANDEX_FOLDER_ID) return null
  try {
    const params = new URLSearchParams({
      text,
      lang: 'ru-RU',
      voice: YANDEX_VOICE_MAP[voice] || 'alena',
      format: 'mp3',
      sampleRateHertz: '48000',
      folderId: process.env.YANDEX_FOLDER_ID,
    })
    const response = await fetch('https://tts.api.cloud.yandex.net/speech/v1/tts:synthesize', {
      method: 'POST',
      headers: {
        Authorization: `Api-Key ${process.env.YANDEX_API_KEY}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    })
    if (!response.ok) { console.error('Yandex TTS error:', response.status); return null }
    return Buffer.from(await response.arrayBuffer())
  } catch (e: any) {
    console.error('Yandex TTS exception:', e.message)
    return null
  }
}

async function generateGroqTTS(text: string, lang: string, voice: string): Promise<Buffer> {
  const selectedVoice = GROQ_VOICE_MAP[`${lang}_${voice}`] || 'Celeste-PlayAI'
  const response = await (groq.audio.speech as any).create({
    model: 'playai-tts',
    voice: selectedVoice,
    input: text,
    response_format: 'mp3',
  })
  return Buffer.from(await response.arrayBuffer())
}

export async function POST(req: Request) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { text, lang = 'en', voice = 'female' } = await req.json()
    if (!text || typeof text !== 'string') {
      return NextResponse.json({ error: 'No text provided' }, { status: 400 })
    }

    const cleanText = cleanTextForTTS(text)
    if (!cleanText.trim()) {
      return NextResponse.json({ error: 'Empty text after cleaning' }, { status: 400 })
    }

    let audioBuffer: Buffer

    if (lang === 'ru') {
      const yandex = await generateYandexTTS(cleanText, voice)
      audioBuffer = yandex ?? await generateGroqTTS(cleanText, 'en', voice)
    } else {
      audioBuffer = await generateGroqTTS(cleanText, lang, voice)
    }

    return new NextResponse(audioBuffer.buffer as ArrayBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'audio/mpeg',
        'Content-Length': audioBuffer.length.toString(),
        'Cache-Control': 'no-cache',
      },
    })
  } catch (error: any) {
    console.error('TTS route error:', error.message)
    return NextResponse.json({ error: 'TTS failed: ' + error.message }, { status: 500 })
  }
}
