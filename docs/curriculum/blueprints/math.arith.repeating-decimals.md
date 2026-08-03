# Teaching Blueprint: Repeating Decimals (`math.arith.repeating-decimals`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.arith.repeating-decimals` |
| name | Repeating Decimals |
| domain | Arithmetic |
| difficulty | developing |
| bloom | understand |
| mastery_threshold | 0.80 → MAMR = ⌈0.80×5⌉ = 4/5 |
| estimated_hours | 3 |
| requires | `math.arith.decimals` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | A (Abstract) |
| description (KG) | A decimal in which a block of digits repeats infinitely; every rational number has either a terminating or repeating decimal expansion. |

## Component 1 — Learning Objectives

- LO1: Identify a repeating decimal, correctly notating the repeating block with a bar (e.g. $0.\overline{3}$, $0.1\overline{6}$).
- LO2: Determine, via long division, that a fraction whose denominator (in lowest terms) has a prime factor other than 2 or 5 produces a repeating (not terminating) decimal, by observing a remainder recur.
- LO3: State the key classification fact: EVERY rational number's decimal expansion either terminates or eventually repeats — there is no third possibility for a ratio of integers.

## Component 2 — Prerequisite Check

Assumes mastery of `math.arith.decimals` (the place-value decimal representation this concept classifies, complementing `math.arith.terminating-decimals`'s classification).

## Component 3 — Core Explanation

A **repeating decimal** has a block of digits that repeats infinitely (e.g. $\frac13=0.333\ldots=0.\overline{3}$, $\frac{1}{6}=0.1666\ldots=0.1\overline{6}$). This happens whenever the fraction (in lowest terms) has a denominator with a prime factor OTHER than 2 or 5 — such a denominator can never be scaled to an exact power of 10, so the long-division process never terminates; instead, since there are only finitely many possible remainders (from 0 up to one less than the divisor), a remainder MUST eventually recur, and once it does, the digit sequence from that point repeats forever.

Together with `math.arith.terminating-decimals`, this establishes the complete classification: every rational number's decimal expansion is either terminating OR repeating — never neither.

## Component 4 — Worked Examples

**Example 1 (LO1, LO2 — direct long-division derivation)**: Convert $\frac17$ to a decimal via long division: $1.000000\ldots\div7$ gives remainders $1,3,2,6,4,5,1,\ldots$ — the remainder $1$ RECURS after 6 steps, so the digit block repeats from there: $\frac17=0.\overline{142857}$ (a 6-digit repeating block).

**Example 2 (LO1 — notating the repeating block correctly, breaking MC-1)**: $\frac{1}{6}=0.1666\ldots$. The bar goes ONLY over the repeating part: $0.1\overline{6}$ — the leading "1" does NOT repeat, only the "6" does. Writing $0.\overline{16}$ (bar over both digits) would incorrectly claim the pattern is "16" repeating (i.e. $0.161616\ldots$), a genuinely different (and wrong) number.

**Example 3 (LO3 — the terminate-or-repeat dichotomy, breaking MC-2)**: For any fraction $\frac{a}{b}$, long division of $a$ by $b$ can only ever produce remainders from the set $\{0,1,\ldots,b-1\}$ — finitely many possibilities. Either a remainder of $0$ is eventually reached (termination) or, since the process continues forever without hitting 0, some NONZERO remainder must eventually repeat (by the pigeonhole principle, within at most $b-1$ steps) — forcing the digits from that point to cycle. There is no way for a rational number's decimal expansion to go on forever WITHOUT eventually repeating some block.

## Component 5 — Teaching Actions

### Teaching Action A01 — Long Division Reveals a Recurring Remainder (Primitive P64: Conceptual Shift)

Work Example 1's long division of $1\div7$ step by step, tracking each remainder explicitly in a table, and pointing out the exact moment remainder $1$ reappears — showing this is WHY the digit block repeats, not an arbitrary pattern-matching observation.

- **MC-1 hook**: present $\frac16=0.1666\ldots$ and ask the student to write it with bar notation (revealing MC-1: placing the bar over the wrong digits, e.g. over the whole decimal or over a non-repeating leading digit).

### Teaching Action A02 — Bar Notation Marks Only the Truly Repeating Block (Primitive P06: Contrast Pair)

Contrast the correct $0.1\overline{6}$ against the incorrect $0.\overline{16}$ for $\frac16$, computing what each actually represents as a value ($0.1666\ldots$ vs. $0.161616\ldots$ — genuinely different numbers) to show precisely why the bar's placement matters, not just its presence.

### Teaching Action A03 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.80×5⌉ = 4/5.

- **P77 (4-problem set)**:
  1. Convert $\frac29$ to a decimal via long division, identifying the repeating block and notating it with a bar.
  2. Given $\frac{5}{12}=0.41666\ldots$, write the correct bar notation, being careful about which digits actually repeat.
  3. Explain why $\frac{1}{13}$ must eventually repeat (without necessarily computing all its digits), citing the finite-remainder argument from Example 3.
  4. State whether $\frac{7}{40}$ terminates or repeats, and justify using the denominator's prime factorization (recall: $40=2^3\times5$).
- **P76 (Transfer Probe, mode = independence)**: "A student long-divides $1\div11$ and gets remainders $1,10,1,10,\ldots$ repeating after just 2 steps. (a) Use this remainder pattern to determine the repeating decimal block for $\frac{1}{11}$ and write it with correct bar notation. (b) Explain, using the pigeonhole/finite-remainder argument from Example 3, why a repeating block for $\frac{1}{11}$ could never take more than 10 digits to appear, connecting your reasoning to the general rule for any denominator $b$."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | REPEATING-BAR-PLACED-OVER-WRONG-DIGITS | Placing the repeat-bar over non-repeating leading digits, or over the wrong block length, misrepresenting the actual repeating pattern | Foundational |
| MC-2 | RATIONAL-DECIMAL-ASSUMED-POSSIBLY-NEITHER-TERMINATING-NOR-REPEATING | Believing a rational number's decimal expansion could go on forever without ever settling into a repeating pattern | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Repeating Bar Placed Over Wrong Digits") → P41 (detect: present Example 2's $\frac16$ and check for an incorrect bar placement) → P64 (conceptual shift: re-walk the long division, marking the EXACT point where digits begin repeating, then place the bar only from that point forward).
- **B02 (targets MC-2)**: P27 ("Rational Decimal Assumed Possibly Non-Repeating") → P41 (detect: ask whether a fraction's decimal expansion could avoid repeating forever) → P64 (conceptual shift: re-walk Example 3's finite-remainder/pigeonhole argument, showing recurrence is logically forced, not merely commonly observed).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.arith.decimals`.
- **Unlocks**: none recorded in the KG.
- **Related**: `math.arith.terminating-decimals` (the complementary classification, together forming the complete rational-decimal dichotomy).

## Component 8 — Teaching Notes

- estimated_hours = 3 (slightly more than terminating-decimals' 2) reflects the added complexity of both deriving repeating blocks via long division and mastering precise bar notation.
- MC-1 was ranked most severe because an incorrectly-placed bar produces a DIFFERENT NUMBER entirely (as shown in Example 2), not merely a notational imprecision — this is a genuine value error disguised as a formatting slip.
- Example 3's pigeonhole argument was deliberately included (rather than simply asserting the terminate-or-repeat dichotomy as a given fact) to give bloom=understand genuine content — the WHY behind the classification, not just the WHAT, directly countering MC-2's misconception with a real logical guarantee rather than an appeal to authority.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.arith.decimals`) |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
| V-5 | cross_links checked against disk | PASS (none declared) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A02, plus A03 gate) |
| V-7 | Misconception Registry non-empty | PASS (2 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.80×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1/LO2, Ex2→LO1, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
