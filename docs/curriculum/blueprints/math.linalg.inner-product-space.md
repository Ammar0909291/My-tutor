# Teaching Blueprint: Inner Product Space (`math.linalg.inner-product-space`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.linalg.inner-product-space` |
| name | Inner Product Space |
| domain | Linear Algebra |
| difficulty | expert |
| bloom | understand |
| mastery_threshold | 0.85 → MAMR = ⌈0.85×5⌉ = 5/5 |
| estimated_hours | 4 |
| requires | `math.linalg.inner-product`, `math.linalg.vector-space` |
| unlocks | `math.linalg.orthogonal-basis`, `math.linalg.gram-schmidt` |
| cross_links | `math.fnal.hilbert-space` (**not yet authored** — verified via `ls`; P76_mode = independence, see Component 7) |
| CPA_entry_stage | A (Abstract) — direct definition, grounded immediately in the already-known inner product |
| description (KG) | A vector space equipped with an inner product. Cauchy-Schwarz inequality: |⟨u,v⟩| ≤ |u||v|. The norm makes it a normed space; if complete, it becomes a Hilbert space. |

## Component 1 — Learning Objectives

- LO1: Define an **inner product space** as a vector space $V$ equipped with an inner product $\langle\cdot,\cdot\rangle$ (already introduced in `math.linalg.inner-product`), and state that this structure automatically INDUCES a norm $\|v\|=\sqrt{\langle v,v\rangle}$, making every inner product space a normed space.
- LO2: State and apply the **Cauchy-Schwarz inequality**, $|\langle u,v\rangle|\leq\|u\|\|v\|$, verifying it for specific vectors, and explain its geometric meaning (a bound on how large an inner product can be relative to the vectors' own lengths).
- LO3: Recognize the hierarchy of structures this concept sits within — inner product space $\Rightarrow$ normed space (via the induced norm) $\Rightarrow$ metric space (via the further-induced metric) — and additionally recognize that a **complete** inner product space is specifically called a **Hilbert space**, a strictly stronger condition than merely being an inner product space.

## Component 2 — Prerequisite Check

Assumes mastery of `math.linalg.inner-product` (the inner product $\langle u,v\rangle$ as a positive-definite symmetric/sesquilinear form generalizing the dot product) and `math.linalg.vector-space` (the underlying vector-space structure).

## Component 3 — Core Explanation

An **inner product space** is a vector space $V$ equipped with an inner product $\langle\cdot,\cdot\rangle: V\times V\to F$ (already defined in the prerequisite concept, satisfying positive-definiteness, symmetry/conjugate-symmetry, and bilinearity/sesquilinearity).

**The induced norm**: every inner product automatically induces a norm via $\|v\| = \sqrt{\langle v,v\rangle}$ — this is guaranteed to be well-defined (since $\langle v,v\rangle\geq0$ always, by positive-definiteness) and can be checked to satisfy all three norm axioms from `math.fnal.normed-space` (definiteness, homogeneity, triangle inequality — the triangle inequality's proof specifically relies on the Cauchy-Schwarz inequality below).

**The Cauchy-Schwarz inequality**: for any $u,v\in V$,
$$|\langle u,v\rangle| \leq \|u\|\,\|v\|$$
Geometrically (in familiar Euclidean settings): recalling $\langle u,v\rangle = \|u\|\|v\|\cos\theta$ for the angle $\theta$ between vectors, this inequality is essentially the statement $|\cos\theta|\leq1$ — the inner product can never exceed the product of the vectors' own lengths.

**The structure hierarchy**: inner product space $\Rightarrow$ (via the induced norm) normed space $\Rightarrow$ (via the norm's own induced metric, $d(x,y)=\|x-y\|$) metric space. This is a chain of STRICT implications — every inner product space is automatically a normed space and a metric space, but the reverse implications fail in general (not every norm comes from an inner product; not every metric comes from a norm). A **Hilbert space** is specifically an inner product space that is additionally **complete** (every Cauchy sequence converges within the space) — completeness is a genuinely ADDITIONAL condition, not automatic just from being an inner product space.

## Component 4 — Worked Examples

**Example 1 (LO1 — the induced norm)**: In $\mathbb{R}^3$ with the standard dot product as inner product, for $v=(1,2,2)$: $\langle v,v\rangle = 1+4+4=9$, so the induced norm $\|v\|=\sqrt{9}=3$ — exactly matching the familiar Euclidean length formula, confirming the induced norm recovers the already-known norm in this standard case.

**Example 2 (LO2 — verifying Cauchy-Schwarz concretely)**: For $u=(1,0,2)$, $v=(2,1,-1)$ in $\mathbb{R}^3$: $\langle u,v\rangle = 1(2)+0(1)+2(-1)=2+0-2=0$. $\|u\|=\sqrt{1+0+4}=\sqrt5$, $\|v\|=\sqrt{4+1+1}=\sqrt6$. Check Cauchy-Schwarz: $|0|=0 \leq \sqrt5\cdot\sqrt6=\sqrt{30}\approx5.48$. ✓ (Here the inequality is far from tight, since $u,v$ happen to be orthogonal — $\langle u,v\rangle=0$ is the smallest possible magnitude, an extreme case of the inequality holding easily.)

**Example 3 (LO3 — the structure hierarchy is not automatically reversible, breaking MC-1)**: The sup-norm $\|f\|_\infty = \sup_x|f(x)|$ on $C([a,b])$ (continuous functions) is a genuine norm (satisfies all three norm axioms, inducing a genuine metric space) — but it is a well-known fact (not derivable from this concept alone, stated here for orientation) that the sup-norm does NOT arise from any inner product on $C([a,b])$ — no inner product $\langle f,g\rangle$ exists whose induced norm equals $\|f\|_\infty$. This demonstrates the hierarchy's STRICTNESS: being a normed space does not automatically make something an inner product space, even though every inner product space IS automatically a normed space — the implication only runs one direction.

## Component 5 — Teaching Actions

### Teaching Action A01 — The Induced Norm and Cauchy-Schwarz (Primitive P11: Representation Shift)

Recall the already-known inner product from the prerequisite concept. State: "just like the ordinary dot product gives you vector length via $\sqrt{v\cdot v}$, ANY inner product induces its own norm the same way — $\|v\|=\sqrt{\langle v,v\rangle}$." Work Example 1's direct computation, confirming the induced norm matches the familiar Euclidean length.

Shift representation to Cauchy-Schwarz: state the inequality, connect it to the familiar $|\cos\theta|\leq1$ geometric fact, and work Example 2's explicit verification (a case where the inequality holds easily, since the vectors are orthogonal).

- **MC-1 hook**: ask "since every inner product space is automatically a normed space, does that mean every normed space must also come from some inner product?" — a "yes" answer reveals MC-1 (believing the inner-product-space-to-normed-space implication reverses, when in fact many valid norms — like the sup-norm — do NOT arise from any inner product).

### Teaching Action A02 — The Structure Hierarchy Is One-Directional, and Completeness as an Extra Condition (Primitive P06: Contrast Pair)

**Contrast 1 (targets MC-1)**: Present Example 3's sup-norm fact directly — a perfectly valid norm on $C([a,b])$ that provably does NOT come from any inner product. State the rule explicitly: "inner product space $\Rightarrow$ normed space is a ONE-WAY implication — every inner product gives you a norm for free, but plenty of legitimate norms (like the sup-norm) are simply not built from any inner product at all."

**Contrast 2**: State the Hilbert space definition precisely: "an inner product space that is ALSO complete" — emphasize completeness as a genuinely separate, additional property (Cauchy sequences converging WITHIN the space), not something automatically guaranteed just by having an inner product. Note (without proof, as orientation only) that finite-dimensional inner product spaces (like $\mathbb{R}^n$) are always automatically complete, but infinite-dimensional ones may or may not be — making the Hilbert-space qualifier a genuinely meaningful, non-automatic distinction specifically in the infinite-dimensional setting.

### Teaching Action A03 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. For $v=(3,0,4)$ in $\mathbb{R}^3$, compute the induced norm $\|v\|$ from the inner product $\langle v,v\rangle$.
  2. Verify Cauchy-Schwarz for $u=(2,1)$, $v=(1,3)$ in $\mathbb{R}^2$, computing $\langle u,v\rangle$, $\|u\|$, $\|v\|$, and confirming the inequality holds.
  3. Explain why the implication "inner product space $\Rightarrow$ normed space" does not reverse, using the sup-norm example.
  4. State the precise definition of a Hilbert space, and explain what ADDITIONAL condition (beyond being an inner product space) it requires.
- **P76 (Transfer Probe, mode = independence)**: "A signal-processing engineer represents audio signals as vectors in a function space, using the inner product $\langle f,g\rangle = \int_a^b f(x)g(x)\,dx$ to measure 'signal correlation.' (a) Using this lesson's induced-norm formula, express the 'signal energy' $\|f\|$ in terms of this integral inner product. (b) The engineer separately considers using the sup-norm $\|f\|_\infty$ (peak signal amplitude) instead, for a different analysis purpose — using this lesson's structure-hierarchy discussion, explain why this peak-amplitude measure, while a perfectly valid norm, is NOT expected to arise from any inner product the way the energy-based norm in part (a) does."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | NORMED-SPACE-ASSUMED-TO-IMPLY-INNER-PRODUCT-SPACE | Believing the "inner product space implies normed space" implication reverses, i.e. that every valid norm must come from some inner product | Foundational |
| MC-2 | HILBERT-SPACE-CONFLATED-WITH-INNER-PRODUCT-SPACE | Treating "inner product space" and "Hilbert space" as synonymous, not recognizing completeness as a genuinely additional, non-automatic requirement | Foundational |
| MC-3 | CAUCHY-SCHWARZ-DIRECTION-REVERSED | Misremembering the Cauchy-Schwarz inequality's direction, believing $\|u\|\|v\|\leq|\langle u,v\rangle|$ rather than the correct $|\langle u,v\rangle|\leq\|u\|\|v\|$ | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Normed-Implies-Inner-Product Reversal") → P41 (detect: ask whether every norm must arise from some inner product) → P64 (conceptual shift: present the sup-norm counterexample directly, establishing the implication's strict one-directionality).
- **B02 (targets MC-2)**: P27 (name it: "Hilbert/Inner-Product-Space Conflation") → P41 (detect: ask for the precise definition of a Hilbert space, checking whether completeness is mentioned as a separate requirement) → P64 (conceptual shift: re-anchor on "Hilbert space = inner product space + completeness — the completeness qualifier is doing real, additional work, not a redundant restatement").
- **B03 (targets MC-3)**: P27 (name it: "Cauchy-Schwarz Direction Reversed") → P41 (detect: ask a student to state the Cauchy-Schwarz inequality and check the direction of the inequality symbol) → P64 (conceptual shift: re-derive via the $|\cos\theta|\leq1$ geometric intuition — the inner product (involving the angle) is bounded ABOVE by the product of lengths, never the reverse).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.linalg.inner-product` (the inner product itself, generalizing the dot product), `math.linalg.vector-space` (the underlying vector-space structure).
- **Unlocks**: `math.linalg.orthogonal-basis` (orthogonality, defined via $\langle u,v\rangle=0$, is a direct application of this concept's inner product structure), `math.linalg.gram-schmidt` (the Gram-Schmidt process constructs an orthogonal basis using exactly this concept's inner product and induced norm).
- **Cross-link**: KG lists `math.fnal.hilbert-space` as a cross-link. Verified via directory listing that no blueprint yet exists at `docs/curriculum/blueprints/math.fnal.hilbert-space.md`. Per the established P76_mode rule, this blueprint uses **independence** mode. A future revision, once that concept is authored, may add a genuine cross-link probe connecting this concept's completeness discussion (Component 3, Teaching Action A02) directly to that concept's full treatment of Hilbert spaces as complete inner product spaces.

## Component 8 — Teaching Notes

- estimated_hours = 4 with an expert/understand tag places this at the "2 main TAs + gate" tier — A01 (the induced norm and Cauchy-Schwarz) and A02 (the one-directional structure hierarchy plus completeness as an extra condition) jointly cover all three LOs.
- MC-1 (normed space assumed to imply inner product space) was made this blueprint's central focus because the directional structure (inner product $\Rightarrow$ norm $\Rightarrow$ metric) is easy to internalize correctly in the FORWARD direction while silently assuming it reverses — the sup-norm counterexample, while stated without full proof (appropriately, given this concept's understand-level scope), was judged essential to include precisely BECAUSE it is the standard, most commonly cited example demonstrating the hierarchy's strictness.
- This blueprint continues the pattern (established across the functional-analysis and measure-theory strands of this corpus) of introducing structure at the abstract entry level while immediately grounding new abstract facts in already-computed concrete examples (Example 1's direct Euclidean-norm recovery) — consistent with the corpus's accumulated judgment that concrete/pictorial staging adds less value than direct grounding-by-example for this kind of axiomatic, hierarchy-building content.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (both) |
| V-4 | unlocks concepts named accurately from KG | PASS |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (`math.fnal.hilbert-space` confirmed absent → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A03) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.85×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract, grounded directly in known inner product) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
