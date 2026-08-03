# Teaching Blueprint: Cube Numbers (`math.arith.cube-numbers`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.arith.cube-numbers` |
| name | Cube Numbers |
| domain | Arithmetic |
| difficulty | developing |
| bloom | remember |
| mastery_threshold | 0.85 → MAMR = ⌈0.85×5⌉ = 5/5 |
| estimated_hours | 2 |
| requires | `math.arith.exponentiation` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | P (Pictorial) — physical 3D cube arrays before symbolic $n^3$ |
| description (KG) | Integers of the form n³ (1, 8, 27, 64, 125, …); arising in volume calculations and polynomial factorization.

 |

## Component 1 — Learning Objectives

- LO1: Compute $n^3$ for small integers $n$ (1 through 10) and recall these values fluently.
- LO2: Recognize a given number as a perfect cube (or determine it is not) by checking against the known list or via cube-root estimation.
- LO3: Connect cube numbers to their geometric meaning — the volume of a cube with integer side length $n$ — distinguishing this from square numbers' area meaning.

## Component 2 — Prerequisite Check

Assumes mastery of `math.arith.exponentiation` (what $n^3$ means as repeated multiplication) — this concept is the specific, frequently-used case of cubing, worth memorizing directly.

## Component 3 — Core Explanation

A **cube number** has the form $n^3=n\times n\times n$ for a positive integer $n$: $1^3=1$, $2^3=8$, $3^3=27$, $4^3=64$, $5^3=125$, and so on. Cube numbers arise naturally in VOLUME calculations (a cube with side length $n$ has volume $n^3$) and in polynomial factorization (sum/difference of cubes identities build directly on recognizing these values).

Cube numbers grow much faster than square numbers of the same base — this is a genuinely different growth rate, not merely "one more multiplication."

## Component 4 — Worked Examples

**Example 1 (LO1 — direct computation and recall)**: $6^3=6\times6\times6=216$. Fluent recall target: $1^3$ through $10^3$ = $1,8,27,64,125,216,343,512,729,1000$.

**Example 2 (LO2 — checking perfect-cube status, breaking MC-1)**: Is $100$ a perfect cube? Checking nearby cubes: $4^3=64$, $5^3=125$ — $100$ falls strictly between these two consecutive cubes, so $100$ is NOT a perfect cube (unlike $100$ itself being a perfect SQUARE, $10^2$ — a common confusion since 100 is a well-known perfect square).

**Example 3 (LO3 — volume meaning, breaking MC-2)**: A cube with side length $3$ cm has volume $3^3=27$ cm³ — NOT $3\times3=9$ (which would be the AREA of one face, i.e. $3^2$) and NOT $3\times3\times3\times3=81$ (over-multiplying). Cubing means multiplying the side length by ITSELF exactly twice more (three factors total: length × width × height, all equal to 3 here), directly matching the geometric volume of a cube.

## Component 5 — Teaching Actions

### Teaching Action A01 — Physical Cube Arrays for Small Cube Numbers (Primitive P11: Representation Shift)

Build (or visualize) a physical $3\times3\times3$ cube of unit blocks, counting the total blocks layer by layer ($9$ blocks per layer, $3$ layers, $27$ total) to ground $3^3=27$ concretely, then generalize to the symbolic pattern $1^3,2^3,3^3,\ldots$ and drill recall.

- **MC-1 hook**: ask whether $100$ is a perfect cube (revealing MC-1: confusing perfect cubes with perfect squares, since 100 is a well-known perfect square and this familiarity can bleed into cube-related judgments).

### Teaching Action A02 — Cube (Volume) vs. Square (Area): Different Meanings, Different Growth (Primitive P06: Contrast Pair)

Contrast $3^2=9$ (area of one square face) against $3^3=27$ (volume of the full cube) side by side using the same physical cube model, showing exactly which physical quantity each power represents. State the rule: "squaring gives area (two equal factors); cubing gives volume (three equal factors) — count the factors, don't just recall 'a bigger number.'"

### Teaching Action A03 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.85×5⌉ = 5/5.

- **P77 (4-problem set)**:
  1. Compute $7^3$ and $9^3$ from recall or direct multiplication.
  2. Determine whether $200$ is a perfect cube, identifying the two nearest cube numbers if not.
  3. A cube-shaped box has side length $5$ cm; find its volume, showing the cubing computation explicitly.
  4. Explain, in one sentence, why $4^3\ne4\times3$ (a common miscomputation), stating what $4^3$ actually means.
- **P76 (Transfer Probe, mode = independence)**: "A shipping company uses cube-shaped crates with side lengths of 2 ft, 4 ft, and 6 ft. (a) Compute the volume of each crate size. (b) A warehouse worker claims that doubling a crate's side length (e.g. from 2 ft to 4 ft) should double its volume — check this claim directly using your computed volumes, and explain, using the cubing relationship from this lesson, why volume actually scales by a factor of $2^3=8$, not 2, when the side length doubles."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | PERFECT-CUBE-CONFUSED-WITH-PERFECT-SQUARE | Misidentifying whether a number is a perfect cube by conflating it with (the more familiar) perfect-square status | Moderate |
| MC-2 | CUBING-COMPUTED-AS-MULTIPLYING-BY-THREE | Computing $n^3$ as $n\times3$ rather than $n\times n\times n$, confusing the exponent with a multiplicative factor | Foundational |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Perfect Cube Confused with Perfect Square") → P41 (detect: present Example 2's "is 100 a perfect cube?" and check for a "yes" based on its perfect-square familiarity) → P64 (conceptual shift: re-check against the explicit list of cube numbers, showing 100 falls strictly between $4^3=64$ and $5^3=125$).
- **B02 (targets MC-2)**: P27 ("Cubing Computed as Multiplying by Three") → P41 (detect: present $4^3$ and check for an answer of $12$ instead of $64$) → P64 (conceptual shift: re-derive using the physical cube-block model, counting three full factors of $n$ multiplied together, not $n$ added to itself or multiplied by the exponent).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.arith.exponentiation`.
- **Unlocks**: none recorded in the KG.
- **Related**: none declared; conceptually paired with square numbers (a related but distinct concept elsewhere in the domain).

## Component 8 — Teaching Notes

- estimated_hours = 2 and bloom = remember reflect that cube numbers 1-10 are a fluency/memorization target, paralleling the multiplication table's role for products.
- MC-2 was ranked foundational severity because it reflects a genuine misunderstanding of what exponentiation itself means (a very common and consequential early exponent error), not merely a cube-specific quirk — it would equally corrupt squares, fourth powers, etc. if left unaddressed.
- The shipping-crate transfer probe was deliberately designed around the "doubling side length doesn't double volume" surprise, since this scaling counter-intuition is a genuinely common point of confusion connecting cube numbers to real 3D reasoning, beyond rote memorization of the list.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.arith.exponentiation`) |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
| V-5 | cross_links checked against disk | PASS (none declared) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A03) |
| V-7 | Misconception Registry non-empty | PASS (2 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.85×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Pictorial: physical cube arrays before symbols) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
