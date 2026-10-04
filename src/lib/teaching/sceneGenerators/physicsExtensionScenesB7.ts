/**
 * Physics coverage-driven KG extension, batch 7 (2026-10-03): figures for the
 * series LCR circuit, AC power, the nuclear atom (alpha scattering), and nuclear
 * size and density. Same rules as physicsCoreScenes.ts: every number drawn is
 * computed here and pinned by src/tests/physicsExtensionBatch7.test.ts.
 */

import type { SceneSpec } from '@/lib/teaching/sceneSpec'
import { ROLE, arrow, curve, dot, label, line } from './visualDesign'
import { P, type V3 } from './physicsCoreScenes'

// ── 1. Series LCR circuit ────────────────────────────────────────────────────

/** R = 40 Ω, L = 0.2 H, C = 50 μF, 200 V rms. */
export const LCR = { R: 40, L: 0.2, C: 50e-6, V: 200 }
export function reactances(omega: number, c = LCR): { XL: number; XC: number } { return { XL: omega * c.L, XC: 1 / (omega * c.C) } }
export function impedance(omega: number, R = LCR.R, c = LCR): number { const { XL, XC } = reactances(omega, c); return Math.hypot(R, XL - XC) }
export function lcrCurrent(omega: number, R = LCR.R, c = LCR): number { return c.V / impedance(omega, R, c) }
export function resonantOmega(c = LCR): number { return 1 / Math.sqrt(c.L * c.C) }
export function qFactor(R = LCR.R, c = LCR): number { return (resonantOmega(c) * c.L) / R }
export function buildLcrScene(): SceneSpec {
  const W0 = 100, W1 = 700, X0 = -4.2, SX = 8.4 / (W1 - W0), Y0 = -3.4, SY = 0.36
  const X = (w: number) => X0 + (w - W0) * SX
  const resp = (R: number): V3[] => Array.from({ length: 121 }, (_, i) => { const w = W0 + ((W1 - W0) * i) / 120; return P(X(w), Y0 + SY * lcrCurrent(w, R)) })
  const w0 = resonantOmega(), wA = 400, { XL, XC } = reactances(wA)
  const Z = impedance(wA), I = lcrCurrent(wA), Imax = lcrCurrent(w0), Ihi = lcrCurrent(w0, 10)
  return {
    id: 'phys-lcr-resonance',
    title: 'Series LCR: current peaks where X_L = X_C',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: `Show the current in a series LCR circuit (R = ${LCR.R} Ω, L = ${LCR.L} H, C = ${LCR.C * 1e6} μF, ${LCR.V} V rms) against angular frequency. At ω = ${wA} rad/s, X_L = ${XL} Ω, X_C = ${XC} Ω and Z = √(R² + (X_L − X_C)²) = ${Z} Ω, so I = ${I} A. At ω₀ = 1/√(LC) ≈ ${Math.round(w0)} rad/s the reactances cancel, Z = R and the current peaks at ${Imax} A; with R = 10 Ω the peak is ${Ihi} A and much sharper (Q ≈ ${qFactor(10).toFixed(1)}).`,
    ariaLabel: `A graph of current against angular frequency from ${W0} to ${W1} radians per second. A broad curve for R = ${LCR.R} ohms peaks at ${Imax} amps near ${Math.round(w0)} radians per second; a marked point at ${wA} radians per second shows ${I} amps. A much taller, narrower curve for R = 10 ohms peaks at ${Ihi} amps at the same frequency.`,
    steps: [
      { narration: `At ω = ${wA} rad/s: X_L = ωL = ${XL} Ω and X_C = 1/(ωC) = ${XC} Ω. They partly cancel, and what is left combines with R at right angles: Z = √(${LCR.R}² + ${XL - XC}²) = ${Z} Ω — not ${LCR.R + XL + XC} Ω. The current is ${I} A.`, objects: [arrow(P(X0, Y0), P(4.6, Y0), ROLE.reference), arrow(P(X0, Y0), P(X0, 4.4), ROLE.reference), label('ω (rad/s)', P(4.0, Y0 - 0.45), ROLE.ink, 'detail'), label('current (A)', P(X0 + 1.0, 4.5), ROLE.ink, 'detail'), curve(resp(LCR.R), ROLE.output), dot(P(X(wA), Y0 + SY * I), ROLE.input, 0.12), label(`ω = ${wA}: Z = ${Z} Ω, I = ${I} A`, P(X(wA) + 1.9, Y0 + SY * I + 0.4), ROLE.input, 'detail')] },
      { narration: `At ω₀ = 1/√(LC) ≈ ${Math.round(w0)} rad/s, X_L = X_C. They cancel, Z = R is at its minimum and the current is at its MAXIMUM: ${LCR.V}/${LCR.R} = ${Imax} A, in phase with the supply.`, objects: [line(P(X(w0), Y0), P(X(w0), Y0 + SY * Ihi + 0.2), ROLE.aid, 0.03), label(`ω₀ ≈ ${Math.round(w0)} rad/s`, P(X(w0), Y0 - 0.45), ROLE.aid, 'detail'), label(`Z = R, I = ${Imax} A`, P(X(w0) - 1.3, Y0 + SY * Imax + 0.35), ROLE.output, 'detail')] },
      { narration: `Cut R to 10 Ω: the peak rises to ${Ihi} A and becomes much narrower. Q = ω₀L/R rises from ${qFactor().toFixed(1)} to ${qFactor(10).toFixed(1)} — a sharper tuner that rejects neighbouring frequencies.`, objects: [curve(resp(10), ROLE.result), label(`R = 10 Ω: Q ≈ ${qFactor(10).toFixed(1)}, I = ${Ihi} A`, P(X(w0) + 2.4, Y0 + SY * Ihi - 0.2), ROLE.result, 'primary')] },
    ],
  }
}

// ── 2. AC power ──────────────────────────────────────────────────────────────

/** The same circuit at ω = 400 rad/s: 200 V rms, 4 A rms, current lagging by tan⁻¹(30/40). */
export const ACP = { Vrms: 200, Irms: 4, phi: Math.atan2(30, 40) }
export function averagePower(a = ACP): number { return a.Vrms * a.Irms * Math.cos(a.phi) }
export function apparentPower(a = ACP): number { return a.Vrms * a.Irms }
export function lineCurrent(P: number, V: number, pf: number): number { return P / (V * pf) }
export function buildAcPowerScene(): SceneSpec {
  const Vm = ACP.Vrms * Math.SQRT2, Im = ACP.Irms * Math.SQRT2, X0 = -4.2, LEN = 8.4
  const th = (i: number) => (4 * Math.PI * i) / 120
  const YV = 2.3, KV = 1.6 / Vm, KI = 1.6 / Im, YP = -2.7, KP = 0.0013
  const v = Array.from({ length: 121 }, (_, i) => P(X0 + (LEN * i) / 120, YV + KV * Vm * Math.sin(th(i))))
  const cur = Array.from({ length: 121 }, (_, i) => P(X0 + (LEN * i) / 120, YV + KI * Im * Math.sin(th(i) - ACP.phi)))
  const p = Array.from({ length: 121 }, (_, i) => P(X0 + (LEN * i) / 120, YP + KP * Vm * Math.sin(th(i)) * Im * Math.sin(th(i) - ACP.phi)))
  const Pav = averagePower(), S = apparentPower(), pMin = ACP.Vrms * ACP.Irms * (Math.cos(ACP.phi) - 1)
  return {
    id: 'phys-ac-power',
    title: 'AC power: energy flows back for part of each cycle',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: `Show why AC power depends on phase: with ${ACP.Vrms} V rms and ${ACP.Irms} A rms, the current lagging by ${((ACP.phi * 180) / Math.PI).toFixed(1)}°, the power p = vi dips below zero (down to ${Math.round(pMin)} W) for part of every cycle as energy returns to the supply. The average is V I cos φ = ${Math.round(Pav)} W, less than the apparent power ${S} VA.`,
    ariaLabel: `Top: two sine waves over two cycles, voltage and a current that lags slightly behind it. Bottom: their product, the power, which swings mostly positive but dips briefly below zero twice per cycle; a horizontal line marks its average, ${Math.round(Pav)} watts.`,
    steps: [
      { narration: `Voltage and current, ${ACP.Vrms} V and ${ACP.Irms} A rms, with the current lagging by φ = ${((ACP.phi * 180) / Math.PI).toFixed(1)}° (power factor cos φ = ${Math.cos(ACP.phi).toFixed(1)}).`, objects: [line(P(X0, YV), P(4.4, YV), ROLE.reference, 0.03), curve(v, ROLE.input), curve(cur, ROLE.output), label('v', P(-4.6, YV + 1.6), ROLE.input, 'detail'), label('i', P(-4.6, YV + 0.6), ROLE.output, 'detail')] },
      { narration: `The power p = vi. Where v and i have opposite signs it is NEGATIVE — down to ${Math.round(pMin)} W: the circuit hands energy back to the supply.`, objects: [line(P(X0, YP), P(4.4, YP), ROLE.reference, 0.03), curve(p, ROLE.aid), label('p = vi', P(-4.4, YP + 1.6), ROLE.aid, 'detail'), label('0', P(-4.6, YP), ROLE.ink, 'detail')] },
      { narration: `Averaged over a cycle: P = V_rms I_rms cos φ = ${ACP.Vrms} × ${ACP.Irms} × ${Math.cos(ACP.phi).toFixed(1)} = ${Math.round(Pav)} W, not ${S} W. ${S} VA is the apparent power the wires must carry.`, objects: [line(P(X0, YP + KP * Pav), P(4.4, YP + KP * Pav), ROLE.result, 0.04), label(`average ${Math.round(Pav)} W   (apparent ${S} VA)`, P(0.6, -4.3), ROLE.result, 'primary')] },
    ],
  }
}

// ── 3. Alpha scattering ──────────────────────────────────────────────────────

/** Coulomb constant × e², in MeV·m; closest approach of a head-on alpha (charge 2e). */
export const KE2_MEV_M = 1.43996e-15
export function closestApproach(kineticMeV: number, Z: number): number { return (2 * Z * KE2_MEV_M) / kineticMeV }
/** Rutherford deflection for impact parameter b, with d the head-on closest approach: θ = 2 tan⁻¹(d / 2b). */
export function deflectionDeg(b: number, d: number): number { return (2 * Math.atan(d / (2 * Math.abs(b))) * 180) / Math.PI }
/** Numerically integrated alpha path (scene units, speed 1, head-on closest approach d), clipped to the frame. */
export function alphaPath(b: number, d: number): V3[] {
  let x = -4.6, y = b, vx = 1, vy = 0
  const K = d / 2, dt = 0.004, pts: V3[] = [P(x, y)]
  const acc = (px: number, py: number) => { const r = Math.hypot(px, py), f = K / (r * r * r); return [f * px, f * py] }
  let [ax, ay] = acc(x, y)
  for (let n = 1; n < 6000; n++) {
    x += vx * dt + 0.5 * ax * dt * dt; y += vy * dt + 0.5 * ay * dt * dt
    const [nx, ny] = acc(x, y); vx += 0.5 * (ax + nx) * dt; vy += 0.5 * (ay + ny) * dt; ax = nx; ay = ny
    if (Math.abs(x) > 4.6 || Math.abs(y) > 4.6) break
    if (n % 25 === 0) pts.push(P(x, y))
  }
  return pts
}
export const SCATTER = { d: 0.6, impacts: [3.2, 1.8, 0.8, 0.3, 0.05, -0.8, -1.8, -3.2] }
export function buildAlphaScatteringScene(): SceneSpec {
  const { d, impacts } = SCATTER, r0 = closestApproach(7.7, 79)
  const far = impacts.filter((b) => Math.abs(b) >= 1.8), near = impacts.filter((b) => Math.abs(b) < 1.8)
  return {
    id: 'phys-alpha-scattering',
    title: 'Alpha scattering: mostly empty, with a tiny nucleus',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: `Show the evidence for the nuclear atom: alpha particles passing far from the nucleus are barely deflected (most of them), while the rare one aimed almost head-on is turned back through ${Math.round(deflectionDeg(0.05, d))}°. A 7.7 MeV alpha on gold gets no closer than ${r0.toExponential(1)} m, so the nucleus is smaller than that.`,
    ariaLabel: 'A small dot, the nucleus, in the centre. Alpha-particle paths come in from the left as horizontal lines. Those far above or below the nucleus continue almost straight; those closer are bent away, and the one aimed almost straight at the nucleus curves round and heads back to the left.',
    steps: [
      { narration: 'Alpha particles arrive from the left. Those passing far from the nucleus — the vast majority — go almost straight through: the atom is mostly empty space.', objects: [dot(P(0, 0), ROLE.input, 0.14), label('nucleus', P(0.2, -0.45), ROLE.input, 'detail'), ...far.map((b) => curve(alphaPath(b, d), ROLE.output)), label('most pass straight through', P(1.6, 4.0), ROLE.output, 'detail')] },
      { narration: `Closer paths are bent more, by θ = 2 tan⁻¹(d/2b): ${near.filter((b) => b > 0.1).map((b) => `${Math.round(deflectionDeg(b, d))}°`).join(', ')}. The rare alpha aimed almost straight at the nucleus is turned back through ${Math.round(deflectionDeg(0.05, d))}° — only a tiny, dense, positive nucleus can do that.`, objects: [...near.map((b) => curve(alphaPath(b, d), ROLE.result)), label('rare: turned back', P(-3.3, 0.6), ROLE.result, 'detail')] },
      { narration: `A head-on 7.7 MeV alpha on gold stops where its kinetic energy equals k(2e)(79e)/r₀: r₀ ≈ ${r0.toExponential(1)} m. The nucleus must be smaller still — in an atom about 10⁻¹⁰ m across.`, objects: [label(`closest approach ≈ ${r0.toExponential(1)} m (7.7 MeV, gold)`, P(0, -4.3), ROLE.result, 'primary')] },
    ],
  }
}

// ── 4. Nuclear size and density ──────────────────────────────────────────────

export const NUC = { R0fm: 1.2, u: 1.66054e-27 }
export function nuclearRadiusFm(A: number): number { return NUC.R0fm * Math.cbrt(A) }
export function nuclearDensity(A: number): number { const R = nuclearRadiusFm(A) * 1e-15; return (A * NUC.u) / ((4 / 3) * Math.PI * R ** 3) }
export function buildNucleusScene(): SceneSpec {
  const X0 = -4.2, SXA = 8.0 / 240, Y0 = -3.0, SR = 0.45
  const pts = Array.from({ length: 81 }, (_, i) => { const A = 1 + (239 * i) / 80; return P(X0 + A * SXA, Y0 + SR * nuclearRadiusFm(A)) })
  const marks: Array<[string, number]> = [['Fe-56', 56], ['U-238', 238]]
  const rho = nuclearDensity(56)
  return {
    id: 'phys-nucleus-size',
    title: 'Nuclear radius grows as A^(1/3) — density stays the same',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: `Show R = R₀A^(1/3) (R₀ = ${NUC.R0fm} fm): iron-56 is ${nuclearRadiusFm(56).toFixed(1)} fm and uranium-238 ${nuclearRadiusFm(238).toFixed(1)} fm, so volume grows in step with A and every nucleus has the same density, ${rho.toExponential(1)} kg/m³. A short-range nuclear force between nucleons holds it together against the protons' repulsion.`,
    ariaLabel: `A graph of nuclear radius in femtometres against mass number from 1 to 240: a curve rising steeply at first and then flattening, with iron-56 marked at ${nuclearRadiusFm(56).toFixed(1)} femtometres and uranium-238 at ${nuclearRadiusFm(238).toFixed(1)}. A horizontal line above it marks the density, the same for every nucleus.`,
    steps: [
      { narration: `Radius against mass number: R = ${NUC.R0fm} fm × A^(1/3). Iron-56: ${nuclearRadiusFm(56).toFixed(1)} fm. Uranium-238: ${nuclearRadiusFm(238).toFixed(1)} fm — only ${Math.cbrt(238).toFixed(1)} times a single proton.`, objects: [arrow(P(X0, Y0), P(4.4, Y0), ROLE.reference), arrow(P(X0, Y0), P(X0, 1.2), ROLE.reference), label('mass number A', P(3.3, Y0 - 0.45), ROLE.ink, 'detail'), label('R (fm)', P(X0 + 0.6, 1.4), ROLE.ink, 'detail'), curve(pts, ROLE.output), ...marks.flatMap(([n, A]) => [dot(P(X0 + A * SXA, Y0 + SR * nuclearRadiusFm(A)), ROLE.input, 0.1), label(`${n}: ${nuclearRadiusFm(A).toFixed(1)} fm`, P(X0 + A * SXA - 0.4, Y0 + SR * nuclearRadiusFm(A) + 0.4), ROLE.input, 'detail')])] },
      { narration: `Volume ∝ R³ ∝ A, and mass ∝ A, so A cancels: every nucleus has density ≈ ${rho.toExponential(1)} kg/m³. Heavier nuclei are bigger, not denser.`, objects: [line(P(X0, 2.6), P(4.4, 2.6), ROLE.result, 0.05), label(`density ≈ ${rho.toExponential(1)} kg/m³ for every A`, P(0.2, 3.1), ROLE.result, 'primary')] },
      { narration: 'What holds it together: the nuclear force — strongly attractive between any two nucleons at 1–2 fm, gone beyond a few fm. Gravity is about 10³⁶ times too weak.', objects: [label('nuclear force: strong at 1–2 fm, gone beyond a few fm', P(0.2, -4.3), ROLE.aid, 'detail')] },
    ],
  }
}
