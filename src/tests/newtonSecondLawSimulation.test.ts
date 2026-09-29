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
 *   - G3 pilot: exactly one production concept is bound, with no spillover
 */
import { describe, expect, it } from 'vitest'
import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import {
  NEWTON_FIXED_DT, NEWTON_MAX_TICKS, NEWTON_TRACK_M,
  NEWTON_ARROW_SCALES, buildNewtonScene, newtonArrowLength, newtonPhaseAt, newtonReadouts, newtonStateAt,
  newtonTerminalTick, validateNewtonParams,
} from '@/lib/teaching/sceneGenerators/newtonSecondLaw.pure'
import {
  PARAMETRIC_SCENES, canonicalParametricScene, rebuildScene, simulationFor, simulationFrame,
} from '@/lib/teaching/visual/parametricScenes'
import { figureFingerprint } from '@/lib/teaching/visual/sceneAnimation'
import { validateSceneSpec } from '@/lib/teaching/sceneSpecValidator'
import { getConceptSceneGenerator, lookupConceptVisual } from '@/lib/teaching/visualRegistry'
import { resolveVisual } from '@/lib/teaching/visual/resolveVisual'
import { routeSceneGenerator } from '@/lib/teaching/sceneGenerators/sceneRouter'
import { ACTIVATED_SCENE_KINDS, buildCanonicalScene } from '@/lib/teaching/visual/conceptSceneParams'
import type { SceneSpec } from '@/lib/teaching/sceneSpec'
import { cameraDistanceForAspect } from '@/lib/teaching/visual/layout'

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

  it('at rest on the start line: only the inputs — no acceleration or velocity arrow, no trace', () => {
    const ids = canonicalParametricScene(KIND)!.steps.flatMap((s) => s.objects).map((o) => o.id)
    expect(ids).toContain('block')
    expect(ids).toContain('force')
    expect(ids).not.toContain('acceleration')
    expect(ids).not.toContain('acceleration-label')
    expect(ids).not.toContain('velocity')
    expect(ids).not.toContain('velocity-time-graph')
  })
})

/** Every learner-facing string a frame carries: title, labels, narration, panels, description, goal. */
function frameText(spec: SceneSpec): string {
  const labels = spec.steps.flatMap((s) => s.objects).map((o) => ('text' in o && typeof o.text === 'string' ? o.text : ''))
  const panels = (spec.explainer?.panels ?? []).map((p) => `${p.heading} ${p.body ?? ''} ${(p.lines ?? []).join(' ')}`)
  return [spec.title, spec.ariaLabel, spec.teachingGoal, ...spec.steps.map((s) => s.narration), ...labels, ...panels].join(' | ')
}

describe('pilot polish — the answer is withheld until the run shows it', () => {
  it.each(GRID)('tick 0 states no acceleration anywhere (F=$force, m=$mass)', (p) => {
    const spec = simulationFrame(KIND, p, 0)!
    const text = frameText(spec)
    const a = p.force / p.mass
    expect(text).not.toMatch(/\ba\s*=|m\/s²|F\s*\/\s*m|accelerat(es|ion is|ion of)/i)
    // …nor the numeric value of a in any format the frame uses.
    if (a > 0) {
      for (const n of [a.toFixed(2), a.toFixed(1)]) expect(text).not.toContain(`${n} m/s`)
    }
    const ids = spec.steps.flatMap((s) => s.objects).map((o) => o.id)
    expect(ids).not.toContain('acceleration')
    expect(ids).not.toContain('velocity')
  })

  it('the slider guidance does not state the relationship the learner is testing', () => {
    for (const v of PARAMETRIC_SCENES[KIND].variables) {
      expect(v.effect).not.toMatch(/proportion|accelerat|less|more|faster|slower|halve|double/i)
      expect(v.effect.length).toBeGreaterThan(15)
    }
  })

  it('the acceleration appears once the block is moving, stated as observed', () => {
    const spec = buildNewtonScene({ force: 10, mass: 2 }, 10)
    const ids = spec.steps.flatMap((s) => s.objects).map((o) => o.id)
    expect(ids).toContain('acceleration')
    expect(ids).toContain('velocity')
    expect(frameText(spec)).toContain('a = 5.00 m/s²')
  })
})

describe('pilot polish — readable arrows that stay true to the physics', () => {
  const len = (o: { from: number[]; to: number[] }) => Math.hypot(o.to[0] - o.from[0], o.to[1] - o.from[1])
  const arrow = (spec: SceneSpec, id: string) =>
    spec.steps.flatMap((s) => s.objects).find((o) => o.id === id) as { from: number[]; to: number[] } | undefined

  it('the default run draws arrows at least 2 world units long', () => {
    const spec = buildNewtonScene({ force: 10, mass: 2 }, 100)
    expect(len(arrow(spec, 'acceleration')!)).toBeGreaterThanOrEqual(2)
    expect(len(arrow(spec, 'velocity')!)).toBeGreaterThanOrEqual(2)
    expect(len(arrow(spec, 'force')!)).toBeGreaterThanOrEqual(2)
  })

  it('arrow lengths stay proportional across runs: twice the mass, half the acceleration arrow', () => {
    const a1 = len(arrow(buildNewtonScene({ force: 10, mass: 2 }, 10), 'acceleration')!)
    const a2 = len(arrow(buildNewtonScene({ force: 10, mass: 4 }, 10), 'acceleration')!)
    expect(a1 / a2).toBeCloseTo(2, 2)
  })

  it('an arrow beyond the cap is drawn at the cap and its label says so — never silently shortened', () => {
    expect(newtonArrowLength(40, NEWTON_ARROW_SCALES.acceleration)).toEqual({ length: NEWTON_ARROW_SCALES.max, capped: true })
    const spec = buildNewtonScene({ force: 20, mass: 0.5 }, 10) // a = 40 m/s²
    expect(len(arrow(spec, 'acceleration')!)).toBeCloseTo(NEWTON_ARROW_SCALES.max, 5)
    expect(frameText(spec)).toContain('a = 40.00 m/s² (arrow capped)')
  })
})

describe("pilot polish — the frame says what is true of THIS tick", () => {
  const panel = (spec: SceneSpec) => spec.explainer?.panels?.[0]
  it('start → moving → finished', () => {
    const p = { force: 10, mass: 2 }
    expect(newtonPhaseAt(p, 0)).toBe('start')
    expect(panel(buildNewtonScene(p, 0))).toEqual({ heading: "What's happening?", body: expect.stringMatching(/ready to push the 2\.0 kg block from rest/) })
    expect(newtonPhaseAt(p, 50)).toBe('moving')
    expect(panel(buildNewtonScene(p, 50))!.body).toMatch(/speeding up: after 1\.00 s it has moved 2\.50 m and reached 5\.00 m\/s/)
    const end = newtonTerminalTick(p)
    expect(newtonPhaseAt(p, end)).toBe('finished')
    expect(panel(buildNewtonScene(p, end))!.body).toMatch(/reached the end of the track after 2\.84 s/)
  })

  it('the panel is the step narration, so the two cannot disagree', () => {
    for (const tick of [0, 1, 50, 142]) {
      const spec = buildNewtonScene({ force: 10, mass: 2 }, tick)
      expect(panel(spec)!.body).toBe(spec.steps[1].narration)
    }
  })

  it('the description claims a v–t line only once one is drawn', () => {
    for (const tick of [0, 1, 20, 34, 35, 100]) {
      const spec = buildNewtonScene({ force: 10, mass: 2 }, tick)
      const drawn = spec.steps.flatMap((s) => s.objects).some((o) => o.id === 'velocity-time-graph')
      expect(/rising in a straight line/.test(spec.ariaLabel ?? '')).toBe(drawn)
    }
  })
})

describe('pilot polish — labels', () => {
  it('the v–t graph carries both axis names and its scale', () => {
    const texts = canonicalParametricScene(KIND)!.steps.flatMap((s) => s.objects).map((o) => ('text' in o ? o.text : null))
    for (const t of ['t (s)', 'v (m/s)', '0', '10', '45']) expect(texts).toContain(t)
  })

  it('the tutor-visible text cannot be read as a measurement on the empty graph', () => {
    // Measured live: "10 s" and "45 m/s" as axis-end labels were narrated as
    // "after 10 seconds it reaches 45 m/s". Ends are bare ticks; the ranges are
    // stated as ranges, and frame 0 says the graph is empty.
    const spec = canonicalParametricScene(KIND)!
    const labels = spec.steps.flatMap((s) => s.objects).map((o) => ('text' in o ? o.text : '')).join(' | ')
    expect(labels).not.toMatch(/\d\s*m\/s|\d+\s*s\b/)
    expect(spec.steps[0].narration).toMatch(/time axis runs from 0 to 10 s and its speed axis from 0 to 45 m\/s\. It stays empty until the experiment runs\./)
  })

  it('no live (per-tick) value is drawn on the canvas — the DOM readouts are the one live source', () => {
    const labelsAt = (tick: number) => buildNewtonScene({ force: 10, mass: 2 }, tick).steps
      .flatMap((s) => s.objects).filter((o) => o.type === 'label').map((o) => (o as { text: string }).text)
    const a = labelsAt(20), b = labelsAt(60)
    expect(a).toEqual(b)
    expect(a.join(' ')).not.toMatch(/\bt\s*=|\bv\s*=|\bx\s*=/)
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

describe('G3 pilot: exactly ONE production concept is bound', () => {
  const PILOT = 'phys.mech.newtons-second-law'

  /** Every canonical KG concept id across every registered subject. */
  const ALL_CONCEPTS: string[] = (() => {
    const ids: string[] = []
    for (const dir of ['mathematics', 'physics', 'chemistry', 'computer-science', 'biology', 'english']) {
      const f = join(process.cwd(), 'docs', dir, 'kg', 'graph.json')
      if (!existsSync(f)) continue
      const g = JSON.parse(readFileSync(f, 'utf8'))
      const cs: Array<{ id: string }> = Array.isArray(g.concepts) ? g.concepts : Object.values(g.concepts ?? g)
      for (const c of cs) ids.push(c.id)
    }
    return ids
  })()
  const servedKind = (conceptId: string, learnerRequest: 'diagram' | null) => {
    const d = resolveVisual({ message: learnerRequest ? 'can you show me a diagram?' : '', lessonConceptId: conceptId, learnerRequest })
    const payload = d.payload as { renderer?: string; sceneSpec?: SceneSpec } | null
    return payload?.renderer === 'scene' ? payload.sceneSpec?.parametric?.kind ?? null : null
  }

  it('the pilot concept is bound through the EXISTING registry field, keeping its card as fallback', () => {
    expect(getConceptSceneGenerator(PILOT)).toBe(KIND)
    const entry = lookupConceptVisual(PILOT)!
    expect(entry.primary).toBe('three_newton_forces') // Tier 1 fallback, unchanged
    const registry = readFileSync(join(process.cwd(), 'src/lib/teaching/visualRegistry.ts'), 'utf8')
    expect(registry.match(new RegExp(`sceneGenerator: '${KIND}'`, 'g'))).toHaveLength(1)
  })

  it('across the WHOLE corpus, only the pilot concept is served the simulation', () => {
    expect(ALL_CONCEPTS.length).toBeGreaterThan(1500)
    for (const request of [null, 'diagram'] as const) {
      const served = ALL_CONCEPTS.filter((id) => servedKind(id, request) === KIND)
      expect(served, `learnerRequest=${request}`).toEqual([PILOT])
    }
  }, 120_000) // two resolver sweeps over ~1,900 concepts (same precedent as the KG-wide visual sweeps)

  it('the pilot is served frame 0 of the simulation — the canonical static figure', () => {
    const d = resolveVisual({ message: 'can you show me a diagram?', lessonConceptId: PILOT, learnerRequest: 'diagram' })
    expect(d.graphical).toBe(true)
    expect(d.source).toBe('registry')
    expect(d.provenance).toBe(`generator:kind-default:${KIND}`)
    const scene = (d.payload as { sceneSpec: SceneSpec }).sceneSpec
    expect(figureFingerprint(scene)).toBe(figureFingerprint(simulationFrame(KIND, PARAMETRIC_SCENES[KIND].defaults, 0)!))
    expect(scene.parametric).toEqual({ kind: KIND, params: { force: 10, mass: 2 } })
  })

  it('neighbouring concepts keep exactly the visuals they had', () => {
    const card = (id: string) => {
      const d = resolveVisual({ message: 'can you show me a diagram?', lessonConceptId: id, learnerRequest: 'diagram' })
      return (d.payload as { renderer?: string; visualType?: string } | null)?.visualType ?? null
    }
    expect(card('phys.mech.newtons-first-law')).toBe('three_newton_forces')
    expect(card('phys.mech.newtons-third-law')).toBe('three_newton_forces')
    expect(card('phys.mech.force')).toBe('force_diagram')
    expect(servedKind('phys.mech.projectile-motion', 'diagram')).toBe('projectile')
  })

  it('the canonical path builds exactly frame 0', () => {
    expect(ACTIVATED_SCENE_KINDS).toContain(KIND)
    expect(buildCanonicalScene(KIND)).toEqual(simulationFrame(KIND, PARAMETRIC_SCENES[KIND].defaults, 0))
  })

  it('no text ever routes to the kind: it is not a keyword route and has no LLM extractor', () => {
    const router = readFileSync(join(process.cwd(), 'src/lib/teaching/sceneGenerators/sceneRouter.ts'), 'utf8')
    // Present exactly once, in the SceneGeneratorKind type union only.
    expect(router.match(new RegExp(`'${KIND}'`, 'g'))).toHaveLength(1)
    for (const text of ["Newton's second law F = ma", 'a force of 10 N accelerates a 2 kg mass', 'net force equals mass times acceleration']) {
      expect(routeSceneGenerator(text), text).not.toBe(KIND)
    }
    const host = readFileSync(join(process.cwd(), 'src/lib/teaching/sceneGenerators/newtonSecondLaw.ts'), 'utf8')
    expect(host).not.toContain('generateJSON')
  })
})

describe('pilot polish — framed for the canvas it is drawn in', () => {
  const frame = (p: { force: number; mass: number }, tick: number) => simulationFrame(KIND, p, tick)!

  it('on a wide desktop canvas the camera comes closer; on a 4:3-or-narrower one it keeps the server framing', () => {
    const f = frame({ force: 10, mass: 2 }, 0)
    expect(cameraDistanceForAspect(f, 2.36)).toBeLessThan(f.cameraDistance!)
    expect(cameraDistanceForAspect(f, 4 / 3)).toBe(f.cameraDistance)
    expect(cameraDistanceForAspect(f, 1.1)).toBe(f.cameraDistance)
  })

  it('never moves the camera further than the scene’s own distance', () => {
    for (const aspect of [0.5, 1, 1.5, 2, 3, 5]) {
      const f = frame({ force: 20, mass: 0.5 }, 30)
      expect(cameraDistanceForAspect(f, aspect)).toBeLessThanOrEqual(f.cameraDistance!)
    }
  })

  it('is the same for every tick and every (F, m), so the camera never re-zooms during or between runs', () => {
    const d = cameraDistanceForAspect(frame({ force: 10, mass: 2 }, 0), 2.36)
    for (const p of GRID) for (const tick of [0, 1, 71, 142, newtonTerminalTick(p)]) {
      expect(cameraDistanceForAspect(frame(p, tick), 2.36)).toBe(d)
    }
  })
})
