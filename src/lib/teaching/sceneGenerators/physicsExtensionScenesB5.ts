/**
 * Physics coverage-driven KG extension, batch 5 (2026-10-03): figures for the
 * moving-coil galvanometer, motors and generators, household electricity, and
 * connected bodies. Same rules as physicsCoreScenes.ts: every number drawn is
 * computed here and pinned by src/tests/physicsExtensionBatch5.test.ts.
 */

import type { SceneSpec, SceneObject } from '@/lib/teaching/sceneSpec'
import { ROLE, arrow, curve, dot, label, line } from './visualDesign'
import { P, circlePoints, rect, type V3 } from './physicsCoreScenes'

// ── 1. Galvanometer conversion ───────────────────────────────────────────────

/** G = 50 Ω, full scale 2 mA; ammeter to 1 A, voltmeter to 10 V. */
export const GALVO = { G: 50, Ig: 0.002, Imax: 1, Vmax: 10 }
export function shunt(g = GALVO): number { return (g.Ig * g.G) / (g.Imax - g.Ig) }
export function multiplier(g = GALVO): number { return g.Vmax / g.Ig - g.G }
export function buildGalvanometerScene(): SceneSpec {
  const S = shunt(), R = multiplier(), Y1 = 1.6, Y2 = -2.0
  const meter = (x: number, y: number): SceneObject[] => [curve(circlePoints(x, y, 0.42, 0, 2 * Math.PI, 32), ROLE.ink), label('G', P(x, y), ROLE.ink, 'detail')]
  return {
    id: 'phys-galvanometer',
    title: 'One galvanometer, two meters',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: `Show how a ${GALVO.G} Ω galvanometer that reaches full scale at ${GALVO.Ig * 1000} mA becomes an ammeter (a small ${S.toFixed(2)} Ω shunt in PARALLEL carries ${(GALVO.Imax - GALVO.Ig).toFixed(3)} A around the coil) and a voltmeter (a large ${Math.round(R)} Ω resistance in SERIES limits the current to ${GALVO.Ig * 1000} mA at ${GALVO.Vmax} V).`,
    ariaLabel: `Top: an ammeter — the galvanometer G with a small shunt resistor connected in parallel; 1 amp arrives, 2 milliamps go through G and the rest through the shunt. Bottom: a voltmeter — G in series with a large resistor of ${Math.round(R)} ohms.`,
    steps: [
      { narration: `The galvanometer: ${GALVO.G} Ω, full scale at ${GALVO.Ig * 1000} mA.`, objects: [...meter(0, Y1 + 0.6), label('ammeter', P(-3.6, Y1 + 1.6), ROLE.output, 'heading')] },
      { narration: `Ammeter: a small shunt in parallel. Of ${GALVO.Imax} A, only ${GALVO.Ig * 1000} mA goes through the coil; ${(GALVO.Imax - GALVO.Ig).toFixed(3)} A takes the shunt. S = I_g G / (I − I_g) ≈ ${S.toFixed(2)} Ω.`, objects: [line(P(-3.6, Y1), P(-1.6, Y1), ROLE.reference, 0.04), line(P(1.6, Y1), P(3.6, Y1), ROLE.reference, 0.04), line(P(-1.6, Y1), P(-1.6, Y1 + 0.6), ROLE.reference, 0.04), line(P(1.6, Y1), P(1.6, Y1 + 0.6), ROLE.reference, 0.04), line(P(-1.6, Y1 + 0.6), P(-0.42, Y1 + 0.6), ROLE.reference, 0.04), line(P(0.42, Y1 + 0.6), P(1.6, Y1 + 0.6), ROLE.reference, 0.04), line(P(-1.6, Y1), P(-1.6, Y1 - 0.6), ROLE.reference, 0.04), line(P(1.6, Y1), P(1.6, Y1 - 0.6), ROLE.reference, 0.04), line(P(-1.6, Y1 - 0.6), P(-0.6, Y1 - 0.6), ROLE.reference, 0.04), line(P(0.6, Y1 - 0.6), P(1.6, Y1 - 0.6), ROLE.reference, 0.04), ...rect(-0.6, Y1 - 0.8, 0.6, Y1 - 0.4, ROLE.output), label(`S ≈ ${S.toFixed(2)} Ω`, P(0, Y1 - 1.2), ROLE.output, 'detail'), arrow(P(-3.4, Y1 + 0.25), P(-2.2, Y1 + 0.25), ROLE.input), label(`${GALVO.Imax} A`, P(-2.8, Y1 + 0.6), ROLE.input, 'detail'), label(`${GALVO.Ig * 1000} mA`, P(0, Y1 + 1.35), ROLE.ink, 'detail')] },
      { narration: `Voltmeter: a large resistance in series, so ${GALVO.Vmax} V drives exactly ${GALVO.Ig * 1000} mA. R = V/I_g − G = ${Math.round(R)} Ω.`, objects: [label('voltmeter', P(-3.6, Y2 + 1.1), ROLE.result, 'heading'), line(P(-3.6, Y2), P(-1.6, Y2), ROLE.reference, 0.04), ...rect(-1.6, Y2 - 0.25, 0.2, Y2 + 0.25, ROLE.result), line(P(0.2, Y2), P(1.18, Y2), ROLE.reference, 0.04), ...meter(1.6, Y2), line(P(2.02, Y2), P(3.6, Y2), ROLE.reference, 0.04), label(`R = ${Math.round(R)} Ω`, P(-0.7, Y2 - 0.7), ROLE.result, 'detail'), label('ammeter: small S in parallel · voltmeter: large R in series', P(0, -3.8), ROLE.result, 'primary')] },
    ],
  }
}

// ── 2. Motors and generators ─────────────────────────────────────────────────

/** Generator: N = 100, A = 0.01 m², B = 0.5 T, ω = 100 rad/s → peak 50 V. */
export const GEN = { N: 100, A: 0.01, B: 0.5, omega: 100 }
export function peakEmf(g = GEN): number { return g.N * g.A * g.B * g.omega }
export function buildGeneratorScene(): SceneSpec {
  const e0 = peakEmf(), X0 = -4.2, SX = 60, SY = 0.04
  const T = (2 * Math.PI) / GEN.omega
  const wave = (k: number): V3[] => Array.from({ length: 64 }, (_, i) => { const t = (2 * T * i) / 63; return P(X0 + t * SX, k * e0 * Math.sin(k * GEN.omega * t) * SY) })
  return {
    id: 'phys-motor-generator',
    title: 'A generator: emf rises and falls as the coil turns',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: `Show the AC output of a generator: a coil of ${GEN.N} turns, area ${GEN.A} m², turning at ${GEN.omega} rad/s in ${GEN.B} T gives an emf that swings between ±${e0} V (peak NABω). Turning twice as fast doubles both the peak emf and the frequency.`,
    ariaLabel: `A graph of emf against time showing two full cycles of a sine wave reaching plus and minus ${e0} volts. A second, taller and faster wave reaching plus and minus ${2 * e0} volts shows the same coil turning twice as fast.`,
    steps: [
      { narration: `As the coil turns, the flux through it changes and an alternating emf is induced. Its peak is NABω = ${GEN.N} × ${GEN.A} × ${GEN.B} × ${GEN.omega} = ${e0} V.`, objects: [arrow(P(X0, 0), P(X0 + 8.4, 0), ROLE.reference), arrow(P(X0, -4.3), P(X0, 4.4), ROLE.reference), label('time', P(X0 + 8.0, -0.4), ROLE.ink, 'detail'), label('emf (V)', P(X0 + 0.8, 4.5), ROLE.ink, 'detail'), curve(wave(1), ROLE.output), label(`+${e0} V`, P(X0 - 0.6, e0 * SY), ROLE.output, 'detail')] },
      { narration: `Turn it twice as fast: the peak doubles to ${2 * e0} V and the cycles come twice as often.`, objects: [curve(wave(2), ROLE.input), label(`+${2 * e0} V at 2ω`, P(X0 + 4.4, 2 * e0 * SY + 0.35), ROLE.input, 'detail')] },
      { narration: 'The energy is not created: with a lamp connected, the induced current opposes the turning, and the work you do becomes the electrical energy.', objects: [label(`peak emf = NABω = ${e0} V`, P(1.6, -4.6), ROLE.result, 'primary')] },
    ],
  }
}

// ── 3. Household electricity ─────────────────────────────────────────────────

/** 220 V supply; appliance currents I = P/V; a 15 A circuit. */
export const HOUSE = { V: 220, appliances: [{ name: 'iron', P: 1000 }, { name: 'heater', P: 2000 }, { name: 'kettle', P: 1500 }], limit: 15 }
export function applianceCurrent(P: number, V = HOUSE.V): number { return P / V }
export function totalCurrent(h = HOUSE): number { return h.appliances.reduce((s, a) => s + applianceCurrent(a.P, h.V), 0) }
export function buildHouseholdScene(): SceneSpec {
  // Name and current share one label (8 labels in all, inside every level's
  // budget), and the currents carry two decimals so they visibly add up to the
  // total: 4.55 + 9.09 + 6.82 = 20.46 ≈ 20.5 A (one decimal each read 20.4).
  const YL = 2.2, YN = -0.4, YE = -2.6, xs = [-1.8, 0.75, 3.3], HW = 1.05, I = totalCurrent()
  const app = (x: number, i: number): SceneObject[] => [line(P(x, YL), P(x, YL - 0.7), ROLE.input, 0.03), ...rect(x - HW, YN + 0.5, x + HW, YL - 0.7, ROLE.ink), line(P(x, YN + 0.5), P(x, YN), ROLE.output, 0.03), label(`${HOUSE.appliances[i].name} ${applianceCurrent(HOUSE.appliances[i].P).toFixed(2)} A`, P(x, (YN + YL) / 2 + 0.1), ROLE.input, 'detail')]
  return {
    id: 'phys-household-circuit',
    title: 'Household wiring: parallel appliances, protection in the live wire',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: `Show household wiring: appliances in parallel between live and neutral at ${HOUSE.V} V, with the fuse or MCB in the live wire. Three appliances together draw ${I.toFixed(1)} A — more than a ${HOUSE.limit} A circuit allows, an overload — and the earth wire carries current only in a fault.`,
    ariaLabel: 'Three horizontal lines: live at the top, neutral in the middle, earth at the bottom. A fuse sits on the live line near the supply. Three appliances — an iron, a heater and a kettle — each connect between live and neutral, side by side, with their currents marked. The earth line connects to the appliances\' metal cases.',
    steps: [
      { narration: `Live (${HOUSE.V} V), neutral (about 0 V) and earth. The fuse or MCB sits in the LIVE wire.`, objects: [line(P(-4.4, YL), P(4.2, YL), ROLE.input, 0.05), line(P(-4.4, YN), P(4.2, YN), ROLE.output, 0.05), line(P(-4.4, YE), P(4.2, YE), ROLE.result, 0.05), label('live', P(-4.0, YL + 0.4), ROLE.input, 'detail'), label('neutral', P(-3.8, YN + 0.4), ROLE.output, 'detail'), label('earth', P(-4.0, YE + 0.4), ROLE.result, 'detail'), ...rect(-3.2, YL - 0.18, -2.5, YL + 0.18, ROLE.aid), label('fuse', P(-2.85, YL - 0.55), ROLE.aid, 'detail')] },
      { narration: 'Each appliance connects between live and neutral — in parallel — so each gets the full voltage and draws its own current, I = P/V.', objects: [...xs.flatMap((x, i) => app(x, i))] },
      { narration: `Together they draw ${I.toFixed(1)} A, more than the ${HOUSE.limit} A the circuit allows: an overload. The MCB in the live wire trips. The earth wire, joined to the metal cases, carries current only if a fault makes a case live.`, objects: [...xs.map((x) => line(P(x + HW, YN + 0.6), P(x + HW, YE), ROLE.result, 0.02)), label(`total ${I.toFixed(1)} A > ${HOUSE.limit} A`, P(0.8, 3.4), ROLE.result, 'primary')] },
    ],
  }
}

// ── 4. Connected bodies (Atwood machine) ─────────────────────────────────────

export const ATWOOD = { m1: 3, m2: 2, g: 9.8 }
export function atwoodAcceleration(a = ATWOOD): number { return ((a.m1 - a.m2) * a.g) / (a.m1 + a.m2) }
export function atwoodTension(a = ATWOOD): number { return (2 * a.m1 * a.m2 * a.g) / (a.m1 + a.m2) }
export function buildAtwoodScene(): SceneSpec {
  const acc = atwoodAcceleration(), T = atwoodTension(), W1 = ATWOOD.m1 * ATWOOD.g, W2 = ATWOOD.m2 * ATWOOD.g
  const PR = 0.7, PY = 3.0, XL = -PR, XR = PR, K = 0.06
  const Y1 = -1.4, Y2 = 0.2
  return {
    id: 'phys-atwood',
    title: 'Connected bodies: one equation per body',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: `Show an Atwood machine: ${ATWOOD.m1} kg and ${ATWOOD.m2} kg over a pulley. Each mass has its own free-body diagram with the same tension T and the same size of acceleration: a = ${acc.toFixed(2)} m/s², T = ${T.toFixed(2)} N — between the two weights, ${W2.toFixed(1)} N and ${W1.toFixed(1)} N.`,
    ariaLabel: `A pulley at the top with a string over it. On the left hangs a ${ATWOOD.m1} kilogram block, on the right a ${ATWOOD.m2} kilogram block. Each has an upward tension arrow and a downward weight arrow; the left block's weight arrow is longer than its tension arrow, the right block's tension arrow is longer than its weight arrow.`,
    steps: [
      { narration: `A ${ATWOOD.m1} kg and a ${ATWOOD.m2} kg mass hang over a light, frictionless pulley.`, objects: [curve(circlePoints(0, PY, PR, 0, 2 * Math.PI, 36), ROLE.reference), line(P(0, PY + PR), P(0, PY + PR + 0.6), ROLE.reference, 0.05), line(P(XL, PY), P(XL, Y1 + 0.5), ROLE.ink, 0.03), line(P(XR, PY), P(XR, Y2 + 0.5), ROLE.ink, 0.03), ...rect(XL - 0.5, Y1 - 0.5, XL + 0.5, Y1 + 0.5, ROLE.output), ...rect(XR - 0.4, Y2 - 0.4, XR + 0.4, Y2 + 0.4, ROLE.output), label(`${ATWOOD.m1} kg`, P(XL - 1.25, Y1), ROLE.output, 'detail'), label(`${ATWOOD.m2} kg`, P(XR + 1.15, Y2), ROLE.output, 'detail')] },
      { narration: `One free-body diagram per mass: the same tension T up on each; weights ${W1.toFixed(1)} N and ${W2.toFixed(1)} N down.`, objects: [arrow(P(XL - 0.25, Y1 + 0.5), P(XL - 0.25, Y1 + 0.5 + T * K), ROLE.result), arrow(P(XL + 0.25, Y1 - 0.5), P(XL + 0.25, Y1 - 0.5 - W1 * K), ROLE.input), arrow(P(XR + 0.2, Y2 + 0.4), P(XR + 0.2, Y2 + 0.4 + T * K), ROLE.result), arrow(P(XR - 0.2, Y2 - 0.4), P(XR - 0.2, Y2 - 0.4 - W2 * K), ROLE.input), label('T', P(XL - 0.6, Y1 + 0.5 + T * K / 2), ROLE.result, 'detail'), label(`${W1.toFixed(1)} N`, P(XL + 1.1, Y1 - 0.5 - W1 * K / 2), ROLE.input, 'detail'), label('T', P(XR + 0.55, Y2 + 0.4 + T * K / 2), ROLE.result, 'detail'), label(`${W2.toFixed(1)} N`, P(XR + 1.2, Y2 - 0.4 - W2 * K / 2), ROLE.input, 'detail')] },
      { narration: `Solving the two equations: a = ${acc.toFixed(2)} m/s², T = ${T.toFixed(2)} N — less than ${W1.toFixed(1)} N and more than ${W2.toFixed(1)} N.`, objects: [label(`a = ${acc.toFixed(2)} m/s²   T = ${T.toFixed(2)} N`, P(0, -4.2), ROLE.result, 'primary')] },
    ],
  }
}
