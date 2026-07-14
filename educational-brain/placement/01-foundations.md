# Placement Foundations

The permanent truths that govern WHERE teaching should begin. These are
not heuristics — they are architectural laws that hold for every learner,
every subject, every session.

---

## 1. The placement law

> **Teaching must begin at the learner's actual learning frontier, not at
> the curriculum's beginning and not at an assumed position.**

A learning frontier is the boundary between what this learner has
mastered and what they have not yet encountered or consolidated. It is
not a single concept — it is a zone: concepts just below the line are
solid tools; concepts at the line are the current work; concepts above
the line are the next territory. Placement finds that zone.

This law has three consequences, each permanent:

1. **For a complete beginner**: the frontier is at the beginning of the
   curriculum, but the beginner still has informal knowledge to anchor
   to (`../first-lesson/01`) — the teaching begins at the curriculum's
   opening, but never as if the learner came from nothing.

2. **For any other learner**: the frontier is somewhere in the middle.
   Starting from the curriculum's beginning is not "being thorough" —
   it is a waste of the learner's time and trust. A learner who must
   sit through material they have already mastered is not being served;
   they are being insulted.

3. **For a returning learner**: storage survives long absences
   (`../student-state/07`, `../student-state/02 §2 law 3`). The
   frontier has retreated (memory decay) but has not disappeared. The
   question is always "how far did the frontier retreat?" — never
   "did the learning happen?"

---

## 2. The two placement errors

Both errors are costly; neither is acceptable.

### Placing too low (the insult)

The learner is placed at a level below their actual frontier. They
must sit through material they can already do. The damage:

- **Trust erosion**: the learner concludes the system doesn't know
  them. A system that treats a capable adult as a beginner because
  they said "I'm probably not great" has failed its first job.
- **Time waste**: every minute spent re-covering mastered material
  is a minute not spent learning. The frontier doesn't advance; the
  learner stagnates while the system congratulates itself on coverage.
- **The effort-curve damage**: the learner is calibrated on
  easy material. When difficulty arrives at the true frontier, it is
  perceived as sudden and threatening rather than as the natural next
  step. A learner conditioned on 100% success rates encounters 70%
  and infers they are failing.

The human antidote: a great tutor NOTICES boredom, OFFERS a harder
item immediately, and never fills time with what is not needed. The
compaction protocol (`../decision-engine/07 §3`) is this instinct
formalized.

### Placing too high (the overwhelm)

The learner is placed above their actual frontier. They encounter
material whose prerequisites they do not hold. The damage:

- **Prerequisite stacking**: every failed concept leaves a gap that
  will be hidden under future work. The stack grows; each new
  concept's confusion is compounded by the unresolved gap below it.
  This is the mechanism of "I was fine until calculus" — a gap at
  the algebra level grew invisible under course-by-course advancement
  until a sufficiently demanding topic made it visible.
- **Attribution error**: the learner concludes they are not smart
  enough, when in fact they were simply placed incorrectly.
- **Affect damage**: placed-too-high learners experience repeated
  failure. The first-lesson standard's affect budget (failure budget:
  1 in lesson one; circuit breaker: 2 per session) exists precisely
  because affect damage from repeated failure outlasts the session
  that caused it.

The human antidote: a great tutor NOTICES confusion, steps back
SILENTLY to find the missing floor, never blames the learner for the
placement error. The prerequisite micro-diagnosis
(`../assessment/02 §9`) is this step formalized.

### The asymmetry

When uncertain, **always place lower**. The cost of placing low is mild
boredom, immediately correctable by compaction (one stretch item reveals
that boredom within 30 seconds). The cost of placing high is affect
damage and prerequisite stacking, neither of which corrects immediately.
This asymmetry is why the binary-search protocol
(`../assessment/02 §2 step 2`) opens with an item slightly below the
reported level — the first item's job is to settle the learner's nerves,
not to find the ceiling.

---

## 3. The human-tutor model

An experienced human tutor does not begin every student from lesson 1.
They do the following within the first few minutes:

1. **Collect the self-report informally**: "What have you covered before?
   Where did it get difficult?" They listen not only to the answer but
   to how fluently the learner navigates the vocabulary of the subject —
   which is its own diagnostic signal.

2. **Probe immediately**: they ask one question, or watch one worked
   problem, or ask the learner to explain one thing — and from that single
   item they form a preliminary estimate of the frontier. They do not
   administer a formal test.

3. **Teach one step above the evidence**: they begin at the first thing
   the learner cannot yet do easily. Not one step above the report — one
   step above the EVIDENCE. The evidence speaks louder.

4. **Adjust within the first 10 minutes**: if they placed incorrectly
   (too easy or too hard), they adjust in real time. No ceremony. They
   move the lesson to where the learning is.

5. **Never revisit mastered material as content**: they may USE mastered
   material as a prerequisite, a warm-up tool, or an analogy source — but
   they never teach it as if it were new. This is automatic for a great
   tutor; it must be made explicit for a system.

The placement engine is this intuition made permanent and consistent.

---

## 4. The placement engine's scope

**The placement engine answers one question:**

> **WHERE should teaching begin?**

It does not answer: how to teach (that is the Decision Engine, Delivery 7);
what to teach (that is the curriculum, the KG); who the learner is (that
is the Student State Model, Delivery 8); how to assess (that is the
Assessment Library, Delivery 3).

**The placement engine operates at two levels:**

- **Category level**: which broad region of the curriculum is the
  learner's frontier? Answered by the level hypothesis (02) and the
  placement protocol (03).
- **Concept level within the frontier category**: which specific concept
  within the frontier category is the first unmastered one? Answered by
  the placement protocol (03) and the knowledge ladder
  (`../student-state/02`).

**The placement engine's standing outputs** (the things it writes into
the student model that every subsequent session reads):

- The ANCHORED categories (never reteach these)
- The PROBABLE categories (brief warm-up only; resume from there)
- The UNCERTAIN categories (verify before building on)
- The UNKNOWN categories (not yet assessed; probe before teaching)
- The frontier concept (per domain; the current teaching target)
- The placement confidence (how much evidence backs the placement)
- The miscalibration direction (does this learner consistently under- or
  over-report? This recalibrates future self-reports)

---

## 5. The relationship to existing Brain systems

| System | Role relative to placement |
|---|---|
| `../assessment/02` | Supplies the binary-search placement PROTOCOL — the how of finding the frontier. The placement engine calls this; does not rewrite it. |
| `../student-state/02` | Supplies the knowledge ladder — the per-concept rung positions that the placement engine aggregates into category verdicts. |
| `../student-state/07` | Supplies memory statuses — the modulation layer that turns "rung 5 AUTOMATIC" into "effective rung 3 ASSISTED" when memory has decayed. Placement works with MODULATED rungs (the effective position), not unmodulated high-water marks. |
| `../decision-engine/07 §3` | The compaction protocol — what runs DURING a session when the learner proves the placement was too low. Placement sets the starting position; compaction corrects it in real time. |
| `../first-lesson/01 §4–5` | False-beginner detection rules apply here too: a learner claiming Beginner who answers like an Intermediate is not lying — they are miscalibrated. The response is adjustment, not judgment. |
| `src/lib/curriculum/placement.ts` | The RUNTIME implementation: uses difficulty-floor entry order as a proxy for category placement. The Brain's placement engine is the pedagogy that runtime eventually retrieves to make this richer and more dynamic. |
