/**
 * The stage engine — what a figure SHOWS right now, and what it withholds.
 *
 * WHAT WAS MISSING. `visibleObjects(spec, revealStep)` was the whole of the
 * engine's presentation logic: a step index in, a flat object list out. That is
 * enough to display a figure and not nearly enough to teach with one. There was
 * no way to say "look at this part", no way to hold back the answer so the
 * learner can predict it, and no way to turn the same figure into a practice
 * question — so every figure arrived fully resolved, with the result already
 * printed on it, whatever the teaching moment was.
 *
 * This module adds those three, as ONE pure function over any scene:
 *
 *   PROGRESSIVE REVEAL   which stage we are at (the existing additive reveal)
 *   FOCUS                which ids this stage is about; the rest dim, never vanish
 *   CHALLENGE            which answers are withheld, by MODE, not by concept
 *
 * ── WHY IT IS UNIVERSAL ─────────────────────────────────────────────────────
 * Nothing here knows a subject, a concept, or a generator. Withholding is
 * decided from the SEMANTIC PALETTE — a label the author coloured `result` is
 * the answer, in a torque diagram and in a Punnett square alike — and from the
 * stage's own declared `focus`/`predict`. That is why the same rules produce a
 * sensible practice mode for a scene nobody wrote practice mode for.
 *
 * ── DIM, DO NOT DELETE ──────────────────────────────────────────────────────
 * Focus never removes geometry. A learner who loses the surrounding context
 * loses the relationship the figure exists to show; and an object that vanishes
 * and returns reads as a broken render. Focus changes emphasis only.
 *
 * Pure arithmetic over data. No React, no three.js, no I/O.
 */

import { roleOf } from '@/lib/teaching/sceneGenerators/visualDesign'
import type { SceneObject, SceneSpec } from '@/lib/teaching/sceneSpec'

/**
 * How the figure is being used this moment. The tutor chooses; the learner can
 * also step it themselves through the frame's own controls.
 *
 *   explain   everything the scene states is shown. The default.
 *   practice  the ANSWER is withheld; the setup and the relationship stay.
 *   predict   the answer AND the final stage are withheld, pending a guess.
 *   assess    every stated quantity is withheld — the figure asks, it does not tell.
 */
export type SceneMode = 'explain' | 'practice' | 'predict' | 'assess'

export interface StageView {
  /** Objects to draw, in scene order. */
  objects: SceneObject[]
  /** Ids drawn at full strength. Empty means "everything is in focus". */
  focusIds: ReadonlySet<string>
  /** Objects withheld by the current mode, so the caller can say how many. */
  withheldCount: number
  /** The stage's narration, if it has one. */
  narration: string | null
  /** The stage's declared intent, if it has one. */
  intent: SceneSpec['steps'][number]['intent'] | null
  /** The prediction to put to the learner before revealing this stage. */
  predict: SceneSpec['steps'][number]['predict'] | null
  /** 1-based stage number and the total, for the stepper. */
  stage: number
  totalStages: number
}

/** A label that states a quantity: it carries a relation and a number. */
function statesAQuantity(obj: SceneObject): boolean {
  if (obj.type !== 'label' || typeof obj.text !== 'string') return false
  return /[=≈]/.test(obj.text) && /\d/.test(obj.text)
}

/** A label the author coloured as the RESULT — the answer, in any subject. */
function statesTheAnswer(obj: SceneObject): boolean {
  return obj.type === 'label' && roleOf(obj.color) === 'result'
}

/**
 * Is this object withheld in this mode?
 *
 * Geometry is NEVER withheld — hiding the force vector does not make a question
 * harder, it makes the figure wrong. Only TEXT that states an answer is held
 * back, which is exactly the difference between a diagram that tells you and a
 * diagram that asks you.
 */
function withheldIn(mode: SceneMode, obj: SceneObject): boolean {
  if (obj.type !== 'label') return false
  switch (mode) {
    case 'explain':
      return false
    case 'practice':
    case 'predict':
      return statesTheAnswer(obj)
    case 'assess':
      return statesTheAnswer(obj) || statesAQuantity(obj)
  }
}

/**
 * The stage a learner is looking at.
 *
 * `stage` is 1-based and clamped, so a caller may step past either end without
 * a guard. `Infinity` — the renderer's own default for "show everything" — is
 * the final stage, which is what it has always meant.
 */
export function stageView(spec: SceneSpec, stage: number, mode: SceneMode = 'explain'): StageView {
  const total = Math.max(1, spec.steps.length)
  const at = Number.isFinite(stage) ? Math.min(total, Math.max(1, Math.round(stage))) : total
  const step = spec.steps[at - 1]

  // PREDICT withholds the outcome, not the setup: a scene whose last stage
  // resolves the answer stops one stage short until the learner has guessed.
  const revealTo = mode === 'predict' && at === total && total > 1 ? at - 1 : at

  const all: SceneObject[] = []
  for (let i = 0; i < revealTo; i++) all.push(...spec.steps[i].objects)

  const kept = all.filter((o) => !withheldIn(mode, o))

  return {
    objects: kept,
    focusIds: new Set((step?.focus ?? []).filter(Boolean)),
    withheldCount: all.length - kept.length,
    narration: step?.narration?.trim() || null,
    intent: step?.intent ?? null,
    predict: step?.predict ?? null,
    stage: at,
    totalStages: total,
  }
}

/**
 * Emphasis for one object under a focus set — the single rule the renderer
 * applies, so "dimmed" means the same thing in every figure.
 *
 * An object with no id can never be named by a `focus` list, so it is treated
 * as context and dims with the rest. That is deliberate: a scene that wants an
 * object to hold focus must give it an identity.
 */
export function emphasisOf(obj: SceneObject, focusIds: ReadonlySet<string>): 'focus' | 'context' {
  if (focusIds.size === 0) return 'focus'
  return obj.id && focusIds.has(obj.id) ? 'focus' : 'context'
}

/** Opacity for an emphasis level. Dimmed, never invisible — see the header. */
export const EMPHASIS_OPACITY: Record<'focus' | 'context', number> = {
  focus: 1,
  context: 0.28,
}

/**
 * Does this scene have anything to withhold in this mode?
 *
 * The frame uses it to decide whether offering "practice" is honest: a figure
 * that states no answer cannot be turned into a question by hiding nothing, and
 * offering the mode anyway would be a control that does nothing.
 */
export function supportsMode(spec: SceneSpec, mode: SceneMode): boolean {
  if (mode === 'explain') return true
  const all = spec.steps.flatMap((s) => s.objects)
  if (mode === 'predict') {
    return spec.steps.length > 1 && (all.some(statesTheAnswer) || spec.steps.some((s) => Boolean(s.predict)))
  }
  return all.some((o) => withheldIn(mode, o))
}

/** The modes this scene can honestly offer, in teaching order. */
export function availableModes(spec: SceneSpec): SceneMode[] {
  return (['explain', 'predict', 'practice', 'assess'] as const).filter((m) => supportsMode(spec, m))
}

// ── ANSWER LEAKAGE ───────────────────────────────────────────────────────────
//
// THE DEFECT THIS CLOSES, measured in production on an interactive series
// circuit (phys.elect.current-and-drift). Assess mode reported, truthfully,
// "Every stated value is hidden. Read the figure alone. (5 hidden)" — and the
// frame around that same figure simultaneously printed:
//
//   title  "Series circuit — R_total = 76 Ω"
//   panel  "…Total resistance is 76 Ω, giving a current of 0.16 A through
//           every resistor."
//   narration  the same sentence again
//
// Three unguarded surfaces, plus a result chip that WAS guarded. The cause is
// not a missing `if`: `withheldIn` above decides what a mode hides for objects
// INSIDE the scene, while `deriveExplainer` independently reads the SAME scene
// and re-states those quantities as prose around it. Two consumers of one
// scene, only one of them mode-aware — so the hidden count was literally true
// of the canvas and false of the page.
//
// The fix therefore does NOT introduce a second withholding policy, which
// would be the same defect one layer up and free to drift. The forbidden
// values are derived FROM `withheldIn`'s own decision: whatever this mode
// hides in the figure is exactly what the prose may not state. Adding a mode,
// or changing what a mode hides, moves both together by construction.

/**
 * The VALUES the mode is hiding, as they appear in the figure.
 *
 * Only the right-hand side of a relation is taken, never the identifier: from
 * "R_total = 30 Ω, I_total = 0.4 A" this yields 30 and 0.4, not the 1 and 2 of
 * "R1"/"V2". Redacting on identifiers would blank almost every sentence.
 */
export function withheldValues(spec: SceneSpec, mode: SceneMode): number[] {
  const values: number[] = []
  for (const step of spec.steps) {
    for (const obj of step.objects) {
      if (!withheldIn(mode, obj)) continue
      if (obj.type !== 'label' || typeof obj.text !== 'string') continue
      for (const clause of obj.text.split(/[,;]/)) {
        // "x = 12.5" -> 12.5 ; a bare "12 V" -> 12 ; "R1" -> nothing.
        const rhs = clause.includes('=') ? clause.slice(clause.indexOf('=') + 1) : clause
        const m = rhs.match(/-?\d+(?:\.\d+)?/)
        if (m) values.push(Number(m[0]))
      }
    }
  }
  return [...new Set(values)].filter((v) => Number.isFinite(v))
}

/** Does this fragment state one of the values the figure is hiding? */
function statesAWithheldValue(text: string, values: number[]): boolean {
  if (values.length === 0) return false
  for (const m of text.matchAll(/-?\d+(?:\.\d+)?/g)) {
    const n = Number(m[0])
    // Compared numerically, so "0.40" and "0.4" are the same leak, and a
    // rounded restatement of a withheld value is caught with it.
    if (values.some((v) => Math.abs(v - n) < 5e-3)) return true
  }
  return false
}

/**
 * Drop the sentences that state a withheld value, keep the rest.
 *
 * Sentence-scoped rather than all-or-nothing so an explanation does not vanish
 * because one clause carried a number — the learner keeps the reasoning and
 * loses only the answer. Returns null when nothing survives, which the caller
 * renders as absent rather than as an empty box.
 */
export function redactText(text: string | undefined, values: number[]): string | null {
  if (!text) return text ?? null
  const kept = text
    .split(/(?<=[.!?])\s+/)
    .filter((s) => !statesAWithheldValue(s, values))
    .join(' ')
    .trim()
  return kept.length > 0 ? kept : null
}

/**
 * A title must survive — a figure with no title is worse than one whose title
 * is trimmed — so the offending clause is cut rather than the whole line. The
 * split points are the ones titles actually use to append a computed result
 * ("Series circuit — R_total = 76 Ω").
 */
export function redactTitle(title: string, values: number[]): string {
  if (!statesAWithheldValue(title, values)) return title
  const head = title.split(/\s+[—–-]\s+|:\s+/)[0]?.trim()
  if (head && !statesAWithheldValue(head, values)) return head
  return title.replace(/-?\d+(?:\.\d+)?/g, '?')
}

/**
 * The explainer frame, with everything this mode hides in the figure removed
 * from the prose around it. THE INVARIANT: figureOnlyAssessment => no answer
 * leakage, for every surface the frame renders, not the two that happened to
 * be guarded.
 *
 * `explain` is returned untouched — the restriction exists only while the
 * learner is being assessed, and normal teaching must stay fully informative.
 */
export function redactExplainer<T extends {
  title: string
  givens?: string
  result?: unknown
  panels?: { heading: string; body?: string; lines?: string[]; emphasis?: string }[]
  insight?: { heading?: string; bullets: string[]; note?: string }
}>(explainer: T, spec: SceneSpec, mode: SceneMode): T {
  if (mode === 'explain') return explainer
  const values = withheldValues(spec, mode)
  if (values.length === 0) return { ...explainer, result: undefined }

  const panels = (explainer.panels ?? [])
    .map((p) => {
      const body = redactText(p.body, values) ?? undefined
      const lines = p.lines?.filter((l) => !statesAWithheldValue(l, values))
      return { ...p, body, lines: lines?.length ? lines : undefined,
        emphasis: p.emphasis && !statesAWithheldValue(p.emphasis, values) ? p.emphasis : undefined }
    })
    // A panel reduced to a bare heading says nothing; drop it rather than
    // leave the learner an empty labelled box.
    .filter((p) => p.body || (p.lines?.length ?? 0) > 0)

  const insight = explainer.insight && {
    ...explainer.insight,
    bullets: explainer.insight.bullets.filter((b) => !statesAWithheldValue(b, values)),
    note: redactText(explainer.insight.note, values) ?? undefined,
  }

  return {
    ...explainer,
    title: redactTitle(explainer.title, values),
    givens: redactText(explainer.givens, values) ?? undefined,
    // The chip exists to state the answer, so in any withholding mode it goes
    // whole — this is the one pre-existing guard, kept and moved here so all
    // of the withholding lives in one place.
    result: undefined,
    panels: panels.length ? panels : undefined,
    insight: insight && (insight.bullets.length > 0 || insight.note) ? insight : undefined,
  }
}
