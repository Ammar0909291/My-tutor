# Teaching Blueprint: Inverse Laplace Transform (`math.de.inverse-laplace`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.de.inverse-laplace` |
| name | Inverse Laplace Transform |
| domain | Differential Equations |
| difficulty | expert |
| bloom | apply |
| mastery_threshold | 0.85 → MAMR = ⌈0.85×5⌉ = 5/5 |
| estimated_hours | 5 |
| requires | `math.de.laplace-properties`, `math.calc.partial-fractions` |
| unlocks | `math.de.laplace-ode` |
| cross_links | none |
| CPA_entry_stage | A (Abstract) — expert learner already has the full forward-transform toolkit and partial fraction decomposition; the task is combining them into a genuine table-matching RECOVERY procedure |
| description (KG) | The process of recovering $f(t)$ from its Laplace transform $F(s)$. Standard technique: use partial fraction decomposition to match to known transform pairs from tables. |

## Component 1 — Learning Objectives

- LO1 (cross-link objective): Recognize the standard inverse-Laplace technique as a DIRECT APPLICATION of `math.calc.partial-fractions`'s own decomposition method — a complicated $F(s)$ (typically a rational function in $s$) is decomposed into simple pieces EXACTLY as that concept teaches, with the KEY difference that here each piece is matched against a KNOWN transform PAIR (rather than integrated directly) — and correctly decompose a specific $F(s)$ using `math.calc.partial-fractions`'s own machinery as the first step.
- LO2: Match each decomposed piece against `math.de.laplace-properties`'s own already-established standard transform PAIRS and shifting theorems (e.g. $\mathcal{L}^{-1}\left\{\frac1{s-a}\right\}=e^{at}$, and the first shifting theorem's own $F(s-a)\leftrightarrow e^{at}f(t)$ correspondence RUN IN REVERSE) — and correctly recover $f(t)$ piece-by-piece for a specific $F(s)$, combining the recovered pieces via `math.de.laplace-properties`'s own linearity property.
- LO3: Correctly handle a repeated linear factor in $F(s)$'s denominator (requiring `math.calc.partial-fractions`'s own multiple-term-per-power decomposition rule) by matching the resulting terms against the specific transform pairs involving powers of $t$ multiplying an exponential (e.g. $\mathcal{L}^{-1}\left\{\frac1{(s-a)^2}\right\}=te^{at}$), correctly distinguishing this case from the simpler single-power case.

## Component 2 — Prerequisite Check

Assumes mastery of `math.de.laplace-properties` (linearity; the first and second shifting theorems; standard transform pairs already computed for functions like $e^{at},\sin(bt),\cos(bt)$) and `math.calc.partial-fractions` (decomposing a rational function into simple pieces based on its denominator's factorization).

## Component 3 — Core Explanation

**Inverse Laplace transformation is `math.calc.partial-fractions`'s own decomposition, applied with a DIFFERENT final step**: given a rational function $F(s)$ (typically arising as the algebraic solution of a Laplace-transformed ODE), `math.calc.partial-fractions`'s own method decomposes it into simple pieces based on the denominator's factorization — EXACTLY the same decomposition procedure, with the SAME rules (one term per linear factor, one term per power for repeated factors, a linear numerator for irreducible quadratic factors). The KEY difference from that concept's own use case: there, each piece was INTEGRATED directly; here, each piece is instead MATCHED against a known Laplace transform PAIR and inverted using a lookup table, rather than integrated.

**Each decomposed piece is matched against `math.de.laplace-properties`'s own already-established transform pairs, run in reverse**: a piece of the form $\frac{A}{s-a}$ matches DIRECTLY against the already-known forward pair $\mathcal{L}\{e^{at}\}(s)=\frac1{s-a}$ — read BACKWARD, $\mathcal{L}^{-1}\left\{\frac A{s-a}\right\}=Ae^{at}$. A piece involving a shifted quadratic denominator (e.g. $\frac{s-a}{(s-a)^2+b^2}$) matches `math.de.laplace-properties`'s own FIRST SHIFTING THEOREM ($F(s-a)\leftrightarrow e^{at}f(t)$) run in reverse, combined with the already-known $\cos(bt)$ pair — RECOGNIZING the shifted-argument PATTERN, rather than deriving a new inversion rule from scratch. Once each piece is inverted individually, `math.de.laplace-properties`'s own LINEARITY property combines them: $\mathcal{L}^{-1}\{aF(s)+bG(s)\}=af(t)+bg(t)$, directly justifying that inverting piece-by-piece and summing gives the CORRECT overall $f(t)$.

**Repeated linear factors require the power-of-$t$ transform pairs — a genuinely distinct pattern from the simple case**: `math.calc.partial-fractions`'s own rule for a repeated factor $(s-a)^k$ requires MULTIPLE terms $\frac{A_1}{s-a}+\frac{A_2}{(s-a)^2}+\cdots$ — and each of THESE terms matches a DIFFERENT specific transform pair: $\mathcal{L}^{-1}\left\{\frac1{s-a}\right\}=e^{at}$, but $\mathcal{L}^{-1}\left\{\frac1{(s-a)^2}\right\}=te^{at}$ (a genuinely DIFFERENT pair, involving a factor of $t$ multiplying the exponential, NOT simply $e^{at}$ repeated or doubled) — reflecting the SAME repeated-root pattern already familiar from `math.de.second-order-homogeneous`'s own characteristic-equation solution forms ($e^{rx},xe^{rx}$ for a repeated root), now appearing in the Laplace-inversion context.

## Component 4 — Worked Examples

**Example 1 (LO1 — decomposing $F(s)$ using `math.calc.partial-fractions`'s own method as the first step, breaking MC-1)**: for $F(s)=\frac{3s+1}{(s-1)(s+2)}$: applying `math.calc.partial-fractions`'s own cover-up method DIRECTLY: $A=\left.\frac{3s+1}{s+2}\right|_{s=1}=\frac43$, $B=\left.\frac{3s+1}{s-1}\right|_{s=-2}=\frac{-5}{-3}=\frac53$. So $F(s)=\frac{4/3}{s-1}+\frac{5/3}{s+2}$ — the SAME decomposition procedure that concept's own worked examples already use, applied here to $F(s)$ instead of a general rational function to be integrated, confirming LO1's identification of the shared first step.

**Example 2 (LO2 — matching pieces against known transform pairs and combining via linearity, breaking MC-2)**: continuing Example 1: matching each piece against `math.de.laplace-properties`'s own already-known pair $\mathcal{L}^{-1}\left\{\frac1{s-a}\right\}=e^{at}$: $\mathcal{L}^{-1}\left\{\frac{4/3}{s-1}\right\}=\frac43e^t$ (using $a=1$), and $\mathcal{L}^{-1}\left\{\frac{5/3}{s+2}\right\}=\frac53e^{-2t}$ (using $a=-2$). Combining via `math.de.laplace-properties`'s own linearity: $f(t)=\mathcal{L}^{-1}\{F(s)\}=\frac43e^t+\frac53e^{-2t}$ — verified by directly computing $\mathcal{L}\left\{\frac43e^t+\frac53e^{-2t}\right\}(s)=\frac43\cdot\frac1{s-1}+\frac53\cdot\frac1{s+2}=\frac{4(s+2)+5(s-1)}{3(s-1)(s+2)}=\frac{9s+3}{3(s-1)(s+2)}=\frac{3s+1}{(s-1)(s+2)}=F(s)$ ✓ — confirming the recovered $f(t)$ genuinely transforms back to the ORIGINAL $F(s)$, directly validating LO2's piece-matching-plus-linearity procedure.

**Example 3 (LO3 — handling a repeated linear factor, distinguishing the power-of-$t$ pattern, breaking MC-3)**: for $F(s)=\frac{2}{(s-3)^2}$: `math.calc.partial-fractions`'s own rule for the repeated factor $(s-3)^2$ recognizes this is ALREADY in the exact form of the SPECIFIC transform pair $\mathcal{L}^{-1}\left\{\frac1{(s-3)^2}\right\}=te^{3t}$ (NOT simply $e^{3t}$, and NOT $2e^{3t}$ as a naive guess ignoring the squared denominator might produce) — so $\mathcal{L}^{-1}\{F(s)\}=2te^{3t}$. Verifying: computing $\mathcal{L}\{2te^{3t}\}(s)$ directly via the already-known pair $\mathcal{L}\{te^{at}\}(s)=\frac1{(s-a)^2}$ gives $\frac2{(s-3)^2}=F(s)$ ✓ — confirming the repeated-factor pattern genuinely requires the DISTINCT $te^{at}$-type pair, not the simpler $e^{at}$ pair, exactly as LO3 requires distinguishing.

## Component 5 — Teaching Actions

### Teaching Action A01 — Decompose $F(s)$ First, Using `math.calc.partial-fractions`'s Own Method Directly (Primitive P11: Representation Shift)

State: "before you can invert $F(s)$, decompose it into simple pieces — using EXACTLY `math.calc.partial-fractions`'s own method, the SAME cover-up or coefficient-matching technique you already know, just applied here to set up for matching against transform tables instead of integrating." Walk Example 1's direct cover-up decomposition.

- **MC-1 hook**: ask "does inverting a Laplace transform require a NEW decomposition technique specific to Laplace transforms, or does it directly reuse `math.calc.partial-fractions`'s own already-known decomposition method?" — a "new technique specific to Laplace" answer reveals MC-1 (missing the direct reuse of the already-known decomposition method).

### Teaching Action A02 — Match Each Piece Against Already-Known Transform Pairs, Then Combine via Linearity (Primitive P28: Conflict Evidence)

Present Example 2's direct evidence: the recovered $f(t)=\frac43e^t+\frac53e^{-2t}$ is VERIFIED to transform back to the original $F(s)$ exactly, confirming the piece-matching-plus-linearity procedure genuinely works, not merely producing a plausible-looking guess. State: "inverting each simple piece isn't guesswork — it's directly matching against `math.de.laplace-properties`'s own already-established transform pairs, and linearity guarantees summing the individually-inverted pieces gives the genuinely correct overall $f(t)$."

- **MC-2 hook**: ask "after inverting each decomposed piece individually, is it valid to simply SUM the results to get the overall $f(t)$, or does something additional need to be checked?" — an "additional checking needed" answer (missing the direct linearity justification) or "not valid to sum" answer reveals MC-2 (missing that linearity DIRECTLY guarantees the summed result is correct).

### Teaching Action A03 — A Repeated Factor's Inverse Involves a Factor of $t$, Not Just a Repeated Exponential (Primitive P06: Contrast Pair)

Contrast the naive guess (that $\frac1{(s-3)^2}$ inverts to simply $e^{3t}$, or perhaps "$e^{3t}$ twice") against Example 3's verified correct pair $te^{3t}$ — a genuinely DIFFERENT function, involving $t$ as an explicit multiplying factor. State: "a repeated linear factor in the denominator doesn't invert to a repeated or doubled exponential — it inverts to the exponential MULTIPLIED by $t$, exactly the same $te^{at}$ pattern already familiar from repeated-root ODE solutions."

- **MC-3 hook**: ask "does $\frac1{(s-a)^2}$ invert to simply $e^{at}$ (the same pair as $\frac1{s-a}$), or to a genuinely different function involving $t$ as a factor?" — a "same as $\frac1{s-a}$" answer reveals MC-3 (missing the distinct $te^{at}$ pattern for repeated linear factors).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Decompose $F(s)=\frac{5s-3}{(s-2)(s+1)}$ using `math.calc.partial-fractions`'s own cover-up method.
  2. Invert each piece from problem 1 using `math.de.laplace-properties`'s own known transform pairs, and combine via linearity to find $f(t)$.
  3. Verify your answer to problem 2 by computing the forward Laplace transform of your recovered $f(t)$ and confirming it matches the original $F(s)$.
  4. Find $\mathcal{L}^{-1}\left\{\frac3{(s+2)^2}\right\}$, explicitly identifying which transform pair applies.
- **P76 (Transfer Probe, mode = independence — no cross-link target listed in the KG for this concept)**: "An electrical engineer, after transforming a circuit's governing ODE using the Laplace transform and solving the resulting algebraic equation, obtains $Y(s)=\frac{4s+8}{s(s+2)^2}$ as the transformed solution and needs to recover the actual time-domain response $y(t)$. (a) Explain what the FIRST step must be, using `math.calc.partial-fractions`'s own decomposition rules, being careful to identify the correct FORM given the repeated factor $(s+2)^2$. (b) After obtaining the decomposed pieces (assume they are $\frac{A}{s}+\frac{B}{s+2}+\frac{C}{(s+2)^2}$ for some constants), explain which SPECIFIC transform pairs from `math.de.laplace-properties`'s own toolkit are needed to invert each piece, paying particular attention to the piece from the repeated factor. (c) Explain how the engineer would verify the recovered $y(t)$ is correct without needing to re-solve the original ODE from scratch."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | INVERSE-LAPLACE-ASSUMED-NEW-DECOMPOSITION-TECHNIQUE | Believing inverting a Laplace transform requires a new decomposition technique specific to Laplace transforms, missing that it directly reuses `math.calc.partial-fractions`'s own already-known method | Foundational |
| MC-2 | PIECE-WISE-INVERSION-SUM-ASSUMED-TO-NEED-EXTRA-JUSTIFICATION | Believing summing the individually-inverted pieces requires additional (unspecified) checking beyond linearity, or is not valid, missing that `math.de.laplace-properties`'s own linearity property directly guarantees correctness | High |
| MC-3 | REPEATED-FACTOR-INVERSE-ASSUMED-SAME-AS-SIMPLE-FACTOR | Believing $\frac1{(s-a)^2}$ inverts to the same $e^{at}$ pair as $\frac1{s-a}$, missing the distinct $te^{at}$ pattern for repeated linear factors | Moderate |

- **B01 (targets MC-1)**: P27 (name it: "Inverse Laplace Assumed New Decomposition Technique") → P41 (detect: ask whether inversion requires a new decomposition technique) → P64 (conceptual shift: re-walk Example 1's direct reuse of the cover-up method).
- **B02 (targets MC-2)**: P27 (name it: "Piece-Wise Inversion Sum Assumed to Need Extra Justification") → P41 (detect: ask whether summing individually-inverted pieces is directly valid) → P64 (conceptual shift: re-walk Example 2's verified forward-transform check confirming linearity's direct guarantee).
- **B03 (targets MC-3)**: P27 (name it: "Repeated Factor Inverse Assumed Same as Simple Factor") → P41 (detect: ask whether $\frac1{(s-a)^2}$ inverts the same way as $\frac1{s-a}$) → P64 (conceptual shift: re-walk Example 3's verified $te^{3t}$ pair).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.de.laplace-properties` (linearity, shifting theorems, and standard transform pairs this concept's matching step directly reuses) and `math.calc.partial-fractions` (the decomposition method this concept's first step directly applies).
- **Unlocks**: `math.de.laplace-ode` (solving ODEs via the full forward-transform-then-invert pipeline, using this concept's own inversion technique as its final step).
- **Cross-link**: KG lists none for this concept. $P76_{mode}=$ **independence** (no cross-link target to check).

## Component 8 — Teaching Notes

- estimated_hours = 5 with an expert/apply tag supports the "3 TAs + gate" tier, with LO1 grounding decomposition in the already-known method, LO2 given full depth via a directly verified piece-matching-and-combining procedure, and LO3 distinguishing the genuinely different repeated-factor pattern.
- **Division of labor**: `math.calc.partial-fractions` already owns the decomposition method itself (verified by grep — no Laplace-transform content there, confirming clean separation); `math.de.laplace-properties` already owns linearity, the shifting theorems, and standard transform pairs (verified by grep — no inverse-transform or table-matching content found there). This concept owns the SPECIFIC combination: applying decomposition to set up for table-matching (rather than integration), the piece-matching-plus-linearity recovery procedure, and the repeated-factor $te^{at}$ pattern.
- Example 1 and Example 2's deliberate reuse of the SAME function ($F(s)=\frac{3s+1}{(s-1)(s+2)}$, identical to a function already decomposed in `math.calc.partial-fractions`'s own worked examples) was chosen specifically to make LO1's "this is the SAME decomposition procedure" claim maximally concrete — the identical algebraic decomposition step, now followed by a genuinely different final step (table-matching instead of integration).

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS (`math.de.laplace-ode`) |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (none listed in KG → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.85×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract: expert learner already has the forward-transform toolkit and partial fractions; task is the recovery procedure) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
