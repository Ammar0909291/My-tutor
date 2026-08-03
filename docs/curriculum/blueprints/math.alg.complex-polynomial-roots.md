# Teaching Blueprint: Complex Polynomial Roots (`math.alg.complex-polynomial-roots`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.alg.complex-polynomial-roots` |
| name | Complex Polynomial Roots |
| domain | Algebra |
| difficulty | advanced |
| bloom | apply |
| mastery_threshold | 0.75 → MAMR = ⌈0.75×5⌉ = 4/5 |
| estimated_hours | 4 |
| requires | `math.alg.fundamental-theorem-algebra`, `math.found.complex-numbers` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | A (Abstract) |
| description (KG) | Non-real complex roots of polynomials with real coefficients come in conjugate pairs a ± bi; enables factoring over ℝ into linear and irreducible quadratic factors.

 |

## Component 1 — Learning Objectives

- LO1: Given one non-real complex root $a+bi$ of a polynomial with REAL coefficients, immediately state its conjugate $a-bi$ is also a root, without further computation.
- LO2: Use the Fundamental Theorem of Algebra together with the conjugate-pair property to determine the FULL set of roots of a real-coefficient polynomial, given partial root information.
- LO3: Factor a real-coefficient polynomial into linear factors (for real roots) and IRREDUCIBLE QUADRATIC factors (one per complex-conjugate root pair) over the real numbers.

## Component 2 — Prerequisite Check

Assumes mastery of `math.alg.fundamental-theorem-algebra` (a degree-$n$ polynomial has exactly $n$ roots counting multiplicity, over the complex numbers) and `math.found.complex-numbers` (complex conjugates and their properties).

## Component 3 — Core Explanation

For a polynomial with REAL coefficients, non-real complex roots ALWAYS come in CONJUGATE PAIRS: if $a+bi$ (with $b\ne0$) is a root, then $a-bi$ is automatically also a root. This follows because complex conjugation preserves real-coefficient polynomial equations — if $p(a+bi)=0$ for a real-coefficient polynomial $p$, taking the conjugate of both sides gives $p(a-bi)=0$ as well.

Combined with the Fundamental Theorem of Algebra (exactly $n$ roots for a degree-$n$ polynomial, counting multiplicity), this lets a real-coefficient polynomial be factored ENTIRELY over the reals into: LINEAR factors $(x-r)$ for each real root $r$, and IRREDUCIBLE QUADRATIC factors $(x^2-2ax+(a^2+b^2))$ for each conjugate pair $a\pm bi$ (obtained by multiplying $(x-(a+bi))(x-(a-bi))$ together, which always produces a real-coefficient quadratic).

## Component 4 — Worked Examples

**Example 1 (LO1 — immediate conjugate-pair inference, breaking MC-1)**: A real-coefficient cubic polynomial has a known root $2+3i$. By the conjugate-pair property, $2-3i$ is IMMEDIATELY also a root — no further work or verification is needed to establish this. A common error attempts to "verify" this by substituting $2-3i$ back into the polynomial and checking, treating it as an open question requiring separate confirmation, rather than recognizing this as a GUARANTEED consequence of the polynomial having real coefficients.

**Example 2 (LO2 — using conjugate pairs to find all roots)**: A degree-4 real-coefficient polynomial has roots $3$, $-1$, and $1+2i$. By the Fundamental Theorem of Algebra, it has exactly 4 roots (counting multiplicity); by the conjugate-pair property, $1-2i$ must ALSO be a root (since $1+2i$ is non-real). This accounts for all 4 roots: $3,-1,1+2i,1-2i$ — a complete list, without needing to solve any further equation.

**Example 3 (LO3 — factoring over the reals, breaking MC-2)**: Factor a real-coefficient polynomial with roots $2$, $1+i$, $1-i$ over the reals. The real root $2$ gives a linear factor $(x-2)$. The complex conjugate PAIR $1\pm i$ does NOT give two separate linear factors over the reals (that would require complex coefficients) — instead, they combine into ONE irreducible quadratic factor: $(x-(1+i))(x-(1-i))=x^2-2x+2$ (verify: expand directly, the imaginary parts cancel, leaving real coefficients). Full factorization over $\mathbb{R}$: $(x-2)(x^2-2x+2)$. A common error attempts to write $(x-(1+i))$ and $(x-(1-i))$ as SEPARATE factors when working "over the reals," missing that individual complex linear factors are not valid real-coefficient factors — only their PRODUCT (the quadratic) is.

## Component 5 — Teaching Actions

### Teaching Action A01 — Conjugate Pairs Are Automatic, No Verification Needed (Primitive P64: Conceptual Shift)

Work Example 1, explicitly stating the theorem's guarantee and contrasting it against the (unnecessary) verification instinct — emphasizing this is a PROVEN structural fact about real-coefficient polynomials, not a pattern to double-check case by case.

- **MC-1 hook**: this directly targets MC-1 (treating the conjugate-pair inference as needing separate verification).

### Teaching Action A02 — Combine FTA and Conjugate Pairs to Find All Roots (Primitive P11: Representation Shift)

Work Example 2, explicitly counting roots against the polynomial's degree (via FTA) and using the conjugate-pair rule to fill in any missing non-real root, showing the two theorems working together.

### Teaching Action A03 — Complex Conjugate Pairs Combine into ONE Real Quadratic Factor (Primitive P06: Contrast Pair)

Work Example 3's full factorization, explicitly multiplying $(x-(1+i))(x-(1-i))$ to show the imaginary terms cancel, producing a genuine real-coefficient quadratic — contrasting against the flawed attempt to keep them as separate complex linear factors "over the reals." State the rule: "a factorization is 'over the reals' only if EVERY factor has real coefficients — a conjugate pair's individual complex factors don't qualify alone, but their PRODUCT always does."

- **MC-2 hook**: this directly targets MC-2 (writing separate complex linear factors when factoring over the reals is required).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.75×5⌉ = 4/5.

- **P77 (4-problem set)**:
  1. Given that a real-coefficient polynomial has root $3-5i$, state another root it must have, and explain why no further verification is needed.
  2. A degree-5 real-coefficient polynomial has roots $1,2,4+i$. Determine the remaining roots, using FTA and the conjugate-pair property.
  3. Multiply $(x-(2+i))(x-(2-i))$ to find the irreducible quadratic factor corresponding to this conjugate pair.
  4. Factor a real-coefficient polynomial with roots $-1, 3+2i, 3-2i$ over the reals.
- **P76 (Transfer Probe, mode = independence)**: "A control-systems engineer analyzes a real-coefficient characteristic polynomial (degree 4) for a physical system and finds two roots: $-2$ (real) and $1+3i$ (complex). (a) Determine the two remaining roots using the theorems from this lesson, explaining your reasoning at each step. (b) Factor the full degree-4 polynomial over the real numbers, and explain why the engineer's system analysis (which typically requires real-coefficient factors to interpret physical behavior) can proceed even though two of the four roots are individually non-real."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | CONJUGATE-PAIR-INFERENCE-TREATED-AS-NEEDING-VERIFICATION | Attempting to separately verify that a root's complex conjugate is also a root, rather than recognizing this as a guaranteed consequence of real coefficients | Moderate |
| MC-2 | COMPLEX-CONJUGATE-PAIR-FACTORED-AS-SEPARATE-COMPLEX-LINEAR-FACTORS-OVER-REALS | Writing individual complex linear factors when a "factor over the reals" is required, rather than combining the conjugate pair into one real irreducible quadratic | Foundational |
| MC-3 | ROOT-COUNT-MISMATCHED-AGAINST-POLYNOMIAL-DEGREE | Failing to account for ALL roots implied by the polynomial's degree (via FTA), missing a root that the conjugate-pair property would otherwise supply | Foundational |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Conjugate Pair Inference Treated as Needing Verification") → P41 (detect: present Example 1 and check whether unnecessary verification is attempted) → P64 (conceptual shift: re-state the theorem's guarantee explicitly, distinguishing "proven structural fact" from "pattern requiring case-by-case confirmation").
- **B02 (targets MC-2)**: P27 ("Complex Conjugate Pair Factored as Separate Complex Factors") → P41 (detect: present Example 3 and check whether $(x-(1+i))$ and $(x-(1-i))$ are left as separate factors "over the reals") → P64 (conceptual shift: re-multiply the pair explicitly, showing the product's imaginary terms cancel, producing the single valid real quadratic factor).
- **B03 (targets MC-3)**: P27 ("Root Count Mismatched Against Polynomial Degree") → P41 (detect: review a submitted root list against the polynomial's stated degree) → P64 (conceptual shift: re-count roots explicitly against FTA's guarantee, checking for any missing conjugate partner).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.alg.fundamental-theorem-algebra`, `math.found.complex-numbers`.
- **Unlocks**: none recorded in the KG.
- **Related**: `math.alg.rational-root-theorem` (a sibling root-finding technique addressing a different subset of possible roots).

## Component 8 — Teaching Notes

- estimated_hours = 4 and difficulty = advanced reflect that this concept synthesizes two substantial prior theorems (FTA, complex conjugates) into a combined practical technique for full polynomial factorization.
- MC-2 was ranked most severe because it represents a genuine misunderstanding of what "factoring over the reals" REQUIRES (every factor must have real coefficients), not merely a computational slip — a student making this error has not grasped why the quadratic-factor step exists at all.
- The control-systems transfer probe was deliberately chosen because complex-conjugate root pairs in real-coefficient characteristic polynomials are a genuine, common occurrence in engineering (representing oscillatory system behavior), giving this abstract algebraic property concrete applied significance beyond a pure factoring exercise.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.alg.fundamental-theorem-algebra`, `math.found.complex-numbers`) |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
| V-5 | cross_links checked against disk | PASS (none declared) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.75×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
