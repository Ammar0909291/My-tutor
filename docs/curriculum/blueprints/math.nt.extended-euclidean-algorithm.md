# Teaching Blueprint: Extended Euclidean Algorithm (`math.nt.extended-euclidean-algorithm`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.nt.extended-euclidean-algorithm` |
| name | Extended Euclidean Algorithm |
| domain | Number Theory |
| difficulty | proficient |
| bloom | apply |
| mastery_threshold | 0.8 → MAMR = ⌈0.8×5⌉ = 4/5 |
| estimated_hours | 5 |
| requires | `math.nt.euclidean-algorithm` |
| unlocks | `math.nt.modular-inverse` |
| cross_links | none |
| CPA_entry_stage | C (Concrete) — running the ordinary Euclidean Algorithm on a specific pair first, then working BACKWARD through the same steps |
| description (KG) | Extension of the Euclidean algorithm that also computes integers x, y such that ax + by = GCD(a, b), enabling computation of modular inverses. |

## Component 1 — Learning Objectives

- LO1: State the goal of the **Extended Euclidean Algorithm**: not just computing $\gcd(a,b)$ (already known from `math.nt.euclidean-algorithm`), but ALSO finding integers $x,y$ such that $ax+by=\gcd(a,b)$ — recognizing this as strictly MORE information than the ordinary algorithm provides, not a different computation of the same gcd.
- LO2: Execute the extension by working BACKWARD through the ordinary Euclidean Algorithm's sequence of divisions, substituting each remainder equation back into the previous one until $\gcd(a,b)$ is expressed purely in terms of the original $a$ and $b$.
- LO3: Recognize that the integers $x,y$ found are **not unique** — infinitely many other valid $(x,y)$ pairs exist for the same $a,b$ — directly refuting the misconception that the specific $x,y$ produced by the back-substitution process is "the" unique correct answer, when it is merely one valid solution among infinitely many.

## Component 2 — Prerequisite Check

Assumes mastery of `math.nt.euclidean-algorithm` (computing $\gcd(a,b)$ via repeated replacement of $(a,b)$ with $(b,a\bmod b)$ until the remainder is $0$, and the identity $\gcd(a,b)=\gcd(b,a\bmod b)$ this relies on).

## Component 3 — Core Explanation

**The goal — more than just the gcd**: the ordinary Euclidean Algorithm answers "what is $\gcd(a,b)$?" The Extended Euclidean Algorithm answers a STRICTLY HARDER question: "what is $\gcd(a,b)$, AND what specific integers $x,y$ satisfy $ax+by=\gcd(a,b)$?" (this equation is known as **Bézout's identity**). The gcd value itself doesn't change — the extension adds genuinely new information (the coefficients $x,y$) on top of what the ordinary algorithm already computes.

**Working backward through the division steps**: the ordinary Euclidean Algorithm produces a sequence of division equations, e.g. $a=bq_1+r_1$, $b=r_1q_2+r_2$, $r_1=r_2q_3+r_3$, ..., ending when some remainder is $0$ (the previous remainder is $\gcd(a,b)$). The Extended Algorithm takes this SAME sequence and works backward: start from the second-to-last equation, which expresses $\gcd(a,b)$ as a combination of the two previous remainders; then substitute the previous equation (solved for its remainder) into this expression; repeat, substituting further and further back, until only the ORIGINAL $a$ and $b$ remain in the expression — at that point, the coefficients of $a$ and $b$ are exactly the desired $x,y$.

**Non-uniqueness of the solution**: the pair $(x,y)$ produced by this back-substitution process is a genuinely valid solution to $ax+by=\gcd(a,b)$, but it is not the ONLY one. Given one solution $(x_0,y_0)$, every pair of the form $\left(x_0+k\cdot\frac{b}{\gcd(a,b)},\ y_0-k\cdot\frac{a}{\gcd(a,b)}\right)$ for any integer $k$ is ALSO a valid solution — infinitely many pairs satisfy the same equation. The back-substitution process happens to produce one specific such pair, not a uniquely determined "the" answer.

## Component 4 — Worked Examples

**Example 1 (LO1/LO2 — the full backward substitution)**: Find $\gcd(252,105)$ and integers $x,y$ with $252x+105y=\gcd(252,105)$. First, the ordinary Euclidean Algorithm (from `math.nt.euclidean-algorithm`'s own example): $252=105(2)+42$; $105=42(2)+21$; $42=21(2)+0$ — so $\gcd(252,105)=21$. Now work BACKWARD: from the second equation, $21 = 105-42(2)$. Substitute $42=252-105(2)$ (from the first equation) into this: $21 = 105-(252-105(2))(2) = 105-252(2)+105(4) = 105(5)-252(2)$. So $21 = 252(-2)+105(5)$ — giving $x=-2$, $y=5$. Check: $252(-2)+105(5) = -504+525=21$ ✓.

**Example 2 (LO2 — organizing the backward pass explicitly)**: Continuing Example 1, notice the substitution process moved through the equations in REVERSE order from how they were generated (last equation used first for the gcd expression, then substituting progressively earlier equations). Tracking this explicitly avoids losing track of which remainder is being replaced at each step — a common source of arithmetic slips is substituting the wrong equation or in the wrong direction.

**Example 3 (LO3 — the solution is not unique, breaking MC-1)**: From Example 1, $(x,y)=(-2,5)$ solves $252x+105y=21$. Now check $(x',y')=(-2+5, 5-12) = (3,-7)$ (adding $\frac{105}{21}=5$ to $x$ and subtracting $\frac{252}{21}=12$ from $y$, per the general non-uniqueness formula): $252(3)+105(-7) = 756-735=21$ ✓ — a COMPLETELY DIFFERENT pair of integers, yet it ALSO satisfies the exact same equation. Both $(-2,5)$ and $(3,-7)$ are equally valid solutions to $252x+105y=21$ — proving the back-substitution process's output is "a" solution, not "the" solution.

## Component 5 — Teaching Actions

### Teaching Action A01 — The Extended Goal: gcd Plus Coefficients (Primitive P11: Representation Shift)

State: "you already know how to find $\gcd(a,b)$. Now we ask a bigger question: can you write that gcd as $ax+by$ for SOME specific whole numbers $x,y$? That's genuinely more information than the gcd alone." Preview Example 1's target equation before working through it.

### Teaching Action A02 — Working Backward Through the Division Steps (Primitive P11: Representation Shift)

Work Example 1's full backward substitution live, explicitly narrating each step: "start from the second-to-last division — it already expresses the gcd using the two remainders just before it. Now replace the OLDER remainder using the equation before that, and keep going until only $a$ and $b$ remain." Use Example 2's organizational framing to keep the backward direction clear.

### Teaching Action A03 — The Solution (x,y) Is Not Unique (Primitive P28: Conflict Evidence)

Present Example 3's direct evidence: TWO genuinely different pairs, $(-2,5)$ and $(3,-7)$, both satisfying $252x+105y=21$ exactly. State: "the backward-substitution process gives you A valid pair — it does not give you THE only valid pair. Infinitely many other integer pairs work too; the process just happens to land on one of them."

- **MC-1 hook**: ask "if you run the Extended Euclidean Algorithm and get $x=-2,y=5$, is that the ONLY pair of integers satisfying $252x+105y=21$?" — a "yes" answer reveals MC-1 (believing the algorithm's output is uniquely determined, missing that infinitely many other valid coefficient pairs exist for the same equation).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Run the ordinary Euclidean Algorithm on $a=99,b=27$ to find $\gcd(99,27)$, recording each division step.
  2. Using your division steps from problem 1, work backward to find integers $x,y$ with $99x+27y=\gcd(99,27)$.
  3. Verify your answer to problem 2 by direct substitution back into $99x+27y$.
  4. Given ONE solution $(x_0,y_0)$ to $ax+by=\gcd(a,b)$, explain (using the general non-uniqueness formula or your own reasoning) how you could generate a second, different valid solution pair.
- **P76 (Transfer Probe, mode = independence)**: "A cryptography student needs to find the modular inverse of $17$ modulo $43$ — meaning an integer $x$ such that $17x\equiv1\pmod{43}$. They recall that finding such an $x$ is closely related to solving $17x+43y=\gcd(17,43)$ for integer $x,y$. (a) Run the ordinary Euclidean Algorithm to confirm $\gcd(17,43)=1$. (b) Use the Extended Euclidean Algorithm's backward-substitution process to find specific integers $x,y$ with $17x+43y=1$. (c) Explain why finding this $x$ (from part b) directly gives the modular inverse of $17$ mod $43$ that the student needs — connecting the equation $17x+43y=1$ to the congruence $17x\equiv1\pmod{43}$."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | EXTENDED-ALGORITHM-OUTPUT-ASSUMED-UNIQUE | Believing the specific integer pair $(x,y)$ produced by the Extended Euclidean Algorithm is the unique solution to $ax+by=\gcd(a,b)$, missing that infinitely many other valid pairs exist | Foundational |
| MC-2 | BACKWARD-SUBSTITUTION-DIRECTION-CONFUSED | Substituting the division equations in the wrong order (forward instead of backward), or substituting the wrong remainder at a given step, producing an incorrect final coefficient pair | Foundational |
| MC-3 | EXTENDED-ALGORITHM-CONFLATED-WITH-JUST-FINDING-GCD | Running only the ordinary Euclidean Algorithm (finding just the gcd) when asked for the Extended version, missing that the coefficients $x,y$ are the entire additional point of the extension | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Extended-Algorithm-Output-Uniqueness Assumption") → P41 (detect: ask whether the $(x,y)$ pair found is the ONLY pair satisfying the equation) → P64 (conceptual shift: re-walk Example 3's direct construction of a second, different valid pair, re-anchoring on "the algorithm finds A solution, not THE solution — many exist").
- **B02 (targets MC-2)**: P27 (name it: "Backward-Substitution Direction Confusion") → P41 (detect: ask a student to perform the backward substitution and check whether they substitute equations in the correct reverse order) → P64 (conceptual shift: re-walk Example 1/2's explicit step-by-step narration, re-anchoring on "start from the SECOND-TO-LAST division equation, then work toward the FIRST — never the other direction").
- **B03 (targets MC-3)**: P27 (name it: "Extended-Algorithm-as-Just-GCD Confusion") → P41 (detect: ask a student to run the "Extended Euclidean Algorithm" and check whether they stop after finding just the gcd, without producing $x,y$) → P64 (conceptual shift: re-anchor on "the word EXTENDED means: do everything the ordinary algorithm does, THEN also do the backward pass to get $x,y$ — stopping at the gcd alone means you haven't finished the extended version").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.nt.euclidean-algorithm` (the sequence of division steps this concept's backward pass operates on, and the $\gcd(a,b)=\gcd(b,a\bmod b)$ identity underlying it).
- **Unlocks**: `math.nt.modular-inverse` (the modular inverse of $a$ modulo $n$ is found directly via the $x$ coefficient of $ax+ny=1$, exactly the output this concept produces).
- **Cross-link**: KG lists no cross-links for this concept.

## Component 8 — Teaching Notes

- estimated_hours = 5 with a proficient/apply tag places this at a "3 TAs + gate" tier — A01 (the extended goal), A02 (the backward-substitution procedure), and A03 (non-uniqueness of the solution) each target a distinct LO, appropriate for a concept that reuses an already-known algorithm's steps in a new direction (backward) toward a new goal (coefficients, not just the gcd).
- Example 1 deliberately reuses `math.nt.euclidean-algorithm`'s own worked example ($\gcd(252,105)$) verbatim for its forward pass, so the backward pass this concept teaches builds directly on already-familiar numbers rather than requiring the student to re-verify a new gcd computation from scratch.
- The transfer probe's modular-inverse framing was chosen deliberately to preview `math.nt.modular-inverse` concretely — connecting the abstract coefficient $x$ from $ax+ny=1$ to its most common practical application, without requiring this blueprint to fully define modular inverses itself (left to that concept).

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (empty in KG → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.8×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Concrete: running the ordinary algorithm first, then working backward) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1/LO2, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
