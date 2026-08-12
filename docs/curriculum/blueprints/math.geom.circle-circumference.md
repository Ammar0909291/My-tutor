# Teaching Blueprint: Circumference of a Circle (`math.geom.circle-circumference`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.geom.circle-circumference` |
| name | Circumference of a Circle |
| domain | Geometry |
| difficulty | developing |
| bloom | apply |
| mastery_threshold | 0.90 → MAMR = ⌈0.90×5⌉ = 5/5 |
| estimated_hours | 3 |
| requires | `math.geom.circle`, `math.geom.perimeter` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | A (Abstract) |
| description (KG) | The perimeter of a circle: C = 2πr = πd, where r is the radius and π ≈ 3.14159…

 |

## Component 1 — Learning Objectives

- LO1: Apply the circumference formula $C=2\pi r$ (in terms of radius) or EQUIVALENTLY $C=\pi d$ (in terms of diameter) — recognizing these are the SAME formula, since $d=2r$.
- LO2: Choose the CORRECT formula based on which measurement (radius or diameter) is GIVEN, avoiding a mismatched substitution (e.g. using the diameter value in the radius-based formula without adjustment).
- LO3: Recognize $\pi\approx3.14159\ldots$ as an IRRATIONAL constant (a fixed ratio, circumference-to-diameter, true for EVERY circle) — not a value to be re-derived or estimated differently per problem, and understand that answers are often left in terms of $\pi$ (exact) rather than a rounded decimal, unless a decimal approximation is specifically requested.

## Component 2 — Prerequisite Check

Assumes mastery of `math.geom.circle` (the shape) and `math.geom.perimeter` (circumference IS the circle's perimeter, per that concept's own terminology note).

## Component 3 — Core Explanation

The **circumference** of a circle (its perimeter, using the circle-specific name from `math.geom.perimeter`) is $C=2\pi r$ (in terms of radius $r$) or, EQUIVALENTLY, $C=\pi d$ (in terms of diameter $d$) — these are the SAME formula in disguise, since $d=2r$ substituted into $C=\pi d$ gives $C=\pi(2r)=2\pi r$.

Choosing which form to use depends on WHICH measurement is given: if the radius is given, use $C=2\pi r$ directly; if the diameter is given, use $C=\pi d$ directly — mixing these up (e.g. plugging a diameter value into the radius-based formula without first halving it) produces an answer twice too large.

$\pi\approx3.14159\ldots$ is a fixed IRRATIONAL constant — the SAME ratio (circumference-to-diameter) for EVERY circle, regardless of size. It is not something to estimate differently case by case; answers are typically expressed EXACTLY in terms of $\pi$ (e.g. "$10\pi$") rather than as a rounded decimal, unless a decimal approximation is explicitly requested by the problem.

## Component 4 — Worked Examples

**Example 1 (LO1, LO2 — choosing the right formula, breaking MC-1)**: Find the circumference of a circle with radius 5, and separately, a circle with diameter 5. For radius 5: $C=2\pi(5)=10\pi$. For diameter 5: $C=\pi(5)=5\pi$ — a DIFFERENT (smaller) result, since "radius 5" and "diameter 5" describe circles of DIFFERENT actual sizes. A common error uses the SAME formula ($C=2\pi r$) for BOTH cases, plugging the diameter value directly in for $r$ (getting $C=2\pi(5)=10\pi$ for the diameter-5 circle too, DOUBLE the correct $5\pi$) — the given measurement type (radius vs. diameter) must be matched to its CORRECT formula.

**Example 2 (LO3 — π as a fixed universal constant, breaking MC-2)**: Explain why a circle with radius 100 and a circle with radius 1 both have the SAME ratio of circumference to diameter. For radius 100: $C=200\pi$, diameter $=200$, ratio $=\frac{200\pi}{200}=\pi$. For radius 1: $C=2\pi$, diameter $=2$, ratio $=\frac{2\pi}{2}=\pi$ — the SAME value $\pi$ in both cases, confirming this ratio is a universal constant, independent of the circle's actual size. A common error assumes $\pi$ might vary slightly for "very large" or "very small" circles, or needs separate estimation per problem — $\pi$ is a single, fixed mathematical constant, true for every circle without exception.

**Example 3 (LO1 — leaving the answer in exact form)**: Find the circumference of a circle with diameter 8, expressing the answer exactly. $C=\pi(8)=8\pi$ — this EXACT form (not a rounded decimal like "25.13") is the preferred way to express the answer unless a decimal approximation is specifically requested.

## Component 5 — Teaching Actions

### Teaching Action A01 — Match the Given Measurement (Radius or Diameter) to Its Correct Formula (Primitive P06: Contrast Pair)

Work Example 1, explicitly contrasting the radius-based and diameter-based computations for the same numeric value, showing they give different circles' circumferences.

- **MC-1 hook**: this directly targets MC-1 (using the radius formula with a diameter value, or vice versa, without adjustment).

### Teaching Action A02 — π Is a Fixed Universal Constant, Not Circle-Size-Dependent (Primitive P64: Conceptual Shift)

Work Example 2, explicitly verifying the ratio stays constant across differently-sized circles.

- **MC-2 hook**: this directly targets MC-2 (assuming π might vary or need re-estimation for different circle sizes).

### Teaching Action A03 — Leaving Answers in Exact π Form (reused procedure)

Work Example 3, demonstrating the preferred exact-form answer convention.

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.90×5⌉ = 5/5.

- **P77 (4-problem set)**:
  1. Find the circumference of a circle with radius 7 (exact form).
  2. Find the circumference of a circle with diameter 20 (exact form).
  3. Explain why π is described as a universal constant true for every circle, regardless of size.
  4. A circle has circumference $24\pi$. Find its radius.
- **P76 (Transfer Probe, mode = independence)**: "A bicycle manufacturer needs to know how far a bike travels in ONE full rotation of its wheel, given the wheel's DIAMETER is 26 inches. (a) Calculate the distance traveled per wheel rotation (the circumference), leaving your answer in exact π form. (b) Explain why using the diameter-based formula directly (rather than first converting to radius) is the more efficient choice here, given the measurement provided."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | RADIUS-AND-DIAMETER-FORMULAS-MISMATCHED-TO-THE-GIVEN-MEASUREMENT | Using the radius-based formula with a given diameter value (or vice versa) without adjusting, producing an answer off by a factor of 2 | Foundational |
| MC-2 | PI-ASSUMED-TO-VARY-OR-NEED-RE-ESTIMATION-FOR-DIFFERENT-CIRCLE-SIZES | Assuming π might vary slightly or require separate estimation depending on the circle's size, rather than recognizing it as a single fixed universal constant | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Radius and Diameter Formulas Mismatched to the Given Measurement") → P41 (detect: present Example 1 and check whether the correct formula is matched to the given measurement type) → P64 (conceptual shift: re-identify whether radius or diameter was given, then select the matching formula explicitly).
- **B02 (targets MC-2)**: P27 ("Pi Assumed to Vary or Need Re-Estimation for Different Circle Sizes") → P41 (detect: ask whether π needs re-estimating for a very large or very small circle) → P64 (conceptual shift: re-verify the circumference-to-diameter ratio explicitly for circles of different sizes, confirming it's always exactly $\pi$).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.geom.circle`, `math.geom.perimeter`.
- **Unlocks**: none recorded in the KG.
- **Related**: `math.geom.circle-area`.
- **Parent**: `math.geom.circle`.

## Component 8 — Teaching Notes

- mastery_threshold = 0.90 reflects that this is a foundational, frequently-used formula expected to become near-automatic.
- MC-1 was ranked Foundational because it produces a substantially wrong (2x off) numeric answer, while MC-2 was ranked Moderate as a conceptual misunderstanding that doesn't typically affect correct formula application once the constant is accepted as fixed.
- The bicycle-wheel transfer probe was deliberately chosen because "distance per wheel rotation" is a genuinely intuitive, concrete real-world application of circumference, and naturally uses the diameter-based form.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.geom.circle`, `math.geom.perimeter`) |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
| V-5 | cross_links checked against disk | PASS (none declared) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (2 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.90×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1/LO2, Ex2→LO3, Ex3→LO1) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
