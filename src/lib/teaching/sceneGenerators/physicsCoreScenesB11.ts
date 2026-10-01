/**
 * Physics visual gap campaign, batch 11 (2026-09-30): special relativity
 * (remaining four), astrophysics, and three core quantum ideas. Same rules as
 * physicsCoreScenes.ts; every figure stays within the intermediate label budget.
 */

import type { SceneSpec, SceneObject } from '@/lib/teaching/sceneSpec'
import { ROLE, arrow, curve, dot, label, line } from './visualDesign'
import { P, r2, circlePoints, rect, fnPath, type V3 } from './physicsCoreScenes'

const gammaOf = (b: number) => 1 / Math.sqrt(1 - b * b)

// ── 1. Relativity of simultaneity ────────────────────────────────────────────

/**
 * KG: "Events that are simultaneous in one inertial frame may not be
 * simultaneous in another." A flash at the centre of a train (length 4, v =
 * 0.5c). Train frame: light reaches both ends together. Platform frame: the
 * rear moves toward the light and is reached first, t = (L/2)/(c + v), the
 * front later, t = (L/2)/(c − v). Arrow lengths are c·t (c = 1).
 */
export const SIM = { L: 4, beta: 0.5 }
export function platformTimes() { const h = SIM.L / 2; return { rear: r2(h / (1 + SIM.beta)), front: r2(h / (1 - SIM.beta)) } }
export function buildSimultaneityScene(): SceneSpec {
  const h = SIM.L / 2, TY = 2.2, PY = -1.6, X0 = -1.4
  const t = platformTimes()
  return {
    id: 'phys-simultaneity',
    title: 'Relativity of simultaneity',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show a flash at the middle of a moving train: in the train\'s frame the light reaches both ends at the same moment; in the platform\'s frame the rear, rushing toward the light, is reached first.',
    ariaLabel: 'Top: in the train\'s frame, light from a central flash travels equal distances to the front and rear and arrives at both at once. Bottom: in the platform frame the train moves right at half the speed of light; the backward light meets the rear after a short trip, while the forward light must chase the front and arrives three times later.',
    steps: [
      { narration: 'A flash goes off at the exact middle of a train. In the train\'s own frame the light travels the same distance each way and reaches both ends at the same moment.', objects: [...rect(-h, TY - 0.4, h, TY + 0.4, ROLE.reference), dot(P(0, TY), ROLE.result, 0.14), arrow(P(0, TY), P(-h + 0.05, TY), ROLE.input), arrow(P(0, TY), P(h - 0.05, TY), ROLE.input), label('train frame: both ends at once', P(0, TY + 1.0), ROLE.ink, 'primary')] },
      { narration: `Seen from the platform the train moves at ${SIM.beta}c. Light still travels at c both ways, but the rear moves toward it and the front moves away.`, objects: [...rect(X0 - h, PY - 0.4, X0 + h, PY + 0.4, ROLE.reference), dot(P(X0, PY), ROLE.result, 0.14), arrow(P(X0 - h - 0.2, PY - 1.0), P(X0 - h + 1.3, PY - 1.0), ROLE.ink), label(`train: v = ${SIM.beta}c`, P(X0 - h + 0.6, PY - 1.45), ROLE.ink, 'detail')] },
      { narration: `The backward light meets the rear after ${t.rear} time units; the forward light needs ${t.front}. On the platform the two arrivals are NOT simultaneous.`, objects: [arrow(P(X0, PY), P(X0 - t.rear, PY), ROLE.input), arrow(P(X0, PY + 0.15), P(X0 + t.front, PY + 0.15), ROLE.output),
        // Where each END has moved to when its light arrives (the train is drawn at t = 0).
        line(P(X0 - h + SIM.beta * t.rear, PY - 0.6), P(X0 - h + SIM.beta * t.rear, PY + 0.6), ROLE.input, 0.04), line(P(X0 + h + SIM.beta * t.front, PY - 0.6), P(X0 + h + SIM.beta * t.front, PY + 0.6), ROLE.output, 0.04), label(`rear first: t = ${t.rear}`, P(X0 - 1.6, PY + 0.9), ROLE.input, 'detail'), label(`front later: t = ${t.front}`, P(X0 + t.front - 1.2, PY + 0.9), ROLE.output, 'detail'), label('platform: not simultaneous', P(0, -3.8), ROLE.result, 'primary')] },
    ],
  }
}

// ── 2. Lorentz transformation ────────────────────────────────────────────────

/**
 * KG: "relate spacetime coordinates of events measured in two inertial frames
 * in relative motion." Spacetime diagram (x, ct) with the moving frame's axes
 * for β = 0.5: ct′ along x = βct, x′ along ct = βx. One event, both sets of
 * coordinates: x′ = γ(x − βct), ct′ = γ(ct − βx).
 */
export const LT = { beta: 0.5, x: 3, ct: 2 }
export function lorentz(x: number, ct: number, beta = LT.beta) { const g = gammaOf(beta); return { x: r2(g * (x - beta * ct)), ct: r2(g * (ct - beta * x)) } }
export function buildLorentzScene(): SceneSpec {
  const O: V3 = P(-3.2, -3.0), S = 1.3
  const at = (x: number, ct: number): V3 => P(O[0] + x * S, O[1] + ct * S)
  const e = lorentz(LT.x, LT.ct)
  return {
    id: 'phys-lorentz',
    title: 'The Lorentz transformation',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show one event on a spacetime diagram with two sets of axes — at rest (x, ct) and moving at 0.5c (x′, ct′, tilted toward the light line) — and its coordinates in each, related by the Lorentz transformation.',
    ariaLabel: 'A spacetime diagram. Horizontal x and vertical ct axes for the rest frame; a 45-degree light line; and the moving frame\'s axes, ct-prime and x-prime, tilted toward the light line. One event is marked at x = 3, ct = 2 in the rest frame, which is x-prime = 2.31, ct-prime = 0.58 in the moving frame.',
    steps: [
      { narration: 'A spacetime diagram: position x across, time (as ct) up. A light pulse travels along the 45° line.', objects: [arrow(O, at(4.8 / S + 1.6, 0), ROLE.reference), arrow(O, at(0, 5.2 / S + 1.4), ROLE.reference), label('x', P(4.6, O[1] - 0.4), ROLE.ink, 'primary'), label('ct', P(O[0] - 0.4, 4.4), ROLE.ink, 'primary'), line(O, at(5.4, 5.4), ROLE.result, 0.02), label('light', at(5.0, 5.4), ROLE.result, 'detail')] },
      { narration: `A frame moving at ${LT.beta}c has tilted axes: its time axis ct′ leans toward the light line (x = βct), and its space axis x′ lifts toward it (ct = βx).`, objects: [arrow(O, at(LT.beta * 5.4, 5.4), ROLE.aid), arrow(O, at(5.4, LT.beta * 5.4), ROLE.aid), label('ct′', at(LT.beta * 5.4 + 0.3, 5.6), ROLE.aid, 'primary'), label('x′', at(5.7, LT.beta * 5.4), ROLE.aid, 'primary')] },
      { narration: `One event, two descriptions: x = ${LT.x}, ct = ${LT.ct} at rest, but x′ = γ(x − βct) = ${e.x} and ct′ = γ(ct − βx) = ${e.ct} in the moving frame (γ = ${r2(gammaOf(LT.beta))}).`, objects: [dot(at(LT.x, LT.ct), ROLE.input, 0.14), line(at(LT.x, 0), at(LT.x, LT.ct), ROLE.reference, 0.015), line(at(0, LT.ct), at(LT.x, LT.ct), ROLE.reference, 0.015), label(`event: x′ = ${e.x}, ct′ = ${e.ct}`, P(at(LT.x, LT.ct)[0] + 0.2, at(LT.x, LT.ct)[1] + 0.55), ROLE.input, 'detail'), label('x′ = γ(x − vt)', P(2.4, -3.8), ROLE.result, 'primary')] },
    ],
  }
}

// ── 3. Relativistic momentum ─────────────────────────────────────────────────

/** KG: "Relativistic momentum is p = γmv." Against v/c: p = mv (classical) and p = γmv, which runs away as v → c. */
export function relMomentum(beta: number): number { return beta * gammaOf(beta) }
export function buildRelativisticMomentumScene(): SceneSpec {
  const X0 = -3.6, Y0 = -2.6, SX = 7.0, SY = 1.6, BMAX = 0.975
  const x = (b: number) => X0 + b * SX
  return {
    id: 'phys-relativistic-momentum',
    title: 'Relativistic momentum',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show momentum against speed: the classical p = mv is a straight line, but the true p = γmv grows without limit as v approaches c — which is why nothing with mass can reach light speed.',
    ariaLabel: 'A graph of momentum against speed as a fraction of the speed of light. The classical straight line p = mv and the relativistic curve p = gamma m v agree at low speeds, but the relativistic curve bends sharply upward and shoots off toward infinity as the speed approaches c.',
    steps: [
      { narration: 'Momentum against speed, as a fraction of the speed of light.', objects: [arrow(P(X0, Y0), P(x(1) + 0.4, Y0), ROLE.reference), arrow(P(X0, Y0), P(X0, 4.4), ROLE.reference), label('v / c', P(x(1) + 0.2, Y0 - 0.5), ROLE.ink, 'detail'), label('momentum p / mc', P(X0 + 1.3, 4.6), ROLE.ink, 'detail'), line(P(x(1), Y0), P(x(1), 4.2), ROLE.reference, 0.02), label('c', P(x(1), Y0 - 0.5), ROLE.ink, 'primary')] },
      { narration: 'Newton\'s p = mv is a straight line — at low speed it is almost exactly right.', objects: [line(P(X0, Y0), P(x(1), Y0 + SY), ROLE.output, 0.05), label('p = mv', P(x(1) - 0.9, Y0 + SY - 0.4), ROLE.output, 'primary')] },
      { narration: `The true momentum is p = γmv. It agrees at low speed but grows without limit near c: at 0.9c it is already ${r2(relMomentum(0.9) / 0.9)}× the classical value.`, objects: [curve(fnPath((xx) => Y0 + SY * relMomentum((xx - X0) / SX), X0, x(BMAX), 120), ROLE.input), label('p = γmv', P(x(0.8) - 0.6, Y0 + SY * relMomentum(0.9)), ROLE.input, 'primary'), label(`at 0.9c: γ = ${r2(gammaOf(0.9))}`, P(-0.6, 3.4), ROLE.result, 'primary')] },
    ],
  }
}

// ── 4. Spacetime and the invariant interval ──────────────────────────────────

/**
 * KG: "The spacetime interval s² = c²t² − x² is invariant under Lorentz
 * transformations." The light cone divides spacetime; one pair of events has
 * s² = 4² − 2² = 12 in both frames (β = 0.5: ct′ = 3.46, x′ = 0).
 */
export const SPACETIME_EVENT = { x: 2, ct: 4 }
export function interval(x: number, ct: number): number { return r2(ct * ct - x * x) }
export function buildSpacetimeScene(): SceneSpec {
  const S = 0.85
  const e = SPACETIME_EVENT
  const g = gammaOf(0.5), xp = r2(g * (e.x - 0.5 * e.ct)), ctp = r2(g * (e.ct - 0.5 * e.x))
  return {
    id: 'phys-spacetime',
    title: 'Spacetime and the light cone',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show the light cone of an event — future, past and "elsewhere" — and the spacetime interval s² = c²t² − x², which every inertial observer measures the same.',
    ariaLabel: 'A light cone drawn as two 45-degree lines crossing at an event at the origin. Above is the future, below the past, and to the sides the elsewhere region no signal can reach. A second event inside the future cone has interval s squared = 12, the same value in the moving frame where its coordinates differ.',
    steps: [
      { narration: 'Light from an event spreads at c, tracing the 45° lines of its light cone.', objects: [line(P(-4.4, -4.4 * S), P(4.4, 4.4 * S), ROLE.result, 0.03), line(P(-4.4, 4.4 * S), P(4.4, -4.4 * S), ROLE.result, 0.03), dot(P(0, 0), ROLE.ink, 0.12), label('ct', P(0.35, 4.3), ROLE.ink, 'detail'), label('x', P(4.6, -0.35), ROLE.ink, 'detail'), line(P(0, -4.2), P(0, 4.2), ROLE.reference, 0.015), line(P(-4.6, 0), P(4.6, 0), ROLE.reference, 0.015)] },
      { narration: 'Inside the upper cone is the future this event can influence; the lower cone is its past. Outside ("elsewhere") nothing can travel between them.', objects: [label('future', P(0, 3.0), ROLE.output, 'primary'), label('past', P(0, -3.0), ROLE.output, 'primary'), label('elsewhere', P(3.6, 0.9), ROLE.aid, 'detail')] },
      { narration: `A second event at x = ${e.x}, ct = ${e.ct} has interval s² = c²t² − x² = ${interval(e.x, e.ct)}. A frame moving at 0.5c gives it x′ = ${xp}, ct′ = ${ctp} — and the same s² = ${interval(xp, ctp)}.`, objects: [dot(P(e.x * S, e.ct * S), ROLE.input, 0.14), line(P(0, 0), P(e.x * S, e.ct * S), ROLE.input, 0.025), label(`s² = c²t² − x² = ${interval(e.x, e.ct)}`, P(-2.6, 2.0), ROLE.result, 'primary')] },
    ],
  }
}

// ── 5. Stellar structure ─────────────────────────────────────────────────────

/** KG: "self-gravitating plasma balls in hydrostatic equilibrium whose energy source is core nuclear fusion." A Sun-like star in section. */
export function buildStellarStructureScene(): SceneSpec {
  const R = 3.4, rc = 0.25 * R, rr = 0.7 * R
  const shellP: V3 = P(0.5 * R * Math.cos(0.6), 0.5 * R * Math.sin(0.6))
  const u = [Math.cos(0.6), Math.sin(0.6)]
  return {
    id: 'phys-stellar-structure',
    title: 'Inside a star',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show a Sun-like star in cross-section: fusion in the core, energy carried out by radiation then convection, and every layer held in hydrostatic equilibrium — pressure pushing out balances gravity pulling in.',
    ariaLabel: 'A cross-section of a Sun-like star. A small core at the centre where fusion happens, a radiative zone around it, and an outer convective zone. At one layer two equal and opposite arrows show outward pressure balancing inward gravity.',
    steps: [
      { narration: 'A star in cross-section: a hot, dense core where hydrogen fuses into helium.', objects: [curve(circlePoints(0, 0, R, 0, 2 * Math.PI, 72), ROLE.input), curve(circlePoints(0, 0, rc, 0, 2 * Math.PI, 36), ROLE.result), label('core: fusion', P(0, -0.2), ROLE.result, 'primary')] },
      { narration: 'Energy leaves the core as radiation through the radiative zone, then is carried by rising and sinking gas in the convective zone.', objects: [curve(circlePoints(0, 0, rr, 0, 2 * Math.PI, 60), ROLE.aid), label('radiative zone', P(-1.2, 1.2), ROLE.aid, 'detail'), label('convective zone', P(-2.0, -2.5), ROLE.input, 'detail')] },
      { narration: 'At every layer, outward gas pressure exactly balances the inward pull of gravity: hydrostatic equilibrium. That balance sets the star\'s size.', objects: [arrow(shellP, P(shellP[0] + 1.1 * u[0], shellP[1] + 1.1 * u[1]), ROLE.output), arrow(shellP, P(shellP[0] - 1.1 * u[0], shellP[1] - 1.1 * u[1]), ROLE.reference), label('pressure out = gravity in', P(2.0, 3.9), ROLE.result, 'primary')] },
    ],
  }
}

// ── 6. Stellar evolution ─────────────────────────────────────────────────────

/** KG: "Stars evolve from the main sequence through red giant, and end as white dwarfs, neutron stars, or black holes depending on their mass." */
export const STELLAR_ENDS: Array<{ mass: string; end: string }> = [
  { mass: '< 8 M☉', end: 'white dwarf' }, { mass: '8–20 M☉', end: 'neutron star' }, { mass: '> 20 M☉', end: 'black hole' },
]
export function buildStellarEvolutionScene(): SceneSpec {
  const neb: V3 = P(-3.8, 2.4), ms: V3 = P(-1.2, 2.4), rg: V3 = P(1.6, 2.4)
  const ends: V3[] = [P(-2.8, -2.2), P(0.4, -2.2), P(3.4, -2.2)]
  return {
    id: 'phys-stellar-evolution',
    title: 'The life of a star',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show a star\'s life path: nebula, main sequence, red giant — then an end set by its mass: a white dwarf, a neutron star, or a black hole.',
    ariaLabel: 'A flow chart. A gas nebula collapses into a main-sequence star, which swells into a red giant. From there three arrows lead to the possible ends by mass: below 8 solar masses a white dwarf; 8 to 20 solar masses a supernova leaving a neutron star; above 20 solar masses a black hole.',
    steps: [
      { narration: 'A cloud of gas (a nebula) collapses into a star, which spends most of its life on the main sequence, fusing hydrogen.', objects: [dot(neb, ROLE.reference, 0.4), label('nebula', P(neb[0], neb[1] + 0.8), ROLE.ink, 'detail'), arrow(P(neb[0] + 0.5, neb[1]), P(ms[0] - 0.5, ms[1]), ROLE.ink), dot(ms, ROLE.output, 0.3), label('main sequence', P(ms[0], ms[1] + 0.8), ROLE.output, 'detail')] },
      { narration: 'When the core hydrogen runs out, the star swells into a red giant.', objects: [arrow(P(ms[0] + 0.4, ms[1]), P(rg[0] - 0.8, rg[1]), ROLE.ink), dot(rg, ROLE.input, 0.6), label('red giant', P(rg[0], rg[1] + 1.0), ROLE.input, 'detail')] },
      { narration: 'Its end depends on its mass: small stars leave a white dwarf; bigger ones explode as supernovae, leaving a neutron star or, for the heaviest, a black hole.', objects: [...ends.map((e) => arrow(P(rg[0], rg[1] - 0.7), P(e[0], e[1] + 0.5), ROLE.aid)), ...STELLAR_ENDS.map((s, i) => label(`${s.mass}: ${s.end}`, P(ends[i][0], ends[i][1] - 0.2), i === 2 ? ROLE.result : ROLE.ink, 'detail'))] },
    ],
  }
}

// ── 7. Cosmology: the expanding universe ─────────────────────────────────────

/**
 * KG: "the origin and evolution of the universe from a hot, dense initial
 * state through expansion." Hubble's law v = H₀d with H₀ = 70 km/s/Mpc; the
 * expansion age ≈ 1/H₀ = 977.8/70 Gyr ≈ 14 Gyr.
 */
export const H0 = 70
export const GALAXIES = [[40, 2900], [95, 6500], [150, 10800], [210, 14300], [270, 19200], [330, 22800]] // (Mpc, km/s), scattered about v = H₀d
export function hubbleTimeGyr(): number { return r2(977.8 / H0) }
export function buildCosmologyScene(): SceneSpec {
  const X0 = -3.8, Y0 = -2.6, SX = 7.6 / 360, SY = 6.0 / 26000
  const x = (d: number) => X0 + d * SX, y = (v: number) => Y0 + v * SY
  return {
    id: 'phys-cosmology',
    title: 'The expanding universe',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show Hubble\'s law: distant galaxies recede faster in proportion to distance, v = H₀d — the universe is expanding, and running it backward gives an age of about 14 billion years.',
    ariaLabel: 'A graph of galaxies\' recession speed against distance. The points lie close to a straight line through the origin with slope H-nought, 70 kilometres per second per megaparsec. The reciprocal of that slope, about 14 billion years, is roughly the age of the universe.',
    steps: [
      { narration: 'Each dot is a galaxy: how far away it is, and how fast it is moving away from us.', objects: [arrow(P(X0, Y0), P(x(360) + 0.2, Y0), ROLE.reference), arrow(P(X0, Y0), P(X0, y(26000) + 0.3), ROLE.reference), label('distance (Mpc)', P(2.6, Y0 - 0.5), ROLE.ink, 'detail'), label('recession speed (km/s)', P(X0 + 1.8, y(26000) + 0.6), ROLE.ink, 'detail'), ...GALAXIES.map(([d, v]) => dot(P(x(d), y(v)), ROLE.output, 0.12))] },
      { narration: `They lie on a straight line: v = H₀d, with H₀ ≈ ${H0} km/s per megaparsec. The farther the galaxy, the faster it recedes — space itself is expanding.`, objects: [line(P(X0, Y0), P(x(350), y(H0 * 350)), ROLE.input, 0.04), label(`v = H₀d, H₀ = ${H0} km/s/Mpc`, P(-0.4, 2.8), ROLE.input, 'primary')] },
      { narration: `Run the expansion backward and everything meets at one time: about 1/H₀ ≈ ${hubbleTimeGyr()} billion years ago — the Big Bang.`, objects: [label(`age ≈ 1/H₀ ≈ ${hubbleTimeGyr()} Gyr`, P(1.8, -1.6), ROLE.result, 'primary')] },
    ],
  }
}

// ── 8. Dark matter: galaxy rotation curves ───────────────────────────────────

/**
 * KG: "inferred from gravitational and cosmological observations." Orbital
 * speed against radius: with only the visible mass (concentrated centrally)
 * v falls as 1/√r beyond it; observed curves stay flat — extra unseen mass.
 */
export function visibleOnlySpeed(r: number): number { const Rc = 1.0; return r < Rc ? r / Rc : 1 / Math.sqrt(r / Rc) }
export function observedSpeed(r: number): number { return Math.min(1, 1 - Math.exp(-2.2 * r)) * 1.0 }
export function buildDarkMatterScene(): SceneSpec {
  const X0 = -3.8, Y0 = -2.4, SX = 1.4, SY = 3.6
  return {
    id: 'phys-dark-matter',
    title: 'Dark matter and rotation curves',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show a galaxy\'s rotation curve: with only its visible mass, stars far out should orbit more slowly (v ∝ 1/√r), but measured speeds stay flat — evidence for unseen dark matter.',
    ariaLabel: 'A graph of orbital speed against distance from a galaxy\'s centre. The dashed prediction from visible matter rises then falls off with distance. The measured curve rises and then stays flat far out. The gap between them is attributed to dark matter.',
    steps: [
      { narration: 'Orbital speed of stars against their distance from a galaxy\'s centre.', objects: [arrow(P(X0, Y0), P(X0 + 5.8 * SX - 0.2, Y0), ROLE.reference), arrow(P(X0, Y0), P(X0, Y0 + SY + 0.8), ROLE.reference), label('distance from centre', P(2.2, Y0 - 0.5), ROLE.ink, 'detail'), label('orbital speed', P(X0 + 1.0, Y0 + SY + 1.1), ROLE.ink, 'detail')] },
      { narration: 'If the visible stars and gas were all the mass, speeds far out should fall as 1/√r, like the planets round the Sun.', objects: [curve(fnPath((xx) => Y0 + SY * visibleOnlySpeed((xx - X0) / SX), X0, X0 + 5.8 * SX - 0.4, 100), ROLE.output), label('expected from visible mass', P(2.6, Y0 + SY * visibleOnlySpeed(4.8) - 0.5), ROLE.output, 'detail')] },
      { narration: 'Measured speeds stay flat instead. Something unseen must add gravity far out: dark matter, about five times as much as ordinary matter.', objects: [curve(fnPath((xx) => Y0 + SY * observedSpeed((xx - X0) / SX), X0, X0 + 5.8 * SX - 0.4, 100), ROLE.input), label('observed: flat', P(2.6, Y0 + SY + 0.4), ROLE.input, 'primary'), label('gap = dark matter', P(1.4, Y0 + 2.0), ROLE.result, 'primary')] },
    ],
  }
}

// ── 9. Black holes ───────────────────────────────────────────────────────────

/** KG: "nothing, not even light, can escape from within the Schwarzschild radius." r_s = 2GM/c²; for the Sun 2.95 km. */
export const G = 6.674e-11, C = 2.998e8, M_SUN = 1.989e30
export function schwarzschildKm(massKg: number): number { return r2((2 * G * massKg) / (C * C) / 1000) }
export function buildBlackHoleScene(): SceneSpec {
  const RS = 1.1
  // Deflected, not dipped: level on the way in, leaving at a new downward slope
  // (a symmetric dip back to the same line — the first draft — is no deflection).
  const bent = fnPath((x) => 2.6 - 0.35 * (x + Math.sqrt(x * x + 1)) / 2, -4.6, 4.6, 80)
  const fall = fnPath((x) => 0.9 * Math.max(0, (-x - RS) / 3.6) ** 1.2, -4.6, -RS, 40)
  return {
    id: 'phys-black-hole',
    title: 'A black hole',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show a black hole\'s event horizon at the Schwarzschild radius r_s = 2GM/c²: light passing at a distance is bent, light aimed too close falls in, and nothing inside can escape.',
    ariaLabel: 'A black disc marks the event horizon. A light ray passing well above it is bent downward toward it but escapes. A ray aimed closer curves in and crosses the horizon, never to return. The Schwarzschild radius for the mass of the Sun would be only about 3 kilometres.',
    steps: [
      { narration: 'A black hole: at the event horizon, radius r_s = 2GM/c², the escape speed reaches the speed of light.', objects: [curve(circlePoints(0, 0, RS, 0, 2 * Math.PI, 48), ROLE.ink), dot(P(0, 0), ROLE.reference, RS * 0.9), label('event horizon', P(0, -1.7), ROLE.ink, 'primary')] },
      { narration: 'Light passing at a distance is bent by the curved spacetime but escapes. Light aimed too close falls in and never comes out.', objects: [curve(bent, ROLE.output), label('light deflected', P(3.2, 2.6), ROLE.output, 'detail'), curve(fall, ROLE.input), label('captured', P(-3.6, 0.9), ROLE.input, 'detail')] },
      { narration: `Squeeze the Sun's mass inside r_s and it would be a black hole: r_s = 2GM/c² = ${schwarzschildKm(M_SUN)} km.`, objects: [label(`Sun: r_s = 2GM/c² = ${schwarzschildKm(M_SUN)} km`, P(0, -3.4), ROLE.result, 'primary')] },
    ],
  }
}

// ── 10. The uncertainty principle ────────────────────────────────────────────

/**
 * KG: "Δx·Δp ≥ ℏ/2." Two Gaussian wave packets at the limit (ℏ = 1): a narrow
 * one (σx = 0.5, σp = 1) and a wide one (σx = 1, σp = 0.5); their position and
 * momentum distributions drawn side by side. σx·σp = ½ for both.
 */
export const PACKETS = [{ sx: 0.5 }, { sx: 1.0 }]
export const sigmaP = (sx: number) => 0.5 / sx
export function buildUncertaintyScene(): SceneSpec {
  const gauss = (s: number, cx: number, y0: number, H: number) => fnPath((x) => y0 + H * Math.exp(-((x - cx) ** 2) / (2 * (s * 1.2) ** 2)), cx - 2.1, cx + 2.1, 80)
  const LX = -2.4, RX = 2.4, Y1 = 1.0, Y2 = -2.6
  return {
    id: 'phys-uncertainty',
    title: 'The uncertainty principle',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show that squeezing a particle\'s position spread widens its momentum spread and vice versa: Δx·Δp ≥ ℏ/2.',
    ariaLabel: 'Two rows. In the top row a narrow position distribution on the left goes with a wide momentum distribution on the right. In the bottom row a wide position distribution goes with a narrow momentum distribution. In both, the product of the widths is the same minimum, h-bar over two.',
    steps: [
      { narration: 'A particle confined to a small region: its position distribution is narrow…', objects: [line(P(LX - 2.2, Y1), P(LX + 2.2, Y1), ROLE.reference, 0.015), curve(gauss(PACKETS[0].sx, LX, Y1, 2.2), ROLE.output), label('position: narrow', P(LX, Y1 + 2.6), ROLE.output, 'detail'), line(P(LX - 2.2, Y2), P(LX + 2.2, Y2), ROLE.reference, 0.015), curve(gauss(PACKETS[1].sx, LX, Y2, 2.2), ROLE.output), label('position: wide', P(LX, Y2 + 2.6), ROLE.output, 'detail')] },
      { narration: '…so its momentum distribution is wide. Spread it out in position, and its momentum becomes sharp.', objects: [line(P(RX - 2.2, Y1), P(RX + 2.2, Y1), ROLE.reference, 0.015), curve(gauss(sigmaP(PACKETS[0].sx), RX, Y1, 2.2), ROLE.input), label('momentum: wide', P(RX, Y1 + 2.6), ROLE.input, 'detail'), line(P(RX - 2.2, Y2), P(RX + 2.2, Y2), ROLE.reference, 0.015), curve(gauss(sigmaP(PACKETS[1].sx), RX, Y2, 2.2), ROLE.input), label('momentum: narrow', P(RX, Y2 + 2.6), ROLE.input, 'detail')] },
      { narration: 'The product of the two spreads can never go below ℏ/2: it is a property of waves, not of clumsy measurement.', objects: [label('Δx·Δp ≥ ℏ/2', P(0, 4.2), ROLE.result, 'primary')] },
    ],
  }
}

// ── 11. The quantum harmonic oscillator ──────────────────────────────────────

/**
 * KG: "equally spaced energy levels En = (n+½)ℏω." Levels inside the parabola
 * V = ½mω²x² (units ℏ = m = ω = 1: E_n = n + ½, turning points ±√(2E_n)); the
 * n = 0 and n = 1 wavefunctions drawn on their levels.
 */
export function qhoEnergy(n: number): number { return n + 0.5 }
export function buildQuantumOscillatorScene(): SceneSpec {
  const SX = 1.3, SY = 1.0, Y0 = -3.6
  const X = (q: number) => q * SX, Y = (e: number) => Y0 + e * SY
  const levels: SceneObject[] = []
  for (let n = 0; n <= 4; n++) { const e = qhoEnergy(n), t = Math.sqrt(2 * e); levels.push(line(P(X(-t), Y(e)), P(X(t), Y(e)), ROLE.output, 0.03)) }
  const psi0 = (q: number) => Math.exp(-q * q / 2), psi1 = (q: number) => Math.SQRT2 * q * Math.exp(-q * q / 2)
  return {
    id: 'phys-quantum-oscillator',
    title: 'The quantum harmonic oscillator',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show a quantum oscillator\'s energy levels inside its parabolic potential: equally spaced by ℏω, starting not at zero but at the zero-point energy ½ℏω.',
    ariaLabel: 'A parabola, the potential energy of a spring. Inside it, horizontal lines mark the allowed energies, evenly spaced. The lowest is half a quantum above the bottom, not at zero. The ground-state wavefunction is a single hump on the lowest line; the next is one up and one down lobe.',
    steps: [
      { narration: 'The potential energy of a quantum spring: a parabola, V = ½mω²x².', objects: [curve(fnPath((x) => Y(0.5 * (x / SX) ** 2), X(-3.4), X(3.4), 100), ROLE.reference), label('V = ½mω²x²', P(3.0, 2.4), ROLE.ink, 'detail')] },
      { narration: 'Only certain energies are allowed, equally spaced by ℏω: E_n = (n + ½)ℏω.', objects: [...levels, label('ΔE = ħω', P(3.2, Y(2.0)), ROLE.output, 'primary'), label('E_n = (n + ½)ħω', P(-2.8, 3.6), ROLE.result, 'primary')] },
      { narration: 'The lowest energy is ½ℏω, never zero: even at rest the oscillator jiggles (zero-point energy). The wavefunctions show where it is likely to be found.', objects: [curve(fnPath((x) => Y(qhoEnergy(0)) + 0.7 * psi0(x / SX), X(-2.6), X(2.6), 60), ROLE.input), curve(fnPath((x) => Y(qhoEnergy(1)) + 0.7 * psi1(x / SX), X(-3.0), X(3.0), 60), ROLE.input), label('E₀ = ½ħω', P(3.0, Y(0.5)), ROLE.input, 'primary')] },
    ],
  }
}

// ── 12. The Pauli exclusion principle ────────────────────────────────────────

/**
 * KG: "no two identical fermions can occupy the same quantum state." Lithium's
 * three electrons: 1s holds two (spin up and down), the third must go to 2s;
 * a third 1s electron would duplicate a state.
 */
export const SHELL_CAPACITY = { '1s': 2, '2s': 2 }
export function buildPauliScene(): SceneSpec {
  const L1 = -2.0, L2 = 1.2, X = -1.4
  const spin = (x: number, y: number, up: boolean, color: string) => arrow(P(x, y + (up ? -0.55 : 0.55)), P(x, y + (up ? 0.55 : -0.55)), color)
  return {
    id: 'phys-pauli',
    title: 'The Pauli exclusion principle',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show that no two electrons (fermions) can share a quantum state: the 1s level takes two with opposite spins, so lithium\'s third electron must go to 2s.',
    ariaLabel: 'Two energy levels, 1s below and 2s above. The 1s level holds two electrons, one spin up and one spin down. Lithium\'s third electron sits in the 2s level. A third electron drawn in the 1s level is crossed out: it would duplicate a state already taken.',
    steps: [
      { narration: 'Energy levels in an atom. Each electron has a spin, up or down.', objects: [line(P(X - 1.2, L1), P(X + 1.2, L1), ROLE.reference, 0.05), label('1s', P(X - 1.8, L1), ROLE.ink, 'primary'), line(P(X - 1.2, L2), P(X + 1.2, L2), ROLE.reference, 0.05), label('2s', P(X - 1.8, L2), ROLE.ink, 'primary')] },
      { narration: `Lithium has three electrons. The 1s level takes ${SHELL_CAPACITY['1s']}, with opposite spins; the third must go up to 2s.`, objects: [spin(X - 0.35, L1, true, ROLE.output), spin(X + 0.35, L1, false, ROLE.output), spin(X, L2, true, ROLE.output), label('1s: one up, one down', P(2.2, L1), ROLE.output, 'detail'), label('third electron → 2s', P(2.2, L2), ROLE.output, 'detail')] },
      { narration: 'A third electron in 1s would have the same state as one already there — forbidden. This rule builds the whole periodic table.', objects: [spin(X + 1.9, L1 - 1.4, true, ROLE.input), line(P(X + 1.5, L1 - 1.8), P(X + 2.3, L1 - 1.0), ROLE.input, 0.05), line(P(X + 1.5, L1 - 1.0), P(X + 2.3, L1 - 1.8), ROLE.input, 0.05), label('third 1s electron: forbidden', P(2.6, L1 - 1.4), ROLE.input, 'detail'), label('no two fermions share a state', P(0, 3.4), ROLE.result, 'primary')] },
    ],
  }
}
