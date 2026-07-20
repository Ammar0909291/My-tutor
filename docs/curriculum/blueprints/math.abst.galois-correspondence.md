# Teaching Blueprint: Fundamental Theorem of Galois Theory (`math.abst.galois-correspondence`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.abst.galois-correspondence` |
| name | Fundamental Theorem of Galois Theory |
| domain | Abstract Algebra |
| difficulty | research |
| bloom | analyze |
| mastery_threshold | 0.55 → MAMR = ⌈0.55×5⌉ = 3/5 |
| estimated_hours | 8 |
| requires | `math.abst.galois-group` |
| unlocks | none |
| cross_links | none |
| CPA_entry_stage | A (Abstract) — research-level learner already computes $\operatorname{Gal}(K/F)$ for specific extensions; the task is the structural correspondence theorem itself |
| description (KG) | For a Galois extension $K/F$: there is a bijection between intermediate fields $E$ ($F\subseteq E\subseteq K$) and subgroups $H$ of $\operatorname{Gal}(K/F)$. Correspondence: $E\leftrightarrow\operatorname{Gal}(K/E)$; normal subgroups correspond to Galois subextensions. |

## Component 1 — Learning Objectives

- LO1: State the correspondence precisely — for a Galois extension $K/F$, the map $E\mapsto\operatorname{Gal}(K/E)$ sends each INTERMEDIATE FIELD $E$ (with $F\subseteq E\subseteq K$) to a SUBGROUP of `math.abst.galois-group`'s own $\operatorname{Gal}(K/F)$ — and recognize this as a BIJECTION between the (typically infinite-feeling, geometric) collection of intermediate fields and the (finite, concrete, listable) collection of subgroups, turning a field-theory question into a group-theory question.
- LO2: Apply the correspondence's INCLUSION-REVERSING property: LARGER intermediate fields correspond to SMALLER subgroups, and vice versa (bigger field $\Rightarrow$ fewer automorphisms can fix it pointwise) — and correctly order a specific small lattice of intermediate fields and its corresponding subgroup lattice, confirming the reversal directly.
- LO3: State and apply the correspondence's normality clause: an intermediate field $E$ is a GALOIS extension of $F$ (i.e. a "Galois subextension") if and only if $\operatorname{Gal}(K/E)$ is a NORMAL subgroup of $\operatorname{Gal}(K/F)$ — and correctly determine, for a specific small example, which intermediate fields are Galois over $F$ by checking normality of the corresponding subgroup rather than re-verifying the field extension's Galois property directly.

## Component 2 — Prerequisite Check

Assumes mastery of `math.abst.galois-group` ($\operatorname{Gal}(K/F)=\{\sigma:K\to K\text{ automorphism fixing }F\text{ pointwise}\}$, a group under composition, with $|\operatorname{Gal}(K/F)|=[K:F]$ for Galois extensions).

## Component 3 — Core Explanation

**The correspondence turns a field-theory search into a group-theory search**: for a Galois extension $K/F$, `math.abst.galois-group` already defines $\operatorname{Gal}(K/F)$ as a specific, often small and fully listable group. The Fundamental Theorem says every intermediate field $E$ (a subset of $K$ containing $F$, closed under the field operations) corresponds to EXACTLY one subgroup $H=\operatorname{Gal}(K/E)\le\operatorname{Gal}(K/F)$ (automorphisms of $K$ that fix the LARGER field $E$ pointwise — a stronger, more restrictive condition than fixing just $F$, hence a SUBGROUP), and this correspondence is a BIJECTION: every subgroup arises this way from exactly one intermediate field, via the reverse direction $H\mapsto K^H$ (the fixed field of $H$). Since $\operatorname{Gal}(K/F)$ is a finite, concrete group whose subgroups can be listed exhaustively, finding ALL intermediate fields of $K/F$ reduces to the (often much easier) group-theoretic task of listing all subgroups of $\operatorname{Gal}(K/F)$.

**The correspondence reverses inclusion**: if $E_1\subseteq E_2$ (a smaller intermediate field inside a larger one), then $\operatorname{Gal}(K/E_2)\subseteq\operatorname{Gal}(K/E_1)$ — the SUBGROUP shrinks as the field GROWS. This makes sense directly from the definitions: an automorphism fixing the LARGER field $E_2$ pointwise automatically also fixes the smaller field $E_1\subseteq E_2$ pointwise (fixing more forces fixing less), so $\operatorname{Gal}(K/E_2)\subseteq\operatorname{Gal}(K/E_1)$. In particular, the SMALLEST intermediate field $F$ itself corresponds to the LARGEST subgroup, the WHOLE group $\operatorname{Gal}(K/F)$; the LARGEST intermediate field $K$ itself corresponds to the SMALLEST (trivial) subgroup $\{e\}$.

**Normal subgroups correspond exactly to Galois subextensions**: an intermediate field $E$ is itself a GALOIS extension of $F$ (not just any field extension — one with the full symmetry/splitting-field structure `math.abst.galois-group`'s own theory requires) if and only if $\operatorname{Gal}(K/E)$ is a NORMAL subgroup of $\operatorname{Gal}(K/F)$. This is genuinely useful: checking whether $E/F$ is Galois directly (verifying splitting-field and separability conditions on $E$ itself) can be intricate, but checking whether a specific, already-known subgroup is normal in a specific, already-known finite group is often a much more mechanical computation.

## Component 4 — Worked Examples

**Example 1 (LO1 — the correspondence as a bijection, listed explicitly for a small case, breaking MC-1)**: for $K=\mathbb{Q}(\sqrt2,\sqrt3)$ over $F=\mathbb{Q}$, $\operatorname{Gal}(K/F)\cong\mathbb{Z}_2\times\mathbb{Z}_2$ (order 4, from `math.abst.galois-group`'s own machinery — each generator independently negates $\sqrt2$ or $\sqrt3$). This group has EXACTLY 5 subgroups: $\{e\}$, three subgroups of order 2, and the whole group. The correspondence pairs these with EXACTLY 5 intermediate fields: $K$ itself (corresponding to $\{e\}$), $\mathbb{Q}(\sqrt2)$, $\mathbb{Q}(\sqrt3)$, $\mathbb{Q}(\sqrt6)$ (each corresponding to one order-2 subgroup), and $F=\mathbb{Q}$ itself (corresponding to the whole group) — a complete, VERIFIED bijection between 5 subgroups and 5 intermediate fields, with no field or subgroup left unmatched.

**Example 2 (LO2 — inclusion reversal verified directly on the lattice, breaking MC-2)**: continuing Example 1: $F=\mathbb{Q}\subseteq\mathbb{Q}(\sqrt2)\subseteq K$ is a chain of fields (SMALLEST to LARGEST). Checking the corresponding subgroups: $\operatorname{Gal}(K/\mathbb{Q}(\sqrt2))$ is the order-2 subgroup fixing $\sqrt2$ (the automorphism negating only $\sqrt3$), while $\operatorname{Gal}(K/\mathbb{Q})$ is the FULL order-4 group. So the field chain $\mathbb{Q}\subseteq\mathbb{Q}(\sqrt2)\subseteq K$ corresponds to the subgroup chain $\operatorname{Gal}(K/K)=\{e\}\subseteq\operatorname{Gal}(K/\mathbb{Q}(\sqrt2))\subseteq\operatorname{Gal}(K/\mathbb{Q})$ — REVERSED in size, exactly as LO2 predicts: the smallest field $F$ pairs with the LARGEST subgroup, and the largest field $K$ pairs with the SMALLEST subgroup.

**Example 3 (LO3 — normality determining Galois subextensions, breaking MC-3)**: continuing Example 1: since $\operatorname{Gal}(K/F)\cong\mathbb{Z}_2\times\mathbb{Z}_2$ is ABELIAN, EVERY subgroup is automatically normal (a defining feature of abelian groups — every subgroup of an abelian group is normal). By the correspondence's normality clause, this means EVERY intermediate field ($\mathbb{Q}(\sqrt2)$, $\mathbb{Q}(\sqrt3)$, $\mathbb{Q}(\sqrt6)$) is itself a Galois extension of $F=\mathbb{Q}$ — confirmed WITHOUT needing to separately verify splitting-field/separability conditions for each of the three intermediate fields individually; the single group-theoretic fact (abelian $\Rightarrow$ every subgroup normal) settles all three cases simultaneously via the correspondence.

## Component 5 — Teaching Actions

### Teaching Action A01 — The Correspondence Turns Field Search into (Easier) Group Search (Primitive P11: Representation Shift)

State: "instead of hunting for intermediate fields directly — an open-ended, geometric search — list the subgroups of `math.abst.galois-group`'s own $\operatorname{Gal}(K/F)$, a finite, fully listable group; the correspondence guarantees these give you EVERY intermediate field, with none missed and none extra." Walk Example 1's complete 5-to-5 matching.

- **MC-1 hook**: ask "does the correspondence between intermediate fields and subgroups account for EVERY intermediate field, or could some intermediate fields fail to correspond to any subgroup?" — an "some might be missed" answer reveals MC-1 (missing that the correspondence is a genuine BIJECTION, accounting for every field and every subgroup with none left over).

### Teaching Action A02 — Bigger Fields Get Smaller Subgroups (Primitive P28: Conflict Evidence)

Present Example 2's direct evidence: the field chain $F\subseteq\mathbb{Q}(\sqrt2)\subseteq K$ (growing) corresponds to the subgroup chain $\{e\}\subseteq\operatorname{Gal}(K/\mathbb{Q}(\sqrt2))\subseteq\operatorname{Gal}(K/F)$ (also growing, but in the OPPOSITE role — matched to the field chain read backward). State: "it's tempting to expect 'bigger field, bigger subgroup' — but it's the reverse: fixing a BIGGER field pointwise is a MORE restrictive condition, so fewer automorphisms qualify, giving a SMALLER subgroup."

- **MC-2 hook**: ask "does a LARGER intermediate field correspond to a LARGER or a SMALLER subgroup of $\operatorname{Gal}(K/F)$?" — a "larger" answer reveals MC-2 (missing the inclusion-reversing nature of the correspondence).

### Teaching Action A03 — Normality of the Subgroup Settles Whether the Subextension Is Galois (Primitive P06: Contrast Pair)

Contrast the LABORIOUS route (directly verifying splitting-field and separability conditions for each of Example 1's three intermediate fields individually) against Example 3's SINGLE group-theoretic observation (the group is abelian, so every subgroup is automatically normal) settling all three cases AT ONCE via the correspondence. State: "checking whether an intermediate field is itself Galois over $F$ doesn't require re-verifying field-theoretic conditions directly — checking whether the CORRESPONDING SUBGROUP is normal in $\operatorname{Gal}(K/F)$ answers the same question, often far more mechanically."

- **MC-3 hook**: ask "to determine whether a specific intermediate field is itself a Galois extension of $F$, must you re-verify splitting-field/separability conditions directly on that field, or can group-theoretic information about the corresponding subgroup answer this instead?" — a "must re-verify directly" answer reveals MC-3 (missing the normality-based shortcut the correspondence provides).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. For $K/F$ with $\operatorname{Gal}(K/F)$ of order 6 (cyclic, $\cong\mathbb{Z}_6$), list all subgroups and state how many intermediate fields the correspondence guarantees.
  2. Explain, using the correspondence's inclusion-reversing property, why the field $F$ itself must correspond to the LARGEST possible subgroup.
  3. For the same order-6 cyclic group, determine (citing that every subgroup of a CYCLIC group is normal) whether every intermediate field is a Galois subextension of $F$.
  4. Explain, in your own words, why the correspondence turns a potentially difficult field-theoretic search into a more tractable group-theoretic one.
- **P76 (Transfer Probe, mode = independence — no cross-link target listed in the KG for this concept)**: "A researcher studying the splitting field $K$ of a specific degree-4 polynomial over $\mathbb{Q}$ has already computed $\operatorname{Gal}(K/\mathbb{Q})$ to be isomorphic to the non-abelian group $S_3$ (order 6), and wants to determine ALL fields strictly between $\mathbb{Q}$ and $K$, along with which of them are themselves Galois extensions of $\mathbb{Q}$. (a) Using the Fundamental Theorem's correspondence, explain what the researcher needs to compute FIRST (about the group, not the fields) to find every intermediate field, and why this is guaranteed to find them all. (b) $S_3$ has a single normal subgroup of order 3 (in addition to the trivial subgroup and the whole group) and three non-normal subgroups of order 2. Using the correspondence's normality clause, explain which of the resulting intermediate fields are Galois extensions of $\mathbb{Q}$ and which are not. (c) Contrast this with Example 3's fully abelian case: explain why $S_3$ being non-abelian genuinely changes the answer to 'are all intermediate fields automatically Galois over $F$?'"
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 3/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | CORRESPONDENCE-BIJECTION-DOUBTED | Believing the correspondence between intermediate fields and subgroups might miss some fields or subgroups, rather than being a genuine, complete bijection | Foundational |
| MC-2 | INCLUSION-DIRECTION-ASSUMED-PRESERVED | Believing a larger intermediate field corresponds to a larger subgroup, missing that the correspondence genuinely REVERSES inclusion | High |
| MC-3 | GALOIS-SUBEXTENSION-ASSUMED-TO-NEED-DIRECT-VERIFICATION | Believing determining whether an intermediate field is itself Galois over $F$ requires directly re-verifying field-theoretic conditions, missing the normality-of-the-corresponding-subgroup shortcut | Moderate |

- **B01 (targets MC-1)**: P27 (name it: "Correspondence Bijection Doubted") → P41 (detect: ask whether the correspondence could miss fields or subgroups) → P64 (conceptual shift: re-walk Example 1's complete 5-to-5 verified matching).
- **B02 (targets MC-2)**: P27 (name it: "Inclusion Direction Assumed Preserved") → P41 (detect: ask whether larger fields correspond to larger or smaller subgroups) → P64 (conceptual shift: re-walk Example 2's directly reversed chain).
- **B03 (targets MC-3)**: P27 (name it: "Galois Subextension Assumed to Need Direct Verification") → P41 (detect: ask whether determining a Galois subextension requires direct field-theoretic re-verification) → P64 (conceptual shift: re-walk Example 3's single abelian-group observation settling all three cases at once).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.abst.galois-group` (the group $\operatorname{Gal}(K/F)$ this concept's correspondence is built directly on top of).
- **Unlocks**: none listed in the KG for this concept.
- **Cross-link**: KG lists none for this concept. $P76_{mode}=$ **independence** (no cross-link target to check).

## Component 8 — Teaching Notes

- estimated_hours = 8 with a research/analyze tag supports the "3 TAs + gate" tier, with LO1 establishing the bijection itself via a fully worked, exhaustively matched small example, LO2 given full depth via a directly verified inclusion-reversal chain, and LO3 grounding the normality clause in a genuinely useful shortcut application.
- **Division of labor**: `math.abst.galois-group` already owns the group $\operatorname{Gal}(K/F)$'s own definition and basic properties, including its order formula (verified by grep — no intermediate-field correspondence or normality-based subextension content found there). This concept owns the full correspondence theorem: the bijection itself, the inclusion-reversal property, and the normality-Galois-subextension equivalence — none of which appear in the prerequisite.
- Example 1's deliberate choice of $K=\mathbb{Q}(\sqrt2,\sqrt3)$ (a genuinely small, fully computable case with exactly 5 subgroups and 5 fields) was made specifically so LO1's bijection claim could be verified EXHAUSTIVELY (every field and every subgroup accounted for), rather than merely illustrated with one matched pair, which would leave the "no field or subgroup left over" claim unverified.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS (none listed) |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (none listed in KG → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.55×5⌉=3) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract: research-level learner already computes $\operatorname{Gal}(K/F)$; task is the structural correspondence theorem itself) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
