# Teaching Blueprint: Convolution Theorem (Laplace) (`math.de.convolution-theorem`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.de.convolution-theorem` |
| name | Convolution Theorem (Laplace) |
| domain | Differential Equations |
| difficulty | expert |
| bloom | apply |
| mastery_threshold | 0.8 → MAMR = ⌈0.8×5⌉ = 4/5 |
| estimated_hours | 4 |
| requires | `math.de.laplace-transform` |
| unlocks | none |
| cross_links | `math.fnal.convolution` (authored earlier — see Component 7) |
| CPA_entry_stage | A (Abstract) — expert learner already computes Laplace transforms; the task is the specific product-to-convolution correspondence, not the transform itself |
| description (KG) | $\mathcal{L}\{f*g\}(s)=F(s)\cdot G(s)$, where $(f*g)(t)=\int_0^tf(\tau)g(t-\tau)\,d\tau$ is the convolution. Allows recovery of the inverse Laplace of a product without full partial-fraction decomposition. |

## Component 1 — Learning Objectives

- LO1 (cross-link objective): Recognize the Laplace convolution $(f*g)(t)=\int_0^tf(\tau)g(t-\tau)\,d\tau$ as the SAME operation `math.fnal.convolution`'s own general definition $(f*g)(x)=\int f(x-y)g(y)\,dy$ describes, SPECIALIZED to functions that are zero for negative arguments (causal functions, the standing convention in Laplace-transform contexts) — which is exactly why the general integral over all $y$ collapses to the finite range $[0,t]$ here.
- LO2: State and apply the Convolution Theorem itself: $\mathcal{L}\{f*g\}(s)=F(s)\cdot G(s)$ — the Laplace transform of a CONVOLUTION equals the ORDINARY PRODUCT of the individual transforms — and correctly compute a specific convolution $(f*g)(t)$ directly from its integral definition, then verify the theorem by separately computing $\mathcal{L}\{f*g\}$ and $F(s)G(s)$ and confirming they match.
- LO3: Apply the theorem in its PRACTICALLY MOST USEFUL direction — given a product $F(s)G(s)$ whose inverse Laplace transform is needed, recognize this equals $\mathcal{L}\{f*g\}$, so the inverse is $(f*g)(t)$ — and correctly use this to recover an inverse Laplace transform for a case where partial-fraction decomposition would be considerably more tedious.

## Component 2 — Prerequisite Check

Assumes mastery of `math.de.laplace-transform` (the transform $\mathcal{L}\{f\}(s)=\int_0^\infty e^{-st}f(t)\,dt$, its derivative rule, and its role converting differential equations into algebraic ones).

## Component 3 — Core Explanation

**Laplace convolution is `math.fnal.convolution`'s general definition, specialized to causal functions**: `math.fnal.convolution` defines $(f*g)(x)=\int_{-\infty}^\infty f(x-y)g(y)\,dy$ over ALL real $y$. In the Laplace-transform setting, functions are conventionally taken to be CAUSAL — $f(t)=g(t)=0$ for $t<0$ (since `math.de.laplace-transform`'s own integral $\int_0^\infty e^{-st}f(t)\,dt$ only ever "sees" $t\ge0$ in the first place). Substituting this causality into the general convolution integral: $f(t-\tau)=0$ whenever $\tau>t$ (making $t-\tau<0$), and $g(\tau)=0$ whenever $\tau<0$ — so the integral over all $\tau\in(-\infty,\infty)$ collapses to exactly $\tau\in[0,t]$, giving $(f*g)(t)=\int_0^tf(\tau)g(t-\tau)\,d\tau$ (writing the roles of $f,g$ as `math.de.convolution-theorem`'s own convention states them) — EXACTLY the Laplace convolution formula. This is not a coincidental resemblance; it is the SAME general operation, restricted by the causality that Laplace-transform contexts always assume.

**The Convolution Theorem: transform of a convolution equals the product of transforms**: $\mathcal{L}\{f*g\}(s)=F(s)\cdot G(s)$. This is a remarkable simplification — computing a convolution INTEGRAL directly (which involves an integral over $\tau$ for each value of $t$) is generally tedious, but the theorem says its Laplace transform is simply the ORDINARY algebraic product of the two individual transforms, something `math.de.laplace-transform`'s own machinery already computes routinely. The proof (via Fubini's theorem applied to a double integral, not fully derived here) exchanges the order of integration in $\int_0^\infty e^{-st}\left(\int_0^tf(\tau)g(t-\tau)\,d\tau\right)dt$ to separate it into the product $\left(\int_0^\infty e^{-s\tau}f(\tau)\,d\tau\right)\left(\int_0^\infty e^{-su}g(u)\,du\right)=F(s)G(s)$.

**The theorem's most practically useful direction is INVERSE**: given a product $F(s)G(s)$ whose inverse Laplace transform is sought, the theorem says $\mathcal{L}^{-1}\{F(s)G(s)\}=(f*g)(t)$ — directly computable as a convolution INTEGRAL, entirely bypassing partial-fraction decomposition. This is especially valuable when $F(s)G(s)$ would require an awkward, highly factored partial-fraction expansion (e.g., a product of many distinct linear/quadratic factors) — the convolution route trades a possibly messy algebraic decomposition for a single (sometimes still nontrivial, but often more mechanical) integral computation.

## Component 4 — Worked Examples

**Example 1 (LO1 — the causal-collapse from `math.fnal.convolution`'s general integral, breaking MC-1)**: for $f(t)=e^t\cdot\mathbb{1}_{t\ge0}$ and $g(t)=e^{2t}\cdot\mathbb{1}_{t\ge0}$ (both causal, zero for $t<0$), `math.fnal.convolution`'s general formula $(f*g)(x)=\int_{-\infty}^\infty f(x-y)g(y)\,dy$ has integrand zero whenever $y<0$ (since $g(y)=0$ there) OR $y>x$ (since then $x-y<0$, making $f(x-y)=0$) — for $x=t\ge0$, this collapses the integration range to EXACTLY $y\in[0,t]$, giving $\int_0^tf(t-y)g(y)\,dy$ — matching `math.de.convolution-theorem`'s own $(f*g)(t)=\int_0^tf(\tau)g(t-\tau)\,d\tau$ formula exactly (after relabeling $\tau=y$ or $\tau=t-y$, both give equivalent forms), confirming this is the SAME general operation collapsing due to causality, not a separately-defined new integral.

**Example 2 (LO2 — verifying the theorem directly on a specific convolution, breaking MC-2)**: for $f(t)=e^t$, $g(t)=e^{2t}$ (both causal, $t\ge0$): $(f*g)(t)=\int_0^te^\tau e^{2(t-\tau)}\,d\tau=e^{2t}\int_0^te^{-\tau}\,d\tau=e^{2t}\left[1-e^{-t}\right]=e^{2t}-e^t$. Taking the Laplace transform directly: $\mathcal{L}\{e^{2t}-e^t\}(s)=\frac1{s-2}-\frac1{s-1}=\frac{(s-1)-(s-2)}{(s-2)(s-1)}=\frac1{(s-1)(s-2)}$. Separately, computing $F(s)G(s)$ directly: $F(s)=\mathcal{L}\{e^t\}=\frac1{s-1}$, $G(s)=\mathcal{L}\{e^{2t}\}=\frac1{s-2}$, so $F(s)G(s)=\frac1{(s-1)(s-2)}$ — MATCHING $\mathcal{L}\{f*g\}(s)$ EXACTLY, verifying the Convolution Theorem concretely rather than merely citing it.

**Example 3 (LO3 — using the theorem in its inverse direction, breaking MC-3)**: to find $\mathcal{L}^{-1}\left\{\frac1{(s-1)(s-2)}\right\}$: rather than doing partial fractions ($\frac1{(s-1)(s-2)}=\frac{-1}{s-1}+\frac1{s-2}$, requiring solving for coefficients), recognize $\frac1{(s-1)(s-2)}=F(s)G(s)$ with $F(s)=\frac1{s-1}=\mathcal{L}\{e^t\}$ and $G(s)=\frac1{s-2}=\mathcal{L}\{e^{2t}\}$ DIRECTLY (both are already-known standard transforms), so by the Convolution Theorem, $\mathcal{L}^{-1}\{F(s)G(s)\}=(f*g)(t)$ — computed in Example 2 as $e^{2t}-e^t$, matching the partial-fraction route's answer exactly, but obtained by RECOGNIZING two already-known standard transforms and convolving them, rather than solving a partial-fraction coefficient system.

## Component 5 — Teaching Actions

### Teaching Action A01 — Laplace Convolution Is `math.fnal.convolution`'s General Operation, Restricted by Causality (Primitive P11: Representation Shift)

State: "the Laplace convolution formula with its $[0,t]$ limits isn't a separately invented integral — it's `math.fnal.convolution`'s own general convolution, collapsing to those limits precisely because Laplace-transform functions are always causal (zero before $t=0$)." Walk Example 1's direct collapse derivation.

- **MC-1 hook**: ask "is the Laplace convolution's $[0,t]$ integration range a special, separately-defined convention, or does it follow directly from `math.fnal.convolution`'s general definition applied to causal functions?" — a "separately defined" answer reveals MC-1 (missing the direct derivation from causality).

### Teaching Action A02 — The Theorem Genuinely Holds: Verify It, Don't Just Cite It (Primitive P28: Conflict Evidence)

Present Example 2's direct, independent computation of BOTH $\mathcal{L}\{f*g\}(s)$ and $F(s)G(s)$, showing they match exactly ($\frac1{(s-1)(s-2)}$ both ways). State: "the Convolution Theorem isn't an assumption to take on faith — it's a genuinely verifiable equality, and checking it directly (as in Example 2) builds real confidence it's not a coincidence for this one case, but a general pattern (provable via Fubini's theorem)."

- **MC-2 hook**: ask "does computing a convolution's Laplace transform directly (by first computing the convolution integral, then transforming) actually give the same answer as simply multiplying the two individual transforms?" — a "no, uncertain" answer reveals MC-2 (not having genuinely verified the theorem's claim on a concrete case).

### Teaching Action A03 — The Theorem's Real Payoff Is Computing Inverse Transforms Without Partial Fractions (Primitive P06: Contrast Pair)

Contrast the standard partial-fraction route for $\mathcal{L}^{-1}\left\{\frac1{(s-1)(s-2)}\right\}$ (solving for coefficients) against Example 3's convolution route (recognizing two already-known standard transforms and convolving them directly). State: "the theorem's most common practical use runs BACKWARD — spot a product of two RECOGNIZABLE standard transforms in an inverse-transform problem, and convolve them directly, sidestepping partial-fraction algebra entirely."

- **MC-3 hook**: ask "is the Convolution Theorem's main practical use computing the FORWARD transform of a known convolution, or recovering an INVERSE transform of a product?" — a "forward transform" answer reveals MC-3 (missing the theorem's more common, practically valuable inverse-direction application).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Explain, citing `math.fnal.convolution`'s own general definition and the causality condition, why the Laplace convolution integral has limits $[0,t]$ rather than $(-\infty,\infty)$.
  2. Compute $(f*g)(t)$ directly for $f(t)=1$, $g(t)=e^t$ (both causal), using the convolution integral.
  3. Verify the Convolution Theorem for problem 2's functions by separately computing $\mathcal{L}\{f*g\}(s)$ and $F(s)G(s)$.
  4. Use the Convolution Theorem's inverse direction to find $\mathcal{L}^{-1}\left\{\frac1{s(s-3)}\right\}$, recognizing the two standard transforms involved.
- **P76 (Transfer Probe, mode = cross-link probe engaging `math.fnal.convolution`)**: "A signal-processing engineer models a system's output as the convolution of an input signal $x(t)$ with the system's impulse response $h(t)$ (both causal, $x(t)=h(t)=0$ for $t<0$), and wants to find the output in the Laplace domain. (a) Using this lesson's Convolution Theorem, explain why the engineer can simply MULTIPLY the Laplace transforms $X(s)$ and $H(s)$ rather than computing the convolution integral directly in the time domain, and state the resulting relationship. (b) Using `math.fnal.convolution`'s own general definition (valid for non-causal signals too, over all of $\mathbb{R}$), explain what would change about the convolution integral's limits if the engineer's signals were NOT causal (nonzero for some $t<0$), and why the simple Laplace-domain multiplication trick specifically relies on the causal, $[0,t]$-limited case. (c) If the engineer instead already knows $X(s)H(s)$ explicitly as a product of two recognizable standard transforms, explain how to recover the time-domain output signal without partial-fraction decomposition."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | LAPLACE-CONVOLUTION-ASSUMED-SEPARATELY-DEFINED | Believing the Laplace convolution's $[0,t]$ integration limits are a separately-invented convention, missing that they follow directly from `math.fnal.convolution`'s general definition applied to causal functions | Foundational |
| MC-2 | CONVOLUTION-THEOREM-UNVERIFIED | Not having genuinely verified the Convolution Theorem's claim on a concrete case, treating it as an unconfirmed assumption rather than a checkable, provable equality | High |
| MC-3 | CONVOLUTION-THEOREM-USE-DIRECTION-REVERSED | Believing the theorem's main practical use is computing the forward transform of a known convolution, missing its more common inverse-direction application recovering $\mathcal{L}^{-1}$ of a product without partial fractions | Moderate |

- **B01 (targets MC-1)**: P27 (name it: "Laplace Convolution Assumed Separately Defined") → P41 (detect: ask whether the $[0,t]$ limits are separately defined or follow from causality) → P64 (conceptual shift: re-walk Example 1's direct derivation of the collapse from `math.fnal.convolution`'s general integral).
- **B02 (targets MC-2)**: P27 (name it: "Convolution Theorem Unverified") → P41 (detect: ask whether the theorem's claim has actually been checked on a concrete case) → P64 (conceptual shift: re-walk Example 2's independent verification of both sides).
- **B03 (targets MC-3)**: P27 (name it: "Convolution Theorem Use Direction Reversed") → P41 (detect: ask which direction the theorem is most commonly used in practice) → P64 (conceptual shift: re-walk Example 3's inverse-transform application bypassing partial fractions).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.de.laplace-transform` (the transform this concept's convolution theorem directly connects to, and its own already-computed standard transforms reused in the worked examples).
- **Unlocks**: none listed in the KG for this concept.
- **Cross-link**: KG lists `math.fnal.convolution`, checked via `ls docs/curriculum/blueprints/` and confirmed ALREADY authored. $P76_{mode}=$ **cross-link probe**, engaging `math.fnal.convolution`'s own general convolution definition directly in Component 3's causal-collapse derivation and the P76 transfer probe.

## Component 8 — Teaching Notes

- estimated_hours = 4 with an expert/apply tag supports the "3 TAs + gate" tier, with LO1 grounding the Laplace-specific formula in the already-known general definition, LO2 given full verification depth (both sides of the theorem independently computed and matched), and LO3 emphasizing the theorem's practically dominant inverse-direction use.
- **Division of labor**: `math.fnal.convolution` already owns the general convolution definition, Young's inequality, and the Fourier-transform-convolution connection (verified by grep — no Laplace-specific content found there at all); `math.de.laplace-transform` already owns the transform's own machinery, including the derivative rule (verified by grep — no convolution content found there). This concept owns the Laplace-specific convolution formula's derivation from the general definition via causality, the Convolution Theorem itself with direct verification, and its practically dominant inverse-transform application.
- Example 2 and Example 3's deliberate reuse of the SAME function pair ($f(t)=e^t,g(t)=e^{2t}$, giving $F(s)G(s)=\frac1{(s-1)(s-2)}$) across both the forward-direction verification and the inverse-direction application was chosen so the SAME concrete numeric result serves both purposes, making the forward/inverse relationship (LO2 and LO3) visibly connected rather than illustrated by two disconnected examples.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS (none listed) |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (`math.fnal.convolution` confirmed authored → cross-link probe) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (cross-link probe) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.8×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract: expert learner already computes Laplace transforms; task is the specific convolution correspondence) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
