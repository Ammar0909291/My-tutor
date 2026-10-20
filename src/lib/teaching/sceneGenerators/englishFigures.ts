/**
 * englishFigures — three English figures drawn from the shapes the concepts' own teaching assets ask for.
 *
 * Each concept's teaching asset (`docs/english/teaching-assets/assets.json`, `visual_teaching_suggestions`) names the figure it wants. Until
 * 2026-10-20 none was drawn: the learner was served a generated process flowchart or, on the first ask, "I don't have a picture for this one".
 *
 *   eng.literature.meter-and-rhyme            "A five-foot reference strip (iamb, trochee, anapest, dactyl, spondee) with a natural two-word English example and a beat diagram for each"
 *   eng.linguistics.sociolinguistics-intro    "A style-shifting line graph: -in' percentage across the three recording settings"
 *   eng.linguistics.discourse-analysis-intro  "A two-axis grid (cohesion × coherence) with a passage specimen pinned in each quadrant, making the dissociation a visible space"
 *
 * Faithfulness policy (as for eng.grammar.nouns): every word on a figure is one the concept's own asset or Educational Brain entry uses, every
 * claim is one they make, and a number appears only if a source states it. The style-shifting graph shows the ORDER the asset states (highest at the
 * gate, lower with the officer, lowest reading aloud) — not measured values, which the asset does not give — and says so.
 *
 * THE CONSISTENCY GUARANTEE. What each figure claims is derived from where its parts are drawn: the stressed beats of a foot are the large dots and
 * the unstressed the small ones, so the pattern a row spells is read back from the drawn radii; the points of the style-shifting graph must rise in
 * the stated order and stay strictly between the 0 % and 100 % lines; the specimens sit in the quadrant the concept assigns them.
 *
 * Pure: no network, no LLM, no randomness — reached only through `conceptSceneParams.ts`.
 */

import type { SceneObject, SceneSpec, Vec3 } from '../sceneSpec'
import { ROLE, arrow, dot, label, line } from './visualDesign'
import type { ConsistencyResult } from './shared'

// ───────────────────────── 1. meter: the five feet ─────────────────────────

export interface Foot { name: string; pattern: ReadonlyArray<'u' | 's'>; example: string }
/** The five feet and a natural English example of each (the teaching asset's own); u = unstressed (×), s = stressed (/). */
export const FEET: readonly Foot[] = [
  { name: 'iamb',    pattern: ['u', 's'],      example: 'the WELL' },
  { name: 'trochee', pattern: ['s', 'u'],      example: 'WA-ter' },
  { name: 'anapest', pattern: ['u', 'u', 's'], example: 'in the NIGHT' },
  { name: 'dactyl',  pattern: ['s', 'u', 'u'], example: 'MUR-mur-ing' },
  { name: 'spondee', pattern: ['s', 's'],      example: 'STONE WALL' },
]
export const R_STRESSED = 0.42
export const R_UNSTRESSED = 0.15
const ROW_Y = [4.8, 2.4, 0, -2.4, -4.8]
const BEAT_X0 = -6.4, BEAT_DX = 1.4

export const beatPosition = (row: number, beat: number): Vec3 => [BEAT_X0 + beat * BEAT_DX, ROW_Y[row], 0]

function footRow(row: number): SceneObject[] {
  const f = FEET[row]
  const marks = f.pattern.map((p, i) => dot(beatPosition(row, i), p === 's' ? ROLE.input : ROLE.reference, p === 's' ? R_STRESSED : R_UNSTRESSED))
  const glyphs = f.pattern.map((p, i) => label(p === 's' ? '/' : '×', [BEAT_X0 + i * BEAT_DX, ROW_Y[row] - 0.95, 0], p === 's' ? ROLE.input : ROLE.reference, 'detail'))
  return [
    ...marks, ...glyphs,
    label(`${f.name}: ${f.example}`, [5.2, ROW_Y[row], 0], ROLE.output, 'detail'),
  ]
}

export function buildFeetScene(): SceneSpec {
  return {
    id: 'meter-five-feet',
    title: 'Meter: The Five Feet',
    sceneType: 'diagram',
    teachingGoal: 'A foot is a pattern of stressed and unstressed syllables: iamb (× /), trochee (/ ×), anapest (× × /), dactyl (/ × ×) and spondee (/ /). Meter is the dominant pattern across a poem; rhyme is a separate pattern of end sounds.',
    cameraDistance: 24,
    ariaLabel: 'Five rows, one per foot. Each shows its beats as dots: a large dot is a stressed syllable and a small dot an unstressed one. Iamb: small then large, as in "the WELL". Trochee: large then small, "WA-ter". Anapest: two small then large, "in the NIGHT". Dactyl: large then two small, "MUR-mur-ing". Spondee: two large, "STONE WALL".',
    stage: { grid: false, axes: false },
    steps: [
      { narration: 'Scansion marks each syllable as heard in natural English stress: a stressed syllable (/, the large dot) or an unstressed one (×, the small dot). The iamb (× /) and the trochee (/ ×) are the two-syllable feet.', objects: [...footRow(0), ...footRow(1)], intent: 'establish' },
      { narration: 'The anapest (× × /) and the dactyl (/ × ×) have three syllables: two unstressed and one stressed, the stress last in the anapest and first in the dactyl.', objects: [...footRow(2), ...footRow(3)], intent: 'relate' },
      { narration: 'The spondee (/ /) has two stressed syllables. Iambic pentameter is five iambs to the line. Meter is the dominant pattern across a poem: rhyme, the pattern of end sounds, is a separate thing.', objects: footRow(4), intent: 'resolve' },
    ],
  }
}

/** The stress pattern a row spells, read back from the DRAWN dot sizes (left to right). */
export function drawnPattern(spec: SceneSpec, row: number): string {
  const y = ROW_Y[row]
  return spec.steps.flatMap((s) => s.objects).filter((o) => o.type === 'node' && o.position && Math.abs(o.position[1] - y) < 1e-6)
    .sort((a, b) => a.position![0] - b.position![0]).map((o) => ((o.radius ?? 0) > (R_STRESSED + R_UNSTRESSED) / 2 ? '/' : '×')).join(' ')
}
export const footPatternText = (f: Foot) => f.pattern.map((p) => (p === 's' ? '/' : '×')).join(' ')

export function checkFeetConsistency(spec: SceneSpec): ConsistencyResult {
  const errors: string[] = []
  FEET.forEach((f, i) => { if (drawnPattern(spec, i) !== footPatternText(f)) errors.push(`${f.name}: drawn ${drawnPattern(spec, i)}, expected ${footPatternText(f)}`) })
  const text = spec.steps.flatMap((s) => s.objects).map((o) => o.text ?? '')
  for (const f of FEET) if (!text.includes(`${f.name}: ${f.example}`)) errors.push(`the figure is missing "${f.name}: ${f.example}"`)
  // an example word's capitalised syllables are its stressed beats
  for (const f of FEET) {
    const stressed = (f.example.match(/\b[A-Z]{2,}\b/g) ?? []).length
    if (stressed !== f.pattern.filter((p) => p === 's').length) errors.push(`${f.name}: the example has ${stressed} stressed syllables, the pattern ${f.pattern.filter((p) => p === 's').length}`)
  }
  return { ok: errors.length === 0, errors }
}

// ───────────────────────── 2. sociolinguistics: style-shifting ─────────────────────────

/** Settings in the order drawn (left to right) and the order of the asset's finding: lowest reading aloud, lower with the officer than at the gate, highest at the gate. */
export const SETTINGS = ['reading aloud', 'with the officer', 'at the gate'] as const
export const RATE: readonly number[] = [1.4, 3.0, 5.0]     // scene heights: the ORDER is the claim, not the values
export const Y_FLOOR = 0, Y_CEIL = 6.4                       // the 0 % and 100 % lines
const SX = [-4.8, -0.6, 3.6]
const GRAPH_Y0 = -3

export const pointOf = (i: number): Vec3 => [SX[i], GRAPH_Y0 + RATE[i], 0]

export function buildStyleShiftScene(): SceneSpec {
  const frame: SceneObject[] = [
    arrow([-7.4, GRAPH_Y0, 0], [-7.4, GRAPH_Y0 + 7.6, 0], ROLE.reference),
    line([-7.4, GRAPH_Y0 + Y_CEIL, 0], [8.2, GRAPH_Y0 + Y_CEIL, 0], ROLE.reference, 0.025),
    arrow([-7.4, GRAPH_Y0, 0], [8.6, GRAPH_Y0, 0], ROLE.reference),
    label('setting', [8.4, GRAPH_Y0 - 0.9, 0], ROLE.ink, 'detail'),
    label("-in' rate", [-6.2, GRAPH_Y0 + 7.9, 0], ROLE.ink, 'detail'),
    label('100%', [-8.3, GRAPH_Y0 + Y_CEIL, 0], ROLE.reference, 'detail'),
    label('0%', [-8.3, GRAPH_Y0, 0], ROLE.reference, 'detail'),
  ]
  const settings = SETTINGS.map((s, i) => label(s, [SX[i], GRAPH_Y0 - 1.1, 0], ROLE.output, 'detail'))
  const points = RATE.map((_, i) => dot(pointOf(i), ROLE.result, 0.26))
  const joins = [0, 1].map((i) => line(pointOf(i), pointOf(i + 1), ROLE.result, 0.07))
  return {
    id: 'sociolinguistics-style-shifting',
    title: "Style-Shifting: Amara's -in' Rate by Setting",
    sceneType: 'plot',
    teachingGoal: "A speaker commands both variants and uses them by situation: the -in' rate is highest at the gate, lower with the officer and lowest reading aloud, and no setting is at 0% or 100%: frequencies, not switches, carry the signal.",
    cameraDistance: 21,
    ariaLabel: "A line graph of the -in' rate in three recording settings, from 0% at the bottom to 100% at the top. The point for reading aloud is lowest, with the officer higher, and at the gate highest. All three lie strictly between the 0% and 100% lines.",
    stage: { grid: false, axes: false },
    steps: [
      { narration: "A sociolinguistic variable is a feature with countable variants, such as -ing or -in' (locking and lockin'). The researcher counts how often Amara uses -in' in three settings: reading the notice aloud, negotiating with the district water officer, and talking with Tesfay at the gate.", objects: [...frame, ...settings], intent: 'establish' },
      { narration: "The rate is highest at the gate, lower with the officer and lowest reading aloud: style-shifting along the attention to speech. The figure shows this order, not measured values.", objects: [...joins, ...points], intent: 'relate' },
      { narration: 'No setting is at 0% or 100%: frequencies, not switches, carry the signal. Amara commands both variants and uses them by situation, a repertoire, not a deficiency.', objects: [label('frequencies, not switches', [0.4, GRAPH_Y0 + Y_CEIL + 1.5, 0], ROLE.result, 'primary')], intent: 'resolve' },
    ],
  }
}

export function checkStyleShiftConsistency(spec: SceneSpec): ConsistencyResult {
  const errors: string[] = []
  const nodes = spec.steps.flatMap((s) => s.objects).filter((o) => o.type === 'node' && o.position).sort((a, b) => a.position![0] - b.position![0])
  if (nodes.length !== 3) return { ok: false, errors: [`expected three points, found ${nodes.length}`] }
  const ys = nodes.map((n) => n.position![1])
  if (!(ys[0] < ys[1] && ys[1] < ys[2])) errors.push('the points do not rise reading aloud < with the officer < at the gate')
  if (ys.some((y) => y <= GRAPH_Y0 + Y_FLOOR || y >= GRAPH_Y0 + Y_CEIL)) errors.push('a point sits on or beyond the 0% / 100% line: that would be a switch, not a frequency')
  const text = spec.steps.flatMap((s) => s.objects).map((o) => o.text ?? '')
  for (const need of ['reading aloud', 'with the officer', 'at the gate', '0%', '100%', "-in' rate", 'setting']) if (!text.includes(need)) errors.push(`the figure is missing "${need}"`)
  const settingsX = SETTINGS.map((s) => spec.steps.flatMap((st) => st.objects).find((o) => o.text === s)?.position?.[0])
  if (settingsX.some((x, i) => x === undefined || Math.abs(x - nodes[i].position![0]) > 1e-6)) errors.push('a setting label is not under its own point')
  return { ok: errors.length === 0, errors }
}

// ───────────────────────── 3. discourse: cohesion × coherence ─────────────────────────

/** Origin (bottom-left) of the grid and its size; x = cohesion (visible ties, few to many), y = coherence (sense, little to full). The midlines split it into quadrants. */
export const GRID = { ox: -6.4, oy: -4.2, w: 12.4, h: 8.8 } as const
export const MID = { x: GRID.ox + GRID.w / 2, y: GRID.oy + GRID.h / 2 } as const
export interface Specimen { id: string; lines: readonly string[]; cohesion: 'high' | 'low'; coherence: 'high' | 'low'; pos: Vec3 }
/** The specimens the concept itself uses: a text with few ties that makes full sense, and a text with every tie kept and the propositions scrambled. */
export const SPECIMENS: readonly Specimen[] = [
  { id: 'gate', lines: ['The gate stood open.', 'Nobody came.'], cohesion: 'low', coherence: 'high', pos: [GRID.ox + GRID.w * 0.25, GRID.oy + GRID.h * 0.72, 0] },
  { id: 'ties', lines: ['every tie kept,', 'sentences scrambled'], cohesion: 'high', coherence: 'low', pos: [GRID.ox + GRID.w * 0.75, GRID.oy + GRID.h * 0.28, 0] },
]

export function buildCohesionCoherenceScene(): SceneSpec {
  const { ox, oy, w, h } = GRID
  const axes: SceneObject[] = [
    arrow([ox, oy, 0], [ox + w + 0.6, oy, 0], ROLE.reference),
    arrow([ox, oy, 0], [ox, oy + h + 0.6, 0], ROLE.reference),
    line([MID.x, oy, 0], [MID.x, oy + h, 0], ROLE.reference, 0.02),
    line([ox, MID.y, 0], [ox + w, MID.y, 0], ROLE.reference, 0.02),
    label('cohesion', [ox + w - 1.4, oy - 0.9, 0], ROLE.output, 'primary'),
    label('coherence', [ox + 1.9, oy + h + 1.0, 0], ROLE.input, 'primary'),
  ]
  const pin = (sp: Specimen) => [dot(sp.pos, ROLE.result, 0.26), ...sp.lines.map((t, i) => label(t, [sp.pos[0], sp.pos[1] - 0.95 - i * 0.85, 0], ROLE.result, 'detail'))]
  return {
    id: 'discourse-cohesion-coherence',
    title: 'Cohesion and Coherence Are Separate',
    sceneType: 'plot',
    teachingGoal: 'Cohesion (the visible ties between sentences) and coherence (a text actually making sense) are separate properties and the two dissociate in both directions.',
    cameraDistance: 21,
    ariaLabel: 'A two-axis grid: cohesion, the visible ties, runs left to right and coherence, the sense, runs bottom to top. A text with few ties that makes full sense, "The gate stood open. Nobody came.", sits at upper left. A text with every tie kept but the sentences scrambled sits at lower right.',
    stage: { grid: false, axes: false },
    steps: [
      { narration: 'Cohesion is the visible wiring between sentences: reference chains (Amara ... she ... her), conjunction (however, meanwhile) and lexical repetition (well, water, drought). Coherence is the underlying sense that makes a text about something. Two separate axes.', objects: axes, intent: 'establish' },
      { narration: 'Coherence without cohesion: "The gate stood open. Nobody came." has no tie between its sentences, yet it makes full sense, supplied by the reader.', objects: pin(SPECIMENS[0]), intent: 'relate' },
      { narration: 'Cohesion without coherence: keep every tie (the pronouns and conjunctions) but scramble the sentences, and the text is wired together and makes no sense. Counting linking words does not show that a text makes sense.', objects: pin(SPECIMENS[1]), intent: 'resolve' },
    ],
  }
}

export function checkCohesionCoherenceConsistency(spec: SceneSpec): ConsistencyResult {
  const errors: string[] = []
  const objects = spec.steps.flatMap((s) => s.objects)
  const nodes = objects.filter((o) => o.type === 'node' && o.position)
  for (const sp of SPECIMENS) {
    const n = nodes.find((o) => Math.hypot(o.position![0] - sp.pos[0], o.position![1] - sp.pos[1]) < 1e-6)
    if (!n) { errors.push(`the specimen "${sp.id}" is not drawn`); continue }
    const right = n.position![0] > MID.x, up = n.position![1] > MID.y
    if ((sp.cohesion === 'high') !== right) errors.push(`"${sp.id}" is on the wrong side of the cohesion axis`)
    if ((sp.coherence === 'high') !== up) errors.push(`"${sp.id}" is on the wrong side of the coherence axis`)
    for (const t of sp.lines) if (!objects.some((o) => o.type === 'label' && o.text === t)) errors.push(`the specimen text "${t}" is not written beside its point`)
  }
  const text = objects.map((o) => o.text ?? '')
  for (const need of ['cohesion', 'coherence']) if (!text.includes(need)) errors.push(`the figure is missing "${need}"`)
  return { ok: errors.length === 0, errors }
}
