/**
 * Biology complete-quality closure (2026-10-09) — regression tests for the six figures a render audit left REVIEW_REQUIRED.
 *
 * Every figure below was rendered in Chromium at 1280 and 390 px, both themes, every stage, before and after. The assertions pin the
 * measured defect each fix closed, grounded in the concept's own Educational Brain entry — not the picture's pixels:
 *
 *   A  brain-regional-organization   was a ring of dots; now anatomy (one brush path per region) — and the first draft was REJECTED by the
 *                                    admission gate (ST-07, > 50 objects per step), so "it is admitted and served" is itself a test
 *   B  cell-theory                   was a generic hub; now the true objective: three contributors in sequence, then the three tenets
 *   C  dna-replication               17 labels against a budget of 9 (see dnaReplicationVisual.test.ts for its own cases)
 *   D  predator-prey-dynamics        was a comparison card; now the population-over-time cycle with the predator lagging the prey
 *   E  mycorrhizae-plant-symbioses   showed only the rhizobium chain; now arbuscular vs ectomycorrhizal by WHERE the hyphae are, kept apart
 *   F  plant-growth-hormones         four of five hormones showed only a name; now every one carries a source-supported function
 */
import { describe, it, expect } from 'vitest'
import type { SceneObject, SceneSpec } from '@/lib/teaching/sceneSpec'
import { resolveVisual } from '@/lib/teaching/visual/resolveVisual'
import { auditGraph, payloadBlockers } from '@/lib/teaching/visual/figureAudit'
import { cameraDistanceToContain, cameraDistanceToContainFigure, placeSceneLabels, stageHeightToFit, viewportFromCanvas } from '@/lib/teaching/visual/layout'
import { complexityFor, isGlyphLabel, labelsHeldBack } from '@/lib/teaching/visual/visualComplexity'
import { availableAnimations } from '@/lib/teaching/visual/sceneAnimation'
import { sceneAtStage } from '@/lib/teaching/visual/layoutStages'
import { validateSceneSpec } from '@/lib/teaching/sceneSpecValidator'
import { buildBrainRegionsScene, BRAIN_REGIONS_SCENE_ID } from '@/lib/teaching/sceneGenerators/brainRegions'
import { buildPredatorPreyScene, PREDATOR_PREY_SCENE_ID } from '@/lib/teaching/sceneGenerators/predatorPreyCycles'
import { buildRootSymbiosesScene, ROOT_SYMBIOSES_SCENE_ID } from '@/lib/teaching/sceneGenerators/rootSymbioses'
import { CONCEPT_SCENE_OVERRIDES } from '@/lib/teaching/visual/conceptSceneParams'

const objects = (s: SceneSpec): SceneObject[] => s.steps.flatMap((st) => st.objects)
const texts = (s: SceneSpec): string[] => objects(s).map((o) => o.text ?? '').filter(Boolean)
const served = (id: string): SceneSpec => {
  const d = resolveVisual({ message: 'show me a diagram', lessonConceptId: id, subject: 'biology', learnerRequest: 'diagram' })
  const payload = d.payload as { sceneSpec?: SceneSpec } | null
  if (!payload?.sceneSpec) throw new Error(`${id} was not served a scene: ${JSON.stringify((d as { reason?: unknown }).reason ?? d).slice(0, 200)}`)
  return payload.sceneSpec
}

/**
 * The lesson's own label placement, replayed: the canvas the figure gets at 1280 and 390 px (the stage grows to fit a tall figure), the camera
 * the framing solver pulls back to, and the label solver at every stage. The pure authored-position check (`checkSceneLayoutAllViewports`) is
 * not the bar for a figure the solver places — Chromium is, and this reproduces what Chromium measured.
 */
const BOXES = [{ box: 'desktop', w: 914, h: 454, bw: 1280 }, { box: 'mobile', w: 324, h: 260, bw: 390 }] as const
function placementReport(spec: SceneSpec) {
  const out: Array<{ box: string; stage: number | 'complete'; unresolved: number; worst: number; worstText: string }> = []
  for (const b of BOXES) {
    const grown = stageHeightToFit(spec, b.w, b.h, b.bw, 600)
    const h = grown > b.h ? grown : b.h
    const vp = viewportFromCanvas(b.w, h, b.bw)
    const dist = Math.max(cameraDistanceToContain(spec, b.w / h), cameraDistanceToContainFigure(spec, vp))
    for (const stage of ['complete', ...spec.steps.map((_, i) => i + 1)] as Array<number | 'complete'>) {
      const res = placeSceneLabels({ ...sceneAtStage(spec, stage as never, 'intermediate'), cameraDistance: dist }, vp)
      const worst = res.labels.reduce((m, l) => (l.movedPx > m.v ? { v: l.movedPx, t: l.text } : m), { v: 0, t: '' })
      out.push({ box: b.box, stage, unresolved: res.unresolved, worst: worst.v, worstText: worst.t })
    }
  }
  return out
}
const labelsOf = (s: SceneSpec) => objects(s).filter((o) => o.type === 'label' && !isGlyphLabel(o))

const IDS = {
  brain: 'bio.neuro.brain-regional-organization',
  theory: 'bio.cell.cell-theory',
  predator: 'bio.eco.predator-prey-dynamics',
  myco: 'bio.plant.mycorrhizae-plant-symbioses',
  hormones: 'bio.plant.plant-growth-hormones',
} as const

describe('all five figures are admitted, served, structurally valid and legible at every viewport', () => {
  for (const [name, id] of Object.entries(IDS)) {
    it(`${name}: Tier-0 override, served, no admission blockers`, () => {
      expect(CONCEPT_SCENE_OVERRIDES).toContain(id)
      const spec = served(id)
      expect(validateSceneSpec(spec)).toEqual({ valid: true, errors: [] })
      expect(payloadBlockers({ renderer: 'scene', sceneSpec: spec } as Parameters<typeof payloadBlockers>[0])).toEqual([])
    })
    it(`${name}: at every stage, on a desktop and a phone canvas, the solver finds a clear spot for every label without moving any far`, () => {
      for (const r of placementReport(served(id))) {
        expect(r.unresolved, `${name} ${r.box} stage ${r.stage}`).toBe(0)
        expect(r.worst, `${name} ${r.box} stage ${r.stage}: ${r.worstText}`).toBeLessThanOrEqual(30)
      }
    })
    it(`${name}: a stage view never holds a label back (intermediate budget)`, () => {
      const spec = served(id)
      spec.steps.forEach((_, i) => {
        const upTo = spec.steps.slice(0, i + 1).flatMap((st) => st.objects)
        expect(labelsHeldBack(upTo, complexityFor('intermediate')), `${name} stage ${i + 1}`).toBe(0)
      })
    })
  }
})

describe('A. brain-regional-organization — anatomy, not a ring of dots', () => {
  const spec = buildBrainRegionsScene()
  it('is the figure served', () => {
    expect(served(IDS.brain).id).toBe(BRAIN_REGIONS_SCENE_ID)
  })
  it('stays inside the admission gate that rejected its first draft: at most 50 objects per step (ST-07)', () => {
    for (const [i, st] of spec.steps.entries()) expect(st.objects.length, `step ${i + 1}`).toBeLessThanOrEqual(50)
  })
  it('the last step carries no focus: the un-walked opening view shows the whole brain, not a dimmed one', () => {
    expect(spec.steps[spec.steps.length - 1].focus ?? []).toEqual([])
  })
  it('draws each region as ONE brush path that opts out of the motion trace (no "Play the motion" for a filled region)', () => {
    const regions = objects(spec).filter((o) => o.type === 'path' && /frontal|parietal|temporal|occipital|cerebrum|midbrain|pons|medulla|cerebellum/i.test(o.id ?? ''))
    expect(regions.length).toBeGreaterThanOrEqual(8)
    for (const r of regions) expect(r.properties?.trace, r.id).toBe(false)
    expect(availableAnimations(spec).some((a) => a.kind === 'trace')).toBe(false)
  })
  it('names both schemes the entry teaches — three divisions and four lobes — and the limbic structures it calls "not one place"', () => {
    const t = texts(spec).join(' | ')
    for (const need of ['Forebrain', 'Midbrain', 'Hindbrain', 'Frontal lobe', 'Parietal lobe', 'Temporal lobe', 'Occipital lobe', 'Cerebellum', 'Medulla and pons', 'Amygdala', 'Hippocampus']) {
      expect(t, need).toContain(need)
    }
    expect(spec.explainer?.legend?.map((l) => l.label).join(' | ')).toMatch(/Limbic/)
  })
  it('on a phone no label is thrown more than 40 px from its anchor (the dots version needed 96 px)', () => {
    const vp = viewportFromCanvas(324, 340, 390)
    for (let stage = 1; stage <= spec.steps.length; stage++) {
      const res = placeSceneLabels({ ...sceneAtStage(spec, stage, 'intermediate'), cameraDistance: 16 }, vp)
      expect(res.unresolved, `stage ${stage}`).toBe(0)
    }
  })
})

describe('B. cell-theory — the true learning objective: three contributors in sequence, then the three tenets', () => {
  const spec = served(IDS.theory)
  it('names the three contributions with their dates, in order, and the theory they build', () => {
    const t = texts(spec)
    expect(t).toEqual(expect.arrayContaining(['Schleiden, 1838', 'Schwann, 1839', 'Virchow, 1855', 'Cell theory']))
    expect(t.indexOf('Schleiden, 1838')).toBeLessThan(t.indexOf('Schwann, 1839'))
    expect(t.indexOf('Schwann, 1839')).toBeLessThan(t.indexOf('Virchow, 1855'))
  })
  it('attributes "all cells arise from pre-existing cells" to Virchow, never to Schleiden or Schwann', () => {
    const narration = spec.steps.map((s) => s.narration ?? '')
    expect(narration[0]).not.toMatch(/pre-existing/i)
    expect(narration[1]).not.toMatch(/pre-existing/i)
    expect(narration[2]).toMatch(/pre-existing/i)
  })
  it('states the three tenets, and scopes them: the origin of the first cells (abiogenesis) is a separate question', () => {
    const insight = spec.explainer?.insight
    expect(insight?.bullets).toHaveLength(3)
    expect(insight?.bullets.join(' ')).toMatch(/one or more cells/)
    expect(insight?.bullets.join(' ')).toMatch(/basic structural and functional unit/)
    expect(insight?.bullets.join(' ')).toMatch(/pre-existing cells/)
    expect(insight?.note).toMatch(/abiogenesis/)
  })
})

describe('D. predator-prey-dynamics — a population-over-time cycle, with the predator lagging', () => {
  const spec = buildPredatorPreyScene()
  const curve = (id: string) => objects(spec).find((o) => o.id === id)!.points!
  const peakX = (pts: ReadonlyArray<readonly number[]>, from = 0) => {
    let best = -1, bx = 0
    for (const p of pts) if (p[0] > from && p[1] > best) { best = p[1]; bx = p[0] }
    return bx
  }
  it('is the figure served', () => {
    expect(served(IDS.predator).id).toBe(PREDATOR_PREY_SCENE_ID)
  })
  it('is a usable graph: named axes, curves inside them (GR-01, GR-02, GR-04)', () => {
    const { isGraph, findings } = auditGraph(spec)
    expect(isGraph).toBe(true)
    expect(findings.filter((f) => f.severity === 'FAIL')).toEqual([])
    expect(texts(spec)).toEqual(expect.arrayContaining(['Time', 'Population size (relative)']))
  })
  it('the predator curve peaks AFTER the prey curve, by well under a quarter of the plot (a lag, not a swap)', () => {
    const prey = curve('prey-curve'), pred = curve('predator-curve')
    const span = prey[prey.length - 1][0] - prey[0][0]
    // the first cycle only: the two curves repeat, and a later peak is not "the" lag
    const firstCycle = (pts: ReadonlyArray<readonly number[]>) => pts.filter((p) => p[0] < prey[0][0] + span / 2)
    const lag = peakX(firstCycle(pred), prey[0][0]) - peakX(firstCycle(prey), prey[0][0])
    expect(lag).toBeGreaterThan(0)
    expect(lag).toBeLessThan(span / 4)
  })
  it('both curves are drawn over two full cycles (two peaks each) and opt out of the motion trace', () => {
    for (const id of ['prey-curve', 'predator-curve']) {
      const pts = curve(id)
      let peaks = 0
      for (let i = 1; i < pts.length - 1; i++) if (pts[i][1] > pts[i - 1][1] && pts[i][1] >= pts[i + 1][1]) peaks++
      expect(peaks, id).toBe(2)
      expect(objects(spec).find((o) => o.id === id)!.properties?.trace).toBe(false)
    }
    expect(availableAnimations(spec).some((a) => a.kind === 'trace')).toBe(false)
  })
  it('keeps the entry\'s two distinctions: numerical response (the predator POPULATION) vs functional response (kills per predator)', () => {
    const t = texts(spec).join(' | ')
    expect(t).toMatch(/Numerical response/)
    expect(t).toMatch(/Functional response/)
  })
})

describe('E. mycorrhizae-plant-symbioses — arbuscular vs ectomycorrhizal by WHERE the hyphae are, never conflated with rhizobium', () => {
  const spec = buildRootSymbiosesScene()
  const byId = (id: string) => objects(spec).find((o) => o.id === id)!
  const pts = (id: string) => byId(id).points!
  // The three root cells of each row: x ranges by their walls, y by the top and bottom walls.
  const wall = (rowId: string, i: number) => byId(`${rowId}-wall-${i}`).from![0]
  const yTop = (rowId: string) => byId(`${rowId}-top`).from![1]
  const yBottom = (rowId: string) => byId(`${rowId}-bottom`).from![1]
  it('is the figure served', () => {
    expect(served(IDS.myco).id).toBe(ROOT_SYMBIOSES_SCENE_ID)
  })
  it('arbuscular: the hypha crosses the cell wall and every arbuscule twig lies INSIDE the middle cell', () => {
    const hypha = pts('am-hypha')
    expect(hypha[0][1]).toBeGreaterThan(yTop('am-cells'))                    // starts outside the root
    expect(hypha[hypha.length - 1][1]).toBeLessThan(yTop('am-cells'))        // ends inside it
    const left = wall('am-cells', 1), right = wall('am-cells', 2)
    for (const id of ['a', 'b', 'c', 'd', 'e'].map((k) => `am-arbuscule-${k}`)) {
      for (const p of pts(id)) {
        expect(p[0], `${id} x`).toBeGreaterThan(left)
        expect(p[0], `${id} x`).toBeLessThan(right)
        expect(p[1], `${id} y`).toBeLessThan(yTop('am-cells'))
        expect(p[1], `${id} y`).toBeGreaterThan(yBottom('am-cells'))
      }
    }
  })
  it('ectomycorrhizal: the mantle is on the OUTSIDE and the Hartig net runs BETWEEN the cells (on a wall line, never inside a cell)', () => {
    for (const k of ['a', 'b']) {
      const m = byId(`em-mantle-${k}`)
      expect(m.from![1]).toBeGreaterThan(yTop('em-cells'))
    }
    const walls = [0, 1, 2, 3].map((i) => wall('em-cells', i))
    for (const id of ['em-hartig-a', 'em-hartig-b']) {
      for (const p of pts(id)) {
        const nearest = Math.min(...walls.map((w) => Math.abs(p[0] - w)))
        expect(nearest, `${id} strays ${nearest.toFixed(2)} from a cell wall`).toBeLessThan(0.25)
      }
    }
  })
  it('the rhizobium–legume chain is a separate partnership: bacteria, own colour, and the heading says "not fungi"', () => {
    expect(texts(spec).join(' | ')).toMatch(/bacteria not fungi/)
    const chain = objects(spec).filter((o) => /^rhizobium-\d$/.test(o.id ?? ''))
    expect(chain.map((o) => o.text)).toEqual(['Root hair infection', 'Nodule formation', 'Low-oxygen nodule', 'Nitrogen fixation'])
    const hyphae = byId('am-hypha').color
    for (const c of chain) expect(c.color).not.toBe(hyphae)
  })
  it('narration follows the entry: leghaemoglobin keeps free oxygen low so nitrogenase can fix N2', () => {
    const n = spec.steps.map((s) => s.narration ?? '').join(' ')
    expect(n).toMatch(/Nitrogenase is IRREVERSIBLY INACTIVATED by oxygen/)
    expect(n).toMatch(/Leghaemoglobin/)
    expect(n).toMatch(/N2 into ammonia/)
  })
  it('no label is thrown more than 30 px from its anchor on a phone or a desktop canvas (was 66-84 px)', () => {
    for (const r of placementReport(spec)) expect(r.worst, `${r.box} stage ${r.stage}: ${r.worstText}`).toBeLessThanOrEqual(30)
  })
})

describe('F. plant-growth-hormones — every hormone carries a source-supported function, not only a name', () => {
  const spec = served(IDS.hormones)
  const group = (i: number) => objects(spec).filter((o) => o.id?.startsWith(`group-${i}-item-`)).map((o) => o.text ?? '')
  it('all five groups show at least one caption, and every group is named', () => {
    const names = objects(spec).filter((o) => /^group-\d$/.test(o.id ?? '')).map((o) => o.text)
    expect(names).toEqual(['Auxins (IAA)', 'Gibberellins', 'Cytokinins', 'Abscisic acid', 'Ethylene'])
    for (let i = 0; i < 5; i++) expect(group(i).length, `group ${i}`).toBeGreaterThanOrEqual(1)
  })
  it('states the entry\'s load-bearing claims: phototropism direction, root sensitivity, and the cytokinin/ethylene opposition', () => {
    expect(group(0).join(' | ')).toMatch(/away from light: shaded side grows more/)
    expect(group(0).join(' | ')).toMatch(/Roots ~1000× more sensitive/)
    expect(group(2).join(' | ')).toMatch(/delays leaf senescence/)
    expect(group(2).join(' | ')).toMatch(/Opposes ethylene/)
    expect(group(4).join(' | ')).toMatch(/gas/i)
    expect(group(4).join(' | ')).toMatch(/Opposes cytokinins/)
    expect(group(1).join(' | ')).toMatch(/dormancy/)
    expect(group(3).join(' | ')).toMatch(/Stomatal closure/)
  })
  it('never claims a hormone ALWAYS does anything (the entry\'s misconception M2: "auxin always promotes growth" is false)', () => {
    const all = [...texts(spec), ...spec.steps.map((st) => st.narration ?? '')].join(' | ')
    expect(all).not.toMatch(/\balways\b/i)
    // the only "always" in the figure is the quoted misconception in the teaching goal, which it calls false
    expect(spec.teachingGoal).toMatch(/"Auxins always promote growth" is false/)
  })
  it('keeps every caption within the budget so none is held back in the all-stages view (9)', () => {
    expect(labelsOf(spec).length).toBeLessThanOrEqual(9)
    expect(objects(spec).filter((o) => /^group-\d-item-\d+$/.test(o.id ?? '')).length).toBeLessThanOrEqual(9)
  })
})

describe('traceablePaths: a path may opt out of "Play the motion" with properties.trace === false', () => {
  const route = (props?: Record<string, unknown>): SceneObject => ({
    type: 'path', id: 'p', points: Array.from({ length: 12 }, (_, i) => [i, i, 0] as [number, number, number]), color: '#9AA5B8',
    ...(props ? { properties: props } : {}),
  })
  const sceneOf = (o: SceneObject): SceneSpec => ({ id: 't', title: 't', sceneType: 'diagram', steps: [{ objects: [o] }] })
  it('a content path with no property is still traceable, exactly as before', () => {
    expect(availableAnimations(sceneOf({ ...route(), color: '#22c55e' })).some((a) => a.kind === 'trace')).toBe(true)
  })
  it('the same path with trace:false is not offered', () => {
    expect(availableAnimations(sceneOf({ ...route({ trace: false }), color: '#22c55e' })).some((a) => a.kind === 'trace')).toBe(false)
  })
  it('only the literal false opts out: a truthy or absent value changes nothing', () => {
    for (const v of [true, 0, null, 'false']) expect(availableAnimations(sceneOf({ ...route({ trace: v }), color: '#22c55e' })).some((a) => a.kind === 'trace'), String(v)).toBe(true)
  })
})
