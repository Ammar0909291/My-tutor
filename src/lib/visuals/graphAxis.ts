/**
 * MATH-014 (2026-10-06, math.seq.arithmetic-series #367): "Sum of first n
 * terms of AP (a₁=3, d=2)" was drawn as a continuous parabola over n = −10…10,
 * so the graph showed a sum for a negative number of terms — exactly the
 * sequence-vs-function confusion the lesson teaches against. When the x-axis
 * counts something, the graph is a set of points at n = 1, 2, 3, … only.
 */
const COUNT_AXIS_RE = /\b(?:number of (?:terms|items|trials|steps|years|people|objects|students|days|months|terms?)|term (?:number|index)|\(count\)|count of|n(?:th)? term|position in (?:the )?sequence|index n)\b/i

export function isCountAxis(xLabel: string | null | undefined): boolean {
  return COUNT_AXIS_RE.test((xLabel ?? '').trim())
}

/** The integer n values (≥ 1) visible in [xMin, xMax], capped so a zoomed-out view stays readable. */
export function countAxisPoints(xMin: number, xMax: number, maxPoints = 60): number[] {
  const lo = Math.max(1, Math.ceil(xMin))
  const hi = Math.floor(xMax)
  if (hi < lo) return []
  const out: number[] = []
  const step = Math.max(1, Math.ceil((hi - lo + 1) / maxPoints))
  for (let n = lo; n <= hi; n += step) out.push(n)
  return out
}
