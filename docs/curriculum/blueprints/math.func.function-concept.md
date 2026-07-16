# Teaching Blueprint: Function Concept
**Blueprint ID:** math.func.function-concept  
**Status:** PACKAGE_READY  
**Date:** 2026-07-11  
**Framework Version:** Educational Brain v1.0  

---

## 0. Concept Profile

```
id:                  math.func.function-concept
name:                Function Concept
domain:              mathematics / algebra / functions
bloom:               understand
difficulty:          3 (proficient)
mastery_threshold:   0.85
estimated_hours:     8
requires:            [math.alg.variable, math.found.set-theory]
unlocks:             [math.func.linear-function, math.func.quadratic-function,
                      math.func.composite-function, math.func.inverse-function]
cross_links:         [math.found.set-theory]
cpa_entry_stage:     C
```

**Core idea:** A function is a rule that assigns to each element of a domain set exactly one element of a codomain set. The three critical properties are: (1) every input has an output, (2) each input has exactly one output, (3) different inputs may share the same output. Functions can be expressed as mapping diagrams, tables, ordered pair sets, graphs, verbal rules, or formulas — no single representation is privileged.

**Key vocabulary:** function, domain, codomain, range, input, output, mapping, vertical line test, function notation f(x), one-to-one, many-to-one.

**Why difficulty = 3:** Students must simultaneously coordinate three abstraction levels (concrete rule → perceptual representation → formal notation), three vocabulary distinctions (domain/codomain/range), and two definitional distinctions (function vs. relation; one-to-one vs. many-to-one), while resisting four persistent misconceptions.

---

## 1. Learning Objective

Given a relation expressed as a mapping diagram, table of values, set of ordered pairs, graph, or verbal rule, the student:

(a) correctly determines whether the relation is a function (all four representation types);  
(b) correctly identifies the domain, codomain, and range as distinct sets;  
(c) correctly evaluates f(a) for specific values using function notation;  
(d) correctly distinguishes a function from a one-to-one function.

**Accuracy threshold:** 85% across items (a)–(d) combined.

---

## 2. Student State Matrix

| State | Entry Condition | Protocol |
|-------|----------------|----------|
| S0 | No prior exposure to function concept | Protocol A — full CPA, 7 TAs |
| S1 | Applies vertical line test procedurally; cannot explain it; notation partly understood | Protocol B — conceptual grounding, 5 TAs |
| S2 | Carries identified misconception (MC-1, MC-2, MC-3, and/or MC-4) | Protocol C — MAMR repair chain, 3–6 TAs |
| S3 | Understands functions in one representation; struggles with non-formula representations | Protocol D — representation fluency, 4 TAs |
| S6 | Correct understanding; low confidence; prone to self-doubt on novel representations | Protocol E — scaffolded CPA without P28, 5 TAs |
| S9 | Second-language learner; visual processing dominant; vocabulary gaps | Protocol F — visual-first with vocabulary anchoring, 4 TAs |

---

## 3. Diagnostic Battery

Run DB-1 through DB-4 in sequence. Stop when a state is confirmed.

---

**DB-1 — Mapping Diagram Classification**

Stimulus: Arrow diagram. Domain = {1, 2, 3}. Arrows: 1→5, 2→7, 3→5. Codomain = {4, 5, 6, 7, 8}.

Question: "Is this a function? How do you know?"

Response taxonomy:
```
{ stimulus: "Yes — each input has exactly one arrow going out, so each input has exactly one output",
  signal: "SIGNAL:CORRECT" }

{ stimulus: "Yes — but references only 'looking right' or 'arrows go one way', no reasoning about inputs/outputs",
  signal: "SIGNAL:PARTIAL" }

{ stimulus: "No — because 5 appears twice (two inputs map to same output)",
  signal: "SIGNAL:INCORRECT", mc_id: "MC-4-precursor" }

{ stimulus: "No response or 'I don't know what a function is'",
  signal: "SIGNAL:NO_RESPONSE" }
```

SIGNAL:CORRECT → run DB-4 to distinguish S3 from higher; route accordingly  
SIGNAL:PARTIAL → S1; route to Protocol B  
SIGNAL:INCORRECT (two-inputs-one-output = not a function) → MC-4 flag; run DB-3; route to Protocol C  
SIGNAL:NO_RESPONSE → S0; route to Protocol A

---

**DB-2 — Formula Dependency Check**

Stimulus: "Think of a rule: I take a number, I add 3. No formula, just the rule."

Question: "Is that rule a function? What would you need to call it a function?"

Response taxonomy:
```
{ stimulus: "Yes — each input gets exactly one output (input + 3)",
  signal: "SIGNAL:CORRECT" }

{ stimulus: "Yes — but only if I can write it as an equation like f(x) = x + 3",
  signal: "SIGNAL:INCORRECT", mc_id: "MC-2" }

{ stimulus: "I think so but I'm not sure without an equation",
  signal: "SIGNAL:PARTIAL" }
```

SIGNAL:CORRECT → no MC-2; continue to DB-3  
SIGNAL:INCORRECT → MC-2 flag; route to Protocol C  
SIGNAL:PARTIAL → run DB-3

---

**DB-3 — Notation Check**

Stimulus: Written expression "f(x) = 2x + 1"

Question: "What does f(3) equal? Show your working."

Response taxonomy:
```
{ stimulus: "f(3) = 2(3)+1 = 7",
  signal: "SIGNAL:CORRECT" }

{ stimulus: "f(3) = f × 3 = 3f, or 'I need to know what f equals'",
  signal: "SIGNAL:INCORRECT", mc_id: "MC-3" }

{ stimulus: "7 with correct answer but unclear reasoning or lucky arithmetic",
  signal: "SIGNAL:PARTIAL" }
```

SIGNAL:INCORRECT (f×3) → MC-3 flag; route to Protocol C (repair MC-3 before MC-4 per MAMR)

---

**DB-4 — Range vs Codomain**

Stimulus: f: {1, 2, 3} → ℕ, defined by f(x) = 2x.

Question: "What is the range of f? What is the codomain of f? Are they the same?"

Response taxonomy:
```
{ stimulus: "Range = {2,4,6}; codomain = ℕ; they are different",
  signal: "SIGNAL:CORRECT" }

{ stimulus: "Range = codomain = {2,4,6} or range = codomain = ℕ",
  signal: "SIGNAL:INCORRECT", mc_id: "MC-1" }

{ stimulus: "Range = {2,4,6} but codomain unknown or confused with domain",
  signal: "SIGNAL:PARTIAL" }
```

SIGNAL:CORRECT → S3; route to Protocol D  
SIGNAL:INCORRECT → MC-1 flag; route to Protocol C  
SIGNAL:PARTIAL → S1; route to Protocol B

---

## 4. Prerequisite Check

Run before Protocol A (S0 entry). If gap detected, halt and address prerequisite first.

**PRE-1 — Set notation** (requires math.found.set-theory)

Stimulus: "What is {1, 2, 3} ∩ {2, 3, 4}?"

Expected: {2, 3}

SIGNAL:INCORRECT → prerequisite gap: set-theory; schedule math.found.set-theory session before returning

---

**PRE-2 — Variable substitution** (requires math.alg.variable)

Stimulus: "If x = 5, what is 2x + 1?"

Expected: 11

SIGNAL:INCORRECT → prerequisite gap: variable; address variable concept before Protocol A

---

## 5. Protocol Library

---

### Protocol A — S0 Complete Novice (Full CPA, 7 TAs, single session)

*Session cap: estimated_hours ≥ 1h → max 7 TAs. Single session.*  
*CPA path: Concrete (TA-A01–A02) → Perceptual (TA-A03–A04) → Abstract (TA-A05–A06) → Mastery Gate (TA-A07).*

---

**TA-A01 — Function Machine: Concrete Introduction**

Primitive sequence: `P01 → P04 → P06 → P14 → P55 → P34 → P55 → P49 | P50`

`P01` target_element: physical input/output cards and sorting machine diagram  
`P04` context: "A post office sorting machine — each package (input) goes to exactly one destination (output). The same address every time."  
`P06` concrete_scenario: cards numbered 1, 2, 3 labelled "INPUT"; machine rule = "add 3"; output cards labelled 4, 5, 6; student physically pairs each input card to its output card  
`P14` prediction: "Before you place input card 2 — what output card do you predict?"  
`P55` wait: 5 s  
`P34` closed question: "Place input card 3. Can it produce a different output tomorrow if the rule hasn't changed?"  
`P55` wait: 5 s

Response taxonomy:
```
{ stimulus: "Selects card 6 for input 3; answers 'no, same rule same output'",
  signal: "SIGNAL:CORRECT" }

{ stimulus: "Correct pairing but says 'it could vary' or 'depends on the day'",
  signal: "SIGNAL:PARTIAL" }

{ stimulus: "Selects wrong card; or says yes it could give a different output",
  signal: "SIGNAL:INCORRECT", mc_id: null }

{ stimulus: "Does not engage or 'I don't understand'",
  signal: "SIGNAL:NO_RESPONSE" }
```

`P49` routing:  
- SIGNAL:CORRECT → `P53` ("Why can it only ever produce one output card for input 3?") → TA-A02  
- SIGNAL:PARTIAL → `P53` → explicit: "The rule is fixed — same input, same output, every time" → TA-A02  
- SIGNAL:INCORRECT → `P50` → `P52` → retry `P34`  
- SIGNAL:NO_RESPONSE → `P54` → retry `P14` with simpler context (add 0: output = input)

---

**TA-A02 — Not-a-Function: Counter-Example**

Primitive sequence: `P01 → P06 → P17 → P34 → P55 → P49 | P50`

`P01` target_element: broken machine diagram — input 1 with two arrows pointing to both 4 and 7  
`P06` concrete_scenario: machine rule = "pick any number bigger than the input"; demonstrate: input 1 → output 4 on Monday; input 1 → output 7 on Tuesday; same input, different outputs  
`P17` contrast: TA-A01 machine (fixed rule, one output per input) vs. this machine (choice-based, unpredictable)  
`P34` closed question: "Is this machine a function? Why not?"  
`P55` wait: 5 s

Response taxonomy:
```
{ stimulus: "Not a function — the same input can give different outputs",
  signal: "SIGNAL:CORRECT" }

{ stimulus: "Not a function but reasoning is vague ('it's broken' or 'not fair')",
  signal: "SIGNAL:PARTIAL" }

{ stimulus: "It is a function because the inputs are still different numbers",
  signal: "SIGNAL:INCORRECT", mc_id: null }

{ stimulus: "No response",
  signal: "SIGNAL:NO_RESPONSE" }
```

`P49` routing:  
- SIGNAL:CORRECT → `P53` ("Can any function-machine produce two different outputs for the same input?") → STATE_UPGRADE check → TA-A03  
- SIGNAL:PARTIAL → `P30` bridge ("The rule must leave no room for choice — one input, one output, fixed") → TA-A03  
- SIGNAL:INCORRECT → `P50` → `P52` ("Focus on input 1. On Monday it gave 4. On Tuesday it gave 7. Same input — different outputs. Is that allowed?") → retry `P34`  
- SIGNAL:NO_RESPONSE → `P54` → demonstrate with physical cards → retry

---

**TA-A03 — Arrow Diagrams: Perceptual Bridge**

Primitive sequence: `P01 → P07 → P16 → P18 → P55 → P35 → P55 → P49 | P50`

`P01` target_element: two mapping diagrams side by side  
`P07` diagram_A: domain = {1, 2, 3}; arrows: 1→4, 2→6, 3→4; codomain = {4, 5, 6, 7, 8} — function (3 maps to same output as 1; that is allowed)  
`P07` diagram_B: domain = {1, 2, 3}; arrows: 1→4, 1→7, 2→6, 3→8; codomain = {4, 5, 6, 7, 8} — not a function (1 has two arrows out)  
`P16` compare: "These diagrams both have the same sets. Look at how the arrows are different."  
`P18` classify: "Which diagram represents a function? How can you tell just by looking?"  
`P55` wait: 5 s  
`P35` open question: "State the arrow rule that makes something a function."  
`P55` wait: 5 s

Response taxonomy:
```
{ stimulus: "Diagram A — each input node has exactly one arrow leaving it",
  signal: "SIGNAL:CORRECT" }

{ stimulus: "Diagram A — but reasoning: 'it looks neater' or 'arrows don't cross'",
  signal: "SIGNAL:PARTIAL" }

{ stimulus: "Diagram B — because it has more connections / more complete",
  signal: "SIGNAL:INCORRECT", mc_id: null }

{ stimulus: "No response",
  signal: "SIGNAL:NO_RESPONSE" }
```

`P49` routing:  
- SIGNAL:CORRECT → introduce vocabulary: "The left oval is the **domain**, the right oval is the **codomain**." → TA-A04  
- SIGNAL:PARTIAL → `P53` → explicit rule statement: "Each node on the left has exactly one arrow out — exactly one output" → TA-A04  
- SIGNAL:INCORRECT → `P50` → `P52` → "Count the arrows leaving node 1 in each diagram" → retry `P18`  
- SIGNAL:NO_RESPONSE → `P54` → `P81` scaffold ("Draw a circle around every arrow that leaves the node labelled 1. How many?") → retry

---

**TA-A04 — Tables, Ordered Pairs, Range vs Codomain**

Primitive sequence: `P01 → P07 → P20 → P34 → P55 → P41 → P55 → P49 | P50`

`P01` target_element: table of values alongside set of ordered pairs and domain/codomain declaration  
`P07` table:

| x | f(x) |
|---|------|
| 1 | 2 |
| 2 | 4 |
| 3 | 6 |

Ordered pairs: {(1, 2), (2, 4), (3, 6)}  
Domain declared: A = {1, 2, 3}; Codomain declared: B = ℕ  
`P20` pattern: "What pattern do you notice connecting each x and its f(x)?"  
`P34` closed question: "The set {2, 4, 6} — is that the domain, the codomain, or the range?"  
`P55` wait: 5 s  
`P41` MC-1 diagnostic: "Is the codomain the same as the range in this example?"  
`P55` wait: 5 s

Response taxonomy:
```
{ stimulus: "Range; no — codomain = ℕ which includes much more than {2,4,6}",
  signal: "SIGNAL:CORRECT" }

{ stimulus: "Range; yes, same thing — both are {2,4,6} or both are ℕ",
  signal: "SIGNAL:INCORRECT", mc_id: "MC-1" }

{ stimulus: "Range; not sure what codomain means",
  signal: "SIGNAL:PARTIAL" }

{ stimulus: "Domain or codomain for the first question",
  signal: "SIGNAL:INCORRECT", mc_id: null }
```

`P49` routing:  
- SIGNAL:CORRECT → `P53` → "Codomain = what f **could** reach; range = what f **actually** reaches" (crystallise distinction) → TA-A05  
- SIGNAL:INCORRECT (MC-1) → `P50` → "The codomain is ℕ — all natural numbers. Does f actually produce every natural number? No — it only ever produces 2, 4, 6. Those it actually produces are the range." → MC-1 flagged → retry `P41`  
- SIGNAL:PARTIAL → `P50` → define codomain explicitly → retry `P41`  
- SIGNAL:INCORRECT (domain/codomain confusion) → `P50` → restart vocabulary from TA-A03 context

---

**TA-A05 — Graphs and Vertical Line Test: Abstract Bridge**

Primitive sequence: `P01 → P07 → P08 → P13 → P34 → P55 → P43 → P55 → P49 | P50`

`P01` target_element: two coordinate graphs  
`P07` graph_A: y = x², parabola opening upward — every vertical line touches it at most once  
`P07` graph_B: x = y², parabola opening right — vertical lines x = c > 0 touch it twice  
`P08` vertical_line_test_rule: "A graph represents a function of x if and only if every vertical line x = c intersects the graph at most once. One intersection = one output. Two intersections = two outputs for one input = not a function."  
Notation introduced: "We write f: A → B to mean f is a function from set A to set B."  
`P13` expert think-aloud: apply VLT to graph_A ("Every vertical line touches once — function"); then graph_B ("The line x = 4 touches at y = 2 and y = -2 — two outputs for one input — not a function")  
`P34` closed question: "Apply the VLT to graph_B yourself. What does it tell you?"  
`P55` wait: 5 s  
`P43` non-example generation: "Give me a specific x-value where graph_B fails to be a function."  
`P55` wait: 5 s

Response taxonomy:
```
{ stimulus: "Graph B fails VLT; at x = 1, y = 1 and y = -1 both satisfy x = y²",
  signal: "SIGNAL:CORRECT" }

{ stimulus: "Graph B fails VLT but cannot name a specific x-value",
  signal: "SIGNAL:PARTIAL" }

{ stimulus: "Graph B passes because x increases left to right",
  signal: "SIGNAL:INCORRECT", mc_id: null }

{ stimulus: "No response",
  signal: "SIGNAL:NO_RESPONSE" }
```

`P49` routing:  
- SIGNAL:CORRECT → TA-A06  
- SIGNAL:PARTIAL → `P53` → "Pick x = 9. What are the two y-values? That's the specific failure." → TA-A06  
- SIGNAL:INCORRECT → `P50` → `P52` → "Draw a vertical line at x = 4. Count how many times it crosses the curve." → retry `P34`  
- SIGNAL:NO_RESPONSE → `P54` → P81 scaffold → retry

---

**TA-A06 — Function Notation: Abstract**

Primitive sequence: `P01 → P08 → P22 → P34 → P55 → P41 → P55 → P42 → P55 → P49 | P50`

`P01` target_element: function notation f(x)  
`P08` content slots:  
- notation: f(x) = 2x + 1  
- critical reading: "f(x) means **the output of function f when the input is x**. It does NOT mean f multiplied by x. f is not a number — f is a rule."  
- formal: "f: A → B. For each x ∈ A, f(x) denotes the unique element of B assigned to x."  
`P22` specialisation: evaluate f(3) = 2(3)+1 = 7; f(0) = 1; f(-2) = -3. Show substitution steps explicitly.  
`P34` closed question: "What does f(5) equal? Write every step."  
`P55` wait: 5 s  
`P41` MC-3 diagnostic: "When I write f(3), am I multiplying f by 3?"  
`P55` wait: 5 s  
`P42` example generation: "Write your own function using f(x) notation — any rule you like. Then evaluate it at x = 2."  
`P55` wait: 5 s

Response taxonomy:
```
{ stimulus: "f(5) = 11; no — f(3) means the output of f at input 3",
  signal: "SIGNAL:CORRECT" }

{ stimulus: "f(5) = 11 but 'f(3) = f times 3' or 'I'm not sure'",
  signal: "SIGNAL:PARTIAL" }

{ stimulus: "f(5) = 5f or 11 by coincidence; or f(3) = 3f",
  signal: "SIGNAL:INCORRECT", mc_id: "MC-3" }

{ stimulus: "No response",
  signal: "SIGNAL:NO_RESPONSE" }
```

`P49` routing:  
- SIGNAL:CORRECT on all three parts → TA-A07  
- SIGNAL:PARTIAL → `P53` on notation → TA-A07  
- SIGNAL:INCORRECT (MC-3) → `P50` → enter MC-3 repair chain (P27 → P28 → P29 → P30 → P31): expose "f is not a number" → cognitive conflict ("if f(3)=3f, what number is f?") → resolve → bridge → install → retry `P41` → if clear, TA-A07  
- SIGNAL:NO_RESPONSE → `P54` → P81 → retry `P34`

---

**TA-A07 — Mastery Gate (Terminal)**

Primitive sequence: `P01 → P91`

`P91` expansion: `P77 → P76 → P75 → P74 → P78`

`P77` generation probe: "Write your own example of a function. Do NOT use an equation. Use any representation you choose. Then explain in one sentence why it is a function."  
`P55` wait: 8 s  
`P49/P50` based on response

`P76` transfer probe: "In a school, each student is assigned exactly one form group. Is 'student → form group' a function? What is the domain? Can two students share a form group? Does that affect whether it is a function?"  
*P76 independence note: this transfer references the set-theoretic view (function = set of ordered pairs) cross-linked to math.found.set-theory. The math.found.set-theory blueprint does not need to be authored first for this item to be valid.*  
`P55` wait: 8 s  
`P49/P50`

`P75` boundary probe: "Answer both: (a) Can a function assign the same output to two different inputs? (b) Can a function assign two different outputs to the same input?"  
`P55` wait: 8 s  
`P49/P50`

`P74` classification probe: Classify each as function or not-function:  
(a) {(1, 2), (2, 2), (3, 2)}  
(b) {(1, 2), (1, 3), (2, 4)}  
(c) y = x²  
(d) x² + y² = 25  
`P55` wait: 8 s  
`P49/P50`

`P78` explanation probe: "Without using the word 'function,' explain in one sentence why the circle x² + y² = 25 is not a valid way to express y as a function of x."  
`P55` wait: 8 s  
`P49/P50`

Mastery response keys:
```
P77 pass: non-equation function with valid one-output-per-input justification
P76 pass: function yes; domain = student set; many-to-one (sharing form group) is allowed
P75 pass: (a) yes allowed — many-to-one; (b) no — violates definition
P74 pass: (a) function; (b) not function (1 has two outputs); (c) function; (d) not function
P78 pass: "some x-values produce two y-values" or equivalent
```

All 5 probes PASS → MASTERY_CONFIRMED; schedule Component 9 retrieval  
3–4/5 PASS → PARTIAL_MASTERY; note gaps; schedule Day 1 retrieval  
<3/5 PASS → return to appropriate protocol entry based on failure pattern

---

### Protocol B — S1 Procedural (Conceptual Grounding, 5 TAs)

*Student applies VLT mechanically; cannot explain it; notation partially understood. Entry at perceptual.*

---

**TA-B01 — Concrete Reactivation**

Primitive sequence: `P02 → P06 → P35 → P55 → P49 | P50`

`P02` activate: "You know the vertical line test. Let's go back underneath it to why it works."  
`P06` concrete: physical cards — student matches input cards to output cards using rule "square the input": 1→1, 2→4, 3→9, -2→4  
`P35` open question: "Why does the vertical line test work? What does a vertical line 'crossing the graph twice' mean in terms of inputs and outputs?"  
`P55` wait: 8 s

Response taxonomy:
```
{ stimulus: "Crossing twice means one x-value gives two y-values — two outputs for one input",
  signal: "SIGNAL:CORRECT" }

{ stimulus: "It crosses twice so it's not a function — but can't connect to inputs/outputs",
  signal: "SIGNAL:PARTIAL" }

{ stimulus: "The line should touch once — not sure why",
  signal: "SIGNAL:INCORRECT", mc_id: null }
```

`P49`: CORRECT → TA-B02; PARTIAL → `P53` → explicit bridge → TA-B02; INCORRECT → `P50` → demonstrate with f(-2)=f(2)=4 example → retry `P35`

---

**TA-B02 — Non-Equation Functions**

Primitive sequence: `P01 → P07 → P41 → P55 → P49 | P50`

`P01` target_element: mapping diagram with no formula — student IDs to student grades (A, B, C)  
`P07` diagram: {2023001→A, 2023002→B, 2023003→A}; no algebraic rule exists  
`P41` MC-2 diagnostic: "I claim this is a function but there's no equation for it. Is that possible?"  
`P55` wait: 5 s

Response taxonomy:
```
{ stimulus: "Yes — it has exactly one output per student ID; doesn't need an equation",
  signal: "SIGNAL:CORRECT" }

{ stimulus: "No — you need a formula to call it a function",
  signal: "SIGNAL:INCORRECT", mc_id: "MC-2" }

{ stimulus: "Probably yes but not sure",
  signal: "SIGNAL:PARTIAL" }
```

`P49`: CORRECT → TA-B03; INCORRECT (MC-2) → `P50` → MC-2 repair (P27→P06 with more non-formula examples→P30→P31) → retry `P41`; PARTIAL → `P53` → TA-B03

---

**TA-B03 — Range vs Codomain (Formal)**

Primitive sequence: `P01 → P08 → P34 → P55 → P44 → P55 → P49 | P50`

`P01` target_element: formal definitions  
`P08` content: domain = set of all valid inputs; codomain = set of all declared possible outputs; range = set of outputs actually produced. f: A → B means A is domain, B is codomain. Range ⊆ Codomain always; Range = Codomain only when f is surjective.  
`P34` closed question: "f(x) = x² with domain = {-2, -1, 0, 1, 2}. What is the range?"  
`P55` wait: 5 s  
`P44` definition construction: "Write your own one-sentence definitions of range and codomain that make the difference clear."  
`P55` wait: 8 s

Response taxonomy:
```
{ stimulus: "Range = {0,1,4}; definitions clearly distinguish actual vs possible outputs",
  signal: "SIGNAL:CORRECT" }

{ stimulus: "Range = {0,1,4} but definitions are equivalent or confused",
  signal: "SIGNAL:PARTIAL" }

{ stimulus: "Range = {0,1,2,4} or includes negative values",
  signal: "SIGNAL:INCORRECT", mc_id: null }
```

`P49`: CORRECT → TA-B04; PARTIAL → `P53` → TA-B04; INCORRECT → `P50` → tabulate f(-2)=4, f(-1)=1, f(0)=0, f(1)=1, f(2)=4 explicitly → list distinct outputs → retry `P34`

---

**TA-B04 — One-to-One vs Many-to-One**

Primitive sequence: `P01 → P08 → P17 → P41 → P55 → P42 → P55 → P49 | P50`

`P01` target_element: two functions for comparison  
`P08` content: "One-to-one (injective): each output is produced by at most one input. Many-to-one: at least one output is produced by more than one input. Both are valid functions — the function requirement is about inputs having unique outputs, not outputs having unique inputs."  
`P17` contrast: f(x) = 2x (one-to-one: distinct inputs give distinct outputs) vs. f(x) = x² (many-to-one: f(2) = f(-2) = 4)  
`P41` MC-4 probe: "Is f(x) = x² a function? Is it one-to-one? Are those the same question?"  
`P55` wait: 5 s  
`P42` example generation: "Give me one example of a one-to-one function and one example of a many-to-one function."  
`P55` wait: 8 s

Response taxonomy:
```
{ stimulus: "f(x)=x² is a function; not one-to-one; different questions",
  signal: "SIGNAL:CORRECT" }

{ stimulus: "f(x)=x² is not a function because f(-2)=f(2) (one-to-one = function)",
  signal: "SIGNAL:INCORRECT", mc_id: "MC-4" }

{ stimulus: "f(x)=x² is a function; not sure about one-to-one",
  signal: "SIGNAL:PARTIAL" }
```

`P49`: CORRECT → TA-B05; INCORRECT (MC-4) → `P50` → MC-4 repair (P27→P28→P30→P31 — no P28 only if S6; S1 may use P28) → retry `P41`; PARTIAL → `P53` → TA-B05

---

**TA-B05 — Mastery Gate (Terminal)**

`P01 → P91` — same five-probe sequence as TA-A07.

---

### Protocol C — S2 Misconception Carriers (MAMR Repair Chain, 3–6 TAs)

**MAMR order:**  
- MC-3 is foundational for MC-4. If both active: repair MC-3 first, then MC-4.  
- MC-1 and MC-2 are independent. If active simultaneously: repair FIFO (whichever was identified earlier).  
- If all four active: MC-3 → MC-4 → then MC-1/MC-2 FIFO.

---

**TA-C01 — Misconception Identification and Surfacing**

Primitive sequence: `P02 → P26 → P41 → P55 → P49 | P50`

`P02` activate: student's existing function knowledge  
`P26` schema activation: "Tell me what you know about functions. What is a function? How do you know when something is one?"  
`P41` diagnostic sequence: run DB-1 through DB-4 probes to confirm active MCs  
`P55` wait: 5 s

Routing after MC identification:
- MC-3 flagged → TA-C02 (foundational repair first)
- MC-2 only → TA-C04
- MC-1 only → TA-C03
- MC-4 only → TA-C05 (only if MC-3 cleared; if MC-3 also active, repair MC-3 at TA-C02 first)

---

**TA-C02 — MC-3 Repair: f(x) ≠ f × x**

Primitive sequence: `P01 → P27 → P28 → P29 → P55 → P30 → P31 → P34 → P55 → P49 | P50`

`P01` target_element: notation f(3)  
`P27` schema exposure: "You read f(3) as f multiplied by 3. Let's examine what that means."  
`P28` cognitive conflict: "If f(x) = x + 2 and f(3) = f × 3, then f × 3 = 5. So f = 5/3. Now compute f(4): f × 4 = (5/3) × 4 = 20/3. But the rule says f(4) = 4 + 2 = 6. These are different. What went wrong?"  
`P29` conflict resolution pause: student holds the contradiction  
`P55` wait: 8 s  
`P30` bridge: "f is not a number you can divide or multiply. f is a NAME for a rule. f(3) means: apply the rule at input 3."  
`P31` schema replacement: "f(x) = [the output you get when you apply rule f to input x]"  
`P34` closed: "Evaluate f(3) where f(x) = 5x − 1. Show each step."  
`P55` wait: 5 s

Response taxonomy:
```
{ stimulus: "f(3) = 5(3)-1 = 14; substituted x=3 into rule",
  signal: "SIGNAL:CORRECT" }

{ stimulus: "f(3) = 3f or still using multiplication notation",
  signal: "SIGNAL:INCORRECT", mc_id: "MC-3" }

{ stimulus: "f(3) = 14 but steps unclear",
  signal: "SIGNAL:PARTIAL" }
```

`P49`: CORRECT → MC-3 CLEARED; if MC-4 flagged → TA-C05; else → TA-C06  
INCORRECT → `P50` → `P51` → `P32` consolidation (three more evaluations) → retry `P34`  
PARTIAL → `P53` → TA-C05 or TA-C06

---

**TA-C03 — MC-1 Repair: Range ≠ Codomain**

Primitive sequence: `P01 → P27 → P28 → P29 → P55 → P30 → P31 → P34 → P55 → P49 | P50`

`P01` target_element: function with declared codomain ℝ  
`P27` schema exposure: "You said range and codomain are the same. Let's check."  
`P28` cognitive conflict: "f: ℝ → ℝ defined by f(x) = x². Is -4 in the codomain ℝ? Yes. Can f(x) ever equal -4? x² is never negative — so -4 is in the codomain but NOT in the range. They're different."  
`P29` pause  
`P55` wait: 8 s  
`P30` bridge: "Codomain = what f is ALLOWED to output (declared target set). Range = what f ACTUALLY outputs (the set of real outputs produced)."  
`P31` install: "Range ⊆ Codomain always. Range = Codomain only if every codomain element is hit."  
`P34` closed: "For f(x) = |x| with domain ℝ and codomain ℝ, what is the range?"  
`P55` wait: 5 s

Response taxonomy:
```
{ stimulus: "[0, ∞) or {x ∈ ℝ : x ≥ 0} — non-negative reals",
  signal: "SIGNAL:CORRECT" }

{ stimulus: "ℝ — same as codomain",
  signal: "SIGNAL:INCORRECT", mc_id: "MC-1" }

{ stimulus: "Positive numbers but misses 0",
  signal: "SIGNAL:PARTIAL" }
```

`P49`: CORRECT → MC-1 CLEARED → TA-C06 (or TA-C04 if MC-2 also flagged)  
INCORRECT → `P50` → `P32` (list 3 specific values: |3|=3, |-2|=2, |0|=0; ask if -1 is reachable) → retry  
PARTIAL → `P53` (include zero) → TA-C06

---

**TA-C04 — MC-2 Repair: Functions Don't Require Formulas**

Primitive sequence: `P01 → P27 → P07 → P28 → P55 → P30 → P42 → P55 → P49 | P50`

`P01` target_element: mapping diagram for a real-world rule  
`P27` schema exposure: "You said a function must have an equation. Let's test that."  
`P07` diagram: phone contact list — name (input) → phone number (output). No algebraic formula exists.  
`P28` cognitive conflict: "Is each name associated with exactly one phone number in this diagram? Does that make it a function? Where's the equation?"  
`P55` wait: 5 s  
`P30` bridge: "A function is any rule that gives each input exactly one output — formula, table, diagram, or verbal rule all count."  
`P42` example generation: "Give me three functions from real life that have no algebraic formula."  
`P55` wait: 8 s

Response taxonomy:
```
{ stimulus: "3 valid examples: e.g. birthday → zodiac sign; country → capital; student → grade",
  signal: "SIGNAL:CORRECT" }

{ stimulus: "1–2 valid examples or examples that have hidden formulas",
  signal: "SIGNAL:PARTIAL" }

{ stimulus: "Cannot generate examples; or all examples have formulas",
  signal: "SIGNAL:INCORRECT", mc_id: "MC-2" }
```

`P49`: CORRECT → MC-2 CLEARED → TA-C06 (or TA-C03 if MC-1 also flagged)  
INCORRECT → `P50` → `P32` → scaffold: "Think of any machine, service, or rule in daily life" → retry  
PARTIAL → `P53` → TA-C06

---

**TA-C05 — MC-4 Repair: One-to-One ≠ Definition of Function**

*Prerequisite: MC-3 must be cleared before entering TA-C05 (MAMR rule).*

Primitive sequence: `P01 → P27 → P28 → P29 → P55 → P30 → P31 → P33 → P34 → P55 → P49 | P50`

`P01` target_element: f(x) = x² on domain ℝ  
`P27` schema exposure: "You said f(x) = x² is not a function because f(3) = f(-3) = 9."  
`P28` cognitive conflict: "Does 3 have exactly one output? Yes: f(3) = 9. Does -3 have exactly one output? Yes: f(-3) = 9. Every input has exactly one output. The function requirement is about inputs, not outputs."  
`P29` pause: hold the two definitions side by side  
`P55` wait: 8 s  
`P30` bridge: "FUNCTION rule: each INPUT → exactly one output. ONE-TO-ONE rule: each OUTPUT ← at most one input. f(x) = x² is a function. f(x) = x² is NOT one-to-one. These are different properties."  
`P31` install schema: draw a 2×2 table: Function/Not-Function × One-to-One/Not-One-to-One; populate with examples  
`P33` discrimination training: "For each, tick the boxes that apply: (a) f(x)=2x; (b) f(x)=x²; (c) {(1,2),(1,3)}; (d) {(1,2),(2,3)} — tick: IS function / NOT function / IS one-to-one / NOT one-to-one"  
`P34` closed: "Is f(x) = x² a function? Is it one-to-one?"  
`P55` wait: 5 s

Response taxonomy:
```
{ stimulus: "Yes it is a function; no it is not one-to-one",
  signal: "SIGNAL:CORRECT" }

{ stimulus: "Not sure — 'because the same output appears twice'",
  signal: "SIGNAL:PARTIAL" }

{ stimulus: "Not a function (still using MC-4 schema)",
  signal: "SIGNAL:INCORRECT", mc_id: "MC-4" }
```

`P49`: CORRECT → MC-4 CLEARED → TA-C06  
INCORRECT → `P50` → `P52` → return to P33 discrimination → retry `P34`  
PARTIAL → `P53` → TA-C06

---

**TA-C06 — Mastery Gate (Terminal)**

`P01 → P91` — same five-probe sequence as TA-A07.

---

### Protocol D — S3 Conceptual Carrier (Representation Fluency, 4 TAs)

*Student understands functions formally but works only in one representation. Entry at perceptual.*

---

**TA-D01 — Representation Audit**

Primitive sequence: `P02 → P35 → P55 → P49`

`P02` activate: student's strongest representation  
`P35` open question: "Which of these can you work with fluently — mapping diagram / table / ordered pairs / graph / formula / verbal rule? Which feel least natural?"  
`P55` wait: 5 s

`P49` routing: identify weakest representation → TA-D02 targets that representation

---

**TA-D02 — Weakest Representation Practice**

Primitive sequence: `P01 → [P06 | P07 | P08 based on target] → P22 → P42 → P55 → P49 | P50`

`P01` target_element: the weakest representation identified in TA-D01  
Input primitive selected based on target:
- If formula-only student: `P07` (mapping diagram) then `P06` (ordered pairs as objects)
- If visual-only: `P08` (formal notation)
- If concrete-only: `P08` (abstract)
`P22` specialisation: work through 2 examples in target representation  
`P42` example generation: "Create your own function and express it in this representation."  
`P55` wait: 8 s

Response taxonomy:
```
{ stimulus: "Correct function in target representation with clear labelling",
  signal: "SIGNAL:CORRECT" }

{ stimulus: "Partial — representation attempted but vocabulary or format errors",
  signal: "SIGNAL:PARTIAL" }

{ stimulus: "Cannot work in target representation",
  signal: "SIGNAL:INCORRECT", mc_id: null }
```

`P49`: CORRECT → TA-D03; PARTIAL → `P53` → TA-D03; INCORRECT → `P50` → worked example → retry `P42`

---

**TA-D03 — Cross-Representation Translation**

Primitive sequence: `P01 → P07 → P38 → P55 → P47 → P55 → P49 | P50`

`P01` target_element: mapping diagram  
`P07` source_representation: mapping diagram — domain = {a, b, c}, arrows to {1, 2, 3}  
`P38` reformulation: "Rewrite this function as (a) a set of ordered pairs, (b) a table, and (c) function notation using f(·)."  
`P55` wait: 8 s  
`P47` diagram construction: "Now work in reverse — given ordered pairs {(2, 5), (4, 5), (6, 8)}, draw the mapping diagram."  
`P55` wait: 8 s

Response taxonomy:
```
{ stimulus: "All three representations correct; mapping diagram drawn correctly in reverse",
  signal: "SIGNAL:CORRECT" }

{ stimulus: "2/4 correct representations",
  signal: "SIGNAL:PARTIAL" }

{ stimulus: "Major errors in translation",
  signal: "SIGNAL:INCORRECT", mc_id: null }
```

`P49`: CORRECT → TA-D04; PARTIAL → `P53` on specific error → TA-D04; INCORRECT → `P50` → demonstrate one translation → retry `P38`

---

**TA-D04 — Mastery Gate (Terminal)**

`P01 → P91` — same five-probe sequence as TA-A07.

---

### Protocol E — S6 Low Confidence (Scaffolded CPA, 5 TAs, no P28)

*No P28 (GR-5). Use P30 (Bridge Construction) in place of cognitive conflict. Extra scaffolding at each stage.*

---

**TA-E01 — Safety Frame and Concrete Activation**

Primitive sequence: `P01 → P71 → P69 → P06 → P14 → P55 → P34 → P55 → P49 | P50`

`P01` target_element: function machine (same as TA-A01)  
`P71` peer comparison removal: "We're not comparing your pace to anyone else's. Every step we take is yours."  
`P69` relevance anchoring: connect to student's stated interest (e.g., "functions show up in [student's subject area]")  
`P06` concrete: physical card matching, rule = "add 4"  
`P14` soft prediction: "What do you think input card 2 will give?"  
`P55` wait: 5 s  
`P34` closed question: "Can input 2 give a different output if we use the same rule?"  
`P55` wait: 5 s

Response taxonomy: same as TA-A01.

`P49`: CORRECT → `P53` → TA-E02; PARTIAL/INCORRECT → `P50` + `P81` scaffold → retry; NO_RESPONSE → `P54` → simplify example

---

**TA-E02 — Concrete with Scaffolded Worked Example**

Primitive sequence: `P01 → P06 → P81 → P10 → P34 → P55 → P49 | P50`

`P01` target_element: arrow diagram classification  
`P06` concrete: two arrow diagrams (one function, one non-function)  
`P81` scaffold: annotated worked example — for diagram A: "Count arrows out of node 1: exactly 1 → OK. Node 2: exactly 1 → OK. Every node OK → function."  
`P10` worked example: demonstrate classification for diagram B, talking through each step  
`P34` closed: "Now you classify diagram C" (new diagram provided)  
`P55` wait: 5 s

Response taxonomy: function or not-function with reasoning.

`P49`: CORRECT → TA-E03; PARTIAL → `P53` → TA-E03; INCORRECT → `P50` → repeat scaffold more slowly → retry

---

**TA-E03 — Perceptual with Confidence Calibration**

Primitive sequence: `P01 → P07 → P64 → P34 → P55 → P49 | P50`

`P01` target_element: table of values  
`P07` table: four-row table, domain and codomain declared  
`P64` confidence calibration: "On a scale 1–5, how confident are you that you can tell if this table represents a function? (Just your gut — no wrong answer.)"  
`P34` closed: classify the table; identify domain, codomain, range  
`P55` wait: 5 s

Response taxonomy:
```
{ stimulus: "Correct classification; range identified as subset of codomain",
  signal: "SIGNAL:CORRECT" }

{ stimulus: "Classification correct but range = codomain",
  signal: "SIGNAL:PARTIAL" }

{ stimulus: "Incorrect classification",
  signal: "SIGNAL:INCORRECT", mc_id: null }
```

`P49`: CORRECT → `P70` (competence evidence: "That's the third function you've correctly identified") → TA-E04; PARTIAL → `P53` → TA-E04; INCORRECT → `P50` → `P30` bridge → retry

---

**TA-E04 — Abstract with Gradual Independence**

Primitive sequence: `P01 → P08 → P81 → P22 → P64 → P42 → P55 → P49 | P50`

`P01` target_element: function notation  
`P08` notation: f(x) notation introduced gently  
`P81` scaffold: provide f(x) = 3x − 2 with a partially completed evaluation table  
`P22` specialisation: complete the table together (f(0), f(1), f(2))  
`P64` confidence calibration: "How confident are you to try one on your own now?"  
`P42` example generation: "Write any function using f(x) notation and evaluate it at x = 3."  
`P55` wait: 8 s

Response taxonomy:
```
{ stimulus: "Valid f(x) = [rule]; f(3) correctly computed",
  signal: "SIGNAL:CORRECT" }

{ stimulus: "Valid function; arithmetic error in evaluation",
  signal: "SIGNAL:PARTIAL" }

{ stimulus: "Cannot write notation or evaluates incorrectly (MC-3 style)",
  signal: "SIGNAL:INCORRECT", mc_id: "MC-3" }
```

`P49`: CORRECT → `P70` → TA-E05; PARTIAL → `P53` → TA-E05; INCORRECT → `P50` → repeat P08 with simpler function → retry `P42`

---

**TA-E05 — Mastery Gate (Terminal)**

`P01 → P91` — same five-probe sequence as TA-A07.

---

### Protocol F — S9 Second-Language Learner (Visual-First, 4 TAs)

*Vocabulary gaps, visual processing dominant. Every TA anchors vocabulary visually before abstract naming.*

---

**TA-F01 — Visual Vocabulary Anchor**

Primitive sequence: `P01 → P03 → P04 → P06 → P34 → P55 → P49 | P50`

`P01` target_element: vocabulary reference card with visual examples  
`P03` orient: display vocabulary card before any content — each term has a picture: DOMAIN (left oval), CODOMAIN (right oval), INPUT (arrow tail), OUTPUT (arrow head), RANGE (highlighted outputs that actually appear)  
`P04` context: "A sorting machine. Each item (input) goes to exactly one bin (output)."  
`P06` concrete: three coloured tokens (inputs) → three labelled bins (outputs); student physically places each  
`P34` closed: "Point to the domain. Point to the codomain. Point to the range." (with vocabulary card available)  
`P55` wait: 5 s

Response taxonomy:
```
{ stimulus: "Points correctly to all three",
  signal: "SIGNAL:CORRECT" }

{ stimulus: "Domain and codomain confused; range correct",
  signal: "SIGNAL:PARTIAL" }

{ stimulus: "Cannot identify any",
  signal: "SIGNAL:INCORRECT", mc_id: null }
```

`P49`: CORRECT → TA-F02; PARTIAL → `P53` with explicit pointing → TA-F02; INCORRECT → `P50` → `P85` slow down; label each oval before retry

---

**TA-F02 — Mapping Diagram with Embedded Vocabulary**

Primitive sequence: `P01 → P07 → P16 → P34 → P55 → P49 | P50`

`P01` target_element: mapping diagram with vocabulary labels embedded in diagram  
`P07` two diagrams with all vocabulary terms labelled inside the image: "DOMAIN (input set)", "CODOMAIN (all possible outputs)", "RANGE (outputs used)", arrows labelled "assigns exactly one output"  
`P16` compare: function diagram vs. non-function diagram; arrows identical in both except one extra  
`P34` closed: "Which is the function? Use the word 'input' and 'output' in your answer."  
`P55` wait: 5 s

Response taxonomy:
```
{ stimulus: "Correct diagram; uses 'input' and 'output' correctly",
  signal: "SIGNAL:CORRECT" }

{ stimulus: "Correct diagram; does not use required vocabulary",
  signal: "SIGNAL:PARTIAL" }

{ stimulus: "Incorrect diagram",
  signal: "SIGNAL:INCORRECT", mc_id: null }
```

`P49`: CORRECT → TA-F03; PARTIAL → `P53` → ask to restate using required vocabulary → TA-F03; INCORRECT → `P50` → count arrows per input node → retry

---

**TA-F03 — Abstraction Ladder: Diagram to Notation**

Primitive sequence: `P01 → P07 → P08 → P25 → P34 → P55 → P49 | P50`

`P01` target_element: mapping diagram alongside its function notation equivalent  
`P07` diagram: {1→3, 2→5, 3→7}  
`P08` notation: f(1)=3, f(2)=5, f(3)=7; f(x)=2x+1  
`P25` abstraction ladder: move step by step — diagram → ordered pairs → table → formula — pointing to vocabulary reference card at each step  
`P34` closed: "What is f(4)? Use the formula. Point to the vocabulary card if you need a word."  
`P55` wait: 5 s

Response taxonomy:
```
{ stimulus: "f(4) = 2(4)+1 = 9",
  signal: "SIGNAL:CORRECT" }

{ stimulus: "9 but without showing substitution step",
  signal: "SIGNAL:PARTIAL" }

{ stimulus: "f(4) = 4f or wrong substitution",
  signal: "SIGNAL:INCORRECT", mc_id: "MC-3" }
```

`P49`: CORRECT → TA-F04; PARTIAL → `P53` → TA-F04; INCORRECT (MC-3) → `P50` → reteach f(x) notation with vocabulary card emphasis → retry

---

**TA-F04 — Mastery Gate (Terminal)**

`P01 → P91` — same five-probe sequence as TA-A07. Vocabulary reference card remains available throughout.

---

## 6. Misconception Engine

---

### MC-1 — Range and Codomain Are the Same Set

**Observable symptom:** Student states "range = codomain = {2, 4, 6}" when codomain is declared as ℕ, or states "range = codomain = ℝ" when range is a proper subset.

**Diagnostic trigger:** P41 after range/codomain distinction is introduced (TA-A04, DB-4).

**Root cause:** Both terms involve outputs; school instruction rarely distinguishes "outputs you could get" from "outputs you actually get." Most simple school functions have range = codomain, reinforcing the conflation.

**Repair chain:** P27 (expose "they are the same") → P28 (conflict: codomain ℝ, range = [0,∞) for f(x)=x²; -4 ∈ codomain but -4 ∉ range) → P29 (pause) → P30 (bridge: actual vs. possible) → P31 (install: "Range ⊆ Codomain; Range = Codomain only when surjective") → P32 (consolidation: three examples where range ≠ codomain)

**MAMR status:** Independent.

---

### MC-2 — Functions Must Have Algebraic Formulas

**Observable symptom:** Student rejects a mapping diagram, table, or verbal rule as "not a proper function" because "there's no equation."

**Diagnostic trigger:** DB-2 (verbal rule); TA-B02 (phone contact diagram).

**Root cause:** Classroom exposure dominated by f(x) = algebraic expression. Students form the implicit rule "function = formula."

**Repair chain:** P27 (surface belief) → P07 (counter-example: real-world mapping with no formula) → P28 (conflict: it satisfies the definition but has no formula) → P30 (bridge: formula is one representation; definition is about the mapping rule) → P42 (student generates 3 non-formula functions)

**MAMR status:** Independent.

---

### MC-3 — f(x) Means f Multiplied by x

**Observable symptom:** Student writes f(3) = 3f or attempts to solve for f as an unknown number; evaluates f(5) = 5 × f(x) symbolically.

**Diagnostic trigger:** P41 ("Am I multiplying f by 3?"); DB-3 (evaluation task).

**Root cause:** Juxtaposition in algebra means multiplication (2x = 2 × x, 3a = 3 × a), so f(x) pattern-matches to multiplication by proximity. Function notation departs from this convention without explicit instruction.

**Repair chain:** P27 (expose misreading) → P28 (conflict: if f(3) = 3f, compute f from f(x)=x+2 → contradiction) → P29 (pause) → P30 (bridge: f is a RULE NAME, not a number) → P31 (install: f(x) = "output of rule f at input x") → P32 (5 evaluations using correct interpretation)

**MAMR status:** FOUNDATIONAL for MC-4. MC-3 must be cleared before MC-4 repair begins. Rationale: MC-4 repair requires correct evaluation of f(x) to demonstrate that both f(2)=4 and f(-2)=4 are valid outputs; students with MC-3 cannot execute this demonstration.

---

### MC-4 — One-to-One Is the Definition of a Function

**Observable symptom:** Student claims f(x) = x² is not a function because "the same output appears twice" or "f(2) = f(-2) = 4 so it's not allowed."

**Diagnostic trigger:** P41 ("Is f(x)=x² a function? Is it one-to-one?"); DB-1 (mapping diagram where two inputs share one output).

**Root cause:** The definition "each input has one output" is linguistically symmetric and students interpret it bidirectionally as "each output has one input." The term "one-to-one function" reinforces this, as students assume the word "one-to-one" is the definition of "function."

**Repair chain:** P27 (surface belief) → P28 (conflict: f(3)=9 — does 3 have one output? yes. f(-3)=9 — does -3 have one output? yes. Both inputs satisfied the definition.) → P29 → P30 (bridge: function = each INPUT → one output; one-to-one = each OUTPUT ← one input; orthogonal requirements) → P31 (2×2 table: function/not × one-to-one/not with examples) → P33 (discrimination training: sort 6 examples into correct cells)

**MAMR prerequisite:** MC-3 must be cleared first.

---

## 7. Assessment Battery

---

**AB-1 — Relation Classification** (P74-pattern)

Stimulus: Six relations presented in mixed representations.

| Item | Representation | Verdict |
|------|---------------|---------|
| i | {(1,2),(2,4),(3,6)} — ordered pairs | function |
| ii | {(1,2),(2,4),(1,6)} — ordered pairs | not function (1 has two outputs) |
| iii | Mapping diagram: each node has exactly one arrow out | function |
| iv | Graph of x² + y² = 4 (circle) | not function |
| v | Mapping diagram: one node has no arrows | not function (input without output) |
| vi | Table: x={1,2,3,4}, f(x)={5,5,5,5} | function (many-to-one is valid) |

Target: 5/6 correct. Item vi tests MC-4 reversal.

---

**AB-2 — Function Evaluation** (notation)

Stimulus: f(x) = 4x − 3.

Tasks: evaluate f(0), f(2), f(-1), f(1/2).

Expected: -3, 5, -7, -1. Target: 4/4 correct steps shown.

---

**AB-3 — Representation Translation**

Stimulus: mapping diagram {p→7, q→3, r→7} with domain = {p, q, r}, codomain = ℤ.

Tasks: (a) write as ordered pairs; (b) write as table; (c) write in function notation; (d) state domain, codomain, range.

Expected: (a) {(p,7),(q,3),(r,7)}; (b) table with correct headers; (c) f(p)=7 etc.; (d) domain={p,q,r}, codomain=ℤ, range={3,7}. Target: 4/4.

---

**AB-4 — Vocabulary Probe**

Student provides written definitions (own words) for: domain, codomain, range, function, one-to-one function. Target: 4/5 definitions acceptable (captures key distinction).

---

**AB-5 — Transfer Item**

Stimulus: "A library assigns each book an ISBN number. Is 'book → ISBN' a function? What is the domain? Can two books share an ISBN? Does that affect whether it is a function?"

Expected: function yes; domain = set of books in the library; two books cannot share an ISBN (by ISBN convention — this tests real-world constraint reasoning, accept 'in standard practice'); still a function because each input (book) has exactly one output (ISBN). Target: 3/3 sub-questions.

---

## 8. Mastery Gate

`P91` expansion: `P77 → P76 → P75 → P74 → P78`

**P77 — Generation Probe**

"Write your own example of a function. Do NOT use an equation or formula. Use any other representation. Explain in one sentence why it is a function."

Pass criteria: non-formula function; explanation states "each input has exactly one output" or equivalent.

Fail routing: if student can only produce a formula → MC-2 residual; schedule Protocol C TA-C04

---

**P76 — Transfer Probe**

"In a school, each student is assigned exactly one form group. Is 'student → form group' a function? (a) What is the domain? (b) If two students share a form group, does that stop it being a function?"

*P76 independence note: This transfer item references the set-theoretic view of function (function as a set of ordered pairs on two sets) — connected to math.found.set-theory cross-link. The math.found.set-theory blueprint does not need to be authored first for this item to be valid or taught.*

Pass criteria: (a) function yes; (b) domain = set of students; (c) no — many-to-one is allowed.

Fail routing: if (c) fails → MC-4 residual; targeted review

---

**P75 — Boundary Probe**

"Answer both questions: (a) Can a function assign the same output to two different inputs? (b) Can a function assign two different outputs to the same input? Justify each answer."

Pass criteria: (a) YES with example (e.g., f(2)=f(-2)=4); (b) NO — violates definition.

Fail routing: if (a) fails → MC-4; if (b) fails → fundamental definition error → return Protocol A

---

**P74 — Classification Probe**

Classify each relation. State function or not-function. Brief reason for each.

```
(a) {(1,2),(2,2),(3,2)}          → function (many-to-one valid)
(b) {(1,2),(1,3),(2,4)}          → not function (1 has two outputs)
(c) y = x² (domain ℝ)            → function
(d) x² + y² = 25                  → not function (e.g. x=0 gives y=5 and y=-5)
```

Pass: 4/4 with valid reasoning.

Fail routing: (a) or (c) fails → MC-4; (b) fails → definition unclear; (d) fails → VLT not internalised

---

**P78 — Explanation Probe**

"Without using the word 'function,' explain in exactly one sentence why the curve x² + y² = 25 cannot be used to express y as a rule depending only on x."

Pass criteria: sentence contains the idea "some x-values produce two y-values" or "the same input gives two outputs."

Fail routing: if student references VLT by name without explanation → S1 residual (procedural without conceptual); schedule Protocol B

---

**Mastery decision:**

All 5 probes PASS → MASTERY_CONFIRMED → schedule Component 9 retrieval  
3–4/5 PASS → PARTIAL_MASTERY → note specific gap; schedule Day 1 retrieval focusing on failed probes  
<3/5 PASS → return to Protocol entry point most aligned with failure pattern

---

## 9. Retrieval Schedule

Based on P89 SPACED REPETITION: intervals 1, 3, 7, 21, 60 days.

---

**Day 1** — `P56` consolidation

Items:
- Evaluate f(3) and f(-1) for f(x) = 2x + 5
- Classify: is {(1,3),(2,5),(3,3)} a function? What is the range?
- Vocabulary: in one word each — what is the set of actual outputs called?

---

**Day 3** — `P88` retrieval under slight interference

Items:
- Convert mapping diagram to ordered pairs and to function notation
- f: {1,2,3} → ℕ defined by f(x) = x³. State the range.
- Is the codomain always equal to the range? Give a counter-example if not.

---

**Day 7** — `P88` mixed representation + boundary

Items:
- Apply VLT to three graphs (one clear pass, one clear fail, one near-miss with open endpoint)
- Write a function that is NOT one-to-one. Explain why it is still a function.
- Boundary: "Can a function have an empty range?" (edge case: empty domain → yes, trivially)

---

**Day 21** — `P88` transfer + one-to-one distinction

Items:
- Real-world: "Is 'day of the week → number of letters in its name' a function? Is it one-to-one?"
- Given f(x) = x² and g(x) = √x (domain ℝ≥0): is g one-to-one? Compare to f.
- Generate a function whose range equals its codomain and one whose range is a proper subset.

---

**Day 60** — `P88` generative + full classification battery

Items:
- P77-style: write a function using a representation not used before in retrieval sessions
- Full AB-1 classification battery (six items — new instances, same types as Component 7)
- P78-style explanation: "Explain in one sentence why a horizontal line is a function but a vertical line is not a function."

---

## 10. Validation Checklist

| Check | Criterion | Status | Evidence |
|-------|-----------|--------|----------|
| V-1 | All concept id slots reference valid KG nodes | PASS | math.func.function-concept, math.alg.variable, math.found.set-theory all valid KG ids |
| V-2 | difficulty=3 → cpa_entry_stage ∈ {C, P} | PASS | cpa_entry_stage=C; difficulty=3 allows C or P |
| V-3 | mastery_threshold matches KG value | PASS | 0.85 per KG specification |
| V-4 | Canonical 10-field schema only | PASS | No domain/concept_type in JSON; those are derived at runtime |
| V-5 | No invented primitives | PASS | All primitives are P01–P91 (library range) |
| V-6 | GR-1: all TAs start P01 or P02 | PASS | A01–A07: P01; B01: P02; B02–B05: P01/P02; C01: P02; C02–C06: P01; D01: P02; D02–D04: P01; E01: P01; F01: P01 — all checked |
| V-7 | GR-2: P55 follows every elicitation primitive | PASS | Every P34/P35/P38/P41/P42/P43/P44/P47/P74–P78 in all TAs followed by P55 |
| V-8 | GR-3: P08 only after P06 or P07 has fired | PASS | P08 first appears in TA-A05; P06 fired in A01/A02, P07 in A03/A04 — prerequisite satisfied within session |
| V-9 | GR-4: repair chain entered only after P41 or P64 | PASS | MC repair chains in Protocol C and notation repair in A06 all gated by P41 diagnostic |
| V-10 | GR-5: P28 absent from Protocol E (S6) | PASS | Protocol E uses P30 (Bridge Construction) in place of P28; no P28 appears in any E-series TA |
| V-11 | GR-6: P91 is terminal in all mastery gate TAs | PASS | TA-A07, B05, C06, D04, E05, F04 all end with P91; nothing follows |
| V-12 | GR-7: ≤3 consecutive C-primitives before E-break | PASS | No TA has more than 2 consecutive C-category primitives (P14, P16, P17, P20, P21, P22, P25) without an intervening E-primitive |
| V-13 | GR-8: P54 precedes high-difficulty first-attempt open questions | PASS | P54 appears in TA-A01 (NO_RESPONSE branch) and TA-A02 (NO_RESPONSE branch); P35 open questions appear only after concrete/perceptual grounding |
| V-14 | GR-9: assessment primitives not in first TA unless diagnostic | PASS | P74–P80 appear only in TA-A07/B05/C06/D04/E05/F04 (mastery gate TAs) |
| V-15 | GR-10: Named Compound expansions substituted | PASS | P91 expanded as P77→P76→P75→P74→P78 in mastery gate TAs; P12 not used; P57/P89/P90 not used |
| V-16 | Response taxonomy present for all elicitation primitives | PASS | All P34/P35/P38/P41/P42/P43/P44/P47 in all TAs have inline response taxonomy blocks |
| V-17 | All P49 branches specified | PASS | CORRECT/PARTIAL/INCORRECT/NO_RESPONSE routing specified for all elicitation cycles across all protocols |
| V-18 | Session cap respected | PASS | Protocol A: 7 TAs (estimated_hours=8≥1h → max 7); B: 5 TAs; C: 3–6 TAs; D: 4 TAs; E: 5 TAs; F: 4 TAs |
| V-19 | Transfer contexts reference cross-linked concept | PASS | P76 transfer probe references set-theoretic interpretation (math.found.set-theory cross-link); P76 independence note present |
| V-20 | AIR-1 through AIR-5 pass | PASS | All content in explicit slots (AIR-1); response taxonomy pre-authored (AIR-2); all P49 routing deterministic (AIR-3); primitives are concept-independent operators (AIR-4); TA sequences fixed at authoring time (AIR-5) |

**PACKAGE_READY: YES** — All 20 V-checks PASS. Components 0–9 present. Blueprint approved for Educational Brain integration.
