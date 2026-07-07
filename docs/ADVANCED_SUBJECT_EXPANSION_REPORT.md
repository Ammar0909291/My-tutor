# Advanced Subject Expansion Framework — Final Report

**Status: documentation-only sprint, complete.** No code changed. No Quantum Physics content modified.
No new subject implemented. Deliverables: `ADVANCED_SUBJECT_FRAMEWORK_AUDIT.md` (Task 1),
`ADVANCED_SUBJECT_TEMPLATE.md` (Task 2), this report (Tasks 3–6).

## 1. Reusable framework (summary)

Quantum Physics's 6 sprints validated that exactly **two layers** require meaningful per-subject
engineering — the curriculum tree and the teaching-visual renderers. Every other layer (assessments,
educational intelligence) is zero-cost, and the remaining two (misconceptions, visual mastery) are
small, additive, mechanical registrations against existing engines. Full detail in
`ADVANCED_SUBJECT_FRAMEWORK_AUDIT.md`; the step-by-step build procedure is in
`ADVANCED_SUBJECT_TEMPLATE.md`.

| Layer | Per-subject cost |
|---|---|
| Curriculum | 1 tree + 1 `SUBJECT_LIBRARY` entry |
| Misconceptions | 4–8 rule entries |
| Assessments | 0 |
| Visuals (teaching) | 5–10 `VisualType`s + renderers + detection rules |
| Visual Mastery | 1 challenge bank + 1 bridging component + 1 engine value |
| Educational Intelligence | 0 |

## 2. Task 3 — Expansion prioritization (roadmap)

Ranked by educational demand, visual learning value, curriculum complexity, and implementation cost
(1 = highest priority). "Cost" is estimated relative to Quantum Physics (33 units/144 lessons/9 visuals
as the reference effort = "high").

| Rank | Subject | Demand | Visual value | Curriculum complexity | Implementation cost | Rationale |
|---|---|---|---|---|---|---|
| 1 | Classical Mechanics | Very high | Very high (forces, motion, energy diagrams) | Medium | Medium | Foundational physics; large student base; highly visual (vectors, free-body diagrams, trajectories); most misconceptions already studied in physics-education research. |
| 2 | Electromagnetism | Very high | Very high (fields, circuits, waves) | Medium-high | Medium-high | Natural sequel to Mechanics; shares Physics category/SubjectType; strong visual payoff (field lines, circuit diagrams). |
| 3 | Advanced Mathematics | High | Medium-high (graphs, geometric proofs) | High (broad scope) | Medium | Large addressable demand (exam prep); curriculum scope risk is breadth, not depth — needs careful unit-count discipline. |
| 4 | Computer Science | High | Medium (flowcharts/process diagrams reuse `process_flow`) | Medium | Low-medium | Can lean heavily on the existing `process_flow`/`graph` mastery renderers instead of new SVG visual types — lowest visual-build cost of the list. |
| 5 | Data Science | High | High (data visualizations, distributions) | Medium | Medium | Strong overlap with Advanced Mathematics prerequisites; visuals reuse `graph`/`number_line` patterns more than custom SVG. |
| 6 | Organic Chemistry | Medium-high | High (molecular structure diagrams) | Medium-high | Medium-high | High visual payoff but molecular-structure rendering is a new visual idiom (not a simple reskin of Quantum's wave/field SVGs) — moderate novel-rendering cost. |
| 7 | Artificial Intelligence | Medium | Medium (architecture/flow diagrams) | Medium | Low-medium | Fast-growing demand but conceptually depends on Mathematics/CS being available first for prerequisite linking. |
| 8 | Relativity | Medium | High (spacetime diagrams, light cones) | Medium | Medium | Smaller curriculum scope than Mechanics/EM (could be 15–20 units); high visual novelty similar to Quantum's. |
| 9 | Inorganic Chemistry | Medium | Medium (periodic trends, lattice diagrams) | Medium | Medium | Solid demand but lower visual differentiation than Organic; best sequenced after Organic Chemistry's molecular-rendering infrastructure exists. |
| 10 | Astrophysics | Medium | High (orbital mechanics, stellar diagrams) | Medium-high | Medium-high | Strong visual appeal but narrower direct-exam demand than the physics/math core; benefits from Classical Mechanics/Relativity groundwork first. |

**Recommended build order**: Classical Mechanics → Electromagnetism → Advanced Mathematics →
Computer Science → Data Science → Organic Chemistry → Artificial Intelligence → Relativity →
Inorganic Chemistry → Astrophysics. Physics-then-Math-then-Computing-then-Chemistry-then-frontier
sequencing maximizes prerequisite reuse (Mechanics underpins EM and Relativity; Math underpins CS/Data
Science/AI; Organic Chemistry's molecular-rendering work de-risks Inorganic Chemistry).

## 3. Task 4 — Subject readiness matrix

Estimates scaled from the Quantum Physics reference (33 units / 144 lessons / 9 teaching visuals /
6 misconception rules / 10 mastery challenges). "Assessment coverage" is always **Full (0 new code)**
per the audit's Section 3 finding — included for completeness, not because it varies.

### Physics

| Subject | Est. units | Est. lessons | Est. visuals | Est. misconception rules | Assessment coverage |
|---|---|---|---|---|---|
| Classical Mechanics | 28–32 | 120–140 | 8–10 | 6–8 | Full |
| Electromagnetism | 26–30 | 110–130 | 7–9 | 6–8 | Full |
| Relativity | 14–18 | 60–75 | 6–8 | 4–6 | Full |
| Astrophysics | 20–24 | 85–105 | 7–9 | 5–7 | Full |

### Mathematics

| Subject | Est. units | Est. lessons | Est. visuals | Est. misconception rules | Assessment coverage |
|---|---|---|---|---|---|
| Advanced Mathematics | 30–36 | 130–155 | 6–8 | 6–8 | Full |

### Computing

| Subject | Est. units | Est. lessons | Est. visuals | Est. misconception rules | Assessment coverage |
|---|---|---|---|---|---|
| Computer Science | 24–28 | 100–120 | 5–7 | 5–7 | Full |
| Data Science | 20–24 | 85–105 | 5–7 | 5–6 | Full |
| Artificial Intelligence | 18–22 | 75–95 | 5–7 | 5–6 | Full |

### Chemistry

| Subject | Est. units | Est. lessons | Est. visuals | Est. misconception rules | Assessment coverage |
|---|---|---|---|---|---|
| Organic Chemistry | 24–28 | 100–120 | 7–9 | 6–8 | Full |
| Inorganic Chemistry | 22–26 | 90–110 | 6–8 | 5–7 | Full |

**Totals if all 10 are built**: ~226–268 units, ~955–1,165 lessons, ~64–82 visuals, ~54–69
misconception rules, ~10 visual-mastery bridging components, 10 `VisualEngine` values, 10
`SUBJECT_LIBRARY` entries.

## 4. Task 5 — Architecture scaling review (review only, no implementation)

Reviewed each system named in `ADVANCED_SUBJECT_FRAMEWORK_AUDIT.md` against three thresholds: 20+,
50+, and 100+ advanced Library Subjects.

| System | 20+ subjects | 50+ subjects | 100+ subjects |
|---|---|---|---|
| `SUBJECT_LIBRARY` array + curriculum builders | Scales — flat array, no per-entry coupling | Scales — same; file size grows but is split per-subject-file already-in-pattern (each subject's curriculum can live in its own module) | Scales structurally; recommend splitting `subjectCatalog.ts` into one file per subject re-exported into the array, purely for maintainability, not correctness |
| Knowledge Graph fallback (`findLibrarySubject`) | Scales — O(n) lookup over subjects is negligible at this scale | Scales | Scales; if subject count reaches the high hundreds, an index/map lookup would be a trivial optimization, not an architecture change |
| `CATEGORY_TO_TYPE` enum mapping | Scales — categories are reused, not 1:1 per subject | Scales | Scales; only grows if a genuinely new category (not yet covered by Physics/Math/Computing/Chemistry) is introduced |
| Misconception `RULES` array | Scales — flat array, substring match is O(rules) per check, cheap at hundreds of entries | Scales | At 500+ rules, substring scanning is still sub-millisecond; no change needed before then |
| Assessment engine | Fully generic — scales unconditionally | Scales | Scales — no subject-count dependency exists in this layer at all |
| `VisualType` union + `VISUAL_META` + `VisualCard` switch | Scales — each addition is additive; TypeScript union size has no practical runtime cost | At 50+ subjects × ~7 visuals avg ≈ 350 `VisualType` members — still fine for TS compiler and a switch statement, though `VisualCard.tsx` would benefit from splitting into per-subject renderer modules for maintainability | At 100+ subjects (~700 visual types), recommend the same per-subject-file split as curriculum; this is a file-organization change, not an engine redesign |
| `detectVisual.ts` keyword rules | Scales — ordered most-specific-first; subject-keyed tables avoid cross-subject collisions | Scales, same caveat as above re: file size | Scales; same maintainability-only split recommended |
| `VISUAL_SUBJECTS` Set + `!schoolCtx` injection block | Scales unconditionally — O(1) Set membership check, single shared block | Scales | Scales |
| `VisualEngine` union + recommendation/guidance text maps | Scales — one value per subject (not per visual), so growth is linear and small (≤100 entries even at 100 subjects) | Scales | Scales |
| Visual Mastery pipeline (`createMasteryEmitter`→`EvidenceRecord`) | Scales — engine values are strings, no enum explosion in the DB layer (`EvidenceRecord.notes` is JSON) | Scales | Scales |
| Educational Intelligence (Teaching Plans, Difficulty/Retest Intelligence, Transparency Layer) | Fully generic over `subjectSlug`/`topicSlug` — scales unconditionally | Scales | Scales |
| Prisma schema (`Subject`, `TopicProgress`, `EvidenceRecord`) | Scales — `Subject` rows are lazily upserted, no schema growth per subject | Scales | Scales; standard indexing on `(userId, subjectSlug)` already supports this access pattern at any subject count |

**Conclusion**: no architectural layer breaks or requires redesign at 20+, 50+, or 100+ subjects. The
only recommendation that emerges at the 50–100+ tier is **file-organization** (splitting
`subjectCatalog.ts`, `VisualCard.tsx`, and `detectVisual.ts` into per-subject modules for
maintainability) — not an engine, schema, or contract change. This is a future refactor to flag, not a
blocker for any near-term subject addition.

## 5. Recommendations

1. Proceed with Classical Mechanics as the next subject sprint — highest demand/visual-value, medium
   cost, and directly reuses every reusable layer documented in `ADVANCED_SUBJECT_TEMPLATE.md`.
2. Follow the Section 2 build order (Mechanics → EM → Math → CS → Data Science → Organic Chem → AI →
   Relativity → Inorganic Chem → Astrophysics) to maximize prerequisite and visual-idiom reuse between
   adjacent subjects.
3. When `subjectCatalog.ts`, `VisualCard.tsx`, or `detectVisual.ts` approach the file sizes implied by
   4–5 simultaneous advanced subjects, schedule a maintainability-only split into per-subject modules —
   do this proactively rather than waiting for the files to become unwieldy.
4. Keep the "two non-trivial layers" discipline from the audit: curriculum-tree authoring and
   visual-renderer authoring are where review time should concentrate; misconceptions, assessments, and
   Educational Intelligence integration require no special review per subject beyond the mechanical
   registration steps in the template.

## STOPPED AFTER REPORT

No new subject implemented. No Quantum Physics file modified. No Tutor Max, Educational Intelligence,
or Visual Learning redesign performed. This report and its two companion documents
(`ADVANCED_SUBJECT_FRAMEWORK_AUDIT.md`, `ADVANCED_SUBJECT_TEMPLATE.md`) constitute the complete
reusable blueprint for all future advanced subjects.
