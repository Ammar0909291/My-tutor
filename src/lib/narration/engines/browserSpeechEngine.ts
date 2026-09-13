/**
 * Narrated Read-Along — browser speechSynthesis engine.
 *
 * This is the majority-language path (English has no server TTS provider —
 * see /api/tts — and falls back to the browser here exactly as the existing
 * per-message Play button does). It reuses the same building blocks
 * `speakText` (tts.ts) already uses — `rateForSegment`, `pauseBeforeSegment`,
 * `LANG_LOCALE`, `VOICE_SETTINGS` — so cadence and voice selection match the
 * platform's existing speech exactly. What it adds, that `speakText` does
 * not expose, is a per-segment `onstart` boundary (real, authoritative — the
 * browser only fires it when that utterance actually begins speaking, never
 * a fake timer) and genuine pause/resume via the Web Speech API's own
 * `pause()`/`resume()`, which preserve position natively.
 *
 * PAUSE DURING THE INTER-SEGMENT GAP: `speechSynthesis.pause()` only pauses
 * an utterance that is actively speaking — it does nothing during the
 * short breathing pause this engine schedules between sentences. Without
 * extra care, pausing during that gap would let the already-scheduled
 * "start next segment" timer fire anyway, ignoring the pause. `scheduleNext`
 * is the one place a next segment is ever started, and it always checks
 * `paused` first; `pause()` also cancels any pending scheduled start and
 * remembers which segment it was, so `resume()` can start exactly that
 * segment instead of relying on a timer that may never have been allowed to
 * fire. This is the mechanism that makes "pause mid-sentence" and "pause
 * between sentences" both correctly resumable.
 *
 * Dependency-injectable (`speechSynthesisImpl`/`UtteranceCtor`) so this can
 * be exercised in tests with a fake Web Speech API — no real browser or
 * jsdom required, the same technique VoicePlaybackManager's PlaybackSource
 * already uses for testability.
 */
import { LANG_LOCALE, VOICE_SETTINGS, pauseBeforeSegment, rateForSegment, type TeachingLang, type VoiceType } from '../../tts'
import type { NarrationSegment } from '../types'

export interface NarrationEngine {
  /** Begin speaking from `fromIndex` (0 for a fresh start, or wherever a
   *  prior pause left off for a resume). */
  start(fromIndex: number): void
  /** Freeze output at the current position. A no-op if not speaking. */
  pause(): void
  /** Continue from exactly where pause() left off. A no-op if not paused. */
  resume(): void
  /** Fully stop and release resources — for unmount, lesson navigation, or
   *  being superseded by a different playback source. */
  dispose(): void
}

export interface NarrationEngineCallbacks {
  onSegmentStart: (index: number) => void
  onEnded: () => void
  onError: () => void
}

export interface BrowserSpeechEngineOptions {
  lang: TeachingLang
  voiceType: VoiceType
  speed: number
  /** Injectable for tests; defaults to the real Web Speech API. */
  speechSynthesisImpl?: SpeechSynthesis
  UtteranceCtor?: typeof SpeechSynthesisUtterance
}

export function createBrowserSpeechEngine(
  segments: NarrationSegment[],
  opts: BrowserSpeechEngineOptions,
  callbacks: NarrationEngineCallbacks,
): NarrationEngine {
  const synth = opts.speechSynthesisImpl
    ?? (typeof window !== 'undefined' && 'speechSynthesis' in window ? window.speechSynthesis : undefined)
  const Utterance = opts.UtteranceCtor
    ?? (typeof window !== 'undefined' ? window.SpeechSynthesisUtterance : undefined)

  let disposed = false
  let paused = false
  let pendingResumeIndex: number | null = null
  let timeoutHandle: ReturnType<typeof setTimeout> | null = null
  /** The segment index `timeoutHandle` (if set) is scheduled to start —
   *  tracked separately so pause() can recover it after clearing the timer. */
  let scheduledIndex: number | null = null
  const locale = LANG_LOCALE[opts.lang]
  const voiceSettings = VOICE_SETTINGS[opts.voiceType]
  const safeSpeed = Math.min(Math.max(opts.speed || 1, 0.5), 2)

  function resolveVoice(): SpeechSynthesisVoice | undefined {
    if (!synth) return undefined
    const voices = synth.getVoices()
    return voices.find((v) => v.lang === locale) ?? voices.find((v) => v.lang.startsWith(opts.lang))
  }

  function speakFrom(index: number) {
    if (disposed || !synth || !Utterance) return
    if (index >= segments.length) { callbacks.onEnded(); return }
    // Same trailing-period strip as speakText — some voices read a bare "."
    // as "full stop"; the breathing pause between segments already supplies
    // the rhythm cue the period would have.
    const segmentText = segments[index].spokenText.replace(/\.\s*$/, '')
    const utter = new Utterance(segmentText)
    utter.lang = locale
    utter.pitch = voiceSettings.pitch
    utter.rate = rateForSegment(voiceSettings.rate * safeSpeed, segmentText)
    utter.volume = 1.0
    const voice = resolveVoice()
    if (voice) utter.voice = voice
    utter.onstart = () => { if (!disposed) callbacks.onSegmentStart(index) }
    utter.onend = () => {
      if (disposed) return
      const next = index + 1
      if (next >= segments.length) { callbacks.onEnded(); return }
      scheduleNext(next, pauseBeforeSegment(segments[next].spokenText))
    }
    utter.onerror = () => { if (!disposed) callbacks.onError() }
    synth.speak(utter)
  }

  /** The ONE place a next segment is ever started after the first — always
   *  checks `paused` so a pause taken during the inter-segment gap is
   *  respected instead of the timer firing anyway. */
  function scheduleNext(index: number, delayMs: number) {
    if (paused) { pendingResumeIndex = index; return }
    scheduledIndex = index
    timeoutHandle = setTimeout(() => {
      timeoutHandle = null
      scheduledIndex = null
      if (paused) { pendingResumeIndex = index; return }
      speakFrom(index)
    }, delayMs)
  }

  return {
    start(fromIndex: number) {
      paused = false
      pendingResumeIndex = null
      speakFrom(fromIndex)
    },
    pause() {
      if (disposed || paused) return
      paused = true
      if (timeoutHandle !== null) {
        clearTimeout(timeoutHandle)
        timeoutHandle = null
        pendingResumeIndex = scheduledIndex
        scheduledIndex = null
      }
      synth?.pause()
    },
    resume() {
      if (disposed || !paused) return
      paused = false
      if (pendingResumeIndex !== null) {
        const idx = pendingResumeIndex
        pendingResumeIndex = null
        speakFrom(idx)
        return
      }
      synth?.resume()
    },
    dispose() {
      if (disposed) return
      disposed = true
      if (timeoutHandle !== null) { clearTimeout(timeoutHandle); timeoutHandle = null }
      synth?.cancel()
    },
  }
}
