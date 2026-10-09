/**
 * typesetSceneChemistry — ASCII chemical notation in a SceneSpec's learner-visible
 * text → the Unicode the lesson screen shows (`Zn2+` → `Zn²⁺`, `NH3` → `NH₃`).
 *
 * WHY. A figure draws its words verbatim (`SceneLabel` prints `{text}`), so notation
 * authored or generated as plain ASCII reached learners as typed, while the tutor's
 * own text and the cards were already typeset (CHEM-129, `plainNotation`). One figure
 * then printed `Zn2+ in solution` beside `e⁻`. This is the one place figure text is
 * typeset, so authored, generated, approved and client-rebuilt scenes read the same.
 *
 * WHAT IT TOUCHES: exactly the strings `chemistryFigureAudit.collectSceneTexts` lists —
 * title, goal, aria label, axis names, step narration, object text, predict
 * question/options and the explainer frame. Ids, colours, coordinates, `parametric`
 * and every non-text field are returned untouched.
 *
 * WHAT IT NEVER DOES: change a word, a number or a unit. The per-token rewrite lives in
 * `@/lib/text/chemSpecies.pure` and only fires on a token that parses as a real species.
 *
 * Pure and referentially careful: a scene with nothing to typeset is returned as the
 * SAME object (React memo and cache identity stay stable); otherwise a new object that
 * shares every unchanged branch with the input. The input is never mutated.
 */

import type { SceneObject, SceneSpec, SceneStep } from '../sceneSpec'
import { typesetChemText as typesetFormulas } from '@/lib/text/chemSpecies.pure'
import { typesetCaretNotation } from '@/lib/text/plainNotation'

/** Caret/underscore markup (`H_2O`, `H^+`, `Fe^{2+}`) first, then bare ASCII formulas (`NH3`, `Zn2+`). */
const typesetChemText = (s: string): string => typesetFormulas(typesetCaretNotation(s))

type Explainer = NonNullable<SceneSpec['explainer']>

/**
 * Apply `fn` to every learner-visible string of a scene (the set `collectSceneTexts` lists) and to
 * nothing else. The SAME object comes back when `fn` changes no string; otherwise a new object that
 * shares every unchanged branch. The input is never mutated.
 *
 * Exported because two callers need exactly this walk with opposite functions: the typesetter below
 * (ASCII → Unicode, what the learner sees) and the chemistry audit's notation-neutral view
 * (Unicode → ASCII, what its family verifiers were written against).
 */
export function mapSceneTexts<T extends SceneSpec>(scene: T, fn: (s: string) => string): T {
  if (!scene || typeof scene !== 'object') return scene
  let changed = false

  const ts = (s: string | undefined): string | undefined => {
    if (typeof s !== 'string') return s
    const out = fn(s)
    if (out !== s) changed = true
    return out
  }
  const tsList = (xs: string[] | undefined): string[] | undefined => (Array.isArray(xs) ? xs.map((x) => ts(x) as string) : xs)

  const objects = (os: SceneObject[] | undefined): SceneObject[] | undefined =>
    Array.isArray(os) ? os.map((o) => (o && typeof o.text === 'string' ? { ...o, text: ts(o.text) as string } : o)) : os

  const steps = Array.isArray(scene.steps)
    ? scene.steps.map((step): SceneStep => {
        if (!step) return step
        const next: SceneStep = { ...step, objects: objects(step.objects) as SceneObject[] }
        if (typeof step.narration === 'string') next.narration = ts(step.narration)
        if (step.predict) {
          next.predict = { ...step.predict, question: ts(step.predict.question) as string }
          if (step.predict.options) next.predict.options = tsList(step.predict.options)
        }
        return next
      })
    : scene.steps

  const ex = scene.explainer
  let explainer: Explainer | undefined = ex
  if (ex) {
    explainer = { ...ex }
    if (typeof ex.title === 'string') explainer.title = ts(ex.title) as string
    if (typeof ex.givens === 'string') explainer.givens = ts(ex.givens)
    if (ex.result) {
      explainer.result = { ...ex.result }
      if (typeof ex.result.expression === 'string') explainer.result.expression = ts(ex.result.expression) as string
      if (typeof ex.result.value === 'string') explainer.result.value = ts(ex.result.value) as string
    }
    if (Array.isArray(ex.legend)) {
      explainer.legend = ex.legend.map((l) => (l && typeof l.label === 'string' ? { ...l, label: ts(l.label) as string } : l))
    }
    if (Array.isArray(ex.panels)) {
      explainer.panels = ex.panels.map((p) => {
        if (!p) return p
        const np = { ...p }
        if (typeof p.heading === 'string') np.heading = ts(p.heading) as string
        if (typeof p.body === 'string') np.body = ts(p.body) as string
        if (Array.isArray(p.lines)) np.lines = tsList(p.lines) as string[]
        return np
      })
    }
    if (ex.insight) {
      explainer.insight = { ...ex.insight }
      if (typeof ex.insight.heading === 'string') explainer.insight.heading = ts(ex.insight.heading) as string
      if (Array.isArray(ex.insight.bullets)) explainer.insight.bullets = tsList(ex.insight.bullets) as string[]
      if (typeof ex.insight.note === 'string') explainer.insight.note = ts(ex.insight.note)
    }
  }

  const axisLabels = scene.stage?.axisLabels
  const nextAxis = axisLabels
    ? { x: ts(axisLabels.x), y: ts(axisLabels.y), z: ts(axisLabels.z) }
    : axisLabels

  const title = ts(scene.title) as string
  const teachingGoal = ts(scene.teachingGoal)
  const ariaLabel = ts(scene.ariaLabel)

  if (!changed) return scene

  const next: SceneSpec = { ...scene, title, steps: steps as SceneStep[] }
  if (teachingGoal !== undefined) next.teachingGoal = teachingGoal
  if (ariaLabel !== undefined) next.ariaLabel = ariaLabel
  if (explainer) next.explainer = explainer
  if (scene.stage && nextAxis) {
    next.stage = { ...scene.stage, axisLabels: { ...(nextAxis.x !== undefined ? { x: nextAxis.x } : {}), ...(nextAxis.y !== undefined ? { y: nextAxis.y } : {}), ...(nextAxis.z !== undefined ? { z: nextAxis.z } : {}) } }
  }
  return next as T
}

/** ASCII chemical notation in a scene's learner-visible text → the Unicode the lesson screen shows. */
export function typesetSceneChemistry<T extends SceneSpec>(scene: T): T {
  return mapSceneTexts(scene, typesetChemText)
}

// ── the other payload shapes ───────────────────────────────────────────────────

type SpecLike = Record<string, unknown>

/**
 * A VisualSpec's learner-visible text — graph/number-line titles and axis names,
 * process-flow title/steps/notes. NEVER `equation` (a formula the expression parser
 * compiles) and never a numeric field. Same identity contract as the scene mapper:
 * the SAME object back when nothing needed typesetting.
 */
export function typesetSpecChemistry<T extends SpecLike>(spec: T): T {
  if (!spec || typeof spec !== 'object') return spec
  let changed = false
  const ts = (s: unknown): unknown => {
    if (typeof s !== 'string') return s
    const out = typesetChemText(s)
    if (out !== s) changed = true
    return out
  }
  const next: SpecLike = { ...spec }
  for (const k of ['title', 'xLabel', 'yLabel']) if (typeof spec[k] === 'string') next[k] = ts(spec[k])
  if (Array.isArray(spec.steps)) {
    next.steps = (spec.steps as unknown[]).map((st) => {
      if (typeof st === 'string') return ts(st)
      if (st && typeof st === 'object') {
        const o = { ...(st as SpecLike) }
        if (typeof o.title === 'string') o.title = ts(o.title)
        if (typeof o.note === 'string') o.note = ts(o.note)
        return o
      }
      return st
    })
  }
  return changed ? (next as T) : spec
}

/**
 * Typeset a visual payload's text when it is a CHEMISTRY figure. Other subjects are
 * returned untouched: `H2` in a physics or computing figure is not this module's
 * business. Cards carry no text of their own.
 */
export function typesetPayloadChemistry<P extends { renderer: string }>(conceptId: string, payload: P): P {
  if (!conceptId.startsWith('chem.')) return payload
  const p = payload as unknown as { renderer: string; sceneSpec?: SceneSpec; visualSpec?: SpecLike }
  if (p.renderer === 'scene' && p.sceneSpec) {
    const sceneSpec = typesetSceneChemistry(p.sceneSpec)
    return sceneSpec === p.sceneSpec ? payload : ({ ...p, sceneSpec } as unknown as P)
  }
  if (p.renderer === 'spec' && p.visualSpec) {
    const visualSpec = typesetSpecChemistry(p.visualSpec)
    return visualSpec === p.visualSpec ? payload : ({ ...p, visualSpec } as unknown as P)
  }
  return payload
}
