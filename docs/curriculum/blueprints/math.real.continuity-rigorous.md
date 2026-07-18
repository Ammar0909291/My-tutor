<!-- BLUEPRINT: math.real.continuity-rigorous -->
<!-- STATUS: PACKAGE_READY -->
<!-- SPEC VERSION: 1.0 -->

# Teaching Blueprint: Continuity (ε-δ)
**Concept ID:** `math.real.continuity-rigorous`
**KG Fields:** difficulty=expert | bloom=apply | estimated_hours=6 | mastery_threshold=0.9

---

## Component 0 — Metadata

| Field | Value |
|-------|-------|
| concept_id | math.real.continuity-rigorous |
| name | Continuity (ε-δ) |
| difficulty | expert |
| bloom | apply |
| estimated_hours | 6 |
| mastery_threshold | 0.9 |
| CPA_entry_stage | C (Concrete) |
| requires (Tier-1) | math.real.metric-space, math.calc.continuity |
| cross_links | math.calc.continuity (Tier 1) |
| P76_mode | cross-link probe |
| MAMR | 5/5 (⌈0.9 × 5⌉) |

---

## Component 1 — Cognitive Map

### Prior Knowledge Anchors
- **math.real.metric-space**: open balls $B(x,r)$; the metric topology; this concept's "preimages of open sets are open" formulation is stated directly in metric-space language
- **math.calc.continuity**: the informal/limit-based definition ($\lim_{x\to a}f(x)=f(a)$) — this concept SHARPENS that same idea into the rigorous ε-δ form, with the sequential and open-set characterizations as equivalent restatements

### Target Knowledge State
Student can state and apply the ε-δ definition of continuity at a point ($\forall\epsilon>0\,\exists\delta>0: |x-a|<\delta\Rightarrow|f(x)-f(a)|<\epsilon$), correctly treating δ as something to be PRODUCED IN RESPONSE TO an arbitrary given ε (never chosen first); correctly apply the sequential criterion (f continuous at a iff $x_n\to a\Rightarrow f(x_n)\to f(a)$ for EVERY sequence $x_n\to a$, not just one convenient sequence); and correctly distinguish "f is defined on a neighborhood of a" from "f is continuous at a," recognizing that mere definedness nearby says nothing about whether the limit as $x\to a$ actually equals $f(a)$.

### Conceptual Obstacles
1. Reversing the logical order of the quantifiers — treating δ as chosen FIRST (independently) and then checking what ε values it happens to work for, rather than the correct order: an ARBITRARY ε is given first, and δ must be PRODUCED in response, generally shrinking as ε shrinks
2. Verifying the sequential criterion using only ONE convenient sequence converging to $a$, and declaring continuity confirmed — the criterion requires the implication to hold for EVERY sequence converging to $a$, and a single sequence checked is not sufficient (though a single sequence FAILING is sufficient to prove DIScontinuity)
3. Confusing "f is defined at and near a" with "f is continuous at a" — a function can be defined at every point of a neighborhood of $a$ (no domain gaps) while still failing continuity there, e.g. via a jump discontinuity or a removable discontinuity where $\lim_{x\to a}f(x)$ exists but disagrees with the actual value $f(a)$

---

## Component 2 — Misconception Registry

| ID | Label | Description | Trigger |
|----|-------|-------------|---------|
| MC-1 | DELTA-CHOSEN-BEFORE-EPSILON | Student picks a specific δ first, then checks what ε it happens to satisfy, reversing the required logical order (ε arbitrary and given; δ produced in response) | Any request to PROVE continuity via ε-δ (not merely illustrate it with one numeric pair) |
| MC-2 | ONE-SEQUENCE-CONFIRMS-SEQUENTIAL-CONTINUITY | Student checks the sequential criterion using only one (often the simplest) sequence converging to a, and declares continuity confirmed | Any function where some sequences behave nicely but others (e.g. approaching from a different direction or pattern) reveal a discontinuity |
| MC-3 | DEFINED-NEARBY-MEANS-CONTINUOUS | Student assumes a function defined at every point near a (no domain gaps) must be continuous there, missing that the LIMIT must also equal the function's actual value at a | Any piecewise function with a jump or removable discontinuity, fully defined everywhere nearby |

**Foundational Misconception:** MC-1 (DELTA-CHOSEN-BEFORE-EPSILON) — it is the single most common logical error in ε-δ proofs across all of real analysis, not specific to continuity, and it inverts the entire meaning of the definition: continuity demands that NO MATTER HOW SMALL a tolerance ε is demanded on the output, a correspondingly small δ can always be found on the input side — a student who instead picks δ first has proven nothing about arbitrary ε, since they've only checked whatever ε their chosen δ happens to satisfy, not the required universal claim over ALL ε>0.

---

## Component 3 — Scaffolding Protocol

**Entry point:** C (Concrete) — expert learner works a complete ε-δ proof for a specific simple function, producing δ as an explicit formula in terms of ε, before any general theorem or alternative characterization is introduced.

**Scaffolding sequence:**
1. **A01 P11 REPRESENTATION SHIFT** — C: complete ε-δ proof that $f(x)=2x+1$ is continuous at $a=3$, with δ derived as a formula in ε; P: a "tolerance box" picture showing δ shrinking as ε shrinks; A: the formal ε-δ definition and the equivalent sequential/open-set characterizations
2. **A02 P06 CONTRAST PAIR** — δ-first vs. ε-first-then-δ, contrasted directly (MC-1); one convenient sequence vs. a genuinely discontinuity-revealing sequence (MC-2); a fully-defined-nearby function that still fails continuity, via a jump (MC-3)
3. **A03 P91 Gate** — mastery assessment

---

## Component 4 — Protocol A (Main Teaching Sequence)

### Teaching Action A01 — A Complete ε-δ Proof, δ as a Formula in ε

**Primitive:** P11 REPRESENTATION SHIFT
**Purpose:** Work one full proof end to end, producing δ as an explicit function of ε (never a fixed number chosen independently); state the formal definition and its equivalent characterizations

---

**[P11 — REPRESENTATION SHIFT]**

**Stage C — Concrete (proving $f(x)=2x+1$ is continuous at $a=3$, so $f(3)=7$):**

**Claim:** $\forall\epsilon>0\,\exists\delta>0: |x-3|<\delta \Rightarrow |f(x)-7|<\epsilon$.

**Proof:** Let $\epsilon>0$ be ARBITRARY (given, not chosen by us). Compute: $|f(x)-7|=|(2x+1)-7|=|2x-6|=2|x-3|$. We need $2|x-3|<\epsilon$, i.e. $|x-3|<\epsilon/2$. So **choose $\delta=\epsilon/2$** (a FORMULA depending on ε, produced only AFTER ε was given). Then, for any $x$ with $|x-3|<\delta=\epsilon/2$: $|f(x)-7|=2|x-3|<2(\epsilon/2)=\epsilon$. ✓

Since this works for every $\epsilon>0$ by the formula $\delta=\epsilon/2$, the proof is complete. (Concretely: if $\epsilon=0.1$, take $\delta=0.05$; if $\epsilon=0.0001$, take $\delta=0.00005$ — the FORMULA instantly supplies a working δ no matter what ε is demanded.)

**Stage P — Pictorial (the tolerance box, δ shrinking with ε):**

```
   f(x)
    7+ε ┤        ┌────┐
        │        │    │  ← output tolerance band (width 2ε)
      7 ┤────────┼────┼────
        │        │    │
    7−ε ┤        └────┘
        └────┬────┬────┬──── x
            3−δ   3   3+δ
                (input tolerance, width 2δ = ε, here δ=ε/2)

   Shrinking ε (narrower output band) forces a correspondingly
   SMALLER δ (narrower input band) — δ is PRODUCED in response
   to ε, never chosen independently beforehand.
```

**Stage A — Abstract (formal definition and equivalent characterizations):**

**ε-δ definition:** $f$ is continuous at $a$ iff $\forall\epsilon>0\,\exists\delta>0: |x-a|<\delta \Rightarrow |f(x)-f(a)|<\epsilon$.

**Equivalent (sequential) characterization:** $f$ is continuous at $a$ iff for EVERY sequence $x_n\to a$, $f(x_n)\to f(a)$.

**Equivalent (open-set/metric-space) characterization:** $f$ is continuous (on its whole domain) iff the preimage of every open set is open.

---

**[P49 — ADAPTIVE CHECKPOINT]**

**Prompt:** Prove $f(x)=3x-2$ is continuous at $a=5$ (so $f(5)=13$), producing δ as an explicit formula in terms of ε.

**CORRECT:** Given arbitrary $\epsilon>0$: $|f(x)-13|=|(3x-2)-13|=|3x-15|=3|x-5|$. Need $3|x-5|<\epsilon$, i.e. $|x-5|<\epsilon/3$. Choose $\delta=\epsilon/3$. Then $|x-5|<\delta \Rightarrow |f(x)-13|=3|x-5|<3(\epsilon/3)=\epsilon$. ✓
→ "Correct — the formula δ=ε/3 (matching the slope 3) is exactly the right general pattern: for f(x)=mx+b, δ=ε/|m| always works." → Proceed to A02.

**PARTIAL:** Student computes $|f(x)-13|=3|x-5|$ correctly but then picks a SPECIFIC numeric δ (e.g. δ=0.01) and checks it works for one specific ε, rather than deriving the general formula (MC-1-adjacent).
→ "A single numeric pair only illustrates the pattern — the proof requires a FORMULA for δ IN TERMS OF ε, valid for every possible ε, not a spot check. From $3|x-5|<\epsilon$, solve directly for the bound on $|x-5|$: it must be less than $\epsilon/3$. So $\delta=\epsilon/3$ (a formula) instantly supplies a valid δ for ANY ε handed to you, which is what 'for all ε' actually requires."

**INCORRECT:** Student picks δ=0.1 first, then determines "this works when ε≥0.3" and calls the proof complete (MC-1).
→ "This reverses the required order. The definition demands: GIVEN an arbitrary ε (which could be tiny, like 0.0000001), PRODUCE a δ that works for THAT ε. Picking δ first and then finding which ε values happen to work only proves the claim for those specific ε — never for an arbitrary one. Start from $|f(x)-13|<\epsilon$ and solve backward for the required bound on $|x-5|$, yielding a formula δ(ε), not a single number."

**NO_RESPONSE:** → "$|f(x)-13|=3|x-5|$. Need $3|x-5|<\epsilon$: choose $\delta=\epsilon/3$. Then $|x-5|<\delta \Rightarrow |f(x)-13|<\epsilon$. Proof complete for arbitrary ε."

---

### Teaching Action A02 — ε First, Always; Every Sequence, Not One; Defined ≠ Continuous

**Primitive:** P06 CONTRAST PAIR
**Purpose:** Break MC-1 with a direct δ-first vs. ε-first contrast on the same function; break MC-2 with a function where one sequence looks fine but another reveals discontinuity; break MC-3 with a jump discontinuity that is fully defined everywhere nearby

---

**[P06 — CONTRAST PAIR]**

**Contrast 1 — δ-first (invalid) vs. ε-first-then-δ (valid), same function (MC-1):**

For $f(x)=2x+1$ at $a=3$ (from A01): **δ-first approach (INVALID as a proof):** "Let $\delta=0.01$. Then for $|x-3|<0.01$, $|f(x)-7|=2|x-3|<0.02$. So this works whenever $\epsilon\ge0.02$." This is NOT a proof of continuity — it only shows the implication holds for $\epsilon\ge0.02$, saying nothing about smaller ε (e.g. $\epsilon=0.001$), which the actual definition requires to also be handled. **ε-first-then-δ approach (VALID, from A01):** for ARBITRARY ε, $\delta=\epsilon/2$ is produced, covering every possible ε including arbitrarily small ones. Only the second approach constitutes a genuine proof.

**Contrast 2 — One sequence looks fine; another reveals discontinuity (MC-2):**

Consider $f(x) = \begin{cases}x & x\ne0\\1 & x=0\end{cases}$ at $a=0$. **Sequence 1:** $x_n=1/n \to 0$ (approaching from the right, never equal to 0): $f(x_n)=1/n\to0$. Since $f(0)=1\ne0$, this ALREADY reveals $f(x_n)\not\to f(0)$ — discontinuous. But suppose a student instead tried **Sequence 2:** $x_n=0$ for all $n$ (a constant sequence, technically converging to 0, though this violates the usual convention of using $x_n\ne a$): $f(x_n)=f(0)=1\to1=f(0)$ — this DEGENERATE sequence trivially "succeeds," but checking only such a sequence would wrongly suggest continuity. **The sequential criterion requires EVERY genuine sequence converging to $a$ (particularly ones with $x_n\ne a$) to satisfy the implication** — checking a single favorable or degenerate sequence, while ignoring one like Sequence 1 that reveals the failure, never establishes continuity.

**Contrast 3 — Defined everywhere nearby, still discontinuous (MC-3):**

$g(x) = \begin{cases}x^2 & x<2\\x+5 & x\ge2\end{cases}$ at $a=2$: $g$ is defined at EVERY real number, including a full neighborhood of $2$ — no domain gaps anywhere. But check the limit: as $x\to2^-$ (from below), $g(x)\to2^2=4$; as $x\to2^+$ (from above, including at $x=2$ itself), $g(x)\to2+5=7$. These one-sided limits DISAGREE ($4\ne7$), so $\lim_{x\to2}g(x)$ does not exist at all, and $g$ is **discontinuous at 2** — DESPITE being defined at every point near (and at) 2. "Fully defined nearby" and "continuous" are entirely different claims; the second additionally requires the limit to exist AND equal the function's actual value there.

---

**[P49 — ADAPTIVE CHECKPOINT]**

**Prompt:** Let $h(x) = \begin{cases}3 & x<1\\7 & x\ge1\end{cases}$. (a) Is $h$ defined at every point near $x=1$? (b) Using two DIFFERENT sequences approaching 1 (one from below, one from at-or-above), determine whether $h$ is continuous at $x=1$.

**CORRECT:** (a) Yes, $h$ is defined everywhere (piecewise, covering all reals). (b) Sequence from below, e.g. $x_n=1-1/n\to1$: $h(x_n)=3$ for all $n$ (since $x_n<1$), so $h(x_n)\to3$. Sequence at/above, e.g. $x_n=1+1/n\to1$ (or the constant sequence $x_n=1$): $h(x_n)=7$ for all $n$, so $h(x_n)\to7$. These give DIFFERENT limits ($3\ne7$) for sequences converging to the SAME point — **$h$ is discontinuous at 1**, despite being defined everywhere nearby.
→ "Correct — this directly applies Contrast 3's lesson (defined everywhere ≠ continuous) using the sequential criterion (Contrast 2's tool) to catch the jump explicitly." → Proceed to A03.

**PARTIAL:** Student correctly computes both sequence limits but hesitates on the conclusion, unsure whether "defined everywhere" should override the sequence evidence.
→ "The sequential criterion is decisive here: continuity requires EVERY sequence converging to 1 to send $h(x_n)\to h(1)$. You found TWO valid sequences converging to 1 that give DIFFERENT limits (3 and 7) — this alone proves discontinuity, regardless of how 'complete' or gap-free the function's domain looks. Being defined at a point (or nearby) never overrides an actual failure of the limit to exist or match."

**INCORRECT:** Student answers "continuous, since h is defined at every point with no gaps" (MC-3).
→ "Being defined everywhere is necessary but nowhere near sufficient. Check the limit directly using sequences: approaching from below gives $h(x_n)\to3$; approaching from at-or-above gives $h(x_n)\to7$. These disagree, meaning $\lim_{x\to1}h(x)$ doesn't even exist — a function can have a complete, gap-free domain and still jump abruptly at a point, exactly the failure mode 'defined everywhere' does nothing to prevent."

**NO_RESPONSE:** → "(a) Yes, h is defined everywhere. (b) From below: h(xₙ)→3. From at/above: h(xₙ)→7. Different limits — h is discontinuous at 1, despite being fully defined nearby."

---

### Teaching Action A03 — Mastery Gate (P91)

**Primitive:** P91 = P77→P55→P76→P55→P75→P55→P74→P55→P78
**Purpose:** Assess correct ε-δ proof construction, full-sequence-set verification, and the defined-vs-continuous distinction under transfer

---

**[P77 — MULTI-PROBLEM SET]** *(4 problems)*

**Problem 1:** Prove $f(x)=5x$ is continuous at $a=2$, producing δ as a formula in ε.

*Solution:* $|f(x)-10|=5|x-2|$. Need $5|x-2|<\epsilon$: $\delta=\epsilon/5$. Then $|x-2|<\delta \Rightarrow |f(x)-10|<\epsilon$.

**Problem 2:** For $f(x)=x^2$ at $a=0$, is checking only the sequence $x_n=1/n\to0$ sufficient to conclude continuity? What must ALSO be checked?

*Solution:* Not sufficient on its own — the criterion requires EVERY sequence converging to 0, e.g. also $x_n=-1/n\to0$ (giving $f(x_n)=1/n^2\to0=f(0)$, consistent) and any other converging sequence. (In this specific case, $x^2$ genuinely IS continuous at 0, so all such checks would pass — but the METHOD of checking only one sequence is not, by itself, a valid proof.)

**Problem 3:** $k(x)=\begin{cases}x+1 & x\ne3\\0 & x=3\end{cases}$. Is $k$ defined at $x=3$? Is $k$ continuous at $x=3$?

*Solution:* Defined at 3 (value 0). NOT continuous: $\lim_{x\to3}k(x)=\lim_{x\to3}(x+1)=4\ne0=k(3)$ — a removable discontinuity, despite $k$ being defined at (and near) 3.

**Problem 4:** True or false: "If a δ-value is found that makes |f(x)−f(a)|<ε true for ε=1, the function is proven continuous." Justify.

*Solution:* **False.** Continuity requires the implication to hold for EVERY ε>0, however small — verifying it for one specific ε (like 1) says nothing about smaller ε values, which must also be handled (generally via a formula δ(ε), not a single checked case).

---

**[P55 — SCORE]**
Count correct responses. Record raw score S₁ (0–4) after P77.

---

**[P76 — TRANSFER PROBE]** *(P76_mode: cross-link probe — math.calc.continuity)*

**Prompt:** Recall from math.calc.continuity the informal/limit-based definition: $f$ is continuous at $a$ iff $\lim_{x\to a}f(x)=f(a)$.

(a) Using the ε-δ definition of THIS blueprint, prove directly that $f(x)=x^2$ is continuous at $a=2$ (hint: $|x^2-4|=|x-2|\cdot|x+2|$; you may assume $\delta\le1$ so that $|x+2|<5$ throughout, to bound the second factor).
(b) Explain precisely how the ε-δ proof in (a) makes RIGOROUS the informal calculus statement "$\lim_{x\to2}x^2=4$" — what did the calculus-level definition leave imprecise that the ε-δ approach pins down exactly?
(c) A student says: "Since I already learned in calculus that all polynomials are continuous everywhere, doing an ε-δ proof for x² is pointless busywork — it's already a known fact." Evaluate this claim, explaining what the ε-δ proof provides that simply CITING the "polynomials are continuous" fact does not.

**Expected solution:**

(a) Given arbitrary $\epsilon>0$. Restrict attention to $\delta\le1$ first (a standard technique): if $|x-2|<1$, then $1<x<3$, so $|x+2|<5$. Compute: $|x^2-4|=|x-2||x+2|$. If additionally $|x-2|<\epsilon/5$, then $|x^2-4|<(\epsilon/5)(5)=\epsilon$ (using $|x+2|<5$ from the δ≤1 restriction). So choose $\delta=\min(1,\epsilon/5)$ (the smaller of the two bounds, ensuring BOTH restrictions hold simultaneously). Then $|x-2|<\delta \Rightarrow |x^2-4|<\epsilon$. ✓

(b) The informal statement "$\lim_{x\to2}x^2=4$" describes the intuitive idea that $x^2$ gets "close to" 4 as $x$ gets "close to" 2, without formally specifying what "close" means or providing a mechanism to verify the claim for an ARBITRARY degree of closeness. The ε-δ proof makes this fully precise: "close to 4" becomes a specific, quantified tolerance ε, and "close to 2" becomes a correspondingly quantified tolerance δ, with an EXPLICIT, verifiable formula ($\delta=\min(1,\epsilon/5)$) connecting the two — the proof doesn't just assert the limit exists, it constructs, for any conceivable precision demand ε, an exact recipe for how close x must be to 2 to guarantee that precision, closing every gap the informal "gets close to" language leaves open.

(c) The claim conflates KNOWING a general theorem with UNDERSTANDING why it holds and being able to reproduce or adapt the argument. Citing "polynomials are continuous" (a true, useful, and appropriately reusable fact once established) is not the same as being able to CONSTRUCT the underlying ε-δ argument — the specific proof technique used here (factoring $x^2-4=(x-2)(x+2)$, bounding the second factor using a preliminary restriction $\delta\le1$, then choosing $\delta=\min(1,\epsilon/5)$) is a genuinely reusable PATTERN that appears throughout analysis whenever a nonlinear function's continuity must be verified directly (e.g. for functions not covered by an existing "is continuous" theorem, or in contexts requiring uniform continuity or more delicate estimates). Doing the ε-δ proof once, even for an "already known" case like $x^2$, is how the general proof-construction skill (as opposed to just the specific fact) gets built — exactly the applied, procedural competence this blueprint's bloom=apply designation targets, distinct from simply memorizing that polynomials happen to be continuous.

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

- MASTERY ACHIEVED → unlock math.real.extreme-value-theorem and math.real.ivt; record completion
- NEAR MASTERY → flag for Protocol B on specific missed item(s); re-assess next session
- MASTERY NOT ACHIEVED → execute Protocol B immediately

---

**[P55 — SCORE]**
Record routing outcome.

---

**[P78 — COMPLETION]**

Session record: concept math.real.continuity-rigorous assessed. Mastery status logged. Student directed to next concept or repair protocol per P74 routing.

---

## Component 5 — Protocol B (Misconception Repair)

### Repair Action B01 — DELTA-CHOSEN-BEFORE-EPSILON (MC-1)

**[P27 — MISCONCEPTION NAMING]**
"Choosing δ first and checking which ε it satisfies is DELTA-CHOSEN-BEFORE-EPSILON. The definition requires an ARBITRARY ε to be given FIRST, with δ PRODUCED as a formula in response — never the reverse order."

**[P41 — MISCONCEPTION DETECTOR]**
Diagnostic: "Prove f(x)=4x is continuous at a=1, starting by picking δ=0.02."
- MC-1 response: computes what ε this δ satisfies and stops, treating that as the proof.

**[P64 — CONCEPTUAL SHIFT]**
"Start from the OTHER end: let ε be arbitrary (unknown, could be any positive number). Compute $|f(x)-4|=4|x-1|$. Need $4|x-1|<\epsilon$, i.e. $|x-1|<\epsilon/4$ — THIS is where δ comes from: $\delta=\epsilon/4$, a formula depending on ε, discovered by solving the inequality backward from the ε-bound, never chosen as an independent starting guess."

Practice: Prove f(x)=7x is continuous at a=0, deriving δ as a formula in ε rather than picking a specific numeric δ first.

---

### Repair Action B02 — ONE-SEQUENCE-CONFIRMS-SEQUENTIAL-CONTINUITY (MC-2)

**[P27 — MISCONCEPTION NAMING]**
"Checking only one sequence and declaring continuity confirmed is ONE-SEQUENCE-CONFIRMS-SEQUENTIAL-CONTINUITY. The criterion requires EVERY sequence converging to a to satisfy the implication — one favorable sequence proves nothing; one FAILING sequence, however, is enough to prove discontinuity."

**[P41 — MISCONCEPTION DETECTOR]**
Diagnostic: "For a step function, xₙ=1/n→0 gives f(xₙ)→f(0). Is f continuous at 0?"
- MC-2 response: "Yes, since that sequence worked."

**[P64 — CONCEPTUAL SHIFT]**
"One successful sequence establishes nothing about continuity — try a DIFFERENT sequence approaching 0, e.g. from the other side or along a different pattern. If EVERY such sequence gives the same limit $f(0)$, continuity holds; but finding even ONE sequence where $f(x_n)\not\to f(0)$ immediately proves DIScontinuity, overriding any number of previously-checked favorable sequences."

Practice: For the function h(x)=⌊x⌋ (floor function) at x=1, check both xₙ=1-1/n→1 and xₙ=1+1/n→1, and determine whether h is continuous at 1.

---

### Repair Action B03 — DEFINED-NEARBY-MEANS-CONTINUOUS (MC-3)

**[P27 — MISCONCEPTION NAMING]**
"Assuming a function defined everywhere near a point is automatically continuous there is DEFINED-NEARBY-MEANS-CONTINUOUS. Definedness only rules out domain gaps — continuity additionally requires the limit to exist and match the function's actual value."

**[P41 — MISCONCEPTION DETECTOR]**
Diagnostic: "A piecewise function is defined at every real number, with no gaps. Is it automatically continuous everywhere?"
- MC-3 response: "Yes, since there are no gaps in its domain."

**[P64 — CONCEPTUAL SHIFT]**
"Check the actual limit at any suspicious 'seam' point (where the pieces meet), not just whether a value is assigned there. A jump discontinuity — e.g. one piece approaching 4 from the left, another approaching 7 from the right — has NO domain gap (every x has a value) yet the two one-sided limits disagree, so the overall limit doesn't exist, and continuity fails. 'Defined' answers only 'does f(a) have a value'; 'continuous' additionally answers 'does the limit as x→a exist and equal that value.'"

Practice: For a piecewise function with pieces meeting at x=0 giving one-sided limits of 2 and 5 respectively, confirm it is defined everywhere near 0 yet discontinuous there.

---

## Component 6 — P89 Spaced Repetition Schedule

**[P89 — SPACED REPETITION]**

| Review | Delay | Focus |
|--------|-------|-------|
| SR-1 | +1 day | Reconstruct the $f(x)=2x+1$ ε-δ proof from memory, re-deriving δ=ε/2 by solving the inequality, not recalling the number |
| SR-2 | +3 days | Check a fresh piecewise function's continuity at a seam point using two genuinely different sequences |
| SR-3 | +7 days | Identify a fresh function that is defined everywhere nearby yet discontinuous, and state precisely which piece of the definition fails |
| SR-4 | +14 days | Reconstruct the x² ε-δ proof (including the δ=min(1,ε/5) restriction technique) from the A03 transfer probe |

Retrieval flag: if student picks δ before ε (MC-1) or checks only one sequence to confirm continuity (MC-2), re-execute B01/B02 before continuing.

---

## Component 7 — Cross-Blueprint Dependencies

**[GR-8: Cross-link documentation]**

| Direction | Concept | Relationship |
|-----------|---------|---------------|
| Requires (Tier-1) | math.real.metric-space | The open-set/preimage characterization of continuity is stated directly using that blueprint's open-ball machinery |
| Requires (Tier-1) | math.calc.continuity | Supplies the informal limit-based definition this concept sharpens into the rigorous ε-δ form |
| Unlocks | math.real.extreme-value-theorem | Relies on continuity (this rigorous form) plus compactness to guarantee attained maxima/minima |
| Unlocks | math.real.ivt | The Intermediate Value Theorem's rigorous proof uses the ε-δ (or equivalently sequential) definition of continuity established here |

**GR-9:** cross_links include math.calc.continuity (Tier 1) → P76_mode = cross-link probe (probe constructs the ε-δ proof for a function whose informal continuity was already accepted in calculus, and argues for what the rigorous proof adds beyond citing a known theorem).

---

## Component 8 — Teaching Notes

**Structural decisions:**
- h=6 → standard structure (2 main TAs + gate), matching the concept's tightly focused scope (one rigorous definition, its two equivalent characterizations, applied via worked proofs) despite expert difficulty
- bloom=apply → every checkpoint and the gate require CONSTRUCTING a proof or verification, not merely stating the definition
- CPA_entry = C for an expert learner: one complete, fully worked ε-δ proof (linear function, δ derived as an explicit formula) anchors the correct logical order before the general definition's quantifier structure can be misread

**Key teaching insight:** MC-1 is this concept's root misconception because it is THE canonical logical-order error of all of real analysis — every subsequent ε-δ-style proof (uniform continuity, limits of sequences, derivative definitions) repeats the identical "arbitrary-then-produce" pattern, so correcting it here has the largest possible downstream leverage. A01's proof is deliberately worked as "solve the inequality backward to discover δ" rather than "state δ and verify," making the CORRECT logical order the only path presented, with the WRONG order (Contrast 1) introduced only afterward, explicitly labeled as invalid.

**MC-2 and MC-3 as complementary discontinuity-detection tools:** The sequential criterion (MC-2's territory) and the defined-vs-continuous distinction (MC-3's territory) are two DIFFERENT ways a function can fail continuity, and A02's Contrasts 2 and 3 deliberately use overlapping example TYPES (both involve a jump/step-like structure) so the student sees that both diagnostic tools (trying multiple sequences; checking one-sided limits directly) converge on the identical conclusion for the same kind of discontinuity, reinforcing that they are two views of one underlying failure, not unrelated topics.

**Sequencing note (cross-link):** math.calc.continuity (Tier 1, already authored) is a genuine, actionable cross-link — the P76 transfer probe explicitly bridges the informal calculus-level statement to the rigorous ε-δ proof, and directly confronts the "this is already known, why prove it again" objection that a student moving from calculus to analysis commonly raises.

---

## Component 10 — Validation Checklist

| Code | Rule | Check | Status |
|------|------|-------|--------|
| V-1 | Concept ID matches KG | math.real.continuity-rigorous ✓ | PASS |
| V-2 | All Tier-1 requires have existing blueprints | math.real.metric-space ✓, math.calc.continuity ✓ | PASS |
| V-3 | CPA entry = C for expert difficulty | C (Concrete) ✓ | PASS |
| V-4 | bloom=apply → P07 recommended | Proof-construction tasks throughout A01-A03 ✓ | PASS |
| V-5 | GR-1: A01 opens with B-category primitive | P11 REPRESENTATION SHIFT ✓ | PASS |
| V-6 | GR-2: each non-gate TA has P49 with 4 branches | A01, A02 each have P49 CORRECT/PARTIAL/INCORRECT/NO_RESPONSE ✓ | PASS |
| V-7 | GR-3: gate TA (A03) is terminal | A03=P91; no further TAs ✓ | PASS |
| V-8 | GR-4: repair TAs open with P27+P41+P64 | B01, B02, B03 each: P27→P41→P64 ✓ | PASS |
| V-9 | GR-6: P91 terminal in its TA | P91 is A03; A03 is the last TA ✓ | PASS |
| V-10 | GR-7: P76 present in mastery gate | P76 in A03 between P77 and P75 ✓ | PASS |
| V-11 | GR-8: cross_links documented in Component 7 | requires and unlocks documented ✓ | PASS |
| V-12 | GR-9: P76 mode correct for cross_links | math.calc.continuity is Tier 1 → P76=cross-link probe ✓ | PASS |
| V-13 | GR-10: MAMR stated and enforced | MAMR=5/5 stated in C0 and P75 gate ✓ | PASS |
| V-14 | MAMR formula correct | ⌈0.9×5⌉=⌈4.5⌉=5; PASS=5/5 ✓ | PASS |
| V-15 | P91 structure complete | P77(4)→P55→P76(1)→P55→P75→P55→P74→P55→P78 ✓ | PASS |
| V-16 | P77 has exactly 4 problems | Problems 1–4 verified ✓ | PASS |
| V-17 | 3 misconceptions with FOUNDATIONAL declared | MC-1 FOUNDATIONAL, MC-2, MC-3 ✓ | PASS |
| V-18 | P89 spaced repetition present | Component 6 with 4 SR intervals ✓ | PASS |
| V-19 | Structure matches h | h=6, tightly-scoped → standard (2 main TAs + gate); A01+A02+A03 ✓ | PASS |
| V-20 | P76 transfer probe is novel and correct | x² epsilon-delta proof with delta=min(1,epsilon/5) restriction technique; known-fact-vs-proof-skill argument ✓ | PASS |
| AIR | All internal references consistent | Concept IDs, MAMR, bloom, difficulty consistent throughout ✓ | PASS |
