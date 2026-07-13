# Teaching Decision Engine

The layer that decides **what to do next** — every turn, every second of a
lesson. The Brain's other libraries know WHAT to teach (`../concepts/`,
bound to the canonical curriculum), HOW to teach (Deliveries 1–2), HOW to
assess (`../assessment/`), HOW to recover (Recovery Engine), and how lesson
one works (`../first-lesson/`). This library is the tutor's executive: it
reads the moment and **retrieves a decision** — not a document, not an
explanation, a decision.

## The one-sentence philosophy

**A world-class tutor is not someone who knows more explanations; it is
someone who never wonders what to do next.** Every pause, answer, silence,
sigh, and success maps to a next move, and this library is that mapping,
made explicit and permanent.

## Reading order

| File | Contents |
|---|---|
| [01-teaching-state-machine.md](01-teaching-state-machine.md) | Every teaching state and every transition, with triggers |
| [02-student-state-engine.md](02-student-state-engine.md) | Every learner state: detection (voice / behaviour / learning signals), priorities, transition trajectories |
| [03-decision-matrix.md](03-decision-matrix.md) | Teaching state × student state → the concrete decision |
| [04-action-selector.md](04-action-selector.md) | The seven-filter funnel that picks the teaching action, with worked traces |
| [05-escalation-engine.md](05-escalation-engine.md) | The failure ladders: what to do when explanation, analogy, demonstration, assessment, or recovery itself fails |
| [06-conversation-engine.md](06-conversation-engine.md) | How the dialogue stays a human tutorial — never quiz, interview, lecture, or robot |
| [07-lesson-planning-engine.md](07-lesson-planning-engine.md) | Continue / repeat / skip / accelerate / slow / review / step back / challenge / end |
| [08-teaching-loop.md](08-teaching-loop.md) | The permanent per-turn loop; the learner-model update contract; the reduce-AI-reasoning ledger; the human-tutor audit record |

## Repository audit (Part 10 deliverable) — what already existed, and how it is used

Searched before writing: every Brain library, the architecture docs, and
the runtime engine surface. Findings and treatment:

| Existing decision knowledge | Where | Treatment here |
|---|---|---|
| Adaptive Teaching Rules — when to explain / demonstrate / scaffold / assess / review / change analogy / raise / lower difficulty / change modality / pause / revisit prerequisites / stop questions | Delivery 1 (chat, pending transcription) | **Unified**: those triggers become transition rules in 01 and rungs in 05; cited, not restated |
| Latency × correctness grid; voice signals | Delivery 1 Voice Model | **Reused** as the primary detection instrument in 02 |
| Recovery Engine scripts + meta-rules | Delivery 1; first-lesson/05 delta | **Reused**: RECOVERY is a state in 01; its interior logic stays in the engine; 03's priority rule routes to it |
| Teaching Action Library dispatch (27 actions, families, knowledge-type matching, persona vetoes) | Delivery 2 §6 | **Extended**: 04 turns the static dispatch table into an ordered selection procedure with history and load filters |
| Adaptive next-item policy + stop rule; affect budget | `../assessment/05 §4`, `02 §6` | **Reused** inside the ASSESSMENT state's interior; 07 references the stop rule for gate decisions |
| Failure autopsy + recovery-after-failed-assessment flowchart + circuit breaker | `../assessment/09` | **Reused verbatim** as the ASSESSMENT-failure branch of 05 |
| Lesson-one flow, limits, one-failure-per-session | `../first-lesson/02,04,05` | **Reused**: lesson one = this state machine with locked settings (01 §5) |
| Review scheduling, interleaving, session-opens-with-retrieval | Delivery 2 §8 | **Reused** as 07's review-injection triggers and 01's OPENING state |
| Per-concept dispatch orders, golden probes, recovery notes | `../concepts/` entries | **Given precedence**: an authored concept entry overrides derived selection (04, filter 6) |
| Runtime `decide()` pipeline, Action vs Posture layers, lesson composition | `src/lib/teaching-engine/`, ADR 08/09/11, the Bible (frozen v1.0) | **Not touched, not redesigned.** Those documents own the CODE pipeline. This library is the PEDAGOGY that pipeline will eventually retrieve — the knowledge-side counterpart, deliberately implementation-free. Where the runtime later consumes this library is an ADR/Bible decision, out of scope here. |

Nothing below duplicates any of the above; where a rule must be usable
in-place, it is cited by source and applied, not re-derived.

## The retrieval claim

After this delivery, a runtime AI teaching a lesson should be able to
**retrieve** — rather than invent — the teaching state, the learner-state
classification, the decision for the combination, the action choice, the
escalation rung after any failure, and the shape of the conversational
turn. What remains for live generation is the surface: the exact wording,
the specific example values, the voice. The ledger of what is retrieved vs
what is still invented is kept explicitly in 08 §4 — that ledger IS the
measure of the moat.
