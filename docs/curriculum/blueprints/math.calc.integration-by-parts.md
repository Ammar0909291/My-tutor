# Teaching Blueprint: Integration by Parts (`math.calc.integration-by-parts`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.calc.integration-by-parts` |
| name | Integration by Parts |
| domain | Calculus |
| difficulty | advanced |
| bloom | apply |
| mastery_threshold | 0.8 → MAMR = ⌈0.8×5⌉ = 4/5 |
| estimated_hours | 10 |
| requires | `math.calc.u-substitution`, `math.calc.product-rule` |
| unlocks | `math.calc.reduction-formulas` |
| cross_links | none |
| CPA_entry_stage | A (Abstract) — direct derivation from the already-known Product Rule, immediately followed by the choice-of-parts heuristic |
| description (KG) | ∫u dv = uv − ∫v du; reverses the product rule; used for products of trig, exponential, log, and polynomial functions. |

## Component 1 — Learning Objectives

- LO1: Derive the **Integration by Parts** formula, $\int u\,dv = uv-\int v\,du$, directly from the Product Rule $(fg)'=f'g+fg'$ by integrating both sides — recognizing this technique as literally "the Product Rule run in reverse," exactly parallel to how `math.calc.u-substitution` reverses the Chain Rule.
- LO2: Apply the heuristic **"LIATE"** (or similar priority ordering — Logarithmic, Inverse trig, Algebraic, Trigonometric, Exponential) to choose $u$ and $dv$ wisely for a product of two functions, and correctly recognize that a POOR choice of $u,dv$ can produce a new integral that is MORE complicated than the original, not less.
- LO3: Apply Integration by Parts **repeatedly** (or set up a "tabular"/recursive pattern) when a single application leaves a new integral that itself requires the technique again — directly refuting the misconception that Integration by Parts always resolves an integral in exactly one application.

## Component 2 — Prerequisite Check

Assumes mastery of `math.calc.u-substitution` (reversing the Chain Rule: $\int f(g(x))g'(x)\,dx = \int f(u)\,du$ with $u=g(x)$) and `math.calc.product-rule` ($(fg)'=f'g+fg'$, the differentiation rule this technique reverses).

## Component 3 — Core Explanation

**Deriving the formula from the Product Rule**: starting from $(uv)' = u'v+uv'$ and integrating both sides with respect to $x$: $uv = \int u'v\,dx + \int uv'\,dx$. Rearranging: $\int uv'\,dx = uv - \int u'v\,dx$. Writing $dv=v'\,dx$ and $du=u'\,dx$ (the differential notation), this becomes the standard form $\int u\,dv = uv-\int v\,du$. The technique is called "by parts" because it splits the integrand into two PARTS — one designated $u$ (to be differentiated) and one designated $dv$ (to be integrated) — trading the original integral for a (hopefully simpler) new one, $\int v\,du$.

**Choosing $u$ and $dv$ wisely — LIATE**: the SAME product can be split into $u,dv$ in more than one way, but not every choice leads to a simpler resulting integral. A commonly used priority guide, LIATE (Logarithmic, Inverse trig, Algebraic/polynomial, Trigonometric, Exponential), suggests choosing $u$ to be whichever function type appears EARLIEST in this list (logarithms and inverse trig functions are generally hardest to integrate directly, so making them $u$ — differentiated rather than integrated — is usually advantageous; exponentials are easiest to integrate repeatedly, so they usually make a good $dv$). This is a heuristic, not an ironclad law — but a poor choice can make $\int v\,du$ MORE complicated than the original integral, a clear signal to backtrack and try the other assignment.

**Repeated application**: sometimes a single application of Integration by Parts leaves a new integral $\int v\,du$ that is simpler than the original but STILL requires Integration by Parts (or another technique) to finish — e.g. integrating $x^2e^x$ requires reducing the power of $x$ from $2$ to $1$ to $0$ across two full applications. Recognizing this pattern (the polynomial factor's degree drops by one each time) lets the technique be applied systematically, rather than being surprised that "the answer isn't done yet" after the first pass.

## Component 4 — Worked Examples

**Example 1 (LO1 — the formula applied directly)**: Evaluate $\int xe^x\,dx$. Choose $u=x$ (algebraic, differentiates to something simpler) and $dv=e^x\,dx$ (exponential, easy to integrate): $du=dx$, $v=e^x$. Applying the formula: $\int xe^x\,dx = xe^x-\int e^x\,dx = xe^x-e^x+C$.

**Example 2 (LO2 — a poor choice backfires, breaking MC-1)**: Attempt the SAME integral, $\int xe^x\,dx$, with the choice REVERSED: $u=e^x$, $dv=x\,dx$. Then $du=e^x\,dx$, $v=\frac{x^2}{2}$. Applying the formula: $\int xe^x\,dx = \frac{x^2}{2}e^x - \int\frac{x^2}{2}e^x\,dx$ — the new integral, $\int\frac{x^2}{2}e^x\,dx$, is MORE complicated than the original (a higher power of $x$ multiplying $e^x$), not less. This choice makes progress backward, not forward — proving that swapping $u$ and $dv$ is not simply a matter of taste; one choice is genuinely more productive than the other.

**Example 3 (LO3 — repeated application, breaking MC-2)**: Evaluate $\int x^2e^x\,dx$. First application: $u=x^2$, $dv=e^x\,dx$; $du=2x\,dx$, $v=e^x$: $\int x^2e^x\,dx = x^2e^x - \int 2xe^x\,dx$. The remaining integral, $\int 2xe^x\,dx = 2\int xe^x\,dx$, is EXACTLY Example 1's integral (already solved: $xe^x-e^x+C$). So: $\int x^2e^x\,dx = x^2e^x - 2(xe^x-e^x) + C = x^2e^x-2xe^x+2e^x+C$. This required recognizing that the first application's leftover integral was simpler but not yet a basic form — needing a SECOND application (here, reusing Example 1's already-completed work) before the problem was fully finished.

## Component 5 — Teaching Actions

### Teaching Action A01 — Deriving the Formula: The Product Rule Reversed (Primitive P11: Representation Shift)

State: "you already reversed the Chain Rule to get u-substitution. Now we reverse the Product Rule the same way." Derive the formula live from $(uv)'=u'v+uv'$, integrating both sides, arriving at $\int u\,dv=uv-\int v\,du$. Work Example 1's direct application.

### Teaching Action A02 — Choosing u and dv Wisely: LIATE and the Backfire Test (Primitive P28: Conflict Evidence)

Present Example 2's direct conflict: the reversed choice of $u,dv$ for the identical integral produces a MORE complicated remaining integral. State: "swapping $u$ and $dv$ isn't a stylistic choice — one assignment makes genuine progress, and the other one doesn't. If your new integral looks harder than what you started with, that's the signal to go back and swap your choice." Introduce LIATE as a starting heuristic for which function to pick as $u$.

- **MC-1 hook**: ask "does it matter which factor you call $u$ and which you call $dv$, as long as you apply the formula correctly?" — a "yes it doesn't matter" answer reveals MC-1 (believing any valid split of the product works equally well, missing that a poor choice can produce a harder integral than the one you started with).

### Teaching Action A03 — Repeated Application When One Pass Isn't Enough (Primitive P11: Representation Shift)

Work Example 3's full two-step derivation, explicitly noting: "after the first application, check whether the new integral is a BASIC form you already know, or whether it still needs more work — here, it needed one more full application (which we'd already solved in Example 1)."

- **MC-2 hook**: ask "does Integration by Parts always fully solve an integral after just ONE application?" — a "yes" answer reveals MC-2 (assuming a single pass always suffices, missing that a polynomial factor of degree 2 or higher typically requires the technique to be applied once per degree reduction).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Evaluate $\int x\cos x\,dx$ using Integration by Parts, showing your choice of $u,dv$ explicitly.
  2. Attempt problem 1 with the OPPOSITE choice of $u,dv$ and show that the resulting integral is more complicated, confirming your original choice was the productive one.
  3. Evaluate $\int x^2\sin x\,dx$, recognizing that it will require two applications of the technique.
  4. Evaluate $\int \ln x\,dx$ (hint: even though this looks like it has only ONE factor, choosing $dv=dx$ and $u=\ln x$ still applies the technique — work through this case explicitly).
- **P76 (Transfer Probe, mode = independence)**: "An engineer needs to evaluate $\int x^3e^x\,dx$ as part of a signal-processing calculation. (a) Set up the first application of Integration by Parts, choosing $u$ and $dv$ using the LIATE-style reasoning from this lesson. (b) Explain, before doing any further computation, how many TOTAL applications of the technique you expect to need, based on the pattern observed in Example 3 (where the polynomial's degree dropped by one each time). (c) Complete the full computation, reusing Example 3's own result ($\int x^2e^x\,dx = x^2e^x-2xe^x+2e^x+C$) as a building block rather than re-deriving it from scratch."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | U-DV-CHOICE-TREATED-AS-ARBITRARY | Believing any valid split of the integrand into $u$ and $dv$ works equally well, missing that a poor choice can produce a new integral more complicated than the original | Foundational |
| MC-2 | SINGLE-APPLICATION-ASSUMED-ALWAYS-SUFFICIENT | Assuming Integration by Parts always fully resolves an integral in exactly one application, missing that higher-degree polynomial factors typically require repeated application | Foundational |
| MC-3 | DV-INTEGRATED-WITH-AN-UNNECESSARY-CONSTANT-OF-INTEGRATION | Adding a "+C" when computing $v$ from $dv$ partway through the formula (before the final integral is fully evaluated), causing confusion or arithmetic errors in the remaining steps | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Arbitrary u-dv Choice Assumption") → P41 (detect: ask a student to choose $u,dv$ for $\int xe^x\,dx$ and check whether they proceed without considering which choice is more productive) → P64 (conceptual shift: re-walk Example 2's direct demonstration that the reversed choice backfires, re-anchoring on "check whether your new integral looks simpler — if not, swap and try the other way").
- **B02 (targets MC-2)**: P27 (name it: "Single-Application Sufficiency Assumption") → P41 (detect: give $\int x^2e^x\,dx$ and check whether the student stops after one application, treating the remaining integral as already solved) → P64 (conceptual shift: re-walk Example 3's second application, re-anchoring on "check whether the leftover integral is a BASIC form yet — if it still has a product of a polynomial and something else, it likely needs another pass").
- **B03 (targets MC-3)**: P27 (name it: "Premature Constant of Integration in v") → P41 (detect: ask a student to compute $v$ from $dv=e^x\,dx$ mid-formula and check whether they write $v=e^x+C$ instead of just $v=e^x$) → P64 (conceptual shift: re-anchor on "only the FINAL integral gets a constant of integration — $v$ itself is just one specific antiderivative, chosen without its own arbitrary constant, since adding one would just cancel out in the final formula anyway").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.calc.u-substitution` (the "reverse a differentiation rule" framing this technique directly parallels, now applied to the Product Rule instead of the Chain Rule), `math.calc.product-rule` ($(fg)'=f'g+fg'$, the exact rule this technique's formula is derived from).
- **Unlocks**: `math.calc.reduction-formulas` (formulas that apply Integration by Parts repeatedly in a general, systematic pattern, building directly on LO3's repeated-application skill).
- **Cross-link**: KG lists no cross-links for this concept.

## Component 8 — Teaching Notes

- estimated_hours = 10 with an advanced/apply tag places this at a "3 TAs + gate" tier — A01 (deriving the formula), A02 (choosing u/dv wisely), and A03 (repeated application) each target a distinct LO, appropriate for a substantial technique combining a clean derivation with a genuinely nontrivial judgment call (which factor to differentiate vs. integrate).
- This blueprint deliberately opens by explicitly paralleling `math.calc.u-substitution`'s own framing ("reversing a known differentiation rule") — Teaching Notes name this structural echo directly so a student who mastered that concept recognizes the same meta-strategy (undo a differentiation rule to build an integration technique) rather than treating this as an unrelated new method.
- Example 2's "backfire" demonstration was deliberately built by simply swapping the SAME example's $u,dv$ assignment (rather than introducing a new integral) to isolate the choice itself as the only variable, making the consequence of a poor choice as vivid and directly comparable as possible.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (both) |
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
| V-15 | CPA_entry_stage justified | PASS (Abstract: direct derivation from the already-known Product Rule) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
