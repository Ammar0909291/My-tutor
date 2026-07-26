# math.nt.residue-classes

## Identity
- **KG ID**: `math.nt.residue-classes`
- **Domain**: math.nt (Number Theory)
- **Requires**: `math.nt.congruence`
- **Unlocks**: `math.abst.quotient-ring`
- **Cross-links**: `math.abst.quotient-ring` (not yet authored — no Blueprint or Educational Brain entry exists; verified via directory listing; P76_mode = independence).
- **Difficulty**: proficient
- **Bloom level**: analyze
- **Mastery threshold**: 0.8 (⌈0.8×5⌉ = 4/5)
- **Estimated hours**: 5
- **Blueprint**: none exists yet for this concept as of this entry's authoring date; misconceptions authored directly via the birth-taxonomy diagnostic procedure (`educational-brain/misconceptions/01-birth-types.md`).

## Learning Objective
The student will treat a residue class [a] as an infinite set of integers (not a single integer), correctly recognize that residue-class arithmetic is well-defined independent of which representative is chosen from each class, and determine when the n residue classes modulo n form a full field (n prime) versus merely a ring (n composite).

## Core Understanding
The n residue classes {[0],[1],...,[n−1]} modulo n form a ring Z/nZ under addition and multiplication defined class-wise: [a]+[b]=[a+b] and [a]×[b]=[a×b]. This concept builds directly on `math.nt.congruence`'s own Partition Theorem result (Z partitions into exactly n residue classes) but studies the genuinely NEW content of what ALGEBRAIC STRUCTURE those classes form. Critically, arithmetic on residue classes is well-defined: choosing ANY representative integer from [a] and ANY representative from [b] and adding (or multiplying) them ordinarily always lands in the SAME resulting class — the operation does not depend on which representative was picked. Z/nZ is always a ring (satisfying the ring axioms uniformly), but it is a FIELD (every nonzero class has a multiplicative inverse) specifically and only when n is prime — for composite n, some nonzero classes genuinely lack a multiplicative inverse.

## Mental Models
1. **The class-is-a-set model**: [a] denotes an infinite SET of integers all congruent to a mod n — not the single integer a itself.
2. **The representative-independence model**: residue-class arithmetic gives the same answer no matter which specific integer is chosen to represent each class — the operation is well-defined on classes, not on the particular numbers used to compute it.
3. **The ring-versus-field model**: the ring structure holds uniformly for every modulus n, but the STRONGER field property (every nonzero class invertible) holds only when n is prime.

## Why Students Fail
The foundational failure is conflating a residue class [a] with the single integer a, treating class arithmetic as if it were ordinary integer arithmetic on one representative rather than an operation on an infinite set. A second failure is believing residue-class arithmetic could give different results depending on which representative integer is chosen from each class, missing that the operation is genuinely well-defined regardless of representative. A third failure is believing Z/nZ is always a field for any modulus n, missing that it is a field specifically when n is prime and merely a ring (with some non-invertible nonzero classes) when n is composite.

## Misconceptions
Authored directly via the birth-taxonomy diagnostic procedure (no Blueprint exists for this concept):

- **RESIDUE-CLASS-CONFLATED-WITH-A-SINGLE-INTEGER** (FOUNDATIONAL)
  - **Description**: treating a residue class [a] as if it were the single integer a, rather than an infinite set of integers all congruent to a mod n.
  - **Birth type**: Type 4, notation-induced — the bracket notation [a] is frequently dropped in casual computation (writing "3+5=8" rather than "[3]+[5]=[8]"), blurring the class/representative distinction the notation exists to preserve.
  - **Repair approach**: explicitly list several distinct integers belonging to the same class (e.g. [3] mod 5 contains ...,−7,−2,3,8,13,...) before performing any class arithmetic, re-anchoring on "the bracket denotes a whole set, not one number."

- **RESIDUE-CLASS-ARITHMETIC-ASSUMED-TO-DEPEND-ON-CHOSEN-REPRESENTATIVE** (Foundational)
  - **Description**: believing that computing [a]+[b] using different representative integers from the same classes could give a genuinely different resulting class.
  - **Birth type**: Type 2, perceptual intuition — since ordinary arithmetic depends critically on which specific numbers are used, it feels intuitive that swapping representatives might change the outcome, even though the class-level result is fixed.
  - **Repair approach**: compute [3]+[5] mod 7 using the representatives (3,5) and again using (10,12) (both congruent to 3 and 5 respectively mod 7), verifying both give the identical resulting class [1].

- **Z-NZ-ASSUMED-ALWAYS-A-FIELD-REGARDLESS-OF-N** (Moderate)
  - **Description**: believing Z/nZ is always a field (every nonzero class invertible) for any modulus n, missing that this holds specifically when n is prime.
  - **Birth type**: Type 1, overgeneralization — the ring axioms (addition, multiplication, associativity, distributivity) are verified to hold uniformly for every n, and this uniformity is mistakenly extended to the stronger field property, which genuinely fails for composite n (directly connecting to `math.nt.modular-arithmetic`'s own finding that some nonzero residues lack inverses under composite moduli).
  - **Repair approach**: contrast Z/5Z (prime modulus, every nonzero class invertible, a field) directly against Z/6Z (composite modulus, [2] has no multiplicative inverse, a ring but not a field), citing `math.nt.modular-arithmetic`'s own exhaustive-search evidence.

## Analogies
- **The bucket-of-numbers analogy**: a residue class is like a bucket holding infinitely many integers that all "look the same" under the modulus — picking any one item from the bucket to compute with gives the same bucket as the answer.

## Demonstrations
- Listing several distinct integers in the class [3] mod 5, refuting the single-integer conflation.
- Computing [3]+[5] mod 7 using two different representative pairs, both landing on [1], demonstrating representative-independence.
- Contrasting Z/5Z (a field) against Z/6Z (a ring but not a field), citing `math.nt.modular-arithmetic`'s own inverse-existence finding.

## Discovery Questions
1. "Is [a] a single number, or a whole collection of numbers?"
2. "If you pick a different representative from each class, could the sum come out differently?"
3. "Is Z/nZ always a field, or does that depend on whether n is prime?"

## Teaching Sequence
1. Establish the class-is-a-set model by listing several members of one residue class.
2. Verify representative-independence directly by computing the same class sum using two different representative pairs.
3. Contrast a prime-modulus field (Z/5Z) against a composite-modulus ring-but-not-field (Z/6Z), citing modular-arithmetic's own evidence.
4. Mastery gate: given a modulus, classify whether the resulting structure is a field or merely a ring, and justify using the prime/composite distinction.

## Tutor Actions
- **SHOW: Demonstration** — listing multiple members of one residue class, refuting the single-integer conflation.
- **DO: Worked Example** — computing a class sum via two different representative pairs, confirming the same result.
- **TEST-THINKING: Error Analysis** — contrasting Z/5Z (field) against Z/6Z (ring, not field), citing modular-arithmetic's own finding.
- **ORGANIZE: Concept Map** — mapping which moduli give fields versus mere rings.

## Voice Teaching Notes
When a student writes a residue-class computation without brackets, ask "are you talking about one number, or the whole class?" as a standing check directly targeting the single-integer conflation.

## Assessment Signals
- **Transfer probe (independence mode — cross-link `math.abst.quotient-ring` not yet authored)**: "Explain why Z/7Z is a field but Z/8Z is not, using the same evidence style `math.nt.modular-arithmetic` used to check for multiplicative inverses."
- **Mastery gate (4-item problem set)**: (1) list 4 distinct integers in the class [2] mod 9; (2) compute [4]+[6] mod 9 using two different representative pairs, confirming the same result; (3) determine whether Z/11Z is a field, justifying via primality; (4) determine whether Z/12Z is a field, identifying a specific nonzero class with no multiplicative inverse. MAMR 4/5.

## Tutor Recovery Strategy
If the single-integer conflation persists, require the student to write the full bracket notation for every class mentioned in a problem before performing any arithmetic, until the set/representative distinction becomes automatic.

## Memory Hooks
- "A residue class is a bucket of numbers, not just one number."
- "Any representative you pick gives the same answer — the class doesn't care which one you use."
- "Field only when n is prime — otherwise it's just a ring."

## Transfer Connections
- `math.abst.quotient-ring` (unlocks) generalizes this concept's ring structure to arbitrary quotient constructions.
- `math.nt.modular-arithmetic` (requires' sibling) supplies the inverse-existence evidence this concept's ring-versus-field distinction directly reuses.

## Cross-Subject Connections
- Computer science: hash-table bucketing and checksum algorithms rely on residue-class structure for efficient, well-defined arithmetic.

## Blueprint References
None — no Blueprint exists for this concept as of this entry's authoring date.

## Runtime Asset References
None seeded yet in `src/lib/teaching/assets/` for this concept as of this entry's authoring date.

## Curriculum Feedback
None found at authoring time.

## Version History
- v1.0 (2026-07-26): Initial authoring, Domain Certification Mode, math.nt Wave 6 part 2.
