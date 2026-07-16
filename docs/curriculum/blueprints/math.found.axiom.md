# Teaching Blueprint: Axiom

## Component 0 — Metadata Header

| Field | Value |
|---|---|
| BLUEPRINT_ID | math.found.axiom |
| KG_ID | math.found.axiom |
| KG_VERSION | v1.0.1 |
| STATUS | PACKAGE_READY |
| DOMAIN | Foundations |
| NAME | Axiom |
| ALIASES | postulate, axiom schema |
| DIFFICULTY | developing |
| BLOOM | understand |
| MASTERY_THRESHOLD | 0.80 |
| ESTIMATED_HOURS | 3 |
| REQUIRES | math.found.logic |
| UNLOCKS | math.found.theorem, math.found.axiomatic-system |
| CROSS_LINKS | (none) |
| CPA_ENTRY | C (Concrete) |
| SESSION_TA_CAP | 7 (hours ≥ 1h) |
| PROTOCOL_A_TA_COUNT | 5 (TA-A01 through TA-A05) |
| MASTERY_GATE_TA | TA-A05 (P91, terminal) |
| PASS_CRITERION | 4/5 (⌈0.80 × 5⌉ = 4; threshold = 0.80) |
| MAMR | MC-1 AXIOM-AS-OBVIOUS is FOUNDATIONAL; cleared before MC-2 or MC-3 in all repair routing |
| P76_MODE | Independence (cross_links = []; self-contained real-world context) |

---

## Component 1 — Cognitive Map

### Prerequisites Activated
- **math.found.logic**: supplies truth values (TRUE/FALSE), logical statements, and the notion of proof. An axiom is a logical statement whose truth value is stipulated TRUE by assumption, not demonstrated by proof.

### Target Understanding
1. An axiom (or postulate) is a statement adopted as a foundational assumption of a mathematical theory, accepted without proof as the starting point from which theorems are derived.
2. Axioms are unprovable within the system they define — every proof chain must stop somewhere; axioms ARE the stops.
3. Axioms are not chosen because they are "obvious" — they are chosen because they yield a useful, internally consistent theory. Obviousness is incidental, not a requirement.
4. Different axiom sets yield different but equally valid mathematical systems (e.g., Euclidean vs. non-Euclidean geometry).
5. Key vocabulary: axiom vs. theorem (proved from axioms); axiom vs. definition (definitions introduce terms; axioms make truth claims); axiom vs. conjecture (conjectures are unproven hypotheses, not foundational choices).

### Cross-Link Activation
- No cross-links. P76 uses an independence probe (self-contained real-world game context).

---

## Component 2 — Misconception Registry

### MC-1 [FOUNDATIONAL] — AXIOM-AS-OBVIOUS
- **Trigger**: "A good axiom must be obviously true — something no reasonable person can doubt."
- **Root cause**: School geometry presents Euclid's first four postulates as "self-evident truths," training learners to expect axioms to be intuitively clear.
- **Error pattern**: Learner rejects the 5th postulate (parallel postulate) as "not really an axiom" because it is complex; or claims that if an axiom is not obvious, it should be provable.
- **Repair**: TA-B01.
- **MAMR**: FOUNDATIONAL — addressed in TA-A02 via P41/P64; if triggered later, route to TA-B01 before returning.

### MC-2 — AXIOM-AS-PROVABLE
- **Trigger**: "We should be able to prove axioms from even more fundamental truths."
- **Root cause**: Learner treats axioms as informal intuitions that "should" have deeper justifications; conflates regressing to more basic axioms with proving an axiom.
- **Error pattern**: Claims the parallel postulate can be derived from Euclid's other four; believes all mathematical statements are in principle provable.
- **Repair**: TA-B02.
- **MAMR**: After MC-1 cleared. FIFO with MC-3.

### MC-3 — AXIOM-AS-THEOREM
- **Trigger**: "Axioms are just theorems we haven't proved yet" or "axioms and theorems are basically the same thing."
- **Root cause**: Surface similarity — both axioms and theorems are true mathematical statements.
- **Error pattern**: Learner reverses the direction of logical dependence; treats the absence of a proof as a temporary gap rather than a structural choice.
- **Repair**: TA-B03.
- **MAMR**: After MC-1 cleared. FIFO with MC-2.

---

## Component 3 — Scaffolding Protocol

### CPA Entry: Concrete
Open with a game-rule analogy (Concrete) — the rules of a game as axioms of the game system. Learner can physically imagine accepting rules to play. Move to Pictorial (classification table) in TA-A03 and TA-A04, then to Abstract (formal axiom schemas) by TA-A04.

### MAMR Enforcement
MC-1 addressed in TA-A02 (P41/P64). If triggered in later TAs, route → TA-B01 → return. MC-2 and MC-3 FIFO after MC-1 cleared.

---

## Component 4 — Protocol A (Main Teaching Sequence)

### TA-A01 — Axioms as Foundational Rules: Game Analogy
**Primitives**: P03 → P49

**P03 (ANALOGY BRIDGE):**
- **Source domain**: Rules of a board game (e.g., chess, Go). The rule "a knight moves in an L-shape" is a foundational rule of chess — it is not derived from more basic chess principles; it IS a starting rule that you accept to play.
- **Target domain**: Mathematical axioms. "0 is a natural number" (Peano P1) is not proved from anything more basic within Peano arithmetic — it is stipulated as the starting point.
- **Bridge**: Just as chess players never ask "why does the knight move in an L?" (they accept it and deduce consequences), mathematicians accept axioms and derive theorems. A different chess variant can change the rule, yielding a different but internally coherent game — just as changing axioms yields a different but internally coherent mathematics.
- **Concrete illustration**:
  - Chess axiom: "A pawn that reaches the opponent's back rank may be promoted." Accepted without proof. Consequences (theorems): endgame promotion strategies, Queening races, etc.
  - Mathematical parallel: Peano Axiom P2: "Every natural number n has a unique successor S(n) ∈ ℕ." Accepted without proof. Consequence (theorem): ℕ is infinite.

**P49:** "In your own words: what makes an axiom different from a rule you could prove from other rules in the same system?"
- **CORRECT**: An axiom is a foundational starting rule accepted without proof within the system; a provable rule would be a theorem. → TA-A02.
- **PARTIAL**: "The key: axioms are starting points — you CANNOT prove them from other statements in the same theory. Provable rules are theorems." → TA-A02.
- **INCORRECT**: Revisit analogy. "In chess, is the rule 'the king moves one square' derived from the rule 'the queen moves any number of squares'? No — both are independent foundational rules. That's what axioms are: independent starting points." → TA-A02.
- **NO_RESPONSE**: Provide definition directly and confirm understanding. → TA-A02.

---

### TA-A02 — Misconception Gate: AXIOM-AS-OBVIOUS (FOUNDATIONAL)
**Primitives**: P41 → P64 → P49

**P41 (MISCONCEPTION DETECTOR):**
Probe statement: "A genuine mathematical axiom must be so obviously true that no reasonable person could doubt it."
- If learner **agrees**: proceed to P64.
- If learner **disagrees** (correctly): briefly validate the correct intuition, state what makes an axiom an axiom (design choice, not self-evidence), then proceed to P64 for the historical confirmation.

**P64 (CONCEPTUAL SHIFT):**
"For 2,000 years, mathematicians tried to prove Euclid's 5th postulate (parallel postulate: 'Through a point not on a given line, exactly one line is parallel to that line') from his first four. It seemed 'less obvious.' In the 19th century, Bolyai, Lobachevsky, and Riemann independently negated it — and obtained fully coherent geometries (hyperbolic and elliptic) where triangles' angle sums are less than or greater than 180°.

This experiment proved the 5th postulate IS a genuine axiom: you can negate it and still get consistent mathematics. If it were secretly a theorem, negating it would produce a contradiction — it doesn't. Axioms are DESIGN CHOICES about which mathematical world to work in, not requirements about obvious truth."

Table of axioms that are NOT obvious:
| Axiom | Why non-obvious |
|---|---|
| Parallel postulate (Euclid 5) | Negation yields valid non-Euclidean geometry |
| Axiom of Choice (ZFC) | Implies well-ordering of ℝ and Banach-Tarski paradox |
| Law of Excluded Middle (classical logic) | Rejected by intuitionistic mathematics |
| Axiom of Infinity (ZFC) | Asserts an infinite set exists — not self-evident |

**P49:** "Give one example of an axiom that is NOT obviously true."
- **CORRECT**: Any from the table or equivalent (parallel postulate, axiom of choice, etc.) → TA-A03.
- **PARTIAL**: Prompt with "Consider Euclid's 5th postulate — is it obvious that through any point, there is exactly ONE parallel line?" → TA-A03.
- **INCORRECT/NO_RESPONSE**: → TA-B01, then return.

---

### TA-A03 — Representation Shift: Four Faces of an Axiom
**Primitives**: P11 → P49

**P11 (REPRESENTATION SHIFT):**
Take the ZFC Axiom of Extensionality across four representations:

1. **Verbal (informal)**: "Two sets are equal if and only if they have exactly the same members."
2. **Formal (logical)**: ∀A ∀B [ A = B ↔ ∀x (x ∈ A ↔ x ∈ B) ]
3. **Historical**: Zermelo (1908) included this axiom because informal set theory (Cantor's) produced paradoxes. The axiom stipulates precisely what "equal" means for sets — it is a design decision, not a derivation.
4. **Structural role**: This axiom is an assumed starting point in ZFC. Every theorem about set equality is derived from it — but it itself is not proved from anything within ZFC.

Classification table for four statement types:
| Statement | Classification | Reason |
|---|---|---|
| "0 ∈ ℕ" (Peano P1) | Axiom | Accepted without proof in Peano arithmetic |
| "The sum of angles in a Euclidean triangle = 180°" | Theorem | Derived from Euclid's five postulates |
| "A prime is a natural number > 1 with no divisors except 1 and itself" | Definition | Introduces terminology; makes no truth claim |
| "Every even number ≥ 4 is the sum of two primes" (Goldbach) | Conjecture | Unproven hypothesis; not a foundational choice |

**P49:** "A student claims: 'The 180° angle-sum of a triangle is an axiom because it's so fundamental to geometry.' Is this correct?"
- **CORRECT**: "No — the 180° fact is a theorem proved from Euclid's five postulates (particularly the parallel postulate). 'Fundamental' ≠ 'axiom.' An axiom is unprovable within its system; this fact IS proved." → TA-A04.
- **PARTIAL**: Hint: "Can you derive the 180° fact from Euclid's postulates? If yes, it's a theorem." → TA-A04.
- **INCORRECT**: "The angle-sum of 180° follows from the parallel postulate by a geometric proof — that makes it a theorem, not an axiom. Axioms have NO proof within the system they define." → TA-A04.
- **NO_RESPONSE**: Provide explanation. → TA-A04.

---

### TA-A04 — Contrast Pair: Axiom vs. Theorem vs. Definition vs. Conjecture
**Primitives**: P06 → P07 → P49

**P06 (CONTRAST PAIR PROMPT):**

Contrast A — Axiom vs. Theorem:
| | Axiom | Theorem |
|---|---|---|
| Proof required? | No — stipulated as true | Yes — derived from axioms |
| Can be negated? | Yes — yields a different theory | No — negation yields contradiction within the theory |
| Example | "Every natural number has a successor" (Peano P2) | "There are infinitely many prime numbers" (Euclid) |

Contrast B — Axiom vs. Definition:
| | Axiom | Definition |
|---|---|---|
| Content | Truth claim about mathematical objects | Introduces a name or notation |
| Example (axiom) | "For all n ∈ ℕ, S(n) ≠ 0" (Peano P3) | — |
| Example (definition) | — | "n is even iff ∃k ∈ ℕ, n = 2k" |

**P07 (WORKED EXAMPLE PAIR):**
- **Example 1 (identify as axiom)**: "For all a, b ∈ ℝ, a + b = b + a." This is the commutative law of addition — a field axiom. It is stipulated as a property that defines what it means for ℝ to be a field. It is NOT proved from more basic real-number properties within standard field theory.
- **Example 2 (identify as definition)**: "A function f: A → B is injective if f(a₁) = f(a₂) implies a₁ = a₂." This introduces the word 'injective' — it makes no truth claim; it defines terminology.
- **Counter-example (theorem, misidentified as axiom)**: "There are infinitely many prime numbers." Although fundamental, this is a theorem (proved by Euclid using the axioms of arithmetic). 'Fundamental' is not a criterion for being an axiom.

**P49:** "Which is an axiom? (A) 'A set S is finite if there is a bijection from S to {1,…,n} for some n ∈ ℕ.' (B) 'For all a, b ∈ ℝ, a × b = b × a.'"
- **CORRECT**: B is an axiom (multiplicative commutativity, a field axiom); A is a definition (introduces the word 'finite'). → TA-A05.
- **PARTIAL**: "A introduces the term 'finite' — definitions introduce terms. B makes a truth claim accepted without proof in the real number field — that's an axiom." → TA-A05.
- **INCORRECT/NO_RESPONSE**: Explain A vs. B in detail. → TA-A05.

---

### TA-A05 — P91 Mastery Gate (Terminal)
**Primitive**: P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78

**[GR-3: Terminal TA]** **[GR-6: P91 terminal in this TA]** **[GR-7: P76 present]**

**P77 (MULTI-PROBLEM SET):**

Q1: Classify the following statement: "0 is a natural number." Is it an axiom, theorem, definition, or conjecture in Peano arithmetic?
Q2: Classify: "In Euclidean geometry, a straight line segment can be drawn between any two points." (A) Theorem (B) Axiom (C) Definition (D) Conjecture
Q3: The Riemann Hypothesis states: "All non-trivial zeros of the Riemann zeta function have real part 1/2." Classify it: axiom, theorem, definition, or conjecture?
Q4: True or False: "In Euclidean geometry, the theorem that interior angles of a triangle sum to 180° is a theorem, not an axiom, because it can be proved from Euclid's five postulates." Explain.

**P55 (SCORE):**
Q1: Axiom (Peano P1 — accepted without proof in the Peano system).
Q2: B — Axiom (Euclid's first postulate).
Q3: Conjecture — it is unproven and is not a foundational starting point of any currently adopted axiom system.
Q4: TRUE — the 180° fact is derived by proof from the parallel postulate (axiom). It is fundamental but not foundational; it is a destination, not a starting point.

**P76 (TRANSFER PROBE — Independence: cross_links = []):**

**Context**: A game designer creates a strategy board game and writes these five rules:
- Rule G1: "Each player starts with 1 king and 8 soldiers."
- Rule G2: "A soldier moves exactly 1 square forward per turn."
- Rule G3: "A king can move to any adjacent square."
- Rule G4: "A player wins by capturing the opponent's king."
- Rule G5: "A soldier that reaches the opponent's back row becomes a second king."

A player argues: "Rule G5 must follow logically from Rules G1–G4, because it makes sense that soldiers become kings when they reach the back row."

**(a)** Is this argument valid? Can Rule G5 be logically derived from Rules G1–G4?
**(b)** What is Rule G5's formal role in this game's rule system?

**Expected answer**:
(a) No — Rules G1–G4 say nothing about transforming pieces or creating additional kings. No deduction from G1–G4 produces G5. The argument is invalid.
(b) Rule G5 is an axiom of the game: a foundational rule accepted without derivation. It is a design choice that defines how this specific game works. A different game could omit or replace it without contradiction — that independence confirms it is not a theorem derivable from the other rules.

**P55 (SCORE):** (a): invalid derivation correctly identified. (b): Rule G5 correctly classified as axiom / foundational rule.

**P75 (MASTERY ASSESSMENT):** Items: Q1, Q2, Q3, Q4, P76 = **5 items**.
Pass criterion: **4/5** (⌈0.80 × 5⌉ = 4; threshold = 0.80).
- **PASS (≥ 4/5)** → P78.
- **FAIL (< 4/5)** → P74 repair routing.

**P74 (ROUTING DECISION):**
- PASS → P78.
- Q1 wrong or Q2 wrong → TA-B03 (AXIOM-AS-THEOREM); apply MAMR.
- Q3 wrong → TA-B02 (AXIOM-AS-PROVABLE — confusing conjecture with axiom implies confusion about what "foundational" means).
- Q4 wrong → TA-B03 (conflating theorem with axiom by importance).
- P76 wrong → TA-B01 (AXIOM-AS-OBVIOUS — if learner accepts the invalid derivation, the OBVIOUS misconception is still active).
- Multiple wrongs → MAMR: TA-B01 first; then FIFO TA-B02, TA-B03; re-gate.

**P78 (COMPLETION):** Mastery confirmed. Schedule P89. Activate: math.found.theorem, math.found.axiomatic-system.

---

## Component 5 — Protocol B (Repair Chains)

### TA-B01 — Repair MC-1 AXIOM-AS-OBVIOUS
**Primitives**: P41 → P06 → P64 → P49

**P41**: "Do you believe that the parallel postulate — 'through a point not on a line, exactly one line is parallel to that line' — is obviously true? What about the Axiom of Choice?"

**P06 (CONTRAST PAIR PROMPT):**
| Axiom | Obvious? | Effect of negation |
|---|---|---|
| Peano P1: "0 ∈ ℕ" | Seems obvious | Negation: no natural numbers system |
| Parallel postulate (Euclid 5) | NOT obvious — contested for 2,000 years | Negation: hyperbolic geometry (coherent!) |
| Axiom of Choice | NOT obvious — implies Banach-Tarski | Negation: some analysis results fail |

**P64**: "Obviousness is not a criterion for being an axiom. An axiom is a STARTING CHOICE for a mathematical theory. The test is not 'is this self-evident?' but 'if I negate this, do I still get a consistent theory?' For Euclid 5, the answer is YES — non-Euclidean geometry is consistent. Axioms are negotiable design decisions, not universal truths."

**P49**: "Name one axiom that was controversial or non-obvious when introduced."
- **CORRECT**: Parallel postulate, Axiom of Choice, Law of Excluded Middle, Axiom of Infinity → return.
- **PARTIAL/INCORRECT/NO_RESPONSE**: Provide: "The parallel postulate was debated for 2,000 years — that's the clearest case." → return.

---

### TA-B02 — Repair MC-2 AXIOM-AS-PROVABLE
**Primitives**: P06 → P27 → P49

**P27**: "MC-2 AXIOM-AS-PROVABLE: the idea that axioms could in principle be proved from deeper truths. This is confused for two reasons: (1) every proof requires starting assumptions — prove those assumptions, and you need further assumptions — the regress never ends; (2) Gödel's Incompleteness Theorem (1931) showed that any sufficiently powerful, consistent formal system contains true statements that CANNOT be proved within that system. Even in principle, not everything is provable."

**P06 (CONTRAST):**
| | Axiom | Theorem |
|---|---|---|
| Proved within system? | No — and this is not a gap to fill | Yes — always |
| What would happen if we tried to prove it? | We'd need more axioms (regress) | We use the axioms we have |
| Gödel's lesson | Some statements are genuinely unprovable | Every theorem has a proof |

**P49**: "If a mathematician claims 'I proved Peano Axiom P1 (0 ∈ ℕ) from even more basic number theory,' what must be true about that 'more basic' number theory?"
- **CORRECT**: That more basic theory has its own axioms — P1 became a theorem there, but new unprovable axioms were introduced. The regress doesn't end. → return.
- **PARTIAL/INCORRECT/NO_RESPONSE**: "Proving P1 somewhere else just moves the axiom burden to a new foundation. All mathematics rests on some unprovable axioms." → return.

---

### TA-B03 — Repair MC-3 AXIOM-AS-THEOREM
**Primitives**: P27 → P06 → P49

**P27**: "MC-3 AXIOM-AS-THEOREM: 'Axioms are theorems we haven't proved yet.' This reverses the direction of logic. Theorems flow FROM axioms; axioms do NOT flow from theorems. An axiom is a starting point; a theorem is a destination. Saying 'axioms are unproved theorems' is like saying 'the floor of a building is just an unfinished basement' — it confuses the structural role."

**P06 (CONTRAST):**
| | Axiom | Theorem |
|---|---|---|
| Status in the system | Assumed TRUE (by stipulation) | Proved TRUE (by derivation) |
| Direction | Axiom → theorem | Theorem requires axioms |
| Can be negated without contradiction? | YES (yields a different theory) | NO (negation contradicts the axioms) |
| Example | "For all a, b ∈ ℝ: a + b = b + a" | "The square root of 2 is irrational" |

**P49**: "The Pythagorean theorem (a² + b² = c² in right triangles) is extremely fundamental. Does that make it an axiom?"
- **CORRECT**: No — it is a THEOREM, proved from Euclid's axioms. Fundamentality does not equal axiom status; theorems can be extremely important. → return.
- **PARTIAL/INCORRECT/NO_RESPONSE**: "The Pythagorean theorem has a proof (over 370 known proofs!). An axiom has no proof within its system. Proof = theorem, no proof = axiom." → return.

---

## Component 6 — P89 Spaced Repetition Schedule

| Interval | Review Content | Pass Criterion |
|---|---|---|
| Day 1 | Q2 (Euclid postulate classification) + P76 probe (a) | 2/2 |
| Day 3 | Q1 (Peano P1) + Q4 (180° theorem) | 2/2 |
| Day 7 | Mixed 3-item: classify one axiom, one theorem, one conjecture | 2/3 |
| Day 21 | Q1, Q2, Q3, Q4 (4 items) | 3/4 |
| Day 60 | Full 5-item mastery gate | 4/5 |

**Decay**: Failure → reset to Day 1 + TA-B routing by error type.

---

## Component 7 — Cross-Blueprint Dependencies

### Input Dependencies
| Blueprint | KG ID | What it supplies |
|---|---|---|
| Logic | math.found.logic | Logical statements with truth values; the framework within which axioms are TRUE by stipulation |

### Output Unlocks
| Blueprint | KG ID | What this blueprint enables |
|---|---|---|
| Theorem | math.found.theorem | Theorems are derived from axioms; cannot be taught without the axiom/theorem distinction |
| Axiomatic System | math.found.axiomatic-system | A formal system built on a chosen axiom set; requires understanding of what an axiom is |

### Cross-Links
- None. Concept is self-contained at this stage. P76 uses an independent real-world context (game rules as axioms).

---

## Component 8 — Teaching Notes

1. **Axiom ≠ obvious truth**: The single most important correction to make. Always pair the definition with the non-Euclidean geometry example — it is the most persuasive counter-evidence available.
2. **Regress argument**: When learners ask "why can't we prove axioms?", the regress argument (you'd need more axioms to prove them, ad infinitum) is more accessible than Gödel. Use regress first, mention Gödel as advanced context.
3. **Classification practice is essential**: Learners solidify the axiom/theorem/definition/conjecture distinction only through repeated classification exercises, not through definition-reading.
4. **Game metaphor is concrete but limited**: The game analogy captures "accepted without proof, yields a consistent game." It does not capture "independence" (that negation yields another valid theory). Add the non-Euclidean geometry example for that.
5. **Bloom level**: UNDERSTAND — learners must be able to classify, compare, and explain, not merely recite the definition.

---

## Component 10 — Validation Checklist

| Check | Criterion | Status |
|---|---|---|
| V-1 | Blueprint ID matches KG node ID | ✓ math.found.axiom |
| V-2 | KG node ID exists in graph.json v1.0.1 | ✓ Verified |
| V-3 | All Component 0 fields populated | ✓ |
| V-4 | DIFFICULTY matches KG (developing) | ✓ |
| V-5 | BLOOM matches KG (understand) | ✓ |
| V-6 | MASTERY_THRESHOLD matches KG (0.80) | ✓ |
| V-7 | ESTIMATED_HOURS matches KG (3) | ✓ |
| V-8 | REQUIRES listed; blueprint exists | ✓ math.found.logic ✓ |
| V-9 | CPA_ENTRY correct (developing → C) | ✓ C |
| V-10 | SESSION_TA_CAP correct (hours=3 ≥ 1h → max 7; used 5) | ✓ 5 ≤ 7 |
| V-11 | GR-1: non-repair TAs open with B-category primitive | ✓ A01:P03, A02:P41, A03:P11, A04:P06 |
| V-12 | GR-2: every non-gate TA has P49 | ✓ TA-A01 through TA-A04 |
| V-13 | GR-3: mastery gate TA is terminal | ✓ TA-A05 uses P91 |
| V-14 | GR-4: P41/P64 gates repair chain in TA-A02 | ✓ P41 detects MC-1 AXIOM-AS-OBVIOUS; P64 provides non-Euclidean shift |
| V-15 | GR-6: P91 terminal in TA-A05 | ✓ |
| V-16 | GR-7: P76 in mastery gate | ✓ P76 independence probe (game rules) |
| V-17 | GR-8: cross_links documented | ✓ (none) — stated explicitly in Component 0 and Component 7 |
| V-18 | GR-9: P76 mode correct (cross_links=[] → independence probe) | ✓ P76 uses self-contained game context, no KG cross-link |
| V-19 | GR-10: MAMR stated and enforced | ✓ MC-1 FOUNDATIONAL; Component 0 and 2; P74 routing |
| V-20 | Protocol B TAs open with B-category primitive | ✓ B01:P41, B02:P06, B03:P27 |
| AIR | All content fully specified; human tutor can execute without AI | ✓ |

**PACKAGE_READY**: V-1 through V-20 PASS. AIR PASS.
