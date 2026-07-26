# math.nt.divisibility

## Identity
- **KG ID**: `math.nt.divisibility`
- **Domain**: math.nt (Number Theory)
- **Requires**: `math.arith.division`, `math.found.integers`
- **Unlocks**: `math.nt.prime-number`, `math.nt.gcd`, `math.nt.lcm`
- **Cross-links**: `math.abst.ring-theory` — confirmed a Blueprint EXISTS (`docs/curriculum/blueprints/math.abst.ring-theory.md`) — Tier 1 cross-link probe engaging `math.abst.ring-theory`, per the Blueprint's own GR-9/GR-11 declaration.
- **Difficulty**: developing
- **Bloom level**: understand
- **Mastery threshold**: 0.85 (⌈0.85×5⌉ = 5/5)
- **Estimated hours**: 5
- **Blueprint**: `docs/curriculum/blueprints/math.nt.divisibility.md` (reused by reference throughout this entry).

## Learning Objective
The student will determine whether an integer a divides an integer b (written a|b) by finding a witnessing integer k such that b = ak, correctly state divisibility's properties (reflexive, transitive, NOT symmetric), and correctly distinguish the divisibility relation (a|b, a true/false claim) from the division operation (a÷b, a number).

## Core Understanding
Per the Blueprint's Component 1: for integers a and b (a ≠ 0), a divides b — written a|b — precisely when there exists an integer k such that b = a×k. This is fundamentally a RELATION (a claim that is TRUE or FALSE), not an OPERATION (which produces a number) — a distinction the notation itself makes easy to blur, since the vertical bar | visually resembles the division and fraction symbols. Divisibility is reflexive (a|a always, since a = a×1) and transitive (a|b and b|c together imply a|c), but critically NOT symmetric — 4|12 is true, but 12|4 is false, since 4 = 12×k has no integer solution for k. The definition extends naturally to negative integers (witnessing k may itself be negative) and to zero (a|0 holds for every nonzero a, via k=0; but 0 can never be a divisor, since 0×k = 0 can never equal any nonzero b).

## Mental Models
1. **The tiling model** (Blueprint TA-A01): a divides b exactly when tiles of length a fit a hallway of length b with no gaps or overhangs — the number of tiles used is the witnessing integer k.
2. **The relation-vs-operation model** (Blueprint TA-A03): a|b is a claim (TRUE or FALSE) about whether an exact fit exists; a÷b is a computation that always produces a number, even when that number isn't an integer — 4|12 is TRUE, but 4|12 is never itself equal to "3."
3. **The flows-from-smaller-to-larger model** (Blueprint TA-B02): divisibility is directional — if a divides b and a is smaller in magnitude, b generally cannot also divide a, since that would require the "flow" to reverse into a fractional witnessing value.

## Why Students Fail
Per the Blueprint's Component 2: the foundational and most consequential failure is reading the notation a|b as if it meant the division operation a÷b, conflating a true/false relation with a numeric computation — a confusion the visual similarity between | and ÷ actively invites. A second failure is assuming divisibility is symmetric (if a|b then b|a), an intuitive but incorrect carryover from multiplication's own commutativity. A third failure is restricting the definition to positive integers only, missing that negative divisors work identically (with a negative witnessing k) and that a|0 holds for every nonzero a, even though 0 itself can never serve as a divisor.

## Misconceptions
Reused by reference from the Blueprint's Component 2 Misconception Registry, with birth-type classification added:

- **MC-1 — DIVISIBILITY-CONFUSED-WITH-DIVISION** (FOUNDATIONAL)
  - **Blueprint description**: reads "4|12" as "4 divided by 12" giving 1/3, or treats "a|b" as equivalent to computing the quotient — confuses a relation (true/false) with an operation (produces a number).
  - **Birth type**: Type 4, notation-induced — the vertical bar | is visually similar to the division operator ÷ and the fraction bar /, inviting a reading confusion that has nothing to do with the underlying mathematical concept.
  - **Repair approach**: Blueprint Repair Action B01 — the explicit "never read | as ÷" notation key, reinforced with the relation-vs-operation contrast (Blueprint TA-A03).

- **MC-2 — DIVISIBILITY-SYMMETRIC** (see Blueprint Component 2)
  - **Blueprint description**: concludes that if 4|12 then 12|4; ignores that b=ak requires k∈ℤ, which fails when b>a.
  - **Birth type**: Type 6, analogy overextension — multiplication's genuine commutativity (a×b = b×a) is overextended by analogy onto divisibility, which is a directional relation built FROM multiplication but does not inherit its symmetry.
  - **Repair approach**: Blueprint Repair Action B02 — direct verification that 4=12×k has no integer solution, grounded in the flows-from-smaller-to-larger model (Mental Model 3).

- **MC-3 — DIVISIBILITY-RESTRICTED-TO-POSITIVES** (see Blueprint Component 2)
  - **Blueprint description**: refuses to apply divisibility to negative integers (e.g., does not recognize (−3)|12) or fails to see that a|0 holds for all nonzero a.
  - **Birth type**: Type 1, overgeneralization — early divisibility examples are typically drawn from small positive integers, and the definition's genuine scope (all integers, via `math.found.integers`) is overlooked in favor of the narrower positive-only pattern actually practiced.
  - **Repair approach**: Blueprint Repair Action B03 — direct verification with a negative witnessing k ((−3)|12 via k=−4) and the a|0-always-true, 0|b-never-true asymmetry made explicit.

## Analogies
- **Hallway-tiling analogy** (Blueprint TA-A01): tiles of a given length either fit a hallway exactly (divisibility holds) or leave a gap (divisibility fails) — directly grounding the existential "some integer k" definition in a physical fitting process.

## Demonstrations
- The three-representation table (Blueprint TA-A02): concrete tiling, procedural division-with-remainder-zero, and the formal existential statement, all for the same fact (4|12).
- The side-by-side relation-vs-operation contrast (Blueprint TA-A03): "4|12 → TRUE" versus "12÷4 → 3," making the type distinction (truth value vs. number) visually explicit.
- The reflexive/transitive/not-symmetric pattern-induction set (Blueprint TA-A04), directly targeting MC-2 among the three properties demonstrated.

## Discovery Questions
1. "When you write '4|12,' are you asking a yes/no question, or computing a number?"
2. "If 4 divides 12, does that automatically mean 12 divides 4? Check directly."
3. "Does the definition of divisibility only work for positive numbers, or does it work for negative integers and zero too?"

## Teaching Sequence
Follows the Blueprint's Component 4 exactly: TA-A01 (the tiling analogy, concrete exact-fit check) → TA-A02 (three-representation shift: concrete, procedural, formal) → TA-A03 (relation-vs-operation contrast) → TA-A04 (properties via pattern induction: reflexive, transitive, not symmetric, divisibility of zero) → TA-A05 (Mastery Gate, P91).

## Tutor Actions
- **SHOW: Analogy** — the hallway-tiling exact-fit model (Blueprint TA-A01).
- **ORGANIZE: Representation Table** — the concrete/procedural/formal three-representation shift (Blueprint TA-A02).
- **TEST-THINKING: Error Analysis** — the relation-vs-operation contrast, directly targeting MC-1 (Blueprint TA-A03).
- **DO: Pattern Induction** — the reflexive/transitive/not-symmetric property set (Blueprint TA-A04).

## Voice Teaching Notes
Always read "a|b" aloud as "a divides b," never as "a divided by b" — this single consistent verbal habit, established explicitly in the Blueprint's Teaching Notes, is the single highest-leverage move against MC-1 in ordinary conversational teaching.

## Assessment Signals
- **P76 (transfer probe, Tier 1 cross-link mode, engaging `math.abst.ring-theory`)**: reused verbatim from the Blueprint's Component 4 A05 — the polynomial-ring divisibility extension (does (x−1) divide x²−1? does (x−1) divide x²+1?), demonstrating the same existential definition generalizes far beyond arithmetic.
- **P77 (mastery gate)**: the Blueprint's 4-item problem set (Component 4 A05), MAMR 5/5.

## Tutor Recovery Strategy
If MC-1 persists after the notation-key correction, regress to exclusively verbal, symbol-free practice ("does 4 divide 12?" answered yes/no, no | symbol shown at all) until the relation concept is solid independent of notation, before reintroducing the | symbol.

## Memory Hooks
- "The bar means 'divides' — never read it as 'divided by.'"
- "Divisibility flows one way — small into big, not automatically back."
- "Every nonzero number divides zero — but zero divides nothing."

## Transfer Connections
- `math.nt.prime-number` (unlocks) defines primality directly in terms of which divisors an integer has.
- `math.nt.gcd` and `math.nt.lcm` (unlocks) are both defined directly using the divisibility relation established here.

## Cross-Subject Connections
- Computer science: divisibility checks and modular arithmetic are foundational to hashing, cryptography, and checksum algorithms.

## Blueprint References
`docs/curriculum/blueprints/math.nt.divisibility.md` — all worked examples, contrasts, teaching actions, and the P76/P77 assessment items reused by reference, not restated in full.

## Runtime Asset References
None seeded yet in `src/lib/teaching/assets/` for this concept as of this entry's authoring date.

## Curriculum Feedback
None — the Blueprint's own cross-link finding (`math.abst.ring-theory`, Tier 1, Blueprint exists) was independently re-verified via directory listing at authoring time and remains accurate. This is the first concept authored in `math.nt`, a genuine cross-domain step taken specifically to unblock `math.arith`'s two remaining concepts (`fraction-simplification`, `fraction-addition`), which require `math.nt.gcd`/`math.nt.lcm` respectively — both of which require this concept as a prerequisite.

## Version History
- v1.0 (2026-07-26): Initial authoring, Domain Certification Mode, math.nt Wave 1 (cross-domain step to unblock math.arith).
