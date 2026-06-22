import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { checkRateLimit, rateLimitResponse } from '@/lib/rateLimit'
import { cleanTextForTTS } from '@/lib/tts-cleaner'

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

// ─── Sarvam AI TTS (Bulbul v3, Hindi) ────────────────────────────────────────
// Returns base64-encoded WAV inside a JSON `audios` array — must be decoded,
// unlike Groq/Yandex which return raw binary directly.
async function sarvamTTS(text: string): Promise<Buffer | null> {
  if (!process.env.SARVAM_API_KEY) return null
  try {
    const baseUrl = process.env.SARVAM_BASE_URL || 'https://api.sarvam.ai'
    const response = await fetch(`${baseUrl}/text-to-speech`, {
      method: 'POST',
      headers: {
        'api-subscription-key': process.env.SARVAM_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: text.slice(0, 2500), // REST endpoint limit
        target_language_code: 'hi-IN',
        speaker: 'shubh',
      }),
      signal: AbortSignal.timeout(15000),
    })
    if (!response.ok) {
      // Read the full error body — Sarvam returns a JSON/text payload that
      // names the actual problem (invalid language code, bad speaker, text
      // encoding, etc), which a bare status code hides.
      const errBody = await response.text().catch(() => '<unreadable body>')
      console.error('Sarvam TTS error:', response.status, '| body:', errBody)
      return null
    }
    const data = await response.json()
    const audio = data?.audios?.[0]
    if (typeof audio !== 'string' || !audio) return null
    return Buffer.from(audio, 'base64')
  } catch (e: any) {
    // Node's fetch (undici) surfaces network failures as a generic
    // "fetch failed" message; the real cause (DNS/TLS/timeout/ECONNREFUSED)
    // lives in e.cause. Log both so failures are diagnosable.
    console.error('Sarvam TTS exception:', e.message, '| cause:', e.cause, '| code:', e.cause?.code)
    return null
  }
}

// Note: Groq server-side TTS was removed — its playai-tts model was
// decommissioned and tts-1 never existed on Groq, so the fallback was a dead
// remote call that only added a ~13s stall before failing. When a server TTS
// provider (Sarvam/Yandex) is unavailable or fails, this route returns 503 and
// the client (LessonScreen) falls back to the browser's speechSynthesis — a
// local, network-free path that can't fail the way a second remote API can.

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

    let buffer: Buffer | null = null
    let contentType = 'audio/mpeg'

    if (lang === 'hi' && process.env.SARVAM_API_KEY) {
      console.log('→ TTS: Sarvam (Bulbul v3)')
      buffer = await sarvamTTS(clean)
      if (buffer) contentType = 'audio/wav'
    } else if (country === 'ru' && process.env.YANDEX_API_KEY) {
      console.log('→ TTS: Yandex SpeechKit')
      buffer = await yandexTTS(clean, voice)
    }
    // No other server TTS provider — non-Hindi/non-Russia (and any failure
    // above) returns 503 below so the client uses browser speechSynthesis.

    if (!buffer) {
      // Client (LessonScreen.speakViaServerTTS) catches this and falls back to
      // the local browser speechSynthesis path.
      return NextResponse.json({ error: 'TTS unavailable' }, { status: 503 })
    }

    return new NextResponse(buffer.buffer as ArrayBuffer, {
      headers: {
        'Content-Type': contentType,
        'Content-Length': buffer.length.toString(),
        'Cache-Control': 'no-cache',
      },
    })
  } catch (error: unknown) {
    console.error('TTS error:', error instanceof Error ? error.message : error)
    return NextResponse.json({ error: 'TTS unavailable' }, { status: 500 })
  }
}
