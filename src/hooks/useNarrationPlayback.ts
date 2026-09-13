/**
 * useNarrationPlayback — the ONE reusable narrated read-along hook.
 *
 * Platform-wide by construction: it takes plain text + language/voice/speed,
 * and knows nothing about which subject, lesson, or content type produced
 * that text. Every subject's lesson screen drives the same hook.
 *
 * Reuses rather than parallels the existing audio architecture:
 *   - `voicePlayback` (src/lib/voice/playbackManager.ts) remains the single
 *     app-wide owner of "what is making sound right now" — starting a
 *     narration claims it exactly the way the existing per-message Play
 *     button does, so the two can never overlap, and starting anything else
 *     correctly and fully stops narration.
 *   - The two existing TTS mechanisms (browser speechSynthesis for the
 *     majority of languages, the server-TTS <audio> element for Hindi/
 *     Russian — see SERVER_TTS_LANGS in tts.ts) are reused as-is via the two
 *     engines in src/lib/narration/engines/*, not reimplemented.
 *   - Segment text reuses `splitIntoSpeechSegments`/`cleanTextForTTS`, the
 *     exact functions the existing speakText() already uses.
 *
 * PAUSE vs. STOP: pausing calls the live engine's own pause() and leaves it
 * registered with voicePlayback — nothing is disposed, so resume() can
 * continue the SAME engine instance from its preserved position. Only
 * something ELSE claiming voicePlayback (a different narration, or the
 * legacy per-message Play button) disposes it, via the disposer this hook
 * hands to voicePlayback.start() — which is also how this hook notices it
 * has been superseded (the subscribe effect below) and falls back to IDLE.
 */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { voicePlayback } from '@/lib/voice/playbackManager'
import { SERVER_TTS_LANGS, type TeachingLang, type VoiceType } from '@/lib/tts'
import { buildNarrationSegments } from '@/lib/narration/segments'
import {
  completed, errored, idle, isActivelyPlaying, loading, needsFreshStart, paused as pausedState,
  playing,
} from '@/lib/narration/playbackState'
import type { NarrationPlaybackState } from '@/lib/narration/types'
import { createBrowserSpeechEngine, type NarrationEngine } from '@/lib/narration/engines/browserSpeechEngine'
import { createServerAudioEngine } from '@/lib/narration/engines/serverAudioEngine'

export interface UseNarrationPlaybackOptions {
  /** Unique per narration session — typically the chat message id. Also the
   *  id this hook registers with voicePlayback. */
  id: string
  text: string
  lang: TeachingLang
  voiceType: VoiceType
  speed: number
  country?: string
}

export interface UseNarrationPlaybackResult {
  status: NarrationPlaybackState['status']
  segments: ReturnType<typeof buildNarrationSegments>
  activeSegmentIndex: number | null
  /** Index into `segments[activeSegmentIndex].renderedWords` (word-kind
   *  tokens only) — the single word currently being spoken. */
  activeWordIndex: number | null
  progressPercent: number
  isPlaying: boolean
  play: () => void
  pause: () => void
  toggle: () => void
  replay: () => void
}

export function useNarrationPlayback(opts: UseNarrationPlaybackOptions): UseNarrationPlaybackResult {
  const { id, text, lang, voiceType, speed, country } = opts
  const segments = useMemo(() => buildNarrationSegments(text, id), [text, id])
  const [state, setState] = useState<NarrationPlaybackState>(idle())
  const engineRef = useRef<NarrationEngine | null>(null)
  // Always-current mirror of state, assigned during render (not in an
  // effect) so play()/pause()/toggle() below can branch on the latest status
  // WITHOUT running side effects inside a setState updater (updaters must be
  // pure — React may invoke one more than once, e.g. under StrictMode, which
  // would otherwise start playback twice). The same mirror pattern this
  // file's own speakingId mirror in LessonScreen.tsx already relies on.
  const stateRef = useRef(state)
  stateRef.current = state

  // `notify` is voicePlayback's own onEnded/onError (handed to us via
  // PlaybackSource.start's callback argument, see startFresh below). It MUST
  // be invoked on natural completion/error, not just our own setState — the
  // manager's `playingId` is what other UI (e.g. the per-message "speaking"
  // border highlight, mirrored from voicePlayback in LessonScreen.tsx) reads;
  // without this, that highlight would stay lit forever after narration
  // finishes, since nothing else would ever tell the manager playback ended.
  const buildEngine = useCallback((fromIndex: number, notify: { onEnded: () => void; onError: () => void }): NarrationEngine => {
    const onWordStart = (segmentIndex: number, wordIndex: number | null) => setState((s) => playing(s, segmentIndex, wordIndex))
    const onEnded = () => { setState(completed(segments.length)); notify.onEnded() }
    const onError = () => { setState(errored()); notify.onError() }
    if (SERVER_TTS_LANGS.includes(lang)) {
      return createServerAudioEngine(
        segments,
        { lang, voice: voiceType, country },
        { onWordStart, onEnded, onError, onProgress: (percent) => setState((s) => ({ ...s, progressPercent: percent })) },
      )
    }
    return createBrowserSpeechEngine(segments, { lang, voiceType, speed }, { onWordStart, onEnded, onError })
  }, [segments, lang, voiceType, speed, country])

  // A NEW narration text (a different message, or the same message re-rendered
  // with new content) must never inherit a stale position from a previous
  // one — reset and drop any live engine for the old text.
  useEffect(() => {
    engineRef.current?.dispose()
    engineRef.current = null
    setState(idle())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, text])

  // The single source of truth for "what is making sound" is voicePlayback,
  // exactly as the existing per-message Play button already relies on. The
  // moment anything ELSE claims it (a different narration, or a legacy
  // per-message Play tap), this narration has already been disposed via the
  // disposer below — this only needs to mirror that fact into our own status.
  useEffect(() => {
    const unsubscribe = voicePlayback.subscribe((vpState) => {
      if (vpState.playingId !== id) {
        engineRef.current = null
        setState((s) => (s.status === 'IDLE' || s.status === 'COMPLETED' || s.status === 'ERROR') ? s : idle())
      }
    })
    return unsubscribe
  }, [id])

  // Unmount / lesson navigation: never leak a live engine.
  useEffect(() => () => { engineRef.current?.dispose(); engineRef.current = null }, [])

  const startFresh = useCallback((fromIndex: number) => {
    setState(loading())
    voicePlayback.start(id, {
      start: (vpCallbacks) => {
        const engine = buildEngine(fromIndex, vpCallbacks)
        engineRef.current = engine
        engine.start(fromIndex)
        return () => engine.dispose()
      },
    })
  }, [buildEngine, id])

  const play = useCallback(() => {
    if (segments.length === 0) return
    const current = stateRef.current
    if (needsFreshStart(current)) { startFresh(0); return }
    if (current.status !== 'PAUSED') return
    if (engineRef.current) {
      engineRef.current.resume()
      // Preserve the EXACT paused word position — native resume() continues
      // the same utterance/audio element, so the engine's own next
      // onWordStart will naturally pick up from here; this just keeps the
      // UI from flashing back to "no word highlighted" in the meantime.
      setState((s) => playing(s, s.activeSegmentIndex ?? 0, s.activeWordIndex))
      return
    }
    // The engine was lost (e.g. voicePlayback gave it up while this
    // component was unmounted) — rebuild at the preserved index rather than
    // silently restarting from the beginning.
    startFresh(current.activeSegmentIndex ?? 0)
  }, [segments.length, startFresh])

  const pause = useCallback(() => {
    if (stateRef.current.status !== 'PLAYING') return
    engineRef.current?.pause()
    setState((s) => pausedState(s))
  }, [])

  const toggle = useCallback(() => {
    if (stateRef.current.status === 'PLAYING') pause()
    else play()
  }, [play, pause])

  const replay = useCallback(() => {
    // Explicit Replay/Restart — the one action allowed to jump back to the
    // beginning regardless of current status (unlike play(), which only
    // resumes from a preserved position). startFresh(0) itself disposes any
    // live engine before building a new one, so no separate teardown is
    // needed here.
    startFresh(0)
  }, [startFresh])

  return {
    status: state.status,
    segments,
    activeSegmentIndex: state.activeSegmentIndex,
    activeWordIndex: state.activeWordIndex,
    progressPercent: state.progressPercent,
    isPlaying: isActivelyPlaying(state),
    play,
    pause,
    toggle,
    replay,
  }
}
