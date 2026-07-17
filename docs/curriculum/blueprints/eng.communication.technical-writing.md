# Teaching Blueprint: Technical Writing

## Component 0 — Concept Identity & Routing

```yaml
concept_id: eng.communication.technical-writing
name: Technical Writing
domain: communication
difficulty:
  label: advanced
  numeric: 5
bloom: create
prerequisites:
  - eng.communication.academic-writing-advanced
mastery_threshold: 0.75
estimated_hours: 3
cross_links:
  - eng.writing.expository-writing
session_cap: 5
cpa_entry_stage: concrete
status: active
```

**Concept:** Technical Writing — writing clear, precise, and audience-appropriate documentation of
processes, products, or systems, prioritizing usability and unambiguous instruction over stylistic
elaboration.

**Why this concept exists in the sequence:** Advanced Academic Writing (prerequisite) teaches
sophisticated scholarly prose. Technical Writing teaches a genuinely different register optimized for
a different goal: a reader following a technical document needs to accomplish a task correctly and
efficiently, not appreciate literary sophistication — this requires ruthless clarity, precise and
consistent terminology, and anticipating exactly where a reader might go wrong. This concept unlocks
`eng.communication.presentation-design` (presenting technical information visually builds on first
mastering its precise verbal formulation).

## Learning Objective

By the end of this concept, the student can (a) write step-by-step instructions that a reader with no
prior knowledge of the specific process can follow successfully without needing to ask clarifying
questions, (b) use precise, consistent terminology throughout a technical document (never switching
between synonyms for the same technical term), and (c) anticipate and address at least one likely
point of reader confusion or error before it occurs, rather than only describing the "happy path"
where nothing goes wrong.

## Component 1 — Misconception Register

### MC-A-TECHNICAL-WRITING-SHOULD-USE-VARIED-VOCABULARY-TO-AVOID-REPETITION-LIKE-OTHER-WRITING

**Trigger signal:** Student, applying a general writing principle of varying vocabulary to avoid
repetitive language, switches between synonyms for the same technical term across a document (e.g.,
calling the same component "the switch," then "the toggle," then "the control" in different steps),
believing this makes the writing more sophisticated, when it actually creates dangerous ambiguity
about whether these refer to the same or different things.

**Conflict evidence [P28]:** Show the student a set of instructions using three different terms for
the same physical component across different steps ("press the switch," later "flip the toggle," even
later "adjust the control") alongside a version using the SAME term consistently throughout ("press
the switch" every time). Ask: "If you were following these instructions and had never seen this
device before, would you know 'the toggle' and 'the control' refer to the same thing as 'the switch,'
or would you reasonably wonder if there are three different parts?"

**Bridge text [P30]:** "Varying your vocabulary in a personal essay makes it more interesting to
read — but doing the same thing in technical instructions is like a map that calls the same
intersection three different names on three different signs. A reader following the map has no way of
knowing these all refer to the same place; they'll reasonably think they've made a wrong turn.
Technical writing needs the OPPOSITE of vocabulary variety: rigid, boring, unwavering consistency for
every named part, tool, or step."

**Replacement text [P31]:** "In technical writing, once you name something (a component, a setting, a
step), use that EXACT SAME term every single time you refer to it again, throughout the entire
document. Resist the instinct to vary vocabulary — consistency, not variety, is the goal here."

**Discrimination pairs [P33]:**
1. "Press the switch. ... Flip the toggle. ... Adjust the control." (varied vocabulary for what
   should be the same term, creating dangerous ambiguity) vs. "Press the switch. ... Press the switch
   again. ... Release the switch." (rigidly consistent terminology, unambiguous).
2. A student praised for "sophisticated vocabulary variety" in a personal essay, then applying the
   same instinct to a technical manual (misapplied general writing principle) vs. a student
   recognizing that technical writing's goals (clarity, safety, unambiguous execution) require the
   opposite approach from literary variety (correctly calibrated register).

**s6_path:** If the student continues varying terminology after the bridge, have them read through
their own draft and highlight, in one color, every unique physical component or concept mentioned, and
in a second color, every DIFFERENT WORD used to refer to it — any component with more than one
highlighted term needs to be standardized to a single term throughout.

### MC-B-TECHNICAL-WRITING-ONLY-NEEDS-TO-DESCRIBE-WHAT-TO-DO-WHEN-EVERYTHING-GOES-RIGHT

**Trigger signal:** Student writes instructions that only describe the ideal, successful sequence of
steps (the "happy path"), without anticipating or addressing common points of confusion, likely
mistakes, or error conditions a real reader might encounter — leaving the reader stranded with no
guidance the moment something doesn't go exactly as described.

**Conflict evidence [P28]:** Show the student a set of assembly instructions that only describe the
successful sequence with no guidance for common errors (e.g., "insert part A into slot B") alongside a
version that also anticipates a likely point of confusion ("insert part A into slot B; if it doesn't
slide in easily, check that the arrow on part A is facing up — inserting it upside down is a common
mistake"). Ask: "If you accidentally tried to insert part A upside down, would the first version help
you at all? What about the second?"

**Bridge text [P30]:** "Writing instructions that only describe the happy path is like a hiking trail
guide that only describes the correct route with zero mention of the fork in the trail where most
hikers accidentally go the wrong way — the guide might be perfectly accurate for someone who never
makes that turn, but it fails exactly the readers who need help most. Good technical writing
anticipates the SPECIFIC points where readers are likely to go wrong and addresses them directly, not
just the ideal sequence."

**Replacement text [P31]:** "After drafting your instructions, ask: at which specific steps is a
reader likely to make a mistake, get confused, or encounter an unexpected result? Add a brief note
addressing at least the most likely point of confusion — don't just describe what happens when
everything goes perfectly."

**Discrimination pairs [P33]:**
1. "Insert part A into slot B." (happy-path only, no anticipation of the common upside-down mistake)
   vs. "Insert part A into slot B; if it doesn't slide in easily, check that the arrow is facing up."
   (anticipates and addresses a likely error point).
2. A student who writes clear, accurate instructions for the ideal sequence but never considers what
   could go wrong (happy-path-only writing) vs. a student who identifies at least one likely failure
   point and writes guidance for it directly into the instructions (anticipatory, robust technical
   writing).

**s6_path:** If the student continues writing happy-path-only instructions after the bridge, have
them literally attempt to follow their own instructions as if they were a first-time user with no
prior knowledge, trying to identify at least one place where they personally might get confused or
make an error, then add guidance for that specific point.

## Component 2 — Prerequisite Diagnostic Block

**PD-1 (checks `eng.communication.academic-writing-advanced`):** "Revise this padded paragraph to
remove filler while preserving genuine content." A student who cannot perform this basic revision-
for-concision task lacks a related precision skill this concept extends — route to
`eng.communication.academic-writing-advanced` review first.

**PD-2 (checks basic instruction-writing awareness, informal pre-check):** "Write two-step
instructions for tying a shoelace, assuming the reader has never tied one before." A student who
cannot produce any attempt at step-by-step instruction needs a brief primer before Component 3.

## Component 3 — Concrete Anchor [P06]

**The Three-Named-Intersection-Map and Hiking-Trail-Fork Anchor.** Combine two images: a map that
labels the same intersection with three different names on three different signs, leaving a
navigator uncertain whether they're in the right place — directly seeding the fix for MC-A
(consistency, not variety, in technical naming). Second, a hiking trail guide that only describes the
correct route with no mention of a common wrong-turn fork, leaving exactly the hikers who need help
most stranded — directly seeding the fix for MC-B (anticipate and address likely error points, not
just the ideal path).

## Component 4 — Conceptual Development Sequence

### TA-1 — Consistent Terminology (MC-A)

Using the three-named-intersection anchor, teach the principle of rigid terminological consistency in
technical writing. Student practice: given a draft using three different terms for one component,
identify the inconsistency and standardize to one term throughout.

### TA-2 — Step-by-Step Clarity for a Zero-Knowledge Reader

Teach writing instructions assuming absolutely no prior knowledge, breaking complex actions into
discrete, sequential steps. Student practice: given a multi-step process described in one dense
paragraph, break it into clear, numbered steps.

### TA-3 — Anticipating Reader Confusion and Error Points (MC-B)

Using the hiking-trail-fork anchor, teach students to identify likely points of confusion or error in
their own instructions and add guidance for them. Student practice: given a set of happy-path-only
instructions, identify at least one likely error point and write guidance addressing it.

### TA-4 — Full Application: Writing a Complete Technical Document

Give the student a process to document (e.g., a multi-step procedure) with no draft provided. They
must write consistent-terminology, step-by-step instructions (TA-1, TA-2) that also anticipate and
address at least one likely error point (TA-3) — the full synthesis task.

## Component 5 — Worked Examples

**WE-1 (Scaffolded):** Process: "Setting up a new email account's spam filter." Fully worked: a
consistent term ("the filter settings menu") used throughout every step; steps broken into clear,
numbered, zero-knowledge-assuming actions; one likely error point identified and addressed ("if the
menu option is grayed out, you may need to verify your email first — check for a verification link in
your inbox"). Annotation confirms both the terminological consistency (fixing MC-A) and the
anticipated-error guidance (fixing MC-B).

**WE-2 (Guided):** New process ("Assembling a simple bookshelf") with a rough draft containing
inconsistent terminology and no error anticipation. Student is prompted with guiding questions ("This
draft calls the same part 'the shelf pin,' 'the peg,' and 'the dowel' in different places — which term
should be used consistently throughout? What's one place a first-time assembler might get confused or
make a mistake, and what guidance could help there?") to revise into a clear, consistent, anticipatory
document.

**WE-3 (Independent):** A new process to document, unaided. Student writes complete step-by-step
instructions with consistent terminology and at least one anticipated error point addressed.

## Component 6 — Mastery Probe Set

**MP-1 [P36] — Identifying Terminological Inconsistency**
Given a technical draft using multiple terms for one component, identify the inconsistency and select
a single term to standardize on.

**MP-2 [P36] — Breaking a Process into Zero-Knowledge Steps**
Given a process described in one dense paragraph, break it into clear, numbered, sequential steps
suitable for a reader with no prior knowledge.

**MP-3 [P36] — Identifying a Likely Error Point**
Given a set of happy-path-only instructions, identify at least one likely point of reader confusion
or error.

**MP-4 [P36] — Writing Anticipatory Guidance**
Given an identified likely error point, write a brief, clear note addressing it within the
instructions.

**MP-5 [P36] — Full Technical Document**
Given a new process with no draft provided, write complete step-by-step instructions using consistent
terminology and addressing at least one likely error point.

## Component 7 — Session Architecture

```
[Entry] --> [PD-1: academic writing advanced check] --> [PD-2: instruction-writing check]
   |                                                              |
   | (gap found)                                                  | (pass)
   v                                                               v
[Route to eng.communication.academic-writing-advanced]  [Component 3: Named-Intersection /
                                                            Hiking-Trail-Fork Anchor]
                                                                    |
                                                                    v
                                                [TA-1] -> [TA-2] -> [TA-3] -> [TA-4]
                                                                    |
                                                                    v
                                          [WE-1 Scaffolded] -> [WE-2 Guided] -> [WE-3 Independent]
                                                                    |
                                                                    v
                                          [MP-1 through MP-5 mastery probe set]
                                                                    |
                                          (pass >= 0.75) -----+----- (fail)
                                                 |                      |
                                                 v                      v
                              [Unlock: presentation-design]  [S6 remediation: highlight-and-
                                                               standardize / walk-it-yourself
                                                               drills]
```

**Protocol routing paragraph:** On entry (S0), run PD-1 and PD-2; an academic-writing gap routes back
to that prerequisite, an instruction-writing gap gets a brief primer. During Component 4 (S1, active
instruction), MC-A typically surfaces during TA-1 (applying literary variety instincts) and MC-B
during TA-3 (writing only the happy path) — these are largely independent and often need separate,
explicit correction since MC-A is a register-transfer error (from other writing contexts) while MC-B
is a perspective-taking gap (failing to imagine the reader's actual experience). If either fires,
branch to the relevant s6_path drill before resuming. At the mastery probe stage (S9), route by
failure: MP-1 failure indicates residual MC-A; MP-2 failure alone indicates the step-breakdown
mechanics (TA-2) needs review, distinct from either misconception; MP-3/MP-4 failures indicate
residual MC-B; MP-5 failure with MP-1 through MP-4 passing indicates an integration gap — provide one
more guided full-document example before re-probing.

## Component 8 — Adaptive Flags

- If the student masters isolated consistency-checking and error-anticipation (MP-1, MP-3) but
  reverts to varied vocabulary or happy-path-only writing under the combined demand of MP-5, provide
  a structured checklist (name once, use everywhere; walk through as a first-timer; note one likely
  snag) as scaffolding before removing it.
- If the student has been strongly praised for vocabulary variety in prior literary/expository writing
  concepts, expect more initial resistance to MC-A — explicitly frame this as a register-specific
  skill (this genre requires the opposite instinct), not a contradiction of prior good writing advice.
- If the student's anticipated error points (MP-3, MP-4) are generic or vague ("something might go
  wrong here") rather than specific and plausible, push for concrete specificity — what EXACTLY is
  likely to confuse a reader at this exact step, based on the actual content of the process being
  documented.
- Students with hands-on experience with the specific process being documented (e.g., they've
  actually assembled the object or performed the task) should be encouraged to draw on their own
  memory of confusion points when they first learned it, since this is often the richest source of
  genuinely useful anticipatory guidance.

## Component 9 — Validation Checklist

| ID | Check | Result |
|----|-------|--------|
| V-1 | Concept Identity frontmatter complete and well-formed | PASS |
| V-2 | Exactly 2 misconceptions registered, each with full 5-part structure | PASS |
| V-3 | Every misconception uses a full descriptive ID, no bare numeric shorthand anywhere in document | PASS |
| V-4 | Prerequisite Diagnostic Block covers all listed prerequisites | PASS |
| V-5 | Concrete Anchor explicitly seeds fixes for both registered misconceptions | PASS |
| V-6 | Conceptual Development Sequence has TA-1 through TA-4 (3-hour concept) | PASS |
| V-7 | Each TA includes explicit student practice, not instruction-only | PASS |
| V-8 | Three Worked Examples present (Scaffolded, Guided, Independent) with increasing student responsibility | PASS |
| V-9 | Worked Examples use consistent standardize-step-anticipate structure | PASS |
| V-10 | Mastery Probe Set contains exactly 5 MP entries | PASS |
| V-11 | Each mastery probe uses the required bold-header paragraph format (`**MP-N [P36] — Title**`) | PASS |
| V-12 | Mastery probes collectively assess both misconceptions and full transfer | PASS |
| V-13 | Session Architecture diagram accurately reflects all routing paths described in prose | PASS |
| V-14 | Protocol routing paragraph addresses S0 (entry), S1 (active instruction), and S9 (evaluation) states | PASS |
| V-15 | Adaptive Flags section contains at least 4 distinct, actionable flags | PASS |
| V-16 | No references to Educational Brain, Teaching Engine, or runtime code — blueprint content only | PASS |
| V-17 | Cross-links and prerequisites match the Knowledge Graph node exactly | PASS |
| V-18 | Difficulty, bloom level, and estimated hours match the Knowledge Graph node exactly | PASS |
| V-19 | Mastery threshold matches the Knowledge Graph node exactly (0.75) | PASS |
| V-20 | Document compiles deterministically (identical hash on repeat `--check` run) | PASS |
