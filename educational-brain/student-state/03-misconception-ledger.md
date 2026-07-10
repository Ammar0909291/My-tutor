# The Misconception Ledger

Misconceptions are stored **separately from knowledge**, because they are
not low knowledge — they are *competing* knowledge. A learner who
confidently adds fraction tops and bottoms is not missing information;
they are running a working, self-defending model (Delivery 2 §4). The
knowledge ladder (02) cannot represent that; this ledger does.

The per-CONCEPT misconception science (what M1 is, its probes, its repair
path) lives in the `../concepts/` entries. This ledger is per-LEARNER:
which of those documented misconceptions THIS learner holds, how strongly,
what has been done about it, and whether it is actually dead.

## 1. The ledger entry

For every misconception this learner has ever evidenced:

- **Identity**: the concept entry's misconception ID (e.g.
  `math.arith.fractions` M2 "add-across"), linking all its science.
- **Strength** — how reliably it fires, the entry's most decision-relevant
  field:
  - `DOMINANT` — fires on every occasion, including slow deliberate work;
  - `UNDER-LOAD` — correct model wins when careful; misconception fires
    under speed, fatigue, or mixing (the classic post-repair state);
  - `RESIDUAL` — rare flickers; hesitation spikes where it used to fire
    (the D1 latency read: the old model still *bids*).
- **Evidence log** (dated, verbatim where verbal): characteristic phrases
  heard ("you just add the tops"), distractors chosen, probe results,
  fast-wrong events, the drawn-model findings. Verbatim capture matters:
  the learner's own phrasing is the elicit-step script for the repair
  ("you said 'the bigger bottom is bigger' — let's test that").
- **Repair history**: repair passes run (dates, which steps of the 7-step
  sequence completed, what collision case was used) — because a SECOND
  repair pass must not reuse a burned collision case (`../assessment/09
  §4`'s isomorph rule applied to collisions).
- **Status** (the lifecycle, §2).
- **Verification history**: which of the verification-of-death criteria
  have passed, at what delay, at what speed (the concept entry defines the
  items; the ledger records this learner's results).
- **Regression risk** (§3) and **next verification due**.

## 2. The status lifecycle

```
ACTIVE ──(7-step repair completed)──► REPAIRED-FRAGILE
REPAIRED-FRAGILE ──(delayed + disguised probes pass)──► INHIBITED
INHIBITED ──(speeded probes pass at expanding intervals)──► DORMANT-VERIFIED
any status ──(regression event: it fired again)──► ACTIVE (regrowth count +1)
```

- There is **no ERASED status** — the honest science (Delivery 2 §4):
  old models are inhibited, not deleted; even experts show interference
  under pressure. DORMANT-VERIFIED is the terminal state, and it keeps a
  long-interval re-check forever.
- **REPAIRED-FRAGILE is not certified**: the concept's gate stays closed
  to it (the gate's zero-misconception-distractor requirement,
  `../assessment/05 §3`); teaching may proceed on adjacent work but
  builds nothing load-bearing on the repaired spot yet.
- **Ledger entries are never deleted** — a resolved entry with its
  regrowth history is some of the most valuable data the moat holds
  (per-learner AND aggregated: a misconception that regrows across many
  learners despite repair is an authoring flag on the concept entry's
  repair path — the feedback loop, `../first-lesson/08 §3`).

## 3. Regression risk — priors by birth type

The misconception's birth type (Delivery 2 §4 taxonomy) predicts its
regrowth, and the ledger inherits the prior:

| Birth type | Regression prior | Consequence |
|---|---|---|
| Perceptual intuition (type 2 — impetus, heavier-falls-faster) | **HIGH — never fully dies** | speeded re-probes never leave the rotation; slow-correct near it never certifies (`../concepts/physics/phys.mech.newtons-first-law.md` embodies this) |
| Overgeneralization (type 1 — mult-makes-bigger, add-across) | MEDIUM — dies well when re-fenced | verification emphasizes boundary items ("where does the old rule's country end") |
| Notation/instruction-induced (types 4–5) | LOW-MEDIUM — dies with the format diet | verification emphasizes format variety |
| Language contamination (type 3) | MEDIUM — reactivates on everyday usage | re-checks ride inside ordinary conversation ("listen for the phrase") |
| Analogy overextension (type 6) | LOW once the breaking point is owned | one boundary item at long interval |

Regrowth events update the prior for THIS learner: two regrowths of any
entry re-rate it HIGH regardless of birth type, shrink its verification
intervals, and flag the repair path itself for redesign (a repair that
didn't hold twice is the wrong repair for this learner — escalation
engine logic, `../decision-engine/05 §4`, applied to repairs).

## 4. What the ledger drives (the decisions that read it)

- **The action selector's contamination rule**: practice items are
  steered away from an ACTIVE entry's territory except in dedicated
  repair passes (`../decision-engine/03 §4` — practicing into a live
  misconception rehearses it).
- **The matrix's INTRODUCTION jackpot**: an anchor waking a documented
  ledger entry converts the lesson's demonstration into that entry's
  collision case (`../decision-engine/03 §1`).
- **Assessment routing**: any fast-wrong in an entry's territory routes
  to its probe set, not to difficulty measurement
  (`../assessment/05 §4`).
- **Gate composition**: every open gate in a territory with ledger
  history includes that entry's disguised item, at the status-appropriate
  delay and speed.
- **The floor report** (02 §4): a prerequisite with an ACTIVE entry is a
  corrupted floor, treated as more urgent than an absent one — absence
  is taught; corruption, untreated, is inherited by everything built on
  it (the metastasis chains, Delivery 2 §4).
