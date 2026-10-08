/**
 * figureAudit — the verdict rules over a RENDERED figure's measurements. The
 * measurements are synthetic here (the real ones come from a Chromium run,
 * scripts/qa/physicsVisual/render.ts); what is under test is that each rule
 * fires on the defect it was written for and stays quiet on an honest figure.
 */
import { describe, it, expect } from 'vitest'
import {
  AUDIT_THRESHOLDS as T, auditRenderedState, auditSceneData, contrastRatio, forbiddenTextHits, isLargeText, rollup,
  type AuditState, type AuditText, type Box,
} from '@/lib/teaching/visual/figureAudit'
import type { SceneSpec } from '@/lib/teaching/sceneSpec'

const box = (x: number, y: number, w: number, h: number): Box => ({ x, y, w, h })

function text(over: Partial<AuditText> & { text: string }): AuditText {
  const b = over.box ?? box(20, 20, 60, 14)
  return {
    region: 'scene-label', lines: [b], visibleLines: [b], inControl: false, inDisabled: false,
    fontPx: 12, weight: '700', color: 'rgb(255,255,255)', visibleFraction: 1, outsideViewportX: false, truncated: false,
    box: b, ...over,
  }
}

function state(texts: AuditText[], px?: Array<{ contrast?: number; ink?: number } | null>, extra: Partial<AuditState['measure']> = {}, scene?: Partial<NonNullable<AuditState['pixels']['scene']>>): AuditState {
  return {
    measure: {
      renderer: 'scene', noFigure: false, hasCanvas: true, horizontalOverflow: false,
      frameRect: box(0, 0, 316, 900), sceneRect: box(17, 60, 282, 260),
      texts, controls: [], emptyBadges: 0, overflowing: [], ...extra,
    },
    pixels: {
      texts: texts.map((_, i) => {
        const p = px?.[i]
        return p === null ? null : { contrast: p?.contrast ?? 9, contrastWorst: p?.contrast ?? 9, inkFraction: p?.ink ?? 0 }
      }),
      scene: { w: 282, h: 260, inkFraction: 0.05, edgeInkFraction: 0, edgeInkPx: 0, inkBox: box(10, 10, 200, 150), meanInkContrast: 3, ...scene },
    },
    missingGlyphs: [],
  }
}

const ids = (fs: ReturnType<typeof auditRenderedState>, sev?: string) => fs.filter((f) => !sev || f.severity === sev).map((f) => f.id)

describe('contrast arithmetic', () => {
  it('matches the WCAG reference values', () => {
    expect(contrastRatio([0, 0, 0], [255, 255, 255])).toBeCloseTo(21, 5)
    expect(contrastRatio([119, 119, 119], [255, 255, 255])).toBeCloseTo(4.48, 1)
  })
  it('large text is >= 24px, or >= 18.66px bold', () => {
    expect(isLargeText(24, '400')).toBe(true)
    expect(isLargeText(18.7, '700')).toBe(true)
    expect(isLargeText(18.7, '400')).toBe(false)
    expect(isLargeText(14, '700')).toBe(false)
  })
})

describe('an honest figure passes', () => {
  it('readable, separated, inside its canvas', () => {
    const fs = auditRenderedState(state([text({ text: 'F = −kx' }), text({ text: 'x', box: box(150, 80, 8, 14) })]), { expectsScene: true })
    expect(fs).toEqual([])
    expect(rollup(fs)).toBe('PASS')
  })
})

describe('readability', () => {
  it('flags text below the 10px floor', () => {
    const fs = auditRenderedState(state([text({ text: 'tiny', fontPx: 9 })]), { expectsScene: true })
    expect(ids(fs, 'FAIL')).toContain('RD-01')
  })
  it('flags a label that is partly clipped, and one that is wholly outside the canvas', () => {
    const part = auditRenderedState(state([text({ text: 'A label', visibleFraction: 0.66 })]), { expectsScene: true })
    expect(ids(part, 'FAIL')).toContain('RD-02')
    const gone = auditRenderedState(state([text({ text: 'Peak (~20 m)', visibleLines: [] })]), { expectsScene: true })
    expect(ids(gone, 'FAIL')).toContain('RD-05')
  })
  it('treats a hidden axis-triad letter as review-only, not as lost teaching text', () => {
    const fs = auditRenderedState(state([text({ text: 'z', visibleLines: [] })]), { expectsScene: true })
    expect(ids(fs, 'FAIL')).not.toContain('RD-05')
    expect(ids(fs, 'REVIEW')).toContain('RD-05')
  })
  it('flags truncation by a container', () => {
    expect(ids(auditRenderedState(state([text({ text: 'v: [L T⁻¹]', truncated: true })]), { expectsScene: true }), 'FAIL')).toContain('RD-03')
  })
})

describe('contrast', () => {
  it('fails normal text under 4.5:1 and passes large text at 3:1', () => {
    expect(ids(auditRenderedState(state([text({ text: 'Friction' })], [{ contrast: 3.6 }]), { expectsScene: true }), 'FAIL')).toContain('CT-01')
    expect(ids(auditRenderedState(state([text({ text: 'BIG', fontPx: 26, weight: '400' })], [{ contrast: 3.4 }]), { expectsScene: true }), 'FAIL')).not.toContain('CT-01')
  })
  it('holds a control glyph to 3:1 and exempts a disabled control', () => {
    const glyph = text({ text: '▶', inControl: true, region: 'chrome', fontPx: 14 })
    expect(ids(auditRenderedState(state([glyph], [{ contrast: 1.84 }]), { expectsScene: true }), 'FAIL')).toContain('CT-01')
    expect(ids(auditRenderedState(state([glyph], [{ contrast: 3.4 }]), { expectsScene: true }), 'FAIL')).not.toContain('CT-01')
    const disabled = text({ text: 'Pause', inControl: true, inDisabled: true, region: 'chrome' })
    expect(ids(auditRenderedState(state([disabled], [{ contrast: 2.06 }]), { expectsScene: true }), 'FAIL')).not.toContain('CT-01')
  })
})

describe('layout', () => {
  it('flags two labels on top of each other, but not labels that only touch', () => {
    const a = text({ text: 'm1=2', box: box(20, 20, 40, 14) })
    const overlap = text({ text: 'u1=3', box: box(30, 22, 40, 14) })
    expect(ids(auditRenderedState(state([a, overlap]), { expectsScene: true }), 'FAIL')).toContain('LY-01')
    const apart = text({ text: 'u1=3', box: box(60, 20, 40, 14) })
    expect(ids(auditRenderedState(state([a, apart]), { expectsScene: true }), 'FAIL')).not.toContain('LY-01')
  })
  it('judges overlap on what is PAINTED: a clipped-away label collides with nothing', () => {
    const under = text({ text: 'Situation', region: 'chrome', box: box(20, 20, 60, 14) })
    const hiddenX = text({ text: 'x', box: box(30, 20, 8, 14), visibleLines: [] })
    expect(ids(auditRenderedState(state([under, hiddenX]), { expectsScene: true }), 'FAIL')).not.toContain('LY-01')
  })
  it('a control\'s own label is not an overlap with that control', () => {
    const own = text({ text: '▶', inControl: true, region: 'chrome', box: box(40, 400, 12, 12) })
    const s = state([own], [{ contrast: 9 }], { controls: [{ tag: 'button', type: '', name: 'Replay', box: box(30, 392, 30, 30), disabled: false }] })
    expect(ids(auditRenderedState(s, { expectsScene: true }), 'FAIL')).not.toContain('LY-05')
    const stranger = text({ text: 'Applied', region: 'chrome', box: box(40, 400, 30, 12) })
    const s2 = state([stranger], [{ contrast: 9 }], { controls: [{ tag: 'button', type: '', name: 'Replay', box: box(30, 392, 30, 30), disabled: false }] })
    expect(ids(auditRenderedState(s2, { expectsScene: true }), 'FAIL')).toContain('LY-05')
  })
  it('flags geometry cut off at the canvas edge (ENGL-016/inelastic-collision pattern)', () => {
    const fs = auditRenderedState(state([text({ text: 'm1=2' })], undefined, {}, { edgeInkFraction: 0.153 }), { expectsScene: true })
    expect(ids(fs, 'FAIL')).toContain('LY-06')
  })
  it('flags a label sitting on drawn geometry, review before fail', () => {
    expect(ids(auditRenderedState(state([text({ text: 'a' })], [{ ink: 0.25 }]), { expectsScene: true }), 'REVIEW')).toContain('LY-02')
    expect(ids(auditRenderedState(state([text({ text: 'a' })], [{ ink: 0.5 }]), { expectsScene: true }), 'FAIL')).toContain('LY-02')
  })
  it('flags horizontal page overflow and children leaving the figure', () => {
    const fs = auditRenderedState(state([text({ text: 'ok' })], undefined, { horizontalOverflow: true, overflowing: [{ tag: 'table', cls: '', box: box(0, 0, 500, 20) }] }), { expectsScene: true })
    expect(ids(fs, 'FAIL')).toEqual(expect.arrayContaining(['LY-03', 'LY-04']))
  })
})

describe('structural', () => {
  it('a collapsed or empty canvas fails; a text-only canvas is a review, not a pass', () => {
    expect(ids(auditRenderedState(state([text({ text: 'a' })], undefined, { sceneRect: box(0, 0, 80, 60) }), { expectsScene: true }), 'FAIL')).toContain('ST-02')
    expect(ids(auditRenderedState(state([], undefined, {}, { inkFraction: 0 }), { expectsScene: true }), 'FAIL')).toContain('ST-03')
    expect(ids(auditRenderedState(state([text({ text: 'a' })], undefined, {}, { inkFraction: 0 }), { expectsScene: true }), 'REVIEW')).toContain('ST-03')
  })
  it('flags debug / id / key leakage and raw LaTeX in visible text', () => {
    for (const bad of ['phys.mech.force', 'NaN m/s', 'correct="C"', 'generator:phys.x:null', 'undefined']) {
      expect(ids(auditRenderedState(state([text({ text: bad })]), { expectsScene: true }), 'FAIL'), bad).toContain('ST-04')
    }
    expect(ids(auditRenderedState(state([text({ text: 'E = $\\frac{1}{2}mv^2$' })]), { expectsScene: true }), 'FAIL')).toContain('ST-08')
  })
  it('ordinary physics words do not trip the leakage filter', () => {
    for (const ok of ['null point', 'F = ma', 'kinetic energy', 'Hooke\'s law', 'v = u + at']) {
      expect(forbiddenTextHits(ok).length, ok).toBe(0)
    }
  })
  it('missing glyphs fail', () => {
    const s = state([text({ text: 'x' })])
    s.missingGlyphs = ['ₑ']
    expect(ids(auditRenderedState(s, { expectsScene: true }), 'FAIL')).toContain('ST-05')
  })
})

describe('auditSceneData — payload-level blockers', () => {
  const base = (objects: SceneSpec['steps'][number]['objects'], extra: Partial<SceneSpec['steps'][number]> = {}): SceneSpec => ({
    id: 't', title: 'T', sceneType: 'diagram', steps: [{ objects, ...extra }],
  })
  it('a clean scene has no findings', () => {
    expect(auditSceneData(base([{ type: 'arrow', id: 'a', from: [0, 0, 0], to: [1, 0, 0], text: 'F' }]))).toEqual([])
  })
  it('a non-finite coordinate is a failure', () => {
    const fs = auditSceneData(base([{ type: 'point', position: [Number.NaN, 0, 0] }]))
    expect(fs.some((f) => f.severity === 'FAIL')).toBe(true)
  })
  it('a focus id that names nothing is a broken reference', () => {
    const fs = auditSceneData(base([{ type: 'point', id: 'p', position: [0, 0, 0] }], { focus: ['ghost'] }))
    expect(fs.map((f) => f.id)).toContain('ST-10')
  })
  it('an empty label and a leaked internal id are failures', () => {
    expect(auditSceneData(base([{ type: 'label', position: [0, 0, 0], text: '  ' }])).map((f) => f.id)).toContain('ST-11')
    expect(auditSceneData(base([{ type: 'label', position: [0, 0, 0], text: 'see phys.mech.force' }])).map((f) => f.id)).toContain('ST-04')
  })
})

describe('thresholds are the documented ones', () => {
  it('pins the numbers a reviewer would quote', () => {
    expect(T.minFontPx).toBe(10)
    expect(T.minContrastNormal).toBe(4.5)
    expect(T.minContrastLarge).toBe(3)
  })
})
