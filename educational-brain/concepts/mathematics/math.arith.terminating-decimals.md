# Terminating Decimals — `math.arith.terminating-decimals`

## Identity

- **Concept ID**: `math.arith.terminating-decimals` (canonical
  mathematics KG)
- **Curriculum location**: mathematics / arithmetic — child of
  `math.arith.decimals` (no children in KG)
- **Prerequisites**: `math.arith.decimals` (a terminating decimal is a
  specific kind of decimal expansion).
- **Unlocks**: none in KG.
- **Related** (from KG): `math.arith.repeating-decimals`.
- **Difficulty**: developing · **Bloom**: understand · **Mastery
  threshold**: 0.85 · **Est. hours**: 2
- **Blueprint**: none exists at `docs/curriculum/blueprints/
  math.arith.terminating-decimals.md` (verified via directory
  listing). Misconceptions below authored directly via the
  birth-taxonomy diagnostic procedure (`educational-brain/
  misconceptions/01-birth-types.md`).
- **Aliases** (from KG): "finite decimals".

## Learning Objective

The learner can: state that a terminating decimal is one whose digits
end after finitely many places; correctly determine, from a fraction's
DENOMINATOR (in lowest terms), whether its decimal expansion will
terminate, by checking whether the denominator's only prime factors
are 2 and 5; and recognize a terminating decimal and its originating
fraction as the identical value in two different notations, not two
different numbers.

## Core Understanding

A terminating decimal is a decimal whose digits end after finitely
many places (e.g., 0.75, 0.5, 0.125). Whether a fraction (in lowest
terms) has a terminating decimal expansion is determined ENTIRELY by
its DENOMINATOR's prime factorization: if the denominator's only prime
factors are 2 and 5 (the prime factors of 10, the base of the decimal
system), the decimal terminates — 1/4 (denominator 4=2²) terminates as
0.25; 3/8 (denominator 8=2³) terminates as 0.375; 7/20 (denominator
20=2²×5) terminates as 0.35. If the denominator has ANY OTHER prime
factor (3, 7, 11, …), the decimal does NOT terminate — 1/3
(denominator 3) gives 0.333…, repeating forever. The NUMERATOR plays
no role whatsoever in determining termination — only the denominator's
prime factors matter. A terminating decimal and the fraction it came
from are the IDENTICAL value, simply written in two different
notations — 3/4 and 0.75 are not "close" or "equivalent approximations"
of each other, they are the same number.

## Mental Models

- **Beginner model — "whether a fraction's decimal terminates depends
  on what the numerator looks like"**: the learner focuses on the
  numerator (perhaps because it's read first, e.g. "three-fifths")
  when guessing whether a decimal will terminate, missing that the
  denominator's prime factorization is the sole determining factor.
  Shelf-life warning: this model can produce correct guesses by luck
  when comparing fractions with the same denominator, delaying
  detection.
- **Intermediate model — "I check the denominator's prime factors to
  determine termination, but I sometimes assume any 'small' or
  'simple-looking' denominator will terminate without actually
  factoring it"**: the learner correctly focuses on the denominator but
  substitutes a rough "feels simple" heuristic for the actual
  prime-factorization check, occasionally misjudging a denominator like
  6 (=2×3, which does NOT terminate due to the factor of 3) as simple
  enough to terminate. Upgrade trigger: being asked to factor a
  denominator like 6 or 12 explicitly and check each prime factor
  against {2, 5}.
- **Advanced model — "a fraction (in lowest terms) terminates if and
  only if its denominator's prime factorization contains only 2s and
  5s, with no exceptions; the terminating decimal IS the fraction,
  just in different notation"**: the learner reliably factors any
  denominator and correctly predicts termination, and treats the
  fraction/decimal pair as identical values rather than separate
  approximate representations. Upgrade trigger: being asked to predict,
  without computing the actual decimal, whether a fraction with a large
  or unfamiliar denominator will terminate, based purely on its prime
  factorization.
- **Do not upgrade early**: a learner who still focuses on the
  numerator (beginner model, MC-1) should not be pushed toward
  reliable denominator-factoring (intermediate/advanced models) before
  first recognizing that the denominator alone determines termination —
  MC-1 is FOUNDATIONAL, since it points the learner's attention at
  entirely the wrong part of the fraction.

## Why Students Fail

The dominant, FOUNDATIONAL failure believes whether a fraction's
decimal terminates depends on the NUMERATOR rather than the
denominator — the numerator is often named and read first ("three
fifths"), making it feel like the more significant part of the
fraction, when in fact it plays no role in determining termination at
all. A second failure assumes any fraction with a "small" or
simple-looking denominator will terminate, without actually checking
its prime factors — a denominator like 6 (=2×3) looks simple but does
NOT terminate, since 3 is not among the permitted prime factors {2,5}.
A third failure believes the terminating decimal is a genuinely
different (and perhaps less precise) number from the fraction it came
from, rather than recognizing the two notations describe the identical
value exactly.

## Misconceptions

Authored directly via the birth-taxonomy diagnostic procedure — no
Blueprint exists for this concept:

### MC-1: TERMINATING-DECIMAL-DETERMINED-BY-NUMERATOR (Foundational; Type 1 — overgeneralization)
**Description**: Learner believes whether a fraction's decimal
terminates depends on the numerator, over-generalizing from the fact
that the numerator is read/named first in a fraction's verbal form
("three fifths") to assuming it carries the more significant
information about the fraction's decimal behavior.
**Trigger condition**: asked to predict whether a given fraction's
decimal will terminate, learner reasons about the numerator's value
rather than factoring the denominator.
**Repair target**: hold the denominator fixed and vary the numerator
(1/8, 3/8, 5/8, 7/8 — all terminate, since the denominator 8=2³ is
unchanged across all four) — the numerator's value never affects
whether termination occurs.
**MAMR**: FOUNDATIONAL — pointing attention at the wrong part of the
fraction undermines every later termination-prediction task.

### MC-2: ANY-SIMPLE-LOOKING-FRACTION-ASSUMED-TERMINATING (Moderate; Type 2 — perceptual intuition)
**Description**: Learner assumes a fraction with a "small" or familiar
denominator will terminate without actually checking its prime
factors — small numbers "feel" like they should produce short,
terminating decimals.
**Trigger condition**: given a fraction whose denominator is small but
has a prime factor other than 2 or 5 (e.g., 1/6, 1/3, 1/12).
**Repair target**: explicitly factor the denominator before judging —
6=2×3 (the factor 3 means it does NOT terminate, despite looking
simple); contrast against 8=2³ (terminates) and 20=2²×5 (terminates),
showing "small" is not the relevant property — the PRIME FACTORS are.

### MC-3: TERMINATING-MEANS-EXACT-VALUE-DIFFERENT-FROM-FRACTION (Moderate; Type 3 — language contamination)
**Description**: Learner treats the terminating decimal as a
genuinely different (perhaps approximate) number from the original
fraction, rather than recognizing the two notations describe the
identical value — informal usage often treats "fraction" and
"decimal" as separate categories of number rather than different
notations for one value.
**Trigger condition**: asked whether 3/4 and 0.75 are "the same
number" or merely "close," learner hesitates or says they're
different/approximate.
**Repair target**: 3/4=0.75 exactly, with no rounding or approximation
involved — verify by long division: 3÷4=0.75 exactly, terminating with
no remainder; the decimal notation and fraction notation are two
different ways of writing the identical value.

## Analogies

**Primary — two spellings of the same word (a notation-equivalence
framing)**: "colour" and "color" are two different spellings of the
IDENTICAL word, not two different words that happen to mean similar
things. A terminating decimal and its originating fraction work
identically — 0.75 and 3/4 are two different "spellings" (notations)
for the exact same number, not two related-but-distinct values.

**Anti-analogy to retire**: "You can tell if a fraction terminates by
looking at how the fraction looks overall." This directly invites both
MC-1 (numerator focus) and MC-2 ("simple-looking" heuristic) by
suggesting an unspecified visual impression rather than the precise
denominator-prime-factorization rule.

## Demonstrations

**Numerator-irrelevance contrast (targets MC-1)**: 1/8, 3/8, 5/8, 7/8
all terminate (0.125, 0.375, 0.625, 0.875) — the denominator 8=2³ is
identical across all four, and every one terminates regardless of
which numerator is used.

**Denominator-factoring contrast (targets MC-2)**: 1/6 (denominator
6=2×3, contains the disallowed factor 3, so it does NOT terminate:
0.1666…) versus 1/8 (denominator 8=2³, only the allowed factor 2, so
it terminates: 0.125) — despite 6 looking "smaller and simpler" than 8.

**Notation-equivalence check (targets MC-3)**: long division of 3÷4
gives exactly 0.75 with a remainder of 0 — no rounding, no
approximation, confirming 3/4 and 0.75 are the identical value.

## Discovery Questions

Present 1/6 and 1/8 side by side and ask the learner to predict, before
computing, which one will terminate — the learner's likely "1/6, since
6 is smaller" guess is directly falsifiable by computing both decimals
(1/6=0.1666…, does not terminate; 1/8=0.125, terminates), motivating
the need for an actual prime-factorization rule rather than a size-based
guess. Recommendation: guided discovery for the "smaller isn't the
relevant property" realization (directly experiential from the
surprising 1/6-vs-1/8 result); direct instruction for the precise
prime-factorization rule itself (the {2,5}-only criterion), since this
specific rule is not independently rediscoverable without being
stated.

## Teaching Sequence

MC-1 (terminating decimal determined by numerator) is addressed
first, since redirecting attention to the denominator is the
foundational correction every later skill depends on. MC-2 (any
simple-looking fraction assumed terminating) is addressed second,
replacing a vague size-based heuristic with the precise
prime-factorization check. MC-3 (terminating means a different value
from the fraction) is addressed last, as a notation-equivalence
concern rather than a termination-prediction skill.

## Tutor Actions

| Student state | Recommended action | Source |
|---|---|---|
| MC-1 active (determined by numerator) | DEMONSTRATION: numerator-irrelevance contrast (1/8, 3/8, 5/8, 7/8 all terminate) | Teaching Actions: SHOW §3 |
| MC-2 active (simple-looking fraction assumed terminating) | DEMONSTRATION: denominator-factoring contrast (1/6 vs. 1/8) | Teaching Actions: SHOW §3 |
| MC-3 active (terminating decimal is a different value) | WORKED EXAMPLE: long-division notation-equivalence check (3÷4=0.75 exactly) | Teaching Actions: SHOW §1 |
| Ready for transfer | THOUGHT EXPERIMENT: predict termination for a fraction with a large, unfamiliar denominator via prime factorization alone | Teaching Actions: TEST-THINKING §4 |

## Voice Teaching Notes

**Register**: Say "check the denominator's prime factors" as the
default first move for any termination question — naming the
denominator specifically is load-bearing and directly guards against
MC-1.

**Wait-time**: After presenting the 1/6-vs-1/8 prediction task, give
extended wait-time before revealing the actual decimals — let the
learner commit to a size-based guess before the surprising result
corrects it.

**Load-bearing sentences**:
- "The numerator never determines termination — only the denominator's
  prime factors do."
- "A terminating decimal isn't a different number from its fraction —
  it's the exact same value, different notation."

**Voice channel note**: See `foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

### Gate 1 (MC-1 check)
Do 2/9 and 5/9 both terminate or both fail to terminate? Explain why,
referencing the denominator. Pass: both fail to terminate (denominator
9=3², contains the disallowed factor 3); numerator plays no role.

### Gate 2 (MC-2 check)
Does 1/12 terminate? Explain by factoring the denominator. Pass: no —
12=2²×3, contains the disallowed factor 3, so it does not terminate,
despite 12 seeming like a common, simple denominator.

### Gate 3 (MC-3 check)
Is 7/8 exactly equal to 0.875, or merely a close approximation?
Justify using long division. Pass: exactly equal — 7÷8=0.875 exactly,
no remainder, confirming identical values in different notation.

### Gate 4 (application)
Without computing the actual decimal, determine whether 17/40
terminates. Pass: yes — 40=2³×5, only allowed prime factors, so it
terminates.

### Transfer probe (independence mode — no cross_links)
A fraction has a denominator of 2⁵×5³×7. Will its decimal expansion
terminate? Explain your reasoning using only the prime factorization,
without computing the actual decimal value. Pass: no — the denominator
contains the disallowed prime factor 7, so despite also containing
allowed factors 2 and 5, the presence of ANY disallowed prime factor is
sufficient to prevent termination.

**Mastery criterion**: correct performance on all 4 gates plus the
transfer probe, consistent with KG mastery_threshold 0.85.

## Tutor Recovery Strategy

Likeliest utterance: "I thought since the top number seemed simple,
this fraction would give a short decimal" — the concept-specific
smaller question: "what are the prime factors of the BOTTOM number?"
directly redirects the learner's attention from the numerator (where
it doesn't belong) to the denominator's prime factorization (the
actual determining property), converting a vague size-based guess into
a precise, checkable rule.

## Memory Hooks

**Type**: procedural (factoring a denominator and checking its prime
factors against {2,5}) + declarative (the numerator is irrelevant to
termination; a terminating decimal equals its fraction exactly).
Review form: fresh termination-prediction prompts across a range of
denominators (including "simple-looking" non-terminating ones like 6
or 12), periodically paired with a numerator-varying check (holding the
denominator fixed) to keep MC-1's guard-rail active. Interleaving
partner: `math.arith.repeating-decimals` (the complementary case, where
the decimal does NOT terminate).

## Transfer Connections

**Near transfer**:
- `math.arith.repeating-decimals` (per KG `related`; every rational
  number's decimal expansion either terminates or repeats — these two
  concepts are exhaustive complements)

**Far transfer**:
- Prime factorization (`math.nt`, number theory) is the direct
  mathematical tool this concept's termination test relies on
- Base-n number systems: which fractions terminate depends on the
  chosen base's prime factors, generalizing this concept's base-10-
  specific {2,5} rule (per `math.arith.number-base`)

## Cross-Subject Connections

Per KG `cross_links` [] (empty) — no Tier 1 cross-subject link exists
for this concept. No cross-subject connection is fabricated beyond
what the KG states.

## Blueprint References

None exists at `docs/curriculum/blueprints/
math.arith.terminating-decimals.md` (verified via directory listing
before authoring this entry). All misconceptions, demonstrations, and
assessment items above are authored directly for this Educational
Brain entry, not sourced from a Blueprint.

## Runtime Asset References

None seeded yet in `src/lib/teaching/assets/brainSeedAssets.ts` or the
live DB for this concept — this entry does not create any.

## Curriculum Feedback

No structural KG issues found. This concept's single prerequisite
(`math.arith.decimals`) and empty `unlocks`/`cross_links` are
consistent with its narrow, conceptual, terminal-leaf role in the
domain. Its `related` link to `math.arith.repeating-decimals` reflects
a genuine exhaustive-complement relationship (every rational number's
decimal either terminates or repeats), not a formal KG prerequisite.

## Version History

| Version | Date | Author | Change |
|---|---|---|---|
| 1.0 | 2026-07-26 | Curriculum Completion Program (math.arith domain, Wave 5 part 2, autonomous loop) | Initial entry. No Blueprint exists; misconceptions authored directly via the birth-taxonomy diagnostic procedure. |
