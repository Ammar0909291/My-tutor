/**
 * Thirteenth batch — the machinery of proof.
 *
 * One cluster, and the tightest in this corpus: what a proof IS, the four
 * shapes it comes in, the steps each shape is built from, and the fact
 * that licenses one of the shapes.
 *
 *   WHAT       proof. A finite chain from things already established —
 *              which is why an example is not one and why the conclusion
 *              may never be used as a step.
 *   SHAPES     direct-proof, proof-by-contrapositive,
 *              proof-by-contradiction, existence-proof. Four routes, none
 *              of them ranked. The register is unanimous that learners
 *              hierarchise these ("direct first", "contradiction is the
 *              powerful one") and none of that is true.
 *   STEPS      rules-of-inference. Modus ponens runs one way. Affirming
 *              the consequent and denying the antecedent are the two
 *              failures, and both come from running it backwards.
 *   LICENCE    logical-equivalence. The reason a contrapositive proof is
 *              a proof at all — and why one matching row proves nothing.
 *   INFINITE   proof-by-induction. The base case is not a formality, and
 *              assuming the hypothesis is not circular.
 *
 * All eight carried a full Educational Brain entry and served the learner
 * nothing. Each now has one explanation and three closed-choice probes.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const PROOF = 'math.found.proof'
const DIR = 'math.found.direct-proof'
const CONTRA = 'math.found.proof-by-contradiction'
const CONTRAP = 'math.found.proof-by-contrapositive'
const IND = 'math.found.proof-by-induction'
const EXIST = 'math.found.existence-proof'
const INFER = 'math.found.rules-of-inference'
const LEQ = 'math.found.logical-equivalence'

export const MATHEMATICS_PROOF_MACHINERY_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: PROOF, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'A proof is a finite chain of justified steps running from things already established '
      + '— axioms, definitions, earlier theorems — to the claim. Every link has to be one '
      + 'somebody else could check, which is what makes a proof persuade a stranger rather '
      + 'than only its author.\n\n'
      + 'Examples do not do this. Checking a claim for n = 1, 2, 3 and 4 supports it and '
      + 'settles nothing, because a claim about all n has infinitely many cases and four of '
      + 'them have been seen. The single exception is a claim about finitely many things, '
      + 'where checking every one really is a proof — and "every" is doing the work there, '
      + 'not "several".\n\n'
      + 'The other way a chain fails is by looping. Using the conclusion, or anything that '
      + 'quietly assumes it, as one of the steps proves nothing however valid each line '
      + 'looks. And algebra is not self-justifying: "3n + 3 = 3(n + 1), which is divisible by '
      + '3" is a proof because the second clause says WHY the first clause settled anything. '
      + 'Manipulation without that clause is calculation, not argument.',
    targetedMisconceptions: [`${PROOF}:MC-1`, `${PROOF}:MC-2`],
    source: eb(PROOF, 'Identity + Misconception register — examples are not proof; the chain may not loop'),
  },
  {
    conceptId: DIR, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'A direct proof of "if P then Q" assumes P and derives Q. To show that the sum of two '
      + 'even numbers is even: let them be 2a and 2b, add to get 2(a + b), and that is even '
      + 'by the definition of even. Assume, unfold, conclude.\n\n'
      + '"Direct" does not mean assumption-free. P is assumed — that is the first line, and '
      + 'it is the whole hypothesis. What direct means is that the NEGATION of the '
      + 'conclusion is never assumed, which is the one thing separating it from '
      + 'contradiction and contrapositive.\n\n'
      + 'The step that gets skipped is the definitional one. Writing an even number as 2a is '
      + 'not notation-shuffling, it is the definition of even being cashed in — and without '
      + 'it the algebra has nothing to stand on. Nor is direct proof the compulsory first '
      + 'attempt: some claims resist it and yield immediately to the contrapositive, so '
      + 'choosing a shape is part of the work rather than a fallback after direct has '
      + 'failed.',
    targetedMisconceptions: [`${DIR}:MC-1`, `${DIR}:MC-2`],
    source: eb(DIR, 'Identity + Misconception register — P is assumed; definitions must be cashed in'),
  },
  {
    conceptId: CONTRAP, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'To prove "if P then Q", you may instead prove "if not Q then not P". These two say '
      + 'exactly the same thing, so proving either one proves the other outright.\n\n'
      + 'Only the contrapositive has that property, and the neighbours it gets confused with '
      + 'do not. From "if it is raining then the ground is wet": the contrapositive is "if '
      + 'the ground is not wet then it is not raining", which is true. The converse is "if '
      + 'the ground is wet then it is raining" — false, someone may have used a hose. The '
      + 'inverse is "if it is not raining then the ground is not wet" — false for the same '
      + 'reason. Swapping in a converse is not a variant proof; it proves a different and '
      + 'possibly false claim.\n\n'
      + 'A contrapositive proof is a full proof, not a weaker one, and it is often the '
      + 'shorter road: proving "if n² is even then n is even" directly is awkward, while the '
      + 'contrapositive — "if n is odd then n² is odd" — is two lines, because odd numbers '
      + 'have a form you can substitute and "n² is even" does not.',
    targetedMisconceptions: [`${CONTRAP}:MC-1`, `${CONTRAP}:MC-2`],
    source: eb(CONTRAP, 'Identity + Misconception register — contrapositive versus converse and inverse'),
  },
  {
    conceptId: CONTRA, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'Proof by contradiction assumes the claim is FALSE and derives an impossibility. Since '
      + 'the reasoning was valid, the only suspect is the assumption, so the claim must be '
      + 'true. The classic is √2: suppose it equals p/q in lowest terms, and it follows that '
      + 'p and q are both even — which contradicts "lowest terms".\n\n'
      + 'A contradiction has to be a genuine impossibility, not a surprise. Deriving '
      + 'something odd, unlikely, or unattractive establishes nothing; what is needed is a '
      + 'statement of the form "R and not R" — a number both even and odd, a set both empty '
      + 'and non-empty. That is the entire standard.\n\n'
      + 'The other trap is negating carelessly. The negation of "for all x, P(x)" is "there '
      + 'exists x with not P(x)" — NOT "for all x, not P(x)". Negating a convenient piece of '
      + 'the claim instead of the whole claim means you spend the proof contradicting a '
      + 'statement nobody made. And contradiction is not the strongest technique to reach '
      + 'for first; it is the one that suits claims of non-existence and irrationality, where '
      + 'there is no object to build and so nothing for a direct proof to grip.',
    targetedMisconceptions: [`${CONTRA}:MC-1`, `${CONTRA}:MC-2`],
    source: eb(CONTRA, 'Identity + Misconception register — R and not-R; negate the whole claim'),
  },
  {
    conceptId: EXIST, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'An existence proof shows that at least one object with some property exists. The '
      + 'obvious way is to produce one — to show an even prime exists, offer 2 and stop. '
      + 'That is a constructive proof, and it hands you the object as well as the fact.\n\n'
      + 'It is not the only way. You can prove something exists without being able to name '
      + 'it: among the infinitely many real numbers, only countably many are algebraic, so '
      + 'transcendental numbers must exist — and that argument identifies none of them. A '
      + 'non-constructive proof is a complete proof; it simply answers "is there one?" and '
      + 'declines to answer "which?".\n\n'
      + 'And existence says nothing about uniqueness. "There is a solution" and "there is '
      + 'exactly one solution" are separate claims needing separate arguments, and x² = 4 '
      + 'shows why: a solution exists, and so does a second one. Uniqueness is normally '
      + 'proved by supposing two such objects and showing they must be equal — a different '
      + 'piece of work that an existence proof has not done.',
    targetedMisconceptions: [`${EXIST}:MC-1`, `${EXIST}:MC-2`],
    source: eb(EXIST, 'Identity + Misconception register — non-constructive proofs count; existence is not uniqueness'),
  },
  {
    conceptId: INFER, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'Rules of inference are the argument patterns that are valid by their shape alone, so '
      + 'they can be applied without thinking about what the letters stand for. Modus ponens: '
      + 'from "if P then Q" and P, conclude Q. Modus tollens: from "if P then Q" and not Q, '
      + 'conclude not P.\n\n'
      + 'A conditional runs one way, and both classic failures come from running it '
      + 'backwards. Affirming the consequent takes "if P then Q" and Q and concludes P: if it '
      + 'is raining the ground is wet, the ground IS wet, therefore it is raining — and it '
      + 'may have been a hose. Denying the antecedent takes "if P then Q" and not P and '
      + 'concludes not Q: it is not raining, therefore the ground is not wet — same hose.\n\n'
      + 'Both feel reasonable because they are the two legitimate rules with the halves '
      + 'swapped, and that is exactly why the shape has to be checked rather than the '
      + 'plausibility. "If P then Q" licenses travel from P to Q and from not-Q back to '
      + 'not-P, and nothing else. Everyday reasoning tolerates the reverse trip because '
      + 'context usually rescues it; a proof has no context to be rescued by.',
    targetedMisconceptions: [`${INFER}:MC-1`, `${INFER}:MC-2`],
    source: eb(INFER, 'Identity + Misconception register — the two reversal fallacies'),
  },
  {
    conceptId: LEQ, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'Two compound statements are logically equivalent when they agree on EVERY assignment '
      + 'of truth values to their parts — every row of the truth table, without exception. '
      + 'Agreement on some rows is not partial equivalence; it is no equivalence, in the same '
      + 'way that a counterexample in one case sinks a universal claim.\n\n'
      + 'So a single matching instance proves nothing. "P and Q" agrees with "P or Q" when '
      + 'both are true, and they are not equivalent — the row where P is true and Q is false '
      + 'separates them, and finding one such row is all it takes.\n\n'
      + 'This is what licenses the contrapositive: "if P then Q" and "if not Q then not P" '
      + 'match on all four rows, so swapping one for the other cannot change what has been '
      + 'proved. The standard equivalences — De Morgan\'s laws, the contrapositive, '
      + 'distribution — are worth verifying once by table rather than memorising as a list, '
      + 'because a remembered equivalence gives you no way to check a new one, and building '
      + 'the table does.',
    targetedMisconceptions: [`${LEQ}:MC-1`, `${LEQ}:MC-2`],
    source: eb(LEQ, 'Identity + Misconception register — every row, and the contrapositive licence'),
  },
  {
    conceptId: IND, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'Mathematical induction proves a claim for every natural number using two steps: show '
      + 'it holds at the start, then show that whenever it holds at n it must hold at n + 1. '
      + 'Together those knock down an infinite row of dominoes — the second step arranges '
      + 'them, the first pushes.\n\n'
      + 'Assuming the claim at n is not circular, and this is the objection worth answering '
      + 'carefully. You are not assuming what you set out to prove; you are proving a '
      + 'CONDITIONAL — "if it holds at n, then it holds at n + 1" — which is a weaker and '
      + 'quite different statement, and it can be established without knowing whether the '
      + 'claim holds at n at all.\n\n'
      + 'The base case is not a formality either. "n² > n for all naturals" has a working '
      + 'inductive step and fails at n = 1, so the dominoes are arranged and nothing pushes '
      + 'them. And the inductive step must actually USE the hypothesis: if the argument for '
      + 'n + 1 never invokes the case n, then it proved n + 1 outright and the induction was '
      + 'never doing any work — which usually means something has gone wrong.',
    targetedMisconceptions: [`${IND}:MC-1`, `${IND}:MC-2`],
    source: eb(IND, 'Identity + Misconception register — the conditional is not circular; the base case bites'),
  },
]

export const MATHEMATICS_PROOF_MACHINERY_PROBES: SeedProbe[] = [
  // --- math.found.proof --------------------------------------------------------
  {
    conceptId: PROOF, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'You check a claim about all natural numbers for n = 1, 2, 3 and 4. Have you proved it?',
    choices: [
      { text: 'No — the claim has infinitely many cases and four have been seen', isCorrect: true },
      { text: 'Yes — four cases with no failure is convincing', isCorrect: false, misconceptionId: `${PROOF}:MC-1` },
      { text: 'Yes, provided the four were chosen to be representative', isCorrect: false, misconceptionId: `${PROOF}:MC-1` },
    ],
    targetedMisconceptions: [`${PROOF}:MC-1`],
    source: eb(PROOF, 'Assessment gate — examples are not proof'),
  },
  {
    conceptId: PROOF, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'A proof uses the statement it is trying to establish as one of its steps. Every line is valid. Is it a proof?',
    choices: [
      { text: 'No — the chain loops, so nothing was established however valid each line looks', isCorrect: true },
      { text: 'Yes — if every individual step is valid the argument is valid', isCorrect: false, misconceptionId: `${PROOF}:MC-2` },
      { text: 'Yes, provided the conclusion is in fact true', isCorrect: false, misconceptionId: `${PROOF}:MC-2` },
    ],
    targetedMisconceptions: [`${PROOF}:MC-2`],
    source: eb(PROOF, 'Misconception register — circular reasoning'),
  },
  {
    conceptId: PROOF, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Which of these is an argument rather than a calculation?',
    choices: [
      { text: '"3n + 3 = 3(n + 1), which is divisible by 3" — the second clause says why the first settled anything', isCorrect: true },
      { text: '"3n + 3 = 3(n + 1)" on its own', isCorrect: false, misconceptionId: `${PROOF}:MC-3` },
      { text: 'A correct rearrangement of the expression through six lines', isCorrect: false, misconceptionId: `${PROOF}:MC-3` },
    ],
    targetedMisconceptions: [`${PROOF}:MC-3`],
    source: eb(PROOF, 'Transfer probe — algebra is not self-justifying'),
  },

  // --- math.found.direct-proof --------------------------------------------------
  {
    conceptId: DIR, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'To prove directly that the sum of two even numbers is even, what is the first move?',
    choices: [
      { text: 'Write them as 2a and 2b — cashing in the definition of even', isCorrect: true },
      { text: 'Assume the sum is odd and look for a contradiction', isCorrect: false },
      { text: 'Try several pairs of even numbers and observe the pattern', isCorrect: false },
    ],
    targetedMisconceptions: [`${DIR}:MC-2`],
    source: eb(DIR, 'Assessment gate — unfold the definition'),
  },
  {
    conceptId: DIR, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Does "direct proof" mean the proof makes no assumptions?',
    choices: [
      { text: 'No — P is assumed; what is never assumed is the negation of the conclusion', isCorrect: true },
      { text: 'Yes — a direct proof starts from nothing at all', isCorrect: false, misconceptionId: `${DIR}:MC-1` },
      { text: 'Yes — assuming anything makes it an indirect proof', isCorrect: false, misconceptionId: `${DIR}:MC-1` },
    ],
    targetedMisconceptions: [`${DIR}:MC-1`],
    source: eb(DIR, 'Misconception register — the hypothesis is assumed'),
  },
  {
    conceptId: DIR, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Should every claim be attempted directly before any other technique?',
    choices: [
      { text: 'No — choosing the shape is part of the work; some claims yield at once to the contrapositive', isCorrect: true },
      { text: 'Yes — the other techniques are fallbacks after direct proof fails', isCorrect: false, misconceptionId: `${DIR}:MC-3` },
      { text: 'Yes — a direct proof is stronger evidence than an indirect one', isCorrect: false, misconceptionId: `${DIR}:MC-3` },
    ],
    targetedMisconceptions: [`${DIR}:MC-3`],
    source: eb(DIR, 'Transfer probe — the techniques are not ranked'),
  },

  // --- math.found.proof-by-contrapositive ----------------------------------------
  {
    conceptId: CONTRAP, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'What is the contrapositive of "if it is raining then the ground is wet"?',
    choices: [
      { text: 'If the ground is not wet then it is not raining', isCorrect: true },
      { text: 'If the ground is wet then it is raining', isCorrect: false, misconceptionId: `${CONTRAP}:MC-1` },
      { text: 'If it is not raining then the ground is not wet', isCorrect: false, misconceptionId: `${CONTRAP}:MC-1` },
    ],
    targetedMisconceptions: [`${CONTRAP}:MC-1`],
    source: eb(CONTRAP, 'Assessment gate — contrapositive, not converse or inverse'),
  },
  {
    conceptId: CONTRAP, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'You prove the converse instead of the contrapositive. What have you established?',
    choices: [
      { text: 'A different claim — the converse can be false when the original is true, as the hose shows', isCorrect: true },
      { text: 'The same claim, reached by another route', isCorrect: false, misconceptionId: `${CONTRAP}:MC-1` },
      { text: 'A weaker version of the same claim', isCorrect: false, misconceptionId: `${CONTRAP}:MC-1` },
    ],
    targetedMisconceptions: [`${CONTRAP}:MC-1`],
    source: eb(CONTRAP, 'Misconception register — the converse is not a variant proof'),
  },
  {
    conceptId: CONTRAP, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Why prove "if n is odd then n² is odd" instead of "if n² is even then n is even"?',
    choices: [
      { text: 'They are contrapositives, so either proves the other — and odd numbers have a form you can substitute', isCorrect: true },
      { text: 'Because the contrapositive version is a weaker claim and so easier', isCorrect: false, misconceptionId: `${CONTRAP}:MC-2` },
      { text: 'Because a direct proof is unavailable, making this the only option', isCorrect: false, misconceptionId: `${CONTRAP}:MC-2` },
    ],
    targetedMisconceptions: [`${CONTRAP}:MC-2`],
    source: eb(CONTRAP, 'Transfer probe — a full proof, and often the shorter road'),
  },

  // --- math.found.proof-by-contradiction ------------------------------------------
  {
    conceptId: CONTRA, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'A proof by contradiction begins by assuming what?',
    choices: [
      { text: 'That the claim is false', isCorrect: true },
      { text: 'That the claim is true', isCorrect: false },
      { text: 'Nothing — it derives the claim from the axioms directly', isCorrect: false },
    ],
    targetedMisconceptions: [`${CONTRA}:MC-2`],
    source: eb(CONTRA, 'Assessment gate — assume the negation'),
  },
  {
    conceptId: CONTRA, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Your assumption leads to a result that is surprising and seems very unlikely. Is that a contradiction?',
    choices: [
      { text: 'No — you need "R and not R", such as a number both even and odd; surprise is not impossibility', isCorrect: true },
      { text: 'Yes — an implausible consequence refutes the assumption', isCorrect: false, misconceptionId: `${CONTRA}:MC-1` },
      { text: 'Yes, provided the result is clearly absurd', isCorrect: false, misconceptionId: `${CONTRA}:MC-1` },
    ],
    targetedMisconceptions: [`${CONTRA}:MC-1`],
    source: eb(CONTRA, 'Misconception register — the standard is R and not-R'),
  },
  {
    conceptId: CONTRA, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'What is the negation of "for all x, P(x)"?',
    choices: [
      { text: 'There exists an x with not P(x)', isCorrect: true },
      { text: 'For all x, not P(x)', isCorrect: false, misconceptionId: `${CONTRA}:MC-2` },
      { text: 'There exists an x with P(x)', isCorrect: false, misconceptionId: `${CONTRA}:MC-2` },
    ],
    targetedMisconceptions: [`${CONTRA}:MC-2`],
    source: eb(CONTRA, 'Transfer probe — negate the whole claim, not a convenient piece'),
  },

  // --- math.found.existence-proof --------------------------------------------------
  {
    conceptId: EXIST, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'How do you prove that an even prime exists?',
    choices: [
      { text: 'Offer 2 and stop — exhibiting one object settles an existence claim', isCorrect: true },
      { text: 'Show that every prime except 2 is odd', isCorrect: false },
      { text: 'Check the first hundred primes', isCorrect: false },
    ],
    targetedMisconceptions: [`${EXIST}:MC-1`],
    source: eb(EXIST, 'Assessment gate — a constructive existence proof'),
  },
  {
    conceptId: EXIST, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'A counting argument shows transcendental numbers exist but names none. Is that a proof of existence?',
    choices: [
      { text: 'Yes — a non-constructive proof is complete; it answers "is there one?" and declines "which?"', isCorrect: true },
      { text: 'No — an existence proof must exhibit a specific object', isCorrect: false, misconceptionId: `${EXIST}:MC-1` },
      { text: 'No — it only shows existence is likely', isCorrect: false, misconceptionId: `${EXIST}:MC-1` },
    ],
    targetedMisconceptions: [`${EXIST}:MC-1`],
    source: eb(EXIST, 'Misconception register — non-constructive proofs count'),
  },
  {
    conceptId: EXIST, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'You have proved a solution exists. What have you NOT proved?',
    choices: [
      { text: 'That it is the only one — x² = 4 has a solution and also a second one', isCorrect: true },
      { text: 'Nothing further; existence includes uniqueness', isCorrect: false, misconceptionId: `${EXIST}:MC-2` },
      { text: 'Only its exact value, which follows automatically', isCorrect: false, misconceptionId: `${EXIST}:MC-2` },
    ],
    targetedMisconceptions: [`${EXIST}:MC-2`],
    source: eb(EXIST, 'Transfer probe — existence is not uniqueness'),
  },

  // --- math.found.rules-of-inference ------------------------------------------------
  {
    conceptId: INFER, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'From "if P then Q" and P, what follows?',
    choices: [
      { text: 'Q — this is modus ponens', isCorrect: true },
      { text: 'Not Q', isCorrect: false },
      { text: 'Nothing without knowing whether Q holds', isCorrect: false },
    ],
    targetedMisconceptions: [`${INFER}:MC-1`],
    source: eb(INFER, 'Assessment gate — modus ponens'),
  },
  {
    conceptId: INFER, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: '"If it is raining the ground is wet. The ground IS wet. So it is raining." What is wrong?',
    choices: [
      { text: 'Affirming the consequent — the conditional runs P to Q, and a hose also wets the ground', isCorrect: true },
      { text: 'Nothing — this is modus ponens', isCorrect: false, misconceptionId: `${INFER}:MC-1` },
      { text: 'The premises are false, though the reasoning is valid', isCorrect: false, misconceptionId: `${INFER}:MC-1` },
    ],
    targetedMisconceptions: [`${INFER}:MC-1`],
    source: eb(INFER, 'Misconception register — affirming the consequent'),
  },
  {
    conceptId: INFER, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'From "if P then Q" and NOT P, what follows?',
    choices: [
      { text: 'Nothing about Q — concluding not-Q is denying the antecedent', isCorrect: true },
      { text: 'Not Q — this is modus tollens', isCorrect: false, misconceptionId: `${INFER}:MC-2` },
      { text: 'Q, since the conditional no longer applies', isCorrect: false, misconceptionId: `${INFER}:MC-2` },
    ],
    targetedMisconceptions: [`${INFER}:MC-2`, `${INFER}:MC-3`],
    source: eb(INFER, 'Transfer probe — denying the antecedent, and modus tollens needs not-Q'),
  },

  // --- math.found.logical-equivalence -------------------------------------------------
  {
    conceptId: LEQ, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'When are two compound statements logically equivalent?',
    choices: [
      { text: 'When they agree on every row of the truth table', isCorrect: true },
      { text: 'When they agree on most rows', isCorrect: false, misconceptionId: `${LEQ}:MC-1` },
      { text: 'When they agree in at least one case', isCorrect: false, misconceptionId: `${LEQ}:MC-2` },
    ],
    targetedMisconceptions: [`${LEQ}:MC-1`, `${LEQ}:MC-2`],
    source: eb(LEQ, 'Assessment gate — every row, without exception'),
  },
  {
    conceptId: LEQ, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: '"P and Q" and "P or Q" are both true when P and Q are both true. Are they equivalent?',
    choices: [
      { text: 'No — the row where P is true and Q is false separates them, and one such row is enough', isCorrect: true },
      { text: 'Yes — they match where it matters', isCorrect: false, misconceptionId: `${LEQ}:MC-2` },
      { text: 'Partly — they are equivalent on some assignments', isCorrect: false, misconceptionId: `${LEQ}:MC-1` },
    ],
    targetedMisconceptions: [`${LEQ}:MC-1`, `${LEQ}:MC-2`],
    source: eb(LEQ, 'Misconception register — a single matching instance proves nothing'),
  },
  {
    conceptId: LEQ, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Why is it better to verify De Morgan\'s laws by truth table once than to memorise them?',
    choices: [
      { text: 'A remembered equivalence gives you no way to check a new one; building the table does', isCorrect: true },
      { text: 'Memorising is unreliable, but the table is only a memory aid', isCorrect: false, misconceptionId: `${LEQ}:MC-3` },
      { text: 'There is no difference — the standard equivalences are a fixed list to learn', isCorrect: false, misconceptionId: `${LEQ}:MC-3` },
    ],
    targetedMisconceptions: [`${LEQ}:MC-3`],
    source: eb(LEQ, 'Transfer probe — the table generalises, the list does not'),
  },

  // --- math.found.proof-by-induction ----------------------------------------------------
  {
    conceptId: IND, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'What are the two steps of a proof by induction?',
    choices: [
      { text: 'Show it holds at the start, then show that holding at n forces holding at n + 1', isCorrect: true },
      { text: 'Check enough cases, then generalise the pattern', isCorrect: false },
      { text: 'Assume it holds for all n, then verify a few values', isCorrect: false, misconceptionId: `${IND}:MC-1` },
    ],
    targetedMisconceptions: [`${IND}:MC-1`],
    source: eb(IND, 'Assessment gate — base case plus inductive step'),
  },
  {
    conceptId: IND, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Assuming the claim holds at n looks like assuming what you are proving. Is induction circular?',
    choices: [
      { text: 'No — you prove the CONDITIONAL "if it holds at n then at n + 1", which can be established without knowing it holds at n', isCorrect: true },
      { text: 'Yes, but the base case repairs the circularity', isCorrect: false, misconceptionId: `${IND}:MC-1` },
      { text: 'Yes — it is a known weakness of the technique that is tolerated by convention', isCorrect: false, misconceptionId: `${IND}:MC-1` },
    ],
    targetedMisconceptions: [`${IND}:MC-1`],
    source: eb(IND, 'Misconception register — the inductive hypothesis is not circular'),
  },
  {
    conceptId: IND, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: '"n² > n for all naturals" has a working inductive step but fails at n = 1. What does that show?',
    choices: [
      { text: 'The base case is not a formality — the dominoes are arranged and nothing pushes them', isCorrect: true },
      { text: 'The inductive step must be wrong, since the two always agree', isCorrect: false, misconceptionId: `${IND}:MC-2` },
      { text: 'Nothing — a single failing value can be excluded from the claim afterwards', isCorrect: false, misconceptionId: `${IND}:MC-2` },
    ],
    targetedMisconceptions: [`${IND}:MC-2`, `${IND}:MC-3`],
    source: eb(IND, 'Transfer probe — the base case bites'),
  },
]
