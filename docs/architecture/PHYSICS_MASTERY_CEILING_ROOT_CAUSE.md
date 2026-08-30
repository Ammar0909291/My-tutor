# The physics mastery ceiling is a zero-slack probe pool

**2026-08-30. Measured against the 60-session certification corpus and
production `asset_identity` / `probe_assets`.**

## The claim

Physics mastery currently requires a **100% success rate on authored
probes**. A learner who gets one probe wrong cannot reach mastery in that
session, no matter how well they are taught afterwards, because there is
no fourth probe to recover with.

The published 79% mastery figure is therefore not a measurement of
teaching quality. It is close to a measurement of how often a struggling
learner gets three out of three right.

## The arithmetic that makes it inevitable

Asset contract v1 requires **>= 3 gradeable probes per (concept, band)**.
The mastery bar is `correctAtCheck >= 1 && correctAtPractice >= 2` — that
is **3 credits**. A spent probe is never re-asked.

3 probes, 3 credits required, no re-asking: the required success rate is
1.00. There is no slack anywhere in the design.

## The evidence

Keyed (server-selected, `assetId`-bearing) probes served per session,
across all 60 sessions:

| keyed probes served | sessions |
|---|---|
| 0 | 3 |
| 1 | 3 |
| 3 | **53** |
| 4 | 1 |

| group | n | mean credits earned | mean keyed probes served |
|---|---|---|---|
| mastered | 46 | 3.00 | 3.02 |
| near-miss (chk 1, prc 1) | 8 | 2.00 | 3.00 |

**45 of the 46 mastered sessions answered every keyed probe correctly.**
The 8 near-misses each got exactly one wrong. That is the whole difference
between pass and fail for this class — not teaching, not the visual, not
the gate.

`phys.wave.spring-mass` is the clean trace: keyed probes at T13, T14, T15
(three, the entire pool), then five PRACTICE turns with no question at
all, ending one credit short.

## What this is NOT

An earlier revision of this analysis claimed the pool was **not** the
constraint, on the grounds that these concepts held 3–7 ACTIVE probe rows
with some unspent. That was wrong and is retracted.

The error: counting `asset_identity` rows without joining `probe_assets`
and requiring `jsonb_array_length(choices) >= 2`. `short_answer` and
`checkpoint` rows carry fewer than two choices and **a mastery gate cannot
grade them**. `phys.em.electric-field` holds 7 rows and **3 gradeable
probes**. All eight near-miss concepts hold exactly three gradeable probes.

Found by Session B, verified here independently against the transcripts:
every near-miss session served exactly 3 keyed probes and then went
silent. The pool was empty, not banked.

## The failure classes, corrected

14 sessions did not reach verified mastery. They are three different
defects, not one:

| n | class | shape | owner |
|---|---|---|---|
| 8 | **zero-slack pool** | 3 keyed probes served, one answered wrong, 5–7 silent turns | probe depth (C1) |
| 3 | **gate starvation** | 1 keyed probe in 15 turns, stuck at GUIDE, pool stocked | engine (E3) |
| 2 | **ungraded flood** | 12–16 model-invented MCQs, 0 keyed, phase never reached CHECK | engine (E1, after C1) |
| 1 | provider degraded | excluded as unmeasured | — |

The 63% / 4% help-request-tail correlation reported earlier is real but
does **not** establish causation for the 8: their tails are silent because
the pool is empty, and a struggling learner both asks for help and
exhausts pools. Arbitration remains the live hypothesis only for the 3
gate-starvation sessions, where the pool was stocked and one probe was
served in fifteen turns.

## Predicted effect of raising 3 -> 5, stated before the run

The 8 near-misses each need one more credit. At their observed keyed-probe
success rate (2 of 3), two extra probes give
`1 - (1/3)^2 = 89%` chance of at least one more correct.

**~7 of 8 convert: 46/58 -> 53/58, i.e. 79% -> 91%.**

If a re-run after seeding does not land near that, this diagnosis is
wrong and should be reported as wrong.

## Ordering consequence

C1 (probe depth) is the critical path, ahead of both engine items, and E1
is only safe **after** it — E1 spends probes earlier, and at a pool of
three that strictly worsens the dominant failure class.

---

## Chemistry replicates it — the diagnosis is not subject-specific

**2026-08-30, 12-concept chemistry baseline, seed 7, real QA account,
deployed app. 12/12 completed, 1 discarded as provider-degraded, 11
measured.**

**8 of 11 reached verified mastery — 73%**, against physics's 79%.

| | physics | chemistry |
|---|---|---|
| verified mastery | 79% (46/58) | **73% (8/11)** |
| mean keyed probes served | 3.02 | **2.82** |
| mean tail turns after last keyed probe, mastered | 1.8 | **1.8** |
| mean tail turns after last keyed probe, failed | 5.6 | **8.3** |

The three chemistry failures decompose into the same classes, in the same
proportions:

| concept | chk | prc | keyed served | tail | class |
|---|---|---|---|---|---|
| `chem.redox.balancing` | 1 | 1 | 3 | 5 | zero-slack pool |
| `chem.state.kinetic-theory` | 1 | 1 | 3 | 5 | zero-slack pool |
| `chem.bio.enzyme-kinetics` | 0 | 0 | **0** | 15 | gate starvation |

Two near-misses that served their entire three-probe pool, got one wrong,
and then sat through five silent turns. One session that was never asked a
single server-keyed question in fifteen turns.

**This answers Session B's Task 1 without them needing to run it.** The
chemistry ceiling has the same cause as the physics ceiling, so the same
fix applies and probe depth is the critical path for both subjects. Both
near-misses also contain a backwards phase move, as in physics.
