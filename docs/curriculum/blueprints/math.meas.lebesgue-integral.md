# Teaching Blueprint: Lebesgue Integral (`math.meas.lebesgue-integral`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.meas.lebesgue-integral` |
| name | Lebesgue Integral |
| domain | Measure Theory |
| difficulty | expert |
| bloom | apply |
| mastery_threshold | 0.85 → MAMR = ⌈0.85×5⌉ = 5/5 |
| estimated_hours | 7 |
| requires | `math.meas.simple-function` |
| unlocks | `math.meas.convergence-theorems`, `math.meas.lp-space` |
| cross_links | `math.real.riemann-integral` (**authored**) — verified via `ls`; P76_mode = cross-link probe, see Component 7 |
| CPA_entry_stage | A (Abstract) — direct construction from the already-mastered simple-function integral via a supremum |
| description (KG) | ∫f dμ = sup{∫φ dμ : φ simple, 0≤φ≤f} for non-negative f; extend by f=f⁺−f⁻. Generalizes Riemann integral: every Riemann integrable function is Lebesgue integrable with same value. Integrates more functions; supports limit theorems. |

## Component 1 — Learning Objectives

- LO1: Define the **Lebesgue integral** of a non-negative measurable function $f$ as $\int f\,d\mu = \sup\{\int\varphi\,d\mu : \varphi \text{ simple}, 0\le\varphi\le f\}$ — the SUPREMUM of already-known, easy simple-function integrals over all simple functions that stay below $f$ — directly reusing `math.meas.simple-function`'s finite-sum computation as the building block.
- LO2: Extend the definition to a general (possibly negative-valued) measurable function via the **positive/negative part decomposition** $f=f^+-f^-$ (where $f^+=\max(f,0)$, $f^-=\max(-f,0)$, both non-negative), defining $\int f\,d\mu = \int f^+\,d\mu-\int f^-\,d\mu$ when both parts are finite.
- LO3: State (via a cross-link to the already-mastered rigorous Riemann integral) that the Lebesgue integral **genuinely generalizes** the Riemann integral — every Riemann integrable function is Lebesgue integrable with the SAME value — and that the Lebesgue integral integrates STRICTLY MORE functions, directly refuting the misconception that the two integrals are simply two different names for the identical concept, applicable to exactly the same class of functions.

## Component 2 — Prerequisite Check

Assumes mastery of `math.meas.simple-function` (a simple function $\varphi=\sum a_i\mathbb{1}_{E_i}$, and its exact finite-sum integral $\int\varphi\,d\mu=\sum a_i\mu(E_i)$).

## Component 3 — Core Explanation

**The Lebesgue integral as a supremum over simple functions**: for a non-negative measurable function $f$, define $\int f\,d\mu = \sup\{\int\varphi\,d\mu : \varphi \text{ simple}, 0\le\varphi\le f\}$ — consider EVERY simple function $\varphi$ that stays at or below $f$ everywhere, compute each such $\varphi$'s already-known (easy, finite-sum) integral, and take the SUPREMUM (least upper bound) of all these values. This directly builds the Lebesgue integral for a general function entirely out of the already-mastered simple-function integral — no new integration concept is introduced, just a new way of aggregating the easy case.

**Extending to signed functions via f = f⁺ − f⁻**: for a general (possibly negative) measurable function $f$, write $f=f^+-f^-$ where $f^+(x)=\max(f(x),0)$ (the positive part, zero wherever $f$ is negative) and $f^-(x)=\max(-f(x),0)$ (the negative part, zero wherever $f$ is positive) — both $f^+,f^-$ are non-negative measurable functions, so each has a Lebesgue integral defined via the supremum construction above. Then $\int f\,d\mu := \int f^+\,d\mu - \int f^-\,d\mu$, PROVIDED at least one of the two integrals is finite (avoiding an undefined $\infty-\infty$).

**Genuine generalization of the Riemann integral — same value, strictly more functions**: for any function that IS Riemann integrable (per `math.real.riemann-integral`'s rigorous $\inf U(f,P)=\sup L(f,P)$ criterion), the Lebesgue integral gives the EXACT SAME numeric value — this is not a coincidence but a provable fact connecting the two constructions. However, the Lebesgue integral successfully integrates functions that are NOT Riemann integrable at all (e.g. functions with a sufficiently wild discontinuity pattern that Riemann's upper/lower-sum squeeze condition fails for, yet which are still measurable) — making the Lebesgue integral a strictly LARGER, more capable theory, not merely an alternative formulation of the identical class of functions.

## Component 4 — Worked Examples

**Example 1 (LO1 — building the integral from a supremum of simple functions, concrete case)**: For $f(x)=x^2$ on $[0,1]$ (already approximated in `math.meas.simple-function`'s own Example 3 via the increasing sequence $\varphi_n$, using the infimum on each sub-interval of an $n$-piece partition), the Lebesgue integral $\int_{[0,1]}x^2\,d\mu$ is the supremum of $\int\varphi_n\,d\mu$ as $n\to\infty$ — reusing that concept's own constructed sequence directly. As the partition refines, $\int\varphi_n\,d\mu$ increases and approaches $\frac13$ (matching the already-familiar answer $\int_0^1x^2\,dx=\frac13$ from ordinary calculus), confirming the supremum construction produces the expected value.

**Example 2 (LO2 — the f⁺/f⁻ decomposition, applied directly)**: For $f(x)=x$ on $[-1,1]$: $f^+(x)=\max(x,0)$ (equals $x$ for $x\ge0$, zero for $x<0$) and $f^-(x)=\max(-x,0)$ (equals $-x$ for $x\le0$, zero for $x>0$) — both non-negative. $\int f^+\,d\mu = \int_0^1x\,dx=\frac12$ (using the Lebesgue integral's already-established agreement with ordinary integration for continuous functions, per LO3). $\int f^-\,d\mu = \int_0^1x\,dx = \frac12$ (by symmetry, integrating $-x$ over $[-1,0]$). So $\int f\,d\mu = \frac12-\frac12=0$ — matching the expected answer (the signed area under $y=x$ from $-1$ to $1$ cancels symmetrically), built entirely from two non-negative-function integrals combined by subtraction.

**Example 3 (LO3 — genuine generalization, breaking MC-1)**: Consider the (Riemann-)famous function $f(x)=\begin{cases}1 & x\in[0,1]\text{ rational}\\0 & x\in[0,1]\text{ irrational}\end{cases}$ (the Dirichlet function). This function is NOT Riemann integrable at all — every upper Darboux sum equals $1$ (rationals are dense, so every subinterval contains one, forcing the supremum on that piece to be $1$) while every lower Darboux sum equals $0$ (irrationals are also dense, forcing the infimum to be $0$) — the squeeze condition $\inf U=\sup L$ genuinely fails ($1\ne0$), so `math.real.riemann-integral`'s own criterion rules this function out entirely. But $f$ IS measurable (it's the indicator function of the rationals in $[0,1]$, a measurable — in fact measure-ZERO — set), and its Lebesgue integral is directly computable AS a simple function: $f=1\cdot\mathbb{1}_{\mathbb{Q}\cap[0,1]}$, so $\int f\,d\mu = 1\cdot\mu(\mathbb{Q}\cap[0,1]) = 1\cdot0=0$ (the rationals have Lebesgue measure zero) — a function Riemann's theory cannot handle AT ALL is integrated effortlessly by Lebesgue's theory, proving the two are not simply equivalent reformulations of the same class.

## Component 5 — Teaching Actions

### Teaching Action A01 — Building the Integral as a Supremum of Already-Known Simple Integrals (Primitive P11: Representation Shift)

State: "you already know how to integrate ANY simple function — just a finite sum. The Lebesgue integral of a harder function is DEFINED by squeezing simple functions underneath it and taking the best (largest) simple-function integral you can get." Work Example 1's direct reuse of `math.meas.simple-function`'s own approximating sequence.

### Teaching Action A02 — The f⁺/f⁻ Split for Signed Functions (Primitive P11: Representation Shift)

State: "for a function that goes negative somewhere, split it into its positive part and negative part — both are non-negative, so both already have a well-defined Lebesgue integral via the supremum construction. Subtract." Work Example 2's full computation.

### Teaching Action A03 — Genuine Generalization: A Function Riemann Cannot Touch (Primitive P28: Conflict Evidence)

Present Example 3's direct conflict: the Dirichlet function, provably NOT Riemann integrable (upper and lower Darboux sums permanently disagree), yet effortlessly Lebesgue integrable (as a simple function, using that the rationals have measure zero). State: "this isn't just a different METHOD for the same functions — Lebesgue integration reaches functions Riemann's theory has no answer for at all."

- **MC-1 hook**: ask "is the Lebesgue integral just a different name or method for computing the exact same integral Riemann integration already handles?" — a "yes" answer reveals MC-1 (believing the two theories cover an identical class of functions, missing that Lebesgue integration is a strictly larger, more capable theory).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Explain, in your own words, why the Lebesgue integral of a non-negative function is defined as a SUPREMUM rather than some other kind of limit or bound.
  2. For $f(x)=x-2$ on $[0,3]$, compute $f^+$ and $f^-$ explicitly, and use them to find $\int f\,d\mu$.
  3. Explain why the function $g(x) = \mathbb{1}_{\mathbb{Q}}(x)\cdot x$ on $[0,1]$ (equal to $x$ on rationals, $0$ on irrationals) fails to be Riemann integrable, using the upper/lower Darboux sum reasoning from Example 3.
  4. Compute the Lebesgue integral of the function $g$ from problem 3 directly, using the fact that the rationals have Lebesgue measure zero.
- **P76 (Transfer Probe, mode = cross-link probe against `math.real.riemann-integral`)**: "Recall from your `math.real.riemann-integral` lesson that Riemann integrability requires $\inf_P U(f,P) = \sup_P L(f,P)$ over all partitions $P$, and that this criterion FAILS for the Dirichlet-type function (upper sums always $1$, lower sums always $0$). (a) Explain precisely which step of the Darboux-sum construction breaks down for such a function, connecting it to the density of rationals and irrationals in any subinterval. (b) Using THIS lesson's Lebesgue framework, explain why the SAME function is trivially integrable once you recognize it as (a multiple of) an indicator function of a measure-zero set. (c) Explain why this specific example proves the Lebesgue integral is not merely a reformulation of Riemann's theory but a genuine extension — citing the KG's own framing that 'every Riemann integrable function is Lebesgue integrable with the same value,' while the converse fails for functions like this one."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | LEBESGUE-AND-RIEMANN-TREATED-AS-EQUIVALENT-THEORIES | Believing the Lebesgue integral is just a different method for computing the same integrals Riemann integration already handles, missing that it integrates a strictly larger class of functions | Foundational |
| MC-2 | POSITIVE-NEGATIVE-PART-DECOMPOSITION-MISAPPLIED | Incorrectly computing $f^+$ or $f^-$ (e.g. forgetting that both must be non-negative everywhere, or sign errors in $f^-=\max(-f,0)$) | Foundational |
| MC-3 | SUPREMUM-CONSTRUCTION-CONFUSED-WITH-A-SINGLE-APPROXIMATING-SEQUENCE | Believing the Lebesgue integral's value depends on which specific approximating sequence of simple functions is chosen, rather than recognizing it as the supremum over ALL valid simple functions below $f$ (a fixed, well-defined number regardless of which sequence is used to approach it) | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Lebesgue-Riemann Equivalence Assumption") → P41 (detect: ask whether every function integrable in one theory is automatically integrable in the other) → P64 (conceptual shift: re-walk Example 3's Dirichlet-function evidence — Riemann-uninitegrable, yet trivially Lebesgue-integrable — re-anchoring on "Lebesgue is a genuine extension, not a relabeling").
- **B02 (targets MC-2)**: P27 (name it: "Positive-Negative-Part Decomposition Error") → P41 (detect: ask a student to compute $f^-$ for a specific function and check for sign errors or a result that goes negative somewhere) → P64 (conceptual shift: re-walk Example 2's explicit computation, re-anchoring on "$f^-=\max(-f,0)$ — always non-negative by construction, zero wherever $f$ itself is already non-negative").
- **B03 (targets MC-3)**: P27 (name it: "Supremum Confused with a Single Sequence") → P41 (detect: ask whether choosing a DIFFERENT approximating sequence of simple functions could give a different Lebesgue integral value) → P64 (conceptual shift: re-anchor on "the supremum is over ALL simple functions below $f$ — it's a single, fixed number no matter which specific sequence you use to approach it; different valid sequences all converge to the same supremum").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.meas.simple-function` (the finite-sum integral this concept's supremum construction is built entirely from).
- **Unlocks**: `math.meas.convergence-theorems` (limit theorems — monotone/dominated convergence — that make the Lebesgue integral's true power evident), `math.meas.lp-space` ($L^p$ spaces built directly from Lebesgue-integrable functions).
- **Cross-link**: KG lists `math.real.riemann-integral` as a cross-link — **verified authored** via `ls docs/curriculum/blueprints/math.real.riemann-integral.md` — so P76_mode = **cross-link probe**, directly reusing that blueprint's own Darboux-sum criterion and its stated fact that continuous functions are Riemann integrable, per this corpus's established cross-link-probe convention.

## Component 8 — Teaching Notes

- estimated_hours = 7 with an expert/apply tag places this at a "3 TAs + cross-link-probe gate" tier — A01 (the supremum construction), A02 (the f⁺/f⁻ extension), and A03 (genuine generalization over Riemann) each target a distinct LO, appropriate for a foundational measure-theory concept whose payoff (integrating strictly more functions) is best demonstrated concretely.
- Example 1 was deliberately built by directly reusing `math.meas.simple-function`'s own approximating sequence for $x^2$, rather than introducing a fresh example, both to reinforce that prerequisite and to make vivid that this concept's supremum construction is not a new kind of approximation — it's the SAME sequence, now aggregated via supremum instead of merely observed as an increasing approximation.
- The Dirichlet-function example (Example 3, and the cross-link probe) was chosen as the single most famous, historically significant illustration of Lebesgue integration's genuine extension beyond Riemann's theory — its measure-zero-rationals computation is simple enough to verify directly, making MC-1's refutation as concrete as possible.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS (both) |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (math.real.riemann-integral authored → cross-link probe) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (cross-link probe against math.real.riemann-integral) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.85×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract: direct construction from the already-mastered simple-function integral) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
