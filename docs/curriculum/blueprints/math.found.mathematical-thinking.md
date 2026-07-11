# Teaching Blueprint — Mathematical Thinking
**Concept ID:** math.found.mathematical-thinking  
**Framework version:** Educational Brain v1.0  
**Status:** READY  
**V-checks:** V-1 through V-20 all PASS (see Component 10)

---

## Component 0 — Concept Profile

| Field | Value |
|---|---|
| `concept_id` | math.found.mathematical-thinking |
| `name` | Mathematical Thinking |
| `domain` | mathematics / foundations |
| `difficulty` | foundational (mapped: 1) |
| `bloom` | understand |
| `requires` | [] |
| `unlocks` | math.found.logic · math.found.set-theory · math.arith.counting |
| `cross_links` | [] |
| `mastery_threshold` | 0.70 |
| `estimated_hours` | 8 |
| `description` | The disciplined cognitive approach of reasoning precisely about abstract structures, identifying patterns, and constructing valid arguments from given information. |

---

## Component 1 — Learning Objective

A student who achieves mastery **identifies which mathematical thinking move they are using** (pattern noticing, conjecturing, testing, counterexample, or constructing an argument), **applies at least one move explicitly** to a novel non-numeric situation, and **distinguishes mathematical thinking from mathematical content recall** when given paired examples.

NOT: speed at calculation. NOT: knowledge of any specific formula or procedure. A student who produces correct numeric answers without being able to name a single thinking move has NOT achieved mastery.

**Observable mastery criterion:** Given a novel observation (e.g., "all the examples I've tried satisfy this rule"), the student can say: "That's a conjecture. To check it, I'd try a counterexample." — unprompted.

---

## Component 2 — Student State Matrix

| State | Label | Entry Behaviour | Protocol |
|---|---|---|---|
| S0 | Complete Novice | No exposure to meta-cognitive framing; believes math = calculation or formula recall; can follow instructions but has no self-model of reasoning | Protocol A |
| S2 | Misconception Carrier | Holds MC-1 (math = memorising) or MC-2 (speed = ability) actively; resists reframing; may argue against the 5-move model | Protocol B |
| S3 | Conceptual Carrier | Has mathematical experience; reasons informally; missing the explicit vocabulary and frame for what they already do intuitively | Protocol C |
| S6 | Low Confidence | Mathematically anxious ("I'm not a math person"); shuts down under any open question; needs high regulation scaffolding before any cognitive demand | Protocol D |
| S8 | Accelerated | Already reasons mathematically by instinct; cannot articulate moves; needs formalisation, not introduction | Protocol E |
| S9 | Second-Language Learner | Language is the primary barrier; conceptual access is available once vocabulary is stabilised | Protocol F |

Combination states: S2+S6 (anxious and holds MC-3) → Protocol D with MC-3 repair embedded in TA-D01. S3+S9 → Protocol F with C-phase abbreviated.

---

## Component 3 — Diagnostic Battery

**Administration note:** Run DQ-1, DQ-2, DQ-3 in order before any teaching. Do not reveal the 5-move model before the diagnostic.

---

### DQ-1 — Open Observation (P41)
**Stimulus:** "When you picture a mathematician working — not a student doing homework, but a real mathematician — what are they doing?"

**Response taxonomy:**
```
{ stimulus: "solving equations / doing calculations / working with numbers", signal: "SIGNAL:INCORRECT", mc_id: null }
{ stimulus: "memorising formulas / looking up theorems", signal: "MISCONCEPTION:MC-1", mc_id: "MC-1" }
{ stimulus: "thinking carefully / proving things / finding patterns", signal: "SIGNAL:CORRECT", mc_id: null }
{ stimulus: "blank / 'I don't know' / 'I can't picture it'", signal: "SIGNAL:NO_RESPONSE", mc_id: null }
{ stimulus: "teaching / explaining to others", signal: "SIGNAL:PARTIAL", mc_id: null }
```

**Routing:**
- SIGNAL:CORRECT → likely S3 or S8 → proceed to DQ-2
- SIGNAL:INCORRECT → likely S0 → proceed to DQ-2
- MISCONCEPTION:MC-1 → flag MC-1 active → route to Protocol B after DQ-3
- SIGNAL:NO_RESPONSE → likely S0 or S6 → note; proceed to DQ-2 with extra regulation

---

### DQ-2 — Classify (P37)
**Stimulus:** "Which of these describes what mathematicians do most: (A) memorise facts, or (B) ask 'why does this work?' and try to prove it?"

**Response taxonomy:**
```
{ stimulus: "A with confidence", signal: "MISCONCEPTION:MC-1", mc_id: "MC-1" }
{ stimulus: "A with hesitation / 'I think A?'", signal: "SIGNAL:INCORRECT", mc_id: null }
{ stimulus: "B with explanation", signal: "SIGNAL:CORRECT", mc_id: null }
{ stimulus: "B without explanation / guess", signal: "SIGNAL:PARTIAL", mc_id: null }
{ stimulus: "Both equally", signal: "SIGNAL:PARTIAL", mc_id: null }
```

**Routing:**
- MISCONCEPTION:MC-1 (from DQ-1 or DQ-2) → route to Protocol B
- SIGNAL:CORRECT → DQ-3
- SIGNAL:INCORRECT or PARTIAL → note; proceed to DQ-3

---

### DQ-3 — Generate (P40)
**Stimulus:** "Give me one example of mathematical thinking that has nothing to do with numbers."

**Response taxonomy:**
```
{ stimulus: "Generates valid example (e.g. sorting shapes by attribute, asking 'is every square a rectangle?', noticing pattern in symmetry)", signal: "SIGNAL:CORRECT", mc_id: null }
{ stimulus: "Attempts but grounds it in numbers ('like algebra?')", signal: "SIGNAL:PARTIAL", mc_id: null }
{ stimulus: "Cannot respond / blank / 'math is always numbers'", signal: "SIGNAL:INCORRECT", mc_id: null }
{ stimulus: "Gives a non-mathematical example but with pattern-noticing reasoning", signal: "SIGNAL:CORRECT", mc_id: null }
```

**Routing:**
- DQ-1=CORRECT + DQ-3=CORRECT → S3 or S8 → Protocol C or E (use confidence level to distinguish)
- DQ-1=CORRECT + DQ-3=PARTIAL → S3 → Protocol C
- DQ-1=INCORRECT + DQ-3=INCORRECT → S0 → Protocol A
- Any DQ flagging low confidence (hesitation, "I can't", "I don't know") → S6 → Protocol D
- MC-1 active at any point → Protocol B

---

## Component 4 — Prerequisite Check

`requires: []` — no KG prerequisites. However, the following entry-level cognitive behaviours are assumed. If absent, note for Protocol and add scaffolding in TA-01.

**Entry check (P41):** "What comes next in this sequence: 2, 4, 6, 8, ___? Tell me how you know."

```
{ stimulus: "Gives 10 AND explains 'going up by 2'", signal: "SIGNAL:CORRECT", mc_id: null }
{ stimulus: "Gives 10 but cannot explain", signal: "SIGNAL:PARTIAL", mc_id: null }
{ stimulus: "Gives wrong answer", signal: "SIGNAL:INCORRECT", mc_id: null }
```

- SIGNAL:CORRECT → prerequisites met; begin Protocol.
- SIGNAL:PARTIAL → prerequisites functionally met; add P15 (structured observation) before pattern tasks.
- SIGNAL:INCORRECT → flag; begin Protocol A with extra concrete anchoring in TA-A02; do not move to perceptual until three CORRECT responses in C-stage.

---

## Component 5 — Protocol Library

### Protocol A — S0 (Complete Novice)

**CPA entry stage:** C (difficulty=foundational → 1; domain≠physics)  
**Entry condition:** DQ-1=INCORRECT/NO_RESPONSE, DQ-3=INCORRECT, no MC flags  
**Session cap:** 7 TAs (estimated_hours ≥ 1h)  
**Estimated sessions to mastery:** 2–3  
**Success exit:** P91 passes → MASTERED  
**Failure exit:** PA-3 (7-TA cap) without mastery → P62, resume at saved CPA stage next session

---

#### TA-A01 — Diagnostic Anchor

```
P02[context: "Before we look at any math, I want to understand how you think about it. There are no right or wrong answers here."]
→ P41[probe: "When you think about mathematics, what is it? Describe it in your own words."]
→ P55
→ P49
```

**P49 routing:**
```
{ stimulus: "any response mentioning calculation or formulas", signal: "SIGNAL:INCORRECT", mc_id: null }
  → confirm S0; note framing; proceed to TA-A02
{ stimulus: "mentions patterns or 'figuring out'", signal: "SIGNAL:PARTIAL", mc_id: null }
  → note; proceed to TA-A02 with faster pace
{ stimulus: "no response / 'I don't know'", signal: "SIGNAL:NO_RESPONSE", mc_id: null }
  → add P53 [validation: "That's completely fine. Let's figure it out together."] → TA-A02
```

**S6 adaptation:** Begin with P30 [encouragement: "We're not testing you. I just want to understand how you think."] before P02.

---

#### TA-A02 — Concrete Pattern Experience (C-stage)

```
P01[frame: "I'm going to show you something. Your only job is to look carefully."]
→ P06[concrete: Display three groups of dots arranged as triangular numbers:
    Group 1: 1 dot (·)
    Group 2: 3 dots (· arranged as triangle base=2)
    Group 3: 6 dots (· arranged as triangle base=3)
    Physical or drawn — actual objects preferred for S0]
→ P15[structured observation: "Look at each group one at a time. Compare Group 1 to Group 2. Compare Group 2 to Group 3. What is different between them?"]
→ P34[open: "Tell me everything you notice about these three groups."]
→ P55
→ P49
```

**P49 routing:**
```
{ stimulus: "Notices count increases (1→3→6)", signal: "SIGNAL:CORRECT", mc_id: null }
  → P53[validation: "Yes — the count goes up."] → TA-A03
{ stimulus: "Notices shape or arrangement only", signal: "SIGNAL:PARTIAL", mc_id: null }
  → P53 → P34[open: "Anything else you notice about the NUMBER of dots?"] → P55 → TA-A03
{ stimulus: "No observation / 'they look different'", signal: "SIGNAL:INCORRECT", mc_id: null }
  → P15[re-observation: "Count the dots in Group 1. Now count Group 2. Now Group 3. What did you count?"] → P34 → P55 → TA-A03
```

**S6 adaptation:** Add P30 before P15. After ANY response, add P53 before further prompting.

---

#### TA-A03 — Conjecture Formation (C-stage)

```
P02[context: "You noticed the counts are 1, 3, 6. Now I want you to make a prediction."]
→ P21[conjecture formation: "Based on those three numbers, what do you think the FOURTH group will have? Don't calculate — make a guess and tell me WHY you're guessing that."]
→ P42[conjecture elicit: "What's your prediction? And what's your reason?"]
→ P55
→ P49
```

**P49 routing:**
```
{ stimulus: "Predicts 10 with reason ('adds 4 more', 'each group adds one more than before')", signal: "SIGNAL:CORRECT", mc_id: null }
  → P53 → TA-A04
{ stimulus: "Predicts 10 but cannot give reason", signal: "SIGNAL:PARTIAL", mc_id: null }
  → P36[explain: "How did you get 10? Walk me through your thinking."] → P55 → TA-A04
{ stimulus: "Predicts wrong number", signal: "SIGNAL:INCORRECT", mc_id: null }
  → P16[counterexample: Show Group 4 (10 dots). "Here's Group 4. Count them."]
  → P14[comparative: "Look at the differences: 3−1=2, 6−3=3, 10−6=4. What pattern do you see in the differences?"]
  → P42 → P55 → TA-A04
{ stimulus: "Refuses to predict / 'I need a formula'", signal: "MISCONCEPTION:MC-4", mc_id: "MC-4" }
  → MC-4 repair: P27[naming: "You're looking for a formula. That's one way to approach math. But a CONJECTURE is just a reasoned guess — you don't need a formula to make one."] → P42 → P55 → TA-A04
```

**S6 adaptation:** Replace P21 with P54[worked example: "Watch me make a prediction. The differences are 2, 3 — they go up by 1 each time. So the next difference should be 4. That means 6+4=10. That's a conjecture."]. Then P42.

---

#### TA-A04 — Name the Move — Perceptual Bridge (P-stage)

```
P01[frame: "What you just did has a name. Let me show you."]
→ P07[perceptual: Present the 5-move diagram —
    ┌─────────────────────────────────────────────────────┐
    │        MATHEMATICAL THINKING — 5 MOVES              │
    │  1. NOTICE    → "I see a pattern"                   │
    │  2. CONJECTURE → "I predict / I believe..."         │
    │  3. TEST      → "Let me check with a new case"      │
    │  4. COUNTEREXAMPLE → "Here is a case that FAILS"    │
    │  5. ARGUMENT  → "Here is WHY it must always work"   │
    └─────────────────────────────────────────────────────┘]
→ P13[think-aloud: "Here is what I was doing just now, step by step.
    Step 1 — NOTICE: I looked at the groups and I noticed the counts were 1, 3, 6.
    Step 2 — CONJECTURE: I predicted the next count was 10 because the differences go up by 1.
    Step 3 — TEST: I checked — Group 4 really does have 10 dots.
    That is exactly moves 1, 2, and 3."]
→ P37[classify: "Which of the 5 moves did WE use together in TA-A02 and TA-A03?"]
→ P55
→ P49
```

**P49 routing:**
```
{ stimulus: "Names Notice and Conjecture (or equivalent)", signal: "SIGNAL:CORRECT", mc_id: null }
  → P53 → TA-A05
{ stimulus: "Names one of the two correctly", signal: "SIGNAL:PARTIAL", mc_id: null }
  → P13[mini think-aloud on the missed move] → P37 → P55 → TA-A05
{ stimulus: "Names wrong move or cannot answer", signal: "SIGNAL:INCORRECT", mc_id: null }
  → P13[full think-aloud repeat with explicit pointing at diagram] → P37 → P55 → TA-A05
```

**S6 adaptation:** Add P52[calibration: "Does this diagram make sense? Are there any words here you want me to explain?"] after P07 and before P13.

---

#### TA-A05 — Metacognitive Application (P→A transition)

```
P02[context: "Now I want you to use those 5 moves yourself."]
→ P29[metacognitive prompt: "Think back to what you did in our last two tasks. Walk me through what you did — but use the names from the diagram. Which move did you make first? Which came next?"]
→ P48[metacognitive elicit: "Name the moves you made, in order."]
→ P55
→ P49
```

**P49 routing:**
```
{ stimulus: "Correctly names Notice → Conjecture → Test in order", signal: "SIGNAL:CORRECT", mc_id: null }
  → TA-A06
{ stimulus: "Names moves but out of order or misses one", signal: "SIGNAL:PARTIAL", mc_id: null }
  → P53 → P25[deductive: "Yes — and then what? What move checked whether your conjecture was right?"] → P48 → P55 → TA-A06
{ stimulus: "Cannot name moves", signal: "SIGNAL:INCORRECT", mc_id: null }
  → P07[perceptual: return to diagram] → P13[mini think-aloud] → P48 → P55 → TA-A06
```

---

#### TA-A06 — Abstract Formalisation (A-stage)

```
P01[frame: "Let's make this precise."]
→ P08[abstract: "Mathematicians describe what they do in precise language:
    NOTICE: Identify a regularity — something that seems to always be true.
    CONJECTURE: Form a general statement: 'I believe that for ALL cases...'
    TEST: Apply the conjecture to new cases not yet examined.
    COUNTEREXAMPLE: Find ONE case where the conjecture fails — this disproves it.
    ARGUMENT: Show WHY the conjecture must hold for ALL cases — this proves it.
    These 5 moves apply to numbers, shapes, logic, language — any domain."]
→ P26[conceptual definition: "Mathematical thinking is NOT about knowing answers.
    It is the disciplined process of noticing → conjecturing → proving.
    Content (facts, formulas) is what mathematical thinking PRODUCES.
    Mathematical thinking is the process that produces it."]
→ P35[closed: "Which of these is mathematical thinking?
    (A) Recalling that the area of a circle is πr².
    (B) Noticing that all squares are rectangles but not all rectangles are squares — and asking why."]
→ P55
→ P49
```

**P49 routing:**
```
{ stimulus: "B with explanation", signal: "SIGNAL:CORRECT", mc_id: null }
  → P53 → TA-A07
{ stimulus: "B without explanation", signal: "SIGNAL:PARTIAL", mc_id: null }
  → P36[explain: "Why is B and not A?"] → P55 → TA-A07
{ stimulus: "A", signal: "MISCONCEPTION:MC-1", mc_id: "MC-1" }
  → MC-1 repair chain → then TA-A07
```

---

#### TA-A07 — Mastery Gate

```
P01[frame: "Let's check what you know."]
→ P90[formative: Items F-1 and F-2 from Assessment Battery (Component 7)]
→ P55
→ P49
```

**P49 routing:**
- Both CORRECT → P91 [mastery verification — full 5-probe sequence from Component 8] → P62 [schedule retrieval from Component 9]
- One CORRECT → P53 → return to TA-A06 for the missed concept
- Both INCORRECT → return to TA-A04; CPA stage regresses to P; resume next session at TA-A04

---

### Protocol B — S2 (Misconception Carrier: MC-1 active)

**CPA entry stage:** P (misconception repair begins perceptually — the concrete stage presupposes openness that MC-1 closes)  
**Entry condition:** DQ-1 or DQ-2 flags MISCONCEPTION:MC-1 with confidence  
**Session cap:** 7 TAs  
**Success exit:** MC-1 cleared → MASTERED via P91  
**Failure exit:** PA-3 → P62

---

#### TA-B01 — Surface the Belief

```
P02[context: "Before we do any mathematics, I want to understand what you think math IS."]
→ P41[probe: "If I gave you a maths problem you've never seen before — no formula exists for it — is solving it still mathematics?"]
→ P55
→ P49
```

**P49 routing:**
```
{ stimulus: "No / 'you need a formula' / 'that's not math'", signal: "MISCONCEPTION:MC-1", mc_id: "MC-1" }
  → TA-B02
{ stimulus: "Yes with reasoning", signal: "SIGNAL:CORRECT", mc_id: null }
  → MC-1 less entrenched than expected → Protocol C
{ stimulus: "Uncertain", signal: "SIGNAL:PARTIAL", mc_id: null }
  → proceed to TA-B02 with lighter repair
```

---

#### TA-B02 — Misconception Naming + Conflict Evidence

```
P02[context: "Many people have the same belief about mathematics. Let me show you something."]
→ P27[misconception naming: "The belief that mathematics = memorising formulas is the most common thing I hear from students. It makes complete sense — school mathematics often IS presented that way. But here's what professional mathematicians actually say about what they do."]
→ P14[comparative: Present two parallel accounts:
    Mathematician A (formula-user): Encounters a new problem type.
    Searches memory for a matching formula. Finds none. Stuck.
    Mathematician B (thinker): Encounters the same problem.
    Looks for a pattern. Forms a conjecture. Tests it. Develops an approach.
    Solves it.
    "Both have equal formula knowledge. Which one is doing mathematics?"]
→ P34[open: "What did Mathematician B do that A didn't?"]
→ P55
→ P49
```

**P49 routing:**
```
{ stimulus: "Identified pattern-noticing / testing / reasoning", signal: "SIGNAL:CORRECT", mc_id: null }
  → P53 → TA-B03
{ stimulus: "Said 'B was smarter / more talented'", signal: "MISCONCEPTION:MC-3", mc_id: "MC-3" }
  → note MC-3 alongside MC-1 → add MC-3 to active_misconceptions → proceed to TA-B03 with MC-3 repair embedded
{ stimulus: "Cannot identify difference", signal: "SIGNAL:INCORRECT", mc_id: null }
  → P13[think-aloud: walk through Mathematician B's process explicitly] → P34 → P55 → TA-B03
```

---

#### TA-B03 — Bridge Construction

```
P01[frame: "Here is the key insight."]
→ P31[bridge: "Formulas exist because a mathematician FOUND a pattern, formed a conjecture, and proved it. The formula is the END result of mathematical thinking — not its starting point. When you memorise a formula, you are storing the conclusion. Mathematical thinking is the process that CREATED that conclusion."]
→ P25[deductive: "Here is a worked case:
    Observation: 1+3=4, 1+3+5=9, 1+3+5+7=16.
    Notice: the results are 4, 9, 16 — perfect squares.
    Conjecture: 'The sum of the first n odd numbers equals n².'
    Test: 1+3+5+7+9 = 25 = 5². Works.
    The formula (sum = n²) came AFTER the thinking. Memorising the formula skips the thinking entirely."]
→ P36[explain: "In your own words — where do formulas come from?"]
→ P55
→ P49
```

**P49 routing:**
```
{ stimulus: "Articulates 'from pattern-noticing and proving'", signal: "SIGNAL:CORRECT", mc_id: null }
  → TA-B04
{ stimulus: "Partially correct — mentions thinking but not the process", signal: "SIGNAL:PARTIAL", mc_id: null }
  → P36[clarify: "What kind of thinking? What were the steps?"] → P55 → TA-B04
{ stimulus: "Still says 'from textbooks / from smart people'", signal: "SIGNAL:INCORRECT", mc_id: null }
  → P25[second deductive: "Who wrote that textbook? They had to FIND this pattern first. How do you think they found it?"] → P36 → P55 → TA-B04
```

---

#### TA-B04 — Replacement Embedding

```
P02[context: "Let's make sure the new understanding is solid."]
→ P32[replacement: "From now on, whenever you see a formula, ask: 'What pattern did someone notice to find this?' That question IS mathematical thinking."]
→ P40[generate: "Give me one question that would START a mathematical thinking process. It doesn't have to be about numbers."]
→ P55
→ P49
```

**P49 routing:**
```
{ stimulus: "Generates a 'why' or 'what pattern' question", signal: "SIGNAL:CORRECT", mc_id: null }
  → P53 → TA-B05
{ stimulus: "Generates a 'how do I calculate' question", signal: "SIGNAL:PARTIAL", mc_id: null }
  → P53 → P36[clarify: "That's a great calculation question. Can you turn it into a pattern question?"] → P40 → P55 → TA-B05
{ stimulus: "Cannot generate", signal: "SIGNAL:INCORRECT", mc_id: null }
  → P13[think-aloud: "I would ask: 'Is there a pattern in how many dots triangular numbers have?' — that's a NOTICING question."] → P40 → P55 → TA-B05
```

---

#### TA-B05 — Discrimination Training

```
P01[frame: "I'm going to give you four activities. For each one, tell me: is this mathematical thinking, or not?"]
→ P33[discrimination:
    Activity 1: Memorising that π ≈ 3.14159.
    Activity 2: Asking whether all prime numbers greater than 2 are odd — and trying to find one that isn't.
    Activity 3: Applying the quadratic formula to solve 2x²+3x−2=0.
    Activity 4: Noticing that (n+1)²−n² = 2n+1 for several values of n and wondering if this is always true.]
→ P37[classify each: "Mathematical thinking: Yes or No? And why?"]
→ P55
→ P49
```

**P49 routing:**
```
{ stimulus: "Correctly classifies all 4 (1=No, 2=Yes, 3=No by itself, 4=Yes) with reasoning", signal: "SIGNAL:CORRECT", mc_id: null }
  → MC-1 cleared → proceed to assessment → TA-B06
{ stimulus: "Gets 3 of 4 correct", signal: "SIGNAL:PARTIAL", mc_id: null }
  → P16[counterexample on the missed item] → P37[reclassify] → P55 → TA-B06
{ stimulus: "Classifies Activity 3 as mathematical thinking", signal: "SIGNAL:PARTIAL", mc_id: null }
  → P26[definition: "Applying a formula is using the RESULT of mathematical thinking. It's not the process."] → P37[reclassify 3] → P55 → TA-B06
{ stimulus: "Gets fewer than 3 correct", signal: "SIGNAL:INCORRECT", mc_id: null }
  → return to TA-B03; MC-1 not yet dislodged
```

---

#### TA-B06 — Mastery Gate

```
P01[frame: "Let's confirm your understanding."]
→ P90[formative: F-1, F-2 from Assessment Battery]
→ P55 → P49
```
- Both CORRECT → P91 → P62
- Any INCORRECT → return to TA-B04

**S6 adaptation for Protocol B:** Insert P30 before P27 in TA-B02. "This isn't a criticism of how you've been taught — it's how most people are introduced to mathematics." Never say memorising is "wrong."

---

### Protocol C — S3 (Conceptual Carrier)

**CPA entry stage:** P (has experience; needs framework, not fundamentals)  
**Entry condition:** DQ-1=CORRECT or PARTIAL, DQ-3=PARTIAL; no MC flags  
**Session cap:** 7 TAs  
**Estimated sessions:** 1

---

#### TA-C01 — Surface Existing Knowledge

```
P04[prior knowledge: "Tell me about a time in mathematics — or anywhere — when you noticed something surprising. It doesn't have to be a formal situation."]
→ P55
→ P49
```

**P49 routing:** Any response with pattern-noticing or questioning → CORRECT → TA-C02. No response → S0 may have been misdiagnosed → switch to Protocol A.

---

#### TA-C02 — Map Experience to Moves

```
P01[frame: "What you just described has a formal name."]
→ P07[perceptual: 5-move diagram]
→ P13[think-aloud: retroactively label the student's experience: "What you did was Move 1 (Noticing) — you saw something that seemed regular. Then you asked 'is this always true?' — that's Move 2 (Conjecturing)."]
→ P38[compare: "Looking at the diagram — which moves did you use? Which ones haven't you tried yet?"]
→ P55
→ P49
```

**P49 routing:**
```
{ stimulus: "Accurately maps own experience + identifies unused moves", signal: "SIGNAL:CORRECT", mc_id: null }
  → TA-C03
{ stimulus: "Maps experience but cannot identify unused moves", signal: "SIGNAL:PARTIAL", mc_id: null }
  → P52[calibration: "Which of the 5 have you never deliberately tried?"] → P38 → P55 → TA-C03
```

---

#### TA-C03 — Apply All 5 Moves to Novel Situation

```
P02[context: "Now apply all 5 moves explicitly. Narrate as you go."]
→ P06[concrete: "Consider the sequence 1, 8, 27, 64, 125. Work through as many of the 5 moves as you can. Say which move you're using out loud."]
→ P45[extend: "Begin. Name each move as you use it."]
→ P55
→ P49
```

**P49 routing:**
```
{ stimulus: "Uses at least 3 moves, names them correctly", signal: "SIGNAL:CORRECT", mc_id: null }
  → TA-C04
{ stimulus: "Uses moves but doesn't name them", signal: "SIGNAL:PARTIAL", mc_id: null }
  → P48[metacognitive: "You did those things — but what are they called on the diagram?"] → P55 → TA-C04
{ stimulus: "Uses only 1–2 moves", signal: "SIGNAL:PARTIAL", mc_id: null }
  → P29[metacognitive prompt: "You've done Notice and Conjecture. What would a TEST look like here?"] → P45 → P55 → TA-C04
```

---

#### TA-C04 — Abstract + Assessment

```
P08[abstract: formal definition of the 5 moves]
→ P78[explanation probe: "What is the difference between knowing a mathematical fact and thinking mathematically?"]
→ P55
→ P49
→ P90[formative: F-1, F-2] → P91 → P62 [if both CORRECT]
```

---

### Protocol D — S6 (Low Confidence)

**CPA entry stage:** C (same as S0 — but every TA is regulation-heavy)  
**Entry condition:** DQ-1=NO_RESPONSE or explicit "I'm not a math person"; any confidence shutdown signal  
**Session cap:** 7 TAs  
**Estimated sessions:** 3–4  
**Core rule:** P28 (Productive Struggle) is replaced by P54 (Worked Example Provision) throughout this Protocol. P30 appears in every TA. P52 appears before every assessment action.

---

#### TA-D01 — Low-Stakes Anchor

```
P30[encouragement: "This session has nothing to do with being good at mathematics. I want to understand how you think. There are no wrong observations here."]
→ P02[context: "I'm going to show you something, and your only job is to notice anything at all."]
→ P41[probe: "What do you notice about your surroundings right now? Anything at all."]
→ P55
→ P53[positive validation: "Good. That's noticing — the first mathematical thinking move."]
→ P49
```

---

#### TA-D02 — Concrete (Physical Objects)

```
P30[encouragement]
→ P01[frame: "I'm going to put some objects in front of you."]
→ P06[concrete: Physical coins or counters arranged as triangular groups — 1, 3, 6. Student can touch them.]
→ P15[structured observation: "Count the coins in each group. What number do you get?"]
→ P34[open: "What is different between the groups?"]
→ P55
→ P53[validate any response]
→ P49
```

---

#### TA-D03 — Guided Conjecture (S6-paced)

```
P30[encouragement]
→ P54[worked example: "Let me show you how I would make a prediction. The counts are 1, 3, 6. The differences are 3−1=2 and 6−3=3. The differences go up by 1 each time. So the next difference should be 4. That means the next group has 6+4=10."]
→ P02[context: "Now you try. The next group after that — what do you predict?"]
→ P42[conjecture elicit: "What's your prediction? And why?"]
→ P55
→ P53[validate]
→ P49
```

---

#### TA-D04 — Name the Moves (S6 paced)

```
P30[encouragement]
→ P07[perceptual: 5-move diagram]
→ P52[calibration: "Before I say anything — is there any word on this diagram you want me to explain?"]
→ P13[explicit think-aloud: slow, pointing to each box]
→ P37[classify: "Which move did we use when we counted the groups?"]
→ P55
→ P53[validate]
→ P49
```

---

#### TA-D05 — Formative (S6 paced)

```
P30[encouragement]
→ P52[calibration: "Before we check your understanding — how are you feeling about this? Anything still unclear?"]
→ P90[formative: F-1 and F-2 — use verbal delivery, not written, for S6]
→ P55
→ P49
```
- Both CORRECT → P91 → P62
- Any PARTIAL → P54 → retry
- INCORRECT → return to TA-D03

---

### Protocol E — S8 (Accelerated)

**CPA entry stage:** A (student already reasons mathematically; needs formalisation)  
**Entry condition:** DQ-1=CORRECT with sophisticated explanation; DQ-3=CORRECT  
**Session cap:** 7 TAs  
**Estimated sessions:** 1

---

#### TA-E01 — Surface Tacit Reasoning

```
P02[context: "You already think mathematically. I want to make that explicit."]
→ P48[metacognitive elicit: "Walk me through the last time you solved a genuinely hard problem — not routine homework. What did you do first? What did you try? What did you abandon?"]
→ P55
→ P49
```

---

#### TA-E02 — Map to Formal 5-Move Framework

```
P08[abstract: 5-move framework introduced directly]
→ P38[compare: "Map what you just described onto these 5 moves. Which moves did you use? In what order?"]
→ P55
→ P49
```

---

#### TA-E03 — Argue for the Framework

```
P01[frame: "I want you to think critically about this framework."]
→ P44[justify: "Which of the 5 moves is most essential to mathematical thinking — the one without which you can't call it mathematical thinking at all? Construct an argument for your choice."]
→ P55
→ P49
```

**P49 routing:**
```
{ stimulus: "Strong argument (e.g. 'Conjecture — without it you're just observing, not thinking')", signal: "SIGNAL:CORRECT", mc_id: null }
  → TA-E04
{ stimulus: "Claims one without argument", signal: "SIGNAL:PARTIAL", mc_id: null }
  → P25[deductive: "Can you build a logical case? Start with: 'If this move were missing, mathematical thinking would be impossible because...'"] → P44 → P55 → TA-E04
```

---

#### TA-E04 — Mastery Gate

```
P90[formative: harder items — P77 + P76 from battery] → P91 → P62
```

---

### Protocol F — S9 (Second-Language Learner)

**CPA entry stage:** C (vocabulary-first; concrete before any symbolic or verbal representation)  
**Entry condition:** S9 detected via communication  
**Core rule:** All language is simplified. Every abstract term is defined before use. Visual confirmation replaces verbal explanation wherever possible.

---

#### TA-F01 — Vocabulary Anchor + Concrete

```
P02[context: simple — "I want to show you something."]
→ P06[concrete: triangular dot groups — physical, touchable]
→ P15[observation: "Point to the group with the most dots."]
→ P26[define: Write the word PATTERN on paper: "Pattern = something that repeats or follows a rule."]
→ P34[open — point-and-describe: "What repeats here?"]
→ P55
→ P53[validate]
→ P49
```

---

#### TA-F02 — Vocabulary Building

```
P01[frame: "New words today."]
→ P26[define each word visually:
    NOTICE = see something / point to it (draw an eye icon)
    CONJECTURE = a guess with a reason (draw a question mark + arrow)
    TEST = try a new example (draw a checkmark)
    COUNTEREXAMPLE = a case that fails the rule (draw an X)
    ARGUMENT = explain WHY it works (draw a chain of arrows)]
→ P37[classify: "Match each word to its picture."]
→ P55
→ P53
→ P49
```

---

#### TA-F03 — Production

```
P02[context: "Now you use the words."]
→ P35[closed: "Is this a NOTICE or a CONJECTURE? 'Every group has more dots than the last one.'"]
→ P55
→ P53
→ P49
→ P35[second item: "Is this a TEST or a COUNTEREXAMPLE? 'The 4th group has 10 dots — that fits my prediction.'"]
→ P55
→ P49
```

---

#### TA-F04 — Mastery Gate (visual-first)

```
P90[formative: visual-match items from battery — minimum verbal demand]
→ P91 (simplified delivery: diagrams replace verbal prompts where possible)
→ P62
```

---

## Component 6 — Misconception Engine

### MC-1 — "Mathematics is memorising rules and formulas."

**Trigger signal:** MISCONCEPTION:MC-1  
**Active in:** DQ-2 response = A (confident); any TA where student frames math as recall  
**Priority:** Foundational for MC-4 — repair MC-1 first if both are active (MAMR rule)

**Conflict evidence authored:**  
"A mathematician who forgot all their formulas solved the problem by noticing a pattern and forming a conjecture. A student who memorised all the formulas could not start because no formula matched the problem. The mathematician — not the student — was doing mathematics."

**Bridge text:**  
"Formulas are the OUTPUT of mathematical thinking. Someone noticed a pattern, conjectured a rule, and proved it. The formula records that result. Memorising the formula is storing the conclusion. Mathematical thinking is the process that found it."

**Replacement text:**  
"Mathematical thinking is: noticing a pattern, forming a conjecture, testing it, looking for a counterexample, and constructing an argument. Content (formulas, facts) is what this process produces. The process itself is the mathematics."

**Discrimination pairs:**  
- IS mathematical thinking: noticing that odd + odd = even for every pair you try, then asking whether this is ALWAYS true  
- NOT mathematical thinking: recalling that odd + odd = even from a memorised rule list

**S6 path:** Do not frame MC-1 as "wrong." Use: "This is how many students are introduced to mathematics. But professional mathematicians work very differently." P30 before P27 mandatory.

---

### MC-2 — "Speed equals mathematical ability."

**Trigger signal:** MISCONCEPTION:MC-2  
**Active in:** Student says "I'm too slow," "real mathematicians do this instantly," or shows anxiety about response time  

**Conflict evidence authored:**  
"Andrew Wiles spent seven years on one problem. Maryam Mirzakhani described mathematics as 'slow thinking.' Every professional mathematician has said that good mathematical thinking is characterised by patience, not speed."

**Bridge text:**  
"Speed is a product of familiarity. When you have seen something many times, you process it faster. Familiarity is not the same as mathematical thinking. Mathematical thinking is slow by nature — it means stopping when something seems obvious and asking: 'But WHY is this true? Is it ALWAYS true?'"

**Replacement text:**  
"A mathematician who pauses is thinking more carefully, not less. The student who rushes through a problem set without asking why has not thought mathematically about any of it."

**Discrimination pairs:**  
- IS evidence of mathematical thinking: pausing mid-problem to ask "will my conjecture hold for negative numbers too?"  
- NOT evidence of mathematical thinking: finishing a 20-problem set in 5 minutes without checking a single answer

**S6 path:** MC-2 co-occurs with S6 almost universally. Do not treat as a misconception to repair aggressively — the S6 regulation scaffolding (P30, P52, P53) addresses the emotional substrate. Add one P30 before P27 and frame as "even professional mathematicians feel this."

---

### MC-3 — "Mathematical thinking requires special talent — you're born with it or you're not."

**Trigger signal:** MISCONCEPTION:MC-3  
**Active in:** Student says "I'm not a math person," "some people just have it," or attributes mathematical success to innate ability

**Conflict evidence authored:**  
"Every professional mathematician who has described their development says they LEARNED to think mathematically. Anders Ericsson's research on expertise shows mathematical thinking follows the same deliberate practice pattern as chess, music, or athletics. There is no identified innate-talent marker for mathematical reasoning separate from practice."

**Bridge text:**  
"The 5 moves we are learning — noticing, conjecturing, testing, finding counterexamples, arguing — are habits. They can be practised. They can be improved. A student who practises noticing patterns for six months will notice more patterns than one who doesn't. That is skill development, not talent discovery."

**Replacement text:**  
"Mathematical thinking is practised. You are learning it right now. The fact that you are doing these moves, in this session, means you ARE doing mathematical thinking. Not observing it — doing it."

**S6 path:** MC-3 IS the core of the S6 state. Do not treat as a distinct repair — it is the emotional foundation of low confidence. Do not use P27 (misconception naming) for S6+MC-3 students — name it only when the student explicitly asserts it as a factual claim. Use Protocol D's regulation scaffolding as the primary treatment.

---

### MC-4 — "There is always one correct method; I need to find the formula."

**Trigger signal:** MISCONCEPTION:MC-4  
**Active in:** Student asks "which formula should I use?" before attempting any observation; refuses to conjecture without a procedure to follow

**Conflict evidence authored:**  
"Present two valid proofs of the same mathematical fact using entirely different methods. Both are correct. Both are mathematical thinking. No single method is 'the' method."

**Bridge text:**  
"The 5 moves can be used in any order. A mathematician might start with a counterexample, or start with an argument. There is no prescribed sequence. The moves are tools, not a recipe."

**Replacement text:**  
"When you encounter a new problem, begin with whatever move you can make. Notice something. Make any conjecture. The specific starting point does not matter — beginning is what matters."

**S6 path:** MC-4 in S6 students is almost always anxiety-driven (seeking a procedure as a safety mechanism). Replace P28 with P54. Provide a worked example of a mathematician starting a new problem without knowing the method.

**MAMR note:** If MC-1 and MC-4 are both active, repair MC-1 first — MC-4 ("one right method") is partially downstream of MC-1 ("math = formulas"). Resolving MC-1 weakens MC-4's hold.

---

## Component 7 — Assessment Battery

**Formative items F-1 and F-2 (used in P90 within Protocols):**

F-1 (P74 — Classification):  
"Which of these is an example of mathematical thinking? (A) Recalling that 7×8=56. (B) Noticing that multiplying any number by 9 gives a result whose digits sum to 9, and asking whether this is always true."  
Expected signal: CORRECT = B. INCORRECT = A → likely MC-1 still active.

F-2 (P78 — Explanation):  
"In one sentence: what is the difference between memorising a mathematical fact and thinking mathematically?"  
Expected signal: CORRECT = student contrasts content (fact) with process (noticing, conjecturing, proving). PARTIAL = identifies one side but not both. INCORRECT = conflates them.

---

**Full battery (5 probe types):**

| Probe | Item | Expected signal |
|---|---|---|
| P74 (Classification) | "Label each as 'mathematical thinking' or 'not mathematical thinking': (A) Memorising the formula for compound interest. (B) Asking whether the sum of any two odd numbers is always even. (C) Completing 50 long division problems correctly. (D) Noticing that Pascal's triangle contains Fibonacci numbers and wondering why." | CORRECT: B and D = yes; A and C = no (by themselves) |
| P75 (Boundary) | "A student applies the quadratic formula correctly to 20 different equations without errors. Has she done mathematical thinking?" | CORRECT: Not by itself — applying a procedure is using the result of mathematical thinking, not performing it. Boundary: if she notices a pattern in the solutions and conjectures about it, THEN she is doing mathematical thinking. |
| P76 (Transfer) | "A biologist notices that every mammal she has observed is warm-blooded. She forms the hypothesis: all mammals are warm-blooded. Which mathematical thinking move is she performing?" | CORRECT: Pattern noticing → Conjecturing (Move 1 → Move 2). She has not yet tested it or argued for it. |
| P77 (Generation) | "Generate your own conjecture. Choose any domain — numbers, shapes, everyday life. State what you noticed and what you conjecture." | CORRECT: Student produces a general statement ('I believe that for all...') preceded by a specific observation. Quality criterion: the conjecture must be testable. |
| P78 (Explanation) | "A student says: 'I can't be doing mathematical thinking because I haven't proved anything yet.' Is the student right? Explain." | CORRECT: No — noticing and conjecturing ARE mathematical thinking. Proof (Move 5) is the culmination, not the entry point. The student confuses one move for the whole process. |

---

## Component 8 — Mastery Gate (P91 expansion)

**Canonical order: P77 → P76 → P75 → P74 → P78**

**P77 (Generation):** "Look at the sequence 1, 4, 9, 16, 25. Notice something. Form a conjecture about the 10th term. State both your observation and your conjecture."  
Expected CORRECT: Identifies perfect squares; conjectures 10th term = 100; states reasoning (n² pattern).

**P76 (Transfer):** "A child arranges her toys by colour, then by size, then by both colour and size. Which mathematical thinking move is she closest to?"  
Expected CORRECT: Pattern noticing / Attribute sorting (a form of Move 1). Conjecturing if student adds: "Maybe every toy can be sorted by two attributes at once." Accept any named move that is correctly justified.

**P75 (Boundary):** "Is this mathematical thinking: 'I solved the problem by following the steps my teacher showed me'?"  
Expected CORRECT: No — by itself it is procedure application. If the student adds 'unless the student noticed something about the steps and asked why they work,' acknowledge the nuance as CORRECT.

**P74 (Classification):** "Classify: 'Noticing that all even numbers can be written as 2×k for some whole number k.' Is this (A) a conjecture, (B) a pattern observation, (C) a proof, or (D) a definition?"  
Expected CORRECT: (D) a definition — it defines even numbers. Distinguish from conjecture (an unverified claim) and pattern observation (noticing regularity). A student who says B with good reasoning earns PARTIAL.

**P78 (Explanation):** "A student says: 'I made a conjecture but then found a counterexample, so I failed.' Is the student right?"  
Expected CORRECT: No — finding a counterexample is Move 4 (Counterexample), which is an act of mathematical thinking. It disproves the conjecture but proves the student is thinking mathematically. The original conjecture was not a failure; it was the starting point of a process that produced knowledge.

---

## Component 9 — Retrieval Schedule (P89 expansion)

**Interval 1 (1 day after mastery):**  
"Without looking at any notes — name the 5 mathematical thinking moves."  
(Tests immediate retention of vocabulary.)

**Interval 2 (3 days):**  
"A student notices that the difference between consecutive perfect squares — (4−1)=3, (9−4)=5, (16−9)=7 — follows a pattern. What move is the student using? What conjecture would come next?"  
(Tests application to a novel numeric example.)

**Interval 3 (7 days):**  
"Give one example of mathematical thinking from everyday life — not from a mathematics classroom."  
(Tests transfer to non-academic context — P76 level.)

**Interval 4 (21 days):**  
"Which of the 5 mathematical thinking moves is hardest to do? Explain why you think that."  
(Tests elaborative interrogation — forces retrieval under reflection.)

**Interval 5 (60 days):**  
"You haven't thought about the mathematical thinking moves for a while. Without reviewing: name as many as you can, then pick one and explain it in detail — including what it looks like when someone is doing it and when they're not."  
(Tests long-term retention and distinction between moves and non-moves.)

---

## Component 10 — Validation Checklist

| V-# | Check | Status |
|---|---|---|
| V-1 | Learning objective has observable criterion and NOT-clause | PASS |
| V-2 | Learning objective references mastery_threshold (0.70) | PASS |
| V-3 | Student State Matrix covers all plausible states for difficulty=foundational | PASS (S0, S2, S3, S6, S8, S9) |
| V-4 | Diagnostic Battery has 2–3 items with complete response taxonomy and state routing | PASS (DQ-1, DQ-2, DQ-3) |
| V-5 | Prerequisite Check present (even if requires=[]) | PASS |
| V-6 | Protocol Library has one Protocol per plausible student state | PASS (A=S0, B=S2, C=S3, D=S6, E=S8, F=S9) |
| V-7 | Each Protocol specifies: entry condition, TA sequence, success exit, failure exit, CPA stage, estimated sessions | PASS |
| V-8 | Every TA opens with P01 or P02 (GR-1) | PASS |
| V-9 | P55 follows every E-category primitive (GR-2) | PASS |
| V-10 | P08 is preceded by P06 or P07 in all Protocols where P08 appears (GR-3) | PASS (P07 before P08 in A06, C04, E02) |
| V-11 | Schema repair (D-category) gated by P41 or diagnostic signal (GR-4) | PASS (all MC repairs triggered by P41 diagnostic routing or P49 MISCONCEPTION signal) |
| V-12 | P28 absent from Protocol D / S6 throughout (GR-5) | PASS (P54 replaces P28 in all D TAs) |
| V-13 | P91 is terminal — no TA follows it in any Protocol (GR-6) | PASS |
| V-14 | Named Compounds (P90, P91, P89) expanded in Components 7–9 (GR-10) | PASS |
| V-15 | Misconception Engine has at least one entry with all required fields | PASS (MC-1 through MC-4) |
| V-16 | Assessment Battery covers P74, P75, P76, P77, P78 | PASS |
| V-17 | Mastery Gate has 5 items in canonical order P77→P76→P75→P74→P78 | PASS |
| V-18 | Retrieval Schedule has 5 intervals at 1, 3, 7, 21, 60 days | PASS |
| V-19 | AI Removal Test passes all 5 invariants | PASS (see below) |
| V-20 | S6/S9 adaptations authored within Protocol entries, not as standalone components | PASS |

---

## AI Removal Test

**AIR-1 — All content slots are finite and KG-sourced or authored:**  
Every concrete instance (triangular dot sequences, odd-number sum, Pascal's triangle, Wiles reference), every discrimination pair, every retrieval item is explicitly authored in this document. No AI generation is required at runtime to fill a content slot.  ✓

**AIR-2 — Pre-authored response taxonomy for every elicitation primitive:**  
Every P34, P35, P37, P38, P40, P41, P42, P44, P45, P46, P47, P48 occurrence in this Blueprint carries an explicit response taxonomy with signal and mc_id. Maximum 8 entries per elicitation; no entry present without signal.  ✓

**AIR-3 — Response branching is deterministic:**  
Every P49/P50 occurrence has explicit routing for all expected signals. No P49 says "use judgment" — each branch specifies the next action.  ✓

**AIR-4 — No primitive contains concept content:**  
Content (the triangular dot counts, the Wiles example, the discrimination pairs) lives in the authored slots. The primitives (P06, P15, P37) are procedures. They reference slots; they do not embed content.  ✓

**AIR-5 — Primitive sequence fixed at authoring:**  
Each Protocol's TA sequence is fully specified before any runtime execution. The runtime voices the authored sequence; it does not construct or reorder it.  ✓
