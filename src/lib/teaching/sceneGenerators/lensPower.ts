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
 * ── THE LIMIT IS SAID, NOT HIDDEN ───────────────────────────────────────────
 * P₁ + P₂ holds for THIN lenses IN CONTACT; the EB's "Why Students Fail" #3 names
 * separated lenses as the error. The last step says so.
 *
 * Authoring rules (physicsPilot.ts): shared palette, labels are names not sentences,
 * steps are cumulative so no annotation contradicts a later step, coordinates inside
 * ±5, every narration under 220 characters.
 */

import type { SceneObject, SceneSpec, Vec3 } from '@/lib/teaching/sceneSpec'
import { ROLE, curve, dot, label, line } from './visualDesign'

/** Scene units per metre of focal length, so f = 0.50 m spans 3 units. */
const SCALE = 6
/** The x of the (thin) lens plane in both rows. */
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

/** The powers shown, in dioptres. The single lens, then the pair in contact. */
const P_SINGLE = 2
const P_FIRST = 5
const P_SECOND = -2

const round = (n: number) => Math.round(n * 1000) / 1000
const fmt = (n: number) => (Math.round(n * 100) / 100).toFixed(2)
const signed = (n: number) => `${n > 0 ? '+' : n < 0 ? '−' : ''}${Math.abs(n)}`

/**
 * The figure's own parameters, exported so the regression test can re-derive the
 * geometry independently instead of restating the numbers it is checking.
 */
export const LENS_POWER_PARAMS = {
  scale: SCALE, x0: X0, ySingle: Y_SINGLE, yPair: Y_PAIR, rayHeight: RAY_H,
  pSingle: P_SINGLE, pFirst: P_FIRST, pSecond: P_SECOND, pTotal: P_FIRST + P_SECOND,
} as const

/** The y of a parallel ray of height `h`, `dx` after the lens plane, leaving with power `p`. */
function rayAfter(yAxis: number, h: number, p: number, dx: number): number {
  return round(yAxis + h - (h * p * dx) / SCALE)
}

/** The ray from the lens plane out to `xEnd`, as a straight segment. */
function outgoing(id: string, yAxis: number, h: number, p: number, color: string, xEnd = 2.6): SceneObject {
  const from: Vec3 = [X0, round(yAxis + h), 0]
  const to: Vec3 = [xEnd, rayAfter(yAxis, h, p, xEnd - X0), 0]
  return { ...line(from, to, color, 0.04), id }
}

/** The ray arriving at the lens plane, parallel to the axis. */
function incoming(id: string, yAxis: number, h: number): SceneObject {
  return { ...line([X_LEFT, round(yAxis + h), 0], [X0, round(yAxis + h), 0], ROLE.input, 0.04), id }
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

/** The focus: where the outgoing parallel rays cross the axis, `f = 1/P` metres past the lens. */
function focusAt(yAxis: number, p: number): Vec3 {
  return [round(X0 + SCALE / p), yAxis, 0]
}

/** Power as a narrated number of words, kept short and under the 220-character stage clamp. */
export function buildLensPowerScene(): SceneSpec {
  const pTotal = P_FIRST + P_SECOND
  const fSingle = 1 / P_SINGLE
  const fFirst = 1 / P_FIRST
  const fTotal = 1 / pTotal

  return {
    id: 'phys-lens-power',
    title: 'Lens power: P = 1/f, and powers add',
    sceneType: 'comparison',
    cameraDistance: 13,
    teachingGoal:
      'Power is P = 1/f with f in metres (dioptres); for thin lenses in contact the powers add, ' +
      'P = P₁ + P₂ — the focal lengths do not.',
    ariaLabel:
      'Two rows on the same scale. Top: one converging lens of focal length 0.50 metres, so its power is ' +
      '1 over 0.50, plus 2 dioptres; parallel rays meet at the focus 0.50 metres behind it. Bottom: a converging ' +
      'lens of plus 5 dioptres and a diverging lens of minus 2 dioptres in contact. Together the rays meet at ' +
      '0.33 metres, the focus of a single lens of plus 3 dioptres: the powers add.',
    // The legend names the four things drawn in plain words (derived from the ids it would read "Ray single
    // in upper, Ray single in lower +2 more"); the panels carry the two relationships as checkable lines.
    explainer: {
      result: { expression: 'P = P₁ + P₂', value: `${signed(pTotal)} D` },
      legend: [
        { label: 'Parallel ray in', color: ROLE.input, shape: 'line' },
        { label: 'Ray out', color: ROLE.output, shape: 'line' },
        { label: 'First lens alone', color: ROLE.aid, shape: 'line' },
        { label: 'Focus', color: ROLE.result, shape: 'dot' },
      ],
      panels: [
        {
          heading: "What's happening?",
          body:
            'A lens bends parallel rays to a focus f metres away; its power is P = 1/f, in dioptres (D). ' +
            'Two thin lenses in contact bend the rays like one lens whose power is the SUM of theirs.',
        },
        {
          heading: 'Powers add, focal lengths do not',
          lines: [
            'P = 1/f   (f in metres)',
            `f = ${fmt(fSingle)} m → P = ${signed(P_SINGLE)} D`,
            `f₁ = ${fmt(fFirst)} m → ${signed(P_FIRST)} D;  f₂ = −${fmt(1 / -P_SECOND)} m → ${signed(P_SECOND)} D`,
            `P = ${signed(P_FIRST)} + (${signed(P_SECOND)}) = ${signed(pTotal)} D → f = ${fmt(fTotal)} m`,
          ],
          emphasis: `P = ${signed(P_FIRST)} + (${signed(P_SECOND)}) = ${signed(pTotal)} D → f = ${fmt(fTotal)} m`,
        },
      ],
    },
    steps: [
      {
        narration:
          `Power is the reciprocal of the focal length in METRES: P = 1/f. This lens meets parallel rays ` +
          `${fmt(fSingle)} m behind it, so P = 1/${fmt(fSingle)} = ${signed(P_SINGLE)} dioptres. Shorter f means more power.`,
        objects: [
          line([X_LEFT, Y_SINGLE, 0], [X_RIGHT, Y_SINGLE, 0], ROLE.reference, 0.025),
          lensOutline('lens-single', X0, Y_SINGLE, true),
          incoming('ray-single-in-upper', Y_SINGLE, RAY_H),
          incoming('ray-single-in-lower', Y_SINGLE, -RAY_H),
          outgoing('ray-single-out-upper', Y_SINGLE, RAY_H, P_SINGLE, ROLE.output),
          outgoing('ray-single-out-lower', Y_SINGLE, -RAY_H, P_SINGLE, ROLE.output),
          { ...dot(focusAt(Y_SINGLE, P_SINGLE), ROLE.result, 0.1), id: 'focus-single' },
          label(`f = ${fmt(fSingle)} m`, [0.0, 3.15, 0], ROLE.ink, 'detail'),
          label(`P = 1/f = ${signed(P_SINGLE)} D`, [0.2, 4.1, 0], ROLE.result, 'primary'),
        ],
      },
      {
        narration:
          `Now two thin lenses in contact: a converging ${signed(P_FIRST)} D lens (f = ${fmt(fFirst)} m) and a ` +
          `diverging ${signed(P_SECOND)} D lens (f = −${fmt(1 / -P_SECOND)} m). Each has its own power; diverging is negative.`,
        objects: [
          line([X_LEFT, Y_PAIR, 0], [X_RIGHT, Y_PAIR, 0], ROLE.reference, 0.025),
          lensOutline('lens-first', X0 - LENS_T, Y_PAIR, true),
          lensOutline('lens-second', X0 + LENS_T, Y_PAIR, false),
          incoming('ray-pair-in-upper', Y_PAIR, RAY_H),
          incoming('ray-pair-in-lower', Y_PAIR, -RAY_H),
          // The first lens ALONE: where its +5 D would bring the upper ray to a focus.
          outgoing('ray-first-alone', Y_PAIR, RAY_H, P_FIRST, ROLE.aid, round(X0 + SCALE / P_FIRST)),
          { ...dot(focusAt(Y_PAIR, P_FIRST), ROLE.aid, 0.08), id: 'focus-first' },
          label(`${signed(P_FIRST)} D`, [-3.5, -0.85, 0], ROLE.ink, 'primary'),
          label(`${signed(P_SECOND)} D`, [-1.75, -3.8, 0], ROLE.ink, 'primary'),
          label('F₁', [-0.9, -1.4, 0], ROLE.aid, 'detail'),
        ],
      },
      {
        narration:
          `Together they bend the rays like ONE lens of power ${signed(P_FIRST)} + (${signed(P_SECOND)}) = ${signed(pTotal)} D, ` +
          `so f = 1/${pTotal} = ${fmt(fTotal)} m. Powers add, focal lengths do not. (Thin lenses in contact only.)`,
        objects: [
          outgoing('ray-pair-out-upper', Y_PAIR, RAY_H, pTotal, ROLE.output),
          outgoing('ray-pair-out-lower', Y_PAIR, -RAY_H, pTotal, ROLE.output),
          { ...dot(focusAt(Y_PAIR, pTotal), ROLE.result, 0.1), id: 'focus-pair' },
          label(`P₁ + P₂ = ${signed(pTotal)} D`, [3.3, -0.5, 0], ROLE.result, 'primary'),
          label(`f = ${fmt(fTotal)} m`, [0.7, -3.85, 0], ROLE.ink, 'detail'),
        ],
      },
    ],
  }
}
