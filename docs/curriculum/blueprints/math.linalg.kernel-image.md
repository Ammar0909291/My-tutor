# Teaching Blueprint: Kernel and Image (`math.linalg.kernel-image`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.linalg.kernel-image` |
| name | Kernel and Image |
| domain | Linear Algebra |
| difficulty | proficient |
| bloom | understand |
| mastery_threshold | 0.90 → MAMR = ⌈0.90×5⌉ = 5/5 |
| estimated_hours | 3 |
| requires | `math.linalg.linear-map` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | A (Abstract) |
| description (KG) | ker(T) = {v : T(v)=0} is a subspace of V; im(T) = {T(v) : v∈V} is a subspace of W. T is injective iff ker(T)={0}; T is surjective iff im(T)=W.

 |

## Component 1 — Learning Objectives

- LO1: Find the KERNEL $\ker(T)=\{v:T(v)=0\}$ of a given linear map $T$ (the set of all inputs mapping to zero).
- LO2: Find the IMAGE $\text{im}(T)=\{T(v):v\in V\}$ of a given linear map $T$ (the set of all achievable outputs).
- LO3: Apply the injectivity/surjectivity criteria: $T$ is INJECTIVE (one-to-one) if and only if $\ker(T)=\{0\}$ (only the zero vector maps to zero); $T$ is SURJECTIVE (onto) if and only if $\text{im}(T)=W$ (every element of the target space is achieved).

## Component 2 — Prerequisite Check

Assumes mastery of `math.linalg.linear-map` (what a linear transformation is) — kernel and image are the two fundamental subspaces associated with any such map.

## Component 3 — Core Explanation

For a linear map $T:V\to W$: the **kernel** $\ker(T)=\{v\in V:T(v)=0\}$ is the set of ALL inputs that map to the zero vector — a SUBSPACE of $V$ (the domain). The **image** $\text{im}(T)=\{T(v):v\in V\}$ is the set of ALL achievable outputs — a SUBSPACE of $W$ (the codomain).

Two key criteria: $T$ is **injective** (distinct inputs always give distinct outputs) if and only if $\ker(T)=\{0\}$ — i.e., ONLY the zero vector maps to zero (if any OTHER nonzero vector also mapped to zero, that would collide with zero's own output, breaking injectivity). $T$ is **surjective** (every element of $W$ is achieved by some input) if and only if $\text{im}(T)=W$ — the image fills the ENTIRE codomain, not just part of it.

## Component 4 — Worked Examples

**Example 1 (LO1, LO2 — finding kernel and image, breaking MC-1)**: For $T:\mathbb{R}^2\to\mathbb{R}^2$ given by $T(x,y)=(x+y,x+y)$ (a matrix representation $\begin{pmatrix}1&1\\1&1\end{pmatrix}$): kernel is all $(x,y)$ with $x+y=0$, i.e. the LINE $\{(t,-t):t\in\mathbb{R}\}$ — NOT just $\{(0,0)\}$; many nonzero vectors (like $(1,-1)$) also map to zero. Image is all outputs $(x+y,x+y)$, which is ALWAYS of the form $(s,s)$ for some $s$ — the DIAGONAL LINE $\{(s,s):s\in\mathbb{R}\}$ in $\mathbb{R}^2$, not all of $\mathbb{R}^2$. A common error assumes the kernel of ANY linear map is automatically just $\{0\}$ (perhaps by analogy with how $0$ always maps to $0$), missing that OTHER nonzero vectors can also map to zero for a non-injective map.

**Example 2 (LO3 — using kernel to check injectivity, breaking MC-2)**: For the SAME map $T$ from Example 1, since $\ker(T)$ is the whole line $\{(t,-t)\}$ (NOT just $\{0\}$), $T$ is NOT injective — confirmed directly: $T(1,-1)=(0,0)=T(0,0)$, two DIFFERENT inputs giving the SAME output, violating injectivity. A common error checks injectivity by testing only a FEW specific input pairs for collisions, rather than using the definitive kernel criterion — the kernel test is EXACT and complete, while spot-checking specific pairs could miss a genuine collision or falsely suggest injectivity from a limited sample.

**Example 3 (LO3 — using image to check surjectivity)**: For the same $T$, since $\text{im}(T)$ is only the diagonal line $\{(s,s)\}$ (not all of $\mathbb{R}^2$), $T$ is NOT surjective — e.g. $(1,2)$ is NOT achievable by any input (since it's not on the diagonal), confirming $\text{im}(T)\ne\mathbb{R}^2$.

## Component 5 — Teaching Actions

### Teaching Action A01 — Kernel Can Contain More Than Just Zero (Primitive P64: Conceptual Shift)

Work Example 1's kernel computation in full, explicitly finding the FULL solution set to $T(v)=0$ (a whole line, not just the origin), correcting the intuition that only zero itself maps to zero.

- **MC-1 hook**: this directly targets MC-1 (assuming the kernel is automatically just $\{0\}$).

### Teaching Action A02 — Kernel Test for Injectivity Is Exact, Not a Spot-Check (Primitive P06: Contrast Pair)

Work Example 2, contrasting the definitive kernel-based injectivity test against a flawed spot-checking approach (testing a few input pairs), showing the kernel test directly and completely answers the question. State the rule: "$\ker(T)=\{0\}$ if and only if $T$ is injective — this single check replaces any need to test individual input pairs for collisions."

- **MC-2 hook**: this directly targets MC-2 (relying on spot-checking specific inputs rather than the definitive kernel criterion).

### Teaching Action A03 — Image Determines Surjectivity Directly (Primitive P11: Representation Shift)

Work Example 3, explicitly comparing the found image (a line) against the full codomain ($\mathbb{R}^2$), grounding the surjectivity criterion in a direct set-comparison.

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.90×5⌉ = 5/5.

- **P77 (4-problem set)**:
  1. Find the kernel of $T(x,y,z)=(x-y,y-z)$ from $\mathbb{R}^3\to\mathbb{R}^2$.
  2. Find the image of the same map $T$ from problem 1.
  3. Determine whether $T$ from problem 1 is injective, using the kernel criterion.
  4. Determine whether $T$ from problem 1 is surjective, using the image criterion.
- **P76 (Transfer Probe, mode = independence)**: "A data-compression map $T$ projects a 3D sensor reading $(x,y,z)$ onto a 2D image $(x,y)$ (discarding the depth information $z$ entirely), i.e. $T(x,y,z)=(x,y)$. (a) Find $\ker(T)$, and explain what it represents physically (which distinct 3D readings get compressed to the SAME 2D image). (b) Determine whether $T$ is injective, using the kernel criterion, and explain — using this lesson's exact-test idea — why simply checking that a FEW specific 3D points give different 2D outputs would NOT be sufficient to conclude $T$ is injective in general."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | KERNEL-ASSUMED-TO-BE-ONLY-ZERO | Believing the kernel of any linear map automatically contains only the zero vector, missing that non-injective maps have larger kernels | Foundational |
| MC-2 | INJECTIVITY-CHECKED-BY-SPOT-CHECKING-RATHER-THAN-KERNEL | Testing injectivity by checking a few specific input pairs for collisions, rather than using the definitive $\ker(T)=\{0\}$ criterion | Foundational |
| MC-3 | IMAGE-ASSUMED-TO-BE-THE-ENTIRE-CODOMAIN | Assuming the image of a linear map automatically fills the entire codomain, rather than checking whether it's actually a proper (smaller) subspace | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Kernel Assumed to Be Only Zero") → P41 (detect: present Example 1 and check whether the kernel is (incorrectly) reported as just $\{(0,0)\}$) → P64 (conceptual shift: re-solve $T(v)=0$ explicitly as a system of equations, showing the full solution set is a line, not a single point).
- **B02 (targets MC-2)**: P27 ("Injectivity Checked by Spot-Checking") → P41 (detect: review a submitted injectivity determination for a spot-check approach rather than the kernel criterion) → P64 (conceptual shift: re-derive the kernel explicitly and apply the exact criterion, $\ker(T)=\{0\}\Leftrightarrow$ injective).
- **B03 (targets MC-3)**: P27 ("Image Assumed to Be Entire Codomain") → P41 (detect: present Example 3 and check whether $\text{im}(T)=\mathbb{R}^2$ is assumed without verification) → P64 (conceptual shift: re-derive the image explicitly by characterizing all achievable outputs, showing it's a proper subset).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.linalg.linear-map`.
- **Unlocks**: none recorded in the KG.
- **Related**: `math.linalg.column-space` (the image of a matrix-represented linear map IS its column space), `math.linalg.rank-nullity` (the dimension theorem directly relating kernel and image dimensions).

## Component 8 — Teaching Notes

- estimated_hours = 3 and bloom = understand reflect that this concept's genuine content is correctly characterizing these two subspaces and applying the injectivity/surjectivity criteria precisely.
- MC-1 and MC-2 are closely related (both stem from underestimating how large a kernel can be) but tracked separately because MC-1 concerns the DIRECT computation while MC-2 concerns the DOWNSTREAM injectivity-testing METHOD — a student could hold either independently.
- The data-compression transfer probe was deliberately chosen because dimension-reducing linear maps (like discarding a coordinate) are a genuine, intuitive real-world source of non-injective maps, making the "many inputs, one output" kernel concept concretely graspable.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.linalg.linear-map`) |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
| V-5 | cross_links checked against disk | PASS (none declared) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.90×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1/LO2, Ex2→LO3, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
