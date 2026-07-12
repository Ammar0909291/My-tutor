# Teaching Blueprint — math.prob.pdf

## Component 0 — Metadata
concept_id: math.prob.pdf
concept_name: Probability Density Function
blueprint_version: 1.0
spec_version: Teaching Blueprint Specification v1.0
status: PACKAGE_READY
difficulty: proficient
bloom: apply
estimated_hours: 3
mastery_threshold: 0.9
CPA_entry_stage: P
requires: [math.prob.continuous-rv]
cross_links: []
P76_mode: independence

---

## Component 1 — Cognitive Map

**Core concept:** A PDF f(x) completely characterises a continuous RV: it is non-negative, integrates to 1, and encodes all probabilistic information. The apply-level skills extend continuous-rv understanding to: (1) finding normalisation constants k so ∫kf(x)dx=1; (2) computing the expectation E[X]=∫xf(x)dx as the probability-weighted mean; (3) computing E[X²]=∫x²f(x)dx and the variance Var(X)=E[X²]−(E[X])².

**Conceptual progression:**
1. Recap: PDF validity conditions — f(x)≥0; ∫_{−∞}^∞ f(x)dx=1.
2. Normalisation: when f(x)=k·g(x), solve k·∫g(x)dx=1 for k.
3. Expectation: E[X]=∫_{−∞}^∞ xf(x)dx — the probability-weighted centre of gravity.
4. Second moment: E[X²]=∫_{−∞}^∞ x²f(x)dx — needed for variance.
5. Variance: Var(X)=E[X²]−(E[X])² — expected squared deviation from the mean.

**CPA arc (entry: P):**
- Pictorial: density curve; vertical line at E[X] as the balance point; spread around E[X] visualised as variance.
- Abstract: integral formulas for k, E[X], E[X²], Var(X); shortcut Var(X)=E[X²]−μ².

**Prior knowledge activated:** math.prob.continuous-rv — PDF definition, P(a≤X≤b)=∫_a^b f(x)dx, CDF; definite integral mechanics (integration by substitution, power rule); algebraic manipulation to solve for k.

---

## Component 2 — Misconception Registry

### MC-1: EXPECTATION-AS-MODE [FOUNDATIONAL]
**Description:** Learner computes E[X] as the x-value where f(x) is maximum (the mode) rather than evaluating ∫xf(x)dx.
**Surface form:** "f(x) = 6x(1−x) peaks at x=1/2 (by calculus or symmetry), so E[X] = 1/2." (Here the answer happens to be correct, but for asymmetric distributions it fails: for f(x)=3x² on [0,1], mode is at x=1 but E[X]=3/4.)
**Root cause:** Conflating the mean (weighted integral) with the peak of the density curve; the learner uses a heuristic (center of peak) rather than the defining formula.
**Trigger condition:** Any asymmetric PDF or any problem that explicitly requires E[X] via integration.
**Repair target:** TA-B01.

### MC-2: VARIANCE-AS-EXPECTED-DEVIATION
**Description:** Learner computes Var(X) as E[X−μ]=∫(x−μ)f(x)dx=0, concluding that variance is always zero, or computes E[|X−μ|] instead of E[(X−μ)²].
**Surface form:** "Var(X) = ∫(x−μ)f(x)dx = 0 because the positive and negative deviations cancel."
**Root cause:** Forgetting the squaring in the definition; or confusing Var(X)=E[(X−μ)²] with E[X−μ] (which is always 0 by definition of E[X]).
**Trigger condition:** Any variance computation.
**Repair target:** TA-B02.

### MC-3: NORMALIZATION-BY-EVALUATION
**Description:** Learner finds k by evaluating k·f(c)=1 at some point c (e.g., at x=0 or at the maximum), rather than setting up and solving ∫k·g(x)dx=1.
**Surface form:** "f(x)=k·x on [0,2]. At x=1: k·1=1 so k=1." Correct: ∫_0^2 k·x dx = k·2=1 → k=1/2.
**Root cause:** Interpreting the normalization condition "f must equal 1 somewhere" rather than "f must integrate to 1"; confusing the PDF value at a point with the total probability.
**Trigger condition:** Any problem requiring the normalisation constant k.
**Repair target:** TA-B03.

---

## Component 3 — Scaffolding Protocol

**Entry assessment:** "For f(x)=2x on [0,1]: (a) verify it's a valid PDF; (b) find P(0≤X≤1/2)." Correct responses (∫_0^1 2x dx=1 ✓; P=∫_0^{1/2}2xdx=1/4) confirm readiness for expectation work. These recall the continuous-rv blueprint directly.

**Scaffolding ladder:**
- Rung 1 (pictorial): show a triangular density; identify balance point visually; contrast with highest point (mode).
- Rung 2 (structured): compute E[X]=∫_0^1 x·2x dx step by step with guided notation.
- Rung 3 (full apply): find k, E[X], Var(X) for a new family independently.

**Pacing note:** h=3 estimated hours; A01 + A02 in sessions 1–2; mastery gate in session 2.

---

## Component 4 — Protocol A (Main Sequence)

### TA-A01 [B-category: P03 — ANALOGY BRIDGE]

**Opening primitive: P03**

SOURCE DOMAIN: Discrete expectation (from math.prob.random-variable).
"For a discrete RV with PMF P(X=xᵢ): E[X] = Σᵢ xᵢ·P(X=xᵢ) — each value xᵢ weighted by its probability.
Example: fair die, E[X]=(1+2+3+4+5+6)/6=3.5. This is the balance point of equal probability masses at {1,2,...,6}."

TARGET DOMAIN: Continuous expectation.
"For a continuous RV with PDF f(x): E[X] = ∫_{−∞}^∞ x·f(x)dx — each value x weighted by its probability density f(x)dx.
Discrete Σ xᵢP(X=xᵢ) → continuous ∫ x·f(x)dx; probabilities become densities × infinitesimal widths."

BRIDGE MAPPING:
| Discrete | Continuous | Role |
|---|---|---|
| x_i (specific value) | x (integration variable) | Value of RV |
| P(X = x_i) (probability mass) | f(x)dx (probability element) | Weight |
| Σ x_i · P(X=x_i) = E[X] | ∫ x · f(x)dx = E[X] | Weighted average |
| Σ x_i² · P(X=x_i) = E[X²] | ∫ x² · f(x)dx = E[X²] | Second moment |
| E[X²]−(E[X])² = Var(X) | E[X²]−(E[X])² = Var(X) | Variance (same formula) |

NORMALISATION PRIMER:
"Sometimes f(x)=k·g(x) where g is a given shape function and k is unknown. Find k from ∫_{support} k·g(x)dx = 1 → k = 1/∫g(x)dx."

PHYSICAL INTUITION:
"E[X] is the 'balance point' of the density curve — place the curve on a see-saw at E[X] and it balances. Var(X) measures average squared distance from this balance point."

**Assessment primitive: P49**

PROBE: "f(x) = 2x for 0≤x≤1. Find E[X]."
- CORRECT: "E[X] = ∫_0^1 x·2x dx = ∫_0^1 2x²dx = 2[x³/3]_0^1 = 2/3." → proceed to A02.
- PARTIAL: integrand set up as ∫_0^1 x·f dx (general form correct) but evaluates incorrectly → "∫_0^1 2x²dx = 2·[x³/3]_0^1 = 2·(1/3) = 2/3."
- INCORRECT: "E[X] = mode = 1 (where f is maximum)" → Repair B01 (EXPECTATION-AS-MODE). "E[X] requires integration, not finding the peak. E[X]=∫xf(x)dx."
- NO_RESPONSE: "E[X]=∫_0^1 x·f(x)dx=∫_0^1 x·2x dx=∫_0^1 2x²dx. Antiderivative: 2x³/3. Evaluate from 0 to 1: 2/3−0=2/3."

---

### TA-B01 — Repair for MC-1 (EXPECTATION-AS-MODE)

**Opening primitive: P27 — MISCONCEPTION NAMING**
"The claim is: 'E[X] = x where f(x) is maximised.' E[X] is not the peak of the density — it is the probability-weighted AVERAGE, computed by ∫xf(x)dx."

**P41 — MISCONCEPTION DETECTOR**
"For f(x)=3x² on [0,1] (which peaks at x=1): what is E[X]?
(A) E[X] = 1 (where f is maximum).
(B) E[X] = ∫_0^1 x·3x²dx = ∫_0^1 3x³dx = 3/4."
[If A: learner holds MC-1.]
"Compute ∫_0^1 3x³dx = [3x⁴/4]_0^1 = 3/4 ≠ 1."

**P64 — CONCEPTUAL SHIFT**
"For a skewed distribution, E[X] ≠ mode (peak). The mode is where probability is densest per unit length — it is a local property. E[X] is a GLOBAL property: it integrates x·f(x) over the entire support, weighting each x by how much probability density is near it. Heavy tails pull E[X] away from the mode. Formula: E[X]=∫xf(x)dx — always integrate; never read off the peak."

→ Return to A01.

---

### TA-A02 [B-category: P07 — WORKED EXAMPLE PAIR]

**Opening primitive: P07**

WORKED EXAMPLE 1 — Normalisation + expectation:
Let f(x) = k·x(1−x) for 0≤x≤1, 0 elsewhere. Find k and E[X].

Step 1 — Find k:
∫_0^1 k·x(1−x)dx = 1.
∫_0^1 (x−x²)dx = [x²/2−x³/3]_0^1 = 1/2−1/3 = 1/6.
So k/6 = 1 → k = 6.
Confirmed: f(x) = 6x(1−x) on [0,1].

Step 2 — Find E[X]:
E[X] = ∫_0^1 x·6x(1−x)dx = 6∫_0^1(x²−x³)dx = 6[x³/3−x⁴/4]_0^1 = 6(1/3−1/4) = 6·(1/12) = 1/2.
[Note: by symmetry of 6x(1−x) about x=1/2, E[X]=1/2 is expected ✓.]

---

WORKED EXAMPLE 2 — Variance:
Using f(x) = 6x(1−x) on [0,1] (k=6 from WE1), find Var(X).

Step 1 — Find E[X²]:
E[X²] = ∫_0^1 x²·6x(1−x)dx = 6∫_0^1(x³−x⁴)dx = 6[x⁴/4−x⁵/5]_0^1 = 6(1/4−1/5) = 6·(1/20) = 3/10.

Step 2 — Find Var(X):
Var(X) = E[X²] − (E[X])² = 3/10 − (1/2)² = 3/10 − 1/4 = 6/20 − 5/20 = 1/20.

SUMMARY of the three-formula sequence:
1. k from ∫kf(x)dx = 1.
2. E[X] = ∫xf(x)dx (first moment).
3. Var(X) = E[X²] − (E[X])² where E[X²] = ∫x²f(x)dx (second moment minus squared first moment).

**Assessment primitive: P49**

PROBE: "f(x) = k·x² for 0≤x≤3. (a) Find k. (b) Find E[X]."
- CORRECT: "(a) ∫_0^3 kx²dx=k[x³/3]_0^3=k·9=1 → k=1/9. (b) E[X]=∫_0^3 x·(1/9)x²dx=(1/9)∫_0^3 x³dx=(1/9)[x⁴/4]_0^3=(1/9)·(81/4)=9/4." → proceed to A03.
- PARTIAL: correct k=1/9 but E[X] setup as ∫_0^3 (1/9)x²dx (missing factor of x in integrand) → "E[X]=∫xf(x)dx — multiply f(x) by x (not just integrate f). E[X]=∫_0^3 x·(1/9)x²dx=∫_0^3(1/9)x³dx."
- INCORRECT: k=1/9 found correctly but "E[X]=k=1/9" (confuses k with expectation) → Repair B01 or B03 as applicable. "E[X] is a separate computation: ∫xf(x)dx with k=1/9 already substituted."
- NO_RESPONSE: "(a) Set ∫_0^3 kx²dx=1: k·[x³/3]_0^3=k·9=1 → k=1/9. (b) E[X]=∫_0^3 x·(x²/9)dx=(1/9)∫_0^3 x³dx=(1/9)[x⁴/4]_0^3=(81/36)=9/4."

---

### TA-B02 — Repair for MC-2 (VARIANCE-AS-EXPECTED-DEVIATION)

**Opening primitive: P27 — MISCONCEPTION NAMING**
"The claim is: 'Var(X) = E[X−μ] = ∫(x−μ)f(x)dx.' This integral equals 0 for ANY distribution — negative and positive deviations always cancel. Variance is E[(X−μ)²] — the expected SQUARED deviation."

**P41 — MISCONCEPTION DETECTOR**
"For f(x)=1 on [0,1] (μ=E[X]=1/2): compute ∫_0^1(x−1/2)f(x)dx.
(A) This gives Var(X)=0, which makes sense because it's symmetric.
(B) This gives 0, but that's NOT Var(X). Var(X)=∫_0^1(x−1/2)²·1 dx = [...]."
[If A: learner holds MC-2.]
"For ANY distribution, ∫(x−μ)f(x)dx = E[X]−μ = μ−μ = 0. It measures nothing about spread."

**P64 — CONCEPTUAL SHIFT**
"Squaring the deviation makes the formula non-trivial. E[(X−μ)²]=∫(x−μ)²f(x)dx>0 whenever X is not concentrated at a single point. The squaring ensures positive and negative deviations BOTH contribute positively to variance. Practical formula: Var(X)=E[X²]−(E[X])² (usually easier to compute). For f(x)=1 on [0,1]: E[X]=1/2; E[X²]=∫_0^1 x²dx=1/3; Var=1/3−1/4=1/12. Standard deviation = √(1/12)=1/(2√3)≈0.289."

→ Return to A02.

---

### TA-B03 — Repair for MC-3 (NORMALIZATION-BY-EVALUATION)

**Opening primitive: P27 — MISCONCEPTION NAMING**
"The claim is: 'Find k so that f(c)=1 at some point c.' Normalization does NOT require f to equal 1 at any point. It requires ∫f(x)dx=1 (total probability is 1). f(x) can exceed 1, equal 1 at no point, or equal 1 at many points — none of these constraints apply."

**P41 — MISCONCEPTION DETECTOR**
"f(x)=k·x on [0,2]. Using f(1)=1: k·1=1 → k=1. Check: ∫_0^2 1·x dx=[x²/2]_0^2=2≠1. Is k=1 valid?
(A) Yes — f(1)=1 confirms normalization.
(B) No — the integral is 2, not 1. f is not a valid PDF."
[If A: learner holds MC-3.]
"∫_0^2 x dx=2≠1 means total probability=2, which is impossible. k=1 fails."

**P64 — CONCEPTUAL SHIFT**
"Normalization means TOTAL PROBABILITY = 1, i.e., ∫f(x)dx=1. This is an INTEGRAL condition, not a point evaluation. The correct approach: (1) compute ∫k·g(x)dx = k·∫g(x)dx; (2) set equal to 1; (3) solve for k = 1/∫g(x)dx. For f(x)=k·x on [0,2]: ∫_0^2 kx dx = k·[x²/2]_0^2 = 2k = 1 → k=1/2. Check: f(x)=(1/2)x; f(2)=1≥0 ✓; ∫_0^2(1/2)x dx=1 ✓."

→ Return to A01 or A02 as appropriate.

---

## Component 5 — Protocol B (Repair Sequences)

### TA-B01 — Repair for MC-1 (EXPECTATION-AS-MODE)
See TA-B01 in Component 4. Opens P27+P41+P64; returns to A01.

### TA-B02 — Repair for MC-2 (VARIANCE-AS-EXPECTED-DEVIATION)
See TA-B02 in Component 4. Opens P27+P41+P64; returns to A02.

### TA-B03 — Repair for MC-3 (NORMALIZATION-BY-EVALUATION)
See TA-B03 in Component 4. Opens P27+P41+P64; returns to A01.

---

## Component 6 — P89 Spaced Repetition

**Interval schedule:** Day 1 (initial), Day 3, Day 10, Day 30.

**Day 3 prompt:**
"X has PDF f(x) = c·e^{−2x} for x≥0. (a) Find c. (b) Find E[X]. (c) Find Var(X)."
[Expected: (a) ∫_0^∞ ce^{−2x}dx = c/2 = 1 → c=2. (b) E[X]=∫_0^∞ x·2e^{−2x}dx; integrate by parts: u=x, dv=2e^{−2x}dx; [−xe^{−2x}]_0^∞+∫_0^∞ e^{−2x}dx = 0 + [−e^{−2x}/2]_0^∞ = 1/2. (c) E[X²]=∫_0^∞ x²·2e^{−2x}dx=1/2 (by integration by parts twice or moment formula for Exp(2): 2/λ²=2/4=1/2). Var=1/2−1/4=1/4.]

**Day 10 prompt:**
"X has PDF f(x) = (3/2)x² for −1≤x≤1. Find: (a) E[X]; (b) Var(X); (c) P(|X|≤0.5)."
[Expected: (a) E[X]=∫_{−1}^1 x·(3/2)x²dx=(3/2)∫_{−1}^1 x³dx=0 (odd function on symmetric interval). (b) E[X²]=(3/2)∫_{−1}^1 x⁴dx=(3/2)·[2/5]=3/5; Var=3/5−0=3/5. (c) P(|X|≤0.5)=∫_{−0.5}^{0.5}(3/2)x²dx=(3/2)[x³/3]_{−0.5}^{0.5}=(3/2)·(1/12+1/12)=(3/2)·(1/6)=1/4.]

**Day 30 prompt:**
"Show that for any continuous RV X with E[X]=μ and E[X²]<∞: Var(X) = E[(X−μ)²] = E[X²]−μ². Prove the shortcut formula by expanding (X−μ)²."
[Expected: E[(X−μ)²]=E[X²−2μX+μ²]=E[X²]−2μE[X]+μ²=E[X²]−2μ²+μ²=E[X²]−μ².]

---

## Component 7 — Cross-Blueprint Dependencies

**Prerequisite blueprints (must be PACKAGE_READY before delivery):**
- math.prob.continuous-rv — PDF definition, ∫f(x)dx=1, P(a≤X≤b)=∫f(x)dx, CDF F(x)=∫f(t)dt; the present blueprint extends to expectation and variance

**Unlocked blueprints:**
- math.prob.continuous-distributions — Normal, Exponential, Uniform; each is a specific f(x) family requiring the expectation and variance formulas from this blueprint

**Cross-links:** none (cross_links=[]).

---

## Component 8 — Teaching Notes

**Pedagogical priority:** MC-3 (NORMALIZATION-BY-EVALUATION) surfaces most often during the normalisation step. Reinforce from the start: normalisation is an INTEGRAL condition; it says nothing about f(x) at any specific point.

**Variance shortcut:** Always teach Var(X)=E[X²]−(E[X])² alongside the definitional formula E[(X−μ)²]. The shortcut is computationally faster and avoids errors in expanding (x−μ)². The definitional form motivates the concept; the shortcut is used in practice.

**Integration skills gate:** This blueprint is computation-heavy. Learners who struggle with definite integration of polynomial and exponential functions will struggle here. Brief integration review may be needed before A02.

---

## Component 10 — Validation Checklist

### Structural Checks
- [x] V-1: Component 0 metadata complete (all 11 fields populated)
- [x] V-2: All TAs in main sequence open with a B-category primitive (GR-1) — A01: P03, A02: P07
- [x] V-3: N/A — CPA_entry_stage=P (proficient difficulty); concrete anchor not required
- [x] V-4: Every non-gate TA contains P49 with all 4 branches (GR-2) — A01, A02 each have CORRECT/PARTIAL/INCORRECT/NO_RESPONSE
- [x] V-5: Terminal TA is mastery gate (P91) (GR-3) — A03 is P91
- [x] V-6: Repair TAs open with P27+P41+P64 (GR-4) — B01, B02, B03 all comply
- [x] V-7: Mastery gate is terminal — P91 in A03 is the final TA (GR-6)
- [x] V-8: P76 present in mastery gate (GR-7)
- [x] V-9: Cross-Blueprint Dependencies documented in Component 7 (GR-8)
- [x] V-10: P76 mode = independence; cross_links=[]; P76 uses a novel independent problem (GR-9)

### Content Checks
- [x] V-11: bloom=apply; P07 used in A02 (WORKED EXAMPLE PAIR) ✓
- [x] V-12: Misconception registry has 3 MCs; MC-1 marked FOUNDATIONAL
- [x] V-13: Repair sequence exists for each MC — B01 (MC-1), B02 (MC-2), B03 (MC-3)
- [x] V-14: P76 independence probe is a novel problem (f(x)=3x² on [0,1]; E[X]=3/4, Var=3/80)
- [x] V-15: P77 has exactly 4 items; P76 is 1 item; n=5 total

### Mastery Gate Checks
- [x] V-16: MAMR stated — PASS = ⌈0.9 × 5⌉ = 5 out of 5
- [x] V-17: PASS criterion enforced in P74 routing decision
- [x] V-18: P78 COMPLETION block present
- [x] V-19: P75 MASTERY ASSESSMENT present with PASS/FAIL branching
- [x] V-20: All scoring (P55) entries reference the same MAMR threshold

### AIR Check
- [x] AIR: normalisation integrals verified; E[X]=2/3 for 2x/[0,1]; k=6 for 6x(1−x); E[X]=1/2; Var=1/20; all computations confirmed

**STATUS: PACKAGE_READY**

---

## Component 4 (continued) — Protocol A, TA-A03 [MASTERY GATE: P91]

### P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78

**MAMR: PASS = ⌈0.9 × 5⌉ = 5 out of 5**

---

#### P77 — MULTI-PROBLEM SET (4 items)

**Item 1:**
"f(x) = kx² for 0≤x≤2, 0 elsewhere. Find k."
[Expected: ∫_0^2 kx²dx = k[x³/3]_0^2 = 8k/3 = 1 → k = 3/8.]

**Item 2:**
"For f(x) = 2x on [0,1], find E[X]."
[Expected: E[X]=∫_0^1 x·2x dx=∫_0^1 2x²dx=2[x³/3]_0^1=2/3.]

**Item 3:**
"For f(x) = 2x on [0,1], find E[X²]."
[Expected: E[X²]=∫_0^1 x²·2x dx=∫_0^1 2x³dx=2[x⁴/4]_0^1=1/2.]

**Item 4:**
"Using E[X]=2/3 and E[X²]=1/2 (from Items 2–3 or freshly derived), find Var(X) for f(x)=2x on [0,1]."
[Expected: Var(X)=E[X²]−(E[X])²=1/2−(2/3)²=1/2−4/9=9/18−8/18=1/18.]

---

#### P55 — SCORE after P77
Score each item 1 point for correct, 0 for incorrect. Record score /4.

---

#### P76 — TRANSFER PROBE (independence mode)

"X has PDF f(x) = 3x² for 0≤x≤1, 0 elsewhere.

(a) Verify that f is a valid PDF.
(b) Find E[X].
(c) Find E[X²] and then Var(X)."

[Expected:
(a) f(x)=3x²≥0 ✓; ∫_0^1 3x²dx=[x³]_0^1=1 ✓. Valid PDF.
(b) E[X]=∫_0^1 x·3x²dx=∫_0^1 3x³dx=3[x⁴/4]_0^1=3/4.
(c) E[X²]=∫_0^1 x²·3x²dx=∫_0^1 3x⁴dx=3[x⁵/5]_0^1=3/5. Var=3/5−(3/4)²=3/5−9/16=48/80−45/80=3/80.]

---

#### P55 — SCORE after P76
Score P76 as 1 point if parts (a)–(c) are all correct; 0 otherwise.

---

#### P75 — MASTERY ASSESSMENT

Total score = P77 score (0–4) + P76 score (0–1) = 0–5.
PASS threshold: ≥ 5 out of 5.
- PASS (5/5): Learner can find normalisation constants, compute E[X], E[X²], and Var(X) from a given PDF.
- FAIL (<5/5): Identify which items failed; route to repair.

---

#### P55 — SCORE (mastery total)
Record final score and PASS/FAIL status in session memory.

---

#### P74 — ROUTING DECISION

- PASS: → P78 COMPLETION
- FAIL on Item 2 or P76(b) (E[X] computed as mode or peak): → TA-B01 (EXPECTATION-AS-MODE repair), then re-gate
- FAIL on Item 4 or P76(c) (Var=E[X−μ]=0 or Var=E[X²] without subtracting (E[X])²): → TA-B02 (VARIANCE-AS-EXPECTED-DEVIATION repair), then re-gate
- FAIL on Item 1 or P76(a) (k found by point evaluation): → TA-B03 (NORMALIZATION-BY-EVALUATION repair), then re-gate
- FAIL due to integration arithmetic errors only (correct formula, wrong integral evaluation): → targeted computation correction; re-gate

---

#### P55 — SCORE (post-repair if applicable)
Re-administer two fresh equivalent items + P76 equivalent. Apply MAMR 5/5. Record repair score separately.

---

#### P78 — COMPLETION

"You have demonstrated the ability to work with probability density functions at the apply level: finding normalisation constants, computing expectations, second moments, and variances.

Key anchors to carry forward:
- Normalise: solve ∫kf(x)dx = 1 for k (integral condition, not point evaluation).
- E[X] = ∫xf(x)dx (probability-weighted mean; not the peak of f).
- Var(X) = E[X²]−(E[X])² where E[X²]=∫x²f(x)dx.
- Var(X) = E[(X−μ)²] ≠ E[X−μ] (sign matters; always square the deviation).

Next concepts: math.prob.continuous-distributions — applying these formulas to the Normal, Exponential, and Uniform families."
