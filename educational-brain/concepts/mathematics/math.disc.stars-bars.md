# math.disc.stars-bars — Stars and Bars

## Identity
- **KG ID:** `math.disc.stars-bars`
- **Domain:** math.disc (Discrete Mathematics)
- **Requires:** `math.disc.combinations`
- **Unlocks:** (none in KG)
- **Cross-links:** (none)
- **Difficulty:** proficient
- **Bloom level:** apply
- **Mastery threshold:** 0.85 (MAMR 5/5)
- **Estimated hours:** 3

## Learning Objective
By the end of this concept, the student can: (1) apply the stars-and-bars technique to count the ways to distribute $n$ identical objects among $k$ distinct bins — $\binom{n+k-1}{k-1}$ unrestricted, $\binom{n-1}{k-1}$ when each bin must receive at least one object; (2) handle upper-bound restrictions by layering inclusion-exclusion on top of the basic formula; (3) translate word problems (integer equation solutions, distributing coins, filling orders) into the stars-and-bars framework by correctly identifying the "stars" (identical objects) and "bars" (bin dividers), and correctly distinguish this framework from problems involving DISTINCT objects, where it does not apply.

## Core Understanding
Stars-and-bars counts the number of ways to distribute $n$ IDENTICAL objects into $k$ DISTINCT bins (bins may be empty). Represent each distribution as a row of $n$ stars ($\star$) and $k-1$ bars ($|$): the bars divide the row into $k$ sections, and the number of stars in section $i$ is the count in bin $i$. Choosing which $k-1$ of the $n+k-1$ total symbol positions are bars determines the entire distribution, giving $\binom{n+k-1}{k-1}$ distributions — equivalently, this counts the non-negative integer solutions to $x_1+x_2+\cdots+x_k=n$.

The bar count is exactly $k-1$, not $k$: for $k$ bins arranged in a row, there is one divider between each ADJACENT pair of bins, so $k$ bins require exactly $k-1$ dividers — a genuine off-bin-boundaries-by-one fact that is easy to miscount without a concrete visualization (e.g. 3 bins in a row, $[\text{bin}_1 \mid \text{bin}_2 \mid \text{bin}_3]$, uses exactly 2 bars).

For the RESTRICTION that each bin receives at least 1 object: substitute $y_i=x_i-1\ge0$ for each bin. Then $\sum y_i = n-k$, and applying stars-and-bars to the $y_i$ (still $k$ bins, now distributing $n-k$ identical objects) gives $\binom{(n-k)+k-1}{k-1}=\binom{n-1}{k-1}$ — valid only when $n\ge k$.

Critically, stars-and-bars applies ONLY when the objects being distributed are INDISTINGUISHABLE. If the objects are DISTINCT (labeled), the correct count is instead the number of functions from the $n$ distinct objects to the $k$ bins, $k^n$ — a structurally different formula for a structurally different problem. Distinguishing "are the objects identical or distinct?" is a prerequisite question that must be answered before either formula is applied.

For UPPER-BOUND restrictions (each bin holds at most $u$ objects), inclusion-exclusion is layered on top of the basic formula: subtracting off, then correcting for overcounted, distributions where one or more bins exceed the bound.

## Mental Models
1. **Rung 1 — stars are the objects, bars are the dividers between bins.** A single row of $n+k-1$ symbols, of which choosing the $k-1$ bar positions fully determines the distribution.
2. **Rung 2 — $k$ bins need exactly $k-1$ bars.** One fewer bar than bins, since bars sit BETWEEN adjacent bins, not one per bin.
3. **Rung 3 — "at least 1 per bin" is solved by pre-filling each bin, then distributing the remainder freely.** The substitution $y_i=x_i-1$ literally represents giving each bin its mandatory one object first, then applying stars-and-bars to whatever remains.
4. **Rung 4 — identical objects use stars-and-bars; distinct objects use $k^n$ (functions).** These are TWO DIFFERENT counting frameworks for superficially similar-sounding "distribute objects into bins" problems, and the identical-vs-distinct question must be answered first, every time.

## Why Students Fail
The phrase "distributing objects among bins" sounds similar whether the objects are identical or distinct, and stars-and-bars is typically introduced immediately after permutations/combinations — so students transfer the technique to distinct-object problems without registering that the underlying counting structure is fundamentally different, not merely a variant. Separately, the at-least-one substitution ($y_i=x_i-1$, giving $n-k$) is easy to invert under pressure, adding $k$ to $n$ instead of subtracting it, since the algebra requires careful tracking of which direction the substitution runs. Finally, the bar count ($k-1$, not $k$) is a genuine off-by-one trap that resists intuition until a small concrete row is drawn out and the bars are physically counted.

## Misconceptions

### MC-1: STARS-BARS-FOR-DISTINCT-OBJECTS
- **Birth type:** Type 5 (instruction-induced) — foundational
- **Description:** The student applies $\binom{n+k-1}{k-1}$ when distributing DISTINCT (not identical) objects, forgetting the technique requires the objects to be INDISTINGUISHABLE; for distinct objects, each distribution is a function from the $n$ objects to the $k$ bins, giving $k^n$ arrangements instead.
- **Why this birth type:** Instruction-induced: stars-and-bars is taught immediately after permutations/combinations, and the surface framing ("distributing objects into bins") sounds similar across both problem types — the instructional sequencing itself does not flag that the applicable formula CHANGES FUNDAMENTALLY based on whether the objects are identical or distinct, a distinction that is easy to miss without deliberate emphasis.
- **Detection probe:** "How many ways can 3 distinct coins (each with a different serial number) be distributed among 4 piggy banks?" A student with MC-1 applies $\binom{3+3}{3}=\binom{6}{3}=20$ (the identical-objects formula) instead of the correct $4^3=64$ (the distinct-objects function count).
- **Repair:** State the general test explicitly: "would swapping two of the objects change the distribution?" If yes, the objects are distinct and stars-and-bars does NOT apply — use $k^n$ instead. Work both versions of the same scenario side by side (3 distinct coins: $4^3=64$; 3 identical coins: $\binom{6}{3}=20$) to make the divergence concrete.
- **Verification of death:** Given a novel distribution problem, the student's first move is to determine identical-vs-distinct before selecting a formula, and correctly applies $k^n$ when the objects are distinct.

### MC-2: AT-LEAST-ONE-MEANS-REPLACE-n-BY-n+1
- **Birth type:** Type 4 (notation-induced) — moderate
- **Description:** The student handles the "each bin has $\ge1$ object" constraint by ADDING 1 to $n$ instead of subtracting 1 from $n$, using $\binom{n+k}{k-1}$ instead of the correct $\binom{n-1}{k-1}$.
- **Why this birth type:** Notation-induced: the constraint is implemented via the substitution $y_i=x_i-1$, giving $\sum y_i=n-k$ — a manipulation that requires careful directional bookkeeping (each bin's mandatory unit is being REMOVED from the total before redistributing the remainder), and under pressure the sign of this adjustment is easy to invert, especially since "at least one MORE" intuitively (and incorrectly) suggests ADDING rather than pre-allocating and subtracting.
- **Detection probe:** "Distribute 7 identical cookies among 4 children, each getting at least 1." A student with MC-2 computes using $n+k=11$ instead of $n-k=3$, giving a substantially inflated (wrong) coefficient.
- **Repair:** Walk the substitution explicitly and concretely: "each child gets 1 cookie automatically first — that uses up $k$ of the $n$ cookies, leaving $n-k$ to distribute freely." Verify on a small case (n=2, k=2: $\binom{2-1}{1}=1$, matching the single valid distribution $(1,1)$ directly by listing).
- **Verification of death:** Given a novel at-least-one distribution problem, the student correctly computes $n-k$ before applying the stars-and-bars formula to the remainder.

### MC-3: BARS-COUNT-EQUALS-BINS-COUNT
- **Birth type:** Type 4 (notation-induced) — moderate
- **Description:** The student uses $k$ bars instead of $k-1$ bars when setting up the formula, deriving $\binom{n+k}{k}$ instead of the correct $\binom{n+k-1}{k-1}$.
- **Why this birth type:** Notation-induced: for $k$ bins, there is one divider BETWEEN each adjacent pair — $k-1$ dividers total — but the natural (and incorrect) instinct is to associate "one bar per bin" rather than "one bar per GAP between bins," an off-by-one error that seems genuinely counter-intuitive until a concrete row layout ($[\text{bin}_1\mid\text{bin}_2\mid\cdots\mid\text{bin}_k]$) is drawn and the bars are physically counted.
- **Detection probe:** "How many bars are needed to separate 4 distinct bins in a single row?" A student with MC-3 answers 4 instead of 3.
- **Repair:** Draw the concrete row layout for a small $k$ (e.g. $k=3$: $[\text{bin}_1\mid\text{bin}_2\mid\text{bin}_3]$) and have the student physically count the bars (exactly 2 for 3 bins). Generalize: "$k$ bins in a row have $k-1$ gaps between them, and each gap gets exactly one bar."
- **Verification of death:** Given the number of bins in a novel problem, the student correctly states the bar count as one fewer, without hesitation.

## Analogies
1. **The fence-posts-and-sections analogy.** Just as $k$ fence sections along a straight line require $k-1$ internal posts (the two ends need no post), $k$ bins in a row require $k-1$ internal dividing bars.
2. **The pre-paid-deposit analogy.** The at-least-one substitution is like requiring every bin to pay a mandatory "deposit" of 1 object up front; what's left to freely distribute is the remaining $n-k$ objects.

## Demonstrations
### Demonstration 1 — basic derivation and worked examples (mirrors Blueprint's A01)
Distributing $n=7$ identical cookies among $k=4$ children (any number per child, including zero): $\binom{7+3}{3}=\binom{10}{3}=120$. Same scenario with each child getting at least 1: $\binom{7-1}{3}=\binom{6}{3}=20$.

### Demonstration 2 — bar-count visualization, breaking MC-3 (mirrors Blueprint's A01 checkpoint)
For $n=3$, $k=2$: total symbols $=3+1=4$; arrange 1 bar among 4 positions: $\binom{4}{1}=4$ ways. Verified directly: $(0,3),(1,2),(2,1),(3,0)$ — exactly 4.

### Demonstration 3 — identical vs. distinct, breaking MC-1 (mirrors Blueprint's TB-R02)
Distributing 3 DISTINCT coins into 4 piggy banks: each coin independently chooses one of 4 banks, giving $4^3=64$ ways. Distributing 3 IDENTICAL coins into 4 banks: $\binom{3+3}{3}=\binom{6}{3}=20$ ways — a genuinely different, smaller count for the "same-sounding" problem with identical instead of distinct objects.

## Discovery Questions
1. "If you have 3 bins in a row and want to separate them with dividers, how many dividers do you actually need — one per bin, or one per gap between bins?"
2. "If every bin must receive at least 1 object before any distribution happens, how many objects are 'used up' before the remaining ones can be freely distributed?"
3. "Would the distribution change if you swapped two of the objects being distributed? What does your answer tell you about whether stars-and-bars applies here?"

## Teaching Sequence
Best taught by **direct instruction of the derivation with an embedded discovery moment for the identical-vs-distinct test** — the stars-and-bars encoding itself (row of symbols, choose bar positions) is a specific representational trick best demonstrated directly rather than discovered, but the identical-vs-distinct distinguishing test (Discovery Question 3) is worth having the student articulate in their own words before being told the rule, since it is the single highest-value guard against MC-1.
1. Derive the basic formula directly (Demonstration 1), with the row-of-symbols encoding shown concretely.
2. Work Demonstration 2's bar-count visualization explicitly, counting bars aloud for a small case.
3. Pose Discovery Question 3 and let the student propose their own swap-test before confirming the identical-vs-distinct framework (Demonstration 3).
4. Work the at-least-one substitution (Demonstration 1's second example) with the deposit framing from Discovery Question 2.
5. Introduce upper-bound restrictions as "inclusion-exclusion layered on top" at orientation level, deferring full development to `math.disc.inclusion-exclusion`.
6. Assess with the P77 problem set and transfer probe.

## Tutor Actions
1. **On a new distribution word problem:** always ask "are the objects identical or distinct?" as the FIRST question, before any formula is applied.
2. **On an at-least-one constraint:** have the student state the substitution direction in words ("each bin pre-pays 1 object, leaving $n-k$ to distribute") before writing the formula.
3. **On a bar-count setup:** require the student to draw or describe the row layout for a small case and physically count the bars before generalizing to the symbolic formula.
4. **On an upper-bound restriction:** name it explicitly as "inclusion-exclusion layered on top of stars-and-bars" and keep the treatment orientation-level, deferring the full technique to its own concept.

## Voice Teaching Notes
1. **Register:** concrete and visual — stars-and-bars is fundamentally a representational trick, and the tutor's language should lean on the row-of-symbols picture at every step rather than abstract symbolic manipulation alone.
2. **Load-bearing sentence, spoken slowly:** "$k$ bins need $k-1$ bars — one bar per GAP between bins, not one per bin."
3. **Wait time:** pause after asking "identical or distinct?" on every new problem, until this becomes an automatic first check rather than an afterthought.

## Assessment Signals
1. **Gate concept:** correctly applies $\binom{n+k-1}{k-1}$ to a novel unrestricted identical-objects-into-distinct-bins problem.
2. **At-least-one accuracy:** correctly applies $\binom{n-1}{k-1}$ (subtracting, not adding, $k$) to a novel at-least-one-per-bin problem.
3. **Bar-count accuracy:** correctly states the bar count as one fewer than the bin count for a novel bin configuration.
4. **Identical-vs-distinct discrimination:** correctly distinguishes stars-and-bars-applicable problems from $k^n$-applicable problems using the swap test.
5. **Transfer:** applies the technique in a genuinely novel context (e.g. lattice-path counting or a generating-function connection) with correctly-identified stars, bars, and constraints.

## Tutor Recovery Strategy
If the student consistently confuses identical and distinct objects, do not simply restate the rule — walk BOTH versions of the exact same scenario side by side (as in Demonstration 3) until the numerical divergence itself becomes the anchor. If the student miscounts bars, physically draw and count a small concrete case every time until the $k-1$ relationship becomes automatic rather than a memorized fact.

## Memory Hooks
1. "$k$ bins, $k-1$ bars — one bar per gap, not per bin."
2. "At least one per bin: subtract $k$ from $n$, don't add it."
3. "Identical objects: stars-and-bars. Distinct objects: $k^n$."

## Transfer Connections
- **`math.disc.combinations`:** the $\binom{n}{r}$ formula this technique's final counting step directly applies (choosing bar positions among total symbol positions).
- **`math.disc.inclusion-exclusion`:** the technique layered on top of stars-and-bars to handle upper-bound restrictions.
- **`math.disc.combinatorics`:** the broader bijective-reasoning framework this technique exemplifies (a row-of-symbols bijection to distribution counts).

## Cross-Subject Connections
- **Computer Science (resource allocation):** stars-and-bars directly models distributing a fixed pool of identical resources (memory blocks, time slots) among distinct processes or users.
- **Chemistry (combinatorial chemistry, isotope distribution):** distributing identical particles (e.g. indistinguishable isotopic atoms) among distinct molecular sites follows the identical-objects-distinct-bins framework directly.

## Blueprint References
- Primary source: `docs/curriculum/blueprints/math.disc.stars-bars.md` — reused by reference throughout (Learning Objective, worked examples, misconception inventory MC-1–MC-3 with birth types already assigned in the Blueprint itself and confirmed independently here, transfer probe). Not restated verbatim; this entry adds the mental-model ladder, analogies, discovery-vs-direct-instruction argument, voice teaching notes, and cross-subject connections per `EDUCATIONAL_BRAIN_STANDARD.md`'s ownership boundary.

## Runtime Asset References
- No AssetIdentity rows exist for this concept yet (Layer 3/7 DB-backed assets are populated separately, by live LLM generation plus admin review or by deliberate seed-script batches — never by this authoring layer). This entry is Layer 1/2 content only.

## Curriculum Feedback
- No genuine Blueprint/KG metadata discrepancy found — requires, unlocks, cross_links, difficulty, bloom, mastery_threshold, and estimated_hours all match the live KG exactly.
- Like `math.disc.pigeonhole`'s Blueprint, this Blueprint already assigns birth-type classifications to each misconception (Type 5, Type 4, Type 4) — independently confirmed and adopted directly in this entry.
- No genuine content-overlap was found with sibling entries — this entry's upper-bound-restriction treatment is deliberately kept at orientation level, explicitly deferring full development to `math.disc.inclusion-exclusion`, mirroring the same division-of-labor discipline established in `math.disc.combinatorics`'s survey of its own named children.

## Version History
- **Batch 19** (2026-09-11): initial authoring, part 3 of 5 this batch (with `math.disc.combinatorics`, `math.disc.pigeonhole`, `math.disc.inclusion-exclusion`, `math.disc.binomial-theorem`). Blueprint reused by reference, including its own already-assigned birth-type classifications (MC-1 Type 5 foundational, MC-2 Type 4 moderate, MC-3 Type 4 moderate), independently confirmed.
