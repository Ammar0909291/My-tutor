# math.arith.order-of-operations

## Identity
- **KG ID**: `math.arith.order-of-operations`
- **Domain**: math.arith (Arithmetic)
- **Requires**: `math.arith.addition`, `math.arith.subtraction`, `math.arith.multiplication`, `math.arith.division`
- **Unlocks**: `math.alg.expression`
- **Cross-links**: none (KG lists none; Blueprint confirms).
- **Difficulty**: developing
- **Bloom level**: apply
- **Mastery threshold**: 0.9 (⌈0.9×5⌉ = 5/5)
- **Estimated hours**: 5
- **Blueprint**: `docs/curriculum/blueprints/math.arith.order-of-operations.md` (reused by reference throughout this entry).

## Learning Objective
The student will correctly evaluate multi-operation arithmetic expressions by applying the four-tier precedence hierarchy (Parentheses, Exponents, Multiplication/Division left-to-right, Addition/Subtraction left-to-right), recognizing that the same-tier rule is strictly left-to-right and that parentheses always override the default hierarchy.

## Core Understanding
Per the Blueprint's Component 1: when an expression contains multiple operations, its value is uniquely determined by a precedence hierarchy — PEMDAS — not by reading the expression as an equal-priority left-to-right list. Without this shared convention, the same expression could be read multiple ways and yield different values; PEMDAS exists precisely to eliminate that ambiguity. Two subtleties matter most: (1) multiplication and division share one precedence tier, as do addition and subtraction, and within a shared tier the rule is strictly left-to-right (never "multiplication before division" or "addition before subtraction" as separate priorities); (2) parentheses are a genuine override — the same numbers and symbols, with one set of parentheses added or moved, can produce a completely different value.

## Mental Models
1. **The recipe-steps model** (Blueprint TA-A01, P03 Analogy Bridge): a baking recipe's steps must be followed in a set order (mix before bake, bake before frost) — order of operations works the same way: each tier must be completed before the next, regardless of where the operations appear in the expression written left to right.
2. **The four-tier ladder model**: Parentheses > Exponents > (Multiplication/Division, left-to-right) > (Addition/Subtraction, left-to-right) — a strict ladder, not a flat sequence.
3. **The override model**: parentheses don't just "come first" as one more tier — they actively pull whatever they contain out of the normal hierarchy and force it to be computed before anything else touches it.

## Why Students Fail
The dominant and foundational failure is rejecting the precedence concept entirely and evaluating strictly left to right regardless of which operations are present (treating 3+4×2 as (3+4)×2 = 14 instead of 3+(4×2) = 11) — this must be resolved before any tier-specific confusion can be meaningfully addressed. Two further failures are believing addition always precedes multiplication regardless of position, and believing multiplication always precedes division regardless of left-to-right order within the same tier — both are attempts to impose a rigid operation-name ranking where the actual rule is tier membership plus left-to-right sequencing within a tier.

## Misconceptions
Reused by reference from the Blueprint's Component 2 Misconception Registry, with birth-type classification added:

- **MC-1 — LEFT-TO-RIGHT-ONLY** (FOUNDATIONAL)
  - **Blueprint description**: evaluates strictly left to right, ignoring all precedence — 3+4×2 → (3+4)×2 = 14 instead of 3+(4×2) = 11.
  - **Birth type**: Type 1, overgeneralization — the left-to-right reading habit that correctly governs same-tier operations (and single-operation expressions generally) gets overgeneralized to expressions mixing multiple tiers, where it no longer applies.
  - **Repair approach**: Blueprint Repair Action B01, re-anchored via the recipe-steps analogy (TA-A01) and Example 1's explicit tier-by-tier walkthrough.

- **MC-2 — ADDITION-BEFORE-MULTIPLICATION** (see Blueprint Component 2)
  - **Blueprint description**: adds before multiplying regardless of position — 2+3×4 → 5×4 = 20 instead of 2+12 = 14.
  - **Birth type**: Type 5, instruction-induced — reading an expression left-to-right as encountered in text (addition symbol appears first) can be reinforced by ordinary reading habits unless the tier concept is explicitly taught to override reading order.
  - **Repair approach**: Blueprint Repair Action B02, using Example 2's full tier-by-tier evaluation to show the × tier resolves before the + tier regardless of left-to-right symbol position.

- **MC-3 — MULTIPLICATION-BEFORE-DIVISION-ALWAYS** (see Blueprint Component 2)
  - **Blueprint description**: always multiplies before dividing regardless of left-to-right order — 12÷4×3 → 12÷12 = 1 instead of (12÷4)×3 = 9.
  - **Birth type**: Type 6, analogy overextension — the correct rule that "Parentheses, then Exponents, then Multiplication/Division, then Addition/Subtraction" ranks OPERATION TYPES gets overextended by analogy into ranking multiplication above division as if they were also separate tiers, when they in fact share one tier resolved strictly left-to-right.
  - **Repair approach**: Blueprint Repair Action B03, using TA-A03's direct contrast of 12÷4×3 (left-to-right within the tier) against 12÷(4×3) (parentheses override), and TA-A04's pattern-induction set generalizing the left-to-right-within-tier rule.

## Analogies
- **Recipe-steps analogy** (Blueprint TA-A01): mixing, baking, and frosting must happen in that order regardless of the order the steps are listed in casual conversation — multiplication is a "bake first" step, addition is the "frost last" step; doing them out of order ruins the result.

## Demonstrations
- The PEMDAS tier table with a worked quick-demo (3+4×2 → 11, not 14) (Blueprint TA-A01).
- The parentheses-override contrast: 6÷2×3 = 9 (left-to-right within tier) vs. 6÷(2×3) = 1 (parentheses override), and 8−3+2 = 7 vs. 8−(3+2) = 3 (Blueprint TA-A03).
- The pattern-induction set of six left-to-right examples across both the ×÷ tier and the +− tier (Blueprint TA-A04), generalizing the rule from repeated concrete cases.

## Discovery Questions
1. "Is 3+4×2 a flat left-to-right list, or does one operation get priority — how would you check?"
2. "Does 12÷4×3 mean 'multiply first' just because multiplication is mentioned in PEMDAS before division?"
3. "What happens to 8−3+2 if you add parentheses as 8−(3+2) instead of leaving it as written — why does the answer change?"

## Teaching Sequence
Follows the Blueprint's Component 4 exactly: TA-A01 (recipe-steps analogy + PEMDAS tier summary + quick demo) → TA-A02 (full worked-example pair covering all four tiers) → TA-A03 (with/without-parentheses contrast + same-tier left-to-right rule, both ×÷ and +− tiers) → TA-A04 (pattern induction generalizing left-to-right-within-tier across six examples) → TA-A05 (Mastery Gate, P91).

## Tutor Actions
- **SHOW: Analogy** — the baking-recipe steps-in-order framing (Blueprint TA-A01).
- **DO: Worked Example** — the full four-tier evaluation of (2+3)²÷5−1 (Blueprint TA-A02, Example 2).
- **TEST-THINKING: Error Analysis** — the with/without-parentheses contrast pairs (Blueprint TA-A03).
- **TEST-THINKING: Prediction** — predict which operation resolves first before evaluating, for a fresh expression.

## Voice Teaching Notes
When a student begins evaluating an expression, ask them to name the tier of the FIRST operation they plan to apply before they compute anything — this single habit (implicit throughout the Blueprint's P49 checkpoints) surfaces MC-1, MC-2, and MC-3 before any arithmetic error compounds the diagnosis.

## Assessment Signals
- **P76 (transfer probe, independence mode per the Blueprint's GR-9 — cross_links=[])**: reused verbatim from the Blueprint's Component 4 TA-A05 — the spreadsheet-formula scenario (3+4\*2^2−10/2 vs. (3+4)\*2^2−10/2), including part (c)'s explanation of why parentheses change the computational structure.
- **P77 (mastery gate)**: the Blueprint's 4-item problem set (Component 4 TA-A05), MAMR 5/5.

## Tutor Recovery Strategy
If MC-1 persists after the recipe-steps analogy, regress to expressions with only TWO operations from different tiers (e.g., 3+4×2, not longer chains) until the tier-before-position idea is solid, before returning to full four-tier expressions.

## Memory Hooks
- "Tier before position — where an operation SITS in the expression never outranks which TIER it belongs to."
- "Same tier, left to right — no exceptions, ever, within ×÷ or within +−."

## Transfer Connections
- `math.alg.expression` (unlocks) applies this exact precedence hierarchy to algebraic expressions with variables.
- Spreadsheet and programming-language expression evaluation (Blueprint's P76 transfer probe) reuse the identical PEMDAS hierarchy.

## Cross-Subject Connections
- Computer science: expression parsers and calculators implement operator precedence directly analogous to PEMDAS; the spreadsheet transfer probe makes this connection explicit.

## Blueprint References
`docs/curriculum/blueprints/math.arith.order-of-operations.md` — all worked examples, contrasts, teaching actions, and the P76/P77 assessment items reused by reference, not restated in full.

## Runtime Asset References
None seeded yet in `src/lib/teaching/assets/` for this concept as of this entry's authoring date.

## Curriculum Feedback
None — the Blueprint's own cross-link finding (cross_links=[]) was independently re-verified via directory listing at authoring time and remains accurate.

## Version History
- v1.0 (2026-07-26): Initial authoring, Domain Certification Mode, math.arith Wave 7 part 1.
