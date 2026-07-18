# Teaching Blueprint: Mathematical Induction (`math.found.proof-by-induction`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.found.proof-by-induction` |
| name | Mathematical Induction |
| domain | Foundations |
| difficulty | developing |
| bloom | create |
| mastery_threshold | 0.8 → MAMR = ⌈0.8×5⌉ = 4/5 |
| estimated_hours | 10 |
| requires | `math.found.proof`, `math.found.natural-numbers` |
| unlocks | `math.seq.recursive-sequences`, `math.nt.induction-applications` |
| cross_links | `math.disc.recurrence-relation` (**not yet authored** — verified via `ls`; P76_mode = independence, see Component 7) |
| CPA_entry_stage | C (Concrete) — a falling-dominoes chain before the formal base-case/inductive-step structure |
| description (KG) | A proof technique for statements indexed by natural numbers: establish a base case, then show that truth for n implies truth for n+1. |

## Component 1 — Learning Objectives

- LO1: State the structure of a proof by **mathematical induction**: (i) a **base case** establishing the statement $P(n)$ holds for the smallest relevant $n$ (usually $n=0$ or $n=1$), and (ii) an **inductive step** proving that, ASSUMING $P(k)$ holds for an arbitrary $k$ (the **inductive hypothesis**), $P(k+1)$ must also hold.
- LO2: Construct a complete induction proof for a given statement about natural numbers, correctly identifying what the inductive hypothesis actually assumes, and correctly using it (not something stronger or different) to derive $P(k+1)$.
- LO3: Distinguish induction from **circular reasoning** — the inductive step never assumes the FULL general statement "for all $n$"; it only assumes one specific (arbitrary) instance $P(k)$ to derive the very next instance $P(k+1)$ — and explain why the base case plus this step-by-step chaining together validly establishes the statement for every natural number.

## Component 2 — Prerequisite Check

Assumes mastery of `math.found.proof` (the general notion of a valid, finite chain of logical steps establishing a mathematical statement) and `math.found.natural-numbers` (the set $\mathbb{N}$ and its ordering, providing the index set induction operates over).

## Component 3 — Core Explanation

**Mathematical induction** proves a statement $P(n)$ for **all** natural numbers $n$ (starting from some base value, usually 0 or 1) via two steps:
1. **Base case**: prove $P(n_0)$ directly (for the smallest relevant $n_0$).
2. **Inductive step**: prove the **implication** $P(k)\Rightarrow P(k+1)$ for an **arbitrary** $k\geq n_0$ — assuming $P(k)$ is true (this assumption is called the **inductive hypothesis**), derive that $P(k+1)$ must also be true.

**Why this validly proves $P(n)$ for every $n$**: the base case gives $P(n_0)$. The inductive step, applied with $k=n_0$, gives $P(n_0)\Rightarrow P(n_0+1)$ — combined with the base case, this yields $P(n_0+1)$. Applying the inductive step again with $k=n_0+1$ yields $P(n_0+2)$. This chain continues indefinitely — like a row of falling dominoes: the base case knocks over the first domino, and the inductive step guarantees each domino knocks over the next — so EVERY domino (every natural number $\geq n_0$) eventually falls.

**Not circular reasoning**: the inductive step does NOT assume "$P(n)$ holds for all $n$" — that would indeed be circular, assuming the very thing being proven. It assumes only $P(k)$ for **one arbitrary, but fixed and specific**, value $k$, and derives $P(k+1)$ from that single assumption. Since $k$ was arbitrary, this implication holds for every $k$, and combined with the base case, the domino-chain argument (formally: the Principle of Mathematical Induction, itself a genuine axiom/theorem about $\mathbb{N}$) legitimately concludes $P(n)$ for all $n\geq n_0$.

## Component 4 — Worked Examples

**Example 1 (LO1/LO2 — a standard sum formula)**: Prove $1+2+\cdots+n = \frac{n(n+1)}{2}$ for all $n\geq1$.
**Base case** ($n=1$): LHS $=1$, RHS $=\frac{1\cdot2}{2}=1$. ✓
**Inductive step**: assume $1+2+\cdots+k = \frac{k(k+1)}{2}$ (inductive hypothesis) for some arbitrary $k\geq1$. Show $1+2+\cdots+k+(k+1) = \frac{(k+1)(k+2)}{2}$. Starting from the LHS: $\underbrace{1+2+\cdots+k}_{=\frac{k(k+1)}{2}\text{ by hypothesis}}+(k+1) = \frac{k(k+1)}{2}+(k+1) = (k+1)\left(\frac{k}{2}+1\right) = (k+1)\cdot\frac{k+2}{2} = \frac{(k+1)(k+2)}{2}$. ✓ Matches the target form with $k+1$ substituted for $n$.

**Example 2 (LO2/LO3 — precisely identifying what the hypothesis assumes, breaking MC-1)**: Prove $n^2 \geq n$ for all $n\geq1$ by induction, explicitly annotating the hypothesis. **Base case** ($n=1$): $1^2=1\geq1$. ✓ **Inductive step**: hypothesis is EXACTLY "$k^2\geq k$" for the specific arbitrary $k$ — nothing more, nothing about $k+1$ yet. Goal: show $(k+1)^2\geq(k+1)$. Expand: $(k+1)^2 = k^2+2k+1$. Using the hypothesis $k^2\geq k$: $(k+1)^2 = k^2+2k+1 \geq k+2k+1 = 3k+1 \geq k+1$ (since $3k+1\geq k+1$ whenever $k\geq0$, true here). This derivation uses ONLY the hypothesis $k^2\geq k$ (substituted in), never assumes the conclusion $(k+1)^2\geq(k+1)$ partway through — the entire chain of inequalities is built strictly from the hypothesis forward.

**Example 3 (LO1 — divisibility induction)**: Prove $3\mid(4^n-1)$ (i.e., $4^n-1$ is divisible by 3) for all $n\geq1$. **Base case** ($n=1$): $4^1-1=3$, and $3\mid3$. ✓ **Inductive step**: assume $3\mid(4^k-1)$, i.e. $4^k-1=3m$ for some integer $m$ (hypothesis). Show $3\mid(4^{k+1}-1)$: $4^{k+1}-1 = 4\cdot4^k - 1 = 4(4^k-1)+4-1 = 4(3m)+3 = 3(4m+1)$ — divisible by 3. ✓

## Component 5 — Teaching Actions

### Teaching Action A01 — The Domino Chain and the Two-Part Structure (Primitive P11: Representation Shift)

Start concrete: describe a long row of dominoes, each spaced so that if one falls, it knocks the next one down. State: "if you know domino #1 falls (base case), and you know EVERY domino, if it falls, knocks down the next one (inductive step), then EVERY domino in the row eventually falls — no matter how long the row is." Emphasize: neither piece alone is enough — knowing domino #1 falls tells you nothing about #2 without the "each knocks down the next" rule; knowing "each domino would knock down the next IF it fell" tells you nothing without an actual first domino falling to start the chain.

Shift to the formal two-part structure, working Example 1 (the sum formula) as the standard template: base case computed directly, inductive step assuming $P(k)$ and deriving $P(k+1)$ via algebraic manipulation that explicitly substitutes the hypothesis.

- **MC-1 hook**: after presenting the inductive step, ask "are we assuming the statement is true for ALL n when we write the inductive step?" — an answer of "yes" reveals MC-1 (believing the inductive hypothesis is a global assumption of the full statement, a circular-reasoning misunderstanding, rather than a single arbitrary instance $P(k)$).

### Teaching Action A02 — Precisely Using (Not Overusing) the Hypothesis (Primitive P06: Contrast Pair)

**Contrast 1 (targets MC-1)**: Re-examine Example 2's inductive step line by line, highlighting EXACTLY where the hypothesis $k^2\geq k$ is invoked (one specific substitution step) versus where ordinary algebra is used (expanding $(k+1)^2$, combining terms). State explicitly: "the hypothesis is used exactly ONCE, as a single substitution — everything else is algebra you already knew how to do; if your proof seems to already assume the conclusion somewhere, you've made a circular-reasoning error, not a valid inductive step."

**Contrast 2 (targets MC-2, incomplete or malformed proofs)**: Present a flawed "proof" that only does the inductive step (assume $P(k)$, derive $P(k+1)$) with NO base case, and ask "is this now a complete, valid induction proof?" — the correct answer is no: without a base case, there's no "domino #1" to start the chain — the implication $P(k)\Rightarrow P(k+1)$ being true for every $k$ says NOTHING about whether $P(n_0)$ itself is ever true. This breaks the assumption that the inductive step alone constitutes a complete proof.

### Teaching Action A03 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Prove by induction that $1+3+5+\cdots+(2n-1) = n^2$ for all $n\geq1$ (the sum of the first $n$ odd numbers).
  2. Prove by induction that $2^n > n$ for all $n\geq1$.
  3. A student's induction proof writes the inductive hypothesis as "assume the formula holds for all $n$ up to $k$" and then proceeds. Explain precisely what is wrong with stating the hypothesis this way (hint: compare with the standard single-instance hypothesis $P(k)$).
  4. Prove by induction that $5\mid(6^n-1)$ for all $n\geq1$.
- **P76 (Transfer Probe, mode = independence)**: "A software engineer wants to prove that a recursive function correctly computes the factorial of every non-negative integer: the function returns 1 for input 0, and for input $n>0$ returns $n\times(\text{function}(n-1))$. (a) Using this lesson's domino-chain structure, explain how proving the function is correct for input 0 (base case) plus proving 'IF the function is correct for input $k$, THEN it's correct for input $k+1$' (inductive step) together establish correctness for EVERY non-negative integer, without needing to individually verify each one. (b) A colleague suggests skipping the base case, arguing 'the recursive step is obviously correct, so the whole thing must work.' Using this lesson's reasoning about why the inductive step alone is insufficient, explain what could go wrong with the colleague's shortcut." *Component 7 note: this scenario was chosen independently rather than cross-linking to `math.disc.recurrence-relation`, since that blueprint does not yet exist.*
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | INDUCTIVE-HYPOTHESIS-TREATED-AS-CIRCULAR | Believing the inductive step assumes the full "for all n" statement is already true (circular reasoning), rather than assuming only a single arbitrary instance $P(k)$ | Foundational |
| MC-2 | BASE-CASE-OMITTED-AS-UNNECESSARY | Believing a valid inductive step alone (without a base case) constitutes a complete proof, not recognizing the base case as the essential "first domino" that starts the chain | Foundational |
| MC-3 | HYPOTHESIS-NOT-EXPLICITLY-INVOKED | Writing an inductive step that derives $P(k+1)$ without actually USING the inductive hypothesis $P(k)$ anywhere in the derivation (effectively proving $P(k+1)$ directly, which — while sometimes possible — fails to constitute a valid inductive argument if the hypothesis substitution step is missing where it's genuinely needed) | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Inductive Hypothesis as Circular Assumption") → P41 (detect: ask what exactly is assumed in the inductive step — "the statement for all n" vs. "the statement for one specific k" — checking which answer is given) → P64 (conceptual shift: re-anchor on the domino model — you never assume ALL dominoes have fallen; you only assume "if THIS ONE falls" to argue about the next).
- **B02 (targets MC-2)**: P27 (name it: "Base-Case Omission") → P41 (detect: present a "proof" with only the inductive step and ask if it's complete) → P64 (conceptual shift: re-anchor on "the inductive step is a conditional statement — IF $P(k)$ THEN $P(k+1)$ — and a conditional with a never-established starting truth proves nothing on its own, exactly like an infinite row of dominoes that are never actually pushed").
- **B03 (targets MC-3)**: P27 (name it: "Hypothesis Not Invoked") → P41 (detect: review a submitted inductive-step derivation and check whether the hypothesis $P(k)$ is explicitly substituted in at some point) → P64 (conceptual shift: re-derive Example 2's proof, pointing to the EXACT line where $k^2\geq k$ is substituted, as the template every inductive step should follow).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.found.proof` (the general standard of a valid logical proof, which induction is one specific technique for), `math.found.natural-numbers` (the index set $\mathbb{N}$ induction operates over, and its well-ordering that ultimately justifies why the domino-chain argument is valid).
- **Unlocks**: `math.seq.recursive-sequences` (recursively defined sequences are naturally proven-about via induction, matching the recursive structure directly), `math.nt.induction-applications` (a dedicated survey of induction's use across number theory).
- **Cross-link**: KG lists `math.disc.recurrence-relation` as a cross-link. Verified via directory listing that no blueprint yet exists at `docs/curriculum/blueprints/math.disc.recurrence-relation.md`. Per the established P76_mode rule, this blueprint uses **independence** mode. A future revision, once that concept is authored, may add a genuine cross-link probe connecting this concept's inductive-proof structure directly to proving properties of solutions to recurrence relations (a very natural pairing, since recurrences are themselves defined by a base case plus a "next from previous" rule, mirroring induction's own two-part structure).

## Component 8 — Teaching Notes

- estimated_hours = 10 with a developing/create tag (the highest Bloom level, "create," used deliberately since constructing a valid induction proof is a genuine creative/constructive act, not mere application) places this at the "3 main TAs + gate" tier — A01 (the domino-chain structure and standard template) and A02 (precise hypothesis use, and the base-case-is-essential contrast) jointly cover all three LOs; a third dedicated main TA was judged unnecessary despite the high hour estimate, since the hours instead go toward extensive worked-example and gate-problem practice across three genuinely different proof types (a sum formula, an inequality, a divisibility statement) rather than additional new conceptual content.
- MC-1 (inductive hypothesis treated as circular) was given the most extensive treatment (both A01's hook and A02's primary contrast) because it represents the single most common conceptual barrier to accepting induction as valid reasoning at all — students who don't resolve this specific confusion tend to view every induction proof as suspect regardless of how many correct examples they see.
- The three worked examples (sum formula, inequality, divisibility) were deliberately chosen to span the three most common categories of statements induction is used to prove at this developing level, ensuring the gate's problem set (which mirrors all three types) tests genuine transfer of the TECHNIQUE, not memorization of one specific proof.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (both) |
| V-4 | unlocks concepts named accurately from KG | PASS |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (`math.disc.recurrence-relation` confirmed absent → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A03) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.8×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Concrete: falling-dominoes chain before formal structure) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1/LO2, Ex2→LO2/LO3, Ex3→LO1) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
