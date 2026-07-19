# Teaching Blueprint: Division Algorithm (`math.nt.division-algorithm`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.nt.division-algorithm` |
| name | Division Algorithm |
| domain | Number Theory |
| difficulty | proficient |
| bloom | understand |
| mastery_threshold | 0.85 → MAMR = ⌈0.85×5⌉ = 5/5 |
| estimated_hours | 4 |
| requires | `math.found.well-ordering-principle`, `math.arith.division` |
| unlocks | `math.nt.modular-arithmetic` |
| cross_links | none |
| CPA_entry_stage | C (Concrete) — physical grouping/leftover before the formal existence-and-uniqueness statement |
| description (KG) | For integers a and b > 0, there exist unique integers q (quotient) and r (remainder) with a = bq + r and 0 ≤ r < b. |

## Component 1 — Learning Objectives

- LO1: State the **Division Algorithm**: for integers $a$ and $b>0$, there **exist unique** integers $q$ (quotient) and $r$ (remainder) with $a=bq+r$ and $0\leq r<b$ — and compute $q,r$ directly for given $a,b$, including when $a$ is **negative**.
- LO2: Explain the **existence** proof strategy — using the Well-Ordering Principle to select the LEAST nonnegative value of $a-bq$ over all integers $q$ — and explain the **uniqueness** proof strategy — assuming two different valid $(q,r)$ pairs and deriving a contradiction.
- LO3: Correctly apply the algorithm to **negative** dividends $a$, recognizing that the remainder $r$ must STILL satisfy $0\leq r<b$ (never negative), which means the quotient $q$ for a negative $a$ is generally NOT simply the "rounded-towards-zero" division result.

## Component 2 — Prerequisite Check

Assumes mastery of `math.found.well-ordering-principle` (every nonempty subset of $\mathbb{N}$ has a least element — this concept's existence proof directly applies it) and `math.arith.division` (informal division, quotient and remainder for positive integers).

## Component 3 — Core Explanation

The **Division Algorithm**: for integers $a$ and $b>0$, there **exist unique** integers $q$ and $r$ such that
$$a = bq+r, \qquad 0\leq r<b$$

**Existence, via Well-Ordering**: consider the set $S=\{a-bq : q\in\mathbb{Z}, a-bq\geq0\}$ (all nonnegative values obtainable by subtracting some multiple of $b$ from $a$). This set is nonempty (for large enough negative $q$, $a-bq$ becomes arbitrarily large and positive) — by the Well-Ordering Principle, $S$ has a LEAST element, call it $r=a-bq_0$ for the corresponding $q_0$. This $r$ automatically satisfies $r<b$ (if $r\geq b$, then $r-b=a-b(q_0+1)$ would be an EVEN SMALLER nonnegative element of $S$, contradicting $r$'s minimality) — giving existence with $q=q_0$.

**Uniqueness**: suppose $a=bq_1+r_1=bq_2+r_2$ with both $0\leq r_1,r_2<b$. Then $b(q_1-q_2)=r_2-r_1$. Since $|r_2-r_1|<b$ (both remainders are in $[0,b)$), but $b(q_1-q_2)$ is a MULTIPLE of $b$, the only multiple of $b$ with absolute value less than $b$ is 0 — forcing $q_1=q_2$ and $r_1=r_2$.

**Negative $a$ — the remainder still stays nonnegative**: for $a<0$, the quotient $q$ is generally NOT simply "$a/b$ rounded towards zero" — since $r$ must stay in $[0,b)$, $q$ is often one LESS than the naive truncated-division result. E.g. for $a=-7,b=3$: naive truncation gives $-7/3\approx-2.33\to-2$, but $-7=3(-2)+(-1)$ has $r=-1<0$, VIOLATING the required $0\leq r<b$ — the correct division-algorithm quotient is $q=-3$: $-7=3(-3)+2$, with $r=2$, genuinely satisfying $0\leq2<3$.

## Component 4 — Worked Examples

**Example 1 (LO1 — positive a, straightforward)**: For $a=47,b=6$: $47=6(7)+5$, so $q=7,r=5$ (checking $0\leq5<6$ ✓).

**Example 2 (LO2 — uniqueness argument applied concretely)**: Suppose someone claims BOTH $47=6(7)+5$ AND $47=6(6)+11$ are valid division-algorithm representations. Check: is $0\leq11<6$? NO — $11\geq6$, violating the remainder constraint. So the second "representation," while arithmetically true ($6\times6+11=47$), does NOT satisfy the Division Algorithm's remainder restriction — only $q=7,r=5$ qualifies, confirming uniqueness (among representations satisfying the STATED constraint, not merely among all arithmetically-true equations).

**Example 3 (LO3 — negative a, breaking MC-1)**: For $a=-17,b=5$: naive truncated division gives $-17/5=-3.4\to-3$ (rounding towards zero), suggesting (incorrectly) $-17=5(-3)+(-2)$ — but $r=-2$ violates $0\leq r<5$. The CORRECT division-algorithm quotient is $q=-4$: $-17=5(-4)+3$, checking $0\leq3<5$ ✓. The quotient $q=-4$ is one LESS than the naive truncated result $-3$, precisely because subtracting one more multiple of $b=5$ was needed to bring the remainder back into the required nonnegative range.

## Component 5 — Teaching Actions

### Teaching Action A01 — Existence via Well-Ordering, Applied Concretely (Primitive P11: Representation Shift)

Start concrete: physically group 47 objects into bags of 6, counting how many full bags (7) and how many are left over (5) — directly matching Example 1. State the formal statement: "this always works, uniquely, for ANY integers $a$ and positive $b$ — that's the Division Algorithm."

Shift representation to the existence PROOF: describe the set $S$ of nonnegative values $a-bq$, and explain how the Well-Ordering Principle guarantees a LEAST such value exists — connecting directly back to the prerequisite concept's own machinery, applied here for the first genuinely concrete payoff.

- **MC-1 hook**: present $a=-17,b=5$ and ask a student to "just divide, rounding towards zero, to get $q$ and $r$" — watch whether they produce $q=-3,r=-2$ (an invalid negative remainder) without checking the constraint, revealing MC-1 (assuming ordinary truncated/rounded division automatically satisfies the Division Algorithm's remainder constraint, even for negative dividends).

### Teaching Action A02 — Uniqueness, and the Negative-Dividend Correction (Primitive P06: Contrast Pair)

**Contrast 1**: Work Example 2's uniqueness check explicitly — showing an arithmetically-valid-looking alternative ($6\times6+11=47$) fails the STATED constraint ($0\leq r<b$), leaving only one genuinely qualifying representation. State: "uniqueness is uniqueness AMONG representations satisfying the remainder bound — not uniqueness among all possible ways to write $a$ as $bq+(\text{something})$."

**Contrast 2 (targets MC-1)**: Work Example 3's negative-dividend correction explicitly, contrasting the (incorrect) naive truncated-division quotient $-3$ against the (correct) division-algorithm quotient $-4$ — showing the remainder constraint FORCES this adjustment. State the rule: "always compute $r$ FIRST by ensuring $0\leq r<b$, THEN back out $q=(a-r)/b$ — don't trust ordinary calculator division (which typically rounds towards zero) to automatically respect this nonnegative-remainder requirement for negative dividends."

### Teaching Action A03 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Find $q$ and $r$ for $a=83,b=9$, verifying $0\leq r<9$.
  2. Find $q$ and $r$ for $a=-23,b=4$, being careful to ensure $0\leq r<4$ (not a negative remainder).
  3. A student claims $-12=5(-2)+(-2)$ is a valid division-algorithm representation with $b=5$. Explain why this is incorrect, and find the correct $q,r$.
  4. Explain, using the uniqueness proof's core argument, why $a=bq_1+r_1=bq_2+r_2$ with both remainders in $[0,b)$ forces $q_1=q_2$ (hint: consider what values $b(q_1-q_2)$ could possibly take, given the remainder bound).
- **P76 (Transfer Probe, mode = independence)**: "A cyclic scheduling system assigns tasks to one of 7 workers in rotation, using task number $a$ modulo 7 to determine the worker (worker number = remainder). The system occasionally processes a 'correction' task with a NEGATIVE task number (representing a retroactively-inserted earlier task, e.g. task number $-10$). (a) Using the Division Algorithm's correct negative-dividend handling (not naive rounded division), determine which worker (0 through 6) should be assigned task number $-10$. (b) Explain why simply computing $-10 \div 7$ with ordinary calculator rounding-towards-zero would assign the WRONG worker, connecting your answer to this lesson's negative-dividend correction."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | TRUNCATED-DIVISION-ASSUMED-VALID-FOR-NEGATIVE-DIVIDENDS | Assuming ordinary rounded/truncated division (rounding towards zero) automatically satisfies the Division Algorithm's $0\leq r<b$ constraint, especially for negative dividends, without checking or adjusting | Foundational |
| MC-2 | UNIQUENESS-MISUNDERSTOOD-AS-NO-OTHER-ARITHMETIC-REPRESENTATION-EXISTS | Believing uniqueness means no OTHER equation of the form $a=bq+r$ can be written at all, rather than uniqueness specifically among representations satisfying the stated remainder bound $0\leq r<b$ | Moderate |
| MC-3 | REMAINDER-BOUND-CHECKED-ONLY-FOR-UPPER-LIMIT | Verifying $r<b$ but forgetting to also check $r\geq0$ (or vice versa), treating the remainder constraint as a single-sided check rather than the full two-sided range | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Truncated Division for Negative Dividends") → P41 (detect: give a negative-dividend problem and check whether the student's remainder comes out negative without correction) → P64 (conceptual shift: work through Example 3's explicit correction, showing the naive quotient must be adjusted by exactly 1 to bring the remainder back into $[0,b)$).
- **B02 (targets MC-2)**: P27 (name it: "Uniqueness Overinterpreted") → P41 (detect: present Example 2's alternative "valid-looking" equation with an out-of-range remainder and ask if it contradicts uniqueness) → P64 (conceptual shift: re-anchor on "uniqueness is a claim about representations satisfying the STATED remainder bound specifically — other arithmetically-true equations without that bound simply aren't valid division-algorithm representations to begin with").
- **B03 (targets MC-3)**: P27 (name it: "One-Sided Remainder Check") → P41 (detect: check whether a student verifies BOTH $r\geq0$ AND $r<b$, or only one side) → P64 (conceptual shift: re-anchor on the full two-sided constraint $0\leq r<b$ — both inequalities must hold, and checking only one leaves room for exactly the kind of negative-remainder error MC-1 describes).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.found.well-ordering-principle` (the least-element guarantee this concept's existence proof directly invokes), `math.arith.division` (informal quotient/remainder, formalized rigorously here).
- **Unlocks**: `math.nt.modular-arithmetic` (modular arithmetic is defined directly using this concept's remainder, extended to a full arithmetic system on residues).
- **Cross-link**: KG lists no cross-links for this concept.

## Component 8 — Teaching Notes

- estimated_hours = 4 with a proficient/understand tag places this at the "2 main TAs + gate" tier — A01 (existence via Well-Ordering, applied concretely) and A02 (uniqueness plus the negative-dividend correction) jointly cover all three LOs.
- This blueprint is the first in this corpus to deliver a genuine, concrete PAYOFF for the abstract Well-Ordering machinery established in its prerequisite — the existence proof here isn't a restatement of that concept's abstract argument, but its first substantive APPLICATION, deliberately structured to show the least-element selection doing real proof-work rather than being invoked as an unexplained black box.
- MC-1 (truncated division assumed valid for negative dividends) was made this blueprint's central focus because ordinary calculator/programming-language division (which typically truncates towards zero) genuinely disagrees with the Division Algorithm's convention for negative dividends — this is not a purely academic distinction but a real source of off-by-one errors in practical computing contexts (as the cyclic-scheduling transfer probe illustrates directly).

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (both) |
| V-4 | unlocks concepts named accurately from KG | PASS |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (empty in KG → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A03) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.85×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Concrete: physical grouping/leftover before formal statement) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
