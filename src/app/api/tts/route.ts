import Groq from 'groq-sdk'
import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { cleanTextForTTS } from '@/lib/tts-cleaner'

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY || '' })

const VOICE_MAP: Record<string, string> = {
  ru_male:   'Fritz-PlayAI',
  ru_female: 'Celeste-PlayAI',
  ru_warm:   'Arista-PlayAI',
  en_male:   'Fritz-PlayAI',
  en_female: 'Celeste-PlayAI',
  en_warm:   'Arista-PlayAI',
  hi_male:   'Fritz-PlayAI',
  hi_female: 'Celeste-PlayAI',
  hi_warm:   'Arista-PlayAI',
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

    const voiceKey = `${lang}_${voice}` as keyof typeof VOICE_MAP
    const selectedVoice = VOICE_MAP[voiceKey] || 'Celeste-PlayAI'
    const response = await groq.audio.speech.create({ model: 'playai-tts', voice: selectedVoice, input: clean, response_format: 'mp3' })
    const buffer = Buffer.from(await response.arrayBuffer())

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
