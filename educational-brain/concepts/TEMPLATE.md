# Concept Entry Template (authoring contract)

Every concept entry follows this structure. Sections marked (required) must
exist in every entry; sections marked (if earned) exist only when the concept
genuinely has content for them — an empty or generic section is worse than an
absent one. Everything must pass the human-tutor bar (see README): speakable,
askable, listenable-for.

```markdown
# {KG name} — `{kg-id}`

## Identity (required — anchored to the canonical KG, restated for self-containment)
- **Concept ID**: the canonical KG id (also the filename)
- **Curriculum location**: subject / domain / KG name
- **Prerequisites**: `requires` list, with one line each on WHAT of it is
  actually load-bearing here (the KG says which concepts; the entry says
  which PART of them this concept leans on)
- **Unlocks**: `unlocks` list — what this concept is a floor for (this is
  what raises the stakes of teaching it well)
- **Difficulty / Bloom / mastery threshold / est. hours**: from the KG
- **Learning objectives**: 2–5 observable "the learner can..." statements —
  these are what the mastery gate certifies

## Mental models (required)
The four stages (Delivery 2 §1) as they actually occur FOR THIS CONCEPT:
beginner / intermediate / advanced / expert models, each stated as the
runnable simulation the learner holds, plus: when to upgrade each, and the
shelf-life warning to deliver at installation (model versioning).

## Why beginners fail here (required)
One paragraph: the actual failure mechanism(s), named.

## Misconception library (required)
Per misconception: name → why it happens (birth type, Delivery 2 §4) →
symptom → fastest detection probe (askable verbatim) → recovery path →
verification-of-death items. Include characteristic PHRASES the learner
says when holding it (free detection channel).

## Explanation library (required)
Multiple independent explanations: by age/register, by entry state
(no background / partial / returning), by frame (visual / logical / story).
Each SPEAKABLE as written. Never only one.

## Analogy library (required)
Ranked, each WITH its breaking point. Include: best analogy, alternatives,
story analogy, visual analogy — and ANTI-ANALOGIES: analogies that actively
install misconceptions here, with what they break.

## Demonstration library (required)
Physical / home / digital / interactive / teacher-demo / learner-activity —
whichever exist for this concept, each with the prediction to elicit FIRST.

## Discovery lesson (required — one of two forms)
Either the complete 6-step guided discovery design (need → playground →
invention → collision → formalization → compression, Delivery 2 §2), OR an
explicit statement of why direct instruction wins here (convention?
leaf concept? load profile?) — never silence.

## Teaching actions (required)
Which actions from the dispatch library (Delivery 2 §6) fit this concept,
in recommended order, with the concept-specific reason. Actions that DON'T
fit and why, when non-obvious.

## Voice teaching (required)
How this concept sounds when taught and when failing: what to listen for,
this concept's characteristic hesitations and misreadings, pronunciation
stakes if any, the load-bearing sentence to slow down on.

## Assessment (required — items, not policy)
- Diagnostic: the golden probe if one exists; distractor-mapped items
- Guided practice items → independent practice items (the fading ladder)
- Mastery gate set (per ../assessment/05): production/new-surface/mixed/
  delayed components, stated concretely for this concept
- Transfer items: near / far / cross-subject / real-world
- Voice assessment notes; confidence & calibration notes if this concept
  has a characteristic miscalibration

## Recovery notes (required, concept-specific ONLY)
Which Recovery Engine utterances are likeliest here and the concept-specific
"smaller question" to shrink to. Reference Delivery 1 for everything else.

## Memory & review (required)
Concept type (fact / procedure / concept / tool) → which review form it gets
(Delivery 2 §8), plus any concept-specific deviation (e.g. tool skills
needing automaticity bursts). Interleaving partners: which sibling concepts
to mix with for discrimination.

## Transfer map (required)
Near / far / cross-subject (use the KG's cross_links where present) /
real-world / expert-transfer targets — stated as actual situations, not
categories.

## Curriculum feedback (if earned)
Anything teaching reveals about the KG node itself (missing prerequisite
edge, misleading name, difficulty mislabel) — recorded as feedback to the
Curriculum Production Pipeline, never fixed locally.
```

## Authoring checklist (run before committing an entry)

1. Every prerequisite line says what PART is load-bearing — not just the ID.
2. Every misconception has an askable probe and a characteristic phrase.
3. Every analogy has a breaking point; at least one anti-analogy exists or
   its absence is genuinely true.
4. The discovery section chose a side and argued it.
5. At least one demonstration is doable at home with no equipment.
6. The mastery gate set names concrete items, not policy references.
7. Nothing in the entry restates a universal engine.
8. Nothing in the entry could be pasted into a different concept's entry
   unchanged.
9. Read it aloud: every script survives being spoken.
