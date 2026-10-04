/**
 * Physics coverage-driven KG extension, batch 11 (advanced tier, 2026-10-04):
 * figures for coupled oscillators, nonlinear dynamics and chaos, fields in
 * matter, and superconductivity. Same rules as physicsCoreScenes.ts: every number
 * drawn is computed here and pinned by src/tests/physicsExtensionBatch11.test.ts.
 */

import type { SceneSpec, SceneObject } from '@/lib/teaching/sceneSpec'
import { ROLE, arrow, curve, dot, label, line } from './visualDesign'
import { P, circlePoints, rect, type V3 } from './physicsCoreScenes'

// ── 1. Coupled oscillators ───────────────────────────────────────────────────

export function modeFrequencies(k: number, m: number): [number, number] { return [Math.sqrt(k / m), Math.sqrt((3 * k) / m)] }
/** Two pendulums of length L coupled by a weak spring (k/m per unit mass). */
export function pendulumModes(g: number, L: number, kOverM: number): [number, number] { return [Math.sqrt(g / L), Math.sqrt(g / L + 2 * kOverM)] }
export function swapTime(w1: number, w2: number): number { return Math.PI / (w2 - w1) }
export const COUPLED = { k: 10, m: 0.1, g: 9.8, L: 1, kOverM: 0.5 }
export function buildCoupledScene(): SceneSpec {
  const [w1, w2] = modeFrequencies(COUPLED.k, COUPLED.m)
  const [p1, p2] = pendulumModes(COUPLED.g, COUPLED.L, COUPLED.kOverM), ts = swapTime(p1, p2), Tb = 2 * ts
  const X0 = -4.4, LEN = 8.8, N = 801, wb = (p1 + p2) / 2, dw = p2 - p1
  const trace = (which: 1 | 2, y0: number): V3[] => Array.from({ length: N }, (_, i) => { const t = (Tb * i) / (N - 1); const env = which === 1 ? Math.cos((dw * t) / 2) : Math.sin((dw * t) / 2); return P(X0 + (LEN * t) / Tb, y0 + 0.75 * env * (which === 1 ? Math.cos(wb * t) : Math.sin(wb * t))) })
  const block = (x: number, y: number): SceneObject[] => rect(x - 0.25, y - 0.25, x + 0.25, y + 0.25, ROLE.output)
  const YA = 3.6
  return {
    id: 'phys-coupled-oscillators',
    title: 'Two normal modes, and energy passing back and forth',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: `Show the two normal modes of two masses between three springs — in phase at √(k/m) = ${w1.toFixed(0)} rad/s, out of phase at √(3k/m) = ${w2.toFixed(1)} rad/s — and how starting one of two weakly coupled pendulums (modes ${p1.toFixed(3)} and ${p2.toFixed(3)} rad/s) passes all the energy to the other every π/(ω₂ − ω₁) ≈ ${ts.toFixed(0)} s.`,
    ariaLabel: `Top: two masses between three springs drawn twice, once with both arrows pointing the same way and once with arrows pointing apart. Below: two oscillation traces over ${Tb.toFixed(0)} seconds; the first starts large and shrinks to nothing at ${ts.toFixed(0)} seconds while the second grows from nothing to full, then they swap back.`,
    steps: [
      { narration: `Two normal modes. In phase, the middle spring never stretches: ω₁ = √(k/m) = ${w1.toFixed(0)} rad/s. Out of phase, the middle spring adds to the restoring force: ω₂ = √(3k/m) = ${w2.toFixed(1)} rad/s.`, objects: [line(P(-4.6, YA), P(-3.5, YA), ROLE.reference, 0.03), ...block(-3.25, YA), line(P(-3.0, YA), P(-2.2, YA), ROLE.reference, 0.03), ...block(-1.95, YA), line(P(-1.7, YA), P(-0.8, YA), ROLE.reference, 0.03), arrow(P(-3.45, YA + 0.5), P(-2.95, YA + 0.5), ROLE.input), arrow(P(-2.15, YA + 0.5), P(-1.65, YA + 0.5), ROLE.input), label(`in phase ${w1.toFixed(0)} rad/s`, P(-2.6, YA - 0.6), ROLE.input, 'detail'), line(P(0.8, YA), P(1.9, YA), ROLE.reference, 0.03), ...block(2.15, YA), line(P(2.4, YA), P(3.2, YA), ROLE.reference, 0.03), ...block(3.45, YA), line(P(3.7, YA), P(4.6, YA), ROLE.reference, 0.03), arrow(P(2.4, YA + 0.5), P(1.9, YA + 0.5), ROLE.result), arrow(P(3.2, YA + 0.5), P(3.7, YA + 0.5), ROLE.result), label(`out of phase ${w2.toFixed(1)} rad/s`, P(2.8, YA - 0.6), ROLE.result, 'detail')] },
      { narration: `Start one pendulum alone (modes ${p1.toFixed(3)} and ${p2.toFixed(3)} rad/s). Its swing dies away as the other's grows; after ${ts.toFixed(0)} s all the energy has moved across, and then it comes back.`, objects: [curve(trace(1, 0.9), ROLE.output), curve(trace(2, -1.6), ROLE.aid), label('pendulum 1', P(-3.7, 1.9), ROLE.output, 'detail'), label('pendulum 2', P(-3.7, -0.6), ROLE.aid, 'detail')] },
      { narration: `A full swap every π/(ω₂ − ω₁) ≈ ${ts.toFixed(0)} s. Weaker coupling brings the mode frequencies closer and slows the swap; a string's many modes are its standing waves.`, objects: [line(P(0, -2.6), P(0, 1.9), ROLE.reference, 0.015), label(`swap time = π/(ω₂ − ω₁) ≈ ${ts.toFixed(0)} s`, P(0, -3.0), ROLE.result, 'primary')] },
    ],
  }
}

// ── 2. Nonlinear dynamics: the logistic map ──────────────────────────────────

export function logisticStep(r: number, x: number): number { return r * x * (1 - x) }
export function iterateLogistic(r: number, x0: number, n: number): number[] { const out = [x0]; for (let i = 0; i < n; i++) out.push(logisticStep(r, out[out.length - 1])); return out }
export function fixedPoint(r: number): number { return 1 - 1 / r }
export function divergenceStep(r: number, x0: number, dx: number, threshold = 0.1, maxN = 200): number {
  let a = x0, b = x0 + dx
  for (let n = 1; n <= maxN; n++) { a = logisticStep(r, a); b = logisticStep(r, b); if (Math.abs(a - b) > threshold) return n }
  return -1
}
export function buildChaosScene(): SceneSpec {
  const N = 40, X0 = -4.4, SX = 8.8 / N
  const plot = (xs: number[], y0: number, h: number): V3[] => xs.map((x, i) => P(X0 + i * SX, y0 + h * x))
  const stable = iterateLogistic(2.8, 0.2, N), a = iterateLogistic(3.9, 0.2, N), b = iterateLogistic(3.9, 0.200001, N)
  const nDiv = divergenceStep(3.9, 0.2, 1e-6)
  return {
    id: 'phys-logistic-chaos',
    title: 'Deterministic chaos: same rule, tiny difference, different future',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: `Show the logistic map x → r x(1 − x): at r = 2.8 it settles to the fixed point ${fixedPoint(2.8).toFixed(3)}; at r = 3.9 two runs starting 10⁻⁶ apart (0.200000 and 0.200001) track each other and then separate completely by step ${nDiv} — deterministic, yet unpredictable in practice.`,
    ariaLabel: `Top: a sequence of points that wobbles and then settles onto a flat line at ${fixedPoint(2.8).toFixed(3)}. Bottom: two jagged sequences that lie on top of each other for the first twenty steps or so and then separate into completely different patterns.`,
    steps: [
      { narration: `r = 2.8: every start settles to the fixed point 1 − 1/r = ${fixedPoint(2.8).toFixed(3)}. Small differences die away.`, objects: [line(P(X0, 1.0), P(4.4, 1.0), ROLE.reference, 0.02), curve(plot(stable, 1.0, 3.0), ROLE.output), label(`r = 2.8 → ${fixedPoint(2.8).toFixed(3)}`, P(2.6, 4.3), ROLE.output, 'detail')] },
      { narration: 'r = 3.9: chaos. Two runs start at 0.200000 and 0.200001 — the rule is exactly the same, with no randomness.', objects: [line(P(X0, -4.0), P(4.4, -4.0), ROLE.reference, 0.02), curve(plot(a, -4.0, 3.6), ROLE.input), label('r = 3.9', P(3.6, -0.1), ROLE.input, 'detail')] },
      { narration: `The second run sits on top of the first — until the millionth grows. By step ${nDiv} they differ by more than 0.1, and soon they are unrelated. Deterministic, but unpredictable in practice.`, objects: [curve(plot(b, -4.0, 3.6), ROLE.result), line(P(X0 + nDiv * SX, -4.2), P(X0 + nDiv * SX, -0.2), ROLE.aid, 0.02), label(`diverge by step ${nDiv}`, P(X0 + nDiv * SX, -4.5), ROLE.aid, 'detail')] },
    ],
  }
}

// ── 3. Fields in matter ──────────────────────────────────────────────────────

export const EPS0 = 8.854e-12
export const MU0 = 4 * Math.PI * 1e-7
export function fieldInDielectric(sigmaFree: number, er: number): number { return sigmaFree / (er * EPS0) }
export function polarisation(sigmaFree: number, er: number): number { return sigmaFree - EPS0 * fieldInDielectric(sigmaFree, er) }
export function solenoidH(n: number, I: number): number { return n * I }
export function solenoidB(n: number, I: number, mur = 1): number { return mur * MU0 * solenoidH(n, I) }
export function buildFieldsInMatterScene(): SceneSpec {
  const sig = 1e-6, er = 4, E0 = fieldInDielectric(sig, 1), E = fieldInDielectric(sig, er), Pz = polarisation(sig, er)
  const XL = -3.4, XR = 0.4, SL = -2.4, SR = -0.6, L0 = 0.85
  const len = (field: number) => L0 * field / E0
  const ys = [-1.8, -0.6, 0.6, 1.8]
  return {
    id: 'phys-fields-in-matter',
    title: 'A dielectric weakens E; D is set by the free charge',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: `Show a parallel-plate capacitor with free charge density ${sig.toExponential(1)} C/m² and a glass slab (ε_r = ${er}): bound surface charge on the slab opposes the plates' field, so E falls from ${E0.toExponential(2)} V/m in the gap to ${E.toExponential(2)} V/m in the glass, while D = ${sig.toExponential(1)} C/m² is unchanged; P = ${Pz.toExponential(1)} C/m². In a solenoid H = nI is fixed by the free current while an iron core multiplies B.`,
    ariaLabel: 'A positive plate on the left and a negative plate on the right with a glass slab between them. Long field arrows cross the air gaps; shorter arrows cross the glass. The glass faces carry bound charges: minus next to the positive plate, plus next to the negative plate.',
    steps: [
      { narration: `Free charge on the plates: σ = ${sig.toExponential(1)} C/m². With no glass, E = σ/ε₀ = ${E0.toExponential(2)} V/m.`, objects: [line(P(XL, -2.6), P(XL, 2.6), ROLE.input, 0.08), line(P(XR, -2.6), P(XR, 2.6), ROLE.output, 0.08), ...ys.map((y) => label('+', P(XL - 0.35, y), ROLE.input, 'detail')), ...ys.map((y) => label('−', P(XR + 0.35, y), ROLE.output, 'detail')), ...ys.map((y) => arrow(P(XL + 0.05, y), P(XL + 0.05 + len(E0), y), ROLE.reference))] },
      { narration: `Slide in glass (ε_r = ${er}). It polarises: bound − charge next to the + plate, bound + next to the − plate. Their field opposes the plates', so inside the glass E = σ/(ε_rε₀) = ${E.toExponential(2)} V/m — a quarter.`, objects: [...rect(SL, -2.4, SR, 2.4, ROLE.aid), ...ys.map((y) => label('−', P(SL + 0.18, y + 0.3), ROLE.aid, 'detail')), ...ys.map((y) => label('+', P(SR - 0.18, y + 0.3), ROLE.aid, 'detail')), ...ys.map((y) => arrow(P(SL + 0.8, y - 0.25), P(SL + 0.8 + len(E), y - 0.25), ROLE.result)), label(`E in glass ${E.toExponential(2)} V/m`, P(-1.5, -3.2), ROLE.result, 'detail')] },
      { narration: `D = ε₀E + P depends only on the free charge: still ${sig.toExponential(1)} C/m²; P = ${Pz.toExponential(1)} C/m². Likewise H = nI follows the free current: ${solenoidH(1000, 2)} A/m in a solenoid, while an iron core (μ_r = 500) lifts B from ${(solenoidB(1000, 2) * 1000).toFixed(1)} mT to ${solenoidB(1000, 2, 500).toFixed(2)} T.`, objects: [label('D = ε₀E + P (free charge only)', P(2.7, 1.2), ROLE.ink, 'primary'), label(`P = ${Pz.toExponential(1)} C/m²`, P(2.7, 0.3), ROLE.aid, 'detail'), label(`H = ${solenoidH(1000, 2)} A/m · B: ${(solenoidB(1000, 2) * 1000).toFixed(1)} mT → ${solenoidB(1000, 2, 500).toFixed(2)} T`, P(1.6, -4.2), ROLE.result, 'detail')] },
    ],
  }
}

// ── 4. Superconductivity ─────────────────────────────────────────────────────

export function criticalField(Bc0: number, T: number, Tc: number): number { return T >= Tc ? 0 : Bc0 * (1 - (T / Tc) ** 2) }
export const LEAD = { Bc0: 0.080, Tc: 7.2 }
export function buildSuperconductivityScene(): SceneSpec {
  const X0 = -4.4, Y0 = -0.4, SX = 4.0 / 12, Tc = LEAD.Tc
  const normal = Array.from({ length: 41 }, (_, i) => { const T = (12 * i) / 40; return P(X0 + T * SX, Y0 + 0.6 + 0.02 * T * T) })
  // A different metal, so above T_c it follows its OWN normal-state curve (a
  // little higher), not the normal metal's: drawn on the same line, the two
  // read as one, and the normal metal seemed to end at T_c (browser review).
  const sc = Array.from({ length: 41 }, (_, i) => { const T = (12 * i) / 40; return P(X0 + T * SX, T < Tc ? Y0 : Y0 + 1.3 + 0.02 * T * T) })
  const GX0 = 0.6, GY0 = -4.0, GSX = 3.6 / Tc, GSY = 3.2 / LEAD.Bc0
  const dome = Array.from({ length: 41 }, (_, i) => { const T = (Tc * i) / 40; return P(GX0 + T * GSX, GY0 + criticalField(LEAD.Bc0, T, Tc) * GSY) })
  const b42 = criticalField(LEAD.Bc0, 4.2, Tc)
  return {
    id: 'phys-superconductivity',
    title: 'Zero resistance below T_c, and a critical field',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: `Show the two signatures of superconductivity: resistance dropping abruptly to exactly zero at T_c (a normal metal levels off at a small residual value) and the critical field limit B_c(T) = B_c(0)[1 − (T/T_c)²] — for lead ${LEAD.Bc0} T at 0 K and about ${b42.toFixed(3)} T at 4.2 K, vanishing at T_c = ${Tc} K. Below the dome it is superconducting and expels fields (Meissner effect).`,
    ariaLabel: `Left: resistance against temperature for two materials; one curve falls smoothly and levels off above zero, the other drops vertically to zero at ${Tc} kelvin. Right: a dome-shaped curve of critical magnetic field against temperature, highest at absolute zero and reaching zero at ${Tc} kelvin, with the point at 4.2 kelvin marked.`,
    steps: [
      { narration: 'Cooling a normal metal: resistance falls and levels off at a small residual value. Cooling a superconductor: at T_c it drops abruptly to exactly zero.', objects: [arrow(P(X0, Y0 - 0.2), P(X0 + 4.4, Y0 - 0.2), ROLE.reference), arrow(P(X0, Y0 - 0.2), P(X0, 4.0), ROLE.reference), label('T (K)', P(X0 + 4.0, Y0 - 0.6), ROLE.ink, 'detail'), label('resistance', P(X0 + 0.9, 4.2), ROLE.ink, 'detail'), curve(normal, ROLE.output), curve(sc, ROLE.input), label('normal metal', P(X0 + 3.3, 1.5), ROLE.output, 'detail'), label(`R = 0 below T_c = ${Tc} K`, P(X0 + 1.4, Y0 + 0.35), ROLE.input, 'detail')] },
      { narration: 'Below T_c it also expels magnetic fields — the Meissner effect — so a magnet floats above it. A merely perfect conductor would trap the field instead.', objects: [curve(circlePoints(2.4, 2.6, 0.7, 0, 2 * Math.PI, 32), ROLE.input), ...[-1.2, 1.2].map((dy) => curve(Array.from({ length: 17 }, (_, i) => { const x = 0.8 + (3.2 * i) / 16; const bulge = dy > 0 ? 1 : -1; const d = Math.abs(x - 2.4); return P(x, 2.6 + dy * 0.75 + bulge * Math.max(0, 0.35 * (1 - d / 1.2))) }), ROLE.aid)), label('field lines go round', P(2.4, 4.4), ROLE.aid, 'detail')] },
      { narration: `The state survives only below a critical field: B_c = B_c(0)[1 − (T/T_c)²]. For lead, ${LEAD.Bc0} T at 0 K, about ${b42.toFixed(3)} T at 4.2 K, zero at ${Tc} K.`, objects: [arrow(P(GX0, GY0), P(GX0 + 4.0, GY0), ROLE.reference), arrow(P(GX0, GY0), P(GX0, GY0 + 3.6), ROLE.reference), curve(dome, ROLE.result), dot(P(GX0 + 4.2 * GSX, GY0 + b42 * GSY), ROLE.input, 0.1), label(`4.2 K: ${b42.toFixed(3)} T`, P(GX0 + 4.2 * GSX + 0.2, GY0 + b42 * GSY + 0.4), ROLE.input, 'detail'), label('superconducting', P(GX0 + 1.5, GY0 + 0.8), ROLE.result, 'detail')] },
    ],
  }
}
