/**
 * Core school-mathematics figures — batch 19 of the mathematics visual campaign
 * (2026-10-12): differential equations. Slope fields, Euler's method, the damped harmonic
 * oscillator, resonance, stability of equilibria, Fourier series (partial sums, the Gibbs
 * overshoot, sine and cosine series) and the three model PDEs with their classification.
 * `math.num.euler-method` is registered to the Euler figure of `math.de.euler-method`.
 *
 * Same rules as batches 1-18: one visual language from visualDesign.ts, labels are names not
 * sentences (marks of 1-2 characters are free), steps are cumulative, coordinates stay inside
 * +-5, at most 50 objects per step, nothing the figure audit rejects (SM-01 evaluates the
 * arithmetic in a label left to right and compares labels that share a last token before "="),
 * and every number drawn comes from the constants and pure helpers exported here, which the test
 * file re-derives from the DRAWN coordinates (curves are checked against the equation they
 * claim to solve, not against the generator).
 */

import type { SceneSpec, SceneObject } from '@/lib/teaching/sceneSpec'
import { ROLE, arrow, curve, dot, label, line } from './visualDesign'
import { P, NO_STAGE, framed, mathAxes, sampleMapped, arcPts, type V3, type XY } from './mathSceneKit'

const TAU = 2 * Math.PI
const f2 = (n: number) => (Math.round(n * 100) / 100).toFixed(2)

// ── 1. Slope field ───────────────────────────────────────────────────────────

/** y′ = x − y: a short tangent segment at every lattice point; the solution through (0, 1) is y = x − 1 + 2e^(−x). */
export const SLF = { ox: 0, oy: 0.3, u: 0.7, x: [-3, 3] as readonly number[], y: [-2, 3] as readonly number[], half: 0.32 }
export const slopeF = (x: number, y: number) => x - y
export const slopeSol = (x: number) => x - 1 + 2 * Math.exp(-x)

/** KG: a slope field draws a short tangent segment at a grid of points, showing the solutions' behaviour without solving. */
export function buildSlopeFieldScene(): SceneSpec {
  return framed(raw_buildSlopeFieldScene())
}
function raw_buildSlopeFieldScene(): SceneSpec {
  const { ox, oy, u, x, y, half } = SLF
  const G = (px: number, py: number): V3 => P(ox + px * u, oy + py * u)
  const segs: SceneObject[] = []
  for (let px = x[0]; px <= x[1]; px++) for (let py = y[0]; py <= y[1]; py++) {
    const m = slopeF(px, py), n = Math.hypot(1, m), hx = (half / n), hy = (half * m) / n
    segs.push(line(G(px - hx, py - hy), G(px + hx, py + hy), ROLE.reference, 0.025))
  }
  return {
    id: 'math-slope-field',
    title: 'Slope field of y′ = x − y',
    sceneType: 'diagram',
    cameraDistance: 12,
    teachingGoal: 'Show a slope field: for y′ = x − y a short segment of slope x − y is drawn at each grid point, so the field shows at a glance where solutions rise (y below x), fall (y above x) and are flat (on the line y = x); the solution through (0, 1) follows the segments like a river current and settles toward the line y = x − 1.',
    ariaLabel:
      'A grid of short grey line segments at integer points, each tilted to the slope x minus y: steeply up where y is far below x, steeply down where y is far above x, and flat along the violet diagonal y equals x. A green curve through the point (0, 1) glides along the segments, dropping and then following a line parallel to the diagonal.',
    stage: NO_STAGE,
    steps: [
      { narration: 'The ODE y′ = x − y says what the SLOPE of a solution is at every point. At each lattice point (x, y) draw a short segment with slope x − y: steep up where x − y is large, flat where it is 0, down where it is negative.', objects: [...mathAxes(G, x[0] - 0.6, x[1] + 0.6, y[0] - 0.6, y[1] + 0.6), ...segs, label('y′ = x − y', P(ox + 2.6 * u, oy + 3.7 * u), ROLE.ink, 'primary')] },
      { narration: 'A solution is a curve that is tangent to the segments wherever it goes. Start at (0, 1) and follow the field: the solution y = x − 1 + 2e^(−x) (green) falls at first, then flattens into a line parallel to y = x.', objects: [curve(sampleMapped(slopeSol, -0.9, 3, G, 64), ROLE.result), dot(G(0, 1), ROLE.result, 0.13), label('through (0, 1)', P(ox + 0.4 * u - 1.6, oy + 2.6 * u), ROLE.result, 'primary')] },
      { narration: 'Where the segments are flat the slope is 0: x − y = 0, the line y = x (violet). Solutions cross it horizontally, and above it they fall, below it they rise — all of them squeezing toward the line y = x − 1 without ever being solved explicitly.', objects: [line(G(-2, -2), G(3, 3), ROLE.aid, 0.03), label('flat on y = x', P(ox + 3.0 * u + 0.4, oy + 3.4 * u), ROLE.aid, 'primary')] },
    ],
  }
}

// ── 2. Euler's method ────────────────────────────────────────────────────────

/** y′ = y, y(0) = 1: Euler steps of h = 0.5 and h = 0.25 against the exact e^x; yₙ₊₁ = yₙ + h·yₙ. */
export const EUL = { ox: -4.0, oy: -2.0, ux: 1.8, uy: 0.45, h: [0.5, 0.25] as readonly number[], x1: 2 }
export const eulerPath = (h: number, x1: number): Array<[number, number]> => { const out: Array<[number, number]> = [[0, 1]]; let y = 1; for (let i = 1; i <= Math.round(x1 / h); i++) { y += h * y; out.push([i * h, y]) } return out }

/** KG: yₙ₊₁ = yₙ + h f(xₙ, yₙ); the global error is O(h). */
export function buildEulerMethodScene(): SceneSpec {
  return framed(raw_buildEulerMethodScene())
}
function raw_buildEulerMethodScene(): SceneSpec {
  const { ox, oy, ux, uy, h, x1 } = EUL
  const G = (px: number, py: number): V3 => P(ox + px * ux, oy + py * uy)
  const [p1, p2] = [eulerPath(h[0], x1), eulerPath(h[1], x1)]
  const path = (pts: Array<[number, number]>, color: string, t: number, r: number) => [...pts.slice(0, -1).map((p, i) => line(G(p[0], p[1]), G(pts[i + 1][0], pts[i + 1][1]), color, t)), ...pts.map((p) => dot(G(p[0], p[1]), color, r))]
  return {
    id: 'math-euler-method',
    title: "Euler's method: step along the tangent",
    sceneType: 'diagram',
    cameraDistance: 12,
    teachingGoal: "Show Euler's method for y′ = y, y(0) = 1: from (xₙ, yₙ) step h along the tangent, yₙ₊₁ = yₙ + h·f(xₙ, yₙ) = yₙ(1 + h). With h = 0.5 four steps reach y(2) ≈ 5.06 against the exact e² ≈ 7.39; halving the step to h = 0.25 (eight steps) reaches 5.96, closer — the global error shrinks in proportion to h (error O(h)).",
    ariaLabel:
      'A blue curve rising from (0, 1), the exact solution e to the x. In the second step a red broken line of four straight segments starts at the same point and stays below the curve, ending at 5.06 where the exact value is 7.39. In the third step a green broken line of eight shorter segments follows the curve more closely and ends at 5.96. Captions give the update rule and the end values.',
    stage: NO_STAGE,
    steps: [
      { narration: 'The exact solution of y′ = y, y(0) = 1 is eˣ (blue). Euler\'s method will approximate it WITHOUT knowing it, using only the slope y′ = f(x, y) = y at each point.', objects: [...mathAxes(G, -0.15, x1 + 0.5, -0.3, 8.2), label('y', P(-1.75, 2.4), ROLE.ink, 'primary'), curve(sampleMapped(Math.exp, 0, x1, G, 50), ROLE.output), label('exact 7.39', P(ox + x1 * ux - 0.1, oy + Math.exp(x1) * uy + 0.5), ROLE.output, 'primary')] },
      { narration: 'Step h = 0.5 along the tangent: yₙ₊₁ = yₙ + h·yₙ = 1.5 yₙ, so y = 1, 1.5, 2.25, 3.375, 5.0625 at x = 0, 0.5, 1, 1.5, 2. Each segment is tangent at its LEFT end, so the path falls behind the rising curve: error 2.33 at x = 2.', objects: [...path(p1, ROLE.input, 0.04, 0.09), label('h 0.5: 5.06', P(ox + x1 * ux + 0.55, oy + p1[p1.length - 1][1] * uy - 0.45), ROLE.input, 'primary')] },
      { narration: 'Halve the step to h = 0.25 (eight steps, factor 1.25 each): y(2) ≈ 5.96, error 1.43 — noticeably closer. The error shrinks roughly in proportion to h, which is what "global error O(h)" means; Euler is simple but needs small steps.', objects: [...path(p2, ROLE.result, 0.03, 0.07), label('h 0.25: 5.96', P(ox + x1 * ux + 0.55, oy + p2[p2.length - 1][1] * uy + 0.45), ROLE.result, 'primary'), label('yₙ₊₁ = yₙ + h f(xₙ, yₙ)', P(-1.2, -3.2), ROLE.ink, 'primary')] },
    ],
  }
}

// ── 3. Harmonic oscillator ───────────────────────────────────────────────────

/** x″ + b x′ + 4x = 0, x(0) = 1, x′(0) = 0 with m = 1, k = 4: underdamped b = 1, critical b = 4 (b² = 4mk), overdamped b = 6. */
export const HO = { ox: -3.9, oy: -0.9, ut: 1.3, ux: 1.9, T: 6, m: 1, k: 4, bs: { under: 1, crit: 4, over: 6 } }
export const hoUnder = (t: number) => { const b = HO.bs.under, w = Math.sqrt(HO.k / HO.m - (b * b) / (4 * HO.m * HO.m)); return Math.exp(-(b / 2 / HO.m) * t) * (Math.cos(w * t) + (b / (2 * HO.m * w)) * Math.sin(w * t)) }
export const hoCrit = (t: number) => (1 + (HO.bs.crit / 2 / HO.m) * t) * Math.exp(-(HO.bs.crit / 2 / HO.m) * t)
export const hoOver = (t: number) => { const b = HO.bs.over, d = Math.sqrt(b * b - 4 * HO.m * HO.k), r1 = (-b + d) / (2 * HO.m), r2 = (-b - d) / (2 * HO.m), c1 = -r2 / (r1 - r2), c2 = 1 - c1; return c1 * Math.exp(r1 * t) + c2 * Math.exp(r2 * t) }
export const discriminant = (b: number) => b * b - 4 * HO.m * HO.k

/** KG: my″ + by′ + ky = 0 is underdamped (b² < 4mk), critically damped (b² = 4mk) or overdamped (b² > 4mk). */
export function buildHarmonicOscillatorScene(): SceneSpec {
  return framed(raw_buildHarmonicOscillatorScene())
}
function raw_buildHarmonicOscillatorScene(): SceneSpec {
  const { ox, oy, ut, ux, T } = HO
  const G = (t: number, x: number): V3 => P(ox + t * ut, oy + x * ux)
  return {
    id: 'math-harmonic-oscillator',
    title: 'Damped oscillator: three kinds of motion',
    sceneType: 'diagram',
    cameraDistance: 12,
    teachingGoal: 'Show the three damping regimes of my″ + by′ + ky = 0 with m = 1, k = 4, released from x = 1 at rest: underdamped (b = 1, b² < 4mk) oscillates inside a decaying envelope and crosses zero repeatedly; critically damped (b = 4, b² = 4mk) returns to 0 fastest without overshoot; overdamped (b = 6, b² > 4mk) creeps back slowly with no oscillation.',
    ariaLabel:
      'A graph of displacement against time from 0 to 6. A blue curve starts at 1 and swings below zero and back several times with shrinking swings; a green curve falls smoothly to zero without crossing it; a red curve falls more slowly and also never crosses zero. A legend labels them underdamped with b squared less than 4mk, critical with b squared equals 4mk and overdamped with b squared greater than 4mk.',
    stage: NO_STAGE,
    steps: [
      { narration: 'A mass on a spring with friction: m x″ + b x′ + k x = 0, released from x = 1 at rest. With little friction (b = 1, b² < 4mk) it OSCILLATES while the swings die away: underdamped (blue).', objects: [...mathAxes(G, -0.2, T + 0.3, -0.6, 1.25), label('x', P(-3.5, 1.5), ROLE.ink, 'primary'), curve(sampleMapped(hoUnder, 0, T, G, 120), ROLE.output), label('underdamped: b² < 4mk', P(2.0, 0.8), ROLE.output, 'primary')] },
      { narration: 'With exactly b² = 4mk (b = 4) the motion is critically damped (green): the fastest return to 0 with no overshoot. With more friction (b = 6, b² > 4mk) it is overdamped (red): no oscillation, but a slower, sluggish return.', objects: [curve(sampleMapped(hoCrit, 0, T, G, 90), ROLE.result), curve(sampleMapped(hoOver, 0, T, G, 90), ROLE.input), label('critical: b² = 4mk', P(2.0, 0.2), ROLE.result, 'primary'), label('overdamped: b² > 4mk', P(2.0, -0.4), ROLE.input, 'primary')] },
      { narration: 'The sign of the discriminant b² − 4mk decides: negative → oscillation (complex roots), zero → the repeated root of critical damping, positive → two real decay rates (overdamped).', objects: [label('sign of b² − 4mk decides', P(0, 2.2), ROLE.ink, 'primary')] },
    ],
  }
}

// ── 4. Resonance ─────────────────────────────────────────────────────────────

/** x″ + x = cos(ωt), x(0) = x′(0) = 0: ω = 0.7 stays bounded by 2/(1 − ω²); ω = 1 (resonance) grows like (t/2) sin t. */
export const RES = { ox: -4.0, oy: 0, ut: 0.5, ux: 0.28, T: 16, w: 0.7 }
export const resOff = (t: number, w: number = RES.w) => (Math.cos(w * t) - Math.cos(t)) / (1 - w * w)
export const resOn = (t: number) => (t / 2) * Math.sin(t)

/** KG: forcing at the natural frequency of an undamped oscillator makes the amplitude grow without bound (pure resonance). */
export function buildResonanceScene(): SceneSpec {
  return framed(raw_buildResonanceScene())
}
function raw_buildResonanceScene(): SceneSpec {
  const { ox, oy, ut, ux, T, w } = RES
  const G = (t: number, x: number): V3 => P(ox + t * ut, oy + x * ux)
  return {
    id: 'math-resonance',
    title: 'Resonance: forcing at the natural frequency',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show resonance for x″ + x = cos ωt (natural frequency 1) started from rest: forcing at ω = 0.7 gives a bounded response that beats (amplitude never above 2/(1 − ω²) ≈ 3.9), while forcing exactly at ω = 1 makes the swings grow without bound, x = (t/2) sin t, inside the envelope ±t/2.',
    ariaLabel:
      'A graph of displacement against time from 0 to 16. A blue curve oscillates in a slow beat pattern, never exceeding about 3.9 either way. A red curve oscillates with steadily growing swings, reaching about 8, between two violet straight lines from the origin that rise and fall like plus and minus t over 2. Captions say omega 0.7 bounded and omega 1 grows like t over 2.',
    stage: NO_STAGE,
    steps: [
      { narration: 'Push an undamped spring (natural frequency 1) with a force cos ωt. Off resonance, ω = 0.7: the response beats — it swells and shrinks but never exceeds 2/(1 − ω²) ≈ 3.9 (blue).', objects: [...mathAxes(G, -0.4, T + 0.5, -8.6, 8.6), curve(sampleMapped((t) => resOff(t, w), 0, T, G, 220), ROLE.output), label('ω 0.7: bounded', P(ox + 12.5 * ut, oy + 5.9 * ux), ROLE.output, 'primary')] },
      { narration: 'Push at exactly the natural frequency, ω = 1: every push adds to the swing, and the amplitude grows steadily — x = (t/2) sin t (red), swinging between the lines ±t/2 (violet). No damping, so nothing stops it: pure resonance.', objects: [curve(sampleMapped(resOn, 0, T, G, 220), ROLE.input), line(G(0, 0), G(T, T / 2), ROLE.aid, 0.02), line(G(0, 0), G(T, -T / 2), ROLE.aid, 0.02), label('ω 1: grows like t/2', P(ox + 10.2 * ut, oy - 7.6 * ux - 0.4), ROLE.input, 'primary')] },
      { narration: 'The only difference is the forcing frequency: matched to the natural frequency the response grows without bound; a little off, it stays bounded. In a damped system the peak is finite and slightly shifted (practical resonance).', objects: [label('matched: unbounded', P(2.2, 3.4), ROLE.input, 'primary'), label('off: bounded', P(-3.0, 3.4), ROLE.output, 'primary')] },
    ],
  }
}

// ── 5. Stability analysis ────────────────────────────────────────────────────

/** y′ = f(y) = y(1 − y): equilibria 0 (unstable, f′(0) = 1 > 0) and 1 (stable, f′(1) = −1 < 0); the flow runs right where f > 0, left where f < 0. */
export const STB = { ox: -1.5, oy: 0.4, uy: 3.0, uf: 3.5, y: [-0.5, 1.5] as readonly number[], lineY: -3.2 }
export const stabF = (y: number) => y * (1 - y)
export const stabDF = (y: number) => 1 - 2 * y

/** KG: an equilibrium is stable if nearby solutions stay near (asymptotically if they converge); linearisation f′(y*) decides. */
export function buildStabilityAnalysisScene(): SceneSpec {
  return framed(raw_buildStabilityAnalysisScene())
}
function raw_buildStabilityAnalysisScene(): SceneSpec {
  const { ox, oy, uy, uf, y, lineY } = STB
  const G = (py: number, pf: number): V3 => P(ox + py * uy, oy + pf * uf)
  const X = (py: number) => ox + py * uy
  return {
    id: 'math-stability-analysis',
    title: 'Stability of equilibria: y′ = y(1 − y)',
    sceneType: 'diagram',
    cameraDistance: 12,
    teachingGoal: 'Show stability for y′ = f(y) = y(1 − y): the equilibria are where f(y) = 0, namely y = 0 and y = 1; between them f > 0 so y increases (flow to the right), outside f < 0 so y decreases; the arrows therefore flow away from 0 (unstable, f′(0) = 1 > 0) and toward 1 (asymptotically stable, f′(1) = −1 < 0).',
    ariaLabel:
      'Top: the parabola f of y equals y times (1 minus y) crossing the horizontal axis at y equals 0 and y equals 1 with a peak between them. Below it a horizontal phase line with arrows: red arrows pointing left on y below 0 and above 1, green arrows pointing right between 0 and 1. An open circle at 0 is labelled unstable and a solid dot at 1 is labelled stable, with the derivative labels f prime of 0 is 1 and f prime of 1 is minus 1.',
    stage: NO_STAGE,
    steps: [
      { narration: 'Plot the right-hand side f(y) = y(1 − y) of y′ = f(y). It is zero at y = 0 and y = 1: those are the equilibria (constant solutions).', objects: [...mathAxes(G, y[0] - 0.1, y[1] + 0.1, -0.8, 0.5), curve(sampleMapped(stabF, y[0], y[1], G, 60), ROLE.output), dot(G(0, 0), ROLE.aid, 0.13), dot(G(1, 0), ROLE.result, 0.13), label('f(y)', P(X(1.45) + 0.3, oy + 0.15), ROLE.output, 'primary')] },
      { narration: 'Between 0 and 1, f > 0: y′ > 0 so y increases — the flow goes RIGHT (green). Below 0 and above 1, f < 0: y decreases — the flow goes LEFT (red). Draw this on the phase line.', objects: [line(P(X(y[0]), lineY), P(X(y[1]), lineY), ROLE.reference, 0.03), arrow(P(X(0.12), lineY + 0.35), P(X(0.45), lineY + 0.35), ROLE.result), arrow(P(X(0.55), lineY + 0.35), P(X(0.88), lineY + 0.35), ROLE.result), arrow(P(X(-0.08), lineY + 0.35), P(X(-0.4), lineY + 0.35), ROLE.input), arrow(P(X(1.45), lineY + 0.35), P(X(1.12), lineY + 0.35), ROLE.input)] },
      { narration: 'Near y = 0 the arrows point away: unstable (open circle), and f′(0) = 1 > 0 agrees. Near y = 1 they point in: asymptotically stable (solid dot), f′(1) = −1 < 0. Linearisation decides: negative slope at the equilibrium means stable.', objects: [curve(arcPts(X(0), lineY, 0.17, 0, 360, 24), ROLE.aid), dot(P(X(1), lineY), ROLE.result, 0.15), label('unstable', P(X(0), lineY - 0.7), ROLE.aid, 'primary'), label('stable', P(X(1), lineY - 0.7), ROLE.result, 'primary'), label('f′(0) = 1', P(X(0) - 0.4, oy + 1.7), ROLE.aid, 'primary'), label('f′(1) = −1', P(X(1) + 0.6, oy + 1.7), ROLE.result, 'primary')] },
    ],
  }
}

// ── 6. Fourier series ────────────────────────────────────────────────────────

/** Square wave ±1 and its partial sums S_N = (4/π) Σ sin(kx)/k over odd k ≤ N (N = 1, 3, 5) on [−π, π]. */
export const FS = { ux: 1.3, uy: 1.4, oy: 0, N: [1, 3, 5] as readonly number[] }
export const squareWave = (x: number) => (Math.sin(x) >= 0 ? 1 : -1)
export const partialSquare = (x: number, N: number) => { let s = 0; for (let k = 1; k <= N; k += 2) s += Math.sin(k * x) / k; return (4 / Math.PI) * s }

/** KG: f(x) = a₀/2 + Σ(aₙ cos nx + bₙ sin nx) with coefficients from orthogonality integrals. */
export function buildFourierSeriesScene(): SceneSpec {
  return framed(raw_buildFourierSeriesScene())
}
function raw_buildFourierSeriesScene(): SceneSpec {
  const { ux, uy, oy, N } = FS
  const G = (x: number, y: number): V3 => P(x * ux, oy + y * uy)
  const colors = [ROLE.output, ROLE.input, ROLE.result]
  return {
    id: 'math-fourier-series',
    title: 'Fourier series: building a square wave from sines',
    sceneType: 'diagram',
    cameraDistance: 12,
    teachingGoal: 'Show a Fourier series: the square wave (−1 on (−π, 0), +1 on (0, π)) is the sum of sines, f(x) = (4/π)(sin x + sin 3x/3 + sin 5x/5 + …), with coefficients bₙ = (1/π)∫ f(x) sin nx dx = 4/(nπ) for odd n and 0 for even n (and every aₙ = 0 because the wave is odd). One sine is a crude hump; each added term squares the corners more.',
    ariaLabel:
      'A grey square wave: the line at minus 1 from minus pi to 0 and the line at plus 1 from 0 to pi, joined by a vertical step at 0. A blue single sine hump, then a red curve with three terms that flattens the top, then a green curve with five terms that is flatter still and wiggles slightly, all hugging the square wave more closely as terms are added.',
    stage: NO_STAGE,
    steps: [
      { narration: 'The square wave f: −1 on (−π, 0) and +1 on (0, π), repeating. Its Fourier coefficients are bₙ = (1/π)∫f(x) sin nx dx = 4/(nπ) for odd n, 0 for even n; only sines appear because f is odd.', objects: [...mathAxes(G, -3.7, 3.7, -1.4, 1.4), line(G(-Math.PI, -1), G(0, -1), ROLE.reference, 0.03), line(G(0, 1), G(Math.PI, 1), ROLE.reference, 0.03), line(G(0, -1), G(0, 1), ROLE.reference, 0.02), label('square wave', P(0, 2.4), ROLE.ink, 'primary')] },
      { narration: 'One term: S₁ = (4/π) sin x (blue) — a smooth hump with the right area but rounded corners and an overshoot at the middle (4/π ≈ 1.27).', objects: [curve(sampleMapped((x) => partialSquare(x, N[0]), -Math.PI, Math.PI, G, 100), colors[0]), label('S₁', P(-3.3, 1.3), colors[0], 'primary')] },
      { narration: 'Add the next odd harmonics: S₃ = (4/π)(sin x + sin 3x/3) (red) and S₅ = S₃ + (4/5π) sin 5x (green). Each term sharpens the corners and flattens the tops toward ±1 — the series converges to the square wave.', objects: [curve(sampleMapped((x) => partialSquare(x, N[1]), -Math.PI, Math.PI, G, 140), colors[1]), curve(sampleMapped((x) => partialSquare(x, N[2]), -Math.PI, Math.PI, G, 180), colors[2]), label('S₃', P(-3.3, 1.85), colors[1], 'primary'), label('S₅', P(-3.3, 2.4), colors[2], 'primary')] },
    ],
  }
}

// ── 7. Convergence of Fourier series (Gibbs) ─────────────────────────────────

/** Near the jump of the square wave the partial sums S₉ and S₂₉ overshoot to ≈ 1.179, about 9 % of the jump size 2, and equal 0 (the midpoint) AT the jump. */
export const FC = { ux: 2.6, uy: 1.7, x: [-1.5, 1.5] as readonly number[], N: [9, 29] as readonly number[] }
export const gibbsPeak = (N: number) => partialSquare(Math.PI / (N + 1), N)
export const GIBBS_LIMIT = (2 / Math.PI) * 1.8519370519824662                                                                                      // (2/π)·Si(π) ≈ 1.17898

/** KG: Dirichlet — at a jump the series converges to the midpoint; near it the overshoot stays ≈ 9 % (Gibbs). */
export function buildFourierConvergenceScene(): SceneSpec {
  return framed(raw_buildFourierConvergenceScene())
}
function raw_buildFourierConvergenceScene(): SceneSpec {
  const { ux, uy, x, N } = FC
  const G = (px: number, py: number): V3 => P(px * ux, py * uy)
  return {
    id: 'math-fourier-convergence',
    title: 'Convergence at a jump: midpoint and Gibbs overshoot',
    sceneType: 'diagram',
    cameraDistance: 12,
    teachingGoal: 'Show how Fourier series behave at a jump (Dirichlet): the partial sums of the square wave pass through the MIDPOINT of the jump, (−1 + 1)/2 = 0, exactly at x = 0; and just beside the jump S₉ and S₂₉ overshoot to ≈ 1.179 — about 9 % of the jump size 2 — and more terms squeeze the overshoot toward the jump but do not make it smaller (Gibbs phenomenon).',
    ariaLabel:
      'A close-up of the square wave at its jump at x equals 0: grey horizontal lines at minus 1 on the left and plus 1 on the right joined by a vertical grey step. A blue partial sum with 9 terms and a red one with 29 terms rise steeply through the origin, where a green dot marks the midpoint 0, and overshoot above plus 1 and below minus 1 near the jump; a violet horizontal line at 1.179 marks the overshoot level, captioned overshoot about 9 percent.',
    stage: NO_STAGE,
    steps: [
      { narration: 'Zoom in on the jump of the square wave at x = 0, where f jumps from −1 up to +1 (grey). Add up to 9 sine terms (blue): the partial sum S₉ climbs through the jump in a steep ramp.', objects: [...mathAxes(G, x[0] - 0.1, x[1] + 0.1, -1.5, 1.5), line(G(x[0], -1), G(0, -1), ROLE.reference, 0.03), line(G(0, 1), G(x[1], 1), ROLE.reference, 0.03), line(G(0, -1), G(0, 1), ROLE.reference, 0.02), curve(sampleMapped((px) => partialSquare(px, N[0]), x[0], x[1], G, 200), ROLE.output), label('S₉', P(-1.1 * ux, -1.4 * uy), ROLE.output, 'primary')] },
      { narration: 'At the jump itself every partial sum is 0 — the series converges there to the midpoint [f(0⁺) + f(0⁻)]/2 = (1 + (−1))/2 = 0 (green dot), not to either side value. Everywhere else it converges to f.', objects: [dot(G(0, 0), ROLE.result, 0.13), label('midpoint 0', P(1.0 * ux, -0.55 * uy), ROLE.result, 'primary')] },
      { narration: 'Using 29 terms (red) the ramp is steeper and the wiggles are squeezed against the jump — but the first overshoot peak is STILL ≈ 1.179, about 9 % of the jump size 2 (violet level). Adding terms moves the overshoot closer to the jump without lowering it: the Gibbs phenomenon.', objects: [curve(sampleMapped((px) => partialSquare(px, N[1]), x[0], x[1], G, 300), ROLE.input), line(G(x[0], GIBBS_LIMIT), G(x[1], GIBBS_LIMIT), ROLE.aid, 0.02), label('S₂₉', P(-1.1 * ux, 1.4 * uy), ROLE.input, 'primary'), label('overshoot ≈ 9%', P(1.1 * ux, 1.5 * uy + 0.2), ROLE.aid, 'primary')] },
    ],
  }
}

// ── 8. Fourier sine and cosine series ────────────────────────────────────────

/** f(x) = x on [0, π]: the odd extension gives the sine series 2Σ(−1)^(n+1) sin(nx)/n, the even extension the cosine series π/2 − (4/π)Σ_{odd} cos(nx)/n². */
export const FSC = { cx: [-2.5, 2.5] as readonly number[], u: 0.6, Ns: 5, Nc: 5 }
export const sineSeries = (x: number, N: number) => { let s = 0; for (let n = 1; n <= N; n++) s += (n % 2 === 1 ? 2 : -2) * Math.sin(n * x) / n; return s }
export const cosineSeries = (x: number, N: number) => { let s = Math.PI / 2; for (let n = 1; n <= N; n += 2) s -= (4 / (Math.PI * n * n)) * Math.cos(n * x); return s }
/** Numerical coefficient (2/π)∫₀^π x·trig(nx) dx by Simpson's rule. */
export const coefficient = (n: number, kind: 'sin' | 'cos', steps = 2000) => {
  const f = (x: number) => x * (kind === 'sin' ? Math.sin(n * x) : Math.cos(n * x)), h = Math.PI / steps
  let acc = f(0) + f(Math.PI)
  for (let i = 1; i < steps; i++) acc += f(i * h) * (i % 2 === 1 ? 4 : 2)
  return ((2 / Math.PI) * (acc * h)) / 3
}

/** KG: on [0, L] an odd extension gives a pure sine series, an even extension a pure cosine series. */
export function buildFourierSineCosineScene(): SceneSpec {
  return framed(raw_buildFourierSineCosineScene())
}
function raw_buildFourierSineCosineScene(): SceneSpec {
  const { cx, u, Ns, Nc } = FSC
  const L = (x: number, y: number): V3 => P(cx[0] + x * u, y * u)
  const R = (x: number, y: number): V3 => P(cx[1] + x * u, y * u)
  return {
    id: 'math-fourier-sine-cosine',
    title: 'Fourier sine and cosine series on [0, π]',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show that f(x) = x on [0, π] can be expanded in two ways: extend it as an ODD function (the line y = x on (−π, π)) and it needs only sines, x = 2(sin x − sin 2x/2 + sin 3x/3 − …) with bₙ = 2(−1)ⁿ⁺¹/n; extend it as an EVEN function (the triangle |x|) and it needs only cosines, x = π/2 − (4/π)(cos x + cos 3x/9 + cos 5x/25 + …) — which converges faster because |x| has no jump.',
    ariaLabel:
      'Left: the straight grey line y equals x from minus pi to pi, its odd extension, with a blue five-term sine series wiggling about it and swinging sharply at the ends where the extension jumps. Right: the grey triangle graph of the absolute value of x, the even extension, with a green three-term cosine series that already follows it closely. In both panels violet vertical lines mark the interval from 0 to pi where the two expansions agree with f of x equals x.',
    stage: NO_STAGE,
    steps: [
      { narration: 'Take f(x) = x on [0, π]. Extend it to [−π, π] as an ODD function: f(−x) = −f(x), i.e. just the line y = x (grey). An odd function has only sine terms.', objects: [...mathAxes(L, -3.5, 3.5, -3.5, 3.5), line(L(-Math.PI, -Math.PI), L(Math.PI, Math.PI), ROLE.reference, 0.03), line(L(0, -0.2), L(0, 3.4), ROLE.aid, 0.02), line(L(Math.PI, -0.2), L(Math.PI, 3.4), ROLE.aid, 0.02), label('odd extension', P(cx[0], -2.7), ROLE.ink, 'primary')] },
      { narration: 'Its sine series x = Σ bₙ sin nx has bₙ = (2/π)∫₀^π x sin nx dx = 2(−1)ⁿ⁺¹/n: the blue partial sum with 5 terms follows y = x in the middle but swings at the ends, where the periodic extension JUMPS from π to −π.', objects: [curve(sampleMapped((x) => sineSeries(x, Ns), -Math.PI, Math.PI, L, 120), ROLE.output), label('sine series', P(cx[0], 2.6), ROLE.output, 'primary')] },
      { narration: 'Extend it instead as an EVEN function, f(−x) = f(x): the triangle |x| (grey), which has no jump. Its cosine series π/2 − (4/π)(cos x + cos 3x/9 + …) has a₀/2 = π/2, aₙ = −4/(πn²) for odd n, and the green partial sum is already very close to |x|. Both series equal x on [0, π] (violet).', objects: [...mathAxes(R, -3.5, 3.5, -3.5, 3.5), line(R(-Math.PI, Math.PI), R(0, 0), ROLE.reference, 0.03), line(R(0, 0), R(Math.PI, Math.PI), ROLE.reference, 0.03), line(R(0, -0.2), R(0, 3.4), ROLE.aid, 0.02), line(R(Math.PI, -0.2), R(Math.PI, 3.4), ROLE.aid, 0.02), curve(sampleMapped((x) => cosineSeries(x, Nc), -Math.PI, Math.PI, R, 120), ROLE.result), label('even extension', P(cx[1], -2.7), ROLE.ink, 'primary'), label('cosine series', P(cx[1], 2.6), ROLE.result, 'primary')] },
    ],
  }
}

// ── 9. Partial differential equations: classification ───────────────────────

/** A u_xx + B u_xy + C u_yy: Δ = B² − 4AC < 0 elliptic, = 0 parabolic, > 0 hyperbolic; Laplace Δ = −4, heat Δ = 0, wave (c = 1) Δ = +4. */
export const PDEC = { ux: 1.05, y: 1.0, iconY: -1.6, examples: [{ id: 'laplace', A: 1, B: 0, C: 1 }, { id: 'heat', A: 1, B: 0, C: 0 }, { id: 'wave', A: -1, B: 0, C: 1 }] as ReadonlyArray<{ id: string; A: number; B: number; C: number }> }
export const disc = (A: number, B: number, C: number) => B * B - 4 * A * C
export const pdeKind = (d: number) => (d < 0 ? 'elliptic' : d === 0 ? 'parabolic' : 'hyperbolic')

/** KG: second-order linear PDEs are elliptic, parabolic or hyperbolic by the sign of the discriminant B² − 4AC of the principal part. */
export function buildPdeScene(): SceneSpec {
  return framed(raw_buildPdeScene())
}
function raw_buildPdeScene(): SceneSpec {
  const { ux, y, iconY, examples } = PDEC
  const X = (d: number) => d * ux
  const ellipse = arcPts(X(-3.5), iconY, 0.9, 0, 360, 48).map((p) => P(p[0], iconY + (p[1] - iconY) * 0.55))
  const parab = sampleMapped((t) => -t * t * 0.9 + 0.7, -1.0, 1.0, (t, v) => P(X(0) + t * 0.9, iconY + v - 0.2), 24)
  const hyper = (s: number) => sampleMapped((t) => Math.sqrt(1 + t * t) * 0.45, -1.1, 1.1, (t, v) => P(X(3.5) + s * (v + 0.15), iconY + t * 0.75), 24)
  const colors = [ROLE.output, ROLE.result, ROLE.input]
  const names = ['elliptic', 'parabolic', 'hyperbolic']
  return {
    id: 'math-pde',
    title: 'Partial differential equations: elliptic, parabolic, hyperbolic',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show how second-order linear PDEs A u_xx + B u_xy + C u_yy + … = 0 are classified by the discriminant Δ = B² − 4AC of their principal part (exactly as conics are): Δ < 0 elliptic (Laplace: u_xx + u_yy = 0, Δ = −4), Δ = 0 parabolic (heat: u_t = k u_xx, Δ = 0), Δ > 0 hyperbolic (wave: u_tt = c² u_xx, Δ = 4c²).',
    ariaLabel:
      'A horizontal number line for the discriminant with a blue half to the left of zero, a green dot at zero and a red half to the right. Three dots sit on it: Laplace\'s equation at minus 4, the heat equation at 0 and the wave equation at plus 4, each labelled with its equation and its type — elliptic, parabolic, hyperbolic. Below each is a small conic of the same name: an ellipse, a parabola and a hyperbola.',
    stage: NO_STAGE,
    steps: [
      { narration: 'For A u_xx + B u_xy + C u_yy the discriminant Δ = B² − 4AC decides the type, just as it does for conic sections: negative → elliptic (blue), zero → parabolic (green), positive → hyperbolic (red).', objects: [line(P(X(-4.3), y), P(X(0), y), ROLE.output, 0.07), line(P(X(0), y), P(X(4.3), y), ROLE.input, 0.07), dot(P(X(0), y), ROLE.result, 0.15), label('Δ < 0', P(X(-2.2), y + 0.6), ROLE.output, 'primary'), label('Δ > 0', P(X(2.2), y + 0.6), ROLE.input, 'primary')] },
      { narration: 'Laplace\'s equation u_xx + u_yy = 0 has A = 1, B = 0, C = 1: Δ = −4 < 0, elliptic. The heat equation u_t = k u_xx has no second derivative in t, so Δ = 0 − 0 = 0: parabolic. The wave equation u_tt = c² u_xx has A = −c², C = 1: Δ = 4c² > 0, hyperbolic.', objects: examples.flatMap((e, i) => [dot(P(X(disc(e.A, e.B, e.C)), y), colors[i], 0.2)]).concat([label('u_xx + u_yy = 0', P(X(-3.3), y - 0.7), ROLE.output, 'primary'), label('u_t = k u_xx', P(X(0), y - 0.7), ROLE.result, 'primary'), label('u_tt = c² u_xx', P(X(3.3), y - 0.7), ROLE.input, 'primary')]) },
      { narration: 'The names come from the conics: elliptic ↔ ellipse (closed curves, steady states — Laplace), parabolic ↔ parabola (diffusion in time — heat), hyperbolic ↔ hyperbola (waves with finite speed — wave).', objects: [curve(ellipse, ROLE.output), curve(parab, ROLE.result), curve(hyper(1), ROLE.input), curve(hyper(-1), ROLE.input), ...names.map((nme, i) => label(nme, P(X(-3.4 + 3.4 * i), iconY - 1.2), colors[i], 'primary'))] },
    ],
  }
}

// ── 10. Heat equation ────────────────────────────────────────────────────────

/** u_t = k u_xx on [0, π], u(0, t) = u(π, t) = 0, u(x, 0) = sin x + ½ sin 3x: modes decay like e^(−n²kt), so the high mode dies first and the profile smooths. */
export const HEAT = { ox: -2.8, oy: -1.4, ux: 1.8, uy: 1.8, k: 1, times: [0, 0.1, 0.3] as readonly number[] }
export const heatU = (x: number, t: number, k: number = HEAT.k) => Math.exp(-k * t) * Math.sin(x) + 0.5 * Math.exp(-9 * k * t) * Math.sin(3 * x)
/** Fourier sine coefficient (2/π)∫₀^π u(x) sin(nx) dx of a sampled profile (Simpson on the supplied function). */
export const sineCoeff = (u: (x: number) => number, n: number, steps = 2000) => { const h = Math.PI / steps; let acc = 0; for (let i = 0; i <= steps; i++) acc += u(i * h) * Math.sin(n * i * h) * (i === 0 || i === steps ? 1 : i % 2 === 1 ? 4 : 2); return ((2 / Math.PI) * (acc * h)) / 3 }

/** KG: u_t = k u_xx models diffusion; separation of variables gives Fourier modes decaying at rate n²k. */
export function buildHeatEquationScene(): SceneSpec {
  return framed(raw_buildHeatEquationScene())
}
function raw_buildHeatEquationScene(): SceneSpec {
  const { ox, oy, ux, uy, times } = HEAT
  const G = (x: number, v: number): V3 => P(ox + x * ux, oy + v * uy)
  const colors = [ROLE.output, ROLE.input, ROLE.result]
  return {
    id: 'math-heat-equation',
    title: 'Heat equation: the profile smooths out',
    sceneType: 'diagram',
    cameraDistance: 12,
    teachingGoal: 'Show u_t = k u_xx on a rod [0, π] held at 0 at both ends, starting from the lumpy profile sin x + ½ sin 3x: each Fourier mode sin(nx) decays like e^(−n²kt), so the sharper mode n = 3 vanishes nine times faster than n = 1 and the profile smooths into one gentle hump that then cools toward 0 (the maximum only ever decreases).',
    ariaLabel:
      'A graph over a rod from 0 to pi with the temperature pinned to 0 at both ends. A blue curve at time 0 has a main hump with two small bumps on its shoulders. A red curve at time 0.1 is lower and the bumps have faded; a green curve at time 0.3 is a single smooth, lower hump. Captions give the times and say the high modes die first.',
    stage: NO_STAGE,
    steps: [
      { narration: 'A rod of length π, ends held at temperature 0, with initial temperature u(x, 0) = sin x + ½ sin 3x (blue): one big hump plus a faster wiggle (mode 3).', objects: [...mathAxes(G, -0.15, Math.PI + 0.3, -0.5, 1.8), curve(sampleMapped((x) => heatU(x, times[0]), 0, Math.PI, G, 80), colors[0]), label('t 0', P(ox + 0.3 * ux, oy + 1.55 * uy), colors[0], 'primary'), label('u_t = k u_xx', P(ox + 2.7 * ux, oy + 2.3 * uy - 0.1), ROLE.ink, 'primary')] },
      { narration: 'Heat flows from hot to cold. By separation of variables each mode decays on its own: u = e^(−kt) sin x + ½ e^(−9kt) sin 3x. At t = 0.1 the n = 3 part has already shrunk by e^(−0.9) ≈ 0.41 while n = 1 only by e^(−0.1) ≈ 0.90 (red).', objects: [curve(sampleMapped((x) => heatU(x, times[1]), 0, Math.PI, G, 80), colors[1]), label('t 0.1', P(ox + 0.35 * ux, oy + 1.15 * uy), colors[1], 'primary')] },
      { narration: 'By t = 0.3 the fast mode is almost gone (e^(−2.7) ≈ 0.07) and what is left is a single gentle hump (green) cooling toward 0: diffusion smooths out sharp features first, and the maximum never rises.', objects: [curve(sampleMapped((x) => heatU(x, times[2]), 0, Math.PI, G, 80), colors[2]), label('t 0.3', P(ox + 0.35 * ux, oy + 0.8 * uy), colors[2], 'primary'), label('high modes die first', P(ox + 2.3 * ux, oy - 0.45 * uy), ROLE.ink, 'primary')] },
    ],
  }
}

// ── 11. Wave equation ────────────────────────────────────────────────────────

/** u_tt = c² u_xx on the line, u(x, 0) = e^(−x²), u_t(x, 0) = 0: d'Alembert u = ½[f(x + ct) + f(x − ct)] — the pulse splits in two halves moving left and right at speed c. */
export const WAV = { ox: 0, oy: -1.5, ux: 0.7, uy: 2.0, c: 1, times: [0, 2, 4] as readonly number[], x: [-6, 6] as readonly number[] }
export const pulse = (x: number) => Math.exp(-x * x)
export const wave = (x: number, t: number, c: number = WAV.c) => 0.5 * (pulse(x + c * t) + pulse(x - c * t))

/** KG: u_tt = c² u_xx; d'Alembert's solution u = f(x + ct) + g(x − ct). */
export function buildWaveEquationScene(): SceneSpec {
  return framed(raw_buildWaveEquationScene())
}
function raw_buildWaveEquationScene(): SceneSpec {
  const { ox, oy, ux, uy, times, x, c } = WAV
  const G = (px: number, v: number): V3 => P(ox + px * ux, oy + v * uy)
  const colors = [ROLE.output, ROLE.input, ROLE.result]
  return {
    id: 'math-wave-equation',
    title: "Wave equation: d'Alembert's travelling pulses",
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: "Show u_tt = c² u_xx on the whole line with the initial bump e^(−x²) at rest: d'Alembert's formula u = ½[f(x + ct) + f(x − ct)] says the bump splits into two half-height copies, one running left and one right at speed c = 1 — at t = 2 their peaks are at x = ±2, at t = 4 at x = ±4, shapes unchanged.",
    ariaLabel:
      'A graph over x from minus 6 to 6. A tall blue bump at the centre is the starting shape at time 0. A red curve at time 2 shows two bumps of half the height centred at minus 2 and plus 2, and a green curve at time 4 shows two half-height bumps at minus 4 and plus 4, each the same shape, drifting apart.',
    stage: NO_STAGE,
    steps: [
      { narration: 'A long string at rest with an initial bump f(x) = e^(−x²) in the middle (blue, t = 0). The wave equation u_tt = c² u_xx describes how it moves.', objects: [...mathAxes(G, x[0], x[1], -0.2, 1.3), curve(sampleMapped((px) => wave(px, times[0]), x[0], x[1], G, 140), colors[0]), label('t 0', P(ox + 0.1, oy + 1.15 * uy + 0.3), colors[0], 'primary'), label('u_tt = c² u_xx', P(ox - 2.8, oy + 1.4 * uy), ROLE.ink, 'primary')] },
      { narration: "d'Alembert: u(x, t) = ½[f(x + ct) + f(x − ct)]. The initial bump splits into two copies of HALF the height — one travelling left (f(x + ct)), one right (f(x − ct)). At t = 2 with c = 1 the peaks are at x = −2 and x = +2 (red).", objects: [curve(sampleMapped((px) => wave(px, times[1]), x[0], x[1], G, 200), colors[1]), label('t 2', P(ox + 2 * c * ux, oy + 0.62 * uy + 0.3), colors[1], 'primary')] },
      { narration: 'At t = 4 the two pulses have moved on to x = ∓4 (green) with unchanged shape: waves carry a shape along at the finite speed c — the hallmark of a hyperbolic equation.', objects: [curve(sampleMapped((px) => wave(px, times[2]), x[0], x[1], G, 220), colors[2]), label('t 4', P(ox + 4 * c * ux, oy + 0.62 * uy + 0.3), colors[2], 'primary'), label('two pulses, speed c', P(ox, oy - 0.35 * uy), ROLE.ink, 'primary')] },
    ],
  }
}

// ── 12. Laplace's equation ───────────────────────────────────────────────────

/** u = x² − y² (harmonic: u_xx + u_yy = 2 − 2 = 0): contours are hyperbolas, the circle average equals the centre value, the extremes lie on the boundary. */
export const LAP = { ox: 0, oy: 0.2, u: 1.0, half: 2.2, levels: [1, 2, 3, -1, -2, -3] as readonly number[], circle: { c: [0.8, 0.5] as XY, r: 0.9 } }
export const harmonicU = (x: number, y: number) => x * x - y * y

/** KG: ∇²u = 0 (elliptic); harmonic functions satisfy the mean value property and the maximum principle. */
export function buildLaplaceEquationScene(): SceneSpec {
  return framed(raw_buildLaplaceEquationScene())
}
function raw_buildLaplaceEquationScene(): SceneSpec {
  const { ox, oy, u, half, levels, circle } = LAP
  const G = (x: number, y: number): V3 => P(ox + x * u, oy + y * u)
  const box = [line(G(-half, -half), G(half, -half), ROLE.reference, 0.025), line(G(half, -half), G(half, half), ROLE.reference, 0.025), line(G(half, half), G(-half, half), ROLE.reference, 0.025), line(G(-half, half), G(-half, -half), ROLE.reference, 0.025)]
  const branch = (c: number, sign: 1 | -1): SceneObject => {
    // c > 0: x = sign·√(y² + c), y ∈ [−ymax, ymax]; c < 0: y = sign·√(x² − c), x ∈ [−xmax, xmax]
    if (c > 0) { const ym = Math.sqrt(half * half - c); return curve(sampleMapped((t) => t, -ym, ym, (t) => G(sign * Math.sqrt(t * t + c), t), 40), ROLE.output) }
    const xm = Math.sqrt(half * half + c); return curve(sampleMapped((t) => t, -xm, xm, (t) => G(t, sign * Math.sqrt(t * t - c)), 40), ROLE.input)
  }
  const contours = levels.flatMap((c) => [branch(c, 1), branch(c, -1)])
  return {
    id: 'math-laplace-equation',
    title: "Laplace's equation: harmonic functions",
    sceneType: 'diagram',
    cameraDistance: 12,
    teachingGoal: 'Show a solution of Laplace\'s equation u_xx + u_yy = 0 on the square [−2.2, 2.2]²: u = x² − y² (u_xx + u_yy = 2 − 2 = 0), drawn by its contour lines (hyperbolas; the zero contour is the diagonal cross). Two defining properties: the MEAN VALUE property — the average of u over any circle equals its value at the centre — and the MAXIMUM principle — the largest and smallest values occur on the boundary, never inside.',
    ariaLabel:
      'A square region with level curves of the function x squared minus y squared: blue hyperbolas opening left and right where the function is positive, red hyperbolas opening up and down where it is negative, and a violet cross of two diagonals where it is zero. A violet circle centred at (0.8, 0.5) has a green dot at its centre with the caption mean value property. Green dots on the left and right edges and red dots on the top and bottom edges mark where the function is largest and smallest, with the caption max and min on the boundary.',
    stage: NO_STAGE,
    steps: [
      { narration: 'u(x, y) = x² − y² satisfies Laplace\'s equation: u_xx + u_yy = 2 + (−2) = 0. Its level curves in the square: blue hyperbolas where u > 0, red where u < 0, and the zero level, the two diagonals (violet).', objects: [...box, line(G(-half, -half), G(half, half), ROLE.aid, 0.03), line(G(-half, half), G(half, -half), ROLE.aid, 0.03), ...contours, label('u = x² − y²', P(ox, oy - half * u - 0.6), ROLE.ink, 'primary')] },
      { narration: 'Mean value property: take any circle (violet, centre (0.8, 0.5), radius 0.9). The average of u around the circle is exactly the value at the centre, 0.8² − 0.5² = 0.39 — harmonic functions are "balanced" in this sense.', objects: [curve(arcPts(ox + circle.c[0] * u, oy + circle.c[1] * u, circle.r * u, 0, 360, 72), ROLE.aid), dot(G(circle.c[0], circle.c[1]), ROLE.result, 0.12), label('mean value property', P(ox + 1.4, oy + 1.9 * u), ROLE.result, 'primary')] },
      { narration: 'Maximum principle: u has no peak or pit inside the square. Its biggest value 4.84 is on the boundary at (±2.2, 0) (green) and its smallest, −4.84, at (0, ±2.2) (red).', objects: [dot(G(half, 0), ROLE.result, 0.14), dot(G(-half, 0), ROLE.result, 0.14), dot(G(0, half), ROLE.input, 0.14), dot(G(0, -half), ROLE.input, 0.14), label('max and min on the boundary', P(ox, oy + half * u + 0.6), ROLE.ink, 'primary')] },
    ],
  }
}
