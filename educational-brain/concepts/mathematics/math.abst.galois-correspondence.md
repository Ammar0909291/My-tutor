# math.abst.galois-correspondence

## Identity
- **KG id**: `math.abst.galois-correspondence`
- **Domain**: math.abst
- **Requires**: `math.abst.galois-group`
- **Unlocks**: none
- **Cross-links**: none
- **Difficulty**: research
- **Bloom level**: analyze
- **Mastery threshold**: 0.55
- **Estimated hours**: 8

## Learning Objective
State the correspondence $E\mapsto\mathrm{Gal}(K/E)$ precisely as a BIJECTION between
intermediate fields of a Galois extension $K/F$ and subgroups of `math.abst.galois-group`'s own
$\mathrm{Gal}(K/F)$; apply its INCLUSION-REVERSING property (larger fields correspond to smaller
subgroups); and apply the normality clause — an intermediate field $E$ is itself Galois over $F$
if and only if $\mathrm{Gal}(K/E)$ is a NORMAL subgroup of $\mathrm{Gal}(K/F)$.

## Core Understanding
THE CORRESPONDENCE TURNS A FIELD SEARCH INTO A GROUP SEARCH: for a Galois extension $K/F$, every
intermediate field $E$ ($F\subseteq E\subseteq K$) corresponds to EXACTLY one subgroup
$H=\mathrm{Gal}(K/E)\le\mathrm{Gal}(K/F)$ (automorphisms fixing the LARGER field $E$ pointwise —
strictly more restrictive than fixing just $F$, hence a subgroup), and this is a BIJECTION: every
subgroup arises from exactly one intermediate field via the reverse map $H\mapsto K^H$. Since
$\mathrm{Gal}(K/F)$ is a finite, fully listable group (`math.abst.galois-group`'s own object),
finding ALL intermediate fields reduces to the much easier task of listing all subgroups.

THE CORRESPONDENCE REVERSES INCLUSION: if $E_1\subseteq E_2$, then
$\mathrm{Gal}(K/E_2)\subseteq\mathrm{Gal}(K/E_1)$ — the subgroup SHRINKS as the field GROWS,
because fixing a LARGER field pointwise is a MORE restrictive condition (fixing more forces
fixing less). The smallest field $F$ corresponds to the LARGEST subgroup (the whole group); the
largest field $K$ corresponds to the SMALLEST subgroup ($\{e\}$).

NORMAL SUBGROUPS CORRESPOND EXACTLY TO GALOIS SUBEXTENSIONS: an intermediate field $E$ is itself
a Galois extension of $F$ if and only if $\mathrm{Gal}(K/E)$ is a NORMAL subgroup of
$\mathrm{Gal}(K/F)$. Checking whether $E/F$ is Galois directly (splitting-field, separability)
can be intricate; checking whether a specific, already-known subgroup is normal in a specific,
already-known finite group is often far more mechanical.

## Mental Models
- **"The correspondence is a translator: every field-theory question about intermediate fields
  becomes a group-theory question about subgroups, with nothing lost in either direction."**
- **"Bigger field, smaller subgroup — fixing more of the field pointwise leaves fewer symmetries
  standing."**

## Why Students Fail

### MC-1: CORRESPONDENCE-BIJECTION-DOUBTED
- **Surface form**: believes the correspondence between intermediate fields and subgroups might
  miss some fields or subgroups, rather than being a genuine, complete bijection.
- **Birth type**: Type 1, overgeneralization (Blueprint's own declared Foundational severity — a
  "correspondence" in everyday usage often suggests a loose association, not a full, exhaustive,
  one-to-one match).
- **Repair**: re-walk the exhaustive 5-subgroup/5-field matching directly, confirming none left
  over.

### MC-2: INCLUSION-DIRECTION-ASSUMED-PRESERVED
- **Surface form**: believes a larger intermediate field corresponds to a larger subgroup.
- **Birth type**: Type 1, overgeneralization (Blueprint's own declared High severity — "bigger
  structure corresponds to bigger structure" is the default intuition from most other
  correspondences already encountered).
- **Repair**: re-walk the directly reversed field/subgroup chain, confirming the smallest field
  pairs with the largest subgroup.

### MC-3: GALOIS-SUBEXTENSION-ASSUMED-TO-NEED-DIRECT-VERIFICATION
- **Surface form**: believes determining whether an intermediate field is itself Galois over $F$
  requires directly re-verifying field-theoretic conditions on that field.
- **Birth type**: Type 5, instruction-induced (Blueprint's own declared Moderate severity — the
  normality shortcut is a genuinely non-obvious reduction unless explicitly pointed out).
- **Repair**: re-walk the single abelian-group observation settling all cases simultaneously via
  the correspondence.

## Misconceptions

### MC-1: CORRESPONDENCE-BIJECTION-DOUBTED
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

### MC-2: INCLUSION-DIRECTION-ASSUMED-PRESERVED
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

### MC-3: GALOIS-SUBEXTENSION-ASSUMED-TO-NEED-DIRECT-VERIFICATION
- **Surface form**: as described above.
- **Root cause (Type 5)**: as described above.
- **Repair**: as described above.

## Analogies
- **"The correspondence is a dictionary with no untranslatable words — every field has exactly
  one subgroup entry, and every subgroup has exactly one field entry."**
- **Anti-analogy**: growing the field does NOT grow the subgroup — it shrinks it, the opposite of
  most size-preserving correspondences already seen.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: for $K=\mathbb Q(\sqrt2,\sqrt3)/\mathbb Q$,
  $\mathrm{Gal}(K/\mathbb Q)\cong\mathbb Z_2\times\mathbb Z_2$ has EXACTLY 5 subgroups ($\{e\}$,
  three of order 2, the whole group), matched to EXACTLY 5 intermediate fields ($K$,
  $\mathbb Q(\sqrt2)$, $\mathbb Q(\sqrt3)$, $\mathbb Q(\sqrt6)$, $\mathbb Q$) — a fully verified,
  exhaustive 5-to-5 bijection.
- **Demonstration 2 (targets MC-2)**: the field chain $\mathbb Q\subseteq\mathbb Q(\sqrt2)
  \subseteq K$ (growing) corresponds to the subgroup chain
  $\{e\}\subseteq\mathrm{Gal}(K/\mathbb Q(\sqrt2))\subseteq\mathrm{Gal}(K/\mathbb Q)$ read in
  REVERSE — the smallest field $\mathbb Q$ pairs with the full order-4 group, the largest field
  $K$ pairs with $\{e\}$.
- **Demonstration 3 (targets MC-3)**: since $\mathrm{Gal}(K/\mathbb Q)\cong\mathbb Z_2\times
  \mathbb Z_2$ is abelian, EVERY subgroup is automatically normal — so by the correspondence,
  EVERY intermediate field ($\mathbb Q(\sqrt2)$, $\mathbb Q(\sqrt3)$, $\mathbb Q(\sqrt6)$) is
  itself Galois over $\mathbb Q$, confirmed without separately re-verifying splitting-field
  conditions on each of the three fields individually.

## Discovery Questions
1. "Does the correspondence between intermediate fields and subgroups account for EVERY
   intermediate field, or could some be missed?"
2. "Does a larger intermediate field correspond to a larger or a smaller subgroup?"
3. "To determine whether a specific intermediate field is itself Galois over $F$, must you
   re-verify field-theoretic conditions directly, or can the corresponding subgroup answer this?"

## Teaching Sequence
1. **Anchor**: connect to `math.abst.galois-group`'s own $\mathrm{Gal}(K/F)$ as a finite, fully
   listable group, framing this concept as the theorem turning field search into group search.
2. **Representation shift**: Demonstration 1's exhaustive 5-to-5 match, isolating MC-1 by
   confirming the bijection leaves nothing unmatched.
3. **Conflict evidence**: Demonstration 2's reversed chain, isolating MC-2 by exposing the
   inclusion-reversing direction directly.
4. **Contrast pair**: Demonstration 3's single-observation shortcut versus laborious per-field
   verification, isolating MC-3.
5. **Mastery gate**: require a correct subgroup listing determining every intermediate field for
   a new group, a correct inclusion-reversal identification, and a correct normality-based
   Galois-subextension determination, at the Blueprint's own stated MAMR of 3/5 (⌈0.55×5⌉).

## Tutor Actions
- Never accept the correspondence described as merely "an association" — require the bijection
  (every field, every subgroup, none missed) stated explicitly.
- Never accept "bigger field means bigger subgroup" — require the inclusion-reversing direction
  stated explicitly.

## Voice Teaching Notes
- Say "does that account for every field and every subgroup, or could something be left over?"
  whenever the correspondence is invoked.
- When normality of a subextension is asked, say "do we need to re-check the field directly, or
  does the subgroup already tell us?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly lists all subgroups of a given finite group and
  states how many intermediate fields the correspondence guarantees.
- **Rung 2 (application)**: learner correctly identifies the inclusion-reversed subgroup
  corresponding to a given field chain.
- **Rung 3 (transfer)**: learner correctly determines, for a NEW non-abelian Galois group, which
  intermediate fields are Galois subextensions using the normality clause alone.

## Tutor Recovery Strategy
- If MC-1 recurs, re-walk the exhaustive 5-to-5 matching directly.
- If MC-2 recurs, re-walk the reversed field/subgroup chain directly.
- If MC-3 recurs, re-walk the single abelian-group observation settling all cases at once.

## Memory Hooks
- "Every field, every subgroup, nothing left over — the correspondence is complete."
- "Bigger field, smaller subgroup — the correspondence always flips."
- "Normal subgroup, Galois subextension — the shortcut replaces direct field re-verification."

## Transfer Connections
- `math.abst.galois-group` (already authored, this campaign, Batch 94): supplies the finite,
  listable group $\mathrm{Gal}(K/F)$ this concept's correspondence is built directly on top of.
- `math.abst.galois-theory` (already authored, this campaign): supplies the original Galois
  extension definition and the $\mathbb Q(\sqrt2,\sqrt3)/\mathbb Q$ example this concept's own
  richest demonstration reuses directly.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.abst.galois-correspondence.md`, reused by
  reference for its exhaustive 5-subgroup/5-field bijection, its directly reversed field/subgroup
  chain, its abelian-group normality shortcut, and its three-misconception registry (severity
  levels adopted directly as declared; birth types independently classified since this Blueprint
  states Description but not a formal Type label).
- Transfer probe cited by reference: the Blueprint's own independence-mode probe, examining a
  degree-4 polynomial's non-abelian $S_3$ Galois group, its single normal order-3 subgroup and
  three non-normal order-2 subgroups, and why non-abelian-ness genuinely changes which
  intermediate fields are Galois subextensions.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.abst.galois-group`, unlocks none, cross_links none, research/analyze,
  mastery_threshold 0.55, estimated_hours 8) was directly verified against the live KG and
  matches exactly.

## Version History
- 2026-09-18 (Batch 95): authored. First entry this batch. Companion batch concept:
  `math.linalg.column-space`. `math.abst` moves 36/37 → **37/37 — DOMAIN COMPLETE** this batch.
