import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { transcribeAudio, GEO_BLOCK_MSG } from '@/lib/voice/whisper'

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json({ error: 'Whisper not configured' }, { status: 503 })
  }

  try {
    const formData = await req.formData()
    const audio = formData.get('audio') as File | null

    if (!audio || audio.size === 0) {
      return NextResponse.json({ error: 'No audio provided' }, { status: 400 })
    }

    const text = await transcribeAudio(audio)
    return NextResponse.json({ text })
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    console.error('[whisper]', err)
    if (msg === GEO_BLOCK_MSG) {
      return NextResponse.json(
        { error: 'Голосовой ввод недоступен в вашем регионе. Пожалуйста, используйте текстовый ввод.', code: 'GEO_BLOCKED' },
        { status: 451 }
      )
    }
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
