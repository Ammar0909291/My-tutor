/**
 * ADR 16 (G1) — the Newton's-second-law time model, its frames, and its place
 * in the parametric registry.
 *
 * What this pins:
 *   - the physics: a = F/m, v = a·t, x = ½·a·t², exact at every tick
 *   - the run ends on the exact first tick the block reaches 20 m (or 10 s)
 *   - determinism: the state depends on the tick alone
 *   - every frame of every run passes the existing SceneSpec validator
 *   - the camera never re-zooms during a run (a fixed world frame)
 *   - frame 0 IS the static figure the registry builds
 *   - no concept is bound to the kind yet (production exposure is gate G3)
 */
import { describe, expect, it } from 'vitest'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import {
  NEWTON_FIXED_DT, NEWTON_MAX_TICKS, NEWTON_TRACK_M,
  buildNewtonScene, newtonReadouts, newtonStateAt, newtonTerminalTick, validateNewtonParams,
} from '@/lib/teaching/sceneGenerators/newtonSecondLaw.pure'
import {
  PARAMETRIC_SCENES, canonicalParametricScene, rebuildScene, simulationFor, simulationFrame,
} from '@/lib/teaching/visual/parametricScenes'
import { figureFingerprint } from '@/lib/teaching/visual/sceneAnimation'
import { validateSceneSpec } from '@/lib/teaching/sceneSpecValidator'
import { getConceptSceneGenerator } from '@/lib/teaching/visualRegistry'
import { ACTIVATED_SCENE_KINDS, buildCanonicalScene } from '@/lib/teaching/visual/conceptSceneParams'
import type { SceneSpec } from '@/lib/teaching/sceneSpec'

const KIND = 'newton_second_law'
const FORCES = [0, 1, 5, 10, 17, 20]
const MASSES = [0.5, 1, 2, 3.5, 7, 10]
const GRID = FORCES.flatMap((force) => MASSES.map((mass) => ({ force, mass })))

const closeTo = (a: number, b: number) => expect(Math.abs(a - b)).toBeLessThanOrEqual(1e-9 * Math.max(1, Math.abs(b)))

describe('the physics', () => {
  it.each(GRID)('a = F/m, v = a·t, x = ½·a·t² at every tick (F=$force, m=$mass)', (p) => {
    const end = newtonTerminalTick(p)
    for (let k = 0; k <= end; k += 1) {
      const s = newtonStateAt(p, k)
      const t = k * NEWTON_FIXED_DT
      expect(s.tick).toBe(k)
      closeTo(s.t, t)
      closeTo(s.a, p.force / p.mass)
      closeTo(s.v, (p.force / p.mass) * t)
      closeTo(s.x, 0.5 * (p.force / p.mass) * t * t)
    }
  })

  it('a block with no net force stays at rest for the whole 10 s', () => {
    const p = { force: 0, mass: 3 }
    expect(newtonTerminalTick(p)).toBe(NEWTON_MAX_TICKS)
    const s = newtonStateAt(p, NEWTON_MAX_TICKS)
    expect([s.a, s.v, s.x]).toEqual([0, 0, 0])
  })

  it.each(GRID.filter((p) => p.force > 0))('the run ends on the FIRST tick the block reaches 20 m (F=$force, m=$mass)', (p) => {
    const end = newtonTerminalTick(p)
    const a = p.force / p.mass
    const x = (k: number) => 0.5 * a * (k * NEWTON_FIXED_DT) ** 2
    if (end < NEWTON_MAX_TICKS) {
      expect(x(end)).toBeGreaterThanOrEqual(NEWTON_TRACK_M)
      expect(x(end - 1)).toBeLessThan(NEWTON_TRACK_M)
    } else {
      expect(x(NEWTON_MAX_TICKS)).toBeLessThan(NEWTON_TRACK_M + 1e-9 + a * NEWTON_FIXED_DT * NEWTON_MAX_TICKS * NEWTON_FIXED_DT)
    }
  })

  it('the default run (10 N on 2 kg) reaches 20 m at t = 2.84 s', () => {
    // a = 5 m/s², t* = √(2·20/5) = 2.828 s → first tick at or past it is 142.
    const p = { force: 10, mass: 2 }
    expect(newtonTerminalTick(p)).toBe(142)
    const s = newtonStateAt(p, 142)
    closeTo(s.t, 2.84)
    expect(s.x).toBeGreaterThanOrEqual(20)
  })

  it('clamps a tick outside the run to the run', () => {
    const p = { force: 10, mass: 2 }
    expect(newtonStateAt(p, -5).tick).toBe(0)
    expect(newtonStateAt(p, 10_000).tick).toBe(newtonTerminalTick(p))
    expect(newtonStateAt(p, Number.NaN).tick).toBe(0)
  })

  it('refuses values outside the declared ranges instead of approximating', () => {
    for (const raw of [{ force: -1, mass: 2 }, { force: 21, mass: 2 }, { force: 10, mass: 0 }, { force: 10, mass: 0.4 },
      { force: 10, mass: 11 }, { force: Number.NaN, mass: 2 }, { force: 10 }, null, 'x']) {
      expect(validateNewtonParams(raw), JSON.stringify(raw)).toBeNull()
    }
    expect(validateNewtonParams({ force: '10', mass: '2' })).toEqual({ force: 10, mass: 2 })
  })

  it('shows acceleration as a MEASUREMENT (Δv/Δt), and only once time has passed', () => {
    const p = { force: 12, mass: 3 }
    expect(newtonReadouts(p, 0).map((r) => r.key)).not.toContain('a_measured')
    const at = newtonReadouts(p, 50).find((r) => r.key === 'a_measured')!
    closeTo(at.value, 4)
  })
})

describe('determinism — the state is a function of the tick alone', () => {
  it('two independent replays produce byte-identical frames', () => {
    const replay = () => {
      const p = { force: 13, mass: 1.5 }
      const out: string[] = []
      for (let k = 0; k <= newtonTerminalTick(p); k += 1) out.push(JSON.stringify(buildNewtonScene(p, k)))
      return out
    }
    expect(replay()).toEqual(replay())
  })

  it('the state reached does not depend on how ticks were grouped into frames', () => {
    const p = { force: 7, mass: 2.5 }
    const end = newtonTerminalTick(p)
    for (const batch of [1, 3, 7, 16]) {
      let k = 0
      while (k < end) k = Math.min(end, k + batch)
      expect(newtonStateAt(p, k)).toEqual(newtonStateAt(p, end))
    }
  })
})

/** Every frame of a run, through the registry's own gate. */
function runFrames(params: { force: number; mass: number }, every = 1): SceneSpec[] {
  const end = newtonTerminalTick(params)
  const frames: SceneSpec[] = []
  for (let k = 0; k <= end; k += every) frames.push(simulationFrame(KIND, params, k)!)
  if ((end % every) !== 0) frames.push(simulationFrame(KIND, params, end)!)
  return frames
}

describe('every frame is a valid SceneSpec', () => {
  it.each(GRID)('F=$force, m=$mass', (p) => {
    const end = newtonTerminalTick(p)
    for (let k = 0; k <= end; k += 1) {
      const frame = simulationFrame(KIND, p, k)
      expect(frame, `tick ${k}`).not.toBeNull()
      const result = validateSceneSpec(frame)
      expect(result.errors.map((e) => `tick ${k} ${e.path}: ${e.message}`)).toEqual([])
      // The raw builder output is valid too, before any framing.
      expect(validateSceneSpec(buildNewtonScene(p, k)).valid).toBe(true)
    }
  })

  it('the extremes of the range stay valid on their last tick', () => {
    for (const p of [{ force: 20, mass: 0.5 }, { force: 1, mass: 10 }, { force: 0, mass: 0.5 }]) {
      expect(validateSceneSpec(simulationFrame(KIND, p, 1e9)).valid).toBe(true)
    }
  })
})

describe('one world frame for the whole run — the camera never re-zooms', () => {
  const fixed = (spec: SceneSpec) => {
    const objs = spec.steps.flatMap((s) => s.objects)
    const floor = objs.find((o) => o.id === 'floor')!
    const finish = objs.find((o) => o.id === 'finish-line')!
    return JSON.stringify([spec.cameraDistance, floor.from, floor.to, finish.from, finish.to])
  }

  it.each(GRID)('the fixed apparatus lands on identical coordinates at every tick (F=$force, m=$mass)', (p) => {
    const frames = runFrames(p, 1)
    const first = fixed(frames[0])
    for (const f of frames) expect(fixed(f)).toBe(first)
  })

  it('and across every (F, m) in range, so runs compare on the same axes', () => {
    const all = new Set(GRID.map((p) => fixed(simulationFrame(KIND, p, 0)!)))
    expect(all.size).toBe(1)
  })

  it('the block really moves: its drawn position tracks x(t)', () => {
    const p = { force: 10, mass: 2 }
    const xs = runFrames(p, 20).map((f) => f.steps.flatMap((s) => s.objects).find((o) => o.id === 'block')!.position![0])
    for (let i = 1; i < xs.length; i += 1) expect(xs[i]).toBeGreaterThan(xs[i - 1])
  })
})

describe('frame 0 is the static figure', () => {
  it.each(GRID)('simulationFrame(tick 0) equals rebuildScene (F=$force, m=$mass)', (p) => {
    expect(simulationFrame(KIND, p, 0)).toEqual(rebuildScene(KIND, p))
  })

  it('the canonical figure is frame 0 of the default run', () => {
    const canonical = canonicalParametricScene(KIND)!
    expect(figureFingerprint(canonical)).toBe(figureFingerprint(simulationFrame(KIND, PARAMETRIC_SCENES[KIND].defaults, 0)!))
    expect(canonical.parametric).toEqual({ kind: KIND, params: { force: 10, mass: 2 } })
    expect(canonical.sceneType).toBe('simulation')
  })

  it('with no net force it says so, and never claims the block speeds up', () => {
    const spec = buildNewtonScene({ force: 0, mass: 3 }, 100)
    const text = [spec.ariaLabel, ...spec.steps.map((s) => s.narration)].join(' ')
    expect(text).toMatch(/No net force|no net force/)
    expect(text).not.toMatch(/grows steadily|pushed by a net force/)
    const ids = spec.steps.flatMap((s) => s.objects).map((o) => o.id)
    expect(ids).not.toContain('force')
    expect(ids).not.toContain('acceleration')
    expect(ids).not.toContain('velocity')
  })

  it('at rest on the start line: no velocity arrow, no trace', () => {
    const ids = canonicalParametricScene(KIND)!.steps.flatMap((s) => s.objects).map((o) => o.id)
    expect(ids).toContain('block')
    expect(ids).toContain('force')
    expect(ids).toContain('acceleration')
    expect(ids).not.toContain('velocity')
    expect(ids).not.toContain('velocity-time-graph')
  })
})

describe('registry integration — reuses PARAMETRIC_SCENES, adds no registry', () => {
  it('declares the approved variables and ranges', () => {
    const entry = PARAMETRIC_SCENES[KIND]
    expect(entry.variables.map((v) => [v.key, v.kind === 'number' ? [v.min, v.max, v.unit] : null])).toEqual([
      ['force', [0, 20, 'N']],
      ['mass', [0.5, 10, 'kg']],
    ])
  })

  it('declares the fixed 0.02 s tick and authored predictions on the entry itself', () => {
    const sim = simulationFor(KIND)!
    expect(sim.fixedDt).toBe(0.02)
    expect(sim.maxTicks).toBe(500)
    expect(sim.predictions.map((p) => p.id)).toEqual(['double-mass', 'double-force'])
    for (const p of sim.predictions) {
      expect(p.options.map((o) => o.relation).sort()).toEqual(['inverse', 'proportional', 'unchanged'])
      expect(p.tests.measure).toBe('a_measured')
    }
  })

  it('every other kind is unchanged: no simulation', () => {
    for (const kind of Object.keys(PARAMETRIC_SCENES).filter((k) => k !== KIND)) {
      expect(simulationFor(kind), kind).toBeNull()
      expect(simulationFrame(kind, PARAMETRIC_SCENES[kind].defaults, 0), kind).toBeNull()
    }
    expect(simulationFor(null)).toBeNull()
    expect(simulationFor('no_such_kind')).toBeNull()
  })

  it('refused values produce no frame, never a wrong one', () => {
    expect(simulationFrame(KIND, { force: 99, mass: 2 }, 3)).toBeNull()
    expect(simulationFor(KIND)!.terminalTick({ force: 5, mass: 0 })).toBeNull()
    expect(simulationFor(KIND)!.observe({ force: 5, mass: 0 }, 1)).toBeNull()
  })
})

describe('no production exposure at G1', () => {
  it('no concept is bound to the kind in the visual registry', () => {
    expect(getConceptSceneGenerator('phys.mech.newtons-second-law')).toBeNull()
    const registry = readFileSync(join(process.cwd(), 'src/lib/teaching/visualRegistry.ts'), 'utf8')
    expect(registry).not.toContain(KIND)
  })

  it('the canonical path builds exactly frame 0 — and only a concept binding can reach it', () => {
    // The resolver calls buildCanonicalScene(getConceptSceneGenerator(conceptId)),
    // so with no concept bound (above) this entry is unreachable in the product.
    expect(ACTIVATED_SCENE_KINDS).toContain(KIND)
    expect(buildCanonicalScene(KIND)).toEqual(simulationFrame(KIND, PARAMETRIC_SCENES[KIND].defaults, 0))
    const resolver = readFileSync(join(process.cwd(), 'src/lib/teaching/visual/resolveVisual.ts'), 'utf8')
    expect(resolver).toContain('buildCanonicalScene(generatorKind, ctx.conceptId)')
    expect(resolver).toContain('const generatorKind = getConceptSceneGenerator(ctx.conceptId)')
  })

  it('the kind has no keyword route and no LLM extractor', () => {
    const router = readFileSync(join(process.cwd(), 'src/lib/teaching/sceneGenerators/sceneRouter.ts'), 'utf8')
    expect(router).not.toContain(KIND)
    const host = readFileSync(join(process.cwd(), 'src/lib/teaching/sceneGenerators/newtonSecondLaw.ts'), 'utf8')
    expect(host).not.toContain('generateJSON')
  })
})
