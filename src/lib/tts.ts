export type VoiceType = 'male' | 'female' | 'warm'

// Chrome bug: long utterances pause after ~15s. Resume every 14s as workaround.
function startResumeTimer(utterance: SpeechSynthesisUtterance): ReturnType<typeof setInterval> {
  return setInterval(() => {
    if (!window.speechSynthesis.speaking) return
    window.speechSynthesis.pause()
    window.speechSynthesis.resume()
  }, 14000)
}

export function speakText(
  text: string,
  voice: VoiceType,
  onStart?: () => void,
  onEnd?: () => void,
): void {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return
  window.speechSynthesis.cancel()

  const utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = 'ru-RU'
  utterance.rate = 0.9
  utterance.volume = 1.0
  utterance.pitch = voice === 'female' ? 1.2 : voice === 'warm' ? 1.0 : 0.8

  const voices = window.speechSynthesis.getVoices()
  const russianVoice = voices.find((v) => v.lang === 'ru-RU' || v.lang.startsWith('ru'))
  if (russianVoice) utterance.voice = russianVoice

  let timer: ReturnType<typeof setInterval> | null = null

  utterance.onstart = () => {
    timer = startResumeTimer(utterance)
    onStart?.()
  }
  const cleanup = () => {
    if (timer !== null) clearInterval(timer)
    onEnd?.()
  }
  utterance.onend = cleanup
  utterance.onerror = cleanup

  window.speechSynthesis.speak(utterance)
}

export function stopSpeaking(): void {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel()
  }
}
