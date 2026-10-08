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
import { captionBeside, round } from './shared'

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

// Six, not four: nine Biology comparisons have five or six groups (the five
// kingdoms, six modes of asexual reproduction, six invertebrate phyla), and
// with four colours the fifth group was painted the first group's blue — two
// unrelated categories the figure then claimed were the same kind of thing.
// The first four are unchanged, so every figure of four or fewer groups is
// byte-identical.
const GROUP_COLORS = ['#4C8DFF', '#FFB020', '#39C46E', '#EF4444', '#B47CFF', '#2EC4B6'] as const
const ITEM_COLOR = '#9AA5B8'
const GROUP_RADIUS = 0.75
const GROUP_SPACING = 5.5
const ITEM_SPACING = 1.1
const ITEM_PITCH = ITEM_SPACING * 1.6

// Five or more groups go on two rows. In one row, six columns 5.5 apart spanned
// 27.5 units: MEASURED in Chromium (2026-09-28, bio.repro.asexual-reproduction
// and bio.div.invertebrate-diversity-major-phyla) the item labels overlapped
// each other and the connectors at 1200px, and at 390px the outer columns were
// cut off by the frame's edge. Three columns 6.5 apart span 13 units instead,
// with more width per label, and the camera steps back from 18 to 20 so the
// outer labels keep a margin at phone width (7.5 still clipped "Roundworms" at
// 390px). Four or fewer groups keep the single row unchanged, byte for byte.
const GRID_FROM_GROUPS = 3
const GRID_COLUMN_SPACING = 6.5
// Room for the second row's header caption (it sits above its sphere) between the
// last caption of the row above and the sphere below it.
const GRID_ROW_GAP = 3.4
const GRID_CAMERA_DISTANCE = 20

// Captions wrap to their COLUMN. A caption may use almost the whole canvas by
// default, so two columns of captions each as wide as the canvas cannot sit side
// by side: at 390px every two-group figure had its outer spheres cut off and its
// captions truncated, and containing them by moving the camera made the figure a
// dot. One or two columns share the width in halves; three share it in thirds.
const WRAP_TWO_COLUMNS = 0.42
const WRAP_THREE_COLUMNS = 0.28

function columnsFor(groupCount: number): number {
  return groupCount < GRID_FROM_GROUPS ? groupCount : Math.ceil(groupCount / 2)
}

interface GroupPlace { x: number; headerY: number }

function placeGroups(groups: readonly ComparisonGroup[]): GroupPlace[] {
  if (groups.length < GRID_FROM_GROUPS) {
    const offset = ((groups.length - 1) * GROUP_SPACING) / 2
    return groups.map((_, gi) => ({ x: round(gi * GROUP_SPACING - offset), headerY: 2.5 }))
  }
  const columns = Math.ceil(groups.length / 2)
  const maxItems = Math.max(...groups.map((g) => g.items.length))
  const rowHeight = (maxItems + 1) * ITEM_PITCH + GRID_ROW_GAP
  // Centre the block vertically: first header to last item.
  const top = (rowHeight + maxItems * ITEM_PITCH) / 2
  return groups.map((_, gi) => {
    const row = Math.floor(gi / columns)
    const col = gi % columns
    const inRow = Math.min(columns, groups.length - row * columns)
    const offset = ((inRow - 1) * GRID_COLUMN_SPACING) / 2
    return { x: round(col * GRID_COLUMN_SPACING - offset), headerY: round(top - row * rowHeight) }
  })
}

export function buildCellComparisonScene(params: CellComparisonParams): SceneSpec {
  const { conceptId, title, teachingGoal, groups } = params
  const places = placeGroups(groups)
  const wrapFraction = columnsFor(groups.length) <= 2 ? WRAP_TWO_COLUMNS : WRAP_THREE_COLUMNS
  // A caption is also no wider than ITS COLUMN: a share of the canvas alone let desktop captions run wider than
  // the column pitch, and the next column's captions interleaved with them line by line.
  const columnPitch = groups.length < GRID_FROM_GROUPS ? GROUP_SPACING : GRID_COLUMN_SPACING
  const captionWrap = { labelWrapFraction: wrapFraction, labelWrapUnits: round(columnPitch - 0.8) }

  const steps: SceneStep[] = groups.map((group, gi) => {
    const { x, headerY } = places[gi]
    const color = GROUP_COLORS[gi % GROUP_COLORS.length]
    const headerPos: Vec3 = [x, headerY, 0]
    const objects: SceneObject[] = [
      // The group's name goes above its sphere, clear of it and of the item column below.
      { type: 'node', id: `group-${gi}`, position: headerPos, radius: GROUP_RADIUS, color, text: group.label, properties: { ...captionBeside(GROUP_RADIUS, 'above'), ...captionWrap } },
    ]
    // A short stub hanging from the sphere ties the column to its header. It stops
    // clear of the first caption: a connector run to each caption's centre was
    // MEASURED striking through every caption above the last.
    if (group.items.length > 0) {
      objects.push({ type: 'path', id: `group-${gi}-stub`, points: [headerPos, [x, round(headerY - GROUP_RADIUS - 0.45), 0] as Vec3], color: ITEM_COLOR })
    }
    group.items.forEach((item, ii) => {
      const pos: Vec3 = [x, round(headerY - (ii + 1) * ITEM_PITCH), 0]
      objects.push({ type: 'label', id: `group-${gi}-item-${ii}`, position: pos, text: item, color: ITEM_COLOR, properties: captionWrap })
    })
    return { narration: `${group.label}: ${group.description}`, objects }
  })

  return {
    id: `cell-comparison-${conceptId}`,
    title,
    sceneType: 'comparison',
    teachingGoal,
    cameraDistance: groups.length >= GRID_FROM_GROUPS ? GRID_CAMERA_DISTANCE : 18,
    ariaLabel: `A comparison of ${groups.length} categories for ${title}: ${groups.map((g) => g.label).join(' vs ')}.`,
    steps,
  }
}
