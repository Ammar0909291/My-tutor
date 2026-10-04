/**
 * Physics coverage-driven KG extension, batch 2 (2026-10-03): figures for
 * experimental graphs, simple machines, the variation of g, and terminal
 * velocity. Same rules as physicsCoreScenes.ts: every number drawn is computed
 * here and pinned by src/tests/physicsExtensionBatch2.test.ts.
 */

import type { SceneSpec, SceneObject } from '@/lib/teaching/sceneSpec'
import { ROLE, arrow, curve, dot, label, line } from './visualDesign'
import { P, rect, type V3 } from './physicsCoreScenes'

// ── 1. Experimental graphs ───────────────────────────────────────────────────

/** KG: linearise, then read the constant from the gradient. Pendulum data: T² against L. */
export const PEND = { L: [0.2, 0.4, 0.6, 0.8, 1.0], T: [0.9, 1.27, 1.55, 1.79, 2.01] }
/** Least-squares gradient of T² against L through the origin: Σ(xy)/Σ(x²). */
export function pendulumGradient(d = PEND): number {
  let sxy = 0, sxx = 0
  d.L.forEach((x, i) => { const y = d.T[i] ** 2; sxy += x * y; sxx += x * x })
  return sxy / sxx
}
export function gFromGradient(m: number): number { return (4 * Math.PI ** 2) / m }
export function buildExperimentalGraphScene(): SceneSpec {
  const m = pendulumGradient(), g = gFromGradient(m)
  const X0 = -3.6, Y0 = -3.0, SX = 6.4, SY = 1.35
  const gx = (L: number) => X0 + L * SX, gy = (t2: number) => Y0 + t2 * SY
  const pts = PEND.L.map((L, i) => dot(P(gx(L), gy(PEND.T[i] ** 2)), ROLE.input, 0.12))
  const tri: SceneObject[] = [line(P(gx(0.3), gy(0.3 * m)), P(gx(0.9), gy(0.3 * m)), ROLE.aid, 0.025), line(P(gx(0.9), gy(0.3 * m)), P(gx(0.9), gy(0.9 * m)), ROLE.aid, 0.025)]
  return {
    id: 'phys-linearisation',
    title: 'Linearise, fit, read the gradient',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: `Show how a straight-line graph tests a law: pendulum data plotted as T² against L fall on a line through the origin; the best-fit gradient is ${m.toFixed(2)} s²/m, so g = 4π²/gradient = ${g.toFixed(1)} m/s².`,
    ariaLabel: 'Axes with T squared up the side and pendulum length L along the bottom. Five data points lie close to a straight best-fit line through the origin. A large right-angled triangle drawn under the line shows how the gradient is measured.',
    steps: [
      { narration: 'Plot T² against L — the pendulum law T = 2π√(L/g), squared, says this should be a straight line through the origin.', objects: [arrow(P(X0, Y0), P(gx(1.12), Y0), ROLE.reference), arrow(P(X0, Y0), P(X0, gy(4.6)), ROLE.reference), label('L (m)', P(gx(1.05), Y0 - 0.45), ROLE.ink, 'detail'), label('T² (s²)', P(X0 + 0.9, gy(4.6)), ROLE.ink, 'detail'), ...pts] },
      { narration: 'Draw ONE best-fit straight line, with points scattered on both sides — not a zigzag through every point.', objects: [line(P(gx(0), gy(0)), P(gx(1.1), gy(1.1 * m)), ROLE.output, 0.04), label('best fit', P(gx(1.0) - 1.2, gy(1.05 * m)), ROLE.output, 'detail')] },
      { narration: `Take the gradient from a large triangle on the line: about ${m.toFixed(2)} s²/m. Then g = 4π² / gradient ≈ ${g.toFixed(1)} m/s².`, objects: [...tri, label('ΔL', P(gx(0.6), gy(0.3 * m) - 0.35), ROLE.aid, 'detail'), label('Δ(T²)', P(gx(0.9) + 0.55, gy(0.6 * m)), ROLE.aid, 'detail'), label(`g = 4π² / ${m.toFixed(2)} = ${g.toFixed(1)} m/s²`, P(0, 3.6), ROLE.result, 'primary')] },
    ],
  }
}

// ── 2. Simple machines ───────────────────────────────────────────────────────

/** KG: a machine trades force for distance. Crowbar: arms 1.2 m and 0.2 m, 600 N rock lifted 0.1 m. */
export const LEVER = { effortArm: 1.2, loadArm: 0.2, load: 600, lift: 0.1 }
export function leverEffort(l = LEVER): number { return (l.load * l.loadArm) / l.effortArm }
export function effortDistance(l = LEVER): number { return (l.lift * l.effortArm) / l.loadArm }
export function buildSimpleMachineScene(): SceneSpec {
  const E = leverEffort(), d = effortDistance(), K = 2.6, FX = -1.6, Y = -0.6
  const lx = FX - LEVER.loadArm * K, ex = FX + LEVER.effortArm * K
  const fulcrum: SceneObject[] = [line(P(FX - 0.35, Y - 0.6), P(FX, Y), ROLE.reference, 0.05), line(P(FX + 0.35, Y - 0.6), P(FX, Y), ROLE.reference, 0.05), line(P(FX - 0.35, Y - 0.6), P(FX + 0.35, Y - 0.6), ROLE.reference, 0.05)]
  return {
    id: 'phys-simple-machines',
    title: 'A lever trades force for distance',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: `Show the lever rule from work: arms ${LEVER.effortArm} m and ${LEVER.loadArm} m let ${Math.round(E)} N lift ${LEVER.load} N, but the effort moves ${d.toFixed(1)} m to lift the load ${LEVER.lift} m — ${Math.round(E * d)} J in, ${Math.round(LEVER.load * LEVER.lift)} J out.`,
    ariaLabel: `A crowbar resting on a small triangular fulcrum. Close to the fulcrum on the left, a heavy rock pushes down with ${LEVER.load} newtons. Far out on the right, a small downward effort of ${Math.round(E)} newtons is applied. Arrows show the effort end moving far down while the rock end moves a little up.`,
    steps: [
      { narration: `A crowbar on a fulcrum: the rock sits ${LEVER.loadArm} m from the fulcrum, your hand pushes ${LEVER.effortArm} m away.`, objects: [line(P(lx - 0.3, Y), P(ex, Y), ROLE.ink, 0.08), ...fulcrum, ...rect(lx - 0.7, Y + 0.05, lx + 0.1, Y + 0.85, ROLE.output), arrow(P(lx - 0.3, Y + 2.2), P(lx - 0.3, Y + 0.95), ROLE.output), label(`load ${LEVER.load} N`, P(lx - 0.3, Y + 2.55), ROLE.output, 'detail'), arrow(P(ex, Y + 1.5), P(ex, Y + 0.12), ROLE.input), label(`effort ${Math.round(E)} N`, P(ex - 0.4, Y + 1.85), ROLE.input, 'detail'), label('fulcrum', P(FX, Y - 1.0), ROLE.reference, 'detail')] },
      { narration: `To lift the rock ${LEVER.lift} m, the hand must move ${d.toFixed(1)} m — six times as far, for one sixth of the force.`, objects: [arrow(P(lx - 0.95, Y + 0.2), P(lx - 0.95, Y + 0.2 + LEVER.lift * K * 1.5), ROLE.aid), label(`${LEVER.lift} m up`, P(lx - 1.0, Y - 0.35), ROLE.aid, 'detail'), arrow(P(ex + 0.45, Y), P(ex + 0.45, Y - d * K * 1.5), ROLE.aid), label(`${d.toFixed(1)} m down`, P(ex - 1.0, Y - 2.0), ROLE.aid, 'detail')] },
      { narration: `Work in = ${Math.round(E)} N × ${d.toFixed(1)} m = ${Math.round(E * d)} J. Work out = ${LEVER.load} N × ${LEVER.lift} m = ${Math.round(LEVER.load * LEVER.lift)} J. Mechanical advantage ${LEVER.load / Math.round(E)}; the work is not reduced.`, objects: [label(`MA = ${LEVER.load} / ${Math.round(E)} = ${LEVER.load / Math.round(E)}`, P(0, 3.6), ROLE.result, 'primary'), label(`${Math.round(E * d)} J in = ${Math.round(LEVER.load * LEVER.lift)} J out`, P(0, -3.7), ROLE.result, 'detail')] },
    ],
  }
}

// ── 3. Variation of g ────────────────────────────────────────────────────────

/** KG: g = GM/r² outside, g ∝ r inside a uniform Earth. R = 6371 km, station 400 km up. */
export const EARTH = { g: 9.8, R: 6371, station: 400 }
export function gAt(rOverR: number, g0 = EARTH.g): number { return rOverR <= 1 ? g0 * rOverR : g0 / (rOverR * rOverR) }
export function buildVariationOfGScene(): SceneSpec {
  const X0 = -4.0, Y0 = -2.8, SX = 2.0, SY = 0.6
  const gx = (r: number) => X0 + r * SX, gy = (g: number) => Y0 + g * SY
  const outside: V3[] = Array.from({ length: 40 }, (_, i) => { const r = 1 + (3.1 * i) / 39; return P(gx(r), gy(gAt(r))) })
  const rs = 1 + EARTH.station / EARTH.R, gs = gAt(rs)
  return {
    id: 'phys-variation-of-g',
    title: 'g with distance from the Earth\'s centre',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: `Show g against distance r from the Earth's centre: for a uniform Earth it rises in a straight line from zero at the centre to ${EARTH.g} m/s² at the surface, then falls as 1/r² outside — still ${gs.toFixed(1)} m/s² at the space station, ${EARTH.station} km up.`,
    ariaLabel: 'A graph of gravitational field strength g against distance from the Earth\'s centre. Inside the Earth the graph is a straight line rising from zero to a peak at the surface. Outside, it falls away in a curve. A point on the curve just past the surface marks the space station at about 8.7 metres per second squared.',
    steps: [
      { narration: 'Plot g against distance r from the Earth\'s centre, in units of the Earth\'s radius R.', objects: [arrow(P(X0, Y0), P(gx(4.3), Y0), ROLE.reference), arrow(P(X0, Y0), P(X0, gy(11.5)), ROLE.reference), label('r / R', P(gx(4.1), Y0 - 0.45), ROLE.ink, 'detail'), label('g (m/s²)', P(X0 + 1.0, gy(11.5)), ROLE.ink, 'detail'), line(P(gx(1), Y0 - 0.1), P(gx(1), Y0 + 0.1), ROLE.reference, 0.03), label('surface', P(gx(1), Y0 - 0.45), ROLE.ink, 'detail')] },
      { narration: `Inside a uniform Earth only the mass below you pulls: g rises in a straight line from 0 at the centre to ${EARTH.g} m/s² at the surface. Outside, g = GM/r² falls away.`, objects: [line(P(gx(0), gy(0)), P(gx(1), gy(EARTH.g)), ROLE.input, 0.05), curve(outside, ROLE.output), label('g ∝ r', P(gx(0.25), gy(6.0)), ROLE.input, 'detail'), label('g ∝ 1/r²', P(gx(2.6), gy(2.6)), ROLE.output, 'detail')] },
      { narration: `The space station, ${EARTH.station} km up, is at r ≈ ${rs.toFixed(2)} R: g there is about ${gs.toFixed(1)} m/s². Astronauts float because they are falling, not because gravity is gone.`, objects: [dot(P(gx(rs), gy(gs)), ROLE.result, 0.15), label(`station: ${gs.toFixed(1)} m/s²`, P(gx(rs) + 1.6, gy(gs) + 0.2), ROLE.result, 'detail'), label(`g is largest at the surface: ${EARTH.g} m/s²`, P(0.4, 3.9), ROLE.result, 'primary')] },
    ],
  }
}

// ── 4. Terminal velocity ─────────────────────────────────────────────────────

/** KG/blueprint: v_t = 2r²(ρ − σ)g/(9η). Steel ball r = 1 mm in glycerine. */
export const STOKES = { r: 1e-3, rho: 7800, sigma: 1260, eta: 1.5, g: 9.8 }
export function terminalVelocity(s = STOKES): number { return (2 * s.r * s.r * (s.rho - s.sigma) * s.g) / (9 * s.eta) }
export function buildTerminalVelocityScene(): SceneSpec {
  const vt = terminalVelocity(), X0 = -4.0, Y0 = -3.0, TX = 1.25, VY = 3.4
  const vCurve: V3[] = Array.from({ length: 48 }, (_, i) => { const t = (5.6 * i) / 47; return P(X0 + t * TX, Y0 + VY * (1 - Math.exp(-t))) })
  const fbd = (x: number, drag: number): SceneObject[] => [dot(P(x, 3.6), ROLE.ink, 0.14), arrow(P(x, 3.45), P(x, 2.45), ROLE.input), ...(drag > 0 ? [arrow(P(x, 3.75), P(x, 3.75 + drag), ROLE.output)] : [])]
  return {
    id: 'phys-terminal-velocity',
    title: 'Terminal velocity: drag grows until the forces balance',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: `Show why a falling body reaches a constant speed: drag grows with speed until it balances the weight (less upthrust), so the net force and acceleration fall to zero. A 1 mm steel ball in glycerine settles at v_t = 2r²(ρ − σ)g/(9η) ≈ ${(vt * 1000).toFixed(1)} mm/s.`,
    ariaLabel: 'A speed–time graph: the curve rises steeply at first, then bends over and levels off at a horizontal dashed line marked terminal velocity. Above, three small force diagrams at increasing speed: the downward weight arrow stays the same while the upward drag arrow grows until it matches it.',
    steps: [
      { narration: 'Three forces act on the falling ball: weight down, and upthrust and drag up. Drag grows with speed.', objects: [...fbd(-3.0, 0), ...fbd(-1.2, 0.5), ...fbd(0.6, 1.0), label('at release', P(-3.0, 2.05), ROLE.ink, 'detail'), label('speeding up', P(-1.2, 2.05), ROLE.ink, 'detail'), label('balanced', P(0.6, 2.05), ROLE.ink, 'detail'), label('weight (less upthrust)', P(2.9, 2.8), ROLE.input, 'detail'), label('drag', P(1.6, 4.3), ROLE.output, 'detail')] },
      { narration: 'The speed rises quickly at first, then more and more slowly, and levels off where drag balances the weight: the terminal velocity.', objects: [arrow(P(X0, Y0), P(X0 + 7.6, Y0), ROLE.reference), arrow(P(X0, Y0), P(X0, Y0 + VY + 0.6), ROLE.reference), label('time', P(X0 + 7.3, Y0 - 0.4), ROLE.ink, 'detail'), label('speed', P(X0 + 0.7, Y0 + VY + 0.7), ROLE.ink, 'detail'), curve(vCurve, ROLE.output), line(P(X0, Y0 + VY), P(X0 + 7.2, Y0 + VY), ROLE.aid, 0.02), label('terminal velocity', P(X0 + 5.4, Y0 + VY + 0.35), ROLE.aid, 'detail')] },
      { narration: `At terminal velocity the forces have not vanished — they balance, so the net force is zero. For a 1 mm steel ball in glycerine, v_t ≈ ${(vt * 1000).toFixed(1)} mm/s.`, objects: [label(`v_t = 2r²(ρ − σ)g / 9η ≈ ${(vt * 1000).toFixed(1)} mm/s`, P(0, -4.3), ROLE.result, 'primary')] },
    ],
  }
}
