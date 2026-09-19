# math.linalg.basis

## Identity
- **KG id**: `math.linalg.basis`
- **Domain**: math.linalg
- **Requires**: `math.linalg.linear-independence`, `math.linalg.span`
- **Unlocks**: `math.linalg.dimension`, `math.linalg.coordinates`
- **Cross-links**: none
- **Difficulty**: proficient
- **Bloom level**: understand
- **Mastery threshold**: 0.9
- **Estimated hours**: 4

## Learning Objective
Verify a candidate set is a basis by checking BOTH requirements simultaneously — spans the space
AND is linearly independent (never accepting either condition alone as sufficient); recognize a
vector space has INFINITELY MANY valid bases, never a single unique "the" basis; and correctly
compute a vector's coordinates relative to a GIVEN basis, recognizing the SAME vector has
DIFFERENT coordinates in different bases (never assuming coordinates are basis-independent).

## Core Understanding
A BASIS REQUIRES BOTH CONDITIONS SIMULTANEOUSLY — NEVER JUST ONE: for $\{(1,0),(0,1),(1,1)\}$ in
$\mathbb R^2$: this SPANS $\mathbb R^2$ (already reachable using just the first two vectors), but
$(1,1)=1\cdot(1,0)+1\cdot(0,1)$ is a nontrivial dependency — NOT independent. This set FAILS to be
a basis despite spanning perfectly well, because a basis requires BOTH spanning AND independence —
checking only spanning (the more visually "obvious" condition) and stopping is never sufficient. A
genuine basis hides within this set (drop the redundant third vector), but the full 3-element set
itself is not one.

A VECTOR SPACE HAS INFINITELY MANY VALID BASES — NEVER A SINGLE UNIQUE ONE: beyond the standard
basis $\{(1,0),(0,1)\}$ for $\mathbb R^2$, the set $\{(1,1),(1,-1)\}$ ALSO satisfies both
conditions (spans: solving $c_1(1,1)+c_2(1,-1)=(a,b)$ always has $c_1=(a+b)/2$, $c_2=(a-b)/2$;
independent: setting $(a,b)=(0,0)$ forces $c_1=c_2=0$) — a GENUINELY DIFFERENT, equally valid
basis. So is $\{(3,1),(1,2)\}$. There is NO limit to how many valid bases a space can have; "the
standard basis" is one convenient, commonly-used choice among infinitely many, never the ONLY one.

COORDINATES ARE ALWAYS RELATIVE TO A SPECIFIED BASIS — NEVER AN ABSOLUTE PROPERTY OF THE VECTOR
ALONE: for $v=(5,3)$: in the STANDARD basis, coordinates are simply $(5,3)$. In the basis
$\{(1,1),(1,-1)\}$: using $c_1=(a+b)/2=4$, $c_2=(a-b)/2=1$ — coordinates are $(4,1)$ in THIS basis.
The SAME geometric vector $v=(5,3)$ has coordinates $(5,3)$ in one basis and $(4,1)$ in another —
coordinates NEVER belong to the vector alone; they depend entirely on WHICH basis describes it.

## Mental Models
- **"A basis needs BOTH properties at once — spanning and independence — checking only one, even
  if it feels sufficient, never establishes a basis."**
- **"A vector space has infinitely many valid bases — the standard basis is just one convenient
  choice among many, never the only correct answer."**
- **"Coordinates belong to the pairing of a vector WITH a chosen basis — never to the vector
  alone."**

## Why Students Fail

### MC-1: SPANNING-SET-IS-AUTOMATICALLY-A-BASIS
- **Surface form**: verifies only ONE of the two basis requirements (spanning OR independence) and
  declares a basis, without checking both.
- **Birth type**: Foundational (Blueprint's own declared root misconception — "basis" is defined
  by a CONJUNCTION of two properties, and the natural tendency under time pressure is to check the
  more visually obvious one and stop).
- **Repair**: re-walk the $\{(1,0),(0,1),(1,1)\}$ spanning-but-dependent counterexample.

### MC-2: ONLY-ONE-BASIS-EXISTS
- **Surface form**: believes a vector space has a single, unique basis, typically conflating "the
  standard basis" with "the only basis."
- **Birth type**: a direct consequence of correctly resolving MC-1 (Blueprint's own declared
  sequencing — once a student accepts multiple sets can each satisfy both conditions, the next
  question is how many such bases exist).
- **Repair**: re-walk the $\{(3,1),(1,2)\}$ third-distinct-basis verification.

### MC-3: COORDINATES-ARE-BASIS-INDEPENDENT
- **Surface form**: assumes a vector's coordinates are fixed regardless of which basis is used.
- **Birth type**: a further consequence of resolving MC-1/MC-2 (Blueprint's own declared
  sequencing — once basis multiplicity is established, whether different bases describe vectors
  the same way is the natural next question).
- **Repair**: re-walk the $v=(5,3)$ coordinate computation in two different bases, confirming
  $(5,3)$ versus $(4,1)$.

## Misconceptions

### MC-1: SPANNING-SET-IS-AUTOMATICALLY-A-BASIS
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

### MC-2: ONLY-ONE-BASIS-EXISTS
- **Surface form**: as described above.
- **Root cause**: as described above.
- **Repair**: as described above.

### MC-3: COORDINATES-ARE-BASIS-INDEPENDENT
- **Surface form**: as described above.
- **Root cause**: as described above.
- **Repair**: as described above.

## Analogies
- **"Two different grids can both fully cover the same plane — neither is 'more correct,' both are
  valid bases, just like two different rulers can both measure the same distance."**
- **Anti-analogy**: a vector's coordinates are NOT a fixed label stamped on it — they're more like
  an address, which depends entirely on which map (basis) you're using to describe location.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the $\{(1,0),(0,1),(1,1)\}$ spanning-but-dependent
  counterexample, isolating the redundant vector.
- **Demonstration 2 (targets MC-2)**: three distinct valid bases for $\mathbb R^2$ — standard,
  $\{(1,1),(1,-1)\}$, and $\{(3,1),(1,2)\}$ — each independently verified.
- **Demonstration 3 (targets MC-3)**: $v=(5,3)$'s coordinates computed in the standard basis
  versus $\{(1,1),(1,-1)\}$, confirmed to differ.

## Discovery Questions
1. "Does a set that spans a vector space automatically qualify as a basis, or is there a second
   condition to check?"
2. "Does a vector space have exactly one basis, or can many different sets all be valid bases for
   the same space?"
3. "Do a vector's coordinates stay the same no matter which basis you use, or do they depend on
   which basis is chosen?"

## Teaching Sequence
1. **Representation shift**: verifying both conditions explicitly on two candidate bases for
   $\mathbb R^2$, plus the uniqueness-of-representation theorem.
2. **Contrast pair**: the spanning-but-dependent counterexample (MC-1), a third distinct valid
   basis (MC-2), and the basis-dependence of coordinates (MC-3), working all three demonstrations.
3. **Mastery gate**: require a correct both-conditions verification on an unfamiliar candidate set,
   production of a fresh valid basis distinct from any example shown, and a correct coordinate
   computation under a new basis, at the Blueprint's own stated MAMR of 5/5.

## Tutor Actions
- Never accept a set declared a basis after checking only spanning or only independence.
- Never accept a claim that a vector space has a single, unique basis.
- Never accept a vector's coordinates reused across different bases without recomputation.

## Voice Teaching Notes
- Say "have you checked BOTH conditions, or just one?" whenever a candidate basis is verified.
- Ask "is this basis-relative, or does it belong to the vector alone?" whenever coordinates are
  computed.

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly identifies that a spanning-but-dependent set is not
  a basis.
- **Rung 2 (application)**: learner correctly produces a fresh valid basis distinct from any
  previously shown example, verifying both conditions.
- **Rung 3 (transfer)**: learner correctly explains why a non-standard basis (e.g. an
  average/difference basis) can reveal practically useful structure invisible in the standard
  basis's coordinates.

## Tutor Recovery Strategy
- If MC-1 recurs, re-walk the spanning-but-dependent counterexample.
- If MC-2 recurs, re-walk a fresh distinct valid basis's verification.
- If MC-3 recurs, re-walk the two-basis coordinate comparison for the same vector.

## Memory Hooks
- "Spanning is only half the test — independence is the other half, always check both."
- "There is no 'the' basis — only 'a' basis, one choice among infinitely many."
- "Coordinates belong to the vector-basis pairing, never to the vector alone."

## Transfer Connections
- `math.linalg.linear-independence` (already authored, certified domain): supplies one of the two
  basis requirements this concept directly builds on.
- `math.linalg.span` (already authored, certified domain): supplies the other basis requirement.
- `math.linalg.dimension`, `math.linalg.coordinates` (not yet authored, KG's declared unlocks): the
  well-defined vector-count and full coordinate-vector machinery this concept directly enables.

## Cross-Subject Connections
- Signal/image processing: choosing a non-standard basis (e.g. an average/difference or
  frequency-domain basis) to reveal structure invisible in the standard coordinate representation,
  a direct precursor to transform-based compression (e.g. JPEG).

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.linalg.basis.md`, reused by reference for its
  standard-versus-alternative-basis worked verification, its spanning-but-dependent counterexample,
  its multiple-distinct-bases demonstration, and its three-misconception registry (the Blueprint's
  own declared MC-1-as-root-cause sequencing preserved directly).
- Transfer probe: the Blueprint's own independence-mode probe, applying an average/difference
  basis to image-compression patch data, revealing near-uniform structure invisible in the
  standard basis.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.linalg.linear-independence`/`math.linalg.span`, unlocks `math.linalg.dimension`/
  `math.linalg.coordinates`, cross_links none, proficient/understand, mastery_threshold 0.9,
  estimated_hours 4) was directly verified against the live KG and matches exactly. This is the
  campaign's first `math.linalg` concept authored, diversifying away from the now-exhausted
  `math.de` frontier.

## Version History
- 2026-09-19 (Batch 170): authored. First entry this batch. Companion batch concept:
  `math.linalg.kernel-image`.
