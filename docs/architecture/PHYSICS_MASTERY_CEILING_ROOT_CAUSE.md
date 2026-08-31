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

---

## Measured, and deliberately NOT acted on

Two defects were sized this session and then left alone. Recording them
matters as much as the fixes: a programme that only writes down what it
built cannot tell the difference between "we checked" and "we forgot".

### ASCII-art fallback figures — no evidence stripping them helps

When the visual engine gives the model nothing, the model draws a picture in
a code fence. Measured with a box-drawing/arrow detector:

| | sessions with an ASCII-art fence | art turns | art turns that ALSO had a real figure |
|---|---|---|---|
| physics | 10 of 56 (18%) | 16 | 1 |
| chemistry | 7 of 11 (64%) | 14 | 0 |

29 of 30 such turns carried no real figure, so it is genuinely a fallback,
and the rate tracks visual darkness almost exactly (chemistry is 51% dark
against physics's 31%).

**An earlier entry in this programme recorded this as "1 of 58 sessions
(2%) — a one-off; named, not fixed." That was measured with a blunter
detector and understated it roughly nine-fold.** The decision not to act was
made on a wrong number.

So I re-opened it — and then still did not act, for a different and better
reason. Verified mastery, split by whether a session contained ASCII art:

| | with art | without art |
|---|---|---|
| physics | 60% (n=10) | 83% (n=46) |
| chemistry | 86% (n=7) | 50% (n=4) |

**The two subjects point in opposite directions.** The physics signal is
also confounded: a session gets ASCII art precisely when the visual engine
failed, which correlates with the harder, darker concepts. There is no
evidence here that stripping the art helps a learner, and a real risk that
it removes the only representation they were given.

What IS defensible is already covered: presenting the art as a rendered
figure ("what do you notice when you LOOK AT THIS DIAGRAM?") is handled by
`figureReference.ts`, and art that is factually wrong cannot be judged
deterministically at all. The genuine fix is visual coverage — warming the
126 dark-but-drawable concepts — not text surgery.

### The content-free hold — a content problem wearing a repair costume

`"Let's stay with this idea for a moment."` shipped 9 times across 67
sessions, and in **every single case it was the entire turn**.

It fires when the gate correctly strips an ungradeable question from a turn
that contained nothing else. At that point the server has no teaching to
fall back on, and the only ways to fill the turn are to invent content or to
make a second model call — the first is what produced this sentence, and the
second breaks the one-call-per-turn rule.

Patching it here would hide a content-generation problem inside a
text-repair function. Left alone, and named.

The specific case that prompted the owner's report is covered from the other
side: `dontKnowCeiling.ts` means a repeated "I don't know" now gets the
answer revealed rather than a hold.

---

## C7 interim — I may have been wrong that the fix failed

**Status at 43/60 of the re-measurement. Not a conclusion.**

I reported that `historyCompaction.ts` did not work: memory-to-model verbatim
repeats went 20 → 18 across shared concepts, essentially flat. The run has
since split itself into two halves by accident — the first 36 sessions ran
before a redeploy, the rest after — and the halves disagree.

Restricted to the sessions actually **at risk** (those that served a long
authored explanation; a session that never served one cannot repeat one):

| | sessions with a repeat | without | rate |
|---|---|---|---|
| pre-redeploy | 18 | 18 | **50%** |
| post-redeploy | 1 | 6 | **14%** |

Fisher exact, two-tailed: **p = 0.11**. Suggestive, not conclusive — the same
territory as the earlier repetition-fix validation (p = 0.084), and it needs
the remaining ~17 concepts before it means anything.

**Opportunity does not explain it.** Long memory-served turns per session are
1.19 before and 1.29 after, so the later half had slightly MORE chance to
recite, not less.

### The uncomfortable possibility

The only differences between the halves are a no-op diagnostic flag, another
subject's seed assets, and a REDEPLOY. If `historyCompaction` was not
actually live for the first 36 sessions, then it works, and my "the fix
failed" report was measuring a stale build.

Arguing against that: `answerConfirmation` was committed **19 minutes
earlier** than `historyCompaction` and demonstrably fired in the first 22
sessions (correct-answer confirmation ran at 70% against a 39% baseline). If
deploys were landing in that window, the later commit should have been live
too. Both stories cannot be true.

### What settles it

The retrieval-cache instrumentation, which is the reason the halves are
distinguishable at all. So far: 21 turns handed the authored explanation to
the model as retrieved context, and the single repeat that occurred was one
of them. n = 1, which is a direction and not a finding.

If the low rate holds to the end of the run, the honest report is that my
earlier verdict was wrong, stated as plainly as the original was.
