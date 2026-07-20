# Teaching Blueprint: Product Topology (`math.top.product-space`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.top.product-space` |
| name | Product Topology |
| domain | Topology |
| difficulty | expert |
| bloom | apply |
| mastery_threshold | 0.85 → MAMR = ⌈0.85×5⌉ = 5/5 |
| estimated_hours | 3 |
| requires | `math.top.topological-space` |
| unlocks | `math.top.tychonoff` |
| cross_links | none |
| CPA_entry_stage | A (Abstract) — expert learner already has the open-set axioms; the task is defining a natural topology on a Cartesian product of two spaces |
| description (KG) | Product topology on $X\times Y$: subbasis of sets $\pi_1^{-1}(U)$ and $\pi_2^{-1}(V)$. Basis: $U\times V$ for open $U\subseteq X$, $V\subseteq Y$. Projections are continuous. Universal property: $f:(Z,\tau)\to X\times Y$ continuous iff each component is continuous. |

## Component 1 — Learning Objectives

- LO1: Construct the product topology on $X\times Y$ via its BASIS of "open rectangles" $U\times V$ (for $U$ open in $X$, $V$ open in $Y$) — and correctly verify a proposed collection of subsets of $X\times Y$ either IS or is NOT the product topology's basis, checking against `math.top.topological-space`'s own axioms (that arbitrary unions of basis elements, together with the basis elements themselves, satisfy the topology requirements).
- LO2: Prove the projections $\pi_1:X\times Y\to X$ and $\pi_2:X\times Y\to Y$ are CONTINUOUS with respect to the product topology, directly from the basis definition — and explain why the product topology is, in a precise sense, the SMALLEST (coarsest) topology on $X\times Y$ making both projections continuous.
- LO3: State and apply the UNIVERSAL PROPERTY: a function $f:(Z,\tau)\to X\times Y$ is continuous if and only if BOTH component functions $\pi_1\circ f$ and $\pi_2\circ f$ are continuous — and correctly use this to determine continuity of a specific map into a product space by checking its two components separately, rather than verifying continuity into the product directly.

## Component 2 — Prerequisite Check

Assumes mastery of `math.top.topological-space` (a set $X$ with open sets $\tau$ satisfying: $\varnothing,X\in\tau$; arbitrary unions and finite intersections of open sets stay open).

## Component 3 — Core Explanation

**The product topology's basis is exactly the "open rectangles"**: given topological spaces $(X,\tau_X)$ and $(Y,\tau_Y)$, the product topology on $X\times Y$ is DEFINED by taking $\{U\times V:U\in\tau_X,V\in\tau_Y\}$ as a BASIS — meaning every open set of $X\times Y$ is a UNION of such "rectangles" (not merely the rectangles themselves, which are not closed under union in general). This directly satisfies `math.top.topological-space`'s own axioms: $\varnothing\times\varnothing=\varnothing$ and $X\times Y$ (the full product) are both rectangles, hence in the resulting topology; arbitrary unions of open sets remain open by construction (a union of unions of rectangles is itself a union of rectangles); finite intersections of open sets remain open since $(U_1\times V_1)\cap(U_2\times V_2)=(U_1\cap U_2)\times(V_1\cap V_2)$, itself a rectangle (using that $\tau_X,\tau_Y$ are each closed under finite intersection).

**Projections are continuous, and the product topology is the SMALLEST topology making them so**: `math.top.topological-space`'s own definition of continuity (preimages of open sets are open) applies directly: for $U$ open in $X$, $\pi_1^{-1}(U)=U\times Y$ — a rectangle (with $V=Y$, itself open in $Y$), hence open in the product topology by construction. So $\pi_1$ is continuous; symmetrically $\pi_2$ is continuous. Moreover, the product topology is the COARSEST (smallest) topology on $X\times Y$ with this property — any topology making both projections continuous must contain every $\pi_1^{-1}(U)=U\times Y$ and every $\pi_2^{-1}(V)=X\times V$ as open sets, and (since topologies are closed under finite intersection) must therefore contain every rectangle $U\times V=(U\times Y)\cap(X\times V)$ — meaning it must contain AT LEAST the product topology, with no smaller topology able to make both projections continuous.

**The universal property reduces continuity into a product to two separate, simpler checks**: a function $f:(Z,\tau)\to X\times Y$ (with $f(z)=(f_1(z),f_2(z))$ for component functions $f_1=\pi_1\circ f$, $f_2=\pi_2\circ f$) is continuous if and only if BOTH $f_1:Z\to X$ and $f_2:Z\to Y$ are continuous. The "only if" direction follows immediately from composing $f$ with the already-continuous projections (a composition of continuous functions is continuous). The "if" direction uses the basis structure directly: to check $f^{-1}(U\times V)$ is open for a basic open rectangle $U\times V$, note $f^{-1}(U\times V)=f_1^{-1}(U)\cap f_2^{-1}(V)$ — an intersection of two open sets (each open since $f_1,f_2$ are assumed continuous), hence open, and checking on basis elements suffices to confirm continuity into the whole topology.

## Component 4 — Worked Examples

**Example 1 (LO1 — verifying/rejecting proposed bases against the axioms, breaking MC-1)**: for $X=Y=\mathbb{R}$ (standard topology), checking whether $\{(a,b)\times(c,d):a<b,c<d\}$ (open RECTANGLES, i.e. open intervals crossed with open intervals) qualifies as a basis for the product topology: yes — this is EXACTLY $U\times V$ for $U,V$ basic open intervals of $\mathbb{R}$, matching the general construction directly. Contrast: checking whether $\{$ open DISCS in $\mathbb{R}^2\}$ (round regions, not rectangles) ALSO generates the SAME product topology: yes, in fact — though built from a different-SHAPED generating collection, open discs and open rectangles generate the identical topology on $\mathbb{R}^2$ (each disc contains a rectangle around any of its points and vice versa) — illustrating that the "basis" is not a uniquely-shaped object, only a uniquely-determined TOPOLOGY, a subtlety worth flagging alongside the primary rectangle construction.

**Example 2 (LO2 — verifying projection continuity directly, breaking MC-2)**: for $X=Y=\mathbb{R}$, checking $\pi_1:\mathbb{R}^2\to\mathbb{R}$, $\pi_1(x,y)=x$ is continuous: for the open interval $U=(2,5)\subseteq\mathbb{R}$, $\pi_1^{-1}(U)=(2,5)\times\mathbb{R}$ — an infinite VERTICAL STRIP, which IS a rectangle (with $V=\mathbb{R}$, open in $Y$), hence open in the product topology by direct construction, confirming continuity at this specific open set (and, by the same argument for any open $U$, in general). This concretely instantiates LO2's claim without needing a separate ad hoc continuity argument specific to projections.

**Example 3 (LO3 — using the universal property to verify continuity into a product, breaking MC-3)**: for $f:\mathbb{R}\to\mathbb{R}^2$, $f(t)=(t^2,\sin t)$ (a parametrized curve): rather than directly verifying $f^{-1}(U\times V)$ is open for every basic rectangle $U\times V$ (a potentially awkward direct check), the universal property reduces this to checking the TWO COMPONENT functions separately: $f_1(t)=t^2$ (continuous, a standard polynomial) and $f_2(t)=\sin t$ (continuous, a standard trigonometric function) — BOTH already known continuous by standard results, so $f$ itself is continuous into $\mathbb{R}^2$ by LO3's theorem, with NO direct verification against the product topology's basis needed at all.

## Component 5 — Teaching Actions

### Teaching Action A01 — The Product Topology's Basis Is Exactly the Open Rectangles (Primitive P11: Representation Shift)

State: "the product topology on $X\times Y$ isn't built from an unfamiliar new axiom system — its basis is just the 'open rectangles' $U\times V$, and `math.top.topological-space`'s own axioms confirm this generates a genuine topology directly." Walk Example 1's verification, including the subtlety that different-shaped bases (rectangles vs. discs) can generate the identical topology.

- **MC-1 hook**: ask "must a basis for the product topology consist specifically of rectangular sets $U\times V$, or could a differently-shaped generating collection produce the SAME topology?" — an "must be rectangular" answer reveals MC-1 (missing that the topology, not the specific shape of its generating basis, is the invariant object).

### Teaching Action A02 — Projections Are Continuous BY CONSTRUCTION, and the Product Topology Is the Smallest Such Topology (Primitive P28: Conflict Evidence)

Present Example 2's direct evidence: $\pi_1^{-1}(U)=U\times Y$ is IMMEDIATELY a basis rectangle, requiring no separate proof technique beyond the basis's own definition. State: "projection continuity isn't a separate fact to prove about the product topology — it's built INTO the topology's own definition, and in fact the product topology is specifically the SMALLEST topology for which this works, not merely one topology among many that happens to have this property."

- **MC-2 hook**: ask "is projection continuity a coincidental property the product topology happens to have, or is the product topology specifically DEFINED to be the smallest topology guaranteeing it?" — a "coincidental" answer reveals MC-2 (missing the direct, by-construction relationship and the coarsest-topology characterization).

### Teaching Action A03 — The Universal Property Reduces Product-Continuity to Two Separate, Simpler Checks (Primitive P06: Contrast Pair)

Contrast the potentially awkward direct verification (checking $f^{-1}(U\times V)$ is open for every basic rectangle) against Example 3's much simpler component-wise check (two standard, already-known continuous functions). State: "you almost never need to verify continuity into a product space directly against its basis — the universal property lets you check each COMPONENT separately, which is usually far easier."

- **MC-3 hook**: ask "to verify a function $f:Z\to X\times Y$ is continuous, is it generally necessary to check preimages of basic rectangles directly, or can checking the two component functions separately suffice?" — a "must check rectangles directly" answer reveals MC-3 (missing the universal property's component-wise shortcut).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. For $X=\{1,2\}$ (discrete topology) and $Y=\{a,b\}$ (discrete topology), list all basis rectangles $U\times V$ of the product topology on $X\times Y$.
  2. Verify directly that $\pi_2:\mathbb{R}^2\to\mathbb{R}$, $\pi_2(x,y)=y$ is continuous, using the basis definition.
  3. State the universal property precisely, in your own words.
  4. Use the universal property to determine whether $g(t)=(e^t,\ln(t+1))$ (for $t>-1$) is continuous into $\mathbb{R}^2$, without checking the product topology's basis directly.
- **P76 (Transfer Probe, mode = independence — no cross-link target listed in the KG for this concept)**: "A robotics engineer models a robot's configuration space as a product of two topological spaces: its position space $X$ (a 2D region) and its orientation space $Y$ (a circle of possible headings), so the full configuration space is $X\times Y$. The engineer needs to verify that a proposed control function $f:\mathbb{R}\to X\times Y$ (mapping time to the robot's full configuration) is continuous. (a) Using this lesson's universal property, explain what TWO simpler checks the engineer needs to perform instead of directly verifying continuity into $X\times Y$. (b) Explain why the engineer can trust that the product topology on $X\times Y$ is the natural, 'smallest reasonable' choice for making the position-projection and orientation-projection functions both continuous. (c) If the engineer's control function's position component is known continuous but the orientation component is NOT known to be continuous, explain what the universal property allows you to conclude (or not conclude) about $f$'s overall continuity into the product space."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | PRODUCT-TOPOLOGY-BASIS-ASSUMED-UNIQUELY-RECTANGULAR | Believing a basis for the product topology must consist specifically of rectangular sets, missing that differently-shaped generating collections can produce the identical topology | Foundational |
| MC-2 | PROJECTION-CONTINUITY-ASSUMED-COINCIDENTAL | Believing projection continuity is a coincidental property of the product topology rather than a direct, by-construction consequence, and missing the coarsest-topology characterization | High |
| MC-3 | PRODUCT-CONTINUITY-ASSUMED-TO-REQUIRE-DIRECT-BASIS-CHECK | Believing verifying continuity into a product space generally requires checking preimages of basic rectangles directly, missing the universal property's component-wise shortcut | Moderate |

- **B01 (targets MC-1)**: P27 (name it: "Product Topology Basis Assumed Uniquely Rectangular") → P41 (detect: ask whether a basis must be rectangular) → P64 (conceptual shift: re-walk Example 1's rectangles-vs-discs comparison).
- **B02 (targets MC-2)**: P27 (name it: "Projection Continuity Assumed Coincidental") → P41 (detect: ask whether projection continuity is coincidental or by-construction) → P64 (conceptual shift: re-walk Example 2's direct basis-element verification).
- **B03 (targets MC-3)**: P27 (name it: "Product Continuity Assumed to Require Direct Basis Check") → P41 (detect: ask whether verifying product continuity requires a direct basis check) → P64 (conceptual shift: re-walk Example 3's component-wise universal-property application).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.top.topological-space` (the open-set axioms this concept's basis construction directly builds on and verifies against).
- **Unlocks**: `math.top.tychonoff` (Tychonoff's theorem, generalizing this concept's finite-product construction to arbitrary — possibly infinite — products, and proving compactness is preserved).
- **Cross-link**: KG lists none for this concept. $P76_{mode}=$ **independence** (no cross-link target to check).

## Component 8 — Teaching Notes

- estimated_hours = 3 with an expert/apply tag supports the "3 TAs + gate" tier, with LO1 establishing the basis construction with a genuine subtlety (basis shape non-uniqueness), LO2 given full depth via the coarsest-topology characterization, and LO3 demonstrating the universal property's genuine practical simplification.
- **Division of labor**: `math.top.topological-space` already owns the general open-set axioms this concept's basis construction is checked against (verified by grep — no product-space, projection, or universal-property content found there). This concept owns the full product-topology construction: the basis, projection continuity (with its coarsest-topology characterization), and the universal property — all genuinely new material.
- Example 1's deliberate inclusion of the rectangles-vs-discs subtlety (rather than only presenting the rectangle basis) was chosen to prevent MC-1 from taking root at the outset — introducing the "basis shape isn't unique, only the resulting topology is" idea immediately, rather than allowing an unexamined "the basis must look like this" assumption to form before it could be corrected later.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS (`math.top.tychonoff`) |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (none listed in KG → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.85×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract: expert learner already has open-set axioms; task is the natural product-space construction) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
