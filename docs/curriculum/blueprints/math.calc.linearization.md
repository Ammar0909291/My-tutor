# Teaching Blueprint: Linearization and Differentials (`math.calc.linearization`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.calc.linearization` |
| name | Linearization and Differentials |
| domain | Calculus |
| difficulty | advanced |
| bloom | apply |
| mastery_threshold | 0.8 → MAMR = ⌈0.8×5⌉ = 4/5 |
| estimated_hours | 5 |
| requires | `math.calc.derivative-definition` |
| unlocks | none |
| cross_links | none |
| CPA_entry_stage | C (Concrete) — approximating one specific function's value near a point using its tangent line before naming the general linearization formula |
| description (KG) | Approximating $f(x)$ near $a$ by its tangent line $L(x)=f(a)+f'(a)(x-a)$; the differential $df=f'(x)dx$ is the linearization of the increment. |

## Component 1 — Learning Objectives

- LO1: Construct the LINEARIZATION $L(x)=f(a)+f'(a)(x-a)$ — the tangent line at $a$ — and recognize it as `math.calc.derivative-definition`'s own slope $f'(a)=\lim_{h\to0}[f(a+h)-f(a)]/h$, used to build a LINEAR approximation formula, not merely to compute a single numeric slope value.
- LO2: Use $L(x)$ to approximate $f(x)$ for $x$ NEAR $a$, and recognize that the approximation's ACCURACY degrades as $x$ moves FARTHER from $a$ — the tangent line matches $f$ exactly only AT $a$ itself, with genuine, growing error elsewhere.
- LO3 (orientation level — full error-bound/Taylor-remainder derivation deferred): recognize, without full derivation, that the DIFFERENTIAL $df=f'(x)\,dx$ formalizes the SAME linearization idea as an INCREMENT approximation — $\Delta y\approx dy=f'(x)\Delta x$ for a small change $\Delta x$ — previewing the connection to error propagation and, eventually, Taylor's theorem's higher-order refinements.

## Component 2 — Prerequisite Check

Assumes mastery of `math.calc.derivative-definition` ($f'(x)=\lim_{h\to0}[f(x+h)-f(x)]/h$, the instantaneous rate of change and tangent-line slope).

## Component 3 — Core Explanation

**Linearization builds an approximation formula from the derivative's own slope value**: `math.calc.derivative-definition` computes $f'(a)$ as a single NUMBER — the tangent line's slope at $a$. Linearization takes this SAME number and builds a full LINEAR FUNCTION from it: $L(x)=f(a)+f'(a)(x-a)$ — the equation of the line passing through $(a,f(a))$ with slope $f'(a)$. This is not a new concept requiring separate derivation; it is simply the point-slope line formula, with the slope supplied by the derivative already computed.

**The approximation's accuracy is a genuine, distance-dependent phenomenon, not a uniform guarantee**: $L(x)$ matches $f(x)$ EXACTLY at $x=a$ (both equal $f(a)$ there), and matches $f$'s SLOPE at $a$ (both have derivative $f'(a)$ there) — but for $x\ne a$, $L(x)$ is generally only an APPROXIMATION, with the ERROR $|f(x)-L(x)|$ growing as $x$ moves farther from $a$, since $f$ can curve away from its own tangent line. This is a real, measurable phenomenon, not a mere theoretical caveat — using $L(x)$ far from $a$ can give a badly wrong answer.

**The differential formalizes linearization as an increment approximation (orientation level)**: writing $\Delta x=x-a$ (a small change in $x$) and $\Delta y=f(x)-f(a)$ (the corresponding ACTUAL change in $f$), the DIFFERENTIAL $dy=f'(x)\,dx$ (often evaluated at $x=a$, using $dx=\Delta x$) gives $dy\approx\Delta y$ for SMALL $\Delta x$ — the SAME linearization idea, reframed as approximating the actual increment $\Delta y$ by the tangent line's own predicted increment $dy$. This connects directly to error-propagation applications and previews Taylor's theorem, which refines this linear approximation with higher-order (quadratic, cubic, ...) correction terms, deferred beyond this concept's core scope.

## Component 4 — Worked Examples

**Example 1 (LO1 — constructing the linearization from the derivative's slope, breaking MC-1)**: for $f(x)=\sqrt x$ at $a=4$: $f(4)=2$, and $f'(x)=\frac{1}{2\sqrt x}$, so $f'(4)=\frac{1}{4}$. The linearization is $L(x)=f(4)+f'(4)(x-4)=2+\frac14(x-4)$ — this is EXACTLY the point-slope line formula, with the slope $\frac14$ supplied directly by `math.calc.derivative-definition`'s own derivative computation, not a separately derived quantity.

**Example 2 (LO2 — accuracy degrading with distance from $a$, breaking MC-2)**: using Example 1's $L(x)=2+\frac14(x-4)$ to approximate $\sqrt x$: at $x=4.1$ (close to $a=4$), $L(4.1)=2+\frac14(0.1)=2.025$, compared to the TRUE value $\sqrt{4.1}\approx2.0248$ — an error of only about $0.0002$, extremely small. But at $x=9$ (much farther from $a=4$), $L(9)=2+\frac14(5)=3.25$, compared to the TRUE value $\sqrt9=3$ — an error of $0.25$, over a THOUSAND times larger (relatively) than the error at $x=4.1$. This confirms the approximation's accuracy is genuinely distance-dependent, not a uniform guarantee across all $x$.

**Example 3 (LO3, orientation level — the differential as an increment approximation, breaking MC-3)**: continuing with $f(x)=\sqrt x$ at $a=4$: using the differential, $dy=f'(4)\,dx=\frac14\,dx$. For a small change $dx=\Delta x=0.1$ (going from $x=4$ to $x=4.1$): $dy=\frac14(0.1)=0.025$ — this PREDICTS the actual change $\Delta y=\sqrt{4.1}-\sqrt4\approx2.0248-2=0.0248$, matching CLOSELY (matching Example 2's small-error case exactly, since $dy$ and $L(x)-f(a)$ are literally the same computation, just framed as an increment rather than a function value). This confirms the differential $dy=f'(x)\,dx$ is the SAME linearization idea, simply reframed to predict the CHANGE in $y$ rather than the value of $y$ itself.

## Component 5 — Teaching Actions

### Teaching Action A01 — Linearization Builds a Line From the Derivative's Own Slope (Primitive P11: Representation Shift)

State: "you already know how to compute $f'(a)$ as a single slope number — linearization just plugs that number into the ordinary point-slope line formula, giving you a full approximating function, not a new concept to learn from scratch." Walk Example 1's direct construction of $L(x)$ from $f'(4)$.

- **MC-1 hook**: ask "is constructing the linearization $L(x)$ a fundamentally new procedure, separate from computing the derivative $f'(a)$ you already know how to find?" — a "yes" answer reveals MC-1 (missing that $L(x)$ is simply the point-slope line formula, with the slope supplied directly by the already-computed derivative).

### Teaching Action A02 — The Approximation Genuinely Degrades With Distance (Primitive P28: Conflict Evidence)

Present Example 2's direct evidence: the error at $x=4.1$ (close to $a$) was tiny, while the error at $x=9$ (far from $a$) was over a thousand times larger relatively. State: "the linearization's accuracy isn't a fixed, uniform guarantee — it genuinely degrades the farther you move from the point $a$ where you built the tangent line."

- **MC-2 hook**: ask "does the linearization $L(x)$ provide roughly the same quality of approximation to $f(x)$ regardless of how far $x$ is from $a$?" — a "yes" answer reveals MC-2 (missing that the approximation's accuracy genuinely degrades as $x$ moves farther from $a$).

### Teaching Action A03 — The Differential Is the Same Idea, Reframed as an Increment (Primitive P06: Contrast Pair)

Contrast Example 1–2's linearization framing (approximating the VALUE $f(x)$) against Example 3's differential framing (approximating the CHANGE $\Delta y$) — showing both computations agree numerically on the same underlying data. State: "the differential $dy=f'(x)\,dx$ isn't a separate new concept — it's the identical tangent-line idea, just asking 'how much does $y$ change' instead of 'what is $y$'s value.'"

- **MC-3 hook**: ask "is the differential $dy=f'(x)\,dx$ a genuinely different mathematical idea from the linearization $L(x)$, requiring its own separate justification?" — a "yes" answer reveals MC-3 (missing that the differential is the same linearization idea, reframed to approximate an increment rather than a value).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Construct the linearization of $f(x)=x^3$ at $a=2$.
  2. Using your answer to problem 1, approximate $f(2.1)$ and $f(3)$, and compare each to the TRUE value, noting which is more accurate and why.
  3. Compute the differential $dy$ for $f(x)=x^3$ at $a=2$ with $dx=0.1$, and verify it matches the increment computed in problem 2 for $x=2.1$.
  4. Explain, in one or two sentences, why the differential and the linearization are the same underlying idea, framed two different ways.
- **P76 (Transfer Probe, mode = independence)**: "A machinist needs to estimate the volume $V=\frac43\pi r^3$ of a ball bearing whose radius was measured as $r=2$cm, but with a small measurement uncertainty $\Delta r=0.01$cm. (a) Compute $V(2)$ and the derivative $V'(2)$. (b) Use the differential $dV=V'(2)\,dr$ to estimate how much the volume estimate could be off due to the radius uncertainty. (c) Explain why this differential-based estimate would become substantially less reliable if the radius uncertainty were instead $\Delta r=1$cm rather than $0.01$cm, citing the distance-dependent accuracy of linearization."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | LINEARIZATION-ASSUMED-NEW-PROCEDURE | Believing constructing $L(x)$ is a fundamentally new procedure separate from computing the derivative, missing that it is simply the point-slope line formula with the already-computed slope | Foundational |
| MC-2 | LINEARIZATION-ACCURACY-ASSUMED-UNIFORM | Believing the linearization provides roughly the same approximation quality regardless of distance from $a$, missing that accuracy genuinely degrades with distance | High |
| MC-3 | DIFFERENTIAL-ASSUMED-SEPARATE-CONCEPT | Believing the differential $dy=f'(x)\,dx$ is a genuinely different idea from linearization, missing that it is the same tangent-line idea reframed as an increment approximation | Moderate |

- **B01 (targets MC-1)**: P27 (name it: "Linearization Assumed New Procedure") → P41 (detect: ask whether constructing $L(x)$ is a fundamentally new procedure) → P64 (conceptual shift: re-walk Example 1's direct point-slope construction, re-anchoring on "the point-slope line formula, with the already-computed derivative as slope").
- **B02 (targets MC-2)**: P27 (name it: "Linearization Accuracy Assumed Uniform") → P41 (detect: ask whether the approximation quality is roughly the same regardless of distance from $a$) → P64 (conceptual shift: re-walk Example 2's small-versus-large-error comparison, re-anchoring on "accuracy genuinely degrades with distance from $a$").
- **B03 (targets MC-3)**: P27 (name it: "Differential Assumed Separate Concept") → P41 (detect: ask whether the differential is a genuinely different idea from linearization) → P64 (conceptual shift: re-walk Example 3's matching numeric computation, re-anchoring on "the same tangent-line idea, reframed as an increment approximation").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.calc.derivative-definition` ($f'(x)$ as the limit-defined instantaneous rate of change, the slope value this concept's line-construction directly uses).
- **Unlocks**: none listed in the KG for this concept.
- **Cross-link**: none listed in the KG for this concept.

## Component 8 — Teaching Notes

- estimated_hours = 5 with an advanced/apply tag supports the "3 TAs + gate" tier, with LO1 and LO2 given full computational depth (the direct line construction and the numeric near-versus-far error comparison) and LO3 kept orientation-level, appropriately introducing the differential's increment framing without deriving Taylor's remainder formula.
- **Division of labor**: `math.calc.derivative-definition` owns the general limit-based derivative computation; this concept owns BUILDING an approximation formula and increment-estimation tool from that already-computed slope — deliberately reusing the SAME function $f(x)=\sqrt x$ at $a=4$ across all three examples so the linearization, its accuracy behavior, and the differential's increment framing all connect to one running, easily-computed example.
- Example 2's deliberate choice to compare a NEARBY point ($x=4.1$) against a FAR point ($x=9$) on the SAME function was chosen to make the distance-dependent accuracy claim concrete and numerically verifiable, rather than asserting it only qualitatively.

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
| V-15 | CPA_entry_stage justified | PASS (Concrete: approximating one specific function near a point precedes the general linearization formula) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
