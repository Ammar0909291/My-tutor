/**
 * Eighteenth and FINAL math.abst asset batch — galois-group and
 * galois-correspondence.
 *
 * Completes serving-asset coverage for math.abst (34/36 -> 36/36 — DOMAIN
 * COMPLETE). Transcribed from the frozen Educational Brain entries at
 * educational-brain/concepts/mathematics/math.abst.galois-group.md and
 * math.abst.galois-correspondence.md.
 *
 *   GALOISGROUP  galois-group — |Gal(K/F)|=[K:F] requires the Galois
 *                hypothesis, never automatic for any finite extension;
 *                Frobenius's powers ARE the entire Galois group of a
 *                finite field, not one example among others; Galois
 *                groups need not be small or abelian (S_5).
 *   GALOISCORR   galois-correspondence — the correspondence is a genuine,
 *                exhaustive bijection, never a loose association; it
 *                reverses inclusion (bigger field, smaller subgroup);
 *                normal subgroups correspond exactly to Galois
 *                subextensions, replacing direct field re-verification.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const GALOISGROUP = 'math.abst.galois-group'
const GALOISCORR = 'math.abst.galois-correspondence'

export const MATHEMATICS_ABSTRACT_ALGEBRA_GALOIS_GROUP_CORRESPONDENCE_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: GALOISGROUP, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      '|Gal(K/F)|=[K:F] requires the GALOIS hypothesis specifically, never automatic for any '
      + 'finite extension: Q(∛2)/Q has degree 3 but is NOT Galois (∛2\'s only real conjugate root '
      + 'inside the field is itself), forcing Gal(Q(∛2)/Q)={id}, order 1≠3 — the equality '
      + 'genuinely fails outside the Galois case.\n\n'
      + 'The FROBENIUS AUTOMORPHISM σ(x)=x^p GENERATES the entire finite-field Galois group — its '
      + 'powers σ,σ²,...,σⁿ=id produce EVERY element of Gal(F_{p^n}/F_p)≅Z_n; Frobenius is not '
      + 'one example automorphism among unrelated others, it IS the generator of the whole cyclic '
      + 'group.\n\n'
      + 'NOT EVERY Galois group is small and abelian: the generic degree-5 polynomial\'s Galois '
      + 'group is the full symmetric group S_5 (order 120), genuinely non-abelian — the two small '
      + 'abelian examples studied first (Z/2×Z/2 and Z_n) are not the general pattern.',
    targetedMisconceptions: [`${GALOISGROUP}:MC-1`, `${GALOISGROUP}:MC-2`, `${GALOISGROUP}:MC-3`],
    source: eb(GALOISGROUP, 'Core Understanding — the degree equality requires the Galois hypothesis, Frobenius\'s powers are the entire group, Galois groups need not be small or abelian'),
  },
  {
    conceptId: GALOISCORR, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'The correspondence E↦Gal(K/E) is a genuine, EXHAUSTIVE BIJECTION between intermediate '
      + 'fields of a Galois extension K/F and subgroups of Gal(K/F) — never a loose association '
      + 'that might miss fields or subgroups. For K=Q(√2,√3), Gal(K/Q)≅Z_2×Z_2 has EXACTLY 5 '
      + 'subgroups, matched to EXACTLY 5 intermediate fields, none left over.\n\n'
      + 'The correspondence REVERSES INCLUSION: if E1⊆E2, then Gal(K/E2)⊆Gal(K/E1) — the subgroup '
      + 'SHRINKS as the field GROWS, opposite to most size-preserving correspondences already '
      + 'seen. The smallest field F corresponds to the LARGEST subgroup; the largest field K '
      + 'corresponds to the SMALLEST subgroup {e}.\n\n'
      + 'NORMAL SUBGROUPS correspond EXACTLY to Galois subextensions: an intermediate field E is '
      + 'itself Galois over F iff Gal(K/E) is a NORMAL subgroup of Gal(K/F) — this replaces '
      + 'laborious direct field-theoretic re-verification (splitting-field, separability) with a '
      + 'mechanical group-theoretic check.',
    targetedMisconceptions: [`${GALOISCORR}:MC-1`, `${GALOISCORR}:MC-2`, `${GALOISCORR}:MC-3`],
    source: eb(GALOISCORR, 'Core Understanding — the correspondence is a genuine exhaustive bijection, it reverses inclusion, normal subgroups correspond exactly to Galois subextensions'),
  },
]

export const MATHEMATICS_ABSTRACT_ALGEBRA_GALOIS_GROUP_CORRESPONDENCE_PROBES: SeedProbe[] = [
  // --- math.abst.galois-group -----------------------------------------------------
  {
    conceptId: GALOISGROUP, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Does |Gal(K/F)|=[K:F] hold for every finite field extension, regardless of whether it is Galois?',
    choices: [
      { text: 'No — it requires the Galois hypothesis specifically; Q(∛2)/Q has degree 3 but Gal(Q(∛2)/Q)={id}, order 1≠3, since it is not Galois', isCorrect: true },
      { text: 'Yes — the degree equality holds automatically for any finite extension', isCorrect: false, misconceptionId: `${GALOISGROUP}:MC-1` },
      { text: 'Yes, since the Galois hypothesis is automatically satisfied whenever the degree is finite', isCorrect: false, misconceptionId: `${GALOISGROUP}:MC-1` },
    ],
    targetedMisconceptions: [`${GALOISGROUP}:MC-1`],
    source: eb(GALOISGROUP, 'Assessment gate — the degree equality requires the Galois hypothesis, never automatic'),
  },
  {
    conceptId: GALOISGROUP, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Is the Frobenius automorphism just one example element of Gal(F_{p^n}/F_p), among possibly many other unrelated automorphisms?',
    choices: [
      { text: 'No — its powers σ,σ²,...,σⁿ=id produce EVERY element of the group; Frobenius IS the generator of the entire cyclic group, not one member among unrelated others', isCorrect: true },
      { text: 'Yes — Frobenius is simply one convenient automorphism, with other unrelated automorphisms also present', isCorrect: false, misconceptionId: `${GALOISGROUP}:MC-2` },
      { text: 'Yes, since the finite-field Galois group is typically generated by multiple independent elements', isCorrect: false, misconceptionId: `${GALOISGROUP}:MC-2` },
    ],
    targetedMisconceptions: [`${GALOISGROUP}:MC-2`],
    source: eb(GALOISGROUP, 'Misconception register — Frobenius\'s powers ARE the entire finite-field Galois group'),
  },
  {
    conceptId: GALOISGROUP, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Do all Galois groups resemble the small, abelian examples studied so far (Klein four-group, cyclic groups)?',
    choices: [
      { text: 'No — the generic degree-5 polynomial\'s Galois group is the full symmetric group S_5 (order 120), genuinely non-abelian; small and abelian is not the general pattern', isCorrect: true },
      { text: 'Yes — every Galois group is small and abelian, matching the examples studied first', isCorrect: false, misconceptionId: `${GALOISGROUP}:MC-3` },
      { text: 'Yes, since non-abelian groups can never arise as Galois groups of polynomial extensions', isCorrect: false, misconceptionId: `${GALOISGROUP}:MC-3` },
    ],
    targetedMisconceptions: [`${GALOISGROUP}:MC-3`],
    source: eb(GALOISGROUP, 'Transfer probe — Galois groups need not be small or abelian, S_5 is the standing counterexample'),
  },

  // --- math.abst.galois-correspondence -----------------------------------------------
  {
    conceptId: GALOISCORR, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Does the correspondence between intermediate fields and subgroups account for EVERY intermediate field, or could some be missed?',
    choices: [
      { text: 'It accounts for every one — a genuine, exhaustive bijection; for K=Q(√2,√3), exactly 5 subgroups match exactly 5 intermediate fields, none left over', isCorrect: true },
      { text: 'It is only a loose association, and some intermediate fields or subgroups could be missed', isCorrect: false, misconceptionId: `${GALOISCORR}:MC-1` },
      { text: 'It only captures the "obvious" fields, leaving more exotic intermediate fields unaccounted for', isCorrect: false, misconceptionId: `${GALOISCORR}:MC-1` },
    ],
    targetedMisconceptions: [`${GALOISCORR}:MC-1`],
    source: eb(GALOISCORR, 'Assessment gate — the correspondence is a genuine, exhaustive bijection, nothing missed'),
  },
  {
    conceptId: GALOISCORR, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Does a larger intermediate field correspond to a larger or a smaller subgroup?',
    choices: [
      { text: 'A smaller subgroup — the correspondence REVERSES inclusion; the smallest field F pairs with the largest subgroup, and the largest field K pairs with the smallest subgroup {e}', isCorrect: true },
      { text: 'A larger subgroup — bigger fields correspond to bigger subgroups', isCorrect: false, misconceptionId: `${GALOISCORR}:MC-2` },
      { text: 'The size relationship is unpredictable and varies case by case', isCorrect: false, misconceptionId: `${GALOISCORR}:MC-2` },
    ],
    targetedMisconceptions: [`${GALOISCORR}:MC-2`],
    source: eb(GALOISCORR, 'Misconception register — the correspondence reverses inclusion, bigger field means smaller subgroup'),
  },
  {
    conceptId: GALOISCORR, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'To determine whether a specific intermediate field is itself Galois over F, must you re-verify field-theoretic conditions directly, or can the corresponding subgroup answer this?',
    choices: [
      { text: 'The corresponding subgroup answers this directly: E is Galois over F iff Gal(K/E) is a NORMAL subgroup of Gal(K/F) — a mechanical group check replacing direct field re-verification', isCorrect: true },
      { text: 'Field-theoretic conditions (splitting field, separability) must always be re-verified directly on E, regardless of subgroup structure', isCorrect: false, misconceptionId: `${GALOISCORR}:MC-3` },
      { text: 'The subgroup structure has no bearing on whether an intermediate field is Galois', isCorrect: false, misconceptionId: `${GALOISCORR}:MC-3` },
    ],
    targetedMisconceptions: [`${GALOISCORR}:MC-3`],
    source: eb(GALOISCORR, 'Transfer probe — normal subgroups correspond exactly to Galois subextensions, replacing direct field re-verification'),
  },
]
