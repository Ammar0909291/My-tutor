/**
 * Physics visual authoring pilot (M4) — seven concept-specific scenes.
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
 * plain SceneSpec built from the primitives SceneSpecRenderer already paints —
 * point/node/particle, vector/arrow, bond, label, path/trajectory — and each
 * goes through the same registry → resolver → admission → contract path as
 * every other asset. No LLM, no network, no generated code, no SVG, no canvas.
 *
 * AUTHORING RULES followed by every scene here:
 *   • Only objects the renderer actually draws. `bar` and `surface` return null
 *     from the renderer's switch, so they are never used.
 *   • Every object that carries meaning carries its own label text, because the
 *     tutor contract's semantics are DERIVED from these objects. A part with no
 *     text is a part the tutor is not told about — which is correct, and the
 *     reason nothing here is decorative.
 *   • Steps are CUMULATIVE: objects from step i stay on screen at step i+1.
 *     Scenes that contrast two cases put them side by side rather than
 *     overdrawing the same space.
 *   • Coordinates stay inside roughly ±5 so the default camera frames the whole
 *     figure without clipping, and labels are offset off the geometry they name.
 */

import type { SceneObject, SceneSpec, Vec3 } from '@/lib/teaching/sceneSpec'

// ── shared helpers ───────────────────────────────────────────────────────────

// The scene canvas is DARK. These match the palette the existing generators
// already use (slate-400 construction lines, vivid primaries for meaning), so
// every label is legible against it. A dark ink colour here renders as
// invisible text, which is how a figure ends up describing parts nobody can see.
const INK = '#e2e8f0'      // slate-200 — default label text
const HOT = '#ef4444'      // red — the hot body, the light ray, the driving quantity
const COLD = '#3b82f6'     // blue — the cool body, water, the second wave
const ACCENT = '#a78bfa'   // violet — construction aids (normal, gradient)
const MUTED = '#94a3b8'    // slate-400 — boundaries, walls, plates
const GOOD = '#22c55e'     // green — the result / the contrast case

/** A sampled sine curve — the only curve any of these scenes needs. */
function sinePath(opts: {
  x0: number; x1: number; amplitude: number; wavelength: number
  yOffset?: number; phase?: number; samples?: number
}): Vec3[] {
  const { x0, x1, amplitude, wavelength, yOffset = 0, phase = 0, samples = 48 } = opts
  const pts: Vec3[] = []
  for (let i = 0; i <= samples; i++) {
    const x = x0 + ((x1 - x0) * i) / samples
    const y = yOffset + amplitude * Math.sin((2 * Math.PI * (x - x0)) / wavelength + phase)
    pts.push([round(x), round(y), 0])
  }
  return pts
}

function round(n: number): number {
  return Math.round(n * 1000) / 1000
}

function label(text: string, position: Vec3, color = INK): SceneObject {
  return { type: 'label', position, text, color }
}

function arrow(from: Vec3, to: Vec3, text: string | undefined, color = INK): SceneObject {
  return { type: 'arrow', from, to, ...(text ? { text } : {}), color, thickness: 0.05 }
}

/**
 * A straight construction line (boundary, wall, tube side, plate).
 *
 * Takes NO text: SceneSpecRenderer draws `bond` as a bare cylinder and never
 * paints a label on it, so text here would be described to the tutor by the
 * contract and never shown to the learner — the precise mismatch this whole
 * programme exists to prevent. Name a line with a separate label() beside it.
 */
function line(from: Vec3, to: Vec3, color = MUTED): SceneObject {
  return { type: 'bond', from, to, color, thickness: 0.04 }
}

/**
 * A sampled curve. SceneSpecRenderer draws `path` as a MARKER PER POINT, not as
 * a stroked polyline, so this is only correct for densely sampled curves — a
 * two-point "path" renders as two dots and reads as nothing at all. Straight
 * segments must use line() (a bond), which is drawn as a solid cylinder.
 */
function curve(points: Vec3[], text: string | undefined, color: string): SceneObject {
  if (points.length < 8) throw new Error('curve() needs a densely sampled path; use line() for straight segments')
  return { type: 'path', points, ...(text ? { text } : {}), color }
}

function dot(position: Vec3, text: string | undefined, color: string, radius = 0.16): SceneObject {
  return { type: 'node', position, ...(text ? { text } : {}), color, radius }
}

// ── 1. Total Internal Reflection ─────────────────────────────────────────────

/**
 * The regression case. Three incidence angles side by side against ONE boundary,
 * so the learner sees the progression that defines the critical angle rather
 * than a single frozen ray. Deliberately NOT the concave-mirror figure that used
 * to be served here: this scene has a boundary, a normal and two media, which
 * that one never had.
 */
export function buildTotalInternalReflectionScene(): SceneSpec {
  return {
    id: 'phys-tir',
    title: 'Total Internal Reflection at a glass–air boundary',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal:
      'Show how the refracted ray bends further from the normal as the angle of incidence grows, ' +
      'grazes the surface at the critical angle, and disappears beyond it so all the light stays ' +
      'inside the denser medium.',
    ariaLabel:
      'A horizontal glass–air boundary with a vertical normal. Three rays travel up through the ' +
      'glass at increasing angles: the first refracts into the air, the second grazes along the ' +
      'boundary at the critical angle, and the third is reflected entirely back into the glass.',
    steps: [
      {
        narration:
          'Light travels inside the glass and meets the boundary with the air above. The dashed ' +
          'vertical line is the normal — every angle is measured from it, never from the surface.',
        objects: [
          line([-4.6, 0, 0], [4.6, 0, 0]),
          line([0, -2.6, 0], [0, 2.6, 0], ACCENT),
          label('boundary: glass below, air above', [-2.6, 0.45, 0], MUTED),
          label('normal', [0.55, 2.5, 0], ACCENT),
          label('air (rarer, n₂)', [-4.0, 1.6, 0], COLD),
          label('glass (denser, n₁)', [-4.0, -1.4, 0], HOT),
        ],
      },
      {
        narration:
          'At a small angle of incidence most of the light crosses into the air, bending AWAY ' +
          'from the normal because it speeds up in the rarer medium.',
        objects: [
          arrow([-3.6, -2.4, 0], [-1.2, 0, 0], undefined, HOT),
          arrow([-1.2, 0, 0], [0.5, 2.4, 0], undefined, COLD),
          dot([-1.2, 0, 0], undefined, HOT, 0.1),
          label('① small θ₁ — incident ray', [-3.9, -3.1, 0], HOT),
          label('refracted ray bends away from the normal', [-0.6, 3.0, 0], COLD),
        ],
      },
      {
        narration:
          'Increase the angle and the refracted ray bends further over. At one particular angle — ' +
          'the critical angle — it runs flat along the boundary itself.',
        objects: [
          arrow([-2.4, -2.4, 0], [0, 0, 0], undefined, HOT),
          arrow([0, 0, 0], [3.2, 0.12, 0], undefined, GOOD),
          label('② θ₁ = θc — incident ray at the critical angle', [-1.2, -3.7, 0], HOT),
          label('refracted ray grazes the surface (θ₂ = 90°)', [3.0, 0.75, 0], GOOD),
          label('critical angle θc:  sin θc = n₂ / n₁', [2.6, -1.4, 0], GOOD),
        ],
      },
      {
        narration:
          'Past the critical angle there is no refracted ray left to bend — none of the light ' +
          'escapes. All of it is reflected back into the glass, with the angle of reflection ' +
          'equal to the angle of incidence. That is total internal reflection.',
        objects: [
          arrow([-0.9, -2.6, 0], [1.4, 0, 0], undefined, HOT),
          arrow([1.4, 0, 0], [3.7, -2.6, 0], undefined, HOT),
          dot([1.4, 0, 0], undefined, HOT, 0.1),
          label('③ θ₁ > θc — incident ray', [-1.6, -4.3, 0], HOT),
          label('totally reflected ray — stays in the glass', [3.3, -3.2, 0], HOT),
          label('no refracted ray above the boundary', [1.4, 1.9, 0], MUTED),
        ],
      },
    ],
  }
}

// ── 2. Transverse Waves ──────────────────────────────────────────────────────

export function buildTransverseWaveScene(): SceneSpec {
  const wave = sinePath({ x0: -4.4, x1: 4.4, amplitude: 1.3, wavelength: 4.4 })
  return {
    id: 'phys-transverse-wave',
    title: 'Transverse wave: displacement across the direction of travel',
    sceneType: 'diagram',
    cameraDistance: 12,
    teachingGoal:
      'Show that in a transverse wave the medium moves perpendicular to the direction the wave ' +
      'travels, and name the crest, the trough and the wavelength on the same figure.',
    ariaLabel:
      'A sine-shaped wave on a horizontal rest line, with a crest and a trough marked, an arrow ' +
      'showing the wave travelling to the right, and a separate vertical arrow showing a particle ' +
      'of the medium moving up and down.',
    steps: [
      {
        narration:
          'Here is the shape of the wave at one instant. The straight line is where the medium ' +
          'would sit if the wave were not passing.',
        objects: [
          line([-4.6, 0, 0], [4.6, 0, 0]),
          label('rest position of the medium', [-2.9, -0.5, 0], MUTED),
          curve(wave, 'the wave', COLD),
        ],
      },
      {
        narration:
          'The high points are crests and the low points are troughs. One full wavelength is the ' +
          'distance from one crest to the next.',
        objects: [
          dot([-3.3, 1.3, 0], 'crest', GOOD, 0.18),
          dot([-1.1, -1.3, 0], 'trough', ACCENT, 0.18),
          dot([1.1, 1.3, 0], 'the next crest', GOOD, 0.18),
          line([-3.3, 2.0, 0], [1.1, 2.0, 0], INK),
          label('one wavelength λ', [-1.1, 2.4, 0], INK),
        ],
      },
      {
        narration:
          'The wave itself travels sideways, to the right.',
        objects: [
          arrow([-4.2, -2.3, 0], [-1.2, -2.3, 0], 'direction the wave travels', INK),
        ],
      },
      {
        narration:
          'But the medium does not travel with it. Each particle only moves up and down — across ' +
          'the direction of travel. That perpendicular motion is what makes the wave transverse.',
        objects: [
          arrow([3.3, -1.3, 0], [3.3, 1.3, 0], 'a particle moves up and down only', HOT),
          label('particle motion ⟂ wave travel', [3.3, 2.2, 0], HOT),
        ],
      },
    ],
  }
}

// ── 3. Wave Interference ─────────────────────────────────────────────────────

/**
 * Two cases side by side rather than stacked: steps are cumulative, so drawing
 * the out-of-phase pair in the same space as the in-phase pair would leave four
 * overlapping curves and teach nothing.
 */
export function buildWaveInterferenceScene(): SceneSpec {
  const LEFT = { x0: -4.6, x1: -0.4 }
  const RIGHT = { x0: 0.4, x1: 4.6 }
  const wl = 2.1
  const a = 0.62
  return {
    id: 'phys-wave-interference',
    title: 'Interference: waves that add, and waves that cancel',
    sceneType: 'comparison',
    cameraDistance: 13,
    teachingGoal:
      'Show that two overlapping waves add displacement by displacement: in phase they build a ' +
      'bigger wave, half a wavelength apart they cancel to nothing.',
    ariaLabel:
      'Two panels. On the left, two identical waves in phase and their larger combined wave. On ' +
      'the right, two waves half a wavelength apart and their combined result, a flat line.',
    steps: [
      {
        narration:
          'On the left, two waves arrive exactly in step — every crest lines up with a crest.',
        objects: [
          label('CONSTRUCTIVE', [-2.5, 3.1, 0], GOOD),
          curve(sinePath({ ...LEFT, amplitude: a, wavelength: wl, yOffset: 2.0 }), 'wave 1', COLD),
          curve(sinePath({ ...LEFT, amplitude: a, wavelength: wl, yOffset: 0.9 }), 'wave 2 (in phase)', ACCENT),
        ],
      },
      {
        narration:
          'Add them displacement by displacement and the crests reinforce: the combined wave is ' +
          'twice as tall. Crest plus crest gives a bigger crest.',
        objects: [
          curve(sinePath({ ...LEFT, amplitude: 2 * a, wavelength: wl, yOffset: -1.4 }), 'combined wave: amplitude doubles', GOOD),
          label('crest + crest → bigger crest', [-2.5, -3.0, 0], GOOD),
        ],
      },
      {
        narration:
          'On the right the second wave is shifted by half a wavelength, so every crest of one ' +
          'meets a trough of the other.',
        objects: [
          label('DESTRUCTIVE', [2.5, 3.1, 0], HOT),
          curve(sinePath({ ...RIGHT, amplitude: a, wavelength: wl, yOffset: 2.0 }), 'wave 1', COLD),
          curve(sinePath({ ...RIGHT, amplitude: a, wavelength: wl, yOffset: 0.9, phase: Math.PI }), 'wave 2 (half a wavelength behind)', ACCENT),
        ],
      },
      {
        narration:
          'Now the displacements are equal and opposite everywhere, so they add to zero. The ' +
          'combined wave is a flat line — the waves have cancelled.',
        objects: [
          line([RIGHT.x0, -1.4, 0], [RIGHT.x1, -1.4, 0], HOT),
          label('combined wave: flat — they cancel', [2.5, -1.9, 0], HOT),
          label('crest + trough → nothing', [2.5, -3.0, 0], HOT),
        ],
      },
    ],
  }
}

// ── 4. Calorimetry ───────────────────────────────────────────────────────────

export function buildCalorimetryScene(): SceneSpec {
  return {
    id: 'phys-calorimetry',
    title: 'Calorimetry: heat lost by the hot body = heat gained by the water',
    sceneType: 'process',
    cameraDistance: 13,
    teachingGoal:
      'Show heat flowing from a hot body into surrounding water inside an insulated calorimeter ' +
      'until both reach one common final temperature, and tie that to the energy balance.',
    ariaLabel:
      'An insulated calorimeter containing water, with a thermometer. A hot metal block sits in ' +
      'the water, arrows show heat flowing from the block into the water, and both end at the ' +
      'same final temperature.',
    steps: [
      {
        narration:
          'A calorimeter is an insulated container, so essentially no heat leaks out to the room. ' +
          'Whatever one thing inside loses, another thing inside gains.',
        objects: [
          line([-3.0, 2.2, 0], [-3.0, -2.2, 0]),
          line([-3.0, -2.2, 0], [3.0, -2.2, 0]),
          line([3.0, -2.2, 0], [3.0, 2.2, 0]),
          line([-3.0, 1.1, 0], [3.0, 1.1, 0], COLD),
          label('insulated calorimeter', [-3.7, 2.5, 0], MUTED),
          label('water surface', [3.7, 1.1, 0], COLD),
          label('water: mass m_w, specific heat c_w, starts at 25 °C', [0, -3.0, 0], COLD),
        ],
      },
      {
        narration:
          'A thermometer reads the temperature of the water — that is the number you actually ' +
          'measure in the experiment.',
        objects: [
          line([2.1, 3.0, 0], [2.1, 0.2, 0], INK),
          label('thermometer', [2.1, 3.35, 0], INK),
          dot([2.1, 0.1, 0], undefined, HOT, 0.13),
        ],
      },
      {
        narration:
          'Drop in a hot metal block at 100 °C. It is hotter than the water around it, so energy ' +
          'starts moving.',
        objects: [
          dot([-1.2, -0.4, 0], 'hot metal block, 100 °C', HOT, 0.42),
        ],
      },
      {
        narration:
          'Heat always flows from hotter to colder — out of the block and into the water. Never ' +
          'the other way round on its own.',
        objects: [
          arrow([-0.75, -0.05, 0], [0.5, 0.55, 0], 'heat flows hot → cold', HOT),
          arrow([-0.75, -0.75, 0], [0.5, -1.35, 0], 'Q', HOT),
          arrow([-1.65, -0.05, 0], [-2.5, 0.55, 0], 'Q', HOT),
        ],
      },
      {
        narration:
          'The flow stops when both reach the SAME final temperature. Because the container is ' +
          'insulated, the heat the block lost equals the heat the water gained — and that single ' +
          'equation is what lets you solve for the unknown.',
        objects: [
          label('both settle at one final temperature T_f', [0, 2.7, 0], GOOD),
          label('heat lost by metal = heat gained by water', [0, -3.6, 0], GOOD),
          label('m c ΔT (metal) = m c ΔT (water)', [0, -4.2, 0], INK),
        ],
      },
    ],
  }
}

// ── 5. First Law of Thermodynamics ───────────────────────────────────────────

export function buildFirstLawScene(): SceneSpec {
  return {
    id: 'phys-first-law',
    title: 'First Law of Thermodynamics: ΔU = Q − W',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal:
      'Show the energy bookkeeping of a closed system: heat added in, work done out, and the ' +
      'internal energy left over as the difference.',
    ariaLabel:
      'A box representing a gas system. An arrow labelled Q points into it from the left, an ' +
      'arrow labelled W points out of it to the right, and the change in internal energy inside ' +
      'the box is the difference between them.',
    steps: [
      {
        narration:
          'Draw a boundary around the thing you are studying — here, a gas. Everything inside is ' +
          'the system; everything outside is the surroundings.',
        objects: [
          line([-1.7, 1.5, 0], [1.7, 1.5, 0]),
          line([1.7, 1.5, 0], [1.7, -1.5, 0]),
          line([1.7, -1.5, 0], [-1.7, -1.5, 0]),
          line([-1.7, -1.5, 0], [-1.7, 1.5, 0]),
          label('the system (a gas)', [0, 1.95, 0], MUTED),
          label('surroundings', [0, 3.2, 0], MUTED),
        ],
      },
      {
        narration:
          'Add heat to it. Energy crosses the boundary inwards — that is Q, and it counts as ' +
          'positive because the system gains it.',
        objects: [
          arrow([-4.4, 0, 0], [-1.9, 0, 0], 'Q = heat added IN (+)', HOT),
        ],
      },
      {
        narration:
          'The gas expands and pushes on its surroundings. Energy crosses the boundary outwards ' +
          'as work — that is W, and the system spends it.',
        objects: [
          arrow([1.9, 0, 0], [4.4, 0, 0], 'W = work done BY the system (−)', COLD),
        ],
      },
      {
        narration:
          'Whatever is left over stays inside as internal energy. Energy is not created or ' +
          'destroyed here — it is only counted: what came in, minus what went out.',
        objects: [
          dot([0, 0, 0], 'ΔU = change in internal energy', ACCENT, 0.3),
          label('ΔU = Q − W', [0, -2.6, 0], GOOD),
          label('energy in − energy out = energy kept', [0, -3.3, 0], INK),
        ],
      },
    ],
  }
}

// ── 6. Viscosity ─────────────────────────────────────────────────────────────

export function buildViscosityScene(): SceneSpec {
  const layerY = [0, 0.75, 1.5, 2.25, 3.0]
  const thick = layerY.map((y, i) => ({ y, v: (i / (layerY.length - 1)) * 1.5 }))
  const thin = layerY.map((y, i) => ({ y, v: (i / (layerY.length - 1)) * 2.6 }))
  return {
    id: 'phys-viscosity',
    title: 'Viscosity: fluid layers sliding over each other',
    sceneType: 'comparison',
    cameraDistance: 14,
    teachingGoal:
      'Show that a fluid shears in layers whose speed increases with height, that viscosity is ' +
      'the resistance to that sliding, and that a thinner fluid develops a steeper velocity ' +
      'gradient under the same pull.',
    ariaLabel:
      'Two panels, each with a stationary bottom plate and a moving top plate separated by fluid ' +
      'layers. Velocity arrows grow from zero at the bottom to a maximum at the top; the arrows ' +
      'in the low-viscosity panel grow more steeply.',
    steps: [
      {
        narration:
          'A fluid between two plates. The bottom plate is fixed; the top plate is dragged ' +
          'sideways. The fluid does not move as one block — it shears into layers.',
        objects: [
          label('THICK FLUID (high viscosity)', [-2.6, 4.0, 0], ACCENT),
          line([-4.8, 0, 0], [-0.4, 0, 0]),
          line([-4.8, 3.0, 0], [-0.4, 3.0, 0]),
          label('plate dragged sideways →', [-2.6, 3.35, 0], MUTED),
          label('stationary plate — fluid here does not move', [-2.6, -0.35, 0], MUTED),
          ...thick.slice(1, -1).map((l) => line([-4.8, l.y, 0], [-0.4, l.y, 0], MUTED)),
          label('fluid layers', [-2.6, -0.75, 0], MUTED),
        ],
      },
      {
        narration:
          'Each layer moves a little faster than the one below it: zero at the fixed plate, ' +
          'fastest at the moving one. That steady change of speed with height is the velocity ' +
          'gradient.',
        objects: [
          ...thick.map((l, i) =>
            l.v > 0.01
              ? arrow([-4.8, l.y, 0], [-4.8 + l.v, l.y, 0], i === thick.length - 1 ? 'fastest layer' : undefined, ACCENT)
              : dot([-4.8, l.y, 0], 'speed zero at the fixed plate', ACCENT, 0.12),
          ),
          label('velocity gradient dv/dy', [-2.4, 1.5, 0], ACCENT),
        ],
      },
      {
        narration:
          'Viscosity is how strongly the fluid resists that sliding. The more viscous it is, the ' +
          'more force you need to keep the top plate moving at the same speed.',
        objects: [
          label('viscous force F = η A (dv/dy)', [-2.6, -1.5, 0], INK),
          label('η = viscosity — the resistance to shear', [-2.6, -2.2, 0], INK),
        ],
      },
      {
        narration:
          'Now the same experiment with a thinner fluid. It resists less, so under the same pull ' +
          'the layers slip further ahead of each other — a steeper velocity gradient. That ' +
          'difference IS the difference in viscosity.',
        objects: [
          label('THIN FLUID (low viscosity)', [2.6, 4.0, 0], GOOD),
          line([0.4, 0, 0], [4.8, 0, 0]),
          line([0.4, 3.0, 0], [4.8, 3.0, 0]),
          label('same plate, same pull →', [2.6, 3.35, 0], MUTED),
          label('stationary plate', [2.6, -0.35, 0], MUTED),
          ...thin.slice(1, -1).map((l) => line([0.4, l.y, 0], [4.8, l.y, 0], MUTED)),
          ...thin.map((l) =>
            l.v > 0.01 ? arrow([0.4, l.y, 0], [0.4 + l.v, l.y, 0], undefined, GOOD) : dot([0.4, l.y, 0], undefined, GOOD, 0.12),
          ),
          label('lower η → steeper gradient, fluid flows more easily', [2.6, -1.5, 0], GOOD),
        ],
      },
    ],
  }
}

// ── 7. Surface Tension and Capillarity ───────────────────────────────────────

export function buildSurfaceTensionScene(): SceneSpec {
  return {
    id: 'phys-surface-tension',
    title: 'Surface tension, and the capillary rise it causes',
    sceneType: 'comparison',
    cameraDistance: 14,
    teachingGoal:
      'Show why a liquid surface behaves like a stretched skin — surface molecules are pulled ' +
      'inwards because they have no neighbours above — and then show that same tension pulling ' +
      'liquid up a narrow tube.',
    ariaLabel:
      'Two panels. On the left, a molecule deep in a liquid pulled equally in all directions and ' +
      'a molecule at the surface pulled only inwards. On the right, a narrow tube standing in a ' +
      'liquid, with the level inside the tube risen above the outside level and a curved meniscus.',
    steps: [
      {
        narration:
          'Deep inside a liquid, a molecule is surrounded on every side. Its neighbours pull it ' +
          'equally in all directions, so the pulls cancel out.',
        objects: [
          label('WHY THE SURFACE IS SPECIAL', [-2.6, 3.6, 0], ACCENT),
          label('liquid surface', [-4.3, 2.05, 0], COLD),
          line([-4.8, 1.6, 0], [-0.4, 1.6, 0], COLD),
          dot([-2.6, -0.4, 0], 'molecule deep inside', COLD, 0.2),
          arrow([-2.6, -0.4, 0], [-1.8, -0.4, 0], undefined, MUTED),
          arrow([-2.6, -0.4, 0], [-3.4, -0.4, 0], undefined, MUTED),
          arrow([-2.6, -0.4, 0], [-2.6, 0.4, 0], undefined, MUTED),
          arrow([-2.6, -0.4, 0], [-2.6, -1.2, 0], 'pulled equally in all directions — no net force', MUTED),
        ],
      },
      {
        narration:
          'A molecule sitting AT the surface has no neighbours above it. The sideways pulls still ' +
          'cancel, but the upward pull is missing, so it feels a net tug downwards into the ' +
          'liquid.',
        objects: [
          dot([-1.4, 1.6, 0], 'molecule at the surface', HOT, 0.2),
          arrow([-1.4, 1.6, 0], [-1.4, 0.7, 0], 'net inward pull — nothing pulls it up', HOT),
        ],
      },
      {
        narration:
          'Every surface molecule feels that same inward tug, so the surface pulls itself as ' +
          'tight as it can. It behaves like a stretched skin under tension along its own plane.',
        objects: [
          arrow([-2.9, 1.6, 0], [-4.4, 1.6, 0], undefined, GOOD),
          arrow([-2.3, 1.6, 0], [-0.8, 1.6, 0], undefined, GOOD),
          label('tension along the surface pulls it tight', [-2.6, 2.55, 0], GOOD),
          label('surface acts like a stretched skin', [-2.6, 3.05, 0], GOOD),
        ],
      },
      {
        narration:
          'Now stand a narrow tube in the liquid. The same tension, pulling where the liquid ' +
          'meets the glass, drags the column upwards until its weight balances the pull.',
        objects: [
          label('CAPILLARY RISE', [2.6, 3.6, 0], ACCENT),
          line([0.4, 0.4, 0], [4.8, 0.4, 0], COLD),
          line([1.7, 3.0, 0], [1.7, -1.2, 0]),
          line([3.3, 3.0, 0], [3.3, -1.2, 0]),
          label('narrow tube', [2.5, 3.3, 0], MUTED),
          label('liquid level outside', [4.5, 0.05, 0], COLD),
          line([1.7, 2.0, 0], [2.2, 1.78, 0], COLD),
          line([2.2, 1.78, 0], [2.8, 1.78, 0], COLD),
          line([2.8, 1.78, 0], [3.3, 2.0, 0], COLD),
          label('curved meniscus', [2.5, 2.35, 0], COLD),
          arrow([2.5, 0.5, 0], [2.5, 1.6, 0], undefined, GOOD),
          label('liquid climbs the tube — rise h', [4.6, 1.1, 0], GOOD),
          label('h = 2T cos θ / (ρ g r) — narrower tube, higher rise', [2.6, -2.1, 0], INK),
        ],
      },
    ],
  }
}
