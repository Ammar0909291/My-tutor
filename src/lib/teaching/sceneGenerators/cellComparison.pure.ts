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
import { captionBeside, isBiologyScene, round } from './shared'

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
// Biology figures (see `isBiologyScene`) use the grid from THREE groups; every other subject keeps the original FIVE.
const GRID_FROM_GROUPS_BIO = 3
const GRID_FROM_GROUPS_LEGACY = 5
const GRID_COLUMN_SPACING = 6.5
const GRID_ROW_GAP_LEGACY = 1.8
const GRID_CAMERA_DISTANCE = 20

// Captions wrap to their COLUMN. A caption may use almost the whole canvas by
// default, so two columns of captions each as wide as the canvas cannot sit side
// by side: at 390px every two-group figure had its outer spheres cut off and its
// captions truncated, and containing them by moving the camera made the figure a
// dot. One or two columns share the width in halves; three share it in thirds.
const WRAP_TWO_COLUMNS = 0.42
const WRAP_THREE_COLUMNS = 0.28

function columnsFor(groupCount: number, gridFrom: number): number {
  return groupCount < gridFrom ? groupCount : Math.ceil(groupCount / 2)
}

// ── Biology: item spacing follows the caption, not a fixed pitch ───────────────────────────────────────────────
// Items used to sit a fixed 1.76 units apart however many lines their wrapped caption needed, so in a grid (three or
// more groups) a three-line caption ran into the next item and the next ROW's header (measured at 390px). A
// caption's height is estimated from its length and the width it may wrap to (greedy word wrap, ~3.2 characters
// per scene unit of width, one line ≈ 0.68 units), and the next item starts below it. The estimate is deliberately a
// little generous: a figure with spare room is better than one with captions on top of each other.
const CHARS_PER_UNIT = 3.2
const LINE_UNITS = 0.68
const SLOT_PAD = 0.62
/** Two-column grids (three or four groups) are spaced wider: their captions wrap to a column of this pitch. */
const GRID_TWO_COLUMN_SPACING = 10
/** Clearance for the next row's header caption, which sits above its sphere. */
const HEADER_CLEAR = 1.7

function estimateLines(text: string, charsPerLine: number): number {
  let lines = 1
  let width = 0
  for (const word of text.split(/\s+/)) {
    if (width === 0) width = word.length
    else if (width + 1 + word.length <= charsPerLine) width += 1 + word.length
    else { lines++; width = word.length }
  }
  return lines
}

/** Centre offsets (below the header) of each item's caption, and the bottom of the last one. */
function itemCenters(items: readonly string[], wrapUnits: number): { centers: number[]; bottom: number } {
  const charsPerLine = Math.max(8, Math.floor(wrapUnits * CHARS_PER_UNIT))
  const slots = items.map((t) => Math.max(ITEM_PITCH, estimateLines(t, charsPerLine) * LINE_UNITS + SLOT_PAD))
  const centers: number[] = []
  let c = ITEM_PITCH
  slots.forEach((slot, k) => {
    if (k > 0) c += (slots[k - 1] + slot) / 2
    centers.push(round(c))
  })
  return { centers, bottom: slots.length ? c + slots[slots.length - 1] / 2 : 0 }
}

interface GroupPlace { x: number; headerY: number }

function placeGroups(groups: readonly ComparisonGroup[], gridFrom: number, rowGap: number): GroupPlace[] {
  if (groups.length < gridFrom) {
    const offset = ((groups.length - 1) * GROUP_SPACING) / 2
    return groups.map((_, gi) => ({ x: round(gi * GROUP_SPACING - offset), headerY: 2.5 }))
  }
  const columns = Math.ceil(groups.length / 2)
  const maxItems = Math.max(...groups.map((g) => g.items.length))
  const rowHeight = (maxItems + 1) * ITEM_PITCH + rowGap
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

/** Biology: the same placement, with each row as tall as its tallest group's wrapped captions need. */
function placeGroupsBio(groups: readonly ComparisonGroup[], layouts: readonly { bottom: number }[]): GroupPlace[] {
  if (groups.length < GRID_FROM_GROUPS_BIO) {
    const offset = ((groups.length - 1) * GROUP_SPACING) / 2
    return groups.map((_, gi) => ({ x: round(gi * GROUP_SPACING - offset), headerY: 2.5 }))
  }
  const columns = Math.ceil(groups.length / 2)
  const pitch = columns <= 2 ? GRID_TWO_COLUMN_SPACING : GRID_COLUMN_SPACING
  const rows = Math.ceil(groups.length / columns)
  const rowHeights = Array.from({ length: rows }, (_, r) =>
    Math.max(...groups.slice(r * columns, (r + 1) * columns).map((_, k) => layouts[r * columns + k].bottom)) + HEADER_CLEAR + 0.8)
  const total = rowHeights.reduce((a, b) => a + b, 0)
  let y = total / 2
  const rowTop = rowHeights.map((h) => { const t = y; y -= h; return t })
  return groups.map((_, gi) => {
    const row = Math.floor(gi / columns)
    const col = gi % columns
    const inRow = Math.min(columns, groups.length - row * columns)
    return { x: round(col * pitch - ((inRow - 1) * pitch) / 2), headerY: round(rowTop[row]) }
  })
}

export function buildCellComparisonScene(params: CellComparisonParams): SceneSpec {
  const { conceptId, title, teachingGoal, groups } = params
  const bio = isBiologyScene(conceptId)
  const gridFrom = bio ? GRID_FROM_GROUPS_BIO : GRID_FROM_GROUPS_LEGACY
  const columnPitch = groups.length < gridFrom ? GROUP_SPACING : (columnsFor(groups.length, gridFrom) <= 2 ? GRID_TWO_COLUMN_SPACING : GRID_COLUMN_SPACING)
  const wrapUnits = round(columnPitch - 0.8)
  const layouts = groups.map((g) => itemCenters(g.items, wrapUnits))
  const places = bio ? placeGroupsBio(groups, layouts) : placeGroups(groups, gridFrom, GRID_ROW_GAP_LEGACY)
  // Biology captions wrap to their column: a share of the canvas AND the column pitch. A share of the canvas alone
  // let desktop captions run wider than the pitch, and the next column's captions interleaved with them.
  const wrapFraction = columnsFor(groups.length, gridFrom) <= 2 ? WRAP_TWO_COLUMNS : WRAP_THREE_COLUMNS
  const captionWrap = { labelWrapFraction: wrapFraction, labelWrapUnits: wrapUnits }

  const steps: SceneStep[] = groups.map((group, gi) => {
    const { x, headerY } = places[gi]
    const color = GROUP_COLORS[gi % GROUP_COLORS.length]
    const headerPos: Vec3 = [x, headerY, 0]
    const objects: SceneObject[] = [
      // Biology: the group's name goes above its sphere, clear of it and of the item column below.
      { type: 'node', id: `group-${gi}`, position: headerPos, radius: GROUP_RADIUS, color, text: group.label, ...(bio ? { properties: { ...captionBeside(GROUP_RADIUS, 'above'), ...captionWrap } } : {}) },
    ]
    // Biology: a short stub hanging from the sphere ties the column to its header. It stops clear of the first
    // caption: a connector run to each caption's centre was MEASURED striking through every caption above the last.
    if (bio && group.items.length > 0) {
      objects.push({ type: 'path', id: `group-${gi}-stub`, points: [headerPos, [x, round(headerY - GROUP_RADIUS - 0.45), 0] as Vec3], color: ITEM_COLOR })
    }
    group.items.forEach((item, ii) => {
      const pos: Vec3 = [x, round(headerY - (bio ? layouts[gi].centers[ii] : (ii + 1) * ITEM_PITCH)), 0]
      objects.push({ type: 'label', id: `group-${gi}-item-${ii}`, position: pos, text: item, color: ITEM_COLOR, ...(bio ? { properties: captionWrap } : {}) })
      if (!bio) objects.push({ type: 'path', id: `group-${gi}-line-${ii}`, points: [headerPos, pos], color: ITEM_COLOR })
    })
    return { narration: `${group.label}: ${group.description}`, objects }
  })

  return {
    id: `cell-comparison-${conceptId}`,
    title,
    sceneType: 'comparison',
    teachingGoal,
    cameraDistance: groups.length >= gridFrom ? GRID_CAMERA_DISTANCE : 18,
    ariaLabel: `A comparison of ${groups.length} categories for ${title}: ${groups.map((g) => g.label).join(' vs ')}.`,
    steps,
  }
}
