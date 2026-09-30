/**
 * Physics visual gap campaign, batch 6 (2026-09-30): photons and matter waves,
 * nuclear physics and special relativity. Same rules as physicsCoreScenes.ts;
 * every figure stays within the intermediate label budget.
 */

import type { SceneSpec, SceneObject } from '@/lib/teaching/sceneSpec'
import { ROLE, arrow, curve, dot, label, line } from './visualDesign'
import { P, r2, rect, type V3 } from './physicsCoreScenes'

/** A wave packet along a direction: a sine under a Gaussian envelope. */
function packet(x0: number, y0: number, length: number, lambda: number, amp: number, angle = 0, samples = 90): V3[] {
  const pts: V3[] = []
  const c = Math.cos(angle), s = Math.sin(angle)
  for (let i = 0; i <= samples; i++) {
    const t = (length * i) / samples
    const env = Math.exp(-(((t - length / 2) / (length / 3.2)) ** 2))
    const y = amp * env * Math.sin((2 * Math.PI * t) / lambda)
    pts.push(P(x0 + t * c - y * s, y0 + t * s + y * c))
  }
  return pts
}

// ── 1. Photons ───────────────────────────────────────────────────────────────

/** KG: "Light is quantised into photons each carrying energy E = hf." E in eV from h = 4.136 × 10⁻¹⁵ eV·s. */
export const PLANCK_EV = 4.136e-15
export const PHOTONS: Array<{ name: string; f: number; color: string }> = [
  { name: 'red', f: 4.3e14, color: ROLE.input },
  { name: 'green', f: 5.6e14, color: ROLE.result },
  { name: 'violet', f: 7.5e14, color: ROLE.aid },
]
export function photonEnergyEv(f: number): number { return r2(PLANCK_EV * f) }
export function buildPhotonScene(): SceneSpec {
  const rows = [2.4, 0, -2.4]
  const objs: SceneObject[] = []
  PHOTONS.forEach((ph, i) => {
    const lam = r2(0.9 * (PHOTONS[0].f / ph.f))  // drawn wavelength ∝ 1/f
    objs.push(curve(packet(-4.6, rows[i], 3.4, lam, 0.6), ph.color))
    objs.push(line(P(0.2, rows[i]), P(0.2 + photonEnergyEv(ph.f) * 1.2, rows[i]), ph.color, 0.16))
    objs.push(label(`${ph.name}: ${photonEnergyEv(ph.f)} eV`, P(1.2 + photonEnergyEv(ph.f) * 0.6, rows[i] + 0.55), ph.color, 'detail'))
  })
  return {
    id: 'phys-photons',
    title: 'Photons: light comes in packets',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show light as photons, each carrying energy E = hf: a violet photon (higher frequency) carries more energy than a red one.',
    ariaLabel: 'Three photons drawn as short wave packets: red with the longest wavelength, green, and violet with the shortest. Beside each, an energy bar: red 1.78 electronvolts, green 2.32, violet 3.1 — higher frequency, more energy.',
    steps: [
      { narration: 'Light arrives in packets called photons. Red, green and violet photons have increasing frequency (shorter wavelength).', objects: objs.filter((o) => o.type === 'path') },
      { narration: 'Each photon carries energy E = hf: the higher the frequency, the more energy in each packet.', objects: objs.filter((o) => o.type !== 'path') },
      { narration: 'Brighter light means more photons, not more energetic ones. Only the frequency sets the energy of each photon.', objects: [label('E = hf', P(3.4, 3.8), ROLE.result, 'primary')] },
    ],
  }
}

// ── 2. De Broglie wavelength ─────────────────────────────────────────────────

/** KG: "every moving particle has an associated wavelength λ = h/p." Same electron at p and 2p: λ halves. */
export function buildDeBroglieScene(): SceneSpec {
  const L1 = 1.4, L2 = r2(L1 / 2)
  return {
    id: 'phys-de-broglie',
    title: 'Matter waves: λ = h/p',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show that a moving particle has a wavelength λ = h/p: doubling its momentum halves the wavelength.',
    ariaLabel: 'Two electrons drawn as wave packets moving to the right. The slower electron, with momentum p, has a long wavelength. The faster one, with momentum 2p, has half the wavelength.',
    steps: [
      { narration: 'A moving electron behaves like a wave. With momentum p its wavelength is λ = h/p.', objects: [curve(packet(-4.4, 1.8, 7.0, L1, 0.8), ROLE.output), dot(P(-0.9, 1.8), ROLE.output, 0.14), arrow(P(3.0, 1.8), P(4.4, 1.8), ROLE.output), label('momentum p', P(-3.2, 3.2), ROLE.output, 'primary'), line(P(-1.6, 0.7), P(-1.6 + L1, 0.7), ROLE.aid, 0.03), label('λ', P(-1.6 + L1 / 2, 0.3), ROLE.aid, 'primary')] },
      { narration: 'Double the momentum and the wavelength halves.', objects: [curve(packet(-4.4, -1.8, 7.0, L2, 0.8, 0, 160), ROLE.input), arrow(P(3.0, -1.8), P(4.4, -1.8), ROLE.input), label('momentum 2p', P(-3.2, -0.4), ROLE.input, 'primary'), line(P(-1.2, -2.9), P(-1.2 + L2, -2.9), ROLE.aid, 0.03), label('λ/2', P(-1.2 + L2 / 2, -3.3), ROLE.aid, 'primary')] },
      { narration: "Everyday objects have huge momentum, so their wavelength is far too small to notice. Electrons are light enough for it to matter: they diffract like waves.", objects: [label('λ = h / p', P(2.6, 3.6), ROLE.result, 'primary')] },
    ],
  }
}

// ── 3. X-rays ────────────────────────────────────────────────────────────────

/** KG: "produced by accelerating electrons into a metal target." Tube: cathode → high voltage → anode target → X-rays; E_max = eV. */
export const XRAY_KV = 50
export function buildXRayScene(): SceneSpec {
  const target: V3[] = [P(2.2, -1.0), P(3.2, 1.0)]
  return {
    id: 'phys-x-rays',
    title: 'Producing X-rays',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show an X-ray tube: electrons from a hot cathode are accelerated through a high voltage and slam into a metal target, which emits X-rays.',
    ariaLabel: 'An X-ray tube. On the left a heated cathode releases electrons, which are accelerated across the tube by a high voltage toward a slanted metal target on the right. Where they hit, X-rays are emitted downward out of the tube.',
    steps: [
      { narration: 'A heated cathode releases electrons inside an evacuated tube.', objects: [...rect(-4.6, -2.0, 4.0, 2.0, ROLE.reference), line(P(-3.8, -0.8), P(-3.8, 0.8), ROLE.input, 0.12), label('hot cathode', P(-3.8, 1.5), ROLE.input, 'detail'), line(target[0], target[1], ROLE.reference, 0.14), label('metal target', P(3.1, 1.5), ROLE.ink, 'detail')] },
      { narration: `A high voltage (here ${XRAY_KV} kV) accelerates the electrons across the tube.`, objects: [arrow(P(-3.4, 0.35), P(2.3, 0.35), ROLE.output), arrow(P(-3.4, -0.1), P(2.5, -0.1), ROLE.output), label('electrons', P(-0.6, 0.85), ROLE.output, 'primary'), label(`${XRAY_KV} kV`, P(-0.6, -2.6), ROLE.ink, 'primary')] },
      { narration: `They slam into the target and their kinetic energy is partly converted into X-ray photons. The most energetic photon has E_max = eV = ${XRAY_KV} keV.`, objects: [curve(packet(2.6, -0.2, 3.2, 0.35, 0.18, -Math.PI / 2 - 0.25, 90), ROLE.aid), curve(packet(2.8, -0.2, 3.2, 0.35, 0.18, -Math.PI / 2 + 0.2, 90), ROLE.aid), label('X-rays', P(4.2, -3.2), ROLE.aid, 'primary'), label(`E_max = eV = ${XRAY_KV} keV`, P(-2.2, 3.2), ROLE.result, 'primary')] },
    ],
  }
}

// ── 4. Radioactivity ─────────────────────────────────────────────────────────

/** KG: "spontaneous emission of alpha particles, beta particles, or gamma rays from unstable atomic nuclei." With their penetration. */
export const RAD_STOP: Record<'alpha' | 'beta' | 'gamma', 'paper' | 'aluminium' | 'lead'> = { alpha: 'paper', beta: 'aluminium', gamma: 'lead' }
export function buildRadioactivityScene(): SceneSpec {
  const BAR: Record<string, number> = { paper: -0.8, aluminium: 1.0, lead: 2.8 }
  const y = { alpha: 1.6, beta: 0, gamma: -1.6 }
  const stopAt = (k: keyof typeof y) => BAR[RAD_STOP[k]] - 0.15
  return {
    id: 'phys-radioactivity',
    title: 'Alpha, beta and gamma radiation',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show an unstable nucleus emitting alpha, beta and gamma radiation, and how far each penetrates: paper stops alpha, aluminium stops beta, thick lead is needed to reduce gamma.',
    ariaLabel: 'An unstable nucleus on the left emits three kinds of radiation to the right. Alpha particles are stopped by a sheet of paper, beta particles pass the paper but are stopped by aluminium, and gamma rays pass both and are only reduced by thick lead.',
    steps: [
      { narration: 'An unstable nucleus emits radiation of three kinds.', objects: [dot(P(-4.0, 0), ROLE.input, 0.45), label('nucleus', P(-4.0, -1.0), ROLE.input, 'detail')] },
      { narration: 'Alpha (helium nuclei, +2), beta (fast electrons) and gamma (high-energy photons).', objects: [arrow(P(-3.4, 0.5), P(stopAt('alpha'), y.alpha), ROLE.input), label('α', P(-2.2, y.alpha + 0.45), ROLE.input, 'primary'), arrow(P(-3.4, 0), P(stopAt('beta'), y.beta), ROLE.output), label('β', P(-2.2, y.beta + 0.45), ROLE.output, 'primary'), arrow(P(-3.4, -0.5), P(4.4, y.gamma), ROLE.aid), label('γ', P(-2.2, y.gamma - 0.45), ROLE.aid, 'primary')] },
      { narration: 'Paper stops alpha. Beta passes paper but a few millimetres of aluminium stops it. Gamma passes both; thick lead only reduces it.', objects: [line(P(BAR.paper, -2.4), P(BAR.paper, 2.4), ROLE.reference, 0.05), label('paper', P(BAR.paper, 2.9), ROLE.ink, 'detail'), line(P(BAR.aluminium, -2.4), P(BAR.aluminium, 2.4), ROLE.reference, 0.14), label('aluminium', P(BAR.aluminium, 2.9), ROLE.ink, 'detail'), line(P(BAR.lead, -2.4), P(BAR.lead, 2.4), ROLE.reference, 0.3), label('lead', P(BAR.lead, 2.9), ROLE.ink, 'detail')] },
    ],
  }
}

// ── 5. Nuclear reactions ─────────────────────────────────────────────────────

/** KG: "Nuclear reactions conserve charge, mass number, and energy." Rutherford's ¹⁴N + ⁴He → ¹⁷O + ¹H, with A and Z summed. */
export const REACTION = { before: [{ s: '¹⁴N', A: 14, Z: 7 }, { s: '⁴He', A: 4, Z: 2 }], after: [{ s: '¹⁷O', A: 17, Z: 8 }, { s: '¹H', A: 1, Z: 1 }] }
export function buildNuclearReactionScene(): SceneSpec {
  const sum = (xs: Array<{ A: number; Z: number }>, k: 'A' | 'Z') => xs.reduce((t, x) => t + x[k], 0)
  const [a, b] = REACTION.before, [c, d] = REACTION.after
  return {
    id: 'phys-nuclear-reactions',
    title: 'A nuclear reaction balances',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show a nuclear reaction (¹⁴N + ⁴He → ¹⁷O + ¹H) conserving mass number A and charge Z; any mass difference is released or absorbed as energy, the Q-value.',
    ariaLabel: 'An alpha particle strikes a nitrogen-14 nucleus, producing oxygen-17 and a proton. Below, the mass numbers add to 18 on both sides and the charges to 9 on both sides.',
    steps: [
      { narration: 'An alpha particle (⁴He) strikes a nitrogen-14 nucleus.', objects: [dot(P(-1.8, 1.2), ROLE.input, 0.55), label(a.s, P(-1.8, 2.2), ROLE.input, 'primary'), dot(P(-4.0, 1.2), ROLE.output, 0.28), label(b.s, P(-4.0, 2.2), ROLE.output, 'primary'), arrow(P(-3.6, 1.2), P(-2.5, 1.2), ROLE.output)] },
      { narration: 'It produces oxygen-17 and a proton (¹H).', objects: [arrow(P(-0.8, 1.2), P(0.6, 1.2), ROLE.ink), dot(P(1.8, 1.2), ROLE.aid, 0.58), label(c.s, P(1.8, 2.2), ROLE.aid, 'primary'), dot(P(3.8, 1.8), ROLE.result, 0.2), arrow(P(2.5, 1.4), P(3.5, 1.75), ROLE.result), label(d.s, P(4.2, 2.4), ROLE.result, 'primary')] },
      { narration: `Mass number and charge are both conserved: A ${a.A} + ${b.A} = ${c.A} + ${d.A}, Z ${a.Z} + ${b.Z} = ${c.Z} + ${d.Z}. Any change in total mass appears as energy, the Q-value.`, objects: [label(`A: ${sum(REACTION.before, 'A')} = ${sum(REACTION.after, 'A')}`, P(0, -1.2), ROLE.result, 'primary'), label(`Z: ${sum(REACTION.before, 'Z')} = ${sum(REACTION.after, 'Z')}`, P(0, -2.3), ROLE.result, 'primary')] },
    ],
  }
}

// ── 6. Binding energy per nucleon ────────────────────────────────────────────

/**
 * KG: "the energy equivalent of the mass defect." Measured binding energy per
 * nucleon (MeV) for representative nuclei, plotted against A. A semi-empirical
 * mass-formula curve was tried first and MEASURED to peak at A ≈ 63 — it would
 * have labelled the wrong nucleus as the peak — so the figure uses the
 * tabulated values themselves.
 */
export const BINDING_DATA: Array<{ n: string; A: number; b: number }> = [
  { n: 'H-2', A: 2, b: 1.112 }, { n: 'He-4', A: 4, b: 7.074 }, { n: 'Li-7', A: 7, b: 5.606 },
  { n: 'C-12', A: 12, b: 7.680 }, { n: 'O-16', A: 16, b: 7.976 }, { n: 'Fe-56', A: 56, b: 8.790 },
  { n: 'Kr-84', A: 84, b: 8.717 }, { n: 'Sn-120', A: 120, b: 8.505 }, { n: 'Ba-138', A: 138, b: 8.393 },
  { n: 'Pb-208', A: 208, b: 7.868 }, { n: 'U-238', A: 238, b: 7.570 },
]
export function buildBindingEnergyScene(): SceneSpec {
  // Log-A axis, as in most textbook versions of this graph: on a linear axis
  // every light nucleus (and the He-4 spike fusion climbs to) is squashed
  // against the vertical axis — MEASURED in the first render.
  const X0 = -4.2, Y0 = -2.8, A1 = 260, SY = 0.72
  const x = (A: number) => X0 + (8.4 * Math.log10(A)) / Math.log10(A1)
  const y = (b: number) => Y0 + b * SY
  const pts = BINDING_DATA.map((d) => P(x(d.A), y(d.b)))
  const peak = BINDING_DATA.reduce((a, b) => (b.b > a.b ? b : a))
  const at = (n: string) => BINDING_DATA.find((d) => d.n === n)!
  return {
    id: 'phys-binding-energy',
    title: 'Binding energy per nucleon',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show measured binding energy per nucleon against mass number: rising steeply for light nuclei, peaking at iron-56, and falling slowly for heavy nuclei — so fusing light nuclei and splitting heavy ones both release energy.',
    ariaLabel: 'A graph of binding energy per nucleon against mass number, through measured values. It rises steeply from hydrogen-2 at 1.1 MeV, with helium-4 unusually high, peaks at iron-56 at 8.8 MeV, then falls gradually to uranium-238 at 7.6 MeV. Arrows show fusion climbing the left side and fission climbing the right side.',
    steps: [
      { narration: 'Binding energy per nucleon: how tightly each nucleon is held, against the number of nucleons A (measured values).', objects: [arrow(P(X0, Y0), P(x(A1) + 0.2, Y0), ROLE.reference), arrow(P(X0, Y0), P(X0, y(9.6)), ROLE.reference), label('mass number A (log scale)', P(2.2, Y0 - 0.5), ROLE.ink, 'detail'), label('B/A (MeV)', P(X0 + 0.9, y(9.6) + 0.4), ROLE.ink, 'detail'), ...pts.slice(1).map((p, i) => line(pts[i], p, ROLE.output, 0.04)), ...pts.map((p) => dot(p, ROLE.output, 0.07)), label('He-4', P(x(4) - 0.1, y(at('He-4').b) + 0.45), ROLE.output, 'detail'), label('U-238', P(x(238) - 0.2, y(at('U-238').b) - 0.5), ROLE.output, 'detail')] },
      { narration: `It peaks at iron-56, about ${r2(peak.b)} MeV per nucleon: the most tightly bound nuclei.`, objects: [dot(P(x(peak.A), y(peak.b)), ROLE.result, 0.12), label(`${peak.n}: ${r2(peak.b)} MeV`, P(x(peak.A) + 0.6, y(peak.b) + 0.5), ROLE.result, 'primary')] },
      { narration: 'Moving toward the peak releases energy: fusing hydrogen into helium climbs the left side; splitting uranium into middle-sized nuclei climbs the right side.', objects: [arrow(P(x(at('H-2').A) + 0.15, y(at('H-2').b) + 0.2), P(x(at('He-4').A) + 0.05, y(at('He-4').b) - 0.3), ROLE.input), label('fusion', P(x(2) + 1.3, y(3.2)), ROLE.input, 'primary'), arrow(P(x(at('U-238').A), y(at('U-238').b) - 0.3), P(x(at('Sn-120').A), y(at('Sn-120').b) - 0.3), ROLE.aid), label('fission', P(x(170), y(6.4)), ROLE.aid, 'primary')] },
    ],
  }
}

// ── 7. Nuclear fission ───────────────────────────────────────────────────────

/** KG: "splits a heavy nucleus into lighter fragments releasing enormous energy; a chain reaction sustains continuous fission." */
export function buildFissionScene(): SceneSpec {
  const U: V3 = P(-1.6, 0)
  const outs = [0.9, 0, -0.9].map((a) => P(U[0] + 1.9 * Math.cos(a), U[1] + 1.9 * Math.sin(a)))
  return {
    id: 'phys-fission',
    title: 'Nuclear fission and chain reaction',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show a neutron splitting uranium-235 into two fragments, releasing energy and more neutrons, each of which can split another nucleus: a chain reaction.',
    ariaLabel: 'A neutron hits a uranium-235 nucleus. It splits into two smaller nuclei, barium and krypton, releasing about 200 MeV and three new neutrons. Each of those neutrons flies toward another uranium nucleus, continuing the chain.',
    steps: [
      { narration: 'A slow neutron is absorbed by a uranium-235 nucleus.', objects: [dot(P(-4.4, 0), ROLE.output, 0.13), arrow(P(-4.2, 0), P(-2.4, 0), ROLE.output), label('neutron', P(-4.2, 0.55), ROLE.output, 'detail'), dot(U, ROLE.input, 0.6), label('U-235', P(U[0], -1.0), ROLE.input, 'primary')] },
      { narration: 'It splits into two lighter nuclei (for example barium and krypton), releasing about 200 MeV and two or three neutrons.', objects: [dot(P(-1.0, 2.4), ROLE.aid, 0.4), label('Ba', P(-1.0, 3.2), ROLE.aid, 'detail'), dot(P(-1.0, -2.4), ROLE.aid, 0.34), label('Kr', P(-1.0, -3.2), ROLE.aid, 'detail'), label('≈ 200 MeV', P(-3.6, 2.0), ROLE.result, 'primary'), ...outs.map((o) => arrow(P(U[0] + 0.7 * Math.cos(Math.atan2(o[1] - U[1], o[0] - U[0])), U[1] + 0.7 * Math.sin(Math.atan2(o[1] - U[1], o[0] - U[0]))), o, ROLE.output))] },
      { narration: 'Each new neutron can split another uranium nucleus: a chain reaction. Controlled, it runs a power station.', objects: [...outs.map((o) => dot(P(o[0] + 1.3 * Math.cos(Math.atan2(o[1], o[0] - U[0])), o[1] + 1.3 * Math.sin(Math.atan2(o[1], o[0] - U[0]))), ROLE.input, 0.45)), label('chain reaction', P(3.0, 3.2), ROLE.input, 'primary')] },
    ],
  }
}

// ── 8. Nuclear fusion ────────────────────────────────────────────────────────

/** KG: "combines light nuclei into heavier ones releasing energy; it powers stars." D + T → ⁴He + n; Q from the mass defect. */
export const MASS_U = { D: 2.014102, T: 3.016049, He4: 4.002602, n: 1.008665 }
export const U_TO_MEV = 931.494
export function fusionQ(): number { return r2((MASS_U.D + MASS_U.T - MASS_U.He4 - MASS_U.n) * U_TO_MEV) }
export function buildFusionScene(): SceneSpec {
  const q = fusionQ()
  return {
    id: 'phys-fusion',
    title: 'Nuclear fusion',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show deuterium and tritium fusing into helium-4 and a neutron; the products have less mass, and the missing mass is released as energy, E = Δmc².',
    ariaLabel: 'A deuterium nucleus and a tritium nucleus are driven together. They fuse into a helium-4 nucleus and a free neutron, releasing about 17.6 MeV because the products have slightly less mass.',
    steps: [
      { narration: 'Two light nuclei, deuterium and tritium, are driven together at enormous temperature, overcoming their electric repulsion.', objects: [dot(P(-3.6, 0.8), ROLE.output, 0.32), label('D', P(-3.6, 1.6), ROLE.output, 'primary'), arrow(P(-3.2, 0.6), P(-1.2, 0.1), ROLE.output), dot(P(-3.6, -0.8), ROLE.input, 0.38), label('T', P(-3.6, -1.7), ROLE.input, 'primary'), arrow(P(-3.2, -0.6), P(-1.2, -0.1), ROLE.input)] },
      { narration: 'They fuse into helium-4 and a free neutron.', objects: [dot(P(0.6, 0.5), ROLE.aid, 0.45), label('⁴He', P(0.6, 1.4), ROLE.aid, 'primary'), dot(P(3.4, -1.2), ROLE.ink, 0.16), arrow(P(1.0, 0.1), P(3.1, -1.05), ROLE.ink), label('n', P(3.9, -1.2), ROLE.ink, 'primary')] },
      { narration: `The products have ${r2(MASS_U.D + MASS_U.T - MASS_U.He4 - MASS_U.n)} u less mass. That mass is released as energy: E = Δmc² ≈ ${q} MeV. This is what powers the Sun.`, objects: [label(`E = Δmc² = ${q} MeV`, P(1.8, 2.8), ROLE.result, 'primary')] },
    ],
  }
}

// ── 9. Compton effect ────────────────────────────────────────────────────────

/**
 * KG: "the increase in wavelength of X-rays scattered by electrons, confirming
 * the particle nature of photons." Scattered at θ = 60°: Δλ = (h/mₑc)(1 − cos θ)
 * = 2.43 pm × 0.5; the electron recoils along p_in − p_out (drawn wavelengths
 * exaggerated, momentum direction computed from them).
 */
export const COMPTON_THETA_DEG = 60
export const COMPTON_PM = 2.426
export function comptonShiftPm(thetaDeg: number): number { return r2(COMPTON_PM * (1 - Math.cos((thetaDeg * Math.PI) / 180))) }
export function buildComptonScene(): SceneSpec {
  const th = (COMPTON_THETA_DEG * Math.PI) / 180
  const L1 = 0.5, L2 = 0.75                   // drawn: exaggerated but longer after scattering
  const pin = [1 / L1, 0], pout = [Math.cos(th) / L2, Math.sin(th) / L2]
  const pe = [pin[0] - pout[0], pin[1] - pout[1]]
  const ae = Math.atan2(pe[1], pe[0])
  const E: V3 = P(0, 0)
  return {
    id: 'phys-compton',
    title: 'Compton scattering',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show an X-ray photon bouncing off an electron like a particle: the photon leaves with a longer wavelength (less energy) and the electron recoils, conserving momentum.',
    ariaLabel: 'An X-ray photon with a short wavelength travels right and hits an electron at rest. It scatters upward at 60 degrees with a longer wavelength, and the electron recoils downward to the right.',
    steps: [
      { narration: 'An X-ray photon of wavelength λ hits an electron at rest.', objects: [curve(packet(-4.6, 0, 4.2, L1, 0.35), ROLE.aid), label('photon: λ', P(-3.0, 0.9), ROLE.aid, 'primary'), dot(E, ROLE.output, 0.2), label('electron', P(0.2, -0.7), ROLE.output, 'detail')] },
      { narration: `The photon scatters at ${COMPTON_THETA_DEG}° with a LONGER wavelength λ′: it has given some of its energy and momentum to the electron.`, objects: [curve(packet(0.3 * Math.cos(th), 0.3 * Math.sin(th), 4.0, L2, 0.35, th), ROLE.input), label("λ′ > λ", P(2.6, 3.8), ROLE.input, 'primary'), line(P(0.3, 0), P(2.2, 0), ROLE.reference, 0.015), label(`${COMPTON_THETA_DEG}°`, P(1.0, 0.45), ROLE.reference, 'detail')] },
      { narration: `The electron recoils so that momentum is conserved. The shift is Δλ = (h/mₑc)(1 − cos θ) = ${comptonShiftPm(COMPTON_THETA_DEG)} pm here — explained only if light is made of particles.`, objects: [arrow(E, P(2.4 * Math.cos(ae), 2.4 * Math.sin(ae)), ROLE.output), label(`Δλ = ${comptonShiftPm(COMPTON_THETA_DEG)} pm`, P(-2.4, -2.6), ROLE.result, 'primary')] },
    ],
  }
}

// ── 10. Postulates of special relativity ─────────────────────────────────────

/** KG: "the laws of physics are the same in all inertial frames and the speed of light is constant." */
export function buildRelativityPostulatesScene(): SceneSpec {
  return {
    id: 'phys-rel-postulates',
    title: "Einstein's postulates",
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show the second postulate: a light pulse sent from a moving train is measured at the same speed c by a passenger and by someone on the platform — not c + v.',
    ariaLabel: 'A train moving right at speed v. A passenger sends a light pulse forward. The passenger measures its speed as c, and an observer on the platform also measures c, not c plus v.',
    steps: [
      { narration: 'A train moves at speed v past a platform.', objects: [...rect(-4.2, 0.2, 1.2, 2.2, ROLE.reference), arrow(P(-3.0, 2.8), P(-1.2, 2.8), ROLE.ink), label('train: v', P(-2.1, 3.3), ROLE.ink, 'primary'), line(P(-4.8, -0.2), P(4.8, -0.2), ROLE.reference, 0.06), dot(P(3.2, -1.2), ROLE.aid, 0.22), label('platform observer', P(3.2, -2.0), ROLE.aid, 'detail')] },
      { narration: 'A passenger sends a light pulse forward. The passenger measures its speed as c.', objects: [dot(P(-3.4, 1.1), ROLE.output, 0.2), arrow(P(-3.0, 1.1), P(0.8, 1.1), ROLE.input), label('c for the passenger', P(-1.2, 1.6), ROLE.input, 'detail')] },
      { narration: 'The platform observer measures the same speed, c — not c + v. The speed of light is the same in every inertial frame, and so are the laws of physics.', objects: [arrow(P(1.4, 1.1), P(4.6, 1.1), ROLE.result), label('c for the platform too', P(2.4, -3.0), ROLE.result, 'primary'), label('not c + v', P(3.0, 1.7), ROLE.result, 'detail')] },
    ],
  }
}

// ── 11. Time dilation ────────────────────────────────────────────────────────

/**
 * KG: "A moving clock runs slower than a stationary one; Δt = γΔτ." A light
 * clock at v = 0.6c: the light's diagonal path is γ = 1.25 times the rest path.
 */
export const DILATION_BETA = 0.6
export function lorentzGamma(beta: number): number { return 1 / Math.sqrt(1 - beta * beta) }
export function buildTimeDilationScene(): SceneSpec {
  const L = 2.4, g = lorentzGamma(DILATION_BETA)
  const shift = DILATION_BETA * g * L           // horizontal travel during one leg
  const B = -1.6, X = 0.2
  const clock = (x: number, color: string): SceneObject[] => [line(P(x - 0.4, B), P(x + 0.4, B), color, 0.08), line(P(x - 0.4, B + L), P(x + 0.4, B + L), color, 0.08)]
  return {
    id: 'phys-time-dilation',
    title: 'Time dilation: the light clock',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show a light clock at rest and moving at 0.6c: the moving clock\'s light travels a longer diagonal path at the same speed c, so each tick takes γ = 1.25 times longer.',
    ariaLabel: 'On the left, a light clock at rest: light bounces straight up and down between two mirrors. On the right, the same clock moving at 0.6c: the light follows a longer zig-zag path, so each tick takes 1.25 times as long.',
    steps: [
      { narration: 'A light clock at rest: a pulse bounces straight up and down between two mirrors. One trip up is one tick, Δτ.', objects: [...clock(-3.6, ROLE.reference), arrow(P(-3.6, B + 0.1), P(-3.6, B + L - 0.1), ROLE.input), label('at rest: Δτ', P(-3.6, B + L + 0.6), ROLE.ink, 'primary')] },
      { narration: `The same clock moving at ${DILATION_BETA}c. Seen from outside, the light follows a longer diagonal path — at the same speed c.`, objects: [...clock(X, ROLE.aid), ...clock(X + shift, ROLE.aid), ...clock(X + 2 * shift, ROLE.aid), arrow(P(X, B + 0.1), P(X + shift, B + L - 0.1), ROLE.input), arrow(P(X + shift, B + L - 0.1), P(X + 2 * shift, B + 0.1), ROLE.input), label(`moving: v = ${DILATION_BETA}c`, P(X + shift, B + L + 0.6), ROLE.aid, 'primary')] },
      { narration: `Longer path, same speed: each tick takes longer. The moving clock runs slow by γ = 1/√(1 − v²/c²) = ${r2(g)}.`, objects: [label(`Δt = γΔτ = ${r2(g)} Δτ`, P(0, -2.9), ROLE.result, 'primary')] },
    ],
  }
}

// ── 12. Length contraction ───────────────────────────────────────────────────

/** KG: "A moving object is measured to be shorter along the direction of motion by the factor 1/γ." At 0.8c, γ = 5/3, L = 0.6 L₀. */
export const CONTRACTION_BETA = 0.8
export function buildLengthContractionScene(): SceneSpec {
  const L0 = 5.0, g = lorentzGamma(CONTRACTION_BETA), Lm = r2(L0 / g)
  return {
    id: 'phys-length-contraction',
    title: 'Length contraction',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show a rod measured at rest (L₀) and moving at 0.8c: it is measured shorter along its motion, L = L₀/γ = 0.6 L₀, and unchanged across it.',
    ariaLabel: 'A rod at rest with its full length L-nought marked. Below, the same rod moving to the right at 0.8c is measured to be only 0.6 of that length; its height is unchanged.',
    steps: [
      { narration: 'A rod at rest has its proper length L₀.', objects: [...rect(-L0 / 2, 1.2, L0 / 2, 2.0, ROLE.output), line(P(-L0 / 2, 0.8), P(L0 / 2, 0.8), ROLE.aid, 0.03), label('at rest: L₀', P(0, 0.35), ROLE.output, 'primary')] },
      { narration: `Moving at ${CONTRACTION_BETA}c, the same rod is measured shorter along its motion — but no thinner.`, objects: [...rect(-L0 / 2, -1.6, -L0 / 2 + Lm, -0.8, ROLE.input), line(P(-L0 / 2, -2.0), P(-L0 / 2 + Lm, -2.0), ROLE.aid, 0.03), arrow(P(-L0 / 2 + Lm + 0.4, -1.2), P(-L0 / 2 + Lm + 1.8, -1.2), ROLE.input), label(`moving: v = ${CONTRACTION_BETA}c`, P(1.6, -0.3), ROLE.input, 'primary')] },
      { narration: `L = L₀/γ, with γ = ${r2(g)} at ${CONTRACTION_BETA}c, so L = ${r2(1 / g)} L₀. Nobody on the rod notices anything.`, objects: [label(`L = L₀/γ = ${r2(1 / g)} L₀`, P(-0.8, -2.6), ROLE.result, 'primary')] },
    ],
  }
}

// ── 13. Mass–energy equivalence ──────────────────────────────────────────────

/**
 * KG: "mass and energy are interconvertible, with rest mass representing
 * stored energy." Electron–positron annihilation: two 0.511 MeV photons
 * leave back-to-back (m_e c² from m_e = 9.109 × 10⁻³¹ kg).
 */
export const ME_KG = 9.109e-31, C_MS = 2.998e8, J_PER_MEV = 1.602e-13
export function restEnergyMev(): number { return Math.round((ME_KG * C_MS ** 2) / J_PER_MEV * 1000) / 1000 }
export function buildMassEnergyScene(): SceneSpec {
  const e = restEnergyMev()
  return {
    id: 'phys-mass-energy',
    title: 'Mass–energy equivalence',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show mass turning entirely into energy: an electron and a positron annihilate into two gamma photons, each carrying the electron\'s rest energy mc² = 0.511 MeV.',
    ariaLabel: 'An electron and a positron approach each other and annihilate. Their mass disappears and two gamma-ray photons fly off in opposite directions, each with 0.511 MeV, the rest energy of an electron.',
    steps: [
      { narration: 'An electron and its antiparticle, a positron, approach each other.', objects: [dot(P(-3.6, 0), ROLE.output, 0.22), label('e⁻', P(-3.6, 0.7), ROLE.output, 'primary'), arrow(P(-3.3, 0), P(-1.0, 0), ROLE.output), dot(P(3.6, 0), ROLE.input, 0.22), label('e⁺', P(3.6, 0.7), ROLE.input, 'primary'), arrow(P(3.3, 0), P(1.0, 0), ROLE.input)] },
      { narration: 'They annihilate: all their mass becomes energy, carried off by two gamma photons in opposite directions (so momentum is conserved).', objects: [curve(packet(0.2, 0.3, 3.4, 0.4, 0.22, Math.PI / 2), ROLE.aid), curve(packet(-0.2, -0.3, 3.4, 0.4, 0.22, -Math.PI / 2), ROLE.aid), label('γ', P(0.7, 3.6), ROLE.aid, 'primary'), label('γ', P(0.7, -3.6), ROLE.aid, 'primary')] },
      { narration: `Each photon carries the electron's rest energy, E = mc² = ${e} MeV. A tiny mass is a great deal of energy.`, objects: [label(`E = mc² = ${e} MeV`, P(-2.6, 2.4), ROLE.result, 'primary')] },
    ],
  }
}
