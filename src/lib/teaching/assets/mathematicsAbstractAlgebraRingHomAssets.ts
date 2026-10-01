/**
 * Fifth math.abst asset batch — ring-theory and group-homomorphism.
 *
 * Continues serving-asset coverage for math.abst (8/36 -> 10/36).
 * Transcribed from the frozen Educational Brain entries at
 * educational-brain/concepts/mathematics/math.abst.ring-theory.md and
 * math.abst.group-homomorphism.md.
 *
 *   RINGTHEORY   ring-theory — a ring's + is a full abelian group, but ·
 *                is only required to be closed/associative/distributive,
 *                never invertible; distributivity spreads · over +, never
 *                · over ·; commutativity of · is optional.
 *   GROUPHOM     group-homomorphism — phi(e_G)=e_H and phi(g^-1)=phi(g)^-1
 *                are automatic consequences, not separate axioms; e_G is
 *                always in the kernel but the kernel's exact size is a
 *                separate, checkable question; homomorphisms need not be
 *                bijective.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const RINGTHEORY = 'math.abst.ring-theory'
const GROUPHOM = 'math.abst.group-homomorphism'

export const MATHEMATICS_ABSTRACT_ALGEBRA_RING_HOM_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: RINGTHEORY, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'A RING (R,+,·) satisfies five axioms: R1 — (R,+) is an ABELIAN GROUP (closure, '
      + 'associativity, identity 0, inverses -r, commutativity); R2 — · is CLOSED; R3 — · is '
      + 'ASSOCIATIVE; R4/R5 — LEFT/RIGHT DISTRIBUTIVITY over +. Multiplicative IDENTITY, '
      + 'INVERSES, and COMMUTATIVITY are all OPTIONAL EXTRAS, never definitional requirements. '
      + 'Z is the prototypical ring: 2 has NO multiplicative inverse in Z, and this does NOT '
      + 'disqualify Z from being a ring, since no ring axiom ever requires multiplicative '
      + 'inverses — that stronger requirement is what defines a FIELD.\n\n'
      + 'DISTRIBUTIVITY specifically links + and ·: multiplication distributes over ADDITION '
      + '(r·(s+t)=r·s+r·t), NEVER over multiplication itself.\n\n'
      + 'RINGS need not be COMMUTATIVE under multiplication: M2(R) (2×2 matrices) satisfies R1-R5 '
      + 'fully — the zero matrix is the additive identity, matrix multiplication is closed, '
      + 'associative, and distributes over addition — yet AB≠BA in general. Commutativity of · is '
      + 'never one of R1-R5, so its absence never disqualifies a ring.',
    targetedMisconceptions: [`${RINGTHEORY}:MC-1`, `${RINGTHEORY}:MC-2`, `${RINGTHEORY}:MC-3`],
    source: eb(RINGTHEORY, 'Core Understanding — a ring\'s + is a full group but · is only partially structured, distributivity spreads · over +, commutativity is optional'),
  },
  {
    conceptId: GROUPHOM, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'A GROUP HOMOMORPHISM φ:G→H is a map satisfying φ(ab)=φ(a)φ(b) for all a,b∈G. Two '
      + 'properties are AUTOMATIC CONSEQUENCES of this single defining property, NOT separate '
      + 'axioms: φ(e_G)=e_H (since φ(e_G)=φ(e_G·e_G)=φ(e_G)φ(e_G), canceling gives e_H=φ(e_G)); '
      + 'and φ(g^-1)=φ(g)^-1 (since φ(g)φ(g^-1)=φ(gg^-1)=φ(e_G)=e_H, so φ(g^-1) IS φ(g)\'s '
      + 'inverse, by uniqueness of inverses).\n\n'
      + 'The KERNEL ker(φ)={g∈G:φ(g)=e_H} is ALWAYS a normal subgroup; the IMAGE is always a '
      + 'subgroup of H. The kernel DETERMINES injectivity: φ is injective iff ker(φ)={e_G}. Since '
      + 'φ(e_G)=e_H always holds, e_G is ALWAYS in the kernel — but whether ANYTHING ELSE is also '
      + 'in the kernel is a genuinely SEPARATE question requiring direct computation.\n\n'
      + 'A homomorphism only preserves the group operation — it is NOT automatically bijective. '
      + 'For φ:(Z,+)→(Z/6Z,+), φ(n)=n mod 6: ker(φ)=6Z, genuinely NOT just {0}, so φ is not '
      + 'injective, yet im(φ)=Z/6Z (the entire target), so φ IS surjective despite not being '
      + 'injective.',
    targetedMisconceptions: [`${GROUPHOM}:MC-1`, `${GROUPHOM}:MC-2`, `${GROUPHOM}:MC-3`],
    source: eb(GROUPHOM, 'Core Understanding — identity/inverse preservation are automatic consequences, the kernel\'s exact size is a separate question, homomorphisms need not be bijective'),
  },
]

export const MATHEMATICS_ABSTRACT_ALGEBRA_RING_HOM_PROBES: SeedProbe[] = [
  // --- math.abst.ring-theory -----------------------------------------------------
  {
    conceptId: RINGTHEORY, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Does Z fail to be a ring because 2 has no multiplicative inverse in Z?',
    choices: [
      { text: 'No — no ring axiom (R1-R5) ever requires a multiplicative inverse; that stronger requirement is what defines a field, a separate, stronger structure', isCorrect: true },
      { text: 'Yes — every ring requires (R,·) to also be a group, with multiplicative inverses', isCorrect: false, misconceptionId: `${RINGTHEORY}:MC-1` },
      { text: 'Yes, since a ring is essentially two groups glued together', isCorrect: false, misconceptionId: `${RINGTHEORY}:MC-1` },
    ],
    targetedMisconceptions: [`${RINGTHEORY}:MC-1`],
    source: eb(RINGTHEORY, 'Assessment gate — multiplicative inverses are never a ring requirement'),
  },
  {
    conceptId: RINGTHEORY, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Does distributivity mean a·(b·c)=(a·b)·(a·c)?',
    choices: [
      { text: 'No — distributivity spreads · over +: a·(b+c)=a·b+a·c; addition sits inside the parentheses, never multiplication', isCorrect: true },
      { text: 'Yes — that is exactly the correct form of the distributive law', isCorrect: false, misconceptionId: `${RINGTHEORY}:MC-2` },
      { text: 'Yes, since distributivity applies equally to both operations symmetrically', isCorrect: false, misconceptionId: `${RINGTHEORY}:MC-2` },
    ],
    targetedMisconceptions: [`${RINGTHEORY}:MC-2`],
    source: eb(RINGTHEORY, 'Misconception register — distributivity spreads multiplication over addition, never over multiplication'),
  },
  {
    conceptId: RINGTHEORY, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Must every ring satisfy r·s=s·r for all elements?',
    choices: [
      { text: 'No — M2(R) (2×2 matrices) satisfies all five ring axioms despite AB≠BA in general; commutativity of · is never one of R1-R5', isCorrect: true },
      { text: 'Yes — commutativity of multiplication is required by the ring axioms', isCorrect: false, misconceptionId: `${RINGTHEORY}:MC-3` },
      { text: 'Yes, since all familiar rings like Z and R are commutative', isCorrect: false, misconceptionId: `${RINGTHEORY}:MC-3` },
    ],
    targetedMisconceptions: [`${RINGTHEORY}:MC-3`],
    source: eb(RINGTHEORY, 'Transfer probe — commutativity of multiplication is optional, never required, e.g. M2(R)'),
  },

  // --- math.abst.group-homomorphism -----------------------------------------------
  {
    conceptId: GROUPHOM, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Since φ(e_G)=e_H always holds, is {e_G} therefore the WHOLE kernel?',
    choices: [
      { text: 'No — e_G being in the kernel is guaranteed, but whether anything else also maps to e_H is a genuinely separate question requiring direct computation', isCorrect: true },
      { text: 'Yes — the kernel is always exactly {e_G} for any homomorphism', isCorrect: false, misconceptionId: `${GROUPHOM}:MC-1` },
      { text: 'Yes, since no other element could also map to the identity', isCorrect: false, misconceptionId: `${GROUPHOM}:MC-1` },
    ],
    targetedMisconceptions: [`${GROUPHOM}:MC-1`],
    source: eb(GROUPHOM, 'Assessment gate — the kernel\'s exact size beyond e_G is a separate, checkable question'),
  },
  {
    conceptId: GROUPHOM, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Does φ(g^-1)=φ(g)^-1 need to be verified separately for every homomorphism, or does it follow automatically?',
    choices: [
      { text: 'It follows automatically from the single defining property φ(ab)=φ(a)φ(b) alone, via φ(g)φ(g^-1)=φ(e_G)=e_H and uniqueness of inverses — never a separate axiom to re-check', isCorrect: true },
      { text: 'It must be independently verified as a separate condition for each new homomorphism', isCorrect: false, misconceptionId: `${GROUPHOM}:MC-2` },
      { text: 'It only holds for some homomorphisms and must be checked case by case', isCorrect: false, misconceptionId: `${GROUPHOM}:MC-2` },
    ],
    targetedMisconceptions: [`${GROUPHOM}:MC-2`],
    source: eb(GROUPHOM, 'Misconception register — identity and inverse preservation are automatic consequences, never separate axioms'),
  },
  {
    conceptId: GROUPHOM, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Is every group homomorphism automatically bijective?',
    choices: [
      { text: 'No — for φ:(Z,+)→(Z/6Z,+), φ(n)=n mod 6: ker(φ)=6Z (not trivial, so not injective) yet im(φ)=Z/6Z (surjective) — injectivity and surjectivity are separate, checkable properties', isCorrect: true },
      { text: 'Yes — a homomorphism is always both injective and surjective', isCorrect: false, misconceptionId: `${GROUPHOM}:MC-3` },
      { text: 'Yes, since "map" implies a one-to-one correspondence', isCorrect: false, misconceptionId: `${GROUPHOM}:MC-3` },
    ],
    targetedMisconceptions: [`${GROUPHOM}:MC-3`],
    source: eb(GROUPHOM, 'Transfer probe — a homomorphism preserves the operation only, bijectivity is a separate property'),
  },
]
