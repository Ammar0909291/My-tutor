# Teaching Blueprint: Curl and Divergence (`math.calc.curl-divergence`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.calc.curl-divergence` |
| name | Curl and Divergence |
| domain | Calculus |
| difficulty | expert |
| bloom | analyze |
| mastery_threshold | 0.65 → MAMR = ⌈0.65×5⌉ = 4/5 |
| estimated_hours | 6 |
| requires | `math.calc.vector-fields`, `math.calc.partial-derivatives` |
| unlocks | `math.calc.stokes-theorem`, `math.calc.divergence-theorem` |
| cross_links | none |
| CPA_entry_stage | A (Abstract) — expert-tier learner already fluent in both prerequisites; curl and divergence are introduced directly as two differential operators applied to a vector field |
| description (KG) | Curl ∇×F measures rotational tendency; divergence ∇·F measures outward flux density; both are differential operators on vector fields. |

## Component 1 — Learning Objectives

- LO1: Define **divergence** $\nabla\cdot\mathbf{F} = \partial P/\partial x+\partial Q/\partial y+\partial R/\partial z$ for $\mathbf{F}=(P,Q,R)$ — a SCALAR quantity measuring outward flux density (net "spreading out" per unit volume) at a point — and compute it directly for a given field.
- LO2: Define **curl** $\nabla\times\mathbf{F}$ (the full 3D determinant formula) — a VECTOR quantity measuring rotational tendency — and compute it directly for a given field, recognizing that `math.calc.vector-fields`' own 2D conservativeness test ($\partial P/\partial y=\partial Q/\partial x$) is exactly the $z$-component of curl for a 2D field embedded in 3D as $(P,Q,0)$, not a separate, unrelated tool.
- LO3: Correctly distinguish curl (VECTOR, rotation) from divergence (SCALAR, flux) as independent properties that can occur in any combination, and recognize that $\nabla\times\mathbf{F}=0$ is **necessary but not always SUFFICIENT** for $\mathbf{F}$ to be conservative — demonstrated by a classic field with zero curl everywhere on its domain, yet a nonzero closed-loop line integral, because its domain has a "hole."

## Component 2 — Prerequisite Check

Assumes mastery of `math.calc.vector-fields` (a vector field $\mathbf{F}(x,y,z)$; conservative fields $\mathbf{F}=\nabla f$; path-independence; the 2D test $\partial P/\partial y=\partial Q/\partial x$ and the nonzero-closed-loop signature of non-conservativeness) and `math.calc.partial-derivatives` ($\partial/\partial x,\partial/\partial y,\partial/\partial z$, and computing them fluently).

## Component 3 — Core Explanation

**Divergence: a scalar measuring outward flux**: for $\mathbf{F}=(P,Q,R)$, the **divergence** $\nabla\cdot\mathbf{F} = \partial P/\partial x+\partial Q/\partial y+\partial R/\partial z$ is a SCALAR — a single number at each point, measuring how much the field is "spreading outward" (a positive value) or "converging inward" (a negative value) right there, like a local source or sink of flow.

**Curl: a vector measuring rotational tendency**: the **curl** $\nabla\times\mathbf{F} = \left(\dfrac{\partial R}{\partial y}-\dfrac{\partial Q}{\partial z},\ \dfrac{\partial P}{\partial z}-\dfrac{\partial R}{\partial x},\ \dfrac{\partial Q}{\partial x}-\dfrac{\partial P}{\partial y}\right)$ is a VECTOR — pointing along the local axis of rotation, with magnitude measuring how strongly the field rotates around that axis. Notice the THIRD component, $\partial Q/\partial x-\partial P/\partial y$: for a 2D field $(P,Q)$ embedded in 3D as $(P,Q,0)$, this is EXACTLY `math.calc.vector-fields`' own conservativeness test, $\partial Q/\partial x-\partial P/\partial y$ (the same quantity as $\partial P/\partial y = \partial Q/\partial x$ rearranged) — curl doesn't introduce a competing test; it generalizes that same 2D computation into the full 3D rotational-vector picture.

**Curl and divergence are independent — and zero curl doesn't always mean conservative**: curl (a vector, about rotation) and divergence (a scalar, about spreading) test fundamentally DIFFERENT geometric properties, and a field can have any combination of zero/nonzero curl and divergence, with neither implying anything about the other. Furthermore, while EVERY conservative field ($\mathbf{F}=\nabla f$) automatically has $\nabla\times\mathbf{F}=0$ (curl of a gradient is always zero — a genuine, provable fact), the CONVERSE is not always true: $\nabla\times\mathbf{F}=0$ is a NECESSARY condition for conservativeness, but on a domain with a "hole" (a missing point or region the field isn't defined on), a field can have zero curl EVERYWHERE it's defined and still fail to be conservative — its closed-loop line integral around that hole can be nonzero.

## Component 4 — Worked Examples

**Example 1 (LO1 — computing divergence)**: For $\mathbf{F}(x,y,z)=(x,y,z)$ (a uniform outward radial field, like an explosion or source): $\nabla\cdot\mathbf{F} = \partial x/\partial x+\partial y/\partial y+\partial z/\partial z = 1+1+1=3$ — a CONSTANT positive value everywhere, confirming genuine outward flux (spreading) at every point in space.

**Example 2 (LO2 — computing curl, and connecting to the 2D test, breaking MC-1)**: For $\mathbf{F}(x,y,z)=(-y,x,0)$ (`math.calc.vector-fields`' own rotational field, embedded in 3D): $P=-y,Q=x,R=0$. First component: $\partial R/\partial y-\partial Q/\partial z = 0-0=0$. Second: $\partial P/\partial z-\partial R/\partial x=0-0=0$. Third: $\partial Q/\partial x-\partial P/\partial y = 1-(-1)=2$. So $\nabla\times\mathbf{F}=(0,0,2)$ — a NONZERO vector, confirming genuine rotational tendency. Notice the third component, $2$, is EXACTLY the same value `math.calc.vector-fields` computed for its own 2D non-conservativeness test on this identical field — curl's third component and that 2D test are literally the same computation.

**Example 3 (LO3 — zero curl but NOT conservative, the classic punctured-plane example, breaking MC-3)**: For $\mathbf{F}(x,y)=\left(\dfrac{-y}{x^2+y^2},\dfrac{x}{x^2+y^2}\right)$, defined on $\mathbb{R}^2\setminus\{(0,0)\}$ (embedded as $(P,Q,0)$): computing the curl's third component, $\partial Q/\partial x-\partial P/\partial y = \dfrac{y^2-x^2}{(x^2+y^2)^2} - \dfrac{y^2-x^2}{(x^2+y^2)^2} = 0$ — curl is ZERO everywhere this field is defined. Yet computing $\int_C\mathbf{F}\cdot d\mathbf{r}$ around the unit circle $\mathbf{r}(t)=(\cos t,\sin t)$: $\mathbf{F}(\mathbf{r}(t))=(-\sin t,\cos t)$, $\mathbf{r}\,'(t)=(-\sin t,\cos t)$, $\mathbf{F}\cdot\mathbf{r}\,'=\sin^2t+\cos^2t=1$, giving $\int_0^{2\pi}1\,dt=2\pi\ne0$ — this field is **NOT** conservative, despite having curl EXACTLY zero at every point of its domain. The difference from Example 2's $(-y,x,0)$ (nonzero curl, also non-conservative): this field's $1/(x^2+y^2)$ normalization makes it weaken with distance in exactly the right way to cancel local rotation everywhere EXCEPT at the excluded origin — the "hole" in the domain is precisely where all the field's rotational effect concentrates, invisible to the pointwise curl test everywhere else.

## Component 5 — Teaching Actions

### Teaching Action A01 — Divergence: A Scalar Measuring Spreading (Primitive P11: Representation Shift)

State: "divergence is ONE number at each point — how much the field is spreading out (positive) or converging in (negative) right there." Work Example 1's full computation, emphasizing the result is a single scalar value, not a vector.

### Teaching Action A02 — Curl Is a Vector, a Fundamentally Different Kind of Object (Primitive P06: Contrast Pair)

Contrast Example 2's curl computation (a VECTOR result, $(0,0,2)$) directly against Example 1's divergence computation (a SCALAR result, $3$). State: "these are genuinely different KINDS of objects answering different questions — divergence is a single number about spreading; curl is a vector about rotation, pointing along the axis the field rotates around." Highlight that curl's third component matches `math.calc.vector-fields`' own 2D test exactly.

- **MC-1 hook**: ask "are curl and divergence basically two versions of the same kind of measurement?" — a "yes" answer reveals MC-1 (conflating a vector quantity about rotation with a scalar quantity about flux, missing they are fundamentally different types of objects).
- **MC-2 hook**: ask "if a field has zero curl, does that tell you anything about whether its divergence is zero too?" — a "yes" answer reveals MC-2 (assuming curl and divergence are correlated, when they are independent properties that can combine in any way).

### Teaching Action A03 — Zero Curl Does Not Always Mean Conservative (Primitive P28: Conflict Evidence)

Present Example 3's direct evidence: curl is exactly zero everywhere the field is defined, yet the closed-loop integral around the unit circle is $2\pi\ne0$ — proving non-conservativeness despite the zero-curl test passing everywhere it was checked. Contrast directly with Example 2's field, which fails to be conservative for the OPPOSITE reason (nonzero curl). State: "zero curl only ever tells you 'conservative is still possible' — it's a NECESSARY condition, not a guarantee. A hole in the domain, like the missing origin here, is exactly where this test can be fooled."

- **MC-3 hook**: ask "if a field has zero curl everywhere it's defined, is it guaranteed to be conservative?" — a "yes" answer reveals MC-3 (mistaking curl's necessary condition for a sufficient one, missing the domain-hole subtlety).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Compute the divergence of $\mathbf{F}(x,y,z)=(x^2,y^2,z^2)$ at the point $(1,1,1)$.
  2. Compute the curl of $\mathbf{F}(x,y,z)=(y,-x,0)$, and state whether the result is a scalar or a vector.
  3. Explain why curl's third component for a 2D field $(P,Q,0)$ is the exact same computation as `math.calc.vector-fields`' own conservativeness test.
  4. Explain, using Example 3, why zero curl everywhere a field is defined does not automatically prove the field is conservative.
- **P76 (Transfer Probe, mode = independence)**: "A meteorologist models local wind patterns as a vector field $\mathbf{F}(x,y,z)$ over a region. (a) Explain what a region of strongly positive divergence in this field would represent physically (referencing 'spreading' or 'source-like' behavior). (b) Separately, explain what a region of strong (nonzero) curl would represent physically (referencing rotation, like a developing vortex or storm system) — and explain why measuring curl tells the meteorologist nothing directly about whether that same region also has strong divergence. (c) Suppose the meteorologist finds curl is exactly zero throughout the entire mapped region, EXCEPT for one small excluded zone (a sensor malfunction with no data). Using this lesson's punctured-plane example, explain why the meteorologist should NOT conclude the wind field is free of all rotational effects without further investigating that excluded zone."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | CURL-AND-DIVERGENCE-CONFLATED | Treating curl and divergence as measuring the same kind of thing, missing that divergence is a scalar (flux/spreading) while curl is a vector (rotation) — fundamentally different types of objects | Foundational |
| MC-2 | CURL-DIVERGENCE-ASSUMED-CORRELATED | Believing zero curl implies zero divergence (or vice versa), missing that the two properties are independent and can combine in any way | Moderate |
| MC-3 | CURL-ZERO-ASSUMED-SUFFICIENT-FOR-CONSERVATIVE | Believing curl F=0 always guarantees F is conservative, missing that this is necessary but not sufficient in general — a domain with a hole can produce zero curl everywhere yet a nonzero closed-loop integral | Foundational |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Curl and Divergence Conflated") → P41 (detect: ask a student whether curl and divergence measure the same kind of thing, and check for a "yes") → P64 (conceptual shift: re-walk Example 1's scalar divergence result alongside Example 2's vector curl result, re-anchoring on "one is a single number about spreading, the other is a vector about rotation — different questions entirely").
- **B02 (targets MC-2)**: P27 (name it: "Curl-Divergence Assumed Correlated") → P41 (detect: ask a student whether zero curl tells them anything about a field's divergence, and check for a "yes") → P64 (conceptual shift: re-emphasize that curl and divergence are computed from entirely different combinations of the same partial derivatives, re-anchoring on "these are independent properties — knowing one tells you nothing about the other without computing it separately").
- **B03 (targets MC-3)**: P27 (name it: "Curl Zero Assumed Sufficient for Conservative") → P41 (detect: ask a student whether a field with curl exactly zero everywhere it's defined must be conservative, and check for a "yes") → P64 (conceptual shift: re-walk Example 3's punctured-plane field, showing zero curl everywhere yet a nonzero $2\pi$ closed-loop integral, re-anchoring on "zero curl only rules out LOCAL rotation — a hole in the domain can hide a genuine global obstruction to conservativeness that the pointwise curl test can never see").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.calc.vector-fields` (the vector field concept, conservative fields, and the 2D test this concept's curl directly generalizes), `math.calc.partial-derivatives` (every partial derivative both divergence and curl are built from).
- **Unlocks**: `math.calc.stokes-theorem` (relates a surface's flux of curl to a line integral around its boundary), `math.calc.divergence-theorem` (relates a closed surface's flux to a volume integral of divergence).
- **Cross-link**: KG lists no cross-links for this concept.

## Component 8 — Teaching Notes

- estimated_hours = 6 with an expert/analyze tag places this at a "3 TAs + gate" tier — A01 (divergence), A02 (curl, contrasted as a different kind of object, connected to the prerequisite's own 2D test), and A03 (the necessary-not-sufficient subtlety) each target a distinct LO, appropriate for a concept that introduces two genuinely new differential operators plus one important logical caution about their limits.
- Example 2 deliberately reuses `math.calc.vector-fields`' own field $(-y,x)$ (embedded in 3D) specifically so its curl computation's third component ($2$) can be shown to EQUAL that concept's own 2D test result exactly — making the "curl generalizes, rather than replaces, the earlier test" connection concrete rather than asserted.
- Example 3's punctured-plane field is the STANDARD textbook counterexample for "curl zero does not imply conservative" (appearing in essentially every vector calculus course) — chosen over an invented example for the same reason `math.fnal.spectral-theory` favored canonical field examples: this particular subtlety is delicate enough to warrant the field's own most well-tested illustration rather than a novel construction that might obscure the point.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (both) |
| V-4 | unlocks concepts named accurately from KG | PASS |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (empty in KG → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.65×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract: expert-tier learner, two differential operators introduced directly) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
