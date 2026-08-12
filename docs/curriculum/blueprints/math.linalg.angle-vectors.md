# Teaching Blueprint: Angle Between Vectors (`math.linalg.angle-vectors`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.linalg.angle-vectors` |
| name | Angle Between Vectors |
| domain | Linear Algebra |
| difficulty | proficient |
| bloom | apply |
| mastery_threshold | 0.90 → MAMR = ⌈0.90×5⌉ = 5/5 |
| estimated_hours | 1 |
| requires | `math.linalg.dot-product`, `math.linalg.norm` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | A (Abstract) |
| description (KG) | cos θ = (a·b)/(\|a\|\|b\|). θ=π/2 iff a⊥b. Cauchy-Schwarz inequality guarantees this value is in [−1,1], ensuring θ is well-defined.

 |

## Component 1 — Learning Objectives

- LO1: Compute the angle $\theta$ between two vectors using $\cos\theta=\frac{a\cdot b}{|a||b|}$.
- LO2: Use the dot product to test PERPENDICULARITY directly: $\theta=\pi/2$ (90°) if and only if $a\cdot b=0$ — no need to compute the full angle when only checking for perpendicularity.
- LO3: State that the CAUCHY-SCHWARZ INEQUALITY guarantees $\frac{a\cdot b}{|a||b|}$ always lies in $[-1,1]$ — ensuring the angle formula's input to $\cos^{-1}$ is always VALID (never out of the arccosine's domain).

## Component 2 — Prerequisite Check

Assumes mastery of `math.linalg.dot-product` and `math.linalg.norm` — the two ingredients this angle formula combines.

## Component 3 — Core Explanation

The **angle** $\theta$ between two nonzero vectors $a,b$ satisfies $\cos\theta=\frac{a\cdot b}{|a||b|}$ — the dot product, normalized by both vectors' lengths. Solving for $\theta$: $\theta=\cos^{-1}\left(\frac{a\cdot b}{|a||b|}\right)$.

A key special case: $\theta=\pi/2$ (90°, PERPENDICULAR) if and only if $a\cdot b=0$ — since $\cos(\pi/2)=0$, checking perpendicularity is as simple as computing the dot product alone, without needing the full angle formula.

The **Cauchy-Schwarz inequality** guarantees $\left|\frac{a\cdot b}{|a||b|}\right|\le1$ ALWAYS — i.e., this ratio always lies in $[-1,1]$, exactly the domain of $\cos^{-1}$, ensuring the angle formula is always mathematically well-defined and never produces an invalid input.

## Component 4 — Worked Examples

**Example 1 (LO1 — basic angle computation)**: Find the angle between $a=(1,0)$ and $b=(1,1)$. $a\cdot b=1(1)+0(1)=1$. $|a|=1$, $|b|=\sqrt2$. $\cos\theta=\frac{1}{1\times\sqrt2}=\frac{1}{\sqrt2}$. $\theta=\cos^{-1}\left(\frac{1}{\sqrt2}\right)=45°$ (or $\pi/4$ radians).

**Example 2 (LO2 — perpendicularity shortcut, breaking MC-1)**: Determine whether $a=(2,3)$ and $b=(3,-2)$ are perpendicular. Compute $a\cdot b=2(3)+3(-2)=6-6=0$ — YES, perpendicular (since $a\cdot b=0$), confirmed WITHOUT needing to compute the norms or the full angle formula. A common error computes the full angle formula (including norms and $\cos^{-1}$) even when only checking for perpendicularity, when the dot-product-alone test is both sufficient and far more efficient for this specific question.

**Example 3 (LO3 — Cauchy-Schwarz guarantees validity, breaking MC-2)**: For ANY nonzero vectors $a,b$, verify $\frac{a\cdot b}{|a||b|}$ is always in $[-1,1]$: e.g. for $a=(1,0)$, $b=(-1,0)$ (opposite directions), $\cos\theta=\frac{-1}{1\times1}=-1$ (the minimum possible value, corresponding to $\theta=180°$); for $a=(1,0)$, $b=(1,0)$ (same direction), $\cos\theta=\frac{1}{1\times1}=1$ (the maximum, $\theta=0°$). These are the EXTREME cases — Cauchy-Schwarz guarantees no vector pair can ever produce a ratio outside $[-1,1]$, which would otherwise make $\cos^{-1}$ undefined. A common error, when computing this ratio and getting a value OUTSIDE $[-1,1]$ (which should never genuinely happen), doesn't recognize this as a clear signal of a computational ERROR somewhere upstream (e.g. in the dot product or norm calculation), rather than a legitimate (but impossible) result.

## Component 5 — Teaching Actions

### Teaching Action A01 — Dot Product Over Product of Norms, Then Arccosine (Primitive P64: Conceptual Shift)

Work Example 1 in full, computing each piece (dot product, both norms) separately before combining and applying $\cos^{-1}$.

### Teaching Action A02 — Perpendicularity Only Needs the Dot Product (Primitive P06: Contrast Pair)

Work Example 2, contrasting the efficient dot-product-only test against unnecessarily computing the full angle formula. State the rule: "checking perpendicularity specifically? Just check whether $a\cdot b=0$ — no need for norms or arccosine at all."

- **MC-1 hook**: this directly targets MC-1 (unnecessarily computing the full angle formula when only perpendicularity is being checked).

### Teaching Action A03 — An Out-of-Range Ratio Signals a Computational Error (Primitive P11: Representation Shift)

Work Example 3's extreme cases (exactly $\pm1$), then explicitly state that Cauchy-Schwarz GUARANTEES the ratio can never exceed these bounds — so any computed value outside $[-1,1]$ must indicate an arithmetic mistake upstream, not a genuine result.

- **MC-2 hook**: this directly targets MC-2 (not recognizing an out-of-range computed ratio as a clear error signal).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.90×5⌉ = 5/5.

- **P77 (4-problem set)**:
  1. Find the angle between $a=(3,4)$ and $b=(4,3)$.
  2. Determine whether $a=(1,2,3)$ and $b=(2,-1,0)$ are perpendicular, using the most efficient method.
  3. Find the angle between $a=(1,1)$ and $b=(-1,1)$.
  4. If a computed value of $\frac{a\cdot b}{|a||b|}$ comes out to $1.2$, explain what this indicates and what should be checked.
- **P76 (Transfer Probe, mode = independence)**: "A robotics engineer needs to verify that two sensor mounting brackets are installed at exactly 90° to each other, using direction vectors $a=(1,2,2)$ and $b=(4,-1,-1)$ read from the CAD model. (a) Determine whether these brackets are indeed perpendicular, using the most efficient test from this lesson. (b) If instead the engineer needed to know the EXACT angle (not just whether it's 90°) for a bracket that is NOT perpendicular, explain why the full formula (norms and arccosine) would be necessary in that case, contrasting with the efficient shortcut used in part (a)."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | FULL-ANGLE-FORMULA-USED-UNNECESSARILY-FOR-PERPENDICULARITY-CHECK | Computing the full angle formula (norms and arccosine) when only checking perpendicularity, rather than using the more efficient dot-product-alone test | Moderate |
| MC-2 | OUT-OF-RANGE-RATIO-NOT-RECOGNIZED-AS-ERROR-SIGNAL | Not recognizing that a computed $\frac{a\cdot b}{|a||b|}$ value outside $[-1,1]$ indicates an upstream computational error, since Cauchy-Schwarz guarantees this can never genuinely happen | Foundational |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Full Angle Formula Used Unnecessarily for Perpendicularity Check") → P41 (detect: present Example 2 and check whether norms/arccosine are computed unnecessarily) → P64 (conceptual shift: re-state the efficient shortcut explicitly — "$a\cdot b=0$ is both necessary AND sufficient for perpendicularity" — no further computation needed).
- **B02 (targets MC-2)**: P27 ("Out-of-Range Ratio Not Recognized as Error Signal") → P41 (detect: present a hypothetical out-of-range computed ratio and ask what it means) → P64 (conceptual shift: re-state the Cauchy-Schwarz guarantee explicitly, then re-check the dot product and norm computations for the actual arithmetic error).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.linalg.dot-product`, `math.linalg.norm`.
- **Unlocks**: none recorded in the KG.
- **Related**: `math.linalg.distance` (another norm-based geometric quantity, computed via a similarly direct formula).

## Component 8 — Teaching Notes

- estimated_hours = 1 reflects that this is a direct, single-formula application with a valuable efficiency shortcut (LO2) for the common perpendicularity special case.
- MC-2 was ranked most severe because it reflects a missed opportunity for genuine error-checking — recognizing an impossible computed value as diagnostic feedback is a broadly valuable mathematical habit, not just specific to this concept.
- The robotics transfer probe was deliberately designed with part (b) requiring the student to articulate WHEN the full formula genuinely IS needed (non-perpendicular cases), ensuring the efficiency shortcut (MC-1's correction) isn't over-generalized into "never compute the full formula."

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.linalg.dot-product`, `math.linalg.norm`) |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
| V-5 | cross_links checked against disk | PASS (none declared) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (2 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.90×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
