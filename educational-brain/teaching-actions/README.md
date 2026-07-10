# The Teaching Action Library — Delivery 2 §6 Transcription

The catalog the action selector (`../decision-engine/04`) dispatches into.
That file is the **selection procedure** — seven filters that narrow a
catalog to one choice — and it has said so explicitly, by name, since it
was written: "The action catalog itself lives in Delivery 2 §6 (27
actions in six families: SHOW / DO / TELL / TEST-THINKING / ORGANIZE /
SOCIAL)." Until this delivery, that catalog did not exist anywhere
retrievable. This directory is the catalog.

## Why this is the highest-remaining-ROI delivery

Three independent audits converged on the same finding before this
delivery existed:

- `../validation/03-ai-dependency-audit.md`: "Filter 2 (knowledge-type
  match) requires the 27-action catalog... Without the catalog, the
  filter has no rows to match against." Filters 2, 4, and 6 of the
  seven-filter funnel all reference this catalog directly.
- `../validation/06-highest-roi-recommendation.md`: names this catalog,
  alongside the Recovery Engine, as one of the two deliveries that
  "converts the action selector from a procedure with empty libraries to
  a fully operational dispatch engine."
- `../validation/07-architecture-audit.md` (the Architecture Audit)
  Gap 1, ranked **first** of eight AI-reasoning gaps: "Teaching action
  selection — 100% of Library mode turns... The AI receives 5 hardcoded
  strings... and invents the actual teaching action... This is the
  single most consequential gap."

With `foundations/` (Delivery 11) now transcribed, this is the next
highest-leverage authoring step in strict dependency order: the action
selector's Filter 1 (authored per-concept dispatch) and Filter 3
(teaching-state legality) already function without this catalog — but
Filters 2, 4, 5, and 6 cannot run at all without it, for any of the
~1,800 concepts across all subjects that don't yet have a per-concept
entry in `../concepts/` (currently 3 do).

## Reuse-first check

Before authoring, this delivery verified against every existing citation
of "Delivery 2 §6" in the tree (grep across `educational-brain/`) so that
no action, family assignment, or rule here contradicts what other files
already assume. Every action named below was already referenced by name
somewhere in the tree before this delivery existed:
**Demonstration** (`../decision-engine/01`), **Worked Example**
(`../decision-engine/01`, `../validation/05`), **Analogy**
(`../decision-engine/04` filter 2, `../concepts/TEMPLATE.md`),
**Drawing** (`../assessment/06`, cited "Delivery 2 §6, Drawing"),
**Matching** (`../assessment/06`, cited "Delivery 2 §6, Matching"),
**Error Analysis** (`../assessment/06`, `../assessment/07`,
`../first-lesson/03`), **Game** (`../assessment/08`'s
chocolate-covered-broccoli warning), **Concept Map** and **Thought
Experiment** (`../decision-engine/04` filter 4, register/age
constraints), **Role-Play** and **Puppet** forms (`../decision-engine/04`
filter 4, persona vetoes), **Prediction** (`../decision-engine/01`
DEMONSTRATION state, filter 7a "prediction-first"). This delivery
completes the set to 27 and gives every one of these a full entry; it
never redefines what was already load-bearing elsewhere.

This delivery does **not** author the 12-persona table (Delivery 2 §9 —
`motivation/`, still planned) or the Cognitive Load Engine's intrinsic/
extraneous/germane theory (Delivery 2 §5 — `cognitive-load/`, still
planned). Persona names are used generically here exactly as the rest of
the tree already uses them (fearful, anxious, competitive, gifted,
burned-out) without inventing the full taxonomy; load costs given per
action are a simple three-tier setup-cost tag, not a restatement of load
theory — both remain that other library's job when it is authored.

## The six families and the master dispatch table

Each action below is tagged with:
- **Family**: SHOW / TELL / DO / TEST-THINKING / ORGANIZE / SOCIAL
- **Fits** (Filter 2 — knowledge-type match, from `../decision-engine/04`'s
  existing six rows: concept / procedure / causal system / fact-convention
  / live misconception / physical procedure)
- **Setup cost** (Filter 6 — load fit): LOW / MEDIUM / HIGH
- **Persona notes** (Filter 4), only where a veto or preference already
  exists in the tree or is genuinely load-bearing

| # | Action | Family | Fits (knowledge type) | Setup cost |
|---|---|---|---|---|
| 1 | Demonstration | SHOW | procedure, causal system, physical procedure | LOW |
| 2 | Worked Example | SHOW | procedure | LOW |
| 3 | Contrasting Cases | SHOW | concept | MEDIUM |
| 4 | Simulation-Observed | SHOW | causal system | MEDIUM |
| 5 | Model/Object Inspection | SHOW | concept, physical procedure | LOW |
| 6 | Analogy | TELL | concept | LOW |
| 7 | Story | TELL | fact/convention | LOW |
| 8 | Direct Telling | TELL | fact/convention | LOW |
| 9 | Real-World Example Narrative | TELL | concept, fact/convention | LOW |
| 10 | Completion Problem | DO | procedure | MEDIUM |
| 11 | Faded Practice | DO | procedure | MEDIUM |
| 12 | Drawing | DO | concept, causal system | MEDIUM |
| 13 | Enactment | DO | physical procedure | HIGH |
| 14 | Simulation-Manipulated | DO | causal system | HIGH |
| 15 | Prediction | TEST-THINKING | causal system, concept | LOW |
| 16 | Thought Experiment | TEST-THINKING | causal system | MEDIUM |
| 17 | Error Analysis | TEST-THINKING | live misconception, procedure | MEDIUM |
| 18 | Self-Explanation Prompt | TEST-THINKING | concept, procedure | LOW |
| 19 | Generation | TEST-THINKING | concept | MEDIUM |
| 20 | Classification/Sorting | ORGANIZE | concept | MEDIUM |
| 21 | Concept Map | ORGANIZE | concept | HIGH |
| 22 | Matching/Translation | ORGANIZE | concept, procedure | MEDIUM |
| 23 | Retrieval-Schedule Prompt | ORGANIZE | fact/convention, procedure | LOW |
| 24 | Game | SOCIAL | procedure, fact/convention | HIGH |
| 25 | Teach-Back | SOCIAL | concept, procedure | MEDIUM |
| 26 | Role-Play-as-Performance | SOCIAL | concept, physical procedure | HIGH |
| 27 | Collaborative/Peer Framing | SOCIAL | procedure, concept | MEDIUM |

## Directory contents

```
teaching-actions/
  README.md                       ← this file (audit map + master table)
  01-show-family.md                ← actions 1-5
  02-tell-family.md                ← actions 6-9
  03-do-family.md                  ← actions 10-14
  04-test-thinking-family.md       ← actions 15-19
  05-organize-family.md            ← actions 20-23
  06-social-family.md              ← actions 24-27
```

## What this delivery does NOT do

No runtime code. No new hierarchy — the six families and Filter 2's
knowledge-type rows are `../decision-engine/04`'s existing structure,
reused exactly, never re-invented. No per-concept dispatch (that is
`../concepts/`'s job, per its own reuse-first law: "which actions fit
*this* concept and why" is a concept entry's content, not this library's
— this library only defines what each action IS and its general fit).
