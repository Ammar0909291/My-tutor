/**
 * Physics visual readability gate — permanent regression coverage for every root
 * cause the 2026-10-07 render audit found (see docs/history/physics-visual-readability-gate.md).
 *
 * Each block names the MEASURED defect it closes. The browser is the final judge
 * (scripts/qa/physicsVisual/*); these tests pin the shared pieces that fixed it so
 * a refactor cannot quietly bring it back, and run the browser-free half of the
 * audit over the WHOLE physics corpus on every `vitest run`.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { resolveVisual } from '@/lib/teaching/visual/resolveVisual'
import { admitVisualAsset, makeVisualAsset } from '@/lib/teaching/visual/asset'
import { auditGraph, auditSceneData, contrastRatio, payloadBlockers, type Rgb } from '@/lib/teaching/visual/figureAudit'
import { checkFigureTexts } from '@/lib/teaching/visual/figureSemantics'
import { checkRendering } from '@/lib/teaching/visual/figureCritic'
import { cameraDistanceToContain, fitSceneToFrame, placeSceneLabels, sceneTextObjects, solveLabelPlacement, viewportFromCanvas } from '@/lib/teaching/visual/layout'
import { CHECKED_KINDS, sweepStates } from '../../scripts/qa/physicsVisual/kindChecks'
import { validateSceneSpec } from '@/lib/teaching/sceneSpecValidator'
import { stageDecorLayout } from '@/components/school/visuals/SceneStageDecor'
import { sceneBounds } from '@/components/school/visuals/SceneSpecRenderer'
import { liftToContrast, meshColor, readableTextColor, themeColor } from '@/lib/teaching/sceneGenerators/visualDesign'
import {
  buildKinematicsGraphScene, checkKinematicsConsistency, type KinematicsParams,
} from '@/lib/teaching/sceneGenerators/kinematicsGraphs.pure'
import type { SceneSpec } from '@/lib/teaching/sceneSpec'

const SURFACE = { dark: [0x24, 0x33, 0x29], light: [0xfa, 0xf7, 0xee] } as const
const rgb = (hex: string): Rgb => [parseInt(hex.slice(1, 3), 16), parseInt(hex.slice(3, 5), 16), parseInt(hex.slice(5, 7), 16)]

// ── PHYS-VIS-01 — play/replay glyph was white on chalk-yellow (1.84:1) ───────
describe('PHYS-VIS-01 playback controls use the on-accent colour', () => {
  const src = readFileSync('src/components/school/visuals/VisualPlaybackControls.tsx', 'utf8')
  const tokens = readFileSync('src/styles/tokens.css', 'utf8')
  const pick = (block: string, name: string) => new RegExp(`${name}:\\s*(#[0-9A-Fa-f]{6})`).exec(block)?.[1]
  const dark = tokens.slice(0, tokens.indexOf('[data-theme="light"]'))
  const light = tokens.slice(tokens.indexOf('[data-theme="light"]'))

  it('the glyph colour is --on-accent, never a literal white, on the coral fill', () => {
    expect(src).toMatch(/color: 'var\(--on-accent, #fff\)'/)
    expect(src).not.toMatch(/color: '#fff',\s*\n\s*background: 'var\(--coral/)
    expect(src).toMatch(/color: active \? 'var\(--on-accent, #fff\)'/)
  })
  it('--on-accent clears 3:1 (graphic) on --coral in BOTH themes, and the old white did not', () => {
    for (const block of [dark, light]) {
      const coral = rgb(pick(block, '--coral')!), on = rgb(pick(block, '--on-accent')!)
      expect(contrastRatio(on, coral)).toBeGreaterThanOrEqual(4.5)
    }
    expect(contrastRatio([255, 255, 255], rgb(pick(dark, '--coral')!))).toBeLessThan(2)
  })
})

// ── PHYS-VIS-02 — SVG card text hard-coded mid-tone hues (3.1–4.0:1) ─────────
describe('PHYS-VIS-02 2D card text is lifted to 4.5:1 on what it sits on', () => {
  it('liftToContrast keeps a passing colour and lifts a failing one toward the legible end', () => {
    const board = SURFACE.dark as unknown as Rgb
    const white: Rgb = [226, 232, 240]
    expect(liftToContrast(white, board, 4.5)).toEqual(white)
    // The ForceDiagram hues, measured 3.6 / 3.1 / 4.0 : 1 on the dark board.
    for (const hex of ['#3B82F6', '#8B5CF6', '#22A06B', '#FF6B5E']) {
      const lifted = liftToContrast(rgb(hex), board, 4.5)
      expect(contrastRatio(lifted, board), hex).toBeGreaterThanOrEqual(4.5)
      // the hue family survives: lifting only mixes toward white
      expect(lifted.every((v, i) => v >= rgb(hex)[i])).toBe(true)
    }
  })
  it('on a LIGHT backdrop it lifts toward black instead', () => {
    const paper = SURFACE.light as unknown as Rgb
    const lifted = liftToContrast(rgb('#f59e0b'), paper, 4.5)
    expect(contrastRatio(lifted, paper)).toBeGreaterThanOrEqual(4.5)
    expect(lifted.every((v, i) => v <= rgb('#f59e0b')[i])).toBe(true)
  })
  it('the shared 2D legibility owner applies it (rule 3 of useFigureLegibility)', () => {
    const src = readFileSync('src/components/school/visuals/useFigureLegibility.ts', 'utf8')
    expect(src).toMatch(/liftToContrast/)
    expect(src).toMatch(/applyTextContrast\(el\)/)
    expect(src).toMatch(/TEXT_CONTRAST_MIN = 4\.5/)
  })
})

// ── PHYS-VIS-03 — graphics under 3:1 on the light board (amber 2.0, yellow 1.8) ──
describe('PHYS-VIS-03 meshColor holds drawn graphics to 3:1; themeColor is untouched', () => {
  it('lifts exactly the non-palette hues that fall short, in the theme they fall short in', () => {
    for (const [hex, theme] of [['#f59e0b', 'light'], ['#eab308', 'light'], ['#93c5fd', 'light'], ['#64748b', 'dark']] as const) {
      const before = contrastRatio(rgb(hex), SURFACE[theme] as unknown as Rgb)
      expect(before, hex).toBeLessThan(3)
      const after = rgb(meshColor(hex, theme)!)
      expect(contrastRatio(after, SURFACE[theme] as unknown as Rgb), hex).toBeGreaterThanOrEqual(3)
    }
  })
  it('leaves a colour that already holds 3:1 byte-identical, and never touches the stored value', () => {
    expect(meshColor('#3b82f6', 'dark')).toBe(themeColor('#3b82f6', 'dark'))
    expect(themeColor('#f59e0b', 'light')).toBe('#f59e0b') // themeColor still passes foreign colours through
    expect(meshColor(undefined, 'dark')).toBeUndefined()
    expect(meshColor('var(--x)', 'dark')).toBe('var(--x)')
  })
  it('every drawn graphic in every served physics scene holds 3:1 in both themes', () => {
    const bad: string[] = []
    for (const id of physicsIds()) {
      const d = served(id)
      if (d.payload?.renderer !== 'scene') continue
      for (const o of d.payload.sceneSpec.steps.flatMap((s) => s.objects)) {
        if (o.type === 'label' || !o.color) continue
        for (const theme of ['dark', 'light'] as const) {
          const c = meshColor(o.color, theme)!
          if (!/^#[0-9a-f]{6}$/i.test(c)) continue
          if (contrastRatio(rgb(c), SURFACE[theme] as unknown as Rgb) < 3 - 1e-9) bad.push(`${id} ${o.color}->${c} (${theme})`)
        }
      }
    }
    expect(bad).toEqual([])
  }, 120_000)
  it('every scene LABEL holds 4.5:1 in both themes (ENGL-017 floor, corpus-wide)', () => {
    const bad: string[] = []
    for (const id of physicsIds()) {
      const d = served(id)
      if (d.payload?.renderer !== 'scene') continue
      for (const o of d.payload.sceneSpec.steps.flatMap((s) => s.objects)) {
        if (!o.text) continue
        for (const theme of ['dark', 'light'] as const) {
          const c = readableTextColor(themeColor(o.color ?? '#5B8DEF', theme) ?? '#5B8DEF', theme)
          if (/^#[0-9a-f]{6}$/i.test(c) && contrastRatio(rgb(c), SURFACE[theme] as unknown as Rgb) < 4.5 - 1e-9) bad.push(`${id} "${o.text}" ${c} (${theme})`)
        }
      }
    }
    expect(bad).toEqual([])
  }, 120_000)
})

// ── PHYS-VIS-04 — wide figures cropped on a phone's near-square canvas ───────
describe('PHYS-VIS-04 the camera fits the canvas the figure is actually drawn in', () => {
  const wide = (r = 0): SceneSpec => ({
    id: 'w', title: 'w', sceneType: 'diagram', cameraDistance: 20,
    steps: [{ objects: [
      { type: 'node', position: [-9, 0, 0], radius: r || undefined },
      { type: 'node', position: [9, 0, 0], radius: r || undefined },
      { type: 'arrow', from: [-9, 0, 0], to: [9, 0, 0] },
    ] }],
  })
  it('a wide figure moves FURTHER on a near-square canvas (phone 282x260) — the measured crop', () => {
    expect(cameraDistanceToContain(wide(), 282 / 260)).toBeGreaterThan(20)
  })
  it('never moves closer, and leaves a figure that fits (or a wide desktop canvas) at its own distance', () => {
    expect(cameraDistanceToContain(wide(), 566 / 368)).toBe(20)
    expect(cameraDistanceToContain(wide(), 992 / 400)).toBe(20)
    const small: SceneSpec = { ...wide(), steps: [{ objects: [{ type: 'point', position: [1, 1, 0] }] }] }
    expect(cameraDistanceToContain(small, 282 / 260)).toBe(20)
  })
  it('counts a sphere\'s radius: a big body at the edge needs more room than its centre does', () => {
    expect(cameraDistanceToContain(wide(2.5), 282 / 260)).toBeGreaterThan(cameraDistanceToContain(wide(), 282 / 260))
  })
  it('is total: a bad aspect or an empty scene returns the scene\'s own distance', () => {
    expect(cameraDistanceToContain(wide(), 0)).toBe(20)
    expect(cameraDistanceToContain(wide(), Number.NaN)).toBe(20)
    expect(cameraDistanceToContain({ ...wide(), steps: [] }, 1)).toBe(20)
  })
  it('ExplainerFigure measures the aspect for EVERY scene, not only simulations', () => {
    const src = readFileSync('src/components/school/visuals/ExplainerFigure.tsx', 'utf8')
    expect(src).toMatch(/cameraDistanceToContain\(drawn, sceneAspect\)/)
    expect(src).not.toMatch(/if \(!simulation\.active \|\| !stageEl/)
  })
})

// ── PHYS-VIS-05 — text painted ON a solid sphere (2.1:1 on the collision bodies) ──
describe('PHYS-VIS-05 a big body is labelled from just above its surface', () => {
  const at = (o: Partial<SceneSpec['steps'][number]['objects'][number]>) =>
    sceneTextObjects({ id: 's', title: 's', sceneType: 'diagram', steps: [{ objects: [{ type: 'node', position: [2, 1, 0], text: 'm1=2', ...o }] }] })[0].position
  it('a node of radius 1.4 anchors its label above the sphere, not at its centre', () => {
    const p = at({ radius: 1.4 })
    expect(p[0]).toBe(2)
    expect(p[1]).toBeGreaterThan(1 + 1.4)
  })
  it('small markers and plain labels keep their authored anchor', () => {
    expect(at({ radius: 0.2 })).toEqual([2, 1, 0])
    expect(at({ type: 'point', radius: 0.4 })).toEqual([2, 1, 0])
    expect(at({ type: 'label', radius: 3 })).toEqual([2, 1, 0])
    expect(at({ radius: undefined })).toEqual([2, 1, 0])
  })
})

// ── PHYS-VIS-06 — Kinematics graphs: three curves, no axes, no units, one scale ──
describe('PHYS-VIS-06 kinematics graphs are three readable graphs', () => {
  const P: KinematicsParams[] = [
    { initialVelocity: 0, acceleration: 2, duration: 5, initialPosition: 0 },
    { initialVelocity: -10, acceleration: 2, duration: 8, initialPosition: 0 },
    { initialVelocity: 20, acceleration: -10, duration: 4, initialPosition: 5 },
    { initialVelocity: 3, acceleration: 0, duration: 5, initialPosition: 0 },
    { initialVelocity: 20, acceleration: 10, duration: 12, initialPosition: 0 },
  ]
  const objs = (s: SceneSpec) => s.steps.flatMap((x) => x.objects)

  it('every parameter set yields axes, named axes, units and curves inside their axes', () => {
    for (const p of P) {
      const spec = buildKinematicsGraphScene(p)
      const g = auditGraph(spec)
      expect(g.isGraph).toBe(true)
      expect(g.findings, JSON.stringify(p)).toEqual([])
      const texts = objs(spec).filter((o) => o.type === 'label').map((o) => String(o.text))
      for (const unit of ['x (m)', 'v (m/s)', 'a (m/s²)']) expect(texts, unit).toContain(unit)
      expect(texts.filter((t) => t === 't (s)')).toHaveLength(3)
      // the end values are written on the axes: duration, and each panel's maximum
      expect(texts).toContain(String(p.duration))
    }
  })
  it('the old layout (three curves, no axes) fails the graph audit', () => {
    const spec = buildKinematicsGraphScene(P[0])
    const stripped: SceneSpec = { ...spec, steps: spec.steps.map((s) => ({ ...s, objects: s.objects.filter((o) => o.type !== 'arrow') })) }
    expect(auditGraph(stripped).findings.map((f) => f.id)).toContain('GR-01')
  })
  it('one time scale across the three graphs: equal times line up', () => {
    const spec = buildKinematicsGraphScene(P[0])
    const pos = objs(spec).find((o) => o.id === 'position-curve')!.points!
    const vel = objs(spec).find((o) => o.id === 'velocity-curve')!.points!
    expect(pos.map((p) => p[0])).toEqual(vel.map((p) => p[0]))
    const acc = objs(spec).find((o) => o.id === 'acceleration-curve')!.points!
    expect(acc[0][0]).toBe(pos[0][0])
    expect(acc[1][0]).toBe(pos[pos.length - 1][0])
  })
  it('a negative velocity goes visibly BELOW its time axis, a positive one above', () => {
    const spec = buildKinematicsGraphScene(P[1]) // u = -10, a = 2: v runs -10 -> +6
    const vel = objs(spec).find((o) => o.id === 'velocity-curve')!.points!
    const zeroY = objs(spec).filter((o) => o.type === 'arrow' && o.from![1] === o.to![1]).map((o) => o.from![1])
    const panelZero = zeroY.find((y) => Math.abs(y - vel[0][1]) < 7)!
    expect(vel[0][1]).toBeLessThan(panelZero)
    expect(vel[vel.length - 1][1]).toBeGreaterThan(panelZero)
  })
  it('keeps the curve ids, the teacher-written equation labels and the consistency contract', () => {
    for (const p of P) {
      const spec = buildKinematicsGraphScene(p)
      expect(checkKinematicsConsistency(spec, p), JSON.stringify(p)).toEqual({ ok: true, errors: [] })
      const ids = objs(spec).map((o) => o.id)
      expect(ids).toEqual(expect.arrayContaining(['position-curve', 'velocity-curve', 'acceleration-curve', 'position-curve-label']))
    }
    const l = objs(buildKinematicsGraphScene(P[0])).filter((o) => o.type === 'label').map((o) => o.text)
    expect(l).toContain('x–t: x = t²')
    expect(l).toContain('v–t: v = 2t')
  })
  it('the consistency checker catches a curve moved off its derived position', () => {
    const spec = buildKinematicsGraphScene(P[0])
    const bad = JSON.parse(JSON.stringify(spec)) as SceneSpec
    const c = bad.steps[0].objects.find((o) => o.id === 'position-curve')!
    c.points = c.points!.map((p) => [p[0], p[1] + 3, p[2]])
    expect(checkKinematicsConsistency(bad, P[0]).ok).toBe(false)
  })
})

// ── the graph rules themselves ───────────────────────────────────────────────
describe('auditGraph', () => {
  const axes = (extra: SceneSpec['steps'][number]['objects'] = []): SceneSpec => ({
    id: 'g', title: 'g', sceneType: 'diagram',
    steps: [{ objects: [
      { type: 'arrow', from: [0, 0, 0], to: [8, 0, 0] },
      { type: 'arrow', from: [0, 0, 0], to: [0, 5, 0] },
      { type: 'path', points: Array.from({ length: 20 }, (_, i) => [i * 0.4, 1 + 0.1 * i, 0] as [number, number, number]) },
      ...extra,
    ] }],
  })
  it('names are required on both axes', () => {
    expect(auditGraph(axes()).findings.filter((f) => f.id === 'GR-02')).toHaveLength(2)
    const named = auditGraph(axes([
      { type: 'label', position: [8.2, -0.5, 0], text: 'time (s)' },
      { type: 'label', position: [0.1, 5.4, 0], text: 'speed (m/s)' },
    ]))
    expect(named.findings).toEqual([])
  })
  it('a curve that leaves its axes is flagged; a circuit with right angles is not a graph', () => {
    const out = axes([{ type: 'label', position: [8, -1, 0], text: 'time' }, { type: 'label', position: [0, 5.4, 0], text: 'F' }])
    out.steps[0].objects[2] = { type: 'path', points: Array.from({ length: 20 }, (_, i) => [i * 0.4, 1 + 0.3 * i, 0] as [number, number, number]) }
    expect(auditGraph(out).findings.map((f) => f.id)).toContain('GR-04')
    const circuit: SceneSpec = { id: 'c', title: 'c', sceneType: 'diagram', steps: [{ objects: [
      { type: 'bond', from: [0, 0, 0], to: [6, 0, 0] }, { type: 'bond', from: [0, 0, 0], to: [0, 4, 0] },
    ] }] }
    expect(auditGraph(circuit).isGraph).toBe(false)
  })
})

// ── fail closed: ONE gate for authored, approved and generated figures ───────
describe('admitVisualAsset fails closed on a payload blocker, on every tier', () => {
  const asset = (scene: SceneSpec, provenance: 'generator' | 'engine' = 'generator') => makeVisualAsset({
    assetId: 'x', conceptId: 'phys.mech.force', conceptTitle: 'Force', representation: 'force_diagram',
    payload: { renderer: 'scene', sceneSpec: scene }, provenance,
  })
  const intent = { conceptId: 'phys.mech.force', conceptTitle: 'Force', purpose: 'explain' as const, excursion: false, returnToConceptId: null }
  const scene = (objects: SceneSpec['steps'][number]['objects']): SceneSpec => ({ id: 's', title: 'S', sceneType: 'diagram', steps: [{ objects }] })

  it('admits a clean figure', () => {
    expect(admitVisualAsset(intent, asset(scene([{ type: 'label', position: [0, 0, 0], text: 'F = ma' }]))).ok).toBe(true)
  })
  for (const [name, objects, rule] of [
    ['an internal concept id in visible text', [{ type: 'label', position: [0, 0, 0], text: 'see phys.mech.force' }], 'ST-04'],
    ['an answer key in visible text', [{ type: 'label', position: [0, 0, 0], text: 'correct="C"' }], 'ST-04'],
    ['a non-finite coordinate', [{ type: 'point', position: [Number.NaN, 0, 0] }], 'ST-07'],
    ['raw LaTeX', [{ type: 'label', position: [0, 0, 0], text: 'E = $\\frac{1}{2}mv^2$' }], 'ST-08'],
    ['an equation the figure contradicts', [{ type: 'label', position: [0, 0, 0], text: 'P = W/t = 2943 J / 12 s = 254 W' }], 'SM-01'],
  ] as const) {
    it(`refuses ${name} — for an authored AND a generated figure`, () => {
      for (const provenance of ['generator', 'engine'] as const) {
        const r = admitVisualAsset(intent, asset(scene([...objects] as unknown as SceneSpec['steps'][number]['objects']), provenance))
        expect(r.ok).toBe(false)
        if (!r.ok) {
          expect(r.reason).toBe('failed-audit')
          expect(r.detail).toContain(rule)
        }
      }
    })
  }
  it('the generated-figure critic applies the same blockers (no weaker gate for generation)', () => {
    const bad = { kind: 'scene' as const, scene: scene([{ type: 'label', position: [0, 0, 0], text: 'see phys.mech.force' }]) }
    const r = checkRendering(bad as never)
    expect(r.verdict).toBe('fail')
    expect(r.reason).toMatch(/payload blocked/)
    expect(payloadBlockers({ renderer: 'scene', sceneSpec: bad.scene }).length).toBeGreaterThan(0)
  })
})

// ── the whole corpus, browser-free ───────────────────────────────────────────
describe('every physics concept is served a figure that passes the payload gate', () => {
  it('283 concepts: graphical, admitted, no payload blocker, no self-contradicting equation, valid graphs', () => {
    const ids = physicsIds()
    expect(ids).toHaveLength(283)
    const problems: string[] = []
    for (const id of ids) {
      const d = served(id)
      if (!d.graphical || !d.payload) { problems.push(`${id}: no figure`); continue }
      const blockers = payloadBlockers(d.payload)
      if (blockers.length) problems.push(`${id}: ${blockers[0]}`)
      if (d.payload.renderer === 'scene') {
        for (const f of [...auditSceneData(d.payload.sceneSpec), ...auditGraph(d.payload.sceneSpec).findings]) {
          if (f.severity === 'FAIL') problems.push(`${id}: ${f.id} ${f.message}`)
        }
        const texts = d.payload.sceneSpec.steps.flatMap((s) => s.objects.map((o) => o.text ?? '')).filter(Boolean)
        const sem = checkFigureTexts(texts)
        if (sem.contradictions) problems.push(`${id}: ${sem.contradictions} equation contradiction(s)`)
      }
    }
    expect(problems).toEqual([])
  }, 120_000)
})

// ── PHYS-VIS-08 — labels that overlapped, were clipped, or sat on a body ──────
//   Measured at 390px: "g (m/s²)" under the 290px heading of Variation of g
//   (91 %), "G" under a 12-word caption (85 %), the electric-dipole torque and
//   net-force captions stacked on each other (60-100 %) at every slider extreme,
//   the x/y/z axis letters cut 5-10 % by the canvas edge, and "v2f=-0.33" printed
//   over a same-hue sphere at 2.3:1.
describe('PHYS-VIS-08 label placement leaves no label on another, off the canvas, or unreadable', () => {
  const SIZES: Array<[number, number, number]> = [[282, 260, 390], [560, 430, 1280]]   // canvas w, h, window w measured in Chromium

  /** The figure as a learner sees it at stage n: everything revealed so far. */
  function revealed(spec: SceneSpec): SceneSpec[] {
    const cum: SceneSpec['steps'][number]['objects'] = []
    return spec.steps.map((step) => { cum.push(...step.objects); return { ...spec, steps: [{ objects: [...cum] }] } })
  }

  it('every served physics scene, at every stage, at phone and desktop size, places every label', () => {
    const unplaced: string[] = []
    for (const id of physicsIds()) {
      const d = served(id)
      if (d.payload?.renderer !== 'scene') continue
      for (const view of revealed(d.payload.sceneSpec)) {
        for (const [w, h, bw] of SIZES) {
          const r = placeSceneLabels(view, viewportFromCanvas(w, h, bw))
          if (r.unresolved) unplaced.push(`${id} ${w}x${h}: ${r.labels.filter((l) => !l.ok).map((l) => l.text).join(' | ')}`)
        }
      }
    }
    expect(unplaced).toEqual([])
  }, 120_000)

  it('every state a learner can drive a parametric figure into places every label', () => {
    const unplaced: string[] = []
    for (const [kind, k] of Object.entries(CHECKED_KINDS)) {
      for (const params of sweepStates(kind)) {
        const typed = k.validate(k.adapt ? k.adapt(params as never) : { ...(k.fixed ?? {}), ...params })
        if (!typed) continue
        let spec: SceneSpec
        try { spec = k.build(typed as never) } catch { continue }
        if (!validateSceneSpec(spec).valid) continue
        for (const view of revealed(spec)) {
          for (const [w, h, bw] of SIZES) {
            const r = placeSceneLabels(view, viewportFromCanvas(w, h, bw))
            if (r.unresolved) unplaced.push(`${kind} ${JSON.stringify(params)} ${w}x${h}`)
          }
        }
      }
    }
    expect(unplaced).toEqual([])
  }, 240_000)

  const label = (text: string, x: number, y: number, size?: number): SceneSpec['steps'][number]['objects'][number] =>
    ({ type: 'label', text, position: [x, y, 0], ...(size ? { size } : {}) })
  const sceneOf = (objects: SceneSpec['steps'][number]['objects']): SceneSpec =>
    ({ id: 't', title: 't', sceneType: 'diagram', cameraDistance: 13, steps: [{ objects }] })

  it('no planned label box touches the canvas edge (the axis letters were cut by 0.6-1.2px)', () => {
    const vp = viewportFromCanvas(282, 260, 390)
    // Anchored right on the bottom-left corner, where the triad's letters sit.
    const r = placeSceneLabels(sceneOf([label('x', -9.5, -8.9), label('y', -9.9, -8.2), label('z', -9.9, -9.4)]), vp)
    for (const l of r.labels) {
      expect(l.ok).toBe(true)
      expect(l.y).toBeLessThanOrEqual(vp.hostHeight - 2 - 6)   // half a 10px label + the 2px inset
      expect(l.x).toBeGreaterThanOrEqual(2 + 3)
    }
  })

  it('a label that cannot clear a body is flagged so the renderer can back it with the surface colour', () => {
    const vp = viewportFromCanvas(282, 260, 390)
    const big = { type: 'node', id: 'b', position: [0, 0, 0], radius: 40, color: '#3b82f6' } as SceneSpec['steps'][number]['objects'][number]
    const r = placeSceneLabels(sceneOf([big, label('v2f=-0.33', 0, 0)]), vp)
    expect(r.labels[0].onGeometry).toBe(true)
    const free = placeSceneLabels(sceneOf([label('alone', 0, 0)]), vp)
    expect(free.labels[0].onGeometry).toBe(false)
  })

  it('a label that fits nowhere at full width is wrapped narrower rather than left on its neighbour', () => {
    // A 200x100 canvas whose left 120px is three stacked captions; a 180px-wide label
    // has no clear row anywhere, but the 80px column on the right is free.
    const left = (y: number) => ({ text: `row${y}`, x: 60, y, halfW: 56, halfH: 13 })
    const items = [left(15), left(50), left(85), {
      text: 'every word of this caption must stay on screen', x: 100, y: 50, halfW: 90, halfH: 10,
      fallbacks: [{ halfW: 36, halfH: 40, wrapPx: 72 }],
    }]
    const r = solveLabelPlacement(items, [], { width: 200, height: 100 })
    const wrapped = r.labels[3]
    expect(r.unresolved).toBe(0)
    expect(wrapped.ok).toBe(true)
    expect(wrapped.wrapPx).toBe(72)
    expect(wrapped.x - 36).toBeGreaterThanOrEqual(116)   // clear of the stacked captions on the left
  })

  it('a heading that fits nowhere steps down one tier, never below the floor, instead of overlapping', () => {
    const items = [
      { text: 'a', x: 100, y: 24, halfW: 98, halfH: 18 },
      { text: 'b', x: 100, y: 76, halfW: 98, halfH: 18 },
      { text: 'heading', x: 100, y: 50, halfW: 60, halfH: 18, fallbacks: [{ halfW: 40, halfH: 5, tier: 1 }] },
    ]
    const r = solveLabelPlacement(items, [], { width: 200, height: 100 })
    expect(r.labels[2].ok).toBe(true)
    expect(r.labels[2].tier).toBe(1)
  })

  it('a real figure that crowded its caption (galvanometer at 390px) now places every label at every stage', () => {
    const d = served('phys.em.moving-coil-galvanometer')
    if (d.payload?.renderer !== 'scene') throw new Error('expected a scene')
    for (const view of revealed(d.payload.sceneSpec)) {
      expect(placeSceneLabels(view, viewportFromCanvas(282, 260, 390)).unresolved).toBe(0)
    }
  })

  it('a label that already has room keeps its authored position (placement is strictly additive)', () => {
    const vp = viewportFromCanvas(560, 430, 1280)
    const r = placeSceneLabels(sceneOf([label('clear', 0, 2)]), vp)
    expect(r.labels[0].movedPx).toBe(0)
    expect(r.labels[0].wrapPx).toBeUndefined()
  })
})

// ── PHYS-VIS-09 — the ground plane and axis triad were cut off by the canvas ─
//   Measured on the fitted scenes of the 8 figures that draw a triad: the ground's
//   near edge projected 1.3x-2.2x past the bottom of the canvas and the triad
//   1.4x-2.0x, so the grid was a clipped sliver and most of the triad was out of
//   frame (electric dipole and torque at their slider extremes worst; LY-06 in
//   the browser audit at electric-dipole / all=max).
describe('PHYS-VIS-09 the stage decor stays inside the frame', () => {
  const HALF_TAN = Math.tan((50 * Math.PI) / 360)
  const ASPECTS = [282 / 260, 566 / 272]   // phone and desktop-column canvases, measured in Chromium

  function decorStates(): Array<{ tag: string; scene: SceneSpec }> {
    const out: Array<{ tag: string; scene: SceneSpec }> = []
    for (const id of physicsIds()) {
      const d = served(id)
      if (d.payload?.renderer === 'scene' && d.payload.sceneSpec.stage && d.payload.sceneSpec.stage.axes !== false) out.push({ tag: id, scene: d.payload.sceneSpec })
    }
    for (const kind of ['electric_dipole', 'torque_diagram', 'vector', 'electric_circuit']) {
      const k = CHECKED_KINDS[kind]
      for (const params of sweepStates(kind)) {
        const typed = k.validate(k.adapt ? k.adapt(params as never) : { ...(k.fixed ?? {}), ...params })
        if (!typed) continue
        let spec: SceneSpec
        try { spec = k.build(typed as never) } catch { continue }
        if (validateSceneSpec(spec).valid && spec.stage) out.push({ tag: `${kind} ${JSON.stringify(params)}`, scene: spec })
      }
    }
    return out
  }

  it('every figure that draws a ground and triad keeps both inside the canvas at phone and desktop shape', () => {
    const outside: string[] = []
    for (const { tag, scene } of decorStates()) {
      const fitted = fitSceneToFrame(scene)
      const objects = fitted.steps.flatMap((s) => s.objects)
      const bounds = sceneBounds(objects, fitted.cameraDistance ?? 7)
      for (const aspect of ASPECTS) {
        const d = cameraDistanceToContain({ ...fitted, steps: [{ objects }] }, aspect)
        const layout = stageDecorLayout(bounds, d, aspect)
        const half = HALF_TAN * d
        const y = (worldY: number, z: number) => Math.abs(worldY) * d / (d - z) / half
        const gridNear = y(layout.floor, layout.nearEdge)
        const triad = Math.max(y(layout.origin[1], layout.origin[2]), y(layout.origin[1], layout.origin[2] + layout.axisLen))
        // A figure whose own floor is already outside the frame cannot be helped by the decor.
        if (Math.abs(layout.floor) >= half) continue
        if (gridNear > 1.0001) outside.push(`${tag} @${aspect.toFixed(2)}: ground near edge at ${gridNear.toFixed(2)} of the frame`)
        if (triad > 1.0001) outside.push(`${tag} @${aspect.toFixed(2)}: triad at ${triad.toFixed(2)} of the frame`)
        const triadX = Math.abs(layout.origin[0]) * d / (d - layout.origin[2]) / (half * aspect)
        if (triadX > 1.0001) outside.push(`${tag} @${aspect.toFixed(2)}: triad ${triadX.toFixed(2)} of the frame's width`)
      }
    }
    expect(outside).toEqual([])
  }, 120_000)

  it('without a camera distance the layout is the original one (no figure changes shape by accident)', () => {
    const b = { minX: -5, maxX: 5, minY: -3, maxY: 3, span: 10 }
    const l = stageDecorLayout(b)
    expect(l.nearEdge).toBe(l.depth)
    expect(l.origin[0]).toBe(l.x0)
    expect(l.origin[1]).toBe(l.floor)
    expect(l.origin[2]).toBeCloseTo(l.depth * 0.72, 9)
  })

  it('a decor that already fits is left alone', () => {
    const b = { minX: -2, maxX: 2, minY: -1, maxY: 1, span: 4 }
    const far = stageDecorLayout(b, 200)
    expect(far.nearEdge).toBe(far.depth)
  })
})

// ── helpers ──────────────────────────────────────────────────────────────────
let _ids: string[] | null = null
function physicsIds(): string[] {
  if (_ids) return _ids
  const g = JSON.parse(readFileSync('docs/physics/kg/graph.json', 'utf8'))
  _ids = (Array.isArray(g) ? g : (g.concepts ?? g.nodes)).map((n: { id: string }) => n.id)
  return _ids!
}
const _cache = new Map<string, ReturnType<typeof resolveVisual>>()
function served(id: string) {
  let d = _cache.get(id)
  if (!d) {
    d = resolveVisual({ message: 'show me a diagram', lessonConceptId: id, learnerRequest: 'diagram', subject: 'physics' } as Parameters<typeof resolveVisual>[0])
    _cache.set(id, d)
  }
  return d
}
