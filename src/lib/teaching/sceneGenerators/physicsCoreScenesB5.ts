/**
 * Physics visual gap campaign, batch 5 (2026-09-30): thermal physics and sound.
 * Same rules as physicsCoreScenes.ts; every figure stays within the
 * intermediate label budget (physicsFigureLabelBudget.test.ts).
 */

import type { SceneSpec, SceneObject } from '@/lib/teaching/sceneSpec'
import { ROLE, arrow, curve, dot, label, line } from './visualDesign'
import { P, r2, circlePoints, rect, fnPath, type V3 } from './physicsCoreScenes'

/**
 * Evenly spread, deterministic positions in a unit square plus a direction —
 * the R2 low-discrepancy sequence. A plain LCG was tried first and MEASURED to
 * clump (six particles in one corner of the temperature box).
 */
function scatter(n: number, seed: number): Array<[number, number, number]> {
  const a1 = 0.7548776662466927, a2 = 0.5698402909980532, g = 0.6180339887498949
  const frac = (x: number) => x - Math.floor(x)
  return Array.from({ length: n }, (_, i) => {
    const k = i + seed
    return [0.08 + 0.84 * frac(0.5 + a1 * k), 0.08 + 0.84 * frac(0.5 + a2 * k), frac(g * k) * 2 * Math.PI] as [number, number, number]
  })
}

// ── 1. Temperature ───────────────────────────────────────────────────────────

/**
 * KG: "Temperature measures the average kinetic energy of particles." Same gas
 * at 200 K and 800 K: typical speed ∝ √T, so the hot box's arrows are twice as long.
 */
export const TEMP_COLD = 200, TEMP_HOT = 800
export function buildTemperatureScene(): SceneSpec {
  const vCold = 0.55, vHot = r2(vCold * Math.sqrt(TEMP_HOT / TEMP_COLD))
  const gas = (x0: number, v: number, color: string): SceneObject[] => scatter(6, 7).flatMap(([u, w, a]) => {
    const x = x0 + 0.5 + u * 2.6, y = -1.6 + w * 2.8
    return [dot(P(x, y), color, 0.13), arrow(P(x, y), P(x + v * Math.cos(a), y + v * Math.sin(a)), color)]
  })
  return {
    id: 'phys-temperature',
    title: 'Temperature: how fast the particles move',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show that a hotter gas has faster-moving particles: temperature measures the average kinetic energy of the particles.',
    ariaLabel: 'Two boxes of the same gas. In the cold box at 200 kelvin the particles have short velocity arrows; in the hot box at 800 kelvin the same particles have arrows twice as long.',
    steps: [
      { narration: `The same gas at ${TEMP_COLD} K. Every particle is moving; the arrows show their velocities.`, objects: [...rect(-4.6, -2.0, -0.8, 1.6, ROLE.reference), ...gas(-4.6, vCold, ROLE.output), label(`cold: ${TEMP_COLD} K`, P(-2.7, 2.1), ROLE.output, 'primary')] },
      { narration: `At ${TEMP_HOT} K (four times hotter) the particles move twice as fast: speed grows as √T.`, objects: [...rect(0.8, -2.0, 4.6, 1.6, ROLE.reference), ...gas(0.8, vHot, ROLE.input), label(`hot: ${TEMP_HOT} K`, P(2.7, 2.1), ROLE.input, 'primary')] },
      { narration: 'Temperature measures the average kinetic energy of the particles.', objects: [label('T ∝ average KE = ½mv²', P(0, -2.9), ROLE.result, 'primary')] },
    ],
  }
}

// ── 2. Zeroth law ────────────────────────────────────────────────────────────

/** KG: "If two systems are each in thermal equilibrium with a third, they are in thermal equilibrium with each other." */
export const ZEROTH_T = 30
export function buildZerothLawScene(): SceneSpec {
  const A: V3 = P(-3.2, 1.4), B: V3 = P(3.2, 1.4), C: V3 = P(0, -1.8)
  const body = (c: V3, name: string, color: string): SceneObject[] => [...rect(c[0] - 0.9, c[1] - 0.6, c[0] + 0.9, c[1] + 0.6, color), label(name, P(c[0], c[1]), color, 'primary')]
  return {
    id: 'phys-zeroth-law',
    title: 'The zeroth law of thermodynamics',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show that if A and B are each in thermal equilibrium with C (a thermometer), then A and B are in thermal equilibrium with each other — which is what makes temperature measurable.',
    ariaLabel: 'Three bodies. A and B are each in contact with C, a thermometer, and both read the same temperature, 30 degrees. So A and B, never touched together, are also in equilibrium: no heat would flow between them.',
    steps: [
      { narration: `Body A is placed in contact with C, a thermometer, until nothing changes: they are in thermal equilibrium. C reads ${ZEROTH_T} °C.`, objects: [...body(A, 'A', ROLE.input), ...body(C, 'C: thermometer', ROLE.aid), line(P(A[0] + 0.6, A[1] - 0.7), P(C[0] - 0.7, C[1] + 0.7), ROLE.aid, 0.04), label(`${ZEROTH_T} °C`, P(-2.6, -0.3), ROLE.aid, 'detail')] },
      // (B's reading is added with B, so both contacts show the same value.)
      { narration: `Body B is placed in contact with C too, and C again reads ${ZEROTH_T} °C.`, objects: [...body(B, 'B', ROLE.output), line(P(B[0] - 0.6, B[1] - 0.7), P(C[0] + 0.7, C[1] + 0.7), ROLE.aid, 0.04), label(`${ZEROTH_T} °C`, P(2.6, -0.3), ROLE.aid, 'detail')] },
      { narration: 'So A and B are in thermal equilibrium with each other: put them together and no heat flows. They have the same temperature.', objects: [line(P(A[0] + 1.0, A[1]), P(B[0] - 1.0, B[1]), ROLE.result, 0.04), label('no heat flows', P(0, 2.0), ROLE.result, 'primary'), label('T_A = T_C = T_B', P(0, 3.4), ROLE.result, 'primary')] },
    ],
  }
}

// ── 3. Specific heat capacity ────────────────────────────────────────────────

/**
 * KG: "the amount of heat required to raise the temperature of unit mass of a
 * substance by one degree." Equal masses of water (c = 4200) and aluminium
 * (c = 900) heated equally: ΔT = Q/(mc), so aluminium's line is 4.7× steeper.
 */
export const C_WATER = 4200, C_ALUMINIUM = 900
export function buildSpecificHeatScene(): SceneSpec {
  const X0 = -3.8, Y0 = -2.4, X1 = 3.8, YMAX = 4.0
  const sAl = 1.1, sW = sAl * (C_ALUMINIUM / C_WATER)
  const end = (s: number): V3 => { const dx = Math.min(X1 - X0, (YMAX - Y0) / s); return P(X0 + dx, Y0 + s * dx) }
  return {
    id: 'phys-specific-heat',
    title: 'Specific heat capacity',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show equal masses of water and aluminium receiving the same heat: aluminium, with a smaller specific heat capacity, warms far more (Q = mcΔT).',
    ariaLabel: 'A graph of temperature rise against heat supplied for equal masses of aluminium and water. The aluminium line is much steeper; the water line rises slowly because water needs about 4.7 times as much heat per degree.',
    steps: [
      { narration: 'Equal masses of two substances receive the same heat at the same rate.', objects: [arrow(P(X0, Y0), P(X1 + 0.3, Y0), ROLE.reference), arrow(P(X0, Y0), P(X0, YMAX + 0.3), ROLE.reference), label('heat supplied Q', P(2.4, Y0 - 0.5), ROLE.ink, 'detail'), label('temperature rise', P(X0 + 1.3, YMAX + 0.7), ROLE.ink, 'detail')] },
      { narration: `Aluminium (c = ${C_ALUMINIUM} J/kg·K) warms quickly; water (c = ${C_WATER} J/kg·K) warms slowly.`, objects: [line(P(X0, Y0), end(sAl), ROLE.input, 0.06), label('aluminium', P(end(sAl)[0] + 0.9, end(sAl)[1] - 0.3), ROLE.input, 'primary'), line(P(X0, Y0), end(sW), ROLE.output, 0.06), label('water', P(end(sW)[0] - 0.4, end(sW)[1] + 0.45), ROLE.output, 'primary')] },
      { narration: `ΔT = Q/(mc): for the same heat, water rises ${r2(C_WATER / C_ALUMINIUM)} times less, because it needs that much more heat per degree.`, objects: [label('Q = mcΔT', P(1.4, 0.2), ROLE.result, 'primary'), label(`c_water / c_Al = ${r2(C_WATER / C_ALUMINIUM)}`, P(1.6, -1.2), ROLE.result, 'detail')] },
    ],
  }
}

// ── 4. Kinetic theory ────────────────────────────────────────────────────────

/**
 * KG: "derives macroscopic gas properties from the statistical mechanics of
 * molecular motion." One molecule bouncing off a wall reverses its momentum:
 * Δp = 2mv on the wall; many such hits each second are the gas's pressure.
 */
export function buildKineticTheoryScene(): SceneSpec {
  const WX = 3.2
  const mol = scatter(9, 11).map(([u, w]) => P(-4.2 + u * 5.6, -2.2 + w * 4.2))
  const hit: V3 = P(WX - 0.25, 0.4)
  return {
    id: 'phys-kinetic-theory',
    title: 'Kinetic theory: pressure from molecular collisions',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show gas pressure as the result of molecules hitting the container wall: each collision reverses a molecule\'s momentum, pushing on the wall.',
    ariaLabel: 'A box of gas molecules moving in random directions. One molecule hits the right-hand wall and bounces back with its velocity reversed; the change in its momentum, 2mv, is a push on the wall. Many such impacts every second are the pressure.',
    steps: [
      { narration: 'A gas is a huge number of tiny molecules moving randomly and colliding with the walls.', objects: [...rect(-4.6, -2.8, WX, 2.8, ROLE.reference), ...mol.map((p) => dot(p, ROLE.output, 0.11))] },
      { narration: 'A molecule hits the wall at speed v and bounces back at speed v: its momentum changes by 2mv.', objects: [arrow(P(hit[0] - 2.0, hit[1] - 0.8), hit, ROLE.output), arrow(hit, P(hit[0] - 2.0, hit[1] + 0.8), ROLE.aid), dot(hit, ROLE.output, 0.14), label('Δp = 2mv', P(0.9, 1.9), ROLE.output, 'primary')] },
      { narration: 'That momentum change is a push on the wall. Billions of impacts every second add up to a steady pressure, P = ⅓ρ⟨v²⟩: faster molecules, more pressure.', objects: [arrow(P(WX, hit[1]), P(WX + 1.3, hit[1]), ROLE.input), label('force on wall', P(WX + 0.6, hit[1] + 0.6), ROLE.input, 'detail'), label('P = ⅓ρ⟨v²⟩', P(0, -3.5), ROLE.result, 'primary')] },
    ],
  }
}

// ── 5. Internal energy ───────────────────────────────────────────────────────

/** KG: "the total kinetic and potential energy of all molecules in a thermodynamic system." */
export function buildInternalEnergyScene(): SceneSpec {
  const pts: V3[] = []
  for (const j of [0, 1, 2]) for (const i of [0, 1, 2]) pts.push(P(-2.4 + i * 1.6 + (j % 2) * 0.3, -1.2 + j * 1.4))
  const bonds: SceneObject[] = []
  for (let a = 0; a < pts.length; a++) for (let b = a + 1; b < pts.length; b++) {
    const d = Math.hypot(pts[a][0] - pts[b][0], pts[a][1] - pts[b][1])
    if (d < 1.7) bonds.push(line(pts[a], pts[b], ROLE.aid, 0.03))
  }
  const vel = scatter(9, 3).map(([, , a], k) => arrow(pts[k], P(pts[k][0] + 0.55 * Math.cos(a), pts[k][1] + 0.55 * Math.sin(a)), ROLE.input))
  return {
    id: 'phys-internal-energy',
    title: 'Internal energy: kinetic plus potential',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show internal energy as the sum of every molecule\'s kinetic energy (its motion) and potential energy (the forces between neighbours).',
    ariaLabel: 'A cluster of molecules joined to their neighbours by bonds drawn as lines. Each molecule has a small velocity arrow. The motion is kinetic energy, the bonds store potential energy, and internal energy is the total of both over all molecules.',
    steps: [
      { narration: 'A substance is made of molecules that attract their neighbours. The forces between them store potential energy.', objects: [...pts.map((p) => dot(p, ROLE.output, 0.2)), ...bonds, label('potential energy: bonds', P(-2.2, 2.4), ROLE.aid, 'primary')] },
      { narration: 'Every molecule is also moving, so each has kinetic energy.', objects: [...vel, label('kinetic energy: motion', P(2.4, -2.4), ROLE.input, 'primary')] },
      { narration: 'The internal energy is the total of both, over every molecule. Heating raises it; so does doing work on the substance.', objects: [label('U = ΣKE + ΣPE', P(0, 3.6), ROLE.result, 'primary')] },
    ],
  }
}

// ── 6. Second law ────────────────────────────────────────────────────────────

/** KG: "heat spontaneously flows from hot to cold, and no engine can be 100% efficient." */
export function buildSecondLawScene(): SceneSpec {
  return {
    id: 'phys-second-law',
    title: 'The second law: heat flows hot to cold',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show that heat flows by itself only from hot to cold; the reverse never happens on its own.',
    ariaLabel: 'A hot body at the top and a cold body at the bottom. A heat arrow flows down from hot to cold on its own. An upward arrow from cold to hot is crossed out: it never happens by itself.',
    steps: [
      { narration: 'A hot body and a cold body are placed in contact.', objects: [...rect(-2.4, 1.6, 2.4, 3.2, ROLE.input), label('hot', P(0, 2.4), ROLE.input, 'primary'), ...rect(-2.4, -3.2, 2.4, -1.6, ROLE.output), label('cold', P(0, -2.4), ROLE.output, 'primary')] },
      { narration: 'Heat flows by itself from the hot body to the cold one, until their temperatures are equal.', objects: [arrow(P(-0.9, 1.4), P(-0.9, -1.4), ROLE.input), label('heat flows', P(-2.4, 0), ROLE.input, 'primary')] },
      { narration: 'It never flows the other way on its own. Moving heat from cold to hot needs work, as in a refrigerator — and for the same reason no engine can turn all its heat into work.', objects: [arrow(P(0.9, -1.4), P(0.9, 1.4), ROLE.reference), line(P(0.45, -0.45), P(1.35, 0.45), ROLE.result, 0.06), line(P(0.45, 0.45), P(1.35, -0.45), ROLE.result, 0.06), label('never by itself', P(2.7, 0), ROLE.result, 'primary')] },
    ],
  }
}

// ── 7. Entropy ───────────────────────────────────────────────────────────────

/**
 * KG: "a state function measuring the dispersal of energy; it increases in all
 * irreversible processes." A gas confined to half a box spreads through all
 * of it when the partition is removed; it never gathers back by itself.
 */
export function buildEntropyScene(): SceneSpec {
  const N = 10
  const before = scatter(N, 5).map(([u, w]) => P(-4.4 + u * 1.7, -1.6 + w * 3.2))
  const after = scatter(N, 5).map(([u, w]) => P(0.6 + u * 3.8, -1.6 + w * 3.2))
  return {
    id: 'phys-entropy',
    title: 'Entropy: energy spreads out',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show a gas spreading into the whole box when a partition is removed — an irreversible process in which entropy increases.',
    ariaLabel: 'Two boxes. Before: a partition keeps all the gas molecules in the left half. After: the partition is removed and the molecules have spread evenly through the whole box. They never gather back into one half by themselves.',
    steps: [
      { narration: 'Before: a partition keeps the gas in the left half of the box.', objects: [...rect(-4.6, -2.0, -0.6, 2.0, ROLE.reference), line(P(-2.6, -2.0), P(-2.6, 2.0), ROLE.input, 0.07), ...before.map((p) => dot(p, ROLE.output, 0.11)), label('before', P(-2.6, 2.5), ROLE.ink, 'primary')] },
      { narration: 'After the partition is removed, the molecules spread through the whole box. There are vastly more ways to be spread out than bunched up.', objects: [...rect(0.6, -2.0, 4.6, 2.0, ROLE.reference), ...after.map((p) => dot(p, ROLE.output, 0.11)), label('after', P(2.6, 2.5), ROLE.ink, 'primary'), arrow(P(-0.4, 0), P(0.4, 0), ROLE.ink)] },
      { narration: 'The spreading is irreversible: the gas never gathers back by itself. Entropy has increased.', objects: [label('ΔS > 0', P(0, -3.0), ROLE.result, 'primary')] },
    ],
  }
}

// ── 8. Heat engines ──────────────────────────────────────────────────────────

/** KG: "converts part of the heat absorbed from a hot reservoir into work while rejecting heat to a cold reservoir." */
export const ENGINE_QH = 100, ENGINE_W = 40
export function buildHeatEngineScene(): SceneSpec {
  const QC = ENGINE_QH - ENGINE_W
  const eff = r2(ENGINE_W / ENGINE_QH)
  return {
    id: 'phys-heat-engine',
    title: 'A heat engine',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show a heat engine taking heat Q_H from a hot reservoir, turning part of it into work W and rejecting the rest Q_C to a cold reservoir: Q_H = W + Q_C, efficiency η = W/Q_H.',
    ariaLabel: 'A hot reservoir at the top, an engine in the middle and a cold reservoir at the bottom. 100 joules of heat flow from the hot reservoir into the engine; 40 joules leave as work to the right; 60 joules flow down to the cold reservoir. The efficiency is 40 percent.',
    steps: [
      { narration: 'A hot reservoir, an engine and a cold reservoir.', objects: [...rect(-2.2, 2.4, 2.2, 3.6, ROLE.input), label('hot reservoir', P(0, 3.0), ROLE.input, 'primary'), curve(circlePoints(0, 0, 0.9, 0, 2 * Math.PI, 40), ROLE.reference), label('engine', P(-1.8, 0), ROLE.ink, 'primary'), ...rect(-2.2, -3.6, 2.2, -2.4, ROLE.output), label('cold reservoir', P(0, -3.0), ROLE.output, 'primary')] },
      { narration: `The engine takes in Q_H = ${ENGINE_QH} J of heat, turns W = ${ENGINE_W} J into work, and must reject the rest, Q_C = ${QC} J, to the cold reservoir.`, objects: [arrow(P(0, 2.3), P(0, 1.0), ROLE.input), label(`Q_H = ${ENGINE_QH} J`, P(1.4, 1.7), ROLE.input, 'detail'), arrow(P(1.0, 0), P(3.4, 0), ROLE.aid), label(`W = ${ENGINE_W} J`, P(3.0, 0.5), ROLE.aid, 'detail'), arrow(P(0, -1.0), P(0, -2.3), ROLE.output), label(`Q_C = ${QC} J`, P(1.4, -1.7), ROLE.output, 'detail')] },
      { narration: `Efficiency is the fraction of the heat turned into work: η = W/Q_H = ${eff}. It is always less than 1.`, objects: [label(`η = W / Q_H = ${eff}`, P(3.0, -0.9), ROLE.result, 'primary')] },
    ],
  }
}

// ── 9. Refrigerators ─────────────────────────────────────────────────────────

/** KG: "uses work to transfer heat from a cold reservoir to a hot reservoir; the coefficient of performance measures its efficiency." */
export const FRIDGE_QC = 60, FRIDGE_W = 20
export function buildRefrigeratorScene(): SceneSpec {
  const QH = FRIDGE_QC + FRIDGE_W
  const cop = r2(FRIDGE_QC / FRIDGE_W)
  return {
    id: 'phys-refrigerator',
    title: 'A refrigerator: a heat engine run backwards',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show a refrigerator using work W to move heat Q_C out of a cold space and dump Q_H = Q_C + W into the warmer room; COP = Q_C/W.',
    ariaLabel: 'A cold space at the bottom, a pump in the middle and the warm room at the top. 60 joules of heat are drawn up out of the cold space, 20 joules of work are put in, and 80 joules are released into the room. The coefficient of performance is 3.',
    steps: [
      { narration: 'The inside of the fridge (cold) and the room (hot), with a pump between them.', objects: [...rect(-2.2, 2.4, 2.2, 3.6, ROLE.input), label('room (hot)', P(0, 3.0), ROLE.input, 'primary'), curve(circlePoints(0, 0, 0.9, 0, 2 * Math.PI, 40), ROLE.reference), label('pump', P(-1.6, 0), ROLE.ink, 'primary'), ...rect(-2.2, -3.6, 2.2, -2.4, ROLE.output), label('inside (cold)', P(0, -3.0), ROLE.output, 'primary')] },
      { narration: `Work W = ${FRIDGE_W} J drives the pump. It pulls Q_C = ${FRIDGE_QC} J of heat out of the cold space and releases Q_H = ${QH} J into the room — heat moving from cold to hot, paid for with work.`, objects: [arrow(P(0, -2.3), P(0, -1.0), ROLE.output), label(`Q_C = ${FRIDGE_QC} J`, P(1.4, -1.7), ROLE.output, 'detail'), arrow(P(3.4, 0), P(1.0, 0), ROLE.aid), label(`W = ${FRIDGE_W} J`, P(3.0, 0.5), ROLE.aid, 'detail'), arrow(P(0, 1.0), P(0, 2.3), ROLE.input), label(`Q_H = ${QH} J`, P(1.4, 1.7), ROLE.input, 'detail')] },
      { narration: `Its coefficient of performance is the heat removed per joule of work: COP = Q_C/W = ${cop}.`, objects: [label(`COP = Q_C / W = ${cop}`, P(3.0, -0.9), ROLE.result, 'primary')] },
    ],
  }
}

// ── 10. Forced oscillations and resonance ────────────────────────────────────

/**
 * KG: "resonance is maximum amplitude when the driving frequency matches the
 * natural frequency." Steady-state amplitude A(ω) = F₀/m / √((ω₀² − ω²)² + (γω)²)
 * for light and heavy damping.
 */
export function resonanceAmplitude(w: number, w0: number, gamma: number): number {
  return 1 / Math.sqrt((w0 * w0 - w * w) ** 2 + (gamma * w) ** 2)
}
export const RES_W0 = 1
export function buildForcedOscillationScene(): SceneSpec {
  const X0 = -4.0, Y0 = -2.6, X1 = 4.2, W1 = 2.2, H = 5.6
  const sx = (X1 - X0) / W1
  const light = 0.18, heavy = 0.6
  const peak = resonanceAmplitude(RES_W0, RES_W0, light)
  const yOf = (a: number) => Y0 + (H * a) / peak
  const trace = (g: number) => fnPath((x) => yOf(resonanceAmplitude((x - X0) / sx, RES_W0, g)), X0, X1, 160)
  const xf0 = X0 + RES_W0 * sx
  return {
    id: 'phys-forced-oscillation',
    title: 'Forced oscillations and resonance',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show the amplitude of a driven oscillator against driving frequency: a sharp peak when the driving frequency equals the natural frequency, lower and broader with more damping.',
    ariaLabel: 'A graph of oscillation amplitude against driving frequency. A tall, sharp peak sits at the natural frequency for light damping; with heavy damping the peak is much lower and broader.',
    steps: [
      { narration: 'A periodic force drives an oscillator. This is how big the oscillation grows at each driving frequency.', objects: [arrow(P(X0, Y0), P(X1 + 0.3, Y0), ROLE.reference), arrow(P(X0, Y0), P(X0, Y0 + H + 0.5), ROLE.reference), label('driving frequency', P(2.8, Y0 - 0.5), ROLE.ink, 'detail'), label('amplitude', P(X0 + 0.9, Y0 + H + 0.9), ROLE.ink, 'detail'), curve(trace(light), ROLE.input), label('light damping', P(xf0 + 1.9, Y0 + H * 0.75), ROLE.input, 'primary')] },
      { narration: 'The amplitude peaks when the driving frequency matches the natural frequency f₀: resonance.', objects: [line(P(xf0, Y0), P(xf0, Y0 + H), ROLE.aid, 0.02), label('resonance: f = f₀', P(xf0, Y0 - 0.5), ROLE.aid, 'primary')] },
      { narration: 'More damping makes the peak lower and broader.', objects: [curve(trace(heavy), ROLE.output), label('heavy damping', P(xf0 + 2.4, yOf(resonanceAmplitude(RES_W0, RES_W0, heavy)) - 0.2), ROLE.output, 'primary')] },
    ],
  }
}

// ── 11. Sound waves ──────────────────────────────────────────────────────────

/**
 * KG: "longitudinal mechanical waves that propagate through a medium via
 * pressure fluctuations." Layers of air displaced by ξ = A sin kx; the pressure
 * change is ∝ −dξ/dx, highest where the layers are bunched (compressions).
 */
export const SOUND_K = (2 * Math.PI) / 3.6
export function buildSoundWaveScene(): SceneSpec {
  const X0 = -3.8, X1 = 4.4, A = 0.55
  const layers: SceneObject[] = []
  for (let i = 0; i <= 26; i++) {
    const x0 = X0 + ((X1 - X0) * i) / 26
    const x = x0 + A * Math.sin(SOUND_K * (x0 - X0))
    layers.push(line(P(x, 0.4), P(x, 2.8), ROLE.output, 0.03))
  }
  const pressure = (x: number) => -A * SOUND_K * Math.cos(SOUND_K * (x - X0))
  return {
    id: 'phys-sound-wave',
    title: 'Sound: a pressure wave in air',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show a sound wave as layers of air bunched into compressions and spread into rarefactions, with the pressure highest at the compressions.',
    ariaLabel: 'A loudspeaker on the left sends a sound wave to the right. Layers of air, drawn as vertical lines, are bunched together at compressions and spread apart at rarefactions. Below, a graph of air pressure peaks at each compression and dips at each rarefaction.',
    steps: [
      { narration: 'A loudspeaker pushes and pulls on the air. Layers of air bunch together (compressions) and spread apart (rarefactions).', objects: [...rect(-4.8, 0.9, -4.2, 2.3, ROLE.reference), label('speaker', P(-4.5, 3.3), ROLE.ink, 'detail'), ...layers] },
      { narration: 'Air pressure is highest where the layers are bunched and lowest where they are spread out.', objects: [line(P(X0, -1.9), P(X1, -1.9), ROLE.reference, 0.02), curve(fnPath((x) => -1.9 + pressure(x), X0, X1, 120), ROLE.input), label('pressure', P(X0 + 0.6, -0.5), ROLE.input, 'detail'), label('compression', P(X0 + 1.8, -3.5), ROLE.input, 'detail')] },
      { narration: 'The air layers only move back and forth along the direction of travel: sound is a longitudinal wave, and it needs a medium.', objects: [arrow(P(1.6, 3.5), P(3.6, 3.5), ROLE.ink), label('wave travels', P(0.2, 3.5), ROLE.ink, 'detail'), label('rarefaction', P(X0 + 3.6, -3.5), ROLE.output, 'detail')] },
    ],
  }
}

// ── 12. Sound intensity ──────────────────────────────────────────────────────

/**
 * KG: "Sound intensity is power per unit area; the decibel scale logarithmically
 * measures intensity." A point source spreads its power over spheres: at 2r
 * the area is 4×, so the intensity is ¼ — a drop of 10 log₁₀(¼) = −6 dB.
 */
export function buildSoundIntensityScene(): SceneSpec {
  const R = 1.6
  const db = Math.round(10 * Math.log10(1 / 4))
  const ray = (a: number) => line(P(0.3 * Math.cos(a), 0.3 * Math.sin(a)), P(2 * R * Math.cos(a) + 0.4 * Math.cos(a), 2 * R * Math.sin(a) + 0.4 * Math.sin(a)), ROLE.aid, 0.015)
  const patch = (rr: number, half: number): SceneObject => curve(circlePoints(0, 0, rr, -half, half, 12), ROLE.result)
  return {
    id: 'phys-sound-intensity',
    title: 'Sound intensity falls with distance',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show a point source spreading its power over ever larger spheres: intensity I = P/4πr², so at twice the distance it is a quarter (6 dB quieter).',
    ariaLabel: 'A small sound source at the centre with two circles around it at distance r and 2r. The same cone of sound covers a patch at r and a patch twice as wide at 2r, so four times the area: the intensity there is a quarter.',
    steps: [
      { narration: 'A small source sends sound out equally in all directions. Its power spreads over a sphere of area 4πr².', objects: [dot(P(0, 0), ROLE.input, 0.22), label('source', P(-0.9, -0.5), ROLE.input, 'detail'), curve(circlePoints(0, 0, R, 0, 2 * Math.PI, 48), ROLE.reference), label('r', P(R * 0.72 - 0.25, R * 0.72 + 0.1), ROLE.ink, 'primary')] },
      { narration: 'At twice the distance, the same sound covers four times the area.', objects: [curve(circlePoints(0, 0, 2 * R, 0, 2 * Math.PI, 64), ROLE.reference), label('2r', P(2 * R * 0.72 - 0.25, 2 * R * 0.72 + 0.1), ROLE.ink, 'primary'), ray(0.35), ray(-0.35), patch(R, 0.35), patch(2 * R, 0.35)] },
      { narration: `So the intensity is a quarter: I = P/4πr². On the decibel scale that is 10 log(¼) ≈ ${db} dB.`, objects: [label('I = P / 4πr²', P(-2.6, 3.9), ROLE.result, 'primary'), label(`at 2r: I/4, ${db} dB`, P(2.6, -3.9), ROLE.result, 'primary')] },
    ],
  }
}

// ── 13. Wave speed ───────────────────────────────────────────────────────────

/**
 * KG: "Wave speed is determined by the medium's properties." On a string,
 * v = √(T/μ): the same frequency on a string four times heavier travels half
 * as fast, so its wavelength (λ = v/f) is half as long.
 */
export const STRING_MASS_RATIO = 4
export function buildWaveSpeedScene(): SceneSpec {
  const X0 = -4.2, X1 = 4.4, L1 = 3.2
  const L2 = r2(L1 / Math.sqrt(STRING_MASS_RATIO))
  const wave = (y: number, lam: number) => fnPath((x) => y + 0.7 * Math.sin((2 * Math.PI * (x - X0)) / lam), X0, X1, 140)
  return {
    id: 'phys-wave-speed',
    title: 'Wave speed depends on the medium',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show that wave speed is set by the medium: on a string v = √(T/μ), so a heavier string carries the same frequency more slowly, with a shorter wavelength.',
    ariaLabel: 'Two strings under the same tension, shaken at the same frequency. On the light string the wave has a long wavelength; on a string four times heavier the wave travels half as fast and its wavelength is half as long.',
    steps: [
      { narration: 'A light string under tension T is shaken at frequency f.', objects: [curve(wave(1.6, L1), ROLE.output), label('light string: v', P(X0 + 1.2, 2.8), ROLE.output, 'primary'), line(P(X0, 0.5), P(X0 + L1, 0.5), ROLE.aid, 0.03), label('λ', P(X0 + L1 / 2, 0.1), ROLE.aid, 'primary')] },
      { narration: `A string ${STRING_MASS_RATIO} times heavier, same tension, same frequency: the wave travels half as fast, so its wavelength is half as long (λ = v/f).`, objects: [curve(wave(-1.6, L2), ROLE.input), label(`${STRING_MASS_RATIO}× heavier: v/2`, P(X0 + 1.4, -0.4), ROLE.input, 'primary'), line(P(X0, -2.7), P(X0 + L2, -2.7), ROLE.aid, 0.03), label('λ/2', P(X0 + L2 / 2, -3.1), ROLE.aid, 'primary')] },
      { narration: 'The medium sets the speed: on a string v = √(T/μ), where μ is the mass per metre.', objects: [label('v = √(T/μ)', P(2.4, 3.6), ROLE.result, 'primary')] },
    ],
  }
}
