/**
 * Narrated Read-Along — server-TTS <audio> engine (Hindi/Russian).
 *
 * One request to /api/tts synthesizes the WHOLE narration as a single audio
 * file (Sarvam for 'hi', Yandex for 'ru' — see /api/tts/route.ts; neither
 * provider is asked for or returns word/segment timestamps — CONFIRMED by
 * reading both provider integrations directly: Sarvam returns base64 WAV
 * bytes in a JSON envelope, Yandex returns raw MP3 bytes, neither carries
 * any timing metadata). Position is therefore native to the platform for
 * free: `HTMLAudioElement.pause()`/`.play()` already preserve `currentTime`
 * exactly, so pause/resume here is the browser's own real behaviour — word
 * position included, since it falls directly out of the same
 * `currentTime` — not something this engine has to reconstruct the way the
 * segment-chained speech engine does.
 *
 * WORD SYNC IS A LABELED ESTIMATE, NOT A MEASUREMENT: `buildWordTimeWindows`
 * (timeSync.ts) divides the audio's real, measured `duration` across
 * segments (by spoken-character length) and then across each segment's
 * RENDERED words (by character length plus each word's own trailing gap —
 * see that function's doc comment) once `loadedmetadata` fires. This is
 * explicitly NOT true word-level synchronization — it is the
 * best deterministic fallback available given no provider timestamp exists,
 * isolated entirely behind this one function so real provider timestamps
 * could replace it later without touching any other file. Every tick still
 * reads the audio element's REAL `currentTime` — an animation-frame loop
 * samples it and maps it through the word window table; nothing here runs
 * its own clock or interval to fake progress. Dependency-injectable
 * (`fetchImpl`/`AudioCtor`) for testing without a real browser Audio object.
 *
 * CONSERVATIVE DISPLAY: because the word-window table is an estimate, the
 * same `pacingGuard.ts` used by the browser engine also gates every
 * candidate word here — a tick that would advance the displayed word
 * faster, in real time, than this playback's own recently observed pace
 * is held back one tick at a time (this loop already re-runs every
 * animation frame, so no separate hold timer is needed the way the
 * segment-chained browser engine requires). It never advances the
 * displayed word ahead of what `wordIndexForTime` itself reports for the
 * REAL `audio.currentTime` — only ever delays applying it.
 */
import { buildWordTimeWindows, progressPercentForTime, wordIndexForTime, type WordTimeWindow } from '../timeSync'
import { spokenSequence } from '../segments'
import type { NarrationSegment } from '../types'
import type { NarrationEngine, NarrationEngineCallbacks } from './browserSpeechEngine'
import { INITIAL_PACING_STATE, recordDisplayedAdvance, remainingHoldMs, type PacingGuardState } from '../pacingGuard'

export interface ServerAudioEngineOptions {
  lang: string
  voice: string
  country?: string
  fetchImpl?: typeof fetch
  AudioCtor?: typeof Audio
  createObjectURL?: (blob: Blob) => string
  revokeObjectURL?: (url: string) => void
  /** Injectable clock for the sync loop; defaults to requestAnimationFrame,
   *  falling back to a ~60fps setInterval where rAF is unavailable (tests). */
  scheduleTick?: (cb: () => void) => () => void
  /** Injectable wall clock for the pacing guard; defaults to Date.now. */
  now?: () => number
}

function defaultScheduleTick(cb: () => void): () => void {
  if (typeof requestAnimationFrame === 'function') {
    let handle = requestAnimationFrame(function tick() { cb(); handle = requestAnimationFrame(tick) })
    return () => cancelAnimationFrame(handle)
  }
  const interval = setInterval(cb, 1000 / 60)
  return () => clearInterval(interval)
}

export interface ServerAudioEngineExtraCallbacks extends NarrationEngineCallbacks {
  onProgress: (percent: number) => void
}

export function createServerAudioEngine(
  segments: NarrationSegment[],
  opts: ServerAudioEngineOptions,
  callbacks: ServerAudioEngineExtraCallbacks,
): NarrationEngine {
  const doFetch = opts.fetchImpl ?? fetch
  const AudioCtor = opts.AudioCtor ?? (typeof Audio !== 'undefined' ? Audio : undefined)
  const createUrl = opts.createObjectURL ?? ((b: Blob) => URL.createObjectURL(b))
  const revokeUrl = opts.revokeObjectURL ?? ((u: string) => URL.revokeObjectURL(u))
  const scheduleTick = opts.scheduleTick ?? defaultScheduleTick
  const now = opts.now ?? (() => Date.now())

  let disposed = false
  let audio: HTMLAudioElement | null = null
  let objectUrl: string | null = null
  let wordWindows: WordTimeWindow[] = []
  let stopTicking: (() => void) | null = null
  let lastWordKey: string | null = null
  let pacingState: PacingGuardState = INITIAL_PACING_STATE
  const controller = new AbortController()

  function startTicking() {
    if (stopTicking || !audio) return
    stopTicking = scheduleTick(() => {
      if (!audio || wordWindows.length === 0) return
      const hit = wordIndexForTime(wordWindows, audio.currentTime)
      if (hit) {
        const key = `${hit.segmentIndex}:${hit.wordIndex}`
        if (key !== lastWordKey) {
          // A candidate word the estimate has newly reached. Never applied
          // ahead of `remainingHoldMs`'s own verdict — a "not yet" tick
          // simply leaves `lastWordKey` unchanged, so the NEXT tick
          // (~16ms later) re-evaluates automatically; no separate hold
          // timer needed here since this loop already re-runs every frame.
          const nowMs = now()
          if (remainingHoldMs(pacingState, nowMs) <= 0) {
            lastWordKey = key
            pacingState = recordDisplayedAdvance(pacingState, nowMs)
            callbacks.onWordStart(hit.segmentIndex, hit.wordIndex)
          }
        }
      }
      callbacks.onProgress(progressPercentForTime(audio.currentTime, audio.duration || 0))
    })
  }

  function stopTickingNow() {
    stopTicking?.()
    stopTicking = null
  }

  function release() {
    stopTickingNow()
    if (audio) {
      audio.onended = null
      audio.onerror = null
      audio.onloadedmetadata = null
      audio.pause()
      audio = null
    }
    if (objectUrl) { revokeUrl(objectUrl); objectUrl = null }
  }

  function beginFetch(fromIndex: number) {
    if (!AudioCtor) { callbacks.onError(); return }
    const text = spokenSequence(segments).join(' ')
    doFetch('/api/tts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, lang: opts.lang, voice: opts.voice, country: opts.country }),
      signal: controller.signal,
    })
      .then((res) => { if (!res.ok) throw new Error('tts failed'); return res.blob() })
      .then((blob) => {
        if (disposed) return
        objectUrl = createUrl(blob)
        const el = new AudioCtor(objectUrl)
        audio = el
        el.onloadedmetadata = () => {
          wordWindows = buildWordTimeWindows(segments, el.duration || 0)
          // A resume/seek that isn't a fresh start: jump straight to that
          // segment's first word window instead of narrating from the top.
          if (fromIndex > 0) {
            const segmentStart = wordWindows.find((w) => w.segmentIndex === fromIndex)
            if (segmentStart) el.currentTime = segmentStart.startTime
          }
        }
        el.onended = () => { release(); callbacks.onEnded() }
        el.onerror = () => { release(); callbacks.onError() }
        el.play().then(startTicking).catch(() => { release(); callbacks.onError() })
      })
      .catch((err) => {
        if (disposed || (err as { name?: string })?.name === 'AbortError') return
        callbacks.onError()
      })
  }

  return {
    start(fromIndex: number) {
      lastWordKey = null
      pacingState = INITIAL_PACING_STATE
      beginFetch(fromIndex)
    },
    pause() {
      if (disposed) return
      stopTickingNow()
      audio?.pause()
    },
    resume() {
      if (disposed || !audio) return
      audio.play().then(startTicking).catch(() => callbacks.onError())
    },
    dispose() {
      if (disposed) return
      disposed = true
      controller.abort()
      release()
    },
  }
}
