# Teaching Blueprint: Inverse Functions (`math.func.inverse-functions`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.func.inverse-functions` |
| name | Inverse Functions |
| domain | Functions |
| difficulty | proficient |
| bloom | apply |
| mastery_threshold | 0.8 → MAMR = ⌈0.8×5⌉ = 4/5 |
| estimated_hours | 6 |
| requires | `math.func.bijection` |
| unlocks | `math.trig.inverse-trig`, `math.alg.logarithm` |
| cross_links | `math.trig.inverse-trig` |
| CPA_entry_stage | C (Concrete) — algebraically constructing and generally verifying one specific function's inverse, before the abstract two-identity definition | 
| description (KG) | The inverse f⁻¹ of a bijective function f satisfies f⁻¹(f(x)) = x and f(f⁻¹(y)) = y; its graph is the reflection of f over y = x. |

## Component 1 — Learning Objectives

- LO1: Define the **inverse function** $f^{-1}$ of a bijective function $f$ as the function satisfying BOTH $f^{-1}(f(x))=x$ (for all $x$ in $f$'s domain) and $f(f^{-1}(y))=y$ (for all $y$ in $f$'s codomain) — directly building on `math.func.bijection`'s own "exactly one preimage" construction of $f^{-1}$ as a genuine function.
- LO2: Find $f^{-1}$ algebraically for a specific bijective function (solve $y=f(x)$ for $x$, then swap variable names), and verify the result using a GENERAL algebraic argument valid for ARBITRARY $x$ — not by checking the identity at one sampled numerical value, which proves nothing about every other input.
- LO3: Recognize that a function must FIRST be bijective (restricting the domain if necessary, exactly per `math.func.bijection`'s gatekeeping requirement) before a genuine inverse function exists at all, and correctly identify that the graph of $f^{-1}$ is the reflection of $f$'s graph over the line $y=x$ — not over the $x$-axis or $y$-axis.

## Component 2 — Prerequisite Check

Assumes mastery of `math.func.bijection` (a function is bijective iff both injective and surjective; bijectivity guarantees every codomain element has EXACTLY one preimage; attempting to invert a non-bijective function produces something that fails to be a genuine function).

## Component 3 — Core Explanation

**The inverse function: two "undoing" identities, guaranteed by bijectivity**: for a bijective function $f$, `math.func.bijection` already showed that swapping the roles of domain and codomain produces a genuine, well-defined function $f^{-1}$ (thanks to the "exactly one preimage" guarantee). This $f^{-1}$ satisfies TWO identities: $f^{-1}(f(x))=x$ for every $x$ in $f$'s domain (applying $f$ then undoing it returns the original input), and $f(f^{-1}(y))=y$ for every $y$ in $f$'s codomain (applying the inverse then $f$ itself returns the original output).

**Finding $f^{-1}$ algebraically, and verifying it generally**: to find $f^{-1}$ for a specific $f$, write $y=f(x)$, solve algebraically for $x$ in terms of $y$, then swap the variable names to express the result as a function of $x$. Verifying the result is correct means substituting back into $f^{-1}(f(x))=x$ and confirming the identity holds for an ARBITRARY $x$ — a general algebraic simplification, not a single plugged-in number, since a candidate could happen to work for one convenient value while genuinely failing elsewhere.

**Bijectivity is a genuine prerequisite for existence, and the graph reflects over $y=x$**: a function must be bijective BEFORE attempting to construct $f^{-1}$ at all — if it isn't (e.g. failing injectivity, as `math.func.bijection`'s own counterexamples showed), restricting the domain may be necessary to make it genuinely invertible. Geometrically, since $f^{-1}$ swaps every $(x,y)$ pair on $f$'s graph into $(y,x)$, the graph of $f^{-1}$ is exactly the reflection of $f$'s graph over the line $y=x$ (the line where the coordinates are literally interchanged) — not over the $x$-axis (which would negate $y$) or the $y$-axis (which would negate $x$).

## Component 4 — Worked Examples

**Example 1 (LO1/LO2 — algebraic construction and general verification, breaking MC-1)**: For $f(x)=3x+2$ (bijective on $\mathbb{R}$): solve $y=3x+2$ for $x$: $x=(y-2)/3$; swap variable names: $f^{-1}(x)=(x-2)/3$. Verify GENERALLY, for arbitrary $x$: $f^{-1}(f(x)) = f^{-1}(3x+2) = \dfrac{(3x+2)-2}{3} = \dfrac{3x}{3}=x$ ✓ — this holds for EVERY $x$, since the algebra simplifies identically regardless of which number $x$ represents (unlike checking, say, only $x=1$: $f^{-1}(f(1))=f^{-1}(5)=(5-2)/3=1$ ✓, which is correct but proves nothing about $x=2,3,\ldots$ on its own).

**Example 2 (LO3 — domain restriction is required first, breaking MC-2)**: $f(x)=x^2$ is NOT injective on all of $\mathbb{R}$ (`math.func.injectivity`'s own counterexample: $f(2)=f(-2)=4$), so it is NOT bijective on $\mathbb{R}$, and has NO genuine inverse function there. Restricting the domain to $x\ge0$ makes $f$ injective (and surjective onto $[0,\infty)$) — genuinely bijective on this restricted domain — with inverse $f^{-1}(x)=\sqrt{x}$ (for $x\ge0$). Verify: $f^{-1}(f(x))=\sqrt{x^2}=x$ for $x\ge0$ (this specifically needs $x\ge0$, since $\sqrt{x^2}=|x|$ in general) ✓, and $f(f^{-1}(x))=(\sqrt{x})^2=x$ for $x\ge0$ ✓.

**Example 3 (LO3 — the graph reflects over y=x, not the x-axis, breaking MC-3)**: For $f(x)=3x+2$ from Example 1: $f(0)=2$, so $(0,2)$ is on $f$'s graph. On $f^{-1}$'s graph, the corresponding point should be $(2,0)$ (coordinates swapped): check $f^{-1}(2)=(2-2)/3=0$ ✓ — matches. Now check whether reflecting $(0,2)$ over the $x$-AXIS instead (negating $y$) would have worked: that gives $(0,-2)$ — but $f^{-1}(0)=(0-2)/3=-2/3\ne-2$ — this does NOT match $f^{-1}$'s graph at all, confirming the correct reflection line is $y=x$ (coordinate-swap), not the $x$-axis.

## Component 5 — Teaching Actions

### Teaching Action A01 — Constructing and Verifying Generally, Not by Sampling (Primitive P11: Representation Shift)

State: "solve for $x$, swap the names — then verify the result works for an ARBITRARY $x$ algebraically, exactly like proving injectivity generally rather than checking sample numbers." Work Example 1's full construction and general verification.

- **MC-1 hook**: ask "if I plug in one number and confirm $f^{-1}(f(x))=x$ holds for it, have I verified the inverse is correct?" — a "yes" answer reveals MC-1 (treating a single numerical check as sufficient proof, rather than a general algebraic argument).

### Teaching Action A02 — Bijectivity First, Inverse Second (Primitive P28: Conflict Evidence)

Present Example 2's direct evidence: $f(x)=x^2$ has NO inverse function on all of $\mathbb{R}$ (since it isn't injective there), but restricting to $x\ge0$ restores bijectivity and produces the genuine inverse $\sqrt{x}$. State: "you can't invert a function that isn't bijective — if it fails to be, per `math.func.bijection`'s own requirement, the fix is restricting the domain until it genuinely is, not forcing a formula through regardless."

- **MC-2 hook**: ask "can I find an inverse function for ANY function, as long as I can solve $y=f(x)$ for $x$ somehow?" — a "yes" answer reveals MC-2 (attempting to invert a non-bijective function directly, missing the bijectivity gatekeeping requirement `math.func.bijection` established).

### Teaching Action A03 — The Graph Reflects Over y=x, Not the x-Axis (Primitive P06: Contrast Pair)

Contrast Example 3's correct check (reflecting $(0,2)$ over $y=x$ gives $(2,0)$, which genuinely lies on $f^{-1}$'s graph) against the incorrect guess (reflecting over the $x$-axis gives $(0,-2)$, which does NOT lie on $f^{-1}$'s graph). State: "the inverse swaps $x$ and $y$ roles entirely — that's a reflection over the line $y=x$, where the coordinates are literally interchanged, not a flip over either axis."

- **MC-3 hook**: ask "is the graph of $f^{-1}$ obtained by flipping $f$'s graph over the $x$-axis?" — a "yes" answer reveals MC-3 (guessing the wrong reflection line, rather than the coordinate-swap line $y=x$).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Find $f^{-1}$ for $f(x)=2x-5$, and verify $f^{-1}(f(x))=x$ generally (not for just one number).
  2. Explain why $f(x)=x^3$ is bijective on all of $\mathbb{R}$ (no domain restriction needed), and find its inverse.
  3. Explain why $f(x)=|x|$ has no inverse function on all of $\mathbb{R}$, and state a domain restriction that would make it invertible.
  4. If $(3,7)$ is a point on the graph of a bijective function $f$, state the corresponding point on the graph of $f^{-1}$, and explain which reflection line justifies your answer.
- **P76 (Transfer Probe, mode = independence)**: "A currency conversion function $f(d) = 82.5d$ converts $d$ US dollars into an equivalent amount of Indian rupees (at a fixed exchange rate). (a) Explain why this function is bijective on its natural domain (positive real numbers), and find its inverse function $f^{-1}$. (b) Explain, in plain terms, what $f^{-1}$ represents in this currency context, and verify $f(f^{-1}(y))=y$ generally for arbitrary $y$. (c) A bank employee claims that since currency conversion 'obviously has an inverse' (you can always convert rupees back to dollars), NO function used for financial conversions ever needs to be checked for bijectivity first. Using this lesson's $f(x)=x^2$ counterexample, explain why this claim is not generally true, even though it happens to hold for this particular linear conversion function."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | INVERSE-VERIFIED-BY-SAMPLING | Believing checking f⁻¹(f(x))=x for one specific numerical value proves the candidate inverse is correct, rather than requiring a general algebraic argument valid for all x | Foundational |
| MC-2 | INVERSE-ASSUMED-TO-EXIST-WITHOUT-BIJECTIVITY-CHECK | Believing an inverse function can be found for any function as long as y=f(x) can be somehow solved for x, missing that bijectivity (per math.func.bijection) must hold first, or the domain must be restricted | Foundational |
| MC-3 | INVERSE-GRAPH-REFLECTED-OVER-WRONG-AXIS | Believing the graph of f⁻¹ is obtained by reflecting f's graph over the x-axis (or y-axis), rather than over the line y=x | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Inverse Verified by Sampling") → P41 (detect: ask a student to justify a candidate inverse function and check whether they cite only one checked numerical value) → P64 (conceptual shift: re-walk Example 1's general algebraic verification, re-anchoring on "the identity must hold for arbitrary x — simplify symbolically, don't just plug in one number").
- **B02 (targets MC-2)**: P27 (name it: "Inverse Assumed to Exist Without Bijectivity Check") → P41 (detect: ask a student to find the inverse of a non-injective function like x² on all of ℝ, and check whether they proceed without addressing the missing bijectivity) → P64 (conceptual shift: re-walk Example 2's domain-restriction fix, re-anchoring on "bijectivity is checked FIRST — if it fails, restrict the domain until it holds, per `math.func.bijection`'s own requirement, before attempting to invert").
- **B03 (targets MC-3)**: P27 (name it: "Inverse Graph Reflected Over Wrong Axis") → P41 (detect: ask a student which line or axis the graph of f⁻¹ reflects f's graph over, and check for an x-axis or y-axis answer) → P64 (conceptual shift: re-walk Example 3's direct point-by-point check, showing the x-axis reflection fails to land on $f^{-1}$'s graph while the $y=x$ reflection succeeds, re-anchoring on "swapping x and y coordinates is exactly reflection over y=x").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.func.bijection` (the injective+surjective combination this concept's existence claim depends on entirely, and the "exactly one preimage" construction of $f^{-1}$ as a genuine function).
- **Unlocks**: `math.trig.inverse-trig` (the trigonometric functions' own domain-restricted inverses, e.g. $\arcsin$, directly instantiate this concept's LO3 domain-restriction requirement), `math.alg.logarithm` (the logarithm is defined as the inverse of the exponential function, another direct instantiation of this concept).
- **Cross-link**: KG lists `math.trig.inverse-trig` as a cross-link — **not yet authored** (checked via `ls docs/curriculum/blueprints/` before setting P76_mode). $P76_{mode}=$ **independence**; a future revision may add a genuine cross-link transfer probe into inverse trigonometric functions' domain restrictions once that entry exists.

## Component 8 — Teaching Notes

- estimated_hours = 6 with a proficient/apply tag places this at a "3 TAs + gate" tier — A01 (general algebraic construction and verification), A02 (the bijectivity-first gatekeeping requirement), and A03 (the correct reflection line) each target a distinct LO, appropriate for a concept that directly builds on and cashes out `math.func.bijection`'s own theoretical guarantees into a concrete, computable skill.
- Example 2's $f(x)=x^2$ deliberately reuses `math.func.injectivity`'s own non-injective counterexample ($f(2)=f(-2)=4$) rather than introducing a fresh non-bijective function, keeping the corpus's cross-concept continuity intact — the same concrete failure that motivated injectivity's own teaching is directly resolved here via domain restriction.
- Example 3's reflection check was deliberately designed to test and REJECT the natural wrong guess (the $x$-axis) explicitly, rather than only demonstrating the correct reflection line in isolation — giving MC-3 a concrete, falsified alternative rather than an assertion of the right answer alone.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (math.trig.inverse-trig unauthored → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.8×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Concrete: specific function constructed and generally verified before the abstract two-identity definition) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1/LO2, Ex2→LO3, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
