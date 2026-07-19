# Teaching Blueprint: Cauchy's Theorem (`math.cx.cauchy-theorem`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.cx.cauchy-theorem` |
| name | Cauchy's Theorem |
| domain | Complex Analysis |
| difficulty | expert |
| bloom | understand |
| mastery_threshold | 0.9 → MAMR = ⌈0.9×5⌉ = 5/5 |
| estimated_hours | 6 |
| requires | `math.cx.complex-integration` |
| unlocks | `math.cx.cauchy-integral-formula`, `math.cx.cauchy-goursat` |
| cross_links | none |
| CPA_entry_stage | A (Abstract) — direct theorem statement grounded immediately in already-computed complex line integrals |
| description (KG) | If f is holomorphic on a simply connected domain D, then ∮_C f(z)dz = 0 for every closed curve C in D. Equivalently, the integral is path-independent. Proved via Green's theorem (with Goursat's refinement removing differentiability assumption on f′). |

## Component 1 — Learning Objectives

- LO1: State **Cauchy's Theorem** precisely: if $f$ is holomorphic on a **simply connected domain** $D$, then $\oint_C f(z)\,dz=0$ for **every** closed curve $C$ in $D$ — and correctly verify BOTH hypotheses (holomorphic; simply connected domain) before applying the conclusion.
- LO2: Explain the equivalent **path-independence** formulation — for a holomorphic $f$ on a simply connected domain, $\int_{C_1}f\,dz = \int_{C_2}f\,dz$ for ANY two curves $C_1,C_2$ sharing the same endpoints — and connect this directly to the closed-curve statement (since $C_1$ followed by $-C_2$ forms a closed curve).
- LO3: Recognize that BOTH hypotheses are essential — construct/identify counterexamples where the conclusion fails because $f$ is NOT holomorphic everywhere in $D$ (a singularity present), or because $D$ is NOT simply connected (has a "hole"), even when $f$ is otherwise holomorphic on the rest of the domain.

## Component 2 — Prerequisite Check

Assumes mastery of `math.cx.complex-integration` (the complex line integral $\int_C f(z)\,dz$, its computation via parametrization, and its linearity/reversal properties).

## Component 3 — Core Explanation

**Cauchy's Theorem**: if $f$ is **holomorphic** on a **simply connected domain** $D$ (a domain with "no holes" — any closed curve in $D$ can be continuously shrunk to a point without leaving $D$), then:
$$\oint_C f(z)\,dz = 0$$
for **every** closed curve $C$ lying entirely within $D$.

**Equivalent path-independence formulation**: for two curves $C_1,C_2$ in $D$ sharing the same starting and ending points, $\int_{C_1}f\,dz=\int_{C_2}f\,dz$ — the integral depends only on the ENDPOINTS, not the specific path taken between them (within $D$). This follows directly from the closed-curve version: the curve formed by traversing $C_1$ forward then $C_2$ in reverse (call it $C_1 * (-C_2)$) is a closed curve, so Cauchy's Theorem gives $\int_{C_1}f\,dz + \int_{-C_2}f\,dz = 0$, i.e. $\int_{C_1}f\,dz - \int_{C_2}f\,dz=0$ (using the reversal property from `math.cx.complex-integration`), giving path-independence directly.

**Both hypotheses are essential — this is not a technicality**:
- **Holomorphic everywhere in $D$**: if $f$ has even ONE singularity inside $D$ (a point where it fails to be holomorphic), the theorem's conclusion can fail — the classic counterexample is $f(z)=\frac{1}{z}$ around a closed curve encircling $z=0$: $\oint_C\frac{1}{z}\,dz = 2\pi i \neq 0$, precisely because $f$ is NOT holomorphic at the singularity $z=0$ enclosed by $C$.
- **Simply connected $D$**: if $D$ has a "hole" (isn't simply connected), even a function holomorphic on ALL of $D$ can fail to satisfy the theorem for curves that "go around" the hole — the theorem's proof genuinely requires the ability to shrink any closed curve to a point without leaving the domain, which a domain with a hole doesn't allow for curves encircling that hole.

## Component 4 — Worked Examples

**Example 1 (LO1 — verifying both hypotheses before applying)**: Let $f(z)=z^2$ (entire, holomorphic everywhere) and $D=\mathbb{C}$ (simply connected — the whole plane, no holes). For ANY closed curve $C$ in $\mathbb{C}$: both hypotheses hold, so Cauchy's Theorem applies directly: $\oint_C z^2\,dz=0$, with no computation needed.

**Example 2 (LO2 — path-independence, computing via a convenient path)**: Since $f(z)=e^z$ is entire, and $\mathbb{C}$ is simply connected, $\int_C e^z\,dz$ from $0$ to $1+i$ is path-independent — compute it using the SIMPLEST convenient path (the straight segment), rather than a more complicated curve, since Cauchy's Theorem guarantees any path gives the same answer: parametrize $\gamma(t)=t(1+i)$, giving $\int_0^1 e^{t(1+i)}(1+i)\,dt = e^{t(1+i)}\Big|_0^1 = e^{1+i}-1$ — the same value ANY other path from $0$ to $1+i$ would also give.

**Example 3 (LO3 — both hypothesis-failure counterexamples, breaking MC-1)**: For $f(z)=\frac{1}{z}$ on $D=\mathbb{C}\setminus\{0\}$ (the punctured plane, which IS simply connected in the sense of... actually the punctured plane is NOT simply connected — a loop around the puncture cannot shrink to a point without leaving $D$): taking $C$ = the unit circle (a closed curve encircling the singularity/puncture), $\oint_C\frac{1}{z}\,dz = 2\pi i\neq0$ — Cauchy's Theorem's conclusion genuinely FAILS here, precisely because $D=\mathbb{C}\setminus\{0\}$ is not simply connected (equivalently, because $f$ has a singularity at the excluded point $0$, which is "enclosed" by $C$). Contrast: on the SMALLER, genuinely simply-connected domain $D'=\{z: \mathrm{Re}(z)>0\}$ (right half-plane, avoiding $z=0$ entirely and having no holes), $f(z)=\frac1z$ IS holomorphic throughout, and Cauchy's Theorem correctly applies: any closed curve entirely within $D'$ gives $\oint_C\frac1z\,dz=0$.

## Component 5 — Teaching Actions

### Teaching Action A01 — The Theorem Statement and Path-Independence (Primitive P11: Representation Shift)

State Cauchy's Theorem directly, emphasizing BOTH hypotheses explicitly: "holomorphic EVERYWHERE in $D$, and $D$ itself has NO HOLES (simply connected) — both conditions, always checked together." Work Example 1's direct, computation-free application.

Shift representation to path-independence: derive it from the closed-curve statement using the "$C_1$ then $-C_2$ forms a closed curve" argument, then work Example 2's practical use — choosing the SIMPLEST path for a computation, using Cauchy's Theorem to guarantee any path gives the same answer.

- **MC-1 hook**: present $f(z)=\frac1z$ on the punctured plane $\mathbb{C}\setminus\{0\}$ with $C$ = unit circle, and ask "since $f$ is holomorphic everywhere ON this domain (it's only undefined at the excluded point 0, which isn't part of the domain), does Cauchy's Theorem guarantee $\oint_C\frac1z\,dz=0$?" — a "yes" answer reveals MC-1 (checking only the holomorphic-everywhere-in-$D$ condition while overlooking that $D$ itself must ALSO be simply connected).

### Teaching Action A02 — Both Hypothesis Failures, Side by Side (Primitive P06: Contrast Pair)

**Contrast 1 (targets MC-1)**: Work Example 3's full computation ($\oint_C\frac1z\,dz=2\pi i\neq0$ on the punctured plane) directly, confirming the theorem's conclusion genuinely fails — then explain precisely WHY: the punctured plane $\mathbb{C}\setminus\{0\}$ is not simply connected, since the unit circle (encircling the missing point) cannot be continuously shrunk to a point without crossing the excluded origin.

**Contrast 2**: Place the punctured-plane failure directly beside the right-half-plane success (same $f(z)=1/z$, genuinely simply connected domain avoiding the singularity entirely) — state the precise diagnostic: "it's not that $1/z$ is somehow 'bad' — it's holomorphic everywhere it's actually defined. The theorem fails specifically when the DOMAIN you're working in either contains a singularity of $f$ or has a hole that a closed curve wraps around — check both conditions for the SPECIFIC domain and curve in question, not just the function's general behavior."

### Teaching Action A03 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Explain why $\oint_C \sin(z)\,dz=0$ for ANY closed curve $C$ in $\mathbb{C}$, citing both of Cauchy's Theorem's hypotheses explicitly.
  2. Using path-independence, explain why $\int_C \cos(z)\,dz$ from $0$ to $\pi i$ gives the same value regardless of which specific path (within $\mathbb{C}$) connects these two points.
  3. Explain why Cauchy's Theorem does NOT directly guarantee $\oint_C \frac{1}{z-3}\,dz=0$ for a closed curve $C$ that is the circle of radius 5 centered at the origin (hint: check whether the singularity at $z=3$ lies inside or outside $C$, and whether the resulting domain is simply connected).
  4. Give an example of a domain $D$ and a function $f$ holomorphic throughout $D$, where $D$ is NOT simply connected, and briefly describe what the theorem's conclusion would need you to check before applying it.
- **P76 (Transfer Probe, mode = independence)**: "An electrical engineer computing a complex-frequency-domain integral around a closed contour wants to confirm it evaluates to zero, citing 'Cauchy's Theorem' as justification. The integrand is a transfer function with a pole (singularity) located OUTSIDE the specific contour being used, though the same transfer function has other poles elsewhere in the complex plane, well outside this particular contour. (a) Using this lesson's precise hypothesis-checking discipline, explain what SPECIFICALLY needs to be verified about the region enclosed by this particular contour (not the whole complex plane) before concluding the integral is zero. (b) A colleague objects: 'but this transfer function has poles somewhere in the complex plane, so Cauchy's Theorem can never apply to it, ever' — explain why this objection is too broad, using this lesson's own contrast between the punctured-plane failure and the right-half-plane success for the SAME function $1/z$."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | SIMPLY-CONNECTED-HYPOTHESIS-OVERLOOKED | Checking only that $f$ is holomorphic on the domain as stated, without separately verifying the domain itself is simply connected (no holes) | Foundational |
| MC-2 | SINGLE-SINGULARITY-ANYWHERE-DISQUALIFIES-ENTIRE-FUNCTION | Believing a function with ANY singularity anywhere in the complex plane can never satisfy Cauchy's Theorem's hypotheses, rather than checking the specific domain/curve of interest | Moderate |
| MC-3 | PATH-INDEPENDENCE-ASSUMED-FOR-NON-SIMPLY-CONNECTED-DOMAINS | Applying the path-independence conclusion (any two paths give the same integral) even when the domain is not simply connected, or when a singularity lies between the two paths | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Simply-Connected Hypothesis Overlooked") → P41 (detect: present the punctured-plane/unit-circle case and ask if Cauchy's Theorem applies, checking whether the student verifies simple-connectedness separately from holomorphy) → P64 (conceptual shift: re-anchor on "TWO hypotheses, always both checked — holomorphic throughout $D$, AND $D$ itself simply connected — neither implies the other").
- **B02 (targets MC-2)**: P27 (name it: "Any-Singularity-Anywhere Overgeneralization") → P41 (detect: present $1/z$ on the right-half-plane, away from its one singularity at 0, and ask if Cauchy's Theorem can ever apply to this function) → P64 (conceptual shift: re-anchor on "check the SPECIFIC domain and curve you're actually using — a function can be perfectly holomorphic on a smaller domain even if it has singularities elsewhere in the plane, outside that domain").
- **B03 (targets MC-3)**: P27 (name it: "Path-Independence Overextended") → P41 (detect: present two paths with a singularity lying between them, in a domain that is therefore not simply connected relative to those paths, and ask if the integrals must match) → P64 (conceptual shift: re-derive using the "combined closed curve" argument, showing it requires the combined curve to lie entirely within a simply connected region — if a singularity sits between the paths, the combined closed curve encircles it, and Cauchy's Theorem's hypothesis fails).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.cx.complex-integration` (the complex line integral this theorem's conclusion is stated about, plus the reversal-of-path property used to derive the path-independence formulation).
- **Unlocks**: `math.cx.cauchy-integral-formula` (the Cauchy Integral Formula is a direct, powerful consequence of this theorem, applied to a punctured domain), `math.cx.cauchy-goursat` (the refined Cauchy-Goursat version removing the differentiability-of-$f'$ assumption from the original proof).
- **Cross-link**: KG lists no cross-links for this concept.

## Component 8 — Teaching Notes

- estimated_hours = 6 with an expert/understand tag and this corpus's highest-yet mastery_threshold in this narrow range (0.9, MAMR 5/5) reflects the theorem's status as one of complex analysis's foundational, load-bearing results — the "2 main TAs + gate" structure (A01: theorem statement plus path-independence; A02: both hypothesis-failure counterexamples side by side) was kept lean since the theorem's STATEMENT and correct hypothesis-checking are this concept's entire content — the proof itself (via Green's Theorem, with Goursat's refinement) is explicitly named in the KG description but deliberately NOT developed here, deferred to `math.cx.cauchy-goursat`.
- MC-1 (simply-connected hypothesis overlooked) was made this blueprint's central focus, ahead of even the holomorphy condition, because "holomorphic on $D$" is the more intuitive, more frequently emphasized condition in casual statements of the theorem, while "$D$ is simply connected" is easy to treat as a technical footnote rather than an equally load-bearing requirement — Example 3's punctured-plane counterexample was chosen specifically because it isolates this exact failure (the function IS holomorphic everywhere it's defined on that domain; only the domain's topology is at fault).
- The electrical-engineering transfer probe was chosen because "does this contour integral vanish" is a genuine, common real-world question in signal processing and control theory, and the colleague's over-broad objection in part (b) is a realistic instance of MC-2, giving the correction immediate practical stakes.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.cx.complex-integration`) |
| V-4 | unlocks concepts named accurately from KG | PASS |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (empty in KG → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A03) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.9×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract, grounded directly in known integrals) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
