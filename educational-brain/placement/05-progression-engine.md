# The Category Progression Engine

The rules governing how the frontier advances, retreats, and repairs.
Every rule here is derived from one principle: **the frontier advances
when what was uncertain becomes solid; the frontier retreats only to
repair what was falsely certain**.

---

## 1. Promotion — advancing the frontier

A category is promoted (frontier advances past it) when all three mastery
conditions are met (`04 §2`): gate concepts AUTOMATIC + STABLE, one
transfer event logged. The promotion decision is made by the lesson
planning engine (`../decision-engine/07`) and is announced to the learner
in one sentence before moving on.

**The promotion announcement** matters for two reasons: it names the
progress (making it concrete, `../decision-engine/07 §7` visible horizon),
and it closes the category as a conscious concern for the learner
("fractions — done. Now algebra."). The announcement is never a
celebration-demanding event — it is said once, plainly, and the lesson
moves. Excessive ceremony around promotion teaches that progress is
exceptional; sparse acknowledgment makes it routine.

**Promotion does not mean the concept disappears.** Promoted concepts
enter the long-interval review schedule (Delivery 2 §8) and eventually
become anchors and analogy sources for teaching their neighbors
(`../student-state/08 §2` representation-family inheritance). Promotion
is the transition from "learning this" to "using this to learn other
things."

**Partial promotion** — when only some concepts within a category have
met the full mastery standard — the frontier does NOT advance. The
category's non-gate concepts can be below AUTOMATIC without preventing
promotion (the gate concepts carry the promotion decision); but if any
gate concept fails to reach AUTOMATIC + STABLE, the category cannot
promote. The system finds the specific gate concepts below the bar and
treats them as the remaining work before promotion.

---

## 2. The progression guarantee

At any moment, the session plan must be able to answer:

> **"What is the one thing this learner is working toward right now,
> and why is it exactly at their frontier?"**

If the plan cannot answer this — if the session is working on something
too easy (ANCHORED category), too hard (unverified prerequisites), or
arbitrary (a concept with no clear prerequisite path from the frontier)
— the plan is wrong and must be reconstructed from the current student
state.

The three correct answers:
- "Working toward Category N, gate concept G — gate concepts below G
  are AUTOMATIC, G is at INDEPENDENT and consolidating toward AUTOMATIC"
- "Repairing Category N-1, gate concept G' — G' is FRAGILE and G'
  is a prerequisite of G" (downward repair; §4 below)
- "OPENING retrieval of due categories X, Y, Z — before new content
  per the session shape" (`../decision-engine/07 §1`)

All three are valid. Anything else is a planning failure.

---

## 3. Demotion triggers — when the frontier retreats

**Demotion** is NOT the normal word for memory decay. Decay is handled
by the memory engine (changing memory statuses) and is invisible to
the learner. Demotion is the stronger event: the system concludes that
the category's mastery certification was premature and the frontier
must retreat.

Demotion triggers (all three must hold):

1. **Systematic gate-concept failure** — not a single miss, but a
   pattern: the gate concept fails retrieval at two consecutive
   session opens, across different surface forms.

2. **The failure is below the current frontier's prerequisite line** —
   meaning the concept was supposed to be prerequisite-solid, and
   it is not. If it is a leaf concept (not gate), demotion does not
   fire — only the within-category estimate updates.

3. **Cued-recovery has been tried and failed** — FORGOTTEN concepts get
   cued-recovery first. If cued-recovery restores the concept in one
   session, this is normal memory maintenance, not demotion. Only if
   cued-recovery itself fails does the demotion trigger fire.

When all three hold: the category demotes from ANCHORED to UNCERTAIN.
The frontier retreats to the failing gate concept. The session's next
CORE slot is a repair episode targeting that concept specifically.

**Important**: demotion is rare. The three-condition trigger is
intentionally strict. A system that demotes easily will restart
categories on the basis of single missed probes — exactly the
"reteach mastered material" pattern the law prohibits.

---

## 4. Regression repair — fixing the gap without restarting

When demotion fires, the repair protocol runs:

```
REGRESSION REPAIR PROTOCOL

1. ISOLATE
   Identify the specific gate concept(s) that failed.
   Not "fractions need reteaching" — "fraction equivalence failed
   two session opens; the other fraction gate concepts are STABLE."

2. ROUTE
   Is this memory decay or misconception regrowth?
   - Memory decay (FORGOTTEN or FRAGILE, no systematic error pattern)
     → cued-recovery protocol (Delivery 1; storage survives)
   - Misconception regrowth (fast-wrong answers, characteristic
     phrases re-emerging, student-state/03 ledger entry has
     regrowth count > 0)
     → misconception repair track (Delivery 2 §4) for the specific
        misconception; re-rate the ledger entry (student-state/03 §3)

3. TARGET
   Repair only the identified gate concept(s).
   The adjacent mastered concepts in the same category are NOT
   retaught — they are used as anchors and contrast points in the
   repair session.
   Maximum: one repair CORE slot per session; never sacrifice the
   session to repair if it means losing the CLOSE and a summit.

4. CONFIRM
   After repair: one transfer-distanced probe (not the same surface
   as the repair teaching; a transfer-distance probe is the only
   evidence that distinguishes genuine recovery from surface
   compliance).
   Pass → update category from UNCERTAIN to PROBABLE.
   Fail → schedule one more repair slot; flag for the stuck-concept
   protocol if this is the second repair failure
   (`../decision-engine/07 §7`).

5. RESUME
   Return to the frontier category immediately after the repair
   confirmation. The repair is a detour, not a restart.
   The frontier did not move backward except for the specific
   repair gap; everything else is exactly where it was.
```

**Never repair more than the identified gap.** A repair session that
"goes over the whole category again just to be safe" is a violation of
the never-reteach law and the definition of wasted learner time.

---

## 5. Cross-category prerequisites — patchy histories

Real learners rarely have a clean frontier where everything below is
mastered and everything above is untouched. They have patchy histories:
some concepts behind the frontier were skipped, forgotten, or never
taught; some concepts beyond the frontier were self-taught or
encountered incidentally.

**The patchy history flag** (set by the placement engine, `03 §6`)
changes the progression strategy:

Instead of advancing linearly through categories, the system first
identifies the specific gaps behind the frontier that will become
load-bearing when the frontier advances. These are "prerequisite gaps"
— they are not currently blocking, but they will block a concept
2–3 categories ahead.

The system schedules these **proactively**: the prerequisite gap is
added to the OPENING retrieval queue as a diagnostic item at the
session when the frontier is about to reach the point where that gap
becomes load-bearing. This is a "just-in-time repair" — the gap is
repaired at the last responsible moment before it costs a failure at
the frontier, not immediately and not when the frontier is nowhere near
it.

**Example** (mathematics): A learner's frontier is mid-algebra. The
placement revealed that fraction division is UNCERTAIN (one probe
passed). Fraction division will not be directly needed for the next
3 weeks of algebra work. When the algebra sequence reaches rational
expressions (where fraction division becomes load-bearing), the
fraction division probe is run at that session's OPENING. If it fails,
the session pivots to repair before attempting rational expressions.
If it passes, the session continues.

This is the just-in-time approach: not "let's fix every gap now"
(wasteful, pausing the frontier) and not "we'll handle it when we
get there" (which produces surprise failures with no recovery plan).
The prerequisite gap is on the schedule — it just runs when it matters.

---

## 6. Switching subjects — the multi-subject learner

When a learner studies more than one subject (e.g., mathematics and
English simultaneously), the placement and progression engines run
independently per subject. There is no cross-subject frontier; a
learner's placement in mathematics says nothing about their placement
in English.

What CAN cross subjects:
- Learning strategy signals (a learner who is a strong visual processor
  in one subject probably benefits from visual anchors in others)
- Affective state (a stressful session in one subject raises the
  FEARFUL threshold for the next)
- Metacognitive strategies (a learner who learns to self-test in
  mathematics benefits from using that in English)

These are captured in the behaviour profile (`../student-state/05`)
and emotional model (`../student-state/06`), which are CROSS-DOMAIN
by design. The frontier placements themselves are strictly per-subject.

---

## 7. The progression engine's relationship to the session plan

The lesson planning engine (`../decision-engine/07`) reads the
progression engine's outputs to build each session. The session plan
draws on:

- The current frontier concept (the teaching target)
- The OPENING's due-review queue (which includes review items from
  promoted categories)
- Any active repair slots (from demotion or prerequisite-gap triggers)
- The readiness derivation (`../student-state/09 §6`) for the next
  concept above the frontier

The progression engine does not plan sessions — it maintains the state
that the planning engine reads. The planning engine is the executor;
the progression engine is the bookkeeper.
