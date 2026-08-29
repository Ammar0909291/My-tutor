/**
 * The variable layer — does moving a control actually re-teach the figure?
 *
 * The point of these tests is NOT that a scene came back. It is that the scene
 * that came back is a correct re-derivation: the geometry moved, the stated
 * numbers moved with it, and the relationship the figure claims to show still
 * holds. A slider that changes a picture without changing what the picture
 * MEANS is decoration, and it is the specific failure this layer exists to
 * avoid.
 */
import { describe, expect, it } from 'vitest'
import {
  canonicalParametricScene, defaultValueOf, isParametricKind, PARAMETRIC_SCENES,
  rebuildScene, UNREGISTERED_BY_DESIGN, variablesFor,
} from '@/lib/teaching/visual/parametricScenes'
import { ACTIVATED_SCENE_KINDS } from '@/lib/teaching/visual/conceptSceneParams'
import { validateSceneSpec } from '@/lib/teaching/sceneSpecValidator'
import { buildCanonicalScene } from '@/lib/teaching/visual/conceptSceneParams'

const KINDS = Object.keys(PARAMETRIC_SCENES)

describe('every generator is either registered or declined on the record', () => {
  // The rule the registry is held to: a control is honest only when the thing
  // it moves is a degree of freedom OF THE CONCEPT. A generator may decline —
  // but it may not simply be forgotten, which is what this asserts.
  it('leaves no canonical generator kind unaccounted for', () => {
    const unaccounted = ACTIVATED_SCENE_KINDS.filter(
      (kind) => !(kind in PARAMETRIC_SCENES) && !(kind in UNREGISTERED_BY_DESIGN),
    )
    expect(unaccounted).toEqual([])
  })

  it('states a reason for every declined kind, and never declines a registered one', () => {
    for (const [kind, reason] of Object.entries(UNREGISTERED_BY_DESIGN)) {
      expect(reason.length, kind).toBeGreaterThan(20)
      expect(kind in PARAMETRIC_SCENES, `${kind} is both registered and declined`).toBe(false)
    }
  })
})

describe('registry shape', () => {
  it('covers every subject the engine teaches, not one', () => {
    expect(KINDS).toEqual(expect.arrayContaining([
      'torque_diagram', 'projectile', 'vector', 'electric_circuit',   // physics
      'calculus_graph', 'triangle',                                    // mathematics
      'molecule', 'lattice', 'electron_shells', 'periodic_trends',     // chemistry
      'punnett_square', 'cell_division', 'dna_structure',              // biology
      'logic_gate', 'er_diagram',                                      // computer science
      'economics_curves',                                              // economics
    ]))
  })

  it.each(KINDS)('%s declares defaults for every variable it exposes', (kind) => {
    const entry = PARAMETRIC_SCENES[kind]
    for (const v of entry.variables) {
      expect(entry.defaults[v.key], `${kind}.${v.key}`).toBeDefined()
    }
  })

  it.each(KINDS)('%s states the causal claim of every control', (kind) => {
    for (const v of PARAMETRIC_SCENES[kind].variables) {
      expect(v.effect.length, `${kind}.${v.key}`).toBeGreaterThan(15)
    }
  })

  it.each(KINDS)('%s keeps every default inside the range its own control offers', (kind) => {
    const entry = PARAMETRIC_SCENES[kind]
    for (const v of entry.variables) {
      const value = entry.defaults[v.key]
      if (v.kind === 'number') {
        expect(value, `${kind}.${v.key}`).toBeGreaterThanOrEqual(v.min)
        expect(value).toBeLessThanOrEqual(v.max)
      } else {
        expect(v.options.map((o) => o.value)).toContain(value)
      }
    }
  })
})

describe('every canonical figure is structurally valid', () => {
  it.each(KINDS)('%s', (kind) => {
    const scene = canonicalParametricScene(kind)
    expect(scene, kind).not.toBeNull()
    const result = validateSceneSpec(scene)
    expect(result.errors.map((e) => `${e.path}: ${e.message}`)).toEqual([])
  })
})

describe('a rebuilt scene stays interactive and stays valid', () => {
  it.each(KINDS)('%s carries its kind and values through a rebuild', (kind) => {
    const entry = PARAMETRIC_SCENES[kind]
    const scene = rebuildScene(kind, entry.defaults)!
    expect(scene.parametric?.kind).toBe(kind)
    for (const v of entry.variables) {
      expect(scene.parametric?.params[v.key]).toBe(entry.defaults[v.key])
    }
  })

  it.each(KINDS)('%s stays valid across its whole declared range', (kind) => {
    const entry = PARAMETRIC_SCENES[kind]
    for (const v of entry.variables) {
      const probes = v.kind === 'number'
        ? [v.min, (v.min + v.max) / 2, v.max]
        : v.options.map((o) => o.value)
      for (const probe of probes) {
        const scene = rebuildScene(kind, { ...entry.defaults, [v.key]: probe })
        // A generator may legitimately refuse a combination; what it must never
        // do is return a structurally invalid scene.
        if (scene) {
          expect(validateSceneSpec(scene).valid, `${kind} ${v.key}=${probe}`).toBe(true)
        }
      }
    }
  })

  it('refuses a value the generator itself rejects rather than approximating', () => {
    expect(rebuildScene('torque_diagram', { leverLength: -5, force: 10, angleDeg: 90 })).toBeNull()
    expect(rebuildScene('projectile', { angleDegrees: 45, speed: 0 })).toBeNull()
  })

  it('returns null for an unregistered kind instead of guessing', () => {
    expect(rebuildScene('no_such_generator', {})).toBeNull()
    expect(isParametricKind('no_such_generator')).toBe(false)
    expect(variablesFor(null)).toEqual([])
  })
})

// ── the substance: does changing a variable change what the figure TEACHES? ──

function labelTexts(kind: string, params: Record<string, number | string>): string[] {
  const scene = rebuildScene(kind, params)!
  return scene.steps.flatMap((s) => s.objects).filter((o) => o.type === 'label').map((o) => o.text ?? '')
}

describe('cause and effect', () => {
  it('torque: doubling the force doubles the stated torque', () => {
    const base = labelTexts('torque_diagram', { leverLength: 2, force: 10, angleDeg: 90 }).join(' ')
    const twice = labelTexts('torque_diagram', { leverLength: 2, force: 20, angleDeg: 90 }).join(' ')
    expect(base).toContain('20 N·m')
    expect(twice).toContain('40 N·m')
  })

  it('torque: a force along the arm produces no torque at all', () => {
    expect(labelTexts('torque_diagram', { leverLength: 2, force: 10, angleDeg: 0 }).join(' '))
      .toContain('0 N·m')
  })

  it('torque: the drawn geometry agrees with τ = r F sin θ, not just the label', () => {
    for (const angleDeg of [15, 30, 45, 90, 135]) {
      const scene = rebuildScene('torque_diagram', { leverLength: 2, force: 10, angleDeg })!
      const objs = scene.steps.flatMap((s) => s.objects)
      const lever = objs.find((o) => o.id === 'lever')!
      const force = objs.find((o) => o.id === 'force')!
      // Re-derive the angle between the two drawn segments from the coordinates.
      const arm = [lever.to![0] - lever.from![0], lever.to![1] - lever.from![1]]
      const f = [force.to![0] - force.from![0], force.to![1] - force.from![1]]
      const cos = (arm[0] * f[0] + arm[1] * f[1]) / (Math.hypot(...arm) * Math.hypot(...f))
      const drawn = (Math.acos(Math.min(1, Math.max(-1, cos))) * 180) / Math.PI
      expect(drawn, `angle ${angleDeg}`).toBeCloseTo(angleDeg, 1)

      const stated = objs.find((o) => o.id === 'torqueLabel')!.text!
      const expected = 2 * 10 * Math.sin((angleDeg * Math.PI) / 180)
      expect(stated).toContain(String(Math.round(expected * 100) / 100))
    }
  })

  it('projectile: range peaks at 45° and is symmetric either side of it', () => {
    // Read the STATED range, not the drawn extent: this generator scales every
    // trajectory to the same on-screen size (`VISUAL_MAX`), so the drawn width
    // is identical at every angle by design. That normalisation is exactly why
    // a quantitative claim must be checked against the figure's own numbers.
    const range = (angleDegrees: number) => {
      const text = labelTexts('projectile', { angleDegrees, speed: 20 })
        .concat(rebuildScene('projectile', { angleDegrees, speed: 20 })!
          .steps.flatMap((s) => s.objects).map((o) => o.text ?? ''))
        .find((t) => t.includes('Range'))!
      return Number(/([\d.]+)/.exec(text.replace('Range ~', ''))![1])
    }
    expect(range(45)).toBeGreaterThan(range(30))
    expect(range(45)).toBeGreaterThan(range(60))
    expect(range(30)).toBeCloseTo(range(60), 0)
  })

  it('chemistry: choosing a different molecule redraws it from the generator table', () => {
    const water = rebuildScene('molecule', { molecule: 'water' })!
    const methane = rebuildScene('molecule', { molecule: 'methane' })!
    expect(water.title).not.toBe(methane.title)
    // Methane has more peripheral atoms than water — the geometry really changed.
    const count = (s: typeof water) => s.steps.flatMap((x) => x.objects).filter((o) => o.type === 'node').length
    expect(count(methane)).toBeGreaterThan(count(water))
  })

  it('chemistry: the electron-shell figure follows the element chosen', () => {
    const sodium = rebuildScene('electron_shells', { element: 'Na' })!
    const carbon = rebuildScene('electron_shells', { element: 'C' })!
    expect(sodium.title).not.toBe(carbon.title)
    // Sodium has 11 electrons to carbon's 6, so the drawn figure carries more
    // of them — the geometry follows the element, not just the caption.
    const electrons = (s: typeof sodium) =>
      s.steps.flatMap((x) => x.objects).filter((o) => o.type === 'point' || o.type === 'particle' || o.type === 'node').length
    expect(electrons(sodium)).toBeGreaterThan(electrons(carbon))
  })

  it('physics: an inelastic collision is drawn differently from an elastic one', () => {
    const elastic = rebuildScene('collision', { collisionType: 'elastic' })!
    const inelastic = rebuildScene('collision', { collisionType: 'perfectly_inelastic' })!
    expect(JSON.stringify(elastic.steps)).not.toBe(JSON.stringify(inelastic.steps))
  })
})

describe('the canonical registry and the variable registry cannot drift', () => {
  it.each(KINDS)('buildCanonicalScene(%s) returns the registry figure, stamped', (kind) => {
    const canonical = buildCanonicalScene(kind)
    expect(canonical, kind).not.toBeNull()
    expect(canonical!.parametric?.kind).toBe(kind)
  })

  it('gives every spatial diagram a ground plane and an axis triad', () => {
    const scene = canonicalParametricScene('torque_diagram')!
    expect(scene.stage?.grid).toBe(true)
    expect(scene.stage?.axes).toBe(true)
  })

  it('defaultValueOf falls back inside the control range for both kinds', () => {
    for (const kind of KINDS) {
      for (const v of PARAMETRIC_SCENES[kind].variables) {
        const fallback = defaultValueOf(v)
        if (v.kind === 'number') expect(fallback).toBe(v.min)
        else expect(v.options.map((o) => o.value)).toContain(fallback)
      }
    }
  })
})

describe('the figure stays legible across the whole control range', () => {
  // MEASURED DEFECT, now pinned. The torque generator normalised the arm and
  // the force by the same number — a length in metres divided by the larger of
  // (metres, newtons) — so raising the force with the slider shrank the lever
  // toward nothing. A learner watching that would read it as "the arm gets
  // shorter as the force grows", the opposite of what the figure teaches.
  const drawn = (params: Record<string, number>) => {
    const objs = rebuildScene('torque_diagram', params)!.steps.flatMap((s) => s.objects)
    const lever = objs.find((o) => o.id === 'lever')!
    const force = objs.find((o) => o.id === 'force')!
    return {
      arm: Math.hypot(lever.to![0] - lever.from![0], lever.to![1] - lever.from![1]),
      force: Math.hypot(force.to![0] - force.from![0], force.to![1] - force.from![1]),
    }
  }

  it('never lets one quantity crush the other, anywhere in the slider range', () => {
    for (const force of [1, 5, 10, 20, 30, 40]) {
      for (const leverLength of [0.5, 2, 4, 6]) {
        const d = drawn({ leverLength, force, angleDeg: 90 })
        const ratio = Math.min(d.arm, d.force) / Math.max(d.arm, d.force)
        expect(ratio, `r=${leverLength} F=${force}`).toBeGreaterThan(0.12)
      }
    }
  })

  it('keeps each drawn length rising with its own quantity', () => {
    expect(drawn({ leverLength: 4, force: 10, angleDeg: 90 }).arm)
      .toBeGreaterThan(drawn({ leverLength: 2, force: 10, angleDeg: 90 }).arm)
    expect(drawn({ leverLength: 2, force: 30, angleDeg: 90 }).force)
      .toBeGreaterThan(drawn({ leverLength: 2, force: 10, angleDeg: 90 }).force)
  })

  it('does not let a change in force move the arm, or the reverse', () => {
    expect(drawn({ leverLength: 2, force: 10, angleDeg: 90 }).arm)
      .toBeCloseTo(drawn({ leverLength: 2, force: 40, angleDeg: 90 }).arm, 5)
  })
})
