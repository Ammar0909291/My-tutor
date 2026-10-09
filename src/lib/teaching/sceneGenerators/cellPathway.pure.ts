/**
 * Cell process/pathway scene generator.
 *
 * For concepts whose KG description is a REAL ordered sequence (this stage
 * happens, then this one, or a cycle that returns to its start) — the shape
 * `process_flow`/archetypes.ts's own "A LIST IS NOT A PROCESS" rule exists to
 * protect: a sequence is drawn ONLY when the concept's own description states
 * an order, never invented to make a topic look more dynamic than it is.
 *
 * Supports three real shapes actually present in the eighteen retired
 * bio.cell concepts, none invented for this generator:
 *   - a plain linear sequence (the endomembrane pathway, a signalling cascade)
 *   - a CYCLE that returns to its own start (the cell cycle)
 *   - a BRANCH: two parallel starting stages that converge on a shared
 *     continuation (apoptosis's intrinsic/extrinsic triggers), or a shared
 *     stage that diverges into two parallel outcomes (adhesion loss leading
 *     to either normal development or pathological invasion) — the same
 *     "conditional branches must not be flattened into one unconditional
 *     line" principle already established for
 *     bio.physio.homeostasis-thermoregulation's process_flow fix.
 *
 * Curated, textbook-fixed stage lists per concept; no LLM, no invented order.
 */

import type { SceneObject, SceneSpec, SceneStep, Vec3 } from '../sceneSpec'
import { captionBeside, isBiologyScene, round } from './shared'

export interface PathwayStage {
  name: string
  description: string
}

export interface CellPathwayParams {
  conceptId: string
  title: string
  teachingGoal: string
  /** True when the last stage's arrow should return to the first stage. */
  cyclic?: boolean
  /** Two parallel stages that both lead into `stages[0]` — a branching START. */
  branchStart?: readonly [PathwayStage, PathwayStage]
  /** The shared/main sequence, in real order. */
  stages: readonly PathwayStage[]
  /** Two parallel stages that both follow the last shared stage — a branching END. */
  branchEnd?: readonly [PathwayStage, PathwayStage]
}

const NODE_COLOR = '#4C8DFF'
const ARROW_COLOR = '#9AA5B8'
const SPACING = 4.5

const NODE_RADIUS = 0.8

// Biology: a stage's name is painted above its sphere (below it for a stage drawn in the lower half), against the
// figure's surface — not in the sphere's own colour on the sphere, which MEASURED 2.7–4.5 : 1 in Chromium — and no
// wider than one node pitch, so neighbouring captions cannot run into each other.
//
// A long sequence (six or more stages in a row) alternates its captions above and below the line: on one side, every
// caption is confined to one pitch and neighbours touch ("Implantation Gastrulation Neurulation" printed as one run
// at 1280px); alternating gives each caption two pitches of room and a clear gap to the next one on its side.
const STAGGER_FROM_STAGES = 6
function bioNode(id: string, position: Vec3, text: string, side?: 'above' | 'below'): SceneObject {
  const where = side ?? (position[1] < 0 ? 'below' : 'above')
  return { type: 'node', id, position, radius: NODE_RADIUS, color: NODE_COLOR, text, properties: { ...captionBeside(NODE_RADIUS, where), labelWrapUnits: side ? 2 * SPACING - 0.6 : SPACING - 0.6 } }
}
function legacyNode(id: string, position: Vec3, text: string): SceneObject {
  return { type: 'node', id, position, radius: NODE_RADIUS, color: NODE_COLOR, text }
}
/**
 * Biology: a connector from one sphere's SURFACE to the next one's. It used to run centre to centre, so its arrowhead
 * ended inside the destination sphere and no pathway showed a direction at all — order was carried by caption position
 * alone (measured: no arrowhead visible on any Biology pathway). The head now stops just short of the sphere it points at.
 */
function bioArrow(id: string, from: Vec3, to: Vec3): SceneObject {
  const dx = to[0] - from[0]
  const dy = to[1] - from[1]
  const len = Math.hypot(dx, dy) || 1
  const gap = NODE_RADIUS + 0.25
  const [ux, uy] = [dx / len, dy / len]
  return {
    type: 'arrow', id,
    from: [round(from[0] + ux * gap), round(from[1] + uy * gap), 0],
    to: [round(to[0] - ux * gap), round(to[1] - uy * gap), 0],
    color: ARROW_COLOR, thickness: 0.05,
  }
}
function legacyArrow(id: string, from: Vec3, to: Vec3): SceneObject {
  return { type: 'arrow', id, from, to, color: ARROW_COLOR, thickness: 0.05 }
}

/**
 * A stage's narration, led by the stage's own name. The authored descriptions
 * are clauses whose subject IS the stage ("secretes GnRH in pulsatile bursts"
 * for the hypothalamus), so without the name the "What's happening?" panel
 * listed actions with no actor. A description that already opens with the name
 * is left as it is.
 */
function stageLine(stage: PathwayStage): string {
  const description = stage.description.trim()
  const name = stage.name.trim()
  // A whole-word match: stage "M" must not count as named by "mitosis and …".
  const named = description.toLowerCase().startsWith(name.toLowerCase())
    && !/[\p{L}\p{N}]/u.test(description.charAt(name.length))
  return named ? description : `${name}: ${description}`
}

/** Two branch stages in one narration, each ended so they cannot run together. */
function branchLines(a: PathwayStage, b: PathwayStage): string {
  const end = (t: string) => (/[.!?…]["'”’)\]]*$/.test(t) ? t : `${t}.`)
  return `${end(stageLine(a))} ${stageLine(b)}`
}

export function buildCellPathwayScene(params: CellPathwayParams): SceneSpec {
  const { conceptId, title, teachingGoal, cyclic, branchStart, stages, branchEnd } = params
  const bio = isBiologyScene(conceptId)
  const stagger = bio && !cyclic && !branchStart && !branchEnd && stages.length >= STAGGER_FROM_STAGES
  const node = bio
    ? (id: string, position: Vec3, text: string) => {
        const m = /^stage-(\d+)$/.exec(id)
        return stagger && m ? bioNode(id, position, text, Number(m[1]) % 2 === 1 ? 'below' : 'above') : bioNode(id, position, text)
      }
    : legacyNode
  const arrow = bio ? bioArrow : legacyArrow
  const steps: SceneStep[] = []

  // x=0 is reserved for a branching start (two parallel nodes); the shared
  // sequence begins at x=SPACING when a branch start is present.
  const mainStartX = branchStart ? SPACING : 0

  if (branchStart) {
    const [a, b] = branchStart
    const posA: Vec3 = [0, 1.6, 0]
    const posB: Vec3 = [0, -1.6, 0]
    const mainPos: Vec3 = [round(mainStartX), 0, 0]
    steps.push({
      narration: `Two independent triggers converge on the same continuation. ${branchLines(a, b)}`,
      objects: [node('branch-start-a', posA, a.name), node('branch-start-b', posB, b.name)],
    })
    steps.push({
      narration: stages[0] ? stageLine(stages[0]) : '',
      objects: [
        node('stage-0', mainPos, stages[0]?.name ?? ''),
        arrow('branch-start-a-arrow', posA, mainPos),
        arrow('branch-start-b-arrow', posB, mainPos),
      ],
    })
  } else if (stages[0]) {
    steps.push({
      narration: stageLine(stages[0]),
      objects: [node('stage-0', [round(mainStartX), 0, 0], stages[0].name)],
    })
  }

  // stages[0] is already drawn above (either branch); continue from stages[1].
  for (let i = 1; i < stages.length; i++) {
    const prevPos: Vec3 = [round(mainStartX + (i - 1) * SPACING), 0, 0]
    const pos: Vec3 = [round(mainStartX + i * SPACING), 0, 0]
    steps.push({
      narration: stageLine(stages[i]),
      objects: [node(`stage-${i}`, pos, stages[i].name), arrow(`stage-${i}-arrow`, prevPos, pos)],
    })
  }

  const lastPos: Vec3 = [round(mainStartX + (stages.length - 1) * SPACING), 0, 0]

  if (branchEnd) {
    const [a, b] = branchEnd
    const posA: Vec3 = [round(lastPos[0] + SPACING), 1.8, 0]
    const posB: Vec3 = [round(lastPos[0] + SPACING), -1.8, 0]
    steps.push({
      narration: `The same shared stage can lead to two different outcomes. ${branchLines(a, b)}`,
      objects: [
        node('branch-end-a', posA, a.name),
        node('branch-end-b', posB, b.name),
        arrow('branch-end-a-arrow', lastPos, posA),
        arrow('branch-end-b-arrow', lastPos, posB),
      ],
    })
  } else if (cyclic && stages[0]) {
    const firstPos: Vec3 = [round(mainStartX), 0, 0]
    steps.push({
      narration: `The cycle returns to ${stages[0].name}: the sequence repeats.`,
      objects: bio
        // The return runs down from the last stage, back along the bottom, and ARROWS up into the first stage; the
        // closing leg is an arrow (a bare polyline ended in no head, so the loop showed no direction).
        ? [
            { type: 'path', id: 'cycle-return', points: [[lastPos[0], round(-NODE_RADIUS - 0.1), 0] as Vec3, [lastPos[0], -2.5, 0] as Vec3, [firstPos[0], -2.5, 0] as Vec3], color: ARROW_COLOR },
            arrow('cycle-return-arrow', [firstPos[0], -2.5, 0], firstPos),
          ]
        : [{ type: 'path', id: 'cycle-return', points: [lastPos, [lastPos[0], -2.5, 0] as Vec3, [firstPos[0], -2.5, 0] as Vec3, firstPos], color: ARROW_COLOR }],
    })
  }

  const allStageNames = [
    ...(branchStart ? [branchStart[0].name, branchStart[1].name] : []),
    ...stages.map((s) => s.name),
    ...(branchEnd ? [branchEnd[0].name, branchEnd[1].name] : []),
  ]

  return {
    id: `cell-pathway-${conceptId}`,
    title,
    sceneType: 'process',
    teachingGoal,
    cameraDistance: 20,
    ariaLabel: `A ${cyclic ? 'cyclic' : 'sequential'} process diagram of ${title}: ${allStageNames.join(' -> ')}.`,
    steps,
  }
}
