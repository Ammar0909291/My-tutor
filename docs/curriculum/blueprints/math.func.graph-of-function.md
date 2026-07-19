# Teaching Blueprint: Graph of a Function (`math.func.graph-of-function`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.func.graph-of-function` |
| name | Graph of a Function |
| domain | Functions |
| difficulty | proficient |
| bloom | understand |
| mastery_threshold | 0.85 → MAMR = ⌈0.85×5⌉ = 5/5 |
| estimated_hours | 4 |
| requires | `math.func.function-concept`, `math.geom.coordinate-plane` |
| unlocks | none |
| cross_links | none |
| CPA_entry_stage | C (Concrete) — plotting the specific points of one function before naming the general graph-as-a-set definition and the vertical line test |
| description (KG) | The graph of $f$ is the set of all points $(x,f(x))$ in the coordinate plane; the vertical line test identifies graphs of functions. |

## Component 1 — Learning Objectives

- LO1: Define the **graph of $f$** as the SET of all points $(x,f(x))$ in `math.geom.coordinate-plane`'s own $\mathbb{R}^2$ — recognizing this as a direct VISUALIZATION of `math.func.function-concept`'s own rule (each domain element maps to exactly one codomain element), plotted as ordered pairs.
- LO2: Apply the **vertical line test** — a curve in the coordinate plane is the graph of SOME function if and only if every vertical line intersects it at MOST once — recognizing this test as a direct visual consequence of `math.func.function-concept`'s "exactly one output per input" requirement, not an arbitrary geometric rule.
- LO3 (orientation level — full curve-sketching theory deferred): recognize, without full derivation, that a curve FAILING the vertical line test (like a circle) is not simply "not a nice graph" — it genuinely CANNOT be the graph of any single function $y=f(x)$, though it MAY be split into pieces (e.g. upper and lower semicircles) that each individually pass the test and ARE graphs of functions.

## Component 2 — Prerequisite Check

Assumes mastery of `math.func.function-concept` (a rule assigning each domain element exactly one codomain element) and `math.geom.coordinate-plane` ($\mathbb{R}^2$ with perpendicular axes, enabling algebraic representation of geometric objects).

## Component 3 — Core Explanation

**The graph is a direct visualization of the function's own rule**: `math.func.function-concept` defines $f$ as a rule assigning each $x$ in the domain exactly ONE output $f(x)$. The GRAPH simply plots every such pairing as a point $(x,f(x))$ in `math.geom.coordinate-plane`'s $\mathbb{R}^2$ — the graph is not a separate object requiring its own independent definition; it is literally the SET of these input-output pairs, made visible geometrically.

**The vertical line test is a direct visual consequence of "exactly one output per input"**: since $f$ assigns EXACTLY ONE output to each input $x$, the graph can contain AT MOST ONE point with that particular $x$-coordinate — meaning a VERTICAL line at $x=a$ (which captures every point sharing that same $x$-value) can intersect the graph AT MOST ONCE. If a vertical line hit the curve TWICE, that would mean the same input $x=a$ maps to TWO different outputs — directly violating the function definition itself. The vertical line test isn't an arbitrary rule; it's a direct visual restatement of the function definition.

**Failing the test means the curve genuinely cannot be a single function's graph (orientation level)**: a curve like a full circle $x^2+y^2=r^2$ FAILS the vertical line test (a vertical line through the interior hits the circle TWICE — once above, once below the center) — meaning it CANNOT be the graph of any single function $y=f(x)$, not merely that it's "an unusual-looking graph." However, the circle CAN be split into the upper semicircle $y=\sqrt{r^2-x^2}$ and lower semicircle $y=-\sqrt{r^2-x^2}$ — each of THESE individually passes the vertical line test and genuinely IS the graph of a function. Full curve-sketching techniques for splitting more complex curves into function pieces are deferred beyond this concept's core scope.

## Component 4 — Worked Examples

**Example 1 (LO1 — the graph as the set of input-output pairs, breaking MC-1)**: for $f(x)=x^2-1$: computing a few values, $f(-2)=3$, $f(-1)=0$, $f(0)=-1$, $f(1)=0$, $f(2)=3$. The GRAPH of $f$ is the set $\{(-2,3),(-1,0),(0,-1),(1,0),(2,3),\dots\}$ — literally EVERY such pair $(x,f(x))$ for $x$ in the domain, plotted in the coordinate plane; connecting these points traces the familiar parabola shape, but the underlying mathematical OBJECT is precisely this set of pairs, not a separately-defined curve that merely happens to match the function's values.

**Example 2 (LO2 — the vertical line test as a direct consequence of the function definition, breaking MC-2)**: for $f(x)=x^2-1$'s graph (Example 1): any vertical line $x=a$ intersects the graph at EXACTLY the single point $(a,a^2-1)$ — never twice — because $f$ assigns exactly one output to each input $a$, by the function definition itself. Contrast with the FULL circle $x^2+y^2=4$: the vertical line $x=1$ intersects it at BOTH $(1,\sqrt3)$ and $(1,-\sqrt3)$ — TWO points sharing the same $x$-coordinate, meaning this curve CANNOT represent a function (since $x=1$ would need to map to two different $y$-values simultaneously, violating "exactly one output per input").

**Example 3 (LO3, orientation level — splitting a non-function curve into function pieces, breaking MC-3)**: the full circle $x^2+y^2=4$ fails the vertical line test (Example 2) and is genuinely NOT the graph of any single function. However, splitting it: the UPPER semicircle $y=\sqrt{4-x^2}$ (for $-2\le x\le2$) passes the vertical line test — each vertical line through this restricted upper piece hits it at most once — and IS a genuine function's graph. Similarly the LOWER semicircle $y=-\sqrt{4-x^2}$ is a separate, different function's graph. The full circle is not "one function that fails a technicality" — it is genuinely two SEPARATE functions' graphs, combined.

## Component 5 — Teaching Actions

### Teaching Action A01 — The Graph Is Literally the Set of Input-Output Pairs (Primitive P11: Representation Shift)

State: "the graph isn't a separate geometric object you draw ALONGSIDE the function — it IS the function, made visible: the exact set of pairs $(x,f(x))$ you already compute from the rule." Walk Example 1's explicit listing of pairs for $f(x)=x^2-1$.

- **MC-1 hook**: ask "is the graph of a function a separate geometric object, distinct from the set of input-output pairs the function itself defines?" — a "yes" answer reveals MC-1 (missing that the graph IS precisely the set of pairs $(x,f(x))$, nothing more).

### Teaching Action A02 — The Vertical Line Test Directly Encodes "One Output Per Input" (Primitive P28: Conflict Evidence)

Present Example 2's direct evidence: $f(x)=x^2-1$'s graph never gets hit twice by a vertical line, while the full circle DOES — directly tied to whether each $x$ genuinely has only one associated $y$. State: "the vertical line test isn't an arbitrary geometric rule to memorize — it's a direct visual restatement of the function definition's own 'exactly one output per input' requirement."

- **MC-2 hook**: ask "is the vertical line test an arbitrary geometric convention, unconnected to the actual definition of a function?" — a "yes" answer reveals MC-2 (missing that the test is a direct visual consequence of "exactly one output per input").

### Teaching Action A03 — Failing the Test Means Genuinely Two Functions, Not One Broken One (Primitive P06: Contrast Pair)

Contrast the full circle (failing the test, NOT a single function's graph) against its split into upper and lower semicircles (Example 3, each individually passing the test and each a genuine function). State: "a curve failing the vertical line test isn't 'almost a function with a flaw' — it's typically several DIFFERENT functions' graphs combined, each of which, split out on its own, IS a genuine function."

- **MC-3 hook**: ask "does a curve failing the vertical line test, like a full circle, represent one single function that merely has some technical flaw?" — a "yes" answer reveals MC-3 (missing that such a curve genuinely cannot be one function's graph, though it may split into several separate functions' graphs).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. List the graph (as a set of pairs) for $f(x)=2x+1$ at $x=-2,-1,0,1,2$.
  2. Apply the vertical line test to determine whether $y^2=x$ (for $x\ge0$) represents a function of $x$, justifying your answer with a specific vertical line.
  3. If a curve fails the vertical line test at $x=3$ (a vertical line there hits the curve twice), explain precisely what this implies about the original rule's validity as a function.
  4. Explain how the curve $y^2=x$ from problem 2 could be split into two separate functions, each of which passes the vertical line test.
- **P76 (Transfer Probe, mode = independence)**: "An engineer plots sensor data as a curve in the coordinate plane representing pressure $y$ as it might relate to temperature $x$, and the curve happens to loop back on itself (like an ellipse) rather than tracing a simple increasing or decreasing path. (a) Explain how to use the vertical line test to determine whether this looping curve represents pressure as a genuine FUNCTION of temperature. (b) If the test fails, explain precisely why this means pressure cannot be validly modeled as a single function of temperature over that range, rather than merely being 'a complicated function.' (c) Propose, in general terms, how the engineer might split the looping curve into separate pieces, each of which could be modeled as its own valid function."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | GRAPH-ASSUMED-SEPARATE-OBJECT-FROM-FUNCTION | Believing the graph is a separate geometric object distinct from the function's input-output pairs, missing that the graph IS precisely that set of pairs | Foundational |
| MC-2 | VERTICAL-LINE-TEST-ASSUMED-ARBITRARY-CONVENTION | Believing the vertical line test is an arbitrary geometric convention, missing that it directly encodes the function definition's "one output per input" requirement | High |
| MC-3 | FAILED-TEST-ASSUMED-ONE-FLAWED-FUNCTION | Believing a curve failing the vertical line test represents one single function with a technical flaw, missing that it genuinely cannot be one function's graph, though it may split into several | Moderate |

- **B01 (targets MC-1)**: P27 (name it: "Graph Assumed Separate Object From Function") → P41 (detect: ask whether the graph is a separate geometric object distinct from the function's pairs) → P64 (conceptual shift: re-walk Example 1's explicit pair-listing, re-anchoring on "the graph IS the set of pairs, nothing more").
- **B02 (targets MC-2)**: P27 (name it: "Vertical Line Test Assumed Arbitrary Convention") → P41 (detect: ask whether the vertical line test is an arbitrary geometric convention) → P64 (conceptual shift: re-walk Example 2's parabola-versus-circle contrast, re-anchoring on "the test directly encodes 'one output per input'").
- **B03 (targets MC-3)**: P27 (name it: "Failed Test Assumed One Flawed Function") → P41 (detect: ask whether a curve failing the test represents one function with a flaw) → P64 (conceptual shift: re-walk Example 3's circle-splitting demonstration, re-anchoring on "genuinely several separate functions, not one flawed one").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.func.function-concept` (the rule assigning exactly one output per input, directly visualized by the graph) and `math.geom.coordinate-plane` ($\mathbb{R}^2$, the space the graph is plotted in).
- **Unlocks**: none listed in the KG for this concept.
- **Cross-link**: none listed in the KG for this concept.

## Component 8 — Teaching Notes

- estimated_hours = 4 with a proficient/understand tag supports the "3 TAs + gate" tier, with LO1 and LO2 given full computational and conceptual depth (the explicit pair-listing and the parabola-versus-circle vertical-line-test contrast) and LO3 kept orientation-level, appropriately introducing curve-splitting via the semicircle example without developing general curve-sketching or piecewise-function theory.
- **Division of labor**: `math.func.function-concept` owns the general rule-based definition of a function; `math.geom.coordinate-plane` owns the $\mathbb{R}^2$ plotting space. This concept owns CONNECTING these two — the graph as the visual set of pairs, and the vertical line test as the visual encoding of function-ness — deliberately reusing the SAME circle example across Examples 2 and 3 so the test-failure and the subsequent successful splitting are shown as one continuous worked problem.
- Example 3's deliberate choice of a full circle (rather than a more exotic non-function curve) was chosen because splitting it into upper/lower semicircles is the most standard, easily visualized illustration of "one non-function curve, two genuine function pieces."

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS (none listed) |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (none listed in KG) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.85×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Concrete: plotting specific points precedes the general graph-as-a-set definition and vertical line test) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
