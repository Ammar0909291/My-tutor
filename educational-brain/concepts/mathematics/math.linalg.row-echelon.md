# math.linalg.row-echelon

## Identity
- **KG id**: `math.linalg.row-echelon`
- **Domain**: math.linalg
- **Requires**: `math.linalg.row-reduction`
- **Unlocks**: `math.linalg.rank`, `math.linalg.null-space`
- **Cross-links**: none
- **Difficulty**: proficient
- **Bloom level**: apply
- **Mastery threshold**: 0.9
- **Estimated hours**: 3

## Learning Objective
Convert a matrix already in row echelon form (REF, from `math.linalg.row-reduction`) into reduced
row echelon form (RREF) by clearing zeros ABOVE each pivot and scaling each pivot to exactly $1$;
state and use the fact that RREF is UNIQUE for a given matrix — unlike REF itself, which can differ
depending on the row-operation sequence chosen; and identify pivot columns (basic variables) versus
non-pivot columns (free variables), using this distinction to write a general solution in
parametric form when infinitely many solutions exist.

## Core Understanding
This concept extends `math.linalg.row-reduction`'s own REF result — which already achieves zeros
BELOW each pivot and back-substitution for a unique-solution system — in two ways: (1) pushing REF
one step further into REDUCED row echelon form (RREF), and (2) handling a case
`math.linalg.row-reduction`'s own examples never encountered: a system with MORE unknowns than
pivots, having infinitely many solutions.

REDUCED ROW ECHELON FORM additionally requires, beyond REF's zeros below each pivot: zeros ABOVE
each pivot too, and each pivot scaled to exactly $1$. Starting from REF, achieve this by working
from the BOTTOM pivot upward — scale each pivot row so its pivot is $1$, then use that row to
eliminate all entries above it in that column, mirroring the downward pass that produced REF.

While REF itself is NOT unique — different valid sequences of row operations can produce
differently-appearing REF matrices representing the same system — RREF is provably UNIQUE: no
matter which legal sequence of row operations is chosen, the same final RREF matrix always results.
This uniqueness is what makes RREF the standard reference form for reading off a system's solution
structure unambiguously.

In RREF, PIVOT COLUMNS correspond to BASIC VARIABLES — values uniquely DETERMINED by the system
(once free variables are assigned). Columns WITHOUT a pivot correspond to FREE VARIABLES, which can
take ANY value, with the basic variables then expressed in terms of them. When free variables
exist, the system has INFINITELY many solutions, written parametrically: each basic variable
expressed as a formula in the free variable(s).

## Mental Models
- **"RREF is REF plus a mirror-image cleanup: zeros above each pivot too, and every pivot scaled to
  exactly 1."**
- **"REF can look different depending on the path taken — RREF always looks the same, guaranteed."**
- **"A missing pivot means a free variable, not no solution — infinitely many solutions, expressed
  parametrically."**

## Why Students Fail

### MC-1: FREE-VARIABLE-COLUMN-CONFUSED-WITH-NO-SOLUTION
- **Surface form**: believes a non-pivot (free-variable) column signals the system has no
  solution, rather than correctly recognizing it as a sign of infinitely many solutions.
- **Birth type**: Type 1, overgeneralization (Blueprint's own declared FOUNDATIONAL severity). An
  "incomplete" pattern (a missing pivot) is naturally associated with something having gone wrong,
  and that intuition is overgeneralized to mean "no solution," when in fact a genuinely
  inconsistent system is signaled by a completely different pattern — a row like $[0\ 0\ 0\,|\,c]$
  with $c\ne0$.
- **Repair**: re-walk the parametric general solution directly, re-anchoring on "a missing pivot
  means a FREE variable — infinitely many solutions — completely different from an inconsistent
  row, which is what actually signals no solution."

### MC-2: RREF-ASSUMED-NON-UNIQUE-LIKE-REF
- **Surface form**: believes RREF, like ordinary REF, can differ depending on the specific
  row-operation sequence chosen, missing the guarantee that RREF is always unique.
- **Birth type**: Type 1, overgeneralization (Blueprint's own declared FOUNDATIONAL severity). REF's
  own genuine non-uniqueness (already established by `math.linalg.row-reduction`'s adjacent
  content) is overgeneralized to RREF, without recognizing that the ADDITIONAL reduction to a fully
  canonical form is exactly what eliminates that ambiguity.
- **Repair**: re-anchor on the uniqueness guarantee, contrasting explicitly with REF's own
  acknowledged non-uniqueness.

### MC-3: PIVOT-SCALING-TO-1-STEP-OMITTED
- **Surface form**: achieves zeros above and below each pivot but forgets to scale each pivot row
  so the pivot itself equals exactly $1$, producing an REF-like result that is not genuinely RREF.
- **Birth type**: Type 5, instruction-induced (Blueprint's own declared Moderate severity). The
  zero-clearing steps are visually dramatic and easy to focus on exclusively, while the
  scale-to-$1$ step is a single easy-to-omit arithmetic pass without an explicit checklist habit.
- **Repair**: re-walk the explicit scaling step, re-anchoring on "RREF requires BOTH zeros
  above/below AND pivots scaled to 1 — missing either one means it's not fully reduced yet."

## Misconceptions

### MC-1: FREE-VARIABLE-COLUMN-CONFUSED-WITH-NO-SOLUTION
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

### MC-2: RREF-ASSUMED-NON-UNIQUE-LIKE-REF
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

### MC-3: PIVOT-SCALING-TO-1-STEP-OMITTED
- **Surface form**: as described above.
- **Root cause (Type 5)**: as described above.
- **Repair**: as described above.

## Analogies
- **"A rough draft versus a final, polished manuscript: two writers might take different paths to
  a rough draft (REF), but if both fully polish it to the same publishing standard (RREF), the
  final results are identical, letter for letter."**
- **Anti-analogy**: a column with no pivot is NOT "the system broke" — it is a genuine, informative
  signal (a free variable) that the system has infinitely many solutions, not that something went
  wrong or that no solution exists.

## Demonstrations
- **Demonstration 1 (targets MC-3)**: continue `math.linalg.row-reduction`'s own REF result upward,
  scaling the bottom pivot to $1$ and eliminating above it, then repeating for each higher pivot,
  reaching RREF.
- **Demonstration 2 (targets MC-2)**: show that a different valid row-reduction path on the same
  system reaches the identical final RREF, despite differing intermediate steps.
- **Demonstration 3 (targets MC-1)**: row-reduce a system with more unknowns than pivots, identify
  the non-pivot column as a free variable, and write the general solution parametrically.

## Discovery Questions
1. "If a row-reduced system has a column with no pivot, does that mean the system has no
   solution?"
2. "Could two students, using different valid row-reduction paths, end up with genuinely different
   RREF results for the same system?"
3. "Is achieving zeros above and below every pivot enough to call a matrix fully reduced?"

## Teaching Sequence
1. **Anchor**: connect to `math.linalg.row-reduction`'s own REF result, framing RREF as one further
   pass — zeros above each pivot, plus scaling to $1$.
2. **Conflict evidence**: the free-variable-column parametric-solution demonstration, breaking MC-1
   directly.
3. **Contrast pair**: REF's non-uniqueness against RREF's guaranteed uniqueness, isolating MC-2.
4. **Mastery gate**: require a correct REF-to-RREF conversion, a correct pivot/free-variable
   identification with parametric general solution, and a transfer explanation of RREF's
   uniqueness value, at the Blueprint's own stated MAMR of 5/5.

## Tutor Actions
- Never accept an "RREF" result missing the pivot-scaled-to-1 step.
- When a non-pivot column appears, require the learner to state it signals a free variable, never
  no solution.

## Voice Teaching Notes
- Say "is every pivot scaled to exactly 1, not just zeroed above and below?" whenever RREF is
  claimed.
- When a column has no pivot, ask "what does that actually tell you about the system?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly converts a given REF matrix to RREF.
- **Rung 2 (application)**: learner correctly identifies pivot and non-pivot columns and writes a
  parametric general solution when free variables exist.
- **Rung 3 (transfer)**: learner correctly explains, in a novel context (e.g. an economics
  equilibrium system), why a missing pivot signals free variables rather than no solution, and why
  RREF's uniqueness makes it a reliable reference for checking correctness.

## Tutor Recovery Strategy
- If MC-1 recurs, re-derive the specific parametric general solution for the case in question.
- If MC-2 recurs, re-verify the specific RREF result against a differently-ordered valid
  row-reduction path.
- If MC-3 recurs, re-check the specific pivot-scaling step for the case in question.

## Memory Hooks
- "RREF: zeros above AND below, every pivot scaled to 1."
- "REF can differ; RREF never does."
- "No pivot in a column means free variable, not no solution."

## Transfer Connections
- `math.linalg.row-reduction` (already authored, this campaign): supplies the REF result and
  back-substitution procedure this concept extends into RREF and free-variable parametrization.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.linalg.row-echelon.md`, reused by reference
  for its REF-to-RREF conversion demonstration, its uniqueness-guarantee demonstration, its
  free-variable parametric-solution demonstration, and its three-misconception registry (birth
  types independently classified, since this Blueprint states severity but not birth type).
- Transfer probe cited by reference: the Blueprint's own independence-mode probe (an economics
  supply-and-demand equilibrium scenario, interpreting a missing pivot and writing the general
  parametric solution).

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires `row-reduction`,
  unlocks `rank`/`null-space`, cross_links none, proficient/apply, mastery_threshold 0.9,
  estimated_hours 3) was directly verified against the live KG and matches exactly.

## Version History
- 2026-09-13 (Batch 79): authored. Unblocked by `math.linalg.row-reduction` (Batch 78). Companion
  batch concept: `math.linalg.lu-factorization`. `math.linalg` moves toward **27/61** this batch.
  Unlocks `math.linalg.rank` and `math.linalg.null-space` directly.
