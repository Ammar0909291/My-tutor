export type VoiceType = 'male' | 'female' | 'warm'
export type TeachingLang = 'ru' | 'en' | 'hi'

let currentAudio: HTMLAudioElement | null = null

export async function speakText(
  text: string,
  lang: TeachingLang = 'en',
  voice: VoiceType = 'female',
  onEnd?: () => void,
): Promise<void> {
  if (typeof window === 'undefined') return
  stopSpeaking()

  try {
    const response = await fetch('/api/tts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, lang, voice }),
    })

    if (!response.ok) {
      console.error('TTS request failed:', response.status)
      onEnd?.()
      return
    }

    const blob = await response.blob()
    const url = URL.createObjectURL(blob)
    const audio = new Audio(url)
    currentAudio = audio

    audio.onended = () => {
      URL.revokeObjectURL(url)
      currentAudio = null
      onEnd?.()
    }
    audio.onerror = () => {
      URL.revokeObjectURL(url)
      currentAudio = null
      onEnd?.()
    }

    await audio.play()
  } catch (error: any) {
    console.error('TTS playback error:', error.message)
    onEnd?.()
  }
}

export function stopSpeaking(): void {
  if (currentAudio) {
    currentAudio.pause()
    try { URL.revokeObjectURL(currentAudio.src) } catch {}
    currentAudio = null
  }
}

export function isSpeaking(): boolean {
  return currentAudio !== null && !currentAudio.paused
}
