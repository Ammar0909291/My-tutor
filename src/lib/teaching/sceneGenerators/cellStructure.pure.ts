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
import { captionBeside, round } from './shared'

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
  /**
   * What the first step says. The default — "<subject>: the <boundary> marks the
   * outer boundary." — is right for a cell or an organelle and meaningless for a
   * phylum, a colony or a name, where the "boundary" is only the whole that the
   * parts belong to; those concepts supply their own sentence.
   */
  boundaryNarration?: string
}

// The boundary is a RING, not a solid sphere. It used to be a radius-4 sphere at
// the origin with the parts (radius 0.75, 2.2 from the centre) placed INSIDE it:
// an opaque sphere hides everything inside it, so every Biology structure figure
// (11 of them) drew one big grey ball and floated the part names over it —
// MEASURED in Chromium, none of the parts were visible at either width. A ring
// shows the outer boundary and leaves the parts visible inside it.
const BOUNDARY_RADIUS = 6
const RING_POINTS = 36
const PART_RING_RADIUS = 2.8
// Part captions wrap to roughly the ring's own width, so a long name stays inside
// the boundary instead of running over it.
const WRAP_FRACTION = 0.3
// …and no wider than the ring's interior at the height the caption sits: a caption longer than the chord ran across the
// boundary line (measured on desktop, where a share of the canvas is wider than the ring).
const WRAP_UNITS = 5.4
const BOUNDARY_COLOR = '#9AA5B8'
const PART_COLOR = '#4C8DFF'
const PART_RADIUS = 0.75

export function buildCellStructureScene(params: CellStructureParams): SceneSpec {
  const { conceptId, subject, boundaryLabel, parts, teachingGoal, boundaryNarration } = params

  // Start at the bottom so the ring's middle point — where its caption anchors —
  // is the TOP of the ring; the caption then sits just outside it.
  const ring: Vec3[] = Array.from({ length: RING_POINTS }, (_, i) => {
    const a = -Math.PI / 2 + (i / RING_POINTS) * Math.PI * 2
    return [round(Math.cos(a) * BOUNDARY_RADIUS) + 0, round(Math.sin(a) * BOUNDARY_RADIUS) + 0, 0] as Vec3 // `+ 0` normalises -0
  })
  ring.push([...ring[0]] as Vec3) // closed: the last point IS the first, not a float near-miss of it
  const boundaryStep: SceneStep = {
    narration: boundaryNarration ?? `${subject}: the ${boundaryLabel.toLowerCase()} marks the outer boundary.`,
    objects: [
      { type: 'path', id: 'boundary', points: ring, color: BOUNDARY_COLOR, thickness: 0.07, radius: 0.04, text: boundaryLabel, properties: { labelOffset: [0, 0.55, 0], labelWrapFraction: WRAP_FRACTION, labelWrapUnits: WRAP_UNITS } },
    ],
  }

  const partSteps: SceneStep[] = parts.map((part, i) => {
    const angle = (i / parts.length) * Math.PI * 2
    const position: Vec3 = [round(Math.cos(angle) * PART_RING_RADIUS), round(Math.sin(angle) * PART_RING_RADIUS), 0]
    const objects: SceneObject[] = [
      // The caption goes on the outward side of its part, so it is painted
      // against the figure's surface rather than on the sphere it names.
      { type: 'node', id: `part-${i}`, position, radius: PART_RADIUS, color: PART_COLOR, text: part.name, properties: { ...captionBeside(PART_RADIUS, position[1] >= 0 ? 'above' : 'below'), labelWrapFraction: WRAP_FRACTION, labelWrapUnits: WRAP_UNITS } },
      { type: 'path', id: `spoke-${i}`, points: [[0, 0, 0] as Vec3, position], color: BOUNDARY_COLOR },
    ]
    return { narration: `${part.name}: ${part.description}`, objects }
  })

  return {
    id: `cell-structure-${conceptId}`,
    title: subject,
    sceneType: 'diagram',
    teachingGoal,
    cameraDistance: 18,
    ariaLabel: `A labelled diagram of ${subject}, showing the ${boundaryLabel.toLowerCase()} and ${parts.length} internal parts: ${parts.map((p) => p.name).join(', ')}.`,
    steps: [boundaryStep, ...partSteps],
  }
}
