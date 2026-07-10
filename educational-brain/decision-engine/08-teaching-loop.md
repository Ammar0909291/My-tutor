# The Teaching Loop

The permanent per-turn cycle that runs the whole engine — and the ledger
of what it makes retrievable. Every turn of every lesson is one pass:

```
STUDENT SPEAKS (or acts, or stays silent — silence is an utterance)
      │
1. OBSERVE      extract the signal bundle:
                content (what was said/done) · correctness ·
                latency vs this learner's baseline · prosody
                (confidence, affect — Delivery 1) · hesitation
                locations · self-corrections · characteristic
                misconception phrases (concept entry lookup)
      │
2. CLASSIFY     student state (02): affect band first, priority
                order applied, trends over snapshots, the
                learner's own stated state accepted instantly
      │
3. SITUATE      current teaching state (01) + student state
                → the decision (03): preempt to recovery /
                hold / advance / retreat / escalate
      │
4. SELECT       if the decision calls for a teaching action:
                run the seven-filter funnel (04) — authored
                dispatch first, knowledge type, state legality,
                learner constraints, history, load, tie-break.
                If a failure triggered: take the ladder rung (05).
      │
5. COMPOSE      the turn skeleton (06): REACT + one MOVE +
                INVITE, in this learner's register, inside the
                burst limits, prediction-first if a reveal comes
      │
6. DELIVER      voice rules: load-bearing sentence slowed, wait
                time honored after the INVITE — then genuinely
                stop and observe (OBSERVATION stance)
      │
7. UPDATE       the learner model (§3 below) — every turn,
                not every session
      │
      └────────────► repeat
```

## 1. Loop invariants (true on every pass)

- **Recovery preemption is checked FIRST** (step 3 collapses to it when
  the affect band fires) — no observation subtlety, no plan, no gate
  outranks a flooded learner.
- **The loop never blocks on uncertainty**: a weak state read gets a
  probe move (02 §4), not a stall — the next utterance sharpens the
  classification; tutoring is sequential diagnosis by design.
- **Silence passes through the whole loop too**: observed (how long,
  what quality), classified (thinking vs stuck vs shut down — effortful
  self-talk vs flat nothing), decided (wait longer / shrink / recover).
- **Every pass costs the learner something** — attention, risk, trust —
  so every pass must give something back: visible progress, a success,
  a resolved curiosity, or at minimum warmth. Ten takes in a row with
  no give is the quiz register (06 §1) detected at loop level.

## 2. The strategy layer (step 3's output, named)

The decision at step 3 is always one of a closed set — this closure is
what makes the loop retrievable rather than improvised:

`HOLD` (stay in state, next rep) · `ADVANCE` (machine transition
forward) · `RETREAT` (one step back, silent) · `ESCALATE` (ladder rung,
05) · `RECOVER` (preempt) · `REVIEW-INJECT` (due item surfaced) ·
`STRETCH-OFFER` · `CLOSE` (session end path). Eight strategies. A turn
that cannot name its strategy from this set is a turn the tutor is
improvising — legal only as a logged exception, which is exactly what
the feedback loop collects (`../first-lesson/08` §2 taxonomy grows from
these logs).

## 3. The learner-model update contract (step 7)

What is written after each turn — the memory that makes tomorrow's
teaching smarter than today's:

| Field | Written when |
|---|---|
| state estimate + confidence | every turn |
| latency vs baseline (and baseline drift) | every answer |
| calibration pair (stated/behavioral confidence × correctness) | every substantive answer (`../assessment/04 §3`) |
| misconception evidence (phrase heard, distractor chosen, probe result) | on occurrence — routed to the concept's ledger |
| action outcome (what ran × what followed) | every teaching action — this is the affinity data filter 5 feeds on |
| escalation events (ladder + rung reached) | on occurrence — rung 3+ flags authoring (05 law 3) |
| machine position per concept (state, sub-step, gate components met) | on transition |
| review results (interval moves) | on review items |
| session events (failure states fired, budget spent, summit time) | on occurrence |

The plan (07) is re-derived from this ledger, never from memory of the
plan; the ledger is the truth and everything else is cache.

## 4. The retrieval ledger — what this delivery moves out of AI improvisation

The delivery's purpose made checkable. After Delivery 7, on any turn:

**RETRIEVED (decided by authored knowledge, not invented):**
- the teaching state and its legal transitions (01)
- the learner-state classification rules and priority order (02)
- the decision for state × state, incl. recovery preemption (03)
- the action choice and its exclusions (04) — with authored per-concept
  dispatch winning outright where a concept entry exists
- the escalation rung after any failure (05)
- the turn skeleton, question ceilings, burst limits, register rules (06)
- session shape, pacing triggers, compaction, ending rules (07)
- all recovery scripts, assessment items/gates, per-concept probes,
  analogies, demonstrations (prior deliveries, addressed by this loop)

**STILL INVENTED at runtime (the intended residue):**
- the surface wording of each turn (in the retrieved register, under
  the retrieved limits)
- specific example values within a template's authored constraints
- the voice rendering (prosody execution of retrieved emphasis rules)
- genuinely novel learner utterances with no matching rule — each one
  logged, each one next week's authoring (the feedback loop is the
  residue's shrinking function)

This is the moat's mechanism stated plainly: the residue list only
shrinks. (It is also the knowledge-side statement of ADR 14's endgame —
"the LLM becomes voice-renderer, not content-generator" — arrived at
independently from the pedagogy direction.)

## 5. The human tutor audit (Part 9 — run on this delivery, with findings)

Every decision in files 01–07 was audited against: *would the world's
best teacher really do this?* Changes the audit forced during authoring
— recorded because an audit that changed nothing audited nothing:

1. An early draft of the matrix (03) had "re-explain more simply" cells
   for confusion during EXPLANATION. Killed: great tutors don't
   re-explain into confusion, they change channel (the transition table
   now hard-codes EXPLANATION → DEMONSTRATION on confusion).
2. The state machine initially advanced GUIDED→INDEPENDENT on
   "correct." Audit: a human tutor waits for the ease, not the answer —
   changed to the fluency gate, aligning with D1's grid.
3. The conversation engine initially allowed three questions in a row
   "for efficient diagnosis." Audit: no great tutor interrogates; two
   is the ceiling, and diagnosis has cheaper channels (voice,
   observation) — changed, and the interview register section written.
4. The planning engine initially treated the time box as the session's
   natural end. Audit: great tutors end at the SUMMIT when it comes
   early — the soft trigger (07 §6) was added and given precedence.
5. STRETCH was initially assigned ("one challenge item per session").
   Audit: humans offer stretches, they don't assign them — changed to
   offered-not-assigned, with persona timing.

The audit is standing, not one-time: every future edit to this library
re-runs the question, and any rule that survives only by appeal to
system convenience — never to what a great teacher would do — is
deleted on sight.
