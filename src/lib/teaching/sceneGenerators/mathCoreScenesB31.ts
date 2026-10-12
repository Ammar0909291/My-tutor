/**
 * Core mathematics figures — batch 31 of the mathematics visual campaign (2026-10-12): the rest of the group-theory
 * helpers (cosets, normal subgroups, quotient groups, homomorphisms, isomorphisms, group actions, the symmetric group,
 * field extensions) and the first linear-algebra helpers (matrices, addition, multiplication, transpose, symmetry).
 *
 * Same rules as batches 1-30: one visual language from visualDesign.ts, labels are names not sentences (marks of 1-2
 * characters are free), steps are cumulative, coordinates stay inside +-5, at most 50 objects per step, nothing the figure
 * audit rejects (SM-01 evaluates the arithmetic in a label left to right: never write "1 × 5 + 2 × 7 = 19" as one label),
 * and every table, orbit, coset and product a figure states is re-derived by the test file from the DRAWN numerals, dots,
 * arrows and lines. Dense tables keep >= 0.75 x 0.65 world units per cell and no line or dot within ~0.35 of an entry
 * (see scripts/math/label-displacement.ts).
 */

import type { SceneSpec, SceneObject } from '@/lib/teaching/sceneSpec'
import { ROLE, arrow, dot, label, line } from './visualDesign'
import { P, NO_STAGE, framed } from './mathSceneKit'

export type Pt = readonly [number, number]
const pp = (p: Pt) => P(p[0], p[1])
const ln = (a: Pt, b: Pt, color: string = ROLE.reference, t = 0.04): SceneObject => line(pp(a), pp(b), color, t)
const dt = (p: Pt, color: string = ROLE.ink, r = 0.16): SceneObject => dot(pp(p), color, r)
const lb = (text: string, p: Pt, color: string = ROLE.ink): SceneObject => label(text, pp(p), color, 'primary')
const ar = (a: Pt, b: Pt, color: string = ROLE.reference): SceneObject => arrow(pp(a), pp(b), color)
const link = (a: Pt, b: Pt, d: number, color: string): SceneObject => { const L = Math.hypot(b[0] - a[0], b[1] - a[1]), ux = (b[0] - a[0]) / L, uy = (b[1] - a[1]) / L; return ar([a[0] + d * ux, a[1] + d * uy], [b[0] - d * ux, b[1] - d * uy], color) }
const polar = (k: number, n: number, r: number, cx = 0, cy = 0): Pt => { const a = ((90 - (360 / n) * k) * Math.PI) / 180; return [cx + r * Math.cos(a), cy + r * Math.sin(a)] }
const mod = (a: number, n: number) => ((a % n) + n) % n
const COSET_COLORS = [ROLE.output, ROLE.input, ROLE.result]

// ── 1. Cosets ────────────────────────────────────────────────────────────────

/** ℤ₆ with H = {0, 3}: the cosets {0, 3}, {1, 4}, {2, 5} (each a shifted copy of H) split the six elements into 3 equal pieces: index 3 = 6 ÷ 2. */
export const CST = { n: 6, step: 3, rNode: 1.7, rNum: 2.3 }
export const cstNode = (k: number): Pt => polar(k, CST.n, CST.rNode)
export const cstNum = (k: number): Pt => polar(k, CST.n, CST.rNum)

/** KG: the left cosets aH of a subgroup H partition G into pieces of size |H|; the number of pieces is the index [G : H]. */
export function buildCosetScene(): SceneSpec {
  return framed(raw_buildCosetScene())
}
function raw_buildCosetScene(): SceneSpec {
  const chord = (c: number): SceneObject[] => [ln(cstNode(c), cstNode(c + CST.step), COSET_COLORS[c], 0.05), dt(cstNode(c), COSET_COLORS[c], 0.18), dt(cstNode(c + CST.step), COSET_COLORS[c], 0.18)]
  return {
    id: 'math-coset',
    title: 'Cosets split a group into equal pieces',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show cosets in ℤ₆ = {0, 1, 2, 3, 4, 5} (addition mod 6) with the subgroup H = {0, 3}. The left coset a + H is H shifted by a: 0 + H = {0, 3}, 1 + H = {1, 4}, 2 + H = {2, 5} (3 + H = {3, 0} is the same set as 0 + H, because 3 − 0 = 3 is in H: aH = bH exactly when a⁻¹b ∈ H). The cosets are disjoint, together they cover every element, and each has |H| = 2 elements, so they partition the group; the number of cosets is the index [G : H] = |G| / |H| = 6 ÷ 2 = 3.',
    ariaLabel:
      'Six numbers 0 to 5 round a ring. In the first step a blue chord joins 0 and 3, labelled the set 0, 3. In the second step a red chord joins 1 and 4 and a green chord joins 2 and 5, with their sets labelled. In the third step the captions index 3 and 6 divided by 2 equals 3 appear.',
    stage: NO_STAGE,
    steps: [
      { narration: 'ℤ₆ under addition mod 6, with the subgroup H = {0, 3}: the coset 0 + H = H itself (blue chord).', objects: [...[0, 1, 2, 3, 4, 5].flatMap((k) => [dt(cstNode(k), ROLE.ink, 0.12), lb(String(k), cstNum(k))]), ...chord(0), lb('cosets of H = {0, 3}', [0, 3.3], ROLE.ink), lb('{0, 3}', [-3.6, 0.8], ROLE.output)] },
      { narration: 'Shift H by 1: 1 + H = {1, 4} (red). Shift by 2: 2 + H = {2, 5} (green). Shifting by 3 gives {3, 0} = H again, so there are no more.', objects: [...chord(1), ...chord(2), lb('{1, 4}', [-3.6, 0.0], ROLE.input), lb('{2, 5}', [-3.6, -0.8], ROLE.result)] },
      { narration: 'The three cosets are disjoint, cover all six elements, and each has 2 = |H| elements. The number of cosets is the index [G : H] = 6 ÷ 2 = 3.', objects: [lb('index 3', [3.7, 0.4], ROLE.ink), lb('6 ÷ 2 = 3', [3.7, -0.5], ROLE.ink)] },
    ],
  }
}

// ── 2. Normal subgroups (S₃) ─────────────────────────────────────────────────

/** In S₃ = {e, r, q, s, t, u}: for H = {e, s} the left coset rH = {r, t} differs from the right coset Hr = {r, u} (not normal); for N = {e, r, q} sN = Ns = {s, t, u} (normal). */
export const NSB = {
  names: ['e', 'r', 'q', 's', 't', 'u'] as readonly string[], perms: [[0, 1, 2], [1, 2, 0], [2, 0, 1], [1, 0, 2], [2, 1, 0], [0, 2, 1]] as ReadonlyArray<readonly number[]>,
  cx: [-2.7, 2.7] as readonly number[], R: 1.4, left: 0.45, right: 0.7,
  panels: [{ sub: [0, 3], g: 1 }, { sub: [0, 1, 2], g: 3 }] as ReadonlyArray<{ sub: readonly number[]; g: number }>,
}
export const nsbCompose = (a: number, b: number) => { const p = NSB.perms[a], q = NSB.perms[b], r = [0, 1, 2].map((x) => p[q[x]]); return NSB.perms.findIndex((m) => m.every((v, i) => v === r[i])) }
export const nsbLetter = (panel: number, k: number): Pt => polar(k, 6, NSB.R, NSB.cx[panel], 0)
export const nsbMark = (panel: number, k: number, extra: number): Pt => polar(k, 6, NSB.R + extra, NSB.cx[panel], 0)
export const nsbLeftCoset = (panel: number) => NSB.panels[panel].sub.map((h) => nsbCompose(NSB.panels[panel].g, h)).sort((a, b) => a - b)
export const nsbRightCoset = (panel: number) => NSB.panels[panel].sub.map((h) => nsbCompose(h, NSB.panels[panel].g)).sort((a, b) => a - b)

/** KG: N is normal when gN = Ng for every g: left and right cosets coincide. */
export function buildNormalSubgroupScene(): SceneSpec {
  return framed(raw_buildNormalSubgroupScene())
}
function raw_buildNormalSubgroupScene(): SceneSpec {
  const letters = (panel: number): SceneObject[] => NSB.names.map((nm, k) => lb(nm, nsbLetter(panel, k)))
  const marks = (panel: number, which: 'left' | 'right'): SceneObject[] => (which === 'left' ? nsbLeftCoset(panel) : nsbRightCoset(panel)).map((k) => dt(nsbMark(panel, k, NSB[which]), which === 'left' ? ROLE.output : ROLE.input, 0.14))
  return {
    id: 'math-normal-subgroup',
    title: 'Normal and non-normal subgroups of S₃',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show what normality means in S₃ = {e, r, q, s, t, u} (the six rearrangements of three objects; r, q are the rotations, s, t, u the swaps). A subgroup N is normal when for every g the left coset gN and the right coset Ng are the same set. For H = {e, s} and g = r: the left coset rH = {r, t} (blue dots) but the right coset Hr = {r, u} (red dots) — different, so H is NOT normal. For N = {e, r, q} and g = s: sN = {s, u, t} and Ns = {s, t, u} — the same set (both colours on the same three letters), and this holds for every g, so N is normal. Normal subgroups are exactly those for which the quotient group is well-defined.',
    ariaLabel:
      'Two rings of the six letters e, r, q, s, t, u. Left, titled H equals e, s with g equals r: blue dots mark the left coset on r and t, red dots mark the right coset on r and u. Right, titled N equals e, r, q with g equals s: blue and red dots both mark s, t and u. In the third step the captions not normal in red under the left ring and normal in green under the right ring appear.',
    stage: NO_STAGE,
    steps: [
      { narration: 'Left ring: the subgroup H = {e, s} and the element g = r. Left coset rH = {r∘e, r∘s} = {r, t} (blue dots).', objects: [...letters(0), ...marks(0, 'left'), lb('H = {e, s}', [NSB.cx[0], 3.0], ROLE.ink), lb('g = r', [NSB.cx[0], 2.4], ROLE.ink)] },
      { narration: 'Right coset Hr = {e∘r, s∘r} = {r, u} (red dots): it holds u where the left coset holds t. rH ≠ Hr, so H is not normal.', objects: [...marks(0, 'right')] },
      { narration: 'Right ring: N = {e, r, q} and g = s. sN = {s, u, t} and Ns = {s, t, u}: the same three letters carry both colours, so sN = Ns — N is normal (and the same holds for every g).', objects: [...letters(1), ...marks(1, 'left'), ...marks(1, 'right'), lb('N = {e, r, q}', [NSB.cx[1], 3.0], ROLE.ink), lb('g = s', [NSB.cx[1], 2.4], ROLE.ink), lb('not normal', [NSB.cx[0], -2.7], ROLE.input), lb('normal', [NSB.cx[1], -2.7], ROLE.result), lb('left coset gH', [-2.7, -3.6], ROLE.output), lb('right coset Hg', [2.7, -3.6], ROLE.input)] },
    ],
  }
}

// ── 3. Quotient groups ───────────────────────────────────────────────────────

/** ℤ₆ / {0, 3}: collapsing each coset to a point gives three classes [0], [1], [2] that add like ℤ₃: [1] + [2] = [0] whichever representatives are used. */
export const QTG = { ringCx: -2.4, rRing: 1.5, rNum: 2.05, triCx: 3.0, rTri: 1.3 }
export const qtgNode = (k: number): Pt => polar(k, 6, QTG.rRing, QTG.ringCx)
export const qtgNum = (k: number): Pt => polar(k, 6, QTG.rNum, QTG.ringCx)
export const qtgClass = (c: number): Pt => [QTG.triCx + QTG.rTri * Math.cos(((90 + 120 * c) * Math.PI) / 180), QTG.rTri * Math.sin(((90 + 120 * c) * Math.PI) / 180)]

/** KG: G / N = {gN} with (aN)(bN) = abN, well-defined exactly when N is normal. */
export function buildQuotientGroupScene(): SceneSpec {
  return framed(raw_buildQuotientGroupScene())
}
function raw_buildQuotientGroupScene(): SceneSpec {
  return {
    id: 'math-quotient-group',
    title: 'Quotient group ℤ₆ / {0, 3}',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show how a quotient group is built. Colour the six elements of ℤ₆ by their coset of N = {0, 3}: blue {0, 3}, red {1, 4}, green {2, 5}. Collapsing each coset to a single point leaves three points [0], [1], [2], and they can be added: (aN) + (bN) = (a + b)N. It does not matter which representatives you take: 1 + 2 = 3 lies in the coset [0], and so does 4 + 5 = 9 ≡ 3, so [1] + [2] = [0] either way — this is what "well-defined" means (and why N must be normal; every subgroup of the abelian ℤ₆ is). The quotient has |G| / |N| = 6 / 2 = 3 elements and behaves like ℤ₃.',
    ariaLabel:
      'A ring of the numbers 0 to 5 coloured by coset: 0 and 3 blue, 1 and 4 red, 2 and 5 green. In the second step an arrow leads to three large points labelled the class of 0 in blue, the class of 1 in red and the class of 2 in green. In the third step the captions 1 plus 2 equals 3, 4 plus 5 equals 9 and class 1 plus class 2 equals class 0 appear.',
    stage: NO_STAGE,
    steps: [
      { narration: 'The six elements of ℤ₆ coloured by their coset of N = {0, 3}: {0, 3} blue, {1, 4} red, {2, 5} green.', objects: [...[0, 1, 2, 3, 4, 5].flatMap((k) => [dt(qtgNode(k), COSET_COLORS[k % 3], 0.17), lb(String(k), qtgNum(k))]), lb('6 elements', [QTG.ringCx, 3.3], ROLE.ink)] },
      { narration: 'Collapse each coset to one point: three classes [0], [1], [2] — the quotient group ℤ₆ / N has 6 ÷ 2 = 3 elements.', objects: [ar([-0.2, 0], [0.9, 0], ROLE.reference), ...[0, 1, 2].flatMap((c) => [dt(qtgClass(c), COSET_COLORS[c], 0.24), lb(`[${c}]`, [qtgClass(c)[0] + (c === 0 ? 0 : c === 1 ? -0.7 : 0.7), qtgClass(c)[1] + (c === 0 ? 0.55 : -0.3)], COSET_COLORS[c])]), lb('3 classes', [QTG.triCx, 3.3], ROLE.ink)] },
      { narration: 'Add classes by adding representatives: 1 + 2 = 3 is in [0]; with other representatives 4 + 5 = 9 ≡ 3 is also in [0]. The answer does not depend on the choice, so [1] + [2] = [0].', objects: [lb('1 + 2 = 3', [-2.4, -3.0], ROLE.ink), lb('4 + 5 = 9', [-2.4, -3.7], ROLE.ink), lb('[1] + [2] = [0]', [3.0, -3.3], ROLE.result)] },
    ],
  }
}

// ── 4. Group homomorphism ────────────────────────────────────────────────────

/** φ: ℤ₆ → ℤ₂, φ(x) = x mod 2: φ(a + b) = φ(a) + φ(b); the kernel (the elements sent to 0) is {0, 2, 4} and the image is all of ℤ₂. */
export const HOM = { ringCx: -2.6, rRing: 1.5, rNum: 2.05, right: [[3.2, 1.0], [3.2, -1.0]] as readonly Pt[] }
export const homNode = (k: number): Pt => polar(k, 6, HOM.rRing, HOM.ringCx)
export const homNum = (k: number): Pt => polar(k, 6, HOM.rNum, HOM.ringCx)
export const homImage = (k: number): Pt => HOM.right[k % 2]

/** KG: a homomorphism φ(ab) = φ(a)φ(b); its kernel is a normal subgroup and its image a subgroup. */
export function buildGroupHomomorphismScene(): SceneSpec {
  return framed(raw_buildGroupHomomorphismScene())
}
function raw_buildGroupHomomorphismScene(): SceneSpec {
  const arrowFor = (k: number): SceneObject => link(homNode(k), homImage(k), 0.3, k % 2 === 0 ? ROLE.input : ROLE.output)
  return {
    id: 'math-group-homomorphism',
    title: 'A homomorphism ℤ₆ → ℤ₂',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show a group homomorphism: the parity map φ from ℤ₆ (addition mod 6) to ℤ₂ = {0, 1} (addition mod 2) that sends each x to x mod 2. It keeps the structure: φ(a + b) = φ(a) + φ(b), e.g. φ(2 + 5) = φ(1) = 1 = 0 + 1 = φ(2) + φ(5) (adding first or mapping first gives the same). The KERNEL ker φ = {x : φ(x) = 0} = {0, 2, 4} (red arrows, everything sent to the identity 0 of ℤ₂) is a normal subgroup of ℤ₆; the IMAGE is all of ℤ₂ (the odd numbers 1, 3, 5, blue arrows, hit 1). Elements with the same image form the cosets of the kernel.',
    ariaLabel:
      'A ring of the numbers 0 to 5 on the left and two points 0 and 1 on the right. In the first step red arrows run from 0, 2 and 4 to the point 0. In the second step blue arrows run from 1, 3 and 5 to the point 1. In the third step the captions parity map, kernel 0, 2, 4 and image 0, 1 appear.',
    stage: NO_STAGE,
    steps: [
      { narration: 'The parity map φ(x) = x mod 2 from ℤ₆ to ℤ₂ = {0, 1}. The even numbers 0, 2, 4 go to 0 (red arrows).', objects: [...[0, 1, 2, 3, 4, 5].flatMap((k) => [dt(homNode(k), ROLE.ink, 0.12), lb(String(k), homNum(k))]), ...[0, 1].flatMap((v) => [dt(HOM.right[v], ROLE.ink, 0.16), lb(String(v), [HOM.right[v][0] + 0.55, HOM.right[v][1]])]), ...[0, 2, 4].map(arrowFor), lb('parity map', [0.5, 3.2], ROLE.ink)] },
      { narration: 'The odd numbers 1, 3, 5 go to 1 (blue arrows). Check the rule φ(a + b) = φ(a) + φ(b): φ(2 + 5) = φ(1) = 1 and φ(2) + φ(5) = 0 + 1 = 1.', objects: [1, 3, 5].map(arrowFor) },
      { narration: 'The kernel — everything sent to the identity 0 — is {0, 2, 4}, a subgroup (indeed normal). The image is all of ℤ₂, since both 0 and 1 are hit.', objects: [lb('kernel {0, 2, 4}', [-2.6, -3.1], ROLE.input), lb('image {0, 1}', [3.2, -3.1], ROLE.output)] },
    ],
  }
}

// ── 5. Group isomorphism ─────────────────────────────────────────────────────

/** ℤ₄ under + and {1, i, −1, −i} under × have the same table up to renaming k ↔ iᵏ: the colour pattern of the two tables is identical. */
export const ISO = { dx: 0.78, dy: 0.7, cx: [-2.75, 2.75] as readonly number[], y0: 1.4, names: ['1', 'i', '−1', '−i'] as readonly string[], cols: [ROLE.output, ROLE.input, ROLE.result, ROLE.aid] as readonly string[] }
export const isoAt = (panel: number, i: number, j: number): Pt => [ISO.cx[panel] + (j === -1 ? -(2 + 0.7) * ISO.dx : (j - 1.5) * ISO.dx), i === -1 ? ISO.y0 + 0.65 : ISO.y0 - ISO.dy * i]

/** KG: an isomorphism is a bijective homomorphism; isomorphic groups are structurally identical. */
export function buildGroupIsomorphismScene(): SceneSpec {
  return framed(raw_buildGroupIsomorphismScene())
}
function raw_buildGroupIsomorphismScene(): SceneSpec {
  const names = (panel: number) => (panel === 0 ? ['0', '1', '2', '3'] : [...ISO.names])
  const table = (panel: number): SceneObject[] => [lb(panel === 0 ? '+' : '×', isoAt(panel, -1, -1), ROLE.reference), ...[0, 1, 2, 3].flatMap((k) => [lb(names(panel)[k], isoAt(panel, -1, k), ISO.cols[k]), lb(names(panel)[k], isoAt(panel, k, -1), ISO.cols[k])]), ...[0, 1, 2, 3].flatMap((i) => [0, 1, 2, 3].map((j) => lb(names(panel)[(i + j) % 4], isoAt(panel, i, j), ISO.cols[(i + j) % 4]))),
    ln([isoAt(panel, -1, -1)[0] + 0.3, ISO.y0 + 0.33], [isoAt(panel, -1, 3)[0] + 0.35, ISO.y0 + 0.33], ROLE.reference, 0.03), ln([isoAt(panel, 0, -1)[0] + 0.33, ISO.y0 + 0.95], [isoAt(panel, 0, -1)[0] + 0.33, isoAt(panel, 3, 0)[1] - 0.3], ROLE.reference, 0.03)]
  return {
    id: 'math-group-isomorphism',
    title: 'Isomorphic groups: same table, different names',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show that two groups can be the same group in disguise. The left table is ℤ₄ = {0, 1, 2, 3} under addition mod 4; the right table is the group {1, i, −1, −i} of powers of i under multiplication. Rename 0 ↦ 1, 1 ↦ i, 2 ↦ −1, 3 ↦ −i (that is, k ↦ iᵏ): the map is a bijection, and it turns every sum into the matching product, because iᵃ · iᵇ = iᵃ⁺ᵇ. The colours show it: giving each element the same colour in both tables, the two tables have exactly the same colour pattern, cell for cell. A bijective homomorphism like this is an isomorphism, and isomorphic groups are structurally identical.',
    ariaLabel:
      'Two four-by-four operation tables. Left, the numbers 0 to 3 under addition mod 4, each value in its own colour. In the second step the right table, the numbers 1, i, minus 1 and minus i under multiplication, with the same colours in the same cells. In the third step the captions same colour pattern and isomorphic appear.',
    stage: NO_STAGE,
    steps: [
      { narration: 'ℤ₄ under addition mod 4, each value in its own colour: 0 blue, 1 red, 2 green, 3 violet.', objects: [...table(0), lb('plus mod 4', [ISO.cx[0], 3.0], ROLE.output)] },
      { narration: 'The powers of i under multiplication: 1, i, −1, −i with the colours of 0, 1, 2, 3 (so iᵏ has the colour of k). Each cell is the product of its row and column.', objects: [...table(1), lb('powers of i', [ISO.cx[1], 3.0], ROLE.input)] },
      { narration: 'The two tables have the same colour in every cell: renaming k ↦ iᵏ turns each sum into the matching product. That bijection preserving the operation is an isomorphism.', objects: [lb('same colour pattern', [0, -1.7], ROLE.result), lb('isomorphic', [0, -2.4], ROLE.result)] },
    ],
  }
}

// ── 6. Group action (the symmetries of a square) ─────────────────────────────

/** The 8 symmetries of a square act on its 4 corners: the orbit of corner 1 is all 4 corners, the stabiliser of corner 1 has 2 elements (identity and the reflection through the diagonal 1–3), and 4 × 2 = 8. */
export const ACT = { h: 1.2, labelOff: 0.5 }
export const actCorner = (k: number): Pt => ([[-ACT.h, ACT.h], [ACT.h, ACT.h], [ACT.h, -ACT.h], [-ACT.h, -ACT.h]] as const)[k]
export const actLabel = (k: number): Pt => [actCorner(k)[0] + Math.sign(actCorner(k)[0]) * ACT.labelOff, actCorner(k)[1] + Math.sign(actCorner(k)[1]) * ACT.labelOff]

/** KG: orbit Gx, stabiliser Gₓ and the orbit-stabiliser theorem |Gx| · |Gₓ| = |G|. */
export function buildGroupActionScene(): SceneSpec {
  return framed(raw_buildGroupActionScene())
}
function raw_buildGroupActionScene(): SceneSpec {
  const h = ACT.h
  return {
    id: 'math-group-action',
    title: 'Group action: orbit and stabiliser',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show a group action with the symmetries of a square (4 rotations and 4 reflections, 8 in all) acting on its 4 corners. The ORBIT of corner 1 — every place a symmetry can send it — is all four corners (green dots): a rotation carries it to 2, 3 or 4. The STABILISER of corner 1 — the symmetries that leave it where it is — is just two: doing nothing, and the reflection in the diagonal through corners 1 and 3 (violet line). The orbit-stabiliser theorem says |orbit| × |stabiliser| = |G|: 4 × 2 = 8, the number of symmetries.',
    ariaLabel:
      'A square with corners numbered 1 to 4 clockwise from the top left, titled square symmetries. In the second step green dots mark all four corners, captioned orbit 4. In the third step a violet line runs along the diagonal from corner 1 to corner 3 and the captions stabiliser 2, 4 times 2 equals 8 and 8 symmetries appear.',
    stage: NO_STAGE,
    steps: [
      { narration: 'A square and its 8 symmetries (4 rotations, 4 reflections), which move the corners 1, 2, 3, 4 around.', objects: [ln([-h, h], [h, h], ROLE.reference, 0.05), ln([h, h], [h, -h], ROLE.reference, 0.05), ln([h, -h], [-h, -h], ROLE.reference, 0.05), ln([-h, -h], [-h, h], ROLE.reference, 0.05), ...[0, 1, 2, 3].flatMap((k) => [dt(actCorner(k), ROLE.ink, 0.12), lb(String(k + 1), actLabel(k))]), lb('square symmetries', [0, 3.2], ROLE.ink)] },
      { narration: 'Orbit of corner 1: some symmetry sends it to each of the four corners (green dots), so the orbit has 4 elements.', objects: [...[0, 1, 2, 3].map((k) => dt(actCorner(k), ROLE.result, 0.19)), lb('orbit 4', [3.7, 0.5], ROLE.result)] },
      { narration: 'Stabiliser of corner 1: only the identity and the reflection in the diagonal 1–3 (violet) keep it fixed — 2 symmetries. Orbit × stabiliser = 4 × 2 = 8 = |G|.', objects: [ln([-1.8, 1.8], [1.8, -1.8], ROLE.aid, 0.04), lb('stabiliser 2', [3.7, -0.4], ROLE.aid), lb('4 × 2 = 8', [3.7, -1.3], ROLE.ink), lb('8 symmetries', [0, -3.2], ROLE.ink)] },
    ],
  }
}

// ── 7. Symmetric group (wiring diagrams) ─────────────────────────────────────

/** The 3! = 6 permutations of {1, 2, 3}, each drawn as lines from the top row to the bottom row. */
export const SYM = { perms: [[0, 1, 2], [1, 2, 0], [2, 0, 1], [1, 0, 2], [2, 1, 0], [0, 2, 1]] as ReadonlyArray<readonly number[]>, names: ['e', 'r', 'q', 's', 't', 'u'] as readonly string[], cols: [-3.4, 0, 3.4] as readonly number[], rows: [1.5, -1.3] as readonly number[], gap: 0.6, half: 0.45 }
export const symTop = (idx: number, i: number): Pt => [SYM.cols[idx % 3] + (i - 1) * SYM.gap, SYM.rows[Math.floor(idx / 3)] + SYM.half]
export const symBottom = (idx: number, i: number): Pt => [SYM.cols[idx % 3] + (i - 1) * SYM.gap, SYM.rows[Math.floor(idx / 3)] - SYM.half]

/** KG: Sₙ is the group of all bijections of {1, …, n}; |Sₙ| = n!. */
export function buildSymmetricGroupScene(): SceneSpec {
  return framed(raw_buildSymmetricGroupScene())
}
function raw_buildSymmetricGroupScene(): SceneSpec {
  const diagram = (idx: number): SceneObject[] => [...[0, 1, 2].flatMap((i) => [dt(symTop(idx, i), ROLE.ink, 0.08), dt(symBottom(idx, i), ROLE.ink, 0.08), ln(symTop(idx, i), symBottom(idx, SYM.perms[idx][i]), ROLE.output, 0.03)]), lb(SYM.names[idx], [SYM.cols[idx % 3], SYM.rows[Math.floor(idx / 3)] - 1.0], ROLE.aid)]
  return {
    id: 'math-symmetric-group',
    title: 'The symmetric group S₃: all permutations',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show the symmetric group S₃: every way to rearrange three objects 1, 2, 3. Each rearrangement is drawn as a wiring diagram: the top row is the positions before, the bottom row after, and the line from a top dot goes to where that object ends up. There are 3 × 2 × 1 = 6 of them (3 choices for where 1 goes, then 2 for 2, then 1 for 3): e (nothing moves), r and q (the two rotations), and the swaps s, t, u. In general Sₙ has n! elements, and every finite group sits inside some Sₙ (Cayley’s theorem).',
    ariaLabel:
      'Three small wiring diagrams in the first row, each with three dots on top joined by lines to three dots on the bottom: e with straight lines, r and q with the lines cycled. In the second step three more diagrams in a second row, s, t and u, each swapping two lines. In the third step the captions 6 permutations and 3 times 2 times 1 equals 6 appear.',
    stage: NO_STAGE,
    steps: [
      { narration: 'e (every line straight: nothing moves), r (1→2, 2→3, 3→1) and q (1→3, 2→1, 3→2): the do-nothing move and the two rotations.', objects: [0, 1, 2].flatMap(diagram) },
      { narration: 's, t, u: each swaps two objects and leaves the third (s swaps 1 and 2, t swaps 1 and 3, u swaps 2 and 3).', objects: [3, 4, 5].flatMap(diagram) },
      { narration: 'These are all the possibilities: 3 choices for where object 1 goes, 2 left for object 2, 1 for object 3 — 3 × 2 × 1 = 6 permutations, so |S₃| = 6.', objects: [lb('6 permutations', [0, 3.3], ROLE.result), lb('3 × 2 × 1 = 6', [0, -3.6], ROLE.result)] },
    ],
  }
}

// ── 8. Field extension ───────────────────────────────────────────────────────

/** ℚ(√2) = {a + b√2}: a plane with basis 1, √2 over ℚ (degree 2); (1 + √2)² = 3 + 2√2 stays in it. */
export const FEX = { ox: -4.2, oy: -2.0, u: 1.1, aMax: 4, bMax: 2 }
export const fexAt = (a: number, b: number): Pt => [FEX.ox + FEX.u * a, FEX.oy + FEX.u * b]

/** KG: K / F is a field extension; the degree [K : F] is the dimension of K as a vector space over F. */
export function buildFieldExtensionScene(): SceneSpec {
  return framed(raw_buildFieldExtensionScene())
}
function raw_buildFieldExtensionScene(): SceneSpec {
  const o = fexAt(0, 0)
  const lattice: SceneObject[] = Array.from({ length: FEX.aMax + 1 }, (_, a) => Array.from({ length: FEX.bMax + 1 }, (_, b) => dt(fexAt(a, b), ROLE.reference, 0.08))).flat()
  return {
    id: 'math-field-extension',
    title: 'The extension ℚ(√2) of ℚ',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show the field extension ℚ(√2) of the rationals ℚ. Its elements are the numbers a + b√2 with a, b rational, so each one is a point (a, b) in a plane whose two directions are the basis vectors 1 and √2: ℚ(√2) is a 2-dimensional vector space over ℚ, so the degree [ℚ(√2) : ℚ] = 2. It is closed under multiplication, e.g. (1 + √2)² = 1 + 2√2 + 2 = 3 + 2√2: the point (1, 1) squares to the point (3, 2) (the grid shows integer points only). The tower law [K : F] = [K : E] · [E : F] multiplies degrees along a chain of extensions.',
    ariaLabel:
      'A grid of small dots with the horizontal direction labelled 1 and the vertical direction labelled square root of 2. In the first step a green arrow of length 1 along the first and a blue arrow of length 1 along the second, captioned basis 1, square root of 2 and degree 2. In the second step a violet point at 1, 1 labelled 1 plus square root of 2. In the third step a red point at 3, 2 labelled 3 plus 2 square root of 2 and the caption open bracket 1 plus root 2 close bracket squared equals 3 plus 2 root 2.',
    stage: NO_STAGE,
    steps: [
      { narration: 'Every element a + b√2 is a point (a, b) with a along 1 and b along √2. Two basis vectors (green 1, blue √2) span everything: the degree is 2.', objects: [...lattice, ar(o, fexAt(4.7, 0)), ar(o, fexAt(0, 2.8)), ar(o, fexAt(1, 0), ROLE.result), ar(o, fexAt(0, 1), ROLE.output), lb('1', [fexAt(1, 0)[0], o[1] - 0.5], ROLE.result), lb('√2', [o[0] - 0.55, fexAt(0, 1)[1]], ROLE.output), lb('basis 1, √2', [3.3, 2.5], ROLE.ink), lb('degree 2', [3.3, 1.8], ROLE.ink)] },
      { narration: 'The point (1, 1) is the number 1 + √2 (violet).', objects: [dt(fexAt(1, 1), ROLE.aid, 0.16), lb('1 + √2', [fexAt(1, 1)[0] - 0.2, fexAt(1, 1)[1] + 0.5], ROLE.aid)] },
      { narration: 'Squaring it: (1 + √2)² = 1 + 2√2 + 2 = 3 + 2√2, the point (3, 2) (red) — still of the form a + b√2, so the set is closed under multiplication.', objects: [dt(fexAt(3, 2), ROLE.input, 0.16), lb('3 + 2√2', [fexAt(3, 2)[0] + 0.1, fexAt(3, 2)[1] + 0.5], ROLE.input), lb('(1 + √2)² = 3 + 2√2', [0.3, -3.3], ROLE.ink)] },
    ],
  }
}

// ── 9. Matrix ────────────────────────────────────────────────────────────────

/** A 2 × 3 matrix: 2 rows, 3 columns, 6 entries; the entry in row 2, column 3 is 6. */
export const MTX = { dx: 0.9, dy: 0.75, cx: 0, cy: 0.4, rows: [[1, 2, 3], [4, 5, 6]] as ReadonlyArray<readonly number[]> }
export const mtxAt = (i: number, j: number): Pt => [MTX.cx + (j - 1) * MTX.dx, MTX.cy - MTX.dy * i]

/** KG: a matrix is a rectangular array of numbers; a_ij is the entry in row i, column j. */
export function buildMatrixScene(): SceneSpec {
  return framed(raw_buildMatrixScene())
}
function raw_buildMatrixScene(): SceneSpec {
  const top = mtxAt(0, 0)[1] + 0.45, bottom = mtxAt(1, 0)[1] - 0.45, left = mtxAt(0, 0)[0] - 0.75, right = mtxAt(0, 2)[0] + 0.75
  const bracket = (x: number, dir: number): SceneObject[] => [ln([x, top], [x, bottom], ROLE.reference, 0.05), ln([x, top], [x + dir * 0.2, top], ROLE.reference, 0.05), ln([x, bottom], [x + dir * 0.2, bottom], ROLE.reference, 0.05)]
  return {
    id: 'math-matrix',
    title: 'A matrix: rows, columns and entries',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show what a matrix is: a rectangular array of numbers between brackets. This one has 2 rows (horizontal lines of entries) and 3 columns (vertical lines), so it is a 2 × 3 matrix with 2 × 3 = 6 entries. An entry is named by its row and column: the entry in row 2, column 3 is a₂₃ = 6. Matrices store a table of numbers, a system of equations or a linear map in one object, and the size (rows first, then columns) decides which operations are possible.',
    ariaLabel:
      'A matrix with two rows and three columns between square brackets: 1 2 3 in the top row and 4 5 6 in the bottom row. In the second step the captions 2 rows on the left and 3 columns above and size 2 by 3 appear. In the third step a green point beside the entry 6 in row 2, column 3 with the caption a 2 3 equals 6.',
    stage: NO_STAGE,
    steps: [
      { narration: 'A matrix: numbers in a rectangle between brackets — here 1, 2, 3 on top and 4, 5, 6 below.', objects: [...bracket(left, 1), ...bracket(right, -1), ...MTX.rows.flatMap((row, i) => row.map((v, j) => lb(String(v), mtxAt(i, j))))] },
      { narration: 'It has 2 rows and 3 columns, so its size is 2 × 3 (rows first), with 6 entries.', objects: [lb('2 rows', [-3.0, mtxAt(0, 0)[1] - MTX.dy / 2], ROLE.output), lb('3 columns', [0, mtxAt(0, 0)[1] + 1.0], ROLE.input), lb('size 2 × 3', [3.1, mtxAt(0, 0)[1] - MTX.dy / 2], ROLE.ink)] },
      { narration: 'An entry is named by (row, column): the entry in row 2, column 3 is a₂₃ = 6 (green).', objects: [dt([mtxAt(1, 2)[0] + 0.5, mtxAt(1, 2)[1]], ROLE.result, 0.12), lb('a₂₃ = 6', [3.1, mtxAt(1, 2)[1] - 0.5], ROLE.result)] },
    ],
  }
}

// ── 10. Matrix addition ──────────────────────────────────────────────────────

/** [[1, 2], [3, 4]] + [[5, 6], [7, 8]] = [[6, 8], [10, 12]]: add the entries in the same position. */
export const MAD = { dx: 0.8, dy: 0.75, cy: 0.4, cx: [-4.0, -1.4, 1.6] as readonly number[], mats: [[[1, 2], [3, 4]], [[5, 6], [7, 8]], [[6, 8], [10, 12]]] as ReadonlyArray<ReadonlyArray<readonly number[]>> }
export const madAt = (m: number, i: number, j: number): Pt => [MAD.cx[m] + (j - 0.5) * MAD.dx, MAD.cy - MAD.dy * i]

/** KG: matrices of the same size are added entry by entry. */
export function buildMatrixAdditionScene(): SceneSpec {
  return framed(raw_buildMatrixAdditionScene())
}
function raw_buildMatrixAdditionScene(): SceneSpec {
  const mat = (m: number): SceneObject[] => { const top = MAD.cy + 0.45, bottom = MAD.cy - MAD.dy - 0.45, l = MAD.cx[m] - 0.85, r = MAD.cx[m] + 0.85; return [ln([l, top], [l, bottom], ROLE.reference, 0.05), ln([l, top], [l + 0.2, top], ROLE.reference, 0.05), ln([l, bottom], [l + 0.2, bottom], ROLE.reference, 0.05), ln([r, top], [r, bottom], ROLE.reference, 0.05), ln([r, top], [r - 0.2, top], ROLE.reference, 0.05), ln([r, bottom], [r - 0.2, bottom], ROLE.reference, 0.05), ...MAD.mats[m].flatMap((row, i) => row.map((v, j) => lb(String(v), madAt(m, i, j), i === 0 && j === 1 ? ROLE.result : ROLE.ink)))] }
  return {
    id: 'math-matrix-addition',
    title: 'Matrix addition entry by entry',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show matrix addition: two matrices of the SAME size are added by adding the entries that sit in the same position. [[1, 2], [3, 4]] + [[5, 6], [7, 8]]: top left 1 + 5 = 6, top right 2 + 6 = 8 (green), bottom left 3 + 7 = 10, bottom right 4 + 8 = 12, giving [[6, 8], [10, 12]]. Matrices of different sizes cannot be added, and the result has the same size as the two summands.',
    ariaLabel:
      'Two 2 by 2 matrices, 1 2 over 3 4 and 5 6 over 7 8, with a plus sign between them. In the second step an equals sign and the matrix 6 8 over 10 12. The top-right entries 2, 6 and 8 are drawn in green. In the third step the caption 2 plus 6 equals 8 and add entry by entry appear.',
    stage: NO_STAGE,
    steps: [
      { narration: 'Two 2 × 2 matrices A and B. They have the same size, so they can be added.', objects: [...mat(0), lb('+', [-2.7, MAD.cy - MAD.dy / 2]), ...mat(1)] },
      { narration: 'The sum C = A + B has the same size, with each entry the sum of the entries in that position: 6, 8, 10, 12.', objects: [lb('=', [-0.1, MAD.cy - MAD.dy / 2]), ...mat(2)] },
      { narration: 'Look at the top-right position (green): 2 in A and 6 in B give 2 + 6 = 8 in C. Every other position works the same way.', objects: [lb('2 + 6 = 8', [-1.2, -1.8], ROLE.result), lb('add entry by entry', [-1.2, -2.6], ROLE.ink)] },
    ],
  }
}

// ── 11. Matrix multiplication ────────────────────────────────────────────────

/** [[1, 2], [3, 4]] × [[5, 6], [7, 8]] = [[19, 22], [43, 50]]: entry (1, 1) is row 1 of A times column 1 of B: 1 × 5 + 2 × 7 = 19. */
export const MMT = { dx: 0.8, dy: 0.75, cy: 0.4, cx: [-4.0, -1.4, 1.6] as readonly number[], mats: [[[1, 2], [3, 4]], [[5, 6], [7, 8]], [[19, 22], [43, 50]]] as ReadonlyArray<ReadonlyArray<readonly number[]>> }
export const mmtAt = (m: number, i: number, j: number): Pt => [MMT.cx[m] + (j - 0.5) * MMT.dx, MMT.cy - MMT.dy * i]

/** KG: the (i, j) entry of AB is the dot product of row i of A with column j of B. */
export function buildMatrixMultiplicationScene(): SceneSpec {
  return framed(raw_buildMatrixMultiplicationScene())
}
function raw_buildMatrixMultiplicationScene(): SceneSpec {
  const colorOf = (m: number, i: number, j: number) => (m === 0 && i === 0 ? ROLE.result : m === 1 && j === 0 ? ROLE.input : m === 2 && i === 0 && j === 0 ? ROLE.aid : ROLE.ink)
  const mat = (m: number): SceneObject[] => { const top = MMT.cy + 0.45, bottom = MMT.cy - MMT.dy - 0.45, l = MMT.cx[m] - 0.85, r = MMT.cx[m] + 0.85; return [ln([l, top], [l, bottom], ROLE.reference, 0.05), ln([l, top], [l + 0.2, top], ROLE.reference, 0.05), ln([l, bottom], [l + 0.2, bottom], ROLE.reference, 0.05), ln([r, top], [r, bottom], ROLE.reference, 0.05), ln([r, top], [r - 0.2, top], ROLE.reference, 0.05), ln([r, bottom], [r - 0.2, bottom], ROLE.reference, 0.05), ...MMT.mats[m].flatMap((row, i) => row.map((v, j) => lb(String(v), mmtAt(m, i, j), colorOf(m, i, j))))] }
  return {
    id: 'math-matrix-multiplication',
    title: 'Matrix multiplication: row times column',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show matrix multiplication. Each entry of the product AB is a dot product: multiply row i of A by column j of B entry by entry and add. For [[1, 2], [3, 4]] × [[5, 6], [7, 8]] the top-left entry uses row 1 of A (green: 1, 2) and column 1 of B (red: 5, 7): 1 × 5 = 5 and 2 × 7 = 14, and 5 + 14 = 19 (violet). The full product is [[19, 22], [43, 50]]. The inner sizes must match (columns of A = rows of B), and in general AB ≠ BA.',
    ariaLabel:
      'Two 2 by 2 matrices side by side, 1 2 over 3 4 and 5 6 over 7 8, with a times sign: the top row of the first, 1 and 2, is green and the left column of the second, 5 and 7, is red. In the second step an equals sign and the product matrix 19 22 over 43 50 with its top-left entry 19 in violet. In the third step the captions 1 times 5 equals 5, 2 times 7 equals 14 and 5 plus 14 equals 19 appear.',
    stage: NO_STAGE,
    steps: [
      { narration: 'A (left) and B (right). To find the top-left entry of AB, take row 1 of A (green: 1, 2) and column 1 of B (red: 5, 7).', objects: [...mat(0), lb('×', [-2.7, MMT.cy - MMT.dy / 2]), ...mat(1)] },
      { narration: 'The product AB is again 2 × 2: [[19, 22], [43, 50]]. The top-left entry 19 (violet) is the one we trace.', objects: [lb('=', [-0.1, MMT.cy - MMT.dy / 2]), ...mat(2)] },
      { narration: 'Multiply the pairs and add: 1 × 5 = 5 and 2 × 7 = 14, then 5 + 14 = 19. The other entries are found the same way with other rows and columns.', objects: [lb('1 × 5 = 5', [-1.2, -1.7], ROLE.ink), lb('2 × 7 = 14', [-1.2, -2.4], ROLE.ink), lb('5 + 14 = 19', [-1.2, -3.1], ROLE.aid)] },
    ],
  }
}

// ── 12. Matrix transpose ─────────────────────────────────────────────────────

/** Aᵀ swaps rows and columns: the 2 × 3 matrix [[1, 2, 3], [4, 5, 6]] becomes the 3 × 2 matrix [[1, 4], [2, 5], [3, 6]]. */
export const MTP = { dx: 0.85, dy: 0.7, cy: 0.5, cxA: -2.9, cxT: 2.6, A: [[1, 2, 3], [4, 5, 6]] as ReadonlyArray<readonly number[]> }
export const mtpA = (i: number, j: number): Pt => [MTP.cxA + (j - 1) * MTP.dx, MTP.cy - MTP.dy * i]
export const mtpT = (i: number, j: number): Pt => [MTP.cxT + (j - 0.5) * MTP.dx, MTP.cy - MTP.dy * (i - 0.5)]

/** KG: the transpose Aᵀ has (Aᵀ)ᵢⱼ = Aⱼᵢ: rows become columns. */
export function buildMatrixTransposeScene(): SceneSpec {
  return framed(raw_buildMatrixTransposeScene())
}
function raw_buildMatrixTransposeScene(): SceneSpec {
  const bracketBox = (cx: number, rowsN: number, colsN: number, dx: number, dy: number, topY: number): SceneObject[] => { const top = topY + 0.45, bottom = topY - dy * (rowsN - 1) - 0.45, l = cx - (colsN / 2) * dx - 0.05, r = cx + (colsN / 2) * dx + 0.05; return [ln([l, top], [l, bottom], ROLE.reference, 0.05), ln([l, top], [l + 0.2, top], ROLE.reference, 0.05), ln([l, bottom], [l + 0.2, bottom], ROLE.reference, 0.05), ln([r, top], [r, bottom], ROLE.reference, 0.05), ln([r, top], [r - 0.2, top], ROLE.reference, 0.05), ln([r, bottom], [r - 0.2, bottom], ROLE.reference, 0.05)] }
  const rowColor = (i: number) => (i === 0 ? ROLE.result : ROLE.input)
  return {
    id: 'math-matrix-transpose',
    title: 'Matrix transpose: rows become columns',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show the transpose of a matrix: flip it over its main diagonal so that each row becomes a column. The 2 × 3 matrix A = [[1, 2, 3], [4, 5, 6]] has transpose Aᵀ = [[1, 4], [2, 5], [3, 6]], a 3 × 2 matrix: row 1 of A (green: 1, 2, 3) is column 1 of Aᵀ, and row 2 (red: 4, 5, 6) is column 2. In symbols the entry in row i, column j of Aᵀ is the entry in row j, column i of A. Transposing twice returns A.',
    ariaLabel:
      'A 2 by 3 matrix whose top row 1 2 3 is green and bottom row 4 5 6 is red. In the second step a 3 by 2 matrix to the right whose left column 1 2 3 is green and right column 4 5 6 is red, with an arrow between them labelled transpose. In the third step the caption rows become columns appears.',
    stage: NO_STAGE,
    steps: [
      { narration: 'A is 2 × 3: its first row 1, 2, 3 is green and its second row 4, 5, 6 is red.', objects: [...bracketBox(MTP.cxA, 2, 3, MTP.dx, MTP.dy, MTP.cy), ...MTP.A.flatMap((row, i) => row.map((v, j) => lb(String(v), mtpA(i, j), rowColor(i)))), lb('A', [MTP.cxA, -1.4], ROLE.aid)] },
      { narration: 'Its transpose Aᵀ is 3 × 2: the green row becomes the first column and the red row the second column.', objects: [ar([-0.9, 0.15], [0.5, 0.15], ROLE.reference), lb('transpose', [-0.2, 0.75], ROLE.ink), ...bracketBox(MTP.cxT, 3, 2, MTP.dx, MTP.dy, MTP.cy + MTP.dy / 2), ...[0, 1, 2].flatMap((i) => [0, 1].map((j) => lb(String(MTP.A[j][i]), mtpT(i, j), rowColor(j)))), lb('Aᵀ', [MTP.cxT, -1.6], ROLE.aid)] },
      { narration: 'Rows become columns: the entry in row i, column j of Aᵀ is the entry in row j, column i of A. The size 2 × 3 becomes 3 × 2.', objects: [lb('rows become columns', [0, -2.7], ROLE.result)] },
    ],
  }
}

// ── 13. Symmetric matrix ─────────────────────────────────────────────────────

/** [[1, 2, 3], [2, 4, 5], [3, 5, 6]] equals its own transpose: mirror entries across the diagonal match (same colour). */
export const SMM = { dx: 0.95, dy: 0.8, cx: 0, cy: 0.9, M: [[1, 2, 3], [2, 4, 5], [3, 5, 6]] as ReadonlyArray<readonly number[]> }
export const smmAt = (i: number, j: number): Pt => [SMM.cx + (j - 1) * SMM.dx, SMM.cy - SMM.dy * i]
export const smmColor = (i: number, j: number) => (i === j ? ROLE.ink : [[ROLE.ink, ROLE.result, ROLE.input], [ROLE.result, ROLE.ink, ROLE.aid], [ROLE.input, ROLE.aid, ROLE.ink]][i][j])

/** KG: A is symmetric when A = Aᵀ, i.e. aᵢⱼ = aⱼᵢ. */
export function buildSymmetricMatrixScene(): SceneSpec {
  return framed(raw_buildSymmetricMatrixScene())
}
function raw_buildSymmetricMatrixScene(): SceneSpec {
  const top = smmAt(0, 0)[1] + 0.5, bottom = smmAt(2, 0)[1] - 0.5, l = smmAt(0, 0)[0] - 0.8, r = smmAt(0, 2)[0] + 0.8
  return {
    id: 'math-symmetric-matrix',
    title: 'Symmetric matrix: A = Aᵀ',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show a symmetric matrix: one that equals its own transpose, A = Aᵀ, so that the entry in row i, column j equals the entry in row j, column i. In [[1, 2, 3], [2, 4, 5], [3, 5, 6]] the diagonal entries 1, 4, 6 are free, while the entries on opposite sides of the diagonal match in pairs: 2 and 2 (green), 3 and 3 (red), 5 and 5 (violet) — the matrix is a mirror image of itself across the main diagonal. Only square matrices can be symmetric.',
    ariaLabel:
      'A 3 by 3 matrix, 1 2 3 over 2 4 5 over 3 5 6, between brackets. The two 2s are green, the two 3s red and the two 5s violet; the diagonal 1, 4, 6 is white. In the second step the caption mirror pairs share a colour appears, and in the third step the caption A equals A transpose.',
    stage: NO_STAGE,
    steps: [
      { narration: 'A 3 × 3 matrix. The numbers on the diagonal (1, 4, 6) are white; the others come in coloured pairs.', objects: [ln([l, top], [l, bottom], ROLE.reference, 0.05), ln([l, top], [l + 0.2, top], ROLE.reference, 0.05), ln([l, bottom], [l + 0.2, bottom], ROLE.reference, 0.05), ln([r, top], [r, bottom], ROLE.reference, 0.05), ln([r, top], [r - 0.2, top], ROLE.reference, 0.05), ln([r, bottom], [r - 0.2, bottom], ROLE.reference, 0.05), ...SMM.M.flatMap((row, i) => row.map((v, j) => lb(String(v), smmAt(i, j), smmColor(i, j))))] },
      { narration: 'Entries on opposite sides of the diagonal have the same colour and the same value: the two 2s, the two 3s, the two 5s.', objects: [lb('mirror pairs share a colour', [0, -2.3], ROLE.ink)] },
      { narration: 'So flipping the matrix over its diagonal changes nothing: A = Aᵀ, and a matrix like this is called symmetric.', objects: [lb('A = Aᵀ', [0, -3.1], ROLE.result)] },
    ],
  }
}
