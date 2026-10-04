/**
 * Physics coverage-driven KG extension, batch 1 (2026-10-03): the figures for
 * the four new concepts — density, vernier caliper and screw gauge, mass and
 * weight, rectilinear propagation. Each concept ships with its figure in the
 * same commit as its KG node, so no new physics concept is ever assetless.
 * Same rules as physicsCoreScenes.ts: every number drawn is computed here and
 * pinned by src/tests/physicsExtensionBatch1.test.ts.
 */

import type { SceneSpec, SceneObject } from '@/lib/teaching/sceneSpec'
import { ROLE, arrow, curve, dot, label, line } from './visualDesign'
import { P, circlePoints, rect } from './physicsCoreScenes'

// ── 1. Density ───────────────────────────────────────────────────────────────

/** KG: "Density is mass per unit volume (rho = m/V)". Two 10 cm³ cubes: wood 6 g, aluminium 27 g; water 1 g/cm³. */
export const CUBES = { V: 10, wood: 6, alu: 27, water: 1 }
export function density(m: number, V: number): number { return m / V }
export function buildDensityScene(): SceneSpec {
  const rw = density(CUBES.wood, CUBES.V), ra = density(CUBES.alu, CUBES.V)
  const S = 1.4, WY = -1.2, TX0 = -1.6, TX1 = 3.6, TB = -3.6
  return {
    id: 'phys-density',
    title: 'Density: mass in each cubic centimetre',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: `Show density as mass per unit volume: two cubes of the same ${CUBES.V} cm³ volume have masses ${CUBES.wood} g (wood) and ${CUBES.alu} g (aluminium), so ρ = m/V is ${rw} and ${ra} g/cm³ — and in water (1 g/cm³) the wood floats while the aluminium sinks.`,
    ariaLabel: `Two equal cubes side by side, labelled wood ${CUBES.wood} grams and aluminium ${CUBES.alu} grams, each ${CUBES.V} cubic centimetres. Then a tank of water: the wood cube floats at the surface, the aluminium cube rests on the bottom.`,
    steps: [
      { narration: `Two cubes, the same size: ${CUBES.V} cm³ each. The wood cube has mass ${CUBES.wood} g, the aluminium cube ${CUBES.alu} g.`, objects: [...rect(-4.2, 1.4, -4.2 + S, 1.4 + S, ROLE.output), ...rect(-1.8, 1.4, -1.8 + S, 1.4 + S, ROLE.input), label(`wood: ${CUBES.wood} g`, P(-3.5, 1.0), ROLE.output, 'detail'), label(`aluminium: ${CUBES.alu} g`, P(-1.1, 1.0), ROLE.input, 'detail'), label(`V = ${CUBES.V} cm³ each`, P(-2.3, 3.3), ROLE.ink, 'detail')] },
      { narration: `Density is mass divided by volume: wood ${CUBES.wood} ÷ ${CUBES.V} = ${rw} g/cm³, aluminium ${CUBES.alu} ÷ ${CUBES.V} = ${ra} g/cm³. It belongs to the material, not to the size of the piece.`, objects: [label(`ρ = m/V`, P(2.6, 3.0), ROLE.result, 'primary'), label(`wood ${rw} g/cm³`, P(2.6, 2.2), ROLE.output, 'detail'), label(`aluminium ${ra} g/cm³`, P(2.6, 1.6), ROLE.input, 'detail')] },
      { narration: `Water is ${CUBES.water} g/cm³. Wood, less dense than water, floats; aluminium, denser, sinks.`, objects: [line(P(TX0, TB), P(TX1, TB), ROLE.reference, 0.05), line(P(TX0, TB), P(TX0, WY + 0.4), ROLE.reference, 0.05), line(P(TX1, TB), P(TX1, WY + 0.4), ROLE.reference, 0.05), line(P(TX0, WY), P(TX1, WY), ROLE.output, 0.03), ...rect(-0.9, WY - S * rw, -0.9 + S, WY - S * rw + S, ROLE.output), ...rect(1.6, TB, 1.6 + S, TB + S, ROLE.input), label('water 1 g/cm³', P(-3.2, WY - 0.4), ROLE.output, 'detail'), label('floats', P(-0.2, WY + 0.75), ROLE.output, 'detail'), label('sinks', P(2.3, TB + S + 0.35), ROLE.input, 'detail')] },
    ],
  }
}

// ── 2. Vernier caliper ───────────────────────────────────────────────────────

/** KG: "the least count sets the smallest readable step". 10 vernier divisions span 9 mm; reading 23 mm + 6 × 0.1 mm. */
export const VERNIER = { msd: 1, n: 10, span: 9, main: 23, coincide: 6 }
export function leastCount(v = VERNIER): number { return v.msd - v.span / v.n }
export function vernierReading(v = VERNIER): number { return v.main + v.coincide * leastCount(v) }
export function buildVernierScene(): SceneSpec {
  const LC = Math.round(leastCount() * 100) / 100, R = Math.round(vernierReading() * 100) / 100
  const X = (mm: number) => (mm - 25.5) * 0.6, MY = 0.6, VY = 0.6, vsd = VERNIER.span / VERNIER.n
  const mainTicks: SceneObject[] = []
  for (let mm = 18; mm <= 33; mm++) mainTicks.push(line(P(X(mm), MY), P(X(mm), MY + (mm % 5 === 0 ? 0.55 : 0.32)), ROLE.reference, 0.02))
  const vTicks: SceneObject[] = []
  for (let k = 0; k <= VERNIER.n; k++) {
    const at = R + k * vsd, hit = k === VERNIER.coincide
    vTicks.push(line(P(X(at), VY), P(X(at), VY - (k % 5 === 0 ? 0.55 : 0.32)), hit ? ROLE.result : ROLE.output, hit ? 0.05 : 0.02))
  }
  return {
    id: 'phys-vernier',
    title: 'Vernier caliper: reading a tenth of a millimetre',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: `Show how a vernier reads finer than its main scale: ${VERNIER.n} vernier divisions span ${VERNIER.span} mm, so each is ${LC} mm shorter than a main division — the least count. With the vernier zero just past ${VERNIER.main} mm and the ${VERNIER.coincide}th mark lined up, the reading is ${VERNIER.main} + ${VERNIER.coincide} × ${LC} = ${R} mm.`,
    ariaLabel: `A main scale marked in millimetres from 18 to 33, with a sliding vernier scale below it. The vernier zero sits just past the 23 millimetre mark. The sixth vernier mark is highlighted where it lines up exactly with the 29 millimetre mark.`,
    steps: [
      { narration: 'The main scale is marked in millimetres. Below it slides the vernier: 10 divisions spanning 9 mm.', objects: [line(P(X(18), MY), P(X(33), MY), ROLE.reference, 0.04), ...mainTicks, ...vTicks, label('20', P(X(20), MY + 0.9), ROLE.ink, 'detail'), label('25', P(X(25), MY + 0.9), ROLE.ink, 'detail'), label('30', P(X(30), MY + 0.9), ROLE.ink, 'detail'), label('main scale (mm)', P(X(19.5), MY + 1.6), ROLE.ink, 'detail'), label('vernier', P(X(19.5), VY - 1.0), ROLE.output, 'detail')] },
      { narration: `Each vernier division is ${vsd} mm, ${LC} mm shorter than a main division. That difference is the least count.`, objects: [label(`LC = 1 mm − ${vsd} mm = ${LC} mm`, P(0, 3.4), ROLE.aid, 'detail')] },
      { narration: `The vernier zero is just past ${VERNIER.main} mm, and the ${VERNIER.coincide}th vernier mark lines up with a main mark. Reading: ${VERNIER.main} + ${VERNIER.coincide} × ${LC} = ${R} mm.`, objects: [arrow(P(X(R), VY - 1.9), P(X(R), VY - 0.65), ROLE.output), label('vernier zero', P(X(R) - 0.3, VY - 2.25), ROLE.output, 'detail'), arrow(P(X(R + VERNIER.coincide * vsd), VY - 1.9), P(X(R + VERNIER.coincide * vsd), VY - 0.65), ROLE.result), label(`mark ${VERNIER.coincide} lines up`, P(X(R + VERNIER.coincide * vsd) + 0.3, VY - 2.25), ROLE.result, 'detail'), label(`${VERNIER.main} mm + ${VERNIER.coincide} × ${LC} mm = ${R} mm`, P(0, -3.4), ROLE.result, 'primary')] },
    ],
  }
}

// ── 3. Mass and weight ───────────────────────────────────────────────────────

/** KG: "weight is the gravitational force on it, W = mg, which changes with g". A 5 kg bag on Earth (9.8 N/kg) and the Moon (1.6 N/kg). */
export const BAG = { m: 5, gEarth: 9.8, gMoon: 1.6 }
export function weight(m: number, g: number): number { return m * g }
export function buildMassWeightScene(): SceneSpec {
  const WE = weight(BAG.m, BAG.gEarth), WM = weight(BAG.m, BAG.gMoon), K = 0.045
  const bagAt = (x: number, w: number): SceneObject[] => [line(P(x, 3.0), P(x, 3.0 - 0.4 - K * w), ROLE.aid, 0.03), ...rect(x - 0.5, 2.6 - K * w - 1.0, x + 0.5, 2.6 - K * w, ROLE.output), arrow(P(x, 2.6 - K * w - 1.1), P(x, 2.6 - K * w - 1.1 - K * w * 1.2), ROLE.input)]
  return {
    id: 'phys-mass-weight',
    title: 'Mass and weight: the same bag on two worlds',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: `Show that mass and weight differ: a ${BAG.m} kg bag is ${BAG.m} kg on Earth and on the Moon, but its weight W = mg is ${Math.round(WE)} N on Earth (g = ${BAG.gEarth} N/kg) and only ${Math.round(WM)} N on the Moon (g = ${BAG.gMoon} N/kg).`,
    ariaLabel: `Two spring balances, each holding the same ${BAG.m} kilogram bag. On Earth the spring stretches far and a long downward arrow shows a weight of ${Math.round(WE)} newtons. On the Moon the spring stretches much less and the weight arrow is short, ${Math.round(WM)} newtons.`,
    steps: [
      { narration: `The same ${BAG.m} kg bag hangs from a spring balance on Earth and on the Moon. Its mass — the amount of rice — is ${BAG.m} kg on both.`, objects: [line(P(-4.0, 3.0), P(-1.0, 3.0), ROLE.reference, 0.05), line(P(1.0, 3.0), P(4.0, 3.0), ROLE.reference, 0.05), label('Earth', P(-2.5, 3.5), ROLE.ink, 'heading'), label('Moon', P(2.5, 3.5), ROLE.ink, 'heading'), label(`m = ${BAG.m} kg`, P(-3.75, 2.1 - K * WE), ROLE.output, 'detail'), label(`m = ${BAG.m} kg`, P(1.25, 2.1 - K * WM), ROLE.output, 'detail')] },
      { narration: `Weight is the pull of gravity: W = mg. On Earth, ${BAG.m} × ${BAG.gEarth} = ${Math.round(WE)} N. On the Moon, ${BAG.m} × ${BAG.gMoon} = ${Math.round(WM)} N — the spring stretches far less.`, objects: [...bagAt(-2.5, WE), ...bagAt(2.5, WM), label(`W = ${Math.round(WE)} N`, P(-1.3, -1.6), ROLE.input, 'detail'), label(`W = ${Math.round(WM)} N`, P(3.7, 0.9), ROLE.input, 'detail')] },
      { narration: 'Mass stays; weight changes with g. A beam balance comparing the bag with 5 kg of standard masses would balance on both worlds.', objects: [label('W = m g', P(0.6, -2.9), ROLE.result, 'primary'), label('mass: same everywhere · weight: depends on g', P(0, -4.1), ROLE.ink, 'detail')] },
    ],
  }
}

// ── 4. Rectilinear propagation ───────────────────────────────────────────────

/** KG: "Light travels in straight lines … an opaque object casts a shadow". Point source, ball and wall; shadow size by similar triangles. */
export const SHADOW = { srcX: -4.2, ballX: -1.6, wallX: 4.0, ballR: 0.55, y: 0.6 }
export function shadowHalfHeight(s = SHADOW): number { return s.ballR * (s.wallX - s.srcX) / (s.ballX - s.srcX) }
export function buildRectilinearScene(): SceneSpec {
  const h = shadowHalfHeight(), { srcX, ballX, wallX, ballR, y } = SHADOW
  const ratio = Math.round(((wallX - srcX) / (ballX - srcX)) * 100) / 100
  return {
    id: 'phys-rectilinear',
    title: 'Light travels in straight lines: shadows',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: `Show that a shadow is the region straight rays cannot reach: rays from a small source grazing the top and bottom of a ball mark the shadow's edges on the wall. Its size follows from similar triangles: shadow / ball = (source–wall) / (source–ball) = ${ratio}.`,
    ariaLabel: 'A small light source on the left, a ball in the middle and a vertical wall on the right. Two straight rays from the source just graze the top and bottom of the ball and continue to the wall, marking the edges of a shadow much taller than the ball.',
    steps: [
      { narration: 'A small source sends light out in straight lines. A ball stands between it and a wall.', objects: [dot(P(srcX, y), ROLE.input, 0.22), curve(circlePoints(ballX, y, ballR, 0, 2 * Math.PI, 40), ROLE.output), line(P(wallX, y - 3.6), P(wallX, y + 3.0), ROLE.reference, 0.06), label('source', P(srcX, y - 0.6), ROLE.input, 'detail'), label('ball', P(ballX, y - ballR - 0.45), ROLE.output, 'detail'), label('wall', P(wallX + 0.5, y + 2.6), ROLE.ink, 'detail')] },
      { narration: 'Two rays just graze the top and bottom of the ball. Everything between them, behind the ball, gets no light: that is the shadow.', objects: [line(P(srcX, y), P(wallX, y + h), ROLE.input, 0.03), line(P(srcX, y), P(wallX, y - h), ROLE.input, 0.03), line(P(wallX - 0.08, y - h), P(wallX - 0.08, y + h), ROLE.ink, 0.14), label('shadow', P(wallX - 0.75, y), ROLE.ink, 'detail')] },
      { narration: `The shadow is bigger than the ball by the ratio of distances: (source–wall) / (source–ball) = ${ratio}. Move the ball toward the source and the shadow grows.`, objects: [label(`shadow / ball = ${ratio}`, P(0, -3.4), ROLE.result, 'primary')] },
    ],
  }
}
