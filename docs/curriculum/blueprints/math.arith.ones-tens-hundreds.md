# Teaching Blueprint: Ones, Tens, Hundreds (`math.arith.ones-tens-hundreds`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.arith.ones-tens-hundreds` |
| name | Ones, Tens, Hundreds |
| domain | Arithmetic |
| difficulty | foundational |
| bloom | understand |
| mastery_threshold | 0.9 → MAMR = ⌈0.9×5⌉ = 5/5 |
| estimated_hours | 3 |
| requires | `math.arith.place-value` |
| unlocks | none |
| cross_links | none |
| CPA_entry_stage | C (Concrete) — grouping physical/pictured objects into ones, tens, and hundreds bundles before naming the general positional columns |
| description (KG) | The first three positional columns in base-10 notation, representing $10^0$, $10^1$, and $10^2$ respectively. |

## Component 1 — Learning Objectives

- LO1: Identify the **ones, tens, and hundreds** columns as the first three positions in `math.arith.place-value`'s own positional system, representing $10^0=1$, $10^1=10$, and $10^2=100$ respectively — recognizing these as the SAME general place-value idea, applied to its three smallest, most concrete positions.
- LO2: Decompose a 3-digit number into its ones, tens, and hundreds parts (e.g. $347=3\times100+4\times10+7\times1$), and conversely RECONSTRUCT a number from given ones/tens/hundreds counts.
- LO3 (orientation level — full multi-digit arithmetic deferred): recognize, without full derivation, that CARRYING in addition (e.g. $8+7=15$, "write $5$, carry $1$ ten") is a direct consequence of the base-10 grouping — ten ones genuinely regroup into one ten, previewing how this same regrouping principle extends to tens-into-hundreds and beyond in multi-digit arithmetic.

## Component 2 — Prerequisite Check

Assumes mastery of `math.arith.place-value` (the general positional system, where a digit's value depends on its position, each position a power of $10$).

## Component 3 — Core Explanation

**Ones, tens, and hundreds are the three smallest positions of one general system**: `math.arith.place-value` already established that in base 10, each position represents a power of $10$: the RIGHTMOST position is $10^0=1$ (the ONES place), the next is $10^1=10$ (the TENS place), and the next is $10^2=100$ (the HUNDREDS place). These are not three separate ideas to learn — they are simply the first three concrete instances of the SAME general positional pattern, continuing to thousands ($10^3$), ten-thousands ($10^4$), and beyond.

**A number decomposes into (and reconstructs from) its column counts**: the number $347$ means EXACTLY $3$ hundreds, $4$ tens, and $7$ ones — written out, $347=3\times100+4\times10+7\times1=300+40+7$. This decomposition works in REVERSE too: given "$2$ hundreds, $5$ tens, $9$ ones," the number is $2\times100+5\times10+9\times1=259$. Reading a number's digits directly tells you its column counts, and vice versa.

**Carrying is regrouping ones into tens, made necessary by the base-10 structure (orientation level)**: when adding digits in the ones column produces $10$ or more (e.g. $8+7=15$), those $15$ ones REGROUP into $1$ ten and $5$ ones — since exactly TEN ones make one ten (the base-10 structure itself), the $1$ ten must be "carried" into the tens column, added there. This same regrouping principle (ten of one column making one of the next) applies identically when the TENS column's sum reaches $10$ or more, carrying into hundreds — full development of multi-digit addition/subtraction procedures using this principle is deferred beyond this concept's core scope.

## Component 4 — Worked Examples

**Example 1 (LO1 — identifying ones, tens, hundreds as the first three place-value positions, breaking MC-1)**: for the number $256$: the digit $6$ is in the ONES place ($6\times10^0=6$), the digit $5$ is in the TENS place ($5\times10^1=50$), and the digit $2$ is in the HUNDREDS place ($2\times10^2=200$). These are not three unrelated labels — "ones," "tens," and "hundreds" are simply the NAMES given to `math.arith.place-value`'s positions $10^0,10^1,10^2$, the same general pattern that continues to "thousands" ($10^3$) and beyond.

**Example 2 (LO2 — decomposing and reconstructing a number from its columns, breaking MC-2)**: for $483$: decomposing, $483=4\times100+8\times10+3\times1=400+80+3$. Conversely, given "$6$ hundreds, $0$ tens, $9$ ones," reconstructing: $6\times100+0\times10+9\times1=600+0+9=609$ — note the "$0$ tens" is essential; omitting it (writing just "$69$") would give an entirely DIFFERENT, incorrect number, confirming each column's count must be explicitly accounted for, even when it's zero.

**Example 3 (LO3, orientation level — carrying as regrouping ones into tens, breaking MC-3)**: adding $28+17$: in the ones column, $8+7=15$ — this is MORE than $9$ ones, so it REGROUPS: $15$ ones $=1$ ten $+5$ ones. Write down the $5$ ones, and CARRY the $1$ ten into the tens column: now the tens column has $2+1+1=4$ tens (the original $2$ tens from $28$, the $1$ ten from $17$, and the $1$ ten carried), giving $4$ tens $+5$ ones $=45$. The "carry" is not an arbitrary procedural trick — it is the DIRECT consequence of ten ones genuinely equaling one ten, the same base-10 grouping fact from Example 1.

## Component 5 — Teaching Actions

### Teaching Action A01 — Ones, Tens, Hundreds Are One Pattern's First Three Positions (Primitive P11: Representation Shift)

State: "ones, tens, and hundreds aren't three separate ideas — they're just the NAMES for the first three positions of the same place-value pattern you already know, continuing to thousands and beyond." Walk Example 1's identification of each digit's column and power-of-10 value.

- **MC-1 hook**: ask "are 'ones,' 'tens,' and 'hundreds' three separate, unrelated concepts, each requiring its own independent understanding?" — a "yes" answer reveals MC-1 (missing that these are simply the first three instances of one general positional pattern).

### Teaching Action A02 — Every Column's Count Must Be Accounted For, Even Zero (Primitive P28: Conflict Evidence)

Present Example 2's direct evidence: "$6$ hundreds, $0$ tens, $9$ ones" reconstructs to $609$, but omitting the "$0$ tens" would incorrectly give $69$ — a genuinely different number. State: "you can't just skip a column with zero in it — every column's count, including zero, determines the number's actual value."

- **MC-2 hook**: ask "when reconstructing a number from its column counts, can a column with a count of zero simply be left out or ignored?" — a "yes" answer reveals MC-2 (missing that omitting a zero column changes the number's actual value, as in $609$ versus $69$).

### Teaching Action A03 — Carrying Is Regrouping, Not an Arbitrary Rule (Primitive P06: Contrast Pair)

Contrast a hypothetical "carrying is just a memorized procedural step" view against Example 3's direct demonstration that $15$ ones GENUINELY regroups into $1$ ten $+5$ ones, because ten ones make a ten by the base-10 structure itself. State: "carrying isn't an arbitrary rule to follow mechanically — it's the direct, necessary consequence of ten ones actually equaling one ten, the very grouping fact your place-value system is built on."

- **MC-3 hook**: ask "is 'carrying' in addition an arbitrary procedural rule, disconnected from what the ones/tens/hundreds columns actually represent?" — a "yes" answer reveals MC-3 (missing that carrying is a direct, necessary consequence of the base-10 regrouping fact — ten ones genuinely making one ten).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Identify the ones, tens, and hundreds digit of $739$, and state each one's value as a power of $10$ times the digit.
  2. Decompose $508$ into its hundreds/tens/ones parts, being careful with the zero.
  3. Reconstruct the number described as "$3$ hundreds, $0$ tens, $4$ ones," and explain why the zero cannot be omitted.
  4. Add $36+29$ using explicit regrouping, showing how many ones carry into the tens column and why.
- **P76 (Transfer Probe, mode = independence)**: "A shopkeeper counts coins: $4$ bags of $100$ coins each, $6$ bags of $10$ coins each, and $8$ loose coins. (a) Determine the total number of coins by writing this as a 3-digit number, explicitly using the hundreds/tens/ones structure. (b) If the shopkeeper had instead counted $4$ bags of $100$, $0$ bags of $10$, and $8$ loose coins, explain why the total is NOT simply '48' and what the correct total actually is. (c) If the shopkeeper adds $7$ more loose coins to the original count (part a), explain — using the regrouping principle — what happens to the ones and tens counts, and why."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | ONES-TENS-HUNDREDS-ASSUMED-SEPARATE-CONCEPTS | Believing ones, tens, and hundreds are three separate, unrelated concepts, missing that they are the first three instances of one general place-value pattern | Foundational |
| MC-2 | ZERO-COLUMN-ASSUMED-OMITTABLE | Believing a column with a count of zero can be left out when reconstructing a number, missing that omitting it changes the number's actual value | High |
| MC-3 | CARRYING-ASSUMED-ARBITRARY-RULE | Believing carrying in addition is an arbitrary procedural rule, missing that it is a direct, necessary consequence of ten ones genuinely equaling one ten | Moderate |

- **B01 (targets MC-1)**: P27 (name it: "Ones-Tens-Hundreds Assumed Separate Concepts") → P41 (detect: ask whether ones, tens, and hundreds are three separate, unrelated concepts) → P64 (conceptual shift: re-walk Example 1's column-identification, re-anchoring on "the first three instances of one general place-value pattern").
- **B02 (targets MC-2)**: P27 (name it: "Zero Column Assumed Omittable") → P41 (detect: ask whether a zero-count column can be omitted when reconstructing a number) → P64 (conceptual shift: re-walk Example 2's $609$-versus-$69$ contrast, re-anchoring on "every column, including zero, determines the number's value").
- **B03 (targets MC-3)**: P27 (name it: "Carrying Assumed Arbitrary Rule") → P41 (detect: ask whether carrying is an arbitrary procedural rule) → P64 (conceptual shift: re-walk Example 3's explicit regrouping demonstration, re-anchoring on "carrying is the necessary consequence of ten ones equaling one ten").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.arith.place-value` (the general positional system, of which ones/tens/hundreds are the first three concrete positions).
- **Unlocks**: none listed in the KG for this concept.
- **Cross-link**: none listed in the KG for this concept.

## Component 8 — Teaching Notes

- estimated_hours = 3 with a foundational/understand tag supports the "3 TAs + gate" tier, with LO1 and LO2 given full concrete depth (column identification and decomposition/reconstruction, including the zero-column subtlety) and LO3 kept orientation-level, appropriately previewing carrying's regrouping logic without developing full multi-digit addition/subtraction algorithms.
- **Division of labor**: `math.arith.place-value` owns the general positional-system idea (any power of 10, any number of digits); this concept owns the SPECIFIC first three positions (ones/tens/hundreds) at concrete, hands-on scale — deliberately choosing the zero-tens example ("$609$") to make the zero-omission misconception (MC-2) concrete and numerically falsifiable, rather than asserting it abstractly.
- Example 3's deliberate choice of a simple 2-digit addition with exactly one carry (rather than a more complex multi-carry example) was chosen to isolate the regrouping principle cleanly at this foundational concept's appropriately introductory scope.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS (none listed) |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (none listed in KG) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.9×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Concrete: grouping objects into ones/tens/hundreds bundles precedes naming the general positional columns) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
