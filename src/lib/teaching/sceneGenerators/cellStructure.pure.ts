/**
 * Cell/organelle structure scene generator.
 *
 * Replaces the retired `bio.cell -> food_chain` domain binding for concepts
 * whose KG description is a labelled anatomical structure (a cell, an
 * organelle) rather than a process. Same architecture as cellDivision.pure.ts:
 * curated, textbook-fixed part lists per concept (authored directly from the
 * concept's own canonical KG description, never invented or extracted by
 * keyword), turned into a SceneSpec by one deterministic, parameter-driven
 * builder. No LLM anywhere in this file.
 *
 * Layout: a boundary node (the structure's outer membrane/wall/envelope)
 * revealed first, then each internal part revealed one per step in a ring
 * inside it, each carrying its own one-line functional label so the figure
 * teaches what the part IS, not just that it exists.
 */

import type { SceneObject, SceneSpec, SceneStep, Vec3 } from '../sceneSpec'
import { round } from './shared'

export interface CellStructurePart {
  /** The part's name, exactly as the concept's KG description names it. */
  name: string
  /** One short clause on what it does — never more than the KG description states. */
  description: string
}

export interface CellStructureParams {
  /** Concept id, used only for the scene's own id/aria-label. */
  conceptId: string
  /** The structure being drawn — e.g. "Prokaryotic Cell", "Mitochondrion". */
  subject: string
  /** The outer boundary's own label — e.g. "Cell wall", "Outer membrane". */
  boundaryLabel: string
  /** Internal parts, revealed one per step, ring-arranged inside the boundary. */
  parts: readonly CellStructurePart[]
  teachingGoal: string
}

const BOUNDARY_RADIUS = 4
const BOUNDARY_COLOR = '#9AA5B8'
const PART_COLOR = '#4C8DFF'
const PART_RADIUS = 0.75

export function buildCellStructureScene(params: CellStructureParams): SceneSpec {
  const { conceptId, subject, boundaryLabel, parts, teachingGoal } = params

  const boundaryStep: SceneStep = {
    narration: `${subject}: the ${boundaryLabel.toLowerCase()} marks the outer boundary.`,
    objects: [
      { type: 'node', id: 'boundary', position: [0, 0, 0] as Vec3, radius: BOUNDARY_RADIUS, color: BOUNDARY_COLOR, text: boundaryLabel },
    ],
  }

  const partSteps: SceneStep[] = parts.map((part, i) => {
    const angle = (i / parts.length) * Math.PI * 2
    const position: Vec3 = [round(Math.cos(angle) * 2.2), round(Math.sin(angle) * 2.2), 0]
    const objects: SceneObject[] = [
      { type: 'node', id: `part-${i}`, position, radius: PART_RADIUS, color: PART_COLOR, text: part.name },
      { type: 'path', id: `spoke-${i}`, points: [[0, 0, 0] as Vec3, position], color: BOUNDARY_COLOR },
    ]
    return { narration: `${part.name}: ${part.description}`, objects }
  })

  return {
    id: `cell-structure-${conceptId}`,
    title: subject,
    sceneType: 'diagram',
    teachingGoal,
    cameraDistance: 14,
    ariaLabel: `A labelled diagram of ${subject}, showing the ${boundaryLabel.toLowerCase()} and ${parts.length} internal parts: ${parts.map((p) => p.name).join(', ')}.`,
    steps: [boundaryStep, ...partSteps],
  }
}
