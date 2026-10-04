/**
 * Physics coverage-driven KG extension, batch 3 (2026-10-03): figures for
 * Newton's law of cooling, blackbody radiation, energy resources, and echo and
 * SONAR. Same rules as physicsCoreScenes.ts: every number drawn is computed here
 * and pinned by src/tests/physicsExtensionBatch3.test.ts.
 */

import type { SceneSpec, SceneObject } from '@/lib/teaching/sceneSpec'
import { ROLE, arrow, curve, dot, label, line } from './visualDesign'
import { P, rect, type V3 } from './physicsCoreScenes'

// ── 1. Newton's law of cooling ───────────────────────────────────────────────

/** Tea from 80 °C in a 20 °C room, excess × 2/3 every 10 min. */
export const TEA = { T0: 80, Ts: 20, ratioPer10: 2 / 3 }
export function teaTemp(tMin: number, c = TEA): number { return c.Ts + (c.T0 - c.Ts) * Math.pow(c.ratioPer10, tMin / 10) }
export function buildCoolingScene(): SceneSpec {
  const X0 = -4.0, Y0 = -3.0, SX = 0.15, SY = 0.08
  const gx = (t: number) => X0 + t * SX, gy = (T: number) => Y0 + T * SY
  const pts: V3[] = Array.from({ length: 48 }, (_, i) => { const t = (52 * i) / 47; return P(gx(t), gy(teaTemp(t))) })
  const marks = [0, 10, 20, 30, 40]
  return {
    id: 'phys-newtons-cooling',
    title: 'Newton\'s law of cooling: fast at first, then slower',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show that a hot body cools fastest when it is much hotter than its surroundings: tea at 80 °C in a 20 °C room falls 20 °C in the first 10 minutes but only about 6 °C in the fourth, approaching room temperature without crossing it.',
    ariaLabel: 'A graph of temperature against time. A curve starts at 80 degrees and falls steeply, then flattens out, getting closer and closer to a horizontal dashed line at 20 degrees, the room temperature. Dots mark the temperature every ten minutes.',
    steps: [
      { narration: `Tea starts at ${TEA.T0} °C in a ${TEA.Ts} °C room. Its temperature is marked every 10 minutes.`, objects: [arrow(P(X0, Y0), P(gx(55), Y0), ROLE.reference), arrow(P(X0, Y0), P(X0, gy(92)), ROLE.reference), label('time (min)', P(gx(50), Y0 - 0.45), ROLE.ink, 'detail'), label('T (°C)', P(X0 + 0.8, gy(92)), ROLE.ink, 'detail'), ...marks.map((t) => dot(P(gx(t), gy(teaTemp(t))), ROLE.input, 0.12))] },
      { narration: 'Joined smoothly, the curve is steep at first and flattens out: the closer the tea gets to room temperature, the more slowly it cools.', objects: [curve(pts, ROLE.input), line(P(X0, gy(TEA.Ts)), P(gx(54), gy(TEA.Ts)), ROLE.aid, 0.02), label(`room ${TEA.Ts} °C`, P(gx(46), gy(TEA.Ts) - 0.4), ROLE.aid, 'detail')] },
      { narration: `The excess over the room falls by the same fraction every 10 minutes: 60, 40, 27, 18, 12 °C. Rate of cooling ∝ (T − T_s).`, objects: [label('rate ∝ (T − Ts)', P(1.2, 3.4), ROLE.result, 'primary'), label('first 10 min: −20 °C', P(gx(14) + 1.2, gy(teaTemp(5)) + 0.3), ROLE.ink, 'detail'), label(`10 min at 30–40: −${Math.round(teaTemp(30) - teaTemp(40))} °C`, P(gx(35) + 0.3, gy(teaTemp(35)) + 0.9), ROLE.ink, 'detail')] },
    ],
  }
}

// ── 2. Blackbody radiation ───────────────────────────────────────────────────

const H = 6.626e-34, C = 2.998e8, KB = 1.381e-23
export const WIEN_B = 2.9e-3
/** Planck spectral radiance (relative units suffice for the drawing). */
export function planck(lambda: number, T: number): number { return (2 * H * C * C) / Math.pow(lambda, 5) / (Math.exp((H * C) / (lambda * KB * T)) - 1) }
export function wienPeak(T: number): number { return WIEN_B / T }
export const BB_TEMPS = [3000, 4500, 6000]
export function buildBlackbodyScene(): SceneSpec {
  const X0 = -4.0, Y0 = -3.0, SX = 2.6 / 1e-6 /* 2.6 units per μm */, ymax = planck(wienPeak(6000), 6000), SY = 5.8 / ymax
  const gx = (lam: number) => X0 + lam * SX, gy = (b: number) => Y0 + b * SY
  const colours = [ROLE.input, ROLE.result, ROLE.output]
  const curves = BB_TEMPS.map((T, k) => curve(Array.from({ length: 60 }, (_, i) => { const lam = 0.1e-6 + (2.9e-6 * i) / 59; return P(gx(lam), gy(planck(lam, T))) }), colours[k]))
  const peaks = BB_TEMPS.map((T, k) => dot(P(gx(wienPeak(T)), gy(planck(wienPeak(T), T))), colours[k], 0.11))
  return {
    id: 'phys-blackbody',
    title: 'Blackbody spectra: hotter peaks bluer and much higher',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: `Show blackbody spectra at ${BB_TEMPS.join(', ')} K: as temperature rises the peak moves to shorter wavelength (Wien, λ_max T ≈ 2.9 × 10⁻³ m·K) and the whole curve grows enormously (total power ∝ T⁴).`,
    ariaLabel: 'A graph of radiated intensity against wavelength with three hump-shaped curves. The coolest, 3000 kelvin, is low with its peak near 1 micrometre. The 4500 kelvin curve is higher and peaks further left. The hottest, 6000 kelvin, is far taller and peaks near half a micrometre.',
    steps: [
      { narration: 'Intensity radiated at each wavelength by a blackbody at three temperatures.', objects: [arrow(P(X0, Y0), P(gx(3.15e-6), Y0), ROLE.reference), arrow(P(X0, Y0), P(X0, gy(ymax) + 0.6), ROLE.reference), label('wavelength (μm)', P(gx(2.6e-6), Y0 - 0.45), ROLE.ink, 'detail'), label('intensity', P(X0 + 0.9, gy(ymax) + 0.7), ROLE.ink, 'detail'), ...curves] },
      { narration: `Each peak is at λ_max = 2.9 × 10⁻³ / T: ${BB_TEMPS.map((T) => `${(wienPeak(T) * 1e6).toFixed(2)} μm at ${T} K`).join(', ')}. Hotter shifts the peak toward blue.`, objects: [...peaks, ...BB_TEMPS.map((T, k) => label(`${T} K`, P(gx(wienPeak(T)) + 0.75, gy(planck(wienPeak(T), T)) + 0.25), colours[k], 'detail'))] },
      { narration: 'The area under each curve is the total power: doubling the kelvin temperature (3000 K to 6000 K) multiplies it by 2⁴ = 16.', objects: [label('λmax·T ≈ 2.9 × 10⁻³ m·K', P(1.6, 3.5), ROLE.result, 'primary'), label('P ∝ T⁴', P(2.4, 2.6), ROLE.result, 'detail')] },
    ],
  }
}

// ── 3. Energy resources ──────────────────────────────────────────────────────

/** Power-station energy flow: 1000 MJ in, 350 MJ electrical out. */
export const STATION = { input: 1000, useful: 350 }
export function efficiency(s = STATION): number { return s.useful / s.input }
export function buildEnergyResourcesScene(): SceneSpec {
  const eff = efficiency(), waste = STATION.input - STATION.useful, W = 0.0028
  const band = (x0: number, y0: number, x1: number, y1: number, mj: number, c: string): SceneObject[] => {
    const th = mj * W, out: SceneObject[] = []
    for (let k = 0; k < 6; k++) { const off = (k / 5 - 0.5) * th; out.push(line(P(x0, y0 + off), P(x1, y1 + off), c, Math.max(0.03, th / 6))) }
    return out
  }
  return {
    id: 'phys-energy-resources',
    title: 'Energy is transformed, not used up',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: `Show a power station's energy flow: ${STATION.input} MJ of fuel energy in, ${STATION.useful} MJ of electrical energy out, ${waste} MJ out as heat — efficiency ${Math.round(eff * 100)} %, and nothing destroyed.`,
    ariaLabel: `An energy-flow diagram. A wide band on the left labelled fuel ${STATION.input} megajoules enters a box labelled power station. On the right it splits: a narrower band labelled electricity ${STATION.useful} megajoules continues ahead, and a wider band labelled heat ${waste} megajoules curves downward.`,
    steps: [
      { narration: `${STATION.input} MJ of chemical energy from the fuel enters the power station.`, objects: [...band(-4.6, 0.6, -1.4, 0.6, STATION.input, ROLE.input), ...rect(-1.4, -0.9, 0.6, 2.1, ROLE.reference), label('power station', P(-0.4, 2.45), ROLE.ink, 'detail'), label(`fuel ${STATION.input} MJ`, P(-3.0, 2.3), ROLE.input, 'detail')] },
      { narration: `Out come ${STATION.useful} MJ of electricity and ${waste} MJ of heat into the cooling water and air.`, objects: [...band(0.6, 1.3, 4.6, 1.3, STATION.useful, ROLE.output), ...band(0.6, -0.1, 3.4, -2.6, waste, ROLE.aid), label(`electricity ${STATION.useful} MJ`, P(2.8, 2.35), ROLE.output, 'detail'), label(`heat ${waste} MJ`, P(4.1, -2.4), ROLE.aid, 'detail')] },
      { narration: `${STATION.useful} + ${waste} = ${STATION.input} MJ: no energy was destroyed. Efficiency = useful out ÷ in = ${Math.round(eff * 100)} %.`, objects: [label(`efficiency = ${STATION.useful} / ${STATION.input} = ${Math.round(eff * 100)} %`, P(0, 3.6), ROLE.result, 'primary'), label(`${STATION.useful} + ${waste} = ${STATION.input} MJ`, P(-2.2, -3.6), ROLE.result, 'detail')] },
    ],
  }
}

// ── 4. Echo and SONAR ────────────────────────────────────────────────────────

/** SONAR in sea water: v = 1500 m/s, echo after 0.8 s. */
export const SONAR = { v: 1500, t: 0.8 }
export function echoDepth(s = SONAR): number { return (s.v * s.t) / 2 }
export function buildEchoScene(): SceneSpec {
  const d = echoDepth(), SURF = 2.4, BED = -2.6
  const hull: SceneObject[] = [line(P(-1.6, SURF + 0.1), P(1.0, SURF + 0.1), ROLE.ink, 0.06), line(P(-1.6, SURF + 0.1), P(-1.2, SURF - 0.35), ROLE.ink, 0.06), line(P(1.0, SURF + 0.1), P(0.6, SURF - 0.35), ROLE.ink, 0.06), line(P(-1.2, SURF - 0.35), P(0.6, SURF - 0.35), ROLE.ink, 0.06)]
  return {
    id: 'phys-echo-sonar',
    title: 'SONAR: the echo time covers the trip there and back',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: `Show echo ranging: a ship's ultrasonic pulse goes down to the sea bed and back. With sound at ${SONAR.v} m/s in sea water and the echo after ${SONAR.t} s, the pulse travelled ${SONAR.v * SONAR.t} m in all, so the depth is d = vt/2 = ${d} m.`,
    ariaLabel: `A ship on the sea surface sends a pulse straight down. One arrow goes down to the sea bed; a second arrow beside it comes back up. The depth is marked as ${d} metres.`,
    steps: [
      { narration: 'A ship on the surface sends an ultrasonic pulse straight down.', objects: [line(P(-4.6, SURF), P(4.6, SURF), ROLE.output, 0.04), ...hull, line(P(-4.6, BED), P(4.6, BED), ROLE.reference, 0.08), label('sea surface', P(3.3, SURF + 0.4), ROLE.output, 'detail'), label('sea bed', P(3.4, BED - 0.4), ROLE.reference, 'detail'), arrow(P(-0.6, SURF - 0.5), P(-0.6, BED + 0.15), ROLE.input), label('pulse down', P(-2.0, 0.2), ROLE.input, 'detail')] },
      { narration: `The pulse reflects from the sea bed and the echo returns ${SONAR.t} s after it was sent.`, objects: [arrow(P(0.1, BED + 0.15), P(0.1, SURF - 0.5), ROLE.result), label('echo up', P(1.3, -0.4), ROLE.result, 'detail'), label(`echo after ${SONAR.t} s`, P(-2.8, SURF + 0.6), ROLE.ink, 'detail')] },
      { narration: `In ${SONAR.t} s the sound covered ${SONAR.v} × ${SONAR.t} = ${SONAR.v * SONAR.t} m — down AND back. The depth is half: ${d} m.`, objects: [label(`d = v t / 2 = ${SONAR.v} × ${SONAR.t} / 2 = ${d} m`, P(0, 3.6), ROLE.result, 'primary'), line(P(2.6, SURF - 0.1), P(2.6, BED + 0.1), ROLE.aid, 0.02), label(`${d} m`, P(3.3, -0.1), ROLE.aid, 'detail')] },
    ],
  }
}
