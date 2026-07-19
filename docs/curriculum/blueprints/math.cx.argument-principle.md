# Teaching Blueprint: Argument Principle (`math.cx.argument-principle`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.cx.argument-principle` |
| name | Argument Principle |
| domain | Complex Analysis |
| difficulty | expert |
| bloom | apply |
| mastery_threshold | 0.8 → MAMR = ⌈0.8×5⌉ = 4/5 |
| estimated_hours | 5 |
| requires | `math.cx.residue-theorem` |
| unlocks | `math.cx.rouche-theorem` |
| cross_links | (none) |
| CPA_entry_stage | A (Abstract) — expert learner already fluent in the Residue Theorem; the Argument Principle is derived directly as a specific application |
| description (KG) | (1/2πi)∮_C f′(z)/f(z)dz = Z−P, where Z and P are the numbers of zeros and poles inside C (counted with multiplicity). The integral counts the winding number of f around 0. |

## Component 1 — Learning Objectives

- LO1: DERIVE the Argument Principle — $\frac1{2\pi i}\oint_Cf'(z)/f(z)\,dz=Z-P$ — as a direct APPLICATION of the Residue Theorem: showing $f'(z)/f(z)$ has simple poles exactly at $f$'s zeros and poles, with residue equal to the zero's multiplicity (positive) or the pole's order (negative).
- LO2: Apply the Argument Principle to COUNT the zeros of a specific function inside a contour, correctly counting WITH MULTIPLICITY — a genuinely different count from the number of distinct zero locations.
- LO3: Recognize the **winding number** interpretation — $\frac1{2\pi i}\oint_Cf'(z)/f(z)\,dz$ counts how many times $f(z)$ winds around the origin as $z$ traverses $C$ once — connecting the zero/pole-counting formula to a genuinely geometric, visualizable meaning.

## Component 2 — Prerequisite Check

Assumes mastery of `math.cx.residue-theorem` ($\oint_Cf(z)\,dz=2\pi i\sum\text{Res}(f,z_k)$, summing over poles enclosed by $C$).

## Component 3 — Core Explanation

**The Argument Principle is a direct Residue Theorem application to the specific function $f'/f$**: near a zero $z_0$ of $f$ of order $m$ (write $f(z)=(z-z_0)^mg(z)$ with $g(z_0)\ne0$): $\dfrac{f'(z)}{f(z)}=\dfrac m{z-z_0}+\dfrac{g'(z)}{g(z)}$, and $g'/g$ is holomorphic near $z_0$ (since $g(z_0)\ne0$) — so $f'/f$ has a SIMPLE POLE at $z_0$ with residue EXACTLY $m$. Similarly, near a pole $z_1$ of order $k$, $f'/f$ has a simple pole with residue $-k$. Applying the Residue Theorem (already mastered) to $f'/f$ over $C$ sums these residues: $\frac1{2\pi i}\oint_C\frac{f'}f\,dz=\sum(\text{zero multiplicities})-\sum(\text{pole orders})=Z-P$.

**Zeros and poles are counted WITH multiplicity, not by distinct location**: $Z$ and $P$ in the formula are the TOTAL count including multiplicity — a zero of order $3$ contributes $3$ to $Z$, not $1$. This is a genuinely different (and larger) count than simply tallying how many distinct points are zeros or poles.

**The formula equals the winding number of $f(z)$ around $0$**: as $z$ traverses $C$ once, $f(z)$ traces out some closed curve in the complex plane; the value $\frac1{2\pi i}\oint_Cf'(z)/f(z)\,dz$ counts EXACTLY how many times this traced curve winds around the origin. This gives the abstract zero/pole-counting formula a concrete, visualizable geometric meaning — it is not merely an algebraic bookkeeping device.

## Component 4 — Worked Examples

**Example 1 (LO1 — deriving the formula via the Residue Theorem, breaking MC-1)**: For a zero of order $m$ at $z_0$ ($f(z)=(z-z_0)^mg(z)$, $g(z_0)\ne0$): $f'(z)=m(z-z_0)^{m-1}g(z)+(z-z_0)^mg'(z)$, so $\dfrac{f'(z)}{f(z)}=\dfrac{m(z-z_0)^{m-1}g(z)+(z-z_0)^mg'(z)}{(z-z_0)^mg(z)}=\dfrac m{z-z_0}+\dfrac{g'(z)}{g(z)}$ — a simple pole at $z_0$ with residue $m$ (the second term is holomorphic near $z_0$, contributing nothing to the residue). Applying the Residue Theorem (already mastered) to $f'/f$ over a contour $C$ enclosing this zero (and, more generally, all of $f$'s zeros and poles inside $C$): $\frac1{2\pi i}\oint_Cf'/f\,dz=\sum\text{residues}=Z-P$ — directly derived, not a separately-proven independent fact.

**Example 2 (LO2 — counting with multiplicity, breaking MC-2)**: For $f(z)=z^3(z-2)^2$ (no poles) and $C:|z|=3$ (enclosing both $z=0$, a zero of order $3$, and $z=2$, a zero of order $2$): $Z=3+2=5$ — counted WITH multiplicity, not "$2$ distinct zero locations." The formula gives $\frac1{2\pi i}\oint_{|z|=3}f'/f\,dz=Z-P=5-0=5$. A learner counting only distinct locations ($z=0$ and $z=2$, i.e. $2$) would get the wrong answer — multiplicity must be summed, not merely the number of zero points tallied.

**Example 3 (LO3 — the winding-number interpretation, breaking MC-3)**: For $f(z)=z$ on $C:|z|=1$ (parametrize $z=e^{i\theta}$): $f(z)=e^{i\theta}$ traces the unit circle around the origin exactly ONCE as $\theta$ runs $0$ to $2\pi$ — winding number $1$. Directly: $f(z)=z$ has one simple zero at $z=0$ (inside $|z|=1$), no poles, so $Z-P=1-0=1$ — MATCHING the winding number exactly. For $f(z)=z^2$: $f(z)=e^{2i\theta}$ winds around the origin TWICE as $\theta$ runs $0$ to $2\pi$ (the angle doubles) — winding number $2$. Directly: one zero of order $2$ at $z=0$, so $Z-P=2-0=2$ — again matching, confirming $Z-P$ is genuinely the geometric winding number, not merely an abstract residue-sum.

## Component 5 — Teaching Actions

### Teaching Action A01 — The Formula Is Derived, Not Independently Postulated (Primitive P11: Representation Shift)

State: "the Argument Principle isn't a separate new fact to memorize — it's the Residue Theorem applied to one specific, cleverly-chosen function, f′/f, whose poles and residues are computed directly from f's own zeros and poles." Work Example 1's full residue computation at a zero of order m.

- **MC-1 hook**: ask "is the Argument Principle an independent theorem, proven by an argument separate from the Residue Theorem?" — a "yes" answer reveals MC-1 (missing that it is directly derived by applying the Residue Theorem to f′/f).

### Teaching Action A02 — Multiplicity Must Be Summed, Not Just Location Count (Primitive P28: Conflict Evidence)

Present Example 2's direct evidence: $f(z)=z^3(z-2)^2$ has $Z=5$ (with multiplicity), not $2$ (distinct locations). State: "Z and P count multiplicity — a triple zero contributes 3, not 1 — this is a genuinely different number from how many distinct points are zeros or poles."

- **MC-2 hook**: ask "does Z in the Argument Principle count the number of distinct zero locations, rather than counting each zero's multiplicity?" — a "yes" answer reveals MC-2 (undercounting by ignoring multiplicity).

### Teaching Action A03 — Z − P Is the Winding Number, a Geometric Fact (Primitive P06: Contrast Pair)

Contrast Example 3's two cases: $f(z)=z$ (winding number 1, $Z-P=1$) against $f(z)=z^2$ (winding number 2, $Z-P=2$), both matching exactly. State: "this isn't a coincidence of the algebra — Z−P IS the number of times f(z) winds around the origin as z traverses C, a genuinely visualizable geometric quantity."

- **MC-3 hook**: ask "is Z−P a purely abstract algebraic count with no geometric meaning?" — a "yes" answer reveals MC-3 (missing that it directly equals the winding number of f(z) around 0).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Derive the residue of $f'/f$ at a pole of order $k$, mirroring Example 1's zero-of-order-$m$ derivation.
  2. Compute $Z-P$ for $f(z)=(z-1)^2(z+1)^3/z$ over a contour enclosing all three points $z=1,-1,0$.
  3. Explain why counting "2 distinct zeros" instead of "5 total multiplicity" would give the wrong answer for Example 2's function.
  4. For $f(z)=z^3$ on $|z|=1$, state the winding number of $f(z)$ around $0$ and verify it matches $Z-P$.
- **P76 (Transfer Probe, mode = independence)**: "A control-systems engineer analyzes a transfer function $f(z)$ and uses the Argument Principle to count its zeros inside the unit circle (a standard stability-analysis technique). (a) Explain, using this lesson's Residue Theorem derivation, why the engineer can trust this formula without re-deriving stability theory from scratch each time. (b) The engineer's function has a zero of order $2$ inside the contour but reports 'one zero' in their initial analysis. Explain what error this represents and how the Argument Principle's formula would have caught it. (c) A colleague, plotting $f(z)$ as $z$ traverses the contour, observes the resulting curve visually winding around the origin twice, and asks whether this observation is merely a coincidental visual pattern or something the Argument Principle's formula directly predicts. Explain specifically why it is the latter."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | ARGUMENT-PRINCIPLE-AS-INDEPENDENT-THEOREM | Believing the Argument Principle is proven by an argument independent of the Residue Theorem, missing that it is directly derived by applying the Residue Theorem to f′/f | Foundational |
| MC-2 | ZEROS-POLES-COUNTED-BY-LOCATION-NOT-MULTIPLICITY | Believing Z and P count the number of distinct zero/pole locations, missing that they count with multiplicity | Foundational |
| MC-3 | Z-MINUS-P-TREATED-AS-PURELY-ABSTRACT | Believing Z−P is a purely abstract algebraic count with no geometric meaning, missing that it directly equals the winding number of f(z) around 0 | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Argument Principle as Independent Theorem") → P41 (detect: ask a student how the Argument Principle is proven, checking whether they mention the Residue Theorem) → P64 (conceptual shift: re-walk Example 1's full derivation of $f'/f$'s residue at a zero, re-anchoring on "this is the Residue Theorem, applied to one specific function").
- **B02 (targets MC-2)**: P27 (name it: "Zeros/Poles Counted by Location Not Multiplicity") → P41 (detect: ask a student to count Z for $z^3(z-2)^2$ and check whether they answer 2 instead of 5) → P64 (conceptual shift: re-walk Example 2's multiplicity-summed count, re-anchoring on "Z and P sum multiplicities, not distinct locations").
- **B03 (targets MC-3)**: P27 (name it: "Z Minus P Treated as Purely Abstract") → P41 (detect: ask a student whether Z−P has any geometric meaning, checking for "no") → P64 (conceptual shift: re-walk Example 3's winding-number verification for $z$ and $z^2$, re-anchoring on "Z−P is literally the winding number").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.cx.residue-theorem` (the summation-over-enclosed-poles machinery this concept's formula is a direct application of).
- **Unlocks**: `math.cx.rouche-theorem` (uses the Argument Principle's zero-counting directly to compare two functions' zero counts).
- **Cross-link**: KG lists no cross_links for this concept (checked via `ls docs/curriculum/blueprints/` before setting P76_mode — none to check). $P76_{mode}=$ **independence**.

## Component 8 — Teaching Notes

- estimated_hours = 5 with an expert/apply tag places this at a "3 TAs + gate" tier; the concept introduces no genuinely new theoretical machinery beyond `math.cx.residue-theorem`, focusing entirely on the specific derivation (applying the Residue Theorem to $f'/f$) and its two key interpretations (multiplicity-counting, winding number).
- **Division of labor**: `math.cx.residue-theorem` owns the general summation-over-enclosed-poles machinery. This concept, `math.cx.argument-principle`, deliberately does not re-derive that; it owns the SPECIFIC application to $f'/f$, the resulting zero/pole-counting formula (with the multiplicity discipline this requires), and the winding-number geometric interpretation.
- Example 3 deliberately used the simplest possible functions ($f(z)=z$ and $f(z)=z^2$) to verify the winding-number interpretation, so the geometric winding (directly visualizable via $e^{i\theta}$ and $e^{2i\theta}$) could be checked by inspection against the algebraic $Z-P$ count, rather than asserting the geometric meaning without a checkable instance.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (no cross_links listed → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.8×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract: expert learner already fluent in the Residue Theorem; Argument Principle derived directly) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
