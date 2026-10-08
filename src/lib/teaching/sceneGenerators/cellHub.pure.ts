/**
 * Cell "hub and spokes" scene generator.
 *
 * For concepts whose KG description is a LIST of coexisting categories under
 * one umbrella idea — not a sequence, per archetypes.ts's own established
 * rule that a list of things that coexist must never be drawn as an ordered
 * process (it asserts an order the concept does not have). The hallmarks of
 * cancer are seven independent hallmarks, not seven steps; the cytoskeleton
 * is three coexisting filament types, not three phases.
 *
 * Curated, textbook-fixed spoke lists per concept, authored directly from the
 * concept's own KG description; no LLM, no invented category.
 */

import type { SceneObject, SceneSpec, SceneStep, Vec3 } from '../sceneSpec'
import { captionBeside, round } from './shared'

export interface HubSpoke {
  name: string
  description: string
}

export interface CellHubParams {
  conceptId: string
  hubLabel: string
  title: string
  teachingGoal: string
  spokes: readonly HubSpoke[]
}

const HUB_COLOR = '#FFB020'
const SPOKE_COLOR = '#4C8DFF'
const LINE_COLOR = '#9AA5B8'
const HUB_RADIUS = 0.9
const SPOKE_RADIUS = 0.7

export function buildCellHubScene(params: CellHubParams): SceneSpec {
  const { conceptId, hubLabel, title, teachingGoal, spokes } = params

  const hubStep: SceneStep = {
    narration: hubLabel,
    // The hub's caption goes ABOVE it, so no spoke may point straight up: an even
    // spoke count is rotated half a step (see the angle below) to leave the top free.
    objects: [{ type: 'node', id: 'hub', position: [0, 0, 0] as Vec3, radius: HUB_RADIUS, color: HUB_COLOR, text: hubLabel, properties: captionBeside(HUB_RADIUS, 'above') }],
  }

  const spokeSteps: SceneStep[] = spokes.map((spoke, i) => {
    // Odd counts start at the bottom, which leaves the top free. Even counts would
    // put a spoke straight up through the hub's caption, so they turn half a step.
    const half = spokes.length % 2 === 0 ? Math.PI / spokes.length : 0
    const angle = (i / spokes.length) * Math.PI * 2 - Math.PI / 2 + half
    const position: Vec3 = [round(Math.cos(angle) * 3.4), round(Math.sin(angle) * 3.4), 0]
    const objects: SceneObject[] = [
      // Caption on the outward (upper or lower) side of its sphere, not on it.
      { type: 'node', id: `spoke-${i}`, position, radius: SPOKE_RADIUS, color: SPOKE_COLOR, text: spoke.name, properties: captionBeside(SPOKE_RADIUS, position[1] >= 0 ? 'above' : 'below') },
      { type: 'path', id: `spoke-line-${i}`, points: [[0, 0, 0] as Vec3, position], color: LINE_COLOR },
    ]
    return { narration: `${spoke.name}: ${spoke.description}`, objects }
  })

  return {
    id: `cell-hub-${conceptId}`,
    title,
    sceneType: 'diagram',
    teachingGoal,
    cameraDistance: 16,
    ariaLabel: `${title}: ${hubLabel}, with ${spokes.length} independent categories — ${spokes.map((s) => s.name).join(', ')}.`,
    steps: [hubStep, ...spokeSteps],
  }
}
