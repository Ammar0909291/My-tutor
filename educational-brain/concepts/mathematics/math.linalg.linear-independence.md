# math.linalg.linear-independence

## Identity
- **KG id**: `math.linalg.linear-independence`
- **Domain**: math.linalg
- **Requires**: `math.linalg.span`
- **Unlocks**: `math.linalg.basis`
- **Cross-links**: `math.de.wronskian` (not yet authored — verified via `ls`; independence mode
  used, see Blueprint References)
- **Difficulty**: proficient
- **Bloom level**: understand
- **Mastery threshold**: 0.9
- **Estimated hours**: 4

## Learning Objective
Determine whether $v_1,\dots,v_k$ are linearly independent by setting $c_1v_1+\cdots+c_kv_k=0$
and checking whether the trivial solution is the ONLY one; recognize that dependence among 3+
vectors need not involve any TWO of them being parallel — one vector can be a combination of
SEVERAL others jointly, with no pairwise relationship visible; and apply the fact that in
$\mathbb R^n$, any set of MORE than $n$ vectors is automatically dependent, with no case-by-case
check needed.

## Core Understanding
INDEPENDENCE REQUIRES THE TRIVIAL SOLUTION TO BE THE ONLY ONE — NEVER JUST THAT IT WORKS:
$v_1,\dots,v_k$ are linearly independent iff the ONLY solution to $c_1v_1+\cdots+c_kv_k=0$ is
$c_1=\cdots=c_k=0$. The trivial solution ALWAYS satisfies this equation, for ANY set, dependent or
not — confirming it proves nothing on its own. Genuine independence requires actually solving the
full system and confirming NO other solution exists, directly reusing `math.linalg.span`'s own
redundancy notion: dependence is precisely when some vector is already reachable from the others.

DEPENDENCE CAN HIDE ACROSS THREE OR MORE VECTORS WITH NO PAIRWISE RELATIONSHIP VISIBLE: for
$v_1=(1,0), v_2=(0,1), v_3=(2,3)$, no two of the three are parallel or identical — yet solving
$c_1v_1+c_2v_2+c_3v_3=0$ gives infinitely many solutions, e.g. $c_1=-2,c_2=-3,c_3=1$, confirming
$v_3=2v_1+3v_2$ — a genuine NONTRIVIAL combination. Checking only pairs (is any two parallel?)
misses this multi-vector dependency entirely; only setting up and solving the FULL combination
equation reliably detects it.

TOO MANY VECTORS FOR THE DIMENSION FORCES DEPENDENCE, NO COMPUTATION NEEDED: in $\mathbb R^n$, any
set of MORE than $n$ vectors is automatically linearly dependent — a structural consequence of
dimension, not something requiring a case-by-case check. Once a set is already dependent, adding
further vectors keeps it dependent (the original nontrivial combination still works with the new
coefficients set to 0).

## Mental Models
- **"The trivial solution always works — it's the presence or absence of ANY OTHER solution that
  actually answers the independence question."**
- **"Checking pairs only catches the easiest kind of dependence — a joint combination of three or
  more vectors can hide with no pair individually parallel."**

## Why Students Fail

### MC-1: DEPENDENCE-REQUIRES-PARALLEL-PAIR
- **Surface form**: checks only pairwise relationships (are any two vectors parallel/identical) to
  judge dependence, missing multi-vector dependencies with no pairwise relationship visible.
- **Birth type**: Type 1, overgeneralization (Blueprint's own declared trigger — the simplest,
  most visible form of dependence is a parallel pair, so it becomes the default check even when
  more vectors are involved).
- **Repair**: re-set up and solve the FULL combination equation for all vectors jointly, not just
  pairs.

### MC-2: TRIVIAL-SOLUTION-PROVES-INDEPENDENCE
- **Surface form**: exhibits the trivial solution ($c_i=0$ for all $i$) and declares independence
  proven, without checking whether a nontrivial solution also exists.
- **Birth type**: Type 1, overgeneralization (Blueprint's own declared Foundational severity — the
  trivial solution's ever-present validity is mistaken for meaningful confirmation).
- **Repair**: re-solve the full system completely, confirming the trivial solution is genuinely
  the ONLY one, not merely one that happens to work.

### MC-3: ANY-VECTOR-COUNT-CAN-BE-INDEPENDENT
- **Surface form**: assumes a large set of vectors in $\mathbb R^n$ could still be independent
  regardless of count, missing that more than $n$ vectors is automatically dependent.
- **Birth type**: Type 1, overgeneralization (Blueprint's own declared trigger — without the
  dimension-count fact, each new vector set looks like it needs individual verification).
- **Repair**: re-anchor on the count-versus-dimension rule directly, requiring no computation once
  the count exceeds the dimension.

## Misconceptions

### MC-1: DEPENDENCE-REQUIRES-PARALLEL-PAIR
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

### MC-2: TRIVIAL-SOLUTION-PROVES-INDEPENDENCE
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

### MC-3: ANY-VECTOR-COUNT-CAN-BE-INDEPENDENT
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

## Analogies
- **"Checking the trivial solution is like confirming a door isn't locked from a side you already
  know is open — it tells you nothing about whether OTHER doors (nontrivial solutions) exist."**
- **Anti-analogy**: vectors that "look different" from each other are not automatically
  independent — resemblance-based judgment misses joint, multi-vector dependencies entirely.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: $u_1=(1,1,0), u_2=(0,1,1), u_3=(1,2,1)$ — no pair is a
  scalar multiple of another, yet $u_1+u_2=u_3$, so $u_1+u_2-u_3=0$ is a genuine nontrivial
  combination — DEPENDENT with zero pairwise-parallel relationships anywhere.
- **Demonstration 2 (targets MC-2)**: for the standard basis $w_1=(1,0,0), w_2=(0,1,0),
  w_3=(0,0,1)$, solving $c_1w_1+c_2w_2+c_3w_3=0$ directly FORCES $c_1=c_2=c_3=0$ — no other
  solution is even algebraically possible, earning the conclusion INDEPENDENT only by genuinely
  attempting (and failing) to find a nontrivial solution.
- **Demonstration 3 (targets MC-3)**: any 4 vectors in $\mathbb R^3$ (e.g. adding $(1,1,1)$ to the
  standard basis) are automatically dependent — no computation needed in advance, confirmed
  concretely since $(1,1,1)=(1,0,0)+(0,1,0)+(0,0,1)$.

## Discovery Questions
1. "If no two vectors in a set of three are parallel, does that guarantee the set is
   independent?"
2. "Does showing that $c_1=c_2=0$ satisfies the combination equation prove the set is
   independent?"
3. "Could a set of 5 vectors in $\mathbb R^3$ possibly be independent?"

## Teaching Sequence
1. **Anchor**: connect to `math.linalg.span`'s own redundancy notion, framing dependence as
   exactly that redundancy given a formal test.
2. **Representation shift**: solve the combination equation explicitly for a genuinely dependent,
   no-parallel-pair set, establishing the full-search discipline from the start.
3. **Contrast pair**: Demonstration 1's multi-vector dependency, isolating MC-1 by requiring the
   full joint system, not pairwise checks.
4. **Contrast pair**: Demonstration 2's genuinely independent set, isolating MC-2 by showing the
   search must actually fail to find a nontrivial solution.
5. **Contrast pair**: Demonstration 3's dimension-count case, isolating MC-3 by exposing the
   no-computation-needed shortcut.
6. **Mastery gate**: require a correct full-system independence determination for a fresh
   multi-vector set, a correct completed nontrivial-solution search, and a correct
   dimension-count application, at the Blueprint's own stated MAMR of 5/5 (⌈0.9×5⌉).

## Tutor Actions
- Never accept an independence claim based on pairwise checks alone.
- Never accept the trivial solution's validity as proof of independence — require confirmation
  that no nontrivial solution exists.

## Voice Teaching Notes
- Say "did you check the full joint combination, or just pairs?" whenever an independence claim
  relies only on pairwise comparison.
- When independence is claimed, ask "did you find that the trivial solution is the ONLY one, or
  just that it works?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly sets up and fully solves the combination equation
  for a new vector set.
- **Rung 2 (application)**: learner correctly identifies a multi-vector dependency with no
  pairwise-parallel relationship.
- **Rung 3 (transfer)**: learner correctly applies the dimension-count rule to a NEW vector-count
  scenario without computation, and correctly reasons that a dependent set stays dependent after
  further additions.

## Tutor Recovery Strategy
- If MC-1 recurs, re-set up and solve the full joint combination equation.
- If MC-2 recurs, re-solve the system completely, confirming no nontrivial solution exists.
- If MC-3 recurs, re-anchor on the count-versus-dimension rule directly.

## Memory Hooks
- "The trivial solution always works — only its uniqueness proves independence."
- "Three or more vectors can be dependent with no pair parallel — always solve the full system."
- "More vectors than dimensions means dependence, guaranteed, no computation needed."

## Transfer Connections
- `math.linalg.span` (already authored, this campaign): supplies the redundancy notion this
  concept formalizes as linear dependence.
- `math.linalg.basis` (not yet authored): the KG's declared unlock, requiring both spanning and
  linear independence together.

## Cross-Subject Connections
- None formal — `math.de.wronskian` is declared as a cross-link in the KG but is not yet authored
  (confirmed via `ls`), so this entry uses independence mode per the established convention.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.linalg.linear-independence.md`, reused by
  reference for its multi-vector no-parallel-pair dependency examples, its genuinely-independent
  standard-basis search, its dimension-count shortcut, and its three-misconception registry
  (severity levels and birth-type-equivalent trigger conditions adopted directly as declared).
- Transfer probe cited by reference: the Blueprint's own independence-mode probe, examining three
  chemistry reaction mixtures with a hidden three-vector dependency, and why a dependent set
  remains dependent after a fourth mixture is added.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires `math.linalg.span`,
  unlocks `math.linalg.basis`, cross_links `math.de.wronskian`, proficient/understand,
  mastery_threshold 0.9, estimated_hours 4) was directly verified against the live KG and matches
  exactly. The Blueprint's own correctly-declared independence P76 mode (cross-link target
  confirmed unauthored via `ls`) required no correction.

## Version History
- 2026-09-18 (Batch 97): authored. First entry this batch. Companion batch concept:
  `math.prob.sample-space` (opening a new domain). `math.linalg` moves 36/61 → **37/61 — DOMAIN'S
  ready frontier temporarily exhausted pending further unblocking** this batch.
