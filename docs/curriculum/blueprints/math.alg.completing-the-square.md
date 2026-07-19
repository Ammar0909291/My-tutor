# Teaching Blueprint: Completing the Square (`math.alg.completing-the-square`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.alg.completing-the-square` |
| name | Completing the Square |
| domain | Algebra |
| difficulty | proficient |
| bloom | apply |
| mastery_threshold | 0.8 → MAMR = ⌈0.8×5⌉ = 4/5 |
| estimated_hours | 5 |
| requires | `math.alg.quadratic-equation` |
| unlocks | `math.alg.quadratic-formula` |
| cross_links | none |
| CPA_entry_stage | P (Pictorial) — a geometric square-completion diagram (literally arranging area pieces into a square) before the algebraic procedure |
| description (KG) | Rewriting ax² + bx + c by adding and subtracting (b/2a)² to form a perfect square trinomial; yields vertex form and derives the quadratic formula. |

## Component 1 — Learning Objectives

- LO1: Apply the **general completing-the-square procedure** to rewrite ANY quadratic $ax^2+bx+c$ (including the non-monic case $a\ne1$, which requires factoring $a$ out first) into **vertex form** $a(x-h)^2+k$ — a genuine generalization of `math.alg.quadratic-equation`'s own brief, monic-only use of this technique as a derivation intermediate.
- LO2: Read the **vertex** $(h,k)$ directly off the vertex form, and determine whether it is a MAXIMUM or MINIMUM of the quadratic based on the sign of $a$ — applying completing the square to a genuinely new purpose (graphing/optimization) distinct from `math.alg.quadratic-equation`'s root-finding focus.
- LO3: Re-derive the **quadratic formula** from the general (non-monic) completing-the-square procedure, rigorously handling the $a\ne1$ case in full — directly refuting the misconception that completing the square is a technique reserved for equations already in the simple monic form, when the general procedure (factor out $a$ first) handles any quadratic.

## Component 2 — Prerequisite Check

Assumes mastery of `math.alg.quadratic-equation` (the general quadratic $ax^2+bx+c=0$, the three solution methods including a brief, monic-focused encounter with completing the square as a step toward deriving the quadratic formula, and the discriminant).

## Component 3 — Core Explanation

**Explicit division of labor with `math.alg.quadratic-equation`**: that prerequisite concept already briefly uses completing the square as an intermediate derivation step (its own Teaching Notes describe it as "completing the square as derivation of the formula," in a monic or lightly-treated context). This concept's distinct job is to teach the FULL general procedure — including the genuinely trickier non-monic case ($a\ne1$) — and, critically, its OTHER major application: converting to vertex form for graphing and optimization, a use that concept never addresses (its own focus is exclusively root-finding via the discriminant).

**The general procedure, including the non-monic case**: to complete the square on $ax^2+bx+c$ (for ANY $a\ne0$, not just $a=1$): first factor $a$ out of the first two terms: $a\left(x^2+\frac{b}{a}x\right)+c$. Inside the parentheses, add and subtract $\left(\frac{b}{2a}\right)^2$ (half the coefficient of $x$, squared): $a\left(x^2+\frac{b}{a}x+\left(\frac{b}{2a}\right)^2-\left(\frac{b}{2a}\right)^2\right)+c$. The first three terms inside the parentheses form a perfect square: $a\left(\left(x+\frac{b}{2a}\right)^2-\left(\frac{b}{2a}\right)^2\right)+c$. Distributing the outer $a$: $a\left(x+\frac{b}{2a}\right)^2 - a\left(\frac{b}{2a}\right)^2+c$ — this is **vertex form**, $a(x-h)^2+k$, with $h=-\frac{b}{2a}$ and $k=c-\frac{b^2}{4a}$.

**Reading the vertex directly, for graphing and optimization**: once in vertex form $a(x-h)^2+k$, the point $(h,k)$ is IMMEDIATELY the parabola's vertex — no further computation needed. If $a>0$, the parabola opens upward and $(h,k)$ is the MINIMUM point; if $a<0$, it opens downward and $(h,k)$ is the MAXIMUM. This is a genuinely different use of completing the square than solving for roots — it answers "where is the extreme point, and is it a max or min?" rather than "where does the graph cross the x-axis?"

**Deriving the quadratic formula, rigorously for the general case**: setting $ax^2+bx+c=0$ and applying the same procedure: $a\left(x+\frac{b}{2a}\right)^2 = \frac{b^2}{4a}-c = \frac{b^2-4ac}{4a}$. Dividing by $a$: $\left(x+\frac{b}{2a}\right)^2 = \frac{b^2-4ac}{4a^2}$. Taking the square root of both sides (introducing $\pm$): $x+\frac{b}{2a} = \pm\frac{\sqrt{b^2-4ac}}{2a}$ (using $\sqrt{4a^2}=2|a|$, and absorbing the sign ambiguity into the $\pm$). Solving for $x$: $x = \frac{-b\pm\sqrt{b^2-4ac}}{2a}$ — the quadratic formula, derived in full generality with $a$ explicitly present throughout, not merely sketched for a monic special case.

## Component 4 — Worked Examples

**Example 1 (LO1 — the non-monic case, factoring out a first)**: Complete the square on $2x^2+12x+7$. Factor out $a=2$ from the first two terms: $2(x^2+6x)+7$. Add and subtract $(6/2)^2=9$ inside: $2(x^2+6x+9-9)+7 = 2((x+3)^2-9)+7$. Distribute: $2(x+3)^2-18+7 = 2(x+3)^2-11$ — vertex form, with $h=-3$, $k=-11$, matching $a(x-h)^2+k$ with $a=2$.

**Example 2 (LO2 — reading the vertex for optimization, a use distinct from root-finding)**: Continuing Example 1, $2(x+3)^2-11$ has vertex $(-3,-11)$. Since $a=2>0$, the parabola opens upward, so $(-3,-11)$ is the MINIMUM point — the function $2x^2+12x+7$ never goes below $-11$, achieved exactly at $x=-3$. This answers a genuinely different question than "what are the roots?" (which `math.alg.quadratic-equation` already covers) — it's asking "what's the smallest value this function ever takes, and where?"

**Example 3 (LO3 — the full general quadratic-formula derivation, breaking MC-1)**: A student who only saw completing the square applied to MONIC quadratics (as in `math.alg.quadratic-equation`'s own brief treatment) might assume the technique doesn't generalize cleanly. Derive the quadratic formula for $3x^2-5x+1=0$ using the FULL non-monic procedure: factor out $3$: $3(x^2-\frac53x)+1=0$. Complete the square: $3\left(x^2-\frac53x+\frac{25}{36}-\frac{25}{36}\right)+1=0 \Rightarrow 3\left(\left(x-\frac56\right)^2-\frac{25}{36}\right)+1=0$. Distribute: $3\left(x-\frac56\right)^2 - \frac{25}{12}+1=0 \Rightarrow 3\left(x-\frac56\right)^2 = \frac{13}{12}$. Solving: $\left(x-\frac56\right)^2=\frac{13}{36}$, so $x=\frac56\pm\frac{\sqrt{13}}{6} = \frac{5\pm\sqrt{13}}{6}$ — matching EXACTLY what the quadratic formula $x=\frac{-b\pm\sqrt{b^2-4ac}}{2a}$ gives directly ($b^2-4ac=25-12=13$, $2a=6$): $x=\frac{5\pm\sqrt{13}}{6}$ — confirming the general (non-monic) procedure works completely, with no special-casing needed for $a\ne1$.

## Component 5 — Teaching Actions

### Teaching Action A01 — Factoring Out a First, Then Completing the Square (Primitive P11: Representation Shift)

State: "for a non-monic quadratic, the ONE extra step is factoring $a$ out of the first two terms before doing anything else — everything after that is the same square-completion process." Work Example 1's full derivation, explicitly narrating the factor-out step.

### Teaching Action A02 — Vertex Form for Optimization, a New Use (Primitive P06: Contrast Pair)

Present Example 2's vertex-reading directly, contrasting explicitly with `math.alg.quadratic-equation`'s root-finding focus. State: "this answers a DIFFERENT question than finding roots — it directly tells you the extreme point (max or min) and its value, with zero further work once you're in vertex form."

### Teaching Action A03 — The Full Non-Monic Derivation of the Quadratic Formula (Primitive P28: Conflict Evidence)

Present Example 3's full derivation, then verify it matches the quadratic formula's direct computation exactly. State: "this confirms the general procedure — factor out $a$, complete the square, solve — works for ANY quadratic, not just the simple monic case you may have seen it applied to before."

- **MC-1 hook**: ask "does completing the square only work cleanly when the leading coefficient is 1?" — a "yes" answer reveals MC-1 (believing the technique is restricted to monic quadratics, missing that factoring out $a$ first extends it fully to the general case).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Complete the square on $3x^2-6x+5$, expressing the result in vertex form.
  2. Using your result from problem 1, state the vertex and whether it is a maximum or minimum.
  3. Complete the square on $-2x^2+8x-3$ (note the negative leading coefficient), and determine the vertex and whether it's a max or min.
  4. Derive the quadratic formula from $ax^2+bx+c=0$ using the general (non-monic) completing-the-square procedure, showing every algebraic step.
- **P76 (Transfer Probe, mode = independence)**: "A physicist models the height of a projectile as $h(t) = -5t^2+20t+2$ (in meters, $t$ in seconds), and needs to find the MAXIMUM height the projectile reaches, and at what time. (a) Complete the square on $h(t)$ to convert it to vertex form. (b) Read off the maximum height and the time it occurs directly from the vertex form, explaining why the negative leading coefficient confirms this is a maximum rather than a minimum. (c) Explain why this optimization question (maximum height) is fundamentally different from asking 'when does the projectile hit the ground' (which would instead require finding the ROOTS of $h(t)=0$, e.g. via the quadratic formula) — even though both questions are about the same function."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | COMPLETING-THE-SQUARE-ASSUMED-MONIC-ONLY | Believing completing the square only works cleanly for monic quadratics ($a=1$), missing that factoring $a$ out first extends the procedure fully to the general case | Foundational |
| MC-2 | VERTEX-SIGN-OF-A-MAX-MIN-DETERMINATION-REVERSED | Reversing which sign of $a$ corresponds to a maximum versus a minimum vertex | Foundational |
| MC-3 | SQUARE-COMPLETION-TERM-B-OVER-2A-SQUARED-COMPUTED-INCORRECTLY | Computing $(b/2a)^2$ incorrectly (e.g. forgetting to divide by $a$ as well as $2$, or arithmetic errors in the squaring), producing an incorrect vertex form | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Completing-the-Square-Monic-Only Assumption") → P41 (detect: give a non-monic quadratic and ask a student to complete the square, checking whether they attempt the procedure without first factoring out $a$) → P64 (conceptual shift: re-walk Example 1's explicit factor-out-$a$ step, re-anchoring on "the ONE extra step for a non-monic quadratic is factoring $a$ out first — everything else is identical to the monic case").
- **B02 (targets MC-2)**: P27 (name it: "Max-Min Sign Determination Reversed") → P41 (detect: give a vertex-form expression with a specific sign of $a$ and ask whether the vertex is a max or min, checking for a reversed answer) → P64 (conceptual shift: re-anchor on "positive $a$ means the parabola opens UPWARD, like a cup — that shape's lowest point is a MINIMUM; negative $a$ opens downward, like a cap, giving a MAXIMUM").
- **B03 (targets MC-3)**: P27 (name it: "b-over-2a-Squared Computation Error") → P41 (detect: ask a student to compute $(b/2a)^2$ for a specific non-monic quadratic and check for an arithmetic or setup error) → P64 (conceptual shift: re-walk Example 1 or 3's explicit computation of this term step by step, re-anchoring on "divide $b$ by $2a$ FIRST, then square the result — not the other way around").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.alg.quadratic-equation` (the general quadratic $ax^2+bx+c=0$ and its own brief, monic-focused introduction of completing the square as a derivation step, which this concept extends into the full general procedure and a new application).
- **Unlocks**: `math.alg.quadratic-formula` (the formula this concept's Example 3 fully derives, in general non-monic form).
- **Cross-link**: KG lists no cross-links for this concept.

## Component 8 — Teaching Notes

- estimated_hours = 5 with a proficient/apply tag places this at a "3 TAs + gate" tier — A01 (the general non-monic procedure), A02 (vertex form for optimization, a new use), and A03 (the full quadratic-formula derivation) each target a distinct LO, appropriate for a concept extending an already-briefly-seen technique into its full generality and a genuinely new application.
- **Explicit division of labor with `math.alg.quadratic-equation`** (stated directly in Component 3): that concept already briefly uses completing the square as a derivation intermediate (likely in a monic or lightly-generalized context, per its own Teaching Notes description); this concept's distinct contributions are (1) the FULL non-monic procedure worked in complete rigor, and (2) vertex form's OPTIMIZATION application (finding max/min), which that concept's exclusively root-finding focus never addresses.
- Example 2's optimization framing (vertex as max/min, not roots) was deliberately given its own dedicated Teaching Action and worked example, rather than treated as a passing remark, specifically because it represents the single clearest differentiator between this concept's scope and `math.alg.quadratic-equation`'s scope — a student who only sees completing the square as "a way to derive the quadratic formula" misses its independent, equally important graphing/optimization use.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (empty in KG → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.8×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Pictorial: geometric square-completion diagram before the algebraic procedure) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
