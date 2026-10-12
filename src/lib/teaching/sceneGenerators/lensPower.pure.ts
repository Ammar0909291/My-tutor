/**
 * Lens power and lens combinations — the figure `phys.opt.lens-power` never had.
 *
 * THE GAP THIS CLOSES. The concept was served the shared single-lens ray diagram
 * (the `ray_optics` instance also served for `phys.opt.lenses`): a correct figure,
 * but of a different claim. The KG node ("The power of a lens is the reciprocal of
 * focal length in metres; combined lenses have powers that add algebraically"), the
 * Educational Brain entry (Core Understanding, Mental Models stages 2-3) and the
 * blueprint (Level 2) all teach TWO relationships — P = 1/f in dioptres, and
 * P_total = P₁ + P₂ for thin lenses in contact — and the single-lens figure showed
 * neither. `scope.ts` had demoted it ("one lens; P = P1 + P2 needs a combination")
 * and the 2026-10-08 semantic review left it REVIEW_REQUIRED for the same reason.
 *
 * WHAT THIS IS NOT. Not a new engine and not a new renderer: a plain SceneSpec built
 * from the primitives SceneSpecRenderer already paints, resolved through the same
 * CONCEPT_SCENES → admission → contract path as `vectorProducts.ts`. No LLM, no
 * network, no randomness.
 *
 * ── THE NUMBERS ARE THE EDUCATIONAL BRAIN'S OWN ────────────────────────────
 * f = 0.50 m → P = +2 D (the EB's "f = 0.5 m → P = +2 D" row); and a +5 D lens with a
 * −2 D lens in contact → +3 D (the EB's "P = +5 D and P = −2 D → P_total = +3 D").
 * Nothing is invented.
 *
 * ── CORRECT BY CONSTRUCTION ─────────────────────────────────────────────────
 * Every ray is COMPUTED from the power it claims: a parallel ray at height h leaves a
 * thin lens of power P with slope −h·P/SCALE, so it crosses the axis at f = 1/P metres
 * (SCALE scene units per metre) — never eyeballed. For the pair, the outgoing slope is
 * the slope after the +5 D lens, plus what the −2 D lens adds, which is exactly the
 * slope of a single +3 D lens: that is what "powers add" means, and it is the picture.
 * `src/tests/physicsCardSemantics.test.ts` re-derives each printed power from the
 * drawn ray geometry.
 *
 * ── THE LIMIT IS SAID, NOT HIDDEN — AND CAN BE TRIED ────────────────────────
 * P₁ + P₂ holds for THIN lenses IN CONTACT; the EB's "Why Students Fail" #3 names
 * separated lenses as the error. The last step says so, and the learner can move
 * the lenses apart (`gap`, default 0 = in contact): the rays are then TRACED lens
 * by lens (nothing is assumed to add), the printed power becomes the one the EB
 * gives for separated thin lenses, P = P₁ + P₂ − d·P₁P₂, and the point where the
 * sum rule WOULD have put the focus is drawn beside where the rays really cross.
 *
 * ── INTERACTION (2026-10-12) ────────────────────────────────────────────────
 * This is the PURE half and the single source of truth: `PARAMETRIC_SCENES.lens_power`
 * re-runs `buildLensPowerScene(params)` when a learner moves a control, so every
 * ray, every focus and every printed number is derived from the same four
 * parameters (single-lens power, the two powers, the gap) by the same code. Each
 * control states its consequence (P = 1/f; powers add at d = 0; diverging is
 * negative) — none is decoration.
 *
 * Authoring rules (physicsPilot.ts): shared palette, labels are names not sentences,
 * steps are cumulative so no annotation contradicts a later step, coordinates inside
 * ±5, every narration under 220 characters.
 */

import type { SceneObject, SceneSpec, Vec3 } from '../sceneSpec'
import { ROLE, curve, dot, label, line } from './visualDesign'
import { strictNumber, type ConsistencyResult } from './shared'
import { pickLabelSpot, type PlacedLabel } from './labelSpots'

/** Scene units per metre of focal length, so f = 0.50 m spans 3 units. */
const SCALE = 6
/** The x of the (thin) lens plane in both rows (the pair is centred on it when apart). */
const X0 = -2.2
/** The optical axes of the two rows. */
const Y_SINGLE = 2.2
const Y_PAIR = -2.2
/** Height of the two parallel rays above / below each axis. */
const RAY_H = 0.7
/** Half-height of a lens symbol, and the half-thickness of its widest point. */
const LENS_HALF_HEIGHT = 1.1
const LENS_T = 0.22
/** The picture ends here on the left (rays enter) and on the right (rays are cut). */
const X_LEFT = -4.6
const X_RIGHT = 4.4
/** Outgoing rays stop here (or earlier, where they would leave their row). */
const OUT_END = 2.6
/** A row's rays never stray further than this from their own axis, so the two rows never touch. */
const RAY_CLIP = 1.9

/** The powers shown by default, in dioptres. The single lens, then the pair in contact. */
const P_SINGLE = 2
const P_FIRST = 5
const P_SECOND = -2

export interface LensPowerParams {
  /** Power of the single lens in row 1 (D). Negative = diverging. */
  singlePower: number
  /** Power of the first lens of the pair (D). */
  firstPower: number
  /** Power of the second lens of the pair (D). */
  secondPower: number
  /** Distance between the two lenses (m). 0 = in contact, the case the addition rule is for. */
  gap: number
}

export const LENS_POWER_DEFAULTS: LensPowerParams = { singlePower: P_SINGLE, firstPower: P_FIRST, secondPower: P_SECOND, gap: 0 }

/** The ranges a learner may move through (also the validator's bounds). */
export const LENS_POWER_LIMITS = {
  singlePower: { min: -4, max: 6 },
  firstPower: { min: -4, max: 8 },
  secondPower: { min: -4, max: 8 },
  gap: { min: 0, max: 0.2 },
} as const

export function validateLensPowerParams(raw: unknown): LensPowerParams | null {
  if (!raw || typeof raw !== 'object') return null
  const o = raw as Record<string, unknown>
  const out = {
    singlePower: strictNumber(o.singlePower), firstPower: strictNumber(o.firstPower),
    secondPower: strictNumber(o.secondPower), gap: strictNumber(o.gap ?? 0),
  }
  for (const k of Object.keys(LENS_POWER_LIMITS) as Array<keyof typeof LENS_POWER_LIMITS>) {
    const v = out[k]
    if (!Number.isFinite(v) || v < LENS_POWER_LIMITS[k].min || v > LENS_POWER_LIMITS[k].max) return null
  }
  return out
}

const round = (n: number) => Math.round(n * 1000) / 1000
/** Signed number with at most one decimal, "−" for minus: +2, −2, +2.5. */
const signed = (n: number) => `${n > 0 ? '+' : n < 0 ? '−' : ''}${Math.abs(Math.round(n * 10) / 10)}`
const fmt = (n: number) => (Math.round(n * 100) / 100).toFixed(2)
/** A focal length in metres from a power; ∞ for a plate. Negative for a diverging lens. */
const focalText = (p: number) => (Math.abs(p) < 1e-9 ? '∞' : `${p < 0 ? '−' : ''}${fmt(1 / Math.abs(p))}`)

/** The power of two thin lenses a distance `d` (m) apart: P₁ + P₂ − d·P₁·P₂ (d = 0 → the plain sum). */
export function combinedPower(p1: number, p2: number, d: number): number {
  return p1 + p2 - d * p1 * p2
}

/**
 * The figure's own parameters at the defaults, exported so the regression test can re-derive the
 * geometry independently instead of restating the numbers it is checking.
 */
export const LENS_POWER_PARAMS = {
  scale: SCALE, x0: X0, ySingle: Y_SINGLE, yPair: Y_PAIR, rayHeight: RAY_H,
  pSingle: P_SINGLE, pFirst: P_FIRST, pSecond: P_SECOND, pTotal: P_FIRST + P_SECOND,
} as const

/**
 * A parallel ray at height `h` traced through two thin lenses (the second may be absent: power 0),
 * `gapUnits` apart. Nothing is assumed to add: the ray is bent at each lens by -y·P/SCALE.
 */
function traceRay(h: number, p1: number, p2: number, gapUnits: number) {
  const s1 = -(h * p1) / SCALE
  const y2 = h + s1 * gapUnits
  const s2 = s1 - (y2 * p2) / SCALE
  return { s1, y2, s2 }
}

interface RowGeometry {
  /** x of the first and of the second lens plane. */
  x1: number
  x2: number
  /** The traced upper ray (h = +RAY_H) — the lower one is its mirror image. */
  y2: number
  s1: number
  s2: number
  /** Where the outgoing rays stop. */
  xEnd: number
  /** x where the outgoing rays cross the axis, when that is a REAL focus in view. */
  focusX: number | null
}

function rowGeometry(p1: number, p2: number, gap: number): RowGeometry {
  const gapUnits = gap * SCALE
  const x1 = X0 - gapUnits / 2
  const x2 = X0 + gapUnits / 2
  const { s1, y2, s2 } = traceRay(RAY_H, p1, p2, gapUnits)
  let xEnd = OUT_END
  if (Math.abs(s2) > 1e-9) {
    const target = s2 > 0 ? RAY_CLIP : -RAY_CLIP
    xEnd = Math.min(OUT_END, Math.max(x2 + 0.4, x2 + (target - y2) / s2))
  }
  let focusX: number | null = null
  if (Math.abs(s2) > 1e-9) {
    const x = x2 - y2 / s2
    if (x > x2 + 0.05 && x <= OUT_END) focusX = round(x)
  }
  return { x1, x2, y2, s1, s2, xEnd, focusX }
}

/** The y of the upper traced ray at x (after the second lens). */
const yAfter = (g: RowGeometry, x: number) => g.y2 + g.s2 * (x - g.x2)

function incoming(id: string, yAxis: number, h: number, xTo: number): SceneObject {
  return { ...line([X_LEFT, round(yAxis + h), 0], [round(xTo), round(yAxis + h), 0], ROLE.input, 0.04), id }
}

/** The ray between two lenses (absent when they are in contact). */
function between(id: string, yAxis: number, sign: 1 | -1, g: RowGeometry, h: number): SceneObject {
  return { ...line([round(g.x1), round(yAxis + sign * h), 0], [round(g.x2), round(yAxis + sign * g.y2), 0], ROLE.output, 0.04), id }
}

function outgoing(id: string, yAxis: number, sign: 1 | -1, g: RowGeometry, color: string = ROLE.output): SceneObject {
  return {
    ...line([round(g.x2), round(yAxis + sign * g.y2), 0], [round(g.xEnd), round(yAxis + sign * yAfter(g, g.xEnd)), 0], color, 0.04),
    id,
  }
}

/**
 * A thin lens as the textbook symbol: a biconvex outline (converging, +) or a
 * biconcave one (diverging, −). Densely sampled, as `curve()` requires.
 */
function lensOutline(id: string, cx: number, yAxis: number, converging: boolean): SceneObject {
  const n = 14
  const edge = (side: 1 | -1) => Array.from({ length: n + 1 }, (_, i) => {
    const u = -1 + (2 * i) / n
    const half = converging ? LENS_T * (1 - u * u) : 0.05 + (LENS_T - 0.05) * u * u
    return [round(cx + side * half), round(yAxis + LENS_HALF_HEIGHT * u), 0] as Vec3
  })
  const right = edge(1)
  const left = edge(-1).reverse()
  return { ...curve([...right, ...left], ROLE.reference), id }
}

/** Is this power a converging lens? (0 is a flat plate: drawn as the thinnest converging symbol is wrong, so it is drawn plain.) */
const converging = (p: number) => p > 0

/** The focus dot, only where the rays really cross, in view. */
function focusDot(id: string, yAxis: number, x: number | null, color: string, r: number): SceneObject[] {
  return x === null ? [] : [{ ...dot([x, yAxis, 0], color, r), id }]
}

/**
 * The upper ray after the FIRST lens alone, planted at x1: where its own power would take it. A converging lens's ray
 * stops at that lens's focus (drawn as F₁); a diverging one just continues, clipped to its row.
 */
function aloneRay(p1: number, x1: number): { xTo: number; yTo: number; focusX: number | null } | null {
  if (Math.abs(p1) < 1e-9) return null
  const s = -(RAY_H * p1) / SCALE
  const focus = p1 > 0 ? x1 + SCALE / p1 : null
  const target = s > 0 ? RAY_CLIP : -RAY_CLIP
  const clip = x1 + (target - RAY_H) / s
  const xTo = Math.min(OUT_END, Math.max(x1 + 0.4, focus !== null && focus <= OUT_END ? focus : clip))
  return { xTo: round(xTo), yTo: round(RAY_H + s * (xTo - x1)), focusX: focus !== null && focus <= OUT_END ? round(focus) : null }
}


/**
 * The safety-net second derivation (as every generator has): re-derive each power from the DRAWN rays — the slope of a
 * ray at height h leaving a thin lens of power P is −h·P/SCALE — and compare it with the powers the parameters (and so the
 * printed labels) claim. A label that disagrees with the geometry fails here, whichever of the two moved.
 */
export function checkLensPowerConsistency(spec: SceneSpec, params: LensPowerParams): ConsistencyResult {
  const errors: string[] = []
  const objs = spec.steps.flatMap((st) => st.objects) as Array<SceneObject & { id?: string; from?: Vec3; to?: Vec3 }>
  const find = (id: string) => objs.find((o) => o.id === id)
  const powerOf = (id: string, sign: 1 | -1) => {
    const r = find(id)
    if (!r?.from || !r.to) return null
    const slope = (r.to[1] - r.from[1]) / (r.to[0] - r.from[0])
    return (-slope * SCALE) / (sign * RAY_H)
  }
  const near = (a: number | null, b: number, what: string) => {
    if (a === null) errors.push(`${what}: the ray is not drawn`)
    else if (Math.abs(a - b) > 0.02) errors.push(`${what}: the drawn ray has power ${a.toFixed(3)} D, the figure says ${b} D`)
  }
  near(powerOf('ray-single-out-upper', 1), params.singlePower, 'single lens (upper ray)')
  near(powerOf('ray-single-out-lower', -1), params.singlePower, 'single lens (lower ray)')
  const total = combinedPower(params.firstPower, params.secondPower, params.gap)
  near(powerOf('ray-pair-out-upper', 1), total, 'the pair (upper ray)')
  near(powerOf('ray-pair-out-lower', -1), total, 'the pair (lower ray)')
  if (Math.abs(params.firstPower) > 1e-9) near(powerOf('ray-first-alone', 1), params.firstPower, 'the first lens alone')
  // every printed "… D" number must be one of the powers the figure is built from
  const allowed = [params.singlePower, params.firstPower, params.secondPower, total, params.firstPower + params.secondPower]
  for (const o of objs) {
    if (o.type !== 'label' || !o.text) continue
    for (const m of o.text.replace(/−/g, '-').matchAll(/(?:^|[^\w₁₂])([+-]?\d+(?:\.\d+)?)\s*D\b/g)) {
      const v = Number(m[1])
      if (!allowed.some((a) => Math.abs(a - v) < 0.051)) errors.push(`label "${o.text}" prints ${v} D, which no power in the figure has`)
    }
  }
  return { ok: errors.length === 0, errors }
}

const DEFAULT_SCENE_PARAMS = LENS_POWER_DEFAULTS

/** The figure for a set of powers. Called with no argument it is the canonical textbook case. */
export function buildLensPowerScene(params: LensPowerParams = DEFAULT_SCENE_PARAMS): SceneSpec {
  const { singlePower: pS, firstPower: p1, secondPower: p2, gap } = params
  const pTotal = combinedPower(p1, p2, gap)
  const apart = gap > 1e-9
  const naive = p1 + p2

  const single = rowGeometry(pS, 0, 0)
  // A strong or diverging lens throws its rays up and out through the usual label spots; its names go at the left, over the incoming rays.
  const leftStack = pS < 0 || pS >= 4
  const pair = rowGeometry(p1, p2, gap)
  const alone = aloneRay(p1, pair.x1)
  // The pair's two outgoing rays (and, apart, the stretch between the lenses): what the step-3 labels must stay clear of.
  const pairSegments: Array<[[number, number], [number, number]]> = []
  for (const sign of [1, -1] as const) {
    pairSegments.push([[pair.x2, Y_PAIR + sign * pair.y2], [pair.xEnd, Y_PAIR + sign * yAfter(pair, pair.xEnd)]])
    pairSegments.push([[pair.x1, Y_PAIR + sign * RAY_H], [pair.x2, Y_PAIR + sign * pair.y2]])
  }
  const pairResultText = apart ? `P = ${signed(pTotal)} D` : `P₁ + P₂ = ${signed(pTotal)} D`
  const pairFocalText = Math.abs(pTotal) < 1e-9 ? 'f = ∞' : `f = ${focalText(pTotal)} m`
  // The labels already standing from step 2 (the two lens powers), and the first of the two step-3 labels, are not to be landed on.
  const standing: PlacedLabel[] = [{ at: [-3.5, -0.85], text: `${signed(p1)} D` }, { at: [-1.75, -3.8], text: `${signed(p2)} D` }]
  const pairResultAt = pickLabelSpot([[3.3, -0.5], [3.3, -3.95], [-3.1, -4.2], [3.3, -2.2], [0.5, -4.25]], pairResultText, pairSegments, standing)
  const pairFocalAt = pickLabelSpot([[0.7, -3.85], [-3.1, -3.95], [3.3, -3.95], [0.7, -0.55], [-0.5, -4.3], [3.3, -2.2]], pairFocalText, pairSegments, [...standing, { at: pairResultAt, text: pairResultText }])
  const pairResultSpot: Vec3 = [pairResultAt[0], pairResultAt[1], 0]
  const pairFocalSpot: Vec3 = [pairFocalAt[0], pairFocalAt[1], 0]

  const lensX1 = apart ? pair.x1 : X0 - LENS_T
  const lensX2 = apart ? pair.x2 : X0 + LENS_T
  const result = `${signed(pTotal)} D`
  const pairName = apart ? 'P = P₁ + P₂ − d·P₁P₂' : 'P = P₁ + P₂'
  const dTxt = `${Math.round(gap * 100)} cm`

  const legend: Array<{ label: string; color: string; shape: 'line' | 'dot' }> = [
    { label: 'Parallel ray in', color: ROLE.input, shape: 'line' },
    { label: 'Ray out', color: ROLE.output, shape: 'line' },
    { label: 'First lens alone', color: ROLE.aid, shape: 'line' },
    { label: 'Focus', color: ROLE.result, shape: 'dot' },
  ]

  const step1Narr = Math.abs(pS) < 1e-9
    ? 'A flat plate does not bend rays: its focal length is infinite, and P = 1/f = 0 dioptres. Power is the reciprocal of f in METRES.'
    : pS > 0
      ? `Power is the reciprocal of the focal length in METRES: P = 1/f. This lens meets parallel rays ${focalText(pS)} m behind it, so P = 1/${focalText(pS)} = ${signed(pS)} dioptres. Shorter f means more power.`
      : `Power is 1/f with f in METRES. This DIVERGING lens spreads parallel rays as if they came from a point ${fmt(1 / -pS)} m in front of it: f = ${focalText(pS)} m, so P = ${signed(pS)} D. Diverging is negative.`

  const word = (p: number) => (p > 0 ? 'converging' : p < 0 ? 'diverging' : 'flat')
  const step2Narr =
    `Now two thin lenses${apart ? `, ${dTxt} apart` : ' in contact'}: a ${word(p1)} ${signed(p1)} D lens (f = ${focalText(p1)} m) and a ` +
    `${word(p2)} ${signed(p2)} D lens (f = ${focalText(p2)} m). Each has its own power; diverging is negative.`

  const step3Narr = apart
    ? `Apart by d = ${dTxt}, the sum rule fails: P = P₁ + P₂ − d·P₁P₂ = ${signed(pTotal)} D, not ${signed(naive)} D. The addition rule is for lenses in CONTACT (d = 0).`
    : Math.abs(pTotal) < 1e-9
      ? `Together ${signed(p1)} + (${signed(p2)}) = 0 D: the pair bends the rays like a flat plate, so they leave parallel (f = ∞). Powers add, focal lengths do not. (Thin lenses in contact only.)`
      : `Together they bend the rays like ONE lens of power ${signed(p1)} + (${signed(p2)}) = ${signed(pTotal)} D, so f = 1/${signed(pTotal).replace('+', '')} = ${focalText(pTotal)} m. Powers add, focal lengths do not. (Thin lenses in contact only.)`

  const lines = [
    'P = 1/f   (f in metres)',
    Math.abs(pS) < 1e-9 ? 'P = 0 D → f = ∞ (a flat plate)' : `f = ${focalText(pS)} m → P = ${signed(pS)} D`,
    `f₁ = ${focalText(p1)} m → ${signed(p1)} D;  f₂ = ${focalText(p2)} m → ${signed(p2)} D`,
    apart
      ? `P = ${signed(p1)} + (${signed(p2)}) − ${Math.round(gap * 100) / 100}·(${signed(p1)})(${signed(p2)}) = ${signed(pTotal)} D  (sum rule: ${signed(naive)} D)`
      : Math.abs(pTotal) < 1e-9
        ? `P = ${signed(p1)} + (${signed(p2)}) = 0 D → f = ∞`
        : `P = ${signed(p1)} + (${signed(p2)}) = ${signed(pTotal)} D → f = ${focalText(pTotal)} m`,
  ]

  return {
    id: 'phys-lens-power',
    title: 'Lens power: P = 1/f, and powers add',
    sceneType: 'comparison',
    cameraDistance: 13,
    teachingGoal:
      'Power is P = 1/f with f in metres (dioptres); for thin lenses in contact the powers add, ' +
      'P = P₁ + P₂ — the focal lengths do not. Apart, they do not.',
    ariaLabel:
      `Two rows on the same scale. Top: one ${word(pS)} lens of power ${signed(pS)} dioptres, focal length ${focalText(pS)} metres. ` +
      `Bottom: a ${word(p1)} lens of ${signed(p1)} dioptres and a ${word(p2)} lens of ${signed(p2)} dioptres ${apart ? `${dTxt} apart` : 'in contact'}. ` +
      `${apart ? 'The sum rule does not hold apart: ' : 'The powers add: '}together ${signed(pTotal)} dioptres, focal length ${focalText(pTotal)} metres.`,
    explainer: {
      result: { expression: pairName, value: result },
      legend: apart ? [...legend, { label: 'Where P₁ + P₂ would put it', color: ROLE.aid, shape: 'dot' }] : legend,
      panels: [
        {
          heading: "What's happening?",
          body:
            'A lens bends parallel rays to a focus f metres away; its power is P = 1/f, in dioptres (D). ' +
            'Two thin lenses IN CONTACT bend the rays like one lens whose power is the SUM of theirs; apart, they do not.',
        },
        {
          heading: apart ? 'Apart, the sum rule fails' : 'Powers add, focal lengths do not',
          lines,
          emphasis: lines[3],
        },
      ],
    },
    steps: [
      {
        narration: step1Narr,
        objects: [
          line([X_LEFT, Y_SINGLE, 0], [X_RIGHT, Y_SINGLE, 0], ROLE.reference, 0.025),
          ...(Math.abs(pS) < 1e-9 ? [] : [lensOutline('lens-single', X0, Y_SINGLE, converging(pS))]),
          incoming('ray-single-in-upper', Y_SINGLE, RAY_H, single.x1),
          incoming('ray-single-in-lower', Y_SINGLE, -RAY_H, single.x1),
          outgoing('ray-single-out-upper', Y_SINGLE, 1, single),
          outgoing('ray-single-out-lower', Y_SINGLE, -1, single),
          ...focusDot('focus-single', Y_SINGLE, single.focusX, ROLE.result, 0.1),
          // A diverging lens throws its rays up and out through the usual spot, so its focal length is named at the left, over the incoming rays.
          label(Math.abs(pS) < 1e-9 ? 'f = ∞' : `f = ${focalText(pS)} m`, leftStack ? [-3.1, 3.6, 0] : [0.0, 3.15, 0], ROLE.ink, 'detail'),
          label(`P = 1/f = ${signed(pS)} D`, leftStack ? [-3.1, 4.25, 0] : [0.2, 4.1, 0], ROLE.result, 'primary'),
        ],
      },
      {
        narration: step2Narr,
        objects: [
          line([X_LEFT, Y_PAIR, 0], [X_RIGHT, Y_PAIR, 0], ROLE.reference, 0.025),
          ...(Math.abs(p1) < 1e-9 ? [] : [lensOutline('lens-first', lensX1, Y_PAIR, converging(p1))]),
          ...(Math.abs(p2) < 1e-9 ? [] : [lensOutline('lens-second', lensX2, Y_PAIR, converging(p2))]),
          incoming('ray-pair-in-upper', Y_PAIR, RAY_H, pair.x1),
          incoming('ray-pair-in-lower', Y_PAIR, -RAY_H, pair.x1),
          // The first lens ALONE: where its own power would take the upper ray.
          ...(alone ? [{ ...line([round(pair.x1), round(Y_PAIR + RAY_H), 0], [alone.xTo, round(Y_PAIR + alone.yTo), 0], ROLE.aid, 0.04), id: 'ray-first-alone' } as SceneObject] : []),
          ...(alone && alone.focusX !== null ? [{ ...dot([alone.focusX, Y_PAIR, 0], ROLE.aid, 0.08), id: 'focus-first' } as SceneObject] : []),
          label(`${signed(p1)} D`, [-3.5, -0.85, 0], ROLE.ink, 'primary'),
          label(`${signed(p2)} D`, [-1.75, -3.8, 0], ROLE.ink, 'primary'),
          ...(alone && alone.focusX !== null ? [label('F₁', [round(alone.focusX + 0.4), -1.4, 0], ROLE.aid, 'detail')] : []),
        ],
      },
      {
        narration: step3Narr,
        objects: [
          ...(apart ? [between('ray-pair-between-upper', Y_PAIR, 1, pair, RAY_H), between('ray-pair-between-lower', Y_PAIR, -1, pair, RAY_H)] : []),
          outgoing('ray-pair-out-upper', Y_PAIR, 1, pair),
          outgoing('ray-pair-out-lower', Y_PAIR, -1, pair),
          ...focusDot('focus-pair', Y_PAIR, pair.focusX, ROLE.result, 0.1),
          // Apart: where the SUM rule would have put the focus (measured from the second lens), for comparison.
          ...(apart && naive > 1e-9 && round(pair.x2 + SCALE / naive) <= OUT_END ? [{ ...dot([round(pair.x2 + SCALE / naive), Y_PAIR, 0], ROLE.aid, 0.08), id: 'focus-sum-rule' } as SceneObject] : []),
          label(pairResultText, pairResultSpot, ROLE.result, 'primary'),
          label(pairFocalText, pairFocalSpot, ROLE.ink, 'detail'),
        ],
      },
    ],
  }
}
