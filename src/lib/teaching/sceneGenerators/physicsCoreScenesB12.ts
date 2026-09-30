/**
 * Physics visual gap campaign, batch 12 (2026-09-30): statistical physics (all
 * fourteen). Same rules as physicsCoreScenes.ts; every figure stays within the
 * intermediate label budget.
 */

import type { SceneSpec, SceneObject } from '@/lib/teaching/sceneSpec'
import { ROLE, arrow, curve, dot, label, line } from './visualDesign'
import { P, r2, rect, fnPath, type V3 } from './physicsCoreScenes'

/** Axes from (x0, y0) with labelled ends — graphs are most of this batch. */
function graphAxes(x0: number, y0: number, x1: number, y1: number, xl: string, yl: string): SceneObject[] {
  return [arrow(P(x0, y0), P(x1, y0), ROLE.reference), arrow(P(x0, y0), P(x0, y1), ROLE.reference), label(xl, P(x1 - 0.8, y0 - 0.5), ROLE.ink, 'detail'), label(yl, P(x0 + 1.0, y1 + 0.35), ROLE.ink, 'detail')]
}
const binom = (n: number, k: number) => { let r = 1; for (let i = 1; i <= k; i++) r = (r * (n - k + i)) / i; return Math.round(r) }

// ── 1. Boltzmann factor ──────────────────────────────────────────────────────

/** KG: "e^(−E/kT) gives the relative probability of a microstate at energy E." Curves at T and 2T. */
export function boltzmann(E: number, kT: number): number { return Math.exp(-E / kT) }
export function buildBoltzmannFactorScene(): SceneSpec {
  const X0 = -3.8, Y0 = -2.6, SX = 1.3, SY = 5.2
  return {
    id: 'phys-boltzmann-factor',
    title: 'The Boltzmann factor',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show the relative probability of a state falling off exponentially with its energy, e^(−E/kT) — and falling more slowly at a higher temperature, so high-energy states become more likely.',
    ariaLabel: 'A graph of relative probability against energy. Two decaying exponential curves: at temperature T it falls steeply; at 2T it falls more slowly, so states of higher energy are more likely when hotter.',
    steps: [
      { narration: 'The relative probability of finding a system in a state of energy E, at temperature T.', objects: [...graphAxes(X0, Y0, X0 + 6.2 * SX, Y0 + SY + 0.6, 'energy E (units of kT)', 'probability'), curve(fnPath((x) => Y0 + SY * boltzmann((x - X0) / SX, 1), X0, X0 + 6 * SX, 100), ROLE.output), label('temperature T', P(X0 + 1.6 * SX, Y0 + SY * boltzmann(1.2, 1) + 0.4), ROLE.output, 'detail')] },
      { narration: 'It falls off exponentially: each extra kT of energy makes a state e ≈ 2.7 times less likely.', objects: [label('P ∝ e^(−E/kT)', P(1.8, 2.4), ROLE.result, 'primary')] },
      { narration: `At twice the temperature the curve falls more slowly: a state 2kT up is e^(−1) = ${r2(boltzmann(2, 2))} as likely instead of e^(−2) = ${r2(boltzmann(2, 1))}.`, objects: [curve(fnPath((x) => Y0 + SY * boltzmann((x - X0) / SX, 2), X0, X0 + 6 * SX, 100), ROLE.input), label('temperature 2T', P(X0 + 3.8 * SX, Y0 + SY * boltzmann(3.4, 2) + 0.4), ROLE.input, 'detail'), line(P(X0 + 2 * SX, Y0), P(X0 + 2 * SX, Y0 + SY * boltzmann(2, 2)), ROLE.aid, 0.02), dot(P(X0 + 2 * SX, Y0 + SY * boltzmann(2, 1)), ROLE.output, 0.1), dot(P(X0 + 2 * SX, Y0 + SY * boltzmann(2, 2)), ROLE.input, 0.1), label(`at 2kT: e^(−1) = ${r2(boltzmann(2, 2))} vs e^(−2) = ${r2(boltzmann(2, 1))}`, P(1.6, 1.4), ROLE.result, 'primary')] },
    ],
  }
}

// ── 2. Partition function ────────────────────────────────────────────────────

/** KG: "Z = Σe^(−E_i/kT) sums Boltzmann factors over all microstates." Three levels at 0, kT, 2kT: Z and the probabilities. */
export const PF_LEVELS = [0, 1, 2]
export function partition() {
  const w = PF_LEVELS.map((e) => Math.exp(-e))
  const Z = w.reduce((a, b) => a + b, 0)
  return { w: w.map(r2), Z: r2(Z), p: w.map((x) => r2(x / Z)) }
}
export function buildPartitionFunctionScene(): SceneSpec {
  const pf = partition(), S = 3.4, X0 = -2.4
  return {
    id: 'phys-partition-function',
    title: 'The partition function',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show the partition function as the sum of every state\'s Boltzmann factor: Z = Σe^(−E/kT); dividing each factor by Z gives that state\'s probability.',
    ariaLabel: 'Three energy levels at 0, kT and 2kT, each with a bar showing its Boltzmann factor: 1, 0.37 and 0.14. Stacked end to end they make Z = 1.50. Dividing by Z gives probabilities 0.67, 0.24 and 0.09.',
    steps: [
      { narration: 'Three energy levels, at 0, kT and 2kT. Each has a Boltzmann factor e^(−E/kT).', objects: PF_LEVELS.flatMap((e, i) => [line(P(X0 - 1.2, -2.2 + i * 1.6), P(X0, -2.2 + i * 1.6), ROLE.reference, 0.05), line(P(X0 + 0.3, -2.2 + i * 1.6), P(X0 + 0.3 + pf.w[i] * S, -2.2 + i * 1.6), ROLE.output, 0.2), label(e === 0 ? 'E = 0' : e === 1 ? 'E = kT' : `E = ${e}kT`, P(X0 - 2.0, -2.2 + i * 1.6), ROLE.ink, 'detail')]) },
      { narration: `Add them all up: Z = ${pf.w.join(' + ')} = ${pf.Z}. The partition function counts how many states are effectively available.`, objects: [line(P(X0 + 0.3, 2.9), P(X0 + 0.3 + pf.Z * S, 2.9), ROLE.result, 0.2), label(`Z = Σe^(−E/kT) = ${pf.Z}`, P(0.6, 3.6), ROLE.result, 'primary')] },
      { narration: `Each state's probability is its factor divided by Z: ${pf.p.join(', ')}. Everything else — energy, entropy, pressure — follows from Z.`, objects: pf.p.map((p, i) => label(`P = ${p}`, P(X0 + 1.2 + pf.w[i] * S, -1.7 + i * 1.6), ROLE.output, 'detail')) },
    ],
  }
}

// ── 3. Maxwell–Boltzmann speed distribution ──────────────────────────────────

/** KG: "the probability distribution of molecular speeds in an ideal gas." Nitrogen at 300 K and 900 K; v_p = √(2kT/m). */
export const K_B = 1.381e-23, M_N2 = 4.65e-26
export function mostProbableSpeed(T: number): number { return Math.round(Math.sqrt((2 * K_B * T) / M_N2)) }
export function mbDensity(v: number, T: number): number { const a = M_N2 / (2 * K_B * T); return 4 * Math.PI * (a / Math.PI) ** 1.5 * v * v * Math.exp(-a * v * v) }
export function buildMaxwellBoltzmannScene(): SceneSpec {
  const X0 = -3.8, Y0 = -2.6, VMAX = 1800, SX = 8.0 / VMAX
  const peak = mbDensity(mostProbableSpeed(300), 300), SY = 5.2 / peak
  const x = (v: number) => X0 + v * SX
  return {
    id: 'phys-maxwell-boltzmann',
    title: 'Maxwell–Boltzmann speed distribution',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show how molecular speeds in a gas are spread out, peaking at v_p = √(2kT/m); heating the gas shifts the peak to higher speed and flattens the curve.',
    ariaLabel: 'A graph of the fraction of nitrogen molecules against speed. At 300 kelvin the curve peaks at about 420 metres per second. At 900 kelvin it is lower, broader and peaks at about 730 metres per second. Both enclose the same area.',
    steps: [
      { narration: 'How many nitrogen molecules have each speed, at room temperature (300 K).', objects: [...graphAxes(X0, Y0, x(VMAX) + 0.2, Y0 + 5.8, 'speed (m/s)', 'fraction'), curve(fnPath((xx) => Y0 + SY * mbDensity((xx - X0) / SX, 300), X0, x(VMAX), 120), ROLE.output), label(`300 K: peak ${mostProbableSpeed(300)} m/s`, P(x(mostProbableSpeed(300)) + 1.9, Y0 + 5.4), ROLE.output, 'detail')] },
      { narration: 'Few are very slow, few very fast; the most probable speed is v_p = √(2kT/m).', objects: [line(P(x(mostProbableSpeed(300)), Y0), P(x(mostProbableSpeed(300)), Y0 + 5.2), ROLE.aid, 0.02), label('v_p = √(2kT/m)', P(2.4, 3.8), ROLE.result, 'primary')] },
      { narration: `At 900 K the peak moves to ${mostProbableSpeed(900)} m/s and the curve spreads out — same number of molecules, more of them fast.`, objects: [curve(fnPath((xx) => Y0 + SY * mbDensity((xx - X0) / SX, 900), X0, x(VMAX), 120), ROLE.input), label(`900 K: peak ${mostProbableSpeed(900)} m/s`, P(x(mostProbableSpeed(900)) + 1.6, Y0 + SY * mbDensity(mostProbableSpeed(900), 900) + 0.4), ROLE.input, 'detail')] },
    ],
  }
}

// ── 4. Fermi–Dirac statistics ────────────────────────────────────────────────

/** KG: "the thermal occupation of quantum states by fermions, with the Fermi energy as the chemical potential at T=0." f(E) = 1/(e^((E−E_F)/kT) + 1). */
export function fermiDirac(E: number, EF: number, kT: number): number { return kT === 0 ? (E < EF ? 1 : E > EF ? 0 : 0.5) : 1 / (Math.exp((E - EF) / kT) + 1) }
export function buildFermiDiracScene(): SceneSpec {
  const X0 = -3.8, Y0 = -2.2, SX = 1.6, SY = 4.4, EF = 2.4
  const x = (e: number) => X0 + e * SX
  return {
    id: 'phys-fermi-dirac',
    title: 'Fermi–Dirac occupation',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show how fermions fill states: at absolute zero every state up to the Fermi energy is full and every one above is empty; at a temperature the edge softens over a few kT, and f = ½ at E_F.',
    ariaLabel: 'A graph of occupation probability against energy. At absolute zero it is a sharp step: 1 below the Fermi energy, 0 above. At a finite temperature the step is smoothed over a narrow range around the Fermi energy, passing through one half at E_F.',
    steps: [
      { narration: 'The probability that a state of energy E is occupied by a fermion (such as an electron).', objects: [...graphAxes(X0, Y0, x(5) + 0.1, Y0 + SY + 0.8, 'energy E', 'occupation f'), line(P(X0 - 0.15, Y0 + SY), P(X0 + 0.15, Y0 + SY), ROLE.reference, 0.03), label('1', P(X0 - 0.45, Y0 + SY), ROLE.ink, 'detail')] },
      { narration: 'At absolute zero it is a sharp step: every state below the Fermi energy E_F is full, every state above is empty. Pauli exclusion stacks the electrons up.', objects: [line(P(X0, Y0 + SY), P(x(EF), Y0 + SY), ROLE.output, 0.05), line(P(x(EF), Y0 + SY), P(x(EF), Y0), ROLE.output, 0.05), line(P(x(EF), Y0), P(x(4.8), Y0), ROLE.output, 0.05), label('T = 0', P(x(1.0), Y0 + SY + 0.4), ROLE.output, 'detail'), label('E_F', P(x(EF), Y0 - 0.5), ROLE.result, 'primary')] },
      { narration: 'At a finite temperature only states within a few kT of E_F are affected: the edge softens, passing through f = ½ exactly at E_F.', objects: [curve(fnPath((xx) => Y0 + SY * fermiDirac((xx - X0) / SX, EF, 0.25), X0, x(4.8), 120), ROLE.input), label('T > 0: f = ½ at E_F', P(x(3.9), Y0 + SY * 0.5 + 0.4), ROLE.input, 'detail'), label('f = 1/(e^((E−E_F)/kT) + 1)', P(1.4, 3.8), ROLE.result, 'primary')] },
    ],
  }
}

// ── 5. Bose–Einstein condensation ────────────────────────────────────────────

/** KG: "bosons … can occupy the same quantum state; at low temperatures they condense into the ground state." N₀/N = 1 − (T/T_c)^(3/2). */
export function condensateFraction(tRel: number): number { return tRel >= 1 ? 0 : 1 - tRel ** 1.5 }
export function buildBoseEinsteinScene(): SceneSpec {
  const X0 = -3.6, Y0 = -2.4, SX = 4.4, SY = 4.6
  const x = (t: number) => X0 + t * SX
  return {
    id: 'phys-bose-einstein',
    title: 'Bose–Einstein condensation',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show bosons piling into the lowest state as they cool: below a critical temperature T_c a growing fraction N₀/N = 1 − (T/T_c)^(3/2) share the ground state — a Bose–Einstein condensate.',
    ariaLabel: 'A graph of the fraction of bosons in the ground state against temperature, in units of the critical temperature. Above T_c it is zero. Below T_c it rises, reaching all of them at absolute zero.',
    steps: [
      { narration: 'Bosons, unlike fermions, may share a quantum state. Plot the fraction in the lowest state against temperature.', objects: [...graphAxes(X0, Y0, x(1.7), Y0 + SY + 0.7, 'temperature T / T_c', 'fraction in ground state'), line(P(X0 - 0.15, Y0 + SY), P(X0 + 0.15, Y0 + SY), ROLE.reference, 0.03), label('1', P(X0 - 0.45, Y0 + SY), ROLE.ink, 'detail')] },
      { narration: 'Above a critical temperature T_c almost none are in the ground state.', objects: [line(P(x(1), Y0), P(x(1.6), Y0), ROLE.output, 0.06), line(P(x(1), Y0 - 0.2), P(x(1), Y0 + SY), ROLE.aid, 0.02), label('T_c', P(x(1), Y0 - 0.5), ROLE.aid, 'primary')] },
      { narration: 'Below T_c they pile in: N₀/N = 1 − (T/T_c)^(3/2), reaching all of them at absolute zero. The condensate behaves as one giant quantum wave.', objects: [curve(fnPath((xx) => Y0 + SY * condensateFraction((xx - X0) / SX), X0, x(1), 80), ROLE.input), label('N₀/N = 1 − (T/T_c)^(3/2)', P(1.4, 3.4), ROLE.result, 'primary'), label('condensate', P(x(0.3), Y0 + SY * condensateFraction(0.3) + 0.45), ROLE.input, 'detail')] },
    ],
  }
}

// ── 6. Statistical entropy ───────────────────────────────────────────────────

/** KG: "S = k ln Ω … the logarithm of the number of accessible microstates." Six coins: Ω for each number of heads, C(6, k). */
export const COINS = 6
export function microstates(): number[] { return Array.from({ length: COINS + 1 }, (_, k) => binom(COINS, k)) }
export function buildStatisticalEntropyScene(): SceneSpec {
  const om = microstates(), X0 = -3.6, Y0 = -2.6, W = 1.05, SY = 0.26
  const peak = om.indexOf(Math.max(...om))
  return {
    id: 'phys-entropy-statistical',
    title: 'Entropy as counting microstates',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show entropy as counting: for six coins, the macrostate "3 heads" can happen in 20 ways and "all heads" in only 1, so the most likely macrostate is the one with the most microstates — S = k ln Ω.',
    ariaLabel: 'A bar chart of six coin tosses: the number of ways, Omega, to get 0 to 6 heads — 1, 6, 15, 20, 15, 6 and 1. The middle bar, three heads, is tallest: the most microstates and the highest entropy.',
    steps: [
      { narration: `Toss ${COINS} coins. A macrostate is "how many heads"; a microstate is exactly which coins are heads.`, objects: [arrow(P(X0 - 0.4, Y0), P(X0 + 7.4 * W, Y0), ROLE.reference), label('number of heads', P(X0 + 3 * W, Y0 - 1.0), ROLE.ink, 'detail'), label('0', P(X0, Y0 - 0.5), ROLE.ink, 'detail'), label(String(COINS), P(X0 + COINS * W, Y0 - 0.5), ROLE.ink, 'detail')] },
      { narration: `Count the ways Ω for each: ${om.join(', ')}. The middle macrostate has by far the most.`, objects: om.map((n, k) => line(P(X0 + k * W, Y0), P(X0 + k * W, Y0 + n * SY), k === peak ? ROLE.result : ROLE.output, 0.3)) },
      { narration: `Boltzmann: S = k ln Ω. The macrostate with the most microstates (Ω = ${om[peak]}) has the highest entropy and is the one you almost always see — for 10²³ molecules, overwhelmingly so.`, objects: [label(`${peak} heads: Ω = ${om[peak]}`, P(X0 + peak * W, Y0 + om[peak] * SY + 0.45), ROLE.result, 'primary'), label('S = k ln Ω', P(2.8, 3.6), ROLE.result, 'primary')] },
    ],
  }
}

// ── 7. Free energy ───────────────────────────────────────────────────────────

/**
 * KG: "Helmholtz free energy F = U − TS and Gibbs free energy G = H − TS …
 * determine equilibrium." ΔG = ΔH − TΔS for ΔH = +40 kJ, ΔS = +0.1 kJ/K: the
 * process becomes spontaneous (ΔG < 0) above T = ΔH/ΔS = 400 K.
 */
export const FE = { dH: 40, dS: 0.1 }
export function deltaG(T: number): number { return FE.dH - T * FE.dS }
export function buildFreeEnergyScene(): SceneSpec {
  const X0 = -3.8, Y0 = 0, SX = 8.0 / 800, SY = 0.08
  const x = (T: number) => X0 + T * SX, y = (g: number) => Y0 + g * SY
  const Tc = FE.dH / FE.dS
  return {
    id: 'phys-free-energy',
    title: 'Free energy decides',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show ΔG = ΔH − TΔS against temperature for a process that absorbs heat but increases entropy: it is not spontaneous when cold (ΔG > 0) and becomes spontaneous above T = ΔH/ΔS.',
    ariaLabel: 'A graph of the free-energy change against temperature. The line starts at plus 40 kilojoules at zero kelvin and falls, crossing zero at 400 kelvin. Below 400 kelvin the process does not happen by itself; above, it does.',
    steps: [
      { narration: `A process that absorbs heat (ΔH = +${FE.dH} kJ) but increases entropy (ΔS = +${FE.dS} kJ/K). Its free-energy change is ΔG = ΔH − TΔS.`, objects: [arrow(P(X0, Y0), P(x(800) + 0.2, Y0), ROLE.reference), line(P(X0, -3.4), P(X0, 3.8), ROLE.reference, 0.04), label('temperature (K)', P(3.2, Y0 - 0.5), ROLE.ink, 'detail'), label('ΔG (kJ)', P(X0 + 0.7, 4.0), ROLE.ink, 'detail'), line(P(x(0), y(deltaG(0))), P(x(780), y(deltaG(780))), ROLE.input, 0.05)] },
      { narration: 'Cold: ΔG > 0 — the energy cost wins and the process does not happen by itself.', objects: [label('ΔG > 0: not spontaneous', P(1.3, 2.2), ROLE.input, 'detail')] },
      { narration: `Above T = ΔH/ΔS = ${Tc} K the entropy term wins: ΔG < 0 and the process happens by itself (like ice melting above 0 °C).`, objects: [dot(P(x(Tc), Y0), ROLE.result, 0.12), label(`T = ΔH/ΔS = ${Tc} K`, P(x(Tc) + 1.9, Y0 + 0.6), ROLE.result, 'primary'), label('ΔG < 0: spontaneous', P(-1.0, -2.0), ROLE.output, 'detail')] },
    ],
  }
}

// ── 8. Grand canonical ensemble ──────────────────────────────────────────────

/** KG: "systems in contact with both a heat bath and a particle reservoir." A small open system exchanging energy and particles; T and μ fixed. */
export function buildGrandCanonicalScene(): SceneSpec {
  const dots: SceneObject[] = []
  const pts: Array<[number, number]> = [[-3.8, 2.6], [-2.4, 3.2], [-4.0, 0.6], [3.4, 2.8], [4.0, 0.8], [3.2, -2.8], [-3.6, -2.6], [-1.6, -3.2], [1.8, -3.3], [0.4, 3.4], [2.2, 2.9], [-4.2, -1.0]]
  for (const [a, b] of pts) dots.push(dot(P(a, b), ROLE.output, 0.1))
  const inner: Array<[number, number]> = [[-0.5, 0.4], [0.6, -0.3], [0.1, 0.7]]
  return {
    id: 'phys-grand-canonical',
    title: 'The grand canonical ensemble',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show an open system inside a huge reservoir that exchanges both energy and particles with it, so the system\'s temperature T and chemical potential μ are fixed while its energy and particle number fluctuate.',
    ariaLabel: 'A small box, the system, sits inside a large reservoir full of particles. Arrows show heat and particles passing both ways through the box walls. The reservoir fixes the temperature and the chemical potential; the grand partition function sums over every energy and particle number.',
    steps: [
      { narration: 'A small system inside a huge reservoir of energy and particles.', objects: [...rect(-4.6, -3.8, 4.6, 3.8, ROLE.reference), ...rect(-1.4, -1.2, 1.4, 1.2, ROLE.input), ...dots, ...inner.map(([a, b]) => dot(P(a, b), ROLE.input, 0.12)), label('system', P(0, -1.7), ROLE.input, 'primary'), label('reservoir: fixes T and μ', P(0, 4.3), ROLE.ink, 'detail')] },
      { narration: 'Its walls let heat through AND let particles in and out, so both its energy E and its particle number N fluctuate.', objects: [arrow(P(-2.8, 0.3), P(-1.6, 0.3), ROLE.aid), arrow(P(-1.6, -0.3), P(-2.8, -0.3), ROLE.aid), label('energy', P(-3.1, 0.9), ROLE.aid, 'detail'), arrow(P(1.6, 0.3), P(2.8, 0.3), ROLE.result), arrow(P(2.8, -0.3), P(1.6, -0.3), ROLE.result), label('particles', P(3.2, 0.9), ROLE.result, 'detail')] },
      { narration: 'Each microstate i is weighted by e^(−β(E_i − μN_i)); summing over all of them gives the grand partition function Ξ.', objects: [label('Ξ = Σ e^(−β(E − μN))', P(0, -2.6), ROLE.result, 'primary')] },
    ],
  }
}

// ── 9. Chemical potential ────────────────────────────────────────────────────

/** KG: "the free energy cost of adding one particle; it equalises between subsystems at equilibrium, governs diffusion." Particles flow from high μ to low μ. */
export const MU_DENSITIES = { left: 14, right: 4 }
export function buildChemicalPotentialScene(): SceneSpec {
  const L = MU_DENSITIES.left, R = MU_DENSITIES.right
  const grid = (x0: number, n: number): SceneObject[] => Array.from({ length: n }, (_, i) => dot(P(x0 + 0.3 + (i % 4) * 0.7, -1.3 + Math.floor(i / 4) * 0.75), ROLE.output, 0.11))
  const eq = (L + R) / 2
  return {
    id: 'phys-chemical-potential',
    title: 'Chemical potential drives particle flow',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show two regions joined by an opening: particles flow from higher chemical potential μ to lower until the μ values are equal — equilibrium for particle exchange, just as equal temperature is for heat.',
    ariaLabel: 'Two boxes joined by an opening. The left box is crowded with particles (high chemical potential), the right one sparse (low). An arrow shows particles moving from left to right until both have the same density and the same chemical potential.',
    steps: [
      { narration: 'Two regions of the same gas joined by an opening. The crowded one has the higher chemical potential μ.', objects: [...rect(-4.6, -1.8, -0.6, 1.8, ROLE.reference), ...rect(0.6, -1.8, 4.6, 1.8, ROLE.reference), line(P(-0.6, 0.4), P(0.6, 0.4), ROLE.reference, 0.04), line(P(-0.6, -0.4), P(0.6, -0.4), ROLE.reference, 0.04), ...grid(-4.4, L), ...grid(0.8, R), label('μ₁ high', P(-2.6, 2.3), ROLE.input, 'primary'), label('μ₂ low', P(2.6, 2.3), ROLE.output, 'primary')] },
      { narration: 'Particles move from high μ to low μ: each move lowers the total free energy.', objects: [arrow(P(-1.2, 0), P(1.2, 0), ROLE.result), label('flow', P(0, 0.7), ROLE.result, 'detail')] },
      { narration: `Flow stops when μ₁ = μ₂ — here when each side holds ${eq}. Chemical potential plays for particles the role temperature plays for heat.`, objects: [label(`equilibrium: μ₁ = μ₂ (${eq} and ${eq})`, P(0, -2.8), ROLE.result, 'primary')] },
    ],
  }
}

// ── 10. Fluctuations ─────────────────────────────────────────────────────────

/** KG: "Thermodynamic fluctuations … ⟨(ΔA)²⟩ = kT²(∂⟨A⟩/∂T)." Relative fluctuations scale as 1/√N — log–log slope −½. */
export function relativeFluctuation(N: number): number { return 1 / Math.sqrt(N) }
export function buildFluctuationsScene(): SceneSpec {
  const X0 = -3.8, Y0 = -2.8, SX = 8.0 / 24, SY = 6.0 / 12 // x: log10 N 0..24; y: log10 (ΔE/E) −12..0
  const x = (lgN: number) => X0 + lgN * SX, y = (lgF: number) => Y0 + (lgF + 12) * SY
  return {
    id: 'phys-fluctuations',
    title: 'Fluctuations shrink with size',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show that a system\'s relative fluctuations shrink as 1/√N: for a handful of molecules they are huge, for a mole (10²⁴) about one part in 10¹² — which is why macroscopic thermodynamics is so sharp.',
    ariaLabel: 'A log–log graph of relative fluctuation against the number of particles. A straight line slopes down with slope minus one half: for 100 particles about 10 percent, for 10 to the 24 particles about 10 to the minus 12.',
    steps: [
      { narration: 'How big are a system\'s random fluctuations (say, of its energy) compared with its average? Plot against the number of particles N, on logarithmic axes.', objects: [...graphAxes(X0, Y0, x(24) + 0.2, y(0) + 0.3, 'particles N (log)', 'ΔE/E (log)')] },
      { narration: 'Relative fluctuations fall as 1/√N: a straight line of slope −½ on log–log axes.', objects: [line(P(x(0), y(0)), P(x(24), y(-12)), ROLE.input, 0.05), label(`ΔE/E ∝ 1/√N, so N = 100 gives ${Math.round(relativeFluctuation(100) * 100)}%`, P(1.2, 2.4), ROLE.result, 'primary')] },
      { narration: `For 100 molecules they are ${Math.round(relativeFluctuation(100) * 100)}%; for a mole, about 10⁻¹² — far too small ever to notice.`, objects: [dot(P(x(2), y(Math.log10(relativeFluctuation(100)))), ROLE.output, 0.12), dot(P(x(24), y(-12)), ROLE.result, 0.12), label('a mole: 10⁻¹²', P(x(24) - 1.8, y(-12) + 0.9), ROLE.result, 'detail')] },
    ],
  }
}

// ── 11. Phase transitions: Landau theory ─────────────────────────────────────

/**
 * KG: "Landau's mean-field theory expands the free energy in powers of an
 * order parameter η." F(η) = a(T − T_c)η² + bη⁴: one minimum at η = 0 above
 * T_c, two at η = ±√(a(T_c − T)/2b) below.
 */
export const LANDAU = { a: 1, b: 0.5, Tc: 1 }
export function landauF(eta: number, T: number): number { return LANDAU.a * (T - LANDAU.Tc) * eta * eta + LANDAU.b * eta ** 4 }
export function landauMinimum(T: number): number { return T >= LANDAU.Tc ? 0 : Math.sqrt((LANDAU.a * (LANDAU.Tc - T)) / (2 * LANDAU.b)) }
export function buildLandauScene(): SceneSpec {
  const SX = 1.6, SY = 2.2, YA = 1.4, YB = -2.2, Thi = 1.5, Tlo = 0.2
  // Draw each curve only out to where it has risen HMAX above its baseline (F grows as η⁴).
  const HMAX = 2.2
  const reach = (T: number) => { let e = 0; while (SY * landauF(e + 0.01, T) <= HMAX || e < landauMinimum(T)) e += 0.01; return e }
  const F = (T: number, y0: number) => fnPath((x) => y0 + SY * landauF(x / SX, T), -reach(T) * SX, reach(T) * SX, 100)
  const eta0 = landauMinimum(Tlo)
  return {
    id: 'phys-landau',
    title: 'Phase transitions: Landau theory',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show the Landau free energy F(η) = a(T − T_c)η² + bη⁴: above T_c its only minimum is at η = 0 (disordered); below T_c two minima appear at ±η₀ and the system orders.',
    ariaLabel: 'Two curves of free energy against the order parameter. Above the critical temperature it is a single bowl with its minimum at zero: no order. Below the critical temperature it has a hump at zero and two dips at plus and minus eta-nought: the system picks one and becomes ordered.',
    steps: [
      { narration: 'The free energy as a function of an order parameter η (for a magnet, its magnetisation). Above T_c: one minimum at η = 0 — disordered.', objects: [line(P(-4.4, YA), P(4.4, YA), ROLE.reference, 0.015), curve(F(Thi, YA), ROLE.output), dot(P(0, YA), ROLE.output, 0.12), label('T > T_c: η = 0', P(3.0, YA + 1.2), ROLE.output, 'detail')] },
      { narration: 'Below T_c the η² term turns negative: the centre becomes a hump and two minima appear at ±η₀.', objects: [line(P(-4.4, YB), P(4.4, YB), ROLE.reference, 0.015), curve(F(Tlo, YB), ROLE.input), dot(P(eta0 * SX, YB + SY * landauF(eta0, Tlo)), ROLE.input, 0.12), dot(P(-eta0 * SX, YB + SY * landauF(eta0, Tlo)), ROLE.input, 0.12), label('T < T_c: η = ±η₀', P(2.8, YB + 2.6), ROLE.input, 'detail')] },
      { narration: `The system settles into one of the two — it orders spontaneously, with η₀ = √(a(T_c − T)/2b), here ${r2(eta0)}.`, objects: [label('F = a(T − T_c)η² + bη⁴', P(0, 4.0), ROLE.result, 'primary')] },
    ],
  }
}

// ── 12. The Ising model ──────────────────────────────────────────────────────

/**
 * KG: "binary spins σᵢ = ±1 … nearest-neighbour coupling H = −JΣσᵢσⱼ." A 5×5
 * lattice cold (nearly all aligned) and hot (mixed); energies computed from
 * the neighbour sums.
 */
export const ISING_COLD: number[][] = [[1, 1, 1, 1, 1], [1, 1, 1, 1, 1], [1, 1, -1, 1, 1], [1, 1, 1, 1, 1], [1, 1, 1, 1, 1]]
export const ISING_HOT: number[][] = [[1, -1, -1, 1, -1], [-1, 1, 1, -1, 1], [1, -1, 1, 1, -1], [-1, 1, -1, -1, 1], [1, 1, -1, 1, -1]]
export function isingEnergy(s: number[][]): number { // units of J, open boundaries
  let E = 0
  for (let i = 0; i < 5; i++) for (let j = 0; j < 5; j++) { if (i < 4) E -= s[i][j] * s[i + 1][j]; if (j < 4) E -= s[i][j] * s[i][j + 1] }
  return E
}
const fmtJ = (e: number) => `${e < 0 ? '−' : ''}${Math.abs(e)} J`
export function buildIsingScene(): SceneSpec {
  const spins = (s: number[][], cx: number, color: string): SceneObject[] => s.flatMap((row, i) => row.map((v, j) => {
    const x = cx + (j - 2) * 0.75, y = 1.2 - (i - 2) * 0.75 - 1.0
    return arrow(P(x, y - 0.25 * v), P(x, y + 0.25 * v), v > 0 ? color : ROLE.input)
  }))
  return {
    id: 'phys-ising',
    title: 'The Ising model',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show the Ising model: spins that point up or down, with neighbours preferring to align (H = −JΣσᵢσⱼ). Cold, they order into a magnet; hot, thermal agitation mixes them up.',
    ariaLabel: 'Two five-by-five grids of arrows. On the left, cold: every arrow points up except one — an ordered magnet with low energy. On the right, hot: the arrows point up and down in a mixed pattern — disordered, with much higher energy.',
    steps: [
      { narration: `Each site holds a spin, up or down. Aligned neighbours lower the energy: H = −JΣσᵢσⱼ. Cold, almost all spins align: E = ${fmtJ(isingEnergy(ISING_COLD))}.`, objects: [...spins(ISING_COLD, -2.6, ROLE.output), label(`cold: ordered, E = ${fmtJ(isingEnergy(ISING_COLD))}`, P(-2.6, 2.6), ROLE.output, 'detail')] },
      { narration: `Hot, thermal jiggling beats the coupling and the spins mix: E = ${fmtJ(isingEnergy(ISING_HOT))} — no net magnetisation.`, objects: [...spins(ISING_HOT, 2.6, ROLE.output), label(`hot: disordered, E = ${fmtJ(isingEnergy(ISING_HOT))}`, P(2.6, 2.6), ROLE.input, 'detail')] },
      { narration: 'In two dimensions the model has a sharp transition between the two at a critical temperature; in one dimension it never orders.', objects: [label('H = −J Σ σᵢσⱼ', P(0, -3.6), ROLE.result, 'primary')] },
    ],
  }
}

// ── 13. Critical phenomena ───────────────────────────────────────────────────

/**
 * KG: "Near a critical point, thermodynamic quantities diverge as power laws
 * |T−Tc|^α,β,γ …; universality." Order parameter M ∝ (T_c − T)^β with the 3D
 * Ising β ≈ 0.326; susceptibility χ ∝ |T − T_c|^(−γ), γ ≈ 1.24.
 */
export const BETA_3D = 0.326, GAMMA_3D = 1.24
export function orderParameter(tRel: number): number { return tRel >= 1 ? 0 : (1 - tRel) ** BETA_3D }
export function susceptibility(tRel: number): number { return Math.min(8, 0.12 * Math.abs(1 - tRel) ** -GAMMA_3D) }
export function buildCriticalScene(): SceneSpec {
  const X0 = -3.8, Y0 = -2.6, SX = 4.0, SY = 3.2
  const x = (t: number) => X0 + t * SX
  return {
    id: 'phys-critical-phenomena',
    title: 'Critical phenomena',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show behaviour near a critical point: the order parameter vanishes as a power law, M ∝ (T_c − T)^β, while the susceptibility diverges as |T − T_c|^(−γ) — with exponents shared by whole universality classes.',
    ariaLabel: 'A graph against temperature in units of the critical temperature. The order parameter falls from 1 and drops steeply to zero exactly at T_c, following a power law. The susceptibility rises sharply on both sides and spikes at T_c.',
    steps: [
      { narration: 'Near a critical point T_c (for example a magnet losing its magnetism).', objects: [...graphAxes(X0, Y0, x(1.9), Y0 + SY + 1.9, 'T / T_c', 'value'), line(P(x(1), Y0), P(x(1), Y0 + SY + 1.6), ROLE.aid, 0.02), label('T_c', P(x(1), Y0 - 0.5), ROLE.aid, 'primary')] },
      { narration: `The order parameter drops to zero at T_c as a power law, M ∝ (T_c − T)^β, with β ≈ ${BETA_3D} for three-dimensional magnets.`, objects: [curve(fnPath((xx) => Y0 + SY * orderParameter((xx - X0) / SX), X0, x(0.999), 120), ROLE.output), label('M ∝ (T_c − T)^β', P(x(0.35), Y0 + SY + 0.4), ROLE.output, 'detail')] },
      { narration: `The response (susceptibility) diverges on both sides, χ ∝ |T − T_c|^(−γ), γ ≈ ${GAMMA_3D}. Very different materials share the same exponents: universality.`, objects: [curve(fnPath((xx) => Y0 + 0.6 * susceptibility((xx - X0) / SX), x(0.55), x(0.985), 60), ROLE.input), curve(fnPath((xx) => Y0 + 0.6 * susceptibility((xx - X0) / SX), x(1.015), x(1.8), 60), ROLE.input), label('χ ∝ |T − T_c|^(−γ)', P(x(1.45), Y0 + 2.2), ROLE.input, 'detail'), label(`β = ${BETA_3D}, γ = ${GAMMA_3D}`, P(1.6, 3.9), ROLE.result, 'primary')] },
    ],
  }
}

// ── 14. Monte Carlo: the Metropolis algorithm ────────────────────────────────

/** KG: "the Metropolis algorithm accepts new configurations with probability min(1, e^(−βΔE))." Acceptance against ΔE at two temperatures. */
export function metropolisAccept(dE: number, kT: number): number { return Math.min(1, Math.exp(-dE / kT)) }
export function buildMonteCarloScene(): SceneSpec {
  const X0 = -1.6, Y0 = -2.4, SX = 1.2, SY = 4.4
  const x = (d: number) => X0 + d * SX
  return {
    id: 'phys-monte-carlo',
    title: 'Monte Carlo: the Metropolis rule',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show the Metropolis rule: propose a random change; if it lowers the energy always accept it, if it raises the energy by ΔE accept it with probability e^(−ΔE/kT) — so the samples end up Boltzmann-distributed.',
    ariaLabel: 'A graph of acceptance probability against the energy change of a proposed move. For moves that lower the energy it is 1. For moves that raise it, it falls off exponentially — slowly at high temperature, steeply at low temperature.',
    steps: [
      { narration: 'Propose a random change to the system and compute its energy change ΔE.', objects: [arrow(P(-4.6, Y0), P(x(3.6), Y0), ROLE.reference), line(P(X0, Y0), P(X0, Y0 + SY + 0.8), ROLE.reference, 0.04), label('energy change ΔE', P(2.8, Y0 - 0.5), ROLE.ink, 'detail'), label('acceptance', P(X0 + 0.9, Y0 + SY + 1.1), ROLE.ink, 'detail')] },
      { narration: 'If the move lowers the energy (ΔE < 0), always accept it.', objects: [line(P(-4.4, Y0 + SY), P(X0, Y0 + SY), ROLE.aid, 0.05), label('ΔE < 0: always', P(-3.0, Y0 + SY + 0.45), ROLE.aid, 'detail')] },
      { narration: 'If it raises the energy, accept it only with probability e^(−ΔE/kT) — often when hot, rarely when cold. Repeating this samples states in exactly the Boltzmann proportions.', objects: [curve(fnPath((xx) => Y0 + SY * metropolisAccept((xx - X0) / SX, 1.5), X0, x(3.4), 80), ROLE.input), label('hot', P(x(2.2), Y0 + SY * metropolisAccept(2.2, 1.5) + 0.4), ROLE.input, 'detail'), curve(fnPath((xx) => Y0 + SY * metropolisAccept((xx - X0) / SX, 0.5), X0, x(3.4), 80), ROLE.output), label('cold', P(x(0.9), Y0 + SY * metropolisAccept(0.9, 0.5) + 0.4), ROLE.output, 'detail'), label('P = min(1, e^(−ΔE/kT))', P(1.4, 3.9), ROLE.result, 'primary')] },
    ],
  }
}
