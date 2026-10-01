/**
 * Physics visual gap campaign, batch 7 (2026-09-30): measurement, mechanics and
 * gravitation. Same rules as physicsCoreScenes.ts; every figure stays within
 * the intermediate label budget.
 */

import type { SceneSpec, SceneObject } from '@/lib/teaching/sceneSpec'
import { ROLE, arrow, curve, dot, label, line } from './visualDesign'
import { P, r2, circlePoints, rect, fnPath, bar, type V3 } from './physicsCoreScenes'

// ── 1. SI base units ─────────────────────────────────────────────────────────

/** KG: "The International System of Units defines seven base units." */
export const SI_BASE: Array<[string, string]> = [
  ['length', 'm'], ['mass', 'kg'], ['time', 's'], ['current', 'A'],
  ['temperature', 'K'], ['amount', 'mol'], ['luminous intensity', 'cd'],
]
export function buildSiUnitsScene(): SceneSpec {
  const R = 2.9
  const nodes = SI_BASE.map(([, ], i) => { const a = Math.PI / 2 - (i * 2 * Math.PI) / SI_BASE.length; return P(R * Math.cos(a), R * Math.sin(a) - 0.2) })
  return {
    id: 'phys-si-units',
    title: 'The seven SI base units',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show the seven SI base quantities and their units, from which every other unit is built (for example the newton, kg·m/s²).',
    ariaLabel: 'Seven base quantities arranged in a ring around the letters SI: length in metres, mass in kilograms, time in seconds, electric current in amperes, temperature in kelvin, amount of substance in moles and luminous intensity in candelas. Below, the newton is shown built from them.',
    steps: [
      { narration: 'The SI system rests on seven base quantities, each with its own unit.', objects: [label('SI', P(0, -0.2), ROLE.result, 'heading'), ...nodes.map((p) => line(P(p[0] * 0.3, p[1] * 0.3 - 0.14), P(p[0] * 0.78, p[1] * 0.78 - 0.04), ROLE.aid, 0.025))] },
      { narration: 'Length in metres, mass in kilograms, time in seconds, current in amperes, temperature in kelvin, amount in moles, luminous intensity in candelas.', objects: SI_BASE.map(([q, u], i) => label(`${q}: ${u}`, nodes[i], i % 2 ? ROLE.output : ROLE.input, 'detail')) },
      { narration: 'Every other unit is built from these. The newton, for example, is a kilogram metre per second squared.', objects: [label('1 N = 1 kg·m/s²', P(0, -4.2), ROLE.result, 'primary')] },
    ],
  }
}

// ── 2. Dimensional analysis ──────────────────────────────────────────────────

/** KG: "checks the consistency of equations by examining the dimensions of each term." v = u + at passes; v = u + at² fails. */
export function buildDimensionsScene(): SceneSpec {
  // No boxes round the terms: MEASURED, the label placer moves each label off
  // its box's edges, leaving four empty boxes with the text beside them.
  return {
    id: 'phys-dimensions',
    title: 'Dimensional analysis',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show how to check an equation by the dimensions of each term: in v = u + at every term is [L T⁻¹], so it can be right; v = u + at² mixes [L] with [L T⁻¹], so it must be wrong.',
    ariaLabel: 'The equation v equals u plus a t, with each term boxed and labelled with its dimensions: length per time for every term, so it is consistent. Below, v equals u plus a t squared: the last term has dimensions of length alone, so it is inconsistent.',
    steps: [
      { narration: 'Check v = u + at term by term. Speeds v and u have dimensions [L T⁻¹].', objects: [label('v: [L T⁻¹]', P(-3.2, 2.0), ROLE.output, 'detail'), label('=', P(-2.1, 2.0), ROLE.ink, 'primary'), label('u: [L T⁻¹]', P(-0.9, 2.0), ROLE.output, 'detail'), label('+', P(0.3, 2.0), ROLE.ink, 'primary')] },
      { narration: 'at is [L T⁻²] × [T] = [L T⁻¹] as well. Every term matches, so the equation is dimensionally consistent.', objects: [label('at: [L T⁻²][T] = [L T⁻¹]', P(2.7, 2.0), ROLE.result, 'detail'), label('consistent', P(0, 0.9), ROLE.result, 'primary')] },
      { narration: 'Try v = u + at². The last term is [L T⁻²] × [T²] = [L], a length, which cannot be added to a speed: the equation is wrong.', objects: [label('at²: [L]  ≠  [L T⁻¹]', P(2.7, -1.6), ROLE.input, 'detail'), label('v = u + at²', P(-2.4, -1.6), ROLE.input, 'primary'), label('inconsistent', P(0, -2.9), ROLE.input, 'primary')] },
    ],
  }
}

// ── 3. Measurement errors ────────────────────────────────────────────────────

/** KG: "quantify the deviation of a measured value from the true value." Five readings vs a true 10.0 cm; mean, absolute and relative error. */
export const READINGS = [9.6, 9.9, 10.1, 9.8, 10.2]
export const TRUE_VALUE = 10.0
export function readingStats() {
  const mean = READINGS.reduce((a, b) => a + b, 0) / READINGS.length
  const abs = Math.abs(mean - TRUE_VALUE)
  return { mean: r2(mean), abs: r2(abs), rel: r2((abs / TRUE_VALUE) * 100) }
}
export function buildMeasurementErrorsScene(): SceneSpec {
  const X0 = -4.2, X1 = 4.2, V0 = 9.4, V1 = 10.6
  const x = (v: number) => X0 + ((v - V0) / (V1 - V0)) * (X1 - X0)
  const st = readingStats()
  const ticks: SceneObject[] = []
  for (let v = 9.4; v <= 10.61; v += 0.2) ticks.push(line(P(x(v), -0.15), P(x(v), 0.15), ROLE.reference, 0.02))
  return {
    id: 'phys-measurement-errors',
    title: 'Measurement error',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show five repeated readings scattered around the true value, their mean, and the absolute and relative error of that mean.',
    ariaLabel: 'A number line from 9.4 to 10.6 centimetres. Five readings are marked as dots between 9.6 and 10.2. The true value, 10.0, is a green line; the mean of the readings, 9.92, is just below it. The absolute error is 0.08 centimetres, a relative error of 0.8 percent.',
    steps: [
      { narration: `Five readings of a length whose true value is ${TRUE_VALUE} cm.`, objects: [line(P(X0, 0), P(X1, 0), ROLE.reference, 0.03), ...ticks, label('9.4 cm', P(X0, -0.6), ROLE.ink, 'detail'), label('10.6 cm', P(X1, -0.6), ROLE.ink, 'detail'), ...READINGS.map((v, i) => dot(P(x(v), 0.5 + (i % 2) * 0.35), ROLE.output, 0.14)), label('readings', P(x(9.6) - 0.3, 1.5), ROLE.output, 'detail')] },
      { narration: `The mean of the readings is ${st.mean} cm; the true value is ${TRUE_VALUE} cm.`, objects: [line(P(x(TRUE_VALUE), -1.4), P(x(TRUE_VALUE), 2.2), ROLE.result, 0.03), label('true value', P(x(TRUE_VALUE) + 1.0, 2.5), ROLE.result, 'detail'), line(P(x(st.mean), -1.2), P(x(st.mean), 1.9), ROLE.input, 0.03), label(`mean = ${st.mean} cm`, P(x(st.mean) - 1.6, -1.6), ROLE.input, 'primary')] },
      { narration: `Absolute error = |mean − true| = ${st.abs} cm. Relative error = ${st.abs} / ${TRUE_VALUE} = ${st.rel}%. The spread of the readings shows the random error.`, objects: [label(`absolute error = ${st.abs} cm (${st.rel}%)`, P(0, -3.0), ROLE.result, 'primary')] },
    ],
  }
}

// ── 4. Significant figures ───────────────────────────────────────────────────

/** KG: "indicate the precision of a measurement by specifying which digits are meaningful." A ruler reading 4.37 cm: 4.3 certain, 7 estimated. */
export const RULER_READING = 4.37
export function sigFigs(s: string): number { return s.replace(/^[0.]+/, '').replace('.', '').length }
export function buildSignificantFiguresScene(): SceneSpec {
  const X0 = -4.0, U = 1.6 // 1 cm drawn as 1.6 units
  const x = (cm: number) => X0 + cm * U
  const ticks: SceneObject[] = []
  for (let c = 0; c <= 5; c++) ticks.push(line(P(x(c), 0), P(x(c), 0.7), ROLE.reference, 0.03))
  for (let mm = 31; mm <= 49; mm++) if (mm % 10) ticks.push(line(P(x(mm / 10), 0), P(x(mm / 10), 0.32), ROLE.reference, 0.015))
  return {
    id: 'phys-significant-figures',
    title: 'Significant figures',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show a length read from a millimetre ruler as 4.37 cm: the 4 and 3 are certain, the 7 is the estimated last digit, giving three significant figures.',
    ariaLabel: 'A rod lying along a ruler marked in centimetres, with millimetre marks near its end. Its end falls between 4.3 and 4.4 centimetres, about seven tenths of the way, so it is read as 4.37 centimetres: two certain digits and one estimated digit, three significant figures.',
    steps: [
      { narration: 'A rod lies along a ruler marked in centimetres and millimetres.', objects: [line(P(x(0), 0), P(x(5), 0), ROLE.reference, 0.04), ...ticks, line(P(x(0), 1.25), P(x(RULER_READING), 1.25), ROLE.output, 0.22), label('0', P(x(0), -0.45), ROLE.ink, 'detail'), label('5 cm', P(x(5), -0.45), ROLE.ink, 'detail')] },
      { narration: 'The end is past 4.3 cm, about seven tenths of the way to 4.4. The 4 and 3 are certain; the 7 is estimated.', objects: [line(P(x(RULER_READING), 0.95), P(x(RULER_READING), 2.3), ROLE.input, 0.025), label(`${RULER_READING} cm`, P(x(RULER_READING), 2.7), ROLE.input, 'primary'), label('certain: 4.3', P(-2.0, -1.4), ROLE.output, 'detail'), label('estimated: 7', P(1.6, -1.4), ROLE.input, 'detail')] },
      { narration: `So the reading has ${sigFigs(String(RULER_READING))} significant figures. Writing 4.370 would claim a precision the ruler does not have.`, objects: [label(`sig. figs = ${sigFigs(String(RULER_READING))}`, P(0, -2.8), ROLE.result, 'primary')] },
    ],
  }
}

// ── 5. Unit conversion ───────────────────────────────────────────────────────

/** KG: "uses multiplicative factors or SI prefixes." 72 km/h × 1000 m/km ÷ 3600 s/h = 20 m/s. */
export const KMH = 72
export function kmhToMs(v: number): number { return r2((v * 1000) / 3600) }
export function buildUnitConversionScene(): SceneSpec {
  const ms = kmhToMs(KMH)
  return {
    id: 'phys-unit-conversion',
    title: 'Converting units',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show a unit conversion as a chain of factors equal to one: 72 km/h × (1000 m / 1 km) × (1 h / 3600 s) = 20 m/s.',
    ariaLabel: 'Three boxes joined by arrows. 72 kilometres per hour is multiplied by 1000 metres per kilometre, giving 72 000 metres per hour, then divided by 3600 seconds per hour, giving 20 metres per second.',
    steps: [
      { narration: `Start with a speed of ${KMH} km/h.`, objects: [label(`${KMH} km/h`, P(-3.4, 0), ROLE.input, 'primary')] },
      { narration: 'Multiply by 1000 m / 1 km. The factor equals one, so the speed is unchanged; only the units change.', objects: [arrow(P(-2.2, 0), P(-1.2, 0), ROLE.aid), label('× 1000 m/km', P(-1.7, 0.9), ROLE.aid, 'detail'), label(`${KMH * 1000} m/h`, P(0, 0), ROLE.ink, 'primary')] },
      { narration: `Then multiply by 1 h / 3600 s: ${KMH} km/h = ${ms} m/s.`, objects: [arrow(P(1.2, 0), P(2.2, 0), ROLE.aid), label('÷ 3600 s/h', P(1.7, 0.9), ROLE.aid, 'detail'), label(`${ms} m/s`, P(3.4, 0), ROLE.result, 'primary'), label(`${KMH} km/h = ${ms} m/s`, P(0, -2.0), ROLE.result, 'primary')] },
    ],
  }
}

// ── 6. Work–energy theorem ───────────────────────────────────────────────────

/** KG: "The net work done on an object equals the change in its kinetic energy." m = 2 kg, F = 6 N over 3 m from 1 m/s. */
export const WE = { m: 2, F: 6, d: 3, v1: 1 }
export function workEnergy() {
  const W = WE.F * WE.d, KE1 = 0.5 * WE.m * WE.v1 ** 2, KE2 = KE1 + W
  return { W, KE1, KE2, v2: r2(Math.sqrt((2 * KE2) / WE.m)) }
}
export function buildWorkEnergyTheoremScene(): SceneSpec {
  const e = workEnergy(), S = 0.2 // bar length per joule
  const X1 = -2.8, X2 = X1 + 2.0 * WE.d / 1.5
  return {
    id: 'phys-work-energy-theorem',
    title: 'The work–energy theorem',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show a net force doing work on a cart: the work done, W = Fd, equals the gain in kinetic energy.',
    ariaLabel: 'A 2 kilogram cart pushed by a 6 newton force over 3 metres. Its kinetic energy bar grows from 1 joule at the start to 19 joules at the end; the 18 joule increase equals the work done.',
    steps: [
      { narration: `A ${WE.m} kg cart moving at ${WE.v1} m/s has kinetic energy ${e.KE1} J.`, objects: [...rect(X1 - 0.6, 0.2, X1 + 0.6, 1.0, ROLE.reference), line(P(-4.8, 0.2), P(4.8, 0.2), ROLE.reference, 0.03), bar(X1 - 0.6, -1.0, e.KE1 * S, ROLE.output), label(`KE = ${e.KE1} J`, P(X1, -1.5), ROLE.output, 'detail')] },
      { narration: `A net force of ${WE.F} N pushes it ${WE.d} m. The work done is W = Fd = ${e.W} J.`, objects: [arrow(P(X1 - 1.9, 0.6), P(X1 - 0.7, 0.6), ROLE.input), label(`F = ${WE.F} N`, P(X1 - 1.3, 1.3), ROLE.input, 'detail'), line(P(X1, 1.9), P(X2, 1.9), ROLE.aid, 0.025), label(`d = ${WE.d} m`, P((X1 + X2) / 2, 2.3), ROLE.aid, 'detail')] },
      { narration: `At the end its kinetic energy is ${e.KE2} J: it gained exactly the ${e.W} J of work done. Its speed is now ${e.v2} m/s.`, objects: [...rect(X2 - 0.6, 0.2, X2 + 0.6, 1.0, ROLE.reference), bar(X2 - 0.6, -1.0, e.KE2 * S, ROLE.output), label(`KE = ${e.KE2} J`, P(X2 + 1.4, -1.5), ROLE.output, 'detail'), label(`W = Fd = ${e.W} J = ΔKE`, P(0, -3.0), ROLE.result, 'primary')] },
    ],
  }
}

// ── 7. Angular kinematics ────────────────────────────────────────────────────

/** KG: "describes rotational motion using angular displacement, velocity, and acceleration." Points at r and 2r sweep the same θ; v = ωr doubles. */
export const ANG_THETA_DEG = 60
export function buildAngularKinematicsScene(): SceneSpec {
  const R = 3.0, th = (ANG_THETA_DEG * Math.PI) / 180, V = 1.0
  const pOuter: V3 = P(R * Math.cos(th), R * Math.sin(th)), pInner: V3 = P((R / 2) * Math.cos(th), (R / 2) * Math.sin(th))
  const tangent = (p: V3, v: number) => arrow(p, P(p[0] - v * Math.sin(th), p[1] + v * Math.cos(th)), ROLE.input)
  return {
    id: 'phys-angular-kinematics',
    title: 'Angular kinematics',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show a disc turning through an angle θ: every point sweeps the same angle, so the whole disc shares one angular velocity ω, while the linear speed v = ωr grows with radius.',
    ariaLabel: 'A disc turning anticlockwise. A radius has swept through 60 degrees from its starting position. Two points on it, at radius r and 2r, have velocity arrows at right angles to the radius; the outer arrow is twice as long.',
    steps: [
      { narration: 'A disc turns about its centre. A radius sweeps through the angle θ.', objects: [curve(circlePoints(0, 0, R, 0, 2 * Math.PI, 64), ROLE.reference), line(P(0, 0), P(R, 0), ROLE.aid, 0.03), line(P(0, 0), pOuter, ROLE.output, 0.04), curve(circlePoints(0, 0, 0.9, 0, th, 16), ROLE.aid), label(`θ = ${ANG_THETA_DEG}°`, P(1.4, 0.55), ROLE.aid, 'primary')] },
      { narration: 'Every point on the disc turns through the same angle in the same time: they share one angular velocity, ω = Δθ/Δt.', objects: [dot(pInner, ROLE.output, 0.13), dot(pOuter, ROLE.output, 0.13), label('ω = Δθ/Δt', P(-2.4, 3.6), ROLE.result, 'primary')] },
      { narration: 'But the outer point travels further each second: its linear speed is v = ωr, twice as fast at twice the radius. A changing ω is an angular acceleration α = Δω/Δt.', objects: [tangent(pInner, V), tangent(pOuter, 2 * V), label('v', P(pInner[0] - 1.1, pInner[1] + 0.3), ROLE.input, 'primary'), label('2v', P(pOuter[0] - 2.1, pOuter[1] + 0.6), ROLE.input, 'primary'), label('v = ωr', P(2.6, -3.6), ROLE.result, 'primary')] },
    ],
  }
}

// ── 8. Rolling motion ────────────────────────────────────────────────────────

/**
 * KG: "Rolling without slipping combines translation and rotation such that the
 * contact point has zero instantaneous velocity." Point velocity = v + ω × r:
 * top 2v, centre v, contact 0.
 */
export function rollingPointVelocity(yRel: number, v: number, R: number): number { return v * (1 + yRel / R) } // ω = v/R, clockwise
export function buildRollingMotionScene(): SceneSpec {
  const R = 1.8, V = 1.3, CX = -0.8, CY = -0.8
  const ground = CY - R
  const at = (yRel: number) => arrow(P(CX, CY + yRel), P(CX + rollingPointVelocity(yRel, V, R), CY + yRel), ROLE.input)
  return {
    id: 'phys-rolling',
    title: 'Rolling without slipping',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show a wheel rolling without slipping: the centre moves at v, the top at 2v, and the point touching the ground is momentarily at rest (v = ωR).',
    ariaLabel: 'A wheel rolling to the right on the ground. The centre has a velocity arrow of length v, the top of the wheel an arrow twice as long, 2v, and the contact point at the bottom has no arrow: it is momentarily at rest.',
    steps: [
      { narration: 'A wheel rolls to the right without slipping.', objects: [line(P(-4.8, ground), P(4.8, ground), ROLE.reference, 0.05), curve(circlePoints(CX, CY, R, 0, 2 * Math.PI, 64), ROLE.reference), dot(P(CX, CY), ROLE.reference, 0.08)] },
      { narration: 'Each point moves with the centre (translation, v) plus its turning about the centre (rotation, ωR). At the top these add; at the bottom they cancel.', objects: [at(0), label('v', P(CX + V + 0.35, CY), ROLE.input, 'primary'), at(R), label('2v', P(CX + 2 * V + 0.4, CY + R), ROLE.input, 'primary'), dot(P(CX, ground), ROLE.result, 0.14), label('contact: 0', P(CX + 1.5, ground - 0.5), ROLE.result, 'primary')] },
      { narration: 'The contact point is momentarily at rest — that is what "without slipping" means — and the centre moves at v = ωR.', objects: [label('v = ωR', P(2.6, 2.8), ROLE.result, 'primary')] },
    ],
  }
}

// ── 9. Gravitational potential energy ────────────────────────────────────────

/** KG: "the work done against gravity to bring a mass from infinity to a given point." U = −GMm/r: negative, rising toward zero. */
export function buildGravitationalPotentialScene(): SceneSpec {
  const X0 = -4.0, Y0 = 2.4, R = 1.0, K = 3.4 // U(R) = −K
  const x = (r: number) => X0 + (r - 0) * 1.3
  const u = (r: number) => Y0 - (K * R) / r * 1.3
  const rMax = (4.4 - X0) / 1.3
  return {
    id: 'phys-gravitational-potential',
    title: 'Gravitational potential energy',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show U = −GMm/r against distance from a planet: negative everywhere, deepest at the surface, rising toward zero at infinity — the work needed to escape.',
    ariaLabel: 'A graph of gravitational potential energy against distance from the centre of a planet. The zero line is at the top. The curve starts deep below zero at the planet\'s surface and rises, ever more slowly, toward zero at large distances.',
    steps: [
      { narration: 'Potential energy is taken as zero far away, at infinity.', objects: [arrow(P(X0, Y0), P(4.6, Y0), ROLE.reference), line(P(X0, Y0 + 0.8), P(X0, -4.2), ROLE.reference, 0.04), label('distance r', P(3.8, Y0 + 0.45), ROLE.ink, 'detail'), label('zero at infinity', P(1.4, Y0 + 0.9), ROLE.ink, 'detail')] },
      { narration: 'Closer to the planet it is negative: work must be done against gravity to pull the mass away. U = −GMm/r.', objects: [curve(fnPath((xx) => u((xx - X0) / 1.3), x(R), x(rMax), 120), ROLE.output), line(P(x(R), Y0), P(x(R), u(R)), ROLE.aid, 0.02), label('surface R', P(x(R) - 0.2, Y0 + 0.45), ROLE.aid, 'detail')] },
      { narration: 'The curve is deepest at the surface. Climbing out of this "well" to zero takes energy GMm/R — the idea behind escape velocity.', objects: [label('U = −GMm/r', P(1.6, -1.6), ROLE.result, 'primary'), dot(P(x(R), u(R)), ROLE.input, 0.1), label('deepest at surface', P(x(R) + 2.0, u(R)), ROLE.input, 'detail')] },
    ],
  }
}

// ── 10. Kepler's laws ────────────────────────────────────────────────────────

/**
 * KG: "elliptical orbits, equal-area sweeping, and the period-radius
 * relationship." An e = 0.5 ellipse with the Sun at a focus; two sectors swept
 * in EQUAL TIMES (positions from Kepler's equation M = E − e sin E), one near
 * perihelion and one near aphelion — they have equal areas.
 */
export const KEPLER = { a: 3.0, e: 0.5 }
export function keplerPosition(M: number): [number, number] {
  const { a, e } = KEPLER
  let E = M
  for (let i = 0; i < 30; i++) E = E - (E - e * Math.sin(E) - M) / (1 - e * Math.cos(E))
  const b = a * Math.sqrt(1 - e * e)
  return [a * Math.cos(E) - a * e, b * Math.sin(E)] // Sun (focus) at the origin
}
export function buildKeplersLawsScene(): SceneSpec {
  const { a, e } = KEPLER
  const b = a * Math.sqrt(1 - e * e), cx = -a * e
  const shiftX = 0.9
  const Q = (p: [number, number]) => P(p[0] + shiftX, p[1])
  const ellipse = Array.from({ length: 73 }, (_, i) => { const t = (i / 72) * 2 * Math.PI; return P(cx + a * Math.cos(t) + shiftX, b * Math.sin(t)) })
  const dM = 0.35
  const sector = (M0: number, color: string): SceneObject[] => {
    const arc = Array.from({ length: 13 }, (_, i) => Q(keplerPosition(M0 - dM / 2 + (dM * i) / 12)))
    return [line(P(shiftX, 0), arc[0], color, 0.03), line(P(shiftX, 0), arc[12], color, 0.03), curve(arc, color)]
  }
  return {
    id: 'phys-keplers-laws',
    title: "Kepler's laws of planetary motion",
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: "Show Kepler's laws: an elliptical orbit with the Sun at one focus; the line to the planet sweeping equal areas in equal times (fast near the Sun, slow far away); and T² ∝ a³.",
    ariaLabel: 'An elliptical orbit with the Sun at one focus, off-centre. Two shaded sectors are swept in equal times: a short, wide one near the Sun and a long, thin one on the far side. They have equal areas, so the planet moves faster when close to the Sun.',
    steps: [
      { narration: 'Planets move in ellipses with the Sun at one focus, not at the centre.', objects: [curve(ellipse, ROLE.reference), dot(P(shiftX, 0), ROLE.input, 0.3), label('Sun (focus)', P(shiftX, -0.8), ROLE.input, 'detail')] },
      { narration: 'The line from the Sun to the planet sweeps out equal areas in equal times. Near the Sun the planet covers a longer arc in the same time: it moves faster.', objects: [...sector(0, ROLE.result), ...sector(Math.PI, ROLE.output), label('equal areas, equal times', P(-1.4, 3.1), ROLE.result, 'primary'), label('fast', P(shiftX + keplerPosition(0)[0] + 0.55, 0.9), ROLE.result, 'detail'), label('slow', P(shiftX + keplerPosition(Math.PI)[0] - 0.5, 0.7), ROLE.output, 'detail')] },
      { narration: 'The period depends on the orbit\'s size: T² ∝ a³, where a is the semi-major axis.', objects: [label('T² ∝ a³', P(2.8, -3.2), ROLE.result, 'primary')] },
    ],
  }
}

// ── 11. Escape velocity ──────────────────────────────────────────────────────

/**
 * KG: "the minimum speed needed for an object to escape a gravitational field
 * without further propulsion." Horizontal launches from the top of the Earth:
 * slower than 7.9 km/s falls back, 7.9 km/s circles (√(GM/R)), 11.2 km/s
 * (√(2GM/R)) escapes on a parabola. Paths are the exact conics.
 */
export const G_SI = 6.674e-11, M_EARTH = 5.972e24, R_EARTH = 6.371e6
export function earthSpeeds() {
  const vc = Math.sqrt((G_SI * M_EARTH) / R_EARTH)
  return { circ: r2(vc / 1000), esc: r2((Math.SQRT2 * vc) / 1000) }
}
export function launchPath(k: number, r0: number, rPlanet: number, clip = 4.8): V3[] {
  // k = v / v_circ(r0); launch horizontally (+x) from (0, r0) — Newton's cannon
  // on a mountain; θ measured clockwise from +y. Exact conic about the centre.
  const p = k * k * r0
  const e = Math.abs(k * k - 1)
  const r = (th: number) => (k >= 1 ? p / (1 + e * Math.cos(th)) : p / (1 - e * Math.cos(th)))
  const pts: V3[] = []
  for (let i = 0; i <= 160; i++) {
    const th = (i / 160) * 2 * Math.PI
    const rr = r(th)
    if (!Number.isFinite(rr) || rr < rPlanet) break
    const x = rr * Math.sin(th), y = rr * Math.cos(th)
    if (Math.abs(x) > clip || Math.abs(y) > clip) break
    pts.push(P(x, y))
  }
  return pts
}
export function buildEscapeVelocityScene(): SceneSpec {
  const RP = 1.35, R0 = 2.0, sp = earthSpeeds()
  const CY = -0.8
  const shift = (pts: V3[]) => pts.map((p) => P(p[0], p[1] + CY))
  return {
    id: 'phys-escape-velocity',
    title: 'Escape velocity',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show Newton\'s cannon: launched horizontally at increasing speed, a projectile falls back, then orbits at v = √(GM/r), and at √2 times that — the escape velocity √(2GM/r) — never returns.',
    ariaLabel: 'The Earth with a cannon on a tall mountain firing horizontally. The slowest shot curves down to the ground; a faster one circles the Earth; the fastest, √2 times the orbital speed, curves away and never comes back.',
    steps: [
      { narration: 'Fire a projectile horizontally from a very tall mountain. Too slow, and it curves back to the ground.', objects: [curve(circlePoints(0, CY, RP, 0, 2 * Math.PI, 64), ROLE.output), label('Earth', P(0, CY), ROLE.output, 'primary'), line(P(0, CY + RP), P(0, CY + R0), ROLE.reference, 0.06), curve(shift(launchPath(0.7, R0, RP)), ROLE.ink), label('slower: falls back', P(2.6, CY + 2.5), ROLE.ink, 'detail')] },
      { narration: `Faster, it falls around the Earth as fast as the ground curves away: a circular orbit at v = √(GM/r) — ${sp.circ} km/s at the Earth's surface.`, objects: [curve(shift(launchPath(1, R0, RP)), ROLE.aid), label('orbit: v = √(GM/r)', P(-3.0, CY + 2.4), ROLE.aid, 'detail')] },
      { narration: `At √2 times the orbital speed it has enough kinetic energy to climb out of the gravity well completely: the escape velocity, √(2GM/r) — ${sp.esc} km/s from the Earth's surface.`, objects: [curve(shift(launchPath(Math.SQRT2, R0, RP)), ROLE.input), label('escapes: v = √(2GM/r)', P(2.6, 4.0), ROLE.input, 'primary'), label(`Earth: v_esc = ${sp.esc} km/s`, P(-2.4, -3.6), ROLE.result, 'primary')] },
    ],
  }
}

// ── 12. Stress and strain ────────────────────────────────────────────────────

/**
 * KG: "Stress is force per unit area; strain is fractional deformation; their
 * ratio defines the elastic modulus." A typical ductile-metal curve (shape
 * only, not one material's data): straight to the elastic limit — slope E —
 * then plastic flow to fracture.
 */
export function stressOf(strain: number): number {
  const EL = 1.0, E = 3.2
  if (strain <= EL) return E * strain
  return E * EL + 1.6 * (1 - Math.exp(-(strain - EL) / 1.2)) - 0.12 * Math.max(0, strain - 4.4) ** 2
}
export function buildStressStrainScene(): SceneSpec {
  const X0 = -4.0, Y0 = -2.8, SX = 1.3, SY = 1.1, EMAX = 6.0
  const x = (s: number) => X0 + s * SX, y = (s: number) => Y0 + s * SY
  return {
    id: 'phys-stress-strain',
    title: 'Stress and strain',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show a stress–strain graph for a metal: a straight elastic region whose slope is Young\'s modulus E = stress/strain, an elastic limit, then plastic deformation until it breaks.',
    ariaLabel: 'A graph of stress against strain. It rises in a straight line to the elastic limit — the slope is Young\'s modulus — then curves over as the metal deforms permanently, until it breaks at the end of the curve.',
    steps: [
      { narration: 'Stress is force per area (F/A); strain is the fractional stretch (ΔL/L). Pull a metal wire and plot one against the other.', objects: [arrow(P(X0, Y0), P(x(EMAX) + 0.3, Y0), ROLE.reference), arrow(P(X0, Y0), P(X0, y(5.4)), ROLE.reference), label('strain ΔL/L', P(x(EMAX) - 0.6, Y0 - 0.5), ROLE.ink, 'detail'), label('stress F/A', P(X0 + 0.9, y(5.4) + 0.4), ROLE.ink, 'detail')] },
      { narration: 'At first stress is proportional to strain and the wire springs back when released. The slope is Young\'s modulus, E = stress/strain.', objects: [line(P(X0, Y0), P(x(1.0), y(stressOf(1.0))), ROLE.output, 0.06), label('slope = E', P(x(0.3) - 0.8, y(stressOf(0.8))), ROLE.output, 'primary'), dot(P(x(1.0), y(stressOf(1.0))), ROLE.aid, 0.1), label('elastic limit', P(x(1.0) - 1.4, y(stressOf(1.0)) + 0.4), ROLE.aid, 'detail')] },
      { narration: 'Beyond the elastic limit the wire deforms permanently (plastic region), until it breaks.', objects: [curve(fnPath((xx) => y(stressOf((xx - X0) / SX)), x(1.0), x(EMAX), 100), ROLE.input), label('plastic', P(x(3.0), y(stressOf(3.0)) + 0.5), ROLE.input, 'detail'), dot(P(x(EMAX), y(stressOf(EMAX))), ROLE.result, 0.12), label('breaks', P(x(EMAX), y(stressOf(EMAX)) - 0.5), ROLE.result, 'detail')] },
    ],
  }
}

// ── 13. Third law of thermodynamics ──────────────────────────────────────────

/**
 * KG: "the entropy of a perfect crystal approaches zero as temperature
 * approaches absolute zero." Low-temperature (Debye) entropy S ∝ T³, still
 * rising (as ln T³) at higher T; at T = 0 one arrangement, Ω = 1, S = k ln 1 = 0.
 */
/** ∝ T³ near absolute zero (Debye), still rising at higher T — never a plateau. */
export function crystalEntropy(t: number): number { return Math.log(1 + t ** 3) / Math.log(1 + 3.1 ** 3) }
export function buildThirdLawScene(): SceneSpec {
  const X0 = -3.8, Y0 = -2.4, SX = 2.6, SY = 4.4
  return {
    id: 'phys-third-law',
    title: 'The third law of thermodynamics',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show the entropy of a perfect crystal falling to zero as its temperature approaches absolute zero: one possible arrangement, S = k ln 1 = 0.',
    ariaLabel: 'A graph of the entropy of a perfect crystal against temperature. The curve rises from zero at absolute zero, very flat at first, then more steeply. At zero kelvin there is exactly one arrangement of the crystal, so its entropy is zero.',
    steps: [
      { narration: 'The entropy of a perfect crystal, plotted against temperature.', objects: [arrow(P(X0, Y0), P(X0 + 3.2 * SX, Y0), ROLE.reference), arrow(P(X0, Y0), P(X0, Y0 + SY + 0.6), ROLE.reference), label('temperature (K)', P(X0 + 2.6 * SX, Y0 - 0.5), ROLE.ink, 'detail'), label('entropy S', P(X0 + 0.9, Y0 + SY + 1.0), ROLE.ink, 'detail'), curve(fnPath((xx) => Y0 + SY * crystalEntropy((xx - X0) / SX), X0, X0 + 3.1 * SX, 120), ROLE.output)] },
      { narration: 'As the temperature falls toward absolute zero, the entropy falls toward zero.', objects: [dot(P(X0, Y0), ROLE.result, 0.14), label('0 K: S = 0', P(X0 + 0.9, Y0 - 0.5), ROLE.result, 'primary')] },
      { narration: 'At absolute zero a perfect crystal has exactly one possible arrangement, so S = k ln 1 = 0. Absolute zero itself can never quite be reached.', objects: [label('Ω = 1 → S = k ln 1 = 0', P(1.2, 0.2), ROLE.result, 'primary')] },
    ],
  }
}
