import { cleanTextForTTS } from './tts-cleaner'

export type VoiceType = 'male' | 'female' | 'warm'
export type TeachingLang = 'ru' | 'en' | 'hi'

export const VOICE_SETTINGS: Record<VoiceType, { pitch: number; rate: number }> = {
  male:   { pitch: 0.75, rate: 0.85 },
  female: { pitch: 1.25, rate: 0.9  },
  warm:   { pitch: 1.0,  rate: 0.87 },
}

const LANG_LOCALE: Record<TeachingLang, string> = {
  ru: 'ru-RU',
  en: 'en-US',
  hi: 'hi-IN',
}

// Prime voices list on load — only in browser, never during SSR
if (typeof window !== 'undefined' && typeof window.speechSynthesis !== 'undefined') {
  window.speechSynthesis.getVoices()
}

export function speakText(
  text: string,
  config: { pitch: number; rate: number },
  onEnd?: () => void,
  lang: TeachingLang = 'en',
): void {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return
  window.speechSynthesis.cancel()

  const clean = cleanTextForTTS(text)
  if (!clean.trim()) { onEnd?.(); return }

  const locale = LANG_LOCALE[lang]
  const utter = new SpeechSynthesisUtterance(clean)
  utter.lang = locale
  utter.pitch = config.pitch
  utter.rate = config.rate
  utter.volume = 1.0

  if (onEnd) {
    utter.onend = onEnd
    utter.onerror = onEnd
  }

  // Guard prevents double-speak when both voiceschanged and the fallback timeout fire
  let spoken = false
  const setVoice = () => {
    if (spoken) return
    spoken = true
    const voices = window.speechSynthesis.getVoices()
    const voice =
      voices.find((v) => v.lang === locale) ??
      voices.find((v) => v.lang.startsWith(lang))
    if (voice) utter.voice = voice
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
