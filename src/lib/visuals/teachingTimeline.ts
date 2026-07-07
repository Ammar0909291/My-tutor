// Reusable, renderer-agnostic timeline model for staged "teacher drawing it live" animation.
// Pure TypeScript — no AI dependency, no React, no DOM. See docs/ANIMATED_TEACHING_AUDIT.md.

export type TimelineAction = 'show' | 'draw' | 'highlight' | 'move' | 'fill'

export interface TimelineStep {
  step: number
  action: TimelineAction
  target: string
  /** Optional per-step duration in ms; falls back to a timeline-level default. */
  durationMs?: number
}

export interface Timeline {
  steps: TimelineStep[]
  /** Default per-step duration in ms when a step doesn't specify its own. */
  defaultStepDurationMs: number
}

export function createTimeline(
  steps: Omit<TimelineStep, 'step'>[],
  defaultStepDurationMs = 600
): Timeline {
  return {
    steps: steps.map((s, i) => ({ ...s, step: i + 1 })),
    defaultStepDurationMs,
  }
}

export function stepDuration(timeline: Timeline, step: TimelineStep): number {
  return step.durationMs ?? timeline.defaultStepDurationMs
}

export function totalDuration(timeline: Timeline): number {
  return timeline.steps.reduce((sum, s) => sum + stepDuration(timeline, s), 0)
}

/** Returns the indices (1-based step numbers) of all steps that should be visible/applied by `elapsedMs`. */
export function stepsAtElapsed(timeline: Timeline, elapsedMs: number, speed = 1): number[] {
  const visible: number[] = []
  let cursor = 0
  for (const s of timeline.steps) {
    const d = stepDuration(timeline, s) / speed
    cursor += d
    if (elapsedMs >= cursor) visible.push(s.step)
    else break
  }
  return visible
}

export type PlaybackState = 'idle' | 'playing' | 'paused' | 'complete'

export interface PlaybackController {
  state: PlaybackState
  elapsedMs: number
  speed: number
}

export function createPlaybackController(speed = 1): PlaybackController {
  return { state: 'idle', elapsedMs: 0, speed }
}

export function play(c: PlaybackController): PlaybackController {
  return { ...c, state: 'playing' }
}

export function pause(c: PlaybackController): PlaybackController {
  return { ...c, state: c.state === 'playing' ? 'paused' : c.state }
}

export function replay(c: PlaybackController): PlaybackController {
  return { ...c, state: 'playing', elapsedMs: 0 }
}

export function tick(c: PlaybackController, deltaMs: number, timeline: Timeline): PlaybackController {
  if (c.state !== 'playing') return c
  const elapsedMs = c.elapsedMs + deltaMs
  const done = elapsedMs >= totalDuration(timeline) / c.speed
  return { ...c, elapsedMs, state: done ? 'complete' : 'playing' }
}

export function setSpeed(c: PlaybackController, speed: number): PlaybackController {
  return { ...c, speed }
}
