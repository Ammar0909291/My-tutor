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
import { round } from './shared'

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

function node(id: string, position: Vec3, text: string): SceneObject {
  return { type: 'node', id, position, radius: 0.8, color: NODE_COLOR, text }
}
function arrow(id: string, from: Vec3, to: Vec3): SceneObject {
  return { type: 'arrow', id, from, to, color: ARROW_COLOR, thickness: 0.05 }
}

export function buildCellPathwayScene(params: CellPathwayParams): SceneSpec {
  const { conceptId, title, teachingGoal, cyclic, branchStart, stages, branchEnd } = params
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
      narration: `Two independent triggers converge on the same continuation: ${a.description} ${b.description}`,
      objects: [node('branch-start-a', posA, a.name), node('branch-start-b', posB, b.name)],
    })
    steps.push({
      narration: stages[0]?.description ?? '',
      objects: [
        node('stage-0', mainPos, stages[0]?.name ?? ''),
        arrow('branch-start-a-arrow', posA, mainPos),
        arrow('branch-start-b-arrow', posB, mainPos),
      ],
    })
  } else if (stages[0]) {
    steps.push({
      narration: stages[0].description,
      objects: [node('stage-0', [round(mainStartX), 0, 0], stages[0].name)],
    })
  }

  // stages[0] is already drawn above (either branch); continue from stages[1].
  for (let i = 1; i < stages.length; i++) {
    const prevPos: Vec3 = [round(mainStartX + (i - 1) * SPACING), 0, 0]
    const pos: Vec3 = [round(mainStartX + i * SPACING), 0, 0]
    steps.push({
      narration: stages[i].description,
      objects: [node(`stage-${i}`, pos, stages[i].name), arrow(`stage-${i}-arrow`, prevPos, pos)],
    })
  }

  const lastPos: Vec3 = [round(mainStartX + (stages.length - 1) * SPACING), 0, 0]

  if (branchEnd) {
    const [a, b] = branchEnd
    const posA: Vec3 = [round(lastPos[0] + SPACING), 1.8, 0]
    const posB: Vec3 = [round(lastPos[0] + SPACING), -1.8, 0]
    steps.push({
      narration: `The same shared stage can lead to two different outcomes: ${a.description} ${b.description}`,
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
      objects: [{ type: 'path', id: 'cycle-return', points: [lastPos, [lastPos[0], -2.5, 0] as Vec3, [firstPos[0], -2.5, 0] as Vec3, firstPos], color: ARROW_COLOR }],
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
