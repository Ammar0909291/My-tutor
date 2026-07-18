<!-- BLUEPRINT: math.real.completeness -->
<!-- STATUS: PACKAGE_READY -->
<!-- SPEC VERSION: 1.0 -->

# Teaching Blueprint: Completeness of ℝ
**Concept ID:** `math.real.completeness`
**KG Fields:** difficulty=expert | bloom=understand | estimated_hours=5 | mastery_threshold=0.9

---

## Component 0 — Metadata

| Field | Value |
|-------|-------|
| concept_id | math.real.completeness |
| name | Completeness of ℝ |
| difficulty | expert |
| bloom | understand |
| estimated_hours | 5 |
| mastery_threshold | 0.9 |
| CPA_entry_stage | C (Concrete) |
| requires (Tier-1) | math.found.real-numbers, math.found.total-order |
| cross_links | math.fnal.completeness (not yet authored — see Component 7) |
| P76_mode | independence |
| MAMR | 5/5 (⌈0.9 × 5⌉) |

---

## Component 1 — Cognitive Map

### Prior Knowledge Anchors
- **math.found.real-numbers**: ℝ as the set encompassing all rationals and irrationals; the informal idea of the "real line" with no gaps, previewed but not yet made precise
- **math.found.total-order**: every pair of reals is comparable (a≤b or b≤a); the ordering ℝ inherits, which supremum/upper-bound language is built on top of

### Target Knowledge State
Student can state the completeness axiom precisely (every nonempty subset of ℝ bounded above has a supremum/least upper bound in ℝ); correctly distinguish supremum from maximum (a set's sup need not be an element of the set); explain concretely why ℚ fails to have this property (using {x∈ℚ: x²<2}, whose supremum √2 is irrational); state the Cauchy-sequence-convergence formulation as an equivalent characterization of completeness; and correctly distinguish "bounded" from "Cauchy" (a bounded sequence need not converge, while completeness specifically guarantees CAUCHY sequences converge).

### Conceptual Obstacles
1. Assuming the supremum must belong to the set — sup((0,1))=1, but 1∉(0,1); many students conflate "least upper bound" with "largest element," when the whole reason sup is needed as a separate concept from max is that a bounded set may have no maximum at all
2. Assuming ℚ has the same completeness property as ℝ — the classic counterexample S={x∈ℚ: x²<2} is nonempty and bounded above (by, say, 2) within ℚ, yet has NO least upper bound in ℚ (its natural supremum, √2, is irrational); this is precisely the property that distinguishes ℝ from ℚ
3. Confusing "bounded" with "Cauchy" — a bounded sequence like (−1)ⁿ never gets arbitrarily close to converging (it oscillates forever between −1 and 1), while completeness's sequence-form guarantee applies specifically to CAUCHY sequences (whose terms get arbitrarily close to EACH OTHER, a strictly stronger condition than merely staying bounded)

---

## Component 2 — Misconception Registry

| ID | Label | Description | Trigger |
|----|-------|-------------|---------|
| MC-1 | SUPREMUM-MUST-BE-ATTAINED | Student assumes sup(S) must be an element of S, confusing supremum with maximum; rejects or misidentifies the supremum of open-ended sets like (0,1) | Any bounded set with no maximum element, e.g. (0,1), {1/n : n∈ℕ} (inf=0, not attained) |
| MC-2 | COMPLETENESS-HOLDS-IN-RATIONALS | Student assumes ℚ also satisfies the least-upper-bound property, since ℚ is "dense" and "orderly"; does not see why ℝ specifically is needed for completeness | Any question contrasting ℝ and ℚ; the set {x∈ℚ: x²<2} |
| MC-3 | BOUNDED-SEQUENCE-CONVERGES | Student conflates "bounded" with "Cauchy," believing every bounded sequence must converge (by completeness); misses that completeness's sequence-form guarantee is specifically about Cauchy sequences, a strictly stronger condition | Any bounded, non-convergent sequence, e.g. (−1)ⁿ, or sin(n) |

**Foundational Misconception:** MC-1 (SUPREMUM-MUST-BE-ATTAINED) — the supremum concept exists precisely because "maximum" fails to exist for many important bounded sets (any open interval, any strictly increasing bounded sequence's range); a student who insists the supremum must be attained cannot correctly state or apply the completeness axiom itself, since the axiom's entire content is that a least upper bound EXISTS IN ℝ even when it is not an element of the original set S.

---

## Component 3 — Scaffolding Protocol

**Entry point:** C (Concrete) — expert learner computes sup/inf for several concrete bounded sets (some with the bound attained, some not) before the formal axiom, anchoring the sup-vs-max distinction in specific numbers first.

**Scaffolding sequence:**
1. **A01 P11 REPRESENTATION SHIFT** — C: sup/inf computed for [0,1], (0,1), {1/n}; P: a number-line picture of "the least fence" intuition for supremum; A: the formal completeness axiom and its Cauchy-sequence-equivalent formulation
2. **A02 P06 CONTRAST PAIR** — sup vs max on (0,1) (MC-1); ℚ vs ℝ using {x∈ℚ:x²<2}→√2 (MC-2); bounded vs Cauchy using (−1)ⁿ (MC-3)
3. **A03 P28 CONFLICT EVIDENCE** — deriving the Archimedean property from completeness by contradiction, and briefly the density of ℚ in ℝ, showing completeness's power as a genuine working tool, not just a definitional curiosity
4. **A04 P91 Gate** — mastery assessment

---

## Component 4 — Protocol A (Main Teaching Sequence)

### Teaching Action A01 — The Least Fence: Supremum and the Completeness Axiom

**Primitive:** P11 REPRESENTATION SHIFT
**Purpose:** Ground supremum in direct computation on concrete sets before the axiom is stated; state both the supremum form and the Cauchy-sequence form of completeness

---

**[P11 — REPRESENTATION SHIFT]**

**Stage C — Concrete (sup/inf computed on three sets):**

- $S_1 = [0,1]$: sup$(S_1)=1$, and $1\in S_1$ — here the supremum IS the maximum.
- $S_2 = (0,1)$: sup$(S_2)=1$, but $1\notin S_2$ — no element of $(0,1)$ is the largest; for any $x\in(0,1)$, $(x+1)/2$ is also in $(0,1)$ and larger. Yet $1$ is still the LEAST upper bound: any number smaller than $1$ (say $1-\epsilon$) fails to bound the set, since elements of $(0,1)$ exceed $1-\epsilon$ once they're close enough to $1$.
- $S_3 = \{1/n : n\in\mathbb{N}\}=\{1, 1/2, 1/3, \ldots\}$: sup$(S_3)=1$ (attained, at $n=1$), but inf$(S_3)=0$, and $0\notin S_3$ (no term of the sequence ever equals $0$, though terms get arbitrarily close).

**Stage P — Pictorial (supremum as "the least fence"):**

```
   0        (0,1)         1
   |░░░░░░░░░░░░░░░░░░░░░░|
                           ↑
                    least upper bound (fence)
                    — any fence to the LEFT of 1
                    lets some point of (0,1) through
```

A supremum is the tightest possible "fence" above the set — any candidate fence smaller than the true sup fails to contain the set, while the sup itself (even when not a member) is the smallest number that successfully bounds every element.

**Stage A — Abstract (the completeness axiom, two equivalent forms):**

**Completeness Axiom (supremum form):** Every nonempty subset $S\subseteq\mathbb{R}$ that is bounded above has a supremum (least upper bound) in $\mathbb{R}$.

**Equivalent form (Cauchy sequences):** Every Cauchy sequence in $\mathbb{R}$ converges (to a limit in $\mathbb{R}$). (A sequence $(a_n)$ is Cauchy if for every $\epsilon>0$ there is $N$ such that $|a_m-a_n|<\epsilon$ for all $m,n\ge N$ — the TERMS get arbitrarily close to EACH OTHER, without yet knowing what they converge to.)

These two statements are provably equivalent characterizations of the same underlying property; textbooks vary in which they take as the axiom and which they derive. This is THE property that distinguishes $\mathbb{R}$ from $\mathbb{Q}$ (A02 makes this concrete), and it underlies every convergence argument in real analysis and calculus.

---

**[P49 — ADAPTIVE CHECKPOINT]**

**Prompt:** For $S = \{x\in\mathbb{R} : x^2 < 4\} = (-2,2)$, find sup$(S)$ and inf$(S)$, and state whether each is attained (an element of $S$).

**CORRECT:** sup$(S)=2$, not attained ($2\notin(-2,2)$, since $2^2=4\not<4$). inf$(S)=-2$, not attained similarly.
→ "Correct. Neither bound is attained here — a useful reminder that BOTH ends of an interval can fail to be members while still being genuine sup/inf." → Proceed to A02.

**PARTIAL:** Student correctly finds the numeric values 2 and −2 but doesn't address whether they're attained, or assumes they must be since "that's what the boundary of the set is."
→ "The numeric values are right, but check membership directly: is $2\in(-2,2)$? The condition is $x^2<4$ (strict inequality), and $2^2=4$, which is NOT less than 4 — so $2\notin S$. Same for $-2$. Both the sup and the inf exist as real numbers (completeness guarantees this) without being elements of $S$ itself."

**INCORRECT:** Student answers "S has no supremum because it has no maximum element" (MC-1).
→ "A set can have a supremum without having a maximum — that's exactly the point of the concept. sup$(S)=2$ exists as the LEAST upper bound (no smaller number bounds every element of $(-2,2)$ — for any candidate $2-\epsilon$, some $x\in(-2,2)$ with $x>2-\epsilon$ can always be found), even though no single element of $S$ equals 2. 'No maximum' and 'no supremum' are different claims; completeness guarantees the second always exists (for nonempty, bounded-above sets) even when the first fails."

**NO_RESPONSE:** → "$S=(-2,2)$. sup$(S)=2$: not attained, since $2^2=4$ fails the strict inequality $x^2<4$. inf$(S)=-2$: not attained, by the same reasoning. Both exist as real numbers by completeness, without being members of $S$."

---

### Teaching Action A02 — Sup vs. Max, ℝ vs. ℚ, Bounded vs. Cauchy

**Primitive:** P06 CONTRAST PAIR
**Purpose:** Break MC-1 with a direct sup/max contrast; break MC-2 with the classical √2 counterexample in ℚ; break MC-3 with a bounded-but-non-convergent sequence

---

**[P06 — CONTRAST PAIR]**

**Contrast 1 — Supremum exists; maximum may not (MC-1):**

| Set | Maximum? | Supremum |
|-----|----------|----------|
| $[0,1]$ | Yes, max=1 | sup=1 (attained) |
| $(0,1)$ | **No maximum** (for any candidate $x<1$, $(x+1)/2$ is larger and still in $(0,1)$) | sup=1 (NOT attained) |
| $\{1-1/n : n\in\mathbb{N}\}$ | **No maximum** (each term is beaten by the next) | sup=1 (NOT attained, and not even a limit point reached by any single term) |

Completeness guarantees the RIGHT-HAND column always exists (for nonempty, bounded-above sets); it makes no promise about the LEFT-HAND column, which frequently fails. A set having no maximum is completely ordinary; a set having no supremum in ℝ never happens.

**Contrast 2 — ℝ has the property; ℚ does not (MC-2), the classical example:**

Let $S=\{x\in\mathbb{Q} : x^2<2\}$ — a nonempty (contains 1, 1.4, 1.41, …), bounded-above (by 2, for instance) subset of ℚ.

*Within ℝ:* $S$ has a supremum, namely $\sqrt{2}$ (an irrational real number) — completeness of ℝ guarantees this.

*Within ℚ:* There is **no rational number that is the least upper bound of $S$**. Any rational upper bound $q$ of $S$ satisfies $q>\sqrt2$ (since $\sqrt2$ itself is irrational, $q\ne\sqrt2$); but between $\sqrt2$ and any such $q$, another rational number can always be found that is still $>\sqrt2$ hence still an upper bound of $S$ but SMALLER than $q$ — so no rational upper bound can be the SMALLEST one. $S$ is bounded above within ℚ but has no supremum in ℚ.

**This is precisely the property that fails in ℚ and holds in ℝ** — completeness is not a minor technical add-on, it is the exact statement of what makes ℝ "have no gaps" that ℚ does have (at every irrational number).

**Contrast 3 — Bounded is not Cauchy (MC-3):**

The sequence $a_n=(-1)^n = -1, 1, -1, 1, \ldots$ is **bounded** (every term lies in $[-1,1]$) but is **NOT Cauchy**: for $m$ even and $n$ odd, $|a_m-a_n|=|1-(-1)|=2$, which never shrinks no matter how large $m,n$ get — the terms never get close to each other, let alone converge. Consequently $a_n$ does **not converge** (it has no limit; check: it doesn't even get close to either $1$ or $-1$ permanently).

Completeness's sequence-form guarantee is specifically: **every CAUCHY sequence converges.** $(-1)^n$ is bounded but fails to be Cauchy, so completeness says nothing about it converging — and indeed it doesn't. "Bounded" only says the terms stay in a fixed range; "Cauchy" says the terms bunch together arbitrarily tightly — a much stronger, different condition.

---

**[P49 — ADAPTIVE CHECKPOINT]**

**Prompt:** (a) Does $T=\{x\in\mathbb{Q} : x^3<5\}$ have a supremum in ℚ? Justify briefly using the same reasoning as the √2 example. (b) Is the sequence $b_n = \sin(n)$ Cauchy? Is it bounded? Does completeness guarantee it converges?

**CORRECT:** (a) No — the natural supremum is $5^{1/3}$ (the real cube root of 5), which is irrational (5 is not a perfect cube), so by the same "squeeze" argument as $\sqrt2$, no rational number can be the least upper bound of $T$ within ℚ. (b) $\sin(n)$ is bounded (always in $[-1,1]$) but is NOT Cauchy — it oscillates without the terms bunching together (e.g. $\sin(n)$ takes values arbitrarily close to both $1$ and $-1$ infinitely often, so consecutive far-apart indices can have terms far apart). Since it's bounded but not Cauchy, completeness's guarantee (Cauchy ⟹ convergent) simply does not apply, and indeed $\sin(n)$ does not converge.
→ "Correct on both — (a) generalizes the √2 argument correctly to a different irrational root, and (b) correctly separates 'bounded' from 'Cauchy' for a genuinely different (non-alternating) oscillating example." → Proceed to A03.

**PARTIAL:** Student gets (a) but answers (b) "since it's bounded, completeness guarantees it converges" (MC-3).
→ "Completeness's sequence form applies to CAUCHY sequences, not merely bounded ones. $\sin(n)$ is bounded, yes, but check whether its terms bunch together: they don't — $\sin(n)$ keeps revisiting values near both $1$ and $-1$ forever, so it fails to be Cauchy, and completeness makes no promise about it. 'Bounded' is necessary but nowhere near sufficient for convergence; Cauchy is the actual hypothesis completeness's sequence form requires."

**INCORRECT:** Student answers (a) "yes, T has a rational supremum since ℚ is a well-behaved number system" (MC-2).
→ "Check directly, as with √2: the real supremum of $T$ is $\sqrt[3]{5}$, and 5 is not a perfect cube (no rational number cubes to exactly 5), so $\sqrt[3]{5}$ is irrational. By the identical squeeze argument used for √2 — any rational upper bound of $T$ can always be replaced by a smaller one still above $\sqrt[3]{5}$ — no rational number can be $T$'s least upper bound. ℚ 'being well-behaved' in other ways (ordered, dense) does not grant it the completeness property; that is exactly the gap ℝ was built to fill."

**NO_RESPONSE:** → "(a) No — $T$'s real supremum is $\sqrt[3]{5}$, irrational, so no rational least upper bound exists (same argument as √2). (b) $\sin(n)$ is bounded but not Cauchy (its terms don't bunch together); completeness's guarantee needs Cauchy, so it does not apply, and indeed $\sin(n)$ does not converge."

---

### Teaching Action A03 — Completeness as a Working Tool: The Archimedean Property

**Primitive:** P28 CONFLICT EVIDENCE
**Purpose:** Show completeness is not merely definitional bookkeeping but a genuine proof tool, by deriving the Archimedean property from it; surface what would go wrong without completeness

---

**[P28 — CONFLICT EVIDENCE]**

**Claim (Archimedean Property):** For every real number $x$, there exists a natural number $n$ with $n>x$. (Informally: no real number is "larger than every natural number" — ℕ is unbounded within ℝ.)

A student unfamiliar with the proof might assume this is "obviously true" without realizing it genuinely REQUIRES completeness to prove rigorously (it is not simply true "by inspection" in every ordered field — there exist exotic ordered fields, beyond this concept's scope, where an Archimedean-like property fails).

**Proof, by contradiction, using completeness directly:**

Suppose the claim is false: some real number $x$ satisfies $n\le x$ for EVERY natural number $n$. Then $\mathbb{N}$ (as a subset of $\mathbb{R}$) is nonempty and bounded above (by $x$). By the **completeness axiom**, $\mathbb{N}$ has a supremum $s=\sup(\mathbb{N})\in\mathbb{R}$.

Since $s$ is the LEAST upper bound, $s-1$ is NOT an upper bound of $\mathbb{N}$ (any number smaller than the least upper bound fails to bound the set). So there exists some $m\in\mathbb{N}$ with $m>s-1$, i.e. $m+1>s$. But $m+1$ is also a natural number, and $m+1>s$ contradicts $s$ being an upper bound of $\mathbb{N}$ (every natural number, including $m+1$, must be $\le s$). **Contradiction.** Hence no such $x$ exists — the Archimedean property holds.

**Why this matters:** The proof used completeness in an essential way — the existence of $\sup(\mathbb{N})$ was assumed for contradiction, and it was completeness that guaranteed this supremum exists in the first place (as a real number) so that the "$s-1$ is not an upper bound" argument could even be run. Without completeness, this argument has no foothold: in a hypothetical ordered field lacking completeness, unbounded-above subsets might fail to have any supremum to derive a contradiction from, and the Archimedean property can genuinely fail.

**A quick consequence (density of ℚ in ℝ):** The Archimedean property is the key step in proving that between any two distinct real numbers $a<b$, a rational number exists — a fact used constantly in analysis (e.g. approximating any real number arbitrarily closely by rationals) and itself a further payoff of completeness's chain of consequences.

---

**[P49 — ADAPTIVE CHECKPOINT]**

**Prompt:** In the Archimedean property proof, identify the exact step where completeness is used, and explain in one sentence what would break in the argument if completeness were simply assumed false (i.e. if some bounded-above set of naturals had NO supremum in ℝ).

**CORRECT:** Completeness is used at "By the completeness axiom, ℕ has a supremum $s\in\mathbb{R}$" — this is the step that produces the object $s$ the rest of the contradiction argument manipulates. Without completeness, $\mathbb{N}$ (assumed bounded above by hypothesis) might have no supremum in ℝ at all, so there would be no $s$ to derive a contradiction from, and the entire proof strategy collapses at its first step.
→ "Correct — this is exactly why completeness is called a genuine working axiom rather than a cosmetic definition: entire proof strategies (by contradiction, via a supremum) are simply unavailable without it." → Proceed to A04.

**PARTIAL:** Student identifies the right general area (something about the supremum existing) but doesn't pin down that it's specifically the EXISTENCE guarantee (as opposed to, say, the value of $s$) that completeness supplies.
→ "Be precise: completeness's contribution is purely EXISTENTIAL — it guarantees *some* real number $s=\sup(\mathbb{N})$ exists, given that $\mathbb{N}$ is (by the contradiction hypothesis) bounded above. The rest of the proof (deriving $m+1>s$) uses only the definition of 'least upper bound,' not completeness again. So completeness is invoked exactly once, to produce $s$."

**INCORRECT:** Student claims completeness is used when concluding "$m+1$ is also a natural number" or some other purely set-theoretic step.
→ "That step uses only the closure of ℕ under $+1$ (an ordinary fact about natural numbers, nothing to do with completeness). Completeness is used earlier and exactly once: at the moment the proof asserts 'ℕ has a supremum $s\in\mathbb{R}$' — that assertion is not available for free in an arbitrary ordered field; it is precisely what the completeness axiom supplies."

**NO_RESPONSE:** → "Completeness is invoked at exactly one point: 'By completeness, ℕ has a supremum $s\in\mathbb{R}$.' Without that guarantee, the bounded-above set ℕ (under the contradiction hypothesis) might have no supremum to work with at all, and the rest of the contradiction argument (which manipulates $s$) would have nothing to manipulate."

---

### Teaching Action A04 — Mastery Gate (P91)

**Primitive:** P91 = P77→P55→P76→P55→P75→P55→P74→P55→P78
**Purpose:** Assess sup/max fluency, the ℝ-vs-ℚ distinction, the bounded-vs-Cauchy distinction, and completeness as a working proof tool

---

**[P77 — MULTI-PROBLEM SET]** *(4 problems)*

**Problem 1:** Find sup and inf of $S=\{2-1/n : n\in\mathbb{N}\}$, stating whether each is attained.

*Solution:* Terms: $1, 1.5, 5/3, \ldots \to 2$. sup$(S)=2$, NOT attained (no finite $n$ gives exactly 2). inf$(S)=1$, attained (at $n=1$).

**Problem 2:** Explain, referencing the completeness axiom directly, why $\{x\in\mathbb{Q} : x^2<3\}$ fails to have a rational supremum.

*Solution:* Within ℝ, completeness guarantees a supremum, namely $\sqrt3$ (irrational, since 3 is not a perfect square). Any rational upper bound of the set is strictly greater than $\sqrt3$, and a smaller rational upper bound (still $>\sqrt3$) can always be found — so no rational number is the LEAST rational upper bound; the set has no supremum within ℚ.

**Problem 3:** Is the sequence $c_n = (-1)^n \cdot (1 + 1/n)$ Cauchy? Bounded? Convergent? Justify each briefly.

*Solution:* Bounded: yes, terms stay within $[-2, 2]$ (actually within $(-2,2]$, since $|c_n|\le 1+1/n\le 2$). Cauchy: no — consecutive terms alternate sign and stay near $\pm1$, so e.g. $|c_2-c_1|=|1.5-(-2)|=3.5$, and this gap between an even and an odd term never shrinks toward 0 as $n\to\infty$ (even terms approach $1$, odd terms approach $-1$ — two different cluster points). Convergent: no, for the same reason (a convergent sequence's terms must eventually all bunch near one single limit; here they persistently split toward two different values).

**Problem 4:** State the completeness axiom in BOTH its supremum form and its Cauchy-sequence form, in one sentence each.

*Solution:* Supremum form: every nonempty subset of ℝ that is bounded above has a supremum (least upper bound) in ℝ. Cauchy form: every Cauchy sequence in ℝ converges to a limit in ℝ.

---

**[P55 — SCORE]**
Count correct responses. Record raw score S₁ (0–4) after P77.

---

**[P76 — TRANSFER PROBE]** *(P76_mode: independence)*

**Prompt:** Define $S = \{q \in \mathbb{Q} : q > 0 \text{ and } q^2 < 2\}$ — the same set as the classical example, restricted to positive rationals.

(a) Construct explicitly, using only the completeness axiom (not by simply citing "√2 exists"), an argument for why $S$ has a supremum when viewed as a subset of ℝ, but not when viewed as a subset of ℚ. Be precise about which axiom applies to which ambient set.
(b) A student argues: "But $S$ certainly has an upper bound in ℚ — for instance $q=2$ works, since every element of $S$ is less than 2. So $S$ IS bounded above in ℚ, which should be enough for it to have a supremum in ℚ too." Identify exactly which part of the completeness axiom's hypothesis this argument satisfies, and which part completeness is silent about (or rather, which conclusion completeness of ℝ — not of ℚ — actually licenses).
(c) Using the Archimedean property (from A03), briefly justify why there is no SMALLEST positive rational number greater than every element of $S$ — i.e. why the "squeeze" argument used in A02's Contrast 2 genuinely works and isn't just a plausibility claim.

**Expected solution:**

(a) Viewed as a subset of $\mathbb{R}$: $S$ is nonempty (e.g. $1\in S$) and bounded above in $\mathbb{R}$ (e.g. by 2). The completeness axiom, which is a property of $\mathbb{R}$ specifically, guarantees $S$ has a supremum in $\mathbb{R}$ — and that supremum is $\sqrt2$. Viewed as a subset of $\mathbb{Q}$: the SAME set $S$ is nonempty and bounded above WITHIN $\mathbb{Q}$ (2 is a rational upper bound), but $\mathbb{Q}$ does NOT satisfy the completeness axiom (that is the entire content of this concept) — so there is no guarantee, and in fact no actual rational least upper bound exists (by the squeeze argument in (c)). The key subtlety: completeness is a property of the AMBIENT ORDERED FIELD (ℝ vs. ℚ), not of the particular set $S$ — the identical set $S$ behaves differently depending on which field you ask "does a supremum exist IN this field."

(b) The student's argument correctly satisfies completeness's HYPOTHESIS as tested within ℚ (nonempty, bounded above by a rational number) — that part is genuinely true. What it misses is that completeness's CONCLUSION (a supremum exists) is licensed by the completeness AXIOM, which is a property ℝ has and ℚ does NOT have. Having an upper bound is a much weaker fact than being complete; every ordered field with elements above a bounded set trivially has SOME upper bound, but only a complete one is guaranteed to have a LEAST upper bound within that same field. ℚ satisfies the hypothesis (bounded above) without satisfying the axiom (completeness) that would deliver the conclusion.

(c) Suppose, for contradiction, some rational $q_0>0$ were the SMALLEST rational upper bound of $S$ (so $q_0^2\ge2$, and $q_0$ is rational, hence $q_0\ne\sqrt2$, hence $q_0^2>2$ strictly — since $q_0^2=2$ would force $q_0=\sqrt2$, impossible for a rational). Consider $q_1 = q_0 - \frac{q_0^2-2}{2q_0}$ (a standard rational refinement, well-defined and positive by the Archimedean property guaranteeing $q_0$ isn't infinitesimally close to a boundary in a way that breaks the arithmetic): a direct computation shows $q_1$ is rational, still $>\sqrt2$ (still an upper bound of $S$), yet strictly SMALLER than $q_0$ — contradicting $q_0$'s assumed minimality. Since a strictly smaller rational upper bound can ALWAYS be produced this way, no rational number can be the least one; the Archimedean property is what guarantees this refinement process is meaningful (it rules out the pathological possibility of some "infinitely small" gap that no further rational refinement could ever close), grounding the squeeze argument as a genuine proof rather than a hand-wave.

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

- MASTERY ACHIEVED → unlock math.real.sup-inf and math.real.archimedean; record completion
- NEAR MASTERY → flag for Protocol B on specific missed item(s); re-assess next session
- MASTERY NOT ACHIEVED → execute Protocol B immediately

---

**[P55 — SCORE]**
Record routing outcome.

---

**[P78 — COMPLETION]**

Session record: concept math.real.completeness assessed. Mastery status logged. Student directed to next concept or repair protocol per P74 routing.

---

## Component 5 — Protocol B (Misconception Repair)

### Repair Action B01 — SUPREMUM-MUST-BE-ATTAINED (MC-1)

**[P27 — MISCONCEPTION NAMING]**
"Assuming sup(S) must be an element of S is SUPREMUM-MUST-BE-ATTAINED. A supremum is the least upper bound — it may or may not belong to S; 'maximum' is the (stricter, often nonexistent) notion that requires membership."

**[P41 — MISCONCEPTION DETECTOR]**
Diagnostic: "What is sup((0,1))? Does (0,1) have a supremum?"
- MC-1 response: "No, (0,1) has no supremum because it has no largest element."

**[P64 — CONCEPTUAL SHIFT]**
"sup((0,1))=1 exists, even though $1\notin(0,1)$. Check the definition directly: is 1 an upper bound? Yes (every $x\in(0,1)$ satisfies $x<1$). Is it the LEAST upper bound? Yes — any smaller candidate, say $1-\epsilon$, fails to bound the set (some point of $(0,1)$, e.g. $1-\epsilon/2$, exceeds it). The set having 'no maximum' and the set having 'no supremum' are entirely different claims — completeness guarantees the second never happens (for nonempty, bounded-above sets), while the first happens constantly."

Practice: Find sup and inf of $\{1-1/n : n\ge1\}$ and state, for each, whether it is attained.

---

### Repair Action B02 — COMPLETENESS-HOLDS-IN-RATIONALS (MC-2)

**[P27 — MISCONCEPTION NAMING]**
"Assuming ℚ has the same completeness property as ℝ is COMPLETENESS-HOLDS-IN-RATIONALS. ℚ is ordered and dense, but it has 'gaps' at every irrational number — exactly where completeness fails."

**[P41 — MISCONCEPTION DETECTOR]**
Diagnostic: "Does {x∈ℚ : x²<2} have a supremum in ℚ?"
- MC-2 response: "Yes, since the set is bounded above by 2 and ℚ is well-ordered enough for that."

**[P64 — CONCEPTUAL SHIFT]**
"The set's natural least upper bound is $\sqrt2$, which is irrational — not a member of ℚ at all. Any rational candidate upper bound $q>\sqrt2$ can always be replaced by a smaller rational still greater than $\sqrt2$ (rationals are dense, so you can always squeeze closer to $\sqrt2$ without reaching it), so no rational number is the SMALLEST rational upper bound. The set has a supremum in ℝ (completeness of ℝ guarantees it, and it equals $\sqrt2$) but genuinely no supremum in ℚ — this precise failure is what 'ℚ is not complete' means."

Practice: Explain briefly why $\{x\in\mathbb{Q} : x^3 < 2\}$ also fails to have a rational supremum (its natural bound, $\sqrt[3]{2}$, is irrational).

---

### Repair Action B03 — BOUNDED-SEQUENCE-CONVERGES (MC-3)

**[P27 — MISCONCEPTION NAMING]**
"Believing every bounded sequence converges (by completeness) is BOUNDED-SEQUENCE-CONVERGES. Completeness's sequence-form guarantee applies to CAUCHY sequences specifically — a strictly stronger condition than merely staying within a fixed range."

**[P41 — MISCONCEPTION DETECTOR]**
Diagnostic: "The sequence (−1)ⁿ stays within [−1,1] forever. Does completeness guarantee it converges?"
- MC-3 response: "Yes, it's bounded, and ℝ is complete, so it must converge."

**[P64 — CONCEPTUAL SHIFT]**
"Check the Cauchy condition directly, not just boundedness: for $(-1)^n$, take $m$ even and $n$ odd — $|a_m-a_n|=2$ ALWAYS, no matter how large $m,n$ get. The terms never bunch together, so the sequence is not Cauchy, and completeness's guarantee (Cauchy ⟹ convergent) simply doesn't apply to it. Bounded only restricts the RANGE the terms live in; Cauchy additionally requires the terms to get arbitrarily CLOSE TO EACH OTHER eventually — a genuinely stronger, different property that many bounded sequences (like this one) lack entirely."

Practice: Verify that the bounded sequence $\sin(n\pi/2)$ (values cycling $1,0,-1,0,1,0,-1,0,\ldots$) is also not Cauchy, by exhibiting two indices whose terms stay far apart no matter how large the indices are.

---

## Component 6 — P89 Spaced Repetition Schedule

**[P89 — SPACED REPETITION]**

| Review | Delay | Focus |
|--------|-------|-------|
| SR-1 | +1 day | Recompute sup/inf for a fresh bounded set with an unattained bound; restate both forms of the completeness axiom from memory |
| SR-2 | +3 days | Reconstruct the √2-in-ℚ counterexample from scratch, including why the "squeeze" step genuinely rules out any rational least upper bound |
| SR-3 | +7 days | Classify a fresh sequence as bounded/Cauchy/convergent (all three checked separately), using an oscillating non-alternating example |
| SR-4 | +14 days | Reproduce the Archimedean property proof from completeness, identifying the exact single step where completeness is invoked |

Retrieval flag: if student claims a supremum must be an element of the set (MC-1) or that boundedness alone guarantees convergence (MC-3), re-execute B01/B03 before continuing.

---

## Component 7 — Cross-Blueprint Dependencies

**[GR-8: Cross-link documentation]**

| Direction | Concept | Relationship |
|-----------|---------|---------------|
| Requires (Tier-1) | math.found.real-numbers | ℝ is the set completeness is asserted about; without it there is no "ambient field" to state the axiom over |
| Requires (Tier-1) | math.found.total-order | "Bounded above" and "least upper bound" are order-theoretic notions built directly on the total order ℝ inherits |
| Unlocks | math.real.sup-inf | The formal sup/inf machinery (this concept's A01) is developed fully in that blueprint, building on the existence guarantee established here |
| Unlocks | math.real.archimedean | The Archimedean property, derived here in A03 as an application, is the dedicated subject of that later blueprint |

**GR-9:** cross_links: math.fnal.completeness is listed in the KG but has **no authored blueprint yet** (a Tier-2 concept later in the authoring queue) — P76_mode is therefore set to independence rather than cross-link probe for now; once math.fnal.completeness is authored, a future revision may add a genuine cross-link probe connecting real-number completeness to completeness of general metric/normed spaces (of which ℝ is the motivating example).

---

## Component 8 — Teaching Notes

**Structural decisions:**
- h=5 → standard structure (3 main TAs + gate), matching other h=5, expert/understand Tier-1/Tier-2 concepts (e.g. math.top.topological-space, math.real.metric-space)
- bloom=understand → V-4 = N/A (no P07 required; the content is definitional/structural understanding plus one derivation used as evidence, not a general derivation-practice skill)
- CPA_entry = C for an expert learner: direct sup/inf computation on concrete sets (some attained, some not) anchors the sup-vs-max distinction before the formal axiom can be misread

**Key teaching insight:** This concept's three misconceptions form a natural escalation in subtlety: MC-1 is a definitional confusion (sup vs. max) resolvable by direct example; MC-2 is the concept's entire historical motivation (why was ℝ constructed at all, beyond ℚ?) and deserves the fullest treatment (A02 Contrast 2, reused directly in A03's transfer probe (a)-(c) and in B02); MC-3 guards against a plausible-sounding overreach of the very axiom just learned (using completeness to justify MORE than it actually promises). A03's Archimedean-property derivation is included specifically because completeness is easy to treat as "just a definition" — seeing it drive an actual proof (with a single, identifiable point of use) demonstrates its status as a working axiom, not a piece of vocabulary.

**On proof depth for an expert-level concept:** The Archimedean property derivation (A03) is presented in full because the Tier-2 audience for this h=5 concept is expected to follow a rigorous ε/upper-bound argument; the transfer probe (A04/P76) extends this same rigor to a genuinely delicate sub-argument (the rational-refinement "squeeze" step) that is often asserted without proof even in the standard √2 counterexample — completing it here closes a gap that MC-2's repair (B02) only gestures at informally.

**Sequencing note (cross-link):** math.fnal.completeness (completeness of general metric/normed spaces, of which this concept's ℝ is the prototype example) is not yet authored in the corpus; this blueprint is fully self-contained without it, and Component 7 records the cross-link explicitly so a future authoring pass can connect them once that concept exists.

---

## Component 10 — Validation Checklist

| Code | Rule | Check | Status |
|------|------|-------|--------|
| V-1 | Concept ID matches KG | math.real.completeness ✓ | PASS |
| V-2 | All Tier-1 requires have existing blueprints | math.found.real-numbers ✓, math.found.total-order ✓ | PASS |
| V-3 | CPA entry = C for expert difficulty | C (Concrete) ✓ | PASS |
| V-4 | bloom=understand → P07 N/A | bloom=understand; no P07; V-4=N/A ✓ | N/A |
| V-5 | GR-1: A01 opens with B-category primitive | P11 REPRESENTATION SHIFT ✓ | PASS |
| V-6 | GR-2: each non-gate TA has P49 with 4 branches | A01, A02, A03 each have P49 CORRECT/PARTIAL/INCORRECT/NO_RESPONSE ✓ | PASS |
| V-7 | GR-3: gate TA (A04) is terminal | A04=P91; no further TAs ✓ | PASS |
| V-8 | GR-4: repair TAs open with P27+P41+P64 | B01, B02, B03 each: P27→P41→P64 ✓ | PASS |
| V-9 | GR-6: P91 terminal in its TA | P91 is A04; A04 is the last TA ✓ | PASS |
| V-10 | GR-7: P76 present in mastery gate | P76 in A04 between P77 and P75 ✓ | PASS |
| V-11 | GR-8: cross_links documented in Component 7 | requires and unlocks documented; not-yet-authored cross-link noted ✓ | PASS |
| V-12 | GR-9: P76 mode correct for cross_links | cross_link target not yet authored → P76=independence ✓ | PASS |
| V-13 | GR-10: MAMR stated and enforced | MAMR=5/5 stated in C0 and P75 gate ✓ | PASS |
| V-14 | MAMR formula correct | ⌈0.9×5⌉=⌈4.5⌉=5; PASS=5/5 ✓ | PASS |
| V-15 | P91 structure complete | P77(4)→P55→P76(1)→P55→P75→P55→P74→P55→P78 ✓ | PASS |
| V-16 | P77 has exactly 4 problems | Problems 1–4 verified ✓ | PASS |
| V-17 | 3 misconceptions with FOUNDATIONAL declared | MC-1 FOUNDATIONAL, MC-2, MC-3 ✓ | PASS |
| V-18 | P89 spaced repetition present | Component 6 with 4 SR intervals ✓ | PASS |
| V-19 | Structure matches h | h=5 → standard (3 main TAs + gate); A01+A02+A03+A04 ✓ | PASS |
| V-20 | P76 transfer probe is novel and correct | Rational-refinement squeeze proof completing B02's informal argument ✓ | PASS |
| AIR | All internal references consistent | Concept IDs, MAMR, bloom, difficulty consistent throughout ✓ | PASS |
