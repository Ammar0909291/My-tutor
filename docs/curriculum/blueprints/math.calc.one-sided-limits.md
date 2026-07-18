# Teaching Blueprint: One-Sided Limits (`math.calc.one-sided-limits`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.calc.one-sided-limits` |
| name | One-Sided Limits |
| domain | Calculus |
| difficulty | advanced |
| bloom | apply |
| mastery_threshold | 0.8 → MAMR = ⌈0.8×5⌉ = 4/5 |
| estimated_hours | 4 |
| requires | `math.calc.limits` |
| unlocks | `math.calc.continuity` |
| cross_links | none |
| CPA_entry_stage | P (Pictorial) — graph-approach-from-one-side visuals before the ε-δ-style formal statement |
| description (KG) | The right-hand limit lim_{x→a⁺} f(x) and left-hand limit lim_{x→a⁻} f(x); the two-sided limit exists iff both one-sided limits exist and are equal. |

## Component 1 — Learning Objectives

- LO1: Evaluate the right-hand limit $\lim_{x\to a^+} f(x)$ and left-hand limit $\lim_{x\to a^-} f(x)$ from a graph or piecewise formula, correctly restricting attention to values of $x$ approaching $a$ from only one side.
- LO2: Apply the equivalence theorem — the two-sided limit $\lim_{x\to a} f(x)$ exists and equals $L$ if and only if both one-sided limits exist and both equal $L$ — to determine whether a two-sided limit exists at a point, especially for piecewise-defined functions.
- LO3: Identify functions/points where the two-sided limit fails to exist specifically because the one-sided limits disagree (a jump discontinuity), distinguishing this from other reasons a limit might fail to exist.

## Component 2 — Prerequisite Check

Assumes mastery of `math.calc.limits` (the general two-sided limit concept, the "arbitrarily close" informal meaning, ε-δ awareness). This concept refines that idea by restricting the approach direction.

## Component 3 — Core Explanation

The **right-hand limit** $\lim_{x\to a^+} f(x) = L$ means $f(x)$ gets arbitrarily close to $L$ as $x$ approaches $a$ **only through values greater than** $a$ (approaching from the right). The **left-hand limit** $\lim_{x\to a^-} f(x) = M$ is the mirror notion: $x$ approaches $a$ only through values less than $a$ (from the left).

**The equivalence theorem**:
$$\lim_{x\to a} f(x) = L \iff \lim_{x\to a^+} f(x) = L \text{ and } \lim_{x\to a^-} f(x) = L$$
The (two-sided) limit exists **if and only if** both one-sided limits exist *and agree* on the same value $L$. This gives a practical test: compute both one-sided limits; if they match, that common value is the two-sided limit; if they disagree (or either fails to exist), the two-sided limit **does not exist**.

This is exactly the situation at a **jump discontinuity**: a piecewise function whose pieces approach different heights from the left and right of a breakpoint has a left-hand limit and a right-hand limit that both exist individually, but disagree — so the two-sided limit fails to exist at that point, even though neither one-sided limit itself is problematic.

## Component 4 — Worked Examples

**Example 1 (LO1 — reading one-sided limits from a piecewise function)**: 
$$f(x) = \begin{cases} x+1 & x < 2 \\ x^2 - 1 & x \geq 2 \end{cases}$$
$\lim_{x\to 2^-} f(x)$: use the $x<2$ piece, $x+1 \to 2+1 = 3$.
$\lim_{x\to 2^+} f(x)$: use the $x\geq 2$ piece, $x^2-1 \to 4-1 = 3$.

**Example 2 (LO2 — applying the equivalence theorem, limit exists)**: From Example 1, both one-sided limits equal 3, so by the equivalence theorem $\lim_{x\to 2} f(x) = 3$ exists (even though the two formulas defining $f$ near $x=2$ look completely different).

**Example 3 (LO2/LO3 — equivalence theorem, limit fails to exist)**: 
$$g(x) = \begin{cases} 2x & x < 1 \\ x + 4 & x \geq 1 \end{cases}$$
$\lim_{x\to 1^-} g(x) = 2(1) = 2$. $\lim_{x\to 1^+} g(x) = 1+4 = 5$. Since $2 \neq 5$, the one-sided limits disagree, so $\lim_{x\to 1} g(x)$ **does not exist** — this is a jump discontinuity at $x=1$.

## Component 5 — Teaching Actions

### Teaching Action A01 — Reading One-Sided Limits from Graphs and Piecewise Formulas (Primitive P11: Representation Shift)

Draw a piecewise graph with a visible jump (like Example 3's $g$). Trace a finger along the curve approaching $x=1$ strictly from the left: "Follow only this side — where does the curve seem to be heading? That height is the left-hand limit, $\lim_{x\to 1^-}g(x)$." Repeat approaching from the right only. Shift to the formal notation: $\lim_{x\to a^-}$ (left, values less than $a$) versus $\lim_{x\to a^+}$ (right, values greater than $a$) — anchor the superscript minus/plus to "coming from the left/below" and "coming from the right/above" respectively.

Then shift representation again to the piecewise-formula case (Example 1): "reading" the correct one-sided limit means plugging $a$ into whichever *piece* of the definition actually applies on that side of $a$ — not the other piece.

- **MC-1 hook**: ask students to compute $\lim_{x\to 2^-}f(x)$ for Example 1's $f$ but hand them the $x\geq 2$ piece by mistake in a follow-up drill — a wrong answer using the wrong piece reveals MC-1 (using the formula piece that includes $a$ itself, rather than the piece valid on the *approaching* side).

### Teaching Action A02 — The Equivalence Theorem: Agreement vs. Disagreement (Primitive P06: Contrast Pair)

**Contrast 1 (limit exists)**: Revisit Example 1/2 — both one-sided limits equal 3 → two-sided limit exists and equals 3. State the theorem formally.

**Contrast 2 (limit fails to exist, targets MC-2)**: Revisit Example 3's $g$ — left-hand limit 2, right-hand limit 5, disagree → two-sided limit does not exist. Explicitly contrast this against the wrong instinct "just average the two one-sided limits, or pick one" (MC-2: believing a two-sided limit exists whenever both one-sided limits individually exist, even if they disagree). State clearly: "existence of *each* one-sided limit is necessary but not sufficient — they must also **agree**."

Follow with a graphical vocabulary connection: "this kind of disagreement, visible as a visible break/step in the graph, is called a **jump discontinuity** — you'll define discontinuity formally in the next concept, but this is the specific failure mode where the problem is disagreement, not non-existence, of the one-sided pieces."

### Teaching Action A03 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Given $h(x) = \begin{cases} 3x-1 & x<0 \\ x^2+2 & x\geq 0\end{cases}$, find $\lim_{x\to 0^-}h(x)$ and $\lim_{x\to 0^+}h(x)$. Does $\lim_{x\to 0}h(x)$ exist?
  2. Given a graph (described: a curve approaching height 5 from the left of $x=3$ and height 5 from the right of $x=3$, but with an open circle at height 5 and a filled dot at height 7 exactly at $x=3$), state $\lim_{x\to 3}h(x)$. [Tests that the *value at* $a$ is irrelevant to the limit — only the approach matters.]
  3. Given $k(x) = \begin{cases} x^2 & x<-1 \\ -2x-1 & x\geq -1\end{cases}$, determine whether $\lim_{x\to -1}k(x)$ exists, and if so, its value.
  4. Explain, using the equivalence theorem, why a function can fail to have a two-sided limit at a point even though it is perfectly well-defined (no gaps, no holes) on both sides of that point.
- **P76 (Transfer Probe, mode = independence)**: "A shipping company's cost-per-package function charges differently below and at-or-above a 5kg threshold: for $w<5$kg the cost is $2w+3$; for $w\geq 5$kg the cost is $1.5w+5.5$. Using one-sided limits, determine whether the cost function has a single well-defined 'limiting cost' as weight approaches 5kg from both directions, or whether customers would experience a sudden jump in the *rate* structure right at the threshold. Show both one-sided limits explicitly."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | WRONG-PIECE-SELECTED | Evaluating a one-sided limit using the piecewise-formula branch that includes the point $a$ itself, rather than the branch valid strictly on the approaching side | Moderate |
| MC-2 | ONE-SIDED-EXISTENCE-IMPLIES-TWO-SIDED | Believing the two-sided limit exists merely because both one-sided limits individually exist, without checking that they agree | Foundational |
| MC-3 | FUNCTION-VALUE-CONFUSED-WITH-LIMIT | Believing the limit at $a$ must equal $f(a)$ (the actual function value), rather than recognizing the limit depends only on nearby behavior, not the value (or absence of a value) at $a$ itself | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Wrong-Piece Selection") → P41 (detect: give a piecewise function and ask for a one-sided limit at the breakpoint — an answer using the wrong branch reveals MC-1) → P64 (conceptual shift: "the direction of approach determines which formula applies — never the formula that happens to include $a$ itself").
- **B02 (targets MC-2)**: P27 (name it: "Existence Without Agreement") → P41 (detect: present a case where both one-sided limits exist but disagree, and ask if the two-sided limit exists — an incorrect "yes" reveals MC-2) → P64 (conceptual shift: re-derive from the theorem's "if and only if... AND equal" wording — agreement is a separate, required condition, not automatic).
- **B03 (targets MC-3)**: P27 (name it: "Limit-Value Conflation") → P41 (detect: give a graph with an open circle at the limit height and a separately plotted point elsewhere directly above/below $a$, and ask for the limit — an answer matching the plotted point rather than the approach height reveals MC-3) → P64 (conceptual shift: re-anchor on "the limit describes where the function is *heading*, completely independent of whether it arrives there, or where it's separately defined to sit").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.calc.limits` (the general two-sided limit definition and informal "arbitrarily close" meaning that this concept refines by direction).
- **Unlocks**: `math.calc.continuity` (continuity at a point is defined using exactly this one-sided-limit machinery: $\lim_{x\to a^-}f(x) = \lim_{x\to a^+}f(x) = f(a)$).
- **Cross-link**: KG lists no cross-links for this concept.

## Component 8 — Teaching Notes

- estimated_hours = 4 with an advanced/apply tag places this at the "2 main TAs + gate" compact end of the sizing heuristic — A01 (reading one-sided limits) and A02 (the equivalence theorem contrast) fully cover the three LOs without needing a third main TA, since the concept is narrow (a direction-restriction refinement of an already-taught idea) rather than introducing substantial new machinery.
- CPA_entry_stage is marked Pictorial (P) rather than Concrete, reflecting that `math.calc.limits` (the prerequisite) already did the deepest concrete/intuitive grounding of what a limit means — this concept's genuinely new content (directional restriction, the equivalence theorem) is best introduced graphically before the formal notation, but does not need to restart from physical/concrete models.
- P77 problem 2 (the open-circle/filled-dot graph description) was deliberately included to directly test MC-3 within the assessment itself, not just within the teaching action — since confusing the limit with the function's actual defined value at a point is a classically persistent error that resists correction from explanation alone and benefits from graded retrieval practice.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.calc.limits`) |
| V-4 | unlocks concepts named accurately from KG | PASS |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (empty in KG → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A03) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.8×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Pictorial, justified in Teaching Notes) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO2/LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
