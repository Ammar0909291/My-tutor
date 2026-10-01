/**
 * Sixteenth math.abst asset batch — burnside-lemma and sylow-theorems.
 *
 * Continues serving-asset coverage for math.abst (30/36 -> 32/36).
 * Transcribed from the frozen Educational Brain entries at
 * educational-brain/concepts/mathematics/math.abst.burnside-lemma.md and
 * math.abst.sylow-theorems.md.
 *
 *   BURNSIDE  burnside-lemma — the fixed-point set X^g is not an orbit,
 *             opposite indexing; the formula's output is the distinct
 *             orbit count, never the raw configuration total; the sum
 *             must include every group element, including the identity.
 *   SYLOW     sylow-theorems — existence never implies normality, only
 *             n_p=1 does; n_p divides the cofactor m, never the full
 *             |G|; only the subgroup of the FULL prime-power order p^n
 *             qualifies as Sylow.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const BURNSIDE = 'math.abst.burnside-lemma'
const SYLOW = 'math.abst.sylow-theorems'

export const MATHEMATICS_ABSTRACT_ALGEBRA_BURNSIDE_SYLOW_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: BURNSIDE, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'BURNSIDE\'S LEMMA: the number of orbits |G\\X| equals (1/|G|)·Σ|X^g|, where '
      + 'X^g={x∈X : g·x=x} is the FIXED-POINT SET of g. X^g is NOT an orbit — opposite indexing: '
      + 'X^g is indexed by a FIXED group element and ranges over X, while an orbit is indexed by '
      + 'a FIXED element of X and ranges over G. For r acting on coloring RRB, the ORBIT of RRB '
      + 'has size 3, but testing r·RRB directly gives a different coloring, so RRB is not even in '
      + 'X^r at all — orbit size and fixed-point-set membership are unrelated computations.\n\n'
      + 'Burnside\'s formula reports the number of DISTINCT orbits |G\\X|, never the raw total '
      + '|X| — these are genuinely different quantities, one accounting for symmetry, one '
      + 'not.\n\n'
      + 'The sum runs over EVERY g∈G, INCLUDING THE IDENTITY: |X^e|=|X| always (the identity '
      + 'fixes everything), so omitting it drastically undercounts the sum — the identity alone '
      + 'often supplies the majority of the total.',
    targetedMisconceptions: [`${BURNSIDE}:MC-1`, `${BURNSIDE}:MC-2`, `${BURNSIDE}:MC-3`],
    source: eb(BURNSIDE, 'Core Understanding — the fixed-point set is not an orbit, the formula outputs the distinct orbit count, the sum must include the identity'),
  },
  {
    conceptId: SYLOW, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'For |G|=p^n·m (gcd(p,m)=1), a SYLOW p-SUBGROUP has order EXACTLY p^n — the FULL '
      + 'prime-power factor, never merely some smaller power of p. Sylow I guarantees EXISTENCE '
      + 'unconditionally, but says NOTHING about uniqueness or normality — n_p=1 is a '
      + 'BICONDITIONAL with normality, never automatic from existence alone. In S3, three '
      + 'distinct Sylow 2-subgroups exist (Sylow I holds), yet n_2=3≠1, so NONE is normal.\n\n'
      + 'Sylow III constrains n_p via TWO simultaneous conditions: n_p≡1 mod p AND n_p∣m — the '
      + 'COFACTOR m=|G|/p^n, NEVER the full |G| directly. For |G|=45=3²×5, the Sylow 3-subgroup '
      + 'has order 9, and n_3 must divide m=45/9=5, not 45.\n\n'
      + 'THE ELEMENT-COUNTING ARGUMENT is decisive when Sylow III leaves MULTIPLE candidates: '
      + 'counting non-identity elements contributed by n_p distinct Sylow p-subgroups and summing '
      + 'across primes can EXCEED |G|, a contradiction forcing at least one n_p=1 after all.',
    targetedMisconceptions: [`${SYLOW}:MC-1`, `${SYLOW}:MC-2`, `${SYLOW}:MC-3`],
    source: eb(SYLOW, 'Core Understanding — existence never implies normality, n_p divides the cofactor m never the full group order, Sylow subgroups have the full prime-power order'),
  },
]

export const MATHEMATICS_ABSTRACT_ALGEBRA_BURNSIDE_SYLOW_PROBES: SeedProbe[] = [
  // --- math.abst.burnside-lemma -----------------------------------------------------
  {
    conceptId: BURNSIDE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'If r^1 moves the coloring RRB to a DIFFERENT coloring, does RRB belong in the fixed-point set X^(r^1)?',
    choices: [
      { text: 'No — RRB is not in X^(r^1) at all, since it is not left unchanged by r^1; the fixed-point set requires g·x=x, an entirely different test from computing RRB\'s orbit', isCorrect: true },
      { text: 'Yes — RRB\'s orbit size directly gives its status in the fixed-point set', isCorrect: false, misconceptionId: `${BURNSIDE}:MC-1` },
      { text: 'Yes, since orbit membership and fixed-point membership are the same computation', isCorrect: false, misconceptionId: `${BURNSIDE}:MC-1` },
    ],
    targetedMisconceptions: [`${BURNSIDE}:MC-1`],
    source: eb(BURNSIDE, 'Assessment gate — the fixed-point set is not an orbit, testing g·x=x is a different computation'),
  },
  {
    conceptId: BURNSIDE, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Does Burnside\'s formula report how many total configurations exist, or how many are genuinely DIFFERENT once symmetric copies are identified?',
    choices: [
      { text: 'How many are genuinely different — |G\\X|, the distinct orbit count, never the raw total |X|', isCorrect: true },
      { text: 'The total raw configuration count |X|, ignoring symmetry entirely', isCorrect: false, misconceptionId: `${BURNSIDE}:MC-2` },
      { text: 'Both quantities are identical, so the distinction never matters', isCorrect: false, misconceptionId: `${BURNSIDE}:MC-2` },
    ],
    targetedMisconceptions: [`${BURNSIDE}:MC-2`],
    source: eb(BURNSIDE, 'Misconception register — Burnside\'s output is the distinct orbit count, never the raw configuration total'),
  },
  {
    conceptId: BURNSIDE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'The identity element does nothing to any configuration — should it still be included in the sum Σ|X^g|?',
    choices: [
      { text: 'Yes — |X^e|=|X| always, since the identity fixes everything; omitting it drastically undercounts the sum, often supplying the majority of the total', isCorrect: true },
      { text: 'No — the identity contributes nothing meaningful and can be safely omitted', isCorrect: false, misconceptionId: `${BURNSIDE}:MC-3` },
      { text: 'No, since only non-identity elements produce interesting fixed-point restrictions', isCorrect: false, misconceptionId: `${BURNSIDE}:MC-3` },
    ],
    targetedMisconceptions: [`${BURNSIDE}:MC-3`],
    source: eb(BURNSIDE, 'Transfer probe — the sum must include every group element, including the identity, whose contribution is |X|'),
  },

  // --- math.abst.sylow-theorems -------------------------------------------------------
  {
    conceptId: SYLOW, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Does Sylow I\'s guarantee that a Sylow p-subgroup EXISTS also guarantee it is unique, or normal?',
    choices: [
      { text: 'No — existence is unconditional, but normality is a separate, biconditional fact (n_p=1); in S3, three distinct Sylow 2-subgroups exist (n_2=3), and NONE of them is normal', isCorrect: true },
      { text: 'Yes — a Sylow p-subgroup is automatically normal simply because it is guaranteed to exist', isCorrect: false, misconceptionId: `${SYLOW}:MC-1` },
      { text: 'Yes, since Sylow subgroups form a special class that is always normal by construction', isCorrect: false, misconceptionId: `${SYLOW}:MC-1` },
    ],
    targetedMisconceptions: [`${SYLOW}:MC-1`],
    source: eb(SYLOW, 'Assessment gate — Sylow existence never implies normality, only n_p=1 does'),
  },
  {
    conceptId: SYLOW, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'For |G|=p^n·m, does n_p divide the full order |G|, or only the cofactor m?',
    choices: [
      { text: 'Only the cofactor m=|G|/p^n; for |G|=45=3²×5, n_3 must divide m=5, not the full 45', isCorrect: true },
      { text: 'n_p always divides the full order |G| directly', isCorrect: false, misconceptionId: `${SYLOW}:MC-2` },
      { text: 'n_p divides whichever of |G| or m happens to be more convenient', isCorrect: false, misconceptionId: `${SYLOW}:MC-2` },
    ],
    targetedMisconceptions: [`${SYLOW}:MC-2`],
    source: eb(SYLOW, 'Misconception register — n_p divides the cofactor m, never the full group order'),
  },
  {
    conceptId: SYLOW, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'If |G|=12=2²×3, does a subgroup of order 2 (not 4) qualify as a Sylow 2-subgroup?',
    choices: [
      { text: 'No — only a subgroup of the FULL prime-power order p^n=4 qualifies as Sylow; a subgroup of order 2 is a mere p-subgroup, not the maximal one', isCorrect: true },
      { text: 'Yes — any subgroup of prime-power order counts as a Sylow subgroup regardless of size', isCorrect: false, misconceptionId: `${SYLOW}:MC-3` },
      { text: 'Yes, since "Sylow" and "p-subgroup" are interchangeable terms', isCorrect: false, misconceptionId: `${SYLOW}:MC-3` },
    ],
    targetedMisconceptions: [`${SYLOW}:MC-3`],
    source: eb(SYLOW, 'Transfer probe — only the subgroup of the full prime-power order p^n qualifies as Sylow'),
  },
]
