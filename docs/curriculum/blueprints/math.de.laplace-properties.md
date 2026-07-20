# Teaching Blueprint: Laplace Transform Properties (`math.de.laplace-properties`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.de.laplace-properties` |
| name | Laplace Transform Properties |
| domain | Differential Equations |
| difficulty | expert |
| bloom | apply |
| mastery_threshold | 0.85 → MAMR = ⌈0.85×5⌉ = 5/5 |
| estimated_hours | 5 |
| requires | `math.de.laplace-transform` |
| unlocks | none |
| cross_links | none |
| CPA_entry_stage | A (Abstract) — expert learner already computes and applies the transform's derivative rule; the task is the further toolkit of linearity and shifting properties |
| description (KG) | Key properties: linearity ($\mathcal{L}\{af+bg\}=a\mathcal{L}\{f\}+b\mathcal{L}\{g\}$), first shifting theorem ($\mathcal{L}\{e^{at}f\}(s)=F(s-a)$), second shifting theorem (Heaviside step), derivative rule ($\mathcal{L}\{f'\}=sF(s)-f(0)$), convolution. |

## Component 1 — Learning Objectives

- LO1: State and prove LINEARITY, $\mathcal{L}\{af+bg\}=a\mathcal{L}\{f\}+b\mathcal{L}\{g\}$, directly from the transform's integral definition (linearity of the integral itself), and correctly apply it to compute the transform of a combination of standard functions WITHOUT re-deriving each piece from the integral definition every time.
- LO2: State and apply the FIRST shifting theorem, $\mathcal{L}\{e^{at}f(t)\}(s)=F(s-a)$ — multiplying by an exponential in the $t$-domain corresponds to SHIFTING the transform's argument in the $s$-domain — proven directly from the integral definition, and correctly use it to compute transforms of functions like $e^{at}\cos(bt)$ by combining it with an already-known standard transform.
- LO3: State and apply the SECOND shifting theorem (involving the Heaviside step function $u(t-c)$): $\mathcal{L}\{f(t-c)u(t-c)\}(s)=e^{-cs}F(s)$ — delaying a function in TIME corresponds to multiplying its transform by a decaying exponential in $s$ — and correctly distinguish it from the first shifting theorem (which shifts in $s$, not $t$) by applying each to an appropriately matched example.

## Component 2 — Prerequisite Check

Assumes mastery of `math.de.laplace-transform` (the transform $\mathcal{L}\{f\}(s)=\int_0^\infty e^{-st}f(t)\,dt$; the derivative rule $\mathcal{L}\{f'\}(s)=sF(s)-f(0)$, already derived and verified there — reused, not re-derived, here).

## Component 3 — Core Explanation

**Linearity follows immediately from the integral's own linearity**: $\mathcal{L}\{af+bg\}(s)=\int_0^\infty e^{-st}(af(t)+bg(t))\,dt=a\int_0^\infty e^{-st}f(t)\,dt+b\int_0^\infty e^{-st}g(t)\,dt=aF(s)+bG(s)$ — this is not a special property of the Laplace transform specifically, but a DIRECT consequence of the fact that integration itself is linear (splitting sums and pulling out constants is always valid for integrals). Its practical value is enormous: any function expressible as a linear combination of pieces with ALREADY-known transforms can be transformed instantly by combining those known pieces, without returning to the defining integral.

**The first shifting theorem: exponential multiplication in $t$ shifts the argument in $s$**: $\mathcal{L}\{e^{at}f(t)\}(s)=\int_0^\infty e^{-st}e^{at}f(t)\,dt=\int_0^\infty e^{-(s-a)t}f(t)\,dt=F(s-a)$ — recognizing the combined exponent $-(s-a)t$ shows this is EXACTLY $F$ evaluated at $s-a$ instead of $s$. So multiplying $f(t)$ by $e^{at}$ before transforming has the effect of simply REPLACING $s$ with $s-a$ in the already-known transform $F(s)$ — no new integral needs to be computed if $F(s)$ is already known.

**The second shifting theorem: delaying in $t$ multiplies by a decaying exponential in $s$**: using the Heaviside step function $u(t-c)$ (which is $0$ for $t<c$ and $1$ for $t\ge c$), the function $f(t-c)u(t-c)$ represents $f$ DELAYED by $c$ units and switched on only after $t=c$. Its transform: $\mathcal{L}\{f(t-c)u(t-c)\}(s)=\int_c^\infty e^{-st}f(t-c)\,dt$; substituting $\tau=t-c$: $=\int_0^\infty e^{-s(\tau+c)}f(\tau)\,d\tau=e^{-sc}\int_0^\infty e^{-s\tau}f(\tau)\,d\tau=e^{-sc}F(s)$. This is the OPPOSITE direction of shift from the first theorem — here, a shift in the TIME domain (delaying $f$) produces a multiplicative factor $e^{-sc}$ in the $s$-domain, rather than an argument shift.

## Component 4 — Worked Examples

**Example 1 (LO1 — linearity applied to combine known transforms, breaking MC-1)**: to find $\mathcal{L}\{3e^{2t}-5\sin(t)\}(s)$: using ALREADY-known standard transforms $\mathcal{L}\{e^{2t}\}=\frac1{s-2}$ and $\mathcal{L}\{\sin(t)\}=\frac1{s^2+1}$, linearity gives $\mathcal{L}\{3e^{2t}-5\sin(t)\}(s)=3\cdot\frac1{s-2}-5\cdot\frac1{s^2+1}$ DIRECTLY — no new integral computation is needed, just combining already-known pieces with the given coefficients, exactly as LO1 requires.

**Example 2 (LO2 — the first shifting theorem applied to $e^{at}\cos(bt)$, breaking MC-2)**: to find $\mathcal{L}\{e^{3t}\cos(2t)\}(s)$: starting from the ALREADY-known standard transform $\mathcal{L}\{\cos(2t)\}(s)=\frac{s}{s^2+4}=F(s)$, the first shifting theorem gives $\mathcal{L}\{e^{3t}\cos(2t)\}(s)=F(s-3)=\frac{s-3}{(s-3)^2+4}$ — obtained by DIRECTLY substituting $s-3$ in place of $s$ in the already-known $F(s)$, confirming the theorem's shift-the-argument mechanism concretely rather than re-deriving the transform from the integral definition.

**Example 3 (LO3 — the second shifting theorem applied to a delayed function, distinguished from the first, breaking MC-3)**: to find $\mathcal{L}\{(t-2)^2u(t-2)\}(s)$ (a function that is $0$ before $t=2$ and equals $(t-2)^2$ afterward — a DELAYED version of $f(t)=t^2$, NOT an exponentially-multiplied version): using the ALREADY-known $\mathcal{L}\{t^2\}(s)=\frac2{s^3}=F(s)$, the second shifting theorem gives $\mathcal{L}\{(t-2)^2u(t-2)\}(s)=e^{-2s}F(s)=\frac{2e^{-2s}}{s^3}$ — a MULTIPLICATIVE factor $e^{-2s}$ applied to $F(s)$, contrasted directly with Example 2's ARGUMENT-shift $F(s-3)$: delaying in TIME (this example) multiplies by $e^{-cs}$; multiplying by $e^{at}$ in TIME (Example 2) shifts the ARGUMENT of $F$ — confirming these are genuinely different mechanisms, not interchangeable.

## Component 5 — Teaching Actions

### Teaching Action A01 — Linearity Lets You Combine Known Transforms Without Re-Deriving (Primitive P11: Representation Shift)

State: "linearity isn't a special Laplace-transform trick to memorize separately — it's just the ordinary linearity of integration, applied here; once you know a handful of standard transforms, linearity lets you combine them instantly for any linear combination." Walk Example 1's direct combination.

- **MC-1 hook**: ask "does applying linearity require re-deriving the transform from the defining integral each time, or can you simply combine already-known standard transforms?" — a "re-derive" answer reveals MC-1 (missing that linearity lets already-known pieces be combined directly, with no new integral needed).

### Teaching Action A02 — The First Shifting Theorem Replaces $s$ with $s-a$ in an Already-Known Transform (Primitive P28: Conflict Evidence)

Present Example 2's direct evidence: $\mathcal{L}\{e^{3t}\cos(2t)\}(s)$ obtained by simply substituting $s-3$ into the already-known $F(s)=\frac{s}{s^2+4}$, with NO new integral evaluated. State: "multiplying by $e^{at}$ before transforming doesn't require a new integral computation at all — it's exactly the SAME transform formula, with $s$ replaced by $s-a$."

- **MC-2 hook**: ask "does computing $\mathcal{L}\{e^{at}f(t)\}(s)$ require evaluating a brand-new integral, or can it be obtained directly by substitution into the already-known $F(s)$?" — a "new integral" answer reveals MC-2 (missing the direct substitution mechanism the first shifting theorem provides).

### Teaching Action A03 — Shifting in Time (Theorem 2) Is NOT the Same as Shifting in $s$ (Theorem 1) (Primitive P06: Contrast Pair)

Contrast Example 2's first-shifting-theorem result ($F(s-3)$, an ARGUMENT shift) directly against Example 3's second-shifting-theorem result ($e^{-2s}F(s)$, a MULTIPLICATIVE factor) — two structurally different outcomes from two structurally different operations (multiplying by $e^{at}$ in time vs. delaying in time). State: "these two shifting theorems are easy to confuse because both involve 'shifting' — but multiplying by an exponential in $t$ shifts the ARGUMENT of $F$, while delaying $f$ in TIME multiplies $F$ by an exponential factor; they are opposite mechanisms, not interchangeable versions of the same idea."

- **MC-3 hook**: ask "do the first and second shifting theorems produce the SAME kind of result (either both argument-shifts or both multiplicative factors), or genuinely different kinds of results?" — a "same kind" answer reveals MC-3 (conflating the two theorems' structurally different outcomes).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Using linearity and already-known standard transforms, find $\mathcal{L}\{4t^2-7e^{-t}\}(s)$.
  2. Using the first shifting theorem and the already-known $\mathcal{L}\{\sin(t)\}=\frac1{s^2+1}$, find $\mathcal{L}\{e^{-2t}\sin(t)\}(s)$.
  3. Using the second shifting theorem and the already-known $\mathcal{L}\{t\}=\frac1{s^2}$, find $\mathcal{L}\{(t-5)u(t-5)\}(s)$.
  4. Explain, in your own words, the structural difference between the first shifting theorem's result and the second shifting theorem's result.
- **P76 (Transfer Probe, mode = independence — no cross-link target listed in the KG for this concept)**: "An electrical engineer analyzes a circuit whose driving voltage is $v(t)=e^{-t}\cos(3t)$ for $t\ge0$ (a decaying oscillation), and separately, the same engineer models a SECOND circuit where an identical oscillation $\cos(3(t-4))$ only switches on starting at $t=4$ (delayed, not decaying). (a) Using the first shifting theorem and an already-known standard transform, find $\mathcal{L}\{v(t)\}(s)$ for the first circuit. (b) Using the second shifting theorem, find the Laplace transform of the second (delayed) circuit's driving signal $\cos(3(t-4))u(t-4)$. (c) Explain precisely why these two scenarios — one an exponentially-decaying oscillation, the other a delayed pure oscillation — require genuinely different shifting theorems, rather than the same one applied twice."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | LINEARITY-ASSUMED-TO-REQUIRE-RE-DERIVATION | Believing applying linearity requires re-deriving each piece's transform from the defining integral, missing that already-known standard transforms can simply be combined directly | Foundational |
| MC-2 | FIRST-SHIFTING-THEOREM-ASSUMED-TO-NEED-NEW-INTEGRAL | Believing computing $\mathcal{L}\{e^{at}f(t)\}(s)$ requires evaluating a brand-new integral, missing the direct $s\to s-a$ substitution mechanism | High |
| MC-3 | SHIFTING-THEOREMS-CONFLATED | Believing the first and second shifting theorems produce the same kind of result (both argument-shifts, or both multiplicative factors), missing their genuinely different structural mechanisms | High |

- **B01 (targets MC-1)**: P27 (name it: "Linearity Assumed to Require Re-Derivation") → P41 (detect: ask whether linearity requires re-deriving each piece from the integral) → P64 (conceptual shift: re-walk Example 1's direct combination of already-known transforms).
- **B02 (targets MC-2)**: P27 (name it: "First Shifting Theorem Assumed to Need New Integral") → P41 (detect: ask whether $\mathcal{L}\{e^{at}f(t)\}(s)$ requires a new integral) → P64 (conceptual shift: re-walk Example 2's direct $s\to s-3$ substitution).
- **B03 (targets MC-3)**: P27 (name it: "Shifting Theorems Conflated") → P41 (detect: ask whether the two shifting theorems produce the same kind of result) → P64 (conceptual shift: re-walk Example 2 vs. Example 3's directly contrasted outcomes — argument shift vs. multiplicative factor).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.de.laplace-transform` (the transform's own integral definition and the already-derived derivative rule this concept's properties build directly on and reuse).
- **Unlocks**: none listed in the KG for this concept.
- **Cross-link**: KG lists none for this concept. $P76_{mode}=$ **independence** (no cross-link target to check).

## Component 8 — Teaching Notes

- estimated_hours = 5 with an expert/apply tag supports the "3 TAs + gate" tier, with LO1 grounding linearity in the integral's own properties, LO2 given full derivation-and-application depth for the first shifting theorem, and LO3 directly contrasted against LO2 to prevent the two shifting theorems from blurring together.
- **Division of labor**: `math.de.laplace-transform` already owns the transform's core definition and the derivative rule, fully derived via integration by parts (verified by grep — its own Example 2 already uses linearity informally in service of verifying the derivative rule, but does not state or prove linearity as its own named property). This concept owns linearity, the first shifting theorem, and the second shifting theorem as fully named, proven, and separately practiced properties — the property TOOLKIT built on top of the transform `math.de.laplace-transform` itself defines. The KG's own description also lists "convolution" among this concept's related properties; that specific content is deliberately NOT duplicated here, since `math.de.convolution-theorem` (authored separately, in this same batch) owns the full convolution treatment in dedicated depth.
- Example 2 and Example 3's deliberate use of DIFFERENT already-known standard transforms ($\cos(2t)$ for the first theorem, $t^2$ for the second) rather than the same function twice was chosen specifically to keep the two shifting mechanisms visually and structurally distinct, reinforcing MC-3's repair rather than risking the two examples blurring into a single memorized pattern.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS (none listed) |
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
| V-15 | CPA_entry_stage justified | PASS (Abstract: expert learner already applies the derivative rule; task is the further linearity/shifting toolkit) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
