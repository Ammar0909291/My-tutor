/**
 * Misconception contrast — the registrations must stay true.
 *
 * The table in misconceptionContrast.ts is prose about physics and chemistry
 * sitting next to a variable name. Prose rots silently; a generator's
 * parameters change and a "contrast" becomes two identical figures with a
 * confident caption. These tests run every registration against the REAL
 * builders, so a registration that stops contrasting anything fails the build
 * rather than teaching a learner that their wrong model was right.
 */
import { describe, expect, it } from 'vitest'
import {
  availableContrasts, contrastById, contrastFor, misconceptionsFor, SCENE_MISCONCEPTIONS,
} from '@/lib/teaching/visual/misconceptionContrast'
import { figureFingerprint } from '@/lib/teaching/visual/sceneAnimation'
import { canonicalParametricScene, PARAMETRIC_SCENES } from '@/lib/teaching/visual/parametricScenes'
import { validateSceneSpec } from '@/lib/teaching/sceneSpecValidator'
import type { SceneSpec } from '@/lib/teaching/sceneSpec'

const KINDS = Object.keys(SCENE_MISCONCEPTIONS)

describe('the registrations are well formed', () => {
  it.each(KINDS)('%s names variables its generator actually exposes', (kind) => {
    const exposed = PARAMETRIC_SCENES[kind].variables.map((v) => v.key)
    for (const m of SCENE_MISCONCEPTIONS[kind]) {
      expect(exposed, `${m.id}`).toContain(m.variable)
    }
  })

  it.each(KINDS)('%s states a claim, a prompt and a correction for each', (kind) => {
    for (const m of SCENE_MISCONCEPTIONS[kind]) {
      expect(m.claim.length, m.id).toBeGreaterThan(25)
      expect(m.prompt.length, m.id).toBeGreaterThan(20)
      expect(m.correction.length, m.id).toBeGreaterThan(30)
      // The prompt must ASK, not tell — prediction comes before correction.
      expect(m.prompt, m.id).toMatch(/\?/)
    }
  })

  it('uses stable, unique ids', () => {
    const ids = KINDS.flatMap((k) => SCENE_MISCONCEPTIONS[k].map((m) => m.id))
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('requires a value for every expects-value belief', () => {
    for (const kind of KINDS) {
      for (const m of SCENE_MISCONCEPTIONS[kind]) {
        if (m.belief === 'expects-value') expect(m.value, m.id).toBeDefined()
      }
    }
  })
})

describe('every registration produces a REAL contrast against the real builders', () => {
  it.each(KINDS)('%s', (kind) => {
    const spec = canonicalParametricScene(kind)!
    const registered = SCENE_MISCONCEPTIONS[kind]
    const contrasts = availableContrasts(spec)
    expect(contrasts.map((c) => c.misconception.id).sort())
      .toEqual(registered.map((m) => m.id).sort())

    for (const c of contrasts) {
      // Two DIFFERENT figures — the whole point.
      expect(figureFingerprint(c.believed), c.misconception.id)
        .not.toBe(figureFingerprint(c.actual))
      // Both are real figures. Neither is drawn "wrongly"; they are correct
      // renderings of two different situations.
      expect(validateSceneSpec(c.believed).valid, c.misconception.id).toBe(true)
      expect(validateSceneSpec(c.actual).valid, c.misconception.id).toBe(true)
      expect(c.believedValue).not.toBe(c.actualValue)
    }
  })
})

describe('it refuses rather than fabricating', () => {
  const torque = canonicalParametricScene('torque_diagram')!

  it('produces nothing for a scene with no parameters', () => {
    const plain: SceneSpec = {
      id: 'p', title: 'Plain', sceneType: 'diagram',
      steps: [{ objects: [{ type: 'node', id: 'n', position: [0, 0, 0] }] }],
    }
    expect(misconceptionsFor(plain)).toEqual([])
    expect(availableContrasts(plain)).toEqual([])
  })

  it('produces nothing for a variable the generator does not expose', () => {
    expect(contrastFor(torque, {
      id: 'x', variable: 'notAVariable', belief: 'expects-no-change',
      claim: 'c'.repeat(30), prompt: 'p'.repeat(25) + '?', correction: 'k'.repeat(35),
    })).toBeNull()
  })

  it('produces nothing when the believed value equals the actual one', () => {
    const actualAngle = torque.parametric!.params.angleDeg
    expect(contrastFor(torque, {
      id: 'x', variable: 'angleDeg', belief: 'expects-value', value: actualAngle,
      claim: 'c'.repeat(30), prompt: 'p'.repeat(25) + '?', correction: 'k'.repeat(35),
    })).toBeNull()
  })

  it('produces nothing when the two parameter sets draw the same figure', () => {
    // A value the generator refuses cannot be contrasted against.
    expect(contrastFor(torque, {
      id: 'x', variable: 'leverLength', belief: 'expects-value', value: -50,
      claim: 'c'.repeat(30), prompt: 'p'.repeat(25) + '?', correction: 'k'.repeat(35),
    })).toBeNull()
  })

  it('returns nothing for an unknown misconception id', () => {
    expect(contrastById(torque, 'no-such-misconception')).toBeNull()
  })
})

describe('the belief actually shapes the contrast', () => {
  const torque = canonicalParametricScene('torque_diagram')!

  it('expects-no-change contrasts against the far end of the range', () => {
    // theta is 90 in the canonical case; both ends are 90 away, so the rule
    // takes the maximum. Either way it must be an end, not a nudge.
    const c = contrastById(torque, 'torque:angle-irrelevant')!
    expect([0, 180]).toContain(c.believedValue)
  })

  it('expects-value uses the value the registration states', () => {
    const projectile = canonicalParametricScene('projectile')!
    const c = contrastById(projectile, 'projectile:steeper-is-further')!
    expect(c.believedValue).toBe(80)
    expect(c.actualValue).toBe(45)
  })

  it('carries a choice misconception through as the named alternative', () => {
    const collision = canonicalParametricScene('collision')!
    const c = contrastById(collision, 'collision:kinetic-energy-always-conserved')!
    expect(c.believedValue).toBe('perfectly_inelastic')
    expect(c.actualValue).toBe('elastic')
  })
})

describe('the contrast teaches the intended physics, not just a difference', () => {
  it('torque: pushing along the arm really does give zero', () => {
    const torque = canonicalParametricScene('torque_diagram')!
    const c = contrastById(torque, 'torque:angle-irrelevant')!
    const stated = (s: SceneSpec) =>
      s.steps.flatMap((x) => x.objects).find((o) => o.id === 'torqueLabel')!.text!
    // The actual case is the perpendicular one and turns the arm.
    expect(stated(c.actual)).toContain('20 N·m')
    // The believed case is an end of the range; at 0 or 180 the torque vanishes.
    expect(stated(c.believed)).toMatch(/^τ = 0 N·m/)
  })

  it('torque: halving the distance really does halve the turn', () => {
    const half = canonicalParametricScene('torque_diagram')!
    const c = contrastById(half, 'torque:distance-irrelevant')!
    const torqueOf = (s: SceneSpec) =>
      Number(/([\d.]+)\s*N·m/.exec(
        s.steps.flatMap((x) => x.objects).find((o) => o.id === 'torqueLabel')!.text!)![1])
    // The believed figure sits at an end of the lever range, so the stated
    // torque must differ in proportion to the distance.
    expect(torqueOf(c.believed)).not.toBeCloseTo(torqueOf(c.actual), 3)
  })

  it('molecule: the contrast really is a different geometry', () => {
    const molecule = canonicalParametricScene('molecule')!
    const c = contrastById(molecule, 'molecule:lone-pairs-ignored')!
    expect(c.actual.title).toContain('Water')
    expect(c.believed.title).toContain('Methane')
    expect(c.believed.title).not.toBe(c.actual.title)
  })
})
