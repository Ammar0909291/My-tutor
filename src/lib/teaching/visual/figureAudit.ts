/**
 * Figure audit — the rules that decide whether a RENDERED figure is readable.
 *
 * WHY THIS EXISTS. Every other check in the visual pipeline judges a PAYLOAD:
 * `validateSceneSpec` (shape), `layout.ts` (a model of where labels will land),
 * `figureCritic` (static + a model judge, generated figures only). None of them
 * look at what the browser actually painted, which is how a figure can be
 * schema-valid, registry-bound, resolver-served — and still show "Friction" in
 * 3.6:1 on the board, or a label hanging off the canvas on a phone.
 *
 * This module is the verdict layer for MEASUREMENTS taken from a real render
 * (`scripts/qa/physicsVisual/render.ts` drives Chromium against the real
 * resolver and the real renderers and records DOM geometry, computed styles and
 * the pixels behind every glyph). It is pure: no DOM, no I/O, no model. The
 * same rules judge authored, generated and fallback figures — there is no
 * weaker gate for any of them.
 *
 * It does not draw, move or repair anything and is not a second renderer or
 * registry; it only reads what the existing renderers produced.
 */

import { validateSceneSpec } from '@/lib/teaching/sceneSpecValidator'
import { checkFigureTexts } from '@/lib/teaching/visual/figureSemantics'
import type { SceneSpec } from '@/lib/teaching/sceneSpec'
import type { VisualPayload } from '@/lib/teaching/visual/types'

// ── thresholds (explicit, one place) ─────────────────────────────────────────

export const AUDIT_THRESHOLDS = {
  /** The engine's own readability floor (`FIGURE_TEXT_FLOOR_PX`, SceneLabel FLOOR_PX). */
  minFontPx: 10,
  /** WCAG 2.x AA, normal text — the standard ENGL-017 already holds scene labels to. */
  minContrastNormal: 4.5,
  /** WCAG 2.x AA, large text (>= 24px, or >= 18.66px bold). */
  minContrastLarge: 3,
  /** WCAG 1.4.11 non-text contrast, for graphics that carry meaning. */
  minContrastGraphic: 3,
  /** A glyph box must be (almost) wholly inside the region that paints it. */
  minVisibleFraction: 0.98,
  /** Two text boxes overlap when the shared area is this share of the smaller box. */
  textOverlapShare: 0.12,
  /** …and at least this many px² (sub-pixel kerning is not a collision). */
  textOverlapMinPx2: 6,
  /** Share of a label's box covered by something that is not its backdrop. */
  inkOverLabelFail: 0.38,
  inkOverLabelReview: 0.22,
  /** Minimum drawn area for a scene to count as "something is there". */
  minSceneInkFraction: 0.003,
  /** Geometry touching the canvas edge: share of the 2px border that is ink. */
  edgeInkFail: 0.02,
  /** WCAG 2.2 target size minimum (px). */
  minTargetPx: 24,
  /** A scene host smaller than this on either axis is collapsed. */
  minSceneBoxPx: 120,
} as const

export type Severity = 'FAIL' | 'REVIEW'
export type Dimension =
  | 'structural' | 'readability' | 'contrast' | 'layout' | 'graph' | 'semantic' | 'interactive'

export interface Finding {
  id: string
  dimension: Dimension
  severity: Severity
  message: string
  evidence?: Record<string, unknown>
}

export type Verdict = 'PASS' | 'FAIL' | 'REVIEW_REQUIRED'

export function rollup(findings: readonly Finding[]): Verdict {
  if (findings.some((f) => f.severity === 'FAIL')) return 'FAIL'
  if (findings.some((f) => f.severity === 'REVIEW')) return 'REVIEW_REQUIRED'
  return 'PASS'
}

// ── measurement shapes (what the browser run records) ───────────────────────

export interface Box { x: number; y: number; w: number; h: number }

export interface AuditText {
  text: string
  region: 'scene-label' | 'svg-text' | 'chrome'
  box: Box
  lines: Box[]
  /** The parts of `lines` that are painted (inside every clipping ancestor). */
  visibleLines: Box[]
  /** Part of a button / input / link — its own content, not free-standing text. */
  inControl: boolean
  /** Inside a disabled control: WCAG exempts it from contrast. */
  inDisabled: boolean
  fontPx: number
  weight: string
  color: string
  visibleFraction: number
  outsideViewportX: boolean
  truncated: boolean
}

export interface AuditPixelText {
  contrast: number
  contrastWorst: number
  inkFraction: number
}

export interface AuditScenePixels {
  w: number
  h: number
  inkFraction: number
  edgeInkFraction: number
  edgeInkPx: number
  inkBox: Box | null
  meanInkContrast: number
}

export interface AuditControl { tag: string; type: string; name: string; box: Box; disabled: boolean }

export interface AuditMeasure {
  renderer: string | null
  noFigure: boolean
  hasCanvas: boolean
  horizontalOverflow: boolean
  frameRect: Box
  sceneRect: Box | null
  texts: AuditText[]
  controls: AuditControl[]
  emptyBadges: number
  overflowing: Array<{ tag: string; cls: string; box: Box }>
}

export interface AuditState {
  measure: AuditMeasure
  pixels: { texts: Array<AuditPixelText | null>; scene: AuditScenePixels | null }
  missingGlyphs: string[]
}

// ── small helpers ────────────────────────────────────────────────────────────

export type Rgb = [number, number, number]

function lum([r, g, b]: Rgb): number {
  const f = (v: number) => { const s = v / 255; return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4 }
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b)
}

/** WCAG relative-luminance contrast ratio, 1..21. */
export function contrastRatio(a: Rgb, b: Rgb): number {
  const [hi, lo] = [lum(a), lum(b)].sort((p, q) => q - p)
  return (hi + 0.05) / (lo + 0.05)
}

/** WCAG "large text": >= 24px, or >= 18.66px at weight 700+. */
export function isLargeText(fontPx: number, weight: string | number): boolean {
  const w = typeof weight === 'number' ? weight : Number(weight) || (weight === 'bold' ? 700 : 400)
  return fontPx >= 24 || (fontPx >= 18.66 && w >= 700)
}

function area(b: Box): number { return b.w * b.h }

function intersection(a: Box, b: Box): number {
  const w = Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x)
  const h = Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y)
  return w > 0 && h > 0 ? w * h : 0
}

/** Overlap between the PAINTED parts of two (possibly wrapped) texts. */
function textIntersection(a: AuditText, b: AuditText): { px2: number; share: number } {
  let px2 = 0
  for (const la of a.visibleLines) for (const lb of b.visibleLines) px2 += intersection(la, lb)
  const smaller = Math.min(
    a.visibleLines.reduce((s, l) => s + area(l), 0),
    b.visibleLines.reduce((s, l) => s + area(l), 0),
  )
  return { px2, share: smaller > 0 ? px2 / smaller : 0 }
}

/** A single axis-triad letter drawn by the stage decor, not authored teaching text. */
const isDecorAxisLetter = (t: AuditText) => t.region === 'scene-label' && /^[xyz]$/i.test(t.text.trim())

/**
 * Raw LaTeX in text a renderer draws as plain characters. (Single definition:
 * `figureCritic` re-exports it, so the generated-figure critic and the audit
 * cannot disagree about what counts.)
 */
const LATEX_MARKERS = /\\(?:frac|sqrt|cdot|times|alpha|beta|gamma|theta|pi|mu|Delta|sum|int)\b|\$[^$]+\$|\\\(|\\\[/

export function containsRawLatex(text: string): boolean {
  return LATEX_MARKERS.test(text)
}

/** Text that must never reach a learner (internal ids, debug leakage, placeholders). */
const FORBIDDEN_TEXT: Array<[string, RegExp]> = [
  ['internal-id', /\b(?:phys|math|chem|bio|cs|eng)\.[a-z0-9_-]+\.[a-z0-9_.-]+\b/i],
  ['internal-id', /\b(?:generator|registry|scene):[\w:.-]+/i],
  // JS stringification leaks. "null point" and "at infinity" are physics, so
  // `null` is not a leak word and `Infinity` only counts as the capitalised JS value.
  ['debug', /\b(?:undefined|NaN)\b|\[object \w+\]|(?<![A-Za-z])-?Infinity(?![A-Za-z])/],
  ['debug', /\b(?:TODO|FIXME|lorem ipsum|placeholder|debug|TBD|XXX)\b/i],
  ['debug', /\{\{|\}\}|\$\{/],
  ['answer-key', /\b(?:answerIndex|isCorrect|correctIndex|answer\s*key)\b|\bcorrect\s*=\s*["']/i],
]

export function forbiddenTextHits(text: string): string[] {
  const out: string[] = []
  for (const [kind, re] of FORBIDDEN_TEXT) if (re.test(text)) out.push(kind)
  return [...new Set(out)]
}

// ── render-level rules ───────────────────────────────────────────────────────

/**
 * Judge ONE rendered state of ONE figure at ONE viewport and theme. Every rule
 * is a pure predicate over the measurement; thresholds live in AUDIT_THRESHOLDS.
 */
export function auditRenderedState(s: AuditState, opts: { expectsScene: boolean }): Finding[] {
  const T = AUDIT_THRESHOLDS
  const out: Finding[] = []
  const m = s.measure
  const add = (f: Finding) => out.push(f)

  // ── structural ──────────────────────────────────────────────────────────────
  if (m.noFigure) {
    add({ id: 'ST-01', dimension: 'structural', severity: 'FAIL', message: 'the resolver served a figure but the page rendered none' })
    return out
  }
  if (opts.expectsScene) {
    if (!m.hasCanvas || !m.sceneRect) {
      add({ id: 'ST-02', dimension: 'structural', severity: 'FAIL', message: 'no canvas was rendered for a scene figure' })
    } else if (m.sceneRect.w < T.minSceneBoxPx || m.sceneRect.h < T.minSceneBoxPx) {
      add({ id: 'ST-02', dimension: 'structural', severity: 'FAIL', message: `scene host collapsed to ${Math.round(m.sceneRect.w)}x${Math.round(m.sceneRect.h)}px`, evidence: { sceneRect: m.sceneRect } })
    }
    if (s.pixels.scene && s.pixels.scene.inkFraction < T.minSceneInkFraction) {
      const labelled = m.texts.some((t) => t.region === 'scene-label')
      add({
        id: 'ST-03', dimension: 'structural', severity: labelled ? 'REVIEW' : 'FAIL',
        message: labelled
          ? `the canvas holds text only, no drawn geometry (ink ${(s.pixels.scene.inkFraction * 100).toFixed(2)}%)`
          : `nothing is drawn in the canvas (ink ${(s.pixels.scene.inkFraction * 100).toFixed(2)}%)`,
        evidence: { ink: s.pixels.scene.inkFraction },
      })
    }
  }
  if (m.emptyBadges > 0) {
    add({ id: 'ST-06', dimension: 'structural', severity: 'FAIL', message: `${m.emptyBadges} empty badge/chip rendered` })
  }
  for (const t of m.texts) {
    const hits = forbiddenTextHits(t.text)
    if (hits.length) {
      add({ id: 'ST-04', dimension: 'structural', severity: 'FAIL', message: `text "${t.text.slice(0, 50)}" looks like ${hits.join('/')} leakage`, evidence: { text: t.text, hits } })
    }
    if (containsRawLatex(t.text)) {
      add({ id: 'ST-08', dimension: 'structural', severity: 'FAIL', message: `raw LaTeX printed as text: "${t.text.slice(0, 50)}"`, evidence: { text: t.text } })
    }
  }
  if (s.missingGlyphs.length) {
    add({ id: 'ST-05', dimension: 'structural', severity: 'FAIL', message: `glyphs with no font coverage (render as boxes): ${s.missingGlyphs.join(' ')}`, evidence: { glyphs: s.missingGlyphs } })
  }

  // ── readability + contrast, per text ────────────────────────────────────────
  m.texts.forEach((t, i) => {
    const px = s.pixels.texts[i]
    const hidden = t.visibleLines.length === 0
    if (hidden) {
      // Painted entirely outside its clipping box: the learner cannot read it at all.
      add({
        id: 'RD-05', dimension: 'readability', severity: isDecorAxisLetter(t) ? 'REVIEW' : 'FAIL',
        message: `"${t.text.slice(0, 40)}" is placed entirely outside the visible canvas`,
        evidence: { text: t.text, region: t.region, decor: isDecorAxisLetter(t) },
      })
      return
    }
    if (t.fontPx < T.minFontPx - 0.05) {
      add({ id: 'RD-01', dimension: 'readability', severity: 'FAIL', message: `"${t.text.slice(0, 40)}" renders at ${t.fontPx.toFixed(1)}px (< ${T.minFontPx}px)`, evidence: { text: t.text, fontPx: t.fontPx, region: t.region } })
    }
    if (t.visibleFraction < T.minVisibleFraction) {
      add({ id: 'RD-02', dimension: 'readability', severity: 'FAIL', message: `"${t.text.slice(0, 40)}" is clipped (${Math.round(t.visibleFraction * 100)}% visible)`, evidence: { text: t.text, visible: t.visibleFraction, region: t.region } })
    }
    if (t.truncated) {
      add({ id: 'RD-03', dimension: 'readability', severity: 'FAIL', message: `"${t.text.slice(0, 40)}" is truncated by its container`, evidence: { text: t.text } })
    }
    if (px && !t.inDisabled) {
      // A symbol glyph on a control (▶ ↺) is a graphic, held to 3:1 (WCAG 1.4.11).
      const glyphOnly = t.inControl && !/[A-Za-z0-9]/.test(t.text)
      const need = glyphOnly || isLargeText(t.fontPx, t.weight) ? T.minContrastLarge : T.minContrastNormal
      if (px.contrast < need) {
        add({ id: 'CT-01', dimension: 'contrast', severity: 'FAIL', message: `"${t.text.slice(0, 40)}" has ${px.contrast.toFixed(2)}:1 against its backdrop (needs ${need}:1)`, evidence: { text: t.text, contrast: px.contrast, need, region: t.region, color: t.color } })
      }
      // Ink over a label: something that is not the backdrop runs through it.
      if (t.region !== 'chrome' && px.inkFraction >= T.inkOverLabelFail) {
        add({ id: 'LY-02', dimension: 'layout', severity: 'FAIL', message: `"${t.text.slice(0, 40)}" sits on drawn geometry (${Math.round(px.inkFraction * 100)}% of its box)`, evidence: { text: t.text, ink: px.inkFraction } })
      } else if (t.region !== 'chrome' && px.inkFraction >= T.inkOverLabelReview) {
        add({ id: 'LY-02', dimension: 'layout', severity: 'REVIEW', message: `"${t.text.slice(0, 40)}" overlaps drawn geometry (${Math.round(px.inkFraction * 100)}% of its box)`, evidence: { text: t.text, ink: px.inkFraction } })
      }
    }
  })

  // ── layout ──────────────────────────────────────────────────────────────────
  for (let i = 0; i < m.texts.length; i++) {
    for (let j = i + 1; j < m.texts.length; j++) {
      const { px2, share } = textIntersection(m.texts[i], m.texts[j])
      if (px2 >= T.textOverlapMinPx2 && share >= T.textOverlapShare) {
        add({
          id: 'LY-01', dimension: 'layout', severity: 'FAIL',
          message: `"${m.texts[i].text.slice(0, 30)}" overlaps "${m.texts[j].text.slice(0, 30)}" (${Math.round(share * 100)}% of the smaller)`,
          evidence: { a: m.texts[i].text, b: m.texts[j].text, share, px2 },
        })
      }
    }
  }
  if (m.horizontalOverflow) {
    add({ id: 'LY-03', dimension: 'layout', severity: 'FAIL', message: 'the page scrolls horizontally with this figure on it' })
  }
  if (m.overflowing.length) {
    add({ id: 'LY-04', dimension: 'layout', severity: 'FAIL', message: `${m.overflowing.length} element(s) extend past the figure's box`, evidence: { first: m.overflowing[0] } })
  }
  if (m.sceneRect) {
    for (const c of m.controls) {
      if (intersection(c.box, m.sceneRect) > 4) {
        add({ id: 'LY-05', dimension: 'layout', severity: 'FAIL', message: `control "${c.name}" covers the canvas`, evidence: { control: c.name } })
      }
    }
    for (const t of m.texts) {
      if (t.region === 'chrome' && t.visibleLines.some((l) => intersection(l, m.sceneRect!) > T.textOverlapMinPx2)) {
        add({ id: 'LY-07', dimension: 'layout', severity: 'FAIL', message: `frame text "${t.text.slice(0, 30)}" sits over the canvas`, evidence: { text: t.text } })
      }
    }
  }
  // A control's text is its own; an overlap between a control and OTHER text is a collision.
  for (const c of m.controls) {
    for (const t of m.texts) {
      // Text that belongs to a control (its label, its icon glyph) is that control's own content.
      if (t.inControl || t.text === c.name) continue
      if (c.box.w * c.box.h > 0 && t.visibleLines.some((l) => intersection(l, c.box) > 0.4 * area(l)) && !t.text.includes(c.name) && !c.name.includes(t.text)) {
        add({ id: 'LY-05', dimension: 'layout', severity: 'FAIL', message: `control "${c.name}" overlaps text "${t.text.slice(0, 30)}"`, evidence: { control: c.name, text: t.text } })
      }
    }
  }
  if (s.pixels.scene && s.pixels.scene.edgeInkFraction > T.edgeInkFail) {
    add({ id: 'LY-06', dimension: 'layout', severity: 'FAIL', message: `drawing is cut off at the canvas edge (${(s.pixels.scene.edgeInkFraction * 100).toFixed(1)}% of the border is ink)`, evidence: { edgeInk: s.pixels.scene.edgeInkFraction } })
  }
  for (const c of m.controls) {
    if (!c.disabled && (c.box.w < T.minTargetPx || c.box.h < T.minTargetPx) && c.type !== 'range') {
      add({ id: 'LY-08', dimension: 'layout', severity: 'REVIEW', message: `control "${c.name}" is ${Math.round(c.box.w)}x${Math.round(c.box.h)}px (< ${T.minTargetPx}px target)`, evidence: { control: c.name } })
    }
  }
  return out
}

// ── data-level structural rules (the SceneSpec itself) ──────────────────────

/** Structure of the payload, independent of any browser. */
export function auditSceneData(spec: SceneSpec): Finding[] {
  const out: Finding[] = []
  const v = validateSceneSpec(spec)
  if (!v.valid) {
    for (const e of v.errors.slice(0, 6)) {
      out.push({ id: 'ST-07', dimension: 'structural', severity: 'FAIL', message: `${e.path}: ${e.message}`, evidence: { path: e.path } })
    }
  }
  const ids = new Set<string>()
  for (const st of spec.steps) for (const o of st.objects) if (o.id) ids.add(o.id)
  spec.steps.forEach((st, i) => {
    for (const f of st.focus ?? []) {
      if (!ids.has(f)) out.push({ id: 'ST-10', dimension: 'structural', severity: 'FAIL', message: `steps[${i}].focus names "${f}", which no object carries (broken reference)`, evidence: { focus: f } })
    }
    for (const o of st.objects) {
      if (typeof o.text === 'string' && o.text.trim() === '' && o.type === 'label') {
        out.push({ id: 'ST-11', dimension: 'structural', severity: 'FAIL', message: 'a label object has empty text' })
      }
      if (typeof o.text === 'string' && forbiddenTextHits(o.text).length) {
        out.push({ id: 'ST-04', dimension: 'structural', severity: 'FAIL', message: `scene text "${o.text.slice(0, 40)}" looks like leakage`, evidence: { text: o.text } })
      }
    }
  })
  return out
}


// ── the admission gate's view: blockers a payload carries by itself ──────────

/**
 * The reasons a payload must not reach a learner, decidable from the payload
 * ALONE (no browser). This is what `admitVisualAsset` calls, for every tier —
 * curated, generator, approved and generated — so a generated figure meets
 * exactly the bar an authored one does.
 *
 *   scene  malformed structure (NaN / Infinity / missing endpoints / broken
 *          focus references), empty labels, internal-id / debug / answer-key
 *          leakage, raw LaTeX, and an equation the figure contradicts itself on
 *   spec   the same leakage and LaTeX rules over its title, axis names, steps
 *   card   nothing: a card's content is source code, not data
 *
 * Whether the picture is READABLE once drawn (clipping, overlap, contrast) can
 * only be known by drawing it; that is `auditRenderedState`, enforced in CI by
 * the render audit — a figure that fails it cannot merge.
 */
export function payloadBlockers(payload: VisualPayload): string[] {
  const out: string[] = []
  if (payload.renderer === 'scene') {
    for (const f of auditSceneData(payload.sceneSpec)) if (f.severity === 'FAIL') out.push(`${f.id} ${f.message}`)
    const texts = [payload.sceneSpec.title, ...payload.sceneSpec.steps.flatMap((s) => s.objects.map((o) => o.text ?? ''))].filter(Boolean)
    for (const t of texts) if (containsRawLatex(t)) out.push(`ST-08 raw LaTeX in "${t.slice(0, 40)}"`)
    const sem = checkFigureTexts(payload.sceneSpec.steps.flatMap((s) => s.objects.map((o) => o.text ?? '')).filter(Boolean))
    for (const r of sem.results) for (const c of r.contradictions) out.push(`SM-01 "${r.text.slice(0, 50)}": ${c.reason}`)
  } else if (payload.renderer === 'spec') {
    const spec = payload.visualSpec as unknown as Record<string, unknown>
    const strings: string[] = []
    for (const k of ['title', 'xLabel', 'yLabel']) if (typeof spec[k] === 'string') strings.push(spec[k] as string)
    if (Array.isArray(spec.steps)) {
      for (const st of spec.steps as Array<{ title?: unknown; note?: unknown }>) {
        if (typeof st.title === 'string') strings.push(st.title)
        if (typeof st.note === 'string') strings.push(st.note)
      }
    }
    for (const t of strings) {
      const hits = forbiddenTextHits(t)
      if (hits.length) out.push(`ST-04 "${t.slice(0, 40)}" looks like ${hits.join('/')} leakage`)
      if (containsRawLatex(t)) out.push(`ST-08 raw LaTeX in "${t.slice(0, 40)}"`)
    }
  }
  return out
}

// ── graph validation (axes, labels, the curve itself) ───────────────────────

type P3 = [number, number, number]

/** Perpendicular distance from `p` to the segment a→b, and where along it (0..len) the foot falls. */
function alongAxis(p: P3, a: P3, b: P3): { perp: number; t: number; len: number } {
  const len = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1
  const ux = (b[0] - a[0]) / len, uy = (b[1] - a[1]) / len
  const dx = p[0] - a[0], dy = p[1] - a[1]
  return { perp: Math.abs(dx * uy - dy * ux), t: dx * ux + dy * uy, len }
}

/**
 * Is this scene a graph, and if so is it a USABLE one?
 *
 * A graph is declared the way every authored plot declares one: two ARROWS from
 * one origin, one horizontal and one vertical (the `axes()` pattern), plus a
 * densely sampled curve spanning most of the horizontal axis — or any scene
 * that declares itself `sceneType: 'plot'`. (Circuits, field-line figures and
 * force diagrams also contain perpendicular segments; arrows from a shared
 * origin with a curve across them is what separates a graph from those.)
 *
 *   GR-01  a plot has two axes (a curve on no axes cannot be read, only seen)
 *   GR-02  each axis is NAMED — a label with a letter beside its tip or along it
 *   GR-04  the plotted curve stays inside the axes it is drawn against
 *
 * Measured motivation: the Kinematics graphs figure drew position, velocity and
 * acceleration as three curves normalised to one box with NO axes, NO units and
 * NO scale — three coloured lines and a corner of equations. None of the
 * payload validators object to that; GR-01 does.
 */
export function auditGraph(spec: SceneSpec): { isGraph: boolean; findings: Finding[] } {
  const objs = spec.steps.flatMap((s) => s.objects)
  const arrows = objs.filter((o) => (o.type === 'arrow' || o.type === 'vector') && o.from && o.to)
  type Arrow = (typeof arrows)[number]
  // EVERY axis pair — a figure may hold several graphs (panels), and a curve is
  // judged against the pair it is drawn on, not against whichever came first.
  // A pair is a horizontal and a vertical ARROW whose lines CROSS at the start of
  // the horizontal (the y-axis stands at the time axis's origin), wherever along
  // the vertical that is: a displacement axis runs above and below its baseline.
  const horizontals = arrows.filter((a) => Math.abs((a.to as P3)[1] - (a.from as P3)[1]) <= 0.05 && Math.abs((a.to as P3)[0] - (a.from as P3)[0]) >= 3)
  const verticals = arrows.filter((a) => Math.abs((a.to as P3)[0] - (a.from as P3)[0]) <= 0.05 && Math.abs((a.to as P3)[1] - (a.from as P3)[1]) >= 3)
  const pairs: Array<{ h: Arrow; v: Arrow }> = []
  for (const h of horizontals) {
    const hf = h.from as P3
    for (const v of verticals) {
      const vf = v.from as P3, vt = v.to as P3
      const crossesAtStart = Math.abs(vf[0] - hf[0]) <= 0.35
      const within = hf[1] >= Math.min(vf[1], vt[1]) - 0.35 && hf[1] <= Math.max(vf[1], vt[1]) + 0.35
      if (crossesAtStart && within) pairs.push({ h, v })
    }
  }
  // The extent of an axis drawn in several arrows (an up half and a down half).
  const box = (pr: { h: Arrow; v: Arrow }) => {
    const hf = pr.h.from as P3, ht = pr.h.to as P3, vf = pr.v.from as P3, vt = pr.v.to as P3
    const xs: number[] = [hf[0], ht[0]], ys: number[] = [vf[1], vt[1]]
    for (const a of verticals) {
      const f = a.from as P3, t = a.to as P3
      if (Math.abs(f[0] - vf[0]) > 0.05) continue
      const lo = Math.min(f[1], t[1]), hi = Math.max(f[1], t[1])
      if (hi >= Math.min(...ys) - 0.35 && lo <= Math.max(...ys) + 0.35) ys.push(f[1], t[1])
    }
    return { x0: Math.min(...xs), x1: Math.max(...xs), y0: Math.min(...ys), y1: Math.max(...ys) }
  }
  const curves = objs.filter((o) => (o.type === 'path' || o.type === 'trajectory') && (o.points?.length ?? 0) >= 12)
  // A plotted curve spans most of one pair's horizontal axis AND starts on it.
  const plotted: Array<{ c: (typeof curves)[number]; pair: (typeof pairs)[number] }> = []
  for (const c of curves) {
    const pts = c.points as P3[]
    const xs = pts.map((p) => p[0]), ys = pts.map((p) => p[1])
    const cx = (Math.min(...xs) + Math.max(...xs)) / 2, cy = (Math.min(...ys) + Math.max(...ys)) / 2
    let best: (typeof pairs)[number] | null = null
    let bestD = Infinity
    for (const pr of pairs) {
      const b = box(pr)
      if (Math.max(...xs) - Math.min(...xs) < 0.4 * (b.x1 - b.x0)) continue
      // the curve's centre must sit within the axes' box — padded generously BELOW
      // (an oscillation drawn on an axis that stops at its baseline dips under it
      // and is still that graph) and barely ABOVE (a curve higher than the axes is
      // some other panel's)
      const h = Math.max(b.y1 - b.y0, 1)
      if (cx < b.x0 - 1 || cx > b.x1 + 1 || cy < b.y0 - 0.6 * h || cy > b.y1 + 0.15 * h) continue
      const d = Math.hypot(cx - (b.x0 + b.x1) / 2, cy - (b.y0 + b.y1) / 2)
      if (d < bestD) { bestD = d; best = pr }
    }
    if (best) plotted.push({ c, pair: best })
  }
  const isGraph = spec.sceneType === 'plot' || plotted.length > 0
  const out: Finding[] = []
  if (!isGraph) return { isGraph: false, findings: out }
  if (pairs.length === 0) {
    out.push({ id: 'GR-01', dimension: 'graph', severity: 'FAIL', message: 'a graph is drawn with no pair of axes (no scale, no meaning for position)' })
    return { isGraph, findings: out }
  }
  const labels = objs.filter((o) => o.type === 'label' && o.position && /[A-Za-zα-ωΔ]/.test(o.text ?? ''))
  const named = (axis: Arrow) => {
    const a = axis.from as P3, b = axis.to as P3
    return labels.some((l) => {
      const { perp, t, len } = alongAxis(l.position as P3, a, b)
      // beside the tip, or alongside the axis (under / left of it)
      return perp <= 2.4 && t >= -2.5 && t <= len + 4
    })
  }
  const checked = new Set<(typeof pairs)[number]>()
  const TOL = 1.0
  for (const { c, pair } of plotted) {
    if (!checked.has(pair)) {
      checked.add(pair)
      if (!named(pair.h)) out.push({ id: 'GR-02', dimension: 'graph', severity: 'FAIL', message: 'the horizontal axis has no name beside it' })
      if (!named(pair.v)) out.push({ id: 'GR-02', dimension: 'graph', severity: 'FAIL', message: 'the vertical axis has no name beside it' })
    }
    const b = box(pair)
    const pts = c.points as P3[]
    const xs = pts.map((p) => p[0]), ys = pts.map((p) => p[1])
    if (Math.min(...xs) < b.x0 - TOL || Math.max(...xs) > b.x1 + TOL || Math.min(...ys) < b.y0 - TOL || Math.max(...ys) > b.y1 + TOL) {
      out.push({ id: 'GR-04', dimension: 'graph', severity: 'FAIL', message: 'a plotted curve leaves the axes it is drawn against', evidence: { id: c.id } })
    }
  }
  return { isGraph, findings: out }
}
