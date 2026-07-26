# math.nt.general-diophantine

## Identity
- **KG ID**: `math.nt.general-diophantine`
- **Domain**: math.nt (Number Theory)
- **Requires**: `math.nt.linear-diophantine`
- **Unlocks**: none listed directly in the KG's `unlocks` field, though `math.nt.pells-equation` and `math.nt.pythagorean-triples` both list this concept in their own `requires`.
- **Cross-links**: `math.nt.algebraic-number-theory` (not yet authored — no Blueprint or Educational Brain entry exists; verified via directory listing; P76_mode = independence).
- **Difficulty**: expert
- **Bloom level**: analyze
- **Mastery threshold**: 0.65 (⌈0.65×5⌉ = 4/5)
- **Estimated hours**: 20
- **Blueprint**: none exists yet for this concept as of this entry's authoring date; misconceptions authored directly via the birth-taxonomy diagnostic procedure (`educational-brain/misconceptions/01-birth-types.md`).

## Learning Objective
The student will recognize that general (polynomial) Diophantine equations have no single unified solvability method comparable to the linear case's clean divisibility criterion, correctly identify that superficially similar polynomial equations can have radically different solvability behavior depending on structural details like exponent, and distinguish a genuine proof of non-existence of solutions from a mere failure to find solutions by search.

## Core Understanding
`math.nt.linear-diophantine` establishes a complete, clean solvability method for ax+by=c: solvable if and only if gcd(a,b) divides c, with an explicit construction and parametrization. General Diophantine equations — polynomial equations of degree 2 or higher in two or more unknowns — have NO comparable unified method. Behavior varies dramatically by structure: the equation x²+y²=z² (Pythagorean triples) has infinitely many integer solutions with an explicit parametrization, while x^n+y^n=z^n for any integer n>2 (Fermat's Last Theorem) has been PROVEN to have no nontrivial integer solutions at all — despite the two families of equations looking structurally similar (same variables, same additive form, only the exponent differs). Some solvable equations, like Pell's equation x²−dy²=1, have solutions that can be astronomically large, meaning exhaustive search would never find them even though solutions genuinely exist. Proving an equation has NO solutions (as with Fermat's Last Theorem) requires genuine mathematical proof — a very different kind of claim than merely failing to find a solution by trial.

## Mental Models
1. **The no-single-method model**: unlike the linear case, there is no universal test or construction that solves every polynomial Diophantine equation — each equation, or class of equations, may require its own dedicated technique.
2. **The exponent-changes-everything model**: equations that look almost identical except for their exponent can have completely different solvability — infinitely many solutions for one exponent, provably none for another.
3. **The search-failure-is-not-proof model**: failing to find a solution by trial never proves none exists; proving non-existence requires an actual mathematical argument, and some genuinely-solvable equations have solutions too large for any search to find.

## Why Students Fail
The foundational failure is assuming the clean gcd-divides-c method (or a Bézout-style construction) from linear-diophantine directly extends to general polynomial Diophantine equations, missing that no such uniform method exists once the degree rises above 1. A second failure is assuming that because one polynomial Diophantine equation is solvable, a superficially similar equation (differing only in exponent or a small structural detail) must behave the same way, missing that such changes can flip solvability entirely. A third failure is treating a failed search for solutions as proof that none exist, missing that genuine non-existence claims require mathematical proof, and that some solvable equations have solutions far too large for any search to discover.

## Misconceptions
Authored directly via the birth-taxonomy diagnostic procedure (no Blueprint exists for this concept):

- **GENERAL-DIOPHANTINE-ASSUMED-SOLVABLE-BY-LINEAR-METHODS** (FOUNDATIONAL)
  - **Description**: believing the same gcd-divides-c criterion (or Bézout-style construction) from `math.nt.linear-diophantine` directly extends to solve general polynomial Diophantine equations.
  - **Birth type**: Type 1, overgeneralization — the clean, complete method just mastered for the linear case creates an expectation that all Diophantine equations admit an equally clean, uniform method.
  - **Repair approach**: attempt to apply the linear divisibility test directly to a quadratic Diophantine equation (e.g. x²+y²=z²) and show it simply does not apply — no analogous single criterion exists.

- **DIOPHANTINE-SOLVABILITY-ASSUMED-UNIFORM-ACROSS-SIMILAR-EQUATIONS** (Foundational)
  - **Description**: believing that because one polynomial Diophantine equation is solvable, a structurally similar equation (e.g. differing only in exponent) must be solvable too.
  - **Birth type**: Type 6, analogy overextension — surface-level similarity in variables and form is used to predict solvability, missing that a change in exponent or structure can fundamentally alter the answer.
  - **Repair approach**: contrast x²+y²=z² (infinitely many integer solutions, e.g. 3,4,5) directly against x³+y³=z³ (provably no nontrivial integer solutions, a case of Fermat's Last Theorem), naming this as the single most famous instance of this exact misconception being wrong.

- **DIOPHANTINE-EQUATION-NO-SOLUTIONS-FOUND-ASSUMED-EQUIVALENT-TO-PROVEN-UNSOLVABLE** (Moderate)
  - **Description**: believing that failing to find integer solutions by trial search proves an equation has none, missing that genuine non-existence claims require mathematical proof, and that some solvable equations have solutions too large to find by search.
  - **Birth type**: Type 1, overgeneralization — the "search works, just slowly" framing that correctly describes trial division in `math.nt.primality-testing` is inappropriately carried over into a domain where exhaustive search is not a valid method for proving non-existence at all.
  - **Repair approach**: name Pell's equation as a case where genuine solutions exist but can be astronomically large, contrasted directly against Fermat's Last Theorem's centuries-long genuine PROOF of non-existence — neither outcome is ever established by search alone.

## Analogies
- **The no-master-key framing**: linear-diophantine gave you a master key that opens every lock of its type; general Diophantine equations are a room full of different locks, each possibly needing its own key — or possibly having no key at all.

## Demonstrations
- Attempting to apply the linear divisibility test to x²+y²=z², showing it simply does not transfer.
- Contrasting x²+y²=z² (infinitely many solutions, e.g. 3-4-5) against x³+y³=z³ (Fermat's Last Theorem, provably none), targeting the similar-equations misconception.
- Naming Pell's equation's astronomically large solutions alongside Fermat's Last Theorem's genuine non-existence proof, targeting the search-equals-proof misconception.

## Discovery Questions
1. "Does the divisibility test that worked for ax+by=c also work for x²+y²=z²?"
2. "If x²+y²=z² has solutions, does x³+y³=z³ have to have solutions too?"
3. "If you search and search and never find a solution, does that prove there isn't one?"

## Teaching Sequence
1. Attempt to apply linear-diophantine's method to a quadratic equation, showing it fails to transfer.
2. Contrast the Pythagorean-triple case (solvable) against Fermat's Last Theorem's case (provably unsolvable), targeting the similar-equations misconception.
3. Distinguish search failure from genuine non-existence proof, using Pell's equation and Fermat's Last Theorem as contrasting cases.
4. Mastery gate: classify given equations as "has a known clean method," "known solvable/unsolvable by deep theorem," or "genuinely open," and justify.

## Tutor Actions
- **TEST-THINKING: Error Analysis** — attempting the linear divisibility test on a quadratic equation, showing it fails.
- **TEST-THINKING: Error Analysis** — contrasting Pythagorean triples against Fermat's Last Theorem, targeting the similar-equations misconception.
- **TELL: Explanation** — the distinction between search failure and mathematical proof of non-existence.
- **ORGANIZE: Concept Map** — classifying named Diophantine equations by known solvability status.

## Voice Teaching Notes
When a student predicts solvability from a superficially similar equation, ask "does changing this one detail actually change everything?" as a standing check directly targeting the similar-equations misconception.

## Assessment Signals
- **Transfer probe (independence mode — cross-link `math.nt.algebraic-number-theory` not yet authored)**: "A student argues that since x²+y²=z² has infinitely many integer solutions, x⁴+y⁴=z⁴ must also have infinitely many. Using Fermat's Last Theorem, explain precisely why this reasoning fails."
- **Mastery gate (4-item problem set)**: (1) explain why the linear divisibility test cannot be applied directly to x²+y²=z²; (2) name one solvable and one provably-unsolvable polynomial Diophantine equation family; (3) explain why searching without success does not prove an equation has no solutions; (4) explain, at a high level, why Pell's equation's solutions can be very large yet still genuinely exist. MAMR 4/5.

## Tutor Recovery Strategy
If the similar-equations misconception persists, require the student to state explicitly, for any two polynomial Diophantine equations being compared, exactly which structural feature differs (exponent, number of variables, coefficients) before predicting whether their solvability should match.

## Memory Hooks
- "No master key here — each equation may need its own method, or have none."
- "Same shape, different exponent — solvability can flip completely."
- "Not finding a solution isn't proof there isn't one."

## Transfer Connections
- `math.nt.pythagorean-triples` (a child concept, requires this concept) is the solvable case this concept's contrast relies on.
- `math.nt.pells-equation` (a child concept, requires this concept) is the astronomically-large-solutions case this concept's search-versus-proof distinction relies on.

## Cross-Subject Connections
- Computer science: the undecidability of general Diophantine equation solvability (Hilbert's Tenth Problem) connects directly to computability theory.

## Blueprint References
None — no Blueprint exists for this concept as of this entry's authoring date.

## Runtime Asset References
None seeded yet in `src/lib/teaching/assets/` for this concept as of this entry's authoring date.

## Curriculum Feedback
The KG's `unlocks` field is empty for this concept even though `math.nt.pells-equation` and `math.nt.pythagorean-triples` both list it in their own `requires` — a data asymmetry noted for completeness, not corrected (no KG file modified this batch).

## Version History
- v1.0 (2026-07-26): Initial authoring, Domain Certification Mode, math.nt Wave 7.
