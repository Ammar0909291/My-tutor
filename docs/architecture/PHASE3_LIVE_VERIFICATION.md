# Phase 3 (Series B) — live verification against production

Run against **`dpl_5w5rAfkYJ4dyU9xYuUktKESS9kes`** (commit `aaea406e`, aliased to
`my-tutor-flame.vercel.app`), chemistry / `chem.found.pure-substances`, on a disposable account
that was deleted afterwards with re-login independently confirmed blocked.

Harness: `scripts/qa/phase3-arbitration.ts`. **9 PASS / 1 FAIL / 0 unmeasured.**

## What is measured versus inferred

Enforced in the harness rather than remembered, because this harness class has condemned the
product for its own blind spot five times in this repository.

- **STRUCTURAL** — `mcq` (did a graded question actually attach) and `mastery` (the server's own
  phase and counters). Every headline verdict rests on these.
- **INFERRED** — whether the TEXT reads as closing. Reported for context, labelled, never a verdict.
- A provider outage is reported **UNMEASURED**, read from the product's own `isDegradedProvider`
  rather than matched against template prose. None occurred in this run.

## Results

| id | check | result |
|---|---|---|
| C-1 | an ordinary turn still teaches | PASS (992 chars) |
| C-2 | an ordinary turn may still carry a graded question | PASS |
| D3 | an explicit visual request is NOT converted into a graded quiz | PASS |
| D5 | a recovery turn carries NO graded question | PASS |
| D5b | a recovery turn banks no mastery | PASS |
| D2 | the closing turn carries NO graded question | PASS |
| D2-proxy | *inferred* — the closing turn reads as a close | PASS |
| D1 | the turn after a stop carries NO graded question | PASS |
| D1-proxy | *inferred* — the turn after a stop does not teach new content | **FAIL** |
| X-1 | no turn verified mastery or completed the lesson | PASS |

## The arbitration verdict, from production logs

Read from `[arbitration]` on each turn — the server's own decision, not inferred from the reply:

    turn 0  ordinary          owner: TEACH            overridden: []                       denied: []
    turn 1  "show me a diagram"  owner: LEARNER_REQUEST  overridden: [TEACH]                denied: NEXT_MOVE, AUTHORED_PROBE, SESSION_CLOSE
    turn 2  "I'm lost…"       owner: RECOVERY         overridden: [LEARNER_REQUEST, TEACH]  denied: all six
    turn 3  "I'm done for today."  owner: CLOSE       overridden: [TEACH]                   denied: PHASE_FRAME, NEXT_MOVE, NEW_QUESTION, AUTHORED_PROBE, FILLER_REPAIR
    turn 4  "ok"              owner: CLOSE            overridden: [TEACH]                   denied: (same five)

Turn 2 is **Divergence 1 observed in production**: the learner's message read as BOTH distress and
a request, and RECOVERY correctly took the turn from LEARNER_REQUEST. Turn 4 is **Phase 1's
invariant holding**: the episode persisted as CLOSING across the request boundary, so CLOSE owned
the following turn too.

The post-model withhold also fired, twice, on real output:

    [arbitration] {"event":"closing-prose-question-withheld","charsBefore":669,"charsAfter":402}

## The one failure, diagnosed rather than excused

D1-proxy: after "I'm done for today." → "ok", the tutor produced 402 characters of explanation
(water versus orange juice) instead of a close.

Everything deterministic did its job, and the logs prove each step:

- the episode persisted as `CLOSING` and arbitration gave the turn to `CLOSE`;
- the TURN DIRECTIVE emitted no phase frame and no move;
- no question was ordered (`NEW_QUESTION` denied) and none attached (`mcq=null`);
- the model's own question WAS written and WAS stripped (669 → 402 chars);
- CUE independently reached `D0b-CLOSING-PROTECT` — "no new content, practice, probes, or repair
  may start" — and `complianceReason: "structural checks passed"`.

So there is no longer a contradictory instruction for the model to resolve. What remains is that
the model volunteered explanatory prose on a bare acknowledgement while under a consistent
instruction not to. **That is prompt compliance, not arbitration**, and Phase 3 does not claim to
fix it. Naming it precisely matters: the same symptom before Phase 3 had a different cause (a
block claiming to override the close), and that cause is gone.

Withholding the prose too was considered and rejected. It is not a question, it is on-topic, and
deleting a paragraph of correct teaching to enforce a stylistic contract risks a worse turn than
the one it repairs — the same reasoning that makes the prose-question withhold decline to act when
nothing would survive the cut.

## Not verified

- A single-paragraph closing turn that is entirely a question. The withhold is paragraph-scoped and
  logs `closing-turn-was-entirely-a-question` rather than repairing; that path did not occur here.
- `COMPLETE` as a turn owner — reaching a genuine lesson completion needs a full mastery run, which
  this five-turn probe does not attempt.
- Any subject other than chemistry, and any language other than English.
