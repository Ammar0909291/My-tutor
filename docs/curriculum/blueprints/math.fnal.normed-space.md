# Teaching Blueprint: Normed Space (`math.fnal.normed-space`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.fnal.normed-space` |
| name | Normed Space |
| domain | Functional Analysis |
| difficulty | expert |
| bloom | understand |
| mastery_threshold | 0.85 → MAMR = ⌈0.85×5⌉ = 5/5 |
| estimated_hours | 4 |
| requires | `math.linalg.vector-space`, `math.linalg.norm` |
| unlocks | `math.fnal.completeness`, `math.fnal.banach-space` |
| cross_links | `math.linalg.norm` (**authored**), `math.real.metric-space` (**authored**) — both verified via `ls`; P76_mode = cross-link probe against both, see Component 7 |
| CPA_entry_stage | A (Abstract) — direct axiomatic definition, grounded immediately in the already-known vector norm |
| description (KG) | A vector space X with norm |·|:X→[0,∞) satisfying: |x|=0⟺x=0, |αx|=|α||x|, |x+y|≤|x|+|y|. The norm induces a metric d(x,y)=|x−y|. Examples: (ℝⁿ,|·|_p), C([a,b]) with sup-norm. |

## Component 1 — Learning Objectives

- LO1: Define a **normed space** as a vector space $X$ equipped with a **norm** $\|\cdot\|:X\to[0,\infty)$ satisfying three axioms: (i) $\|x\|=0 \iff x=0$ (definiteness), (ii) $\|\alpha x\| = |\alpha|\|x\|$ for scalars $\alpha$ (homogeneity), (iii) $\|x+y\|\leq\|x\|+\|y\|$ (the triangle inequality) — and verify these axioms hold for a specific example.
- LO2: Explain and verify that **every norm induces a metric** via $d(x,y)=\|x-y\|$, checking that this induced $d$ satisfies the metric axioms directly from the norm axioms, and recognize this as the precise mechanism connecting normed-space theory to general metric-space theory.
- LO3: Recognize that a single vector space can carry **multiple genuinely different norms** — e.g. $\mathbb{R}^n$ with the Euclidean norm $\|\cdot\|_2$ versus the $\sup$-norm $\|\cdot\|_\infty$, or the function space $C([a,b])$ with its sup-norm — and that "normed space" always refers to the PAIR (vector space, specific norm), not the vector space alone.

## Component 2 — Prerequisite Check

Assumes mastery of `math.linalg.vector-space` (the 8 vector-space axioms) and `math.linalg.norm` (the vector norm $\|v\|=\sqrt{v\cdot v}$ and the general $p$-norm, already stated there to satisfy positivity, homogeneity, and the triangle inequality — this concept generalizes that concrete construction to an abstract axiomatic setting).

## Component 3 — Core Explanation

A **normed space** is a pair $(X,\|\cdot\|)$: a vector space $X$ together with a **norm**, a function $\|\cdot\|:X\to[0,\infty)$ satisfying:
1. $\|x\|=0 \iff x=0$ (only the zero vector has zero norm).
2. $\|\alpha x\| = |\alpha|\,\|x\|$ for every scalar $\alpha$ (scaling the vector scales the norm by the scalar's absolute value).
3. $\|x+y\| \leq \|x\|+\|y\|$ (the **triangle inequality** — the norm of a sum never exceeds the sum of norms).

**The induced metric**: every norm gives rise to a metric $d(x,y) = \|x-y\|$ — the "distance" between two vectors is the norm of their difference. Verifying $d$ satisfies the metric axioms (from `math.real.metric-space`) follows directly from the norm axioms: $d(x,y)=0 \iff \|x-y\|=0 \iff x-y=0 \iff x=y$ (from norm axiom 1); $d(x,y)=\|x-y\|=\|-(y-x)\|=|-1|\|y-x\|=\|y-x\|=d(y,x)$ (symmetry, from homogeneity with $\alpha=-1$); and the triangle inequality for $d$ follows from the norm's own triangle inequality applied to $x-z=(x-y)+(y-z)$.

**Multiple norms on the same space**: the same underlying vector space can be paired with genuinely DIFFERENT norms, producing genuinely different normed spaces. On $\mathbb{R}^n$: the **Euclidean norm** $\|v\|_2=\sqrt{\sum v_i^2}$ versus the **sup-norm** $\|v\|_\infty = \max_i|v_i|$ — both satisfy all three norm axioms, but assign DIFFERENT numerical "sizes" to the same vectors in general. On the function space $C([a,b])$ (continuous functions on $[a,b]$), the standard choice is the **sup-norm** $\|f\|_\infty = \sup_{x\in[a,b]}|f(x)|$.

## Component 4 — Worked Examples

**Example 1 (LO1 — verifying the norm axioms for $\mathbb{R}^2$'s Euclidean norm)**: For $v=(3,4)\in\mathbb{R}^2$ with $\|v\|_2=\sqrt{3^2+4^2}=5$: check axiom 1 ($\|v\|=0$ only if $v=(0,0)$ — true since a sum of squares is zero only when every term is zero). Check axiom 2 with $\alpha=-2$: $\|-2v\|_2 = \|(-6,-8)\|_2=\sqrt{36+64}=10 = |-2|\cdot5$. ✓ Check axiom 3 with $w=(1,0)$: $\|v+w\|_2=\|(4,4)\|_2=\sqrt{32}\approx5.66 \leq \|v\|_2+\|w\|_2 = 5+1=6$. ✓

**Example 2 (LO2 — the induced metric)**: For $x=(1,2)$, $y=(4,6)$ in $(\mathbb{R}^2,\|\cdot\|_2)$: $d(x,y) = \|x-y\|_2 = \|(-3,-4)\|_2 = \sqrt{9+16}=5$ — exactly the ordinary Euclidean distance formula, confirming the induced metric recovers familiar distance directly from the norm.

**Example 3 (LO3 — two different norms on the SAME space give different values, breaking MC-1)**: For $v=(3,4)\in\mathbb{R}^2$: the Euclidean norm gives $\|v\|_2=5$. The sup-norm gives $\|v\|_\infty=\max(3,4)=4$ — a genuinely DIFFERENT number for the exact same vector. Both are perfectly valid norms (both satisfy all three axioms independently — verifiable directly for the sup-norm too), demonstrating that "the norm of $v$" is meaningless without specifying WHICH norm; $(\mathbb{R}^2,\|\cdot\|_2)$ and $(\mathbb{R}^2,\|\cdot\|_\infty)$ are formally different normed spaces built on the same underlying vector space.

## Component 5 — Teaching Actions

### Teaching Action A01 — The Three Norm Axioms, Grounded in the Euclidean Norm (Primitive P11: Representation Shift)

Recall the already-known vector norm $\|v\|=\sqrt{v\cdot v}$ from `math.linalg.norm`. State: "this lesson takes exactly those already-verified properties — positivity/definiteness, homogeneity, triangle inequality — and turns them into an ABSTRACT definition: ANY function on a vector space satisfying these three rules is called a norm, whether or not it looks like the familiar Euclidean formula." Work Example 1's explicit three-axiom verification for a concrete vector.

Shift representation: state the induced-metric formula $d(x,y)=\|x-y\|$, working Example 2 to show it recovers the ordinary distance formula already familiar from coordinate geometry.

- **MC-1 hook**: ask "for the vector $(3,4)$, is its 'norm' simply and unambiguously the number 5?" — a "yes" answer reveals MC-1 (treating "the norm" as a single, unambiguous, space-independent quantity, rather than recognizing it depends entirely on WHICH norm function is being used).

### Teaching Action A02 — Multiple Norms on One Space, and the Induced-Metric Verification (Primitive P06: Contrast Pair)

**Contrast 1 (targets MC-1)**: Work Example 3's direct comparison — the same vector $(3,4)$ giving $\|v\|_2=5$ under the Euclidean norm but $\|v\|_\infty=4$ under the sup-norm. State the rule explicitly: "a 'normed space' is always the PAIR (vector space, specific norm) — never assume there's only one possible norm for a given vector space; $\mathbb{R}^n$ alone supports infinitely many valid norms (the entire family of $p$-norms, plus more), each defining a genuinely different normed space."

**Contrast 2**: Walk through the induced-metric verification from Component 3 line by line — showing each metric axiom (zero iff equal, symmetry, triangle inequality) following DIRECTLY from the corresponding norm axiom, rather than needing independent proof. State: "this is the precise mechanism by which every normed space automatically becomes a metric space — you get the metric axioms for free, once the norm axioms are established."

### Teaching Action A03 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Verify the three norm axioms for $v=(0,-6)\in\mathbb{R}^2$ using the Euclidean norm, checking each axiom explicitly with a specific scalar for axiom 2.
  2. Compute $\|(3,4)\|_2$, $\|(3,4)\|_\infty$, and $\|(3,4)\|_1$ (the taxicab/1-norm, $\sum|v_i|$), confirming they give three genuinely different numbers for the same vector.
  3. Using the induced-metric formula, find the distance between $x=(2,-1)$ and $y=(5,3)$ in $(\mathbb{R}^2,\|\cdot\|_2)$.
  4. Explain why $\|x-y\|=0$ if and only if $x=y$, tracing the argument back to the norm's own definiteness axiom.
- **P76 (Transfer Probe, mode = cross-link probe against `math.linalg.norm` and `math.real.metric-space`)**: "Recall from your `math.linalg.norm` lesson that $\|v\|=\sqrt{v\cdot v}$ satisfies positivity, homogeneity, and the triangle inequality — and from your `math.real.metric-space` lesson that a metric $d$ must satisfy $d(x,y)=0\iff x=y$, symmetry, and its own triangle inequality. (a) Using THIS lesson's induced-metric formula $d(x,y)=\|x-y\|$, explicitly verify all three metric axioms for $d$, citing exactly which norm axiom from `math.linalg.norm` justifies each metric axiom step. (b) That metric-space lesson gave $\mathbb{R}^n$ (Euclidean) and $C([a,b])$ (sup metric) as named examples of metric spaces — using this lesson's normed-space framework, identify the SPECIFIC norm on each of these vector spaces that induces exactly the metric named in that lesson."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | NORM-TREATED-AS-SPACE-INDEPENDENT-UNIQUE-QUANTITY | Believing "the norm" of a vector is a single, unambiguous number independent of which norm function is chosen, rather than recognizing a vector space can carry multiple genuinely different valid norms | Foundational |
| MC-2 | INDUCED-METRIC-AXIOMS-ASSUMED-WITHOUT-VERIFICATION | Assuming the induced metric $d(x,y)=\|x-y\|$ automatically satisfies the metric axioms without connecting each metric axiom back to the specific norm axiom that justifies it | Moderate |
| MC-3 | NORM-AXIOMS-CHECKED-ONLY-FOR-POSITIVE-SCALARS | When verifying the homogeneity axiom $\|\alpha x\|=|\alpha|\|x\|$, testing only positive scalars and missing the absolute-value requirement for negative $\alpha$ | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Norm Uniqueness Assumption") → P41 (detect: ask for "the norm" of $(3,4)$ without specifying which norm, checking whether the student asks for clarification) → P64 (conceptual shift: work through Example 3's explicit two-norm comparison on the identical vector, showing genuinely different valid answers).
- **B02 (targets MC-2)**: P27 (name it: "Induced Metric Axioms Unverified") → P41 (detect: ask a student to justify why $d(x,y)=\|x-y\|$ satisfies symmetry, checking if they cite the specific norm axiom (homogeneity with $\alpha=-1$) or just assert it) → P64 (conceptual shift: re-derive the symmetry check explicitly: $d(y,x)=\|y-x\|=\|(-1)(x-y)\|=|-1|\|x-y\|=\|x-y\|=d(x,y)$).
- **B03 (targets MC-3)**: P27 (name it: "Homogeneity Checked with Positive Scalars Only") → P41 (detect: ask a student to verify homogeneity, checking whether they test a negative scalar like $\alpha=-3$) → P64 (conceptual shift: re-verify explicitly with a negative scalar, confirming the absolute value $|\alpha|$ correctly handles the sign — $\|-3v\| = 3\|v\|$, not $-3\|v\|$, since norms are always nonnegative).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.linalg.vector-space` (the vector-space structure a norm is defined on top of), `math.linalg.norm` (the concrete Euclidean/$p$-norm construction this concept abstracts into a general axiomatic definition).
- **Unlocks**: `math.fnal.completeness` (completeness of a normed space is defined using Cauchy sequences measured via this concept's norm), `math.fnal.banach-space` (a Banach space is defined as a complete normed space — this concept's entire structure).
- **Cross-link**: KG lists `math.linalg.norm` and `math.real.metric-space` as cross-links. Verified via directory listing that BOTH `docs/curriculum/blueprints/math.linalg.norm.md` and `docs/curriculum/blueprints/math.real.metric-space.md` **are already authored** — the first instance in this corpus where BOTH named cross-link targets are simultaneously available. The P76 transfer probe above genuinely engages both: part (a) reuses `math.linalg.norm`'s specific axiom statements to justify each step of the induced-metric verification; part (b) reuses `math.real.metric-space`'s own named examples ($\mathbb{R}^n$, $C([a,b])$) and asks the learner to identify the specific inducing norm for each, directly connecting this concept to both prerequisites' concrete content rather than treating either as merely background.

## Component 8 — Teaching Notes

- estimated_hours = 4 with an expert/understand tag places this at the "2 main TAs + gate" tier — A01 (the three norm axioms grounded in the Euclidean norm, plus the induced metric) and A02 (multiple-norms contrast plus the induced-metric-axiom verification) jointly cover all three LOs.
- This is the first blueprint in the corpus with BOTH of its cross-link targets simultaneously authored, allowing a single cross-link probe to genuinely engage both prerequisites' specific content in two distinct parts (a) and (b), rather than needing to choose one target over the other or note one as still pending — establishing a further refinement of the P76_mode rule for concepts with multiple ready cross-links.
- MC-1 (norm treated as space-independent unique quantity) was made this blueprint's central focus because the everyday phrase "the norm of a vector," used casually in earlier prerequisite material (`math.linalg.norm`) without needing to distinguish between norm choices, creates exactly the assumption this concept's entire abstraction (norms as a CHOICE, not a fixed given) is designed to overturn.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (both) |
| V-4 | unlocks concepts named accurately from KG | PASS |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (both confirmed present → cross-link probe against both) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A03) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (cross-link probe against both authored targets) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.85×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract, grounded directly in known norm) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
