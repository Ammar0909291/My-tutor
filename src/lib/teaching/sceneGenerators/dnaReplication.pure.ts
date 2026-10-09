/**
 * DNA replication — one replication fork, authored for bio.mol.dna-replication.
 *
 * WHY THIS EXISTS. The concept was served the `dna_structure` generator's
 * shared instance: a static Watson-Crick base-pairing ladder with a GC-content
 * label. That is a figure of DNA, not of copying it — no fork, no template
 * strands, no new strands, no enzymes — so scope.ts had demoted it to a
 * general illustration ("static Watson-Crick pairing; no replication fork").
 *
 * WHAT IT DRAWS, AND WHERE EACH CLAIM COMES FROM. Only what the canonical
 * concept carries: the KG description ("Semiconservative replication;
 * helicase, DNA polymerase, primase, ligase; leading and lagging strands,
 * Okazaki fragments; origin of replication") and the concept's own
 * Educational Brain entry (educational-brain/concepts/biology/
 * bio.mol.dna-replication.md), which prescribes this exact figure: "Draw a
 * replication fork with both template strands' 5′/3′ ends labelled", with
 * leading/lagging derived from antiparallel templates + a 5′→3′-only
 * polymerase that can only extend an existing 3′ end (hence primers).
 * Nothing else is drawn — no topoisomerase, no single-strand binding protein,
 * no sliding clamp: none is in the concept, so none may be claimed.
 *
 * GEOMETRY (x grows to the right; the fork moves LEFT, into unwound parent):
 *   top template     5′ at the fork side … 3′ at the right
 *   bottom template  3′ at the fork side … 5′ at the right   (antiparallel)
 *   New DNA is built 5′→3′ only, so its arrowheads mark its 3′ end, and a new
 *   strand runs ANTIPARALLEL to the template it copies.
 *   · On the top template the new strand's 5′ end is at the right (against the
 *     template's 3′ end) and its growing 3′ end points AT the fork, so it can
 *     follow the fork continuously: the LEADING strand, one primer. This is the
 *     textbook rule: the leading-strand template is read 3′→5′ in the direction
 *     the fork moves (here leftward, from its 3′ end at the right to its 5′ end).
 *   · On the bottom template the new strand's 3′ end points AWAY from the
 *     fork, so it is made in short pieces, each started by its own primer
 *     near the fork: the LAGGING strand, Okazaki fragments. The oldest
 *     fragment's primer has already been replaced with DNA, and ligase seals
 *     the nick where the next fragment meets it.
 *
 * Follows the M4 authoring rules (physicsPilot.ts): shared palette and
 * primitives from visualDesign.ts, labels are names, steps are cumulative and
 * every label is true of the complete figure, coordinates inside ±5.
 * Deterministic and parameter-free: there is nothing to extract.
 */

import type { SceneObject, SceneSpec, Vec3 } from '../sceneSpec'
import { ROLE, arrow, dot, heading, label, line } from './visualDesign'

/** Parental (old) strands and the templates they become. */
const PARENT = ROLE.reference
/** Newly synthesised DNA. */
const NEW = ROLE.result
/** RNA primers. */
const PRIMER = ROLE.input
/** Enzymes. */
const ENZYME = ROLE.aid

const FORK: Vec3 = [-2.0, 0, 0]
const Y_PARENT = 0.35     // half-gap of the parental duplex
const Y_TEMPLATE = 2.8    // template arms
const Y_NEW = 2.0         // new strands, just inside each template (room between them for two captions)
const X_ARM = -1.0        // where each arm levels off
const X_END = 4.6

export const DNA_REPLICATION_SCENE_ID = 'dna-replication-fork'

/** Lagging-strand pieces, oldest (farthest from the fork) last. [primerStart, dnaStart, threeEnd] */
const OKAZAKI: ReadonlyArray<{ primer: [number, number] | null; dna: [number, number] }> = [
  { primer: [-0.7, -0.3], dna: [-0.3, 0.9] },   // newest — being extended by polymerase
  { primer: [1.2, 1.6], dna: [1.6, 2.95] },     // complete; runs into the next one
  { primer: null, dna: [3.0, 4.4] },            // oldest — primer already replaced by DNA
]

export function buildDNAReplicationScene(): SceneSpec {
  const parental: SceneObject[] = [
    line([-4.6, Y_PARENT, 0], [FORK[0], Y_PARENT, 0], PARENT, 0.06),
    line([-4.6, -Y_PARENT, 0], [FORK[0], -Y_PARENT, 0], PARENT, 0.06),
    dot(FORK, ENZYME, 0.22),
    label('helicase', [-3.0, -1.2, 0], ENZYME, 'primary'),
    // Direction of fork movement. Its caption is the arrow's OWN text (not a label object), so the nine label objects
    // the intermediate budget shows are all enzymes and strands; an unlabelled arrow read as decoration.
    arrow([-2.8, 3.9, 0], [-4.4, 3.9, 0], ROLE.ink, 'fork moves'),
  ]

  const templates: SceneObject[] = [
    line([FORK[0], Y_PARENT, 0], [X_ARM, Y_TEMPLATE, 0], PARENT, 0.06),
    line([X_ARM, Y_TEMPLATE, 0], [X_END, Y_TEMPLATE, 0], PARENT, 0.06),
    line([FORK[0], -Y_PARENT, 0], [X_ARM, -Y_TEMPLATE, 0], PARENT, 0.06),
    line([X_ARM, -Y_TEMPLATE, 0], [X_END, -Y_TEMPLATE, 0], PARENT, 0.06),
    // Polarity: the parental ends at the left, the template ends at the right.
    // Each strand's two ends are opposite (5′ at one, 3′ at the other), and the two
    // strands are antiparallel. The top strand is the LEADING-strand template, so its
    // 3′ end is the far (right) end; labelling it the other way round made the drawn
    // leading strand run parallel to its own template.
    label('5′', [-4.95, 0.55, 0], PARENT, 'detail'),
    label('3′', [-4.95, -0.55, 0], PARENT, 'detail'),
    label('3′', [4.95, Y_TEMPLATE, 0], PARENT, 'detail'),
    label('5′', [4.95, -Y_TEMPLATE, 0], PARENT, 'detail'),
  ]

  const primers: SceneObject[] = [
    // Leading strand: ONE primer, at its 5′ start (toward the origin, off to the right).
    line([4.4, Y_NEW, 0], [3.8, Y_NEW, 0], PRIMER, 0.08),
    // The newest lagging piece's primer, just laid down near the fork.
    line([OKAZAKI[0].primer![0], -Y_NEW, 0], [OKAZAKI[0].primer![1], -Y_NEW, 0], PRIMER, 0.08),
    dot([-1.0, -Y_NEW, 0], ENZYME, 0.18),
    label('primase', [-1.4, -3.6, 0], ENZYME, 'primary'),
    label('RNA primer', [4.1, 1.2, 0], PRIMER, 'detail'),
  ]

  const leading: SceneObject[] = [
    // Built 5′→3′: the arrowhead is the growing 3′ end, pointing at the fork.
    arrow([3.8, Y_NEW, 0], [-0.55, Y_NEW, 0], NEW),
    dot([-0.7, Y_NEW, 0], ENZYME, 0.2),
    label('DNA polymerase', [0.2, 3.7, 0], ENZYME, 'primary'),
    label('leading strand', [0.4, 1.2, 0], NEW, 'detail'),
  ]

  const lagging: SceneObject[] = [
    // The older piece's primer (the newest one's was placed in the primer step).
    line([OKAZAKI[1].primer![0], -Y_NEW, 0], [OKAZAKI[1].primer![1], -Y_NEW, 0], PRIMER, 0.08),
    // Each piece built 5′→3′, AWAY from the fork.
    ...OKAZAKI.map((f) => arrow([f.dna[0], -Y_NEW, 0], [f.dna[1], -Y_NEW, 0], NEW)),
    dot([1.0, -Y_NEW, 0], ENZYME, 0.2),
    label('DNA polymerase', [1.7, -3.7, 0], ENZYME, 'primary'),
    // ONE caption for the strand and the pieces it is made of: the Okazaki fragments ARE the lagging strand, and a
    // separate caption for them hung 2 units below the strand, past the template, pointing at nothing.
    { ...label('lagging strand (Okazaki fragments)', [1.8, -0.95, 0], NEW, 'detail'), properties: { labelWrapUnits: 6 } },
  ]

  const ligase: SceneObject[] = [
    dot([2.98, -Y_NEW, 0], ENZYME, 0.2),
    label('ligase', [4.5, -3.7, 0], ENZYME, 'primary'),
  ]

  const result: SceneObject[] = [
    heading('semiconservative', [0, -5.4, 0], NEW),
  ]

  return {
    id: DNA_REPLICATION_SCENE_ID,
    title: 'DNA Replication at a Replication Fork',
    sceneType: 'process',
    // Wider than tall; the default distance clips both ends at a 390px viewport.
    cameraDistance: 14.5,
    teachingGoal:
      'Show why one new strand is made continuously and the other in Okazaki fragments: the two ' +
      'templates run antiparallel and DNA polymerase builds only 5′→3′, extending an existing 3′ end ' +
      'that a primer provides.',
    ariaLabel:
      'A replication fork. Parental double-stranded DNA on the left is unwound by helicase at the fork, ' +
      'which moves left. The two template strands run in opposite directions: the top one 5′ to 3′ ' +
      'away from the fork, the bottom one 3′ to 5′. On the top template a new leading strand, started from ' +
      'one RNA primer, is built continuously toward the fork by DNA polymerase. On the bottom template ' +
      'the lagging strand is built away from the fork in short Okazaki fragments, each begun by an RNA ' +
      'primer laid down by primase; ligase joins the fragments. Each new DNA molecule keeps one parental ' +
      'strand and one new strand.',
    // The frame's derived legend names colours by ROLE ("Construction aid", "Applied / incoming quantity"), which says
    // nothing about DNA. Authored here, in the figure's own words.
    explainer: {
      legend: [
        { label: 'Parental DNA (the two templates)', color: PARENT, shape: 'line' },
        { label: 'New DNA, built 5′→3′ (arrowhead = growing 3′ end)', color: NEW, shape: 'arrow' },
        { label: 'RNA primer', color: PRIMER, shape: 'line' },
        { label: 'Enzymes', color: ENZYME, shape: 'dot' },
      ],
    },
    steps: [
      {
        intent: 'establish',
        narration:
          'Helicase unwinds the parental double helix at the replication fork. The fork moves in the ' +
          'direction of the arrow, into DNA that is still double-stranded.',
        objects: parental,
      },
      {
        intent: 'relate',
        narration:
          'Each separated strand is now a template. They run in opposite directions: the top template ' +
          'runs 5′ to 3′ away from the fork, the bottom one 3′ to 5′.',
        objects: templates,
      },
      {
        intent: 'relate',
        narration:
          'DNA polymerase can only add on to an existing 3′ end — it cannot start a strand. Primase lays ' +
          'down a short RNA primer to give it that starting end.',
        objects: primers,
      },
      {
        intent: 'resolve',
        narration:
          'New DNA is built 5′ to 3′. On the top template that direction points toward the fork, so ' +
          'DNA polymerase follows the fork and builds the leading strand in one continuous piece.',
        objects: leading,
      },
      {
        intent: 'resolve',
        narration:
          'On the bottom template 5′→3′ points away from the fork, so each Okazaki fragment grows away ' +
          'from it, from a new primer laid nearer the fork as it opens; ligase then joins the pieces.',
        objects: [...lagging, ...ligase],
      },
      {
        intent: 'connect',
        narration:
          'Replication is semiconservative: each new DNA molecule keeps one parental strand and gains ' +
          'one newly built strand.',
        objects: result,
      },
    ],
  }
}
