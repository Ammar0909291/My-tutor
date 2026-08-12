# Teaching Blueprint: Special Factoring Formulas (`math.alg.factoring-special`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.alg.factoring-special` |
| name | Special Factoring Formulas |
| domain | Algebra |
| difficulty | proficient |
| bloom | apply |
| mastery_threshold | 0.85 → MAMR = ⌈0.85×5⌉ = 5/5 |
| estimated_hours | 5 |
| requires | `math.alg.factoring` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | P (Pictorial) — area-model verification before pure symbolic recall |
| description (KG) | Memorized factoring formulas: a²−b² = (a+b)(a−b), a³±b³ = (a±b)(a²∓ab+b²), (a±b)² = a²±2ab+b².

 |

## Component 1 — Learning Objectives

- LO1: Factor a DIFFERENCE OF SQUARES $a^2-b^2=(a+b)(a-b)$, recognizing this pattern in expressions where both terms are perfect squares.
- LO2: Factor a SUM or DIFFERENCE OF CUBES $a^3\pm b^3=(a\pm b)(a^2\mp ab+b^2)$, correctly tracking the sign pattern (the sign in the binomial factor matches the original; the middle term's sign in the trinomial factor is OPPOSITE).
- LO3: Recognize and correctly expand a PERFECT SQUARE TRINOMIAL $(a\pm b)^2=a^2\pm2ab+b^2$ in both directions (expanding a binomial square, and factoring a trinomial matching this pattern).

## Component 2 — Prerequisite Check

Assumes mastery of `math.alg.factoring` (the general factoring concept) — these are specific, high-value MEMORIZED patterns worth recognizing instantly rather than re-deriving.

## Component 3 — Core Explanation

Three families of special factoring patterns, each worth memorizing for instant recognition:

- **Difference of squares**: $a^2-b^2=(a+b)(a-b)$. Note there is NO corresponding factoring for a SUM of squares ($a^2+b^2$) over the real numbers — it does not factor into real linear factors.
- **Sum/difference of cubes**: $a^3+b^3=(a+b)(a^2-ab+b^2)$ and $a^3-b^3=(a-b)(a^2+ab+b^2)$ — note the binomial factor's sign MATCHES the original expression's sign, while the trinomial factor's MIDDLE term sign is always OPPOSITE.
- **Perfect square trinomial**: $(a+b)^2=a^2+2ab+b^2$ and $(a-b)^2=a^2-2ab+b^2$ — recognizable when a trinomial's first and last terms are perfect squares AND the middle term is exactly twice the product of their square roots.

## Component 4 — Worked Examples

**Example 1 (LO1 — difference of squares, breaking MC-1)**: Factor $9x^2-25$. Recognizing $9x^2=(3x)^2$ and $25=5^2$: $9x^2-25=(3x+5)(3x-5)$. Contrast with $9x^2+25$ (a SUM of squares) — this does NOT factor over the reals; a common error attempts to apply the difference-of-squares pattern to a sum, incorrectly "factoring" it as $(3x+5)(3x-5)$ or similar, when no such real factorization exists.

**Example 2 (LO2 — sum/difference of cubes sign tracking, breaking MC-2)**: Factor $x^3+8$. Recognizing $8=2^3$: using $a^3+b^3=(a+b)(a^2-ab+b^2)$ with $a=x,b=2$: $x^3+8=(x+2)(x^2-2x+4)$. A common error gets the trinomial's middle-term sign backwards, writing $(x+2)(x^2+2x+4)$ instead — the rule is that the BINOMIAL factor's sign matches the original expression, while the TRINOMIAL's middle term sign is always the OPPOSITE of that, regardless of whether the original was a sum or difference.

**Example 3 (LO3 — perfect square trinomial recognition, breaking MC-3)**: Factor $x^2+10x+25$. Check: is this a perfect square trinomial? First term $x^2=(x)^2$ ✓, last term $25=5^2$ ✓, middle term should be $2\times x\times5=10x$ — MATCHES exactly, confirming $x^2+10x+25=(x+5)^2$. Contrast with $x^2+9x+25$ (superficially similar, same first/last terms) — here the middle term should be $10x$ to qualify, but it's $9x$ instead, so this does NOT fit the perfect-square-trinomial pattern and must be factored (or left unfactored) by other means. A common error assumes ANY trinomial with two perfect-square terms automatically qualifies, without checking the middle term's specific required value.

## Component 5 — Teaching Actions

### Teaching Action A01 — Difference of Squares, No Sum-of-Squares Analog (Primitive P06: Contrast Pair)

Work Example 1's contrast directly, verifying via expansion that $(3x+5)(3x-5)=9x^2-25$ genuinely works, while attempting the same structure on $9x^2+25$ produces a mismatch when expanded back out ($(3x+5)(3x-5)=9x^2-25\ne9x^2+25$). State the rule: "difference of squares factors; sum of squares does NOT (over the reals) — always verify by mental expansion if unsure."

- **MC-1 hook**: this directly targets MC-1 (attempting to factor a sum of squares using the difference-of-squares pattern).

### Teaching Action A02 — Cubes: Binomial Sign Matches, Trinomial Middle Sign Is Opposite (Primitive P64: Conceptual Shift)

Work Example 2 in full, explicitly verifying by EXPANDING $(x+2)(x^2-2x+4)$ back out (confirming it equals $x^3+8$) to ground WHY the sign pattern is what it is, rather than presenting it as an arbitrary rule to memorize blindly.

- **MC-2 hook**: this directly targets MC-2 (getting the trinomial's middle-term sign backwards) by requiring the verification-by-expansion step to catch the error.

### Teaching Action A03 — Perfect Square Trinomial: Check the Middle Term Exactly (Primitive P06: Contrast Pair, second pairing)

Work Example 3's two near-identical trinomials side by side, showing one qualifies (middle term matches $2ab$ exactly) and one doesn't (close but not matching). State the rule: "having two perfect-square terms is NECESSARY but not SUFFICIENT — the middle term must equal exactly twice the product of the square roots, or the pattern doesn't apply."

- **MC-3 hook**: this directly targets MC-3 (assuming any trinomial with two perfect-square terms automatically fits the pattern).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.85×5⌉ = 5/5.

- **P77 (4-problem set)**:
  1. Factor $16x^2-49$.
  2. Factor $x^3-27$, tracking the sign pattern carefully.
  3. Determine whether $x^2-14x+49$ is a perfect square trinomial, and factor it if so.
  4. Determine whether $4x^2+9$ can be factored over the reals, and explain why or why not.
- **P76 (Transfer Probe, mode = independence)**: "An engineer needs to factor the expression $x^3+64$ representing a volume-difference formula in a design calculation. (a) Apply the sum-of-cubes formula to factor this expression, being careful with the sign pattern. (b) Verify your factorization is correct by fully expanding your answer back out and confirming it matches the original $x^3+64$, explaining why this verification step is a reliable way to catch a sign error even without re-deriving the formula from scratch."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | SUM-OF-SQUARES-INCORRECTLY-FACTORED-LIKE-DIFFERENCE | Attempting to apply the difference-of-squares pattern to a sum of squares, which does not factor over the reals | Foundational |
| MC-2 | CUBE-FACTORING-TRINOMIAL-MIDDLE-SIGN-REVERSED | Using the wrong sign for the middle term of the trinomial factor when factoring a sum or difference of cubes | Foundational |
| MC-3 | PERFECT-SQUARE-TRINOMIAL-MIDDLE-TERM-NOT-VERIFIED | Assuming a trinomial with two perfect-square terms automatically qualifies as a perfect square trinomial, without checking the middle term equals exactly $2ab$ | Foundational |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Sum of Squares Incorrectly Factored") → P41 (detect: present $9x^2+25$ and check whether a factoring attempt using the difference pattern is made) → P64 (conceptual shift: expand the proposed factorization back out, showing it doesn't reproduce the original sum-of-squares expression).
- **B02 (targets MC-2)**: P27 ("Cube Factoring Trinomial Middle Sign Reversed") → P41 (detect: present Example 2 and check the trinomial's middle-term sign) → P64 (conceptual shift: re-verify by fully expanding the proposed factorization, catching the sign mismatch directly).
- **B03 (targets MC-3)**: P27 ("Perfect Square Trinomial Middle Term Not Verified") → P41 (detect: present Example 3's near-miss trinomial and check whether it's incorrectly accepted as a perfect square pattern) → P64 (conceptual shift: re-compute the REQUIRED middle term ($2ab$) explicitly and compare against the actual middle term present).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.alg.factoring`.
- **Unlocks**: none recorded in the KG.
- **Related**: none declared.

## Component 8 — Teaching Notes

- estimated_hours = 5 reflects that this concept bundles THREE distinct memorized pattern families, each with its own sign-tracking or verification subtlety, into one unit.
- All three misconceptions are ranked foundational because each stems from applying a memorized pattern to a case that superficially resembles but does NOT actually satisfy that pattern's precise structural requirements — the unifying lesson across all three (and reinforced by Teaching Action A02's verification-by-expansion habit) is that these formulas require exact structural matching, not approximate pattern-matching.
- The design-calculation transfer probe was deliberately designed to require the VERIFICATION step explicitly (part (b)), reinforcing expand-to-check as a reliable, generalizable error-catching habit applicable across all three special-factoring families, not just cubes.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.alg.factoring`) |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
| V-5 | cross_links checked against disk | PASS (none declared) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.85×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Pictorial: area-model verification before recall) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
