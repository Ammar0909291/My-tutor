# Teaching Blueprint: Proposition

## Component 0 — Metadata Header

| Field | Value |
|---|---|
| BLUEPRINT_ID | math.found.proposition |
| KG_ID | math.found.proposition |
| KG_VERSION | v1.0.1 |
| STATUS | PACKAGE_READY |
| DOMAIN | Foundations |
| NAME | Proposition |
| ALIASES | statement, assertion, declarative sentence |
| DIFFICULTY | foundational |
| BLOOM | remember |
| MASTERY_THRESHOLD | 0.85 |
| ESTIMATED_HOURS | 2 |
| REQUIRES | math.found.logic |
| UNLOCKS | math.found.logical-connectives, math.found.truth-table |
| CROSS_LINKS | (none) |
| CPA_ENTRY | C (Concrete) |
| SESSION_TA_CAP | 7 (hours ≥ 1h) |
| PROTOCOL_A_TA_COUNT | 4 (TA-A01 through TA-A04) |
| MASTERY_GATE_TA | TA-A04 (P91, terminal) |
| PASS_CRITERION | 6/7 (⌈0.85 × 7⌉ = 6; threshold = 0.85) |
| MAMR | MC-1 OPEN-SENTENCE-AS-PROPOSITION is FOUNDATIONAL; cleared before MC-2 or MC-3 in all repair routing |
| P76_MODE | Independence (cross_links = []; self-contained real-world context) |

---

## Component 1 — Cognitive Map

### Prerequisites Activated
- **math.found.logic**: Learner understands the concepts of truth and falsity; is familiar with "TRUE/FALSE" as values; understands that mathematical statements can be evaluated.

### Target Understanding
1. A proposition is a declarative sentence that has exactly one truth value: TRUE or FALSE.
2. Two necessary tests: (1) Is it declarative (not a question, command, or exclamation)? (2) Does it have a definite truth value (not dependent on unspecified variables)?
3. Non-propositions by category: questions, commands, exclamations, open sentences (predicates with free variables), paradoxes.
4. Bivalence principle: every proposition is exactly one of {TRUE, FALSE} — never both, never neither.
5. Propositions are the atomic building blocks of propositional logic and logical connectives.

### Cross-Link Activation
- None (cross_links = []). P76 uses an independent real-world context.

---

## Component 2 — Misconception Registry

### MC-1 [FOUNDATIONAL] — OPEN-SENTENCE-AS-PROPOSITION
- **Trigger**: "'x > 3' is a proposition" OR "n is even — that's either true or false"
- **Root cause**: Open sentences look like declarative statements but have free variables — their truth value depends on the value of the variable, which is unspecified. Learner mistakes grammatical form for logical form.
- **Error pattern**: Classifying predicates/open sentences as propositions; treating "x > 3" as having a definite truth value; not recognizing that a free variable renders a statement incomplete.
- **Repair**: TA-B01.
- **MAMR**: FOUNDATIONAL — cleared in TA-A02 (via P27); if triggered at any later TA or mastery gate, route to TA-B01 before returning.

### MC-2 — OPINION-AS-PROPOSITION
- **Trigger**: "'Mathematics is the most beautiful subject' is a proposition"
- **Root cause**: Learner conflates "declarative sentence" with "proposition"; subjective or evaluative claims are declarative in grammar but lack a fact-of-the-matter truth value.
- **Error pattern**: Classifying opinions, aesthetic judgments, or culturally relative claims as propositions.
- **Repair**: TA-B02.
- **MAMR**: Address after MC-1 cleared. FIFO with MC-3.

### MC-3 — PARADOX-BIVALENCE
- **Trigger**: "'This statement is false' is a proposition — it just has an unusual truth value"
- **Root cause**: Learner extends the bivalence principle to all grammatically declarative sentences, not recognizing that self-referential paradoxes break bivalence and lie outside classical propositional logic.
- **Error pattern**: Treating the Liar paradox as a valid proposition; thinking "true and false simultaneously" is a third truth value.
- **Repair**: TA-B03.
- **MAMR**: Address after MC-1 cleared. FIFO with MC-2.

---

## Component 3 — Scaffolding Protocol

### CPA Entry: Concrete
Open with everyday declarative claims ("The door is closed," "Paris is the capital of France") before introducing mathematical examples. Learner evaluates truth values of familiar statements before formal definition.

### MAMR Enforcement
MC-1 OPEN-SENTENCE-AS-PROPOSITION addressed in TA-A02 via P27. If triggered at any later TA or at the mastery gate, route → TA-B01 → return to point of interruption. MC-2 and MC-3 are FIFO after MC-1 cleared: if both active, address TA-B02 before TA-B03.

---

## Component 4 — Protocol A (Main Teaching Sequence)

### TA-A01 — Definition: Two Tests for a Proposition
**Primitives**: P03 → P04 → P49

**P03 (ANALOGY BRIDGE):**
"A proposition is a claim that a court could rule TRUE or FALSE. It's not a question ('Is 5 prime?'), not an order ('Find x such that...'), not an exclamation ('What a beautiful proof!') — it's a declarative claim with a definite verdict. The judge either rules TRUE or rules FALSE. There is no third option."

**P04 (PATTERN INDUCTION):**
Two tests — BOTH must pass:

| Test | Question | Pass condition |
|---|---|---|
| Test 1: Declarative | Is it a declarative sentence (not a question/command/exclamation)? | YES → pass |
| Test 2: Definite truth value | Does it have a truth value that is TRUE or FALSE independent of context? | YES → pass |

Pattern — apply both tests:
- "7 is a prime number." → Declarative ✓; Truth value: TRUE ✓ → PROPOSITION
- "Is 7 prime?" → NOT declarative ✗ → NOT a proposition
- "Find x such that x² = 4." → Command, NOT declarative ✗ → NOT a proposition
- "x > 3" → Declarative ✓; Truth value: depends on x — no definite value ✗ → NOT a proposition (open sentence)
- "For all x ∈ ℝ, x² ≥ 0." → Declarative ✓; Truth value: TRUE ✓ → PROPOSITION

**P49 (ADAPTIVE CHECKPOINT):**
Prompt: "Apply the two tests to each: (a) 'The sum of angles in a triangle is 180°'; (b) 'Compute 3 + 5'; (c) '2n + 1 is odd' (n unspecified)."
- **CORRECT**: (a) Proposition: TRUE (Euclidean geometry); (b) Not a proposition: command; (c) Not a proposition: open sentence (n is a free variable — depends on n) → TA-A02.
- **PARTIAL**: Confirm correctly classified items; clarify any misclassification with the two-test table → TA-A02.
- **INCORRECT**: → Protocol B, TA-B01.
- **NO_RESPONSE**: → Protocol B, TA-B01.

---

### TA-A02 — Non-Propositions by Category
**Primitives**: P27 → P06 → P49

**P27 (MISCONCEPTION NAMING):**
Name MC-1 OPEN-SENTENCE-AS-PROPOSITION: "A common error: 'n is even' looks like a declarative sentence, so it seems like a proposition. But n is a FREE VARIABLE — its value is unspecified. The truth value depends on which n you pick: n=4 gives TRUE, n=3 gives FALSE. Without fixing n, there is no definite truth value. 'n is even' is an OPEN SENTENCE (also called a PREDICATE), not a proposition. It becomes a proposition only when n is bound: '4 is even' (TRUE) or '∀n ∈ ℕ, n is even' (FALSE)."

**P06 (CONTRAST PAIR PROMPT):**
| Statement | Category | Proposition? | Reason |
|---|---|---|---|
| "17 is prime." | Mathematical claim | ✓ YES (TRUE) | Declarative; definite truth value |
| "Is 17 prime?" | Question | ✗ NO | Not declarative |
| "Find all primes less than 20." | Command | ✗ NO | Not declarative |
| "p is prime." | Open sentence (predicate) | ✗ NO | Free variable p; truth depends on p |
| "There exists a prime greater than 100." | Existential claim | ✓ YES (TRUE) | Declarative; p is BOUND by ∃; definite truth value |
| "Infinity is large." | Vague/non-mathematical | ✗ NO | No definite mathematical truth value |
| "x² + 1 > 0" (x unspecified) | Open sentence | ✗ NO | Free variable x |
| "∀x ∈ ℝ, x² + 1 > 0" | Universal quantification | ✓ YES (TRUE) | Declarative; x bound by ∀; definite truth value |

Key: binding all free variables (via ∀, ∃, or substituting a specific value) converts an open sentence into a proposition.

**P49 (ADAPTIVE CHECKPOINT):**
Prompt: "Classify each: (a) 'n² − n is even for all n ∈ ℤ'; (b) 'n² − n is even'; (c) 'Please verify that n² − n is even.'"
- **CORRECT**: (a) Proposition: TRUE (n(n−1) is always a product of consecutive integers); (b) Open sentence: NOT a proposition (n unspecified); (c) Command: NOT a proposition → TA-A03.
- **PARTIAL**: Clarify that (a) binds n with ∀ making it a proposition; (b) leaves n free making it an open sentence → TA-A03.
- **INCORRECT**: → Protocol B, TA-B01.
- **NO_RESPONSE**: → Protocol B, TA-B01.

---

### TA-A03 — Bivalence Principle and Worked Examples
**Primitives**: P04 → P07 → P49

**P04 (PATTERN INDUCTION):**
**Bivalence principle**: Every proposition P satisfies exactly one of:
- P is TRUE
- P is FALSE

Never both simultaneously; never neither. This is the classical principle of bivalence (or law of excluded middle in its propositional form).

Pattern — determining truth values:
- "2 + 2 = 5" → Proposition → FALSE
- "Every even integer > 2 is a sum of two primes." → Proposition (Goldbach's Conjecture) → Truth value EXISTS but is UNKNOWN. It is still a proposition even if we don't know its truth value.
- "This sentence is false." → NOT a standard proposition — it is a self-referential paradox that violates bivalence (if TRUE then FALSE; if FALSE then TRUE). Classical propositional logic excludes such sentences.

**P07 (WORKED EXAMPLE PAIR):**
- **Example 1 — Unknown truth value is still a proposition**: "There are infinitely many twin primes." This is a famous unsolved problem. We do not know if it is TRUE or FALSE. But it IS a proposition because it IS definitely one or the other — we just haven't proved which. Propositions can have unknown (to us) truth values while still being classified as propositions.
- **Example 2 — Liar paradox is excluded**: "This statement is false." Assume TRUE → it is false → contradiction. Assume FALSE → it is true → contradiction. Classical propositional logic excludes this sentence from the category of propositions. Self-referential sentences that cannot consistently receive a truth value are NOT propositions in classical logic.

**P49 (ADAPTIVE CHECKPOINT):**
Prompt: "True or False: (a) A proposition must have a KNOWN truth value. (b) 'This sentence has five words' — is this a proposition? (c) Can a proposition be both TRUE and FALSE?"
- **CORRECT**: (a) FALSE — a proposition must have a DEFINITE truth value, but it need not be KNOWN to us; (b) YES, it is a proposition (count: This/sentence/has/five/words = 5 → TRUE); (c) NO — bivalence rules this out → TA-A04.
- **PARTIAL**: Clarify (a) — distinguish known vs. definite; confirm (b) by counting words → TA-A04.
- **INCORRECT**: → Protocol B, TA-B03.
- **NO_RESPONSE**: → Protocol B, TA-B02 or TA-B03 based on error type.

---

### TA-A04 — P91 Mastery Gate (Terminal)
**Primitive**: P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78

**[GR-3: Terminal TA — routing via P75/P74 only]**
**[GR-6: P91 is the terminal compound in this TA]**
**[GR-7: P76 present in this mastery gate]**

**P77 (MULTI-PROBLEM SET):**

Q1: "Classify each as a proposition or non-proposition. For each proposition, state its truth value (or note it is unknown): (a) '√2 is irrational'; (b) 'What is √2?'; (c) 'x² = 4'; (d) '∃x ∈ ℝ, x² = 4'."

Q2: "Give one example of: (a) a proposition that is FALSE; (b) an open sentence (predicate) with one free variable; (c) a proposition whose truth value is currently unknown to mathematicians."

Q3: "The statement 'n is divisible by 3' has a free variable. Write TWO propositions derived from it: one by substitution of a specific value, and one by universal quantification over ℤ."

Q4: "'This statement is false' — why is this NOT a proposition in classical logic?"

Q5: "A student writes: 'f(x) = 2x + 1 — this is TRUE.' What is wrong with this statement?"

Q6: "True or False: 'A proposition cannot have an unknown truth value.' Justify."

**P55 (SCORE):** Evaluate Q1–Q6:
- Q1: (a) Proposition: TRUE; (b) Not a proposition: question; (c) Not a proposition: open sentence (x free); (d) Proposition: TRUE
- Q2: (a) e.g., "2 + 2 = 5" (FALSE); (b) e.g., "x > 0"; (c) e.g., Riemann Hypothesis, Goldbach's Conjecture
- Q3: Substitution: "6 is divisible by 3" (TRUE) or "5 is divisible by 3" (FALSE); Quantification: "∀n ∈ ℤ, n is divisible by 3" (FALSE)
- Q4: If TRUE, then by its own claim it is FALSE — contradiction; if FALSE, then by its claim it is TRUE — contradiction. Bivalence cannot be consistently assigned → not a proposition in classical logic.
- Q5: f(x) = 2x+1 is an expression/function definition, not a proposition — it has a free variable x and is not declarative with a definite truth value
- Q6: FALSE — a proposition has a DEFINITE truth value that exists (is TRUE or FALSE), but it need not be KNOWN; Goldbach's Conjecture is an example

**P76 (TRANSFER PROBE — Independence, real-world context):**
"A software requirements document contains four statements: (1) 'Press the login button.' (2) 'The login button is enabled when valid credentials are entered.' (3) 'Will the button respond within 200ms?' (4) 'Either the system accepts the login or it rejects it.'

Classify each statement as a proposition or non-proposition. For each proposition, state its truth value — or explain why the truth value exists but cannot be determined without more information."

Expected:
- (1) NOT a proposition: command/imperative.
- (2) Proposition: TRUE or FALSE depending on system implementation — the statement has a definite truth value (it either correctly describes the system or it does not); it IS a proposition.
- (3) NOT a proposition: question.
- (4) Proposition: TRUE — it is a tautology (disjunction of a statement and its negation; always true by bivalence regardless of system behavior).

**P55 (SCORE):** Evaluate P76: correct classification of all four statements; correct truth-value reasoning for (2) and (4).

**P75 (MASTERY ASSESSMENT):**
Items: Q1, Q2, Q3, Q4, Q5, Q6, P76 = **7 items**.
Pass criterion: **6/7** (⌈0.85 × 7⌉ = 6; threshold = 0.85).
- **PASS** → P74: route to P78.
- **FAIL** → P74: identify miss pattern → repair routing.

**P74 (ROUTING DECISION):**
- PASS → P78.
- Q1(c) wrong or Q3 wrong or Q5 wrong (open sentence errors) → TA-B01 (OPEN-SENTENCE-AS-PROPOSITION).
- Q2(a)/(b) wrong or Q6 wrong → TA-B02 (OPINION-AS-PROPOSITION) if opinion-type errors, else TA-B03.
- Q4 wrong or P76(4) wrong (paradox/tautology errors) → TA-B03 (PARADOX-BIVALENCE).
- Multiple wrongs → MAMR: TA-B01 if open-sentence errors present; then FIFO TA-B02 before TA-B03; re-gate after all active MCs cleared.

**P78 (COMPLETION):**
Mastery of math.found.proposition confirmed. Record mastery event. Schedule P89. Activate unlocks: math.found.logical-connectives, math.found.truth-table.

---

## Component 5 — Protocol B (Repair Chains)

### TA-B01 — Repair MC-1 OPEN-SENTENCE-AS-PROPOSITION
**Primitives**: P41 → P06 → P64 → P49

**P41**: "What is the truth value of 'x > 5'? Is it TRUE or FALSE?"
Expected detection: learner may say TRUE or FALSE without specifying x — reveals MC-1.

**P06 (CONTRAST PAIR PROMPT):**
| Statement | Free variable? | Proposition? |
|---|---|---|
| "x > 5" | YES (x unspecified) | ✗ NO — open sentence |
| "7 > 5" | NO (specific value) | ✓ YES (TRUE) |
| "∀x ∈ ℝ, x > 5" | NO (x bound by ∀) | ✓ YES (FALSE — e.g., x=1) |
| "∃x ∈ ℝ, x > 5" | NO (x bound by ∃) | ✓ YES (TRUE — e.g., x=6) |

An open sentence becomes a proposition when: (a) all free variables are replaced by specific values, OR (b) all free variables are bound by quantifiers.

**P64 (CONCEPTUAL SHIFT):** "The key distinction: grammatical form ≠ logical form. 'x > 5' looks like a sentence but is logically incomplete — it's a FUNCTION from variable values to truth values, not a proposition. When you substitute x=7 or quantify with ∀ or ∃, you complete it into a proposition."

**P49**: Prompt: "Convert the open sentence 'n² + n is even' into (a) a FALSE proposition and (b) a TRUE proposition."
- **CORRECT**: (a) "1² + 1 is even" — 2 is even, so actually TRUE. Better: "n² + n is odd for n=2" — 4+2=6, even → FALSE. (b) "∀n ∈ ℤ, n² + n is even" — n(n+1) is product of consecutive integers → always even → TRUE → return to calling TA.
- **PARTIAL/INCORRECT/NO_RESPONSE**: Show concrete substitution (n=3: 9+3=12, even → TRUE proposition "12 is even") vs. universal (∀n ∈ ℤ: TRUE by consecutive-integer argument) → return to calling TA.

---

### TA-B02 — Repair MC-2 OPINION-AS-PROPOSITION
**Primitives**: P03 → P06 → P49

**P03**: "Mathematical propositions are claims about mathematical objects with an objective truth value determined by logic and proof, not by opinion or preference. 'Mathematics is beautiful' is a declarative sentence in English, but it does not have an objective truth value that holds regardless of who you ask — it's a subjective opinion. Classical logic deals only with statements that have an objective, mind-independent truth value."

**P06 (CONTRAST PAIR PROMPT):**
| Statement | Objective truth value? | Proposition? |
|---|---|---|
| "The sum of angles in a triangle is 180°." | YES (in Euclidean geometry) | ✓ YES (TRUE) |
| "Mathematics is the most beautiful subject." | NO (subjective preference) | ✗ NO |
| "π > 3." | YES | ✓ YES (TRUE) |
| "This proof is elegant." | NO (aesthetic judgment) | ✗ NO |
| "Every continuous function is differentiable." | YES | ✓ YES (FALSE — f(x)=|x| at x=0) |

Test: "Could a fully-specified mathematical system determine this truth value, independent of any human's opinion?" YES → proposition. NO → not a proposition.

**P49**: Prompt: "Is 'The axiom of choice is a good axiom' a proposition? Is 'The axiom of choice is equivalent to Zorn's lemma' a proposition?"
- **CORRECT**: (1) NOT a proposition — "good" is evaluative/subjective; (2) YES, proposition: TRUE — this is a proven mathematical equivalence → return to calling TA.
- **PARTIAL/INCORRECT/NO_RESPONSE**: Emphasize the objective/subjective distinction; mathematical theorems and proofs give objective truth values → return to calling TA.

---

### TA-B03 — Repair MC-3 PARADOX-BIVALENCE
**Primitives**: P27 → P06 → P49

**P27 (MISCONCEPTION NAMING)**: "MC-3 PARADOX-BIVALENCE: 'The Liar paradox (This statement is false) is a proposition — it just has a tricky truth value.' This is wrong. Classical propositional logic EXCLUDES self-referential sentences that cannot be consistently assigned a truth value. These are not propositions — they are pathological sentences outside the scope of classical logic."

**P06 (CONTRAST PAIR PROMPT):**
| Sentence | In scope of propositional logic? | Reason |
|---|---|---|
| "2 + 2 = 5" | ✓ YES (FALSE) | Definite truth value |
| "This sentence is false." | ✗ NO | Self-referential; no consistent truth value |
| "The Goldbach conjecture." | ✓ YES (truth value exists, unknown) | Definite mathematical statement |
| "This sentence is true." | ✗ NO (or trivially TRUE — but ambiguous) | Self-referential; truth-value issues |
| "No sentence is a proposition." | ✓ YES (FALSE) | Not self-referentially paradoxical; has a definite truth value |

Classical logic operates under the assumption that propositions DO have a definite truth value. Sentences that violate this assumption are simply excluded — they are not valid inputs to classical propositional logic.

**P49**: Prompt: "Why is 'This sentence has more than ten words' NOT paradoxical (unlike the Liar)? Is it a proposition?"
- **CORRECT**: It IS a proposition — count words: This/sentence/has/more/than/ten/words = 7 words → truth value: FALSE. It is not self-referential in a paradoxical way — it refers to a countable property of itself, and counting gives a definite answer → return to calling TA.
- **PARTIAL/INCORRECT/NO_RESPONSE**: Compare with the Liar: self-reference is only paradoxical when the truth value is what is being self-referenced. Counting words is not a truth-value reference → return to calling TA.

---

## Component 6 — P89 Spaced Repetition Schedule

| Interval | Review Content | Pass Criterion |
|---|---|---|
| Day 1 | Q1 (classify four statements) + Q4 (Liar paradox) | 2/2 |
| Day 3 | Q3 (convert open sentence to proposition) + P76 (software spec context) | 2/2 |
| Day 7 | Mixed 3-item mini-set: one proposition identification, one open sentence, one bivalence question | 2/3 |
| Day 21 | Q1, Q3, Q5, Q6 (4 items) | 3/4 |
| Day 60 | Full 7-item mastery gate | 6/7 |

**Decay rule**: Failure at any interval → reset to Day 1 + Protocol B routing:
- Open-sentence errors → TA-B01; opinion errors → TA-B02; paradox/bivalence errors → TA-B03.

---

## Component 7 — Cross-Blueprint Dependencies

### Input Dependencies
| Blueprint | KG ID | What it supplies |
|---|---|---|
| Logic | math.found.logic | Concepts of truth and falsity; TRUE/FALSE as values; mathematical statements |

### Output Unlocks
| Blueprint | KG ID | What this blueprint enables |
|---|---|---|
| Logical Connectives | math.found.logical-connectives | Connectives (¬, ∧, ∨, →, ↔) operate on propositions; requires proposition concept |
| Truth Tables | math.found.truth-table | Truth tables systematically enumerate truth values of compound propositions |

### Cross-Links
- None (cross_links = []). P76 uses an independent real-world context (software requirements specification).

---

## Component 8 — Teaching Notes

1. **Concrete opening is essential**: Start with everyday declarative sentences ("The coffee is hot," "Paris is in France") before mathematical examples. This grounds the abstraction before introducing predicates and open sentences.
2. **Open sentence vs. predicate**: "Open sentence" and "predicate" are synonymous in this context. Use "open sentence" for learners who haven't seen predicate logic; introduce "predicate" as a synonym once the concept is secure.
3. **Unknown truth values**: Many learners conflate "unknown" with "undefined." Explicitly distinguish: a proposition can have a truth value we don't know (Goldbach's conjecture) vs. a sentence with NO consistent truth value (Liar paradox). TA-A03 addresses this.
4. **Self-referential sentences**: The Liar paradox is introduced only in TA-A03 and TA-B03 to address MC-3. Do not introduce it in TA-A01 or TA-A02 — it distracts from the core definition before it is solidified.
5. **Transition to logical connectives**: The purpose of defining propositions precisely is to enable the next blueprint (math.found.logical-connectives), where propositions are combined with ¬, ∧, ∨, →, ↔. Mention this forward link in TA-A04 P78 completion.

---

## Component 10 — Validation Checklist

| Check | Criterion | Status |
|---|---|---|
| V-1 | Blueprint ID matches KG node ID exactly | ✓ math.found.proposition |
| V-2 | KG node ID exists in docs/mathematics/kg/graph.json v1.0.1 | ✓ Verified |
| V-3 | All Component 0 fields populated | ✓ |
| V-4 | DIFFICULTY matches KG (foundational) | ✓ |
| V-5 | BLOOM matches KG (remember) | ✓ |
| V-6 | MASTERY_THRESHOLD matches KG (0.85) | ✓ |
| V-7 | ESTIMATED_HOURS matches KG (2) | ✓ |
| V-8 | All REQUIRES listed; prerequisite blueprints exist | ✓ math.found.logic ✓ |
| V-9 | CPA_ENTRY correct (foundational → C) | ✓ C |
| V-10 | SESSION_TA_CAP correct (hours=2 ≥ 1h → max 7; used 4) | ✓ 4 ≤ 7 |
| V-11 | GR-1: non-repair Protocol A TAs open with B-category primitive | ✓ A01:P03, A02:P27, A03:P04 |
| V-12 | GR-2: every non-gate TA has exactly one P49 | ✓ TA-A01 through TA-A03 each have P49; TA-A04 uses P91 |
| V-13 | GR-3: mastery gate TA is terminal | ✓ TA-A04 uses P91; P75/P74 govern routing |
| V-14 | GR-4: P41/P64 gates repair chain | ✓ TA-B01 uses P41 to detect MC-1; P64 shifts concept; P49 routes |
| V-15 | GR-6: P91 compound is terminal in TA-A04 | ✓ P91 = P77→P55→P76→P55→P75→P55→P74→P55→P78 |
| V-16 | GR-7: P76 present in mastery gate | ✓ P76 independence probe in TA-A04 |
| V-17 | GR-8: cross_links documented in Component 7 | ✓ cross_links = [] documented explicitly |
| V-18 | GR-9: P76 mode correct (cross_links=[] → independence, self-contained real-world context) | ✓ P76 uses software requirements document — independent context, no KG concept references |
| V-19 | GR-10: MAMR stated and enforced | ✓ MC-1 FOUNDATIONAL; stated Component 0 and Component 3; TA-A04 P74 routing |
| V-20 | Protocol B TAs open with B-category primitive | ✓ B01:P41, B02:P03, B03:P27 |
| AIR | AI Removal Test: executes with human tutor; all content fully specified | ✓ All examples, classifications, prompts, and responses are explicit |

**PACKAGE_READY**: V-1 through V-20 PASS. AIR PASS.
