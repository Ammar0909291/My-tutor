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
import { round } from './shared'

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

export function buildCellHubScene(params: CellHubParams): SceneSpec {
  const { conceptId, hubLabel, title, teachingGoal, spokes } = params

  const hubStep: SceneStep = {
    narration: hubLabel,
    objects: [{ type: 'node', id: 'hub', position: [0, 0, 0] as Vec3, radius: 0.9, color: HUB_COLOR, text: hubLabel }],
  }

  const spokeSteps: SceneStep[] = spokes.map((spoke, i) => {
    const angle = (i / spokes.length) * Math.PI * 2 - Math.PI / 2
    const position: Vec3 = [round(Math.cos(angle) * 3.4), round(Math.sin(angle) * 3.4), 0]
    const objects: SceneObject[] = [
      { type: 'node', id: `spoke-${i}`, position, radius: 0.7, color: SPOKE_COLOR, text: spoke.name },
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
