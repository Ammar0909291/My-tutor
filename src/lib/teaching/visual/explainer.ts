/**
 * ExplainerSpec — the teaching frame around a figure.
 *
 * WHAT CHANGED AND WHY. Until now a figure was a canvas and a caption: the
 * renderer drew geometry, `SceneSpecFigure` put a 13px title above it and the
 * teaching goal below it, and everything else a learner needed — what the
 * colours mean, what the numbers were, how the result was arrived at, what to
 * take away — lived only in the tutor's prose beside it. A learner reading the
 * figure on its own (scrolled back, on a phone, or with the prose collapsed)
 * got a picture with no way in.
 *
 * This module is the missing half: the structured, non-geometric content of a
 * teaching figure — header, givens, the result, a legend for the colour
 * language, the explanation panels, the key insight, and the parameters the
 * learner may vary.
 *
 * ── IT NEVER INVENTS ────────────────────────────────────────────────────────
 * The one rule that makes this safe to apply to every figure in the product:
 * `deriveExplainer` may only RESTATE what the scene already declares — its
 * title, its authored narrations, its teaching goal, its object labels and
 * their semantic colours. It performs no reasoning about the subject, calls no
 * model, and adds no sentence that is not already somewhere in the spec. A
 * frame that explained more than the figure contains would be exactly the
 * "confidently wrong figure" failure the visual engine exists to prevent.
 *
 * A generator that knows more than the scene shows may AUTHOR an explainer
 * (`spec.explainer`); authored fields win, field by field, and anything left
 * out is still derived. So no generator is obliged to author one, and every
 * figure in the corpus gains the frame the moment this ships.
 *
 * Pure data. No React, no three.js, no I/O — the frame is unit-testable
 * without a browser, and is computed identically on the server and the client.
 */

import type { SceneObject, SceneSpec } from '@/lib/teaching/sceneSpec'
import { ROLE, roleOf, type Role } from '@/lib/teaching/sceneGenerators/visualDesign'

// ── vocabulary ───────────────────────────────────────────────────────────────

/** One row of the colour legend: a swatch and what that colour means here. */
export interface ExplainerSwatch {
  label: string
  /** The scene's stored (dark-theme) colour; the renderer themes it. */
  color: string
  /** How to draw the swatch — matches how the thing itself is drawn. */
  shape: 'line' | 'arrow' | 'dot'
}

/** One panel in the explanation rail. */
export interface ExplainerPanel {
  heading: string
  /** Prose. Kept to a few short sentences — a panel is read, not studied. */
  body?: string
  /** Stepped lines (a derivation, a sequence). Rendered in the mono face. */
  lines?: string[]
  /** The line to emphasise — an exact match against one of `lines`. */
  emphasis?: string
}

/** A parameter the learner may vary, re-deriving the figure live. */
export interface ExplainerControl {
  /** Key into the generator's own parameter object. */
  key: string
  label: string
  min: number
  max: number
  step: number
  value: number
  unit?: string
}

/** The headline result, shown as a chip under the title. */
export interface ExplainerResult {
  /** The relationship, e.g. "τ = r × F". */
  expression: string
  /** The evaluated value, e.g. "20 N·m". Highlighted. */
  value?: string
}

export interface ExplainerInsight {
  heading?: string
  bullets: string[]
  /** A single closing observation, set beside the bullets. */
  note?: string
}

/**
 * The complete frame. Every field is optional except the title, so a figure
 * with almost no declared content still renders a correct, if sparse, frame
 * rather than a fabricated one.
 */
export interface ExplainerSpec {
  title: string
  /** The given quantities, e.g. "r = 2 m, F = 10 N, θ = 90°". */
  givens?: string
  result?: ExplainerResult
  legend?: ExplainerSwatch[]
  panels?: ExplainerPanel[]
  insight?: ExplainerInsight
  /**
   * Live parameters. Present only when the scene names a `parametric` builder
   * the client can re-run — a slider that cannot re-derive the figure is a
   * control that lies, so the frame shows none.
   */
  controls?: ExplainerControl[]
}

/**
 * What a scene declares about being re-derivable. `kind` names a pure builder
 * in `parametricScenes.ts`; `params` is that builder's own parameter object.
 * The client re-runs the SAME function the server used, so a figure the
 * learner has adjusted is exactly as trustworthy as the one they were given.
 */
export interface SceneParametric {
  kind: string
  /** Numbers for continuous quantities, names for discrete cases. */
  params: Record<string, number | string>
}

// ── derivation ───────────────────────────────────────────────────────────────

/** Human-readable names for the semantic roles, used only as a last resort. */
const ROLE_NAME: Record<Role, string> = {
  reference: 'Reference geometry',
  ink: 'Labels',
  input: 'Applied / incoming quantity',
  output: 'Resulting / outgoing quantity',
  aid: 'Construction aid',
  result: 'Result',
}

/** Objects that carry geometry a legend row can describe. */
const DRAWN_TYPES = new Set(['vector', 'arrow', 'bond', 'path', 'trajectory', 'node', 'point', 'particle', 'bar'])

function swatchShape(type: string): ExplainerSwatch['shape'] {
  if (type === 'vector' || type === 'arrow') return 'arrow'
  if (type === 'node' || type === 'point' || type === 'particle') return 'dot'
  return 'line'
}

/**
 * "torqueLabel" / "force-vector" / "bond0" → "Torque label" / "Force vector" /
 * "Bond".
 *
 * The trailing index is dropped because scene ids are frequently
 * `<thing><n>` — a counter, not a name. MEASURED in the browser: the water
 * molecule's legend read "Bond0", which tells a learner nothing and looks like
 * a bug. One bond is being named on behalf of all of them, so the plain noun is
 * both shorter and more truthful.
 */
export function humanizeId(id: string): string {
  const words = id
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/[-_]+/g, ' ')
    .replace(/([a-zA-Z]{2,})\d+$/, '$1')
    .trim()
    .toLowerCase()
  if (!words) return ''
  return words.charAt(0).toUpperCase() + words.slice(1)
}

/**
 * Split a generator title into a name and its givens.
 *
 * Generators title their scenes "Torque: r=2 m, F=10 N, θ=90°" — a name, a
 * colon, then the parameters. That is exactly the header the reference layout
 * wants, already authored, so it is read rather than re-derived. A title with
 * no colon is a name with no givens.
 */
export function splitTitle(title: string): { name: string; givens?: string } {
  const at = title.indexOf(':')
  if (at < 0) return { name: title.trim() }
  const name = title.slice(0, at).trim()
  const givens = title.slice(at + 1).trim()
  if (!name || !givens) return { name: title.trim() }
  return { name, givens }
}

/** True for text that states a relationship — the shape of a formula line. */
function looksLikeFormula(text: string): boolean {
  return /[=≈≠<>]/.test(text) && /[\d)]/.test(text)
}

/**
 * The headline result.
 *
 * Preference order is deliberate: a label the author coloured `result` is an
 * explicit statement of the answer; a label whose text reads as a formula is
 * the next-best evidence; a final-step narration containing a relationship is
 * the fallback. Nothing is computed here — if the scene never states a result,
 * the frame shows none.
 */
function deriveResult(objects: SceneObject[], narrations: string[]): ExplainerResult | undefined {
  const labels = objects.filter((o) => o.type === 'label' && typeof o.text === 'string' && o.text.trim())

  const explicit =
    labels.find((o) => roleOf(o.color) === 'result' && looksLikeFormula(o.text!)) ??
    labels.find((o) => looksLikeFormula(o.text!))

  const text = explicit?.text?.trim() ?? narrations.filter(looksLikeFormula).pop()?.trim()
  if (!text) return undefined

  // "τ = 20 N·m, counter-clockwise" → expression "τ =", value "20 N·m, …".
  // Split at the LAST '=' so a multi-step derivation keeps its left side whole.
  const at = text.lastIndexOf('=')
  if (at < 0) return { expression: text.slice(0, 120) }
  const expression = text.slice(0, at + 1).trim()
  const value = text.slice(at + 1).trim()
  return value ? { expression: expression.slice(0, 120), value: value.slice(0, 60) } : { expression: expression.slice(0, 120) }
}

/**
 * An id is a NAME only when it reads as one. `orbit`, `collision-point`,
 * `pVector` and `bond0` (trailing counter dropped by `humanizeId`) name what
 * they draw, and so does `male-0` or `resistor-0` — the nth member of a family
 * whose noun IS its name. `spoke-line-0`, `group-1-line-2`, `stage-1-arrow` and
 * `branch-start-a-arrow` are handles a generator numbered its objects with.
 * MEASURED in the browser: the Biology hub's legend read "Spoke line 0" and the
 * five-kingdom figure's "Group 0 line 0" — internal ids shown to a learner as
 * if they meant something. So: a single noun with a counter keeps the noun;
 * anything else still carrying a digit is a handle, and so is an id with a
 * one-letter word anywhere but first (a branch letter, where a leading one is
 * a symbol — the dipole moment `p` in "P vector"). A handle never becomes a
 * label.
 */
export function nameFromId(id: string | undefined): string {
  if (!id) return ''
  const name = humanizeId(id)
  if (!name) return ''
  const counted = name.match(/^([A-Za-z]{2,}) \d+$/)
  if (counted) return counted[1]
  if (/\d/.test(name)) return ''
  return name.split(/\s+/).every((word, i) => i === 0 || word.length >= 2) ? name : ''
}

/** Distinct values, first-seen order. */
function distinct(values: string[]): string[] {
  return [...new Set(values.filter(Boolean))]
}

const LEGEND_LABEL_MAX = 64

/**
 * Several names on one row: as many as fit, then an honest count of the rest —
 * "Botany, Zoology, Microbiology +3 more". A row that silently named one of
 * six would claim the other five were something else.
 */
function listLabel(names: string[]): string {
  if (names.length === 1) return names[0].slice(0, LEGEND_LABEL_MAX)
  let label = names[0].slice(0, LEGEND_LABEL_MAX)
  let shown = 1
  for (const name of names.slice(1)) {
    const rest = names.length - shown - 1
    const suffix = rest > 0 ? ` +${rest} more` : ''
    if ((label + ', ' + name + suffix).length > LEGEND_LABEL_MAX) break
    label += ', ' + name
    shown++
  }
  const hidden = names.length - shown
  return hidden > 0 ? `${label} +${hidden} more` : label
}

/**
 * The colour legend.
 *
 * One row per distinct colour that is actually drawn — the row is also the
 * figure's focus control, which isolates a colour, so a colour is the unit.
 * The row is named for EVERY object drawn in that colour, not the first one
 * met: MEASURED in the browser, the Biology hub's six blue branches all read
 * "Botany" because Botany happened to be drawn first. So the name is, in order
 * of evidence: the objects' own captions (all of them, when they differ),
 * else their ids where an id reads as a name (see `nameFromId`), else the
 * semantic role the palette assigns that colour. A colour with none of these
 * — a plain connector a generator numbered but never named — has no row: the
 * figure shows what it joins, and a row naming its id would teach a handle.
 * Rows whose colour carries no meaning (the neutral ink used for plain labels)
 * are dropped too — a legend entry reading "Labels" teaches nothing.
 */
function deriveLegend(objects: SceneObject[]): ExplainerSwatch[] {
  const byColor = new Map<string, SceneObject[]>()

  for (const obj of objects) {
    if (!DRAWN_TYPES.has(obj.type)) continue
    const color = obj.color
    if (!color) continue
    if (roleOf(color) === 'ink') continue
    const group = byColor.get(color)
    if (group) group.push(obj)
    else byColor.set(color, [obj])
  }

  const rows: ExplainerSwatch[] = []
  for (const [color, group] of byColor) {
    const captioned = group.filter((o) => typeof o.text === 'string' && o.text.trim())
    const captions = distinct(captioned.map((o) => o.text!.trim()))
    // An id is weaker evidence than a caption, so ids name a colour only when
    // they name ALL of it: the cell cycle's "cycle-return" arrow shares its
    // colour with arrows numbered `stage-1-arrow`…, and naming the colour
    // "Cycle return" would caption those arrows too.
    const idNamed = group.every((o) => nameFromId(o.id)) ? group : []
    const idNames = distinct(idNamed.map((o) => nameFromId(o.id)))
    // The palette's role name is for objects a generator never named at all.
    // A group whose ids are all handles has been named — badly — so it gets no
    // row rather than a generic one: MEASURED, falling back to the role there
    // captioned a circuit's resistors "Resulting / outgoing quantity".
    const role = group.some((o) => o.id) ? null : roleOf(color)

    // The swatch is drawn like the objects the row is named for.
    const [names, namedBy] = captions.length
      ? [captions, captioned]
      : idNames.length
        ? [idNames, idNamed]
        : [role ? [ROLE_NAME[role]] : [], group]
    if (!names.length) continue

    rows.push({ label: listLabel(names), color, shape: swatchShape(namedBy[0].type) })
  }

  // A one-row legend explains nothing the figure does not already show.
  return rows.length >= 2 ? rows.slice(0, 6) : []
}

/** A narration as a sentence: terminal punctuation added only when it has none. */
function asSentence(text: string): string {
  return /[.!?…:;]["'”’)\]]*$/.test(text) ? text : `${text}.`
}

/**
 * The panel's length budget, spent in whole lines. It used to be a bare
 * `slice(0, 600)`, which cut six deterministic figures mid-sentence (DNA
 * replication, meiosis, viscosity, levels of organisation, evidence for
 * evolution, surface tension). A line that would overrun is dropped whole;
 * 1000 fits every deterministic figure's narration today (longest 925 chars,
 * bio.mol.dna-replication).
 */
const PANEL_CHARS = 1000
function fitWholeLines(text: string, max = PANEL_CHARS): string {
  if (text.length <= max) return text
  let out = ''
  for (const line of text.split('\n')) {
    const next = out ? `${out}\n${line}` : line
    if (next.length > max) break
    out = next
  }
  return out || text.slice(0, max)
}

/**
 * The explanation rail.
 *
 * "What's happening?" is the scene's own narration — the sentences its author
 * wrote for each beat, which until now were only reachable by clicking through
 * the step controls. The formula panel collects the relationship lines out of
 * that same narration, so a derivation the author staged across three steps is
 * readable at a glance.
 */
function derivePanels(spec: SceneSpec, narrations: string[]): ExplainerPanel[] {
  const panels: ExplainerPanel[] = []

  const prose = narrations.filter((n) => !looksLikeFormula(n))
  const formulas = narrations.filter(looksLikeFormula)

  // One step per line, each a finished sentence. They used to be joined with a
  // bare space, and MEASURED in the browser that ran the steps together — "Biology
  // Botany: the study of plants Zoology: the study of animals …" — because a
  // generator's narrations are often labelled clauses with no full stop. A stop
  // is added only where the author left none, and nothing else is changed.
  const happening = prose.map(asSentence).join('\n').trim() || spec.teachingGoal?.trim() || ''
  if (happening) {
    panels.push({ heading: "What's happening?", body: fitWholeLines(happening) })
  }

  if (formulas.length) {
    // The last line of a derivation is the answer; emphasise it.
    const lines = formulas.map((f) => f.slice(0, 160))
    panels.push({ heading: 'Working', lines, emphasis: lines[lines.length - 1] })
  }

  return panels
}

/**
 * The key insight.
 *
 * The teaching goal is what the author said the figure is FOR, so it is the
 * honest source for "what to take away". It is shown whole as the note; the
 * bullets come from the goal's own clauses when it states several, which is
 * how the generators write them ("Show how torque depends on the lever-arm
 * length, the applied force, and the angle between them").
 */
function deriveInsight(spec: SceneSpec): ExplainerInsight | undefined {
  const goal = spec.teachingGoal?.trim()
  if (!goal) return undefined

  const colon = goal.indexOf(':')
  const head = colon > 0 ? goal.slice(0, colon).trim() : goal
  const tail = colon > 0 ? goal.slice(colon + 1).trim() : ''

  // "…depends on A, B, and C" is a list the learner can read as bullets.
  const listMatch = head.match(/\b(?:depends on|shows how|relates)\b(.+)$/i)
  const bullets = listMatch
    ? listMatch[1]
        .split(/,\s*(?:and\s+)?|\s+and\s+/)
        .map((s) => s.replace(/[.;]$/, '').trim())
        .filter((s) => s.length > 2)
        .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
        .slice(0, 5)
    : []

  if (bullets.length >= 2) {
    return { heading: 'Key insight', bullets, note: tail || undefined }
  }
  return { heading: 'Key insight', bullets: [], note: goal }
}

/** Merge an authored explainer over a derived one, field by field. */
function mergeExplainer(derived: ExplainerSpec, authored?: Partial<ExplainerSpec>): ExplainerSpec {
  if (!authored) return derived
  return {
    title: authored.title ?? derived.title,
    givens: authored.givens ?? derived.givens,
    result: authored.result ?? derived.result,
    legend: authored.legend?.length ? authored.legend : derived.legend,
    panels: authored.panels?.length ? authored.panels : derived.panels,
    insight: authored.insight ?? derived.insight,
    controls: authored.controls?.length ? authored.controls : derived.controls,
  }
}

/**
 * Build the teaching frame for any scene.
 *
 * Total, and total by design: every figure gets a frame, because a figure that
 * silently opted out would be the one a learner meets with no way in. Where a
 * scene declares little, the frame is small — a title and a stage — which is
 * exactly what the figure was before this existed.
 */
export function deriveExplainer(spec: SceneSpec): ExplainerSpec {
  const objects = spec.steps.flatMap((s) => s.objects)
  const narrations = spec.steps.map((s) => s.narration?.trim() ?? '').filter(Boolean)
  const { name, givens } = splitTitle(spec.title)

  const derived: ExplainerSpec = {
    title: name,
    givens,
    result: deriveResult(objects, narrations),
    legend: deriveLegend(objects),
    panels: derivePanels(spec, narrations),
    insight: deriveInsight(spec),
  }

  return mergeExplainer(derived, spec.explainer)
}

/** The palette a frame paints its own chrome from, so it matches the stage. */
export const FRAME_ACCENT = ROLE.result
