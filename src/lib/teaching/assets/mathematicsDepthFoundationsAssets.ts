/**
 * MATHEMATICS — probe DEPTH, batch 3: math.found (84 (concept, band) pairs, 168 probes).
 *
 * Why depth, and the identity rule every probe here obeys, are stated once in
 * mathematicsDepthArithAssets.ts (batch 1): five gradeable probes per pair so a
 * learner recovers from one or two mistakes on questions they have not seen;
 * every probe extends the pair's existing ladder slot at an unused difficulty
 * rung, so no seeded probe is re-identified.
 *
 * Foundations is where a careless option teaches the misconception it was
 * meant to catch, so every correct option here was checked against the
 * definition it rests on: inclusive "or", the vacuous conditional, ∅ ⊆ every
 * set, |P(S)| = 2ⁿ, (a, b) ≠ (b, a) unless a = b, a partition needs disjoint
 * non-empty pieces that cover, ∀∃ ≠ ∃∀, and valid ≠ sound.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const { MIDDLE, HIGH, UNDERGRADUATE: UG } = GradeBand
const { FOUNDATIONAL: F, DEVELOPING: D, PROFICIENT: P, ADVANCED: A } = ProbeDifficulty
type Kind = 'mcq' | 'misconception_probe'

function q(
  conceptId: string, gradeBand: GradeBand, probeKind: Kind, difficulty: ProbeDifficulty,
  stem: string, correct: string, wrong: string[], what: string,
): SeedProbe {
  return {
    conceptId, subjectSlug: S, probeKind, gradeBand, difficulty, stem,
    choices: [{ text: correct, isCorrect: true }, ...wrong.map((text) => ({ text, isCorrect: false }))],
    correctValue: correct,
    targetedMisconceptions: [],
    source: `educational-brain/concepts/mathematics/${conceptId}.md — probe-depth set 2026-10-02: ${what}`,
  }
}

export const MATHEMATICS_DEPTH_FOUNDATIONS_PROBES: SeedProbe[] = [
  q('math.found.abstraction', MIDDLE, 'mcq', D, 'Adding 0 leaves a number unchanged, and multiplying by 1 does too. What does abstraction notice?', 'Both operations have an identity element that changes nothing', ['Addition and multiplication are the same operation', 'The rule only works for small numbers', 'Nothing, because the symbols are different'], 'abstraction keeps the shared structure and drops the surface'),
  q('math.found.abstraction', MIDDLE, 'mcq', A, 'You proved a + b = b + a using only properties every number has. Where else does the result apply?', 'To every system with those same properties, whatever its objects are', ['Only to the numbers in your examples', 'Only to whole numbers', 'Nowhere until it is tested again'], 'an abstract proof transfers to every instance of the structure'),

  q('math.found.axiom', HIGH, 'mcq', D, 'Euclid\'s parallel postulate is replaced by a different axiom, and a consistent geometry results. What does that show?', 'An axiom is a chosen starting point, not a provable fact', ['The parallel postulate was false', 'The new geometry must contain an error', 'Axioms can be proved from other axioms'], 'non-Euclidean geometry'),
  q('math.found.axiom', HIGH, 'mcq', A, 'What separates an axiom from a theorem?', 'A theorem is proved from axioms; an axiom is assumed without proof', ['An axiom is more important', 'A theorem is more obviously true', 'There is no real difference'], 'the axiom/theorem boundary'),

  q('math.found.axiomatic-system', HIGH, 'mcq', D, 'A system of axioms lets you prove both a statement and its negation. Which property has failed?', 'Consistency', ['Completeness', 'Independence', 'Simplicity'], 'consistency means no contradiction is derivable'),
  q('math.found.axiomatic-system', HIGH, 'mcq', A, 'Some statement can be neither proved nor disproved from a system\'s axioms. Which property is missing?', 'Completeness', ['Consistency', 'Independence', 'Validity'], 'the three properties are independent of each other'),

  q('math.found.cardinal-arithmetic', UG, 'mcq', D, 'What is ℵ₀ × ℵ₀?', 'ℵ₀', ['ℵ₁', '2^ℵ₀', 'It is undefined'], 'ℕ × ℕ is countable'),
  q('math.found.cardinal-arithmetic', UG, 'mcq', A, 'How does 2^ℵ₀ compare with ℵ₀?', 'It is strictly larger', ['It is equal', 'It is smaller', 'They cannot be compared'], "Cantor's theorem: |P(ℕ)| > |ℕ|"),

  q('math.found.cardinality', HIGH, 'mcq', D, 'Which set has the same cardinality as ℕ?', 'The set of all integers ℤ', ['The set of real numbers', 'The set {1, 2, 3}', 'The power set of ℕ'], '0, 1, −1, 2, −2, … is a bijection with ℕ'),
  q('math.found.cardinality', HIGH, 'mcq', A, 'Do the intervals (0, 1) and (0, 2) have the same cardinality?', 'Yes, x ↦ 2x is a bijection', ['No, (0, 2) is twice as long', 'No, (0, 2) contains (0, 1) and more', 'Only if both are countable'], 'cardinality is about bijections, not length'),

  q('math.found.cartesian-product', HIGH, 'mcq', D, 'If |A| = 3 and |B| = 4, how many elements does A × B have?', '12', ['7', '64', '81'], '|A × B| = |A| × |B|'),
  q('math.found.cartesian-product', HIGH, 'mcq', A, 'A = {1, 2}. Which pair is NOT an element of A × A?', '(1, 3)', ['(1, 1)', '(2, 1)', '(1, 2)'], 'both entries must come from A, and order matters'),

  q('math.found.complement', HIGH, 'mcq', D, 'The universal set is {1, 2, 3, 4, 5, 6} and A = {2, 4}. What is A\'?', '{1, 3, 5, 6}', ['{2, 4}', '{1, 3, 5}', '{6}'], 'everything in the universal set that is not in A'),
  q('math.found.complement', HIGH, 'mcq', A, "What is (A ∪ B)' equal to?", "A' ∩ B'", ["A' ∪ B'", "A ∩ B", "(A ∩ B)'"], "De Morgan's law"),

  q('math.found.complex-numbers', HIGH, 'mcq', D, 'What is (2 + 3i)(2 − 3i)?', '13', ['4 − 9i', '−5', '13i'], '4 − 9i² = 4 + 9'),
  q('math.found.complex-numbers', HIGH, 'mcq', A, 'What is i⁴⁰²?', '−1', ['1', 'i', '−i'], 'powers of i repeat every 4; 402 ≡ 2 (mod 4)'),

  q('math.found.conjecture', HIGH, 'mcq', D, 'A conjecture is checked by computer for the first billion cases. What is its status?', 'Still a conjecture, because cases are not a proof', ['A theorem', 'A definition', 'False'], 'evidence is not proof'),
  q('math.found.conjecture', HIGH, 'mcq', A, 'Fermat stated his "last theorem" in 1637; it was proved in 1994. What was it in between?', 'A conjecture', ['A theorem', 'An axiom', 'A lemma'], 'the name does not decide the status — a proof does'),

  q('math.found.corollary', HIGH, 'mcq', D, 'Theorem: the angles of a triangle sum to 180°. Which is a corollary of it?', 'Each angle of an equilateral triangle is 60°', ['The angles of a square sum to 360°', 'Parallel lines never meet', 'A triangle has three sides'], 'a corollary follows quickly from the theorem itself'),
  q('math.found.corollary', HIGH, 'mcq', A, 'Can a corollary be false while the theorem it comes from is true?', 'No, it is proved from the theorem', ['Yes, corollaries are less certain', 'Yes, if it was found quickly', 'Only if nobody has checked it'], 'a proved corollary is as certain as its theorem'),

  q('math.found.countable-set', HIGH, 'mcq', D, 'Is the set of all finite strings of letters a to z countable?', 'Yes', ['No, it is infinite', 'No, it is uncountable like ℝ', 'Only if strings have a maximum length'], 'list by length, then alphabetically'),
  q('math.found.countable-set', HIGH, 'mcq', A, 'Is the union of countably many countable sets countable?', 'Yes', ['No, it becomes uncountable', 'Only if the sets are finite', 'Only if the sets are disjoint'], 'enumerate along the diagonals of a grid (using countable choice)'),

  q('math.found.deductive-reasoning', HIGH, 'mcq', D, '"All squares are rectangles. ABCD is a square. So ABCD is a rectangle." What kind of argument is this?', 'Valid and sound', ['Valid but not sound', 'Sound but not valid', 'Inductive'], 'true premises in a valid form'),
  q('math.found.deductive-reasoning', HIGH, 'mcq', A, '"All fish can fly. A shark is a fish. So a shark can fly." How do you describe it?', 'Valid but not sound', ['Sound', 'Invalid', 'Inductive'], 'the form is valid; a premise is false'),

  q('math.found.definition', MIDDLE, 'mcq', D, 'A rectangle is defined as a quadrilateral with four right angles. Is a square a rectangle?', 'Yes, it meets the definition', ['No, its sides are all equal', 'Only if it is drawn sideways', 'No, a square is a separate shape'], 'membership follows the definition, not a mental picture'),
  q('math.found.definition', MIDDLE, 'mcq', A, 'Why does a definition need to be exact?', 'So that every object can be decided as fitting it or not', ['So that it sounds formal', 'So that it is easy to memorise', 'So that no example ever fits it'], 'definitions decide membership'),

  q('math.found.direct-proof', HIGH, 'mcq', D, 'To prove directly that the product of two odd numbers is odd, how do you start?', 'Write them as 2a + 1 and 2b + 1', ['Assume the product is even', 'Check 3 × 5 and 7 × 9', 'Assume the numbers are even'], 'a direct proof starts from the hypothesis'),
  q('math.found.direct-proof', HIGH, 'mcq', A, 'A direct proof that n² is even whenever n is even ends at n² = 4k². What does that finish?', 'n² = 2(2k²), which is even', ['Nothing, because 4k² is not obviously even', 'It proves n is even', 'It proves every square is even'], 'reach the definition of the conclusion'),

  q('math.found.empty-set', MIDDLE, 'mcq', D, 'Is ∅ a subset of every set?', 'Yes', ['No, it has nothing in it', 'Only of other empty sets', 'Only of finite sets'], 'nothing in ∅ can fail to be in the other set'),
  q('math.found.empty-set', MIDDLE, 'mcq', A, 'Count the elements of the set {∅, {∅}}.', '2', ['0', '1', '3'], 'each set inside counts as one element'),

  q('math.found.equivalence-class', HIGH, 'mcq', D, 'Under "same remainder when divided by 4", which class contains 10?', '[2]', ['[10]', '[0]', '[4]'], '10 = 2 × 4 + 2'),
  q('math.found.equivalence-class', HIGH, 'mcq', A, 'Two equivalence classes share one element. What follows?', 'They are the same class', ['They overlap in exactly one element', 'One is inside the other', 'Nothing in particular'], 'distinct classes are disjoint'),

  q('math.found.equivalence-relation', HIGH, 'mcq', D, 'Is "has the same birthday as" an equivalence relation on people?', 'Yes', ['No, it is not symmetric', 'No, it is not transitive', 'No, it is not reflexive'], 'all three properties hold'),
  q('math.found.equivalence-relation', HIGH, 'mcq', A, 'Is "is less than or equal to" an equivalence relation on the integers?', 'No, it is not symmetric', ['Yes', 'No, it is not reflexive', 'No, it is not transitive'], '3 ≤ 5 but not 5 ≤ 3'),

  q('math.found.existence-proof', HIGH, 'mcq', D, 'How do you prove "there is an integer n with n² = 49"?', 'Give n = 7 and check 7² = 49', ['Show every integer squared is 49', 'Assume no such n and stop', 'Check that 49 is odd'], 'a constructive existence proof needs one witness'),
  q('math.found.existence-proof', HIGH, 'mcq', A, 'A polynomial of odd degree is shown to change sign, so by the intermediate value theorem it has a real root. What kind of proof is that?', 'A non-constructive existence proof', ['A uniqueness proof', 'A proof by counterexample', 'Not a proof'], 'it shows a root exists without naming it'),

  q('math.found.finite-set', HIGH, 'mcq', D, 'Which of these sets is finite?', 'The set of prime numbers below one million', ['The set of all even numbers', 'The set of fractions between 0 and 1', 'The set of all powers of 2'], 'finite means it can be counted to an end'),
  q('math.found.finite-set', HIGH, 'mcq', A, 'Is the set of all real numbers x with x² = 2 finite?', 'Yes, it has two elements', ['No, √2 has infinitely many digits', 'No, it is a set of real numbers', 'It is empty'], 'size of the set, not length of its elements'),

  q('math.found.function-set-theoretic', HIGH, 'mcq', D, 'On A = {1, 2}, is {(1, a), (1, b), (2, a)} a function from A?', 'No, 1 is sent to two values', ['Yes', 'No, a is used twice', 'Yes, every element of A appears'], 'each input has exactly one output'),
  q('math.found.function-set-theoretic', HIGH, 'mcq', A, 'Is f(x) = 1/x a function from ℝ to ℝ?', 'No, 0 has no image', ['Yes', 'No, it is not one-to-one', 'No, it never takes the value 0'], 'a function must be defined on its whole domain'),

  q('math.found.generalization', HIGH, 'mcq', D, '2 = 1 × 2, 6 = 2 × 3, 12 = 3 × 4. What generalization fits?', 'The nth term is n(n + 1)', ['The nth term is n²', 'Each term is double the last', 'The nth term is 2n'], 'test the guess on every given case'),
  q('math.found.generalization', HIGH, 'mcq', A, 'A pattern holds for n = 1 to 10 because every case you tried was odd. What should you check before generalizing to all n?', 'Even values of n', ['More odd values of n', 'Nothing, ten cases are enough', 'Only n = 11'], 'vary the cases on the property they shared'),

  q('math.found.hasse-diagram', HIGH, 'mcq', D, 'In the Hasse diagram of the divisors of 12 under divisibility, which element is at the top?', '12', ['1', '6', '2'], 'every divisor divides 12'),
  q('math.found.hasse-diagram', HIGH, 'mcq', A, 'Which pair is joined by an edge in the Hasse diagram of the divisors of 12?', '2 and 4', ['1 and 4', '2 and 12', '3 and 4'], 'edges join only covering pairs with nothing in between'),

  q('math.found.inductive-reasoning', HIGH, 'mcq', D, 'Every swan you have seen is white, so you conclude all swans are white. What kind of reasoning is that?', 'Inductive', ['Deductive', 'A proof', 'Mathematical induction'], 'generalizing from observed cases'),
  q('math.found.inductive-reasoning', HIGH, 'mcq', A, 'What can inductive reasoning give a mathematician?', 'A conjecture worth trying to prove', ['A proof', 'A definition', 'An axiom'], 'induction suggests, deduction establishes'),

  q('math.found.integers', UG, 'misconception_probe', D, 'Is 0 an integer?', 'Yes', ['No, it is neither positive nor negative', 'Only in some systems', 'No, it is a natural number only'], 'ℤ contains the positives, the negatives and zero'),
  q('math.found.integers', UG, 'misconception_probe', A, 'Which number is the larger: −2 or −9?', '−2', ['−9', 'They are equal', 'Negative numbers cannot be compared'], '−2 is further right on the number line'),

  q('math.found.intersection', HIGH, 'mcq', D, 'A = {x : x is a multiple of 2} and B = {x : x is a multiple of 3}. What is A ∩ B?', 'The multiples of 6', ['The multiples of 5', 'All whole numbers', 'The empty set'], 'numbers in both sets'),
  q('math.found.intersection', HIGH, 'mcq', A, 'If A ∩ B = A, what must be true?', 'A ⊆ B', ['B ⊆ A', 'A = ∅', 'A and B are disjoint'], 'every element of A is also in B'),

  q('math.found.irrational-numbers', HIGH, 'mcq', D, 'Which of these numbers is irrational?', 'π', ['22/7', '3.14', '0.121212…'], '22/7 and 3.14 are rational approximations of π'),
  q('math.found.irrational-numbers', HIGH, 'mcq', A, 'Is √2 + (−√2) irrational?', 'No, it equals 0', ['Yes, both terms are irrational', 'Yes, a sum of irrationals is always irrational', 'It cannot be decided'], 'a sum of irrationals can be rational'),

  q('math.found.lemma', HIGH, 'mcq', D, 'A lemma is proved and later used inside the proof of a theorem. How certain is the lemma?', 'As certain as any theorem, because it is proved', ['Less certain, because it is only a lemma', 'Uncertain until the theorem is finished', 'It is assumed, like an axiom'], 'a lemma is a proved result named for its use'),
  q('math.found.lemma', HIGH, 'mcq', A, 'Zorn\'s lemma and Euclid\'s lemma are famous results. What does that show about the word "lemma"?', 'It names a result by its role, not by how important it is', ['Lemmas are always unimportant', 'A lemma becomes a theorem once it is famous', 'Only easy results are lemmas'], 'lemma, theorem and corollary describe role'),

  q('math.found.logic', HIGH, 'mcq', F, 'P is false. What is the truth value of "if P then Q"?', 'True, whatever Q is', ['False', 'It depends on Q', 'It has no truth value'], 'a conditional with a false hypothesis is vacuously true'),
  q('math.found.logic', HIGH, 'mcq', D, '"If n is divisible by 6, then n is even." Which statement is equivalent to it?', 'If n is odd, then n is not divisible by 6', ['If n is even, then n is divisible by 6', 'If n is not divisible by 6, then n is odd', 'n is divisible by 6 and n is even'], 'the contrapositive is equivalent; the converse and inverse are not'),

  q('math.found.logic', MIDDLE, 'mcq', F, '"Every multiple of 4 is even." Is 12 even?', 'Yes, because 12 is a multiple of 4', ['Not necessarily', 'No', 'Only if 12 is also a multiple of 3'], 'applying a universal rule to one case'),
  q('math.found.logic', MIDDLE, 'mcq', A, '"If a shape is a square, then it has four sides." A shape has four sides. Must it be a square?', 'No, a rectangle also has four sides', ['Yes', 'Yes, because the rule says so', 'Only if its sides are straight'], 'the converse of a conditional need not hold'),

  q('math.found.logical-connectives', HIGH, 'mcq', D, 'P is false and Q is true. What is the truth value of "P OR Q"?', 'True', ['False', 'Only true if both are true', 'Undefined'], 'OR is true when at least one part is true'),
  q('math.found.logical-connectives', HIGH, 'mcq', A, 'P is true and Q is false. What is the truth value of "P if and only if Q"?', 'False', ['True', 'It depends on the context', 'Undefined'], 'a biconditional is true only when both sides match'),

  q('math.found.logical-equivalence', HIGH, 'mcq', D, 'Which statement is logically equivalent to "NOT (P AND Q)"?', '(NOT P) OR (NOT Q)', ['(NOT P) AND (NOT Q)', 'P OR Q', 'NOT P AND Q'], "De Morgan's law"),
  q('math.found.logical-equivalence', HIGH, 'mcq', A, 'Which statement is logically equivalent to "if P then Q"?', '(NOT P) OR Q', ['P OR (NOT Q)', 'if Q then P', 'P AND Q'], 'the conditional fails only when P is true and Q is false'),

  q('math.found.mathematical-language', HIGH, 'mcq', D, 'In mathematics, what does "x is positive or x is negative" leave out?', 'x = 0', ['Nothing', 'Fractions', 'Large numbers'], 'zero is neither positive nor negative'),
  q('math.found.mathematical-language', HIGH, 'mcq', A, 'A theorem says "a function is continuous if it is differentiable". Which direction does it claim?', 'Differentiable implies continuous', ['Continuous implies differentiable', 'Both directions', 'Neither direction'], '"A if B" means "B implies A"'),

  q('math.found.mathematical-modeling', HIGH, 'mcq', D, 'A model predicts a fence needs 41.6 panels. How many panels should you buy?', '42', ['41', '41.6', '40'], 'interpret the answer back in the real situation'),
  q('math.found.mathematical-modeling', HIGH, 'mcq', A, 'Your population model fits the last 10 years of data well. What is the main risk of using it for 100 years ahead?', 'Its assumptions may stop holding far outside the data', ['None, a good fit guarantees the future', 'The arithmetic becomes too hard', 'Models cannot use years'], 'validate a model before extrapolating it'),

  q('math.found.mathematical-notation', HIGH, 'mcq', D, 'What does "x ∈ ℚ" say?', 'x is a rational number', ['x is a set of rational numbers', 'x is the set ℚ', 'x is irrational'], '∈ means "is an element of"'),
  q('math.found.mathematical-notation', HIGH, 'mcq', A, 'Which statement is true for A = {1, 2, 3}?', '{1} ⊂ A', ['{1} ∈ A', '1 ⊆ A', 'A ⊂ {1, 2}'], '⊂ relates sets; ∈ relates an element to a set'),

  q('math.found.mathematical-symbols', HIGH, 'mcq', D, 'Which symbol is a relation, giving a statement that is true or false, rather than an operation giving a value?', '≤', ['+', '×', '−'], 'relations make claims; operations make values'),
  q('math.found.mathematical-symbols', HIGH, 'mcq', A, 'What does "∃!x, P(x)" mean?', 'There is exactly one x with P(x)', ['There is at least one x with P(x)', 'P(x) holds for every x', 'P(x) is very likely'], '∃! adds uniqueness to existence'),

  q('math.found.mathematical-thinking', MIDDLE, 'mcq', D, 'Which is the best example of mathematical thinking?', 'Asking why a rule works for every case, not just these ones', ['Doing a long sum very fast', 'Memorising a times table', 'Copying a method from the board'], 'reasoning about why, not only computing'),
  q('math.found.mathematical-thinking', MIDDLE, 'mcq', A, 'You claim "the sum of two odd numbers is even". What turns this from a guess into knowledge?', 'An argument that works for any two odd numbers', ['Ten more examples', 'Asking a friend', 'Checking it with a calculator'], 'a general argument, not more cases'),

  q('math.found.natural-numbers', UG, 'mcq', D, 'Is ℕ closed under subtraction?', 'No, 3 − 5 is not a natural number', ['Yes', 'Only for even numbers', 'Only if 0 is included'], 'closure fails for subtraction'),
  q('math.found.natural-numbers', UG, 'mcq', A, 'Which property is special to ℕ compared with ℤ?', 'Every non-empty subset has a least element', ['Closure under addition', 'Every element has a successor', 'It is infinite'], 'the well-ordering of ℕ'),

  q('math.found.ordered-pair', HIGH, 'mcq', D, 'If (x + 1, 4) = (3, y), what are x and y?', 'x = 2, y = 4', ['x = 3, y = 4', 'x = 4, y = 2', 'x = 2, y = 3'], 'equal pairs have equal first and equal second entries'),
  q('math.found.ordered-pair', HIGH, 'mcq', A, 'Can (a, b) equal (b, a)?', 'Only when a = b', ['Always', 'Never', 'Only when a and b are numbers'], 'order matters unless the entries coincide'),

  q('math.found.ordinal-number', UG, 'mcq', D, 'Do ω + 1 and ω have the same cardinality?', 'Yes, both are countable', ['No, ω + 1 is larger', 'No, ω is larger', 'They cannot be compared'], 'different order types can share a cardinality'),
  q('math.found.ordinal-number', UG, 'mcq', A, 'What is 2 · ω in ordinal arithmetic?', 'ω', ['ω + ω', '2', 'ω²'], 'ω copies of 2 in order is still order type ω; ω · 2 = ω + ω'),

  q('math.found.partial-order', HIGH, 'mcq', D, 'Is ⊆ on the subsets of {1, 2} a partial order?', 'Yes', ['No, {1} and {2} are not comparable', 'No, it is not reflexive', 'No, it is not transitive'], 'reflexive, antisymmetric and transitive; comparability is not required'),
  q('math.found.partial-order', HIGH, 'mcq', A, 'Is "divides" a partial order on the non-zero integers?', 'No, 2 | −2 and −2 | 2, but 2 ≠ −2', ['Yes', 'No, it is not transitive', 'No, it is not reflexive'], 'antisymmetry fails once negatives are allowed'),

  q('math.found.partition', HIGH, 'mcq', D, 'Do {1}, {2, 3} and ∅ form a partition of {1, 2, 3}?', 'No, a partition\'s pieces must be non-empty', ['Yes', 'No, they overlap', 'No, they do not cover the set'], 'non-empty, disjoint, covering'),
  q('math.found.partition', HIGH, 'mcq', A, 'Which collection partitions the integers?', 'The evens and the odds', ['The positives and the negatives', 'The multiples of 2 and the multiples of 3', 'The primes and the composites'], 'the others miss 0, overlap, or miss 1 and the negatives'),

  q('math.found.pattern-recognition', MIDDLE, 'mcq', D, 'What comes next: 1, 4, 9, 16, …?', '25', ['20', '24', '32'], 'the square numbers'),
  q('math.found.pattern-recognition', MIDDLE, 'mcq', A, '1, 2, 4, … could continue as 8 or as 7. What does that tell you?', 'A few terms do not fix a rule; the rule must be stated or justified', ['8 is the only possible answer', 'The sequence is wrong', 'Patterns never have rules'], 'several rules can fit the same opening terms'),

  q('math.found.power-set', HIGH, 'mcq', D, 'How many elements does P({a, b, c}) have?', '8', ['6', '3', '9'], '2³ subsets'),
  q('math.found.power-set', HIGH, 'mcq', A, 'Which of these is an element of P({1, 2})?', '∅', ['1', '{3}', '{{1}}'], 'elements of a power set are subsets'),

  q('math.found.predicate-logic', HIGH, 'mcq', D, 'What is the negation of "∃x, x > 5"?', '∀x, x ≤ 5', ['∃x, x ≤ 5', '∀x, x > 5', '∃x, x < 5'], 'swap the quantifier and negate the predicate'),
  q('math.found.predicate-logic', HIGH, 'mcq', A, 'Over the real numbers, is "∀x ∃y, x + y = 0" true?', 'Yes, take y = −x', ['No, no single y works for every x', 'Only for positive x', 'Only for integers'], 'y may depend on x'),

  q('math.found.predicate', HIGH, 'mcq', D, 'P(x) is "x² = 9". For which values is P(x) true over the integers?', '3 and −3', ['3 only', '9', 'No value'], 'a predicate becomes a proposition once x is given'),
  q('math.found.predicate', HIGH, 'mcq', A, 'Q(x, y) is "x < y". Which of these is a proposition?', 'Q(2, 5)', ['Q(x, 5)', 'Q(x, y)', 'Q(2, y)'], 'every free variable must be filled or quantified'),

  q('math.found.problem-solving-strategies', MIDDLE, 'mcq', D, 'You need the 100th term of 3, 7, 11, 15, …. Which strategy is best?', 'Find the rule for the nth term', ['Write out all 100 terms', 'Guess a large number', 'Draw a picture of each term'], 'generalize instead of listing'),
  q('math.found.problem-solving-strategies', MIDDLE, 'mcq', A, 'A problem asks for all ways to make 10p from 1p, 2p and 5p coins. Which strategy avoids missing any?', 'An organised list, by number of 5p coins first', ['Guess and check at random', 'Work backwards from 10', 'Draw a graph'], 'systematic listing'),

  q('math.found.problem-solving', MIDDLE, 'mcq', D, 'I think of a number, multiply by 3 and subtract 4 to get 11. What is my number?', '5', ['3', '7', '45'], 'work backwards: add 4, then divide by 3'),
  q('math.found.problem-solving', MIDDLE, 'mcq', A, 'A farmer counts 10 heads and 28 legs among chickens and goats. How many goats?', '4', ['6', '5', '8'], '10 chickens would give 20 legs; each goat adds 2'),

  q('math.found.proof-by-cases', HIGH, 'mcq', D, 'To prove |xy| = |x||y| by cases, which cases cover everything?', 'The signs of x and y: each positive, negative or zero', ['Only x and y both positive', 'x = y and x ≠ y', 'x > 10 and x ≤ 10'], 'the cases must be exhaustive'),
  q('math.found.proof-by-cases', HIGH, 'mcq', A, 'To show n² leaves remainder 0 or 1 when divided by 3, which cases should you use?', 'n = 3k, n = 3k + 1, n = 3k + 2', ['n even and n odd', 'n prime and n composite', 'n < 3 and n ≥ 3'], 'split by the remainder that matters'),

  q('math.found.proof-by-contradiction', HIGH, 'mcq', D, 'To prove there is no largest even number by contradiction, what do you assume?', 'That there is a largest even number', ['That there is no largest even number', 'That every number is even', 'That 2 is the largest even number'], 'assume the negation of the claim'),
  q('math.found.proof-by-contradiction', HIGH, 'mcq', A, 'Assuming √3 = a/b in lowest terms, you deduce a and b are both multiples of 3. Why is that a contradiction?', 'Lowest terms means a and b share no common factor', ['Because 3 is prime', 'Because a/b would equal 1', 'It is not a contradiction'], 'the deduction contradicts the assumption'),

  q('math.found.proof-by-contrapositive', HIGH, 'mcq', D, 'What is the contrapositive of "if x² is odd, then x is odd"?', 'If x is even, then x² is even', ['If x is odd, then x² is odd', 'If x² is even, then x is even', 'If x is even, then x² is odd'], 'negate both parts and swap them'),
  q('math.found.proof-by-contrapositive', HIGH, 'mcq', A, 'Why does proving the contrapositive prove the original statement?', 'They are logically equivalent: true in exactly the same cases', ['The contrapositive is stronger', 'It does not; it proves the converse', 'Because it is easier'], 'P → Q ≡ ¬Q → ¬P'),

  q('math.found.proof-by-induction', HIGH, 'mcq', D, 'Proving 1 + 2 + … + n = n(n + 1)/2, what do you add to both sides of the case n to reach n + 1?', 'n + 1', ['n', '1', 'n²'], 'the next term of the sum'),
  q('math.found.proof-by-induction', HIGH, 'mcq', A, 'An "induction" proves all horses are the same colour, but the step from n = 1 to n = 2 fails. What went wrong?', 'The inductive step is not valid for every n', ['The base case is wrong', 'Induction cannot prove statements about horses', 'Nothing; the proof is correct'], 'the step must work from every n, including the first'),

  q('math.found.proof', HIGH, 'mcq', D, 'What does a single counterexample do to a claim about all integers?', 'It proves the claim false', ['It makes the claim less likely', 'Nothing, one case proves nothing', 'It proves the claim for other integers'], 'one failure refutes a universal claim'),
  q('math.found.proof', HIGH, 'mcq', A, 'Which of these is a valid proof that the sum of two even numbers is even?', '2a + 2b = 2(a + b), which is even', ['2 + 4 = 6 and 6 is even', 'Even numbers always behave nicely', '8 + 10 = 18 and 18 is even'], 'a proof covers every case at once'),

  q('math.found.proper-subset', MIDDLE, 'mcq', D, 'How many proper subsets does {1, 2} have?', '3', ['4', '2', '1'], '∅, {1} and {2}; the set itself is not proper'),
  q('math.found.proper-subset', MIDDLE, 'mcq', A, 'If A ⊂ B, which of these must be true?', 'B has an element that is not in A', ['A has an element that is not in B', 'A = B', 'B is empty'], 'proper means strictly smaller'),

  q('math.found.proposition', HIGH, 'mcq', D, 'Which sentence is a proposition — a statement that is either true or false?', '7 is a prime number', ['Is 7 prime?', 'Find a prime number', 'x is prime'], 'a statement that is true or false'),
  q('math.found.proposition', HIGH, 'mcq', A, 'Is "this sentence is false" a proposition?', 'No, it cannot be consistently true or false', ['Yes, it is false', 'Yes, it is true', 'Yes, it is both'], 'the liar paradox'),

  q('math.found.quantifiers', HIGH, 'mcq', D, 'Over the integers, is "∃n, n + 3 = 1" true?', 'Yes, n = −2', ['No', 'Only over the naturals', 'It is not a statement'], 'one witness is enough'),
  q('math.found.quantifiers', HIGH, 'mcq', A, 'Which statement means "every integer has a larger integer"?', '∀x ∃y, y > x', ['∃y ∀x, y > x', '∀x ∀y, y > x', '∃x ∃y, y > x'], 'the order of quantifiers changes the meaning'),

  q('math.found.rational-numbers', UG, 'misconception_probe', F, 'Is 0.75 a rational number?', 'Yes, it equals 3/4', ['No, it is a decimal', 'No, it is not a whole number', 'Only if it is rounded'], 'a terminating decimal is a fraction'),
  q('math.found.rational-numbers', UG, 'misconception_probe', A, 'Is the sum of two rational numbers always rational?', 'Yes, a/b + c/d = (ad + bc)/bd', ['No, it can be irrational', 'Only if the denominators match', 'Only for positive numbers'], 'ℚ is closed under addition'),

  q('math.found.reading-mathematics', HIGH, 'mcq', D, 'A theorem begins "Let n be an odd integer". What should you do before reading on?', 'Try a concrete example, such as n = 5', ['Skip to the conclusion', 'Assume n is any number', 'Memorise the theorem'], 'make the abstract concrete'),
  q('math.found.reading-mathematics', HIGH, 'mcq', A, 'A proof says "clearly, x > 0". What should a careful reader do?', 'Check why x > 0 actually holds', ['Accept it, because it says clearly', 'Stop reading the proof', 'Assume the proof is wrong'], '"clearly" still has to be justified'),

  q('math.found.real-numbers', HIGH, 'mcq', D, 'Which of these is a real number but not rational?', '√5', ['−3', '2/7', '0.5'], 'ℝ contains the irrationals as well'),
  q('math.found.real-numbers', HIGH, 'mcq', A, 'Does every non-empty set of real numbers that is bounded above have a least upper bound in ℝ?', 'Yes, that is the completeness of ℝ', ['No, √2 shows it fails', 'Only if the set is finite', 'Only for sets of integers'], 'completeness holds in ℝ but fails in ℚ'),

  q('math.found.reflexive-relation', HIGH, 'mcq', D, 'Which relation on the integers is reflexive?', 'x ≤ y', ['x < y', 'x = y + 1', 'x ≠ y'], 'every element must be related to itself'),
  q('math.found.reflexive-relation', HIGH, 'mcq', A, 'Is the empty relation on {1, 2} reflexive?', 'No, (1, 1) and (2, 2) are missing', ['Yes, nothing breaks the rule', 'Yes, it is symmetric', 'Only if the set is empty'], 'reflexivity requires pairs to be present'),

  q('math.found.relation', HIGH, 'mcq', D, 'How many different relations are there from {1, 2} to {a}?', '4', ['2', '1', '3'], 'any subset of {(1, a), (2, a)}'),
  q('math.found.relation', HIGH, 'mcq', A, 'Which relation on {1, 2, 3} is also a function?', '{(1, 2), (2, 3), (3, 1)}', ['{(1, 2), (1, 3), (2, 3)}', '{(1, 1), (2, 2)}', '{(1, 2), (2, 1), (2, 3), (3, 3)}'], 'each element of the domain must have exactly one partner'),

  q('math.found.rules-of-inference', HIGH, 'mcq', D, 'From "if P then Q" and "NOT Q", what follows?', 'NOT P', ['P', 'Q', 'Nothing'], 'modus tollens'),
  q('math.found.rules-of-inference', HIGH, 'mcq', A, 'From "P OR Q" and "NOT P", what follows?', 'Q', ['NOT Q', 'P AND Q', 'Nothing'], 'disjunctive syllogism'),

  q('math.found.set-builder-notation', HIGH, 'mcq', D, 'List {x ∈ ℕ : x² < 20} (taking ℕ = {1, 2, 3, …}).', '{1, 2, 3, 4}', ['{1, 2, 3, 4, 5}', '{0, 1, 2, 3, 4}', '{4}'], 'test each natural number against the condition'),
  q('math.found.set-builder-notation', HIGH, 'mcq', A, 'Which set-builder expression describes the odd integers?', '{2k + 1 : k ∈ ℤ}', ['{2k : k ∈ ℤ}', '{k + 1 : k ∈ ℤ}', '{2k + 1 : k ∈ ℕ}'], 'k must range over all integers to reach the negative odds'),

  q('math.found.set-difference', HIGH, 'mcq', D, 'A = {1, 2, 3, 4} and B = {2, 4, 6}. What is A \\ B?', '{1, 3}', ['{6}', '{1, 3, 6}', '{2, 4}'], 'elements of A that are not in B'),
  q('math.found.set-difference', HIGH, 'mcq', A, 'If A \\ B = ∅, what must be true?', 'A ⊆ B', ['A = B', 'B ⊆ A', 'A and B are disjoint'], 'no element of A is outside B'),

  q('math.found.set-equality', MIDDLE, 'mcq', D, 'Is {x : x is a whole number and 1 < x < 4} equal to {2, 3}?', 'Yes', ['No, the order is different', 'No, one is described in words', 'Only if x is even'], 'same elements means the same set'),
  q('math.found.set-equality', MIDDLE, 'mcq', A, 'To prove A = B, what must you show?', 'A ⊆ B and B ⊆ A', ['A ⊆ B only', 'A and B have the same size', 'A and B share one element'], 'two inclusions'),

  q('math.found.set-membership', MIDDLE, 'mcq', D, 'Let C = {red, blue}. Which statement is true?', 'red ∈ C', ['green ∈ C', '{red} ∈ C', 'C ∈ red'], 'membership of an element'),
  q('math.found.set-membership', MIDDLE, 'mcq', A, 'Let D = {1, {1}}. How many elements does D have?', '2', ['1', '3', '0'], '1 and {1} are different elements'),

  q('math.found.set-operations', HIGH, 'mcq', D, 'A = {1, 2}, B = {2, 3}, C = {3, 4}. What is (A ∪ B) ∩ C?', '{3}', ['{1, 2, 3, 4}', '{2, 3}', '∅'], 'brackets first'),
  q('math.found.set-operations', HIGH, 'mcq', A, 'Which identity always holds?', 'A ∩ (B ∪ C) = (A ∩ B) ∪ (A ∩ C)', ['A ∪ (B ∩ C) = (A ∪ B) ∩ C', 'A \\ B = B \\ A', "(A ∪ B)' = A' ∪ B'"], 'the distributive law'),

  q('math.found.set-theory-axiomatic', UG, 'mcq', D, 'Which paradox showed that "the set of all sets that do not contain themselves" cannot exist?', "Russell's paradox", ["Zeno's paradox", 'The liar paradox', "Cantor's theorem"], 'unrestricted comprehension fails'),
  q('math.found.set-theory-axiomatic', UG, 'mcq', A, 'Which ZFC axiom lets you form {x ∈ A : P(x)} only inside an existing set A?', 'Separation (specification)', ['Infinity', 'Choice', 'Extensionality'], 'separation replaces unrestricted comprehension'),

  q('math.found.set-theory', HIGH, 'mcq', D, 'A = {1, 2, 3} and B = {2, 3, 4}. What is |A ∪ B|?', '4', ['6', '3', '2'], 'shared elements are counted once'),
  q('math.found.set-theory', HIGH, 'mcq', A, 'How many subsets does a set with 4 elements have?', '16', ['4', '8', '15'], '2⁴, including ∅ and the set itself'),

  q('math.found.set', HIGH, 'misconception_probe', F, 'How many elements does {1, {2, 3}} have?', '2', ['3', '1', '4'], 'a set inside a set counts as one element'),
  q('math.found.set', HIGH, 'misconception_probe', D, 'Is ∅ ∈ {1, 2}?', 'No, ∅ is not one of the listed elements', ['Yes, the empty set is in every set', 'Yes, because ∅ ⊆ {1, 2}', 'It cannot be decided'], '∅ ⊆ every set, but ∅ ∈ only a set that lists it'),

  q('math.found.set', MIDDLE, 'mcq', D, 'Which of these is the set of even numbers between 1 and 9?', '{2, 4, 6, 8}', ['{2, 4, 6, 8, 10}', '{1, 3, 5, 7, 9}', '{0, 2, 4, 6, 8}'], 'listing a set from a description'),
  q('math.found.set', MIDDLE, 'mcq', A, 'Which of these is NOT a well-defined set?', 'The set of tall people', ['The set of whole numbers below 5', 'The set of vowels', 'The set of primes'], 'membership must be decidable'),

  q('math.found.strong-induction', HIGH, 'mcq', D, 'Proving every integer n ≥ 2 is a product of primes, why is strong induction natural?', 'A composite n splits into factors smaller than n but not necessarily n − 1', ['Because primes are rare', 'Because n − 1 is always prime', 'Because ordinary induction is not allowed'], 'the step needs every smaller case'),
  q('math.found.strong-induction', HIGH, 'mcq', A, 'A step uses the cases n − 1 and n − 2. Which base cases do you need?', 'The first two values', ['Only the first value', 'None', 'Every value up to n'], 'each base case anchors a chain the step reaches back to'),

  q('math.found.subset', MIDDLE, 'mcq', D, 'How many subsets does {a, b} have?', '4', ['2', '3', '1'], '∅, {a}, {b} and {a, b}'),
  q('math.found.subset', MIDDLE, 'mcq', A, 'If A ⊆ B and B ⊆ C, what can you conclude?', 'A ⊆ C', ['C ⊆ A', 'A = C', 'Nothing'], 'subset is transitive'),

  q('math.found.symmetric-relation', HIGH, 'mcq', D, 'Which relation on the integers is symmetric?', '"x + y is even"', ['"x < y"', '"x divides y"', '"x = 2y"'], 'swapping x and y keeps it true'),
  q('math.found.symmetric-relation', HIGH, 'mcq', A, 'On {1, 2, 3}, R = {(1, 2), (2, 1), (2, 3)}. What must be added to make R symmetric?', '(3, 2)', ['(1, 3)', '(3, 3)', 'Nothing'], 'every pair needs its mirror'),

  q('math.found.theorem', HIGH, 'mcq', D, 'What turns a conjecture into a theorem?', 'A proof', ['Many checked examples', 'Being published', 'Being widely believed'], 'only a proof does'),
  q('math.found.theorem', HIGH, 'mcq', A, "Pythagoras' theorem was proved over two thousand years ago. Could new measurements disprove it?", 'No, it follows from the axioms of Euclidean geometry', ['Yes, if better instruments are built', 'Yes, it is only a strong theory', 'Only if a right triangle is measured wrongly'], 'mathematical truth rests on proof, not measurement'),

  q('math.found.total-order', HIGH, 'mcq', D, 'Is ≤ on the real numbers a total order?', 'Yes, any two real numbers are comparable', ['No, it is not antisymmetric', 'No, some reals are not comparable', 'Only on the integers'], 'totality: x ≤ y or y ≤ x'),
  q('math.found.total-order', HIGH, 'mcq', A, 'Is ⊆ on the subsets of {1, 2} a total order?', 'No, {1} and {2} are not comparable', ['Yes', 'No, it is not reflexive', 'No, it is not transitive'], 'a partial order that is not total'),

  q('math.found.transitive-relation', HIGH, 'mcq', D, 'Is "is a parent of" transitive?', 'No, a parent of a parent is a grandparent', ['Yes', 'Only for families of three', 'Yes, because parents come first'], 'transitivity fails'),
  q('math.found.transitive-relation', HIGH, 'mcq', A, 'On {1, 2, 3}, R = {(1, 2), (2, 3)}. Which pair must be added to make R transitive?', '(1, 3)', ['(3, 1)', '(2, 1)', '(1, 1)'], '(1, 2) and (2, 3) force (1, 3)'),

  q('math.found.truth-table', HIGH, 'mcq', D, 'How many rows does the truth table for a statement in P, Q and R need?', '8', ['6', '3', '9'], '2³ combinations'),
  q('math.found.truth-table', HIGH, 'mcq', A, 'In how many rows of its truth table is "P → Q" false?', '1', ['2', '0', '3'], 'only when P is true and Q is false'),

  q('math.found.uncountable-set', UG, 'mcq', D, 'Which of these sets is uncountable?', 'The real numbers between 0 and 1', ['The rational numbers', 'The integers', 'The set of finite strings of digits'], 'Cantor diagonal argument'),
  q('math.found.uncountable-set', UG, 'mcq', A, 'Is the set of irrational numbers countable?', 'No, otherwise ℝ = ℚ ∪ irrationals would be countable', ['Yes, like the rationals', 'Yes, because they are rarer', 'It depends on the continuum hypothesis'], 'a union of two countable sets is countable'),

  q('math.found.union', HIGH, 'mcq', D, 'If |A| = 5, |B| = 4 and |A ∩ B| = 2, what is |A ∪ B|?', '7', ['9', '11', '2'], 'inclusion–exclusion: 5 + 4 − 2'),
  q('math.found.union', HIGH, 'mcq', A, 'If A ∪ B = A, what must be true?', 'B ⊆ A', ['A ⊆ B', 'B = ∅', 'A = B'], 'B adds nothing new'),

  q('math.found.uniqueness-proof', HIGH, 'mcq', D, 'To prove the identity element of a group is unique, what do you suppose?', 'Two identities e and f, then show e = f', ['No identity exists', 'The identity is 0', 'Every element is an identity'], 'assume two and show they coincide'),
  q('math.found.uniqueness-proof', HIGH, 'mcq', A, 'You show 2x + 3 = 7 has at most one solution. What is still needed for "exactly one"?', 'That a solution exists, such as x = 2', ['Nothing more', 'That the solution is positive', 'That 7 is prime'], 'existence and uniqueness are separate claims'),

  q('math.found.variable', MIDDLE, 'mcq', D, 'If x = 4, what is 3x + 2?', '14', ['34', '9', '12'], '3x means 3 times x'),
  q('math.found.variable', MIDDLE, 'mcq', A, 'In "a + b = b + a for all numbers a and b", what are a and b?', 'Placeholders that can be any numbers', ['Two particular unknown numbers', 'The letters a and b', 'Labels for apples and bananas'], 'a variable in a general statement ranges over values'),

  q('math.found.venn-diagram', MIDDLE, 'mcq', D, 'In a class, 12 like tea, 10 like coffee and 4 like both. How many like tea or coffee?', '18', ['22', '26', '14'], 'the overlap is counted once'),
  q('math.found.venn-diagram', MIDDLE, 'mcq', A, 'In a two-set Venn diagram, which region shows A ∩ B\'?', 'The part of A outside B', ['The overlap', 'The part of B outside A', 'Everything outside both circles'], 'reading regions'),

  q('math.found.well-ordering-principle', HIGH, 'mcq', D, 'Does the set of positive rational numbers have a least element?', 'No, any positive rational q has q/2 below it', ['Yes, 1', 'Yes, 0', 'Yes, the smallest fraction'], 'well-ordering fails for ℚ⁺'),
  q('math.found.well-ordering-principle', HIGH, 'mcq', A, 'Which set has a least element by the well-ordering principle?', 'The positive multiples of 7', ['The negative integers', 'The real numbers above 2', 'The empty set'], 'a non-empty subset of ℕ'),

  q('math.found.writing-mathematics', HIGH, 'mcq', D, 'Which sentence is clearest?', '"Let n be an even integer. Then n = 2k for some integer k."', ['"n = 2k so even"', '"It is even because of the 2"', '"Even, so 2k, clearly"'], 'declare each variable and say what it is'),
  q('math.found.writing-mathematics', HIGH, 'mcq', A, 'What should a written proof end with?', 'A statement that the claim has been shown', ['The first assumption repeated', 'A list of examples', 'A new conjecture'], 'close the argument explicitly'),
]
