# Teaching Blueprint: Open and Closed Sets (Topology) (`math.top.open-sets`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.top.open-sets` |
| name | Open and Closed Sets (Topology) |
| domain | Topology |
| difficulty | expert |
| bloom | understand |
| mastery_threshold | 0.9 → MAMR = ⌈0.9×5⌉ = 5/5 |
| estimated_hours | 4 |
| requires | `math.top.topological-space` |
| unlocks | `math.top.interior-closure`, `math.top.connectedness` |
| cross_links | `math.real.open-sets` |
| CPA_entry_stage | C (Concrete) — computing open sets, closed sets, and interiors directly from a declared topology on a small finite set, with no metric anywhere, before the general definitions are stated abstractly |
| description (KG) | Open sets: elements of τ. Closed sets: complements of open sets. Interior int(A): largest open set in A. Closure cl(A): smallest closed set containing A. Boundary ∂A = cl(A)∩cl(Aᶜ). |

## Component 1 — Learning Objectives

- LO1: Define **open sets** simply as the ELEMENTS of a topology $\tau$ (per `math.top.topological-space`'s own axioms) and **closed sets** as complements of open sets ($X\setminus U$ for $U\in\tau$) — recognizing these definitions require NO reference to distance or metric balls at all, genuinely generalizing `math.real.open-sets`' metric-based definitions to any topological space, including non-metrizable ones.
- LO2: Define the **interior** $\text{int}(A)$ as the LARGEST open set contained in $A$, and the **closure** $\text{cl}(A)$ as the SMALLEST closed set containing $A$ — and recognize that a NONEMPTY set can have EMPTY interior (no open set, other than $\varnothing$, fits entirely inside it).
- LO3: Define the **boundary** $\partial A = \text{cl}(A)\cap\text{cl}(A^c)$ (points that are limit points of both $A$ and its complement), verify this recovers the familiar "two endpoints" answer for an interval in $\mathbb{R}$, and recognize that a set's boundary can be dramatically LARGER than intuition suggests — even the entire space.

## Component 2 — Prerequisite Check

Assumes mastery of `math.top.topological-space` (a topology $\tau$ on $X$ is a collection of subsets — the ones DECLARED "open" — satisfying three axioms: $\varnothing,X\in\tau$; arbitrary unions of members of $\tau$ are in $\tau$; FINITE intersections of members of $\tau$ are in $\tau$; openness is relative to the chosen $\tau$, not an intrinsic property of a set; not every topology arises from a metric).

## Component 3 — Core Explanation

**Open and closed, defined purely from $\tau$, with no metric anywhere**: an open set is simply any set that IS an element of the topology $\tau$ — a pure declaration, exactly as `math.top.topological-space` established. A closed set is the complement (within $X$) of an open set: $C$ is closed iff $X\setminus C\in\tau$. `math.real.open-sets` built these same words ("open," "closed") from a metric's open balls; here, they are defined ENTIRELY from the topology's own declared collection $\tau$, with no notion of distance involved at all — a genuine generalization, not merely a relabeling of the metric-space case.

**Interior: the largest open set fitting inside, which can be empty**: the **interior** of $A$, $\text{int}(A)$, is the LARGEST open set contained in $A$ — equivalently, the union of every open subset of $A$. Crucially, $\text{int}(A)$ can be EMPTY even when $A$ itself is nonempty: if no open set (other than $\varnothing$) happens to fit entirely inside $A$, then $\text{int}(A)=\varnothing$ — a single point, or a "thin" set relative to the topology, is a common way this happens.

**Closure and boundary: recovering familiar answers, and encountering surprising ones**: the **closure** of $A$, $\text{cl}(A)$, is the SMALLEST closed set containing $A$ — equivalently, the intersection of every closed superset of $A$ (directly generalizing `math.real.open-sets`' own closure concept beyond the metric setting). The **boundary** $\partial A = \text{cl}(A)\cap\text{cl}(A^c)$ collects points that are limit points of BOTH $A$ and its complement $A^c$. For familiar sets (like an interval in $\mathbb{R}$), this recovers exactly the intuitive "edge points" — but the boundary can be dramatically larger than intuition suggests: a set that is DENSE (its closure is the whole space) alongside a complement that is ALSO dense can have a boundary equal to the entire space.

## Component 4 — Worked Examples

**Example 1 (LO1 — open and closed sets from a declared topology, no metric involved, breaking MC-1)**: Let $X=\{a,b,c\}$ with $\tau=\{\varnothing,\{a\},\{a,b\},X\}$ (a genuine topology, satisfying all three axioms — verifiable directly, no metric anywhere). The OPEN sets are exactly $\tau$'s four elements. The CLOSED sets are their complements: $X\setminus\varnothing=X$; $X\setminus\{a\}=\{b,c\}$; $X\setminus\{a,b\}=\{c\}$; $X\setminus X=\varnothing$ — so the closed sets are $\{X,\{b,c\},\{c\},\varnothing\}$. This entire computation used ZERO distance or metric-ball reasoning, in direct contrast to `math.real.open-sets`' ball-based definitions.

**Example 2 (LO2 — a nonempty set with EMPTY interior, breaking MC-2)**: Using the same $X,\tau$: compute $\text{int}(\{b\})$ — the largest open set contained in $\{b\}$. Checking each open set against $\{b\}$: $\varnothing\subseteq\{b\}$ ✓ (trivially); $\{a\}\not\subseteq\{b\}$; $\{a,b\}\not\subseteq\{b\}$; $X\not\subseteq\{b\}$. The ONLY open subset of $\{b\}$ is $\varnothing$ itself — so $\text{int}(\{b\})=\varnothing$, even though $\{b\}$ is a perfectly nonempty set. Contrast: $\text{int}(\{a,b\})$ — since $\{a,b\}\in\tau$ itself, and $\{a,b\}\subseteq\{a,b\}$ trivially, $\text{int}(\{a,b\})=\{a,b\}$ (an already-open set is its own interior).

**Example 3 (LO3 — recovering the familiar answer, then a dramatically larger boundary, breaking MC-3)**: In $\mathbb{R}$ (standard topology), for $A=(2,5)$ (`math.real.open-sets`' own Example 1): $\text{cl}(A)=[2,5]$, and $\text{cl}(A^c)=\text{cl}((-\infty,2]\cup[5,\infty))=(-\infty,2]\cup[5,\infty)$ (already closed). So $\partial A = [2,5]\cap\big((-\infty,2]\cup[5,\infty)\big)=\{2,5\}$ — exactly the two endpoints, matching familiar intuition. Now let $A=\mathbb{Q}$ (the rationals): $\text{cl}(\mathbb{Q})=\mathbb{R}$ (every real number is a limit of rationals — $\mathbb{Q}$ is DENSE in $\mathbb{R}$), and $\text{cl}(\mathbb{Q}^c)=\text{cl}(\text{irrationals})=\mathbb{R}$ too (the irrationals are ALSO dense in $\mathbb{R}$). So $\partial\mathbb{Q} = \mathbb{R}\cap\mathbb{R}=\mathbb{R}$ — the boundary of $\mathbb{Q}$ is the ENTIRE real line, a vastly different, far larger result than the "just two endpoints" pattern the interval example might suggest.

## Component 5 — Teaching Actions

### Teaching Action A01 — Open and Closed, No Metric Required (Primitive P11: Representation Shift)

State: "`math.real.open-sets` built open sets from balls and distance — here, a set is open simply because it's declared to be, as an element of $\tau$. Closed is just the complement. No distance anywhere." Work Example 1's full computation of the open and closed sets from the declared topology.

- **MC-1 hook**: ask "can interior, closure, and boundary only be computed using distance or metric balls?" — a "yes" answer reveals MC-1 (missing that these concepts are defined purely from the topology's declared open/closed sets, meaningfully even without any metric).

### Teaching Action A02 — A Nonempty Set Can Have Empty Interior (Primitive P28: Conflict Evidence)

Present Example 2's direct evidence: $\{b\}$ is nonempty, yet $\text{int}(\{b\})=\varnothing$, since no open set besides $\varnothing$ fits inside it. State: "interior asks 'what's the biggest open set hiding INSIDE this set' — and for some perfectly nonempty sets, in some topologies, the honest answer is nothing at all."

- **MC-2 hook**: ask "does every nonempty set have a nonempty interior?" — a "yes" answer reveals MC-2 (missing that sets like single points, or dense-complement sets like ℚ in ℝ, can have entirely empty interior).

### Teaching Action A03 — Boundary Can Be the Whole Space (Primitive P06: Contrast Pair)

Contrast Example 3's two boundary computations: $\partial(2,5)=\{2,5\}$ (small, matching intuition) versus $\partial\mathbb{Q}=\mathbb{R}$ (the entire real line). State: "boundary isn't always a thin 'edge' — when a set and its complement are BOTH dense, as with the rationals and irrationals, the boundary swallows the whole space."

- **MC-3 hook**: ask "is the boundary of a set always a small, thin collection of 'edge' points, like the endpoints of an interval?" — a "yes" answer reveals MC-3 (missing that a set dense alongside a dense complement can have a boundary equal to the entire space).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. For $X=\{a,b,c\}$ with $\tau=\{\varnothing,\{a\},\{a,b\},X\}$, list all closed sets.
  2. For the same $X,\tau$, compute $\text{int}(\{a,c\})$.
  3. In $\mathbb{R}$, compute $\partial[0,3]$ (the boundary of the closed interval $[0,3]$), and check it matches the endpoint pattern from Example 3's $(2,5)$ case.
  4. Explain why $\partial\mathbb{Q}=\mathbb{R}$, referencing the density of both the rationals and the irrationals.
- **P76 (Transfer Probe, mode = cross-link probe against `math.real.open-sets`)**: "Recall from `math.real.open-sets` that in a metric space, a set $U$ is open iff every point has an open ball fitting inside it, and closure was defined via limit points reachable by arbitrarily small balls. (a) Explain precisely how this lesson's purely topological definitions (open = element of $\tau$; closed = complement of an open set) recover EXACTLY the same open and closed sets as `math.real.open-sets`' ball-based definitions, when $\tau$ happens to be the metric topology generated by open balls. (b) That lesson's Example 3 showed $S=[0,1)$ is neither open nor closed. Using this lesson's interior/closure definitions, compute $\text{int}(S)$ and $\text{cl}(S)$, and confirm $S\ne\text{int}(S)$ and $S\ne\text{cl}(S)$ — exactly why $S$ is neither. (c) Explain why the fully general, metric-free definitions in this lesson are necessary in the first place, given `math.top.topological-space`'s own finding that some topologies (like the indiscrete topology) do not arise from any metric at all."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | TOPOLOGICAL-CONCEPTS-ASSUMED-TO-NEED-A-METRIC | Believing interior, closure, and boundary can only be defined or computed using distance/metric balls, missing that they are defined purely from the topology's declared open/closed sets | Foundational |
| MC-2 | NONEMPTY-SET-ASSUMED-NONEMPTY-INTERIOR | Believing every nonempty set has a nonempty interior, missing that sets like single points (or dense-complement sets like ℚ in ℝ) can have entirely empty interior | Foundational |
| MC-3 | BOUNDARY-ASSUMED-ALWAYS-THIN | Believing a set's boundary is always a small, thin collection of "edge" points like an interval's endpoints, missing that a set dense alongside a dense complement can have a boundary equal to the entire space | Foundational |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Topological Concepts Assumed to Need a Metric") → P41 (detect: ask a student whether interior/closure/boundary require a distance function to be defined, and check for a "yes") → P64 (conceptual shift: re-walk Example 1's fully metric-free computation of open and closed sets from a declared $\tau$, re-anchoring on "these concepts are built entirely from which sets are DECLARED open — no distance needed at all").
- **B02 (targets MC-2)**: P27 (name it: "Nonempty Set Assumed Nonempty Interior") → P41 (detect: ask a student whether a nonempty set can ever have empty interior, and check for a "no") → P64 (conceptual shift: re-walk Example 2's $\text{int}(\{b\})=\varnothing$ computation, re-anchoring on "interior asks what open set fits INSIDE — and sometimes, honestly, nothing does").
- **B03 (targets MC-3)**: P27 (name it: "Boundary Assumed Always Thin") → P41 (detect: ask a student whether a set's boundary is always a small collection of edge points, and check for a "yes") → P64 (conceptual shift: re-walk Example 3's $\partial\mathbb{Q}=\mathbb{R}$ computation, re-anchoring on "when both a set and its complement are dense, the boundary can swallow the entire space").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.top.topological-space` (the topology $\tau$ and its three axioms this concept's open/closed definitions directly reuse).
- **Unlocks**: `math.top.interior-closure` (a dedicated deeper treatment of the interior/closure operators this concept previews), `math.top.connectedness` (defined via the impossibility of splitting a space into two disjoint nonempty open sets, directly using this concept's open-set vocabulary).
- **Cross-link (P76_mode = cross-link probe against `math.real.open-sets`, already authored)**: that concept's own Component 7 explicitly anticipated this connection ("a future revision... once that concept is authored, may add a genuine cross-link probe"); this blueprint's transfer probe fulfills exactly that anticipated connection, showing the metric-space treatment is the motivating special case of this concept's fully general, metric-free definitions.

## Component 8 — Teaching Notes

- estimated_hours = 4 with an expert/understand tag places this at a "3 TAs + gate" tier — A01 (metric-free open/closed), A02 (empty interior), and A03 (large boundary) each target a distinct LO, appropriate for a concept whose core difficulty is genuinely conceptual (recognizing these ideas generalize beyond metric spaces) rather than computationally heavy.
- Examples 1 and 2 deliberately reuse the SAME finite topological space ($X=\{a,b,c\}$, $\tau=\{\varnothing,\{a\},\{a,b\},X\}$) across two different objectives (open/closed sets, then interior) — the exact same small space this corpus's `math.top.topological-space` blueprint itself used for its own axiom-verification example, keeping cross-concept continuity intact.
- This is the first blueprint in the corpus to fulfill an explicitly anticipated cross-link probe recorded in an EARLIER concept's own Component 7 (`math.real.open-sets`'s note about "a future revision... once that concept is authored") — Component 7 here documents this fulfillment explicitly, closing the loop that concept's authors deliberately left open.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (math.real.open-sets authored → cross-link probe) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (cross-link probe against math.real.open-sets) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.9×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Concrete: small finite topology computed directly before the general definitions) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
