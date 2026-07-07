// Lesson Segment model — Visual Learning Sprint S, Task 2.
// Pure types that map explanation segments to animation steps. No AI changes,
// no behavior, no I/O — just the structure a future narration-driven visual
// sequence will use. See docs/TUTOR_VISUAL_SYNCHRONIZATION_AUDIT.md.

/** One narration segment aligned to a single animation step. */
export interface LessonSegment {
  id: string
  /** The spoken/written explanation for this beat (e.g. "Now mark 0 and 1."). */
  narration: string
  /** The 1-based animation step (revealStep value) this narration aligns to. */
  visualStep: number
}

/** An ordered set of narration↔step segments for one visual. */
export interface LessonTimeline {
  /** The visual type these segments belong to (e.g. "number_line"). Optional — descriptive only. */
  visualType?: string
  segments: LessonSegment[]
}
