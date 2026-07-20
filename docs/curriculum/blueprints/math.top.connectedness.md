# Teaching Blueprint: Connectedness (Topology) (`math.top.connectedness`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.top.connectedness` |
| name | Connectedness (Topology) |
| domain | Topology |
| difficulty | expert |
| bloom | understand |
| mastery_threshold | 0.85 → MAMR = ⌈0.85×5⌉ = 5/5 |
| estimated_hours | 4 |
| requires | `math.top.topological-space` |
| unlocks | none |
| cross_links | `math.real.connectedness` (authored earlier — see Component 7) |
| CPA_entry_stage | A (Abstract) — expert learner already has the general open-set axioms; the task is applying them to define connectedness abstractly and reconciling with the already-known real-line version |
| description (KG) | $X$ is connected iff it cannot be written as a union of two disjoint non-empty open sets. Path-connected: any two points connected by a path. Path-connected ⟹ connected, converse fails. Components: maximal connected subsets. |

## Component 1 — Learning Objectives

- LO1: State the general topological definition — $X$ is connected iff it CANNOT be written as a union of two disjoint nonempty OPEN sets — using `math.top.topological-space`'s own open-set axioms directly, and correctly determine connectedness for a small finite topological space by checking all possible two-set splits against this open-set-based definition.
- LO2 (cross-link objective): Reconcile this open-set-based definition with `math.real.connectedness`'s own SEPARATED-sets (closure-based) definition for subsets of $\mathbb{R}$, recognizing they are PROVABLY EQUIVALENT for metric/real-line contexts — the general topological definition doesn't replace or contradict the real-analysis one, it GENERALIZES it to spaces with no metric or closure structure available.
- LO3: State and correctly apply "path-connected $\Rightarrow$ connected, but NOT conversely," using a genuine counterexample (a connected-but-not-path-connected space) to confirm the converse's failure, and define COMPONENTS as maximal connected subsets, correctly identifying the components of a specific disconnected space.

## Component 2 — Prerequisite Check

Assumes mastery of `math.top.topological-space` (a set $X$ with a collection $\tau$ of open sets satisfying: $\varnothing,X\in\tau$; arbitrary unions of open sets are open; finite intersections of open sets are open).

## Component 3 — Core Explanation

**Connectedness generalizes directly using `math.top.topological-space`'s own open sets**: $X$ is connected iff it CANNOT be written as $X=U\cup V$ for disjoint nonempty OPEN sets $U,V$ (a "disconnection"). If such $U,V$ exist, $X$ is disconnected; if no such split exists, $X$ is connected. This definition uses NOTHING beyond `math.top.topological-space`'s own axioms (which sets count as open) — it makes sense in ANY topological space, even ones with no notion of distance, closure, or "gap" at all.

**This open-set definition is provably equivalent to `math.real.connectedness`'s separated-sets definition, for $\mathbb{R}$**: `math.real.connectedness` defines connectedness via SEPARATED sets ($A,B$ with $A\cap\bar B=\varnothing$ and $\bar A\cap B=\varnothing$). In a metric space like $\mathbb{R}$, these two definitions agree exactly: if $X=U\cup V$ is a disconnection by disjoint OPEN sets, then $U,V$ are automatically separated (since each is open, its complement — which contains the other set — is closed, so neither set's closure can reach into the other); conversely, a separation by separated sets can always be enlarged slightly to a disconnection by open sets in a metric space. So this is not two competing theories — it is ONE concept (connectedness), with `math.real.connectedness`'s version specialized to metric spaces and this concept's OPEN-SET version being the general-purpose definition that also works where no metric exists at all (e.g., certain finite topological spaces, or spaces built from abstract open-set collections).

**Path-connectedness is a STRONGER, more intuitive notion that implies connectedness but not conversely**: $X$ is path-connected if any two points $x,y\in X$ can be joined by a continuous path $\gamma:[0,1]\to X$ with $\gamma(0)=x,\gamma(1)=y$. Path-connectedness implies connectedness (a disconnection would trap the path's image on one side, since $[0,1]$ itself is connected and continuous images of connected sets are connected — directly reusing `math.real.connectedness`'s own connectedness-preservation-under-continuity fact). But the converse GENUINELY fails: there exist connected spaces with no path joining certain pairs of points — the topologist's sine curve is the standard example, connected but not path-connected. A COMPONENT of $X$ is a maximal connected subset — every point belongs to exactly one component, and $X$ is itself connected iff it has exactly one component.

## Component 4 — Worked Examples

**Example 1 (LO1 — checking connectedness via the open-set definition on a finite space, breaking MC-1)**: let $X=\{a,b,c\}$ with topology $\tau=\{\varnothing,\{a\},\{a,b\},X\}$ (a valid topology by `math.top.topological-space`'s axioms — verify: unions and finite intersections of these sets stay in $\tau$). Checking for a disconnection: can $X$ be split into two disjoint nonempty sets BOTH open? The open sets available are $\{a\},\{a,b\},X,\varnothing$ — any nonempty proper subset used as one piece (say $\{a\}$) leaves $\{b,c\}$ as the other piece, but $\{b,c\}\notin\tau$ (not open) — no valid disconnection exists using only sets from $\tau$. $X$ is CONNECTED, confirmed by exhaustively checking that no pair of disjoint nonempty open sets covers $X$.

**Example 2 (LO2 — verifying the open-set and separated-sets definitions agree on $E=[0,1]\cup[2,3]\subset\mathbb{R}$, breaking MC-2)**: `math.real.connectedness`'s own Example 1 already shows $[0,1]\cup[2,3]$ is disconnected via SEPARATED sets $A=[0,1],B=[2,3]$ (verified $A\cap\bar B=\varnothing$, $\bar A\cap B=\varnothing$). Checking the SAME set with THIS concept's open-set definition (in the subspace topology on $E$): $U=(-1,1.5)\cap E=[0,1]$ and $V=(1.5,4)\cap E=[2,3]$ are both OPEN in $E$'s subspace topology (each is the intersection of an open interval in $\mathbb{R}$ with $E$), disjoint, nonempty, and cover $E$ — a genuine disconnection by open sets, reaching the SAME conclusion (disconnected) via the open-set route, confirming LO2's claimed equivalence concretely rather than just asserting it.

**Example 3 (LO3 — path-connected implies connected but not conversely, plus identifying components, breaking MC-3)**: for $X=[0,1]\cup[2,3]$ from Example 2: this space is NEITHER path-connected NOR connected — any path from a point in $[0,1]$ to a point in $[2,3]$ would need to be continuous on $[0,1]$ (itself connected, by `math.real.connectedness`), so its image is connected, yet it would have to "jump" the gap between 1 and 2, which is impossible for a continuous path — consistent with path-connected $\Rightarrow$ connected (failing to be connected already rules out path-connectedness here). The COMPONENTS of $X$ are exactly $[0,1]$ and $[2,3]$ — each is a maximal connected subset (verified connected by `math.real.connectedness`'s own "intervals are the only connected subsets" theorem), and no larger connected subset of $X$ contains either one, since any larger candidate would have to include points from both pieces, which Example 2 already showed is disconnected.

## Component 5 — Teaching Actions

### Teaching Action A01 — Connectedness Via Open Sets Alone, No Metric Needed (Primitive P11: Representation Shift)

State: "connectedness doesn't actually need distances or closures to make sense — `math.top.topological-space`'s open sets alone are enough: $X$ is connected exactly when it can't be split into two disjoint nonempty OPEN pieces." Walk Example 1's finite-space check.

- **MC-1 hook**: ask "does checking connectedness require a notion of distance or closure, or can it be checked using open sets alone?" — a "requires distance/closure" answer reveals MC-1 (missing that the open-set definition is entirely self-sufficient, needing only `math.top.topological-space`'s axioms).

### Teaching Action A02 — The Open-Set and Separated-Sets Definitions Are the SAME Concept, Not Two Competing Ones (Primitive P28: Conflict Evidence)

Present Example 2's direct evidence: the SAME set $[0,1]\cup[2,3]$ is shown disconnected by BOTH `math.real.connectedness`'s separated-sets route AND this concept's open-set route, reaching the identical conclusion. State: "these are not two different theories of connectedness that happen to agree here by coincidence — for metric spaces like $\mathbb{R}$, they are PROVABLY equivalent definitions of the exact same concept; the open-set version is simply the one that still works when no metric is available at all."

- **MC-2 hook**: ask "are `math.real.connectedness`'s separated-sets definition and this concept's open-set definition two different, potentially conflicting notions of connectedness?" — a "yes, different/conflicting" answer reveals MC-2 (missing their provable equivalence in metric contexts).

### Teaching Action A03 — Path-Connected Is Strictly Stronger Than Connected (Primitive P06: Contrast Pair)

Contrast the tempting assumption "connected and path-connected are the same thing" against the standing fact (stated, with the topologist's sine curve named as the standard counterexample) that connected does NOT imply path-connected, while walking Example 3's confirmation that path-connectedness DOES imply connectedness (the easy direction). State: "path-connectedness is the more intuitive, stronger notion — always sufficient for connectedness, but not always necessary; a space can be 'connected' in the technical open-set sense while still having no continuous path between some pairs of its points."

- **MC-3 hook**: ask "if a space is connected, must it also be path-connected?" — a "yes" answer reveals MC-3 (assuming the converse implication holds, missing the genuine counterexamples where it fails).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. For $X=\{a,b\}$ with the discrete topology ($\tau=\{\varnothing,\{a\},\{b\},X\}$), determine whether $X$ is connected, using the open-set definition explicitly.
  2. Explain, citing `math.real.connectedness`'s own separated-sets check, why the open-set and separated-sets definitions agree for a specific subset of $\mathbb{R}$ of your choosing.
  3. State the precise logical relationship between path-connectedness and connectedness (which implies which, and whether the converse holds).
  4. For $X=(0,1)\cup(2,3)\cup\{5\}\subset\mathbb{R}$, identify all connected components.
- **P76 (Transfer Probe, mode = cross-link probe engaging `math.real.connectedness`)**: "A network topologist models a communication network as a topological space where 'open sets' represent sets of nodes reachable via some communication protocol, and wants to determine whether the whole network is 'connected' in this abstract sense — but the network has no natural notion of physical distance between nodes (unlike a geometric network laid out in $\mathbb{R}^2$). (a) Explain why `math.real.connectedness`'s separated-sets definition (which depends on closures, themselves built from a metric or at least a well-defined closure operation) cannot be directly applied here, while THIS concept's open-set definition can. (b) If the topologist later learns the network's nodes ARE in fact embeddable in $\mathbb{R}^2$ with a genuine metric, explain why checking connectedness via THIS concept's open-set definition would still give the SAME answer as checking it via `math.real.connectedness`'s separated-sets definition. (c) Suppose the topologist additionally verifies that every pair of nodes has an actual communication PATH (not just abstract connectedness). Explain what additional guarantee this path-connectedness gives beyond mere connectedness, and why the converse guarantee does not automatically hold."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | CONNECTEDNESS-ASSUMED-TO-NEED-METRIC | Believing checking connectedness requires a notion of distance or closure, missing that `math.top.topological-space`'s open-set axioms alone suffice | Foundational |
| MC-2 | OPEN-SET-AND-SEPARATED-SETS-DEFINITIONS-ASSUMED-DIFFERENT | Believing the open-set-based definition here and `math.real.connectedness`'s separated-sets definition are two different, potentially conflicting notions of connectedness, rather than provably equivalent for metric spaces | High |
| MC-3 | CONNECTED-ASSUMED-EQUIVALENT-TO-PATH-CONNECTED | Believing connected and path-connected are equivalent notions, missing that path-connected $\Rightarrow$ connected but not conversely | High |

- **B01 (targets MC-1)**: P27 (name it: "Connectedness Assumed to Need Metric") → P41 (detect: ask whether connectedness requires distance or closure) → P64 (conceptual shift: re-walk Example 1's purely open-set-based finite-space check).
- **B02 (targets MC-2)**: P27 (name it: "Open-Set and Separated-Sets Definitions Assumed Different") → P41 (detect: ask whether the two definitions could conflict) → P64 (conceptual shift: re-walk Example 2's verification that both routes reach the identical conclusion on $[0,1]\cup[2,3]$).
- **B03 (targets MC-3)**: P27 (name it: "Connected Assumed Equivalent to Path-Connected") → P41 (detect: ask whether connected implies path-connected) → P64 (conceptual shift: re-state the topologist's sine curve counterexample and re-walk Example 3's easy direction confirming only one-way implication).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.top.topological-space` (the open-set axioms this concept's definition is built on directly).
- **Unlocks**: none listed in the KG for this concept.
- **Cross-link**: KG lists `math.real.connectedness`, checked via `ls docs/curriculum/blueprints/` and confirmed ALREADY authored. $P76_{mode}=$ **cross-link probe**, engaging `math.real.connectedness`'s own separated-sets definition and connectedness-preservation fact directly in Component 3's equivalence argument and the P76 transfer probe.

## Component 8 — Teaching Notes

- estimated_hours = 4 with an expert/understand tag supports the "3 TAs + gate" tier, with LO1 establishing the general open-set definition, LO2 given full depth reconciling it with the already-known real-line version (rather than presenting it as an unrelated new definition), and LO3 introducing path-connectedness and components as genuinely new material.
- **Division of labor**: `math.real.connectedness` already owns the separated-sets definition specific to $\mathbb{R}$/metric contexts, the "intervals are the only connected subsets of $\mathbb{R}$" theorem, and the Intermediate Value Theorem consequence (verified by grep — entirely metric/real-line-specific content, no open-set-based general definition, no path-connectedness, no components). This concept owns the GENERAL topological open-set definition (applicable with no metric at all), the equivalence proof/verification connecting the two definitions, and the genuinely new path-connectedness and components material.
- Example 2's deliberate reuse of `math.real.connectedness`'s own Example 1 set ($[0,1]\cup[2,3]$) — checked here via the open-set route instead of the separated-sets route — was chosen specifically to make LO2's equivalence claim concretely verifiable side-by-side, rather than asserting the equivalence abstractly with a fresh, unrelated example.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS (none listed) |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (`math.real.connectedness` confirmed authored → cross-link probe) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (cross-link probe) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.85×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract: expert learner already has open-set axioms; task is defining connectedness abstractly and reconciling with the real-line version) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
