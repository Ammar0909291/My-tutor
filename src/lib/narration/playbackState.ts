/**
 * Narrated Read-Along — playback state transitions.
 *
 * Pure, DOM-free. Every transition takes the current state and returns a
 * new one — no timers, no audio objects, no React. This is what makes
 * "pause preserves position," "resume continues from there," and
 * "completion is handled cleanly" independently testable without a browser,
 * and it is the single place those rules live (the hook below only calls
 * these functions; it never mutates status ad hoc).
 */
import type { NarrationPlaybackState, NarrationSegment } from './types'
import { INITIAL_NARRATION_STATE } from './types'

export function idle(): NarrationPlaybackState {
  return { ...INITIAL_NARRATION_STATE }
}

export function loading(): NarrationPlaybackState {
  return { status: 'LOADING', activeSegmentIndex: null, progressPercent: 0 }
}

/** Begin (or resume) playback at `segmentIndex`. The SAME function serves
 *  both "start playing segment 0" and "resume playing wherever we paused" —
 *  resume is not a special case, it is just `playing` called with the index
 *  pause() left behind, which is what guarantees resume can never silently
 *  restart from the beginning. */
export function playing(state: NarrationPlaybackState, segmentIndex: number, progressPercent?: number): NarrationPlaybackState {
  return {
    status: 'PLAYING',
    activeSegmentIndex: segmentIndex,
    progressPercent: progressPercent ?? state.progressPercent,
  }
}

/** Freeze exactly where playback is — the active segment and progress are
 *  carried forward unchanged, never reset. This is the one function that
 *  makes "pause preserves position" true; nothing else may zero these
 *  fields on pause. */
export function paused(state: NarrationPlaybackState): NarrationPlaybackState {
  return { ...state, status: 'PAUSED' }
}

export function completed(segmentCount: number): NarrationPlaybackState {
  return {
    status: 'COMPLETED',
    activeSegmentIndex: segmentCount > 0 ? segmentCount - 1 : null,
    progressPercent: 100,
  }
}

export function errored(): NarrationPlaybackState {
  return { status: 'ERROR', activeSegmentIndex: null, progressPercent: 0 }
}

/** Explicit Replay/Restart — the ONLY transition allowed to return to the
 *  beginning; every other path (pause -> play) must preserve position. */
export function restarted(): NarrationPlaybackState {
  return { status: 'PLAYING', activeSegmentIndex: 0, progressPercent: 0 }
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
