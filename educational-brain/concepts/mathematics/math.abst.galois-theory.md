# math.abst.galois-theory

## Identity
- **KG id**: `math.abst.galois-theory`
- **Domain**: math.abst
- **Requires**: `math.abst.algebraic-extension`, `math.abst.group-theory`
- **Unlocks**: `math.abst.galois-group`
- **Cross-links**: none
- **Difficulty**: research
- **Bloom level**: analyze
- **Mastery threshold**: 0.65
- **Estimated hours**: 12

## Learning Objective
Define an $F$-AUTOMORPHISM of $K/F$ (a bijective ring homomorphism $K\to K$ fixing $F$
pointwise) and the GALOIS GROUP $\mathrm{Gal}(K/F)$ (all such automorphisms under composition,
verified to be a genuine group via `math.abst.group-theory`'s own axioms); state and verify on
one complete concrete example the FUNDAMENTAL THEOREM OF GALOIS THEORY — a bijective,
INCLUSION-REVERSING correspondence between intermediate fields and subgroups; and, at
orientation level, recognize that solvability by radicals concerns whether roots can be
EXPRESSED via a formula, never whether they EXIST.

## Core Understanding
A GALOIS GROUP IS THE SET OF $F$-FIXING SYMMETRIES OF $K$: an $F$-automorphism of $K/F$ is a
bijective ring homomorphism $\sigma:K\to K$ satisfying $\sigma(a)=a$ for every $a\in F$ — it may
permute elements of $K\setminus F$, but it must fix $F$ pointwise AND genuinely preserve both $+$
and $\times$ (an arbitrary relabeling of generators that breaks multiplicativity is NOT a valid
automorphism at all). The set of all such automorphisms, under composition, forms
$\mathrm{Gal}(K/F)$ — closure, identity, and inverses all hold directly, making it a genuine
group in `math.abst.group-theory`'s own already-mastered sense.

THE FUNDAMENTAL THEOREM: A CORRESPONDENCE THAT REVERSES INCLUSION: for a Galois extension $K/F$,
every intermediate field $F\subseteq E\subseteq K$ corresponds to exactly one subgroup of
$\mathrm{Gal}(K/F)$ (the subgroup fixing $E$ pointwise), and this correspondence is a bijection.
Crucially, it is INCLUSION-REVERSING: the LARGEST intermediate field ($K$ itself) corresponds to
the SMALLEST subgroup ($\{\mathrm{id}\}$), while the SMALLEST intermediate field ($F$ itself)
corresponds to the LARGEST subgroup (all of $\mathrm{Gal}(K/F)$) — bigger subfields have FEWER
symmetries fixing them, not more.

SOLVABILITY BY RADICALS IS ABOUT EXPRESSING ROOTS, NOT WHETHER THEY EXIST: every degree-$n$
polynomial has exactly $n$ roots in $\mathbb C$ (Fundamental Theorem of Algebra) — never in
doubt. The genuinely hard question is whether those roots can be WRITTEN using a formula built
from $+,-,\times,\div$ and radicals applied to the coefficients. Galois's insight: this is
possible exactly when the polynomial's Galois group is SOLVABLE. For degree $\le4$, the relevant
Galois groups are always solvable, giving the classical formulas; for a general quintic, the
Galois group is the full symmetric group $S_5$, NOT solvable — so no radical formula can exist
(Abel–Ruffini), even though the 5 roots exist and can be approximated to any precision.

## Mental Models
- **"A Galois group element must genuinely PRESERVE the field's structure while fixing $F$ — not
  merely relabel generators in a way that looks plausible."**
- **"The Fundamental Theorem's correspondence FLIPS size: bigger subgroups mean smaller fixed
  fields, and vice versa — never a size-preserving match."**

## Why Students Fail

### MC-1: GALOIS-AUTOMORPHISM-AS-ANY-RELABELING
- **Surface form**: believes ANY bijective relabeling of an extension's generators automatically
  defines a valid element of the Galois group.
- **Birth type**: Type 1, overgeneralization (Blueprint's own declared Foundational severity —
  the generators' visual symmetry (e.g. $\sqrt2$ and $\sqrt3$ both being square roots) suggests
  a plausible-looking swap should "work," without checking whether it actually preserves
  multiplication).
- **Repair**: re-test the specific candidate map against a genuine algebraic relation (e.g.
  $\sigma(\sqrt2\cdot\sqrt2)\stackrel?=\sigma(\sqrt2)\cdot\sigma(\sqrt2)$) directly.

### MC-2: GALOIS-CORRESPONDENCE-DIRECTION-PRESERVING
- **Surface form**: believes the Fundamental Theorem's correspondence between subgroups and
  intermediate fields is INCLUSION-PRESERVING (bigger subgroup $\leftrightarrow$ bigger field).
- **Birth type**: Type 1, overgeneralization (Blueprint's own declared Foundational severity —
  "bigger structure corresponds to bigger structure" is the default intuition from most other
  correspondences a learner has encountered, so the genuinely reversing direction here is
  counter to that prior pattern).
- **Repair**: re-walk the full subgroup-lattice/subfield-lattice table directly, confirming the
  trivial subgroup pairs with the LARGEST field and vice versa.

### MC-3: UNSOLVABILITY-BY-RADICALS-CONFLATED-WITH-NONEXISTENCE-OF-ROOTS
- **Surface form**: believes Abel–Ruffini's theorem means the general quintic's roots DON'T
  EXIST or CAN'T BE FOUND AT ALL, missing that it is specifically about formula-expressibility.
- **Birth type**: Type 3, language contamination (Blueprint's own declared Moderate severity —
  "unsolvable" in everyday English suggests "cannot be found/determined," obscuring the precise
  technical meaning "cannot be written via a specific radical formula").
- **Repair**: re-anchor on the roots-exist-vs-roots-expressible distinction directly, noting the
  Fundamental Theorem of Algebra's unconditional existence guarantee.

## Misconceptions

### MC-1: GALOIS-AUTOMORPHISM-AS-ANY-RELABELING
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

### MC-2: GALOIS-CORRESPONDENCE-DIRECTION-PRESERVING
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

### MC-3: UNSOLVABILITY-BY-RADICALS-CONFLATED-WITH-NONEXISTENCE-OF-ROOTS
- **Surface form**: as described above.
- **Root cause (Type 3)**: as described above.
- **Repair**: as described above.

## Analogies
- **"The Fundamental Theorem's correspondence is a seesaw: the more symmetries fix a subfield,
  the fewer distinguishable elements remain — so more symmetry means a SMALLER field, not a
  bigger one."**
- **Anti-analogy**: Abel–Ruffini does NOT mean "the quintic has no solution" — the 5 roots exist
  unconditionally (Fundamental Theorem of Algebra) and can be computed numerically to any
  precision; only a finite RADICAL FORMULA is unavailable in general.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: for $K=\mathbb Q(\sqrt2,\sqrt3)$, the naive swap
  $\rho:\sqrt2\leftrightarrow\sqrt3$ fails multiplicativity — $\rho(\sqrt2\cdot\sqrt2)=\rho(2)=2$
  but $\rho(\sqrt2)\cdot\rho(\sqrt2)=\sqrt3\cdot\sqrt3=3\ne2$ — NOT a valid automorphism. The
  genuine sign-flip $\sigma:\sqrt2\mapsto-\sqrt2,\sqrt3\mapsto\sqrt3$ passes the identical check
  consistently: $\sigma(2)=2=(-\sqrt2)(-\sqrt2)$.
- **Demonstration 2 (targets MC-2)**: for $K=\mathbb Q(\sqrt2,\sqrt3)/\mathbb Q$
  ($[\mathbb Q(\sqrt2,\sqrt3):\mathbb Q]=4$, from `algebraic-extension`'s own Tower Law
  computation), $\mathrm{Gal}(K/\mathbb Q)\cong\mathbb Z/2\times\mathbb Z/2$ (order 4). The
  trivial subgroup $\{\mathrm{id}\}$ (order 1) fixes $K$ itself (degree 4, the LARGEST field);
  the full group (order 4) fixes $\mathbb Q$ itself (degree 1, the SMALLEST field) — confirmed
  size-reversal, not size-matching.
- **Demonstration 3 (targets MC-3)**: every degree-5 polynomial has exactly 5 roots in
  $\mathbb C$, unconditionally. For a GENERAL quintic, the Galois group is the full symmetric
  group $S_5$, NOT solvable (unlike $S_2,S_3,S_4$, all solvable, exactly why the quadratic,
  cubic, quartic formulas exist) — Abel–Ruffini states no radical formula EXPRESSES those roots,
  never that they fail to exist or cannot be approximated numerically.

## Discovery Questions
1. "Does any bijective relabeling of an extension's generators (like swapping $\sqrt2$ and
   $\sqrt3$) automatically define a valid element of the Galois group?"
2. "Does a larger subgroup of $\mathrm{Gal}(K/F)$ correspond to a larger intermediate field?"
3. "Does Abel–Ruffini's theorem mean the general quintic's roots don't actually exist, or can't
   be computed at all?"

## Teaching Sequence
1. **Anchor**: connect to `math.abst.algebraic-extension`'s own $[\mathbb Q(\sqrt2,\sqrt3):
   \mathbb Q]=4$ computation and `math.abst.group-theory`'s own group-axiom verification,
   framing $\mathrm{Gal}(K/F)$ as their direct unification.
2. **Conflict evidence**: Demonstration 1's multiplicativity contradiction, isolating MC-1 by
   requiring genuine structure preservation, not plausible relabeling.
3. **Contrast pair**: Demonstration 2's full subgroup/subfield table, isolating MC-2 by exposing
   the inclusion-reversing direction directly.
4. **Representation shift**: Demonstration 3's roots-exist-vs-expressible distinction, isolating
   MC-3 by separating existence (guaranteed) from formula-expressibility (not always possible).
5. **Mastery gate**: require a correct multiplicativity verification for a candidate automorphism,
   a correct subgroup-subfield correspondence identification, and a correct distinction between
   "no radical formula" and "no roots," at the Blueprint's own stated MAMR of 4/5 (⌈0.65×5⌉).

## Tutor Actions
- Never accept a candidate automorphism without an explicit multiplicativity check on a genuine
  algebraic relation.
- Never accept "bigger subgroup means bigger field" — require the inclusion-reversing direction
  stated explicitly.

## Voice Teaching Notes
- Say "does that map actually preserve multiplication, or does it just look like a sensible
  relabeling?" whenever a candidate Galois-group element is proposed.
- When the correspondence is discussed, ask "does bigger mean bigger here, or does it flip?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly verifies whether a candidate map is a genuine
  $F$-automorphism, checking multiplicativity explicitly.
- **Rung 2 (application)**: learner correctly identifies which subgroup of $\mathrm{Gal}(K/F)$
  corresponds to a given intermediate field, respecting the inclusion-reversing direction.
- **Rung 3 (transfer)**: learner correctly distinguishes existence from expressibility for a NEW
  polynomial's roots, and correctly explains that group SIZE alone does not determine
  solvability.

## Tutor Recovery Strategy
- If MC-1 recurs, re-test the specific candidate map against a genuine algebraic relation
  directly.
- If MC-2 recurs, re-walk the full subgroup/subfield table, confirming the reversal explicitly.
- If MC-3 recurs, re-anchor on the roots-exist-vs-expressible distinction directly.

## Memory Hooks
- "A Galois element must preserve multiplication, not just look like a sensible swap."
- "Bigger subgroup, smaller field — the correspondence always flips."
- "No formula does not mean no roots — Abel–Ruffini is about writability, not existence."

## Transfer Connections
- `math.abst.algebraic-extension` (already authored, this campaign, Batch 92): supplies the
  minimal-polynomial degree machinery and the $[\mathbb Q(\sqrt2,\sqrt3):\mathbb Q]=4$
  computation this concept's own richest concrete example directly reuses.
- `math.abst.group-theory` (already authored, this campaign): supplies the group-axiom
  verification this concept applies directly to $\mathrm{Gal}(K/F)$, and the solvable-group
  concept invoked at orientation level.
- `math.abst.galois-group` (not yet authored): the next concept in the chain, deepening the
  study of $\mathrm{Gal}(K/F)$ as an object in its own right.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.abst.galois-theory.md`, reused by
  reference for its $\sqrt2$/$\sqrt3$-swap multiplicativity contradiction, its full
  $\mathbb Q(\sqrt2,\sqrt3)$ subgroup/subfield correspondence table, its Abel–Ruffini
  orientation-level treatment, and its three-misconception registry (severity levels adopted
  directly as declared; birth types independently classified since this Blueprint states
  Description but not a formal Type label).
- Transfer probe cited by reference: the Blueprint's own independence-mode probe, examining a
  claim that every polynomial has a radical formula, the order-degree coincidence for Galois
  extensions specifically, and why group size alone does not determine solvability.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.abst.algebraic-extension`+`math.abst.group-theory`, unlocks `math.abst.galois-group`,
  cross_links none, research/analyze, mastery_threshold 0.65, estimated_hours 12) was directly
  verified against the live KG and matches exactly. The Blueprint's own correctly-declared
  independence P76 mode (cross_links empty in KG) required no correction.

## Version History
- 2026-09-14 (Batch 93): authored. Second entry this batch. Companion batch concepts:
  `math.abst.ufd`, `math.linalg.span`, `math.linalg.null-space`. `math.abst` moves 33/37 →
  **35/37** this batch (both math.abst concepts authored this batch).
