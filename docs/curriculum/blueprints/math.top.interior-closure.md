# Teaching Blueprint: Interior, Closure, and Boundary (`math.top.interior-closure`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.top.interior-closure` |
| name | Interior, Closure, and Boundary |
| domain | Topology |
| difficulty | expert |
| bloom | apply |
| mastery_threshold | 0.85 → MAMR = ⌈0.85×5⌉ = 5/5 |
| estimated_hours | 3 |
| requires | `math.top.open-sets` |
| unlocks | none |
| cross_links | none |
| CPA_entry_stage | A (Abstract) — expert learner already fluent in open sets and topological spaces; interior/closure/boundary are derived concepts defined purely from the open-set structure |
| description (KG) | int(A) = largest open subset of A. cl(A) = smallest closed set containing A. ∂A = cl(A)\int(A). Dense sets: cl(A) = X. |

## Component 1 — Learning Objectives

- LO1: Define and compute the **interior** $\mathrm{int}(A)$ (largest open set contained in $A$, equivalently the union of all open sets $\subseteq A$), the **closure** $\mathrm{cl}(A)$ (smallest closed set containing $A$, equivalently the intersection of all closed sets $\supseteq A$), and the **boundary** $\partial A = \mathrm{cl}(A)\setminus\mathrm{int}(A)$ — for explicit subsets in standard topological spaces.
- LO2: Apply the **characterization via neighborhoods** — $x\in\mathrm{int}(A)$ iff some open set containing $x$ is entirely in $A$; $x\in\mathrm{cl}(A)$ iff every open set containing $x$ intersects $A$; $x\in\partial A$ iff every open set containing $x$ intersects both $A$ and $A^c$ — to determine membership without finding the entire interior/closure.
- LO3: Identify **dense subsets** ($\mathrm{cl}(A)=X$) and apply the criterion $A$ is dense iff every nonempty open set intersects $A$, recognizing density as the condition that $A$'s closure exhausts the whole space.

## Component 2 — Prerequisite Check

Assumes mastery of `math.top.open-sets` (open and closed sets in a topological space, complements of open sets are closed, finite intersections and arbitrary unions of open sets are open).

## Component 3 — Core Explanation

**Interior** $\mathrm{int}(A)$: the largest open set contained in $A$. Equivalently, $\mathrm{int}(A)=\bigcup\{U:U\text{ open},U\subseteq A\}$. A point $x\in\mathrm{int}(A)$ iff $x$ has a neighborhood (open set containing $x$) lying entirely in $A$. Properties: $\mathrm{int}(A)\subseteq A$; $A$ is open iff $A=\mathrm{int}(A)$; $\mathrm{int}(\mathrm{int}(A))=\mathrm{int}(A)$ (idempotent).

**Closure** $\mathrm{cl}(A)$: the smallest closed set containing $A$. Equivalently, $\mathrm{cl}(A)=\bigcap\{F:F\text{ closed},F\supseteq A\}$. In a metric space, $x\in\mathrm{cl}(A)$ iff $x$ is a limit of some sequence in $A$ (sequential characterization). In a general topological space: $x\in\mathrm{cl}(A)$ iff every open set containing $x$ meets $A$ (neighborhood characterization). Properties: $A\subseteq\mathrm{cl}(A)$; $A$ is closed iff $A=\mathrm{cl}(A)$; $\mathrm{cl}(\mathrm{cl}(A))=\mathrm{cl}(A)$ (idempotent).

**Boundary** $\partial A=\mathrm{cl}(A)\setminus\mathrm{int}(A)$: the set of points that are in the closure but not the interior. Equivalently, $x\in\partial A$ iff every neighborhood of $x$ meets both $A$ and $X\setminus A$. Note: $\partial A=\partial(A^c)$; open sets have empty boundary iff they equal their interior... wait, $\partial A=\emptyset$ iff $A$ is clopen.

**Dense subsets**: $A$ is dense in $X$ iff $\mathrm{cl}(A)=X$, equivalently every nonempty open set meets $A$. Example: $\mathbb{Q}$ is dense in $\mathbb{R}$ (every open interval contains a rational).

**Duality with complement**: $\mathrm{cl}(A)=(X\setminus\mathrm{int}(X\setminus A))^c\cdot$... more precisely: $X\setminus\mathrm{int}(A)=\mathrm{cl}(X\setminus A)$ and $X\setminus\mathrm{cl}(A)=\mathrm{int}(X\setminus A)$ — interior and closure are dual operations swapped by complementation.

## Component 4 — Worked Examples

**Example 1 (LO1 — computing interior, closure, boundary in $\mathbb{R}$)**: Let $A=(0,1]\subset\mathbb{R}$ with the standard topology. Interior: the largest open set in $A$ is $(0,1)$ (we cannot include 1 in an open set that stays within $A$ since every open set containing 1 extends beyond 1). So $\mathrm{int}(A)=(0,1)$. Closure: the smallest closed set containing $(0,1]$ is $[0,1]$ (we must add 0 since it's a limit point). So $\mathrm{cl}(A)=[0,1]$. Boundary: $\partial A=[0,1]\setminus(0,1)=\{0,1\}$. Verify the neighborhood characterization for $x=0$: every open interval $(0-\varepsilon,0+\varepsilon)$ meets both $A=(0,1]$ (it contains $(0,\varepsilon)$) and $A^c=(-\infty,0]\cup(1,\infty)$ (it contains $(-\varepsilon,0)$) — so $0\in\partial A$. ✓

**Example 2 (LO2 — neighborhood characterization applied)**: In $\mathbb{R}^2$ with the Euclidean topology, let $A=\{(x,y):x^2+y^2<1\}$ (open unit disk). For $p=(0.5,0)$: the open ball $B(p,0.1)$ lies entirely in $A$, so $p\in\mathrm{int}(A)$. For $q=(1,0)$: every open ball around $q$ contains points inside and outside the disk, so $q\in\partial A$. For $r=(2,0)$: the ball $B(r,0.5)$ misses $A$ entirely, so $r\notin\mathrm{cl}(A)$ — equivalently, $B(r,0.5)\cap A=\emptyset$ confirms $r$ is NOT in the closure. Now: $\mathrm{int}(A)=A$ (the open disk is already open), $\mathrm{cl}(A)=\{(x,y):x^2+y^2\le1\}$ (the closed disk), $\partial A=\{(x,y):x^2+y^2=1\}$ (the unit circle).

**Example 3 (LO3 — density, breaking MC-2)**: Show $\mathbb{Q}$ is dense in $\mathbb{R}$: every nonempty open set in $\mathbb{R}$ contains a rational (by density of $\mathbb{Q}$ in $\mathbb{R}$ from real analysis), so $\mathrm{cl}(\mathbb{Q})=\mathbb{R}$. Now: $\mathrm{int}(\mathbb{Q})=\emptyset$ (no open interval contains only rationals), $\mathrm{cl}(\mathbb{Q})=\mathbb{R}$, $\partial\mathbb{Q}=\mathbb{R}\setminus\emptyset=\mathbb{R}$. So $\mathbb{Q}$ has empty interior, full closure, and boundary equal to the whole space — a striking example showing that interior, closure, and boundary can all differ dramatically from the set itself.

## Component 5 — Teaching Actions

### Teaching Action A01 — Definitions as Extremal Sets (Primitive P11: Representation Shift)

Define int($A$) as the largest open subset of $A$, cl($A$) as the smallest closed superset, boundary as the difference. Present both the set-theoretic definitions (union/intersection) and the equivalent neighborhood characterizations side by side. Work Example 1.

- **MC-1 hook**: ask "is a point $x$ in int($A$) if SOME open set around $x$ lies in $A$, or if EVERY open set around $x$ lies in $A$?" — an "every" answer reveals MC-1 (confusion of interior characterization with closure — interior requires SOME neighborhood inside $A$; closure requires EVERY neighborhood to MEET $A$, not be inside it).

### Teaching Action A02 — Neighborhood Criterion Applied (Primitive P25: Deductive)

Work Example 2 systematically: for each candidate point, apply the neighborhood test directly. Contrast interior (some neighborhood fits inside) vs. boundary (every neighborhood crosses the boundary) vs. exterior (some neighborhood misses entirely).

### Teaching Action A03 — Dense Sets (Primitive P16: Counterexample)

Work Example 3 ($\mathbb{Q}$ in $\mathbb{R}$). Contrast with the Cantor set (nowhere dense: int(cl($C$)) = ∅) and an open interval (dense in itself but not in $\mathbb{R}$). State: "dense means the closure fills the whole space — a dense set is 'everywhere present' even if it looks sparse."

- **MC-2 hook**: ask "if $\mathrm{cl}(A)=X$, does that mean $A=X$?" — a "yes" answer reveals MC-2 (missing that density ($\mathrm{cl}(A)=X$) does not mean $A$ fills the whole space — $\mathbb{Q}$ is a proper subset of $\mathbb{R}$ yet dense).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (5-problem set)**:
  1. In $\mathbb{R}$, compute int($A$), cl($A$), and $\partial A$ for $A=[0,1)\cup\{2\}$.
  2. In $\mathbb{R}^2$, compute int($A$), cl($A$), and $\partial A$ for $A=\{(x,y):0<x\le1,0<y\le1\}$ (half-open square).
  3. Prove: $A$ is open iff $A=\mathrm{int}(A)$. (Use the neighborhood characterization.)
  4. Let $X=\{a,b,c\}$ with topology $\tau=\{\emptyset,\{a\},\{a,b\},X\}$. Compute cl($\{a\}$), int($\{b,c\}$), and $\partial\{b\}$.
  5. Prove that $\mathbb{Q}$ is dense in $\mathbb{R}$ using the definition: $\mathrm{cl}(\mathbb{Q})=\mathbb{R}$, equivalently every nonempty open set meets $\mathbb{Q}$.
- **P76 (Transfer Probe, mode = independence)**: "In functional analysis, the Baire Category Theorem states that a complete metric space cannot be written as a countable union of nowhere-dense sets (sets $A$ with int(cl($A$))=∅). (a) Using the definitions from this lesson, reformulate 'nowhere dense' precisely in terms of interior and closure. Then explain why $\mathbb{Q}$ (a countable union of singletons $\{q\}$, each nowhere dense) cannot be a complete metric space — matching the known fact that $\mathbb{Q}$ with the Euclidean metric is NOT complete. (b) The Baire theorem gives: in $\mathbb{R}$, if $A_n$ are closed with empty interior ($\mathrm{int}(A_n)=\emptyset$), then $\mathrm{int}(\bigcup A_n)=\emptyset$. Using interior/closure vocabulary, explain why 'closed with empty interior' is a precise notion of 'thin,' and give one concrete example of a closed nowhere-dense set in $\mathbb{R}$ other than a finite set."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | INTERIOR-REQUIRES-EVERY-NEIGHBORHOOD | Believing $x\in\mathrm{int}(A)$ requires EVERY neighborhood of $x$ to lie inside $A$ (confusing interior with a stronger condition), missing that SOME neighborhood suffices — and symmetrically mischaracterizing the closure condition | Foundational |
| MC-2 | DENSE-MEANS-EQUAL-TO-WHOLE-SPACE | Believing $\mathrm{cl}(A)=X$ implies $A=X$, missing that density means the closure fills the space while the set itself can be a proper, even sparse, subset | Foundational |
| MC-3 | BOUNDARY-SEPARATES-INSIDE-FROM-OUTSIDE | Believing $\partial A$ is always a "nice" curve or surface separating interior from exterior, missing that boundary can equal the whole space ($\partial\mathbb{Q}=\mathbb{R}$), be empty (for clopen sets), or be a fractal (Cantor set) | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Interior Requires Every Neighborhood") → P41 (detect: ask the neighborhood condition for $x\in\mathrm{int}(A)$) → P64 (conceptual shift: re-state both conditions side by side — interior: ∃ open $U\ni x$ with $U\subseteq A$ (existential); closure: ∀ open $U\ni x$, $U\cap A\neq\emptyset$ (universal) — and test Example 1 with $x=0.5\in(0,1]$: the interval $(0.4,0.6)\subseteq A$ certifies $x\in\mathrm{int}(A)$ without checking every neighborhood).
- **B02 (targets MC-2)**: P27 (name it: "Dense Means Equal to Whole Space") → P41 (detect: ask whether $\mathrm{cl}(\mathbb{Q})=\mathbb{R}$ implies $\mathbb{Q}=\mathbb{R}$) → P64 (conceptual shift: contrast $A\subseteq\mathrm{cl}(A)$ (always true) with $\mathrm{cl}(A)=X$ (density condition); $\mathbb{Q}\subsetneq\mathbb{R}$ but $\mathrm{cl}(\mathbb{Q})=\mathbb{R}$ — the closure is strictly larger than the set because the closure adds all limit points that $\mathbb{Q}$ is missing, namely all irrationals).
- **B03 (targets MC-3)**: P27 (name it: "Boundary Separates Inside from Outside") → P41 (detect: ask what $\partial\mathbb{Q}$ is in $\mathbb{R}$) → P64 (conceptual shift: compute $\partial\mathbb{Q}=\mathrm{cl}(\mathbb{Q})\setminus\mathrm{int}(\mathbb{Q})=\mathbb{R}\setminus\emptyset=\mathbb{R}$ — the boundary can be the entire space; compare with $\partial(0,1)=\{0,1\}$ (the familiar case) to show both extremes are valid, dispelling the geometric "boundary = curve" intuition).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.top.open-sets` (the definition of open and closed sets in a topological space — int, cl, and ∂ are all derived from the open-set structure).
- **Unlocks**: none listed in the KG for this concept.
- **Cross-link**: KG lists no cross-links for this concept.

## Component 8 — Teaching Notes

- estimated_hours = 3 with an expert/apply bloom tag and mastery_threshold = 0.85 (MAMR 5/5) places this at the "3 TAs + 5-problem gate" tier. The 5-problem gate reflects that interior/closure/boundary must be computed in multiple settings (metric spaces, finite topological spaces) and also proved — not just pattern-matched from $\mathbb{R}$.
- The finite topological space example (Problem 4) is deliberate: it forces students to apply the abstract neighborhood characterization without Euclidean intuition, which is where most misconceptions surface.
- The Baire category theorem transfer probe was chosen because it is the single most powerful application of interior/closure vocabulary in functional analysis — making the connection here plants the seed for students who will encounter Baire-category arguments in complete metric spaces.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.top.open-sets`) |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (none in KG → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 5 problems | PASS (MAMR = 5/5) |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.85×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract: expert learner already fluent in open sets and topological spaces) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
