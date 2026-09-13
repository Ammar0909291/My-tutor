/**
 * Narrated Read-Along — browser speechSynthesis engine.
 *
 * This is the majority-language path (English has no server TTS provider —
 * see /api/tts — and falls back to the browser here exactly as the existing
 * per-message Play button does). It reuses the same building blocks
 * `speakText` (tts.ts) already uses — `rateForSegment`, `pauseBeforeSegment`,
 * `LANG_LOCALE`, `VOICE_SETTINGS` — so cadence and voice selection match the
 * platform's existing speech exactly.
 *
 * ARCHITECTURE, AND WHY (2026-09-13 redesign — supersedes two prior attempts
 * at this same problem, both of which tried to CORRECT `onboundary`'s timing
 * with an invented delay: first a proportional time-window estimate, then a
 * self-calibrating median-gap "pacing guard"). Both were reverted because
 * they treated `onboundary`'s timing as slightly-wrong-but-fixable. It is
 * not fixable from here, for a structural reason: `SpeechSynthesisUtterance`
 * exposes exactly two timing-adjacent fields on a boundary event —
 * `charIndex` and `elapsedTime` — and BOTH are produced by the same
 * synthesis-engine implementation that also decides when to fire the event
 * in the first place. There is no second, independent oracle (no equivalent
 * of `<audio>.currentTime` for `speechSynthesis`) to measure that engine's
 * own timing against, so any JS-side "hold this word back a little" scheme
 * can, at best, smooth arrival JITTER (events bunching up because the JS
 * thread was busy) — it cannot detect or correct a systematic BIAS in the
 * underlying engine's self-reported boundary timing, because there is
 * nothing to compare it to. Public documentation and browser-vendor
 * discussion confirm boundary-event reliability is explicitly NOT
 * guaranteed by spec ("SHOULD" language, not "MUST"), varies by browser,
 * OS voice vs. network voice, and is not Baseline-supported — i.e. this is
 * a known, unsolved-in-general limitation of the API itself, not a bug
 * unique to this codebase's prior attempts.
 *
 * Given that ceiling, inventing a THIRD delay heuristic would only add
 * another layer of unverifiable guessing on top of two that already failed
 * the same way. The honest fix is a change of PROMISE, not a smarter
 * correction: this engine now makes only claims that `onstart` and `onend`
 * can prove outright. Both are unconditionally real per spec — `onstart`
 * fires exactly when an utterance begins, `onend` exactly when it
 * completes, with no "SHOULD"-qualified wording — so "this SEGMENT is
 * currently being read" is a claim this engine can back with certainty.
 * "This WORD, specifically, is being spoken at this exact moment" is not,
 * and is no longer made here: `onboundary` is not consulted at all for
 * display purposes (word-level position for the SERVER-TTS engine is a
 * categorically different claim — see serverAudioEngine.ts's own header —
 * because that engine samples a REAL, hardware-backed audio clock,
 * `<audio>.currentTime`, which speechSynthesis has no equivalent of).
 *
 * `onWordStart(segmentIndex, wordIndex)` is called with `wordIndex: null`
 * once per segment, from `onstart` — the caller (NarratedText) renders a
 * `null` word index as "highlight the whole segment," which is exactly the
 * true, provable claim being made. This also closes the "first word isn't
 * protected" gap the pacing-guard design admitted: there is no first-word
 * special case anymore, because there is no per-word timing decision left
 * to get wrong for word 0 or any other word — the ENTIRE segment is marked
 * active atomically, the instant (and only the instant) real speech for it
 * begins.
 *
 * Pause/resume/replay all still work exactly as before, and are in fact
 * SIMPLER than the pacing-guard version: with no held-back word timer to
 * cancel, pause() only has to stop the underlying speech and clear any
 * pending inter-segment gap timer.
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
  /** Fires whenever the spoken position advances. `segmentIndex` identifies
   *  which segment. `wordIndex` is a specific 0-based index into that
   *  segment's `renderedWords` (word-kind tokens only) when the engine can
   *  back that precise a claim with a real audio-position measurement — the
   *  server-audio engine always supplies one. `wordIndex: null` means "the
   *  whole segment is active, no single word is claimed" — what the
   *  browser-speech engine reports, since it has no audio clock to justify
   *  anything finer. Always fires at least once per segment (from the
   *  engine's own `onstart`/first tick), even on a browser/voice that never
   *  fires a boundary event at all. */
  onWordStart: (segmentIndex: number, wordIndex: number | null) => void
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
    const segment = segments[index]
    // Same trailing-period strip as speakText — some voices read a bare "."
    // as "full stop"; the breathing pause between segments already supplies
    // the rhythm cue the period would have.
    const segmentText = segment.spokenText.replace(/\.\s*$/, '')
    const utter = new Utterance(segmentText)
    utter.lang = locale
    utter.pitch = voiceSettings.pitch
    utter.rate = rateForSegment(voiceSettings.rate * safeSpeed, segmentText)
    utter.volume = 1.0
    const voice = resolveVoice()
    if (voice) utter.voice = voice

    // The ONLY two claims this engine makes: the segment starts (real,
    // unconditional per spec) and the segment ends (same). Nothing
    // in between is displayed — see this file's header for why.
    utter.onstart = () => { if (!disposed) callbacks.onWordStart(index, null) }
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
