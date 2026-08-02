/**
 * Voice Playback Manager (P8.1) — the ONE owner of Tutor voice playback.
 *
 * ROOT CAUSE of overlapping speech: playback had two independent mechanisms
 * and no owner.
 *   1. Browser speech synthesis  (lib/tts.ts speakText / stopSpeaking)
 *   2. A server-TTS <audio> element (new Audio(objectUrl))
 * LessonScreen's handleSpeak started one of them WITHOUT stopping the other
 * first, so a new response could begin while old speech was still playing.
 * Worse, an in-flight server-TTS fetch that resolved after a new playback had
 * begun would overwrite the audio ref — orphaning a still-playing Audio object
 * that nothing could ever stop. Nothing stopped playback on learner
 * interaction at all, so "Got it" left the old voice running.
 *
 * DESIGN: a generation counter is the whole concurrency model. Every start()
 * takes the next generation and immediately stops whatever was playing. Any
 * async work (a TTS fetch) captures its generation and is discarded the moment
 * a newer generation exists — so the NEWEST REQUEST ALWAYS WINS, and a late
 * arrival can never resurrect itself or leak an Audio object. There are no
 * timers and no delays anywhere: stopping is synchronous.
 *
 * The manager is transport-agnostic: it knows nothing about speechSynthesis,
 * fetch or Audio. Callers hand it a `PlaybackSource` that knows how to start
 * and how to stop. That keeps this unit-testable with no DOM and means the two
 * existing mechanisms are REUSED rather than reimplemented.
 */

export type PlaybackId = string

/**
 * A startable/stoppable unit of audio. `start` returns a disposer that must
 * synchronously halt output and release resources (revoke object URLs, drop
 * listeners). Returning a disposer rather than exposing a stop() keeps the
 * resource captured in the closure that created it, which is what makes leaks
 * structurally hard.
 */
export interface PlaybackSource {
  start(callbacks: { onEnded: () => void; onError: () => void }): () => void
}

export interface PlaybackState {
  /** The id currently playing, or null when idle. */
  playingId: PlaybackId | null
  /** Monotonic; increments on every start and every stop. */
  generation: number
}

type Listener = (state: PlaybackState) => void

export class VoicePlaybackManager {
  private generation = 0
  private playingId: PlaybackId | null = null
  private dispose: (() => void) | null = null
  private listeners = new Set<Listener>()

  getState(): PlaybackState {
    return { playingId: this.playingId, generation: this.generation }
  }

  /** Subscribe to state changes. Returns an unsubscribe — callers MUST call it
   *  on unmount, which is what keeps the listener set from growing. */
  subscribe(listener: Listener): () => void {
    this.listeners.add(listener)
    return () => { this.listeners.delete(listener) }
  }

  /** Test/introspection aid: how many subscribers are attached. */
  listenerCount(): number {
    return this.listeners.size
  }

  private emit(): void {
    const state = this.getState()
    for (const l of [...this.listeners]) l(state)
  }

  /**
   * Stop immediately and synchronously. Idempotent: stopping when idle is a
   * no-op that still advances the generation, so any async work already in
   * flight is invalidated by the act of stopping.
   */
  stop(): void {
    this.generation += 1
    const dispose = this.dispose
    this.dispose = null
    const wasPlaying = this.playingId !== null
    this.playingId = null
    if (dispose) {
      // A throwing disposer must not leave the manager wedged — state is
      // already cleared above, so we are consistent either way.
      try { dispose() } catch { /* disposal is best-effort */ }
    }
    if (wasPlaying || dispose) this.emit()
  }

  /**
   * Begin playback of `id`, cancelling anything already playing FIRST. Returns
   * the generation token for this playback so callers can check `isCurrent`
   * around their own async work.
   */
  start(id: PlaybackId, source: PlaybackSource): number {
    // Rule: stop -> dispose -> reset -> only then begin. stop() does the first
    // three, and bumps the generation so any older async work is dead.
    this.stop()
    const generation = this.generation
    this.playingId = id

    const finish = () => {
      // A completion callback from a superseded playback must be ignored —
      // otherwise a late onEnded from generation N clears generation N+1.
      if (this.generation !== generation) return
      this.dispose = null
      this.playingId = null
      this.emit()
    }

    let dispose: () => void
    try {
      dispose = source.start({ onEnded: finish, onError: finish })
    } catch {
      // A source that fails to start must leave NO zombie state: no hanging
      // "playing" flag, and the next playback still works.
      if (this.generation === generation) {
        this.dispose = null
        this.playingId = null
      }
      this.emit()
      return generation
    }

    // The source may have completed synchronously (or been superseded during
    // start()). Only retain the disposer if this generation is still current;
    // otherwise dispose it right now so it cannot leak.
    if (this.generation !== generation || this.playingId === null) {
      try { dispose() } catch { /* best-effort */ }
      return generation
    }

    this.dispose = dispose
    this.emit()
    return generation
  }

  /** True when `generation` is still the active one — the guard async callers
   *  use before touching shared state after an await. */
  isCurrent(generation: number): boolean {
    return this.generation === generation
  }

  /** True when this id is the one currently playing. */
  isPlaying(id: PlaybackId): boolean {
    return this.playingId === id
  }

  /** Full teardown: stop playback AND drop every listener. For unmount. */
  destroy(): void {
    this.stop()
    this.listeners.clear()
  }
}

/**
 * The process-wide singleton. A module-level instance is deliberate: it is what
 * makes "only one voice can play" true across components, routes and lesson
 * changes, rather than per-component instances that cannot see each other.
 *
 * A page refresh tears the module down with the page, so playback can never
 * survive a reload — voice only starts when the new page explicitly asks.
 */
export const voicePlayback = new VoicePlaybackManager()
