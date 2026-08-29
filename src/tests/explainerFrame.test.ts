/**
 * The teaching frame — derived from the scene, never invented.
 *
 * The frame is shown to a learner beside the figure, so a sentence it makes up
 * is a sentence the product asserts. The load-bearing test here is the last
 * one: every word of prose the frame prints must already exist somewhere in the
 * scene it was derived from.
 */
import { describe, expect, it } from 'vitest'
import { deriveExplainer, humanizeId, splitTitle } from '@/lib/teaching/visual/explainer'
import { ROLE } from '@/lib/teaching/sceneGenerators/visualDesign'
import { canonicalParametricScene } from '@/lib/teaching/visual/parametricScenes'
import type { SceneSpec } from '@/lib/teaching/sceneSpec'

const scene: SceneSpec = {
  id: 'demo', title: 'Torque: r = 2 m, F = 10 N', sceneType: 'diagram',
  teachingGoal: 'Show how torque depends on the lever arm, the force, and the angle between them.',
  steps: [
    {
      narration: 'The lever pivots at the origin.',
      objects: [
        { type: 'node', id: 'pivot', position: [0, 0, 0], color: ROLE.reference },
        { type: 'bond', id: 'lever', from: [0, 0, 0], to: [4, 0, 0], color: ROLE.output },
      ],
    },
    {
      narration: 'Torque = 2 × 10 = 20 N·m.',
      objects: [
        { type: 'vector', id: 'force', from: [4, 0, 0], to: [4, 4, 0], color: ROLE.input },
        { type: 'label', id: 'result', position: [2, -2, 0], text: 'τ = 20 N·m', color: ROLE.result },
      ],
    },
  ],
}

describe('splitTitle', () => {
  it('separates the name from the givens', () => {
    expect(splitTitle('Torque: r = 2 m')).toEqual({ name: 'Torque', givens: 'r = 2 m' })
  })
  it('leaves a title with no givens whole', () => {
    expect(splitTitle('Photosynthesis')).toEqual({ name: 'Photosynthesis' })
  })
  it('does not split when either half would be empty', () => {
    expect(splitTitle('Ratios:')).toEqual({ name: 'Ratios:' })
  })
})

describe('humanizeId', () => {
  it.each([
    ['torqueLabel', 'Torque label'],
    ['force-vector', 'Force vector'],
    ['angle_arc', 'Angle arc'],
  ])('%s -> %s', (id, want) => expect(humanizeId(id)).toBe(want))
})

describe('deriveExplainer', () => {
  const frame = deriveExplainer(scene)

  it('reads the header out of the title the generator already wrote', () => {
    expect(frame.title).toBe('Torque')
    expect(frame.givens).toBe('r = 2 m, F = 10 N')
  })

  it('takes the result from the label the author coloured as the result', () => {
    expect(frame.result?.expression).toBe('τ =')
    expect(frame.result?.value).toBe('20 N·m')
  })

  it('names each colour in the legend, one row per drawn colour', () => {
    const labels = frame.legend?.map((l) => l.label)
    expect(labels).toEqual(['Pivot', 'Lever', 'Force'])
    expect(frame.legend?.map((l) => l.shape)).toEqual(['dot', 'line', 'arrow'])
  })

  it('suppresses a legend that would have a single row', () => {
    const oneColour: SceneSpec = {
      ...scene,
      steps: [{ objects: [{ type: 'node', id: 'a', position: [0, 0, 0], color: ROLE.output }] }],
    }
    expect(deriveExplainer(oneColour).legend).toEqual([])
  })

  it('separates prose narration from the working', () => {
    const headings = frame.panels?.map((p) => p.heading)
    expect(headings).toEqual(["What's happening?", 'Working'])
    expect(frame.panels?.[1].lines).toEqual(['Torque = 2 × 10 = 20 N·m.'])
    expect(frame.panels?.[1].emphasis).toBe('Torque = 2 × 10 = 20 N·m.')
  })

  it('turns a teaching goal that lists dependencies into bullets', () => {
    expect(frame.insight?.bullets).toEqual(['The lever arm', 'The force', 'The angle between them'])
  })

  it('keeps the goal whole when it is not a list', () => {
    const plain = deriveExplainer({ ...scene, teachingGoal: 'Introduce the pivot.' })
    expect(plain.insight?.bullets).toEqual([])
    expect(plain.insight?.note).toBe('Introduce the pivot.')
  })

  it('lets an authored field win, field by field, and derives the rest', () => {
    const authored = deriveExplainer({
      ...scene,
      explainer: { result: { expression: 'τ = r × F', value: '20 N·m' } },
    })
    expect(authored.result).toEqual({ expression: 'τ = r × F', value: '20 N·m' })
    // Untouched fields are still derived.
    expect(authored.legend?.length).toBe(3)
  })

  it('frames a scene that declares almost nothing without inventing content', () => {
    const bare: SceneSpec = {
      id: 'b', title: 'Cell', sceneType: 'diagram',
      steps: [{ objects: [{ type: 'node', id: 'n', position: [0, 0, 0] }] }],
    }
    const f = deriveExplainer(bare)
    expect(f.title).toBe('Cell')
    expect(f.givens).toBeUndefined()
    expect(f.result).toBeUndefined()
    expect(f.panels).toEqual([])
    expect(f.insight).toBeUndefined()
  })

  it('NEVER states anything the scene does not already say', () => {
    // Every real canonical figure, not just the fixture: each prose fragment
    // the frame prints must be traceable to the spec it came from.
    for (const kind of ['torque_diagram', 'projectile', 'vector', 'pendulum', 'ray_optics']) {
      const spec = canonicalParametricScene(kind)!
      const source = JSON.stringify(spec)
      const f = deriveExplainer(spec)
      const printed = [
        f.title, f.givens, f.result?.expression, f.result?.value,
        ...(f.panels ?? []).flatMap((p) => [p.body, ...(p.lines ?? [])]),
        ...(f.insight?.bullets ?? []), f.insight?.note,
      ].filter((v): v is string => Boolean(v && v.trim()))

      for (const text of printed) {
        // Bullets are clauses lifted out of a sentence and sentence-cased, so
        // compare on the distinctive tail rather than the whole fragment.
        const needle = text.length > 12 ? text.slice(1, Math.min(text.length, 40)) : text
        expect(source.includes(needle), `${kind}: "${text}" is not in the scene`).toBe(true)
      }
    }
  })
})
