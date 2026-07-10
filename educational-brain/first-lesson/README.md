# First Lesson Standard

The universal standards for teaching a **complete beginner** — a learner who
knows absolutely nothing about the subject. If the Educational Brain cannot
perfectly teach the very first lesson, it has no business teaching advanced
concepts: every learner passes through lesson one, at their most fragile,
with no history of success to draw on and no trust yet extended. Lesson one
is where learners are won or lost, and it is where this platform's own
observed sessions showed AI tutoring failing hardest.

## The one-sentence philosophy

**The deliverable of lesson one is not content. It is a learner who believes
"I can learn this" and comes back.** Content learned is the bonus. Every
standard in this library follows from that inversion.

## Reading order

| File | Contents |
|---|---|
| [01-the-complete-beginner.md](01-the-complete-beginner.md) | What "knows nothing" actually means, detection, false beginners, returning learners, adults vs children |
| [02-principles-and-limits.md](02-principles-and-limits.md) | The never-rules and the hard cognitive limits of lesson one |
| [03-tutor-behaviour.md](03-tutor-behaviour.md) | Tone, speech, pacing, wait time, encouragement, corrections, transitions — the world's best human tutor, minute by minute |
| [04-lesson-flow-and-completion.md](04-lesson-flow-and-completion.md) | The flow (Demonstrate → Explain → Guided → Independent → Confirm → Close) adapted for absolute zero, and the measurable completion criteria |
| [05-beginner-failure-states.md](05-beginner-failure-states.md) | How every Recovery Engine state changes at lesson one, plus the lesson-one-specific states ("I'm scared", "I'm stupid") |
| [06-anti-library.md](06-anti-library.md) | Every documented way AI tutors fail beginners — from this platform's own experience — with replacements |
| [07-subject-adaptations.md](07-subject-adaptations.md) | The Standard applied to the real first KG nodes of Mathematics, English, and Physics: what changes, what stays universal |
| [08-feedback-loop.md](08-feedback-loop.md) | The compounding pipeline: failed beginner session → root cause → Brain improvement → future learners benefit |

## Reuse map — what lives elsewhere and is only referenced here

Per the tree's reuse-first law, this library **references, never copies**:

- **Recovery Engine** (Delivery 1) — the general scripts for "I don't know",
  "I give up", etc. File 05 here authors only the *lesson-one delta*.
- **Latency × correctness grid and Voice Model** (Delivery 1) — file 03
  applies them to lesson-one pacing; nothing re-derived.
- **Cognitive Load Engine** (Delivery 2 §5) — file 02's limits are that
  engine evaluated at the beginner's boundary conditions.
- **Universal Teaching Principles** (Delivery 2 §10) — lesson one obeys all
  23; files here cite them by number where they bite hardest.
- **Assessment Design Library** (`../assessment/`) — cold-start diagnosis
  (02 §5), beginner/age assessment adaptations (07 §1–2), assessment
  anti-patterns (01 §5). File 06 here holds *teaching-side* and
  first-lesson-specific anti-patterns only.
- **Curriculum Integration Layer** (`../concepts/`) — subject adaptations in
  file 07 anchor to the canonical KGs' real zero-prerequisite entry nodes
  (`math.found.mathematical-thinking`, `phys.meas.units`,
  `eng.phonics.print-concepts` / `eng.phonics.phonemic-awareness`), verified
  against the live graph.json files. Full per-concept entries for those
  nodes belong in `../concepts/` and follow its TEMPLATE; file 07 defines
  the first-lesson treatment those entries must honor.

## The quality bar

Every sentence in this library answers: *would the world's best human tutor
actually do or say this to a complete beginner?* Anything that wouldn't
survive being spoken to a nervous six-year-old or a embarrassed forty-year-old
on their first day does not belong here.
