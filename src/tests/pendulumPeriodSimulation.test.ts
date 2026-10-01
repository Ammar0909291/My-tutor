/**
 * ADR 16, second pilot — the pendulum-period time model, its frames, and its
 * place in the parametric registry.
 *
 * What this pins:
 *   - the physics: the exact equation θ'' = −(g/L)·sin θ, integrated with a
 *     fixed step, measures T within 0.1% of the known large-angle series
 *   - T grows with √L, does not depend on the mass, and changes by under 2%
 *     across the whole allowed swing angle (5°–30°)
 *   - determinism: the state depends on the tick alone
 *   - every frame of every run passes the SceneSpec validator, at one camera
 *   - frame 0 withholds the answer (no period anywhere before the run)
 *   - a fair test answers each prediction through the existing evidence reducer
 *   - exactly TWO production concepts are simulation-bound: Newton and this one
 */
import { describe, expect, it } from 'vitest'
import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import {
  PENDULUM_FIXED_DT, PENDULUM_MAX_TICKS, PENDULUM_SCALE, PENDULUM_SWINGS_PER_RUN,
  buildPendulumPeriodScene, pendulumPhaseAt, pendulumReadouts, pendulumStateAt, pendulumTerminalTick,
  validatePendulumPeriodParams, type PendulumPeriodParams,
} from '@/lib/teaching/sceneGenerators/pendulumPeriod.pure'
import {
  PARAMETRIC_SCENES, canonicalParametricScene, rebuildScene, simulationFor, simulationFrame,
} from '@/lib/teaching/visual/parametricScenes'
import { recordSimEvidence, EMPTY_SIM_EVIDENCE, type SimEvidenceLog, type SimEvent } from '@/lib/teaching/visual/simulationEvidence'
import { initialSimControl, paramsLocked, simulationControl, type SimControlEvent, type SimControlState } from '@/lib/teaching/visual/simulationControl'
import { figureFingerprint } from '@/lib/teaching/visual/sceneAnimation'
import { validateSceneSpec } from '@/lib/teaching/sceneSpecValidator'
import { getConceptSceneGenerator, lookupConceptVisual } from '@/lib/teaching/visualRegistry'
import { resolveVisual } from '@/lib/teaching/visual/resolveVisual'
import { routeSceneGenerator } from '@/lib/teaching/sceneGenerators/sceneRouter'
import { ACTIVATED_SCENE_KINDS, buildCanonicalScene } from '@/lib/teaching/visual/conceptSceneParams'
import { cameraDistanceForAspect } from '@/lib/teaching/visual/layout'
import type { SceneSpec } from '@/lib/teaching/sceneSpec'

const KIND = 'pendulum_period'
const PILOT = 'phys.wave.pendulum'
const NEWTON = 'phys.mech.newtons-second-law'
const DEFAULTS: PendulumPeriodParams = { length: 1, amplitudeDeg: 10, mass: 0.5 }
const G = 9.8
const LENGTHS = [0.25, 0.5, 1, 1.5, 2]
const ANGLES = [5, 15, 30]
const GRID = LENGTHS.flatMap((length) => ANGLES.map((amplitudeDeg) => ({ length, amplitudeDeg, mass: 0.5 })))

const T0 = (L: number) => 2 * Math.PI * Math.sqrt(L / G)
/** The exact large-angle period, T0 · (1 + θ²/16 + 11θ⁴/3072 + …) — the textbook series. */
const Texact = (L: number, deg: number) => {
  const th = (deg * Math.PI) / 180
  return T0(L) * (1 + th ** 2 / 16 + (11 * th ** 4) / 3072 + (173 * th ** 6) / 737280)
}
const periodOfRun = (p: PendulumPeriodParams) => pendulumStateAt(p, pendulumTerminalTick(p)).periodMeasured!
const objectsOf = (s: SceneSpec) => s.steps.flatMap((st) => st.objects)
const idsOf = (s: SceneSpec) => objectsOf(s).map((o) => o.id)

describe('the physics', () => {
  it.each(GRID)('measures T within 0.1% of the exact period (L=$length m, $amplitudeDeg°)', (p) => {
    const T = periodOfRun(p)
    expect(Math.abs(T / Texact(p.length, p.amplitudeDeg) - 1)).toBeLessThan(1e-3)
  })

  it('conserves energy: the release angle is reached again on every swing', () => {
    for (const p of GRID) {
      const end = pendulumTerminalTick(p)
      let maxAfterFirst = 0
      for (let k = 1; k <= end; k += 1) maxAfterFirst = Math.max(maxAfterFirst, pendulumStateAt(p, k).theta)
      expect(Math.abs(maxAfterFirst - (p.amplitudeDeg * Math.PI) / 180)).toBeLessThan(2e-3)
    }
  })

  it('four times the length gives twice the time for one swing', () => {
    for (const A of ANGLES) {
      const ratio = periodOfRun({ length: 2, amplitudeDeg: A, mass: 0.5 }) / periodOfRun({ length: 0.5, amplitudeDeg: A, mass: 0.5 })
      expect(ratio).toBeCloseTo(2, 3)
    }
  })

  it('the mass makes no difference at all', () => {
    for (const m of [0.1, 0.4, 1]) expect(periodOfRun({ ...DEFAULTS, mass: m })).toBe(periodOfRun(DEFAULTS))
  })

  it('across the whole allowed swing angle the time for one swing changes by under 2%', () => {
    for (const L of LENGTHS) {
      const ratio = periodOfRun({ length: L, amplitudeDeg: 30, mass: 0.5 }) / periodOfRun({ length: L, amplitudeDeg: 5, mass: 0.5 })
      expect(ratio).toBeGreaterThan(1.01) // it DOES grow a little: the exact equation, not the formula
      expect(ratio).toBeLessThan(1.02)
    }
  })

  it('a run ends on the tick its third full swing completes, well inside the 10 s stop', () => {
    for (const p of GRID) {
      const end = pendulumTerminalTick(p)
      expect(end).toBeLessThan(PENDULUM_MAX_TICKS)
      expect(pendulumStateAt(p, end).swings).toBe(PENDULUM_SWINGS_PER_RUN)
      expect(pendulumStateAt(p, end - 1).swings).toBe(PENDULUM_SWINGS_PER_RUN - 1)
    }
  })

  it('refuses values outside the declared ranges instead of approximating', () => {
    expect(validatePendulumPeriodParams(DEFAULTS)).toEqual(DEFAULTS)
    for (const bad of [
      { ...DEFAULTS, length: 0.2 }, { ...DEFAULTS, length: 2.5 }, { ...DEFAULTS, amplitudeDeg: 4 },
      { ...DEFAULTS, amplitudeDeg: 31 }, { ...DEFAULTS, mass: 0 }, { ...DEFAULTS, mass: 1.5 },
      { ...DEFAULTS, length: Number.NaN }, { ...DEFAULTS, length: 'long' }, null, 'x',
    ]) expect(validatePendulumPeriodParams(bad), JSON.stringify(bad)).toBeNull()
  })

  it('clamps a tick outside the run to the run', () => {
    expect(pendulumStateAt(DEFAULTS, -5).tick).toBe(0)
    expect(pendulumStateAt(DEFAULTS, 1e9).tick).toBe(pendulumTerminalTick(DEFAULTS))
    expect(pendulumStateAt(DEFAULTS, Number.NaN).tick).toBe(0)
  })
})

describe('determinism — the state is a function of the tick alone', () => {
  it('two independent reads produce byte-identical frames', () => {
    for (const tick of [0, 1, 137, 400]) {
      expect(JSON.stringify(buildPendulumPeriodScene(DEFAULTS, tick))).toBe(JSON.stringify(buildPendulumPeriodScene({ ...DEFAULTS }, tick)))
    }
  })
  it('the state reached does not depend on the order ticks are read in', () => {
    const forward = [10, 200, 450].map((k) => pendulumStateAt({ length: 1.5, amplitudeDeg: 20, mass: 0.3 }, k).theta)
    const backward = [450, 200, 10].map((k) => pendulumStateAt({ length: 1.5, amplitudeDeg: 20, mass: 0.3 }, k).theta).reverse()
    expect(forward).toEqual(backward)
  })
})

describe('every frame is a valid SceneSpec, framed by one camera', () => {
  it('validates at every tick of the extreme runs and never re-zooms', () => {
    const cams = new Set<number>()
    for (const p of [{ length: 0.25, amplitudeDeg: 5, mass: 0.1 }, { length: 2, amplitudeDeg: 30, mass: 1 }, DEFAULTS]) {
      const end = pendulumTerminalTick(p)
      for (let k = 0; k <= end; k += 7) {
        const f = simulationFrame(KIND, p, k)!
        expect(validateSceneSpec(f).valid, `${JSON.stringify(p)} @${k}`).toBe(true)
        cams.add(f.cameraDistance!)
        cams.add(cameraDistanceForAspect(f, 2.36))
      }
    }
    expect(cams.size).toBe(2) // one server distance, one wide-canvas distance
  })

  it('draws every length at the same scale: a 2 m string is eight times a 0.25 m one', () => {
    const stringLen = (L: number) => {
      const s = objectsOf(buildPendulumPeriodScene({ length: L, amplitudeDeg: 10, mass: 0.5 }, 0)).find((o) => o.id === 'string')!
      return Math.hypot(s.to![0] - s.from![0], s.to![1] - s.from![1])
    }
    expect(stringLen(2) / stringLen(0.25)).toBeCloseTo(8, 2)
    expect(stringLen(1)).toBeCloseTo(PENDULUM_SCALE, 2)
  })

  it('frame 0 is the static figure the registry builds', () => {
    for (const p of GRID) expect(simulationFrame(KIND, p, 0)).toEqual(rebuildScene(KIND, p))
    expect(canonicalParametricScene(KIND)!.parametric).toEqual({ kind: KIND, params: DEFAULTS })
  })
})

/** Every learner- and tutor-facing string a frame carries. */
function frameText(spec: SceneSpec): string {
  const labels = objectsOf(spec).map((o) => ('text' in o && typeof o.text === 'string' ? o.text : ''))
  const panels = (spec.explainer?.panels ?? []).map((p) => `${p.heading} ${p.body ?? ''}`)
  return [spec.title, spec.ariaLabel, spec.teachingGoal, ...spec.steps.map((s) => s.narration), ...labels, ...panels].join(' | ')
}

describe('the answer is withheld until the run shows it', () => {
  it.each(GRID)('tick 0 states no period and no formula (L=$length m, $amplitudeDeg°)', (p) => {
    const text = frameText(simulationFrame(KIND, p, 0)!)
    expect(text).not.toMatch(/\bT\s*=|2π|√|period|square root|depends on|faster|slower|longer swing|shorter swing/i)
    expect(text).not.toContain(T0(p.length).toFixed(2))
    expect(idsOf(simulationFrame(KIND, p, 0)!)).not.toContain('angle-time-trace')
  })

  it('the slider guidance does not state what each variable does to the swing', () => {
    for (const v of PARAMETRIC_SCENES[KIND].variables) {
      expect(v.effect).not.toMatch(/period|faster|slower|longer|shorter|no difference|barely|square|proportion/i)
    }
  })

  it('no readout offers a period before one full swing has been measured', () => {
    expect(pendulumReadouts(DEFAULTS, 0).map((r) => r.key)).not.toContain('period_measured')
    const firstSwing = Math.ceil(periodOfRun(DEFAULTS) / PENDULUM_FIXED_DT)
    expect(pendulumReadouts(DEFAULTS, firstSwing - 2).map((r) => r.key)).not.toContain('period_measured')
    expect(pendulumReadouts(DEFAULTS, firstSwing + 1).find((r) => r.key === 'period_measured')!.value).toBeCloseTo(Texact(1, 10), 2)
  })

  it('the tutor-visible labels cannot be read as a measurement', () => {
    const labels = objectsOf(canonicalParametricScene(KIND)!).map((o) => ('text' in o ? o.text : '')).join(' | ')
    expect(labels).not.toMatch(/\d\s*s\b/)
  })
})

describe('the frame says what is true of THIS tick', () => {
  const panel = (s: SceneSpec) => s.explainer?.panels?.[0]?.body
  it('start → moving → finished', () => {
    const end = pendulumTerminalTick(DEFAULTS)
    expect(pendulumPhaseAt(DEFAULTS, 0)).toBe('start')
    expect(panel(buildPendulumPeriodScene(DEFAULTS, 0))).toMatch(/held 10° to the side on a 1\.00 m string\. Make a prediction, then release it\./)
    expect(panel(buildPendulumPeriodScene(DEFAULTS, 50))).toMatch(/has not yet come back to where it started/)
    expect(panel(buildPendulumPeriodScene(DEFAULTS, 300))).toMatch(/After 3\.00 s the bob has made 1 full swing\./)
    expect(pendulumPhaseAt(DEFAULTS, end)).toBe('finished')
    expect(panel(buildPendulumPeriodScene(DEFAULTS, end))).toMatch(/made 3 full swings in 6\.0\d s/)
  })
  it('the panel is the step narration, so the two cannot disagree', () => {
    for (const tick of [0, 1, 250, 604]) {
      const s = buildPendulumPeriodScene(DEFAULTS, tick)
      expect(panel(s)).toBe(s.steps[1].narration)
    }
  })
  it('the description claims a trace only once one is drawn', () => {
    for (const tick of [0, 1, 20, 34, 35, 400]) {
      const s = buildPendulumPeriodScene(DEFAULTS, tick)
      expect(/rising and falling/.test(s.ariaLabel ?? '')).toBe(idsOf(s).includes('angle-time-trace'))
    }
  })
  it('no live value is drawn on the canvas: labels are identical through a run', () => {
    const labelsAt = (tick: number) => objectsOf(buildPendulumPeriodScene(DEFAULTS, tick)).filter((o) => o.type === 'label').map((o) => o.text)
    expect(labelsAt(40)).toEqual(labelsAt(500))
  })
})

describe('registry integration — reuses PARAMETRIC_SCENES, adds no registry', () => {
  const sim = simulationFor(KIND)!
  it('declares bounded variables, a fixed 0.01 s tick and three authored predictions', () => {
    expect(PARAMETRIC_SCENES[KIND].variables.map((v) => v.key)).toEqual(['length', 'amplitudeDeg', 'mass'])
    expect(sim.fixedDt).toBe(0.01)
    expect(sim.stepTicks).toBe(10)
    expect(sim.predictions.map((p) => p.id)).toEqual(['longer-string', 'heavier-bob', 'wider-swing'])
    for (const p of sim.predictions) {
      expect(p.tests.measure).toBe('period_measured')
      expect([p.tests.vary, ...p.tests.holdConstant].sort()).toEqual(['amplitudeDeg', 'length', 'mass'])
    }
  })
  it('refused values produce no frame, never a wrong one', () => {
    expect(simulationFrame(KIND, { length: 5 }, 0)).toBeNull()
    expect(sim.terminalTick({ length: 5, amplitudeDeg: 10, mass: 0.5 })).toBeNull()
    expect(sim.observe({ length: 1, amplitudeDeg: 60, mass: 0.5 }, 0)).toBeNull()
  })
})

describe('a fair test answers each prediction through the existing evidence reducer', () => {
  const sim = simulationFor(KIND)!
  function twoRuns(a: PendulumPeriodParams, b: PendulumPeriodParams, predictionId: string, choice: number) {
    let log: SimEvidenceLog = EMPTY_SIM_EVIDENCE
    log = recordSimEvidence(log, { kind: 'prediction', at: 1, predictionId, choice }, sim.predictions)
    for (const [i, p] of [a, b].entries()) {
      const end = pendulumTerminalTick(p)
      log = recordSimEvidence(log, { kind: 'observation', at: 2 + i, runId: `run-${i + 1}`, params: { ...p }, tick: end, readouts: sim.observe({ ...p }, end)!, terminal: true }, sim.predictions)
    }
    return log.events.filter((e): e is Extract<SimEvent, { kind: 'interpretation' }> => e.kind === 'interpretation' && e.predictionId === predictionId)
  }
  it('four times the length: the runs show a square-root relation', () => {
    const [i] = twoRuns({ length: 0.5, amplitudeDeg: 10, mass: 0.5 }, { length: 2, amplitudeDeg: 10, mass: 0.5 }, 'longer-string', 1)
    expect(i).toMatchObject({ observedRelation: 'square_root', matchedPrediction: true, varyRatio: 4 })
  })
  it('a heavier bob: the runs show no change', () => {
    const [i] = twoRuns({ ...DEFAULTS, mass: 0.2 }, { ...DEFAULTS, mass: 1 }, 'heavier-bob', 0)
    expect(i).toMatchObject({ observedRelation: 'unchanged', matchedPrediction: false })
  })
  it('a wider swing, even across the full 5°–30° range: the runs show "about the same"', () => {
    const [i] = twoRuns({ length: 1.5, amplitudeDeg: 5, mass: 0.5 }, { length: 1.5, amplitudeDeg: 30, mass: 0.5 }, 'wider-swing', 2)
    expect(i).toMatchObject({ observedRelation: 'unchanged', matchedPrediction: true })
    expect(i.measureRatio).toBeGreaterThan(1.01)
  })
  it('an unfair pair (two things changed) answers nothing', () => {
    expect(twoRuns({ length: 0.5, amplitudeDeg: 10, mass: 0.5 }, { length: 2, amplitudeDeg: 20, mass: 0.5 }, 'longer-string', 1)).toEqual([])
  })
})

describe('controls: run, pause, step, reset, seek, lock — the shared reducer', () => {
  const sim = simulationFor(KIND)!
  const END = sim.terminalTick(DEFAULTS)!
  const fresh = (): SimControlState => initialSimControl({ params: DEFAULTS, terminalTick: END, fixedDt: sim.fixedDt, stepTicks: sim.stepTicks })
  const apply = (s: SimControlState, ...events: SimControlEvent[]) => events.reduce(simulationControl, s)
  it('runs with 10 ms ticks, locks values while running, and pauses exactly', () => {
    const running = apply(fresh(), { type: 'run' }, { type: 'elapsed', ms: 50 })
    expect([running.phase, running.tick, paramsLocked(running)]).toEqual(['running', 5, true])
    const paused = apply(running, { type: 'pause' })
    expect([paused.phase, paused.tick, paramsLocked(paused)]).toEqual(['paused', 5, false])
  })
  it('steps 0.1 s, seeks, finishes on the terminal tick, and resets', () => {
    expect(apply(fresh(), { type: 'step' }).tick).toBe(10)
    expect(apply(fresh(), { type: 'seek', tick: 300 }).tick).toBe(300)
    const done = apply(fresh(), { type: 'seek', tick: END })
    expect(done.phase).toBe('finished')
    expect(apply(done, { type: 'reset' })).toMatchObject({ phase: 'idle', tick: 0 })
  })
  it('a hidden page pauses a running swing', () => {
    expect(apply(fresh(), { type: 'run' }, { type: 'elapsed', ms: 30 }, { type: 'hidden' }).phase).toBe('paused')
  })
})

describe('G4: exactly TWO production concepts are simulation-bound', () => {
  const ALL_CONCEPTS = (() => {
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
  const servedKind = (conceptId: string) => {
    const d = resolveVisual({ message: 'can you show me a diagram?', lessonConceptId: conceptId, learnerRequest: 'diagram' })
    const payload = d.payload as { renderer?: string; sceneSpec?: SceneSpec } | null
    return payload?.renderer === 'scene' ? payload.sceneSpec?.parametric?.kind ?? null : null
  }

  it('across the WHOLE corpus, only Newton and the pendulum are served a simulation', () => {
    expect(ALL_CONCEPTS.length).toBeGreaterThan(1500)
    const served = ALL_CONCEPTS
      .map((id) => [id, servedKind(id)] as const)
      .filter(([, kind]) => kind !== null && simulationFor(kind) !== null)
    expect(served).toEqual([[NEWTON, 'newton_second_law'], [PILOT, KIND]].sort((a, b) => ALL_CONCEPTS.indexOf(a[0]) - ALL_CONCEPTS.indexOf(b[0])))
  }, 120_000)

  it('the pilot is bound through the EXISTING registry field, keeping its card as fallback', () => {
    expect(getConceptSceneGenerator(PILOT)).toBe(KIND)
    expect(lookupConceptVisual(PILOT)!.primary).toBe('three_pendulum_motion')
    const registry = readFileSync(join(process.cwd(), 'src/lib/teaching/visualRegistry.ts'), 'utf8')
    expect(registry.match(new RegExp(`sceneGenerator: '${KIND}'`, 'g'))).toHaveLength(1)
  })

  it('the pilot is served frame 0 of the simulation', () => {
    const d = resolveVisual({ message: 'can you show me a diagram?', lessonConceptId: PILOT, learnerRequest: 'diagram' })
    expect(d.provenance).toBe(`generator:kind-default:${KIND}`)
    const scene = (d.payload as { sceneSpec: SceneSpec }).sceneSpec
    expect(figureFingerprint(scene)).toBe(figureFingerprint(simulationFrame(KIND, DEFAULTS, 0)!))
  })

  it('SHM and SHM-energy keep the static pendulum figure they had', () => {
    expect(servedKind('phys.wave.shm')).toBe('pendulum')
    expect(servedKind('phys.wave.shm-energy')).toBe('pendulum')
    expect(simulationFor('pendulum')).toBeNull()
  })

  it('the canonical path builds exactly frame 0', () => {
    expect(ACTIVATED_SCENE_KINDS).toContain(KIND)
    expect(buildCanonicalScene(KIND)).toEqual(simulationFrame(KIND, DEFAULTS, 0))
  })

  it('no text ever routes to the kind: not a keyword route and no LLM extractor', () => {
    const router = readFileSync(join(process.cwd(), 'src/lib/teaching/sceneGenerators/sceneRouter.ts'), 'utf8')
    expect(router.match(new RegExp(`'${KIND}'`, 'g'))).toHaveLength(1)
    for (const text of ['a simple pendulum swings with period T', 'the period of a pendulum of length 1 m', 'pendulum']) {
      expect(routeSceneGenerator(text), text).not.toBe(KIND)
    }
    const host = readFileSync(join(process.cwd(), 'src/lib/teaching/sceneGenerators/pendulumPeriod.ts'), 'utf8')
    expect(host).not.toContain('generateJSON')
  })
})
