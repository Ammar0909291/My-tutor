<!-- BLUEPRINT: math.real.convergence-sequences -->
<!-- STATUS: PACKAGE_READY -->
<!-- SPEC VERSION: 1.0 -->

# Teaching Blueprint: Convergence of Sequences
**Concept ID:** `math.real.convergence-sequences`
**KG Fields:** difficulty=expert | bloom=apply | estimated_hours=6 | mastery_threshold=0.9

---

## Component 0 — Metadata

| Field | Value |
|-------|-------|
| concept_id | math.real.convergence-sequences |
| name | Convergence of Sequences |
| difficulty | expert |
| bloom | apply |
| estimated_hours | 6 |
| mastery_threshold | 0.9 |
| CPA_entry_stage | C (Concrete) |
| requires (Tier-1) | math.real.completeness, math.seq.sequence |
| cross_links | math.seq.series-convergence (not yet authored — see Component 7) |
| P76_mode | independence |
| MAMR | 5/5 (⌈0.9 × 5⌉) |

---

## Component 1 — Cognitive Map

### Prior Knowledge Anchors
- **math.real.completeness**: every nonempty bounded-above subset of ℝ has a supremum; sup vs. max; the distinction between "bounded" and "Cauchy" (previewed there, formalized fully here)
- **math.seq.sequence**: a sequence is an ordered list $(a_n)_{n=1}^\infty$; the informal idea of terms "approaching" a value, made rigorous in this concept

### Target Knowledge State
Student can state and apply the formal ε–N definition of convergence ($a_n\to L$ iff $\forall\epsilon>0\,\exists N: n>N\Rightarrow|a_n-L|<\epsilon$); correctly prove or disprove convergence to a SPECIFIC claimed value using this definition (not by appeal to intuition); apply the standard limit laws (sum, product, quotient of convergent sequences) to compute limits without re-deriving them from ε–N each time; state that convergent sequences are always bounded, and correctly use the CONTRAPOSITIVE (unbounded ⟹ divergent) while recognizing bounded does NOT imply convergent; and state the Bolzano–Weierstrass theorem (every bounded sequence has a convergent subsequence) and distinguish it from the (false) claim that every bounded sequence itself converges.

### Conceptual Obstacles
1. Treating ε as something to solve for a SPECIFIC small number rather than proving the statement for an ARBITRARY ε>0 — a convergence proof must work no matter how small a positive ε is handed to it, not just for one convenient choice like ε=0.01
2. Confusing "convergent ⟹ bounded" with "bounded ⟹ convergent" — the first is a genuine theorem (proved directly from the ε–N definition, using ε=1 to trap all but finitely many terms), the second is FALSE in general (e.g. (−1)ⁿ is bounded but does not converge)
3. Misreading Bolzano–Weierstrass as "every bounded sequence converges" rather than "every bounded sequence has a convergent SUBSEQUENCE" — (−1)ⁿ itself never converges, but the subsequence of even-indexed terms (all equal to 1) trivially converges to 1, and the odd-indexed subsequence converges to −1; the theorem is about extracting a convergent piece, not the whole sequence converging

---

## Component 2 — Misconception Registry

| ID | Label | Description | Trigger |
|----|-------|-------------|---------|
| MC-1 | EPSILON-IS-A-SPECIFIC-NUMBER | Student "proves" convergence by checking the inequality \|aₙ−L\|<ε for one particular small ε (e.g. ε=0.01) and a correspondingly found N, treating this single check as a complete proof, rather than showing the argument works for arbitrary ε>0 | Any request to "prove" (not just illustrate) a limit using the ε–N definition |
| MC-2 | BOUNDED-IMPLIES-CONVERGENT | Student believes every bounded sequence converges, confusing the TRUE theorem (convergent ⟹ bounded) with its FALSE converse | Any bounded, non-convergent sequence, e.g. (−1)ⁿ, sin(n) |
| MC-3 | BOLZANO-WEIERSTRASS-MEANS-SEQUENCE-CONVERGES | Student states Bolzano–Weierstrass as "every bounded sequence converges," missing that the theorem guarantees only a convergent SUBSEQUENCE, not convergence of the original sequence itself | Any application of Bolzano-Weierstrass to a bounded, divergent sequence like (−1)ⁿ |

**Foundational Misconception:** MC-1 (EPSILON-IS-A-SPECIFIC-NUMBER) — the entire logical structure of every convergence proof in real analysis depends on treating ε as a universally-quantified arbitrary positive number, and a student who checks only one convenient ε has not engaged with the definition at all; this error also directly enables MC-2 and MC-3, since a student who cannot rigorously VERIFY convergence via ε–N has no reliable way to distinguish "converges" from "merely looks like it's settling down," which is exactly what makes bounded, oscillating sequences like (−1)ⁿ deceptive.

---

## Component 3 — Scaffolding Protocol

**Entry point:** C (Concrete) — expert learner works a full ε–N proof for a specific simple sequence before any general theorem is stated, anchoring the "arbitrary ε" logical structure in one worked example.

**Scaffolding sequence:**
1. **A01 P11 REPRESENTATION SHIFT** — C: a complete ε–N proof that $1/n\to0$, worked for arbitrary ε; P: a "tolerance tube" picture showing the tube narrowing (smaller ε forces larger N) while the tail of the sequence stays trapped inside; A: the formal definition, and the "convergent ⟹ bounded" theorem proved directly
2. **A02 P06 CONTRAST PAIR** — a bounded convergent sequence vs. a bounded divergent one (MC-2); Bolzano–Weierstrass's actual claim (a convergent subsequence) vs. the false "whole sequence converges" reading, using (−1)ⁿ's two constant subsequences (MC-3); a "proof" using one fixed ε vs. a genuine arbitrary-ε proof (MC-1)
3. **A03 P91 Gate** — mastery assessment

---

## Component 4 — Protocol A (Main Teaching Sequence)

### Teaching Action A01 — The ε–N Definition, Worked in Full

**Primitive:** P11 REPRESENTATION SHIFT
**Purpose:** Prove one concrete limit completely and rigorously before any general theorem; make the "arbitrary ε" logical structure explicit and non-negotiable; prove convergent ⟹ bounded directly from the definition

---

**[P11 — REPRESENTATION SHIFT]**

**Stage C — Concrete (a complete proof that $1/n \to 0$):**

**Claim:** $\lim_{n\to\infty} 1/n = 0$.

**Proof:** Let $\epsilon>0$ be ARBITRARY (given to us, not chosen by us — this is the crucial logical move). We must find SOME $N$ (depending on this $\epsilon$) such that $n>N \Rightarrow |1/n - 0|<\epsilon$.

By the Archimedean property (a consequence of completeness), there exists a natural number $N$ with $N>1/\epsilon$. Then for any $n>N$: $n>N>1/\epsilon$, so $1/n < \epsilon$ (taking reciprocals of positive quantities reverses the inequality), and since $1/n>0$ always, $|1/n-0|=1/n<\epsilon$. ✓

Since $\epsilon>0$ was arbitrary and we exhibited a valid $N$ for it, the definition is satisfied for EVERY $\epsilon>0$ — the proof is complete. (Concretely: if $\epsilon=0.01$, take $N=100$; if $\epsilon=0.0001$, take $N=10000$ — smaller $\epsilon$ forces larger $N$, but a valid $N$ always exists.)

**Stage P — Pictorial (the tolerance tube):**

```
   1 ┤●
     │ ●
     │  ●
   ε ┤┄┄┄●┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄  (tube of half-width ε around L=0)
     │    ●●●●●●●●●●●●●●●●●●●●●●   ← ALL terms with n>N must land inside
  -ε ┤┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄
   0 └─────┴──────────────────────→ n
           N
```

Convergence means: no matter how NARROW you draw the tube (how small ε is), only FINITELY many terms (those with $n\le N$) are allowed to fall outside it — the entire infinite tail ($n>N$) must be trapped inside, for every choice of tube width.

**Stage A — Abstract (the definition, and convergent ⟹ bounded):**

**Definition:** $a_n \to L$ (equivalently $\lim_{n\to\infty}a_n=L$) iff for every $\epsilon>0$ there exists $N$ (depending on $\epsilon$) such that $n>N \Rightarrow |a_n-L|<\epsilon$.

**Theorem: convergent $\Rightarrow$ bounded.** Suppose $a_n\to L$. Apply the definition with the SPECIFIC choice $\epsilon=1$: there exists $N$ such that $n>N\Rightarrow|a_n-L|<1$, i.e. all terms past index $N$ lie in $(L-1,L+1)$. The finitely many remaining terms $a_1,\ldots,a_N$ are individually finite numbers, so $M=\max(|a_1|,\ldots,|a_N|,|L|+1)$ bounds the ENTIRE sequence: every term is within $M$ of 0. (Using a specific ε=1 here is legitimate — this theorem's proof only needs ONE convenient choice to exhibit a bound, unlike a convergence proof itself, which must work for every ε.)

---

**[P49 — ADAPTIVE CHECKPOINT]**

**Prompt:** Using the ε–N definition, find (in terms of ε) a valid N showing $\dfrac{1}{n^2}\to0$. Do not just state the limit — exhibit the N.

**CORRECT:** Given ε>0, need $1/n^2<\epsilon$, i.e. $n^2>1/\epsilon$, i.e. $n>1/\sqrt\epsilon$. Take $N=1/\sqrt\epsilon$ (or any natural number exceeding it, e.g. $N=\lceil1/\sqrt\epsilon\rceil$). Then $n>N \Rightarrow n>1/\sqrt\epsilon \Rightarrow n^2>1/\epsilon \Rightarrow 1/n^2<\epsilon$, so $|1/n^2-0|<\epsilon$. ✓
→ "Correct — the algebra to isolate N looks different from the 1/n case (square root appears) but the LOGICAL STRUCTURE (arbitrary ε, then produce N depending on it) is identical." → Proceed to A02.

**PARTIAL:** Student picks a specific ε (e.g. checks ε=0.01 works with some N) and stops there, treating it as the complete proof (MC-1).
→ "Checking one ε only illustrates the pattern — the definition demands the argument work for EVERY possible ε>0, however small. Redo it symbolically: given a general ε>0 (not a number), solve $1/n^2<\epsilon$ for $n$ to get a FORMULA for N in terms of ε (here $N=1/\sqrt\epsilon$), so the same reasoning instantly supplies a valid N for any ε someone hands you, not just the one you happened to pick."

**INCORRECT:** Student's algebra to isolate n is wrong (e.g. forgets to take the square root, concluding N=1/ε directly).
→ "Redo the inequality carefully: $1/n^2<\epsilon \iff n^2>1/\epsilon$ (flip and take reciprocals of positive quantities) $\iff n>\sqrt{1/\epsilon}=1/\sqrt\epsilon$ (taking square roots of positive quantities preserves the inequality direction). So $N=1/\sqrt\epsilon$, not $1/\epsilon$ — check with a number: if ε=0.01, $1/\sqrt{0.01}=10$, and indeed $1/10^2=0.01$, right at the boundary, confirming N=10 (or just above) is correct, not N=100."

**NO_RESPONSE:** → "Given ε>0: solve $1/n^2<\epsilon$ for n: $n>1/\sqrt\epsilon$. Take $N=1/\sqrt\epsilon$. Then for $n>N$: $1/n^2<\epsilon$, satisfying the definition for this arbitrary ε."

---

### Teaching Action A02 — Bounded ≠ Convergent; Bolzano–Weierstrass ≠ "It All Converges"

**Primitive:** P06 CONTRAST PAIR
**Purpose:** Break MC-2 with a bounded, divergent sequence; break MC-3 by extracting Bolzano–Weierstrass's actual convergent subsequences from that same example; reinforce MC-1's arbitrary-ε discipline with a contrast against a single-ε "proof"

---

**[P06 — CONTRAST PAIR]**

**Contrast 1 — Bounded and convergent vs. bounded and NOT convergent (MC-2):**

$a_n = 1/n$ is bounded (all terms in $(0,1]$) AND convergent (to 0, proved in A01).

$b_n=(-1)^n = -1,1,-1,1,\ldots$ is bounded (all terms in $\{-1,1\}\subset[-1,1]$) but **NOT convergent**: suppose for contradiction $b_n\to L$ for some $L$. Using $\epsilon=1$ in the definition, all terms past some $N$ would lie within 1 of $L$, i.e. in $(L-1,L+1)$, an interval of length 2 — but $b_n$ keeps taking BOTH values $-1$ and $1$ forever (distance 2 apart) no matter how large $n$ gets, so no single interval of length 2 can eventually contain all of them exclusively past any $N$ (both $-1$ and $1$ keep recurring). Contradiction — $b_n$ diverges.

**"Convergent ⟹ bounded" is a real, one-directional theorem** (proved in A01); its converse ("bounded ⟹ convergent") is simply false, and $b_n$ is the standard counterexample.

**Contrast 2 — What Bolzano–Weierstrass actually delivers, using the SAME $b_n$ (MC-3):**

**Bolzano–Weierstrass Theorem:** Every bounded sequence has a convergent SUBSEQUENCE (not necessarily the whole sequence).

Applying it to $b_n=(-1)^n$ (bounded, as just shown): the theorem does NOT claim $b_n$ itself converges (it doesn't, per Contrast 1) — it claims some subsequence does. Indeed: the subsequence of even-indexed terms $b_2, b_4, b_6,\ldots = 1,1,1,\ldots$ is constant, trivially convergent to 1. Separately, the odd-indexed subsequence $b_1,b_3,b_5,\ldots=-1,-1,-1,\ldots$ converges to $-1$. **Both subsequences converge (to different limits), while the original sequence itself converges to neither (it doesn't converge at all).** The theorem's power is precisely that it guarantees SOME convergent thread can always be extracted from any bounded sequence, however wildly the original oscillates.

**Contrast 3 — A convincing-looking one-ε "proof" vs. a genuine arbitrary-ε proof (MC-1):**

"Proof" attempt that $a_n = (n+1)/n \to 1$: "Check ε=0.001: for n=2000, $a_n = 2001/2000 = 1.0005$, and $|1.0005-1|=0.0005<0.001$. ✓ So the sequence converges to 1." This checks out numerically for ONE ε, but is not a proof — it says nothing about whether a valid N exists for ε=0.0000001, or any other arbitrary positive number.

**Genuine proof:** Given ARBITRARY $\epsilon>0$: $\left|\dfrac{n+1}{n}-1\right| = \left|\dfrac1n\right| = \dfrac1n$. Need $1/n<\epsilon$, i.e. $n>1/\epsilon$. Take $N=1/\epsilon$. Then for any $n>N$: $|a_n-1|=1/n<\epsilon$. This works for EVERY ε>0 by construction (the formula $N=1/\epsilon$ instantly supplies a valid $N$ no matter what ε is handed over), which is what "arbitrary ε" actually requires — not a single numerical spot-check.

---

**[P49 — ADAPTIVE CHECKPOINT]**

**Prompt:** Consider $c_n = \sin(n\pi/2)$, which cycles through $1, 0, -1, 0, 1, 0, -1, 0, \ldots$ forever. (a) Is $c_n$ bounded? (b) Does $c_n$ converge? Justify briefly. (c) Name a subsequence of $c_n$ that converges, and its limit.

**CORRECT:** (a) Bounded — all terms lie in $[-1,1]$. (b) Does NOT converge — it repeatedly returns to $1$, $0$, and $-1$ forever, so no single limit $L$ can eventually trap ALL terms within any fixed small tolerance (e.g. using $\epsilon=0.5$: no interval of length 1 contains $1$, $0$, AND $-1$ all at once, yet all three values recur infinitely often). (c) E.g. the subsequence at indices $n=4,8,12,16,\ldots$ (multiples of 4) is constantly $0$, converging to $0$; or the subsequence at $n=1,5,9,\ldots$ is constantly $1$, converging to $1$.
→ "Correct — this is a second, independent example (beyond (−1)ⁿ) confirming bounded-but-divergent, with THREE distinct constant subsequences extractable, illustrating Bolzano–Weierstrass's guarantee even more richly than the two-value case." → Proceed to A03.

**PARTIAL:** Student answers (a) and (c) correctly but in (b) says "converges, since it's bounded and Bolzano-Weierstrass guarantees convergence" (MC-2/MC-3 combined).
→ "Bolzano–Weierstrass guarantees a convergent SUBSEQUENCE exists (which you correctly found in (c)) — it says nothing about the ORIGINAL sequence converging. Check the original directly: $c_n$ keeps cycling through $1,0,-1$ forever, so it never settles near one single value; being bounded is necessary for Bolzano–Weierstrass to apply, but the theorem's conclusion is deliberately weaker than 'the sequence itself converges.'"

**INCORRECT:** Student answers (b) "converges to 0, since 0 appears most often in the pattern" (treating frequency of a value as equivalent to convergence).
→ "Convergence requires ALL sufficiently late terms to stay arbitrarily close to one value — appearing 'most often' is irrelevant; the terms equal to $1$ and $-1$ recur infinitely often too (at $n=1,5,9,\ldots$ and $n=3,7,11,\ldots$ respectively), so no tolerance tube around 0 (however wide, as long as it excludes 1 and −1) ever traps the whole tail — the sequence genuinely does not converge to 0 or to anything else."

**NO_RESPONSE:** → "(a) Bounded, all terms in [-1,1]. (b) Does not converge — it cycles through 1, 0, -1 forever, never settling near one value. (c) The subsequence at multiples of 4 is constantly 0, converging to 0 (one valid choice among several)."

---

### Teaching Action A03 — Mastery Gate (P91)

**Primitive:** P91 = P77→P55→P76→P55→P75→P55→P74→P55→P78
**Purpose:** Assess ε–N proof construction, the bounded/convergent distinction, and correct statement/application of Bolzano–Weierstrass under transfer

---

**[P77 — MULTI-PROBLEM SET]** *(4 problems)*

**Problem 1:** Using the ε–N definition, find N (in terms of ε) proving $\dfrac{3n+1}{n} \to 3$.

*Solution:* $\left|\dfrac{3n+1}{n}-3\right| = \left|\dfrac1n\right| = \dfrac1n$. Need $1/n<\epsilon$: $N=1/\epsilon$ works.

**Problem 2:** Is the sequence $d_n = n\cdot(-1)^n$ bounded? Convergent? Justify each.

*Solution:* NOT bounded — $|d_n|=n\to\infty$, so no single M bounds all terms. Since convergent ⟹ bounded (A01's theorem), and $d_n$ is unbounded, it CANNOT be convergent (using the contrapositive directly, no separate ε–N argument needed).

**Problem 3:** State Bolzano–Weierstrass precisely (one sentence), and explain why it does NOT contradict the fact that $(-1)^n$ diverges.

*Solution:* Every bounded sequence has a convergent subsequence. This doesn't contradict $(-1)^n$'s divergence because the theorem only promises SOME subsequence converges (e.g. the even-indexed constant-1 subsequence), not that the full original sequence converges.

**Problem 4:** True or false: "If a sequence is bounded, then by Bolzano–Weierstrass, the sequence itself converges." Correct the statement if false.

*Solution:* **False.** Correct: if a sequence is bounded, Bolzano–Weierstrass guarantees it has a convergent SUBSEQUENCE — the sequence itself need not (and often does not) converge, as $(-1)^n$ demonstrates.

---

**[P55 — SCORE]**
Count correct responses. Record raw score S₁ (0–4) after P77.

---

**[P76 — TRANSFER PROBE]** *(P76_mode: independence)*

**Prompt:** Define $e_n = \left(1+\dfrac{(-1)^n}{n}\right)$ for $n\ge1$.

(a) Is $e_n$ bounded? Prove your answer directly (exhibit an explicit bound, or show none exists).
(b) Does $e_n$ converge? If you believe it does, give a full ε–N proof (not a numerical spot-check) for the value you claim; if you believe it does not, give a rigorous argument (in the style of the $(-1)^n$ argument in A02) showing no single limit works.
(c) A student claims: "Since $e_n$ involves $(-1)^n$, just like the classic non-convergent example, it must also fail to converge, by the same reasoning." Evaluate this claim — is the mere presence of $(-1)^n$ in a formula sufficient to conclude divergence, or does it depend on how it's used? Justify using your answer to (b).

**Expected solution:**

(a) Bounded: for $n\ge1$, $|(-1)^n/n|\le1$, so $e_n = 1+(-1)^n/n \in [1-1, 1+1]=[0,2]$ for all $n$ (tightest at $n=1$: $e_1=1-1=0$; as $n$ grows the term shrinks toward 1). Explicit bound: $M=2$ works, since $|e_n|\le2$ for all $n$.

(b) $e_n$ **converges to 1.** Proof: given arbitrary $\epsilon>0$, $|e_n - 1| = \left|\dfrac{(-1)^n}{n}\right| = \dfrac1n$ (since $|(-1)^n|=1$). Need $1/n<\epsilon$: take $N=1/\epsilon$. Then for $n>N$: $|e_n-1|=1/n<\epsilon$. This holds for every $\epsilon>0$, so $e_n\to1$ by the definition.

(c) The claim is **wrong as a general principle** — the mere presence of $(-1)^n$ somewhere in a formula does not by itself force divergence; what matters is whether the OSCILLATING part is multiplied by something that shrinks to 0 (as here, where $(-1)^n$ is divided by $n\to\infty$, so its entire contribution vanishes in the limit) versus standing alone at full, non-shrinking amplitude (as in the classic $(-1)^n$ example itself, where the oscillation never shrinks). Here, $(-1)^n/n \to 0$ regardless of the sign pattern (since $|(-1)^n/n| = 1/n \to 0$ irrespective of which sign occurs), so the oscillation gets squeezed out entirely, and $e_n$ genuinely converges to 1 — showing that structurally superficial similarity to a known divergent example (both involve $(-1)^n$) is not a substitute for actually checking the ε–N definition (or an equivalent rigorous squeeze argument) on the specific sequence at hand.

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

- MASTERY ACHIEVED → unlock math.real.cauchy-sequence and math.real.series-rigorous; record completion
- NEAR MASTERY → flag for Protocol B on specific missed item(s); re-assess next session
- MASTERY NOT ACHIEVED → execute Protocol B immediately

---

**[P55 — SCORE]**
Record routing outcome.

---

**[P78 — COMPLETION]**

Session record: concept math.real.convergence-sequences assessed. Mastery status logged. Student directed to next concept or repair protocol per P74 routing.

---

## Component 5 — Protocol B (Misconception Repair)

### Repair Action B01 — EPSILON-IS-A-SPECIFIC-NUMBER (MC-1)

**[P27 — MISCONCEPTION NAMING]**
"Checking convergence for one specific ε and stopping is EPSILON-IS-A-SPECIFIC-NUMBER. A convergence proof must supply a valid N for an ARBITRARY ε>0 — a formula for N in terms of ε, not a single numerical check."

**[P41 — MISCONCEPTION DETECTOR]**
Diagnostic: "Prove 2/n → 0."
- MC-1 response: checks only e.g. ε=0.1 with a specific N, declares the proof complete.

**[P64 — CONCEPTUAL SHIFT]**
"A single ε only illustrates the pattern for one case — redo it with ε left as a SYMBOL: need $2/n<\epsilon$, i.e. $n>2/\epsilon$, so $N=2/\epsilon$ (a FORMULA, not a number) instantly supplies a valid N for whatever ε is given, including ε=0.1 (giving N=20) but also ε=0.0000001 (giving N=20{,}000{,}000) — the formula covers every case at once, which is what 'arbitrary ε' demands."

Practice: Prove (with a formula for N in terms of ε, not a numerical spot-check) that $5/n^2 \to 0$.

---

### Repair Action B02 — BOUNDED-IMPLIES-CONVERGENT (MC-2)

**[P27 — MISCONCEPTION NAMING]**
"Believing every bounded sequence converges is BOUNDED-IMPLIES-CONVERGENT. Convergent ⟹ bounded is a true theorem; its converse is false — (−1)ⁿ is the standard counterexample."

**[P41 — MISCONCEPTION DETECTOR]**
Diagnostic: "(−1)ⁿ stays within [−1,1] forever. Does it converge?"
- MC-2 response: "Yes, since it's bounded."

**[P64 — CONCEPTUAL SHIFT]**
"Boundedness only restricts the RANGE; convergence additionally requires eventually settling near ONE value. Check directly: using ε=1 in the definition, convergence to some L would require all late terms within 1 of L — but (−1)ⁿ keeps hitting BOTH 1 and −1 forever (2 apart), so no such L can trap them all past any point. 'Convergent ⟹ bounded' is a one-directional theorem (proved by using ε=1 to trap all-but-finitely-many terms); its converse simply fails."

Practice: Show directly (using the definition, not just intuition) that $\cos(n\pi)$ (equal to $(-1)^n$) does not converge, by identifying two values it takes infinitely often.

---

### Repair Action B03 — BOLZANO-WEIERSTRASS-MEANS-SEQUENCE-CONVERGES (MC-3)

**[P27 — MISCONCEPTION NAMING]**
"Reading Bolzano–Weierstrass as 'every bounded sequence converges' is BOLZANO-WEIERSTRASS-MEANS-SEQUENCE-CONVERGES. The theorem guarantees a convergent SUBSEQUENCE, never convergence of the whole original sequence."

**[P41 — MISCONCEPTION DETECTOR]**
Diagnostic: "(−1)ⁿ is bounded. By Bolzano–Weierstrass, does it converge?"
- MC-3 response: "Yes, Bolzano-Weierstrass says bounded sequences converge."

**[P64 — CONCEPTUAL SHIFT]**
"Re-read the theorem's exact conclusion: 'has a convergent SUBSEQUENCE' — not 'converges.' Apply it correctly to (−1)ⁿ: the even-indexed terms form the constant subsequence $1,1,1,\ldots\to1$; that IS the convergent subsequence the theorem promises. The full sequence $(-1)^n$ itself still does not converge (proved in B02) — both facts are true simultaneously and don't conflict, because the theorem's guarantee is about an EXTRACTED subsequence, a strictly weaker claim than convergence of the whole thing."

Practice: For $f_n = (-1)^n + 1/n$ (bounded, and also divergent, by a similar argument to (−1)ⁿ), name a convergent subsequence guaranteed by Bolzano-Weierstrass and state its limit.

---

## Component 6 — P89 Spaced Repetition Schedule

**[P89 — SPACED REPETITION]**

| Review | Delay | Focus |
|--------|-------|-------|
| SR-1 | +1 day | Reconstruct the $1/n\to0$ ε–N proof from memory, including solving explicitly for N in terms of ε |
| SR-2 | +3 days | Restate "convergent ⟹ bounded" and its proof sketch (using ε=1); explain why the converse fails, citing (−1)ⁿ |
| SR-3 | +7 days | State Bolzano–Weierstrass precisely and apply it correctly to a fresh bounded, divergent sequence, naming an explicit convergent subsequence |
| SR-4 | +14 days | Prove convergence (full ε–N, not a spot-check) for a sequence combining a shrinking oscillating term (as in the A03 transfer probe), and explain why superficial resemblance to a divergent example is not sufficient evidence either way |

Retrieval flag: if student's "proof" checks only one numerical ε (MC-1) or claims boundedness alone (or Bolzano–Weierstrass) guarantees convergence (MC-2/MC-3), re-execute B01/B02/B03 before continuing.

---

## Component 7 — Cross-Blueprint Dependencies

**[GR-8: Cross-link documentation]**

| Direction | Concept | Relationship |
|-----------|---------|---------------|
| Requires (Tier-1) | math.real.completeness | The Archimedean property (used in A01's proof that $1/n\to0$) and the general sup/bounded-set machinery both descend directly from completeness |
| Requires (Tier-1) | math.seq.sequence | Supplies the basic ordered-list vocabulary this concept makes rigorous via ε–N |
| Unlocks | math.real.cauchy-sequence | Cauchy sequences are defined via a closely related ε-based condition (terms close to EACH OTHER rather than to a fixed limit), building directly on the ε-N fluency developed here |
| Unlocks | math.real.series-rigorous | Series convergence is defined as convergence of the sequence of partial sums — this concept's definition applies unchanged, just to a different sequence |

**GR-9:** cross_links: math.seq.series-convergence is listed in the KG but has **no authored blueprint yet** — P76_mode is therefore set to independence for now; once math.seq.series-convergence is authored, a future revision may add a genuine cross-link probe connecting sequence convergence to the derived notion of series convergence via partial sums.

---

## Component 8 — Teaching Notes

**Structural decisions:**
- h=6 → standard structure (2 main TAs + gate), matching the concept's tightly focused scope (one definition, one direct theorem, one companion theorem) despite its expert difficulty
- bloom=apply → checkpoints emphasize constructing explicit ε–N proofs (a procedural skill), not merely stating definitions
- CPA_entry = C for an expert learner: a complete worked ε–N proof (1/n→0) opens the concept, so the logical structure (arbitrary ε, then produce N) is seen in full before any theorem statement risks being read as a shortcut around it

**Key teaching insight:** MC-1 is this concept's root misconception because ε–N proofs are the FIRST place many students encounter a definition requiring a universally-quantified variable (∀ε) to be handled symbolically rather than numerically — every subsequent theorem in real analysis (including convergent⟹bounded and Bolzano-Weierstrass, both covered here) is stated and proved using this same "for arbitrary X, produce Y" logical pattern, so getting the arbitrary-ε discipline right here has outsized downstream leverage. A02's Contrast 3 is deliberately placed AFTER Contrasts 1-2 (rather than first) so the student has already seen genuine ε–N proofs in A01 before being shown what a non-proof (single-ε spot check) looks like by comparison.

**MC-2/MC-3 as one family, not two independent errors:** Both misconceptions stem from the same category error — over-reading a true, specific, narrower theorem (convergent⟹bounded; bounded⟹convergent SUBSEQUENCE exists) as its stronger, false converse or generalization (bounded⟹convergent). A02 deliberately reuses the IDENTICAL example ((−1)ⁿ, then a second confirming example, sin(nπ/2), in the checkpoint) for both contrasts, so the single concrete counterexample does double duty rather than requiring two unrelated examples to be remembered.

**Sequencing note (cross-link):** math.seq.series-convergence (convergence of infinite series, defined via convergence of the partial-sum sequence) is not yet authored in the corpus; this blueprint's ε–N machinery is exactly what that future blueprint will need to invoke, and Component 7 records the pending cross-link so a future authoring pass can connect them explicitly.

---

## Component 10 — Validation Checklist

| Code | Rule | Check | Status |
|------|------|-------|--------|
| V-1 | Concept ID matches KG | math.real.convergence-sequences ✓ | PASS |
| V-2 | All Tier-1 requires have existing blueprints | math.real.completeness ✓, math.seq.sequence ✓ | PASS |
| V-3 | CPA entry = C for expert difficulty | C (Concrete) ✓ | PASS |
| V-4 | bloom=apply → P07 recommended | Explicit N-construction tasks throughout A01-A03 ✓ | PASS |
| V-5 | GR-1: A01 opens with B-category primitive | P11 REPRESENTATION SHIFT ✓ | PASS |
| V-6 | GR-2: each non-gate TA has P49 with 4 branches | A01, A02 each have P49 CORRECT/PARTIAL/INCORRECT/NO_RESPONSE ✓ | PASS |
| V-7 | GR-3: gate TA (A03) is terminal | A03=P91; no further TAs ✓ | PASS |
| V-8 | GR-4: repair TAs open with P27+P41+P64 | B01, B02, B03 each: P27→P41→P64 ✓ | PASS |
| V-9 | GR-6: P91 terminal in its TA | P91 is A03; A03 is the last TA ✓ | PASS |
| V-10 | GR-7: P76 present in mastery gate | P76 in A03 between P77 and P75 ✓ | PASS |
| V-11 | GR-8: cross_links documented in Component 7 | requires and unlocks documented; not-yet-authored cross-link noted ✓ | PASS |
| V-12 | GR-9: P76 mode correct for cross_links | cross_link target not yet authored → P76=independence ✓ | PASS |
| V-13 | GR-10: MAMR stated and enforced | MAMR=5/5 stated in C0 and P75 gate ✓ | PASS |
| V-14 | MAMR formula correct | ⌈0.9×5⌉=⌈4.5⌉=5; PASS=5/5 ✓ | PASS |
| V-15 | P91 structure complete | P77(4)→P55→P76(1)→P55→P75→P55→P74→P55→P78 ✓ | PASS |
| V-16 | P77 has exactly 4 problems | Problems 1–4 verified ✓ | PASS |
| V-17 | 3 misconceptions with FOUNDATIONAL declared | MC-1 FOUNDATIONAL, MC-2, MC-3 ✓ | PASS |
| V-18 | P89 spaced repetition present | Component 6 with 4 SR intervals ✓ | PASS |
| V-19 | Structure matches h | h=6, tightly-scoped → compact (2 main TAs + gate); A01+A02+A03 ✓ | PASS |
| V-20 | P76 transfer probe is novel and correct | Shrinking-oscillation sequence; superficial-resemblance-is-not-evidence argument ✓ | PASS |
| AIR | All internal references consistent | Concept IDs, MAMR, bloom, difficulty consistent throughout ✓ | PASS |
