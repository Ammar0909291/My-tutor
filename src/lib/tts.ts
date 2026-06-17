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

// Bumped on every speak() call and every stopSpeaking() call. The deferred
// voice-resolution callbacks below (voiceschanged listener / fallback
// timeout) capture the generation at creation time and check it before
// calling speechSynthesis.speak() — this prevents a delayed callback from
// starting speech after the caller has already navigated away / cancelled,
// which is what let utterances survive component unmount.
let ttsGeneration = 0

export function speakText(
  text: string,
  configOrLang: { pitch: number; rate: number } | string,
  onEndOrVoiceType?: (() => void) | string,
  langOrCallback?: TeachingLang | (() => void),
  country?: string,
  speed?: number,
): void {
  const config = typeof configOrLang === 'object' ? configOrLang : { pitch: 1, rate: 1 }
  const onEnd = typeof onEndOrVoiceType === 'function' ? onEndOrVoiceType
    : typeof langOrCallback === 'function' ? langOrCallback : undefined
  const lang: TeachingLang = typeof configOrLang === 'string'
    ? (configOrLang as TeachingLang)
    : typeof langOrCallback === 'string' ? langOrCallback : 'en'
  void country
  return _speakTextImpl(text, config, onEnd, lang, speed)
}

function _speakTextImpl(
  text: string,
  config: { pitch: number; rate: number },
  onEnd?: () => void,
  lang: TeachingLang = 'ru',
  speed = 1,
): void {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return
  window.speechSynthesis.cancel()
  const myGeneration = ++ttsGeneration

  const clean = cleanTextForTTS(text)
  if (!clean.trim()) { onEnd?.(); return }

  const safeSpeed = Math.min(Math.max(speed || 1, 0.5), 2)
  const locale = LANG_LOCALE[lang]
  const utter = new SpeechSynthesisUtterance(clean)
  utter.lang = locale
  utter.pitch = config.pitch
  utter.rate = config.rate * safeSpeed
  utter.volume = 1.0

  if (onEnd) {
    utter.onend = onEnd
    utter.onerror = onEnd
  }

  // Guard prevents double-speak when both voiceschanged and the fallback timeout fire,
  // and prevents speak() firing after a newer speakText()/stopSpeaking() call has
  // already superseded this one (e.g. the caller navigated away while voices were
  // still loading).
  let spoken = false
  const setVoice = () => {
    if (spoken || myGeneration !== ttsGeneration) return
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
  // Invalidate any in-flight setVoice() callback (voiceschanged listener or
  // fallback timeout) from a previous speakText() call so it can't call
  // speak() after this point, then cancel anything already queued/speaking.
  ttsGeneration++
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel()
  }
}
