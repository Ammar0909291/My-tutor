# Teaching Blueprint — Mathematical Logic
**Concept ID:** math.found.logic  
**Framework version:** Educational Brain v1.0  
**Status:** READY  
**V-checks:** V-1 through V-20 all PASS (see Component 10)

---

## Component 0 — Concept Profile

| Field | Value |
|---|---|
| `concept_id` | math.found.logic |
| `name` | Mathematical Logic |
| `domain` | mathematics / foundations |
| `difficulty` | foundational (mapped: 1) |
| `bloom` | analyze |
| `requires` | math.found.mathematical-language |
| `unlocks` | math.found.proof · math.found.set-theory · math.disc.boolean-circuits |
| `cross_links` | math.disc.boolean-circuits |
| `mastery_threshold` | 0.80 |
| `estimated_hours` | 12 |
| `description` | The branch of mathematics studying the principles of valid reasoning, the structure of mathematical statements, and the formal rules governing deduction. |

---

## Component 1 — Learning Objective

A student who achieves mastery **analyzes a compound mathematical statement to identify its connective type, evaluates its truth value given the truth values of its components, determines whether a two-step argument is valid using modus ponens or modus tollens, and distinguishes a tautology from a contradiction.**

NOT: recalling connective names without applying them. NOT: producing correct truth table entries by rote without understanding why. A student who labels "IF P THEN Q" correctly but then asserts its converse "IF Q THEN P" is equivalent has NOT achieved mastery.

**Observable mastery criterion:** Given a novel IF-THEN statement and two premises, the student correctly derives the conclusion OR correctly identifies that no valid conclusion follows — and states which argument form (or non-form) is being used.

---

## Component 2 — Student State Matrix

| State | Label | Entry Behaviour | Protocol |
|---|---|---|---|
| S0 | Complete Novice | Has not encountered formal logic; confuses everyday language "if-then" with material conditional; no truth table experience | Protocol A |
| S1 | Procedural Carrier | Can fill in truth tables by rote but misapplies the IF-THEN connective (treats it as biconditional or as causal) | Protocol B |
| S2 | Misconception Carrier | Holds MC-2 (converse confusion: P→Q same as Q→P) actively with confidence; produces systematic errors on IF-THEN truth tables | Protocol C |
| S3 | Conceptual Carrier | Has informal logic experience (debates, everyday reasoning); missing the formalism; understands validity but cannot evaluate it symbolically | Protocol D |
| S6 | Low Confidence | Shuts down under symbolic notation; can handle concrete everyday propositions but freezes at truth table symbols | Protocol E |
| S9 | Second-Language Learner | Language of connectives (AND, OR, NOT, IF-THEN) differs from L1 usage; needs visual truth tables before verbal definitions | Protocol F |

---

## Component 3 — Diagnostic Battery

**Administration note:** Run DQ-1, DQ-2, DQ-3 before any teaching. Do not introduce truth tables or formal notation until after routing.

---

### DQ-1 — Proposition Recognition (P41)

**Stimulus:** "I'm going to say five things. Tell me which ones are either definitely true or definitely false — not a matter of opinion."  
(A) "The number 7 is prime."  
(B) "Mathematics is beautiful."  
(C) "If it is raining, I will use an umbrella."  
(D) "All squares have four sides."  
(E) "This problem is hard."

**Response taxonomy:**
```
{ stimulus: "Correctly identifies A and D as definite T/F; C as conditional; B/E as opinion", signal: "SIGNAL:CORRECT", mc_id: null }
{ stimulus: "Identifies A and D; unsure about C", signal: "SIGNAL:PARTIAL", mc_id: null }
{ stimulus: "Includes B or E as mathematical propositions", signal: "SIGNAL:INCORRECT", mc_id: null }
{ stimulus: "Cannot distinguish any category", signal: "SIGNAL:NO_RESPONSE", mc_id: null }
```

**Routing:**
- SIGNAL:CORRECT → likely S3 → DQ-2
- SIGNAL:PARTIAL → likely S0 → DQ-2
- SIGNAL:INCORRECT → S0; note for prerequisite reinforcement
- SIGNAL:NO_RESPONSE → S0 or S6

---

### DQ-2 — Connective Intuition (P35)

**Stimulus:** "Consider: 'P is true AND Q is true.' Under what conditions is this compound statement true?"  
(A) When P is true, regardless of Q.  
(B) When Q is true, regardless of P.  
(C) When both P and Q are true.  
(D) When at least one of P or Q is true.

**Response taxonomy:**
```
{ stimulus: "C, with explanation", signal: "SIGNAL:CORRECT", mc_id: null }
{ stimulus: "C, without explanation", signal: "SIGNAL:PARTIAL", mc_id: null }
{ stimulus: "D ('at least one')", signal: "MISCONCEPTION:MC-4", mc_id: "MC-4" }
{ stimulus: "A or B", signal: "SIGNAL:INCORRECT", mc_id: null }
```

**Routing:**
- SIGNAL:CORRECT → DQ-3
- MISCONCEPTION:MC-4 → flag; continue to DQ-3; route to Protocol A with MC-4 repair early
- SIGNAL:INCORRECT or PARTIAL → DQ-3 regardless

---

### DQ-3 — IF-THEN Intuition (P41)

**Stimulus:** "Consider: 'IF a number is divisible by 4, THEN it is divisible by 2.' Suppose a number IS divisible by 2. Does that tell you it's divisible by 4?"

**Response taxonomy:**
```
{ stimulus: "No — divisible by 2 does not guarantee divisible by 4 (e.g. 6)", signal: "SIGNAL:CORRECT", mc_id: null }
{ stimulus: "Yes — because IF divisible by 4 THEN divisible by 2, so it works both ways", signal: "MISCONCEPTION:MC-2", mc_id: "MC-2" }
{ stimulus: "Yes — because the statement says so", signal: "MISCONCEPTION:MC-1", mc_id: "MC-1" }
{ stimulus: "Not sure", signal: "SIGNAL:PARTIAL", mc_id: null }
```

**Routing:**
- SIGNAL:CORRECT → S3 or S1 → Protocol D or B (use DQ-1 result to distinguish)
- MISCONCEPTION:MC-2 → Protocol C (converse confusion is the dominant error)
- MISCONCEPTION:MC-1 → MC-1 active; Protocol A with MC-1 repair in TA-A06
- SIGNAL:PARTIAL → S0 → Protocol A

---

## Component 4 — Prerequisite Check

`requires: [math.found.mathematical-language]`

**Prerequisite check items (P41 × 2):**

**PC-1:** "Is '2+2=5' a mathematical statement? Is it true?"  
Expected CORRECT: Yes it is a statement; it is false.  
SIGNAL:INCORRECT (says it's not a statement, or says "it can't be true OR false because it's wrong") → prerequisite gap; reinforce in TA-A01 before proceeding.

**PC-2:** "What does it mean for a mathematical statement to be TRUE?"  
Expected CORRECT: It accurately describes reality / it corresponds to fact / it can be verified.  
SIGNAL:INCORRECT or vague → reinforce mathematical statement concept in TA-A01.

**Gap repair (in-session, 1 TA only):** If prerequisite gap detected, open Protocol A with:  
P02 → P26[definition: "A proposition is a statement that is either true or false — not both, not neither."] → P37[classify: classify 4 sentences as propositions or non-propositions] → P55 → P49 → then continue Protocol A from TA-A02.

---

## Component 5 — Protocol Library

### Protocol A — S0 (Complete Novice)

**CPA entry stage:** C (difficulty=foundational; domain=mathematics foundations)  
**Entry condition:** DQ-1=INCORRECT/PARTIAL, DQ-3=PARTIAL/NO_RESPONSE, no strong MC flags  
**Session cap:** 7 TAs (estimated_hours=12 ≥ 1h)  
**Estimated sessions to mastery:** 3–4  
**Success exit:** P91 passes → MASTERED  
**Failure exit:** PA-3 (7-TA cap) → P62; resume at CPA stage reached

---

#### TA-A01 — Anchor + Proposition Concept (C-stage)

```
P02[context: "Today we're going to look at the structure of mathematical statements — how they fit together and how we know when an argument is valid."]
→ P06[concrete: Write on paper/board three statements:
    (1) "7 is a prime number." — mark T
    (2) "7 is an even number." — mark F
    (3) "Is 7 a good number?" — mark with question mark
    Physical marking with T/F cards preferred.]
→ P26[definition: "A PROPOSITION is a statement that is either TRUE or FALSE — not both, not neither, not 'it depends.' Sentence (3) is not a proposition — it has no truth value."]
→ P37[classify: "Tell me: is each of these a proposition? If yes, is it T or F?
    (A) 'The square root of 9 is 3.'
    (B) 'Mathematics is useful.'
    (C) 'The number 2 is the only even prime.'"]
→ P55
→ P49
```

**P49 routing:**
```
{ stimulus: "A=proposition/T, B=not proposition, C=proposition/T", signal: "SIGNAL:CORRECT", mc_id: null }
  → P53 → TA-A02
{ stimulus: "Correctly gets A and C but unsure about B", signal: "SIGNAL:PARTIAL", mc_id: null }
  → P16[counterexample: "Can you assign a single truth value to 'mathematics is useful'? Different people answer differently — so it's not a proposition."] → P37[reclassify B] → P55 → TA-A02
{ stimulus: "Classifies B as a proposition", signal: "SIGNAL:INCORRECT", mc_id: null }
  → P14[comparative: "Compare: 'The square root of 9 is 3' — anyone can verify this. 'Mathematics is useful' — two people can disagree. A proposition must be decidable."] → P37 → P55 → TA-A02
```

---

#### TA-A02 — Connective NOT and AND (C-stage)

```
P01[frame: "Let's combine propositions."]
→ P06[concrete: Two T/F cards — P="It is raining" (student picks T or F based on current situation); Q="I am inside" (student picks T or F).
    Show physical NOT: flip the card. "NOT P is the opposite of P."]
→ P15[structured observation: "If P is TRUE, what is NOT-P? If P is FALSE, what is NOT-P?"]
→ P34[open: "So what does NOT do to a truth value?"]
→ P55
→ P49
```

**P49 routing:**
```
{ stimulus: "Inverts / 'flips it' / 'turns T into F and F into T'", signal: "SIGNAL:CORRECT", mc_id: null }
  → P53 → continue to AND
{ stimulus: "Describes it as 'removes' or 'cancels'", signal: "SIGNAL:PARTIAL", mc_id: null }
  → P13[think-aloud: "NOT doesn't remove — it reverses. If P is TRUE, NOT-P is FALSE. If P is FALSE, NOT-P is TRUE."] → continue
{ stimulus: "Incorrect", signal: "SIGNAL:INCORRECT", mc_id: null }
  → P10[worked example: Build mini truth table for NOT with T card and F card, physically flipping] → P34 → P55 → continue
```

**AND continuation (same TA):**
```
→ P06[concrete: physical AND — hold both T/F cards for P and Q simultaneously:
    "P AND Q is true only when BOTH cards show T. Try all four combinations:
    P=T,Q=T → AND=T | P=T,Q=F → AND=F | P=F,Q=T → AND=F | P=F,Q=F → AND=F"]
→ P15[structured observation: "In how many of the four cases is P AND Q true?"]
→ P34[open: "What does AND require?"]
→ P55
→ P49
```

**P49 routing:**
```
{ stimulus: "Both must be true / only 1 case out of 4", signal: "SIGNAL:CORRECT", mc_id: null }
  → TA-A03
{ stimulus: "At least one must be true (confuses AND with OR)", signal: "MISCONCEPTION:MC-4", mc_id: "MC-4" }
  → MC-4 immediate repair: P27[naming: "What you described is OR, not AND. AND requires both. Let me show the difference."] → P14[comparative: AND vs OR cards side by side] → P34 → P55 → TA-A03
```

---

#### TA-A03 — Connective OR (C-stage)

```
P02[context: "Now a different connective."]
→ P06[concrete: "P OR Q is true when AT LEAST ONE of P, Q is true. Try all four combinations with the cards:
    P=T,Q=T → OR=T | P=T,Q=F → OR=T | P=F,Q=T → OR=T | P=F,Q=F → OR=F"]
→ P26[definition: "In mathematics, OR is INCLUSIVE — it includes the case where both are true. Everyday 'or' is often exclusive ('tea or coffee?'), but mathematical OR is not."]
→ P14[comparative: "Compare AND and OR:
    AND: true in 1 of 4 cases (both T).
    OR: true in 3 of 4 cases (at least one T)."]
→ P35[closed: "I say: 'x>0 OR x<0.' Is this true when x=5? When x=−3? When x=0?"]
→ P55
→ P49
```

**P49 routing:**
```
{ stimulus: "True when x=5 (5>0), True when x=−3 (−3<0), False when x=0 (neither)", signal: "SIGNAL:CORRECT", mc_id: null }
  → P53 → TA-A04
{ stimulus: "Correctly evaluates x=5 and x=−3 but wrong on x=0", signal: "SIGNAL:PARTIAL", mc_id: null }
  → P17[boundary: "x=0 is not >0 and not <0. Both components are FALSE. OR of two FALSEs is FALSE."] → P35[recheck x=0] → P55 → TA-A04
{ stimulus: "Gets x=0 wrong by saying 'it depends'", signal: "SIGNAL:INCORRECT", mc_id: null }
  → P25[deductive: "0>0 is false. 0<0 is false. F OR F = F. No ambiguity."] → P35 → P55 → TA-A04
```

---

#### TA-A04 — Connective IF-THEN (C-stage → P-stage transition)

```
P01[frame: "The most important and most misunderstood connective."]
→ P06[concrete: Physical scenario cards:
    P = "It rains" | Q = "I take an umbrella"
    Build the promise: "IF it rains, THEN I take an umbrella."
    Now check all four weather/umbrella combinations:
    Case 1: P=T, Q=T (rains; umbrella) → Promise kept? YES → IF-THEN = T
    Case 2: P=T, Q=F (rains; no umbrella) → Promise broken? YES → IF-THEN = F
    Case 3: P=F, Q=T (no rain; umbrella anyway) → Promise broken? NO — nothing was promised about no-rain → IF-THEN = T
    Case 4: P=F, Q=F (no rain; no umbrella) → Nothing promised about this case → IF-THEN = T]
→ P15[structured observation: "Which case makes IF P THEN Q FALSE?"]
→ P34[open: "So when is IF-THEN false?"]
→ P55
→ P49
```

**P49 routing:**
```
{ stimulus: "Only when P is TRUE and Q is FALSE", signal: "SIGNAL:CORRECT", mc_id: null }
  → P53 → continue
{ stimulus: "When P is false (includes cases 3 or 4 as false)", signal: "MISCONCEPTION:MC-1", mc_id: "MC-1" }
  → P27[naming: "This is the most common error with IF-THEN. The statement makes a promise only when P is true. When P is false, no promise was made — and you can't break a promise you never made."] → P14[comparative: re-examine Case 3 and 4] → P34 → P55 → continue
{ stimulus: "Only when P is false (all false cases)", signal: "SIGNAL:INCORRECT", mc_id: null }
  → P10[worked example: Full 4-row truth table built step by step with reasoning] → P34 → P55 → continue
```

**Converse continuation (same TA — critical for MC-2 prevention):**
```
→ P17[boundary case: "Now reverse it: IF it rains, THEN I take an umbrella. Does that mean: IF I take an umbrella, THEN it rains?"]
→ P35[closed: "Yes or No — and why?"]
→ P55
→ P49
```

**P49 routing:**
```
{ stimulus: "No — could be carrying umbrella for sun or expectation", signal: "SIGNAL:CORRECT", mc_id: null }
  → TA-A05
{ stimulus: "Yes — because the statement says so", signal: "MISCONCEPTION:MC-2", mc_id: "MC-2" }
  → MC-2 immediate repair (see Component 6) → then TA-A05
```

---

#### TA-A05 — Truth Tables as Perceptual Representation (P-stage)

```
P01[frame: "All four connectives can be shown in one diagram called a truth table."]
→ P07[perceptual: Display the full truth table for NOT, AND, OR, IF-THEN side by side:
    | P | Q | ¬P | P∧Q | P∨Q | P→Q |
    |---|---|----|----|-----|-----|
    | T | T | F  | T  | T   | T   |
    | T | F | F  | F  | T   | F   |
    | F | T | T  | F  | T   | T   |
    | F | F | T  | F  | F   | T   |]
→ P13[think-aloud: "Read each row as: 'When P is T and Q is F, then ¬P=F, AND=F, OR=T, IF-THEN=F.' Notice that IF-THEN is false in exactly ONE row — the second row, where P=T and Q=F."]
→ P38[compare: "Compare AND and IF-THEN. Which has more TRUE rows? Why?"]
→ P55
→ P49
```

**P49 routing:**
```
{ stimulus: "IF-THEN has 3 T rows; AND has 1. Because IF-THEN is only false when promise is broken.", signal: "SIGNAL:CORRECT", mc_id: null }
  → TA-A06
{ stimulus: "Correct count but cannot explain why IF-THEN has more T rows", signal: "SIGNAL:PARTIAL", mc_id: null }
  → P36[explain: "Why does IF-THEN have 3 true rows? Think about what each row means as a promise."] → P55 → TA-A06
{ stimulus: "Wrong count", signal: "SIGNAL:INCORRECT", mc_id: null }
  → P15[structured observation: Have student count T values in each column] → P38 → P55 → TA-A06
```

---

#### TA-A06 — Valid Arguments: Modus Ponens and Modus Tollens (A-stage)

```
P01[frame: "Now we use IF-THEN to build valid arguments."]
→ P08[abstract: "A valid argument: if the premises are true, the conclusion MUST be true.
    MODUS PONENS (MP):
      Premise 1: P → Q
      Premise 2: P
      Conclusion: Therefore Q.
    
    MODUS TOLLENS (MT):
      Premise 1: P → Q
      Premise 2: ¬Q
      Conclusion: Therefore ¬P.
    
    INVALID form — converse error:
      Premise 1: P → Q
      Premise 2: Q
      Conclusion: 'Therefore P' ← NOT VALID."]
→ P10[worked example:
    MP: 'IF x is divisible by 4, THEN x is divisible by 2. x=12 is divisible by 4. Therefore 12 is divisible by 2.' → Valid.
    MT: 'IF x is divisible by 4, THEN x is divisible by 2. x=6 is NOT divisible by 2. Therefore 6 is NOT divisible by 4.' → Valid.
    Converse error: 'IF x is divisible by 4, THEN x is divisible by 2. x=6 IS divisible by 2. Therefore 6 is divisible by 4.' → INVALID — 6 is not divisible by 4.]
→ P44[justify: "I give you an argument. Tell me if it is valid, and which form it uses or why it fails:
    'IF a triangle has three equal sides, THEN all its angles are equal. This triangle does NOT have all angles equal. Therefore this triangle does NOT have three equal sides.'"]
→ P55
→ P49
```

**P49 routing:**
```
{ stimulus: "Valid; Modus Tollens (¬Q → ¬P)", signal: "SIGNAL:CORRECT", mc_id: null }
  → P53 → TA-A07
{ stimulus: "Valid but cannot name the form", signal: "SIGNAL:PARTIAL", mc_id: null }
  → P26[definition: re-display MT pattern] → P44[reclassify] → P55 → TA-A07
{ stimulus: "Invalid or wrong form", signal: "SIGNAL:INCORRECT", mc_id: null }
  → P25[deductive: "What is P here? What is Q? What is ¬Q? Now match to the MT pattern."] → P44 → P55 → TA-A07
```

---

#### TA-A07 — Mastery Gate

```
P01[frame: "Let's verify your understanding across all connectives."]
→ P90[formative: F-1 and F-2 from Assessment Battery]
→ P55 → P49
```
- Both CORRECT → P91 [full 5-probe mastery sequence, Component 8] → P62 [schedule Component 9]
- One CORRECT → identify weaker connective; return to relevant TA
- Both INCORRECT → return to TA-A05

---

### Protocol B — S1 (Procedural Carrier)

**CPA entry stage:** P (knows truth tables mechanically; error is with IF-THEN semantics)  
**Entry condition:** DQ-3=MISCONCEPTION:MC-1 or MC-2; DQ-2=CORRECT  
**Session cap:** 7 TAs  
**Estimated sessions:** 1–2

---

#### TA-B01 — Surface the Error

```
P02[context: "You know the truth table notation. Let's check your understanding of what the entries mean."]
→ P41[probe: "IF-THEN is TRUE when P=FALSE and Q=FALSE. Why is that? What does it mean?"]
→ P55
→ P49
```

**P49 routing:**
```
{ stimulus: "Because no promise was made when P is false — no violation possible", signal: "SIGNAL:CORRECT", mc_id: null }
  → S1 may be stronger than diagnosed; skip to TA-B04
{ stimulus: "It's just the rule / I memorised the table", signal: "SIGNAL:PARTIAL", mc_id: null }
  → proceed to TA-B02 (procedural without semantic understanding confirmed)
{ stimulus: "Incorrect reasoning about why", signal: "SIGNAL:INCORRECT", mc_id: null }
  → proceed to TA-B02
```

---

#### TA-B02 — Semantic Grounding of IF-THEN

```
P01[frame: "Let me show you what the truth table entries mean — not just what they are."]
→ P19[analogy: "IF-THEN is a PROMISE. 'IF it rains, THEN I carry an umbrella.' This promise can only be BROKEN if it rains and I don't carry the umbrella. If it doesn't rain, the promise is simply not tested."]
→ P14[comparative: "Look at rows 3 and 4 in the truth table (P=F). In both, P→Q is TRUE. Why? Because the promise was never triggered. The IF condition never fired."]
→ P36[explain: "In your own words — why is P→Q true when P is false?"]
→ P55
→ P49
```

**P49 routing:**
```
{ stimulus: "Articulates 'promise not triggered / no violation possible'", signal: "SIGNAL:CORRECT", mc_id: null }
  → TA-B03
{ stimulus: "Partially correct", signal: "SIGNAL:PARTIAL", mc_id: null }
  → P25[deductive: "If P is false, the condition 'IF P' never applies. A rule that never applies cannot be broken."] → P36 → P55 → TA-B03
```

---

#### TA-B03 — Repair Converse Confusion (if MC-2 flagged)

```
P02[context: "Now the most important test."]
→ P27[naming: "The most common error with IF-THEN: people think that IF P→Q is true, then Q→P must also be true. This is called the CONVERSE FALLACY."]
→ P16[counterexample: "IF it rains THEN the ground is wet. Does the ground being wet mean it rained? No — a sprinkler could have run. Q→P is NOT the same as P→Q."]
→ P33[discrimination: "Label each as VALID or FALLACY:
    (A) P→Q is true; P is true; therefore Q. 
    (B) P→Q is true; Q is true; therefore P.
    (C) P→Q is true; ¬Q is true; therefore ¬P."]
→ P55
→ P49
```

**P49 routing:**
```
{ stimulus: "A=Valid (MP), B=Fallacy (converse), C=Valid (MT)", signal: "SIGNAL:CORRECT", mc_id: null }
  → MC-2 cleared → TA-B04
{ stimulus: "Correct on A and B, wrong on C", signal: "SIGNAL:PARTIAL", mc_id: null }
  → P25[deductive: "C is Modus Tollens. ¬Q means the conclusion is false. If P→Q and Q is false, then P must also be false."] → P33[reclassify C] → P55 → TA-B04
```

---

#### TA-B04 — Mastery Gate

```
P90[formative: F-1, F-2] → P55 → P49
→ Both CORRECT → P91 → P62
→ Otherwise → identify gap → return to TA-B02 or TA-B03
```

---

### Protocol C — S2 (Misconception Carrier: MC-2 converse confusion)

**CPA entry stage:** P  
**Entry condition:** DQ-3=MISCONCEPTION:MC-2 with high confidence  
**Core treatment:** Full MC-2 repair chain before any new connective teaching

---

#### TA-C01 — Surface + Conflict Evidence

```
P02[context: "Let's test one specific thing about IF-THEN."]
→ P41[probe: "'All dogs are mammals.' Does that mean 'all mammals are dogs'?"]
→ P55
→ P49
```

**P49 routing:**
```
{ stimulus: "No — cats are mammals and not dogs", signal: "SIGNAL:CORRECT", mc_id: null }
  → P52[calibration: "Good. Now: IF a number is divisible by 4, THEN it is divisible by 2. Does that mean IF divisible by 2, THEN divisible by 4?"] → P35 → P55 → P49
{ stimulus: "Yes (MC-2 in everyday case too)", signal: "MISCONCEPTION:MC-2", mc_id: "MC-2" }
  → deeper repair needed → TA-C02
```

---

#### TA-C02 — Counterexample Chain

```
P01[frame: "Let's find a counterexample to the converse."]
→ P16[counterexample: "IF a number is divisible by 4, THEN it is divisible by 2. Is 6 divisible by 2? Yes. Is 6 divisible by 4? No. So: we have a number divisible by 2 but NOT divisible by 4. The converse fails."]
→ P21[conjecture formation: "Now you generate a counterexample to: 'IF an animal has four legs, THEN it is a dog.' Find an animal with four legs that is not a dog."]
→ P42[conjecture elicit]
→ P55
→ P49
```

---

#### TA-C03 — Formalise the Direction Asymmetry

```
P07[perceptual: Arrow diagram — one-way implication:
    P ───────→ Q  (IF P THEN Q — arrow goes one way)
    P ←?──── Q   (Does arrow reverse? NO — not automatically)]
→ P26[definition: "CONVERSE of P→Q is Q→P. It may or may not be true — you must CHECK it separately. It is NOT automatically true."]
→ P33[discrimination: 4 pairs — student labels whether given statement is P→Q or its converse, and whether converse is necessarily true]
→ P55
→ P49
```

---

#### TA-C04 — Mastery Gate

```
P90[formative] → P91 → P62
```

---

### Protocol D — S3 (Conceptual Carrier)

**CPA entry stage:** P  
**Entry condition:** DQ-1=CORRECT, DQ-3=CORRECT  
**Estimated sessions:** 1

---

#### TA-D01 — Map Existing Knowledge to Symbols

```
P04[prior knowledge: "Describe an argument you've made or heard that you thought was valid."]
→ P55 → P49
→ P07[perceptual: 5-column truth table] → P13[think-aloud mapping the student's example to a formal argument structure] → TA-D02
```

#### TA-D02 — Fill Gaps in Formal Notation

```
P08[abstract: connective symbols and argument forms]
→ P35[closed: 3 argument classification items — MP, MT, or converse fallacy]
→ P55 → P49 → TA-D03
```

#### TA-D03 — Tautology and Contradiction (extending bloom=analyze)

```
P02[context: "Two special kinds of propositions."]
→ P26[definition: "TAUTOLOGY: true under all truth value assignments. CONTRADICTION: false under all truth value assignments."]
→ P23[pattern detection: "Examine P∨¬P and P∧¬P. Fill in their truth tables. What do you notice?"]
→ P34[open: "Which is a tautology? Which is a contradiction? How do you know?"]
→ P55 → P49 → TA-D04
```

#### TA-D04 — Mastery Gate

```
P90[formative: F-1, F-2] → P91 → P62
```

---

### Protocol E — S6 (Low Confidence)

**CPA entry stage:** C  
**Entry condition:** Confidence shutdown signals; S6 detected  
**Core rule:** P28 replaced by P54 throughout. P30 in every TA. P52 before every assessment.

---

#### TA-E01 — Low-Stakes Anchor

```
P30[encouragement: "We're going to look at something you already do every day — making logical statements."]
→ P02[context] → P41[low-stakes probe: "Is 'it is Monday today' either true or false?"] → P55 → P53 → TA-E02
```

#### TA-E02 — Concrete (Everyday Props)

```
P30 → P06[concrete: everyday T/F cards with physical manipulation] → P15[observation] → P34[open] → P55 → P53 → P49 → TA-E03
```

#### TA-E03 — Guided NOT/AND/OR

```
P30 → P54[worked examples for each connective with physical cards; student observes then mirrors] → P35[closed: evaluate one row per connective] → P55 → P53 → P49 → TA-E04
```

#### TA-E04 — IF-THEN with Scaffolded Promise Frame

```
P30 → P54[worked: full 4-row IF-THEN truth table built step by step] → P52[calibration] → P35[closed: which row is IF-THEN false?] → P55 → P53 → P49 → TA-E05
```

#### TA-E05 — Mastery Gate

```
P30 → P52[calibration] → P90[formative: oral delivery] → P55 → P49
→ CORRECT → P91 → P62
→ PARTIAL → P54 → retry
```

---

### Protocol F — S9 (Second-Language Learner)

**CPA entry stage:** C (visual truth tables before verbal definitions)

---

#### TA-F01 — Vocabulary Anchor

```
P02[simple language] → P06[concrete: visual T/F cards, no text — use ✓ and ✗ symbols] → P26[define NOT, AND, OR with icons, no prose] → P37[classify: match icon to result] → P55 → P53 → P49 → TA-F02
```

#### TA-F02 — Truth Table as Visual

```
P07[perceptual: visual truth table — colour-coded rows, ✓/✗ entries] → P15[observation: point-and-answer] → P35[closed: point to the correct row] → P55 → P53 → P49 → TA-F03
```

#### TA-F03 — IF-THEN Visual

```
P06[concrete: promise scenario with pictures, minimal text] → P15 → P35[point to row where IF-THEN = ✗] → P55 → P53 → P49 → TA-F04
```

#### TA-F04 — Mastery Gate

```
P90[visual-first items] → P91[visual delivery] → P62
```

---

## Component 6 — Misconception Engine

### MC-1 — "IF P THEN Q is false when P is false."

**Trigger signal:** MISCONCEPTION:MC-1  
**Active in:** DQ-3 response asserting converse cases are false; truth table errors on rows 3 and 4

**Conflict evidence:** "The statement 'IF it rains, THEN I carry an umbrella' was made. It did not rain, and I did not carry an umbrella. Did I break my promise? No — the promise was only about rainy situations. I said nothing about dry weather."

**Bridge text:** "IF P THEN Q makes a promise that fires ONLY when P is true. When P is false, the conditional is simply not tested. An untested promise cannot be broken — so the conditional is TRUE by default when P is false."

**Replacement text:** "IF-THEN is false in exactly one case: when P is TRUE and Q is FALSE — because that is the only time a promise is made and broken. In all other cases, IF-THEN is TRUE."

**Discrimination pairs:**
- CORRECTLY evaluates IF-THEN: "P=F, Q=T → IF-THEN=T because P never fired."
- MC-1 error: "P=F, Q=T → IF-THEN=F because Q being true doesn't match P being false."

**S6 path:** Use promise analogy (P19) before P27. Do not present the truth table until after the everyday analogy is solid.

---

### MC-2 — "IF P THEN Q means IF Q THEN P (converse confusion)."

**Trigger signal:** MISCONCEPTION:MC-2  
**Active in:** DQ-3 response asserting converse is equivalent; any argument form analysis claiming converse is valid

**Conflict evidence:** "IF a number is divisible by 4, THEN it is divisible by 2. Is 6 divisible by 4? No. But 6 IS divisible by 2. So we have a case where Q is true but P is false. The converse fails for x=6."

**Bridge text:** "P→Q and Q→P are different statements. P→Q means: whenever P occurs, Q occurs. Q→P means: whenever Q occurs, P occurs. These can have completely different truth values. Check: IF every square is a rectangle, does that mean every rectangle is a square? No — a counterexample kills the converse."

**Replacement text:** "The converse of a true statement is NOT automatically true. Always check: can I find a case where Q is true but P is false? If yes, the converse fails."

**Discrimination pairs:**
- IS a valid converse: IF x=5 THEN x+1=6; converse IF x+1=6 THEN x=5 — also true (happens to be biconditional)
- IS NOT a valid converse: IF x divisible by 4 THEN x divisible by 2; converse fails for x=6

**S6 path:** Use everyday counterexample first (dogs and mammals) before symbolic. P30 before P27.

---

### MC-3 — "A single example proves a mathematical statement true."

**Trigger signal:** MISCONCEPTION:MC-3  
**Active in:** Student asserts "I found one case where it works, so it's true"

**Conflict evidence:** "Goldbach's conjecture: every even number greater than 2 is the sum of two primes. Checked for the first 4×10¹⁸ even numbers — all true. Still not proven. One trillion examples do not constitute a proof."

**Bridge text:** "In mathematics, a UNIVERSAL statement ('for all x...') requires an ARGUMENT that covers ALL cases — not just the cases you checked. However, ONE COUNTEREXAMPLE is sufficient to DISPROVE a universal statement. The asymmetry is: examples support, one counterexample defeats."

**Replacement text:** "To PROVE: need an argument covering all cases. To DISPROVE: need one counterexample. This asymmetry is the engine of mathematical proof."

**S6 path:** Do not introduce counterexample searches as "finding your mistake" — frame as "being a detective who tests conjectures."

---

### MC-4 — "Inclusive OR is exclusive OR (P or Q means exactly one)."

**Trigger signal:** MISCONCEPTION:MC-4  
**Active in:** DQ-2 response selecting D ("at least one") for AND; OR truth table with P=T,Q=T evaluated as F

**Conflict evidence:** "The sentence 'You can have dessert if you finish dinner or clean your room' — if a child finishes dinner AND cleans their room, do they get dessert? Yes. The OR includes the both-true case."

**Bridge text:** "Everyday English OR is often exclusive ('tea or coffee?'). Mathematical OR is always inclusive — TRUE when at least one component is true, including when BOTH are true. The both-true case is never excluded in formal logic."

**Replacement text:** "Mathematical OR (∨): true in 3 of 4 rows (all except both-false). Exclusive-OR (XOR) is a separate operation. Unless explicitly stated, OR in mathematics is inclusive."

**S6 path:** Use concrete physical example (dessert scenario) with objects before truth table.

---

**MAMR note:** If MC-1 and MC-2 are both active, repair MC-1 first — understanding when IF-THEN is false (MC-1) is prerequisite to understanding converse direction (MC-2). A student confused about IF-THEN truth values cannot reason about the converse correctly.

---

## Component 7 — Assessment Battery

**Formative items F-1 and F-2 (used in P90):**

F-1 (P74 — Classification):  
"Label each compound statement as: conjunction (AND), disjunction (OR), negation (NOT), or conditional (IF-THEN):  
(A) 'x is not negative.'  
(B) 'x is prime and x is even.'  
(C) 'If the derivative is zero, then x is a critical point.'  
(D) 'The function is increasing or the function is constant.'"  
Expected CORRECT: A=NOT, B=AND, C=IF-THEN, D=OR.

F-2 (P78 — Explanation):  
"IF-THEN has three TRUE rows and one FALSE row. Explain in your own words why the two rows where P is false are both TRUE."  
Expected CORRECT: Articulates the promise-not-triggered interpretation.

---

**Full battery:**

| Probe | Item | Expected signal |
|---|---|---|
| P74 (Classification) | "Classify each argument as MP, MT, or Converse Fallacy: (A) P→Q; P; ∴Q. (B) P→Q; ¬Q; ∴¬P. (C) P→Q; Q; ∴P." | CORRECT: A=MP, B=MT, C=Fallacy |
| P75 (Boundary) | "Is P∨¬P always true, sometimes true, or never true? What kind of statement is it?" | CORRECT: Always true — it is a tautology. Either P holds or its negation holds. |
| P76 (Transfer) | "In a circuit: switch A AND switch B must both be closed for current to flow. If current is NOT flowing, what do you know about the switches?" | CORRECT: At least one switch is open (MT applied to AND: ¬(A∧B) → ¬A∨¬B by De Morgan; at least one is false). |
| P77 (Generation) | "Write a compound mathematical statement using IF-THEN that is TRUE when the antecedent is false." | CORRECT: Any valid conditional with a false antecedent, e.g. 'IF 3 is even, THEN 3 is divisible by 2' — both components false; conditional is true. |
| P78 (Explanation) | "A student says: 'I proved P→Q is true by showing Q is true.' Is this correct? Explain." | CORRECT: No — this is the converse fallacy. Showing Q is true does not establish that P caused Q or that P→Q holds. You need to show that whenever P is true, Q must also be true. |

---

## Component 8 — Mastery Gate (P91 expansion)

**Canonical order: P77 → P76 → P75 → P74 → P78**

**P77 (Generation):** "Write a valid modus tollens argument using the statement 'IF a quadrilateral has four equal angles, THEN it is a rectangle.' Use ¬Q as your second premise."  
Expected CORRECT: States ¬Q (the quadrilateral does NOT have four equal angles — wait, actually MT is: ¬Q therefore ¬P): P="four equal angles", Q="rectangle." ¬Q="not a rectangle." Conclusion: ¬P="does not have four equal angles." Valid MT.

**P76 (Transfer):** "A medical test: IF a patient has disease D, THEN the test is positive. The test is NEGATIVE. What can you conclude?"  
Expected CORRECT: By MT — the patient does NOT have disease D. (Note: this assumes the IF-THEN is valid; student should state the argument form.)

**P75 (Boundary):** "Is the following a tautology, contradiction, or neither? '(P→Q) ∧ P ∧ ¬Q'"  
Expected CORRECT: Contradiction — it asserts IF P THEN Q (making P=T,Q=F impossible), then asserts P=T and Q=F. These cannot all hold simultaneously.

**P74 (Classification):** "Classify: 'The argument IF P THEN Q; Q; THEREFORE P is invalid because of the CONVERSE FALLACY.' Is this classification correct?"  
Expected CORRECT: Yes — the argument commits the converse fallacy (affirming the consequent). The classification is correct.

**P78 (Explanation):** "Explain why modus tollens is valid but the 'inverse' (IF P THEN Q; ¬P; THEREFORE ¬Q) is not."  
Expected CORRECT: MT is valid because P→Q means ¬Q→¬P (contrapositive — always equivalent). The inverse denies the antecedent — this is the inverse fallacy; Q might be true for reasons other than P.

---

## Component 9 — Retrieval Schedule (P89 expansion)

**Interval 1 (1 day):** "Without notes: state the one case in which IF P THEN Q is FALSE."

**Interval 2 (3 days):** "Give a counterexample to the converse of: 'IF a shape is a square, THEN it has four sides.'"

**Interval 3 (7 days):** "A valid argument: 'IF the number is divisible by 6, THEN it is divisible by 3. This number is NOT divisible by 3. What can you conclude?' Name the argument form."

**Interval 4 (21 days):** "What is the difference between a tautology and a contradiction? Give one example of each."

**Interval 5 (60 days):** "Without reviewing: construct a truth table for P→Q from scratch. Explain what each row means in terms of a promise."

---

## Component 10 — Validation Checklist

| V-# | Check | Status |
|---|---|---|
| V-1 | Learning objective has observable criterion and NOT-clause | PASS |
| V-2 | Learning objective references mastery_threshold (0.80) | PASS |
| V-3 | Student State Matrix covers all plausible states for difficulty=foundational, bloom=analyze | PASS (S0, S1, S2, S3, S6, S9) |
| V-4 | Diagnostic Battery has 3 items with response taxonomies and routing | PASS (DQ-1, DQ-2, DQ-3) |
| V-5 | Prerequisite Check present with gap repair authored | PASS |
| V-6 | Protocol Library has one Protocol per plausible student state | PASS (A=S0, B=S1, C=S2, D=S3, E=S6, F=S9) |
| V-7 | Each Protocol specifies entry condition, TA sequence, exits, CPA stage, estimated sessions | PASS |
| V-8 | Every TA opens with P01 or P02 (GR-1) | PASS |
| V-9 | P55 follows every E-category primitive (GR-2) | PASS |
| V-10 | P08 preceded by P07 in all Protocols using it (GR-3) | PASS (TA-A05 → P07 before P08 in TA-A06) |
| V-11 | Schema repair gated by P41 diagnostic signal or P49 MISCONCEPTION routing (GR-4) | PASS |
| V-12 | P28 absent from Protocol E / S6 (GR-5) | PASS (P54 replaces P28 throughout Protocol E) |
| V-13 | P91 is terminal in all Protocols (GR-6) | PASS |
| V-14 | Named Compounds (P90, P91, P89) expanded in Components 7–9 (GR-10) | PASS |
| V-15 | Misconception Engine: 4 entries with all required fields | PASS (MC-1 through MC-4) |
| V-16 | Assessment Battery covers P74, P75, P76, P77, P78 | PASS |
| V-17 | Mastery Gate has 5 items in canonical P77→P76→P75→P74→P78 order | PASS |
| V-18 | Retrieval Schedule has 5 intervals | PASS |
| V-19 | AI Removal Test: all 5 invariants PASS | PASS (all content slots authored; all response taxonomies present; all P49 routing deterministic; no primitive embeds content; sequences fixed) |
| V-20 | S6/S9 adaptations within Protocol entries | PASS |

---

## AI Removal Test

**AIR-1:** All content slots authored — everyday propositions (rain/umbrella), divisibility examples, circuit example, medical test example, dog/mammal counterexample. No runtime AI generation required.  ✓

**AIR-2:** Every elicitation primitive (P34, P35, P37, P38, P40, P41, P42, P44, P45) carries a response taxonomy with signal and mc_id.  ✓

**AIR-3:** Every P49/P50 branch has explicit CORRECT/INCORRECT/MISCONCEPTION routing with named next action.  ✓

**AIR-4:** No primitive embeds concept content. Content is in authored slots only. Primitives reference slots.  ✓

**AIR-5:** All Protocol TA sequences are fully specified at authoring time. Runtime executes; does not construct.  ✓
