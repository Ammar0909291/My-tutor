# math.top.basis

## Identity
- **KG id**: `math.top.basis`
- **Domain**: math.top
- **Requires**: `math.top.topological-space`
- **Unlocks**: none
- **Cross-links**: none
- **Difficulty**: expert
- **Bloom level**: understand
- **Mastery threshold**: 0.85
- **Estimated hours**: 3

## Learning Objective
State the two basis conditions — (B1) every point lies in some basis element, (B2) for any
$x\in B_1\cap B_2$ there exists $B_3\in\mathcal B$ with $x\in B_3\subseteq B_1\cap B_2$ — never
confusing B2 with closure under intersection; use the basis-comparison criterion to determine when
two DIFFERENT bases generate the SAME topology (never assuming different bases automatically mean
different topologies); and apply the comparison criterion to prove the lower-limit topology is
STRICTLY FINER than the standard topology on $\mathbb R$.

## Core Understanding
CONDITION B2 IS A REFINEMENT REQUIREMENT — NEVER CLOSURE UNDER INTERSECTION: B2 asks only that
SOME basis element $B_3$ fits inside $B_1\cap B_2$ AT THE POINT $x$ — it never demands
$B_1\cap B_2$ itself belong to $\mathcal B$. For open balls in $\mathbb R^2$: $B(x,r_1)\cap
B(x,r_2)=B(x,\min(r_1,r_2))$ happens to be a ball too — but that is a COINCIDENCE of balls, never
a general requirement. If B2 demanded actual closure under intersection, $\mathcal B$ would BE a
topology already, making the whole "basis generates a topology" framework pointless — B2's real
job is only to guarantee refinability at each point, nothing stronger.

DIFFERENT BASES CAN GENERATE THE SAME TOPOLOGY — NEVER ASSUMED AUTOMATICALLY DIFFERENT: compare
$\mathcal B_1=\{(a,b):a,b\in\mathbb R\}$ with $\mathcal B_2=\{(a,b):a,b\in\mathbb Q\}$ on
$\mathbb R$. Applying the comparison criterion: for any $(a,b)\in\mathcal B_1$ and $x\in(a,b)$,
density of $\mathbb Q$ gives rational $p<x<q$ with $(p,q)\subseteq(a,b)$, so $\mathcal B_2$
refines $\mathcal B_1$ at $x$; the reverse direction is immediate since $\mathcal B_2\subseteq
\mathcal B_1$. Both directions hold, so $\mathcal T_1=\mathcal T_2$ — two GENUINELY different
collections (one uncountable, one countable) generate the EXACT SAME topology. Believing distinct
bases must yield distinct topologies misses this entirely.

THE LOWER-LIMIT TOPOLOGY IS STRICTLY FINER — NEVER "JUST ANOTHER INTERVAL BASIS": comparing
$\mathcal B_{std}=\{(a,b)\}$ with $\mathcal B_{LL}=\{[a,b)\}$: for any $(a,b)\in\mathcal B_{std}$
and $x\in(a,b)$, $[x,b)\in\mathcal B_{LL}$ satisfies $x\in[x,b)\subseteq(a,b)$ — so $\mathcal
T_{std}\subseteq\mathcal T_{LL}$. But checking the reverse at $[0,1)\in\mathcal B_{LL}$, $x=0$:
EVERY standard interval $(a,b)$ containing $0$ has $a<0$, extending left past $0$, so NO standard
interval fits inside $[0,1)$ at $x=0$ — $[0,1)$ is LL-open but not standard-open. The comparison
fails in only one direction, proving $\mathcal T_{std}\subsetneq\mathcal T_{LL}$ — genuinely
finer, never merely a relabeling of the same "interval" idea.

## Mental Models
- **"B2 only asks for a refinement AT the point — never that the intersection itself joins the
  club."**
- **"A topology can have many different guest lists (bases) that happen to admit the exact same
  members (open sets) — check the comparison criterion, don't assume from appearances."**
- **"Half-open intervals let in more sets than open intervals do — checking both directions of
  the comparison test reveals exactly which extra sets got in."**

## Why Students Fail

### MC-1: BASIS-IS-CLOSED-UNDER-INTERSECTION
- **Surface form**: believes a basis must be closed under pairwise intersection, confusing B2's
  "find a refinement at each point" condition with actual closure under $\cap$.
- **Birth type**: Foundational severity (Blueprint's own declared severity — the open-ball
  coincidence where intersections of balls ARE balls masks that this isn't a general requirement).
- **Repair**: re-read B2's precise wording, noting it only demands finding SOME $B_3\subseteq
  B_1\cap B_2$ containing $x$, never that $B_1\cap B_2\in\mathcal B$ itself.

### MC-2: DIFFERENT-BASES-MEANS-DIFFERENT-TOPOLOGIES
- **Surface form**: assumes two distinct collections $\mathcal B_1\ne\mathcal B_2$ must generate
  different topologies, missing that many different bases can generate the identical topology.
- **Birth type**: Moderate severity (Blueprint's own declared severity — intuitively different
  "ingredient lists" feel like they should produce different results).
- **Repair**: re-walk the rational-radius-versus-all-radius comparison, applying the criterion in
  both directions.

### MC-3: LOWER-LIMIT-SAME-AS-STANDARD
- **Surface form**: believes $[a,b)$ and $(a,b)$ generate the same topology on $\mathbb R$ because
  both "look like intervals," missing the strict fineness of the lower-limit topology.
- **Birth type**: Moderate severity (Blueprint's own declared severity — surface-level interval
  similarity obscures the asymmetric comparison result).
- **Repair**: re-walk the $[0,1)$-at-$x=0$ failure of the standard-refines-LL direction.

## Misconceptions

### MC-1: BASIS-IS-CLOSED-UNDER-INTERSECTION
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

### MC-2: DIFFERENT-BASES-MEANS-DIFFERENT-TOPOLOGIES
- **Surface form**: as described above.
- **Root cause (Moderate)**: as described above.
- **Repair**: as described above.

### MC-3: LOWER-LIMIT-SAME-AS-STANDARD
- **Surface form**: as described above.
- **Root cause (Moderate)**: as described above.
- **Repair**: as described above.

## Analogies
- **"A basis is a small generating alphabet — B2 only requires that overlapping letters can be
  refined into a smaller shared letter at each point, never that the overlap itself is a letter
  in the alphabet."**
- **Anti-analogy**: two different basis "recipes" can bake the identical topology — a basis is not
  a fingerprint uniquely identifying its topology, so never conclude two topologies differ just
  because their bases look different.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the open-rectangle-in-$\mathbb R^2$ B1/B2 verification,
  explicitly noting B2 never requires $B_1\cap B_2\in\mathcal B$.
- **Demonstration 2 (targets MC-2)**: the rational-radius-versus-all-radius basis comparison on
  $\mathbb R$, both directions of the criterion checked.
- **Demonstration 3 (targets MC-3)**: the standard-versus-lower-limit comparison, with the
  explicit one-directional failure at $[0,1)$, $x=0$.

## Discovery Questions
1. "If $B_1$ and $B_2$ are both basis elements, must $B_1\cap B_2$ itself be a basis element?"
2. "Can two genuinely different collections of sets generate the exact same topology?"
3. "Do $[a,b)$ and $(a,b)$ generate the same topology on $\mathbb R$, since both are 'intervals'?"

## Teaching Sequence
1. **Representation shift**: the open-interval basis verification on $\mathbb R$ (B1 and B2
   checked explicitly), working Demonstration 1's B1/B2 pattern, isolating MC-1.
2. **Contrast pair**: the rational-versus-all-radius basis-equivalence comparison, working
   Demonstration 2, isolating MC-2; the standard-versus-lower-limit strict-fineness comparison,
   working Demonstration 3, isolating MC-3.
3. **Mastery gate**: require a correct B1/B2 verification for a novel candidate basis, a correct
   application of the comparison criterion to determine whether two bases generate the same
   topology, and a correct proof that the lower-limit topology is strictly finer, at the
   Blueprint's own stated MAMR of 5/5.

## Tutor Actions
- Never accept a basis condition described as requiring closure under intersection.
- Never accept a claim that two different bases automatically generate different topologies
  without an actual comparison-criterion check.
- Never accept a claim that $[a,b)$ and $(a,b)$ generate the same topology without checking both
  directions of the comparison criterion.

## Voice Teaching Notes
- Say "does B2 ask for the intersection ITSELF to be a basis element, or just SOME smaller set
  fitting inside it at that point?" whenever B2 is being verified.
- Ask "have you checked BOTH directions of the comparison criterion?" whenever two bases are being
  compared.

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly verifies B1 and B2 for a candidate basis.
- **Rung 2 (application)**: learner correctly applies the comparison criterion to determine
  whether two bases generate the same topology.
- **Rung 3 (transfer)**: learner correctly proves the lower-limit topology is strictly finer than
  the standard topology, identifying the specific one-directional failure.

## Tutor Recovery Strategy
- If MC-1 recurs, re-read B2's precise wording against the open-ball coincidence.
- If MC-2 recurs, re-walk the rational-versus-all-radius comparison.
- If MC-3 recurs, re-walk the $[0,1)$-at-$x=0$ one-directional failure.

## Memory Hooks
- "B2 refines at a point — it never absorbs the intersection into the basis."
- "Different bases, same topology — always possible, check the comparison criterion."
- "Lower-limit lets in more sets than standard — the comparison fails in only one direction."

## Transfer Connections
- `math.top.topological-space` (already authored, this campaign, Batch 180): supplies the three
  topology axioms this concept's "topology generated by a basis" construction is verified against.

## Cross-Subject Connections
- Real analysis: the open-ball basis for $\mathbb R^n$'s standard topology, the motivating
  concrete example throughout this concept.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.top.basis.md`, reused by reference for its
  two-condition definition, its rational-radius basis-equivalence example, its lower-limit
  strict-fineness proof, and its three-misconception registry (severity levels adopted directly
  as declared).
- Transfer probe: the Blueprint's own independence-mode probe on second-countability, showing
  $\mathbb R^n$ has a countable basis while the lower-limit topology does not.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.top.topological-space`, unlocks none, cross_links none, expert/understand,
  mastery_threshold 0.85, estimated_hours 3) was directly verified against the live KG and
  matches exactly.

## Version History
- 2026-09-19 (Batch 183): authored. First entry this batch. Companion batch concept:
  `math.top.continuity-top`.
