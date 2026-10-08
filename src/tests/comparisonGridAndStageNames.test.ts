/**
 * Two figure defects found by the 2026-09-27 production browser pass, fixed
 * 2026-09-28.
 *
 * 1. A pathway's "What's happening?" lines did not say which stage they
 *    described. The authored stage descriptions are clauses whose subject IS
 *    the stage ("secretes GnRH in pulsatile bursts" for the hypothalamus), so
 *    the panel listed actions with no actor. The branch steps also ran two
 *    clauses together with no stop ("forms the diploid zygote forms the
 *    TRIPLOID endosperm").
 * 2. Comparisons of five or six groups were drawn as one row of columns 5.5
 *    apart: labels overlapped at 1200px, and at 390px the outer columns fell
 *    outside the frame. They are now two rows of at most three columns.
 *
 * Also pinned: the panel is cut at whole lines, never mid-sentence.
 */
import { describe, expect, it } from 'vitest'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { buildCanonicalScene } from '@/lib/teaching/visual/conceptSceneParams'
import { buildCellComparisonScene, type ComparisonGroup } from '@/lib/teaching/sceneGenerators/cellComparison'
import { buildCellPathwayScene } from '@/lib/teaching/sceneGenerators/cellPathway'
import { deriveExplainer } from '@/lib/teaching/visual/explainer'
import type { SceneSpec } from '@/lib/teaching/sceneSpec'

const SRC = readFileSync(join(process.cwd(), 'src/lib/teaching/visual/conceptSceneParams.ts'), 'utf8')
const IDS = [...new Set([...SRC.matchAll(/'((?:bio|phys|chem|math|cs)\.[a-z0-9.-]+)'/g)].map((m) => m[1]))]
const SCENES = IDS.map((id) => [id, buildCanonicalScene(null, id)] as const)
  .filter((e): e is readonly [string, SceneSpec] => e[1] !== null)
const PATHWAYS = SCENES.filter(([, s]) => s.id.startsWith('cell-pathway-'))
const COMPARISONS = SCENES.filter(([, s]) => s.id.startsWith('cell-comparison-'))

const headers = (s: SceneSpec) =>
  s.steps.map((st) => st.objects.find((o) => /^group-\d+$/.test(o.id ?? ''))!.position!)

describe('a pathway step names the stage it describes', () => {
  it('covers every Biology pathway figure', () => {
    expect(PATHWAYS.length).toBeGreaterThanOrEqual(49)
  })

  it.each(PATHWAYS)('%s: every stage node is named in its own step', (_id, scene) => {
    for (const step of scene.steps) {
      const names = step.objects.filter((o) => o.type === 'node').map((o) => o.text ?? '')
      for (const name of names) expect(step.narration ?? '').toContain(name)
    }
  })

  it('names both branches and ends the first, so they cannot run together', () => {
    const scene = buildCellPathwayScene({
      conceptId: 'test.branch', title: 'T', teachingGoal: 'g',
      stages: [{ name: 'Shared', description: 'the shared stage' }],
      branchEnd: [{ name: 'Left', description: 'forms one thing' }, { name: 'Right', description: 'forms another' }],
    })
    expect(scene.steps.at(-1)!.narration).toBe(
      'The same shared stage can lead to two different outcomes. Left: forms one thing. Right: forms another',
    )
  })

  it('does not repeat a name the description already opens with', () => {
    const scene = buildCellPathwayScene({
      conceptId: 'test.named', title: 'T', teachingGoal: 'g',
      stages: [{ name: 'Mitosis', description: 'Mitosis separates the chromatids' }, { name: 'G1', description: 'the cell grows' }],
    })
    expect(scene.steps.map((s) => s.narration)).toEqual(['Mitosis separates the chromatids', 'G1: the cell grows'])
  })

  it('a one-letter stage name is not "found" inside the first word', () => {
    const scene = buildCellPathwayScene({
      conceptId: 'test.m', title: 'T', teachingGoal: 'g',
      stages: [{ name: 'M', description: 'mitosis and cytokinesis divide the cell' }],
    })
    expect(scene.steps[0].narration).toBe('M: mitosis and cytokinesis divide the cell')
  })
})

describe('comparisons of five or more groups use two rows', () => {
  const group = (i: number): ComparisonGroup => ({ label: `G${i}`, description: 'd', items: [`Item ${i}`] })
  const build = (n: number) => buildCellComparisonScene({
    conceptId: 'test.grid', title: 'T', teachingGoal: 'g', groups: Array.from({ length: n }, (_, i) => group(i)),
  })

  it('four groups: one row, 5.5 apart, headers at y = 2.5 (unchanged for every non-Biology concept)', () => {
    const h = headers(build(4))
    expect(h.map((p) => p[1])).toEqual([2.5, 2.5, 2.5, 2.5])
    expect(h.map((p) => p[0])).toEqual([-8.25, -2.75, 2.75, 8.25])
    expect(build(4).cameraDistance).toBe(18)
  })

  // 2026-10-08 (Biology visual render audit): in a BIOLOGY figure three and four groups used to sit in ONE row.
  // A row of three or four columns cannot hold their captions at phone width (each column gets a quarter of a
  // 358px canvas), so Biology comparisons of three or more groups use the same two-row grid as five and six, with
  // at most two columns for three or four groups so each caption can wrap to its column. Other subjects' figures
  // (a few Chemistry comparisons share this generator) are unchanged: the grid starts at five groups for them.
  const buildBio = (n: number) => buildCellComparisonScene({
    conceptId: 'bio.test.grid', title: 'T', teachingGoal: 'g', groups: Array.from({ length: n }, (_, i) => group(i)),
  })
  it.each([3, 4])('Biology, %i groups: two rows of at most two columns', (n) => {
    const h = headers(buildBio(n))
    const rows = [...new Set(h.map((p) => p[1]))]
    expect(rows).toHaveLength(2)
    for (const y of rows) expect(h.filter((p) => p[1] === y).length).toBeLessThanOrEqual(2)
    expect(h[0][1]).toBeGreaterThan(h[n - 1][1])
  })
  it('Biology, one or two groups: one row, 5.5 apart, headers at y = 2.5', () => {
    const h = headers(buildBio(2))
    expect(h.map((p) => p[1])).toEqual([2.5, 2.5])
    expect(h.map((p) => p[0])).toEqual([-2.75, 2.75])
  })
  it('a non-Biology comparison is byte-identical to the original layout: no offsets, no wrap, a connector per item', () => {
    const sc = build(2)
    const objs = sc.steps.flatMap((st) => st.objects)
    expect(objs.some((o) => o.properties !== undefined)).toBe(false)
    expect(objs.filter((o) => o.type === 'path')).toHaveLength(2) // one per item, header → caption
  })

  it.each([5, 6])('%i groups: two rows of at most three columns, inside |x| <= 6.5', (n) => {
    const scene = build(n)
    const h = headers(scene)
    const rows = [...new Set(h.map((p) => p[1]))]
    expect(rows).toHaveLength(2)
    for (const y of rows) expect(h.filter((p) => p[1] === y).length).toBeLessThanOrEqual(3)
    for (const p of h) expect(Math.abs(p[0])).toBeLessThanOrEqual(6.5)
    // Order reads left to right, then down.
    expect(h[0][1]).toBeGreaterThan(h[n - 1][1])
    expect(h[0][0]).toBeLessThan(h[1][0])
    // An item stays under its own header and above the next row.
    const item = scene.steps[0].objects.find((o) => o.type === 'label')!.position!
    expect(item[0]).toBe(h[0][0])
    expect(item[1]).toBeLessThan(h[0][1])
    expect(item[1]).toBeGreaterThan(rows[1])
    expect(scene.cameraDistance).toBe(20)
  })

  it('every real Biology comparison of five or more groups is on the grid', () => {
    const big = COMPARISONS.filter(([, s]) => s.steps.length >= 5)
    expect(big.length).toBeGreaterThanOrEqual(9)
    for (const [id, s] of big) {
      expect(new Set(headers(s).map((p) => p[1])).size, id).toBe(2)
      for (const p of headers(s)) expect(Math.abs(p[0]), id).toBeLessThanOrEqual(6.5)
    }
  })
})

describe('the panel is cut at whole lines', () => {
  it('a long narration drops whole lines, never half a sentence', () => {
    const line = (i: number) => `Step ${i} explains one more thing about the process in a full sentence.`
    const scene: SceneSpec = {
      id: 'test-long', title: 'T', sceneType: 'process',
      steps: Array.from({ length: 20 }, (_, i) => ({ narration: line(i), objects: [] })),
    }
    const body = deriveExplainer(scene).panels.find((p) => p.heading === "What's happening?")!.body!
    expect(body.length).toBeLessThanOrEqual(1000)
    for (const l of body.split('\n')) expect(l).toMatch(/^Step \d+ .*sentence\.$/)
  })

  it('every deterministic figure fits its whole narration in the panel', () => {
    for (const [id, s] of SCENES) {
      if (s.explainer?.panels?.length) continue
      const body = deriveExplainer(s).panels.find((p) => p.heading === "What's happening?")?.body ?? ''
      const lines = s.steps.map((st) => st.narration?.trim() ?? '').filter(Boolean)
      if (!lines.length || lines.some((n) => /[=≈≠<>]/.test(n))) continue
      expect(body.split('\n').length, id).toBe(lines.length)
    }
  })
})
