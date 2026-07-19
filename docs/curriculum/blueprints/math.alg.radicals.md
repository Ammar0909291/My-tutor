# Teaching Blueprint: Radical Expressions (`math.alg.radicals`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.alg.radicals` |
| name | Radical Expressions |
| domain | Algebra |
| difficulty | proficient |
| bloom | apply |
| mastery_threshold | 0.8 → MAMR = ⌈0.8×5⌉ = 4/5 |
| estimated_hours | 8 |
| requires | `math.arith.square-roots`, `math.alg.exponent-rules` |
| unlocks | `math.alg.radical-equations`, `math.alg.fractional-exponent` |
| cross_links | none |
| CPA_entry_stage | C (Concrete) — extracting perfect-square factors visually before the general simplification rule |
| description (KG) | Expressions involving n-th roots ⁿ√a; simplified by extracting perfect powers from under the radical and rationalizing denominators. |

## Component 1 — Learning Objectives

- LO1: Simplify a radical expression $\sqrt[n]{a}$ by **extracting perfect $n$-th powers** from under the radical (e.g. $\sqrt{72}=\sqrt{36\times2}=6\sqrt2$), using the product rule $\sqrt[n]{xy}=\sqrt[n]{x}\sqrt[n]{y}$.
- LO2: **Rationalize denominators** containing a radical — both the simple case (multiply by the same radical over itself) and the **binomial** case (multiply by the conjugate, using the difference-of-squares identity to eliminate the radical).
- LO3: Correctly combine "like radicals" (same index AND same radicand) via addition/subtraction, and correctly recognize when two radical terms are NOT like radicals (different radicands or different indices) and therefore CANNOT be combined, even if they look superficially similar.

## Component 2 — Prerequisite Check

Assumes mastery of `math.arith.square-roots` (the square root, its nonnegative-output convention, and the extension to $n$-th roots) and `math.alg.exponent-rules` (rational/fractional exponents, which radicals directly restate: $\sqrt[n]{a}=a^{1/n}$).

## Component 3 — Core Explanation

**Simplifying by extracting perfect powers**: using $\sqrt[n]{xy}=\sqrt[n]{x}\cdot\sqrt[n]{y}$, factor the radicand to isolate the LARGEST perfect $n$-th-power factor, then extract its root: $\sqrt{72} = \sqrt{36\times2} = \sqrt{36}\cdot\sqrt2 = 6\sqrt2$.

**Rationalizing denominators**: a "simplified" radical expression should have NO radical in the denominator. For a simple radical denominator, multiply numerator and denominator by that same radical: $\frac{1}{\sqrt2} = \frac{1}{\sqrt2}\cdot\frac{\sqrt2}{\sqrt2}=\frac{\sqrt2}{2}$. For a BINOMIAL denominator involving a radical (e.g. $\frac{1}{3+\sqrt2}$), multiply by the **conjugate** ($3-\sqrt2$), using the difference-of-squares identity $(a+b)(a-b)=a^2-b^2$ to eliminate the radical entirely from the denominator: $\frac{1}{3+\sqrt2}\cdot\frac{3-\sqrt2}{3-\sqrt2} = \frac{3-\sqrt2}{9-2}=\frac{3-\sqrt2}{7}$.

**Combining like radicals**: $a\sqrt[n]{r}+b\sqrt[n]{r}=(a+b)\sqrt[n]{r}$ — ONLY when both the INDEX $n$ and the RADICAND $r$ match exactly. $\sqrt2+\sqrt3$ CANNOT be combined into a single term (different radicands); $\sqrt2+\sqrt[3]2$ CANNOT be combined either (same radicand, but DIFFERENT indices — a square root and a cube root of 2 are genuinely different numbers).

## Component 4 — Worked Examples

**Example 1 (LO1 — extracting perfect powers)**: Simplify $\sqrt{200}$: $200=100\times2$, so $\sqrt{200}=\sqrt{100}\sqrt2=10\sqrt2$. Simplify $\sqrt[3]{54}$: $54=27\times2$ (27 is a perfect CUBE), so $\sqrt[3]{54}=\sqrt[3]{27}\sqrt[3]2=3\sqrt[3]2$.

**Example 2 (LO2 — rationalizing, simple and binomial denominators)**: Rationalize $\frac{5}{\sqrt3}$: $\frac{5}{\sqrt3}\cdot\frac{\sqrt3}{\sqrt3}=\frac{5\sqrt3}{3}$. Rationalize $\frac{4}{2-\sqrt5}$ (binomial denominator): multiply by the conjugate $2+\sqrt5$: $\frac{4}{2-\sqrt5}\cdot\frac{2+\sqrt5}{2+\sqrt5} = \frac{4(2+\sqrt5)}{4-5}=\frac{4(2+\sqrt5)}{-1}=-4(2+\sqrt5)=-8-4\sqrt5$.

**Example 3 (LO3 — combining like radicals, and a non-example, breaking MC-1)**: Simplify $3\sqrt2+5\sqrt2-\sqrt2$: all three terms are $\sqrt2$ (same index 2, same radicand 2) — combine: $(3+5-1)\sqrt2=7\sqrt2$. Now attempt $3\sqrt2+5\sqrt3$: these have DIFFERENT radicands (2 vs. 3) — they CANNOT be combined into a single radical term; the expression $3\sqrt2+5\sqrt3$ is already in its fully simplified form, and a student attempting to "combine" it into something like $8\sqrt5$ (adding the radicands, or otherwise merging the terms) would be making a fundamental error — no such simplification exists.

## Component 5 — Teaching Actions

### Teaching Action A01 — Extracting Perfect Powers, via Visual Factor Trees (Primitive P11: Representation Shift)

Start concrete: for $\sqrt{72}$, build a factor tree identifying $72=36\times2$, visually circling the perfect-square factor 36. State: "pull the perfect-square (or perfect-$n$th-power) factor OUT from under the radical, leaving the rest inside." Work Example 1's two simplifications explicitly, one square root, one cube root, reinforcing the SAME extraction principle applies regardless of index.

Shift representation to rationalizing denominators: work Example 2's simple case first (multiply by the same radical), then the binomial case (multiply by the conjugate), explicitly connecting the conjugate technique to the already-known difference-of-squares identity.

- **MC-1 hook**: present $3\sqrt2+5\sqrt3$ and ask a student to "simplify by combining the radical terms" — watch whether they attempt to merge them into a single radical (e.g. adding radicands or coefficients incorrectly), revealing MC-1 (attempting to combine radicals with different radicands or indices, treating any two radical terms as automatically combinable the way like algebraic terms are).

### Teaching Action A02 — Like Radicals Require BOTH Matching Index and Radicand (Primitive P06: Contrast Pair)

**Contrast 1 (targets MC-1)**: Place Example 3's genuine combination ($3\sqrt2+5\sqrt2-\sqrt2=7\sqrt2$, same index AND radicand) directly beside the non-combinable case ($3\sqrt2+5\sqrt3$, different radicands). State the rule with full precision: "combining radicals works EXACTLY like combining algebraic like terms (e.g. $3x+5x=8x$) — but 'like' here means matching BOTH the index and the radicand exactly; $\sqrt2$ and $\sqrt3$ are as different from each other as $x$ and $y$ would be."

**Contrast 2**: Briefly extend the same principle to matching indices with the SAME radicand — $\sqrt2$ (index 2) and $\sqrt[3]2$ (index 3) share a radicand but are NOT like radicals either, since they represent genuinely different numerical values ($\sqrt2\approx1.41$, $\sqrt[3]2\approx1.26$) — reinforcing that BOTH conditions (matching index, matching radicand) are independently required.

### Teaching Action A03 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Simplify $\sqrt{500}$ and $\sqrt[3]{128}$ by extracting perfect powers.
  2. Rationalize $\frac{7}{\sqrt5}$.
  3. Rationalize $\frac{3}{4+\sqrt2}$ using the conjugate technique.
  4. Simplify $2\sqrt5+3\sqrt{20}-\sqrt5$ (hint: one term needs simplifying via perfect-power extraction BEFORE checking which terms can combine).
- **P76 (Transfer Probe, mode = independence)**: "An architect calculating a structural diagonal brace length arrives at the expression $\frac{10}{\sqrt3+1}$ meters, and separately, a total material-length calculation adds together $2\sqrt{18}$ meters and $3\sqrt2$ meters of two different brace segments. (a) Rationalize the architect's first expression to remove the radical from the denominator, expressing the final answer in simplified form. (b) For the material-length sum, first simplify $2\sqrt{18}$ by extracting its perfect-square factor, THEN determine whether it can now be combined with the $3\sqrt2$ term, and compute the final simplified total length."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | UNLIKE-RADICALS-COMBINED-INCORRECTLY | Attempting to combine radical terms with different radicands or different indices, treating any two radical expressions as automatically combinable | Foundational |
| MC-2 | RATIONALIZATION-SKIPPED-FOR-BINOMIAL-DENOMINATOR | When the denominator is a binomial containing a radical (e.g. $3+\sqrt2$), multiplying by the SAME radical alone (as with a simple radical denominator) rather than by the conjugate, failing to eliminate the radical | Foundational |
| MC-3 | PERFECT-POWER-FACTOR-NOT-FULLY-EXTRACTED | Extracting SOME perfect-power factor from a radicand but not the LARGEST one, leaving an incompletely simplified radical (e.g. simplifying $\sqrt{72}$ to $2\sqrt{18}$ instead of fully to $6\sqrt2$) | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Unlike-Radical Combination Error") → P41 (detect: present $3\sqrt2+5\sqrt3$ and ask the student to "simplify further," checking for an attempted merge) → P64 (conceptual shift: re-anchor on the algebraic-like-terms analogy — $\sqrt2$ and $\sqrt3$ are as different as two different variables, never combinable by addition).
- **B02 (targets MC-2)**: P27 (name it: "Wrong Rationalization Multiplier for Binomial Denominator") → P41 (detect: give a binomial-radical-denominator problem and check whether the student multiplies by the SAME expression rather than its conjugate) → P64 (conceptual shift: attempt the "same expression" multiplication, show it FAILS to eliminate the radical, then apply the conjugate correctly, connecting to difference-of-squares).
- **B03 (targets MC-3)**: P27 (name it: "Incomplete Perfect-Power Extraction") → P41 (detect: check whether a student's simplified radical still contains an extractable perfect-power factor, like $2\sqrt{18}$ instead of the fully-reduced $6\sqrt2$) → P64 (conceptual shift: re-derive by continuing the extraction process — factor the REMAINING radicand further, checking if it still contains a perfect-power factor, until none remains).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.arith.square-roots` (the square root and its extension to $n$-th roots), `math.alg.exponent-rules` (rational exponents, directly equivalent to radical notation).
- **Unlocks**: `math.alg.radical-equations` (solving equations containing radicals builds directly on simplification fluency here), `math.alg.fractional-exponent` (the direct notational equivalence $\sqrt[n]{a}=a^{1/n}$, building on this concept's radical manipulation skills).
- **Cross-link**: KG lists no cross-links for this concept.

## Component 8 — Teaching Notes

- estimated_hours = 8 with a proficient/apply tag places this at the "2 main TAs + gate" tier — A01 (extracting perfect powers, and rationalizing both simple and binomial denominators) and A02 (the like-radicals-require-matching-index-and-radicand contrast) jointly cover all three LOs.
- MC-1 (unlike radicals combined incorrectly) was made this blueprint's central focus because the additive-combination notation for radicals ($3\sqrt2+5\sqrt2$) superficially resembles ordinary algebraic like-term combination, inviting an over-generalization that ANY two radical expressions can be merged — Example 3's deliberate juxtaposition of a genuine combination against a non-combinable pair was designed to isolate exactly this boundary.
- The rationalize-then-simplify-and-combine transfer probe was deliberately sequenced (rationalization first, then perfect-power extraction feeding into a combination decision) to test all three learning objectives within one applied scenario, rather than in isolation, since real simplification tasks typically require applying these skills in combination, not one at a time.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (both) |
| V-4 | unlocks concepts named accurately from KG | PASS |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (empty in KG → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A03) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.8×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Concrete: visual factor trees before general rule) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
