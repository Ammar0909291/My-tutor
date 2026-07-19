# Teaching Blueprint: Injective (One-to-One) Function (`math.func.injectivity`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.func.injectivity` |
| name | Injective (One-to-One) Function |
| domain | Functions |
| difficulty | proficient |
| bloom | understand |
| mastery_threshold | 0.8 → MAMR = ⌈0.8×5⌉ = 4/5 |
| estimated_hours | 3 |
| requires | `math.func.function-concept` |
| unlocks | `math.func.inverse-functions` |
| cross_links | none |
| CPA_entry_stage | C (Concrete) — proving one specific function injective and finding a genuine counterexample pair for another, before the general "for all" definition is stated abstractly |
| description (KG) | f is injective if f(a) = f(b) implies a = b; different inputs give different outputs; passes the horizontal line test. |

## Component 1 — Learning Objectives

- LO1: Define **injective** (one-to-one): $f(a)=f(b) \Rightarrow a=b$ for ALL $a,b$ in the domain — equivalently, different inputs always give different outputs — and prove injectivity for a specific function using a GENERAL algebraic argument valid for arbitrary $a,b$, not by checking a handful of sample pairs.
- LO2: Correctly distinguish injectivity's defining direction, $f(a)=f(b)\Rightarrow a=b$, from the trivially-true direction every function already satisfies, $a=b\Rightarrow f(a)=f(b)$ (guaranteed automatically by `math.func.function-concept`'s own "exactly one output per input" requirement) — recognizing injectivity is specifically about the CONVERSE, which is not automatic.
- LO3: Apply the **horizontal line test** (the direct graphical analog of `math.func.function-concept`'s vertical line test) — a graph represents an injective function iff every horizontal line intersects it AT MOST once — and recognize that a SINGLE horizontal line crossing the graph twice disqualifies the whole function from being injective, regardless of how many other horizontal lines cross only once.

## Component 2 — Prerequisite Check

Assumes mastery of `math.func.function-concept` (a function assigns EXACTLY one output to each input; the vertical line test; the distinction between "many-to-one" (allowed) and a function violation; domain, codomain, range).

## Component 3 — Core Explanation

**Injectivity: a "for all" claim about different inputs, proven generally**: a function $f$ is **injective** (or one-to-one) if $f(a)=f(b) \Rightarrow a=b$ for ALL $a,b$ in the domain — equivalently, whenever $a\ne b$, $f(a)\ne f(b)$: different inputs never collide onto the same output. Proving this requires a GENERAL argument that works for arbitrary $a$ and $b$ (typically: assume $f(a)=f(b)$ symbolically, and algebraically derive $a=b$) — checking that a few specific sample pairs of different inputs happen to give different outputs is not a proof, since injectivity claims this holds for EVERY pair, not just the ones checked.

**The direction that matters — and the one that's automatic**: every function, by `math.func.function-concept`'s own definition (exactly one output per input), ALREADY guarantees $a=b\Rightarrow f(a)=f(b)$ trivially — if you plug in the identical input twice, you obviously get the identical output twice; this is just well-definedness, true of every function without exception. Injectivity is specifically about the OPPOSITE direction: $f(a)=f(b)\Rightarrow a=b$. This direction is NOT automatic — many perfectly good functions (allowed to be "many-to-one" per `math.func.function-concept`'s own vocabulary) have DIFFERENT inputs sharing the SAME output, which is exactly what injectivity rules out.

**The horizontal line test — one failure is enough**: exactly as `math.func.function-concept`'s vertical line test checks "is this a function at all" (does any vertical line cross the graph more than once, meaning one input has two outputs), the **horizontal line test** checks injectivity: does any horizontal line cross the graph more than once, meaning two different inputs ($x$-values) share the same output ($y$-value)? A function is injective exactly when EVERY horizontal line crosses its graph AT MOST once. Just as with the universal "for all" claim in LO1, a SINGLE horizontal line crossing twice is enough to disqualify the entire function from being injective — no averaging or "mostly passes" credit is available.

## Component 4 — Worked Examples

**Example 1 (LO1 — a general algebraic proof of injectivity)**: For $f(x)=3x+2$ on $\mathbb{R}$: suppose $f(a)=f(b)$ for arbitrary $a,b$. Then $3a+2=3b+2 \Rightarrow 3a=3b \Rightarrow a=b$. Since this argument used only ARBITRARY symbols $a,b$ (not specific numbers), it holds for every possible pair — $f$ is injective.

**Example 2 (LO1/LO2 — a genuine counterexample disproves injectivity, breaking MC-1 and MC-2)**: For $g(x)=x^2$ on $\mathbb{R}$: check $g(2)=4$ and $g(-2)=4$ — TWO DIFFERENT inputs ($2\ne-2$) giving the SAME output ($4$) — a genuine counterexample to $g(a)=g(b)\Rightarrow a=b$. So $g$ is **NOT** injective, even though the trivial direction still holds ($2=2\Rightarrow g(2)=g(2)$, always true and irrelevant here) — sampling a DIFFERENT pair, like $g(1)=1$ and $g(2)=4$ (different outputs), would not have revealed this failure; only checking whether SOME pair of different inputs shares an output (or proving none does) settles the question.

**Example 3 (LO3 — the horizontal line test, one failure disqualifies everything, breaking MC-3)**: For $f(x)=3x+2$ (Example 1): any horizontal line $y=k$ meets the graph where $3x+2=k$, giving the UNIQUE solution $x=(k-2)/3$ — exactly one intersection, for every single $k$. The line passes the horizontal line test everywhere, matching the algebraic proof. For $g(x)=x^2$ (Example 2): the horizontal line $y=4$ crosses the parabola at BOTH $x=2$ and $x=-2$ — two intersection points. Even though OTHER horizontal lines behave differently for $g$ (e.g. $y=-1$ crosses zero times, $y=0$ crosses exactly once at $x=0$), this ONE failing line, $y=4$, is entirely sufficient to disqualify $g$ from being injective — there is no partial credit for "most horizontal lines only cross once."

## Component 5 — Teaching Actions

### Teaching Action A01 — Proving Injectivity Generally, Not by Sampling (Primitive P11: Representation Shift)

State: "injectivity is a claim about EVERY pair of inputs — proving it means starting from arbitrary symbols $a,b$ and showing $f(a)=f(b)$ forces $a=b$ algebraically, not checking a few numbers and hoping the pattern holds." Work Example 1's full general proof.

- **MC-1 hook**: ask "if I check three or four different pairs of inputs and each pair gives different outputs, have I proven the function is injective?" — a "yes" answer reveals MC-1 (treating sampling as sufficient for a universal claim).

### Teaching Action A02 — The Direction That Matters (Primitive P28: Conflict Evidence)

Present Example 2's direct counterexample: $g(2)=g(-2)=4$ with $2\ne-2$, disproving injectivity outright — while the trivial direction ($2=2\Rightarrow g(2)=g(2)$) remains true and utterly beside the point. State: "every function already guarantees the SAME input gives the SAME output — that's not injectivity, that's just what a function IS. Injectivity is specifically about whether DIFFERENT inputs can share an output, and here they genuinely can."

- **MC-2 hook**: ask "is 'if $a=b$ then $f(a)=f(b)$' the same statement as injectivity?" — a "yes" answer reveals MC-2 (confusing the trivially-automatic direction with injectivity's actual, non-automatic defining direction).

### Teaching Action A03 — One Failing Horizontal Line Is Enough (Primitive P06: Contrast Pair)

Contrast Example 3's line (every horizontal line crosses exactly once) against the parabola (the single line $y=4$ crosses twice, despite other lines crossing zero or one times). State: "the horizontal line test isn't about most lines behaving well — a single line crossing twice is a complete, permanent disqualification, exactly parallel to how a single counterexample pair disproves the algebraic definition."

- **MC-3 hook**: ask "if only one horizontal line crosses a graph twice, but every other horizontal line crosses at most once, is the function still injective?" — a "yes" answer reveals MC-3 (treating injectivity as a matter of degree rather than an all-or-nothing property).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Prove $f(x)=5x-1$ is injective on $\mathbb{R}$ using a general algebraic argument.
  2. Determine whether $g(x)=x^2-4$ is injective on $\mathbb{R}$ by finding a counterexample pair or proving none exists.
  3. Sketch (or describe) the horizontal line test result for $f(x)=5x-1$ and for $g(x)=x^2-4$, stating how many intersection points a typical horizontal line has for each.
  4. Explain why "$a=b$ implies $f(a)=f(b)$" being true for a function does NOT, by itself, tell you anything about whether that function is injective.
- **P76 (Transfer Probe, mode = independence)**: "A company assigns each employee a unique employee ID number using the rule $f(\text{hire order number})=2\times(\text{hire order number})+1000$ (so the 1st hire gets ID 1002, the 2nd gets ID 1004, etc.). (a) Prove, using a general algebraic argument, that this ID-assignment function is injective — i.e., that no two different employees could ever receive the same ID. (b) Explain why this injectivity property is exactly what makes the ID numbers useful for uniquely identifying employees, referencing what would go wrong if the function were NOT injective. (c) A different company uses the rule $h(\text{hire order number}) = (\text{hire order number})^2 \bmod 1000$ (remainder after dividing by 1000). Explain, using this lesson's counterexample-based reasoning (not necessarily a full proof), why this rule is at serious risk of NOT being injective, and what it would mean in practice if it failed to be."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | INJECTIVITY-CONFIRMED-BY-SAMPLING | Believing injectivity can be confirmed by checking a handful of sample input pairs and observing different outputs, missing that it is a universal "for all" claim requiring a general proof | Foundational |
| MC-2 | INJECTIVITY-DIRECTION-CONFUSED-WITH-AUTOMATIC-WELL-DEFINEDNESS | Confusing injectivity's defining direction (f(a)=f(b)⟹a=b) with the trivially-automatic direction every function already satisfies (a=b⟹f(a)=f(b)) | Foundational |
| MC-3 | HORIZONTAL-LINE-TEST-TREATED-AS-DEGREE-OF-INJECTIVITY | Believing a function can still be "mostly injective" if only one horizontal line crosses its graph twice while most others cross at most once | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Injectivity Confirmed by Sampling") → P41 (detect: ask a student to justify a function's injectivity and check whether they cite a few checked pairs rather than a general argument) → P64 (conceptual shift: re-walk Example 1's arbitrary-$a,b$ proof alongside Example 2's counterexample (which sampling different pairs might have missed entirely), re-anchoring on "injectivity needs a general proof or a genuine counterexample — never a sample").
- **B02 (targets MC-2)**: P27 (name it: "Injectivity Direction Confused with Automatic Well-Definedness") → P41 (detect: ask a student whether "$a=b\Rightarrow f(a)=f(b)$" being true proves injectivity, and check for a "yes") → P64 (conceptual shift: re-walk Example 2, contrasting the trivial direction (always true, irrelevant) with the failed converse direction (genuinely false here), re-anchoring on "injectivity is specifically about whether DIFFERENT inputs can collide — the other direction is automatic for every function and proves nothing").
- **B03 (targets MC-3)**: P27 (name it: "Horizontal Line Test Treated as Degree of Injectivity") → P41 (detect: ask a student whether one failing horizontal line still allows a function to be "mostly injective," and check for a "yes") → P64 (conceptual shift: re-walk Example 3's parabola, where $y=4$'s double-crossing alone disqualifies the whole function despite other lines behaving well, re-anchoring on "one failure is total — exactly like one counterexample pair disproving the algebraic claim").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.func.function-concept` (the vertical line test this concept's horizontal line test directly parallels, the "many-to-one is allowed" vocabulary this concept specifically rules out, and the "exactly one output per input" guarantee underlying LO2's automatic direction).
- **Unlocks**: `math.func.inverse-functions` (a function has a genuine inverse function exactly when it is injective — this concept's property is the precise gatekeeping condition that concept will build on).
- **Cross-link**: KG lists no cross-links for this concept.

## Component 8 — Teaching Notes

- estimated_hours = 3 with a proficient/understand tag places this at a "3 TAs + gate" tier, appropriately compact given the concept's genuinely small scope: one definition, one direction-confusion clarification, and one graphical test — no deep computation required beyond the algebraic proofs and counterexamples themselves.
- Examples 1 and 2 were deliberately built as a matched pair (a genuinely injective linear function vs. a genuinely non-injective quadratic) reused again in Example 3 for the horizontal line test, so the same two functions carry the algebraic proof (LO1), the direction-confusion clarification (LO2), and the graphical test (LO3) consistently throughout, rather than introducing fresh functions for each objective.
- This concept explicitly reuses `math.func.function-concept`'s own "many-to-one" vocabulary term (already introduced there but not built into a full theory) as the direct negation of injectivity — Component 3 states this connection explicitly rather than treating injectivity as an unrelated new idea.

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
| V-15 | CPA_entry_stage justified | PASS (Concrete: specific proof and counterexample before the general definition) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO1/LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
