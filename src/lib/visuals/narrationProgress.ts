// Narration Progress model — Visual Learning Sprint T, Task 2.
// Pure types describing how far narration has advanced. No AI, no behavior, no
// I/O — the structure that drives narration-controlled playback. See
// docs/NARRATION_DRIVEN_PLAYBACK_AUDIT.md.

/**
 * How far the learner/tutor narration has progressed.
 * `currentSegment` is 0 (not started) … `totalSegments` (finished); each segment
 * corresponds to one animation step.
 */
export interface NarrationProgress {
  currentSegment: number
  totalSegments: number
}
