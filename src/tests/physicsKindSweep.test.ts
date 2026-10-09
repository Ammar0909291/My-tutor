/**
 * Every interactive physics figure, over its WHOLE slider domain.
 *
 * Each generator kind ships an independent re-derivation checker; until the
 * render audit they had only ever been run on the canonical case. This sweeps a
 * {min, mid, max} grid of every slider (and every option of every choice, plus
 * the corners) and requires, at every point the generator's own validator
 * accepts: the physics re-derives from what was drawn, the payload rules pass,
 * the graph rules pass, and any printed equation is self-consistent.
 *
 * It found the Electric dipole's step 5 naming a focus id (`angleArc`) that does
 * not exist at θ = 0° / 180° (110 of 176 points) — see PHYS-VIS-07 below.
 */
import { describe, it, expect } from 'vitest'
import { CHECKED_KINDS, checkKind, sweepStates } from '../../scripts/qa/physicsVisual/kindChecks'
import { buildDipoleScene, validateDipoleParams } from '@/lib/teaching/sceneGenerators/electricDipole.pure'
import { stageView } from '@/lib/teaching/visual/sceneStage'
import type { SceneSpec } from '@/lib/teaching/sceneSpec'

describe('physics kinds re-derive across the slider domain', () => {
  for (const kind of Object.keys(CHECKED_KINDS)) {
    it(kind, () => {
      const r = checkKind(kind)
      expect(r.failures.map((f) => `${JSON.stringify(f.params)} -> ${f.problems[0]}`)).toEqual([])
      expect(r.built).toBeGreaterThan(0)
    })
  }
  it('the sweep is a real grid, not just the default', () => {
    for (const kind of Object.keys(CHECKED_KINDS)) expect(sweepStates(kind).length, kind).toBeGreaterThan(10)
  })
})

describe('PHYS-VIS-07 a focus id that names nothing drawn dims nothing', () => {
  it('the dipole lists the angle arc as a focus only when it draws one', () => {
    for (const angleDeg of [0, 4, 8, 60, 172, 180]) {
      const p = validateDipoleParams({ chargeMagnitude: 4, separation: 3, fieldStrength: 8, angleDeg, fieldType: 'uniform' })!
      const spec = buildDipoleScene(p)
      const ids = new Set(spec.steps.flatMap((s) => s.objects.map((o) => o.id)))
      for (const st of spec.steps) for (const f of st.focus ?? []) expect(ids.has(f), `θ=${angleDeg} focus ${f}`).toBe(true)
    }
  })
  it('the stage engine drops dangling ids; if none survive the whole scene is in focus', () => {
    const spec: SceneSpec = {
      id: 's', title: 's', sceneType: 'diagram',
      steps: [{ objects: [{ type: 'point', id: 'a', position: [0, 0, 0] }, { type: 'point', id: 'b', position: [1, 0, 0] }], focus: ['ghost'] },
              { objects: [], focus: ['a', 'ghost'] }],
    }
    expect([...stageView(spec, 1).focusIds]).toEqual([]) // would have been {ghost}: every object dimmed
    expect([...stageView(spec, 2).focusIds]).toEqual(['a'])
  })
})
