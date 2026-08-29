/**
 * The animation layer — motion has to earn its place.
 *
 * The assertions that matter here are the NEGATIVE ones: that a sweep which
 * would not change the figure is never offered, that reference geometry is
 * never traced, and that no frame of a sweep is interpolated. An animation
 * layer is easy to make look impressive and easy to make lie; these are the
 * checks that separate the two.
 */
import { describe, expect, it } from 'vitest'
import {
  availableAnimations, figureFingerprint, stageAt, sweepFrame, traceObjects, tracePlayhead,
} from '@/lib/teaching/visual/sceneAnimation'
import { canonicalParametricScene, PARAMETRIC_SCENES, variablesFor } from '@/lib/teaching/visual/parametricScenes'
import { validateSceneSpec } from '@/lib/teaching/sceneSpecValidator'
import { ROLE } from '@/lib/teaching/sceneGenerators/visualDesign'
import type { SceneSpec } from '@/lib/teaching/sceneSpec'

const densePath = (n: number) =>
  Array.from({ length: n }, (_, i): [number, number, number] => [i, i * 0.5, 0])

const scene: SceneSpec = {
  id: 'a', title: 'Demo', sceneType: 'diagram',
  steps: [
    { objects: [{ type: 'path', id: 'flight', points: densePath(20), color: ROLE.output }] },
    { objects: [{ type: 'label', id: 'r', position: [1, 1, 0], text: 'x = 4', color: ROLE.result }] },
  ],
}

describe('what may move', () => {
  it('offers a trace for a content path, and says what the motion teaches', () => {
    const [trace] = availableAnimations(scene)
    expect(trace.kind).toBe('trace')
    expect(trace.objectId).toBe('flight')
    expect(trace.teaches.length).toBeGreaterThan(20)
  })

  it('NEVER traces reference geometry — that animates the scaffolding', () => {
    const ref: SceneSpec = {
      ...scene,
      steps: [{ objects: [{ type: 'path', id: 'grid', points: densePath(20), color: ROLE.reference }] }],
    }
    expect(availableAnimations(ref).some((a) => a.kind === 'trace')).toBe(false)
  })

  it('never traces a path too short to read as motion', () => {
    const short: SceneSpec = {
      ...scene,
      steps: [{ objects: [{ type: 'path', id: 'p', points: densePath(3), color: ROLE.output }] }],
    }
    expect(short.steps[0].objects[0].points).toHaveLength(3)
    expect(availableAnimations(short).some((a) => a.kind === 'trace')).toBe(false)
  })

  it('offers at most ONE trace — two moving markers is noise, not information', () => {
    const two: SceneSpec = {
      ...scene,
      steps: [{
        objects: [
          { type: 'path', id: 'p1', points: densePath(20), color: ROLE.output },
          { type: 'path', id: 'p2', points: densePath(20), color: ROLE.input },
        ],
      }],
    }
    expect(availableAnimations(two).filter((a) => a.kind === 'trace')).toHaveLength(1)
  })

  it('offers the stage animation only when there is a sequence to show', () => {
    expect(availableAnimations(scene).some((a) => a.kind === 'stages')).toBe(true)
    const single: SceneSpec = { ...scene, steps: [scene.steps[0]] }
    expect(availableAnimations(single).some((a) => a.kind === 'stages')).toBe(false)
  })

  it('offers no sweep for a scene with no variables', () => {
    expect(availableAnimations(scene).some((a) => a.kind === 'sweep')).toBe(false)
  })
})

describe('a sweep is offered only when it changes the figure', () => {
  it('offers one for torque angle, whose whole point is that it changes things', () => {
    const spec = canonicalParametricScene('torque_diagram')!
    const sweeps = availableAnimations(spec, variablesFor('torque_diagram')).filter((a) => a.kind === 'sweep')
    expect(sweeps.map((s) => s.variable?.key)).toContain('angleDeg')
  })

  it('withholds a sweep whose variable the figure normalises away', () => {
    // ray_optics scales its diagram, so object HEIGHT changes the stated
    // magnification but not the drawn shape in every case. Whatever the answer
    // is for a given generator, the rule is the same: every offered sweep must
    // produce two different figures at its endpoints.
    for (const kind of Object.keys(PARAMETRIC_SCENES)) {
      const spec = canonicalParametricScene(kind)
      if (!spec) continue
      for (const a of availableAnimations(spec, variablesFor(kind))) {
        if (a.kind !== 'sweep') continue
        const lo = sweepFrame(spec, a, 0)!
        const hi = sweepFrame(spec, a, 1)!
        expect(figureFingerprint(lo.spec), `${kind}.${a.variable?.key}`)
          .not.toBe(figureFingerprint(hi.spec))
      }
    }
  })
})

describe('a swept frame is re-derived, never interpolated', () => {
  const spec = canonicalParametricScene('torque_diagram')!
  const sweep = availableAnimations(spec, variablesFor('torque_diagram'))
    .find((a) => a.variable?.key === 'force')!

  it('lands on values the learner could have set by hand', () => {
    for (let t = 0; t <= 1.0001; t += 0.037) {
      const frame = sweepFrame(spec, sweep, t)!
      const { from, step } = sweep.variable!
      const steps = (frame.value - from) / step
      expect(Math.abs(steps - Math.round(steps)), `t=${t.toFixed(3)} value=${frame.value}`)
        .toBeLessThan(1e-6)
    }
  })

  it('produces a structurally valid figure at every frame', () => {
    for (let t = 0; t <= 1.0001; t += 0.05) {
      const frame = sweepFrame(spec, sweep, t)
      if (frame) expect(validateSceneSpec(frame.spec).valid, `t=${t}`).toBe(true)
    }
  })

  it('re-derives the stated physics, not just the picture', () => {
    const at = (t: number) => {
      const f = sweepFrame(spec, sweep, t)!
      const label = f.spec.steps.flatMap((s) => s.objects).find((o) => o.id === 'torqueLabel')!
      return { force: f.value, torque: Number(/([\d.]+)\s*N·m/.exec(label.text!)![1]) }
    }
    const lo = at(0)
    const hi = at(1)
    // r = 2, theta = 90 -> torque is exactly 2F throughout.
    expect(lo.torque).toBeCloseTo(2 * lo.force, 5)
    expect(hi.torque).toBeCloseTo(2 * hi.force, 5)
    expect(hi.torque).toBeGreaterThan(lo.torque)
  })

  it('clamps out-of-range progress instead of extrapolating', () => {
    expect(sweepFrame(spec, sweep, -3)!.value).toBe(sweep.variable!.from)
    expect(sweepFrame(spec, sweep, 9)!.value).toBe(sweep.variable!.to)
  })
})

describe('trace geometry', () => {
  it('puts the playhead ON the path, at both ends and in between', () => {
    const start = tracePlayhead(scene, 'flight', 0)!
    const end = tracePlayhead(scene, 'flight', 1)!
    expect(start.position).toEqual([0, 0, 0])
    expect(end.position![0]).toBeCloseTo(19, 5)
    const mid = tracePlayhead(scene, 'flight', 0.5)!
    expect(mid.position![0]).toBeGreaterThan(0)
    expect(mid.position![0]).toBeLessThan(19)
  })

  it('returns nothing rather than a marker in the wrong place', () => {
    expect(tracePlayhead(scene, 'no-such-object', 0.5)).toBeNull()
    expect(tracePlayhead(scene, undefined, 0.5)).toBeNull()
  })

  it('draws the path up to the marker, so the route appears over time', () => {
    const objects = scene.steps.flatMap((s) => s.objects)
    const early = traceObjects(objects, 'flight', 0.25).find((o) => o.id === 'flight')!
    const late = traceObjects(objects, 'flight', 1).find((o) => o.id === 'flight')!
    expect(early.points!.length).toBeLessThan(late.points!.length)
    expect(late.points!.length).toBe(20)
    // A path is never reduced below what the renderer can draw.
    expect(traceObjects(objects, 'flight', 0).find((o) => o.id === 'flight')!.points!.length)
      .toBeGreaterThanOrEqual(2)
  })

  it('leaves every other object untouched', () => {
    const objects = scene.steps.flatMap((s) => s.objects)
    const out = traceObjects(objects, 'flight', 0.4)
    expect(out.find((o) => o.id === 'r')).toEqual(objects.find((o) => o.id === 'r'))
  })
})

describe('stage animation', () => {
  it('walks the stages in order and stops at the last one', () => {
    expect(stageAt(scene, 0)).toBe(1)
    expect(stageAt(scene, 0.9)).toBe(2)
    expect(stageAt(scene, 1)).toBe(2)
  })
})

describe('every offered animation, on every real figure, states what it teaches', () => {
  it.each(Object.keys(PARAMETRIC_SCENES))('%s', (kind) => {
    const spec = canonicalParametricScene(kind)!
    for (const a of availableAnimations(spec, variablesFor(kind))) {
      expect(a.teaches.length, `${kind}/${a.id}`).toBeGreaterThan(20)
      expect(a.durationMs).toBeGreaterThan(500)
    }
  })
})
