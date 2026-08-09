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
 * a truthful generic description.
 */

import type { VisualPayload } from './types'
import type { SceneObject, SceneSpec } from '@/lib/teaching/sceneSpec'
import { sceneStepCount } from '@/lib/teaching/sceneSpec'
import type { VisualSpec } from '@/lib/visuals/visualSpec'
import { VISUAL_META } from '@/lib/school/visuals/visualTypes'
import { clamp } from './conceptText'

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
}

const EMPTY: VisualSemantics = {
  caption: null, elements: [], readable: [], geometry: [], equations: [], steps: [],
}

/** Labels are the teaching; every one of them earns a slot before geometry. */
const MAX_READABLE = 14
const MAX_GEOMETRY = 5
const MAX_STEPS = 6

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

function fromScene(spec: SceneSpec): VisualSemantics {
  // Read the drawn objects once, splitting text from shape. Both halves come
  // from the payload the renderer will paint — nothing here is inferred.
  const texts: string[] = []
  const equations: string[] = []
  const shapeCounts = new Map<SceneObject['type'], number>()

  for (const step of spec.steps ?? []) {
    for (const obj of step.objects ?? []) {
      // Never describe something the renderer will not draw.
      if (!DRAWN.has(obj.type)) continue
      const text = typeof obj.text === 'string' ? obj.text.trim() : ''
      if (text) {
        // A label's TEXT is what the learner reads, whatever shape carries it.
        // EVERY label goes into `texts`, including the relationships: pulling
        // an equation OUT of the readable list cost total internal reflection
        // its middle case ("② θ = θc" contains "="), leaving the model with
        // cases ① and ③ and a gap where the critical angle should be.
        // `equations` is an ADDITIONAL view of the same labels, never a move.
        texts.push(clamp(text, 60))
        if (isEquation(text)) equations.push(clamp(text, 60))
      } else {
        shapeCounts.set(obj.type, (shapeCounts.get(obj.type) ?? 0) + 1)
      }
    }
  }

  const readable = dedupe(texts).slice(0, MAX_READABLE)
  const geometry = [...shapeCounts.entries()]
    // Densest shapes first: what dominates the picture is what a learner sees.
    .sort((a, b) => b[1] - a[1])
    .slice(0, MAX_GEOMETRY)
    .map(([type, n]) => (n === 1 ? OBJECT_NOUN[type] : `${n} ${OBJECT_PLURAL[type] ?? OBJECT_NOUN[type]}`))

  const steps = dedupe(
    (spec.steps ?? [])
      .map((s) => (typeof s.narration === 'string' ? s.narration.trim() : ''))
      .filter(Boolean),
  ).slice(0, MAX_STEPS)

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
      for (const step of spec.steps.slice(0, MAX_STEPS)) elements.push(`a step box labelled "${clamp(step.title, 40)}"`)
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
    parts.push(
      'TEXT WRITTEN ON THE FIGURE, exactly as the learner reads it: ' +
      readable.map((t) => `"${t}"`).join(', ') +
      '. Use these words when you point at parts of it.',
    )
  }
  if (geometry.length) {
    parts.push(
      'Drawn without text of their own: ' + geometry.join(', ') +
      '. These are shapes — what each one MEANS is given by the text beside it ' +
      'and by the stages below, never by their shape alone.',
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
      `It is built in ${steps.length} stages, shown complete but ` +
      'walkable one stage at a time by the learner: ' +
      steps.map((s, i) => `(${i + 1}) ${clamp(s, 220)}`).join(' ') +
      '. These stages are what the figure MEANS: teach it in that order, keep ' +
      'each stage\'s claim intact, and invite them to walk the stages if they ' +
      'want to see it built up.',
    )
  }
  return parts.join(' ')
}
