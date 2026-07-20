# Teaching Blueprint: Dense Subspaces and Approximation (`math.fnal.dense-subspace`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.fnal.dense-subspace` |
| name | Dense Subspaces and Approximation |
| domain | Functional Analysis |
| difficulty | expert |
| bloom | apply |
| mastery_threshold | 0.8 → MAMR = ⌈0.8×5⌉ = 4/5 |
| estimated_hours | 4 |
| requires | `math.fnal.banach-space` |
| unlocks | none |
| cross_links | `math.real.weierstrass-approximation` (authored earlier — see Component 7) |
| CPA_entry_stage | A (Abstract) — expert learner already has the Banach-space framework; the task is the general density concept and recognizing familiar approximation theorems as specific instances |
| description (KG) | A subspace $S\subseteq X$ is dense iff $\operatorname{cl}(S)=X$: every point in $X$ can be approximated arbitrarily closely by elements of $S$. Examples: polynomials dense in $C([0,1])$ (Weierstrass); $C^\infty$ dense in $L^p$; trigonometric polynomials dense in $L^2$ (Fourier). |

## Component 1 — Learning Objectives

- LO1: State the general definition — $S\subseteq X$ is dense iff $\operatorname{cl}(S)=X$, equivalently: for every $x\in X$ and every $\varepsilon>0$, some $s\in S$ satisfies $\|x-s\|<\varepsilon$ — recognizing this as a SINGLE unified definition applying in ANY normed/Banach space (via `math.fnal.banach-space`'s own norm and completeness structure), not a separate ad hoc notion for each specific approximation theorem.
- LO2 (cross-link objective): Recognize `math.real.weierstrass-approximation`'s own theorem ("every continuous function on $[a,b]$ can be uniformly approximated by polynomials") as EXACTLY the statement "the polynomials form a DENSE subspace of $C([a,b])$" in THIS concept's general density language — the Bernstein-polynomial construction already gives an EXPLICIT witness proving this specific density claim, not merely an abstract existence argument.
- LO3: Correctly state (without full proof) at least two FURTHER density results beyond Weierstrass's — $C^\infty$ dense in $L^p$, and trigonometric polynomials dense in $L^2$ (the Fourier density result) — recognizing all three (Weierstrass, $C^\infty$-in-$L^p$, trigonometric-in-$L^2$) as INSTANCES of the SAME general density definition, applied to different spaces and different candidate dense subspaces.

## Component 2 — Prerequisite Check

Assumes mastery of `math.fnal.banach-space` (complete normed vector spaces; examples $\mathbb{R}^n$, $L^p(\mu)$, $C(K)$ with sup norm, $\ell^p$; completeness).

## Component 3 — Core Explanation

**Density is ONE definition, working uniformly across every Banach space**: $S\subseteq X$ is dense iff $\operatorname{cl}(S)=X$ — every point of $X$ is either IN $S$ or is a LIMIT of points in $S$. Equivalently (unpacking the closure via `math.fnal.banach-space`'s own norm): for every $x\in X$ and every $\varepsilon>0$, there exists $s\in S$ with $\|x-s\|<\varepsilon$ — $S$ gets arbitrarily close to every point of $X$, even if $S$ itself misses most of $X$'s actual points. This single definition, stated once in terms of `math.fnal.banach-space`'s norm, applies UNCHANGED whether $X$ is $C([a,b])$, $L^p(\mu)$, or any other Banach space — density is not redefined per example.

**Weierstrass's theorem IS a density statement, with an explicit witness already in hand**: `math.real.weierstrass-approximation` proves "every continuous function on $[a,b]$ can be uniformly approximated by polynomials" — restating this in THIS concept's language: taking $X=C([a,b])$ (with the sup norm) and $S=$ the polynomials, the theorem says EXACTLY $\operatorname{cl}(S)=X$, i.e. polynomials are DENSE in $C([a,b])$. Crucially, `math.real.weierstrass-approximation` doesn't just prove density abstractly — its Bernstein-polynomial construction $B_n(f,x)$ gives an EXPLICIT sequence witnessing $\|f-B_n(f,\cdot)\|_\infty\to0$, directly instantiating this concept's "$\|x-s\|<\varepsilon$" condition with a concrete, computable $s=B_n(f,\cdot)$ for any desired $\varepsilon$.

**Further density results are the SAME pattern in different spaces**: $C^\infty$ functions are dense in $L^p(\mu)$ — smooth functions can approximate any $L^p$ function arbitrarily closely in the $L^p$ norm (via mollification/convolution techniques, not derived in full here). Trigonometric polynomials (finite sums $\sum_{|n|\le N}c_ne^{inx}$) are dense in $L^2$ — this is the density statement UNDERLYING Fourier series' own convergence theory (`math.de.fourier-series`/`math.de.fourier-convergence`'s partial sums are exactly finite trigonometric polynomials, and their $L^2$-convergence to $f$ is a density-in-$L^2$ phenomenon). All three results — Weierstrass, $C^\infty$-in-$L^p$, trig-polynomials-in-$L^2$ — instantiate the identical "$\operatorname{cl}(S)=X$" pattern, differing only in which Banach space $X$ and which candidate subspace $S$ are chosen.

## Component 4 — Worked Examples

**Example 1 (LO1 — verifying density directly via the $\varepsilon$-approximation condition, breaking MC-1)**: in $X=\mathbb{R}$ (a trivial 1-dimensional Banach space with the usual norm $|\cdot|$), let $S=\mathbb{Q}$ (the rationals). Checking density directly: for any $x\in\mathbb{R}$ and any $\varepsilon>0$, a rational $s$ within $\varepsilon$ of $x$ always exists (e.g. a sufficiently long decimal truncation of $x$) — confirming $\operatorname{cl}(\mathbb{Q})=\mathbb{R}$, i.e. $\mathbb{Q}$ is dense in $\mathbb{R}$, using EXACTLY this concept's general $\varepsilon$-approximation condition, with no special machinery beyond the definition itself.

**Example 2 (LO2 — restating Weierstrass as a density claim with an explicit witness, breaking MC-2)**: for $f(x)=x^2$ on $[0,1]$, `math.real.weierstrass-approximation`'s own Example 2 already computed $B_2(f,x)=0.5x+0.5x^2$ as an explicit degree-2 Bernstein approximation, with $B_2(f,0.5)=0.375$ against the true value $f(0.5)=0.25$ (a rough approximation at low degree). Restating in THIS concept's density language: $f=x^2\in X=C([0,1])$, $S=$ polynomials, and $B_n(f,\cdot)$ for INCREASING $n$ is an EXPLICIT sequence in $S$ with $\|f-B_n(f,\cdot)\|_\infty\to0$ — directly witnessing $f\in\operatorname{cl}(S)$, i.e. $f$ is approximable from $S$ to any desired accuracy, using the SAME explicit Bernstein construction already established, not a new abstract existence argument.

**Example 3 (LO3 — recognizing three density results as one pattern, breaking MC-3)**: tabulating the three named results in THIS concept's uniform language: (1) Weierstrass: $X=C([a,b])$, $S=$ polynomials — dense (Bernstein witness). (2) Smoothing: $X=L^p(\mu)$, $S=C^\infty$ functions — dense (mollification witness, not derived here). (3) Fourier: $X=L^2$, $S=$ trigonometric polynomials — dense (Fourier partial-sum witness). Despite using entirely different specific spaces and different concrete approximating families, each is CHECKED against the identical $\operatorname{cl}(S)=X$ criterion — confirming these are not three unrelated named theorems to memorize separately, but one recurring density pattern instantiated three times.

## Component 5 — Teaching Actions

### Teaching Action A01 — One Density Definition, Stated Once, Applies Everywhere (Primitive P11: Representation Shift)

State: "density doesn't get redefined for each new space — `math.fnal.banach-space`'s own norm gives you the SAME $\varepsilon$-approximation condition in every case, whether the space is $\mathbb{R}$, $C([a,b])$, or $L^p$." Walk Example 1's direct $\mathbb{Q}$-dense-in-$\mathbb{R}$ verification.

- **MC-1 hook**: ask "does the definition of 'dense subspace' need to be adapted separately for each specific Banach space it's applied to?" — a "yes" answer reveals MC-1 (missing that density is one fixed definition applying uniformly via `math.fnal.banach-space`'s own norm).

### Teaching Action A02 — Weierstrass's Theorem Already IS a Density Statement, With a Witness Already in Hand (Primitive P28: Conflict Evidence)

Present Example 2's direct evidence: `math.real.weierstrass-approximation`'s already-computed $B_2(f,x)$ is DIRECTLY the density witness this concept's definition requires, requiring no new construction. State: "Weierstrass's theorem isn't a separate fact to relate to density by analogy — it's LITERALLY the density statement 'polynomials are dense in $C([a,b])$,' and its Bernstein construction is literally the explicit approximating sequence this concept's definition asks for."

- **MC-2 hook**: ask "is `math.real.weierstrass-approximation`'s theorem a separate result merely SIMILAR to a density claim, or is it literally an instance of this concept's density definition?" — a "merely similar" answer reveals MC-2 (missing the direct, exact identification).

### Teaching Action A03 — Three Named Theorems Are One Recurring Pattern (Primitive P06: Contrast Pair)

Contrast treating Weierstrass, the $C^\infty$-in-$L^p$ result, and the Fourier density result as three unrelated facts to memorize against Example 3's tabulation showing all three checked against the IDENTICAL $\operatorname{cl}(S)=X$ criterion. State: "these aren't three separate theorems that happen to sound similar — they're the SAME density pattern, applied to three different (space, candidate subspace) pairs; recognizing the pattern means you're not memorizing three facts, you're applying one idea three times."

- **MC-3 hook**: ask "are Weierstrass's theorem, the $C^\infty$-density-in-$L^p$ result, and the Fourier trigonometric-density-in-$L^2$ result three unrelated facts, or instances of the same underlying pattern?" — an "unrelated" answer reveals MC-3 (missing the shared density-pattern structure).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. State the general definition of a dense subspace, in terms of `math.fnal.banach-space`'s own norm.
  2. Verify directly (using the $\varepsilon$-approximation condition) that the set of terminating decimals is dense in $\mathbb{R}$.
  3. Restate `math.real.weierstrass-approximation`'s theorem explicitly in this concept's $(X,S)$ density language, naming $X$ and $S$.
  4. Explain why the $C^\infty$-dense-in-$L^p$ result and the Weierstrass theorem are instances of the same general pattern, despite using different spaces and different approximating families.
- **P76 (Transfer Probe, mode = cross-link probe engaging `math.real.weierstrass-approximation`)**: "A numerical-analysis researcher wants to approximate an arbitrary continuous function $f$ on $[0,1]$ using a computer, and is choosing between two candidate approximation schemes: (i) evaluating higher-degree Bernstein polynomials, or (ii) using a different, as-yet-unspecified family of simple functions. (a) Using `math.real.weierstrass-approximation`'s own explicit Bernstein construction, explain precisely why scheme (i) is GUARANTEED to achieve any desired accuracy $\varepsilon$ for a large enough degree $n$, citing this concept's general density condition directly. (b) Suppose the researcher instead wants to approximate an $L^2$ function (not necessarily continuous) using trigonometric polynomials. Explain, using this concept's SAME density framework (not a separately re-derived argument), why this is guaranteed to work in principle, and identify which specific density result justifies it. (c) Explain what would need to be checked to determine whether some THIRD, unfamiliar family of functions is dense in a given Banach space, using only this concept's general definition — without needing a brand-new theorem for that specific family."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | DENSITY-DEFINITION-ASSUMED-SPACE-SPECIFIC | Believing the definition of a dense subspace must be adapted separately for each specific Banach space, missing that `math.fnal.banach-space`'s own norm gives one uniform definition | Foundational |
| MC-2 | WEIERSTRASS-TREATED-AS-MERELY-ANALOGOUS-TO-DENSITY | Believing `math.real.weierstrass-approximation`'s theorem is merely similar to a density claim rather than literally an instance of this concept's definition, with the Bernstein construction already serving as the explicit witness | High |
| MC-3 | NAMED-DENSITY-THEOREMS-TREATED-AS-UNRELATED | Believing Weierstrass, $C^\infty$-in-$L^p$, and trigonometric-in-$L^2$ density results are three unrelated facts to memorize separately, missing their shared underlying pattern | Moderate |

- **B01 (targets MC-1)**: P27 (name it: "Density Definition Assumed Space-Specific") → P41 (detect: ask whether the density definition needs adapting per space) → P64 (conceptual shift: re-walk Example 1's direct $\mathbb{Q}$-in-$\mathbb{R}$ verification using the one general definition).
- **B02 (targets MC-2)**: P27 (name it: "Weierstrass Treated as Merely Analogous to Density") → P41 (detect: ask whether Weierstrass's theorem is literally a density instance) → P64 (conceptual shift: re-walk Example 2's direct restatement using the already-computed $B_2(f,x)$ as the witness).
- **B03 (targets MC-3)**: P27 (name it: "Named Density Theorems Treated as Unrelated") → P41 (detect: ask whether the three named results are unrelated facts) → P64 (conceptual shift: re-walk Example 3's tabulation against the identical $\operatorname{cl}(S)=X$ criterion).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.fnal.banach-space` (the norm and completeness structure this concept's density definition is built on directly).
- **Unlocks**: none listed in the KG for this concept.
- **Cross-link**: KG lists `math.real.weierstrass-approximation`, checked via `ls docs/curriculum/blueprints/` and confirmed ALREADY authored (and its own metadata explicitly notes this concept as "not yet authored" at the time it was written — now resolved). $P76_{mode}=$ **cross-link probe**, engaging `math.real.weierstrass-approximation`'s own explicit Bernstein-polynomial construction directly as the density witness in Component 3's derivation and the P76 transfer probe.

## Component 8 — Teaching Notes

- estimated_hours = 4 with an expert/apply tag supports the "3 TAs + gate" tier, with LO1 establishing the unified definition, LO2 given full depth directly identifying Weierstrass's theorem as a density instance (reusing its already-computed Bernstein example rather than re-deriving), and LO3 surveying further density results as instances of the same pattern.
- **Division of labor**: `math.fnal.banach-space` already owns the norm/completeness framework and standard Banach-space examples (verified by grep — no density-specific content); `math.real.weierstrass-approximation` already owns the specific Weierstrass theorem statement and the explicit Bernstein-polynomial construction/computation (verified by grep — its own Component 0 metadata explicitly flags this concept as the not-yet-authored cross-link target, confirming the intended division). This concept owns the GENERAL density definition applicable to any Banach space, the explicit re-framing of Weierstrass's result as a density instance, and the survey connecting it to the $C^\infty$-in-$L^p$ and trigonometric-in-$L^2$ results.
- Example 2's deliberate reuse of `math.real.weierstrass-approximation`'s own already-computed $B_2(f,x)=0.5x+0.5x^2$ numeric example (rather than a fresh Bernstein computation) was chosen specifically to make LO2's "already have the witness in hand" claim concretely visible, rather than re-deriving material that concept already fully owns.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS (none listed) |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (`math.real.weierstrass-approximation` confirmed authored → cross-link probe) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (cross-link probe) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.8×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract: expert learner already has the Banach-space framework; task is the general density concept and recognizing instances) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
