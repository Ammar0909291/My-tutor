const ELEVENLABS_BASE = 'https://api.elevenlabs.io/v1'
const DEFAULT_VOICE_ID = process.env.ELEVENLABS_VOICE_ID ?? 'nPczCjzI2devNBz1zQrb'

export async function synthesizeSpeech(text: string, voiceId = DEFAULT_VOICE_ID): Promise<ArrayBuffer> {
  const apiKey = process.env.ELEVENLABS_API_KEY
  if (!apiKey) throw new Error('ELEVENLABS_API_KEY not set')

  // Truncate to avoid ElevenLabs 2500-char limit per request
  const truncated = text.slice(0, 2400)

  const res = await fetch(`${ELEVENLABS_BASE}/text-to-speech/${voiceId}`, {
    method: 'POST',
    headers: {
      'xi-api-key': apiKey,
      'Content-Type': 'application/json',
      'Accept': 'audio/mpeg',
    },
    body: JSON.stringify({
      text: truncated,
      model_id: 'eleven_multilingual_v2',
      output_format: 'mp3_44100_128',
      voice_settings: {
        stability: 0.38,
        similarity_boost: 0.80,
        style: 0.45,
        use_speaker_boost: true,
      },
    }),
  })

  if (!res.ok) {
    // ElevenLabs returns JSON errors — surface the real message
    let detail = `HTTP ${res.status}`
    try {
      const json = await res.json() as { detail?: { message?: string } | string }
      if (typeof json.detail === 'string') detail = json.detail
      else if (typeof json.detail?.message === 'string') detail = json.detail.message
      else detail = JSON.stringify(json)
    } catch {
      detail = await res.text().catch(() => detail)
    }
    throw new Error(`ElevenLabs error: ${detail}`)
  }

  const contentType = res.headers.get('content-type') ?? ''
  if (!contentType.includes('audio')) {
    const body = await res.text().catch(() => '')
    throw new Error(`ElevenLabs returned non-audio content: ${contentType} — ${body.slice(0, 200)}`)
  }

  return res.arrayBuffer()
}
