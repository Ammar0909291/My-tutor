# math.cx.riemann-mapping

## Identity
- **KG id**: `math.cx.riemann-mapping`
- **Domain**: math.cx
- **Requires**: `math.cx.conformal-mapping`
- **Unlocks**: none
- **Cross-links**: none
- **Difficulty**: research
- **Bloom level**: analyze
- **Mastery threshold**: 0.65
- **Estimated hours**: 8

## Learning Objective
Recognize the theorem's hypotheses (simply connected AND proper) as GENUINE RESTRICTIONS — NEVER
assuming it applies to every open subset; recognize uniqueness requires exactly THREE REAL
NORMALIZING CONDITIONS — NEVER assuming the guaranteed biholomorphism is automatically unique;
and recognize both hypotheses as LOAD-BEARING — NEVER minor technical fine print.

## Core Understanding
THE HYPOTHESES ARE GENUINE RESTRICTIONS — NEVER SATISFIED BY EVERY OPEN SUBSET: checking four
candidates: the open unit square (simply connected AND proper — theorem APPLIES); the upper
half-plane (simply connected AND proper — theorem APPLIES); $\mathbb{C}$ itself (NOT proper —
theorem does NOT apply); an annulus $\{1<|z|<2\}$ (NOT simply connected, has a hole — theorem does
NOT apply). Believing the Riemann Mapping Theorem applies to EVERY open subset of $\mathbb{C}$ is
WRONG — both the simply-connected and proper-subset hypotheses are genuine restrictions, and two
of the four candidates genuinely fail them.

UNIQUENESS REQUIRES EXACTLY THREE REAL NORMALIZING CONDITIONS — NEVER AUTOMATIC: for
$\Omega=$ the upper half-plane with SOME biholomorphism $f_0(z)=(z-i)/(z+i)$: composing with ANY
of the 3-real-parameter family of disc automorphisms $\phi_a(w)=e^{i\theta}(w-a)/(1-\bar aw)$
gives infinitely many OTHER valid biholomorphisms. Only after imposing exactly 3 real conditions
(fixing $z_0=i\mapsto0$: 2 real conditions; fixing $f'(i)$'s argument positive: 1 more) is the map
pinned down UNIQUELY. Believing the biholomorphism guaranteed by the theorem is automatically
unique is WRONG — a genuine 3-real-parameter family of valid maps exists prior to normalization;
exactly 3 real conditions must be spent to pin down one specific map.

BOTH HYPOTHESES ARE LOAD-BEARING — NEVER MINOR TECHNICAL FINE PRINT: for $\Omega=\mathbb{C}$
(proper-subset hypothesis dropped): any holomorphic $f:\mathbb{C}\to\mathbb{D}$ is bounded, and
Liouville's theorem forces any bounded ENTIRE function to be CONSTANT — a constant function can
never be a bijection, so NO such biholomorphism can exist. For $\Omega=\{1<|z|<2\}$ (simply-
connected hypothesis dropped): a loop encircling the inner boundary cannot be continuously shrunk
to a point WITHIN the annulus — a genuine topological obstruction $\mathbb{D}$ does not share.
Believing the theorem's hypotheses are minor technical fine print rather than genuinely necessary
conditions is WRONG — dropping either one makes the conclusion demonstrably FALSE, via a concrete,
fully-reasoned counterexample in each case.

## Mental Models
- **"The theorem's scope is enormous but not unlimited — check both boxes, simply connected AND
  proper, before assuming it applies."**
- **"'Unique up to a Möbius transformation of the disc' means a whole 3-real-parameter family
  exists until you spend exactly 3 real conditions to pin one map down."**
- **"Both hypotheses have a concrete counterexample proving they're load-bearing — Liouville kills
  ℂ, topology kills the annulus."**

## Why Students Fail

### MC-1: THEOREM-HYPOTHESES-ASSUMED-UNRESTRICTIVE
- **Surface form**: believes the Riemann Mapping Theorem applies to every open subset of
  $\mathbb{C}$, missing that simple-connectedness and being a proper subset are genuine, necessary
  restrictions.
- **Birth type**: foundational (Blueprint's own declared severity — the theorem's astonishing
  scope, "essentially any simply connected proper domain," is easy to round up to "any domain at
  all").
- **Repair**: re-walk the four-way domain classification.

### MC-2: RIEMANN-MAP-ASSUMED-AUTOMATICALLY-UNIQUE
- **Surface form**: believes the guaranteed biholomorphism is automatically unique, missing the
  genuine 3-real-parameter family of valid maps prior to normalization.
- **Birth type**: high severity (Blueprint's own declared severity — an "existence theorem" often
  implicitly suggests a single canonical object, obscuring the family of equally valid maps).
- **Repair**: re-walk the disc-automorphism-family and normalizing-conditions computation.

### MC-3: THEOREM-HYPOTHESES-ASSUMED-TECHNICAL
- **Surface form**: believes the theorem's hypotheses are minor technical fine print rather than
  genuinely load-bearing conditions.
- **Birth type**: moderate severity (Blueprint's own declared severity — hypothesis lists at the
  start of a theorem statement are often skimmed as boilerplate).
- **Repair**: re-walk the two concrete, fully-reasoned counterexamples.

## Misconceptions

### MC-1: THEOREM-HYPOTHESES-ASSUMED-UNRESTRICTIVE
- **Surface form**: as described above.
- **Root cause (foundational)**: as described above.
- **Repair**: as described above.

### MC-2: RIEMANN-MAP-ASSUMED-AUTOMATICALLY-UNIQUE
- **Surface form**: as described above.
- **Root cause (high severity)**: as described above.
- **Repair**: as described above.

### MC-3: THEOREM-HYPOTHESES-ASSUMED-TECHNICAL
- **Surface form**: as described above.
- **Root cause (moderate severity)**: as described above.
- **Repair**: as described above.

## Analogies
- **"The Riemann Mapping Theorem is like a universal adapter that fits an enormous range of plug
  shapes (simply connected proper domains) but genuinely won't fit two specific shapes (all of ℂ,
  or anything with a hole) — no matter how much you might want it to."**
- **Anti-analogy**: "unique up to a Möbius transformation" isn't a throwaway qualifier — it's the
  difference between one map and an entire 3-parameter family, until normalization spends exactly
  those 3 degrees of freedom.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the four-way domain classification (square, half-plane, ℂ,
  annulus).
- **Demonstration 2 (targets MC-2)**: the disc-automorphism-family-to-unique-map normalization
  computation.
- **Demonstration 3 (targets MC-3)**: the Liouville-based and topological-obstruction
  counterexamples.

## Discovery Questions
1. "Does the Riemann Mapping Theorem apply to every open subset of ℂ, or only to a specific
   restricted class?"
2. "Once the theorem guarantees a biholomorphism to the disc exists, is that map automatically
   unique?"
3. "Are the theorem's 'simply connected' and 'proper subset' hypotheses minor technical fine
   print, or genuinely necessary conditions?"

## Teaching Sequence
1. **Representation shift**: work the four-way domain classification, isolating MC-1.
2. **Conflict evidence**: work the disc-automorphism-family normalization computation, isolating
   MC-2.
3. **Contrast pair**: work the two load-bearing-hypothesis counterexamples, isolating MC-3.
4. **Mastery gate**: require a correct hypothesis check for a given domain, a correct explanation
   of why the biholomorphism isn't automatically unique, a correct statement of the standard
   normalization and its degree-of-freedom count, and a correct Liouville-based explanation for why
   the theorem excludes $\mathbb{C}$, at the Blueprint's own stated MAMR of 4/5.

## Tutor Actions
- Never accept the theorem applied to a domain without checking both hypotheses explicitly.
- Never accept a Riemann map treated as automatically unique without normalizing conditions.
- Never accept the theorem's hypotheses dismissed as minor technicalities.

## Voice Teaching Notes
- Say "is that domain actually simply connected AND proper?" whenever the theorem is about to be
  invoked.
- Ask "how many degrees of freedom are left before normalization?" whenever uniqueness of a
  Riemann map is discussed.

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly classifies whether a given domain satisfies both of
  the theorem's hypotheses.
- **Rung 2 (application)**: learner correctly states the standard 3-condition normalization
  pinning down a unique Riemann map.
- **Rung 3 (transfer)**: learner correctly explains why a numerical PDE-solving strategy based on
  conformal mapping to the disc applies to essentially any simply connected physical region, and
  why it cannot be directly applied to an annular (washer-shaped) domain.

## Tutor Recovery Strategy
- If MC-1 recurs, re-walk the four-way domain classification.
- If MC-2 recurs, re-walk the disc-automorphism-family normalization.
- If MC-3 recurs, re-walk the two load-bearing counterexamples.

## Memory Hooks
- "Simply connected AND proper — both boxes must be checked, never assumed."
- "A 3-real-parameter family exists until normalization spends exactly those 3 conditions."
- "Liouville kills ℂ, topology kills the annulus — both hypotheses are genuinely load-bearing."

## Transfer Connections
- `math.cx.conformal-mapping` (prerequisite, already authored, this campaign): supplies the
  biholomorphic/conformal-map notion this theorem's existence claim is stated in terms of
  directly.

## Cross-Subject Connections
- Numerical PDE methods: solving a boundary-value problem on an irregularly shaped simply
  connected physical region by first conformally mapping it to the unit disc directly applies
  this theorem's existence guarantee and its normalization-based uniqueness.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.cx.riemann-mapping.md`, reused by reference
  for its three worked examples and its three-misconception registry (birth types adopted directly
  as declared).
- Transfer probe: the Blueprint's own independence-mode probe on a numerical-methods researcher's
  PDE-solving software and a washer-shaped (annular) domain's inapplicability.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.cx.conformal-mapping`, unlocks none, cross_links none, research/analyze, mastery_threshold
  0.65, estimated_hours 8) was directly verified against the live KG and matches exactly.

## Version History
- 2026-09-20 (Batch 250): authored. Second entry this batch. Companion batch concept:
  `math.cx.mobius-transformation`.
