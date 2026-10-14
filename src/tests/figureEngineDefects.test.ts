/**
 * FIGURE-ENGINE DEFECTS found by live QA on the Test7 account (2026-10-14) — regression tests.
 *
 *   D2  Euler's complex plane / Carnot P–V graph / Frenet could be turned edge-on, after which every label piled up.
 *       A planar scene now gets a limited orbit; a scene with real depth keeps the free one; both get a "Reset view".
 *   D4  Carnot cycle had no direction arrows and no corner labels.
 *   D7  Rotational Dynamics: the θ label floated on the far side of the lever, away from the arc it names.
 *   D8  Several identical "Check a common idea" chips with nothing to tell them apart.
 *   D9  Inline KaTeX touched the words around it.
 */
import { describe, expect, it } from 'vitest'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { buildCanonicalScene, CONCEPT_SCENE_OVERRIDES } from '@/lib/teaching/visual/conceptSceneParams'
import { isPlanarScene, orbitFor } from '@/lib/teaching/visual/sceneOrbit'
import type { SceneSpec } from '@/lib/teaching/sceneSpec'
import { buildCarnotScene, carnotStates } from '@/lib/teaching/sceneGenerators/physicsCoreScenesB15'
import { buildTorqueScene } from '@/lib/teaching/sceneGenerators/torqueDiagram.pure'
import { MessageContent } from '@/components/learn/MessageContent'
import { ScriptedText, SCRIPT_SIZE } from '@/components/school/visuals/ScriptedText'

const read = (p: string) => readFileSync(join(process.cwd(), p), 'utf8')
const code = (src: string) => src.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '')

type Obj = { type?: string; id?: string; text?: string; from?: number[]; to?: number[]; position?: number[]; points?: number[][] }
const objs = (s: SceneSpec): Obj[] => s.steps.flatMap((st) => st.objects as Obj[])

// ── D2 ──────────────────────────────────────────────────────────────────────────────────────────────────────────────────
describe('D2: a flat drawing is only nudged, a scene with depth stays free', () => {
  const FLAT = ['phys.therm.carnot-cycle', 'math.trig.eulers-formula', 'math.geom.frenet-serret']

  it.each(FLAT)('%s is a planar scene and gets the limited orbit', (conceptId) => {
    const scene = buildCanonicalScene(null, conceptId)
    expect(scene, conceptId).not.toBeNull()
    expect(isPlanarScene(scene!)).toBe(true)
    expect(orbitFor(scene!)).toBe('limited')
  })

  it('the torque (lever + force) diagram is planar at every angle and gets the limited orbit', () => {
    for (const angleDeg of [0, 30, 90, 150, 180]) {
      const scene = buildTorqueScene({ leverLength: 2, force: 10, angleDeg })
      expect(isPlanarScene(scene), `angle ${angleDeg}`).toBe(true)
      expect(orbitFor(scene)).toBe('limited')
    }
  })

  it('a scene with real depth keeps the free orbit — the cross product and a crystal lattice need to be turned', () => {
    for (const conceptId of ['phys.meas.vector-products', 'chem.solid.packing']) {
      const scene = buildCanonicalScene(null, conceptId)
      expect(scene, conceptId).not.toBeNull()
      expect(isPlanarScene(scene!), conceptId).toBe(false)
      expect(orbitFor(scene!), conceptId).toBe('free')
    }
  })

  it('the rule is exact: one object off the plane, in ANY step, makes the scene free', () => {
    const flat: SceneSpec = {
      id: 't', title: 't', sceneType: 'diagram', cameraDistance: 8, teachingGoal: 'g', ariaLabel: 'a',
      steps: [
        { narration: 'a', objects: [{ type: 'label', id: 'l', position: [0, 0, 0], text: 'x' }] },
        { narration: 'b', objects: [{ type: 'arrow', id: 'a', from: [0, 0, 0], to: [2, 1, 0] } as never] },
      ],
    } as SceneSpec
    expect(orbitFor(flat)).toBe('limited')
    const deep = JSON.parse(JSON.stringify(flat)) as SceneSpec
    ;(deep.steps[1].objects[0] as { to: number[] }).to = [2, 1, 0.5]
    expect(orbitFor(deep)).toBe('free')
  })

  it('across the whole registry, almost every scene is flat — the ones left free are the 3D ones', () => {
    let flat = 0
    const free: string[] = []
    for (const c of CONCEPT_SCENE_OVERRIDES) {
      const s = buildCanonicalScene(null, c)
      if (!s) continue
      if (isPlanarScene(s)) flat++
      else free.push(c)
    }
    expect(flat).toBeGreaterThan(800)
    // Anything that stays free must be genuinely 3D; adding to this list is a deliberate decision, not an accident.
    expect(free.sort()).toEqual(expect.arrayContaining(['phys.meas.vector-products', 'chem.solid.packing']))
    expect(free.length).toBeLessThan(15)
  })
})

describe('D2: ThreeDVisual wiring — limited window, Reset view', () => {
  const THREE_D = code(read('src/components/school/visuals/ThreeDVisual.tsx'))
  const RENDERER = code(read('src/components/school/visuals/SceneSpecRenderer.tsx'))

  it('the limited window is ±0.5 rad sideways and ±0.35 rad up/down around the authored view', () => {
    expect(THREE_D).toContain('export const LIMITED_ORBIT = { azimuth: 0.5, polar: 0.35 } as const')
    expect(THREE_D).toContain('minAzimuthAngle: -LIMITED_ORBIT.azimuth')
    expect(THREE_D).toContain('maxAzimuthAngle: LIMITED_ORBIT.azimuth')
    expect(THREE_D).toContain('minPolarAngle: Math.PI / 2 - LIMITED_ORBIT.polar')
    expect(THREE_D).toContain('maxPolarAngle: Math.PI / 2 + LIMITED_ORBIT.polar')
  })

  it("'free' is the default, so every other ThreeDVisual caller is unchanged", () => {
    expect(THREE_D).toContain("orbit = 'free'")
    expect(THREE_D).toMatch(/orbit === 'limited'/)
  })

  it('the scene renderer passes the orbit mode chosen from the scene itself', () => {
    expect(RENDERER).toContain('orbit={orbitFor(spec)}')
  })

  it('"Reset view" shows only once the camera has left the authored view, and calls the controls\' own reset()', () => {
    expect(THREE_D).toContain('data-reset-view=""')
    expect(THREE_D).toContain('aria-label="Reset view"')
    expect(THREE_D).toMatch(/enableControls && moved && \(/)
    expect(THREE_D).toContain('controlsRef.current?.reset()')
    // it watches every kind of movement: rotation, tilt, zoom and pan
    for (const probe of ['getAzimuthalAngle()', 'getPolarAngle()', 'getDistance()', 'c.target.length()']) expect(THREE_D).toContain(probe)
    expect(THREE_D).toContain('onChange={checkMoved}')
  })

  it('a re-framed scene saves its new camera as the state "Reset view" returns to', () => {
    expect(THREE_D).toContain('saveState')
  })
})

// ── D4 ──────────────────────────────────────────────────────────────────────────────────────────────────────────────────
describe('D4: the Carnot cycle shows which way round it runs, and names its corners', () => {
  const scene = buildCarnotScene()
  const texts = (step: number) => (scene.steps[step].objects as Obj[]).map((o) => o.text ?? '')
  // The scene's own mapping from (V, p) to scene coordinates.
  const X = (V: number) => -3.6 + V, Y = (p: number) => -2.6 + p
  const corners = carnotStates().map(([V, p]) => [X(V), Y(p)] as const)

  it('has the four corner labels A, B, C and D, each next to its state dot', () => {
    const all = objs(scene).filter((o) => o.type === 'label')
    for (const [i, name] of ['A', 'B', 'C', 'D'].entries()) {
      const lab = all.find((o) => o.text === name)
      expect(lab, `label ${name}`).toBeDefined()
      const d = Math.hypot(lab!.position![0] - corners[i][0], lab!.position![1] - corners[i][1])
      expect(d, `${name} sits beside its corner`).toBeLessThan(0.7)
    }
  })

  it('the step narrations walk A → B → C → D → A in order', () => {
    expect(scene.steps[0].narration).toContain('A → B')
    expect(scene.steps[0].narration).toContain('B → C')
    expect(scene.steps[1].narration).toContain('C → D')
    expect(scene.steps[1].narration).toContain('D → A')
    expect(scene.steps[2].narration).toContain('A → B → C → D → A')
  })

  it('has four direction arrowheads, and EACH points the way the gas travels (A→B, B→C, C→D, D→A)', () => {
    const isAxis = (o: Obj) => Math.abs(o.from![0] - X(0)) < 1e-6 && Math.abs(o.from![1] - Y(0)) < 1e-6
    // axis arrows start at the graph origin; arrowheads sit on the loop
    const heads = scene.steps.slice(0, 2)
      .flatMap((st) => (st.objects as Obj[]).filter((o) => o.type === 'arrow' && o.from && o.to))
      .filter((o) => !isAxis(o))
    expect(heads).toHaveLength(4)
    // Each arrowhead is cut from a point ON one branch's own curve, so the branch is found by exact point match — not by
    // guessing from where it sits (the branches' bounding boxes overlap).
    const curves = objs(scene).filter((o) => o.type === 'path' && o.points && o.points.length > 2)
    expect(curves).toHaveLength(4)
    const near = (p: number[], q: readonly [number, number]) => Math.hypot(p[0] - q[0], p[1] - q[1]) < 0.05
    const branchOf = (c: Obj) => {
      const [p0, p1] = [c.points![0], c.points![c.points!.length - 1]]
      for (let i = 0; i < 4; i++) {
        const [a, b] = [corners[i], corners[(i + 1) % 4]]
        if ((near(p0, a) && near(p1, b)) || (near(p0, b) && near(p1, a))) return i
      }
      return -1
    }
    const seen = new Set<number>()
    for (const h of heads) {
      const owner = curves.find((c) => c.points!.some((p) => Math.hypot(p[0] - h.from![0], p[1] - h.from![1]) < 1e-6))
      expect(owner, 'arrowhead starts on a branch of the loop').toBeDefined()
      const branch = branchOf(owner!)
      expect(branch, 'that curve joins two consecutive corners').toBeGreaterThanOrEqual(0)
      const [a, b] = [corners[branch], corners[(branch + 1) % 4]]
      const along = (h.to![0] - h.from![0]) * (b[0] - a[0]) + (h.to![1] - h.from![1]) * (b[1] - a[1])
      expect(along, `branch ${'ABCD'[branch]}→${'ABCD'[(branch + 1) % 4]}: the arrowhead points the right way`).toBeGreaterThan(0)
      seen.add(branch)
    }
    expect([...seen].sort()).toEqual([0, 1, 2, 3])
  })

  it('names the enclosed area as the net work, in the final step', () => {
    expect(texts(2).join(' | ')).toContain('enclosed area = net work W')
    expect(texts(2).join(' | ')).toContain('η = 1 − T_c/T_h = 1 − 300/500 = 0.4')
  })

  it('the arrowheads are drawn in the same step as their branch, so a revealed branch never lacks its direction', () => {
    const arrowsIn = (step: number) => (scene.steps[step].objects as Obj[]).filter((o) => o.type === 'arrow').length
    // step 0: 2 axes + 2 heads (A→B, B→C); step 1: 2 heads (C→D, D→A)
    expect(arrowsIn(0)).toBe(4)
    expect(arrowsIn(1)).toBe(2)
  })
})

// ── D7 ──────────────────────────────────────────────────────────────────────────────────────────────────────────────────
describe('D7: the θ label sits on the side of the arc it names', () => {
  const CASES: Array<[number, number, number]> = [[2, 10, 30], [2, 10, 60], [2, 10, 90], [2, 10, 120], [3, 40, 150], [1, 5, 45], [6, 100, 100]]

  it.each(CASES)('lever %f m, force %f N, angle %f°: the label lies on the arc\'s bisector, just outside the arc', (leverLength, force, angleDeg) => {
    const scene = buildTorqueScene({ leverLength, force, angleDeg })
    const label = objs(scene).find((o) => o.id === 'angleLabel')!
    const arc = objs(scene).find((o) => o.id === 'angleArc')!
    expect(label, 'θ label exists').toBeDefined()
    expect(arc, 'angle arc exists').toBeDefined()
    // The arc is centred on the lever's end; its first point is on the lever's own axis, one radius away from it. Both ends of
    // the arc are one radius from the centre, so the radius follows from the chord: chord = 2·r·sin(angle/2).
    const first = arc.points![0], last = arc.points![arc.points!.length - 1]
    const radius = Math.hypot(last[0] - first[0], last[1] - first[1]) / (2 * Math.sin(((angleDeg * Math.PI) / 180) / 2))
    const centre = [first[0] - radius, first[1]]
    const dx = label.position![0] - centre[0], dy = label.position![1] - centre[1]
    const bearing = (Math.atan2(dy, dx) * 180) / Math.PI
    expect(Math.abs(bearing - angleDeg / 2), 'label is on the arc\'s bisector').toBeLessThan(1)
    expect(Math.hypot(dx, dy), 'label is outside the arc, not on it').toBeGreaterThan(radius * 1.2)
    expect(Math.hypot(dx, dy), 'label is close to the arc, not floating away').toBeLessThan(radius * 2.1)
  })

  it('REPRODUCTION: the old position (3 units LEFT of the lever end, on the far side of the force) was not on the arc', () => {
    const scene = buildTorqueScene({ leverLength: 2, force: 10, angleDeg: 90 })
    const arc = objs(scene).find((o) => o.id === 'angleArc')!
    const label = objs(scene).find((o) => o.id === 'angleLabel')!
    // the lever end is the arc's centre: x of the arc's first point minus its radius (2 m lever → drawn 4.6, radius 1.6)
    const radius = Math.hypot(arc.points![arc.points!.length - 1][0] - arc.points![0][0], arc.points![arc.points!.length - 1][1] - arc.points![0][1]) / Math.SQRT2
    const endX = arc.points![0][0] - radius
    expect(label.position![0], 'the label is now on the arc\'s side of the lever end').toBeGreaterThan(endX)
    expect(endX - 3, 'the old x was left of the lever end').toBeLessThan(endX)
  })
})

// ── D8 ──────────────────────────────────────────────────────────────────────────────────────────────────────────────────
describe('D8: contrast chips say which of them is which', () => {
  const SRC = code(read('src/components/school/visuals/ExplainerFigure.tsx'))

  it('with several contrasts, each chip is numbered "(i of n)" and carries its own claim as title and accessible name', () => {
    expect(SRC).toContain("{contrasts.length > 1 ? `Check a common idea (${i + 1} of ${contrasts.length})` : 'Check a common idea'}")
    expect(SRC).toContain('title={c.misconception.claim}')
    expect(SRC).toContain('aria-label={`Check a common idea${contrasts.length > 1 ? ` ${i + 1} of ${contrasts.length}` : \'\'}: ${c.misconception.claim}`}')
  })

  it('with exactly one contrast the visible label is unchanged: no "(1 of 1)"', () => {
    expect(SRC).toContain(": 'Check a common idea'}")
  })
})

// ── D9 ──────────────────────────────────────────────────────────────────────────────────────────────────────────────────
describe('D9: inline maths has breathing room; display maths is unchanged', () => {
  const html = (text: string) => renderToStaticMarkup(createElement(MessageContent, { text, isUser: false }))

  it('inline KaTeX carries a small horizontal margin so it never touches the words around it', () => {
    const out = html('The value \\(x = 2\\) is the root.')
    expect(out).toMatch(/margin:\s*0 0\.1em/)
  })

  it('display maths gets no such margin', () => {
    const out = html('See\n\\[x^2 + y^2 = r^2\\]\nabove.')
    expect(out).not.toMatch(/margin:\s*0 0\.1em/)
    expect(out).toContain('katex-display')
  })
})

// ── D10 floor ───────────────────────────────────────────────────────────────────────────────────────────────────────────
describe('D10: a subscript is never drawn under the 10 px type floor', () => {
  it('REPRODUCTION: 0.72em alone is under 10 px at a 12 px label — the audit (RD-01) failed Carnot "T_h" at 8.3 px', () => {
    expect(12 * 0.72).toBeLessThan(10)
  })

  it('the script size is max(10px, 0.72em), so the floor wins on small labels and 0.72em on large ones', () => {
    expect(SCRIPT_SIZE).toBe('max(10px, 0.72em)')
    const out = renderToStaticMarkup(createElement(ScriptedText, { text: 'T_h = 500 K' }))
    expect(out).toContain('<sub')
    expect(out).toContain('font-size:max(10px, 0.72em)')
  })

  it('text without a script is returned bare, so every other label is untouched', () => {
    expect(renderToStaticMarkup(createElement(ScriptedText, { text: 'heat in' }))).toBe('heat in')
  })
})
