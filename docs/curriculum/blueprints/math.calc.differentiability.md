# Teaching Blueprint: Differentiability (`math.calc.differentiability`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.calc.differentiability` |
| name | Differentiability |
| domain | Calculus |
| difficulty | advanced |
| bloom | analyze |
| mastery_threshold | 0.80 → MAMR = ⌈0.80×5⌉ = 4/5 |
| estimated_hours | 4 |
| requires | `math.calc.derivative-definition` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | P (Pictorial) — graphs of corners, cusps, vertical tangents before formal statement |
| description (KG) | f is differentiable at a if f'(a) exists; differentiability implies continuity but not vice versa; non-differentiable at corners, cusps, and vertical tangents.

 |

## Component 1 — Learning Objectives

- LO1: State that $f$ is DIFFERENTIABLE at $a$ if $f'(a)$ (the limit defining the derivative) EXISTS, and identify the three common geometric reasons it might fail: a CORNER (the left and right derivatives disagree), a CUSP (the derivative approaches $\pm\infty$ from both sides but with opposite signs), or a VERTICAL TANGENT (the derivative approaches $\pm\infty$ from both sides with the SAME sign).
- LO2: State the ONE-DIRECTIONAL implication: DIFFERENTIABILITY IMPLIES continuity, but continuity does NOT imply differentiability — recognizing that continuous-but-non-differentiable functions (like $|x|$ at 0) are a genuine, common counterexample class, not a contradiction.
- LO3: Given a piecewise-defined function, check differentiability at a boundary point by verifying BOTH that the function is continuous there AND that the left and right derivatives agree — continuity alone is insufficient.

## Component 2 — Prerequisite Check

Assumes mastery of `math.calc.derivative-definition` (the limit definition of $f'(a)$ whose existence defines differentiability).

## Component 3 — Core Explanation

A function $f$ is **differentiable** at $a$ if $f'(a)=\lim_{h\to0}\frac{f(a+h)-f(a)}{h}$ EXISTS. Geometrically, this fails in three common ways: a **corner** (the graph has a sharp bend, so the left-hand and right-hand derivatives are both finite but DIFFERENT — e.g. $|x|$ at $x=0$); a **cusp** (the derivative's magnitude approaches infinity from both sides but with OPPOSITE signs, like a sharp point folding back on itself); and a **vertical tangent** (the derivative approaches $\pm\infty$ from both sides with the SAME sign, like $x^{1/3}$ at $x=0$).

A crucial one-directional relationship: **differentiability implies continuity** (if $f'(a)$ exists, $f$ must be continuous at $a$), but the CONVERSE is false — a function can be continuous at a point WITHOUT being differentiable there. The classic example is $f(x)=|x|$ at $x=0$: perfectly continuous (no jump, hole, or asymptote), yet not differentiable (a corner).

For a piecewise function, checking differentiability at a boundary point requires TWO things: (1) continuity there, AND (2) the left-hand and right-hand derivatives must AGREE — continuity alone is not sufficient, since a corner can still occur at a continuous point.

## Component 4 — Worked Examples

**Example 1 (LO1 — identifying a corner, breaking MC-1)**: Show $f(x)=|x|$ is not differentiable at $x=0$. Left derivative: $\lim_{h\to0^-}\frac{|h|-0}{h}=\lim_{h\to0^-}\frac{-h}{h}=-1$. Right derivative: $\lim_{h\to0^+}\frac{|h|-0}{h}=\lim_{h\to0^+}\frac{h}{h}=1$. Since $-1\ne1$, $f'(0)$ does not exist — a CORNER. A common error assumes that because $f(x)=|x|$ "looks smooth enough" or is defined everywhere (including at 0), it must be differentiable everywhere — but a function being CONTINUOUS and DEFINED at a point says nothing about whether its derivative exists there; the one-sided derivatives must be checked explicitly.

**Example 2 (LO2 — continuity does not imply differentiability, breaking MC-2)**: Confirm $f(x)=|x|$ IS continuous at $x=0$ (no jump: $\lim_{x\to0^-}|x|=\lim_{x\to0^+}|x|=|0|=0$) despite NOT being differentiable there (Example 1). A common error assumes that since $f$ is continuous, it MUST also be differentiable — reversing the true one-directional implication (differentiability $\Rightarrow$ continuity, NOT the other way around); continuity is a NECESSARY but not SUFFICIENT condition for differentiability.

**Example 3 (LO3 — checking a piecewise boundary)**: For $f(x)=x^2$ if $x<1$, $f(x)=2x-1$ if $x\ge1$, check differentiability at $x=1$. Continuity: $\lim_{x\to1^-}x^2=1$, $f(1)=2(1)-1=1$ — continuous. Derivatives: left derivative of $x^2$ at $x=1$ is $2(1)=2$; right derivative of $2x-1$ is $2$. Both AGREE (2=2) — so $f$ IS differentiable at $x=1$ (both continuity and matching one-sided derivatives hold).

## Component 5 — Teaching Actions

### Teaching Action A01 — Checking One-Sided Derivatives Directly, Not Assuming Smoothness (Primitive P64: Conceptual Shift)

Work Example 1, computing both one-sided derivatives explicitly via the limit definition, showing the corner emerges from their disagreement.

- **MC-1 hook**: check whether one-sided derivatives are actually computed rather than assumed.

### Teaching Action A02 — Differentiability Implies Continuity, Not the Reverse (Primitive P06: Contrast Pair)

Work Example 2, explicitly stating and diagramming the one-directional implication, with $|x|$ as the standing counterexample for "continuous but not differentiable."

- **MC-2 hook**: this directly targets MC-2 (reversing the implication direction).

### Teaching Action A03 — Piecewise Differentiability Needs BOTH Continuity AND Matching Derivatives (Primitive P11: Representation Shift)

Work Example 3, explicitly checking both conditions in sequence.

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.80×5⌉ = 4/5.

- **P77 (4-problem set)**:
  1. Show $f(x)=|x-3|$ is not differentiable at $x=3$, computing both one-sided derivatives.
  2. State whether "continuous implies differentiable" or "differentiable implies continuous" is the TRUE implication, and give a counterexample showing the converse fails.
  3. For $f(x)=x^2$ if $x<0$, $f(x)=-x^2$ if $x\ge0$, check differentiability at $x=0$.
  4. Explain why checking ONLY continuity at a piecewise boundary is insufficient to conclude differentiability.
- **P76 (Transfer Probe, mode = independence)**: "A car's velocity-vs-time graph is continuous throughout a trip (no sudden position jumps) but has a sharp corner at $t=10$s, where the driver instantly switches from decelerating to accelerating (braking hard, then immediately flooring the gas). (a) Explain, using this lesson's framework, why the velocity function being continuous at $t=10$s does NOT mean the car's ACCELERATION (the derivative of velocity) is well-defined at that exact instant. (b) Describe what a physical accelerometer reading would show at $t=10$s, connecting the corner in the graph to the underlying calculus concept of non-differentiability."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | DIFFERENTIABILITY-ASSUMED-FROM-SMOOTH-APPEARANCE-WITHOUT-CHECKING-ONE-SIDED-DERIVATIVES | Assuming a function is differentiable because it looks smooth or is defined everywhere, without explicitly computing one-sided derivatives | Foundational |
| MC-2 | CONTINUITY-ASSUMED-TO-IMPLY-DIFFERENTIABILITY | Believing continuity implies differentiability, reversing the true one-directional implication (differentiability implies continuity) | Foundational |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Differentiability Assumed from Smooth Appearance Without Checking One-Sided Derivatives") → P41 (detect: present Example 1 and check whether one-sided derivatives are actually computed) → P64 (conceptual shift: re-compute both one-sided derivatives explicitly via the limit definition).
- **B02 (targets MC-2)**: P27 ("Continuity Assumed to Imply Differentiability") → P41 (detect: present Example 2 and check whether continuity is (incorrectly) used to conclude differentiability) → P64 (conceptual shift: re-state the correct one-directional implication, using $|x|$ at 0 as the standing counterexample).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.calc.derivative-definition`.
- **Unlocks**: none recorded in the KG.
- **Related**: `math.calc.continuity` (the one-directional implication this concept clarifies).

## Component 8 — Teaching Notes

- estimated_hours = 4 and bloom = analyze reflect that this concept requires genuine discrimination between related-but-distinct conditions (continuity vs. differentiability), a classic source of student confusion.
- Both misconceptions were ranked Foundational because each reflects a fundamental misunderstanding of the logical relationship between two core calculus concepts, not a mere computational error.
- The braking-then-accelerating transfer probe was deliberately chosen because a physically sharp velocity corner producing an undefined instantaneous acceleration is a vivid, concrete illustration of non-differentiability with real physical meaning.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.calc.derivative-definition`) |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
| V-5 | cross_links checked against disk | PASS (none declared) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (2 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.80×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Pictorial: corners/cusps/vertical tangents before formal statement) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
