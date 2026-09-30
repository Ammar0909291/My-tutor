/**
 * Physics visual gap campaign, batch 4 (2026-09-30): electromagnetism, AC,
 * modern physics and wave optics. Same rules as physicsCoreScenes.ts: one
 * visual language, labels are names, steps are cumulative, coordinates inside
 * ±5, and every number drawn is computed from the physics. Each figure draws
 * what its concept's own KG description defines (quoted in its doc comment).
 */

import type { SceneSpec, SceneObject } from '@/lib/teaching/sceneSpec'
import { ROLE, arrow, curve, dot, hatch, label, line } from './visualDesign'
import { P, r2, circlePoints, rect, fnPath, type V3 } from './physicsCoreScenes'

// ── 1. Electric potential ────────────────────────────────────────────────────

/**
 * KG: "the work done per unit charge to bring a positive test charge from
 * infinity to a given point." Equipotential circles around +Q at r = 1…4 with
 * V = kQ/r (kQ = 12 V·m → 12, 6, 4, 3 V), field lines crossing them at right angles.
 */
export const POTENTIAL_KQ = 12
export function buildElectricPotentialScene(): SceneSpec {
  const radii = [1, 2, 3, 4]
  const rings: SceneObject[] = []
  for (const r of radii) {
    rings.push(curve(circlePoints(0, 0, r, 0, 2 * Math.PI, 48), ROLE.aid))
    rings.push(label(`${r2(POTENTIAL_KQ / r)} V`, P(r * Math.cos(Math.PI / 4) + 0.35, r * Math.sin(Math.PI / 4) + 0.2), ROLE.aid, 'detail'))
  }
  const field: SceneObject[] = []
  for (let i = 0; i < 8; i++) {
    const a = Math.PI / 8 + (i * Math.PI) / 4
    field.push(arrow(P(0.45 * Math.cos(a), 0.45 * Math.sin(a)), P(4.3 * Math.cos(a), 4.3 * Math.sin(a)), ROLE.input))
  }
  return {
    id: 'phys-electric-potential',
    title: 'Electric potential around a point charge',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show equipotential circles around a positive charge, V = kQ/r falling with distance, and field lines crossing every equipotential at right angles.',
    ariaLabel: 'A positive charge at the centre surrounded by four circles of equal potential, labelled 12, 6, 4 and 3 volts from the inside out. Field lines point straight outward, crossing every circle at right angles.',
    steps: [
      { narration: 'A positive charge. Every point around it has an electric potential: the work per unit charge to bring a positive test charge there from infinity.', objects: [dot(P(0, 0), ROLE.input, 0.32), label('+Q', P(-0.75, -0.55), ROLE.input, 'primary')] },
      { narration: 'Points at the same distance have the same potential, so equipotentials are circles. V = kQ/r: twice as far, half the potential.', objects: [...rings, label('V = kQ / r', P(-3.2, 4.4), ROLE.result, 'primary')] },
      { narration: 'Field lines point away from +Q, from high potential to low, and cross every equipotential at right angles.', objects: field },
    ],
  }
}

// ── 2. Magnetic (Lorentz) force ──────────────────────────────────────────────

const cross = (a: number[], b: number[]) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]

/**
 * KG: "The Lorentz force F = q(E + v × B) acts on a charge q moving with
 * velocity v." Here E = 0 and B points into the page; the force direction is
 * the computed cross product v × B for a positive charge, and the path it
 * bends into is a circle of radius r = mv/(qB).
 */
export const LORENTZ_V = [1, 0, 0]
export const LORENTZ_B = [0, 0, -1]
export function buildMagneticForceScene(): SceneSpec {
  const F = cross(LORENTZ_V, LORENTZ_B)          // (0, 1, 0): up
  const q: V3 = P(0, -2.0), R = 2.2
  const centre: V3 = P(q[0] + F[0] * R, q[1] + F[1] * R)
  const grid: SceneObject[] = []
  const X = 0.16 // × marks are drawn, not typed: 20 identical text labels overwhelm the label placer
  for (const x of [-3.6, -1.8, 1.8, 3.6]) for (const y of [-3.4, -1.1, 1.2, 3.4]) grid.push(line(P(x - X, y - X), P(x + X, y + X), ROLE.reference, 0.025), line(P(x - X, y + X), P(x + X, y - X), ROLE.reference, 0.025))
  return {
    id: 'phys-magnetic-force',
    title: 'Magnetic force on a moving charge',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show that a charge moving through a magnetic field feels a force at right angles to both v and B (F = qv × B), which bends its path into a circle.',
    ariaLabel: 'A region of magnetic field pointing into the page, shown by crosses. A positive charge moves to the right; the magnetic force on it points up, at right angles to its velocity, and its path curves into a circle.',
    steps: [
      { narration: 'A uniform magnetic field points into the page (each × is the tail of a field arrow).', objects: [...grid, label('B into page', P(-2.7, 4.4), ROLE.ink, 'primary')] },
      { narration: 'A positive charge moves to the right. The force on it is F = qv × B: at right angles to both v and B.', objects: [dot(q, ROLE.input, 0.22), label('+q', P(q[0] - 0.6, q[1] - 0.5), ROLE.input, 'primary'), arrow(q, P(q[0] + LORENTZ_V[0] * 1.6, q[1] + LORENTZ_V[1] * 1.6), ROLE.output), label('v', P(q[0] + 1.9, q[1] - 0.35), ROLE.output, 'primary'), arrow(q, P(q[0] + F[0] * 1.3, q[1] + F[1] * 1.3), ROLE.result), label('F', P(q[0] + F[0] * 1.3 - 0.4, q[1] + F[1] * 1.3), ROLE.result, 'primary')] },
      { narration: 'The force is always sideways to the motion, so it changes the direction but not the speed: the charge moves in a circle of radius r = mv / (qB).', objects: [curve(circlePoints(centre[0], centre[1], R, 0, 2 * Math.PI, 64), ROLE.output), label('r = mv / (qB)', P(3.3, 2.2), ROLE.result, 'primary'), label('F = qvB', P(-3.3, 2.2), ROLE.result, 'primary')] },
    ],
  }
}

// ── 3. Magnetic flux ─────────────────────────────────────────────────────────

/**
 * KG: "Magnetic flux Φ = B·A is the total magnetic field passing perpendicularly
 * through a surface area A." Side view of the same loop facing the field and
 * tilted 60°: the field lines it catches, and Φ = BA cos θ.
 */
export const FLUX_TILT_DEG = 60
export function buildMagneticFluxScene(): SceneSpec {
  const HALF = 1.2, ys = [-1.0, -0.5, 0, 0.5, 1.0]
  const th = (FLUX_TILT_DEG * Math.PI) / 180
  const halfExtent = HALF * Math.cos(th)            // vertical reach of the tilted loop
  const fieldPanel = (x0: number, x1: number, reach: number): SceneObject[] =>
    ys.map((y) => arrow(P(x0, y), P(x1, y), Math.abs(y) <= reach + 1e-9 ? ROLE.output : ROLE.reference))
  const L = -2.5, Rc = 2.5
  const dir = [-Math.sin(th), Math.cos(th)]
  return {
    id: 'phys-magnetic-flux',
    title: 'Magnetic flux: field through an area',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show flux as the field passing through a loop: greatest when the loop faces the field (Φ = BA), smaller when tilted (Φ = BA cos θ).',
    ariaLabel: 'Two side views of the same wire loop in a uniform field pointing right. On the left the loop faces the field and all five field lines pass through it. On the right it is tilted by 60 degrees and only three pass through.',
    steps: [
      { narration: 'A uniform magnetic field points to the right. A loop of area A faces it square-on: every field line passes through.', objects: [...fieldPanel(-4.6, -0.5, HALF), line(P(L, -HALF), P(L, HALF), ROLE.input, 0.1), arrow(P(L, 1.9), P(L + 1.0, 1.9), ROLE.aid), label('normal', P(L + 0.4, 2.4), ROLE.aid, 'detail'), label('Φ = BA', P(L, -2.2), ROLE.result, 'primary')] },
      { narration: `The same loop tilted by ${FLUX_TILT_DEG}°: it presents less area to the field and catches fewer lines.`, objects: [...fieldPanel(0.5, 4.6, halfExtent), line(P(Rc + dir[0] * HALF, dir[1] * HALF), P(Rc - dir[0] * HALF, -dir[1] * HALF), ROLE.input, 0.1), arrow(P(Rc, 1.9), P(Rc + Math.cos(th), 1.9 + Math.sin(th)), ROLE.aid), label(`θ = ${FLUX_TILT_DEG}°`, P(Rc + 1.3, 2.4), ROLE.aid, 'detail')] },
      { narration: `Flux counts only the perpendicular part: Φ = BA cos θ = BA × ${r2(Math.cos(th))}.`, objects: [label(`Φ = BA cos ${FLUX_TILT_DEG}° = ${r2(Math.cos(th))} BA`, P(Rc, -2.2), ROLE.result, 'primary'), label('B', P(-4.4, 1.5), ROLE.output, 'primary')] },
    ],
  }
}

// ── 4. Faraday's law ─────────────────────────────────────────────────────────

/**
 * KG: "the induced EMF equals the negative rate of change of magnetic flux: ε =
 * −dΦ/dt." Φ(t) rises, holds, then falls; ε is computed as −dΦ/dt by finite
 * difference — negative while Φ rises, zero while it holds, positive while it falls.
 */
export function faradayFlux(t: number): number {
  if (t <= 2) return 0.8 * t
  if (t <= 4) return 1.6
  return Math.max(0, 1.6 - 0.8 * (t - 4))
}
export function faradayEmf(t: number): number {
  const h = 1e-3
  return -(faradayFlux(t + h) - faradayFlux(t - h)) / (2 * h)
}
export function buildFaradaysLawScene(): SceneSpec {
  const X0 = -4.2, SX = 1.35, T1 = 6
  const x = (t: number) => X0 + t * SX
  const FY = 1.0, EY = -2.3
  return {
    id: 'phys-faradays-law',
    title: "Faraday's law: changing flux induces an EMF",
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show that an EMF is induced only while the flux is changing, equal to minus its rate of change (ε = −dΦ/dt).',
    ariaLabel: 'Two graphs against time. The top shows magnetic flux rising steadily, staying constant, then falling. The bottom shows the induced EMF: a constant negative value while the flux rises, zero while it is constant, and a constant positive value while it falls.',
    steps: [
      { narration: 'The magnetic flux through a coil rises steadily, stays constant, then falls back.', objects: [arrow(P(X0, FY), P(x(T1) + 0.3, FY), ROLE.reference), arrow(P(X0, FY), P(X0, FY + 2.6), ROLE.reference), label('flux Φ', P(X0 + 0.2, FY + 3.0), ROLE.ink, 'detail'), curve(fnPath((xx) => FY + 1.4 * faradayFlux((xx - X0) / SX), X0, x(T1), 120), ROLE.input)] },
      { narration: 'The induced EMF is ε = −dΦ/dt: it exists only while the flux is changing.', objects: [arrow(P(X0, EY), P(x(T1) + 0.3, EY), ROLE.reference), line(P(X0, EY - 1.6), P(X0, EY + 1.6), ROLE.reference, 0.04), label('EMF ε', P(X0 + 0.2, EY + 1.95), ROLE.ink, 'detail'), label('time', P(x(T1) - 0.1, EY - 0.45), ROLE.ink, 'detail'), curve(fnPath((xx) => EY + 1.2 * faradayEmf((xx - X0) / SX), X0 + 0.02, x(T1) - 0.02, 150), ROLE.output)] },
      { narration: 'Rising flux gives a negative EMF, constant flux gives none, falling flux gives a positive one. A faster change gives a bigger EMF.', objects: [label('no change, no EMF', P(x(3), EY + 0.4), ROLE.aid, 'detail'), label('ε = −dΦ/dt', P(2.6, 4.4), ROLE.result, 'primary')] },
    ],
  }
}

// ── 5. Lenz's law ────────────────────────────────────────────────────────────

/**
 * KG: "the direction of induced current opposes the change in magnetic flux
 * that caused it." A north pole approaches a coil: the flux through the coil
 * (to the right) increases, so the induced field points left and the coil's
 * near face becomes a north pole that repels the magnet.
 */
export const LENZ_FLUX_CHANGE = +1 // flux to the right, increasing
export function buildLenzsLawScene(): SceneSpec {
  const inducedDir = -Math.sign(LENZ_FLUX_CHANGE)
  const CX = 1.8
  const loop = circlePoints(CX, 0, 1.4, 0, 2 * Math.PI, 48).map((p) => P(CX + (p[0] - CX) * 0.3, p[1]))
  return {
    id: 'phys-lenzs-law',
    title: "Lenz's law: induction opposes the change",
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show a magnet pushed toward a coil: the induced current makes a field that opposes the increase in flux, so the coil repels the approaching magnet.',
    ariaLabel: 'A bar magnet on the left with its north pole facing a wire coil, moving toward it. The magnet\'s field through the coil points right and is increasing. The induced field inside the coil points left, making the coil\'s near face a north pole that pushes back on the magnet.',
    steps: [
      { narration: "A bar magnet, north pole first, is pushed toward a coil. The magnet's field through the coil points right and is getting stronger.", objects: [...rect(-4.6, -0.5, -1.4, 0.5, ROLE.reference), label('S', P(-4.1, 0), ROLE.output, 'primary'), label('N', P(-1.9, 0), ROLE.input, 'primary'), arrow(P(-3.8, 1.2), P(-2.2, 1.2), ROLE.ink), label('moving in', P(-3.0, 1.7), ROLE.ink, 'detail'), curve(loop, ROLE.reference), label('coil', P(CX, -2.0), ROLE.ink, 'detail'), arrow(P(-1.1, -0.9), P(0.6, -0.9), ROLE.input), label('magnet field, increasing', P(-0.5, -1.4), ROLE.input, 'detail')] },
      { narration: 'The induced current flows so that its own field opposes that increase: inside the coil it points left.', objects: [arrow(P(CX + 1.2, 0), P(CX + 1.2 + inducedDir * 2.4, 0), ROLE.output), label('induced field', P(CX + 2.2, 0.5), ROLE.output, 'detail'), label('induced current', P(CX, 1.9), ROLE.output, 'detail')] },
      { narration: "So the coil's face nearest the magnet becomes a north pole, and it pushes back on the approaching magnet. Pull the magnet away and every direction reverses.", objects: [label('N', P(CX - 0.9, 0.9), ROLE.output, 'primary'), label('opposes the change', P(0.4, 3.2), ROLE.result, 'primary')] },
    ],
  }
}

// ── 6. AC basics ─────────────────────────────────────────────────────────────

/** KG: "Alternating current varies sinusoidally with time; RMS values equal peak values divided by √2." */
export const AC_PEAK = 3
export function buildAcBasicsScene(): SceneSpec {
  const X0 = -4.2, X1 = 4.4, PERIOD = 4.0
  const rms = r2(AC_PEAK / Math.SQRT2)
  return {
    id: 'phys-ac-basics',
    title: 'Alternating voltage: peak and RMS',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show an alternating voltage varying sinusoidally, its peak V₀, its period T, and the RMS value V₀/√2 that gives the same average power as a steady DC voltage.',
    ariaLabel: 'A sine wave of voltage against time crossing zero and reversing direction. Its peak is marked, one full period is marked, and a horizontal line at about 71 percent of the peak marks the RMS value.',
    steps: [
      { narration: 'An alternating voltage rises, falls through zero and reverses, over and over, as a sine wave.', objects: [arrow(P(X0, 0), P(X1 + 0.3, 0), ROLE.reference), line(P(X0, -3.6), P(X0, 3.6), ROLE.reference, 0.04), label('time', P(X1, -0.45), ROLE.ink, 'detail'), label('V', P(X0 - 0.4, 3.6), ROLE.ink, 'detail'), curve(fnPath((x) => AC_PEAK * Math.sin((2 * Math.PI * (x - X0)) / PERIOD), X0, X1, 160), ROLE.input)] },
      { narration: 'Its maximum is the peak value V₀, and one full cycle takes the period T.', objects: [line(P(X0, AC_PEAK), P(X0 + PERIOD / 4, AC_PEAK), ROLE.aid, 0.02), label(`peak V₀ = ${AC_PEAK} V`, P(X0 + 2.4, AC_PEAK + 0.45), ROLE.input, 'primary'), line(P(X0, -3.3), P(X0 + PERIOD, -3.3), ROLE.aid, 0.03), label('T', P(X0 + PERIOD / 2, -3.75), ROLE.aid, 'primary')] },
      { narration: `For power, a steady voltage equal to the RMS value does the same work: V_rms = V₀/√2 = ${rms} V.`, objects: [line(P(X0, rms), P(X1, rms), ROLE.result, 0.03), label(`V_rms = V₀/√2 = ${rms} V`, P(2.3, rms + 0.45), ROLE.result, 'primary')] },
    ],
  }
}

// ── 7. RC circuits ───────────────────────────────────────────────────────────

/** KG: "the capacitor charges and discharges exponentially with time constant τ = RC." V = V₀(1 − e^(−t/τ)). */
export function buildRcCircuitScene(): SceneSpec {
  const X0 = -4.0, Y0 = -2.6, TAU = 1.4, V0 = 5.0, X1 = X0 + 6 * TAU
  const v = (x: number) => Y0 + V0 * (1 - Math.exp(-(x - X0) / TAU))
  const at1 = 1 - Math.exp(-1)
  return {
    id: 'phys-rc-circuits',
    title: 'Charging a capacitor through a resistor',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show the capacitor voltage rising exponentially toward the supply voltage, reaching 63% of it after one time constant τ = RC.',
    ariaLabel: 'A graph of capacitor voltage against time rising quickly at first and then levelling off toward the supply voltage. A marker shows the voltage reaches 63 percent of the supply after one time constant.',
    steps: [
      { narration: 'A capacitor charges through a resistor from a supply of voltage V₀. Its voltage rises quickly at first, then more and more slowly.', objects: [arrow(P(X0, Y0), P(X1 + 0.2, Y0), ROLE.reference), arrow(P(X0, Y0), P(X0, Y0 + V0 + 1.0), ROLE.reference), label('time', P(X1, Y0 - 0.45), ROLE.ink, 'detail'), label('V_C', P(X0 - 0.5, Y0 + V0 + 1.0), ROLE.ink, 'detail'), curve(fnPath(v, X0, X1, 120), ROLE.output)] },
      { narration: 'It approaches the supply voltage V₀ but never quite reaches it.', objects: [line(P(X0, Y0 + V0), P(X1, Y0 + V0), ROLE.reference, 0.02), label('V₀', P(X0 - 0.45, Y0 + V0), ROLE.ink, 'primary')] },
      { narration: `After one time constant τ = RC it has reached ${Math.round(at1 * 100)}% of V₀. After about 5τ it is effectively full.`, objects: [line(P(X0 + TAU, Y0), P(X0 + TAU, Y0 + V0 * at1), ROLE.result, 0.03), line(P(X0, Y0 + V0 * at1), P(X0 + TAU, Y0 + V0 * at1), ROLE.result, 0.03), dot(P(X0 + TAU, Y0 + V0 * at1), ROLE.result, 0.1), label('τ = RC', P(X0 + TAU, Y0 - 0.45), ROLE.result, 'primary'), label(`V = ${r2(at1)} V₀`, P(X0 + TAU + 1.3, Y0 + V0 * at1 - 0.4), ROLE.result, 'primary'), label('5τ', P(X0 + 5 * TAU, Y0 - 0.45), ROLE.ink, 'detail')] },
    ],
  }
}

// ── 8. Electromagnetic waves ─────────────────────────────────────────────────

/**
 * KG: "self-sustaining oscillations of electric and magnetic fields that
 * propagate at the speed of light." E vertical, B along the depth axis drawn in
 * an oblique projection (depth → down-left), in phase, both at right angles to
 * the direction of travel.
 */
export const EMW_OBLIQUE: [number, number] = [-0.45, -0.35] // screen offset per unit of depth
export function buildElectromagneticWaveScene(): SceneSpec {
  const X0 = -4.2, X1 = 3.6, L = 3.2, AE = 1.9, AB = 1.7
  const phase = (x: number) => Math.sin((2 * Math.PI * (x - X0)) / L)
  const ePts = fnPath((x) => AE * phase(x), X0, X1, 120)
  const bPts: V3[] = []
  for (let i = 0; i <= 120; i++) { const x = X0 + ((X1 - X0) * i) / 120; const b = AB * phase(x); bPts.push(P(x + EMW_OBLIQUE[0] * b, EMW_OBLIQUE[1] * b)) }
  return {
    id: 'phys-electromagnetic-wave',
    title: 'An electromagnetic wave',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show an electromagnetic wave as electric and magnetic fields oscillating in phase, at right angles to each other and to the direction of travel, moving at c.',
    ariaLabel: 'A wave travelling to the right. The electric field oscillates up and down in the vertical plane; the magnetic field oscillates in the horizontal plane, drawn receding into the page. Both peak together, and both are at right angles to the direction of travel.',
    steps: [
      { narration: 'The wave travels to the right. Its electric field oscillates up and down.', objects: [arrow(P(X0, 0), P(4.6, 0), ROLE.reference), label('direction of travel', P(3.3, -0.45), ROLE.ink, 'detail'), curve(ePts, ROLE.input), label('E', P(X0 + L / 4, AE + 0.4), ROLE.input, 'primary')] },
      { narration: 'Its magnetic field oscillates at right angles to E, in step with it: both peak at the same places.', objects: [curve(bPts, ROLE.output), label('B', P(X0 + L / 4 + EMW_OBLIQUE[0] * AB - 0.4, EMW_OBLIQUE[1] * AB - 0.3), ROLE.output, 'primary')] },
      { narration: 'Each changing field sustains the other, so the wave needs no medium. It travels at c = 3 × 10⁸ m/s, and E, B and the direction of travel are all at right angles.', objects: [label('c = 3 × 10⁸ m/s', P(0, 3.4), ROLE.result, 'primary'), label('λ', P(X0 + L / 2 + L / 4, -2.6), ROLE.aid, 'primary'), line(P(X0 + L / 4, -2.2), P(X0 + L / 4 + L, -2.2), ROLE.aid, 0.03)] },
    ],
  }
}

// ── 9. Photoelectric effect ──────────────────────────────────────────────────

/**
 * KG: "emission of electrons from a metal surface when light of sufficient
 * frequency falls on it, explained by photon quantisation." Einstein's
 * equation KE_max = hf − φ as a graph: zero below the threshold f₀ = φ/h, a
 * straight line of slope h above it whose extension meets the axis at −φ.
 */
export const PE_F0 = 1.0  // threshold (graph x from the KE axis)
export function buildPhotoelectricScene(): SceneSpec {
  const GX = -0.6, GY = -1.2, SLOPE = 1.0
  const ke = (f: number) => SLOPE * (f - PE_F0)
  const xEnd = 4.4 - GX
  return {
    id: 'phys-photoelectric',
    title: 'The photoelectric effect',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show light ejecting electrons from a metal only above a threshold frequency, with the electrons\' maximum kinetic energy rising linearly with frequency: KE_max = hf − φ.',
    ariaLabel: 'On the left, light falls on a metal surface and knocks out an electron. On the right, a graph of the maximum kinetic energy of the electrons against light frequency: zero below the threshold frequency, then a straight line rising with slope h. Extended backwards, the line meets the energy axis at minus the work function.',
    steps: [
      { narration: 'Light falls on a metal surface. Each photon of energy hf can give all its energy to one electron.', objects: [line(P(-4.8, -1.2), P(-2.0, -1.2), ROLE.reference, 0.08), ...hatch(-4.6, -2.2, -1.2, 7, 0.3), label('metal', P(-3.4, -2.0), ROLE.ink, 'detail'), curve(fnPath((x) => 0.9 - (x + 4.6) * 0.75 + 0.18 * Math.sin((x + 4.6) * 9), -4.6, -3.3, 40), ROLE.input), label('light, hf', P(-4.3, 1.4), ROLE.input, 'detail'), dot(P(-3.0, -1.0), ROLE.output, 0.13), arrow(P(-3.0, -1.0), P(-2.1, 0.6), ROLE.output), label('e⁻', P(-2.0, 1.0), ROLE.output, 'primary')] },
      { narration: 'Below the threshold frequency f₀ no electrons come out, however bright the light. Above it, the fastest electrons have KE_max = hf − φ.', objects: [arrow(P(GX, GY), P(4.6, GY), ROLE.reference), arrow(P(GX, GY), P(GX, 3.6), ROLE.reference), label('frequency f', P(3.8, GY - 0.45), ROLE.ink, 'detail'), label('KE_max', P(GX + 0.2, 4.0), ROLE.ink, 'detail'), line(P(GX, GY), P(GX + PE_F0, GY), ROLE.input, 0.06), line(P(GX + PE_F0, GY), P(GX + xEnd, GY + ke(xEnd)), ROLE.result, 0.06), label('f₀', P(GX + PE_F0, GY - 0.45), ROLE.input, 'primary'), label('slope = h', P(2.9, 2.4), ROLE.result, 'primary')] },
      { narration: 'Extend the line back: it meets the energy axis at −φ, the work function, the energy needed to free an electron. So f₀ = φ/h.', objects: [line(P(GX, GY + ke(0)), P(GX + PE_F0, GY), ROLE.aid, 0.02), label('−φ', P(GX - 0.5, GY + ke(0)), ROLE.aid, 'primary'), label('KE_max = hf − φ', P(2.4, -3.2), ROLE.result, 'primary')] },
    ],
  }
}

// ── 10. Radioactive decay ────────────────────────────────────────────────────

/** KG: "Radioactive decay follows an exponential law N = N₀e^(−λt); the half-life is the time for half the nuclei to decay." */
export function buildRadioactiveDecayScene(): SceneSpec {
  const X0 = -4.0, Y0 = -2.6, HALF = 1.9, N0 = 5.6, X1 = X0 + 4.3 * HALF
  const lambda = Math.LN2 / HALF
  const n = (x: number) => Y0 + N0 * Math.exp(-lambda * (x - X0))
  const guides: SceneObject[] = []
  const names = ['N₀/2', 'N₀/4', 'N₀/8']
  for (let k = 1; k <= 3; k++) {
    const x = X0 + k * HALF, y = n(x)
    guides.push(line(P(X0, y), P(x, y), ROLE.aid, 0.02), line(P(x, Y0), P(x, y), ROLE.aid, 0.02), dot(P(x, y), ROLE.result, 0.09))
    guides.push(label(names[k - 1], P(X0 - 0.65, y), ROLE.result, 'detail'), label(k === 1 ? 'T½' : `${k}T½`, P(x, Y0 - 0.45), ROLE.result, 'detail'))
  }
  return {
    id: 'phys-radioactive-decay',
    title: 'Radioactive decay and half-life',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show the number of undecayed nuclei falling exponentially, halving every half-life: N₀ → N₀/2 → N₀/4 → N₀/8.',
    ariaLabel: 'A graph of the number of undecayed nuclei against time, a curve falling steeply and then more slowly. Guide lines show it drops to one half after one half-life, one quarter after two, and one eighth after three.',
    steps: [
      { narration: 'Start with N₀ unstable nuclei. The number left undecayed falls exponentially: N = N₀e^(−λt).', objects: [arrow(P(X0, Y0), P(X1 + 0.2, Y0), ROLE.reference), arrow(P(X0, Y0), P(X0, Y0 + N0 + 0.8), ROLE.reference), label('time', P(X1 - 0.1, Y0 - 0.45), ROLE.ink, 'detail'), label('N₀', P(X0 - 0.65, Y0 + N0), ROLE.result, 'detail'), curve(fnPath(n, X0, X1, 120), ROLE.input)] },
      { narration: 'After one half-life, half are left. After another, half of that: a quarter. Then an eighth.', objects: guides },
      { narration: 'The half-life is the same at every stage: T½ = ln 2 / λ. It does not depend on how many nuclei you start with.', objects: [label('T½ = ln 2 / λ', P(2.0, 2.4), ROLE.result, 'primary')] },
    ],
  }
}

// ── 11. Polarization ─────────────────────────────────────────────────────────

/**
 * KG: "the orientation of the electric field oscillation in transverse
 * electromagnetic waves." Unpolarized light (E in every direction) through a
 * vertical polarizer leaves vertically polarized at half the intensity; a
 * second polarizer crossed at 90° passes I = I₁cos²90° = 0.
 */
export const POL_SECOND_DEG = 90
function doubleArrow(cx: number, cy: number, ang: number, half: number, color: string): SceneObject[] {
  const dx = half * Math.cos(ang), dy = half * Math.sin(ang)
  return [arrow(P(cx, cy), P(cx + dx, cy + dy), color), arrow(P(cx, cy), P(cx - dx, cy - dy), color)]
}
function polarizer(cx: number, vertical: boolean): SceneObject[] {
  const out: SceneObject[] = [...rect(cx - 0.35, -1.6, cx + 0.35, 1.6, ROLE.reference)]
  if (vertical) for (const x of [-0.18, 0, 0.18]) out.push(line(P(cx + x, -1.4), P(cx + x, 1.4), ROLE.aid, 0.02))
  else for (const y of [-0.9, -0.3, 0.3, 0.9]) out.push(line(P(cx - 0.3, y), P(cx + 0.3, y), ROLE.aid, 0.02))
  return out
}
export function buildPolarizationScene(): SceneSpec {
  const passed = r2(Math.cos((POL_SECOND_DEG * Math.PI) / 180) ** 2)
  return {
    id: 'phys-polarization',
    title: 'Polarization of light',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show unpolarized light (E vibrating in every direction) becoming vertically polarized through a polarizer, and blocked by a second polarizer at 90°.',
    ariaLabel: 'Light travels to the right. Before the first filter its electric field vibrates in many directions, drawn as a star of double arrows. After a vertical polarizer only vertical vibration remains. A second polarizer turned to horizontal blocks the light completely.',
    steps: [
      { narration: 'Ordinary light is unpolarized: its electric field vibrates in every direction at right angles to the beam.', objects: [arrow(P(-4.8, -2.4), P(4.6, -2.4), ROLE.reference), label('beam', P(4.2, -2.85), ROLE.ink, 'detail'), ...[0, 45, 90, 135].flatMap((d) => doubleArrow(-3.6, 0, (d * Math.PI) / 180, 1.0, ROLE.input)), label('unpolarized', P(-3.6, 1.6), ROLE.input, 'primary')] },
      { narration: 'A polarizer passes only the vibration along its transmission axis. Vertically polarized light comes out, at half the intensity.', objects: [...polarizer(-1.4, true), label('polarizer', P(-1.4, 2.1), ROLE.ink, 'detail'), ...doubleArrow(0.5, 0, Math.PI / 2, 1.0, ROLE.output), label('polarized, I₀/2', P(0.5, 1.6), ROLE.output, 'primary')] },
      { narration: `A second polarizer at ${POL_SECOND_DEG}° to the first passes I = I₁ cos² ${POL_SECOND_DEG}° = ${passed}: no light gets through. Only transverse waves can be polarized.`, objects: [...polarizer(2.4, false), label(`at ${POL_SECOND_DEG}°`, P(2.4, 2.1), ROLE.ink, 'detail'), label('no light: I = 0', P(3.9, 0.4), ROLE.result, 'primary')] },
    ],
  }
}

// ── 12. Diffraction ──────────────────────────────────────────────────────────

/**
 * KG: "the bending and spreading of waves around obstacles or through
 * apertures, observable when the aperture size is comparable to wavelength."
 * Plane wavefronts spaced λ reach a gap about one wavelength wide and leave as
 * circular wavefronts spaced λ, spreading into the shadow region.
 */
export const DIFF_LAMBDA = 0.8
export const DIFF_GAP = 0.8
export function buildDiffractionScene(): SceneSpec {
  const BX = -0.6
  const plane: SceneObject[] = []
  for (let k = 1; k <= 4; k++) plane.push(line(P(BX - k * DIFF_LAMBDA, -2.2), P(BX - k * DIFF_LAMBDA, 2.2), ROLE.output, 0.035))
  const arcs: SceneObject[] = []
  for (let k = 1; k <= 5; k++) arcs.push(curve(circlePoints(BX, 0, k * DIFF_LAMBDA, -Math.PI * 0.44, Math.PI * 0.44, 36), ROLE.output))
  return {
    id: 'phys-diffraction',
    title: 'Diffraction through a narrow gap',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show straight wavefronts passing through a gap about one wavelength wide and spreading out as circular wavefronts, with the wavelength unchanged.',
    ariaLabel: 'Straight, evenly spaced wavefronts approach a barrier from the left. The barrier has a narrow gap about one wavelength wide. On the right, the waves spread out from the gap as curved wavefronts with the same spacing, reaching regions behind the barrier.',
    steps: [
      { narration: 'Straight wavefronts, one wavelength λ apart, travel toward a barrier.', objects: [...plane, arrow(P(-4.6, 2.8), P(-3.2, 2.8), ROLE.ink), label('λ', P(BX - 1.5 * DIFF_LAMBDA, -2.7), ROLE.output, 'primary')] },
      { narration: 'The barrier has a gap about as wide as one wavelength.', objects: [line(P(BX, DIFF_GAP / 2), P(BX, 3.6), ROLE.reference, 0.12), line(P(BX, -DIFF_GAP / 2), P(BX, -3.6), ROLE.reference, 0.12), label('gap ≈ λ', P(BX - 0.1, -4.1), ROLE.ink, 'primary')] },
      { narration: 'Beyond the gap the waves spread out as curved wavefronts into the region behind the barrier. The wavelength does not change. A much wider gap would let them through almost straight.', objects: [...arcs, label('waves spread out', P(2.8, 3.4), ROLE.result, 'primary')] },
    ],
  }
}
