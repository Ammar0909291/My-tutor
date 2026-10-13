/**
 * Regional organisation of the brain — a labelled lateral schematic, authored for bio.neuro.brain-regional-organization.
 *
 * WHY THIS EXISTS. The concept was served the structure generator's ring of four dots named "Parietal / Temporal /
 * Frontal / Occipital lobe". That draws ONE of the concept's two schemes (the lobes) as labelled dots, with no
 * anatomy, no forebrain/midbrain/hindbrain, no limbic system and no cerebellum or brainstem — the concept's Learning
 * Objective is precisely that the forebrain/midbrain/hindbrain division and the cortex's four lobes are TWO schemes at
 * DIFFERENT scales (the lobes lie WITHIN the forebrain), that the limbic system is a functionally-defined SET of linked
 * structures rather than one place, and that the cerebellum times and coordinates movement that the frontal lobe starts.
 *
 * WHAT IT DRAWS, AND WHERE EACH CLAIM COMES FROM. Only what the concept's own Educational Brain entry
 * (educational-brain/concepts/biology/bio.neuro.brain-regional-organization.md) names: the forebrain (cerebral cortex,
 * limbic system), midbrain and hindbrain (medulla, pons, cerebellum); the four lobes and their principal functions;
 * the limbic system as interconnected structures, "including the hippocampus, amygdala, and others"; the cerebellum's
 * and the brainstem's distinct roles. The shapes are a STYLISED side view (front of the brain on the left), the kind
 * every textbook lobe diagram uses — a schematic, not a measured atlas. Nothing is drawn that the entry does not name.
 *
 * HOW IT IS DRAWN. SceneSpec has no filled polygon, so each region is filled with ONE thick `path` (a boustrophedon brush
 * stroke) — the existing `path` primitive, no new renderer. A name is a `label` joined to its region by a thin leader and
 * a small pin, so no caption is painted on a coloured fill.
 *
 * STAGES (cumulative; each stage's labels are true of the complete figure):
 *   1  the three broad divisions: forebrain, midbrain, hindbrain
 *   2  the four lobes, drawn INSIDE the forebrain
 *   3  the limbic system: hippocampus and amygdala, linked, "seen through" the cortex
 *   4  the cerebellum and the medulla and pons (brainstem)
 * Nine `label` objects in all, so the intermediate label budget hides none of them; the limbic structures are node
 * captions and the limbic link is a path caption (structure markers, not area names).
 *
 * Pure and parameter-free: there is nothing to extract.
 */

import type { SceneObject, SceneSpec, SceneStep, Vec3 } from '../sceneSpec'
import { ROLE, TIER } from './visualDesign'
import { round } from './shared'

type P = readonly [number, number]

// ── the stylised lateral outlines (x grows to the right; the FRONT of the brain is on the left) ──────────────────────
const CEREBRUM: P[] = [[-5.2, 0.2], [-5.1, 1.3], [-4.6, 2.4], [-3.7, 3.3], [-2.5, 3.9], [-1.1, 4.2], [0.4, 4.2], [1.9, 3.9], [3.3, 3.3], [4.4, 2.5], [5.1, 1.5], [5.4, 0.3], [5.2, -0.7], [4.6, -1.4], [3.6, -2.0], [2.4, -2.6], [1.0, -3.0], [-0.5, -3.1], [-1.8, -2.8], [-2.7, -2.3], [-3.0, -1.5], [-3.7, -1.3], [-4.5, -1.0], [-5.0, -0.4]]
// The lobes tile the cerebrum exactly: they share the central sulcus, the lateral sulcus and the parieto-occipital line.
const FRONTAL: P[] = [[0.4, 4.2], [-1.1, 4.2], [-2.5, 3.9], [-3.7, 3.3], [-4.6, 2.4], [-5.1, 1.3], [-5.2, 0.2], [-5.0, -0.4], [-4.5, -1.0], [-3.7, -1.3], [-3.0, -1.5], [-1.8, -1.2], [-0.7, -0.96], [-0.1, 2.0]]
const PARIETAL: P[] = [[0.4, 4.2], [1.9, 3.9], [3.3, 3.3], [2.9, 0.0], [1.2, -0.6], [-0.4, -0.9], [-0.7, -0.96], [-0.1, 2.0]]
const TEMPORAL: P[] = [[-3.0, -1.5], [-1.8, -1.2], [-0.7, -0.96], [-0.4, -0.9], [1.2, -0.6], [2.9, 0.0], [3.6, -2.0], [2.4, -2.6], [1.0, -3.0], [-0.5, -3.1], [-1.8, -2.8], [-2.7, -2.3]]
const OCCIPITAL: P[] = [[3.3, 3.3], [4.4, 2.5], [5.1, 1.5], [5.4, 0.3], [5.2, -0.7], [4.6, -1.4], [3.6, -2.0], [2.9, 0.0]]
const MIDBRAIN: P[] = [[-0.35, -3.0], [1.05, -3.0], [1.0, -3.8], [-0.2, -3.8]]
const PONS: P[] = [[-0.45, -3.8], [1.1, -3.8], [1.25, -4.7], [-0.5, -4.7]]
const MEDULLA: P[] = [[-0.4, -4.7], [1.2, -4.7], [0.95, -5.7], [0.0, -5.7]]
const CEREBELLUM: P[] = [[1.2, -3.3], [2.6, -2.8], [3.9, -2.4], [4.7, -3.1], [4.6, -4.0], [3.6, -4.6], [2.4, -4.5], [1.2, -4.3]]

// ── colour ──────────────────────────────────────────────────────────────────────────────────────────────────────────
const FOREBRAIN_FILL = '#8394b4'
const MIDBRAIN_FILL = '#2EC4B6'
const HINDBRAIN_FILL = '#B47CFF'
const FRONTAL_FILL = '#4C8DFF'
const PARIETAL_FILL = '#FFB020'
const TEMPORAL_FILL = '#39C46E'
const OCCIPITAL_FILL = '#EF4444'
const LIMBIC = '#F472B6'
const LEADER = ROLE.reference

// ── geometry helpers ────────────────────────────────────────────────────────────────────────────────────────────────
const BRUSH = 0.2        // radius of the brush a region is filled with (scene units)
const PITCH = 0.28       // distance between brush rows: less than two radii, so the rows overlap into a solid fill
const Z_BASE = 0
const Z_LOBE = 0.15
const Z_TOP = 0.6

/**
 * A region filled with ONE `path`: a thick boustrophedon stroke that sweeps left-right across the polygon, one row at a
 * time. SceneSpec has no filled polygon, and a scan-line of `bar`s needs a hundred objects per step (the scene audit's
 * ST-07 bound is 50 — the right bound: a step is one teaching beat). A single thick path is one object; the round
 * joints of the stroke make the region's edge smooth, and each region ends one brush-radius inside its outline, so
 * neighbouring regions are separated by a thin gap that reads as the sulcus between them.
 */
function brush(id: string, poly: readonly P[], color: string, z: number): SceneObject {
  const ys = poly.map((p) => p[1])
  const yMin = Math.min(...ys), yMax = Math.max(...ys)
  const points: Vec3[] = []
  let flip = false
  for (let y = yMin + BRUSH; y <= yMax - BRUSH + 1e-9; y += PITCH) {
    const xs: number[] = []
    for (let i = 0; i < poly.length; i++) {
      const [x1, y1] = poly[i]
      const [x2, y2] = poly[(i + 1) % poly.length]
      if ((y1 <= y && y < y2) || (y2 <= y && y < y1)) xs.push(x1 + ((y - y1) * (x2 - x1)) / (y2 - y1))
    }
    xs.sort((a, b2) => a - b2)
    // A row can cross a concave outline more than once; the widest stretch is the body of the region.
    let best: [number, number] | null = null
    for (let j = 0; j + 1 < xs.length; j += 2) if (!best || xs[j + 1] - xs[j] > best[1] - best[0]) best = [xs[j], xs[j + 1]]
    if (!best) continue
    const left = best[0] + BRUSH, right = best[1] - BRUSH
    if (right - left < 0.02) { points.push([round((left + right) / 2), round(y), z]); continue }
    const row: Vec3[] = [[round(left), round(y), z], [round(right), round(y), z]]
    points.push(...(flip ? row.reverse() : row))
    flip = !flip
  }
  return { type: 'path', id, points, color, thickness: BRUSH, radius: BRUSH, properties: { trace: false } }
}

interface Named {
  id: string
  text: string
  /** Where the label sits (its centre). */
  at: P
  color: string
  /** Where each leader ends, on the region it names. */
  pins: readonly P[]
}

const LABEL_WRAP_UNITS = 3.4

/** A label, a thin leader from the label's edge to each pin, and a small pin on the region. */
function named(n: Named): SceneObject[] {
  const hw = Math.min(LABEL_WRAP_UNITS, n.text.length * 0.2 + 0.3) / 2
  const hh = 0.5
  const out: SceneObject[] = [
    { type: 'label', id: n.id, position: [n.at[0], n.at[1], 0], text: n.text, color: n.color, size: TIER.detail, properties: { labelWrapUnits: LABEL_WRAP_UNITS } },
  ]
  n.pins.forEach((pin, i) => {
    const dx = pin[0] - n.at[0], dy = pin[1] - n.at[1]
    const t = Math.min(hw / Math.max(Math.abs(dx), 1e-6), hh / Math.max(Math.abs(dy), 1e-6)) * 1.12
    const from: Vec3 = [round(n.at[0] + dx * t), round(n.at[1] + dy * t), Z_TOP]
    out.push({ type: 'bond', id: `${n.id}-leader-${i}`, from, to: [pin[0], pin[1], Z_TOP], color: LEADER, thickness: 0.03 })
    out.push({ type: 'node', id: `${n.id}-pin-${i}`, position: [pin[0], pin[1], Z_TOP], radius: 0.11, color: ROLE.ink })
  })
  return out
}

const idsOf = (objs: readonly SceneObject[]) => objs.map((o) => o.id).filter((id): id is string => typeof id === 'string')

export const BRAIN_REGIONS_SCENE_ID = 'brain-regions-lateral'

export function buildBrainRegionsScene(): SceneSpec {
  // ── stage 1: the three broad divisions ──────────────────────────────────────────────────────────────────────────
  const cerebellumFill = brush('cerebellum', CEREBELLUM, HINDBRAIN_FILL, Z_BASE)
  const ponsFill = brush('pons', PONS, HINDBRAIN_FILL, Z_BASE)
  const medullaFill = brush('medulla', MEDULLA, HINDBRAIN_FILL, Z_BASE)
  const divisions: SceneObject[] = [
    brush('forebrain', CEREBRUM, FOREBRAIN_FILL, Z_BASE), brush('midbrain', MIDBRAIN, MIDBRAIN_FILL, Z_BASE), cerebellumFill, ponsFill, medullaFill,
    ...named({ id: 'label-forebrain', text: 'Forebrain', at: [-1.4, 5.4], color: ROLE.ink, pins: [[0.4, 4.2]] }),
    ...named({ id: 'label-midbrain', text: 'Midbrain', at: [-5.2, -3.7], color: MIDBRAIN_FILL, pins: [[-0.2, -3.4]] }),
    ...named({ id: 'label-hindbrain', text: 'Hindbrain', at: [2.4, -6.5], color: HINDBRAIN_FILL, pins: [[0.6, -5.4], [3.2, -4.45]] }),
  ]

  // ── stage 2: the four lobes, inside the forebrain ───────────────────────────────────────────────────────────────
  const lobes: SceneObject[] = [
    brush('frontal', FRONTAL, FRONTAL_FILL, Z_LOBE), brush('parietal', PARIETAL, PARIETAL_FILL, Z_LOBE),
    brush('temporal', TEMPORAL, TEMPORAL_FILL, Z_LOBE), brush('occipital', OCCIPITAL, OCCIPITAL_FILL, Z_LOBE),
    ...named({ id: 'label-frontal', text: 'Frontal lobe', at: [-7.2, 1.4], color: FRONTAL_FILL, pins: [[-3.4, 1.4]] }),
    ...named({ id: 'label-parietal', text: 'Parietal lobe', at: [3.6, 5.4], color: PARIETAL_FILL, pins: [[1.9, 2.6]] }),
    ...named({ id: 'label-occipital', text: 'Occipital lobe', at: [7.6, 1.6], color: OCCIPITAL_FILL, pins: [[4.5, 1.5]] }),
    ...named({ id: 'label-temporal', text: 'Temporal lobe', at: [-7.0, -2.7], color: TEMPORAL_FILL, pins: [[-2.2, -2.0]] }),
  ]

  // ── stage 3: the limbic system — a set of linked structures, not one place ──────────────────────────────────────
  // Two named structures (the entry names "the hippocampus, amygdala, and others"), joined by a line and tinted alike.
  // Their captions are the nodes' own text, so they are not area labels and stay outside the nine-label budget; each is
  // carried out to the side by a leader, clear of the coloured lobes it is seen through.
  const amygdala: P = [-1.6, -1.9]
  const hippocampus: P = [1.6, -1.6]
  const amygdalaCaption: P = [-7.3, -1.0]
  const hippocampusCaption: P = [7.4, -1.0]
  const limbic: SceneObject[] = [
    { type: 'node', id: 'amygdala', position: [amygdala[0], amygdala[1], Z_TOP], radius: 0.3, color: LIMBIC, text: 'Amygdala (limbic)', properties: { labelOffset: [amygdalaCaption[0] - amygdala[0], amygdalaCaption[1] - amygdala[1], 0], labelWrapUnits: 2.6 } },
    { type: 'node', id: 'hippocampus', position: [hippocampus[0], hippocampus[1], Z_TOP], radius: 0.3, color: LIMBIC, text: 'Hippocampus (limbic)', properties: { labelOffset: [hippocampusCaption[0] - hippocampus[0], hippocampusCaption[1] - hippocampus[1], 0], labelWrapUnits: 2.8 } },
    {
      type: 'path', id: 'limbic-link', color: LIMBIC, thickness: 0.07, radius: 0.05,
      points: [[amygdala[0], amygdala[1], Z_TOP], [-0.8, -1.35, Z_TOP], [0.2, -1.15, Z_TOP], [1.0, -1.25, Z_TOP], [hippocampus[0], hippocampus[1], Z_TOP]],
    },
    { type: 'bond', id: 'amygdala-leader', from: [-5.9, -1.1, Z_TOP], to: [amygdala[0] - 0.3, amygdala[1] + 0.05, Z_TOP], color: LEADER, thickness: 0.03 },
    { type: 'bond', id: 'hippocampus-leader', from: [5.9, -1.05, Z_TOP], to: [hippocampus[0] + 0.3, hippocampus[1] + 0.05, Z_TOP], color: LEADER, thickness: 0.03 },
  ]

  // ── stage 4: the cerebellum and the medulla and pons ────────────────────────────────────────────────────────────
  const hindbrainParts: SceneObject[] = [
    ...named({ id: 'label-cerebellum', text: 'Cerebellum', at: [7.2, -3.5], color: HINDBRAIN_FILL, pins: [[4.2, -3.45]] }),
    ...named({ id: 'label-medulla-pons', text: 'Medulla and pons', at: [-5.2, -5.6], color: HINDBRAIN_FILL, pins: [[-0.3, -4.7]] }),
  ]

  const steps: SceneStep[] = [
    {
      intent: 'establish',
      narration:
        'The brain divides into three broad regions. The forebrain holds the cerebral cortex and limbic system (higher cognition, senses, emotion); the midbrain ' +
        'relays visual and auditory reflexes; the hindbrain (medulla, pons, cerebellum) runs vital automatic functions and coordinates movement.',
      objects: divisions,
    },
    {
      intent: 'relate',
      narration:
        'A finer scheme: the cerebral cortex has four lobes, a subdivision WITHIN the forebrain, not a rival to it. Frontal: planning, decisions, voluntary ' +
        'movement. Parietal: sensory integration, spatial processing. Temporal: hearing, aspects of memory and language. Occipital: vision.',
      objects: lobes,
      focus: idsOf(lobes),
    },
    {
      intent: 'relate',
      narration:
        'The limbic system, central to emotion and memory, is not one structure but a set of interconnected structures (such as the hippocampus and amygdala) ' +
        'grouped by what they do together, not by where they sit.',
      objects: limbic,
      focus: idsOf(limbic),
    },
    {
      intent: 'resolve',
      narration:
        'The cerebellum fine-tunes voluntary movement started elsewhere (by the frontal lobe) and aids motor learning; the brainstem (here medulla and pons) ' +
        'runs breathing and heart rate, largely below conscious control.',
      // No `focus` here: the final stage is also the view the figure opens on (every stage revealed), and a focus set would dim
      // everything but the hindbrain in it.
      objects: hindbrainParts,
    },
  ]

  return {
    id: BRAIN_REGIONS_SCENE_ID,
    title: 'Regional Organisation of the Brain',
    sceneType: 'diagram',
    teachingGoal:
      'Two different organisational schemes at different scales: the forebrain / midbrain / hindbrain division, and the four lobes of the cerebral cortex ' +
      'as a finer subdivision within the forebrain; the limbic system as a functional set of linked structures; the cerebellum and brainstem.',
    cameraDistance: 16,
    ariaLabel:
      'A side view of the brain, front on the left. Stage 1: the forebrain (the cerebrum and the structures beneath it), the midbrain below it and the hindbrain (cerebellum, pons, medulla). ' +
      'Stage 2: the cerebrum divided into frontal, parietal, temporal and occipital lobes, all inside the forebrain. Stage 3: the hippocampus and amygdala, functionally linked as the ' +
      'limbic system. Stage 4: the cerebellum and the medulla and pons.',
    explainer: {
      legend: [
        { label: 'Forebrain', color: FOREBRAIN_FILL, shape: 'dot' },
        { label: 'Midbrain', color: MIDBRAIN_FILL, shape: 'dot' },
        { label: 'Hindbrain', color: HINDBRAIN_FILL, shape: 'dot' },
        { label: 'Limbic structures (linked)', color: LIMBIC, shape: 'dot' },
      ],
      insight: {
        heading: 'Two maps, two scales',
        bullets: [
          'Forebrain / midbrain / hindbrain is the broad (country-level) map.',
          'The four lobes are a zoomed-in map of the forebrain only — not a fourth, rival division.',
          'The limbic system is a team working in several places, not one building.',
        ],
        note: 'The cerebellum coordinates and times movement; the frontal lobe starts it.',
      },
    },
    steps,
  }
}
