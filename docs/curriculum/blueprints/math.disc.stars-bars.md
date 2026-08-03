# Teaching Blueprint: Stars and Bars (`math.disc.stars-bars`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.disc.stars-bars` |
| name | Stars and Bars |
| domain | Discrete Mathematics |
| difficulty | proficient |
| bloom | apply |
| mastery_threshold | 0.85 → MAMR = ⌈0.85×5⌉ = 5/5 |
| estimated_hours | 3 |
| requires | `math.disc.combinations` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | P (Pictorial) — literal star/bar diagrams before symbolic formula application |
| description (KG) | The number of ways to place n identical balls into k distinct bins is C(n+k−1, k−1). Models solutions to x₁+x₂+⋯+xₖ=n in non-negative integers. With at-least-one constraint: C(n−1, k−1).

 |

## Component 1 — Learning Objectives

- LO1: Compute the number of ways to distribute $n$ identical items into $k$ distinct bins (non-negative integer solutions to $x_1+\cdots+x_k=n$) using $\binom{n+k-1}{k-1}$.
- LO2: Adapt the formula for the AT-LEAST-ONE-PER-BIN constraint (positive integer solutions), using $\binom{n-1}{k-1}$ instead.
- LO3: Correctly translate a stars-and-bars diagram (a row of stars and dividing bars) into the underlying counting argument — WHY the formula counts arrangements of stars and bars rather than direct distributions.

## Component 2 — Prerequisite Check

Assumes mastery of `math.disc.combinations` (the binomial coefficient this technique's formula is built from).

## Component 3 — Core Explanation

**Stars and bars** counts the number of ways to write $n$ identical items (stars) distributed among $k$ distinct bins, equivalently the number of non-negative integer solutions to $x_1+x_2+\cdots+x_k=n$. The technique represents a distribution as a row of $n$ stars and $k-1$ bars (dividers separating the bins): e.g. $\star\star\,|\,\star\,|\,\,|\,\star\star\star$ represents $x_1=2,x_2=1,x_3=0,x_4=3$ for $k=4$ bins. The total arrangement has $n+k-1$ symbols (stars plus bars), and choosing WHICH $k-1$ of these $n+k-1$ positions are bars (the rest being stars) determines the distribution uniquely — giving $\binom{n+k-1}{k-1}$ total arrangements.

If each bin must receive AT LEAST ONE item (positive integer solutions), first give each bin one item automatically (using up $k$ of the $n$ items), then distribute the remaining $n-k$ items with no constraint: $\binom{(n-k)+k-1}{k-1}=\binom{n-1}{k-1}$.

## Component 4 — Worked Examples

**Example 1 (LO1, LO3 — basic non-negative distribution)**: How many ways to distribute $5$ identical candies among $3$ children (some may get none)? This is $\binom{5+3-1}{3-1}=\binom{7}{2}=21$. Visualize: $5$ stars, $2$ bars, arranged in a row of $7$ symbols — choosing which $2$ of the $7$ positions are bars determines the split.

**Example 2 (LO2 — at-least-one constraint, breaking MC-1)**: How many ways to distribute $5$ identical candies among $3$ children, each receiving AT LEAST ONE? First give each child $1$ candy (using $3$ of the $5$), leaving $2$ candies to distribute freely among $3$ children: $\binom{2+3-1}{3-1}=\binom{4}{2}=6$. A common error applies the UNCONSTRAINED formula directly to the original numbers ($\binom{5+3-1}{3-1}=21$) without first subtracting one item per bin, silently ignoring the at-least-one requirement entirely.

**Example 3 (LO1 — connecting the equation form to the bin form)**: The equation $x_1+x_2+x_3+x_4=10$ (non-negative integers) has the same count as distributing $10$ identical items into $4$ bins: $\binom{10+4-1}{4-1}=\binom{13}{3}=286$ solutions. Recognizing that "number of solutions to this equation" and "number of ways to distribute items into bins" are the SAME counting problem (just described differently) is the key translation skill.

## Component 5 — Teaching Actions

### Teaching Action A01 — Stars and Bars as a Row of Symbols to Choose From (Primitive P11: Representation Shift)

Work Example 1 with an explicit diagram — drawing the 7-symbol row and physically marking a few different valid bar placements to show how each corresponds to a different distribution — before connecting to the symbolic $\binom{7}{2}$ computation.

### Teaching Action A02 — At-Least-One Requires Pre-Distributing First (Primitive P06: Contrast Pair)

Work Example 2's correct two-step process (give one to each bin first, THEN distribute the remainder freely) against the flawed direct application of the unconstrained formula. State the rule: "an at-least-one-per-bin constraint is handled by first 'paying' the minimum to each bin, then applying the ordinary stars-and-bars formula to whatever remains."

- **MC-1 hook**: this contrast directly targets MC-1 (skipping the pre-distribution step) by showing the numeric mismatch (21 vs. the correct 6).

### Teaching Action A03 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.85×5⌉ = 5/5.

- **P77 (4-problem set)**:
  1. Find the number of non-negative integer solutions to $x_1+x_2+x_3=8$.
  2. Find the number of ways to distribute 12 identical stickers among 5 children so each gets at least one.
  3. Find the number of non-negative integer solutions to $x_1+x_2+x_3+x_4+x_5=6$.
  4. Explain, in one sentence, why the formula for the at-least-one-per-bin case uses $n-1$ instead of $n+k-1$ in the top of the binomial coefficient.
- **P76 (Transfer Probe, mode = independence)**: "A bakery has 20 identical cupcakes to pack into 6 distinct gift boxes for a promotion, and wants every box to contain at least one cupcake (so no box looks 'skipped'). (a) Determine the number of ways to distribute the cupcakes under this constraint, showing the pre-distribution step explicitly. (b) A marketing intern instead computes $\binom{20+6-1}{6-1}=\binom{25}{5}$ directly — explain precisely what real-world scenario this alternative computation WOULD correctly count, and why it does not match the promotion's actual requirement."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | AT-LEAST-ONE-CONSTRAINT-IGNORED | Applying the unconstrained non-negative-solutions formula directly to an at-least-one-per-bin problem, without first pre-distributing one item to each bin | Foundational |
| MC-2 | STARS-AND-BARS-COUNT-MISCOMPUTED | Using the wrong total symbol count or wrong number of bars in the binomial coefficient (e.g. using $k$ instead of $k-1$ bars) | Foundational |
| MC-3 | DISTINGUISHABLE-ITEMS-TREATED-AS-IDENTICAL | Applying stars-and-bars to a scenario where the items being distributed are actually DISTINGUISHABLE (which would require a different counting method entirely, not this formula) | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("At-Least-One Constraint Ignored") → P41 (detect: present Example 2 and check whether the pre-distribution step is applied) → P64 (conceptual shift: re-derive step by step — "give each of the $k$ bins 1 item first, using $k$ of the $n$ items, THEN distribute the remaining $n-k$ freely").
- **B02 (targets MC-2)**: P27 ("Stars and Bars Count Miscomputed") → P41 (detect: review a submitted binomial coefficient setup for the wrong number of bars) → P64 (conceptual shift: re-derive by physically counting the bars needed to create $k$ bins — always exactly $k-1$ dividers).
- **B03 (targets MC-3)**: P27 ("Distinguishable Items Treated as Identical") → P41 (detect: present a scenario with distinguishable items and ask whether stars-and-bars applies) → P64 (conceptual shift: clarify that stars-and-bars specifically requires IDENTICAL items — distinguishable items require a different technique, since swapping two distinguishable items between bins creates a genuinely different arrangement, unlike swapping two identical stars).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.disc.combinations`.
- **Unlocks**: none recorded in the KG.
- **Related**: none declared.

## Component 8 — Teaching Notes

- estimated_hours = 3 reflects that this concept applies the already-mastered combinations formula to a new, specific counting scenario, with the genuine new content being the stars-and-bars translation technique itself.
- MC-1 was ranked most severe because it is the single most common error pattern in applied stars-and-bars problems (which very frequently include an at-least-one-style constraint in realistic phrasing), and it silently produces a plausible-looking but substantially wrong count.
- The cupcake transfer probe's part (b) was deliberately designed to require identifying what a DIFFERENT (unconstrained) computation would actually mean, rather than simply flagging it as "wrong" — testing genuine understanding of both formulas' distinct scope, not just recall of which one to use by default.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.disc.combinations`) |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
| V-5 | cross_links checked against disk | PASS (none declared) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A03) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.85×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Pictorial: star/bar diagrams before symbols) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1/LO3, Ex2→LO2, Ex3→LO1) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
