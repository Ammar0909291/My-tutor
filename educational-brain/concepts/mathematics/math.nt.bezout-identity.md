# math.nt.bezout-identity

## Identity
- **KG ID**: `math.nt.bezout-identity`
- **Domain**: math.nt (Number Theory)
- **Requires**: `math.nt.extended-euclidean-algorithm`, `math.nt.gcd`
- **Unlocks**: `math.nt.linear-diophantine`
- **Cross-links**: none (KG lists none).
- **Difficulty**: proficient
- **Bloom level**: understand
- **Mastery threshold**: 0.8 (⌈0.8×5⌉ = 4/5)
- **Estimated hours**: 4
- **Blueprint**: none exists yet for this concept as of this entry's authoring date; misconceptions authored directly via the birth-taxonomy diagnostic procedure (`educational-brain/misconceptions/01-birth-types.md`).

## Learning Objective
The student will state Bézout's Identity precisely — for ANY integers a and b, there exist integers x,y such that ax+by=gcd(a,b) — recognize this as a general existence theorem holding for every integer pair, not merely coprime ones, correctly identify that x and y need not be positive, and distinguish the theorem's role (an existence statement) from the Extended Euclidean Algorithm's role (the constructive method that proves and computes it).

## Core Understanding
Bézout's Identity states: for any integers a and b (not both zero), there exist integers x,y such that ax+by=gcd(a,b) — a cornerstone existence theorem of elementary number theory. Critically, this holds for EVERY pair of integers a,b, not merely pairs that happen to be coprime — the coprime case (gcd(a,b)=1, so ax+by=1) is simply the most frequently-USED special case, for instance in constructing modular inverses, but the theorem itself makes no coprimality requirement. The theorem also places no positivity constraint on x and y — the coefficients that satisfy the identity are frequently negative (as `math.nt.extended-euclidean-algorithm`'s own worked example demonstrates: gcd(252,105)=21=252(−2)+105(5)). The theorem is an EXISTENCE claim — it guarantees such x,y exist, without itself specifying how to find them; the CONSTRUCTIVE proof and the actual computation method belong to `math.nt.extended-euclidean-algorithm`'s backward-substitution procedure (already mastered), which this concept deliberately does not re-derive.

## Mental Models
1. **The general-not-special-case model**: the identity ax+by=gcd(a,b) holds for every integer pair a,b — the coprime case (gcd=1) is one common instance, not the whole theorem.
2. **The unsigned-coefficients model**: x and y are simply "some integers" — positive, negative, or zero — with no sign guarantee built into the theorem.
3. **The statement-versus-method model**: this concept states THAT x,y exist (existence); the Extended Euclidean Algorithm shows HOW to find them (construction) — two distinct roles for two distinct concepts.

## Why Students Fail
The foundational failure is restricting the theorem's scope to coprime integer pairs (ax+by=1), overgeneralizing from the modular-inverse application (which specifically needs gcd(a,n)=1) to the theorem itself, which holds for any gcd value. A second failure is assuming the coefficients x,y guaranteed by the theorem must be positive, since "linear combination" language perceptually suggests an additive, positive-weighted combination. A third failure is treating this concept as teaching a brand-new computational method for finding x,y, rather than recognizing it as the existence statement that `math.nt.extended-euclidean-algorithm`'s already-mastered backward-substitution procedure constructively proves and computes.

## Misconceptions
Authored directly via the birth-taxonomy diagnostic procedure (no Blueprint exists for this concept):

- **BEZOUT-IDENTITY-ASSUMED-TO-REQUIRE-COPRIME-INTEGERS** (FOUNDATIONAL)
  - **Description**: believing ax+by=gcd(a,b) only holds when gcd(a,b)=1, restricting the general theorem to its most commonly-used special case.
  - **Birth type**: Type 6, analogy overextension — the coprime case is so frequently the one actually USED (constructing modular inverses, where gcd(a,n)=1 is required), that this familiar special case is over-applied as if it defined the theorem's entire scope.
  - **Repair approach**: present a non-coprime example directly (e.g. a=12,b=18, gcd=6: 12(−1)+18(1)=6), verifying the identity holds with gcd=6, not 1, re-anchoring on "the theorem gives you the GCD, whatever it is — coprimality is not required."

- **BEZOUT-COEFFICIENTS-ASSUMED-POSITIVE** (Foundational)
  - **Description**: believing the integers x,y guaranteed by the theorem must be positive, since "combination" language perceptually suggests positive-weighted contributions.
  - **Birth type**: Type 2, perceptual intuition — everyday "combination" or "combining amounts" language carries a positive-quantities connotation, which is silently carried into the mathematical statement despite the theorem making no such restriction.
  - **Repair approach**: reuse `math.nt.extended-euclidean-algorithm`'s own worked example directly (gcd(252,105)=21=252(−2)+105(5)) as immediate, already-familiar evidence that negative coefficients are standard, not exceptional.

- **BEZOUT-IDENTITY-TREATED-AS-A-NEW-COMPUTATIONAL-METHOD-RATHER-THAN-AN-EXISTENCE-STATEMENT** (Moderate)
  - **Description**: believing this concept introduces a new way to compute x,y beyond what `math.nt.extended-euclidean-algorithm` already teaches, missing that this concept is the existence theorem that algorithm constructively proves.
  - **Birth type**: Type 5, instruction-induced — the two concepts are taught back-to-back and share nearly identical subject matter (the same equation, the same coefficients), inviting the two distinct roles (statement vs. method) to blur into a single perceived topic.
  - **Repair approach**: state explicitly, "you already know HOW to find x,y — that's the Extended Euclidean Algorithm. This concept tells you WHY you're guaranteed such x,y exist in the first place, for ANY integers a,b."

## Analogies
- **The guarantee-versus-recipe analogy**: Bézout's Identity is the guarantee that a solution exists — the Extended Euclidean Algorithm is the recipe for finding it — two different things a cook needs (knowing a dish is possible to make, versus the steps to make it).

## Demonstrations
- Verifying the identity for a non-coprime pair, a=12,b=18 (gcd=6): 12(−1)+18(1)=6, directly refuting the coprime-only misconception.
- Reusing `math.nt.extended-euclidean-algorithm`'s own worked example (gcd(252,105)=21=252(−2)+105(5)) to demonstrate standard negative coefficients.
- Contrasting the theorem's existence claim ("x,y exist") against the algorithm's constructive output (the specific x,y values), naming each role explicitly.

## Discovery Questions
1. "Does Bézout's Identity only work when a and b share no common factors, or does it work for any two integers?"
2. "Do the integers x and y guaranteed by the theorem have to be positive?"
3. "Is this a new way to compute x and y, or does it tell you something you can already compute using a method you know?"

## Teaching Sequence
1. State the general theorem (any integers a,b, not just coprime pairs) and verify directly on the non-coprime example, targeting the coprime-only misconception.
2. Reuse the Extended Euclidean Algorithm's own gcd(252,105) example to show standard negative coefficients, targeting the positive-coefficients misconception.
3. Explicitly separate the theorem's existence role from the algorithm's constructive role, targeting the new-method misconception.
4. Mastery gate: verify the identity on a fresh integer pair (own gcd computation), explain why negative coefficients are unsurprising, and state in one sentence how this concept relates to the Extended Euclidean Algorithm.

## Tutor Actions
- **TELL: Explanation** — the general theorem statement, holding for any integer pair, not just coprime ones.
- **TEST-THINKING: Error Analysis** — verifying the identity on a non-coprime example (a=12,b=18), targeting the coprime-only misconception.
- **SHOW: Demonstration** — reusing the Extended Euclidean Algorithm's own worked example to normalize negative coefficients.
- **ORGANIZE: Concept Map** — explicitly separating "existence theorem" (this concept) from "constructive method" (Extended Euclidean Algorithm).

## Voice Teaching Notes
When a student states Bézout's Identity, ask "does that need a and b to be coprime?" as a standing verbal check — a fast probe directly targeting the coprime-only misconception before it calcifies.

## Assessment Signals
- **Transfer probe (independence mode — no cross-link target listed in the KG for this concept)**: "A student claims that Bézout's Identity only applies when two integers share no common factors, since that's the case they've seen used to build modular inverses. Using a non-coprime example of your choosing, verify the identity directly and explain what's wrong with the student's claim."
- **Mastery gate (4-item problem set)**: (1) verify the identity for a=8,b=12 (gcd=4), finding specific x,y; (2) explain why x,y need not be positive, citing a specific example; (3) state the theorem in your own words without referencing coprimality; (4) explain, in one sentence, how this concept's existence claim relates to the Extended Euclidean Algorithm's computational output. MAMR 4/5.

## Tutor Recovery Strategy
If the coprime-only misconception persists, require the student to verify the identity directly on three different non-coprime pairs of their own choosing before accepting any restated version of the theorem as correct.

## Memory Hooks
- "Bézout's Identity works for ANY two integers — coprime or not."
- "x and y can be negative — that's completely standard, not an error."
- "This concept is the promise; the Extended Euclidean Algorithm is how you keep it."

## Transfer Connections
- `math.nt.extended-euclidean-algorithm` (requires) supplies the constructive proof and computation method for the x,y this theorem guarantees exist.
- `math.nt.linear-diophantine` (unlocks) directly uses Bézout's Identity to determine when a linear Diophantine equation has integer solutions.

## Cross-Subject Connections
- Computer science / cryptography: Bézout's Identity underlies the correctness argument for modular-inverse-based cryptographic key operations.

## Blueprint References
None — no Blueprint exists for this concept as of this entry's authoring date.

## Runtime Asset References
None seeded yet in `src/lib/teaching/assets/` for this concept as of this entry's authoring date.

## Curriculum Feedback
None found at authoring time.

## Version History
- v1.0 (2026-07-26): Initial authoring, Domain Certification Mode, math.nt Wave 5 part 2.
