# Teaching Blueprint: Rational Function (`math.func.rational-function`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.func.rational-function` |
| name | Rational Function |
| domain | Functions |
| difficulty | proficient |
| bloom | understand |
| mastery_threshold | 0.8 → MAMR = ⌈0.8×5⌉ = 4/5 |
| estimated_hours | 4 |
| requires | `math.alg.rational-expressions`, `math.func.polynomial-function` |
| unlocks | none |
| cross_links | none |
| CPA_entry_stage | C (Concrete) — analyzing one specific rational function's domain and asymptotic behavior before naming the general classification |
| description (KG) | A function $p(x)/q(x)$ where $p,q$ are polynomials and $q\ne0$; domain excludes zeros of $q$; has vertical asymptotes and possibly holes. |

## Component 1 — Learning Objectives

- LO1: Define a **rational function** $f(x)=p(x)/q(x)$ (with $p,q$ polynomial functions from `math.func.polynomial-function`) and determine its DOMAIN by finding the zeros of $q(x)$ — recognizing the domain restriction as inherited directly from division being undefined at zero, not an arbitrary rule.
- LO2: Distinguish a **vertical asymptote** (a zero of $q(x)$ that is NOT also a zero of $p(x)$, or survives after `math.alg.rational-expressions`'s own cancellation of common factors) from a **hole** (a zero of $q(x)$ that IS cancelled against a matching factor of $p(x)$) — recognizing these as genuinely different behaviors at superficially similar-looking excluded points.
- LO3 (orientation level — full end-behavior/asymptote-degree theory deferred): recognize, without full derivation, that a rational function's behavior as $x\to\pm\infty$ (horizontal asymptote, slant asymptote, or neither) is governed by comparing the DEGREES of $p$ and $q$.

## Component 2 — Prerequisite Check

Assumes mastery of `math.alg.rational-expressions` (simplifying $p(x)/q(x)$ by factoring and canceling common factors) and `math.func.polynomial-function` (polynomial functions as continuous, degree-and-leading-coefficient-governed functions).

## Component 3 — Core Explanation

**Domain exclusion is inherited from division, not an arbitrary rule**: since $f(x)=p(x)/q(x)$ literally requires dividing by $q(x)$, and division by zero is undefined, the domain of $f$ is automatically all reals EXCEPT wherever $q(x)=0$ — this is not a special new rule for rational functions, it is the same "can't divide by zero" fact already true for any expression, now applied at the function level.

**Holes versus vertical asymptotes — same zero of $q$, different actual behavior**: `math.alg.rational-expressions` already established that common factors of $p(x)$ and $q(x)$ can be cancelled. If $x=a$ is a zero of $q(x)$ that ALSO cancels against a matching factor of $p(x)$, the simplified function is well-defined and continuous near $x=a$ except for a single missing point — a **hole**: the function approaches a finite value there, it's simply undefined at that exact point. If $x=a$ is a zero of $q(x)$ that does NOT cancel (survives in the denominator after simplification), the function's magnitude grows without bound near $x=a$ — a **vertical asymptote**. Both start from "a zero of $q(x)$," but the presence or absence of a matching factor in $p(x)$ determines which of these two genuinely different behaviors occurs.

**End behavior via comparing degrees (orientation level)**: as $x\to\pm\infty$, comparing $\deg(p)$ and $\deg(q)$ determines the function's large-scale behavior: if $\deg(p)<\deg(q)$, $f(x)\to0$ (a horizontal asymptote at $y=0$); if $\deg(p)=\deg(q)$, $f(x)\to$ the ratio of leading coefficients (a horizontal asymptote at that constant); if $\deg(p)=\deg(q)+1$, there is a slant (oblique) asymptote; if $\deg(p)>\deg(q)+1$, neither a horizontal nor slant asymptote captures the behavior. Full derivation of each case is deferred beyond this concept's core scope.

## Component 4 — Worked Examples

**Example 1 (LO1 — domain determined by zeros of the denominator, breaking MC-1)**: for $f(x)=\dfrac{x+1}{x^2-4}$: the denominator $q(x)=x^2-4=(x-2)(x+2)$ has zeros at $x=2$ and $x=-2$. The domain is therefore ALL real numbers except $x=2$ and $x=-2$ — determined ENTIRELY by finding where the denominator vanishes, with no separate rule needed beyond "division by zero is undefined."

**Example 2 (LO2 — distinguishing a hole from a vertical asymptote, breaking MC-2)**: for $f(x)=\dfrac{(x-2)(x+1)}{(x-2)(x-3)}$: the denominator has zeros at $x=2$ and $x=3$. At $x=2$: the factor $(x-2)$ appears in BOTH numerator and denominator, so `math.alg.rational-expressions`'s cancellation simplifies $f$ to $\dfrac{x+1}{x-3}$ near $x=2$ (with $f(2)$ itself still undefined) — this is a HOLE at $x=2$, since the function approaches a finite value ($\frac{2+1}{2-3}=-3$) as $x\to2$. At $x=3$: the factor $(x-3)$ does NOT cancel (no matching factor in the numerator), so $f$ genuinely blows up near $x=3$ — a VERTICAL ASYMPTOTE. Both $x=2$ and $x=3$ start as "a zero of the denominator," but only one is a genuine asymptote.

**Example 3 (LO3, orientation level — end behavior via degree comparison, breaking MC-3)**: contrast $f(x)=\dfrac{1}{x^2-4}$ ($\deg(p)=0<\deg(q)=2$, so $f(x)\to0$ as $x\to\pm\infty$ — horizontal asymptote at $y=0$) against $g(x)=\dfrac{2x^2+1}{x^2-4}$ ($\deg(p)=\deg(q)=2$, so $g(x)\to\frac{2}{1}=2$ — horizontal asymptote at $y=2$, the ratio of leading coefficients) against $h(x)=\dfrac{x^3+1}{x^2-4}$ ($\deg(p)=3=\deg(q)+1$, so $h$ has a SLANT asymptote rather than a horizontal one). All three share the same denominator, isolating the numerator's degree as the single variable determining which end-behavior case applies.

## Component 5 — Teaching Actions

### Teaching Action A01 — Domain Exclusion Is Just "No Division By Zero," Applied to a Function (Primitive P11: Representation Shift)

State: "the domain restriction on a rational function isn't a special new rule — it's the exact same 'can't divide by zero' fact you already know, just applied by finding where the denominator equals zero." Walk Example 1's direct factoring and zero-finding.

- **MC-1 hook**: ask "is determining a rational function's domain a special new procedure distinct from the ordinary 'division by zero is undefined' fact?" — a "yes" answer reveals MC-1 (missing that domain exclusion is inherited directly from division, applied via finding the denominator's zeros).

### Teaching Action A02 — A Zero of the Denominator Isn't Automatically an Asymptote (Primitive P28: Conflict Evidence)

Present Example 2's direct evidence: $x=2$ and $x=3$ are BOTH zeros of the denominator, yet only $x=3$ produces a vertical asymptote — $x=2$ is a hole, since its factor cancels. State: "a zero of the denominator only becomes a vertical asymptote if it DOESN'T also cancel against the numerator — otherwise, it's a hole, a genuinely different (much milder) behavior."

- **MC-2 hook**: ask "does every zero of a rational function's denominator automatically produce a vertical asymptote?" — a "yes" answer reveals MC-2 (missing that a cancelling factor produces a hole instead, a finite-limit behavior rather than a blow-up).

### Teaching Action A03 — End Behavior Depends on Comparing Degrees, Not Just "Both Are Polynomials" (Primitive P06: Contrast Pair)

Contrast $f,g,h$ from Example 3 — identical denominators, but three different end behaviors purely from varying the numerator's degree. State: "having a polynomial over a polynomial doesn't by itself tell you the end behavior — comparing the numerator's and denominator's DEGREES is what determines whether you get a horizontal asymptote, a slant asymptote, or neither."

- **MC-3 hook**: ask "is a rational function's behavior as $x\to\pm\infty$ determined just by both $p$ and $q$ being polynomials, regardless of their degrees?" — a "yes" answer reveals MC-3 (missing that comparing $\deg(p)$ to $\deg(q)$ is what actually determines horizontal-, slant-, or no-asymptote behavior).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Find the domain of $f(x)=\dfrac{x-3}{x^2-9}$ by locating the zeros of the denominator.
  2. For $f(x)=\dfrac{(x-1)(x+4)}{(x-1)(x-5)}$, determine which excluded point is a hole and which is a vertical asymptote, and justify each classification.
  3. Compare the end behavior of $f(x)=\dfrac{3}{x-1}$ and $g(x)=\dfrac{3x}{x-1}$ by comparing degrees, without graphing.
  4. Explain, in one or two sentences, why a hole and a vertical asymptote can both arise from "a zero of the denominator" yet represent genuinely different behaviors.
- **P76 (Transfer Probe, mode = independence)**: "A cost-per-unit model is given by $C(x)=\dfrac{(x-10)(x+50)}{(x-10)(x-2)}$, where $x$ is the number of units produced. (a) Determine the domain, and classify the excluded point $x=10$ as a hole or vertical asymptote, justifying your answer via cancellation. (b) Classify the excluded point $x=2$ similarly. (c) Compare the numerator's and denominator's degrees to determine the model's long-run behavior as production $x$ grows large, and explain what this predicts economically (e.g., cost per unit approaching a stable constant, growing without bound, or something else)."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | DOMAIN-RESTRICTION-ASSUMED-SPECIAL-RULE | Believing determining a rational function's domain is a special new procedure, missing that it is inherited directly from "division by zero is undefined," applied by finding the denominator's zeros | Foundational |
| MC-2 | DENOMINATOR-ZERO-ASSUMED-TO-ALWAYS-BE-ASYMPTOTE | Believing every zero of the denominator automatically produces a vertical asymptote, missing that a cancelling factor produces a hole instead | High |
| MC-3 | END-BEHAVIOR-ASSUMED-INDEPENDENT-OF-DEGREE | Believing a rational function's end behavior depends only on both parts being polynomials, missing that comparing $\deg(p)$ to $\deg(q)$ determines horizontal-, slant-, or no-asymptote behavior | Moderate |

- **B01 (targets MC-1)**: P27 (name it: "Domain Restriction Assumed Special Rule") → P41 (detect: ask whether finding a rational function's domain is a special new procedure) → P64 (conceptual shift: re-walk Example 1's direct factoring/zero-finding, re-anchoring on "domain exclusion is exactly the ordinary 'no division by zero' fact, applied to a function").
- **B02 (targets MC-2)**: P27 (name it: "Denominator Zero Assumed to Always Be Asymptote") → P41 (detect: ask whether every denominator zero automatically produces a vertical asymptote) → P64 (conceptual shift: re-walk Example 2's hole-versus-asymptote contrast, re-anchoring on "a cancelling factor produces a hole, a genuinely milder behavior than a blow-up").
- **B03 (targets MC-3)**: P27 (name it: "End Behavior Assumed Independent of Degree") → P41 (detect: ask whether end behavior depends only on both parts being polynomials) → P64 (conceptual shift: re-walk Example 3's three-way degree-comparison contrast, re-anchoring on "comparing degrees is what determines the specific end-behavior case").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.alg.rational-expressions` (simplifying $p(x)/q(x)$ via factoring and cancellation, directly reused to distinguish holes from vertical asymptotes) and `math.func.polynomial-function` (the polynomial functions $p,q$ this concept combines via division).
- **Unlocks**: none listed in the KG for this concept.
- **Cross-link**: none listed in the KG for this concept.

## Component 8 — Teaching Notes

- estimated_hours = 4 with a proficient/understand tag supports the "3 TAs + gate" tier, with LO1 and LO2 given full computational depth (domain-finding and the hole-versus-asymptote classification) and LO3 kept orientation-level, appropriately surveying end-behavior cases via degree comparison without deriving the precise slant-asymptote formula.
- **Division of labor**: `math.alg.rational-expressions` owns the general factoring/cancellation machinery; this concept owns applying that machinery SPECIFICALLY to classify excluded points as holes versus vertical asymptotes, and to determine domain and end behavior at the function level — deliberately reusing the same denominator across Example 3's three variants to isolate degree comparison as the single relevant variable.
- Example 2's deliberate choice of a rational function with one cancelling and one non-cancelling factor in the SAME expression was chosen so the hole-versus-asymptote contrast is visible within a single worked problem, rather than requiring two unrelated examples.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS (none listed) |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (none listed in KG) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.8×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Concrete: one specific function's domain/asymptotic analysis precedes the general classification) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
