/**
 * Physics visual gap campaign, batch 15 (2026-09-30): the first half of the
 * domain-scope upgrade. These fourteen concepts were served a fixed registry
 * card that the scope audit (visual/scope.ts INSUFFICIENT_FOR_CONCEPT) judged
 * to show only one instance of what the concept defines. Each now owns a
 * computed figure of the concept itself. Every figure keeps the KIND its card
 * named (a number line stays a number line, a force diagram a force diagram),
 * because the resolver still introduces it by that card's representation.
 */

import type { SceneSpec, SceneObject } from '@/lib/teaching/sceneSpec'
import { ROLE, arrow, curve, dot, label, line } from './visualDesign'
import { P, r2, circlePoints, fnPath, rect, type V3 } from './physicsCoreScenes'

const neg1 = (v: number) => `${v < 0 ? '−' : ''}${Math.abs(v).toFixed(1)}`
const sgn = (v: number, d = 0) => `${v < 0 ? '−' : v > 0 ? '+' : ''}${Math.abs(v).toFixed(d)}`
/** A number line from a to b at height y, with integer ticks every `step`. */
function numberLine(a: number, b: number, y: number, x: (u: number) => number, step = 1): SceneObject[] {
  const out: SceneObject[] = [arrow(P(x(a) - 0.2, y), P(x(b) + 0.3, y), ROLE.reference)]
  for (let u = Math.ceil(a / step) * step; u <= b + 1e-9; u += step) out.push(line(P(x(u), y - 0.12), P(x(u), y + 0.12), ROLE.reference, 0.02))
  return out
}
/** A resistor zigzag from (x0, y0) to (x1, y1). */
function zigzag(x0: number, y0: number, x1: number, y1: number, teeth = 6, amp = 0.18): V3[] {
  const pts: V3[] = [P(x0, y0)], dx = x1 - x0, dy = y1 - y0, len = Math.hypot(dx, dy), nx = -dy / len, ny = dx / len
  for (let i = 1; i < 2 * teeth; i++) { const t = i / (2 * teeth), s = i % 2 ? amp : -amp; pts.push(P(x0 + dx * t + nx * s, y0 + dy * t + ny * s)) }
  pts.push(P(x1, y1))
  return pts
}
/** An arc with an arrowhead at its end, for a rotation. */
function rotationArrow(cx: number, cy: number, r: number, a0: number, a1: number, color: string): SceneObject[] {
  const pts = circlePoints(cx, cy, r, a0, a1, 24), end = pts[pts.length - 1], pre = pts[pts.length - 3]
  return [curve(pts, color), arrow(pre, end, color)]
}

// ── 1. Displacement ──────────────────────────────────────────────────────────

/** KG: "Displacement is the vector change in position while distance is the total scalar path length." A walk 0 → +4 → +1 m. */
export const WALK = [0, 4, 1]
export function walkDistance(w = WALK): number { let d = 0; for (let i = 1; i < w.length; i++) d += Math.abs(w[i] - w[i - 1]); return d }
export function walkDisplacement(w = WALK): number { return w[w.length - 1] - w[0] }
export function buildDisplacementScene(): SceneSpec {
  const X = (u: number) => -2.4 + u * 1.1, Y = -0.6, d = walkDistance(), s = walkDisplacement()
  const hop = (a: number, b: number, h: number) => fnPath((x) => Y + h * Math.sin((Math.PI * (x - X(a))) / (X(b) - X(a))), X(a), X(b), 30)
  return {
    id: 'phys-displacement',
    title: 'Displacement versus distance',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show on a number line that a walker who goes 4 m forward and 3 m back has covered a distance of 7 m but has a displacement of only +1 m: displacement is the change in position, with a direction.',
    ariaLabel: 'A number line in metres. A walker starts at 0, walks forward to 4, then back to 1. Arcs above the line trace the path, 4 metres out and 3 metres back. A short arrow below the line from 0 to 1 is the displacement.',
    steps: [
      { narration: `A walker starts at 0, goes forward to +${WALK[1]} m, then back to +${WALK[2]} m.`, objects: [...numberLine(-2, 6, Y, X), label('position x (m)', P(X(5.2), Y - 0.55), ROLE.ink, 'detail'), dot(P(X(WALK[0]), Y), ROLE.ink, 0.14), label('start', P(X(WALK[0]), Y - 0.5), ROLE.ink, 'detail'), curve(hop(WALK[0], WALK[1], 1.6), ROLE.input), curve(hop(WALK[1], WALK[2], 0.9), ROLE.input), dot(P(X(WALK[2]), Y), ROLE.ink, 0.14), label('end', P(X(WALK[2]) + 0.1, Y - 0.5), ROLE.ink, 'detail')] },
      { narration: `The distance is every metre walked, whichever way: ${Math.abs(WALK[1] - WALK[0])} + ${Math.abs(WALK[2] - WALK[1])} = ${d} m. It has no direction.`, objects: [label(`distance = ${Math.abs(WALK[1] - WALK[0])} + ${Math.abs(WALK[2] - WALK[1])} = ${d} m`, P(X(2), Y + 2.3), ROLE.input, 'detail')] },
      { narration: `The displacement only compares where the walk ended with where it started: ${sgn(s)} m, pointing in the positive direction.`, objects: [arrow(P(X(WALK[0]), Y - 1.2), P(X(WALK[2]), Y - 1.2), ROLE.result), label(`displacement = ${WALK[2]} − ${WALK[0]} = ${sgn(s)} m`, P(0.2, 3.4), ROLE.result, 'primary')] },
    ],
  }
}

// ── 2. Velocity ──────────────────────────────────────────────────────────────

/** KG: "Velocity is the rate of change of displacement with time; speed is its scalar counterpart." Two carts, one second apart. */
export const CARTS = { A: { x0: -4, v: 2 }, B: { x0: 3, v: -1 }, T: 4 }
export function cartPosition(c: { x0: number; v: number }, t: number): number { return c.x0 + c.v * t }
export function buildVelocityScene(): SceneSpec {
  const X = (u: number) => u * 0.88, YA = 1.0, YB = -1.6, ts = Array.from({ length: CARTS.T + 1 }, (_, i) => i)
  const dxA = cartPosition(CARTS.A, CARTS.T) - CARTS.A.x0
  return {
    id: 'phys-velocity',
    title: 'Velocity: speed with a direction',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show velocity as displacement per unit time on a number line: cart A moves +2 m every second, cart B moves −1 m every second — the sign is the direction, and speed is the size alone.',
    ariaLabel: 'Two number lines. On the upper one, cart A\'s position is marked each second, 2 metres apart, moving right. On the lower one, cart B\'s marks are 1 metre apart, moving left. Arrows show each velocity.',
    steps: [
      { narration: 'Each dot marks a cart\'s position one second after the last. Cart A covers 2 m each second, moving right.', objects: [...numberLine(-5, 5, YA, X), ...ts.map((t) => dot(P(X(cartPosition(CARTS.A, t)), YA), ROLE.output, 0.13)), arrow(P(X(cartPosition(CARTS.A, CARTS.T)) - 0.1, YA + 0.6), P(X(cartPosition(CARTS.A, CARTS.T)) + 0.8, YA + 0.6), ROLE.output), label(`A: v = ${sgn(CARTS.A.v)} m/s`, P(X(-2.5), YA + 0.7), ROLE.output, 'detail')] },
      { narration: 'Cart B covers 1 m each second, moving left: its velocity is negative.', objects: [...numberLine(-5, 5, YB, X), ...ts.map((t) => dot(P(X(cartPosition(CARTS.B, t)), YB), ROLE.input, 0.13)), arrow(P(X(cartPosition(CARTS.B, CARTS.T)) + 0.1, YB + 0.6), P(X(cartPosition(CARTS.B, CARTS.T)) - 0.5, YB + 0.6), ROLE.input), label(`B: v = ${sgn(CARTS.B.v)} m/s`, P(X(3.2), YB + 0.7), ROLE.input, 'detail'), label('position x (m)', P(X(4.2), YB - 0.55), ROLE.ink, 'detail')] },
      { narration: `Velocity is displacement over time: for A, ${dxA} m in ${CARTS.T} s. Speed drops the sign — B's speed is 1 m/s.`, objects: [label(`v = Δx/Δt = ${dxA} m / ${CARTS.T} s = ${sgn(dxA / CARTS.T)} m/s`, P(0, 3.4), ROLE.result, 'primary'), label('speed = |v|', P(0, -3.2), ROLE.ink, 'detail')] },
    ],
  }
}

// ── 3. Acceleration ──────────────────────────────────────────────────────────

/** KG: "the rate of change of velocity with respect to time." A cart from rest, a = 0.5 m/s², marked each second. */
export const ACC = { a: 0.5, x0: -3, T: 4 }
export function accPosition(t: number): number { return ACC.x0 + 0.5 * ACC.a * t * t }
export function accVelocity(t: number): number { return ACC.a * t }
export function buildAccelerationScene(): SceneSpec {
  const X = (u: number) => u * 0.95, Y = -0.4, VS = 1.2, ts = Array.from({ length: ACC.T + 1 }, (_, i) => i)
  return {
    id: 'phys-acceleration',
    title: 'Acceleration: velocity changing',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show acceleration on a number line: a cart starting from rest with a = 0.5 m/s² is marked each second — the gaps grow because its velocity grows by the same 0.5 m/s every second.',
    ariaLabel: 'A number line with a cart\'s position marked each second. The marks get further apart. Above each mark an arrow shows the velocity, growing steadily longer.',
    steps: [
      { narration: 'A cart starts from rest. Its position is marked every second: the gaps grow.', objects: [...numberLine(-4, 4, Y, X), ...ts.map((t) => dot(P(X(accPosition(t)), Y), ROLE.output, 0.13)), label('t = 0 s', P(X(accPosition(0)) - 0.2, Y - 0.5), ROLE.ink, 'detail'), label(`t = ${ACC.T} s`, P(X(accPosition(ACC.T)), Y - 0.5), ROLE.ink, 'detail'), label('position x (m)', P(X(3.4), Y - 1.1), ROLE.ink, 'detail')] },
      { narration: `Its velocity at each mark is at: ${ts.map((t) => accVelocity(t)).join(', ')} m/s. Each arrow is ${ACC.a} m/s longer than the last.`, objects: [...ts.filter((t) => t > 0).flatMap((t) => [line(P(X(accPosition(t)), Y), P(X(accPosition(t)), Y + 0.1 + 0.45 * t), ROLE.aid, 0.012), arrow(P(X(accPosition(t)), Y + 0.1 + 0.45 * t), P(X(accPosition(t)) + VS * accVelocity(t), Y + 0.1 + 0.45 * t), ROLE.input)]), label(`v grows by ${ACC.a} m/s each second`, P(X(0), Y + 2.6), ROLE.input, 'detail')] },
      { narration: 'Acceleration is how fast the velocity changes: the change in velocity divided by the time taken.', objects: [label(`a = Δv/Δt = ${accVelocity(ACC.T)} m/s / ${ACC.T} s = ${ACC.a} m/s²`, P(0, 3.4), ROLE.result, 'primary')] },
    ],
  }
}

// ── 4. Relative motion ───────────────────────────────────────────────────────

/** KG: "the velocity … of one object as observed from a moving reference frame." A walker in a train; an oncoming car. */
export const REL = { train: 20, walker: 5, car: -15 }
export function relativeVelocity(vA: number, vB: number): number { return vA - vB }
export function buildRelativeMotionScene(): SceneSpec {
  const O = 0.3, S = 0.13, X = (v: number) => O + v * S
  const rows = { train: 2.2, ground: 1.2, car: -0.8, seen: -1.8 }
  const walkerGround = REL.train + REL.walker, carSeen = relativeVelocity(REL.car, REL.train)
  return {
    id: 'phys-relative-motion',
    title: 'Relative motion',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show velocities adding and subtracting between frames on a velocity number line: a walker at +5 m/s inside a train at +20 m/s moves at +25 m/s over the ground, and a car at −15 m/s is seen from the train at −35 m/s.',
    ariaLabel: 'Velocity arrows on a number line in metres per second. The train\'s arrow reaches 20, and the walker\'s 5 is added tip to tail to make 25 over the ground. Below, a car\'s arrow points to minus 15, and seen from the train it becomes minus 35.',
    steps: [
      { narration: `A train moves at +${REL.train} m/s. Inside it, a passenger walks forward at +${REL.walker} m/s relative to the train.`, objects: [...numberLine(-35, 25, -2.9, X, 10), label('velocity (m/s)', P(X(15), -3.45), ROLE.ink, 'detail'), line(P(O, -2.9), P(O, 2.8), ROLE.reference, 0.015), arrow(P(X(0), rows.train), P(X(REL.train), rows.train), ROLE.input), arrow(P(X(REL.train), rows.train), P(X(walkerGround), rows.train), ROLE.aid), label(`train: +${REL.train} m/s, walker: +${REL.walker} m/s`, P(X(-14), rows.train), ROLE.input, 'detail')] },
      { narration: `Seen from the ground the two add: ${REL.train} + ${REL.walker} = ${walkerGround} m/s.`, objects: [arrow(P(X(0), rows.ground), P(X(walkerGround), rows.ground), ROLE.output), label(`walker over ground: +${walkerGround} m/s`, P(X(-14), rows.ground), ROLE.output, 'detail')] },
      { narration: `A car comes the other way at ${REL.car} m/s. From the train it seems to approach at ${REL.car} − ${REL.train} = ${carSeen} m/s: the velocity of A relative to B is v_A − v_B.`, objects: [arrow(P(X(0), rows.car), P(X(REL.car), rows.car), ROLE.input), label(`car: ${sgn(REL.car)} m/s`, P(X(8), rows.car), ROLE.input, 'detail'), arrow(P(X(0), rows.seen), P(X(carSeen), rows.seen), ROLE.result), label(`seen from train: ${sgn(REL.car)} − ${REL.train} = ${sgn(carSeen)} m/s`, P(0.4, 3.5), ROLE.result, 'primary')] },
    ],
  }
}

// ── 5. Tension ───────────────────────────────────────────────────────────────

/** KG: "the pulling force transmitted through a string or rope connecting objects." Two blocks on a smooth table pulled by F. */
export const TOW = { F: 24, m1: 4, m2: 2 }
export function towAcceleration(): number { return TOW.F / (TOW.m1 + TOW.m2) }
export function towTension(): number { return TOW.m2 * towAcceleration() }
export function buildTensionScene(): SceneSpec {
  const a = towAcceleration(), T = towTension(), s = 0.08, YT = -1.0, RY = -0.4
  return {
    id: 'phys-tension',
    title: 'Tension in a rope',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show tension as the force a rope transmits: pulling two blocks (4 kg and 2 kg) with 24 N gives both a = 4 m/s², so the rope must pull the rear block with T = m₂a = 8 N — and pulls back on the front block with the same 8 N.',
    ariaLabel: 'Two blocks on a smooth table joined by a rope. A 24 newton force pulls the front block to the right. At each end of the rope a tension arrow of 8 newtons points into the rope\'s length: right on the rear block, left on the front block.',
    steps: [
      { narration: `A ${TOW.F} N pull drags a ${TOW.m1} kg block, which drags a ${TOW.m2} kg block by a rope. Both accelerate together at F/(m₁ + m₂) = ${a} m/s².`, objects: [line(P(-4.4, YT - 0.03), P(4.4, YT - 0.03), ROLE.reference, 0.05), ...rect(-3.8, YT, -2.4, YT + 1.2, ROLE.ink), ...rect(0.4, YT, 2.4, YT + 1.6, ROLE.ink), line(P(-2.4, RY), P(0.4, RY), ROLE.ink, 0.03), arrow(P(2.4, RY + 0.2), P(2.4 + s * TOW.F, RY + 0.2), ROLE.input), label(`F = ${TOW.F} N`, P(2.4 + s * TOW.F / 2 + 0.2, RY + 0.75), ROLE.input, 'detail'), label(`m₂ = ${TOW.m2} kg`, P(-3.1, YT - 0.5), ROLE.ink, 'detail'), label(`m₁ = ${TOW.m1} kg`, P(1.4, YT - 0.5), ROLE.ink, 'detail')] },
      { narration: `The rope is the only thing pulling the rear block, so the tension must give it a = ${a} m/s²: T = m₂a = ${T} N. The same tension pulls the front block backwards.`, objects: [arrow(P(-2.4, RY + 0.35), P(-2.4 + s * T, RY + 0.35), ROLE.output), arrow(P(0.4, RY + 0.35), P(0.4 - s * T, RY + 0.35), ROLE.output), label('T', P(-2.4 + s * T / 2, RY + 0.8), ROLE.output, 'detail'), label('T', P(0.4 - s * T / 2, RY + 0.8), ROLE.output, 'detail')] },
      { narration: `Check the front block: F − T = ${TOW.F} − ${T} = ${TOW.F - T} N = m₁a = ${TOW.m1} × ${a}. A light rope transmits the same tension along its whole length.`, objects: [label(`T = m₂a = ${TOW.m2} × ${a} = ${T} N`, P(0, 3.2), ROLE.result, 'primary'), label(`a = F/(m₁ + m₂) = ${a} m/s²`, P(0, -2.6), ROLE.ink, 'detail')] },
    ],
  }
}

// ── 6. Conservative forces ───────────────────────────────────────────────────

/**
 * KG: "Conservative forces do path-independent work …; non-conservative forces
 * dissipate energy." A 2 kg box moved from A up to B (3 m higher) along a
 * straight ramp and along a curved route: gravity's work is the same, friction's
 * (a constant 4 N) depends on the path length.
 */
export const CONS = { m: 2, g: 9.8, A: [-3, -2.5] as const, B: [1, 0.5] as const, via: [-3.8, 2.4] as const, f: 4 }
export function curvedPath(n = 60): Array<[number, number]> {
  const [ax, ay] = CONS.A, [bx, by] = CONS.B, [cx, cy] = CONS.via
  return Array.from({ length: n + 1 }, (_, i) => { const t = i / n, u = 1 - t; return [u * u * ax + 2 * u * t * cx + t * t * bx, u * u * ay + 2 * u * t * cy + t * t * by] })
}
export function pathLength(pts: Array<[number, number]>): number { let L = 0; for (let i = 1; i < pts.length; i++) L += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); return L }
export function gravityWork(): number { return -CONS.m * CONS.g * (CONS.B[1] - CONS.A[1]) }
export function buildConservativeForcesScene(): SceneSpec {
  const straight: Array<[number, number]> = [[CONS.A[0], CONS.A[1]], [CONS.B[0], CONS.B[1]]], curved = curvedPath()
  const Ls = pathLength(straight), Lc = pathLength(curved), Wg = gravityWork()
  return {
    id: 'phys-conservative-forces',
    title: 'Conservative and non-conservative forces',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show path independence: moving a 2 kg box from A to B, 3 m higher, gravity does −58.8 J by either route (it is conservative, with a potential energy), while friction does more negative work on the longer route (it is not).',
    ariaLabel: 'Two routes from point A up to point B: a straight ramp 5 metres long and a longer curved route. Gravity\'s work is the same on both, minus 58.8 joules. Friction\'s work is minus 20 joules on the ramp and more on the curve.',
    steps: [
      { narration: `Move a ${CONS.m} kg box from A to B, ${CONS.B[1] - CONS.A[1]} m higher — by the straight ramp (${r2(Ls)} m) or by the curved route (${r2(Lc)} m).`, objects: [dot(P(CONS.A[0], CONS.A[1]), ROLE.ink, 0.16), dot(P(CONS.B[0], CONS.B[1]), ROLE.ink, 0.16), label('A', P(CONS.A[0] - 0.4, CONS.A[1] - 0.3), ROLE.ink, 'detail'), label('B', P(CONS.B[0] + 0.4, CONS.B[1] + 0.2), ROLE.ink, 'detail'), line(P(CONS.A[0], CONS.A[1]), P(CONS.B[0], CONS.B[1]), ROLE.output, 0.04), curve(curved.map(([x, y]) => P(x, y)), ROLE.input), line(P(CONS.B[0] + 0.8, CONS.A[1]), P(CONS.B[0] + 0.8, CONS.B[1]), ROLE.aid, 0.02), label(`Δh = ${CONS.B[1] - CONS.A[1]} m`, P(CONS.B[0] + 1.7, (CONS.A[1] + CONS.B[1]) / 2), ROLE.aid, 'detail')] },
      { narration: `Gravity only cares about the height change: W = −mgΔh = ${neg1(Wg)} J on both routes. That is what makes it conservative, and why it has a potential energy mgh.`, objects: [label(`W_gravity = −mgΔh = ${neg1(Wg)} J (either route)`, P(0.4, 3.5), ROLE.result, 'primary')] },
      { narration: `Friction (${CONS.f} N) works against the motion the whole way, so its work grows with the distance travelled: ${neg1(-CONS.f * Ls)} J on the ramp, ${neg1(-CONS.f * Lc)} J on the curve. That energy is lost as heat — friction is non-conservative.`, objects: [label(`friction: ${neg1(-CONS.f * Ls)} J`, P(1.2, -1.6), ROLE.output, 'detail'), label(`friction: ${neg1(-CONS.f * Lc)} J`, P(-2.6, 2.6), ROLE.input, 'detail')] },
    ],
  }
}

// ── 7. Angular momentum ──────────────────────────────────────────────────────

/** KG: "the rotational analogue of linear momentum, equal to the product of moment of inertia and angular velocity." */
export const SPIN = { m: 0.5, r: 2, v: 3 }
export function angularMomentum(): { I: number; w: number; L: number } { const I = SPIN.m * SPIN.r * SPIN.r, w = SPIN.v / SPIN.r; return { I, w, L: I * w } }
export function buildAngularMomentumScene(): SceneSpec {
  const C: [number, number] = [-0.6, -0.4], R = 1.3 * SPIN.r, { I, w, L } = angularMomentum()
  const pos: [number, number] = [C[0] + R * Math.cos(Math.PI / 4), C[1] + R * Math.sin(Math.PI / 4)]
  const tan: [number, number] = [-Math.sin(Math.PI / 4), Math.cos(Math.PI / 4)]
  return {
    id: 'phys-angular-momentum',
    title: 'Angular momentum',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show angular momentum for a mass whirled in a circle: L = mvr, which is the same as Iω with I = mr² and ω = v/r — here 3 kg·m²/s, pointing out of the page by the right-hand rule.',
    ariaLabel: 'A mass on a string moving round a circle of radius 2 metres at 3 metres per second, anticlockwise. The radius and the tangential velocity are drawn. At the centre, a symbol shows the angular momentum pointing out of the page.',
    steps: [
      { narration: `A ${SPIN.m} kg mass on a ${SPIN.r} m string moves round a circle at ${SPIN.v} m/s.`, objects: [curve(circlePoints(C[0], C[1], R, 0, 2 * Math.PI, 64), ROLE.reference), line(P(C[0], C[1]), P(pos[0], pos[1]), ROLE.ink, 0.03), dot(P(pos[0], pos[1]), ROLE.output, 0.22), arrow(P(pos[0], pos[1]), P(pos[0] + 1.3 * tan[0], pos[1] + 1.3 * tan[1]), ROLE.input), label(`r = ${SPIN.r} m`, P((C[0] + pos[0]) / 2 + 0.5, (C[1] + pos[1]) / 2 - 0.3), ROLE.ink, 'detail'), label(`v = ${SPIN.v} m/s`, P(pos[0] + 1.3 * tan[0] - 0.6, pos[1] + 1.3 * tan[1] + 0.35), ROLE.input, 'detail'), label(`m = ${SPIN.m} kg`, P(pos[0] + 0.9, pos[1] - 0.3), ROLE.output, 'detail')] },
      { narration: `Angular momentum is L = mvr. Written for rotation, I = mr² = ${I} kg·m² and ω = v/r = ${w} rad/s, so L = Iω — the same number.`, objects: [...rotationArrow(C[0], C[1], 0.7, 0.2, 5.2, ROLE.aid), dot(P(C[0], C[1]), ROLE.result, 0.12), label('L out of the page', P(C[0], C[1] - 1.0), ROLE.result, 'detail')] },
      { narration: 'Its direction is along the axis, by the right-hand rule: curl your fingers with the motion and your thumb points out of the page.', objects: [label(`L = Iω = ${I} × ${w} = ${L} kg·m²/s`, P(0, 3.6), ROLE.result, 'primary')] },
    ],
  }
}

// ── 8. Conservation of angular momentum ──────────────────────────────────────

/** KG: "total angular momentum … remains constant when no net external torque acts." A skater pulls in her arms. */
export const SKATER = { I1: 4, w1: 2, I2: 1.6 }
export function skaterSpin(): { w2: number; L: number; K1: number; K2: number } {
  const L = SKATER.I1 * SKATER.w1, w2 = L / SKATER.I2
  return { w2, L, K1: 0.5 * SKATER.I1 * SKATER.w1 ** 2, K2: 0.5 * SKATER.I2 * w2 ** 2 }
}
export function buildAngularMomentumConservationScene(): SceneSpec {
  const { w2, L, K1, K2 } = skaterSpin(), LC: [number, number] = [-2.3, -0.3], RC: [number, number] = [2.4, -0.3]
  const R1 = 0.9 * Math.sqrt(SKATER.I1), R2 = 0.9 * Math.sqrt(SKATER.I2)
  return {
    id: 'phys-angular-momentum-conservation',
    title: 'Conservation of angular momentum',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show a spinning skater (seen from above) pulling in her arms: with no external torque L = Iω stays 8 kg·m²/s, so as I falls from 4 to 1.6 kg·m² her spin rises from 2 to 5 rad/s.',
    ariaLabel: 'Two top views of a spinning skater. Left: arms out, a wide circle, spinning at 2 radians per second. Right: arms in, a small circle, spinning at 5 radians per second. The same angular momentum, 8, is written under both.',
    steps: [
      { narration: `Seen from above, a skater spins with arms out: I = ${SKATER.I1} kg·m², ω = ${SKATER.w1} rad/s.`, objects: [curve(circlePoints(LC[0], LC[1], R1, 0, 2 * Math.PI, 48), ROLE.reference), line(P(LC[0] - R1, LC[1]), P(LC[0] + R1, LC[1]), ROLE.ink, 0.05), dot(P(LC[0], LC[1]), ROLE.ink, 0.25), ...rotationArrow(LC[0], LC[1], R1 + 0.3, 0.3, 2.4, ROLE.input), label(`arms out: ω = ${SKATER.w1} rad/s`, P(LC[0], LC[1] - R1 - 0.6), ROLE.input, 'detail')] },
      { narration: `She pulls her arms in: I drops to ${SKATER.I2} kg·m². No outside torque acts, so L cannot change — ω must rise to L/I = ${w2} rad/s.`, objects: [curve(circlePoints(RC[0], RC[1], R2, 0, 2 * Math.PI, 36), ROLE.reference), line(P(RC[0] - R2, RC[1]), P(RC[0] + R2, RC[1]), ROLE.ink, 0.05), dot(P(RC[0], RC[1]), ROLE.ink, 0.25), ...rotationArrow(RC[0], RC[1], R2 + 0.3, 0.3, 5.4, ROLE.output), label(`arms in: ω = ${w2} rad/s`, P(RC[0], RC[1] - R1 - 0.6), ROLE.output, 'detail')] },
      { narration: `L is the same before and after. Her kinetic energy is not: ½Iω² goes from ${K1} J to ${K2} J — the work her arms did pulling in.`, objects: [label(`I₁ω₁ = I₂ω₂: ${SKATER.I1} × ${SKATER.w1} = ${SKATER.I2} × ${w2} = ${L}`, P(0, 3.3), ROLE.result, 'primary'), label(`kinetic energy: ${K1} J → ${K2} J`, P(0, -3.4), ROLE.ink, 'detail')] },
    ],
  }
}

// ── 9. Thermodynamic processes ───────────────────────────────────────────────

/** KG: "isothermal, adiabatic, isobaric, isochoric." Four processes from one state (1.5 L, 4 atm) on a P–V diagram; γ = 1.4. */
export const TP = { V0: 1.5, P0: 4, V1: 4, gamma: 1.4, Pv: 1 }
export function isothermalP(V: number): number { return (TP.P0 * TP.V0) / V }
export function adiabaticP(V: number): number { return TP.P0 * (TP.V0 / V) ** TP.gamma }
export function buildThermoProcessesScene(): SceneSpec {
  const X = (V: number) => -3.5 + (V - 1) * 1.7, Y = (p: number) => -2.6 + p * 1.2
  const A = P(X(TP.V0), Y(TP.P0))
  return {
    id: 'phys-thermo-processes',
    title: 'Thermodynamic processes',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show the four standard processes leaving one state on a P–V diagram: isobaric (constant P), isochoric (constant V), isothermal (PV constant) and adiabatic (PV^γ constant, falling more steeply because no heat enters).',
    ariaLabel: 'A pressure against volume graph with four paths leaving one starting state: a horizontal line (constant pressure), a vertical line (constant volume), a curve (constant temperature) and a steeper curve (no heat exchanged).',
    steps: [
      { narration: `A gas starts at ${TP.V0} L and ${TP.P0} atm. Two simple processes: keep the pressure fixed (isobaric) or keep the volume fixed (isochoric).`, objects: [arrow(P(X(1), Y(0)), P(X(5) + 0.3, Y(0)), ROLE.reference), arrow(P(X(1), Y(0)), P(X(1), Y(4.8)), ROLE.reference), label('V (L)', P(X(5), Y(0) - 0.5), ROLE.ink, 'detail'), label('P (atm)', P(X(1) + 0.7, Y(4.8) + 0.35), ROLE.ink, 'detail'), dot(A, ROLE.ink, 0.14), line(A, P(X(TP.V1), Y(TP.P0)), ROLE.aid, 0.04), line(A, P(X(TP.V0), Y(TP.Pv)), ROLE.reference, 0.04), label('isobaric', P(X(TP.V1) + 0.8, Y(TP.P0)), ROLE.aid, 'detail'), label('isochoric', P(X(TP.V0) - 0.9, Y(TP.Pv) + 0.3), ROLE.ink, 'detail')] },
      { narration: `Isothermal: the temperature stays fixed, so PV stays ${TP.P0 * TP.V0}; at ${TP.V1} L the pressure is ${r2(isothermalP(TP.V1))} atm.`, objects: [curve(fnPath((x) => Y(isothermalP((x - X(1)) / 1.7 + 1)), X(TP.V0), X(TP.V1), 50), ROLE.output), label('isothermal', P(X(TP.V1) + 0.9, Y(isothermalP(TP.V1))), ROLE.output, 'detail')] },
      { narration: `Adiabatic: no heat enters, so the gas cools as it expands and the pressure falls faster — PV^γ stays fixed, reaching ${r2(adiabaticP(TP.V1))} atm.`, objects: [curve(fnPath((x) => Y(adiabaticP((x - X(1)) / 1.7 + 1)), X(TP.V0), X(TP.V1), 50), ROLE.input), label('adiabatic', P(X(TP.V1) + 0.9, Y(adiabaticP(TP.V1)) - 0.25), ROLE.input, 'detail'), label(`isothermal: PV = ${TP.P0 * TP.V0} atm·L = const`, P(0.4, 3.5), ROLE.result, 'primary')] },
    ],
  }
}

// ── 10. The Carnot cycle ─────────────────────────────────────────────────────

/**
 * KG: "the most efficient possible heat engine cycle operating between two
 * fixed temperature reservoirs." A monatomic ideal gas (γ = 5/3, nR chosen so
 * PV = T/100): isotherms at 500 K and 300 K joined by two adiabats.
 */
export const CARNOT = { Th: 500, Tc: 300, gamma: 5 / 3, V1: 1, V2: 3, k: 0.01 }
export function carnotStates(): Array<[number, number]> {
  const { Th, Tc, gamma, V1, V2, k } = CARNOT, f = (Th / Tc) ** (1 / (gamma - 1)), V3 = V2 * f, V4 = V1 * f
  return [[V1, k * Th / V1], [V2, k * Th / V2], [V3, k * Tc / V3], [V4, k * Tc / V4]]
}
export function carnotEfficiency(): number { return 1 - CARNOT.Tc / CARNOT.Th }
export function buildCarnotScene(): SceneSpec {
  const X = (V: number) => -3.6 + V * 1.0, Y = (p: number) => -2.6 + p * 1.0, { Th, Tc, gamma, k } = CARNOT
  const st = carnotStates()
  const iso = (T: number, a: number, b: number) => fnPath((x) => Y((k * T) / (x + 3.6)), X(a), X(b), 40)
  const adi = (s: [number, number], e: [number, number]) => fnPath((x) => Y(s[1] * (s[0] / (x + 3.6)) ** gamma), X(s[0]), X(e[0]), 40)
  return {
    id: 'phys-carnot',
    title: 'The Carnot cycle',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show the Carnot cycle on a P–V diagram: heat Q_h is taken in along the hot isotherm, released as Q_c along the cold one, with two adiabats between — and its efficiency depends only on the two temperatures, η = 1 − T_c/T_h.',
    ariaLabel: 'A closed loop on a pressure against volume graph made of four curves: an upper curve at 500 kelvin where heat flows in, a steep curve down, a lower curve at 300 kelvin where heat flows out, and a steep curve back up.',
    steps: [
      { narration: `Hot isotherm at ${Th} K: the gas expands, taking in heat Q_h. Then an adiabat: it keeps expanding with no heat flow and cools to ${Tc} K.`, objects: [arrow(P(X(0), Y(0)), P(X(6.9) + 0.2, Y(0)), ROLE.reference), arrow(P(X(0), Y(0)), P(X(0), Y(5.3)), ROLE.reference), label('V', P(X(6.9), Y(0) - 0.45), ROLE.ink, 'detail'), label('P', P(X(0) + 0.4, Y(5.3) + 0.3), ROLE.ink, 'detail'), curve(iso(Th, st[0][0], st[1][0]), ROLE.input), curve(adi(st[1], st[2]), ROLE.reference), ...st.map(([V, p]) => dot(P(X(V), Y(p)), ROLE.ink, 0.1)), label(`T_h = ${Th} K: heat in`, P(X(2) + 1.8, Y((k * Th) / 2) + 0.35), ROLE.input, 'detail')] },
      { narration: `Cold isotherm at ${Tc} K: the gas is compressed, giving out heat Q_c. A final adiabat heats it back to ${Th} K, closing the loop.`, objects: [curve(iso(Tc, st[3][0], st[2][0]), ROLE.output), curve(adi(st[3], st[0]), ROLE.reference), label(`T_c = ${Tc} K: heat out`, P(X(4.3), Y(0) - 0.5), ROLE.output, 'detail')] },
      { narration: `The enclosed area is the work done each cycle. No engine between these two temperatures can beat the Carnot efficiency, 1 − T_c/T_h = ${carnotEfficiency()}.`, objects: [label(`η = 1 − T_c/T_h = 1 − ${Tc}/${Th} = ${carnotEfficiency()}`, P(0.6, 3.4), ROLE.result, 'primary')] },
    ],
  }
}

// ── 11. Resistivity ──────────────────────────────────────────────────────────

/** KG: "a material property relating resistance to geometry." Copper wire, ρ = 1.68×10⁻⁸ Ω·m; doubling L or A. */
export const WIRE = { rho: 1.68e-8, L: 10, A: 1e-6 }
export function resistance(rho: number, L: number, A: number): number { return (rho * L) / A }
export function buildResistivityScene(): SceneSpec {
  const cases = [
    { L: WIRE.L, A: WIRE.A, y: 2.0, name: 'L, A' },
    { L: 2 * WIRE.L, A: WIRE.A, y: 0.3, name: '2L, A' },
    { L: WIRE.L, A: 2 * WIRE.A, y: -1.5, name: 'L, 2A' },
  ].map((c) => ({ ...c, R: resistance(WIRE.rho, c.L, c.A) }))
  const X0 = -3.8, SL = 0.3, TH = (A: number) => 0.12 * (A / WIRE.A)
  return {
    id: 'phys-resistivity',
    title: 'Resistivity: resistance from shape',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show R = ρL/A with three copper wires: 10 m of 1 mm² wire has 0.17 Ω; doubling the length doubles the resistance; doubling the cross-section halves it. ρ belongs to the material, not the wire.',
    ariaLabel: 'Three copper wires drawn as bars. The top one is the reference, 0.17 ohms. The middle one is twice as long, 0.34 ohms. The bottom one is twice as thick, 0.08 ohms.',
    steps: [
      { narration: `A copper wire ${WIRE.L} m long with a 1 mm² cross-section. Copper's resistivity is ρ = 1.68×10⁻⁸ Ω·m, so R = ρL/A = ${r2(cases[0].R)} Ω.`, objects: [line(P(X0, cases[0].y), P(X0 + SL * cases[0].L, cases[0].y), ROLE.output, TH(cases[0].A)), label(`${cases[0].name}: R = ${r2(cases[0].R)} Ω`, P(X0 + SL * cases[0].L + 1.9, cases[0].y), ROLE.output, 'detail')] },
      { narration: `Twice as long: the charge has twice as far to push, so R doubles to ${r2(cases[1].R)} Ω.`, objects: [line(P(X0, cases[1].y), P(X0 + SL * cases[1].L, cases[1].y), ROLE.input, TH(cases[1].A)), label(`${cases[1].name}: R = ${r2(cases[1].R)} Ω`, P(X0 + SL * cases[1].L - 1.4, cases[1].y - 0.55), ROLE.input, 'detail')] },
      { narration: `Twice the cross-section: twice as many paths side by side, so R halves to ${r2(cases[2].R)} Ω. The resistivity ρ stays the same in all three — it is a property of copper.`, objects: [line(P(X0, cases[2].y), P(X0 + SL * cases[2].L, cases[2].y), ROLE.aid, TH(cases[2].A)), label(`${cases[2].name}: R = ${r2(cases[2].R)} Ω`, P(X0 + SL * cases[2].L + 1.9, cases[2].y), ROLE.aid, 'detail'), label('R = ρL/A = 1.68×10⁻⁸ × 10 / 10⁻⁶ = 0.17 Ω', P(0.2, 3.5), ROLE.result, 'primary')] },
    ],
  }
}

// ── 12. EMF and internal resistance ──────────────────────────────────────────

/** KG: "terminal voltage is reduced by the voltage drop across internal resistance." E = 12 V, r = 0.5 Ω, R = 5.5 Ω. */
export const CELL = { E: 12, r: 0.5, R: 5.5 }
export function cellCurrent(): number { return CELL.E / (CELL.R + CELL.r) }
export function terminalVoltage(): number { return CELL.E - cellCurrent() * CELL.r }
export function buildEmfScene(): SceneSpec {
  const I = cellCurrent(), V = terminalVoltage(), L = -3.2, Rt = 2.6, T = 1.6, B = -2.2
  return {
    id: 'phys-emf',
    title: 'EMF and internal resistance',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show a real cell as an ideal EMF with a small internal resistance r inside it: with E = 12 V, r = 0.5 Ω and a 5.5 Ω load, I = E/(R + r) = 2 A, so 1 V is lost inside and the terminals give only V = E − Ir = 11 V.',
    ariaLabel: 'A circuit. On the left, inside a dashed box, a cell of 12 volts in series with a small internal resistance of half an ohm. On the right, a 5.5 ohm load resistor. The current is 2 amps and the voltage across the terminals is 11 volts.',
    steps: [
      { narration: `A real cell: an ideal EMF E = ${CELL.E} V with an internal resistance r = ${CELL.r} Ω inside it (the dashed box is the cell's casing).`, objects: [line(P(L, B), P(L, -1.2), ROLE.ink, 0.03), line(P(L - 0.45, -1.2), P(L + 0.45, -1.2), ROLE.ink, 0.03), line(P(L - 0.25, -1.45), P(L + 0.25, -1.45), ROLE.ink, 0.07), line(P(L, -1.45), P(L, -0.9), ROLE.ink, 0.03), curve(zigzag(L, -0.9, L, 0.6, 4, 0.15), ROLE.input), line(P(L, 0.6), P(L, T), ROLE.ink, 0.03), ...[[L - 0.8, -1.9, L + 0.8, -1.9], [L + 0.8, -1.9, L + 0.8, 0.9], [L + 0.8, 0.9, L - 0.8, 0.9], [L - 0.8, 0.9, L - 0.8, -1.9]].map(([a, b, c, d]) => line(P(a, b), P(c, d), ROLE.aid, 0.015)), label(`E = ${CELL.E} V`, P(L - 1.7, -1.3), ROLE.ink, 'detail'), label(`r = ${CELL.r} Ω`, P(L - 1.6, -0.1), ROLE.input, 'detail')] },
      { narration: `Connect a ${CELL.R} Ω load. The same current flows through r and R: I = E/(R + r) = ${CELL.E}/${CELL.R + CELL.r} = ${I} A.`, objects: [line(P(L, T), P(Rt, T), ROLE.ink, 0.03), line(P(Rt, T), P(Rt, 0.6), ROLE.ink, 0.03), curve(zigzag(Rt, 0.6, Rt, -1.2, 5, 0.2), ROLE.output), line(P(Rt, -1.2), P(Rt, B), ROLE.ink, 0.03), line(P(Rt, B), P(L, B), ROLE.ink, 0.03), arrow(P(-0.8, T + 0.35), P(0.6, T + 0.35), ROLE.output), label(`R = ${CELL.R} Ω`, P(Rt + 1.1, -0.3), ROLE.output, 'detail'), label(`I = E/(R + r) = ${I} A`, P(0, T + 0.85), ROLE.output, 'detail')] },
      { narration: `Ir = ${I * CELL.r} V is used up inside the cell, so the voltage at its terminals is only ${V} V. Draw more current and the terminal voltage sags further.`, objects: [label(`V = E − Ir = ${CELL.E} − ${I} × ${CELL.r} = ${V} V`, P(0, 3.4), ROLE.result, 'primary')] },
    ],
  }
}

// ── 13. The Schrödinger equation ─────────────────────────────────────────────

/**
 * KG: "iℏ∂ψ/∂t = Ĥψ governs the time evolution of the quantum wave function."
 * An equal mix of the two lowest states of a box: |ψ|² sloshes from one side
 * to the other with period T = 2πℏ/(E₂ − E₁) (here in units where that is 1).
 */
export function boxPhi(n: number, x: number): number { return Math.SQRT2 * Math.sin(n * Math.PI * x) }
/** |ψ(x, t)|² for (φ₁ + φ₂)/√2, with t in units of the sloshing period. */
export function mixDensity(x: number, t: number): number { const a = boxPhi(1, x), b = boxPhi(2, x); return (a * a + b * b + 2 * a * b * Math.cos(2 * Math.PI * t)) / 2 }
export function buildSchrodingerScene(): SceneSpec {
  const X = (x: number) => -3.4 + 6.8 * x, Y0 = -2.4, SY = 0.95
  const dens = (t: number) => fnPath((u) => Y0 + SY * mixDensity((u + 3.4) / 6.8, t), X(0), X(1), 80)
  const stationary = fnPath((u) => Y0 + SY * boxPhi(1, (u + 3.4) / 6.8) ** 2, X(0), X(1), 60)
  return {
    id: 'phys-schrodinger',
    title: 'The time-dependent Schrödinger equation',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show what iℏ∂ψ/∂t = Ĥψ does: a single energy state keeps the same probability density for ever, but a mix of the two lowest states of a box sloshes from one side to the other, with period T = 2πℏ/(E₂ − E₁).',
    ariaLabel: 'A box with two walls. A grey hump is the unchanging density of the lowest energy state. A blue curve peaked on the left is a mixed state at time zero; half a period later, a red curve peaked on the right.',
    steps: [
      { narration: 'A particle in a box. In a single energy state, the Schrödinger equation only turns the phase of ψ: |ψ|² never changes.', objects: [line(P(X(0), Y0), P(X(0), 2.6), ROLE.ink, 0.06), line(P(X(1), Y0), P(X(1), 2.6), ROLE.ink, 0.06), line(P(X(0), Y0), P(X(1), Y0), ROLE.reference, 0.03), curve(stationary, ROLE.reference), label('position x', P(X(1) - 0.9, Y0 - 0.5), ROLE.ink, 'detail'), label('one state: |ψ|² fixed', P(X(0.5), Y0 + SY * 2 + 0.3), ROLE.ink, 'detail')] },
      { narration: 'Mix the two lowest states equally. At t = 0 they add on the left and cancel on the right.', objects: [curve(dens(0), ROLE.output), label('t = 0', P(X(0.2) - 0.3, Y0 + SY * mixDensity(0.3, 0) + 0.35), ROLE.output, 'detail')] },
      { narration: 'Each part turns its phase at its own rate, E/ℏ. Half a period later the peak has moved to the right; after a full period it is back. The equation that makes this happen: iℏ∂ψ/∂t = Ĥψ.', objects: [curve(dens(0.5), ROLE.input), label('t = T/2', P(X(0.8) + 0.3, Y0 + SY * mixDensity(0.7, 0.5) + 0.35), ROLE.input, 'detail'), label('T = 2πℏ/(E₂ − E₁)', P(0.6, 3.5), ROLE.result, 'primary'), label('iℏ ∂ψ/∂t = Ĥψ', P(-2.4, 3.5), ROLE.ink, 'detail')] },
    ],
  }
}

// ── 14. Selection rules ──────────────────────────────────────────────────────

/** KG: "Selection rules restrict which quantum transitions are allowed." Hydrogen n = 1–3; electric-dipole rule Δl = ±1. */
export const LEVELS = [
  { n: 1, l: 0, name: '1s' }, { n: 2, l: 0, name: '2s' }, { n: 2, l: 1, name: '2p' },
  { n: 3, l: 0, name: '3s' }, { n: 3, l: 1, name: '3p' }, { n: 3, l: 2, name: '3d' },
]
export function hydrogenE(n: number): number { return -13.6 / (n * n) }
export function allowedTransition(la: number, lb: number): boolean { return Math.abs(la - lb) === 1 }
export const TRANSITIONS: Array<[string, string]> = [['2p', '1s'], ['3p', '1s'], ['3s', '2p'], ['3d', '2p'], ['3p', '2s'], ['2s', '1s'], ['3d', '1s']]
export function buildSelectionRulesScene(): SceneSpec {
  // Levels spaced by n, not by energy: n = 2 and 3 sit 0.76 eV apart against a 10.2 eV gap, so a true scale would stack them.
  const X = (l: number) => -2.6 + l * 2.6, LY: Record<number, number> = { 1: -2.6, 2: 0.0, 3: 2.2 }, Y = (E: number) => LY[Math.round(Math.sqrt(-13.6 / E))]
  const at = (name: string) => LEVELS.find((v) => v.name === name)!
  const pos = (name: string, dx = 0): V3 => { const v = at(name); return P(X(v.l) + dx, Y(hydrogenE(v.n))) }
  const lyman = hydrogenE(2) - hydrogenE(1)
  const tr = (a: string, b: string, i: number) => {
    const ok = allowedTransition(at(a).l, at(b).l), off = -0.5 + 0.25 * (i % 5)
    return arrow(pos(a, off), pos(b, off + (ok ? 0 : 0.2)), ok ? ROLE.output : ROLE.input)
  }
  return {
    id: 'phys-selection-rules',
    title: 'Selection rules',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show the electric-dipole selection rule on hydrogen\'s levels: a photon carries one unit of angular momentum, so only jumps with Δl = ±1 happen (2p → 1s, 3d → 2p …); 2s → 1s and 3d → 1s are forbidden.',
    ariaLabel: 'Hydrogen energy levels in columns for s, p and d orbitals. Blue arrows join levels in neighbouring columns: allowed transitions. Red arrows join levels in the same column or two columns apart: forbidden transitions.',
    steps: [
      { narration: 'Hydrogen\'s levels up to n = 3, arranged in columns by orbital angular momentum l (s = 0, p = 1, d = 2). Energies are −13.6 eV/n².', objects: [...LEVELS.map((v) => line(P(X(v.l) - 0.8, Y(hydrogenE(v.n))), P(X(v.l) + 0.8, Y(hydrogenE(v.n))), ROLE.ink, 0.05)), ...LEVELS.map((v) => label(v.name, P(X(v.l) + 1.25, Y(hydrogenE(v.n))), ROLE.ink, 'detail')), label('energy (not to scale)', P(-3.6, 3.0), ROLE.ink, 'detail')] },
      { narration: `A photon carries one unit of angular momentum, so l must change by exactly one: 2p → 1s (${r2(lyman)} eV, the Lyman-α line), 3s → 2p, 3d → 2p and 3p → 2s are allowed.`, objects: TRANSITIONS.filter(([a, b]) => allowedTransition(at(a).l, at(b).l)).map(([a, b], i) => tr(a, b, i)) },
      { narration: '2s → 1s (Δl = 0) and 3d → 1s (Δl = 2) are forbidden: they cannot happen by emitting a single photon, however much energy is available.', objects: [...TRANSITIONS.filter(([a, b]) => !allowedTransition(at(a).l, at(b).l)).map(([a, b], i) => tr(a, b, i + 2)), label('forbidden: Δl = 0 or 2', P(2.4, -2.2), ROLE.input, 'detail'), label(`allowed: Δl = ±1 (2p → 1s: ${r2(lyman)} eV)`, P(0.4, 3.4), ROLE.result, 'primary')] },
    ],
  }
}
