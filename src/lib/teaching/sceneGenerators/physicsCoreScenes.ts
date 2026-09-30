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

// ═══════════════════════════════════════════════════════════════════════════
// Batch 2 (2026-09-30): mechanics, thermal and wave concepts that had no figure
// or only a general illustration. Same rules as batch 1.
// ═══════════════════════════════════════════════════════════════════════════

/** Two labelled axes meeting at (x0, y0). */
function axes(x0: number, y0: number, x1: number, y1: number, xLabel: string, yLabel: string): SceneObject[] {
  return [
    arrow(P(x0, y0), P(x1, y0), ROLE.reference),
    arrow(P(x0, y0), P(x0, y1), ROLE.reference),
    label(xLabel, P(x1 - 0.2, y0 - 0.5), ROLE.ink, 'detail'),
    label(yLabel, P(x0 + 0.1, y1 + 0.4), ROLE.ink, 'detail'),
  ]
}

/** A closed rectangle (a cart, a block, a box). */
function rect(x0: number, y0: number, x1: number, y1: number, color: string = ROLE.reference): SceneObject[] {
  return [
    line(P(x0, y0), P(x1, y0), color, 0.05), line(P(x1, y0), P(x1, y1), color, 0.05),
    line(P(x1, y1), P(x0, y1), color, 0.05), line(P(x0, y1), P(x0, y0), color, 0.05),
  ]
}

// ── 11. Kinetic energy ───────────────────────────────────────────────────────

/** KG: "energy … due to its motion, equal to ½mv²." Same mass at v and 2v: the KE bar is 4× as long. */
export function buildKineticEnergyScene(): SceneSpec {
  const KE1 = 0.6
  const KE2 = r2(KE1 * 4) // ½m(2v)² = 4 × ½mv²
  return {
    id: 'phys-kinetic-energy',
    title: 'Kinetic energy: double the speed, four times the energy',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show that kinetic energy grows with the square of speed: the same cart at twice the speed has four times the kinetic energy.',
    ariaLabel: 'Two identical carts. The top one moves at speed v and has a short kinetic-energy bar. The bottom one moves at 2v and its bar is four times as long.',
    steps: [
      {
        narration: 'A cart of mass m moving at speed v has kinetic energy KE = ½mv².',
        objects: [...rect(-4.2, 1.2, -2.8, 2.0), arrow(P(-2.6, 1.6), P(-1.6, 1.6), ROLE.input), label('v', P(-2.1, 2.1), ROLE.input, 'primary'), bar(0.2, 1.6, KE1, ROLE.output), label('KE', P(0.5, 2.1), ROLE.output, 'detail')],
      },
      {
        narration: 'The same cart at twice the speed has four times the kinetic energy, because speed is squared.',
        objects: [...rect(-4.2, -1.6, -2.8, -0.8), arrow(P(-2.6, -1.2), P(-0.6, -1.2), ROLE.input), label('2v', P(-1.6, -0.7), ROLE.input, 'primary'), bar(0.2, -1.2, KE2, ROLE.output), label('4 × KE', P(1.4, -0.7), ROLE.output, 'primary'), label('KE = ½mv²', P(0, 3.4), ROLE.result, 'primary')],
      },
    ],
  }
}

// ── 12. Potential energy ─────────────────────────────────────────────────────

/** KG: "stored energy associated with an object's position." Gravitational PE = mgh: at 2h the bar doubles. */
export function buildPotentialEnergyScene(): SceneSpec {
  const G = -2.6, H = 2.0
  return {
    id: 'phys-potential-energy',
    title: 'Potential energy: higher up, more stored energy',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show that gravitational potential energy depends on height: twice the height stores twice the energy (PE = mgh).',
    ariaLabel: 'A ball at height h and an identical ball at height 2h above the ground. The potential-energy bar for the higher ball is twice as long.',
    steps: [
      {
        narration: 'Height is measured from a chosen zero level: here, the ground.',
        objects: [line(P(-4.6, G), P(1.0, G), ROLE.reference, 0.05), ...hatch(-4.5, 0.9, G, 10, 0.3), label('ground (PE = 0)', P(-2.0, G - 0.7), ROLE.ink, 'detail')],
      },
      {
        narration: 'A ball lifted to height h stores potential energy PE = mgh.',
        objects: [dot(P(-3.2, G + H), ROLE.reference, 0.24), line(P(-3.9, G), P(-3.9, G + H), ROLE.aid, 0.02), label('h', P(-4.3, G + H / 2), ROLE.aid, 'primary'), bar(1.6, G + H, 1.0, ROLE.input), label('PE', P(2.1, G + H + 0.5), ROLE.input, 'detail')],
      },
      {
        narration: 'Twice as high, it stores twice as much.',
        objects: [dot(P(-0.8, G + 2 * H), ROLE.reference, 0.24), line(P(-1.5, G), P(-1.5, G + 2 * H), ROLE.aid, 0.02), label('2h', P(-2.0, G + 1.5 * H), ROLE.aid, 'primary'), bar(1.6, G + 2 * H, 2.0, ROLE.input), label('2 × PE', P(2.6, G + 2 * H + 0.5), ROLE.input, 'primary'), label('PE = mgh', P(3.0, -1.2), ROLE.result, 'primary')],
      },
    ],
  }
}

// ── 13. Work ─────────────────────────────────────────────────────────────────

/** KG: "the scalar product of force and displacement." F at 30° to d: only F cos θ along d does work. */
export function buildWorkScene(): SceneSpec {
  const T = 30, F = 2.4
  const fx = r2(F * Math.cos(rad(T))), fy = r2(F * Math.sin(rad(T)))
  return {
    id: 'phys-work',
    title: 'Work: force along the displacement',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show that only the part of a force along the displacement does work: W = F d cos θ.',
    ariaLabel: 'A box on the floor pulled by a force at 30 degrees above horizontal. The box moves a distance d to the right. The part of the force along the floor, F cos θ, is shown.',
    steps: [
      {
        narration: 'A box is pulled by a force F at an angle θ = 30° above the floor, and moves a distance d.',
        objects: [line(P(-4.8, -1.0), P(4.8, -1.0), ROLE.reference, 0.05), ...hatch(-4.6, 4.6, -1.0, 12, 0.3), ...rect(-3.4, -1.0, -2.2, 0.0), arrow(P(-2.2, -0.5), P(-2.2 + fx, -0.5 + fy), ROLE.input), label('F', P(-2.2 + fx + 0.3, -0.5 + fy + 0.3), ROLE.input, 'primary'), label(`θ = ${T}°`, P(-0.9, -0.1), ROLE.input, 'detail'), arrow(P(-3.4, -1.9), P(1.6, -1.9), ROLE.aid), label('d', P(-0.9, -2.4), ROLE.aid, 'primary')],
      },
      {
        narration: 'Only the part of the force along the displacement, F cos θ, does work.',
        objects: [line(P(-2.2, -0.5), P(-2.2 + fx, -0.5), ROLE.output, 0.04), label('F cos θ', P(-2.2 + fx + 1.0, -0.45), ROLE.output, 'detail'), line(P(-2.2 + fx, -0.5), P(-2.2 + fx, -0.5 + fy), ROLE.reference, 0.02)],
      },
      {
        narration: 'Work is force times displacement times cos θ.',
        objects: [label('W = F d cos θ', P(2.2, 2.4), ROLE.result, 'primary')],
      },
    ],
  }
}

// ── 14. Newton's third law ───────────────────────────────────────────────────

/** KG: "an equal and opposite reaction force acting on a different body." Two skaters push apart. */
export function buildNewtonsThirdLawScene(): SceneSpec {
  return {
    id: 'phys-newtons-third-law',
    title: "Newton's third law: a force pair on two bodies",
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show an action-reaction pair: equal in size, opposite in direction, and acting on two different bodies.',
    ariaLabel: 'Two skaters, A and B, pushing against each other. An arrow on A points left, labelled force on A by B; an equal arrow on B points right, labelled force on B by A.',
    steps: [
      {
        narration: 'Skater A pushes skater B.',
        objects: [...rect(-2.4, -1.0, -0.8, 1.0), label('A', P(-1.6, 0), ROLE.ink, 'primary'), ...rect(0.8, -1.0, 2.4, 1.0), label('B', P(1.6, 0), ROLE.ink, 'primary')],
      },
      {
        narration: 'A pushes on B, and B pushes back on A with a force of the same size in the opposite direction.',
        objects: [arrow(P(2.6, 0), P(4.4, 0), ROLE.output), label('force on B by A', P(3.3, 0.7), ROLE.output, 'detail'), arrow(P(-2.6, 0), P(-4.4, 0), ROLE.input), label('force on A by B', P(-3.3, 0.7), ROLE.input, 'detail')],
      },
      {
        narration: 'The two forces act on DIFFERENT bodies, so they never cancel each other.',
        objects: [label('equal size · opposite direction · different bodies', P(0, -2.3), ROLE.result, 'detail')],
      },
    ],
  }
}

// ── 15. Inclined plane ───────────────────────────────────────────────────────

/**
 * KG: "resolving gravitational and normal forces along and perpendicular to the
 * slope." θ = 30°: mg sin θ down the slope, mg cos θ into it, N balancing it.
 */
export function buildInclinedPlaneScene(): SceneSpec {
  const T = 30, MG = 2.2
  const bx0 = -4.2, by0 = -2.6, bx1 = 3.2
  const topY = r2(by0 + (bx1 - bx0) * Math.tan(rad(T)))
  const down: [number, number] = [Math.cos(rad(T)), -Math.sin(rad(T))]  // down the slope
  const out: [number, number] = [Math.sin(rad(T)), Math.cos(rad(T))]    // out of the slope
  // block centre: middle of the slope, lifted off it along the outward normal
  const mx = (bx0 + bx1) / 2, my = (topY + by0) / 2
  const cx = r2(mx + out[0] * 0.45), cy = r2(my + out[1] * 0.45)
  const along = r2(MG * Math.sin(rad(T))), perp = r2(MG * Math.cos(rad(T)))
  return {
    id: 'phys-inclined-plane',
    title: 'Forces on a block on an inclined plane',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show the weight of a block on a slope split into mg sin θ along the slope and mg cos θ into it, with the normal force balancing the second.',
    ariaLabel: 'A slope at 30 degrees with a block on it. The weight points straight down. It is split into a part along the slope, mg sin θ, and a part into the slope, mg cos θ. The normal force points out of the slope.',
    steps: [
      {
        narration: 'A block rests on a slope at θ = 30°.',
        objects: [line(P(bx0, by0), P(bx1, by0), ROLE.reference, 0.05), line(P(bx0, by0), P(bx0, topY), ROLE.reference, 0.04), line(P(bx0, topY), P(bx1, by0), ROLE.reference, 0.05), label(`θ = ${T}°`, P(bx1 - 1.3, by0 + 0.35), ROLE.ink, 'detail'), dot(P(cx, cy), ROLE.reference, 0.3)],
      },
      {
        narration: 'Its weight mg points straight down.',
        objects: [arrow(P(cx, cy), P(cx, r2(cy - MG)), ROLE.input), label('mg', P(cx - 0.45, r2(cy - MG + 0.2)), ROLE.input, 'primary')],
      },
      {
        narration: 'Split the weight along the slope (mg sin θ, pulling it down the slope) and into the slope (mg cos θ). The normal force N balances the part into the slope.',
        objects: [
          arrow(P(cx, cy), P(r2(cx + down[0] * along), r2(cy + down[1] * along)), ROLE.output), label('mg sin θ', P(r2(cx + down[0] * along + 0.6), r2(cy + down[1] * along + 0.3)), ROLE.output, 'detail'),
          arrow(P(cx, cy), P(r2(cx - out[0] * perp), r2(cy - out[1] * perp)), ROLE.aid), label('mg cos θ', P(r2(cx - out[0] * perp - 0.9), r2(cy - out[1] * perp)), ROLE.aid, 'detail'),
          arrow(P(cx, cy), P(r2(cx + out[0] * perp), r2(cy + out[1] * perp)), ROLE.result), label('N', P(r2(cx + out[0] * perp + 0.3), r2(cy + out[1] * perp + 0.2)), ROLE.result, 'primary'),
        ],
      },
    ],
  }
}

// ── 16. Pressure in fluids ───────────────────────────────────────────────────

/** KG: "increases with depth and acts equally in all directions." Arrow length ∝ depth, four directions at each point. */
export function buildPressureFluidsScene(): SceneSpec {
  const SURF = 2.4, K = 0.32
  const point = (x: number, y: number, color: string): SceneObject[] => {
    const L = r2((SURF - y) * K)
    return [dot(P(x, y), color, 0.1), arrow(P(x, y + 0.15), P(x, y + 0.15 + L), color), arrow(P(x, y - 0.15), P(x, y - 0.15 - L), color), arrow(P(x + 0.15, y), P(x + 0.15 + L, y), color), arrow(P(x - 0.15, y), P(x - 0.15 - L, y), color)]
  }
  return {
    id: 'phys-pressure-fluids',
    title: 'Pressure in a liquid grows with depth',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show that pressure in a still liquid is larger deeper down and pushes equally in every direction.',
    ariaLabel: 'A tank of water. A point near the surface has four short pressure arrows pointing up, down, left and right. A deeper point has four longer arrows.',
    steps: [
      {
        narration: 'A tank of still water.',
        objects: [line(P(-3.0, SURF + 0.6), P(-3.0, -3.2), ROLE.reference, 0.05), line(P(-3.0, -3.2), P(3.0, -3.2), ROLE.reference, 0.05), line(P(3.0, -3.2), P(3.0, SURF + 0.6), ROLE.reference, 0.05), line(P(-3.0, SURF), P(3.0, SURF), ROLE.output, 0.04), label('surface', P(3.9, SURF), ROLE.output, 'detail')],
      },
      {
        narration: 'At any point the water pushes equally in all directions.',
        objects: [...point(-1.2, 1.2, ROLE.aid), line(P(-2.4, SURF), P(-2.4, 1.2), ROLE.aid, 0.02), label('h₁', P(-2.75, 1.8), ROLE.aid, 'primary')],
      },
      {
        narration: 'Deeper down the pressure is larger: P = P₀ + ρgh.',
        objects: [...point(1.2, -1.8, ROLE.input), line(P(2.4, SURF), P(2.4, -1.8), ROLE.input, 0.02), label('h₂', P(2.75, 0.3), ROLE.input, 'primary'), label('P = P₀ + ρgh', P(0, 3.6), ROLE.result, 'primary')],
      },
    ],
  }
}

// ── 17. Impulse ──────────────────────────────────────────────────────────────

/** KG: "the product of force and time interval and equals the change in momentum." The area under F–t is J = Δp. */
export function buildImpulseScene(): SceneSpec {
  const X0 = -4, Y0 = -2.4, T0 = -2.4, DT = 4.2, FMAX = 4.0
  const Ft = (t: number) => FMAX * Math.sin((Math.PI * (t - T0)) / DT)
  const pts: V3[] = []
  for (let i = 0; i <= 40; i++) { const t = T0 + (DT * i) / 40; pts.push(P(t, Y0 + Ft(t))) }
  const shade: SceneObject[] = []
  for (let i = 1; i < 12; i++) { const t = T0 + (DT * i) / 12; shade.push(line(P(t, Y0), P(t, Y0 + Ft(t)), ROLE.aid, 0.02)) }
  return {
    id: 'phys-impulse',
    title: 'Impulse: the area under a force–time graph',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show impulse as the area under a force–time curve during a short push, equal to the change in momentum.',
    ariaLabel: 'A force against time graph. The force rises and falls during a short time Δt. The area under the curve is shaded and labelled impulse J, equal to the change in momentum.',
    steps: [
      { narration: 'Force against time during a short push, like a bat hitting a ball.', objects: [...axes(X0, Y0, 4.4, 2.6, 'time t', 'force F'), curve(pts, ROLE.input)] },
      { narration: 'The push lasts a time Δt.', objects: [line(P(T0, Y0 - 0.4), P(T0 + DT, Y0 - 0.4), ROLE.reference, 0.02), label('Δt', P(T0 + DT / 2, Y0 - 0.8), ROLE.ink, 'primary')] },
      { narration: 'The area under the curve is the impulse, and it equals the change in momentum.', objects: [...shade, label('area = impulse J', P(T0 + DT / 2, Y0 + 1.4), ROLE.aid, 'primary'), label('J = F Δt = Δp', P(2.9, 2.0), ROLE.result, 'primary')] },
    ],
  }
}

// ── 18. Thermal expansion ────────────────────────────────────────────────────

/** KG: "change dimensions with temperature." Linear expansion: ΔL = αL₀ΔT. */
export function buildThermalExpansionScene(): SceneSpec {
  const X0 = -4, L0 = 6, DL = 1.0
  return {
    id: 'phys-thermal-expansion',
    title: 'Thermal expansion: a heated rod gets longer',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show a rod growing longer when heated, by ΔL = αL₀ΔT.',
    ariaLabel: 'A rod of length L₀ at temperature T. Below it the same rod after heating by ΔT, longer by ΔL. The extra length is marked.',
    steps: [
      { narration: 'A metal rod of length L₀ at temperature T.', objects: [line(P(X0, 1.5), P(X0 + L0, 1.5), ROLE.output, 0.18), label('L₀ at T', P(X0 + L0 / 2, 2.1), ROLE.output, 'primary'), line(P(X0 + L0, 2.6), P(X0 + L0, -1.8), ROLE.aid, 0.02)] },
      { narration: 'Heated by ΔT, its particles vibrate more and the rod gets longer by ΔL.', objects: [line(P(X0, -0.8), P(X0 + L0 + DL, -0.8), ROLE.input, 0.18), label('at T + ΔT', P(X0 + L0 / 2, -0.2), ROLE.input, 'primary'), line(P(X0 + L0, -1.5), P(X0 + L0 + DL, -1.5), ROLE.result, 0.04), label('ΔL', P(X0 + L0 + DL / 2, -1.95), ROLE.result, 'primary')] },
      { narration: 'The extra length is proportional to the original length and to the temperature rise.', objects: [label('ΔL = α L₀ ΔT', P(0, 3.4), ROLE.result, 'primary')] },
    ],
  }
}

// ── 19. Phase transitions (heating curve) ────────────────────────────────────

/**
 * KG: "absorb or release latent heat at constant temperature." Heating curve:
 * temperature rises, stays flat while melting, rises, stays flat (longer) while
 * boiling. Not to scale, and labelled so.
 */
export function buildPhaseTransitionsScene(): SceneSpec {
  const X0 = -4.4, Y0 = -2.6
  const pts: Array<[number, number]> = [[-4.4, -2.4], [-3.4, -1.2], [-2.4, -1.2], [-1.2, 0.8], [1.4, 0.8], [2.4, 2.6]]
  const segs: SceneObject[] = []
  const col = [ROLE.output, ROLE.result, ROLE.output, ROLE.result, ROLE.output]
  for (let i = 0; i < pts.length - 1; i++) segs.push(line(P(pts[i][0], pts[i][1]), P(pts[i + 1][0], pts[i + 1][1]), col[i], 0.06))
  return {
    id: 'phys-phase-transitions',
    title: 'Heating curve: flat while the state changes',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show that temperature stays constant during melting and boiling, while latent heat is absorbed.',
    ariaLabel: 'A graph of temperature against heat added. The line rises for the solid, stays flat while melting, rises for the liquid, stays flat for longer while boiling, then rises for the gas.',
    steps: [
      { narration: 'Heat is added steadily to ice, and we watch its temperature.', objects: axes(X0, Y0, 4.4, 3.2, 'heat added', 'temperature') },
      { narration: 'The temperature rises, except during melting and boiling, when it stays flat.', objects: [...segs, label('solid', P(-4.3, -1.5), ROLE.output, 'detail'), label('liquid', P(-2.2, 0.0), ROLE.output, 'detail'), label('gas', P(2.4, 1.6), ROLE.output, 'detail')] },
      { narration: 'On the flat parts, the heat goes into changing the state: latent heat. Boiling water needs more latent heat than melting ice.', objects: [label('melting', P(-2.9, -0.7), ROLE.result, 'primary'), label('boiling', P(0.1, 1.3), ROLE.result, 'primary'), label('flat: latent heat', P(2.4, -1.6), ROLE.result, 'detail'), label('(not to scale)', P(2.9, -2.2), ROLE.reference, 'detail')] },
    ],
  }
}

// ── 20. Ideal gas law ────────────────────────────────────────────────────────

/** KG: "PV = nRT." Two isotherms P = nRT / V, the hotter one (T₂ = 2T₁) higher. */
export function buildIdealGasScene(): SceneSpec {
  const X0 = -4, Y0 = -2.6
  const iso = (c: number): V3[] => {
    const pts: V3[] = []
    // Start where P = c/V fits under the top of the axis, so no clamped flat.
    const v0 = Math.max(0.7, c / 5.3)
    for (let i = 0; i <= 40; i++) { const V = v0 + ((8.1 - v0) * i) / 40; pts.push(P(X0 + V, Y0 + c / V)) }
    return pts
  }
  return {
    id: 'phys-ideal-gas',
    title: 'Ideal gas: pressure against volume at fixed temperature',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show that at fixed temperature, pressure falls as volume grows (PV = nRT), and a hotter gas sits on a higher curve.',
    ariaLabel: 'A graph of pressure against volume with two curves. Each falls as volume increases. The curve for the higher temperature T₂ lies above the one for T₁.',
    steps: [
      { narration: 'Pressure against volume for a fixed amount of gas.', objects: axes(X0, Y0, 4.2, 3.2, 'volume V', 'pressure P') },
      { narration: 'At a fixed temperature T₁, halving the volume doubles the pressure.', objects: [curve(iso(2.4), ROLE.output), label('T₁', P(3.6, Y0 + 0.75), ROLE.output, 'primary')] },
      { narration: 'At a higher temperature T₂ = 2T₁, every pressure is doubled: a higher curve.', objects: [curve(iso(4.8), ROLE.input), label('T₂ = 2T₁', P(3.3, Y0 + 1.25), ROLE.input, 'primary'), label('PV = nRT', P(1.2, 2.6), ROLE.result, 'primary')] },
    ],
  }
}

// ── 21. Wave properties ──────────────────────────────────────────────────────

/** KG: "amplitude, wavelength, period, frequency, and phase, related by v = fλ." */
export function buildWavePropertiesScene(): SceneSpec {
  const X0 = -4.4, X1 = 4.4, A = 1.4, LAMBDA = 3.2
  const crest1 = X0 + LAMBDA / 4, crest2 = crest1 + LAMBDA, trough = crest1 + LAMBDA / 2
  return {
    id: 'phys-wave-properties',
    title: 'Parts of a wave',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Name the parts of a wave — crest, trough, amplitude, wavelength — and relate speed, frequency and wavelength by v = fλ.',
    ariaLabel: 'A transverse wave along a horizontal line. A crest and a trough are labelled. The amplitude is the height from the middle line to a crest. The wavelength is the distance from one crest to the next.',
    steps: [
      { narration: 'A wave moving to the right, drawn at one instant.', objects: [line(P(X0, 0), P(X1, 0), ROLE.reference, 0.02), curve(sinePath({ x0: X0, x1: X1, amplitude: A, wavelength: LAMBDA, samples: 80 }), ROLE.output), arrow(P(2.6, 2.6), P(4.2, 2.6), ROLE.reference), label('travels', P(3.4, 3.0), ROLE.ink, 'detail')] },
      { narration: 'The top points are crests and the bottom points are troughs. The amplitude is the height from the middle line to a crest.', objects: [dot(P(crest1, A), ROLE.input, 0.1), label('crest', P(crest1, A + 0.5), ROLE.input, 'primary'), dot(P(trough, -A), ROLE.input, 0.1), label('trough', P(trough, -A - 0.5), ROLE.input, 'primary'), line(P(crest1 - 0.55, 0), P(crest1 - 0.55, A), ROLE.aid, 0.03), label('amplitude', P(crest1 - 1.4, A / 2), ROLE.aid, 'detail')] },
      { narration: 'The wavelength λ is the distance from one crest to the next. Speed = frequency × wavelength.', objects: [line(P(crest1, A + 1.1), P(crest2, A + 1.1), ROLE.result, 0.03), label('wavelength λ', P((crest1 + crest2) / 2, A + 1.5), ROLE.result, 'primary'), label('v = f λ', P(0, -3.0), ROLE.result, 'primary')] },
    ],
  }
}

// ── 22. Longitudinal waves ───────────────────────────────────────────────────

/**
 * KG: "particle displacement is parallel to the direction of wave propagation,
 * forming compressions and rarefactions." Particles at x + A sin(kx): they
 * crowd where the displacement gradient is most negative (kx = π → x = λ/2)
 * and spread where it is most positive (kx = 0, 2π).
 */
export function buildLongitudinalWaveScene(): SceneSpec {
  // A·k = 0.45 · 2π/4.4 ≈ 0.64 < 1, so particles crowd visibly but never cross.
  // Two rows of 23 = 46 objects: inside the validator's 50-per-step bound.
  const X0 = -4.4, N = 22, SP = 8.8 / N, A = 0.45, LAMBDA = 4.4
  const k = (2 * Math.PI) / LAMBDA
  const dots: SceneObject[] = []
  for (let i = 0; i <= N; i++) {
    const x = X0 + i * SP
    const xd = x + A * Math.sin(k * (x - X0))
    for (const y of [-0.3, 0.3]) dots.push(dot(P(xd, y), ROLE.output, 0.08))
  }
  const comp = X0 + LAMBDA / 2, rare = X0 + LAMBDA
  return {
    id: 'phys-longitudinal-wave',
    title: 'A longitudinal wave: compressions and rarefactions',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show particles moving back and forth along the direction the wave travels, crowding into compressions and spreading into rarefactions.',
    ariaLabel: 'Rows of particles along a line. In some places they are crowded together (compressions) and in others spread apart (rarefactions). The wave travels to the right and each particle moves back and forth along the same direction.',
    steps: [
      { narration: 'Particles along a spring or in air, drawn at one instant.', objects: dots },
      { narration: 'Where they crowd together is a compression; where they spread apart is a rarefaction.', objects: [label('compression', P(comp, 1.4), ROLE.input, 'primary'), label('rarefaction', P(rare, 1.4), ROLE.aid, 'primary'), line(P(comp, 1.0), P(comp, -1.0), ROLE.input, 0.02), line(P(rare, 1.0), P(rare, -1.0), ROLE.aid, 0.02)] },
      { narration: 'Each particle moves back and forth along the same line the wave travels.', objects: [arrow(P(-1.4, -2.2), P(1.4, -2.2), ROLE.reference), label('wave travels', P(0, -2.7), ROLE.ink, 'detail'), arrow(P(-3.5, 2.6), P(-2.7, 2.6), ROLE.result), arrow(P(-3.5, 2.6), P(-4.3, 2.6), ROLE.result), label('particle moves back and forth', P(-2.6, 3.1), ROLE.result, 'detail'), line(P(comp, -1.6), P(comp + LAMBDA, -1.6), ROLE.result, 0.02), label('λ', P(comp + LAMBDA / 2, -1.95), ROLE.result, 'primary')] },
    ],
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// Batch 3 (2026-09-30). phys.mech.power is deliberately NOT here: it is the
// live-generation test fixture ("a concept with no asset").
// ═══════════════════════════════════════════════════════════════════════════

/** A sampled function y = f(x) over [x0, x1] as a path. */
function fnPath(f: (x: number) => number, x0: number, x1: number, samples = 80): V3[] {
  const pts: V3[] = []
  for (let i = 0; i <= samples; i++) { const x = x0 + ((x1 - x0) * i) / samples; pts.push(P(x, f(x))) }
  return pts
}

// ── 23. Bernoulli ────────────────────────────────────────────────────────────

/**
 * KG: "conservation of energy in steady, incompressible fluid flow along a
 * streamline." A pipe narrows: continuity A₁v₁ = A₂v₂ makes the flow faster in
 * the narrow part, and Bernoulli makes its pressure lower (shorter gauge column).
 */
export function buildBernoulliScene(): SceneSpec {
  const H1 = 1.2, H2 = 0.5            // half-heights (areas ∝ height in this 2D pipe)
  const V1 = 0.9, V2 = r2(V1 * H1 / H2) // continuity
  const top: V3[] = [P(-4.8, H1), P(-1.2, H1), P(0.2, H2), P(4.8, H2)]
  const bot: V3[] = top.map((p) => P(p[0], -p[1]))
  const seg = (pts: V3[]) => pts.slice(1).map((p, i) => line(pts[i], p, ROLE.reference, 0.05))
  return {
    id: 'phys-bernoulli',
    title: "Bernoulli's principle: faster flow, lower pressure",
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show fluid speeding up where a pipe narrows (A₁v₁ = A₂v₂) and its pressure dropping there, as Bernoulli\'s equation requires.',
    ariaLabel: 'A horizontal pipe that narrows from a wide section on the left to a narrow section on the right. The flow arrow is short in the wide part and long in the narrow part. Pressure gauge tubes show a tall water column over the wide part and a short one over the narrow part.',
    steps: [
      { narration: 'Water flows through a pipe that narrows.', objects: [...seg(top), ...seg(bot), label('wide: A₁', P(-3.2, -1.8), ROLE.ink, 'detail'), label('narrow: A₂', P(2.8, -1.1), ROLE.ink, 'detail')] },
      { narration: 'The same volume passes each second, so the water must move faster in the narrow part: A₁v₁ = A₂v₂.', objects: [arrow(P(-3.8, 0), P(-3.8 + V1, 0), ROLE.output), label('v₁', P(-3.3, 0.5), ROLE.output, 'primary'), arrow(P(1.6, 0), P(1.6 + V2, 0), ROLE.output), label('v₂ faster', P(2.6, 0.9), ROLE.output, 'primary')] },
      { narration: 'Where the water is faster, its pressure is lower: the gauge column over the narrow part is shorter.', objects: [line(P(-3.0, H1), P(-3.0, H1 + 2.4), ROLE.input, 0.12), label('P₁ higher', P(-2.0, H1 + 2.2), ROLE.input, 'detail'), line(P(2.4, H2), P(2.4, H2 + 1.0), ROLE.input, 0.12), label('P₂ lower', P(3.4, H2 + 1.0), ROLE.input, 'detail'), label('P + ½ρv² + ρgh = constant', P(0, -3.4), ROLE.result, 'primary')] },
    ],
  }
}

// ── 24. Centre of mass ───────────────────────────────────────────────────────

/** KG: "the mass-weighted average position." m₁ = 3 at x = −3, m₂ = 1 at x = +3 → x_cm = −1.5. */
export function buildCenterOfMassScene(): SceneSpec {
  const M1 = 3, M2 = 1, X1 = -3, X2 = 3
  const XCM = (M1 * X1 + M2 * X2) / (M1 + M2)
  return {
    id: 'phys-center-of-mass',
    title: 'Centre of mass: the balance point',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show the centre of mass of two masses as their mass-weighted average position, closer to the heavier mass.',
    ariaLabel: 'A light rod with a heavy mass of 3 kilograms on the left and a light mass of 1 kilogram on the right. The centre of mass is marked closer to the heavy mass, where the rod would balance.',
    steps: [
      { narration: 'A light rod carries a 3 kg mass on the left and a 1 kg mass on the right.', objects: [line(P(X1, 0), P(X2, 0), ROLE.reference, 0.05), dot(P(X1, 0), ROLE.input, 0.42), dot(P(X2, 0), ROLE.output, 0.24), label('m₁ = 3 kg', P(X1, 0.9), ROLE.input, 'primary'), label('m₂ = 1 kg', P(X2, 0.75), ROLE.output, 'primary')] },
      { narration: `The centre of mass is the mass-weighted average position: x = (3 × −3 + 1 × 3) / 4 = ${XCM}.`, objects: [dot(P(XCM, 0), ROLE.result, 0.16), line(P(XCM, -0.3), P(XCM, -1.3), ROLE.result, 0.03), label('centre of mass', P(XCM, -1.7), ROLE.result, 'primary'), label('x_cm = (m₁x₁ + m₂x₂) / (m₁ + m₂)', P(0, 2.6), ROLE.result, 'detail')] },
      { narration: 'It sits closer to the heavier mass. Supported there, the rod balances.', objects: [line(P(XCM - 0.4, -2.4), P(XCM, -1.9), ROLE.reference, 0.04), line(P(XCM + 0.4, -2.4), P(XCM, -1.9), ROLE.reference, 0.04), line(P(XCM - 0.4, -2.4), P(XCM + 0.4, -2.4), ROLE.reference, 0.04), label('balances here', P(XCM + 1.6, -2.3), ROLE.ink, 'detail')] },
    ],
  }
}

// ── 25. Moment of inertia ────────────────────────────────────────────────────

/** KG: "depends on mass distribution about the rotation axis." Same masses at r and 3r: I is 9×. */
export function buildMomentOfInertiaScene(): SceneSpec {
  const R1 = 0.8, R2 = 2.4
  const ratio = Math.round((R2 * R2) / (R1 * R1))
  const dumbbell = (y: number, rr: number, color: string): SceneObject[] => [line(P(-rr, y), P(rr, y), ROLE.reference, 0.04), dot(P(-rr, y), color, 0.3), dot(P(rr, y), color, 0.3)]
  return {
    id: 'phys-moment-of-inertia',
    title: 'Moment of inertia: where the mass is matters',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show that the same masses placed farther from the axis give a larger moment of inertia (I = Σmr²), so the object is harder to spin up.',
    ariaLabel: 'Two dumbbells spinning about the same vertical axis. In the top one the masses are close to the axis; in the bottom one the same masses are three times farther out, giving nine times the moment of inertia.',
    steps: [
      { narration: 'Two dumbbells with the same masses turn about the same vertical axis.', objects: [line(P(0, 3.2), P(0, -3.2), ROLE.aid, 0.03), label('axis', P(0.6, 3.4), ROLE.aid, 'detail'), ...dumbbell(1.6, R1, ROLE.output), label('masses close: r', P(-3.2, 1.6), ROLE.output, 'detail')] },
      { narration: 'Move the masses three times farther out.', objects: [...dumbbell(-1.6, R2, ROLE.input), label('masses far: 3r', P(-3.2, -0.8), ROLE.input, 'detail')] },
      { narration: `I = Σmr², so three times the distance gives ${ratio} times the moment of inertia: much harder to start or stop spinning.`, objects: [label('I = Σ m r²', P(2.9, 1.6), ROLE.result, 'primary'), label(`I_far = ${ratio} × I_close`, P(2.9, -2.4), ROLE.input, 'primary')] },
    ],
  }
}

// ── 26. Spring–mass oscillator ───────────────────────────────────────────────

/** KG: "SHM with angular frequency ω = √(k/m) and period T = 2π√(m/k)." */
export function buildSpringMassScene(): SceneSpec {
  const X = -2.6, TOP = 3.4, EQ = -0.4, A = 1.1
  const spring: V3[] = [P(X, TOP)]
  for (let i = 1; i < 18; i++) spring.push(P(X + (i % 2 ? 0.3 : -0.3), TOP - ((TOP - EQ - 0.3) * i) / 18))
  spring.push(P(X, EQ + 0.3))
  const gx0 = 0.2, gx1 = 4.6
  return {
    id: 'phys-spring-mass',
    title: 'A mass on a spring oscillates',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show a mass bouncing on a spring between +A and −A about equilibrium, its position tracing a sine curve in time, with period T = 2π√(m/k).',
    ariaLabel: 'A mass hanging from a spring, with its equilibrium level and the top and bottom of its motion, +A and −A, marked. Beside it, a graph of position against time is a sine curve between +A and −A.',
    steps: [
      { narration: 'A mass hangs on a spring at its equilibrium position.', objects: [line(P(X - 1, TOP), P(X + 1, TOP), ROLE.reference, 0.06), curve(spring, ROLE.aid), dot(P(X, EQ), ROLE.input, 0.32), line(P(-4.4, EQ), P(-0.8, EQ), ROLE.aid, 0.02), label('equilibrium', P(-4.1, EQ + 0.35), ROLE.aid, 'detail')] },
      { narration: 'Pulled down and let go, it moves up and down between +A and −A.', objects: [line(P(-1.4, EQ + A), P(-1.4, EQ - A), ROLE.input, 0.03), label('+A', P(-1.0, EQ + A), ROLE.input, 'primary'), label('−A', P(-1.0, EQ - A), ROLE.input, 'primary')] },
      { narration: 'Its position traces a sine curve in time. One full cycle takes T = 2π√(m/k): heavier masses and softer springs oscillate more slowly.', objects: [...axes(gx0, EQ, gx1, EQ + 2.2, 'time', 'position'), // Released from −A at t = 0 ("pulled down and let go"): x(t) = −A cos ωt.
        curve(fnPath((x) => EQ - A * Math.cos(((x - gx0) * 2 * Math.PI) / 2.0), gx0, gx1 - 0.3), ROLE.input), line(P(gx0 + 0.5, EQ - 1.6), P(gx0 + 2.5, EQ - 1.6), ROLE.result, 0.03), label('T', P(gx0 + 1.5, EQ - 2.0), ROLE.result, 'primary'), label('T = 2π√(m/k)', P(2.4, 3.2), ROLE.result, 'primary')] },
    ],
  }
}

// ── 27. Damped oscillations ──────────────────────────────────────────────────

/** KG: "the amplitude to decrease exponentially with time." x(t) = A e^{−bt} cos(ωt), inside ±A e^{−bt}. */
export function buildDampedOscillationScene(): SceneSpec {
  const X0 = -4.2, Y0 = 0, A = 2.4, B = 0.32, W = 2 * Math.PI / 1.3
  const env = (x: number) => A * Math.exp(-B * (x - X0))
  return {
    id: 'phys-damped-oscillation',
    title: 'Damped oscillation: the swings die away',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show an oscillation whose amplitude shrinks exponentially, always inside the envelope ±A e^(−bt).',
    ariaLabel: 'A graph of displacement against time. The curve oscillates but each swing is smaller than the last, staying between two dashed curves that shrink exponentially toward zero.',
    steps: [
      { narration: 'Displacement against time for an oscillator with friction or air resistance.', objects: axes(X0, Y0, 4.6, 3.2, 'time', 'displacement') },
      { narration: 'Each swing is smaller than the one before.', objects: [curve(fnPath((x) => Y0 + env(x) * Math.cos(W * (x - X0)), X0, 4.2, 120), ROLE.output)] },
      { narration: 'The peaks follow an exponential envelope, A e^(−bt): energy is steadily lost to the resistive force.', objects: [curve(fnPath((x) => Y0 + env(x), X0, 4.2), ROLE.input), curve(fnPath((x) => Y0 - env(x), X0, 4.2), ROLE.input), label('envelope A e^(−bt)', P(1.6, 1.4), ROLE.input, 'primary')] },
    ],
  }
}

// ── 28. Superposition ────────────────────────────────────────────────────────

/** KG: "the resultant displacement is the algebraic sum of displacements." y = y₁ + y₂, computed point by point. */
export function buildSuperpositionScene(): SceneSpec {
  const X0 = -4.4, X1 = 4.4, L = 4.4
  const y1 = (x: number) => 0.7 * Math.sin((2 * Math.PI * (x - X0)) / L)
  const y2 = (x: number) => 0.45 * Math.sin((4 * Math.PI * (x - X0)) / L)
  const O1 = 2.6, O2 = 0.9, OS = -1.9
  return {
    id: 'phys-superposition',
    title: 'Superposition: waves add point by point',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show two waves and the wave they make together: at every point the displacements simply add.',
    ariaLabel: 'Three traces. The top two are two different waves. The bottom trace is their sum, drawn by adding the two displacements at every point; a vertical guide shows one point where the heights add.',
    steps: [
      { narration: 'Two waves pass through the same place.', objects: [line(P(X0, O1), P(X1, O1), ROLE.reference, 0.015), curve(fnPath((x) => O1 + y1(x), X0, X1), ROLE.input), label('wave 1', P(-4.2, O1 + 0.95), ROLE.input, 'detail'), line(P(X0, O2), P(X1, O2), ROLE.reference, 0.015), curve(fnPath((x) => O2 + y2(x), X0, X1), ROLE.output), label('wave 2', P(-4.2, O2 + 0.75), ROLE.output, 'detail')] },
      { narration: 'At every point, the total displacement is the sum of the two: y = y₁ + y₂.', objects: [line(P(X0, OS), P(X1, OS), ROLE.reference, 0.015), curve(fnPath((x) => OS + y1(x) + y2(x), X0, X1, 120), ROLE.result), label('sum', P(-4.2, OS + 1.3), ROLE.result, 'primary'), line(P(-3.3, O1 + 1.1), P(-3.3, OS - 1.2), ROLE.aid, 0.015), label('y = y₁ + y₂', P(2.6, -3.6), ROLE.result, 'primary')] },
    ],
  }
}

// ── 29. Beats ────────────────────────────────────────────────────────────────

/** KG: "periodic variations in amplitude … two waves of slightly different frequencies." Envelope 2A cos(π Δf t); f_beat = |f₁ − f₂|. */
export function buildBeatsScene(): SceneSpec {
  const X0 = -4.4, X1 = 4.4, A = 0.9, F1 = 4.0, F2 = 3.5   // cycles per 8.8 units → Δf = 0.5 → one beat per 8.8/… units
  const t = (x: number) => (x - X0) / (X1 - X0)
  const sum = (x: number) => A * (Math.sin(2 * Math.PI * F1 * 2 * t(x)) + Math.sin(2 * Math.PI * F2 * 2 * t(x)))
  const env = (x: number) => 2 * A * Math.abs(Math.cos(Math.PI * (F1 - F2) * 2 * t(x)))
  const beatLen = (X1 - X0) / ((F1 - F2) * 2)
  return {
    id: 'phys-beats',
    title: 'Beats: loud, soft, loud',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show two sounds of slightly different frequency adding into one whose loudness rises and falls, f_beat = |f₁ − f₂| times per second.',
    ariaLabel: 'The sum of two waves of slightly different frequency. Its amplitude swells and shrinks regularly, following a dashed envelope; the time between two loud points is one beat.',
    steps: [
      { narration: 'Two notes with slightly different frequencies play together. Their sum is drawn here.', objects: [line(P(X0, 0), P(X1, 0), ROLE.reference, 0.015), curve(fnPath((x) => sum(x), X0, X1, 240), ROLE.output)] },
      { narration: 'Where the waves line up the sound is loud; where they cancel it is soft. The loudness follows the envelope.', objects: [curve(fnPath((x) => env(x), X0, X1, 120), ROLE.input), curve(fnPath((x) => -env(x), X0, X1, 120), ROLE.input), label('loud', P(X0 + 0.2, 2.3), ROLE.input, 'detail'), label('soft', P(X0 + beatLen / 2, 0.6), ROLE.input, 'detail')] },
      { narration: 'One beat is the time from one loud point to the next. The number of beats per second is the difference of the two frequencies.', objects: [line(P(X0, -2.3), P(X0 + beatLen, -2.3), ROLE.result, 0.03), label('one beat', P(X0 + beatLen / 2, -2.7), ROLE.result, 'primary'), label('f_beat = |f₁ − f₂|', P(0, 3.3), ROLE.result, 'primary')] },
    ],
  }
}

// ── 30. Dispersion ───────────────────────────────────────────────────────────

/** KG: "separation of white light … by a prism due to wavelength-dependent refractive index." Red bends least, blue/violet most. */
export function buildDispersionScene(): SceneSpec {
  const A: V3 = P(-1.6, -2.2), B: V3 = P(1.6, -2.2), C: V3 = P(0, 2.4)
  const hit: V3 = P(-0.8, 0.1), out: V3 = P(0.75, 0.05)
  const fan = (dy: number, color: string, name: string): SceneObject[] => [line(hit, out, color, 0.02), arrow(out, P(3.8, out[1] - dy), color), label(name, P(4.5, out[1] - dy), color, 'detail')]
  return {
    id: 'phys-dispersion',
    title: 'Dispersion: a prism splits white light',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show white light entering a prism and leaving as a spread of colours, with red bent least and blue/violet bent most.',
    ariaLabel: 'A triangular glass prism. A white light ray enters from the left and leaves on the right as a fan of colours: red is bent the least, green more, and blue the most.',
    steps: [
      { narration: 'White light enters a glass prism.', objects: [line(A, B, ROLE.reference, 0.05), line(B, C, ROLE.reference, 0.05), line(C, A, ROLE.reference, 0.05), arrow(P(-4.6, 1.2), hit, ROLE.ink), label('white light', P(-3.6, 1.7), ROLE.ink, 'primary'), label('prism', P(0, -2.7), ROLE.ink, 'detail')] },
      { narration: 'Glass bends each colour by a different amount, because its refractive index depends on wavelength.', objects: [...fan(0.6, ROLE.input, 'red'), ...fan(1.3, ROLE.result, 'green'), ...fan(2.0, ROLE.output, 'blue')] },
      { narration: 'Red, with the longest wavelength, is bent least; blue and violet are bent most.', objects: [label('bent least', P(2.4, 0.3), ROLE.input, 'detail'), label('bent most', P(1.8, -1.8), ROLE.output, 'detail')] },
    ],
  }
}

// ── 31. Single-slit diffraction ──────────────────────────────────────────────

/** KG: "a central maximum flanked by progressively weaker secondary maxima." I ∝ (sin β / β)². */
export function buildSingleSlitScene(): SceneSpec {
  const X0 = -4.4, X1 = 4.4, Y0 = -2.2, H = 4.4, S = 1.1  // one minimum every S units from centre
  const I = (x: number) => { const b = (Math.PI * x) / S; return b === 0 ? 1 : (Math.sin(b) / b) ** 2 }
  return {
    id: 'phys-single-slit',
    title: 'Single-slit diffraction pattern',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show the brightness pattern from one narrow slit: a wide, bright central maximum with much weaker side maxima, separated by dark minima.',
    ariaLabel: 'A graph of brightness across the screen. A tall, wide central peak is flanked by much smaller peaks that get weaker further out, with dark points of zero brightness between them.',
    steps: [
      { narration: 'Light through one narrow slit lands on a screen. This is its brightness across the screen.', objects: [line(P(X0, Y0), P(X1, Y0), ROLE.reference, 0.03), label('position on screen', P(3.2, Y0 - 0.5), ROLE.ink, 'detail'), curve(fnPath((x) => Y0 + H * I(x), X0, X1, 200), ROLE.output)] },
      { narration: 'The central maximum is bright and twice as wide as the others.', objects: [label('central maximum', P(0, Y0 + H + 0.4), ROLE.output, 'primary'), line(P(-S, Y0 - 0.25), P(S, Y0 - 0.25), ROLE.output, 0.03)] },
      { narration: 'Side maxima are much weaker, and get weaker further out. Between them are dark minima.', objects: [label('weaker side maxima', P(2.6, Y0 + 1.1), ROLE.input, 'detail'), dot(P(S, Y0), ROLE.result, 0.08), dot(P(-S, Y0), ROLE.result, 0.08), label('dark', P(-S - 0.1, Y0 + 0.45), ROLE.result, 'detail')] },
    ],
  }
}

// ── 32. Capacitance ──────────────────────────────────────────────────────────

/** KG: "a capacitor's ability to store electric charge; C = Q/V." Parallel plates, +Q / −Q, field between, battery V. */
export function buildCapacitanceScene(): SceneSpec {
  const XL = -1.0, XR = 1.0, T = 1.8
  const field: SceneObject[] = []
  for (const y of [-1.2, -0.4, 0.4, 1.2]) field.push(arrow(P(XL + 0.15, y), P(XR - 0.15, y), ROLE.aid))
  return {
    id: 'phys-capacitance',
    title: 'A parallel-plate capacitor stores charge',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show a capacitor charged by a battery: +Q on one plate, −Q on the other, a field between them, and C = Q / V.',
    ariaLabel: 'Two parallel metal plates connected to a battery. The left plate holds positive charge +Q and the right plate negative charge −Q. Electric field arrows point from the positive plate to the negative plate.',
    steps: [
      { narration: 'Two metal plates face each other with a gap between them, connected to a battery of voltage V.', objects: [line(P(XL, -T), P(XL, T), ROLE.input, 0.1), line(P(XR, -T), P(XR, T), ROLE.output, 0.1), line(P(XL, -T), P(XL, -3.0), ROLE.reference, 0.03), line(P(XR, -T), P(XR, -3.0), ROLE.reference, 0.03), line(P(XL, -3.0), P(-0.35, -3.0), ROLE.reference, 0.03), line(P(0.35, -3.0), P(XR, -3.0), ROLE.reference, 0.03), line(P(-0.35, -2.6), P(-0.35, -3.4), ROLE.reference, 0.06), line(P(0.35, -2.8), P(0.35, -3.2), ROLE.reference, 0.06), label('battery V', P(0, -3.9), ROLE.ink, 'detail')] },
      { narration: 'The battery moves charge: one plate gets +Q, the other −Q.', objects: [label('+Q', P(XL - 0.7, T + 0.3), ROLE.input, 'primary'), label('−Q', P(XR + 0.7, T + 0.3), ROLE.output, 'primary')] },
      { narration: 'An electric field points from + to − across the gap. The capacitance is the charge stored per volt: C = Q / V.', objects: [...field, label('field', P(0, 2.4), ROLE.aid, 'detail'), label('C = Q / V', P(3.2, 0.2), ROLE.result, 'primary')] },
    ],
  }
}

// ── 33. Solenoid ─────────────────────────────────────────────────────────────

/** KG: "a uniform axial magnetic field B = μ₀nI inside." Turns drawn as loops; straight, evenly spaced field lines inside. */
export function buildSolenoidScene(): SceneSpec {
  const X0 = -3.0, X1 = 3.0, R = 1.0, N = 9
  const turns: SceneObject[] = []
  for (let i = 0; i < N; i++) {
    const x = X0 + ((X1 - X0) * i) / (N - 1)
    turns.push(curve(circlePoints(x, 0, R, Math.PI / 2, (3 * Math.PI) / 2, 12).map((p) => P(x + (p[0] - x) * 0.25, p[1])), ROLE.input))
    turns.push(curve(circlePoints(x, 0, R, -Math.PI / 2, Math.PI / 2, 12).map((p) => P(x + (p[0] - x) * 0.25, p[1])), ROLE.reference))
  }
  const inside: SceneObject[] = [-0.5, 0, 0.5].map((y) => arrow(P(X0 - 0.6, y), P(X1 + 0.8, y), ROLE.aid))
  return {
    id: 'phys-solenoid',
    title: 'Magnetic field of a solenoid',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show a current-carrying coil with a strong, uniform magnetic field along its axis inside, B = μ₀nI.',
    ariaLabel: 'A long coil of wire drawn as a row of loops carrying current. Inside the coil, straight, evenly spaced field lines run along its axis from one end to the other.',
    steps: [
      { narration: 'A long coil of wire — a solenoid — carries a current I.', objects: [...turns, label('current I', P(X0 - 0.2, R + 0.5), ROLE.input, 'primary')] },
      { narration: 'Inside, the magnetic field lines are straight, parallel and evenly spaced: the field is uniform along the axis.', objects: [...inside, label('uniform field inside', P(0, -1.6), ROLE.aid, 'primary'), label('N', P(X1 + 1.2, 0.8), ROLE.input, 'primary'), label('S', P(X0 - 1.0, 0.8), ROLE.output, 'primary')] },
      { narration: 'Its strength depends on the turns per metre n and the current: B = μ₀nI.', objects: [label('B = μ₀ n I', P(0, 2.6), ROLE.result, 'primary')] },
    ],
  }
}
