# Teaching Blueprint: Elimination Method (`math.alg.elimination-method`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.alg.elimination-method` |
| name | Elimination Method |
| domain | Algebra |
| difficulty | proficient |
| bloom | apply |
| mastery_threshold | 0.85 → MAMR = ⌈0.85×5⌉ = 5/5 |
| estimated_hours | 4 |
| requires | `math.alg.system-linear-equations` |
| unlocks | `math.linalg.row-reduction` |
| cross_links | `math.linalg.row-reduction` |
| CPA_entry_stage | C (Concrete) — eliminating a variable from a specific system whose coefficients aren't simple multiples, before the general common-multiple procedure | 
| description (KG) | Solving a system of equations by adding or subtracting multiples of equations to eliminate one variable at a time. |

## Component 1 — Learning Objectives

- LO1: Systematically apply elimination to a system whose coefficients are NOT already equal, opposite, or simple multiples of one another — find a common multiple of the target variable's two coefficients, multiply each equation by the appropriate scalar to align them, then add or subtract — directly extending `math.alg.system-linear-equations`' introductory treatment (which only handled the case where coefficients already matched).
- LO2: Correctly multiply an ENTIRE equation by a constant (every term, on BOTH sides), recognizing this operation — along with adding a multiple of one equation to another — preserves the system's solution set exactly, and correctly avoid the execution error of scaling only part of an equation.
- LO3: Recognize that "multiply an equation by a constant" and "add a multiple of one equation to another" are EXACTLY the row operations `math.linalg.row-reduction` will later formalize using matrix notation — this concept is the concrete, equation-based precursor to that more systematic, matrix-based method, not a separate or unrelated technique.

## Component 2 — Prerequisite Check

Assumes mastery of `math.alg.system-linear-equations` (a system of 2 linear equations; the three solution cases; elimination as one of two basic methods, introduced there only for the case where coefficients already match or are simple multiples).

## Component 3 — Core Explanation

**Finding a common multiple when coefficients don't already align**: `math.alg.system-linear-equations` introduced elimination only for the easy case — one equation's coefficient for the target variable already a simple multiple of the other's. When coefficients are NOT already related this simply (e.g. $4$ and $6$), elimination still works: find a common multiple of the two coefficients (e.g. their least common multiple), multiply EACH equation by whatever scalar makes that variable's coefficient equal to the common multiple in both, then add or subtract the equations to cancel that variable entirely.

**Multiplying the ENTIRE equation, every term, both sides**: multiplying an equation by a nonzero constant means multiplying EVERY term — every variable's coefficient AND the constant on the right-hand side — not just the term involving the variable being eliminated. This operation (and adding a multiple of one equation to another) preserves the system's exact solution set; scaling only part of an equation breaks this guarantee and produces an equation the original solution no longer satisfies.

**Elimination method IS row operations, just written differently**: the two operations used throughout — multiplying an equation by a constant, and adding a multiple of one equation to another — are EXACTLY the row operations that `math.linalg.row-reduction` will later apply to an augmented matrix's rows, using matrix notation instead of full equations. This concept is not a separate technique that gets replaced later; it is the identical arithmetic, expressed concretely with equations before that later concept generalizes and systematizes it.

## Component 4 — Worked Examples

**Example 1 (LO1 — finding a common multiple to eliminate y)**: For $3x+4y=11$ and $5x+6y=19$ (neither coefficient a simple multiple of the other): to eliminate $y$, coefficients are $4$ and $6$; their LCM is $12$. Multiply the first equation by $3$: $9x+12y=33$. Multiply the second by $2$: $10x+12y=38$. Subtract: $(10x-9x)+(12y-12y)=38-33 \Rightarrow x=5$. Substituting back: $3(5)+4y=11 \Rightarrow y=-1$. Solution: $(5,-1)$.

**Example 2 (LO2 — the whole equation must be scaled, breaking a partial-multiplication error)**: Continuing with $3x+4y=11$: multiplying by $3$ correctly means EVERY term: $3(3x)+3(4y)=3(11) \Rightarrow 9x+12y=33$ — matching Example 1 exactly. Contrast with an ERROR: scaling ONLY the $y$-term (leaving $3x$ and $11$ untouched), giving the invalid "equation" $3x+12y=11$. Checking whether the genuine solution $(5,-1)$ satisfies this broken equation: $3(5)+12(-1)=15-12=3\ne11$ — it does NOT, confirming the partial-multiplication error produces an equation with a completely different (and wrong) solution set.

**Example 3 (LO3 — elimination method is row operations, breaking MC-3)**: Rewrite Example 1's system as the augmented array $\begin{pmatrix}3&4&\vert&11\\5&6&\vert&19\end{pmatrix}$. Multiplying row 1 by $3$: $\begin{pmatrix}9&12&\vert&33\\5&6&\vert&19\end{pmatrix}$. Multiplying row 2 by $2$: $\begin{pmatrix}9&12&\vert&33\\10&12&\vert&38\end{pmatrix}$. Subtracting row 1 from row 2 ($R_2\to R_2-R_1$): $\begin{pmatrix}9&12&\vert&33\\1&0&\vert&5\end{pmatrix}$ — the second row directly reads $x=5$, EXACTLY the same arithmetic as Example 1's equation-based elimination, merely written with rows and columns instead of full symbolic equations.

## Component 5 — Teaching Actions

### Teaching Action A01 — Finding the Common Multiple (Primitive P11: Representation Shift)

State: "when the coefficients aren't already lined up, find a common multiple and scale BOTH equations to reach it — elimination still works, it just needs one extra preparatory step." Work Example 1's full common-multiple computation.

- **MC-1 hook**: ask "does elimination only work when one equation's coefficient is already a simple multiple of the other's?" — a "yes" answer reveals MC-1 (missing that finding a common multiple always makes elimination possible, for any pair of nonzero coefficients).

### Teaching Action A02 — Scale the Whole Equation, Every Term (Primitive P28: Conflict Evidence)

Present Example 2's direct evidence: correctly scaling every term reproduces Example 1's valid equation, while scaling only the $y$-term produces an equation the genuine solution $(5,-1)$ does NOT satisfy. State: "multiplying by a constant means every single term, both sides — skip even one term, and you've silently changed the equation into a different one entirely."

- **MC-2 hook**: ask "when scaling an equation to prepare for elimination, is it fine to multiply just the term I'm trying to eliminate?" — a "yes" answer reveals MC-2 (scaling only part of the equation, breaking its validity).

### Teaching Action A03 — Elimination Method Is Row Operations (Primitive P06: Contrast Pair)

Contrast Example 3's row-based computation directly against Example 1's equation-based computation — identical arithmetic, different notation. State: "you are not learning a temporary technique that gets replaced later — `math.linalg.row-reduction` takes exactly these same two operations and applies them to matrix rows instead of full equations."

- **MC-3 hook**: ask "is elimination method a completely different technique from the row operations used later in row reduction?" — a "yes" answer reveals MC-3 (missing that they are literally the same arithmetic, expressed with different notation).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Solve $2x+3y=8$ and $5x+2y=1$ using elimination, finding an appropriate common multiple for one variable's coefficients.
  2. Explain, using a specific example, why scaling only one term of an equation (rather than every term) produces an invalid equation.
  3. Rewrite the system from problem 1 as an augmented array and perform the same elimination steps using row notation.
  4. Explain why `math.linalg.row-reduction`'s row operations are not a new technique to learn from scratch, referencing this lesson's own multiply-and-add operations.
- **P76 (Transfer Probe, mode = cross-link probe against `math.linalg.row-reduction`)**: "Recall from `math.linalg.row-reduction` that row operations (scaling a row, adding a multiple of one row to another) are applied systematically, column by column, to reach row echelon form. (a) Using this lesson's Example 1, explain precisely how the two scaling-and-subtracting steps performed there correspond to specific row operations in that concept's framework. (b) That concept's own procedure works for systems with MANY more than 2 equations and variables — explain why the 'find a common multiple, then eliminate' idea from this lesson becomes harder to plan by hand as the number of variables grows, motivating that concept's systematic column-by-column approach instead. (c) Explain why a student who has mastered THIS lesson's elimination method has already learned the core arithmetic that concept needs — what genuinely NEW idea does that concept add on top of it?"
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | ELIMINATION-ASSUMED-ONLY-WORKS-FOR-SIMPLE-MULTIPLES | Believing elimination only works when one equation's coefficient is already a simple multiple of the other's, missing that finding a common multiple always makes elimination possible | Foundational |
| MC-2 | PARTIAL-EQUATION-SCALING | Multiplying only the term being eliminated (or another partial subset of terms) rather than the entire equation, silently changing the equation into a different, invalid one | Foundational |
| MC-3 | ELIMINATION-METHOD-TREATED-AS-UNRELATED-TO-ROW-OPERATIONS | Believing elimination method is a separate, unrelated technique from the row operations used later in row reduction, missing that they are the exact same arithmetic in different notation | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Elimination Assumed Only Works for Simple Multiples") → P41 (detect: ask a student to eliminate a variable whose coefficients aren't simple multiples, and check whether they claim elimination doesn't apply) → P64 (conceptual shift: re-walk Example 1's common-multiple procedure, re-anchoring on "any pair of nonzero coefficients has a common multiple — elimination always works, it just may need this extra scaling step first").
- **B02 (targets MC-2)**: P27 (name it: "Partial Equation Scaling") → P41 (detect: ask a student to scale an equation and check whether they multiply only some terms) → P64 (conceptual shift: re-walk Example 2's direct comparison — correct full scaling versus the broken partial-scaling result that the genuine solution fails to satisfy — re-anchoring on "every term, both sides, every time").
- **B03 (targets MC-3)**: P27 (name it: "Elimination Method Treated as Unrelated to Row Operations") → P41 (detect: ask a student whether elimination method and row operations are the same technique, and check for a "no") → P64 (conceptual shift: re-walk Example 3's identical row-based computation, re-anchoring on "the exact same two operations, scaling and adding-a-multiple, just written with rows instead of full equations").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.alg.system-linear-equations` (the basic elimination case, and the three-solution-case framework this concept operates within).
- **Unlocks**: `math.linalg.row-reduction` (already authored — see the production-order note below; that concept's systematic row operations are exactly this concept's multiply-and-add procedure, generalized to matrices).
- **Cross-link (P76_mode = cross-link probe against `math.linalg.row-reduction`, already authored)**: the transfer probe explicitly connects this concept's equation-based elimination to that concept's row-based framework, previewing why a systematic column-by-column approach becomes necessary for larger systems.
- **Production-order note**: `math.linalg.row-reduction` was authored earlier in this corpus (batch 88) than this concept, despite being this concept's own KG `unlocks` target — production order in this corpus follows the ROI-ranked topological schedule (gated only by `requires`, not `unlocks` order), matching the precedent already recorded for `math.alg.system-3var`/`math.linalg.row-reduction` and several other concepts this session.

## Component 8 — Teaching Notes

- estimated_hours = 4 with a proficient/apply tag places this at a "3 TAs + gate" tier — A01 (finding a common multiple), A02 (scaling the entire equation correctly), and A03 (the direct row-operations connection) each target a distinct LO, appropriate for a concept that formalizes and systematizes a technique already briefly introduced in its prerequisite.
- All three worked examples deliberately reuse the SAME system ($3x+4y=11$, $5x+6y=19$) throughout — letting one fully worked concrete case carry the common-multiple procedure (Example 1), the scaling-error contrast (Example 2), and the row-operations translation (Example 3), rather than introducing fresh numbers for each objective.
- This concept was deliberately authored to supply the missing systematic bridge between `math.alg.system-linear-equations`' introductory elimination (simple-multiple case only) and `math.linalg.row-reduction`'s fully general matrix-based procedure — Component 3 and Teaching Action A03 make this bridging role explicit rather than treating either surrounding concept's content as already covering it.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (math.linalg.row-reduction authored → cross-link probe) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (cross-link probe against math.linalg.row-reduction) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.85×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Concrete: specific non-aligned system before the general common-multiple procedure) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
