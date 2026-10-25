/**
 * bio.evo.evo-devo was served two coloured pins ("Regulatory region changes" / "Protein-coding sequence changes"): the conclusion with
 * none of the evidence (learner run, 2026-10-21). It now draws the two observations the lesson stands on: Hox genes lie along the
 * chromosome in the same order as the body regions they specify, in a fly and in a human; and mouse Pax6 in a fly makes a FLY eye.
 * These tests pin the geometry that makes each claim true, and reject a figure that contradicts it.
 */
import { describe, it, expect } from 'vitest'
import {
  buildEvoDevoScene, checkEvoDevoConsistency, HOX_COLORS, SEGMENT_X, ROWS, PAX6, FLY_COLOR, MOUSE_COLOR,
} from '@/lib/teaching/sceneGenerators/evoDevoToolkit'
import { buildCanonicalScene } from '@/lib/teaching/visual/conceptSceneParams'
import { validateSceneSpec } from '@/lib/teaching/sceneSpecValidator'
import type { SceneSpec } from '@/lib/teaching/sceneSpec'

const objects = (s: SceneSpec) => s.steps.flatMap((st) => st.objects)
const clone = (s: SceneSpec): SceneSpec => JSON.parse(JSON.stringify(s))
const nodeAt = (s: SceneSpec, x: number, y: number) => objects(s).find((o) => o.type === 'node' && o.position![0] === x && o.position![1] === y)!

describe('evo-devo toolkit figure', () => {
  const spec = buildEvoDevoScene()

  it('is a valid scene, deterministic, and served for bio.evo.evo-devo', () => {
    expect(validateSceneSpec(spec as never).valid).toBe(true)
    expect(JSON.stringify(buildEvoDevoScene())).toBe(JSON.stringify(spec))
    expect((buildCanonicalScene(null, 'bio.evo.evo-devo') as SceneSpec).id).toBe(spec.id)
  })

  it('draws four genes on each chromosome in the colour order of the body segments, the same in both animals', () => {
    for (const [genes, body] of [[ROWS.flyGenes, ROWS.flyBody], [ROWS.humanGenes, ROWS.humanBody]] as const) {
      const g = SEGMENT_X.map((x) => nodeAt(spec, x, genes))
      expect(g.map((n) => n.color)).toEqual([...HOX_COLORS])
      const segs = objects(spec).filter((o) => o.type === 'bond' && o.from![1] === body && o.to![1] === body && o.thickness === 0.4).sort((a, b) => a.from![0] - b.from![0])
      expect(segs.map((s) => s.color)).toEqual([...HOX_COLORS])
    }
  })

  it('the Pax6 swap: the eye is the fly’s own colour, sits on the fly, and the mouse gene is a different colour', () => {
    const mouse = nodeAt(spec, PAX6.mouse[0], PAX6.mouse[1]), fly = nodeAt(spec, PAX6.fly[0], PAX6.fly[1]), eye = nodeAt(spec, PAX6.eye[0], PAX6.eye[1])
    expect(eye.color).toBe(fly.color); expect(eye.color).toBe(FLY_COLOR)
    expect(mouse.color).toBe(MOUSE_COLOR); expect(mouse.color).not.toBe(fly.color)
    expect(Math.hypot(eye.position![0] - fly.position![0], eye.position![1] - fly.position![1])).toBeLessThan((fly.radius ?? 0) + (eye.radius ?? 0))
  })

  it('passes its own consistency check and names what the tutor talks about', () => {
    expect(checkEvoDevoConsistency(spec)).toEqual({ ok: true, errors: [] })
    const text = objects(spec).map((o) => o.text ?? '').join(' | ')
    for (const need of ['fly', 'human', 'Hox genes', 'head', 'tail', 'mouse Pax6', 'fly eye']) expect(text).toContain(need)
  })

  it('narration stays inside the panel budget and keeps to the lesson’s core understanding', () => {
    expect(spec.steps.reduce((n, s) => n + s.narration.length, 0)).toBeLessThan(950)
    const all = spec.steps.map((s) => s.narration).join(' ')
    expect(all).toMatch(/WHERE and WHEN/)
    expect(all).not.toMatch(/\b\d+ (Hox )?genes\b/)   // no invented gene counts
  })

  it('two genes swapped on the human chromosome (order differs from the body) is rejected', () => {
    const bad = clone(spec)
    const a = nodeAt(bad, SEGMENT_X[1], ROWS.humanGenes), b = nodeAt(bad, SEGMENT_X[2], ROWS.humanGenes)
    ;[a.color, b.color] = [b.color, a.color]
    expect(checkEvoDevoConsistency(bad).errors.join(' ')).toMatch(/human: the gene order/)
  })
  it('a fly whose order differs from the human’s is rejected', () => {
    const bad = clone(spec)
    const gs = SEGMENT_X.map((x) => nodeAt(bad, x, ROWS.flyGenes))
    const segs = objects(bad).filter((o) => o.type === 'bond' && o.from![1] === ROWS.flyBody && o.thickness === 0.4)
    gs[0].color = HOX_COLORS[3]; segs.sort((p, q) => p.from![0] - q.from![0])[0].color = HOX_COLORS[3]
    expect(checkEvoDevoConsistency(bad).ok).toBe(false)
  })
  it('an eye drawn in the mouse gene’s colour (a mouse eye in a fly) is rejected', () => {
    const bad = clone(spec)
    nodeAt(bad, PAX6.eye[0], PAX6.eye[1]).color = MOUSE_COLOR
    expect(checkEvoDevoConsistency(bad).errors.join(' ')).toMatch(/fly’s colour|mouse eye/)
  })
  it('a link that joins a gene to the wrong body segment is rejected', () => {
    const bad = clone(spec)
    const link = objects(bad).find((o) => o.type === 'bond' && o.from![0] === SEGMENT_X[0] && o.from![1] < ROWS.flyGenes && o.from![1] > ROWS.flyBody)!
    link.color = HOX_COLORS[2]
    expect(checkEvoDevoConsistency(bad).ok).toBe(false)
  })
})
