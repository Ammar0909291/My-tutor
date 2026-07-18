# Teaching Blueprint: Ordered Pair (`math.found.ordered-pair`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.found.ordered-pair` |
| name | Ordered Pair |
| domain | Foundations |
| difficulty | foundational |
| bloom | understand |
| mastery_threshold | 0.9 → MAMR = ⌈0.9×5⌉ = 5/5 |
| estimated_hours | 1 |
| requires | `math.found.set` |
| unlocks | `math.found.cartesian-product` |
| cross_links | none |
| CPA_entry_stage | C (Concrete) — labeled positions (first/second) before the equality rule |
| description (KG) | An ordered pair (a, b) is a pair of elements where the order matters: (a, b) = (c, d) iff a = c and b = d. |

## Component 1 — Learning Objectives

- LO1: Define an **ordered pair** $(a,b)$ as a pair of elements where **order matters**, and state the precise equality rule: $(a,b)=(c,d)$ **iff** $a=c$ **and** $b=d$ (both coordinates must match, in the corresponding position).
- LO2: Contrast an ordered pair $(a,b)$ with the **unordered** set $\{a,b\}$ (already known from `math.found.set`), correctly identifying that $(a,b)\neq(b,a)$ in general (when $a\neq b$), while $\{a,b\}=\{b,a\}$ always.
- LO3: Determine whether two given ordered pairs are equal by checking BOTH coordinate positions, and correctly conclude non-equality if even one coordinate position fails to match.

## Component 2 — Prerequisite Check

Assumes mastery of `math.found.set` (the definition of a set, and specifically its unordered, no-duplicates nature — the property this concept's ordered pair is deliberately built to NOT have).

## Component 3 — Core Explanation

An **ordered pair** $(a,b)$ consists of two elements, $a$ (the **first coordinate**) and $b$ (the **second coordinate**), where **order matters** — $(a,b)$ and $(b,a)$ are generally different objects (unless $a=b$).

**The precise equality rule**: $(a,b)=(c,d)$ **if and only if** $a=c$ **and** $b=d$ — both the first coordinates must match each other, AND the second coordinates must match each other, in their respective positions. It is not enough for $\{a,b\}$ and $\{c,d\}$ to contain the same elements in some order; the FIRST of one pair must equal the FIRST of the other, and likewise for the second.

**Contrast with sets**: a set $\{a,b\}$ is unordered — $\{a,b\}=\{b,a\}$ always (already established in `math.found.set`). An ordered pair deliberately breaks this symmetry: $(a,b)=(b,a)$ **only when** $a=b$; in general (when $a\neq b$), $(a,b)\neq(b,a)$ — these are two genuinely different ordered pairs, even though $\{a,b\}=\{b,a\}$ is the same set either way.

## Component 4 — Worked Examples

**Example 1 (LO1 — checking the equality rule)**: Is $(3,7)=(3,7)$? Yes — first coordinates match ($3=3$), second coordinates match ($7=7$). Is $(3,7)=(7,3)$? No — even though both "contain" 3 and 7, the first coordinate of the left pair is 3 but the first coordinate of the right pair is 7; $3\neq7$, so the pairs are NOT equal.

**Example 2 (LO2 — ordered pair vs. set, breaking MC-1)**: Is $\{4,9\}=\{9,4\}$? Yes — sets are unordered, same elements regardless of listing order. Is $(4,9)=(9,4)$? No — as an ordered pair, the first coordinates (4 vs. 9) don't match. This shows the exact same two numbers, 4 and 9, give one true equality as a SET and one false equality as an ORDERED PAIR — demonstrating these are genuinely different kinds of mathematical objects with different rules.

**Example 3 (LO3 — partial coordinate match is not enough)**: Is $(2,5)=(2,8)$? Check first coordinates: $2=2$. ✓ Check second coordinates: $5\stackrel{?}{=}8$. ✗ Since the SECOND coordinates fail to match (even though the first coordinates DO match), the pairs are **not equal** — a match in one position is not sufficient; both positions must agree.

## Component 5 — Teaching Actions

### Teaching Action A01 — Order Matters, via Labeled Positions (Primitive P11: Representation Shift)

Start concrete: "imagine a treasure map giving directions as '(3 steps east, 5 steps north)' — this is completely different from '(5 steps east, 3 steps north)'! The ORDER of the numbers tells you which direction gets which value." State: "an ordered pair $(a,b)$ works exactly like this — $a$ is always the FIRST coordinate, $b$ is always the SECOND, and swapping them generally changes the meaning entirely."

Shift to the formal equality rule: work Example 1, checking both coordinate positions explicitly for a matching pair and a swapped (non-matching) pair.

- **MC-1 hook**: ask "is $(4,9)$ the same as $(9,4)$, the same way $\{4,9\}$ is the same as $\{9,4\}$?" — an answer of "yes" reveals MC-1 (treating ordered pairs like sets, believing order doesn't actually matter for equality).

### Teaching Action A02 — Ordered Pair vs. Set, and Both Coordinates Must Match (Primitive P06: Contrast Pair)

**Contrast 1 (targets MC-1)**: Work Example 2 directly — the SAME two numbers (4 and 9) give a true equality as sets ($\{4,9\}=\{9,4\}$) but a FALSE equality as ordered pairs ($(4,9)\neq(9,4)$). State the rule explicitly: "sets don't care about order — you already knew this. Ordered pairs are a DIFFERENT kind of object, specifically built to care about order, with its own distinct equality rule."

**Contrast 2 (targets MC-2)**: Work Example 3 — a pair matching in the FIRST coordinate but not the second. Ask: "since the first coordinates matched, are the pairs equal?" — an incorrect "yes" reveals MC-2 (believing a partial coordinate match is sufficient for equality). State clearly: "BOTH coordinates must match — a single mismatched position, no matter which one, makes the pairs unequal."

### Teaching Action A03 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Is $(6,2)=(6,2)$? Is $(6,2)=(2,6)$? Justify each using the equality rule.
  2. Is $\{5,11\}=\{11,5\}$? Separately, is $(5,11)=(11,5)$? Explain why these two questions can have different answers.
  3. Is $(7,3)=(7,9)$? Identify specifically which coordinate(s) match and which don't.
  4. Give an example of two DIFFERENT numbers $a\neq b$ such that $(a,b)=(b,a)$ is actually possible, or explain why no such example exists.
- **P76 (Transfer Probe, mode = independence)**: "A game board's grid position is recorded as an ordered pair (column, row) — e.g. $(3,5)$ means column 3, row 5. (a) Using this lesson's equality rule, explain why the position $(3,5)$ and the position $(5,3)$ represent two DIFFERENT squares on the board, even though both involve the same two numbers, 3 and 5. (b) A separate game feature records which two players are currently 'linked' as a plain SET of player IDs, like $\{P_3,P_5\}$, where link direction doesn't matter. Explain, using this lesson's contrast between ordered pairs and sets, why representing grid positions as ordered pairs but player links as sets is the mathematically correct choice for each purpose."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | ORDERED-PAIR-TREATED-AS-SET | Believing $(a,b)=(b,a)$ always, treating ordered pairs like unordered sets rather than recognizing order matters for ordered-pair equality | Foundational |
| MC-2 | PARTIAL-COORDINATE-MATCH-ASSUMED-SUFFICIENT | Believing a match in ONE coordinate position (while the other differs) is enough to conclude two ordered pairs are equal | Foundational |
| MC-3 | EQUALITY-CONDITION-TREATED-AS-OR-RATHER-THAN-AND | Misreading the equality rule as "$a=c$ OR $b=d$" rather than the correct "$a=c$ AND $b=d$" (both conditions required simultaneously) | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Ordered Pair as Set Confusion") → P41 (detect: ask whether $(4,9)=(9,4)$) → P64 (conceptual shift: re-anchor on the treasure-map analogy — swapping which number is "east" and which is "north" changes the actual location, even though the two numbers involved are the same).
- **B02 (targets MC-2)**: P27 (name it: "Partial Match Sufficiency Assumption") → P41 (detect: present $(7,3)$ and $(7,9)$, both sharing the first coordinate, and ask if they're equal) → P64 (conceptual shift: re-anchor on "BOTH positions must match — a shared first coordinate says nothing about whether the second coordinates also agree").
- **B03 (targets MC-3)**: P27 (name it: "AND Misread as OR") → P41 (detect: ask a student to state the equality condition in their own words and check for "or" language) → P64 (conceptual shift: re-derive from the definition's precise wording — both conditions are required together, not either one alone).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.found.set` (the general notion of a collection of elements, which this concept deliberately modifies by adding an order requirement).
- **Unlocks**: `math.found.cartesian-product` (the Cartesian product $A\times B$ is defined as the set of ALL ordered pairs $(a,b)$ with $a\in A, b\in B$ — this concept's definition is the Cartesian product's entire building block).
- **Cross-link**: KG lists no cross-links for this concept.

## Component 8 — Teaching Notes

- estimated_hours = 1 with a foundational/understand tag places this at the corpus's smallest sizing tier — 2 main TAs (A01, A02) with no separate composite TA, matching the pattern of other h=1-2 foundational concepts in this corpus (e.g. `math.found.set-membership`).
- This concept was deliberately positioned, both pedagogically and in its Teaching Notes, as a direct CONTRAST concept against the already-taught `math.found.set` — every worked example and both teaching actions explicitly juxtapose ordered-pair behavior against already-familiar set behavior, since the single most valuable thing a learner can take from this lesson is recognizing WHEN order matters (ordered pairs, coordinates, sequences) versus WHEN it doesn't (sets, unordered collections) — a distinction with consequences reaching far beyond this one concept.
- MC-3 (AND misread as OR) was included even at this very early/foundational level because the equality definition's conjunctive structure ("$a=c$ AND $b=d$") is precisely the kind of precise logical statement students are first learning to parse carefully at this stage — an error here would compound into every future concept built on ordered pairs (Cartesian products, functions, coordinate geometry) if left unaddressed.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.found.set`) |
| V-4 | unlocks concepts named accurately from KG | PASS |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (empty in KG → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A03) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.9×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Concrete: labeled treasure-map positions before equality rule) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
