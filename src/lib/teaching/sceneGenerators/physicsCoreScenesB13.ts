/**
 * Physics visual gap campaign, batch 13 (2026-09-30): analytical mechanics
 * (all eight) and the remaining advanced quantum concepts (nine). Same rules
 * as physicsCoreScenes.ts; every figure stays within the intermediate label
 * budget, and every number drawn is computed below.
 */

import type { SceneSpec, SceneObject } from '@/lib/teaching/sceneSpec'
import { ROLE, arrow, curve, dot, label, line } from './visualDesign'
import { P, r2, rad, circlePoints, fnPath, type V3 } from './physicsCoreScenes'

/** Axes from (x0, y0) with labelled ends. */
function graphAxes(x0: number, y0: number, x1: number, y1: number, xl: string, yl: string): SceneObject[] {
  return [arrow(P(x0, y0), P(x1, y0), ROLE.reference), arrow(P(x0, y0), P(x0, y1), ROLE.reference), label(xl, P(x1 - 0.8, y0 - 0.5), ROLE.ink, 'detail'), label(yl, P(x0 + 1.0, y1 + 0.35), ROLE.ink, 'detail')]
}
/** Signed number with a real minus sign. */
const sgn = (v: number, d = 2) => `${v < 0 ? '−' : ''}${Math.abs(v).toFixed(d)}`
const close = (pts: V3[]): V3[] => [...pts, pts[0]]

// ── 1. Generalized coordinates ───────────────────────────────────────────────

/**
 * KG: "a minimal set of independent parameters … the number of independent
 * coordinates equals the degrees of freedom." A plane pendulum: (x, y) minus
 * the constraint x² + y² = L² leaves one coordinate, θ.
 */
export const PEND = { L: 3.2, thetaDeg: 35, pivot: [0, 2.4] as const }
export const PEND_DOF = { cartesian: 2, constraints: 1 }
export function bobPosition(thetaDeg = PEND.thetaDeg): [number, number] {
  const t = rad(thetaDeg)
  return [PEND.pivot[0] + PEND.L * Math.sin(t), PEND.pivot[1] - PEND.L * Math.cos(t)]
}
export function buildGeneralizedCoordinatesScene(): SceneSpec {
  const [px, py] = PEND.pivot, [bx, by] = bobPosition(), dof = PEND_DOF.cartesian - PEND_DOF.constraints
  const half = rad(PEND.thetaDeg / 2)
  return {
    id: 'phys-generalized-coordinates',
    title: 'Generalized coordinates',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show that a pendulum bob, located by two Cartesian numbers (x, y), is held by one constraint x² + y² = L², so a single generalized coordinate θ describes it completely: one degree of freedom.',
    ariaLabel: 'A pendulum hanging from a pivot, swung out by 35 degrees. Dashed lines give the bob\'s x and y. An arc shows the circle the bob is forced to stay on. The angle theta at the pivot is the one number needed.',
    steps: [
      { narration: 'Where is the bob? In Cartesian coordinates it takes two numbers, x and y.', objects: [line(P(px - 1.3, py), P(px + 1.3, py), ROLE.reference, 0.07), line(P(px, py), P(bx, by), ROLE.ink, 0.05), dot(P(bx, by), ROLE.output, 0.22), line(P(px, by), P(bx, by), ROLE.aid, 0.02), line(P(bx, py), P(bx, by), ROLE.aid, 0.02), label('x', P((px + bx) / 2, by - 0.45), ROLE.aid, 'detail'), label('y', P(bx + 0.45, (py + by) / 2), ROLE.aid, 'detail')] },
      { narration: 'But the rod keeps the bob on a circle: x² + y² = L². That constraint removes one of the two numbers.', objects: [curve(circlePoints(px, py, PEND.L, rad(-150), rad(-30), 40), ROLE.aid), label('constraint: x² + y² = L²', P(-2.7, -1.4), ROLE.aid, 'detail')] },
      { narration: `What is left is one number — the angle θ. ${PEND_DOF.cartesian} coordinates minus ${PEND_DOF.constraints} constraint = ${dof} degree of freedom, and θ is the generalized coordinate that describes it.`, objects: [curve(circlePoints(px, py, 0.9, rad(-90), rad(-90 + PEND.thetaDeg), 12), ROLE.output), label('θ', P(px + 1.35 * Math.sin(half), py - 1.35 * Math.cos(half)), ROLE.output, 'detail'), label(`${PEND_DOF.cartesian} − ${PEND_DOF.constraints} = ${dof} coordinate: θ`, P(0, 3.4), ROLE.result, 'primary')] },
    ],
  }
}

// ── 2. Euler–Lagrange equation and Hamilton's principle ──────────────────────

/**
 * KG: "the action S = ∫L dt is stationary for the physical path." A ball
 * thrown up and caught T = 2 s later (m = 1 kg, g = 9.8 m/s²). The true path
 * q = (g/2)t(T − t) and paths varied by ε·sin(πt/T): the action is computed
 * numerically and is smallest for ε = 0.
 */
export const EL = { g: 9.8, T: 2, eps: 1.2 }
export function trueHeight(t: number): number { return (EL.g / 2) * t * (EL.T - t) }
export function variedHeight(t: number, eps: number): number { return trueHeight(t) + eps * Math.sin((Math.PI * t) / EL.T) }
export function action(eps: number, n = 4000): number {
  const dt = EL.T / n
  let S = 0
  for (let i = 0; i < n; i++) {
    const t = (i + 0.5) * dt
    const v = (EL.g / 2) * (EL.T - 2 * t) + eps * (Math.PI / EL.T) * Math.cos((Math.PI * t) / EL.T)
    S += (0.5 * v * v - EL.g * variedHeight(t, eps)) * dt
  }
  return S
}
export function buildEulerLagrangeScene(): SceneSpec {
  const X0 = -3.6, Y0 = -2.4, SX = 3.4, SY = 0.7
  const path = (eps: number) => fnPath((x) => Y0 + SY * variedHeight((x - X0) / SX, eps), X0, X0 + EL.T * SX, 80)
  const S0 = action(0), S1 = action(EL.eps)
  return {
    id: 'phys-euler-lagrange',
    title: 'Hamilton\'s principle',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show Hamilton\'s principle: among all paths between the same start and end, the one nature takes makes the action S = ∫(T − V) dt stationary — here, smallest — and demanding that gives the Euler–Lagrange equation.',
    ariaLabel: 'A graph of height against time for a ball thrown up and caught two seconds later. The true path is a parabola. Two varied paths, one higher and one lower, share its end points. Each has a larger action than the true path.',
    steps: [
      { narration: `A ball thrown up and caught ${EL.T} s later. Its real height follows a parabola. L = T − V, and the action is S = ∫L dt along the path.`, objects: [...graphAxes(X0, Y0, X0 + EL.T * SX + 0.5, 2.6, 'time t', 'height q'), curve(path(0), ROLE.output), label(`true path: S = ${sgn(S0)}`, P(0.4, Y0 + SY * trueHeight(1) + 0.45), ROLE.output, 'detail')] },
      { narration: 'Now bend the path, keeping the same start and end. Higher or lower, the action goes up.', objects: [curve(path(EL.eps), ROLE.input), curve(path(-EL.eps), ROLE.aid), label(`varied paths: S = ${sgn(S1)}`, P(1.8, Y0 + SY * variedHeight(1.5, EL.eps) + 0.5), ROLE.input, 'detail')] },
      { narration: 'The real path is the one where small changes do not change S at first order. Writing that condition out gives the Euler–Lagrange equation.', objects: [label('d/dt(∂L/∂q̇) − ∂L/∂q = 0', P(0.2, 3.4), ROLE.result, 'primary'), label('L = T − V', P(-2.6, -3.3), ROLE.ink, 'detail')] },
    ],
  }
}

// ── 3. Cyclic coordinates and Noether's theorem ──────────────────────────────

/**
 * KG: "if ∂L/∂qᵢ = 0 the conjugate momentum is conserved." A planet: L does
 * not depend on the angle φ, so p_φ = m r²φ̇ is constant — r·v⊥ at perihelion
 * equals r·v⊥ at aphelion. Ellipse a = 2.8, e = 0.5.
 */
export const ORBIT = { a: 2.8, e: 0.5, h: 2.1, focus: [1.2, -0.2] as const }
export function orbitR(phi: number): number { return (ORBIT.a * (1 - ORBIT.e ** 2)) / (1 + ORBIT.e * Math.cos(phi)) }
export function transverseSpeed(r: number): number { return ORBIT.h / r }
export function buildCyclicCoordinatesScene(): SceneSpec {
  const [fx, fy] = ORBIT.focus
  const pts: V3[] = Array.from({ length: 73 }, (_, i) => { const f = (2 * Math.PI * i) / 72, r = orbitR(f); return P(fx + r * Math.cos(f), fy + r * Math.sin(f)) })
  const rp = orbitR(0), ra = orbitR(Math.PI), vp = transverseSpeed(rp), va = transverseSpeed(ra), VS = 1.8 // arrow length per unit speed
  return {
    id: 'phys-cyclic-coordinates',
    title: 'Cyclic coordinates: a conserved momentum',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show that for a planet the Lagrangian does not depend on the angle φ, so φ is cyclic and its momentum p_φ = m r²φ̇ is conserved: the planet moves fast when close and slow when far, with r·v the same at both ends.',
    ariaLabel: 'An elliptical orbit around a star at one focus. At the closest point the radius is 1.4 and the speed arrow is long, 1.5; at the farthest point the radius is 4.2 and the speed arrow is short, 0.5. Radius times speed is 2.1 at both.',
    steps: [
      { narration: 'A planet around its star. Gravity depends only on distance r, so the Lagrangian L = ½m(ṙ² + r²φ̇²) − V(r) contains no φ.', objects: [curve(pts, ROLE.reference), dot(P(fx, fy), ROLE.ink, 0.22), label('∂L/∂φ = 0: φ is cyclic', P(-1.0, 3.3), ROLE.ink, 'detail')] },
      { narration: `So its conjugate momentum p_φ = m r²φ̇ never changes. Close in (r = ${r2(rp)}) the planet must move fast; far out (r = ${r2(ra)}) it moves slowly.`, objects: [line(P(fx, fy), P(fx + rp, fy), ROLE.aid, 0.03), line(P(fx, fy), P(fx - ra, fy), ROLE.aid, 0.03), arrow(P(fx + rp + 0.25, fy), P(fx + rp + 0.25, fy + VS * vp), ROLE.output), arrow(P(fx - ra - 0.25, fy), P(fx - ra - 0.25, fy - VS * va), ROLE.output), label('fast', P(fx + rp + 0.6, fy + VS * vp), ROLE.output, 'detail'), label('slow', P(fx - ra - 0.6, fy - VS * va - 0.3), ROLE.output, 'detail')] },
      { narration: 'Radius times speed is the same at both points — Kepler\'s equal areas. Noether: a symmetry (rotating the system changes nothing) gives a conserved quantity (angular momentum).', objects: [label(`r·v = ${r2(rp)} × ${r2(vp)} = ${r2(ra)} × ${r2(va)} = ${r2(ORBIT.h)}`, P(0, -3.4), ROLE.result, 'primary')] },
    ],
  }
}

// ── 4. The Hamiltonian and the Legendre transform ────────────────────────────

/**
 * KG: "H = Σpq̇ − L is obtained by a Legendre transform." For a free particle
 * L = ½mq̇²: the tangent at q̇₀ has slope p = mq̇₀ and meets the L-axis at −H,
 * so H = pq̇₀ − L(q̇₀) — here ½mq̇₀², the energy.
 */
export const LEG = { m: 1, v0: 2 }
export function lagrangianFree(v: number): number { return 0.5 * LEG.m * v * v }
export function legendre(v0 = LEG.v0): { p: number; H: number } { const p = LEG.m * v0; return { p, H: p * v0 - lagrangianFree(v0) } }
export function buildHamiltonianScene(): SceneSpec {
  const OX = -1.4, OY = -0.6, SX = 1.2, SY = 0.75
  const X = (v: number) => OX + v * SX, Y = (L: number) => OY + L * SY
  const { p, H } = legendre()
  const tan = (v: number) => p * (v - LEG.v0) + lagrangianFree(LEG.v0)
  return {
    id: 'phys-hamiltonian',
    title: 'The Hamiltonian by Legendre transform',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show the Legendre transform geometrically: the tangent to L(q̇) at q̇₀ has slope p = ∂L/∂q̇ and cuts the vertical axis at −H, so H = pq̇ − L — for a free particle exactly its kinetic energy.',
    ariaLabel: 'A parabola, the Lagrangian of a free particle against velocity. A tangent line touches it at velocity 2 with slope 2 and crosses the vertical axis at minus 2. That intercept is minus the Hamiltonian: H equals 2, the kinetic energy.',
    steps: [
      { narration: 'The Lagrangian of a free particle as a function of its velocity: L = ½mq̇², a parabola.', objects: [arrow(P(X(-1.6), OY), P(X(3.4), OY), ROLE.reference), arrow(P(OX, Y(-3)), P(OX, Y(5.2)), ROLE.reference), label('velocity q̇', P(X(3.1), OY - 0.5), ROLE.ink, 'detail'), label('L(q̇)', P(OX + 0.7, Y(5.2) + 0.3), ROLE.ink, 'detail'), curve(fnPath((x) => Y(lagrangianFree((x - OX) / SX)), X(-1.6), X(3.2), 60), ROLE.output)] },
      { narration: `At q̇ = ${LEG.v0}, draw the tangent. Its slope is the momentum p = ∂L/∂q̇ = mq̇ = ${p}.`, objects: [line(P(X(-0.4), Y(tan(-0.4))), P(X(3.3), Y(tan(3.3))), ROLE.input, 0.035), dot(P(X(LEG.v0), Y(lagrangianFree(LEG.v0))), ROLE.input, 0.13), label(`slope p = ${p}`, P(X(3.3) - 0.2, Y(tan(3.3)) + 0.4), ROLE.input, 'detail')] },
      { narration: `The tangent crosses the vertical axis at pq̇ − L below zero: that is −H. So H = pq̇ − L = ${H}, which for a free particle is just ½mq̇², its energy.`, objects: [dot(P(OX, Y(-H)), ROLE.result, 0.14), label('−H', P(OX - 0.55, Y(-H)), ROLE.result, 'detail'), label(`H = pq̇ − L = ${H}`, P(1.6, 3.4), ROLE.result, 'primary')] },
    ],
  }
}

// ── 5. Hamilton's equations ──────────────────────────────────────────────────

/**
 * KG: "q̇ = ∂H/∂p and ṗ = −∂H/∂q … trajectories in phase space." A harmonic
 * oscillator (m = 2, k = 1): orbits are the ellipses H = const, and the flow
 * (∂H/∂p, −∂H/∂q) is tangent to them, clockwise.
 */
export const OSC = { m: 2, k: 1 }
export const OSC_ENERGIES = [0.5, 1, 2]
export function hamOsc(q: number, p: number): number { return (p * p) / (2 * OSC.m) + 0.5 * OSC.k * q * q }
export function hamFlow(q: number, p: number): [number, number] { return [p / OSC.m, -OSC.k * q] }
export function oscEllipse(E: number): { qmax: number; pmax: number } { return { qmax: Math.sqrt((2 * E) / OSC.k), pmax: Math.sqrt(2 * OSC.m * E) } }
export function buildHamiltonsEquationsScene(): SceneSpec {
  const CX = 0, CY = -0.2, S = 1.2
  const ell = (E: number) => { const { qmax, pmax } = oscEllipse(E); return Array.from({ length: 65 }, (_, i) => { const t = (2 * Math.PI * i) / 64; return P(CX + S * qmax * Math.cos(t), CY + S * pmax * Math.sin(t)) }) }
  const flowArrows: SceneObject[] = []
  for (const t of [0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2]) {
    const { qmax, pmax } = oscEllipse(1), q = qmax * Math.cos(t), p = pmax * Math.sin(t)
    const [dq, dp] = hamFlow(q, p), n = Math.hypot(dq, dp)
    flowArrows.push(arrow(P(CX + S * q, CY + S * p), P(CX + S * q + (1.2 * dq) / n, CY + S * p + (1.2 * dp) / n), ROLE.input))
  }
  return {
    id: 'phys-hamiltons-equations',
    title: 'Hamilton\'s equations in phase space',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show that Hamilton\'s equations q̇ = ∂H/∂p, ṗ = −∂H/∂q move the state through phase space along curves of constant H — for an oscillator, ellipses traversed clockwise.',
    ariaLabel: 'Phase space with position q across and momentum p up. Three nested ellipses are curves of constant energy. Arrows on the middle ellipse point along it, clockwise: the direction Hamilton\'s equations move the state.',
    steps: [
      { narration: 'Phase space: every state of an oscillator is a point (q, p). Curves of constant energy H = p²/2m + ½kq² are ellipses.', objects: [arrow(P(-3.4, CY), P(3.4, CY), ROLE.reference), arrow(P(0, -3.8), P(0, 3.6), ROLE.reference), label('q', P(3.6, CY - 0.4), ROLE.ink, 'detail'), label('p', P(0.4, 3.8), ROLE.ink, 'detail'), ...OSC_ENERGIES.map((E) => curve(ell(E), ROLE.output))] },
      { narration: 'Hamilton\'s equations say which way the point moves: q̇ = ∂H/∂p = p/m, ṗ = −∂H/∂q = −kq. The arrows follow the ellipse, clockwise.', objects: [...flowArrows, label('q̇ = ∂H/∂p, ṗ = −∂H/∂q', P(-2.2, -3.4), ROLE.ink, 'detail')] },
      { narration: 'Because the motion is always along a curve of constant H, energy is conserved automatically.', objects: [label('H = p²/2m + ½kq²', P(2.2, 3.4), ROLE.result, 'primary')] },
    ],
  }
}

// ── 6. Poisson brackets and Liouville's theorem ──────────────────────────────

/**
 * KG: "df/dt = {f,H} … Liouville's theorem states phase-space volume is
 * conserved." A patch of pendulum states (H = p²/2 − cos q) is carried along
 * by the flow (RK4); it shears, but its area stays the same.
 */
export const LIOUVILLE = { q0: 0.3, q1: 1.1, p0: 0.2, p1: 1.0, t: 2.2, dt: 0.01 }
export function pendulumStep(q: number, p: number, dt: number): [number, number] {
  const f = (a: number, b: number): [number, number] => [b, -Math.sin(a)]
  const k1 = f(q, p), k2 = f(q + (dt / 2) * k1[0], p + (dt / 2) * k1[1]), k3 = f(q + (dt / 2) * k2[0], p + (dt / 2) * k2[1]), k4 = f(q + dt * k3[0], p + dt * k3[1])
  return [q + (dt / 6) * (k1[0] + 2 * k2[0] + 2 * k3[0] + k4[0]), p + (dt / 6) * (k1[1] + 2 * k2[1] + 2 * k3[1] + k4[1])]
}
export function liouvillePatch(t: number): Array<[number, number]> {
  const { q0, q1, p0, p1, dt } = LIOUVILLE, n = 12, pts: Array<[number, number]> = []
  for (let i = 0; i < n; i++) pts.push([q0 + ((q1 - q0) * i) / n, p0])
  for (let i = 0; i < n; i++) pts.push([q1, p0 + ((p1 - p0) * i) / n])
  for (let i = 0; i < n; i++) pts.push([q1 - ((q1 - q0) * i) / n, p1])
  for (let i = 0; i < n; i++) pts.push([q0, p1 - ((p1 - p0) * i) / n])
  const steps = Math.round(t / dt)
  return pts.map(([q, p]) => { for (let s = 0; s < steps; s++) [q, p] = pendulumStep(q, p, dt); return [q, p] })
}
export function polygonArea(pts: Array<[number, number]>): number {
  let a = 0
  for (let i = 0; i < pts.length; i++) { const [x1, y1] = pts[i], [x2, y2] = pts[(i + 1) % pts.length]; a += x1 * y2 - x2 * y1 }
  return Math.abs(a) / 2
}
export function buildPoissonBracketsScene(): SceneSpec {
  const CY = -0.3, S = 1.25
  const toV = (pts: Array<[number, number]>) => close(pts.map(([q, p]) => P(S * q, CY + S * p)))
  const start = liouvillePatch(0), later = liouvillePatch(LIOUVILLE.t)
  const A0 = polygonArea(start), A1 = polygonArea(later)
  const mean = (pts: Array<[number, number]>, i: 0 | 1) => pts.reduce((a, pt) => a + pt[i], 0) / pts.length
  const sep = (s: number) => fnPath((x) => CY + s * S * 2 * Math.cos(x / S / 2), -Math.PI * S, Math.PI * S, 60)
  return {
    id: 'phys-poisson-liouville',
    title: 'Phase-space flow and Liouville\'s theorem',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show time evolution as a flow in phase space generated by the Hamiltonian through Poisson brackets, df/dt = {f, H}: a patch of pendulum states is sheared by the flow, but its area — phase-space volume — is conserved.',
    ariaLabel: 'Phase space of a pendulum with the separatrix drawn as an eye shape. A small square of starting states is carried round clockwise and sheared into a slanted shape. Both have the same area, 0.64.',
    steps: [
      { narration: 'Phase space of a pendulum, H = p²/2 − cos q. The eye-shaped curve separates swinging from spinning. Take a small square of nearby starting states.', objects: [arrow(P(-4.3, CY), P(4.3, CY), ROLE.reference), arrow(P(0, -3.4), P(0, 3.0), ROLE.reference), label('q', P(4.5, CY - 0.4), ROLE.ink, 'detail'), label('p', P(0.4, 3.2), ROLE.ink, 'detail'), curve(sep(1), ROLE.reference), curve(sep(-1), ROLE.reference), curve(toV(start), ROLE.output), label('start', P(S * 0.7, CY + S * 1.0 + 0.4), ROLE.output, 'detail')] },
      { narration: `Every quantity evolves by df/dt = {f, H}; with {q, p} = 1 that is Hamilton's equations. After t = ${LIOUVILLE.t} the square has been carried round and sheared.`, objects: [curve(toV(later), ROLE.input), label(`after t = ${LIOUVILLE.t}`, P(S * mean(later, 0) - 2.0, CY + S * mean(later, 1)), ROLE.input, 'detail'), label('df/dt = {f, H}', P(-2.6, 3.2), ROLE.ink, 'detail')] },
      { narration: `Its shape changed but its area did not: ${r2(A0)} before, ${r2(A1)} after. Liouville's theorem — phase-space volume is conserved, just as the fundamental bracket {q, p} = 1 is.`, objects: [label(`area = ${r2(A0)} → ${r2(A1)}`, P(2.4, 2.6), ROLE.result, 'primary')] },
    ],
  }
}

// ── 7. Canonical transformations ─────────────────────────────────────────────

/**
 * KG: "canonical transformations preserve Hamilton's equations and Poisson
 * bracket structure." For the oscillator (m = ω = 1), q = √(2P) sin Q,
 * p = √(2P) cos Q turns the circles H = const into straight lines P = const:
 * the new Hamiltonian is K = ωP, so P is constant and Q grows steadily.
 */
export const CT_ACTIONS = [0.5, 1, 1.5]
export const CT_POINT = { Q: 1.0, P: 1 }
export function toQP(Q: number, Pm: number): [number, number] { return [Math.sqrt(2 * Pm) * Math.sin(Q), Math.sqrt(2 * Pm) * Math.cos(Q)] }
export function fromqp(q: number, p: number): [number, number] { return [Math.atan2(q, p), (q * q + p * p) / 2] }
/** {q, p} evaluated in the new variables by finite differences — 1 if the map is canonical. */
export function bracketInQP(Q: number, Pm: number, h = 1e-5): number {
  const dQ = (i: 0 | 1) => (toQP(Q + h, Pm)[i] - toQP(Q - h, Pm)[i]) / (2 * h)
  const dP = (i: 0 | 1) => (toQP(Q, Pm + h)[i] - toQP(Q, Pm - h)[i]) / (2 * h)
  return dQ(0) * dP(1) - dP(0) * dQ(1)
}
export function buildCanonicalTransformScene(): SceneSpec {
  const LX = -2.6, LY = -0.2, S = 1.2, RX = 0.6, RY = -1.8, SQ = 0.62, SP = 1.6
  const [q0, p0] = toQP(CT_POINT.Q, CT_POINT.P)
  return {
    id: 'phys-canonical-transform',
    title: 'A canonical transformation',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show a canonical transformation straightening the oscillator\'s phase-space circles into horizontal lines: in the new variables (Q, P) the Hamiltonian is K = ωP, so P stays constant and Q simply grows — the motion becomes trivial.',
    ariaLabel: 'Left: three circles in the q–p plane, the oscillator\'s orbits. Right: the same orbits as three horizontal lines in the Q–P plane. A marked state sits on the middle circle and on the middle line.',
    steps: [
      { narration: 'In ordinary phase space (q, p) an oscillator goes round circles.', objects: [arrow(P(LX - 2.2, LY), P(LX + 2.2, LY), ROLE.reference), arrow(P(LX, LY - 2.3), P(LX, LY + 2.4), ROLE.reference), label('q', P(LX + 2.4, LY - 0.4), ROLE.ink, 'detail'), label('p', P(LX + 0.35, LY + 2.7), ROLE.ink, 'detail'), ...CT_ACTIONS.map((a) => curve(circlePoints(LX, LY, S * Math.sqrt(2 * a), 0, 2 * Math.PI, 48), ROLE.output)), dot(P(LX + S * q0, LY + S * p0), ROLE.input, 0.13)] },
      { narration: 'Change variables: q = √(2P) sin Q, p = √(2P) cos Q. The bracket {q, p} is still 1, so this is canonical, and each circle becomes a straight line P = const.', objects: [arrow(P(RX, RY), P(RX + 2 * Math.PI * SQ + 0.3, RY), ROLE.reference), arrow(P(RX, RY), P(RX, RY + 3.1), ROLE.reference), label('Q', P(RX + 2 * Math.PI * SQ + 0.5, RY - 0.4), ROLE.ink, 'detail'), label('P', P(RX + 0.35, RY + 3.4), ROLE.ink, 'detail'), ...CT_ACTIONS.map((a) => line(P(RX, RY + SP * a), P(RX + 2 * Math.PI * SQ, RY + SP * a), ROLE.output, 0.035)), dot(P(RX + SQ * CT_POINT.Q, RY + SP * CT_POINT.P), ROLE.input, 0.13)] },
      { narration: 'The new Hamiltonian is K = ωP. Hamilton\'s equations give Ṗ = 0 and Q̇ = ω: the state just slides along its line.', objects: [arrow(P(RX + SQ * CT_POINT.Q + 0.2, RY + SP * CT_POINT.P + 0.3), P(RX + SQ * CT_POINT.Q + 1.3, RY + SP * CT_POINT.P + 0.3), ROLE.input), label('K = ωP, so Ṗ = 0', P(1.2, 3.4), ROLE.result, 'primary')] },
    ],
  }
}

// ── 8. Hamilton–Jacobi equation ──────────────────────────────────────────────

/**
 * KG: "−∂S/∂t = H(q, ∂S/∂q, t) reduces mechanics to a single PDE for S."
 * Free particles leaving q = 0 at t = 0 (m = 1): S = mq²/2t. Its slope is the
 * momentum, p = ∂S/∂q = mq/t, and −∂S/∂t = p²/2m = H.
 */
export const HJ = { m: 1 }
export function hjS(q: number, t: number): number { return (HJ.m * q * q) / (2 * t) }
export function hjMomentum(q: number, t: number): number { return (HJ.m * q) / t }
export function buildHamiltonJacobiScene(): SceneSpec {
  const X0 = -3.4, Y0 = -2.4, SX = 1.9, SY = 1.0
  const X = (q: number) => X0 + q * SX, Y = (s: number) => Y0 + s * SY
  const q1 = 2, t1 = 2, p1 = hjMomentum(q1, t1), s1 = hjS(q1, t1)
  const tan = (q: number) => s1 + p1 * (q - q1)
  return {
    id: 'phys-hamilton-jacobi',
    title: 'The Hamilton–Jacobi equation',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show Hamilton\'s principal function S(q, t) for free particles leaving the origin: its slope at any point is the momentum there, p = ∂S/∂q, and how fast it falls with time is the energy, −∂S/∂t = H — mechanics packed into one function.',
    ariaLabel: 'Two upward-curving graphs of the function S against position, at time 1 and at time 2; the later one is flatter. A tangent at position 2 on the later curve has slope 1, the momentum of a particle that has travelled 2 metres in 2 seconds.',
    steps: [
      { narration: 'Free particles leave q = 0 at t = 0. Hamilton\'s principal function for them is S = mq²/2t. At t = 1 it is steep; by t = 2 it has flattened.', objects: [...graphAxes(X0, Y0, X(3.2), 2.6, 'position q', 'S(q, t)'), curve(fnPath((x) => Y(hjS((x - X0) / SX, 1)), X(0), X(2.9), 50), ROLE.output), curve(fnPath((x) => Y(hjS((x - X0) / SX, 2)), X(0), X(3.1), 50), ROLE.input), label('t = 1', P(X(2.4) - 0.5, Y(hjS(2.4, 1)) + 0.2), ROLE.output, 'detail'), label('t = 2', P(X(3.1) + 0.2, Y(hjS(3.1, 2)) + 0.4), ROLE.input, 'detail')] },
      { narration: `The slope of S is the momentum: at q = ${q1}, t = ${t1}, p = ∂S/∂q = mq/t = ${p1} — exactly the speed of a particle that covered ${q1} m in ${t1} s.`, objects: [line(P(X(1.0), Y(tan(1.0))), P(X(3.2), Y(tan(3.2))), ROLE.aid, 0.05), dot(P(X(q1), Y(s1)), ROLE.result, 0.13), label(`p = ∂S/∂q = mq/t = ${p1}`, P(0.6, 3.4), ROLE.result, 'primary')] },
      { narration: 'And S falls with time at the rate of the energy: −∂S/∂t = mq²/2t² = p²/2m = H. That single equation, solved for S, contains all the motion.', objects: [label('−∂S/∂t = H = p²/2m', P(-1.2, -3.3), ROLE.ink, 'detail')] },
    ],
  }
}

// ── 9. Quantum operators ─────────────────────────────────────────────────────

/**
 * KG: "observables are represented by Hermitian operators whose eigenvalues
 * give measurement outcomes." A = [[2, 1], [1, 2]] has eigenvalues 1 and 3
 * with orthogonal eigenvectors; the state at 20° gives probabilities |cₙ|²
 * and the average ⟨A⟩ = ψᵀAψ.
 */
export const OBS: [[number, number], [number, number]] = [[2, 1], [1, 2]]
export const PSI_DEG = 20
export function eigen2(A = OBS): Array<{ value: number; vector: [number, number] }> {
  const [[a, b], [, d]] = A, tr = a + d, disc = Math.sqrt(((a - d) / 2) ** 2 + b * b)
  return [tr / 2 - disc, tr / 2 + disc].map((value) => { const v: [number, number] = [b, value - a], n = Math.hypot(...v); return { value, vector: [v[0] / n, v[1] / n] as [number, number] } })
}
export function measurement(psiDeg = PSI_DEG): { outcomes: number[]; probs: number[]; mean: number } {
  const psi: [number, number] = [Math.cos(rad(psiDeg)), Math.sin(rad(psiDeg))]
  const e = eigen2()
  const probs = e.map(({ vector }) => (vector[0] * psi[0] + vector[1] * psi[1]) ** 2)
  const Apsi = [OBS[0][0] * psi[0] + OBS[0][1] * psi[1], OBS[1][0] * psi[0] + OBS[1][1] * psi[1]]
  return { outcomes: e.map((x) => x.value), probs, mean: psi[0] * Apsi[0] + psi[1] * Apsi[1] }
}
export function buildOperatorsScene(): SceneSpec {
  const OX = -2.4, OY = -0.8, R = 2.2
  const e = eigen2(), m = measurement()
  const psi: [number, number] = [Math.cos(rad(PSI_DEG)), Math.sin(rad(PSI_DEG))]
  const axis = (v: [number, number]) => line(P(OX - 1.1 * v[0], OY - 1.1 * v[1]), P(OX + 1.1 * R * v[0], OY + 1.1 * R * v[1]), ROLE.reference, 0.03)
  const foot = (v: [number, number]) => { const c = v[0] * psi[0] + v[1] * psi[1]; return P(OX + R * c * v[0], OY + R * c * v[1]) }
  const NX = (a: number) => 0.8 + a * 0.9, NY = -2.2
  return {
    id: 'phys-quantum-operators',
    title: 'Operators and measurement',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show an observable as a Hermitian operator: its real eigenvalues are the only possible results, its orthogonal eigenvectors are the states with definite results, and a general state gives each result with probability |cₙ|² — averaging to ⟨A⟩.',
    ariaLabel: 'Left: two perpendicular eigenvector axes labelled with the eigenvalues 1 and 3, and a state vector between them with its projections onto each. Right: a number line with bars at 1 and 3 whose heights are the probabilities 0.18 and 0.82, and the average 2.64 marked.',
    steps: [
      { narration: `The observable A = [[2, 1], [1, 2]] is Hermitian. Its eigenvectors are perpendicular, with eigenvalues ${r2(e[0].value)} and ${r2(e[1].value)} — the only values a measurement can give.`, objects: [axis(e[0].vector), axis(e[1].vector), label(`a = ${r2(e[0].value)}`, P(OX + 1.25 * R * e[0].vector[0], OY + 1.25 * R * e[0].vector[1]), ROLE.ink, 'detail'), label(`a = ${r2(e[1].value)}`, P(OX + 1.25 * R * e[1].vector[0], OY + 1.25 * R * e[1].vector[1] + 0.2), ROLE.ink, 'detail')] },
      { narration: 'A state |ψ⟩ that is neither eigenvector. Its projections onto the two eigenvectors are the amplitudes cₙ.', objects: [arrow(P(OX, OY), P(OX + R * psi[0], OY + R * psi[1]), ROLE.input), label('|ψ⟩', P(OX + R * psi[0] + 0.45, OY + R * psi[1] - 0.2), ROLE.input, 'detail'), line(P(OX + R * psi[0], OY + R * psi[1]), foot(e[0].vector), ROLE.aid, 0.02), line(P(OX + R * psi[0], OY + R * psi[1]), foot(e[1].vector), ROLE.aid, 0.02)] },
      { narration: `Measure: you get ${r2(e[0].value)} with probability ${r2(m.probs[0])} and ${r2(e[1].value)} with probability ${r2(m.probs[1])}. The average over many runs is ⟨A⟩ = ⟨ψ|A|ψ⟩ = ${r2(m.mean)}.`, objects: [line(P(NX(0), NY), P(NX(4), NY), ROLE.reference, 0.03), ...m.outcomes.map((a, i) => line(P(NX(a), NY), P(NX(a), NY + m.probs[i] * 3.5), ROLE.output, 0.3)), ...m.outcomes.map((a, i) => label(`a = ${r2(a)}: P = ${r2(m.probs[i])}`, P(NX(a), NY + m.probs[i] * 3.5 + 0.4), ROLE.output, 'detail')), dot(P(NX(m.mean), NY), ROLE.result, 0.14), label(`⟨A⟩ = Σ aₙ|cₙ|² = ${r2(m.mean)}`, P(1.6, 3.4), ROLE.result, 'primary')] },
    ],
  }
}

// ── 10. Time-independent perturbation theory ─────────────────────────────────

/**
 * KG: "approximates energy corrections and eigenstate mixing when a small
 * perturbation is added to a solvable Hamiltonian." Two levels at 0 and 2
 * coupled by λ: exact E = 1 ∓ √(1 + λ²) against the second-order estimate
 * E₁ ≈ −λ²/2, E₂ ≈ 2 + λ²/2 — close for small λ, drifting apart for large.
 */
export const PT = { E1: 0, E2: 2, lamMax: 1.4 }
export function exactLevels(lam: number): [number, number] { const c = (PT.E1 + PT.E2) / 2, d = Math.sqrt(((PT.E2 - PT.E1) / 2) ** 2 + lam * lam); return [c - d, c + d] }
export function secondOrderLevels(lam: number): [number, number] { const g = PT.E2 - PT.E1; return [PT.E1 - (lam * lam) / g, PT.E2 + (lam * lam) / g] }
export function buildPerturbationScene(): SceneSpec {
  const X0 = -3.4, SX = 4, EY = -1.6, SY = 1.6, AY = -3.6
  const X = (l: number) => X0 + l * SX, Y = (E: number) => EY + E * SY
  const exact = (i: 0 | 1) => fnPath((x) => Y(exactLevels((x - X0) / SX)[i]), X(0), X(PT.lamMax), 50)
  const approx = (i: 0 | 1) => fnPath((x) => Y(secondOrderLevels((x - X0) / SX)[i]), X(0), X(PT.lamMax), 50)
  return {
    id: 'phys-perturbation',
    title: 'Perturbation theory',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show second-order perturbation theory for two coupled levels: the estimate E₁ ≈ −|V₁₂|²/(E₂⁰ − E₁⁰) follows the exact energies while the coupling is small, the levels push apart, and the estimate drifts away when the coupling is no longer small.',
    ariaLabel: 'A graph of energy against coupling strength. Two levels start at 0 and 2 and bend apart as the coupling grows. Dashed-style estimate curves follow them closely at first and then bend away too fast.',
    steps: [
      { narration: 'Two levels of a solvable system, at 0 and 2. Now switch on a small coupling λ between them.', objects: [arrow(P(X0, AY), P(X(PT.lamMax) + 0.6, AY), ROLE.reference), arrow(P(X0, AY), P(X0, 3.5), ROLE.reference), label('coupling λ', P(X(PT.lamMax) - 0.2, AY - 0.5), ROLE.ink, 'detail'), label('energy E', P(X0 + 1.0, 3.75), ROLE.ink, 'detail'), curve(exact(0), ROLE.output), curve(exact(1), ROLE.output), label('exact', P(X(PT.lamMax) + 0.8, Y(exactLevels(PT.lamMax)[1]) - 0.2), ROLE.output, 'detail')] },
      { narration: 'Second-order perturbation theory predicts each level shifts by |V₁₂|²/(E₁⁰ − E₂⁰): the lower goes down, the upper goes up — the levels repel.', objects: [curve(approx(0), ROLE.input), curve(approx(1), ROLE.input), label('2nd order', P(X(PT.lamMax) + 1.0, Y(secondOrderLevels(PT.lamMax)[1]) + 0.25), ROLE.input, 'detail'), label('levels repel', P(X(0.45), Y(1)), ROLE.ink, 'detail')] },
      { narration: `For small λ the estimate is excellent (at λ = 0.2 the error is ${(Math.abs(exactLevels(0.2)[0] - secondOrderLevels(0.2)[0])).toExponential(0)}); once λ is comparable to the gap it overshoots — the perturbation is no longer small.`, objects: [label('E₁ ≈ −|V₁₂|²/(E₂⁰ − E₁⁰) = −λ²/2', P(0.6, 4.3), ROLE.result, 'primary')] },
    ],
  }
}

// ── 11. Variational method ───────────────────────────────────────────────────

/**
 * KG: "⟨ψ|H|ψ⟩ ≥ E₀ … minimising over a parametric family gives an upper
 * bound." Hydrogen with a Gaussian trial ψ = e^(−αr²) (atomic units):
 * E(α) = 3α/2 − 2√(2α/π), minimum −4/(3π) = −0.424 at α = 8/(9π), above the
 * exact −0.5.
 */
export const E_EXACT = -0.5
export const ALPHA_OPT = 8 / (9 * Math.PI)
export function trialEnergy(alpha: number): number { return 1.5 * alpha - 2 * Math.sqrt((2 * alpha) / Math.PI) }
export function buildVariationalScene(): SceneSpec {
  const X0 = -3.6, SX = 6, EY = 1.2, SY = 7
  const X = (a: number) => X0 + a * SX, Y = (E: number) => EY + E * SY
  const Emin = trialEnergy(ALPHA_OPT)
  return {
    id: 'phys-variational',
    title: 'The variational method',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show the variational principle: the energy of any trial state is at least the true ground-state energy, so minimising over a family of trial states gives the best upper bound that family allows.',
    ariaLabel: 'A graph of trial energy against the Gaussian width parameter alpha for hydrogen. The curve dips to a minimum of minus 0.424 hartree and rises again. A horizontal line at minus 0.5, the exact ground state, lies entirely below the curve.',
    steps: [
      { narration: 'Guess the hydrogen ground state is a Gaussian, ψ = e^(−αr²), and compute its average energy for each width α.', objects: [arrow(P(X0, EY), P(X(1.25), EY), ROLE.reference), arrow(P(X0, -3.0), P(X0, 2.4), ROLE.reference), label('trial width α', P(X(1.1), EY + 0.45), ROLE.ink, 'detail'), label('energy (hartree)', P(X0 + 1.5, 2.7), ROLE.ink, 'detail'), curve(fnPath((x) => Y(trialEnergy((x - X0) / SX)), X(0.04), X(1.2), 80), ROLE.output), label('ψ = e^(−αr²)', P(X(0.95), Y(trialEnergy(0.95)) + 0.5), ROLE.ink, 'detail')] },
      { narration: 'The exact ground-state energy is −0.5 hartree. Every trial energy lies above it: ⟨ψ|H|ψ⟩ ≥ E₀.', objects: [line(P(X0, Y(E_EXACT)), P(X(1.25), Y(E_EXACT)), ROLE.input, 0.03), label(`exact E₀ = ${sgn(E_EXACT, 1)}`, P(X(0.95), Y(E_EXACT) - 0.45), ROLE.input, 'detail')] },
      { narration: `The best Gaussian, α = 8/(9π) = ${r2(ALPHA_OPT)}, gives ${sgn(Emin, 3)} hartree — an upper bound 15% above the truth. A better trial family would get closer, never below.`, objects: [dot(P(X(ALPHA_OPT), Y(Emin)), ROLE.result, 0.14), label(`E_min = ${sgn(Emin, 3)} ≥ E₀`, P(1.2, -0.9), ROLE.result, 'primary')] },
    ],
  }
}

// ── 12. WKB approximation ────────────────────────────────────────────────────

/**
 * KG: "ψ ∝ exp(±i∫p dx/ℏ) in classically allowed regions and exponential
 * decay in forbidden regions, recovering the Gamow tunnelling formula." A
 * parabolic barrier V = V₀(1 − x²/a²) with 2m/ℏ² = 2: the wave oscillates
 * outside, decays as e^(−∫κ dx) between the turning points, and emerges
 * smaller; T ≈ e^(−2∫κ dx).
 */
export const WKB = { V0: 4, a: 1.2, E: 3, c: 2 }
export function wkbV(x: number): number { return Math.abs(x) < WKB.a ? WKB.V0 * (1 - (x * x) / (WKB.a * WKB.a)) : 0 }
export function turningPoint(): number { return WKB.a * Math.sqrt(1 - WKB.E / WKB.V0) }
export function kappaIntegral(n = 4000): number {
  const xt = turningPoint(), dx = (2 * xt) / n
  let I = 0
  for (let i = 0; i < n; i++) { const x = -xt + (i + 0.5) * dx; I += Math.sqrt(Math.max(0, WKB.c * (wkbV(x) - WKB.E))) * dx }
  return I
}
export function wkbTransmission(): number { return Math.exp(-2 * kappaIntegral()) }
export function wkbWave(xs: number[]): number[] {
  const xt = turningPoint(), k = (x: number) => Math.sqrt(Math.max(0, WKB.c * (WKB.E - wkbV(x)))), kap = (x: number) => Math.sqrt(Math.max(0, WKB.c * (wkbV(x) - WKB.E)))
  const I = kappaIntegral(), dx = xs[1] - xs[0], out: number[] = new Array(xs.length).fill(0)
  // Left of the barrier: phase measured back from the turning point, so the wave meets it at a crest.
  let ph = 0
  for (let i = xs.length - 1; i >= 0; i--) { if (xs[i] < -xt) { ph += k(xs[i]) * dx; out[i] = Math.cos(ph) } }
  let decay = 0, ph2 = 0
  for (let i = 0; i < xs.length; i++) {
    const x = xs[i]
    if (x >= -xt && x <= xt) { decay += kap(x) * dx; out[i] = Math.exp(-decay) }
    else if (x > xt) { ph2 += k(x) * dx; out[i] = Math.exp(-I) * Math.cos(ph2) }
  }
  return out
}
export function buildWkbScene(): SceneSpec {
  const VY = -2.8, SV = 0.55, WY = 1.4, A = 1.0, N = 220, xs = Array.from({ length: N + 1 }, (_, i) => -4.4 + (8.8 * i) / N)
  const psi = wkbWave(xs), xt = turningPoint(), T = wkbTransmission()
  return {
    id: 'phys-wkb',
    title: 'The WKB approximation',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show the semiclassical wavefunction at a barrier: it oscillates as e^(±i∫p dx/ℏ) where E > V, decays as e^(−∫κ dx) between the turning points, and leaves with a smaller amplitude, giving the tunnelling probability T ≈ e^(−2∫κ dx).',
    ariaLabel: 'Bottom: a smooth hill-shaped potential barrier with a horizontal energy line crossing it at two turning points. Top: a wave that oscillates on the left, decays through the barrier region and continues on the right with about a quarter of the height.',
    steps: [
      { narration: 'A smooth barrier V(x) and a particle with energy E below its top. Where E = V are the classical turning points.', objects: [curve(fnPath((x) => VY + SV * wkbV(x), -4.4, 4.4, 160), ROLE.ink), line(P(-4.4, VY + SV * WKB.E), P(4.4, VY + SV * WKB.E), ROLE.input, 0.03), dot(P(-xt, VY + SV * WKB.E), ROLE.aid, 0.12), dot(P(xt, VY + SV * WKB.E), ROLE.aid, 0.12), label('V(x)', P(-1.6, VY + SV * WKB.V0 + 0.1), ROLE.ink, 'detail'), label('E', P(-4.1, VY + SV * WKB.E + 0.35), ROLE.input, 'detail'), label('turning points', P(2.6, VY + SV * WKB.E - 0.45), ROLE.aid, 'detail')] },
      { narration: 'Where E > V the wave oscillates, ψ ∝ e^(±i∫p dx/ℏ), with the local wavelength h/p. Between the turning points p is imaginary and ψ decays instead.', objects: [curve(xs.map((x, i) => P(x, WY + A * psi[i])), ROLE.output), line(P(-xt, WY - 1.2), P(-xt, VY + SV * WKB.E), ROLE.aid, 0.015), line(P(xt, WY - 1.2), P(xt, VY + SV * WKB.E), ROLE.aid, 0.015), label('ψ ∝ e^(±i∫p dx/ℏ)', P(-2.6, WY + 1.5), ROLE.output, 'detail')] },
      { narration: `It comes out the far side with amplitude e^(−∫κ dx) = ${r2(Math.exp(-kappaIntegral()))}, so the tunnelling probability is T ≈ e^(−2∫κ dx) = ${r2(T)} — the Gamow factor.`, objects: [label(`T ≈ e^(−2∫κdx) = ${r2(T)}`, P(1.6, 3.4), ROLE.result, 'primary')] },
    ],
  }
}

// ── 13. Identical particles ──────────────────────────────────────────────────

/**
 * KG: "wavefunctions symmetric under exchange (bosons) or antisymmetric
 * (fermions)." Two particles in a box, one in n = 1 and one in n = 2. Along
 * x₁ = x₂ the antisymmetric state vanishes and the symmetric one is doubled.
 */
export function boxState(n: number, x: number): number { return Math.SQRT2 * Math.sin(n * Math.PI * x) }
export function psiSym(x1: number, x2: number): number { return (boxState(1, x1) * boxState(2, x2) + boxState(2, x1) * boxState(1, x2)) / Math.SQRT2 }
export function psiAnti(x1: number, x2: number): number { return (boxState(1, x1) * boxState(2, x2) - boxState(2, x1) * boxState(1, x2)) / Math.SQRT2 }
export function buildIdenticalParticlesScene(): SceneSpec {
  const X0 = -3.4, SX = 6.4, Y0 = -2.4, SY = 1.1
  const X = (x: number) => X0 + x * SX
  const dist = (x: number) => (boxState(1, x) * boxState(2, x)) ** 2
  return {
    id: 'phys-identical-particles',
    title: 'Identical particles',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show the symmetrization postulate at work: for two particles in states n = 1 and 2 of a box, the chance of finding both at the same place is doubled for bosons (symmetric ψ) and exactly zero for fermions (antisymmetric ψ) — Pauli exclusion.',
    ariaLabel: 'A graph along the width of a box of the probability of finding both particles at the same position. The boson curve is twice the height of the distinguishable-particle curve; the fermion curve is flat at zero.',
    steps: [
      { narration: 'Two particles in a box, one in state 1 and one in state 2. How likely are they to be found at the same place x? For distinguishable particles, this curve.', objects: [...graphAxes(X0, Y0, X(1) + 0.6, 2.6, 'position x (both)', 'P(x, x)'), curve(fnPath((x) => Y0 + SY * dist((x - X0) / SX), X(0), X(1), 60), ROLE.aid), label('distinguishable', P(X(0.75) + 2.0, Y0 + SY * dist(0.75)), ROLE.aid, 'detail')] },
      { narration: 'Identical bosons must have a symmetric ψ: ψ_S = [φ₁(x₁)φ₂(x₂) + φ₂(x₁)φ₁(x₂)]/√2. Along x₁ = x₂ the two parts add: twice as likely to be together.', objects: [curve(fnPath((x) => Y0 + SY * psiSym((x - X0) / SX, (x - X0) / SX) ** 2, X(0), X(1), 60), ROLE.output), label('bosons', P(X(0.75) + 1.1, Y0 + SY * 2 * dist(0.75)), ROLE.output, 'detail')] },
      { narration: 'Identical fermions need an antisymmetric ψ — a Slater determinant. Along x₁ = x₂ the two parts cancel exactly: two fermions are never found at the same place in the same spin state.', objects: [line(P(X(0), Y0 + 0.04), P(X(1), Y0 + 0.04), ROLE.input, 0.05), label('fermions: 0', P(X(0.85), Y0 + 0.45), ROLE.input, 'detail'), label('ψ_A(x, x) = 0', P(0.4, 3.4), ROLE.result, 'primary')] },
    ],
  }
}

// ── 14. Addition of angular momenta ──────────────────────────────────────────

/**
 * KG: "J ranges from |j₁ − j₂| to j₁ + j₂; Clebsch–Gordan coefficients give
 * the change of basis." j₁ = 1, j₂ = ½: six product states (m₁, m₂) regroup
 * into J = 3/2 (four states) and J = 1/2 (two).
 */
export const AM = { j1: 1, j2: 0.5 }
export function allowedJ(j1: number, j2: number): number[] { const out: number[] = []; for (let J = Math.abs(j1 - j2); J <= j1 + j2 + 1e-9; J++) out.push(J); return out }
export function mValues(j: number): number[] { const out: number[] = []; for (let m = -j; m <= j + 1e-9; m++) out.push(m); return out }
/** M = ½ block: rows J = 3/2, 1/2; columns |m₁ = 1, m₂ = −½⟩, |m₁ = 0, m₂ = ½⟩. */
export const CG_HALF: [[number, number], [number, number]] = [[Math.sqrt(1 / 3), Math.sqrt(2 / 3)], [Math.sqrt(2 / 3), -Math.sqrt(1 / 3)]]
export function buildAngularMomentumAdditionScene(): SceneSpec {
  const GX = (m1: number) => -3.6 + (m1 + 1) * 1.2, GY = (m2: number) => -0.6 + m2 * 1.8
  const Js = allowedJ(AM.j1, AM.j2).reverse(), m1s = mValues(AM.j1), m2s = mValues(AM.j2)
  const frac = (x: number) => (Number.isInteger(x) ? String(x) : `${Math.round(2 * x)}/2`)
  const n1 = m1s.length, n2 = m2s.length
  return {
    id: 'phys-angular-momentum-addition',
    title: 'Adding angular momenta',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show two angular momenta j₁ = 1 and j₂ = ½ combining: the six product states (m₁, m₂) regroup, by total M = m₁ + m₂, into a J = 3/2 quartet and a J = 1/2 doublet, with Clebsch–Gordan coefficients giving the mix.',
    ariaLabel: 'Left: a grid of six dots, three values of m1 across and two of m2 up; diagonal lines join the dots with the same total M. Right: energy-level style stacks, four levels for J equals three halves and two for J equals one half.',
    steps: [
      { narration: `j₁ = 1 has ${n1} states and j₂ = ½ has ${n2}: ${n1 * n2} product states |m₁, m₂⟩ in all.`, objects: [...m1s.flatMap((a) => m2s.map((b) => dot(P(GX(a), GY(b)), ROLE.output, 0.16))), label('m₁', P(GX(0), GY(-0.5) - 0.8), ROLE.ink, 'detail'), label('m₂', P(GX(-1) - 0.8, GY(0)), ROLE.ink, 'detail')] },
      { narration: 'Group them by the total M = m₁ + m₂. States on the same diagonal share M and get mixed by the coupling.', objects: [line(P(GX(0), GY(0.5)), P(GX(1), GY(-0.5)), ROLE.aid, 0.025), line(P(GX(-1), GY(0.5)), P(GX(0), GY(-0.5)), ROLE.aid, 0.025), label('M = m₁ + m₂', P(GX(0), GY(0.5) + 0.7), ROLE.aid, 'detail')] },
      { narration: `They regroup into J = ${Js.map(frac).join(' and ')}: ${Js.map((J) => 2 * J + 1).join(' + ')} = ${n1 * n2} states. The mix is set by Clebsch–Gordan coefficients, e.g. ⟨1 0; ½ ½|3/2 ½⟩ = √(2/3).`, objects: [...Js.flatMap((J, c) => mValues(J).map((M) => line(P(1.0 + c * 1.9, -0.6 + M * 1.2), P(2.0 + c * 1.9, -0.6 + M * 1.2), ROLE.output, 0.06))), ...Js.map((J, c) => label(`J = ${frac(J)}`, P(1.5 + c * 1.9, -0.6 + J * 1.2 + 0.5), ROLE.output, 'detail')), label(`${n1} × ${n2} = ${Js.map((J) => 2 * J + 1).join(' + ')} states`, P(0.6, 3.4), ROLE.result, 'primary'), label('⟨1 0; ½ ½|3/2 ½⟩ = √(2/3)', P(2.4, -3.3), ROLE.ink, 'detail')] },
    ],
  }
}

// ── 15. Scattering and the Born approximation ────────────────────────────────

/**
 * KG: "the first Born term gives dσ/dΩ ∝ |Ṽ(q)|²." Momentum transfer
 * q = k′ − k with |q| = 2k sin(θ/2); for a Yukawa potential
 * dσ/dΩ ∝ 1/(q² + μ²)², forward-peaked, wider for a shorter range.
 */
export const BORN = { k: 1, mu: 0.5, muShort: 1.5, theta: 60 }
export function momentumTransfer(k: number, thetaDeg: number): number { return 2 * k * Math.sin(rad(thetaDeg) / 2) }
export function bornYukawa(thetaDeg: number, mu = BORN.mu, k = BORN.k): number { const q = momentumTransfer(k, thetaDeg); return ((mu * mu) / (q * q + mu * mu)) ** 2 }
export function buildBornScene(): SceneSpec {
  const OX = -3.6, OY = -1.0, K = 2.2, th = rad(BORN.theta)
  const kp: [number, number] = [OX + K * Math.cos(th), OY + K * Math.sin(th)]
  const GX = (t: number) => 0.4 + (t / 180) * 3.8, GY = -2.4, SG = 3.6
  return {
    id: 'phys-born-scattering',
    title: 'Scattering: the Born approximation',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show the Born approximation: a particle scattered through θ changes momentum by q = k′ − k, |q| = 2k sin(θ/2), and the cross-section follows the Fourier transform of the potential at that q — forward-peaked for a long-range potential.',
    ariaLabel: 'Left: incoming momentum k and outgoing momentum k-prime at 60 degrees, with the momentum transfer q closing the triangle. Right: the scattering cross-section against angle for a Yukawa potential, highest straight ahead and falling with angle; a shorter-range potential gives a flatter curve.',
    steps: [
      { narration: `A particle with momentum k scatters through θ = ${BORN.theta}° to k′, the same length. The momentum transfer is q = k′ − k.`, objects: [dot(P(OX, OY), ROLE.ink, 0.18), arrow(P(OX, OY), P(OX + K, OY), ROLE.input), arrow(P(OX, OY), P(kp[0], kp[1]), ROLE.output), arrow(P(OX + K, OY), P(kp[0], kp[1]), ROLE.result), curve(circlePoints(OX, OY, 0.6, 0, th, 12), ROLE.aid), label('k', P(OX + K / 2, OY - 0.45), ROLE.input, 'detail'), label('k′', P(OX + K * Math.cos(th) / 2 - 0.45, OY + K * Math.sin(th) / 2), ROLE.output, 'detail'), label('q', P((OX + K + kp[0]) / 2 + 0.4, (OY + kp[1]) / 2), ROLE.result, 'detail')] },
      { narration: `In the Born approximation the amplitude is the Fourier transform of the potential at q. For a Yukawa potential, dσ/dΩ ∝ 1/(q² + μ²)²: largest straight ahead, falling as |q| = 2k sin(θ/2) grows.`, objects: [...graphAxes(GX(0), GY, GX(180) + 0.5, 1.8, 'angle θ', 'dσ/dΩ'), curve(fnPath((x) => GY + SG * bornYukawa(((x - GX(0)) / 3.8) * 180), GX(0), GX(180), 60), ROLE.output)] },
      { narration: 'A shorter-range potential (larger μ) has a broader Fourier transform, so it scatters more to wide angles.', objects: [curve(fnPath((x) => GY + SG * bornYukawa(((x - GX(0)) / 3.8) * 180, BORN.muShort), GX(0), GX(180), 60), ROLE.aid), label('shorter range', P(GX(120), GY + SG * bornYukawa(120, BORN.muShort) + 0.45), ROLE.aid, 'detail'), label('f(q) ∝ Ṽ(q), |q| = 2k sin(θ/2)', P(0.2, 3.4), ROLE.result, 'primary')] },
    ],
  }
}

// ── 16. The S-matrix ─────────────────────────────────────────────────────────

/**
 * KG: "S = 1 + 2πiT; unitarity of S encodes conservation of probability …
 * the optical theorem." For one elastic partial wave (normalisation
 * S = 1 + 2iT): S = e^(2iδ) lies on the unit circle and T = e^(iδ) sin δ on
 * the circle of radius ½ about i/2, so Im T = |T|².
 */
export const SM = { deltaDeg: 35 }
export function sElement(deltaDeg = SM.deltaDeg): [number, number] { const d = rad(deltaDeg); return [Math.cos(2 * d), Math.sin(2 * d)] }
export function tElement(deltaDeg = SM.deltaDeg): [number, number] { const d = rad(deltaDeg); return [Math.sin(d) * Math.cos(d), Math.sin(d) ** 2] }
export function buildSMatrixScene(): SceneSpec {
  const C1X = -2.4, C1Y = 0, R1 = 2, O2X = 1.8, O2Y = -1.8, S2 = 3
  const [sr, si] = sElement(), [tr, ti] = tElement()
  return {
    id: 'phys-s-matrix',
    title: 'The S-matrix and unitarity',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show unitarity for one partial wave: the S-matrix element S = e^(2iδ) always has |S| = 1 (nothing is lost), so the amplitude T = (S − 1)/2i is confined to a circle on which Im T = |T|² — the optical theorem in miniature.',
    ariaLabel: 'Left: a unit circle in the complex plane with the S-matrix element as a point on it at twice the phase shift. Right: a smaller circle touching the origin, the unitarity circle, with the scattering amplitude T as a point on it.',
    steps: [
      { narration: `For elastic scattering in one partial wave, S = e^(2iδ). With phase shift δ = ${SM.deltaDeg}°, S sits on the unit circle: |S| = 1, all probability comes out.`, objects: [curve(circlePoints(C1X, C1Y, R1, 0, 2 * Math.PI, 64), ROLE.reference), line(P(C1X - 2.4, C1Y), P(C1X + 2.4, C1Y), ROLE.reference, 0.02), line(P(C1X, C1Y - 2.4), P(C1X, C1Y + 2.4), ROLE.reference, 0.02), arrow(P(C1X, C1Y), P(C1X + R1 * sr, C1Y + R1 * si), ROLE.output), label('S = e^(2iδ)', P(C1X + R1 * sr + 0.3, C1Y + R1 * si + 0.45), ROLE.output, 'detail'), label('|S| = 1: nothing lost', P(C1X, C1Y - 2.9), ROLE.ink, 'detail')] },
      { narration: 'The scattering amplitude is T = (S − 1)/2i = e^(iδ) sin δ. As δ varies, T runs round a circle of radius ½ touching the origin — the unitarity circle.', objects: [line(P(O2X - 0.6, O2Y), P(O2X + 2.2, O2Y), ROLE.reference, 0.02), line(P(O2X, O2Y - 0.4), P(O2X, O2Y + 3.4), ROLE.reference, 0.02), curve(circlePoints(O2X, O2Y + S2 / 2, S2 / 2, 0, 2 * Math.PI, 64), ROLE.aid), arrow(P(O2X, O2Y), P(O2X + S2 * tr, O2Y + S2 * ti), ROLE.input), label('T = (S − 1)/2i', P(O2X + S2 * tr + 0.9, O2Y + S2 * ti - 0.2), ROLE.input, 'detail'), label('unitarity circle', P(O2X, O2Y - 0.6), ROLE.aid, 'detail')] },
      { narration: `On that circle Im T = |T|² — here both are ${r2(ti)}. Summed over partial waves this is the optical theorem: the forward amplitude fixes the total cross-section.`, objects: [label(`Im T = |T|² = ${r2(ti)}`, P(0, 3.4), ROLE.result, 'primary')] },
    ],
  }
}

// ── 17. The density matrix ───────────────────────────────────────────────────

/**
 * KG: "pure states satisfy ρ² = ρ while mixed states have Tr(ρ²) < 1." A qubit
 * ρ = (I + r·σ)/2 in the Bloch picture (x–z slice): Tr ρ² = (1 + |r|²)/2 —
 * 1 on the surface, less inside, ½ at the centre.
 */
export const BLOCH = { pure: { r: 1, deg: 50 }, mixed: { r: 0.5, deg: 130 } }
export function rhoFromBloch(rx: number, rz: number): [[number, number], [number, number]] { return [[(1 + rz) / 2, rx / 2], [rx / 2, (1 - rz) / 2]] }
export function purity(rho: [[number, number], [number, number]]): number { return rho[0][0] ** 2 + rho[1][1] ** 2 + 2 * rho[0][1] * rho[1][0] }
export function buildDensityMatrixScene(): SceneSpec {
  const CX = -0.8, CY = -0.3, R = 3
  const tip = ({ r, deg }: { r: number; deg: number }) => P(CX + R * r * Math.sin(rad(deg)), CY + R * r * Math.cos(rad(deg)))
  const pur = ({ r, deg }: { r: number; deg: number }) => purity(rhoFromBloch(r * Math.sin(rad(deg)), r * Math.cos(rad(deg))))
  const pt = tip(BLOCH.pure), mt = tip(BLOCH.mixed)
  return {
    id: 'phys-density-matrix',
    title: 'The density matrix',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show pure and mixed qubit states in the Bloch picture: ρ = (I + r·σ)/2, with pure states on the surface (Tr ρ² = 1), mixtures inside (Tr ρ² < 1) and the maximally mixed state at the centre (Tr ρ² = ½).',
    ariaLabel: 'A circle, a slice through the Bloch sphere, with the up state at the top and the down state at the bottom. A full-length arrow to the surface is a pure state; a half-length arrow is a mixed state; the centre is the maximally mixed state.',
    steps: [
      { narration: 'Every qubit state is a density matrix ρ = (I + r·σ)/2, drawn as a Bloch vector r. Pure states reach the surface: ρ² = ρ and Tr ρ² = 1.', objects: [curve(circlePoints(CX, CY, R, 0, 2 * Math.PI, 64), ROLE.reference), line(P(CX, CY - R), P(CX, CY + R), ROLE.reference, 0.02), line(P(CX - R, CY), P(CX + R, CY), ROLE.reference, 0.02), label('|0⟩', P(CX + 0.4, CY + R + 0.35), ROLE.ink, 'detail'), label('|1⟩', P(CX + 0.4, CY - R - 0.35), ROLE.ink, 'detail'), arrow(P(CX, CY), pt, ROLE.output), label(`pure: Tr ρ² = ${r2(pur(BLOCH.pure))}`, P(pt[0] + 1.3, pt[1] + 0.35), ROLE.output, 'detail')] },
      { narration: `A statistical mixture has a shorter vector. With |r| = ${BLOCH.mixed.r}, Tr ρ² = ${r2(pur(BLOCH.mixed))} < 1 — no single state vector describes it.`, objects: [arrow(P(CX, CY), mt, ROLE.input), label(`mixed: Tr ρ² = ${r2(pur(BLOCH.mixed))}`, P(3.6, -1.9), ROLE.input, 'detail')] },
      { narration: 'At the centre, r = 0: ρ = I/2, equal odds of everything, Tr ρ² = ½. Time evolution iℏρ̇ = [H, ρ] rotates r without changing its length.', objects: [dot(P(CX, CY), ROLE.aid, 0.14), label(`I/2: Tr ρ² = ${r2(purity(rhoFromBloch(0, 0)))}`, P(CX - 0.9, CY - 1.3), ROLE.aid, 'detail'), label('Tr ρ² = (1 + |r|²)/2', P(0.4, 3.4), ROLE.result, 'primary')] },
    ],
  }
}
