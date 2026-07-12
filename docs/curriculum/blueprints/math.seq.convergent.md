# Teaching Blueprint — math.seq.convergent

## Component 0 — Metadata
concept_id: math.seq.convergent
concept_name: Convergent Sequence
blueprint_version: 1.0
spec_version: Teaching Blueprint Specification v1.0
status: PACKAGE_READY
difficulty: advanced
bloom: analyze
estimated_hours: 8
mastery_threshold: 0.75
CPA_entry_stage: C
requires: [math.seq.sequence, math.calc.limits]
cross_links: [math.calc.limits, math.real.convergence-sequences]
P76_mode: cross-link-probe

---

## Component 1 — Cognitive Map

**Core concept:** A sequence {aₙ} converges to limit L if for every ε>0 there exists N∈ℕ such that |aₙ−L|<ε for all n>N. Informally: aₙ can be made arbitrarily close to L by taking n large enough. This is the discrete analogue of the calculus limit lim_{x→∞} f(x)=L, with the same ε logic but N replaces δ (ε-N vs ε-δ). A sequence that does not converge diverges — either to ±∞ or by oscillation. Every convergent sequence is bounded, but not every bounded sequence converges (e.g., (−1)ⁿ is bounded but oscillates).

**Conceptual progression:**
1. Informal definition: aₙ→L means the terms get arbitrarily close to L as n→∞.
2. ε-strip picture: for any tolerance ε, all but finitely many terms lie within the ε-band (L−ε, L+ε).
3. Formal ε-N definition: ∀ε>0 ∃N: n>N → |aₙ−L|<ε.
4. Divergence types: diverges to +∞ or −∞ (unbounded); diverges by oscillation (bounded but no single limit).
5. Key theorems: convergent → bounded (not converse); squeeze theorem for sequences; limit laws for sequences.

**CPA arc (entry: C — advanced difficulty):**
- Concrete: physical approximation — approximating √2 by 1, 1.4, 1.41, 1.414, … — the sequence converges to √2 even though it never exactly reaches it.
- Pictorial: number line with ε-strip around L; sequence values eventually all inside the strip.
- Abstract: ∀ε>0 ∃N: n>N → |aₙ−L|<ε.

**Prior knowledge activated:** sequences (math.seq.sequence) — sequence definition, notation, arithmetic/geometric sequences; calculus limits (math.calc.limits) — lim_{x→∞} concept, ε-δ intuition, limit laws; absolute value inequalities |a|<ε ↔ −ε<a<ε.

---

## Component 2 — Misconception Registry

### MC-1: CONVERGENCE-MEANS-EVENTUALLY-ZERO [FOUNDATIONAL]
**Description:** Learner believes a convergent sequence must converge to 0 — that "converging" means the terms get smaller and approach zero, not an arbitrary limit L.
**Surface form:** "The sequence aₙ=1+1/n converges because the 1/n part goes to zero."
**Root cause:** Many textbook examples are sequences like 1/n, 1/n², whose limit happens to be 0. The learner abstracts "terms shrink → converge → to zero" rather than "terms approach some fixed L." The concept of convergence to L≠0 is unseen.
**Trigger condition:** Any sequence with a non-zero limit, especially aₙ=c+bₙ where bₙ→0.
**Repair target:** TA-B01.

### MC-2: BOUNDED-IMPLIES-CONVERGENT
**Description:** Learner believes any bounded sequence converges — that having all terms in a finite interval [m, M] is sufficient for convergence.
**Surface form:** "The sequence (−1)ⁿ is bounded between −1 and 1, so it converges."
**Root cause:** The statement "convergent → bounded" is a theorem; the learner inverts the implication, believing "bounded → convergent." The classic counterexample (−1)ⁿ was either not presented or not emphasised.
**Trigger condition:** Any bounded oscillating or irregular sequence.
**Repair target:** TA-B02.

### MC-3: LIMIT-MEANS-EVENTUALLY-REACHES-L
**Description:** Learner believes convergence means the sequence actually reaches the value L for large enough n — that there exists some finite N such that aₙ=L for all n>N.
**Surface form:** "1/n converges to 0, so eventually the terms ARE 0."
**Root cause:** "Getting close to L" is interpreted as "arriving at L." The ε-N definition says the DISTANCE |aₙ−L| becomes arbitrarily small but never requires it to be zero. Convergence is about approximation, not equality.
**Trigger condition:** Any convergent sequence where aₙ≠L for all n (which is the typical case).
**Repair target:** TA-B03.

---

## Component 3 — Scaffolding Protocol

**Entry assessment:** "Write the first five terms of the sequence aₙ=n/(n+1). What value does the sequence appear to approach?" If the learner correctly computes 1/2, 2/3, 3/4, 4/5, 5/6 and identifies the apparent limit as 1, proceed to A01. This confirms sequence evaluation and informal limit intuition.

**Scaffolding ladder:**
- Rung 1 (concrete): decimal approximation to √2 via 1, 1.4, 1.41, 1.414, 1.4142, … Never reaches √2 but gets within any specified tolerance. Map ε to "tolerance."
- Rung 2 (pictorial): draw a number line; mark L; draw an ε-strip around L; plot sequence values; show all but finitely many inside the strip.
- Rung 3 (full analyze): given a sequence and a claimed limit, the learner checks the ε-N definition algebraically: find N in terms of ε such that n>N guarantees |aₙ−L|<ε.

**Pacing note:** h=8 estimated hours; A01 in sessions 1–2; A02 in sessions 3–4; A03 + mastery gate in sessions 4–5.

---

## Component 4 — Protocol A (Main Sequence)

### TA-A01 [B-category: P11 — REPRESENTATION SHIFT]

**Opening primitive: P11**

REPRESENTATION 1 — Concrete table:
aₙ = 1/n: terms 1, 1/2, 1/3, 1/4, 1/5, …, 1/100, …
The terms get smaller but never equal 0. For ε=0.01, once n>100 all terms satisfy |aₙ−0|=1/n<0.01 ✓.

aₙ = (2n+1)/(n+1): terms 3/2, 5/3, 7/4, 9/5, … → 1.5, 1.67, 1.75, 1.80, …
Rewrite: (2n+1)/(n+1) = 2 − 1/(n+1). As n→∞, 1/(n+1)→0, so limit = 2, NOT 0.

REPRESENTATION 2 — ε-strip diagram:
Draw a horizontal number line. Mark L=2. Draw a band (L−ε, L+ε) = (2−0.1, 2+0.1) = (1.9, 2.1).
Plot: a₁=1.5 (outside), a₂=1.67 (outside), …, a₉=19/10=1.9 (boundary), a₁₀=21/11≈1.909 (inside), a₁₁≈1.917 (inside), … From n=9 onward all terms inside the strip.

REPRESENTATION 3 — ε-N definition (formal):
∀ε>0 ∃N∈ℕ: n>N → |aₙ − L| < ε.
For aₙ=2−1/(n+1), L=2: |aₙ−2|=1/(n+1). We need 1/(n+1)<ε → n+1>1/ε → n>1/ε−1. Set N=⌈1/ε⌉. Then for n>N: n>1/ε−1 → 1/(n+1)<ε ✓.

LINKING STATEMENT: "The formal definition is the ε-strip picture with an algebraic threshold N. The ε is the TOLERANCE (any positive real you choose); N is the POINT after which all terms are within tolerance of L. The limit L can be any real number — zero is just the most common example in textbooks."

**Assessment primitive: P49**

PROBE: "Does the sequence aₙ = (3n−1)/n converge? If so, to what limit?"
- CORRECT: "Rewrite: (3n−1)/n = 3 − 1/n. As n→∞, 1/n→0. Limit = 3. Convergent, L=3 (not 0)." → proceed to A02.
- PARTIAL: identifies limit correctly but writes L=0 or says "converges to 0 because 1/n→0" → Repair with B01 (CONVERGENCE-MEANS-EVENTUALLY-ZERO). "The 1/n part vanishes, but the constant 3 remains. Limit = 3."
- INCORRECT: says diverges because "3n grows without bound" (looks at numerator only) → "Examine the ratio, not the numerator alone: (3n−1)/n=3−1/n. For large n this is close to 3, not to ∞. Dividing by n stabilises the growth."
- NO_RESPONSE: "Divide numerator and denominator by n: (3n−1)/n = (3−1/n)/1 = 3−1/n. As n→∞, 1/n→0 so the sequence → 3. L=3."

---

### TA-B01 — Repair for MC-1 (CONVERGENCE-MEANS-EVENTUALLY-ZERO)

**Opening primitive: P27 — MISCONCEPTION NAMING**
"The claim is: 'a convergent sequence must converge to 0.' Convergence means approaching some fixed finite limit L — L can be any real number, including 5, −3, or π."

**P41 — MISCONCEPTION DETECTOR**
"The sequence aₙ=3+1/n: terms are 4, 3.5, 3.33, 3.25, … Does it converge? If so, to what?
(A) It converges to 0 because 1/n→0.
(B) It converges to 3 because 3+1/n→3+0=3."
[If A: learner holds MC-1.]

**P64 — CONCEPTUAL SHIFT**
"The 1/n in aₙ=3+1/n is a CORRECTION TERM that vanishes. The backbone of the sequence is the constant 3. As n→∞, the correction disappears and the sequence approaches 3. Think of it this way: if you stand at the value 3 on the number line, the terms aₙ=3+1/n get within ε of you for all n>1/ε. The limit is 3 — the value the sequence homes in on, not the correction term. L=0 only when there is no constant backbone."

→ Return to A01.

---

### TA-A02 [B-category: P06 — CONTRAST PAIR]

**Opening primitive: P06**

PAIR A — Convergent vs divergent to infinity:
- Convergent: aₙ=1/n → 0. |aₙ−0|=1/n<ε when n>1/ε. Terms stabilise near L=0.
- Divergent to +∞: bₙ=n. No finite L; for any M, bₙ>M when n>M. Terms grow without bound.
- Divergent to −∞: cₙ=−n². Terms decrease without bound.

PAIR B — Convergent vs divergent by oscillation:
- Convergent: aₙ=1+1/n → 1. Eventually all within any ε of 1.
- Oscillating divergent: dₙ=(−1)ⁿ = 1,−1,1,−1,… Never settles near any single L. For ε=0.5: the terms oscillate between 1 and −1, so no N makes all n>N terms within 0.5 of a fixed L.
- Bounded but divergent: (−1)ⁿ has |dₙ|≤1 for all n but still diverges.

KEY THEOREM — Convergent implies bounded (NOT converse):
If {aₙ} converges then ∃M: |aₙ|≤M for all n. Proof sketch: take ε=1; for n>N all |aₙ−L|<1 → |aₙ|≤|L|+1; finite max over n=1..N handles the rest. M=max(|a₁|,…,|aₙ|,|L|+1).
CONVERSE FALSE: (−1)ⁿ is bounded (M=1) but diverges. Bounded ≠ convergent.

DIVERGENCE RECOGNITION CRITERIA:
| Symptom | Type | Example |
|---|---|---|
| Terms grow without bound | Diverges to ±∞ | n², log n |
| Terms alternate between values | Oscillatory divergence | (−1)ⁿ, sin(nπ/2) |
| Terms dense in [a,b] but no single limit | Oscillatory | sin(n) |
| Terms have two or more accumulation points | Diverges (no unique limit) | (−1)ⁿ has ±1 |

**Assessment primitive: P49**

PROBE: "The sequence aₙ=(−1)ⁿ+1/n. Does it converge? Justify."
- CORRECT: "Split: the (−1)ⁿ part oscillates between +1 and −1 without settling; the 1/n part vanishes. The combined sequence oscillates between approximately +1 and −1 (specifically between 1+1/n and −1+1/n) and has no single limit. It diverges by oscillation despite being bounded." → proceed to A03.
- PARTIAL: says diverges but claims unbounded → "(−1)ⁿ is bounded (|dₙ|=1); adding 1/n only shifts by a vanishing amount. The sequence IS bounded between −1 and 2, but still diverges by oscillation — two subsequences (even n → 1, odd n → −1) converge to different limits."
- INCORRECT: says converges to 0 (1/n→0 so limit=0) → Repair with B02 (BOUNDED-IMPLIES-CONVERGENT is not the issue here, but MC-1 is: assumes 1/n→0 means the whole thing→0). "The (−1)ⁿ part does NOT vanish; it oscillates permanently."
- NO_RESPONSE: "Even-indexed terms: a_{2k}=1+1/(2k)→1. Odd-indexed terms: a_{2k+1}=−1+1/(2k+1)→−1. Two subsequences have different limits (1 and −1). If the sequence converged to L, ALL subsequences would converge to L — contradiction. Diverges."

---

### TA-B02 — Repair for MC-2 (BOUNDED-IMPLIES-CONVERGENT)

**Opening primitive: P27 — MISCONCEPTION NAMING**
"The claim is: 'every bounded sequence converges.' Boundedness is necessary but not sufficient. The classic counterexample: (−1)ⁿ is bounded (|aₙ|≤1) but oscillates forever between +1 and −1 — no single limit exists."

**P41 — MISCONCEPTION DETECTOR**
"The sequence (−1)ⁿ: terms are −1,+1,−1,+1,… All terms satisfy |aₙ|≤1, so it is bounded. Does it converge?
(A) Yes — it is bounded, so it must converge.
(B) No — the terms alternate; they never settle near a single value L."
[If A: learner holds MC-2.]

**P64 — CONCEPTUAL SHIFT**
"Convergent → bounded is a theorem (every convergent sequence is bounded). But the CONVERSE is false. A bounded sequence can oscillate without settling. The correct positive statement is the Monotone Convergence Theorem: if a sequence is BOTH bounded AND monotone (non-decreasing or non-increasing), then it converges. (−1)ⁿ is bounded but NOT monotone — it zigzags. Boundedness alone cannot prevent oscillation."

→ Return to A02.

---

### TA-A03 [B-category: P04 — PATTERN INDUCTION]

**Opening primitive: P04**

PATTERN: algebraic limit computation via standard techniques.

TECHNIQUE 1 — Divide by highest power of n:
aₙ = (3n²+2n−1)/(n²+4).
Divide numerator and denominator by n²:
aₙ = (3 + 2/n − 1/n²)/(1 + 4/n²).
As n→∞: 2/n→0, 1/n²→0, 4/n²→0.
Limit = (3+0−0)/(1+0) = 3.

TECHNIQUE 2 — Algebraic manipulation for indeterminate forms:
aₙ = √(n+1) − √n.
Rationalise: multiply by (√(n+1)+√n)/(√(n+1)+√n):
aₙ = (n+1−n)/(√(n+1)+√n) = 1/(√(n+1)+√n).
As n→∞: denominator→∞, so aₙ→0. Sequence converges to 0.

TECHNIQUE 3 — Squeeze theorem:
If bₙ ≤ aₙ ≤ cₙ for all n>N₀, and bₙ→L and cₙ→L, then aₙ→L.
Example: aₙ = sin(n)/n. Bound: −1/n ≤ sin(n)/n ≤ 1/n. Both ±1/n→0. Squeeze → sin(n)/n→0.

TECHNIQUE 4 — Geometric sequences:
aₙ = rⁿ. Converges iff |r|<1 (limit=0) or r=1 (limit=1). Diverges for |r|>1 or r=−1 (oscillation).

PATTERN TABLE:
| Form | Limit | Technique |
|---|---|---|
| (polynomial)/(polynomial), same degree | ratio of leading coefficients | divide by nᵏ |
| (polynomial)/(polynomial), num degree < den | 0 | divide by nᵏ |
| √(n+a)−√(n+b) | (a−b)/2 (from rationalisation) | multiply conjugate |
| sin(n)/nᵏ or cos(n)/nᵏ | 0 (k>0) | squeeze theorem |
| rⁿ | 0 if |r|<1; 1 if r=1; diverges otherwise | geometric pattern |

**Assessment primitive: P49**

PROBE: "Find the limit of aₙ = (2n²−1)/(n²+3n) if it exists."
- CORRECT: "Divide by n²: (2−1/n²)/(1+3/n). As n→∞: (2−0)/(1+0)=2. Limit=2, converges." → proceed to A04.
- PARTIAL: correct method, arithmetic slip (e.g., forgets to divide the constant term by n²) → "Numerator: 2n²/n²=2; −1/n²→0. Denominator: n²/n²=1; 3n/n²=3/n→0. Limit=(2−0)/(1+0)=2."
- INCORRECT: says limit=0 (only looks at 1/n² and 3/n vanishing) → "The leading terms 2n² and n² are what survive. Their ratio is 2, not 0. Only sub-leading terms vanish."
- NO_RESPONSE: "Divide every term by n² (the highest power present). Numerator: 2−1/n². Denominator: 1+3/n. Both 1/n² and 3/n→0 as n→∞. Resulting limit: 2/1=2."

---

### TA-B03 — Repair for MC-3 (LIMIT-MEANS-EVENTUALLY-REACHES-L)

**Opening primitive: P27 — MISCONCEPTION NAMING**
"The claim is: 'the sequence eventually reaches L (aₙ=L for large n).' Convergence requires the terms get ARBITRARILY CLOSE to L — the distance |aₙ−L| becomes smaller than any positive ε. It does NOT require aₙ to ever equal L."

**P41 — MISCONCEPTION DETECTOR**
"For aₙ=1/n, the limit is 0. Is there any finite n where aₙ=0?
(A) Yes — for large enough n, 1/n becomes exactly 0.
(B) No — 1/n is always positive for n∈ℕ, so aₙ≠0 for every n. But it gets within any ε of 0."
[If A: learner holds MC-3.]
"Compute 1/1000000. Is it zero?"

**P64 — CONCEPTUAL SHIFT**
"The ε-N definition says: for any ε>0 (no matter how tiny), the distance |aₙ−L| eventually stays below ε. There is no requirement that it ever becomes exactly 0. This is called approximation — like a thermometer reading that asymptotically approaches the true temperature without ever being perfectly exact. For aₙ=1/n: |aₙ−0|=1/n<ε iff n>1/ε. So for any ε, all terms from n=⌈1/ε⌉+1 onward are within ε of 0. But none are equal to 0. Convergence is about eternal proximity, not arrival."

→ Return to A01 or A03 as appropriate.

---

## Component 5 — Protocol B (Repair Sequences)

### TA-B01 — Repair for MC-1 (CONVERGENCE-MEANS-EVENTUALLY-ZERO)
See TA-B01 in Component 4. Opens P27+P41+P64; returns to A01.

### TA-B02 — Repair for MC-2 (BOUNDED-IMPLIES-CONVERGENT)
See TA-B02 in Component 4. Opens P27+P41+P64; returns to A02.

### TA-B03 — Repair for MC-3 (LIMIT-MEANS-EVENTUALLY-REACHES-L)
See TA-B03 in Component 4. Opens P27+P41+P64; returns to A01 or A03.

---

## Component 6 — P89 Spaced Repetition

**Interval schedule:** Day 1 (initial), Day 3, Day 10, Day 30.

**Day 3 prompt:**
"Find the limit of aₙ = (n+sin n)/(2n+1)."
[Expected: −1≤sin n≤1, so n−1≤n+sin n≤n+1. Squeeze: (n−1)/(2n+1) ≤ aₙ ≤ (n+1)/(2n+1). Both bounds → 1/2. By squeeze theorem, aₙ→1/2.]

**Day 10 prompt:**
"Prove or disprove: if aₙ→L and bₙ→M then aₙ+bₙ→L+M."
[Expected: TRUE (sum rule). Proof: let ε>0. Choose N₁ s.t. n>N₁ → |aₙ−L|<ε/2; choose N₂ s.t. n>N₂ → |bₙ−M|<ε/2. Let N=max(N₁,N₂). For n>N: |(aₙ+bₙ)−(L+M)|≤|aₙ−L|+|bₙ−M|<ε/2+ε/2=ε. QED.]

**Day 30 prompt:**
"Construct a bounded sequence that has exactly two subsequential limits: 0 and 1. Prove it diverges."
[Expected: aₙ = (1+(−1)ⁿ)/2 = 0,1,0,1,… Even-indexed subsequence→1; odd-indexed→0. Bounded in [0,1]. If aₙ→L, then L=1 (from even subsequence) and L=0 (from odd subsequence) — contradiction. Diverges. Two distinct subsequential limits prevent convergence.]

---

## Component 7 — Cross-Blueprint Dependencies

**Prerequisite blueprints (must be PACKAGE_READY before delivery):**
- math.seq.sequence — sequence definition, index notation, arithmetic/geometric sequences; provides the domain object (a sequence) that is classified here
- math.calc.limits — lim_{x→∞} f(x)=L intuition and ε-δ structure; the ε-N definition of sequence convergence directly parallels the calculus limit framework with N replacing δ

**Unlocked blueprints:**
- math.seq.series-convergence — an infinite series ∑aₙ converges iff the sequence of partial sums converges; requires full mastery of sequence convergence definition

**Cross-links:**
- math.calc.limits (TIER 1) — P76 uses cross-link probe connecting sequence limits to calculus limits
- math.real.convergence-sequences (NOT Tier 1) — rigorous ε-N proofs; not required here

---

## Component 8 — Teaching Notes

**Pedagogical priority:** MC-1 (CONVERGENCE-MEANS-EVENTUALLY-ZERO) must be addressed at first occurrence — it causes systematic misclassification of sequences like n/(n+1)→1 as "converges to zero." The fix is immediate: separate the concept of convergence (approaching a limit) from the identity of the limit (which can be any real).

**ε-N as a verification tool, not a discovery tool:** At this level, the ε-N definition is used to verify a conjectured limit (find N such that |aₙ−L|<ε), not to discover what L is. The typical two-step process: (1) compute the limit algebraically; (2) optionally verify via ε-N by solving |aₙ−L|<ε for n. Keep these steps distinct.

**Bounded but not convergent — systematic treatment:** Present at least two distinct examples of bounded divergent sequences: (−1)ⁿ (oscillates between two values) and sin(n) (oscillates densely). Both are bounded; neither converges. The Monotone Convergence Theorem (bounded + monotone → convergent) should be stated as the positive resolution of the MC-2 tension.

**Squeeze theorem as the main tool for oscillatory limits:** When a sequence involves sin, cos, or other bounded oscillating factors multiplied by a vanishing factor, squeeze is almost always the right approach. Build this as a pattern-recognition skill in A03.

---

## Component 10 — Validation Checklist

### Structural Checks
- [x] V-1: Component 0 metadata complete (all 9 fields populated)
- [x] V-2: All TAs in main sequence open with a B-category primitive (GR-1) — A01: P11, A02: P06, A03: P04
- [x] V-3: CPA_entry_stage=C (advanced difficulty); concrete anchor included in A01 (√2 approximation + table) ✓
- [x] V-4: Every non-gate TA contains P49 with all 4 branches (GR-2) — A01, A02, A03 each have CORRECT/PARTIAL/INCORRECT/NO_RESPONSE
- [x] V-5: Terminal TA is mastery gate (P91) (GR-3) — A04 is P91
- [x] V-6: Repair TAs open with P27+P41+P64 (GR-4) — B01, B02, B03 all comply
- [x] V-7: Mastery gate is terminal — P91 in A04 is the final TA (GR-6)
- [x] V-8: P76 present in mastery gate (GR-7)
- [x] V-9: Cross-Blueprint Dependencies documented in Component 7 (GR-8)
- [x] V-10: P76 mode = cross-link-probe; cross-linked Tier 1 concept is math.calc.limits; P76 probe connects sequence convergence to calculus limit framework (GR-9)

### Content Checks
- [x] V-11: bloom=analyze; no P07 (WORKED EXAMPLE PAIR not required); B-category primitives P11, P06, P04 ✓
- [x] V-12: Misconception registry has 3 MCs; MC-1 marked FOUNDATIONAL
- [x] V-13: Repair sequence exists for each MC — B01 (MC-1), B02 (MC-2), B03 (MC-3)
- [x] V-14: P76 cross-link probe connects to math.calc.limits with a novel problem (n/(n+1) both as sequence limit and function limit)
- [x] V-15: P77 has exactly 4 items; P76 is 1 item; n=5 total

### Mastery Gate Checks
- [x] V-16: MAMR stated — PASS = ⌈0.75 × 5⌉ = 4 out of 5
- [x] V-17: PASS criterion enforced in P74 routing decision
- [x] V-18: P78 COMPLETION block present
- [x] V-19: P75 MASTERY ASSESSMENT present with PASS/FAIL branching
- [x] V-20: All scoring (P55) entries reference the same MAMR threshold

### AIR Check
- [x] AIR: ε-N definition standard (Rudin/Apostol); all sequence limits computed correctly; convergent→bounded proof sketch standard; (−1)ⁿ divergence argument correct; Squeeze Theorem stated correctly

**STATUS: PACKAGE_READY**

---

## Component 4 (continued) — Protocol A, TA-A04 [MASTERY GATE: P91]

### P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78

**MAMR: PASS = ⌈0.75 × 5⌉ = 4 out of 5**

---

#### P77 — MULTI-PROBLEM SET (4 items)

**Item 1:**
"Find the limit of aₙ = (5n−2)/(n+1), or state that it diverges."
[Expected: Divide by n: (5−2/n)/(1+1/n) → 5/1 = 5 as n→∞. Converges to L=5.]

**Item 2:**
"Does the sequence aₙ=(−1)ⁿ converge? Justify briefly."
[Expected: No. Even terms = +1 → 1; odd terms = −1 → −1. Two different subsequential limits → diverges by oscillation. (Alternatively: for ε=1/2, no N makes all n>N terms within 0.5 of a single L, since consecutive terms differ by 2.)]

**Item 3:**
True or False: "Every bounded sequence converges."
[Expected: FALSE. Counterexample: (−1)ⁿ is bounded (|aₙ|=1 for all n) but diverges. Correct statement: every bounded MONOTONE sequence converges (Monotone Convergence Theorem).]

**Item 4:**
"Find the limit of aₙ = cos(n)/n, or state that it diverges."
[Expected: Squeeze: −1/n ≤ cos(n)/n ≤ 1/n. Both ±1/n→0. By the Squeeze Theorem, aₙ→0.]

---

#### P55 — SCORE after P77
Score each item 1 point for correct, 0 for incorrect. Record score /4.

---

#### P76 — TRANSFER PROBE (cross-link probe: math.calc.limits)

"Consider aₙ = n/(n+1).

(a) Find the limit of the sequence {aₙ} as n→∞ using the sequence definition.
(b) Now define f(x) = x/(x+1) for real x>0. Find lim_{x→∞} f(x) using the calculus limit (as a continuous function).
(c) Are the answers to (a) and (b) the same? Explain what structural connection links them.
(d) For ε=0.01, find the smallest N∈ℕ such that |aₙ−1|<0.01 for all n>N."

[Expected:
(a) Divide by n: (1)/(1+1/n)→1. Sequence limit = 1.
(b) f(x)=x/(x+1)=1−1/(x+1)→1 as x→∞. Calculus limit = 1.
(c) Same answer (1). The sequence limit lim_{n→∞} aₙ equals lim_{x→∞} f(x) when aₙ=f(n) and f is a continuous function that tends to a limit at infinity. The ε-N definition for sequences is the discrete version of the ε-M (or ε-δ-at-infinity) definition for functions.
(d) |aₙ−1|=|n/(n+1)−1|=1/(n+1). Need 1/(n+1)<0.01 → n+1>100 → n>99. Smallest N=99; all n>99 satisfy |aₙ−1|<0.01.]

---

#### P55 — SCORE after P76
Score P76 as 1 point if (a) and (b) both give 1, (c) identifies the connection correctly, and (d) gives N=99; 0 otherwise.

---

#### P75 — MASTERY ASSESSMENT

Total score = P77 score (0–4) + P76 score (0–1) = 0–5.
PASS threshold: ≥ 4 out of 5.
- PASS (≥4/5): Learner can classify convergent and divergent sequences, compute sequence limits algebraically, apply the squeeze theorem, and connect sequence limits to calculus limits.
- FAIL (<4/5): Identify which items failed; route to repair.

---

#### P55 — SCORE (mastery total)
Record final score and PASS/FAIL status in session memory.

---

#### P74 — ROUTING DECISION

- PASS: → P78 COMPLETION
- FAIL on Item 1 (limit=0 instead of 5): → TA-B01 (CONVERGENCE-MEANS-EVENTUALLY-ZERO), then re-gate
- FAIL on Item 2 (says converges because bounded): → TA-B02 (BOUNDED-IMPLIES-CONVERGENT), then re-gate
- FAIL on Item 3 (TRUE): → TA-B02; clarify Monotone Convergence Theorem; re-gate
- FAIL on Item 4 (cannot apply squeeze): → return to A03; re-drill squeeze technique; re-gate
- FAIL on P76(d) (ε-N computation): → return to A01 ε-N representation; re-gate

---

#### P55 — SCORE (post-repair if applicable)
Re-administer two fresh equivalent items + P76 equivalent. Apply MAMR 4/5. Record repair score separately.

---

#### P78 — COMPLETION

"You have demonstrated ability to classify sequences as convergent or divergent, compute limits algebraically, apply the squeeze theorem, and understand the ε-N definition of convergence.

Key anchors to carry forward:
- Convergence: {aₙ}→L iff ∀ε>0 ∃N: n>N → |aₙ−L|<ε. L can be any real, not just 0.
- Divergence: either unbounded (→±∞) or oscillatory (bounded but no single limit).
- Bounded ≠ convergent. Convergent → bounded (with bounded+monotone → convergent).
- Squeeze theorem: if bₙ≤aₙ≤cₙ and bₙ,cₙ→L then aₙ→L. Main tool for oscillatory-times-vanishing sequences.
- Connection to calculus limits: lim_{n→∞} f(n) = lim_{x→∞} f(x) when f is continuous and the latter limit exists.

Next concept: math.seq.series-convergence — the sequence of partial sums Sₙ=a₁+…+aₙ; an infinite series converges iff {Sₙ} converges."
