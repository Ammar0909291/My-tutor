# math.nt.induction-applications

## Identity
- **KG ID**: `math.nt.induction-applications`
- **Domain**: math.nt (Number Theory)
- **Requires**: `math.found.proof-by-induction`, `math.nt.divisibility`
- **Unlocks**: (none in current KG)
- **Cross-links**: none (KG lists none).
- **Difficulty**: proficient
- **Bloom level**: create
- **Mastery threshold**: 0.75 (⌈0.75×5⌉ = 4/5)
- **Estimated hours**: 8
- **Blueprint**: none found (`docs/curriculum/blueprints/math.nt.induction-applications.md` does not exist — verified by directory listing). Misconceptions authored directly via the birth-taxonomy diagnostic procedure.

## Learning Objective
The student will apply mathematical induction to construct original proofs of divisibility results, summation formulas, and inequalities about integers, correctly executing a genuine base case verification, an inductive step that actually invokes the inductive hypothesis, and — for divisibility claims specifically — algebraic manipulation structured to explicitly expose the claimed divisor.

## Core Understanding
Building on `math.found.proof-by-induction`'s general two-part structure (base case, inductive step) and `math.nt.divisibility`'s relation-based definition, applying induction to number-theoretic claims requires the SAME logical skeleton used for summation and inequality proofs, but divisibility proofs specifically demand an ADDITIONAL structural move: the inductive step's algebraic manipulation must be organized to explicitly FACTOR OUT the claimed divisor, showing the P(k+1) expression as a sum or product where each piece is visibly a multiple of the divisor — one piece coming directly from the inductive hypothesis P(k) (already known to be divisible), and any new piece independently shown divisible too. This differs from a typical summation-formula inductive step, which usually only requires algebraic simplification to confirm an equality, without needing to isolate a specific factor. Both the base case and the inductive step are equally mandatory: the base case genuinely verifies the smallest instance (never a formality to skip), and the inductive step must genuinely USE the assumed P(k) to derive P(k+1) — restating the claim for k+1 without actually invoking P(k) inside the derivation is not a valid inductive step at all, regardless of how the algebra is arranged.

## Mental Models
1. **The genuine-use-of-hypothesis model**: a valid inductive step must explicitly substitute or otherwise USE the assumed truth of P(k) somewhere inside the derivation of P(k+1) — an inductive step that merely restates the target claim for k+1 without that substitution is not a proof, no matter how algebraically correct the surrounding work looks.
2. **The base-case-is-not-optional model**: the base case is a genuine, necessary verification of the smallest instance of the claim, carrying exactly as much logical weight as the inductive step — skipping or trivializing it leaves the entire induction unanchored, since the inductive step alone only shows "if it's true for k, it's true for k+1," never establishing truth for any starting value.
3. **The expose-the-divisor model** (specific to divisibility proofs): unlike summation or inequality inductive steps, a divisibility inductive step must explicitly factor the P(k+1) expression into pieces that are each visibly multiples of the claimed divisor — one piece reusing the inductive hypothesis's already-established divisibility, and any remaining piece independently verified divisible.

## Why Students Fail
The dominant failure is writing an inductive step that never actually invokes the inductive hypothesis P(k) — instead simply re-deriving or restating the claim for k+1 independently, which provides no genuine logical link between consecutive cases and therefore proves nothing about the chain from the base case upward. A second failure is treating the base case as a mere formality, checking it quickly or skipping it, particularly risky for divisibility claims where an edge case (like n=0 or n=1) can behave differently from the general pattern. A third failure, specific to divisibility proofs, is carrying over the "just simplify algebraically" habit from summation-formula induction without recognizing that divisibility proofs require the additional, structurally distinct step of explicitly factoring out the divisor — leaving an unfactored expression whose divisibility isn't actually demonstrated, only asserted.

## Misconceptions
- **MC-1 — INDUCTIVE-HYPOTHESIS-NOT-ACTUALLY-USED-IN-INDUCTIVE-STEP** (FOUNDATIONAL)
  - **Statement**: The student writes an inductive step for P(k+1) that never substitutes or otherwise invokes the assumed P(k), effectively re-deriving the k+1 case from scratch rather than building it FROM the k case.
  - **Birth type**: Type 5, instruction-induced — induction's ritual phrasing ("assume P(k), show P(k+1)") can be performed as a formal template without the actual substitution step being enforced or checked, especially when the connection between P(k) and P(k+1) isn't algebraically obvious at a glance.
  - **Diagnostic probe**: Present a completed inductive-step write-up and ask the student to point to the exact line where P(k) is used; MC-1 shows as an inability to locate any such line, or a demonstration that the derivation would work identically even if P(k) were never assumed.
  - **Repair approach**: Require every inductive step to include an explicit, highlighted substitution line — "by the inductive hypothesis, [specific expression from P(k)] equals/is divisible by [specific value]" — making the genuine-use-of-hypothesis model (Mental Model 1) a checkable, visible requirement rather than an implicit expectation.

- **MC-2 — BASE-CASE-OMITTED-OR-TRIVIALIZED**
  - **Statement**: The student skips the base case entirely, or checks it with minimal or no genuine verification, treating it as a formality rather than a necessary logical anchor.
  - **Birth type**: Type 5, instruction-induced — instructional emphasis often concentrates on the inductive step (the more intellectually involved half), leaving the base case under-practiced as a genuine, careful check, especially once a student has done the base case correctly many times and begins to treat it as automatic.
  - **Diagnostic probe**: Ask the student to prove a divisibility claim by induction and observe whether the base case is verified with an actual computation or merely asserted ("clearly true for n=1"); MC-2 shows as the latter, with no explicit arithmetic check shown.
  - **Repair approach**: Reinforce the base-case-is-not-optional model (Mental Model 2) by requiring the base case to be verified with the SAME explicit computational rigor as any other step, treating a skipped or asserted-without-computation base case as an automatically incomplete proof regardless of how strong the inductive step is.

- **MC-3 — DIVISIBILITY-INDUCTIVE-STEP-NOT-STRUCTURED-TO-EXPOSE-THE-DIVISOR**
  - **Statement**: For a divisibility proof specifically, the student's inductive step performs correct algebraic simplification but never explicitly factors the resulting expression to show it as a multiple of the claimed divisor, leaving the divisibility conclusion asserted rather than demonstrated.
  - **Birth type**: Type 6, analogy overextension — the more common summation-formula and inequality inductive-step pattern (simplify algebraically until the target equality or inequality is visibly confirmed) is overextended by analogy onto divisibility proofs, which require the additional, structurally distinct move of factoring to expose the divisor, not merely simplifying to a numerically-equal expression.
  - **Diagnostic probe**: Present a divisibility inductive step (e.g., proving 3 | (n³ − n)) and ask the student to identify exactly which term in their final expression is being claimed as "the multiple of 3"; MC-3 shows as an inability to point to an explicitly factored term, only a simplified expression whose divisibility by 3 is asserted rather than visibly demonstrated.
  - **Repair approach**: Reinforce the expose-the-divisor model (Mental Model 3) by requiring every divisibility inductive step to end in a form explicitly written as "divisor × (some integer expression)" or "[a term already known divisible from P(k)] + [a new term shown divisible independently]," making the factoring step a mandatory, visible final move.

## Analogies
- **Domino-chain analogy** (Mental Model 1): induction is like knocking over a chain of dominoes — the base case is knocking over the first domino, and the inductive step is showing that EVERY domino, if it falls, knocks over the next one; an inductive step that doesn't actually reference the falling of domino k when explaining why domino k+1 falls is not actually demonstrating a chain reaction at all, just asserting each domino falls independently.

## Demonstrations
- A fully worked divisibility induction proof (e.g., 3 | (n³ − n) for all n ≥ 1), with the inductive step's algebra explicitly ending in a factored form showing both the reused P(k) term and any new term as multiples of 3, targeting MC-3.
- A side-by-side contrast of a genuine inductive step (explicitly substituting P(k)) against a "shadow" inductive step that independently re-derives P(k+1) without ever using P(k), making the difference concrete, targeting MC-1.

## Discovery Questions
1. "Where, specifically, in your inductive step's derivation, did you use the fact that P(k) is true?"
2. "Is your base case actually computed and checked, or just asserted as 'obviously true'?"
3. "For a divisibility proof, can you point to the exact factored term that shows your expression is a multiple of the divisor?"

## Teaching Sequence
1. Confirm `math.found.proof-by-induction`'s general skeleton and `math.nt.divisibility`'s relation-based definition are solid.
2. Reinforce the base-case-is-not-optional model (Mental Model 2) with explicit computational verification required for every base case, targeting MC-2.
3. Reinforce the genuine-use-of-hypothesis model (Mental Model 1) by requiring an explicit, highlighted substitution line in every inductive step, targeting MC-1.
4. Introduce the expose-the-divisor model (Mental Model 3) specifically for divisibility claims, contrasting it against the simplify-only pattern from summation proofs, targeting MC-3.
5. Practice a range of proof types (divisibility, summation, inequality) so students recognize which structural moves are universal (base case, hypothesis use) versus which are divisibility-specific (factoring to expose the divisor).

## Tutor Actions
- **DO: Worked Example** — the full 3 | (n³ − n) divisibility induction, ending in explicit factored form (targeting MC-3).
- **TEST-THINKING: Error Analysis** — the genuine-vs-shadow inductive step contrast (targeting MC-1).
- **ORGANIZE: Checklist** — require an explicit, computed base-case line and an explicit hypothesis-substitution line for every proof (targeting MC-2 and MC-1).
- **TEST-THINKING: Prediction** — before writing the inductive step, predict which term will need to be factored out to expose the divisor.

## Voice Teaching Notes
After any inductive step is written, ask "point to exactly where you used P(k)" as a standing, separate question — this habit directly targets MC-1 by requiring the substitution to be locatable, not merely assumed present.

## Assessment Signals
- **P76 (transfer probe)**: cross-link mode = independence (KG lists none). Present a novel divisibility claim (e.g., 6 | (n³ − n) for all n ≥ 1, extending the 3-divisibility example) and require a complete original proof, explicitly assessing genuine base-case verification, genuine hypothesis use, and explicit divisor-exposing factorization together.
- **P77 (mastery gate)**: 4/5 correct across a mixed set including at least one divisibility proof (targeting MC-3), one proof where the base case must be explicitly computed rather than asserted (targeting MC-2), and one item requiring the student to identify the exact hypothesis-use step in a given proof (targeting MC-1).

## Tutor Recovery Strategy
If MC-1 persists, regress to a fill-in-the-blank scaffold where the hypothesis-substitution line is left as an explicit blank the student must fill in before continuing, making the requirement structurally unavoidable, before allowing free-form proof writing.

## Memory Hooks
- "Find the exact line where you used P(k) — if you can't point to it, it isn't there."
- "The base case is a real check, not a formality — compute it, don't just assert it."
- "Divisibility proofs need one more move than summation proofs — factor out the divisor explicitly."

## Transfer Connections
- `math.found.proof-by-induction` (prerequisite) supplies the general two-part skeleton this concept specializes for number-theoretic claims.
- Later algebraic and combinatorial induction proofs (across mathematics) reuse the identical genuine-hypothesis-use and rigorous-base-case disciplines established here.

## Cross-Subject Connections
- Computer science: proving loop invariants and algorithm correctness (e.g., recursive algorithm termination and correctness proofs) directly reuses induction's base-case/inductive-step structure.

## Blueprint References
None — no Blueprint exists for `math.nt.induction-applications` (verified via directory listing).

## Runtime Asset References
None seeded yet in `src/lib/teaching/assets/` for this concept as of this entry's authoring date.

## Curriculum Feedback
None — the KG lists no cross-links for this concept, independently re-verified at authoring time.

## Version History
- v1.0 (2026-07-26): Initial authoring, Domain Certification Mode, math.nt Wave 3 part 2.
