import { ElevenLabsClient } from 'elevenlabs'

const DEFAULT_VOICE_ID = process.env.ELEVENLABS_VOICE_ID ?? 'pNInz6obpgDQGcFmaJgB'

const globalForEL = globalThis as unknown as { el: ElevenLabsClient | undefined }

const elevenlabs = globalForEL.el ?? new ElevenLabsClient({
  apiKey: process.env.ELEVENLABS_API_KEY ?? '',
})

if (process.env.NODE_ENV !== 'production') globalForEL.el = elevenlabs

export async function synthesizeSpeech(text: string, voiceId = DEFAULT_VOICE_ID): Promise<ArrayBuffer> {
  const stream = await elevenlabs.textToSpeech.convert(voiceId, {
    text,
    model_id: 'eleven_multilingual_v2',
    output_format: 'mp3_44100_128',
    voice_settings: {
      stability: 0.80,
      similarity_boost: 0.75,
      style: 0,              // 0 = no style exaggeration → calm, confident voice
      use_speaker_boost: true,
    },
  })

  const chunks: Buffer[] = []
  for await (const chunk of stream) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk as Uint8Array))
  }

  const buf = Buffer.concat(chunks)
  // Copy into a plain ArrayBuffer so BodyInit / decodeAudioData accept it
  const out = new ArrayBuffer(buf.length)
  new Uint8Array(out).set(buf)
  return out
}
