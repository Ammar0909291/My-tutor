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
 * WORD SYNC IS A LABELED ESTIMATE OF POSITION-WITHIN-AUDIO, NOT OF TIMING:
 * `buildWordTimeWindows` (timeSync.ts) divides the audio's real, measured
 * `duration` across segments (by spoken-character length) and then across
 * each segment's RENDERED words (by character length plus each word's own
 * trailing gap — see that function's doc comment) once `loadedmetadata`
 * fires. The WORD BOUNDARIES are an estimate — no provider this platform
 * integrates with returns per-word timestamps. The CLOCK they are measured
 * against is not: every tick reads the audio element's REAL `currentTime` —
 * a genuine, hardware-backed playback position with no equivalent in the
 * browser-speech engine (see that file's header for why this is a
 * categorically stronger guarantee than anything `onboundary` can offer).
 * An animation-frame loop samples it and maps it through the word window
 * table; nothing here runs its own clock or interval to fake progress, and
 * nothing holds a word back once its real, measured window has been
 * reached — nothing here estimates a DELAY, only a POSITION, from a value
 * that is itself never estimated. Dependency-injectable (`fetchImpl`/
 * `AudioCtor`) for testing without a real browser Audio object.
 */
import { buildWordTimeWindows, progressPercentForTime, wordIndexForTime, type WordTimeWindow } from '../timeSync'
import { spokenSequence } from '../segments'
import type { NarrationSegment } from '../types'
import type { NarrationEngine, NarrationEngineCallbacks } from './browserSpeechEngine'

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

  let disposed = false
  let audio: HTMLAudioElement | null = null
  let objectUrl: string | null = null
  let wordWindows: WordTimeWindow[] = []
  let stopTicking: (() => void) | null = null
  let lastWordKey: string | null = null
  const controller = new AbortController()

  function startTicking() {
    if (stopTicking || !audio) return
    stopTicking = scheduleTick(() => {
      if (!audio || wordWindows.length === 0) return
      const hit = wordIndexForTime(wordWindows, audio.currentTime)
      if (hit) {
        const key = `${hit.segmentIndex}:${hit.wordIndex}`
        if (key !== lastWordKey) {
          // Applied the moment the REAL audio.currentTime reaches this
          // word's window — no additional hold. There is nothing left to
          // guess about the timing here; only the window boundaries
          // (WHERE a word starts/ends) are an estimate, and that estimate
          // is corrected against, never delayed relative to, the real clock.
          lastWordKey = key
          callbacks.onWordStart(hit.segmentIndex, hit.wordIndex)
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
