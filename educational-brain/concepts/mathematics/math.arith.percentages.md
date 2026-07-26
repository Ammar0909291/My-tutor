# Percentages — `math.arith.percentages`

## Identity

- **Concept ID**: `math.arith.percentages` (canonical mathematics KG)
- **Curriculum location**: mathematics / arithmetic — no parent in
  KG; children: `math.arith.percentage-calculations`, `math.arith.
  percentage-change`
- **Prerequisites**: `math.arith.fractions` (a percentage is a fraction
  with denominator fixed at 100), `math.arith.decimals` (used directly
  for percentage-to-decimal conversion).
- **Unlocks**: `math.arith.percentage-change` (per the live KG — see
  Curriculum Feedback for a Blueprint/KG discrepancy noted honestly
  below).
- **Related** (from KG): `math.arith.fractions`, `math.arith.ratios`.
- **Difficulty**: developing · **Bloom**: apply · **Mastery
  threshold**: 0.85 · **Est. hours**: 10 (KG value; Blueprint metadata
  independently states 4 — see Curriculum Feedback)
- **Blueprint**: `docs/curriculum/blueprints/math.arith.percentages.md`
  (MAMR: MC-1 PERCENT-ASSUMED-DIFFERENT-KIND-OF-NUMBER is
  FOUNDATIONAL; P76_mode independence, cross_links=[] per Blueprint).
- **Aliases** (from KG): "percent", "per cent", "%".

## Learning Objective

The learner can: define x%=x/100, recognizing a percentage as simply
`math.arith.fractions`'s own p/q notation with the denominator fixed
at 100, and convert freely between percentage, fraction, and decimal
notation for the same value; compute "x% of N" by multiplying N by the
fraction x/100 (equivalently the decimal x/100); and recognize, at an
orientation level, that sequential percentage changes (an increase
followed by an equal decrease) do NOT cancel, since each is computed
relative to a different (shifting) base.

## Core Understanding

A percentage is a fraction with the denominator standardized to 100 —
"percent" ("per centum," per hundred) means x% is EXACTLY the fraction
x/100, not a new kind of number. Every percentage instantly converts
to a decimal (via `math.arith.decimals`'s place-value notation — x/100
shifts the decimal point two places) and to a fraction in lowest terms
(by simplifying x/100) — all three notations describe the identical
value. Computing "x% of N" means literally computing (x/100)×N — the
SAME operation as finding a fraction of a quantity, with the specific
fraction x/100 substituted in; no new arithmetic operation is
introduced. Sequential percentage changes are computed relative to a
BASE that can shift: a 20% increase followed by a 20% decrease does
NOT return to the original value, because the increase is 20% of the
ORIGINAL value while the decrease is 20% of the NEW (already-increased,
larger) value — the decrease removes more in absolute terms than the
increase added.

## Mental Models

- **Beginner model — "percentages, fractions, and decimals are three
  different kinds of numbers, each needing its own arithmetic"**: the
  learner treats percentage problems as requiring an entirely separate
  toolkit rather than recognizing x% as literally x/100, sometimes
  unable to convert fluently between the three notations for the same
  value. Shelf-life warning: this model can coexist with memorized
  percentage formulas that happen to work, delaying recognition that
  the underlying operation is always ordinary fraction/decimal
  arithmetic.
- **Intermediate model — "I fluently convert between percentage,
  fraction, and decimal, and I correctly compute 'x% of N' as
  multiplication, but I still expect a percentage increase followed by
  an equal decrease to return to the original value"**: the learner
  has cleared the notation-equivalence and computation confusions but
  hasn't yet recognized that sequential percentage changes use
  shifting bases. Upgrade trigger: being asked to trace through a
  concrete price that increases then decreases by the same percentage
  and compute the actual final value.
- **Advanced model — "x% is exactly x/100, freely interconvertible
  with fractions and decimals; 'percent of' is ordinary multiplication
  by that fraction; and sequential percentage changes never simply
  cancel, because each is computed relative to whatever the CURRENT
  value is at that moment"**: the learner fluently moves between all
  three notations, correctly computes percentage-of problems via
  either route, and correctly predicts that sequential percentage
  changes leave a net difference from the original value. Upgrade
  trigger: being asked to compute the net effect of two DIFFERENT
  sequential percentage changes (not just a symmetric increase/
  decrease pair) and explain the direction of the discrepancy.
- **Do not upgrade early**: a learner who still treats percentages as
  a separate kind of number (beginner model, MC-1) should not be
  pushed toward the sequential-change base-shifting insight (advanced
  model, MC-3) before the notation-equivalence and "percent of"
  computation are both fully secure — MC-1 is FOUNDATIONAL, since
  every later skill in this concept depends on first recognizing x% as
  x/100.

## Why Students Fail

The dominant, FOUNDATIONAL failure believes a percentage is a
fundamentally different kind of number from a fraction or decimal,
requiring its own separate arithmetic, missing that x% IS x/100,
simply a fraction with a fixed denominator, freely interconvertible
with decimals via a place-value shift. A second failure believes
"percent of" requires a genuinely different arithmetic procedure from
finding a fraction of a quantity, missing that it is literally
multiplication by the fraction x/100 — the same operation as any other
"fraction of" computation, just with a specific fraction substituted
in. A third, orientation-level failure believes a percentage increase
followed by an equal percentage decrease returns a quantity to its
original value, missing that each change is computed relative to a
DIFFERENT (shifting) base — the decrease, computed on the larger,
already-increased value, removes more in absolute terms than the
increase added.

## Misconceptions

Reusing the Blueprint's Misconception Registry, birth-type
classification added per this program's diagnostic procedure — not
re-derived:

### MC-1: PERCENT-ASSUMED-DIFFERENT-KIND-OF-NUMBER (Foundational; Type 5 — instruction-induced)
**Trigger**: asked whether a percentage is a fundamentally different
kind of number from a fraction or decimal, learner answers yes —
percentages are often introduced with their own dedicated notation and
procedures before the underlying fraction identity (x%=x/100) is made
explicit.
**Repair**: 35%=35/100=7/20 (simplified)=0.35 — all three represent the
IDENTICAL value; none is more "correct" than another, they are simply
three notations for one number.
**MAMR**: FOUNDATIONAL — every later computation and sequential-change
skill in this concept depends on first recognizing x% as x/100; must
clear before MC-2 or MC-3.

### MC-2: PERCENT-OF-ASSUMED-SPECIAL-PROCEDURE (High; Type 5 — instruction-induced)
**Trigger**: asked whether computing "x% of N" requires a genuinely
different arithmetic procedure from finding a fraction of a quantity,
learner answers yes — "percent of" problems are often taught as a
distinct word-problem category with their own formula, obscuring that
it is ordinary fraction multiplication.
**Repair**: computing "15% of 80" via the decimal route (0.15×80=12)
and the fraction route (15/100×80=1200/100=12) gives the IDENTICAL
answer — "percent of" is exactly the same "multiply by a fraction"
operation, just with x/100 substituted in.

### MC-3: SEQUENTIAL-PERCENT-CHANGES-ASSUMED-TO-CANCEL (Moderate; Type 1 — overgeneralization)
**Trigger**: asked whether a 20% increase followed by a 20% decrease
returns a quantity to its original value, learner answers yes —
over-generalizes a naive "opposite operations cancel" intuition onto
percentage changes, without recognizing the base shifts between the
two calculations.
**Repair**: a $100 item that increases 20% becomes $120; decreasing
THAT by 20% removes $24 (20% of the new $120 base, not the original
$100), giving $96 — not back to $100, because the second percentage
was computed on a different, larger base.

## Analogies

**Primary — three labels for one identical measurement (extending the
notation-equivalence framing)**: describing a container as "35% full,"
"7/20 full," or "0.35 full" are three different LABELS for the
identical amount of liquid — none of the three labels changes how much
liquid is actually in the container; converting between them is
relabeling, not recomputing a different quantity.

**Anti-analogy to retire**: "Percentages are their own special topic in
math, separate from fractions and decimals." This directly invites
MC-1 by suggesting percentages require an independent conceptual
framework rather than being a specific notational convention applied
to already-known fraction/decimal arithmetic.

## Demonstrations

**Three-way conversion (Blueprint's own Example 1)**: 35%=35/100=7/20
(simplified)=0.35 — all three notations for the identical value.

**Dual-route "percent of" (Blueprint's own Example 2)**: 15% of 80 via
the decimal route (0.15×80=12) and the fraction route
(15/100×80=1200/100=12) — identical answer, confirming "percent of" is
ordinary multiplication.

**Shifting-base contrast (Blueprint's own Example 3)**: a $100 item
increases 20% to $120, then decreases 20% (of the NEW $120 base,
removing $24) to $96 — not back to $100, since the 20% increase and
20% decrease were computed on two DIFFERENT bases.

## Discovery Questions

Present a $100 item that increases 20% then decreases 20% and ask the
learner to predict the final price before computing — the learner's
likely "$100, back to the start" guess is directly falsifiable by
computing both steps explicitly (arriving at $96), motivating the
base-shifting insight from a concrete, self-checkable surprise.
Recommendation: guided discovery for the sequential-change
non-cancellation (directly experiential from the surprising $96
result); direct instruction for the three-way notation-conversion
mechanics (MC-1's repair), since the decimal-point-shift and
fraction-simplification procedures are not independently
rediscoverable without being demonstrated.

## Teaching Sequence

MC-1 (percent assumed different kind of number) is addressed first,
since recognizing x% as x/100 is the foundation every later computation
depends on. MC-2 (percent-of assumed special procedure) is addressed
second, via the dual-route computation. MC-3 (sequential changes
assumed to cancel) is addressed last, as an orientation-level preview
rather than the concept's core computational scope.

## Tutor Actions

| Student state | Recommended action | Source |
|---|---|---|
| MC-1 active (percent assumed different kind of number) | WORKED EXAMPLE: three-way conversion (35%=7/20=0.35) | Teaching Actions: SHOW §1 |
| MC-2 active (percent-of assumed special procedure) | DEMONSTRATION: dual-route "percent of" computation (decimal vs. fraction route) | Teaching Actions: SHOW §3 |
| MC-3 active (sequential changes assumed to cancel) | DEMONSTRATION: shifting-base price contrast ($100→$120→$96) | Teaching Actions: SHOW §3 |
| Ready for transfer | THOUGHT EXPERIMENT: "save 30% then an extra 10%" discount stacking, evaluated against a naive "40% off" assumption (Blueprint P76) | Teaching Actions: TEST-THINKING §4 |

## Voice Teaching Notes

**Register**: Say "x percent IS x over 100" as the default anchor
whenever a percentage problem is introduced — the identity statement
is load-bearing and directly guards against MC-1.

**Wait-time**: After presenting the $100→$120→$96 shifting-base
scenario, give extended wait-time before revealing why it doesn't
return to $100 — let the learner compute both steps and notice the
discrepancy themselves.

**Load-bearing sentences**:
- "A percentage is just a fraction over 100 — nothing more."
- "Each percentage change is computed on whatever the current value is
  right now, not the original."

**Voice channel note**: See `foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

Directly reusing the Blueprint's own P77 4-problem gate set and P76
transfer probe, not restated in full — cite by reference:

**Gate 1** (Blueprint Problem 1): convert 60% to a simplified fraction
and a decimal. Pass: 3/5, 0.60.

**Gate 2** (Blueprint Problem 2): compute 25% of 160 via both the
decimal and fraction routes, confirming agreement. Pass: 40 both ways.

**Gate 3** (Blueprint Problem 3): a $50 item increases 10% then
decreases 10% — compute the final price and explain why it isn't
exactly $50. Pass: $49.50; correct shifting-base explanation.

**Gate 4** (Blueprint Problem 4): explain in one sentence why x% is
not a new kind of number distinct from fractions and decimals. Pass:
correct identity-based explanation.

**Gate 5** (Blueprint P76, independence transfer probe): "Save 30%
today, then an extra 10% off at checkout" on a $200 item — compute the
final price, and evaluate a customer's claim that this is "basically a
40% discount." Pass: $200×0.70=$140, then $140×0.90=$126; correctly
identifies this is NOT equivalent to a flat 40% discount ($200×0.60=
$120), since the second discount was computed on the already-reduced
$140 base, not the original $200.

**Mastery criterion**: 5/5 on the full Blueprint item bank (4 P77 items
+ P76), consistent with KG mastery_threshold 0.85 (⌈0.85×5⌉=5).

## Tutor Recovery Strategy

Likeliest utterance: "the store said save 30% then an extra 10%, so
that's 40% off total, right?" — the concept-specific smaller question:
"what is the second discount computed on — the original price, or the
already-discounted price?" directly surfaces MC-3 by pointing the
learner at exactly which base each percentage was applied to,
converting an appealing but incorrect arithmetic shortcut into a
checkable two-step computation.

## Memory Hooks

**Type**: procedural (converting between percentage/fraction/decimal;
computing "percent of" via multiplication) + declarative (sequential
percentage changes use shifting bases, not simple cancellation).
Review form: fresh conversion and "percent of" prompts, periodically
paired with a sequential-percentage-change scenario to keep MC-3's
guard-rail active. Interleaving partner: `math.arith.decimals` (the
place-value shift percentage-to-decimal conversion depends on).

## Transfer Connections

**Near transfer**:
- `math.arith.percentage-change` (per KG `unlocks`; this concept's
  orientation-level sequential-change preview is formalized in full
  there)

**Far transfer**:
- `math.arith.ratios` (per KG `related`; a percentage is itself a
  specific standardized ratio, per-hundred)
- Everyday financial contexts: interest rates, discounts, taxes, and
  tips all directly apply this concept's "percent of" computation

## Cross-Subject Connections

Per KG `cross_links` [] (empty) — no Tier 1 cross-subject link exists
for this concept, consistent with the Blueprint's own Component 7
GR-9 determination (P76_mode independence). Not fabricated beyond what
the KG and Blueprint state.

## Blueprint References

Blueprint: `docs/curriculum/blueprints/math.arith.percentages.md`
(all structural/grammar/content/AIR checks PASS).

Full Teaching Actions (A01 through A04/mastery gate) and Protocol B
repair actions (B01 through B03) reused by reference above and not
restated in full; the Misconception Registry (MC-1 through MC-3) and
the P77/P76 mastery-gate item bank cited directly by ID.

## Runtime Asset References

None seeded yet in `src/lib/teaching/assets/brainSeedAssets.ts` or the
live DB for this concept — this entry does not create any.

## Curriculum Feedback

Two genuine Blueprint/KG discrepancies found, recorded honestly, not
fixed (no KG or Blueprint file modified this batch): (1) the live KG
lists `unlocks: [math.arith.percentage-change]` for this concept,
while the Blueprint's own Component 0 metadata table and Component 7
both state "unlocks: none listed in the KG" — this entry follows the
KG as authoritative per this program's standing rule, listing the
unlock in Identity above. (2) the KG's `estimated_hours` is 10, while
the Blueprint's own Component 0 states `estimated_hours: 4` — a
numeric mismatch, also resolved in favor of the KG value. Neither
discrepancy affects the Blueprint's pedagogical content.

## Version History

| Version | Date | Author | Change |
|---|---|---|---|
| 1.0 | 2026-07-26 | Curriculum Completion Program (math.arith domain, Wave 5 part 1, autonomous loop) | Initial entry, grounded in the existing Blueprint. Two Blueprint/KG metadata discrepancies found and recorded (unlocks list, estimated_hours), resolved in favor of the KG per standing rule. |
