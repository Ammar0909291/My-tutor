export type VoiceType = 'male' | 'female' | 'warm'
export type TeachingLang = 'ru' | 'en' | 'hi'

let currentAudio: HTMLAudioElement | null = null

export async function speakText(
  text: string,
  lang: TeachingLang = 'en',
  voice: VoiceType = 'female',
  onEnd?: () => void,
  country = 'global',
): Promise<void> {
  if (typeof window === 'undefined') return
  stopSpeaking()

  const browserFallback = () => {
    try {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = lang === 'ru' ? 'ru-RU' : lang === 'hi' ? 'hi-IN' : 'en-US'
      utterance.rate = 0.9
      utterance.onend = () => onEnd?.()
      window.speechSynthesis.cancel()
      window.speechSynthesis.speak(utterance)
    } catch {
      onEnd?.()
    }
  }

  try {
    const response = await fetch('/api/tts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, lang, voice, country }),
    })

    if (!response.ok) {
      console.warn('TTS request failed:', response.status, '— falling back to browser TTS')
      browserFallback()
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
      console.warn('Audio playback error — falling back to browser TTS')
      browserFallback()
    }

    await audio.play()
  } catch (error: any) {
    console.warn('TTS error:', error.message, '— falling back to browser TTS')
    browserFallback()
  }
}

export function stopSpeaking(): void {
  if (currentAudio) {
    currentAudio.pause()
    try { URL.revokeObjectURL(currentAudio.src) } catch {}
    currentAudio = null
  }
  if (typeof window !== 'undefined') {
    window.speechSynthesis.cancel()
  }
}

export function isSpeaking(): boolean {
  return currentAudio !== null && !currentAudio.paused
}
