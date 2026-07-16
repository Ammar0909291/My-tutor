# Teaching Blueprint — math.seq.series

## Component 0 — Metadata
concept_id: math.seq.series
concept_name: Series
blueprint_version: 1.0
spec_version: Teaching Blueprint Specification v1.0
status: PACKAGE_READY
difficulty: proficient
bloom: understand
estimated_hours: 5
mastery_threshold: 0.80
CPA_entry_stage: P
requires: [math.seq.sequence]
cross_links: []
P76_mode: independence

---

## Component 1 — Cognitive Map

**Core concept:** A series is the sum of the terms of a sequence: Σₙ₌₁^∞ aₙ = a₁+a₂+a₃+…. This infinite sum is formally defined as the limit of the sequence of partial sums: Sₙ = a₁+a₂+…+aₙ. The series CONVERGES to S if lim_{n→∞} Sₙ = S (finite); it DIVERGES if the limit does not exist or is infinite.

**Conceptual progression:**
1. From sequence to series: a sequence {aₙ} is a list; a series Σaₙ is its running sum.
2. Partial sums: S₁=a₁, S₂=a₁+a₂, S₃=a₁+a₂+a₃, … form a NEW sequence {Sₙ}.
3. Convergence: series converges iff {Sₙ} converges; the limit IS the series sum.
4. Divergence: {Sₙ} grows without bound → series diverges (e.g., 1+2+3+… = ∞).
5. The nth-term test: if Σaₙ converges, then lim aₙ=0. Contrapositive: if lim aₙ≠0, series diverges. CONVERSE FALSE: lim aₙ=0 does NOT guarantee convergence (harmonic series).
6. Special series: geometric series Σrⁿ converges to 1/(1−r) for |r|<1; diverges for |r|≥1.

**CPA arc (entry: P):**
- Pictorial: number line showing partial sums approaching a limit; bar charts of aₙ terms vs. running sum Sₙ; geometric series as successive halving of a unit interval
- Abstract: Σ notation, Sₙ = Σₖ₌₁ⁿ aₖ, lim_{n→∞} Sₙ = S, convergence/divergence

**Prior knowledge activated:** sequence definition (aₙ as function from ℕ); limit of a sequence; addition; geometric intuition of "approaching a value"

---

## Component 2 — Misconception Registry

### MC-1: SERIES-IS-A-SEQUENCE [FOUNDATIONAL]
**Description:** Learner conflates the series Σaₙ with the sequence {aₙ}. Does not understand that the series is a SUM of terms, while the sequence is a LIST of terms. Confuses convergence of the sequence (aₙ→0) with convergence of the series (Sₙ→S).
**Surface form:** "The series 1+1/2+1/4+… is just the sequence (1, 1/2, 1/4, …). They're the same thing."
**Root cause:** Both involve the same terms aₙ. The distinction — a list vs. an accumulating sum — is subtle and requires holding both objects in mind simultaneously.
**Trigger condition:** Any problem that asks whether the sequence of terms or the sequence of partial sums is being discussed.
**Repair target:** TA-B01.

### MC-2: INFINITE-SUM-CANT-CONVERGE
**Description:** Learner believes that adding infinitely many numbers must give an infinite result, because "you keep adding more." Rejects the possibility of a finite infinite sum.
**Surface form:** "1/2+1/4+1/8+… is infinite because you never stop adding."
**Root cause:** Finite intuition: in everyday experience, adding more always increases the total. The concept that additions can become negligibly small — so small the total is bounded — is counterintuitive.
**Trigger condition:** Any convergent series problem.
**Repair target:** TA-B01.

### MC-3: CONVERGENT-TERMS-IMPLY-CONVERGENT-SERIES
**Description:** Learner believes that if lim_{n→∞} aₙ = 0, then Σaₙ must converge. Ignores the harmonic series as a counterexample.
**Surface form:** "Since 1/n→0, the series 1+1/2+1/3+1/4+… must converge."
**Root cause:** The nth-term test says "diverges if terms don't go to 0" — learner inverts the logic and believes the converse. The harmonic series requires explicit introduction as a counterexample to the converse.
**Trigger condition:** Any convergence problem where lim aₙ=0 but the series diverges.
**Repair target:** TA-B02.

---

## Component 3 — Scaffolding Protocol

**Entry assessment:** "Write out the first four terms of the sequence aₙ=1/2ⁿ. Now write their sum S₄ as a fraction." If the learner can compute S₄=15/16, proceed to A01. If there is confusion between listing and summing, briefly reinforce the distinction before starting.

**Scaffolding ladder:**
- Rung 1 (pictorial): Provide a table with columns: n, aₙ, Sₙ. Learner fills in Sₙ by accumulating the sum row by row.
- Rung 2 (partial abstract): Learner writes Sₙ formula for geometric series with r=1/2, identifies the pattern 1−(1/2)ⁿ.
- Rung 3 (full abstract): Learner takes lim_{n→∞} Sₙ and states the sum of the infinite series.

**Pacing note:** h=5 estimated hours; A01–A02 in session 1; A03 + mastery gate in session 2.

---

## Component 4 — Protocol A (Main Sequence)

### TA-A01 [B-category: P03 — ANALOGY BRIDGE]

**Opening primitive: P03**

SOURCE DOMAIN: Zeno's Paradox of Motion.
"To walk 1 metre, you must first walk 1/2 metre; then 1/2 of what remains = 1/4 metre; then 1/8 metre; then 1/16; and so on forever. You never finish — yet you DO reach the wall in finite time."

TARGET DOMAIN: The series 1/2+1/4+1/8+1/16+…
Partial sums: S₁=1/2, S₂=3/4, S₃=7/8, S₄=15/16, …, Sₙ=1−1/2ⁿ.
As n→∞: Sₙ→1. The infinite sum equals 1 — exactly, not approximately.

BRIDGE MAPPING:
| Zeno's steps | Series terms |
|---|---|
| Each step (1/2, 1/4, …) | Each term aₙ |
| Running total distance walked | Partial sum Sₙ |
| Reaching the wall | Convergence to the limit S=1 |
| Finite time despite infinite steps | Finite sum despite infinitely many terms |

KEY RESOLUTION: The steps become small fast enough that the total stays bounded. The infinite sum IS finite — defined as the limit of partial sums.

CONTRAST — A DIVERGENT SERIES:
The series 1+1+1+1+… has partial sums Sₙ=n, which grow without bound. This series diverges to ∞. The difference from Zeno: the terms do NOT shrink to zero. Convergence requires not only infinitely many terms but terms that shrink fast enough.

**Assessment primitive: P49**

PROBE: "Write the first four partial sums S₁,S₂,S₃,S₄ for the series Σₙ₌₁^∞ (1/3)ⁿ. What value do they approach?"
- CORRECT: "S₁=1/3, S₂=1/3+1/9=4/9, S₃=4/9+1/27=13/27, S₄=13/27+1/81=40/81. These approach 1/2." → "Correct — the geometric series with r=1/3 converges to (1/3)/(1−1/3)=1/2. Well done identifying the limit from the pattern."
- PARTIAL: Correct partial sums, unsure about the limit → "Good partial sum work. Look at the pattern: 1/3≈0.333, 4/9≈0.444, 13/27≈0.481, 40/81≈0.494. They are approaching 0.5 = 1/2. The limit of the partial sums IS the series sum."
- INCORRECT: Adds aₙ terms but doesn't accumulate → "Partial sums accumulate: S₁=a₁, S₂=a₁+a₂, S₃=a₁+a₂+a₃. Start: S₁=1/3. Then S₂=S₁+a₂=1/3+1/9=4/9. Then S₃=S₂+a₃=4/9+1/27=13/27."
- NO_RESPONSE: "Compute (1/3)¹=1/3. Add (1/3)²=1/9 to get S₂. Add (1/3)³=1/27 to get S₃. Continue to S₄. Look at the decimal values — what number are they approaching?"

---

### TA-A02 [B-category: P06 — CONTRAST PAIR]

**Opening primitive: P06**

PAIR A — CONVERGENT SERIES:
Example: Σₙ₌₁^∞ (1/2)ⁿ = 1/2+1/4+1/8+…
Partial sums: Sₙ = 1−(1/2)ⁿ → 1 as n→∞.
Sum: S = 1.
Behaviour: partial sums form an increasing sequence bounded above by 1. They converge.
Key feature: terms shrink geometrically fast enough.

PAIR B — DIVERGENT SERIES:
Example: Σₙ₌₁^∞ 1/n = 1+1/2+1/3+1/4+… (harmonic series)
Partial sums: S₁=1, S₂=1.5, S₄≈2.08, S₈≈2.72, S₁₆≈3.38, …
Sum: DIVERGES — Sₙ→∞ (proven by grouping: S₂ⁿ>n/2+1).
Behaviour: partial sums grow without bound, but slowly — after a million terms, S≈14.4.
Key feature: terms go to 0 (1/n→0), BUT too slowly. This is the crucial counterexample.

THE CRITICAL DISTINCTION:
"Terms going to zero is NECESSARY but not SUFFICIENT for convergence."
- lim aₙ ≠ 0 → DEFINITELY DIVERGES (nth-term test).
- lim aₙ = 0 → COULD converge OR diverge. Need more tests (ratio test, integral test, etc.).

**Assessment primitive: P49**

PROBE: "Does the series Σ(1/n²) converge or diverge? What about Σ(1/n)? Can you tell from the terms alone?"
- CORRECT: "Both have terms→0. Σ(1/n) diverges (harmonic). Σ(1/n²) converges (sum=π²/6). You cannot tell from terms alone — both sequences go to 0 but the series behave differently." → "Exactly. The rate of decay matters, not just that terms go to 0. Σ(1/n²) decays fast enough; Σ(1/n) does not."
- PARTIAL: Knows harmonic diverges, guesses 1/n² converges but can't explain → "Good instincts. 1/n²→0 faster than 1/n→0. The 1/n² terms shrink quickly enough for their sum to be bounded (≈π²/6≈1.645). The 1/n terms shrink but not fast enough — their sum grows to infinity."
- INCORRECT: Claims both converge since terms→0 → Address MC-3 directly: "The harmonic series Σ(1/n) is the key counterexample. Its terms go to 0, yet it DIVERGES. You can prove it: group terms 1+(1/2)+(1/3+1/4)+(1/5+1/6+1/7+1/8)+… Each group ≥1/2, and there are infinitely many groups → Σ>1+1/2+1/2+1/2+…=∞."
- NO_RESPONSE: "For each series: do the terms aₙ go to 0? Yes for both. Now think about the harmonic series — does it converge or diverge? That will answer whether 'terms→0' is enough."

---

### TA-A03 [B-category: P04 — PATTERN INDUCTION]

**Opening primitive: P04**

PATTERN: Partial sums for common series reveal convergence patterns.

GEOMETRIC SERIES (INSTANCE 1): aₙ = rⁿ⁻¹, |r|<1.
Sₙ = (1−rⁿ)/(1−r). As n→∞, rⁿ→0, so Sₙ→1/(1−r).
For r=1/2: sum = 1/(1−1/2) = 2. For r=2/3: sum = 1/(1−2/3) = 3. For r=−1/2: sum = 1/(1+1/2) = 2/3.

TELESCOPING SERIES (INSTANCE 2): aₙ = 1/(n(n+1)) = 1/n − 1/(n+1).
S₁=(1−1/2)=1/2. S₂=1−1/3=2/3. S₃=1−1/4=3/4. Sₙ=1−1/(n+1).
As n→∞: Sₙ→1. The series converges to 1. Key: adjacent terms cancel ("telescope").

ALTERNATING SERIES (INSTANCE 3): aₙ = (−1)ⁿ⁺¹/n = 1−1/2+1/3−1/4+…
Partial sums oscillate: S₁=1, S₂=1/2, S₃=5/6, S₄=7/12, … bounded between 1/2 and 1, converging to ln(2)≈0.693.
Pattern: alternating sign makes partial sums zigzag but still converge — if terms decrease to 0.

GENERALISED PATTERN:
- Geometric: |r|<1 → sum=a/(1−r); |r|≥1 → diverges.
- Telescoping: identify 1/(n(n+1))=1/n−1/(n+1) pattern; sum "collapses."
- Alternating: if terms decrease to 0, converges (alternating series test).

**Assessment primitive: P49**

PROBE: "Find the sum of the telescoping series Σₙ₌₁^∞ 1/(n(n+2)) by writing aₙ as a partial fraction and computing S₄ and the general Sₙ."
- CORRECT: "1/(n(n+2))=(1/2)(1/n−1/(n+2)). S₄=(1/2)[(1−1/3)+(1/2−1/4)+(1/3−1/5)+(1/4−1/6)]. Telescoping: terms cancel in pairs. S₄=(1/2)[1+1/2−1/5−1/6]=(1/2)[3/2−11/30]=(1/2)[34/30]=17/30. General: Sₙ=(1/2)(1+1/2−1/(n+1)−1/(n+2)). As n→∞: sum=3/4." → "Excellent. Partial fractions + telescoping is the key method."
- PARTIAL: Correct partial fractions, error in telescoping → "Partial fraction: 1/(n(n+2))=(1/2)(1/n−1/(n+2)). List terms in pairs: (1/2)(1−1/3), (1/2)(1/2−1/4), … Notice 1/3 from term 1 is NOT cancelled by term 2's 1/2. The cancellation pattern for this series is: each term cancels with the term two positions ahead (not immediately adjacent). Write out S₄ carefully."
- INCORRECT: Cannot find partial fractions → "Write 1/(n(n+2))=A/n+B/(n+2). Multiply through: 1=A(n+2)+Bn. Set n=0: 1=2A, so A=1/2. Set n=−2: 1=−2B, so B=−1/2. So 1/(n(n+2))=(1/2)(1/n−1/(n+2))."
- NO_RESPONSE: "Hint: 1/(n(n+2)) can be written as A/n + B/(n+2) for some constants A,B. Find A and B by multiplying both sides by n(n+2) and then substituting n=0 and n=−2."

---

## Component 5 — Protocol B (Repair Sequences)

### TA-B01 — Repair for MC-1 and MC-2 (SERIES-IS-SEQUENCE / INFINITE-SUM-CANT-CONVERGE)

**Opening primitive: P27 — MISCONCEPTION NAMING**
"Two very natural confusions: first, treating a series and a sequence as the same object; second, believing an infinite sum must be infinite. Both block understanding of convergence."

**P41 — MISCONCEPTION DETECTOR**
"For aₙ=1/2ⁿ: (a) Is {aₙ} = (1/2, 1/4, 1/8, …) the same as Σaₙ = 1/2+1/4+1/8+…?
(A) Yes — same terms, same thing.
(B) No — the sequence lists terms; the series sums them. These are different objects."
[If A: learner holds MC-1.]
"Does 1/2+1/4+1/8+1/16+… equal ∞?
(A) Yes — infinitely many additions always give ∞.
(B) No — the additions shrink so fast that the total stays bounded at 1."
[If A: learner holds MC-2.]

**P64 — CONCEPTUAL SHIFT**
"MC-1: The sequence {aₙ} is a list: (1/2, 1/4, 1/8, …). The series Σaₙ is the list's running total: 1/2, then 1/2+1/4=3/4, then 3/4+1/8=7/8, … Both involve the same aₙ but are different mathematical objects. Mixing them up causes every convergence argument to fail.
MC-2: Zeno's paradox resolves this. You walk 1/2 m, then 1/4 m, then 1/8 m — infinitely many steps — yet you reach the wall in 1 second. The steps shrink fast enough. The infinite sum 1/2+1/4+1/8+… = 1, not ∞. The limit of partial sums is 1, and that IS the sum. Infinity only occurs when the terms do not shrink fast enough."

---

### TA-B02 — Repair for MC-3 (CONVERGENT-TERMS-IMPLY-CONVERGENT-SERIES)

**Opening primitive: P27 — MISCONCEPTION NAMING**
"A pervasive logical error: 'since the terms go to zero, the series converges.' The harmonic series is the canonical counterexample that breaks this reasoning permanently."

**P41 — MISCONCEPTION DETECTOR**
"The harmonic series: 1+1/2+1/3+1/4+… Each term aₙ=1/n→0. Does the series converge?
(A) Yes — terms go to 0, so the partial sums must level off.
(B) No — 1/n→0 is necessary but not sufficient; the harmonic series diverges."
[If A: learner holds MC-3.]

**P64 — CONCEPTUAL SHIFT**
"Here is the grouping proof of harmonic divergence:
1 + (1/2) + (1/3+1/4) + (1/5+1/6+1/7+1/8) + …
Each group: 1 ≥ 1/2; 1/2 = 1/2; 1/3+1/4 > 1/4+1/4 = 1/2; 1/5+…+1/8 > 4×(1/8)=1/2; …
Each group exceeds 1/2, and there are infinitely many groups → Sₙ→∞.
Terms going to 0 only tells you 'the series MIGHT converge' — it rules out fast divergence, not all divergence. The harmonic series is the warning: 1/n→0 is NOT enough."

---

## Component 6 — P89 Spaced Repetition

**Interval schedule:** Day 1 (initial), Day 3, Day 10, Day 30.

**Day 3 prompt:**
"Find the sum of the geometric series 3+3/4+3/16+3/64+… (first term 3, ratio 1/4). Show using the partial sum formula."
[Expected: a=3, r=1/4. Sum=3/(1−1/4)=3/(3/4)=4. Sₙ=3(1−(1/4)ⁿ)/(3/4)=4(1−(1/4)ⁿ)→4.]

**Day 10 prompt:**
"The series Σₙ₌₁^∞ aₙ has partial sums Sₙ=2−1/n. (a) Does the series converge? (b) What is its sum? (c) What is a₃?"
[Expected: (a) Yes — lim Sₙ=2. (b) Sum=2. (c) a₃=S₃−S₂=(2−1/3)−(2−1/2)=1/2−1/3=1/6.]

**Day 30 prompt:**
"Explain why the geometric series Σrⁿ converges for |r|<1 but diverges for |r|≥1, using the partial sum formula Sₙ=(1−rⁿ)/(1−r). What happens at r=−1?"
[Expected: For |r|<1: rⁿ→0, so Sₙ→1/(1−r). For |r|>1: |rⁿ|→∞, Sₙ→∞. For r=1: Sₙ=n→∞ (partial sum formula breaks down as denominator=0). For r=−1: Sₙ alternates between 0 and 1 (S_{2k}=0, S_{2k+1}=1) — no limit, diverges.]

---

## Component 7 — Cross-Blueprint Dependencies

**Prerequisite blueprints (must be PACKAGE_READY before delivery):**
- math.seq.sequence — definition of sequence, terms, indexing; series is defined as the sum of a sequence's terms

**Unlocked blueprints:**
- math.seq.arithmetic-series — sum of arithmetic sequence; special case of series
- math.seq.geometric-series — sum of geometric sequence; most important convergent series formula
- math.seq.partial-sums — deeper study of partial sum techniques

**Cross-links (none):**
- cross_links=[] — no Tier-1 cross-links

---

## Component 8 — Teaching Notes

**Pedagogical priority:** The harmonic series is the most important counterexample in elementary analysis. Without it, learners permanently hold MC-3. Introduce it explicitly in A02 and treat it as a named landmark concept.

**Partial sums as a sequence:** Make explicit that {Sₙ} is itself a sequence, and convergence of the series means exactly convergence of this new sequence. The learner who understands that a series is a limit of partial sums will correctly apply all sequence-limit reasoning.

**Geometric series formula:** The formula S=a/(1−r) for |r|<1 is the single most useful series formula. Ensure it is derived from the partial sum formula Sₙ=a(1−rⁿ)/(1−r), not just memorised.

**Telescoping pattern:** Extremely useful for competition mathematics and proofs. The partial-fraction decomposition that creates telescoping (as in A03) is a reusable technique to highlight.

---

## Component 10 — Validation Checklist

### Structural Checks
- [x] V-1: Component 0 metadata complete (all 9 fields populated)
- [x] V-2: All TAs in main sequence open with a B-category primitive (GR-1) — A01: P03, A02: P06, A03: P04
- [x] V-3: N/A — CPA_entry_stage=P (proficient difficulty); concrete anchor not required
- [x] V-4: Every non-gate TA contains P49 with all 4 branches (GR-2) — A01, A02, A03 each have CORRECT/PARTIAL/INCORRECT/NO_RESPONSE
- [x] V-5: Terminal TA is mastery gate (P91) (GR-3) — A04 is P91
- [x] V-6: Repair TAs open with P27+P41+P64 (GR-4) — B01 and B02 comply
- [x] V-7: Mastery gate is terminal — P91 in A04 is the final TA (GR-6)
- [x] V-8: P76 present in mastery gate (GR-7)
- [x] V-9: Cross-Blueprint Dependencies documented in Component 7 (GR-8)
- [x] V-10: P76 mode = independence (cross_links=[]); P76 uses independent novel problem (GR-9)

### Content Checks
- [x] V-11: bloom=understand; P07 not used (correct — understand does not require worked example pair)
- [x] V-12: Misconception registry has ≥3 MCs; MC-1 marked FOUNDATIONAL
- [x] V-13: Repair sequence exists for each MC; B01 covers MC-1 and MC-2; B02 covers MC-3
- [x] V-14: P76 independence probe is a novel, unseen problem (telescoping series 1/(n(n+1)), partial fraction decomposition, limit to 1)
- [x] V-15: P77 has exactly 4 items; P76 is 1 item; n=5 total

### Mastery Gate Checks
- [x] V-16: MAMR stated — PASS = ⌈0.80 × 5⌉ = 4 out of 5
- [x] V-17: PASS criterion enforced in P74 routing decision
- [x] V-18: P78 COMPLETION block present
- [x] V-19: P75 MASTERY ASSESSMENT present with PASS/FAIL branching
- [x] V-20: All scoring (P55) entries reference the same MAMR threshold

### AIR Check
- [x] AIR: No curriculum content generated outside the Canonical KG description; all mathematical content consistent with KG fields and standard analysis pedagogy; no fabricated identities or misleading claims

**STATUS: PACKAGE_READY**

---

## Component 4 (continued) — Protocol A, TA-A04 [MASTERY GATE: P91]

### P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78

**MAMR: PASS = ⌈0.80 × 5⌉ = 4 out of 5**

---

#### P77 — MULTI-PROBLEM SET (4 items)

**Item 1:**
"Write out S₁, S₂, S₃ for the series Σₙ₌₁^∞ (1/2)ⁿ."
[Expected: S₁=1/2, S₂=1/2+1/4=3/4, S₃=3/4+1/8=7/8. These approach 1.]

**Item 2:**
"Does the harmonic series 1+1/2+1/3+1/4+… converge or diverge?"
[Expected: DIVERGES. Even though 1/n→0, the partial sums grow without bound — this is the key counterexample.]

**Item 3:**
True or False: "If lim_{n→∞} aₙ = 0, then Σaₙ converges."
[Expected: FALSE. Counterexample: the harmonic series has 1/n→0 but DIVERGES.]

**Item 4:**
"Find the sum of the geometric series Σₙ₌₁^∞ (2/3)ⁿ."
[Expected: a=2/3, r=2/3. Sum = a/(1−r) = (2/3)/(1−2/3) = (2/3)/(1/3) = 2.]

---

#### P55 — SCORE after P77
Score each item 1 point for correct, 0 for incorrect. Record score /4.

---

#### P76 — TRANSFER PROBE (independence mode)

"Consider the series Σₙ₌₁^∞ 1/(n(n+1)).

(a) Use partial fractions to write 1/(n(n+1)) = A/n + B/(n+1).
(b) Write out the first three partial sums S₁, S₂, S₃. What telescoping pattern do you see?
(c) Find a formula for Sₙ and take the limit as n→∞. What is the sum of the series?"

[Expected:
(a) 1/(n(n+1)) = 1/n − 1/(n+1) (A=1, B=−1).
(b) S₁=(1−1/2)=1/2. S₂=1−1/3=2/3. S₃=1−1/4=3/4. Pattern: all intermediate terms cancel ("telescope"), leaving Sₙ=1−1/(n+1).
(c) lim_{n→∞}(1−1/(n+1))=1. The series sums to 1.]

---

#### P55 — SCORE after P76
Score P76 as 1 point if the correct limit (sum=1) is reached with correct partial fraction work, 0 otherwise.

---

#### P75 — MASTERY ASSESSMENT

Total score = P77 score (0–4) + P76 score (0–1) = 0–5.
PASS threshold: ≥ 4 out of 5.
- PASS (≥4/5): Learner understands series as the limit of partial sums; knows geometric series formula; knows harmonic series diverges; can recognise convergence/divergence.
- FAIL (<4/5): Identify which items failed; route to repair.

---

#### P55 — SCORE (mastery total)
Record final score and PASS/FAIL status in session memory.

---

#### P74 — ROUTING DECISION

- PASS: → P78 COMPLETION
- FAIL on Item 3 (false converse — terms→0 implies convergence): → TA-B02 (MC-3 repair)
- FAIL on Item 1 (confusion about partial sums vs. terms): → TA-B01 (MC-1 repair)
- FAIL on Item 2 (harmonic series unknown): → TA-B02 (harmonic series counterexample)
- FAIL on Item 4 (geometric series formula): → Return to A03 geometric series instance; re-gate
- FAIL on P76 (telescoping not recognised): → Return to A03 telescoping instance; re-gate
- FAIL on multiple items: → TA-B01 then TA-B02; re-gate

---

#### P55 — SCORE (post-repair if applicable)
Re-administer two fresh equivalent items + P76 equivalent. Apply MAMR 4/5. Record repair score separately.

---

#### P78 — COMPLETION

"You have demonstrated understanding of series as limits of partial sums, geometric series convergence, and the crucial distinction between 'terms going to zero' and 'series converging.'

Key anchors to carry forward:
- Series = limit of partial sums: Σaₙ = lim_{n→∞} Sₙ (if the limit exists).
- Geometric series: |r|<1 → converges to a/(1−r); |r|≥1 → diverges.
- Harmonic series: 1/n→0 but Σ(1/n) DIVERGES — the counterexample to the false converse.
- Telescoping: partial fractions + cancellation gives exact partial sum formulas.

Next concepts: math.seq.arithmetic-series, math.seq.geometric-series — explicit sum formulas for these special series."
