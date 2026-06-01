export type VoiceType = 'male' | 'female' | 'warm'

export const VOICE_SETTINGS: Record<VoiceType, { pitch: number; rate: number }> = {
  male:   { pitch: 0.7, rate: 0.85 },
  female: { pitch: 1.4, rate: 0.9  },
  warm:   { pitch: 1.1, rate: 0.88 },
}

// Prime the voice list. Browsers (Chrome especially) populate it async; calling
// getVoices() once kicks off the load so a second call has the list ready.
if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  window.speechSynthesis.getVoices()
}

function pickRussianVoice(): SpeechSynthesisVoice | null {
  if (typeof window === 'undefined') return null
  const voices = window.speechSynthesis.getVoices()
  if (voices.length === 0) return null
  return (
    voices.find((v) => v.lang === 'ru-RU') ??
    voices.find((v) => v.lang.toLowerCase().startsWith('ru')) ??
    null
  )
}

// Chrome bug: long utterances stop after ~15s. Pause/resume keeps them alive.
function startResumeTimer(): ReturnType<typeof setInterval> {
  return setInterval(() => {
    if (!window.speechSynthesis.speaking) return
    window.speechSynthesis.pause()
    window.speechSynthesis.resume()
  }, 14000)
}

export function speakText(
  text: string,
  pitch: number,
  rate: number,
  onStart?: () => void,
  onEnd?: () => void,
): void {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return
  window.speechSynthesis.cancel()

  const speak = () => {
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'ru-RU'
    utterance.pitch = pitch
    utterance.rate = rate
    utterance.volume = 1.0

    const voices = window.speechSynthesis.getVoices()
    const russianVoice = pickRussianVoice()
    if (russianVoice) utterance.voice = russianVoice

    console.log('[TTS] All voices:', voices.map((v) => `${v.name} (${v.lang})`).join(', ') || 'none loaded')
    console.log(`[TTS] Selected voice: "${russianVoice?.name ?? 'default'}" | pitch=${pitch} rate=${rate}`)
    console.log(`[TTS] Text preview: "${text.slice(0, 80)}"`)

    let timer: ReturnType<typeof setInterval> | null = null
    utterance.onstart = () => { timer = startResumeTimer(); onStart?.() }
    const cleanup = () => { if (timer !== null) clearInterval(timer); onEnd?.() }
    utterance.onend = cleanup
    utterance.onerror = cleanup

    window.speechSynthesis.speak(utterance)
  }

  // If voices haven't loaded yet, wait for voiceschanged then speak.
  if (window.speechSynthesis.getVoices().length === 0) {
    const handler = () => {
      window.speechSynthesis.removeEventListener('voiceschanged', handler)
      speak()
    }
    window.speechSynthesis.addEventListener('voiceschanged', handler)
    // Safety: speak anyway after 500ms even without voiceschanged
    setTimeout(() => {
      window.speechSynthesis.removeEventListener('voiceschanged', handler)
      speak()
    }, 500)
  } else {
    speak()
  }
}

export function stopSpeaking(): void {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel()
  }
}
