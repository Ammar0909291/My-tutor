# math.func.graph-of-function — Graph of a Function (Set of Pairs, Vertical Line Test, Splitting Non-Functions)

## Identity
- **KG ID:** `math.func.graph-of-function`
- **Domain:** math.func (Functions)
- **Requires:** `math.func.function-concept`, `math.geom.coordinate-plane`
- **Unlocks:** none listed in the KG
- **Cross-links:** none listed in the KG
- **Difficulty:** proficient
- **Bloom level:** understand
- **Mastery threshold:** 0.85 (MAMR 5/5)
- **Estimated hours:** 4

## Learning Objective
By the end of this concept, the student can: (1) define the graph of $f$ as the SET of all points $(x,f(x))$ in `math.geom.coordinate-plane`'s $\mathbb{R}^2$, recognizing it as a direct visualization of `math.func.function-concept`'s own rule rather than a separately-defined geometric object; (2) apply the vertical line test — a curve is the graph of some function iff every vertical line intersects it at most once — as a direct visual consequence of "exactly one output per input," never as an arbitrary convention; (3) recognize, at orientation level, that a curve failing the vertical line test (e.g. a full circle) genuinely cannot be one function's graph, though it may split into pieces (e.g. upper and lower semicircles) that each individually pass the test.

## Core Understanding
`math.func.function-concept` defines $f$ as a rule assigning each $x$ exactly one output $f(x)$; `math.geom.coordinate-plane` supplies the $\mathbb{R}^2$ space to plot in. This concept fuses the two: the graph IS the function's own pairs, made visible.

THE GRAPH IS THE SET OF PAIRS, NOT A SEPARATE OBJECT: the graph of $f$ is precisely the set $\{(x,f(x)) : x \in \text{domain}(f)\}$ — every input paired with its unique output, plotted as a point. It is not a curve drawn "to represent" the function that could in principle differ from the function; it literally IS the function's own rule, geometrized.

THE VERTICAL LINE TEST DIRECTLY ENCODES "ONE OUTPUT PER INPUT": since $f$ assigns exactly one output to each input, the graph contains at most one point with any given $x$-coordinate — so a vertical line at $x=a$ can intersect the graph at most once. Two intersections would mean $x=a$ has two different outputs, directly violating the function definition. The test is not an independent geometric rule; it is the function definition, viewed vertically.

FAILING THE TEST MEANS GENUINELY NOT ONE FUNCTION — BUT MAY BE SEVERAL (orientation level): the full circle $x^2+y^2=r^2$ fails the vertical line test (a vertical line through the interior crosses it twice) and therefore CANNOT be the graph of any single function $y=f(x)$ — not "an unusual graph," but genuinely not a function's graph at all. It CAN, however, be split into the upper semicircle $y=\sqrt{r^2-x^2}$ and lower semicircle $y=-\sqrt{r^2-x^2}$, each of which individually passes the test and is a genuine function's graph. Full curve-sketching technique for splitting arbitrary curves is deferred beyond this concept.

## Mental Models
1. **Rung 1 — the graph is not drawn "to represent" the function; it is the function's own input-output pairs, plotted.** Nothing is added beyond what the rule already specifies.
2. **Rung 2 — the vertical line test is the function definition read vertically, not an independent geometric rule.** A double-hit vertical line is literally one input claiming two outputs.
3. **Rung 3 — a curve failing the test is not one broken function; it is typically several genuine functions, combined.** Splitting it, not discarding it, is usually the fix.

## Why Students Fail
Having learned to plot functions by computing a table of $(x,f(x))$ values and connecting the dots, students can come to treat the resulting curve as a separate geometric object that merely happens to agree with the function's values, missing that the graph IS precisely the set of these pairs and nothing more — so a curve and "the function's graph" are never two different things to reconcile. Having been given the vertical line test as a memorizable rule ("draw a vertical line; if it crosses more than once, it's not a function"), students can treat this as an arbitrary geometric convention disconnected from the function definition itself, missing that it is a direct visual restatement of "exactly one output per input" — so they cannot explain WHY the rule works, only apply it mechanically. Finally, having encountered a curve like a full circle that fails the vertical line test, students often conclude it represents "one function that has a flaw" or "isn't a nice function," missing that it genuinely is not one function's graph at all — though it typically decomposes into several separate functions (e.g. two semicircles) that each are.

## Misconceptions

### MC-1: GRAPH-ASSUMED-SEPARATE-OBJECT-FROM-FUNCTION
- **Birth type:** Type 1 (overgeneralization) — Blueprint rates this "Foundational," independently confirmed
- **Description:** Believing the graph is a separate geometric object distinct from the function's own input-output pairs, missing that the graph IS precisely that set of pairs.
- **Why this birth type:** Overgeneralization from the routine of "plotting a curve from a table of values" to treating the resulting curve as an independently-existing object that happens to match the function, rather than recognizing the curve as nothing more than the pairs themselves, made visible.
- **Detection probe:** "Is the graph of a function a separate geometric object, distinct from the set of input-output pairs the function itself defines?" A student with MC-1 answers "yes."
- **Repair:** For $f(x)=x^2-1$: list the pairs explicitly — $(-2,3),(-1,0),(0,-1),(1,0),(2,3)$ — and state plainly that the graph IS this set (and every other such pair), nothing added, nothing separate. Connecting the plotted points into a smooth parabola is a drawing convenience for legibility, not evidence of a second, independently-existing object.
- **Verification of death:** Given a function, the student describes its graph directly as "the set of all $(x,f(x))$ pairs" without treating the plotted curve as a separate entity requiring its own definition.

### MC-2: VERTICAL-LINE-TEST-ASSUMED-ARBITRARY-CONVENTION
- **Birth type:** Type 4 (notation/rule-induced) — Blueprint rates this "High," independently confirmed
- **Description:** Believing the vertical line test is an arbitrary geometric convention, unconnected to the actual definition of a function.
- **Why this birth type:** The test is typically taught as a standalone procedural rule ("draw a vertical line; count intersections") divorced from its derivation, so the rule's own presentation — rather than any prior intuition — induces the belief that it is an independent convention rather than a direct consequence of "one output per input."
- **Detection probe:** "Is the vertical line test an arbitrary geometric convention, unconnected to the actual definition of a function?" A student with MC-2 answers "yes."
- **Repair:** For $f(x)=x^2-1$'s graph, any vertical line $x=a$ hits exactly the single point $(a,a^2-1)$ — never twice — precisely because $f$ assigns exactly one output to $a$. Contrast with the full circle $x^2+y^2=4$: the vertical line $x=1$ hits both $(1,\sqrt3)$ and $(1,-\sqrt3)$ — two outputs for the same input $x=1$, which is exactly what "not a function" means. The test doesn't independently decide function-ness; it visually reads off the same fact the function definition already states.
- **Verification of death:** Given a curve, the student explains WHY a double vertical-line intersection means "not a function" (two outputs for one input), rather than citing the test as an unexplained rule.

### MC-3: FAILED-TEST-ASSUMED-ONE-FLAWED-FUNCTION
- **Birth type:** Type 1 (overgeneralization) — Blueprint rates this "Moderate," independently confirmed
- **Description:** Believing a curve failing the vertical line test represents one single function with a technical flaw, missing that it genuinely cannot be one function's graph, though it may split into several.
- **Why this birth type:** Overgeneralization from the common experience of "this graph has an error" (e.g. a mis-plotted point) to a curve that structurally cannot be a single function at all — treating a categorical impossibility as if it were a fixable imperfection of one function.
- **Detection probe:** "Does a curve failing the vertical line test, like a full circle, represent one single function that merely has some technical flaw?" A student with MC-3 answers "yes."
- **Repair:** The full circle $x^2+y^2=4$ genuinely is not one function's graph (Demonstration 2 shows the double intersection). But splitting it: the upper semicircle $y=\sqrt{4-x^2}$ (for $-2\le x\le2$) passes the vertical line test — checked directly, each vertical line through this restricted piece hits it at most once — and is a genuine function's graph; the lower semicircle is a separate, different function's graph. The circle is two functions' graphs combined, not one flawed function.
- **Verification of death:** Given a curve failing the test, the student proposes a genuine split into pieces that each individually pass it, rather than describing the whole curve as "almost" a function.

## Analogies
1. **The photograph-versus-the-scene analogy (targets MC-1).** A photograph of a landscape is not a separate object that merely resembles the landscape — it IS a record of exactly what was there, nothing added. The graph is the same kind of record: not a second thing resembling the function's values, but exactly those values, made visible.
2. **The one-name-per-person-at-the-door analogy (targets MC-2).** A guest list assigns exactly one seat per name; if a single name appeared twice on the seating chart with two different seats, that would directly violate "one seat per name" — you wouldn't need a separate "seating rule test," the contradiction is visible on the chart itself. The vertical line test is the same: reading the graph directly reveals whether the underlying rule holds.
3. **The two-shifts-sharing-one-building analogy (targets MC-3).** A building open to two entirely separate shifts of workers (day shift, night shift) is not "one broken schedule" — it's two genuinely separate, individually valid schedules sharing a location. A circle is the same: two separate, individually valid functions (upper and lower semicircle) sharing one curve.

## Demonstrations
### Demonstration 1 — the graph as the explicit set of pairs (mirrors Blueprint Ex1)
For $f(x)=x^2-1$: computing $f(-2)=3$, $f(-1)=0$, $f(0)=-1$, $f(1)=0$, $f(2)=3$. The graph of $f$ is the set $\{(-2,3),(-1,0),(0,-1),(1,0),(2,3),\ldots\}$ — every such pair, plotted; the underlying object is precisely this set, and the familiar parabola shape is simply what it looks like connected.

### Demonstration 2 — the vertical line test as a direct consequence (mirrors Blueprint Ex2)
For $f(x)=x^2-1$'s graph: any vertical line $x=a$ meets the graph at exactly one point, $(a,a^2-1)$ — never twice, since $f$ assigns exactly one output to $a$. Contrast the full circle $x^2+y^2=4$: the vertical line $x=1$ meets it at BOTH $(1,\sqrt3)$ and $(1,-\sqrt3)$ — two points sharing $x=1$, meaning this curve cannot represent a function ($x=1$ would need two different $y$-values at once).

### Demonstration 3 — splitting a non-function curve into function pieces (mirrors Blueprint Ex3)
The full circle $x^2+y^2=4$ fails the vertical line test (Demonstration 2) and is genuinely not one function's graph. Splitting it: the upper semicircle $y=\sqrt{4-x^2}$ ($-2\le x\le2$) passes the test — each vertical line through this restricted piece hits it at most once — and IS a genuine function's graph. The lower semicircle $y=-\sqrt{4-x^2}$ is a separate, different function's graph. The circle is genuinely two functions' graphs combined, not one function that merely fails a technicality.

## Discovery Questions
1. "Is the graph of a function a separate geometric object, distinct from the set of input-output pairs the function itself defines? What would it mean if it weren't?"
2. "Why does a vertical line crossing a curve twice mean the curve cannot be a function's graph? What would that double crossing actually say about the input?"
3. "Does a curve like a full circle, which fails the vertical line test, represent one flawed function — or could it be genuinely two separate, valid functions instead?"

## Teaching Sequence
Best taught by the **Concrete CPA entry stage — plotting the specific points of one function before naming the general graph-as-a-set definition and the vertical line test**, matching the Blueprint's own CPA justification; anchoring in one concrete parabola before generalizing to the test and the circle-splitting case.
1. Work Demonstration 1's explicit pair-listing for $f(x)=x^2-1$, posing Discovery Question 1 before confirming the graph is nothing but this set.
2. Work Demonstration 2's parabola-versus-circle contrast, posing Discovery Question 2 before confirming the test as a direct visual consequence of the function definition.
3. Work Demonstration 3's circle-splitting, posing Discovery Question 3 before confirming the circle is genuinely two functions, not one flawed one.
4. Assess with the P77 problem set and the sensor-data transfer probe (P76, independence mode).

## Tutor Actions
1. **On any graph-definition claim:** require the student to describe the graph directly as "the set of $(x,f(x))$ pairs," never as a separately-existing curve.
2. **On any vertical line test application:** require the student to explain WHY a double intersection rules out a function (two outputs, one input), not just cite the rule.
3. **On any failed-test curve:** require the student to attempt a genuine split into function pieces, never dismiss the curve as "an almost-function."

## Voice Teaching Notes
1. **Register:** proficient/understand — this concept assumes fluency with the function-as-rule concept and the coordinate plane, and connects them concretely.
2. **Load-bearing sentence, spoken slowly:** "The graph isn't drawn to match the function — it IS the function's own pairs, made visible."
3. **Wait time:** pause after Discovery Question 3, letting the student genuinely attempt the circle split before confirming the two-semicircle answer.

## Assessment Signals
1. **Gate concept:** correctly describes the graph as the set of $(x,f(x))$ pairs and lists specific pairs for a given function.
2. **Vertical line test fluency:** applies the test correctly and explains it as a consequence of "one output per input," not a bare rule.
3. **Split-not-discard discipline:** when shown a curve failing the test, proposes a genuine split into function pieces rather than calling it a flawed function.
4. **Contrast discrimination:** distinguishes a function's graph (single intersection per vertical line) from a non-function curve (multiple) using a specific example.
5. **Transfer:** applies the vertical line test to a real-world looping curve (P76, sensor data), correctly identifies non-function status when it fails, and proposes a splitting strategy.

## Tutor Recovery Strategy
If the student treats the graph as a separate object from the function, require them to list explicit pairs for several fresh functions until describing the graph as "the pairs, nothing more" becomes automatic. If the student cites the vertical line test without explanation, require them to state explicitly what a double intersection would mean about the input before accepting any application of the test. If the student calls a failed-test curve "one flawed function," require them to attempt an explicit split into pieces on a fresh example until splitting becomes the default response.

## Memory Hooks
1. "The graph is the pairs — nothing drawn, nothing added."
2. "Two hits on one vertical line means one input, two outputs — that's the whole rule, seen sideways."
3. "Failed the test? Don't discard it — split it. It's probably two functions, not one broken one."

## Transfer Connections
- **`math.func.function-concept`:** the rule (exactly one output per input) that the graph directly visualizes; every graph property traces back to this rule.
- **`math.geom.coordinate-plane`:** the $\mathbb{R}^2$ space the graph is plotted in; without it, "graph" has no geometric meaning.
- **`math.func.piecewise-function`** (not yet authored): the natural home of "splitting a curve into function pieces," directly extending Demonstration 3's semicircle split into a formal piecewise definition.

## Cross-Subject Connections
- **Physics (position-vs-time graphs):** a valid position-vs-time graph must pass the vertical line test — an object cannot be in two different positions at the same single instant, mirroring "one output per input" exactly.
- **Data science (scatter plots and function fitting):** determining whether a scatter of data points can be modeled by a single function of one variable directly requires the vertical line test's logic — repeated $x$-values with different $y$-values signal that a single function of $x$ cannot fit the data as given.

## Blueprint References
- Primary source: `docs/curriculum/blueprints/math.func.graph-of-function.md` — reused by reference throughout (Learning Objectives, worked examples Ex1–Ex3, misconception inventory MC-1–MC-3, transfer probe P76 on looping sensor data, mode = independence per that Blueprint's own Component 7). Not restated verbatim; this entry adds the mental-model ladder, discovery-vs-direct-instruction argument, voice teaching notes, memory hooks, and cross-subject connections per `EDUCATIONAL_BRAIN_STANDARD.md`'s ownership boundary. All 3 misconceptions confirmed against this program's own taxonomy: MC-1 Type 1, MC-2 Type 4, MC-3 Type 1 (independently classified — the Blueprint assigns severity but not a formal birth type).
- No cross-link listed in the KG for this concept; none to verify.

## Runtime Asset References
- No AssetIdentity rows exist for this concept yet (Layer 3/7 DB-backed assets are populated separately, by live LLM generation plus admin review or by deliberate seed-script batches — never by this authoring layer). This entry is Layer 1/2 content only.

## Curriculum Feedback
- No genuine Blueprint/KG metadata discrepancy found — requires, unlocks, cross_links, difficulty, bloom, mastery_threshold, and estimated_hours all match the live KG exactly (unlocks and cross_links both empty per the KG, matching the Blueprint's own "none listed").

## Version History
- **Batch 30** (2026-09-12): initial authoring, part 2 of 4 this batch (with `math.func.inverse-functions`, `math.func.real-valued-function`, `math.func.linear-function`), continuing `math.func` as a standalone domain campaign. Blueprint reused by reference; 3 misconceptions birth-type classified (MC-1 Type 1, MC-2 Type 4, MC-3 Type 1).
