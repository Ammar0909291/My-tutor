# Teaching Blueprint: Singularities (`math.cx.singularities`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.cx.singularities` |
| name | Singularities |
| domain | Complex Analysis |
| difficulty | expert |
| bloom | analyze |
| mastery_threshold | 0.85 → MAMR = ⌈0.85×5⌉ = 5/5 |
| estimated_hours | 5 |
| requires | `math.cx.analytic-functions` |
| unlocks | `math.cx.laurent-series`, `math.cx.residue-theorem` |
| cross_links | none |
| CPA_entry_stage | A (Abstract) — direct classification grounded immediately in concrete rational-function examples |
| description (KG) | Isolated singularity z₀: f holomorphic in 0<|z−z₀|<r. Types: removable (f bounded near z₀), pole (|f|→∞), essential (neither). Riemann's theorem: removable singularity iff bounded near z₀. |

## Component 1 — Learning Objectives

- LO1: Define an **isolated singularity** of $f$ at $z_0$ as a point where $f$ is holomorphic on a punctured disk $0<|z-z_0|<r$ (holomorphic everywhere NEAR $z_0$, but not necessarily AT $z_0$ itself, where $f$ may be undefined or ill-behaved).
- LO2: Classify an isolated singularity into exactly one of three types — **removable** ($f$ is bounded near $z_0$, and can be "patched" to become holomorphic there too), **pole** ($|f(z)|\to\infty$ as $z\to z_0$), or **essential** (neither of the above — $f$'s behavior near $z_0$ is genuinely wild, with no limit at all, not even $\infty$) — for a given function.
- LO3: State and apply **Riemann's Removable Singularity Theorem** — an isolated singularity is removable **if and only if** $f$ is bounded near $z_0$ — as a practical TEST distinguishing removable singularities from the other two types, without needing to explicitly construct the patched extension.

## Component 2 — Prerequisite Check

Assumes mastery of `math.cx.analytic-functions` (holomorphic/analytic functions, complex differentiability, and the striking fact that holomorphic implies analytic in $\mathbb{C}$).

## Component 3 — Core Explanation

An **isolated singularity** of $f$ at $z_0$ occurs when $f$ is holomorphic on a **punctured disk** $0<|z-z_0|<r$ (holomorphic in a full neighborhood of $z_0$, EXCEPT possibly at $z_0$ itself) but $f$ is either undefined at $z_0$, or defined there in a way that breaks holomorphy.

**Three types of isolated singularities**, classified by $f$'s behavior as $z\to z_0$:
1. **Removable**: $f$ is **bounded** near $z_0$ (stays within some fixed distance of the origin, never blowing up). Such a singularity can always be "removed" by appropriately DEFINING (or redefining) $f(z_0)$, after which $f$ becomes fully holomorphic at $z_0$ too — hence "removable."
2. **Pole**: $|f(z)|\to\infty$ as $z\to z_0$ — $f$ genuinely blows up in a specific, well-behaved way (like $\frac{1}{z-z_0}$ near $z_0$).
3. **Essential**: neither of the above — $f$ near $z_0$ is genuinely wild; it neither stays bounded nor tends to $\infty$; instead (a deep fact, Picard's theorem, beyond this concept's scope) $f$ takes on essentially EVERY complex value, infinitely often, in any neighborhood of $z_0$.

**Riemann's Removable Singularity Theorem**: an isolated singularity at $z_0$ is removable **if and only if** $f$ is bounded on some punctured neighborhood of $z_0$. This gives a PRACTICAL test: to check whether a singularity is removable, you don't need to actually construct the patched extension — simply check boundedness.

## Component 4 — Worked Examples

**Example 1 (LO1/LO2 — a removable singularity)**: $f(z) = \frac{\sin z}{z}$ has an isolated singularity at $z_0=0$ (undefined there, since $0/0$). But $f(z)\to1$ as $z\to0$ (a well-known limit), so $f$ is bounded near 0 — by Riemann's theorem, this singularity is **removable**: defining $f(0)=1$ patches $f$ into a fully holomorphic (in fact entire) function.

**Example 2 (LO2 — a pole, breaking MC-1)**: $f(z)=\frac{1}{z^2}$ has an isolated singularity at $z_0=0$. As $z\to0$, $|f(z)|=\frac{1}{|z|^2}\to\infty$ — genuinely unbounded, a **pole**. Contrast with Example 1: both functions are undefined at $z_0=0$, but this one blows up while $\frac{\sin z}{z}$ stays bounded — the SAME superficial "undefined at a point" situation can hide two completely different singularity types, distinguishable only by actually checking the limiting behavior.

**Example 3 (LO2/LO3 — an essential singularity)**: $f(z)=e^{1/z}$ has an isolated singularity at $z_0=0$. Approaching along the positive real axis ($z\to0^+$, real): $e^{1/z}\to\infty$ (blows up). Approaching along the negative real axis ($z\to0^-$, real): $e^{1/z}\to0$ (vanishes). Approaching along the imaginary axis ($z=it$, $t\to0$): $e^{1/(it)}=e^{-i/t}$ oscillates on the unit circle, never settling to any limit. Since $f$ is neither bounded (it blows up along one path) nor tends to $\infty$ (it vanishes along another path) — this is an **essential** singularity, correctly diagnosed by the FAILURE of both the "bounded" and "tends to infinity" tests, rather than needing to invoke Picard's full theorem.

## Component 5 — Teaching Actions

### Teaching Action A01 — The Three Types, via Direct Limiting Behavior (Primitive P11: Representation Shift)

State: "near an isolated singularity, a holomorphic function can only behave in one of three fundamentally different ways — this lesson's entire content is learning to correctly diagnose which." Work Example 1 ($\sin z/z$, bounded, removable) and Example 2 ($1/z^2$, blows up, pole) side by side, emphasizing that superficially both are "undefined at 0," yet the actual LIMITING BEHAVIOR distinguishes them completely.

Shift representation to Riemann's theorem as a formal test: "removable exactly when bounded — this theorem means you never have to actually construct the patch; boundedness alone certifies removability."

- **MC-1 hook**: ask "since both $\sin z/z$ and $1/z^2$ are undefined at $z=0$ in the same superficial way (a $0$ in the denominator, or an indeterminate form), must they have the SAME type of singularity?" — a "yes" answer reveals MC-1 (assuming singularities look alike based on superficial algebraic form, rather than requiring an actual limiting-behavior check).

### Teaching Action A02 — Essential Singularities and the Full Three-Way Classification (Primitive P06: Contrast Pair)

**Contrast 1 (targets MC-1)**: Revisit the full trio — $\sin z/z$ (removable), $1/z^2$ (pole), and Example 3's $e^{1/z}$ (essential) — all "undefined at 0" in the loose everyday sense, but requiring three genuinely different formal diagnoses. State: "the algebraic FORM of a function near a singularity tells you almost nothing on its own — you must actually trace the limiting behavior along different approach paths, especially for candidates that might be essential."

**Contrast 2**: Work through Example 3's essential-singularity diagnosis explicitly — approaching along three different paths (positive real axis, negative real axis, imaginary axis) and getting three genuinely DIFFERENT limiting behaviors (infinity, zero, oscillation). State the diagnostic principle: "if you can find even two different approach paths giving different limits (or a path along which no limit exists at all), that's strong evidence of an essential singularity — neither 'bounded everywhere nearby' nor 'blows up uniformly' can hold if the behavior itself depends on the direction of approach."

### Teaching Action A03 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Classify the singularity of $f(z)=\frac{1-\cos z}{z}$ at $z_0=0$ (hint: check boundedness using the known limit $\lim_{z\to0}\frac{1-\cos z}{z}$).
  2. Classify the singularity of $g(z)=\frac{1}{(z-2)^3}$ at $z_0=2$.
  3. For $h(z)=\sin(1/z)$ at $z_0=0$, evaluate the limiting behavior along the paths $z=\frac{1}{n\pi}\to0$ (where $\sin(1/z)=\sin(n\pi)=0$) and $z=\frac{2}{(2n+1)\pi}\to0$ (where $\sin(1/z)=\pm1$), and use this to classify the singularity.
  4. Explain why Riemann's theorem lets you certify a removable singularity WITHOUT explicitly finding the value that patches the function there.
- **P76 (Transfer Probe, mode = independence)**: "An electrical engineering model for a circuit's transfer function has a mathematical expression $T(s) = \frac{s^2-4}{s-2}$ (where $s$ is a complex frequency variable), which appears undefined at $s=2$. (a) Using algebraic simplification (factoring the numerator) plus this lesson's boundedness test, determine whether $s=2$ is a removable singularity, a pole, or something else. (b) A colleague, working with a genuinely different transfer function $T_2(s)=\frac{1}{(s-2)^2}$, claims 'since both functions have $(s-2)$ causing trouble in the denominator area, they must have the same type of singularity at $s=2$.' Using this lesson's distinction between superficial algebraic form and actual limiting behavior, explain why this claim is incorrect."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | SINGULARITY-TYPE-ASSUMED-FROM-SUPERFICIAL-FORM | Believing functions with a similarly-looking "undefined at a point" algebraic form (e.g. division by zero) must share the same singularity type, without checking actual limiting behavior | Foundational |
| MC-2 | POLE-AND-ESSENTIAL-SINGULARITY-CONFLATED | Believing any singularity where $f$ "blows up" or behaves badly must be a pole, not distinguishing a genuine pole ($|f|\to\infty$ uniformly) from an essential singularity (wildly path-dependent behavior, no single limit even at infinity) | Moderate |
| MC-3 | REMOVABLE-SINGULARITY-REQUIRES-EXPLICIT-PATCH-VALUE | Believing a singularity cannot be certified as removable until the specific patching value is explicitly computed, not recognizing Riemann's theorem allows certification via boundedness alone | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Superficial-Form Singularity Assumption") → P41 (detect: present $\sin z/z$ and $1/z^2$ together and ask if they share the same singularity type) → P64 (conceptual shift: work through both limiting-behavior computations explicitly, showing genuinely different outcomes despite similar algebraic appearance).
- **B02 (targets MC-2)**: P27 (name it: "Pole/Essential Conflation") → P41 (detect: present $e^{1/z}$'s path-dependent behavior and ask whether it's "just a pole, since it blows up somewhere") → P64 (conceptual shift: re-derive by checking multiple approach paths, showing the behavior is not uniformly $\to\infty$ — a genuine pole requires $|f|\to\infty$ along EVERY approach path, not just some).
- **B03 (targets MC-3)**: P27 (name it: "Explicit Patch Value Overrequirement") → P41 (detect: ask a student to certify removability for a case where boundedness is easy to check but the exact limiting value is harder to compute) → P64 (conceptual shift: re-anchor on Riemann's theorem's precise statement — boundedness ALONE is the complete iff condition; the theorem's own content is that this check suffices, without needing the patch value).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.cx.analytic-functions` (holomorphic/analytic functions and complex differentiability, the baseline behavior a singularity is a departure FROM).
- **Unlocks**: `math.cx.laurent-series` (the Laurent series expansion around a singularity directly reveals and refines this concept's three-way classification via the series' negative-power terms), `math.cx.residue-theorem` (residues are computed at poles specifically, building directly on this concept's pole classification).
- **Cross-link**: KG lists no cross-links for this concept.

## Component 8 — Teaching Notes

- estimated_hours = 5 with an expert/analyze tag places this at the "2 main TAs + gate" tier — A01 (the three types via direct limiting-behavior comparison) and A02 (the essential-singularity deep-dive plus the full three-way contrast) jointly cover all three LOs, appropriate for an analyze-level concept whose core skill is correctly diagnosing behavior via careful limiting arguments rather than broad computational technique.
- MC-1 (singularity type assumed from superficial form) was made this blueprint's central, unifying thread — appearing in A01's hook, both main worked-example pairs, and the transfer probe's part (b) — because it captures the single most important lesson this concept teaches: singularity classification is fundamentally a question about ACTUAL FUNCTION BEHAVIOR, never about how the formula happens to be written down.
- Example 3's essential-singularity diagnosis was deliberately built from elementary, directly computable path-dependent limits (rather than invoking Picard's Great Theorem, which would require machinery well beyond this concept's scope) — demonstrating that "neither bounded nor tending to infinity" can be established rigorously using only tools already available, without needing the full strength of Picard's theorem to reach a correct classification.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.cx.analytic-functions`) |
| V-4 | unlocks concepts named accurately from KG | PASS |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (empty in KG → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A03) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.85×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract, grounded directly in rational-function examples) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1/LO2, Ex2→LO2, Ex3→LO2/LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
