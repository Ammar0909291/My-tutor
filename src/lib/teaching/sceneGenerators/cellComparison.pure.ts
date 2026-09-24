/**
 * Cell comparison scene generator.
 *
 * For concepts whose KG description is fundamentally a CONTRAST between two
 * or more named categories — passive vs active transport, aerobic vs
 * anaerobic respiration, kinesin vs dynein, junctions vs matrix. Each group
 * gets its own labelled column so the figure shows what distinguishes them,
 * never merging them into one undifferentiated picture (the exact failure
 * mode this whole retirement campaign exists to avoid: a generic figure that
 * cannot tell two different things apart).
 *
 * Curated, textbook-fixed group/item lists per concept, authored directly
 * from the concept's own KG description; no LLM, no invented category.
 */

import type { SceneObject, SceneSpec, SceneStep, Vec3 } from '../sceneSpec'
import { round } from './shared'

export interface ComparisonGroup {
  /** The category's own name — e.g. "Passive transport", "Kinesin". */
  label: string
  /** One short clause distinguishing this group — never more than the KG states. */
  description: string
  /** Named members/examples of this group, most specific last. */
  items: readonly string[]
}

export interface CellComparisonParams {
  conceptId: string
  title: string
  teachingGoal: string
  groups: readonly ComparisonGroup[]
}

const GROUP_COLORS = ['#4C8DFF', '#FFB020', '#39C46E', '#EF4444'] as const
const ITEM_COLOR = '#9AA5B8'
const GROUP_SPACING = 5.5
const ITEM_SPACING = 1.1

export function buildCellComparisonScene(params: CellComparisonParams): SceneSpec {
  const { conceptId, title, teachingGoal, groups } = params
  const offset = ((groups.length - 1) * GROUP_SPACING) / 2

  const steps: SceneStep[] = groups.map((group, gi) => {
    const x = round(gi * GROUP_SPACING - offset)
    const color = GROUP_COLORS[gi % GROUP_COLORS.length]
    const headerPos: Vec3 = [x, 2.5, 0]
    const objects: SceneObject[] = [
      { type: 'node', id: `group-${gi}`, position: headerPos, radius: 0.75, color, text: group.label },
    ]
    group.items.forEach((item, ii) => {
      const pos: Vec3 = [x, round(2.5 - (ii + 1) * ITEM_SPACING * 1.6), 0]
      objects.push({ type: 'label', id: `group-${gi}-item-${ii}`, position: pos, text: item, color: ITEM_COLOR })
      objects.push({ type: 'path', id: `group-${gi}-line-${ii}`, points: [headerPos, pos], color: ITEM_COLOR })
    })
    return { narration: `${group.label}: ${group.description}`, objects }
  })

  return {
    id: `cell-comparison-${conceptId}`,
    title,
    sceneType: 'comparison',
    teachingGoal,
    cameraDistance: 18,
    ariaLabel: `A comparison of ${groups.length} categories for ${title}: ${groups.map((g) => g.label).join(' vs ')}.`,
    steps,
  }
}
