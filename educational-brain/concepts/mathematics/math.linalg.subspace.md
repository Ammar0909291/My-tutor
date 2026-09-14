# math.linalg.subspace

## Identity
- **KG id**: `math.linalg.subspace`
- **Domain**: math.linalg
- **Requires**: `math.linalg.vector-space`
- **Unlocks**: `math.linalg.null-space`, `math.linalg.column-space`
- **Cross-links**: none
- **Difficulty**: proficient
- **Bloom level**: understand
- **Mastery threshold**: 0.9
- **Estimated hours**: 3

## Learning Objective
Define a SUBSPACE as a subset of a vector space that is itself a vector space under the inherited
operations; apply the 3-CONDITION TEST fluently ($\mathbf0\in W$, closed under addition, closed
under scalar multiplication) and justify why the remaining vector-space axioms are automatically
INHERITED; classify the complete catalogue of subspaces of $\mathbb R^2$ and $\mathbb R^3$
geometrically; recognize standard non-subspaces (sets missing $\mathbf0$, sets not closed); and
distinguish HOMOGENEOUS linear conditions (which always give subspaces) from NON-HOMOGENEOUS ones
(which never do).

## Core Understanding
A SUBSPACE $W$ of a vector space $V$ over field $F$ is a subset that is ITSELF a vector space
under the INHERITED addition and scalar multiplication. The 3-CONDITION TEST determines
membership: (1) $\mathbf0\in W$; (2) $u,v\in W\Rightarrow u+v\in W$ (closed under addition); (3)
$u\in W$, $k\in F\Rightarrow k\cdot u\in W$ (closed under scalar multiplication). WHY THE OTHER
AXIOMS COME FREE: `math.linalg.vector-space`'s own axioms A1, A2, S1-S4 are IDENTITIES holding
for ALL vectors of $V$ — they cannot fail on a subset. A3 (zero vector) is exactly condition 1.
A4 (additive inverse) follows from condition 3: for $u\in W$, taking $k=-1$ gives $-u=(-1)\cdot
u\in W$. So only CLOSURE and the ZERO VECTOR genuinely need checking.

THE VERIFICATION PROTOCOL: check condition 1 (zero vector) FIRST — it is a one-line computation
and disqualifies most non-subspaces instantly. A line like $y=2x+1$ in $\mathbb R^2$ LOOKS
closed-under-addition-friendly, but $(0,0)$ fails $0=2(0)+1$, disqualifying it immediately without
needing to test closure at all.

HOMOGENEOUS VS. NON-HOMOGENEOUS conditions decide subspace-hood sharply: solution sets of
HOMOGENEOUS linear systems ($A\mathbf x=\mathbf0$) are ALWAYS subspaces — this is the null space,
`math.linalg.subspace`'s own direct successor concept. A NONZERO CONSTANT anywhere in the defining
equation kills the zero check ($\{(x,y,z):x+y+z=1\}$ fails at the origin). NON-LINEAR conditions
can pass the zero check yet fail closure ($\{(x,y):y=x^2\}$ contains $\mathbf0$ but $(1,1)+(2,4)=
(3,5)$, and $5\ne9$) — the zero check is NECESSARY, not SUFFICIENT.

THE COMPLETE CATALOGUE for $\mathbb R^2$: $\{\mathbf0\}$; every line through the origin; $\mathbb
R^2$ itself. For $\mathbb R^3$: $\{\mathbf0\}$; every line through the origin; every plane through
the origin; $\mathbb R^3$ itself. Every subspace of $\mathbb R^n$ is "flat, unbounded, and through
the origin" — discs, quadrants, shifted lines, and curves are all excluded by the three conditions.

## Mental Models
- **"Check the zero vector FIRST — it's the cheapest test and disqualifies the most common
  non-subspaces (shifted, affine sets) in one line."**
- **"A subspace is 'operation-proof' — no addition, no scalar multiplication can take you outside
  it."**
- **"Homogeneous ($=0$) means candidate subspace; non-homogeneous ($=c\ne0$) means never a
  subspace — the constant term decides."**

## Why Students Fail

### MC-1: ANY-SUBSET-IS-SUBSPACE
- **Surface form**: treats an arbitrary subset (disc, quadrant, curve) as a subspace without
  testing closure, assuming geometric containment in $V$ is sufficient.
- **Birth type**: Type 1, overgeneralization (triggered by "visually nice" sets like the unit disc
  or the first quadrant — sitting inside $V$ is carried forward, unmodified, as sufficient
  condition, when it is only necessary).
- **Repair**: re-attempt the specific subset's closure check directly, finding a concrete escaping
  scalar multiple or sum.

### MC-2: ZERO-CHECK-OMITTED
- **Surface form**: verifies closure conditions but never checks $\mathbf0\in W$, accepting
  affine lines/planes (not through the origin) as subspaces.
- **Birth type**: Type 5, instruction-induced (the Blueprint's own declared FOUNDATIONAL
  misconception — the zero check is the single fastest and most decisive test, yet its omission
  is the most common verification error, since closure alone can LOOK satisfied on a shifted set
  before the zero check catches it).
- **Repair**: re-attempt the specific set's zero-vector check directly, as the FIRST test applied.

### MC-3: NONHOMOGENEOUS-AS-SUBSPACE
- **Surface form**: classifies solution sets of ANY linear equation as subspaces, missing that
  only homogeneous conditions ($=0$) give subspaces, conflating "defined by a linear equation"
  with "subspace."
- **Birth type**: Type 1, overgeneralization (the identical mechanism as MC-2, one level more
  abstract — a nonzero constant anywhere in the defining equation is the SAME zero-check failure,
  restated as a pattern-matching rule rather than a per-instance test).
- **Repair**: re-attempt the specific equation's zero check directly, confirming the constant term
  is exactly what disqualifies it.

## Misconceptions

### MC-1: ANY-SUBSET-IS-SUBSPACE
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

### MC-2: ZERO-CHECK-OMITTED
- **Surface form**: as described above.
- **Root cause (Type 5)**: as described above.
- **Repair**: as described above.

### MC-3: NONHOMOGENEOUS-AS-SUBSPACE
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

## Analogies
- **"A subspace is like a closed ecosystem — nothing you add or scale inside it can ever escape;
  a disc or a quadrant is more like an open enclosure with a gap in the fence."**
- **Anti-analogy**: being a SUBSET of a vector space, and even passing THROUGH the origin, is NOT
  enough — a disc contains the origin but still fails closure under scalar multiplication.

## Demonstrations
- **Demonstration 1 (targets MC-1, the gallery)**: six subsets of $\mathbb R^2$ tested — $\{
  \mathbf0\}$ (YES), the line $y=2x$ (YES), the line $y=2x+1$ (NO, fails zero check), the unit
  disc (NO, fails both addition and scalar closure), the first quadrant (NO, fails scalar closure
  under negative scalars), all of $\mathbb R^2$ (YES) — the survivors are exactly those satisfying
  all three conditions, with geometric containment alone (rows 4, 5) insufficient.
- **Demonstration 2 (targets MC-2, sharp contrast)**: $W_1=\{(x,2x)\}$ passes the zero check
  ($(0,0)=(0,2\cdot0)$); $W_2=\{(x,2x+1)\}$ fails it instantly ($0=2(0)+1$ is false) — same slope,
  same shape, but the shift by 1 moves the line off the origin, disqualifying $W_2$ in one line of
  arithmetic.
- **Demonstration 3 (targets MC-3, homogeneous vs. non-homogeneous)**: $\{(x,y,z):x+y+z=0\}$
  (homogeneous, zero check passes, subspace) against $\{(x,y,z):x+y+z=1\}$ (non-homogeneous, zero
  check fails, not a subspace); $\{(x,y):y=x^2\}$ passes the zero check yet fails closure — a
  reminder the zero check alone is necessary, not sufficient.
- **Demonstration 4 (the axes union, targets MC-1 in a new form)**: $W=\{(x,y):xy=0\}$ (the union
  of the two axes) passes the zero check and scalar closure, but $(1,0)+(0,1)=(1,1)$ has $1\cdot1
  =1\ne0$, failing addition closure — unions of subspaces almost never are subspaces themselves,
  even when each piece individually is.

## Discovery Questions
1. "Is every subset of a vector space, even one that sits neatly inside it, automatically a
   subspace?"
2. "If a set is closed under addition and scalar multiplication, is checking the zero vector still
   necessary?"
3. "Does defining a set by ANY linear equation guarantee it's a subspace?"

## Teaching Sequence
1. **Anchor**: connect to `math.linalg.vector-space`'s own 3-condition test preview and the
   inheritance argument for why the remaining axioms come free.
2. **Conflict evidence**: Demonstration 1's gallery, directly challenging MC-1 by showing the disc
   and quadrant both fail despite visual "niceness" and origin-containment.
3. **Contrast pair**: $y=2x$ against $y=2x+1$ (Demonstration 2), isolating MC-2 directly via the
   sharpest possible shift; the homogeneous $x+y+z=0$ against the non-homogeneous $x+y+z=1$
   (Demonstration 3), isolating MC-3.
4. **Mastery gate**: require a correct application of the 3-condition test (zero check FIRST) to a
   specific subset, a correct classification of homogeneous vs. non-homogeneous conditions, and a
   correct application of the test to a NEW vector space (a space of continuous functions), at the
   Blueprint's own stated MAMR of 5/5 (⌈0.9×5⌉).

## Tutor Actions
- Never accept a subspace verification that skips the zero-vector check — require it to be the
  FIRST test applied, before closure is even attempted.
- Never accept "it's defined by a linear equation, so it's a subspace" without checking whether the
  right-hand side is genuinely zero.

## Voice Teaching Notes
- Say "did you check the zero vector FIRST?" whenever a subspace verification appears to start
  with closure instead.
- When a linear-equation-defined set is classified, ask "is the right-hand side exactly zero, or
  some nonzero constant?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly applies the 3-condition test, in the correct order
  (zero check first), to a specific candidate subset.
- **Rung 2 (application)**: learner correctly classifies a set of homogeneous vs. non-homogeneous
  linear conditions using only the zero check.
- **Rung 3 (transfer)**: learner correctly applies the subspace test to a NEW vector space with no
  geometric picture (e.g. continuous functions on $[0,1]$), correctly identifying which of the
  three conditions fails for each non-example.

## Tutor Recovery Strategy
- If MC-1 recurs, re-attempt the specific subset's closure check directly, finding a concrete
  escaping element.
- If MC-2 recurs, re-attempt the specific set's zero-vector check directly, as the first test.
- If MC-3 recurs, re-attempt the specific equation's zero check directly.

## Memory Hooks
- "Zero check FIRST, every time — it's the cheapest, most decisive test."
- "Operation-proof — nothing you add or scale can escape a genuine subspace."
- "Homogeneous ($=0$) is a candidate; non-homogeneous ($=c\ne0$) is never a subspace."

## Transfer Connections
- `math.linalg.vector-space` (already authored, this campaign, Batch 89): supplies the 8 vector
  space axioms, the zero vector, and the 3-condition-test preview this concept directly deepens
  into fluent classification.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.linalg.subspace.md`, reused by reference
  for its six-subset gallery, its $y=2x$ vs. $y=2x+1$ contrast, its homogeneous vs. non-homogeneous
  contrast, its complete $\mathbb R^2$/$\mathbb R^3$ subspace catalogue, and its three-misconception
  registry (birth types independently classified, since this Blueprint states Description/Trigger
  but not a formal Type label — MC-2 stated as this Blueprint's own declared foundational
  misconception).
- Transfer probe cited by reference: the Blueprint's own independence-mode probe, applying the
  3-condition test to $V=C([0,1])$ (continuous functions), classifying $W_1=\{f:f(0)=f(1)\}$
  (homogeneous linear, subspace), $W_2=\{f:f(0)=1\}$ (nonzero constant, fails zero check), and
  $W_3=\{f:f(x)\ge0\text{ for all }x\}$ (inequality, fails scalar closure under negative scalars).

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires `math.linalg.
  vector-space`, unlocks `math.linalg.null-space`+`math.linalg.column-space`, cross_links none,
  proficient/understand, mastery_threshold 0.9, estimated_hours 3) was directly verified against
  the live KG and matches exactly. The Blueprint's own correctly-declared independence P76 mode
  (cross_links empty in KG) required no correction.

## Version History
- 2026-09-14 (Batch 90): authored. Fourth entry this batch. Companion batch concepts: `math.abst.
  cyclic-group`, `math.abst.symmetric-group`, `math.abst.second-isomorphism-theorem`. `math.linalg`
  moves from 29/61 toward **30/61** this batch.
