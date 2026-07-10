# Student State Architecture

## 1. The eight dimensions

A world-class tutor's mental model of a learner has eight standing
dimensions. Every piece of learner information the Brain will ever hold
belongs to exactly one:

| # | Dimension | The question it answers | File |
|---|---|---|---|
| 1 | **Knowledge state** | what can they do, per concept, at what rung? | 02 |
| 2 | **Misconception ledger** | what do they believe that is wrong, how strongly, and is it dead yet? | 03 |
| 3 | **Confidence profile** | how does their confidence relate to their correctness, per domain? | 04 |
| 4 | **Behaviour profile** | how do they work — pace, modality, attention, persistence, curiosity? | 05 |
| 5 | **Emotional model** | what do they feel about learning, what triggers it, what repairs it? | 06 |
| 6 | **Memory state** | what is fresh, stable, fragile, gone, automatic — per concept? | 07 |
| 7 | **Teaching history** | what has been tried on them, and what happened? | 08 |
| 8 | **Trajectory** | where are they headed, how fast, and are they ready for what's next? | 09 |

Plus the ninth, momentary layer that is NOT stored here: the current
state (`../decision-engine/02`) — weather, not climate. The twin (10) is
the eight dimensions assembled plus the current weather.

## 2. The design laws

**LAW 1 — Every entry is evidence-backed and dated.** No field exists
without the observation that justifies it. "Anxious during assessment"
must point at the whispered answers of specific sessions, not at an
impression. An unevidenced belief about a learner is an invented
assumption — exactly what this model exists to eliminate.

**LAW 2 — Entries decay.** A learner is a moving target: the shy reader
of six months ago may be gone. Every profile entry loses force with age
and is refreshed, re-confirmed, or dropped by new evidence. The model's
default posture toward stale entries is doubt — teaching a learner as
who they WERE is a gentler version of never knowing them at all.

**LAW 3 — Per-domain, not global.** Confidence, speed baselines,
affinities, fear, velocity — all differ per subject (established at
`../assessment/04 §5` and `05 §5`). One global "learner level" is
always a lie in detail; the model stores per-domain values and treats
any cross-domain summary as a convenience view, never a truth.

**LAW 4 — Descriptions, never verdicts.** The model stores "hesitates
before fractions; three attempts before asking for help", never "weak
student", "slow learner", "not a math person". Verdict-shaped entries
are banned for two reasons: they are not actionable (no decision reads
them), and they are self-fulfilling (a model that calls a learner weak
will teach them as weak, and they will oblige). The test for any entry:
does it change what the tutor DOES next turn? If not, it is a judgment,
not knowledge.

**LAW 5 — The model is a hypothesis set, not a fact file.** Every entry
carries a confidence of its own. Contradictory evidence updates entries
rather than being explained away — the model must be easier to change
than the learner (the reverse is how misconceptions work, and the tutor
must not hold misconceptions about the student).

**LAW 6 — Asymmetric caution.** When evidence is thin, prefer the
reading whose mistaken treatment costs least (the cheaper-to-treat rule,
`../decision-engine/02 §4`, applied to standing entries): assume
FRAGILE rather than MASTERED (over-consolidation is cheap;
false-certification is expensive), assume imported dread for
mathematics until disproven (the base rate justifies it), assume
attention shorter rather than longer.

**LAW 7 — The twin serves the learner and never judges them.** Its
contents surface only as better teaching — never read back as
assessment ("my model says you're anxious"), never exposed as scores,
never compared across learners. Two narrow exceptions, both
learner-serving: calibration evidence is shown to the learner as
calibration training (`../assessment/04 §4`), and progress is made
visible on their own timeline (`../decision-engine/07 §7`).

## 3. Initialization — what the model holds on day zero

Before the first session: nothing but the intake facts (age band,
stated goals, self-reported level — recorded WITH the standing discount,
`../assessment/02 §5`). The first sessions then fill dimensions in a
known order: emotional signals and behaviour pace arrive within
minutes; knowledge rungs arrive through placement and early work;
affinities need multiple actions before they harden (05 §4); trajectory
needs weeks. The model is honest about its own blanks: an empty
dimension reads "unknown — probe cheaply", and the Decision Engine
treats unknowns as probe targets, not as license to assume (README's
retrieval claim).

## 4. One learner, one model, every subject

The model is a single structure per learner with per-domain interior
values (LAW 3) — not one model per subject. This is what lets
cross-domain intelligence exist at all: the story-affinity discovered
in English is a *candidate* (not a certainty) for mathematics; the fear
that lives only in mathematics is visible AS math-specific precisely
because reading shows its absence; a global fatigue curve is learnable
because every subject writes into the same day.
