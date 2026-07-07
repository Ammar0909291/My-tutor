// Synchronized Playback Controller — Visual Learning Sprint T, Task 4.
// Pure functions that map narration progress to a visual step and advance/retreat
// narration. NO timers, NO AI — only synchronization logic. The resulting step is
// fed to useTeachingPlayback in 'narration' mode. See
// docs/NARRATION_DRIVEN_PLAYBACK_AUDIT.md.

import type { NarrationProgress } from './narrationProgress'

/** Clamp helper. */
function clamp(n: number, lo: number, hi: number): number {
  return Math.max(lo, Math.min(hi, n))
}

/** Creates a narration-progress value at segment 0 (not started). */
export function createNarrationProgress(totalSegments: number): NarrationProgress {
  return { currentSegment: 0, totalSegments: Math.max(0, totalSegments) }
}

/** Task 4 — advance to the next narration segment (clamped at totalSegments). */
export function advance(progress: NarrationProgress): NarrationProgress {
  return { ...progress, currentSegment: clamp(progress.currentSegment + 1, 0, progress.totalSegments) }
}

/** Task 4 — go back one narration segment (clamped at 0). */
export function retreat(progress: NarrationProgress): NarrationProgress {
  return { ...progress, currentSegment: clamp(progress.currentSegment - 1, 0, progress.totalSegments) }
}

/** Task 4 — reset narration to the start. */
export function reset(progress: NarrationProgress): NarrationProgress {
  return { ...progress, currentSegment: 0 }
}

/** Jump to a specific segment (clamped). */
export function seek(progress: NarrationProgress, segment: number): NarrationProgress {
  return { ...progress, currentSegment: clamp(segment, 0, progress.totalSegments) }
}

/**
 * Task 4 — the visual step a narration position maps to. Segment N maps 1:1 to
 * step N, clamped to the visual's stepCount (so a longer/shorter narration than
 * the animation degrades gracefully). This is exactly the value to pass to
 * useTeachingPlayback({ mode: 'narration', narrationStep }).
 */
export function visualStepForSegment(progress: NarrationProgress, stepCount: number): number {
  return clamp(progress.currentSegment, 0, Math.max(0, stepCount))
}

/** True once narration has reached its final segment. */
export function isNarrationComplete(progress: NarrationProgress): boolean {
  return progress.totalSegments > 0 && progress.currentSegment >= progress.totalSegments
}
