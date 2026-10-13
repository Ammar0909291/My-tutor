/**
 * Where a label goes, chosen from candidates by how much room each has — for generators whose arrows and rays
 * fan out at very different angles over a control range, so no single hand-placed spot is clear everywhere.
 *
 * Pure arithmetic over the figure's own geometry (no layout engine, no DOM): a label is a box (~0.085 scene units per
 * character each side of its centre, ~0.3 high), the geometry is a set of segments, and the other labels are boxes.
 * The first candidate is the author's preferred spot; it is kept whenever it is clear, so a figure's textbook case keeps
 * its hand-tuned layout and only the states that would collide move.
 */

export type Seg = [[number, number], [number, number]]
export interface PlacedLabel { at: [number, number]; text: string }

const HALF_PER_CHAR = 0.085
const HALF_HEIGHT = 0.3

/** Smallest gap between a label box centred at `c` and any sampled point of the segments (0 when they touch). */
export function boxRoom(c: [number, number], text: string, segments: Seg[]): number {
  const hw = text.length * HALF_PER_CHAR
  let m = Infinity
  for (const [a, b] of segments) for (let i = 0; i <= 24; i++) {
    const t = i / 24
    const q: [number, number] = [a[0] + t * (b[0] - a[0]), a[1] + t * (b[1] - a[1])]
    m = Math.min(m, Math.hypot(Math.max(Math.abs(q[0] - c[0]) - hw, 0), Math.max(Math.abs(q[1] - c[1]) - HALF_HEIGHT, 0)))
  }
  return m
}

/** Do two label boxes (with a small margin) overlap? */
export function boxesOverlap(c: [number, number], text: string, other: PlacedLabel): boolean {
  const hw = text.length * HALF_PER_CHAR + other.text.length * HALF_PER_CHAR + 0.15
  return Math.abs(c[0] - other.at[0]) < hw && Math.abs(c[1] - other.at[1]) < 2 * HALF_HEIGHT + 0.1
}

/**
 * The first candidate that clears every segment by `minClear` and every placed label; otherwise the candidate with the
 * most room among those that do not land on a placed label (all of them, when none is free).
 */
export function pickLabelSpot(
  candidates: Array<[number, number]>,
  text: string,
  segments: Seg[],
  placed: PlacedLabel[] = [],
  minClear = 0.3,
): [number, number] {
  const free = (c: [number, number]) => placed.every((p) => !boxesOverlap(c, text, p))
  const room = (c: [number, number]) => boxRoom(c, text, segments)
  const clear = candidates.find((c) => free(c) && room(c) >= minClear)
  if (clear) return clear
  const open = candidates.filter(free)
  const pool = open.length ? open : candidates
  return pool.reduce((a, b) => (room(b) > room(a) ? b : a))
}

/** Candidate spots around an anchor, nearest-preferred order given by `prefer` (compass keys), at the label's own half-size plus `gap`. */
export function around(anchor: [number, number], text: string, prefer: Array<'e' | 'w' | 'n' | 's' | 'ne' | 'nw' | 'se' | 'sw'>, gap = 0.28): Array<[number, number]> {
  const hw = text.length * HALF_PER_CHAR + gap, hh = HALF_HEIGHT + gap * 0.6
  const d = { e: [hw, 0], w: [-hw, 0], n: [0, hh], s: [0, -hh], ne: [hw * 0.8, hh], nw: [-hw * 0.8, hh], se: [hw * 0.8, -hh], sw: [-hw * 0.8, -hh] } as const
  return prefer.map((k) => [anchor[0] + d[k][0], anchor[1] + d[k][1]] as [number, number])
}
