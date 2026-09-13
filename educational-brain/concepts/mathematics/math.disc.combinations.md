# math.disc.combinations

## Identity
- **KG ID**: `math.disc.combinations`
- **Domain**: math.disc (Discrete Mathematics)
- **Requires**:
  - `math.disc.permutations` — load-bearing part: this concept's core formula $C(n,r)$ is derived
    DIRECTLY from $P(n,r)$ by dividing out the redundant internal orderings, and this concept's
    own order-matters-versus-doesn't distinction is a direct continuation (not a restart) of the
    order-matters test first introduced in that concept's own Example 3/MC-1.
- **Unlocks**: `math.disc.binomial-theorem`, `math.disc.inclusion-exclusion`
- **Cross-links**: `math.alg.binomial-theorem` (verified via this program's own prior batches —
  this is precisely the concept this program's entire math.disc excursion exists to unblock;
  P76 uses independence mode per the Blueprint's own established convention)
- **Difficulty**: developing
- **Bloom level**: apply
- **Mastery threshold**: 0.9 (MAMR = ⌈0.9×5⌉ = 5/5)
- **Estimated hours**: 4
- **Blueprint**: `docs/curriculum/blueprints/math.disc.combinations.md` (reused by reference
  throughout)
- **KG note**: the KG description names all three results this entry organizes around precisely —
  $C(n,r)=n!/(r!(n-r)!)$, Pascal's identity $C(n,r)=C(n-1,r-1)+C(n-1,r)$, and the combinatorial
  identity $\sum C(n,k)=2^n$ — matching the Blueprint's own LO1/LO2/LO3 split exactly. The KG's
  aliases ("binomial coefficient," "n choose r") name this concept's direct connection to
  `math.alg.binomial-theorem`, the cross-link this program's entire excursion is working toward.

## Learning Objective
- The learner can derive and apply the combination formula $C(n,r)=\frac{n!}{r!(n-r)!}$ for the
  number of UNORDERED selections of $r$ items from $n$ distinct items — by starting from $P(n,r)$
  and dividing by $r!$ to remove the redundant orderings within each selected group.
- The learner can state and verify PASCAL'S IDENTITY, $C(n,r)=C(n-1,r-1)+C(n-1,r)$, using a
  COMBINATORIAL argument (splitting on whether one specific item is included in the selection or
  not) rather than pure algebraic manipulation.
- The learner can state and interpret the combinatorial identity $\sum_{k=0}^n C(n,k)=2^n$ (the
  total number of subsets of an $n$-element set), and correctly choose combinations over
  permutations whenever a scenario has no roles or ordering — directly refuting the assumption
  that $C(n,r)$ and $P(n,r)$ are interchangeable "choose $r$ from $n$" formulas.

## Core Understanding
$P(n,r)$ (already secured in `math.disc.permutations`) counts ORDERED selections — choosing $r$
items from $n$ AND arranging them in a specific order. Every UNORDERED group of $r$ items
corresponds to exactly $r!$ different ordered arrangements (all the ways to reorder that same
group). So the number of unordered selections is the ordered count divided by this redundancy:
$C(n,r)=\frac{P(n,r)}{r!}=\frac{n!}{(n-r)!\,r!}$.

**Pascal's identity, via a combinatorial (not algebraic) argument**: to choose $r$ items from $n$,
pick any one specific item — the "special item" — and split into two mutually exclusive cases:
either the special item IS included in the selection (then $r-1$ more items must be chosen from
the remaining $n-1$: $C(n-1,r-1)$ ways), or it is NOT included (then all $r$ items must be chosen
from the remaining $n-1$: $C(n-1,r)$ ways). Since every selection falls into exactly one of these
two cases, adding them gives the total: $C(n,r)=C(n-1,r-1)+C(n-1,r)$. This is a genuinely
DIFFERENT kind of justification from algebraic manipulation of factorials — it explains WHY the
identity must hold by direct correspondence with what's actually being counted.

**The subset-counting identity $\sum_{k=0}^n C(n,k)=2^n$**: $C(n,k)$ counts the subsets of size
exactly $k$ from an $n$-element set; summing over every possible size $k=0,1,\dots,n$ counts every
possible subset exactly once. Independently, each of the $n$ elements has exactly 2 choices — in
or out of the subset — giving $2^n$ total subsets by the multiplication principle
(`math.disc.counting-principles`). Two genuinely different ways of counting the same collection of
subsets must agree, giving the identity directly.

The single deciding test for choosing $C(n,r)$ over $P(n,r)$ (or vice versa) is the SAME
order-matters test established in `math.disc.permutations`: if swapping the order of the selected
items gives a genuinely different outcome (assigned roles, ranks, sequence), use $P(n,r)$; if the
selection is just a set of members with no internal structure, use $C(n,r)$. Critically, this test
must be applied PER SUB-TASK within a larger problem — the same group of people might need $C(n,r)$
for one stage (selecting a team) and $P(n,r)$ for another (assigning roles within that team).

## Mental Models
1. **Beginner — "combination" and "permutation" are two separate formulas to memorize and apply
   based on which word a problem happens to use, without a clear procedural connection between
   them.** *Upgrade trigger*: being asked to DERIVE $C(n,r)$ starting from the already-secured
   $P(n,r)$ formula, by dividing out the redundant orderings — revealing whether the two formulas
   are understood as connected, or as unrelated facts. *Shelf life*: brief once the derivation is
   demonstrated concretely.
2. **Intermediate — correctly applies $C(n,r)$ when a problem is clearly labeled or framed as
   "choose" without roles, but treats an entire multi-stage problem as uniformly "all
   combinations" or "all permutations," without checking each stage separately.** *Upgrade
   trigger*: the Blueprint's own Example 3 (choosing a 4-person team via $C(10,4)$, then assigning
   captain/co-captain roles within that SAME team via $P(4,2)$) — revealing whether the
   order-matters test is applied per sub-task, or assumed to hold uniformly across an entire
   problem. *Shelf life*: persists until directly confronted with a genuinely two-stage problem,
   since single-stage practice sets rarely force this distinction.
3. **Advanced — reliably applies the order-matters test separately to each stage of a multi-part
   problem, correctly derives and verifies Pascal's identity via the combinatorial "in-or-out"
   argument (not rote algebra), and correctly interprets the $2^n$ subset-counting identity.**
   *Upgrade trigger*: the Blueprint's own P76 transfer probe (a tournament organizer selecting
   advancing teams, THEN assigning them to specific time slots) — requiring the per-stage
   order-matters judgment to be applied to a genuinely novel two-stage scenario. *Shelf life*:
   durable once the test itself, not surface framing, governs the formula choice at each stage.
4. **Expert — recognizes $C(n,r)$ values as the BINOMIAL COEFFICIENTS (the concept's own KG
   alias), directly connecting this combinatorial counting result to the algebraic expansion of
   $(x+y)^n$ — anticipating `math.disc.binomial-theorem` and `math.alg.binomial-theorem`
   (KG-declared unlock and cross-link respectively) as the concept's direct algebraic
   applications, and recognizing Pascal's identity as the exact recursive structure underlying
   Pascal's triangle.** *Shelf life*: permanent, and this framing is the direct conceptual bridge
   to the binomial theorem this program's entire math.disc excursion exists to unblock.

## Why Students Fail
The single most consequential and frequent failure, ranked foundational per the Blueprint's own
registry, is MC-1: assuming a problem is entirely solved with either $C(n,r)$ or $P(n,r)$
throughout, without checking whether different stages of the same problem have different
order-matters status — an easy trap because a single multi-part problem can genuinely require
BOTH formulas at different stages, as the Blueprint's own captain/co-captain example demonstrates.
The second failure, also foundational, is MC-2: computing $P(n,r)$ when $C(n,r)$ was actually
required, forgetting to divide out the $r!$ redundant orderings within each selected group — a
direct consequence of not recognizing that a group's INTERNAL order is irrelevant when only
membership matters. The third failure, MC-3 (moderate), is memorizing Pascal's identity as a
symbolic manipulation fact without understanding the combinatorial "in-or-out" argument that
explains WHY it must be true — a learner with this misconception can state the identity correctly
but cannot justify it or adapt the reasoning to a novel combinatorial-identity context.

## Misconceptions
Reused by reference from the Blueprint's Component 6 registry (MC-1..MC-3), with birth-type
classification added.

- **MC-1 — COMBINATIONS-AND-PERMUTATIONS-TREATED-AS-INTERCHANGEABLE** (foundational)
  - **Birth type**: Type 1, overgeneralization — once a problem is correctly classified as
    "combinations" or "permutations" at ONE stage, that classification over-generalizes to the
    ENTIRE problem, without re-checking whether a LATER stage of the same problem has a different
    order-matters status.
  - **Characteristic phrase**: applying $C(n,r)$ (or $P(n,r)$) uniformly to every part of a
    multi-stage problem, even when a later stage genuinely assigns distinct roles (or removes
    them).
  - **Detection probe** (verbatim, Blueprint): present Example 3's two-stage scenario and ask the
    student to solve both parts with the same formula.
  - **Repair**: Blueprint Repair Action B01 — re-apply the order-matters test separately to each
    part, showing part (a) has no roles (combinations) while part (b) has two distinct roles
    (permutations).
  - **Verification of death**: given a new multi-stage problem, the learner applies the
    order-matters test independently to EACH stage, correctly selecting a different formula for
    each where warranted.

- **MC-2 — DIVISION-BY-R-FACTORIAL-OMITTED** (foundational)
  - **Birth type**: Type 1, overgeneralization — the $P(n,r)$ formula, secure and recently
    practiced, over-generalizes onto scenarios that actually require $C(n,r)$, with the learner
    computing the ordered count and stopping there, without recognizing the internal orderings
    within each selected group need to be divided out.
  - **Characteristic phrase**: computing the number of 3-person committees from 8 people as
    $P(8,3)=336$ instead of $C(8,3)=56$.
  - **Detection probe** (verbatim, Blueprint): ask for the number of 3-person committees from 8
    people and check whether the student answers $336$ instead of $56$.
  - **Repair**: Blueprint Repair Action B02 — re-walk Example 1's explicit division, emphasizing
    that each committee of 3 corresponds to $3!=6$ different orderings all being double-counted
    in $P(8,3)$.
  - **Verification of death**: given a new committee/group-selection scenario, the learner
    computes $C(n,r)$ directly (or computes $P(n,r)$ and explicitly divides by $r!$) without
    prompting.

- **MC-3 — PASCALS-IDENTITY-TREATED-AS-UNMOTIVATED-ALGEBRA** (moderate)
  - **Birth type**: Type 5, instruction-induced — Pascal's identity is frequently presented and
    verified through purely algebraic manipulation of the factorial formula, without the
    combinatorial "in-or-out" argument being taught as an equally valid (and more illuminating)
    justification, so the identity is absorbed as a symbolic fact rather than an understood truth.
  - **Characteristic phrase**: correctly stating $C(n,r)=C(n-1,r-1)+C(n-1,r)$ but unable to
    explain WHY, beyond "that's the formula."
  - **Detection probe** (verbatim, Blueprint): ask the student to explain WHY
    $C(n,r)=C(n-1,r-1)+C(n-1,r)$ is true, not just state it.
  - **Repair**: Blueprint Repair Action B03 — re-walk Example 2's "fix one specific person, in or
    out" argument, connecting each term of the identity to one of the two mutually exclusive
    cases.
  - **Verification of death**: given a new instance of Pascal's identity to verify, the learner
    explains it via the combinatorial split argument unprompted, not by citing the algebraic
    identity alone.

## Analogies
- **A committee versus an assembly line.** A COMMITTEE is a group with no internal structure —
  once you're a member, your "position" within the committee doesn't matter, so choosing a
  committee is a combinations problem. An ASSEMBLY LINE assigns each chosen worker a SPECIFIC,
  distinct station (station 1, station 2, ...) — swapping two workers' stations genuinely changes
  the outcome, so staffing an assembly line is a permutations problem, even if the SAME pool of
  candidates is being drawn from. *Where it holds*: the "same pool, different structural
  requirement at each stage" contrast, directly targeting MC-1. *Where it breaks*: real
  committees sometimes DO have internal roles (chair, secretary) — the analogy's clean "no
  structure at all" framing is a simplification that must be qualified by the actual per-stage
  check (as in the captain/co-captain example), not assumed to hold for every real-world
  committee.
- **A raffle ticket bin versus a numbered relay-race baton pass.** Drawing 3 winning tickets from
  a raffle bin (no distinction between "1st ticket drawn" and "3rd ticket drawn" — they're all
  simply "winners") is a combinations scenario: $C(n,3)$. Passing a relay baton through 3 specific,
  ordered legs of a race is a permutations scenario: $P(n,3)$ — the SAME 3 runners chosen in a
  different order genuinely produce a different race plan. *Where it holds*: the "unordered
  outcome versus ordered outcome from the same underlying selection" structure, directly
  reinforcing the order-matters test. *Where it breaks*: this analogy doesn't itself convey
  Pascal's identity or the subset-counting identity — those require their own dedicated
  demonstrations.

## Demonstrations
1. **Deriving $C(n,r)$ directly from $P(n,r)$, directly supporting LO1.** How many ways can a
   committee of 3 be chosen from 8 people (no roles — just membership)? First, $P(8,3)=8\times7
   \times6=336$ counts every ORDERED selection. Each unordered group of 3 people corresponds to
   $3!=6$ different orderings, so $C(8,3)=336/6=56$ — directly matching
   $\frac{8!}{3!\,5!}=\frac{40320}{6\times120}=56$.
2. **Pascal's identity via the combinatorial split, directly supporting LO2 and confronting MC-3.**
   Verify $C(6,2)=C(5,1)+C(5,2)$ using the "special item" argument: from 6 people, fix one
   specific person, say Dana. Choosing 2 people either includes Dana (then 1 more from the
   remaining 5: $C(5,1)=5$ ways) or excludes Dana (then 2 from the remaining 5: $C(5,2)=10$ ways).
   Total: $5+10=15$, matching $C(6,2)=\frac{6!}{2!4!}=15$ directly.
3. **Combinations vs. permutations, applied per sub-task, directly confronting MC-1.** A trivia
   team of 4 must be chosen from a pool of 10 students, and separately the team elects a captain
   and co-captain from among those 4. Part (a), choosing the 4-person team: order doesn't matter —
   use $C(10,4)=\frac{10!}{4!6!}=210$. Part (b), given a specific 4-person team, choosing captain
   and co-captain (two distinct roles): order DOES matter — use $P(4,2)=\frac{4!}{2!}=12$. The
   SAME pool of people requires $C$ for the membership-only stage and $P$ for the role-assignment
   stage, proving the two formulas are not interchangeable and depend entirely on the specific
   sub-task at hand.

## Discovery Questions
- "How many different orderings does one 3-person committee actually correspond to, if you tried
  to 'arrange' its members? What does that suggest about the relationship between $P(8,3)$ and
  the number of actual committees?" — surfaces LO1's derivation by inviting the learner to notice
  the $r!$ redundancy themselves.
- "Fix one specific person from the group. For any selection of $r$ people, is that person
  IN or OUT? Does every possible selection fall into exactly one of those two cases?" — surfaces
  MC-3 by walking the learner through Pascal's combinatorial argument as a guided discovery.
- "If choosing 4 team members is a combinations problem, does that mean EVERYTHING about the team
  afterward must also be a combinations problem?" — surfaces MC-1 by directly questioning the
  uniform-classification assumption.

## Teaching Sequence
1. **Anchor**: connect explicitly to `math.disc.permutations`'s already-secured $P(n,r)$ formula
   and the order-matters test first introduced there — state plainly that this concept is a
   direct continuation, not a restart.
2. **Derive $C(n,r)$ from $P(n,r)$ concretely** (Demonstration 1), directly supporting LO1 and
   pre-empting MC-2 by making the $r!$ redundancy explicit rather than asserted.
3. **Establish Pascal's identity via the combinatorial split** (Demonstration 2), directly
   pre-empting MC-3, per the Blueprint's own stated preference for conceptual proofs over
   symbol-pushing wherever a clean combinatorial argument exists.
4. **Confront the per-stage order-matters test with a genuinely two-stage scenario**
   (Demonstration 3), directly pre-empting MC-1 — this concept's central, most consequential
   distinction, deliberately taught using the SAME pool of people across both stages to isolate
   the structural difference.
5. **Introduce the subset-counting identity $\sum C(n,k)=2^n$** as a natural extension, connecting
   two independent ways of counting the same collection of subsets.
6. **Practice mixed problems** deliberately requiring the formula derivation, Pascal's identity
   verification, and the per-stage order-matters test to each be produced without prompting which
   is needed.
7. **Bridge forward**: name explicitly that `math.disc.binomial-theorem` and
   `math.alg.binomial-theorem` (KG-declared unlock and cross-link respectively) directly reuse
   these $C(n,r)$ values as the BINOMIAL COEFFICIENTS in the expansion of $(x+y)^n$ — the exact
   concept this program's entire math.disc excursion was opened to unblock.

## Tutor Actions
- Before accepting a formula choice for a multi-stage problem, ask "does THIS specific stage
  assign roles, or just membership?" — targeting MC-1 directly, applied stage by stage.
- Before accepting a computed count for a "choose $r$" scenario with no stated roles, ask "did you
  divide out the internal orderings, or count them separately?" — targeting MC-2 directly.
- Before accepting Pascal's identity as stated, ask "can you explain WHY, using the specific
  person in-or-out argument, not just recite the formula?" — targeting MC-3 directly.
- Never accept a multi-stage problem's solution without the order-matters test having been applied
  independently to each stage, even when earlier stages used the same formula.

## Voice Teaching Notes
- When beginning any new stage of a multi-part problem aloud, re-ask the order-matters question
  explicitly, even if the previous stage's answer is fresh: "new stage — does order matter HERE?"
  — targeting MC-1.
- When deriving $C(n,r)$ aloud, narrate the division explicitly: "each group of $r$ people hides
  $r!$ different orderings — divide those out" — targeting MC-2.
- When verifying Pascal's identity aloud, narrate the split concretely: "pick one person... are
  they in, or out? Either way, count what's left" — targeting MC-3.

## Assessment Signals
- **Correct + fast + applies the order-matters test independently to each stage of a multi-part
  problem, derives $C(n,r)$ from $P(n,r)$ rather than reciting it, explains Pascal's identity via
  the combinatorial split unprompted** → MASTERED.
- **Applies the same formula uniformly across a multi-stage problem** → MC-1 active; needs the
  per-stage order-matters repair.
- **Computes $P(n,r)$ when $C(n,r)$ was required, without dividing by $r!$** → MC-2 active; needs
  the redundant-orderings repair.
- **States Pascal's identity without being able to justify it combinatorially** → MC-3 active;
  needs the in-or-out repair.
- **Cannot compute $P(n,r)$ at all, or cannot state the order-matters test** → prerequisite gap in
  `math.disc.permutations`, not specific to this concept's own derivation/identity content; route
  back accordingly.

## Tutor Recovery Strategy
If a learner has just had MC-1 corrected and reacts with "but I already figured out this was a
combinations problem" — validate this directly: the FIRST classification was likely entirely
correct for the stage it addressed. Frame the correction as "you're right about that stage — the
new step is just asking the SAME question again for the next part of the problem, since it might
have a different answer," not as a reversal of the earlier correct judgment. If MC-3 persists
after one correction, avoid re-stating the identity or its proof abstractly again — instead have
the learner physically (or on paper) work through the in-or-out split for a SMALL, concrete case
themselves, listing out which selections include the fixed person and which don't, so the
correspondence becomes something they constructed, not an argument to accept on authority.

## Memory Hooks
- "New stage, new question: does order matter HERE?" — directly targeting MC-1.
- "A group of $r$ hides $r!$ orderings — always divide them out for combinations." — directly
  targeting MC-2.
- "In, or out? Split on one person, and Pascal's identity falls out on its own." — directly
  targeting MC-3.

## Transfer Connections
- **`math.disc.permutations`** (prerequisite, reused): supplies the ordered-count formula
  $P(n,r)$ this concept's core formula is directly derived from, and the order-matters test this
  concept continues rather than restarts.
- **`math.disc.binomial-theorem`** (KG-declared unlock): the binomial coefficients are exactly the
  $C(n,r)$ values taught here, applied to the algebraic expansion of $(x+y)^n$.
- **`math.disc.inclusion-exclusion`** (KG-declared unlock): a counting technique building on
  combination-style set-counting.
- **`math.alg.binomial-theorem`** (KG-declared cross-link): the algebraic sibling of
  `math.disc.binomial-theorem`, and the specific concept this program's entire math.disc
  excursion was opened to unblock — this entry is the final direct prerequisite standing between
  it and authoring.

## Cross-Subject Connections
- **Statistics/probability**: combinations are the direct counting mechanism behind classical
  probability calculations involving unordered selections (e.g. lottery odds, card-hand
  probabilities) — the Blueprint's own P77 problem set includes a lottery (6 from 49) scenario
  computing the ratio $P(49,6)/C(49,6)$, directly illustrating how many times each unordered
  outcome is overcounted by the ordered formula.
- **Computer science**: the subset-counting identity $\sum C(n,k)=2^n$ directly explains why a set
  of $n$ boolean flags (features, options) has exactly $2^n$ possible configurations — a
  structural fact reused constantly in combinatorial algorithm analysis.

## Blueprint References
- `docs/curriculum/blueprints/math.disc.combinations.md` — Component 0 (metadata: difficulty
  developing, bloom apply, mastery_threshold 0.9, estimated_hours 4, requires
  [math.disc.permutations], unlocks [math.disc.binomial-theorem, math.disc.inclusion-exclusion],
  cross_links [math.alg.binomial-theorem]); Component 6 (Misconception Registry MC-1..MC-3, reused
  above with birth-type classification added); Component 4 (worked examples for the formula
  derivation, Pascal's identity verification, and the per-stage combinations-vs-permutations
  contrast, reused directly in the Demonstrations above); the P76 transfer probe (a tournament
  organizer scenario requiring team selection via combinations THEN time-slot assignment via
  permutations, independence mode — the Blueprint's own note that `math.alg.binomial-theorem` was
  not yet authored at the time it was written) — held in the Blueprint's own mastery-gate item
  bank, not restated here per the Standard's ownership boundary.

## Runtime Asset References
- No AssetIdentity rows exist yet for this concept (mathematics EB authoring is ahead of the
  AssetIdentity seeding campaign for math.alg — see CLAUDE.md's "Mathematics Educational Brain
  serving-asset campaign" section for the seeding mechanism this concept will use once authored
  content is selected for transcription).

## Curriculum Feedback
- **This is the concept this program's entire math.disc cross-domain excursion was opened to
  reach**: with this entry authored, `math.alg.binomial-theorem`'s own KG `requires` field
  (`math.disc.combinations`) is now satisfied, and — combined with the already-satisfied
  `math.alg.polynomial`, `math.disc.combinations`, `math.found.proof-by-induction` requirement set
  established earlier in this campaign — `math.alg.binomial-theorem` is now ready to author,
  directly unblocking `math.alg.pascals-triangle` (its own sole remaining dependency) in turn.
  This closes the math.disc side of this program's math.alg-unblocking excursion opened in
  Batch 14.
- No genuine content-overlap or metadata discrepancy was found between this Blueprint and the live
  KG, or against any already-authored mathematics sibling entry — the Blueprint's Component 0
  matches the KG's `requires`/`unlocks`/`cross_links` fields exactly.

## Version History
- 2026-09-11 — Initial authoring (Batch 16 / math.alg-unblocking cross-domain excursion continued,
  part 3 of 3, of the Mathematics Educational Brain completion campaign). Blueprint reused by
  reference in full. No KG or Blueprint file modified.
