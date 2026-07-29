# ISS-01 — Teaching Ladder Reconciliation (BLOCKED, decision required)

**Status:** BLOCKED on a pedagogical decision. Not a refactor.
**Raised by:** Runtime Redesign Mission, step S5 ("wire `kernel/tsm/machine.ts`
as the live authority behind `ConversationState`").
**Evidence:** `src/tests/ladderConformance.test.ts` — exhaustive, 19 assertions,
currently green (it pins the defects; it does not fix them).
**Verdict:** S5 must NOT be executed as specified. Doing so would silently
disable lesson completion for every learner.

---

## 1. What S5 asked for, and why it stopped

The redesign's step S5 was to promote the 10-state canonical Teaching State
Machine (`src/lib/kernel/tsm/machine.ts`) from dead specification to live
authority, replacing the 6-phase ladder in
`src/lib/teaching/conversationState.ts`, using the bidirectional mapping
already authored in `src/lib/kernel/tsm/phases.ts`.

That mapping round-trips to identity for all six legacy phases, which makes
the migration look mechanical. It is not. Exhaustive enumeration of both
machines over the full state space (both are pure, total functions over 6
and 10 states respectively — a static test proves strictly more here than a
production shadow observer could) found **three independent defects**, one of
them catastrophic.

Note on method: the codebase's usual promotion discipline is shadow/log-then-
enforce (`eos-runtime/flags.ts`, `kernel/parity.ts`). That discipline exists
for decisions that depend on real learner data. It does not apply to a total
function over six states — there, enumeration is complete and sampling is
strictly worse. No production shadow was added for this reason.

---

## 2. The three defects

### D1 — the mapping inverts the CHECK/PRACTICE order relation

| legacy | idx | → canonical | idx | → back |
|---|---|---|---|---|
| OBSERVE | 0 | ANCHOR | 1 | OBSERVE |
| DEMONSTRATE | 1 | DEMONSTRATE | 2 | DEMONSTRATE |
| GUIDE | 2 | GUIDED | 5 | GUIDE |
| **CHECK** | **3** | **ASSESS** | **8** | CHECK |
| **PRACTICE** | **4** | **INDEPENDENT** | **6** | PRACTICE |
| TRANSFER | 5 | TRANSFER | 9 | TRANSFER |

Legacy orders CHECK (3) **before** PRACTICE (4).
Canonical orders INDEPENDENT (6) **before** ASSESS (8).

The mapping is a correct bijection on *names* and a wrong one on *order* —
and order is precisely what every up/down transition is computed from
(`phaseIndex ± 1`, floored). The round-trip identity is what hides it.

### D2 — mastery becomes unreachable (the catastrophic one)

Both machines write the **same two fields** — `correctAtCheck`,
`correctAtPractice` — under **different gate semantics and different
thresholds**:

| | legacy | canonical |
|---|---|---|
| `correctAtCheck` incremented at | CHECK | INDEPENDENT |
| …advances when | `>= 1` | `>= 2` |
| `correctAtPractice` incremented at | PRACTICE | ASSESS |
| …advances when | `>= 2` | `>= 1` |

`masteryGate.ts` requires `correctAtCheck >= 1 && correctAtPractice >= 2`.

Walking each ladder to TRANSFER on all-correct answers:

- **legacy** → TRANSFER in 6 turns, `check=1 practice=2`, `masteryVerified = true`
- **canonical** → TRANSFER in 9 turns, `check=2 practice=1`, `masteryVerified = false`

Under the canonical machine as authority, `masteryVerified()` could never
return true, `[LESSON_COMPLETE]` could never be authorized by
`gateLessonCompletion()`, and **no learner could ever complete a lesson**.
This would not throw, would not fail a type check, and would not appear in
any existing test — it would simply mean nobody ever finishes anything.

### D3 — 7 of 12 transitions diverge

| from | outcome | legacy → | canonical → | agree |
|---|---|---|---|---|
| OBSERVE | correct | DEMONSTRATE | DEMONSTRATE | ✅ |
| DEMONSTRATE | correct | GUIDE | DEMONSTRATE | ❌ |
| GUIDE | correct | CHECK | PRACTICE | ❌ |
| CHECK | correct | PRACTICE | **TRANSFER** | ❌ |
| PRACTICE | correct | PRACTICE | PRACTICE | ✅ |
| TRANSFER | correct | TRANSFER | TRANSFER | ✅ |
| OBSERVE | fail | DEMONSTRATE | DEMONSTRATE | ✅ |
| DEMONSTRATE | fail | DEMONSTRATE | DEMONSTRATE | ✅ |
| GUIDE | fail | DEMONSTRATE | GUIDE | ❌ |
| CHECK | fail | GUIDE | CHECK | ❌ |
| PRACTICE | fail | CHECK | GUIDE | ❌ |
| TRANSFER | fail | PRACTICE | CHECK | ❌ |

Two are pedagogically serious in opposite directions:

- **`CHECK` + one correct answer → `TRANSFER`.** A single correct answer to a
  formative check would skip independent practice entirely and jump to
  transfer-level work. This is exactly the assessment-skip the redesign
  mission exists to prevent — it would be *introduced* by the migration.
- **`TRANSFER` + a failure → `CHECK`** (vs `PRACTICE` in legacy). A stumble at
  transfer level drops the learner two rungs instead of one, violating the
  one-dimension-per-rung law the canonical machine's own header cites.

---

## 3. Why this is a decision, not a bug fix

The tempting read is "the mapping has a typo — point CHECK somewhere else."
It does not.

**Legacy `CHECK` is a formative check.** It sits immediately after guided
practice and asks "did that land?" — low stakes, one correct answer is enough
to move on to practice.

**Canonical `ASSESS` is a summative gate.** It sits after independent practice
and reflection and asks "can you prove it?" — it is the last thing before
transfer.

These are different pedagogical objects that happen to have been mapped onto
each other. The canonical ladder has **no formative-check position at all**
between GUIDED and INDEPENDENT; the legacy ladder has **no reflection or
consolidation position**. Neither is a subset of the other.

So the reconciliation requires choosing, explicitly:

- **Option A — canonical ladder wins.** Legacy CHECK's formative function is
  re-homed (probably as a non-phase check inside GUIDED, or a new canonical
  state between GUIDED and INDEPENDENT). `masteryGate`'s thresholds must be
  re-derived against the canonical gates, and every persisted
  `ConversationState` on a live session must be migrated. Largest change;
  gets the 10-state expressiveness the Brain's authored material assumes.
- **Option B — legacy ladder wins.** `PHASE_ORDER_10` is reordered so
  ASSESS precedes INDEPENDENT, or ASSESS is split into formative/summative
  states. `machine.ts`'s evidence gates are rewritten to match
  `advanceConversationState`. Smallest behavioural change; abandons some of
  the canonical ladder's declared structure.
- **Option C — do not unify.** Keep the legacy ladder as the sole authority
  and retire `machine.ts` / the `phases.ts` mapping rather than leave a
  dead-but-plausible-looking second machine that invites exactly this
  mistake. Cheapest and safest; forfeits NAME/FORMALIZE/REFLECT as distinct
  runtime states.

**Recommendation: Option C, then re-derive.** The canonical machine has never
run, so nothing depends on its semantics; the legacy ladder has been shipping
and its gates are the ones `masteryGate`, `questionLegality`, `firstLessonGuard`
and the whole verifier context are calibrated against. Retiring the unwired
machine removes the trap immediately and costs nothing in production. If the
10-state ladder is genuinely wanted, it should then be re-derived *from* the
shipping semantics rather than reconciled *against* them — which is a
curriculum/pedagogy design task with the Educational Brain material in hand,
not a runtime migration.

This recommendation is **not** self-executing: retiring `machine.ts` and the
`phases.ts` mapping touches `kernel/stages/tsmStep.ts`'s declared landing pad
and the masterplan's stated K3 item, so it needs owner sign-off before
execution.

---

## 4. What was shipped instead of S5

- `src/tests/ladderConformance.test.ts` — the burn-down instrument. Pins all
  three defects and every one of the 12 transitions. Currently green.
  Any future change to either ladder that alters a transition fails loudly
  rather than silently changing how every learner is taught.
- A behavioural guard asserting `advanceConversationState` remains the sole
  writer of the live phase, so an attempted wiring cannot land unnoticed.
- This document.

**No production code was changed.** `machine.ts` remains unwired.

---

## 5. Exit criteria for S5

S5 may resume only when **all** of the following hold:

1. An option above (A/B/C, or another) is chosen and recorded by the owner.
2. `ladderConformance.test.ts`'s D2 expectation is **inverted** — the
   authoritative ladder must arrive at TRANSFER in a state where
   `masteryVerified()` is `true`.
3. `ladderConformance.test.ts`'s D3 divergence count reaches **0**.
4. A migration path exists for `ConversationState` values already persisted
   in `contextSnapshot` on live sessions (phases, and both evidence counters
   under their new semantics).

Until then, the redesign's remaining safe work is S6 (transcript replay
fixtures) and S7 (promoting the S1/S2 verifier rules from LOG to ENFORCE
once real-traffic false-positive rates are measured). Neither depends on
this decision.
