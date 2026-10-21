/**
 * englishStyleFigure — `eng.composition.style-voice-and-tone` drawn as the figure its teaching asset asks for.
 *
 * The concept served no figure (learner run, 2026-10-21: a learner who asked for a diagram was told there was none, and the repair
 * answered in words). Its teaching asset (`docs/english/teaching-assets/assets.json`, `visual_teaching_suggestions`) names two figures:
 *
 *   "A three-layer diagram: STYLE (observable choices) → projects → VOICE (persistent identity), with TONE as a per-piece dial on the side"
 *   "A traceability table: stylistic effect (urgent / reflective / blunt / formal) ← the concrete choices producing it (sentence length, subordination, diction stratum)"
 *
 * This draws both, the second as two of its rows (the ones the asset states in its key ideas: short declaratives read urgent, long subordinated
 * sentences read reflective). Faithfulness policy as for the other English figures: every word is one the concept's own asset or Educational
 * Brain entry uses, every claim is one they make, and there is no number.
 *
 * THE CONSISTENCY GUARANTEE. `checkStyleVoiceToneConsistency` re-derives from the drawn geometry that STYLE sits above VOICE with the
 * projecting arrow running from the first down to the second, that the tone dial's pointer lies inside its ring (a dial, not a stray line), that
 * each choice is written at the tail of its arrow and the effect it produces at the head, and that both pairs are the asset's own.
 *
 * Pure: no network, no LLM, no randomness — reached only through `conceptSceneParams.ts`.
 */

import type { SceneObject, SceneSpec, Vec3 } from '../sceneSpec'
import { ROLE, arrow, curve, dot, label, line } from './visualDesign'
import { round, type ConsistencyResult } from './shared'

/** The two layers are stacked on one centre line: STYLE above VOICE, the projecting arrow running down between them. */
export const STYLE_AT: Vec3 = [0, 8.2, 0]
export const VOICE_AT: Vec3 = [0, 3.2, 0]
const BAR_HALF = 6
/** The tone dial: a ring and a pointer, with its name beside it. */
export const DIAL = { c: [-6.4, -1.2, 0] as Vec3, r: 1.8, angle: 50 } as const
/** The two traceability rows: a choice → the effect it produces. */
export const TRACES = [
  { choice: 'short declaratives', effect: 'urgent', y: -5.2, choiceX: -5.5, arrow: [-0.6, 1.6] as const, effectX: 4.2 },
  { choice: 'long subordinated sentences', effect: 'reflective', y: -8.0, choiceX: -4.5, arrow: [3.0, 4.8] as const, effectX: 8.6 },
] as const

const STYLE_LABEL = 'STYLE: observable choices'
const VOICE_LABEL = 'VOICE: persistent identity'
const TONE_LABEL = 'TONE: varies by piece'

function ring(): Vec3[] {
  const pts: Vec3[] = []
  const n = 48
  for (let i = 0; i <= n; i++) {
    const t = (2 * Math.PI * i) / n
    pts.push([round(DIAL.c[0] + DIAL.r * Math.cos(t)), round(DIAL.c[1] + DIAL.r * Math.sin(t)), 0])
  }
  return pts
}
export const pointerEnd = (): Vec3 => {
  const a = (DIAL.angle * Math.PI) / 180
  return [round(DIAL.c[0] + DIAL.r * 0.8 * Math.cos(a)), round(DIAL.c[1] + DIAL.r * 0.8 * Math.sin(a)), 0]
}

export function buildStyleVoiceToneScene(): SceneSpec {
  const layers: SceneObject[] = [
    label(STYLE_LABEL, STYLE_AT, ROLE.output, 'detail'),
    line([-BAR_HALF, STYLE_AT[1] - 1.05, 0], [BAR_HALF, STYLE_AT[1] - 1.05, 0], ROLE.output, 0.16),
    arrow([0, STYLE_AT[1] - 1.5, 0], [0, VOICE_AT[1] + 1.1, 0], ROLE.ink),
    label('projects', [3.4, (STYLE_AT[1] + VOICE_AT[1]) / 2, 0], ROLE.ink, 'detail'),
    label(VOICE_LABEL, VOICE_AT, ROLE.result, 'detail'),
    line([-BAR_HALF, VOICE_AT[1] - 1.05, 0], [BAR_HALF, VOICE_AT[1] - 1.05, 0], ROLE.result, 0.16),
  ]
  const dial: SceneObject[] = [
    curve(ring(), ROLE.aid),
    line(DIAL.c, pointerEnd(), ROLE.aid, 0.16),
    dot(DIAL.c, ROLE.aid, 0.14),
    label(TONE_LABEL, [DIAL.c[0] + 8.8, DIAL.c[1], 0], ROLE.aid, 'detail'),
  ]
  const traces: SceneObject[] = TRACES.flatMap((t) => [
    label(t.choice, [t.choiceX, t.y, 0], ROLE.input, 'detail'),
    arrow([t.arrow[0], t.y, 0], [t.arrow[1], t.y, 0], ROLE.reference),
    label(t.effect, [t.effectX, t.y, 0], ROLE.result, 'detail'),
  ])
  return {
    id: 'style-voice-tone',
    title: 'Style, Voice and Tone',
    sceneType: 'diagram',
    teachingGoal: 'Style is the observable pattern of choices, voice is the identity those choices project across pieces, and tone is the attitude toward one subject in one piece: voice persists, tone varies, and every effect traces to concrete choices.',
    cameraDistance: 22,
    ariaLabel: 'A three-layer diagram: STYLE, the observable choices, with an arrow down labelled projects to VOICE, the persistent identity, and a tone dial beside them that varies by piece. Below, two rows trace an effect to the choices that produce it: short declaratives produce an urgent effect, long subordinated sentences a reflective one.',
    stage: { grid: false, axes: false },
    steps: [
      { narration: 'Three terms divide the work. STYLE is the observable pattern of choices: diction, sentence length and rhythm, figures. Those patterns project VOICE, the recognizable identity of the writer across pieces.', objects: layers, intent: 'establish' },
      { narration: 'TONE is the attitude toward this subject in this piece: a dial the writer sets for each piece. Voice persists, tone varies.', objects: dial, intent: 'relate' },
      { narration: 'Every stylistic effect traces to concrete choices. Short declaratives read urgent; long subordinated sentences read reflective. One event can be reported in short declaratives or in long subordinated sentences, and the style itself changes what the reader feels about it.', objects: traces, intent: 'resolve' },
    ],
  }
}

const near = (a: number, b: number) => Math.abs(a - b) < 1e-6

export function checkStyleVoiceToneConsistency(spec: SceneSpec): ConsistencyResult {
  const errors: string[] = []
  const objects = spec.steps.flatMap((s) => s.objects)
  const labels = objects.filter((o) => o.type === 'label')
  const labelAt = (text: string) => labels.find((o) => o.text === text)

  // Layers: STYLE is written above VOICE on one centre line, and the projecting arrow runs from just below STYLE down to just above VOICE.
  const styleL = labelAt(STYLE_LABEL), voiceL = labelAt(VOICE_LABEL)
  for (const t of [STYLE_LABEL, VOICE_LABEL, TONE_LABEL, 'projects']) if (!labelAt(t)) errors.push(`the figure is missing the label "${t}"`)
  if (styleL && voiceL) {
    if (!(styleL.position![1] > voiceL.position![1])) errors.push('STYLE is not above VOICE')
    if (!near(styleL.position![0], voiceL.position![0])) errors.push('STYLE and VOICE are not on one centre line')
    const down = objects.find((o) => o.type === 'arrow' && o.from && o.to && near(o.from[0], styleL.position![0]) && near(o.to[0], styleL.position![0]) && o.from[1] < styleL.position![1] && o.from[1] > voiceL.position![1] && o.to[1] > voiceL.position![1] && o.to[1] < o.from[1])
    if (!down) errors.push('no arrow projects from STYLE down to VOICE')
  }

  // Dial: a ring (dense path) with the pointer inside it.
  const ringPath = objects.find((o) => o.type === 'path' && o.points && o.points.length >= 24)
  const pointer = objects.find((o) => o.type === 'bond' && o.from && o.to && near(o.from[0], DIAL.c[0]) && near(o.from[1], DIAL.c[1]))
  if (!ringPath) errors.push('the tone dial has no ring')
  if (!pointer) errors.push('the tone dial has no pointer')
  else {
    const len = Math.hypot(pointer.to![0] - DIAL.c[0], pointer.to![1] - DIAL.c[1])
    if (!(len > 0.3 * DIAL.r && len < DIAL.r)) errors.push('the dial pointer does not lie inside its ring')
  }
  if (labelAt(TONE_LABEL) && (labelAt(TONE_LABEL)!.position![1] < DIAL.c[1] - 0.5 || labelAt(TONE_LABEL)!.position![1] > DIAL.c[1] + 0.5)) errors.push('the TONE label is not beside its dial')

  // Traces: choice at the tail of its arrow, effect at the head, on one line; the pairs are the asset's own.
  const want: Record<string, string> = { 'short declaratives': 'urgent', 'long subordinated sentences': 'reflective' }
  for (const [choice, effect] of Object.entries(want)) {
    const c = labelAt(choice), e = labelAt(effect)
    if (!c || !e) { errors.push(`the trace "${choice}" → "${effect}" is not drawn`); continue }
    const y = c.position![1]
    const a = objects.find((o) => o.type === 'arrow' && o.from && o.to && near(o.from[1], y) && near(o.to[1], y))
    if (!a) { errors.push(`no arrow runs from "${choice}" to "${effect}"`); continue }
    if (!near(e.position![1], y)) errors.push(`"${effect}" is not on the same line as "${choice}"`)
    if (!(c.position![0] < a.from![0] && a.from![0] < a.to![0] && a.to![0] < e.position![0])) errors.push(`"${choice}" → "${effect}" does not read left to right`)
  }
  return { ok: errors.length === 0, errors }
}
