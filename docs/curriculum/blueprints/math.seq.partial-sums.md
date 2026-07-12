# Teaching Blueprint — math.seq.partial-sums

## Component 0 — Metadata
concept_id: math.seq.partial-sums
concept_name: Partial Sums
blueprint_version: 1.0
spec_version: Teaching Blueprint Specification v1.0
status: PACKAGE_READY
difficulty: proficient
bloom: understand
estimated_hours: 3
mastery_threshold: 0.85
CPA_entry_stage: P
requires: [math.seq.series]
cross_links: []
P76_mode: independence

---

## Component 1 — Cognitive Map

**Core concept:** The nth partial sum of a series Σaₙ is Sₙ = a₁+a₂+…+aₙ — the sum of the first n terms. The sequence {Sₙ} is distinct from the original sequence {aₙ}. The series Σaₙ CONVERGES to S if and only if lim_{n→∞} Sₙ = S. Each individual Sₙ is a finite approximation to the series sum; the limit of {Sₙ} IS the sum.

**Conceptual progression:**
1. Definition: Sₙ = Σₖ₌₁ⁿ aₖ — running sum of the first n terms.
2. {Sₙ} is a new sequence: its domain is ℕ, its terms are cumulative totals, not the original terms aₙ.
3. Relationship: aₙ = Sₙ − Sₙ₋₁ for n≥2; a₁=S₁. Recovering original terms from partial sums.
4. Convergence link: series converges ↔ {Sₙ} converges. This is the definition, not an extra theorem.
5. Partial sums may be non-monotone: negative terms cause Sₙ to decrease at some steps (alternating series).
6. Recovering the series sum from {Sₙ}: if Sₙ = f(n) is known, lim_{n→∞} f(n) gives the sum.

**CPA arc (entry: P):**
- Pictorial: table with columns n, aₙ, Sₙ; running-sum bar chart showing accumulation; graph of {Sₙ} as a step function approaching a horizontal asymptote (or diverging)
- Abstract: Sₙ = Σₖ₌₁ⁿ aₖ; aₙ = Sₙ − Sₙ₋₁; lim Sₙ = S (convergence)

**Prior knowledge activated:** series definition (Σaₙ as limit of partial sums); sequence convergence (lim aₙ); subtraction of consecutive terms

---

## Component 2 — Misconception Registry

### MC-1: PARTIAL-SUM-IS-THE-SERIES-SUM [FOUNDATIONAL]
**Description:** Learner treats S₅ (or S₁₀₀) as the actual sum of the series Σaₙ, not as an approximation. Does not understand that the series sum is the LIMIT of {Sₙ}, not any finite partial sum.
**Surface form:** "The sum of the series is S₅ = 31/32 because I computed five terms."
**Root cause:** Direct computation is natural; taking a limit is an additional abstract step. Learner conflates what they computed with what the question asked.
**Trigger condition:** Any problem asking for the exact sum of a convergent infinite series.
**Repair target:** TA-B01.

### MC-2: PARTIAL-SUMS-ALWAYS-INCREASE
**Description:** Learner believes {Sₙ} must be monotone increasing, since "adding more terms makes the sum bigger." Does not account for negative terms, which cause Sₙ to decrease at some steps.
**Surface form:** "After S₃=5/6, S₄ must be larger than 5/6."
**Root cause:** Experience with positive-term series only. The alternating series 1−1/2+1/3−1/4+… has oscillating partial sums that increase at odd steps and decrease at even steps.
**Trigger condition:** Any series with negative or alternating terms.
**Repair target:** TA-B01.

### MC-3: SEQUENCE-OF-PARTIAL-SUMS-IS-ORIGINAL-SEQUENCE
**Description:** Learner confuses {Sₙ} with {aₙ}, treating partial sums and the original sequence as the same object.
**Surface form:** "S₃ = a₃" or "the partial sum sequence is just the series terms."
**Root cause:** Both {Sₙ} and {aₙ} are sequences indexed by n. The difference — cumulative total vs. individual term — requires explicit contrast.
**Trigger condition:** Any problem that distinguishes between a term aₙ and a partial sum Sₙ.
**Repair target:** TA-B02.

---

## Component 3 — Scaffolding Protocol

**Entry assessment:** "For the series Σₙ₌₁^∞ (1/2)ⁿ, write out S₁ and S₂." If the learner correctly writes S₁=1/2 and S₂=3/4 (not S₂=1/4), the partial sum concept is beginning to form. If S₂=1/4 (term only, not cumulative), address MC-3 immediately before continuing.

**Scaffolding ladder:**
- Rung 1 (pictorial): Provide a table with n, aₙ, Sₙ for aₙ=(1/2)ⁿ through n=5. Learner fills in only the Sₙ column.
- Rung 2 (partial abstract): Given Sₙ formula, learner computes S₃, S₁₀, and the limit.
- Rung 3 (full abstract): Given {Sₙ} formula, learner recovers aₙ using aₙ=Sₙ−Sₙ₋₁.

**Pacing note:** h=3 estimated hours — compact concept. Deliver both TAs and mastery gate in a single session.

---

## Component 4 — Protocol A (Main Sequence)

### TA-A01 [B-category: P11 — REPRESENTATION SHIFT]

**Opening primitive: P11**

REPRESENTATION 1 — TABLE:
For aₙ = (−1)ⁿ⁺¹/n (alternating harmonic series):

| n | aₙ | Sₙ |
|---|----|----|
| 1 | +1 | 1 |
| 2 | −1/2 | 1/2 |
| 3 | +1/3 | 5/6 |
| 4 | −1/4 | 7/12 |
| 5 | +1/5 | 47/60 |

"Notice: Sₙ is NOT always larger than Sₙ₋₁. When aₙ is negative, the partial sum DECREASES."

REPRESENTATION 2 — GRAPH:
Plot Sₙ on the vertical axis vs. n on the horizontal axis:
- Odd-indexed partial sums form a decreasing sequence approaching ln(2)≈0.693 from above.
- Even-indexed partial sums form an increasing sequence approaching ln(2) from below.
- Both subsequences converge to the same limit: ln(2) ≈ 0.693.

The series SUM is ln(2) — not S₅=47/60≈0.783, not any finite partial sum. The graph shows the oscillating convergence visually.

REPRESENTATION 3 — ABSTRACT:
Sₙ = Σₖ₌₁ⁿ (−1)ᵏ⁺¹/k.
lim_{n→∞} Sₙ = ln(2) (known result; proof uses Taylor series or integral test).
Series sum = ln(2). S₅ is an approximation; the limit is exact.

THREE OBJECTS TO DISTINGUISH:
- Sequence of terms: {aₙ} = (1, −1/2, 1/3, −1/4, …) — the individual terms.
- Sequence of partial sums: {Sₙ} = (1, 1/2, 5/6, 7/12, …) — cumulative totals.
- Series sum: S = lim_{n→∞} Sₙ = ln(2) — the limit (if it exists).

**Assessment primitive: P49**

PROBE: "For aₙ=(−1)ⁿ⁺¹, compute S₁,S₂,S₃,S₄. Do the partial sums form an increasing sequence?"
- CORRECT: "S₁=1, S₂=0, S₃=1, S₄=0. The partial sums alternate between 0 and 1 — they do not converge. The series Σ(−1)ⁿ⁺¹ DIVERGES (partial sums oscillate without settling)." → "Correct. Oscillating partial sums that don't converge → divergent series. This is different from the alternating harmonic series where partial sums oscillate but DO converge."
- PARTIAL: Correct partial sums, incorrect conclusion about increase → "S₂=0<S₁=1, so the partial sums do NOT always increase. Negative terms decrease Sₙ. In this case, the oscillation between 0 and 1 means {Sₙ} has no limit → the series diverges."
- INCORRECT: S₂=−1 (signed error) or S₃=2 (wrong accumulation) → "Accumulate: S₁=a₁=1. S₂=S₁+a₂=1+(−1)=0. S₃=S₂+a₃=0+1=1. S₄=S₃+a₄=1+(−1)=0."
- NO_RESPONSE: "Start with S₁=a₁=1. Then S₂=S₁+a₂. Note a₂=(−1)²⁺¹=−1. So S₂=1+(−1)=0. Continue similarly for S₃ and S₄."

---

### TA-A02 [B-category: P04 — PATTERN INDUCTION]

**Opening primitive: P04**

PATTERN: From a formula for Sₙ, recover the series sum and the original terms.

INSTANCE 1: Sₙ = 1 − (1/2)ⁿ.
- Series sum: lim_{n→∞}(1−(1/2)ⁿ)=1−0=1. Series converges to 1.
- Recover a₁: a₁=S₁=1−1/2=1/2.
- Recover a₂: a₂=S₂−S₁=(1−1/4)−(1−1/2)=3/4−1/2=1/4.
- Recover aₙ for n≥2: aₙ=Sₙ−Sₙ₋₁=(1−(1/2)ⁿ)−(1−(1/2)ⁿ⁻¹)=(1/2)ⁿ⁻¹−(1/2)ⁿ=(1/2)ⁿ⁻¹(1−1/2)=(1/2)ⁿ.
So aₙ=(1/2)ⁿ — confirms the original geometric series with first term 1/2 and ratio 1/2.

INSTANCE 2: Sₙ = n/(n+1).
- Series sum: lim_{n→∞} n/(n+1)=1. Converges to 1.
- a₁=S₁=1/2.
- a₂=S₂−S₁=2/3−1/2=1/6.
- a₃=S₃−S₂=3/4−2/3=1/12.
- General: aₙ=Sₙ−Sₙ₋₁=n/(n+1)−(n−1)/n=(n²−(n−1)(n+1))/(n(n+1))=(n²−n²+1)/(n(n+1))=1/(n(n+1)).
So the series is 1/(1·2)+1/(2·3)+1/(3·4)+… = the telescoping series from math.seq.series, which we already know converges to 1.

INSTANCE 3: Sₙ = n (divergent).
- Limit: lim_{n→∞} n=∞. Diverges.
- aₙ=Sₙ−Sₙ₋₁=n−(n−1)=1 for n≥2; a₁=1.
- So the series is 1+1+1+… — diverges to ∞ as expected.

GENERALISED PATTERN:
Given Sₙ:
1. Take the limit → series sum (or divergence).
2. Compute Sₙ−Sₙ₋₁ → recover aₙ (for n≥2).
The partial sum sequence {Sₙ} and the term sequence {aₙ} are two different sequences built from the same data, related by Sₙ = Sₙ₋₁+aₙ.

**Assessment primitive: P49**

PROBE: "Given Sₙ = 3−2/n: (a) Does the series converge? If so, to what? (b) Find a₄."
- CORRECT: "(a) lim_{n→∞}(3−2/n)=3. Converges to 3. (b) a₄=S₄−S₃=(3−2/4)−(3−2/3)=2/3−1/2=1/6." → "Both correct. Limit gives the sum; difference gives the term."
- PARTIAL: Correct limit, wrong a₄ → "a₄=S₄−S₃. S₄=3−2/4=3−1/2=5/2. S₃=3−2/3=7/3. a₄=5/2−7/3=15/6−14/6=1/6."
- INCORRECT: Reports a₄=S₄ instead of Sₙ−Sₙ₋₁ → "a₄ is the FOURTH TERM of the series, not S₄. The fourth partial sum S₄=5/2 includes all four terms. The fourth TERM is a₄=S₄−S₃."
- NO_RESPONSE: "(a) What does 3−2/n approach as n gets very large? (b) Recall aₙ=Sₙ−Sₙ₋₁. Compute S₄ and S₃ separately, then subtract."

---

## Component 5 — Protocol B (Repair Sequences)

### TA-B01 — Repair for MC-1 and MC-2 (PARTIAL-SUM-IS-SUM / SUMS-ALWAYS-INCREASE)

**Opening primitive: P27 — MISCONCEPTION NAMING**
"Two paired misconceptions: treating a finite partial sum as the complete series sum, and expecting partial sums to always increase. Both are resolved by holding the sequence {Sₙ} and its limit separately in mind."

**P41 — MISCONCEPTION DETECTOR**
"The series Σ(1/2)ⁿ converges to 1. Is S₁₀₀=1−(1/2)¹⁰⁰ the sum of the series?
(A) Yes — after 100 terms, it's essentially 1.
(B) No — S₁₀₀ is an approximation; the exact sum is lim_{n→∞} Sₙ=1."
[If A: learner holds MC-1.]
"For the alternating series aₙ=(−1)ⁿ⁺¹/n: is S₄>S₃?
(A) Yes — adding more terms always increases the partial sum.
(B) No — a₄=−1/4<0, so S₄=S₃+a₄<S₃."
[If A: learner holds MC-2.]

**P64 — CONCEPTUAL SHIFT**
"MC-1: The series sum is a LIMIT — the number the partial sums APPROACH, not any particular partial sum. S₁₀₀=1−(1/2)¹⁰⁰ is within (1/2)¹⁰⁰≈10⁻³⁰ of 1, but it IS NOT 1. The limit is the definition; the approximation is a computation convenience. Using '≈' instead of '=' preserves mathematical precision.
MC-2: When aₙ<0, adding it to Sₙ₋₁ DECREASES Sₙ. The partial sums of an alternating series oscillate — even partial sums increase, odd partial sums decrease (or vice versa), with both subsequences converging to the same limit. A sequence can converge to a limit without being monotone."

---

### TA-B02 — Repair for MC-3 (PARTIAL-SUMS-ARE-ORIGINAL-TERMS)

**Opening primitive: P27 — MISCONCEPTION NAMING**
"A confusion between two sequences that share the same index n: {aₙ} (the original terms) and {Sₙ} (their running sums). They are different sequences — knowing one doesn't immediately give the other without computation."

**P41 — MISCONCEPTION DETECTOR**
"For the series with aₙ=1/n: what is S₃?
(A) 1/3 (= a₃ — just the third term)
(B) 1+1/2+1/3=11/6 (= S₁+S₂ cumulated... wait, = a₁+a₂+a₃)"
[Correct answer is (B): S₃=a₁+a₂+a₃=1+1/2+1/3=11/6. If learner chooses (A): learner holds MC-3.]

**P64 — CONCEPTUAL SHIFT**
"aₙ is the nth TERM: just the value of the nth summand. a₃=1/3 for the harmonic series.
Sₙ is the nth PARTIAL SUM: the SUM of ALL terms from a₁ to aₙ. S₃=a₁+a₂+a₃=1+1/2+1/3=11/6.
They are related: S₃=S₂+a₃ (add the newest term to the previous sum), and a₃=S₃−S₂ (new term = difference of consecutive partial sums). Two different sequences, two different numbers at n=3: a₃=1/3≈0.333 vs. S₃=11/6≈1.833."

---

## Component 6 — P89 Spaced Repetition

**Interval schedule:** Day 1 (initial), Day 3, Day 10, Day 30.

**Day 3 prompt:**
"The partial sums of a series satisfy Sₙ = (2n+1)/(n+1). (a) Does the series converge? (b) Find a₂."
[Expected: (a) lim(2n+1)/(n+1)=2. Converges to 2. (b) a₂=S₂−S₁=5/3−3/2=10/6−9/6=1/6.]

**Day 10 prompt:**
"A series has Sₙ=√n. Does the series converge or diverge? What is aₙ for large n?"
[Expected: lim_{n→∞}√n=∞ → diverges. aₙ=√n−√(n−1)=1/(√n+√(n−1))≈1/(2√n)→0. This is another example where aₙ→0 but Σaₙ diverges.]

**Day 30 prompt:**
"Prove: if Σaₙ converges, then lim_{n→∞} aₙ=0. (Hint: aₙ=Sₙ−Sₙ₋₁.)"
[Expected: Let S=lim_{n→∞} Sₙ. Then lim aₙ=lim(Sₙ−Sₙ₋₁)=lim Sₙ−lim Sₙ₋₁=S−S=0. The key is that both Sₙ and Sₙ₋₁ converge to the same limit S.]

---

## Component 7 — Cross-Blueprint Dependencies

**Prerequisite blueprints (must be PACKAGE_READY before delivery):**
- math.seq.series — definition of series as limit of partial sums; partial sums are the formal object behind this definition

**Unlocked blueprints:**
- math.seq.series-convergence — formal convergence tests (ratio test, integral test, comparison); all require understanding that convergence means {Sₙ} converges

**Cross-links (none):**
- cross_links=[] — no Tier-1 cross-links

---

## Component 8 — Teaching Notes

**Pedagogical priority:** The core distinction is between a partial sum (finite computation) and the series sum (a limit). This distinction must be stated explicitly at least twice — in A01 and again in A02. Learners who master this are ready for convergence tests; those who don't will confuse every subsequent test.

**Alternating signs:** The alternating harmonic series is the best example for showing that {Sₙ} need not be monotone. Use the table in A01 to make this visible before stating it abstractly.

**Recovering terms:** The formula aₙ=Sₙ−Sₙ₋₁ is a useful inverse operation. This appears in convergence proofs (lim aₙ=lim(Sₙ−Sₙ₋₁)=0) and in constructing series from a given partial sum sequence. Ensure learners can move in both directions.

---

## Component 10 — Validation Checklist

### Structural Checks
- [x] V-1: Component 0 metadata complete (all 9 fields populated)
- [x] V-2: All TAs in main sequence open with a B-category primitive (GR-1) — A01: P11, A02: P04
- [x] V-3: N/A — CPA_entry_stage=P (proficient difficulty); concrete anchor not required
- [x] V-4: Every non-gate TA contains P49 with all 4 branches (GR-2) — A01 and A02 each have CORRECT/PARTIAL/INCORRECT/NO_RESPONSE
- [x] V-5: Terminal TA is mastery gate (P91) (GR-3) — A03 is P91
- [x] V-6: Repair TAs open with P27+P41+P64 (GR-4) — B01 and B02 comply
- [x] V-7: Mastery gate is terminal — P91 in A03 is the final TA (GR-6)
- [x] V-8: P76 present in mastery gate (GR-7)
- [x] V-9: Cross-Blueprint Dependencies documented in Component 7 (GR-8)
- [x] V-10: P76 mode = independence (cross_links=[]); P76 uses independent novel problem (GR-9)

### Content Checks
- [x] V-11: bloom=understand; P07 not used (correct — understand does not require worked example pair)
- [x] V-12: Misconception registry has ≥3 MCs; MC-1 marked FOUNDATIONAL
- [x] V-13: Repair sequence exists for each MC; B01 covers MC-1 and MC-2; B02 covers MC-3
- [x] V-14: P76 independence probe is a novel, unseen problem (Sₙ=2n/(n+1); recover sum and general term)
- [x] V-15: P77 has exactly 4 items; P76 is 1 item; n=5 total

### Mastery Gate Checks
- [x] V-16: MAMR stated — PASS = ⌈0.85 × 5⌉ = ⌈4.25⌉ = 5 out of 5
- [x] V-17: PASS criterion enforced in P74 routing decision
- [x] V-18: P78 COMPLETION block present
- [x] V-19: P75 MASTERY ASSESSMENT present with PASS/FAIL branching
- [x] V-20: All scoring (P55) entries reference the same MAMR threshold

### AIR Check
- [x] AIR: No curriculum content generated outside the Canonical KG description; all mathematical content consistent with KG fields and standard analysis pedagogy; no fabricated identities or misleading claims

**STATUS: PACKAGE_READY**

---

## Component 4 (continued) — Protocol A, TA-A03 [MASTERY GATE: P91]

### P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78

**MAMR: PASS = ⌈0.85 × 5⌉ = 5 out of 5**

---

#### P77 — MULTI-PROBLEM SET (4 items)

**Item 1:**
"For aₙ=(−1)ⁿ⁺¹/n, compute S₁, S₂, S₃, S₄. Do the partial sums always increase?"
[Expected: S₁=1, S₂=1/2, S₃=5/6, S₄=7/12. No — S₂<S₁ and S₄<S₃ because negative terms decrease the running total.]

**Item 2:**
"The series Σaₙ converges to 5. Does S₁₀₀ = 5?"
[Expected: No. S₁₀₀ is the sum of the first 100 terms — a finite approximation. The series SUM equals lim_{n→∞} Sₙ = 5, not any specific Sₙ.]

**Item 3:**
True or False: "The series Σaₙ converges if and only if the sequence {Sₙ} converges."
[Expected: TRUE — this is the definition of series convergence. The two statements are equivalent by definition.]

**Item 4:**
"Given Sₙ = 1 − 1/2ⁿ, find a₃."
[Expected: a₃ = S₃ − S₂ = (1−1/8) − (1−1/4) = 7/8 − 3/4 = 1/8.]

---

#### P55 — SCORE after P77
Score each item 1 point for correct, 0 for incorrect. Record score /4.

---

#### P76 — TRANSFER PROBE (independence mode)

"The sequence of partial sums of a series is given by Sₙ = 2n/(n+1).

(a) Does the series Σaₙ converge? If so, find its sum.
(b) Find a general formula for aₙ for n ≥ 2.
(c) What is a₁?"

[Expected:
(a) lim_{n→∞} 2n/(n+1) = lim 2/(1+1/n) = 2. The series converges to 2.
(b) aₙ = Sₙ − Sₙ₋₁ = 2n/(n+1) − 2(n−1)/n = [2n² − 2(n−1)(n+1)] / [n(n+1)]
= [2n² − 2(n²−1)] / [n(n+1)] = 2 / [n(n+1)].
(c) a₁ = S₁ = 2·1/(1+1) = 2/2 = 1. (This is different from the formula 2/(n(n+1)): at n=1, 2/(1·2)=1, so the formula holds for all n≥1.)]

---

#### P55 — SCORE after P76
Score P76 as 1 point if the series sum (2) is found correctly in (a) AND the formula aₙ=2/(n(n+1)) is recovered correctly in (b). Award 0 if either is wrong.

---

#### P75 — MASTERY ASSESSMENT

Total score = P77 score (0–4) + P76 score (0–1) = 0–5.
PASS threshold: 5 out of 5.
- PASS (5/5): Learner understands partial sums as cumulative totals, series convergence as limit of partial sums, monotonicity failure for negative terms, and can recover original terms from Sₙ.
- FAIL (<5/5): Identify which items failed; route to repair.

---

#### P55 — SCORE (mastery total)
Record final score and PASS/FAIL status in session memory.

---

#### P74 — ROUTING DECISION

- PASS (5/5): → P78 COMPLETION
- FAIL on Item 2 (partial sum equals series sum): → TA-B01 (MC-1 repair)
- FAIL on Item 1 (monotonicity assumed): → TA-B01 (MC-2 repair)
- FAIL on Item 4 (aₙ=Sₙ−Sₙ₋₁ not used): → TA-B02 (MC-3 repair)
- FAIL on P76 (limit not taken or term formula wrong): → Return to A02 pattern induction; re-gate
- FAIL on multiple items: → TA-B01 then TA-B02; re-gate

---

#### P55 — SCORE (post-repair if applicable)
Re-administer two fresh equivalent items + P76 equivalent. Apply MAMR 5/5. Record repair score.

---

#### P78 — COMPLETION

"You have demonstrated understanding of partial sums as the formal mechanism connecting a series to its convergence.

Key anchors to carry forward:
- Sₙ = Σₖ₌₁ⁿ aₖ (cumulative total, not a single term). aₙ = Sₙ − Sₙ₋₁.
- Series sum = lim_{n→∞} Sₙ (if it exists) — NOT any finite Sₙ.
- {Sₙ} may be non-monotone when terms change sign.
- Given {Sₙ}, the series sum and original terms are both recoverable.

Next concept: math.seq.series-convergence — formal tests (ratio, integral, comparison) for determining whether {Sₙ} converges without computing the limit directly."
