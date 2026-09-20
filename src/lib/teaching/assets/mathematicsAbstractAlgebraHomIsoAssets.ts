/**
 * Twelfth math.abst asset batch — ring-homomorphism and
 * second-isomorphism-theorem.
 *
 * Continues serving-asset coverage for math.abst (22/36 -> 24/36).
 * Transcribed from the frozen Educational Brain entries at
 * educational-brain/concepts/mathematics/math.abst.ring-homomorphism.md and
 * math.abst.second-isomorphism-theorem.md.
 *
 *   RINGHOM   ring-homomorphism — two conditions (additive AND
 *             multiplicative) are both required, never just one; the
 *             kernel is a two-sided ideal, strictly stronger than a
 *             subring; identity-preservation is convention-dependent, not
 *             forced by the multiplicative condition alone.
 *   SECONDISO second-isomorphism-theorem — N must be normal in G for HN to
 *             even be a subgroup; the diamond has two specific, distinct
 *             quotient sides; the SIT is a direct consequence of the FIT,
 *             not a separate proof.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const RINGHOM = 'math.abst.ring-homomorphism'
const SECONDISO = 'math.abst.second-isomorphism-theorem'

export const MATHEMATICS_ABSTRACT_ALGEBRA_HOM_ISO_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: RINGHOM, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'A RING HOMOMORPHISM φ:R→S must satisfy TWO conditions simultaneously — additive '
      + '(φ(a+b)=φ(a)+φ(b)) AND multiplicative (φ(ab)=φ(a)φ(b)) — unlike a bare group '
      + 'homomorphism, which has only ONE operation to preserve. A map satisfying the additive '
      + 'condition alone is merely a group homomorphism of the additive structures; it is NOT '
      + 'automatically a ring homomorphism unless the multiplicative condition is checked '
      + 'separately.\n\n'
      + 'The KERNEL is MORE than a subring — it is a TWO-SIDED IDEAL: for any r∈ker(φ) and ANY '
      + 'a∈R (not merely a∈ker(φ)), φ(ar)=φ(a)φ(r)=φ(a)·0=0, so ar∈ker(φ) — absorption from the '
      + 'WHOLE ring, strictly stronger than mere subring closure.\n\n'
      + 'The FIRST ISOMORPHISM THEOREM gives R/ker(φ)≅im(φ). Whether φ(1_R)=1_S is REQUIRED '
      + 'depends on the convention for "ring": the condition φ(ab)=φ(a)φ(b) ALONE never forces '
      + 'φ(1_R)=1_S — the zero map satisfies the multiplicative condition (0=0·0) but has '
      + 'φ(1_R)=0≠1_S.',
    targetedMisconceptions: [`${RINGHOM}:MC-1`, `${RINGHOM}:MC-2`, `${RINGHOM}:MC-3`],
    source: eb(RINGHOM, 'Core Understanding — two conditions both required, the kernel is a two-sided ideal not merely a subring, identity-preservation is convention-dependent'),
  },
  {
    conceptId: SECONDISO, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'The SECOND ISOMORPHISM THEOREM: for H≤G and N⊴G (N must be NORMAL in G, not merely a '
      + 'subgroup): HN is a subgroup of G, H∩N is normal in H, and H/(H∩N)≅HN/N. WHY N must be '
      + 'normal: verifying HN is closed requires h2^-1n1h2∈N for ALL h2∈H, which holds EXACTLY '
      + 'when N is normal. Without normality, HN may not even be a subgroup: in S3 with '
      + 'H={e,(1 2)}, N={e,(1 3)} (neither normal), HN has 4 elements, which does not divide '
      + '|S3|=6 — by Lagrange, HN cannot be a subgroup.\n\n'
      + 'The diamond has TWO SPECIFIC, DISTINCT quotient sides: the left-side quotient '
      + 'H/(H∩N) is identified with the right-side (ambient) quotient HN/N — never confused or '
      + 'interchanged.\n\n'
      + 'THE SIT IS A DIRECT CONSEQUENCE OF THE FIT, never a separate proof from scratch: '
      + 'defining φ|_H:H→HN/N by φ|_H(h)=hN is a homomorphism whose kernel is exactly H∩N and '
      + 'whose image is HN/N; applying the FIT directly gives H/(H∩N)≅HN/N — the SIT falls out '
      + 'of already-established machinery.',
    targetedMisconceptions: [`${SECONDISO}:MC-1`, `${SECONDISO}:MC-2`, `${SECONDISO}:MC-3`],
    source: eb(SECONDISO, 'Core Understanding — N must be normal for HN to be a subgroup, the diamond has two distinct quotient sides, the SIT is a direct consequence of the FIT'),
  },
]

export const MATHEMATICS_ABSTRACT_ALGEBRA_HOM_ISO_PROBES: SeedProbe[] = [
  // --- math.abst.ring-homomorphism ---------------------------------------------
  {
    conceptId: RINGHOM, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Does verifying the additive condition φ(a+b)=φ(a)+φ(b) alone confirm φ is a ring homomorphism?',
    choices: [
      { text: 'No — the multiplicative condition φ(ab)=φ(a)φ(b) must ALSO be checked separately; a map can satisfy one and fail the other, as with ψ\'(n)=diag(n,2n) on Z', isCorrect: true },
      { text: 'Yes — the additive condition alone is sufficient to confirm a ring homomorphism', isCorrect: false, misconceptionId: `${RINGHOM}:MC-1` },
      { text: 'Yes, since the multiplicative condition is automatically implied once addition is preserved', isCorrect: false, misconceptionId: `${RINGHOM}:MC-1` },
    ],
    targetedMisconceptions: [`${RINGHOM}:MC-1`],
    source: eb(RINGHOM, 'Assessment gate — both the additive and multiplicative conditions must be checked, never just one'),
  },
  {
    conceptId: RINGHOM, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Is the kernel of a ring homomorphism just a subring, or something stronger?',
    choices: [
      { text: 'Something stronger — a two-sided IDEAL, absorbing multiplication from the WHOLE ring R (not just from within the kernel itself), strictly stronger than mere subring closure', isCorrect: true },
      { text: 'Just a subring, with no additional absorption property', isCorrect: false, misconceptionId: `${RINGHOM}:MC-2` },
      { text: 'A subring only when R is commutative', isCorrect: false, misconceptionId: `${RINGHOM}:MC-2` },
    ],
    targetedMisconceptions: [`${RINGHOM}:MC-2`],
    source: eb(RINGHOM, 'Misconception register — the kernel is a two-sided ideal, strictly stronger than a mere subring'),
  },
  {
    conceptId: RINGHOM, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Must every ring homomorphism satisfy φ(1_R)=1_S?',
    choices: [
      { text: 'It depends on the convention: the multiplicative condition alone never forces it — the zero map satisfies φ(ab)=φ(a)φ(b) (0=0·0) yet has φ(1_R)=0≠1_S', isCorrect: true },
      { text: 'Yes — every ring homomorphism, under every convention, must preserve the multiplicative identity', isCorrect: false, misconceptionId: `${RINGHOM}:MC-3` },
      { text: 'No — no ring homomorphism can ever preserve the multiplicative identity', isCorrect: false, misconceptionId: `${RINGHOM}:MC-3` },
    ],
    targetedMisconceptions: [`${RINGHOM}:MC-3`],
    source: eb(RINGHOM, 'Transfer probe — identity-preservation is convention-dependent, never forced by the multiplicative condition alone'),
  },

  // --- math.abst.second-isomorphism-theorem ----------------------------------------
  {
    conceptId: SECONDISO, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Suppose H≤G and N≤G but N is not normal in G. Is HN necessarily a subgroup of G?',
    choices: [
      { text: 'No — in S3 with H={e,(1 2)}, N={e,(1 3)} (neither normal), HN has 4 elements, which does not divide |S3|=6, so by Lagrange\'s theorem HN cannot even be a subgroup', isCorrect: true },
      { text: 'Yes — HN is always a subgroup of G regardless of whether N is normal', isCorrect: false, misconceptionId: `${SECONDISO}:MC-1` },
      { text: 'Yes, as long as both H and N are individually subgroups of G', isCorrect: false, misconceptionId: `${SECONDISO}:MC-1` },
    ],
    targetedMisconceptions: [`${SECONDISO}:MC-1`],
    source: eb(SECONDISO, 'Assessment gate — N must be normal in G for HN to even be a subgroup'),
  },
  {
    conceptId: SECONDISO, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Which quotient sits on the left side of the diamond, and which on the right?',
    choices: [
      { text: 'H/(H∩N) is the left-side quotient, isomorphic to HN/N, the right-side (ambient) quotient — the diamond has HN at top and H∩N at bottom, connecting these two specific, distinct sides', isCorrect: true },
      { text: 'N/(H∩N) is the left-side quotient, isomorphic to some quotient of H alone', isCorrect: false, misconceptionId: `${SECONDISO}:MC-2` },
      { text: 'The two sides can be swapped freely since the theorem is symmetric in H and N', isCorrect: false, misconceptionId: `${SECONDISO}:MC-2` },
    ],
    targetedMisconceptions: [`${SECONDISO}:MC-2`],
    source: eb(SECONDISO, 'Misconception register — the diamond has two specific, distinct quotient sides, H/(H∩N) and HN/N'),
  },
  {
    conceptId: SECONDISO, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Is the Second Isomorphism Theorem a brand-new proof technique, separate from the First Isomorphism Theorem?',
    choices: [
      { text: 'No — it is a direct consequence of the FIT applied to the restriction map φ|_H(h)=hN, whose kernel is H∩N and whose image is HN/N; the SIT falls out automatically', isCorrect: true },
      { text: 'Yes — the SIT requires an entirely independent proof method unrelated to the FIT', isCorrect: false, misconceptionId: `${SECONDISO}:MC-3` },
      { text: 'Yes, since no explicit homomorphism is involved in deriving the SIT', isCorrect: false, misconceptionId: `${SECONDISO}:MC-3` },
    ],
    targetedMisconceptions: [`${SECONDISO}:MC-3`],
    source: eb(SECONDISO, 'Transfer probe — the SIT is a direct consequence of the FIT, not a separate proof'),
  },
]
