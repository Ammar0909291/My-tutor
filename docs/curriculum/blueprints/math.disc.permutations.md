# Teaching Blueprint: Permutations (`math.disc.permutations`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.disc.permutations` |
| name | Permutations |
| domain | Discrete Mathematics |
| difficulty | developing |
| bloom | apply |
| mastery_threshold | 0.9 → MAMR = ⌈0.9×5⌉ = 5/5 |
| estimated_hours | 4 |
| requires | `math.disc.counting-principles`, `math.arith.multiplication` |
| unlocks | `math.disc.combinations` |
| cross_links | none |
| CPA_entry_stage | C (Concrete) — physically arranging a small set of distinct objects (e.g. 3 books on a shelf) before the factorial formula |
| description (KG) | P(n,r) = n!/(n−r)! ordered arrangements of r from n distinct objects. Circular permutations: (n−1)!. Permutations with repetition: nʳ. Permutations with identical objects: n!/(n₁!n₂!⋯). |

## Component 1 — Learning Objectives

- LO1: Apply the ordered-arrangement formula $P(n,r) = \frac{n!}{(n-r)!}$ to count the number of ways to arrange $r$ items chosen from $n$ distinct items, when **order matters** — derived directly from the multiplication principle (`math.disc.counting-principles`): $n$ choices for the first position, $n-1$ for the second, ..., down to $n-r+1$ for the $r$-th.
- LO2: Distinguish three permutation variants and apply each correctly: **circular permutations** ($(n-1)!$, arrangements around a circle where rotations are considered identical), **permutations with repetition allowed** ($n^r$, when items can be reused), and **permutations with identical objects** ($\frac{n!}{n_1!n_2!\cdots}$, when some of the $n$ items are indistinguishable from each other).
- LO3: Recognize the defining feature that separates a permutation problem from any other counting problem: **order matters** — directly refuting the misconception that "permutation" just means "any arrangement problem," including ones where the arrangement's order is actually irrelevant (previewing the order-doesn't-matter case that `math.disc.combinations` handles next).

## Component 2 — Prerequisite Check

Assumes mastery of `math.disc.counting-principles` (the multiplication principle: independent sequential choices with $m$ and $n$ options combine to give $m\cdot n$ total outcomes) and `math.arith.multiplication` (computing the products this formula requires) — the permutation formula is a direct repeated application of the multiplication principle across $r$ sequential "choose one of the remaining items" steps.

## Component 3 — Core Explanation

**The basic permutation formula**: to arrange $r$ items chosen from $n$ distinct items, where the order of selection matters, apply the multiplication principle sequentially: there are $n$ choices for the first position, then $n-1$ remaining choices for the second (one item is now used), then $n-2$ for the third, and so on, down to $n-r+1$ choices for the $r$-th position. Multiplying these together gives $P(n,r) = n(n-1)(n-2)\cdots(n-r+1) = \frac{n!}{(n-r)!}$ (the $(n-r)!$ in the denominator cancels the unused "tail" of the factorial).

**Circular permutations**: when $n$ distinct items are arranged around a circle (not a line), rotating the entire arrangement produces what is considered the "same" arrangement (there's no fixed starting point). Fixing one item's position (to remove the redundant rotations) and arranging the remaining $n-1$ items relative to it gives $(n-1)!$ distinct circular arrangements — fewer than the $n!$ linear arrangements, because each circular arrangement corresponds to $n$ different linear ones (one for each rotation).

**Permutations with repetition allowed**: if items can be **reused** at each position (e.g. choosing a 4-digit PIN where digits can repeat), each of the $r$ positions independently has all $n$ options available — giving $n^r$ total arrangements, since nothing is "used up" between positions (contrast with $P(n,r)$, where the pool shrinks by one at each step).

**Permutations with identical (indistinguishable) objects**: if the $n$ items to be fully arranged are not all distinct — say there are $n_1$ copies of one type, $n_2$ of another, etc. (with $n_1+n_2+\cdots=n$) — then the naive $n!$ overcounts, since swapping two identical items produces an arrangement that looks the same but was counted as different. Dividing by $n_1!n_2!\cdots$ (the number of ways to permute the identical copies among themselves, for each type) corrects the overcount: $\frac{n!}{n_1!n_2!\cdots}$.

## Component 4 — Worked Examples

**Example 1 (LO1 — the basic formula, derived via the multiplication principle)**: How many ways can a race with 8 runners produce a 1st/2nd/3rd place finish (order matters)? $P(8,3) = \frac{8!}{5!} = 8\times7\times6 = 336$ — directly from the multiplication principle: 8 choices for 1st, 7 remaining for 2nd, 6 remaining for 3rd.

**Example 2 (LO2 — the three variants, contrasted directly)**: (a) *Circular*: seating 5 distinct people around a round table: $(5-1)! = 4! = 24$ (not $5!=120$, since rotating the whole table gives the "same" seating). (b) *Repetition allowed*: a 3-digit lock code using digits 0–9, digits allowed to repeat: $10^3=1000$ (each of the 3 positions independently has all 10 digits available — nothing is used up). (c) *Identical objects*: arranging the letters of the word "BANANA" (6 letters: 1 B, 3 A's, 2 N's): $\frac{6!}{1!\,3!\,2!} = \frac{720}{1\cdot6\cdot2}=60$ (dividing out the redundant orderings of the 3 identical A's and the 2 identical N's).

**Example 3 (LO3 — recognizing when order genuinely matters vs. doesn't, breaking MC-1)**: A teacher must select 3 students from a class of 10 to form a committee (no distinct roles — just "the committee," membership only) — **order does NOT matter** here (choosing Alice-then-Bob-then-Carol is the identical outcome as Bob-then-Carol-then-Alice: the same 3-person committee). This is genuinely **not** a permutation problem, even though it superficially resembles Example 1's runner scenario (also "picking 3 from a larger group") — the crucial difference is that Example 1 assigns distinct **roles** (1st/2nd/3rd place) to the 3 chosen runners, while this committee scenario assigns no roles at all. This exact distinction is what separates permutations ($P(n,r)$) from combinations, previewed here and formalized next in `math.disc.combinations`.

## Component 5 — Teaching Actions

### Teaching Action A01 — Deriving P(n,r) from the Multiplication Principle (Primitive P11: Representation Shift)

Physically arrange 3 labeled books on a shelf, counting choices at each position aloud: "3 choices for the first slot, then 2 left for the second, then 1 left for the third — $3\times2\times1=6$ arrangements." Shift to the symbolic formula via Example 1, showing $P(n,r)=n(n-1)\cdots(n-r+1) = \frac{n!}{(n-r)!}$ directly matches the sequential-choice count.

### Teaching Action A02 — Three Permutation Variants, Directly Contrasted (Primitive P06: Contrast Pair)

Work Example 2's three parts side by side: circular ($4!=24$, fewer than $5!$ because rotations collapse together), repetition-allowed ($10^3=1000$, more than $P(10,3)$ because nothing is used up), and identical-objects ("BANANA," $60$, fewer than $6!$ because indistinguishable letters are overcounted by the naive factorial). State: "each variant modifies the basic count in a specific, justified direction — fewer for circular and identical-objects (removing redundant duplicates), more for repetition-allowed (nothing shrinks the pool)."

- **MC-2 hook**: ask "for the BANANA problem, is the answer just $6!=720$?" — a "yes" answer reveals MC-2 (applying the basic permutation formula to a multiset of items without identical objects, without correcting for the indistinguishable repeats).

### Teaching Action A03 — Order Matters: the Defining Test (Primitive P28: Conflict Evidence)

Present Example 3's direct conflict: the committee-selection scenario looks superficially like Example 1's race-placement scenario (both "choose 3 from a larger group"), yet the committee case is **not** a permutation problem. State clearly: "always ask first: does swapping the order of the chosen items produce a genuinely DIFFERENT outcome? If yes (roles, rankings, positions) — permutation. If no (just membership) — it's a different kind of counting problem, coming next."

- **MC-1 hook**: ask "is every 'choose $r$ items from $n$' problem a permutation problem?" — a "yes" answer reveals MC-1 (treating "permutation" as synonymous with any selection-counting problem, rather than recognizing order-matters as the specific defining test).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. In how many ways can a president, vice-president, and treasurer be chosen from a club of 12 members (all three roles distinct, order matters)? Use the $P(n,r)$ formula.
  2. 6 distinct charms are to be arranged on a circular bracelet (rotations considered identical). How many distinct arrangements are possible?
  3. How many distinct arrangements are there of the letters in the word "MISSISSIPPI" (11 letters: 1 M, 4 I's, 4 S's, 2 P's)?
  4. A 4-character password uses only the letters A–Z, and letters ARE allowed to repeat. How many possible passwords are there? Explain why this is $26^4$ and not $P(26,4)$.
- **P76 (Transfer Probe, mode = independence)**: "A relay race team of 4 runners (Alex, Bianca, Carlos, Dana) needs to decide the order in which each runner runs their assigned leg of the race (1st leg, 2nd leg, 3rd leg, 4th leg). (a) Explain why this is a permutation problem, using the order-matters test from Example 3. (b) Compute the number of possible running orders. (c) Now suppose the coach instead just needs to pick which 2 of the 4 runners will attend a separate strategy meeting (no distinct roles — just attendance). Explain why this second scenario is NOT a permutation problem, even though it also involves 'choosing from the same 4 people.'"
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | PERMUTATION-ASSUMED-SYNONYMOUS-WITH-ANY-SELECTION | Treating any "choose $r$ from $n$" problem as a permutation problem, without checking whether order/role actually matters in the specific scenario | Foundational |
| MC-2 | IDENTICAL-OBJECTS-OVERCOUNTED-WITH-NAIVE-FACTORIAL | Applying the basic $n!$ (or $P(n,r)$) formula to a multiset containing indistinguishable items, without dividing out the redundant permutations of the identical copies | Foundational |
| MC-3 | CIRCULAR-PERMUTATION-COUNTED-AS-LINEAR | Applying the linear permutation count $n!$ to a circular arrangement problem, without recognizing that rotations of the same arrangement must be treated as identical | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Any-Selection-Is-Permutation Assumption") → P41 (detect: present the committee-selection scenario from Example 3 and ask whether it's a permutation problem) → P64 (conceptual shift: re-apply the order-matters test directly — "would swapping two chosen items give a different outcome here? If not, it isn't a permutation problem" — re-anchoring on the specific test rather than surface similarity to Example 1).
- **B02 (targets MC-2)**: P27 (name it: "Naive-Factorial Overcounting of Identical Objects") → P41 (detect: ask for the number of arrangements of "BANANA" and check whether the student answers $6!=720$ without adjustment) → P64 (conceptual shift: re-walk Example 2(c)'s division by $1!3!2!$, explaining concretely that swapping the two identical N's (or any two identical A's) produces an arrangement that LOOKS the same, so the naive count treats indistinguishable outcomes as distinct and must be corrected).
- **B03 (targets MC-3)**: P27 (name it: "Circular-Counted-as-Linear Error") → P41 (detect: ask for the number of ways to seat 4 people around a round table and check whether the student answers $4!=24$ without adjustment for rotation) → P64 (conceptual shift: physically rotate a small circular seating arrangement and show it "looks the same" from every rotation, then re-derive $(n-1)!$ by fixing one person's seat to eliminate the redundant rotations).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.disc.counting-principles` (the multiplication principle this formula is a repeated, sequential application of), `math.arith.multiplication` (the arithmetic this formula's computation directly requires).
- **Unlocks**: `math.disc.combinations` (the order-doesn't-matter counterpart, directly previewed and motivated by this blueprint's Example 3/MC-1 distinction).
- **Cross-link**: KG lists no cross-links for this concept.

## Component 8 — Teaching Notes

- estimated_hours = 4 with a developing/apply tag places this at a "3 TAs + gate" tier — A01 (basic formula derivation), A02 (three named variants), and A03 (the order-matters defining test) each target a distinct LO, appropriate for a concept covering one core formula plus three well-documented named special cases.
- Example 3's committee-selection scenario was deliberately designed to closely mirror Example 1's race-placement scenario in surface form (both "pick 3 people from a larger group") while differing in the one substantive way (roles vs. no roles) — this is the strongest possible way to force the order-matters test to be applied genuinely, rather than pattern-matched from surface similarity, and directly sets up `math.disc.combinations` as the concept that formalizes the no-roles case.
- The BANANA example (identical objects) was chosen over a more abstract description because word-letter-arrangement is the most commonly recognized illustration of this specific variant, and its answer (60) is small enough to sanity-check by direct listing if a student is skeptical of the formula.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (both) |
| V-4 | unlocks concepts named accurately from KG | PASS |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (empty in KG → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.9×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Concrete: physically arranging books before the factorial formula) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
