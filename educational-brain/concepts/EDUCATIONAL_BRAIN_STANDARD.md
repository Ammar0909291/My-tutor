# Educational Brain Entry Standard v1.0

The single authoring contract for every `educational-brain/concepts/{subject}/
{kg-id}.md` entry, present and future. Supersedes `TEMPLATE.md` (kept as a
short pointer to this file — see the bottom of this document for why it
was not deleted). Produced as its own batch of the Curriculum Completion
Program: **no new concept entries were authored in this batch** — this
document is the deliverable.

---

## 1. Why this document exists

71 concept entries exist today (67 physics, 3 english, 1 mathematics),
authored across at least two distinct working sessions over roughly two
weeks. Reviewing a representative sample across subjects and batches
— `math.arith.fractions`, `phys.mech.newtons-first-law`,
`eng.phonics.letter-sound-correspondence` (the original 3 Delivery-5
seeds), `eng.phonics.phonemic-awareness`, `eng.phonics.print-concepts`
(the two most recent additions), plus a structural (headings-only) scan
of `phys.meas.units`, `phys.therm.zeroth-law`, `phys.wave.doppler-effect`,
`phys.mech.newtons-second-law`, `phys.em.electric-potential`,
`phys.wave.interference`, `phys.mech.momentum`, `phys.opt.brewsters-law`
— surfaced both a stable core and a real drift.

### 1.1 Common sections (present in every entry reviewed)

Every entry, regardless of heading style, contains content matching all
15 of `TEMPLATE.md`'s sections: Identity, Mental models, Why beginners
fail here, Misconception library, Explanation library, Analogy library,
Demonstration library, Discovery lesson, Teaching actions, Voice
teaching, Assessment, Recovery notes, Memory & review, Transfer map,
Curriculum feedback. This confirms the underlying content model is
sound — the problems found are all **presentational/structural drift**,
not missing content categories.

### 1.2 Inconsistent sections (real drift, confirmed by direct comparison)

- **Heading numbering**: `phys.meas.units`, `phys.mech.newtons-first-law`,
  `math.arith.fractions`, and all 3 english entries use unnumbered
  headings (`## Identity`). `phys.mech.momentum`, `phys.opt.brewsters-law`,
  `phys.mech.newtons-second-law`, `phys.em.electric-potential`,
  `phys.wave.interference` use numbered headings (`## 1. Identity`
  through `## 15. Curriculum Feedback`). `phys.wave.doppler-effect`
  (unnumbered) precedes the drift; `phys.mech.newtons-second-law` and
  later (numbered) follow it — the drift began somewhere in physics
  batches 13–17, was never reverted, and was never reconciled backward
  into the earlier batches. **Neither style is more correct** — this
  standard picks one (§3 below) and both existing styles must converge
  to it whenever an entry is next touched (not retroactively, in bulk,
  as part of this batch).
- **Section-name variants**: "Mental models" vs. "Mental Models (4-stage
  progression)" vs. "Mental models (4-stage progression)"; "Why beginners
  fail here" vs. "Why Beginners Fail" vs. "Why beginners fail"; "Teaching
  actions" vs. "Teaching Actions (dispatch table)". None of these are
  wrong, but none is canonical either — this standard fixes the exact
  wording (§3).
- **Learning objectives location**: currently nested inside "Identity" in
  every entry (as a bulleted sub-list), never a first-class section, even
  though every entry treats objectives as the thing mastery gates
  certify. This standard promotes it to its own section (§3.2).
- **No entry has an explicit "Core Understanding" statement, a
  "Blueprint References" section, a "Runtime Asset References" section,
  or a "Version History"** — all four are genuinely new, not renames of
  existing content (§3.4, §3.18, §3.19, §3.21).
- **Cross-subject transfer is currently folded into "Transfer map"** as
  one bullet among near/far/real-world/expert-transfer — this standard
  promotes it to its own section per the required list (§3.14), since it
  is the one transfer category with a direct KG data source
  (`cross_links`) and deserves separate visibility.
- **Assessment sections in all 5 fully-read entries restate items that
  substantially overlap their concept's own existing Blueprint** (all 5
  reviewed concepts — fractions, newtons-first-law,
  letter-sound-correspondence, phonemic-awareness, print-concepts —
  already have a `docs/curriculum/blueprints/{id}.md` file with its own
  worked-example and mastery-probe components). This is the most
  consequential finding of this review: **it is a real, existing
  duplication risk**, not yet a violation severe enough to require
  retroactive rewriting (the two layers currently agree with each other
  everywhere checked, and the EB entries add framing/diagnostic value
  the Blueprints don't carry), but it is exactly what this standard's
  §4 ownership boundary is designed to prevent going forward. Recorded
  as a reconciliation backlog item, not fixed in this batch.

---

## 2. Scope discipline this document enforces

Repeating the standing rule this whole program operates under
(`CLAUDE.md`, "Curriculum Completion Program"): an Educational Brain
entry is **one of only two hand-authored static layers** (the other is
the Blueprint, owned by the external Curriculum Production Pipeline).
Everything else — Explanation/Probe runtime assets, live lesson dialogue,
visualizations, practice generation, the `decide()` adaptive engine — is
either DB-backed and populated by capture/review or seeded in small,
deliberate, Wave-0-gated batches (`src/lib/teaching/assets/
brainSeedAssets.ts`), or fully runtime-procedural. This document's §4
makes that boundary concrete, section by section, so no future author has
to re-derive it.

---

## 3. The canonical template (21 sections)

Every entry follows this exact structure, in this order, with these
exact heading strings (unnumbered — the numbered style found in later
physics batches is retired going forward; see §1.2). Sections marked
**(required)** must exist in every entry. Sections marked **(if earned)**
exist only when the concept genuinely has content for them — an empty or
generic section is worse than an absent one, per `TEMPLATE.md`'s original
rule, preserved unchanged.

```markdown
# {KG name} — `{kg-id}`

## Identity (required)
Concept ID, curriculum location, prerequisites (with the load-bearing
PART of each, not just the ID), unlocks, difficulty / Bloom / mastery
threshold / est. hours (from the KG, restated for self-containment — the
KG is authoritative if they ever diverge).

## Learning Objective (required)
2–5 observable "the learner can..." statements — what the mastery gate
certifies. (Promoted out of Identity — every existing entry already
writes these, just nested one level too deep to be reused as their own
retrieval target.)

## Core Understanding (required — new)
One tight paragraph stating the concept's actual mechanism or truth, in
the clearest expert-accurate terms — the thing every other section below
must remain consistent with. This is NOT a beginner explanation (that
belongs in the Explanation library) and NOT a restatement of the KG
description (which is a one-line label, not a mechanism) — it is the
author's own precise, correct statement of what is actually true, written
once so every simplification below can be checked against it.

## Mental Models (required)
The four stages (beginner / intermediate / advanced / expert) as they
actually occur for THIS concept, each stated as the runnable simulation
the learner holds, the upgrade trigger, and the shelf-life warning to
deliver at installation. Note when the arriving (pre-instruction) model
is already wrong (as with `phys.mech.newtons-first-law`'s impetus model)
— the four stages are not always all tutor-installed.

## Why Students Fail (required)
One paragraph: the actual failure mechanism(s), named — not "it's hard,"
the specific cognitive reason.

## Misconceptions (required)
Per misconception: name → why it happens (birth type, per
`../misconceptions/01-birth-taxonomy.md`) → symptom/characteristic phrase
→ verbatim detection probe → recovery path → verification-of-death items.
If a Blueprint for this concept already documents misconceptions, reuse
them by reference (cite the Blueprint component) and add only the
birth-type classification and any genuinely new entries the Blueprint
doesn't have — never re-copy its probe/bridge/replacement text verbatim.

## Analogies (required)
Ranked, each WITH its breaking point: best analogy, alternatives, story
analogy, visual analogy, and ANTI-ANALOGIES (analogies that actively
install a misconception here, with what they break).

## Demonstrations (required)
Physical / home / digital / interactive / teacher-demo / learner-activity
— whichever exist for this concept, each with the prediction to elicit
FIRST.

## Discovery Questions (required — one of two forms)
Either the complete 6-step guided discovery design (need → playground →
invention → collision → formalization → compression), stated as the
actual askable question sequence, OR an explicit, argued statement of why
direct instruction wins here (convention? leaf concept? load profile? —
per `phys.mech.newtons-first-law`'s and `eng.phonics.letter-sound-
correspondence`'s worked examples of both cases) — never silence, never
a default.

## Teaching Sequence (required)
The concept-specific PEDAGOGICAL LOGIC for ordering — which model must be
secure before which misconception can safely be surfaced, which
demonstration must precede which explanation, why this concept's specific
teaching arc is shaped the way it is. This is reasoning ABOUT sequence,
one level of abstraction above a runtime script — it does NOT restate a
Blueprint's turn-by-turn session architecture (protocol tags, exact
scripted lines); if this concept has a Blueprint, cite its Session
Architecture component by reference instead of re-deriving the same
sequence.

## Tutor Actions (required)
Which actions from the dispatch library (teaching-actions/*) fit this
concept, in recommended order, with the concept-specific reason. Actions
that DON'T fit and why, when non-obvious.

## Voice Teaching Notes (required)
What to listen for, this concept's characteristic hesitations and
misreadings, pronunciation stakes if any, the load-bearing sentence to
slow down on. Describe the IDEAL tutor's perception — do not re-state
what the runtime actually captures today; that channel-reality gap is
owned centrally by `../foundations/03-voice-first-learning-model.md §7`,
cited, not repeated. If this concept's core evidence is non-audio (e.g.
pointing, tracing — see `eng.phonics.print-concepts.md`'s worked example),
say so explicitly rather than force-fitting a voice framing.

## Assessment Signals (required — signals, not item banks)
For this concept's key probes: what response PATTERN (correctness ×
latency × confidence, per the D1 grid) signals which mental model or
misconception; what a fast-wrong vs. slow-correct vs. fast-correct answer
each mean here specifically; the concrete mastery-certification trigger.
A genuinely load-bearing golden probe may be restated if it is itself the
diagnostic instrument (as fractions' "1/2 + 1/2 = ?" is), but full guided/
independent practice item banks and worked examples belong in the
Blueprint — check for an existing Blueprint before authoring a new item
bank here, and cite it instead if one exists.

## Tutor Recovery Strategy (required, concept-specific ONLY)
Which Recovery Engine utterances are likeliest here and the
concept-specific "smaller question" to shrink to. Reference
`../foundations/01-recovery-engine.md` for everything generic — never
restate the engine itself.

## Memory Hooks (required)
Concept type (fact / procedure / concept / tool) → which review form it
gets, plus any concept-specific deviation (e.g. tool skills needing
automaticity bursts, or misconceptions requiring an extended speeded-
re-probe tail). Interleaving partners: which sibling concepts to mix with
for discrimination.

## Transfer Connections (required)
Near / far / real-world / expert-transfer — stated as actual situations,
not categories.

## Cross-Subject Connections (required — split out from Transfer)
Specifically the connections reachable via the KG's own `cross_links`
field where present, plus any genuine cross-subject transfer the KG
doesn't yet encode (recorded, and flagged as Curriculum feedback if it
represents a missing KG edge). If a concept genuinely has none, say so —
"weak but real" is an honest answer; a fabricated cross-subject link is
not.

## Blueprint References (required — new)
If a Blueprint exists for this concept (`docs/curriculum/blueprints/
{kg-id}.md`), name it and list which of its Components this entry
deliberately reuses by reference rather than restates (misconceptions,
worked examples, mastery probes, session architecture — whichever
apply). If no Blueprint exists yet, say so explicitly — this is itself
useful signal for the Curriculum Production Pipeline's own backlog, not
a gap this program fills.

## Runtime Asset References (required — new)
Whether this concept has any seeded `AssetIdentity` records (per ADR 14
— `src/lib/teaching/assets/brainSeedAssets.ts` or the live DB), named by
their `canonicalSlug` pattern (`{conceptId}:{familyKind}:{language}:
{gradeBand}`) if so. If none exist, say so explicitly and do NOT create
any as part of authoring this entry — seeding is a separate, deliberate,
Wave-0-gated production step (see CLAUDE.md's Wave 0 record), never an
automatic consequence of writing a concept entry.

## Curriculum Feedback (if earned)
Anything teaching reveals about the KG node itself (missing prerequisite
edge, misleading name, difficulty mislabel) — recorded as feedback to the
Curriculum Production Pipeline, never fixed locally.

## Version History (required — new)
One line per revision: date, author/session identifier, what changed and
why. First line is always the initial authoring date. This is what
`QUALITY.md`'s "Version ✓" column checks against.
```

### 3.1 What was renamed vs. the old `TEMPLATE.md`

| Old (`TEMPLATE.md`) | New (this standard) | Why |
|---|---|---|
| Mental models | Mental Models | casing only |
| Why beginners fail here | Why Students Fail | matches the requested list; "here" was redundant |
| Misconception library | Misconceptions | drop "library" suffix repo-wide for consistency with the requested list |
| Explanation library | *(retired — see 3.3)* | |
| Analogy library | Analogies | |
| Demonstration library | Demonstrations | |
| Discovery lesson | Discovery Questions | |
| Teaching actions | Tutor Actions | |
| Voice teaching | Voice Teaching Notes | |
| Assessment | Assessment Signals | scope narrowed — see §3 body |
| Recovery notes | Tutor Recovery Strategy | |
| Memory & review | Memory Hooks | |
| Transfer map | Transfer Connections + Cross-Subject Connections | split in two |
| Curriculum feedback | Curriculum Feedback | casing only |

### 3.2 What was promoted to first-class sections

Learning Objective (out of Identity), Cross-Subject Connections (out of
Transfer map) — both were real content in every existing entry, just
nested where they weren't independently retrievable.

### 3.3 What was retired

**"Explanation library" as a named top-level section does not appear in
the requested 21-item list, and is dropped as a separate section.** Its
content is not lost: the requested list's "Core Understanding" section
(new) carries the single authoritative mechanism statement, and the
by-age/by-entry-state/by-frame explanation variants that "Explanation
library" used to hold now belong distributed across Mental Models
(each stage IS an explanation, pitched at that stage) and Analogies. This
is the one place this standard removes rather than renames content —
flagged explicitly here in case a future review disagrees and wants it
restored as its own section; the content itself (multiple registers of
explanation) remains a requirement, just no longer under its own heading.

### 3.4 New sections and why each earns its place

- **Core Understanding**: no existing entry states the concept's actual
  mechanism once, cleanly, separate from any teaching register — every
  explanation is already simplified for an audience. Without one
  authoritative statement, drift between the Beginner/Advanced/Expert
  models and the Misconception corrections becomes possible without
  anyone noticing. One paragraph fixes this cheaply.
- **Blueprint References / Runtime Asset References**: formalizes the
  informal "see Blueprint Component X" pattern already used ad hoc in
  `eng.phonics.print-concepts.md`, and is the direct, checkable
  implementation of rule 10 ("validate no duplication") for every future
  entry — a reviewer can now check these two sections alone to confirm
  no re-authoring happened.
- **Version History**: required by `QUALITY.md`'s tracking (§ below) and
  by ordinary maintenance — without it, a future editor cannot tell
  whether an entry reflects the current KG state or a stale one.

---

## 4. Ownership boundary (binding — the anti-duplication table)

| Content | Owner | Where it lives | This program's role |
|---|---|---|---|
| WHAT to teach, prerequisite graph | Curriculum Production Pipeline | `docs/{subject}/kg/graph.json` | Read-only anchor |
| Session mechanics, protocol-tagged scripts, worked examples, mastery probe item banks | Curriculum Production Pipeline | `docs/curriculum/blueprints/{id}.md` | Read, cite by reference, never restate |
| HOW an expert tutor reasons: mental models, misconception diagnosis, analogy selection, teaching-action dispatch, recovery, transfer | This program | `educational-brain/concepts/{subject}/{id}.md` | **Authors this, one concept per batch** |
| Generated explanation/probe content served at runtime | Runtime (LLM + admin review) or small seeded batches | `AssetIdentity` DB tables / `brainSeedAssets.ts` | Never authored here; only referenced if it exists |
| Live lesson dialogue, hints, per-turn practice | Runtime (Teaching Engine + LLM) | `src/lib/teaching-engine/`, `src/app/api/learn/chat/route.ts` | Never authored; not even referenced per-instance |
| Visualizations | Runtime (Visual Asset Model, ADR 12) | background-authored, cached | Never authored |
| Adaptive decision logic | Runtime, frozen production code | `src/lib/teaching-engine/index.ts` `decide()` | Never re-implemented; entries feed it better input |

---

## 5. Authoring checklist (run before committing any entry)

1. Every prerequisite line in Identity says what PART is load-bearing.
2. Core Understanding is written once, checked for consistency against
   every Mental Model stage and every Misconception's "replacement" text.
3. Every misconception has an askable probe and a characteristic phrase.
4. Every analogy has a breaking point; at least one anti-analogy exists
   or its absence is genuinely argued.
5. Discovery Questions chose a side (discovery design or direct
   instruction) and argued it.
6. Assessment Signals states diagnostic interpretation, not a restated
   item bank, unless no Blueprint exists for this concept at all.
7. Blueprint References and Runtime Asset References are both present
   and both state the true current condition (including "none exist").
8. Version History has at least one entry.
9. Nothing in the entry restates a universal engine (cite, don't copy).
10. Nothing in the entry could be pasted into a different concept's
    entry unchanged.
11. Read it aloud: every script survives being spoken.

---

## 6. Migration note (what happens to the existing 71 entries)

This standard is **not applied retroactively in this batch**. The 71
existing entries remain valid, high-quality content under the standard
they were written to (`TEMPLATE.md`'s 15 sections, in either heading
style found in §1.2) — none of them are broken, incomplete, or wrong.
Reconciling them to this standard (splitting Identity/Learning Objective,
adding Core Understanding, Blueprint/Runtime References, Version History;
normalizing heading style) is real, valuable, but separate future work —
tracked as its own line item, not silently deferred. See `ROADMAP.md`.

---

## `TEMPLATE.md` disposition

`TEMPLATE.md` is retained on disk (not deleted — several existing entries'
prose implicitly references "the template" as a concept, and deleting the
file a reader might reasonably look for is worse than leaving a pointer)
but is no longer the operative authoring contract. It now contains only a
one-line redirect to this file.
