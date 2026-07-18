# Teaching Blueprint: Linear Map (`math.linalg.linear-map`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.linalg.linear-map` |
| name | Linear Map |
| domain | Linear Algebra |
| difficulty | proficient |
| bloom | understand |
| mastery_threshold | 0.85 → MAMR = ⌈0.85×5⌉ = 5/5 |
| estimated_hours | 5 |
| requires | `math.linalg.vector-space`, `math.linalg.matrix` |
| unlocks | `math.linalg.kernel-image`, `math.linalg.matrix-representation` |
| cross_links | `math.abst.group-homomorphism`, `math.fnal.bounded-operator` (**both not yet authored** — verified via `ls`; P76_mode = independence, see Component 7) |
| CPA_entry_stage | C (Concrete) — the geometric-transformation coordinate rules already taught before the abstract axiom statement |
| description (KG) | A map T:V→W satisfying T(u+v)=T(u)+T(v) and T(cv)=cT(v). Completely determined by its action on a basis. Every linear map between finite-dimensional spaces is represented by a matrix in given bases. |

## Component 1 — Learning Objectives

- LO1: Define a **linear map** $T:V\to W$ between vector spaces as a function satisfying **additivity** ($T(u+v)=T(u)+T(v)$) and **homogeneity** ($T(cv)=cT(v)$ for scalars $c$), and verify whether a given map is linear by checking both properties directly.
- LO2: Explain and apply the key structural fact that a linear map is **completely determined by its action on a basis** — knowing $T(e_1),\ldots,T(e_n)$ for a basis $e_1,\ldots,e_n$ of $V$ lets you compute $T(v)$ for *any* $v\in V$ by writing $v$ in terms of the basis and applying linearity.
- LO3: Connect linear maps between finite-dimensional spaces to **matrices** — every such linear map is represented by some matrix once bases are chosen — and recognize the geometric transformations (rotation, reflection, dilation centered at the origin) already studied as concrete instances of linear maps.

## Component 2 — Prerequisite Check

Assumes mastery of `math.linalg.vector-space` (the 8 vector space axioms, vector addition, scalar multiplication) and `math.linalg.matrix` (matrices as rectangular arrays encoding linear transformations).

## Component 3 — Core Explanation

A **linear map** (or linear transformation) $T:V\to W$ between vector spaces $V,W$ is a function satisfying two properties for all $u,v\in V$ and all scalars $c$:
1. **Additivity**: $T(u+v) = T(u)+T(v)$.
2. **Homogeneity**: $T(cv) = cT(v)$.

(Together, these are sometimes stated as one combined property: $T(au+bv)=aT(u)+bT(v)$ for all scalars $a,b$ — linearity.)

**Determined entirely by basis action**: if $e_1,\ldots,e_n$ is a basis for $V$, then every $v\in V$ writes uniquely as $v=c_1e_1+\cdots+c_ne_n$. By linearity:
$$T(v) = T(c_1e_1+\cdots+c_ne_n) = c_1T(e_1)+\cdots+c_nT(e_n)$$
So **once you know $T(e_1),\ldots,T(e_n)$, you know $T(v)$ for every $v\in V$** — there is no freedom left to define $T$ arbitrarily elsewhere; the basis images completely pin down the entire map.

**Matrix representation**: for finite-dimensional $V,W$ with chosen bases, $T$ is represented by a matrix $A$ whose $j$-th column is (the coordinate vector of) $T(e_j)$ — applying $T$ to any $v$ becomes ordinary matrix-vector multiplication $Av$. This is exactly why the already-studied geometric transformations (rotation, reflection, dilation — all centered at the origin) are linear maps of $\mathbb{R}^2$: each has a specific $2\times2$ matrix (e.g. rotation by $\theta$: $\begin{pmatrix}\cos\theta&-\sin\theta\\\sin\theta&\cos\theta\end{pmatrix}$), and translation is the one exception that is **not** linear (since $T(0)\neq 0$ for a nonzero translation — violating a necessary consequence of linearity, $T(0)=T(0\cdot v)=0\cdot T(v)=0$).

## Component 4 — Worked Examples

**Example 1 (LO1 — verifying linearity)**: Is $T:\mathbb{R}^2\to\mathbb{R}^2$, $T(x,y)=(2x+y,\ x-y)$ linear? Check additivity: $T((x_1,y_1)+(x_2,y_2)) = T(x_1+x_2,y_1+y_2) = (2(x_1+x_2)+(y_1+y_2),\ (x_1+x_2)-(y_1+y_2))$, which equals $(2x_1+y_1,x_1-y_1)+(2x_2+y_2,x_2-y_2) = T(x_1,y_1)+T(x_2,y_2)$. ✓ Check homogeneity: $T(c(x,y))=T(cx,cy)=(2cx+cy,cx-cy)=c(2x+y,x-y)=cT(x,y)$. ✓ Both hold — $T$ is linear.

**Example 2 (LO1 — a non-example, breaking MC-1)**: Is $S(x,y)=(x+1,y)$ (a translation) linear? Check $S(0,0)=(1,0)\neq(0,0)$. But any linear map must send $\vec 0\to\vec 0$ (since $T(0)=T(0\cdot v)=0\cdot T(v)=\vec 0$). Since $S(0,0)\neq(0,0)$, $S$ is **not** linear — translations are never linear maps, despite being one of the four "geometric transformation" types studied earlier.

**Example 3 (LO2/LO3 — determined by basis action, matrix representation)**: A linear map $T:\mathbb{R}^2\to\mathbb{R}^2$ satisfies $T(1,0)=(3,1)$ and $T(0,1)=(-2,4)$ (i.e., its action on the standard basis $e_1,e_2$). Find $T(5,2)$. Write $(5,2)=5e_1+2e_2$, so by linearity $T(5,2)=5T(1,0)+2T(0,1)=5(3,1)+2(-2,4)=(15,5)+(-4,8)=(11,13)$. The matrix representation is $A=\begin{pmatrix}3&-2\\1&4\end{pmatrix}$ (columns = $T(e_1), T(e_2)$), and indeed $A\binom{5}{2}=\binom{3(5)+(-2)(2)}{1(5)+4(2)}=\binom{11}{13}$. ✓

## Component 5 — Teaching Actions

### Teaching Action A01 — The Two Linearity Properties, Grounded in Geometric Transformations (Primitive P11: Representation Shift)

Recall the already-studied rotation/reflection/dilation coordinate rules from `math.geom.transformations`. Ask: "for a rotation, does rotating $(u+v)$ give the same result as rotating $u$ and $v$ separately then adding?" — verify concretely with a specific rotation and specific vectors, confirming yes. Shift representation to the abstract definition: $T(u+v)=T(u)+T(v)$ (additivity) and $T(cv)=cT(v)$ (homogeneity) — state that this is exactly the property just verified concretely, now given a name and checked as a general test for ANY map, not just the geometric ones already known.

Work Example 1 (verify linearity directly via both properties) as the standard verification procedure.

- **MC-1 hook**: ask "is translation — one of our four geometric transformations — a linear map?" before revealing the answer — a "yes" (assuming all previously-studied transformations are automatically linear maps) reveals MC-1 (failing to check the necessary $T(0)=0$ consequence, or more generally not verifying the two properties directly for every transformation type).

### Teaching Action A02 — Determined by Basis Action, and the Matrix Connection (Primitive P06: Contrast Pair)

**Contrast 1 (targets MC-2)**: Present two "candidate" linear maps described only by their basis images: $T(e_1)=(3,1), T(e_2)=(-2,4)$ (Example 3) versus a DIFFERENT map with the same basis images but a claimed extra rule "and $T(1,1)=(0,0)$ additionally." Ask: "can both of these be linear maps?" — since linearity forces $T(1,1)=T(e_1)+T(e_2)=(3,1)+(-2,4)=(1,5)$ automatically, the claimed extra rule $T(1,1)=(0,0)$ **contradicts** what basis-determination already forces — so the second "map" cannot actually be linear. This breaks the assumption that a linear map's values away from the basis are independently specifiable.

**Contrast 2**: Connect Example 3's basis-action computation directly to its matrix form, showing the column-by-column construction rule (each basis vector's image becomes a column) makes "compute $T(v)$ via basis decomposition" and "compute $Av$ via matrix multiplication" the *same calculation*, just notated differently.

### Teaching Action A03 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Verify whether $T(x,y,z) = (x+y, 2z)$ is a linear map from $\mathbb{R}^3\to\mathbb{R}^2$.
  2. Verify whether $S(x,y) = (xy, x)$ is a linear map (hint: check homogeneity carefully with a specific non-unit scalar).
  3. A linear map $T:\mathbb{R}^2\to\mathbb{R}^2$ has $T(1,0)=(2,0)$ and $T(0,1)=(0,3)$. Find $T(4,-1)$ and write the corresponding matrix.
  4. Explain why $T(0,0)$ must equal $(0,0)$ for any linear map, and use this to quickly rule out one of the four geometric transformation types as never being linear.
- **P76 (Transfer Probe, mode = independence)**: "An image-processing filter applies a fixed $2\times2$ pixel-coordinate transformation matrix $A=\begin{pmatrix}1&0.5\\0&1\end{pmatrix}$ (a 'shear' effect) to every pixel's $(x,y)$ position. (a) Confirm this transformation is a linear map by checking it satisfies both linearity properties directly (not just by assuming any matrix-based rule automatically qualifies). (b) The filter's basis images are $T(1,0)=(1,0)$ and $T(0,1)=(0.5,1)$ — use ONLY these two facts and linearity to compute where the pixel at $(4,2)$ moves, without directly multiplying the full matrix by the vector, then confirm it matches direct matrix multiplication."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | ALL-TRANSFORMATIONS-ASSUMED-LINEAR | Assuming any previously-studied geometric transformation (including translation) is automatically a linear map, without checking the two defining properties (or the necessary $T(0)=0$ consequence) | Foundational |
| MC-2 | BASIS-DETERMINATION-NOT-ENFORCED | Believing a linear map's values away from a chosen basis can be independently/arbitrarily specified, rather than recognizing they are fully forced once the basis images are fixed | Foundational |
| MC-3 | HOMOGENEITY-CHECKED-WITH-UNIT-SCALAR-ONLY | Verifying $T(cv)=cT(v)$ only for $c=1$ (or other trivial scalars) and concluding homogeneity holds generally, without testing a genuinely distinguishing scalar | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "All-Transformations-Linear Assumption") → P41 (detect: ask if translation is a linear map) → P64 (conceptual shift: re-anchor on the $T(0)=0$ test — translation moves the origin away from itself, immediately disqualifying it).
- **B02 (targets MC-2)**: P27 (name it: "Basis-Determination Violation") → P41 (detect: present a claimed linear map with basis images plus one additional, inconsistent claimed value, and ask if it's a valid linear map) → P64 (conceptual shift: re-derive the forced value directly from the basis decomposition and linearity, showing the contradiction explicitly).
- **B03 (targets MC-3)**: P27 (name it: "Trivial-Scalar Homogeneity Check") → P41 (detect: ask a student to verify homogeneity for a candidate map, and check whether they test only $c=1$ or $c=0$ rather than a generic/negative/fractional scalar) → P64 (conceptual shift: re-anchor on "test with a scalar like $c=-2$ or $c=\frac12$ specifically, since trivial scalars can mask a genuine failure of the property").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.linalg.vector-space` (the vector addition/scalar multiplication structure a linear map must respect), `math.linalg.matrix` (the matrix representation this concept connects linear maps to).
- **Unlocks**: `math.linalg.kernel-image` (the kernel and image of a linear map are defined directly in terms of this concept's structure), `math.linalg.matrix-representation` (the general basis-dependent matrix-representation theory, building on this concept's basis-determination fact).
- **Cross-link**: KG lists `math.abst.group-homomorphism` and `math.fnal.bounded-operator` as cross-links. Verified via directory listing that neither blueprint yet exists. Per the established P76_mode rule, this blueprint uses **independence** mode. A future revision, once either target is authored, may add a genuine cross-link probe — e.g. connecting this concept's additivity/homogeneity axioms directly to `math.abst.group-homomorphism`'s more general structure-preserving-map framework (a linear map is precisely a group homomorphism of the additive group that also respects scalar multiplication), or to `math.fnal.bounded-operator`'s infinite-dimensional generalization.

## Component 8 — Teaching Notes

- estimated_hours = 5 with a proficient/understand tag places this at the "2 main TAs + gate" tier — A01 (the two linearity properties, grounded in the just-studied geometric transformations) and A02 (basis-determination plus the matrix connection) jointly cover all three LOs, appropriate for an understand-level concept whose difficulty is conceptual precision rather than heavy computation.
- This blueprint deliberately opens by directly building on `math.geom.transformations`' rotation/reflection/dilation content (even without a formal cross-link, since that concept isn't named as this one's cross-link target in the KG) — the KG description's own final sentence ("every linear map... is represented by a matrix") makes the geometric-transformation connection the most natural concrete anchor available, and this reuse was judged pedagogically necessary despite not being a KG-declared cross-link.
- MC-1 (all-transformations-assumed-linear) was deliberately designed to directly test the boundary case left dangling by `math.geom.transformations`' own Teaching Notes, which explicitly deferred the matrix/linear-map justification of its four transformation types to this concept — this blueprint is where that deferred question (which of the four are actually linear?) gets its answer.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (both) |
| V-4 | unlocks concepts named accurately from KG | PASS |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (both confirmed absent → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A03) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.85×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Concrete: geometric-transformation coordinate rules) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO1, Ex3→LO2/LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
