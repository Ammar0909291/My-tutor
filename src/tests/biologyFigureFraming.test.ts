/**
 * Biology visual render audit (2026-10-08) — the framing and caption rules that closed the measured
 * defects. Every number quoted below was MEASURED in headless Chromium against the real figure
 * component before the fix:
 *
 *   · 71 of 192 Biology scenes had a sphere cut off by, or a caption running past, the canvas edge at
 *     390px (every two-group comparison): framing used coordinates only, so a sphere's radius and a
 *     caption's painted width were invisible to it.
 *   · every text-bearing node drew its caption ON the sphere in the sphere's own colour (2.2–4.5 : 1).
 *   · the 11 structure figures drew an opaque radius-4 sphere with the parts INSIDE it, so no part showed.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import type { SceneSpec, SceneObject } from '@/lib/teaching/sceneSpec'
import {
  VIEWPORTS, cameraDistanceToContain, cameraDistanceToContainFigure, checkSceneLayout, sceneTextObjects, stageHeightToFit,
  viewportFromCanvas, wrapPxOf,
} from '@/lib/teaching/visual/layout'
import { buildCanonicalScene, CONCEPT_SCENE_OVERRIDES } from '@/lib/teaching/visual/conceptSceneParams'
import { buildCellStructureScene } from '@/lib/teaching/sceneGenerators/cellStructure'
import { buildCellComparisonScene } from '@/lib/teaching/sceneGenerators/cellComparison'
import { buildCellHubScene } from '@/lib/teaching/sceneGenerators/cellHub'
import { buildCellPathwayScene } from '@/lib/teaching/sceneGenerators/cellPathway'

const scene = (objects: SceneObject[], cameraDistance = 10): SceneSpec => ({
  id: 't', title: 't', sceneType: 'diagram', cameraDistance, steps: [{ objects }],
})
const PHONE = viewportFromCanvas(358, 268, 390)
const DESKTOP = viewportFromCanvas(914, 414, 1280)

describe('properties.labelOffset moves the caption, not the object', () => {
  // radius 0.2: a small marker keeps its caption on it; a body of 0.45+ is captioned from above it by the shared
  // anchor rule (see the next test), which is what an object WITHOUT the property gets.
  const node = (props?: Record<string, unknown>, radius = 0.2): SceneObject =>
    ({ type: 'node', id: 'n', position: [1, 2, 0], radius, text: 'Name', ...(props ? { properties: props } : {}) })

  it('an object without the property is anchored exactly where it always was', () => {
    expect(sceneTextObjects(scene([node()]))[0].position).toEqual([1, 2, 0])
  })
  it('a big body without the property is captioned from just above its surface (shared anchor rule)', () => {
    expect(sceneTextObjects(scene([node(undefined, 0.7)]))[0].position).toEqual([1, 3.25, 0])
  })
  it('the property wins over the shared rule: the caption goes exactly where the object says', () => {
    expect(sceneTextObjects(scene([node({ labelOffset: [0, -1.2, 0] }, 0.7)]))[0].position).toEqual([1, 0.8, 0])
  })
  it('an object with it is anchored at the offset position', () => {
    expect(sceneTextObjects(scene([node({ labelOffset: [0, 1.2, 0] })]))[0].position).toEqual([1, 3.2, 0])
  })
  it('a malformed offset is ignored rather than throwing or producing NaN', () => {
    for (const bad of [[1, 2], 'up', [NaN, 0, 0], null]) {
      expect(sceneTextObjects(scene([node({ labelOffset: bad })]))[0].position).toEqual([1, 2, 0])
    }
  })
  it('a path anchors its caption at its middle point plus the offset', () => {
    const ring: SceneObject = { type: 'path', id: 'p', points: [[0, 0, 0], [1, 0, 0], [2, 0, 0]], text: 'Ring', properties: { labelOffset: [0, 0.5, 0] } }
    expect(sceneTextObjects(scene([ring]))[0].position).toEqual([1, 0.5, 0])
  })
})

describe('wrapPxOf — a caption’s authored wrap width', () => {
  const o = (props: Record<string, unknown>): SceneObject => ({ type: 'label', text: 'x', position: [0, 0, 0], properties: props })
  it('reads labelWrapFraction as a share of the canvas, only inside its valid range', () => {
    expect(wrapPxOf(o({ labelWrapFraction: 0.4 }), PHONE, 10)).toBeCloseTo(0.4 * 358, 0)
    for (const bad of [0.05, 0.99, NaN, '0.4', undefined]) expect(wrapPxOf(o({ labelWrapFraction: bad }), PHONE, 10)).toBeUndefined()
  })
  it('reads labelWrapUnits as scene units converted at the live scale', () => {
    const tan = Math.tan((50 * Math.PI) / 360)
    const scale = PHONE.hostHeight / (2 * tan * 10)
    expect(wrapPxOf(o({ labelWrapUnits: 6 }), PHONE, 10)).toBeCloseTo(6 * scale, 0)
    // a farther camera means a smaller scale, so the same column is narrower on screen
    expect(wrapPxOf(o({ labelWrapUnits: 6 }), PHONE, 20)!).toBeLessThan(wrapPxOf(o({ labelWrapUnits: 6 }), PHONE, 10)!)
  })
  it('the narrower of the two wins, and never below the readable floor', () => {
    expect(wrapPxOf(o({ labelWrapFraction: 0.9, labelWrapUnits: 1 }), DESKTOP, 10)).toBe(76)
    expect(wrapPxOf(o({ labelWrapFraction: 0.2, labelWrapUnits: 100 }), DESKTOP, 10)).toBeCloseTo(0.2 * 914, 0)
  })
})

describe('cameraDistanceToContainFigure', () => {
  it('returns the scene’s own distance when everything already fits', () => {
    const fits = scene([{ type: 'node', position: [0, 0, 0], radius: 0.5 }, { type: 'node', position: [1, 1, 0], radius: 0.5 }], 10)
    expect(cameraDistanceToContainFigure(fits, PHONE)).toBe(10)
    expect(cameraDistanceToContainFigure(fits, DESKTOP)).toBe(10)
  })

  it('moves the camera FURTHER when a sphere would be cut by the canvas edge, and only then', () => {
    // Two columns 11 units apart framed for a distance that leaves them at the edge.
    const wide = scene([{ type: 'node', position: [-5.5, 0, 0], radius: 0.75 }, { type: 'node', position: [5.5, 0, 0], radius: 0.75 }], 7)
    const d = cameraDistanceToContainFigure(wide, PHONE)
    expect(d).toBeGreaterThan(7)
    // After the move, the outer sphere's edge is inside the canvas.
    const scale = PHONE.hostHeight / (2 * Math.tan((50 * Math.PI) / 360) * d)
    expect((5.5 + 0.75) * scale).toBeLessThanOrEqual(PHONE.hostWidth / 2)
  })

  it('never moves the camera closer than the scene asked for', () => {
    for (const own of [6, 12, 30]) {
      const s = scene([{ type: 'node', position: [0.2, 0.2, 0], radius: 0.1 }], own)
      expect(cameraDistanceToContainFigure(s, PHONE)).toBeGreaterThanOrEqual(own)
    }
  })

  it('is bounded: a caption as wide as the canvas cannot shrink the figure to a dot', () => {
    const long = 'x'.repeat(120)
    const s = scene([{ type: 'label', position: [9, 0, 0], text: long }], 6)
    expect(cameraDistanceToContainFigure(s, PHONE)).toBeLessThanOrEqual(6 * 2.2 + 0.05)
  })
})

describe('stageHeightToFit', () => {
  it('never shrinks, and leaves a figure that already reads at its natural height', () => {
    const easy = scene([{ type: 'node', position: [0, 0, 0], radius: 0.5, text: 'A' }], 10)
    expect(stageHeightToFit(easy, 358, 268, 390, 600)).toBe(268)
  })
  it('grows a stage only as far as needed, never past the cap', () => {
    const dense = scene(
      Array.from({ length: 14 }, (_, i) => ({ type: 'label', text: `A fairly long caption number ${i}`, position: [0, 3 - i * 0.45, 0] } as SceneObject)),
      9,
    )
    const h = stageHeightToFit(dense, 358, 268, 390, 600)
    expect(h).toBeGreaterThanOrEqual(268)
    expect(h).toBeLessThanOrEqual(600)
  })
})

describe('the structure generator draws a ring, not an opaque ball hiding its parts', () => {
  const s = buildCellStructureScene({
    conceptId: 't.s', subject: 'Thing', boundaryLabel: 'Outer wall', teachingGoal: 'g',
    parts: [{ name: 'A', description: 'a' }, { name: 'B', description: 'b' }, { name: 'C', description: 'c' }],
  })
  const objs = s.steps.flatMap((st) => st.objects)
  it('the boundary is a closed ring path carrying the boundary caption', () => {
    const ring = objs.find((o) => o.id === 'boundary')!
    expect(ring.type).toBe('path')
    expect(ring.text).toBe('Outer wall')
    expect(ring.points![0]).toEqual(ring.points![ring.points!.length - 1])
  })
  it('no solid sphere is large enough to contain a part', () => {
    const parts = objs.filter((o) => (o.id ?? '').startsWith('part-'))
    for (const sphere of objs.filter((o) => o.type === 'node' && typeof o.radius === 'number')) {
      for (const p of parts) {
        if (p === sphere) continue
        const dist = Math.hypot(p.position![0] - sphere.position![0], p.position![1] - sphere.position![1])
        expect(dist + (p.radius ?? 0), `${p.id} inside ${sphere.id}`).toBeGreaterThan(sphere.radius!)
      }
    }
  })
  it('a custom first-step sentence replaces the cell wording', () => {
    const custom = buildCellStructureScene({
      conceptId: 't.s', subject: 'Phylum X', boundaryLabel: 'Phylum X', teachingGoal: 'g', boundaryNarration: 'Phylum X has three hallmarks.',
      parts: [{ name: 'A', description: 'a' }],
    })
    expect(custom.steps[0].narration).toBe('Phylum X has three hallmarks.')
  })
})

describe('captions sit beside their sphere, not on it', () => {
  it('hub: spoke and hub captions are offset off the sphere; an even spoke count leaves the top free', () => {
    const hub = buildCellHubScene({
      conceptId: 't.h', hubLabel: 'Hub', title: 'T', teachingGoal: 'g',
      spokes: Array.from({ length: 6 }, (_, i) => ({ name: `S${i}`, description: 'd' })),
    })
    const nodes = hub.steps.flatMap((st) => st.objects).filter((o) => o.type === 'node')
    for (const n of nodes) expect(n.properties?.labelOffset, n.id).toBeDefined()
    // No spoke points straight up through the hub's caption.
    const spokes = nodes.filter((n) => n.id !== 'hub')
    expect(spokes.some((n) => Math.abs(n.position![0]) < 0.3 && n.position![1] > 0)).toBe(false)
  })

  it('comparison: no connector runs through a caption — only a short stub under the header', () => {
    const cmp = buildCellComparisonScene({
      conceptId: 'bio.t.c', title: 'T', teachingGoal: 'g',
      groups: [
        { label: 'A', description: 'a', items: ['one', 'two', 'three'] },
        { label: 'B', description: 'b', items: ['four', 'five'] },
      ],
    })
    const objs = cmp.steps.flatMap((st) => st.objects)
    const items = objs.filter((o) => o.type === 'label')
    for (const path of objs.filter((o) => o.type === 'path')) {
      const lowest = Math.min(...path.points!.map((p) => p[1]))
      for (const item of items.filter((i) => Math.abs(i.position![0] - path.points![0][0]) < 0.01)) {
        expect(lowest, `${path.id} stops above ${item.text}`).toBeGreaterThan(item.position![1])
      }
    }
  })

  it('comparison captions wrap to their column: a share of the canvas AND the column pitch; three or more groups use a grid', () => {
    const groups = (n: number) => Array.from({ length: n }, (_, i) => ({ label: `G${i}`, description: 'd', items: ['item'] }))
    const labelOf = (sc: SceneSpec) => sc.steps.flatMap((st) => st.objects).find((o) => o.type === 'label')!
    const two = buildCellComparisonScene({ conceptId: 'bio.t', title: 'T', teachingGoal: 'g', groups: groups(2) })
    expect(labelOf(two).properties).toMatchObject({ labelWrapFraction: 0.42, labelWrapUnits: 7.9 }) // two columns, 9.5 apart less a 1.6 gutter
    const four = buildCellComparisonScene({ conceptId: 'bio.t', title: 'T', teachingGoal: 'g', groups: groups(4) })
    expect(labelOf(four).properties).toMatchObject({ labelWrapFraction: 0.42, labelWrapUnits: 9.4 }) // two columns, 11 apart less a 1.6 gutter
    const six = buildCellComparisonScene({ conceptId: 'bio.t', title: 'T', teachingGoal: 'g', groups: groups(6) })
    expect(labelOf(six).properties).toMatchObject({ labelWrapFraction: 0.28, labelWrapUnits: 5.6 }) // three columns, 7.2 apart less a 1.6 gutter
  })

  it('a long hub caption is a heading above the figure; a short one stays on the hub', () => {
    const mk = (hubLabel: string) => buildCellHubScene({ conceptId: 't.h', hubLabel, title: 'T', teachingGoal: 'g', spokes: Array.from({ length: 4 }, (_, i) => ({ name: `S${i}`, description: 'd' })) })
    const hubOf = (sc: SceneSpec) => sc.steps[0].objects.find((o) => o.id === 'hub')!
    expect((hubOf(mk('Biology')).properties!.labelOffset as number[])[1]).toBeCloseTo(1.4, 1)
    const long = hubOf(mk('Cognitive neuroscience of consciousness: three distinct ideas'))
    expect((long.properties!.labelOffset as number[])[1]).toBeGreaterThan(5)
    expect(long.properties!.labelWrapFraction).toBe(0.8)
  })

  it('pathway arrows stop at the sphere surfaces, so their heads are visible, and a cycle returns with an arrowhead', () => {
    const sc = buildCellPathwayScene({
      conceptId: 'bio.t.p', title: 'T', teachingGoal: 'g', cyclic: true,
      stages: [{ name: 'A', description: 'a' }, { name: 'B', description: 'b' }, { name: 'C', description: 'c' }],
    })
    const objs = sc.steps.flatMap((st) => st.objects)
    const arrow = objs.find((o) => o.id === 'stage-1-arrow')!
    // centres 4.5 apart, sphere radius 0.8: the arrow neither starts nor ends inside a sphere
    expect(arrow.from![0]).toBeGreaterThan(0.8)
    expect(arrow.to![0]).toBeLessThan(4.5 - 0.8)
    expect(objs.some((o) => o.id === 'cycle-return-arrow' && o.type === 'arrow')).toBe(true)
  })
})

describe('corpus gate: every authored Biology figure lays out cleanly at phone and desktop widths', () => {
  const ids = CONCEPT_SCENE_OVERRIDES.filter((id) => id.startsWith('bio.'))
  it('has the Biology scenes to check', () => { expect(ids.length).toBeGreaterThan(150) })

  for (const [name, w, h, bw] of [['phone 390px', 358, 268, 390], ['desktop 1280px', 914, 414, 1280]] as const) {
    it(`${name}: contained and, where needed, on a taller stage, no label is clipped or collides`, { timeout: 180000 }, () => {
      const failures: string[] = []
      for (const id of ids) {
        const sc = buildCanonicalScene(null, id)
        if (!sc) continue
        const height = stageHeightToFit(sc, w, h, bw, 600)
        const vp = viewportFromCanvas(w, height, bw)
        // The framing `ExplainerFigure` applies on a Biology lesson: the aspect rule and the viewport rule, whichever is further.
        const framed = { ...sc, cameraDistance: Math.max(cameraDistanceToContain(sc, w / height), cameraDistanceToContainFigure(sc, vp)) }
        const report = checkSceneLayout(framed, vp)
        if (!report.ok) failures.push(`${id}: ${report.violations.length}`)
      }
      expect(failures).toEqual([])
    })
  }

  it('the three supported viewports are the ones this gate is calibrated against', () => {
    expect(VIEWPORTS.map((v) => v.name)).toEqual(['desktop', 'tablet', 'mobile'])
  })
})

describe('long pathways stagger their captions; pairs compare item by item', () => {
  const stageNames = (n: number) => Array.from({ length: n }, (_, i) => ({ name: `Stage ${i}`, description: `d${i}` }))
  const captionSides = (n: number, conceptId = 'bio.t.stagger') => {
    const sc = buildCellPathwayScene({ conceptId, title: 'T', teachingGoal: 'g', stages: stageNames(n) })
    return sc.steps.flatMap((st) => st.objects).filter((o) => o.type === 'node').map((o) => (o.properties!.labelOffset as number[])[1] > 0 ? 'above' : 'below')
  }
  it('six or more stages alternate above / below the line, so neighbouring captions are two pitches apart', () => {
    expect(captionSides(6)).toEqual(['above', 'below', 'above', 'below', 'above', 'below'])
  })
  it('five or fewer stages keep every caption above the line', () => {
    expect(captionSides(5)).toEqual(['above', 'above', 'above', 'above', 'above'])
  })
  it('a non-Biology pathway is untouched: no caption properties at all', () => {
    const sc = buildCellPathwayScene({ conceptId: 'phys.t.p', title: 'T', teachingGoal: 'g', stages: stageNames(8) })
    expect(sc.steps.flatMap((st) => st.objects).some((o) => o.properties !== undefined)).toBe(false)
  })
  it('two groups: item k of one column sits level with item k of the other, whichever column wraps to more lines', () => {
    const sc = buildCellComparisonScene({
      conceptId: 'bio.t.pair', title: 'T', teachingGoal: 'g',
      groups: [
        { label: 'A', description: 'a', items: ['short', 'another short one'] },
        { label: 'B', description: 'b', items: ['a considerably longer caption that has to wrap onto several lines in its column', 'also short'] },
      ],
    })
    const items = (gi: number) => sc.steps[gi].objects.filter((o) => o.type === 'label').map((o) => o.position![1])
    const [a, b] = [items(0), items(1)]
    expect(a).toHaveLength(2)
    expect(a[1]).toBeCloseTo(b[1], 1) // the second row is shared; the taller first caption pushes both columns down together
  })
  it('the first item caption starts below the header sphere and its stub, even when it wraps to several lines', () => {
    const sc = buildCellComparisonScene({
      conceptId: 'bio.t.first', title: 'T', teachingGoal: 'g',
      groups: [{ label: 'A', description: 'a', items: ['one two three four five six seven eight nine ten eleven twelve'] }, { label: 'B', description: 'b', items: ['x'] }],
    })
    const header = sc.steps[0].objects.find((o) => o.type === 'node')!
    const item = sc.steps[0].objects.find((o) => o.type === 'label')!
    expect(header.position![1] - item.position![1]).toBeGreaterThan(2.5)
  })
})

describe('the figure-level containment and stage growth are Biology-only', () => {
  const read = (rel: string) => readFileSync(join(process.cwd(), rel), 'utf8')
  it('ExplainerFigure applies them only when fitToCanvas is on, and it defaults to off', () => {
    const src = read('src/components/school/visuals/ExplainerFigure.tsx')
    expect(src).toMatch(/fitToCanvas = false/)
    expect(src).toMatch(/if \(!fitToCanvas \|\| !sceneBox \|\| simulation\.active\) return/)
    expect(src).toMatch(/: !fitToCanvas\s*\n\s*\? \(sceneAspect === null \? null : cameraDistanceToContain\(drawn, sceneAspect\)\)/)
  })
  it('only a Biology lesson turns it on', () => {
    expect(read('src/components/learn/LessonScreen.tsx')).toMatch(/<SceneSpecFigure spec=\{msg\.sceneSpec\} learnerLevel=\{learnerLevel\} fitToCanvas=\{subjectSlug === 'biology'\} \/>/)
  })
})
