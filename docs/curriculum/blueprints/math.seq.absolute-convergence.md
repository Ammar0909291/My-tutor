<!-- BLUEPRINT: math.seq.absolute-convergence -->
<!-- STATUS: PACKAGE_READY -->
<!-- SPEC VERSION: 1.0 -->

# Teaching Blueprint: Absolute and Conditional Convergence
**Concept ID:** `math.seq.absolute-convergence`
**KG Fields:** difficulty=advanced | bloom=analyze | estimated_hours=5 | mastery_threshold=0.7

---

## Component 0 — Metadata

| Field | Value |
|-------|-------|
| concept_id | math.seq.absolute-convergence |
| name | Absolute and Conditional Convergence |
| difficulty | advanced |
| bloom | analyze |
| estimated_hours | 5 |
| mastery_threshold | 0.7 |
| CPA_entry_stage | A (Abstract) |
| requires (Tier-1) | math.seq.alternating-series |
| cross_links | none |
| P76_mode | independence |
| MAMR | 4/5 (⌈0.7 × 5⌉) |

---

## Component 1 — Cognitive Map

### Prior Knowledge Anchors
- **math.seq.alternating-series**: Alternating Series Test (AST): bₙ decreasing to 0 → Σ(−1)ⁿbₙ converges; alternating harmonic Σ(−1)^{n+1}/n = ln 2; error bound |Rₙ| ≤ bₙ₊₁

### Target Knowledge State
Student distinguishes three convergence classes for Σaₙ: (1) **absolutely convergent** — Σ|aₙ| converges; Σaₙ then necessarily converges and its sum is invariant under rearrangement; (2) **conditionally convergent** — Σaₙ converges but Σ|aₙ| diverges; rearrangement can change the sum to any target; (3) **divergent** — Σaₙ diverges. Student applies the two-step classification pipeline: first test Σ|aₙ| (ratio/root/comparison/p-series); if Σ|aₙ| converges → absolutely convergent; if Σ|aₙ| diverges, test Σaₙ directly (AST or Divergence Test) — if Σaₙ converges → conditionally convergent, else divergent. Student states and applies the Riemann Rearrangement Theorem.

### Conceptual Obstacles
1. Believing all convergent series are absolutely convergent — fails to recognise sign-cancellation can produce convergence even when Σ|aₙ| diverges
2. Inferring Σaₙ diverges from Σ|aₙ| diverging — forgets sign-cancellation; alternating harmonic is the canonical counterexample
3. Applying rearrangement-invariance to conditionally convergent series — only absolute convergence licenses free rearrangement

---

## Component 2 — Misconception Registry

| ID | Label | Description | Trigger |
|----|-------|-------------|---------|
| MC-1 | CONDITIONAL-EQUALS-ABSOLUTE | Student believes convergence and absolute convergence are identical; does not recognise conditionally convergent series as a separate class | Any classification problem; series where Σaₙ converges but Σ\|aₙ\| diverges |
| MC-2 | ABSOLUTE-DIVERGENCE-IMPLIES-SERIES-DIVERGENCE | Student concludes Σ\|aₙ\| diverges → Σaₙ diverges; forgets sign-cancellation allows conditional convergence; alternating harmonic is the canonical refutation | Two-step classification when the absolute-value test fails |
| MC-3 | REARRANGEMENT-SAFE-FOR-ALL | Student applies rearrangement-invariance to all convergent series, not just absolutely convergent ones; unaware of Riemann Rearrangement Theorem | Any context involving re-ordering a series or summing it in a different sequence |

**Foundational Misconception:** MC-2 (ABSOLUTE-DIVERGENCE-IMPLIES-SERIES-DIVERGENCE) — if held, every conditionally convergent series is mis-classified as divergent, eliminating the entire conditional class. Addressed in A01, A02, and B02.

---

## Component 3 — Scaffolding Protocol

**Entry point:** A (Abstract) — advanced learner fluent with alternating series and multiple convergence tests.

**Scaffolding sequence:**
1. **A01 P11 REPRESENTATION SHIFT** — Shift from "does Σaₙ converge?" to "does Σ|aₙ| converge?"; three-class diagram; proof that absolute convergence implies convergence
2. **A02 P04 PATTERN INDUCTION** — Classification gallery; induce the two-step pipeline; discover role of sign-cancellation
3. **A03 P06 CONTRAST PAIR** — Absolute vs conditional: rearrangement theorem; what each class allows and forbids
4. **A04 P91 Gate** — mastery assessment

---

## Component 4 — Protocol A (Main Teaching Sequence)

### Teaching Action A01 — The Three Convergence Classes

**Primitive:** P11 REPRESENTATION SHIFT
**Purpose:** Define absolute and conditional convergence; prove absolute implies convergence; build the three-class diagram

---

**[P11 — REPRESENTATION SHIFT]**

**Stage A — The signed series Σaₙ:**

Does Σ(−1)^{n+1}/n converge?

By AST: bₙ = 1/n is decreasing to 0 → **Σ(−1)^{n+1}/n converges** (= ln 2 ≈ 0.693).

**Stage B — The absolute-value series Σ|aₙ|:**

Does Σ|(−1)^{n+1}/n| = Σ1/n converge?

Σ1/n is the **harmonic series** — it **diverges** (p = 1).

**Key point:** The original series converges but its absolute-value series diverges. These can differ. That relationship defines the classification:

**Three convergence classes:**

| Class | Criterion |
|-------|-----------|
| Absolutely convergent | Σ\|aₙ\| converges |
| Conditionally convergent | Σaₙ converges but Σ\|aₙ\| diverges |
| Divergent | Σaₙ diverges |

**Theorem (Absolute Convergence Implies Convergence):** If Σ|aₙ| converges, then Σaₙ converges.

*Proof sketch:* Define bₙ = aₙ + |aₙ|. Then 0 ≤ bₙ ≤ 2|aₙ|, so Σbₙ converges by comparison with 2Σ|aₙ|. Since Σaₙ = Σbₙ − Σ|aₙ| (difference of two convergent series), Σaₙ converges. □

**Classification diagram:**

```
All series
  ├── CONVERGENT
  │     ├── Absolutely convergent  [Σ|aₙ| converges]
  │     └── Conditionally convergent  [Σ|aₙ| diverges, Σaₙ converges]
  └── DIVERGENT  [Σaₙ diverges]
```

**Canonical examples:**
- **Absolutely convergent:** Σ(−1)ⁿ/n² — Σ1/n² = π²/6 converges
- **Conditionally convergent:** Σ(−1)^{n+1}/n — Σ1/n diverges; Σ(−1)^{n+1}/n = ln 2
- **Divergent:** Σ(−1)ⁿ·n/(n+1) — n/(n+1) → 1 ≠ 0 (Divergence Test)

---

**[P49 — ADAPTIVE CHECKPOINT]**

*Probe:* Classify Σₙ₌₁^∞ (−1)ⁿ/n².

(A) Absolutely convergent — Σ1/n² converges (p=2), so Σ|(−1)ⁿ/n²| = Σ1/n² converges
(B) Conditionally convergent — it's alternating with decreasing terms, so AST applies; not absolutely convergent
(C) Diverges — alternating signs prevent convergence
(D) Cannot classify without evaluating the sum

*Branch CORRECT (A):* Σ1/n² converges (p=2>1) → Σ(−1)ⁿ/n² is **absolutely convergent**. (B) would require Σ1/n² to diverge, which it doesn't — the series is absolutely, not merely conditionally, convergent. ✓ Proceed to A02.

*Branch PARTIAL (B):* The series does converge by AST, but you must also test Σ|aₙ| = Σ1/n² (p=2) → converges → the series is **absolutely** convergent, not merely conditionally. Proceed to A02.

*Branch INCORRECT (C, D):* (C) Absolute convergence implies convergence, so alternating signs don't prevent it when Σ|aₙ| already converges. (D) Classification uses only convergence tests on Σ|aₙ| and Σaₙ — no sum evaluation needed. Proceed to A02.

*Branch NO_RESPONSE:* Step 1: test Σ|aₙ| = Σ1/n², a p-series with p=2>1 — converges. Therefore Σ(−1)ⁿ/n² is **absolutely convergent** (no need for Step 2). Proceed to A02.

---

### Teaching Action A02 — Classification Pipeline

**Primitive:** P04 PATTERN INDUCTION
**Purpose:** Build the two-step classification pipeline; induce benchmarks for absolute-value tests; discover the role of sign-cancellation in conditional convergence

---

**[P04 — PATTERN INDUCTION]**

**Classification pipeline:**

```
Given Σaₙ:

Step 1: Test Σ|aₙ|
  ├── Converges → ABSOLUTELY CONVERGENT (stop)
  └── Diverges → Step 2: Test Σaₙ directly
        ├── Converges → CONDITIONALLY CONVERGENT
        └── Diverges → DIVERGENT
```

**Gallery of classifications:**

| Series | Σ\|aₙ\| test | Σaₙ test | Classification |
|--------|-------------|---------|----------------|
| Σ(−1)ⁿ/n² | Σ1/n² converges (p=2) | — | Absolutely convergent |
| Σ(−1)^{n+1}/√n | Σ1/√n diverges (p=1/2) | AST: 1/√n↘0 → converges | Conditionally convergent |
| Σ(−1)ⁿ·n/(n+1) | Σn/(n+1) diverges | Div Test: n/(n+1)→1≠0 | Divergent |
| Σ(−1)ⁿ/2ⁿ | Σ1/2ⁿ converges (geo) | — | Absolutely convergent |
| Σ(−1)^{n+1}/n | Σ1/n diverges (harmonic) | AST: 1/n↘0 → converges | Conditionally convergent |

**Why sign-cancellation works:** The positive sub-sums and negative sub-sums of a conditionally convergent series each diverge (to +∞ and −∞). They interleave so that their combined partial sums oscillate with decreasing amplitude toward a finite limit. Remove the signs — the damping mechanism disappears and the accumulation diverges. This is precisely what the two-step pipeline detects.

---

**[P49 — ADAPTIVE CHECKPOINT]**

*Probe:* Classify Σₙ₌₂^∞ (−1)^{n+1}/√n.

(A) Absolutely convergent — alternating series with decreasing terms always converge absolutely
(B) Conditionally convergent — Σ1/√n diverges (p=1/2), but AST: 1/√n↘0 → Σ(−1)^{n+1}/√n converges
(C) Diverges — Σ1/√n diverges, so the signed series must diverge
(D) Conditionally convergent — because the partial sums oscillate

*Branch CORRECT (B):* Step 1: Σ1/√n diverges (p=1/2<1). Step 2: AST — 1/√n is positive, decreasing to 0 → Σ(−1)^{n+1}/√n converges. Classification: **conditionally convergent**. ✓ Proceed to A03.

*Branch INCORRECT (A):* Alternating series with decreasing terms converge (AST), but this does NOT imply absolute convergence — you must still check Σ|aₙ| = Σ1/√n, which diverges. → Conditionally convergent only. Proceed to A03.

*Branch INCORRECT (C):* This is MC-2 exactly — Σ|aₙ| diverging does not imply Σaₙ diverges. Sign-cancellation via the AST produces convergence here. → Conditionally convergent. Proceed to A03.

*Branch NO_RESPONSE:* Two-step pipeline. Step 1: Σ1/√n (p=1/2<1) → diverges. Step 2: AST — 1/√n positive, decreasing, → 0 → Σ(−1)^{n+1}/√n **converges**. Result: Σ|aₙ| diverges but Σaₙ converges → **conditionally convergent**. Proceed to A03.

---

### Teaching Action A03 — Rearrangement: What Each Class Allows

**Primitive:** P06 CONTRAST PAIR
**Purpose:** Contrast rearrangement properties; state the Riemann Rearrangement Theorem; establish absolute convergence as the licence for series algebra

---

**[P06 — CONTRAST PAIR]**

**Contrast 1 — Absolutely convergent: rearrangement-safe**

If Σaₙ is absolutely convergent, every rearrangement of its terms converges to the **same sum**.

*Example:* Σ(−1)ⁿ/n² (absolutely convergent). Rearrange in any order — the sum is unchanged. All standard series algebra (regrouping, termwise addition, Cauchy product) is safe.

**Contrast 2 — Conditionally convergent: the Riemann Rearrangement Theorem**

**Theorem (Riemann, 1854):** If Σaₙ is conditionally convergent, then for any L ∈ ℝ ∪ {+∞, −∞}, there exists a rearrangement that converges to L.

*Why this is possible:* For a conditionally convergent series, the sum of positive terms is +∞ and the sum of negative terms is −∞ (if either were finite, Σ|aₙ| would converge — contradicting conditional convergence). So we can accumulate positive terms until we overshoot any target L, then negative terms until we fall below L, and alternate forever. Since aₙ→0, the oscillations narrow to L.

**Demonstration — alternating harmonic series:**

Standard arrangement: 1 − 1/2 + 1/3 − 1/4 + 1/5 − ··· = **ln 2 ≈ 0.6931**

Rearrangement (two positives, one negative):
1 + 1/3 − 1/2 + 1/5 + 1/7 − 1/4 + 1/9 + 1/11 − 1/6 + ··· = **(3/2)ln 2 ≈ 1.0397**

The same series, different sum, simply by reordering.

**Contrast table:**

| Property | Absolutely convergent | Conditionally convergent |
|----------|----------------------|--------------------------|
| Σaₙ converges | ✓ | ✓ |
| Σ\|aₙ\| converges | ✓ | ✗ |
| Rearrangement changes sum | Never | Always possible |
| Regrouping safe | ✓ | ✗ |
| Riemann theorem applies | No — sum is fixed | Yes |

---

**[P49 — ADAPTIVE CHECKPOINT]**

*Probe:* We know Σ(−1)^{n+1}/n = ln 2. A rearrangement of the same terms gives (3/2)ln 2. Does the Riemann Rearrangement Theorem apply here?

(A) No — rearrangements of a convergent series always give the same sum
(B) Yes — Σ(−1)^{n+1}/n is conditionally convergent; by Riemann's theorem a rearrangement can converge to (3/2)ln 2
(C) No — (3/2)ln 2 > ln 2, so the rearranged series must have diverged
(D) Yes — the theorem applies because the series is absolutely convergent

*Branch CORRECT (B):* Σ(−1)^{n+1}/n is conditionally convergent (AST gives convergence; Σ1/n diverges). The Riemann Rearrangement Theorem guarantees a rearrangement exists for every real target; (3/2)ln 2 is a valid target. ✓ Proceed to A04.

*Branch INCORRECT (A):* This holds for absolutely convergent series only. For conditional convergence, Riemann's theorem explicitly breaks it — sums can change. Proceed to A04.

*Branch INCORRECT (C):* (3/2)ln 2 is a finite real number — conditionally convergent rearrangements converge (to some value, possibly different from the original). Proceed to A04.

*Branch INCORRECT (D):* Riemann's theorem applies specifically to CONDITIONALLY convergent series. Absolute convergence locks the sum to a fixed value and prevents any rearrangement from changing it. Proceed to A04.

---

## Component 4 (continued) — P91 Mastery Gate

### Teaching Action A04 — Mastery Gate

**Primitive:** P91 (P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78)
**MAMR:** 4/5
**Status:** Terminal TA

---

**[P77 — MULTI-PROBLEM SET]**

*For each series: classify as absolutely convergent, conditionally convergent, or divergent. Show the two-step pipeline.*

**Problem 1.** Σₙ₌₁^∞ (−1)ⁿ / n²

**Problem 2.** Σₙ₌₁^∞ (−1)^{n+1} / √n

**Problem 3.** Σₙ₌₁^∞ (−1)ⁿ · n/(n+1)

**Problem 4.** Σₙ₌₁^∞ (−1)ⁿ / 2ⁿ

---

**[P55 — SCORE]**

*Answers:*

1. Step 1: Σ1/n² converges (p=2>1) → **absolutely convergent** ✓

2. Step 1: Σ1/√n diverges (p=1/2<1). Step 2: AST — 1/√n↘0 → Σ(−1)^{n+1}/√n converges → **conditionally convergent** ✓

3. Step 1: Σn/(n+1) diverges (terms → 1 ≠ 0). Step 2: Divergence Test — (−1)ⁿ·n/(n+1) does not → 0 → **diverges** ✓

4. Step 1: Σ1/2ⁿ converges (geometric, r=1/2<1) → **absolutely convergent** ✓

Score 1 point per problem.

---

**[P76 — TRANSFER PROBE]** *(P76_mode: independence)*

*Problem:* Classify Σₙ₌₁^∞ (−1)ⁿ/(n²+1).

*(a)* Test Σ|aₙ| = Σ1/(n²+1). Apply an appropriate convergence test.

*(b)* Classify the series.

*(c)* May its terms be rearranged without changing the sum? Justify.

*Expected answer:*

*(a)* LCT with Σ1/n²: L = lim [n²/(n²+1)] = 1 ∈ (0,∞); Σ1/n² converges (p=2) → Σ1/(n²+1) **converges**.

*(b)* Σ|aₙ| converges → **absolutely convergent**.

*(c)* Yes — absolutely convergent series are rearrangement-invariant (A03). The Riemann Rearrangement Theorem does not apply (it applies only to conditionally convergent series).

---

**[P55 — SCORE]**

Transfer probe: 1 point (all three parts correct); 0.5 if classification correct but rearrangement justification missing or inverted.

---

**[P75 — MASTERY ASSESSMENT]**

MAMR = 4/5 (⌈0.7 × 5⌉ = 4). Total n = 5 (P77: 4 items, P76: 1 item).

---

**[P55 — SCORE]**

Record total score X/5.

---

**[P74 — ROUTING DECISION]**

| Score | Routing |
|-------|---------|
| 5/5 or 4/5 | → P78 COMPLETION — mastery confirmed |
| 3/5 | → Identify missed items: classification confusion → B01/B02; rearrangement error → B03; targeted repair |
| ≤ 2/5 | → Return to A01; re-examine three-class diagram; re-derive two-step pipeline; schedule R1 |

---

**[P55 — SCORE]**

Routing outcome recorded.

---

**[P78 — COMPLETION]**

Concept `math.seq.absolute-convergence` complete. Threshold 0.7 requires 4/5 correct.

**Unlocks:** Power series radius of convergence; absolute convergence on the interval of convergence; full series classification toolkit.

---

## Component 5 — Protocol B (Misconception Repair)

### Repair Action B01 — CONDITIONAL-EQUALS-ABSOLUTE Repair

**Primitives:** P27 + P41 + P64

**[P27 — MISCONCEPTION NAMING]**
"You are treating convergence and absolute convergence as the same property. Convergence is about Σaₙ; absolute convergence is about Σ|aₙ|. The first can hold without the second."

**[P41 — MISCONCEPTION DETECTOR]**
*Diagnostic probe:* True or false: if Σaₙ converges, then Σ|aₙ| must also converge.
*Correct response:* False. Σ(−1)^{n+1}/n converges (AST, = ln 2), but Σ1/n diverges (harmonic). This series is conditionally — not absolutely — convergent.

**[P64 — CONCEPTUAL SHIFT]**
"These are two separate tests on two separate series — the signed series Σaₙ and the unsigned series Σ|aₙ|. Convergence of the first says nothing about the second. The word 'conditional' means the convergence depends on keeping the signs exactly as given — change them (take absolute values) and the convergence disappears."

---

### Repair Action B02 — ABSOLUTE-DIVERGENCE-IMPLIES-SERIES-DIVERGENCE Repair

**Primitives:** P27 + P41 + P64

**[P27 — MISCONCEPTION NAMING]**
"You concluded Σaₙ diverges because Σ|aₙ| diverges. This is not a valid implication. A conditionally convergent series satisfies exactly this: Σ|aₙ| diverges but Σaₙ still converges via sign-cancellation."

**[P41 — MISCONCEPTION DETECTOR]**
*Diagnostic probe:* Σ|(−1)^{n+1}/n| = Σ1/n diverges. A student concludes Σ(−1)^{n+1}/n diverges. What is the error?
*Correct response:* Σ(−1)^{n+1}/n converges to ln 2 by AST. Σ|aₙ| diverging only rules out absolute convergence — it does not force Σaₙ to diverge. The two-step pipeline requires checking Σaₙ directly in Step 2.

**[P64 — CONCEPTUAL SHIFT]**
"Absolute divergence means: removing signs causes divergence. But the original series may still converge, thanks to sign-cancellation. The whole point of the conditionally-convergent class is that the series is held together by its signs. Once you know Σ|aₙ| diverges (Step 1), you must proceed to Step 2 — the result can still be 'converges.'"

---

### Repair Action B03 — REARRANGEMENT-SAFE-FOR-ALL Repair

**Primitives:** P27 + P41 + P64

**[P27 — MISCONCEPTION NAMING]**
"You assumed any convergent series can be rearranged without changing its sum. This holds only for absolutely convergent series. For conditionally convergent series, the Riemann Rearrangement Theorem says rearrangement can produce any target sum."

**[P41 — MISCONCEPTION DETECTOR]**
*Diagnostic probe:* Σ(−1)^{n+1}/n = ln 2. Does 1 + 1/3 − 1/2 + 1/5 + 1/7 − 1/4 + ··· (same terms, different order) also equal ln 2?
*Correct response:* No — it equals (3/2)ln 2 ≈ 1.04. Because the alternating harmonic is conditionally convergent, Riemann's theorem applies: rearrangements can change the sum to any real value.

**[P64 — CONCEPTUAL SHIFT]**
"The safety rule: rearrangement is free only when Σ|aₙ| converges. For a conditionally convergent series, the positive and negative 'reservoirs' are each infinite — you are balancing two divergent quantities, and the balance point depends on the order you draw from them. Change the order, shift the balance point, change the sum."

---

## Component 6 — P89 Spaced Repetition Schedule

| Review # | Delay | Probe |
|----------|-------|-------|
| R1 | 1 day | Classify Σ(−1)ⁿ·ln(n)/n. (Hint: for n≥3, ln(n)/n > 1/n → Σln(n)/n diverges by DCT; AST: ln(n)/n↘0 → conditional.) |
| R2 | 3 days | Classify Σ(−1)ⁿ·n²/n! (test Σn²/n! via ratio: L=0 → converges → absolutely convergent). |
| R3 | 7 days | The series 1 − 1/2 + 1/3 − 1/4 + ··· = ln 2. A student rearranges it and claims the sum must still be ln 2 since "convergent series have fixed sums." What must be true for this argument to be valid, and is it valid here? |

---

## Component 7 — Cross-Blueprint Dependencies

| Field | Value |
|-------|-------|
| cross_links | none |
| P76_mode | independence |
| Unlocks | power series absolute convergence; radius of convergence analysis |
| Requires (Tier-1) | math.seq.alternating-series |

**GR-8 compliance:** cross_links = none; no cross-link documentation needed.
**GR-9 compliance:** P76 uses an independent problem unrelated to any cross-linked concept.

---

## Component 8 — Teaching Notes

- **MC-2 is the most dangerous:** Classifying every conditionally-convergent series as "divergent" eliminates an entire category. The alternating harmonic is the essential counterexample — make students explicitly contrast Step 1 (Σ1/n diverges) with Step 2 (AST → converges).
- **The two-step pipeline is the core deliverable:** Always start with the absolute-value series. Only when Σ|aₙ| fails do you look at Σaₙ directly. This sequencing prevents the MC-2 shortcut.
- **Riemann's theorem is deeply surprising:** Most students expect "reordering doesn't change a sum." The demonstration (ln 2 → (3/2)ln 2 by reordering the same terms) reliably produces genuine surprise. Follow with the intuitive explanation (infinite positive and negative reservoirs) immediately.
- **R3 requires care:** The argument "convergent series have fixed sums" is only valid for absolutely convergent series. The alternating harmonic is NOT absolutely convergent, so the argument is invalid here. Students who answer "yes, still ln 2" are applying the wrong theorem. Students who answer "not necessarily" and cite Riemann's theorem demonstrate exactly the target knowledge state.
- **Practical implication:** Absolute convergence is not just theoretical — it licenses the series algebra used in power series manipulation (differentiation, integration, product series). This connection motivates the distinction for students who ask "why does this matter?"

---

## Component 10 — Validation Checklist

| Code | Check | Status |
|------|-------|--------|
| V-1 | concept_id matches KG exactly | PASS |
| V-2 | All KG fields present in metadata | PASS |
| V-3 | CPA_entry=A; abstract entry appropriate for advanced learner | PASS |
| V-4 | bloom=analyze → P07 optional; P11 chosen for signed-vs-unsigned representation shift | PASS |
| V-5 | All non-gate TAs open with B-category primitive (GR-1) | PASS (A01=P11, A02=P04, A03=P06) |
| V-6 | All non-gate TAs have P49 with 4 branches (GR-2) | PASS |
| V-7 | Gate TA is terminal, contains P91 (GR-3, GR-6) | PASS (A04) |
| V-8 | Repair TAs open with P27+P41+P64 (GR-4) | PASS (B01, B02, B03) |
| V-9 | P76 present in mastery gate (GR-7) | PASS |
| V-10 | cross_links documented in metadata (GR-8) | PASS (none) |
| V-11 | P76_mode = independence (GR-9, no Tier-1 cross-link) | PASS |
| V-12 | MAMR stated and enforced: 4/5 = ⌈0.7×5⌉ (GR-10) | PASS |
| V-13 | P77 has exactly 4 items | PASS |
| V-14 | P91 compound complete: P77→P55→P76→P55→P75→P55→P74→P55→P78 | PASS |
| V-15 | P74 routing table covers all score outcomes | PASS |
| V-16 | Misconception registry ≥ 3 entries; foundational MC labeled | PASS (3 MCs, MC-2 foundational) |
| V-17 | Scaffolding protocol matches TA structure | PASS |
| V-18 | Spaced repetition schedule ≥ 3 entries (P89) | PASS |
| V-19 | h=5 → 3 main TAs + gate appropriate | PASS (A01, A02, A03, A04=gate) |
| V-20 | All mathematics correct and verified | PASS |
| AIR | No AI-refusal content; educationally appropriate | PASS |
