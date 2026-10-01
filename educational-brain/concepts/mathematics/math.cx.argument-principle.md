# math.cx.argument-principle

## Identity
- **KG id**: `math.cx.argument-principle`
- **Domain**: math.cx
- **Requires**: `math.cx.residue-theorem`
- **Unlocks**: `math.cx.rouche-theorem`
- **Cross-links**: none
- **Difficulty**: expert
- **Bloom level**: apply
- **Mastery threshold**: 0.8
- **Estimated hours**: 5

## Learning Objective
Derive the Argument Principle as a DIRECT application of the Residue Theorem to $f'/f$ — NEVER an
independently-proven theorem; count zeros/poles WITH MULTIPLICITY — NEVER by distinct location
count; and recognize $Z-P$ as the geometric WINDING NUMBER of $f(z)$ around $0$ — NEVER a purely
abstract algebraic quantity.

## Core Understanding
THE ARGUMENT PRINCIPLE IS DIRECTLY DERIVED FROM THE RESIDUE THEOREM — NEVER AN INDEPENDENT PROOF:
for a zero of order $m$ at $z_0$ ($f(z)=(z-z_0)^mg(z)$, $g(z_0)\neq0$): $f'(z)/f(z)=
m/(z-z_0)+g'(z)/g(z)$ — a SIMPLE POLE at $z_0$ with residue EXACTLY $m$ (the second term is
holomorphic there, contributing nothing). Applying the already-mastered Residue Theorem to $f'/f$
over $C$ sums these residues DIRECTLY: $\frac1{2\pi i}\oint_Cf'/f\,dz=Z-P$. Believing the Argument
Principle is proven by an argument independent of the Residue Theorem is WRONG — it is derived by
applying that theorem to the specific function $f'/f$, nothing more.

$Z$ AND $P$ COUNT WITH MULTIPLICITY — NEVER BY DISTINCT LOCATION: for $f(z)=z^3(z-2)^2$ (no
poles), $C:|z|=3$ (enclosing $z=0$, a zero of order 3, and $z=2$, a zero of order 2): $Z=3+2=5$ —
NOT $2$ (the count of distinct zero locations). The formula correctly gives $Z-P=5-0=5$. Believing
$Z$ counts the number of distinct zero locations rather than summing multiplicities is WRONG — a
triple zero contributes $3$, not $1$; multiplicities must be summed, never merely tallied by
location.

$Z-P$ IS THE GEOMETRIC WINDING NUMBER — NEVER A PURELY ABSTRACT ALGEBRAIC COUNT: for $f(z)=z$ on
$C:|z|=1$: $f(z)=e^{i\theta}$ traces the unit circle around the origin EXACTLY ONCE — winding
number $1$, matching $Z-P=1-0=1$ (one simple zero, no poles). For $f(z)=z^2$: $f(z)=e^{2i\theta}$
winds TWICE — winding number $2$, matching $Z-P=2-0=2$ (one zero of order 2). Believing $Z-P$ is a
purely abstract algebraic count with no geometric meaning is WRONG — it IS the number of times
$f(z)$ winds around the origin as $z$ traverses $C$, a genuinely visualizable geometric quantity,
confirmed exactly in both cases.

## Mental Models
- **"The Argument Principle isn't a new fact to memorize — it's the Residue Theorem applied to one
  cleverly chosen function, f′/f, whose residues come directly from f's own zeros and poles."**
- **"Z and P sum multiplicities, never just count distinct points — a triple zero counts as 3."**
- **"Z−P isn't abstract bookkeeping — it's literally how many times f(z) winds around the origin,
  visualizable by watching the traced curve."**

## Why Students Fail

### MC-1: ARGUMENT-PRINCIPLE-AS-INDEPENDENT-THEOREM
- **Surface form**: believes the Argument Principle is proven by an argument independent of the
  Residue Theorem, missing that it is directly derived by applying the Residue Theorem to $f'/f$.
- **Birth type**: foundational (Blueprint's own declared severity — a named "principle" with its
  own formula looks like a self-contained new theorem rather than a specific application).
- **Repair**: re-walk the full residue derivation at a zero of order $m$.

### MC-2: ZEROS-POLES-COUNTED-BY-LOCATION-NOT-MULTIPLICITY
- **Surface form**: believes $Z$ and $P$ count the number of distinct zero/pole locations, missing
  that they count with multiplicity.
- **Birth type**: foundational (Blueprint's own declared severity — "counting zeros" intuitively
  suggests counting distinct points rather than summing orders).
- **Repair**: re-walk the $z^3(z-2)^2$ multiplicity-summed count giving $5$, not $2$.

### MC-3: Z-MINUS-P-TREATED-AS-PURELY-ABSTRACT
- **Surface form**: believes $Z-P$ is a purely abstract algebraic count with no geometric meaning,
  missing that it directly equals the winding number of $f(z)$ around $0$.
- **Birth type**: overgeneralization (Blueprint's own declared moderate severity — the formula's
  algebraic derivation obscures its independently verifiable geometric meaning).
- **Repair**: re-walk the $z$-versus-$z^2$ winding-number verification.

## Misconceptions

### MC-1: ARGUMENT-PRINCIPLE-AS-INDEPENDENT-THEOREM
- **Surface form**: as described above.
- **Root cause (foundational)**: as described above.
- **Repair**: as described above.

### MC-2: ZEROS-POLES-COUNTED-BY-LOCATION-NOT-MULTIPLICITY
- **Surface form**: as described above.
- **Root cause (foundational)**: as described above.
- **Repair**: as described above.

### MC-3: Z-MINUS-P-TREATED-AS-PURELY-ABSTRACT
- **Surface form**: as described above.
- **Root cause (overgeneralization)**: as described above.
- **Repair**: as described above.

## Analogies
- **"f′/f is like a magnifying glass that turns every zero and pole of f into a simple pole whose
  residue directly reads off the multiplicity or order — the Residue Theorem does the rest."**
- **Anti-analogy**: Z−P isn't a coincidental algebraic match to the winding number — it's the same
  fact viewed two ways, provably identical in every case, not just the simple examples checked.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the residue-at-a-zero-of-order-$m$ derivation.
- **Demonstration 2 (targets MC-2)**: the $z^3(z-2)^2$ multiplicity-summed zero count.
- **Demonstration 3 (targets MC-3)**: the $z$-versus-$z^2$ winding-number-matches-$Z-P$
  verification.

## Discovery Questions
1. "Is the Argument Principle an independent theorem, proven by an argument separate from the
   Residue Theorem?"
2. "Does Z in the Argument Principle count the number of distinct zero locations, or does it sum
   multiplicities?"
3. "Is Z−P a purely abstract algebraic count with no geometric meaning, or does it have a
   visualizable interpretation?"

## Teaching Sequence
1. **Representation shift**: work the residue-at-a-zero derivation, isolating MC-1.
2. **Conflict evidence**: work the multiplicity-summed count for $z^3(z-2)^2$, isolating MC-2.
3. **Contrast pair**: work the $z$-versus-$z^2$ winding-number verification, isolating MC-3.
4. **Mastery gate**: require a correct residue derivation at a pole of order $k$, a correct
   multiplicity-summed zero/pole count for a given function and contour, a correct explanation of
   why location-counting undercounts, and a correct winding-number verification, at the
   Blueprint's own stated MAMR of 4/5.

## Tutor Actions
- Never accept the Argument Principle presented as independent of the Residue Theorem.
- Never accept $Z$ or $P$ computed by counting distinct locations instead of summing multiplicity.
- Never accept $Z-P$ described as having no geometric meaning.

## Voice Teaching Notes
- Say "where does that formula actually come from?" whenever the Argument Principle is stated.
- Ask "did you count locations, or did you sum the multiplicities?" whenever $Z$ or $P$ is
  computed.

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly derives $f'/f$'s residue at a zero of given order.
- **Rung 2 (application)**: learner correctly computes $Z-P$ for a function with multiple zeros of
  different multiplicities.
- **Rung 3 (transfer)**: learner correctly explains why a control-systems engineer's
  Argument-Principle-based zero count is trustworthy without re-deriving stability theory, and
  identifies a multiplicity-counting error in a hypothetical analysis.

## Tutor Recovery Strategy
- If MC-1 recurs, re-walk the residue-at-a-zero derivation.
- If MC-2 recurs, re-walk the multiplicity-summed count.
- If MC-3 recurs, re-walk the winding-number verification.

## Memory Hooks
- "The Argument Principle is the Residue Theorem applied to f′/f — never a separate proof."
- "Z and P sum multiplicities — never just count distinct locations."
- "Z−P is literally the winding number — never purely abstract."

## Transfer Connections
- `math.cx.residue-theorem` (prerequisite, already authored, this campaign): supplies the
  summation-over-enclosed-poles machinery this concept's formula is a direct application of.

## Cross-Subject Connections
- Control theory: counting a transfer function's zeros inside the unit circle via the Argument
  Principle is a standard stability-analysis technique that directly applies this concept's
  multiplicity-counting discipline.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.cx.argument-principle.md`, reused by
  reference for its three worked examples and its three-misconception registry (birth types
  adopted directly as declared).
- Transfer probe: the Blueprint's own independence-mode probe on a control-systems engineer's
  zero-counting stability analysis and a winding-number visual-pattern question.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.cx.residue-theorem`, unlocks `math.cx.rouche-theorem`, cross_links none, expert/apply,
  mastery_threshold 0.8, estimated_hours 5) was directly verified against the live KG and matches
  exactly.

## Version History
- 2026-09-20 (Batch 247): authored. First entry this batch. Companion batch concept:
  `math.cx.maximum-modulus`.
