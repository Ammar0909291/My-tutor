# Teaching Blueprint: Coset (`math.abst.coset`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.abst.coset` |
| name | Coset |
| domain | Abstract Algebra |
| difficulty | advanced |
| bloom | understand |
| mastery_threshold | 0.9 → MAMR = ⌈0.9×5⌉ = 5/5 |
| estimated_hours | 4 |
| requires | `math.abst.subgroup` |
| unlocks | `math.abst.lagrange-theorem`, `math.abst.normal-subgroup` |
| cross_links | none |
| CPA_entry_stage | A (Abstract) — direct definition, grounded immediately in a concrete finite-group example |
| description (KG) | Left coset of H in G: aH = {ah : h∈H}. Cosets partition G; all cosets have the same size |H|. aH=bH iff a⁻¹b∈H. Index [G:H] = |G|/|H| = number of distinct cosets. |

## Component 1 — Learning Objectives

- LO1: Define the **left coset** $aH=\{ah : h\in H\}$ of a subgroup $H\leq G$ by an element $a\in G$, and compute specific cosets for a given group and subgroup.
- LO2: State and apply the **coset equality criterion** — $aH=bH$ iff $a^{-1}b\in H$ — and use it to determine whether two elements generate the same coset without listing out both cosets fully.
- LO3: State that **distinct cosets partition $G$** (every element of $G$ lies in EXACTLY one coset) and that **all cosets have the same size** $|H|$, and use these facts to compute the **index** $[G:H]=|G|/|H|$ (the number of distinct cosets) for a finite group.

## Component 2 — Prerequisite Check

Assumes mastery of `math.abst.subgroup` (the subgroup criterion, and $H\leq G$ as a subset that is itself a group).

## Component 3 — Core Explanation

For a subgroup $H\leq G$ and an element $a\in G$, the **left coset** of $H$ by $a$ is:
$$aH = \{ah : h\in H\}$$
— take every element of $H$, left-multiply by the fixed $a$, and collect the results.

**Coset equality criterion**: $aH=bH$ **iff** $a^{-1}b\in H$. This gives a practical test WITHOUT needing to list out both cosets entirely: compute $a^{-1}b$ (using the group's actual operation) and check whether the result lies in $H$.

**Cosets partition $G$**: every element $g\in G$ belongs to EXACTLY one left coset (note: $g\in gH$ always, since $g=ge$ and $e\in H$) — and any two cosets are either IDENTICAL (same set) or entirely DISJOINT (share no elements) — never partially overlapping. This means the distinct cosets of $H$ divide $G$ up into non-overlapping "blocks," collectively covering every element of $G$ exactly once.

**All cosets have the same size $|H|$**: the map $h\mapsto ah$ is a bijection from $H$ to $aH$ (invertible via $ah\mapsto a^{-1}(ah)=h$), so $|aH|=|H|$ for EVERY $a$ — every coset, regardless of which element generates it, has exactly as many elements as $H$ itself.

**The index** $[G:H]$ is the NUMBER of distinct left cosets of $H$ in $G$. For a finite group, since the cosets partition $G$ into equal-sized (size $|H|$) blocks, $[G:H]=\frac{|G|}{|H|}$ — this is exactly the reasoning behind Lagrange's Theorem (the next concept), that $|H|$ must divide $|G|$.

## Component 4 — Worked Examples

**Example 1 (LO1 — computing cosets directly)**: In $G=(\mathbb{Z}/6\mathbb{Z},+)$, let $H=\{0,3\}$ (a subgroup, verifiable directly). Compute the coset $1+H = \{1+0,1+3\}=\{1,4\}$. Compute $2+H=\{2+0,2+3\}=\{2,5\}$.

**Example 2 (LO2 — the equality criterion, breaking MC-1)**: Are $1+H$ and $4+H$ the same coset (using the same $H=\{0,3\}$)? Check the criterion (additive notation: $a^{-1}b$ becomes $b-a$): $4-1=3\in H$? Yes ($3\in\{0,3\}$). So $1+H=4+H$ — confirmed WITHOUT listing both out: $4+H=\{4+0,4+3\}=\{4,1\}=\{1,4\}$, matching $1+H$ exactly (just listed in different order) — verifying the criterion's prediction.

**Example 3 (LO3 — partition, equal sizes, and the index, breaking MC-2)**: For the same $G=\mathbb{Z}/6\mathbb{Z}$, $H=\{0,3\}$ ($|H|=2$): list ALL distinct cosets: $0+H=\{0,3\}$, $1+H=\{1,4\}$, $2+H=\{2,5\}$. Together these THREE cosets $\{0,3\},\{1,4\},\{2,5\}$ cover every element of $\mathbb{Z}/6\mathbb{Z}=\{0,1,2,3,4,5\}$ exactly once — confirming the partition property. Each has size exactly $|H|=2$. Index: $[G:H]=|G|/|H|=6/2=3$ — matching the count of 3 distinct cosets found directly. A student computing $3+H$ separately would find $3+H=\{3+0,3+3\}=\{3,6\bmod6\}=\{3,0\}=\{0,3\}$ — the SAME as $0+H$, NOT a fourth distinct coset — illustrating that continuing to compute cosets for every element of $G$ eventually just re-produces already-found cosets, rather than genuinely new ones.

## Component 5 — Teaching Actions

### Teaching Action A01 — Computing Cosets, via a Small Finite Group (Primitive P11: Representation Shift)

Recall the already-verified subgroup $H=\{0,3\}\leq\mathbb{Z}/6\mathbb{Z}$. State: "a coset $aH$ takes the fixed element $a$ and 'shifts' every element of $H$ by it — like sliding the whole subgroup $H$ over by $a$." Work Example 1's direct computation of $1+H$ and $2+H$.

Shift representation to the equality criterion: state $aH=bH \iff a^{-1}b\in H$, and work Example 2's verification, contrasting the SHORTCUT (checking $a^{-1}b\in H$) against the LONGER method (listing both cosets and comparing element by element) — showing both reach the same conclusion, with the shortcut being far more efficient for larger groups.

- **MC-1 hook**: after computing $1+H=\{1,4\}$, ask "is $4+H$ therefore automatically a DIFFERENT coset from $1+H$, since 4 is a different starting element from 1?" — a "yes" answer reveals MC-1 (assuming different generating elements always produce different cosets, rather than checking the equality criterion — many different elements can generate the identical coset).

### Teaching Action A02 — Partition, Equal Sizes, and Diminishing New Cosets (Primitive P06: Contrast Pair)

**Contrast 1 (targets MC-1)**: Revisit Example 2's confirmed equality $1+H=4+H$ (different generating elements, SAME coset) directly beside $1+H\neq2+H$ (genuinely different cosets, verified via the criterion: $2-1=1\notin H$). State the rule: "two elements generate the SAME coset exactly when their difference (or $a^{-1}b$ in general notation) lands in $H$ — this can happen for elements that look 'unrelated' at first glance, and does NOT happen just because the elements are different."

**Contrast 2 (targets MC-2)**: Work Example 3's full listing of all THREE distinct cosets, then show that continuing to compute $3+H$, $4+H$, $5+H$ merely reproduces the SAME three cosets already found (in some order) rather than generating new ones. State the rule: "once you've found cosets covering every element of $G$, you're DONE — there are no more distinct cosets to discover, and the index $[G:H]$ counts exactly this many genuinely distinct blocks, not the number of elements you happen to try as generators."

### Teaching Action A03 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. In $G=(\mathbb{Z}/8\mathbb{Z},+)$ with $H=\{0,4\}$, compute the cosets $1+H$, $2+H$, and $3+H$.
  2. Using the equality criterion, determine whether $3+H$ and $7+H$ are the same coset (using the same $H=\{0,4\}$ from problem 1).
  3. List ALL distinct cosets of $H=\{0,4\}$ in $\mathbb{Z}/8\mathbb{Z}$, confirming they partition the full group, and compute the index $[G:H]$.
  4. Explain why every coset of $H$ must have exactly the same number of elements as $H$ itself, using the bijection argument from this lesson.
- **P76 (Transfer Probe, mode = independence)**: "A scheduling system divides 12 employees into shift groups using a subgroup-like structure: employees are grouped so that two employees are in the 'same shift-equivalence class' exactly when their assigned start-time difference (mod 12 hours) lies in a specific reference set $H=\{0,6\}$ (meaning employees starting 6 hours apart share a class). (a) Using this lesson's coset structure, explain why this shift-grouping rule genuinely partitions all 12 employees into non-overlapping groups, with no employee left ungrouped and no employee belonging to two different groups simultaneously. (b) Compute how many distinct shift-groups this scheme produces (using the index formula), and explain why every group must contain exactly the same number of employees."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | DIFFERENT-GENERATORS-ASSUMED-TO-GIVE-DIFFERENT-COSETS | Believing two different elements of $G$ must generate different cosets, rather than checking the equality criterion $a^{-1}b\in H$ (which can hold for seemingly unrelated elements) | Foundational |
| MC-2 | ALL-GROUP-ELEMENTS-ASSUMED-TO-GENERATE-DISTINCT-COSETS | Believing computing a coset for every single element of $G$ produces $|G|$ genuinely distinct cosets, rather than recognizing many generate repeats, with only $[G:H]$ genuinely distinct ones | Foundational |
| MC-3 | LEFT-COSET-COMPUTED-WITH-WRONG-MULTIPLICATION-SIDE | Computing $Ha=\{ha:h\in H\}$ (a right coset) when a LEFT coset $aH=\{ah:h\in H\}$ was requested, or vice versa, in a non-abelian group where the two can genuinely differ | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Different-Generators-Different-Cosets Assumption") → P41 (detect: present $1+H$ and $4+H$ for the same subgroup and ask if they must be different) → P64 (conceptual shift: apply the equality criterion directly, showing $4-1=3\in H$ confirms they're actually the SAME coset).
- **B02 (targets MC-2)**: P27 (name it: "All-Elements-Distinct-Cosets Overcounting") → P41 (detect: ask how many distinct cosets exist by computing one per element of $G$ without checking for repeats) → P64 (conceptual shift: work through Example 3's full listing, showing $3+H$ reproduces $0+H$ rather than adding a new coset, and that the count stabilizes at $[G:H]$ genuinely distinct blocks).
- **B03 (targets MC-3)**: P27 (name it: "Left/Right Coset Side Confusion") → P41 (detect: check whether a student consistently computes $ah$ (left coset) versus $ha$ (right coset) as requested) → P64 (conceptual shift: re-anchor on the precise definition — "left coset" means the fixed element multiplies on the LEFT of each $h\in H$; in a non-abelian group, this genuinely differs from the right-coset version).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.abst.subgroup` (the subgroup $H\leq G$ that cosets are defined relative to).
- **Unlocks**: `math.abst.lagrange-theorem` (Lagrange's Theorem — $|H|$ divides $|G|$ — follows directly from this concept's partition-into-equal-size-blocks fact), `math.abst.normal-subgroup` (normal subgroups are defined via the coincidence of left and right cosets, building directly on this concept).
- **Cross-link**: KG lists no cross-links for this concept.

## Component 8 — Teaching Notes

- estimated_hours = 4 with an advanced/understand tag places this at the "2 main TAs + gate" tier — A01 (computing cosets and the equality criterion) and A02 (the partition/equal-size facts plus the diminishing-new-cosets contrast) jointly cover all three LOs.
- MC-1 and MC-2 were deliberately kept as SEPARATE registry entries, though closely related, because MC-1 addresses the pairwise question ("are these two SPECIFIC cosets the same?") while MC-2 addresses the global counting question ("how MANY genuinely distinct cosets exist in total?") — a student can correctly resolve individual pairwise comparisons (MC-1) while still overcounting the total (MC-2) if they don't systematically track which generators have already produced a seen coset.
- The employee-shift-scheduling transfer probe was chosen because coset-based partitioning genuinely models real grouping/equivalence-class scenarios (shared remainder classes, in this case), giving the abstract partition and equal-size properties concrete, verifiable stakes in a scheduling context.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.abst.subgroup`) |
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
| V-15 | CPA_entry_stage justified | PASS (Abstract, grounded directly in a finite group example) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
