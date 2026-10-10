/**
 * Visual semantics — what is ACTUALLY on the learner's screen.
 *
 * The Visual Contract used to tell the model *that* a figure was attached and
 * then hand it invented example phrasings ("look at the arrow", "notice where
 * the two lines meet"). The model parroted those examples, so the tutor talked
 * about arrows and intersecting lines that frequently did not exist, or fell
 * back on the safe-but-useless "look at the figure displayed on your screen".
 *
 * The payload is already sitting in the decision. This module reads it and
 * returns ONLY facts that are literally present in the data — labels the
 * renderer will draw, the equation it will plot, the step narrations that were
 * authored. Nothing here guesses at colour, position, or content: if the
 * payload does not state it, it is not returned, and the contract falls back to
 * a truthful generic description. Positions are not guessed either: each
 * label's coarse place on the figure is read off its own coordinates, and each
 * colour is named from the object's own drawn colour.
 */

import type { VisualPayload } from './types'
import type { SceneObject, SceneSpec } from '@/lib/teaching/sceneSpec'
import { sceneStepCount, type Vec3 } from '@/lib/teaching/sceneSpec'
import type { VisualSpec } from '@/lib/visuals/visualSpec'
import { VISUAL_META } from '@/lib/school/visuals/visualTypes'
import { clamp } from './conceptText'
import { familyOfHex } from './figureFidelity'

/** Facts derived from the payload. Every field is either real or absent. */
export interface VisualSemantics {
  /** One-line truthful description of the figure as a whole. */
  caption: string | null
  /**
   * Named things the learner can literally see. Kept for callers that want one
   * flat list; it is `readable` followed by `geometry`.
   */
  elements: string[]
  /**
   * TEXT THE LEARNER CAN READ — every label the renderer will draw, verbatim.
   *
   * Separated from geometry because it is the highest-value grounding there is
   * and it was being crowded out: one flat 8-item budget, filled in object
   * order, spent its slots on unlabelled shapes and dropped the labels that
   * carry the teaching. Total Internal Reflection kept "① θ < θc" and lost
   * "② θ = θc", "③ θ > θc", "grazes the surface" and "all reflected back" —
   * i.e. the model was told about one of the three cases the figure exists to
   * contrast, which is exactly the case-confusion the grounding gates forbid.
   */
  readable: string[]
  /** Shapes with no text of their own, summarised by kind and count. */
  geometry: string[]
  /**
   * Relationships written ON the figure (anything containing "="), lifted out
   * so the contract can ask for them in words instead of read as characters.
   */
  equations: string[]
  /** Authored step narrations, in reveal order. Empty when not stepped. */
  steps: string[]
  /** How many stages the figure really has, when `steps` had to be cut short. */
  stepTotal?: number
  /**
   * Each readable label with its coarse place on the figure ("top left",
   * "right", …), read off its coordinates against the drawn extent.
   *
   * MEASURED LIVE (2026-09-30, phys.particle.standard-model): told only WHICH
   * labels were drawn, the tutor said the leptons were "next to" the quarks,
   * the bosons "below those rows" and the Higgs "at the bottom". In the figure
   * the leptons are below the quarks, the bosons to the right and H at the far
   * right. A learner following the words looked in the wrong places.
   */
  placed?: string[]
  /**
   * Each named colour and the parts drawn in it, read off `obj.color`.
   *
   * MEASURED LIVE (2026-09-30 learner baseline, P1 Newton's second law and P2
   * Faraday's law): asked "what do the blue and green lines mean?", the tutor
   * was never told a colour and guessed — "the blue line is the velocity-time
   * graph" (it is green; blue is the acceleration arrow) and "the red curve is
   * the EMF" (red is the flux). It then built a quick check on the guess.
   */
  colours?: string[]
}

const EMPTY: VisualSemantics = {
  caption: null, elements: [], readable: [], geometry: [], equations: [], steps: [],
}

/** Labels are the teaching; every one of them earns a slot before geometry. */
const MAX_READABLE = 14
const MAX_GEOMETRY = 5
// Twelve, not six: MEASURED on production (2026-09-27), the tutor was told
// "built in 6 stages" for a 7-stage Biology figure and never heard its last
// stage (Genetics) — the count was taken after the cut. Seven Biology figures
// have 7-12 stages (the levels of organisation have 12); all now fit.
const MAX_STEPS = 12

/**
 * Human-readable noun for a scene object that carries no text of its own.
 *
 * NAMES THE SHAPE, NEVER ITS MEANING. `bond` used to read "a bond between two
 * atoms", which is true only in a chemistry scene — the renderer draws the same
 * plain cylinder for a plate, a boundary, an axis or a hatch mark. Production,
 * 2026-08-09, viscosity figure: the tutor opened with "we can see the text
 * label labelled \"THICK\" alongside a bond between two atoms", verbatim from
 * this table, in a figure about fluid shearing that contains no atoms at all.
 * The viscosity scene has 26 of these (plates and layer lines) and total
 * internal reflection has 15 (the boundary and its hatching).
 *
 * A neutral shape noun is true in every scene, so it can never invent physics;
 * what a line MEANS reaches the model through the label beside it and through
 * the authored narration, both of which are real data.
 */
const OBJECT_NOUN: Record<SceneObject['type'], string> = {
  point: 'a marked point',
  particle: 'a small round marker',
  node: 'a marked point',
  vector: 'an arrow',
  arrow: 'an arrow',
  bond: 'a straight line',
  label: 'a text label',
  path: 'a plotted curve',
  trajectory: 'a plotted curve',
  bar: 'a bar',
  surface: 'a surface',
}

/** Plural form for the geometry summary, so counts read naturally. */
const OBJECT_PLURAL: Partial<Record<SceneObject['type'], string>> = {
  point: 'marked points',
  particle: 'small round markers',
  node: 'marked points',
  vector: 'arrows',
  arrow: 'arrows',
  bond: 'straight lines',
  path: 'plotted curves',
  trajectory: 'plotted curves',
}

/** Does this label state a relationship rather than name a thing? */
function isEquation(text: string): boolean {
  return /[=∝]/.test(text)
}

/** Objects the SceneSpecRenderer actually draws — `bar`/`surface` are skipped. */
const DRAWN: ReadonlySet<SceneObject['type']> = new Set<SceneObject['type']>([
  'point', 'particle', 'node', 'vector', 'arrow', 'bond', 'label', 'path', 'trajectory',
])

/**
 * A path through two points, or through points that all lie on one line, is
 * drawn as a straight line. Calling it "a plotted curve" MEASURED on
 * production: the Biology hub's six straight spokes reached the tutor as
 * "6 plotted curves", and it told the learner about "six curved arrows".
 */
function isStraightPath(points: Vec3[] | undefined): boolean {
  if (!points || points.length <= 2) return true
  const [a] = points
  const b = points.find((p) => p[0] !== a[0] || p[1] !== a[1] || p[2] !== a[2])
  if (!b) return true
  const d = [b[0] - a[0], b[1] - a[1], b[2] - a[2]]
  const len = Math.hypot(d[0], d[1], d[2])
  return points.every((p) => {
    const e = [p[0] - a[0], p[1] - a[1], p[2] - a[2]]
    const cross = Math.hypot(d[1] * e[2] - d[2] * e[1], d[2] * e[0] - d[0] * e[2], d[0] * e[1] - d[1] * e[0])
    return cross / len <= 1e-6 * Math.max(1, len)
  })
}

function dedupe(values: string[]): string[] {
  const seen = new Set<string>()
  const out: string[] = []
  for (const v of values) {
    const trimmed = v.trim()
    if (!trimmed || seen.has(trimmed)) continue
    seen.add(trimmed)
    out.push(trimmed)
  }
  return out
}

/** Where a point sits in the drawn extent, in thirds: "top left" … "bottom right". */
export function coarsePlace(x: number, y: number, ext: { x0: number; x1: number; y0: number; y1: number }): string {
  const fx = ext.x1 > ext.x0 ? (x - ext.x0) / (ext.x1 - ext.x0) : 0.5
  const fy = ext.y1 > ext.y0 ? (y - ext.y0) / (ext.y1 - ext.y0) : 0.5
  const h = fx < 1 / 3 ? 'left' : fx > 2 / 3 ? 'right' : ''
  const v = fy > 2 / 3 ? 'top' : fy < 1 / 3 ? 'bottom' : ''
  return v && h ? `${v} ${h}` : v || h || 'centre'
}

/**
 * The everyday name of a drawn colour, or null when it has no stable name.
 *
 * Near-white and near-black are null on purpose: neutral ink is flipped by the
 * renderer's theme (white on the dark canvas, near-black on the light one), so
 * any name for it would be wrong in one of the two themes. Every chromatic
 * colour keeps its hue in both themes, so its name is true in both.
 */
export function colourName(css: string | undefined): string | null {
  // The hue family comes from figureFidelity's own reader, so a colour named
  // here is always one the post-generation fidelity check accepts.
  const family = familyOfHex(css)
  if (!family || family === 'white' || family === 'black') return null
  const h6 = css!.trim().slice(1)
  const hex = h6.length === 3 ? h6.split('').map((c) => c + c).join('') : h6
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const light = (max + min) / 2
  if (light > 0.85 || light < 0.15) return null
  const sat = max === min ? 0 : (max - min) / (1 - Math.abs(2 * light - 1))
  // Muted (slate, the reference role) reads as grey to a learner.
  if (sat < 0.35) return 'grey'
  return family
}

/**
 * The name a generator gave an unlabelled shape through its id, in words:
 * `velocity-time-graph` -> "velocity time graph", `currentVelocity` ->
 * "current velocity". MEASURED live after colours shipped (2026-10-01, Newton):
 * the tutor said "the green marked point marks the block" — the point is the
 * current velocity on the graph (id `current-velocity`); the block is ink. An
 * id is authored data; a bare letter or numbered id ("A", "v1f") says nothing
 * and is not used.
 */
export function idName(id: string | undefined): string | null {
  if (typeof id !== 'string') return null
  const words = id.replace(/([a-z])([A-Z])/g, '$1 $2').toLowerCase().split(/[-_\s]+/).filter(Boolean)
  if (words.length === 0 || words.some((w) => !/^[a-z]+$/.test(w))) return null
  if (words.join('').length < 4) return null
  return words.join(' ')
}

/** Parts listed per colour, so one busy colour cannot crowd out the rest. */
const MAX_PER_COLOUR = 4

function fromScene(spec: SceneSpec): VisualSemantics {
  // Read the drawn objects once, splitting text from shape. Both halves come
  // from the payload the renderer will paint — nothing here is inferred.
  const texts: string[] = []
  const labelAt: Array<{ text: string; x: number; y: number }> = []
  const ext = { x0: Infinity, x1: -Infinity, y0: Infinity, y1: -Infinity }
  const extend = (p: unknown) => {
    if (!Array.isArray(p) || typeof p[0] !== 'number' || typeof p[1] !== 'number') return
    ext.x0 = Math.min(ext.x0, p[0]); ext.x1 = Math.max(ext.x1, p[0])
    ext.y0 = Math.min(ext.y0, p[1]); ext.y1 = Math.max(ext.y1, p[1])
  }
  const equations: string[] = []
  const shapeCounts = new Map<SceneObject['type'], number>()
  // colour -> labels drawn in it, and unlabelled shape kinds drawn in it
  const colourTexts = new Map<string, string[]>()
  const colourShapes = new Map<string, Map<SceneObject['type'], number>>()
  // colour -> the stages its unlabelled shapes appear in. An unlabelled curve's
  // meaning is its stage's narration ("The magnetic flux … rises"), so naming
  // the stage lets the model tie the colour to it without guessing.
  const colourStages = new Map<string, Set<number>>()
  // colour -> unlabelled shapes the generator NAMED by id ("current velocity")
  const colourNamed = new Map<string, string[]>()

  for (const [stepIndex, step] of (spec.steps ?? []).entries()) {
    for (const obj of step.objects ?? []) {
      // Never describe something the renderer will not draw.
      if (!DRAWN.has(obj.type)) continue
      for (const p of [obj.position, obj.from, obj.to, ...(obj.points ?? [])]) extend(p)
      const text = typeof obj.text === 'string' ? obj.text.trim() : ''
      if (text && Array.isArray(obj.position)) labelAt.push({ text: clamp(text, 60), x: obj.position[0], y: obj.position[1] })
      if (text) {
        // A label's TEXT is what the learner reads, whatever shape carries it.
        // EVERY label goes into `texts`, including the relationships: pulling
        // an equation OUT of the readable list cost total internal reflection
        // its middle case ("② θ = θc" contains "="), leaving the model with
        // cases ① and ③ and a gap where the critical angle should be.
        // `equations` is an ADDITIONAL view of the same labels, never a move.
        texts.push(clamp(text, 60))
        if (isEquation(text)) equations.push(clamp(text, 60))
        const colour = colourName(obj.color)
        if (colour) colourTexts.set(colour, [...(colourTexts.get(colour) ?? []), clamp(text, 60)])
      } else {
        // A straight path is described as what the learner sees: a line.
        const kind = (obj.type === 'path' || obj.type === 'trajectory') && isStraightPath(obj.points) ? 'bond' : obj.type
        shapeCounts.set(kind, (shapeCounts.get(kind) ?? 0) + 1)
        const colour = colourName(obj.color)
        const named = idName(obj.id)
        if (colour && named) {
          colourNamed.set(colour, [...(colourNamed.get(colour) ?? []), `${OBJECT_NOUN[kind]} ("${named}")`])
        } else if (colour) {
          const kinds = colourShapes.get(colour) ?? new Map<SceneObject['type'], number>()
          kinds.set(kind, (kinds.get(kind) ?? 0) + 1)
          colourShapes.set(colour, kinds)
          colourStages.set(colour, (colourStages.get(colour) ?? new Set<number>()).add(stepIndex + 1))
        }
      }
    }
  }

  const readable = dedupe(texts).slice(0, MAX_READABLE)
  // A place only means something against a real extent and at least two labels.
  const placed = labelAt.length >= 2 && Number.isFinite(ext.x0) && (ext.x1 - ext.x0 > 0.5 || ext.y1 - ext.y0 > 0.5)
    ? readable.map((t) => {
        const at = labelAt.find((l) => l.text === t)
        return at ? `"${t}" (${coarsePlace(at.x, at.y, ext)})` : `"${t}"`
      })
    : undefined
  const geometry = [...shapeCounts.entries()]
    // Densest shapes first: what dominates the picture is what a learner sees.
    .sort((a, b) => b[1] - a[1])
    .slice(0, MAX_GEOMETRY)
    .map(([type, n]) => (n === 1 ? OBJECT_NOUN[type] : `${n} ${OBJECT_PLURAL[type] ?? OBJECT_NOUN[type]}`))

  const colours = [...new Set([...colourTexts.keys(), ...colourNamed.keys(), ...colourShapes.keys()])].map((colour) => {
    const parts = [
      ...dedupe(colourTexts.get(colour) ?? []).slice(0, MAX_PER_COLOUR).map((t) => `"${t}"`),
      ...dedupe(colourNamed.get(colour) ?? []).slice(0, MAX_PER_COLOUR),
      ...[...(colourShapes.get(colour) ?? new Map<SceneObject['type'], number>()).entries()]
        .map(([type, n]) => (n === 1 ? OBJECT_NOUN[type] : `${n} ${OBJECT_PLURAL[type] ?? OBJECT_NOUN[type]}`)),
    ]
    const stages = [...(colourStages.get(colour) ?? [])]
    const stepped = sceneStepCount(spec) > 1 && stages.length > 0 && stages.length <= 3
    return `${colour}: ${parts.join(', ')}` +
      (stepped ? ` (its unlabelled shapes are drawn in stage${stages.length === 1 ? '' : 's'} ${stages.join(', ')})` : '')
  })

  const allSteps = dedupe(
    (spec.steps ?? [])
      .map((s) => (typeof s.narration === 'string' ? s.narration.trim() : ''))
      .filter(Boolean),
  )
  const steps = allSteps.slice(0, MAX_STEPS)

  const caption = spec.teachingGoal?.trim()
    ? `${clamp(spec.title, 60)} — ${clamp(spec.teachingGoal.trim(), 160)}`
    : clamp(spec.title, 60)

  return {
    caption: caption || null,
    elements: [
      ...readable.map((t) => `text reading "${t}"`),
      ...geometry,
    ],
    readable,
    geometry,
    equations: dedupe(equations).slice(0, 3),
    // A one-step scene is not "stepped"; saying so would invite the model to
    // announce stages that do not exist.
    steps: sceneStepCount(spec) > 1 ? steps : [],
    ...(sceneStepCount(spec) > 1 && allSteps.length > steps.length ? { stepTotal: allSteps.length } : {}),
    ...(placed ? { placed } : {}),
    ...(colours.length ? { colours } : {}),
  }
}

function fromSpec(spec: VisualSpec): VisualSemantics {
  const elements: string[] = []
  let caption: string | null = 'title' in spec && spec.title ? clamp(spec.title, 60) : null

  switch (spec.type) {
    case 'graph': {
      elements.push(`the plotted curve of ${spec.equation}`, 'labelled x and y axes with a grid')
      if (spec.interactive) elements.push('draggable handles that change the line as the learner moves them')
      caption = caption ?? `a graph of ${clamp(spec.equation, 40)}`
      break
    }
    case 'number_line': {
      elements.push(`a number line running from ${spec.start} to ${spec.end}`)
      const marks = spec.highlight ?? []
      if (marks.length) {
        elements.push(
          `${marks.length} marked point${marks.length === 1 ? '' : 's'} at ${marks.slice(0, 6).join(', ')}`,
        )
      }
      if (spec.interactive) elements.push('the marked points can be dragged along the line')
      caption = caption ?? `a number line from ${spec.start} to ${spec.end}`
      break
    }
    case 'process_flow': {
      caption = caption ?? clamp(spec.title, 60)
      // CHEM-082 (re-drive 2026-10-10): clamp(…, 40) cut the stored label
      // "Check for trapped zeros between non-zero digits" to "Check for trapped
      // zeros between", and the tutor read that out as the box's text. A step
      // title is at most 60 characters (visualSpec.ts), so it is described whole.
      for (const step of spec.steps.slice(0, MAX_STEPS)) elements.push(`a step box labelled "${clamp(step.title, 60)}"`)
      elements.push('arrows connecting the steps in order')
      break
    }
    case 'geometry': {
      switch (spec.shape) {
        case 'point': elements.push('a single plotted point'); break
        case 'line': elements.push(`a line segment of length ${spec.length}`); break
        case 'angle': elements.push(`an angle of ${spec.angle}° between two rays, with its arc marked`); break
        case 'triangle': elements.push(`a triangle with base ${spec.base} and height ${spec.height}, both labelled`); break
        case 'rectangle': elements.push(`a rectangle ${spec.width} wide and ${spec.height} tall, both labelled`); break
        case 'circle': elements.push(`a circle of radius ${spec.radius}, with the radius drawn and labelled`); break
      }
      if (spec.interactive) elements.push('the shape can be dragged to resize, and the measurements update live')
      caption = caption ?? `a ${spec.shape} drawn to scale`
      break
    }
  }

  const flat = dedupe(elements).slice(0, MAX_READABLE)
  return { caption, elements: flat, readable: [], geometry: flat, equations: [], steps: [] }
}

/**
 * Read the payload. Returns only what the renderer will genuinely draw.
 * `ascii` and unknown payloads yield nothing, which the contract handles.
 */
export function describeVisualPayload(payload: VisualPayload | null | undefined): VisualSemantics {
  if (!payload) return EMPTY
  switch (payload.renderer) {
    case 'scene': return payload.sceneSpec ? fromScene(payload.sceneSpec) : EMPTY
    case 'spec':  return payload.visualSpec ? fromSpec(payload.visualSpec) : EMPTY
    case 'card': {
      const meta = VISUAL_META[payload.visualType]
      if (!meta) return EMPTY
      const described = [clamp(meta.description, 160)]
      return {
        caption: clamp(meta.title, 60), elements: described,
        readable: [], geometry: described, equations: [], steps: [],
      }
    }
    default: return EMPTY
  }
}

/**
 * The prompt fragment. Empty string when nothing truthful can be said — the
 * caller then keeps its generic (but honest) wording rather than inventing.
 */
export function buildSemanticsBlock(semantics: VisualSemantics): string {
  const parts: string[] = []
  // Read defensively. This builds PROMPT TEXT from a value that may have been
  // constructed before these fields existed (an older asset, a hand-built
  // object); a missing array must degrade to "say less", never to a throw that
  // costs the turn its whole visual contract.
  const readable = semantics.readable ?? []
  const geometry = semantics.geometry ?? []
  const equations = semantics.equations ?? []
  const elements = semantics.elements ?? []
  const steps = semantics.steps ?? []
  if (semantics.caption) parts.push(`The figure is: ${semantics.caption}.`)

  // ── WHAT IS PRESENT ────────────────────────────────────────────────────────
  // Text first and complete: it is the only part of the figure a learner can
  // quote back, and the part the tutor is most likely to invent.
  if (readable.length) {
    const placed = semantics.placed && semantics.placed.length === readable.length ? semantics.placed : null
    parts.push(
      'TEXT WRITTEN ON THE FIGURE, exactly as the learner reads it' +
      (placed ? ', each with where it sits on the figure: ' + placed.join(', ') : ': ' + readable.map((t) => `"${t}"`).join(', ')) +
      '. Use these words when you point at parts of it.' +
      (placed
        ? ' When you say WHERE something is, use only those positions — never say a part is "next to", "below", "above" or "at the bottom" unless those positions show it.'
        : ''),
    )
  }
  if (geometry.length) {
    parts.push(
      'Drawn without text of their own: ' + geometry.join(', ') +
      '. These are shapes — what each one MEANS is given by the text beside it ' +
      'and by the stages below, never by their shape alone.',
    )
  }
  const colours = semantics.colours ?? []
  if (colours.length) {
    parts.push(
      'COLOURS, exactly as drawn — ' + colours.join('; ') + '. ' +
      'When you or the learner name a colour, use only this list: a colour ' +
      'belongs only to the parts listed with it. A colour that is not listed ' +
      'is not on the figure — say so rather than guess what it shows.',
    )
  } else if (readable.length || geometry.length) {
    parts.push(
      'No colour information is available for this figure: never say what a ' +
      'colour shows; point at parts by the text written beside them.',
    )
  }
  // ── WHAT IS NOT THERE ──────────────────────────────────────────────────────
  // MEASURED (real-learner production run, 2026-09-29): with the drawn objects
  // listed, the tutor still told the learner to look at "the rays that
  // converge" on a lens figure with no rays, "the arrow" on a circuit with no
  // current arrows, and "evenly spaced marks" on a projectile path with none.
  // The list above never said it was COMPLETE, so the model filled the gaps
  // with what such a figure usually has. It is complete; say so.
  if (readable.length || geometry.length) {
    parts.push(
      'That list is COMPLETE: nothing else is drawn. If explaining needs something ' +
      'that is not listed — a light ray, a current arrow, a force arrow, evenly ' +
      'spaced marks, a moving object, a label — describe it in words as something ' +
      'to IMAGINE ("imagine a ray of light…"), and never tell the learner to look ' +
      'at it on the figure.',
    )
  }
  // The flat list stays, because it is what the contract's "name only these"
  // rule points at, and callers with no readable/geometry split still work.
  if (!readable.length && !geometry.length && elements.length) {
    parts.push(
      'It contains EXACTLY these elements, and nothing else you may name: ' +
      elements.map((e) => `- ${e}`).join(' ') + '.',
    )
  }

  // ── RELATIONSHIPS WRITTEN ON IT ────────────────────────────────────────────
  if (equations.length) {
    parts.push(
      'Written on the figure as a relationship: ' +
      equations.map((e) => `"${e}"`).join(', ') +
      '. SAY IT IN WORDS as you would to a learner, naming each quantity using ' +
      'THE FIGURE\'S OWN WORDS listed above — the figure labels what its ' +
      'symbols mean, so read the relationship with those names rather than the ' +
      'letters. Do not read the symbols or the punctuation out one by one, do ' +
      'not spell out Greek letters as characters, do not write it as LaTeX or ' +
      'wrap it in dollar signs, and do not invent a meaning for a symbol the ' +
      'figure does not name.',
    )
  }

  // ── WHAT IT MEANS ──────────────────────────────────────────────────────────
  // The authored narrations ARE the relationships. They are the only source of
  // meaning in the payload, so they are quoted, never paraphrased into claims.
  if (steps.length) {
    parts.push(
      `It is built in ${Math.max(semantics.stepTotal ?? 0, steps.length)} stages, shown complete but ` +
      'walkable one stage at a time by the learner' +
      ((semantics.stepTotal ?? 0) > steps.length ? ` (the first ${steps.length} are listed)` : '') + ': ' +
      steps.map((s, i) => `(${i + 1}) ${clamp(s, 220)}`).join(' ') +
      '. These stages are what the figure MEANS: teach it in that order, keep ' +
      'each stage\'s claim intact, and invite them to walk the stages if they ' +
      'want to see it built up.',
    )
  }
  return parts.join(' ')
}
