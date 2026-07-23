# Radioactive Decay Law and Half-Life — `phys.mod.radioactive-decay`

## Identity

- **Concept ID**: `phys.mod.radioactive-decay` (canonical physics KG)
- **Curriculum location**: physics / modern physics — dependency level 14.
- **Prerequisites**: `phys.mod.radioactivity` — decay kinetics directly
  quantify the already-secure decay MECHANISMS (alpha/beta/gamma) with
  the exponential decay law and half-life.
- **Unlocks** (from KG): `phys.mod.nuclear-reactions` — a direct
  continuation into nuclear reaction dynamics.
- **Difficulty**: proficient · **Bloom**: apply · **Mastery threshold**: 0.85
  · **Est. hours**: 4

## Learning Objective

The learner can: (1) correctly explain that after TWO half-lives, the
sample is NOT completely gone — N=N₀×(1/2)ⁿ after n half-lives means
25% remains after 2 half-lives, since each half-life halves whatever
CURRENTLY remains (a multiplicative, never-reaching-zero process), not a
linear subtraction; (2) correctly write the decay equation as
N=N₀e^(−λt), NOT N=N₀e^(−t₁/₂×t) — the exponent must be DIMENSIONLESS
(λ has units s⁻¹, so λt is dimensionless; t₁/₂×t would have units of
time², a dimensional error), with λ=ln2/t₁/₂; (3) correctly explain that
half-life is a STATISTICAL/POPULATION property, NOT a prediction for
when any SPECIFIC nucleus will decay — a single nucleus decays randomly,
with 50% probability of decaying before t₁/₂ and 50% probability of
surviving past it; (4) correctly explain that ACTIVITY A(t)=λN(t) and the
NUMBER of nuclei N(t) decay with the SAME half-life and the SAME
exponential factor e^(−λt) — activity does NOT decrease faster than the
nuclei count, since λ is merely a constant proportionality factor.

## Core Understanding

After TWO half-lives, the sample is NOT completely decayed — this is a
common and consequential error arising from LINEAR thinking applied to
an EXPONENTIAL (multiplicative) process: N=N₀×(1/2)ⁿ after n half-lives
gives, for n=2, N=N₀×(1/4)=25% remaining, NOT zero. The correct mental
model is that each half-life halves whatever quantity CURRENTLY remains
— not the original amount — so the process compounds rather than
subtracts, and the remaining quantity approaches zero asymptotically but
NEVER reaches it exactly (after 10 half-lives, roughly 0.1% remains;
after 20, roughly 0.0001%, always strictly positive). A second, precise
and frequently confused point concerns the exact FORM of the decay
equation: the correct formula is N=N₀e^(−λt), where λ is the DECAY
CONSTANT (units s⁻¹) — NOT N=N₀e^(−t₁/₂×t), which conflates the half-life
t₁/₂ (a DURATION, units of seconds) with the decay constant λ. This error
is immediately exposed by dimensional analysis: the EXPONENT in an
exponential must be DIMENSIONLESS — λt (rate×time) is dimensionless, but
t₁/₂×t (time×time) has units of seconds², a dimensional impossibility;
the correct relationship is λ=ln2/t₁/₂ (derived directly from the
definition that N(t₁/₂)=N₀/2). A third, deeply important conceptual
point: the half-life does NOT predict when any SPECIFIC, individual
nucleus will decay — "half-life" sounds like "lifetime," inviting the
mistaken belief that a single nucleus with t₁/₂=1600 years will
definitely decay after 1600 years. In reality, radioactive decay is a
fundamentally PROBABILISTIC process at the level of a single nucleus: any
one nucleus has EXACTLY a 50% probability of decaying before t₁/₂ and a
50% probability of surviving past it — the half-life is a POPULATION
statistic (valid for large ensembles of identical nuclei), not an
individual-level prediction; the full probabilistic statement is
P(decayed by time t)=1−e^(−λt). A fourth point addresses the relationship
between ACTIVITY (the rate of decays per unit time, A(t)=λN(t)) and the
raw NUMBER of remaining nuclei N(t): these two quantities decay with
EXACTLY the same exponential factor and therefore the SAME half-life —
A(t)=λN(t)=λN₀e^(−λt)=A₀e^(−λt) — activity does NOT decrease faster than
the nuclei count merely because it involves a "rate"; λ is simply a
constant proportionality factor that does not alter the shape or
timescale of the exponential decay curve.

## Mental Models

**Beginner**: "After two half-lives, all the material has decayed
(50%+50%=100%); the decay formula uses the half-life directly in the
exponent, N=N₀e^(−t₁/₂×t); the half-life tells you exactly when a
specific nucleus will decay; activity decreases faster than the number
of nuclei since it's 'the rate.'" Upgrade trigger: computing N after 2
half-lives explicitly (finding 25% remains, not 0%) directly confronts
the all-gone assumption; checking the dimensional units of t₁/₂×t vs. λt
directly confronts the wrong-exponent-variable assumption.

**Intermediate**: "N=N₀×(1/2)ⁿ always remains positive, approaching but
never reaching zero; the correct decay equation is N=N₀e^(−λt) with
λ=ln2/t₁/₂, a dimensionless exponent; half-life is a population/
probabilistic statistic, not an individual prediction; activity and
nuclei count share the same half-life exactly." This model correctly
captures all four results, but sometimes still needs to explicitly
verify dimensional consistency when writing a new decay-law expression.

**Advanced**: "Always verify the exponent's dimensionlessness before
trusting any decay-law formula; always frame half-life probabilistically
for individual particles, reserving deterministic language for large
populations only."

**Expert**: the full derivation of the decay law from the differential
equation dN/dt=−λN (a first-order linear ODE with exponential solution),
and its connection to the statistical mechanics of independent random
decay events (a Poisson process) — a natural consolidation directly
connecting to the KG unlock `phys.mod.nuclear-reactions`, not required
for mastery.

## Why Students Fail

The dominant failure is applying linear ("50% per half-life, so 100%
after 2") reasoning to an inherently exponential/multiplicative process;
closely related failures include confusing the decay constant λ with the
half-life t₁/₂ in the exponential formula (a dimensional error), treating
half-life as a deterministic prediction for a single nucleus rather than
a population statistic, and assuming activity decays faster than the
raw nuclei count.

## Misconceptions

Blueprint (`docs/curriculum/blueprints/phys.mod.radioactive-decay.md`,
Misconception Engine) documents four; reused by reference with birth-type
added.

- **MC-1 (after two half-lives, none of the sample remains)**: believing
  "after 2 half-lives, all the material has decayed," applying linear
  (50%+50%=100%) reasoning. **Birth type**: overgeneralization (Type 1)
  — linear/additive intuition is applied to an inherently multiplicative
  (exponential) process, missing that each half-life halves the CURRENT
  remaining amount, not the original. Probe: "A sample starts with 1000
  nuclei. After 2 half-lives, how many remain?"
- **MC-2 (N=N₀e^(−t₁/₂×t) is the decay equation)**: believing the
  half-life itself belongs in the exponent. **Birth type**:
  notation-induced (Type 4) — since t₁/₂ is the most memorable
  characteristic time, it is mistakenly substituted directly into the
  exponent in place of the decay constant λ, producing a dimensionally
  impossible formula. Probe: "At time t=t₁/₂, what does your equation
  predict for N?"
- **MC-3 (the half-life predicts when a specific nucleus will decay)**:
  believing "after 1600 years, the nucleus will have decayed" for a
  single nucleus with t₁/₂=1600 yr. **Birth type**: language
  contamination (Type 3) — "half-life" sounds like "lifetime," inviting a
  deterministic, individual-level reading rather than the correct
  population-statistic/probabilistic interpretation. Probe: "You have a
  single radium-226 nucleus with t₁/₂=1600 yr. Will it decay in exactly
  1600 years?"
- **MC-4 (activity and number of nuclei always decrease at the same
  rate — i.e., activity is assumed to decrease FASTER)**: believing
  "activity decreases faster than the number of nuclei because it's the
  rate." **Birth type**: language contamination (Type 3) — the word
  "rate" attached to activity invites an assumption that it must decay
  differently (faster) than the underlying quantity it measures, missing
  that A=λN simply scales N by a constant, preserving the same
  exponential timescale. Probe: "If a sample's half-life is 10 minutes,
  when does the activity reach half its initial value?"

## Analogies

**Best**: compound interest, where the amount after t years is
principal×(1+r)^t — the INTEREST RATE r (not some fixed duration) belongs
in the exponent, analogous to how the decay CONSTANT λ (not the duration
t₁/₂) belongs in the exponent of the decay law — directly targets MC-2 by
giving a familiar, structurally identical example of the correct
rate-vs-duration distinction.

**Anti-analogy**: do NOT say "half-life is like a person's average
lifespan" without immediately clarifying the probabilistic, population-
level nature of that statistic — this directly risks installing MC-3 by
implying a deterministic individual-level prediction.

## Demonstrations

Worked-example: compute N explicitly after 1, 2, and 10 half-lives,
showing the remaining fraction approaches but never reaches zero —
directly targets MC-1. Worked-example: perform dimensional analysis on
both N=N₀e^(−λt) and the incorrect N=N₀e^(−t₁/₂×t), showing only the
former has a dimensionless exponent — directly targets MC-2.

## Discovery Questions

Discovery-style: "if you roll a die repeatedly, removing it when it shows
a 6, does the die 'know' in advance how many rolls it will survive?" —
learner reasons through the probabilistic, memoryless nature of decay,
directly confronting MC-3.

## Teaching Sequence

Blueprint's assessment component cited by reference. MC-1 is addressed
first (establishing the multiplicative, never-zero nature of exponential
decay), before MC-2 (the correct dimensionless decay-law formula), before
MC-3 (the probabilistic, population-level meaning of half-life), before
MC-4 (activity and nuclei count sharing the same half-life) — this order
builds from the most basic quantitative behavior to progressively more
subtle statistical and dynamical distinctions.

## Tutor Actions

WORKED-EXAMPLE (N computed explicitly after 1, 2, 10 half-lives);
WORKED-EXAMPLE (dimensional analysis comparing correct and incorrect
decay-law exponents); ANALOGY (compound interest's rate-in-the-exponent
structure); DEMONSTRATION (die-rolling simulation for probabilistic
decay).

## Voice Teaching Notes

Listen for "after two half-lives it's all gone" or using t₁/₂ directly
in the exponent, or "the nucleus will definitely decay by then," or
"activity decays faster than the nuclei count" — the four direct
misconception tells. Load-bearing sentence: "every half-life only halves
what's LEFT, never reaching zero — and half-life is a population odds
statement, not a countdown timer for one nucleus." Channel-reality
caveats owned by `../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

A learner claiming the sample is fully gone after 2 half-lives signals
MC-1 (MISCONCEIVING, full repair via the explicit N-after-n-half-lives
worked example). A learner using t₁/₂ directly in the exponent signals
MC-2 (full repair via the dimensional-analysis worked example). A learner
predicting a specific nucleus's decay time signals MC-3 (full repair via
the die-rolling discovery question). A learner claiming activity decays
faster than N signals MC-4. Mastery trigger: correctly computing N after
n half-lives, AND correctly writing the dimensionally-consistent decay
law, AND correctly framing half-life probabilistically, AND correctly
identifying activity's shared half-life with N. Blueprint's assessment
component cited for the full item bank.

## Tutor Recovery Strategy

Shrink-to question: "forget the formula for a second — if you have 1000
nuclei, and half decay every half-life, how many are left after just
ONE half-life?" (isolating the multiplicative-halving concept before
extending to multiple half-lives). See `../foundations/01-recovery-engine.md`.

## Memory Hooks

Concept (multiplicative, never-zero decay; dimensionless decay-law
exponent; probabilistic population-level half-life; shared half-life for
activity and nuclei count) bound to procedure (computing N(t) and A(t)
via the exponential decay law). Interleave with `phys.mod.radioactivity`
and, once authored, `phys.mod.nuclear-reactions`.

## Transfer Connections

Near: any half-life or radioactive-decay-quantity problem. Far:
radiocarbon dating (archaeology/geology, directly built on the
exponential decay law and known half-lives) and nuclear medicine (dosing
and imaging schedules computed from isotope half-lives and activities).
Real-world: understanding why radiocarbon dating has an effective range
limited by the isotope's half-life, and why medical isotope doses must
account for both physical and biological half-lives. Expert: the full
differential-equation derivation and its connection to Poisson-process
statistics.

## Cross-Subject Connections

KG `cross_links` empty. A real cross-subject connection exists:
radiocarbon dating (archaeology/geology) and nuclear medicine dosing
directly depend on this concept — recorded honestly as a Curriculum
Feedback item, not fixed (no KG file modified).

## Blueprint References

Blueprint exists (Component-format). Reuses: Misconception Engine and its
assessment component by reference. Not restated: Concept Identity &
Metadata, Concept Explanation Multi-Tier, Worked Examples, Lesson
Composition Grammar, Retrieval Spacing Schedule, Prerequisite & Unlock
Map, Validation Checklist.

## Runtime Asset References

No seeded `AssetIdentity` records — checked against `brainSeedAssets.ts`.
None created.

## Curriculum Feedback

A real, if not KG-encoded, cross-subject connection exists to
archaeology/geology (radiocarbon dating) and nuclear medicine — recorded
honestly, not fixed (no KG or Blueprint file modified).

## Version History

- 2026-07-23 (physics EB Wave 14): initial authoring.
