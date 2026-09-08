import { describe, it, expect } from 'vitest'
import { buildCircuitScene, checkCircuitConsistency, type CircuitParams } from '@/lib/teaching/sceneGenerators/electricCircuit.pure'
import { rebuildScene } from '@/lib/teaching/visual/parametricScenes'
import { checkSceneLayoutAllViewports, isLayoutSafe } from '@/lib/teaching/visual/layout'
import type { SceneObject, SceneSpec } from '@/lib/teaching/sceneSpec'

/**
 * P1 — the circuit figure was laid out as a REGULAR POLYGON of identical
 * spheres: two resistors gave an equilateral triangle of dots joined by three
 * wires. Measured consequences: it did not read as a circuit, series and
 * parallel produced the IDENTICAL geometry, and labels pushed radially outward
 * at two radii crowded a resistor's value against its voltage drop.
 *
 * These are deterministic readability requirements, not screenshots. They are
 * written against what the RENDERER draws (all steps, since a complete figure
 * is the default view) rather than against one step at a time.
 */

const resistors = (...values: number[]) =>
  values.map((value) => ({ type: 'resistor' as const, value, unit: 'Ω' }))

const params = (connection: 'series' | 'parallel', voltage: number, ...rs: number[]): CircuitParams =>
  ({ connection, voltage, components: resistors(...rs) })

const allObjects = (spec: SceneSpec): SceneObject[] => spec.steps.flatMap((s) => s.objects)
const labels = (spec: SceneSpec) => allObjects(spec).filter((o) => o.type === 'label')
const wires = (spec: SceneSpec) => allObjects(spec).filter((o) => o.type === 'bond')
const key = (p: readonly number[]) => `${p[0]},${p[1]}`

const CASES: [string, CircuitParams][] = [
  ['series 12V 10Ω 20Ω', params('series', 12, 10, 20)],
  ['series 12V 1Ω 75Ω (the reported state)', params('series', 12, 1, 75)],
  ['series single resistor', params('series', 9, 47)],
  ['series three resistors', params('series', 24, 10, 20, 30)],
  ['parallel 12V 10Ω 20Ω', params('parallel', 12, 10, 20)],
  ['parallel three branches', params('parallel', 12, 10, 20, 40)],
]

describe('R1 — topology is unambiguous, and series differs from parallel', () => {
  it('a series circuit is ONE closed path that passes through every resistor', () => {
    const spec = buildCircuitScene(params('series', 12, 10, 20))
    const segs = wires(spec)
    // Every wire endpoint is shared by exactly two segments: a closed loop.
    const degree = new Map<string, number>()
    for (const w of segs) for (const p of [w.from!, w.to!]) degree.set(key(p), (degree.get(key(p)) ?? 0) + 1)
    expect([...degree.values()].every((d) => d === 2)).toBe(true)
    // Each resistor body sits ON the path, so the single current runs through it.
    for (const r of allObjects(spec).filter((o) => o.id?.startsWith('resistor-') && o.type === 'node')) {
      expect(degree.get(key(r.position!))).toBe(2)
    }
  })

  it('a parallel circuit forks: each resistor sits on its own branch between two rails', () => {
    const spec = buildCircuitScene(params('parallel', 12, 10, 20))
    const bodies = allObjects(spec).filter((o) => o.id?.startsWith('resistor-') && o.type === 'node')
    const xs = bodies.map((b) => b.position![0])
    expect(new Set(xs).size).toBe(bodies.length) // distinct branches
    // Each branch is a vertical segment spanning the two rails.
    for (const x of xs) {
      const vertical = wires(spec).find((w) => w.from![0] === x && w.to![0] === x)
      expect(vertical).toBeTruthy()
      expect(Math.sign(vertical!.from![1])).not.toBe(Math.sign(vertical!.to![1]))
    }
  })

  it('series and parallel are STRUCTURALLY different figures — the ring made them identical', () => {
    const s = buildCircuitScene(params('series', 12, 10, 20))
    const p = buildCircuitScene(params('parallel', 12, 10, 20))
    const shape = (spec: SceneSpec) => JSON.stringify(wires(spec).map((w) => [w.from, w.to]))
    expect(shape(s)).not.toBe(shape(p))
  })
})

describe('R2/R5 — components and values stay inside the frame', () => {
  it.each(CASES)('%s keeps every object within the camera frame', (_name, p) => {
    const spec = buildCircuitScene(p)
    const reach = (spec.cameraDistance ?? 0) / 2
    for (const o of allObjects(spec)) {
      for (const pt of [o.position, o.from, o.to].filter(Boolean) as number[][]) {
        expect(Math.abs(pt[0])).toBeLessThan(reach)
        expect(Math.abs(pt[1])).toBeLessThan(reach)
      }
    }
  })
})

describe('R3/R6 — labels do not overlap, at every viewport including mobile', () => {
  it.each(CASES)('%s passes the layout model at desktop, tablet and mobile', (_name, p) => {
    const spec = buildCircuitScene(p)
    const reports = checkSceneLayoutAllViewports(spec)
    expect(reports.length).toBeGreaterThanOrEqual(3)
    for (const r of reports) {
      expect(r.violations.filter((v) => v.kind === 'label-collision')).toEqual([])
      expect(r.violations.filter((v) => v.kind === 'out-of-bounds')).toEqual([])
    }
    expect(isLayoutSafe(spec)).toBe(true)
  })

  it('a resistor value and its own branch quantity sit on OPPOSITE sides of the rail', () => {
    // The ring placed both outward from the centre, which is what crowded
    // "R2 = 20 Ω" against "V2 = 8 V".
    const spec = buildCircuitScene(params('series', 12, 10, 20))
    for (const i of [0, 1]) {
      const value = labels(spec).find((l) => l.id === `resistor-${i}-label`)!
      const branch = labels(spec).find((l) => l.id === `resistor-${i}-drop`)!
      expect(value.position![0]).toBe(branch.position![0])       // same component
      expect(value.position![1]).toBeGreaterThan(branch.position![1]) // opposite sides
      expect(Math.abs(value.position![1] - branch.position![1])).toBeGreaterThan(2)
    }
  })
})

describe('R4 — a label stays attached to the object it names', () => {
  it.each(CASES)('%s places each resistor label at its own component', (_name, p) => {
    const spec = buildCircuitScene(p)
    const bodies = allObjects(spec).filter((o) => o.id?.startsWith('resistor-') && o.type === 'node')
    for (const body of bodies) {
      const own = labels(spec).filter((l) => l.id?.startsWith(`${body.id}-`))
      expect(own.length).toBeGreaterThan(0)
      for (const l of own) {
        // Nearest component must be its own, or the label names someone else's value.
        const nearest = bodies.reduce((a, b) =>
          Math.hypot(b.position![0] - l.position![0], b.position![1] - l.position![1]) <
          Math.hypot(a.position![0] - l.position![0], a.position![1] - l.position![1]) ? b : a)
        expect(nearest.id).toBe(body.id)
      }
    }
  })
})

describe('R7 — no decorative geometry competes with the schematic', () => {
  it.each(CASES)('%s draws no ground grid or axis triad', (_name, p) => {
    const spec = buildCircuitScene(p)
    // `stage` undefined means the renderer draws no decor at all; a circuit has
    // no spatial frame to orient, so a grid is noise over the topology.
    expect(spec.stage).toBeUndefined()
  })
})

describe('the physics is still independently re-derived (unchanged safety net)', () => {
  it.each(CASES)('%s passes the consistency checker', (_name, p) => {
    expect(checkCircuitConsistency(buildCircuitScene(p), p)).toEqual({ ok: true, errors: [] })
  })
})

describe('changing a value re-derives the figure consistently', () => {
  it('moving R1 and R2 through the parametric path keeps every requirement', () => {
    for (const [r1, r2] of [[10, 20], [1, 75], [47, 47], [100, 5]]) {
      const spec = rebuildScene('electric_circuit', { voltage: 12, r1, r2 })
      expect(spec).toBeTruthy()
      expect(isLayoutSafe(spec!)).toBe(true)
      const texts = labels(spec!).map((l) => l.text ?? '')
      expect(texts.some((t) => t.includes(`R1 = ${r1}`))).toBe(true)
      expect(texts.some((t) => t.includes(`R2 = ${r2}`))).toBe(true)
      // Totals track the current state, never a previous one.
      expect(texts.some((t) => t.includes(`R_total = ${r1 + r2}`))).toBe(true)
    }
  })
})
