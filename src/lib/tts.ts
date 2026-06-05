export type VoiceType = 'male' | 'female' | 'warm'
export type TeachingLang = 'ru' | 'en' | 'hi'

// Keep for backward compat with LessonScreen voice config
export const VOICE_SETTINGS: Record<VoiceType, { pitch: number; rate: number }> = {
  male:   { pitch: 0.75, rate: 0.85 },
  female: { pitch: 1.25, rate: 0.9  },
  warm:   { pitch: 1.0,  rate: 0.87 },
}

let currentAudio: HTMLAudioElement | null = null

export async function speakText(
  text: string,
  _config: { pitch: number; rate: number },
  onEnd?: () => void,
  lang: TeachingLang = 'en',
  voice: VoiceType = 'female',
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
