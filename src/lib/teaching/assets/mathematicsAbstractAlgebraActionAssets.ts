/**
 * Sixth math.abst asset batch — coset and group-action.
 *
 * Continues serving-asset coverage for math.abst (10/36 -> 12/36).
 * Transcribed from the frozen Educational Brain entries at
 * educational-brain/concepts/mathematics/math.abst.coset.md and
 * math.abst.group-action.md.
 *
 *   COSET    coset — aH=bH exactly when a^-1b∈H, never judged by
 *            generators looking different; the index counts distinct
 *            blocks, not attempts; aH and Ha can genuinely differ.
 *   GROUPACT group-action — both axioms (identity + compatibility) are
 *            required; the stabilizer is always a genuine subgroup, never
 *            an arbitrary subset; orbit size times stabilizer size always
 *            equals |G|.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const COSET = 'math.abst.coset'
const GROUPACT = 'math.abst.group-action'

export const MATHEMATICS_ABSTRACT_ALGEBRA_ACTION_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: COSET, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'For a subgroup H≤G and a∈G, the LEFT COSET is aH={ah : h∈H}. The COSET EQUALITY '
      + 'CRITERION: aH=bH IFF a^-1b∈H — this shortcut avoids listing out both cosets; two '
      + 'DIFFERENT elements can genuinely generate the SAME coset, and the criterion, not the '
      + 'elements\' apparent difference, decides equality. In Z/6Z with H={0,3}: 1+H={1,4} and '
      + '4+H={4,1}={1,4} — the same coset from different generators.\n\n'
      + 'Distinct cosets PARTITION G: every element belongs to EXACTLY one left coset, and any two '
      + 'cosets are either IDENTICAL or entirely DISJOINT, never partially overlapping. '
      + 'Continuing to compute cosets past covering every element of G just REPRODUCES '
      + 'already-found cosets — the index [G:H]=|G|/|H| counts distinct blocks, not attempts.\n\n'
      + 'All cosets have the SAME SIZE |H| (via the bijection h↦ah). In a non-abelian group, the '
      + 'left coset aH and the right coset Ha for a non-normal subgroup can genuinely DIFFER as '
      + 'sets — the near-symmetric notation aH vs. Ha differs only in which side the fixed '
      + 'element sits, and this side matters.',
    targetedMisconceptions: [`${COSET}:MC-1`, `${COSET}:MC-2`, `${COSET}:MC-3`],
    source: eb(COSET, 'Core Understanding — the coset equality criterion, distinct cosets partition G, left and right cosets can differ'),
  },
  {
    conceptId: GROUPACT, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'A group action of G on X is a map G×X→X (written g·x) satisfying BOTH: (i) IDENTITY — '
      + 'e·x=x for every x; (ii) COMPATIBILITY — g·(h·x)=(gh)·x for all g,h. A map satisfying only '
      + 'ONE of the two axioms is NOT a genuine group action — checking identity alone says '
      + 'nothing about compatibility.\n\n'
      + 'The STABILIZER of x, G_x={g∈G : gx=x}, is NOT just an arbitrary subset — it is ALWAYS a '
      + 'genuine SUBGROUP: it contains e (identity axiom), is closed under the operation (if g,h '
      + 'both fix x, so does gh, by compatibility), and closed under inverses (if g fixes x, so '
      + 'does g^-1).\n\n'
      + 'The ORBIT-STABILIZER theorem: |Gx|·|G_x|=|G| — for ANY element x, orbit size and '
      + 'stabilizer size MULTIPLY to give exactly the group\'s size. This is a genuine '
      + 'multiplicative constraint, not two independent quantities: a LARGER orbit forces a '
      + 'correspondingly SMALLER stabilizer. For D3 acting on a triangle\'s vertex 1: |Gx|=3, '
      + '|G_x|=2, and 3×2=6=|D3|, exactly as predicted.',
    targetedMisconceptions: [`${GROUPACT}:MC-1`, `${GROUPACT}:MC-2`, `${GROUPACT}:MC-3`],
    source: eb(GROUPACT, 'Core Understanding — both group-action axioms are required, the stabilizer is always a genuine subgroup, orbit and stabilizer sizes are linked by the Orbit-Stabilizer theorem'),
  },
]

export const MATHEMATICS_ABSTRACT_ALGEBRA_ACTION_PROBES: SeedProbe[] = [
  // --- math.abst.coset ------------------------------------------------------------
  {
    conceptId: COSET, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Could two different elements of G generate the exact same coset?',
    choices: [
      { text: 'Yes — aH=bH exactly when a^-1b∈H; e.g. in Z/6Z with H={0,3}, 1+H and 4+H are the same coset {1,4} despite 1≠4', isCorrect: true },
      { text: 'No — different generating elements must always produce different cosets', isCorrect: false, misconceptionId: `${COSET}:MC-1` },
      { text: 'No, since the generator uniquely determines the coset in every case', isCorrect: false, misconceptionId: `${COSET}:MC-1` },
    ],
    targetedMisconceptions: [`${COSET}:MC-1`],
    source: eb(COSET, 'Assessment gate — different generators can produce the same coset, decided by the equality criterion'),
  },
  {
    conceptId: COSET, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'If you compute a coset for every element of G, do you always get |G| genuinely distinct cosets?',
    choices: [
      { text: 'No — many generators repeat already-found cosets; only [G:H]=|G|/|H| genuinely distinct cosets exist, e.g. 3 distinct cosets in Z/6Z with H={0,3}, not 6', isCorrect: true },
      { text: 'Yes — each element of G always produces its own distinct coset', isCorrect: false, misconceptionId: `${COSET}:MC-2` },
      { text: 'Yes, since the number of cosets always equals |G|', isCorrect: false, misconceptionId: `${COSET}:MC-2` },
    ],
    targetedMisconceptions: [`${COSET}:MC-2`],
    source: eb(COSET, 'Misconception register — the index counts distinct blocks, not the number of elements tried'),
  },
  {
    conceptId: COSET, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Does aH mean the same thing as Ha in every group?',
    choices: [
      { text: 'No — in a non-abelian group, the left coset aH and right coset Ha for a non-normal subgroup can genuinely differ as sets; only in abelian groups do they always coincide', isCorrect: true },
      { text: 'Yes — aH and Ha are always identical regardless of the group', isCorrect: false, misconceptionId: `${COSET}:MC-3` },
      { text: 'Yes, since left and right multiplication are interchangeable notational conventions', isCorrect: false, misconceptionId: `${COSET}:MC-3` },
    ],
    targetedMisconceptions: [`${COSET}:MC-3`],
    source: eb(COSET, 'Transfer probe — left and right cosets can genuinely differ in non-abelian groups'),
  },

  // --- math.abst.group-action -------------------------------------------------------
  {
    conceptId: GROUPACT, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'If a map G×X→X satisfies the identity axiom, is that enough to confirm it is a genuine group action?',
    choices: [
      { text: 'No — the compatibility axiom g·(h·x)=(gh)·x must ALSO be verified separately; checking identity alone says nothing about compatibility', isCorrect: true },
      { text: 'Yes — identity is the only axiom a group action requires', isCorrect: false, misconceptionId: `${GROUPACT}:MC-1` },
      { text: 'Yes, since compatibility is automatically implied once identity holds', isCorrect: false, misconceptionId: `${GROUPACT}:MC-1` },
    ],
    targetedMisconceptions: [`${GROUPACT}:MC-1`],
    source: eb(GROUPACT, 'Assessment gate — both the identity and compatibility axioms must be verified, never just one'),
  },
  {
    conceptId: GROUPACT, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Is the stabilizer G_x just an arbitrary subset of G, or is it guaranteed to have extra structure?',
    choices: [
      { text: 'It is always a genuine subgroup — it contains e, is closed under the operation, and is closed under inverses, forced directly by the group-action axioms', isCorrect: true },
      { text: 'It is just an arbitrary subset with no guaranteed algebraic structure', isCorrect: false, misconceptionId: `${GROUPACT}:MC-2` },
      { text: 'It is a subgroup only in special cases, not in general', isCorrect: false, misconceptionId: `${GROUPACT}:MC-2` },
    ],
    targetedMisconceptions: [`${GROUPACT}:MC-2`],
    source: eb(GROUPACT, 'Misconception register — the stabilizer is always a genuine subgroup, never an arbitrary subset'),
  },
  {
    conceptId: GROUPACT, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Are the orbit size and stabilizer size of an element independent quantities, unrelated to each other?',
    choices: [
      { text: 'No — the Orbit-Stabilizer theorem forces |Gx|·|G_x|=|G| exactly; a larger orbit forces a correspondingly smaller stabilizer, never free to vary independently', isCorrect: true },
      { text: 'Yes — orbit size and stabilizer size can take any values regardless of each other', isCorrect: false, misconceptionId: `${GROUPACT}:MC-3` },
      { text: 'Yes, since they are computed via unrelated procedures (reachability vs. fixing)', isCorrect: false, misconceptionId: `${GROUPACT}:MC-3` },
    ],
    targetedMisconceptions: [`${GROUPACT}:MC-3`],
    source: eb(GROUPACT, 'Transfer probe — orbit size and stabilizer size are linked by the Orbit-Stabilizer theorem, never independent'),
  },
]
