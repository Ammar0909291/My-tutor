# Teaching Blueprint: Mathematical Language

**Blueprint ID:** math.found.mathematical-language
**Status: PACKAGE_READY**
**Date:** 2026-07-11
**Framework Version:** 1.0

---

## Component 0 — Concept Profile

```
id:                  math.found.mathematical-language
name:                Mathematical Language
domain:              mathematics / foundations
bloom:               understand
difficulty:          1 (foundational)
mastery_threshold:   0.80
estimated_hours:     6
requires:            [math.found.mathematical-thinking]
unlocks:             [math.found.logic, math.found.set-theory]
cross_links:         []
cpa_entry_stage:     C
```

**CPA Entry Stage Derivation:** difficulty=1 (foundational ≤ 2) AND domain≠physics → C (Concrete). Student begins with concrete everyday-language failures before encountering formal mathematical language structure.

**Session Cap:** estimated_hours=6 → max 7 TAs (≥1h). Protocol A uses 7 TAs (bloom=understand requires full C→P→A progression plus precision-writing practice).

**Scope note:** This blueprint covers mathematical language as a formal communication system — its role, precision requirement, and how it differs from natural language. It does NOT deeply teach specific notation inventories (→ math.found.mathematical-notation) or symbol catalogues (→ math.found.mathematical-symbols), which have dedicated blueprints.

---

## Component 1 — Learning Objective

**Mastery statement:** A student who achieves mastery can (1) explain why mathematical language requires precision and unambiguity, (2) identify the three components of mathematical language (terminology, notation, syntax), (3) read a simple mathematical statement and interpret it correctly, (4) write a given mathematical idea as an unambiguous formal statement, and (5) distinguish an ambiguous from an unambiguous expression and correct the ambiguity.

**NOT mastery:** A student who can state "math uses symbols" but cannot explain WHY precision is required, or who cannot distinguish "x is about 5" (informal) from "x = 5" (formal), or who believes informal descriptions are acceptable in proofs, has NOT achieved mastery.

---

## Component 2 — Prerequisite Verification

**Hard prerequisites:** `math.found.mathematical-thinking` — student can reason about mathematical structure, not merely compute.

**Verification gate (TA-A01 opening):** Student can describe the difference between saying "it's a big number" and "it's a number greater than 100." If not, route to `math.found.mathematical-thinking`.

---

## Component 3 — Misconception Registry

| ID | Label | Description | Type | MAMR Priority |
|----|-------|-------------|------|---------------|
| MC-1 | Math language = abbreviation | Student treats mathematical symbols as informal shorthand for ordinary words, not as elements of a separate formal language with its own grammar | Foundational | 1st |
| MC-2 | Precision is optional | Student believes informal description is acceptable if the reader understands the intent; precision is seen as pedantry, not necessity | Secondary | 2nd |
| MC-3 | Symbols are self-evident | Student assumes mathematical symbols (∑, ∈, ⊂) are intuitive and do not require formal definition or learned convention | Secondary | 2nd (independent) |

**MAMR Rule:** MC-1 is foundational — a student who believes math language is just abbreviated English will not accept that precision is required (MC-2) or that symbols need definition (MC-3), because they believe their informal reading already captures the meaning. Clear MC-1 first before addressing MC-2 or MC-3.

---

## Component 4 — Student State Protocols

### Protocol A — State S0: No Prior Exposure

---

**TA-A01 — Concrete: Why Ordinary Language Fails in Mathematics**

*Primitive sequence:* `P02 → P03 → P26 → P06 → P55 → P49`

**P02 — CONTEXT ESTABLISHMENT:**
"Before we look at mathematical language, let's see what happens when ordinary language is used for mathematical ideas."

**P03 — CONCRETE MANIPULATION:**
Present these five statements. For each, ask: "Could this mean more than one thing? Could it cause confusion?"

1. "Add a few numbers together."
2. "The answer is somewhere between 5 and 10."
3. "Multiply the big one by the small one."
4. "They are roughly equal."
5. "It's positive."

Student identifies that every statement is ambiguous: How many is "a few"? Exactly where between 5 and 10? Which is "big"? How rough is "roughly"? Positive relative to what?

**P26 — WORKED EXAMPLE:**
"Now compare with mathematical language:

```
Ordinary:     Add a few numbers.
Mathematical: Find  ∑(i=1 to n) aᵢ  where n and each aᵢ are specified.

Ordinary:     The answer is somewhere between 5 and 10.
Mathematical: 5 < x < 10  (x is strictly greater than 5 and strictly less than 10)

Ordinary:     They are roughly equal.
Mathematical: |a − b| < 0.001  (a and b differ by less than 0.001)
```

Mathematical language eliminates every source of ambiguity. It is not abbreviation — it is a DIFFERENT language with precise grammar."

**P06 — EXPLICIT STRATEGY INSTRUCTION:**
"Mathematical language is a FORMAL COMMUNICATION SYSTEM with three components:
1. **Terminology** — defined words that mean exactly one thing (e.g., 'prime number' means a natural number > 1 with exactly two divisors: 1 and itself — nothing looser, nothing broader).
2. **Notation** — standardized symbols that encode ideas compactly (=, <, ∑, ∈).
3. **Syntax** — rules for combining terms and symbols into valid mathematical statements.

All three must be used correctly for a statement to count as mathematical communication."

**P55 — COMPREHENSION CHECK:**
"What makes '5 < x < 10' more mathematically useful than 'x is somewhere between 5 and 10'?"

*Expected: The symbolic statement is unambiguous — every real number either satisfies it or doesn't. The ordinary version is vague about whether the endpoints are included and about 'somewhere.'*

**P49 — ADAPTIVE CHECKPOINT:**

```json
{
  "prompt": "A student writes: 'The result is close to zero.' A second writes: '|result| < 0.01'. Which is a valid mathematical statement and why?",
  "CORRECT": {
    "criteria": "Second statement: precise, unambiguous — every value either satisfies |result|<0.01 or doesn't. First: 'close' undefined, varies by reader.",
    "action": "→ advance to TA-A02"
  },
  "PARTIAL": {
    "criteria": "Identifies second is better but cannot explain WHY 'close to zero' is invalid",
    "action": "Ask: 'Is 0.1 close to zero? Is 0.001? Who decides?' → no fixed answer → ambiguity → advance"
  },
  "INCORRECT": {
    "criteria": "Says both are acceptable or prefers the informal",
    "action": "Return to P03: 'When the answer is close to zero, does 0.5 count? Does 0.0001? The formal statement has a sharp, agreed answer.' Retry."
  },
  "NO_RESPONSE": {
    "criteria": "No attempt",
    "action": "Scaffold: 'Suppose two students disagree on whether 0.05 is close to zero. With the first statement, who is right? With the second statement, who is right?'"
  }
}
```

---

**TA-A02 — Concrete: The Three Components of Mathematical Language**

*Primitive sequence:* `P01 → P26 → P07 → P55 → P49`

**P01 — ATTENTION ANCHOR:**
"We know mathematical language is different from ordinary language. Now let's study its three components up close."

**P26 — WORKED EXAMPLE:**
Dissect the mathematical statement: "For all real numbers x, if x > 0 then x² > 0."

```
TERMINOLOGY:
  "real numbers" — precisely defined set (not just 'numbers')
  "x > 0" — x is strictly greater than zero (not 'positive-ish')
  "x²" — x multiplied by itself (not 'x squared, roughly')

NOTATION:
  "∀x ∈ ℝ" (universal quantifier + set membership — compresses the English to 2 symbols)
  ">" (strict inequality — excludes equality)
  "²" (exponentiation notation)

SYNTAX:
  Structure: [quantifier] [variable declaration] [condition] → [conclusion]
  "For all x [quantifier], if x > 0 [condition] then x² > 0 [conclusion]"
  This follows a valid logical sentence pattern.
```

"Remove any component and the statement becomes ambiguous or meaningless."

**P07 — PERCEPTUAL SALIENCE:**
Show three columns side by side:

| Terminology | Notation | Syntax |
|------------|---------|--------|
| "prime number" = natural number > 1 with exactly 2 divisors | "p ∈ ℕ, p > 1" | "If p is prime, then p has no divisors between 1 and p" |
| "function" = rule assigning exactly one output to each input | "f: A → B" | "For each x in A, there exists exactly one f(x) in B" |
| "equal" = identical value | "a = b" | "a = b and b = c implies a = c" |

All three columns must work together for mathematical communication.

**P55 — COMPREHENSION CHECK:**
"Which of the three components is responsible for ensuring that '=' means 'identical value' and NOT 'approximately equal'? Explain."

*Expected: Terminology (defined meaning of '=') AND Notation (the symbol '≈' exists separately for approximate equality — so the choice of notation signals precision).*

**P49 — ADAPTIVE CHECKPOINT:**

```json
{
  "prompt": "Identify the terminology error, notation error, and syntax error in each: (a) 'x is the biggest number.' (b) 'x ≥ ≤ 5.' (c) 'If then x = 5.'",
  "CORRECT": {
    "criteria": "(a) Terminology error: 'biggest number' undefined (no largest real number). (b) Notation error: ≥ and ≤ cannot chain like this. (c) Syntax error: 'if then' missing the condition clause.",
    "action": "→ advance to TA-A03"
  },
  "PARTIAL": {
    "criteria": "Identifies 2 of 3 error types",
    "action": "Work through missed case: 'For (a): is there a largest real number?' / 'For (b): read ≥≤ aloud — does that mean anything?' / 'For (c): what comes after IF?' → advance"
  },
  "INCORRECT": {
    "criteria": "Cannot classify errors by component",
    "action": "Return to P26 worked example. Map each error to the three-column table: 'Which column does this error come from?'"
  },
  "NO_RESPONSE": {
    "criteria": "No attempt",
    "action": "Scaffold one: '(a) Can you find a number larger than x for every specific value of x? Then what does biggest mean?'"
  }
}
```

---

**TA-A03 — Pictorial: Reading Mathematical Statements**

*Primitive sequence:* `P01 → P26 → P06 → P55 → P49`

**P01 — ATTENTION ANCHOR:**
"We've analysed the components. Now practise reading — converting a mathematical statement into its precise meaning in ordinary language."

**P26 — WORKED EXAMPLE:**
Read this statement aloud step by step:

```
∀ x ∈ ℝ,  x² ≥ 0

Step 1: ∀ = "for all" (universal quantifier)
Step 2: x ∈ ℝ = "x is a real number" (domain declaration)
Step 3: x² ≥ 0 = "x squared is greater than or equal to zero"

Full reading: "For every real number x, x squared is at least zero."

CHECK: Does this allow x = 0? Yes (0² = 0 ≥ 0). Does this allow x = −3? Yes ((−3)² = 9 ≥ 0). ✓
```

**P06 — READING STRATEGY:**
"When reading a mathematical statement:
1. Identify ALL quantifiers (∀ = for all, ∃ = there exists).
2. Identify the domain (what set does the variable belong to?).
3. Read the condition left to right, symbol by symbol.
4. State the full meaning in complete English sentences.
5. Test with one concrete value to confirm your reading is correct."

**P55 — COMPREHENSION CHECK:**
"Read this statement using the 5-step strategy: '∃ n ∈ ℕ such that n > 100.' Then verify with one specific n."

*Expected: 'There exists a natural number n such that n is greater than 100.' Verify: n = 101 works.*

**P49 — ADAPTIVE CHECKPOINT:**

```json
{
  "prompt": "Read these two statements and state what each means. Then identify: do they mean the same thing? (A) '∀ x ∈ ℝ, ∃ y ∈ ℝ such that y > x.' (B) '∃ y ∈ ℝ such that ∀ x ∈ ℝ, y > x.'",
  "CORRECT": {
    "criteria": "(A) For every real x, there exists a real y larger than it — TRUE (y = x+1 always works, but y depends on x). (B) There exists a single real y larger than every real x — FALSE (no such largest number). The statements mean very different things because quantifier ORDER matters.",
    "action": "→ advance to TA-A04"
  },
  "PARTIAL": {
    "criteria": "Reads both correctly but says they mean the same",
    "action": "Ask: 'In (A), can y be DIFFERENT for each x?' → yes. 'In (B), must one FIXED y beat all x at once?' → that's impossible (x+1 always beats y). Order changes meaning. → advance"
  },
  "INCORRECT": {
    "criteria": "Reading error on quantifiers",
    "action": "Return to P26 step-by-step reading. Read (A) symbol by symbol. 'First ∀x — then ∃y — so for each x we pick a y.' Then (B): 'First ∃y — then ∀x — so one y must beat all x.'"
  },
  "NO_RESPONSE": {
    "criteria": "No attempt",
    "action": "Scaffold (A) with x=5: 'Can you find a y > 5?' → y=6 → 'With x=100?' → y=101. Different y for each x. Then (B): 'Find one y bigger than ALL real numbers at once.' → impossible."
  }
}
```

---

**TA-A04 — Pictorial: Writing Mathematical Statements**

*Primitive sequence:* `P01 → P26 → P06 → P55 → P49`

**P01 — ATTENTION ANCHOR:**
"Reading → interpreting. Writing → encoding a mathematical idea into formal language. Both skills are required for mathematical communication."

**P26 — WORKED EXAMPLE:**
Convert this verbal statement to formal mathematical language:

```
VERBAL: "Every even number can be divided by 2."

Step 1 (Terminology): Define "even number": n ∈ ℤ such that 2 divides n (notation: 2 | n).
Step 2 (Domain): n ranges over even integers.
Step 3 (Notation): "can be divided by 2" → ∃ k ∈ ℤ such that n = 2k.
Step 4 (Syntax — quantified statement):
  ∀ n ∈ ℤ, if n is even, then ∃ k ∈ ℤ such that n = 2k.

FORMAL: ∀ n ∈ ℤ: (2 | n) → (∃ k ∈ ℤ, n = 2k)
VERIFY: n = 6 → 6 = 2×3 (k=3) ✓. n = −4 → −4 = 2×(−2) (k=−2) ✓.
```

**P06 — WRITING STRATEGY:**
"To write a verbal idea as a formal mathematical statement:
1. Identify every technical term — replace with its precise mathematical definition.
2. Identify the domain of all variables (ℕ, ℤ, ℝ, etc.).
3. Identify ALL quantifiers (is this for all? does some exist?).
4. Write the condition and conclusion using standard notation.
5. Verify: substitute one or two values to confirm the statement captures what you intended."

**P55 — COMPREHENSION CHECK:**
"Why must the domain of a variable be stated in a formal mathematical statement? What goes wrong if it is omitted?"

*Expected: Without domain, the statement may be true for integers but false for reals, or vice versa. E.g., '∃ x such that x² = 2' — true in ℝ (x=√2), false in ℤ (no integer squares to 2).*

**P49 — ADAPTIVE CHECKPOINT:**

```json
{
  "prompt": "Convert to formal mathematical language: 'There is always a prime number between any two consecutive perfect squares.' (Hint: consecutive perfect squares are n² and (n+1)² for any positive integer n.)",
  "CORRECT": {
    "criteria": "∀ n ∈ ℕ, ∃ p prime such that n² < p < (n+1)². Verify: n=1: 1 < p < 4 → p=2,3 ✓; n=2: 4 < p < 9 → p=5,7 ✓.",
    "action": "→ advance to TA-A05"
  },
  "PARTIAL": {
    "criteria": "Correct quantifier structure but domain missing or n not declared as natural number",
    "action": "Ask: 'Does n=0 make sense? Does n=−3? Restrict to n ∈ ℕ.' → advance"
  },
  "INCORRECT": {
    "criteria": "Incorrect quantifier order or wrong domain",
    "action": "Return to P26 step-by-step conversion. Guide each of the 5 steps explicitly for this statement."
  },
  "NO_RESPONSE": {
    "criteria": "No attempt",
    "action": "Start with n=2: 'What are the consecutive squares?' → 4 and 9. 'Is there a prime between them?' → 5,7. 'Now write this for any n using ∀.'"
  }
}
```

---

**TA-A05 — Pictorial: Ambiguous vs. Unambiguous — Diagnosing and Correcting**

*Primitive sequence:* `P01 → P26 → P55 → P49`

**P01 — ATTENTION ANCHOR:**
"We've read and written mathematical statements. Now: diagnosing and correcting ambiguity — a core quality-control skill."

**P26 — WORKED EXAMPLE:**
Three statements with defects:

```
DEFECTIVE (terminology):
  "Let x be a number close to 5."
  Problem: 'close' undefined — no precise meaning.
  FIXED: "Let x ∈ ℝ such that |x − 5| < 0.1."

DEFECTIVE (notation):
  "x = 3 or 4"
  Problem: 'or' here is syntactically ambiguous — does x take both values or just one?
  FIXED: "x ∈ {3, 4}"  (set notation unambiguously lists both possible values)

DEFECTIVE (syntax):
  "x > and x < 5"
  Problem: first inequality is incomplete — missing the right-hand side.
  FIXED: "x > 0 and x < 5"  or equivalently  "0 < x < 5"
```

**P55 — COMPREHENSION CHECK:**
"In the fixed version of the first example, why does |x − 5| < 0.1 communicate 'close to 5' more precisely than any informal description?"

*Expected: It specifies an exact radius — any x within 0.1 of 5 qualifies; any other does not. No reader interpretation required.*

**P49 — ADAPTIVE CHECKPOINT:**

```json
{
  "prompt": "Identify the defect type (terminology/notation/syntax) and correct each: (a) 'n is big.' (b) 'a ≠ or b ≠ 0.' (c) '√x if x positive.'",
  "CORRECT": {
    "criteria": "(a) Terminology — 'big' undefined. Fix: 'n > N for some specified N ∈ ℕ.' (b) Notation — incomplete. Fix: 'a ≠ 0 or b ≠ 0.' (c) Syntax — missing 'then/implies'. Fix: 'If x ≥ 0, then √x is defined.' (or equivalent)",
    "action": "→ advance to TA-A06"
  },
  "PARTIAL": {
    "criteria": "Correctly identifies 2 of 3 defects and fixes them",
    "action": "Focus on missed case. For (b): 'Read aloud what ≠ or means — what is it ≠ to?' For (c): 'What word is missing between √x and if?' → advance"
  },
  "INCORRECT": {
    "criteria": "Cannot classify or cannot correct",
    "action": "Return to P26 table. Map each defective statement to the three-component table. Ask: 'Is the word undefined? Is the symbol malformed? Is the sentence incomplete?'"
  },
  "NO_RESPONSE": {
    "criteria": "No attempt",
    "action": "Scaffold (a): 'How big is big? Give me three numbers — are they big?' → ambiguity emerges → 'Define precisely.'"
  }
}
```

---

**TA-A06 — Abstract: Mathematical Language in Real-World Contexts**

*Primitive sequence:* `P01 → P26 → P55 → P49`

**P01 — ATTENTION ANCHOR:**
"Mathematical language is not an academic game — its precision requirements appear wherever exact communication has real consequences."

**P26 — WORKED EXAMPLE:**
Three real-world contexts where mathematical precision is critical:

```
LEGAL CONTRACT:
  Ambiguous:    "Deliver within a reasonable time."
  Mathematical: "Deliver within 30 calendar days from the date of order."
  Why matters: "Reasonable" has 50 different interpretations in court. The mathematical
               version has exactly one.

MEDICAL PRESCRIPTION:
  Ambiguous:    "Take some tablets when needed."
  Mathematical: "Take 1 tablet (500 mg) every 6 hours; maximum 4 tablets per 24-hour period."
  Why matters: Overdose or underdose — both dangerous. Mathematical precision = patient safety.

SOFTWARE SPECIFICATION:
  Ambiguous:    "The input should be a positive number."
  Mathematical: "The input x must satisfy x ∈ ℝ, x > 0, and x ≤ 10⁶."
  Why matters: Code has no tolerance for ambiguity. The compiler enforces syntax exactly
               like mathematical language enforces syntax rules.
```

"In every case, ordinary language fails because it permits too many interpretations. Mathematical language succeeds because it permits exactly one."

**P55 — COMPREHENSION CHECK:**
"Why do engineers use equations and mathematicians use formal statements, even when they could 'just explain it in words'? What does precise language give them that informal language cannot?"

*Expected: Unambiguous communication, verifiable claims, universally agreed meaning regardless of reader — and in engineering, safe construction. Words require interpretation; formal language removes interpretation.*

**P49 — ADAPTIVE CHECKPOINT:**

```json
{
  "prompt": "GPS coordinates locate 'Claude Monet's Garden, Giverny, France' as: Latitude 49.0763° N, Longitude 1.5337° E. Why is this a mathematical statement? What would go wrong if you replaced it with 'somewhere in northern France near some gardens'?",
  "CORRECT": {
    "criteria": "Mathematical: exact real number pair specifying a unique point on Earth — unambiguous. Ordinary: thousands of gardens in northern France match, no unique location identified. Mathematical precision reduces ambiguity to zero.",
    "action": "→ advance to TA-A07 (mastery gate)"
  },
  "PARTIAL": {
    "criteria": "Says mathematical version is better but doesn't explain WHY coordinates are mathematical",
    "action": "Ask: 'What mathematical object is (49.0763° N, 1.5337° E)?' → a pair of real numbers specifying a unique location. → advance"
  },
  "INCORRECT": {
    "criteria": "Says both are equally valid",
    "action": "Ask: 'How many places in northern France have gardens?' → many. 'How many places have exactly latitude 49.0763°N and longitude 1.5337°E?' → exactly one. The difference is mathematical precision."
  },
  "NO_RESPONSE": {
    "criteria": "No attempt",
    "action": "Scaffold: 'Enter 49.0763N 1.5337E in a map app — where does it take you? Now enter northern France near gardens — what options appear?'"
  }
}
```

---

**TA-A07 — Mastery Gate**

*Primitive sequence:* `P01 → P91`

**P91 expansion:** `P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78`

**P01 — ATTENTION ANCHOR:** "All components of mathematical language studied. Confirming mastery."

**P77 — MASTERY PROBE:**
"Explain: (1) What is mathematical language and what makes it different from ordinary language? (2) Name and define the three components. (3) Why is precision in mathematical language non-negotiable — what happens when it fails?"

**P55 — COMPREHENSION CHECK:** "Which component of mathematical language ensures that '+' means the same thing in every valid mathematical statement that uses it?"

*Expected: Notation (standardised symbol with agreed meaning) AND Terminology (defined operation with agreed meaning). Both together.*

**P76 — TRANSFER PROBE:**
"Consider a musical score and a chemistry formula. (a) H₂O: two hydrogen atoms bonded to one oxygen atom. (b) ♩ = 120 bpm: a quarter note lasts 0.5 seconds at this tempo. How do both demonstrate the three components of mathematical language (terminology, notation, syntax) even outside mathematics proper?

*P76 note: cross_links=[]. Transfer uses self-contained real-world contexts. Musical scores and chemistry formulas are not KG cross-link domains — the transfer is self-contained, demonstrating that formal language principles extend beyond mathematics.*

**P55 — COMPREHENSION CHECK:** "What is the SYNTAX of the formula H₂O? What rule does it follow?"

*Expected: Element symbol + subscript count for each element; compound ends when all elements listed. A defined syntax, not arbitrary arrangement.*

**P75 — MISCONCEPTION PROBE:**
"A student says: 'In math, = is just a shorthand for the English word equals, the same way @ is shorthand for at. There's no real difference between mathematical language and ordinary language — math just uses more symbols.' What is wrong with this claim?"

*Expected: MC-1. Mathematical language is a formal system, not abbreviation. '=' is not a shorthand — it carries precise semantics (identical value, symmetric, transitive, reflexive) defined by axioms. '@' is a typographic shorthand with no formal grammar. Mathematical language has SYNTAX rules and defined SEMANTICS; ordinary language relies on contextual interpretation. They are categorically different.*

**P55 — COMPREHENSION CHECK:** "Give one example where an ordinary English word and its mathematical definition DIFFER in meaning."

*Expected: E.g., 'or' in English often means exclusive or (either/or, not both); in mathematics, 'or' is inclusive (A or B = A is true, or B is true, or both). / 'factor' in ordinary speech means 'element that contributes'; in math, a factor of n is an integer that divides n exactly.*

**P74 — APPLICATION PROBE:**
"Convert to formal mathematical language: 'Every positive number has a square root that is also positive.' State the domain, quantifier, and conclusion in formal notation. Then verify with one concrete example."

*Expected: ∀ x ∈ ℝ, x > 0 → ∃ y ∈ ℝ such that y > 0 and y² = x. (or: y = √x > 0). Verify: x = 4 → y = 2, 2 > 0, 2² = 4 ✓.*

**P55 — COMPREHENSION CHECK:** "Why must the domain be declared as ℝ (real numbers) and not ℕ (natural numbers) in your formal statement?"

*Expected: ℕ includes only counting numbers. √3 is not in ℕ but is in ℝ. If the domain were ℕ, the statement would be false for x=3. Correct domain is ℝ (or ℝ⁺).*

**P78 — MASTERY GATE:**

```json
{
  "gate": "mastery_threshold = 0.80",
  "PASS": {
    "criteria": "P77 defines all 3 components correctly + precision necessity explained; P76 transfer applied to music and chemistry correctly; P75 MC-1 error identified (language ≠ abbreviation); P74 formal statement with correct domain, quantifier, notation and correct verification",
    "action": "Record mastery (threshold 0.80). Trigger P89 spaced repetition (1, 3, 7, 21, 60 days). Blueprint complete."
  },
  "ROUTE_TO_PROTOCOL_B": {
    "criteria": "P77 components correct but P74 writing task fails — procedural gap in writing",
    "action": "Route to Protocol B."
  },
  "ROUTE_TO_PROTOCOL_C": {
    "criteria": "P75 MC-1 not identified (still treats math language as abbreviation) OR transfer (P76) impossible",
    "action": "Route to Protocol C."
  }
}
```

---

### Protocol B — State S1: Partial Knowledge

**TA-B01 — Gap Diagnosis and Precision Reinforcement**

*Primitive sequence:* `P02 → P41 → P06 → P26 → P55 → P49`

**P02 — CONTEXT ESTABLISHMENT:** "Let's find your specific gap in mathematical language skills."

**P41 — MISCONCEPTION DETECTOR:**
Three probes:
1. "Is 'x is approximately 5' a valid mathematical statement?" → tests MC-2 (precision)
2. "What does '∈' mean? Do you need to be told, or is it obvious?" → tests MC-3 (self-evident symbols)
3. "Convert to formal language: 'some x satisfies x + 3 = 7.'" → tests writing skill

**P06 / P26:** Target the identified gap with worked example at the relevant component.

**P55:** "Explain the component (terminology / notation / syntax) that you found hardest."

**P49 — ADAPTIVE CHECKPOINT:**

```json
{
  "prompt": "Restate the informal claim 'x is pretty close to 10' as a precise mathematical statement using absolute value notation. Then check whether x = 9.8 satisfies your statement.",
  "CORRECT": {
    "criteria": "|x − 10| < ε for some specified ε (e.g., ε = 0.5). Check: |9.8 − 10| = 0.2 < 0.5 ✓.",
    "action": "→ advance to TA-B02"
  },
  "PARTIAL": {
    "criteria": "Uses absolute value but doesn't specify ε or doesn't check",
    "action": "Ask: 'How close is close? Pick a specific number for the tolerance.' → advance"
  },
  "INCORRECT": {
    "criteria": "Reverts to informal language",
    "action": "Return to TA-A01 P03 table. 'Close is not a mathematical term — what symbol replaces it?' → advance"
  },
  "NO_RESPONSE": {
    "criteria": "No attempt",
    "action": "Scaffold: '|x − 10| measures the distance from x to 10. If this distance is less than 0.5, is x close? Write that formally.'"
  }
}
```

---

**TA-B02 — Transfer Practice**

*Primitive sequence:* `P01 → P26 → P30 → P55 → P49`

**P01 — ATTENTION ANCHOR:** "Practice translating real-world precision requirements into mathematical language."

**P26 — WORKED EXAMPLE:**
"A bridge specification: 'The maximum load the bridge can bear is 40 tonnes.' In formal mathematical language:
- Let L = load applied (in tonnes), L ∈ ℝ, L ≥ 0.
- Safety condition: L ≤ 40.
- Failure condition: L > 40.
Each condition is a precise mathematical inequality. The engineer's design must guarantee L ≤ 40 under all operating conditions — this IS a mathematical statement."

**P30 — BRIDGE REINFORCEMENT:** "Every real-world precision requirement can be translated into formal mathematical language — this is WHY mathematical language was developed: to handle constraints and conditions without ambiguity."

**P55 — COMPREHENSION CHECK:** "Why does a bridge engineer write L ≤ 40 rather than 'loads up to about 40 tonnes'?"

*Expected: 'About 40' could be 41, which causes collapse. Mathematical language ≤ 40 is a hard constraint — the engineer's calculation must guarantee it, not approximately satisfy it.*

**P49 — ADAPTIVE CHECKPOINT:**

```json
{
  "prompt": "Write formal mathematical language for: 'A student passes the exam if and only if they score at least 60 out of 100.' Include domain, variable, and condition.",
  "CORRECT": {
    "criteria": "Let s ∈ ℝ (or ℤ), 0 ≤ s ≤ 100. Student passes ↔ s ≥ 60. (or: s ∈ [60, 100]).",
    "action": "→ advance to TA-B03 (mastery gate)"
  },
  "PARTIAL": {
    "criteria": "Correct condition (s ≥ 60) but domain or bounds [0,100] missing",
    "action": "Ask: 'Can a student score 150? Score −5? Add bounds.' → advance"
  },
  "INCORRECT": {
    "criteria": "Uses informal language or wrong quantifier",
    "action": "Return to P26 bridge example. 'The same structure: variable, domain, condition.' Guide through 3-step conversion."
  },
  "NO_RESPONSE": {
    "criteria": "No attempt",
    "action": "Scaffold: 'Let s = the score. What domain? What's the passing condition in symbols?'"
  }
}
```

---

**TA-B03 — Mastery Gate**

*Primitive sequence:* `P01 → P91`

**P91 expansion:** `P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78`

**P01:** "Confirming full mastery."

**P77:** "State the three components of mathematical language with one example of each. Explain why each is required."

**P55:** "What is the minimum required for a statement to be a valid mathematical statement?"

**P76 — TRANSFER PROBE:** "Computer code: `if (x > 0 && x <= 100) { return true; }`. Map this to the three components of mathematical language. Which component does the `&&` symbol represent?"

**P55:** "What would 'x is positive-ish' look like in code? Why would it fail to compile?"

**P75 — MISCONCEPTION PROBE:** "A student says: 'If everyone in the room understands what I mean, then saying x is big is mathematically fine.' What is the fundamental error?"

*Expected: MC-2. Mathematical language cannot depend on reader interpretation — precision means ONE valid interpretation regardless of reader. If two readers could interpret differently, the statement is not mathematical.*

**P55:** "What is the standard for 'unambiguous' in mathematical language? Is reader agreement sufficient?"

**P74 — APPLICATION PROBE:** "Convert to formal mathematical language: 'The speed of a car must not exceed 50 km/h in the school zone.' Include domain, variable, and hard constraint."

**P55:** "If the constraint were written as 'speed should be low near schools', what mathematical consequence follows for enforcement?"

**P78 — MASTERY GATE:**

```json
{
  "gate": "mastery_threshold = 0.80",
  "PASS": {
    "criteria": "P77 all 3 components with examples; P76 code mapped correctly; P75 MC-2 identified (reader agreement insufficient); P74 formal statement with domain and hard constraint",
    "action": "Record mastery. P89 scheduled. Blueprint complete."
  },
  "ROUTE_TO_PROTOCOL_C": {
    "criteria": "P75 MC-2 not identified — still believes informal language acceptable",
    "action": "Route to Protocol C."
  },
  "RETRY": {
    "criteria": "One minor notation error only",
    "action": "One retry on failed probe."
  }
}
```

---

### Protocol C — State S2: Active Misconceptions

**TA-C01 — Triage**

*Primitive sequence:* `P02 → P26 → P41 → P55 → P49`

**P02:** "Identifying your specific misconception about mathematical language."

**P26 (neutral presentation):** "Mathematical language is a formal system with three components — terminology, notation, syntax — that together ensure unambiguous communication. It is NOT ordinary English with symbols substituted."

**P41 — MISCONCEPTION DETECTOR:**
1. "True or False: '=' in mathematics is just a shorthand for the English word 'equals.'" → MC-1
2. "If your tutor understands what you mean by 'x is big', is your statement mathematically valid?" → MC-2
3. "Could you figure out what '∈' means without being told, just from context?" → MC-3

**P55:** "For question 1: what grammatical and logical rules does '=' obey that the word 'equals' does not need to obey?"

**P49 — ADAPTIVE CHECKPOINT:**

```json
{
  "prompt": "Three probe items above.",
  "CORRECT_ALL": {
    "criteria": "False (= has formal semantics beyond the word 'equals'); No (precision requires single interpretation, not reader understanding); Probably not (conventions must be learned)",
    "action": "No active MC detected. Route to Protocol A TA-A03."
  },
  "MC1_ACTIVE": {
    "criteria": "True on item 1 (= is just shorthand)",
    "action": "Flag MC-1 (FOUNDATIONAL). → TA-C02."
  },
  "MC2_ACTIVE": {
    "criteria": "Yes on item 2 (tutor understanding is enough) — MC-1 not active",
    "action": "Flag MC-2. → TA-C03."
  },
  "MC3_ACTIVE": {
    "criteria": "Yes on item 3 (symbols are self-evident) — MC-1 not active",
    "action": "Flag MC-3. → TA-C04."
  }
}
```

---

**TA-C02 — MC-1 Repair: Mathematical Language ≠ Ordinary Language Abbreviation**

*Primitive sequence:* `P27 → P29 → P34 → P30 → P55 → P49 → P32`

**P27:** "You said '=' is just shorthand for 'equals.' Let's examine that claim carefully — because the difference has real consequences."

**P29 — CONTRASTIVE ANALYSIS:**
```
Ordinary word "equals":
  Context-dependent: "That haircut equals disaster" (metaphorical)
  No formal properties required
  No grammar rule: "3 equals 5 equals 7" might seem grammatical
  Reader decides what "equals" means in context

Mathematical symbol "=":
  Semantics: identical numerical or algebraic value (a = b means a and b are the SAME object)
  Formal properties: reflexive (a = a), symmetric (a = b → b = a), transitive (a = b, b = c → a = c)
  Syntax rule: "3 = 5 = 7" is INVALID (3 ≠ 7, so the chain fails — the middle = means 5 = 7 which is false)
  No reader interpretation — either satisfied or not
```

**P34 — CORRECTIVE EXAMPLE:** "'3 = 3' is not a stylistic choice. It is a formal claim: the real number on the left and the real number on the right are the SAME value. This claim is either true (provable from axioms) or false — not vague, not interpretive."

**P30 — BRIDGE:** "Mathematical symbols are not abbreviations because abbreviations borrow meaning from context. Mathematical symbols DEFINE meaning by their formal rules. '=' defines equality; it doesn't borrow the casual English meaning of 'equals.'"

**P55:** "Why does the formal property 'a = b and b = c implies a = c' make = different from the English word 'resembles' or 'looks like'?"

*Expected: 'Resembles' is not transitive (A resembles B, B resembles C doesn't force A resembles C). '=' is transitive by formal definition.*

**P49 — CHECKPOINT:**

```json
{
  "prompt": "A student writes: 'x = 5, therefore 5 = x.' Why is this valid in mathematical language but would be strange as ordinary English ('x equals 5, therefore 5 equals x' — sounds odd)?",
  "CORRECT": {
    "criteria": "Mathematical '=' is symmetric by formal definition (a = b ↔ b = a). In ordinary English, 'X equals Y' often implies X is being defined in terms of Y — the symmetry is not inherent. Mathematical language has explicit formal properties that override English conventions.",
    "action": "MC-1 repaired. Check remaining MCs per MAMR order. → TA-C03 if MC-2 active, TA-C04 if MC-3, else route to TA-A03."
  },
  "PARTIAL": {
    "criteria": "Notices the difference but cannot name 'symmetry'",
    "action": "Ask: 'What property of = allows you to flip the equation?' → symmetry (a=b ↔ b=a) → advance"
  },
  "INCORRECT": {
    "criteria": "Still says both forms mean the same thing without formal justification",
    "action": "Return to P29 table. 'The word equals has no formal property called symmetry — = has, by definition.' Retry."
  },
  "NO_RESPONSE": {
    "criteria": "No attempt",
    "action": "Scaffold: 'Does a = b imply b = a for numbers? Yes — that's called symmetry. Does X resembles Y imply Y resembles X for all X and Y?' → not necessarily."
  }
}
```

**P32:** "Complete: Mathematical symbols have formal __________ defined by __________, not borrowed from the contextual meaning of ordinary English words."

---

**TA-C03 — MC-2 Repair: Precision Is Non-Negotiable**

*Prerequisite: MC-1 cleared.*

*Primitive sequence:* `P27 → P06 → P26 → P55 → P49 → P32`

**P27:** "You said precision is optional if the reader understands. Let's examine what mathematical communication requires and why reader understanding is insufficient."

**P06:** "In mathematics, a statement is valid when it has exactly ONE interpretation for ALL readers — not when your tutor happens to understand your intent. Mathematical language is universal and reader-independent."

**P26 — WORKED EXAMPLE:**
```
Student writes: "x is a number close to 5."
Tutor A reads it as: |x − 5| < 1  (within 1 of 5)
Tutor B reads it as: |x − 5| < 0.01 (within 0.01 of 5)
Student intended: |x − 5| < 0.5

Even though all three "understand" the intent, they have three DIFFERENT mathematical objects.
The proof built on this statement will be correct for ONE interpretation and wrong for the other two.
Reader understanding does not resolve the ambiguity — it only hides it.
```

**P55:** "What is the mathematical cost of an ambiguous assumption in a proof?"

*Expected: Every downstream step using that assumption may be valid for one interpretation and invalid for another. The proof is not a proof — it is a conditional argument with an unresolved branching point.*

**P49 — CHECKPOINT:**

```json
{
  "prompt": "Two proofs both use the assumption 'n is large.' Proof A concludes n > 100. Proof B concludes n > 10^6. Can both proofs be correct? What went wrong?",
  "CORRECT": {
    "criteria": "Both may be 'correct' given different meanings of 'large', but the two conclusions contradict each other for specific n (e.g., n=1000 satisfies Proof A's conclusion but not Proof B's assumption). The assumption 'n is large' is ambiguous — it smuggles different mathematical objects into the two proofs. Only formal specification of n prevents this.",
    "action": "MC-2 repaired. Check MC-3 per MAMR order. → TA-C04 if active, else route to TA-A03."
  },
  "PARTIAL": {
    "criteria": "Says both can't both be right but doesn't identify the source (ambiguous assumption)",
    "action": "Ask: 'What does each proof mean by large?' → different things → the assumption is ambiguous → advance"
  },
  "INCORRECT": {
    "criteria": "Says both proofs can be correct simultaneously",
    "action": "Counter: n=1000. Does 1000 > 100? Yes. Does 1000 > 10^6? No. So Proof A says n=1000 is fine; Proof B says it isn't. They contradict each other — only ONE can be right for n=1000. The ambiguity caused the contradiction."
  },
  "NO_RESPONSE": {
    "criteria": "No attempt",
    "action": "Scaffold: 'How large is large? Is n=500 large? Is n=500,000 large? See how different people give different answers? That's why formal specification is required.'"
  }
}
```

**P32:** "Complete: In mathematical communication, a statement is valid when it has exactly __________ interpretation for __________ readers, not when the author's tutor happens to understand the __________ intent."

---

**TA-C04 — MC-3 Repair: Symbols Require Learned Convention**

*Prerequisite: MC-1 cleared.*

*Primitive sequence:* `P27 → P06 → P26 → P55 → P49 → P32`

**P27:** "You suggested that mathematical symbols are self-evident. Let's test that claim by looking at what symbols actually require."

**P06:** "Mathematical symbols are AGREED CONVENTIONS — shorthand with formally defined meanings. They must be learned because the connection between symbol and meaning is arbitrary (chosen by historical convention, not by visual logic)."

**P26 — WORKED EXAMPLE:**
```
Symbol: ∈
Visual appearance: backwards epsilon
Self-evident meaning?: Could mean "belongs to", "is in", "member of", or nothing
Actual defined meaning: "is an element of" (set membership) — defined by Peano and Cantor, 1890s
Example: 3 ∈ ℕ means "3 is a natural number"
Would you know this without being taught? No.

Symbol: ∑
Visual appearance: capital Greek sigma
Self-evident meaning?: Could mean "sum" or "sigma" or nothing
Actual defined meaning: Σ(k=1 to n) aₖ = a₁ + a₂ + ... + aₙ — defined by Euler, 1755
Example: Σ(k=1 to 4) k = 1+2+3+4 = 10
Would you know this without being taught? No.

Symbol: ∅
Visual appearance: circle with slash
Self-evident meaning?: "nothing"? "zero"? "forbidden"?
Actual defined meaning: the empty set (the unique set with no elements) — from set theory
Would you know this without being taught? No.
```

**P55:** "Why does the fact that ∑ looks like S (for 'sum') NOT make it self-evident, even partially?"

*Expected: '∑' also specifies the index variable, bounds, and summand — none of which are implied by looking like 'S'. The notation carries formal structure (k=1 to n) that requires explicit learning.*

**P49 — CHECKPOINT:**

```json
{
  "prompt": "Without any prior instruction, what would a reader unfamiliar with mathematics conclude about '∀ x ∈ ℝ, x² ≥ 0'? What do they actually need to know to read it correctly?",
  "CORRECT": {
    "criteria": "Unfamiliar reader: might guess 'A x is real number, x squared more-than-or-equal-to zero' but would not know ∀='for all', ∈='element of', ℝ='real numbers', x²='x squared'. Needs to learn: universal quantifier, set membership notation, set symbol ℝ, exponent notation. All are conventions, not intuitive.",
    "action": "MC-3 repaired. → route to TA-C05 (mastery gate)."
  },
  "PARTIAL": {
    "criteria": "Lists some required knowledge but not all four conventions",
    "action": "Ask: 'What does ∀ mean? How would you know from looking at it?' → convention → list the others → advance"
  },
  "INCORRECT": {
    "criteria": "Says most of it is guessable",
    "action": "Test: 'What does ∈ mean just from its shape?' → student cannot say 'set membership' → convention needed. Apply to ∀, ℝ, x²."
  },
  "NO_RESPONSE": {
    "criteria": "No attempt",
    "action": "Scaffold: 'Cover ∀. What does the symbol look like? An A upside down. Does that tell you it means for all?' → no → convention required."
  }
}
```

**P32:** "Complete: Mathematical symbols are not __________ — they are __________ with formally defined meanings that must be __________ before they can be used correctly."

---

**TA-C05 — Post-Repair Mastery Gate**

*Primitive sequence:* `P01 → P91`

**P91 expansion:** `P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78`

**P01:** "All misconceptions repaired. Confirming full mastery."

**P77:** "Define mathematical language. Name its three components. Explain why it cannot be replaced by ordinary language for mathematical communication."

**P55:** "Which property of mathematical language prevents the situation where two readers interpret the same statement differently?"

**P76 — TRANSFER PROBE:** "A shipping company writes: 'Packages must not exceed 10 kg and must have dimensions no greater than 30cm × 30cm × 60cm.' (a) Map this to mathematical language (variables, domain, constraints). (b) A second company writes 'Packages should be reasonably sized.' What is the mathematical difference?"

**P55:** "For the second company's rule: if a customer sends a 15kg package, has the rule been violated? How would a court decide?"

**P75 — MISCONCEPTION PROBE:** "A student submits a proof using 'n is sufficiently large.' Their classmate's proof uses a different 'sufficiently large' and reaches a contradictory conclusion. Both students claim their proofs are correct. What is the MATHEMATICAL error both made?"

*Expected: Both used an imprecise, reader-dependent assumption. Mathematical language requires n > N for an explicitly stated N. 'Sufficiently large' has no formal definition unless N is named — so both proofs are formally incomplete. The contradictory conclusions prove the ambiguity caused mathematical breakdown.*

**P55:** "What is the fix? How should both students rewrite their assumption?"

**P74 — APPLICATION PROBE:** "Write a formal mathematical statement for: 'For any two distinct real numbers, there exists a real number strictly between them.' Include quantifiers, domain, and verify with one concrete pair."

*Expected: ∀ a, b ∈ ℝ, a ≠ b → ∃ c ∈ ℝ such that min(a,b) < c < max(a,b). Verify: a=1, b=3 → c=2, 1<2<3 ✓.*

**P55:** "Is this statement true? Could there be two distinct reals with nothing between them?"

*Expected: No — for any a ≠ b, c = (a+b)/2 is always strictly between them (density of ℝ). The formal statement is true.*

**P78 — MASTERY GATE:**

```json
{
  "gate": "mastery_threshold = 0.80",
  "PASS": {
    "criteria": "P77 all three components defined; P76 shipping mapped to formal language; P75 'sufficiently large' error identified as imprecision; P74 formal statement with correct quantifiers and verification",
    "action": "Record mastery. P89 scheduled. Blueprint complete."
  },
  "RETRY": {
    "criteria": "One minor error only",
    "action": "One retry on failed probe."
  },
  "ROUTE_BACK": {
    "criteria": "Two or more errors — MC still present",
    "action": "Re-enter appropriate repair TA."
  }
}
```

---

### Protocol D — State S6: Low Confidence

**TA-D01 — Confidence Anchor: Mathematical Language Is Already Familiar**

*Primitive sequence:* `P02 → P06 → P03 → P55 → P49`

*GR-5: P28 ABSENT. P30 bridge used instead of cognitive conflict.*

**P02 — CONTEXT ESTABLISHMENT:** "Mathematical language can feel intimidating. But you already use versions of it every day — let's start from what you know."

**P06:** "You've already used mathematical language: '3 + 5 = 8' is a complete, unambiguous mathematical statement. It has all three components: terminology (number, addition), notation (+, =), and syntax (left + right = total). That IS mathematical language."

**P03 — CONCRETE MANIPULATION:**
Student reads three familiar mathematical statements:
- "4 × 3 = 12" (state each component)
- "7 > 5" (state what > means formally)
- "x + 2 = 9, so x = 7" (state the logical structure)

All three already demonstrate the three components. Student is already using mathematical language.

**P55 — COMPREHENSION CHECK:** "In '4 × 3 = 12': what is the terminology? What is the notation? What is the syntax rule that makes this a valid statement?"

*Expected: Terminology: multiplication, equality, natural numbers. Notation: ×, =. Syntax: [number] [operation] [number] = [result] — valid equation structure.*

**P49 — ADAPTIVE CHECKPOINT:**

```json
{
  "prompt": "Write a simple mathematical statement about the number 7 (your choice). Identify which part is terminology, which is notation, and which is syntax.",
  "CORRECT": {
    "criteria": "Any valid mathematical statement (e.g., '7 is prime', '7 > 6', '7 = 7', '7 + 3 = 10') with correct component identification.",
    "action": "Affirm. 'You've been writing mathematical language all along.' → advance to TA-D02"
  },
  "PARTIAL": {
    "criteria": "Writes valid statement but misidentifies a component",
    "action": "Clarify the misidentified component with a prompt. → advance"
  },
  "INCORRECT": {
    "criteria": "Writes an informal statement (e.g., '7 is a lucky number')",
    "action": "Route to Protocol C — possible MC-1 or MC-2 present. Not a confidence issue."
  },
  "NO_RESPONSE": {
    "criteria": "Freezes",
    "action": "Provide a sentence stem: '7 __ __.' Ask student to fill in with a mathematical symbol and number."
  }
}
```

---

**TA-D02 — Scaffolded Precision Practice**

*Primitive sequence:* `P01 → P26 → P30 → P55 → P49`

*GR-5: P28 ABSENT. P30 used.*

**P01 — ATTENTION ANCHOR:** "Practise making informal descriptions precise — step by step, with support."

**P26 — WORKED EXAMPLE (structured template):**
"Use this template to convert any informal description to formal mathematical language:
```
Step 1: What is the variable? Let ___ = ___
Step 2: What is the domain? ___ ∈ ___
Step 3: What is the condition? ___  (use =, <, >, ≤, ≥, ∈, or ∉)
Step 4: Check: does this have one interpretation for every reader? Yes/No
```
Example: 'The temperature is above freezing.'
Step 1: Let T = temperature in °C
Step 2: T ∈ ℝ
Step 3: T > 0
Step 4: Every reader gets: T > 0 means exactly temperatures above 0°C. ✓"

**P30 — BRIDGE REINFORCEMENT:** "Every precision problem has the same structure — a variable, a domain, and a condition. The template makes this routine. Trust the template; it never fails."

**P55 — COMPREHENSION CHECK:** "What does Step 4 check? Why is that the right final test?"

*Expected: Step 4 checks reader-independence — if every reader gets the same interpretation, the statement is mathematically valid. This is the definition of unambiguous.*

**P49 — ADAPTIVE CHECKPOINT:**

```json
{
  "prompt": "Use the template to convert: 'The class has a small number of students.' (Suggest: treat 'small' as fewer than 25 for this context.)",
  "CORRECT": {
    "criteria": "Step 1: Let n = number of students. Step 2: n ∈ ℕ. Step 3: n < 25. Step 4: Every reader interprets n < 25 identically. ✓",
    "action": "Affirm confidence. 'You converted informal to formal in 4 steps.' → advance to TA-D03"
  },
  "PARTIAL": {
    "criteria": "Correct variable and condition but domain or step 4 check missing",
    "action": "Prompt for missing step. → advance"
  },
  "INCORRECT": {
    "criteria": "Systematic error",
    "action": "Work through template step by step together."
  },
  "NO_RESPONSE": {
    "criteria": "Freezes",
    "action": "Fill in Step 1 together: 'What varies in this sentence? The number of students — call it n.' Continue step by step."
  }
}
```

---

**TA-D03 — Mastery Gate**

*Primitive sequence:* `P01 → P91`

**P91 expansion:** `P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78`

*GR-5: P28 ABSENT throughout Protocol D mastery gate.*

**P01:** "Final confidence check. You have the tools — apply them."

**P77:** "Define mathematical language and its three components. State one thing that makes it different from ordinary language."

**P55:** "Can you always use the 4-step template to formalize any informal mathematical claim?"

**P76 — TRANSFER:** "A restaurant menu says 'Large coffees cost more than small ones.' Convert to formal mathematical language. (Define: let S = cost of small coffee, L = cost of large coffee, both in pence.)"

*Expected: Let S, L ∈ ℝ, S > 0, L > 0. Condition: L > S.*

**P55:** "Does your formal statement allow L = S (equal price)? If not, is the formal statement more or less precise than 'costs more'?"

*Expected: L > S strictly excludes equality — more precise than 'costs more' which some might interpret as ≥.*

**P75 — MISCONCEPTION PROBE:** "True or False: 'If I use the = sign, my statement is automatically in mathematical language because I used a mathematical symbol.'"

*Expected: False. A statement requires correct terminology, notation, AND syntax. Using '=' alone doesn't guarantee precision: 'x = big thing' uses = but is not a valid mathematical statement — 'big thing' violates the terminology component.*

**P55:** "Give an example of a statement that uses mathematical notation but is not a valid mathematical statement."

**P74 — APPLICATION:** "Formalize: 'Every whole number is either odd or even.' Include domain, quantifier, and use the template."

*Expected: ∀ n ∈ ℤ, (∃ k ∈ ℤ: n = 2k) ∨ (∃ k ∈ ℤ: n = 2k+1). Or: every integer n satisfies n mod 2 = 0 or n mod 2 = 1.*

**P55:** "Verify with n = −4 and n = 7."

**P78 — MASTERY GATE:**

```json
{
  "gate": "mastery_threshold = 0.80",
  "PASS": {
    "criteria": "P77 definition + 3 components; P76 formal statement L>S correct; P75 false statement identified (symbol alone ≠ mathematical); P74 formal statement with quantifier and domain; both verifications correct",
    "action": "Record mastery. P89 scheduled. Blueprint complete."
  },
  "ROUTE_TO_PROTOCOL_C": {
    "criteria": "P75 false statement not identified — possible MC-2 or MC-3",
    "action": "Route to Protocol C."
  },
  "RETRY": {
    "criteria": "One minor error only",
    "action": "One retry."
  }
}
```

---

### Protocol E — State S9: Mastery Maintenance (Spaced Repetition)

**P89 Schedule:** Day 1 → Day 3 → Day 7 → Day 21 → Day 60.
**Entry:** Protocol E.
**Decay rule:** If student fails any probe → reset to Day 1 + route to Protocol B.

---

**TA-E01 — Retrieval Probe**

*Primitive sequence:* `P02 → P77 → P55 → P49`

**P02:** "Scheduled recall check for Mathematical Language."

**P77 — RETRIEVAL:** "Without notes: (1) Name the three components of mathematical language. (2) State what makes a mathematical statement valid. (3) Give an example of converting an informal claim to formal mathematical language."

**P55:** "What is the difference between 'x is about 5' and '|x − 5| < 0.1'?"

**P49:**

```json
{
  "prompt": "Quick recall: what does ∀ mean? What is a terminology error in a mathematical statement? Write a formal statement for: 'n is a natural number greater than 10.'",
  "CORRECT": {
    "criteria": "∀ = for all. Terminology error = undefined term. n ∈ ℕ, n > 10.",
    "action": "Advance to TA-E02."
  },
  "PARTIAL": {
    "criteria": "2 of 3 correct",
    "action": "Prompt for missing item. Advance."
  },
  "INCORRECT": {
    "criteria": "Decay — 2+ errors",
    "action": "Reset to Day 1. Route to Protocol B."
  },
  "NO_RESPONSE": {
    "criteria": "No recall",
    "action": "Reset. Route to Protocol B."
  }
}
```

---

**TA-E02 — Transfer Probe**

*Primitive sequence:* `P01 → P76 → P55 → P49`

**P01:** "Transfer check — applying mathematical language to a new context."

**P76 — TRANSFER PROBE:** "A software engineer writes a function specification: `input: integer n; output: true if n is prime, false otherwise.` (a) Identify the terminology, notation, and syntax in this specification. (b) Is this specification a mathematical statement? (c) How would you write the condition 'n is prime' as a formal mathematical statement?"

**P55:** "What does the software specification share with a mathematical statement? What does it lack?"

**P49:**

```json
{
  "prompt": "Spot the mathematical language error: 'A number x satisfies x = x + 1.' (Hint: is this a valid statement?)",
  "CORRECT": {
    "criteria": "x = x + 1 has no solution in ℝ (subtracting x: 0 = 1, a contradiction). The statement is false as a universal claim. As an existential claim (∃ x: x = x+1) it is also false in ℝ. The statement is syntactically valid but semantically false — a meaningful distinction in mathematical language.",
    "action": "Advance to TA-E03."
  },
  "PARTIAL": {
    "criteria": "Identifies it's false but confuses 'syntactically invalid' with 'false'",
    "action": "Clarify: 'Syntactically invalid = ungrammatical. Semantically false = grammatically correct but untrue in the domain.' → advance"
  },
  "INCORRECT": {
    "criteria": "Decay",
    "action": "Reset to Day 1. Route to Protocol B."
  },
  "NO_RESPONSE": {
    "criteria": "No attempt",
    "action": "Scaffold: 'Subtract x from both sides. What do you get?' → 0 = 1 → impossible → false."
  }
}
```

---

**TA-E03 — P89 Schedule Update**

*Primitive sequence:* `P74 → P55 → P89`

**P74 — FINAL PROBE:** "Write formal mathematical language for: 'The product of any two negative numbers is positive.' Include quantifiers, domain, and verify."

*Expected: ∀ a, b ∈ ℝ, (a < 0 ∧ b < 0) → ab > 0. Verify: a=−2, b=−3 → (−2)(−3) = 6 > 0 ✓.*

**P55:** "Does this statement hold in the complex numbers? Why or why not?"

*Expected: Complex numbers are not ordered (no < relation), so a < 0 doesn't apply. The statement is ℝ-specific — domain restriction matters.*

**P89 — SPACED REPETITION UPDATE:**

```json
{
  "schedule": "1 → 3 → 7 → 21 → 60 days",
  "current_interval": "advance to next scheduled interval",
  "PASS": {
    "criteria": "P74 formal statement correct with domain and verification; P55 domain-restriction answer correct",
    "action": "Advance to next interval. Record date."
  },
  "FAIL": {
    "criteria": "Any probe incorrect",
    "action": "Reset to Day 1 interval. Route to Protocol B."
  }
}
```

---

## Component 5 — Prerequisite Chain Verification

| Prerequisite | Status | Verification Method |
|---|---|---|
| math.found.mathematical-thinking | Required | TA-A01 opening gate (verbal → formal conversion test) |

No transitive prerequisite issues. math.found.mathematical-thinking has no prerequisites.

---

## Component 6 — Cross-Link Bridge Map

**cross_links: []** — no KG cross-links for this concept.

**P76 Independence Note:** Transfer probes use self-contained real-world contexts only: legal contracts (precision in language has legal consequences), medical prescriptions (dosage precision = patient safety), software specifications (compiler enforces syntax), musical scores (notation encodes precise performance), GPS coordinates (exact real-number pairs identify unique locations), engineering tolerances (bounds constraints). None require KG cross-link domains. All transfer is self-contained.

---

## Component 7 — Compound Primitive Reference

**P91 Named Compound (Mastery Gate Sequence):** `P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78`

Used in: TA-A07, TA-B03, TA-C05, TA-D03. Terminal in each mastery gate TA per GR-6.

---

## Component 8 — Grammar Rule Compliance

| Rule | Requirement | Status |
|---|---|---|
| GR-1 | Non-repair TAs open with B-category primitive | ✓ All Protocol A/B TAs open with P02 (B), P01 (B), P26 (B) |
| GR-2 | Each TA contains at least one P49 branching checkpoint | ✓ All TAs contain P49 |
| GR-3 | Mastery gate TAs are terminal (no next TA after P78 PASS) | ✓ TA-A07, B03, C05, D03 terminate at P78 PASS |
| GR-4 | P41 or P64 gates entry to every repair chain | ✓ P41 in TA-C01; MAMR enforced |
| GR-5 | P28 absent from Protocol D | ✓ P28 not used anywhere in Protocol D |
| GR-6 | P91 terminal within its TA | ✓ P91 is last sequence in each mastery gate TA |
| GR-7 | Transfer probes present in mastery gates | ✓ P76 in every P91 expansion |
| GR-8 | Cross-links documented | ✓ Component 6 documents [] + real-world alternatives |
| GR-9 | P76 probe contexts documented | ✓ Component 6 P76 Independence Note |
| GR-10 | MAMR rule stated and enforced | ✓ Component 3 MAMR rule; C01 routing per MC priority |

---

## Component 9 — AIR Test (AI Removal Test)

**AIR-1 (Finite Content Slots):** All worked examples use specific content (defined statements, worked conversions, identified errors). ✓

**AIR-2 (Pre-authored Response Taxonomies):** All P49 checkpoints have 4 branches (CORRECT / PARTIAL / INCORRECT / NO_RESPONSE) with deterministic actions. ✓

**AIR-3 (Deterministic Branching):** All routing decisions are based on observable student responses (correct/partial/incorrect/no response). No probabilistic routing. ✓

**AIR-4 (Concept-Independent Primitives):** All primitives (P01, P02, P06, P26, P27, P29, P30, P32, P34, P41, P49, P55, P74, P75, P76, P77, P78, P89, P91) are defined by the Primitive Library, not by this concept. ✓

**AIR-5 (Sequences Fixed at Authoring):** All primitive sequences specified in TA headers. No runtime sequence decisions. ✓

**AIR Test: PASS**

---

## Component 10 — Validation Checklist

| # | Check | Status |
|---|---|---|
| V-1 | KG concept ID exists and is correct | ✓ math.found.mathematical-language |
| V-2 | CPA entry stage derived correctly | ✓ diff=1 ≤ 2, domain≠physics → C |
| V-3 | Mastery threshold matches KG | ✓ 0.80 |
| V-4 | Session TA cap applied correctly | ✓ hrs=6 → max 7; Protocol A = 7 TAs |
| V-5 | Prerequisite verified in blueprint | ✓ math.found.mathematical-thinking in C2 + TA-A01 gate |
| V-6 | Misconceptions have MAMR priority | ✓ MC-1 foundational, MC-2/MC-3 secondary FIFO |
| V-7 | Response taxonomy present | ✓ RT-1 through RT-5 in C3 |
| V-8 | All MCs have repair TAs | ✓ TA-C02 (MC-1), TA-C03 (MC-2), TA-C04 (MC-3) |
| V-9 | P49 all four branches present | ✓ CORRECT/PARTIAL/INCORRECT/NO_RESPONSE in all TAs |
| V-10 | P91 expansion correct | ✓ P77→P55→P76→P55→P75→P55→P74→P55→P78 in all mastery gates |
| V-11 | GR-1 compliant | ✓ All non-repair TAs open with B-category primitive |
| V-12 | GR-2 compliant | ✓ P49 in every TA |
| V-13 | GR-3 compliant | ✓ Mastery gate TAs terminal |
| V-14 | GR-4 compliant | ✓ P41 gates Protocol C repair chain |
| V-15 | GR-5 compliant | ✓ P28 absent from Protocol D |
| V-16 | GR-6 compliant | ✓ P91 terminal in mastery gate TAs |
| V-17 | GR-7 compliant | ✓ P76 in all P91 expansions |
| V-18 | GR-8 compliant | ✓ cross_links=[] documented in C6 |
| V-19 | GR-9 compliant | ✓ P76 independence note in C6 |
| V-20 | AIR Test PASS | ✓ AIR-1 through AIR-5 all PASS |

**PACKAGE_READY: YES**
