# Teaching Blueprint: Volume (`math.geom.volume`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.geom.volume` |
| name | Volume |
| domain | Geometry |
| difficulty | proficient |
| bloom | apply |
| mastery_threshold | 0.8 → MAMR = ⌈0.8×5⌉ = 4/5 |
| estimated_hours | 5 |
| requires | `math.geom.solid-3d` |
| unlocks | none |
| cross_links | `math.calc.volume-revolution` (not yet authored — see Component 7) |
| CPA_entry_stage | C (Concrete) — computing volume via a standard formula for one solid before naming the general "measure of enclosed space" concept |
| description (KG) | The three-dimensional measure of the space enclosed by a solid; computed by formulas for standard solids or by integration. |

## Component 1 — Learning Objectives

- LO1: Define **volume** as the three-dimensional measure of space enclosed by a solid, and compute it for STANDARD solids from `math.geom.solid-3d` (prisms, pyramids, cylinders, cones, spheres) using their respective formulas.
- LO2: Recognize that different solid TYPES require genuinely DIFFERENT volume formulas — not one universal rule — because their shapes distribute space differently (e.g. a pyramid's volume is $\frac13$ its corresponding prism's, due to how the cross-sectional area shrinks toward the apex), and correctly select the appropriate formula for a given solid's TYPE.
- LO3 (orientation level — full integral-based derivation deferred): recognize, without full derivation, that for solids WITHOUT a simple standard formula (or to derive WHY the standard formulas hold in the first place), volume can be computed by INTEGRATING cross-sectional area over the solid's extent — previewing the general integral-based method that formulas like the pyramid's $\frac13$ factor ultimately come from.

## Component 2 — Prerequisite Check

Assumes mastery of `math.geom.solid-3d` (prisms, pyramids, cones, cylinders, spheres; their faces/edges/vertices and Euler's formula).

## Component 3 — Core Explanation

**Volume measures three-dimensional enclosed space, computed via solid-specific formulas**: for STANDARD solids (from `math.geom.solid-3d`), volume has a known closed-form formula: a RECTANGULAR PRISM has volume $l\times w\times h$; a CYLINDER has volume $\pi r^2h$; a SPHERE has volume $\frac43\pi r^3$; a CONE or PYRAMID has volume $\frac13\times(\text{base area})\times h$. Each formula is specific to its solid's shape — there is no single universal volume formula applicable to every solid type directly.

**Different shapes genuinely need different formulas, not variations of one rule**: the $\frac13$ factor for cones/pyramids (versus no such factor for cylinders/prisms) reflects a REAL geometric difference: a prism/cylinder has the SAME cross-sectional area all the way up, while a cone/pyramid's cross-section SHRINKS continuously to a point at the apex — genuinely LESS material fills the same bounding height/base, specifically by a factor of $\frac13$. This is not an arbitrary constant to memorize disconnected from geometry; it reflects how the shape's cross-section actually behaves.

**The general method — integrating cross-sectional area — is what these formulas come from (orientation level)**: rather than memorizing each solid's formula as an independent fact, volume can be computed GENERALLY by integrating the cross-sectional area $A(x)$ as it varies along the solid's height: $V=\int_a^bA(x)\,dx$. Applying this to a cone (where the cross-sectional radius shrinks LINEARLY, so area shrinks QUADRATICALLY) actually PRODUCES the familiar $\frac13$ factor via direct integration, rather than that factor being a separate memorized constant. Full development of this integral method (including revolving a curve around an axis) is deferred to `math.calc.volume-revolution`.

## Component 4 — Worked Examples

**Example 1 (LO1 — computing volume via standard solid-specific formulas, breaking MC-1)**: for a cylinder with radius $r=3$ and height $h=10$: $V=\pi r^2h=\pi(9)(10)=90\pi\approx282.7$. For a sphere with radius $r=5$: $V=\frac43\pi r^3=\frac43\pi(125)=\frac{500\pi}{3}\approx523.6$. Each computation used the FORMULA specific to that solid's type — a cylinder's formula was never applied to the sphere, or vice versa.

**Example 2 (LO2 — the $\frac13$ factor reflects a genuine shape difference, breaking MC-2)**: a square pyramid with base side $4$ (base area $16$) and height $h=6$ has volume $V=\frac13(16)(6)=32$. Contrast with a rectangular prism of the SAME base ($16$) and SAME height ($6$): $V=16\times6=96$ — exactly THREE TIMES the pyramid's volume. This is not a coincidental numeric relationship: the pyramid's cross-sectional area shrinks continuously from $16$ (at the base) down to $0$ (at the apex), so it genuinely contains LESS material than the prism, which keeps the full cross-sectional area $16$ all the way up — the factor of $\frac13$ reflects exactly how much less.

**Example 3 (LO3, orientation level — deriving the cone's $\frac13$ via cross-sectional integration, breaking MC-3)**: for a cone with base radius $R$ and height $h$, the cross-sectional radius at height $x$ (measured from the apex) is $r(x)=\frac{R}{h}x$ (shrinking LINEARLY), so the cross-sectional AREA is $A(x)=\pi r(x)^2=\pi\frac{R^2}{h^2}x^2$ (shrinking QUADRATICALLY). Integrating: $V=\int_0^hA(x)\,dx=\pi\frac{R^2}{h^2}\int_0^hx^2\,dx=\pi\frac{R^2}{h^2}\cdot\frac{h^3}{3}=\frac13\pi R^2h$ — the familiar cone volume formula, with the $\frac13$ factor EMERGING directly from integrating $x^2$ (giving $\frac{h^3}{3}$), rather than being introduced as a separate memorized constant.

## Component 5 — Teaching Actions

### Teaching Action A01 — Volume Formulas Are Solid-Specific, Applied Directly (Primitive P11: Representation Shift)

State: "each solid type from `math.geom.solid-3d` has its own volume formula — you're not looking for one universal rule, you're identifying which solid you have and applying the RIGHT formula for it." Walk Example 1's application of the cylinder and sphere formulas.

- **MC-1 hook**: ask "is there a single universal volume formula that applies to every solid type directly, without needing to identify which specific type of solid you have?" — a "yes" answer reveals MC-1 (missing that each solid type genuinely requires its own specific formula).

### Teaching Action A02 — The 1/3 Factor Reflects a Real Geometric Difference, Not an Arbitrary Constant (Primitive P28: Conflict Evidence)

Present Example 2's direct evidence: the pyramid's volume is EXACTLY one-third the same-base-same-height prism's volume, a precise ratio, not approximately. State: "this $\frac13$ isn't an arbitrary memorized constant — it reflects that the pyramid's cross-section genuinely shrinks to nothing at the apex, while the prism's stays constant, containing exactly three times less material."

- **MC-2 hook**: ask "is the $\frac13$ factor in the cone/pyramid volume formula an arbitrary constant, unconnected to any actual geometric difference between these shapes and prisms/cylinders?" — a "yes" answer reveals MC-2 (missing that the $\frac13$ factor directly reflects how the cross-sectional area shrinks to the apex, a genuine geometric fact).

### Teaching Action A03 — Standard Formulas Are Themselves Derivable, Not Just Given (Primitive P06: Contrast Pair)

Contrast simply APPLYING the cone formula (Example 1's approach) against Example 3's DERIVATION of that same formula from cross-sectional-area integration. State: "the formulas you memorize for standard solids aren't arbitrary — they can be DERIVED from the general principle of integrating cross-sectional area, and the cone's $\frac13$ falls out directly from that integration, not from a separate rule."

- **MC-3 hook**: ask "are the standard volume formulas (cylinder, cone, sphere, etc.) simply given facts, with no underlying general method connecting them to each other?" — a "yes" answer reveals MC-3 (missing that they can all be derived from the single general method of integrating cross-sectional area).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Compute the volume of a rectangular prism with dimensions $5\times4\times3$.
  2. Compute the volume of a cone with base radius $6$ and height $9$.
  3. For a pyramid and a prism sharing the same base area and height, state the ratio of their volumes, and explain why this ratio holds geometrically (not just numerically).
  4. Without fully deriving it, explain how integrating cross-sectional area could, in principle, be used to derive the sphere's volume formula $\frac43\pi r^3$.
- **P76 (Transfer Probe, mode = independence)**: "A silo is shaped like a cylinder of radius $4$m and height $10$m, topped with a cone of the same radius and height $3$m. (a) Compute the total volume by adding the cylinder's and cone's volumes, using their respective formulas. (b) Explain why you could NOT simply treat the entire silo as one cylinder of height $13$m, citing the geometric reason the cone's cross-section shrinks. (c) Explain, without full derivation, how you would set up (but not necessarily fully evaluate) an integral of cross-sectional area to verify the cone portion's volume independently of the memorized formula."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | VOLUME-ASSUMED-SINGLE-UNIVERSAL-FORMULA | Believing there is a single universal volume formula applicable to any solid, missing that each solid type genuinely requires its own specific formula | Foundational |
| MC-2 | ONE-THIRD-FACTOR-ASSUMED-ARBITRARY | Believing the cone/pyramid's $\frac13$ factor is an arbitrary memorized constant, missing that it directly reflects the cross-section shrinking to the apex | High |
| MC-3 | STANDARD-FORMULAS-ASSUMED-UNDERIVABLE | Believing standard volume formulas are simply given facts with no underlying general method, missing that they can be derived from integrating cross-sectional area | Moderate |

- **B01 (targets MC-1)**: P27 (name it: "Volume Assumed Single Universal Formula") → P41 (detect: ask whether one universal formula applies to every solid) → P64 (conceptual shift: re-walk Example 1's solid-specific formula applications, re-anchoring on "each solid type requires its own specific formula").
- **B02 (targets MC-2)**: P27 (name it: "One-Third Factor Assumed Arbitrary") → P41 (detect: ask whether the $\frac13$ factor is an arbitrary constant) → P64 (conceptual shift: re-walk Example 2's exact same-base-same-height ratio verification, re-anchoring on "the $\frac13$ reflects genuine cross-sectional shrinkage to the apex").
- **B03 (targets MC-3)**: P27 (name it: "Standard Formulas Assumed Underivable") → P41 (detect: ask whether standard formulas are simply given with no underlying general method) → P64 (conceptual shift: re-walk Example 3's cross-sectional-integration derivation of the cone formula, re-anchoring on "formulas are derivable from one general integration method").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.geom.solid-3d` (prisms, pyramids, cones, cylinders, spheres — the solid types this concept's formulas apply to).
- **Unlocks**: none listed in the KG for this concept.
- **Cross-link**: KG lists `math.calc.volume-revolution`, checked via `ls docs/curriculum/blueprints/` and confirmed NOT YET authored. $P76_{mode}=$ **independence**.

## Component 8 — Teaching Notes

- estimated_hours = 5 with a proficient/apply tag supports the "3 TAs + gate" tier, with LO1 and LO2 given full computational depth (solid-specific formula application and the exact same-base-same-height ratio verification) and LO3 kept orientation-level, appropriately previewing the general cross-sectional-integration method via the cone's derivation without deriving every standard solid's formula from scratch.
- **Division of labor**: `math.geom.solid-3d` owns the classification of solid types (prisms, pyramids, cones, cylinders, spheres) and their structural properties; this concept owns computing VOLUME for each type and previewing the general integral method underlying all of them — deliberately using SAME base-and-height dimensions for the pyramid/prism comparison in Example 2 to isolate the shape difference as the single variable producing the $\frac13$ ratio.
- Example 3's deliberate choice to derive the CONE's formula (rather than the sphere's, which requires a less elementary cross-section argument) was chosen because the cone's linear-radius/quadratic-area relationship is the most transparent illustration of the general cross-sectional-integration method at this concept's introductory scope.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS (none listed) |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (`math.calc.volume-revolution` confirmed unauthored → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.8×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Concrete: formula-based computation on specific solids precedes the general enclosed-space concept) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
