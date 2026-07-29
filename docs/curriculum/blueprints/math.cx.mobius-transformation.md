# Teaching Blueprint: Möbius Transformation (`math.cx.mobius-transformation`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.cx.mobius-transformation` |
| name | Möbius Transformation |
| domain | Complex Analysis |
| difficulty | expert |
| bloom | apply |
| mastery_threshold | 0.8 → MAMR = ⌈0.8×5⌉ = 4/5 |
| estimated_hours | 6 |
| requires | `math.cx.conformal-mapping` |
| unlocks | none |
| cross_links | none |
| CPA_entry_stage | A (Abstract) — expert learner already fluent in conformal mappings and angle-preservation; Möbius transformations are the foundational family of conformal automorphisms |
| description (KG) | f(z) = (az+b)/(cz+d) with ad−bc≠0. Maps circles and lines to circles and lines. Three parameters determine a Möbius transformation (three-point normalization). Forms the group PGL(2,ℂ). Unique map sending three prescribed points to three others. |

## Component 1 — Learning Objectives

- LO1: State the **definition** of a Möbius transformation — $f(z)=(az+b)/(cz+d)$ with $a,b,c,d\in\mathbb{C}$, $ad-bc\neq0$ — and correctly identify the **group structure**: composition of two Möbius transformations is Möbius, the inverse $f^{-1}(z)=(dz-b)/(-cz+a)$ is Möbius, and the family forms the group $\mathrm{PGL}(2,\mathbb{C})$ (invertible $2\times2$ complex matrices modulo scalar multiples).
- LO2: Apply the **circle-and-line preservation property** — Möbius transformations map circles and straight lines (viewed as "generalized circles" on the Riemann sphere $\widehat{\mathbb{C}}$) to circles and straight lines — and use this to compute the image of a given circle or line under a Möbius transformation.
- LO3: Construct the **unique Möbius transformation** sending three prescribed distinct points $z_1,z_2,z_3$ to three prescribed distinct points $w_1,w_2,w_3$ (using the cross-ratio formula), and recognize the **three-point normalization** that determines a Möbius transformation exactly.

## Component 2 — Prerequisite Check

Assumes mastery of `math.cx.conformal-mapping` (conformal maps, angle-preservation, the Riemann sphere $\widehat{\mathbb{C}}=\mathbb{C}\cup\{\infty\}$, and the basic idea that holomorphic bijections are conformal).

## Component 3 — Core Explanation

**The Möbius transformation** $f(z)=\frac{az+b}{cz+d}$ (with $ad-bc\neq0$) is the most important family of conformal maps. Defined on $\widehat{\mathbb{C}}$ by extending: $f(\infty)=a/c$ (if $c\neq0$) and $f(-d/c)=\infty$; when $c=0$, $f$ is an affine map $f(z)=(a/d)z+(b/d)$ with $f(\infty)=\infty$. The condition $ad-bc\neq0$ ensures $f$ is injective (if $ad=bc$ then $f$ is constant).

**Group structure — $\mathrm{PGL}(2,\mathbb{C})$**: composition of Möbius transformations corresponds to matrix multiplication of $\begin{pmatrix}a&b\\c&d\end{pmatrix}$, and the inverse of $f$ corresponds to inverting the matrix. Since scalar multiples of the matrix give the same transformation ($\lambda a,\lambda b,\lambda c,\lambda d$ give the same $f$), the group is $\mathrm{PGL}(2,\mathbb{C})=\mathrm{GL}(2,\mathbb{C})/\mathbb{C}^*$.

**Circle-and-line preservation**: on $\widehat{\mathbb{C}}$, straight lines are "circles through $\infty$." In this unified view, Möbius transformations map "generalized circles" (circles or lines) to generalized circles. Proof: decompose any Möbius transformation into translations ($z\mapsto z+b$), scalings ($z\mapsto az$), and the inversion $z\mapsto1/z$; translations and scalings visibly preserve circles/lines; the inversion maps circles and lines to circles and lines (by direct verification using $|z|^2=z\bar{z}$ and the equation of a circle $A|z|^2+Bx+Cy+D=0$). Since composition preserves the property, so does any Möbius transformation.

**Three-point normalization**: a Möbius transformation has three free complex parameters ($(a:b:c:d)$ modulo scaling, giving 3 complex degrees of freedom). Prescribing the images of THREE distinct points $z_1\to w_1$, $z_2\to w_2$, $z_3\to w_3$ uniquely determines the transformation. The explicit formula uses the **cross-ratio**: $(z,z_1;z_2,z_3)=\frac{(z-z_2)(z_1-z_3)}{(z-z_3)(z_1-z_2)}$ is preserved by all Möbius transformations. The unique $f$ with $f(z_1)=w_1$, $f(z_2)=w_2$, $f(z_3)=w_3$ is found by solving $(f(z),w_1;w_2,w_3)=(z,z_1;z_2,z_3)$.

## Component 4 — Worked Examples

**Example 1 (LO1 — group structure, breaking MC-1)**: Let $f(z)=(z+1)/(z-1)$ and $g(z)=2z/(z+3)$. Compute $g\circ f$: $(g\circ f)(z)=\frac{2\cdot\frac{z+1}{z-1}}{\frac{z+1}{z-1}+3}=\frac{2(z+1)}{(z+1)+3(z-1)}=\frac{2(z+1)}{4z-2}=\frac{z+1}{2z-1}$. Matrix multiplication: $\begin{pmatrix}2&0\\1&3\end{pmatrix}\begin{pmatrix}1&1\\1&-1\end{pmatrix}=\begin{pmatrix}2&2\\4&-2\end{pmatrix}$, giving $(2z+2)/(4z-2)=(z+1)/(2z-1)$ — matches. Inverse of $f$: $f^{-1}(z)=(dz-b)/(-cz+a)=(1\cdot z-1)/(-1\cdot z+1)=(z-1)/(-z+1)=-(z-1)/(z-1)$... wait, $a=1,b=1,c=1,d=-1$, so $f^{-1}(z)=(-1\cdot z-1)/(-1\cdot z+1)=(-z-1)/(-z+1)=(z+1)/(z-1)=f(z)$. So $f$ is its own inverse — an **involution** ($f^2=\mathrm{id}$).

**Example 2 (LO2 — circle-and-line preservation applied)**: Find the image of the circle $|z|=1$ under $f(z)=(z-i)/(z+i)$. Approach: find the images of three points on $|z|=1$: $f(1)=(1-i)/(1+i)=(1-i)^2/2=-i$; $f(-1)=(-1-i)/(-1+i)=(-1-i)^2/(-2)=(-2i)/(-2)=i\cdot(-1-i)^2/2$... let's compute directly: $(-1-i)/(-1+i)\cdot(-1-i)/(-1-i)=(1+i)^2/(1+1)=(2i)/2=i$; $f(i)=(i-i)/(i+i)=0$. So $|z|=1$ maps through $-i\to0\to i$ — these three image points lie on the imaginary axis (the line $\mathrm{Re}(w)=0$). By circle-and-line preservation, the image of $|z|=1$ is a generalized circle through $\{-i,0,i\}$ — that's the imaginary axis (a line through 0). Verify: $f(\infty)=(1)/(1)=1$ (not on the imaginary axis), confirming the circle (which passes through $\infty$ in $\widehat{\mathbb{C}}$) maps to the imaginary axis (a line = circle through $\infty$ in $\widehat{\mathbb{C}}$). This transformation maps the unit disk to the left half-plane $\mathrm{Re}(w)<0$.

**Example 3 (LO3 — three-point normalization via cross-ratio)**: Find the unique Möbius transformation $f$ with $f(0)=1$, $f(1)=0$, $f(\infty)=\infty$. The cross-ratio formula: $(f(z),1;0,\infty)=(z,0;1,\infty)$. Compute the right side: $(z,0;1,\infty)=\frac{(z-1)(0-\infty)}{(z-\infty)(0-1)}$; interpreting the $\infty$ terms as the limit $\to(z-1)/z\cdot(-1)/(-1)=(z-1)/z$. Left side: $(w,1;0,\infty)=(w-0)(1-\infty)/((w-\infty)(1-0))\to(w-0)/1\cdot(1/(w))\to1/w$... let me use a cleaner approach. Three-point normalization: $f$ sends $0\to1$, $1\to0$, $\infty\to\infty$. Since $f(\infty)=\infty$, we need $c=0$, so $f(z)=(a/d)z+(b/d)$. From $f(0)=b/d=1$: $b=d$. From $f(1)=a/d+1=0$: $a/d=-1$, so $a=-d$. Thus $f(z)=-z+1=1-z$. Verify: $f(0)=1$, $f(1)=0$, $f(\infty)=\infty$. ✓ The Möbius transformation $1-z$ (reflection in the midpoint $1/2$) is determined uniquely by these three prescriptions.

## Component 5 — Teaching Actions

### Teaching Action A01 — Definition, Group Structure, and Matrix Correspondence (Primitive P11: Representation Shift)

Define $f(z)=(az+b)/(cz+d)$, $ad-bc\neq0$. Show the matrix representation: composition = matrix multiplication, inverse = matrix inverse. Work the involution example from Example 1. Emphasize: "the group $\mathrm{PGL}(2,\mathbb{C})$ encodes ALL conformal automorphisms of $\widehat{\mathbb{C}}$ — every biholomorphic map from $\widehat{\mathbb{C}}$ to itself is Möbius."

- **MC-1 hook**: ask "is the composition of two Möbius transformations always a Möbius transformation, and how do you compute it?" — a "not always" or "no obvious formula" answer reveals MC-1 (missing the matrix-multiplication correspondence that makes composition a direct algebraic operation).

### Teaching Action A02 — Circle-and-Line Preservation (Primitive P06: Contrast Pair)

Decompose a general Möbius transformation into translations, scalings, and the inversion $z\mapsto1/z$. Show each type preserves generalized circles. Work Example 2 in full: trace the unit circle to the imaginary axis under $(z-i)/(z+i)$. Contrast with a non-Möbius map (e.g., $z^2$) that sends the circle $|z|=1$ to itself but does NOT preserve all circles (the circle $|z-0.5|=0.5$ maps to a non-circle under $z^2$).

### Teaching Action A03 — Three-Point Normalization and Cross-Ratio (Primitive P25: Deductive)

State the three-point uniqueness theorem. Define the cross-ratio $(z,z_1;z_2,z_3)$. Work Example 3: three prescribed values uniquely pin down $f$ in two steps (use the constraints $f(z_i)=w_i$ to solve for $a/d$, $b/d$ with $c=0$ when $\infty$ is prescribed). Emphasize: "three points, not two and not four — a Möbius transformation has exactly three complex degrees of freedom."

- **MC-2 hook**: ask "how many points does it take to uniquely determine a Möbius transformation, and why not two or four?" — a "two" or "four" answer reveals MC-2 (missing the count of three free parameters in $\mathrm{PGL}(2,\mathbb{C})$).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Write down the inverse of the Möbius transformation $f(z)=(3z+2)/(z-1)$ and verify that $f\circ f^{-1}=\mathrm{id}$ using both the formula and the matrix representation.
  2. Find the image of the real line (the set $\mathrm{Im}(z)=0$) under $f(z)=i(1-z)/(1+z)$ (the Cayley map). Classify the image as a circle or line.
  3. Find the unique Möbius transformation sending $0\to i$, $1\to0$, $i\to1$, expressing your answer in standard form $f(z)=(az+b)/(cz+d)$.
  4. A Möbius transformation satisfies $f(f(z))=z$ for all $z$ (an involution). What constraint does this impose on the matrix $\begin{pmatrix}a&b\\c&d\end{pmatrix}$, and give a nontrivial example (other than $f(z)=z$)?
- **P76 (Transfer Probe, mode = independence)**: "The upper half-plane $\mathbb{H}=\{z:\mathrm{Im}(z)>0\}$ and the unit disk $\mathbb{D}=\{z:|z|<1\}$ are conformally equivalent via the Cayley map $f(z)=(z-i)/(z+i)$. (a) The automorphism group of $\mathbb{D}$ consists exactly of Möbius transformations of the form $f(z)=e^{i\theta}(z-a)/(1-\bar{a}z)$ with $|a|<1$ (Blaschke factors). Using this lesson's three-point normalization, explain why prescribing where THREE points of $\partial\mathbb{D}$ go under an automorphism of $\mathbb{D}$ uniquely determines the automorphism — even though the formula has two parameters ($\theta$ and $a$). (b) In hyperbolic geometry, the Poincaré disk model uses the unit disk with the metric $ds=2|dz|/(1-|z|^2)$. The isometries of this metric are exactly the automorphisms of $\mathbb{D}$ above. Using this lesson's group structure, explain why the isometry group of the Poincaré disk is a group (closed under composition and inverse), and identify what algebraic structure the matrix representation gives it."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | MOBIUS-COMPOSITION-NOT-SYSTEMATIC | Believing there is no systematic algebraic formula for composing Möbius transformations, missing the matrix-multiplication correspondence that makes composition a direct 2×2 matrix product | Foundational |
| MC-2 | MOBIUS-DETERMINED-BY-TWO-OR-FOUR-POINTS | Believing a Möbius transformation is determined by two points (underdetermined) or requires four points (overdetermined), missing that exactly three free parameters → exactly three prescribed image points uniquely determine the map | Foundational |
| MC-3 | CIRCLE-PRESERVATION-MEANS-CIRCLES-ONLY | Believing circle-and-line preservation means Möbius transformations always send circles to circles (not lines), missing the unified Riemann sphere perspective where lines ARE circles (circles through ∞) and the theorem applies to generalized circles | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Möbius Composition Not Systematic") → P41 (detect: ask how to compute $(g\circ f)(z)$ for two Möbius transformations without substituting algebraically) → P64 (conceptual shift: demonstrate the matrix correspondence — identify the $2\times2$ matrices for $f$ and $g$, multiply them, read off the new Möbius transformation — faster and less error-prone than algebraic substitution).
- **B02 (targets MC-2)**: P27 (name it: "Möbius Determined by Two or Four Points") → P41 (detect: ask how many points determine a Möbius transformation and why) → P64 (conceptual shift: count the parameters — $(a:b:c:d)$ mod scalar has 3 complex degrees of freedom; each point condition $f(z_i)=w_i$ imposes 1 complex constraint; so exactly 3 constraints are needed for a unique solution — re-derive for $f(z)=z+1$ that it has only 2 real parameters after fixing one point, while fixing 3 pins it).
- **B03 (targets MC-3)**: P27 (name it: "Circle Preservation Means Circles Only") → P41 (detect: ask what happens to the real line — a line — under the Cayley map $f(z)=(z-i)/(z+i)$) → P64 (conceptual shift: work Example 2 — the unit circle maps to the imaginary axis (a line); introduce the Riemann sphere where lines = circles through $\infty$, so "circle-and-line preservation" is really "generalized circle preservation" and the theorem is symmetric between circles and lines).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.cx.conformal-mapping` (conformal maps, angle-preservation, the Riemann sphere $\widehat{\mathbb{C}}$, and the idea of biholomorphic maps — Möbius transformations are the conformal automorphisms of $\widehat{\mathbb{C}}$).
- **Unlocks**: none listed in the KG for this concept.
- **Cross-link**: KG lists no cross-links for this concept.

## Component 8 — Teaching Notes

- estimated_hours = 6 with an expert/apply bloom tag and mastery_threshold = 0.8 (MAMR 4/5) places this at the "3 TAs + gate" tier. The 6-hour estimate reflects the depth of the three distinct skills required (group structure/matrix computation, geometric circle-line mapping, three-point normalization) — all three are assessed in the gate.
- The matrix representation (A01) is the key pedagogical tool: once students see Möbius transformations as $2\times2$ matrices, composition and inversion become mechanical matrix operations and the group structure is transparent. This shift should happen in the first teaching action, not deferred.
- The Poincaré disk / hyperbolic geometry transfer probe was chosen because it is the single most common application of Möbius-transformation automorphisms in downstream mathematics (differential geometry, geometric group theory, number theory via $\mathrm{SL}(2,\mathbb{Z})$) — making the connection here plants the seed for students who will encounter this material in multiple contexts later.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.cx.conformal-mapping`) |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (none in KG → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.8×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract: expert learner already fluent in conformal mappings and the Riemann sphere) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
