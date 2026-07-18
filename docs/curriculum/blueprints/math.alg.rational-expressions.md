# Teaching Blueprint: Rational Expressions (`math.alg.rational-expressions`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.alg.rational-expressions` |
| name | Rational Expressions |
| domain | Algebra |
| difficulty | proficient |
| bloom | apply |
| mastery_threshold | 0.8 → MAMR = ⌈0.8×5⌉ = 4/5 |
| estimated_hours | 10 |
| requires | `math.alg.polynomial`, `math.alg.factoring` |
| unlocks | `math.alg.rational-equations`, `math.func.rational-function` |
| cross_links | `math.func.rational-function` (**not yet authored** — verified via `ls`; P76_mode = independence, see Component 7) |
| CPA_entry_stage | C (Concrete) — numeric-fraction simplification recalled before symbolic polynomial-fraction simplification |
| description (KG) | Fractions p(x)/q(x) where p and q are polynomials with q ≠ 0; simplified by factoring and canceling common factors. |

## Component 1 — Learning Objectives

- LO1: Define a rational expression as $\frac{p(x)}{q(x)}$ with $p,q$ polynomials and $q(x)\neq 0$, and determine its **domain restrictions** (the values of $x$ that make the denominator zero and must therefore be excluded).
- LO2: Simplify a rational expression by fully **factoring** numerator and denominator and **canceling common factors**, while correctly tracking that canceling a factor does *not* remove the domain restriction it created — the simplified expression is only equivalent to the original *away from* the excluded values.
- LO3: Perform the four arithmetic operations (+, −, ×, ÷) on rational expressions, applying the same procedures as numeric fraction arithmetic (common denominators for +/−, multiply-straight-across then simplify for ×, multiply-by-reciprocal for ÷) but with polynomial factoring replacing simple integer factoring.

## Component 2 — Prerequisite Check

Assumes mastery of `math.alg.polynomial` (polynomial expressions, degree) and `math.alg.factoring` (factoring polynomials into products of lower-degree polynomials).

## Component 3 — Core Explanation

A **rational expression** is a fraction $\frac{p(x)}{q(x)}$ where $p(x)$ and $q(x)$ are polynomials and $q(x)\neq 0$. Just as $\frac{6}{0}$ is undefined for numbers, $\frac{p(x)}{q(x)}$ is undefined at any $x$ making $q(x)=0$ — these excluded values form the expression's **domain restriction**.

**Simplifying**: factor both numerator and denominator completely, then cancel any factor common to both. E.g. $\frac{x^2-4}{x^2-x-6} = \frac{(x-2)(x+2)}{(x-3)(x+2)} = \frac{x-2}{x-3}$ (canceling the common $(x+2)$ factor). **Crucially**, the domain restriction from the *original* denominator persists: the original had $x\neq 3$ AND $x\neq -2$ (both factors of the original denominator set to zero); the simplified form $\frac{x-2}{x-3}$ only visibly shows $x\neq 3$ — but $x=-2$ must still be excluded, since it was never in the original domain to begin with, even though the simplified expression no longer displays that restriction syntactically.

**Arithmetic operations** mirror numeric fraction rules exactly, with polynomial factoring in place of integer factoring:
- **Multiplication**: $\frac{p_1}{q_1}\times\frac{p_2}{q_2} = \frac{p_1p_2}{q_1q_2}$, then factor and cancel.
- **Division**: $\frac{p_1}{q_1}\div\frac{p_2}{q_2} = \frac{p_1}{q_1}\times\frac{q_2}{p_2}$ (multiply by the reciprocal).
- **Addition/subtraction**: requires a common denominator, typically the LCD (least common denominator) built from the factored form of each denominator, exactly as with numeric fractions.

## Component 4 — Worked Examples

**Example 1 (LO1/LO2 — simplifying, domain restriction survives cancellation)**: Simplify $\frac{x^2-9}{x^2+x-12}$ and state the domain restriction.
Factor: $\frac{(x-3)(x+3)}{(x+4)(x-3)}$. Cancel $(x-3)$: result $\frac{x+3}{x+4}$. **Domain restriction**: original denominator zero at $x=-4$ and $x=3$ — both excluded, even though the simplified form $\frac{x+3}{x+4}$ only shows $x\neq -4$ visibly. Full correct domain statement: $x\neq -4, 3$.

**Example 2 (LO3 — multiplication)**: $\frac{x+2}{x-1}\times\frac{x^2-1}{x^2-4} = \frac{(x+2)(x-1)(x+1)}{(x-1)(x-2)(x+2)}$ (factoring $x^2-1=(x-1)(x+1)$, $x^2-4=(x-2)(x+2)$). Cancel $(x+2)$ and $(x-1)$: result $\frac{x+1}{x-2}$.

**Example 3 (LO3 — addition with unlike denominators)**: $\frac{3}{x-2} + \frac{5}{x+1}$. LCD $=(x-2)(x+1)$. Rewrite: $\frac{3(x+1)}{(x-2)(x+1)} + \frac{5(x-2)}{(x-2)(x+1)} = \frac{3(x+1)+5(x-2)}{(x-2)(x+1)} = \frac{3x+3+5x-10}{(x-2)(x+1)} = \frac{8x-7}{(x-2)(x+1)}$.

## Component 5 — Teaching Actions

### Teaching Action A01 — Rational Expressions as Generalized Numeric Fractions (Primitive P11: Representation Shift)

Start concrete/numeric: simplify $\frac{18}{24}$ by factoring ($\frac{2\cdot 3^2}{2^3\cdot 3}$) and canceling common factors ($2$ and one $3$), landing on $\frac{3}{4}$. State: "the exact same idea — factor completely, cancel what's shared — applies when the numerator and denominator are polynomials instead of integers." Shift representation directly to Example 1: factor $x^2-9$ and $x^2+x-12$, cancel $(x-3)$, land on $\frac{x+3}{x+4}$.

Introduce domain restrictions explicitly at this stage: "before you simplify, ask what values of $x$ make the ORIGINAL denominator zero — those are permanently excluded, and canceling a factor doesn't bring them back."

- **MC-1 hook**: after simplifying Example 1 to $\frac{x+3}{x+4}$, ask "what's the domain restriction?" — an answer of "just $x\neq -4$" (missing $x=3$) reveals MC-1 (believing the simplified expression's own denominator fully determines the domain, rather than the original, pre-cancellation denominator).

### Teaching Action A02 — The Four Operations, Contrasted with Numeric Fraction Rules (Primitive P06: Contrast Pair)

**Contrast 1 (multiplication/division, targets MC-2)**: Place numeric $\frac{2}{3}\times\frac{5}{4} = \frac{10}{12}=\frac{5}{6}$ beside Example 2's rational multiplication. Show the identical structure: multiply straight across, THEN factor and cancel — not the reverse. Flag MC-2 directly: some students try to cancel factors *before* fully multiplying out or *across* unrelated numerator/denominator pairs that don't actually share a factor (e.g. wrongly "canceling" an $x$ term that appears added, not multiplied, in a sum) — state clearly: "you can only cancel a factor that is truly a MULTIPLIED factor of both the whole numerator and the whole denominator, never a term inside a sum."

**Contrast 2 (addition/subtraction, targets MC-3)**: Place numeric $\frac{1}{4}+\frac{1}{6}$ (LCD 12) beside Example 3's rational addition (LCD $(x-2)(x+1)$). Show the identical LCD-building process: factor each denominator, take the LCD as the product of all distinct factors (at their highest needed power), rewrite each fraction over the LCD, then add numerators. Directly break MC-3 (attempting to add rational expressions by adding numerators and denominators separately, i.e. $\frac{a}{b}+\frac{c}{d}\stackrel{?}{=}\frac{a+c}{b+d}$) by showing this gives a wrong answer even in the simple numeric case ($\frac14+\frac16 \neq \frac{1+1}{4+6}=\frac{2}{10}=\frac15$, since the correct answer is $\frac{5}{12}$) — the rational-expression case inherits the exact same requirement for a genuine common denominator.

### Teaching Action A03 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Simplify $\frac{x^2-16}{x^2+3x-4}$ and state the full domain restriction.
  2. Compute $\frac{x-3}{x+5}\times\frac{x^2+2x-15}{x^2-9}$, simplifying fully.
  3. Compute $\frac{2}{x+3} - \frac{4}{x-1}$, expressing the result as a single simplified rational expression.
  4. A student simplifies $\frac{x^2-1}{x-1}$ to $x+1$ and claims the domain is "all real numbers" since $x+1$ has no denominator. Identify and correct the error.
- **P76 (Transfer Probe, mode = independence)**: "A pharmacology model expresses a drug's blood concentration ratio as $\frac{2d}{d^2+5d+6}$ where $d$ is the dose in mg, and a separate elimination-rate ratio as $\frac{d+2}{d+3}$. (a) Simplify the concentration ratio expression fully by factoring, and state its domain restriction in terms of physically meaningful dose values. (b) Multiply the two ratios together (concentration ratio × elimination-rate ratio) and simplify the product. (c) Explain, using this lesson's domain-restriction rule, why the ORIGINAL concentration expression's excluded dose value(s) must still be excluded from the final simplified product, even if that value no longer appears as a zero of the simplified denominator." *Component 7 note: this scenario was chosen independently rather than cross-linking to `math.func.rational-function`, since that blueprint does not yet exist.*
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | DOMAIN-FROM-SIMPLIFIED-FORM-ONLY | Determining the domain restriction from the simplified expression's denominator rather than the original, pre-cancellation denominator, missing values canceled away | Foundational |
| MC-2 | CANCELING-ADDED-TERMS | Attempting to cancel a term that is added (not multiplied) within the numerator or denominator, treating it as if it were a shared multiplicative factor | Foundational |
| MC-3 | ADD-NUMERATORS-AND-DENOMINATORS-SEPARATELY | Adding/subtracting rational expressions by combining numerators and denominators independently ($\frac{a}{b}+\frac{c}{d}\to\frac{a+c}{b+d}$) instead of finding a genuine common denominator | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Post-Cancellation Domain Error") → P41 (detect: ask for the domain of a simplified rational expression whose original denominator had a now-canceled factor — an incomplete answer reveals MC-1) → P64 (conceptual shift: re-anchor on "the domain is a property of the ORIGINAL expression as given — simplification changes the expression's appearance, never its domain").
- **B02 (targets MC-2)**: P27 (name it: "Additive-Term Cancellation") → P41 (detect: present $\frac{x+3}{x}$ and ask if the $x$ terms cancel to give $\frac{3}{1}=3$ — an incorrect "yes" reveals MC-2) → P64 (conceptual shift: re-derive from the numeric analogy — you'd never claim $\frac{7+3}{7}=3$ by "canceling the 7s"; the same restriction (only cancel true multiplicative factors of the WHOLE numerator/denominator) applies here).
- **B03 (targets MC-3)**: P27 (name it: "Separate Numerator/Denominator Addition") → P41 (detect: ask the student to add two rational expressions with different denominators and check whether they combine numerators/denominators independently rather than finding an LCD) → P64 (conceptual shift: re-derive from the numeric counterexample $\frac14+\frac16\neq\frac{2}{10}$, confirming the LCD procedure is required, not optional, for both numeric and rational-expression addition).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.alg.polynomial` (the numerator/denominator building blocks), `math.alg.factoring` (the essential tool for both simplification and LCD-building).
- **Unlocks**: `math.alg.rational-equations` (solving equations involving rational expressions builds directly on domain-restriction awareness and simplification here), `math.func.rational-function` (the function-theoretic treatment — asymptotes, holes, end behavior — of rational expressions as functions).
- **Cross-link**: KG lists `math.func.rational-function` as a cross-link. Verified via directory listing that no blueprint yet exists at `docs/curriculum/blueprints/math.func.rational-function.md`. Per the established P76_mode rule, this blueprint uses **independence** mode. A future revision, once that concept is authored, may add a genuine cross-link probe connecting this concept's domain-restriction analysis directly to that concept's vertical-asymptote-vs-removable-hole distinction (the exact same "canceled factor vs. surviving factor" logic reappears there as the hole/asymptote distinction).

## Component 8 — Teaching Notes

- estimated_hours = 10 with a proficient/apply tag places this at the corpus's denser end — A01 (simplification + domain restrictions), A02 (all four arithmetic operations via direct numeric-fraction contrast), and the gate reflect that this concept genuinely carries substantial procedural breadth (simplification, all four operations) even though no single piece is conceptually exotic; the numeric-fraction-analogy structure of A02 was chosen specifically to compress two operation-pairs (×÷ and +−) into one teaching action via direct contrast with already-fluent numeric fraction arithmetic, rather than needing four separate operation-specific TAs.
- MC-1 (domain-from-simplified-form-only) was given Foundational severity and placed first in both the registry and A01's hook, ahead of the arithmetic-operation misconceptions, because it is the single most common and consequential error pattern in this content area — students who simplify correctly but state the domain incorrectly produce answers that look right but are subtly wrong in a way immediate visual inspection of the final simplified form cannot catch.
- The transfer probe's pharmacology framing was deliberately chosen to make the domain-restriction persistence rule (part (c)) carry real consequence — an excluded dose value in a real pharmacological model is not a mere algebraic technicality but a genuine "this input is physically/mathematically invalid" fact that must survive simplification.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (both) |
| V-4 | unlocks concepts named accurately from KG | PASS |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (`math.func.rational-function` confirmed absent → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A03) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.8×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Concrete: numeric fraction recall before symbolic case) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1/LO2, Ex2→LO3, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
