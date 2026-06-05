import Groq from 'groq-sdk'
import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY || '' })

const LANGUAGE_MAP: Record<string, string> = { ru: 'ru', en: 'en', hi: 'hi' }

export async function POST(req: Request) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const formData = await req.formData()
    const audioFile = formData.get('audio') as File
    const lang = (formData.get('lang') as string) || 'en'

    if (!audioFile) {
      return NextResponse.json({ error: 'No audio file' }, { status: 400 })
    }

    const transcription = await groq.audio.transcriptions.create({
      file: audioFile,
      model: 'whisper-large-v3',
      language: LANGUAGE_MAP[lang] || 'en',
      response_format: 'json',
    })

    return NextResponse.json({ text: transcription.text })
  } catch (error: any) {
    console.error('STT error:', error.message)
    return NextResponse.json({ error: 'Transcription failed: ' + error.message }, { status: 500 })
  }
}
