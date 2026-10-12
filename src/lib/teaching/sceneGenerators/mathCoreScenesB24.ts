/**
 * Core mathematics figures — batch 24 of the mathematics visual campaign (2026-10-12), the last
 * essential-tier batch: smooth manifolds (stereographic charts), categories (objects, morphisms and
 * composition; mono / epi / iso; functors; natural transformations), the five Platonic solids, curves
 * in space (curvature and the osculating circle) and the Frenet–Serret frame, simple functions and
 * the Lebesgue integral, the cyclic group ℤ₆ and convolution.
 *
 * Same rules as batches 1-23: one visual language from visualDesign.ts, labels are names not
 * sentences (marks of 1-2 characters are free), steps are cumulative, coordinates stay inside +-5, at
 * most 50 objects per step, nothing the figure audit rejects (SM-01 evaluates the arithmetic in a label
 * left to right and compares labels that share a last token before "="), and every number drawn comes
 * from the constants and pure helpers exported here, which the test file re-derives from the DRAWN
 * coordinates (charts and transition maps, group closure, vertex / edge / face counts of polyhedra,
 * Frenet equations by finite differences, areas of overlaps). A label is about 0.26 screen units wide
 * per character.
 */

import type { SceneSpec, SceneObject } from '@/lib/teaching/sceneSpec'
import { ROLE, arrow, curve, dot, label, line } from './visualDesign'
import { P, NO_STAGE, framed, shadeConvex, arcPts, type V3 } from './mathSceneKit'

export type Pt = readonly [number, number]
const ln = (a: Pt, b: Pt, color: string = ROLE.reference, t = 0.04): SceneObject => line(P(a[0], a[1]), P(b[0], b[1]), color, t)
const dt = (p: Pt, color: string = ROLE.ink, r = 0.16): SceneObject => dot(P(p[0], p[1]), color, r)
const lb = (text: string, p: Pt, color: string = ROLE.ink): SceneObject => label(text, P(p[0], p[1]), color, 'primary')
const ringAt = (c: Pt, r: number, color: string, n = 40): SceneObject => curve(arcPts(c[0], c[1], r, 0, 360, n), color)
const f2 = (n: number) => (Math.round(n * 100) / 100).toFixed(2)
const DEG = Math.PI / 180
/** An arrow between two objects, trimmed by r at both ends so it does not run into the dots. */
const link = (a: Pt, b: Pt, color: string, r = 0.25): SceneObject => { const l = Math.hypot(b[0] - a[0], b[1] - a[1]), d: Pt = [(b[0] - a[0]) / l, (b[1] - a[1]) / l]; return arrow(P(a[0] + d[0] * r, a[1] + d[1] * r), P(b[0] - d[0] * r, b[1] - d[1] * r), color) }
/** The point beside the middle of a→b, offset to its left by d. */
const side = (a: Pt, b: Pt, d: number): Pt => { const l = Math.hypot(b[0] - a[0], b[1] - a[1]); return [(a[0] + b[0]) / 2 - ((b[1] - a[1]) / l) * d, (a[1] + b[1]) / 2 + ((b[0] - a[0]) / l) * d] }

// ── 1. Smooth manifold: stereographic charts of the circle ───────────────────

/** The circle with the two stereographic charts u = x/(1 − y) (from N) and v = x/(1 + y) (from S): the transition map is v = 1/u, smooth on u ≠ 0. */
export const SMF = { c: [-2.4, 0.9] as Pt, R: 1.3, thetas: [20, -30, 150] as readonly number[], hyp: { c: [2.9, 0.3] as Pt, u: 0.55 } }
export const smfP = (theta: number): Pt => [SMF.c[0] + SMF.R * Math.cos(theta * DEG), SMF.c[1] + SMF.R * Math.sin(theta * DEG)]
export const chartU = (theta: number) => Math.cos(theta * DEG) / (1 - Math.sin(theta * DEG))
export const chartV = (theta: number) => Math.cos(theta * DEG) / (1 + Math.sin(theta * DEG))
export const smfAxisN = (theta: number): Pt => [SMF.c[0] + SMF.R * chartU(theta), SMF.c[1]]
export const smfAxisS = (theta: number): Pt => [SMF.c[0] + SMF.R * chartV(theta), SMF.c[1]]
export const hypAt = (u: number, v: number): Pt => [SMF.hyp.c[0] + SMF.hyp.u * u, SMF.hyp.c[1] + SMF.hyp.u * v]

/** KG: a smooth manifold has an atlas of charts whose transition maps are C^∞. */
export function buildSmoothManifoldScene(): SceneSpec {
  return framed(raw_buildSmoothManifoldScene())
}
function raw_buildSmoothManifoldScene(): SceneSpec {
  const { c, R, thetas, hyp } = SMF, N: Pt = [c[0], c[1] + R], S: Pt = [c[0], c[1] - R]
  const branch = (u0: number, u1: number): SceneObject => curve(Array.from({ length: 41 }, (_, i) => { const u = u0 + ((u1 - u0) * i) / 40, p = hypAt(u, 1 / u); return P(p[0], p[1]) }), ROLE.aid)
  return {
    id: 'math-smooth-manifold',
    title: 'Smooth manifold: charts with smooth transition maps',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show a smooth atlas on the circle. Stereographic projection from the north pole N sends a point P of the circle to the point u = x/(1 − y) of the horizontal line (blue rays), projection from the south pole S sends it to v = x/(1 + y) (red rays). Each chart covers all of the circle but one pole, and together they cover it. On the overlap the change of chart is v = 1/u (because u·v = x²/(1 − y²) = 1), a function that is infinitely differentiable wherever it is defined (u ≠ 0): the charts are compatible, which is what makes the circle a smooth manifold.',
    ariaLabel:
      'A circle with a dot N at the top and a dot S at the bottom and a horizontal line through its centre. Three dots on the circle each have a blue ray from N through them landing on the horizontal line. In the second step three red rays from S through the same three dots land at other places on the line. In the third step, at the right, the graph of v equals 1 over u: two violet hyperbola branches, with three white dots on them, one for each of the three circle points, captioned v equals 1 over u and smooth for u not zero.',
    stage: NO_STAGE,
    steps: [
      { narration: 'Chart from the north pole N: send a point P of the circle to where the line N–P meets the horizontal line, u = x/(1 − y) (blue rays). Every point except N gets a coordinate u, so this chart straightens the circle minus N onto the whole line.', objects: [ringAt(c, R, ROLE.reference, 56), ln([c[0] - 2.5, c[1]], [c[0] + 2.7, c[1]], ROLE.reference, 0.03), dt(N, ROLE.ink, 0.12), lb('N', [N[0], N[1] + 0.45]), ...thetas.map((t) => ln(N, smfAxisN(t), ROLE.output, 0.03)), ...thetas.map((t) => dt(smfP(t), ROLE.ink, 0.1)), ...thetas.map((t) => dt(smfAxisN(t), ROLE.output, 0.09))] },
      { narration: 'Chart from the south pole S: v = x/(1 + y) (red rays). It covers every point except S. The same three points P get different coordinates now, so each point of the overlap (everything but the poles) has a u and a v.', objects: [dt(S, ROLE.ink, 0.12), lb('S', [S[0], S[1] - 0.45]), ...thetas.map((t) => ln(S, smfAxisS(t), ROLE.input, 0.03)), ...thetas.map((t) => dt(smfAxisS(t), ROLE.input, 0.09))] },
      { narration: 'The transition map takes u to v: since u·v = x²/(1 − y²) = 1 on the circle, v = 1/u. Its graph (violet) is smooth wherever u ≠ 0, and so is its inverse (also 1/u). Charts whose transition maps are all C^∞ form a smooth atlas — the circle is a smooth manifold, and smooth functions, vectors and forms make sense on it.', objects: [arrow(P(hyp.c[0] - 2.0, hyp.c[1]), P(hyp.c[0] + 2.0, hyp.c[1]), ROLE.reference), arrow(P(hyp.c[0], hyp.c[1] - 2.0), P(hyp.c[0], hyp.c[1] + 2.0), ROLE.reference), branch(0.35, 3.1), branch(-3.1, -0.35), ...thetas.map((t) => dt(hypAt(chartU(t), chartV(t)), ROLE.ink, 0.1)), lb('v = 1/u', [hyp.c[0] + 1.2, hyp.c[1] + 2.4], ROLE.aid), lb('smooth: u ≠ 0', [hyp.c[0], hyp.c[1] - 2.6], ROLE.aid)] },
    ],
  }
}

// ── 2. Category ──────────────────────────────────────────────────────────────

/** Objects A, B, C, D with f: A → B, g: B → C, h: C → D, the composites g∘f, h∘g and h∘g∘f, and an identity loop on each object. */
export const CAT = { A: [-3.5, -0.5] as Pt, B: [-1.2, 1.7] as Pt, C: [1.2, -0.5] as Pt, D: [3.5, 1.7] as Pt }
export const catObjects = (): Array<[string, Pt]> => [['A', CAT.A], ['B', CAT.B], ['C', CAT.C], ['D', CAT.D]]

/** KG: a category has objects, morphisms Hom(A, B), associative composition and identities 1_A. */
export function buildCategoryScene(): SceneSpec {
  return framed(raw_buildCategoryScene())
}
function raw_buildCategoryScene(): SceneSpec {
  const { A, B, C, D } = CAT
  const loop = (p: Pt): SceneObject => ringAt([p[0] - 0.45, p[1] - 0.45], 0.25, ROLE.reference, 24)
  return {
    id: 'math-category',
    title: 'A category: objects, morphisms, composition',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show the structure of a category: objects (dots A, B, C, D) and morphisms (arrows) between them, f: A → B, g: B → C, h: C → D. Whenever the end of one arrow is the start of the next they COMPOSE: g∘f: A → C (green); every object has an identity morphism (the loops); and composition is ASSOCIATIVE — h∘(g∘f) and (h∘g)∘f are the same morphism A → D, so h∘g∘f needs no brackets. Sets with functions, groups with homomorphisms, spaces with continuous maps and vector spaces with linear maps are all examples.',
    ariaLabel:
      'Four dots A, B, C, D, with A low on the left, B high, C low and D high on the right, joined in a zigzag by three blue arrows f from A to B, g from B to C and h from C to D. In the second step a green arrow g after f runs straight from A to C and a green arrow h after g from B to D, and each dot gets a small identity loop. In the third step a long green arrow from A to D, labelled h after g after f, completes the picture: the two ways of bracketing give the same arrow.',
    stage: NO_STAGE,
    steps: [
      { narration: 'A category has OBJECTS (dots) and MORPHISMS (arrows) between them. Here f: A → B, g: B → C and h: C → D (blue). In the category Set the objects would be sets and the morphisms functions.', objects: [...[[A, B], [B, C], [C, D]].map(([a, b], i) => link(a as Pt, b as Pt, ROLE.output)), ...[A, B, C, D].map((p) => dt(p, ROLE.ink, 0.14)), ...catObjects().map(([n, p]) => lb(n, [p[0], p[1] + (n === 'B' || n === 'D' ? 0.5 : -0.55)])), lb('f', side(A, B, 0.4), ROLE.output), lb('g', side(B, C, 0.4), ROLE.output), lb('h', side(C, D, 0.4), ROLE.output)] },
      { narration: 'When one arrow ends where the next begins they compose: g∘f: A → C (first f, then g) and h∘g: B → D (green). Every object also has an identity morphism, the arrow that does nothing (the loops, written 1).', objects: [link(A, C, ROLE.result), link(B, D, ROLE.result), lb('g∘f', side(A, C, -0.4), ROLE.result), lb('h∘g', side(B, D, 0.4), ROLE.result), ...[A, B, C, D].map(loop), ...[A, B, C, D].map((p) => lb('1', [p[0] - 0.95, p[1] - 0.45], ROLE.reference))] },
      { narration: 'Composition is associative: the two ways of getting from A to D — first g∘f then h, or first f then h∘g — are the same morphism, h∘g∘f (green, long arrow). Associativity and the identities (1∘f = f = f∘1) are the axioms of a category.', objects: [link(A, D, ROLE.result), lb('h∘g∘f', [0.0, 0.55 + 0.0], ROLE.result)] },
    ],
  }
}

// ── 3. Types of morphisms ────────────────────────────────────────────────────

/** In Set: an injective map (mono), a surjective map (epi) and a bijection with its inverse (iso). Each panel lists the arrows left index → right index. */
export const MPH = {
  cx: [-3.4, 0, 3.4] as readonly number[], dx: 0.8,
  mono: { left: [0.6, -0.6] as readonly number[], right: [1.2, 0, -1.2] as readonly number[], arrows: [[0, 0], [1, 2]] as ReadonlyArray<readonly [number, number]> },
  epi: { left: [1.2, 0, -1.2] as readonly number[], right: [0.6, -0.6] as readonly number[], arrows: [[0, 0], [1, 0], [2, 1]] as ReadonlyArray<readonly [number, number]> },
  iso: { left: [0.6, -0.6] as readonly number[], right: [0.6, -0.6] as readonly number[], arrows: [[0, 0], [1, 1]] as ReadonlyArray<readonly [number, number]> },
}
export const mphLeft = (panel: number, ys: readonly number[], i: number): Pt => [MPH.cx[panel] - MPH.dx, 0.6 + ys[i]]
export const mphRight = (panel: number, ys: readonly number[], j: number): Pt => [MPH.cx[panel] + MPH.dx, 0.6 + ys[j]]

/** KG: mono = left cancellable (injective in Set), epi = right cancellable (surjective in Set), iso = two-sided inverse. */
export function buildMorphismTypesScene(): SceneSpec {
  return framed(raw_buildMorphismTypesScene())
}
function raw_buildMorphismTypesScene(): SceneSpec {
  const { cx, mono, epi, iso } = MPH
  const panel = (p: number, g: { left: readonly number[]; right: readonly number[]; arrows: ReadonlyArray<readonly [number, number]> }, color: string): SceneObject[] => [
    ...g.arrows.map(([i, j]) => link(mphLeft(p, g.left, i), mphRight(p, g.right, j), color, 0.14)),
    ...g.left.map((_, i) => dt(mphLeft(p, g.left, i), ROLE.ink, 0.1)), ...g.right.map((_, j) => dt(mphRight(p, g.right, j), ROLE.ink, 0.1)),
    ...g.left.map((_, i) => lb(String(i + 1), [mphLeft(p, g.left, i)[0] - 0.4, mphLeft(p, g.left, i)[1]])), ...g.right.map((_, j) => lb('abc'[j], [mphRight(p, g.right, j)[0] + 0.4, mphRight(p, g.right, j)[1]])),
  ]
  return {
    id: 'math-morphism-types',
    title: 'Mono, epi and isomorphism',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show the main kinds of morphism, using functions between sets. A monomorphism (mono) can be cancelled on the left (g∘f = h∘f ⟹ g = h): for functions that means INJECTIVE — different inputs go to different outputs, here 1 ↦ a, 2 ↦ c, b is not hit. An epimorphism (epi) can be cancelled on the right (f∘g = f∘h ⟹ g = h): for functions SURJECTIVE — every output is hit, here 1 and 2 both go to a. An isomorphism has a two-sided inverse: for functions a BIJECTION, and the inverse arrows (red) go back.',
    ariaLabel:
      'Three panels with a column of numbered points on the left and lettered points on the right. Left, mono: two points 1 and 2 with blue arrows to a and c of three points a, b, c; b receives nothing. Middle, epi: three points 1, 2, 3 with arrows to a and b of two points; 1 and 2 both go to a and every right point receives an arrow. Right, iso: two points each way with green arrows 1 to a and 2 to b, and red arrows running back from a to 1 and from b to 2.',
    stage: NO_STAGE,
    steps: [
      { narration: 'Mono (left cancellable): in Set, an injective function — different inputs, different outputs. 1 ↦ a and 2 ↦ c never collide, so f can be cancelled on the left. The element b is not hit, which is allowed.', objects: [...panel(0, mono, ROLE.output), lb('mono', [cx[0], -1.5], ROLE.output)] },
      { narration: 'Epi (right cancellable): in Set, a surjective function — every output is hit. 1 and 2 both go to a (collisions are allowed), but a and b each receive an arrow. If two maps agree on the image of f they agree everywhere.', objects: [...panel(1, epi, ROLE.input), lb('epi', [cx[1], -1.5], ROLE.input)] },
      { narration: 'Iso: a morphism with a two-sided inverse. For sets, a bijection that is both injective and surjective; the inverse (red arrows) undoes it. A morphism that is both mono and epi is not always an isomorphism in a general category, but it is in Set.', objects: [...panel(2, iso, ROLE.result), ...iso.arrows.map(([i, j]) => link([mphRight(2, iso.right, j)[0], mphRight(2, iso.right, j)[1] - 0.22], [mphLeft(2, iso.left, i)[0], mphLeft(2, iso.left, i)[1] - 0.22], ROLE.input, 0.14)), lb('iso', [cx[2], -1.5], ROLE.result)] },
    ],
  }
}

// ── 4. Functor ───────────────────────────────────────────────────────────────

/** A functor F: C → D takes the objects X, Y, Z of C to FX, FY, FZ and the arrows f, g, g∘f to Ff, Fg, F(g∘f) = Fg∘Ff. D is C shifted by (6, −1.6). */
export const FNC = { X: [-4.4, 0.8] as Pt, Y: [-3.0, 2.4] as Pt, Z: [-1.6, 0.8] as Pt, shift: [6.0, -1.6] as Pt }
export const fncImage = (p: Pt): Pt => [p[0] + FNC.shift[0], p[1] + FNC.shift[1]]

/** KG: a functor sends objects to objects and morphisms to morphisms, preserving composition and identities. */
export function buildFunctorScene(): SceneSpec {
  return framed(raw_buildFunctorScene())
}
function raw_buildFunctorScene(): SceneSpec {
  const { X, Y, Z } = FNC, FX = fncImage(X), FY = fncImage(Y), FZ = fncImage(Z)
  return {
    id: 'math-functor',
    title: 'A functor preserves objects, arrows and composition',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show a functor F from a category C (left) to a category D (right). F sends every object X, Y, Z of C to an object FX, FY, FZ of D (grey arrows) and every morphism f: X → Y, g: Y → Z to a morphism Ff: FX → FY, Fg: FY → FZ (blue). It must respect composition: the composite g∘f: X → Z (green) goes to the composite of the images, F(g∘f) = Fg∘Ff, and identities go to identities. A contravariant functor would reverse all the arrows.',
    ariaLabel:
      'Left, a small triangle of three dots X, Y, Z with blue arrows f from X to Y and g from Y to Z. Right, a second triangle of dots FX, FY, FZ. Three thin grey diagonal arrows labelled F run from each left dot to its copy on the right. In the second step the right triangle gets blue arrows Ff and Fg. In the third step a green arrow g after f from X to Z on the left and the green arrow F of g after f from FX to FZ on the right, with the caption F of g after f equals Fg after Ff.',
    stage: NO_STAGE,
    steps: [
      { narration: 'Category C: objects X, Y, Z and morphisms f: X → Y and g: Y → Z (blue).', objects: [link(X, Y, ROLE.output), link(Y, Z, ROLE.output), ...[X, Y, Z].map((p) => dt(p, ROLE.ink, 0.14)), lb('X', [X[0] - 0.4, X[1] - 0.2]), lb('Y', [Y[0], Y[1] + 0.45]), lb('Z', [Z[0] + 0.4, Z[1] - 0.2]), lb('f', side(X, Y, 0.35), ROLE.output), lb('g', side(Y, Z, 0.35), ROLE.output)] },
      { narration: 'A functor F sends each object to an object (grey arrows: X ↦ FX, Y ↦ FY, Z ↦ FZ) and each morphism to a morphism of D: f ↦ Ff: FX → FY and g ↦ Fg: FY → FZ (blue).', objects: [...[[X, FX], [Y, FY], [Z, FZ]].map(([a, b]) => ln(a as Pt, b as Pt, ROLE.reference, 0.02)), lb('F', [(X[0] + FX[0]) / 2 - 0.2, (X[1] + FX[1]) / 2 + 0.35], ROLE.ink), link(FX, FY, ROLE.output), link(FY, FZ, ROLE.output), ...[FX, FY, FZ].map((p) => dt(p, ROLE.ink, 0.14)), lb('FX', [FX[0] - 0.45, FX[1] - 0.2]), lb('FY', [FY[0], FY[1] + 0.45]), lb('FZ', [FZ[0] + 0.5, FZ[1] - 0.2]), lb('Ff', side(FX, FY, 0.4), ROLE.output), lb('Fg', side(FY, FZ, 0.4), ROLE.output)] },
      { narration: 'Preserving composition: the composite g∘f: X → Z (green, left) must go to the composite of the images, F(g∘f) = Fg∘Ff: FX → FZ (green, right). Whether we compose first and then apply F, or apply F first and then compose, we land on the same arrow.', objects: [link(X, Z, ROLE.result), link(FX, FZ, ROLE.result), lb('g∘f', [(X[0] + Z[0]) / 2, X[1] - 0.7], ROLE.result), lb('F(g∘f)', [(FX[0] + FZ[0]) / 2, FX[1] - 0.7], ROLE.result), lb('F(g∘f) = Fg∘Ff', [0.8, -3.7], ROLE.ink)] },
    ],
  }
}

// ── 5. Natural transformation ────────────────────────────────────────────────

/** The naturality square of η: F ⇒ G for f: X → Y: η_Y ∘ Ff = Gf ∘ η_X. */
export const NAT = { FX: [-2.0, 1.8] as Pt, FY: [2.0, 1.8] as Pt, GX: [-2.0, -1.8] as Pt, GY: [2.0, -1.8] as Pt }

/** KG: η_Y ∘ F(f) = G(f) ∘ η_X for every f: X → Y. */
export function buildNaturalTransformationScene(): SceneSpec {
  return framed(raw_buildNaturalTransformationScene())
}
function raw_buildNaturalTransformationScene(): SceneSpec {
  const { FX, FY, GX, GY } = NAT
  return {
    id: 'math-natural-transformation',
    title: 'Natural transformation: the naturality square',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show a natural transformation η from a functor F to a functor G. For a morphism f: X → Y the functors give two arrows, Ff: FX → FY (top) and Gf: GX → GY (bottom). η supplies, for each object, a morphism η_X: FX → GX and η_Y: FY → GY (red, the components). Naturality says the square COMMUTES: going across then down (η_Y∘Ff) is the same as going down then across (Gf∘η_X) — both give the diagonal FX → GY (green). η is the right notion of morphism between functors.',
    ariaLabel:
      'A square with four dots: FX top left, FY top right, GX bottom left, GY bottom right. In the first step a blue arrow labelled Ff runs along the top and another labelled Gf along the bottom. In the second step red arrows labelled eta X down the left side and eta Y down the right side are added. In the third step a green diagonal arrow from FX to GY is added, and the caption says the square commutes.',
    stage: NO_STAGE,
    steps: [
      { narration: 'Two functors F, G: C → D and a morphism f: X → Y in C. They give two arrows in D: Ff: FX → FY (top, blue) and Gf: GX → GY (bottom, blue).', objects: [link(FX, FY, ROLE.output), link(GX, GY, ROLE.output), ...[FX, FY, GX, GY].map((p) => dt(p, ROLE.ink, 0.14)), lb('FX', [FX[0] - 0.55, FX[1] + 0.2]), lb('FY', [FY[0] + 0.55, FY[1] + 0.2]), lb('GX', [GX[0] - 0.55, GX[1] - 0.2]), lb('GY', [GY[0] + 0.55, GY[1] - 0.2]), lb('Ff', [0, FX[1] + 0.5], ROLE.output), lb('Gf', [0, GX[1] - 0.5], ROLE.output)] },
      { narration: 'A natural transformation η: F ⇒ G chooses a morphism η_X: FX → GX for every object X (red) — here for X and for Y. These are its components.', objects: [link(FX, GX, ROLE.input), link(FY, GY, ROLE.input), lb('ηX', [FX[0] - 0.65, 0], ROLE.input), lb('ηY', [FY[0] + 0.65, 0], ROLE.input)] },
      { narration: 'Naturality: the square commutes. Across then down, η_Y∘Ff, and down then across, Gf∘η_X, are the same morphism FX → GY (green diagonal), for every f. So η is compatible with the action of F and G on morphisms.', objects: [link(FX, GY, ROLE.result, 0.3), lb('commutes', [0.55, 0.55], ROLE.result), lb('ηY∘Ff = Gf∘ηX', [0, -3.1], ROLE.ink)] },
    ],
  }
}

// ── 6. Platonic solids ───────────────────────────────────────────────────────

const PHI = (1 + Math.sqrt(5)) / 2
export type Pt3 = readonly [number, number, number]
const signs = (n: number): number[][] => (n === 0 ? [[]] : signs(n - 1).flatMap((s) => [[...s, 1], [...s, -1]]))
export const platonicVertices = (kind: 'tetra' | 'cube' | 'octa' | 'icosa' | 'dodeca'): Pt3[] => {
  if (kind === 'tetra') return [[1, 1, 1], [1, -1, -1], [-1, 1, -1], [-1, -1, 1]]
  if (kind === 'cube') return signs(3).map((s) => [s[0], s[1], s[2]] as Pt3)
  if (kind === 'octa') return [[1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1]]
  if (kind === 'icosa') return signs(2).flatMap(([a, b]) => [[0, a, b * PHI], [a, b * PHI, 0], [a * PHI, 0, b]] as Pt3[])
  return [...signs(3).map((s) => [s[0], s[1], s[2]] as Pt3), ...signs(2).flatMap(([a, b]) => [[0, a / PHI, b * PHI], [a / PHI, b * PHI, 0], [a * PHI, 0, b / PHI]] as Pt3[])]
}
const d3 = (a: Pt3, b: Pt3) => Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2])
/** The edges: all pairs at the minimum vertex distance. */
export const platonicEdges = (V: ReadonlyArray<Pt3>): Array<[number, number]> => {
  let m = Infinity; for (let i = 0; i < V.length; i++) for (let j = i + 1; j < V.length; j++) m = Math.min(m, d3(V[i], V[j]))
  const out: Array<[number, number]> = []; for (let i = 0; i < V.length; i++) for (let j = i + 1; j < V.length; j++) if (Math.abs(d3(V[i], V[j]) - m) < 1e-9) out.push([i, j])
  return out
}
export const PLT = { rotY: 0.55, rotX: -0.45, R: 1.5, top: { y: 1.8, x: [-3.4, 0, 3.4] as readonly number[] }, bottom: { y: -2.0, x: [-2.6, 2.6] as readonly number[] } }
/** Rotate about the y axis then the x axis, and project orthographically; the solid is scaled so its circumradius is PLT.R. */
export const platonicProject = (v: Pt3, c: Pt, circum: number): Pt => {
  const [x, y, z] = v, ca = Math.cos(PLT.rotY), sa = Math.sin(PLT.rotY), cb = Math.cos(PLT.rotX), sb = Math.sin(PLT.rotX)
  const x1 = ca * x + sa * z, z1 = -sa * x + ca * z, y1 = cb * y - sb * z1, s = PLT.R / circum
  return [c[0] + s * x1, c[1] + s * y1]
}
export const PLATONIC = [
  { kind: 'tetra' as const, name: 'tetrahedron', V: 4, E: 6, F: 4 }, { kind: 'cube' as const, name: 'cube', V: 8, E: 12, F: 6 },
  { kind: 'octa' as const, name: 'octahedron', V: 6, E: 12, F: 8 }, { kind: 'dodeca' as const, name: 'dodecahedron', V: 20, E: 30, F: 12 },
  { kind: 'icosa' as const, name: 'icosahedron', V: 12, E: 30, F: 20 },
]
export const platonicCenter = (i: number): Pt => (i < 3 ? [PLT.top.x[i], PLT.top.y] : [PLT.bottom.x[i - 3], PLT.bottom.y])
export const platonicCircum = (kind: 'tetra' | 'cube' | 'octa' | 'icosa' | 'dodeca') => Math.max(...platonicVertices(kind).map((v) => Math.hypot(...v)))

/** KG: the five convex regular polyhedra — tetrahedron, cube, octahedron, dodecahedron, icosahedron. */
export function buildPlatonicSolidsScene(): SceneSpec {
  return framed(raw_buildPlatonicSolidsScene())
}
function raw_buildPlatonicSolidsScene(): SceneSpec {
  const draw = (i: number, color: string): SceneObject[] => { const s = PLATONIC[i], V = platonicVertices(s.kind), c = platonicCenter(i), R = platonicCircum(s.kind), E = platonicEdges(V); return [...E.map(([a, b]) => ln(platonicProject(V[a], c, R), platonicProject(V[b], c, R), color, 0.03)), lb(s.name, [c[0], c[1] - 1.95], color)] }
  return {
    id: 'math-platonic-solids',
    title: 'The five Platonic solids',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show the five Platonic solids, the only convex polyhedra whose faces are all the same regular polygon with the same number of faces meeting at every vertex: the tetrahedron (4 triangular faces), cube (6 squares), octahedron (8 triangles), dodecahedron (12 pentagons) and icosahedron (20 triangles). All edges of each solid have the same length, and each satisfies Euler’s formula V − E + F = 2: 4 − 6 + 4, 8 − 12 + 6, 6 − 12 + 8, 20 − 30 + 12, 12 − 30 + 20. Euclid showed there are no others.',
    ariaLabel:
      'Five wireframe solids. Top row: a tetrahedron with 4 vertices and 6 edges, a cube with 8 vertices and 12 edges, and an octahedron with 6 vertices and 12 edges, each with its name below. In the second step a dodecahedron with 20 vertices and 30 edges appears below on the left, and in the third step an icosahedron with 12 vertices and 30 edges below on the right.',
    stage: NO_STAGE,
    steps: [
      { narration: 'Three of the Platonic solids: the tetrahedron (4 triangles, 4 vertices, 6 edges), the cube (6 squares, 8 vertices, 12 edges) and the octahedron (8 triangles, 6 vertices, 12 edges). Every face is the same regular polygon and the same number of faces meet at each vertex.', objects: [...draw(0, ROLE.output), ...draw(1, ROLE.result), ...draw(2, ROLE.input)] },
      { narration: 'The dodecahedron: 12 regular pentagons, 20 vertices, 30 edges, three faces at every vertex. V − E + F = 20 − 30 + 12 = 2.', objects: draw(3, ROLE.aid) },
      { narration: 'The icosahedron: 20 equilateral triangles, 12 vertices, 30 edges, five faces at every vertex: 12 − 30 + 20 = 2. These five are the only regular convex polyhedra — a vertex needs angles adding to less than 360°, which allows only triangles (3, 4 or 5 at a vertex), squares (3) and pentagons (3).', objects: draw(4, ROLE.output) },
    ],
  }
}

// ── 7. Curves in space: curvature and the osculating circle ──────────────────

/** The ellipse γ(t) = (a cos t, b sin t), a = 1.8, b = 1.2: curvature a/b² = 1.25 (radius 0.8) at t = 0 and b/a² = 0.37 (radius 2.7) at t = π/2. */
export const DGC = { c: [0, 0.4] as Pt, u: 1.2, a: 1.8, b: 1.2 }
export const ellipseAt = (t: number): [number, number] => [DGC.a * Math.cos(t), DGC.b * Math.sin(t)]
export const ellipseCurvature = (t: number) => (DGC.a * DGC.b) / Math.pow(DGC.a ** 2 * Math.sin(t) ** 2 + DGC.b ** 2 * Math.cos(t) ** 2, 1.5)
export const dgcAt = (p: readonly [number, number]): Pt => [DGC.c[0] + DGC.u * p[0], DGC.c[1] + DGC.u * p[1]]
export const unitTangent = (t: number): [number, number] => { const x = -DGC.a * Math.sin(t), y = DGC.b * Math.cos(t), l = Math.hypot(x, y); return [x / l, y / l] }

/** KG: a smooth curve in ℝⁿ studied via its parametrisation; curvature κ measures how fast the direction turns. */
export function buildCurvesInSpaceScene(): SceneSpec {
  return framed(raw_buildCurvesInSpaceScene())
}
function raw_buildCurvesInSpaceScene(): SceneSpec {
  const { c, u, a, b } = DGC
  const ts = Array.from({ length: 8 }, (_, k) => (k * Math.PI) / 4)
  const oscT = (t: number): { centre: [number, number]; r: number } => { const k = ellipseCurvature(t), p = ellipseAt(t), T = unitTangent(t), n: [number, number] = [-T[1], T[0]], sgn = (n[0] * (0 - p[0]) + n[1] * (0 - p[1])) >= 0 ? 1 : -1; return { centre: [p[0] + (sgn * n[0]) / k, p[1] + (sgn * n[1]) / k], r: 1 / k } }
  const o0 = oscT(0), o1 = oscT(Math.PI / 2)
  return {
    id: 'math-curves-in-space',
    title: 'Curves: tangent, curvature, osculating circle',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show how a parametrised curve is studied through its geometry. The ellipse γ(t) = (1.8 cos t, 1.2 sin t) has a velocity γ′(t) whose direction is the unit tangent (red arrows). Curvature κ measures how fast that direction turns per unit length; it is read off the osculating circle, the circle that best fits the curve at a point, whose radius is 1/κ. At the end of the long axis (t = 0) the ellipse bends sharply, κ = a/b² = 1.25 (radius 0.8); at the end of the short axis (t = π/2) it is flatter, κ = b/a² = 0.37 (radius 2.7).',
    ariaLabel:
      'A blue ellipse, wider than tall, with eight short red arrows pointing along the direction of travel (counter-clockwise) at equally spaced parameter values. In the second step a small green circle touches the ellipse from inside at the right-hand end of the long axis, hugging the sharp bend, captioned curvature 1.25. In the third step a violet arc of a much larger circle touches the ellipse at the top, captioned curvature 0.37, the flatter part of the curve.',
    stage: NO_STAGE,
    steps: [
      { narration: 'γ(t) = (1.8 cos t, 1.2 sin t) traces the ellipse counter-clockwise. At each parameter value the velocity γ′(t) points along the curve; its direction is the unit tangent T (red arrows at t = 0°, 45°, 90°, …).', objects: [curve(Array.from({ length: 73 }, (_, i) => { const p = dgcAt(ellipseAt((2 * Math.PI * i) / 72)); return P(p[0], p[1]) }), ROLE.output), ...ts.map((t) => { const p = dgcAt(ellipseAt(t)), T = unitTangent(t); return arrow(P(p[0], p[1]), P(p[0] + 0.7 * T[0], p[1] + 0.7 * T[1]), ROLE.input) }), lb('γ(t)', [dgcAt(ellipseAt(Math.PI / 4))[0] + 0.7, dgcAt(ellipseAt(Math.PI / 4))[1] + 0.85])] },
      { narration: 'Curvature κ is how fast T turns per unit of arc length. Near t = 0 the ellipse bends sharply: the circle that best fits it there (green, the osculating circle) has radius 1/κ = b²/a = 0.8, so κ = 1.25.', objects: [curve(arcPts(dgcAt(o0.centre)[0], dgcAt(o0.centre)[1], o0.r * u, 0, 360, 48), ROLE.result), dt(dgcAt(o0.centre), ROLE.result, 0.08), lb('curvature 1.25', [dgcAt(o0.centre)[0] + 0.1, c[1] - 0.2 - 0.0], ROLE.result)] },
      { narration: 'At t = π/2 (the top) the curve is flatter: the osculating circle (violet arc) is much larger, radius a²/b = 2.7, so κ = 0.37. Along the whole curve κ(t) = ab/(a² sin² t + b² cos² t)^{3/2}; a straight line has κ = 0, a circle of radius r has κ = 1/r.', objects: [curve(arcPts(dgcAt(o1.centre)[0], dgcAt(o1.centre)[1], o1.r * u, 55, 125, 24), ROLE.aid), lb('curvature 0.37', [c[0], dgcAt(ellipseAt(Math.PI / 2))[1] + 0.85], ROLE.aid)] },
    ],
  }
}

// ── 8. Frenet–Serret frame on a helix ────────────────────────────────────────

/** The helix r(t) = (cos t, sin t, c t), c = 0.5: κ = 1/(1 + c²) = 0.8 and τ = c/(1 + c²) = 0.4 everywhere; T, N, B at t = π. */
export const FSR = { c: 0.5, ox: 0.0, oy: -3.2, ux: 1.6, dxy: 0.8, uz: 0.7, dyy: 0.5, turns: 2, t0: Math.PI, len: 1.5 }
export const helix = (t: number): [number, number, number] => [Math.cos(t), Math.sin(t), FSR.c * t]
export const fsrFrame = (t: number) => { const c = FSR.c, k = Math.sqrt(1 + c * c); const T: [number, number, number] = [-Math.sin(t) / k, Math.cos(t) / k, c / k], N: [number, number, number] = [-Math.cos(t), -Math.sin(t), 0], B: [number, number, number] = [(c * Math.sin(t)) / k, (-c * Math.cos(t)) / k, 1 / k]; return { T, N, B, kappa: 1 / (1 + c * c), tau: c / (1 + c * c), speed: k } }
export const fsrProject = (p: readonly [number, number, number]): Pt => [FSR.ox + FSR.ux * p[0] + FSR.dxy * p[1], FSR.oy + FSR.uz * p[2] + FSR.dyy * p[1]]
export const fsrVec = (v: readonly [number, number, number]): Pt => [FSR.ux * v[0] + FSR.dxy * v[1], FSR.uz * v[2] + FSR.dyy * v[1]]

/** KG: T′ = κN, N′ = −κT + τB, B′ = −τN. */
export function buildFrenetSerretScene(): SceneSpec {
  return framed(raw_buildFrenetSerretScene())
}
function raw_buildFrenetSerretScene(): SceneSpec {
  const { turns, t0, len } = FSR, N = 120, fr = fsrFrame(t0), p0 = helix(t0)
  const tipOf = (v: readonly [number, number, number]): V3 => { const a = fsrProject(p0), d = fsrVec(v); return P(a[0] + len * d[0], a[1] + len * d[1]) }
  const at0 = fsrProject(p0)
  return {
    id: 'math-frenet-serret',
    title: 'Frenet–Serret frame on a helix',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show the Frenet–Serret frame of the helix r(t) = (cos t, sin t, t/2). At each point three perpendicular unit vectors travel with the curve: the tangent T (direction of motion, red), the principal normal N (the direction the curve is turning toward — here straight towards the axis, green) and the binormal B = T × N (blue). Their rates of change are given by the Frenet–Serret equations T′ = κN, N′ = −κT + τB, B′ = −τN, where κ = 0.8 is the curvature (how fast the curve bends) and τ = 0.4 the torsion (how fast it twists out of its osculating plane); both are constant for a helix.',
    ariaLabel:
      'A blue helix winding twice round a vertical axis, seen from slightly above. In the second step three arrows start from one point of the helix: a red one labelled T along the direction of motion, a green one labelled N pointing horizontally towards the axis, and a blue one labelled B pointing mostly upward. In the third step the captions give the Frenet equations T prime equals kappa N, N prime equals minus kappa T plus tau B and B prime equals minus tau N, with kappa 0.8 and tau 0.4.',
    stage: NO_STAGE,
    steps: [
      { narration: 'The helix r(t) = (cos t, sin t, t/2) winds round the vertical axis while climbing: two turns drawn. It is a space curve — it does not lie in any plane — so besides bending (curvature) it also twists (torsion).', objects: [arrow(P(fsrProject([0, 0, 0])[0], fsrProject([0, 0, 0])[1]), P(fsrProject([0, 0, FSR.c * 2 * Math.PI * turns + 0.4])[0], fsrProject([0, 0, FSR.c * 2 * Math.PI * turns + 0.4])[1]), ROLE.reference), curve(Array.from({ length: N + 1 }, (_, i) => { const p = fsrProject(helix((2 * Math.PI * turns * i) / N)); return P(p[0], p[1]) }), ROLE.output), dt(at0, ROLE.ink, 0.12), lb('r(t)', [at0[0] - 0.8, at0[1] + 0.2])] },
      { narration: 'At the marked point (t = π) the frame: T (red) is the unit tangent, along the motion; N (green) is the principal normal, pointing the way the curve is bending — here horizontally towards the axis; B = T × N (blue) is the binormal, perpendicular to both. T, N, B are mutually perpendicular unit vectors.', objects: [arrow(P(at0[0], at0[1]), tipOf(fr.T), ROLE.input), arrow(P(at0[0], at0[1]), tipOf(fr.N), ROLE.result), arrow(P(at0[0], at0[1]), tipOf(fr.B), ROLE.output), lb('T', [tipOf(fr.T)[0] + 0.3, tipOf(fr.T)[1] + 0.2], ROLE.input), lb('N', [tipOf(fr.N)[0] - 0.3, tipOf(fr.N)[1] + 0.2], ROLE.result), lb('B', [tipOf(fr.B)[0] + 0.3, tipOf(fr.B)[1] + 0.1], ROLE.output)] },
      { narration: 'The Frenet–Serret equations say how the frame turns as you move along the curve: T′ = κN, N′ = −κT + τB, B′ = −τN, with κ the curvature and τ the torsion. For this helix both are constant: κ = 1/(1 + ½²) = 0.8 and τ = ½/(1 + ½²) = 0.4, which together describe the curve completely up to position and orientation.', objects: [lb('T′ = κN', [-3.7, 3.7], ROLE.input), lb('N′ = −κT + τB', [-3.0, 3.0], ROLE.result), lb('B′ = −τN', [-3.7, 2.3], ROLE.output), lb('κ = 0.8', [3.8, 3.7], ROLE.ink), lb('τ = 0.4', [3.8, 3.0], ROLE.ink)] },
    ],
  }
}

// ── 9. Simple functions ──────────────────────────────────────────────────────

/** φ = 1·1_[0,1) + 3·1_[1,2.5) + 2·1_[2.5,4]: ∫φ dμ = 1·1 + 3·1.5 + 2·1.5 = 8.5. Right: f(x) = x on [0, 2] approximated from below by φ₁ (steps of 0.5) and φ₂ (steps of 0.25). */
export const SMP = {
  L: { ox: -4.5, oy: -2.0, ux: 0.8, uy: 0.6, pieces: [{ a: 0, b: 1, v: 1 }, { a: 1, b: 2.5, v: 3 }, { a: 2.5, b: 4, v: 2 }] as ReadonlyArray<{ a: number; b: number; v: number }> },
  R: { ox: 1.0, oy: -2.0, ux: 1.7, uy: 1.7, xMax: 2, ns: [1, 2] as readonly number[] },
}
export const simpleIntegral = () => sum2(SMP.L.pieces.map((p) => p.v * (p.b - p.a)))
const sum2 = (xs: number[]) => xs.reduce((s, v) => s + v, 0)
/** φₙ(x) = min(n, ⌊2ⁿ f(x)⌋ / 2ⁿ) for f(x) = x. */
export const approxSimple = (n: number, x: number) => Math.min(n + 1, Math.floor(Math.pow(2, n) * x) / Math.pow(2, n))
export const smpL = (x: number, y: number): Pt => [SMP.L.ox + SMP.L.ux * x, SMP.L.oy + SMP.L.uy * y]
export const smpR = (x: number, y: number): Pt => [SMP.R.ox + SMP.R.ux * x, SMP.R.oy + SMP.R.uy * y]

/** KG: φ = Σ aᵢ 1_{Eᵢ}, ∫φ dμ = Σ aᵢ μ(Eᵢ); every non-negative measurable f is an increasing limit of simple functions. */
export function buildSimpleFunctionScene(): SceneSpec {
  return framed(raw_buildSimpleFunctionScene())
}
function raw_buildSimpleFunctionScene(): SceneSpec {
  const { L, R } = SMP
  const stairs = (n: number, color: string, t: number): SceneObject[] => {
    const out: SceneObject[] = [], h = 1 / Math.pow(2, n), steps = Math.round(R.xMax / h)
    for (let i = 0; i < steps; i++) { const x0 = i * h, x1 = (i + 1) * h, v = approxSimple(n, x0); if (v > 0) out.push(ln(smpR(x0, v), smpR(x1, v), color, t)); if (i > 0) out.push(ln(smpR(x0, approxSimple(n, x0 - h)), smpR(x0, v), color, 0.02)) }
    return out
  }
  return {
    id: 'math-simple-function',
    title: 'Simple functions and their integral',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show simple functions φ = Σ aᵢ 1_{Eᵢ}: finitely many values aᵢ, each taken on a measurable set Eᵢ. Here φ = 1 on [0, 1), 3 on [1, 2.5) and 2 on [2.5, 4]. Their integral is just Σ aᵢ μ(Eᵢ) — value times the measure of where it is taken: 1·1 + 3·1.5 + 2·1.5 = 8.5. Every non-negative measurable function f is the increasing limit of simple functions: φₙ = min(n, ⌊2ⁿf⌋/2ⁿ) for f(x) = x climbs from below, 0.5-steps (φ₁) then 0.25-steps (φ₂), and ∫f is defined as the limit of ∫φₙ.',
    ariaLabel:
      'Left: a staircase graph over the interval 0 to 4 with three flat pieces: height 1 on 0 to 1, height 3 on 1 to 2.5 and height 2 on 2.5 to 4, with the three bars below the axis in blue, red and green marking the three sets E1, E2, E3. In the second step each flat piece is shaded as a rectangle labelled with value times length, 1 times 1, 3 times 1.5 and 2 times 1.5, adding to 8.5. Right, third step: the diagonal line f of x equals x with two staircases below it, a coarse red one with steps of 0.5 and a finer blue one with steps of 0.25, both below the line and the blue one closer.',
    stage: NO_STAGE,
    steps: [
      { narration: 'A simple function takes finitely many values: φ = 1 on E₁ = [0, 1), 3 on E₂ = [1, 2.5) and 2 on E₃ = [2.5, 4] (coloured bars on the axis show the three sets). It is a finite combination of indicator functions, φ = 1·1_{E₁} + 3·1_{E₂} + 2·1_{E₃}.', objects: [ln(smpL(-0.2, 0), smpL(4.3, 0), ROLE.reference, 0.04), ...L.pieces.map((p) => ln(smpL(p.a, p.v), smpL(p.b, p.v), ROLE.ink, 0.06)), ...L.pieces.slice(1).map((p, i) => ln(smpL(p.a, L.pieces[i].v), smpL(p.a, p.v), ROLE.reference, 0.025)), ...L.pieces.map((p, i) => ln([smpL(p.a, 0)[0] + 0.05, smpL(0, 0)[1] - 0.3], [smpL(p.b, 0)[0] - 0.05, smpL(0, 0)[1] - 0.3], [ROLE.output, ROLE.input, ROLE.result][i], 0.1)), lb('φ', [smpL(0.3, 1.0)[0] - 0.5, smpL(0.3, 1.0)[1] + 0.5])] },
      { narration: 'The integral of a simple function is Σ aᵢ μ(Eᵢ): each value times the measure (length) of the set where it is taken — the area of each rectangle (hatched). 1·1 + 3·1.5 + 2·1.5 = 1 + 4.5 + 3 = 8.5.', objects: [...L.pieces.flatMap((p, i) => { const col = [ROLE.output, ROLE.input, ROLE.result][i]; return [ln(smpL(p.a, 0), smpL(p.a, p.v), col, 0.025), ln(smpL(p.b, 0), smpL(p.b, p.v), col, 0.025), ...[0.35, 0.7, 1.05, 1.4, 1.75, 2.1, 2.45, 2.8].filter((y) => y < p.v).map((y) => ln(smpL(p.a, y), smpL(p.b, y), col, 0.015))] }), lb('1·1', [smpL(0.5, 0.5)[0], smpL(0.5, 0.5)[1] - 0.0], ROLE.output), lb('3·1.5', [smpL(1.75, 1.5)[0], smpL(1.75, 1.5)[1]], ROLE.input), lb('2·1.5', [smpL(3.25, 1.0)[0], smpL(3.25, 1.0)[1]], ROLE.result), lb('∫φ dμ = 8.5', [smpL(2.0, 0)[0], smpL(0, 0)[1] - 0.95], ROLE.ink)] },
      { narration: 'Any non-negative measurable f is a limit of simple functions. For f(x) = x (grey line) the simple function φ₁ rounds f DOWN to a multiple of 0.5 (red steps), φ₂ to a multiple of 0.25 (blue steps): φ₁ ≤ φ₂ ≤ f, increasing, and φₙ → f. The Lebesgue integral of f is the supremum of ∫φ over simple φ ≤ f, i.e. lim ∫φₙ.', objects: [ln(smpR(0, 0), smpR(R.xMax, R.xMax), ROLE.reference, 0.03), ln(smpR(-0.1, 0), smpR(R.xMax + 0.2, 0), ROLE.reference, 0.04), ...stairs(1, ROLE.input, 0.05), ...stairs(2, ROLE.output, 0.04), lb('f', [smpR(R.xMax, R.xMax)[0] + 0.3, smpR(R.xMax, R.xMax)[1]]), lb('φ₁ ≤ φ₂ ≤ f', [smpR(1.0, 0)[0], smpR(0, 0)[1] - 0.6], ROLE.ink)] },
    ],
  }
}

// ── 10. Lebesgue integral ────────────────────────────────────────────────────

/** ∫₀¹ x² dx by horizontal slabs: the sets E_k = {f ≥ y_k} have measure 1 − √y_k; Σ 0.25·μ(E_k) = 0.2317 ≤ 1/3 (and → 1/3 for thinner slabs). The Dirichlet function 1_ℚ has Lebesgue integral 0. */
export const LEB = { L: { ox: -4.3, oy: -2.0, u: 3.2 }, R: { ox: 1.0, oy: -2.0, ux: 3.2, uy: 2.0 }, levels: [0.25, 0.5, 0.75] as readonly number[], dirichlet: 8 }
export const slabMeasure = (y: number) => 1 - Math.sqrt(y)
export const slabSum = (levels: readonly number[], dy: number) => levels.reduce((s, y) => s + dy * slabMeasure(y), 0)
export const lebL = (x: number, y: number): Pt => [LEB.L.ox + LEB.L.u * x, LEB.L.oy + LEB.L.u * y]
export const lebR = (x: number, y: number): Pt => [LEB.R.ox + LEB.R.ux * x, LEB.R.oy + LEB.R.uy * y]

/** KG: ∫f dμ = sup{∫φ dμ : φ simple, 0 ≤ φ ≤ f}; integrates more functions than the Riemann integral. */
export function buildLebesgueIntegralScene(): SceneSpec {
  return framed(raw_buildLebesgueIntegralScene())
}
function raw_buildLebesgueIntegralScene(): SceneSpec {
  const { levels, dirichlet } = LEB
  return {
    id: 'math-lebesgue-integral',
    title: 'Lebesgue integral: slice the range, not the domain',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show the idea of the Lebesgue integral: instead of cutting the DOMAIN into vertical strips (Riemann), cut the RANGE into horizontal slabs of height 0.25 and measure the set E_k = {x : f(x) ≥ y_k} where f is at least that high. For f(x) = x² on [0, 1] the sets for y = 0.25, 0.5, 0.75 have measure 0.50, 0.29, 0.13, and 0.25·(0.50 + 0.29 + 0.13) ≈ 0.23 is a lower sum from below that tends to 1/3 as the slabs get thinner. This works for wild functions too: the Dirichlet function 1_ℚ (1 on rationals, 0 elsewhere) has no Riemann integral (every strip contains both values) but its Lebesgue integral is 0, since the rationals have measure 0.',
    ariaLabel:
      'Left: the parabola y equals x squared on 0 to 1 with three horizontal violet lines at heights 0.25, 0.5 and 0.75. In the second step thick green segments on the horizontal axis show where the curve is above each line, from the square root of the height to 1, labelled with their lengths 0.50, 0.29 and 0.13. Right, third step: a high dotted line at height 1 above the rational points 0, 1 over 8, 2 over 8 and so on, and a solid line at height 0 for the rest, captioned the integral of 1 on the rationals is 0.',
    stage: NO_STAGE,
    steps: [
      { narration: 'Riemann cuts the x-axis into strips. Lebesgue cuts the y-axis into slabs. For f(x) = x² on [0, 1] mark the heights y = 0.25, 0.5, 0.75 (violet lines).', objects: [ln(lebL(-0.05, 0), lebL(1.1, 0), ROLE.reference, 0.04), ln(lebL(0, -0.03), lebL(0, 1.1), ROLE.reference, 0.04), curve(Array.from({ length: 61 }, (_, i) => { const x = i / 60, p = lebL(x, x * x); return P(p[0], p[1]) }), ROLE.output), ...levels.map((y) => ln(lebL(0, y), lebL(1, y), ROLE.aid, 0.025)), ...levels.map((y) => lb(String(y), [lebL(0, y)[0] - 0.55, lebL(0, y)[1]], ROLE.aid))] },
      { narration: 'For each height y the set E = {x : f(x) ≥ y} is where the curve is above the line: x from √y to 1, of measure 1 − √y — 0.50, 0.29 and 0.13 for y = 0.25, 0.5, 0.75 (green). The slab sum 0.25·(0.50 + 0.29 + 0.13) ≈ 0.23 underestimates ∫₀¹ x² dx = 1/3; thinner slabs close the gap.', objects: [...levels.map((y) => ln(lebL(Math.sqrt(y), 0), lebL(1, 0), ROLE.result, 0.1)), ...levels.map((y) => lb(f2(slabMeasure(y)), [lebL((Math.sqrt(y) + 1) / 2, 0)[0], lebL(0, 0)[1] - 0.45 - 0.5 * levels.indexOf(y)], ROLE.result)), lb('slabs sum 0.23', [lebL(0.5, 0)[0], lebL(0, 0)[1] - 2.2], ROLE.ink)] },
      { narration: 'The Dirichlet function 1_ℚ is 1 at rational x and 0 at irrational x. Every Riemann strip contains both, so the upper sum is 1 and the lower sum 0: not Riemann integrable. But the rationals are countable, a set of measure 0, so by slabs: the slab at height 1 has measure 0, giving ∫ 1_ℚ dμ = 0. The Lebesgue integral handles functions the Riemann integral cannot.', objects: [ln(lebR(-0.05, 0), lebR(1.1, 0), ROLE.reference, 0.04), ln(lebR(0, 0), lebR(1, 0), ROLE.output, 0.05), ...Array.from({ length: dirichlet + 1 }, (_, k) => dt(lebR(k / dirichlet, 1), ROLE.input, 0.09)), lb('1 on ℚ', [lebR(0.5, 1)[0], lebR(0.5, 1)[1] + 0.55], ROLE.input), lb('∫ 1_ℚ = 0', [lebR(0.5, 0)[0], lebR(0.5, 0)[1] - 1.3], ROLE.result)] },
    ],
  }
}

// ── 11. Cyclic group ─────────────────────────────────────────────────────────

/** ℤ₆ = ⟨g⟩ as the six rotations of a hexagon: g = rotation by 60°, ⟨g²⟩ = {0, 2, 4}, ⟨g³⟩ = {0, 3}; the generators are 1 and 5. */
export const CYG = { c: [0, 0.3] as Pt, R: 2.0, n: 6 }
export const cygAt = (k: number): Pt => [CYG.c[0] + CYG.R * Math.cos((90 - (360 / CYG.n) * k) * DEG), CYG.c[1] + CYG.R * Math.sin((90 - (360 / CYG.n) * k) * DEG)]
export const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b))
export const generated = (g: number, n: number): number[] => { const s = new Set<number>(); let x = 0; do { s.add(x); x = (x + g) % n } while (x !== 0); return [...s].sort((a, b) => a - b) }

/** KG: G = ⟨g⟩ = {gⁿ}; ℤₙ ≅ ⟨g⟩; every subgroup of a cyclic group is cyclic. */
export function buildCyclicGroupScene(): SceneSpec {
  return framed(raw_buildCyclicGroupScene())
}
function raw_buildCyclicGroupScene(): SceneSpec {
  const { c, R, n } = CYG, pts = Array.from({ length: n }, (_, k) => cygAt(k))
  const outward = (p: Pt, d: number): Pt => [p[0] + ((p[0] - c[0]) / R) * d, p[1] + ((p[1] - c[1]) / R) * d]
  const hop = (k: number, color: string): SceneObject => curve(arcPts(c[0], c[1], R * 1.18, 90 - (360 / n) * k - 6, 90 - (360 / n) * (k + 1) + 6, 8), color)
  const gens = [1, 2, 3, 4, 5].filter((g) => gcd(g, n) === 1)
  return {
    id: 'math-cyclic-group',
    title: 'The cyclic group ℤ₆ and its subgroups',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show the cyclic group of order 6, ℤ₆ = ⟨g⟩ = {g⁰, g¹, …, g⁵}, as the six rotations of a hexagon (g = rotation by 60°, written here by the exponent 0…5; multiplication is addition mod 6). One element generates everything: repeating g visits all six points, and so does g⁵; g², g³, g⁴ do not. The subgroup generated by g² is {0, 2, 4} (order 3, a triangle), and the one generated by g³ is {0, 3} (order 2). Each is itself cyclic, and its order divides 6 — every subgroup of a cyclic group is cyclic.',
    ariaLabel:
      'Six dots on a circle numbered 0 to 5 clockwise from the top, with small blue arcs from each to the next showing the step g. In the second step a green triangle joins the points 0, 2 and 4, labelled the subgroup of order 3. In the third step a violet line joins the points 0 and 3 across the circle, labelled the subgroup of order 2, and the captions say the generators are 1 and 5.',
    stage: NO_STAGE,
    steps: [
      { narration: 'ℤ₆: six points 0…5 round a circle; g adds 1 (a rotation by 60°). Repeating g (blue arcs) visits every point and returns to 0 after 6 steps: g generates the whole group, ⟨g⟩ = ℤ₆.', objects: [ringAt(c, R, ROLE.reference, 60), ...Array.from({ length: n }, (_, k) => hop(k, ROLE.output)), ...pts.map((p) => dt(p, ROLE.ink, 0.14)), ...pts.map((p, k) => lb(String(k), outward(p, 0.6))), lb('ℤ₆ = ⟨g⟩', [c[0], c[1] - R - 0.9], ROLE.output)] },
      { narration: 'g² (add 2) visits only 0, 2, 4 and then returns to 0: ⟨g²⟩ = {0, 2, 4} is a subgroup of order 3 (green triangle), itself cyclic. It is NOT all of ℤ₆, so g² is not a generator.', objects: [...[[0, 2], [2, 4], [4, 0]].map(([a, b]) => ln(pts[a], pts[b], ROLE.result, 0.06)), ...[0, 2, 4].map((k) => dt(pts[k], ROLE.result, 0.2)), lb('order 3', [c[0] + 3.4, c[1] + 1.2], ROLE.result)] },
      { narration: 'g³ (add 3) visits 0 and 3: ⟨g³⟩ = {0, 3}, a subgroup of order 2 (violet). The orders 1, 2, 3, 6 of subgroups are exactly the divisors of 6, and the generators of ℤ₆ are the k with gcd(k, 6) = 1: just 1 and 5.', objects: [ln(pts[0], pts[3], ROLE.aid, 0.06), ...[0, 3].map((k) => dt(pts[k], ROLE.aid, 0.2)), lb('order 2', [c[0] - 3.4, c[1] - 0.6], ROLE.aid), ...gens.map((k) => ringAt(pts[k], 0.3, ROLE.output, 20)), lb('generators 1, 5', [c[0], c[1] - R - 1.6], ROLE.output)] },
    ],
  }
}

// ── 12. Convolution ──────────────────────────────────────────────────────────

/** f = g = 1 on [0, 1]: (f*g)(x) = ∫ f(y) g(x − y) dy is the overlap length of f with g flipped and shifted by x: 0.5 at x = 0.5, 1 at x = 1, the triangle min(x, 2 − x). */
export const CNV2 = { ox: -2.0, oy: 0.6, ux: 2.0, uy: 1.2, boxH: 1, res: { ox: -2.0, oy: -3.6, ux: 2.0, uy: 2.0 }, xs: [0.5, 1.0] as readonly number[] }
export const boxF = (y: number) => (y >= 0 && y <= 1 ? 1 : 0)
/** (f*g)(x) by numerical integration of f(y) g(x − y). */
export const convAt = (x: number, n = 4000) => { let s = 0; for (let i = 0; i < n; i++) { const y = -1 + (4 * (i + 0.5)) / n; s += boxF(y) * boxF(x - y) } return (s * 4) / n }
export const cnvAt = (x: number, y: number): Pt => [CNV2.ox + CNV2.ux * x, CNV2.oy + CNV2.uy * y]
export const cnvRes = (x: number, y: number): Pt => [CNV2.res.ox + CNV2.res.ux * x, CNV2.res.oy + CNV2.res.uy * y]

/** KG: (f*g)(x) = ∫ f(x − y) g(y) dy; smoothing; ℱ(f*g) = ℱ(f)·ℱ(g). */
export function buildConvolutionScene(): SceneSpec {
  return framed(raw_buildConvolutionScene())
}
function raw_buildConvolutionScene(): SceneSpec {
  const { xs, boxH } = CNV2
  const box = (x0: number, x1: number, color: string, t: number, yOff = 0): SceneObject[] => [ln(cnvAt(x0, yOff), cnvAt(x0, yOff + boxH), color, t), ln(cnvAt(x0, yOff + boxH), cnvAt(x1, yOff + boxH), color, t), ln(cnvAt(x1, yOff + boxH), cnvAt(x1, yOff), color, t)]
  const overlap = (a: number, b: number, color: string): SceneObject[] => { const lo = Math.max(0, a), hi = Math.min(1, b), out: SceneObject[] = []; if (hi > lo) for (let k = 0; k <= 8; k++) { const x = lo + ((hi - lo) * k) / 8; out.push(ln(cnvAt(x, 0), cnvAt(x, boxH), color, 0.02)) } return out }
  return {
    id: 'math-convolution',
    title: 'Convolution: slide, flip and measure the overlap',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show convolution (f*g)(x) = ∫ f(y) g(x − y) dy for the two box functions f = g = 1 on [0, 1]. For each x, flip g (g(x − y) as a function of y is g mirrored) and slide it so it is centred around x: the product f(y)g(x − y) is 1 only where the two boxes overlap, so (f*g)(x) is the length of the overlap. At x = 0.5 the flipped box covers [−0.5, 0.5] and overlaps f on [0, 0.5]: 0.5. At x = 1 it covers [0, 1] and overlaps fully: 1. Doing this for every x gives the triangle (f*g)(x) = min(x, 2 − x) on [0, 2] — a smoother function than either box.',
    ariaLabel:
      'Top: the box f, a blue rectangle outline of height 1 over the interval 0 to 1. In the first step a red box, g flipped and shifted by 0.5, covers minus 0.5 to 0.5; the overlap with f from 0 to 0.5 is hatched green and labelled 0.5. In the second step a second box, violet, covers 0 to 1 completely on top of f with a bigger hatched overlap labelled 1. Bottom, third step: a green triangle rising from 0 at x equal 0 to 1 at x equal 1 and falling back to 0 at x equal 2, with two white dots at heights 0.5 and 1 at x equal 0.5 and 1, captioned f star g.',
    stage: NO_STAGE,
    steps: [
      { narration: 'f is the box on [0, 1] (blue). To compute (f*g)(0.5), take g(0.5 − y): g mirrored and shifted so it sits on [−0.5, 0.5] (red box). The product f(y)g(0.5 − y) is 1 only where both boxes are, the overlap [0, 0.5] (hatched), so the integral is its length 0.5.', objects: [ln(cnvAt(-1.2, 0), cnvAt(2.4, 0), ROLE.reference, 0.04), ...box(0, 1, ROLE.output, 0.06), ...box(xs[0] - 1, xs[0], ROLE.input, 0.05, 0.0), ...overlap(xs[0] - 1, xs[0], ROLE.result), lb('0.5', [cnvAt(0.25, 0)[0], cnvAt(0, 0)[1] - 0.5], ROLE.result), lb('f', [cnvAt(0.5, boxH)[0] + 0.0, cnvAt(0.5, boxH)[1] + 0.5], ROLE.output)] },
      { narration: 'Slide further: at x = 1 the flipped box sits on [0, 1], exactly on top of f (violet). The overlap is the whole box, length 1, so (f*g)(1) = 1. At x = 2 the boxes only touch and the overlap is 0.', objects: [...box(xs[1] - 1, xs[1], ROLE.aid, 0.04, 0.0), ...overlap(xs[1] - 1, xs[1], ROLE.result), lb('1', [cnvAt(0.5, 0)[0] + 0.0, cnvAt(0, 0)[1] - 1.1], ROLE.result)] },
      { narration: 'Plot the overlap length against x: it rises from 0 at x = 0 to 1 at x = 1 and falls to 0 at x = 2 — the triangle (f*g)(x) = min(x, 2 − x). Convolving two boxes gives a smoother, wider function; repeated convolution tends to a bell curve. Under the Fourier transform convolution becomes multiplication, ℱ(f*g) = ℱ(f)·ℱ(g).', objects: [ln(cnvRes(-0.1, 0), cnvRes(2.3, 0), ROLE.reference, 0.04), ln(cnvRes(0, 0), cnvRes(1, 1), ROLE.result, 0.06), ln(cnvRes(1, 1), cnvRes(2, 0), ROLE.result, 0.06), ...xs.map((x) => dt(cnvRes(x, convAt(x)), ROLE.ink, 0.1)), lb('f*g', [cnvRes(1, 1)[0] + 0.7, cnvRes(1, 1)[1] + 0.1], ROLE.result)] },
    ],
  }
}
