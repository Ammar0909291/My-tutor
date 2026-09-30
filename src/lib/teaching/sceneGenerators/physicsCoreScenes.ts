/**
 * Core school-physics figures — batch 1 of the physics visual gap campaign
 * (2026-09-30).
 *
 * A local audit over all 238 physics concepts (resolveVisual, no network)
 * found 163 with no deterministic figure at all and 32 served only a "general
 * illustration" of something else. These ten are the most-taught of them,
 * each a concept a textbook cannot teach without its picture. Same rules as
 * physicsPilot.ts (M4.1): one visual language from visualDesign.ts, labels are
 * names not sentences, steps are cumulative, coordinates inside ±5, and every
 * number drawn is computed from the physics rather than eyeballed.
 *
 * Each figure is grounded in its concept's own KG description (quoted in the
 * doc comment) and draws exactly what that description defines.
 */

import type { SceneSpec, SceneObject } from '@/lib/teaching/sceneSpec'
import { ROLE, arrow, curve, dot, hatch, label, line, sinePath } from './visualDesign'

type V3 = [number, number, number]
const r2 = (n: number) => Math.round(n * 100) / 100
const rad = (deg: number) => (deg * Math.PI) / 180
const P = (x: number, y: number): V3 => [r2(x), r2(y), 0]

/** A sampled circle (or arc) as a path. */
function circlePoints(cx: number, cy: number, radius: number, from = 0, to = 2 * Math.PI, samples = 48): V3[] {
  const pts: V3[] = []
  for (let i = 0; i <= samples; i++) {
    const t = from + ((to - from) * i) / samples
    pts.push(P(cx + radius * Math.cos(t), cy + radius * Math.sin(t)))
  }
  return pts
}

/** A thick horizontal bar (an energy bar), drawn as one heavy line. */
function bar(x0: number, y: number, length: number, color: string): SceneObject {
  return line(P(x0, y), P(x0 + Math.max(length, 0.02), y), color, 0.16)
}

// ── 1. Reflection ────────────────────────────────────────────────────────────

/**
 * KG: "the angle of incidence equals the angle of reflection with both angles
 * measured from the normal." The retired figure (a concave-mirror image
 * diagram, retired.ts) had none of the three things this defines: an incident
 * ray, a normal, equal angles. This draws exactly those, at 35°.
 */
export function buildReflectionScene(): SceneSpec {
  const T = 35, LEN = 3.4
  const inStart = P(-Math.sin(rad(T)) * LEN, Math.cos(rad(T)) * LEN)
  const outEnd = P(Math.sin(rad(T)) * LEN, Math.cos(rad(T)) * LEN)
  return {
    id: 'phys-reflection',
    title: 'Reflection: angle in equals angle out',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show that a ray reflected from a flat mirror leaves at the same angle to the normal as it arrived.',
    ariaLabel:
      'A flat mirror drawn as a horizontal line with hatching below. A vertical normal line stands at the ' +
      'point where a light ray hits. The incoming ray arrives from the upper left at 35 degrees from the ' +
      'normal and the reflected ray leaves to the upper right, also at 35 degrees.',
    steps: [
      {
        narration: 'A flat mirror, and the normal: the line at right angles to the mirror where the light hits.',
        objects: [
          line(P(-4.8, 0), P(4.8, 0), ROLE.reference, 0.06),
          ...hatch(-4.5, 4.5, 0, 12, 0.34),
          label('mirror', P(-3.9, -0.75), ROLE.ink, 'primary'),
          line(P(0, 0), P(0, 3.6), ROLE.aid, 0.03),
          label('normal', P(0.75, 3.8), ROLE.aid, 'detail'),
        ],
      },
      {
        narration: 'The incident ray comes in at 35° to the normal.',
        objects: [
          arrow(inStart, P(0, 0), ROLE.input),
          dot(P(0, 0), ROLE.input, 0.1),
          label('incident ray', P(inStart[0] - 0.2, inStart[1] + 0.4), ROLE.input, 'detail'),
          label(`θi = ${T}°`, P(-0.95, 1.5), ROLE.input, 'primary'),
        ],
      },
      {
        narration: 'It leaves at the same angle on the other side of the normal: the angle of reflection equals the angle of incidence.',
        objects: [
          arrow(P(0, 0), outEnd, ROLE.output),
          label('reflected ray', P(outEnd[0] + 0.2, outEnd[1] + 0.4), ROLE.output, 'detail'),
          label(`θr = ${T}°`, P(0.95, 1.5), ROLE.output, 'primary'),
          label('θi = θr', P(2.6, -1.4), ROLE.result, 'primary'),
        ],
      },
    ],
  }
}

// ── 2. Coulomb's law ─────────────────────────────────────────────────────────

/**
 * KG: "the electrostatic force between two point charges is proportional to
 * their product and inversely proportional to the square of their separation."
 * Two like charges at r, then the same pair at 2r: the force arrows are drawn
 * at a quarter of the length, computed from 1/r².
 */
export function buildCoulombsLawScene(): SceneSpec {
  const F1 = 1.6                    // arrow length at separation r
  const F2 = r2(F1 / 4)             // at 2r: F / 2² = F / 4
  const row = (y: number, half: number, f: number, tag: string): SceneObject[] => [
    dot(P(-half, y), ROLE.input, 0.26),
    dot(P(half, y), ROLE.input, 0.26),
    label('+q₁', P(-half, y + 0.6), ROLE.ink, 'detail'),
    label('+q₂', P(half, y + 0.6), ROLE.ink, 'detail'),
    arrow(P(-half - 0.3, y), P(-half - 0.3 - f, y), ROLE.output),
    arrow(P(half + 0.3, y), P(half + 0.3 + f, y), ROLE.output),
    line(P(-half, y - 0.55), P(half, y - 0.55), ROLE.aid, 0.02),
    label(tag, P(0, y - 0.9), ROLE.aid, 'detail'),
  ]
  return {
    id: 'phys-coulombs-law',
    title: "Coulomb's law: force between two charges",
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show that like charges push apart with equal and opposite forces, and that doubling the distance quarters the force.',
    ariaLabel:
      'Two positive charges a distance r apart, each pushed away from the other by an arrow of equal length. ' +
      'Below, the same two charges twice as far apart; their force arrows are a quarter as long.',
    steps: [
      {
        narration: 'Two positive charges a distance r apart. Like charges repel: each is pushed away from the other, with forces of equal size.',
        objects: [...row(1.4, 1.0, F1, 'r'), label('F', P(-3.6, 1.85), ROLE.output, 'primary'), label('F', P(3.6, 1.85), ROLE.output, 'primary')],
      },
      {
        narration: 'At twice the distance the force is four times smaller, because it depends on 1 / r².',
        objects: [
          ...row(-1.8, 2.0, F2, '2r'),
          label('F / 4', P(-3.1, -1.3), ROLE.output, 'primary'),
          label('F = k q₁q₂ / r²', P(0, 3.4), ROLE.result, 'primary'),
        ],
      },
    ],
  }
}

// ── 3. Electric field ────────────────────────────────────────────────────────

/**
 * KG: "the electrostatic force per unit positive test charge placed at that
 * point." Field lines point away from a positive charge and toward a negative
 * one — the direction a positive test charge would be pushed.
 */
export function buildElectricFieldScene(): SceneSpec {
  const spokes = (cx: number, outward: boolean, color: string): SceneObject[] => {
    const objs: SceneObject[] = []
    for (let k = 0; k < 8; k++) {
      const a = (k * Math.PI) / 4 + Math.PI / 8
      const near = P(cx + 0.45 * Math.cos(a), 0.45 * Math.sin(a))
      const far = P(cx + 1.7 * Math.cos(a), 1.7 * Math.sin(a))
      objs.push(outward ? arrow(near, far, color) : arrow(far, near, color))
    }
    return objs
  }
  return {
    id: 'phys-electric-field',
    title: 'Electric field lines of a positive and a negative charge',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show that the electric field points the way a positive test charge would be pushed: away from + and toward −.',
    ariaLabel:
      'On the left a positive charge with eight field arrows pointing outward. On the right a negative charge ' +
      'with eight field arrows pointing inward. A small positive test charge sits near the positive charge with ' +
      'a force arrow pointing away from it.',
    steps: [
      {
        narration: 'Around a positive charge the field points outward, the way a small positive test charge would be pushed.',
        objects: [dot(P(-2.4, 0), ROLE.input, 0.3), label('+', P(-2.4, 0.75), ROLE.input, 'primary'), ...spokes(-2.4, true, ROLE.input), label('field points away', P(-2.4, -2.4), ROLE.input, 'detail')],
      },
      {
        narration: 'Around a negative charge the field points inward.',
        objects: [dot(P(2.4, 0), ROLE.output, 0.3), label('−', P(2.4, 0.75), ROLE.output, 'primary'), ...spokes(2.4, false, ROLE.output), label('field points toward', P(2.4, -2.4), ROLE.output, 'detail')],
      },
      {
        narration: 'The field at a point is the force on a positive test charge there, divided by that charge: E = F / q₀.',
        objects: [dot(P(-2.4, 2.6), ROLE.result, 0.12), arrow(P(-2.25, 2.72), P(-1.2, 3.35), ROLE.result), label('test charge q₀', P(-3.9, 3.1), ROLE.result, 'detail'), label('E = F / q₀', P(0, 3.6), ROLE.result, 'primary')],
      },
    ],
  }
}

// ── 4. Magnetic field of a bar magnet ────────────────────────────────────────

/**
 * KG: "field lines indicate its direction and strength." Loops leave the N
 * pole and enter the S pole outside the magnet; they crowd together at the
 * poles, where the field is strongest.
 */
export function buildMagneticFieldScene(): SceneSpec {
  const W = 1.5
  const loop = (h: number, bulge: number, sign: 1 | -1): V3[] => {
    const pts: V3[] = []
    for (let i = 0; i <= 40; i++) {
      const t = (Math.PI * i) / 40
      pts.push(P(Math.cos(t) * (W + bulge * Math.sin(t)), sign * (0.25 + h * Math.sin(t))))
    }
    return pts
  }
  const loops: SceneObject[] = []
  // Wider than tall, as real bar-magnet loops are: the bulge pushes each loop
  // out past the poles, the height keeps it inside the ±5 frame.
  for (const [h, b] of [[0.7, 1.3], [1.4, 2.4], [2.2, 3.4]] as const) {
    loops.push(curve(loop(h, b, 1), ROLE.aid), curve(loop(h, b, -1), ROLE.aid))
    // direction marks at the top/bottom of each loop: from N (right) toward S (left)
    loops.push(arrow(P(0.35, 0.25 + h), P(-0.35, 0.25 + h), ROLE.aid), arrow(P(0.35, -0.25 - h), P(-0.35, -0.25 - h), ROLE.aid))
  }
  return {
    id: 'phys-magnetic-field',
    title: 'Magnetic field lines around a bar magnet',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show field lines leaving the north pole and entering the south pole, crowded where the field is strongest.',
    ariaLabel:
      'A bar magnet with its north pole on the right and south pole on the left. Curved field lines loop from ' +
      'the north pole around to the south pole above and below the magnet, with arrows pointing from N to S. ' +
      'The lines are closest together near the poles.',
    steps: [
      {
        narration: 'A bar magnet: north pole on the right, south pole on the left.',
        objects: [
          line(P(-W, 0.25), P(W, 0.25), ROLE.reference, 0.04), line(P(-W, -0.25), P(W, -0.25), ROLE.reference, 0.04),
          line(P(-W, 0.25), P(-W, -0.25), ROLE.reference, 0.04), line(P(W, 0.25), P(W, -0.25), ROLE.reference, 0.04),
          line(P(0, 0.25), P(0, -0.25), ROLE.reference, 0.03),
          label('S', P(-0.75, 0), ROLE.output, 'primary'), label('N', P(0.75, 0), ROLE.input, 'primary'),
        ],
      },
      {
        narration: 'Outside the magnet the field lines leave the north pole and curve round into the south pole.',
        objects: [...loops, label('from N to S', P(3.4, 3.4), ROLE.aid, 'detail')],
      },
      {
        narration: 'Where the lines are closest together — at the poles — the field is strongest.',
        objects: [label('lines crowd: strong field', P(-3.3, -3.6), ROLE.result, 'detail')],
      },
    ],
  }
}

// ── 5. Standing waves ────────────────────────────────────────────────────────

/**
 * KG: "two identical waves travel in opposite directions, producing fixed nodes
 * and antinodes." Third harmonic on a string fixed at both ends: λ = 2L / 3,
 * nodes every λ/2 including both ends, antinodes midway.
 */
export function buildStandingWavesScene(): SceneSpec {
  const X0 = -4, X1 = 4, L = X1 - X0, N = 3, A = 1.3
  const lambda = (2 * L) / N
  const nodes: number[] = [], antis: number[] = []
  for (let k = 0; k <= N; k++) nodes.push(X0 + (k * lambda) / 2)
  for (let k = 0; k < N; k++) antis.push(X0 + (k * lambda) / 2 + lambda / 4)
  return {
    id: 'phys-standing-waves',
    title: 'A standing wave on a string: nodes and antinodes',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show the fixed nodes and the antinodes of a standing wave, the pattern two opposite-travelling waves make.',
    ariaLabel:
      'A string fixed at both ends vibrating in three loops. Two curves show its two extreme positions. Four ' +
      'nodes, including both ends, never move; three antinodes midway between them swing the most.',
    steps: [
      {
        narration: 'A string fixed at both ends. Two identical waves travel along it in opposite directions and add up.',
        objects: [dot(P(X0, 0), ROLE.reference, 0.14), dot(P(X1, 0), ROLE.reference, 0.14), line(P(X0, 0), P(X1, 0), ROLE.reference, 0.02), label('fixed end', P(X0, -0.6), ROLE.ink, 'detail'), label('fixed end', P(X1, -0.6), ROLE.ink, 'detail')],
      },
      {
        narration: 'The result does not travel. The string swings between these two shapes.',
        objects: [
          curve(sinePath({ x0: X0, x1: X1, amplitude: A, wavelength: lambda, samples: 72 }), ROLE.input),
          curve(sinePath({ x0: X0, x1: X1, amplitude: -A, wavelength: lambda, samples: 72 }), ROLE.output),
        ],
      },
      {
        narration: 'Nodes never move. Antinodes, halfway between nodes, swing the most.',
        objects: [
          ...nodes.flatMap((x) => [dot(P(x, 0), ROLE.result, 0.13)]),
          label('node', P(nodes[1], -0.6), ROLE.result, 'primary'),
          ...antis.map((x) => line(P(x, -A), P(x, A), ROLE.aid, 0.02)),
          label('antinode', P(antis[1], A + 0.5), ROLE.aid, 'primary'),
          label(`λ = 2L / ${N}`, P(0, -2.6), ROLE.result, 'detail'),
        ],
      },
    ],
  }
}

// ── 6. Doppler effect ────────────────────────────────────────────────────────

/**
 * KG: "the change in observed frequency due to relative motion between source
 * and observer." A source moving right at half the wave speed: each wavefront
 * is a circle centred where the source WAS when it was emitted, so the fronts
 * crowd ahead and spread behind. Centres and radii computed from vs = 0.5 vw.
 */
export function buildDopplerScene(): SceneSpec {
  const vw = 0.9, vs = 0.45, xNow = 0.8
  const fronts: SceneObject[] = []
  for (const t of [4, 3, 2, 1]) fronts.push(curve(circlePoints(xNow - vs * t, 0, vw * t), ROLE.aid))
  return {
    id: 'phys-doppler',
    title: 'Doppler effect: a moving source',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show wavefronts bunched ahead of a moving source and spread out behind it, so an observer ahead hears a higher frequency.',
    ariaLabel:
      'A sound source moving to the right. Four circular wavefronts, each centred where the source was when it ' +
      'sent it, are crowded together on the right and spread apart on the left. An observer on the right hears a ' +
      'higher pitch; an observer on the left hears a lower pitch.',
    steps: [
      {
        narration: 'A source moves to the right while it sends out waves.',
        objects: [dot(P(xNow, 0), ROLE.input, 0.22), arrow(P(xNow + 0.3, -0.55), P(xNow + 1.3, -0.55), ROLE.input), label('source moving', P(xNow + 0.9, -1.0), ROLE.input, 'detail')],
      },
      {
        narration: 'Each wavefront spreads from where the source was when it was sent, so the fronts are closer together ahead of the source.',
        objects: fronts,
      },
      {
        narration: 'Ahead, the waves arrive more often: higher frequency. Behind, less often: lower frequency.',
        objects: [
          dot(P(4.4, 0), ROLE.result, 0.14), label('ahead: higher pitch', P(3.5, 1.2), ROLE.result, 'detail'),
          dot(P(-4.6, 0), ROLE.output, 0.14), label('behind: lower pitch', P(-3.6, 1.2), ROLE.output, 'detail'),
        ],
      },
    ],
  }
}

// ── 7. Conservation of mechanical energy ─────────────────────────────────────

/**
 * KG: "In the absence of non-conservative forces, the total mechanical energy
 * of a system remains constant." A ball falling (no air resistance) at the top,
 * halfway and near the ground: PE falls in proportion to height, KE rises by
 * the same amount, and the two bars always add to the same total.
 */
export function buildConservationOfEnergyScene(): SceneSpec {
  const GROUND = -2.4, TOTAL = 2.4
  const ys = [2.6, (2.6 + GROUND + 0.2) / 2, GROUND + 0.2]
  const top = ys[0] - GROUND
  const rows: SceneObject[] = []
  ys.forEach((y, i) => {
    const pe = r2(((y - GROUND) / top) * TOTAL)
    const ke = r2(TOTAL - pe)
    rows.push(dot(P(-3.2, y), ROLE.reference, 0.22))
    rows.push(bar(-1.6, y + 0.22, pe, ROLE.input), bar(-1.6, y - 0.22, ke, ROLE.output))
    if (i === 0) rows.push(label('PE', P(-2.1, y + 0.22), ROLE.input, 'detail'), label('KE', P(-2.1, y - 0.22), ROLE.output, 'detail'))
  })
  return {
    id: 'phys-conservation-of-energy',
    title: 'Conservation of energy: a falling ball',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show potential energy turning into kinetic energy as a ball falls, with the total staying the same.',
    ariaLabel:
      'A ball shown at three heights as it falls: the top, halfway down, and just above the ground. Beside each ' +
      'position two bars show potential energy and kinetic energy. At the top all the energy is potential, ' +
      'halfway it is split equally, and near the ground it is almost all kinetic. The bars always add to the same total.',
    steps: [
      {
        narration: 'A ball is dropped from rest. We ignore air resistance.',
        objects: [line(P(-4.6, GROUND), P(-2.0, GROUND), ROLE.reference, 0.05), ...hatch(-4.5, -2.1, GROUND, 6, 0.3), label('ground', P(-3.3, GROUND - 0.7), ROLE.ink, 'detail'), arrow(P(-3.8, 2.4), P(-3.8, 0.6), ROLE.reference)],
      },
      {
        narration: 'As it falls, potential energy (PE) turns into kinetic energy (KE).',
        objects: rows,
      },
      {
        narration: 'At every height, PE + KE is the same total.',
        objects: [label('PE + KE = constant', P(2.3, 3.4), ROLE.result, 'primary'), line(P(-1.6 + TOTAL, 3.0), P(-1.6 + TOTAL, GROUND), ROLE.result, 0.02), label('same total', P(-1.6 + TOTAL + 0.9, GROUND + 0.1), ROLE.result, 'detail')],
      },
    ],
  }
}

// ── 8. Heat transfer ─────────────────────────────────────────────────────────

/**
 * KG: "Heat transfers between systems by conduction (contact), convection
 * (fluid flow), or radiation (electromagnetic waves)." One panel for each.
 */
export function buildHeatTransferScene(): SceneSpec {
  return {
    id: 'phys-heat-transfer',
    title: 'Three ways heat moves',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show conduction through a solid, convection currents in a fluid, and radiation as waves through empty space.',
    ariaLabel:
      'Three panels. Conduction: a metal rod heated at one end, with arrows along the rod from hot to cold. ' +
      'Convection: a pan of liquid over a flame, with warm liquid rising in the middle and cooler liquid sinking ' +
      'at the sides. Radiation: a hot object sending wavy arrows across empty space.',
    steps: [
      {
        narration: 'Conduction: heat passes through a solid from particle to particle, from the hot end to the cold end.',
        objects: [
          line(P(-4.8, 0.3), P(-2.0, 0.3), ROLE.reference, 0.05), line(P(-4.8, -0.3), P(-2.0, -0.3), ROLE.reference, 0.05),
          dot(P(-4.8, 0), ROLE.input, 0.3), label('hot', P(-4.8, -0.8), ROLE.input, 'detail'), label('cold', P(-2.0, -0.8), ROLE.output, 'detail'),
          arrow(P(-4.2, 0), P(-2.6, 0), ROLE.input), label('conduction', P(-3.4, 1.6), ROLE.ink, 'primary'),
        ],
      },
      {
        narration: 'Convection: warm fluid rises and cooler fluid sinks, carrying heat round in a loop.',
        objects: [
          line(P(-1.3, 1.0), P(-1.3, -1.0), ROLE.reference, 0.05), line(P(-1.3, -1.0), P(1.3, -1.0), ROLE.reference, 0.05), line(P(1.3, -1.0), P(1.3, 1.0), ROLE.reference, 0.05),
          dot(P(0, -1.5), ROLE.input, 0.22), label('flame', P(0, -2.1), ROLE.input, 'detail'),
          arrow(P(0, -0.7), P(0, 0.7), ROLE.input), arrow(P(-0.9, 0.7), P(-0.9, -0.7), ROLE.output), arrow(P(0.9, 0.7), P(0.9, -0.7), ROLE.output),
          label('warm rises', P(0.05, 1.3), ROLE.input, 'detail'), label('convection', P(0, 2.2), ROLE.ink, 'primary'),
        ],
      },
      {
        narration: 'Radiation: a hot object gives off electromagnetic waves, which need no material to travel through.',
        objects: [
          dot(P(2.3, 0), ROLE.input, 0.35), label('hot object', P(2.3, -0.9), ROLE.input, 'detail'),
          curve(sinePath({ x0: 2.8, x1: 4.8, amplitude: 0.18, wavelength: 0.5, yOffset: 0.6 }), ROLE.input),
          curve(sinePath({ x0: 2.8, x1: 4.8, amplitude: 0.18, wavelength: 0.5, yOffset: -0.6 }), ROLE.input),
          label('radiation', P(3.7, 1.6), ROLE.ink, 'primary'),
        ],
      },
    ],
  }
}

// ── 9. Buoyancy ──────────────────────────────────────────────────────────────

/**
 * KG: "the buoyant force on a submerged object equals the weight of fluid
 * displaced." A floating block at rest: the part below the surface marks the
 * displaced water, and the buoyant force equals the block's weight (equal,
 * opposite arrows) because it is in equilibrium.
 */
export function buildBuoyancyScene(): SceneSpec {
  const SURF = 0.4, BX0 = -0.9, BX1 = 0.9, BY0 = -0.8, BY1 = 1.0
  return {
    id: 'phys-buoyancy',
    title: "Buoyancy: Archimedes' principle",
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show that the upward buoyant force equals the weight of the water the object pushes aside.',
    ariaLabel:
      'A block floating in water. The part of the block below the water surface is outlined as the displaced ' +
      'water. A downward arrow shows the block\'s weight and an upward arrow of the same length shows the ' +
      'buoyant force.',
    steps: [
      {
        narration: 'A block floats in water. Part of it is below the surface.',
        objects: [
          line(P(-4.6, SURF), P(4.6, SURF), ROLE.output, 0.04), label('water surface', P(3.4, SURF + 0.45), ROLE.output, 'detail'),
          line(P(BX0, BY0), P(BX1, BY0), ROLE.reference, 0.05), line(P(BX1, BY0), P(BX1, BY1), ROLE.reference, 0.05),
          line(P(BX1, BY1), P(BX0, BY1), ROLE.reference, 0.05), line(P(BX0, BY1), P(BX0, BY0), ROLE.reference, 0.05),
          label('block', P(-2.0, 1.3), ROLE.ink, 'detail'),
        ],
      },
      {
        narration: 'The part below the surface has pushed aside its own volume of water: the displaced water.',
        objects: [line(P(BX0 + 0.1, SURF - 0.1), P(BX1 - 0.1, BY0 + 0.1), ROLE.aid, 0.02), line(P(BX0 + 0.1, BY0 + 0.1), P(BX1 - 0.1, SURF - 0.1), ROLE.aid, 0.02), label('displaced water', P(2.6, -0.3), ROLE.aid, 'detail')],
      },
      {
        narration: 'The water pushes up with a force equal to the weight of that displaced water. Floating at rest, this equals the block\'s weight.',
        objects: [
          arrow(P(0, BY1), P(0, BY1 + 1.8), ROLE.output), label('buoyant force', P(1.4, BY1 + 1.5), ROLE.output, 'primary'),
          arrow(P(0.35, BY0), P(0.35, BY0 - 1.8), ROLE.input), label('weight', P(1.3, BY0 - 1.5), ROLE.input, 'primary'),
          label('buoyant force = weight of water displaced', P(0, -3.8), ROLE.result, 'detail'),
        ],
      },
    ],
  }
}

// ── 10. Hooke's law ──────────────────────────────────────────────────────────

/**
 * KG: "the restoring force of a spring is proportional to its displacement from
 * equilibrium: F = −kx." The spring at its natural length, then stretched by x:
 * the restoring force points back toward equilibrium, opposite to x.
 */
export function buildHookesLawScene(): SceneSpec {
  const WALL = -4.3, EQ = -0.6, STRETCH = 1.6, BW = 1.0
  const spring = (xEnd: number, y: number): V3[] => {
    const pts: V3[] = [P(WALL, y)]
    const coils = 10
    for (let i = 1; i < coils * 2; i++) pts.push(P(WALL + ((xEnd - WALL) * i) / (coils * 2), y + (i % 2 ? 0.28 : -0.28)))
    pts.push(P(xEnd, y))
    return pts
  }
  const block = (x0: number, y: number): SceneObject[] => [
    line(P(x0, y - 0.45), P(x0 + BW, y - 0.45), ROLE.reference, 0.05), line(P(x0 + BW, y - 0.45), P(x0 + BW, y + 0.45), ROLE.reference, 0.05),
    line(P(x0 + BW, y + 0.45), P(x0, y + 0.45), ROLE.reference, 0.05), line(P(x0, y + 0.45), P(x0, y - 0.45), ROLE.reference, 0.05),
  ]
  const wall: SceneObject[] = [line(P(WALL, -3), P(WALL, 3), ROLE.reference, 0.06)]
  for (let i = 0; i < 8; i++) wall.push(line(P(WALL, -2.8 + i * 0.75), P(WALL - 0.3, -3.1 + i * 0.75), ROLE.reference, 0.02))
  const Y1 = 1.6, Y2 = -1.4
  return {
    id: 'phys-hookes-law',
    title: "Hooke's law: a stretched spring pulls back",
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show that a spring stretched by x pulls back toward equilibrium with a force proportional to x: F = −kx.',
    ariaLabel:
      'A spring attached to a wall with a block on its end. Top: the spring at its natural length, with the ' +
      'equilibrium position marked. Bottom: the block pulled a distance x to the right; an arrow shows the spring ' +
      'pulling it back to the left.',
    steps: [
      {
        narration: 'A spring at its natural length. The block rests at the equilibrium position.',
        objects: [...wall, curve(spring(EQ, Y1), ROLE.aid), ...block(EQ, Y1), line(P(EQ, 2.6), P(EQ, -2.8), ROLE.aid, 0.02), label('equilibrium', P(EQ, 2.95), ROLE.aid, 'detail')],
      },
      {
        narration: 'Pull the block a distance x to the right. The spring stretches by x.',
        objects: [curve(spring(EQ + STRETCH, Y2), ROLE.aid), ...block(EQ + STRETCH, Y2), line(P(EQ, Y2 - 0.9), P(EQ + STRETCH, Y2 - 0.9), ROLE.input, 0.03), label('x', P(EQ + STRETCH / 2, Y2 - 1.3), ROLE.input, 'primary')],
      },
      {
        narration: 'The spring pulls back toward equilibrium, with a force proportional to x and opposite to it: F = −kx.',
        objects: [arrow(P(EQ + STRETCH + BW + 1.6, Y2), P(EQ + STRETCH + BW + 0.1, Y2), ROLE.result), label('restoring force F', P(EQ + STRETCH + BW + 1.3, Y2 + 0.7), ROLE.result, 'detail'), label('F = −kx', P(2.8, 0.2), ROLE.result, 'primary')],
      },
    ],
  }
}
