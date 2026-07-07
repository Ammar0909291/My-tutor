// Tutor ↔ Visual Synchronization Layer — Visual Learning Sprint S, Task 4.
// Pure functions that align lesson narration segments to animation steps and
// produce a synchronization plan. No AI generation, no I/O, no rendering — only
// the synchronization STRUCTURE. See docs/TUTOR_VISUAL_SYNCHRONIZATION_AUDIT.md.

import type { LessonSegment, LessonTimeline } from './lessonSegments'

/** One animation step paired with the narration that should play at it. */
export interface SyncStep {
  /** 1-based animation step (matches useTeachingPlayback's revealStep). */
  step: number
  /** Narration aligned to this step, or null if a step has no segment. */
  narration: string | null
  /** True when a narration segment maps to this exact step. */
  matched: boolean
}

export type SyncStatus = 'ok' | 'narration_overflow' | 'incomplete_coverage'

export interface SyncPlan {
  visualType?: string
  stepCount: number
  steps: SyncStep[]
  /**
   * ok               — every segment maps to a valid step, all steps covered.
   * incomplete_coverage — valid, but some animation steps have no narration.
   * narration_overflow  — one or more segments reference a step beyond stepCount (clamped out).
   */
  status: SyncStatus
}

/**
 * Task 4 — builds a synchronization plan aligning a lesson timeline's narration
 * segments to a visual's animation steps (1..stepCount). Pure and deterministic:
 * - each step gets the narration of the segment whose `visualStep` equals it
 *   (last one wins if duplicates);
 * - segments pointing past `stepCount` are reported as `narration_overflow`;
 * - steps with no segment are allowed and reported as `incomplete_coverage`.
 */
export function buildSyncPlan(timeline: LessonTimeline, stepCount: number): SyncPlan {
  const narrationByStep = new Map<number, string>()
  let overflow = false

  for (const seg of timeline.segments) {
    if (seg.visualStep < 1 || seg.visualStep > stepCount) {
      overflow = true
      continue
    }
    narrationByStep.set(seg.visualStep, seg.narration)
  }

  const steps: SyncStep[] = Array.from({ length: Math.max(0, stepCount) }, (_, i) => {
    const step = i + 1
    const narration = narrationByStep.get(step) ?? null
    return { step, narration, matched: narration !== null }
  })

  const fullyCovered = steps.length > 0 && steps.every((s) => s.matched)
  const status: SyncStatus = overflow ? 'narration_overflow' : fullyCovered ? 'ok' : 'incomplete_coverage'

  return { visualType: timeline.visualType, stepCount, steps, status }
}

/**
 * Task 4 helper — given a current animation step (e.g. from
 * useTeachingPlayback's onStepChange), returns the narration that should be
 * active at that step, or null. Pure.
 */
export function narrationForStep(plan: SyncPlan, currentStep: number): string | null {
  return plan.steps.find((s) => s.step === currentStep)?.narration ?? null
}

/**
 * Convenience builder for callers that have a flat narration list (one line per
 * step, in order). Produces a `LessonTimeline` whose segment i maps to step i+1.
 * Pure; no AI. The actual narration text comes from the caller, never generated here.
 */
export function timelineFromNarrationLines(visualType: string, lines: string[]): LessonTimeline {
  const segments: LessonSegment[] = lines.map((narration, i) => ({
    id: `${visualType}-seg-${i + 1}`,
    narration,
    visualStep: i + 1,
  }))
  return { visualType, segments }
}
