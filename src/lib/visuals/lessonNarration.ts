// Lesson Narration source model — Visual Learning Sprint U, Task 2.
// Pure types + functions representing narrated lesson steps. NO AI generation,
// NO prompt changes, NO Tutor Max changes. Narration text is developer-authored
// (or, in a future sprint, supplied by a real narration source) — never produced
// here at runtime. See docs/LIVE_NARRATION_VISUAL_INTEGRATION_AUDIT.md.

import type { LessonTimeline } from './lessonSegments'

/** One narrated lesson beat, aligned to a 1-based animation step. */
export interface NarrationSegment {
  id: string
  text: string
  step: number
}

/** An ordered narration for one visual. */
export interface LessonNarration {
  visualType?: string
  segments: NarrationSegment[]
}

/** Builds a LessonNarration from a flat list of lines (line i → step i+1). Pure. */
export function buildLessonNarration(visualType: string, lines: string[]): LessonNarration {
  return {
    visualType,
    segments: lines.map((text, i) => ({ id: `${visualType}-narr-${i + 1}`, text, step: i + 1 })),
  }
}

/** Number of narration segments. */
export function narrationSegmentCount(narration: LessonNarration): number {
  return narration.segments.length
}

/** Adapter to the Sprint S `LessonTimeline` so existing sync-plan functions apply unchanged. Pure. */
export function toLessonTimeline(narration: LessonNarration): LessonTimeline {
  return {
    visualType: narration.visualType,
    segments: narration.segments.map((s) => ({ id: s.id, narration: s.text, visualStep: s.step })),
  }
}

// Developer-authored per-step narration for visuals that have it. NOT AI-generated.
// One line per animation step (counts match VISUAL_STEP_COUNTS). Optional — a visual
// without an entry has no narration source and uses timer playback.
const AUTHORED_NARRATION: Record<string, string[]> = {
  number_line: ["Let's draw the number line.", 'Now add the tick marks.', 'Label each number.', 'Highlight zero — our reference point.'],
  fraction_bar: ['Draw the empty bars.', 'Fill the shaded parts.', 'Label each fraction.', 'Read the value inside each bar.'],
  percentage_grid: ['Draw the 10×10 grid.', 'Shade the filled cells.', 'Read the percentage.'],
  coordinate_plane: ['Draw the x and y axes.', 'Add the grid lines.', 'Label the tick marks.', 'Plot the point.', 'Read off its coordinates.'],
  geometry_shape: ['Draw the shape outlines.', 'Mark the dimensions.', 'Name each shape.', 'State the formula.'],
  food_chain: ['Begin with the Sun.', 'Energy flows to the grass.', 'The grasshopper eats the grass.', 'The frog eats the grasshopper.', 'The snake tops the chain.'],
  water_cycle: ['Start with the ground and mountain.', 'Add the ocean.', 'The sun heats the water.', 'Clouds form above.', 'Water evaporates upward.', 'Rain falls and runs back.'],
  solar_system: ['Draw the orbits.', 'Place the sun.', 'Add the planets.'],
  force_diagram: ['Draw the ground and object.', 'Add the applied force.', 'Add friction.', 'Add weight.', 'Add the normal force.'],
  circuit_diagram: ['Lay the wires.', 'Add the battery.', 'Add the switch.', 'Add the bulb.', 'Add the resistor and current.'],
}

/**
 * Returns the authored narration for a visual type, or null if none exists.
 * Pure, read-only. The caller decides whether to use it (narration mode) or
 * fall back to timer mode.
 */
export function getAuthoredNarration(visualType?: string | null): LessonNarration | null {
  if (!visualType) return null
  const lines = AUTHORED_NARRATION[visualType]
  return lines ? buildLessonNarration(visualType, lines) : null
}
