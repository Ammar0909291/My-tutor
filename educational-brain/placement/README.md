# Student Placement & Category Progression Engine — Delivery 10

## Full project abstraction — what the Brain knows before this delivery

After Deliveries 1–9, the Educational Brain holds the following layers:

| Library | Answers | Does NOT answer |
|---|---|---|
| `assessment/` (D3) | HOW to measure knowledge: binary-search placement probes, misconception detection, mastery gates, failure recovery | What to DO with placement results at the category level; never-reteach law |
| `concepts/` (D5) | HOW to teach specific concepts: per-concept dispatch, misconception libraries, gates, probes | Category-level grouping; when a whole category is "done" |
| `first-lesson/` (D6) | HOW to begin with a complete beginner: limits, flow, failure states | How to begin when starting from the MIDDLE of a curriculum |
| `decision-engine/` (D7) | WHAT to do each turn: state machine, decision matrix, session planning | Which category the session should be in; when to advance to the next category |
| `student-state/` (D8) | WHO the learner is: concept-level knowledge ladder, misconception ledger, memory, trajectory | How concept-level states aggregate into a category-level verdict; promotion/demotion rules |
| `validation/` (D9) | Which layers are retrieved vs. invented; gaps and ROI ordering | — |

**The architectural gap this delivery fills:**

Between the curriculum (WHAT to teach — the KG) and the teaching engine (HOW to teach — D7) there is a missing layer answering:

> **WHERE should teaching begin — and when does it advance?**

The placement engine answers the WHERE. The progression engine answers the WHEN. Together they form the permanent rules the runtime must retrieve before opening any session.

**What already exists (do not duplicate):**

- `assessment/02 §2–8` — binary-search placement protocol, cold-start, cut-node probing, affect budget, placement decision tree. **This file USES that protocol; it does not rewrite it.**
- `assessment/02 §7` — ongoing micro-diagnosis (teaching is itself diagnostic after placement)
- `student-state/02 §4` — the per-domain frontier concept (boundary between rung-4+ and below)
- `student-state/07` — memory statuses and their interaction with the knowledge ladder
- `decision-engine/07 §3` — compaction protocol (skip/accelerate via pretest)
- `first-lesson/01 §4–5` — false-beginner detection, returning-learner high-water marks
- `src/lib/curriculum/placement.ts` — the runtime implementation (difficulty-floor entry order; `computeCurriculumEntryOrder` / `getPlacementFloorSlugs`). The Brain does NOT redesign the code; it authors the knowledge the code will eventually retrieve.

**What this delivery adds:**

1. Category-level mastery — how concept-level knowledge rungs aggregate to a categorical verdict (ANCHORED / PROBABLE / UNCERTAIN / UNKNOWN)
2. The never-reteach law — the permanent architectural law governing all category transitions
3. The level-hypothesis model — how to treat self-reported level, how to verify and adjust it
4. Promotion criteria — when a category is fully mastered and the frontier advances
5. Regression repair — how to repair a gap without restarting the category
6. Resumption — how to return after a long absence without re-teaching what was learned
7. Six full student simulations across the complete placement arc
8. Gap validation against the project vision

## The foundational premise

The world's best human tutors never ask: "should I start this student from the beginning?" They ask: "where is their learning frontier?" The answer is never the beginning for anyone who has ever learned anything — because storage survives (`student-state/07`, high-water marks, `student-state/02 §2 law 3`). The job of placement is to locate the frontier. The job of progression is to keep the frontier advancing. Together they make the platform's central promise real:

> **No learner's time is ever wasted reteaching what they already know.**

## Reading order

| File | Contents |
|---|---|
| [01-foundations.md](01-foundations.md) | The placement law; the two placement errors; the human-tutor model |
| [02-level-hypothesis.md](02-level-hypothesis.md) | The self-report trust model; trust calibration; adjustment without insult |
| [03-placement-protocol.md](03-placement-protocol.md) | The full placement flow: category probing, frontier detection, confidence levels |
| [04-category-mastery.md](04-category-mastery.md) | What category mastery means; the never-reteach law; decay vs. demotion |
| [05-progression-engine.md](05-progression-engine.md) | Promotion, demotion, regression repair, cross-category prerequisites |
| [06-resumption.md](06-resumption.md) | Returning after days, months, years; warm-up vs. reteach; cascade recovery |
| [07-student-simulations.md](07-student-simulations.md) | Six full simulations traced through placement, verification, progression |
| [08-gap-validation.md](08-gap-validation.md) | Vision validation; remaining gaps; what the runtime must implement |
