/**
 * The stage engine — reveal, focus, and what each mode withholds.
 *
 * The rules asserted here are the ones that make a figure teachable rather than
 * merely visible, and two of them are load-bearing enough to be worth stating:
 * geometry is NEVER withheld (hiding the force vector makes the figure wrong,
 * not harder), and focus dims rather than deletes (an object that vanishes and
 * returns reads as a broken render).
 */
import { describe, expect, it } from 'vitest'
import {
  availableModes, emphasisOf, EMPHASIS_OPACITY, stageView, supportsMode,
} from '@/lib/teaching/visual/sceneStage'
import { ROLE } from '@/lib/teaching/sceneGenerators/visualDesign'
import { canonicalParametricScene } from '@/lib/teaching/visual/parametricScenes'
import type { SceneSpec } from '@/lib/teaching/sceneSpec'

const spec: SceneSpec = {
  id: 's', title: 'Demo', sceneType: 'diagram',
  steps: [
    {
      narration: 'Set up.', intent: 'establish', focus: ['rod'],
      objects: [
        { type: 'bond', id: 'rod', from: [0, 0, 0], to: [3, 0, 0], color: ROLE.output },
        { type: 'label', id: 'rodLabel', position: [1, -1, 0], text: 'r = 3 m', color: ROLE.output },
      ],
    },
    {
      narration: 'Apply it.', intent: 'relate', focus: ['force'],
      objects: [{ type: 'vector', id: 'force', from: [3, 0, 0], to: [3, 3, 0], color: ROLE.input }],
    },
    {
      narration: 'Resolve.', intent: 'resolve',
      objects: [{ type: 'label', id: 'answer', position: [1, -2, 0], text: 'τ = 9 N·m', color: ROLE.result }],
    },
  ],
}

describe('progressive reveal', () => {
  it('reveals additively, exactly as the old visibleObjects contract did', () => {
    expect(stageView(spec, 1).objects.map((o) => o.id)).toEqual(['rod', 'rodLabel'])
    expect(stageView(spec, 2).objects.map((o) => o.id)).toEqual(['rod', 'rodLabel', 'force'])
    expect(stageView(spec, 3).objects).toHaveLength(4)
  })

  it('treats Infinity — the renderer default — as the final stage', () => {
    expect(stageView(spec, Infinity).objects).toHaveLength(4)
    expect(stageView(spec, Infinity).stage).toBe(3)
  })

  it('clamps out-of-range stages instead of returning nothing', () => {
    expect(stageView(spec, 0).stage).toBe(1)
    expect(stageView(spec, 99).stage).toBe(3)
  })

  it('carries the stage narration and intent for the tutor to teach against', () => {
    expect(stageView(spec, 2).narration).toBe('Apply it.')
    expect(stageView(spec, 2).intent).toBe('relate')
  })
})

describe('focus', () => {
  it('names the ids this stage is about', () => {
    expect([...stageView(spec, 2).focusIds]).toEqual(['force'])
  })

  it('is everything-in-focus when the stage declares none', () => {
    const view = stageView(spec, 3)
    expect(view.focusIds.size).toBe(0)
    expect(emphasisOf({ type: 'node', id: 'anything' }, view.focusIds)).toBe('focus')
  })

  it('dims what the stage is not about, and never hides it', () => {
    const ids = stageView(spec, 2).focusIds
    expect(emphasisOf({ type: 'vector', id: 'force' }, ids)).toBe('focus')
    expect(emphasisOf({ type: 'bond', id: 'rod' }, ids)).toBe('context')
    expect(EMPHASIS_OPACITY.context).toBeGreaterThan(0)
  })

  it('treats an object with no id as context — focus requires an identity', () => {
    expect(emphasisOf({ type: 'node' }, new Set(['force']))).toBe('context')
  })
})

describe('challenge modes', () => {
  it('explains everything by default', () => {
    const view = stageView(spec, 3, 'explain')
    expect(view.withheldCount).toBe(0)
    expect(view.objects.map((o) => o.id)).toContain('answer')
  })

  it('withholds the ANSWER in practice, and keeps the setup', () => {
    const view = stageView(spec, 3, 'practice')
    expect(view.objects.map((o) => o.id)).not.toContain('answer')
    expect(view.objects.map((o) => o.id)).toContain('rodLabel')
    expect(view.withheldCount).toBe(1)
  })

  it('withholds every stated quantity in assess', () => {
    const view = stageView(spec, 3, 'assess')
    const ids = view.objects.map((o) => o.id)
    expect(ids).not.toContain('answer')
    expect(ids).not.toContain('rodLabel')
  })

  it('NEVER withholds geometry in any mode — that would make the figure wrong', () => {
    for (const mode of ['explain', 'practice', 'predict', 'assess'] as const) {
      const drawn = stageView(spec, 3, mode).objects.filter((o) => o.type !== 'label')
      expect(drawn.map((o) => o.id).sort(), mode).toEqual(['force', 'rod'])
    }
  })

  it('holds the resolving stage back in predict mode', () => {
    const view = stageView(spec, 3, 'predict')
    expect(view.objects.map((o) => o.id)).toEqual(['rod', 'rodLabel', 'force'])
  })
})

describe('offered modes are honest', () => {
  it('offers only modes that would actually withhold something', () => {
    expect(availableModes(spec)).toEqual(['explain', 'predict', 'practice', 'assess'])
  })

  it('offers explain alone for a figure that states no answer', () => {
    const plain: SceneSpec = {
      id: 'p', title: 'Plain', sceneType: 'diagram',
      steps: [{ objects: [{ type: 'node', id: 'n', position: [0, 0, 0], color: ROLE.output }] }],
    }
    expect(availableModes(plain)).toEqual(['explain'])
    expect(supportsMode(plain, 'practice')).toBe(false)
  })

  it('never offers predict to a single-stage figure — there is nothing left to reveal', () => {
    const single: SceneSpec = {
      id: 'x', title: 'One', sceneType: 'diagram',
      steps: [{ objects: [{ type: 'label', id: 'a', position: [0, 0, 0], text: 'τ = 4', color: ROLE.result }] }],
    }
    expect(supportsMode(single, 'predict')).toBe(false)
  })
})

describe('against the real canonical figures', () => {
  it.each(['torque_diagram', 'projectile', 'vector', 'collision', 'molecule'])(
    '%s stages without losing or duplicating an object',
    (kind) => {
      const scene = canonicalParametricScene(kind)!
      const all = scene.steps.flatMap((s) => s.objects)
      const full = stageView(scene, Infinity, 'explain')
      expect(full.objects).toHaveLength(all.length)
      // Each stage is a prefix of the next — the additive-reveal invariant.
      let previous = 0
      for (let i = 1; i <= scene.steps.length; i++) {
        const n = stageView(scene, i, 'explain').objects.length
        expect(n).toBeGreaterThanOrEqual(previous)
        previous = n
      }
    },
  )
})
