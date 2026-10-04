/**
 * Physics coverage-driven KG extension, batch 8 (2026-10-04): figures for
 * non-inertial frames, the equation of continuity, and the specific heats of
 * gases. Same rules as physicsCoreScenes.ts: every number drawn is computed here
 * and pinned by src/tests/physicsExtensionBatch8.test.ts.
 */

import type { SceneSpec } from '@/lib/teaching/sceneSpec'
import { ROLE, arrow, curve, dot, label, line } from './visualDesign'
import { P, circlePoints, rad, rect } from './physicsCoreScenes'

// ── 1. Non-inertial frames ───────────────────────────────────────────────────

/** 60 kg in a lift accelerating up at 2 m/s²; car at 3 m/s²; 50 m bend at 15 m/s. */
export const FRAMES = { m: 60, g: 9.8, liftA: 2, carA: 3, v: 15, r: 50 }
export function apparentWeight(a: number, f = FRAMES): number { return f.m * (f.g + a) }
export function tiltDeg(a: number, g = FRAMES.g): number { return (Math.atan(a / g) * 180) / Math.PI }
export function centrifugal(f = FRAMES): number { return (f.m * f.v * f.v) / f.r }
export function buildFramesScene(): SceneSpec {
  const N = apparentWeight(FRAMES.liftA), W = FRAMES.m * FRAMES.g, K = 0.0034
  const th = tiltDeg(FRAMES.carA), L = 2.0, PX = 0, PY = 2.2
  const bob = P(PX - L * Math.sin(rad(th)), PY - L * Math.cos(rad(th)))
  const Fc = centrifugal(), CX = 4.6, R = 2, carX = CX - R
  return {
    id: 'phys-non-inertial-frames',
    title: 'Accelerating frames: apparent weight, tilt and centrifugal force',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: `Show three accelerating frames: a ${FRAMES.m} kg person in a lift accelerating up at ${FRAMES.liftA} m/s² reads N = m(g + a) = ${N} N, not ${W} N; a pendulum in a car accelerating at ${FRAMES.carA} m/s² tilts back by ${th.toFixed(0)}°; on a ${FRAMES.r} m bend at ${FRAMES.v} m/s the road pushes the passenger INWARD with ${Fc} N — the outward ${Fc} N is a pseudo force of the car's frame only.`,
    ariaLabel: `Left: a lift with a person; an upward arrow for the normal force, ${N} newtons, longer than the downward weight arrow, ${W} newtons, and an upward acceleration arrow. Middle: a pendulum hanging from a car roof, tilted backward by ${th.toFixed(0)} degrees while the car accelerates forward. Right: a top view of a car on a curved road, with an arrow pointing inward towards the centre of the bend.`,
    steps: [
      { narration: `In a lift accelerating upward at ${FRAMES.liftA} m/s², the floor must push harder than gravity: N = m(g + a) = ${FRAMES.m} × ${(FRAMES.g + FRAMES.liftA).toFixed(1)} = ${N} N. That is what the scales read — not mg = ${W} N.`, objects: [...rect(-4.6, -2.4, -2.4, 2.4, ROLE.reference), dot(P(-3.5, 0), ROLE.ink, 0.22), arrow(P(-3.5, 0.25), P(-3.5, 0.25 + N * K), ROLE.result), arrow(P(-3.3, -0.25), P(-3.3, -0.25 - W * K), ROLE.input), label(`N = ${N} N`, P(-3.5, 3.2), ROLE.result, 'detail'), label(`mg = ${W} N`, P(-3.3, -2.9), ROLE.input, 'detail'), arrow(P(-4.3, -1.0), P(-4.3, 0.4), ROLE.aid), label(`a = ${FRAMES.liftA} m/s²`, P(-3.6, -3.6), ROLE.aid, 'detail')] },
      { narration: `A pendulum in a car accelerating forward at ${FRAMES.carA} m/s² hangs tilted BACK by tan⁻¹(a/g) ≈ ${th.toFixed(0)}°. From the road, the tilted string supplies the forward force; from the car, a backward pseudo force −ma balances.`, objects: [line(P(-1.3, PY), P(1.3, PY), ROLE.reference, 0.05), line(P(PX, PY), bob, ROLE.ink, 0.03), dot(bob, ROLE.output, 0.18), line(P(PX, PY), P(PX, PY - L - 0.2), ROLE.aid, 0.015), arrow(P(-0.8, -0.8), P(1.0, -0.8), ROLE.aid), label(`a = ${FRAMES.carA} m/s²`, P(0.1, -1.3), ROLE.aid, 'detail'), label(`tilt ${th.toFixed(0)}° back`, P(0.1, -2.0), ROLE.output, 'detail')] },
      { narration: `On a ${FRAMES.r} m bend at ${FRAMES.v} m/s, from the road the only horizontal force on a ${FRAMES.m} kg passenger is INWARD: m v²/r = ${Fc} N from the seat or door. The outward ${Fc} N "push" exists only as a pseudo force in the car's turning frame.`, objects: [curve(circlePoints(CX, 0, R, rad(125), rad(235), 32), ROLE.reference), dot(P(carX, 0), ROLE.ink, 0.18), arrow(P(carX + 0.2, 0), P(carX + 1.2, 0), ROLE.result), label(`${Fc} N inward`, P(carX + 0.6, 0.5), ROLE.result, 'detail'), label('road frame: no outward force', P(2.6, -3.0), ROLE.result, 'primary')] },
    ],
  }
}

// ── 2. Equation of continuity ────────────────────────────────────────────────

/** 4 cm² at 1.5 m/s narrowing to 1 cm². */
export const PIPE = { A1: 4e-4, v1: 1.5, A2: 1e-4 }
export function continuitySpeed(A1 = PIPE.A1, v1 = PIPE.v1, A2 = PIPE.A2): number { return (A1 * v1) / A2 }
export function flowRate(A = PIPE.A1, v = PIPE.v1): number { return A * v }
export function reynolds(rho: number, v: number, D: number, eta: number): number { return (rho * v * D) / eta }
export function buildContinuityScene(): SceneSpec {
  const v2 = continuitySpeed(), Q = flowRate(), H1 = 1.2, H2 = H1 * Math.sqrt(PIPE.A2 / PIPE.A1), KV = 0.4
  const slug1 = v1Len(), slug2 = slug1 * (v2 / PIPE.v1)
  function v1Len(): number { return PIPE.v1 * KV }
  return {
    id: 'phys-continuity',
    title: 'Narrower pipe, faster flow: A₁v₁ = A₂v₂',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: `Show the equation of continuity: water at ${PIPE.v1} m/s in a ${PIPE.A1 * 1e4} cm² pipe carries ${(Q * 1000).toFixed(1)} L/s; where the pipe narrows to ${PIPE.A2 * 1e4} cm² (half the diameter) the same ${(Q * 1000).toFixed(1)} L/s must pass, so the water speeds up to ${v2} m/s.`,
    ariaLabel: `A pipe drawn in side view: wide on the left, tapering to half the diameter on the right. A short shaded slug of water in the wide part and a slug four times longer in the narrow part hold the same volume. Velocity arrows: ${PIPE.v1} metres per second on the left, a four-times-longer ${v2} metres per second arrow on the right.`,
    steps: [
      { narration: `Water at ${PIPE.v1} m/s fills a ${PIPE.A1 * 1e4} cm² pipe. Each second ${(Q * 1000).toFixed(1)} litres cross every section — it cannot pile up.`, objects: [line(P(-4.6, H1), P(-1.0, H1), ROLE.reference, 0.05), line(P(-4.6, -H1), P(-1.0, -H1), ROLE.reference, 0.05), line(P(-1.0, H1), P(0.2, H2), ROLE.reference, 0.05), line(P(-1.0, -H1), P(0.2, -H2), ROLE.reference, 0.05), line(P(0.2, H2), P(4.6, H2), ROLE.reference, 0.05), line(P(0.2, -H2), P(4.6, -H2), ROLE.reference, 0.05), arrow(P(-3.8, 0), P(-3.8 + v1Len(), 0), ROLE.input), label(`${PIPE.v1} m/s`, P(-3.4, 0.5), ROLE.input, 'detail'), label(`${PIPE.A1 * 1e4} cm²`, P(-3.0, H1 + 0.45), ROLE.ink, 'detail')] },
      { narration: `Where the area falls to ${PIPE.A2 * 1e4} cm² — a quarter, from half the diameter — the same volume each second must be four times longer: v₂ = A₁v₁/A₂ = ${v2} m/s. Narrower means FASTER.`, objects: [...rect(-2.6, -H1 + 0.1, -2.6 + slug1, H1 - 0.1, ROLE.aid), ...rect(1.0, -H2 + 0.08, 1.0 + slug2, H2 - 0.08, ROLE.aid), arrow(P(1.0, -H2 - 0.5), P(1.0 + v2 * KV, -H2 - 0.5), ROLE.result), label(`${v2} m/s`, P(2.2, -H2 - 1.0), ROLE.result, 'detail'), label(`${PIPE.A2 * 1e4} cm²`, P(3.6, H2 + 0.45), ROLE.ink, 'detail')] },
      { narration: `A₁v₁ = A₂v₂ = ${(Q * 1000).toFixed(1)} L/s. At low speed the flow is streamline; above Re = ρvD/η ≈ 2000 it turns turbulent.`, objects: [label(`A₁v₁ = A₂v₂ = ${(Q * 1000).toFixed(1)} L/s`, P(0, -3.4), ROLE.result, 'primary'), label('streamline below Re ≈ 2000', P(0, -4.3), ROLE.aid, 'detail')] },
    ],
  }
}

// ── 3. Specific heats of gases ───────────────────────────────────────────────

export const GAS = { n: 2, dT: 10, R: 8.314 }
export function cvOf(f: number, R = GAS.R): number { return (f / 2) * R }
export function cpOf(f: number, R = GAS.R): number { return cvOf(f, R) + R }
export function gammaOf(f: number): number { return 1 + 2 / f }
export function heatAtConstantV(f: number, g = GAS): number { return g.n * cvOf(f, g.R) * g.dT }
export function heatAtConstantP(f: number, g = GAS): number { return g.n * cpOf(f, g.R) * g.dT }
export function buildSpecificHeatsScene(): SceneSpec {
  const Qv = heatAtConstantV(5), Qp = heatAtConstantP(5), Wk = Qp - Qv, Y0 = -2.6, K = 0.0085
  const bar = (x: number, y0: number, h: number, c: string) => rect(x - 0.6, y0, x + 0.6, y0 + h, c)
  return {
    id: 'phys-specific-heats-gases',
    title: 'Cp > Cv: the extra heat does expansion work',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: `Show why a gas has two heat capacities: warming ${GAS.n} mol of nitrogen by ${GAS.dT} K takes ${Math.round(Qv)} J in a sealed can (constant volume, all to internal energy) but ${Math.round(Qp)} J with a free piston (constant pressure): the extra ${Math.round(Wk)} J = nRΔT is the work done expanding, so Cp − Cv = R. γ = 1 + 2/f: ${gammaOf(3).toFixed(2)} for monatomic helium, ${gammaOf(5).toFixed(2)} for diatomic nitrogen.`,
    ariaLabel: `Two bars. Left, constant volume: one block of ${Math.round(Qv)} joules labelled internal energy. Right, constant pressure: the same ${Math.round(Qv)}-joule block with an extra ${Math.round(Wk)}-joule block on top labelled work, totalling ${Math.round(Qp)} joules.`,
    steps: [
      { narration: `Sealed can, constant volume: nothing moves, so all the heat raises the internal energy. ${GAS.n} mol of N₂ (Cv = 2.5R) warmed ${GAS.dT} K: Q = ${Math.round(Qv)} J.`, objects: [line(P(-4.0, Y0), P(4.0, Y0), ROLE.reference, 0.04), ...bar(-1.8, Y0, Qv * K, ROLE.output), label(`ΔU = ${Math.round(Qv)} J`, P(-1.8, Y0 + Qv * K / 2), ROLE.output, 'detail'), label('constant V', P(-1.8, Y0 - 0.45), ROLE.ink, 'detail')] },
      { narration: `Free piston, constant pressure: the same ${Math.round(Qv)} J raises the internal energy, plus ${Math.round(Wk)} J = nRΔT of work pushing the piston. Q = ${Math.round(Qp)} J, so Cp = Cv + R.`, objects: [...bar(1.8, Y0, Qv * K, ROLE.output), ...bar(1.8, Y0 + Qv * K, Wk * K, ROLE.input), label(`ΔU = ${Math.round(Qv)} J`, P(1.8, Y0 + Qv * K / 2), ROLE.output, 'detail'), label(`work = ${Math.round(Wk)} J`, P(1.8, Y0 + Qv * K + Wk * K / 2), ROLE.input, 'detail'), label(`constant p: ${Math.round(Qp)} J`, P(1.8, Y0 - 0.45), ROLE.ink, 'detail')] },
      { narration: `γ = Cp/Cv = 1 + 2/f: helium (f = 3) ${gammaOf(3).toFixed(2)}, nitrogen (f = 5) ${gammaOf(5).toFixed(2)} — not the same for every gas.`, objects: [label(`γ: He ${gammaOf(3).toFixed(2)} · N₂ ${gammaOf(5).toFixed(2)}`, P(0, 3.6), ROLE.result, 'primary'), label('Cp − Cv = R', P(0, 2.8), ROLE.result, 'detail')] },
    ],
  }
}
