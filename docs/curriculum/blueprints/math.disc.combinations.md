# Teaching Blueprint: Combinations (`math.disc.combinations`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.disc.combinations` |
| name | Combinations |
| domain | Discrete Mathematics |
| difficulty | developing |
| bloom | apply |
| mastery_threshold | 0.9 → MAMR = ⌈0.9×5⌉ = 5/5 |
| estimated_hours | 4 |
| requires | `math.disc.permutations` |
| unlocks | `math.disc.binomial-theorem`, `math.disc.inclusion-exclusion` |
| cross_links | `math.alg.binomial-theorem` (unauthored — see Component 7) |
| CPA_entry_stage | C (Concrete) — the committee-selection scenario (order doesn't matter) directly picking up where `math.disc.permutations` left off |
| description (KG) | C(n,r) = n!/(r!(n−r)!); the number of unordered selections of r from n. Pascal's identity: C(n,r)=C(n−1,r−1)+C(n−1,r). Combinatorial identity: ∑C(n,k)=2ⁿ. |

## Component 1 — Learning Objectives

- LO1: Derive and apply the combination formula $C(n,r) = \frac{n!}{r!(n-r)!}$ for the number of **unordered** selections of $r$ items from $n$ distinct items — by starting from $P(n,r)$ (`math.disc.permutations`) and dividing by $r!$ to remove the redundant orderings within each selected group.
- LO2: State and verify **Pascal's identity**, $C(n,r) = C(n-1,r-1) + C(n-1,r)$, by a combinatorial argument (splitting on whether one specific item is included in the selection or not) rather than pure algebra.
- LO3: State and interpret the combinatorial identity $\sum_{k=0}^n C(n,k) = 2^n$ (the total number of subsets of an $n$-element set), and correctly choose combinations over permutations whenever a problem's setup has no roles or ordering — directly refuting the misconception that $C(n,r)$ and $P(n,r)$ are interchangeable formulas for "choosing $r$ from $n$."

## Component 2 — Prerequisite Check

Assumes mastery of `math.disc.permutations` (the ordered-arrangement formula $P(n,r)=\frac{n!}{(n-r)!}$, and critically, that blueprint's own Example 3/MC-1, which first raised the order-matters-vs-doesn't distinction that this concept now formalizes on the "doesn't matter" side).

## Component 3 — Core Explanation

**Deriving $C(n,r)$ from $P(n,r)$**: $P(n,r)$ counts ordered selections — choosing $r$ items from $n$ **and** arranging them in a specific order. Each **unordered** group of $r$ items corresponds to exactly $r!$ different ordered arrangements (all the ways to reorder that same group). So the number of unordered selections is the ordered count divided by this redundancy: $C(n,r) = \frac{P(n,r)}{r!} = \frac{n!}{(n-r)!\,r!}$.

**Pascal's identity, via a combinatorial (not algebraic) argument**: to choose $r$ items from $n$, pick any one specific item — call it "the special item" — and split into two cases: either the special item **is** included in the selection (then you still need to choose the remaining $r-1$ items from the other $n-1$: $C(n-1,r-1)$ ways) or it is **not** included (then you choose all $r$ items from the remaining $n-1$: $C(n-1,r)$ ways). Since every selection falls into exactly one of these two cases, adding them gives the total: $C(n,r) = C(n-1,r-1)+C(n-1,r)$.

**The subset-counting identity $\sum_{k=0}^n C(n,k) = 2^n$**: $C(n,k)$ counts the subsets of size exactly $k$ from an $n$-element set; summing over every possible size $k=0,1,\dots,n$ counts every possible subset exactly once. Independently, each of the $n$ elements has exactly 2 choices — in or out of the subset — giving $2^n$ total subsets by the multiplication principle. Two different ways of counting the same collection of subsets must agree, giving the identity.

**Choosing combinations vs. permutations**: apply the **same order-matters test** established in `math.disc.permutations`: if swapping the order of the selected items gives a genuinely different outcome (assigned roles, ranks, sequence), use $P(n,r)$; if the selection is just a set of members with no internal structure, use $C(n,r)$.

## Component 4 — Worked Examples

**Example 1 (LO1 — deriving C(n,r) directly from P(n,r))**: How many ways can a committee of 3 be chosen from 8 people (no roles — just membership, order doesn't matter)? First, $P(8,3) = 8\times7\times6=336$ counts every ORDERED selection. Each unordered group of 3 people corresponds to $3!=6$ different orderings, so $C(8,3) = 336/6 = 56$ — directly matching $\frac{8!}{3!\,5!} = \frac{40320}{6\times120}=56$.

**Example 2 (LO2 — Pascal's identity via the combinatorial split)**: Verify $C(6,2)=C(5,1)+C(5,2)$ using the "special item" argument: from 6 people, fix one specific person, say Dana. Choosing 2 people either includes Dana (then 1 more from the remaining 5: $C(5,1)=5$ ways) or excludes Dana (then 2 from the remaining 5: $C(5,2)=10$ ways). Total: $5+10=15$, matching $C(6,2)=\frac{6!}{2!4!}=15$ directly.

**Example 3 (LO3 — permutations vs. combinations, revisited and generalized, breaking MC-1)**: A trivia team of 4 must be chosen from a pool of 10 students, AND separately, the team then elects a captain and a co-captain from among those 4 (two distinct roles). Part (a), choosing the 4-person team itself: order doesn't matter (just membership) — use $C(10,4) = \frac{10!}{4!6!}=210$. Part (b), given a specific 4-person team, choosing captain and co-captain: order DOES matter (captain and co-captain are distinct roles) — use $P(4,2) = \frac{4!}{2!}=12$. The **same pool of people** (the 4-person team) requires $C$ for the membership-only stage and $P$ for the role-assignment stage — proving the two formulas are not interchangeable, and the choice depends entirely on whether the specific sub-task at hand assigns roles or not.

## Component 5 — Teaching Actions

### Teaching Action A01 — Dividing Out the Redundant Orderings (Primitive P11: Representation Shift)

State: "every unordered group of $r$ people can be arranged in $r!$ different orders — but for a committee, all those orders are secretly THE SAME committee. So take the ordered count $P(n,r)$ and divide out that redundancy." Work Example 1, explicitly showing the division $336/6=56$ and connecting it to the direct formula.

### Teaching Action A02 — Pascal's Identity, Proved by Splitting on One Item (Primitive P11: Representation Shift)

Present the "special item, in-or-out" argument verbally first: "pick any one person and ask: is this specific person on the committee or not? Every possible committee falls into exactly one of those two cases, and counting each case separately then adding must give the same total." Work Example 2's numeric verification, connecting the informal split argument to the exact recursion.

### Teaching Action A03 — Combinations vs. Permutations: the Test Applies Per Sub-Task (Primitive P06: Contrast Pair)

Present Example 3's two-part scenario directly: the SAME 4 people, counted with $C(10,4)$ for team selection (no roles) and then $P(4,2)$ for captain/co-captain assignment (roles) applied to a further sub-step. State: "don't assume a whole problem is 'all combinations' or 'all permutations' — apply the order-matters test separately to each stage of the problem."

- **MC-1 hook**: ask "if a problem says 'choose 4 people,' is it always solved with $C(n,r)$, never $P(n,r)$?" — a "yes" answer reveals MC-1 (assuming "choose" always signals combinations, without checking whether a later stage of the same problem assigns roles requiring $P(n,r)$ instead).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. A pizza shop offers 8 toppings; how many different 3-topping pizzas can be made (order of toppings doesn't matter)? Use $C(n,r)$ and justify why combinations (not permutations) apply.
  2. Verify Pascal's identity numerically for $C(7,3)=C(6,2)+C(6,3)$, computing all three values directly.
  3. Using $\sum_{k=0}^n C(n,k)=2^n$, state how many total subsets (including the empty set and the full set) a 5-element set has, and verify by computing $\sum_{k=0}^5 C(5,k)$ term by term.
  4. A lottery draws 6 numbers from 49 (order the numbers are drawn doesn't matter for winning). Explain why this uses $C(49,6)$, not $P(49,6)$, and compute the ratio $P(49,6)/C(49,6)$ — what does this ratio represent?
- **P76 (Transfer Probe, mode = independence — KG cross_link `math.alg.binomial-theorem` is not yet authored; a future revision may add a genuine cross-link probe into the algebraic binomial expansion once that entry exists)**: "A tournament organizer needs to (a) select 5 teams out of 20 registered teams to advance to the playoffs, and then (b) assign those 5 advancing teams to 5 specific playoff time slots (Slot 1 through Slot 5). (a) Explain which formula, $C$ or $P$, applies to selecting the 5 advancing teams, and compute the count. (b) Explain which formula applies to assigning the 5 teams to the 5 specific time slots, and compute that count. (c) Explain, referencing Example 3's captain/co-captain structure, why this tournament scenario needs BOTH formulas at different stages rather than just one."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | COMBINATIONS-AND-PERMUTATIONS-TREATED-AS-INTERCHANGEABLE | Assuming a problem is entirely solved with either $C(n,r)$ or $P(n,r)$ throughout, without checking whether different stages of the same problem have different order-matters status | Foundational |
| MC-2 | DIVISION-BY-R-FACTORIAL-OMITTED | Computing $P(n,r)$ when $C(n,r)$ was actually required, forgetting to divide out the $r!$ redundant orderings within each selected group | Foundational |
| MC-3 | PASCALS-IDENTITY-TREATED-AS-UNMOTIVATED-ALGEBRA | Memorizing Pascal's identity as a symbolic manipulation fact without understanding the combinatorial "in-or-out" argument that explains why it must be true | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Combinations-Permutations Interchangeability Assumption") → P41 (detect: present Example 3's two-stage scenario and ask the student to solve both parts with the same formula) → P64 (conceptual shift: re-apply the order-matters test separately to each part, showing part (a) has no roles (combinations) while part (b) has two distinct roles (permutations)).
- **B02 (targets MC-2)**: P27 (name it: "Missing r-Factorial Division") → P41 (detect: ask for the number of 3-person committees from 8 people and check whether the student answers $P(8,3)=336$ instead of $C(8,3)=56$) → P64 (conceptual shift: re-walk Example 1's explicit division, emphasizing that each committee of 3 corresponds to $3!=6$ different orderings all being double-counted in $P(8,3)$).
- **B03 (targets MC-3)**: P27 (name it: "Pascal's Identity as Unmotivated Algebra") → P41 (detect: ask the student to explain WHY $C(n,r)=C(n-1,r-1)+C(n-1,r)$ is true, not just state it) → P64 (conceptual shift: re-walk Example 2's "fix one specific person, in or out" argument, connecting each term of the identity to one of the two mutually exclusive cases).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.disc.permutations` (the ordered-count formula $P(n,r)$ this concept's core formula is directly derived from, and the order-matters test first introduced there).
- **Unlocks**: `math.disc.binomial-theorem` (the binomial coefficients are exactly the $C(n,r)$ values taught here), `math.disc.inclusion-exclusion` (a counting technique building on combination-style set-counting).
- **Cross-link**: KG lists `math.alg.binomial-theorem` as a cross-link, but that concept is **not yet authored** in the corpus (checked via `ls docs/curriculum/blueprints/math.alg.binomial-theorem.md`, not found) — P76_mode = independence for this blueprint's transfer probe. A future revision may add a genuine cross-link probe into the algebraic binomial expansion once that entry exists.

## Component 8 — Teaching Notes

- estimated_hours = 4 with a developing/apply tag places this at a "3 TAs + gate" tier — A01 (formula derivation), A02 (Pascal's identity via combinatorial proof), and A03 (combinations vs. permutations per-stage) each target a distinct LO, appropriate for a concept whose difficulty lies in one derivation plus one persistent formula-choice error.
- This blueprint deliberately continues (rather than restarts) the order-matters framing first introduced in `math.disc.permutations`'s Example 3/MC-1 — Example 3 here is a direct escalation of that same committee-vs-role distinction into a two-stage problem, reinforcing rather than duplicating that earlier concept's teaching.
- Pascal's identity was deliberately taught via the combinatorial "in-or-out" argument rather than pure algebraic manipulation of factorials, per this corpus's general preference for conceptual proofs over symbol-pushing wherever a clean combinatorial argument exists — directly targeting MC-3.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS (both) |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (math.alg.binomial-theorem not authored → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.9×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Concrete: committee-selection scenario continuing from permutations) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
