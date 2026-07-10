# Highest-ROI Recommendation

The single authoring step that would move the most AI improvisation to
retrieval, resolve the most outstanding dependencies, and compound into
the most future value.

---

## The recommendation

**Transcribe Deliveries 1 and 2 into `foundations/` and the nine
planned libraries.**

This is not a close call. The evidence from this audit points to a
single gap that sits above every other: the Brain's universal teaching
engines — the Recovery Engine, Voice Model, Teaching Action Library,
Mental Model Library, Discovery Framework, Curiosity Engine, Misconception
Evolution science, Cognitive Load Engine, Transfer Library, Memory Engine,
Motivation Engine, and 23 Universal Teaching Principles — were authored in
chat during Deliveries 1 and 2 but have never been written into the repo
tree. Every subsequent delivery (assessment/, concepts/, first-lesson/,
decision-engine/, student-state/) cites them by name and depends on them.
None of it can be fully retrieved without them.

---

## The evidence (a dependency count)

The Recovery Engine (Delivery 1) is cited as a dependency by:

1. `decision-engine/01 §4` — RECOVERY state: "its interior scripts are
   the Recovery Engine (Delivery 1)"
2. `decision-engine/03` — the affect-band preemption routes to it
3. `assessment/09` — "Assessment defers to it unconditionally"
4. `assessment/README` — "The Recovery Engine (Delivery 1): affect-first
   responses..."
5. `first-lesson/05` — "the Recovery Engine scripts; lesson-one deltas
   in this file"
6. `student-state/06 §7` — the personalized recovery list is seeded
   from it

**Six separate files depend on a single engine that is not in the tree.**
Every time RECOVERY fires — which is the most critical moment in any
session (Failure 4 in 02-failure-replay.md was a Recovery Engine
failure) — the AI invents the scripts.

The Universal Teaching Principles (Delivery 2 §10) are cited as
dependencies by:

`assessment/README` (UP-1, UP-7, UP-15, UP-17, UP-22),
`assessment/01` (4 principles), `assessment/04` (UP-22),
`decision-engine/01` (UP multiple), `decision-engine/02`
(UP-5, UP-8), `decision-engine/04` (UP-19), `decision-engine/08`
(multiple), `first-lesson/02` (implicitly), `first-lesson/03`
(implicitly), `student-state/07` (UP-17), and others.

**Every principle is cited in at least one file. No principle's content
is in the tree.**

The Teaching Action Library (Delivery 2 §6, 27 actions, 6 families) is
the content that the action selector (decision-engine/04) dispatches.
Filters 2, 4, and 6 directly reference it:
- Filter 2 references "knowledge-type rows" from this library
- Filter 4 references "persona vetoes by action" from this library
- Filter 6 references "per-action cost estimates" from this library

The selector is a 7-step procedure with no catalog. It is the Brain's
most-executed path — it runs every teaching turn — and for 99.8% of
concepts it falls through all filters to AI improvisation.

---

## The multiplier effect

Transcribing Deliveries 1 and 2 is not just one more delivery. It is
the delivery that makes every prior delivery more powerful, because the
prior deliveries were designed to reference this content, not to replace
it.

| After transcription | What changes |
|---|---|
| The action selector (decision-engine/04) | Goes from a procedure with empty libraries to a procedure with a full 27-action catalog; Filter 2–6 now actually filter |
| Recovery Engine retrieval | Every RECOVERY trigger now retrieves a script instead of improvising one — the highest-stakes moment in the system |
| Universal Principles as actual rules | 23 laws cited throughout the Brain are now content, not names; every citing file now actually retrieves what it references |
| The 13 partially-retrieved layers (audit 03) | All 13 move from PARTIALLY-RETRIEVED to RETRIEVED or close to it |
| Future concept entry authoring | Entry authors can now reference real engines (e.g., "curiosity hook: the mechanism-surprise trigger per Curiosity Engine §2") rather than inventing hooks from scratch |
| Duplication resolution | The two real redundancy issues (audit 04) can be resolved: the latency × correctness grid and the Universal Principles restatements each get a canonical home |
| The nine planned library directories | `foundations/`, `mental-models/`, `curiosity/`, `misconceptions/`, `cognitive-load/`, `teaching-actions/`, `transfer/`, `memory/`, `motivation/`, `principles/` — all designed and named in the README; none created. These exist as named intentions, not knowledge. |

---

## The alternative paths, and why they are lower ROI

**Option B: Author more concept entries (expand concepts/).**

There are 1,528 concepts across the 6 live subjects (908 math + 194
physics + 216 English + 186 chemistry + 89 biology + 119 CS, minus 3
already authored). Authoring more entries would extend the selector's
Filter 1 coverage — but the entries themselves REFERENCE the engines from
Deliveries 1–2. A concept entry's teaching action dispatch says "in
order: discovery → demonstration → worked example..." but the definition
of what a "discovery lesson" IS, and the rules for designing it, are in
the Discovery Framework (Delivery 2 §2, pending). Every entry author
would need to invent what the framework should tell them. The entries
compound on a foundation that doesn't yet exist.

**Option C: Author the missing knowledge domains (validation/05).**

Relationship capital, worked example design, metacognitive instruction —
these are genuine gaps. But they are smaller gaps than Deliveries 1–2.
The missing domains affect certain session types or specific learner
populations. Deliveries 1–2 affect every single session, for every
learner, every turn. The frequency multiplier makes Deliveries 1–2
overwhelmingly higher priority.

**Option D: Build more validation and testing.**

The audit infrastructure itself (this delivery) is complete. Adding more
session simulations or failure replays would produce diminishing returns
until the underlying knowledge is authored. The gaps are now known;
documentation of gaps has lower value than closing them.

**Option E: Author specific missing knowledge first (wait-time, interleaving).**

These are valuable but low-frequency. Wait-time calibration (05's §8)
is high-frequency per session, but its rules are probably in the
pending Delivery 1 transcription anyway — transcribing Delivery 1 may
resolve it automatically. Authoring the missing pieces separately, before
the foundations, produces orphaned content without the scaffolding.

---

## The sequencing within the recommendation

Deliveries 1 and 2 together are large. If they must be split, the
internal sequence by ROI within them:

1. **Recovery Engine** — most critical moment, cited by 6 files,
   affects every session that goes wrong (which is the sessions that
   matter most)
2. **Universal Teaching Principles** — cited in every file, define
   the laws everything else rests on; without them the whole tree's
   citations are empty names
3. **Voice Model (latency × correctness grid + wait-time calibration)** —
   highest-frequency diagnostic tool; cited in assessment/README as "the
   single most-used instrument"
4. **Teaching Action Library (27 actions, 6 families)** — fills the
   action selector's libraries; makes filters 2–6 operational
5. **Cognitive Load Engine** — makes filter 6 operational; informs
   worked-example design (missing-knowledge §2)
6. **Motivation Engine (12 personas)** — makes filter 4 vetoes
   operational; closes the BORED/gifted gap
7. **Misconception Evolution science** — extends the repair track
   beyond the 3 seed concepts; adds regrowth/regression rules
8. **Mental Model Library** — enhances concept entries for future
   authoring
9. **Curiosity / Discovery / Transfer engines** — complete the concept
   entry template's reference infrastructure
10. **23 Universal Principles** — consolidate into `principles/`; the
    content is already partially distributed across the tree as inline
    restatements

---

## The compounding property

This is the decisive argument. The Educational Brain is designed to
compound: each piece of authored knowledge makes the next piece more
powerful, more precisely targeted, and cheaper to author. Without
Deliveries 1–2:

- Concept entries cannot reference real engines
- The action selector cannot select
- The recovery system cannot retrieve scripts
- The 13 partially-retrieved layers remain partial forever
- Future deliveries (Deliveries 10+) must author around the missing
  foundation, creating bespoke workarounds for each gap

With Deliveries 1–2:

- Every existing file's 52+ retrievable layers connect to their engines
- Every future concept entry author has a full reference infrastructure
- The action selector becomes functional for uncovered concepts
  immediately (no new concept entries required)
- The nine planned libraries become real directories with content,
  not named intentions
- The Brain crosses the threshold where retrieval is the dominant mode,
  improvisation is the residue — not the other way around

The moat exists as an architecture. Transcribing Deliveries 1 and 2 is
the action that makes it a functioning moat.

---

## Measurable success criterion

After Deliveries 1 and 2 are transcribed, re-run the session simulations
in 01-session-simulations.md. Success is:

1. Session A (fearful beginner): Recovery Engine scripts are retrieved,
   not invented. The "Gaps surfaced" list shrinks to: surface wording
   only.
2. Session B (misconceiving adult): Full 7-step repair sequence
   retrieved from `misconceptions/`. Prosody retrieved from `voice/`.
   Gaps list: surface wording only.
3. Session C (bored advanced): Gifted-learner persona retrieved from
   `motivation/`. Compaction protocol specifics retrieved from
   `teaching-actions/`. Gaps list: surface wording only.
4. AI dependency audit (03): The 13 PARTIALLY-RETRIEVED layers become
   RETRIEVED. The "still invented" category contains only the three
   authorized residue categories (surface wording, voice rendering,
   novel utterances) — nothing else.

When those four criteria pass, the Brain has crossed the threshold where
retrieval dominates. Every authoring step after that is compounding
improvement on a working foundation, not bridging a structural gap.
