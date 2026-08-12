# Teaching Blueprint: Simplifying Radicals (`math.alg.simplifying-radicals`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.alg.simplifying-radicals` |
| name | Simplifying Radicals |
| domain | Algebra |
| difficulty | proficient |
| bloom | apply |
| mastery_threshold | 0.80 → MAMR = ⌈0.80×5⌉ = 4/5 |
| estimated_hours | 4 |
| requires | `math.alg.radicals` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | A (Abstract) |
| description (KG) | Rewriting a radical by factoring the radicand to extract perfect powers: √(12) = 2√3.

 |

## Component 1 — Learning Objectives

- LO1: Simplify a square root by factoring the radicand to extract the LARGEST perfect-square factor, rewriting $\sqrt{n}$ as $a\sqrt{b}$ where $b$ has no remaining perfect-square factors.
- LO2: Simplify a HIGHER-index radical (cube root, fourth root, etc.) by extracting perfect CUBES, fourth powers, etc. as appropriate to that root's index.
- LO3: Verify a radical is FULLY simplified by checking the remaining radicand has no perfect-power factor matching the root's index — a partial extraction leaves work incomplete.

## Component 2 — Prerequisite Check

Assumes mastery of `math.alg.radicals` (what a radical represents).

## Component 3 — Core Explanation

**Simplifying a radical** means rewriting it so the radicand (the expression under the root) contains NO remaining perfect-power factor matching the root's index. For square roots: factor the radicand, extract the LARGEST perfect-square factor, taking its square root outside: $\sqrt{n}=\sqrt{a^2\times b}=a\sqrt{b}$ (where $b$ has no further perfect-square factors). For higher-index roots (cube roots, etc.), the same principle applies using perfect CUBES (or the appropriate power) instead.

A radical is FULLY simplified only when the remaining radicand has no factor that is a perfect power matching the index — extracting a smaller factor first and stopping there (rather than continuing to the largest) leaves the simplification incomplete.

## Component 4 — Worked Examples

**Example 1 (LO1 — square root simplification)**: Simplify $\sqrt{12}$. Factor: $12=4\times3$, and $4=2^2$ is a perfect square. So $\sqrt{12}=\sqrt{4\times3}=\sqrt4\times\sqrt3=2\sqrt3$.

**Example 2 (LO3 — using the LARGEST perfect-square factor, breaking MC-1)**: Simplify $\sqrt{72}$. Factor: $72=4\times18$, extracting $4=2^2$: $\sqrt{72}=2\sqrt{18}$ — but $18=9\times2$ still has a perfect-square factor ($9=3^2$) remaining, so this is NOT fully simplified; continuing: $2\sqrt{18}=2\times3\sqrt2=6\sqrt2$. Alternatively, spotting the LARGEST perfect-square factor directly: $72=36\times2$ (since $36=6^2$), giving $\sqrt{72}=6\sqrt2$ in one step. A common error extracts a smaller perfect-square factor first (like 4) and stops there, reporting $2\sqrt{18}$ as the final answer without checking whether $18$ itself still has a perfect-square factor to extract.

**Example 3 (LO2 — cube root simplification)**: Simplify $\sqrt[3]{54}$. Factor: $54=27\times2$, and $27=3^3$ is a perfect cube. So $\sqrt[3]{54}=\sqrt[3]{27\times2}=\sqrt[3]{27}\times\sqrt[3]2=3\sqrt[3]2$.

## Component 5 — Teaching Actions

### Teaching Action A01 — Factor Out the Largest Perfect-Square Factor (Primitive P64: Conceptual Shift)

Work Example 1, explicitly factoring the radicand and identifying the perfect-square component before extracting it, connecting the extraction directly to $\sqrt{a^2}=a$.

### Teaching Action A02 — Check for Full Simplification: Any Remaining Perfect-Square Factor? (Primitive P06: Contrast Pair)

Work Example 2's two-step process (partial extraction, then continuing) against the direct largest-factor approach, showing both eventually reach $6\sqrt2$ but the partial approach requires a follow-up check to catch the remaining factor. State the rule: "after extracting any perfect-square factor, ALWAYS re-check whether the remaining radicand still has one — a radical isn't fully simplified until none remains."

- **MC-1 hook**: this directly targets MC-1 (stopping after a partial extraction without checking for a further perfect-square factor).

### Teaching Action A03 — Higher-Index Roots Use the Matching Perfect Power (Primitive P11: Representation Shift)

Work Example 3, explicitly connecting the cube-root case to perfect CUBES (rather than squares), reinforcing that the extraction target must match the root's own index.

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.80×5⌉ = 4/5.

- **P77 (4-problem set)**:
  1. Simplify $\sqrt{50}$.
  2. Simplify $\sqrt{98}$, checking that the result is fully simplified.
  3. Simplify $\sqrt[3]{40}$.
  4. Given the partial simplification $\sqrt{200}=2\sqrt{50}$ (correct but incomplete), continue simplifying to the fully reduced form.
- **P76 (Transfer Probe, mode = independence)**: "A carpenter computes a diagonal brace length as $\sqrt{288}$ inches for a rectangular frame. (a) Simplify $\sqrt{288}$ to its fully reduced radical form. (b) A colleague simplifies it in two steps, first extracting $\sqrt{288}=4\sqrt{18}$, then stops — explain, using this lesson's full-simplification check, why $4\sqrt{18}$ is not yet the final answer, and complete the simplification."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | PARTIAL-EXTRACTION-MISTAKEN-FOR-FULL-SIMPLIFICATION | Stopping after extracting a smaller perfect-power factor without checking whether the remaining radicand still has another one to extract | Foundational |
| MC-2 | NON-PERFECT-POWER-FACTOR-INCORRECTLY-EXTRACTED | Attempting to extract a factor from under the radical that is NOT actually a perfect power matching the root's index | Foundational |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Partial Extraction Mistaken for Full Simplification") → P41 (detect: present Example 2's two-step case and ask whether $2\sqrt{18}$ is fully simplified) → P64 (conceptual shift: re-check the remaining radicand $18$ for a further perfect-square factor explicitly, continuing the extraction).
- **B02 (targets MC-2)**: P27 ("Non-Perfect-Power Factor Incorrectly Extracted") → P41 (detect: review a submitted extraction for a factor that isn't genuinely a perfect square/cube/etc.) → P64 (conceptual shift: re-verify the extracted factor is genuinely a perfect power of the matching index before removing it from under the radical).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.alg.radicals`.
- **Unlocks**: none recorded in the KG.
- **Related**: `math.alg.radical-equations` (uses simplified radical forms within equation-solving), `math.alg.rationalizing-denominators` (a related radical-manipulation skill).

## Component 8 — Teaching Notes

- estimated_hours = 4 reflects that this concept directly parallels `math.arith.fraction-simplification`'s "check for full reduction" discipline, applied to a structurally different (radical, not fraction) object.
- MC-1 was ranked most severe because it is the single most common real-world error in radical simplification, mirroring the exact same partial-vs-full-reduction pattern already seen (and addressed) in `math.arith.fraction-simplification` — this concept reinforces that general verification habit in a new context.
- The carpentry transfer probe's part (b) was deliberately structured as a two-step partial simplification (mirroring `math.arith.fraction-simplification`'s own Example 2 structure) to make the parallel between fraction- and radical-simplification verification habits explicit and transferable.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.alg.radicals`) |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
| V-5 | cross_links checked against disk | PASS (none declared) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (2 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.80×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO3, Ex3→LO2) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
