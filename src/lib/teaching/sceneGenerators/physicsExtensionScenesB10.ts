/**
 * Physics coverage-driven KG extension, batch 10 (advanced tier, 2026-10-04):
 * figures for lasers, radiation safety, communication systems, and radiation
 * from accelerating charges. Same rules as physicsCoreScenes.ts: every number
 * drawn is computed here and pinned by src/tests/physicsExtensionBatch10.test.ts.
 */

import type { SceneSpec, SceneObject } from '@/lib/teaching/sceneSpec'
import { ROLE, arrow, curve, dot, label, line } from './visualDesign'
import { P, rect, type V3 } from './physicsCoreScenes'

// ── 1. Lasers ────────────────────────────────────────────────────────────────

export const HC_EV_NM = 1239.84
export const KT_ROOM_EV = 0.02585
export function photonEnergyEv(nm: number): number { return HC_EV_NM / nm }
export function photonRate(powerW: number, nm: number): number { return powerW / (photonEnergyEv(nm) * 1.602e-19) }
export function boltzmannFraction(dEeV: number, kTeV = KT_ROOM_EV): number { return Math.exp(-dEeV / kTeV) }
export function buildLaserScene(): SceneSpec {
  const E = photonEnergyEv(632.8), YG = -2.6, YM = 0.6, YP = 2.6, XL = -4.2, XR = -0.8
  const wave = (x0: number, y: number, len: number): V3[] => Array.from({ length: 33 }, (_, i) => P(x0 + (len * i) / 32, y + 0.18 * Math.sin((i / 32) * 6 * Math.PI)))
  const upper = [-3.8, -3.3, -2.8, -2.3, -1.8, -1.3], lower = [-3.4, -2.2]
  return {
    id: 'phys-laser',
    title: 'Laser: pump, population inversion, stimulated emission',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: `Show how a laser works: a pump lifts atoms to a high level, they drop quickly to a long-lived metastable level, building a population inversion (more atoms up than down); a ${E.toFixed(2)} eV photon (632.8 nm) then stimulates an identical photon — one in, two out. Without pumping, the fraction of atoms ${E.toFixed(2)} eV up at room temperature is only about ${boltzmannFraction(E).toExponential(0)}.`,
    ariaLabel: 'Left: three horizontal energy levels — ground, metastable and pump level. An upward arrow shows pumping to the top level, a short downward arrow shows a fast drop to the metastable level, and many dots on the metastable level outnumber the dots on the ground level. Right: one wavy photon arrow entering and two identical wavy photon arrows leaving.',
    steps: [
      { narration: 'Three levels: ground, a metastable level where atoms linger, and a pump level. The pump lifts atoms to the top; they drop quickly into the metastable level.', objects: [line(P(XL, YG), P(XR, YG), ROLE.reference, 0.05), line(P(XL, YM), P(XR, YM), ROLE.reference, 0.05), line(P(XL, YP), P(XR, YP), ROLE.reference, 0.05), label('ground', P(XL - 0.1, YG - 0.4), ROLE.ink, 'detail'), label('metastable', P(XL + 0.3, YM + 0.35), ROLE.ink, 'detail'), label('pump level', P(XL + 0.3, YP + 0.35), ROLE.ink, 'detail'), arrow(P(-1.2, YG), P(-1.2, YP), ROLE.input), label('pump', P(-0.7, 0), ROLE.input, 'detail'), arrow(P(-1.6, YP), P(-1.6, YM + 0.05), ROLE.aid)] },
      { narration: `Population inversion: more atoms wait in the metastable level than in the ground level. Heating never does this — at room temperature only about ${boltzmannFraction(E).toExponential(0)} of atoms are ${E.toFixed(2)} eV up.`, objects: [...upper.map((x) => dot(P(x, YM + 0.18), ROLE.output, 0.09)), ...lower.map((x) => dot(P(x, YG + 0.18), ROLE.output, 0.09)), label('inversion: 6 up, 2 down', P(-2.5, -3.6), ROLE.output, 'detail')] },
      { narration: `A ${E.toFixed(2)} eV photon (632.8 nm) passes an excited atom and stimulates an identical photon — same energy, direction and phase. One in, two out: amplification.`, objects: [curve(wave(0.2, 0.6, 1.8), ROLE.input), dot(P(2.4, 0.6), ROLE.output, 0.16), curve(wave(2.7, 0.9, 1.8), ROLE.result), curve(wave(2.7, 0.3, 1.8), ROLE.result), label(`${E.toFixed(2)} eV, 632.8 nm`, P(1.1, 1.3), ROLE.input, 'detail'), label('1 photon in → 2 identical out', P(2.4, -0.6), ROLE.result, 'primary')] },
    ],
  }
}

// ── 2. Radiation safety ──────────────────────────────────────────────────────

export const WEIGHTING = { alpha: 20, beta: 1, gamma: 1, xray: 1 }
export function equivalentDoseSv(absorbedGy: number, wR: number): number { return absorbedGy * wR }
export function doseRateAt(r: number, rate0: number, r0 = 1): number { return rate0 * (r0 / r) ** 2 }
export function buildRadiationSafetyScene(): SceneSpec {
  const R0 = 40, X0 = -4.2, Y0 = -3.6, KX = 0.85, KY = 0.15
  const pts: V3[] = Array.from({ length: 41 }, (_, i) => { const r = 0.6 + (i / 40) * 3.6; return P(X0 + r * KX, Y0 + Math.min(doseRateAt(r, R0), 50) * KY) })
  const marks = [1, 2, 4]
  const sources: Array<[string, number, string]> = [['α', 1.6, ROLE.input], ['β', 2.8, ROLE.output], ['γ', 4.4, ROLE.result]]
  return {
    id: 'phys-radiation-safety',
    title: 'Distance and shielding: dose rate falls as 1/r²',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: `Show the inverse-square fall of dose rate from a small source — ${R0} μSv/h at 1 m, ${doseRateAt(2, R0)} at 2 m, ${doseRateAt(4, R0)} at 4 m — and what stops each radiation: paper stops alpha, aluminium stops beta, lead reduces gamma. Equivalent dose weights alpha 20 times: 0.1 mGy of alpha is ${equivalentDoseSv(0.1, WEIGHTING.alpha)} mSv.`,
    ariaLabel: 'Left: a falling curve of dose rate against distance, with points marked at 1, 2 and 4 metres. Right: three radiation arrows, alpha, beta and gamma, approaching sheets of paper, aluminium and lead; alpha stops at the paper, beta at the aluminium, and gamma passes the aluminium but is reduced by the lead.',
    steps: [
      { narration: `From a small source the radiation spreads over 4πr², so the dose rate falls as 1/r²: ${R0} μSv/h at 1 m, ${doseRateAt(2, R0)} μSv/h at 2 m, ${doseRateAt(4, R0)} μSv/h at 4 m. Doubling the distance quarters it.`, objects: [arrow(P(X0, Y0), P(-0.3, Y0), ROLE.reference), arrow(P(X0, Y0), P(X0, 4.2), ROLE.reference), label('distance (m)', P(-1.4, Y0 - 0.45), ROLE.ink, 'detail'), label('dose rate (μSv/h)', P(X0 + 1.4, 4.4), ROLE.ink, 'detail'), curve(pts, ROLE.output), ...marks.flatMap((r) => [dot(P(X0 + r * KX, Y0 + doseRateAt(r, R0) * KY), ROLE.input, 0.1), label(`${r} m: ${doseRateAt(r, R0)}`, P(X0 + r * KX + 0.7, Y0 + doseRateAt(r, R0) * KY + 0.35), ROLE.input, 'detail')])] },
      { narration: 'Shielding: a sheet of paper stops alpha; a few millimetres of aluminium stop beta; gamma needs thick lead or concrete, and is only reduced.', objects: [...rect(1.4, -2.6, 1.55, 2.6, ROLE.reference), ...rect(2.6, -2.6, 2.9, 2.6, ROLE.reference), ...rect(3.9, -2.6, 4.5, 2.6, ROLE.reference), label('paper', P(1.45, 2.95), ROLE.ink, 'detail'), label('Al', P(2.75, 2.95), ROLE.ink, 'detail'), label('lead', P(4.2, 2.95), ROLE.ink, 'detail'), ...sources.map(([n, stop, role], i) => arrow(P(0.2, 1.6 - 1.6 * i), P(n === 'γ' ? 4.7 : stop - 0.2, 1.6 - 1.6 * i), role)), ...sources.map(([n, , role], i) => label(n, P(0, 1.95 - 1.6 * i), role, 'detail'))] },
      { narration: `Equivalent dose = absorbed dose × weighting factor: alpha counts 20 times. 0.1 mGy of alpha inside the lungs is ${equivalentDoseSv(0.1, WEIGHTING.alpha)} mSv — harmless outside the skin, dangerous inside.`, objects: [label(`0.1 mGy α × 20 = ${equivalentDoseSv(0.1, WEIGHTING.alpha)} mSv`, P(2.9, -3.6), ROLE.result, 'primary')] },
    ],
  }
}

// ── 3. Communication systems ─────────────────────────────────────────────────

export const C_LIGHT = 3.0e8
export const EARTH_R = 6.4e6
export function quarterWaveM(fHz: number): number { return C_LIGHT / fHz / 4 }
export function amBandwidthHz(maxAudioHz: number): number { return 2 * maxAudioHz }
export function horizonM(h: number, R = EARTH_R): number { return Math.sqrt(2 * R * h) }
export function buildModulationScene(): SceneSpec {
  const X0 = -4.4, LEN = 8.8, N = 241
  const sig = (u: number) => Math.sin(2 * Math.PI * 2 * u)
  const signal = Array.from({ length: N }, (_, i) => { const u = i / (N - 1); return P(X0 + LEN * u, 3.0 + 0.6 * sig(u)) })
  const am = Array.from({ length: N }, (_, i) => { const u = i / (N - 1); return P(X0 + LEN * u, 0.4 + (0.6 + 0.35 * sig(u)) * Math.sin(2 * Math.PI * 24 * u)) })
  let phase = 0
  const fm = Array.from({ length: N }, (_, i) => { const u = i / (N - 1); if (i > 0) phase += 2 * Math.PI * (24 + 10 * sig(u)) / (N - 1); return P(X0 + LEN * u, -2.4 + 0.6 * Math.sin(phase)) })
  return {
    id: 'phys-modulation',
    title: 'AM and FM: the audio rides on a carrier',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: `Show why and how audio is put on a carrier: a 1 kHz signal would need a quarter-wave antenna ${(quarterWaveM(1e3) / 1000).toFixed(0)} km long, a 100 MHz carrier only ${quarterWaveM(1e8).toFixed(2)} m. In AM the carrier's amplitude follows the audio; in FM its frequency does. A 100 m mast's line-of-sight range is about ${(horizonM(100) / 1000).toFixed(0)} km.`,
    ariaLabel: 'Three waveforms stacked. Top: a slow audio signal. Middle: a fast carrier whose height swells and shrinks following the audio (AM). Bottom: a carrier of constant height whose waves bunch together and spread apart following the audio (FM).',
    steps: [
      { narration: `The audio signal. Broadcast directly at 1 kHz it would need an antenna about ${(quarterWaveM(1e3) / 1000).toFixed(0)} km long — so it rides on a high-frequency carrier instead (100 MHz: ${quarterWaveM(1e8).toFixed(2)} m).`, objects: [curve(signal, ROLE.input), label('audio signal', P(-3.6, 4.0), ROLE.input, 'detail')] },
      { narration: 'AM: the carrier\'s amplitude rises and falls with the audio. FM: the amplitude stays constant and the frequency rises and falls instead — so noise, which mostly changes amplitude, hurts FM less.', objects: [curve(am, ROLE.output), label('AM — amplitude follows audio', P(-2.6, 1.45), ROLE.output, 'detail'), curve(fm, ROLE.result), label('FM — frequency follows audio', P(-2.6, -1.35), ROLE.result, 'detail')] },
      { narration: `Propagation: 3–30 MHz short waves bounce off the ionosphere; FM and TV travel line of sight — a 100 m mast reaches about ${(horizonM(100) / 1000).toFixed(0)} km.`, objects: [label(`AM bandwidth = 2 × 5 kHz = ${amBandwidthHz(5000) / 1000} kHz · 100 m mast: ${(horizonM(100) / 1000).toFixed(0)} km`, P(0, -4.0), ROLE.aid, 'detail')] },
    ],
  }
}

// ── 4. Radiation from accelerating charges ───────────────────────────────────

export const SOLAR_I = 1361
export function radiationPressure(I: number, reflecting: boolean): number { return (reflecting ? 2 : 1) * I / C_LIGHT }
export function halfWaveDipoleM(fHz: number): number { return C_LIGHT / fHz / 2 }
export function buildDipoleScene(): SceneSpec {
  const CX = -2.0, CY = 0.2, S = 2.2
  const lobe = (side: number): V3[] => Array.from({ length: 41 }, (_, i) => { const th = (i / 40) * Math.PI; const r = S * Math.sin(th) ** 2; return P(CX + side * r * Math.sin(th), CY + r * Math.cos(th)) })
  const pAbs = radiationPressure(SOLAR_I, false), pRef = radiationPressure(SOLAR_I, true)
  return {
    id: 'phys-dipole-radiation',
    title: 'A dipole radiates broadside; light pushes',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: `Show that only accelerating charges radiate: charges oscillating along a vertical dipole radiate most strongly sideways and not at all along the rod (a sin²θ pattern); a half-wave dipole for 100 MHz is ${halfWaveDipoleM(1e8)} m. Light carries momentum p = E/c: sunlight presses ${(pAbs * 1e6).toFixed(1)} μPa on a black surface and ${(pRef * 1e6).toFixed(1)} μPa on a mirror.`,
    ariaLabel: 'Left: a vertical antenna rod with two rounded lobes on either side forming a figure-of-eight; the lobes are widest to the sides and shrink to nothing above and below the rod. Right: sunlight arrows striking a mirror sail and reflecting back, with a push arrow on the sail.',
    steps: [
      { narration: 'Charges surge up and down the rod — they accelerate, so they radiate. Seen from the side the acceleration is fully visible: strongest radiation. Seen from the end, nothing moves sideways: zero radiation along the axis.', objects: [line(P(CX, CY - 1.6), P(CX, CY + 1.6), ROLE.ink, 0.08), arrow(P(CX + 0.25, CY - 0.6), P(CX + 0.25, CY + 0.6), ROLE.input), curve(lobe(1), ROLE.output), curve(lobe(-1), ROLE.output), label('max', P(CX + S + 0.4, CY), ROLE.output, 'detail'), label('zero', P(CX, CY + 2.0), ROLE.aid, 'detail')] },
      { narration: `A steady DC current would not radiate at all. A half-wave dipole for 100 MHz is ${halfWaveDipoleM(1e8)} m long; its wave's electric field is parallel to the rod.`, objects: [label(`half-wave dipole, 100 MHz: ${halfWaveDipoleM(1e8)} m`, P(CX, -3.0), ROLE.ink, 'detail')] },
      { narration: `Light carries momentum p = E/c. Sunlight (${SOLAR_I} W/m²) pushes a black surface with I/c = ${(pAbs * 1e6).toFixed(1)} μPa and a mirror with 2I/c = ${(pRef * 1e6).toFixed(1)} μPa — the reflected light's momentum reverses.`, objects: [line(P(3.6, -1.6), P(3.6, 1.6), ROLE.reference, 0.08), arrow(P(1.6, 0.8), P(3.5, 0.8), ROLE.input), arrow(P(3.5, 0.3), P(1.6, 0.3), ROLE.input), arrow(P(3.7, -0.6), P(4.6, -0.6), ROLE.result), label('sail', P(3.6, 1.95), ROLE.ink, 'detail'), label(`mirror: ${(pRef * 1e6).toFixed(1)} μPa`, P(2.9, -2.4), ROLE.result, 'primary')] },
    ],
  }
}
