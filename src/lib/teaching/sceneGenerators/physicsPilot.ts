/**
 * Physics visual authoring pilot — seven concept-specific scenes.
 *
 * These are the seven concepts the whole visualization programme started from.
 * Before M1 they were served a figure keyword-matched from the tutor's own
 * prose — a concave mirror for Total Internal Reflection, a two-cart collision
 * for Calorimetry, a projectile parabola for Viscosity. M1 removed those
 * pipelines, which was correct and left all seven with no figure at all, so the
 * tutor fell back to "imagine drawing…". This module is the other half of the
 * fix: an actual figure for each, authored rather than guessed.
 *
 * WHAT THIS IS NOT. Not a new engine and not a new renderer. Every scene is a
 * plain SceneSpec built from the primitives SceneSpecRenderer already paints,
 * and each goes through the same registry → resolver → admission → contract
 * path as every other asset. No LLM, no network, no generated code.
 *
 * ── AUTHORING RULES (M4.1) ──────────────────────────────────────────────────
 *  1. One shared visual language. Colour, type size and geometry helpers come
 *     from visualDesign.ts; no scene invents its own palette.
 *  2. Labels are NAMES, not sentences. "normal", "crest", "heat in". The
 *     explanation is the tutor's job, and the contract feeds it from these
 *     same labels.
 *  3. Every label has one clear referent and sits clear of the geometry it
 *     names. Arrow/bond text is avoided: it renders at the midpoint, on top of
 *     the thing it describes.
 *  4. STEPS ARE CUMULATIVE. Objects from step i remain on screen at step i+1,
 *     and the default view is the COMPLETE figure. Therefore no annotation may
 *     make a claim that is only true during its own step — a label reading "no
 *     refracted ray" while an earlier step's refracted ray is still on screen
 *     is a figure that contradicts itself. Case-specific statements are scoped
 *     to their own region of the canvas.
 *  5. Coordinates stay inside ±5 so the camera frames everything without
 *     clipping at any viewport width.
 */

import type { SceneSpec } from '@/lib/teaching/sceneSpec'
import {
  ROLE, arrow, box, curve, dot, hatch, heading, label, line, sinePath,
} from './visualDesign'

// ── 1. Total Internal Reflection ─────────────────────────────────────────────

/**
 * The regression case, and the hardest layout in the pilot.
 *
 * Three incidence angles against ONE boundary, each striking at its own point
 * so the three cases never overlap and each can carry its own annotation. The
 * progression IS the concept: the refracted ray swings further from the normal,
 * lies flat at the critical angle, and is gone beyond it.
 *
 * SEMANTIC CORRECTNESS. Case ③ has no refracted ray drawn, and the only
 * statement about that fact — "nothing escapes here" — sits directly above ③'s
 * own strike point, where the canvas is genuinely empty. It is deliberately not
 * a claim about the figure as a whole, because case ① legitimately shows a
 * refracted ray and the steps are cumulative.
 *
 * Physics: n₁ = 1.5 (glass), n₂ = 1 (air) → θc = 41.8°. The three angles drawn
 * are 30° (< θc), 41.8° (= θc) and 58° (> θc), and each ray's geometry is
 * computed from its angle rather than eyeballed.
 */
export function buildTotalInternalReflectionScene(): SceneSpec {
  // Ray geometry from real angles, measured from the normal (vertical).
  const rad = (deg: number) => (deg * Math.PI) / 180
  const r = (n: number) => Math.round(n * 100) / 100
  /** Incident ray arriving at `hit` from below-left at θ from the normal. */
  const incoming = (hitX: number, deg: number, len: number) =>
    [r(hitX - Math.sin(rad(deg)) * len), r(-Math.cos(rad(deg)) * len), 0] as [number, number, number]
  /** Ray leaving `hit` upward-right at θ from the normal. */
  const outgoing = (hitX: number, deg: number, len: number) =>
    [r(hitX + Math.sin(rad(deg)) * len), r(Math.cos(rad(deg)) * len), 0] as [number, number, number]

  const A = -3.2, B = 0, C = 3.2          // the three strike points
  const THETA_C = 41.8

  return {
    id: 'phys-tir',
    title: 'Total internal reflection at a glass–air boundary',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal:
      'Show the refracted ray swinging further from the normal as the angle of incidence grows, ' +
      'lying flat along the boundary at the critical angle, and vanishing beyond it so all the ' +
      'light stays inside the glass.',
    ariaLabel:
      'A horizontal glass–air boundary. Three light rays travel up through the glass and strike ' +
      'it at three separate points, at angles below, equal to, and above the critical angle. The ' +
      'first refracts out into the air, the second runs flat along the boundary, and the third is ' +
      'reflected entirely back into the glass with no ray above the boundary at that point.',
    steps: [
      {
        narration:
          'Light inside the glass meets the boundary with the air above. Every angle is measured ' +
          'from the normal — the line perpendicular to the surface — never from the surface itself.',
        objects: [
          line([-5.0, 0, 0], [5.0, 0, 0], ROLE.reference, 0.05),
          ...hatch(-4.6, 4.6, 0, 11, 0.34),
          label('air · rarer, n₂', [-4.15, 3.15, 0], ROLE.ink, 'primary'),
          label('glass · denser, n₁', [-3.9, -0.55, 0], ROLE.ink, 'primary'),
          line([B, -1.5, 0], [B, 1.9, 0], ROLE.aid, 0.03),
          label('normal', [0.62, 2.3, 0], ROLE.aid, 'detail'),
        ],
      },
      {
        narration:
          'Below the critical angle the light crosses into the air, bending away from the normal ' +
          'because it speeds up in the rarer medium.',
        objects: [
          line([A, -1.3, 0], [A, 1.6, 0], ROLE.aid, 0.03),
          arrow(incoming(A, 30, 2.1), [A, 0, 0], ROLE.input),
          arrow([A, 0, 0], outgoing(A, 48.6, 2.1), ROLE.output),
          dot([A, 0, 0], ROLE.input, 0.1),
          label('① θ < θc', [-4.35, -2.35, 0], ROLE.input, 'primary'),
          label('escapes', [-1.75, 1.95, 0], ROLE.output, 'detail'),
        ],
      },
      {
        narration:
          'At one particular angle — the critical angle — the refracted ray comes so far over that ' +
          'it runs flat along the boundary itself.',
        objects: [
          arrow(incoming(B, THETA_C, 2.1), [B, 0, 0], ROLE.input),
          arrow([B, 0, 0], [1.95, 0.06, 0], ROLE.result),
          dot([B, 0, 0], ROLE.input, 0.1),
          label('② θ = θc', [-1.75, -2.05, 0], ROLE.input, 'primary'),
          label('grazes the surface', [1.6, 0.75, 0], ROLE.result, 'detail'),
          label('sin θc = n₂ / n₁', [-0.55, -3.7, 0], ROLE.result, 'detail'),
        ],
      },
      {
        narration:
          'Past the critical angle there is no refracted ray left to bend. Every bit of the light ' +
          'is reflected back into the glass — total internal reflection.',
        objects: [
          line([C, -1.3, 0], [C, 1.6, 0], ROLE.aid, 0.03),
          arrow(incoming(C, 58, 2.1), [C, 0, 0], ROLE.input),
          arrow([C, 0, 0], [r(C + Math.sin(rad(58)) * 2.1), r(-Math.cos(rad(58)) * 2.1), 0], ROLE.input),
          dot([C, 0, 0], ROLE.input, 0.1),
          label('③ θ > θc', [1.0, -2.6, 0], ROLE.input, 'primary'),
          // Scoped to ③'s own strike point, where the canvas really is empty.
          // Not a claim about the whole figure — ① genuinely refracts.
          label('nothing escapes here', [3.45, 1.6, 0], ROLE.reference, 'detail'),
          label('all reflected back', [4.3, -1.95, 0], ROLE.input, 'detail'),
        ],
      },
    ],
  }
}

// ── 2. Transverse Waves ──────────────────────────────────────────────────────

/**
 * The teaching message is a right angle: the wave goes one way, the medium moves
 * across it. So the two direction arrows are drawn as an explicit L with a
 * right-angle tick between them, rather than being described in a sentence.
 */
export function buildTransverseWaveScene(): SceneSpec {
  const wave = sinePath({ x0: -4.5, x1: 4.5, amplitude: 1.25, wavelength: 4.5 })
  return {
    id: 'phys-transverse-wave',
    title: 'Transverse wave: the medium moves across the direction of travel',
    sceneType: 'diagram',
    cameraDistance: 12,
    teachingGoal:
      'Show that the wave travels horizontally while each particle of the medium only moves up ' +
      'and down — the two directions are perpendicular — and name the crest, trough and wavelength.',
    ariaLabel:
      'A sine-shaped wave on a horizontal rest line, with a crest and a trough marked and one ' +
      'wavelength spanned between two crests. A horizontal arrow shows the wave travelling right; ' +
      'a vertical arrow on the wave shows a particle moving up and down, and a right-angle mark ' +
      'between the two shows they are perpendicular.',
    steps: [
      {
        narration:
          'This is the shape of the wave at one instant. The straight line is where the medium ' +
          'would rest if no wave were passing.',
        objects: [
          line([-4.8, 0, 0], [4.8, 0, 0], ROLE.reference, 0.03),
          curve(wave, ROLE.output),
          label('rest position', [-3.15, -0.5, 0], ROLE.reference, 'detail'),
        ],
      },
      {
        narration: 'The high points are crests, the low points troughs, and one wavelength spans crest to crest.',
        objects: [
          dot([-3.38, 1.25, 0], ROLE.result, 0.19),
          label('crest', [-3.38, 1.85, 0], ROLE.result, 'primary'),
          dot([-1.13, -1.25, 0], ROLE.aid, 0.19),
          label('trough', [-1.13, -1.85, 0], ROLE.aid, 'primary'),
          dot([1.12, 1.25, 0], ROLE.result, 0.19),
          line([-3.38, 2.55, 0], [1.12, 2.55, 0], ROLE.ink, 0.03),
          label('one wavelength λ', [-1.13, 3.05, 0], ROLE.ink, 'primary'),
        ],
      },
      {
        narration: 'The wave itself travels to the right.',
        objects: [
          arrow([1.7, -2.85, 0], [4.5, -2.85, 0], ROLE.result),
          label('wave travels', [3.1, -3.35, 0], ROLE.result, 'primary'),
        ],
      },
      {
        narration:
          'But the medium does not travel with it. Each particle only moves up and down, straight ' +
          'across the direction of travel. That right angle is what makes the wave transverse.',
        objects: [
          arrow([3.37, -1.25, 0], [3.37, 1.25, 0], ROLE.input),
          label('particle moves', [4.15, 1.75, 0], ROLE.input, 'primary'),
          // An explicit right-angle mark between the two directions.
          line([3.37, -2.85, 0], [3.82, -2.85, 0], ROLE.ink, 0.025),
          line([3.82, -2.85, 0], [3.82, -2.4, 0], ROLE.ink, 0.025),
          label('90°', [4.35, -2.6, 0], ROLE.ink, 'detail'),
        ],
      },
    ],
  }
}

// ── 3. Wave Interference ─────────────────────────────────────────────────────

/**
 * Two cases side by side. Steps are cumulative, so drawing the out-of-phase pair
 * in the same space as the in-phase pair would leave four tangled curves; the
 * contrast is carried by panel position and by geometry (a tall wave against a
 * flat line), not by colour alone.
 */
export function buildWaveInterferenceScene(): SceneSpec {
  const L = { x0: -4.7, x1: -0.5 }
  const R = { x0: 0.5, x1: 4.7 }
  const wl = 2.1
  const a = 0.58
  return {
    id: 'phys-wave-interference',
    title: 'Interference: waves that add, and waves that cancel',
    sceneType: 'comparison',
    cameraDistance: 13,
    teachingGoal:
      'Show that two overlapping waves add displacement by displacement: in step they build a ' +
      'bigger wave, half a wavelength apart they cancel to a flat line.',
    ariaLabel:
      'Two panels. On the left, two identical waves in step and, below them, their combined wave ' +
      'at double the height. On the right, two waves half a wavelength apart and, below them, ' +
      'their combined result: a flat line.',
    steps: [
      {
        narration: 'On the left, two waves arrive exactly in step — every crest lines up with a crest.',
        objects: [
          heading('CONSTRUCTIVE', [-2.6, 3.35, 0], ROLE.result),
          curve(sinePath({ ...L, amplitude: a, wavelength: wl, yOffset: 2.1 }), ROLE.output),
          curve(sinePath({ ...L, amplitude: a, wavelength: wl, yOffset: 1.0 }), ROLE.aid),
          label('wave 1', [-4.95, 2.1, 0], ROLE.output, 'detail'),
          label('wave 2', [-4.95, 1.0, 0], ROLE.aid, 'detail'),
        ],
      },
      {
        narration:
          'Add them displacement by displacement and the crests reinforce. Crest plus crest gives ' +
          'a crest twice as tall.',
        objects: [
          curve(sinePath({ ...L, amplitude: 2 * a, wavelength: wl, yOffset: -1.5 }), ROLE.result),
          label('twice as tall', [-2.6, -3.05, 0], ROLE.result, 'primary'),
        ],
      },
      {
        narration:
          'On the right the second wave is shifted by half a wavelength, so every crest of one ' +
          'meets a trough of the other.',
        objects: [
          heading('DESTRUCTIVE', [2.6, 3.35, 0], ROLE.input),
          curve(sinePath({ ...R, amplitude: a, wavelength: wl, yOffset: 2.1 }), ROLE.output),
          curve(sinePath({ ...R, amplitude: a, wavelength: wl, yOffset: 1.0, phase: Math.PI }), ROLE.aid),
          label('half a wavelength apart', [2.6, 0.05, 0], ROLE.ink, 'detail'),
        ],
      },
      {
        narration:
          'Now the displacements are equal and opposite everywhere, so they add to zero. The ' +
          'combined wave is a flat line — the waves have cancelled.',
        objects: [
          line([R.x0, -1.5, 0], [R.x1, -1.5, 0], ROLE.input, 0.06),
          label('cancels to nothing', [2.6, -4.15, 0], ROLE.input, 'primary'),
        ],
      },
    ],
  }
}

// ── 4. Calorimetry ───────────────────────────────────────────────────────────

export function buildCalorimetryScene(): SceneSpec {
  return {
    id: 'phys-calorimetry',
    title: 'Calorimetry: what the hot body loses, the water gains',
    sceneType: 'process',
    cameraDistance: 13,
    teachingGoal:
      'Show heat flowing out of a hot body into the water around it inside an insulated ' +
      'calorimeter, until both settle at one common final temperature.',
    ariaLabel:
      'An insulated calorimeter, hatched on the outside, holding water with a thermometer in it. ' +
      'A hot block sits in the water and three arrows show heat flowing outward from the block ' +
      'into the water. Both end at one final temperature.',
    steps: [
      {
        narration:
          'A calorimeter is an insulated container. Almost no heat leaks to the room, so whatever ' +
          'one thing inside loses, another thing inside gains.',
        objects: [
          line([-3.0, 2.3, 0], [-3.0, -2.1, 0], ROLE.reference, 0.06),
          line([-3.0, -2.1, 0], [3.0, -2.1, 0], ROLE.reference, 0.06),
          line([3.0, -2.1, 0], [3.0, 2.3, 0], ROLE.reference, 0.06),
          ...hatch(-2.9, 2.9, -2.15, 10, 0.32),
          label('insulated', [0, -2.95, 0], ROLE.reference, 'detail'),
          line([-3.0, 1.15, 0], [3.0, 1.15, 0], ROLE.output, 0.045),
          label('water', [-2.15, 0.5, 0], ROLE.output, 'primary'),
        ],
      },
      {
        narration: 'A thermometer reads the water temperature — the number you actually measure.',
        objects: [
          line([2.2, 3.1, 0], [2.2, 0.25, 0], ROLE.ink, 0.035),
          dot([2.2, 0.15, 0], ROLE.input, 0.14),
          label('thermometer', [2.2, 3.55, 0], ROLE.ink, 'detail'),
        ],
      },
      {
        narration: 'Drop in a block hotter than the water, and energy starts moving.',
        objects: [
          dot([-1.1, -0.5, 0], ROLE.input, 0.45),
          label('hot block', [-1.1, -1.45, 0], ROLE.input, 'primary'),
        ],
      },
      {
        narration:
          'Heat always travels from hotter to colder — out of the block, into the water. Never the ' +
          'other way round on its own.',
        objects: [
          arrow([-0.6, -0.15, 0], [0.75, 0.5, 0], ROLE.input),
          arrow([-0.6, -0.85, 0], [0.75, -1.5, 0], ROLE.input),
          arrow([-1.6, -0.15, 0], [-2.5, 0.5, 0], ROLE.input),
          label('heat flows hot → cold', [1.05, -0.42, 0], ROLE.input, 'primary'),
        ],
      },
      {
        narration:
          'The flow stops when both reach the same temperature. Because nothing escaped the ' +
          'container, the heat the block lost equals the heat the water gained — and that single ' +
          'equation is what you solve.',
        objects: [
          label('both end at one final temperature T_f', [0, 2.85, 0], ROLE.result, 'primary'),
          label('heat lost = heat gained', [0, -3.55, 0], ROLE.result, 'detail'),
        ],
      },
    ],
  }
}

// ── 5. First Law of Thermodynamics ───────────────────────────────────────────

export function buildFirstLawScene(): SceneSpec {
  return {
    id: 'phys-first-law',
    title: 'First law of thermodynamics: ΔU = Q − W',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal:
      'Show the energy bookkeeping of a closed system: heat crossing the boundary inwards, work ' +
      'crossing it outwards, and the internal energy left over as the difference.',
    ariaLabel:
      'A box representing a gas system. A red arrow labelled Q in points into it from the left, a ' +
      'blue arrow labelled W out points away to the right, and the change in internal energy sits ' +
      'inside the box. Below, the equation delta U equals Q minus W.',
    steps: [
      {
        narration:
          'Draw a boundary around the thing you are studying. Inside is the system; outside is ' +
          'everything else.',
        objects: [
          ...box(-1.75, -1.55, 1.75, 1.55),
          label('the system', [0, 2.05, 0], ROLE.reference, 'primary'),
        ],
      },
      {
        narration: 'Add heat. Energy crosses the boundary inwards — that is Q, and the system gains it.',
        objects: [
          arrow([-4.6, 0, 0], [-1.95, 0, 0], ROLE.input),
          label('Q in', [-3.25, 0.6, 0], ROLE.input, 'primary'),
        ],
      },
      {
        narration:
          'The gas expands and pushes on its surroundings. Energy crosses the boundary outwards as ' +
          'work — that is W, and the system spends it.',
        objects: [
          arrow([1.95, 0, 0], [4.6, 0, 0], ROLE.output),
          label('W out', [3.25, 0.6, 0], ROLE.output, 'primary'),
        ],
      },
      {
        narration:
          'Whatever is left over stays inside as internal energy. Nothing is created or destroyed ' +
          'here — it is only counted: what came in, minus what went out.',
        objects: [
          dot([0, 0, 0], ROLE.aid, 0.34),
          label('ΔU', [0, 0.85, 0], ROLE.aid, 'primary'),
          heading('ΔU = Q − W', [0, -2.75, 0], ROLE.result),
        ],
      },
    ],
  }
}

// ── 6. Viscosity ─────────────────────────────────────────────────────────────

export function buildViscosityScene(): SceneSpec {
  const ys = [0, 0.75, 1.5, 2.25, 3.0]
  const speeds = (max: number) => ys.map((y, i) => ({ y, v: (i / (ys.length - 1)) * max }))
  const thick = speeds(1.35)
  const thin = speeds(2.7)
  return {
    id: 'phys-viscosity',
    title: 'Viscosity: how strongly a fluid resists being sheared',
    sceneType: 'comparison',
    cameraDistance: 14,
    teachingGoal:
      'Show a fluid shearing in layers whose speed rises with height, and that a thinner fluid ' +
      'develops a steeper velocity gradient under the same pull.',
    ariaLabel:
      'Two panels, each with a fixed bottom plate and a moving top plate with fluid between them. ' +
      'Velocity arrows grow from nothing at the bottom plate to a maximum at the top. The arrows ' +
      'in the low-viscosity panel on the right grow much longer over the same height.',
    steps: [
      {
        narration:
          'Fluid between two plates. The bottom plate is fixed, the top one is dragged sideways, ' +
          'and the fluid does not move as a block — it shears into layers.',
        objects: [
          heading('THICK', [-2.6, 4.25, 0], ROLE.aid),
          line([-4.9, 0, 0], [-0.3, 0, 0], ROLE.reference, 0.07),
          line([-4.9, 3.0, 0], [-0.3, 3.0, 0], ROLE.reference, 0.07),
          ...hatch(-4.8, -0.4, 0, 8, 0.28),
          ...thick.slice(1, -1).map((l) => line([-4.9, l.y, 0], [-0.3, l.y, 0], ROLE.reference, 0.02)),
          label('plate dragged →', [-2.6, 3.45, 0], ROLE.reference, 'detail'),
          label('fixed plate', [-2.6, -0.75, 0], ROLE.reference, 'detail'),
        ],
      },
      {
        narration:
          'Each layer slides a little faster than the one below it — nothing at the fixed plate, ' +
          'fastest at the moving one. That steady rise in speed with height is the velocity gradient.',
        objects: [
          ...thick.map((l) =>
            l.v > 0.01 ? arrow([-4.9, l.y, 0], [-4.9 + l.v, l.y, 0], ROLE.aid) : dot([-4.9, l.y, 0], ROLE.aid, 0.11),
          ),
          label('velocity gradient', [-2.15, 1.5, 0], ROLE.aid, 'primary'),
        ],
      },
      {
        narration:
          'Viscosity is how hard the fluid fights that sliding. The more viscous it is, the more ' +
          'force you need to keep the top plate moving at the same speed.',
        objects: [
          label('F = η A (dv/dy)', [-2.6, -1.45, 0], ROLE.ink, 'detail'),
        ],
      },
      {
        narration:
          'The same experiment with a thinner fluid. It resists less, so under the same pull the ' +
          'layers slip much further ahead of each other — a steeper gradient. That difference is ' +
          'the difference in viscosity.',
        objects: [
          heading('THIN', [2.6, 4.25, 0], ROLE.result),
          line([0.3, 0, 0], [4.9, 0, 0], ROLE.reference, 0.07),
          line([0.3, 3.0, 0], [4.9, 3.0, 0], ROLE.reference, 0.07),
          ...hatch(0.4, 4.8, 0, 8, 0.28),
          ...thin.slice(1, -1).map((l) => line([0.3, l.y, 0], [4.9, l.y, 0], ROLE.reference, 0.02)),
          label('same pull →', [2.6, 3.45, 0], ROLE.reference, 'detail'),
          ...thin.map((l) =>
            l.v > 0.01 ? arrow([0.3, l.y, 0], [0.3 + l.v, l.y, 0], ROLE.result) : dot([0.3, l.y, 0], ROLE.result, 0.11),
          ),
          label('lower η · steeper gradient', [2.6, -2.2, 0], ROLE.result, 'primary'),
        ],
      },
    ],
  }
}

// ── 7. Surface Tension and Capillarity ───────────────────────────────────────

/**
 * Two linked phenomena, so two panels: the molecular cause on the left, the
 * visible consequence on the right. The key asymmetry — a surface molecule has
 * no neighbours above it — is carried by a MISSING arrow, which reads without
 * relying on colour at all.
 */
export function buildSurfaceTensionScene(): SceneSpec {
  return {
    id: 'phys-surface-tension',
    title: 'Surface tension, and the capillary rise it causes',
    sceneType: 'comparison',
    cameraDistance: 14,
    teachingGoal:
      'Show why a liquid surface behaves like a stretched skin — a surface molecule is pulled ' +
      'inwards because nothing pulls it up — and then show that same tension lifting liquid up a ' +
      'narrow tube.',
    ariaLabel:
      'Two panels. On the left, a molecule deep in the liquid with four balanced force arrows, and ' +
      'a molecule at the surface with arrows to the sides and downwards but none upwards. On the ' +
      'right, a narrow tube standing in a liquid, with the level inside the tube higher than the ' +
      'level outside and a curved meniscus at the top of the column.',
    steps: [
      {
        narration:
          'Deep inside the liquid a molecule is surrounded on every side. Its neighbours pull it ' +
          'equally in all directions, so the pulls cancel.',
        objects: [
          heading('AT THE SURFACE', [-3.0, 4.35, 0], ROLE.aid),
          line([-4.9, 1.7, 0], [-0.5, 1.7, 0], ROLE.output, 0.05),
          label('liquid surface', [-4.2, 2.4, 0], ROLE.output, 'detail'),
          dot([-2.7, -0.5, 0], ROLE.output, 0.22),
          arrow([-2.7, -0.5, 0], [-1.85, -0.5, 0], ROLE.reference),
          arrow([-2.7, -0.5, 0], [-3.55, -0.5, 0], ROLE.reference),
          arrow([-2.7, -0.5, 0], [-2.7, 0.35, 0], ROLE.reference),
          arrow([-2.7, -0.5, 0], [-2.7, -1.35, 0], ROLE.reference),
          label('balanced', [-2.7, -1.8, 0], ROLE.reference, 'detail'),
        ],
      },
      {
        narration:
          'A molecule sitting at the surface has no neighbours above it. The sideways pulls still ' +
          'cancel, but the upward pull is missing, so it feels a net tug down into the liquid.',
        objects: [
          dot([-1.35, 1.7, 0], ROLE.input, 0.22),
          arrow([-1.35, 1.7, 0], [-0.65, 1.7, 0], ROLE.reference),
          arrow([-1.35, 1.7, 0], [-2.05, 1.7, 0], ROLE.reference),
          arrow([-1.35, 1.7, 0], [-1.35, 0.85, 0], ROLE.input),
          label('nothing pulls it up', [-2.4, 2.9, 0], ROLE.input, 'primary'),
        ],
      },
      {
        narration:
          'Every surface molecule feels that same inward tug, so the surface pulls itself as tight ' +
          'as it can and behaves like a stretched skin under tension.',
        objects: [
          arrow([-3.1, 1.7, 0], [-4.6, 1.7, 0], ROLE.result),
          arrow([-2.3, 1.7, 0], [-0.8, 1.7, 0], ROLE.result),
          label('tension along the surface', [-3.0, 0.8, 0], ROLE.result, 'primary'),
        ],
      },
      {
        narration:
          'Stand a narrow tube in the liquid and that same tension, pulling where the liquid meets ' +
          'the glass, drags the column upwards until its weight balances the pull.',
        objects: [
          heading('CAPILLARY RISE', [2.9, 4.35, 0], ROLE.aid),
          line([0.6, 0.35, 0], [4.9, 0.35, 0], ROLE.output, 0.05),
          label('level outside', [4.35, -0.3, 0], ROLE.output, 'detail'),
          line([1.85, 3.1, 0], [1.85, -1.3, 0], ROLE.reference, 0.05),
          line([3.45, 3.1, 0], [3.45, -1.3, 0], ROLE.reference, 0.05),
          label('narrow tube', [4.5, 3.4, 0], ROLE.reference, 'detail'),
          line([1.85, 2.05, 0], [2.35, 1.82, 0], ROLE.output, 0.04),
          line([2.35, 1.82, 0], [2.95, 1.82, 0], ROLE.output, 0.04),
          line([2.95, 1.82, 0], [3.45, 2.05, 0], ROLE.output, 0.04),
          label('meniscus', [2.65, 2.5, 0], ROLE.output, 'detail'),
          arrow([2.65, 0.55, 0], [2.65, 1.6, 0], ROLE.result),
          label('liquid climbs · rise h', [2.65, -1.1, 0], ROLE.result, 'primary'),
          label('h = 2T cos θ / ρgr', [2.65, -2.55, 0], ROLE.ink, 'detail'),
        ],
      },
    ],
  }
}
