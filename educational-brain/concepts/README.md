# Curriculum Integration Layer

This directory attaches Educational Brain knowledge to the **existing
canonical curriculum**. It is the binding between the two halves of teaching:

> **Curriculum = WHAT to teach.** Owned by the Curriculum Production Pipeline,
> lives in `docs/{subject}/kg/graph.json`, and is never duplicated, reordered,
> or edited here.
>
> **Educational Brain = HOW to teach.** Lives here, keyed to the curriculum's
> own concept IDs.

## The binding rule — no second hierarchy, ever

Every file in this directory is named by, and anchored to, a **canonical
Knowledge Graph concept ID** exactly as it appears in the subject's
`graph.json` (`math.arith.fractions`, `phys.mech.newtons-first-law`,
`eng.phonics.letter-sound-correspondence`). Consequences, all deliberate:

1. **Identity is inherited, not invented.** The Permanent Concept ID *is* the
   KG ID. Curriculum location, prerequisites (`requires`), dependents
   (`unlocks`), difficulty, Bloom level, and mastery threshold are read from
   the KG at the anchor of each entry — restated there for self-containment,
   but the KG is authoritative if they ever diverge (an entry whose anchor
   drifts from the KG is stale, and the KG wins).
2. **No entry exists without a KG node**, and no entry invents relationships
   the KG doesn't have. If teaching experience reveals a missing prerequisite
   edge, that is *feedback to the Curriculum Production Pipeline*, recorded in
   the entry's "curriculum feedback" section — never a local fix.
3. **Coverage is measurable.** Because entries are keyed 1:1 to KG IDs,
   coverage per subject is a simple count — see [COVERAGE.md](COVERAGE.md),
   which also fixes the priority order for expansion.

## Directory layout

```
concepts/
  README.md                      ← this file (the binding spec)
  EDUCATIONAL_BRAIN_STANDARD.md  ← the canonical concept-entry template (authoring contract, v1.0)
  TEMPLATE.md                    ← superseded; points to EDUCATIONAL_BRAIN_STANDARD.md
  COVERAGE.md                    ← per-subject manifest + expansion protocol + delivery history
  ROADMAP.md                     ← dashboard: totals, completion %, current/next batch, priority queue
  QUALITY.md                     ← per-entry completeness ledger
  mathematics/                   ← one file per math.* concept ID
  physics/                       ← one file per phys.* concept ID
  english/                       ← one file per eng.* concept ID
```

File naming: `{subject-dir}/{full-kg-id}.md` — e.g.
`mathematics/math.arith.fractions.md`. The redundancy (subject dir + prefixed
ID) is intentional: the file is findable from either direction and its ID is
never ambiguous out of context.

## The reuse-first law

The Educational Brain's universal engines already exist and are **referenced,
never copied**:

| Engine | Where it lives | What a concept entry adds |
|---|---|---|
| Recovery Engine | Delivery 1 (pending transcription → `foundations/`) | only concept-specific recovery notes: which utterance is *likeliest here* and the concept-specific smaller-question to shrink to |
| Assessment Design Library | `../assessment/` | the concept's actual items: golden probe, mapped distractors, gate set |
| Voice Model | Delivery 1 | what to *listen for on this concept*: its characteristic hesitations, misreadings, phrases |
| Mental Model stages | Delivery 2 §1 | this concept's four actual models |
| Teaching Action dispatch | Delivery 2 §6 | which actions fit *this* concept and why |
| Memory Engine | Delivery 2 §8 | this concept's review type (fact/procedure/concept/tool) and any deviation from the default schedule |
| Curiosity / Discovery / Transfer / Motivation engines | Delivery 2 §§2,3,7,9 | the concept-specific hook, discovery lesson (or the reason direct instruction wins), and transfer targets |

A concept entry that restates engine content is defective. A concept entry
whose concept-specific content could apply to any other concept is also
defective — everything in an entry must be *earned by this concept*.

## The human-tutor bar

Every entry answers one question, section by section:

> *If the world's best human tutor were teaching this exact concept to this
> exact student, what would they do?*

Entries are written to **drive teaching**, not to document it. Scripts are
speakable. Probes are askable verbatim. Detection signals are listenable-for.
If a line couldn't change what the tutor says or does next turn, it doesn't
belong in the entry.

## Success criterion for the whole layer

A learner starting from absolute zero must be able to reach expert level in a
subject using only: the existing curriculum (the WHAT and the order), this
layer (the HOW at every node), and the tutor engine (the delivery). Every
entry is written as if it will be the only teaching intelligence available at
its node — because eventually it will be.
