# Teaching Blueprint: Countable Set (`math.found.countable-set`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.found.countable-set` |
| name | Countable Set |
| domain | Foundations |
| difficulty | developing |
| bloom | analyze |
| mastery_threshold | 0.80 → MAMR = ⌈0.80×5⌉ = 4/5 |
| estimated_hours | 4 |
| requires | `math.found.cardinality`, `math.found.natural-numbers` |
| unlocks | `math.found.uncountable-set` |
| cross_links | (none) |
| CPA_entry_stage | A (Abstract) |
| description (KG) | A set that is either finite or can be placed in bijection with the natural numbers ℕ; examples include ℤ and ℚ. |
| related | `math.found.uncountable-set` |
| aliases | enumerable set, countably infinite |

## Component 1 — Learning Objectives

- LO1: Define a **countable set** as one that is either finite or in bijection with $\mathbb{N}$, and define **countably infinite** as the specific case of infinite-but-countable.
- LO2: Construct (or describe) an explicit bijection or enumeration scheme showing a given infinite set is countable, even when the set appears "larger" than $\mathbb{N}$ at first glance (e.g. $\mathbb{Z}$).
- LO3: Recognize that countability is NOT about a set's apparent "size" or whether it contains $\mathbb{N}$ as a subset, but strictly about the existence of a bijection.

## Component 2 — Prerequisite Check

Assumes mastery of `math.found.cardinality` and `math.found.natural-numbers` ($\mathbb{N}$, the benchmark set countability is measured against).

## Component 3 — Core Explanation

A set $A$ is **countable** if it is either finite (per `math.found.finite-set`) or **countably infinite** — meaning a bijection exists between $A$ and $\mathbb{N}=\{0,1,2,\ldots\}$ (or equivalently $\{1,2,3,\ldots\}$, depending on convention). A bijection means every element of $A$ can be assigned a UNIQUE natural-number "position" such that every natural number is used exactly once and every element of $A$ gets exactly one position — an ENUMERATION, $a_1,a_2,a_3,\ldots$, that eventually lists every element.

Countability is often surprising: a set can be countable even if it seems to properly contain $\mathbb{N}$ multiple times over (like $\mathbb{Z}$, or $\mathbb{Q}$), because what matters is purely whether SOME enumeration scheme exists, not the set's apparent structural size.

## Component 4 — Worked Examples

**Example 1 (LO2 — enumerating the integers, breaking MC-1)**: $\mathbb{Z}=\{\ldots,-2,-1,0,1,2,\ldots\}$ seems "twice as big" as $\mathbb{N}$ (it has both positive and negative numbers). Yet an explicit bijection exists: enumerate as $0,1,-1,2,-2,3,-3,\ldots$ — assign position $1\to0$, $2\to1$, $3\to-1$, $4\to2$, $5\to-2,\ldots$ (even positions get positive integers, odd positions after the first get negative integers). Every integer eventually appears at some finite position, and no position is skipped — $\mathbb{Z}$ is countably infinite.

**Example 2 (LO2, LO3 — enumerating the rationals via a diagonal scheme)**: $\mathbb{Q}$ (rationals) seems vastly "denser" than $\mathbb{N}$ — between any two rationals lies another. Yet Cantor's diagonal enumeration lists all positive rationals $p/q$ by traversing diagonals of increasing $p+q$ (skipping any repeated value, like $2/2=1/1$), producing a genuine enumeration $1/1, 2/1, 1/2, 1/3, 3/1, \ldots$ that eventually reaches every positive rational — confirming $\mathbb{Q}$ is countable, despite density suggesting otherwise.

**Example 3 (LO1, LO3 — the size intuition explicitly broken)**: A student might reason "$\mathbb{Z}$ contains $\mathbb{N}$ as a proper subset PLUS all the negative numbers, so $\mathbb{Z}$ must be strictly bigger." This intuition, correct for FINITE sets, fails for infinite sets: Example 1's bijection shows $|\mathbb{Z}|=|\mathbb{N}|$ exactly — "one set properly contains another" does NOT imply "the containing set is strictly larger" once sets are infinite.

## Component 5 — Teaching Actions

### Teaching Action A01 — Construct an Explicit Enumeration (Primitive P64: Conceptual Shift)

Work Example 1 in full, building the zig-zag enumeration of $\mathbb{Z}$ step by step and verifying the first several assigned positions explicitly, confirming no integer is skipped and none is assigned twice.

- **MC-1 hook**: ask "is $\mathbb{Z}$ bigger than $\mathbb{N}$, since it contains all of $\mathbb{N}$ plus the negative numbers?" before revealing the bijection (revealing MC-1: applying the finite-set intuition "proper superset implies strictly larger" to infinite sets, where it fails).

### Teaching Action A02 — Density Does Not Prevent Countability (Primitive P06: Contrast Pair)

Contrast the intuitive expectation (rationals are "dense," surely uncountable) against Example 2's actual diagonal enumeration, which concretely lists them in a definite order. State the rule: "whether a set 'feels' larger, denser, or more complex is irrelevant — countability is settled purely by whether SOME enumeration scheme can be constructed, however clever it needs to be."

### Teaching Action A03 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.80×5⌉ = 4/5.

- **P77 (4-problem set)**:
  1. Describe an explicit bijection (enumeration) between $\mathbb{N}$ and the set of even natural numbers $\{0,2,4,6,\ldots\}$, and explain why this shows the even numbers are countable despite being a proper subset of $\mathbb{N}$.
  2. State whether the union of two countable sets is always countable (yes), and sketch, in general terms, why an interleaving enumeration scheme (alternating between the two sets' own enumerations) would work.
  3. Explain, in one paragraph, why "a set is countable" does not mean "a set is small" — connect to Example 3's broken intuition.
  4. Given that $\mathbb{N}$ and $\mathbb{Z}$ are both countably infinite, state whether they therefore have the SAME cardinality, and justify using the bijection definition.
- **P76 (Transfer Probe, mode = independence)**: "A hotel has infinitely many rooms, numbered $1,2,3,\ldots$, all currently full (this is the classical 'Hilbert's Hotel' scenario). (a) A new guest arrives. Using an enumeration-shifting idea analogous to this lesson's bijection constructions, describe how the hotel could accommodate the new guest without evicting anyone, by having every existing guest move to a new room. (b) Explain why this is only possible because the hotel's room set is COUNTABLY infinite (in bijection with $\mathbb{N}$) — connect your answer to why the same trick could not obviously work for an uncountable set of rooms (you do not need to have studied uncountability formally yet — simply state, informally, why a genuine bijection-based reshuffling needs the countable structure)."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | PROPER-SUPERSET-ASSUMED-STRICTLY-LARGER-FOR-INFINITE-SETS | Applying the finite-set intuition "a proper superset is strictly bigger" to infinite sets, where a proper superset can have the exact same cardinality | Foundational |
| MC-2 | DENSITY-CONFUSED-WITH-UNCOUNTABILITY | Assuming a "dense" set (like $\mathbb{Q}$, with no gaps between elements) must be uncountable, missing that density and countability are unrelated properties | Foundational |
| MC-3 | ENUMERATION-SCHEME-ASSUMED-TO-REQUIRE-NATURAL-ORDER | Believing an enumeration must list elements in their natural numeric order (e.g. $\mathbb{Z}$ must be listed $\ldots,-2,-1,0,1,2,\ldots$), missing that ANY order achieving a bijection with $\mathbb{N}$ suffices | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Proper Superset Assumed Strictly Larger for Infinite Sets") → P41 (detect: the opening A01 question itself) → P64 (conceptual shift: re-walk Example 1's explicit bijection, confirming $|\mathbb{Z}|=|\mathbb{N}|$ despite the containment).
- **B02 (targets MC-2)**: P27 ("Density Confused with Uncountability") → P41 (detect: ask whether $\mathbb{Q}$'s density implies uncountability) → P64 (conceptual shift: re-walk Example 2's diagonal enumeration, confirming a genuine ordering exists despite the density).
- **B03 (targets MC-3)**: P27 ("Enumeration Assumed to Require Natural Order") → P41 (detect: ask the student to enumerate $\mathbb{Z}$ and check whether they insist on listing $\ldots,-1,0,1,\ldots$ directly, getting stuck at "where does it start?") → P64 (conceptual shift: re-present Example 1's zig-zag order, confirming any bijective assignment to $\mathbb{N}$ counts, regardless of whether it matches numeric order).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.found.cardinality`, `math.found.natural-numbers`.
- **Unlocks**: `math.found.uncountable-set` (the direct complement — a set that is provably NOT countable, established by contrast against this concept's positive constructions).
- **Related**: `math.found.finite-set` (countability's finite case).

## Component 8 — Teaching Notes

- estimated_hours = 4 (substantially higher than `math.found.finite-set`'s 1) reflects that constructing genuine enumeration schemes for non-obviously-countable sets (Examples 1 and 2) requires real ingenuity, unlike finite counting.
- MC-1 and MC-2 are both ranked foundational because each represents the SAME root failure — importing finite-set intuitions (bigger containment, density implying more elements) into the genuinely different territory of infinite cardinality, where such intuitions systematically mislead.
- The Hilbert's Hotel transfer probe was deliberately chosen as a well-known, vivid illustration of countable infinity's counterintuitive behavior, directly setting up `math.found.uncountable-set`'s contrast (why the same trick fails for uncountable sets) without pre-empting that concept's own content.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.found.cardinality`, `math.found.natural-numbers`) |
| V-4 | unlocks concepts named accurately from KG | PASS (`math.found.uncountable-set`) |
| V-5 | cross_links checked against disk | PASS (none declared) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A03) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.80×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO2, Ex2→LO2/LO3, Ex3→LO1/LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
