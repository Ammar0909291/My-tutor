# Teaching Blueprint: Linear Inequality in One Variable (`math.alg.inequality-1var`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.alg.inequality-1var` |
| name | Linear Inequality in One Variable |
| domain | Algebra |
| difficulty | developing |
| bloom | apply |
| mastery_threshold | 0.85 → MAMR = ⌈0.85×5⌉ = 5/5 |
| estimated_hours | 6 |
| requires | `math.alg.linear-equation-1var` |
| unlocks | `math.alg.inequality-2var` |
| cross_links | (none) |
| CPA_entry_stage | C (Concrete) — begins with a direct variable-on-both-sides example before the general compound and degenerate cases |
| description (KG) | An inequality of the form ax + b < c (or ≤, >, ≥); solution is an interval, and the direction flips when multiplying by a negative. |

## Component 1 — Learning Objectives

- LO1: Solve a linear inequality with the **variable on both sides** (e.g., $3x+5<7x-11$) by first collecting variable terms onto ONE side — recognizing this rearrangement step must happen BEFORE checking whether a sign flip is needed, since the sign of the isolating coefficient is only determined AFTER collecting terms.
- LO2: Solve and interpret a **compound (two-sided/three-part)** linear inequality of the form $a<mx+b<c$ by applying the SAME operation to ALL THREE PARTS simultaneously — including reversing BOTH inequality directions (and the resulting order) when multiplying or dividing all three parts by a negative.
- LO3: Recognize **degenerate cases** — a linear inequality whose variable terms cancel entirely during solving can reduce to an ALWAYS-TRUE statement (solution: all real numbers) or an ALWAYS-FALSE statement (solution: the empty set) — genuinely different outcomes from the general interval-solution case.

## Component 2 — Prerequisite Check

Assumes mastery of `math.alg.linear-equation-1var` (solving linear equations by isolating the variable) and, informally, `math.alg.inequality`'s already-established point-vs-interval distinction and single-side sign-flip rule (this concept's own new content builds on, but does not re-teach, that foundation).

## Component 3 — Core Explanation

**Variable-on-both-sides requires collecting terms BEFORE checking for a sign flip**: when the variable appears on BOTH sides of an inequality (e.g., $3x+5<7x-11$), the sign-flip rule cannot be applied directly to the ORIGINAL form — the variable terms must first be collected onto one side (by adding or subtracting a matching term from both sides), and only THEN does the resulting coefficient's sign determine whether isolating the variable requires a flip.

**Compound inequalities require operating on all three parts simultaneously**: a compound inequality $a<mx+b<c$ asserts TWO inequalities at once ($a<mx+b$ AND $mx+b<c$). Solving it means applying the identical operation to ALL THREE parts ($a$, $mx+b$, and $c$) at every step — including, if multiplying or dividing by a negative number, flipping BOTH inequality directions and correspondingly reversing the ORDER the three parts are written in.

**Some linear inequalities resolve to always-true or always-false, not a genuine interval**: if the variable terms on both sides of an inequality are IDENTICAL, they cancel completely during solving, leaving a statement purely about constants (e.g., $6<10$ or $6<4$). If this remaining constant statement is TRUE, every real number satisfies the original inequality (solution: all of $\mathbb{R}$); if FALSE, no real number does (solution: $\varnothing$) — genuinely different from the usual case where solving produces a specific interval.

## Component 4 — Worked Examples

**Example 1 (LO1 — collecting variable terms before checking for a flip, breaking MC-1)**: Solve $3x+5<7x-11$. Subtract $7x$ from both sides (collecting variable terms onto the left): $3x-7x+5<-11$, i.e. $-4x+5<-11$. Subtract $5$: $-4x<-16$. NOW check the sign for isolating $x$: dividing by $-4$ (negative) REQUIRES a flip: $x>4$. The sign-flip decision could only be made correctly AFTER the variable terms were collected — attempting to judge the flip from the original equation's coefficients (before collecting) would have no clear coefficient to check yet.

**Example 2 (LO2 — operating on all three parts of a compound inequality, breaking MC-2)**: Solve $-3<-2x+1<9$. Subtract $1$ from ALL THREE parts: $-4<-2x<8$. Divide ALL THREE parts by $-2$ (negative — flip BOTH inequality directions and reverse the part order): $\dfrac{-4}{-2}>x>\dfrac8{-2}$, i.e. $2>x>-4$, rewritten in standard increasing order as $-4<x<2$. Every step — subtracting $1$, dividing by $-2$ — was applied to all three parts identically, and the negative division correctly flipped both inequality symbols.

**Example 3 (LO3 — degenerate all-real and empty-set cases, breaking MC-3)**: Solve $2(x+3)<2x+10$: expand to $2x+6<2x+10$; subtract $2x$ from both sides: $6<10$ — TRUE regardless of $x$ (the variable terms canceled completely) — so the solution is ALL REAL NUMBERS. Contrast: solve $2(x+3)<2x+4$: expand to $2x+6<2x+4$; subtract $2x$: $6<4$ — FALSE regardless of $x$ — so the solution is the EMPTY SET, no real number satisfies it. Both degenerate outcomes arise specifically because the variable terms were IDENTICAL on both sides and canceled entirely, leaving only a constant comparison to evaluate.

## Component 5 — Teaching Actions

### Teaching Action A01 — Collect Variable Terms First, Then Check the Sign (Primitive P11: Representation Shift)

State: "when the variable appears on both sides, there's an extra step BEFORE the sign-flip check you already know — collect the variable terms onto one side first, and only then does a coefficient's sign become available to check." Work Example 1's full collect-then-isolate sequence.

- **MC-1 hook**: ask "can the sign-flip rule be applied directly to a variable-on-both-sides inequality, before collecting the variable terms onto one side?" — a "yes" answer reveals MC-1 (attempting to judge the flip before there is a clear isolating coefficient to check).

### Teaching Action A02 — All Three Parts of a Compound Inequality Move Together (Primitive P28: Conflict Evidence)

Present Example 2's direct evidence: subtracting $1$ and dividing by $-2$ were both applied to EVERY part ($-3$, $-2x+1$, $9$) simultaneously, with the negative division flipping both directions and the part order. State: "a compound inequality is really two inequalities glued together — every operation must be applied to all three parts at once, including the sign-flip when it applies."

- **MC-2 hook**: ask "when solving a compound inequality like $a<mx+b<c$, can each 'side' be manipulated independently, without necessarily applying the identical operation to the middle part too?" — a "yes" answer reveals MC-2 (missing that all three parts must be operated on together, in lockstep).

### Teaching Action A03 — Variable Terms Can Cancel, Leaving All-Real or Empty-Set Solutions (Primitive P06: Contrast Pair)

Contrast Example 3's two cases: $6<10$ (always true, all reals) against $6<4$ (always false, empty set) — both arising from otherwise-similar-looking inequalities differing only in one constant. State: "when the variable terms are identical on both sides, they vanish entirely, and what's left is a plain constant comparison — either always true or always false, never a genuine interval."

- **MC-3 hook**: ask "must every linear inequality's solution be some genuine interval of real numbers?" — a "yes" answer reveals MC-3 (missing the degenerate all-real and empty-set cases that arise when variable terms cancel completely).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Solve $5x-3>2x+9$, collecting variable terms before checking for a sign flip.
  2. Solve the compound inequality $2\le3x-4\le11$.
  3. Solve $-4<-x+2<6$, correctly flipping both directions and reordering.
  4. Solve $3(x+2)<3x+7$ and $3(x+2)<3x+5$, identifying which (if either) is degenerate and of which type.
- **P76 (Transfer Probe, mode = independence)**: "A quality-control engineer needs a part's measured length $L$ (in mm) to satisfy $-2<3L-8<10$ to pass inspection. (a) Solve this compound inequality for $L$, applying operations to all three parts. (b) A colleague, checking a related specification, encounters $2(L+1)<2L+9$ and, after expanding and simplifying, gets confused when the variable disappears entirely. Using this lesson's degenerate-case reasoning, explain what this outcome means for the specification (all measurements pass, or none do), and how to tell which. (c) The colleague also proposes solving a variable-on-both-sides inequality by checking the sign of the ORIGINAL left-side coefficient before doing any rearrangement, to 'save a step.' Explain specifically why this shortcut can give the wrong answer, using this lesson's collect-first principle."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | SIGN-FLIP-CHECKED-BEFORE-COLLECTING-VARIABLE-TERMS | Believing the sign-flip rule can be applied directly to a variable-on-both-sides inequality before collecting variable terms onto one side, missing that this rearrangement must happen first | Foundational |
| MC-2 | COMPOUND-INEQUALITY-PARTS-MANIPULATED-INDEPENDENTLY | Believing each part of a compound inequality can be manipulated independently, missing that all three parts must receive the identical operation simultaneously | Foundational |
| MC-3 | EVERY-LINEAR-INEQUALITY-ASSUMED-TO-YIELD-AN-INTERVAL | Believing every linear inequality's solution must be some genuine interval, missing the degenerate all-real and empty-set cases arising when variable terms cancel | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Sign Flip Checked Before Collecting Variable Terms") → P41 (detect: ask a student to solve a variable-on-both-sides inequality and check whether they attempt to judge a flip before rearranging) → P64 (conceptual shift: re-walk Example 1's collect-then-isolate sequence, re-anchoring on "collect variable terms first; only then is there a coefficient sign to check").
- **B02 (targets MC-2)**: P27 (name it: "Compound Inequality Parts Manipulated Independently") → P41 (detect: ask a student to solve a compound inequality and check whether they apply an operation to only some of the three parts) → P64 (conceptual shift: re-walk Example 2's all-three-parts-together sequence, re-anchoring on "every operation applies to all three parts simultaneously").
- **B03 (targets MC-3)**: P27 (name it: "Every Linear Inequality Assumed to Yield an Interval") → P41 (detect: present a degenerate inequality and ask a student to state its interval solution, checking whether they force an interval answer) → P64 (conceptual shift: re-walk Example 3's two degenerate cases, re-anchoring on "canceling variable terms can leave an always-true or always-false statement instead of an interval").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.alg.linear-equation-1var` (the isolate-the-variable technique this concept's collect-then-solve procedure directly builds on).
- **Unlocks**: `math.alg.inequality-2var` (extends single-variable inequality solving to two variables and their graphical regions).
- **Cross-link**: KG lists no cross_links for this concept (checked via `ls docs/curriculum/blueprints/` before setting P76_mode — none to check). $P76_{mode}=$ **independence**.

## Component 8 — Teaching Notes

- estimated_hours = 6 with a developing/apply tag places this at a "3 TAs + gate" tier; the concept covers three genuinely distinct new skills (variable-on-both-sides rearrangement, compound three-part inequalities, degenerate cases) beyond `math.alg.inequality`'s already-established single-side sign-flip and point-vs-interval foundation.
- **Division of labor**: `math.alg.inequality` (authored earlier in this corpus) owns the FOUNDATIONAL content — point-vs-interval solution shape, the basic sign-flip rule for a single isolating operation, and strict-vs-non-strict boundary inclusion. This concept, `math.alg.inequality-1var`, deliberately does NOT re-teach any of that; despite a superficially similar KG description, it owns three genuinely NEW skills that concept never covered: rearranging variable-on-both-sides inequalities before applying the flip rule, operating on all three parts of a compound inequality simultaneously, and recognizing degenerate all-real/empty-set outcomes.
- Example 3's two contrasting inequalities ($2(x+3)<2x+10$ vs. $2(x+3)<2x+4$) were deliberately built from the identical left-hand expression, differing only in the right-hand constant, specifically to isolate how sensitively the degenerate outcome (all reals vs. empty set) depends on that one constant, once the variable terms cancel.

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
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.85×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Concrete: direct variable-on-both-sides example before the general compound and degenerate cases) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
