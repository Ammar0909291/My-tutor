# Teaching Blueprint: Mean Value Theorem (Rigorous) (`math.real.mvt`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.real.mvt` |
| name | Mean Value Theorem (Rigorous) |
| domain | Real Analysis |
| difficulty | expert |
| bloom | apply |
| mastery_threshold | 0.9 → MAMR = ⌈0.9×5⌉ = 5/5 |
| estimated_hours | 4 |
| requires | `math.real.differentiability-rigorous` |
| unlocks | `math.real.taylor-rigorous` |
| cross_links | `math.calc.mean-value-theorem` |
| CPA_entry_stage | A (Abstract) — expert learner already fluent in rigorous differentiability; the proof-via-Rolle construction is presented directly |
| description (KG) | If f:[a,b]→ℝ is continuous, differentiable on (a,b), then ∃c∈(a,b) with f′(c)=(f(b)−f(a))/(b−a). Proved via Rolle's theorem. Fundamental tool: f′=0 on interval ⟹ f constant. |

## Component 1 — Learning Objectives

- LO1: State the Mean Value Theorem precisely and **prove it via Rolle's Theorem** (the special case $f(a)=f(b)\Rightarrow\exists c$ with $f'(c)=0$) — constructing the auxiliary function $g(x)=f(x)-f(a)-\frac{f(b)-f(a)}{b-a}(x-a)$ (which subtracts off the secant line) and applying Rolle's Theorem to $g$ — recognizing the MVT is a direct CONSEQUENCE of Rolle's Theorem, not an independently-proven fact.
- LO2: Apply the fundamental consequence — $f'=0$ on an interval $\Rightarrow$ $f$ is **exactly, provably constant** on that interval (not merely "approximately flat") — via a direct MVT-based argument.
- LO3: Connect the rigorous proof to the applied intuition already mastered in `math.calc.mean-value-theorem` — verifying that concept's own worked example using the auxiliary-function/Rolle construction, confirming both concepts describe the identical mathematical fact.

## Component 2 — Prerequisite Check

Assumes mastery of `math.real.differentiability-rigorous` (the rigorous derivative definition, differentiability implying continuity).

## Component 3 — Core Explanation

**The MVT is a direct consequence of Rolle's Theorem, via a specific auxiliary function**: Rolle's Theorem states that if $f$ is continuous on $[a,b]$, differentiable on $(a,b)$, and $f(a)=f(b)$, then some $c\in(a,b)$ has $f'(c)=0$. The general MVT (where $f(a)$ need not equal $f(b)$) is PROVEN by constructing $g(x)=f(x)-f(a)-\frac{f(b)-f(a)}{b-a}(x-a)$ — this subtracts off the secant line connecting $(a,f(a))$ and $(b,f(b))$, so $g(a)=0$ and $g(b)=0$ BY CONSTRUCTION. Rolle's Theorem applies directly to $g$, giving some $c$ with $g'(c)=0$; since $g'(x)=f'(x)-\frac{f(b)-f(a)}{b-a}$, this means $f'(c)=\frac{f(b)-f(a)}{b-a}$ — exactly the MVT's conclusion.

**$f'=0$ everywhere forces $f$ to be EXACTLY constant, not just roughly flat**: if $f'(x)=0$ for every $x$ in an interval, then for ANY two points $x_1<x_2$ in that interval, the MVT gives some $c\in(x_1,x_2)$ with $f'(c)=\frac{f(x_2)-f(x_1)}{x_2-x_1}$. Since $f'(c)=0$ (given), this forces $f(x_2)=f(x_1)$ EXACTLY, for every such pair — meaning $f$ takes the identical value everywhere on the interval, a precise, provable equality, not an approximation.

**The rigorous and applied MVT describe the identical fact**: `math.calc.mean-value-theorem` already established the MVT informally — geometrically (tangent parallel to secant) and physically (instantaneous rate equals average rate somewhere) — trusting the theorem's existence claim without proving it. This concept's Rolle-based construction is the actual PROOF MACHINERY behind that trusted claim: the same statement, now with an explicit reason WHY the guaranteed point $c$ must exist.

## Component 4 — Worked Examples

**Example 1 (LO1 — proving MVT via Rolle's theorem, reusing `math.calc.mean-value-theorem`'s own example, breaking MC-1)**: For $f(x)=x^2$ on $[1,4]$ (the exact function and interval from `math.calc.mean-value-theorem`'s own Example 1, which found $c=2.5$ by directly solving $f'(c)=5$): construct $g(x)=x^2-1-5(x-1)=x^2-5x+4$. Check $g(1)=1-5+4=0$ ✓ and $g(4)=16-20+4=0$ ✓ (both zero, by construction). Rolle's Theorem applies to $g$ (continuous on $[1,4]$, differentiable on $(1,4)$, $g(1)=g(4)=0$): some $c\in(1,4)$ has $g'(c)=0$. Since $g'(x)=2x-5$, solving $2c-5=0$ gives $c=2.5$ — MATCHING that concept's own found value, but now DERIVED from Rolle's Theorem, not simply asserted to exist.

**Example 2 (LO2 — f′=0 forces exact constancy, breaking MC-2)**: Suppose $f'(x)=0$ for every $x$ in some interval, and $f(3)=7$. For ANY other point, say $x=100$ (in the same interval), the MVT gives some $c$ between $3$ and $100$ with $f'(c)=\frac{f(100)-f(3)}{100-3}$. Since $f'(c)=0$ (given, since $f'\equiv0$), this forces $\frac{f(100)-f(3)}{97}=0$, i.e. $f(100)=f(3)=7$ EXACTLY — not "close to 7," not "approximately 7," but precisely equal, guaranteed by this argument for every point in the interval.

**Example 3 (LO3 — the rigorous proof underlies the applied intuition, cross-link probe reuse)**: `math.calc.mean-value-theorem`'s own Example 1 found $c=2.5$ for $f(x)=x^2$ on $[1,4]$ by informally solving "instantaneous rate = average rate" ($f'(c)=5$), TRUSTING the theorem's guarantee without proving it. This concept's Example 1 shows exactly WHY that guarantee holds: the auxiliary function $g(x)=x^2-5x+4$, vanishing at both endpoints by construction, forces (via Rolle's Theorem) some point where $g'=0$ — precisely the point where the tangent becomes parallel to the secant. The applied concept's informal geometric intuition and this concept's rigorous $\varepsilon$-$\delta$-grounded construction describe the IDENTICAL mathematical fact, one used trustingly, one actually proven.

## Component 5 — Teaching Actions

### Teaching Action A01 — The MVT Is Rolle's Theorem in Disguise, via One Specific Auxiliary Function (Primitive P11: Representation Shift)

State: "the general MVT isn't proven by some separate, independent argument — it's Rolle's Theorem applied to one cleverly-constructed function that subtracts off the secant line." Work Example 1's full construction and Rolle's Theorem application.

- **MC-1 hook**: ask "is the Mean Value Theorem proven by an independent argument, separate from Rolle's Theorem?" — a "yes" answer reveals MC-1 (missing the specific reduction to Rolle's Theorem via the auxiliary function).

### Teaching Action A02 — f′ = 0 Gives Exact Equality, Not Approximate Flatness (Primitive P28: Conflict Evidence)

Present Example 2's direct evidence: $f'\equiv0$ forces $f(100)=f(3)=7$ EXACTLY, via the MVT's precise equality. State: "this isn't an approximation or a heuristic — the MVT gives an exact equality between any two points whenever the derivative vanishes throughout."

- **MC-2 hook**: ask "does $f'=0$ throughout an interval only guarantee f is 'roughly flat' or 'approximately constant' there?" — a "yes" answer reveals MC-2 (underestimating the theorem's guarantee of EXACT constancy).

### Teaching Action A03 — The Applied and Rigorous MVT Are the Same Fact (Primitive P06: Contrast Pair)

Contrast `math.calc.mean-value-theorem`'s informal trust in the existence of $c$ against this concept's explicit Rolle-based construction proving it, both landing on $c=2.5$ for the identical function and interval. State: "these aren't two different facts about $f(x)=x^2$ on $[1,4]$ — one is the trusted claim, the other is the proof of exactly why it's true."

- **MC-3 hook**: ask "do the 'applied' Mean Value Theorem (from calculus) and this rigorous, Rolle-based version prove two genuinely different facts?" — a "yes" answer reveals MC-3 (missing that both describe the identical theorem, one used informally, one actually proven).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Construct the auxiliary function $g(x)$ for $f(x)=x^3$ on $[0,2]$ and verify $g(0)=g(2)=0$.
  2. Using the auxiliary function from problem 1, apply Rolle's Theorem to find the guaranteed value of $c$.
  3. If $f'(x)=0$ on $(0,10)$ and $f(5)=-3$, state $f(9)$ and justify using the MVT directly.
  4. Explain, in your own words, why constructing $g(x)=f(x)-f(a)-\frac{f(b)-f(a)}{b-a}(x-a)$ specifically guarantees $g(a)=g(b)=0$.
- **P76 (Transfer Probe, mode = cross-link probe against `math.calc.mean-value-theorem`)**: "An engineering student, having learned the 'applied' Mean Value Theorem, computes that a car's average speed over a 2-hour trip was 60 mph, and concludes 'the theorem guarantees the car was going exactly 60 mph at some instant during the trip,' without questioning why this guarantee holds. (a) Using this lesson's Rolle-based construction, explain precisely WHY such an instant must exist — construct the relevant auxiliary function for the car's position function $f(t)$ over the 2-hour interval. (b) A colleague argues 'the applied version already tells us this is true, so there's no need to bother with the rigorous auxiliary-function proof — it's just an unnecessary formality.' Explain what the rigorous proof adds beyond the applied version's informal trust. (c) The colleague also asks whether the same rigorous machinery could be used to show the car's speed was EXACTLY 60 mph at every instant, not just some instant. Explain specifically why the MVT does not give this stronger conclusion, and what additional hypothesis (from this lesson's LO2) would be needed for a constant-speed guarantee instead."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | MVT-PROVEN-INDEPENDENTLY-OF-ROLLE | Believing the Mean Value Theorem is proven by an argument independent of Rolle's Theorem, missing the specific auxiliary-function reduction to Rolle's Theorem | Foundational |
| MC-2 | ZERO-DERIVATIVE-ASSUMED-ONLY-APPROXIMATE-CONSTANCY | Believing f′=0 throughout an interval only guarantees f is roughly or approximately constant, missing that the MVT gives an exact equality | Foundational |
| MC-3 | RIGOROUS-AND-APPLIED-MVT-TREATED-AS-DIFFERENT-FACTS | Believing the rigorous (Rolle-based) MVT and the applied (informal) MVT prove two different facts, missing that they describe the identical theorem | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "MVT Proven Independently of Rolle") → P41 (detect: ask a student how the MVT is proven, checking whether they mention Rolle's Theorem or the auxiliary function) → P64 (conceptual shift: re-walk Example 1's full construction, re-anchoring on "the MVT is Rolle's Theorem applied to one specific auxiliary function").
- **B02 (targets MC-2)**: P27 (name it: "Zero Derivative Assumed Only Approximate Constancy") → P41 (detect: ask a student what f′=0 throughout an interval guarantees, checking for "approximately constant" rather than "exactly constant") → P64 (conceptual shift: re-walk Example 2's exact equality derivation, re-anchoring on "the MVT gives an exact equality, not an approximation").
- **B03 (targets MC-3)**: P27 (name it: "Rigorous and Applied MVT Treated as Different Facts") → P41 (detect: ask a student whether the rigorous and applied MVT prove different facts, checking for "yes") → P64 (conceptual shift: re-walk Example 3's side-by-side comparison, both landing on the identical $c=2.5$, re-anchoring on "one is the trusted claim, the other is its proof").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.real.differentiability-rigorous` (the rigorous derivative definition underlying Rolle's Theorem and the auxiliary function's differentiability).
- **Unlocks**: `math.real.taylor-rigorous` (Taylor's theorem, a further generalization building on the MVT's auxiliary-function proof technique).
- **Cross-link**: KG lists `math.calc.mean-value-theorem` as a cross-link — **authored** (checked via `ls docs/curriculum/blueprints/` before setting P76_mode; that concept's own blueprint explicitly anticipated this connection, noting it used independence mode only because this concept did not yet exist). $P76_{mode}=$ **cross-link probe**, directly reusing that concept's own $f(x)=x^2$ on $[1,4]$ example to show the rigorous proof underlies the applied intuition.

## Component 8 — Teaching Notes

- estimated_hours = 4 with an expert/apply tag places this at a "3 TAs + gate" tier, appropriately compact given the concept's central move (the auxiliary-function reduction to Rolle's Theorem) is a single, reusable construction applied consistently across all three learning objectives.
- **Division of labor**: `math.calc.mean-value-theorem` owns the informal, applied statement and geometric/physical intuition (already verified as informally trusted, per that concept's own Teaching Notes anticipating this exact connection). This concept, `math.real.mvt`, deliberately does not re-teach that informal framing; it owns the RIGOROUS PROOF via Rolle's Theorem and the auxiliary function, plus the exact-constancy consequence that follows from it.
- Example 1 deliberately reuses `math.calc.mean-value-theorem`'s own $f(x)=x^2$ on $[1,4]$ example (rather than a new one) specifically because that concept's own blueprint flagged this exact cross-link opportunity as a planned future connection — fulfilling that anticipated design rather than introducing an unrelated example.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (math.calc.mean-value-theorem authored → cross-link probe) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (cross-link probe against math.calc.mean-value-theorem) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.9×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract: expert learner already fluent in rigorous differentiability; proof presented directly) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
