# Teaching Blueprint: Pythagorean Theorem (`math.geom.pythagorean-theorem`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.geom.pythagorean-theorem` |
| name | Pythagorean Theorem |
| domain | Geometry |
| difficulty | developing |
| bloom | apply |
| mastery_threshold | 0.95 → MAMR = ⌈0.95×5⌉ = 5/5 |
| estimated_hours | 8 |
| requires | `math.geom.right-triangle`, `math.arith.square-numbers` |
| unlocks | `math.geom.distance-formula`, `math.trig.right-triangle-trig`, `math.geom.pythagorean-converse` |
| cross_links | `math.nt.pythagorean-triples`, `math.geom.distance-formula` (**both not yet authored** — verified via `ls`; P76_mode = independence, see Component 7) |
| CPA_entry_stage | C (Concrete) — physical area-square dissection proof before symbolic formula drill |
| description (KG) | In a right triangle with legs a, b and hypotenuse c: a² + b² = c². One of the most fundamental results in all of mathematics with hundreds of proofs. |

## Component 1 — Learning Objectives

- LO1: State the Pythagorean Theorem ($a^2+b^2=c^2$) correctly identifying which side is the hypotenuse (opposite the right angle, always the longest side) versus the two legs.
- LO2: Apply the theorem to find an unknown side length — either the hypotenuse (given both legs) or a leg (given the hypotenuse and one leg) — including recognizing that solving for a leg requires *subtracting* squares, not adding.
- LO3: Apply the theorem to determine whether a given set of three side lengths could form a right triangle at all (i.e., verify $a^2+b^2=c^2$ holds for the proposed longest side), as a bridge toward the converse and toward recognizing common Pythagorean triples.

## Component 2 — Prerequisite Check

Assumes mastery of `math.geom.right-triangle` (a triangle with one 90° angle; the hypotenuse is opposite the right angle and is the longest side) and `math.arith.square-numbers` (fluent squaring and perfect-square recognition, needed for both computing $a^2+b^2$ and for taking the resulting square root).

## Component 3 — Core Explanation

**The Pythagorean Theorem**: in any right triangle with legs $a,b$ (the two sides forming the right angle) and hypotenuse $c$ (the side opposite the right angle, always the longest side):
$$a^2+b^2=c^2$$

**Solving for the hypotenuse** (given both legs): $c=\sqrt{a^2+b^2}$ — square each leg, add, then take the square root.

**Solving for a leg** (given the hypotenuse and the other leg): rearrange to $a^2=c^2-b^2$, so $a=\sqrt{c^2-b^2}$ — here the operation is **subtraction**, not addition, because the hypotenuse's square already "contains" both legs' squares combined; isolating one leg means removing the other leg's contribution from the hypotenuse's square.

**Using the theorem as a right-triangle test**: given three lengths, compute whether the square of the longest matches the sum of the squares of the other two. If $a^2+b^2=c^2$ holds (with $c$ the longest), the triangle *could* be a right triangle (this direction of reasoning is completed formally by the converse, `math.geom.pythagorean-converse`, but the arithmetic check itself is exactly this theorem's formula). Triples of positive integers satisfying this relation exactly (like 3-4-5, or 5-12-13) are called **Pythagorean triples** and recur throughout mathematics.

## Component 4 — Worked Examples

**Example 1 (LO1/LO2 — solving for the hypotenuse)**: A right triangle has legs $a=6$, $b=8$. Find $c$.
$c^2 = 6^2+8^2 = 36+64=100$, so $c=\sqrt{100}=10$.

**Example 2 (LO2 — solving for a leg, breaking MC-1)**: A right triangle has hypotenuse $c=13$ and one leg $b=5$. Find the other leg $a$.
$a^2 = c^2-b^2 = 169-25=144$, so $a=\sqrt{144}=12$. (Note: **subtraction**, not addition — a common point of error, since the formula's *usual* presentation is additive.)

**Example 3 (LO3 — right-triangle test / triples)**: Do side lengths 9, 12, 15 form a right triangle? The longest is 15: check $9^2+12^2 \stackrel{?}{=} 15^2$: $81+144=225=15^2$. ✓ Yes — and this is in fact the 3-4-5 triple scaled by 3 (a recognizable Pythagorean triple pattern).

## Component 5 — Teaching Actions

### Teaching Action A01 — The Theorem via Area Dissection (Primitive P11: Representation Shift)

Draw a right triangle with legs 3 and 4. Construct a physical square on each side: a 3×3 square (area 9) on one leg, a 4×4 square (area 16) on the other leg, and a 5×5 square (area 25) on the hypotenuse — using the already-known 3-4-5 right triangle. Show concretely (by counting unit squares, or by a classic dissection argument) that the two smaller squares' areas *combine exactly* to fill the larger square: $9+16=25$. State: "this is exactly $a^2+b^2=c^2$ — the theorem says the *areas* of the two leg-squares together equal the area of the hypotenuse-square."

Shift to the symbolic formula: $a^2+b^2=c^2$, explicitly labeling which sides are $a,b$ (the legs, forming the right angle) and which is $c$ (the hypotenuse, opposite the right angle, always the longest side — recalled from `math.geom.right-triangle`).

- **MC-1 hook**: give students a problem where the hypotenuse and one leg are known (not both legs) and ask them to "use the Pythagorean theorem" without further guidance — an answer that adds $c^2+b^2$ (instead of subtracting) reveals MC-1 (defaulting to addition regardless of which side is unknown).

### Teaching Action A02 — Solving for a Leg vs. the Hypotenuse, and the Right-Triangle Test (Primitive P06: Contrast Pair)

**Contrast 1 (targets MC-1)**: Place Example 1 (solve for hypotenuse, add the squares) directly beside Example 2 (solve for a leg, subtract the squares). Walk through both, emphasizing: "ask first — is the unknown side the hypotenuse, or a leg? If it's the hypotenuse, add. If it's a leg, subtract the known leg's square from the hypotenuse's square." State the general rule: whichever variable is isolated, the other two terms move to the other side with a sign flip from the standard $a^2+b^2=c^2$ form.

**Contrast 2 (targets MC-2, the right-triangle test direction)**: Present two candidate triples: 6-8-10 (works: $36+64=100$) and 6-8-11 (fails: $36+64=100 \neq 121$). Ask which forms a right triangle. This breaks the assumption that "any three positive numbers automatically satisfy some right triangle" — reinforcing that the theorem is a specific *equation* that must actually hold, checked against the *longest* side specifically (using a non-longest side as $c$ by mistake is a related error worth flagging: e.g. checking $6^2+10^2\stackrel{?}{=}8^2$ would wrongly "fail" a valid triple).

### Teaching Action A03 — Composite Application (Primitive P28: Conflict Evidence)

Present a multi-step real-world composite problem: "A rectangular room is 12m long and 9m wide. A support cable runs from one corner of the floor diagonally up to the opposite top corner of the room, which is 8m tall. Find the length of the cable." This requires two sequential applications: first the floor diagonal ($\sqrt{12^2+9^2}=\sqrt{144+81}=\sqrt{225}=15$m), then a second right triangle using that diagonal as one leg and the room height as the other leg to find the true 3D cable length ($\sqrt{15^2+8^2}=\sqrt{225+64}=\sqrt{289}=17$m). This forces sequential correct identification of which side is the hypotenuse at *each* stage, preventing rote single-application pattern-matching.

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. A right triangle has legs 5 and 12. Find the hypotenuse.
  2. A right triangle has hypotenuse 25 and one leg 7. Find the other leg.
  3. Do side lengths 8, 15, 17 form a right triangle? Show the check.
  4. A ladder problem: a ladder 13m long leans against a wall, its base 5m from the wall. How high up the wall does it reach?
- **P76 (Transfer Probe, mode = independence)**: "A baseball diamond is a square with each side 90 feet. A shortstop needs to throw the ball in a straight line from a point at second base directly to first base — using the Pythagorean theorem (treating the diamond's diagonal as a right-triangle hypotenuse with two 90-foot legs), find that throw distance. Separately: an engineer claims a triangular brace with sides 20cm, 21cm, and 29cm is a right-triangle brace — verify or refute this claim using the theorem." *Component 7 note: these two scenarios were chosen independently rather than cross-linking to `math.nt.pythagorean-triples` or `math.geom.distance-formula`, since neither has an authored blueprint yet.*
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | ALWAYS-ADD-SQUARES | Defaulting to adding the two known squares regardless of whether the unknown side is the hypotenuse or a leg, instead of subtracting when solving for a leg | Foundational |
| MC-2 | ANY-TRIPLE-IS-RIGHT-TRIANGLE | Believing any three positive side lengths automatically satisfy the Pythagorean relation, without checking the equation actually holds against the correctly identified longest side | Moderate |
| MC-3 | WRONG-SIDE-TREATED-AS-HYPOTENUSE | Checking the Pythagorean relation using a leg (not the longest side) as if it were $c$, producing a false negative for a genuinely valid right triangle | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Always-Add Default") → P41 (detect: give a hypotenuse-and-one-leg problem and check whether the student adds instead of subtracts) → P64 (conceptual shift: re-anchor on the dissection model — the leg-squares' areas *combine to make* the hypotenuse-square's area, so recovering a missing leg means removing the other leg's area from the total, i.e. subtracting).
- **B02 (targets MC-2)**: P27 (name it: "Automatic-Triple Assumption") → P41 (detect: present a non-Pythagorean triple like 6-8-11 and ask if it forms a right triangle — an incorrect "yes" without checking reveals MC-2) → P64 (conceptual shift: re-derive by actually computing both sides of the equation and comparing).
- **B03 (targets MC-3)**: P27 (name it: "Wrong-Side-as-Hypotenuse") → P41 (detect: give a valid triple like 6-8-10 but ask the student to check it using 8 as $c$ — an incorrect "fails, not a right triangle" conclusion reveals MC-3) → P64 (conceptual shift: re-anchor on `math.geom.right-triangle`'s definition — the hypotenuse is always the longest side, opposite the right angle, and must be identified correctly *before* applying the formula).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.geom.right-triangle` (defines the hypotenuse/leg vocabulary this theorem depends on), `math.arith.square-numbers` (fluent squaring, needed for both directions of the formula and for extracting square roots of the results).
- **Unlocks**: `math.geom.distance-formula` (the coordinate-plane distance formula is a direct restatement of this theorem with $\Delta x,\Delta y$ as legs), `math.trig.right-triangle-trig` (trigonometric ratios are defined on the same right-triangle side structure this theorem governs), `math.geom.pythagorean-converse` (the logical converse of this theorem, using the same equation as a *sufficient* condition for right-angledness).
- **Cross-link**: KG lists `math.nt.pythagorean-triples` and `math.geom.distance-formula` as cross-links. Verified via directory listing that neither blueprint yet exists. Per the established P76_mode rule, this blueprint uses **independence** mode. A future revision, once either target is authored, may add a genuine cross-link probe — e.g. connecting this theorem's arithmetic directly to the classification/generation of Pythagorean triples, or to deriving the coordinate distance formula.

## Component 8 — Teaching Notes

- estimated_hours = 8 with a developing/apply tag and the corpus's highest-seen mastery_threshold (0.95) reflects this concept's status as named in its own KG description ("one of the most fundamental results in all of mathematics") — warranting the denser "3 main TAs + gate" structure (A01 concrete proof, A02 direction-of-solving contrast, A03 composite two-stage application) rather than the more compact 2-TA pattern used for narrower h=6-8 concepts.
- A03's two-right-triangle composite problem was deliberately chosen over a single harder single-application problem, because the dominant failure mode at this level is not computational difficulty but *misidentifying which side is unknown/which is the hypotenuse at each step* — a composite problem forces that identification twice, independently, which a single harder computation would not test.
- The right-triangle-test direction (LO3) was deliberately scoped to the arithmetic check only, explicitly deferring the full logical converse (given the equation holds, the triangle IS a right triangle) to `math.geom.pythagorean-converse` — this blueprint teaches the forward direction and the mechanical check, not the converse's logical justification, to avoid duplicating that concept's own teaching content.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (both) |
| V-4 | unlocks concepts named accurately from KG | PASS |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (both confirmed absent → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.95×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Concrete: area dissection before formula) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1/LO2, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
