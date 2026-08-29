/**
 * Representation transitions — the same situation, told four ways.
 *
 * WHAT A TRANSITION IS NOT. It is not a second figure. A learner who is shown a
 * 3D scene and then, separately, an equation has been shown two things and left
 * to guess that they are about the same situation — which is the exact gap this
 * layer exists to close. So every view here is a VIEW OVER THE SAME OBJECT SET:
 * the ids do not change, the geometry is not rebuilt, and nothing is generated.
 * What changes is what is foregrounded.
 *
 *   spatial    the situation. Full scene, ground plane, axis triad — where
 *              things are and how they are arranged in space.
 *   schematic  the diagram. The apparatus recedes and only the quantities that
 *              carry the relationship are drawn at strength; this is the step
 *              from "a wrench and a bolt" to "a line and an arrow".
 *   symbolic   the relationship. The working is raised beside the figure, with
 *              each symbol painted in the colour of the object it stands for —
 *              which is the mapping a learner is otherwise asked to make in
 *              their head.
 *   numeric    the answer. The evaluated value, still attached to the figure it
 *              came from.
 *
 * ── IT DOES NOT FAKE WHAT A SCENE CANNOT DO ─────────────────────────────────
 * A view is offered only when it would differ from the one before it: a figure
 * with no apparatus has no schematic step to take, and a figure that states no
 * relationship has no symbolic one. `availableRepresentations` returns what the
 * scene can honestly support, which for many figures is `spatial` alone.
 *
 * Pure. No React, no three.js.
 */

import type { SceneObject, SceneSpec } from '@/lib/teaching/sceneSpec'
import { roleOf } from '@/lib/teaching/sceneGenerators/visualDesign'
import type { ExplainerSpec } from './explainer'

export type RepresentationView = 'spatial' | 'schematic' | 'symbolic' | 'numeric'

export interface Representation {
  view: RepresentationView
  label: string
  /** What this step of the progression gives the learner. */
  teaches: string
}

const DEFINITIONS: Record<RepresentationView, Omit<Representation, 'view'>> = {
  spatial: {
    label: 'Situation',
    teaches: 'where everything is, and how it is arranged',
  },
  schematic: {
    label: 'Diagram',
    teaches: 'the same thing with the apparatus stripped away — only the quantities that matter',
  },
  symbolic: {
    label: 'Relationship',
    teaches: 'which symbol stands for which part of the figure',
  },
  numeric: {
    label: 'Answer',
    teaches: 'the value that follows, and where it came from',
  },
}

/**
 * Objects that carry the RELATIONSHIP rather than the setting.
 *
 * Decided from the semantic palette, so it means the same thing in every
 * subject: the driving quantity, what results, and the construction aids the
 * relationship is measured against. Apparatus (`reference`) is setting — unless
 * it is named, because a named part of the apparatus is being talked about.
 */
function carriesRelationship(obj: SceneObject): boolean {
  const role = roleOf(obj.color)
  if (role && role !== 'reference') return true
  return typeof obj.text === 'string' && obj.text.trim().length > 0
}

/**
 * The objects to draw for a view.
 *
 * Identity is preserved throughout: this filters and never rewrites, so an
 * object present in two views is the SAME object, at the same coordinates, with
 * the same id. That is what lets a learner follow one part across the
 * transition instead of re-finding it.
 */
export function objectsForView(objects: SceneObject[], view: RepresentationView): SceneObject[] {
  if (view === 'spatial') return objects
  return objects.filter(carriesRelationship)
}

/** Ids the view keeps at full strength; the rest dim, exactly as focus does. */
export function focusForView(objects: SceneObject[], view: RepresentationView): ReadonlySet<string> {
  if (view === 'spatial' || view === 'schematic') return new Set()
  // Symbolic and numeric are about the result, so the result leads.
  const ids = objects.filter((o) => roleOf(o.color) === 'result' && o.id).map((o) => o.id as string)
  return ids.length ? new Set(ids) : new Set()
}

/** Should the ground plane and axis triad be drawn in this view? */
export function decorForView(view: RepresentationView): boolean {
  // Only the spatial view is about space. Keeping the ground under a schematic
  // is what makes a schematic look like a worse 3D scene instead of a cleaner
  // idea.
  return view === 'spatial'
}

/**
 * The progression this figure can honestly offer, in teaching order.
 *
 * `spatial` is always present — it is the scene. Each later view is included
 * only when it would say something the previous one did not.
 */
export function availableRepresentations(
  spec: SceneSpec,
  explainer: Pick<ExplainerSpec, 'panels' | 'result'>,
): Representation[] {
  const objects = spec.steps.flatMap((s) => s.objects)
  const views: RepresentationView[] = ['spatial']

  // A schematic step only exists if there is apparatus to strip.
  if (objectsForView(objects, 'schematic').length < objects.length) views.push('schematic')

  // A symbolic step needs a stated relationship to raise.
  if (workingLines(explainer).length > 0) views.push('symbolic')

  // A numeric step needs an evaluated value.
  if (explainer.result?.value) views.push('numeric')

  return views.map((view) => ({ view, ...DEFINITIONS[view] }))
}

/** The derivation lines the symbolic view raises, from the explainer's panels. */
export function workingLines(explainer: Pick<ExplainerSpec, 'panels'>): string[] {
  return (explainer.panels ?? []).flatMap((p) => p.lines ?? [])
}

/**
 * A working line, split so each symbol can be painted in the colour of the
 * object it stands for.
 *
 * THE MAPPING IS DERIVED, NOT AUTHORED. A legend row already names a colour
 * ("r = 2 m" in the lever's blue, "F = 10 N" in the force's red), so the symbol
 * a row is about is its first token — and a token in the working that matches
 * it is the same quantity. Nothing is guessed: a token with no legend match is
 * left in the ordinary ink, which is what happens to operators, numbers and any
 * symbol the figure does not draw.
 *
 * This is the only place the engine claims "this symbol IS that object", and it
 * claims it only where the figure itself said so.
 */
export function linkSymbols(
  line: string,
  legend: readonly { label: string; color: string }[],
): { text: string; color?: string }[] {
  const bySymbol = new Map<string, string>()
  for (const row of legend) {
    const symbol = row.label.trim().split(/[\s=(]/)[0]
    // One character or a short greek/latin token is a symbol; a word is a name.
    if (symbol && symbol.length <= 3 && !bySymbol.has(symbol)) bySymbol.set(symbol, row.color)
  }
  if (bySymbol.size === 0) return [{ text: line }]

  // Split on token boundaries, keeping the separators so the line is rebuilt
  // exactly — a rendering that dropped a character would be a wrong formula.
  const parts = line.split(/([A-Za-zθτμαβγΔ]+|\s+)/).filter((p) => p !== '')
  return parts.map((text) => {
    const color = bySymbol.get(text)
    return color ? { text, color } : { text }
  })
}
