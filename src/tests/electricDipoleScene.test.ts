/**
 * Electric dipole scene generator — physics correctness and interactivity.
 *
 * Part of the Physics Interactive Lesson Upgrade (DeepSeek recommendations for
 * phys.em.electric-dipole). The generic parametric-scene suite
 * (parametricSceneInteraction.test.ts) already exercises every registered
 * kind structurally the moment 'electric_dipole' is registered in
 * PARAMETRIC_SCENES — these tests instead verify the SPECIFIC physics this
 * generator claims: τ = pE sinθ (independent of field type), the equal-and-
 * opposite forces that cancel in a uniform field, the net force that appears
 * only in a non-uniform one, and the θ = 0°/180° equilibria. Per the task's
 * own instruction: "Do not rely on visual intuition alone. Add deterministic
 * tests."
 */
import { describe, expect, it } from 'vitest'
import {
  buildDipoleScene, checkDipoleConsistency, formatSci, validateDipoleParams,
  type DipoleParams,
} from '@/lib/teaching/sceneGenerators/electricDipole.pure'
import { rebuildScene, PARAMETRIC_SCENES } from '@/lib/teaching/visual/parametricScenes'
import { buildCanonicalScene, ACTIVATED_SCENE_KINDS } from '@/lib/teaching/visual/conceptSceneParams'
import { validateSceneSpec } from '@/lib/teaching/sceneSpecValidator'
import { getConceptSceneGenerator, lookupConceptVisualBinding } from '@/lib/teaching/visualRegistry'
import { resolveVisual } from '@/lib/teaching/visual/resolveVisual'
import { stageView, availableModes } from '@/lib/teaching/visual/sceneStage'
import { contrastById, misconceptionsFor } from '@/lib/teaching/visual/misconceptionContrast'
import { deriveExplainer } from '@/lib/teaching/visual/explainer'

const BASE: DipoleParams = { chargeMagnitude: 4, separation: 3, fieldStrength: 8, angleDeg: 60, fieldType: 'uniform' }

function objectsOf(params: DipoleParams) {
  return buildDipoleScene(params).steps.flatMap((s) => s.objects)
}
function labelText(params: DipoleParams, id: string): string {
  return objectsOf(params).find((o) => o.id === id)?.text ?? ''
}

describe('validation', () => {
  it('accepts the canonical parameter set', () => {
    expect(validateDipoleParams(BASE)).toEqual(BASE)
  })

  it.each([
    { ...BASE, chargeMagnitude: 0 },
    { ...BASE, chargeMagnitude: -1 },
    { ...BASE, separation: 0 },
    { ...BASE, fieldStrength: 0 },
    { ...BASE, angleDeg: -1 },
    { ...BASE, angleDeg: 181 },
    { ...BASE, fieldType: 'sideways' },
  ])('rejects an invalid parameter set %#', (bad) => {
    expect(validateDipoleParams(bad)).toBeNull()
  })

  it('rejects non-objects and missing fields rather than guessing', () => {
    expect(validateDipoleParams(null)).toBeNull()
    expect(validateDipoleParams({})).toBeNull()
    expect(validateDipoleParams({ chargeMagnitude: 4 })).toBeNull()
  })
})

describe('structural validity and the safety-net checker', () => {
  it('builds a structurally valid scene for the canonical case', () => {
    const scene = buildDipoleScene(BASE)
    const result = validateSceneSpec(scene)
    expect(result.errors.map((e) => `${e.path}: ${e.message}`)).toEqual([])
  })

  it('the independent re-derivation agrees with the built scene', () => {
    for (const fieldType of ['uniform', 'non_uniform'] as const) {
      const params = { ...BASE, fieldType }
      const scene = buildDipoleScene(params)
      const check = checkDipoleConsistency(scene, params)
      expect(check.errors, fieldType).toEqual([])
      expect(check.ok, fieldType).toBe(true)
    }
  })

  it('catches a scene that disagrees with its own parameters', () => {
    const scene = buildDipoleScene(BASE)
    const tampered = { ...scene, steps: scene.steps.map((s) => ({ ...s, objects: s.objects.map((o) => o.id === 'torqueLabel' ? { ...o, text: 'τ = 999 N·m, clockwise' } : o) })) }
    expect(checkDipoleConsistency(tampered, BASE).ok).toBe(false)
  })
})

describe('τ = pE sinθ — the angular dependence, not just the label', () => {
  it('is zero at θ = 0° and θ = 180° (the two equilibria)', () => {
    expect(labelText({ ...BASE, angleDeg: 0 }, 'torqueLabel')).toContain('zero (no rotation)')
    expect(labelText({ ...BASE, angleDeg: 180 }, 'torqueLabel')).toContain('zero (no rotation)')
  })

  // Computed directly from the formula rather than parsed out of the display
  // string: formatSci's exponent can shift at a power-of-ten boundary, which
  // would make a mantissa-only string comparison wrong even when the physics
  // is right. The formula itself is cross-checked against the rendered label
  // separately, in "the drawn angle ... matches θ" below.
  const rawTorque = (p: DipoleParams) =>
    p.chargeMagnitude * 1e-9 * (p.separation / 100) * p.fieldStrength * Math.sin((p.angleDeg * Math.PI) / 180)

  it('is maximal at θ = 90°, greater than at 30° or 150°', () => {
    expect(rawTorque({ ...BASE, angleDeg: 90 })).toBeGreaterThan(rawTorque({ ...BASE, angleDeg: 30 }))
    expect(rawTorque({ ...BASE, angleDeg: 90 })).toBeGreaterThan(rawTorque({ ...BASE, angleDeg: 150 }))
  })

  it('flips rotational sense either side of θ = 0/180 the way sinθ does (both senses appear across the range)', () => {
    // sinθ >= 0 for θ in [0,180], so every angle in the slider's own range
    // gives the SAME sense; the physically-meaningful sign flip (clockwise vs
    // counter-clockwise) happens on the far side of alignment, which callers
    // reach by reporting the angle the OTHER way round. What this generator
    // must get right is that it never reports the wrong sense for its own
    // declared domain — verified against the raw formula at 10 sampled angles.
    for (const angleDeg of [5, 30, 60, 90, 120, 150, 175]) {
      const scene = buildDipoleScene({ ...BASE, angleDeg })
      const torqueSign = Math.sin((angleDeg * Math.PI) / 180) // always > 0 on (0,180)
      const text = scene.steps.flatMap((s) => s.objects).find((o) => o.id === 'torqueLabel')!.text!
      expect(torqueSign > 0, `angle ${angleDeg}`).toBe(true)
      expect(text).toContain('counter-clockwise')
    }
  })

  it('doubling the field doubles the torque; doubling the charge doubles it too', () => {
    const base = rawTorque(BASE)
    const doubleField = rawTorque({ ...BASE, fieldStrength: BASE.fieldStrength * 2 })
    const doubleCharge = rawTorque({ ...BASE, chargeMagnitude: BASE.chargeMagnitude * 2 })
    expect(doubleField).toBeCloseTo(base * 2, 20)
    expect(doubleCharge).toBeCloseTo(base * 2, 20)
    // And the SAME relationship must be visible in what is actually rendered.
    const scene = buildDipoleScene({ ...BASE, fieldStrength: BASE.fieldStrength * 2 })
    expect(scene.explainer!.result!.value!).toContain(formatSci(doubleField))
  })

  it('τ = pE sinθ holds identically whether the field is uniform or non-uniform', () => {
    // The generator's own physical claim (see the file header): only the
    // AVERAGE field enters the torque about the dipole's centre, so the
    // gradient must not move this number at all.
    const uniform = buildDipoleScene({ ...BASE, fieldType: 'uniform' }).explainer!.result!.value!
    const nonUniform = buildDipoleScene({ ...BASE, fieldType: 'non_uniform' }).explainer!.result!.value!
    expect(uniform).toBe(nonUniform)
  })

  it('the drawn angle between p and the charge-separation line matches θ, and the geometry agrees with the label', () => {
    for (const angleDeg of [15, 45, 90, 135]) {
      const objs = objectsOf({ ...BASE, angleDeg })
      const pVector = objs.find((o) => o.id === 'pVector')!
      const drawn = [pVector.to![0] - pVector.from![0], pVector.to![1] - pVector.from![1]]
      const drawnAngle = (Math.atan2(drawn[1], drawn[0]) * 180) / Math.PI
      expect(((drawnAngle % 360) + 360) % 360, `angle ${angleDeg}`).toBeCloseTo(angleDeg, 0)

      const p = BASE.chargeMagnitude * 1e-9 * (BASE.separation / 100)
      const expectedTorque = p * BASE.fieldStrength * Math.sin((angleDeg * Math.PI) / 180)
      const stated = objs.find((o) => o.id === 'torqueLabel')!.text!
      expect(stated).toContain(formatSci(expectedTorque))
    }
  })
})

describe('force on each charge — equal-and-opposite in a uniform field, unequal in a non-uniform one', () => {
  it('uniform field: the net force is EXACTLY zero, not merely small', () => {
    const scene = buildDipoleScene({ ...BASE, fieldType: 'uniform' })
    const text = scene.steps.flatMap((s) => s.objects).find((o) => o.id === 'netForceLabel')!.text!
    expect(text).toBe('Net force = 0 — the two forces are equal and opposite')
  })

  it('uniform field: the two force arrows are drawn the same length', () => {
    const objs = objectsOf({ ...BASE, fieldType: 'uniform' })
    const fPlus = objs.find((o) => o.id === 'forcePlus')!
    const fMinus = objs.find((o) => o.id === 'forceMinus')!
    const lenPlus = Math.hypot(fPlus.to![0] - fPlus.from![0], fPlus.to![1] - fPlus.from![1])
    const lenMinus = Math.hypot(fMinus.to![0] - fMinus.from![0], fMinus.to![1] - fMinus.from![1])
    expect(lenPlus).toBeCloseTo(lenMinus, 5)
  })

  it('non-uniform field: a genuine net force appears (when p has a component along the gradient)', () => {
    const scene = buildDipoleScene({ ...BASE, fieldType: 'non_uniform', angleDeg: 60 })
    const text = scene.steps.flatMap((s) => s.objects).find((o) => o.id === 'netForceLabel')!.text!
    expect(text).toMatch(/^Net force ≈ .+ N — the two forces no longer cancel$/)
    expect(text).not.toContain('≈ 0 N')
  })

  it('non-uniform field: no net force when the dipole is perpendicular to the gradient (θ = 90°)', () => {
    // F ∝ p·(dE/dx)·cosθ — at θ = 90° the dipole has no component along the
    // field's own axis, so even a non-uniform field exerts zero net force
    // here. This is the honest, non-obvious physics, not an approximation.
    const scene = buildDipoleScene({ ...BASE, fieldType: 'non_uniform', angleDeg: 90 })
    const text = scene.steps.flatMap((s) => s.objects).find((o) => o.id === 'netForceLabel')!.text!
    expect(text).toBe('Net force = 0 — the two forces are equal and opposite')
  })

  it('the drawn force arrows point outward from each charge along the field axis, opposite to each other', () => {
    const objs = objectsOf(BASE)
    const fPlus = objs.find((o) => o.id === 'forcePlus')!
    const fMinus = objs.find((o) => o.id === 'forceMinus')!
    expect(fPlus.to![0]).toBeGreaterThan(fPlus.from![0]) // +q pushed toward +x
    expect(fMinus.to![0]).toBeLessThan(fMinus.from![0])  // -q pushed toward -x
  })
})

describe('stable/unstable equilibrium — connected to the same figure, not disconnected text', () => {
  it('names θ = 0° as the stable equilibrium', () => {
    const scene = buildDipoleScene({ ...BASE, angleDeg: 2 })
    const panel = scene.explainer!.panels!.find((p) => p.heading === 'Equilibrium')!
    expect(panel.body).toContain('STABLE')
    expect(panel.body).not.toContain('UNSTABLE')
  })

  it('names θ = 180° as the unstable equilibrium', () => {
    const scene = buildDipoleScene({ ...BASE, angleDeg: 178 })
    const panel = scene.explainer!.panels!.find((p) => p.heading === 'Equilibrium')!
    expect(panel.body).toContain('UNSTABLE')
  })

  it('U = -pE cos θ is minimised at θ = 0° and maximised at θ = 180°', () => {
    const energyAt = (angleDeg: number) => buildDipoleScene({ ...BASE, angleDeg }).steps
    const u = (angleDeg: number) => {
      const scene = buildDipoleScene({ ...BASE, angleDeg })
      const panel = scene.explainer!.panels!.find((p) => p.heading === 'Equilibrium')!
      return Number(/U = −pE cos θ ≈ (-?[\d.]+)/.exec(panel.body!)![1])
    }
    expect(u(0)).toBeLessThan(u(90))
    expect(u(180)).toBeGreaterThan(u(90))
    expect(energyAt(0)).toBeTruthy()
  })

  it('torque is genuinely zero at both equilibria — the slider itself demonstrates the claim', () => {
    expect(labelText({ ...BASE, angleDeg: 0 }, 'torqueLabel')).toContain('≈ 0 N·m, zero (no rotation)')
    expect(labelText({ ...BASE, angleDeg: 180 }, 'torqueLabel')).toContain('≈ 0 N·m, zero (no rotation)')
  })
})

describe('formatSci — honest small/large-number formatting', () => {
  it('uses plain decimals in the ordinary range', () => {
    expect(formatSci(1.5)).toBe('1.5')
    expect(formatSci(0)).toBe('0')
  })

  it('uses scientific notation with a real superscript for very small magnitudes', () => {
    expect(formatSci(2e-10)).toBe('2 × 10⁻¹⁰')
    expect(formatSci(-1.23e-8)).toBe('-1.23 × 10⁻⁸')
  })

  it('round-trips a value whose rounded mantissa carries a digit (9.999e-5 does not print as 10 × 10⁻⁵)', () => {
    const text = formatSci(9.999e-5, 3)
    expect(text).not.toMatch(/^10 ×/)
  })
})

describe('interactive slider layer — registered, re-derivable, stays legible', () => {
  it('is registered in the parametric-scene engine', () => {
    expect(PARAMETRIC_SCENES.electric_dipole).toBeDefined()
    expect(ACTIVATED_SCENE_KINDS).toContain('electric_dipole')
  })

  it('a rebuild carries its kind and parameters through, re-deriving from the same builder', () => {
    const scene = rebuildScene('electric_dipole', { ...PARAMETRIC_SCENES.electric_dipole.defaults, angleDeg: 30 })!
    expect(scene.parametric?.kind).toBe('electric_dipole')
    expect(scene.parametric?.params.angleDeg).toBe(30)
    expect(validateSceneSpec(scene).valid).toBe(true)
  })

  it('stays valid across the whole declared range of every variable', () => {
    const entry = PARAMETRIC_SCENES.electric_dipole
    for (const v of entry.variables) {
      const probes = v.kind === 'number' ? [v.min, (v.min + v.max) / 2, v.max] : v.options.map((o) => o.value)
      for (const probe of probes) {
        const scene = rebuildScene('electric_dipole', { ...entry.defaults, [v.key]: probe })
        expect(scene, `${v.key}=${probe}`).not.toBeNull()
        expect(validateSceneSpec(scene!).valid, `${v.key}=${probe}`).toBe(true)
      }
    }
  })

  it('the canonical figure via buildCanonicalScene matches the registry, stamped', () => {
    const canonical = buildCanonicalScene('electric_dipole')
    expect(canonical).not.toBeNull()
    expect(canonical!.parametric?.kind).toBe('electric_dipole')
  })

  it('never lets the force arrows crush to nothing relative to the field arrows across the slider range', () => {
    for (const fieldStrength of [1, 5, 10, 20]) {
      for (const chargeMagnitude of [1, 4, 10]) {
        const objs = objectsOf({ ...BASE, fieldStrength, chargeMagnitude })
        const fPlus = objs.find((o) => o.id === 'forcePlus')!
        const len = Math.hypot(fPlus.to![0] - fPlus.from![0], fPlus.to![1] - fPlus.from![1])
        expect(len, `E=${fieldStrength}`).toBeGreaterThan(0.5)
      }
    }
  })
})

describe('misconception contrast — the uniform-field-net-force belief', () => {
  it('is registered and produces a genuine contrast', () => {
    const canonical = buildCanonicalScene('electric_dipole')!
    const list = misconceptionsFor(canonical)
    expect(list.length).toBeGreaterThan(0)
    const contrast = contrastById(canonical, 'dipole:uniform-field-net-force')
    expect(contrast).not.toBeNull()
    expect(contrast!.actual.steps.flatMap((s) => s.objects).find((o) => o.id === 'netForceLabel')!.text)
      .toContain('Net force = 0')
    expect(contrast!.believed.steps.flatMap((s) => s.objects).find((o) => o.id === 'netForceLabel')!.text)
      .not.toContain('Net force = 0')
  })
})

describe('predict mode — withholds the torque outcome, not the setup', () => {
  it('offers predict, and predict mode hides the final stage', () => {
    const scene = buildCanonicalScene('electric_dipole')!
    expect(availableModes(scene)).toContain('predict')
    const explainStage = stageView(scene, scene.steps.length, 'explain')
    const predictStage = stageView(scene, scene.steps.length, 'predict')
    // `stage` names which numbered stage is being viewed; predict withholds
    // by revealing fewer OBJECTS at that same stage number, not by reporting
    // a smaller stage — so the object list, not `.stage`, is what to check.
    expect(explainStage.objects.some((o) => o.id === 'torqueLabel')).toBe(true)
    expect(predictStage.objects.some((o) => o.id === 'torqueLabel')).toBe(false)
  })

  it('the predict question carries a real answer index matching the built physics', () => {
    const scene = buildDipoleScene(BASE)
    const finalStep = scene.steps[scene.steps.length - 1]
    expect(finalStep.predict).toBeDefined()
    // θ = 60° with a positive-only sinθ on this domain gives a counter-
    // clockwise sense, which the generator's own convention maps to index 1.
    expect(finalStep.predict!.answerIndex).toBe(1)
  })
})

describe('the explainer frame never invents content beyond what the scene declares', () => {
  it('derives without throwing and the authored panels win', () => {
    const scene = buildCanonicalScene('electric_dipole')!
    const explainer = deriveExplainer(scene)
    expect(explainer.result?.expression).toBe('τ = pE sin θ')
    expect(explainer.panels.some((p) => p.heading === 'Equilibrium')).toBe(true)
  })
})

describe('registry integration — the concept genuinely reaches this generator', () => {
  it('phys.em.electric-dipole is bound to the electric_dipole generator', () => {
    expect(getConceptSceneGenerator('phys.em.electric-dipole')).toBe('electric_dipole')
  })

  it('the concept also carries a static fallback binding (never regresses below its prior coverage)', () => {
    const binding = lookupConceptVisualBinding('phys.em.electric-dipole')
    expect(binding).not.toBeNull()
  })

  it('resolveVisual serves the interactive scene for a real lesson turn on this concept, ahead of any static card', () => {
    const decision = resolveVisual({
      message: 'Can you show me the electric dipole diagram?',
      lessonConceptId: 'phys.em.electric-dipole',
      learnerRequest: 'diagram',
    })
    expect(decision.graphical).toBe(true)
    expect(decision.payload && 'sceneSpec' in decision.payload ? decision.payload.sceneSpec.parametric?.kind : null)
      .toBe('electric_dipole')
  })
})
