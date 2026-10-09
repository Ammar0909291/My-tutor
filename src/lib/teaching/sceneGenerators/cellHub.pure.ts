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
const RING_RADIUS = 3.4
// Seven or more spokes need a wider ring: their captions (above the upper spheres, below the lower ones) crowded each
// other and the spheres at 3.4 (measured on the 8-spoke Hallmarks of Cancer figure).
const RING_RADIUS_PER_SPOKE_OVER_SIX = 1.1
const ringRadiusFor = (spokeCount: number): number => RING_RADIUS + Math.max(0, spokeCount - 6) * RING_RADIUS_PER_SPOKE_OVER_SIX
// A hub caption longer than this is a HEADING, not a name: painted beside the hub sphere it ran across the
// connector lines and the upper spoke spheres (measured on every hub with a sentence-length caption), so it is
// set above the whole figure, wrapped, in the hub's own colour. A short caption stays on the hub.
const HUB_HEADING_CHARS = 18
const HUB_HEADING_EXTRA = 0.7 + 2.0
const SPOKE_RADIUS = 0.7
// With seven or more spokes the neighbours are closer than a caption is wide, so each caption wraps to the arc it owns.
const spokeWrap = (n: number): { labelWrapUnits?: number } =>
  n >= 7 ? { labelWrapUnits: Math.round((2 * ringRadiusFor(n) * Math.sin(Math.PI / n) - 0.4) * 10) / 10 } : {}

export function buildCellHubScene(params: CellHubParams): SceneSpec {
  const { conceptId, hubLabel, title, teachingGoal, spokes } = params

  const hubStep: SceneStep = {
    narration: hubLabel,
    // The hub's caption goes ABOVE it, so no spoke may point straight up: an even
    // spoke count is rotated half a step (see the angle below) to leave the top free.
    objects: [{ type: 'node', id: 'hub', position: [0, 0, 0] as Vec3, radius: HUB_RADIUS, color: HUB_COLOR, text: hubLabel, properties: hubLabel.length > HUB_HEADING_CHARS ? { labelOffset: [0, ringRadiusFor(spokes.length) + HUB_HEADING_EXTRA, 0], labelWrapFraction: 0.8 } : captionBeside(HUB_RADIUS, 'above') }],
  }

  const spokeSteps: SceneStep[] = spokes.map((spoke, i) => {
    // Odd counts start at the bottom, which leaves the top free. Even counts would
    // put a spoke straight up through the hub's caption, so they turn half a step.
    const half = spokes.length % 2 === 0 ? Math.PI / spokes.length : 0
    const angle = (i / spokes.length) * Math.PI * 2 - Math.PI / 2 + half
    const position: Vec3 = [round(Math.cos(angle) * ringRadiusFor(spokes.length)), round(Math.sin(angle) * ringRadiusFor(spokes.length)), 0]
    const objects: SceneObject[] = [
      // Caption on the outward (upper or lower) side of its sphere, not on it.
      { type: 'node', id: `spoke-${i}`, position, radius: SPOKE_RADIUS, color: SPOKE_COLOR, text: spoke.name, properties: { ...captionBeside(SPOKE_RADIUS, position[1] >= 0 ? 'above' : 'below'), ...spokeWrap(spokes.length) } },
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
