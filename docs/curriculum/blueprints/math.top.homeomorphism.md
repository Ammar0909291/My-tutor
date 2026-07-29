# Teaching Blueprint: Homeomorphism (`math.top.homeomorphism`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.top.homeomorphism` |
| name | Homeomorphism |
| domain | Topology |
| difficulty | expert |
| bloom | understand |
| mastery_threshold | 0.85 → MAMR = ⌈0.85×5⌉ = 5/5 |
| estimated_hours | 3 |
| requires | `math.top.continuity-top` |
| unlocks | none |
| cross_links | none |
| CPA_entry_stage | A (Abstract) — expert learner already fluent in topological continuity; a homeomorphism is defined entirely by continuity conditions on $f$ and $f^{-1}$, with no metric or geometric picture required |
| description (KG) | A homeomorphism is a bijective continuous map with continuous inverse. Homeomorphic spaces are topologically identical. Key examples: (0,1)≅ℝ (via tan), S¹ not homeomorphic to ℝ. Topological invariants distinguish non-homeomorphic spaces. |

## Component 1 — Learning Objectives

- LO1: Define **homeomorphism** ($f:X\to Y$ bijective, $f$ continuous, $f^{-1}$ continuous); state that homeomorphic spaces are **topologically indistinguishable**; list four **topological invariants** (compactness, connectedness, cardinality of fundamental group, Hausdorff property) that are preserved by homeomorphism.
- LO2: **Prove two spaces are not homeomorphic** by exhibiting a topological invariant that one space possesses and the other does not (e.g., compactness distinguishes $[0,1]$ from $(0,1)$; removing a point distinguishes $S^1$ from $\mathbb{R}$).
- LO3: **Construct explicit homeomorphisms** — the tangent map $\tan:\left(-\tfrac\pi2,\tfrac\pi2\right)\to\mathbb{R}$, stereographic projection $S^n\setminus\{N\}\to\mathbb{R}^n$, and the quotient identification $[0,1]/\{0\sim1\}\cong S^1$ — and verify that both $f$ and $f^{-1}$ are continuous.

## Component 2 — Prerequisite Check

Assumes mastery of `math.top.continuity-top` (topological definition of continuity: $f$ continuous iff preimages of open sets are open; homeomorphism requires the same for $f^{-1}$). No metric is assumed.

## Component 3 — Core Explanation

**Definition.** A map $f:X\to Y$ is a **homeomorphism** if (i) $f$ is bijective, (ii) $f$ is continuous, and (iii) $f^{-1}$ is continuous. If such an $f$ exists, $X$ and $Y$ are **homeomorphic**, written $X\cong Y$. Homeomorphism is an equivalence relation on topological spaces.

**Why continuity of $f^{-1}$ is not free**: A bijective continuous map need NOT be a homeomorphism. Classical counterexample: $f:[0,1)\to S^1$ by $f(t)=e^{2\pi it}$ is bijective and continuous, but $f^{-1}$ is not continuous at $f(0)=1$ (small open arcs near 1 on $S^1$ pull back to sets with a gap at 0). The failure is equivalent to $f$ not being an **open map** (images of open sets are not always open).

**Topological invariants** are properties preserved by any homeomorphism; they are used to distinguish spaces:
- **Compactness**: $[0,1]$ is compact; $(0,1)$ is not → not homeomorphic.
- **Connectedness**: removing a point from $S^1$ leaves a connected space; removing a point from $\mathbb{R}$ leaves a disconnected space → $S^1\not\cong\mathbb{R}$.
- **Fundamental group**: $\pi_1(S^1)\cong\mathbb{Z}$; $\pi_1(\mathbb{R})=\{e\}$ → $S^1\not\cong\mathbb{R}$ (also via compactness).
- **Number of path-components after removing a finite set**: useful for graphs and $\mathbb{R}^n$ vs. $\mathbb{R}^m$.

**Key homeomorphisms**:
- $(0,1)\cong\mathbb{R}$: via $f(t)=\tan(\pi(t-\tfrac12))$, inverse $f^{-1}(x)=\tfrac12+\tfrac1\pi\arctan(x)$; both smooth.
- $S^n\setminus\{N\}\cong\mathbb{R}^n$: stereographic projection from the north pole.
- $[0,1]/\{0\sim1\}\cong S^1$: quotient by identifying endpoints.
- $\mathbb{R}^2\setminus\{0\}\cong S^1\times\mathbb{R}$ (deformation retract + Cartesian product — a homotopy equivalence, not just homeomorphism).

**Embedding** vs. **homeomorphism**: $f:X\to Y$ is an embedding if $f:X\to f(X)$ is a homeomorphism (the image inherits the subspace topology correctly). Every homeomorphism is a self-embedding.

## Component 4 — Worked Examples

**Example 1 (LO1–LO3 — explicit homeomorphism $(0,1)\cong\mathbb{R}$)**: Define $f:(0,1)\to\mathbb{R}$ by $f(t)=\tan\!\bigl(\pi(t-\tfrac12)\bigr)$. **(i) Bijective**: $\tan$ maps $(-\pi/2,\pi/2)$ bijectively to $\mathbb{R}$; the linear map $t\mapsto\pi(t-\tfrac12)$ sends $(0,1)$ bijectively to $(-\pi/2,\pi/2)$. **(ii) Continuous**: composition of continuous functions. **(iii) $f^{-1}$ continuous**: $f^{-1}(x)=\tfrac12+\tfrac1\pi\arctan(x)$, which is continuous on $\mathbb{R}$. Conclusion: $(0,1)\cong\mathbb{R}$, so a bounded open interval and the entire real line are topologically indistinguishable — boundedness is NOT a topological invariant.

**Example 2 (LO2 — proving $[0,1]\not\cong(0,1)$ using compactness)**: $[0,1]$ is compact (closed and bounded in $\mathbb{R}$, by Heine–Borel). $(0,1)$ is not compact (it has the open cover $\{(1/n,1): n\ge2\}$ with no finite subcover). Compactness is a topological invariant: if $f:[0,1]\to(0,1)$ were a homeomorphism, then $(0,1)=f([0,1])$ would be compact as a continuous image of a compact space — contradiction. So $[0,1]\not\cong(0,1)$.

**Example 3 (LO2 — proving $S^1\not\cong\mathbb{R}$ by the point-removal argument)**: If $f:S^1\to\mathbb{R}$ were a homeomorphism, then for any $p\in S^1$, $f$ restricts to a homeomorphism $S^1\setminus\{p\}\to\mathbb{R}\setminus\{f(p)\}$. Now $S^1\setminus\{p\}$ is homeomorphic to $(0,1)$ (connected, not compact), but $\mathbb{R}\setminus\{f(p)\}$ is **disconnected** (two components: $(-\infty,f(p))$ and $(f(p),+\infty)$). Since connectedness is a topological invariant, this is a contradiction. So $S^1\not\cong\mathbb{R}$.

## Component 5 — Teaching Actions

### Teaching Action A01 — Why $f^{-1}$ Must Also Be Continuous (Primitive P16: Counterexample)

Present $f:[0,1)\to S^1$, $f(t)=e^{2\pi it}$: bijective, continuous, but $f^{-1}$ fails continuity at 1. Ask: "what goes wrong?" — a small arc near $1\in S^1$ pulls back to a set with a gap at 0, which is not open in $[0,1)$ relative to $\mathbb{R}$. This motivates why the definition requires BOTH $f$ and $f^{-1}$ continuous.

- **MC-1 hook**: ask "is every bijective continuous map a homeomorphism?" — "yes" reveals MC-1; present the $[0,1)\to S^1$ counterexample.

### Teaching Action A02 — Topological Invariants as Distinguishing Tools (Primitive P25: Deductive)

Introduce invariants systematically: compactness (Examples 1–2), connectedness, point-removal connectedness (Example 3). Frame as: "to prove $X\not\cong Y$, find a topological property that one has and the other lacks."

- **MC-2 hook**: ask "could $\mathbb{R}$ and $\mathbb{Q}$ be homeomorphic, since both are countable unions of points?" — no: $\mathbb{R}$ is connected, $\mathbb{Q}$ is totally disconnected.

### Teaching Action A03 — Constructing Homeomorphisms (Primitive P11: Representation Shift)

Work Example 1 (tan map). Describe stereographic projection $S^n\setminus\{N\}\to\mathbb{R}^n$ and the quotient $[0,1]/\{0\sim1\}\to S^1$. Emphasize: "topology allows infinite stretching, bending, and squishing — but no tearing or gluing." 

- **MC-3 hook**: present a "coffee mug ≅ donut" graphic; ask why this is true topologically but a sphere ≇ torus — lead to genus as the distinguishing invariant.

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (5-problem set)**:
  1. Show $(0,\infty)\cong\mathbb{R}$ by constructing an explicit homeomorphism and verifying continuity of both $f$ and $f^{-1}$.
  2. Show that $\mathbb{R}^2\setminus\{0\}$ and $\mathbb{R}^2\setminus\{p,q\}$ (two points removed) are NOT homeomorphic. (Hint: removing a single additional point from the first leaves a connected space, but the second already has one component less.)
  3. Is $[0,1]\cong[0,1]\times[0,1]$? Justify using a topological invariant. (Hint: consider removing a boundary point and counting path-components.)
  4. Show that any open interval $(a,b)$ in $\mathbb{R}$ is homeomorphic to any other open interval $(c,d)$.
  5. Prove: the continuous bijection $f:[0,1)\to S^1$, $f(t)=e^{2\pi it}$, is NOT a homeomorphism by showing $f^{-1}$ fails continuity at the point $1\in S^1$.
- **P76 (Transfer Probe, mode = independence)**: "A map $f:X\to Y$ between compact Hausdorff spaces is a **homeomorphism** if and only if it is bijective and continuous (no separate check on $f^{-1}$ needed). (a) Prove this: if $f$ is continuous, bijective, $X$ compact, $Y$ Hausdorff, then $f$ is a homeomorphism. Hint: show closed sets map to closed sets. (b) Explain why the hypothesis '$X$ compact, $Y$ Hausdorff' cannot be dropped by revisiting the $[0,1)\to S^1$ counterexample: identify which hypothesis that example violates."
- **P55 — Transition Prompt**: "Take a moment. Now try the next challenge."
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78. Not met → Protocol B on missed MC → re-gate.
- **P78 (Completion)**: Homeomorphism — certified.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | HOMEOMORPHISM-MEANS-BIJECTIVE-CONTINUOUS | Believing a bijective continuous map is automatically a homeomorphism — missing that $f^{-1}$ must also be continuous; the canonical counterexample is $[0,1)\to S^1$ | Critical |
| MC-2 | SAME-CARDINALITY-IMPLIES-HOMEOMORPHIC | Believing spaces with the same cardinality of points are homeomorphic — missing that $\mathbb{R}$ and $[0,1]$ have the same cardinality ($\mathfrak{c}$) but are not homeomorphic (compactness differs) | Moderate |
| MC-3 | VISUALLY-SIMILAR-MEANS-HOMEOMORPHIC | Believing spaces that "look similar" geometrically must be homeomorphic — an annulus and a disk look similar locally but are not homeomorphic (removing the central circle from an annulus leaves a connected space, but no analogous cut on the disk disconnects it the same way) | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Homeomorphism Requires Continuous Inverse") → P41 (detect: ask whether $f:[0,1)\to S^1$, $f(t)=e^{2\pi it}$, is a homeomorphism) → P64 (conceptual shift: compute the preimage under $f^{-1}$ of a small arc near $1\in S^1$ that wraps around 0 — the preimage is $[0,\varepsilon)\cup(1-\varepsilon,1)$, which is not open in $[0,1)$ with the subspace topology; so $f^{-1}$ fails continuity; a homeomorphism requires BOTH maps continuous).
- **B02 (targets MC-2)**: P27 (name it: "Same Cardinality Does Not Imply Homeomorphic") → P41 (detect: ask whether $\mathbb{R}\cong[0,1]$ since both are uncountable) → P64 (conceptual shift: compactness is a topological invariant: $[0,1]$ is compact, $\mathbb{R}$ is not; a continuous image of a compact space is compact, so any homeomorphism would force $\mathbb{R}$ to be compact — contradiction; cardinality is set-theoretic, not topological).
- **B03 (targets MC-3)**: P27 (name it: "Visual Similarity Does Not Guarantee Homeomorphism") → P41 (detect: ask whether the closed disk $D^2$ and the annulus $A=\{x:1\le|x|\le2\}$ are homeomorphic) → P64 (conceptual shift: $D^2$ has trivial fundamental group $\pi_1(D^2)=\{e\}$; the annulus has $\pi_1(A)\cong\mathbb{Z}$ (it deformation retracts to $S^1$); fundamental group is a topological invariant, so $D^2\not\cong A$ despite similar local geometry).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.top.continuity-top` (topological continuity via preimages of open sets, needed to define both $f$ and $f^{-1}$ continuous).
- **Unlocks**: none listed in the KG.
- **Cross-link**: none in KG → P76 uses independence mode.

## Component 8 — Teaching Notes

- The counterexample $[0,1)\to S^1$ is the single most important fact in this blueprint: it concretely breaks MC-1 (the dominant misconception) and motivates why the definition has three conditions rather than two.
- The point-removal technique (Example 3) generalizes to many non-homeomorphism proofs in combinatorial topology (e.g., $\mathbb{R}^m\not\cong\mathbb{R}^n$ for $m\neq n$, proved by removing a point and invoking invariance of domain) and is worth establishing firmly here.
- The compact-Hausdorff theorem in the transfer probe is standard and powerful — it removes the $f^{-1}$-continuity requirement in the most common applied setting. Including it at the transfer level seeds future functional-analysis work without burdening the main sequence.
- MAMR = 5/5 reflects that homeomorphism proofs require both construction (LO3) and invariant arguments (LO2), demanding broad coverage at the gate.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.top.continuity-top`) |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (none in KG → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01–A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 5 problems | PASS (MAMR = 5/5) |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.85×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract: expert, defined purely via continuity conditions) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO3, Ex2→LO2, Ex3→LO2) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate includes compact-Hausdorff transfer (genuine proof, not just definition check) | PASS |
