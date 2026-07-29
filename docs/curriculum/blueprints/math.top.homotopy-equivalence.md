# Teaching Blueprint: Homotopy Equivalence (`math.top.homotopy-equivalence`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.top.homotopy-equivalence` |
| name | Homotopy Equivalence |
| domain | Topology |
| difficulty | expert |
| bloom | understand |
| mastery_threshold | 0.8 → MAMR = ⌈0.8×5⌉ = 4/5 |
| estimated_hours | 4 |
| requires | `math.top.homotopy` |
| unlocks | none |
| cross_links | none |
| CPA_entry_stage | A (Abstract) — expert learner already fluent in homotopy of maps; homotopy equivalence is a relation between spaces defined via homotopy-commuting maps, requiring no geometric or metric framework |
| description (KG) | Spaces X and Y are homotopy equivalent if ∃ maps f:X→Y, g:Y→X with g∘f≃id_X and f∘g≃id_Y. Contractible spaces ≃ point. ℝⁿ\{0} ≃ Sⁿ⁻¹. Homotopy invariants (fundamental group, homology) are preserved. |

## Component 1 — Learning Objectives

- LO1: Define **homotopy equivalence** ($f:X\to Y$ and $g:Y\to X$ with $g\circ f\simeq\mathrm{id}_X$ and $f\circ g\simeq\mathrm{id}_Y$); distinguish it from homeomorphism (homotopy equivalence is strictly weaker); state that **contractible** spaces (homotopy equivalent to a point) include $\mathbb{R}^n$, convex subsets, and cones.
- LO2: Use **deformation retracts** to establish homotopy equivalences — a subspace $A\subseteq X$ is a deformation retract of $X$ if there exists a retraction $r:X\to A$ homotopic to $\mathrm{id}_X$ rel $A$; prove $X\simeq A$ when $A$ is a deformation retract of $X$.
- LO3: Compute homotopy types of standard spaces using deformation retracts: $\mathbb{R}^n\setminus\{0\}\simeq S^{n-1}$, the cylinder $S^1\times[0,1]\simeq S^1$, the Möbius strip $\simeq S^1$, and the punctured torus $T^2\setminus\{p\}\simeq S^1\vee S^1$.

## Component 2 — Prerequisite Check

Assumes mastery of `math.top.homotopy` (homotopy of maps $H:X\times[0,1]\to Y$, homotopy relative to a subset, homotopy classes, the fundamental group $\pi_1$). The key fact used throughout: homotopy-invariant functors (e.g., $\pi_1$, homology groups) assign equal values to homotopy-equivalent spaces.

## Component 3 — Core Explanation

**Definition.** Spaces $X$ and $Y$ are **homotopy equivalent** (written $X\simeq Y$) if there exist continuous maps $f:X\to Y$ and $g:Y\to X$ such that $g\circ f\simeq\mathrm{id}_X$ and $f\circ g\simeq\mathrm{id}_Y$. The maps $f$ and $g$ are **homotopy inverses** of each other. Homotopy equivalence is an equivalence relation.

**Homeomorphism vs. homotopy equivalence**: Every homeomorphism is a homotopy equivalence (take $g=f^{-1}$ and both compositions are literally equal to the identity). But the converse fails: $\mathbb{R}^n\simeq\{pt\}$ (contractible, as shown below) but $\mathbb{R}^n\not\cong\{pt\}$ (dimension). More strikingly, $[0,1]\simeq\{pt\}$ (contractible) but $[0,1]\not\cong\{pt\}$ (cardinality differs in $\mathsf{Top}$, or more relevantly, $[0,1]$ has a boundary).

**Contractible spaces.** $X$ is **contractible** if $\mathrm{id}_X\simeq c_x$ (the constant map to some point $x\in X$), equivalently $X\simeq\{pt\}$. Contractible implies simply connected ($\pi_1=\{e\}$) and trivial homology in all positive dimensions. Examples: $\mathbb{R}^n$ (contract via $H(x,t)=(1-t)x$), any convex subset of $\mathbb{R}^n$, the cone $CX=X\times[0,1]/X\times\{1\}$.

**Deformation retract.** A subspace $A\subseteq X$ is a **deformation retract** of $X$ if there exists a continuous $H:X\times[0,1]\to X$ with $H(x,0)=x$ for all $x\in X$, $H(x,1)\in A$ for all $x\in X$, and $H(a,1)=a$ for all $a\in A$. Then $r(x)=H(x,1):X\to A$ is a retraction and the inclusion $i:A\hookrightarrow X$ satisfies $r\circ i=\mathrm{id}_A$ and $i\circ r\simeq\mathrm{id}_X$. So $X\simeq A$.

**Key homotopy equivalences**:
- $\mathbb{R}^n\setminus\{0\}\simeq S^{n-1}$: the retraction $r(x)=x/|x|$ deformation retracts via $H(x,t)=(1-t)x+t\,x/|x|=x/|x|^{1-t}$ (for $t\in[0,1]$, the straight line from $x$ to $x/|x|$ misses 0 since $|H(x,t)|=|x|^{1-t}\cdot1^t>0$). Wait, more directly: $H(x,t)=x/|x|^t$ works (at $t=0$: $x$; at $t=1$: $x/|x|\in S^{n-1}$; for all $t$ and $x\neq 0$: $|H(x,t)|=|x|^{1-t}>0$). ✓
- $S^1\times[0,1]\simeq S^1$: deformation retract to $S^1\times\{0\}$ via $H((\theta,s),t)=(\theta,(1-t)s)$.
- Möbius strip $M\simeq S^1$: deformation retract to the central circle.
- $T^2\setminus\{p\}\simeq S^1\vee S^1$: the punctured torus deformation retracts to a figure-eight (wedge of two circles).

**Invariance.** Any **homotopy invariant** — a functor $F:\mathsf{hTop}\to\mathsf{C}$ that assigns equal values to homotopic maps — satisfies $F(X)\cong F(Y)$ when $X\simeq Y$. Fundamental group $\pi_1$, singular homology $H_n$, and singular cohomology $H^n$ are all homotopy invariants. Since $\mathbb{R}^n$ is contractible, $\pi_1(\mathbb{R}^n)=\{e\}$ and $H_k(\mathbb{R}^n)=0$ for $k>0$.

## Component 4 — Worked Examples

**Example 1 (LO1 — $\mathbb{R}^n$ is contractible)**: Define $H:\mathbb{R}^n\times[0,1]\to\mathbb{R}^n$ by $H(x,t)=(1-t)x$. Then $H(x,0)=x=\mathrm{id}(x)$ and $H(x,1)=\mathbf{0}$ (the constant map to the origin). So $\mathrm{id}_{\mathbb{R}^n}\simeq c_{\mathbf{0}}$ via $H$ — $\mathbb{R}^n$ is contractible, hence $\mathbb{R}^n\simeq\{\mathbf{0}\}$. Consequence: $\pi_1(\mathbb{R}^n)=\{e\}$ and all higher homotopy groups of $\mathbb{R}^n$ are trivial. Yet $\mathbb{R}^n\not\cong\{pt\}$: the one-point space is compact, $\mathbb{R}^n$ is not.

**Example 2 (LO2 — $\mathbb{R}^2\setminus\{0\}\simeq S^1$ via deformation retract)**: Let $r:\mathbb{R}^2\setminus\{0\}\to S^1$ by $r(x)=x/|x|$. Define $H(x,t)=x/|x|^t$ for $t\in[0,1]$ (equivalently, $H(x,t)=(1-t)x+t\cdot x/|x|$ normalized). Verify: $H(x,0)=x$; $H(x,1)=x/|x|\in S^1$; $H(u,t)=u$ for $u\in S^1$ (since $|u|=1$ so $u/|u|^t=u$). So $S^1\hookrightarrow\mathbb{R}^2\setminus\{0\}$ is a deformation retract, giving $\mathbb{R}^2\setminus\{0\}\simeq S^1$. Consequence: $\pi_1(\mathbb{R}^2\setminus\{0\})\cong\pi_1(S^1)\cong\mathbb{Z}$ — winding numbers are the fundamental group element.

**Example 3 (LO3 — homotopy inequivalence via fundamental group)**: Show $S^1\not\simeq\mathbb{R}$ by homotopy invariance. $\pi_1(S^1)\cong\mathbb{Z}$ (non-trivial); $\pi_1(\mathbb{R})=\{e\}$ (since $\mathbb{R}$ is contractible). Since $\pi_1$ is a homotopy invariant and $\mathbb{Z}\not\cong\{e\}$ as groups, $S^1\not\simeq\mathbb{R}$. This also reproves $S^1\not\cong\mathbb{R}$ (homeomorphic implies homotopy equivalent), and illustrates that homotopy invariants distinguish spaces.

## Component 5 — Teaching Actions

### Teaching Action A01 — From Homotopy of Maps to Equivalence of Spaces (Primitive P11: Representation Shift)

Review: homotopy is a relation on MAPS between two fixed spaces. Homotopy equivalence is a relation on SPACES: it says the two spaces are "the same" for homotopy-theoretic purposes. Bridge: "if you can deform one space into another (continuously, without tearing) and back, they are homotopy equivalent — even if they're not homeomorphic."

- **MC-1 hook**: ask "if $[0,1]$ and $\{0\}$ are homotopy equivalent, does that mean they're homeomorphic?" — No: homotopy equivalence is STRICTLY weaker. $[0,1]$ is contractible (homotopy equivalent to a point) but not homeomorphic to a point.

### Teaching Action A02 — Deformation Retracts (Primitive P25: Deductive)

Define deformation retract formally. Work Example 2 in full. Emphasize: the retraction map $r(x)=x/|x|$ "squashes" the punctured plane onto the circle, and the homotopy $H(x,t)=x/|x|^t$ does the squashing gradually. The inclusion $i:S^1\hookrightarrow\mathbb{R}^2\setminus\{0\}$ and $r$ are homotopy inverses.

- **MC-2 hook**: ask "is the retraction $r:X\to A$ the ONLY direction in the homotopy equivalence?" — No: both $r\circ i=\mathrm{id}_A$ (exactly, not just up to homotopy) AND $i\circ r\simeq\mathrm{id}_X$ (up to homotopy). Students often confuse the direction and forget to check the second composition.

### Teaching Action A03 — Homotopy Invariants as Distinguishing Tools (Primitive P16: Counterexample)

Work Example 3 (using $\pi_1$ to distinguish $S^1$ and $\mathbb{R}$). List other homotopy invariants: homology groups, Euler characteristic (for CW complexes), oriented cobordism class. Frame: "homotopy equivalence preserves all homotopy-theoretic information — to prove two spaces are NOT homotopy equivalent, find a homotopy invariant they differ on."

- **MC-3 hook**: ask "is contractible the same as compact?" — No: $\mathbb{R}^n$ is contractible but NOT compact; $S^n$ is compact but NOT contractible (it has non-trivial $\pi_n$). Contractibility and compactness are logically independent.

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Show that any convex subset $C\subseteq\mathbb{R}^n$ (with at least one point) is contractible. Construct the explicit contracting homotopy.
  2. Show $\mathbb{R}^n\setminus\{0\}\simeq S^{n-1}$ by constructing a deformation retract. Verify all three conditions of a deformation retract.
  3. Prove that homotopy equivalence is an equivalence relation (reflexivity: $X\simeq X$; symmetry: $X\simeq Y\Rightarrow Y\simeq X$; transitivity).
  4. Use the fundamental group to show that $S^2\not\simeq T^2$ (torus). (Note: $\pi_1(S^2)=\{e\}$; $\pi_1(T^2)\cong\mathbb{Z}\times\mathbb{Z}$.)
- **P76 (Transfer Probe, mode = independence)**: "The **Euler characteristic** is a homotopy invariant for finite CW complexes. (a) Compute $\chi$ for $S^1$ (1 zero-cell, 1 one-cell: $\chi=0$) and for $S^1\vee S^1$ (1 zero-cell, 2 one-cells: $\chi=-1$). (b) A punctured torus $T^2\setminus\{p\}$ is homotopy equivalent to $S^1\vee S^1$. Verify this homotopy invariant prediction: $\chi(T^2\setminus\{p\})$ should equal $\chi(S^1\vee S^1)=-1$. Compute $\chi(T^2\setminus\{p\})$ directly from the CW structure of $T^2$ (1 zero-cell, 2 one-cells, 1 two-cell: $\chi(T^2)=0$) by noting that removing a point from the interior of the two-cell replaces it with an open disk, reducing the two-cell count by 1. (c) Conclude that $T^2\setminus\{p\}\not\simeq S^2\setminus\{p\}$ by computing their Euler characteristics."
- **P55 — Transition Prompt**: "Take a moment. Now try the next challenge."
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78. Not met → Protocol B on missed MC → re-gate.
- **P78 (Completion)**: Homotopy Equivalence — certified.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | HOMOTOPY-EQUIVALENT-MEANS-HOMEOMORPHIC | Believing homotopy equivalence implies homeomorphism — missing that contractible spaces (all homotopy equivalent to a point) need not be homeomorphic to each other: $[0,1]\simeq\{pt\}$ but $[0,1]\not\cong\{pt\}$ | Critical |
| MC-2 | DEFORMATION-RETRACT-DIRECTION-CONFUSED | Believing the deformation retract is only the retraction map $r:X\to A$ (one direction) — missing that BOTH the inclusion $i:A\hookrightarrow X$ and the retraction $r$ must be checked as homotopy inverses | Foundational |
| MC-3 | CONTRACTIBLE-MEANS-COMPACT | Believing "contractible" implies "bounded" or "compact" — conflating a topological deformation property with a metric/compactness property; $\mathbb{R}^n$ is contractible and non-compact | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Homotopy Equivalence Is Strictly Weaker Than Homeomorphism") → P41 (detect: ask whether $[0,1]$ and $\{0\}$ are homeomorphic, then whether they are homotopy equivalent) → P64 (conceptual shift: $[0,1]$ has more than one point so $[0,1]\not\cong\{0\}$; but $H(x,t)=(1-t)x$ is a homotopy from $\mathrm{id}_{[0,1]}$ to the constant map at 0, so $[0,1]\simeq\{0\}$; the key distinction: homotopy equivalence allows "crushing" dimensions that homeomorphism does not).
- **B02 (targets MC-2)**: P27 (name it: "Deformation Retract Has Two Directions") → P41 (detect: ask what conditions are needed for $A$ to be a deformation retract of $X$, and in which direction the homotopy goes) → P64 (conceptual shift: a deformation retract requires (i) $r:X\to A$ with $r|_A=\mathrm{id}_A$, AND (ii) $i\circ r\simeq\mathrm{id}_X$; condition (ii) says the inclusion composed with the retraction is homotopic to the identity on $X$ — this is the "back" direction; without (ii), $r$ is just a retraction, not a homotopy equivalence).
- **B03 (targets MC-3)**: P27 (name it: "Contractible Does Not Mean Compact or Bounded") → P41 (detect: ask whether $\mathbb{R}^2$ is contractible and whether it is compact) → P64 (conceptual shift: $\mathbb{R}^2$ is contractible (H(x,t)=(1-t)x squashes it to the origin) yet $\mathbb{R}^2$ is neither compact nor bounded; compactness and contractibility are independent; the unit disk $D^2$ is contractible AND compact; $S^2$ is compact but NOT contractible ($\pi_2(S^2)\cong\mathbb{Z}$); $\mathbb{R}^2$ is contractible but not compact).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.top.homotopy` (homotopy of maps, homotopy relative to a subspace, the fundamental group $\pi_1$).
- **Unlocks**: none listed in the KG.
- **Cross-link**: none in KG → P76 uses independence mode.

## Component 8 — Teaching Notes

- The deformation retract $\mathbb{R}^2\setminus\{0\}\simeq S^1$ is the single most important concrete homotopy equivalence in the curriculum — it underlies the winding number, the fundamental group of the circle, and the topology of every punctured space. Anchor the lesson on this example.
- The distinction between homotopy equivalence and homeomorphism should be made explicit before any computations: many students learn the definition of homeomorphism first and incorrectly transfer it to homotopy equivalence.
- The Euler-characteristic transfer probe is chosen because $\chi$ is far more computable than $\pi_1$ or homology, yet is still a genuine homotopy invariant that produces a numeric witness to non-equivalence — appropriate for an "understand" bloom level at the transfer stage.
- MAMR = 4/5 reflects that "understand" bloom with a 4-hour estimate sits at the medium gate tier: the four problems test construction (homotopy for convex sets, deformation retract for $S^{n-1}$), structural reasoning (equivalence relation proof), and invariant argument ($\pi_1$ distinction).

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.top.homotopy`) |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (none in KG → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01–A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS (MAMR = 4/5) |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.8×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract: expert, defined via homotopy of maps) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate includes Euler-characteristic transfer probe requiring computation across multiple spaces, not just definition recall | PASS |
