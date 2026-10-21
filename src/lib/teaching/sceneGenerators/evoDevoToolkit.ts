/**
 * evoDevoToolkit — `bio.evo.evo-devo` drawn as the two results the lesson stands on.
 *
 * The concept was served two coloured pins ("Regulatory region changes" / "Protein-coding sequence changes") — the conclusion with none of
 * the evidence (learner run, 2026-10-21). The Educational Brain entry rests on two observations, and this draws both:
 *
 *   1. THE TOOLKIT IS SHARED. Hox genes sit on the chromosome in the SAME order as the body regions they specify, in a fly and in a
 *      human, lineages that diverged hundreds of millions of years ago: gene 1 → head end … gene 4 → tail end, in both rows.
 *   2. THE SIGNAL IS CONSERVED, THE OUTPUT IS NOT. Mouse Pax6 expressed in a fly makes a FLY eye: the fly's own genes receive the signal
 *      "build an eye here" and build their own eye, so the eye is drawn in the fly's colour, not the mouse's.
 *
 * Core understanding only (the lesson's entry): four stand-in genes, no gene names beyond Hox and Pax6, no cluster counts.
 *
 * THE CONSISTENCY GUARANTEE. `checkEvoDevoConsistency` re-derives from the drawn geometry that, in each species, the colours of the gene
 * dots read left to right are the colours of the body segments read head to tail, that every link joins a gene to the segment of its
 * own colour directly below it, that both species use the same order, and that the eye is the fly's colour (not the transplanted
 * gene's) and sits on the fly.
 *
 * Pure: no network, no LLM, no randomness — reached only through `conceptSceneParams.ts`.
 */

import type { SceneObject, SceneSpec, Vec3 } from '../sceneSpec'
import { ROLE, arrow, dot, label, line } from './visualDesign'
import { type ConsistencyResult } from './shared'

/** Head-to-tail colours of the four Hox stand-ins (also the colour of the body segment each one specifies). */
export const HOX_COLORS = [ROLE.input, ROLE.aid, ROLE.output, ROLE.result] as const
/** x centre of each segment / gene, identical in both species. */
export const SEGMENT_X = [-4.6, -1.6, 1.4, 4.4] as const
export const SEGMENT_HALF = 1.3
/** y of each row. */
export const ROWS = {
  flyGenes: 7.8, flyBody: 5.7, humanGenes: 3.6, humanBody: 1.5,
} as const
const BODY_THICKNESS = 0.4

/** The transplant, lower in the picture. */
export const PAX6 = {
  mouse: [-5.5, -4.2, 0] as Vec3,
  fly: [0.8, -4.2, 0] as Vec3,
  eye: [1.75, -3.45, 0] as Vec3,
} as const
export const FLY_COLOR = ROLE.output
export const MOUSE_COLOR = ROLE.input

const genesRow = (y: number): SceneObject[] => [
  line([SEGMENT_X[0] - 1.5, y, 0], [SEGMENT_X[3] + 1.5, y, 0], ROLE.reference, 0.05),
  ...SEGMENT_X.map((x, i) => dot([x, y, 0], HOX_COLORS[i], 0.34)),
  ...SEGMENT_X.map((x, i) => label(String(i + 1), [x, y + 0.85, 0], HOX_COLORS[i], 'detail')),
]
const bodyRow = (y: number): SceneObject[] =>
  SEGMENT_X.map((x, i) => line([x - SEGMENT_HALF, y, 0], [x + SEGMENT_HALF, y, 0], HOX_COLORS[i], BODY_THICKNESS))
const links = (gy: number, by: number): SceneObject[] =>
  SEGMENT_X.map((x, i) => line([x, gy - 0.4, 0], [x, by + 0.3, 0], HOX_COLORS[i], 0.04))

export function buildEvoDevoScene(): SceneSpec {
  const toolkit: SceneObject[] = [
    ...genesRow(ROWS.flyGenes), ...genesRow(ROWS.humanGenes),
    label('fly', [-8, ROWS.flyGenes, 0], ROLE.ink, 'detail'),
    label('human', [-8, ROWS.humanGenes, 0], ROLE.ink, 'detail'),
    label('Hox genes on the chromosome', [0, ROWS.flyGenes + 1.9, 0], ROLE.reference, 'detail'),
  ]
  const bodies: SceneObject[] = [
    ...bodyRow(ROWS.flyBody), ...bodyRow(ROWS.humanBody),
    ...links(ROWS.flyGenes, ROWS.flyBody), ...links(ROWS.humanGenes, ROWS.humanBody),
    label('head', [SEGMENT_X[0], ROWS.humanBody - 1.1, 0], ROLE.ink, 'detail'),
    label('tail', [SEGMENT_X[3], ROWS.humanBody - 1.1, 0], ROLE.ink, 'detail'),
  ]
  const transplant: SceneObject[] = [
    dot(PAX6.mouse, MOUSE_COLOR, 0.5), label('mouse Pax6', [PAX6.mouse[0], PAX6.mouse[1] - 1.1, 0], MOUSE_COLOR, 'detail'),
    arrow([PAX6.mouse[0] + 0.9, PAX6.mouse[1], 0], [PAX6.fly[0] - 1.5, PAX6.fly[1], 0], MOUSE_COLOR),
    dot(PAX6.fly, FLY_COLOR, 1.1), label('fly', [PAX6.fly[0], PAX6.fly[1] - 1.7, 0], FLY_COLOR, 'detail'),
    dot(PAX6.eye, FLY_COLOR, 0.55), label('fly eye', [PAX6.eye[0] + 2.9, PAX6.eye[1] + 0.2, 0], FLY_COLOR, 'detail'),
  ]
  return {
    id: 'evo-devo-toolkit',
    title: 'The Shared Toolkit: Hox Order and the Pax6 Swap',
    sceneType: 'diagram',
    teachingGoal: 'Body plans are built from a deeply conserved genetic toolkit; a conserved signal (mouse Pax6) is received by the host’s own genes, so the output (a fly eye) is the host’s.',
    cameraDistance: 20,
    ariaLabel: 'Two things that show a shared genetic toolkit. Top: the Hox genes of a fly and of a human, four stand-in genes numbered 1 to 4 along each chromosome, each linked straight down to the body segment it specifies, head to tail, in the same order in both animals. Bottom: a mouse Pax6 gene is switched on in a fly, and the fly grows a fly eye.',
    stage: { grid: false, axes: false },
    steps: [
      { narration: 'Hox genes set the identity of body regions along the head-to-tail axis. Flies and humans both have them, and their last common ancestor lived hundreds of millions of years ago.', objects: toolkit, intent: 'establish' },
      { narration: 'Each Hox gene specifies one region, and the genes lie along the chromosome in the SAME order as the regions: 1 for the head end … 4 for the tail end, in the fly and in the human. The toolkit is shared.', objects: bodies, intent: 'relate' },
      { narration: 'Pax6 starts eye development. Switch on MOUSE Pax6 in a fly and the fly grows a FLY eye: the signal “build an eye here” is conserved, but the fly’s own downstream genes carry it out. So big changes in form mostly come from changing WHERE and WHEN conserved genes are switched on (regulation), not from new genes.', objects: transplant, intent: 'resolve' },
    ],
  }
}

const near = (a: number, b: number) => Math.abs(a - b) < 1e-6

export function checkEvoDevoConsistency(spec: SceneSpec): ConsistencyResult {
  const errors: string[] = []
  const objects = spec.steps.flatMap((s) => s.objects)
  const nodes = objects.filter((o) => o.type === 'node' && o.position)
  const bonds = objects.filter((o) => o.type === 'bond' && o.from && o.to)

  const genes = (y: number) => nodes.filter((o) => near(o.position![1], y)).sort((a, b) => a.position![0] - b.position![0])
  const segments = (y: number) => bonds.filter((o) => near(o.from![1], y) && near(o.to![1], y) && o.thickness === BODY_THICKNESS).sort((a, b) => a.from![0] - b.from![0])
  const order = (a: ReadonlyArray<{ color?: string | null }>) => a.map((o) => o.color).join(',')

  const rows = [['fly', ROWS.flyGenes, ROWS.flyBody], ['human', ROWS.humanGenes, ROWS.humanBody]] as const
  const geneOrders: string[] = []
  for (const [name, gy, by] of rows) {
    const g = genes(gy), s = segments(by)
    if (g.length !== 4 || s.length !== 4) { errors.push(`${name}: expected four genes and four body segments, found ${g.length} and ${s.length}`); continue }
    geneOrders.push(order(g))
    if (order(g) !== order(s)) errors.push(`${name}: the gene order along the chromosome is not the body-region order head to tail`)
    g.forEach((gene, i) => {
      const link = bonds.find((o) => near(o.from![0], gene.position![0]) && near(o.to![0], gene.position![0]) && o.from![1] < gy && o.to![1] >= by && o.to![1] < gy && o.from![1] > by)
      if (!link) errors.push(`${name}: gene ${i + 1} is not linked straight down to its body segment`)
      else if (link.color !== gene.color) errors.push(`${name}: gene ${i + 1} is linked to a segment of another colour`)
      if (s[i] && !(s[i].from![0] <= gene.position![0] && gene.position![0] <= s[i].to![0])) errors.push(`${name}: gene ${i + 1} is not above its own segment`)
    })
  }
  if (geneOrders.length === 2 && geneOrders[0] !== geneOrders[1]) errors.push('the fly and the human do not share the same gene order')

  const at = (p: Vec3) => nodes.find((o) => near(o.position![0], p[0]) && near(o.position![1], p[1]))
  const mouse = at(PAX6.mouse), fly = at(PAX6.fly), eye = at(PAX6.eye)
  if (!mouse || !fly || !eye) errors.push('the Pax6 swap must draw the mouse gene, the fly and the eye')
  else {
    if (eye.color !== fly.color) errors.push('the eye is not the fly’s colour: it must be built by the fly’s own genes')
    if (eye.color === mouse.color) errors.push('the eye is drawn as a mouse eye')
    if (fly.color === mouse.color) errors.push('the fly and the transplanted gene share a colour, so the swap cannot be read')
    if (Math.hypot(eye.position![0] - fly.position![0], eye.position![1] - fly.position![1]) > (fly.radius ?? 0) + (eye.radius ?? 0) + 1.6) errors.push('the eye is not on the fly')
    const arrowIn = objects.find((o) => o.type === 'arrow' && o.from && o.to && near(o.from![1], mouse.position![1]) && o.from![0] > mouse.position![0] && o.to![0] < fly.position![0])
    if (!arrowIn) errors.push('no arrow carries the mouse gene into the fly')
  }
  const text = objects.map((o) => o.text ?? '').join(' | ')
  for (const need of ['fly', 'human', 'Hox genes', 'head', 'tail', 'mouse Pax6', 'fly eye']) if (!text.includes(need)) errors.push(`the figure is missing the label "${need}"`)
  return { ok: errors.length === 0, errors }
}
