# Teaching Blueprint: Euler's Formula (`math.trig.eulers-formula`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.trig.eulers-formula` |
| name | Euler's Formula |
| domain | Trigonometry |
| difficulty | advanced |
| bloom | understand |
| mastery_threshold | 0.85 → MAMR = ⌈0.85×5⌉ = 5/5 |
| estimated_hours | 5 |
| requires | `math.trig.polar-form-complex`, `math.alg.natural-logarithm` |
| unlocks | none |
| cross_links | `math.cx.analytic-functions` (authored earlier — see Component 7) |
| CPA_entry_stage | C (Concrete) — verifying the formula numerically at specific angles before naming the general identity and Euler's identity |
| description (KG) | $e^{i\theta}=\cos\theta+i\sin\theta$; at $\theta=\pi$: $e^{i\pi}+1=0$ (Euler's identity); unifies exponential and trigonometric functions via complex analysis. |

## Component 1 — Learning Objectives

- LO1: State **Euler's formula** $e^{i\theta}=\cos\theta+i\sin\theta$, and recognize it as the identification that MAKES `math.trig.polar-form-complex`'s own polar form $z=r(\cos\theta+i\sin\theta)$ literally equal $z=re^{i\theta}$ — the exponential notation is not a separate convention, it IS this trigonometric expression, by definition of what "raising $e$ to an imaginary power" means.
- LO2: Derive **Euler's identity** $e^{i\pi}+1=0$ as the SPECIAL CASE $\theta=\pi$ of Euler's formula ($\cos\pi=-1$, $\sin\pi=0$), and recognize it as uniting five of mathematics's most fundamental constants ($e,i,\pi,1,0$) in one equation, purely as a consequence of the general formula.
- LO3 (orientation level — full complex-analytic justification deferred): recognize, without full derivation, that Euler's formula is not merely a notational convenience but a genuine CONSEQUENCE of $e^z$ being analytic (holomorphic) on all of $\mathbb{C}$ — from `math.cx.analytic-functions` — whose power series, extended to imaginary exponents, exactly reproduces the cosine and sine power series when separated into real and imaginary parts.

## Component 2 — Prerequisite Check

Assumes mastery of `math.trig.polar-form-complex` ($z=r(\cos\theta+i\sin\theta)$, relating $\mathbb{C}$'s geometry to trig functions) and `math.alg.natural-logarithm` (the natural logarithm and exponential function with base $e$, extended here to imaginary exponents).

## Component 3 — Core Explanation

**Euler's formula identifies two expressions for the SAME polar form**: `math.trig.polar-form-complex` already wrote $z=r(\cos\theta+i\sin\theta)$ for any complex number in polar form. Euler's formula asserts $e^{i\theta}=\cos\theta+i\sin\theta$ — meaning the exponential $e^{i\theta}$ is not a DIFFERENT quantity that happens to equal this trigonometric expression by coincidence; rather, $e^{i\theta}$ is DEFINED (via the complex exponential's power series) to equal precisely this, so that $z=re^{i\theta}$ is simply `math.trig.polar-form-complex`'s own polar form, rewritten in exponential notation.

**Euler's identity is one specific instance, not a separate miracle**: setting $\theta=\pi$ in Euler's formula: $e^{i\pi}=\cos\pi+i\sin\pi=-1+i(0)=-1$, so $e^{i\pi}+1=0$. This equation's fame comes from uniting $e$, $i$, $\pi$, $1$, and $0$ — but structurally, it is nothing more than evaluating the ALREADY-ESTABLISHED general formula at one particular angle; no new mathematics beyond substituting $\theta=\pi$ is required.

**Why this isn't just clever notation — the analytic justification (orientation level)**: `math.cx.analytic-functions` established that $e^z$ is analytic (holomorphic) on all of $\mathbb{C}$ — an ENTIRE function, representable everywhere by its power series $e^z=\sum_{n=0}^\infty\frac{z^n}{n!}$. Substituting $z=i\theta$ and using $i^2=-1$, $i^3=-i$, $i^4=1$ (cycling), the terms of this power series split cleanly into a REAL part matching $\cos\theta$'s own power series ($1-\frac{\theta^2}{2!}+\frac{\theta^4}{4!}-\cdots$) and an IMAGINARY part matching $\sin\theta$'s own power series ($\theta-\frac{\theta^3}{3!}+\frac{\theta^5}{5!}-\cdots$) — Euler's formula is a genuine CONSEQUENCE of $e^z$'s analyticity and power-series representation, not an arbitrary definitional choice. Full term-by-term derivation is deferred beyond this concept's core scope.

## Component 4 — Worked Examples

**Example 1 (LO1 — Euler's formula as the polar form rewritten, breaking MC-1)**: for $\theta=\pi/2$: `math.trig.polar-form-complex`'s polar form gives $\cos(\pi/2)+i\sin(\pi/2)=0+i(1)=i$. Euler's formula asserts $e^{i\pi/2}=i$ as well — these are the SAME number, computed two ways: once via the trigonometric polar form directly, once via the exponential notation. Verifying consistency: for $z=2i$ (so $r=2$, $\theta=\pi/2$), both $z=2(\cos(\pi/2)+i\sin(\pi/2))$ and $z=2e^{i\pi/2}$ give $z=2i$ — confirming the exponential notation is simply an alternative way of writing the identical polar form, not a separate quantity requiring its own independent verification.

**Example 2 (LO2 — deriving Euler's identity as a special case, breaking MC-2)**: setting $\theta=\pi$ in Euler's formula: $e^{i\pi}=\cos\pi+i\sin\pi$. Since $\cos\pi=-1$ and $\sin\pi=0$ (standard trig values), $e^{i\pi}=-1+i(0)=-1$, so $e^{i\pi}+1=0$ — Euler's identity. No new derivation beyond substituting $\theta=\pi$ into the already-established general formula and evaluating two standard cosine/sine values was needed — the "miracle" of uniting five constants is a direct byproduct of the GENERAL formula, evaluated at one specific, memorable angle.

**Example 3 (LO3, orientation level — the power-series justification, breaking MC-3)**: substituting $z=i\theta$ into $e^z=\sum_{n=0}^\infty\frac{z^n}{n!}$: the terms cycle through powers of $i$ ($i^0=1,i^1=i,i^2=-1,i^3=-i,i^4=1,\dots$), so $e^{i\theta}=\left(1-\frac{\theta^2}{2!}+\frac{\theta^4}{4!}-\cdots\right)+i\left(\theta-\frac{\theta^3}{3!}+\frac{\theta^5}{5!}-\cdots\right)$. The REAL part is EXACTLY $\cos\theta$'s Taylor series, and the coefficient of $i$ is EXACTLY $\sin\theta$'s Taylor series — this is not a coincidental pattern match, but a direct consequence of `math.cx.analytic-functions`'s guarantee that $e^z$, being entire, is genuinely representable by this power series for ANY complex input, including purely imaginary ones.

## Component 5 — Teaching Actions

### Teaching Action A01 — Euler's Formula Is the Polar Form, Renotated, Not a New Fact (Primitive P11: Representation Shift)

State: "you already know $z=r(\cos\theta+i\sin\theta)$ — Euler's formula just gives you a second, equivalent way to WRITE this: $z=re^{i\theta}$. These aren't two facts to memorize; they're one fact in two notations." Walk Example 1's dual computation of $z=2i$.

- **MC-1 hook**: ask "are $z=r(\cos\theta+i\sin\theta)$ and $z=re^{i\theta}$ two different, independently-verifiable facts about complex numbers, or the same fact in two notations?" — a "yes, two different facts" answer reveals MC-1 (missing that $e^{i\theta}$ is defined to equal $\cos\theta+i\sin\theta$, making these the identical statement).

### Teaching Action A02 — Euler's Identity Requires No New Derivation Beyond Substitution (Primitive P28: Conflict Evidence)

Present Example 2's direct evidence: obtaining $e^{i\pi}+1=0$ required nothing beyond substituting $\theta=\pi$ into the already-known general formula and evaluating $\cos\pi,\sin\pi$. State: "Euler's identity isn't a separate, additional miracle requiring its own proof — it falls out automatically the moment you plug $\theta=\pi$ into the formula you already have."

- **MC-2 hook**: ask "does deriving Euler's identity $e^{i\pi}+1=0$ require a separate proof beyond Euler's general formula?" — a "yes" answer reveals MC-2 (missing that it is simply the general formula evaluated at $\theta=\pi$, with no additional derivation needed).

### Teaching Action A03 — The Formula Is a Consequence of Analyticity, Not an Arbitrary Definition (Primitive P06: Contrast Pair)

Contrast a hypothetical "Euler's formula is just a convenient notational DEFINITION, chosen because it's useful" view against Example 3's power-series derivation, where the cosine and sine series emerge EXACTLY from $e^z$'s own already-established power series. State: "this isn't a definition invented for convenience — it's a provable consequence of $e^z$ being entire (from `math.cx.analytic-functions`), whose power series genuinely splits into the cosine and sine series when you substitute an imaginary input."

- **MC-3 hook**: ask "is Euler's formula essentially an arbitrary notational definition, chosen for convenience, rather than a derivable consequence of deeper facts about $e^z$?" — a "yes" answer reveals MC-3 (missing that it is a genuine consequence of $e^z$'s analyticity and power-series representation, not an arbitrary choice).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Using Euler's formula, compute $e^{i\pi/3}$ in the form $a+bi$.
  2. Verify your answer to problem 1 matches `math.trig.polar-form-complex`'s own polar form $\cos(\pi/3)+i\sin(\pi/3)$.
  3. Derive $e^{i\pi/2}=i$ from Euler's formula, and explain why this is sometimes called a "cousin" of Euler's identity.
  4. Explain, without full derivation, why Euler's formula is a consequence of $e^z$'s power series rather than an arbitrary notational choice.
- **P76 (Transfer Probe, mode = cross-link probe engaging `math.cx.analytic-functions`)**: "Electrical engineers represent AC voltage signals as $V(t)=V_0e^{i\omega t}$, relying on Euler's formula to extract the real, physically-measured voltage as $\mathrm{Re}[V_0e^{i\omega t}]=V_0\cos(\omega t)$. (a) Using Euler's formula, expand $V_0e^{i\omega t}$ into its real and imaginary parts. (b) Explain, citing `math.cx.analytic-functions`'s guarantee that $e^z$ is entire (holomorphic on all of $\mathbb{C}$), why this exponential representation is mathematically legitimate for ANY real $t$, not merely a formal trick. (c) A student claims 'this complex representation is just a shorthand with no real mathematical justification, since voltage is a real physical quantity' — evaluate this claim, citing the power-series argument connecting $e^{i\theta}$'s analyticity to the cosine/sine series."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | EULERS-FORMULA-ASSUMED-SEPARATE-FACT-FROM-POLAR-FORM | Believing $z=re^{i\theta}$ and $z=r(\cos\theta+i\sin\theta)$ are two independently-verifiable facts, missing that $e^{i\theta}$ is defined to equal $\cos\theta+i\sin\theta$, making these identical | Foundational |
| MC-2 | EULERS-IDENTITY-ASSUMED-TO-NEED-SEPARATE-PROOF | Believing Euler's identity $e^{i\pi}+1=0$ requires its own separate derivation, missing that it is simply the general formula evaluated at $\theta=\pi$ | High |
| MC-3 | EULERS-FORMULA-ASSUMED-ARBITRARY-DEFINITION | Believing Euler's formula is an arbitrary notational definition chosen for convenience, missing that it is a genuine consequence of $e^z$'s analyticity and power-series representation | Moderate |

- **B01 (targets MC-1)**: P27 (name it: "Euler's Formula Assumed Separate Fact From Polar Form") → P41 (detect: ask whether $z=re^{i\theta}$ and $z=r(\cos\theta+i\sin\theta)$ are two independent facts) → P64 (conceptual shift: re-walk Example 1's dual computation of $z=2i$, re-anchoring on "$e^{i\theta}$ is defined to equal $\cos\theta+i\sin\theta$ — the same fact, two notations").
- **B02 (targets MC-2)**: P27 (name it: "Euler's Identity Assumed to Need Separate Proof") → P41 (detect: ask whether deriving Euler's identity requires a proof beyond the general formula) → P64 (conceptual shift: re-walk Example 2's direct $\theta=\pi$ substitution, re-anchoring on "no new derivation is needed beyond substitution").
- **B03 (targets MC-3)**: P27 (name it: "Euler's Formula Assumed Arbitrary Definition") → P41 (detect: ask whether Euler's formula is an arbitrary notational choice) → P64 (conceptual shift: re-walk Example 3's power-series derivation, re-anchoring on "it is a genuine consequence of $e^z$'s analyticity, not an arbitrary choice").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.trig.polar-form-complex` (the polar form $z=r(\cos\theta+i\sin\theta)$ this concept's exponential notation directly rewrites) and `math.alg.natural-logarithm` (the exponential function with base $e$, extended here to imaginary exponents).
- **Unlocks**: none listed in the KG for this concept.
- **Cross-link**: KG lists `math.cx.analytic-functions`, checked via `ls docs/curriculum/blueprints/` and confirmed ALREADY authored. $P76_{mode}=$ **cross-link probe**, engaging `math.cx.analytic-functions`'s own guarantee that $e^z$ is entire (holomorphic on all of $\mathbb{C}$) directly in Component 3's justification and the P76 transfer probe.

## Component 8 — Teaching Notes

- estimated_hours = 5 with an advanced/understand tag supports the "3 TAs + gate" tier, with LO1 and LO2 given full computational depth (the polar-form identification and the direct $\theta=\pi$ substitution) and LO3 kept orientation-level, appropriately surveying the power-series justification without deriving the complex Taylor series' convergence properties from scratch.
- **Division of labor**: `math.trig.polar-form-complex` owns the trigonometric polar form itself; `math.alg.natural-logarithm` owns the real exponential function; `math.cx.analytic-functions` owns the general theory of entire functions and power-series representability. This concept owns the SPECIFIC identification $e^{i\theta}=\cos\theta+i\sin\theta$ connecting all three — deliberately verifying the formula on a concrete angle ($\theta=\pi/2$) via BOTH notations in Example 1 before naming the general identity, and citing (not re-deriving) `math.cx.analytic-functions`'s entire-function guarantee in Example 3 rather than re-proving analyticity from scratch.
- Example 2's deliberate choice to derive Euler's identity as a bare substitution (no additional steps) was chosen specifically to counter MC-2 as directly and starkly as possible — showing there is genuinely nothing more to the "miracle" than plugging in $\theta=\pi$.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS (none listed) |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (`math.cx.analytic-functions` confirmed authored → cross-link probe) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (cross-link probe) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.85×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Concrete: numeric verification at $\theta=\pi/2$ precedes naming the general identity and Euler's identity) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
