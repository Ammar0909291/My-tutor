# The Teaching State Machine

Every moment of a lesson, the tutor is in exactly one teaching state. The
learner never hears the machinery — no tutor says "we now enter guided
practice" — but the tutor always knows which state is active, what would
move it, and where each move leads. This file defines the states and every
transition, each with its trigger.

## 1. The two nested machines

Teaching runs as a **session machine** wrapping a **concept machine**:

```
SESSION:   OPENING ──► [concept machine, 1..n passes] ──► STRETCH? ──► CLOSING
CONCEPT:   INTRODUCTION ─► DEMONSTRATION ─► EXPLANATION ─► GUIDED ─►
           INDEPENDENT ─► ASSESSMENT ─► TRANSITION (next concept / review / close)
CROSS-CUT: OBSERVATION (a stance inside any state)
           RECOVERY    (preempts every state)
           REVIEW      (scheduled by the memory engine, mostly in OPENING)
```

## 2. Session states

**OPENING** — the session's first minutes. Fixed contents, in order:
greeting with continuity ("yesterday you nailed the /m/ sound" — the tutor
has memory, and says so within the first sentence); then **due-review
retrieval FIRST, before any new content** (Delivery 2 §8: retrieval opens
the session — it warms the machinery, protects the spacing schedule, and
for any concept taught last session it IS completion criterion C2,
`../first-lesson/04 §3`). Exit → INTRODUCTION (new concept) or GUIDED
(continuing yesterday's concept) based on the lesson plan (07).

**STRETCH** *(optional)* — one challenge item beyond the current gate,
offered never assigned. Entered only from the matrix cell
confident+curious with the core complete (03). Exit → CLOSING regardless
of outcome (a missed stretch is framed as a preview, never a failure:
"that one's coming — you'll eat it in a week").

**CLOSING** — the scripted last 30–90 seconds, protected in the time
budget above all content: name what the learner DID, forecast the next
session, leave one open loop (`../first-lesson/03 §9` — mandatory for
every learner, not only beginners; adults get the same close in adult
register). No state may skip to session end without passing through
CLOSING except a safety stop.

## 3. Concept states and their transitions

**INTRODUCTION** — the anchor: connect the new concept to something the
learner already owns (informal knowledge, a mastered neighbor concept, the
open loop planted last session). One breath long.
- → DEMONSTRATION when the anchor lands (any sign of recognition).
- → DEMONSTRATION *anyway* after one retry with a different anchor — never
  a third anchor; the demonstration will do what the anchor couldn't.
- The demonstrate-before-explain order is LAW for novices at this concept
  (`../first-lesson/04 §1`); for a learner with adjacent mastery the
  machine may run EXPLANATION first (an expert-frame learner can receive
  words about experiences they've effectively had).

**DEMONSTRATION** — the tutor does the thing, prediction-first ("what do
you think happens if...?" precedes every reveal — Delivery 2 §6:
prediction is compatible with everything and costs nothing).
- → EXPLANATION after 2 instances (one is an event, two are a pattern).
- → GUIDED directly when the learner spontaneously produces ("wait, so
  it's /mmm/?") — never hold a learner in demonstration who has already
  started doing.

**EXPLANATION** — naming what was just experienced. Burst-limited: ≤2
sentences for beginners, ≤4 for established learners, then the learner
acts (Delivery 2 §5 transience).
- → GUIDED when the burst ends. Not when the tutor "finishes explaining" —
  the burst limit ends explanations; completeness never does.
- → DEMONSTRATION (back) on confusion signals — never a second verbal
  pass in the same frame (05 §1's ladder).

**GUIDED** — the learner does, with fading support. Interior sub-ladder:
echo → supported → prompted (`../first-lesson/04 §1`); established
learners enter at `prompted` or at completion-problems (worked-example
fading, Delivery 2 §5).
- Sub-step up on each success; sub-step down on struggle, silently.
- → INDEPENDENT on fluent success at the top sub-step (fast + correct +
  confident — the D1 grid; slow-correct HOLDS, Universal Principle 3/22).
- → RECOVERY on any failure-state utterance.

**INDEPENDENT** — the learner does it alone. Beginners: exactly one solo,
then bank the win. Established learners: 2–3 reps at graduated transfer
distance (new numbers → new surface).
- → ASSESSMENT when the reps complete.
- → GUIDED (back one sub-step, no commentary) on a failed solo.

**OBSERVATION** — not a box in the chain but a stance the tutor holds
INSIDE Guided/Independent/Assessment: deliberately silent watching and
listening while the learner works. Its decision content: what breaks the
silence. Only three things do — the learner finishing, a failure-state
signal, or the wait-time ceiling for this learner's baseline (never the
tutor's discomfort with silence; `../first-lesson/03 §4`). Everything
observed feeds the state classifier (02) at zero question cost — the
cheapest diagnosis that exists (`../assessment/02 §7`).

**ASSESSMENT** — formative checks inside the lesson (purpose 4) and gate
components across sessions (purpose 5) — interior logic fully owned by
`../assessment/` (item choice: 05 §4; invisibility for beginners: 07 §2;
stop rule: 05 §4).
- → TRANSITION on pass (with the gate ledger updated).
- → the `../assessment/09` flowchart on fail — whose outcome maps back
  here as: RECOVERY (affect), GUIDED (fragile — one sub-step back),
  step-back to the prerequisite's concept machine (floor), or the
  misconception repair track (which runs as its own
  DEMONSTRATION→EXPLANATION pass built on elicit→commit→collide).
- Hard interior rule imported once: two failed assessments in a session =
  circuit breaker — no more assessment today (`../assessment/09 §4`).

**TRANSITION** — the seam between concepts or activities. Announced and
tiny ("same idea — new game" / "new thing, you're ready"). Decision
content: what comes next — next concept in the plan, a due review, the
stretch, or the close (07 owns this choice).
- Never a lurch: unannounced topic changes read as lurches to every
  learner, not just beginners.

**MASTERY (certification)** — bookkeeping, not a scene: gates open on the
evidence set (`../assessment/05 §3`), always spanning sessions (delayed
component). The learner never sees gate machinery — they experience only
"we're moving on" or "let's make this one rock-solid first."

**COMPLETION** — a concept leaves active teaching and enters the review
schedule (expanding intervals, Delivery 2 §8). Nothing is ever "done
forever"; completion means the interval grows toward months.

## 4. RECOVERY — the preempting state

RECOVERY is entered from ANY state, immediately, on: any failure-state
utterance ("I don't know / I can't / I'm scared / I give up..."), affect
signals crossing threshold (voice flat/strained, silence-lengthening
trend), or the assessment circuit breaker. Its interior scripts are the
Recovery Engine (Delivery 1; lesson-one deltas in `../first-lesson/05`).
Exit rule — the only part owned here: **RECOVERY exits one step BELOW
where it was entered** (if it fired during INDEPENDENT, re-enter at
GUIDED-prompted; if during GUIDED-prompted, at GUIDED-supported), and it
exits only after affect is restored AND one success has been banked. If
recovery itself fails: 05 §5's end-session protocol.

## 5. Locked configurations

The machine has settings, and two configurations are pre-locked:

- **Lesson one** (`../first-lesson/`): demonstrate-first mandatory, echo
  entry to GUIDED, exactly one INDEPENDENT rep, invisible ASSESSMENT,
  failure budget 1, RECOVERY→second failure = session ends on a win.
- **Repaired-misconception passes** (Delivery 2 §4): the concept machine
  runs elicit→commit→collide as its DEMONSTRATION phase, the contrast
  step as its EXPLANATION, and its ASSESSMENT is never same-session and
  always includes the speeded disguised re-probe.

## 6. The transition table (single reference)

| From | Trigger | To |
|---|---|---|
| any | failure-state utterance / affect threshold | RECOVERY |
| RECOVERY | affect restored + one banked success | one step below entry point |
| OPENING | due reviews done | INTRODUCTION or GUIDED (plan) |
| INTRODUCTION | anchor lands, or 2nd anchor tried | DEMONSTRATION |
| DEMONSTRATION | 2 instances shown | EXPLANATION |
| DEMONSTRATION | learner spontaneously produces | GUIDED |
| EXPLANATION | burst limit reached | GUIDED |
| EXPLANATION | confusion signal | DEMONSTRATION (never re-explain same frame) |
| GUIDED | fluent success at top sub-step | INDEPENDENT |
| GUIDED sub-steps | success / struggle | up / down one, silently |
| INDEPENDENT | rep(s) complete | ASSESSMENT |
| INDEPENDENT | solo fails | GUIDED (one sub-step back) |
| ASSESSMENT | pass | TRANSITION |
| ASSESSMENT | fail | `../assessment/09` flowchart → mapped re-entry |
| ASSESSMENT | 2nd fail this session | circuit breaker → RECOVERY-adjacent teaching mode, then CLOSING on a win |
| TRANSITION | plan says next / review / stretch / close | INTRODUCTION / REVIEW / STRETCH / CLOSING |
| any concept state | session time box or affect budget spent | CLOSING (always through the close script) |
