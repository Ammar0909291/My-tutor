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
  /** Named things the learner can literally see (labels, plotted curve, …). */
  elements: string[]
  /** Authored step narrations, in reveal order. Empty when not stepped. */
  steps: string[]
}

const EMPTY: VisualSemantics = { caption: null, elements: [], steps: [] }

const MAX_ELEMENTS = 8
const MAX_STEPS = 6

/** Human-readable noun for a scene object, used only when it carries no text. */
const OBJECT_NOUN: Record<SceneObject['type'], string> = {
  point: 'a marked point',
  particle: 'a particle',
  node: 'a node',
  vector: 'an arrow (vector)',
  arrow: 'an arrow',
  bond: 'a bond between two atoms',
  label: 'a text label',
  path: 'a traced path',
  trajectory: 'a traced trajectory',
  bar: 'a bar',
  surface: 'a surface',
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
  const elements: string[] = []
  for (const step of spec.steps ?? []) {
    for (const obj of step.objects ?? []) {
      // Never describe something the renderer will not draw.
      if (!DRAWN.has(obj.type)) continue
      const text = typeof obj.text === 'string' ? obj.text.trim() : ''
      elements.push(
        text
          ? `${OBJECT_NOUN[obj.type]} labelled "${clamp(text, 40)}"`
          : OBJECT_NOUN[obj.type],
      )
    }
  }

  const steps = dedupe(
    (spec.steps ?? [])
      .map((s) => (typeof s.narration === 'string' ? s.narration.trim() : ''))
      .filter(Boolean),
  ).slice(0, MAX_STEPS)

  const caption = spec.teachingGoal?.trim()
    ? `${clamp(spec.title, 60)} — ${clamp(spec.teachingGoal.trim(), 120)}`
    : clamp(spec.title, 60)

  return {
    caption: caption || null,
    elements: dedupe(elements).slice(0, MAX_ELEMENTS),
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

  return { caption, elements: dedupe(elements).slice(0, MAX_ELEMENTS), steps: [] }
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
      return { caption: clamp(meta.title, 60), elements: [clamp(meta.description, 160)], steps: [] }
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
  if (semantics.caption) parts.push(`The figure is: ${semantics.caption}.`)
  if (semantics.elements.length) {
    parts.push(
      'It contains EXACTLY these elements, and nothing else you may name: ' +
      semantics.elements.map((e) => `- ${e}`).join(' ') + '.',
    )
  }
  if (semantics.steps.length) {
    parts.push(
      `It is revealed in ${semantics.steps.length} stages, which the learner ` +
      'steps through: ' + semantics.steps.map((s, i) => `(${i + 1}) ${clamp(s, 120)}`).join(' ') +
      '. Teach one stage at a time and let them advance.',
    )
  }
  return parts.join(' ')
}
