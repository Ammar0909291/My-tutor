# Teaching Blueprint: Quotient Group (`math.abst.quotient-group`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.abst.quotient-group` |
| name | Quotient Group |
| domain | Abstract Algebra |
| difficulty | advanced |
| bloom | apply |
| mastery_threshold | 0.85 → MAMR = ⌈0.85×5⌉ = 5/5 |
| estimated_hours | 4 |
| requires | `math.abst.normal-subgroup` |
| unlocks | `math.abst.first-isomorphism-theorem` |
| cross_links | (none) |
| CPA_entry_stage | A (Abstract) — expert learner already fluent in normal subgroups; the quotient is constructed directly on the already-mastered D3 example |
| description (KG) | G/N = {gN : g∈G} with operation (aN)(bN)=abN. Well-defined iff N◁G. \|G/N\|=[G:N]=\|G\|/\|N\| (finite case). The quotient "collapses" N to the identity. |

## Component 1 — Learning Objectives

- LO1: Define the quotient group $G/N=\{gN:g\in G\}$ with operation $(aN)(bN)=abN$ — DIRECTLY REUSING `math.abst.normal-subgroup`'s own $D_3$ example (the normal subgroup $H=\{e,r,r^2\}$) — and recognize the ELEMENTS of $G/N$ are the COSETS THEMSELVES (each a subset of $G$), not elements of $G$.
- LO2: Apply the counting formula $|G/N|=[G:N]=|G|/|N|$ concretely, and identify the resulting quotient's own group structure.
- LO3: Recognize the quotient "collapses" $N$ to the identity — and, contrasting directly with `math.abst.normal-subgroup`'s own non-normal $K=\{e,s\}$ example, recognize that the quotient construction genuinely REQUIRES normality: for a non-normal subgroup, the coset "multiplication" is provably ill-defined, not merely inconvenient.

## Component 2 — Prerequisite Check

Assumes mastery of `math.abst.normal-subgroup` ($N\trianglelefteq G$ iff $gNg^{-1}=N$ for all $g$, equivalently $gN=Ng$; the concrete $D_3$ verification that $H=\{e,r,r^2\}$ is normal while $K=\{e,s\}$ is not, and that non-normality makes coset multiplication ill-defined).

## Component 3 — Core Explanation

**$G/N$'s elements are cosets, not elements of $G$**: the quotient group $G/N=\{gN:g\in G\}$ consists of the LEFT COSETS of $N$ in $G$ — each coset $gN$ is itself a SUBSET of $G$ (all elements of the form $gn$ for $n\in N$). The quotient's ELEMENTS are these cosets themselves, each one a whole subset of $G$, not individual elements of $G$. The group operation $(aN)(bN)=abN$ combines two cosets by multiplying REPRESENTATIVES and taking the resulting coset.

**The size formula divides, and the quotient has its own group structure**: for finite $G$, $|G/N|=[G:N]=|G|/|N|$ — the number of distinct cosets, obtained by dividing $|G|$ by $|N|$. The resulting quotient is a genuine GROUP in its own right, with its own multiplication table, potentially isomorphic to a familiar, smaller group.

**Normality is exactly what makes coset multiplication well-defined — the quotient "collapses" N to the identity**: `math.abst.normal-subgroup` already showed that for a NON-normal subgroup, the SAME coset can have different representatives whose products land in genuinely different cosets — coset multiplication is provably ill-defined. Normality is precisely the condition ruling this out, guaranteeing $(aN)(bN)=abN$ gives a consistent answer regardless of which representatives $a,b$ are chosen. In the resulting quotient, $N$ itself becomes the IDENTITY element — all of $N$'s elements are "collapsed" into a single coset that acts as $G/N$'s identity.

## Component 4 — Worked Examples

**Example 1 (LO1 — constructing D₃/H concretely, breaking MC-1)**: Using `math.abst.normal-subgroup`'s own $D_3$ example: $H=\{e,r,r^2\}$ (the normal rotation subgroup, verified there via $sHs=H$). Since $|D_3|=6$ and $|H|=3$, there are exactly $6/3=2$ cosets, partitioning all of $D_3$: $H=\{e,r,r^2\}$ itself, and $sH=\{s,sr,sr^2\}$. So $D_3/H=\{H,sH\}$ — its TWO ELEMENTS are these two cosets (each a 3-element SUBSET of $D_3$), NOT individual elements of $D_3$ like $e$ or $r$.

**Example 2 (LO2 — the counting formula and the quotient's group structure, breaking MC-2)**: $|D_3/H|=|D_3|/|H|=6/3=2$ — matching Example 1's direct count of 2 cosets exactly (a DIVISION, not a subtraction of $|D_3|-|H|=3$). Verify the group operation: $(sH)(sH)=s\cdot sH$ (using representative multiplication, since $H\cdot H=H$) $=s^2H=eH=H$ — so squaring the non-identity coset $sH$ gives back the identity coset $H$. A 2-element group where the non-identity element squares to the identity IS the unique group of order 2 — $D_3/H\cong\mathbb{Z}/2$.

**Example 3 (LO3 — normality is required, not optional, breaking MC-3)**: Attempting the SAME construction for the NON-normal $K=\{e,s\}$ (from `math.abst.normal-subgroup`'s own Example 2/3): that concept's own Example 3 already showed the coset $rK=\{r,rs\}$ has two representatives, $r$ and $rs$, whose "products" with $rK$ itself give genuinely DIFFERENT results: using $r$ gives $r\cdot r=r^2$, landing in $r^2K$; using $rs$ instead gives $(rs)(rs)=e$, landing in $eK=K$ — and $r^2K\ne K$ (different sets). "$D_3/K$" is NOT even a well-defined group — the coset multiplication breaks down entirely, confirming normality is a genuine REQUIREMENT for the quotient construction, not an optional convenience.

## Component 5 — Teaching Actions

### Teaching Action A01 — Cosets Are the Elements, Not Members of G (Primitive P11: Representation Shift)

State: "D₃/H's two elements are H and sH themselves — whole 3-element subsets of D₃ — not individual elements like e or r." Work Example 1's explicit coset construction.

- **MC-1 hook**: ask "are the elements of G/N individual elements of G, rather than the cosets themselves?" — a "yes" answer reveals MC-1 (missing that G/N's elements are the cosets, each a subset of G).

### Teaching Action A02 — The Size Formula Divides, Producing a Genuine Group (Primitive P28: Conflict Evidence)

Present Example 2's direct evidence: $|D_3/H|=6/3=2$, and the resulting 2-element structure genuinely satisfies group axioms, matching $\mathbb{Z}/2$. State: "the quotient isn't just a leftover set with |G|−|N| elements — it's |G|/|N| cosets, forming a genuine group with its own recognizable structure."

- **MC-2 hook**: ask "is |G/N| computed by subtracting |N| from |G|, rather than dividing?" — a "yes" answer reveals MC-2 (using subtraction instead of the correct division formula).

### Teaching Action A03 — Normality Is Required, Not Optional (Primitive P06: Contrast Pair)

Contrast Example 1-2's well-defined $D_3/H$ (H normal) against Example 3's ill-defined "$D_3/K$" attempt (K not normal, two representatives giving conflicting products). State: "the quotient construction genuinely REQUIRES normality — without it, coset multiplication isn't just awkward, it's provably inconsistent."

- **MC-3 hook**: ask "can the quotient group construction be applied to any subgroup N, whether or not it's normal?" — a "yes" answer reveals MC-3 (missing that non-normal subgroups make the construction genuinely ill-defined, not merely inconvenient).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. List the elements of $D_3/H$ explicitly as cosets (not individual group elements).
  2. Verify $(H)(sH)=sH$ directly using representative multiplication.
  3. Explain why $|D_3/H|=2$ follows from dividing, not subtracting, $|D_3|$ and $|H|$.
  4. Explain why attempting to form "$D_3/K$" for the non-normal $K=\{e,s\}$ fails, referencing the specific conflicting-representatives computation.
- **P76 (Transfer Probe, mode = independence)**: "A student studying symmetry groups wants to construct the quotient of a group $G$ by a subgroup $M$ they've identified, without first checking whether $M$ is normal. (a) Explain what could go wrong if $M$ is not normal, using the D₃/K-style representative-conflict reasoning. (b) The student, after verifying $M$ IS normal, computes $|G/M|=|G|/|M|=4$ and concludes the quotient must be isomorphic to $\mathbb{Z}/4$. Explain why this conclusion is not automatically justified, even though the size is correct (hint: consider what other groups of order 4 exist). (c) A colleague argues 'since the quotient collapses M down to a single element, the quotient group must literally be a subset of G with M's elements removed.' Explain specifically why this misunderstands what the quotient's elements actually are."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | QUOTIENT-ELEMENTS-ASSUMED-TO-BE-ELEMENTS-OF-G | Believing the elements of G/N are individual elements of G, missing that they are the cosets themselves, each a subset of G | Foundational |
| MC-2 | QUOTIENT-SIZE-COMPUTED-BY-SUBTRACTION | Believing |G/N| is computed by subtracting |N| from |G|, missing the correct division formula |G|/|N| | Foundational |
| MC-3 | QUOTIENT-CONSTRUCTION-ASSUMED-TO-WORK-FOR-ANY-SUBGROUP | Believing the quotient group construction applies to any subgroup regardless of normality, missing that non-normal subgroups make coset multiplication genuinely ill-defined | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Quotient Elements Assumed to Be Elements of G") → P41 (detect: ask a student to name an element of D₃/H and check whether they answer with an element of D₃ like e or r, rather than a coset) → P64 (conceptual shift: re-walk Example 1's explicit coset listing, re-anchoring on "the elements are the cosets H and sH themselves").
- **B02 (targets MC-2)**: P27 (name it: "Quotient Size Computed by Subtraction") → P41 (detect: ask a student for |D₃/H| and check whether they compute 6−3=3 instead of 6/3=2) → P64 (conceptual shift: re-walk Example 2's direct coset count matching the division formula, re-anchoring on "division, not subtraction").
- **B03 (targets MC-3)**: P27 (name it: "Quotient Construction Assumed to Work for Any Subgroup") → P41 (detect: ask a student whether "D₃/K" is a valid quotient group, checking for "yes") → P64 (conceptual shift: re-walk Example 3's conflicting-representatives computation, re-anchoring on "normality is a genuine requirement, not a convenience").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.abst.normal-subgroup` (the $D_3$ example, normality definition, and well-definedness verification this concept's construction directly reuses).
- **Unlocks**: `math.abst.first-isomorphism-theorem` (relates quotient groups directly to homomorphism images, building on this concept's construction).
- **Cross-link**: KG lists no cross_links for this concept (checked via `ls docs/curriculum/blueprints/` before setting P76_mode — none to check). $P76_{mode}=$ **independence**.

## Component 8 — Teaching Notes

- estimated_hours = 4 with an advanced/apply tag places this at a "3 TAs + gate" tier, appropriately compact given the concept directly reuses `math.abst.normal-subgroup`'s own fully-worked $D_3$ example throughout, rather than introducing new groups.
- **Division of labor**: `math.abst.normal-subgroup` owns the normality definition, its $D_3$ verification (both the normal $H$ and non-normal $K$ cases), and the observation that non-normality breaks coset multiplication. This concept, `math.abst.quotient-group`, deliberately does not re-derive any of that; it owns the actual GROUP construction $G/N$ built from an already-verified normal subgroup, the counting formula, and the explicit confirmation (reusing that concept's own conflicting-representatives computation) that normality is a hard requirement, not a convenience.
- All three examples deliberately reuse the IDENTICAL $D_3$ setup from `math.abst.normal-subgroup` (rather than a fresh group) specifically so the entire concept — construction, counting, and the normality-is-required point — could be demonstrated on one already-familiar, fully-verified concrete case, minimizing new abstraction load.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (no cross_links listed → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.85×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract: expert learner already fluent in normal subgroups; quotient constructed directly on the already-mastered D3 example) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
