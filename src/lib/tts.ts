import { cleanTextForTTS } from './tts-cleaner'

export type VoiceType = 'male' | 'female' | 'warm'

export const VOICE_SETTINGS: Record<VoiceType, { pitch: number; rate: number }> = {
  male:   { pitch: 0.75, rate: 0.85 },
  female: { pitch: 1.25, rate: 0.9  },
  warm:   { pitch: 1.0,  rate: 0.87 },
}

// Prime voices list on load
if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  window.speechSynthesis.getVoices()
}

export function speakText(
  text: string,
  config: { pitch: number; rate: number },
  onEnd?: () => void,
): void {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return
  window.speechSynthesis.cancel()

  const clean = cleanTextForTTS(text)
  if (!clean.trim()) { onEnd?.(); return }

  const utter = new SpeechSynthesisUtterance(clean)
  utter.lang = 'ru-RU'
  utter.pitch = config.pitch
  utter.rate = config.rate
  utter.volume = 1.0

  if (onEnd) {
    utter.onend = onEnd
    utter.onerror = onEnd
  }

  const setVoice = () => {
    const voices = window.speechSynthesis.getVoices()
    const ru = voices.find((v) => v.lang === 'ru-RU') ?? voices.find((v) => v.lang.startsWith('ru'))
    if (ru) utter.voice = ru

    console.log(`[TTS] pitch=${config.pitch} rate=${config.rate} | voice="${ru?.name ?? 'default'}" | "${clean.slice(0, 60)}"`)
    window.speechSynthesis.speak(utter)
  }

  if (window.speechSynthesis.getVoices().length === 0) {
    window.speechSynthesis.addEventListener('voiceschanged', setVoice, { once: true })
    setTimeout(setVoice, 500)
  } else {
    setVoice()
  }
}

export function stopSpeaking(): void {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel()
  }
}
