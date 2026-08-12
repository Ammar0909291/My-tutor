# Teaching Blueprint: Problem-Solving Strategies (`math.found.problem-solving-strategies`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.found.problem-solving-strategies` |
| name | Problem-Solving Strategies |
| domain | Foundations |
| difficulty | foundational |
| bloom | apply |
| mastery_threshold | 0.70 → MAMR = ⌈0.70×5⌉ = 4/5 |
| estimated_hours | 6 |
| requires | `math.found.problem-solving` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | P (Pictorial) — diagram-drawing is the first strategy demonstrated, before naming the full repertoire |
| description (KG) | A repertoire of techniques including drawing diagrams, working backwards, finding a simpler related problem, looking for symmetry, and exhaustive case analysis. |

## Component 1 — Learning Objectives

- LO1: Select an appropriate heuristic (diagram, work-backwards, simpler-related-problem, symmetry, exhaustive cases) for a given unfamiliar problem, justifying the choice.
- LO2: Apply the **work-backwards** strategy to a problem whose GOAL state is easy to state but whose START state is not directly reachable by forward reasoning.
- LO3: Apply the **simpler-related-problem** strategy — replace a hard problem's parameters with small/special values, solve that, then generalize the pattern back to the original.

## Component 2 — Prerequisite Check

Assumes mastery of `math.found.problem-solving` (the general four-phase problem-solving process: understand, plan, execute, review) — this concept furnishes the CONTENT of the "plan" phase with a concrete, named toolkit.

## Component 3 — Core Explanation

A **heuristic** is a strategy that often helps but is not guaranteed to work — unlike an algorithm, it requires judgment about when to apply it. Five core heuristics:

1. **Draw a diagram** — externalize the problem's structure visually so hidden relationships become visible.
2. **Work backwards** — start from the desired end-state and ask "what step would immediately produce this?", repeating until the start state is reached.
3. **Solve a simpler related problem** — replace an intractable general case with small/special numbers, find the pattern, then re-apply it to the original.
4. **Look for symmetry** — exploit a problem's symmetric structure to eliminate cases or pair up quantities that must be equal.
5. **Exhaustive case analysis** — partition all possibilities into a finite, non-overlapping list of cases and resolve each directly (formalized later as `math.found.proof-by-cases`).

No single heuristic dominates; expert problem-solvers try several in sequence, abandoning one that stalls for another.

## Component 4 — Worked Examples

**Example 1 (LO2 — work backwards)**: "A number is doubled, then 6 is added, then the result is halved, giving 11. What was the original number?" Working backwards from 11: undo "halved" → 22; undo "add 6" → 16; undo "doubled" → 8. Verify forward: 8×2=16, +6=22, ÷2=11. ✓

**Example 2 (LO3 — simpler related problem)**: "How many diagonals does a convex 100-gon have?" Too large to draw. Simplify: a 4-gon (square) has 2 diagonals; a 5-gon has 5; a 6-gon has 9. Pattern: for $n$-gon, diagonals $=\frac{n(n-3)}{2}$ (each vertex connects to $n-3$ non-adjacent vertices, divided by 2 for double-counting). Apply to $n=100$: $\frac{100\times97}{2}=4850$.

**Example 3 (LO1 — strategy selection, breaking MC-1)**: Given "Find the sum $1+2+3+\cdots+99$," a student who reaches for exhaustive case analysis (100 separate additions) has picked an inefficient heuristic; pairing $1+99, 2+98,\ldots$ (symmetry) or the simpler-problem pattern (sum of $1$ to $n$ for small $n$) resolves it in one insight — illustrating that heuristic CHOICE, not effort, is the deciding factor.

## Component 5 — Teaching Actions

### Teaching Action A01 — Work Backwards from a Stated Goal (Primitive P64: Conceptual Shift)

Present Example 1. Model the "undo" chain explicitly, narrating: "when the forward operations are known but the start is unknown, invert each step in reverse order." Have the student verify by running the recovered start value forward.

- **MC-1 hook**: pose Example 3's sum-of-99 problem and observe whether the student defaults to brute-force addition (revealing MC-1: treating "more effort/more steps" as the strategy, rather than searching for a smarter-fitting heuristic first).

### Teaching Action A02 — Simplify, Find the Pattern, Generalize (Primitive P06: Contrast Pair)

Work Example 2 in full: table the diagonal counts for $n=4,5,6$, derive the formula, then apply it at $n=100$ — a scale where direct counting is infeasible, making the strategy's payoff concrete. Contrast against attempting the 100-gon directly (infeasible by hand) to reinforce WHY simplification-first is the efficient path.

### Teaching Action A03 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.70×5⌉ = 4/5.

- **P77 (4-problem set)**:
  1. "A shape is folded in half, then in half again, then unfolded — 4 creases show. Working backwards, how many layers of paper existed just before the final unfold?" (work-backwards)
  2. "Find the sum of the first 20 odd numbers" using the simpler-related-problem strategy (try $n=1,2,3$ first, spot the pattern $n^2$).
  3. Given a problem statement, identify which ONE of the five heuristics is the best fit and justify the choice in one sentence.
  4. "A frog is at the bottom of a 10 m well, climbing 3 m by day and slipping 2 m by night. On which day does it first reach the top?" — select and apply an appropriate strategy.
- **P76 (Transfer Probe, mode = independence)**: "A librarian must shelve 63 books such that each shelf holds the same number and no shelf holds more than 10. Using the simpler-related-problem heuristic, determine the shelving arrangement(s) that work, and explain why testing small divisor patterns is faster than checking all possibilities from 1 to 63 directly."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | EFFORT-SUBSTITUTED-FOR-STRATEGY | Defaulting to brute-force/exhaustive computation as a first resort rather than searching for a better-fitting heuristic | Moderate |
| MC-2 | WORK-BACKWARDS-STEPS-NOT-INVERTED | When working backwards, applying the same (forward) operations instead of their inverses at each step | Moderate |
| MC-3 | PATTERN-GENERALIZED-FROM-ONE-CASE | Inferring a general formula from a single simplified instance instead of checking at least 2-3 small cases before generalizing | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Effort Without Strategy") → P41 (detect: present a problem solvable in one insight via symmetry or simplification; watch for brute-force attempts) → P64 (conceptual shift: re-solve Example 3's sum via pairing, contrasting the operation count against brute addition).
- **B02 (targets MC-2)**: P27 ("Un-Inverted Backwards Step") → P41 (detect: ask the student to narrate each backwards step in Example 1; check whether "doubled" is undone by halving or by doubling again) → P64 (re-walk Example 1 explicitly naming each operation's inverse).
- **B03 (targets MC-3)**: P27 ("Single-Case Overgeneralization") → P41 (detect: ask for the diagonal formula after computing only $n=4$) → P64 (require checking $n=5,6$ before accepting the pattern, per Example 2's full three-point derivation).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.found.problem-solving` (the four-phase process this concept's five named heuristics populate).
- **Unlocks**: none recorded in the KG; the heuristics here are referenced informally by later proof-technique concepts (e.g. `math.found.proof-by-cases` formalizes exhaustive case analysis) but carry no formal `requires` edge.
- **Related**: `math.found.proof` (heuristics here are pre-formal; `math.found.proof` introduces the rigor these strategies eventually feed into).

## Component 8 — Teaching Notes

- estimated_hours = 6 reflects five distinct heuristics needing individual practice; this blueprint's two Teaching Actions focus on the two heuristics (work-backwards, simplify-and-generalize) most prone to the registered misconceptions, with the remaining three (diagram, symmetry, exhaustive cases) reinforced through the P77 problem set's varied item types rather than dedicated TAs.
- MC-1 was ranked most severe because it undermines the entire point of this concept — a learner who always brute-forces has not actually adopted a heuristic-selection mindset, even if individual answers come out correct.
- bloom=apply (not create) reflects that this concept trains RECOGNIZING and APPLYING known heuristics to new problems, not inventing novel strategies — that is `math.found.mathematical-modeling`'s territory.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.found.problem-solving`) |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
| V-5 | cross_links checked against disk | PASS (none declared) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A03) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.70×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Pictorial: diagram-drawing first) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO2, Ex2→LO3, Ex3→LO1) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
