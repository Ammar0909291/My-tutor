/**
 * Seventh math.abst asset batch — normal-subgroup and quotient-group.
 *
 * Continues serving-asset coverage for math.abst (12/36 -> 14/36).
 * Transcribed from the frozen Educational Brain entries at
 * educational-brain/concepts/mathematics/math.abst.normal-subgroup.md and
 * math.abst.quotient-group.md.
 *
 *   NORMALSUB   normal-subgroup — non-abelian groups can genuinely have
 *               non-normal subgroups; gN=Ng is a set-level match, never
 *               element-wise commutation; normality is exactly what makes
 *               coset multiplication well-defined.
 *   QUOTIENT    quotient-group — the elements of G/N are the cosets
 *               themselves, never individual elements of G; |G/N| is a
 *               division, never a subtraction; normality is a hard
 *               requirement, not a convenience.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const NORMALSUB = 'math.abst.normal-subgroup'
const QUOTIENT = 'math.abst.quotient-group'

export const MATHEMATICS_ABSTRACT_ALGEBRA_QUOTIENT_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: NORMALSUB, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'A subgroup N≤G is NORMAL (N⊴G) if gNg^-1=N for EVERY g∈G — a real, checkable condition, '
      + 'not automatic for every subgroup. In an ABELIAN group, every subgroup is AUTOMATICALLY '
      + 'normal (gn=ng trivially), but in a NON-abelian group this guarantee disappears — in D3, '
      + 'H={e,r,r^2} IS normal (sHs=H), but K={e,s} is NOT (rKr^-1={e,sr}≠K).\n\n'
      + 'gNg^-1=N is EQUIVALENT to gN=Ng (left cosets equal right cosets as SETS). This does NOT '
      + 'require g to commute with each individual element of N — it only requires the SET {gn} '
      + 'to equal the SET {ng}, even when individual pairings differ (sr≠rs individually, yet '
      + 'sH=Hs as sets).\n\n'
      + 'Normality is EXACTLY the condition needed to make coset multiplication (aN)(bN):=abN '
      + 'WELL-DEFINED. If N is normal, the product does not depend on which representatives are '
      + 'chosen. If N is NOT normal, different valid representatives of the SAME coset can '
      + 'produce genuinely DIFFERENT products, making "multiply the cosets" ill-defined entirely.',
    targetedMisconceptions: [`${NORMALSUB}:MC-1`, `${NORMALSUB}:MC-2`, `${NORMALSUB}:MC-3`],
    source: eb(NORMALSUB, 'Core Understanding — normality is a checkable condition never automatic in non-abelian groups, gN=Ng is set-level, normality makes coset multiplication well-defined'),
  },
  {
    conceptId: QUOTIENT, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'The QUOTIENT GROUP G/N={gN : g∈G} consists of the LEFT COSETS of N in G. The quotient\'s '
      + 'ELEMENTS are these cosets themselves — each a whole SUBSET of G, NOT individual elements '
      + 'of G. In D3/H (normal H={e,r,r^2}), the two elements are H={e,r,r^2} and sH={s,sr,sr^2} '
      + '— each a 3-element subset, never a single element like e or r.\n\n'
      + 'For finite G: |G/N|=[G:N]=|G|/|N| — a DIVISION, obtained by counting distinct cosets, '
      + 'NEVER a subtraction. |D3/H|=6/3=2, not 6-3=3.\n\n'
      + 'Normality is REQUIRED, not optional: for a non-normal subgroup, the SAME coset can have '
      + 'different representatives whose products land in genuinely DIFFERENT cosets. '
      + 'Attempting "D3/K" for non-normal K={e,s}: coset rK\'s representative r gives r²K, while '
      + 'representative rs gives eK=K — r²K≠K, a genuine conflict confirming the construction '
      + 'fails entirely for non-normal subgroups.',
    targetedMisconceptions: [`${QUOTIENT}:MC-1`, `${QUOTIENT}:MC-2`, `${QUOTIENT}:MC-3`],
    source: eb(QUOTIENT, 'Core Understanding — quotient elements are cosets not elements of G, |G/N| is division never subtraction, normality is a hard requirement'),
  },
]

export const MATHEMATICS_ABSTRACT_ALGEBRA_QUOTIENT_PROBES: SeedProbe[] = [
  // --- math.abst.normal-subgroup ---------------------------------------------
  {
    conceptId: NORMALSUB, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Is every subgroup of every group automatically normal?',
    choices: [
      { text: 'No — this holds automatically only in abelian groups; in non-abelian groups like D3, K={e,s} is a perfectly legitimate subgroup that is genuinely NOT normal (rKr^-1≠K)', isCorrect: true },
      { text: 'Yes — normality is a guaranteed property of every subgroup in every group', isCorrect: false, misconceptionId: `${NORMALSUB}:MC-1` },
      { text: 'Yes, since every subgroup trivially satisfies gNg^-1=N', isCorrect: false, misconceptionId: `${NORMALSUB}:MC-1` },
    ],
    targetedMisconceptions: [`${NORMALSUB}:MC-1`],
    source: eb(NORMALSUB, 'Assessment gate — normality is not automatic, non-abelian groups can have non-normal subgroups'),
  },
  {
    conceptId: NORMALSUB, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Does gN=Ng mean g commutes with every individual element of N?',
    choices: [
      { text: 'No — it is the weaker set-level claim that the two full sets {gn} and {ng} coincide; individual pairings like sr≠rs can still differ while the sets match', isCorrect: true },
      { text: 'Yes — gN=Ng requires gn=ng for every single n in N', isCorrect: false, misconceptionId: `${NORMALSUB}:MC-2` },
      { text: 'Yes, since set equality of gN and Ng can only happen through element-wise commutation', isCorrect: false, misconceptionId: `${NORMALSUB}:MC-2` },
    ],
    targetedMisconceptions: [`${NORMALSUB}:MC-2`],
    source: eb(NORMALSUB, 'Misconception register — gN=Ng is a set-level match, never element-wise commutation'),
  },
  {
    conceptId: NORMALSUB, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Does coset multiplication (aN)(bN)=abN always give a consistent answer, no matter which subgroup N is used?',
    choices: [
      { text: 'No — it is well-defined precisely when N is normal; for a non-normal subgroup, different valid representatives of the same cosets produce genuinely conflicting products', isCorrect: true },
      { text: 'Yes — coset multiplication is always consistent regardless of normality', isCorrect: false, misconceptionId: `${NORMALSUB}:MC-3` },
      { text: 'Yes, since multiplying representatives always gives the same coset by definition', isCorrect: false, misconceptionId: `${NORMALSUB}:MC-3` },
    ],
    targetedMisconceptions: [`${NORMALSUB}:MC-3`],
    source: eb(NORMALSUB, 'Transfer probe — normality is exactly the condition needed for well-defined coset multiplication'),
  },

  // --- math.abst.quotient-group ----------------------------------------------------
  {
    conceptId: QUOTIENT, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Are the elements of G/N individual elements of G, or something else?',
    choices: [
      { text: 'They are the cosets themselves, each a whole subset of G — e.g. D3/H has elements H and sH, each a 3-element subset, never a single element like e or r', isCorrect: true },
      { text: 'They are individual elements of G, just relabeled', isCorrect: false, misconceptionId: `${QUOTIENT}:MC-1` },
      { text: 'They are the elements of N specifically', isCorrect: false, misconceptionId: `${QUOTIENT}:MC-1` },
    ],
    targetedMisconceptions: [`${QUOTIENT}:MC-1`],
    source: eb(QUOTIENT, 'Assessment gate — the elements of G/N are cosets, never individual elements of G'),
  },
  {
    conceptId: QUOTIENT, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Is |G/N| computed by subtraction or division?',
    choices: [
      { text: 'Division — |G/N|=|G|/|N|; e.g. |D3/H|=6/3=2, matching the direct count of 2 cosets, never |D3|-|H|=3', isCorrect: true },
      { text: 'Subtraction — |G/N|=|G|-|N|', isCorrect: false, misconceptionId: `${QUOTIENT}:MC-2` },
      { text: 'Subtraction, since the quotient removes N\'s elements from G', isCorrect: false, misconceptionId: `${QUOTIENT}:MC-2` },
    ],
    targetedMisconceptions: [`${QUOTIENT}:MC-2`],
    source: eb(QUOTIENT, 'Misconception register — the quotient group\'s size is computed by division, never subtraction'),
  },
  {
    conceptId: QUOTIENT, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Can the quotient group construction be applied to ANY subgroup, whether or not it is normal?',
    choices: [
      { text: 'No — attempting "D3/K" for non-normal K={e,s} genuinely fails: representative r of coset rK gives r²K, while representative rs gives K, a real conflict, not a mere inconvenience', isCorrect: true },
      { text: 'Yes — any subgroup, normal or not, produces a well-defined quotient group', isCorrect: false, misconceptionId: `${QUOTIENT}:MC-3` },
      { text: 'Yes, since the coset partition always works regardless of normality', isCorrect: false, misconceptionId: `${QUOTIENT}:MC-3` },
    ],
    targetedMisconceptions: [`${QUOTIENT}:MC-3`],
    source: eb(QUOTIENT, 'Transfer probe — normality is a hard requirement for the quotient construction, not a mere convenience'),
  },
]
