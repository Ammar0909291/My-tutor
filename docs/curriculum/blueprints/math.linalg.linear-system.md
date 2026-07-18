<!-- BLUEPRINT: math.linalg.linear-system -->
<!-- STATUS: PACKAGE_READY -->
<!-- SPEC VERSION: 1.0 -->

# Teaching Blueprint: System of Linear Equations (Ax=b)
**Concept ID:** `math.linalg.linear-system`
**KG Fields:** difficulty=proficient | bloom=apply | estimated_hours=5 | mastery_threshold=0.9

---

## Component 0 — Metadata

| Field | Value |
|-------|-------|
| concept_id | math.linalg.linear-system |
| name | System of Linear Equations |
| difficulty | proficient |
| bloom | apply |
| estimated_hours | 5 |
| mastery_threshold | 0.9 |
| CPA_entry_stage | C (Concrete) |
| requires (Tier-1) | math.linalg.matrix, math.alg.system-linear-equations |
| cross_links | math.alg.system-linear-equations |
| P76_mode | cross-link probe |
| MAMR | 5/5 (⌈0.9 × 5⌉) |

---

## Component 1 — Cognitive Map

### Prior Knowledge Anchors
- **math.linalg.matrix**: a rectangular array of numbers; an m×n matrix encodes a linear map ℝⁿ→ℝᵐ; matrix-vector multiplication as the operation this concept packages equations into
- **math.alg.system-linear-equations**: a collection of linear equations in the same variables, solved by substitution/elimination; three possible outcomes (unique solution, no solution, infinitely many) — this concept restates that same content in matrix form, Ax=b, and connects the outcome to the RANK of A and [A|b]

### Target Knowledge State
Student can translate a system of linear equations into matrix form Ax=b; correctly classify a system's outcome (unique solution, no solution, or infinitely many solutions) by comparing rank(A) to rank([A|b]) and to the number of unknowns n; correctly identify an INCONSISTENT system from a row-reduced augmented matrix (a row like [0 0 0 | c] with c≠0); correctly identify a system with infinitely many solutions (a free variable, rank(A)<n with the system otherwise consistent) and distinguish this from a unique solution (rank(A)=rank([A|b])=n); and avoid conflating "the number of equations" with "the number of independent constraints," recognizing that redundant or contradictory equations change the effective rank without changing the equation count.

### Conceptual Obstacles
1. Assuming the number of equations always determines the outcome (e.g. "3 equations, 3 unknowns, so there must be a unique solution") — the actual determining factor is RANK, and equations can be redundant (dependent on others, not adding a genuine new constraint) or contradictory, so equation count alone never settles the outcome
2. Misreading a row [0 0 0 | c] with c≠0 in a row-reduced augmented matrix as "the system has infinitely many solutions" (confusing an all-zero row with an all-zero-except-the-constant row) — the former (all zeros, including the constant, i.e. [0 0 0 | 0]) signals a free variable/redundancy; the latter ([0 0 0 | c], c≠0) signals a flat-out contradiction (0=c), meaning NO solution exists
3. Confusing "rank(A) < n" (fewer independent equations than unknowns) with "no solution" — a system can be consistent (rank(A)=rank([A|b])) with rank(A)<n, which gives infinitely many solutions (free variables), not zero solutions; "too few equations" alone never means "no solution," only "possibly more than one solution if consistent"

---

## Component 2 — Misconception Registry

| ID | Label | Description | Trigger |
|----|-------|-------------|---------|
| MC-1 | EQUATION-COUNT-DETERMINES-OUTCOME | Student assumes "n equations, n unknowns" guarantees a unique solution, ignoring the possibility of redundant or contradictory equations that change the effective rank | Any square system (same number of equations as unknowns) that is secretly dependent or inconsistent |
| MC-2 | ZERO-ROW-ALWAYS-MEANS-INFINITE-SOLUTIONS | Student sees any all-zero-looking row in row-reduced form and concludes "infinitely many solutions," without checking whether the augmented column entry in that row is also zero | Any row-reduced augmented matrix with a row [0 0 ... 0 | c]; especially when c≠0 (a contradiction, not free variables) |
| MC-3 | RANK-LESS-THAN-N-MEANS-NO-SOLUTION | Student assumes rank(A)<n (fewer independent equations than unknowns) automatically means the system is inconsistent (no solution), rather than recognizing this signals infinitely many solutions WHEN the system is otherwise consistent | Underdetermined systems (fewer independent equations than unknowns) that are, in fact, consistent |

**Foundational Misconception:** MC-2 (ZERO-ROW-ALWAYS-MEANS-INFINITE-SOLUTIONS) — it is the single most common row-reduction reading error, because a zero ROW of coefficients looks superficially identical whether or not the augmented entry is also zero, yet the two cases have OPPOSITE consequences (infinitely many solutions vs. no solution at all); a student who doesn't check the augmented column on every all-coefficient-zero row will misclassify systems in both A02 and the mastery gate.

---

## Component 3 — Scaffolding Protocol

**Entry point:** C (Concrete) — proficient learner row-reduces three small concrete systems (one of each outcome type) before the general rank-based classification rule is stated.

**Scaffolding sequence:**
1. **A01 P11 REPRESENTATION SHIFT** — C: three 3×3-ish systems row-reduced to their three different outcomes; P: an augmented-matrix "reading guide" showing exactly what each terminal row pattern means; A: the formal rank(A) vs rank([A|b]) vs n classification theorem
2. **A02 P06 CONTRAST PAIR** — a square system that looks unique but is secretly dependent (MC-1); [0 0 0|0] vs [0 0 0|c] read side by side (MC-2); an underdetermined-but-consistent system correctly classified as infinite, not "no solution" (MC-3)
3. **A03 P91 Gate** — mastery assessment

---

## Component 4 — Protocol A (Main Teaching Sequence)

### Teaching Action A01 — Three Systems, Three Outcomes, One Reading Rule

**Primitive:** P11 REPRESENTATION SHIFT
**Purpose:** Row-reduce one example of each outcome type concretely before generalizing; state the formal rank-based classification

---

**[P11 — REPRESENTATION SHIFT]**

**Stage C — Concrete (three systems, each row-reduced to its augmented form):**

**System 1 (unique solution):** $\begin{cases}x+y=3\\x-y=1\end{cases} \to \begin{bmatrix}1&1&|&3\\0&-2&|&-2\end{bmatrix} \to \begin{bmatrix}1&0&|&2\\0&1&|&1\end{bmatrix}$. Reads off directly: $x=2, y=1$ — **unique solution**.

**System 2 (no solution):** $\begin{cases}x+y=3\\2x+2y=10\end{cases} \to \begin{bmatrix}1&1&|&3\\2&2&|&10\end{bmatrix} \to \begin{bmatrix}1&1&|&3\\0&0&|&4\end{bmatrix}$ (second row minus 2×first). The bottom row reads $0x+0y=4$, i.e. $0=4$ — impossible. **No solution** (inconsistent).

**System 3 (infinitely many solutions):** $\begin{cases}x+y=3\\2x+2y=6\end{cases} \to \begin{bmatrix}1&1&|&3\\2&2&|&6\end{bmatrix} \to \begin{bmatrix}1&1&|&3\\0&0&|&0\end{bmatrix}$. The bottom row reads $0=0$ — always true, no information. Only one genuine constraint remains ($x+y=3$) for two unknowns: $y$ is FREE, $x=3-y$. **Infinitely many solutions** (a one-parameter family).

**Stage P — Pictorial (the reading guide for a terminal row [0 0 ⋯ 0 | c]):**

```
   Row reads:  0  0  ⋯  0  |  c

   If c = 0:   "0 = 0"          → no new information, a FREE variable →
                                   contributes to INFINITELY MANY solutions
                                   (provided no OTHER row contradicts)

   If c ≠ 0:   "0 = c" (false)  → CONTRADICTION →
                                   the WHOLE system has NO SOLUTION,
                                   regardless of what any other row says
```

One single row of the wrong type ([0⋯0|c≠0]) overrides everything else: even if every other equation is perfectly consistent, ONE contradictory row makes the entire system unsolvable.

**Stage A — Abstract (the rank-based classification theorem):**

For $Ax=b$ with $A$ an $m\times n$ matrix, let $r=\text{rank}(A)$ and $r'=\text{rank}([A\mid b])$ (the augmented matrix). Always $r\le r'$ (adding a column cannot decrease rank, but can increase it by at most 1). Three cases:

| Condition | Outcome |
|-----------|---------|
| $r < r'$ | **No solution** (inconsistent — some row becomes $0=c$, $c\ne0$) |
| $r = r' = n$ | **Unique solution** (as many independent constraints as unknowns) |
| $r = r' < n$ | **Infinitely many solutions** ($n-r$ free variables) |

Equation COUNT ($m$) never appears in this rule directly — only the RANKS do, which measure the number of genuinely INDEPENDENT constraints, regardless of how many equations were originally written down.

---

**[P49 — ADAPTIVE CHECKPOINT]**

**Prompt:** Row-reduce $\begin{cases}2x+4y=8\\x+2y=4\\3x+6y=12\end{cases}$ (three equations, two unknowns) to determine the outcome.

**CORRECT:** Divide row 1 by 2: $x+2y=4$ (identical to row 2). Row 3 minus 3×row 2: $3x+6y-3(x+2y)=12-3(4)$, i.e. $0=0$. All three equations reduce to the SAME single equation $x+2y=4$ — rank(A)=rank([A|b])=1 < n=2. **Infinitely many solutions**: $x=4-2y$, $y$ free.
→ "Correct — three equations collapsed to genuinely ONE independent constraint; equation count (3) said nothing about the true rank (1)." → Proceed to A02.

**PARTIAL:** Student correctly reduces but concludes "unique solution, since after simplifying we have one equation and this determines x in terms of y" — conflating "one remaining equation determines a relationship" with "unique solution."
→ "One equation in two unknowns doesn't pin down a SINGLE (x,y) pair — it describes an entire LINE of solutions (for every value of y, x=4-2y is a valid solution). 'Determines a relationship' and 'has a unique numerical answer' are different claims; with rank 1 and n=2 unknowns, there's exactly $n-r=1$ free variable, giving infinitely many solutions, not one."

**INCORRECT:** Student assumes 3 equations and 2 unknowns means the system is "over-determined" and automatically has no solution (MC-1).
→ "More equations than unknowns does NOT automatically mean no solution — check whether the extra equations are genuinely independent or merely redundant. Here, row-reducing shows all three equations are just scalar multiples of the same relationship ($x+2y=4$), so there is really only ONE independent constraint (rank 1), not three — redundant equations add no new restriction, they don't create a contradiction by themselves."

**NO_RESPONSE:** → "All three equations reduce to $x+2y=4$ (rows 2 and 3 are multiples of row 1, after adjustment). rank(A)=rank([A\|b])=1, n=2, so rank<n with no contradiction: infinitely many solutions, $x=4-2y$ with y free."

---

### Teaching Action A02 — Redundancy, the Zero-Row Trap, and Underdetermined-but-Consistent

**Primitive:** P06 CONTRAST PAIR
**Purpose:** Break MC-1 with a square system that is secretly dependent; break MC-2 by directly contrasting [0 0 0|0] against [0 0 0|c]; break MC-3 with an underdetermined system that is genuinely consistent

---

**[P06 — CONTRAST PAIR]**

**Contrast 1 — A "square" system (n equations, n unknowns) that is NOT automatically unique (MC-1):**

$\begin{cases}x+y+z=6\\2x+2y+2z=12\\x-y=0\end{cases}$ — 3 equations, 3 unknowns, "should" be unique by naive equation-counting. Row-reduce: row 2 minus 2×row 1 gives $0=0$ — row 2 is REDUNDANT (a scalar multiple of row 1), contributing zero new information. Effectively only 2 independent equations remain ($x+y+z=6$ and $x-y=0$) for 3 unknowns: rank(A)=2 < n=3. **Infinitely many solutions**, not unique — despite starting with exactly as many equations as unknowns. Equation count (3=3) said nothing; rank (2<3) is what actually decided the outcome.

**Contrast 2 — [0 0 0|0] vs. [0 0 0|c], side by side (MC-2):**

| Terminal row | Reads as | Meaning | Outcome contribution |
|---|---|---|---|
| $[0\ \ 0\ \ 0\ \ \|\ \ 0]$ | $0=0$ | Always true, no new constraint | Contributes a FREE variable → toward infinitely many solutions (if nothing else contradicts) |
| $[0\ \ 0\ \ 0\ \ \|\ \ 5]$ | $0=5$ | FALSE, always | **Contradiction** → entire system has NO solution, full stop |

These two rows LOOK almost identical (all coefficients zero) — the ENTIRE outcome hinges on whether the single augmented-column entry is also zero or not. Never assume; always read that final entry explicitly before classifying.

**Contrast 3 — Underdetermined (fewer independent equations than unknowns) but still CONSISTENT (MC-3):**

$\begin{cases}x+y+z=5\\2x+2y+2z=10\end{cases}$ — 2 equations, 3 unknowns (rank(A) can be at most 2, so automatically $r<n=3$; "underdetermined" by equation count too). Row-reduce: row 2 minus 2×row 1 gives $0=0$ — no contradiction. rank(A)=rank([A\|b])=1 < n=3. **Infinitely many solutions** (2 free variables: pick any $y,z$, then $x=5-y-z$) — the system is consistent, just underdetermined; "fewer equations than unknowns" by itself NEVER means "no solution," it only opens the possibility of multiple solutions (confirmed here) or, in principle, could still be a contradiction if the equations conflicted (which they don't here).

---

**[P49 — ADAPTIVE CHECKPOINT]**

**Prompt:** Row-reduce $\begin{cases}x+2y-z=3\\2x+4y-2z=7\end{cases}$ and classify the outcome.

**CORRECT:** Row 2 minus 2×row 1: $2x+4y-2z-2(x+2y-z) = 7-2(3)$, i.e. $0=1$. **No solution** — the two equations directly contradict each other (the left sides are proportional, but the right sides are not in that same proportion: $7\ne2\times3=6$).
→ "Correct — despite having FEWER equations than unknowns (2 equations, 3 unknowns), which might tempt 'infinitely many' by MC-3's error, this system is actually INCONSISTENT; equation/unknown count never decides this, only the actual row reduction does." → Proceed to A03.

**PARTIAL:** Student row-reduces correctly to $0=1$ but concludes "infinitely many solutions, since there are fewer equations than unknowns" (MC-3), not noticing the contradiction.
→ "Look at the actual terminal row: $0=1$ is a FALSE statement (not $0=0$), so this is a contradiction — no solution exists, regardless of how few equations there were to begin with. 'Fewer equations than unknowns' only means there COULD be multiple solutions if consistent; it never guarantees consistency itself, and here the equations directly conflict."

**INCORRECT:** Student sees the all-zero coefficient row and declares "infinitely many solutions" without checking the augmented entry (MC-2).
→ "The coefficient side reduces to $0\ 0\ 0$, yes — but check what's on the OTHER side of that row: it says $0=1$, not $0=0$. That single nonzero augmented entry flips the entire conclusion from 'infinitely many' to 'no solution' — always read the augmented column's value on any all-coefficient-zero row before classifying."

**NO_RESPONSE:** → "Row 2 minus 2×row 1 gives $0=1$ — a direct contradiction (not $0=0$). The system has NO solution."

---

### Teaching Action A03 — Mastery Gate (P91)

**Primitive:** P91 = P77→P55→P76→P55→P75→P55→P74→P55→P78
**Purpose:** Assess rank-based classification fluency, correct terminal-row reading, and equation-count independence under transfer

---

**[P77 — MULTI-PROBLEM SET]** *(4 problems)*

**Problem 1:** Row-reduce $\begin{cases}x-y=2\\3x-3y=6\end{cases}$ and classify.

*Solution:* Row 2 minus 3×row 1: $0=0$. rank(A)=rank([A\|b])=1<n=2. Infinitely many solutions: $x=2+y$, y free.

**Problem 2:** Row-reduce $\begin{cases}x-y=2\\3x-3y=5\end{cases}$ and classify.

*Solution:* Row 2 minus 3×row 1: $0=-1$. Contradiction. No solution.

**Problem 3:** A system has 4 equations and 3 unknowns. After row reduction, exactly one row is $[0\ 0\ 0\ |\ 0]$ and all others are non-degenerate with rank(A)=3. Classify.

*Solution:* rank(A)=rank([A\|b])=3=n. **Unique solution** — the $[0\ 0\ 0\|0]$ row is simply a redundant equation (adds no new constraint, but also no contradiction); with 3 genuinely independent equations matching the 3 unknowns, the solution is unique despite having started with 4 equations.

**Problem 4:** True or false: "A system with more equations than unknowns can never have a unique solution, since it's over-determined." Justify or correct.

*Solution:* **False.** More equations than unknowns can still yield a unique solution if enough of them are independent and consistent with rank(A)=n (extra equations beyond that are then automatically redundant, not contradictory) — e.g. Problem 3 above (4 equations, 3 unknowns, unique solution). It can also yield no solution (if some equations contradict) or infinitely many (if the independent rank falls short of n) — equation count alone never determines the outcome.

---

**[P55 — SCORE]**
Count correct responses. Record raw score S₁ (0–4) after P77.

---

**[P76 — TRANSFER PROBE]** *(P76_mode: cross-link probe — math.alg.system-linear-equations)*

**Prompt:** Recall from math.alg.system-linear-equations that a 2×2 system solved by substitution or elimination has exactly the same three possible outcomes (unique, none, infinite) as this concept's matrix-form classification.

(a) Take the system $\begin{cases}2x+3y=7\\4x+6y=14\end{cases}$. Solve it BOTH by substitution/elimination (as in math.alg.system-linear-equations) AND by row-reducing the augmented matrix (as in this concept), and confirm both methods agree on the outcome.
(b) Explain precisely how "the second equation is a scalar multiple of the first" (an observation naturally made while doing elimination) corresponds to a specific rank statement about A and [A|b].
(c) A student who has only studied elimination (not matrices) argues: "I don't need rank — I can already tell from elimination whether a system has 0, 1, or infinitely many solutions." Evaluate this claim, and explain what the matrix/rank framework adds beyond what elimination alone already reveals (think about systems with many equations and many unknowns, where elimination becomes harder to track by hand).

**Expected solution:**

(a) *Elimination:* multiply the first equation by 2: $4x+6y=14$ — identical to the second equation. So the second equation is redundant; only one independent equation remains, $2x+3y=7$, giving infinitely many solutions ($x=(7-3y)/2$, y free). *Row reduction:* $\begin{bmatrix}2&3&|&7\\4&6&|&14\end{bmatrix} \to$ (row 2 minus 2×row 1) $\to \begin{bmatrix}2&3&|&7\\0&0&|&0\end{bmatrix}$ — rank(A)=rank([A\|b])=1<n=2: infinitely many solutions. **Both methods agree.**

(b) "The second equation is a scalar multiple of the first" means, after subtracting the appropriate multiple, the resulting row is ALL zeros including the augmented entry ($[0\ 0\|0]$) — precisely the condition that keeps rank([A\|b]) from exceeding rank(A) (no new independent information, and no contradiction either). If instead the second equation were a scalar multiple of the first equation's LEFT side but NOT a matching multiple on the right side (as in Contrast 3 of A02, e.g. $2x+2y=6$ paired with something that should be $2\times$ the first equation's right side but isn't), the same subtraction produces $[0\ 0\|c]$ with $c\ne0$ — rank([A\|b]) EXCEEDS rank(A) by exactly 1, signaling a contradiction. Elimination's informal language ("this equation is just a multiple of that one," "these two contradict") is exactly the rank framework's formal statements about $r$ vs. $r'$, restated in row-operation terms.

(c) The claim is reasonable for SMALL systems (2 or 3 equations, checked by hand, as in this blueprint's examples) — elimination genuinely does reveal the same outcome as rank analysis, since they are the same underlying mathematics viewed two ways. What the matrix/rank framework ADDS is a framework that scales: for a system with, say, 50 equations and 30 unknowns, tracking "which equations are secretly multiples of which others" by inspection (as elimination invites) becomes impractical, whereas ROW-REDUCING THE MATRIX systematically (a well-defined, mechanical procedure) reveals the rank directly, and the SAME three-case classification (r vs r' vs n) applies without needing to spot redundancies by eye. The matrix framework is not a DIFFERENT answer from elimination — it is the SAME answer, obtained via a method that remains tractable and precise at a scale where ad hoc equation-comparison stops being feasible.

---

**[P55 — SCORE]**
Record transfer score S₂ (0 or 1) after P76.

Total score S = S₁ + S₂ (max 5).

---

**[P75 — MASTERY ASSESSMENT]**

MAMR: 5/5 (⌈0.9 × 5⌉ = ⌈4.5⌉ = 5)

- S ≥ 5: MASTERY ACHIEVED → proceed to P74
- S = 4: NEAR MASTERY → attempt repair on missed items; re-gate at next session
- S ≤ 3: MASTERY NOT ACHIEVED → execute Protocol B

---

**[P55 — SCORE]**
Record mastery determination (ACHIEVED / NEAR / NOT ACHIEVED).

---

**[P74 — ROUTING DECISION]**

- MASTERY ACHIEVED → unlock math.linalg.row-echelon and math.linalg.matrix-inverse; record completion
- NEAR MASTERY → flag for Protocol B on specific missed item(s); re-assess next session
- MASTERY NOT ACHIEVED → execute Protocol B immediately

---

**[P55 — SCORE]**
Record routing outcome.

---

**[P78 — COMPLETION]**

Session record: concept math.linalg.linear-system assessed. Mastery status logged. Student directed to next concept or repair protocol per P74 routing.

---

## Component 5 — Protocol B (Misconception Repair)

### Repair Action B01 — EQUATION-COUNT-DETERMINES-OUTCOME (MC-1)

**[P27 — MISCONCEPTION NAMING]**
"Assuming n equations and n unknowns guarantees a unique solution is EQUATION-COUNT-DETERMINES-OUTCOME. The RANK of A (the number of genuinely independent equations) decides the outcome — equations can be redundant or contradictory, which raw counting never detects."

**[P41 — MISCONCEPTION DETECTOR]**
Diagnostic: "A system has 3 equations and 3 unknowns. Does it have a unique solution?"
- MC-1 response: "Yes, 3 equations and 3 unknowns always gives a unique solution."

**[P64 — CONCEPTUAL SHIFT]**
"Row-reduce first, always — equation count is not the test. If one equation turns out to be a scalar multiple of another (redundant) or contradicts another, the effective rank drops below 3 (or a contradiction appears), regardless of having written down 3 equations. Only checking rank(A) vs rank([A\|b]) vs n after row-reducing settles it; 'same number of equations as unknowns' is neither necessary nor sufficient for uniqueness."

Practice: Confirm that $\begin{cases}x+y=2\\2x+2y=4\\3x+3y=6\end{cases}$ (3 equations, 2 unknowns, all multiples of each other) has infinitely many solutions despite having MORE equations than unknowns.

---

### Repair Action B02 — ZERO-ROW-ALWAYS-MEANS-INFINITE-SOLUTIONS (MC-2)

**[P27 — MISCONCEPTION NAMING]**
"Reading any zero-coefficient row as 'infinitely many solutions' without checking the augmented entry is ZERO-ROW-ALWAYS-MEANS-INFINITE-SOLUTIONS. [0 0 0\|0] and [0 0 0\|c] (c≠0) look nearly identical but mean OPPOSITE things."

**[P41 — MISCONCEPTION DETECTOR]**
Diagnostic: "A row-reduced system has a row [0 0 0 \| 7]. What does this mean?"
- MC-2 response: "Infinitely many solutions, since the row is all zeros."

**[P64 — CONCEPTUAL SHIFT]**
"The COEFFICIENT side is all zeros, yes — but read the augmented entry: 7. The row says $0=7$, which is FALSE, always. This is a CONTRADICTION, meaning the entire system has NO solution — the exact opposite of 'infinitely many.' Only [0 0 0\|0] (augmented entry also zero, i.e. $0=0$, always TRUE) signals a free variable toward infinitely many solutions. Habit: on every all-coefficient-zero row, explicitly check whether the augmented entry is zero or nonzero before concluding anything."

Practice: Classify a system whose row reduction ends in [0 0 \| 0] vs. one ending in [0 0 \| −3], stating the outcome for each.

---

### Repair Action B03 — RANK-LESS-THAN-N-MEANS-NO-SOLUTION (MC-3)

**[P27 — MISCONCEPTION NAMING]**
"Assuming rank(A)<n automatically means no solution is RANK-LESS-THAN-N-MEANS-NO-SOLUTION. Rank(A)<n (fewer independent equations than unknowns) signals INFINITELY MANY solutions, provided the system is otherwise consistent (rank(A)=rank([A\|b]))."

**[P41 — MISCONCEPTION DETECTOR]**
Diagnostic: "A system has 2 independent equations and 3 unknowns. Does it have a solution?"
- MC-3 response: "No, there aren't enough equations to solve for all the unknowns."

**[P64 — CONCEPTUAL SHIFT]**
"'Not enough equations to pin down a UNIQUE answer' and 'no solution at all' are different claims. If the 2 equations are consistent (no contradiction after row reduction — check for a [0⋯0\|c≠0] row specifically), the system has INFINITELY MANY solutions: with rank 2 and n=3, exactly $3-2=1$ variable is free, and every choice of that free variable produces a valid solution. 'Underdetermined' means 'possibly many solutions if consistent,' never 'guaranteed no solution' — only an actual contradiction (a $0=c\ne0$ row) produces 'no solution,' and that can happen regardless of how the equation count compares to the unknown count."

Practice: Confirm that $\begin{cases}x+y+z=4\\x+y+z=4\end{cases}$ (2 identical equations, 3 unknowns) is consistent and has infinitely many solutions (2 free variables), not "no solution."

---

## Component 6 — P89 Spaced Repetition Schedule

**[P89 — SPACED REPETITION]**

| Review | Delay | Focus |
|--------|-------|-------|
| SR-1 | +1 day | Restate the three-case rank classification (r<r'; r=r'=n; r=r'<n) from memory, with the outcome each implies |
| SR-2 | +3 days | Classify a fresh square system that turns out to be secretly dependent, without assuming equation count settles it |
| SR-3 | +7 days | Read a [0 0 0\|c] row correctly for both c=0 and c≠0 cases, stated side by side |
| SR-4 | +14 days | Reconstruct the elimination-vs-rank equivalence argument (A03 transfer probe) explaining what the matrix framework adds at scale |

Retrieval flag: if student assumes equation count alone determines the outcome (MC-1) or misreads a contradictory zero-row as "infinitely many" (MC-2), re-execute B01/B02 before continuing.

---

## Component 7 — Cross-Blueprint Dependencies

**[GR-8: Cross-link documentation]**

| Direction | Concept | Relationship |
|-----------|---------|---------------|
| Requires (Tier-1) | math.linalg.matrix | Supplies the Ax=b packaging (matrix-vector product) this concept classifies the solvability of |
| Requires (Tier-1) | math.alg.system-linear-equations | Supplies the elimination/substitution method and the three-outcome vocabulary (unique/none/infinite) this concept restates via rank |
| Unlocks | math.linalg.row-echelon | The systematic row-reduction procedure sketched informally here (A01-A03) is formalized fully in that blueprint |
| Unlocks | math.linalg.matrix-inverse | A unique solution to Ax=b for every b (the r=r'=n case, with A square) is exactly the condition under which A is invertible |

**GR-9:** cross_links include math.alg.system-linear-equations (Tier 1) → P76_mode = cross-link probe (probe connects elimination's informal redundancy/contradiction language directly to the formal rank statements, and asks what the matrix framework adds at scale).

---

## Component 8 — Teaching Notes

**Structural decisions:**
- h=5 → standard structure (2 main TAs + gate), matching the concept's tightly bounded scope (one classification theorem, applied to worked examples) despite proficient difficulty
- bloom=apply → checkpoints require executing row reduction and reading the result correctly, not merely stating the classification rule
- CPA_entry = C for a proficient learner: three concrete row-reduced systems (one per outcome) anchor the classification BEFORE the general rank rule is stated, so the abstract theorem in A01's Stage A reads as a summary of what was just seen, not a new claim to take on faith

**Key teaching insight:** MC-1, MC-2, and MC-3 all share a single underlying failure mode — substituting a SURFACE feature (equation count, the visual appearance of a zero row, "fewer equations than unknowns") for the actual determining computation (rank comparison, the augmented entry's specific value). A02's three contrasts are deliberately built so each one presents a case where the surface feature and the correct answer DISAGREE (a square system that isn't unique; a zero-looking row that's actually a contradiction; an underdetermined system that IS consistent), forcing the rank-based rule to do real work rather than merely restating an already-obvious answer.

**MC-2 as the single highest-leverage repair:** Because [0 0 0\|0] and [0 0 0\|c≠0] are visually almost identical (differing in exactly one entry), this is the error most likely to survive into unrelated future contexts (any row-reduction task, in any subsequent linear algebra concept) if not corrected here — B02's practice item deliberately drills the two side by side one final time to cement the discrimination.

**Sequencing note (cross-link):** math.alg.system-linear-equations (Tier 1, already authored) is a genuine, actionable cross-link — the P76 transfer probe explicitly reconciles that blueprint's elimination-based language ("this equation is a multiple of that one") with this concept's formal rank statements, and argues for what the matrix framework specifically contributes once systems grow too large to inspect by eye.

---

## Component 10 — Validation Checklist

| Code | Rule | Check | Status |
|------|------|-------|--------|
| V-1 | Concept ID matches KG | math.linalg.linear-system ✓ | PASS |
| V-2 | All Tier-1 requires have existing blueprints | math.linalg.matrix ✓, math.alg.system-linear-equations ✓ | PASS |
| V-3 | CPA entry = C for proficient difficulty | C (Concrete) ✓ | PASS |
| V-4 | bloom=apply → P07 recommended | Row-reduction execution tasks throughout A01-A03 ✓ | PASS |
| V-5 | GR-1: A01 opens with B-category primitive | P11 REPRESENTATION SHIFT ✓ | PASS |
| V-6 | GR-2: each non-gate TA has P49 with 4 branches | A01, A02 each have P49 CORRECT/PARTIAL/INCORRECT/NO_RESPONSE ✓ | PASS |
| V-7 | GR-3: gate TA (A03) is terminal | A03=P91; no further TAs ✓ | PASS |
| V-8 | GR-4: repair TAs open with P27+P41+P64 | B01, B02, B03 each: P27→P41→P64 ✓ | PASS |
| V-9 | GR-6: P91 terminal in its TA | P91 is A03; A03 is the last TA ✓ | PASS |
| V-10 | GR-7: P76 present in mastery gate | P76 in A03 between P77 and P75 ✓ | PASS |
| V-11 | GR-8: cross_links documented in Component 7 | requires and unlocks documented ✓ | PASS |
| V-12 | GR-9: P76 mode correct for cross_links | math.alg.system-linear-equations is Tier 1 → P76=cross-link probe ✓ | PASS |
| V-13 | GR-10: MAMR stated and enforced | MAMR=5/5 stated in C0 and P75 gate ✓ | PASS |
| V-14 | MAMR formula correct | ⌈0.9×5⌉=⌈4.5⌉=5; PASS=5/5 ✓ | PASS |
| V-15 | P91 structure complete | P77(4)→P55→P76(1)→P55→P75→P55→P74→P55→P78 ✓ | PASS |
| V-16 | P77 has exactly 4 problems | Problems 1–4 verified ✓ | PASS |
| V-17 | 3 misconceptions with FOUNDATIONAL declared | MC-1, MC-2 FOUNDATIONAL, MC-3 ✓ | PASS |
| V-18 | P89 spaced repetition present | Component 6 with 4 SR intervals ✓ | PASS |
| V-19 | Structure matches h | h=5, tightly-scoped → compact (2 main TAs + gate); A01+A02+A03 ✓ | PASS |
| V-20 | P76 transfer probe is novel and correct | Elimination-vs-rank equivalence; scale argument for the matrix framework ✓ | PASS |
| AIR | All internal references consistent | Concept IDs, MAMR, bloom, difficulty consistent throughout ✓ | PASS |
