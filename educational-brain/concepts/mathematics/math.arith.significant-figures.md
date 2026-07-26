# Significant Figures — `math.arith.significant-figures`

## Identity

- **Concept ID**: `math.arith.significant-figures` (canonical
  mathematics KG)
- **Curriculum location**: mathematics / arithmetic — no parent or
  children in KG
- **Prerequisites**: `math.arith.rounding` (this concept directly
  reuses that concept's sig-fig-counting rules without re-teaching
  them), `math.arith.decimals` (the decimal notation these propagation
  rules apply within).
- **Unlocks**: `math.num.floating-point`.
- **Related** (from KG): `math.arith.rounding`.
- **Difficulty**: developing · **Bloom**: apply · **Mastery
  threshold**: 0.8 · **Est. hours**: 3
- **Blueprint**: `docs/curriculum/blueprints/
  math.arith.significant-figures.md` (MAMR: MC-1
  ADDITION-SUBTRACTION-RULE-CONFLATED-WITH-MULTIPLICATION-RULE and
  MC-2 CALCULATOR-OUTPUT-REPORTED-WITHOUT-ROUNDING both FOUNDATIONAL;
  P76_mode independence, cross_links=[math.num.floating-point],
  confirmed not-yet-authored via directory listing).
- **Aliases** (from KG): "significant digits", "sig figs".

## Learning Objective

The learner can: apply the multiplication/division rule — round a
calculated result to the SAME NUMBER of significant figures as the
LEAST precise (fewest-sig-fig) input; apply the addition/subtraction
rule — round a calculated sum or difference to the SAME NUMBER OF
DECIMAL PLACES as the least precise input, a genuinely different
counting basis; and explain why these propagation rules exist — a
calculated result cannot be more precise than its least precise input,
so a calculator's extra displayed digits do not manufacture genuine
precision.

## Core Understanding

`math.arith.rounding` already teaches how to COUNT the significant
figures in a single number — this concept does not re-teach that
counting procedure, it assumes it and addresses genuinely new content:
how significant figures determine the appropriate PRECISION of a
CALCULATED result, when combining multiple measured quantities. The
MULTIPLICATION/DIVISION RULE: round the result to the SAME NUMBER OF
SIGNIFICANT FIGURES as whichever input has the FEWEST significant
figures. The ADDITION/SUBTRACTION RULE is a genuinely DIFFERENT rule,
based on DECIMAL PLACES, not sig-fig count: round the result to the
SAME NUMBER OF DECIMAL PLACES as whichever input has the FEWEST
decimal places — these are fundamentally different counting systems
applied to different operations, and applying the wrong one produces a
wrongly-rounded result. WHY the rules exist: a calculated result is
only as precise as its LEAST precise input — performing more
arithmetic, or a calculator displaying ten digits, does not create
genuine additional precision out of nowhere; reporting more sig figs
than the input data can honestly support overstates precision the
original measurements never actually had.

## Mental Models

- **Beginner model — "there's one sig-fig rule, and it applies to all
  four arithmetic operations the same way"**: the learner, having
  learned the multiplication/division rule (match sig-fig count),
  applies the identical rule to addition/subtraction, not recognizing
  that a genuinely different counting basis (decimal places) governs
  those operations instead. Shelf-life warning: this model can produce
  correct-looking answers when the two rules happen to coincide for a
  specific pair of numbers, delaying detection until a case where they
  genuinely diverge is tested.
- **Intermediate model — "I correctly apply the sig-fig rule for
  multiplication/division and the decimal-place rule for addition/
  subtraction, but I sometimes report a calculator's full unrounded
  output without applying either rule"**: the learner knows both rules
  exist but doesn't consistently apply the final rounding step,
  reporting more digits than the calculation can honestly support.
  Upgrade trigger: being asked to justify, using a real-world
  measurement scenario, why a calculator's extra digits don't represent
  genuine additional precision.
- **Advanced model — "multiplication/division rounds to match the
  fewest significant figures; addition/subtraction rounds to match the
  fewest decimal places — two genuinely different counting systems —
  and I always apply the correct one and round the final answer,
  since a result can never be more precise than its least precise
  input"**: the learner fluently selects and applies the correct
  propagation rule based on the operation, and always rounds
  appropriately rather than reporting raw calculator output. Upgrade
  trigger: being asked to determine the correct sig-fig count for a
  multi-step calculation combining both multiplication and addition.
- **Do not upgrade early**: a learner who still applies the
  multiplication/division rule to addition/subtraction (beginner
  model, MC-1) should not be pushed toward consistent rounding
  discipline (intermediate/advanced models) before the two-rule
  distinction is fully secure — MC-1 is FOUNDATIONAL per the
  Blueprint's own MAMR, alongside MC-2.

## Why Students Fail

The dominant, FOUNDATIONAL failure applies the multiplication/division
rule (match significant figures) to addition/subtraction, missing that
addition/subtraction instead matches DECIMAL PLACES — a genuinely
different counting basis — since once the first rule is learned, the
natural (but incorrect) assumption is that "the sig-fig rule" is
universal across all arithmetic operations. A second, equally
FOUNDATIONAL failure reports a calculated result with all the digits a
calculator displays, without rounding to the appropriate number of
significant figures based on the input precision — a calculator's
extra digits are mathematically real but represent no genuine
additional measurement precision. A third failure incorrectly
identifies which input is "least precise" (fewest sig figs or fewest
decimal places, depending on the operation), often by miscounting
significant figures using rules already established in `math.arith.
rounding` — particularly with tricky trailing zeros.

## Misconceptions

Reusing the Blueprint's Misconception Registry, birth-type
classification added per this program's diagnostic procedure — not
re-derived:

### MC-1: ADDITION-SUBTRACTION-RULE-CONFLATED-WITH-MULTIPLICATION-RULE (Foundational; Type 1 — overgeneralization)
**Trigger**: applying the multiplication/division rule (match
significant figures) to addition/subtraction, missing that
addition/subtraction instead matches decimal places — the sig-fig
rule, learned first, is assumed universal.
**Repair**: 120+3.45 — the correct rule (match the FEWEST decimal
places, which is 0 from 120) gives 123, with NOTHING to do with
matching sig-fig counts at all; addition/subtraction genuinely uses a
different counting basis than multiplication/division.
**MAMR**: FOUNDATIONAL — this is the single most common error once the
multiplication/division rule is correctly learned; must clear
alongside MC-2.

### MC-2: CALCULATOR-OUTPUT-REPORTED-WITHOUT-ROUNDING (Foundational; Type 5 — instruction-induced)
**Trigger**: reporting a calculated result with all the digits a
calculator displays, without rounding to the appropriate number of
significant figures — calculators are often used without an explicit
final rounding step being emphasized.
**Repair**: a calculator's extra digits are mathematically real but
represent no genuine additional measurement precision; measuring a
room at 4.2m×3.7m (2 sig figs each) and computing 15.54 m² overstates
precision the original tape-measure readings never actually had —
correctly round to 16 m² (2 sig figs).
**MAMR**: FOUNDATIONAL — reporting unrounded calculator output
undermines the entire purpose of significant-figure tracking.

### MC-3: LEAST-PRECISE-INPUT-MISIDENTIFIED (Moderate; Type 5 — instruction-induced)
**Trigger**: incorrectly identifies which input is "least precise"
(fewest sig figs or fewest decimal places, depending on the
operation), often by miscounting significant figures, especially with
tricky trailing zeros.
**Repair**: explicitly re-apply `math.arith.rounding`'s own
already-established sig-fig-counting rules step by step to each input
before comparing, rather than estimating.

## Analogies

**Primary — a chain's weakest link (a general precision-limiting
framing)**: a chain's overall strength is limited by its WEAKEST
link, no matter how strong the other links are. A calculation's
overall precision is limited by its LEAST precise input, no matter how
many extra digits a calculator produces — you can't strengthen the
chain (or manufacture precision) just by adding more strong links (or
computing further).

**Anti-analogy to retire**: "Just round your final answer to look
tidy, using whatever number of digits seems reasonable." This directly
invites both MC-1 (no explicit rule distinction) and MC-3 (no
systematic input comparison) by suggesting rounding is a stylistic
choice rather than a precise propagation rule.

## Demonstrations

**Multiplication/division rule (Blueprint's own Example 1)**:
12.5cm×7.3cm (3 sig figs × 2 sig figs) — raw product 91.25, round to
match the LEAST precise input (7.3, 2 sig figs): 91 cm².

**Addition/subtraction rule contrast (Blueprint's own Example 2)**:
120+3.45 — raw sum 123.45; the correct rule (match the FEWEST decimal
places, 0 from 120) gives 123 — genuinely different from matching
sig-fig counts, proving the two rules are structurally distinct.

**Precision-cannot-be-manufactured demonstration (Blueprint's own
Example 3)**: measuring a room 4.2m by 3.7m (2 sig figs each);
calculator computes 4.2×3.7=15.54 m², but correctly rounding to 2 sig
figs gives 16 m², an honest reflection of what the original
measurements can support.

## Discovery Questions

Present the addition 120+3.45 and ask the learner to round the result
by matching sig-fig counts (as they would for multiplication) before
the correct rule is stated — the learner discovers this approach gives
an ambiguous or inconsistent result, since 120's sig-fig count is
itself unclear, directly motivating why addition/subtraction needs a
DIFFERENT, unambiguous counting basis (decimal places).
Recommendation: guided discovery for recognizing multiplication and
addition need different rules (directly experiential from the
120+3.45 ambiguity); direct instruction for the precise
decimal-place-matching procedure itself (MC-1's repair), since the
specific rule is not independently rediscoverable without being
stated.

## Teaching Sequence

Per the Blueprint's own dual-FOUNDATIONAL structure: MC-1 (addition/
subtraction rule conflated with multiplication rule) is addressed
first, establishing that the two operation families use genuinely
different counting bases. MC-2 (calculator output reported without
rounding) is addressed second, establishing the discipline of always
rounding the final answer. MC-3 (least-precise input misidentified) is
addressed last, as a refinement depending on both rules already being
correctly distinguished.

## Tutor Actions

| Student state | Recommended action | Source |
|---|---|---|
| MC-1 active (addition rule conflated with multiplication rule) | DEMONSTRATION: 120+3.45 decimal-place-matching vs. sig-fig-matching conflict | Teaching Actions: SHOW §3 |
| MC-2 active (calculator output reported without rounding) | DEMONSTRATION: room-measurement precision-cannot-be-manufactured example | Teaching Actions: SHOW §3 |
| MC-3 active (least-precise input misidentified) | WORKED EXAMPLE: step-by-step sig-fig re-counting for each input before comparing | Teaching Actions: SHOW §1 |
| Ready for transfer | THOUGHT EXPERIMENT: chemist's density calculation vs. total-mass calculation, applying two different rules to the same data (Blueprint P76) | Teaching Actions: TEST-THINKING §4 |

## Voice Teaching Notes

**Register**: Say "which rule — sig figs or decimal places?" as the
default first question for any propagation task — naming both
candidate rules explicitly is load-bearing and directly guards against
MC-1.

**Wait-time**: After presenting the room-measurement scenario (4.2m ×
3.7m), give extended wait-time before revealing the correctly-rounded
16 m² — let the learner sit with the calculator's raw 15.54 output and
question its honesty.

**Load-bearing sentences**:
- "Multiplication and division match sig figs; addition and
  subtraction match decimal places — never mix them up."
- "A calculator's extra digits are not extra real-world precision."

**Voice channel note**: See `foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

Directly reusing the Blueprint's own P77 4-problem gate set and P76
transfer probe, not restated in full — cite by reference:

**Gate 1** (Blueprint Problem 1): multiply 8.3 (2 sig figs) by 2.456
(4 sig figs), rounding correctly. Pass: 20 (2 sig figs).

**Gate 2** (Blueprint Problem 2): add 56.2 (1 decimal place) and 8.75
(2 decimal places), rounding correctly. Pass: 65.0 (1 decimal place).

**Gate 3** (Blueprint Problem 3): round 15.0÷3.14159's full output
(4.774485…) given 15.0 has 3 sig figs. Pass: 4.77 (3 sig figs).

**Gate 4** (Blueprint Problem 4): explain why the addition/subtraction
rule uses decimal places while the multiplication/division rule uses
significant figures. Pass: correctly identifies these as genuinely
different counting systems.

**Gate 5** (Blueprint P76, independence transfer probe): a chemist
computes density (12.34g÷5.6mL) and separately a total mass (12.34g+
5.6g), applying the correct rule to each. Pass: density correctly
rounded to 2 sig figs (matching 5.6's precision); total mass correctly
rounded to 1 decimal place (matching 5.6's precision), with the
distinction between the two rules explicitly explained.

**Mastery criterion**: 4/5 on the full Blueprint item bank (4 P77 items
+ P76), consistent with KG mastery_threshold 0.8 (⌈0.8×5⌉=4).

## Tutor Recovery Strategy

Likeliest utterance: "I matched the sig figs like I learned before,
but you're saying that's wrong for addition?" — the concept-specific
smaller question: "for addition and subtraction, do we count sig figs,
or do we count decimal places?" directly surfaces MC-1 by forcing an
explicit choice between the two counting systems, converting an
assumed-universal rule into a genuinely operation-dependent decision.

## Memory Hooks

**Type**: procedural (applying the correct propagation rule based on
the operation; identifying the least-precise input) + declarative
(multiplication/division uses sig figs; addition/subtraction uses
decimal places; precision cannot be manufactured). Review form: fresh
mixed-operation propagation prompts, periodically paired with a
"which rule applies here?" spot-check to keep MC-1's guard-rail
active. Interleaving partner: `math.arith.rounding` (the
sig-fig-counting rules this concept directly reuses without
re-teaching).

## Transfer Connections

**Near transfer**:
- `math.num.floating-point` (per KG `unlocks`; computer floating-point
  representation has its own precision limits, directly analogous to
  the significant-figure precision-tracking established here)

**Far transfer**:
- `math.arith.rounding` (per KG `related`; the sig-fig-counting rules
  this concept directly reuses without re-teaching)
- Scientific measurement and laboratory reporting directly rely on
  correct significant-figure propagation through calculations

## Cross-Subject Connections

Per KG `cross_links` [`math.num.floating-point`]: confirmed via
directory listing (per the Blueprint's own Component 7 check) that no
Blueprint yet exists for `math.num.floating-point` — P76_mode is
independence per the Blueprint's own GR-9 determination. No
Educational Brain entry yet exists for `math.num.floating-point`
either (verified via directory listing this batch). A future
revision, once that concept is authored, may add a genuine cross-link
probe connecting this concept's precision-tracking to computer
floating-point precision limits.

## Blueprint References

Blueprint: `docs/curriculum/blueprints/
math.arith.significant-figures.md` (all structural/grammar/content/
AIR checks PASS).

Full Teaching Actions (A01 through A04/mastery gate) and Protocol B
repair actions (B01 through B03) reused by reference above and not
restated in full; the Misconception Registry (MC-1 through MC-3) and
the P77/P76 mastery-gate item bank cited directly by ID.

## Runtime Asset References

None seeded yet in `src/lib/teaching/assets/brainSeedAssets.ts` or the
live DB for this concept — this entry does not create any.

## Curriculum Feedback

No structural KG issues found. This concept's two prerequisites
(`math.arith.rounding`, `math.arith.decimals`) and single unlock
(`math.num.floating-point`) match the Blueprint's own Component 7
exactly. The `math.num.floating-point` cross-link is confirmed
genuinely not-yet-authored, carried forward honestly here.

## Version History

| Version | Date | Author | Change |
|---|---|---|---|
| 1.0 | 2026-07-26 | Curriculum Completion Program (math.arith domain, Wave 6 part 1, autonomous loop) | Initial entry, grounded in the existing Blueprint. |
