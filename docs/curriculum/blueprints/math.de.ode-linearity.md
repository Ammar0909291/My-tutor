# Teaching Blueprint: Linearity of Differential Equations (`math.de.ode-linearity`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.de.ode-linearity` |
| name | Linearity of Differential Equations |
| domain | Differential Equations |
| difficulty | advanced |
| bloom | understand |
| mastery_threshold | 0.85 → MAMR = ⌈0.85×5⌉ = 5/5 |
| estimated_hours | 2 |
| requires | `math.de.ode` |
| unlocks | `math.de.linear-first-order`, `math.de.second-order-linear` |
| cross_links | `math.linalg.linear-map` (**authored** — verified via `ls`; P76_mode = cross-link probe, see Component 7) |
| CPA_entry_stage | A (Abstract) — direct classification test, grounded immediately in already-known ODE examples |
| description (KG) | An ODE is linear if it can be written as a linear combination of y and its derivatives with coefficients depending only on the independent variable. Nonlinear ODEs include products of y and its derivatives. |

## Component 1 — Learning Objectives

- LO1: Define an ODE as **linear** if it can be written as a linear combination of $y$ and its derivatives, $a_n(x)y^{(n)}+\cdots+a_1(x)y'+a_0(x)y = f(x)$, with coefficients $a_i(x)$ depending ONLY on the independent variable $x$ (never on $y$ or its derivatives), and correctly classify given ODEs as linear or nonlinear.
- LO2: Identify the specific structural features that make an ODE **nonlinear** — products of $y$ (or its derivatives) with itself or each other, $y$ appearing inside a nonlinear function (like $\sin y$ or $e^y$), or a coefficient depending on $y$ itself — and correctly locate the offending term in a given nonlinear ODE.
- LO3: Recognize that linearity is a property of the EQUATION's structure, independent of how "complicated" the coefficient functions $a_i(x)$ themselves look — an equation can have complicated coefficients (in $x$) and still be linear, while a structurally simple-looking equation can be nonlinear due to a single multiplicative or nonlinear-function term involving $y$.

## Component 2 — Prerequisite Check

Assumes mastery of `math.de.ode` (the general definition of an ordinary differential equation, and the notion of order — highest derivative present).

## Component 3 — Core Explanation

An ODE is **linear** if it can be written in the form:
$$a_n(x)y^{(n)} + a_{n-1}(x)y^{(n-1)} + \cdots + a_1(x)y' + a_0(x)y = f(x)$$
where each coefficient $a_i(x)$ depends **only on the independent variable $x$** — never on $y$ or any of its derivatives. This is precisely a **linear combination** of $y,y',y'',\ldots,y^{(n)}$ (each raised to the first power, never multiplied together, never inside a nonlinear function).

**What makes an ODE nonlinear**: any of the following disqualifies linearity:
- A **product** of $y$ (or a derivative) with itself or another derivative — e.g. $yy'$, $(y')^2$.
- $y$ (or a derivative) appearing inside a **nonlinear function** — e.g. $\sin y$, $e^{y}$, $\sqrt y$.
- A coefficient that depends on $y$ itself, rather than only on $x$ — e.g. $y\cdot y''$ has $y$ acting as a "coefficient" of $y''$, disqualifying linearity.

**Linearity is about STRUCTURE, not complexity of the $x$-coefficients**: an equation like $x^2\sin(x)\,y'' + e^x y' - \frac{1}{x}y = \cos x$ is genuinely LINEAR, despite its complicated-looking coefficients — every coefficient depends only on $x$, and $y,y',y''$ each appear to the first power, unmultiplied. Conversely, the simple-looking $y'+y^2=0$ is NONLINEAR, purely because of the single $y^2$ term.

## Component 4 — Worked Examples

**Example 1 (LO1 — a linear ODE, possibly with complicated coefficients)**: $x^3y''-2xy'+\sqrt{x}\,y = e^x$. Check: coefficients $x^3, -2x, \sqrt x$ all depend only on $x$; $y,y',y''$ each appear to the first power, no products among them. **Linear**, despite the coefficients looking complicated.

**Example 2 (LO2 — a nonlinear ODE, breaking MC-1)**: $y'' + y\,y' - 3y=0$. The term $y\cdot y'$ is a PRODUCT of $y$ and $y'$ — this single term disqualifies the entire equation from being linear, regardless of how simple the rest of the equation looks. **Nonlinear**, due specifically to the $yy'$ term.

**Example 3 (LO3 — a nonlinear ODE via a nonlinear function of y)**: $y' + \sin(y) = x$. Here $y$ appears INSIDE the nonlinear function $\sin(\cdot)$ — even though there's no product of $y$'s or derivatives with each other, wrapping $y$ inside $\sin$ still disqualifies linearity, since $\sin(y)$ cannot be written as (coefficient depending only on $x$) $\times$ $y$. **Nonlinear**, due to the $\sin(y)$ term.

## Component 5 — Teaching Actions

### Teaching Action A01 — The Linear Form and Testing an ODE (Primitive P11: Representation Shift)

State the general linear form directly: "$y$ and its derivatives, each to the first power, multiplied only by functions of $x$ — that's the entire test." Work Example 1 explicitly, checking each coefficient and each $y$-term one at a time, confirming the equation qualifies as linear DESPITE its complicated-looking $x$-dependent coefficients.

Shift to testing a nonlinear case: work Example 2, identifying the SPECIFIC term ($yy'$) that breaks linearity, rather than treating the whole equation as vaguely "too complicated."

- **MC-1 hook**: present Example 1's linear ODE with its complicated coefficients ($x^3,\sqrt x$, etc.) alongside a "simple-looking" nonlinear equation like $y'+y^2=0$, and ask "which one is linear?" — an answer based on which equation "looks simpler" (rather than checking the actual structural test) reveals MC-1 (judging linearity by overall visual complexity rather than by the precise structural criterion).

### Teaching Action A02 — Locating the Specific Nonlinear Term (Primitive P06: Contrast Pair)

**Contrast 1 (targets MC-1)**: Place Example 1 (complicated coefficients, genuinely linear) directly beside $y'+y^2=0$ (simple-looking, genuinely nonlinear). State the rule precisely: "linearity has NOTHING to do with how complicated the $x$-coefficients look — it is ENTIRELY about whether $y$ and its derivatives appear only to the first power, unmultiplied by each other, and not inside a nonlinear function."

**Contrast 2**: Work Example 2 ($yy'$, a product) and Example 3 ($\sin y$, a nonlinear function) side by side as TWO DIFFERENT ways an equation can fail to be linear — state both criteria explicitly as the complete checklist: "check for (a) any product among $y$ and its derivatives, and (b) any occurrence of $y$ or a derivative inside a non-first-power/nonlinear function — either one alone is enough to disqualify linearity."

### Teaching Action A03 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Classify $x^2y'''-\cos(x)y'+5y=x^4$ as linear or nonlinear, justifying your answer.
  2. Classify $yy''-3y'=0$ as linear or nonlinear, identifying the specific term responsible.
  3. Classify $y'+e^y=0$ as linear or nonlinear, identifying the specific term responsible.
  4. A student says "this equation has really simple-looking coefficients, so it must be linear" about $(y')^2+y=0$. Explain what is wrong with this reasoning.
- **P76 (Transfer Probe, mode = cross-link probe against `math.linalg.linear-map`)**: "Recall from your `math.linalg.linear-map` lesson that a map $T$ is linear if it satisfies $T(u+v)=T(u)+T(v)$ and $T(cv)=cT(v)$ — additivity and homogeneity. (a) Consider the 'operator' $L[y] = y''-3y'+2y$ (the left side of a linear ODE, viewed as a map from functions to functions). Verify DIRECTLY that $L$ satisfies additivity: $L[y_1+y_2]=L[y_1]+L[y_2]$ for any two functions $y_1,y_2$, using the fact that derivatives themselves satisfy $(y_1+y_2)'=y_1'+y_2'$. (b) Now consider the nonlinear expression $N[y]=y\cdot y'$ (from Example 2's equation). Show explicitly that $N[y_1+y_2]\neq N[y_1]+N[y_2]$ in general (pick simple specific functions like $y_1=x, y_2=x^2$ to demonstrate this concretely), confirming that THIS is exactly why an ODE built from $N[y]$ fails to be linear in the sense your `math.linalg.linear-map` lesson defined — 'linear ODE' and 'linear map' are the SAME underlying linearity concept, just applied to a different kind of object (functions and differential operators, rather than vectors and matrices)."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | LINEARITY-JUDGED-BY-VISUAL-COMPLEXITY | Judging whether an ODE is linear based on how visually complicated or simple it looks overall, rather than checking the precise structural criterion (coefficients depend only on $x$; $y$ and derivatives appear unmultiplied, to the first power) | Foundational |
| MC-2 | PRODUCT-OF-Y-AND-DERIVATIVE-OVERLOOKED | Failing to notice a product term like $yy'$ or $(y')^2$ when scanning an equation for linearity, especially when it's not the first term encountered | Moderate |
| MC-3 | Y-INSIDE-NONLINEAR-FUNCTION-NOT-RECOGNIZED-AS-DISQUALIFYING | Not recognizing that $y$ appearing inside a function like $\sin(y)$, $e^y$, or $\sqrt y$ disqualifies linearity, even without any explicit product of $y$-terms present | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Linearity Judged by Visual Complexity") → P41 (detect: present Example 1's complicated-coefficient linear ODE beside a simple-looking nonlinear one and ask which is linear) → P64 (conceptual shift: re-anchor on the precise structural test — check coefficients' dependence and each $y$-term's power/multiplication status, ignoring overall visual impression).
- **B02 (targets MC-2)**: P27 (name it: "Product Term Overlooked") → P41 (detect: present an equation with a $yy'$-type term embedded among several other, unambiguously linear terms, and check whether the student catches it) → P64 (conceptual shift: re-anchor on "scan EVERY term systematically — a single product term anywhere in the equation is enough to disqualify the whole thing, no matter how many other terms are fine").
- **B03 (targets MC-3)**: P27 (name it: "Nonlinear-Function Wrapping Not Recognized") → P41 (detect: present $y'+\sin(y)=x$ and ask if it's linear, checking whether the student notices the $\sin(y)$ term specifically) → P64 (conceptual shift: re-anchor on the second disqualifying criterion explicitly — $y$ or a derivative appearing inside ANY nonlinear function, not just as a product with another $y$-term).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.de.ode` (the general ODE definition and vocabulary — order, unknown function — this concept's linearity test classifies).
- **Unlocks**: `math.de.linear-first-order` (first-order linear ODEs, the simplest case of this concept's classification, with a dedicated solution method), `math.de.second-order-linear` (second-order linear ODEs, building on this concept's structural criterion at a higher order).
- **Cross-link**: KG lists `math.linalg.linear-map` as a cross-link. Verified via directory listing that `docs/curriculum/blueprints/math.linalg.linear-map.md` **is already authored** (confirmed: additivity $T(u+v)=T(u)+T(v)$ and homogeneity $T(cv)=cT(v)$). The P76 transfer probe above directly verifies that the linear-ODE operator $L[y]=y''-3y'+2y$ satisfies exactly that blueprint's additivity property, and shows the nonlinear operator $N[y]=yy'$ concretely FAILS it — genuinely connecting "linear ODE" to "linear map" as the same underlying mathematical concept (linearity of an operator on a function space) rather than two unrelated uses of the word "linear."

## Component 8 — Teaching Notes

- estimated_hours = 2 with an advanced/understand tag places this at the corpus's compact tier — 2 main TAs (A01, A02) with no separate composite TA, appropriate for a concept whose entire content is a single classification test plus its two failure modes (products, nonlinear-function-wrapping).
- MC-1 (linearity judged by visual complexity) was made this blueprint's central focus because "linear" carries an everyday connotation of "simple," directly conflicting with this concept's genuinely important lesson that linearity is a precise STRUCTURAL property entirely independent of how complicated an equation's $x$-dependent coefficients happen to look — Example 1 was deliberately constructed with maximally complicated-looking coefficients specifically to stress-test and correct this intuition.
- The cross-link probe was deliberately designed to make the "linear ODE" / "linear map" terminology connection GENUINE and verifiable rather than merely asserted — requiring the learner to actually check the additivity property for a linear differential operator and actually demonstrate its failure for a nonlinear one, using concrete functions, rather than simply being told the two concepts are "related."

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.de.ode`) |
| V-4 | unlocks concepts named accurately from KG | PASS |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (`math.linalg.linear-map` confirmed present → cross-link probe) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A03) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (cross-link probe, genuine additivity verification) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.85×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract, grounded directly in known ODE examples) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1/LO3, Ex2→LO2, Ex3→LO2) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
