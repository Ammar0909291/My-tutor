# Memory State — Per-Concept Statuses

What is fresh, stable, fragile, gone, recovered, automatic, or
transferable — per concept, for this learner. The scheduling machinery
(intervals, retrieval-first review, interleaving, review-by-concept-type)
is the Memory Engine's (Delivery 2 §8) and is NOT duplicated here. This
file defines the STATUSES — the tutor-meaningful summary the model holds
per concept — and the mapping that derives each status from the engine's
own data (interval position, last results, latency). A status is a view;
the engine's ledger is the truth.

## 1. The seven statuses and their derivations

| Status | Meaning | Derived from | What it changes |
|---|---|---|---|
| **RECENTLY-LEARNED** | taught but not yet consolidated — no post-sleep evidence exists | rung 3–4 reached; next-session retrieval (C2) not yet run | nothing is built on it yet; tomorrow's OPEN must include it; the tutor treats today's shine as unproven (Universal Principle 17) |
| **STABLE** | surviving its expanding intervals | last N reviews passed at/before due date, latency steady | normal citizen of the review schedule; usable as prerequisite floor |
| **FRAGILE** | slipping — hesitant, slowing, or a recent miss | interval demoted, or hesitant-correct on review, or latency drifting up | interval shrunk (engine); the ladder's effective rung drops a notch for floor purposes; consolidation reps before anything builds on it |
| **FORGOTTEN** | retrieval fails outright | review failed; cued retrieval also thin | NOT re-taught from zero — cued-recovery protocol (Delivery 1): storage survives; the high-water rung (02 §2 law 3) predicts fast relearning |
| **RECOVERED** | relearned after FORGOTTEN | post-recovery reviews passing | relearns fast, re-forgets slower than first learning (relearning deepens storage); interval restarts dense but expands quicker than a fresh concept's |
| **AUTOMATIC** | tool-grade: fluent below consciousness | latency flatlined at personal baseline across fluency bursts; survives as a step inside larger tasks | frees working-memory slots (Delivery 2 §5); maintenance-only scheduling; ladder rung 5 confirmed |
| **TRANSFERABLE** | applied unprompted beyond its home context | spontaneous-use events recorded (`../assessment/05 §2` level 10) | the strongest durability evidence there is; long intervals; the concept becomes an anchor/analogy source for teaching its neighbors |

Statuses are per concept and recomputed from evidence whenever read —
never hand-set, never sticky (LAW 1, LAW 2).

## 2. The interaction with the knowledge ladder

Memory status MODULATES the ladder position the machine consumes
(02 §2, law 3): AUTOMATIC+FORGOTTEN reads as effective-ASSISTED until
recovered; STABLE leaves the rung as-is; FRAGILE drops it one for
floor-report purposes. The un-modulated high-water mark is preserved
separately — it is what distinguishes the returning learner from the
beginner (`../first-lesson/01 §5`), and it is why the tutor says "it's
rusty, not gone" with evidence behind it.

## 3. The personal forgetting rate

The flat schedule (1d→3d→7d→21d→60d) is the default, not the learner.
Across enough concepts, this learner's OWN curve emerges: intervals
they consistently beat (expand faster for them) or consistently miss
(their curve is steeper — expand slower, and say nothing about it; a
steep forgetting curve is a scheduling parameter, not a deficiency,
LAW 4). The rate is per concept-TYPE too (facts vs procedures vs
concepts decay differently for the same learner — Delivery 2 §8's
review-by-type made personal). This single parameter is the highest-
value personalization the memory dimension offers: it converts the
engine's population defaults into this learner's actual curve.

## 4. Memory-status reads the planner depends on

- **The floor report** (02 §4) consults statuses, not just rungs: a
  STABLE prerequisite is a floor; a FRAGILE one gets consolidation
  before the new concept opens; a FORGOTTEN one gets cued recovery
  first — five minutes that save the whole lesson built on it.
- **The tool audit** (02 §4): tools below AUTOMATIC that today's work
  will lean on → pre-session fluency bursts.
- **Session OPEN composition** (`../decision-engine/07 §1`): due
  reviews ranked — RECENTLY-LEARNED's C2 checks first (they are
  completion criteria, not mere reviews), then FRAGILE, then the
  ordinary due queue.
- **Re-gate scheduling** (`../assessment/05 §3`): gates re-verify
  against statuses — a gate is never re-opened while its concept sits
  FRAGILE (measurement into fragility produces noise and affect cost
  for nothing).
