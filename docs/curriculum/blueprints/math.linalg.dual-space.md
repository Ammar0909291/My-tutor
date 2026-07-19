# Teaching Blueprint: Dual Space (`math.linalg.dual-space`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.linalg.dual-space` |
| name | Dual Space |
| domain | Linear Algebra |
| difficulty | expert |
| bloom | understand |
| mastery_threshold | 0.75 → MAMR = ⌈0.75×5⌉ = 4/5 |
| estimated_hours | 5 |
| requires | `math.linalg.vector-space`, `math.linalg.linear-map` |
| unlocks | `math.linalg.tensor` |
| cross_links | `math.fnal.dual-space-functional` (**authored**) — verified via `ls`; P76_mode = cross-link probe, see Component 7 |
| CPA_entry_stage | A (Abstract) — expert learner already fluent in vector spaces and linear maps; the dual space is introduced directly as linear maps whose target is the field itself |
| description (KG) | V* = Hom(V,F), the space of all linear functionals on V. dim(V*)=dim(V). Dual basis {f¹,…,fⁿ} satisfies fⁱ(eⱼ)=δᵢⱼ. Key in differential geometry (1-forms) and functional analysis. |

## Component 1 — Learning Objectives

- LO1: Define the **dual space** $V^*=\mathrm{Hom}(V,F)$ — the set of all linear functionals $f:V\to F$ — as itself a vector space under pointwise addition and scalar multiplication of functionals, recognizing this as `math.linalg.linear-map`'s own linearity definition applied to maps whose TARGET is the field $F$ itself (a $1$-dimensional vector space over itself), requiring no new machinery beyond what linear maps already provide.
- LO2: Construct the **dual basis** $\{f^1,\dots,f^n\}$ for $V^*$ from a basis $\{e_1,\dots,e_n\}$ of $V$, defined by $f^i(e_j)=\delta_{ij}$, and use this EXPLICIT basis to prove $\dim(V^*)=\dim(V)$ — a fact established by direct construction, not assumed.
- LO3 (cross-link probe, engaging `math.fnal.dual-space-functional`): contrast this concept's **algebraic** dual $V^*=\mathrm{Hom}(V,F)$ (defined for ANY vector space over any field, with no notion of continuity or boundedness) against `math.fnal.dual-space-functional`'s **analytic** dual $X^*$ (only BOUNDED linear functionals on a normed space count) — recognizing that the two notions COINCIDE in finite dimensions (every linear functional there is automatically bounded) but genuinely DIVERGE in infinite dimensions, where $X^*$ becomes a strictly smaller space than the full algebraic dual.

## Component 2 — Prerequisite Check

Assumes mastery of `math.linalg.vector-space` (the eight vector space axioms, applicable to $F$ itself viewed as a $1$-dimensional vector space over itself) and `math.linalg.linear-map` (the additivity and homogeneity conditions defining linearity, and that a linear map is fully determined by its action on a basis).

## Component 3 — Core Explanation

**$V^*$ is a vector space of functionals, built from linearity alone**: a linear functional $f:V\to F$ is simply a linear map (`math.linalg.linear-map`'s definition, additivity plus homogeneity) whose codomain happens to be $F$ itself rather than some other vector space. The set of all such functionals, $V^*=\mathrm{Hom}(V,F)$, is itself a vector space: given $f,g\in V^*$, their pointwise sum $(f+g)(v)=f(v)+g(v)$ and scalar multiple $(cf)(v)=c\cdot f(v)$ are themselves linear functionals, so $V^*$ is closed under the operations a vector space requires — nothing beyond `math.linalg.linear-map`'s own linearity check is needed to verify this.

**The dual basis, and why it proves $\dim(V^*)=\dim(V)$**: given a basis $\{e_1,\dots,e_n\}$ of $V$, define $f^i\in V^*$ by specifying its action on each basis vector: $f^i(e_j)=\delta_{ij}$ (i.e. $f^i(e_i)=1$ and $f^i(e_j)=0$ for $j\ne i$), then extending linearly to all of $V$ (a linear map is fully determined by its values on a basis, per `math.linalg.linear-map`). The resulting $n$ functionals $\{f^1,\dots,f^n\}$ form a BASIS for $V^*$: any $f\in V^*$ can be written $f=\sum_i f(e_i)f^i$ (they span), and no nontrivial linear combination of them is the zero functional (evaluating at each $e_j$ isolates each coefficient, proving independence). Since $V^*$ has a basis of exactly $n$ elements, $\dim(V^*)=n=\dim(V)$ — a genuine, constructed equality, not an assumption.

**Algebraic dual vs. analytic dual — where the two notions coincide, and where they diverge (the cross-link)**: `math.fnal.dual-space-functional` studies $X^*$, the space of BOUNDED (continuous) linear functionals on a NORMED space $X$ — a strictly more restrictive definition than this concept's $V^*=\mathrm{Hom}(V,F)$, which requires only linearity, no norm or boundedness at all. In FINITE dimensions, every linear functional is automatically bounded (a fact `math.fnal.dual-space-functional` itself notes), so the two notions coincide completely — $V^*$ from this concept and $X^*$ from that one are literally the same space. In INFINITE dimensions, however, the algebraic dual $\mathrm{Hom}(V,F)$ can be dramatically LARGER than the analytic dual of bounded functionals alone — the boundedness condition genuinely excludes functionals that exist algebraically but fail to be continuous with respect to a chosen norm.

## Component 4 — Worked Examples

**Example 1 (LO1 — $V^*$ as a vector space, reusing the linear-map linearity check, breaking MC-1)**: On $V=\mathbb{R}^3$, define $f(x,y,z)=2x-3y+z$. Check linearity exactly as `math.linalg.linear-map`'s own Example 1 does, just with codomain $F=\mathbb R$ instead of another vector space: additivity, $f((x_1,y_1,z_1)+(x_2,y_2,z_2))=2(x_1+x_2)-3(y_1+y_2)+(z_1+z_2)=[2x_1-3y_1+z_1]+[2x_2-3y_2+z_2]=f(v_1)+f(v_2)$ ✓; homogeneity similarly ✓. So $f\in V^*$ — no norm, inner product, or geometric structure of any kind was invoked, only the linearity check already familiar from ordinary linear maps.

**Example 2 (LO2 — the dual basis, constructed explicitly for $\mathbb R^3$)**: with standard basis $e_1=(1,0,0)$, $e_2=(0,1,0)$, $e_3=(0,0,1)$, define the coordinate functionals $f^1(x,y,z)=x$, $f^2(x,y,z)=y$, $f^3(x,y,z)=z$. Check: $f^1(e_1)=1$, $f^1(e_2)=0$, $f^1(e_3)=0$ — i.e. $f^1(e_j)=\delta_{1j}$ ✓, and similarly for $f^2,f^3$. Any functional $f(x,y,z)=ax+by+cz$ equals $a f^1+b f^2+c f^3$ (spanning), and evaluating a combination $\alpha f^1+\beta f^2+\gamma f^3$ at $e_1,e_2,e_3$ in turn shows $\alpha=\beta=\gamma=0$ is forced whenever the combination is the zero functional (independence). So $\{f^1,f^2,f^3\}$ is a basis of $V^*$, giving $\dim(V^*)=3=\dim(V)$ — established by an explicit, checkable construction.

**Example 3 (LO3 — cross-link probe, algebraic vs. analytic dual, breaking MC-3)**: in the finite-dimensional case above ($V=\mathbb R^3$), every linear functional (like $f^1,f^2,f^3$) is automatically bounded/continuous — `math.fnal.dual-space-functional`'s analytic dual and this concept's algebraic dual are the SAME space here, no distinction matters. Now consider $V=$ the space of all real sequences with finite support (only finitely many nonzero terms), with coordinate functionals $f^1,f^2,f^3,\dots$ extending the idea above indefinitely. The ALGEBRAIC dual $\mathrm{Hom}(V,\mathbb R)$ is dramatically LARGER than the span of these coordinate functionals: since every $v\in V$ has only finitely many nonzero coordinates, ANY assignment of values to $f^1(e_1), f^2(e_2),\dots$ — even wildly unbounded ones — defines a valid linear functional (the sum defining $f(v)$ for a given $v$ is always finite, since $v$ itself has finite support). Equip $V$ instead with a norm and require BOUNDEDNESS, however, and only a much more restricted class of functionals survives — exactly the distinction `math.fnal.dual-space-functional` introduces, with no analogue in this purely algebraic concept.

## Component 5 — Teaching Actions

### Teaching Action A01 — A Functional Is Just a Linear Map Targeting the Field Itself (Primitive P11: Representation Shift)

State: "nothing new is required to define $V^*$ — a linear functional is exactly the linear map you already know how to check, just with its output landing in $F$ instead of some other vector space." Work Example 1's linearity verification, emphasizing it is IDENTICAL in form to `math.linalg.linear-map`'s own check.

- **MC-1 hook**: ask "does defining the dual space $V^*$ require $V$ to have an inner product or a norm?" — a "yes" answer reveals MC-1 (believing the dual space construction needs geometric structure beyond linearity, rather than being purely algebraic).

### Teaching Action A02 — Dual Basis Vectors Are Functions, Not Relabeled Vectors (Primitive P28: Conflict Evidence)

Present Example 2's direct evidence: $f^1,f^2,f^3$ are FUNCTIONS (each taking a vector in and returning a scalar), while $e_1,e_2,e_3$ are VECTORS — related only by the defining condition $f^i(e_j)=\delta_{ij}$, not by being "the same objects written differently." State: "the dual basis lives in a genuinely DIFFERENT space, $V^*$, not inside $V$ itself — the pairing condition is a relationship between the two spaces, not an identification of them."

- **MC-2 hook**: ask "is the dual basis vector $f^1$ essentially the same object as the basis vector $e_1$, just in different notation?" — a "yes" answer reveals MC-2 (conflating the dual basis functionals with the original basis vectors, rather than recognizing them as living in a different space related only by the $\delta_{ij}$ pairing).

### Teaching Action A03 — Algebraic and Analytic Duals Coincide in Finite Dimensions, Diverge in Infinite Ones (Primitive P06: Contrast Pair)

Contrast the finite-dimensional case (this concept's $V^*=\mathbb R^3$'s dual, identical to `math.fnal.dual-space-functional`'s analytic dual there) against Example 3's infinite-dimensional finite-support sequence space (where the algebraic dual is dramatically larger than the bounded-functionals-only analytic dual). State: "in finite dimensions, boundedness comes for free — every linear functional automatically qualifies. Once dimension becomes infinite, boundedness becomes a genuine, restrictive EXTRA condition, and that's exactly the refinement `math.fnal.dual-space-functional` studies."

- **MC-3 hook**: ask "are the algebraic dual $V^*=\mathrm{Hom}(V,F)$ from this lesson and the analytic dual $X^*$ from `math.fnal.dual-space-functional` simply the same notion under two different names?" — a "yes, always the same" answer reveals MC-3 (missing that the two diverge in infinite dimensions, where boundedness becomes a genuinely restrictive extra condition).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. On $V=\mathbb R^2$, define $f(x,y)=3x-y$. Verify $f$ is linear (hence $f\in V^*$) via the additivity and homogeneity checks.
  2. For $V=\mathbb R^2$ with standard basis $e_1=(1,0)$, $e_2=(0,1)$, construct the dual basis $f^1,f^2$ explicitly (state their formulas) and verify $f^1(e_1)=1$, $f^1(e_2)=0$, $f^2(e_1)=0$, $f^2(e_2)=1$.
  3. Explain why the dual basis having exactly $2$ elements (matching $\dim V=2$) PROVES $\dim(V^*)=2$, rather than simply assuming $\dim(V^*)=\dim(V)$ as an unproven fact.
  4. Explain, referencing this lesson's cross-link discussion, why in finite dimensions the algebraic dual $V^*$ and the "bounded functionals only" analytic dual coincide, but this is NOT guaranteed in infinite dimensions.
- **P76 (Transfer Probe, mode = cross-link probe, engaging `math.fnal.dual-space-functional`)**: "Consider $V=\mathbb R^4$ with standard basis $e_1,\dots,e_4$. (a) Construct the dual basis $f^1,\dots,f^4$ explicitly (state each $f^i$ as a formula) and confirm $\dim(V^*)=4=\dim(V)$. (b) A function $g(v)=\|v\|$ (the vector's magnitude) is proposed as a member of $V^*$. Check whether $g$ is actually linear (test homogeneity with a negative scalar on a concrete vector) and explain what this shows about which functions belong to $V^*=\mathrm{Hom}(V,F)$. (c) Contrasting with `math.fnal.dual-space-functional`'s analytic dual: since $V=\mathbb R^4$ is finite-dimensional, explain why EVERY linear functional on $V$ (including all of $f^1,\dots,f^4$) is automatically bounded/continuous, so no distinction between the algebraic and analytic dual arises here — and state the one condition (from that concept) under which this distinction would start to matter."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | DUAL-SPACE-REQUIRES-GEOMETRIC-STRUCTURE | Believing the dual space $V^*$ can only be defined when $V$ has an inner product or a norm, rather than recognizing it requires nothing beyond linearity | Foundational |
| MC-2 | DUAL-BASIS-CONFLATED-WITH-ORIGINAL-BASIS | Treating dual basis functionals $f^i$ as essentially the same objects as the original basis vectors $e_i$, rather than recognizing they live in a genuinely different space, related only by the $\delta_{ij}$ pairing condition | High |
| MC-3 | ALGEBRAIC-AND-ANALYTIC-DUAL-ASSUMED-IDENTICAL | Believing the algebraic dual $V^*=\mathrm{Hom}(V,F)$ and the analytic dual $X^*$ (bounded functionals only) always coincide, missing that they genuinely diverge in infinite dimensions | Moderate |

- **B01 (targets MC-1)**: P27 (name it: "Dual Space Assumed to Require Geometric Structure") → P41 (detect: ask whether an inner product or norm is needed to define $V^*$) → P64 (conceptual shift: re-walk Example 1's linearity-only verification, re-anchoring on "no norm or inner product appeared anywhere — only the linearity check from `math.linalg.linear-map`").
- **B02 (targets MC-2)**: P27 (name it: "Dual Basis Conflated with Original Basis") → P41 (detect: ask whether $f^1$ is essentially the same object as $e_1$, just notated differently) → P64 (conceptual shift: re-walk Example 2, re-anchoring on "$f^1$ is a FUNCTION living in $V^*$; $e_1$ is a VECTOR living in $V$ — two different spaces, related only by the pairing condition").
- **B03 (targets MC-3)**: P27 (name it: "Algebraic and Analytic Dual Assumed Identical") → P41 (detect: ask whether $V^*$ and $X^*$ are always the same space under different names) → P64 (conceptual shift: re-walk Example 3's finite-support sequence space, re-anchoring on "boundedness is a free, automatic condition in finite dimensions but a genuinely restrictive extra requirement in infinite ones").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.linalg.vector-space` (the vector space axioms, applied here to $F$ itself as a $1$-dimensional space) and `math.linalg.linear-map` (the linearity definition this concept's functionals directly reuse, and the "determined by basis action" fact underlying the dual basis construction).
- **Unlocks**: `math.linalg.tensor` (will build tensor products using $V$ and $V^*$ together; not yet authored).
- **Cross-link**: KG lists `math.fnal.dual-space-functional`, verified authored via `ls docs/curriculum/blueprints/`. $P76_{mode}=$ **cross-link probe**, contrasting this concept's purely algebraic dual against that concept's normed-space analytic dual (Example 3, Teaching Action A03, and the P76 transfer probe all directly engage that concept's own boundedness condition).

## Component 8 — Teaching Notes

- estimated_hours = 5 with an expert/understand tag supports the full "3 TAs + gate" tier, with LO1 and LO2 at full computational depth (the vector-space verification and the explicit dual basis construction) and LO3 built as a cross-link probe against the single authored cross-subject target, consistent with this corpus's established single-cross-link-probe pattern.
- **Division of labor**: `math.linalg.linear-map` owns the general linearity definition and the "determined by basis action" fact; this concept owns the SPECIALIZATION to functionals (target $=F$), the dual basis construction, and the dimension equality — deliberately reusing the parent's own linearity-check style (Example 1 mirrors that concept's Example 1 almost exactly) rather than introducing a new verification style.
- Example 3's finite-support sequence space was chosen over a more exotic infinite-dimensional example specifically because it makes the algebraic-dual/analytic-dual divergence concrete and checkable (any assignment of values to the coordinate functionals is valid algebraically, since every vector has finite support) rather than asserting the divergence abstractly.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (`math.fnal.dual-space-functional` found authored → cross-link probe) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (cross-link probe) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.75×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract: expert learner already fluent in vector spaces/linear maps; dual space introduced directly) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
