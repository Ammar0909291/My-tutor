/**
 * Run / Pause / Step / Reset for a time-stepped simulation (ADR 16) — a pure
 * reducer. The component owns `requestAnimationFrame` and only dispatches
 * events; every decision about what the controls do is made here, so it is
 * tested without a browser.
 *
 * ── THE CLOCK DECIDES HOW MANY TICKS, NEVER WHAT A TICK IS ──────────────────
 * `elapsed` events carry wall-clock milliseconds into an accumulator, which
 * releases whole fixed ticks. The simulation's state is a function of the tick
 * alone, so a slow device and a fast one land on identical states; they only
 * reach them at different wall-clock moments. A frame that arrives late (a
 * background tab, a long GC) releases at most MAX_TICKS_PER_ELAPSED ticks and
 * drops the rest, so the block never teleports.
 *
 * ── PARAMETERS ARE LOCKED WHILE IT RUNS ─────────────────────────────────────
 * Changing the force halfway through a run would make the motion the product
 * of two experiments at once, and the learner could no longer read a = F/m off
 * it. So a parameter change while running is refused (the state is returned
 * unchanged), and a change while paused or finished starts a fresh run.
 *
 * Nothing here grades, persists or reports anything.
 */

import type { SceneParams } from './parametricScenes'

export type SimPhase = 'idle' | 'running' | 'paused' | 'finished'

export interface SimControlState {
  phase: SimPhase
  /** Current tick, in [0, terminalTick]. */
  tick: number
  /** The tick on which this run ends; null when the values are refused (nothing can run). */
  terminalTick: number | null
  /** Ticks advanced by one press of Step. */
  stepTicks: number
  /** Milliseconds per tick (fixedDt · 1000). */
  tickMs: number
  /** Wall-clock milliseconds not yet released as whole ticks. */
  accumulatorMs: number
  params: SceneParams
}

export type SimControlEvent =
  | { type: 'run' }
  | { type: 'pause' }
  | { type: 'step' }
  | { type: 'reset' }
  /** Reduced-motion scrubber / direct seek. Refused while running. */
  | { type: 'seek'; tick: number }
  /** New values from the controls, with the terminal tick the simulation computed for them. */
  | { type: 'setParams'; params: SceneParams; terminalTick: number | null }
  /** Wall-clock time since the last frame. Ignored unless running. */
  | { type: 'elapsed'; ms: number }
  /** The page was hidden (visibilitychange). */
  | { type: 'hidden' }

/** A late frame releases at most this many ticks (0.2 s at 0.02 s per tick). */
export const MAX_TICKS_PER_ELAPSED = 10

export function initialSimControl(opts: {
  params: SceneParams
  terminalTick: number | null
  fixedDt: number
  stepTicks: number
}): SimControlState {
  return {
    phase: 'idle',
    tick: 0,
    terminalTick: opts.terminalTick,
    stepTicks: opts.stepTicks,
    tickMs: opts.fixedDt * 1000,
    accumulatorMs: 0,
    params: opts.params,
  }
}

/** The phase a stopped simulation is in at a given tick. */
function restingPhase(tick: number, end: number): SimPhase {
  if (tick >= end) return 'finished'
  return tick === 0 ? 'idle' : 'paused'
}

export function simulationControl(state: SimControlState, event: SimControlEvent): SimControlState {
  const end = state.terminalTick
  switch (event.type) {
    case 'run':
      if (end === null || state.phase === 'running' || state.phase === 'finished') return state
      return { ...state, phase: 'running', accumulatorMs: 0 }

    case 'pause':
    case 'hidden':
      if (state.phase !== 'running') return state
      return { ...state, phase: restingPhase(state.tick, end ?? 0), accumulatorMs: 0 }

    case 'step': {
      if (end === null || state.phase === 'running' || state.phase === 'finished') return state
      const tick = Math.min(end, state.tick + state.stepTicks)
      return { ...state, tick, phase: tick >= end ? 'finished' : 'paused', accumulatorMs: 0 }
    }

    case 'reset':
      if (state.phase === 'idle' && state.tick === 0) return state
      return { ...state, phase: 'idle', tick: 0, accumulatorMs: 0 }

    case 'seek': {
      if (end === null || state.phase === 'running') return state
      const tick = Math.max(0, Math.min(end, Math.floor(Number.isFinite(event.tick) ? event.tick : 0)))
      return { ...state, tick, phase: restingPhase(tick, end), accumulatorMs: 0 }
    }

    case 'setParams':
      if (state.phase === 'running') return state // locked while a run is active
      return { ...state, params: event.params, terminalTick: event.terminalTick, phase: 'idle', tick: 0, accumulatorMs: 0 }

    case 'elapsed': {
      if (state.phase !== 'running' || end === null) return state
      if (!Number.isFinite(event.ms) || event.ms <= 0) return state
      const acc = state.accumulatorMs + event.ms
      const due = Math.floor(acc / state.tickMs)
      const released = Math.min(due, MAX_TICKS_PER_ELAPSED)
      // A late frame's surplus is dropped, not banked: no catch-up burst later.
      const accumulatorMs = released < due ? 0 : acc - released * state.tickMs
      const tick = Math.min(end, state.tick + released)
      if (tick >= end) return { ...state, tick: end, phase: 'finished', accumulatorMs: 0 }
      return { ...state, tick, accumulatorMs }
    }
  }
}

// ── What the controls may offer right now ─────────────────────────────────────

export const canRun = (s: SimControlState): boolean =>
  s.terminalTick !== null && (s.phase === 'idle' || s.phase === 'paused')
export const canPause = (s: SimControlState): boolean => s.phase === 'running'
export const canStep = (s: SimControlState): boolean =>
  s.terminalTick !== null && (s.phase === 'idle' || s.phase === 'paused')
export const canReset = (s: SimControlState): boolean => s.phase !== 'idle' || s.tick !== 0
/** Sliders are disabled while a run is active. */
export const paramsLocked = (s: SimControlState): boolean => s.phase === 'running'
