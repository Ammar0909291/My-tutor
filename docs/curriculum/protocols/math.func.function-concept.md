# Teaching Protocol: math.func.function-concept
## Reference Implementation — Educational Brain

**Concept ID:** math.func.function-concept  
**Status:** Reference Implementation (all future assets modelled on this)  
**Date:** 2026-07-11  
**KG position:** 373 transitive descendants · 19 direct dependents (highest in-degree non-root, entire math KG)  
**Governing document:** `docs/curriculum/TEACHING_ASSET_PHILOSOPHY.md`

**Design constraint:** A deterministic rule engine — not an AI — must be able to execute every teaching action in this document. Every decision must be pre-computed. The AI selects actions; the Brain contains them.

---

## PART 0 — CONCEPT PROFILE & DIAGNOSTIC ENTRY

### 0.1 Learning Objective (Boundary Statement)

A student who achieves mastery of this concept demonstrates the following and no less:

1. **Classification without formula:** Can correctly classify a non-formulaic correspondence (a lookup table with messy values, a set of ordered pairs with repeated y-values, a verbal rule with natural language) as function or non-function.

2. **Single-valuedness as first principle:** States "each input must have exactly one output" — NOT "it passes the vertical line test" — as the reason. The VLT is a procedural shortcut that does not generalise beyond continuous Cartesian graphs. A student whose only justification is the VLT has NOT achieved mastery.

3. **Domain as contract:** Can explain why the domain restriction in a specific real-world problem exists — not as an arbitrary mathematical rule but as a constraint that the real-world context demands.

4. **Hard case handling:** Correctly classifies the sideways parabola (x = y²) as NOT a function of x, explaining that x = 1 gives both y = 1 and y = −1, not by applying the VLT but by exhibiting the input-with-two-outputs.

5. **Non-formula generalisation:** Explicitly rejects the belief that a function requires a formula. Can demonstrate a valid function given only a table, a graph, a verbal rule, or a set of ordered pairs.

A student who passes items 1 and 4 but fails items 2, 3, or 5 has a **procedural pass without conceptual mastery**. This is the most dangerous outcome: the student advances, the misconception propagates into every downstream concept (there are 19 immediate downstream concepts and 373 transitive descendants). Do not advance until all 5 items are demonstrated.

---

### 0.2 Student Entry State Classification

Before any teaching action is taken, the rule engine must classify the student's entry state. Classification is achieved by the Diagnostic Battery (0.3).

| State Code | Name | Description |
|---|---|---|
| S0 | Complete Novice | No prior exposure to the word "function" in a mathematical context |
| S1 | Procedural Carrier | Has seen f(x) notation; has formula-only schema; cannot handle non-formula representations |
| S2 | Misconception Carrier | Has one or more active misconceptions (MC1–MC6); may feel confident |
| S3 | Latent Schema | Has encountered functions before; partially correct schema; may be confused about edge cases |
| S4 | Prerequisite Gap | Missing set theory basics, variable concept, or domain/codomain vocabulary |
| S5 | Mathematically Mature | Comfortable with formal definitions, set notation, and proof language |
| S6 | Low Confidence | Significant math anxiety; abandons quickly when uncertain |
| S7 | High Confidence Incorrect | Overestimates own understanding; resists correction; needs challenge not correction |
| S8 | Adult Learner | Practical orientation; motivated by application; low tolerance for perceived pointlessness |
| S9 | Second-Language Learner | Language load is a significant barrier; technical vocabulary requires extra scaffolding |

A student can hold multiple states simultaneously (e.g., S1+S7 = confident but wrong, or S4+S6 = anxious and under-prepared). The classification determines which Protocol is the entry point.

**Protocol selection matrix:**

| Primary State | Recommended Entry Protocol |
|---|---|
| S0 | Protocol A (Concrete Objects) |
| S1 | Protocol G (Counterexample-First) — exploits existing schema to expose its limits |
| S2 | Misconception Engine first, then Protocol matching underlying state |
| S3 | Protocol E (Guided Questioning) — surfaces the partial schema and extends it |
| S4 | Prerequisite repair first (0.4), then Protocol A or B |
| S5 | Protocol H (Formal Definition First) |
| S6 | Protocol F (Analogy-First) — low abstraction load, confidence-building sequence |
| S7 | Protocol G (Counterexample-First) — provides challenge without explicit correction |
| S8 | Protocol C (Real-World Situations) — application-first, justification follows |
| S9 | Protocol A (Concrete Objects) — language-minimal, action-based, visual-dominant |

---

### 0.3 Diagnostic Battery

Run before any protocol begins. Maximum 3 questions. Exit at first definitive classification.

**DB-1: Prior Exposure Check**

Ask: "Have you heard the word 'function' in a maths class before?"

- No → classify S0. Enter Protocol A.
- Yes → proceed to DB-2.

**DB-2: Representation Test**

Say: "Here is a table: input 1 gives output 4; input 2 gives output 7; input 3 gives output 10. Is this a function?"

Observe response:
- "Yes, because there's a formula (3x + 1)" → classify S1. Enter Protocol G.
- "Yes, because each input has one output" → classify S3. Enter Protocol E to test depth.
- "I'm not sure / it depends" → classify S3 (uncertain). Enter Protocol E.
- "No" + any reason → classify S2 (active misconception). Identify specific misconception via MC Diagnostic (Part 3).
- No response / "I don't know" → classify S0 or S6. Ask one follow-up: "Do you feel OK about maths generally?" If no → S6. If yes → S0. Enter Protocol F or A respectively.
- "It needs a formula to check" → classify S1. Enter Protocol G.

**DB-3: Confidence Calibration**

Ask: "On a scale of 1–5, how confident are you about this topic?"

- 1–2 → add S6 flag. Adjust protocol for low confidence (see per-protocol S6 notes).
- 4–5 + DB-2 showed S1 or S2 → add S7 flag. This is the most dangerous combination. Protocol G is mandatory.
- This question is for internal routing only. Do not share the result with the student.

---

### 0.4 Prerequisite Diagnostic and Minimum Repair

If student cannot answer DB-2 at all, check prerequisites before proceeding.

**PD-1: Set membership**
Ask: "If I have a bag with the numbers 2, 4, and 6 in it, is the number 5 in the bag?"
- Cannot answer or confused → flag PREREQ-GAP-SETS.
- In-session minimum: use only language "collection of inputs" / "collection of outputs" throughout. Never use ∈ or formal set notation. Schedule full set theory review separately.

**PD-2: Variable concept**
Ask: "In the expression 3x + 1, what does the x represent?"
- Says "a specific number I don't know yet" → minimal set-variable concept, acceptable.
- Says "any number" or "a number that changes" → adequate.
- Cannot answer → flag PREREQ-GAP-VARIABLE.
- In-session minimum: always say "a specific input value" not "a variable." Do not use x as a symbol until the student demonstrates comfort.

**PD-3: Dependency intuition**
Ask: "If I told you that the temperature outside always depends on what time of day it is, what does that mean to you?"
- Any version of "when you know the time, you know the temperature" → dependency intuition present. Proceed.
- "I'm not sure" → dependency intuition absent. This is NOT a blocking prerequisite gap — it is the exact thing Protocol A will build. Proceed with Protocol A, which starts from zero.

---

## PART 1 — TEACHING PROTOCOL LIBRARY

Each protocol is a complete, self-contained teaching pathway. The rule engine selects one as the entry point (based on 0.2) and executes it. If a protocol fails (student does not reach the success signal for the protocol), the engine escalates according to the Adaptation Engine (Part 4).

---

### PROTOCOL A — Concrete Objects
**Serves:** S0, S9 (and S6 with confidence-adapted delivery)  
**CPA Stage:** Concrete (Stage 1)  
**Estimated Duration:** 12–20 minutes  
**Language Load:** Minimal — this protocol is executable with diagrams and physical objects alone

**Entry Condition:** Student has no reliable prior function schema. May have language barriers. May have math anxiety.

**Protocol Exit (Success):** Student can, unprompted, explain why one input cannot have two different outputs — in their own words, without any mathematical vocabulary.

**Protocol Exit (Failure → Escalation):** Student cannot articulate the one-output guarantee after 3 teaching actions. Escalate to Protocol F (Analogy) and restart from a different concrete anchor.

---

**TA-A01: Vending Machine Setup**

Purpose: Activate the dependency intuition using a familiar real object.  
Trigger: Protocol A entry.  
Duration: 3 minutes.  
CPA Stage: Concrete.  
Student State: S0 or S9.  

Teaching Move:  
Say: "Imagine a vending machine. You press button B3. What comes out?"  
[Wait for student to name a snack or say "I don't know."]  
If names a snack: "Does pressing B3 always give you the same snack, or sometimes something different?"  
If "I don't know": "Think of a vending machine you've seen. Does pressing the same button always give the same thing?" — this is not a rhetorical question; wait for the student to reason.  

Expected Student Reaction:  
"Always the same thing." OR "Yes, because the machine is set up that way."  

Alternative Move (if student is confused about the scenario):  
Replace vending machine with: "When you dial a phone number, does it always call the same person?" (works cross-culturally and requires no physical object imagination)  
OR for younger students: "If you press the 'add 3' button on a calculator with the number 5, what comes out? What if you press it again with 5?"  

Success Signal: Student confirms one input gives one specific output, without being told this is mathematically significant.  
Failure Signal: Student cannot engage with the scenario after the alternative move.  
Exit Condition: Student has confirmed one-to-one input-output mapping in a concrete context.  
Next Action: TA-A02.

---

**TA-A02: The "Broken Machine" Counter-Scenario**

Purpose: Contrast a function with a non-function using the same concrete anchor, before any formal language.  
Trigger: TA-A01 success signal.  
Duration: 3 minutes.  
CPA Stage: Concrete.  

Teaching Move:  
"Now imagine a broken vending machine. You press B3 — sometimes it gives you chips, sometimes it gives you a drink, sometimes nothing at all. Would you trust this machine?"  
[Student answers — usually "no."]  
"Why not?"  
[Wait for the student's reasoning — do NOT answer for them.]  

Expected Student Reaction:  
"Because you don't know what you'll get." OR "It's unpredictable." OR "You can't rely on it."  

This is the core insight. The student has just described non-single-valuedness without any mathematical vocabulary. Acknowledge: "Exactly. When you press a button and you don't know which output you'll get — we'd say that machine doesn't follow a guaranteed rule."  

Alternative Move (if student says "I still wouldn't use it because it's wasteful"):  
Redirect: "Forget about wasting money — just think about whether you could PREDICT what you'd get. If I asked you 'what will you get from pressing B3?' — could you tell me?"  

Success Signal: Student articulates that unpredictability = the rule is not guaranteed = cannot predict.  
Failure Signal: Student remains focused on practical concerns, cannot engage with the prediction aspect.  
Exit Condition: Student understands that the functional rule must guarantee one output per input.  
Next Action: TA-A03.

---

**TA-A03: Student Constructs Own Function**

Purpose: Transition from passive reception to active construction. The student owns the concept before it is named.  
Trigger: TA-A02 success signal.  
Duration: 4 minutes.  
CPA Stage: Concrete → Pictorial transition.  

Teaching Move:  
"Make up your own guaranteed-output rule. Tell me: for each of these inputs — 1, 2, 3, 4 — what is the output?"  
[Give the student a blank two-column table: Input | Output]  
[Let the student fill it freely.]  

If student assigns one output per input: "Good. Now, for input 2, can you also get output 99?"  
[Wait. The student will likely say "no, because I already said 7" or whatever they chose.]  
"Why not?" — wait for "because I already decided / because one input gets one output."  

If student assigns two outputs to one input: "So for input 2, you wrote both 5 and 8. If I look at input 2, how many outputs do I get?" [Student counts: 2.] "Does that work, based on what we just said about the vending machine?"  
[Student should self-correct.]  

Alternative Move (if student struggles with the open-ended construction):  
"I'll start the table for you: Input 1 gives Output 3. Now you fill in Input 2, Input 3, Input 4."  

Success Signal: Student fills a table with one output per input AND can explain why a second output for any input is not allowed.  
Failure Signal: Student repeatedly assigns multiple outputs and cannot self-correct with prompting.  
Exit Condition: Student has CONSTRUCTED a function (not been shown one).  
Next Action: TA-A04 (Name the pattern).

---

**TA-A04: Name the Pattern (Function Introduction)**

Purpose: The word "function" is introduced ONLY after the student has discovered the underlying idea. The name labels what they already know.  
Trigger: TA-A03 success signal.  
Duration: 2 minutes.  
CPA Stage: Pictorial.  

Teaching Move:  
"The pattern you've been describing — where one specific input always gives exactly one specific output — has a name in mathematics. It's called a function."  
[Pause.]  
"What you made in that table is a function. The broken vending machine is NOT a function."  

Do NOT say: "A function is a rule that assigns..." — this is the textbook definition given BEFORE the concept, not after.  
DO say: "The name 'function' labels what you've already discovered."  

Expected Student Reaction: Recognition — "Oh, that's what a function is?"  
This moment of "oh, that's the name for something I already understood" is the correct arrival at a new concept. If the student looks confused, the underlying concept is not yet solid — return to TA-A02.  

Success Signal: Student nods, expresses recognition, or asks a natural follow-up question about functions (what else qualifies? does a formula need to be there?).  
Failure Signal: Student asks "but what IS a function?" — they have not internalised the concept from TA-A01 to A03.  
Exit Condition: Student accepts "function" as the name for the guarantee-one-output rule.  
Next Action: TA-A05.

---

**TA-A05: Generalisation Test — Non-Formula Functions**

Purpose: Immediately test whether the student's schema for "function" includes or excludes non-formula representations. This is where formula-dependency misconceptions are caught early.  
Trigger: TA-A04 success signal.  
Duration: 3 minutes.  
CPA Stage: Pictorial.  

Teaching Move:  
"Look at this table:" [Show a table with no obvious pattern — e.g., 1→7, 2→3, 3→19, 4→2]  
"Is this a function?"  

Expected Student Reaction (correct): "Yes, because each input has one output."  
Expected Student Reaction (MC1 active): "I'm not sure — what's the formula?" or "It doesn't seem to follow a pattern, so maybe not."  

If MC1 detected: Do NOT say "functions don't need formulas." Instead, return to the vending machine. "Does the vending machine need a formula to be a function?" [Student: no.] "So what matters?" [Student should self-derive: one output per input.] Then re-show the table.  

Success Signal: Student classifies the patternless table as a function, citing single-valuedness.  
Failure Signal: Student requires a formula to classify the table.  
Exit Condition (success): Proceed to TA-A06.  
Exit Condition (formula-dependency detected): Divert to MC1 engine (Part 3), then return to TA-A05.

---

**TA-A06: Hard Case — The Sideways Parabola**

Purpose: Test the depth of single-valuedness understanding against the most commonly misclassified case.  
Trigger: TA-A05 success signal.  
Duration: 4 minutes.  
CPA Stage: Pictorial.  

Teaching Move:  
[Show a graph or table of x = y²: (0,0), (1,1), (1,−1), (4,2), (4,−2)]  
"For input x = 1, what are the outputs?" [Student should find y = 1 and y = −1.]  
"Is this a function?"  

Do NOT tell the student to apply the VLT. Let them reason from the definition.  

Expected Student Reaction (correct): "No, because input 1 gives two outputs."  
Expected Student Reaction (MC6 — VLT procedurally): Student draws or mentally applies the VLT, gets the right answer, but cannot explain why in terms of inputs and outputs.  

If VLT-only response: Accept the classification but probe: "Why does the vertical line test work? What does a vertical line crossing the graph twice mean in terms of inputs and outputs?"  
If student cannot answer: MC6 engine (Part 3).  

Success Signal: Student correctly classifies the sideways parabola AND cites single-valuedness, not the VLT.  
Failure Signal: Student classifies it as a function.  
Exit Condition: Protocol A complete. Proceed to mastery verification (Part 5).

---

**Protocol A — S6 Adaptation (Low-Confidence Student):**

- TA-A01: Frame as "a puzzle, not a test." Say: "There are no wrong answers here — I want to hear your thinking."
- Never pause in silence for more than 5 seconds without offering: "What comes to your mind first, even if you're not sure?"
- Never express surprise or concern at wrong answers — respond with "interesting — tell me more about that thinking."
- TA-A03: Let the student choose a theme for their table (sports scores, temperatures, anything). Their context, their construction.
- TA-A06: Do not use the word "hard." Say "one more interesting case."

---

### PROTOCOL B — Visual Mapping (Arrow Diagrams)
**Serves:** S3 (latent schema), visual learners, intermediate students  
**CPA Stage:** Pictorial (Stage 2) — assumes basic dependency intuition present  
**Estimated Duration:** 10–15 minutes  
**Entry Condition:** Student has expressed some version of the dependency idea (in DB-2) but may not have a reliable classification method

**Protocol Exit (Success):** Student can construct a valid arrow diagram, construct an invalid one, and distinguish them by reasoning about single-valuedness, not visual pattern.

---

**TA-B01: Student Draws a Valid Mapping**

Purpose: Begin with construction, not observation. The student's own diagram is more memorable than one provided.  
Trigger: Protocol B entry.  
Duration: 3 minutes.  

Teaching Move:  
"Draw two circles — one on the left, one on the right. Put the numbers 1, 2, 3 inside the left circle. Now draw arrows so that each number on the left gets exactly one arrow going to a number on the right."  
[Student draws. Do NOT constrain what goes on the right.]  

After drawing: "Could the same number on the right get two arrows? Try it."  
[Student draws two arrows pointing to the same right-side element.]  
"Is that still a function?"  
[Expected: yes — outputs can repeat, inputs cannot have multiple outputs.]  

This distinction — outputs CAN repeat, inputs CANNOT split — is critical and almost never explicitly taught. Encode it here, early.  

Success Signal: Student correctly identifies that two inputs sharing the same output is still a function.  
Failure Signal: Student says "no" to two inputs sharing one output (injectivity misconception, MC3).  
Exit Condition (success): TA-B02.  
Exit Condition (MC3 active): MC3 engine (Part 3), then return to TA-B01.

---

**TA-B02: Student Draws an Invalid Mapping**

Purpose: Construct the counterexample before being shown it.  
Trigger: TA-B01 success.  
Duration: 2 minutes.  

Teaching Move:  
"Now draw a diagram that is NOT a function. What would you change?"  
[Wait for student to attempt. The expected action: draw one left-circle element with two arrows going to different right-circle elements.]  

If student removes an element instead of splitting: "Good — but can you make it NOT a function while keeping all the left-side elements present?"  
If student makes two elements point to the same right element (which IS a function): "That still works as a function — can you make it break the rule?"  

Success Signal: Student independently draws an element with two outgoing arrows.  
Failure Signal: Student cannot construct the counterexample, suggesting the single-valuedness rule has not been internalised.  
Next Action: TA-B03.

---

**TA-B03: Naming the Rule**

Purpose: Extract the principle from the two diagrams.  
Trigger: TA-B02 success.  
Duration: 2 minutes.  

Teaching Move:  
"Look at your two diagrams — the function and the non-function. What is the one thing that makes the first one work and the second one break?"  
[Wait. Do NOT say "single-valuedness" yet. Let the student generate the language.]  

Expected Response: "Each left-side element only has one arrow." OR "No element on the left has two arrows."  
Your response: "Exactly. Mathematicians call that property 'single-valuedness.' One input, one output — guaranteed. That is the entire definition of a function."  

Do NOT proceed to formal notation until this principle is stated in the student's own words.  

Success Signal: Student states the one-input-one-output rule independently.  
Failure Signal: Student cannot articulate the rule from the two diagrams.  
Next Action: TA-B04 (formal notation) OR if failure, return to Protocol A's TA-A01.

---

**TA-B04: Formal Notation (f: A→B)**

Purpose: Introduce the symbolic representation as compression of what the student already knows.  
Trigger: TA-B03 success.  
Duration: 3 minutes.  
CPA Stage: Abstract (Stage 3).  

Teaching Move:  
"Mathematicians write this relationship as f: A→B. The letter f is the function's name. A is the set of inputs — we call it the domain. B is the set of all possible outputs — we call it the codomain."  
"Look at your valid arrow diagram. What is A? What is B?"  
[Student identifies the sets from their own diagram.]  
"Now the notation f: A→B just means: f is a rule that takes each element of A and sends it to exactly one element of B."  

Do NOT ask the student to memorise the notation. Ask them to apply it to their own diagram. The notation describes what they drew.  

Success Signal: Student can label their own diagram with f: A→B correctly.  
Failure Signal: Student treats f: A→B as a new piece of information rather than a name for what they already drew.  
Next Action: TA-B05.

---

**TA-B05: Domain Restriction Test**

Purpose: Establish that the domain is a contract, not a technicality.  
Trigger: TA-B04 success.  
Duration: 3 minutes.  

Teaching Move:  
"What if I asked you: what does f give for input 0?" [Student checks their diagram — 0 is not in A.]  
"Is that a valid question?"  
[Expected: no — 0 is not in the domain.]  
"Why not?"  
[Expected: because the domain only contains 1, 2, 3 — 0 has no arrow defined.]  
"Right. The domain is the contract — it specifies exactly which inputs the function promises to handle. Outside the domain, the function makes no promise at all."  

Success Signal: Student recognises domain as a constraint on valid inputs, not just a label.  
Failure Signal: Student says "f(0) = undefined" as a rote answer without understanding WHY it's undefined.  
Next Action: TA-B06 or Mastery Verification (Part 5).

---

**TA-B06: Classification from Arrow Diagrams (3 examples)**

Purpose: Validate understanding with unfamiliar examples before proceeding.  
Trigger: TA-B05 success.  
Duration: 4 minutes.  

Present 3 unfamiliar arrow diagrams in sequence:
1. A valid function (one arrow per input, some outputs shared) — should classify as function
2. An invalid diagram (one input, two arrows) — should classify as non-function
3. An unusual valid function (one input mapped to itself, identity-like) — should classify as function

Expected Response Pattern: Student reasons from single-valuedness for all three, not visual pattern.  
Watch For: Student applying VLT-like visual reasoning without conceptual backing.  

Success Signal (all 3 correct with reasoning): Proceed to mastery verification.  
Success Signal (2/3 correct): Identify which case failed, target specifically.  
Failure Signal (1 or 0 correct): Return to TA-B03 and repeat.

---

### PROTOCOL C — Real-World Situations
**Serves:** S8 (adult learners), practical-orientation students, data-comfortable students  
**CPA Stage:** Pictorial / Abstract hybrid — enters through data rather than objects  
**Estimated Duration:** 12–18 minutes  
**Entry Condition:** Student is comfortable with numerical data, tables, and practical contexts. Has some "so what?" resistance to abstract mathematics.

**Core principle of this protocol:** The real-world context creates the domain restriction, the range, and the function/non-function distinction organically. Mathematics is introduced as the language that describes what the student already understands practically.

---

**TA-C01: Data Table Examination**

Trigger: Protocol C entry.  
Duration: 4 minutes.  

Teaching Move:  
[Present a two-column data table: Day of Year | Hours of Daylight in City X]  
"This table records how many hours of daylight the city gets on each day of the year. Is there any day where you'd expect two different values for hours of daylight?"  
[Student: no.]  
"Why not?"  
[Expected: "Because a day can only have one number of daylight hours — the sun doesn't give you two different readings for the same day."]  
"That's exactly right. And the mathematical term for what you just described is a function."  

Note: The definition emerges FROM the student's reasoning about the physical reality, not from the teacher imposing it. This is the correct sequence.  

Success Signal: Student articulates single-output guarantee from physical reasoning.  
Failure Signal: Student cannot see why one day couldn't have two values (unusual, suggests misunderstanding of the physical context — change the example to coin weight).  
Next Action: TA-C02.

---

**TA-C02: Contrast — A Non-Function in Data**

Trigger: TA-C01 success.  
Duration: 3 minutes.  

Teaching Move:  
"Now consider this: someone decides to record the day of year for every time they see a certain temperature (say, 20°C). Does each temperature value correspond to one and only one day?"  
[Student reasons: no — 20°C can occur on many different days in a year, so temperature → day gives multiple outputs for a single input.]  
"So is temperature → day a function?"  
[Expected: no.]  
"But day → daylight-hours is a function. Why?"  
[Student contrasts: one day has one daylight count; one temperature has many possible days.]  

Success Signal: Student identifies which direction is a function and which is not, using single-valuedness reasoning.  
Next Action: TA-C03.

---

**TA-C03: Domain and Range from Data**

Trigger: TA-C02 success.  
Duration: 3 minutes.  

Teaching Move:  
"In the daylight-hours table, what are all the valid inputs?"  
[Expected: days 1 through 365 (or 366).]  
"Could I ask 'how many daylight hours on day 400?'"  
[Expected: no — Day 400 doesn't exist.]  
"The collection of valid inputs — days 1 through 365 — is called the domain. It's the contract: the function only promises to work for these inputs."  
"What values appear as outputs?"  
[Student reads from table.]  
"That collection of actual outputs is called the range. The full collection of possible outputs is the codomain — which could be any number of hours, but the range is what actually occurs."  

Success Signal: Student can identify domain and range from a data table without difficulty.  
Next Action: TA-C04.

---

**TA-C04: Real-World Domain Restriction**

Trigger: TA-C03 success.  
Duration: 3 minutes.  

Teaching Move:  
"A taxi charges a flat fee of $3 plus $2 per kilometre. Is the cost a function of distance?"  
[Expected: yes — one distance gives one cost.]  
"What is the domain?"  
[Expected student responses vary — some say "all positive numbers," some say "all real numbers."]  
"Can distance be negative?"  
[Student: no.]  
"Can it be zero?"  
[Student may say yes or no — accept either, explain: zero distance means you sat in the taxi without moving, and the flat fee applies.]  
"The domain is not given by the formula — it's given by what's physically sensible. This is always true for real-world functions. The mathematics alone doesn't tell you the domain. The context does."  

This is the key learning of this protocol: domain as physical contract, not mathematical artifact.  

Success Signal: Student explains that domain restriction comes from context, not formula.  
Next Action: TA-C05.

---

**TA-C05: Non-Formula Classification**

[Same as TA-A05 — patternless table. Run here to cross-validate generalisation.]

---

**TA-C06: Industry Application Anchoring (Profile-Adaptive)**

Trigger: TA-C05 success.  
Duration: 3 minutes.  

Purpose: Connect the concept permanently to the student's professional or personal context.  
[Do NOT run this action with a generic example. Identify the student's background first.]  

For engineering/technical students:  
"In a circuit, voltage is a function of current given fixed resistance (V = IR). The domain is the set of physically achievable currents, not all real numbers."  

For business/finance students:  
"Revenue is a function of units sold, but only when sales are between 0 and your production capacity. The domain is the business constraint."  

For healthcare students:  
"Blood pressure varies as a function of time. For any given moment in time, there is exactly one blood pressure reading — it's a function."  

For students with no specified domain:  
Use the taxi example from TA-C04 as the anchor.  

Success Signal: Student can state a function relationship from their own domain of interest.  
Next Action: Mastery Verification (Part 5).

---

### PROTOCOL D — Pattern Discovery
**Serves:** Analytical learners, inquisitive students, S7 (high-confidence) who need challenge  
**CPA Stage:** Pictorial → Abstract  
**Estimated Duration:** 10–15 minutes  
**Entry Condition:** Student is comfortable with tables, comfortable with being challenged, and benefits from discovering rather than receiving

**Core Principle:** The student discovers single-valuedness by attempting to PREDICT — and experiencing what happens when prediction is impossible.

---

**TA-D01: Prediction Game**

Trigger: Protocol D entry.  
Duration: 5 minutes.  

Teaching Move:  
"I'm going to show you a table one row at a time. Your job is to predict the next output."  
[Show row by row: 1→2, 2→4, 3→6, 4→?]  
[Student predicts 8.]  
[Show: 4→8. Correct.]  

"Now a different table: 1→5, 2→3, 3→5, 4→?"  
[Student tries to predict — no obvious pattern.]  
[After student attempts: "What information would you need to make a reliable prediction?"]  
[Expected: "I'd need to know what the rule is."]  

"Now: 1→7, 1→3, 2→4. If I show you input 1 again, what do you predict?"  
[Student: 7 or 3 — they cannot predict reliably.]  
"Why can't you predict?"  
[Expected: "Because 1 sometimes gives 7 and sometimes gives 3."]  
"This table is NOT a function — and that's exactly why. A function guarantees that for any given input, there is always one and only one output. When that guarantee breaks, prediction becomes impossible."  

Success Signal: Student connects unpredictability to the absence of single-valuedness.  
Next Action: TA-D02.

---

**TA-D02: Student Constructs Unpredictable Rule**

Trigger: TA-D01 success.  
Duration: 3 minutes.  

Teaching Move:  
"Now build me a table where I cannot predict the output reliably, even if I know all the previous rows."  
[Student must assign two outputs to one input.]  
After construction: "What did you have to do to make it unpredictable?"  
[Expected: "I gave one input two different outputs."]  
"That's the function failure condition — exactly one input, more than one output. Everything that is a function avoids this failure."  

Success Signal: Student independently identifies the failure condition.  
Next Action: TA-D03.

---

**TA-D03: Formula-Independence Test**

[Same as TA-A05. Run here to check generalisation. Students in Protocol D often have stronger procedural skills and are more susceptible to formula-dependency.]

Teaching Move addition for Protocol D: After classifying the patternless table, add: "Is there a pattern?"  
[Expected: "Not obviously."]  
"Does that matter?"  
[Student should say "No, because each input has one output."]  
If student says "Yes, it matters": MC1 engine.

---

**TA-D04: Formal Definition Construction**

Trigger: TA-D03 success.  
Duration: 3 minutes.  

Teaching Move:  
"Based on everything you've discovered, write a definition of 'function' in your own words."  
[Wait. Read what the student writes.]  

Evaluate against 3 criteria:
1. Does it mention input and output (or equivalent)?
2. Does it specify one output per input?
3. Does it exclude formulas as a requirement?

If all 3: "Perfect. Here is how mathematicians write this: f: A→B assigns to each element of A exactly one element of B. Compare that with what you wrote."  
If criteria 1 or 2 is missing: Ask a targeted follow-up question to surface the missing element before showing the formal definition.  
If criterion 3 is missing (definition includes "formula" or "equation"): TA-A05 counterexample, then re-ask for the definition.  

Success Signal: Student can write a definition that captures all 3 criteria in their own language.  
Next Action: Mastery Verification.

---

### PROTOCOL E — Guided Questioning (Socratic)
**Serves:** S3 (latent schema), students who already have partial understanding, intermediate students  
**CPA Stage:** Starts at whatever CPA stage the student is at; adjusts dynamically  
**Estimated Duration:** 8–15 minutes  
**Entry Condition:** Student expressed some understanding in DB-2 but the depth is unclear  
**Special Requirement:** This protocol requires active listening — the teacher must respond to the student's language, not a script. It is the most AI-dependent protocol. For a rule engine, it requires the most pre-built branching.

---

**TA-E01: Open Elicitation**

Trigger: Protocol E entry.  
Duration: 3 minutes.  

Teaching Move:  
"Without looking anything up — tell me what you think a function is. Anything at all that comes to mind."  
[Wait. Record/note the key words the student uses.]  

Classify the response into one of 4 categories:
- Category R (Rich): Student mentions "one output per input" or "each x has one y" or "deterministic" → the schema exists. Proceed to TA-E02.
- Category F (Formula-anchored): Student mentions "f(x)" or "equation" or "formula" → S1 identified. Switch to Protocol G.
- Category V (Visual-anchored): Student mentions "graph" or "vertical line test" → MC6 risk. Proceed to TA-E03 to test whether understanding underlies the procedure.
- Category U (Unclear/vague): Student says "a type of equation" or "something from algebra" → incomplete schema. Use TA-E04 to probe.

---

**TA-E02: Depth Test for Rich Schema**

Trigger: Category R response in TA-E01.  
Duration: 3 minutes.  

Teaching Move:  
"Great. You said [student's exact words]. Let me test that understanding: is {(1,2), (2,4), (1,3)} a function? The number 1 appears twice as an input."  
[Wait for student reasoning.]  
Expected correct: "No, because input 1 gives both 2 and 3."  
Expected incorrect (proceeds to wrong conclusion): Student says "yes" — MC3 or incorrect schema depth.  

If correct: Advance to hard cases immediately (TA-A06 level). The student is close to mastery.  
If incorrect: Identify specific error type and route to relevant misconception engine.

---

**TA-E03: VLT Probe**

Trigger: Category V response in TA-E01.  
Duration: 3 minutes.  

Teaching Move:  
"You mentioned the vertical line test. What does it tell you when a vertical line crosses the graph twice?"  
[Wait.]  

If student says "it means two y-values for one x-value" → the understanding is present beneath the procedure. Congratulate: "Exactly — which means two OUTPUTS for one INPUT, violating single-valuedness. You understand this already." Proceed to TA-A05 (non-formula test) to check formula dependency.  

If student says "it means the graph fails" or cannot explain → MC6 active. Student has the test but not the understanding. Route to MC6 engine. Do NOT proceed until understanding replaces procedure.

---

**TA-E04: Schema Construction via Questions**

Trigger: Category U response in TA-E01.  
Duration: 6 minutes.  

This action is a sequence of questions designed to lead the student to construct the definition. Do not give information — only ask questions.

Q1: "Think of a calculator. If you type in 5 and press 'times 3', what comes out?"  
[Expected: 15.]  
Q2: "Could pressing 'times 3' with input 5 give a different answer on a different day?"  
[Expected: No.]  
Q3: "Why not?"  
[Expected: some version of "it's always the same calculation."]  
Q4: "What if a calculator sometimes gave 15, sometimes 18, when you typed 5 and pressed 'times 3'?"  
[Expected: "It would be broken / wrong / unreliable."]  
Q5: "What would be broken about it?"  
[Expected: "You couldn't trust the answer / one input gives two different answers."]  
Q6: "A function is a rule that avoids exactly that failure. How would you describe a function now?"  
[Student generates their own definition.]  

Evaluate: Does the generated definition include one-output-per-input? If yes → TA-E02. If no → return to Q5, probe again.

---

### PROTOCOL F — Analogy-First
**Serves:** S6 (low confidence), S9 (second-language learners), students who respond to narrative, abstract-resistant learners  
**CPA Stage:** Concrete (high abstraction aversion)  
**Estimated Duration:** 12–20 minutes  
**Entry Condition:** Student needs a non-mathematical entry point. The mathematical structure will emerge from the analogy, not precede it.

**Core Analogy:** A function is a promise. The function "promises" that for any input you provide, it will give you back exactly one specific thing. A broken promise (two different things for the same input) is a non-function.

---

**TA-F01: The Promise Framework**

Trigger: Protocol F entry.  
Duration: 3 minutes.  

Teaching Move:  
"Think about a promise. If I promise to meet you at the café at 3pm, and I meet you at 3pm — that's a kept promise."  
"If I show up at 3pm but also send a different version of me to another place at 3pm — that's impossible. A person can only be in one place at a time."  
"A function makes the same kind of promise: 'Give me any input from my domain, and I guarantee you will receive exactly one output. Always. No exceptions.'"  

[Pause.]  
"A non-function breaks that promise — for the same input, it might give different outputs at different times."  

Expected Student Reaction: Immediate accessibility. The promise metaphor does not require mathematical vocabulary.  

Success Signal: Student can use the word "promise" to describe single-valuedness.  
Do NOT extend the analogy beyond this point. Analogies can mislead if overextended. Use it only to establish the one-output guarantee.  
Next Action: TA-F02.

---

**TA-F02: Concrete Promise Examples**

Trigger: TA-F01 success.  
Duration: 4 minutes.  

Teaching Move:  
"Let's find examples of 'kept promises' (functions) and 'broken promises' (non-functions) in real life."  
"For every person in the world: they have exactly one birth date. Is that a function?"  
[Student: yes — one person → one birth date.]  
"For every birth date: is there exactly one person born on that date?"  
[Student: no — many people share a birth date.]  
"So person → birth date is a function. Birth date → person is NOT a function. Same data. Different direction. Different result."  

This direction-reversal is a powerful insight: functions are not symmetric. Encoding it here, through the promise analogy, prevents a major class of domain/range confusion errors later.  

Success Signal: Student articulates that direction matters, and can say which direction is a function and which is not.  
Next Action: TA-F03.

---

**TA-F03: Translation to Mathematical Language**

Trigger: TA-F02 success.  
Duration: 4 minutes.  

Teaching Move:  
"The 'collection of all people' is called the domain — the set of all valid inputs."  
"The 'collection of all birth dates' is called the codomain — the set of all possible outputs."  
"The actual birth dates that appear — the outputs that are actually used — are called the range."  
"The function is the 'promise' connecting them: f: People → Dates."  

Do NOT introduce algebraic examples yet. Let the person-to-date function carry the vocabulary introduction.  

Success Signal: Student can label domain, codomain, and range on the person-to-date example.  
Next Action: TA-F04.

---

**TA-F04: Algebraic Bridge**

Trigger: TA-F03 success.  
Duration: 4 minutes.  

Teaching Move:  
"Now the same idea works for numbers. Let's say our promise is: 'Give me any positive number, and I'll give you back that number plus 3.'"  
"What is the input if I say 5?"  
[Output: 8.]  
"Is this function 'keeping its promise' for input 5?"  
[Yes — one output.]  
"What if I said the promise is: 'Give me any number, and I'll give you back a number whose square is that input.' Is that a kept promise for input 4?"  
[Student: 4 has square roots 2 and −2 — two outputs.]  
"Broken promise — two outputs for one input. Not a function."  

Success Signal: Student classifies the square root case as a non-function, citing the two-outputs failure.  
Note: The square root function IS a function if defined as the positive square root only — this is a domain/codomain/convention issue that can be explored if the student raises it. If raised: "Great question. If we PROMISE to always give the positive square root only, then it IS a function. The promise has to be specific."  
Next Action: TA-A05 (non-formula generalisation test), then Mastery Verification.

---

### PROTOCOL G — Counterexample-First
**Serves:** S1 (procedural carriers), S7 (high-confidence incorrect), students who learn by having assumptions challenged  
**CPA Stage:** Abstract → Concrete (reverse CPA — exploits the student's existing abstract schema)  
**Estimated Duration:** 10–15 minutes  
**Entry Condition:** Student already has a function schema (even if wrong). Starting with content they think they know and showing it fails is the most efficient path to schema reconstruction for this profile.

**CRITICAL WARNING:** Do NOT use this protocol with S6 (low confidence). The counterexample-first approach creates dissonance that energises high-confidence students and de-motivates low-confidence ones.

---

**TA-G01: The Formula-Only Challenge**

Trigger: Protocol G entry, S1 or S7 detected.  
Duration: 4 minutes.  

Teaching Move:  
"You mentioned functions are defined by formulas [or: "you seem confident about functions"]. Let me show you something."  
[Present a random lookup table: 1→$17.50, 2→$43.20, 3→$8.75, 4→$201.00]  
"I claim this is a function. Is it?"  
[Student expects to find a formula. They cannot.]  
"What formula gives those outputs?"  
[Student cannot find one.]  
"But is it a function?"  
[S1 student: "I'm not sure — I can't find the formula." S7 student: "No, it's not a function because there's no pattern."]  

Both responses reveal the schema gap. Do NOT answer yet.  
"What property would this table need to have to be a function?"  
[Wait. The student must generate the answer. If they say "a formula" — continue probing: "What would the formula guarantee that the table doesn't?" If they cannot answer this, they do not have a functional understanding of what formulas do.]  

Success Signal: Student asks or arrives at "does each input have one output?" as the relevant question.  
Next Action: TA-G02.

---

**TA-G02: Rebuild from the Failure**

Trigger: TA-G01 — student's existing schema has been destabilised.  
Duration: 4 minutes.  

Teaching Move:  
"Let's figure out what ACTUALLY makes something a function — not 'it has a formula' but the real reason."  
[Return to the table: 1→$17.50, 2→$43.20, 3→$8.75, 4→$201.00]  
"For input 1, how many outputs are there?"  
[One.]  
"For input 2?"  
[One.]  
"For every input in this table, there is one output. Does that make it a function?"  
[Student: yes — this is the discovery. The formula was never the criterion.]  
"So what IS the criterion?"  
[Student generates: one output per input.]  

Success Signal: Student states single-valuedness as the criterion, recognising that formula is irrelevant.  
Next Action: TA-G03.

---

**TA-G03: Cement with Hard Cases**

Trigger: TA-G02 success.  
Duration: 5 minutes.  

Present three cases in rapid sequence:

Case 1: {(1,2), (2,2), (3,2)} — function (all outputs the same)  
Case 2: {(1,2), (1,3), (2,4)} — non-function (input 1 gives two outputs)  
Case 3: The sideways parabola (x = y²)  

For each: ask student to classify and explain. Do NOT accept "passes/fails VLT" as a sufficient reason — require input-output reasoning.  

For S7 students: Add: "Why do you think this is a common point of confusion for students?" — turns their confidence into teaching experience, reinforcing their understanding.  

Success Signal: All three correctly classified with single-valuedness reasoning.  
Next Action: Mastery Verification.

---

### PROTOCOL H — Formal Definition First
**Serves:** S5 (mathematically mature), pure-math orientation students, students preparing for university-level mathematics  
**CPA Stage:** Abstract first (reverse CPA — works ONLY for S5)  
**Estimated Duration:** 8–12 minutes  
**Entry Condition:** Student is comfortable with set theory, logical quantifiers, formal definitions. Asking them to "imagine a vending machine" may feel condescending. Entering through the formal definition respects their mathematical maturity.

---

**TA-H01: Formal Definition, Unpacked**

Trigger: Protocol H entry.  
Duration: 4 minutes.  

Teaching Move:  
"A function f: A→B is a relation such that for every a ∈ A, there exists exactly one b ∈ B such that (a,b) ∈ f."  
[Write this. Let the student read it.]  
"Which word in that definition does the most work?"  
[Expected: "exactly."]  
"Yes. 'Exactly one' is the entire content of the definition. Not 'at least one' — that would mean the domain is covered. Not 'at most one' — that would allow partial functions. 'Exactly one' means both: every input is covered AND every input maps to one specific output."  
"What goes wrong if you replace 'exactly one' with 'at least one'?"  
[Student: input could map to two outputs — no longer single-valued.]  
"What goes wrong if you replace it with 'at most one'?"  
[Student: some inputs might have no output — the function is undefined on part of its domain — partial function.]  

Success Signal: Student can articulate what breaks when each word of "exactly one" is removed.  
Next Action: TA-H02.

---

**TA-H02: Relation-Function Distinction**

Trigger: TA-H01 success.  
Duration: 3 minutes.  

Teaching Move:  
"Every function is a relation — a subset of A×B. Not every relation is a function. Construct a relation that is NOT a function."  
[Student constructs, e.g.: {(1,2),(1,3),(2,4)}.]  
"Good. Now: does every element of the domain appear as a first coordinate in at least one pair?"  
[Check: yes — 1 appears in (1,2) and (1,3); 2 appears in (2,4).]  
"But input 1 maps to both 2 and 3. The 'exactly' fails. This is a relation but not a function."  
"Now give me a relation where the domain coverage fails."  
[Student constructs: e.g., A={1,2,3} but the relation only has {(1,2),(3,4)} — input 2 has no pair.]  
"This is also not a function — the 'exists' part of 'there exists exactly one' fails for input 2."  

Success Signal: Student distinguishes relations from functions using the formal quantifier language.  
Next Action: TA-H03.

---

**TA-H03: Edge Cases and Conventions**

Trigger: TA-H02 success.  
Duration: 3 minutes.  

Teaching Move (a sequence of questions):

"Is the identity relation f: A→A where f(a)=a for all a a function?"  
[Yes — trivially.]  

"Is a constant function f(x)=5 for all x a function?"  
[Yes — one output (5) for every input.]  

"Is the square root relation {(x,y) : y²=x, x≥0} a function?"  
[No — for x=4, both y=2 and y=-2 satisfy the relation.]  
"How do we make it a function?"  
[Restrict to positive square root: y=√x≥0.]  
"The 'positive square root' convention is not a mathematical truth — it is a CHOICE. The convention converts a relation into a function by adding a rule about which output to pick when the relation offers two."  

This final point — that domain, codomain, and output conventions can all be adjusted to make a non-function into a function — is the most sophisticated insight at this protocol level.  

Success Signal: Student understands that sqrt is a function by convention, not by inherent property.  
Next Action: Mastery Verification.

---

## PART 2 — TEACHING ACTION LIBRARY (Full Index)

All Teaching Actions designed across protocols, with cross-reference.

| ID | Name | Protocol | CPA Stage | Primary Student State |
|---|---|---|---|---|
| TA-A01 | Vending Machine Setup | A | Concrete | S0, S9 |
| TA-A02 | Broken Machine Counter-Scenario | A | Concrete | S0 |
| TA-A03 | Student Constructs Own Function | A | Concrete→Pictorial | S0, S9 |
| TA-A04 | Name the Pattern | A | Pictorial | S0 |
| TA-A05 | Non-Formula Generalisation Test | A,C,D | Pictorial | S0, S1, S3 |
| TA-A06 | Hard Case — Sideways Parabola | A,G | Pictorial | All |
| TA-B01 | Student Draws Valid Mapping | B | Pictorial | S3 |
| TA-B02 | Student Draws Invalid Mapping | B | Pictorial | S3 |
| TA-B03 | Naming the Rule | B | Pictorial | S3 |
| TA-B04 | Formal Notation f: A→B | B | Abstract | S3, S5 |
| TA-B05 | Domain Restriction Test | B | Abstract | S3 |
| TA-B06 | Classification from Arrow Diagrams | B | Pictorial | S3 |
| TA-C01 | Data Table Examination | C | Pictorial | S8 |
| TA-C02 | Non-Function in Data | C | Pictorial | S8 |
| TA-C03 | Domain and Range from Data | C | Abstract | S8 |
| TA-C04 | Real-World Domain Restriction | C | Abstract | S8 |
| TA-C05 | Non-Formula Classification (C) | C | Pictorial | S8 |
| TA-C06 | Industry Application Anchoring | C | Concrete | S8 |
| TA-D01 | Prediction Game | D | Pictorial | Analytical |
| TA-D02 | Student Constructs Unpredictable Rule | D | Pictorial | Analytical |
| TA-D03 | Formula-Independence Test (D) | D | Pictorial | S1 risk |
| TA-D04 | Formal Definition Construction | D | Abstract | Analytical |
| TA-E01 | Open Elicitation | E | Any | S3 |
| TA-E02 | Depth Test for Rich Schema | E | Pictorial→Abstract | S3 |
| TA-E03 | VLT Probe | E | Pictorial | MC6 risk |
| TA-E04 | Schema Construction via Questions | E | Concrete | S3 U-category |
| TA-F01 | The Promise Framework | F | Concrete | S6, S9 |
| TA-F02 | Concrete Promise Examples | F | Concrete | S6, S9 |
| TA-F03 | Translation to Mathematical Language | F | Abstract | S6, S9 |
| TA-F04 | Algebraic Bridge | F | Abstract | S6 |
| TA-G01 | Formula-Only Challenge | G | Abstract | S1, S7 |
| TA-G02 | Rebuild from the Failure | G | Pictorial | S1, S7 |
| TA-G03 | Cement with Hard Cases | G | Pictorial→Abstract | S1, S7 |
| TA-H01 | Formal Definition Unpacked | H | Abstract | S5 |
| TA-H02 | Relation-Function Distinction | H | Abstract | S5 |
| TA-H03 | Edge Cases and Conventions | H | Abstract | S5 |

---

## PART 3 — MISCONCEPTION ENGINE

Six confirmed active misconceptions for math.func.function-concept. Each requires a distinct teaching move. They look similar but require different interventions.

---

### MC1 — Formula Dependency

**Misconception Statement:** A function must be expressible as an algebraic formula.

**Observable Symptoms:**  
- Student asks "what is the formula?" when given a function by table or graph  
- Student refuses to classify a table or verbal rule as a function  
- Student can only generate function examples with algebraic expressions (y = 2x + 3, etc.)  
- Student says "that's not really a function — it doesn't have an equation"

**Likely Mental Model:** School exposure to functions has been exclusively through f(x) notation and graphing calculators. The student has constructed "function = formula" as a schema rather than "function = deterministic dependency." The formula feels like the defining property because that is how functions were always presented.

**Diagnostic Question:**  
"Is the vending machine a function?" [Yes.] "What is its formula?" [There is none.] "So it has no formula — is it still a function?"

If the student cannot answer the third question: MC1 is confirmed and deeply embedded.  
If the student says "I guess it doesn't need one": MC1 is present but resolving. Proceed with TA-A05 and the formula is never mentioned again.

**Teaching Move — Vending Machine Anchor (Primary):**  
DO NOT show more examples of non-formula functions — this is pattern-stacking that does not change the schema. Instead: return to the vending machine. The student already agreed it is a function. The vending machine has no formula. The contradiction must be internally resolved.

Ask: "You agreed the vending machine is a function. Write me the formula for the vending machine."  
[Student cannot.]  
"Then what makes it a function?"  
Wait. The student must generate: "One button gives one item."  
"Exactly. The formula was never the point. The one-output guarantee is the point. The formula is just one WAY of expressing the guarantee."

**Alternative Move (if student cannot engage with vending machine):**  
Use a dictionary: "Every word in a dictionary has exactly one entry. Is a dictionary a function mapping words to definitions? Does it have a formula?"  
[Student: yes and no.]  
"So the definition of function applies to dictionaries, tables, machines, and formulas — anything where one input gives one output, always."

**Recovery Sequence:**  
MC1 Teaching Move → TA-A05 (patternless table classification) → TA-D04 (student writes own definition that excludes "formula") → MC1 re-diagnostic question.

**Evidence Misconception Removed:**  
Student spontaneously classifies an unfamiliar, patternless table as a function before being asked whether there is a formula. The formula question simply does not arise.

**Evidence Misconception Persists:**  
Student classifies correctly when prompted but, when asked to generate an example of a function, generates only algebraic formulas. The removal is procedural but the schema persists. Continue spaced revisiting with non-formula examples.

**When to Escalate:**  
If the student has completed the full MC1 recovery sequence twice and still cannot classify non-formulaic functions spontaneously: this may be a deeper abstraction processing issue. Escalate to a longer-arc intervention using concrete-first protocol (Protocol A) from the beginning.

---

### MC2 — Smooth Curve Requirement

**Misconception Statement:** A function must produce a smooth, continuous graph.

**Observable Symptoms:**  
- Student rejects piecewise functions ("that can't be a function — there's a break")  
- Student rejects discrete functions (tables with scattered values, no continuous-curve interpretation)  
- Student says functions must be "drawn without lifting the pen"  
- Student accepts f(x) = |x| (continuous) but rejects the floor function ⌊x⌋ (has jump discontinuities)

**Likely Mental Model:** Graphing calculators and textbook problems consistently showed smooth parabolas, lines, and sine waves. The "function = smooth curve" schema was built by consistent positive examples with no counterexamples.

**Diagnostic Question:**  
"Is the function f(n) = n² defined only for integer inputs n = 1, 2, 3, 4... a function?"  
If student says "I'm not sure — you can't draw a curve through those points": MC2 confirmed.

**Teaching Move:**  
"Does a function need to produce a curve? Let's check what the definition says."  
[Return to single-valuedness: one input, one output.]  
"For n = 1, what is f(1)?" [1.] "One output. For n = 2, what is f(2)?" [4.] "One output. Is the definition satisfied?"  
[Student: yes.]  
"Then it is a function. The definition says nothing about curves, smoothness, or continuity. Those are separate properties. A function is single-valued; it may or may not be continuous."

Show: a graph of the floor function (step function). "One output for every input? Yes. A function? Yes. Smooth? No. Are those the same question? No."

**Alternative Move:**  
Tax bracket table. "Income bracket → tax rate. One rate per bracket. Is this a function?" [Yes.] "Is the graph of this a smooth curve?" [No — it's a step function.] "Does the lack of a smooth curve stop it from being a function?" [No.]

**Evidence Misconception Removed:**  
Student accepts discrete, piecewise, and step-function representations as valid functions, citing single-valuedness. Does not mention smoothness or continuity as function requirements.

**Evidence Misconception Persists:**  
Student accepts the floor function verbally but adds "but it's not a REAL function" or "it's a special case." The schema is patched, not replaced.

---

### MC3 — Injectivity Confusion

**Misconception Statement:** Outputs must also be unique (i.e., different inputs must give different outputs).

**Observable Symptoms:**  
- Student says {(1,3), (2,3), (3,3)} is NOT a function because "all outputs are the same"  
- Student calls a constant function "not a real function"  
- Student confuses "function" with "one-to-one function" (injective function)  
- In arrow diagrams: student says "two arrows can't point to the same right-side element"

**Likely Mental Model:** The one-to-one relationship in everyday language ("each person has one seat, each seat has one person") has been imported into the mathematical function concept. The student's mental model is bijection, not function.

**Diagnostic Question:**  
"If f(1) = 5 and f(2) = 5 and f(3) = 5, is f a function?"  
If student says no: MC3 confirmed.

**Teaching Move:**  
"What is the definition we agreed on? One input → exactly one output. Does f(1) = 5 satisfy that? Yes. Does f(2) = 5? Yes. Does f(3) = 5? Yes. So is f a function?"  
[Student reluctantly: yes.]  
"What you're thinking of is a one-to-one function, or injective function — where different inputs give different outputs. That's a STRONGER condition than just being a function. f(x) = 5 is a function. It is not one-to-one. Both things are true simultaneously."

The explicit naming of "one-to-one / injective" is important: it gives the student's existing schema a correct name (what they were thinking of IS a real thing) and distinguishes it from the more general function concept. The misconception arose from conflating two real things.

**Evidence Misconception Removed:**  
Student correctly classifies constant functions as functions and explains that unique outputs are not required. Bonus: student can explain the difference between function and injective function.

---

### MC4 — Codomain = Range Confusion

**Misconception Statement:** The codomain and the range are the same thing.

**Observable Symptoms:**  
- Student says "the codomain is {1, 4, 9, 16}" for f: N → N where f(n) = n² (confusing range with codomain)  
- Student says f: N → N is "wrong" because not all natural numbers are outputs of f(n) = n²  
- Student cannot explain why the codomain might be larger than the range

**Diagnostic Question:**  
"For f: R → R defined by f(x) = x², what is the codomain? What is the range?"  
If student gives the same answer: MC4 confirmed.

**Teaching Move:**  
"The codomain is the set we're allowing as possible outputs — R, all real numbers. The range is the set of outputs that actually occur."  
"Can f(x) = x² give a negative output?"  
[No.]  
"So negative numbers are in the codomain (we said outputs could be any real number) but they're not in the range (they never actually occur). Codomain is a specification; range is a measurement."

Analogy: "A restaurant's menu is the codomain — everything the kitchen could potentially serve. Your order is the range — what you actually receive."

**Evidence Misconception Removed:**  
Student correctly identifies codomain as the declared target set and range as the actual output set, and can give an example where they differ.

---

### MC5 — Relation-Function Conflation

**Misconception Statement:** Any rule or correspondence between two sets is a function.

**Observable Symptoms:**  
- Student classifies {(1,2),(1,3),(2,4)} as a function  
- Student says "every equation is a function"  
- Student says x² + y² = 1 is a function (confuses the equation with specific functions derived from it)

**Diagnostic Question:**  
"Is {(1,2),(1,3),(2,4)} a function?"  
If student says yes: MC5 confirmed.

**Teaching Move:**  
"For input 1, how many outputs are there in this set?"  
[Two: 2 and 3.]  
"Is that one output per input?"  
[No.]  
"Then the function rule is broken for input 1. A relation — any correspondence — is a more general thing than a function. A function is a relation with the extra requirement: exactly one output per input."

**Evidence Misconception Removed:**  
Student correctly identifies the failure point (input 1 has two outputs) and distinguishes relations from functions.

---

### MC6 — Vertical Line Test Without Understanding

**Misconception Statement:** The vertical line test (VLT) is the DEFINITION of a function, not a visual shortcut derived from the definition.

**Observable Symptoms:**  
- Student applies VLT correctly but cannot explain WHY it works  
- Student cannot classify non-graph representations using function logic  
- Student says "I need to draw a graph to check if it's a function"  
- Student applies VLT by rotating the page when shown the sideways parabola (VLT fails to give the right answer when the student doesn't understand the graph orientation convention)

**Diagnostic Question:**  
"Why does the vertical line test work? What does a vertical line crossing the graph twice mean?"  
If student cannot connect it to "one x-value gives two y-values": MC6 confirmed.

**Teaching Move:**  
"The vertical line represents a single input value — one x. If the line crosses the graph twice, it means that x-value gives two different y-values — two outputs for one input. That violates single-valuedness. The VLT is just a visual way of checking single-valuedness. The real check is: does any input give more than one output?"  

"Now: is the VLT enough to classify all functions? What if your function is given as a table, not a graph?"  
[Student realises VLT only works for graphs.]  
"Right. The VLT is a tool for one representation (Cartesian graphs). Single-valuedness works for ALL representations: tables, verbal rules, ordered pairs, arrow diagrams, everything. Which is more fundamental?"  

**Evidence Misconception Removed:**  
Student explicitly states that the VLT is a derived tool, not the definition. Can classify non-graph functions without mentioning the VLT. When asked to explain a function classification, starts with "each input has exactly one output" not "it passes the vertical line test."

---

## PART 4 — ADAPTATION ENGINE & DECISION TREE

The adaptation engine governs what happens when a teaching action fails. Every failure has a pre-defined escalation path. No protocol is terminal — if one approach fails, the engine selects an alternate approach based on the failure mode.

```
ENTRY
  │
  ├── Run Diagnostic Battery (0.3)
  │     ├── S0 → Protocol A
  │     ├── S1 → Protocol G
  │     ├── S2 → Misconception Engine → return to appropriate Protocol
  │     ├── S3 → Protocol E
  │     ├── S4 → Prerequisite repair → Protocol A or B
  │     ├── S5 → Protocol H
  │     ├── S6 → Protocol F
  │     ├── S7 → Protocol G
  │     ├── S8 → Protocol C
  │     └── S9 → Protocol A
  │
PROTOCOL EXECUTION
  │
  ├── Protocol A
  │     ├── TA-A01 fails → Switch to telephone analogy → retry TA-A01
  │     ├── TA-A02 fails → Lower abstraction: use physical coin toss (random) vs. coin slot machine (guaranteed)
  │     ├── TA-A03 fails → Provide pre-filled table, ask student to identify which rows break the rule
  │     ├── TA-A04 fails → Return to TA-A02, rebuild. TA-A04 should not fail if A02 succeeded.
  │     ├── TA-A05 detects MC1 → MC1 Engine → return to TA-A05
  │     ├── TA-A06 fails (classifies sideways parabola as function) → Ask: "For x=1, list all y values." → Student discovers two values themselves
  │     └── Protocol A full failure (3+ actions fail) → Switch to Protocol F
  │
  ├── Protocol B
  │     ├── TA-B01 detects MC3 → MC3 Engine → return to TA-B01
  │     ├── TA-B03 fails → Return to TA-B01 and TA-B02. Have student overlay both diagrams. "What is the one difference?"
  │     ├── TA-B04 fails → Skip formal notation. Use only natural language for the session. Flag for notation review later.
  │     ├── TA-B06 fails on case 1 or 3 (valid functions) → MC3 or MC5 engine
  │     └── Protocol B full failure → Switch to Protocol A (lower CPA stage)
  │
  ├── Protocol C
  │     ├── TA-C01 fails (student cannot engage with daylight data) → Replace with coin weight: every coin of the same type weighs exactly the same → deterministic
  │     ├── TA-C02 fails → Use simpler contrast: name→phone_number (one name, one number) vs. phone_number→name (shared numbers possible)
  │     └── Protocol C full failure → Switch to Protocol A (more concrete)
  │
  ├── Protocol D
  │     ├── TA-D01 prediction game fails → Student cannot engage with prediction → Switch to Protocol E or A
  │     ├── TA-D03 detects MC1 → MC1 Engine
  │     └── Protocol D full failure → Student may not be an analytical learner despite initial classification. Switch to Protocol F.
  │
  ├── Protocol E
  │     ├── TA-E01 Category U + TA-E04 fails → Switch to Protocol A (student has less prior knowledge than assessed)
  │     ├── TA-E02 detects specific misconception → Route to relevant MC engine
  │     ├── TA-E03 confirms MC6 → MC6 Engine → return to TA-E03
  │     └── Protocol E full failure → Switch to Protocol B
  │
  ├── Protocol F
  │     ├── TA-F01 fails (student cannot engage with promise analogy) → Replace with "guarantee" frame: "A function is a guarantee. Pressing the elevator button guarantees one floor. A non-function makes no guarantee."
  │     ├── TA-F04 fails (algebraic bridge not landing) → Skip algebraic bridge. End at TA-F03 with the person→date function. Return to algebraic examples in next session.
  │     └── Protocol F full failure → This is the fallback protocol. Full failure here indicates very significant abstraction barriers. Escalate to multi-session plan.
  │
  ├── Protocol G
  │     ├── TA-G01 fails (student is not destabilised by the formula challenge, provides another formula) → Ask them to find a formula for a lookup table from a phone book. Harder challenge.
  │     ├── TA-G02 fails → Switch to Protocol E (guided questioning to rebuild the schema)
  │     └── Protocol G full failure → Student has strongly held S1 schema resistant to challenge. Protocol E is the next attempt with focus on explicit schema replacement.
  │
  └── Protocol H
        ├── TA-H01 fails (student cannot engage with quantifier language) → Reclassify as S3, not S5. Switch to Protocol B.
        ├── TA-H02 fails → Return to TA-B04 level and rebuild. S5 classification may have been premature.
        └── Protocol H full failure → Reclassify to S3. Start Protocol B.

MASTERY VERIFICATION FAILURE
  │
  ├── Fails item 1 (non-formula classification) → MC1 Engine → re-verify
  ├── Fails item 2 (VLT instead of single-valuedness justification) → MC6 Engine → re-verify
  ├── Fails item 3 (domain as contract) → TA-B05 or TA-C04 → re-verify
  ├── Fails item 4 (sideways parabola) → TA-A06 targeted → re-verify
  ├── Fails item 5 (non-formula generalisation) → MC1 Engine → re-verify
  └── Fails multiple items → Return to entry protocol. Session has not achieved mastery. Schedule second session.

SECOND SESSION SCHEDULING
  If first session ends without mastery on all 5 items:
  - Schedule spaced review at 48 hours
  - Entry point for second session: MC diagnostic only (DB-2 equivalent)
  - If MC cleared in second session, proceed to mastery verification directly
  - If MC active in second session, run targeted MC engine (not full protocol)
  - Do not repeat the same protocol on the same student twice — switch protocols
```

---

## PART 5 — MASTERY VERIFICATION SYSTEM

Mastery verification is NOT testing — it is teaching. Every wrong answer triggers a specific teaching response.

**Gate Condition:** ALL 5 items in 0.1 must be demonstrated. Partial mastery (3/5) is NOT mastery for this concept, because the 19 direct dependent concepts will all propagate through the gaps.

---

**MV-1: Non-Formula Classification**

Present: {1→apple, 2→book, 3→mountain, 4→tuesday}

Ask: "Is this a function?"

Response A (Correct, conceptual): "Yes, because each number has exactly one corresponding word."  
→ Teaching action: Advance to MV-2.

Response B (Correct, with formula-mention): "Yes... I think. There's no formula but it still has one output per input."  
→ Teaching action: Acknowledge the insight. "The 'I think' tells me you're still building confidence on non-formula functions. The reasoning is completely correct. Try generating your own example of a non-formula function." Advance to MV-2 only after student generates one.

Response C (Incorrect — not a function): "No, because there's no mathematical formula."  
→ Teaching action: MC1 engine. Do not advance until MC1 is resolved.

Response D (Uncertain, no attempt): Student cannot decide.  
→ Teaching action: Return to Protocol A entry. Full session has not produced mastery.

---

**MV-2: Single-Valuedness Justification**

Ask: "For your answer above — WHY is it a function?"

Response A (Single-valuedness): "Because every input (1, 2, 3, 4) has exactly one output."  
→ Teaching action: Advance to MV-3.

Response B (VLT): "Because if you graphed it, it would pass the vertical line test."  
→ Teaching action: MC6 engine. Ask: "You can't graph this easily — there are no numbers on the y-axis. So how would you check?" Force reasoning from single-valuedness. Do not advance until VLT is replaced by single-valuedness in the student's justification.

Response C (Pattern-based): "Because there seems to be a pattern."  
→ Teaching action: Ask: "What if there were no pattern? Would that stop it from being a function?" If student says yes: MC1. If student says no: ask "then why mention the pattern?" — redirect to single-valuedness.

---

**MV-3: Domain as Contract**

Present: A function with domain explicitly stated as positive integers only. Ask: "What is f(0)?"

Response A (Domain awareness): "0 is not in the domain, so f(0) is undefined — the function makes no promise for input 0."  
→ Teaching action: Advance to MV-4.

Response B (Formula substitution): Student substitutes 0 into an implied formula and gives an answer.  
→ Teaching action: "But is 0 in the domain?" Reteach domain using TA-B05 or TA-C04. The concept of domain as contract is not yet solid.

Response C (Confusion): "I don't know what the domain is."  
→ Teaching action: Re-run TA-B05 before MV-3. The vocabulary has not been established.

---

**MV-4: Hard Case — Sideways Parabola**

Present: x = y² in graph or as ordered pairs including (1,1) and (1,−1).

Ask: "Is this a function?"

Response A (Correct, single-valuedness): "No. For input x=1, I get both y=1 and y=−1. One input has two outputs — not a function."  
→ Teaching action: Advance to MV-5.

Response B (Correct, VLT): "No, it fails the vertical line test." Cannot explain why.  
→ Teaching action: Ask "what does 'fails the vertical line test' mean in terms of inputs and outputs?" If student cannot translate: MC6 engine before advancing.

Response C (Incorrect — classifies as function): Student says yes.  
→ Teaching action: Ask "For x=1, what are the possible y-values?" Let the student enumerate both. Then: "How many outputs does input x=1 have?" The contradiction emerges from the student's own work.

---

**MV-5: Non-Formula Generation**

Ask: "Create a function that has no formula and no pattern — just choose the outputs freely."

Response A (Creates valid function): Student creates a lookup table with one output per input, not following any formula.  
→ Teaching action: "Well done — that is a function because [student explains single-valuedness]. You have just demonstrated that functions and formulas are completely separate ideas."  
→ MASTERY ACHIEVED. All 5 items complete.

Response B (Creates a relation with repeated inputs): Student accidentally creates a non-function.  
→ Teaching action: "Check: does any input appear more than once in your table?" Student should self-correct. If not: TA-A03 remediation.

Response C (Refuses or says "it needs a formula"): MC1 still active.  
→ Teaching action: MC1 engine. MV-5 is not passed until a genuinely non-formulaic function is produced without prompting.

---

## PART 6 — CRITIQUE

Having completed the reference implementation, here is an honest assessment of what this asset still cannot do without AI reasoning.

**Remaining dependence on AI (what the rule engine cannot yet handle without further pre-computation):**

1. **Open-ended response parsing:** Teaching actions like TA-E04 (Guided Questioning) require classifying the student's natural language response into categories (R, F, V, U). The categorisation rules are defined, but a rule engine cannot currently parse arbitrary free text. Current mitigation: constrain student responses to multiple-choice or structured formats where possible, and flag open-ended responses for AI classification.

2. **Analogy failure detection:** In Protocol F, "the promise doesn't land" is detected by student facial expression, hesitation, or non-sequitur responses — signals that a rule engine cannot parse. Mitigation: add structured check-in questions after each analogy step ("Does this make sense so far? On a scale of 1–3") and route based on number.

3. **Schema contamination from school:** Some students arrive with institutionally reinforced misconceptions (taught the VLT as THE definition by a teacher, repeated over years). The depth of the MC6 engine designed here may be insufficient for students with multi-year VLT-first instruction. These students may require the protocol to be extended with explicit "the VLT is derived from, not equal to, the definition" statements and exercises where VLT is deliberately inapplicable.

4. **Emotional state detection:** Protocol selection matrix includes S6 (low confidence) and S7 (high confidence), but these are self-reported in DB-3 — not observed. A student with low confidence may report 3/5 to avoid seeming weak. Mitigation: add a calibration task before DB-3 (ask the student to solve an easy problem they are guaranteed to get right, then a harder one — the speed of response on the easy one versus the hard one is a proxy for confidence).

**Missing teaching intelligence (not yet in this asset):**

1. **Visual modality:** This asset is entirely verbal and diagrammatic. A significant fraction of students would benefit from animated function machines (input enters, rule processes, one output emerges — visually), interactive arrow-diagram builders, and simulation of the broken vending machine. The visual_teaching_suggestions in the current schema cannot specify INTERACTIVE behavior — only descriptions. Specifying interactive visual teaching actions is a future asset extension.

2. **Spaced repetition schedule:** The asset specifies "schedule review at 48 hours" on failure but does not specify the full spaced repetition timeline for successful mastery. The Educational Brain should eventually encode: first review at 48 hours, second at 7 days, third at 30 days — with specific probe questions for each review interval.

3. **Cultural adaptation:** The vending machine (Protocol A) and the taxi (Protocol C) assume cultural contexts. For learners in regions without these, alternatives are named in the Teaching Moves but not fully specified. A complete asset for global deployment would include 3–4 concrete anchors per protocol for different cultural contexts.

4. **Prerequisite repair protocols:** PD-1 through PD-3 specify minimum scaffolding if prerequisites are missing, but do not specify the full teaching sequence for repairing math.found.set-theory or math.found.variable. Those repairs are separate assets that are not yet at this quality level.

**Missing student states:**

1. **Students with dyscalculia:** Specifically, students who have number-processing difficulties may struggle with any input-output examples involving numbers. This asset assumes number comfort. A non-numerical function implementation (colours → shapes, letters → words, music notes → instruments) is not yet specified.

2. **Students who have completed calculus (over-advanced students):** A student who has used functions extensively in calculus may be bored by Protocol A and resistant to Protocol H because they believe they already know this. This student needs a "deepening" protocol — confronting them with the formal measure-theoretic definition or Bourbaki's structural definition — not a remediation protocol.

3. **Group instruction adaptation:** All protocols assume one-to-one tutoring. In a classroom with 30 students at different states, the adaptation engine cannot be executed per-student simultaneously. Group instruction protocols are not yet designed.

---

## PART 7 — FINAL ESTIMATION

### Total Teaching Actions Required for 99% Student Coverage

The following is an estimate of the TOTAL Teaching Action library ultimately required for math.func.function-concept to successfully teach 99% of students — including all adaptations, fallbacks, misconception repairs, cultural variants, modalities, and extensions.

| Category | Actions Designed Here | Estimated Total Needed | Gap |
|---|---|---|---|
| Entry Diagnostic | 3 | 6 | +3 (calibration tasks, confidence proxies) |
| Prerequisite Repair | 3 | 12 | +9 (full repair for each of 3 prereqs) |
| Protocol A (Concrete) | 6 | 10 | +4 (cultural variants, dyscalculia track) |
| Protocol B (Visual) | 6 | 10 | +4 (interactive variants, digital-first track) |
| Protocol C (Real-World) | 6 | 12 | +6 (8 industry-specific anchors) |
| Protocol D (Pattern) | 4 | 6 | +2 (data-science extensions) |
| Protocol E (Socratic) | 4 | 8 | +4 (full branching per student response category) |
| Protocol F (Analogy) | 4 | 8 | +4 (cultural analogy variants) |
| Protocol G (Counterexample) | 3 | 6 | +3 (domain extension cases) |
| Protocol H (Formal) | 3 | 8 | +5 (measure theory, Bourbaki, ZFC framing) |
| Misconception Engine (6) | 6×5=30 | 6×10=60 | +30 (full recovery trees, escalation paths) |
| Mastery Verification | 5 | 10 | +5 (alternative questions per item) |
| Adaptation/Fallback | ~20 | 40 | +20 (full tree with all branches) |
| Spaced Review | 0 | 15 | +15 (3 intervals × 5 probe types) |
| Visual/Interactive | 0 | 20 | +20 (animated function machines, simulations) |
| Cross-Cultural Variants | 0 | 12 | +12 (4 cultural contexts × 3 protocols) |
| Group Instruction | 0 | 10 | +10 (classroom-adapted versions) |
| Extension (Over-Advanced) | 0 | 8 | +8 (formal deepening protocols) |
| **TOTAL** | **~108** | **~261** | **+153** |

**Conclusion:** This reference implementation contains approximately 108 Teaching Actions covering ~70% of the student population. Full 99% coverage requires approximately 261 Teaching Actions, with the remaining 153 primarily in cultural variants, interactive modalities, spaced review, and group instruction contexts.

The 30% not covered by this implementation are: students requiring cultural context adaptation (5%), students with specific learning differences (3%), students requiring group instruction (10%), students who need extension rather than remediation (5%), and the spaced review population (7%).

---

### Can This Concept Serve as the Canonical Blueprint?

**Yes — with four explicit conditions that must be resolved before scaling to the 18 Tier A concepts.**

**Condition 1: Response classification is currently underspecified.**  
The Socratic protocol (E) and the open-elicitation actions require classifying student natural language responses into categories. This reference implementation names the categories (R, F, V, U in TA-E01) but does not provide an exhaustive set of example student utterances for each category. Before scaling, each protocol entry classification system needs 10–20 example student phrases per category so that a rule engine (or a novice teacher) can reliably classify the student's state without AI judgment.

**Condition 2: Misconception co-occurrence is not handled.**  
A student can have MC1 AND MC3 simultaneously — and the current engine handles them sequentially (fix MC1, re-check, fix MC3). But for some student states (S1+S7), two misconceptions interact: the student is confident in a wrong multi-layered schema. The sequential repair path is slower and less effective than a combined "schema replacement" protocol designed for multi-misconception students. This needs to be designed for Tier A assets before launch.

**Condition 3: No interactive/visual Teaching Actions are specified.**  
This reference implementation contains 0 interactive or animated Teaching Actions. The Philosophy document's CPA framework (Concrete → Pictorial → Abstract) cannot be fully honoured in digital instruction without specifying what the Pictorial stage LOOKS LIKE interactively. The 20 visual/interactive Teaching Actions estimated in the gap analysis must be designed — ideally as a companion Visual Protocol for each Tier A concept — before the Educational Brain can claim the Pictorial stage is covered.

**Condition 4: Spaced review design is absent.**  
Mastery verification (Part 5) addresses the end of the first session. But 40–60% of what is learned in the first session is lost within 48 hours without a retrieval practice event. The spaced review protocol — specific probe questions at 48 hours, 7 days, and 30 days, with targeted reinstatement protocols if mastery decays — is the highest-leverage addition not yet in this implementation. It should be designed as a standard section of every Tier A asset before launch.

---

**Final assessment:**

The 18 Tier A concepts together cover 98–99.9% of every subject KG transitively. If each of those 18 assets reaches the level of this reference implementation — not the current 4.1/10 level but the full teaching protocol level designed here — the Educational Brain will have sufficient intelligence at the gateway layer to teach effectively for the vast majority of students, even if every downstream concept remains at placeholder level.

The additional 153 Teaching Actions (cultural variants, interactive modalities, spaced review) represent the gap between "effective for 70% of students" and "effective for 99% of students." They are important. But they are not launch-blocking.

**The canonical blueprint is ready. The Educational Brain has its first real neuron.**

The next question is: what does it cost to fill the remaining 17 Tier A concepts to this standard?

At approximately 108 Teaching Actions per concept, and 18 concepts:
- Total Teaching Actions needed for Tier A coverage (70%+ of students): ~1,944
- Total Teaching Actions needed for Tier A coverage (99% of students): ~4,698
- Total Teaching Actions eventually needed for all 50 priority concepts: ~13,050

That is the scale of the Educational Brain. Not 730 assets. 13,000 Teaching Actions. Each one answering: What happens? Why? When? When not? What evidence? What next?

That is what "think in decades" means.

---

*Reference implementation complete. This document governs the standard for all Tier A concept authoring.*  
*Governing philosophy: `docs/curriculum/TEACHING_ASSET_PHILOSOPHY.md`*  
*Next concept: Pending decision on which of the 17 remaining Tier A concepts is authored second.*
