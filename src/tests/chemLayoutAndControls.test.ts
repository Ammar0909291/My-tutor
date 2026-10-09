/**
 * Regression pins for the SHARED renderer/layout fixes of the 2026-10-08 Chemistry Visual Quality audit:
 *
 *  1. the placement solver's wrap-to-fit retry (labels cut off at the canvas edge on a phone);
 *  2. the per-stage layout predicate that mirrors what the renderer actually shows;
 *  3. the periodic-trend picker (Ne/Ar offered, H missing, 66 unbuildable pairs);
 *  4. contrast of the amber result colour and the playback controls (measured 2.0:1 and 1.84:1).
 *
 * Findings and numbers: docs/qa/CHEMISTRY_VISUAL_QUALITY_AUDIT.md.
 */

import { describe, expect, it } from 'vitest'
import { readFileSync } from 'node:fs'
import {
  VIEWPORTS, checkSceneLayout, placeSceneLabels, solveLabelPlacement, projectLabelBoxes, labelWrapWidth,
  fitSceneToFrame, TARGET_FRAME_FILL, type PlacementItem,
} from '@/lib/teaching/visual/layout'
import { checkSceneLayoutByStage, sceneAtStage } from '@/lib/teaching/visual/layoutStages'
import { buildCanonicalScene, CONCEPT_SCENE_OVERRIDES } from '@/lib/teaching/visual/conceptSceneParams'
import { PARAMETRIC_SCENES, rebuildScene, variablesFor } from '@/lib/teaching/visual/parametricScenes'
import { ELEMENTS } from '@/lib/teaching/sceneGenerators/periodicTrends.pure'
import { validateSceneSpec } from '@/lib/teaching/sceneSpecValidator'
import { auditChemistryScene } from '@/lib/teaching/visual/chemistryFigureAudit.pure'
import { ROLE } from '@/lib/teaching/sceneGenerators/visualDesign'

const MOBILE = VIEWPORTS[2]

// ── 1. wrap-to-fit ─────────────────────────────────────────────────────────────
describe('placement solver: wrap-to-fit retry', () => {
  const bounds = { width: 282, height: 260 }

  it('a label that cannot be placed at its natural width is retried wrapped narrower, keeping every word', () => {
    // A 259px-wide label whose centre sits 11px from the right edge: the natural box overhangs by ~120px, further
    // than the solver may move a label. Before the retry this stayed put and was cut off by the container.
    const wide: PlacementItem = { text: 'a/Vm²: adds back pressure lost to attractions', x: 270, y: 120, halfW: 129.5, halfH: 14 }
    const without = solveLabelPlacement([wide], [], bounds)
    expect(without.labels[0].ok).toBe(false)

    const withAlt = solveLabelPlacement([{ ...wide, wrapAlternatives: [{ wrapPx: 135, halfW: 67.5, halfH: 28 }] }], [], bounds)
    const placed = withAlt.labels[0]
    expect(placed.ok).toBe(true)
    expect(placed.wrapPx).toBe(135)
    expect(placed.x + 67.5).toBeLessThanOrEqual(bounds.width)           // inside the canvas
    expect(withAlt.unresolved).toBe(0)
  })

  it('a label that already places cleanly is untouched: same position, no wrapPx (existing figures are byte-identical)', () => {
    const items: PlacementItem[] = [
      { text: 'near', x: 60, y: 60, halfW: 20, halfH: 8 },
      { text: 'far', x: 200, y: 180, halfW: 20, halfH: 8 },
    ]
    const plain = solveLabelPlacement(items, [], bounds)
    const withAlts = solveLabelPlacement(items.map((i) => ({ ...i, wrapAlternatives: [{ wrapPx: 30, halfW: 15, halfH: 20 }] })), [], bounds)
    expect(withAlts.labels).toEqual(plain.labels)
    expect(withAlts.labels.every((l) => l.wrapPx === undefined)).toBe(true)
  })

  it('tries alternatives widest first and stops at the first that fits', () => {
    const item: PlacementItem = {
      text: 'x', x: 270, y: 120, halfW: 129.5, halfH: 14,
      wrapAlternatives: [{ wrapPx: 200, halfW: 100, halfH: 20 }, { wrapPx: 120, halfW: 60, halfH: 30 }],
    }
    const r = solveLabelPlacement([item], [], bounds).labels[0]
    expect(r.ok).toBe(true)
    expect(r.wrapPx).toBe(120)                       // 200 still overhangs by more than the solver may move; 120 fits
  })

  it('a label no alternative can save keeps its authored position and is reported — never hidden', () => {
    const item: PlacementItem = { text: 'x', x: 270, y: 120, halfW: 200, halfH: 14, wrapAlternatives: [{ wrapPx: 380, halfW: 190, halfH: 20 }] }
    const r = solveLabelPlacement([item], [], bounds)
    expect(r.labels[0].ok).toBe(false)
    expect(r.labels[0].x).toBe(270)
    expect(r.unresolved).toBe(1)
  })

  it('is deterministic', () => {
    const s = scene('chem.bio.nucleic-acids')
    expect(JSON.stringify(placeSceneLabels(s, MOBILE))).toBe(JSON.stringify(placeSceneLabels(s, MOBILE)))
  })

  it('the layout predicate checks the box the renderer will paint (the wrapped width), not the unwrapped one', () => {
    const s = scene('chem.poly.biodegradable')
    const placed = placeSceneLabels(sceneAtStage(s, 3, 'intermediate'), MOBILE)
    expect(placed.labels.some((l) => l.wrapPx !== undefined)).toBe(true)     // the retry is exercised on a real chemistry figure
    const natural = projectLabelBoxes(sceneAtStage(s, 3, 'intermediate'), MOBILE)
    const wrapped = placed.labels.findIndex((l) => l.wrapPx !== undefined)
    // The wrapped label's checked width is the wrap width, which is narrower than its unwrapped box.
    expect(placed.labels[wrapped].wrapPx!).toBeLessThan(natural[wrapped].right - natural[wrapped].left)
  })
})

function scene(id: string) {
  const s = buildCanonicalScene(null, id)
  if (!s) throw new Error(`no canonical scene for ${id}`)
  return s
}

// ── 2. layout, stage by stage, under the label budget ───────────────────────────
describe('every authored chemistry scene is legible at every stage and viewport', () => {
  const ids = CONCEPT_SCENE_OVERRIDES.filter((id) => id.startsWith('chem.'))

  it('finds the authored chemistry scenes (guards the enumeration)', () => {
    expect(ids.length).toBeGreaterThanOrEqual(25)
  })

  for (const level of ['beginner', 'intermediate'] as const) {
    for (const id of ids) {
      it(`${id} (${level}): no clipped or colliding label at any stage on desktop, tablet or phone`, () => {
        const bad = checkSceneLayoutByStage(scene(id), level).filter((r) => !r.ok)
        expect(bad.map((r) => `stage ${r.stage} ${r.viewport}: ${r.violations.length}`)).toEqual([])
      })
    }
  }

  it('the ADVANCED level (every label at once, by design) is the one known gap, and only on the Born–Haber cycle at phone width', () => {
    // Born–Haber has 15 labels at once; at 282px that cannot be collision-free. (Hess's Law used to be in this list too: its
    // title was anchored eight units above a ladder that only descends, so the fitted camera was zoomed out for nothing.)
    // Recorded as REVIEW_REQUIRED in the audit rather than silently tolerated: if this list changes, someone fixed
    // (or broke) something and should look.
    const failing = ids.filter((id) => checkSceneLayoutByStage(scene(id), 'advanced').some((r) => !r.ok)).sort()
    expect(failing).toEqual(['chem.thermo.bond-enthalpy'])
    for (const id of failing) {
      for (const r of checkSceneLayoutByStage(scene(id), 'advanced').filter((x) => !x.ok)) expect(r.viewport).toBe('mobile')
    }
  })

  it('the budgeted view is the renderer\'s own: at most 9 non-glyph labels at the default level', () => {
    for (const id of ids) {
      const s = scene(id)
      for (let stage = 1; stage <= s.steps.length; stage++) {
        const shown = sceneAtStage(s, stage, 'intermediate').steps[0].objects.filter((o) => o.type === 'label' && (o.text ?? '').trim().length > 2)
        expect(shown.length, `${id} stage ${stage}`).toBeLessThanOrEqual(9)
      }
    }
  })

  it('the all-labels predicate still sees the density the budget hides (it is the author-time gate)', () => {
    expect(checkSceneLayout(scene('chem.thermo.bond-enthalpy'), MOBILE).ok).toBe(false)
  })
})

// ── 3. the periodic-trend picker ────────────────────────────────────────────────
describe('periodic_trends control', () => {
  const options = (key: string) => (variablesFor('periodic_trends').find((v) => v.key === key) as { options: { value: string }[] }).options.map((o) => o.value)

  it('offers exactly the elements the generator has data for — derived, so the two cannot drift', () => {
    expect(options('element1Symbol')).toEqual(ELEMENTS.map((e) => e.symbol))
    expect(options('element2Symbol')).toEqual(ELEMENTS.map((e) => e.symbol))
  })

  it('no longer offers Ne or Ar (no electronegativity data) and now offers H (which the table has)', () => {
    const o = options('element1Symbol')
    expect(o).not.toContain('Ne')
    expect(o).not.toContain('Ar')
    expect(o).toContain('H')
  })

  it('every ordered pair of DIFFERENT offered elements builds a valid figure the chemistry audit does not fail', () => {
    const symbols = options('element1Symbol')
    let built = 0
    for (const a of symbols) {
      for (const b of symbols) {
        if (a === b) continue
        const s = rebuildScene('periodic_trends', { element1Symbol: a, element2Symbol: b })
        expect(s, `${a} vs ${b}`).not.toBeNull()
        expect(validateSceneSpec(s!).valid, `${a} vs ${b}`).toBe(true)
        expect(auditChemistryScene(s!).findings.filter((f) => f.severity === 'FAIL'), `${a} vs ${b}`).toEqual([])
        built++
      }
    }
    expect(built).toBe(symbols.length * (symbols.length - 1))
  })

  it('every choice control of every chemistry parametric kind offers only values that build (none dead but the same-element rule)', () => {
    for (const kind of ['electron_shells', 'molecule', 'lattice'] as const) {
      const entry = PARAMETRIC_SCENES[kind]
      for (const v of variablesFor(kind)) {
        if (v.kind !== 'choice') continue
        for (const opt of v.options) {
          expect(rebuildScene(kind, { ...entry.defaults, [v.key]: opt.value }), `${kind}.${v.key}=${opt.value}`).not.toBeNull()
        }
      }
    }
  })
})

// ── 4. contrast of the shared controls and result colours ───────────────────────
function lum(hex: string): number {
  const c = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4))
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]
}
const ratio = (a: string, b: string): number => {
  const [hi, lo] = [lum(a), lum(b)].sort((x, y) => y - x)
  return (hi + 0.05) / (lo + 0.05)
}

describe('contrast tokens', () => {
  const css = readFileSync('src/components/school/visuals/ExplainerFigure.module.css', 'utf8')
  const tokens = readFileSync('src/styles/tokens.css', 'utf8')

  it('the amber result text is AA on the light cards (it was #f59e0b, 2.0:1)', () => {
    const light = [...css.matchAll(/color: var\(--accent-amber, (#[0-9a-fA-F]{6})\)/g)].map((m) => m[1])
    expect(light.length).toBeGreaterThanOrEqual(3)           // .resultValue, .panelLineEmphasis, .workingResult
    for (const hex of new Set(light.slice(0, 3))) {
      expect(ratio(hex, '#FAF7EE'), `${hex} on the light cream card`).toBeGreaterThanOrEqual(4.5)
      expect(ratio(hex, '#EBEAE5'), `${hex} on the light grey card`).toBeGreaterThanOrEqual(4.5)
    }
  })

  it('the dark theme keeps a bright amber that is AA on the dark cards', () => {
    const dark = css.match(/\[data-theme='dark'\]\) \.resultValue[\s\S]*?color: var\(--accent-amber, (#[0-9a-fA-F]{6})\)/)
    expect(dark, 'a dark-theme override exists').not.toBeNull()
    expect(ratio(dark![1], '#243329')).toBeGreaterThanOrEqual(4.5)
    expect(ratio(dark![1], '#1E2B24')).toBeGreaterThanOrEqual(4.5)
  })

  it('playback controls draw their glyphs in --on-accent, which is AA on --coral in both themes', () => {
    const src = readFileSync('src/components/school/visuals/VisualPlaybackControls.tsx', 'utf8')
    expect(src).not.toMatch(/color:\s*'#fff'/)
    expect(src).toMatch(/color:\s*'var\(--on-accent, #fff\)'/)
    expect(src).toMatch(/active \? 'var\(--on-accent, #fff\)'/)
    const dark = { coral: tokens.match(/--coral:\s*(#[0-9A-Fa-f]{6})/)![1], onAccent: tokens.match(/--on-accent:\s*(#[0-9A-Fa-f]{6})/)![1] }
    expect(ratio(dark.onAccent, dark.coral)).toBeGreaterThanOrEqual(4.5)
    const lightBlock = tokens.slice(tokens.indexOf('[data-theme="light"]'))
    const light = { coral: lightBlock.match(/--coral:\s*(#[0-9A-Fa-f]{6})/)![1], onAccent: lightBlock.match(/--on-accent:\s*(#[0-9A-Fa-f]{6})/)![1] }
    expect(ratio(light.onAccent, light.coral)).toBeGreaterThanOrEqual(4.5)
  })
})

// ── 5. the complete view, the expanded floor, axes, lanes ───────────────────────
describe('the default (complete) view is checked, not just the walked stages', () => {
  it('checkSceneLayoutByStage reports a `complete` view alongside stages 1…N, at every viewport', () => {
    const s = scene('chem.thermo.bond-enthalpy')
    const reports = checkSceneLayoutByStage(s, 'intermediate')
    expect(reports.filter((r) => r.stage === 'complete').map((r) => r.viewport).sort()).toEqual(['desktop', 'mobile', 'tablet'])
    expect(reports.length).toBe((s.steps.length + 1) * VIEWPORTS.length)
  })

  it('the complete view can pick DIFFERENT labels from a walked stage: no stage is "fresh", so ties keep authored order', () => {
    // Twelve equal-priority labels, six per step, level with a budget of nine. Walking to step 2 meets step 2's labels first;
    // the complete view has no fresh stage and keeps the first nine in authored order.
    const labels = (n: number, from: number) => Array.from({ length: n }, (_, i) => ({ type: 'label' as const, text: `label ${from + i}`, position: [i, from, 0] as [number, number, number], color: ROLE.ink }))
    const synthetic = { id: 's', title: 'S', sceneType: 'diagram', steps: [{ objects: labels(6, 0) }, { objects: labels(6, 6) }] } as unknown as ReturnType<typeof scene>
    const textsOf = (v: ReturnType<typeof sceneAtStage>) => v.steps[0].objects.map((o) => o.text).sort()
    expect(textsOf(sceneAtStage(synthetic, 'complete', 'intermediate'))).not.toEqual(textsOf(sceneAtStage(synthetic, 2, 'intermediate')))
    expect(sceneAtStage(synthetic, 'complete', 'intermediate').steps[0].objects.filter((o) => o.type === 'label')).toHaveLength(9)
  })
})

describe('the energy-cycle result sentence fits ONE line on a phone (it wrapped to two and had nowhere to go)', () => {
  for (const id of ['chem.thermo.enthalpy', 'chem.thermo.bond-enthalpy']) {
    it(`${id}: no wrap at 390px, so its box is one line tall`, () => {
      const s = scene(id)
      const result = s.steps.flatMap((st) => st.objects).find((o) => /^Every path totals/.test(o.text ?? ''))!
      expect(labelWrapWidth(result.text!, MOBILE, result.size)).toBeNull()
    })
  }
})

describe('energy-cycle labels clear their arrows and a shared level is labelled once', () => {
  const HALF_BAR = 1.5
  for (const id of ['chem.thermo.enthalpy', 'chem.thermo.bond-enthalpy']) {
    const s = scene(id)
    const objs = s.steps.flatMap((st) => st.objects)
    const arrows = objs.filter((o) => o.type === 'arrow' && o.from && o.to)
    const columns = [...new Set(arrows.map((a) => a.from![0]))].sort((p, q) => p - q)
    const labels = objs.filter((o) => o.type === 'label' && /=/.test(o.text ?? ''))

    it(`${id}: the first column's step labels sit LEFT of its arrow, the others RIGHT, none across the bar`, () => {
      for (const a of arrows) {
        const x = a.from![0]
        const mid = (a.from![1] + a.to![1]) / 2
        const lab = labels.filter((l) => Math.abs(l.position![1] - mid) < 0.6).sort((p, q) => Math.abs(p.position![0] - x) - Math.abs(q.position![0] - x))[0]
        expect(lab, `step label for the arrow at x=${x}`).toBeDefined()
        const side = x === columns[0] ? -1 : 1
        expect(Math.sign(lab.position![0] - x)).toBe(side)
        expect(Math.abs(lab.position![0] - x)).toBeGreaterThan(HALF_BAR)
      }
    })

    it(`${id}: the start level (shared by every path) is labelled exactly once, centred between the columns`, () => {
      const start = objs.filter((o) => o.type === 'label' && o.text === s.steps[0].narration.replace(' is the shared starting point.', ''))
      expect(start).toHaveLength(1)
      expect(start[0].position![0]).toBeCloseTo((columns[0] + columns[columns.length - 1]) / 2, 6)
    })
  }

  it('a figure with a single path (crystal-field splitting) keeps its step label on the right', () => {
    const s = scene('chem.coord.cft')
    const a = s.steps.flatMap((st) => st.objects).find((o) => o.type === 'arrow')!
    const lab = s.steps.flatMap((st) => st.objects).find((o) => o.type === 'label' && /octahedral splitting/.test(o.text ?? ''))!
    expect(lab.position![0]).toBeGreaterThan(a.from![0] + HALF_BAR)
  })
})

describe('a 3D figure is framed with PERSPECTIVE counted, so a near atom is not pushed out of the canvas', () => {
  // Seen in Chromium at 1280 and 390px: the third H of ammonia (z = +6.4 at a fitted distance of 11.5, a 2.25x magnification) and
  // its bond ran off the top-left corner while the narration said "it bonds to 3 H atoms".
  const FOV = (50 * Math.PI) / 180
  const options = (PARAMETRIC_SCENES.molecule.variables[0] as { options: { value: string }[] }).options.map((o) => o.value)
  for (const molecule of options) {
    it(`${molecule}: every atom, bond end and label anchor projects inside the 4:3 frame`, () => {
      const s = rebuildScene('molecule', { molecule })!
      const d = s.cameraDistance!
      const halfH = Math.tan(FOV / 2) * d
      const halfW = halfH * (4 / 3)
      for (const o of s.steps.flatMap((st) => st.objects)) {
        for (const p of [o.position, o.from, o.to].filter(Boolean) as [number, number, number][]) {
          const k = d / (d - p[2])
          expect(Math.abs(p[1]) * k, `${molecule} y of ${o.id ?? o.type}`).toBeLessThanOrEqual(halfH * 1.0001)
          expect(Math.abs(p[0]) * k, `${molecule} x of ${o.id ?? o.type}`).toBeLessThanOrEqual(halfW * 1.0001)
        }
      }
    })
  }

  it('a flat scene (every point on the focal plane) is framed exactly as before: span / (2 · fill · tan)', () => {
    const flat = {
      id: 'flat', title: 't', sceneType: 'diagram', teachingGoal: 'g', cameraDistance: 40, ariaLabel: 'a',
      steps: [{ narration: 'n', objects: [
        { type: 'node', id: 'a', position: [10, 0, 0], color: '#fff', radius: 0.5, text: 'A' },
        { type: 'node', id: 'b', position: [10, 8, 0], color: '#fff', radius: 0.5, text: 'B' },
      ] }],
    } as Parameters<typeof fitSceneToFrame>[0]
    const fitted = fitSceneToFrame(flat)
    const expected = Math.round(((8 / (2 * TARGET_FRAME_FILL * Math.tan(FOV / 2))) * 10)) / 10
    expect(fitted.cameraDistance).toBe(expected)
  })
})

describe('the fullscreen/expanded scene keeps its floor', () => {
  const css = readFileSync('src/components/school/visuals/ExplainerFigure.module.css', 'utf8')
  const three = readFileSync('src/components/school/visuals/ThreeDVisual.tsx', 'utf8')

  it('`.frame:fullscreen` gives --fig-scene-h a VALID length, never `none` (min(260px, none) is invalid and drops the floor)', () => {
    const block = css.slice(css.indexOf('.frame:fullscreen {'), css.indexOf('.frame:fullscreen .body'))
    const decl = block.match(/--fig-scene-h:\s*([^;]+);/)
    expect(decl, 'the fullscreen rule sets --fig-scene-h').not.toBeNull()
    expect(decl![1].trim()).not.toBe('none')
    expect(decl![1].trim()).toMatch(/^\d+(\.\d+)?(px|vh|vw|rem|em|%)$/)
  })

  it('ThreeDVisual still derives its floor from the token (the contract this fix restores)', () => {
    expect(three).toMatch(/minHeight:\s*'min\(260px, var\(--fig-scene-h, 260px\)\)'/)
  })
})
