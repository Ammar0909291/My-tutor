# Teaching Blueprint: Mathematical Problem Solving (`math.found.problem-solving`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.found.problem-solving` |
| name | Mathematical Problem Solving |
| domain | Foundations |
| difficulty | foundational |
| bloom | apply |
| mastery_threshold | 0.7 → MAMR = ⌈0.7×5⌉ = 4/5 |
| estimated_hours | 10 |
| requires | `math.found.mathematical-thinking` |
| unlocks | `math.found.proof` |
| cross_links | none |
| CPA_entry_stage | C (Concrete) — a physical puzzle before naming the abstract strategies |
| description (KG) | The structured application of strategies — working backwards, drawing diagrams, reducing to simpler cases, and systematic trial — to resolve novel mathematical questions. |

## Component 1 — Learning Objectives

- LO1: Apply the strategy of **working backwards** — starting from the desired end state/goal and reasoning about what must have preceded it — to solve a problem where the forward path isn't obvious.
- LO2: Apply the strategies of **drawing a diagram** (converting an abstract or verbal problem into a visual representation revealing hidden structure) and **reducing to a simpler case** (solving a small/special version of the problem first to find a pattern or method that generalizes).
- LO3: Apply **systematic trial** (organized, exhaustive-but-efficient case-checking, as opposed to random guessing) to a problem, and correctly select WHICH strategy (or combination) is most appropriate for a GIVEN problem, recognizing that different problems call for different strategies.

## Component 2 — Prerequisite Check

Assumes mastery of `math.found.mathematical-thinking` (the general disciplined cognitive approach of reasoning precisely and identifying patterns — this concept applies that general disposition through four SPECIFIC, nameable strategies).

## Component 3 — Core Explanation

**Working backwards**: for problems where the END state is clearly specified but the path to it is unclear, start from the goal and ask "what step immediately before this would lead here?" — repeating until you reach the given starting information, then reverse the chain to get a forward solution.

**Drawing a diagram**: converting a verbal or abstract problem into a picture (a number line, a graph, a physical arrangement) often reveals structure — relationships, symmetries, or constraints — that are hard to see in words or symbols alone.

**Reducing to a simpler case**: when a problem seems too large or general to attack directly, solve a SMALLER or more SPECIAL version first (e.g. a specific small number instead of a general $n$) — the pattern or method discovered often generalizes directly to the full problem.

**Systematic trial**: when a problem requires checking multiple candidate answers/configurations, do so in an ORGANIZED way (e.g., a defined order, tracking what's been tried, using constraints to eliminate large groups of possibilities at once) — rather than haphazard, repeated, or incomplete guessing.

**Strategy selection**: no single strategy works for every problem — recognizing WHICH strategy (or combination) fits a given problem's structure is itself a core skill, developed through deliberate practice noticing which strategy "clicked" for which kind of problem.

## Component 4 — Worked Examples

**Example 1 (LO1 — working backwards)**: "A number is doubled, then 7 is added, then the result is divided by 3, giving 5. Find the original number." Work backwards from 5: undo "divided by 3" → multiply by 3: $5\times3=15$. Undo "added 7" → subtract 7: $15-7=8$. Undo "doubled" → divide by 2: $8/2=4$. Original number: 4. (Verify forward: $4\times2=8$, $+7=15$, $/3=5$ ✓.)

**Example 2 (LO2 — reducing to a simpler case)**: "How many diagonals does a 20-sided polygon have?" Rather than attacking $n=20$ directly, reduce to simpler cases: a quadrilateral ($n=4$) has 2 diagonals; a pentagon ($n=5$) has 5; a hexagon ($n=6$) has 9. Tabulating: $n=4\to2$, $n=5\to5$, $n=6\to9$ — noticing the pattern (each vertex connects to $n-3$ non-adjacent others, giving $\frac{n(n-3)}{2}$ total, dividing by 2 to avoid double-counting) generalizes directly: for $n=20$, diagonals $=\frac{20(17)}{2}=170$.

**Example 3 (LO3 — systematic trial and strategy selection, breaking MC-1)**: "Find two positive integers whose sum is 20 and whose product is maximized." A student might try RANDOM guesses (5 and 15? 8 and 12?) without system — instead, apply SYSTEMATIC trial: list pairs in order $(1,19),(2,18),(3,17),\ldots$ and compute each product ($19,36,51,\ldots$), noticing products increase as the pair gets closer to equal, peaking at $(10,10)$ with product 100 — an ORGANIZED search (checking pairs in a defined order, tracking the trend) reaches the answer efficiently, unlike unstructured guessing which might miss the pattern or stop too early.

## Component 5 — Teaching Actions

### Teaching Action A01 — Working Backwards and Simpler Cases, via a Physical Puzzle (Primitive P11: Representation Shift)

Start concrete: present a simple maze or a physical multi-step puzzle where the GOAL state is given but the start is hidden — physically trace backwards from the goal. State: "when the end is clear but the path isn't, reasoning BACKWARDS from the goal is often more direct than trying every forward path." Work Example 1's algebraic backwards-reasoning explicitly, undoing each operation in reverse order.

Shift to reducing-to-simpler-cases: work Example 2's diagonal-counting problem, building the small-$n$ table and generalizing the discovered pattern.

- **MC-1 hook**: present Example 3's sum-20 maximize-product problem and ask a student to "just try some numbers" — watch whether they proceed with RANDOM, untracked guesses versus an organized search, revealing MC-1 (treating "trial and error" as unstructured random guessing rather than a deliberately SYSTEMATIC search strategy).

### Teaching Action A02 — Systematic Trial vs. Random Guessing, and Strategy Selection (Primitive P06: Contrast Pair)

**Contrast 1 (targets MC-1)**: Place an unstructured random-guessing attempt at Example 3's problem (a few scattered pairs tried with no pattern-tracking) directly beside the systematic version (ordered pairs, tracked products, noticed trend). State the rule: "'trial' as a genuine problem-solving strategy means ORGANIZED, trend-tracking search — not scattered guessing hoping to get lucky."

**Contrast 2**: Present a short list of varied problems (a "doubled-then-added" reverse-engineering problem; a "count something for a huge case" problem; a geometric arrangement problem) and ask which strategy (working backwards, simpler cases, diagram, systematic trial) fits each BEST — reinforcing that strategy choice is itself a skill, matched to a problem's specific STRUCTURE (a clear end-goal suggests working backwards; an unwieldy general case suggests simpler cases first; spatial/relational problems suggest diagrams; multiple-candidate-checking suggests systematic trial).

### Teaching Action A03 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. "A number is tripled, then 4 is subtracted, then the result is squared, giving 64." Use working backwards to find the original number (note: consider both square roots of 64 when undoing the squaring step).
  2. Using the simpler-cases strategy, find a formula for the number of handshakes among $n$ people at a party (each pair shakes hands exactly once), by first working out $n=3,4,5$ and identifying the pattern.
  3. Using systematic trial, find two positive integers whose difference is 6 and whose product is minimized (organize your search rather than guessing randomly).
  4. For each of the following problems, identify which strategy (working backwards, diagram, simpler cases, systematic trial) is the BEST first approach, and briefly justify: (a) "A rope is folded in half 5 times — how many layers result?" (b) "Find the value of $x$ if reversing three described operations on $x$ gives 50."
- **P76 (Transfer Probe, mode = independence)**: "A city planner needs to determine the minimum number of security cameras to cover every hallway intersection in a newly designed building, given a complex hallway layout described only in a text document (no map yet). (a) Explain why DRAWING A DIAGRAM of the hallway layout would likely be the most valuable first strategy here, rather than attempting to reason about camera placement directly from the text description. (b) Once a diagram exists, the actual number of hallways is very large (50+) — explain how REDUCING TO A SIMPLER CASE (e.g., working out the minimum-cameras pattern for a much smaller test layout with just 4-6 intersections first) could reveal a general placement principle applicable to the full building."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | SYSTEMATIC-TRIAL-TREATED-AS-RANDOM-GUESSING | Treating "trial and error" as unstructured, untracked random guessing, rather than a deliberately organized, trend-tracking search strategy | Foundational |
| MC-2 | SINGLE-STRATEGY-APPLIED-REGARDLESS-OF-PROBLEM-STRUCTURE | Defaulting to one favored strategy (e.g. always trying systematic trial) regardless of whether a different strategy (e.g. working backwards) genuinely fits the problem's structure better | Moderate |
| MC-3 | WORKING-BACKWARDS-OPERATION-REVERSAL-ERROR | When working backwards, incorrectly reversing an operation (e.g. adding instead of subtracting, or forgetting a squaring step has two possible square roots to consider) | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Trial as Random Guessing") → P41 (detect: present a systematic-trial-appropriate problem and check whether the student's attempt is organized or scattered) → P64 (conceptual shift: work through Example 3's organized-vs-scattered contrast directly, showing the trend only becomes visible with a tracked, ordered search).
- **B02 (targets MC-2)**: P27 (name it: "Single-Strategy Overreliance") → P41 (detect: present a varied problem set and check whether the student applies the same strategy to every problem regardless of fit) → P64 (conceptual shift: work through the strategy-matching exercise from A02 Contrast 2, explicitly connecting each problem's structural features to its best-fit strategy).
- **B03 (targets MC-3)**: P27 (name it: "Operation Reversal Error") → P41 (detect: check a working-backwards attempt for correctly reversed operations at each step, especially operations like squaring that have multiple possible reversals) → P64 (conceptual shift: re-derive by verifying the FORWARD direction after solving backwards, confirming each undone step was reversed correctly).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.found.mathematical-thinking` (the general disciplined reasoning disposition this concept channels into four specific, nameable strategies).
- **Unlocks**: `math.found.proof` (constructing a mathematical proof draws directly on these problem-solving strategies — working backwards from a desired conclusion, reducing to base/simpler cases, as in induction).
- **Cross-link**: KG lists no cross-links for this concept.

## Component 8 — Teaching Notes

- estimated_hours = 10 with a foundational/apply tag places this at the "2 main TAs + gate" tier — A01 (working backwards and simpler cases, via a physical puzzle anchor) and A02 (systematic-vs-random trial contrast, plus strategy selection practice) jointly cover all three LOs, with the substantial hour count reflecting the breadth of four distinct strategies needing genuine practice rather than any single strategy's inherent difficulty.
- MC-1 (systematic trial treated as random guessing) was made this blueprint's central focus because "trial and error," in everyday usage, strongly connotes unstructured guessing — directly undermining the genuinely disciplined, pattern-tracking process this concept intends by "systematic trial," making an explicit correction essential before the strategy can be used productively.
- The security-camera transfer probe was deliberately designed to require TWO different strategies in sequence (diagram first, then reduce-to-simpler-case) rather than a single strategy in isolation, directly testing LO3's strategy-selection skill in a realistic, multi-stage problem-solving scenario rather than an artificially strategy-isolated exercise.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.found.mathematical-thinking`) |
| V-4 | unlocks concepts named accurately from KG | PASS |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (empty in KG → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A03) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.7×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Concrete: physical puzzle before naming strategies) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
