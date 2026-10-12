/**
 * Core school-mathematics figures — batch 11 of the mathematics visual campaign
 * (2026-10-12): functions.
 *
 * The function idea as a mapping diagram, injective / surjective / bijective maps (and the
 * horizontal line test), transformations of a graph, polynomials and their end behaviour,
 * rational functions with a hole and both kinds of asymptote, a piecewise function with its
 * continuity check, and monotonic functions. Same rules as batches 1-10: one visual language
 * from visualDesign.ts, labels are names not sentences (marks of 1-2 characters are free),
 * steps are cumulative, coordinates stay inside +-5, at most 50 objects per step, nothing the
 * figure audit rejects, and every number drawn comes from the constants and pure helpers
 * exported here, which the test file re-derives independently from the DRAWN coordinates.
 */

import type { SceneSpec, SceneObject } from '@/lib/teaching/sceneSpec'
import { ROLE, arrow, curve, dot, label, line } from './visualDesign'
import { P, NO_STAGE, framed, sampleMapped, guide, mathAxes, arcPts, type V3 } from './mathSceneKit'

const ring = (x: number, y: number, color: string, r = 0.11): SceneObject => curve(arcPts(x, y, r, 0, 360, 24), color)
const ellipse = (cx: number, cy: number, rx: number, ry: number, color: string): SceneObject =>
  curve(Array.from({ length: 48 }, (_, i) => { const a = (2 * Math.PI * i) / 47; return P(cx + rx * Math.cos(a), cy + ry * Math.sin(a)) }), color)

// ── mapping diagrams (function concept, injective, surjective, bijective) ───

export type Pair = [number, number]
/** A mapping diagram: two ovals, the domain at cx − gap and the codomain at cx + gap, elements listed top to bottom. */
export function mappingFrame(cx: number, gap: number, sp: number, dom: readonly number[], cod: readonly number[]) {
  const xl = cx - gap, xr = cx + gap
  const yAt = (n: number, i: number) => ((n - 1) / 2 - i) * sp
  const yDom = (v: number) => yAt(dom.length, dom.indexOf(v)), yCod = (v: number) => yAt(cod.length, cod.indexOf(v))
  const oval = (x: number, n: number, color: string) => ellipse(x, 0, 0.55, ((n - 1) / 2) * sp + 0.55, color)
  const frame: SceneObject[] = [
    oval(xl, dom.length, ROLE.reference), oval(xr, cod.length, ROLE.reference),
    ...dom.flatMap((v) => [dot(P(xl, yDom(v)), ROLE.input, 0.1), label(String(v).replace('-', '−'), P(xl - 0.5, yDom(v)), ROLE.ink, 'detail')]),
    ...cod.flatMap((v) => [dot(P(xr, yCod(v)), ROLE.output, 0.1), label(String(v).replace('-', '−'), P(xr + 0.5, yCod(v)), ROLE.ink, 'detail')]),
  ]
  const arrowFor = (a: number, b: number, color: string, dy = 0): SceneObject => arrow(P(xl + 0.2, yDom(a) + dy), P(xr - 0.2, yCod(b) + dy), color)
  return { xl, xr, yDom, yCod, frame, arrowFor }
}

// ── 1. Function concept ──────────────────────────────────────────────────────

export const FUNC = { dom: [-1, 0, 1, 2], cod: [0, 1, 2, 3, 4, 5], gap: 2.2, sp: 0.9 } as const
export const funcOf = (x: number) => x * x
export const funcRange = () => [...new Set(FUNC.dom.map(funcOf))].sort((a, b) => a - b)

/** KG: a rule assigning to each element of a domain exactly one element of a codomain. */
export function buildFunctionConceptScene(): SceneSpec {
  return framed(raw_buildFunctionConceptScene())
}
function raw_buildFunctionConceptScene(): SceneSpec {
  const { dom, cod, gap, sp } = FUNC
  const m = mappingFrame(0, gap, sp, dom, cod)
  return {
    id: 'math-function-concept',
    title: 'Function: exactly one output for each input',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show a function as a mapping from a domain to a codomain: f(x) = x² sends −1, 0, 1, 2 to 1, 0, 1, 4; every input has exactly one arrow, two inputs may share an output, and the outputs actually reached form the range {0, 1, 4}.',
    ariaLabel:
      'Two sets drawn as ovals. The domain on the left holds minus 1, 0, 1 and 2. The codomain on the right holds 0 to 5. Arrows for f of x equals x squared go from minus 1 to 1, from 0 to 0, from 1 to 1 and from 2 to 4: exactly one arrow leaves each input, and the arrows from minus 1 and from 1 meet at 1. The outputs reached, 0, 1 and 4, are the range; 2, 3 and 5 are in the codomain but not reached.',
    stage: NO_STAGE,
    steps: [
      { narration: 'A function needs two sets: a domain A of inputs (left: −1, 0, 1, 2) and a codomain B where outputs may live (right: 0 to 5).', objects: [...m.frame, label('domain A', P(m.xl, 3.3), ROLE.input, 'primary'), label('codomain B', P(m.xr, 3.3), ROLE.output, 'primary')] },
      { narration: 'The rule f(x) = x² draws one arrow from each input: −1 → 1, 0 → 0, 1 → 1, 2 → 4. A function gives EXACTLY ONE output for every input. It is fine for two inputs (−1 and 1) to share an output.', objects: [...dom.map((a) => m.arrowFor(a, funcOf(a), ROLE.ink)), label('f(x) = x²', P(0, 3.3), ROLE.ink, 'primary')] },
      { narration: 'The outputs actually reached, {0, 1, 4}, form the range. It sits inside the codomain but need not fill it: 2, 3 and 5 are never reached.', objects: [...funcRange().map((v) => ring(m.xr, m.yCod(v), ROLE.result, 0.22)), label('range = {0, 1, 4}', P(0, -3.2), ROLE.result, 'primary'), label('one arrow from each input', P(0, -3.8), ROLE.ink, 'primary')] },
    ],
  }
}

// ── 2. Injectivity ───────────────────────────────────────────────────────────

/** Left: y = x³ (one-to-one). Right: y = x² (not), then restricted to x ≥ 0 (one-to-one). Vertical scales differ between panels (see aria). */
export const INJ = { cx: [-2.6, 2.6], ux: 0.9, uyL: 0.5, uyR: 0.5, oyR: -1.2, levelsL: [-2, 1, 3], levelR: 2.25 } as const
export const cubeRoot = (y: number) => Math.cbrt(y)

/** KG: injective ⇔ f(a) = f(b) implies a = b; every horizontal line meets the graph at most once. */
export function buildInjectivityScene(): SceneSpec {
  return framed(raw_buildInjectivityScene())
}
function raw_buildInjectivityScene(): SceneSpec {
  const { cx, ux, uyL, uyR, oyR, levelsL, levelR } = INJ
  const L = (x: number, y: number): V3 => P(cx[0] + x * ux, y * uyL)
  const R = (x: number, y: number): V3 => P(cx[1] + x * ux, y * uyR + oyR)
  const r = Math.sqrt(levelR)
  return {
    id: 'math-injectivity',
    title: 'Injective function: the horizontal line test',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show injectivity with the horizontal line test: every horizontal line meets y = x³ at most once (one-to-one), but y = x² is hit twice by y = 2.25 (f(−1.5) = f(1.5), not injective), and restricting to x ≥ 0 makes it injective.',
    ariaLabel:
      'Left: the graph of y equals x cubed rising steadily, with three horizontal lines at heights minus 2, 1 and 3, each meeting the curve at exactly one point. Right: the graph of y equals x squared, with the horizontal line at height 2.25 meeting it at two points, x minus 1.5 and x 1.5, so two different inputs share an output. The right branch for x at least 0, in green, passes the test.',
    stage: NO_STAGE,
    steps: [
      { narration: 'f(x) = x³ is injective: different inputs always give different outputs. Test: every horizontal line meets the graph at most once. The lines y = −2, 1, 3 each hit it exactly once.', objects: [...mathAxes(L, -1.6, 1.6, -3.6, 3.6), curve(sampleMapped((x) => x ** 3, -1.5, 1.5, L, 60), ROLE.ink), ...levelsL.flatMap((c) => [guide(L(-1.5, c), L(1.5, c), ROLE.aid, 0.03), dot(L(cubeRoot(c), c), ROLE.result, 0.1)]), label('x³: one hit each', P(cx[0], 2.2), ROLE.ink, 'primary')] },
      { narration: 'g(x) = x² is NOT injective: the horizontal line y = 2.25 meets it twice, at x = −1.5 and x = 1.5. Two different inputs share one output: g(−1.5) = g(1.5).', objects: [...mathAxes(R, -2.2, 2.2, -0.4, 4.6), curve(sampleMapped((x) => x * x, -2, 2, R, 60), ROLE.ink), guide(R(-2, levelR), R(2, levelR), ROLE.aid, 0.03), dot(R(-r, levelR), ROLE.input, 0.11), dot(R(r, levelR), ROLE.input, 0.11), label('x²: hit twice', P(cx[1], 2.2), ROLE.input, 'primary')] },
      { narration: 'Restrict the domain to x ≥ 0 and the same rule becomes injective: the green branch passes the horizontal line test, every height is reached at most once.', objects: [curve(sampleMapped((x) => x * x, 0, 2, R, 40), ROLE.result), label('x ≥ 0: injective', P(cx[1] + 0.9, 0.3), ROLE.result, 'primary')] },
    ],
  }
}

// ── 3. Surjectivity ──────────────────────────────────────────────────────────

/** f: {1,2,3,4} → {1,2,3} (onto); g: {1,2,3} → {1,2,3,4} (not onto, 4 unreached). */
export const SURJ = {
  cx: [-2.8, 2.8], gap: 1.0, sp: 0.8,
  f: { dom: [1, 2, 3, 4], cod: [1, 2, 3], pairs: [[1, 1], [2, 2], [3, 3], [4, 3]] as Pair[] },
  g: { dom: [1, 2, 3], cod: [1, 2, 3, 4], pairs: [[1, 1], [2, 2], [3, 3]] as Pair[] },
} as const
export const reached = (pairs: readonly Pair[]) => [...new Set(pairs.map((p) => p[1]))].sort((a, b) => a - b)
export const isOnto = (cod: readonly number[], pairs: readonly Pair[]) => cod.every((v) => reached(pairs).includes(v))

/** KG: f: A → B is surjective if every b ∈ B has at least one a ∈ A with f(a) = b: the range equals the codomain. */
export function buildSurjectivityScene(): SceneSpec {
  return framed(raw_buildSurjectivityScene())
}
function raw_buildSurjectivityScene(): SceneSpec {
  const { cx, gap, sp, f, g } = SURJ
  const mf = mappingFrame(cx[0], gap, sp, f.dom, f.cod), mg = mappingFrame(cx[1], gap, sp, g.dom, g.cod)
  return {
    id: 'math-surjectivity',
    title: 'Surjective function: every output is reached',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show surjectivity as range = codomain: f sends 1, 2, 3, 4 onto 1, 2, 3 and every target has an arrow into it, while g sends 1, 2, 3 into 1, 2, 3, 4 and nothing reaches 4, so g is not onto.',
    ariaLabel:
      'Left: a map from the set 1, 2, 3, 4 to the set 1, 2, 3 with arrows 1 to 1, 2 to 2, 3 to 3 and 4 to 3; every element of the target has at least one arrow arriving, so it is onto. Right: a map from 1, 2, 3 to 1, 2, 3, 4 with arrows 1 to 1, 2 to 2 and 3 to 3; the element 4 has no arrow arriving, so it is not onto.',
    stage: NO_STAGE,
    steps: [
      { narration: 'f maps {1, 2, 3, 4} to {1, 2, 3}: 1 → 1, 2 → 2, 3 → 3, 4 → 3. Every element of the codomain has at least one arrow arriving (3 has two). That is surjective, or “onto”.', objects: [...mf.frame, ...f.pairs.map(([a, b]) => mf.arrowFor(a, b, ROLE.output)), ...f.cod.map((v) => ring(mf.xr, mf.yCod(v), ROLE.result, 0.22)), label('onto: range = codomain', P(cx[0], -2.8), ROLE.result, 'primary')] },
      { narration: 'g maps {1, 2, 3} into {1, 2, 3, 4}: 1 → 1, 2 → 2, 3 → 3. The codomain element 4 has no arrow arriving: nothing is mapped to it.', objects: [...mg.frame, ...g.pairs.map(([a, b]) => mg.arrowFor(a, b, ROLE.output))] },
      { narration: 'So g is not surjective: its range {1, 2, 3} is smaller than its codomain {1, 2, 3, 4}. The unreached element is circled in red. (g is injective, f is not: the two ideas are independent.)', objects: [ring(mg.xr, mg.yCod(4), ROLE.input, 0.22), label('4 is never reached', P(cx[1], -2.8), ROLE.input, 'primary')] },
    ],
  }
}

// ── 4. Bijection ─────────────────────────────────────────────────────────────

export const BIJ = { cx: 0, gap: 2.2, sp: 1.0, dom: [1, 2, 3], cod: [2, 4, 6] } as const
export const bijF = (x: number) => 2 * x
export const bijInverse = (y: number) => y / 2

/** KG: a function that is both injective and surjective: a perfect pairing, uniquely invertible. */
export function buildBijectionScene(): SceneSpec {
  return framed(raw_buildBijectionScene())
}
function raw_buildBijectionScene(): SceneSpec {
  const { cx, gap, sp, dom, cod } = BIJ
  const m = mappingFrame(cx, gap, sp, dom, cod)
  return {
    id: 'math-bijection',
    title: 'Bijection: a perfect pairing, so it can be undone',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show a bijection with f(x) = 2x from {1, 2, 3} to {2, 4, 6}: exactly one arrow leaves every input and exactly one arrives at every output (injective and surjective), so reversing the arrows gives the inverse f⁻¹(y) = y/2.',
    ariaLabel:
      'A map from the set 1, 2, 3 to the set 2, 4, 6 by doubling: 1 to 2, 2 to 4, 3 to 6. Exactly one arrow leaves each input and exactly one arrives at each output. A second set of violet arrows runs backwards from 2 to 1, 4 to 2 and 6 to 3, the inverse function y over 2.',
    stage: NO_STAGE,
    steps: [
      { narration: 'f(x) = 2x from {1, 2, 3} to {2, 4, 6}: 1 → 2, 2 → 4, 3 → 6. Every input has exactly one arrow leaving it.', objects: [...m.frame, ...dom.map((a) => m.arrowFor(a, bijF(a), ROLE.output)), label('f(x) = 2x', P(0, 2.6), ROLE.output, 'primary')] },
      { narration: 'And every output has exactly one arrow arriving: no two inputs share an output (injective) and no output is missed (surjective). Both together make a bijection: a perfect one-to-one pairing.', objects: [...cod.map((v) => ring(m.xr, m.yCod(v), ROLE.result, 0.22)), label('one in, one out: bijective', P(0, -2.6), ROLE.result, 'primary')] },
      { narration: 'A perfect pairing can be run backwards. Reversing every arrow (violet) gives the inverse function f⁻¹(y) = y ÷ 2: 2 → 1, 4 → 2, 6 → 3. Only bijections have an inverse defined on the whole codomain.', objects: [...cod.map((v) => arrow(P(m.xr - 0.2, m.yCod(v) - 0.2), P(m.xl + 0.2, m.yDom(bijInverse(v)) - 0.2), ROLE.aid)), label('inverse: y ↦ y/2', P(0, -3.3), ROLE.aid, 'primary')] },
    ],
  }
}

// ── 5. Transformations of functions ──────────────────────────────────────────

/** Base y = x²; g = f(x − 2) + 1; h = −f(x); k = 2 f(x). Equal scales 0.5; x offset so the figure is centred. */
export const TRANS = { u: 0.5, ox: -0.4, shift: [2, 1], stretch: 2 } as const
export const transBase = (x: number) => x * x
export const transShift = (x: number) => transBase(x - TRANS.shift[0]) + TRANS.shift[1]
export const transReflect = (x: number) => -transBase(x)
export const transStretch = (x: number) => TRANS.stretch * transBase(x)

/** KG: shifts f(x) ± c, f(x ± c); reflections −f(x), f(−x); stretches a f(x), f(bx). */
export function buildTransformationsFunctionsScene(): SceneSpec {
  return framed(raw_buildTransformationsFunctionsScene())
}
function raw_buildTransformationsFunctionsScene(): SceneSpec {
  const { u, ox, shift } = TRANS
  const S = (x: number, y: number): V3 => P(x * u + ox, y * u)
  return {
    id: 'math-transformations-functions',
    title: 'Transformations of functions',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show how the graph of f(x) = x² moves: f(x − 2) + 1 shifts it right 2 and up 1 (vertex (2, 1)), −f(x) reflects it in the x-axis, and 2f(x) stretches it vertically by 2 (same vertex, narrower).',
    ariaLabel:
      'The parabola y equals x squared. A blue copy has its vertex moved to 2, 1: shifted right 2 and up 1, the graph of f of x minus 2 plus 1. A red copy opens downward, the reflection of y equals x squared in the x-axis. A green copy is narrower, stretched vertically by a factor 2, with the same vertex at the origin.',
    stage: NO_STAGE,
    steps: [
      { narration: 'Start from f(x) = x² (grey). Replacing x by x − 2 moves the graph RIGHT 2; adding 1 to the output moves it UP 1. So f(x − 2) + 1 = (x − 2)² + 1 has its vertex at (2, 1).', objects: [...mathAxes(S, -3.4, 5, -8.5, 8.5), curve(sampleMapped(transBase, -2.8, 2.8, S, 60), ROLE.ink), curve(sampleMapped(transShift, -0.5, 4.4, S, 60), ROLE.output), dot(S(shift[0], shift[1]), ROLE.output, 0.12), label('f(x) = x²', P(S(-2.4, 0)[0], S(0, 7.2)[1]), ROLE.ink, 'primary'), label('f(x − 2) + 1', P(S(4.2, 0)[0], S(0, 7.8)[1] + 0.5), ROLE.output, 'primary')] },
      { narration: 'Putting a minus sign on the OUTPUT, −f(x), reflects the graph in the x-axis: every point (x, y) goes to (x, −y), so the parabola opens downward.', objects: [curve(sampleMapped(transReflect, -2.8, 2.8, S, 60), ROLE.input), label('−f(x)', P(S(-2.4, 0)[0], S(0, -7.2)[1]), ROLE.input, 'primary')] },
      { narration: 'Multiplying the output by 2, 2f(x), stretches the graph vertically: every height doubles, so it is narrower and passes through (1, 2) instead of (1, 1). The vertex (0, 0) stays put because 2 × 0 = 0.', objects: [curve(sampleMapped(transStretch, -1.9, 1.9, S, 50), ROLE.result), label('2f(x)', P(S(1.1, 0)[0] + 0.6, S(0, 7.0)[1]), ROLE.result, 'primary')] },
    ],
  }
}

// ── 6. Polynomial function ───────────────────────────────────────────────────

/** p(x) = (x + 2)(x − 1)(x − 3) = x³ − 2x² − 5x + 6. Screen x = (x − 0.5) ux, y = uy y (vertical scale compressed). */
export const POLY = { roots: [-2, 1, 3], ux: 0.6, uy: 0.25, mid: 0.5 } as const
export const polyP = (x: number) => (x + 2) * (x - 1) * (x - 3)
export const polyExpanded = (x: number) => x ** 3 - 2 * x ** 2 - 5 * x + 6
export const polyDerivative = (x: number) => 3 * x * x - 4 * x - 5
export const polyTurning = () => { const d = Math.sqrt(16 + 60); return [(4 - d) / 6, (4 + d) / 6] }

/** KG: p(x) = aₙxⁿ + … + a₀: continuous everywhere, behaviour determined by degree and leading coefficient. */
export function buildPolynomialFunctionScene(): SceneSpec {
  return framed(raw_buildPolynomialFunctionScene())
}
function raw_buildPolynomialFunctionScene(): SceneSpec {
  const { roots, ux, uy, mid } = POLY
  const S = (x: number, y: number): V3 => P((x - mid) * ux, y * uy)
  const [t1, t2] = polyTurning()
  return {
    id: 'math-polynomial-function',
    title: 'Polynomial function: roots, intercept and turning points',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show a degree-3 polynomial p(x) = (x + 2)(x − 1)(x − 3) = x³ − 2x² − 5x + 6: smooth and continuous, with roots −2, 1, 3 where it crosses the axis, y-intercept 6, and at most degree − 1 = 2 turning points (a maximum near x = −0.79 and a minimum near x = 2.12).',
    ariaLabel:
      'The graph of the cubic p of x equals x plus 2, times x minus 1, times x minus 3, drawn with the vertical scale compressed. It is a smooth curve crossing the x-axis at minus 2, 1 and 3 and the y-axis at 6. It has a local maximum near x minus 0.79 and a local minimum near x 2.12: two turning points, one fewer than the degree.',
    stage: NO_STAGE,
    steps: [
      { narration: 'p(x) = (x + 2)(x − 1)(x − 3) = x³ − 2x² − 5x + 6 is a polynomial of degree 3: a smooth curve with no breaks or corners. Its roots (where it crosses the x-axis) are x = −2, 1, 3 and the y-intercept is p(0) = 6.', objects: [...mathAxes(S, -3, 4.2, -14, 11), curve(sampleMapped(polyP, -2.6, 3.6, S, 80), ROLE.ink), ...roots.map((r) => dot(S(r, 0), ROLE.result, 0.11)), dot(S(0, 6), ROLE.output, 0.11), label('p(0) = 6', P(S(0, 0)[0] + 0.9, S(0, 6)[1] + 0.3), ROLE.output, 'primary'), label('roots −2, 1, 3', P(S(0.5, 0)[0], S(0, -9)[1]), ROLE.result, 'primary')] },
      { narration: 'Turning points are where p′(x) = 3x² − 4x − 5 = 0: x = (4 ± √76) ÷ 6, about −0.79 and 2.12. A degree-n polynomial has at most n − 1 of them: here 2, a local maximum (about 8.2) then a local minimum (about −4.1).', objects: [dot(S(t1, polyP(t1)), ROLE.input, 0.12), dot(S(t2, polyP(t2)), ROLE.input, 0.12), label('max ≈ 8.2', P(S(t1, 0)[0] - 0.2, S(0, polyP(t1))[1] + 0.45), ROLE.input, 'primary'), label('min ≈ −4.1', P(S(t2, 0)[0] + 0.3, S(0, polyP(t2))[1] - 0.5), ROLE.input, 'primary')] },
      { narration: 'Reading the factored form: each factor (x − r) gives a root r, so a degree-3 polynomial has at most 3 real roots, and the curve is continuous everywhere. The vertical scale is compressed here to fit the whole graph.', objects: [label('degree 3: ≤ 3 roots, ≤ 2 turns', P(0, 2.9), ROLE.ink, 'primary')] },
    ],
  }
}

// ── 7. End behaviour ─────────────────────────────────────────────────────────

/** Four panels y = a x^n: (a, n) = (+1, 2), (−1, 2), (+1, 3), (−1, 3). Panel centres in a 2 × 2 grid. */
export const ENDB = { panels: [{ a: 1, n: 2, c: [-2.6, 1.5] }, { a: -1, n: 2, c: [2.6, 1.5] }, { a: 1, n: 3, c: [-2.6, -1.9] }, { a: -1, n: 3, c: [2.6, -1.9] }] as ReadonlyArray<{ a: number; n: number; c: [number, number] }>, ux: 0.9, uy: 0.4, xmax: 1.4 } as const
/** Sign of y = a x^n far to the left and far to the right. */
export const endSigns = (a: number, n: number): [number, number] => [Math.sign(a * (-1) ** n), Math.sign(a)]

/** KG: as x → ±∞ a polynomial behaves like its leading term aₙxⁿ: rises or falls according to the sign of aₙ and the parity of n. */
export function buildEndBehaviorScene(): SceneSpec {
  return framed(raw_buildEndBehaviorScene())
}
function raw_buildEndBehaviorScene(): SceneSpec {
  const { panels, ux, uy, xmax } = ENDB
  const S = (k: number) => (x: number, y: number): V3 => P(panels[k].c[0] + x * ux, panels[k].c[1] + y * uy)
  const curveOf = (k: number, color: string) => curve(sampleMapped((x) => panels[k].a * x ** panels[k].n, -xmax, xmax, S(k), 40), color)
  const axesOf = (k: number) => mathAxes(S(k), -1.7, 1.7, -2.9, 2.9)
  const endArrows = (k: number): SceneObject[] => {
    const { a, n } = panels[k], s = S(k)
    return [-xmax, xmax].map((x) => {
      const y = a * x ** n, p = s(x, y), px = p[0] + (x < 0 ? -0.1 : 0.1)
      return arrow(P(px, p[1]), P(px, p[1] + 0.55 * Math.sign(y)), ROLE.aid)
    })
  }
  const titles = ['x²', '−x²', 'x³', '−x³']
  const tag = (k: number, color: string) => label(titles[k], P(panels[k].c[0] + 1.3, panels[k].c[1] + 1.0), color, 'primary')
  return {
    id: 'math-end-behavior',
    title: 'End behaviour of a polynomial',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show end behaviour from the leading term aₙxⁿ: even degree gives the same direction at both ends (up if aₙ > 0, down if aₙ < 0); odd degree gives opposite ends (down-left and up-right if aₙ > 0, the reverse if aₙ < 0).',
    ariaLabel:
      'Four small graphs. Top row, even degree: y equals x squared rises at both ends, and y equals minus x squared falls at both ends. Bottom row, odd degree: y equals x cubed falls at the far left and rises at the far right, and y equals minus x cubed rises at the left and falls at the right. Arrows mark the direction at each end.',
    stage: NO_STAGE,
    steps: [
      { narration: 'Far from the origin a polynomial behaves like its leading term. EVEN degree: both ends go the same way. x² (positive leading coefficient) rises at both ends; −x² falls at both ends.', objects: [...axesOf(0), curveOf(0, ROLE.output), tag(0, ROLE.output), ...axesOf(1), curveOf(1, ROLE.input), tag(1, ROLE.input)] },
      { narration: 'ODD degree: the ends go opposite ways. x³ falls at the left and rises at the right; −x³ rises at the left and falls at the right, because the odd power keeps the sign of x.', objects: [...axesOf(2), curveOf(2, ROLE.output), tag(2, ROLE.output), ...axesOf(3), curveOf(3, ROLE.input), tag(3, ROLE.input)] },
      { narration: 'The arrows show each end: left-end sign = aₙ(−1)ⁿ and right-end sign = sign of aₙ. Even n: the two ends agree. Odd n: they differ. The lower-order terms do not change this.', objects: [...[0, 1, 2, 3].flatMap(endArrows), label('even n: ends match', P(0, 3.3), ROLE.aid, 'primary'), label('odd n: ends opposite', P(0, -3.4), ROLE.aid, 'primary')] },
    ],
  }
}

// ── 8. Rational function ─────────────────────────────────────────────────────

/** f(x) = (x + 2)(x − 1) / ((x − 3)(x − 1)): zero at −2, vertical asymptote at 3, hole at 1 (f → −1.5), horizontal asymptote y = 1. */
export const RAT = { ux: 0.4, uy: 0.4, mid: 1.5, holeGap: 0.18 } as const
export const ratF = (x: number) => (x + 2) / (x - 3)
export const ratNumerator = (x: number) => (x + 2) * (x - 1)
export const ratDenominator = (x: number) => (x - 3) * (x - 1)
export const ratHole = (): [number, number] => [1, ratF(1)]

/** KG: p(x)/q(x) with q ≠ 0: the domain excludes the zeros of q; vertical asymptotes and possibly holes. */
export function buildRationalFunctionScene(): SceneSpec {
  return framed(raw_buildRationalFunctionScene())
}
function raw_buildRationalFunctionScene(): SceneSpec {
  const { ux, uy, mid, holeGap } = RAT
  const S = (x: number, y: number): V3 => P((x - mid) * ux, y * uy)
  const branch = (a: number, b: number, color: string) => curve(sampleMapped(ratF, a, b, S, Math.max(12, Math.round((b - a) * 6))), color)
  const [hx, hy] = ratHole()
  return {
    id: 'math-rational-function',
    title: 'Rational function: asymptote, hole and intercept',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show f(x) = (x + 2)(x − 1) / ((x − 3)(x − 1)): the denominator is zero at x = 3 (a vertical asymptote, since the numerator is not zero there) and at x = 1 (a hole, because (x − 1) cancels and f approaches −1.5), with the x-intercept −2 and the horizontal asymptote y = 1.',
    ariaLabel:
      'The graph of a rational function with two branches. A dashed vertical line at x equals 3 is a vertical asymptote that the curve climbs along without touching. On the left branch there is a small gap, an open circle, at x equals 1 where the height would be minus 1.5: a hole. The curve crosses the x-axis at minus 2 and approaches the dashed horizontal line y equals 1 at both ends.',
    stage: NO_STAGE,
    steps: [
      { narration: 'f(x) = (x + 2)(x − 1) ÷ ((x − 3)(x − 1)): a polynomial divided by a polynomial. Its domain excludes the zeros of the denominator, x = 3 and x = 1. At x = 3 the numerator (x + 2)(x − 1) = 10 is not zero, so the graph shoots off to ±∞: a vertical asymptote (dashed).', objects: [...mathAxes(S, -4.8, 7.8, -7, 7), branch(-4.5, 1 - holeGap, ROLE.ink), branch(1 + holeGap, 2.15, ROLE.ink), branch(3.85, 7.5, ROLE.ink), line(S(3, -6.6), S(3, 6.6), ROLE.aid, 0.03), label('vertical asymptote x = 3', P(S(3, 0)[0] + 0.3, S(0, 7.3)[1]), ROLE.aid, 'primary')] },
      { narration: 'At x = 1 the factor (x − 1) cancels top and bottom, so f(x) = (x + 2) ÷ (x − 3) near 1 and approaches 3 ÷ (−2) = −1.5. The point is missing: a hole (open circle), not an asymptote.', objects: [ring(S(hx, hy)[0], S(0, hy)[1], ROLE.input, 0.14), label('hole at x = 1', P(S(hx, 0)[0] - 0.4, S(0, hy)[1] - 0.7), ROLE.input, 'primary')] },
      { narration: 'The graph crosses the x-axis where the numerator is zero and the denominator is not: x = −2. Far out, f(x) = 1 + 5 ÷ (x − 3) approaches 1: a horizontal asymptote y = 1.', objects: [dot(S(-2, 0), ROLE.result, 0.12), line(S(-4.7, 1), S(7.7, 1), ROLE.output, 0.03), label('zero x = −2', P(S(-2, 0)[0] - 0.4, S(0, -1.0)[1]), ROLE.result, 'primary'), label('horizontal asymptote y = 1', P(S(5.6, 0)[0], S(0, 2.2)[1]), ROLE.output, 'primary')] },
    ],
  }
}

// ── 9. Vertical asymptote ────────────────────────────────────────────────────

/** f(x) = 1/(x − 2): numerator 1 ≠ 0 and denominator 0 at x = 2. Screen x = (x − 2) ux. */
export const VA = { ux: 0.8, uy: 0.3, a: 2, right: [2.5, 2.2, 2.1], left: [1.5, 1.8, 1.9] } as const
export const vaF = (x: number) => 1 / (x - VA.a)

/** KG: a vertical line x = a where |f(x)| → ∞; occurs where q(a) = 0 and p(a) ≠ 0 for f = p/q. */
export function buildVerticalAsymptoteScene(): SceneSpec {
  return framed(raw_buildVerticalAsymptoteScene())
}
function raw_buildVerticalAsymptoteScene(): SceneSpec {
  const { ux, uy, a, right, left } = VA
  const S = (x: number, y: number): V3 => P((x - a) * ux, y * uy)
  return {
    id: 'math-vertical-asymptote',
    title: 'Vertical asymptote: the graph blows up at x = a',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show the vertical asymptote of f(x) = 1/(x − 2) at x = 2: the denominator is 0 there while the numerator is 1, so as x approaches 2 from the right f grows without bound (2, 5, 10, …) and from the left it falls without bound (−2, −5, −10, …).',
    ariaLabel:
      'The graph of one over x minus 2 with a dashed vertical line at x equals 2. Marked points on the right branch at x 2.5, 2.2 and 2.1 have heights 2, 5 and 10, climbing as x nears 2. Marked points on the left branch at x 1.5, 1.8 and 1.9 have heights minus 2, minus 5 and minus 10, falling as x nears 2.',
    stage: NO_STAGE,
    steps: [
      { narration: 'f(x) = 1 ÷ (x − 2). The denominator is 0 at x = 2 while the numerator stays 1 (not 0), so f is undefined there and the graph never crosses the dashed line x = 2: a vertical asymptote.', objects: [...mathAxes(S, -3.4, 5.6, -11, 11), curve(sampleMapped(vaF, 2.09, 5.4, S, 50), ROLE.ink), curve(sampleMapped(vaF, -1.4, 1.91, S, 50), ROLE.ink), line(S(2, -11), S(2, 11), ROLE.aid, 0.03), label('x = 2', P(S(2, 0)[0] + 0.55, S(0, 10.4)[1]), ROLE.aid, 'primary')] },
      { narration: 'From the right: x = 2.5 gives 2, x = 2.2 gives 5, x = 2.1 gives 10. As x → 2⁺ the values grow without bound: f(x) → +∞.', objects: [...right.map((x) => dot(S(x, vaF(x)), ROLE.output, 0.1)), label('x → 2⁺: f → +∞', P(S(3.7, 0)[0], S(0, 7)[1]), ROLE.output, 'primary')] },
      { narration: 'From the left: x = 1.5 gives −2, x = 1.8 gives −5, x = 1.9 gives −10. As x → 2⁻ the values fall without bound: f(x) → −∞. The curve hugs the asymptote on both sides but never touches it.', objects: [...left.map((x) => dot(S(x, vaF(x)), ROLE.input, 0.1)), label('x → 2⁻: f → −∞', P(S(0.3, 0)[0], S(0, -7)[1]), ROLE.input, 'primary')] },
    ],
  }
}

// ── 10. Horizontal asymptote ─────────────────────────────────────────────────

/** f(x) = (2x² + 1)/(x² + 1) → 2 (equal degrees: 2/1); g(x) = 4/(x² + 1) → 0 (lower degree on top). */
export const HA = { u: 0.55, uy: 0.6, probes: [4, 6] } as const
export const haF = (x: number) => (2 * x * x + 1) / (x * x + 1)
export const haG = (x: number) => 4 / (x * x + 1)

/** KG: a horizontal line y = L that f(x) approaches as x → ±∞, found by comparing the degrees of numerator and denominator. */
export function buildHorizontalAsymptoteScene(): SceneSpec {
  return framed(raw_buildHorizontalAsymptoteScene())
}
function raw_buildHorizontalAsymptoteScene(): SceneSpec {
  const { u, uy, probes } = HA
  const S = (x: number, y: number): V3 => P(x * u, y * uy - 1.2)
  return {
    id: 'math-horizontal-asymptote',
    title: 'Horizontal asymptote: where the graph levels off',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show horizontal asymptotes by comparing degrees: for (2x² + 1)/(x² + 1) the degrees match, so the graph approaches the ratio of leading coefficients, y = 2; for 4/(x² + 1) the top has lower degree, so it approaches y = 0.',
    ariaLabel:
      'Two curves with dashed horizontal lines. The blue curve of 2 x squared plus 1 over x squared plus 1 dips to height 1 at x equals 0 and rises to level off at the dashed line y equals 2 on both sides. The red curve of 4 over x squared plus 1 is a hump of height 4 at 0 that falls toward the x-axis, the line y equals 0. Marked points at x 4 and 6 show the first curve at 1.94 and 1.97, ever closer to 2.',
    stage: NO_STAGE,
    steps: [
      { narration: 'f(x) = (2x² + 1) ÷ (x² + 1): numerator and denominator have the SAME degree (2). Divide top and bottom by x²: f → 2 ÷ 1 = 2 as x → ±∞. The graph levels off at the dashed line y = 2.', objects: [...mathAxes(S, -7.4, 7.4, -0.4, 4.7), curve(sampleMapped(haF, -7, 7, S, 80), ROLE.output), line(S(-7.2, 2), S(7.2, 2), ROLE.aid, 0.03), label('deg p = deg q: y = 2/1 = 2', P(0, S(0, 2.9)[1] + 0.2), ROLE.output, 'primary')] },
      { narration: 'g(x) = 4 ÷ (x² + 1): the numerator has LOWER degree (0) than the denominator (2), so g → 0: the x-axis itself, y = 0, is the horizontal asymptote.', objects: [curve(sampleMapped(haG, -7, 7, S, 80), ROLE.input), label('deg p < deg q: y = 0', P(S(4.2, 0)[0], S(0, 1.0)[1] + 0.2), ROLE.input, 'primary')] },
      { narration: 'Numbers confirm it: f(4) = 33 ÷ 17 ≈ 1.94 and f(6) = 73 ÷ 37 ≈ 1.97, each closer to 2. The graph can cross a horizontal asymptote at finite x, but its end behaviour is pinned to it.', objects: [...probes.map((x) => dot(S(x, haF(x)), ROLE.result, 0.1)), label('f(4) ≈ 1.94, f(6) ≈ 1.97', P(S(4.5, 0)[0] - 0.4, S(0, 2.6)[1] + 0.5), ROLE.result, 'primary')] },
    ],
  }
}

// ── 11. Piecewise-defined function ───────────────────────────────────────────

/** f(x) = −x (x < 0); x² (0 ≤ x < 2); 6 − x (x ≥ 2). A bad last piece 7 − x would jump at x = 2. */
export const PIECE = { u: 0.65, mid: 0.6, midY: 1.5 } as const
export const pieceF = (x: number) => (x < 0 ? -x : x < 2 ? x * x : 6 - x)
export const pieceBad = (x: number) => 7 - x

/** KG: different expressions on different intervals; continuity requires the pieces to agree at the breakpoints. */
export function buildPiecewiseFunctionScene(): SceneSpec {
  return framed(raw_buildPiecewiseFunctionScene())
}
function raw_buildPiecewiseFunctionScene(): SceneSpec {
  const { u, mid, midY } = PIECE
  const S = (x: number, y: number): V3 => P((x - mid) * u, (y - midY) * u)
  return {
    id: 'math-piecewise-function',
    title: 'Piecewise-defined function and continuity',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show a piecewise function f = −x for x < 0, x² for 0 ≤ x < 2, 6 − x for x ≥ 2: the pieces meet at the breakpoints (both sides give 0 at x = 0 and 4 at x = 2), so f is continuous; changing the last piece to 7 − x would leave a jump of 1 at x = 2.',
    ariaLabel:
      'A graph made of three pieces: a falling line y equals minus x for x below 0, a parabola y equals x squared from 0 to 2, and a falling line y equals 6 minus x from 2 onward. The pieces join without a gap at the points 0, 0 and 2, 4. A red line 7 minus x starting at 2 with a closed dot at height 5 shows what a mismatch would look like: a jump of 1 above the open circle at 2, 4.',
    stage: NO_STAGE,
    steps: [
      { narration: 'A piecewise function uses a different formula on each interval: f(x) = −x for x < 0, x² for 0 ≤ x < 2, and 6 − x for x ≥ 2. Each piece is drawn only on its own interval.', objects: [...mathAxes(S, -3.4, 4.4, -0.8, 4.8), line(S(-3, 3), S(0, 0), ROLE.output, 0.06), curve(sampleMapped((x) => x * x, 0, 2, S, 24), ROLE.result), line(S(2, 4), S(4, 2), ROLE.input, 0.06), label('−x', P(S(-1.8, 0)[0], S(0, 2.7)[1]), ROLE.output, 'primary'), label('x²', P(S(1, 0)[0] - 0.2, S(0, 2.6)[1]), ROLE.result, 'primary'), label('6 − x', P(S(3.4, 0)[0] + 0.3, S(0, 3.4)[1]), ROLE.input, 'primary')] },
      { narration: 'The function is continuous only if the pieces agree at each breakpoint. At x = 0: −x → 0 from the left and x² = 0 on the right. At x = 2: x² = 4 and 6 − 2 = 4. Both match, so there is no gap or jump.', objects: [dot(S(0, 0), ROLE.ink, 0.12), dot(S(2, 4), ROLE.ink, 0.12), label('0 = 0', P(S(0, 0)[0] - 0.6, S(0, -0.6)[1]), ROLE.ink, 'primary'), label('4 = 4', P(S(2, 0)[0] + 0.3, S(0, 4.5)[1]), ROLE.ink, 'primary')] },
      { narration: 'Compare a mismatch: if the last piece were 7 − x, its value at x = 2 would be 5 but x² gives 4. The graph would jump by 1 at x = 2 (open circle at 4, closed dot at 5): discontinuous.', objects: [line(S(2, 5), S(4, 3), ROLE.input, 0.04), dot(S(2, 5), ROLE.input, 0.1), ring(S(2, 4)[0], S(0, 4)[1], ROLE.input, 0.14), label('7 − x: jump at x = 2', P(S(3.2, 0)[0] + 0.4, S(0, 4.5)[1] + 0.2), ROLE.input, 'primary')] },
    ],
  }
}

// ── 12. Monotonic function ───────────────────────────────────────────────────

/** Three panels: increasing (x³ + 3x)/4, decreasing −(x³ + 3x)/4, and neither x³ − 3x. */
export const MONO = { centres: [-3.4, 0, 3.4], ux: 0.6, uy: 0.34, probes: { inc: [-1, 1], dec: [-1, 1], neither: [[-2, -1], [-1, 1]] } } as const
export const monoInc = (x: number) => (x ** 3 + 3 * x) / 4
export const monoDec = (x: number) => -monoInc(x)
export const monoNeither = (x: number) => x ** 3 - 3 * x

/** KG: entirely increasing (a < b ⇒ f(a) < f(b)) or entirely decreasing; strictly monotonic functions are injective. */
export function buildMonotonicFunctionScene(): SceneSpec {
  return framed(raw_buildMonotonicFunctionScene())
}
function raw_buildMonotonicFunctionScene(): SceneSpec {
  const { centres, ux, uy, probes } = MONO
  const S = (k: number) => (x: number, y: number): V3 => P(centres[k] + x * ux, y * uy)
  const axesOf = (k: number) => mathAxes(S(k), -2.3, 2.3, -4.4, 4.4)
  const [a, b] = probes.inc
  return {
    id: 'math-monotonic-function',
    title: 'Monotonic function: always rising or always falling',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show monotonicity: f(x) = (x³ + 3x)/4 is increasing (a < b gives f(a) < f(b)), its negative is decreasing, but x³ − 3x rises then falls then rises, so it is not monotonic; a strictly monotonic function never repeats a height, hence it is injective.',
    ariaLabel:
      'Three graphs, each with the vertical scale compressed. Left: the curve of x cubed plus 3 x over 4 rises everywhere; two marked points at x minus 1 and x 1 have heights minus 1 and 1, left lower than right. Middle: its negative falls everywhere; the same two inputs give heights 1 and minus 1. Right: x cubed minus 3 x rises, falls and rises again; one pair of points shows a rise and another a fall, so it is neither always increasing nor always decreasing.',
    stage: NO_STAGE,
    steps: [
      { narration: 'f(x) = (x³ + 3x) ÷ 4 is INCREASING: whenever a < b, f(a) < f(b). Take a = −1 and b = 1: f(−1) = −1 < f(1) = 1. The graph never turns back down.', objects: [...axesOf(0), curve(sampleMapped(monoInc, -2.1, 2.1, S(0), 50), ROLE.output), dot(S(0)(a, monoInc(a)), ROLE.output, 0.11), dot(S(0)(b, monoInc(b)), ROLE.output, 0.11), label('increasing', P(centres[0], 1.8), ROLE.output, 'primary')] },
      { narration: 'g(x) = −f(x) is DECREASING: a < b gives g(a) > g(b). Now g(−1) = 1 > g(1) = −1. The graph never turns back up.', objects: [...axesOf(1), curve(sampleMapped(monoDec, -2.1, 2.1, S(1), 50), ROLE.input), dot(S(1)(a, monoDec(a)), ROLE.input, 0.11), dot(S(1)(b, monoDec(b)), ROLE.input, 0.11), label('decreasing', P(centres[1], 1.8), ROLE.input, 'primary')] },
      { narration: 'h(x) = x³ − 3x is NEITHER: from x = −2 to −1 it rises (−2 → 2) but from x = −1 to 1 it falls (2 → −2). A strictly monotonic function never repeats a height, so it is injective; h repeats heights and is not.', objects: [...axesOf(2), curve(sampleMapped(monoNeither, -2.2, 2.2, S(2), 60), ROLE.ink), line(S(2)(-2, monoNeither(-2)), S(2)(-1, monoNeither(-1)), ROLE.result, 0.05), line(S(2)(-1, monoNeither(-1)), S(2)(1, monoNeither(1)), ROLE.input, 0.05), label('rises then falls', P(centres[2], 1.8), ROLE.ink, 'primary'), label('strictly monotonic ⇒ injective', P(0, -2.2), ROLE.result, 'primary')] },
    ],
  }
}
