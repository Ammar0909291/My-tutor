/**
 * Core school-mathematics figures — batch 15 of the mathematics visual campaign
 * (2026-10-12): sets (membership, subset, proper subset, equality, union, intersection,
 * difference, complement, Venn diagrams, the Hasse diagram of divisibility) plus the two
 * number-system concepts left in the foundations, irrational numbers and complex numbers.
 *
 * A set is drawn as a circle with its elements as numerals inside it; which elements a circle
 * "holds" is decided by GEOMETRY (the numeral sits inside the circle or it does not), so the
 * test file can read every set back from the drawn positions. Same rules as batches 1-14: one
 * visual language from visualDesign.ts, labels are names not sentences (marks of 1-2
 * characters are free), steps are cumulative, coordinates stay inside +-5, at most 50 objects
 * per step, nothing the figure audit rejects, and every number drawn comes from the constants
 * and pure helpers exported here.
 */

import type { SceneSpec, SceneObject } from '@/lib/teaching/sceneSpec'
import { ROLE, arrow, curve, dot, label, line } from './visualDesign'
import { P, NO_STAGE, framed, guide, mathAxes, polyLines, arcPts, type XY, type V3 } from './mathSceneKit'

// ── shared helpers ───────────────────────────────────────────────────────────

type El = readonly [number, readonly [number, number]]
type Circ = { readonly c: readonly [number, number]; readonly r: number }

/** True when the point lies strictly inside the circle (how a figure's set membership is read back). */
export const inCircle = (p: readonly [number, number], k: Circ) => Math.hypot(p[0] - k.c[0], p[1] - k.c[1]) < k.r
const circleLine = (k: Circ, color: string): SceneObject => curve(arcPts(k.c[0], k.c[1], k.r, 0, 360, 96), color)
/** A coloured ring round a point (used on the Hasse diagram, where the dots are the nodes). */
const halo = (p: readonly [number, number], color: string, r = 0.27): SceneObject => curve(arcPts(p[0], p[1], r, 0, 360, 32), color)
/** An element: a small dot at its position with its numeral beside it (labels are pushed off obstacles, so the numeral never sits ON a mark). */
const labelOffset = (n: number) => 0.3 + 0.12 * String(n).length
const elems = (els: readonly El[], color: string = ROLE.ink, side = 1): SceneObject[] =>
  els.flatMap(([n, p]) => [dot(P(p[0], p[1]), color, 0.08), label(String(n), P(p[0] + side * labelOffset(n), p[1]), color, 'primary')])
/** The highlight on an element: a larger coloured dot that swallows the small one. */
const mark = (p: readonly [number, number], color: string): SceneObject => dot(P(p[0], p[1]), color, 0.2)
const posOf = (els: readonly El[], n: number): readonly [number, number] => els.find((e) => e[0] === n)![1]
const marks = (els: readonly El[], ns: readonly number[], color: string): SceneObject[] => ns.map((n) => mark(posOf(els, n), color))
const boxLines = (b: { x0: number; x1: number; y0: number; y1: number }): SceneObject[] => polyLines([[b.x0, b.y0], [b.x1, b.y0], [b.x1, b.y1], [b.x0, b.y1]], ROLE.reference, 0.02)
const f2 = (n: number) => (Math.round(n * 100) / 100).toFixed(2)

// ── the two-circle Venn frame shared by union / intersection / difference ────

/** U = {1, …, 10}; A = {1, 2, 3, 4, 5} (blue), B = {4, 5, 6, 7} (red). Membership is the numeral's position. */
export const VEN = {
  A: { c: [-0.9, 0.1], r: 1.7 } as Circ,
  B: { c: [0.9, 0.1], r: 1.7 } as Circ,
  box: { x0: -4.1, x1: 4.1, y0: -2.7, y1: 2.5 },
  els: [
    [1, [-1.9, 0.9]], [2, [-2.1, 0.1]], [3, [-1.6, -0.8]], [4, [0, 0.7]], [5, [0, -0.5]],
    [6, [1.7, 0.7]], [7, [1.7, -0.6]], [8, [-3.4, -1.8]], [9, [0.1, -2.1]], [10, [3.0, -1.3]],
  ] as readonly El[],
  A_SET: [1, 2, 3, 4, 5] as readonly number[],
  B_SET: [4, 5, 6, 7] as readonly number[],
} as const

function vennBase(): SceneObject[] {
  return [
    ...boxLines(VEN.box),
    circleLine(VEN.A, ROLE.output), circleLine(VEN.B, ROLE.input),
    label('A', P(-2.6, 1.85), ROLE.output, 'heading'), label('B', P(2.6, 1.85), ROLE.input, 'heading'),
    label('U', P(-3.75, 2.15), ROLE.reference, 'primary'),
    ...elems(VEN.els),
  ]
}

/** Half-angle (degrees) of the arc of each circle that bounds the lens A ∩ B: cos α = (half the centre distance) / r. */
export const lensHalfAngle = () => (Math.acos((VEN.B.c[0] - VEN.A.c[0]) / 2 / VEN.A.r) * 180) / Math.PI
/** The lens A ∩ B outlined just inside both circles: A's right arc, then B's left arc, closing at the two corner points. */
export const LENS_INSET = 0.07
export function lensOutline(): V3[] {
  const { A, B } = VEN, a = lensHalfAngle(), r = A.r - LENS_INSET
  return [...arcPts(A.c[0], A.c[1], r, -a, a, 20), ...arcPts(B.c[0], B.c[1], r, 180 - a, 180 + a, 20)]
}
/** Exact area of the lens of two equal circles (radius r, centres D apart). */
export const lensArea = (r: number, D: number) => 2 * r * r * Math.acos(D / (2 * r)) - (D / 2) * Math.sqrt(4 * r * r - D * D)

// ── 1. Set ───────────────────────────────────────────────────────────────────

/** A = {2, 4, 6, 8, 10} (the even numbers up to 10); 3, 7, 9 are not members. */
export const SETF = {
  A: { c: [-0.4, 0.1], r: 1.9 } as Circ,
  inside: [[2, [-1.2, 0.9]], [4, [0.1, 1.0]], [6, [-1.3, -0.4]], [8, [0.5, -0.2]], [10, [-0.5, -1.1]]] as readonly El[],
  outside: [[3, [2.6, 1.5]], [7, [3.3, -0.3]], [9, [2.3, -1.8]]] as readonly El[],
}

/** KG: a set is a collection of distinct objects; x ∈ A says x is a member, x ∉ A that it is not. */
export function buildSetScene(): SceneSpec {
  return framed(raw_buildSetScene())
}
function raw_buildSetScene(): SceneSpec {
  const all = [...SETF.inside, ...SETF.outside]
  return {
    id: 'math-set',
    title: 'A set and its members',
    sceneType: 'diagram',
    cameraDistance: 11,
    teachingGoal: 'Show what a set is: the circle A = {2, 4, 6, 8, 10} holds exactly its five members, the even numbers up to 10; 4 ∈ A (a member) and 7 ∉ A (not a member); the rule "even and at most 10" decides membership.',
    ariaLabel:
      'A blue circle labelled A containing the numbers 2, 4, 6, 8 and 10, and outside the circle the numbers 3, 7 and 9. A green dot marks 4, which is inside the circle, labelled 4 is a member of A; a red dot marks 7, which is outside, labelled 7 is not a member of A. A caption gives the rule even and at most 10, and the size of A is 5.',
    stage: NO_STAGE,
    steps: [
      { narration: 'A set is a collection of distinct objects, its members. Here the circle A holds the numbers 2, 4, 6, 8, 10; the numbers 3, 7, 9 are outside it.', objects: [circleLine(SETF.A, ROLE.output), label('A', P(-2.5, 1.9), ROLE.output, 'heading'), ...elems(all), label('A = {2, 4, 6, 8, 10}', P(0, -2.7), ROLE.output, 'primary')] },
      { narration: 'Membership is a yes/no question about each object: 4 is inside the circle, so 4 ∈ A (4 is a member of A); 7 is outside, so 7 ∉ A.', objects: [mark(posOf(SETF.inside, 4), ROLE.result), mark(posOf(SETF.outside, 7), ROLE.input), label('4 ∈ A', P(0.3, 2.45), ROLE.result, 'primary'), label('7 ∉ A', P(3.3, 0.45), ROLE.input, 'primary')] },
      { narration: 'A set can also be given by a rule: "even number, at most 10" picks out exactly the five numbers in the circle, so |A| = 5 — and none of 3, 7, 9, which are odd.', objects: [label('rule: even, at most 10', P(0, -3.4), ROLE.aid, 'primary'), label('|A| = 5', P(-0.4, -2.2), ROLE.ink, 'primary')] },
    ],
  }
}

// ── 2. Subset ────────────────────────────────────────────────────────────────

/** Left: A = {2, 4} sits inside B = {1, …, 6}. Right: C = {2, 7} crosses B's edge (7 ∈ C, 7 ∉ B). */
export const SUB = {
  left: { B: { c: [-2.7, 0], r: 1.9 } as Circ, A: { c: [-3.3, -0.35], r: 1.0 } as Circ },
  right: { B: { c: [1.9, -0.4], r: 1.9 } as Circ, C: { c: [1.9, 1.6], r: 1.0 } as Circ },
  leftEls: [[2, [-3.6, -0.05]], [4, [-3.5, -0.7]], [1, [-3.3, 1.1]], [3, [-2.0, 0.8]], [5, [-2.1, -0.8]], [6, [-1.9, -0.1]]] as readonly El[],
  rightEls: [[2, [1.7, 1.1]], [7, [1.7, 2.1]], [1, [0.6, 0.2]], [3, [1.5, -1.2]], [4, [2.6, -0.2]], [5, [0.4, -1.0]], [6, [2.7, -1.2]]] as readonly El[],
}

/** KG: A ⊆ B when every element of A is also an element of B. */
export function buildSubsetScene(): SceneSpec {
  return framed(raw_buildSubsetScene())
}
function raw_buildSubsetScene(): SceneSpec {
  const { left, right } = SUB
  return {
    id: 'math-subset',
    title: 'Subset: every element of A is in B',
    sceneType: 'diagram',
    cameraDistance: 12,
    teachingGoal: 'Show A ⊆ B: A = {2, 4} lies entirely inside B = {1, 2, 3, 4, 5, 6}, so each element of A is an element of B; contrast C = {2, 7}, which sticks out of B (7 ∈ C but 7 ∉ B), so C is not a subset of B.',
    ariaLabel:
      'Left: a large circle B holding the numbers 1 to 6 with a small circle A drawn entirely inside it around the numbers 2 and 4, labelled A is a subset of B. Right: the same circle B and a circle C that crosses its top edge, holding 2 inside B and 7 outside B; 7 has a red dot and the caption says C is not a subset of B because 7 is in C but not in B.',
    stage: NO_STAGE,
    steps: [
      { narration: 'B = {1, 2, 3, 4, 5, 6} is the big circle. A = {2, 4} is a small circle drawn entirely inside it.', objects: [circleLine(left.B, ROLE.input), circleLine(left.A, ROLE.output), label('B', P(-4.5, 1.5), ROLE.input, 'heading'), ...elems(SUB.leftEls), label('A = {2, 4}', P(-2.7, -2.5), ROLE.output, 'primary'), label('B = {1, …, 6}', P(-2.7, -3.1), ROLE.input, 'primary')] },
      { narration: 'Check each element of A: 2 ∈ B and 4 ∈ B. Nothing in A is missing from B, so A ⊆ B (A is a subset of B).', objects: [...marks(SUB.leftEls, [2, 4], ROLE.result), label('A ⊆ B', P(-2.7, -3.8), ROLE.result, 'primary')] },
      { narration: 'Compare C = {2, 7}: 2 ∈ B but 7 is outside the circle B. One element of C that is not in B is enough to break the subset: C ⊄ B.', objects: [circleLine(right.B, ROLE.input), circleLine(right.C, ROLE.aid), label('B', P(0.0, 1.6), ROLE.input, 'heading'), label('C', P(3.4, 2.4), ROLE.aid, 'heading'), ...elems(SUB.rightEls), mark(posOf(SUB.rightEls, 7), ROLE.input), label('C = {2, 7}', P(1.9, -2.9), ROLE.aid, 'primary'), label('C ⊄ B', P(1.9, -3.5), ROLE.input, 'primary'), label('7 ∈ C, 7 ∉ B', P(1.9, -4.1), ROLE.input, 'primary')] },
    ],
  }
}

// ── 3. Proper subset ─────────────────────────────────────────────────────────

/** A = {1, 2} ⊂ B = {1, 2, 3} ⊂ C = {1, 2, 3, 4}: each circle misses at least one element of the next. */
export const PSB = {
  C: { c: [0, 0], r: 2.4 } as Circ, B: { c: [-0.4, -0.1], r: 1.65 } as Circ, A: { c: [-0.75, -0.25], r: 0.95 } as Circ,
  els: [[1, [-1.15, 0.15]], [2, [-0.6, -0.55]], [3, [0.5, 0.5]], [4, [1.5, 0.9]]] as readonly El[],
}

/** KG: A ⊂ B (proper) means A ⊆ B and A ≠ B: B has at least one element A lacks. */
export function buildProperSubsetScene(): SceneSpec {
  return framed(raw_buildProperSubsetScene())
}
function raw_buildProperSubsetScene(): SceneSpec {
  return {
    id: 'math-proper-subset',
    title: 'Proper subset: B has more than A',
    sceneType: 'diagram',
    cameraDistance: 11,
    teachingGoal: 'Show a proper subset: A = {1, 2} ⊂ B = {1, 2, 3} ⊂ C = {1, 2, 3, 4}; each circle lies inside the next AND misses an element of it (3 ∈ B, 3 ∉ A; 4 ∈ C, 4 ∉ B), so the inclusions are strict and the sizes grow 2 < 3 < 4.',
    ariaLabel:
      'Three nested circles. The smallest, A, holds the numbers 1 and 2. The middle circle B also holds 3, which has a red dot because it is in B but not in A. The largest circle C also holds 4, which has a red dot because it is in C but not in B. Captions read A is a proper subset of B, which is a proper subset of C, and the sizes 2, 3, 4 increase.',
    stage: NO_STAGE,
    steps: [
      { narration: 'Three sets, each inside the next: A = {1, 2} in B = {1, 2, 3} in C = {1, 2, 3, 4}.', objects: [circleLine(PSB.C, ROLE.aid), circleLine(PSB.B, ROLE.input), circleLine(PSB.A, ROLE.output), ...elems(PSB.els), label('A = {1, 2}', P(0, -3.0), ROLE.output, 'primary'), label('B = {1, 2, 3}', P(0, -3.6), ROLE.input, 'primary'), label('C = {1, 2, 3, 4}', P(0, -4.2), ROLE.aid, 'primary')] },
      { narration: 'Proper means strictly smaller: 3 ∈ B but 3 ∉ A, and 4 ∈ C but 4 ∉ B. B and C each have an element the smaller set lacks, so A ⊂ B and B ⊂ C (not just ⊆).', objects: [mark(posOf(PSB.els, 3), ROLE.input), mark(posOf(PSB.els, 4), ROLE.input), label('3 ∈ B, 3 ∉ A', P(2.6, 0.2), ROLE.input, 'primary'), label('4 ∈ C, 4 ∉ B', P(2.6, 1.5), ROLE.input, 'primary')] },
      { narration: 'So the sizes strictly increase, |A| = 2 < |B| = 3 < |C| = 4, and a proper subset is never equal to the set it sits in: A ⊂ B ⊂ C.', objects: [label('A ⊂ B ⊂ C', P(3.5, -2.4), ROLE.result, 'primary'), label('sizes 2 < 3 < 4', P(3.4, -3.1), ROLE.ink, 'primary')] },
    ],
  }
}

// ── 4. Set equality ──────────────────────────────────────────────────────────

/** Top: A = {1, 2, 3} and B = {3, 1, 2}: same elements, shuffled. Bottom: A and C = {1, 2, 4}: 3 and 4 have no partner. */
export const EQL = {
  r: 1.35,
  A1: { c: [-2.6, 1.8], r: 1.35 } as Circ, B: { c: [2.6, 1.8], r: 1.35 } as Circ,
  A2: { c: [-2.6, -2.1], r: 1.35 } as Circ, C: { c: [2.6, -2.1], r: 1.35 } as Circ,
  A1els: [[1, [-2.4, 2.45]], [2, [-2.4, 1.8]], [3, [-2.4, 1.15]]] as readonly El[],
  Bels: [[3, [2.4, 2.45]], [1, [2.4, 1.8]], [2, [2.4, 1.15]]] as readonly El[],
  A2els: [[1, [-2.4, -1.45]], [2, [-2.4, -2.1]], [3, [-2.4, -2.75]]] as readonly El[],
  Cels: [[4, [2.4, -1.45]], [1, [2.4, -2.1]], [2, [2.4, -2.75]]] as readonly El[],
}
/** The (from, to) pairs of equal numerals joined by a connector between two element columns. */
export function pairLines(a: readonly El[], b: readonly El[]): Array<[XY, XY, number]> {
  const out: Array<[XY, XY, number]> = []
  for (const [n, pa] of a) { const q = b.find((e) => e[0] === n); if (q) out.push([[pa[0], pa[1]], [q[1][0], q[1][1]], n]) }
  return out
}

/** KG: A = B when they have exactly the same elements; order and repetition are irrelevant. */
export function buildSetEqualityScene(): SceneSpec {
  return framed(raw_buildSetEqualityScene())
}
function raw_buildSetEqualityScene(): SceneSpec {
  const top = pairLines(EQL.A1els, EQL.Bels), bottom = pairLines(EQL.A2els, EQL.Cels)
  return {
    id: 'math-set-equality',
    title: 'Set equality: same elements, any order',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show A = B when the sets have exactly the same elements: A = {1, 2, 3} and B = {3, 1, 2} pair up element for element whatever the order, while A and C = {1, 2, 4} do not (3 ∈ A has no partner in C, 4 ∈ C has none in A).',
    ariaLabel:
      'Top row: circle A holding 1, 2, 3 and circle B holding 3, 1, 2 in a different order, with three green lines each joining a number in A to the same number in B; caption A equals B, same elements in any order. Bottom row: circle A again and circle C holding 4, 1, 2; only the 1s and the 2s are joined, the 3 in A and the 4 in C have red dots and no partner; caption A is not equal to C.',
    stage: NO_STAGE,
    steps: [
      { narration: 'Two sets written in different orders: A = {1, 2, 3} and B = {3, 1, 2}. Order is not part of what a set is.', objects: [circleLine(EQL.A1, ROLE.output), circleLine(EQL.B, ROLE.input), label('A', P(-4.6, 1.8), ROLE.output, 'heading'), label('B', P(4.6, 1.8), ROLE.input, 'heading'), ...elems(EQL.A1els, ROLE.ink, -1), ...elems(EQL.Bels)] },
      { narration: 'Join every element of A to the same element of B: all three pair up with none left over, so A and B have exactly the same elements — A = B (equivalently A ⊆ B and B ⊆ A).', objects: [...top.map(([a, b]) => line(P(a[0], a[1]), P(b[0], b[1]), ROLE.result, 0.035)), label('A = B: same elements, any order', P(0, 3.7), ROLE.result, 'primary')] },
      { narration: 'Now A against C = {1, 2, 4}: 1 and 2 pair up, but 3 ∈ A has no partner in C and 4 ∈ C has none in A. One unmatched element is enough: A ≠ C.', objects: [circleLine(EQL.A2, ROLE.output), circleLine(EQL.C, ROLE.aid), label('A', P(-4.6, -2.1), ROLE.output, 'heading'), label('C', P(4.6, -2.1), ROLE.aid, 'heading'), ...elems(EQL.A2els, ROLE.ink, -1), ...elems(EQL.Cels), ...bottom.map(([a, b]) => line(P(a[0], a[1]), P(b[0], b[1]), ROLE.result, 0.035)), mark(posOf(EQL.A2els, 3), ROLE.input), mark(posOf(EQL.Cels, 4), ROLE.input), label('A ≠ C: 3 ∉ C, 4 ∉ A', P(0, -4.3), ROLE.input, 'primary')] },
    ],
  }
}

// ── 5-7. Union, intersection, difference (shared Venn frame) ─────────────────

/** KG: A ∪ B is everything in A or in B (or both); |A ∪ B| = |A| + |B| − |A ∩ B|. */
export function buildUnionScene(): SceneSpec {
  return framed(raw_buildUnionScene())
}
function raw_buildUnionScene(): SceneSpec {
  return {
    id: 'math-union',
    title: 'Union: in A or in B',
    sceneType: 'diagram',
    cameraDistance: 12,
    teachingGoal: 'Show A ∪ B for A = {1, 2, 3, 4, 5} and B = {4, 5, 6, 7} inside U = {1, …, 10}: the union is every element in at least one circle, {1, 2, 3, 4, 5, 6, 7}; elements in both (4 and 5) are counted once, so |A ∪ B| = 5 + 4 − 2 = 7.',
    ariaLabel:
      'A blue circle A and a red circle B overlapping inside a rectangle of the numbers 1 to 10. A holds 1 to 5 and B holds 4 to 7, with 4 and 5 in the overlap; 8, 9 and 10 are outside both. In the second step the seven numbers 1 to 7 get green dots: the union. The count is 5 plus 4 minus 2, which is 7.',
    stage: NO_STAGE,
    steps: [
      { narration: 'Inside the universe U = {1, …, 10}: A = {1, 2, 3, 4, 5} (blue) and B = {4, 5, 6, 7} (red). The numbers 4 and 5 are in both circles.', objects: [...vennBase(), label('A = {1, 2, 3, 4, 5}', P(-2.2, 3.1), ROLE.output, 'primary'), label('B = {4, 5, 6, 7}', P(2.4, 3.1), ROLE.input, 'primary')] },
      { narration: 'A ∪ B ("A union B") collects every element that is in A, or in B, or in both: mark them. That is {1, 2, 3, 4, 5, 6, 7}; 8, 9, 10 are in neither circle.', objects: [...marks(VEN.els, [1, 2, 3, 4, 5, 6, 7], ROLE.result), label('union: in A or in B', P(0, -3.3), ROLE.result, 'primary')] },
      { narration: 'Counting: adding |A| + |B| = 5 + 4 counts the shared elements 4 and 5 twice, so subtract the overlap once: |A ∪ B| = 5 + 4 − 2 = 7, matching the seven marked numbers.', objects: [label('count: 5 + 4 − 2 = 7', P(0, -4.0), ROLE.result, 'primary')] },
    ],
  }
}

/** KG: A ∩ B is what lies in both A and B. */
export function buildIntersectionScene(): SceneSpec {
  return framed(raw_buildIntersectionScene())
}
function raw_buildIntersectionScene(): SceneSpec {
  return {
    id: 'math-intersection',
    title: 'Intersection: in A and in B',
    sceneType: 'diagram',
    cameraDistance: 12,
    teachingGoal: 'Show A ∩ B for A = {1, 2, 3, 4, 5} and B = {4, 5, 6, 7}: the intersection is the lens where the circles overlap, containing exactly the elements in both, {4, 5}; its size follows from |A ∩ B| = |A| + |B| − |A ∪ B| = 5 + 4 − 7 = 2.',
    ariaLabel:
      'The overlapping blue circle A and red circle B in a rectangle of the numbers 1 to 10. The lens-shaped overlap is outlined in green and the numbers 4 and 5 inside it have green dots. The caption says intersection: in A and in B, and the count 5 plus 4 minus 7 equals 2.',
    stage: NO_STAGE,
    steps: [
      { narration: 'The same sets: A = {1, 2, 3, 4, 5} (blue) and B = {4, 5, 6, 7} (red) inside U = {1, …, 10}.', objects: [...vennBase()] },
      { narration: 'A ∩ B ("A intersect B") is only what is in A AND in B: the lens-shaped overlap. The numbers inside it, 4 and 5, are the intersection: {4, 5}.', objects: [curve(lensOutline(), ROLE.result), ...marks(VEN.els, [4, 5], ROLE.result), label('intersection: in A and in B', P(0, 3.1), ROLE.result, 'primary')] },
      { narration: 'Every element of A ∪ B is in A, in B, or both, so |A ∩ B| = |A| + |B| − |A ∪ B| = 5 + 4 − 7 = 2: exactly the two marked numbers.', objects: [label('count: 5 + 4 − 7 = 2', P(0, -3.3), ROLE.result, 'primary')] },
    ],
  }
}

/** KG: A ∖ B is what is in A but not in B — and in general A ∖ B ≠ B ∖ A. */
export function buildSetDifferenceScene(): SceneSpec {
  return framed(raw_buildSetDifferenceScene())
}
function raw_buildSetDifferenceScene(): SceneSpec {
  return {
    id: 'math-set-difference',
    title: 'Set difference: in A but not in B',
    sceneType: 'diagram',
    cameraDistance: 12,
    teachingGoal: 'Show A ∖ B for A = {1, 2, 3, 4, 5} and B = {4, 5, 6, 7}: start from A and remove what B contains (4 and 5, red), leaving {1, 2, 3}, so |A ∖ B| = 5 − 2 = 3; the difference is not symmetric: B ∖ A = {6, 7}.',
    ariaLabel:
      'The overlapping blue circle A and red circle B in a rectangle of the numbers 1 to 10. Green dots mark 1, 2 and 3, the part of A outside B, with the caption A minus B is 1, 2, 3; red dots on 4 and 5 show what was removed. A third step adds violet dots on 6 and 7 with the caption B minus A is 6, 7, and notes that A minus B is not the same as B minus A.',
    stage: NO_STAGE,
    steps: [
      { narration: 'Again A = {1, 2, 3, 4, 5} (blue) and B = {4, 5, 6, 7} (red) inside U = {1, …, 10}.', objects: [...vennBase()] },
      { narration: 'A ∖ B ("A minus B") keeps the elements of A that are NOT in B: take A and remove the shared 4 and 5 (red). What is left, marked green, is {1, 2, 3}, so |A ∖ B| = 5 − 2 = 3.', objects: [...marks(VEN.els, [1, 2, 3], ROLE.result), ...marks(VEN.els, [4, 5], ROLE.input), label('A ∖ B: {1, 2, 3}', P(0, 3.1), ROLE.result, 'primary')] },
      { narration: 'The order matters. B ∖ A starts from B and removes 4 and 5: it is {6, 7}, a different set. So A ∖ B ≠ B ∖ A in general.', objects: [...marks(VEN.els, [6, 7], ROLE.aid), label('B ∖ A: {6, 7}', P(0, -3.3), ROLE.aid, 'primary'), label('A ∖ B ≠ B ∖ A', P(0, -4.0), ROLE.ink, 'primary')] },
    ],
  }
}

// ── 8. Complement ────────────────────────────────────────────────────────────

/** U = {1, …, 10}; A = {1, 2, 3, 4, 5}; A′ = {6, …, 10}. */
export const COMP = {
  A: { c: [-0.4, 0.1], r: 1.9 } as Circ,
  box: { x0: -4.2, x1: 4.2, y0: -2.8, y1: 2.6 },
  inside: [[1, [-1.2, 0.9]], [2, [0.1, 1.0]], [3, [-1.3, -0.4]], [4, [0.5, -0.2]], [5, [-0.5, -1.1]]] as readonly El[],
  outside: [[6, [2.6, 1.5]], [7, [3.3, -0.3]], [8, [2.3, -1.8]], [9, [-3.2, 1.6]], [10, [-3.1, -1.6]]] as readonly El[],
}

/** KG: A′ = U ∖ A: every element of the universe that is not in A. */
export function buildComplementScene(): SceneSpec {
  return framed(raw_buildComplementScene())
}
function raw_buildComplementScene(): SceneSpec {
  const all = [...COMP.inside, ...COMP.outside]
  return {
    id: 'math-complement',
    title: 'Complement: everything in U outside A',
    sceneType: 'diagram',
    cameraDistance: 12,
    teachingGoal: 'Show the complement A′ = U ∖ A for A = {1, 2, 3, 4, 5} in U = {1, …, 10}: A′ is everything in the universe outside the circle, {6, 7, 8, 9, 10}; A and A′ together make U and share nothing, so |A| + |A′| = 5 + 5 = 10 = |U|.',
    ariaLabel:
      'A rectangle holding the numbers 1 to 10 with a blue circle A around 1 to 5. In the second step the numbers 6 to 10, all outside the circle but inside the rectangle, get green dots, with the caption A prime is 6, 7, 8, 9, 10. The third step adds the facts A union A prime is U, and 5 plus 5 equals 10.',
    stage: NO_STAGE,
    steps: [
      { narration: 'The complement only makes sense inside a universe: here U = {1, …, 10} (the rectangle) and A = {1, 2, 3, 4, 5} (the circle).', objects: [...boxLines(COMP.box), circleLine(COMP.A, ROLE.output), label('A', P(-2.5, 1.95), ROLE.output, 'heading'), label('U', P(-3.85, 2.2), ROLE.reference, 'primary'), ...elems(all)] },
      { narration: 'The complement A′ is everything in U that is NOT in A: the numbers inside the rectangle but outside the circle, {6, 7, 8, 9, 10} (marked).', objects: [...marks(COMP.outside, [6, 7, 8, 9, 10], ROLE.result), label('A′ = {6, 7, 8, 9, 10}', P(0, -3.4), ROLE.result, 'primary')] },
      { narration: 'Every element of U is in exactly one of A and A′: together they make U (A ∪ A′ = U), they share nothing (A ∩ A′ = ∅), so the sizes add up: 5 + 5 = 10 = |U|.', objects: [label('A ∪ A′: all of U', P(0, 3.3), ROLE.ink, 'primary'), label('count: 5 + 5 = 10', P(0, -4.1), ROLE.result, 'primary')] },
    ],
  }
}

// ── 9. Venn diagram (three sets) ─────────────────────────────────────────────

/** Region counts of a three-set Venn diagram; |A| = 11, |B| = 11, |C| = 9, union 20, |U| = 24. */
export const V3C = {
  A: { c: [-1.0, 0.8], r: 1.6 } as Circ, B: { c: [1.0, 0.8], r: 1.6 } as Circ, C: { c: [0, -0.8], r: 1.6 } as Circ,
  box: { x0: -3.6, x1: 3.6, y0: -2.9, y1: 3.0 },
  regions: [
    { sig: 'A', n: 5, p: [-1.8, 1.2] }, { sig: 'B', n: 4, p: [1.8, 1.2] }, { sig: 'C', n: 3, p: [0, -1.7] },
    { sig: 'AB', n: 2, p: [0, 1.45] }, { sig: 'AC', n: 1, p: [-0.95, -0.35] }, { sig: 'BC', n: 2, p: [0.95, -0.35] },
    { sig: 'ABC', n: 3, p: [0, 0.3] },
  ] as ReadonlyArray<{ sig: string; n: number; p: readonly [number, number] }>,
  outside: { n: 4, p: [-3.0, -2.5] as readonly [number, number] },
}
/** Which of the three circles a point lies in, as the signature 'A', 'AB', 'ABC', … ('' = outside all). */
export const signatureAt = (p: readonly [number, number]) => (inCircle(p, V3C.A) ? 'A' : '') + (inCircle(p, V3C.B) ? 'B' : '') + (inCircle(p, V3C.C) ? 'C' : '')

/** KG: a Venn diagram shows every combination of membership as a region; counting regions counts elements. */
export function buildVennDiagramScene(): SceneSpec {
  return framed(raw_buildVennDiagramScene())
}
function raw_buildVennDiagramScene(): SceneSpec {
  const { A, B, C } = V3C
  return {
    id: 'math-venn-diagram',
    title: 'Venn diagram: seven regions, seven counts',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show how a three-set Venn diagram sorts everything into seven membership regions (only A, only B, only C, A and B only, A and C only, B and C only, all three) plus the outside; the totals follow by adding the regions inside each circle: |A| = 5 + 2 + 1 + 3 = 11, |B| = 4 + 2 + 2 + 3 = 11, |C| = 3 + 1 + 2 + 3 = 9, and everything inside at least one circle is 20.',
    ariaLabel:
      'Three overlapping circles A, B and C in a rectangle, making seven regions, each labelled with a count: only A 5, only B 4, only C 3, A and B only 2, A and C only 1, B and C only 2, in all three 3, and 4 outside every circle. Step two adds the totals for each circle, 11 for A, 11 for B and 9 for C; step three adds the union of 20 and the universe total of 24.',
    stage: NO_STAGE,
    steps: [
      { narration: 'Three sets A, B, C overlap in a pattern of seven regions; each number counts the elements whose membership is exactly that region (the 4 outside belongs to no set).', objects: [...boxLines(V3C.box), circleLine(A, ROLE.output), circleLine(B, ROLE.input), circleLine(C, ROLE.aid), label('A', P(-2.4, 2.45), ROLE.output, 'heading'), label('B', P(2.4, 2.45), ROLE.input, 'heading'), label('C', P(1.9, -2.3), ROLE.aid, 'heading'), ...V3C.regions.map((r) => label(String(r.n), P(r.p[0], r.p[1]), ROLE.ink, 'primary')), label(String(V3C.outside.n), P(V3C.outside.p[0], V3C.outside.p[1]), ROLE.reference, 'primary')] },
      { narration: 'A circle\'s total is the sum of the four regions inside it: A = 5 + 2 + 1 + 3 = 11, B = 4 + 2 + 2 + 3 = 11, C = 3 + 1 + 2 + 3 = 9. Note the regions overlap between circles, so the totals add to more than the number of elements.', objects: [label('|A| = 11', P(-2.4, -3.5), ROLE.output, 'primary'), label('|B| = 11', P(0, -3.5), ROLE.input, 'primary'), label('|C| = 9', P(2.4, -3.5), ROLE.aid, 'primary')] },
      { narration: 'Each element sits in exactly one region, so adding all seven counts gives everything in at least one set: 5 + 4 + 3 + 2 + 1 + 2 + 3 = 20; with the 4 outside, the universe has 24.', objects: [label('|A ∪ B ∪ C| = 20', P(0, 3.7), ROLE.result, 'primary'), label('|U| = 24', P(0, -4.2), ROLE.ink, 'primary')] },
    ],
  }
}

// ── 10. Hasse diagram ────────────────────────────────────────────────────────

/** The divisors of 12 ordered by divisibility. An edge joins a lower number to a higher one it divides with nothing in between. */
export const HAS = {
  nodes: [[1, [0, -2.4]], [2, [-1.6, -0.8]], [3, [1.6, -0.8]], [4, [-1.6, 0.8]], [6, [1.6, 0.8]], [12, [0, 2.4]]] as readonly El[],
  edges: [[1, 2], [1, 3], [2, 4], [2, 6], [3, 6], [4, 12], [6, 12]] as ReadonlyArray<readonly [number, number]>,
  labelAt: { 1: [0, -2.95], 2: [-2.15, -0.8], 3: [2.15, -0.8], 4: [-2.15, 0.8], 6: [2.15, 0.8], 12: [0, 2.95] } as Record<number, readonly [number, number]>,
}

/** KG: a Hasse diagram draws a partial order with only the covering relations; here a ≤ b means a | b. */
export function buildHasseDiagramScene(): SceneSpec {
  return framed(raw_buildHasseDiagramScene())
}
function raw_buildHasseDiagramScene(): SceneSpec {
  const pos = (n: number) => posOf(HAS.nodes, n)
  const nodes = HAS.nodes.map(([n, p]) => dot(P(p[0], p[1]), ROLE.reference, 0.17))
  const labels = HAS.nodes.map(([n]) => label(String(n), P(HAS.labelAt[n][0], HAS.labelAt[n][1]), ROLE.ink, 'primary'))
  const edges = HAS.edges.map(([a, b]) => line(P(pos(a)[0], pos(a)[1]), P(pos(b)[0], pos(b)[1]), ROLE.reference, 0.04))
  const chain: Array<[number, number]> = [[1, 2], [2, 4], [4, 12]]
  return {
    id: 'math-hasse-diagram',
    title: 'Hasse diagram: divisors of 12',
    sceneType: 'diagram',
    cameraDistance: 11,
    teachingGoal: 'Show a Hasse diagram of the divisors of 12 ordered by divisibility: each upward edge joins a divisor to the next one it divides (no number between them), so a divides b exactly when you can climb from a to b; 4 and 6 are incomparable, their greatest lower bound is gcd 2 and their least upper bound is lcm 12.',
    ariaLabel:
      'A diagram of the divisors of 12 as dots joined by lines going upward: 1 at the bottom, 2 and 3 above it, 4 above 2 and 6 above 3, and 12 at the top. Edges: 1 to 2, 1 to 3, 2 to 4, 2 to 6, 3 to 6, 4 to 12 and 6 to 12. A green chain 1, 2, 4, 12 shows that 1 divides 2 divides 4 divides 12. Violet rings on 4 and 6 show they are incomparable, with green rings on 2 (their meet, the gcd) and 12 (their join, the lcm).',
    stage: NO_STAGE,
    steps: [
      { narration: 'The divisors of 12 are 1, 2, 3, 4, 6, 12. Draw a smaller number below a larger one it divides, and join only neighbours (nothing in between): 1 is joined to 2 and 3, 2 to 4 and 6, 3 to 6, and 4 and 6 to 12.', objects: [...edges, ...nodes, ...labels] },
      { narration: 'Climbing the diagram follows divisibility: the chain 1 → 2 → 4 → 12 says 1 | 2 | 4 | 12, so each divides every number above it on the path (1 | 12, 2 | 12, …).', objects: [...chain.map(([a, b]) => line(P(pos(a)[0], pos(a)[1]), P(pos(b)[0], pos(b)[1]), ROLE.result, 0.07)), label('chain: 1 | 2 | 4 | 12', P(3.2, -2.4), ROLE.result, 'primary')] },
      { narration: '4 and 6 are not on one path: neither divides the other (incomparable). Their greatest common lower point is 2 (the gcd) and the lowest point above both is 12 (the lcm).', objects: [halo(pos(4), ROLE.aid), halo(pos(6), ROLE.aid), halo(pos(2), ROLE.result), halo(pos(12), ROLE.result), label('incomparable', P(3.0, 1.55), ROLE.aid, 'primary'), label('meet 2: gcd', P(-3.2, -2.1), ROLE.result, 'primary'), label('join 12: lcm', P(2.5, 3.3), ROLE.result, 'primary')] },
    ],
  }
}

// ── 11. Irrational numbers ───────────────────────────────────────────────────

/** √2 as the diagonal of the unit square, then three fractions near it (7/5, 41/29, 17/12) on a magnified ruler. */
export const IRR = {
  u: 1.9, x0: -3.4, y0: 0.15,
  ruler: { lo: 1.4, hi: 1.42, xa: -3.7, xb: 3.7, y: -2.6 },
  fracs: [[7, 5], [41, 29], [17, 12]] as ReadonlyArray<readonly [number, number]>,
}
export const rulerX = (v: number) => IRR.ruler.xa + ((v - IRR.ruler.lo) / (IRR.ruler.hi - IRR.ruler.lo)) * (IRR.ruler.xb - IRR.ruler.xa)
const IM = (x: number, y: number): V3 => P(IRR.x0 + x * IRR.u, IRR.y0 + y * IRR.u)

/** KG: an irrational number is a real number that is not a ratio of integers (√2 is the standard example). */
export function buildIrrationalNumbersScene(): SceneSpec {
  return framed(raw_buildIrrationalNumbersScene())
}
function raw_buildIrrationalNumbersScene(): SceneSpec {
  const { ruler } = IRR
  const s2 = Math.SQRT2
  const frac = ([p, q]: readonly [number, number]) => p / q
  const fx = (f: readonly [number, number]) => rulerX(frac(f))
  const sq = (f: readonly [number, number]) => (f[0] * f[0]) / (f[1] * f[1])
  const ticks = [1.4, 1.405, 1.41, 1.415, 1.42].map((v) => line(P(rulerX(v), ruler.y - 0.12), P(rulerX(v), ruler.y + 0.12), ROLE.reference, 0.03))
  const squareSides: SceneObject[] = [
    line(IM(1, 0), IM(1, 1), ROLE.ink, 0.04), line(IM(1, 1), IM(0, 1), ROLE.ink, 0.04), line(IM(0, 1), IM(0, 0), ROLE.ink, 0.04), line(IM(0, 0), IM(1, 0), ROLE.ink, 0.04),
  ]
  return {
    id: 'math-irrational-numbers',
    title: 'Irrational numbers: √2 is not a fraction',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show that irrational numbers exist and sit on the number line between fractions: √2, the diagonal of the unit square (1² + 1² = 2), lies at 1.41421…; fractions 7/5, 41/29, 17/12 close in on it but their squares (1.96, 1.9988, 2.0069) miss 2, and no fraction p/q squares to exactly 2 (p² = 2q² has no integer solution), so the decimal never ends or repeats.',
    ariaLabel:
      'Top: a number line from 0 to 2 with a unit square standing on the segment from 0 to 1. A green diagonal of the square has length square root of 2, and a violet arc swings it down onto the number line at a green dot marked square root of 2, about 1.41. Bottom: a magnified ruler from 1.400 to 1.420 with red dots for 7 over 5, 41 over 29 and 17 over 12 and a green dot for square root of 2 between them; each fraction is labelled with its square 1.96, 1.9988 and 2.0069, none equal to 2. The caption says no fraction squares to exactly 2.',
    stage: NO_STAGE,
    steps: [
      { narration: 'Stand a unit square on the segment from 0 to 1. Its diagonal has length √2 (Pythagoras: 1² + 1² = 2). Swing that diagonal down onto the number line with a compass: it lands at √2 ≈ 1.414, a perfectly good point on the line.', objects: [arrow(IM(-0.2, 0), IM(2.3, 0), ROLE.reference), ...squareSides, line(IM(0, 0), IM(1, 1), ROLE.result, 0.06), curve(arcPts(IM(0, 0)[0], IM(0, 0)[1], s2 * IRR.u, 45, 0, 16), ROLE.aid), dot(IM(s2, 0), ROLE.result, 0.13), label('0', IM(0, -0.22), ROLE.ink, 'detail'), label('1', IM(1, -0.22), ROLE.ink, 'detail'), label('2', IM(2, -0.22), ROLE.ink, 'detail'), label('√2', IM(s2, -0.22), ROLE.result, 'primary'), label('diagonal √2', P(IM(0.5, 1)[0], IM(0.5, 1)[1] + 0.55), ROLE.result, 'primary')] },
      { narration: 'Magnify the stretch from 1.400 to 1.420 (a ruler 7.4 wide). The fractions 7/5, 41/29 and 17/12 (red) crowd close to √2 (green), but squaring them gives 1.96, 1.9988 and 2.0069: none of them squares to exactly 2.', objects: [line(P(ruler.xa, ruler.y), P(ruler.xb, ruler.y), ROLE.reference, 0.03), ...ticks, label('1.400', P(ruler.xa, ruler.y - 0.55), ROLE.reference, 'detail'), label('1.420', P(ruler.xb, ruler.y - 0.55), ROLE.reference, 'detail'), dot(P(fx(IRR.fracs[0]), ruler.y), ROLE.input, 0.1), dot(P(fx(IRR.fracs[1]), ruler.y), ROLE.input, 0.1), dot(P(fx(IRR.fracs[2]), ruler.y), ROLE.input, 0.1), dot(P(rulerX(s2), ruler.y), ROLE.result, 0.1), label('7/5 → ' + f2(sq(IRR.fracs[0])), P(fx(IRR.fracs[0]) + 0.9, ruler.y + 0.6), ROLE.input, 'primary'), label('41/29 → ' + (Math.round(sq(IRR.fracs[1]) * 10000) / 10000).toFixed(4), P(fx(IRR.fracs[1]) - 0.6, ruler.y - 0.7), ROLE.input, 'primary'), label('17/12 → ' + (Math.round(sq(IRR.fracs[2]) * 10000) / 10000).toFixed(4), P(fx(IRR.fracs[2]) + 0.9, ruler.y + 1.1), ROLE.input, 'primary'), label('√2', P(rulerX(s2), ruler.y + 0.5), ROLE.result, 'primary')] },
      { narration: 'No fraction can do it: if p/q squared were 2 then p² = 2q², which has no integer solution (the left side has an even number of factors of 2, the right an odd number). So √2 = 1.41421356… never ends or repeats: it is irrational.', objects: [label('√2 = 1.41421356…', P(2.6, 1.3), ROLE.result, 'primary'), label('no fraction p/q squares to 2', P(0, -3.9), ROLE.ink, 'primary')] },
    ],
  }
}

// ── 12. Complex numbers ──────────────────────────────────────────────────────

/** z = 3 + 2i on the complex plane, with its conjugate z* = 3 − 2i, modulus √13 ≈ 3.61 and iz = −2 + 3i. */
export const CPLX = { u: 0.8, z: [3, 2] as XY }
const CM = (x: number, y: number): V3 => P(x * CPLX.u, y * CPLX.u)
export const conj = (z: readonly [number, number]): XY => [z[0], -z[1]]
/** Multiplication by i turns (a + bi) into (−b + ai): a quarter turn anticlockwise. */
export const timesI = (z: readonly [number, number]): XY => [-z[1], z[0]]
export const modulus = (z: readonly [number, number]) => Math.hypot(z[0], z[1])

/** KG: a complex number a + bi is a point (a, b) of the plane; the conjugate mirrors it, |z| is its distance from 0, and ×i turns it 90°. */
export function buildComplexNumbersScene(): SceneSpec {
  return framed(raw_buildComplexNumbersScene())
}
function raw_buildComplexNumbersScene(): SceneSpec {
  const { z } = CPLX
  const zc = conj(z), iz = timesI(z), m = modulus(z)
  const ang = (v: readonly [number, number]) => (Math.atan2(v[1], v[0]) * 180) / Math.PI
  return {
    id: 'math-complex-numbers',
    title: 'Complex numbers: points of the plane',
    sceneType: 'diagram',
    cameraDistance: 12,
    teachingGoal: 'Show a complex number as a point of the plane: z = 3 + 2i has real part 3 and imaginary part 2; its conjugate z* = 3 − 2i is the mirror image in the real axis, both lie at distance |z| = √13 ≈ 3.61 from 0, and multiplying by i gives iz = −2 + 3i, the same length turned a quarter turn (90°) anticlockwise, because i² = −1.',
    ariaLabel:
      'A coordinate plane with a real axis and an imaginary axis. A red arrow from the origin to the point 3 plus 2 i is labelled z, with dotted guides showing the real part 3 and the imaginary part 2. A blue arrow to 3 minus 2 i, its mirror image in the real axis, is the conjugate; a violet circle through both has radius 3.61, the modulus. A green arrow to minus 2 plus 3 i, labelled i z, is the red arrow turned 90 degrees anticlockwise, marked with a violet arc.',
    stage: NO_STAGE,
    steps: [
      { narration: 'A complex number a + bi is the point (a, b): real part a along the horizontal axis, imaginary part b up the vertical axis. z = 3 + 2i is 3 right and 2 up.', objects: [...mathAxes(CM, -4, 4, -4, 4), label('Re', CM(4.1, -0.45), ROLE.reference, 'detail'), label('Im', CM(0.45, 4.1), ROLE.reference, 'detail'), guide(CM(z[0], 0), CM(z[0], z[1]), ROLE.aid, 0.025), guide(CM(0, z[1]), CM(z[0], z[1]), ROLE.aid, 0.025), label('3', CM(z[0], -0.45), ROLE.ink, 'detail'), label('2', CM(-0.45, z[1]), ROLE.ink, 'detail'), arrow(CM(0, 0), CM(z[0], z[1]), ROLE.input), label('z = 3 + 2i', P(3.7, 1.9), ROLE.input, 'primary')] },
      { narration: 'The conjugate z* = 3 − 2i flips the sign of the imaginary part: the mirror image of z in the real axis. Both are the same distance from 0, the modulus |z| = √(3² + 2²) = √13 ≈ 3.61 (the violet circle).', objects: [arrow(CM(0, 0), CM(zc[0], zc[1]), ROLE.output), curve(arcPts(0, 0, m * CPLX.u, 0, 360, 96), ROLE.aid), label('z* = 3 − 2i', P(3.3, -2.4), ROLE.output, 'primary'), label('|z| = 3.61', P(0, -3.4), ROLE.aid, 'primary')] },
      { narration: 'Multiplying by i sends 3 + 2i to i(3 + 2i) = 3i + 2i² = −2 + 3i (since i² = −1): the same length, turned a quarter turn (90°) anticlockwise from z.', objects: [arrow(CM(0, 0), CM(iz[0], iz[1]), ROLE.result), curve(arcPts(0, 0, 1.0, ang(z), ang(iz), 16), ROLE.aid), label('iz = −2 + 3i', P(-2.9, 3.1), ROLE.result, 'primary'), label('90°', P(0.3, 1.5), ROLE.aid, 'primary')] },
    ],
  }
}
