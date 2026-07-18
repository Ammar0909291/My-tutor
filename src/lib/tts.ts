import { cleanTextForTTS } from './tts-cleaner'

export type VoiceType = 'male' | 'female' | 'warm'
export type TeachingLang = 'ru' | 'en' | 'hi'

export const VOICE_SETTINGS: Record<VoiceType, { pitch: number; rate: number }> = {
  male:   { pitch: 0.75, rate: 0.85 },
  female: { pitch: 1.25, rate: 0.9  },
  warm:   { pitch: 1.0,  rate: 0.87 },
}

// Shared by the settings API and the Tutor Max voice-speed picker — single source of truth.
export const VOICE_SPEED_OPTIONS = [0.5, 0.75, 1.0, 1.25, 1.5] as const

// Languages with a real server-side TTS provider wired up in /api/tts
// (hi -> Sarvam, ru -> Yandex). 'en' has none and is expected to fall back
// to the browser's speechSynthesis by design. This only drives the
// client's dispatch decision (server-TTS vs. browser-TTS) — the server
// route's actual provider selection isn't structurally identical (Sarvam
// keys off `lang`, Yandex keys off the server-derived `country`), so this
// list must be kept in sync by hand if a provider is added/removed.
export const SERVER_TTS_LANGS: TeachingLang[] = ['hi', 'ru']

export const LANG_LOCALE: Record<TeachingLang, string> = {
  ru: 'ru-RU',
  en: 'en-US',
  hi: 'hi-IN',
}

// Languages allowed to use the browser's native SpeechRecognition API for
// mic input, instead of the MediaRecorder -> /api/stt -> Whisper pipeline.
// Deliberately narrow (English only) — SpeechRecognition is free and fast
// but unsupported on Firefox and historically flaky on Safari for
// non-English locales, and a bad transcription silently corrupts what gets
// sent to the tutor (worse than TTS picking the wrong voice). Only grow
// this list after manually verifying 'hi'/'ru' recognition quality on real
// Chrome/Edge devices.
export const SPEECH_RECOGNITION_LANGS: TeachingLang[] = ['en']

export function canUseSpeechRecognition(lang: TeachingLang): boolean {
  if (typeof window === 'undefined') return false
  const hasApi = 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window
  return hasApi && SPEECH_RECOGNITION_LANGS.includes(lang)
}

// The Web Speech API has no SSML — it's the only way to shape rhythm for a
// single continuous utterance. Splitting cleaned text into sentence-sized
// segments and speaking them as a chain (small gap between each) gives real,
// audible breathing pauses between ideas instead of one flat, rushed
// read-through. Pure/testable on purpose — kept separate from the
// window.speechSynthesis orchestration below.
export function splitIntoSpeechSegments(text: string): string[] {
  const parts = text.match(/[^.!?]+[.!?]+|[^.!?]+$/g)
  if (!parts) return [text]
  return parts.map((p) => p.trim()).filter(Boolean)
}

// A question deserves a slightly longer breath before it's asked (Tutor Max
// Review, Finding 4: "small pauses before questions") — a plain declarative
// sentence gets the shorter, ordinary breathing gap.
export function pauseBeforeSegment(segment: string | undefined): number {
  if (!segment) return 0
  return /\?\s*$/.test(segment) ? 450 : 220
}

// Questions are also spoken very slightly slower — natural conversational
// emphasis, not a robotic flat rate. Explanatory sentences keep the caller's
// configured rate untouched.
export function rateForSegment(baseRate: number, segment: string): number {
  return /\?\s*$/.test(segment) ? baseRate * 0.94 : baseRate
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
  const segments = splitIntoSpeechSegments(clean)

  // Speaks one sentence-sized segment at a time, waiting for a short,
  // question-aware pause between each — the chain is what turns "one flat
  // utterance" into natural breathing rhythm. onEnd (the caller's callback,
  // e.g. clearing an "isSpeaking" UI flag) only fires once, after the last
  // segment finishes or on error — callers can't tell the difference from
  // the pre-chaining single-utterance behavior.
  const speakFrom = (index: number, voice: SpeechSynthesisVoice | undefined) => {
    if (myGeneration !== ttsGeneration) return
    if (index >= segments.length) { onEnd?.(); return }
    const segment = segments[index]
    const utter = new SpeechSynthesisUtterance(segment)
    utter.lang = locale
    utter.pitch = config.pitch
    utter.rate = rateForSegment(config.rate * safeSpeed, segment)
    utter.volume = 1.0
    if (voice) utter.voice = voice
    utter.onend = () => {
      if (myGeneration !== ttsGeneration) return
      const next = segments[index + 1]
      if (!next) { onEnd?.(); return }
      setTimeout(() => speakFrom(index + 1, voice), pauseBeforeSegment(next))
    }
    utter.onerror = () => onEnd?.()
    window.speechSynthesis.speak(utter)
  }

  // Guard prevents double-speak when both voiceschanged and the fallback timeout fire,
  // and prevents speak() firing after a newer speakText()/stopSpeaking() call has
  // already superseded this one (e.g. the caller navigated away while voices were
  // still loading).
  let spoken = false
  const start = () => {
    if (spoken || myGeneration !== ttsGeneration) return
    spoken = true
    const voices = window.speechSynthesis.getVoices()
    const voice =
      voices.find((v) => v.lang === locale) ??
      voices.find((v) => v.lang.startsWith(lang))
    speakFrom(0, voice)
  }

  if (window.speechSynthesis.getVoices().length === 0) {
    window.speechSynthesis.addEventListener('voiceschanged', start, { once: true })
    setTimeout(start, 500)
  } else {
    start()
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
