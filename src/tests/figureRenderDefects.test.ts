/**
 * Three figure defects MEASURED in a real browser against production
 * (2026-09-27, bio.found.what-is-biology, "Give me a diagram" — see
 * docs/architecture/BIOLOGY_VISUAL_COVERAGE_HANDOVER.md). The figure rendered,
 * but:
 *
 *   1. its six hub-to-branch spokes were invisible — a `path` was drawn as
 *      point markers only, and a two-point spoke's markers sit inside spheres;
 *   2. its legend read "Biology / Botany / Spoke line 0" — one row per colour
 *      named after the FIRST object of that colour, and an internal id shown
 *      as a label;
 *   3. its "What's happening?" panel ran the steps together — "Biology Botany:
 *      the study of plants Zoology: …".
 *
 * `path` is a shared primitive (physics trajectories, orbits, waves, electron
 * shells, calculus curves), so the geometry is pinned on physics scenes too,
 * and the legend/panel invariants are checked across the whole deterministic
 * scene corpus, not just the one figure that exposed them.
 */
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import { pathSegments, type SceneObject, type SceneSpec, type Vec3 } from '@/lib/teaching/sceneSpec'
import { deriveExplainer, humanizeId, nameFromId } from '@/lib/teaching/visual/explainer'
import { linkSymbols } from '@/lib/teaching/visual/representation'
import {
  ACTIVATED_SCENE_KINDS,
  CONCEPT_SCENE_OVERRIDES,
  buildCanonicalScene,
} from '@/lib/teaching/visual/conceptSceneParams'

const read = (rel: string) => readFileSync(path.join(process.cwd(), rel), 'utf8')
const objectsOf = (s: SceneSpec) => s.steps.flatMap((st) => st.objects)
const pathsOf = (s: SceneSpec) => objectsOf(s).filter((o) => o.type === 'path' || o.type === 'trajectory')
const same = (a: Vec3, b: Vec3) => a[0] === b[0] && a[1] === b[1] && a[2] === b[2]

function scene(kind: string | null, conceptId: string | null): SceneSpec {
  const s = buildCanonicalScene(kind, conceptId)
  if (!s) throw new Error(`no canonical scene for ${kind ?? conceptId}`)
  return s
}

const CORPUS: [string, SceneSpec][] = [
  ...CONCEPT_SCENE_OVERRIDES.map((c) => [c, buildCanonicalScene(null, c)] as const),
  ...ACTIVATED_SCENE_KINDS.map((k) => [`kind:${k}`, buildCanonicalScene(k, null)] as const),
].filter((e): e is [string, SceneSpec] => e[1] !== null)

// ── 1. a path is drawn as a line through its points ──────────────────────────

describe('path geometry: pathSegments', () => {
  it('joins each consecutive pair, in order', () => {
    const pts: Vec3[] = [[0, 0, 0], [1, 0, 0], [1, 1, 0]]
    expect(pathSegments(pts)).toEqual([[[0, 0, 0], [1, 0, 0]], [[1, 0, 0], [1, 1, 0]]])
  })

  it('skips a repeated point (a zero-length segment has no direction)', () => {
    expect(pathSegments([[0, 0, 0], [0, 0, 0], [2, 0, 0]])).toEqual([[[0, 0, 0], [2, 0, 0]]])
  })

  it('draws nothing for fewer than two points', () => {
    expect(pathSegments(undefined)).toEqual([])
    expect(pathSegments([[1, 2, 3]])).toEqual([])
  })

  it('the Biology hub: every spoke is a visible segment from the hub centre to its branch', () => {
    const s = scene(null, 'bio.found.what-is-biology')
    const nodes = objectsOf(s).filter((o) => o.type === 'node')
    const hub = nodes.find((n) => n.id === 'hub')!
    const spokes = pathsOf(s)
    expect(spokes).toHaveLength(6)
    for (const spoke of spokes) {
      const segs = pathSegments(spoke.points)
      expect(segs).toHaveLength(1)
      expect(same(segs[0][0], hub.position!)).toBe(true)
      expect(nodes.some((n) => n.id !== 'hub' && same(segs[0][1], n.position!))).toBe(true)
    }
  })

  // The shared-renderer regression guard: the curves physics draws with `path`
  // must come out as ONE continuous polyline through every sample, in order —
  // not a scatter, not a shortcut, and closed exactly when the curve is closed.
  const CURVES: [string, string | null, string | null, 'open' | 'closed'][] = [
    ['projectile trajectory', 'projectile', null, 'open'],
    ['pendulum arc', 'pendulum', null, 'open'],
    ['circular-motion circle', 'circular', null, 'closed'],
    ['gravitation orbit', 'gravitation_orbit', null, 'closed'],
    ['torque angle arc', 'torque_diagram', null, 'open'],
    ['electron shells', 'electron_shells', null, 'closed'],
    ['transverse wave', null, 'phys.wave.transverse-waves', 'open'],
    ['wave interference', null, 'phys.wave.interference', 'open'],
  ]
  for (const [name, kind, concept, shape] of CURVES) {
    it(`physics/chemistry ${name} is one continuous ${shape} polyline`, () => {
      const curves = pathsOf(scene(kind, concept)).filter((p) => (p.points?.length ?? 0) > 10)
      expect(curves.length).toBeGreaterThan(0)
      for (const curve of curves) {
        const pts = curve.points!
        const segs = pathSegments(pts)
        const distinctSteps = pts.slice(1).filter((p, i) => !same(p, pts[i])).length
        expect(segs).toHaveLength(distinctSteps)
        for (let i = 1; i < segs.length; i++) expect(same(segs[i - 1][1], segs[i][0])).toBe(true)
        expect(same(segs[0][0], pts[0])).toBe(true)
        expect(same(segs[segs.length - 1][1], pts[pts.length - 1])).toBe(true)
        expect(same(pts[0], pts[pts.length - 1])).toBe(shape === 'closed')
      }
    })
  }

  it('the renderer draws a path as BondLine segments plus its markers, not markers alone', () => {
    const src = read('src/components/school/visuals/SceneSpecRenderer.tsx')
    const pathCase = src.slice(src.indexOf("case 'path':"), src.indexOf("case 'bond':"))
    expect(pathCase).toContain('pathSegments(points)')
    expect(pathCase).toContain('<BondLine')
    expect(pathCase).toContain('<MolecularNode3D')
  })
})

// ── 2. the legend names every object of a colour, and never an id handle ────

describe('legend: every object named, no internal ids', () => {
  it('the Biology hub: one row names all six branches, and no connector id', () => {
    const labels = (deriveExplainer(scene(null, 'bio.found.what-is-biology')).legend ?? []).map((r) => r.label)
    expect(labels[0]).toBe('Biology')
    expect(labels[1]).toBe('Botany, Zoology, Microbiology, Physiology, Ecology, Genetics')
    expect(labels.join('|')).not.toMatch(/spoke|line \d/i)
  })

  it('the five-kingdom figure no longer shows "Group 0 line 0"', () => {
    const labels = (deriveExplainer(scene(null, 'bio.found.five-kingdom')).legend ?? []).map((r) => r.label)
    expect(labels).not.toContain('Group 0 line 0')
    expect(labels.join('|')).not.toMatch(/\bgroup \d/i)
  })

  it('nameFromId keeps names and rejects handles', () => {
    expect(nameFromId('orbit')).toBe('Orbit')
    expect(nameFromId('collision-point')).toBe('Collision point')
    expect(nameFromId('bond0')).toBe('Bond')
    expect(nameFromId('pVector')).toBe('P vector')
    expect(nameFromId('male-0')).toBe('Male')
    expect(nameFromId('resistor-1')).toBe('Resistor')
    for (const handle of ['spoke-line-0', 'group-0-line-1', 'stage-1-arrow', 'branch-start-a-arrow', 'node-1-0', 'e0', undefined]) {
      expect(nameFromId(handle)).toBe('')
    }
  })

  it('physics legends built from real names survive the change', () => {
    const labels = (kind: string) => (deriveExplainer(scene(kind, null)).legend ?? []).map((r) => r.label)
    expect(labels('electric_dipole')).toContain('P vector')
    expect(labels('electric_circuit')).toEqual(['Battery', 'Resistor'])
    expect(labels('demographic_pyramid')).toEqual(['Male', 'Female'])
    expect(labels('ray_optics')).toEqual(expect.arrayContaining(['Axis', 'Object', 'Image']))
    expect(labels('projectile')).toContain('Path')
  })

  it('across the corpus, no legend label ever shows an id handle', () => {
    const offenders: string[] = []
    for (const [key, s] of CORPUS) {
      // Authored captions are learner text even when they happen to read like
      // an id ("Daughter cell 1" on `daughter-cell-1`), so they are exempt.
      const captions = new Set(objectsOf(s).map((o) => (typeof o.text === 'string' ? o.text.trim() : '')))
      const handles = new Set(
        objectsOf(s).filter((o) => o.id && !nameFromId(o.id)).map((o) => humanizeId(o.id!))
          .filter((h) => h && !captions.has(h)),
      )
      for (const row of deriveExplainer(s).legend ?? []) {
        for (const part of row.label.replace(/ \+\d+ more$/, '').split(', ')) {
          if (handles.has(part)) offenders.push(`${key}: "${row.label}"`)
        }
      }
    }
    expect(offenders).toEqual([])
  })

  it('across the corpus, a row never names one caption on behalf of differently-captioned objects', () => {
    const offenders: string[] = []
    for (const [key, s] of CORPUS) {
      if (s.explainer?.legend?.length) continue
      for (const row of deriveExplainer(s).legend ?? []) {
        const captions = [...new Set(objectsOf(s)
          .filter((o: SceneObject) => o.color === row.color && o.type !== 'label' && typeof o.text === 'string' && o.text.trim())
          .map((o) => o.text!.trim()))]
        if (captions.length < 2) continue
        const hidden = Number(row.label.match(/ \+(\d+) more$/)?.[1] ?? 0)
        const shown = row.label.replace(/ \+\d+ more$/, '')
        const named = captions.filter((c) => shown.includes(c)).length
        if (named + hidden !== captions.length || named === 0) offenders.push(`${key}: "${row.label}" for ${captions.join(' | ')}`)
      }
    }
    expect(offenders).toEqual([])
  })

  it('a list label keeps the symbol a formula line is coloured by', () => {
    // The row's first name is still its symbol: "p, q" colours p, not "p,".
    const tokens = linkSymbols('p = q d', [{ label: 'p, q', color: '#fff' }])
    expect(tokens.find((t) => t.text === 'p')?.color).toBe('#fff')
  })
})

// ── 3. "What's happening?" is one sentence per step ───────────────────────────

describe("the What's happening? panel", () => {
  const body = (s: SceneSpec) => deriveExplainer(s).panels?.find((p) => p.heading === "What's happening?")?.body ?? ''

  it('the Biology hub: one line per step, each a finished sentence', () => {
    expect(body(scene(null, 'bio.found.what-is-biology')).split('\n')).toEqual([
      'Biology.',
      'Botany: the study of plants.',
      'Zoology: the study of animals.',
      'Microbiology: the study of microorganisms.',
      'Physiology: how living systems function.',
      'Ecology: how organisms interact with each other and their environment.',
      'Genetics: how traits are inherited and change across generations.',
    ])
    expect(body(scene(null, 'bio.found.what-is-biology'))).not.toContain('Biology Botany')
  })

  it('keeps an author\'s own punctuation and adds nothing else', () => {
    const s: SceneSpec = {
      id: 't', title: 'T', sceneType: 'diagram', teachingGoal: 'g',
      steps: [
        { narration: 'Why does it fall?', objects: [] },
        { narration: 'Gravity pulls it down.', objects: [] },
        { narration: 'The steps are:', objects: [] },
        { narration: 'a label with no stop', objects: [] },
      ],
    }
    expect(body(s)).toBe('Why does it fall?\nGravity pulls it down.\nThe steps are:\na label with no stop.')
  })

  it('across the corpus, derived panels never run two steps together', () => {
    const offenders: string[] = []
    for (const [key, s] of CORPUS) {
      if (s.explainer?.panels?.length) continue
      const text = body(s)
      if (!text) continue
      for (const line of text.split('\n')) {
        if (!/[.!?…:;]["'”’)\]]*$/.test(line) && text.length < 600) offenders.push(`${key}: "${line}"`)
      }
    }
    expect(offenders).toEqual([])
  })

  it('the panel keeps its line breaks on screen', () => {
    const css = read('src/components/school/visuals/ExplainerFigure.module.css')
    const rule = css.slice(css.indexOf('.panelBody {'), css.indexOf('}', css.indexOf('.panelBody {')))
    expect(rule).toContain('white-space: pre-line')
  })
})
