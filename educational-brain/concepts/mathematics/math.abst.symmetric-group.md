# math.abst.symmetric-group

## Identity
- **KG id**: `math.abst.symmetric-group`
- **Domain**: math.abst
- **Requires**: `math.abst.group-theory`
- **Unlocks**: `math.abst.alternating-group`
- **Cross-links**: none
- **Difficulty**: advanced
- **Bloom level**: apply
- **Mastery threshold**: 0.85
- **Estimated hours**: 5

## Learning Objective
Define $S_n$ as the group of ALL bijections (permutations) of $\{1,\ldots,n\}$ under function
composition, directly verifying `math.abst.group-theory`'s own group axioms hold, and confirm
$|S_n|=n!$ by direct counting; apply CYCLE NOTATION to represent and analyze permutations, and
recognize that the CYCLE STRUCTURE determines CONJUGACY CLASS membership; and (at orientation
level, full development deferred to `math.abst.alternating-group`) recognize Cayley's theorem —
every finite group embeds in some $S_n$ — and that transpositions generate $S_n$.

## Core Understanding
$S_n$ GENUINELY SATISFIES THE GROUP AXIOMS: $S_n$ consists of ALL bijections of $\{1,\ldots,n\}$
under function composition. Verifying `math.abst.group-theory`'s own axioms directly: CLOSURE
(composing two bijections of $\{1,\ldots,n\}$ gives another bijection of the same set); IDENTITY
(the identity permutation, fixing every element); INVERSES (every bijection has an inverse
bijection); ASSOCIATIVITY (function composition is always associative). Counting directly: there
are $n$ choices for where $1$ maps, $n-1$ remaining choices for where $2$ maps, and so on, giving
$|S_n|=n!$.

CYCLE NOTATION AND CONJUGACY CLASSES: a permutation can be written as a product of disjoint
CYCLES (e.g. $(1\,3)(2\,4\,5)$ means $1\leftrightarrow3$ and $2\to4\to5\to2$). The CYCLE STRUCTURE
— the multiset of cycle lengths appearing (here: one 2-cycle, one 3-cycle) — is a powerful
invariant: two permutations in $S_n$ are CONJUGATE if and only if they have the SAME cycle
structure, a fact that replaces laborious case-by-case searching for an explicit conjugating
element with a simple structural comparison.

CAYLEY'S THEOREM AND TRANSPOSITION GENERATION (orientation level): Cayley's theorem states EVERY
finite group $G$ embeds in $S_{|G|}$ — a genuine INJECTIVE, structure-preserving copy of $G$
sitting inside $S_{|G|}$, not necessarily an ONTO identification (the ambient $S_{|G|}$ can be far
larger than $G$ itself). Separately, every permutation can be written as a product of
TRANSPOSITIONS (2-cycles) — this decomposition is the seed of the even/odd permutation
distinction, fully developed in `math.abst.alternating-group`.

## Mental Models
- **"$S_n$ is a group only because every axiom genuinely holds — checked, never assumed just
  because it's called 'the symmetric group.'"**
- **"Same cycle structure means conjugate — a structural comparison replaces trial-and-error
  search."**
- **"Cayley's theorem gives you a COPY of $G$ inside a possibly much LARGER $S_n$ — embedding, not
  equality."**

## Why Students Fail

### MC-1: GROUP-AXIOMS-ASSUMED-AUTOMATIC-FOR-SN
- **Surface form**: believes $S_n$ is automatically a group without checking the actual group
  axioms, treating group membership as automatic rather than verified.
- **Birth type**: Type 1, overgeneralization (Blueprint's own declared Foundational severity — the
  name "symmetric group" is taken as a guarantee rather than a claim requiring the same
  axiom-by-axiom check every other group needs).
- **Repair**: re-attempt the specific axiom-by-axiom verification directly for a small $S_n$
  (closure, identity, inverses, associativity all checked explicitly).

### MC-2: CONJUGACY-ASSUMED-TO-REQUIRE-EXPLICIT-SEARCH
- **Surface form**: believes determining conjugacy in $S_n$ requires explicitly finding a
  conjugating element by trial and error, missing the cycle-structure shortcut.
- **Birth type**: Type 5, instruction-induced (Blueprint's own declared High severity — conjugacy
  is often first introduced via its definitional search procedure, without the cycle-structure
  theorem being presented as a genuine shortcut that replaces that search).
- **Repair**: re-attempt the specific pair's cycle-structure comparison directly, confirming
  matching cycle-length multisets without searching for an explicit conjugating element.

### MC-3: CAYLEYS-THEOREM-MISREAD-AS-EQUALITY
- **Surface form**: believes Cayley's theorem means a finite group literally EQUALS some $S_n$,
  missing that it merely embeds injectively into a possibly much larger ambient group.
- **Birth type**: Type 4, notation-induced (Blueprint's own declared Moderate severity — the
  informal phrasing "every group is (a) symmetric group" elides the distinction between "embeds
  in" and "equals," and the embedding notation itself does not visually signal the ambient group's
  larger size).
- **Repair**: re-attempt the specific order comparison directly (e.g. a group of order 4 embedding
  in $S_4$, order 24), confirming the ambient group is genuinely larger.

## Misconceptions

### MC-1: GROUP-AXIOMS-ASSUMED-AUTOMATIC-FOR-SN
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

### MC-2: CONJUGACY-ASSUMED-TO-REQUIRE-EXPLICIT-SEARCH
- **Surface form**: as described above.
- **Root cause (Type 5)**: as described above.
- **Repair**: as described above.

### MC-3: CAYLEYS-THEOREM-MISREAD-AS-EQUALITY
- **Surface form**: as described above.
- **Root cause (Type 4)**: as described above.
- **Repair**: as described above.

## Analogies
- **"$S_n$ is like the complete set of all possible shufflings of $n$ labeled cards — every
  shuffle is an element, stacking two shuffles in sequence is the group operation, and 'undo the
  shuffle' is the inverse."**
- **Anti-analogy**: Cayley's theorem does NOT say a group IS some symmetric group — it says a
  group has a faithful COPY living inside one, which may be far larger.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: for $n=3$, $S_3$ has all $6$ bijections of $\{1,2,3\}$
  (identity, three transpositions, two 3-cycles) matching $3!=6$ by direct count; CLOSURE,
  IDENTITY, INVERSES, ASSOCIATIVITY all verified explicitly rather than assumed.
- **Demonstration 2 (targets MC-2)**: in $S_5$, $(1\,3)(2\,4\,5)$ (one 2-cycle, one 3-cycle) and
  $(1\,5)(2\,3\,4)$ (also one 2-cycle, one 3-cycle) share the SAME cycle structure, so they are
  CONJUGATE — a fact confirmed by the shortcut, not by explicitly searching for a conjugating
  element.
- **Demonstration 3 (targets MC-3)**: a group $G$ of order 4 embeds into $S_4$, which has order
  $24$ — a strictly injective, non-onto copy, contrasted directly against the mistaken reading
  that $G$ and $S_4$ would be "the same"; separately, $(1\,2\,3)=(1\,3)(1\,2)$ verifies the
  3-cycle decomposes into two transpositions.

## Discovery Questions
1. "Is $S_n$ automatically a group simply by being called 'the set of permutations,' without
   checking the actual group axioms?"
2. "To determine whether two permutations are conjugate in $S_n$, must you explicitly find a
   conjugating element by trial and error?"
3. "Does Cayley's theorem mean a finite group $G$ literally EQUALS some $S_n$, not merely embeds
   in it?"

## Teaching Sequence
1. **Anchor**: connect to `math.abst.group-theory`'s own four axioms, framing $S_n$ as a SPECIFIC
   group whose membership must be checked, not assumed from its name.
2. **Conflict evidence**: Demonstration 2's cycle-structure conjugacy shortcut, directly
   challenging MC-2 by showing a structural comparison replaces trial-and-error search.
3. **Contrast pair**: a group of order 4 embedding into $S_4$ of order 24 (Demonstration 3),
   isolating MC-3 by showing the ambient group is genuinely larger, never equal.
4. **Mastery gate**: require a correct axiom-by-axiom verification for a specific $S_n$, a correct
   cycle-structure-based conjugacy determination, and a correct transposition decomposition of a
   given cycle, at the Blueprint's own stated MAMR of 5/5 (⌈0.85×5⌉).

## Tutor Actions
- Never accept "$S_n$ is a group" without an explicit axiom check — require closure, identity,
  inverses, and associativity to be verified for the specific $n$ in question.
- Never accept a conjugacy claim justified only by an explicit search — require the cycle-structure
  comparison to be stated as the decisive test.

## Voice Teaching Notes
- Say "which axiom are you checking right now?" whenever an $S_n$ group-membership claim is made
  without explicit verification.
- When conjugacy is asked, ask "do the two permutations have the same cycle structure?" before any
  search for a conjugating element.

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly lists all elements of a specific $S_n$ using cycle
  notation, including the identity.
- **Rung 2 (application)**: learner correctly determines whether two permutations are conjugate
  using the cycle-structure shortcut, without needing an explicit conjugating element.
- **Rung 3 (transfer)**: learner correctly applies cycle notation and the conjugacy shortcut to a
  NEW context (e.g. the 15-puzzle's tile-permutation structure), and correctly explains a
  transposition decomposition's relevance to solvability.

## Tutor Recovery Strategy
- If MC-1 recurs, re-attempt the specific axiom-by-axiom verification directly.
- If MC-2 recurs, re-attempt the specific pair's cycle-structure comparison directly.
- If MC-3 recurs, re-attempt the specific order comparison directly.

## Memory Hooks
- "$S_n$'s axioms are checked, never assumed — closure, identity, inverses, associativity, every
  time."
- "Same cycle structure means conjugate — a structural shortcut, not a search."
- "Cayley's theorem embeds, never equates — the ambient $S_n$ can be far larger."

## Transfer Connections
- `math.abst.group-theory` (already authored, this campaign, Batch 84): supplies the four group
  axioms this concept's own axiom-by-axiom verification directly reuses.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.abst.symmetric-group.md`, reused by
  reference for its $S_3$ axiom-verification worked example, its $S_5$ cycle-structure conjugacy
  worked example, its Cayley's-theorem order-comparison worked example, and its three-misconception
  registry (severity levels adopted directly as declared; birth types independently classified
  since this Blueprint states Description/Severity but not a formal Type label).
- Transfer probe cited by reference: the Blueprint's own independence-mode probe, applying cycle
  notation and the conjugacy shortcut to a 15-puzzle-style tile-permutation setting, plus a
  conceptual explanation of transposition decomposition's relevance to solvability.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires `math.abst.
  group-theory`, unlocks `math.abst.alternating-group`, cross_links none, advanced/apply,
  mastery_threshold 0.85, estimated_hours 5) was directly verified against the live KG and
  matches exactly. The Blueprint's own correctly-declared independence P76 mode (cross_links
  empty in KG) required no correction.

## Version History
- 2026-09-14 (Batch 90): authored. Second entry this batch. Companion batch concepts: `math.abst.
  cyclic-group`, `math.abst.second-isomorphism-theorem`, `math.linalg.subspace`. Three math.abst
  concepts authored this batch (`cyclic-group`, this one, `second-isomorphism-theorem`) plus one
  math.linalg concept (`subspace`), so `math.abst` moves 22/37 → **25/37** this batch.
