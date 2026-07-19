# Teaching Blueprint: Systems of 3 Equations in 3 Variables (`math.alg.system-3var`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.alg.system-3var` |
| name | Systems of 3 Equations in 3 Variables |
| domain | Algebra |
| difficulty | proficient |
| bloom | apply |
| mastery_threshold | 0.8 → MAMR = ⌈0.8×5⌉ = 4/5 |
| estimated_hours | 8 |
| requires | `math.alg.system-linear-equations` |
| unlocks | `math.linalg.row-reduction` |
| cross_links | `math.linalg.row-reduction` |
| CPA_entry_stage | C (Concrete) — eliminating one variable at a time from a specific 3×3 system, before the general elimination-cascade procedure | 
| description (KG) | Extension of 2-variable systems; solved by elimination or row reduction, with solutions being a point, a line, a plane, or the empty set. |

## Component 1 — Learning Objectives

- LO1: Solve a system of 3 equations in 3 unknowns via an **elimination cascade** — eliminate the same variable from TWO different pairs of equations to produce a genuinely reduced 2-variable, 2-equation system, then solve THAT system using the already-mastered `math.alg.system-linear-equations` elimination method.
- LO2: Extend the 2-variable prerequisite's three solution cases (unique, none, infinite) to 3 variables, recognizing that the **infinite-solutions** case is now RICHER than before: it can describe either a **line** (a 1-parameter family, when exactly one equation is redundant) or an entire **plane** (a 2-parameter family, when two of the three equations are redundant) — not always a line, as the 2-variable case's own "infinite = a line" finding might suggest.
- LO3: Recognize that a genuine contradiction ($0=k$, $k\neq0$) found from ANY two of the three equations proves the whole system has no solution immediately, regardless of the third equation or which variable-elimination order was chosen — and preview `math.linalg.row-reduction`'s systematic augmented-matrix procedure as a more reliable alternative for larger or more error-prone systems.

## Component 2 — Prerequisite Check

Assumes mastery of `math.alg.system-linear-equations` (a 2-variable system has three solution cases — unique solution, no solution, infinitely many solutions on a line; elimination combines equations to cancel one variable; $0=0$ signals a redundant/dependent equation, $0=k$ ($k\neq0$) signals a contradiction).

## Component 3 — Core Explanation

**The elimination cascade — two rounds, not one**: `math.alg.system-linear-equations` eliminated one variable from a PAIR of equations to reach a single equation in one unknown. With 3 equations in 3 unknowns, one elimination round only gets you from 3 equations down to a system of 2 equations in 2 unknowns — a genuinely solvable case, but not yet a single number. Eliminating the SAME variable from TWO different pairs of the original three equations produces exactly this reduced 2-variable system, which is then solved using the EXACT SAME elimination (or substitution) technique already mastered for 2-variable systems — nothing new is needed for that final step, only the recognition that getting there requires two elimination rounds, not one.

**Solution types, extended: infinite solutions can now be a line OR a plane**: the 2-variable case had exactly three outcomes: a unique point, no solution, or infinitely many solutions forming a line. With 3 equations in 3 unknowns, a unique point and no solution both extend directly (three planes meeting at one point; three planes with no common point). But "infinitely many solutions" is now RICHER: if exactly ONE of the three equations turns out to be redundant (a linear combination of the other two), the system reduces to 2 independent equations in 3 unknowns, leaving ONE free parameter — the solution set is a **line**. If TWO of the three equations are redundant (all three describe the same relationship), only ONE independent equation remains, leaving TWO free parameters — the solution set is an entire **plane**. The 2-variable case never had this second possibility simply because there wasn't room for a second free parameter with only 2 unknowns.

**A contradiction from any two equations settles the whole system, regardless of the third**: exactly as in the 2-variable case, if combining any two of the three equations produces $0=k$ for some $k\neq0$, this is a definitive contradiction — the system has NO solution, full stop, regardless of what the third equation says or which variable you chose to eliminate first. For larger systems (more variables, more equations), tracking elimination pairs and orders by hand becomes increasingly error-prone; `math.linalg.row-reduction`'s augmented-matrix procedure systematizes exactly this process (the same three legal operations, applied in a fixed, disciplined column-by-column order) so that these same conclusions — unique point, no solution, a line's or plane's worth of solutions — are reached reliably without having to plan which equation-pairs to combine by hand.

## Component 4 — Worked Examples

**Example 1 (LO1 — full elimination cascade, unique solution)**: Solve $x+y+z=6$ (Eq1), $2x-y+z=3$ (Eq2), $x+2y-z=2$ (Eq3). Eliminate $y$ using Eq1+Eq2: $3x+2z=9$ (Eq4). Eliminate $y$ using $2\times$Eq1 $-$ Eq3: $(2x+2y+2z)-(x+2y-z)=12-2 \Rightarrow x+3z=10$ (Eq5). Now Eq4 and Eq5 form an ordinary 2-variable system: from Eq5, $x=10-3z$; substitute into Eq4: $3(10-3z)+2z=9 \Rightarrow 30-7z=9 \Rightarrow z=3$, then $x=10-9=1$. Back into Eq1: $1+y+3=6\Rightarrow y=2$. Check in Eq2: $2(1)-2+3=3$ ✓; Eq3: $1+2(2)-3=2$ ✓. Unique solution $(x,y,z)=(1,2,3)$ — reached only AFTER two separate elimination rounds produced Eq4 and Eq5 together.

**Example 2 (LO2 — infinite solutions forming a PLANE, breaking MC-2)**: Solve $x+y+z=6$ (Eq1), $2x+2y+2z=12$ (Eq2), $3x+3y+3z=18$ (Eq3). Notice Eq2 $=2\times$Eq1 and Eq3$=3\times$Eq1 — BOTH Eq2 and Eq3 are redundant, leaving only ONE independent equation, $x+y+z=6$, for three unknowns. With two variables free (say $y,z$ arbitrary), $x=6-y-z$ — a solution set with TWO free parameters, i.e. an entire **plane** of solutions, not merely a line: for instance $(y,z)=(0,0)$ gives $(6,0,0)$; $(y,z)=(1,2)$ gives $(3,1,2)$; both are valid solutions, and infinitely many more exist across a full 2-parameter family.

**Example 3 (LO3 — a contradiction settles the system immediately, breaking MC-3)**: Solve $x+y+z=6$ (Eq1), $2x+2y+2z=10$ (Eq2), $x-y+z=2$ (Eq3, irrelevant to the contradiction). Compute $2\times$Eq1 $-$ Eq2: $2(x+y+z)-(2x+2y+2z) = 2(6)-10 \Rightarrow 0 = 2$ — a genuine contradiction, found using ONLY Eq1 and Eq2. This alone proves the system has NO solution; Eq3 never needs to be consulted at all, and re-trying with a different variable-elimination order or a different pair would not change this conclusion — a contradiction found anywhere is conclusive for the whole system.

## Component 5 — Teaching Actions

### Teaching Action A01 — The Elimination Cascade Needs Two Rounds (Primitive P11: Representation Shift)

State: "one elimination round gets you from 3 equations to 2 — that's a real system in 2 unknowns, not yet a number. You need a SECOND elimination (using a different pair of the original three equations) to get a second equation in the same 2 variables, and only then solve that reduced system exactly like `math.alg.system-linear-equations` already taught you." Work Example 1's full two-round cascade.

- **MC-1 hook**: ask "once I have one equation like Eq4, $3x+2z=9$, can I already solve for $x$ and $z$?" — a "yes" answer reveals MC-1 (treating a single reduced equation as sufficient, forgetting a second elimination round is needed to actually pin down both remaining variables).

### Teaching Action A02 — Infinite Solutions Can Be a Line OR a Plane Now (Primitive P06: Contrast Pair)

Contrast Example 2's fully-redundant system (only 1 independent equation, 2 free parameters, a PLANE of solutions) against a system with exactly ONE redundant equation (2 independent equations, 1 free parameter, a LINE of solutions — e.g. Eq1 and Eq3 from Example 1 kept, with a third equation equal to Eq1+Eq3). State: "in 2 variables, 'infinitely many' only ever meant a line — with 3 variables, HOW MANY equations turn out redundant determines whether you get a line (one redundant) or a whole plane (two redundant)."

- **MC-2 hook**: ask "if a 3-variable system has infinitely many solutions, does that always mean the solution set is a line, just like the 2-variable case?" — a "yes" answer reveals MC-2 (assuming the 2-variable case's finding carries over unchanged, missing the new plane possibility).

### Teaching Action A03 — One Contradiction Settles Everything, and a Preview of a More Systematic Method (Primitive P28: Conflict Evidence)

Present Example 3's direct evidence: $2\times$Eq1 $-$ Eq2 alone gives $0=2$, a flat contradiction, making Eq3 completely irrelevant to the conclusion. State: "once ANY two equations produce a genuine contradiction, the whole system has no solution — full stop, no need to check the third equation or retry with a different pairing. For bigger systems where tracking pairs by hand gets error-prone, `math.linalg.row-reduction`'s augmented-matrix procedure reaches the same conclusions through one fixed, systematic column-by-column sweep instead."

- **MC-3 hook**: ask "if I get a contradiction like $0=2$ from two of the three equations, should I go back and try eliminating a different variable, or in a different order, to double check?" — a "yes, I should retry" answer reveals MC-3 (treating a genuine contradiction as a possible method error rather than a conclusive result).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Solve $x+y+z=4$, $x-y+z=2$, $2x+y-z=1$ using the elimination cascade (two rounds), stating the unique solution.
  2. Solve $x+2y+z=5$, $2x+4y+2z=10$, $3x+6y+3z=15$, and state whether the solution set is a point, a line, or a plane.
  3. Determine whether $x+y+z=3$, $2x+2y+2z=8$, $x-y+z=1$ has a solution, showing the elimination step that reveals the answer.
  4. Explain, in your own words, why the "infinitely many solutions" case for a 3-variable system can be either a line or a plane, depending on how many of the three equations are redundant.
- **P76 (Transfer Probe, mode = cross-link probe against `math.linalg.row-reduction`)**: "A chemist needs to balance a reaction requiring three unknown quantities $x,y,z$ of reactants, governed by three conservation equations. (a) Using the elimination cascade from this lesson, describe the two rounds of elimination you would perform to reduce this to a 2-variable system. (b) Suppose the chemist's colleague instead sets up the SAME three equations as an augmented matrix and applies `math.linalg.row-reduction`'s systematic column-by-column procedure. Explain why both approaches — your elimination cascade and the colleague's row reduction — must arrive at the identical solution (point, line, or plane), even though the colleague's method never requires deciding, by hand, which pairs of equations to combine first. (c) For a hypothetical system of 10 equations in 10 unknowns, explain why the row-reduction approach would be strongly preferred over manually planning an elimination cascade."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | SINGLE-ELIMINATION-ROUND-ASSUMED-SUFFICIENT | Treating one reduced 2-variable equation as already solvable for both remaining variables, forgetting that a second elimination round (using a different pair of original equations) is needed to produce a genuine 2-equation, 2-variable system | Foundational |
| MC-2 | INFINITE-SOLUTIONS-ASSUMED-ALWAYS-A-LINE | Assuming the infinite-solutions case for a 3-variable system is always a line, as in the 2-variable case, missing that two redundant equations (rather than one) produce a plane's worth of solutions instead | Foundational |
| MC-3 | CONTRADICTION-TREATED-AS-METHOD-ERROR | Encountering a genuine contradiction (0=k, k≠0) from two of the three equations and assuming a mistake was made in variable choice or elimination order, rather than recognizing this proves the system has no solution regardless of method | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Single Elimination Round Assumed Sufficient") → P41 (detect: ask a student to solve a 3-variable system and check whether they stop after producing only one reduced 2-variable equation) → P64 (conceptual shift: re-walk Example 1's full two-round cascade, re-anchoring on "eliminate the SAME variable using TWO different pairs of the original equations — only then do you have a genuine 2-variable system to solve").
- **B02 (targets MC-2)**: P27 (name it: "Infinite Solutions Assumed Always a Line") → P41 (detect: ask a student to describe the solution set of a system with all three equations redundant, and check for an automatic "a line" answer) → P64 (conceptual shift: re-walk Example 2's fully-redundant system, showing TWO free parameters and re-anchoring on "count how many equations are actually redundant — one redundant gives a line, two redundant gives a plane").
- **B03 (targets MC-3)**: P27 (name it: "Contradiction Treated as Method Error") → P41 (detect: ask a student who has found $0=k$, $k\neq0$, from two equations whether they should retry with a different elimination order, and check for a "yes") → P64 (conceptual shift: re-walk Example 3's direct contradiction, re-anchoring on "a genuine contradiction from ANY two equations is conclusive — the third equation and the choice of elimination order cannot change a 'no solution' conclusion").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.alg.system-linear-equations` (the 2-variable elimination technique this concept's final reduction step directly reuses, and the three-solution-case framework this concept extends to 3 variables).
- **Unlocks**: `math.linalg.row-reduction` (the systematic augmented-matrix procedure that formalizes exactly the elimination cascade this concept teaches by hand — already authored; see the cross-link note below).
- **Cross-link (P76_mode = cross-link probe against `math.linalg.row-reduction`, already authored)**: the transfer probe explicitly connects this concept's hand-planned elimination cascade to `math.linalg.row-reduction`'s systematic column-by-column procedure, previewing why the latter becomes preferable as systems grow larger — reusing that concept's own established emphasis on elimination order no longer needing to be planned by hand.

## Component 8 — Teaching Notes

- estimated_hours = 8 with a proficient/apply tag places this at a "3 TAs + gate" tier — A01 (the elimination cascade), A02 (the line-vs-plane solution-type extension), and A03 (contradiction conclusiveness, plus the row-reduction preview) each target a distinct LO, appropriate for a concept that is fundamentally an extension of one already-mastered technique (2-variable elimination) applied twice, plus one genuinely new case (the plane possibility) the extra dimension introduces.
- `math.linalg.row-reduction` was authored (batch 88) before this concept despite being this concept's own KG `unlocks` target — production order in this corpus follows the ROI-ranked topological schedule (gated only by `requires`, not `unlocks` order), so this blueprint's cross-link probe could reference row-reduction's actual authored content directly rather than describing it only abstractly.
- Examples 1, 2, and 3 were deliberately built from the SAME underlying equation $x+y+z=6$ (or a simple variant) scaled or modified in a single controlled way each time (a genuinely independent third equation for Example 1; two redundant multiples for Example 2; one contradicting multiple for Example 3) — isolating exactly one new idea per example rather than varying multiple things at once.

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
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.8×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Concrete: specific 3×3 system before the general cascade procedure) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
