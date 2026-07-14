# Teaching Asset Philosophy
## How the Educational Brain Encodes Teaching, Not Content

**Status:** Authoritative — supersedes all prior authoring guidance  
**Date:** 2026-07-11  
**Branch:** claude/math-linalg-curriculum-34wonr  
**Applies to:** All subject teaching assets across all 6 KGs

---

## 0. The Fundamental Reframe

This project is not building an AI tutor that explains things well.

It is building the world's largest Educational Brain — a structured knowledge base of **how to teach every important concept to every kind of learner**. The AI is a decision engine that selects the best teaching action from the Brain. Over time, the Brain grows and the AI reasons less.

The long-term test: if the AI were removed from a teaching interaction entirely, could the Brain's assets — looked up by concept ID — still produce effective teaching? Not a transcript of what someone said, but a **library of actions** that a lightweight engine could execute?

The answer today is no. The current assets encode content. They describe what a function is, what a misconception looks like, what a visual might show. They are high-quality encyclopedia entries. They are not teaching action libraries.

**This document defines what a teaching action library looks like at the asset field level.**

---

## 1. The Standard: Teaching Effectiveness Over Content Quality

Every asset field must answer the question:

> "What does the teacher DO with this — not what does the teacher KNOW from this?"

| If the field reads like... | It is CONTENT. Rewrite it. |
|---|---|
| "A function assigns to each input exactly one output." | WHAT a function is |
| "Students often confuse functions with relations." | WHAT the error is |
| "Show a mapping diagram with arrows." | WHAT to draw |
| "This is used in physics and economics." | WHAT it applies to |

| If the field reads like... | It is TEACHING. Keep it. |
|---|---|
| "Before introducing the formal definition, ask the student to predict the output of a vending machine given a specific button press. If they hesitate, the concept of deterministic dependency is not yet active — use the vending machine concretely before any set notation." | HOW to build the entry point |
| "When a student says 'but the circle passes the vertical line test if I tilt the axes,' this is the coordinate-independence misconception. Counter it immediately by asking them to rotate the page and re-apply the test — the function status of the relation must not change with perspective." | HOW to break the misconception |
| "Deploy the arrow diagram ONLY after the student has passed the vending-machine check. If shown before, the abstraction triggers premature symbol-dependency and the student memorises 'arrows' instead of dependency." | HOW to time the visual |
| "If the student classifies a sideways parabola as a function, they are passing the vertical line test procedurally but have not internalised single-valuedness. Do not correct the procedure — ask: 'What is y when x = 0?' and wait for them to discover two answers themselves." | HOW to respond to a specific wrong answer |

---

## 2. The AI Removal Test

For every asset produced, apply this test:

**"If the AI model were replaced by a rule engine that can only look up this asset and select from its encoded actions — could a student still receive effective teaching?"**

A passing asset provides:
- Specific entry-point questions to ask before teaching begins
- Branching responses based on what the student answers
- Precisely timed visual/concrete/abstract staging
- Named teaching moves for each named misconception
- Response protocols for each possible assessment outcome
- Real-world contexts with explicit introduction timing

A failing asset requires the AI to:
- Improvise a narrative around the content
- Guess when to introduce a visual
- Decide how to respond to a wrong answer
- Choose which application to use based on context

**If the AI must improvise, the asset has failed its purpose.**

---

## 3. Field-by-Field Specification

### 3.1 `learning_objective`

**Current use (wrong):** States what students will be able to do after the lesson — a curriculum coverage statement.

**Required use:** States the **minimal observable behaviour** that distinguishes a student who understands the concept from one who is merely pattern-matching.

The learning objective is a diagnostic instrument. It must be written so that a teacher with no additional context can ask one question and know whether the objective is met or not.

**Wrong:** "Students will be able to determine whether a correspondence is a function."  
**Right:** "A student who achieves this objective can correctly classify a non-formulaic correspondence (a scatter table, a set of ordered pairs with repeating x-values) as a function or non-function, and state the word 'single-valuedness' (not 'vertical line test') as the reason — because the VLT is a procedural shortcut that does not generalise beyond Cartesian graphs."

**Writing rule:** Write the boundary between understanding and mimicry, not the task itself.

---

### 3.2 `concept_summary`

**Current use (wrong):** A well-written explanation of the concept — what a textbook introduction chapter would say.

**Required use:** A **teaching entry point specification** — what cognitive state the student must be in before the concept lands, what prior knowledge must be activated, and what the teacher must DO in the first 90 seconds to prepare the student's mind for the formal definition.

This field is a briefing for the Teaching Engine's opening move, not a content description.

**Structure required:**
1. **Prior activation target:** What belief/intuition must already be present in the student's mind for this concept to connect. (Not what prerequisite they must have passed — what they must currently believe or feel curious about.)
2. **Bridge construction move:** The specific concrete question, scenario, or challenge the teacher poses BEFORE any formal content — to activate that prior knowledge.
3. **Readiness signal:** What the student says or does that tells the teacher "now they are ready for the formal definition."
4. **Formal introduction timing:** What triggers the transition from concrete bridge to formal definition. This transition should never be teacher-initiated; it should be demand-driven (the student's question or confusion should create the need for formalism).

**Wrong:**
> "A function is a rule that assigns to every element of a domain exactly one element of the codomain. The concept generalises the intuitive idea that many quantities depend on others..."

**Right:**
> "Prior activation target: The student must already believe that some physical quantities completely determine other physical quantities — that knowing the input is enough to know the output, always, with no ambiguity. If this belief is not present, introduce with the vending machine scenario (Step 1 below) before any set language.
>
> Bridge construction move: Ask the student — 'If I press button B3 on this vending machine, can I get two different items?' When they say no, ask 'Why not?' Their answer will fall into one of two categories: (a) 'Because the machine is set up that way' — the student is thinking about mechanism, not structure; ask what would happen if someone filled it randomly. (b) 'Because each button has one item' — the student is already articulating single-valuedness without knowing the term; this is the readiness signal.
>
> Readiness signal: Student spontaneously expresses that one input cannot produce two different outputs. Do not proceed to formal definition until this signal appears.
>
> Formal introduction timing: After the readiness signal, say 'What you just described has a precise mathematical name' — and only then introduce domain, codomain, and f: A→B. The formalism is earned, not given."

---

### 3.3 `key_ideas`

**Current use (wrong):** A list of facts the student should know about the concept — the bullet-point summary of the textbook chapter.

**Required use:** A **teaching sequence specification** — the exact order in which ideas must be introduced, with a rationale for each ordering decision, and a gate condition between consecutive ideas (what the student must demonstrate before the next idea is introduced).

This is not a list. It is a directed graph of teaching moves.

**Wrong:**
```
- A function assigns exactly one output to each input
- Functions can be defined by tables, graphs, or formulas
- Domain restricts which inputs are valid
- Every function is a relation, but not every relation is a function
```

**Right:**
```
Teaching Sequence — ordered, gated:

STEP 1 (Concrete): Deterministic dependency in real scenarios
  Introduce: Before any notation — vending machines, tax calculators, 
  thermometers. "Given the input, the output is guaranteed."
  Gate: Student can give a personal example of deterministic dependency
  without prompting. Do NOT advance to Step 2 until this gate is passed.

STEP 2 (Pictorial): Arrow diagrams — single-valuedness made visible
  Introduce: Arrow diagram showing valid mapping (one arrow per input).
  Immediately contrast with invalid diagram (one input, two arrows).
  Gate: Student can look at an unfamiliar arrow diagram and say "function" 
  or "not a function" with correct reasoning (not "too many arrows" — that
  is rule-following; required: "this input has two outputs").
  Warning: Do NOT introduce the vertical line test at this stage. It is 
  a shortcut that bypasses understanding. Students who learn VLT before 
  single-valuedness cannot classify non-graph representations correctly.

STEP 3 (Abstract): Formal definition — f: A→B notation
  Introduce: Only after Step 2 gate is passed. The notation is a 
  compressed statement of what the student has already discovered.
  "Mathematicians wrote it this way because..." 
  Gate: Student can write f: A→B for a new scenario they encounter.

STEP 4 (Extension): Domain and codomain as first-class objects
  Introduce: "What if I asked for f(-3) but the machine only accepts 
  positive inputs?" Domain is not a technicality — it is the contract.
  Gate: Student can explain WHY the domain matters in a context where
  ignoring it gives a wrong-looking answer.

STEP 5 (Generalisation): Relations vs. functions
  Introduce: Last, not first. "Is a circle a function?" is a wrong 
  first question — it teaches the VLT without the concept. Right 
  question: "Does the equation x² + y² = 1 give one y for each x?"
  Gate: Student correctly handles the sideways parabola case.

Ordering rationale: Concrete before pictorial before abstract (CPA) is 
non-negotiable for this concept. Students who see the notation first 
adopt symbol-manipulation without dependency thinking and cannot recover.
```

---

### 3.4 `common_misconceptions`

**Current use (wrong):** Names the misconception and states the correct fact — a list of errors with corrections.

**Required use:** For each misconception: (1) the **exact observable symptom** that reveals the misconception is active, (2) the **teaching move** that dissolves it, (3) what the student should say AFTER the move (the resolution signal), and (4) misconceptions that look alike but require different moves (differentiators).

Corrections are content. Teaching moves are actions.

**Wrong:**
```json
{
  "misconception": "A function must be given by an algebraic formula.",
  "correction": "Functions can be defined by tables, graphs, or verbal rules."
}
```

**Right:**
```json
{
  "id": "formula-dependency",
  "symptom": "Student refuses to classify a table of values or a verbal rule as a function; says 'that's not really a function because there's no equation.' OR student asks 'what is the formula?' when given a function by table.",
  "root_cause": "School exposure to functions has been exclusively through y = f(x) notation. The student has built a schema of 'function = formula' rather than 'function = deterministic dependency.'",
  "teaching_move": "Do NOT show more examples of non-formula functions — this reinforces the pattern-checking without changing the schema. Instead: return to the vending machine. Ask 'Is the vending machine a function?' They say yes. Ask 'What is the formula for the vending machine?' They cannot produce one. 'So it has no formula — is it still a function?' This creates the necessary cognitive dissonance. Only after they resolve it ('I guess you don't need a formula') show the table example again.",
  "resolution_signal": "Student looks at a new non-formulaic correspondence and classifies it BEFORE being asked whether there is a formula.",
  "differentiator": "Distinguish from the 'smooth-curve misconception' below — a student with formula-dependency asks for the equation; a student with smooth-curve misconception accepts the equation but rejects piecewise or discontinuous versions. Different roots, different moves.",
  "do_not": "Do not say 'a function doesn't need a formula' — this is a content correction that leaves the schema intact. The schema must be replaced, not patched."
}
```

---

### 3.5 `visual_teaching_suggestions`

**Current use (wrong):** Describes what visual to show — a list of possible diagrams.

**Required use:** For each visual: (1) the **cognitive stage** it targets (concrete / pictorial / abstract — from CPA), (2) the **prerequisite cognitive state** the student must be in for this visual to be effective, (3) the **exact question** to ask while showing the visual, (4) the **do-not-show-before** condition (what makes the visual harmful if shown too early), and (5) the **response to student confusion** during the visual.

Visuals are teaching interventions, not illustrations.

**Wrong:**
> "An arrow diagram with a domain circle and a codomain circle, showing each domain element with exactly one outgoing arrow, contrasted with an invalid diagram."

**Right:**
```
Visual: Arrow Diagram — Valid vs. Invalid Function
CPA stage: Pictorial (Stage 2)
Prerequisite state: Student has already expressed the deterministic 
  dependency idea in natural language (Step 1 gate passed). If the 
  student has not passed Step 1 gate, this visual will be interpreted 
  as "arrows must go to the right" — a visual pattern, not a concept.

Show sequence:
  1. Show the valid arrow diagram (one arrow per input) FIRST, with 
     no label or title. Ask: "What would you say is true about every 
     input in this diagram?" Listen for 'one arrow' (bad) vs. 
     'goes to exactly one output' (good).
  2. Show the invalid diagram (one input, two arrows). Ask: "Does 
     this one work? Could this be a function?" Do NOT answer. Wait.
  3. The student must articulate why it fails. If they say "too many 
     arrows" — ask "What's wrong with two arrows?" until they reach 
     "the input doesn't know which output to go to."

Do NOT show before: Step 1 gate (verbal dependency expression) is passed.
Do NOT show alongside the VLT — introducing both simultaneously trains 
  visual pattern-matching, not conceptual understanding.

Student confusion response: If the student cannot distinguish the two 
  diagrams, return to the vending machine scenario. Ask them to draw 
  the vending machine as an arrow diagram themselves. Their drawing 
  should produce the valid version; then ask them to draw a "broken 
  machine" where pressing B3 sometimes gives chips and sometimes gives 
  pretzels. This self-construction creates the valid/invalid distinction 
  from the inside rather than imposing it from the outside.
```

---

### 3.6 `worked_example_blueprint`

**Current use (wrong):** A problem with steps showing how to solve it, with "Why:" annotations explaining the mathematical reason for each step.

**Required use:** A problem with steps showing how to **teach** it — what the teacher says at each step, what **student errors are expected at each step**, and what the teacher does in response to each error. The "Why:" annotation must explain the PEDAGOGICAL reason the step is sequenced here, not the mathematical reason.

The worked example is a teaching script, not a solution walkthrough.

**Wrong step annotation:**
> "Step 3: Check that for every valid input x, the formula produces exactly one output y. Why: single-valuedness is the one property that must hold for this to be a function."

The "Why" explains mathematics. It should explain teaching.

**Right step annotation:**
> "Step 3: Before writing anything, ask the student: 'Can this formula give two different outputs for the same input?' Let them answer. Why this step exists here: Students who can answer this question correctly before evaluating the formula have activated the single-valuedness criterion as a prior check rather than a post-hoc verification. This prevents the most common error on assessment: students who correctly solve f(3) but cannot say whether f is a function because they evaluate first and reason second."

**Expected error at this step:** "Student substitutes x = 0 and checks whether the answer makes sense, instead of asking whether ONE answer always comes out. Redirect: 'I didn't ask you to evaluate it — I asked whether two different y-values could come from the same x.'"

---

### 3.7 `assessment_blueprint`

**Current use (wrong):** Describes assessment formats, Bloom's alignment, and mastery signals — a rubric specification.

**Required use:** For each possible student response category, an explicit **teaching action**. Assessment is not measurement — it is the highest-leverage teaching moment, because the student is maximally attentive to the gap between what they thought and what is correct.

**Wrong:**
```json
{
  "formats": ["classification task", "short-answer justification"],
  "bloom_alignment": "Understand",
  "mastery_signal": "Correctly classifies non-formulaic correspondences..."
}
```

**Right:**
```json
{
  "question": "The following table shows the number of daylight hours in a city on each day of the year. Is this relationship a function? Justify your answer.",
  "diagnostic_intent": "Tests whether the student applies single-valuedness to a non-formulaic, real-world context. A student who has memorised 'each x has one y' will answer correctly but cannot explain why. A student who understands dependency will say: 'Because for any given day, there is exactly one number of daylight hours — the sun doesn't give you two different answers for the same day.'",
  "response_protocols": [
    {
      "response_category": "Correct answer with conceptual justification",
      "signal": "Student mentions deterministic dependency or single-valuedness without the VLT",
      "teaching_action": "Advance. Offer a harder item: a relation that is a function on a restricted domain but not on the full domain. Do not spend more time on this concept."
    },
    {
      "response_category": "Correct answer with VLT justification",
      "signal": "Student says 'it passes the vertical line test' or 'each x has one y' without connecting to dependency",
      "teaching_action": "Do NOT advance. The procedure is correct but the understanding is not. Ask: 'How would you apply the vertical line test to this table?' — the student will either construct a graph (revealing dependence on graphing) or be stuck. Either response creates an opening. Target: replace VLT schema with dependency schema before moving on."
    },
    {
      "response_category": "Incorrect answer — says it is NOT a function",
      "signal": "Student may say 'some months have the same number of hours' (confusing injective with functional), or 'it doesn't have a formula'",
      "teaching_action": "Identify which misconception is active: if 'same hours' — deploy the injectivity differentiator (outputs can repeat; inputs cannot have multiple outputs). If 'no formula' — deploy the formula-dependency teaching move from misconceptions. Do not re-explain the definition — the definition was the wrong intervention the first time too."
    },
    {
      "response_category": "No attempt",
      "signal": "Student cannot begin",
      "teaching_action": "Return to the vending machine. The concept has not landed. Do not attempt the table item again in this session. Schedule spaced review at 48 hours using the concrete vending machine framing, not the table."
    }
  ]
}
```

---

### 3.8 `real_world_applications`

**Current use (wrong):** A list of domains where functions appear — a motivation section.

**Required use:** For each application: (1) **when** to introduce it in the teaching sequence (before the concept to create curiosity, during to anchor abstract steps, after to consolidate), (2) **which student profile** benefits most from this application (a student who is interested in X will engage more with application Y), and (3) **the specific teaching action** the application enables — not just "this connects to the real world" but "use this application to resolve the domain-restriction question, because the real-world context makes the domain restriction feel necessary rather than arbitrary."

**Wrong:**
> "Physics: the position of a falling object as a function of time..."

**Right:**
```
Application: Physics — position of a falling ball as a function of time
Introduce: DURING Step 4 (domain and codomain), not before or after.
Timing rationale: The domain restriction (t ≥ 0) feels arbitrary in 
  algebra but necessary in physics — time does not go backwards. 
  Introducing this application specifically to resolve domain confusion 
  makes the restriction feel demanded by reality rather than imposed 
  by convention.
Student profile: Effective for students with science or sports interest. 
  Less effective for students focused on social sciences — use economics 
  cost-function application for those students instead.
Teaching action: After the student understands that t < 0 makes no 
  physical sense, ask: 'So what happens to our domain when we move from 
  the pure math to the physics?' This transition demonstrates that domain 
  is not a mathematical rule but a contract between the function and its 
  context. Students who see this transition stop viewing domain restrictions 
  as arbitrary.
```

---

### 3.9 `prerequisite_review_triggers`

**Current use (wrong):** Lists prerequisites to review if the student is weak — a dependency list.

**Required use:** For each prerequisite gap, a **diagnostic question** that detects the gap, a **severity classification** (blocking vs. recoverable-during-session), and a **minimum remediation action** that can be applied in-session without a full prerequisite restart.

**Wrong:**
> "If a student cannot describe a set, they are missing math.found.set-theory and should review it first."

**Right:**
```json
{
  "prerequisite": "math.found.set-theory",
  "diagnostic_question": "Ask: 'If I told you A = {1, 2, 3}, what is the number 4's relationship to A?' A student who can say '4 is not in A' or '4 is not an element of A' has sufficient set language. A student who says '4 comes after 3' or 'it's the next number' has a sequence model of sets, not a membership model.",
  "severity": "blocking — the formal definition of function uses set notation directly; a student with a sequence model will interpret 'domain' as 'the numbers in order' rather than 'the set of valid inputs'",
  "in_session_minimum": "Do not attempt to teach set theory from scratch. Instead, use only concrete set language throughout the function session: 'the collection of inputs' instead of 'the domain,' 'belongs to' instead of ∈. This is a temporary scaffold that allows progress without fixing the prerequisite gap. Flag for full prerequisite review in the next session.",
  "do_not": "Do not skip the function concept because of this gap. The concrete session can proceed; only the formal f: A→B notation should be deferred."
}
```

---

## 4. Before / After: `math.func.function-concept`

The current `concept_summary` (before):
> "Long before anyone wrote a formula, people noticed that many quantities depend on other quantities in a completely predictable way..."

This is well-written content. The AI must elaborate on it during teaching.

The new `concept_summary` (after, showing only the opening move):
> "Prior activation target: The student must believe that some input-output relationships are completely predictable before any notation is introduced. If this belief is not present, the formal definition lands as a rule to memorise, not a truth they already knew.
>
> Bridge construction move: 'I want you to think about a vending machine. If I press B3, what do I get?' [Student answers.] 'Could pressing B3 give me something different tomorrow?' [Student says no.] 'Why not?' [Student reasons.] This is the first teaching action. Do not proceed past it until the student has articulated — in their own words — why the output is guaranteed.
>
> Readiness signal: Student says some version of 'because B3 is set to give one thing.' If they say 'because that's how vending machines work,' ask: 'What if someone set it up randomly?' — continue until the guarantee is explicitly stated, not just assumed.
>
> Formal introduction timing: Transition to set notation ONLY after the readiness signal. Say: 'Mathematicians noticed this same pattern everywhere and gave it a precise name: a function.' The formalism names what the student already discovered. It does not introduce new information."

The AI looking up this asset does not need to decide how to introduce the concept. The asset decides for it. That is the target.

---

## 5. Authoring Protocol

When writing any teaching asset under this philosophy:

**Step 1: Write the AI Removal Test target first**  
Before writing any field: what would a rule engine DO if it could only read this asset? Write that target in one sentence. Every field should serve that target.

**Step 2: Write the `concept_summary` as an opening move script**  
Not "what is this concept" but "what does the teacher do in the first 90 seconds, and what does the student need to say before teaching continues."

**Step 3: Write `key_ideas` as a gated sequence**  
Each idea has: (a) when it is introduced, (b) the gate condition between ideas, (c) why this ordering (CPA rationale).

**Step 4: Write `common_misconceptions` as named teaching moves**  
Each misconception has: (a) the symptom that reveals it, (b) the specific move that dissolves it (not a correction — a MOVE), (c) the resolution signal, (d) what makes this misconception look like another one.

**Step 5: Write `visual_teaching_suggestions` as staged interventions**  
Each visual has: (a) CPA stage, (b) prerequisite cognitive state, (c) what to ask while showing it, (d) the do-not-show-before condition, (e) confusion response.

**Step 6: Write the `worked_example_blueprint` as a teaching script**  
Each step's "Why:" explains the pedagogical reason for the sequencing, not the mathematical reason. Include expected student errors at each step and the response to each error.

**Step 7: Write the `assessment_blueprint` as a response protocol**  
Each response category has a specific teaching action. No response category should say "mark incorrect and move on."

**Step 8: Write `real_world_applications` with timing and profile targeting**  
Each application specifies when to introduce it and which student profile it serves, plus the specific teaching action it enables.

**Step 9: Write `prerequisite_review_triggers` as diagnostic decision trees**  
Each trigger has a diagnostic question, a severity rating, and a minimum in-session remediation action.

---

## 6. Quality Checklist

An asset passes this checklist if every question can be answered YES:

**Opening move:**
- [ ] Does `concept_summary` specify what the teacher DOES, not what the concept IS?
- [ ] Is there a named readiness signal before any formal content is introduced?
- [ ] Is the formal definition introduced AFTER the student has demanded it (not before)?

**Sequence:**
- [ ] Does `key_ideas` specify an ordering with gate conditions between steps?
- [ ] Is the CPA sequence (Concrete → Pictorial → Abstract) explicitly enforced?
- [ ] Are there warnings about what happens when the sequence is violated?

**Misconceptions:**
- [ ] Does each misconception specify a named teaching MOVE (not a correction)?
- [ ] Is there a resolution signal for each misconception (what the student must say after the move)?
- [ ] Are look-alike misconceptions distinguished from each other?
- [ ] Is there at least one "do not do" for each misconception?

**Worked example:**
- [ ] Does each step annotation explain the pedagogical reason (not the mathematical reason)?
- [ ] Is there at least one expected student error per step, with a teacher response?
- [ ] Could a rule engine execute this example as a teaching session (not just a solution)?

**Assessment:**
- [ ] Is there a specific teaching action for every response category (including no-attempt)?
- [ ] Does the "correct answer with wrong reasoning" category have its own response (not "advance")?
- [ ] Is there a spaced-review schedule for students who give no-attempt responses?

**Visuals:**
- [ ] Does each visual have a do-not-show-before condition?
- [ ] Is the VLT absent from all pre-graphical teaching stages?
- [ ] Is each visual targeted to exactly one CPA stage?

**Applications:**
- [ ] Does each application specify WHEN to introduce it (before/during/after)?
- [ ] Does each application specify which student profile it serves?
- [ ] Does each application enable a specific teaching action?

**Prerequisite triggers:**
- [ ] Does each trigger have a diagnostic question (not just a dependency name)?
- [ ] Is there an in-session remediation option for each gap (not just "review prerequisite")?
- [ ] Are blocking gaps distinguished from recoverable gaps?

**AI Removal Test:**
- [ ] If the AI were replaced by a rule engine reading this asset, would the student still receive effective teaching?

If any question is NO, the asset does not meet the philosophy. Rewrite the failing field.

---

## 7. Schema Evolution Note

The current 10-field asset schema (`concept_id`, `concept_summary`, `key_ideas`, `common_misconceptions`, `visual_teaching_suggestions`, `worked_example_blueprint`, `assessment_blueprint`, `real_world_applications`, `prerequisite_review_triggers`, `provenance`) can accommodate this philosophy WITHOUT schema changes — every field's content changes, not the fields themselves.

However, the full realisation of this philosophy will eventually require additional structured sub-fields:
- `misconception.teaching_move` (named, typed move — not freetext)
- `misconception.resolution_signal` (observable student behaviour)
- `assessment_blueprint.response_protocols[]` (array of response/action pairs)
- `visual_teaching_suggestion.cpa_stage` (enum: concrete | pictorial | abstract)
- `visual_teaching_suggestion.prerequisite_state` (gate condition)
- `real_world_application.introduction_timing` (enum: before | during | after)

These are future schema proposals. They require runtime changes and formal approval per `docs/architecture/WAVE_0_APPROVAL_CHECKLIST.md`. Until approved, encode the same information as structured text within the existing fields using the naming conventions shown in this document.

---

*This document governs all curriculum authoring on this project. When in doubt: does the field tell the teacher what to DO, or what to KNOW? If the latter, rewrite it.*
