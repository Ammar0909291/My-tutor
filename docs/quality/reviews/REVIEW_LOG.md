# Educational Brain — Blueprint Review Log

Independent reviewer records (Pappu authors → reviewer reviews → accepted
enters the Brain). Each entry applies the `docs/quality/` framework; it
records the decision, score, and the exact gate outcomes so the dashboard
(Panel 7) and audit trail stay accurate (`PRODUCTION_ACCEPTANCE_CHECKLIST.md`
§4). The reviewer never edits blueprints — findings are returned to the
author.

---

## R-0001 · `eng.phonics.phonemic-awareness` · 2026-07-11

**Class**: FULL entry · **Tier**: A (zero-prerequisite entry node + phonics
cut-node) · **Reviewed at**: commit e313086.

**Decision: REVISE** (narrow, high-value — one systematic instrument gap).

**Scorecard: 89/100 · Band B** (just below the A bar the three founding
seeds define).

| Category | Score |
|---|---|
| Misconceptions | 14/20 |
| AI Removal | 13/15 |
| Assessment / Mastery Gate | 14/15 |
| Determinism | 9/10 |
| Diagnostics | 7/8 |
| Teaching Actions | 8/8 |
| Teaching Flow | 7/7 |
| CPA (concrete-first) | 5/5 |
| Reusability | 7/7 |
| Prose | 5/5 |

**Mandatory gates**: G1 ✓ G2 ✓ **G3 ✗** G4 ✓ G5 ✓ G6 ✓ G7 ✓ G8 ✓ G9 ✓ G10 ✓.
G3 (every misconception ≥8/10, no zero attribute) is the only failing
gate → REVISE.

**Per-misconception (Misconception Quality Audit)**:
| | M-A symptom | M-B precision | M-C repair | M-D verification | M-E escalation | Total |
|---|---|---|---|---|---|---|
| P1 (Type 3) | 2 | 2 | 1 | 1 | 1 | **7** |
| P2 (Type 1) | 2 | 2 | 2 | 1 | 1 | **8** |
| P3 (Type 5) | 2 | 2 | 2 | 1 | 0 | **7** |

Birth types all VALID and correctly matched to mechanism (diagnostic
procedure re-run). Detection (M-A/M-B) is exemplary — verbatim phrases
and discriminating probes throughout. The gap is uniform: **verification-
of-death (M-D) and escalation (M-E) are under-specified across all three
misconceptions.**

**Critical issues**: none (no learner-harming defect; no framework/runtime
contradiction).

**Major improvements (drive the REVISE)**:
1. **M-D — add concept-specific verification-of-death to P1/P2/P3.** The
   three founding seeds (e.g. `math.arith.fractions` M1/M2) state explicit
   *delayed + speeded* re-probe items and the birth-type regrowth prior;
   P1/P2/P3 give only a fresh-word verification with no delayed/speeded
   framing and no regrowth prior cited. This is the newest entry drifting
   below the seed bar on exactly the instrument attribute that certifies a
   misconception is dead — the precise drift the QA layer exists to catch.
   Fix: add to each entry a delayed + disguised + speeded re-probe and its
   regrowth prior (Type 3 MEDIUM/reactivates-on-everyday-usage; Type 1
   MEDIUM; Type 5 LOW-MEDIUM, per `student-state/03 §3`).
2. **M-E — add escalation-on-repair-failure to each misconception.** None
   states what happens if the repair does not land. Because burned-
   collision + re-rating are *universal* (`misconceptions/02 §3`,
   `student-state/03 §3`), the correct fix is a one-line REFERENCE per
   entry (not a restatement — V30), confirming the second-attempt uses a
   different collision and that two regrowths re-rate HIGH + flag the
   repair. P1's Type-3 case especially needs "if rewording still fails,
   escalate to…".

**Minor improvements**:
- **M-C framing (P1/P3)**: the repairs are birth-type-correct collisions
  but do not explicitly walk the commit/contrast steps. For a Type-3/Type-5
  the repair is legitimately lighter than a Type-2 perceptual collision;
  the entry should say so in one line (which steps abbreviate and why),
  so a weak renderer doesn't skip getting the learner's commitment.
- **Voice section channel-reality pointer**: this entry predates the
  TEMPLATE.md Voice-section update (Correction 1, `foundations/03 §7`).
  Add the one-line pointer to `foundations/03 §7` for the channel-reality
  caveat (the entry already correctly describes ideal perception; this is
  the now-standard cross-reference). Already acknowledged in-tree as the
  "corrected example, not rewritten."
- **Assessment item bank**: name a few canonical target words explicitly
  (continuants — /m/, /s/, /f/: stretchable, hummable) rather than only
  "2–3 words," to make the oral item bank concrete for a weak renderer.
- **Objective 4** (distinguish sound from syllable) straddles the
  beginner/intermediate model boundary and is really the P2 repair — worth
  a one-line note mapping it to the P2 work rather than leaving it as a
  standalone objective.

**Strengths (exemplary — keep as the bar for future English entries)**:
- The "why beginners fail" mechanism (invisible attention-shift, not
  knowledge) is one of the strongest in the tree.
- Detection is best-in-class: verbatim phrases + latency-as-diagnostic +
  the whole-word-repeat non-verbal signal.
- The anti-analogy ("letters make sounds" as a category error here) is
  concept-perfect and prevents a documented downstream misconception.
- Teaching-actions dispatch is fully consistent (Enactment correctly typed
  as physical-procedure; TELL-family correctly demoted to framing-only)
  with an explicit "what does NOT fit" section — model discipline.
- Discovery-vs-direct is argued, not defaulted; concrete-first throughout.
- Reusability is clean — references engines, restates none, nothing
  paste-anywhere.

**AI Removal**: PASS (all five probes) — with the noted caveat that the
M-E escalation gap leaves a small "what if the repair fails" hidden step
for P1/P3; closing M-E closes it.

**Runtime / Brain / Contract compatibility**: fully compatible. Assets map
cleanly to AssetIdentity families (the runtime already seeds a short_answer
probe + EARLY/ADULT explanations for this concept); misconception phrases
map to MISCONCEPTION_DETECTED; nothing contradicts the frozen runtime or
the Runtime ↔ Brain Contract.

**Recommendation**: **REVISE** — return to author with the two Major items
(M-D verification, M-E escalation) as the gating fixes and the four Minors
as polish. Estimated revision is small and localized to the misconception
library + two one-line cross-references; on completion this entry scores
~95 (Band A) and clears G3. The blueprint is excellent; it is one
instrument pass away from the seed bar.

---

## Reference baseline — the three founding seeds (A-band, by construction)

`COVERAGE.md` designates these THE quality bar; they are the reference
row, not re-litigated here. Recorded for the dashboard:
- `math.arith.fractions` — Band A reference (misconception library incl.
  explicit delayed+speeded verification — the M-D standard R-0001 should
  match).
- `phys.mech.newtons-first-law` — Band A reference (impetus misconception
  with the best-documented regrowth-under-time-pressure verification).
- `eng.phonics.letter-sound-correspondence` — Band A reference (schwa +
  blending misconceptions, anti-analogy discipline).

## Review queue status

No new author-submitted blueprints pending as of commit e313086. R-0001
is the inaugural application of the QA framework to the corpus. When
Pappu submits new blueprints, each receives an R-#### entry here.
