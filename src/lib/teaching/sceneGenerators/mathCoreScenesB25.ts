/**
 * Core mathematics figures — batch 25 of the mathematics visual campaign (2026-10-12), the first
 * helpful-tier batch: foundations of set theory and relations. Set membership, the empty set, finite
 * sets, the four set operations, the power set, the Cartesian product, ordered pairs, relations and
 * their three basic properties (reflexive, symmetric, transitive), equivalence classes and partitions.
 *
 * Same rules as batches 1-24: one visual language from visualDesign.ts, labels are names not
 * sentences (marks of 1-2 characters are free), steps are cumulative, coordinates stay inside +-5, at
 * most 50 objects per step, nothing the figure audit rejects (SM-01 evaluates the arithmetic in a label
 * left to right and compares labels that share a last token before "="), and every fact a figure states
 * (membership, bijections, closure under the relation's property, disjoint covering blocks) is
 * re-derived by the test file from the DRAWN coordinates. A label is about 0.26 screen units wide per
 * character.
 */

import type { SceneSpec, SceneObject } from '@/lib/teaching/sceneSpec'
import { ROLE, arrow, curve, dot, label, line } from './visualDesign'
import { P, NO_STAGE, framed, arcPts } from './mathSceneKit'

export type Pt = readonly [number, number]
const ln = (a: Pt, b: Pt, color: string = ROLE.reference, t = 0.04): SceneObject => line(P(a[0], a[1]), P(b[0], b[1]), color, t)
const dt = (p: Pt, color: string = ROLE.ink, r = 0.16): SceneObject => dot(P(p[0], p[1]), color, r)
const lb = (text: string, p: Pt, color: string = ROLE.ink): SceneObject => label(text, P(p[0], p[1]), color, 'primary')
const ringAt = (c: Pt, r: number, color: string, n = 40): SceneObject => curve(arcPts(c[0], c[1], r, 0, 360, n), color)
const ellipseAt = (c: Pt, rx: number, ry: number, color: string, n = 60): SceneObject => curve(Array.from({ length: n + 1 }, (_, i) => { const a = (2 * Math.PI * i) / n; return P(c[0] + rx * Math.cos(a), c[1] + ry * Math.sin(a)) }), color)
/** An arrow between two dots, trimmed by r at both ends. */
const link = (a: Pt, b: Pt, color: string, r = 0.2, t?: number): SceneObject => { const l = Math.hypot(b[0] - a[0], b[1] - a[1]), d: Pt = [(b[0] - a[0]) / l, (b[1] - a[1]) / l]; return arrow(P(a[0] + d[0] * r, a[1] + d[1] * r), P(b[0] - d[0] * r, b[1] - d[1] * r), color) }
const rect = (x0: number, y0: number, x1: number, y1: number, color: string, t = 0.04): SceneObject[] => [ln([x0, y0], [x1, y0], color, t), ln([x1, y0], [x1, y1], color, t), ln([x1, y1], [x0, y1], color, t), ln([x0, y1], [x0, y0], color, t)]
export const inEllipse = (c: Pt, rx: number, ry: number, p: Pt) => ((p[0] - c[0]) / rx) ** 2 + ((p[1] - c[1]) / ry) ** 2 < 1

// ── 1. Set membership ────────────────────────────────────────────────────────

/** S = {a, b, c} drawn as a blob; a, b, c lie inside it (∈), d and e outside (∉). */
export const SMB = { c: [-1.5, 0.3] as Pt, rx: 2.2, ry: 1.6, inside: [['a', [-2.4, 0.9]], ['b', [-1.5, -0.1]], ['c', [-0.7, 0.8]]] as ReadonlyArray<readonly [string, Pt]>, outside: [['d', [2.4, 1.0]], ['e', [2.6, -1.0]]] as ReadonlyArray<readonly [string, Pt]> }
export const smbMember = (p: Pt) => inEllipse(SMB.c, SMB.rx, SMB.ry, p)

/** KG: x ∈ A means x is an element of A; x ∉ A means it is not. */
export function buildSetMembershipScene(): SceneSpec {
  return framed(raw_buildSetMembershipScene())
}
function raw_buildSetMembershipScene(): SceneSpec {
  const { c, rx, ry, inside, outside } = SMB
  return {
    id: 'math-set-membership',
    title: 'Set membership: ∈ and ∉',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show membership. A set S is a collection of objects, drawn as a region; an object x is an ELEMENT of S, written x ∈ S, exactly when it lies in the region. S = {a, b, c} has the elements a, b, c (green dots inside); the objects d and e are outside, so d ∉ S and e ∉ S (red). Membership is a yes/no question about one object and one set: every object is either in S or not in S, never both.',
    ariaLabel:
      'A large oval with three white dots labelled a, b and c inside it, captioned S equals the set a, b, c. Two more dots, d and e, lie outside the oval on the right. In the second step green captions say b belongs to S and c belongs to S; in the third step red captions say d does not belong to S and e does not belong to S.',
    stage: NO_STAGE,
    steps: [
      { narration: 'The oval is the set S = {a, b, c}: it contains exactly the objects a, b, c (inside). d and e are other objects, outside the oval.', objects: [ellipseAt(c, rx, ry, ROLE.reference, 72), ...inside.map(([, p]) => dt(p, ROLE.ink, 0.12)), ...outside.map(([, p]) => dt(p, ROLE.ink, 0.12)), ...inside.map(([n, p]) => lb(n, [p[0], p[1] + 0.45])), ...outside.map(([n, p]) => lb(n, [p[0], p[1] + 0.45])), lb('S = {a, b, c}', [c[0], c[1] + ry + 0.5], ROLE.output)] },
      { narration: 'x ∈ S (read "x belongs to S" or "x is an element of S") means x is one of the objects in S. So b ∈ S and c ∈ S (green).', objects: [lb('b ∈ S', [c[0] - 0.1, c[1] - ry - 0.45], ROLE.result), ...inside.map(([, p]) => dt(p, ROLE.result, 0.12)), lb('c ∈ S', [c[0] + 1.6, c[1] - ry - 0.45], ROLE.result)] },
      { narration: 'x ∉ S means x is NOT an element of S: d ∉ S and e ∉ S (red). For every object exactly one of x ∈ S and x ∉ S is true.', objects: [...outside.map(([, p]) => dt(p, ROLE.input, 0.12)), lb('d ∉ S', [outside[0][1][0], outside[0][1][1] - 0.5], ROLE.input), lb('e ∉ S', [outside[1][1][0], outside[1][1][1] - 0.5], ROLE.input)] },
    ],
  }
}

// ── 2. The empty set ─────────────────────────────────────────────────────────

/** ∅ is a region with nothing in it; {∅} is a region holding ONE element (the empty set); and ∅ ⊆ A for every set A. */
export const EMP = { c: [[-3.3, 0.6], [0, 0.6], [3.3, 0.6]] as ReadonlyArray<Pt>, r: [0.9, 1.2, 1.35] as readonly number[], inner: 0.35, A: [['1', [-0.45, 0.35]], ['2', [0.35, 0.5]], ['3', [-0.1, -0.35]]] as ReadonlyArray<readonly [string, Pt]> }

/** KG: ∅ has no elements; ∅ ⊆ A for every A; {∅} ≠ ∅. */
export function buildEmptySetScene(): SceneSpec {
  return framed(raw_buildEmptySetScene())
}
function raw_buildEmptySetScene(): SceneSpec {
  const { c, r, inner, A } = EMP
  return {
    id: 'math-empty-set',
    title: 'The empty set',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show the empty set ∅: the set with no elements, drawn as a region with nothing in it. It is not "nothing" but a set, and it is different from {∅}, the set that has ONE element (the empty set itself): a box with an empty box inside is not an empty box. ∅ is a subset of every set A (∅ ⊆ A): there is no element of ∅ that fails to be in A, so the condition for being a subset is satisfied vacuously.',
    ariaLabel:
      'Left: an empty circle labelled the empty set, with 0 elements. Middle: a larger circle that contains one small empty circle, captioned the set containing the empty set, 1 element. Right: a circle holding three dots 1, 2, 3 and a small dashed empty circle drawn inside it, captioned the empty set is a subset of A.',
    stage: NO_STAGE,
    steps: [
      { narration: 'The empty set ∅ = {} has no elements at all: the region is empty. Its cardinality is 0.', objects: [ringAt(c[0], r[0], ROLE.output, 48), lb('∅', [c[0][0], c[0][1]], ROLE.output), lb('0 elements', [c[0][0], c[0][1] - r[0] - 0.55], ROLE.output)] },
      { narration: '{∅} is a DIFFERENT set: it has exactly one element, namely ∅ (the small empty circle inside). A box with an empty box in it is not an empty box, so {∅} ≠ ∅ and {∅} has 1 element.', objects: [ringAt(c[1], r[1], ROLE.input, 56), ringAt([c[1][0], c[1][1]], inner, ROLE.output, 28), lb('{∅}', [c[1][0], c[1][1] + r[1] + 0.5], ROLE.input), lb('1 element', [c[1][0], c[1][1] - r[1] - 0.55], ROLE.input)] },
      { narration: 'For every set A, ∅ ⊆ A: to be a subset every element of ∅ must be in A, and ∅ has no elements, so nothing can fail. In the picture the empty region sits inside A without covering any element.', objects: [ringAt(c[2], r[2], ROLE.reference, 56), ...A.map(([, p]) => dt([c[2][0] + p[0], c[2][1] + p[1]], ROLE.ink, 0.1)), ...A.map(([n, p]) => lb(n, [c[2][0] + p[0] + 0.4, c[2][1] + p[1] + 0.1])), ...Array.from({ length: 8 }, (_, i) => curve(arcPts(c[2][0] + 0.6, c[2][1] - 0.5, 0.3, i * 45, i * 45 + 28, 8), ROLE.aid)), lb('∅ ⊆ A', [c[2][0], c[2][1] - r[2] - 0.55], ROLE.aid)] },
    ],
  }
}
/** the position of the dashed ∅ inside A, for the tests */
export const emptyInsideA = (): { c: Pt; r: number } => ({ c: [EMP.c[2][0] + 0.6, EMP.c[2][1] - 0.5], r: 0.3 })

// ── 3. Finite sets ───────────────────────────────────────────────────────────

/** A set with five elements is matched one-to-one with {1, …, 5}; trying to match it into {1, …, 4} must collide (pigeonhole). */
export const FIN = { ax: 0.0, nx: 3.4, mx: -3.4, ys: [1.6, 0.8, 0, -0.8, -1.6] as readonly number[], ysM: [1.2, 0.4, -0.4, -1.2] as readonly number[], target: [0, 1, 2, 3, 3] as readonly number[] }
export const finA = (i: number): Pt => [FIN.ax, FIN.ys[i]]
export const finN = (i: number): Pt => [FIN.nx, FIN.ys[i]]
export const finM = (j: number): Pt => [FIN.mx, FIN.ysM[j]]

/** KG: a finite set can be counted: a bijection with {1, …, n}; |A| = n. */
export function buildFiniteSetScene(): SceneSpec {
  return framed(raw_buildFiniteSetScene())
}
function raw_buildFiniteSetScene(): SceneSpec {
  const { target } = FIN, names = ['p', 'q', 'r', 's', 't']
  return {
    id: 'math-finite-set',
    title: 'A finite set: counting is a bijection',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show what “finite” means. A set A is finite when its elements can be matched one-to-one with {1, 2, …, n} for some natural number n — counting them off — and then |A| = n. Here A = {p, q, r, s, t} is matched with {1, 2, 3, 4, 5} by five blue arrows, each element used once: |A| = 5. A finite set cannot be matched with a smaller initial segment: five elements sent into {1, 2, 3, 4} must land two on the same number (red arrows into 4), the pigeonhole principle.',
    ariaLabel:
      'A column of five dots labelled p, q, r, s, t in the middle. In the second step a column of the numbers 1 to 5 appears on the right and five blue arrows join each letter to the number at the same height, one each. In the third step a column of just the numbers 1 to 4 appears on the left and five red arrows run from the five letters into it, with the arrows from s and t both landing on 4, captioned a collision.',
    stage: NO_STAGE,
    steps: [
      { narration: 'A = {p, q, r, s, t}: a collection of distinct objects (dots).', objects: [...names.map((n, i) => dt(finA(i), ROLE.ink, 0.13)), ...names.map((n, i) => lb(n, [finA(i)[0], finA(i)[1] + 0.38])), lb('A', [FIN.ax, 2.5], ROLE.output)] },
      { narration: 'Count them: pair p with 1, q with 2, r with 3, s with 4, t with 5. Every element gets exactly one number and every number is used once — a bijection with {1, …, 5}. So A has 5 elements, |A| = 5, and A is finite.', objects: [...[0, 1, 2, 3, 4].map((i) => dt(finN(i), ROLE.ink, 0.1)), ...[0, 1, 2, 3, 4].map((i) => lb(String(i + 1), [finN(i)[0] + 0.45, finN(i)[1]])), ...[0, 1, 2, 3, 4].map((i) => link(finA(i), finN(i), ROLE.output, 0.2)), lb('|A| = 5', [(FIN.ax + FIN.nx) / 2, -2.5], ROLE.output)] },
      { narration: 'Try to pair the same 5 elements with {1, 2, 3, 4}: some number must be used twice (s and t both go to 4, red) — no one-to-one matching exists. So a finite set is never as large as a proper part of the counting numbers below it: this is the pigeonhole principle.', objects: [...[0, 1, 2, 3].map((j) => dt(finM(j), ROLE.ink, 0.1)), ...[0, 1, 2, 3].map((j) => lb(String(j + 1), [finM(j)[0] - 0.45, finM(j)[1]])), ...target.map((j, i) => link(finA(i), finM(j), ROLE.input, 0.2)), lb('a collision', [FIN.mx - 0.2, -2.5], ROLE.input)] },
    ],
  }
}

// ── 4. Set operations ────────────────────────────────────────────────────────

/** U = {1, …, 7}, A = {1, 2, 3, 4}, B = {3, 4, 5, 6}: A ∪ B = {1, …, 6}, A ∩ B = {3, 4}, A ∖ B = {1, 2}, Aᶜ = {5, 6, 7}. */
export const SOP = {
  centers: [[-2.6, 1.9], [2.6, 1.9], [-2.6, -1.9], [2.6, -1.9]] as ReadonlyArray<Pt>, r: 1.0, off: 0.55,
  A: [1, 2, 3, 4] as readonly number[], B: [3, 4, 5, 6] as readonly number[], U: [1, 2, 3, 4, 5, 6, 7] as readonly number[],
}
/** element positions relative to a panel centre */
export const sopEl = (n: number): Pt => ({ 1: [-1.0, 0.45], 2: [-1.0, -0.35], 3: [0.0, 0.4], 4: [0.0, -0.35], 5: [1.0, 0.45], 6: [1.0, -0.35], 7: [1.5, -1.2] } as Record<number, Pt>)[n]
export const sopUnion = () => SOP.U.filter((x) => SOP.A.includes(x) || SOP.B.includes(x))
export const sopInter = () => SOP.U.filter((x) => SOP.A.includes(x) && SOP.B.includes(x))
export const sopDiff = () => SOP.U.filter((x) => SOP.A.includes(x) && !SOP.B.includes(x))
export const sopComp = () => SOP.U.filter((x) => !SOP.A.includes(x))

/** KG: union, intersection, difference and complement of sets. */
export function buildSetOperationsScene(): SceneSpec {
  return framed(raw_buildSetOperationsScene())
}
function raw_buildSetOperationsScene(): SceneSpec {
  const { centers, r, off } = SOP
  const panel = (k: number, result: readonly number[], color: string, caption: string): SceneObject[] => {
    const c = centers[k], at = (n: number): Pt => [c[0] + sopEl(n)[0], c[1] + sopEl(n)[1]]
    return [ringAt([c[0] - off, c[1]], r, ROLE.reference, 48), ringAt([c[0] + off, c[1]], r, ROLE.reference, 48), ...SOP.U.map((n) => dt(at(n), result.includes(n) ? color : ROLE.reference, result.includes(n) ? 0.14 : 0.1)), ...SOP.U.map((n) => lb(String(n), [at(n)[0], at(n)[1] + 0.4])), lb(caption, [c[0], c[1] + r + 0.55], color)]
  }
  return {
    id: 'math-set-operations',
    title: 'Set operations: ∪, ∩, ∖ and complement',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show the four basic operations on A = {1, 2, 3, 4} and B = {3, 4, 5, 6} inside the universe U = {1, …, 7}: the UNION A ∪ B = elements in A or B (or both) = {1, 2, 3, 4, 5, 6}; the INTERSECTION A ∩ B = elements in both = {3, 4}; the DIFFERENCE A ∖ B = elements of A not in B = {1, 2}; the COMPLEMENT Aᶜ = elements of U not in A = {5, 6, 7}. In each panel the elements of the result are coloured.',
    ariaLabel:
      'Four copies of two overlapping circles, A on the left and B on the right, with the numbers 1 to 7 in the regions: 1 and 2 in A only, 3 and 4 in both, 5 and 6 in B only, 7 outside both. Top left: all of 1 to 6 are green, captioned A union B. Top right: only 3 and 4 are blue, captioned A intersect B. Bottom left, in the second step: only 1 and 2 are red, captioned A minus B. Bottom right, third step: 5, 6 and 7 are violet, captioned A complement.',
    stage: NO_STAGE,
    steps: [
      { narration: 'A ∪ B (union): everything in A or in B or in both — 1, 2, 3, 4, 5, 6 (green). A ∩ B (intersection): only what is in both — 3 and 4 (blue).', objects: [...panel(0, sopUnion(), ROLE.result, 'A ∪ B'), ...panel(1, sopInter(), ROLE.output, 'A ∩ B')] },
      { narration: 'A ∖ B (difference): what is in A but not in B — 1 and 2 (red).', objects: panel(2, sopDiff(), ROLE.input, 'A ∖ B') },
      { narration: 'Aᶜ (complement): what is in the universe but not in A — 5, 6 and 7 (violet), including 7, which is in neither set.', objects: panel(3, sopComp(), ROLE.aid, 'Aᶜ') },
    ],
  }
}

// ── 5. Power set ─────────────────────────────────────────────────────────────

/** P({a, b, c}) has 2³ = 8 subsets: each panel shows a, b, c filled when the element is in the subset. */
export const PWS = { xs: [-3.6, -1.2, 1.2, 3.6] as readonly number[], ys: [1.4, -1.4] as readonly number[], dx: 0.5 }
/** panel k (0..7) is the subset whose bit i (0 = a) is set in k; panels are ordered by size then lexicographically */
export const PWS_ORDER: ReadonlyArray<readonly number[]> = [[], [0], [1], [2], [0, 1], [0, 2], [1, 2], [0, 1, 2]]
export const pwsCentre = (k: number): Pt => [PWS.xs[k % 4], PWS.ys[Math.floor(k / 4)]]
export const pwsDot = (k: number, i: number): Pt => [pwsCentre(k)[0] + (i - 1) * PWS.dx, pwsCentre(k)[1]]
export const subsetName = (members: readonly number[]) => (members.length === 0 ? '∅' : `{${members.map((i) => 'abc'[i]).join(', ')}}`)

/** KG: P(A) = the set of all subsets of A; |P(A)| = 2^|A|. */
export function buildPowerSetScene(): SceneSpec {
  return framed(raw_buildPowerSetScene())
}
function raw_buildPowerSetScene(): SceneSpec {
  const panel = (k: number): SceneObject[] => { const m = PWS_ORDER[k]; return [...[0, 1, 2].map((i) => dt(pwsDot(k, i), m.includes(i) ? ROLE.result : ROLE.reference, m.includes(i) ? 0.16 : 0.08)), ...[0, 1, 2].map((i) => lb('abc'[i], [pwsDot(k, i)[0], pwsDot(k, i)[1] + 0.45], m.includes(i) ? ROLE.ink : ROLE.reference)), lb(subsetName(m), [pwsCentre(k)[0], pwsCentre(k)[1] - 0.75], ROLE.ink)] }
  return {
    id: 'math-power-set',
    title: 'The power set: all 2ⁿ subsets',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show the power set P(A) of A = {a, b, c}: the set of ALL subsets of A. Each subset is a yes/no choice for each element (green = in the subset, grey = out), so there are 2 · 2 · 2 = 2³ = 8 of them: ∅, the three one-element sets, the three two-element sets and A itself. In general a set with n elements has 2ⁿ subsets, which is why |P(A)| > |A| always.',
    ariaLabel:
      'Eight small panels in two rows of four, each with three dots under the letters a, b, c. The first panel, the empty set, has all dots grey. The next three have a single green dot, at a, at b and at c. The next three have two green dots, a and b, a and c, b and c. The last has all three green, the whole set. A caption says 2 times 2 times 2 equals 8.',
    stage: NO_STAGE,
    steps: [
      { narration: 'The subsets of A = {a, b, c} with 0 or 1 element: ∅ (no element in), and {a}, {b}, {c} (one element in, green).', objects: [0, 1, 2, 3].flatMap(panel) },
      { narration: 'With 2 elements: {a, b}, {a, c}, {b, c}.', objects: [4, 5, 6].flatMap(panel) },
      { narration: 'And A itself, {a, b, c}. Each element is either in or out — 2 choices, three times — so 2 · 2 · 2 = 8 subsets: |P(A)| = 2³ = 8.', objects: [...panel(7), lb('2 · 2 · 2 = 8', [0, 0], ROLE.output)] },
    ],
  }
}

// ── 6. Cartesian product ─────────────────────────────────────────────────────

/** A = {1, 2, 3} and B = {p, q}: A × B is the 3 × 2 = 6 ordered pairs, a grid of points. */
export const CPR = { ox: -1.6, oy: -1.3, dx: 1.6, dy: 1.5, A: ['1', '2', '3'] as readonly string[], B: ['p', 'q'] as readonly string[] }
export const cprAt = (i: number, j: number): Pt => [CPR.ox + CPR.dx * i, CPR.oy + CPR.dy * j]

/** KG: A × B = {(a, b) : a ∈ A, b ∈ B}; |A × B| = |A||B|. */
export function buildCartesianProductScene(): SceneSpec {
  return framed(raw_buildCartesianProductScene())
}
function raw_buildCartesianProductScene(): SceneSpec {
  const { A, B, dx } = CPR
  return {
    id: 'math-cartesian-product',
    title: 'The Cartesian product A × B',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show the Cartesian product A × B of A = {1, 2, 3} and B = {p, q}: the set of all ordered pairs (a, b) with a from A and b from B. Put A along a horizontal axis and B along a vertical one; every pair is a grid point, so A × B has 3 × 2 = 6 elements: (1, p), (2, p), (3, p), (1, q), (2, q), (3, q). The pair (2, q) is found above 2 and across from q. The plane ℝ × ℝ = ℝ² is the same construction.',
    ariaLabel:
      'A horizontal axis with the three marks 1, 2, 3 and a vertical axis with the two marks p and q. In the second step the six grid points where a vertical line above each of 1, 2, 3 meets a horizontal line from each of p and q are marked with dots. In the third step the point above 2 and level with q is highlighted green with violet guide lines to its two coordinates, labelled the pair 2 comma q, and the caption says 3 times 2 equals 6.',
    stage: NO_STAGE,
    steps: [
      { narration: 'Put the elements of A = {1, 2, 3} along the horizontal axis and the elements of B = {p, q} up the vertical axis.', objects: [arrow(P(CPR.ox - 0.8, CPR.oy - 0.8), P(cprAt(2, 0)[0] + 1.0, CPR.oy - 0.8), ROLE.reference), arrow(P(CPR.ox - 0.8, CPR.oy - 0.8), P(CPR.ox - 0.8, cprAt(0, 1)[1] + 0.9), ROLE.reference), ...A.map((a, i) => lb(a, [cprAt(i, 0)[0], CPR.oy - 1.3])), ...B.map((b, j) => lb(b, [CPR.ox - 1.3, cprAt(0, j)[1]])), lb('A', [cprAt(2, 0)[0] + 1.0, CPR.oy - 1.3], ROLE.output), lb('B', [CPR.ox - 1.3, cprAt(0, 1)[1] + 0.9], ROLE.output)] },
      { narration: 'Every pair (a, b) is a grid point: the six points are (1, p), (2, p), (3, p), (1, q), (2, q), (3, q). The set of all of them is A × B.', objects: A.flatMap((_, i) => B.map((_, j) => dt(cprAt(i, j), ROLE.ink, 0.14)))},
      { narration: 'The point above 2 and level with q is the pair (2, q) (green): first coordinate from A, second from B. The number of pairs is |A| · |B| = 3 × 2 = 6.', objects: [ln(cprAt(1, 0), cprAt(1, 1), ROLE.aid, 0.025), ln([CPR.ox - 0.8, cprAt(0, 1)[1]], cprAt(1, 1), ROLE.aid, 0.025), dt(cprAt(1, 1), ROLE.result, 0.2), lb('(2, q)', [cprAt(1, 1)[0] + dx * 0.0, cprAt(1, 1)[1] + 0.55], ROLE.result), lb('3 × 2 = 6', [cprAt(1, 0)[0] + 1.6, CPR.oy - 2.2], ROLE.output)] },
    ],
  }
}

// ── 7. Ordered pair ──────────────────────────────────────────────────────────

/** The ordered pairs (1, 3) and (3, 1) are different points, mirror images in the diagonal y = x; (a, b) = (c, d) only if a = c and b = d. */
export const ORP = { ox: -2.0, oy: -2.0, u: 1.3, p: [1, 3] as Pt, q: [3, 1] as Pt }
export const orpAt = (x: number, y: number): Pt => [ORP.ox + ORP.u * x, ORP.oy + ORP.u * y]

/** KG: (a, b) = (c, d) iff a = c and b = d; the order matters. */
export function buildOrderedPairScene(): SceneSpec {
  return framed(raw_buildOrderedPairScene())
}
function raw_buildOrderedPairScene(): SceneSpec {
  const { p, q } = ORP, A = orpAt
  return {
    id: 'math-ordered-pair',
    title: 'Ordered pairs: order matters',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show that an ordered pair (a, b) remembers which entry comes first: (1, 3) is the point 1 across and 3 up, while (3, 1) is 3 across and 1 up — a different point (the mirror image in the diagonal y = x), so (1, 3) ≠ (3, 1). Two ordered pairs are equal exactly when both entries agree, (a, b) = (c, d) ⇔ a = c and b = d. (An unordered set {1, 3} = {3, 1} forgets the order.)',
    ariaLabel:
      'A grid of axes with a blue dot at the point 1 across and 3 up, labelled the pair 1 comma 3, with violet guide lines to its coordinates. In the second step a red dot at 3 across and 1 up appears, labelled the pair 3 comma 1, and a dashed diagonal line y equals x passes exactly between the two dots, which are mirror images in it. The third step adds the caption that two ordered pairs are equal only when both entries agree.',
    stage: NO_STAGE,
    steps: [
      { narration: 'The ordered pair (1, 3): first entry 1, second entry 3. As a point: 1 across, 3 up (blue).', objects: [arrow(P(A(-0.2, 0)[0], A(0, 0)[1]), P(A(4.2, 0)[0], A(0, 0)[1]), ROLE.reference), arrow(P(A(0, 0)[0], A(0, -0.2)[1]), P(A(0, 0)[0], A(0, 4.2)[1]), ROLE.reference), ln(A(p[0], 0), A(p[0], p[1]), ROLE.aid, 0.02), ln(A(0, p[1]), A(p[0], p[1]), ROLE.aid, 0.02), dt(A(p[0], p[1]), ROLE.output, 0.18), lb('(1, 3)', [A(p[0], p[1])[0] - 0.1, A(p[0], p[1])[1] + 0.5], ROLE.output)] },
      { narration: 'Swap the entries: (3, 1) is 3 across, 1 up (red) — a different point, the mirror image of the first in the diagonal y = x. So (1, 3) ≠ (3, 1): in an ordered pair the order matters, unlike in the set {1, 3} = {3, 1}.', objects: [ln(A(-0.3, -0.3), A(4.2, 4.2), ROLE.aid, 0.03), ln(A(q[0], 0), A(q[0], q[1]), ROLE.aid, 0.02), ln(A(0, q[1]), A(q[0], q[1]), ROLE.aid, 0.02), dt(A(q[0], q[1]), ROLE.input, 0.18), lb('(3, 1)', [A(q[0], q[1])[0] + 0.8, A(q[0], q[1])[1]], ROLE.input)] },
      { narration: 'Two ordered pairs are equal only if they agree in BOTH places: (a, b) = (c, d) exactly when a = c and b = d.', objects: [lb('(a, b) = (c, d) ⇔ a = c, b = d', [0.6, -3.7], ROLE.ink)] },
    ],
  }
}

// ── 8. Relation ──────────────────────────────────────────────────────────────

/** R = {(1, a), (1, b), (2, b), (3, c)} ⊆ A × B as arrows between two columns and as the marked cells of the grid A × B. */
export const REL = {
  A: ['1', '2', '3'] as readonly string[], B: ['a', 'b', 'c'] as readonly string[], pairs: [[0, 0], [0, 1], [1, 1], [2, 2]] as ReadonlyArray<readonly [number, number]>,
  ax: -4.0, bx: -2.2, ys: [1.0, 0, -1.0] as readonly number[], gx: 1.0, gdx: 1.0, gy: [1.0, 0, -1.0] as readonly number[],
}
export const relA = (i: number): Pt => [REL.ax, REL.ys[i]]
export const relB = (j: number): Pt => [REL.bx, REL.ys[j]]
export const relCell = (i: number, j: number): Pt => [REL.gx + REL.gdx * j, REL.gy[i]]

/** KG: a relation from A to B is a subset of A × B. */
export function buildRelationScene(): SceneSpec {
  return framed(raw_buildRelationScene())
}
function raw_buildRelationScene(): SceneSpec {
  const { A, B, pairs } = REL
  return {
    id: 'math-relation',
    title: 'A relation is a subset of A × B',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show a relation R from A = {1, 2, 3} to B = {a, b, c} as a SET OF ORDERED PAIRS, R ⊆ A × B: here R = {(1, a), (1, b), (2, b), (3, c)} — drawn as four arrows (1 relates to a and to b, 2 to b, 3 to c) and as four marked cells of the 3 × 3 grid of all nine pairs A × B. Unlike a function, a relation may send an element to several elements (1 ↦ a and b) or to none.',
    ariaLabel:
      'Left: two columns, the numbers 1, 2, 3 and the letters a, b, c, with four blue arrows from 1 to a, 1 to b, 2 to b and 3 to c; the arrows from 1 fan out to two letters, and the letter c is the target of only one arrow. Right, in the second step: a three by three grid of small circles with rows 1, 2, 3 and columns a, b, c in which exactly the four cells matching the arrows are filled green, captioned R is a subset of A times B. In the third step the two arrows leaving 1 turn red, captioned not a function.',
    stage: NO_STAGE,
    steps: [
      { narration: 'A relation from A to B relates some elements of A to some of B. Here 1 is related to a and to b, 2 to b, and 3 to c (arrows). The element 1 has two partners — so this is not a function.', objects: [...A.map((_, i) => dt(relA(i), ROLE.ink, 0.12)), ...B.map((_, j) => dt(relB(j), ROLE.ink, 0.12)), ...A.map((a, i) => lb(a, [relA(i)[0] - 0.4, relA(i)[1]])), ...B.map((b, j) => lb(b, [relB(j)[0] + 0.4, relB(j)[1]])), ...pairs.map(([i, j]) => link(relA(i), relB(j), ROLE.output, 0.2))] },
      { narration: 'As a set of ordered pairs: the grid shows all nine pairs of A × B; R is the subset of the four marked cells (1, a), (1, b), (2, b), (3, c). A relation IS a subset of the Cartesian product.', objects: [...[0, 1, 2].flatMap((i) => [0, 1, 2].map((j) => pairs.some(([a, b]) => a === i && b === j) ? dt(relCell(i, j), ROLE.result, 0.2) : ringAt(relCell(i, j), 0.12, ROLE.reference, 16))), ...A.map((a, i) => lb(a, [REL.gx - 0.8, REL.gy[i]])), ...B.map((b, j) => lb(b, [REL.gx + REL.gdx * j, 1.9])), lb('R ⊆ A × B', [REL.gx + 1.0, -2.1], ROLE.result)] },
      { narration: 'Functions are the relations where every element of A has exactly ONE partner. This R is not a function: 1 is related to both a and b (red arrows), and nothing else forces a single value. Every function is a relation, but most relations are not functions.', objects: [link(relA(0), relB(0), ROLE.input, 0.2), link(relA(0), relB(1), ROLE.input, 0.2), lb('not a function', [(REL.ax + REL.bx) / 2, -2.1], ROLE.input)] },
    ],
  }
}

// ── 9. Reflexive relation ────────────────────────────────────────────────────

/** On {1, 2, 3, 4}: R is reflexive when every element is related to itself (a loop at every dot); the right-hand relation is missing the loop at 3. */
export const RFX = { c: [[-3.0, 0.3], [3.0, 0.3]] as ReadonlyArray<Pt>, off: 0.9, arrows: [[0, 1], [1, 2]] as ReadonlyArray<readonly [number, number]>, loops: [[0, 1, 2, 3], [0, 1, 3]] as ReadonlyArray<readonly number[]> }
const squareNode = (c: Pt, i: number): Pt => [c[0] + (i === 0 || i === 3 ? -1 : 1) * RFX.off, c[1] + (i < 2 ? 1 : -1) * RFX.off]
export const rfxNode = (panel: number, i: number): Pt => squareNode(RFX.c[panel], i)
export const rfxLoop = (panel: number, i: number): { c: Pt; r: number } => { const n = rfxNode(panel, i), c = RFX.c[panel]; return { c: [n[0] + ((n[0] - c[0]) / RFX.off) * (0.2 / Math.SQRT2), n[1] + ((n[1] - c[1]) / RFX.off) * (0.2 / Math.SQRT2)], r: 0.22 } }

/** KG: R is reflexive if aRa for every a. */
export function buildReflexiveRelationScene(): SceneSpec {
  return framed(raw_buildReflexiveRelationScene())
}
function raw_buildReflexiveRelationScene(): SceneSpec {
  const panel = (p: number, color: string): SceneObject[] => [...RFX.arrows.map(([a, b]) => link(rfxNode(p, a), rfxNode(p, b), ROLE.reference, 0.2)), ...RFX.loops[p].map((i) => ringAt(rfxLoop(p, i).c, rfxLoop(p, i).r, color, 20)), ...[0, 1, 2, 3].map((i) => dt(rfxNode(p, i), ROLE.ink, 0.12)), ...[0, 1, 2, 3].map((i) => lb(String(i + 1), [rfxNode(p, i)[0] + ((rfxNode(p, i)[0] - RFX.c[p][0]) / RFX.off) * 0.95, rfxNode(p, i)[1] + ((rfxNode(p, i)[1] - RFX.c[p][1]) / RFX.off) * 0.95]))]
  return {
    id: 'math-reflexive-relation',
    title: 'Reflexive relation: a loop at every element',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show reflexivity on the set {1, 2, 3, 4}, a relation drawn as arrows (a loop is an arrow from an element to itself). R is REFLEXIVE when aRa for EVERY element a: a loop at every dot. The left relation has a loop at 1, 2, 3 and 4 (green) and is reflexive; the right one has no loop at 3, so 3 is not related to itself and the relation is not reflexive — one missing loop is enough.',
    ariaLabel:
      'Two copies of four dots at the corners of a square numbered 1 to 4, with arrows from 1 to 2 and 2 to 3. Left: a small green loop at every one of the four dots, captioned reflexive. Right: green loops at 1, 2 and 4 but none at 3, and a red question mark beside 3, captioned not reflexive.',
    stage: NO_STAGE,
    steps: [
      { narration: 'Elements 1, 2, 3, 4 and a relation with the arrows 1 → 2 and 2 → 3 (grey). A loop at an element means that element is related to itself.', objects: [...RFX.arrows.map(([a, b]) => link(rfxNode(0, a), rfxNode(0, b), ROLE.reference, 0.2)), ...[0, 1, 2, 3].map((i) => dt(rfxNode(0, i), ROLE.ink, 0.12)), ...[0, 1, 2, 3].map((i) => lb(String(i + 1), [rfxNode(0, i)[0] + ((rfxNode(0, i)[0] - RFX.c[0][0]) / RFX.off) * 0.95, rfxNode(0, i)[1] + ((rfxNode(0, i)[1] - RFX.c[0][1]) / RFX.off) * 0.95]))] },
      { narration: 'Add a loop at every element (green): 1R1, 2R2, 3R3, 4R4. Now aRa holds for all a — the relation is reflexive.', objects: [...RFX.loops[0].map((i) => ringAt(rfxLoop(0, i).c, rfxLoop(0, i).r, ROLE.result, 20)), lb('reflexive', [RFX.c[0][0], RFX.c[0][1] - 2.2], ROLE.result)] },
      { narration: 'Leave out the loop at 3: 3 is not related to itself (red question mark), so the relation is NOT reflexive — it only takes one element without a loop.', objects: [...panel(1, ROLE.result).filter((_, k) => k >= 0), lb('?', [rfxNode(1, 2)[0] + 0.7, rfxNode(1, 2)[1] - 0.6], ROLE.input), lb('not reflexive', [RFX.c[1][0], RFX.c[1][1] - 2.2], ROLE.input)] },
    ],
  }
}

// ── 10. Symmetric relation ───────────────────────────────────────────────────

/** Symmetric: every arrow a → b has the reverse arrow b → a (left: 1 ↔ 2, 2 ↔ 3, 3 ↔ 4). Not symmetric (right): 1 → 2 and 2 → 3 have no reverse. */
export const SYM = { c: [[-3.0, 0.3], [3.0, 0.3]] as ReadonlyArray<Pt>, dx: 0.9, pairs: [[[0, 1], [1, 0], [1, 2], [2, 1], [2, 3], [3, 2]], [[0, 1], [1, 2], [2, 3], [3, 2]]] as ReadonlyArray<ReadonlyArray<readonly [number, number]>> }
export const symNode = (panel: number, i: number): Pt => [SYM.c[panel][0] + (i - 1.5) * 1.2 * 1.0, SYM.c[panel][1] + (i % 2 === 0 ? 0.4 : -0.4)]
const symArrow = (panel: number, a: number, b: number, color: string): SceneObject => { const A = symNode(panel, a), B = symNode(panel, b), l = Math.hypot(B[0] - A[0], B[1] - A[1]), n: Pt = [-(B[1] - A[1]) / l, (B[0] - A[0]) / l], off = 0.1, from: Pt = [A[0] + n[0] * off, A[1] + n[1] * off], to: Pt = [B[0] + n[0] * off, B[1] + n[1] * off]; return link(from, to, color, 0.22) }

/** KG: R is symmetric if aRb implies bRa. */
export function buildSymmetricRelationScene(): SceneSpec {
  return framed(raw_buildSymmetricRelationScene())
}
function raw_buildSymmetricRelationScene(): SceneSpec {
  const nodes = (p: number): SceneObject[] => [0, 1, 2, 3].flatMap((i) => [dt(symNode(p, i), ROLE.ink, 0.12), lb(String(i + 1), [symNode(p, i)[0], symNode(p, i)[1] + (i % 2 === 0 ? 0.5 : -0.5)])])
  const oneWay = (p: number) => SYM.pairs[p].filter(([a, b]) => !SYM.pairs[p].some(([c, d]) => c === b && d === a))
  return {
    id: 'math-symmetric-relation',
    title: 'Symmetric relation: every arrow has a return arrow',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show symmetry: a relation R is SYMMETRIC when aRb always implies bRa — every arrow has an arrow going back. The left relation relates 1–2, 2–3 and 3–4 in both directions (each pair of arrows is green): symmetric. In the right relation 1 → 2 and 2 → 3 are one-way (red) while 3 ↔ 4 goes both ways: it is not symmetric, because one arrow without a return is enough to break it. “Is a sibling of” is symmetric; “is the mother of” is not.',
    ariaLabel:
      'Two rows of four dots numbered 1 to 4 in a zigzag. Left: between each neighbouring pair there are two parallel green arrows pointing in opposite directions, captioned symmetric. Right: the pairs 1 to 2 and 2 to 3 have a single red arrow each, with no arrow back, while 3 and 4 have two green arrows; captioned not symmetric.',
    stage: NO_STAGE,
    steps: [
      { narration: 'Four elements 1, 2, 3, 4. A relation is drawn as arrows: an arrow from a to b means aRb.', objects: nodes(0) },
      { narration: 'Symmetric: whenever there is an arrow a → b there is also b → a. 1 ↔ 2, 2 ↔ 3, 3 ↔ 4 — each pair has two opposite arrows (green). aRb ⟹ bRa for all a, b.', objects: [...SYM.pairs[0].map(([a, b]) => symArrow(0, a, b, ROLE.result)), lb('symmetric', [SYM.c[0][0], SYM.c[0][1] - 1.8], ROLE.result)] },
      { narration: 'Here 1 → 2 and 2 → 3 have no arrow back (red), though 3 ↔ 4 does. One arrow without a return — 1R2 but not 2R1 — makes the relation not symmetric.', objects: [...nodes(1), ...SYM.pairs[1].map(([a, b]) => symArrow(1, a, b, oneWay(1).some(([c, d]) => c === a && d === b) ? ROLE.input : ROLE.result)), lb('not symmetric', [SYM.c[1][0], SYM.c[1][1] - 1.8], ROLE.input)] },
    ],
  }
}

// ── 11. Transitive relation ──────────────────────────────────────────────────

/** Transitive: aRb and bRc imply aRc. Left: 1 → 2, 2 → 3 and the shortcut 1 → 3 (green). Right: the shortcut is missing (red dashed question mark). */
export const TRN = { c: [[-3.0, 0.2], [3.0, 0.2]] as ReadonlyArray<Pt>, nodes: [[-1.2, -0.7], [0, 0.9], [1.2, -0.7]] as ReadonlyArray<Pt> }
export const trnNode = (panel: number, i: number): Pt => [TRN.c[panel][0] + TRN.nodes[i][0], TRN.c[panel][1] + TRN.nodes[i][1]]

/** KG: R is transitive if aRb and bRc imply aRc. */
export function buildTransitiveRelationScene(): SceneSpec {
  return framed(raw_buildTransitiveRelationScene())
}
function raw_buildTransitiveRelationScene(): SceneSpec {
  const nodes = (p: number): SceneObject[] => [0, 1, 2].flatMap((i) => [dt(trnNode(p, i), ROLE.ink, 0.13), lb(String(i + 1), [trnNode(p, i)[0] + (i === 1 ? 0 : i === 0 ? -0.5 : 0.5), trnNode(p, i)[1] + (i === 1 ? 0.5 : -0.1)])])
  return {
    id: 'math-transitive-relation',
    title: 'Transitive relation: shortcuts must exist',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show transitivity: R is TRANSITIVE when aRb and bRc together force aRc — whenever you can walk a → b → c along arrows there must be a direct arrow (shortcut) a → c. On the left 1 → 2, 2 → 3 and the shortcut 1 → 3 (green) are all present: transitive (like “is less than” on numbers). On the right the walk 1 → 2 → 3 has no direct arrow 1 → 3 (red question mark): not transitive. (“Is a friend of” is typically not transitive.)',
    ariaLabel:
      'Two triangles of three dots numbered 1, 2, 3 with 1 and 3 at the bottom corners and 2 at the top. Left: blue arrows 1 to 2 and 2 to 3 and a green arrow straight along the bottom from 1 to 3, captioned transitive. Right: the same two blue arrows but the bottom side is missing, replaced by a red question mark, captioned not transitive.',
    stage: NO_STAGE,
    steps: [
      { narration: 'Three elements 1, 2, 3 with the arrows 1 → 2 and 2 → 3 (blue): we can walk from 1 to 3 through 2.', objects: [...nodes(0), link(trnNode(0, 0), trnNode(0, 1), ROLE.output, 0.2), link(trnNode(0, 1), trnNode(0, 2), ROLE.output, 0.2)] },
      { narration: 'Transitive: aRb and bRc ⟹ aRc. Since 1R2 and 2R3 there must be a direct arrow 1 → 3 (green shortcut) — and it is there, so this relation is transitive on these elements.', objects: [link(trnNode(0, 0), trnNode(0, 2), ROLE.result, 0.2), lb('transitive', [TRN.c[0][0], TRN.c[0][1] - 1.7], ROLE.result)] },
      { narration: 'Take away the shortcut: 1R2 and 2R3 but not 1R3 (red question mark). One walk of length 2 without its shortcut makes the relation not transitive.', objects: [...nodes(1), link(trnNode(1, 0), trnNode(1, 1), ROLE.output, 0.2), link(trnNode(1, 1), trnNode(1, 2), ROLE.output, 0.2), lb('?', [TRN.c[1][0], trnNode(1, 0)[1] - 0.4], ROLE.input), lb('not transitive', [TRN.c[1][0], TRN.c[1][1] - 1.7], ROLE.input)] },
    ],
  }
}

// ── 12. Equivalence classes ──────────────────────────────────────────────────

/** x ~ y iff x − y is divisible by 3 on {0, …, 8}: three classes [0] = {0, 3, 6}, [1] = {1, 4, 7}, [2] = {2, 5, 8}. */
export const EQC = { cx: [-3.2, 0, 3.2] as readonly number[], ys: [1.0, 0, -1.0] as readonly number[], rx: 0.9, ry: 1.7, cy: 0.0 }
export const eqcEl = (cls: number, k: number): { n: number; p: Pt } => ({ n: cls + 3 * k, p: [EQC.cx[cls], EQC.ys[k]] })
export const sameClass = (x: number, y: number) => (x - y) % 3 === 0

/** KG: an equivalence relation partitions a set into equivalence classes [a] = {x : x ~ a}. */
export function buildEquivalenceClassScene(): SceneSpec {
  return framed(raw_buildEquivalenceClassScene())
}
function raw_buildEquivalenceClassScene(): SceneSpec {
  const classOf = (cls: number, color: string, show: boolean): SceneObject[] => [ellipseAt([EQC.cx[cls], EQC.cy], EQC.rx, EQC.ry, color, 48), ...[0, 1, 2].flatMap((k) => { const e = eqcEl(cls, k); return [dt(e.p, show ? color : ROLE.ink, 0.12), lb(String(e.n), [e.p[0] + 0.45, e.p[1]])] }), ...(show ? [lb(`[${cls}]`, [EQC.cx[cls], EQC.cy + EQC.ry + 0.45], color)] : [])]
  return {
    id: 'math-equivalence-class',
    title: 'Equivalence classes mod 3',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show the equivalence classes of the relation x ~ y ⇔ x − y is divisible by 3 on the set {0, 1, …, 8} (reflexive, symmetric and transitive, so an equivalence relation). The class of a is [a] = {x : x ~ a}, everything equivalent to a: [0] = {0, 3, 6}, [1] = {1, 4, 7}, [2] = {2, 5, 8}. The classes are disjoint and together cover the set, so the relation splits it into three blocks; two elements are equivalent exactly when they lie in the same block.',
    ariaLabel:
      'Nine numbers 0 to 8 arranged in three ovals side by side. The first oval, in green, contains 0, 3 and 6 and is captioned the class of 0; the second, in blue, contains 1, 4, 7 captioned the class of 1; the third, in red, contains 2, 5, 8 captioned the class of 2. Every number sits in exactly one oval.',
    stage: NO_STAGE,
    steps: [
      { narration: 'x ~ y when x − y is a multiple of 3. The class of 0 is everything equivalent to 0: [0] = {0, 3, 6} (green) — 3 − 0 and 6 − 0 are multiples of 3.', objects: classOf(0, ROLE.result, true) },
      { narration: '[1] = {1, 4, 7} (blue): 4 − 1 = 3, 7 − 1 = 6, 7 − 4 = 3. Every pair inside a class is equivalent; elements of different classes (like 1 and 2) are not.', objects: classOf(1, ROLE.output, true) },
      { narration: '[2] = {2, 5, 8} (red). The three classes are disjoint and cover {0, …, 8}: every element lies in exactly one class, so an equivalence relation partitions the set into its classes, and [a] = [b] exactly when a ~ b.', objects: classOf(2, ROLE.input, true) },
    ],
  }
}

// ── 13. Partition ────────────────────────────────────────────────────────────

/** X = {1, …, 6} split into the blocks {1, 2}, {3}, {4, 5, 6} (a partition) versus the overlapping blocks {1, 2, 3}, {3, 4, 5} that leave 6 out (not a partition). */
export const PRT = { xs: [-3.0, -1.8, -0.6, 0.6, 1.8, 3.0] as readonly number[], ys: [1.4, -1.8] as readonly number[], pad: 0.4, ok: [[0, 1], [2], [3, 4, 5]] as ReadonlyArray<readonly number[]>, bad: [[0, 1, 2], [2, 3, 4]] as ReadonlyArray<readonly number[]> }
export const prtDot = (panel: number, i: number): Pt => [PRT.xs[i], PRT.ys[panel]]
export const prtRect = (panel: number, block: readonly number[]): [Pt, Pt] => [[prtDot(panel, block[0])[0] - PRT.pad, prtDot(panel, block[0])[1] - 0.45], [prtDot(panel, block[block.length - 1])[0] + PRT.pad, prtDot(panel, block[0])[1] + 0.45]]
/** a family of blocks is a partition of {0, …, n−1} iff its blocks are non-empty, pairwise disjoint and cover everything */
export const isPartition = (blocks: ReadonlyArray<readonly number[]>, n: number) => blocks.every((b) => b.length > 0) && blocks.every((b, i) => blocks.every((c, j) => i === j || !b.some((x) => c.includes(x)))) && Array.from({ length: n }, (_, x) => blocks.some((b) => b.includes(x))).every(Boolean)

/** KG: a partition of X is a family of non-empty, pairwise disjoint subsets whose union is X. */
export function buildPartitionScene(): SceneSpec {
  return framed(raw_buildPartitionScene())
}
function raw_buildPartitionScene(): SceneSpec {
  const blocks = (panel: number, bs: ReadonlyArray<readonly number[]>, colors: string[]): SceneObject[] => bs.flatMap((b, k) => { const [lo, hi] = prtRect(panel, b); return rect(lo[0], lo[1] + (panel === 1 ? 0.06 * k : 0), hi[0], hi[1] - (panel === 1 ? 0.06 * k : 0), colors[k % colors.length], 0.04) })
  const dotsOf = (panel: number, red: readonly number[] = []): SceneObject[] => [0, 1, 2, 3, 4, 5].flatMap((i) => [dt(prtDot(panel, i), red.includes(i) ? ROLE.input : ROLE.ink, red.includes(i) ? 0.16 : 0.12), lb(String(i + 1), [prtDot(panel, i)[0], prtDot(panel, i)[1] + 0.8])])
  return {
    id: 'math-partition',
    title: 'A partition: disjoint blocks that cover the set',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show a partition of X = {1, …, 6}: a family of non-empty blocks that are pairwise DISJOINT (no element in two blocks) and whose union is all of X (no element left out). The blocks {1, 2}, {3}, {4, 5, 6} (top) do exactly that, so every element lies in exactly one block. The blocks {1, 2, 3} and {3, 4, 5} (bottom) fail both conditions: 3 is in both, and 6 is in none.',
    ariaLabel:
      'Top row: the six numbers 1 to 6 in a line, grouped by three boxes, one around 1 and 2, one around 3 alone, one around 4, 5 and 6, captioned a partition. Bottom row: the same six numbers with two overlapping boxes, one around 1, 2, 3 and one around 3, 4, 5, so that 3 is inside both; the number 6 is red and outside every box. Caption: not a partition, 3 twice and 6 missing.',
    stage: NO_STAGE,
    steps: [
      { narration: 'X = {1, 2, 3, 4, 5, 6}. Split it into the blocks {1, 2}, {3} and {4, 5, 6} (the three boxes).', objects: [...dotsOf(0), ...blocks(0, PRT.ok, [ROLE.output, ROLE.result, ROLE.aid])] },
      { narration: 'This is a partition: the blocks are non-empty, no element lies in two blocks (disjoint), and together they contain every element (cover X). Each element belongs to exactly one block.', objects: [lb('a partition', [0, PRT.ys[0] - 1.1], ROLE.result)] },
      { narration: 'Not every grouping works: {1, 2, 3} and {3, 4, 5} share the element 3 (so they are not disjoint) and leave 6 (red) in no block. Both defects are fatal — a partition needs disjoint blocks AND full coverage.', objects: [...dotsOf(1, [5]), ...blocks(1, PRT.bad, [ROLE.output, ROLE.aid]), lb('3 twice, 6 missing', [0, PRT.ys[1] - 1.1], ROLE.input)] },
    ],
  }
}
