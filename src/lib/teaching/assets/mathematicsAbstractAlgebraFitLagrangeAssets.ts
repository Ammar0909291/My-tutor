/**
 * Thirteenth math.abst asset batch — first-isomorphism-theorem and
 * lagrange-theorem.
 *
 * Continues serving-asset coverage for math.abst (24/36 -> 26/36).
 * Transcribed from the frozen Educational Brain entries at
 * educational-brain/concepts/mathematics/math.abst.first-isomorphism-theorem.md
 * and math.abst.lagrange-theorem.md.
 *
 *   FIT        first-isomorphism-theorem — the theorem's new content is the
 *              isomorphism claim, not a mere restatement of kernel/image;
 *              well-definedness relies specifically on the kernel, not any
 *              normal subgroup; the ring version needs no separate proof.
 *   LAGRANGE   lagrange-theorem — the theorem is one-way, its converse is
 *              false; two distinct cosets can never share an element;
 *              corollary C2 (prime order forces cyclic) is scoped strictly
 *              to prime order.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const FIT = 'math.abst.first-isomorphism-theorem'
const LAGRANGE = 'math.abst.lagrange-theorem'

export const MATHEMATICS_ABSTRACT_ALGEBRA_FIT_LAGRANGE_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: FIT, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'The FIRST ISOMORPHISM THEOREM states G/ker(φ)≅im(φ). Its genuinely NEW content is NOT '
      + 'merely restating the definitions of kernel and image — it is the claim that the induced '
      + 'map φ̄(g·ker(φ))=φ(g) is a genuine ISOMORPHISM: well-defined, a homomorphism, injective, '
      + 'and surjective, all at once.\n\n'
      + 'WELL-DEFINEDNESS depends SPECIFICALLY on quotienting by the KERNEL, not by an arbitrary '
      + 'normal subgroup: if g1·ker(φ)=g2·ker(φ), then g1^-1g2∈ker(φ), so φ(g1^-1g2)=e_H, which '
      + 'forces φ(g1)=φ(g2) directly — a consequence that would NOT follow for a normal subgroup '
      + 'other than the kernel itself.\n\n'
      + 'The theorem holds in an EXACTLY ANALOGOUS RING form with NO separate proof strategy '
      + 'needed: for a ring homomorphism, R/ker(φ)≅im(φ), with ker(φ) now recognized as an ideal '
      + 'rather than merely a normal subgroup — the identical well-definedness argument applies '
      + 'unchanged.',
    targetedMisconceptions: [`${FIT}:MC-1`, `${FIT}:MC-2`, `${FIT}:MC-3`],
    source: eb(FIT, 'Core Understanding — the theorem\'s new content is the isomorphism claim, well-definedness needs the kernel specifically, the ring version needs no separate proof'),
  },
  {
    conceptId: LAGRANGE, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'LAGRANGE\'S THEOREM: for a finite group G and subgroup H≤G, |H| divides |G|, with '
      + '|G|=|H|·[G:H]. The proof reduces to two facts: distinct cosets PARTITION G into '
      + 'non-overlapping blocks (never sharing an element — two cosets sharing even one element '
      + 'forces them to be EQUAL), and every coset has the SAME SIZE |H|.\n\n'
      + 'The theorem gives a NECESSARY condition only, NEVER sufficient — its converse is FALSE: '
      + 'A4 (order 12) has 6∣12, yet A4 has NO subgroup of order 6 — divisibility alone never '
      + 'guarantees the subgroup exists.\n\n'
      + 'Corollary C2 (any group of PRIME order is cyclic) is SCOPED STRICTLY to prime order: a '
      + 'group of COMPOSITE order need NOT be cyclic — D3 (order 6, non-abelian) is genuinely not '
      + 'cyclic, despite 6 having multiple divisors, contrasted directly with Z/6Z (also order 6, '
      + 'genuinely cyclic).',
    targetedMisconceptions: [`${LAGRANGE}:MC-1`, `${LAGRANGE}:MC-2`, `${LAGRANGE}:MC-3`],
    source: eb(LAGRANGE, 'Core Understanding — the theorem is one-way and its converse fails, cosets never overlap, corollary C2 is scoped strictly to prime order'),
  },
]

export const MATHEMATICS_ABSTRACT_ALGEBRA_FIT_LAGRANGE_PROBES: SeedProbe[] = [
  // --- math.abst.first-isomorphism-theorem ---------------------------------------
  {
    conceptId: FIT, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Does the First Isomorphism Theorem just restate what kernel and image already mean, or is it claiming something genuinely new?',
    choices: [
      { text: 'It claims something genuinely new — that the induced map φ̄ between G/ker(φ) and im(φ) is a genuine isomorphism, requiring its own four-part verification (well-defined, homomorphism, injective, surjective)', isCorrect: true },
      { text: 'It just restates the already-known definitions of kernel and image together', isCorrect: false, misconceptionId: `${FIT}:MC-1` },
      { text: 'It only names the quotient group construction, adding no new claim about a map', isCorrect: false, misconceptionId: `${FIT}:MC-1` },
    ],
    targetedMisconceptions: [`${FIT}:MC-1`],
    source: eb(FIT, 'Assessment gate — the theorem\'s genuinely new content is the isomorphism claim about the induced map'),
  },
  {
    conceptId: FIT, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Would the induced map still be well-defined if the quotient were taken by SOME OTHER normal subgroup, not specifically the kernel?',
    choices: [
      { text: 'No — well-definedness specifically relies on g1^-1g2∈ker(φ) forcing φ(g1)=φ(g2); this consequence would not follow for a normal subgroup other than the kernel itself', isCorrect: true },
      { text: 'Yes — well-definedness would hold for any normal subgroup used in the quotient construction', isCorrect: false, misconceptionId: `${FIT}:MC-2` },
      { text: 'Yes, since the quotient-group construction always guarantees well-definedness regardless of which normal subgroup is used', isCorrect: false, misconceptionId: `${FIT}:MC-2` },
    ],
    targetedMisconceptions: [`${FIT}:MC-2`],
    source: eb(FIT, 'Misconception register — well-definedness relies specifically on the kernel, never any arbitrary normal subgroup'),
  },
  {
    conceptId: FIT, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Does the ring version of this theorem need an entirely different proof, or does the same argument transfer?',
    choices: [
      { text: 'The same argument transfers unchanged — with ker(φ) now recognized as an ideal rather than a normal subgroup, the identical well-definedness/homomorphism/injective/surjective structure applies', isCorrect: true },
      { text: 'The ring version requires an entirely separate proof strategy, unrelated to the group version', isCorrect: false, misconceptionId: `${FIT}:MC-3` },
      { text: 'The ring version cannot be proven at all using the group-theoretic argument as a starting point', isCorrect: false, misconceptionId: `${FIT}:MC-3` },
    ],
    targetedMisconceptions: [`${FIT}:MC-3`],
    source: eb(FIT, 'Transfer probe — the ring version needs no separate proof strategy, the identical argument transfers'),
  },

  // --- math.abst.lagrange-theorem --------------------------------------------------
  {
    conceptId: LAGRANGE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'If 6 divides |G|, does G necessarily have a subgroup of order 6?',
    choices: [
      { text: 'No — A4 has order 12 and 6∣12, yet A4 has NO subgroup of order 6; divisibility is necessary for a subgroup of that order to exist, but never sufficient', isCorrect: true },
      { text: 'Yes — Lagrange\'s theorem guarantees a subgroup exists for every divisor of |G|', isCorrect: false, misconceptionId: `${LAGRANGE}:MC-1` },
      { text: 'Yes, since the theorem is a two-way equivalence between divisibility and subgroup existence', isCorrect: false, misconceptionId: `${LAGRANGE}:MC-1` },
    ],
    targetedMisconceptions: [`${LAGRANGE}:MC-1`],
    source: eb(LAGRANGE, 'Assessment gate — Lagrange\'s theorem is one-way, its converse is false'),
  },
  {
    conceptId: LAGRANGE, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Can two different cosets of the same subgroup share an element?',
    choices: [
      { text: 'No — distinct cosets partition G into non-overlapping blocks; sharing even one element forces the two cosets to be equal, per the coset equality criterion', isCorrect: true },
      { text: 'Yes — cosets can partially overlap while still being counted as distinct', isCorrect: false, misconceptionId: `${LAGRANGE}:MC-2` },
      { text: 'Yes, as long as the group is non-abelian', isCorrect: false, misconceptionId: `${LAGRANGE}:MC-2` },
    ],
    targetedMisconceptions: [`${LAGRANGE}:MC-2`],
    source: eb(LAGRANGE, 'Misconception register — distinct cosets never overlap, they partition the group'),
  },
  {
    conceptId: LAGRANGE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Is every group of order 6 cyclic?',
    choices: [
      { text: 'No — corollary C2 (prime order forces cyclic) is scoped strictly to prime order; D3 has order 6 (composite) and is non-abelian, hence not cyclic, while Z/6Z (also order 6) is cyclic', isCorrect: true },
      { text: 'Yes — every group of order 6, or any order, is automatically cyclic by Lagrange\'s corollaries', isCorrect: false, misconceptionId: `${LAGRANGE}:MC-3` },
      { text: 'Yes, since corollary C2 applies to any group order, not just prime orders', isCorrect: false, misconceptionId: `${LAGRANGE}:MC-3` },
    ],
    targetedMisconceptions: [`${LAGRANGE}:MC-3`],
    source: eb(LAGRANGE, 'Transfer probe — corollary C2 is scoped strictly to prime order, never composite order'),
  },
]
