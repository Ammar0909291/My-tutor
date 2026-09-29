/**
 * ADR 16 (G1) — Run / Pause / Step / Reset as a pure reducer.
 *
 * Every row of the ADR's §5 transition table, plus the clock rules: the wall
 * clock only decides how many whole ticks pass, a late frame never teleports
 * the block, and a run ends on its exact terminal tick.
 */
import { describe, expect, it } from 'vitest'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import {
  MAX_TICKS_PER_ELAPSED, canPause, canReset, canRun, canStep, initialSimControl, paramsLocked,
  simulationControl, type SimControlEvent, type SimControlState,
} from '@/lib/teaching/visual/simulationControl'
import { simulationFor } from '@/lib/teaching/visual/parametricScenes'

const sim = simulationFor('newton_second_law')!
const PARAMS = { force: 10, mass: 2 }
const END = sim.terminalTick(PARAMS)! // 142

const fresh = (): SimControlState => initialSimControl({ params: PARAMS, terminalTick: END, fixedDt: sim.fixedDt, stepTicks: sim.stepTicks })
const apply = (s: SimControlState, ...events: SimControlEvent[]) => events.reduce(simulationControl, s)

describe('initial state', () => {
  it('starts idle at tick 0 with 20 ms ticks', () => {
    const s = fresh()
    expect([s.phase, s.tick, s.terminalTick, s.tickMs]).toEqual(['idle', 0, 142, 20])
    expect([canRun(s), canPause(s), canStep(s), canReset(s), paramsLocked(s)]).toEqual([true, false, true, false, false])
  })
})

describe('Run', () => {
  it('idle → running', () => expect(apply(fresh(), { type: 'run' }).phase).toBe('running'))
  it('paused → running, resuming from the same tick', () => {
    const s = apply(fresh(), { type: 'step' }, { type: 'run' })
    expect([s.phase, s.tick]).toEqual(['running', 5])
  })
  it('is refused when finished, and when the values are refused', () => {
    const done = apply(fresh(), { type: 'seek', tick: END })
    expect(apply(done, { type: 'run' })).toBe(done)
    const refused = initialSimControl({ params: { force: 99, mass: 2 }, terminalTick: null, fixedDt: 0.02, stepTicks: 5 })
    expect(apply(refused, { type: 'run' })).toBe(refused)
    expect(canRun(refused)).toBe(false)
  })
})

describe('Pause', () => {
  it('running → paused, state preserved exactly', () => {
    const running = apply(fresh(), { type: 'run' }, { type: 'elapsed', ms: 100 })
    const paused = apply(running, { type: 'pause' })
    expect(paused.phase).toBe('paused')
    expect(paused.tick).toBe(running.tick)
    expect(paused.params).toBe(running.params)
  })
  it('is a no-op when not running', () => {
    const s = fresh()
    expect(apply(s, { type: 'pause' })).toBe(s)
  })
  it('a hidden page pauses a running simulation', () => {
    const s = apply(fresh(), { type: 'run' }, { type: 'elapsed', ms: 60 }, { type: 'hidden' })
    expect([s.phase, s.tick]).toEqual(['paused', 3])
  })
})

describe('Step', () => {
  it('idle → paused at +stepTicks', () => {
    const s = apply(fresh(), { type: 'step' })
    expect([s.phase, s.tick]).toEqual(['paused', 5])
  })
  it('is disabled while running', () => {
    const running = apply(fresh(), { type: 'run' })
    expect(apply(running, { type: 'step' })).toBe(running)
    expect(canStep(running)).toBe(false)
  })
  it('clamps at the terminal tick and finishes there', () => {
    const near = apply(fresh(), { type: 'seek', tick: END - 2 })
    const s = apply(near, { type: 'step' })
    expect([s.phase, s.tick]).toEqual(['finished', END])
    expect(apply(s, { type: 'step' })).toBe(s)
  })
})

describe('Reset', () => {
  it.each([
    ['running', [{ type: 'run' }, { type: 'elapsed', ms: 200 }]],
    ['paused', [{ type: 'step' }]],
    ['finished', [{ type: 'seek', tick: END }]],
  ] as const)('from %s → idle at tick 0', (_, events) => {
    const s = apply(apply(fresh(), ...(events as unknown as SimControlEvent[])), { type: 'reset' })
    expect([s.phase, s.tick, s.accumulatorMs]).toEqual(['idle', 0, 0])
  })
  it('is a no-op when already idle at 0', () => {
    const s = fresh()
    expect(apply(s, { type: 'reset' })).toBe(s)
  })
})

describe('parameters are locked while a run is active (U4)', () => {
  it('a change while running is refused — the same state object comes back', () => {
    const running = apply(fresh(), { type: 'run' }, { type: 'elapsed', ms: 100 })
    expect(paramsLocked(running)).toBe(true)
    expect(apply(running, { type: 'setParams', params: { force: 20, mass: 2 }, terminalTick: 100 })).toBe(running)
  })
  it.each([
    ['idle', [] as SimControlEvent[]],
    ['paused', [{ type: 'step' }] as SimControlEvent[]],
    ['finished', [{ type: 'seek', tick: END }] as SimControlEvent[]],
  ])('a change while %s starts a fresh run with the new values', (_, events) => {
    const s = apply(apply(fresh(), ...events), { type: 'setParams', params: { force: 20, mass: 2 }, terminalTick: 100 })
    expect([s.phase, s.tick, s.terminalTick]).toEqual(['idle', 0, 100])
    expect(s.params).toEqual({ force: 20, mass: 2 })
  })
})

describe('the clock — wall time only decides how many whole ticks pass', () => {
  it('releases whole 20 ms ticks and banks the remainder', () => {
    let s = apply(fresh(), { type: 'run' }, { type: 'elapsed', ms: 50 })
    expect([s.tick, s.accumulatorMs]).toEqual([2, 10])
    s = apply(s, { type: 'elapsed', ms: 10 })
    expect([s.tick, s.accumulatorMs]).toEqual([3, 0])
  })

  it('a slow device and a fast device reach the same tick for the same elapsed time', () => {
    const run = (frameMs: number, totalMs: number) => {
      let s = apply(fresh(), { type: 'run' })
      for (let t = 0; t < totalMs; t += frameMs) s = apply(s, { type: 'elapsed', ms: frameMs })
      return s.tick
    }
    // 1200 ms at 60 fps (20 ms frames) and at 50 fps-ish (40 ms frames) and 100 fps (10 ms).
    expect(run(20, 1200)).toBe(60)
    expect(run(40, 1200)).toBe(60)
    expect(run(10, 1200)).toBe(60)
  })

  it('a late frame (background tab) releases at most MAX_TICKS_PER_ELAPSED and never bursts later', () => {
    let s = apply(fresh(), { type: 'run' }, { type: 'elapsed', ms: 5000 })
    expect(s.tick).toBe(MAX_TICKS_PER_ELAPSED)
    expect(s.accumulatorMs).toBe(0)
    s = apply(s, { type: 'elapsed', ms: 20 })
    expect(s.tick).toBe(MAX_TICKS_PER_ELAPSED + 1)
  })

  it('a run ends on its exact terminal tick and stops there (auto-pause)', () => {
    let s = apply(fresh(), { type: 'run' })
    for (let i = 0; i < 1000 && s.phase === 'running'; i += 1) s = apply(s, { type: 'elapsed', ms: 16.7 })
    expect([s.phase, s.tick]).toEqual(['finished', END])
    expect(apply(s, { type: 'elapsed', ms: 1000 })).toBe(s)
  })

  it('ignores time when not running, and ignores nonsense durations', () => {
    const s = fresh()
    expect(apply(s, { type: 'elapsed', ms: 500 })).toBe(s)
    const running = apply(s, { type: 'run' })
    expect(apply(running, { type: 'elapsed', ms: -5 })).toBe(running)
    expect(apply(running, { type: 'elapsed', ms: Number.NaN })).toBe(running)
  })
})

describe('seek — the reduced-motion scrubber', () => {
  it('lands on the resting phase for the tick, clamped to the run', () => {
    expect(apply(fresh(), { type: 'seek', tick: 70 }).phase).toBe('paused')
    expect(apply(fresh(), { type: 'seek', tick: 0 }).phase).toBe('idle')
    const past = apply(fresh(), { type: 'seek', tick: 10_000 })
    expect([past.phase, past.tick]).toEqual(['finished', END])
    expect(apply(fresh(), { type: 'seek', tick: -3 }).tick).toBe(0)
  })
  it('is refused while running', () => {
    const running = apply(fresh(), { type: 'run' })
    expect(apply(running, { type: 'seek', tick: 50 })).toBe(running)
  })
})

describe('boundaries', () => {
  it('imports nothing but types from the registry — no React, no timers, no server graph', () => {
    const src = readFileSync(join(process.cwd(), 'src/lib/teaching/visual/simulationControl.ts'), 'utf8')
    const imports = [...src.matchAll(/^import[^']*'([^']+)'/gm)].map((m) => m[0])
    expect(imports).toEqual(["import type { SceneParams } from './parametricScenes'"])
    expect(src).not.toMatch(/setTimeout|setInterval|requestAnimationFrame\(|Date\.now|localStorage|fetch\(/)
  })
})
