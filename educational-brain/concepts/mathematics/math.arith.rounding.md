# Rounding — `math.arith.rounding`

## Identity

- **Concept ID**: `math.arith.rounding` (canonical mathematics KG)
- **Curriculum location**: mathematics / arithmetic — no parent or
  children in KG
- **Prerequisites**: `math.arith.place-value` (the positional
  digit-value system rounding operates on), `math.arith.decimals`
  (the decimal-point notation rounding is applied within).
- **Unlocks**: `math.arith.estimation`, `math.arith.
  significant-figures`.
- **Related** (from KG): `math.arith.estimation`.
- **Difficulty**: developing · **Bloom**: apply · **Mastery
  threshold**: 0.85 · **Est. hours**: 4
- **Blueprint**: `docs/curriculum/blueprints/math.arith.rounding.md`
  (MAMR: MC-1 SIGNIFICANT-FIGURES-CONFLATED-WITH-DECIMAL-PLACES and
  MC-2 ROUNDING-INTERMEDIATE-RESULTS-ASSUMED-HARMLESS both
  FOUNDATIONAL; P76_mode independence, cross_links=[math.num.
  floating-point], confirmed not-yet-authored via directory listing).
- **Aliases** (from KG): "rounding off", "approximation".

## Learning Objective

The learner can: round a number to a specified decimal place by
examining the digit immediately to the right of the target place;
round a number to a specified number of significant figures, correctly
distinguishing this from decimal places; and recognize that rounding
is always a genuine approximation, whose errors can accumulate across
multiple steps of a calculation.

## Core Understanding

Rounding to a DECIMAL PLACE: examine the digit immediately to the
right of the target place — 5 or greater rounds the target digit UP by
one; less than 5 leaves it unchanged; all digits to the right are then
dropped entirely. Rounding to SIGNIFICANT FIGURES uses a genuinely
different counting system: every nonzero digit is significant; a zero
BETWEEN two significant digits is significant; LEADING zeros (before
the first nonzero digit) are never significant; TRAILING zeros are
significant only when a decimal point makes their precision explicit.
Significant figures count from the FIRST nonzero digit, wherever it
falls; decimal places count positions strictly to the right of the
decimal point — these are NOT interchangeable instructions, even
applied to the identical number. Rounding is always a genuine
APPROXIMATION — the rounded value is, in general, a DIFFERENT number
from the original, with information permanently lost. If a multi-step
calculation rounds each intermediate result before using it in the
next step, these small errors can ACCUMULATE, producing a final answer
noticeably different from carrying full precision throughout and
rounding only the final answer.

## Mental Models

- **Beginner model — "'round to 2 places' and 'round to 2 significant
  figures' mean basically the same thing"**: the learner treats the
  two counting systems as interchangeable casual-speech synonyms,
  producing genuinely different (and often wrong) results depending on
  which instruction was actually intended. Shelf-life warning: this
  model produces correct answers whenever both interpretations happen
  to coincide (e.g., for numbers with no leading zeros), delaying
  detection until a small decimal with leading zeros is rounded.
- **Intermediate model — "I correctly distinguish significant figures
  from decimal places, and I can round to either specification, but I
  don't think rounding intermediate results in a multi-step calculation
  meaningfully affects the final answer"**: the learner has cleared the
  significant-figures/decimal-places conflation but still assumes small
  per-step rounding errors are individually negligible and therefore
  collectively harmless. Upgrade trigger: being asked to compute a
  simple repeated-fraction sum both exactly and with intermediate
  rounding, and compare the two results.
- **Advanced model — "significant figures and decimal places are
  genuinely different counting systems (first-nonzero-digit vs.
  decimal-point-relative), and rounding intermediate results in a
  multi-step calculation can compound into a measurably different
  final answer — so full precision should be carried until the final
  rounding step whenever possible"**: the learner fluently rounds to
  either specification correctly and explicitly reasons about
  when/whether to round intermediate values in a calculation. Upgrade
  trigger: being asked to design a rounding-error-minimizing
  process for a real multi-step calculation (e.g., a running total of
  many individually-rounded figures).
- **Do not upgrade early**: a learner who still conflates significant
  figures with decimal places (beginner model, MC-1) should not be
  pushed toward the accumulated-error insight (advanced model, MC-2)
  before the two counting systems are clearly distinguished — both
  MC-1 and MC-2 are FOUNDATIONAL per the Blueprint's own MAMR, so
  MC-1's distinct counting-system confusion is cleared first as the
  more mechanically fundamental of the two.

## Why Students Fail

The dominant, FOUNDATIONAL failure treats "round to N significant
figures" and "round to N decimal places" as the same instruction, not
recognizing that significant figures count from the first nonzero
digit (wherever it falls) while decimal places count strictly from the
decimal point — the two phrases are often used almost interchangeably
in casual speech ("round to 2 places"), despite referring to genuinely
different counting systems. A second, equally FOUNDATIONAL failure
assumes rounding values partway through a multi-step calculation has no
meaningful effect on the final answer's accuracy, missing that small
per-step rounding errors can accumulate rather than cancel. A third
failure incorrectly counts leading zeros (before the first nonzero
digit) as significant figures, inflating the apparent precision of a
small decimal number.

## Misconceptions

Reusing the Blueprint's Misconception Registry, birth-type
classification added per this program's diagnostic procedure — not
re-derived:

### MC-1: SIGNIFICANT-FIGURES-CONFLATED-WITH-DECIMAL-PLACES (Foundational; Type 3 — language contamination)
**Trigger**: asked to round 0.004567 to "2 significant figures,"
learner instead rounds to 2 decimal places (giving 0.00) — the casual
everyday phrase "round to 2 places" contaminates both instructions,
obscuring that they refer to genuinely different counting systems.
**Repair**: rounding 0.004567 to 2 significant figures gives 0.0046
(counting from the first nonzero digit, 4); rounding the SAME number to
2 decimal places gives 0.00 (counting strictly from the decimal
point) — two completely different results from the identical starting
number, proving the two instructions are not interchangeable.
**MAMR**: FOUNDATIONAL — every later rounding task depends on knowing
which counting system is actually being requested.

### MC-2: ROUNDING-INTERMEDIATE-RESULTS-ASSUMED-HARMLESS (Foundational; Type 1 — overgeneralization)
**Trigger**: computes a multi-step calculation by rounding each
intermediate result, assuming this has no meaningful effect on the
final answer — over-generalizes from "each individual rounding is
small" to "the cumulative effect must also be small."
**Repair**: 1/3+1/3+1/3=1 exactly; but rounding each 1/3 to 0.33 first
and summing gives 0.33+0.33+0.33=0.99 — a 0.01 error introduced purely
by rounding each term before combining, even though each individual
rounding seemed harmless.
**MAMR**: FOUNDATIONAL — this misconception directly undermines
confidence in any multi-step calculation's accuracy if left
uncorrected.

### MC-3: LEADING-ZEROS-COUNTED-AS-SIGNIFICANT (Moderate; Type 1 — overgeneralization)
**Trigger**: asked how many significant figures 0.0034 has, learner
counts the leading zeros, inflating the apparent precision —
over-generalizes "every digit counts" from whole-number contexts onto
leading zeros, which only mark the decimal point's position.
**Repair**: significant figures begin counting at the FIRST nonzero
digit — 0.0034 has exactly 2 significant figures (3 and 4); the
leading zeros carry no precision information of their own.

## Analogies

**Primary — a ruler's marked ticks vs. its overall length (for the
significant-figures-vs-decimal-places distinction)**: decimal places
are like counting ticks from a fixed starting line (the decimal
point) — the count doesn't care where the "interesting" measurement
starts. Significant figures are like counting the ACTUAL marked
measurement itself, starting only once something is actually being
measured (the first nonzero digit) — leading zeros are like unmarked
ruler length before the object being measured even begins.

**Anti-analogy to retire**: "Rounding to N places always means the same
thing, just count N digits from wherever the instruction points." This
directly invites MC-1 by treating "places" as a single, unambiguous
concept rather than two genuinely different counting systems.

## Demonstrations

**Significant-figures-vs-decimal-places conflict (Blueprint's own
Example 2)**: 0.004567 rounded to 2 significant figures is 0.0046
(counting from the first nonzero digit, 4, then 5, rounding based on
the next digit 6); the SAME number rounded to 2 decimal places is 0.00
(the digit right after the hundredths place is 0, less than 5) — two
completely different results.

**Accumulated-error demonstration (Blueprint's own Example 3)**:
1/3+1/3+1/3=1 exactly; rounding each 1/3 to 0.33 first and summing
gives 0.99 — a measurable 0.01 discrepancy from purely rounding
intermediate values.

**Leading-zero exclusion (targets MC-3)**: 0.0034 has 2 significant
figures (3, 4) — the two leading zeros before the 3 mark the decimal
point's position but carry no precision information, unlike the zero
in 205 (between two significant digits, itself significant).

## Discovery Questions

Present "compute 1/3+1/3+1/3 exactly, then compute 0.33+0.33+0.33"
and ask the learner to compare the two results before any
accumulated-error rule is stated — the learner discovers the two
totals genuinely disagree (1 vs. 0.99), directly motivating the
accumulated-rounding-error insight from a concrete, self-checkable
arithmetic fact. Recommendation: guided discovery for the
accumulated-error observation (directly experiential from the 1-vs-
0.99 discrepancy); direct instruction for the significant-figures
counting rules (MC-1/MC-3's repair), since the leading/trailing-zero
significance rules are not independently rediscoverable without being
stated explicitly.

## Teaching Sequence

Per the Blueprint's own dual-FOUNDATIONAL structure: MC-1 (significant
figures conflated with decimal places) is addressed first, as the more
mechanically fundamental confusion (affecting every rounding task's
basic correctness). MC-2 (intermediate rounding assumed harmless) is
addressed second, via the 1/3 accumulated-error demonstration. MC-3
(leading zeros counted as significant) is addressed last, as a
narrower refinement of the significant-figures counting rule already
established.

## Tutor Actions

| Student state | Recommended action | Source |
|---|---|---|
| MC-1 active (significant figures conflated with decimal places) | DEMONSTRATION: same-number-two-instructions conflict (0.004567 to 2 sig figs vs. 2 decimal places) | Teaching Actions: SHOW §3 |
| MC-2 active (intermediate rounding assumed harmless) | DEMONSTRATION: 1/3 accumulated-error discrepancy (1 vs. 0.99) | Teaching Actions: SHOW §3 |
| MC-3 active (leading zeros counted as significant) | WORKED EXAMPLE: 0.0034's 2-significant-figure count, leading zeros excluded | Teaching Actions: SHOW §1 |
| Ready for transfer | THOUGHT EXPERIMENT: an accountant's 90-daily-figure rounding-error accumulation, and a process fix (Blueprint P76) | Teaching Actions: TEST-THINKING §4 |

## Voice Teaching Notes

**Register**: Say "significant figures start at the first nonzero
digit; decimal places start at the decimal point" as a single,
paired statement whenever distinguishing the two — naming both
counting systems together is load-bearing and directly guards against
MC-1.

**Wait-time**: After presenting the 1/3+1/3+1/3 computation, give
extended wait-time before revealing the rounded-sum discrepancy — let
the learner compute 0.33+0.33+0.33 themselves and notice it isn't 1.

**Load-bearing sentences**:
- "Significant figures and decimal places are different counting
  systems — never assume they give the same answer."
- "Small rounding errors can add up — carry full precision until the
  final step whenever possible."

**Voice channel note**: See `foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

Directly reusing the Blueprint's own P77 4-problem gate set and P76
transfer probe, not restated in full — cite by reference:

**Gate 1** (Blueprint Problem 1): round 7.8652 to the nearest
thousandth, and separately to the nearest tenth. Pass: 7.865; 7.9.

**Gate 2** (Blueprint Problem 2): round 0.020389 to 3 significant
figures, explaining which digits were excluded. Pass: 0.0204; leading
zeros excluded, first 3 significant digits 2,0,4 (rounding based on
the next digit).

**Gate 3** (Blueprint Problem 3): state how many significant figures
150.0 has, explaining why the trailing zero counts (unlike bare 150).
Pass: 4 significant figures; the decimal point makes the trailing
zero's precision explicit.

**Gate 4** (Blueprint Problem 4): compute 1/7 seven times summed
exactly versus rounding 1/7≈0.14 first and summing seven copies,
comparing results. Pass: exact=1; rounded=0.98; discrepancy explained.

**Gate 5** (Blueprint P76, independence transfer probe): an
accountant sums 90 daily sales figures, each individually rounded to
the nearest dollar. Explain why the total might differ from the exact
sum, whether the discrepancy is likely larger with 90 terms than with
3, and suggest a process fix. Pass: correctly explains accumulated
rounding error, confirms it's likely larger with more terms, and
suggests rounding only the final total (not each daily figure) while
still reporting individual figures to the nearest dollar for
record-keeping.

**Mastery criterion**: 5/5 on the full Blueprint item bank (4 P77 items
+ P76), consistent with KG mastery_threshold 0.85 (⌈0.85×5⌉=5).

## Tutor Recovery Strategy

Likeliest utterance: "I rounded to 2 places like you asked, but you're
saying that's wrong?" — the concept-specific smaller question: "did I
mean 2 significant figures, or 2 places after the decimal point?"
directly surfaces MC-1 by forcing an explicit disambiguation of which
counting system was intended, converting an assumed-equivalent
instruction into two genuinely different, separately checkable tasks.

## Memory Hooks

**Type**: procedural (rounding to a decimal place via the
digit-to-the-right rule; rounding to significant figures via the
first-nonzero-digit rule) + declarative (significant figures ≠ decimal
places; rounding errors can accumulate). Review form: fresh rounding
prompts alternating between decimal-place and significant-figure
instructions on the SAME starting number, periodically paired with a
multi-step accumulated-error calculation to keep MC-2's guard-rail
active. Interleaving partner: `math.arith.place-value` (the positional
digit-value system rounding operates on).

## Transfer Connections

**Near transfer**:
- `math.arith.estimation` (per KG `unlocks`; rounding is the core
  mechanical tool estimation builds on)
- `math.arith.significant-figures` (per KG `unlocks`; this concept's
  LO2 previews the significant-figures counting rules that concept
  formalizes in depth)

**Far transfer**:
- Scientific measurement and reporting: significant figures directly
  communicate a measurement's actual precision, distinct from mere
  decimal-place count
- Computing: floating-point number representation involves rounding
  and accumulated-error phenomena directly analogous to this concept's
  MC-2

## Cross-Subject Connections

Per KG `cross_links` [`math.num.floating-point`]: confirmed via
directory listing (per the Blueprint's own Component 7 check) that no
Blueprint yet exists for `math.num.floating-point` — P76_mode is
independence per the Blueprint's own GR-9 determination. No Educational
Brain entry yet exists for `math.num.floating-point` either (verified
via directory listing this batch). A future revision, once that
concept is authored, may add a genuine cross-link probe connecting
this concept's accumulated-rounding-error insight directly to how
computers internally represent and accumulate floating-point rounding
error.

## Blueprint References

Blueprint: `docs/curriculum/blueprints/math.arith.rounding.md` (all
structural/grammar/content/AIR checks PASS).

Full Teaching Actions (A01 through A04/mastery gate) and Protocol B
repair actions (B01 through B03) reused by reference above and not
restated in full; the Misconception Registry (MC-1 through MC-3) and
the P77/P76 mastery-gate item bank cited directly by ID.

## Runtime Asset References

None seeded yet in `src/lib/teaching/assets/brainSeedAssets.ts` or the
live DB for this concept — this entry does not create any.

## Curriculum Feedback

No structural KG issues found. This concept's two prerequisites
(`math.arith.place-value`, `math.arith.decimals`) and two unlocks
(`math.arith.estimation`, `math.arith.significant-figures`) match the
Blueprint's own Component 7 exactly. The `math.num.floating-point`
cross-link is confirmed genuinely not-yet-authored (consistent with
the Blueprint's own V-5 check), carried forward honestly here.

## Version History

| Version | Date | Author | Change |
|---|---|---|---|
| 1.0 | 2026-07-26 | Curriculum Completion Program (math.arith domain, Wave 5 part 1, autonomous loop) | Initial entry, grounded in the existing Blueprint. |
