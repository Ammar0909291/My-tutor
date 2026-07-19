# Teaching Blueprint: Distributions (`math.fnal.distributions`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.fnal.distributions` |
| name | Distributions |
| domain | Functional Analysis |
| difficulty | research |
| bloom | analyze |
| mastery_threshold | 0.6 → MAMR = ⌈0.6×5⌉ = 3/5 |
| estimated_hours | 8 |
| requires | `math.fnal.dual-space-functional`, `math.calc.derivative-definition` |
| unlocks | none |
| cross_links | `math.de.greens-function` (**authored**) — verified via `ls`; P76_mode = cross-link probe, see Component 7 |
| CPA_entry_stage | A (Abstract) — research-tier learner already has linear functionals and the ordinary derivative definition; distributions are introduced directly as the rigorous resolution to a gap that concept flagged |
| description (KG) | Continuous linear functionals on the space 𝒟 of test functions (C∞ with compact support). Dirac δ: δ(φ)=φ(0). Every locally integrable function defines a distribution. Differentiation always possible: ⟨T′,φ⟩=−⟨T,φ′⟩. Foundation of modern PDE theory. |

## Component 1 — Learning Objectives

- LO1: Define a **distribution** $T$ as a continuous linear functional on the space $\mathcal D$ of test functions ($C^\infty$ with compact support) — reusing `math.fnal.dual-space-functional`'s own linear-functional framework, specialized to this particular space — and construct the **Dirac delta** $\delta(\varphi)=\varphi(0)$ as a specific, concrete distribution, directly resolving `math.de.greens-function`'s own flagged concern that $\delta$ is not an ordinary function.
- LO2: Show that every locally integrable ordinary function $f$ defines a distribution $T_f(\varphi)=\int f(x)\varphi(x)\,dx$, recognizing distributions as a genuine GENERALIZATION of ordinary functions — not a wholly separate, disconnected object.
- LO3 (orientation level, given research-tier scope): recognize the **weak derivative** definition $\langle T',\varphi\rangle=-\langle T,\varphi'\rangle$ (shifting the derivative onto the test function, via integration by parts) as making differentiation ALWAYS possible for distributions — even for objects with no ordinary derivative — directly resolving why `math.de.greens-function`'s defining equation $LG=\delta(x-\xi)$ makes rigorous sense despite having no ordinary-function solution.

## Component 2 — Prerequisite Check

Assumes mastery of `math.fnal.dual-space-functional` (a linear functional's definition and linearity check, applied to a normed space) and `math.calc.derivative-definition` (the ordinary pointwise-limit definition of a derivative).

## Component 3 — Core Explanation

**A distribution is a linear functional on test functions**: `math.fnal.dual-space-functional` already established what a linear functional is — a map to scalars satisfying additivity and homogeneity. A **distribution** is exactly this, specialized to inputs from $\mathcal D$, the space of test functions ($C^\infty$, compactly supported). The **Dirac delta** $\delta(\varphi)=\varphi(0)$ — evaluating a test function at $0$ — is a concrete example: it is perfectly linear ($\delta(a\varphi+b\psi)=a\varphi(0)+b\psi(0)=a\delta(\varphi)+b\delta(\psi)$), and this is the RIGOROUS resolution to `math.de.greens-function`'s own flagged concern — $\delta$ is not an ordinary pointwise function (no ordinary function is zero everywhere except one point, yet integrates to $1$ there), but it IS a completely well-defined linear functional on test functions.

**Ordinary functions embed as distributions**: for any locally integrable function $f$, $T_f(\varphi)=\int f(x)\varphi(x)\,dx$ defines a distribution — linear in $\varphi$ by linearity of the integral. Different functions $f$ give different distributions $T_f$, so no information is lost in this embedding. Distribution theory therefore properly CONTAINS ordinary function theory as a special case, rather than being an unrelated, foreign framework.

**The weak derivative makes differentiation always possible**: the ordinary derivative (`math.calc.derivative-definition`'s pointwise limit) fails to exist for functions with jumps or other irregularities. The **weak derivative** is instead DEFINED by $\langle T',\varphi\rangle=-\langle T,\varphi'\rangle$ — shifting the derivative operation onto the (always-smooth) test function $\varphi$ via integration by parts — making differentiation ALWAYS well-defined for distributions, with no exceptions. This is precisely why `math.de.greens-function`'s equation $LG=\delta(x-\xi)$, which has no solution in the ordinary pointwise sense (since $G$ has a genuine kink whose "second derivative" cannot be an ordinary function there), makes complete rigorous sense as a statement about distributions.

## Component 4 — Worked Examples

**Example 1 (LO1 — the Dirac delta as a genuine linear functional, breaking MC-1, resolving Green's function's flagged gap)**: verify $\delta(\varphi)=\varphi(0)$ is linear: $\delta(a\varphi+b\psi)=(a\varphi+b\psi)(0)=a\varphi(0)+b\psi(0)=a\delta(\varphi)+b\delta(\psi)$ ✓ — satisfying the exact linearity condition `math.fnal.dual-space-functional` established for functionals generally. This resolves `math.de.greens-function`'s own flagged concern directly: $\delta(x-\xi)$ is not an ordinary pointwise function, but it IS a perfectly rigorous linear functional — a completely legitimate mathematical object, just not the kind of object (an ordinary function with pointwise values) one might initially expect.

**Example 2 (LO2 — an ordinary function embeds as a distribution, breaking MC-2)**: let $f(x)=x^2$ (an ordinary, locally integrable function). Its associated distribution is $T_f(\varphi)=\int x^2\varphi(x)\,dx$ — linear in $\varphi$ by linearity of integration. This $T_f$ is built directly FROM the ordinary function $f$, with no information lost (different $f$'s give different $T_f$'s) — distributions properly contain ordinary functions as a special case, rather than replacing or ignoring them.

**Example 3 (LO3, orientation level — the weak derivative of a jump, resolving Green's function's kink, breaking MC-3)**: the Heaviside step function $H(x)$ ($0$ for $x<0$, $1$ for $x\ge0$) has NO ordinary derivative at $x=0$ (a genuine jump). Its WEAK derivative: $\langle H',\varphi\rangle=-\langle H,\varphi'\rangle=-\int_0^\infty\varphi'(x)\,dx=-\big[\varphi(x)\big]_0^\infty=-(0-\varphi(0))=\varphi(0)=\delta(\varphi)$ — so $H'=\delta$ in the distributional sense! Ordinary calculus (`math.calc.derivative-definition`'s pointwise limit) has nothing to say at $x=0$, but distribution theory handles the derivative of a jump cleanly and rigorously — exactly the same phenomenon underlying why `math.de.greens-function`'s Green's function, with its own genuine kink at $x=\xi$, can validly satisfy $LG=\delta(x-\xi)$: the object on both sides of that equation is a distribution, not an ordinary function.

## Component 5 — Teaching Actions

### Teaching Action A01 — $\delta$ Is a Rigorous Linear Functional, Not a Failed Ordinary Function (Primitive P11: Representation Shift)

State: "$\delta$ was never trying and failing to be an ordinary function — it's a genuinely different, completely rigorous KIND of object: a linear functional on test functions." Work Example 1's linearity verification, directly connecting it to `math.de.greens-function`'s own flagged concern.

- **MC-1 hook**: ask "is the Dirac delta $\delta$ an ordinary function that happens to be hard to describe, or is it a fundamentally different kind of mathematical object?" — an "ordinary function, just hard to describe" answer reveals MC-1 (missing that $\delta$ is properly understood as a linear functional, not a pointwise function at all).

### Teaching Action A02 — Ordinary Functions Are Contained Within, Not Separate From, Distribution Theory (Primitive P28: Conflict Evidence)

Present Example 2's direct evidence: $T_f(\varphi)=\int f(x)\varphi(x)\,dx$ is built directly from an ordinary function $f$, faithfully preserving all its information. State: "distribution theory doesn't replace ordinary functions with something foreign — every ordinary locally integrable function embeds directly as a distribution, with nothing lost."

- **MC-2 hook**: ask "is distribution theory a completely separate, disconnected framework from ordinary function theory?" — a "yes" answer reveals MC-2 (missing that ordinary functions embed directly as distributions).

### Teaching Action A03 — The Weak Derivative Makes Differentiating a Jump Rigorous (Primitive P06: Contrast Pair)

Contrast the ordinary derivative (undefined at $H(x)$'s jump, per `math.calc.derivative-definition`'s pointwise limit) against the weak derivative (giving the clean, rigorous result $H'=\delta$). State: "ordinary calculus simply has nothing to say at a jump — the weak derivative shifts the work onto the smooth test function instead, and produces a completely meaningful answer where ordinary calculus gives up."

- **MC-3 hook**: ask "does a function with a jump discontinuity, like the Heaviside function, simply have no derivative at all, full stop?" — a "yes" answer reveals MC-3 (missing that the weak derivative is always well-defined for distributions, even at a jump).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Verify that $T_f(\varphi)=\int f(x)\varphi(x)\,dx$ is linear in $\varphi$, for $f(x)=\sin(x)$, by checking $T_f(a\varphi+b\psi)=aT_f(\varphi)+bT_f(\psi)$.
  2. Compute $\delta(\varphi)$ for $\varphi(x)=x^2+3$ (evaluate the Dirac delta functional on this specific test function).
  3. Using the weak derivative definition $\langle T',\varphi\rangle=-\langle T,\varphi'\rangle$, explain in words why this definition "shifts" the derivative onto the test function rather than the original object $T$.
  4. Explain why the Heaviside function's weak derivative being exactly $\delta$ is a meaningful, rigorous mathematical statement, even though $H$ has no ordinary derivative at $x=0$.
- **P76 (Transfer Probe, mode = cross-link probe, engaging `math.de.greens-function`)**: "Recall from `math.de.greens-function` that the Green's function $G(x,\xi)$ for $-u''=f$ satisfies $-G''=\delta(x-\xi)$, where $\delta$ is the point-source term that concept flagged as 'not an ordinary function.' (a) Using this lesson's definition, explain precisely what KIND of mathematical object $\delta(x-\xi)$ actually is, and why it is nonetheless completely rigorous. (b) Verify that $\delta(x-\xi)$, viewed as a functional on test functions $\varphi$, is linear (state the defining rule and check linearity directly). (c) Using this lesson's weak-derivative machinery, explain in general terms why an equation like $-G''=\delta(x-\xi)$, which has no solution in the ordinary sense (since $G$ has a genuine kink, and its second derivative cannot be an ordinary function there), makes perfect rigorous sense as a statement about distributions."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 3/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | DELTA-ASSUMED-ORDINARY-FUNCTION | Believing the Dirac delta is an ordinary (if hard-to-describe) function, missing that it is properly understood as a genuinely different kind of object — a linear functional on test functions | Foundational |
| MC-2 | DISTRIBUTIONS-ASSUMED-DISCONNECTED-FROM-FUNCTIONS | Believing distribution theory is a wholly separate, disconnected framework from ordinary functions, missing that every ordinary locally integrable function embeds directly as a distribution | High |
| MC-3 | JUMP-ASSUMED-TO-HAVE-NO-DERIVATIVE-AT-ALL | Believing a function with a jump discontinuity simply has no derivative in any sense, missing that the weak derivative is always well-defined for distributions, even at a jump | Moderate |

- **B01 (targets MC-1)**: P27 (name it: "Delta Assumed Ordinary Function") → P41 (detect: ask whether $\delta$ is an ordinary function that's just hard to describe) → P64 (conceptual shift: re-walk Example 1's linearity verification, re-anchoring on "$\delta$ is a rigorous linear functional, a fundamentally different kind of object from a pointwise function").
- **B02 (targets MC-2)**: P27 (name it: "Distributions Assumed Disconnected from Functions") → P41 (detect: ask whether distribution theory is completely separate from ordinary function theory) → P64 (conceptual shift: re-walk Example 2's embedding construction, re-anchoring on "every ordinary function embeds directly as a distribution — nothing is lost").
- **B03 (targets MC-3)**: P27 (name it: "Jump Assumed to Have No Derivative At All") → P41 (detect: ask whether a jump discontinuity means a function simply has no derivative in any sense) → P64 (conceptual shift: re-walk Example 3's weak-derivative computation, re-anchoring on "the weak derivative is always well-defined, even at a jump, giving the rigorous result $H'=\delta$").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.fnal.dual-space-functional` (the linear-functional definition and linearity check this concept directly reuses, specialized to test functions) and `math.calc.derivative-definition` (the ordinary pointwise-limit derivative this concept's weak derivative is explicitly contrasted against).
- **Unlocks**: none listed in the KG for this concept.
- **Cross-link**: KG lists `math.de.greens-function`, verified authored via `ls docs/curriculum/blueprints/` (authored earlier in this same batch). $P76_{mode}=$ **cross-link probe**, directly resolving that concept's own flagged concern about the Dirac delta's true nature and the rigorous justification for its defining equation $LG=\delta(x-\xi)$.

## Component 8 — Teaching Notes

- estimated_hours = 8 with a research/analyze tag and a low mastery_threshold (0.6, MAMR = 3/5) supports the full "3 TAs + gate" tier at a somewhat compact depth, with LO1 and LO2 at full conceptual depth (the Dirac delta's rigorous construction and the ordinary-function embedding) and LO3 kept orientation-level, appropriately previewing the weak derivative's power without developing the full apparatus of distributional PDE theory.
- **Division of labor**: `math.fnal.dual-space-functional` owns the general linear-functional definition; `math.calc.derivative-definition` owns the ordinary pointwise derivative this concept's weak derivative is contrasted against. This concept owns the SPECIALIZATION to test functions and the Dirac delta/weak-derivative machinery, deliberately built around directly resolving `math.de.greens-function`'s own flagged gap rather than introducing an unmotivated abstract theory.
- This blueprint was deliberately authored immediately after `math.de.greens-function` within the same batch specifically so a genuine, substantive cross-link probe could be built — every worked example and the transfer probe itself directly close the loop that concept opened (the Dirac delta's true nature, and why $LG=\delta(x-\xi)$ is rigorous despite having no ordinary-function solution).

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS (none listed) |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (`math.de.greens-function` found authored → cross-link probe) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (cross-link probe) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.6×5⌉=3) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract: research-tier learner already has functionals/derivative definition; distributions introduced directly as a resolution) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
