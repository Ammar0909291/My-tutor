import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'

export async function POST(req: Request) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const lang = body?.lang ?? 'en'

    const fallback = lang === 'ru'
      ? 'Анализ изображений временно недоступен. Опишите свой код текстом и я помогу!'
      : lang === 'hi'
      ? 'Image analysis abhi available nahi hai. Apna code text mein describe karo!'
      : 'Image analysis is temporarily unavailable. Please describe your code in text and I will help!'

    return NextResponse.json({ success: true, text: fallback })
  } catch {
    return NextResponse.json({ success: true, text: 'Image analysis unavailable.' })
  }
}
