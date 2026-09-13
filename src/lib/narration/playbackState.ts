/**
 * Narrated Read-Along — playback state transitions.
 *
 * Pure, DOM-free. Every transition takes the current state and returns a
 * new one — no timers, no audio objects, no React. This is what makes
 * "pause preserves position," "resume continues from there," and
 * "completion is handled cleanly" independently testable without a browser,
 * and it is the single place those rules live (the hook below only calls
 * these functions; it never mutates status ad hoc).
 *
 * Word-level position (`activeWordIndex`) is threaded through the exact
 * same transitions as segment position, for the same reasons: pause must
 * freeze it, resume must preserve it, replay is the only path allowed to
 * reset it, and completion clears it (nothing stays highlighted once
 * narration is done).
 */
import type { NarrationPlaybackState, NarrationSegment } from './types'
import { INITIAL_NARRATION_STATE } from './types'

export function idle(): NarrationPlaybackState {
  return { ...INITIAL_NARRATION_STATE }
}

export function loading(): NarrationPlaybackState {
  return { status: 'LOADING', activeSegmentIndex: null, activeWordIndex: null, progressPercent: 0 }
}

/** Begin (or resume) playback at `segmentIndex`/`wordIndex`. The SAME
 *  function serves both "start playing segment 0, word 0" and "resume
 *  playing wherever we paused" — resume is not a special case, it is just
 *  `playing` called with the exact segment+word pause() left behind, which
 *  is what guarantees resume can never silently restart from the
 *  beginning or drop the word position. */
export function playing(
  state: NarrationPlaybackState,
  segmentIndex: number,
  wordIndex: number | null = null,
  progressPercent?: number,
): NarrationPlaybackState {
  return {
    status: 'PLAYING',
    activeSegmentIndex: segmentIndex,
    activeWordIndex: wordIndex,
    progressPercent: progressPercent ?? state.progressPercent,
  }
}

/** Freeze exactly where playback is — the active segment, active word, and
 *  progress are carried forward unchanged, never reset. This is the one
 *  function that makes "pause preserves position" (segment AND word) true;
 *  nothing else may zero these fields on pause. */
export function paused(state: NarrationPlaybackState): NarrationPlaybackState {
  return { ...state, status: 'PAUSED' }
}

export function completed(segmentCount: number): NarrationPlaybackState {
  return {
    status: 'COMPLETED',
    activeSegmentIndex: segmentCount > 0 ? segmentCount - 1 : null,
    activeWordIndex: null,
    progressPercent: 100,
  }
}

export function errored(): NarrationPlaybackState {
  return { status: 'ERROR', activeSegmentIndex: null, activeWordIndex: null, progressPercent: 0 }
}

/** Explicit Replay/Restart — the ONLY transition allowed to return to the
 *  beginning (segment 0, word 0); every other path (pause -> play) must
 *  preserve position. */
export function restarted(): NarrationPlaybackState {
  return { status: 'PLAYING', activeSegmentIndex: 0, activeWordIndex: 0, progressPercent: 0 }
}

/** True while audio is actually making sound — used by UI to decide whether
 *  the control shows Play or Pause. */
export function isActivelyPlaying(state: NarrationPlaybackState): boolean {
  return state.status === 'PLAYING'
}

/** True once nothing further can be resumed FROM (idle/completed/error) —
 *  pressing Play in these states must start over, not "resume" nowhere. */
export function needsFreshStart(state: NarrationPlaybackState): boolean {
  return state.status === 'IDLE' || state.status === 'COMPLETED' || state.status === 'ERROR'
}

export function segmentIndexForProgress(segments: NarrationSegment[], progressPercent: number): number | null {
  if (segments.length === 0) return null
  const idx = Math.floor((progressPercent / 100) * segments.length)
  return Math.min(Math.max(idx, 0), segments.length - 1)
}
