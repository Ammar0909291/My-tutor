import Groq from 'groq-sdk'
import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { checkRateLimit, rateLimitResponse } from '@/lib/rateLimit'

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY || '' })

export async function POST(req: Request) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { allowed } = await checkRateLimit(`rl:stt:${session.user.id}`, 30, 60)
    if (!allowed) return rateLimitResponse()

    const formData = await req.formData()
    const audioFile = formData.get('audio') as File
    const lang = (formData.get('lang') as string) || 'en'

    if (!audioFile) {
      return NextResponse.json({ error: 'No audio' }, { status: 400 })
    }

    const transcription = await groq.audio.transcriptions.create({
      file: audioFile,
      model: 'whisper-large-v3',
      language: lang,
      response_format: 'json',
    })

    return NextResponse.json({ text: transcription.text })
  } catch (error: any) {
    console.error('STT error:', error.message)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
