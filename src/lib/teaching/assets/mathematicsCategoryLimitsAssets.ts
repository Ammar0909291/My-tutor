/**
 * Fourth math.cat asset batch — equalizer and pullback.
 *
 * Continues serving-asset coverage for math.cat (6/15 -> 8/15). Transcribed
 * from the frozen Educational Brain entries at
 * educational-brain/concepts/mathematics/math.cat.equalizer.md and
 * math.cat.pullback.md.
 *
 *   EQUALIZER   equalizer — literally the two-parallel-arrows limit;
 *               universality picks the maximal agreeing subset; the
 *               coequalizer is a genuinely different quotient.
 *   PULLBACK    pullback — cospan vs. span point opposite directions;
 *               pullback equals the product only in the degenerate
 *               one-point-C case; pushout's count drops by identification.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const EQUALIZER = 'math.cat.equalizer'
const PULLBACK = 'math.cat.pullback'

export const MATHEMATICS_CATEGORY_LIMITS_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: EQUALIZER, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'The equalizer of f,g:A→B is EXACTLY the limit of the two-parallel-arrows diagram — never '
      + 'an unrelated new definition. A cone over this diagram shape is an object C with maps '
      + 'into both A and B, but the map into B is DETERMINED by composing with either f or g, and '
      + 'these must AGREE — forcing f∘e = g∘e exactly. Cone data reduces exactly to equalizer '
      + 'data.\n\n'
      + 'Universality picks out ONE CANONICAL subset, never any arbitrary agreeing subset. For '
      + 'f(x)=x^2, g(x)=3x-2: the equalizer is E={x:x^2=3x-2}={1,2}. A proper subset like {1} '
      + 'fails universality: a cone hitting both 1 and 2 could not factor uniquely through it, so '
      + 'E must be the LARGEST, all-encompassing agreeing set.\n\n'
      + 'The coequalizer is a GENUINELY DIFFERENT quotient construction, never the equalizer '
      + 'mirrored. For A={*}, B={1,2,3}, f(*)=1, g(*)=2: the coequalizer identifies 1~2, giving '
      + 'Q={[1=2],[3]} — a set that is NOT a subset of B at all. The equalizer restricts A '
      + '(narrows via inclusion into A); the coequalizer collapses B (quotients via a map out of '
      + 'B) — dual operations, never mirror images of the same computation.',
    targetedMisconceptions: [`${EQUALIZER}:MC-1`, `${EQUALIZER}:MC-2`, `${EQUALIZER}:MC-3`],
    source: eb(EQUALIZER, 'Core Understanding — the equalizer is literally a limit, universality picks the maximal subset, the coequalizer is a different quotient'),
  },
  {
    conceptId: PULLBACK, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'A pullback\'s diagram is a COSPAN A→C←B (both maps INTO C); a pushout\'s diagram is a SPAN '
      + 'A←C→B (both maps OUT OF C) — genuinely opposite directions, never interchangeable. For a '
      + 'pullback with a non-trivial C (|C|=2, parity example): |A×B|=9 narrows down to |P|=4 '
      + 'agreeing pairs. For a pushout gluing example: |A|+|B|=4 combines via identification down '
      + 'to |Q|=3.\n\n'
      + 'The pullback equals the ordinary product ONLY in the degenerate one-point-C case, never '
      + 'always. When C={*} with f,g the unique constant maps: f(a)=g(b)=* for EVERY pair, so the '
      + 'agreement condition is vacuous, giving P=A×B exactly. But for a non-trivial C, P '
      + 'genuinely narrows to only the agreeing pairs.\n\n'
      + 'The pushout\'s element count is REDUCED BY IDENTIFICATION, never a plain sum. For C={*}, '
      + 'A={1,2}, B={p,q}, f(*)=1, g(*)=p: the pushout glues 1~p, giving Q={[1=p],2,q} — a '
      + 'three-element set, NOT |A|+|B|=4. The identifications forced by f,g genuinely reduce the '
      + 'count below the simple sum whenever any identification occurs.',
    targetedMisconceptions: [`${PULLBACK}:MC-1`, `${PULLBACK}:MC-2`, `${PULLBACK}:MC-3`],
    source: eb(PULLBACK, 'Core Understanding — cospan vs. span are opposite directions, pullback equals the product only degenerately, pushout count is reduced by identification'),
  },
]

export const MATHEMATICS_CATEGORY_LIMITS_PROBES: SeedProbe[] = [
  // --- math.cat.equalizer ---------------------------------------------------
  {
    conceptId: EQUALIZER, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'For f(x)=x^2 and g(x)=3x-2 on R, the agreeing set is {1,2}. Would {1} alone also qualify as "the" equalizer?',
    choices: [
      { text: 'No — universality forces the equalizer to be the LARGEST agreeing set; {1} fails since a cone hitting both 1 and 2 could not factor uniquely through it', isCorrect: true },
      { text: 'Yes — any subset where f and g agree qualifies equally', isCorrect: false, misconceptionId: `${EQUALIZER}:MC-2` },
      { text: 'Yes, since {1} is a valid subset of the agreeing set', isCorrect: false, misconceptionId: `${EQUALIZER}:MC-2` },
    ],
    targetedMisconceptions: [`${EQUALIZER}:MC-2`],
    source: eb(EQUALIZER, 'Assessment gate — universality picks the maximal canonical subset'),
  },
  {
    conceptId: EQUALIZER, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'For f,g:{*}→{1,2,3} with f(*)=1, g(*)=2, is the coequalizer a subset of {1,2,3}, computed the same way as an equalizer?',
    choices: [
      { text: 'No — it is a quotient, Q={[1=2],[3]}, with equivalence classes that are not elements of the original set {1,2,3}', isCorrect: true },
      { text: 'Yes — it is the subset of {1,2,3} where f and g agree', isCorrect: false, misconceptionId: `${EQUALIZER}:MC-1` },
      { text: 'Yes, computed by the identical formula used for the equalizer', isCorrect: false, misconceptionId: `${EQUALIZER}:MC-1` },
    ],
    targetedMisconceptions: [`${EQUALIZER}:MC-1`],
    source: eb(EQUALIZER, 'Misconception register — the coequalizer is a genuinely different quotient construction'),
  },
  {
    conceptId: EQUALIZER, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Is the equalizer merely analogous to a categorical limit, or is it literally an instance of one?',
    choices: [
      { text: 'It is literally the limit of the two-parallel-arrows diagram — cone data over that shape reduces exactly to equalizer data', isCorrect: true },
      { text: 'It is only loosely analogous; equalizers are a separate, unrelated construction', isCorrect: false, misconceptionId: `${EQUALIZER}:MC-3` },
      { text: 'It is a limit only in the special case where f=g', isCorrect: false, misconceptionId: `${EQUALIZER}:MC-3` },
    ],
    targetedMisconceptions: [`${EQUALIZER}:MC-3`],
    source: eb(EQUALIZER, 'Transfer probe — the equalizer is literally the two-parallel-arrows limit'),
  },

  // --- math.cat.pullback ----------------------------------------------------
  {
    conceptId: PULLBACK, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Are the pullback\'s cospan diagram (A→C←B) and the pushout\'s span diagram (A←C→B) interchangeable, just relabeled?',
    choices: [
      { text: 'No — the arrows point genuinely opposite directions, producing structurally different, dual constructions', isCorrect: true },
      { text: 'Yes — they describe the exact same construction under different names', isCorrect: false, misconceptionId: `${PULLBACK}:MC-1` },
      { text: 'Yes, since both "combine two objects using a shared piece"', isCorrect: false, misconceptionId: `${PULLBACK}:MC-1` },
    ],
    targetedMisconceptions: [`${PULLBACK}:MC-1`],
    source: eb(PULLBACK, 'Assessment gate — cospan and span point opposite directions, never interchangeable'),
  },
  {
    conceptId: PULLBACK, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Does the pullback of f:A→C and g:B→C always equal the ordinary product A×B?',
    choices: [
      { text: 'No — only in the degenerate one-point-C case, where the agreement condition is vacuous; a non-trivial C genuinely restricts the pairs', isCorrect: true },
      { text: 'Yes — the pullback is always just the product A×B, regardless of C', isCorrect: false, misconceptionId: `${PULLBACK}:MC-2` },
      { text: 'Yes, as long as f and g are both surjective', isCorrect: false, misconceptionId: `${PULLBACK}:MC-2` },
    ],
    targetedMisconceptions: [`${PULLBACK}:MC-2`],
    source: eb(PULLBACK, 'Misconception register — the pullback equals the product only in the degenerate one-point-C case'),
  },
  {
    conceptId: PULLBACK, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'For A={1,2}, B={p,q}, C={*}, f(*)=1, g(*)=p, does the pushout Q have |A|+|B|=4 elements?',
    choices: [
      { text: 'No — it has 3 elements, since the identification 1~p forced by f,g reduces the count below the plain sum', isCorrect: true },
      { text: 'Yes — a pushout is always a plain disjoint union with |A|+|B| elements', isCorrect: false, misconceptionId: `${PULLBACK}:MC-3` },
      { text: 'Yes, since gluing never removes any elements', isCorrect: false, misconceptionId: `${PULLBACK}:MC-3` },
    ],
    targetedMisconceptions: [`${PULLBACK}:MC-3`],
    source: eb(PULLBACK, 'Transfer probe — the pushout\'s element count is reduced by identification, never a plain sum'),
  },
]
