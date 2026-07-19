# Teaching Blueprint: Fundamental Theorem of Algebra (`math.alg.fundamental-theorem-algebra`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.alg.fundamental-theorem-algebra` |
| name | Fundamental Theorem of Algebra |
| domain | Algebra |
| difficulty | advanced |
| bloom | understand |
| mastery_threshold | 0.85 → MAMR = ⌈0.85×5⌉ = 5/5 |
| estimated_hours | 5 |
| requires | `math.alg.polynomial-roots`, `math.found.complex-numbers` |
| unlocks | none |
| cross_links | `math.cx.fundamental-theorem-algebra` (not yet authored — see Component 7) |
| CPA_entry_stage | C (Concrete) — factoring one specific low-degree polynomial completely over ℂ before naming the general theorem in its minimal and full forms |
| description (KG) | Every non-constant polynomial with complex coefficients has at least one complex root; consequently has exactly $n$ roots (with multiplicity) in $\mathbb{C}$. |

## Component 1 — Learning Objectives

- LO1: State the theorem's MINIMAL form precisely: every NON-CONSTANT polynomial with complex coefficients has AT LEAST ONE complex root — recognizing this single existence claim as the actual "Fundamental Theorem," more basic than the "exactly $n$ roots" statement `math.alg.polynomial-roots` already uses operationally.
- LO2: Derive the FULL "exactly $n$ roots counting multiplicity" statement as a COROLLARY of the minimal form, via REPEATED APPLICATION: find one root (guaranteed to exist), factor it out (reducing the degree by 1), and repeat on the resulting lower-degree polynomial — showing the full statement is not a separate fact, but the minimal existence claim applied $n$ times in succession.
- LO3 (orientation level — full analytic proof deferred): recognize, without full derivation, that PROVING even the minimal existence claim genuinely requires tools from complex ANALYSIS (e.g. Liouville's theorem: a bounded entire function must be constant) — no purely algebraic proof exists, despite the theorem's name and its extensive algebraic APPLICATIONS (like `math.alg.polynomial-roots`'s own multiplicity-counting), deferred to `math.cx.fundamental-theorem-algebra`.

## Component 2 — Prerequisite Check

Assumes mastery of `math.alg.polynomial-roots` (roots as values where $p(a)=0$, and the "exactly $n$ roots counting multiplicity" statement already used there informally) and `math.found.complex-numbers` ($\mathbb{C}=\{a+bi:a,b\in\mathbb{R}\}$, completing the reals algebraically).

## Component 3 — Core Explanation

**The theorem's actual minimal claim is just "at least one root exists"**: the FUNDAMENTAL claim — the one requiring real mathematical proof — is that ANY non-constant polynomial with complex coefficients has AT LEAST ONE root somewhere in $\mathbb{C}$. This is a genuinely surprising, non-obvious existence guarantee: over the REAL numbers, polynomials like $x^2+1$ have NO roots at all, but `math.found.complex-numbers`'s field $\mathbb{C}$ is specifically constructed so that EVERY non-constant polynomial is guaranteed to have a root somewhere in it.

**"Exactly $n$ roots" follows by repeating the minimal claim, not as a separate fact**: given the minimal claim (at least one root exists), apply the FACTOR THEOREM: if $r_1$ is a root of $p(x)$ (degree $n$), then $p(x)=(x-r_1)q(x)$ for some polynomial $q(x)$ of degree $n-1$. Now apply the MINIMAL CLAIM AGAIN to $q(x)$ (also non-constant, if $n-1\ge1$): it too has a root $r_2$, so $q(x)=(x-r_2)s(x)$, giving $p(x)=(x-r_1)(x-r_2)s(x)$. Repeating this process $n$ TIMES TOTAL (until the remaining factor is a nonzero constant) produces the full factorization $p(x)=c(x-r_1)(x-r_2)\cdots(x-r_n)$ — exactly $n$ roots (with repeats counted as multiplicity), obtained purely by repeatedly invoking the SAME minimal existence claim, not a separately-proved stronger fact.

**Despite its name, no purely algebraic proof exists — analysis is genuinely required (orientation level)**: even though the "Fundamental Theorem of ALGEBRA" is used constantly for algebraic purposes (like `math.alg.polynomial-roots`'s multiplicity bookkeeping), every known proof of even the MINIMAL claim (at least one root exists) uses tools from complex ANALYSIS — for instance, Liouville's theorem (a bounded ENTIRE function must be constant), applied to $1/p(z)$ to derive a contradiction if $p$ had no roots. This is a genuinely surprising gap between the theorem's algebraic NAME/USE and its analytic PROOF, deferred in full to `math.cx.fundamental-theorem-algebra`.

## Component 4 — Worked Examples

**Example 1 (LO1 — the minimal claim guarantees a root where the reals alone fail, breaking MC-1)**: $p(x)=x^2+1$ has NO real roots (since $x^2\ge0$ for all real $x$, so $x^2+1\ge1>0$ always). But the minimal claim guarantees a root SOMEWHERE in $\mathbb{C}$ — and indeed, $p(i)=i^2+1=-1+1=0$: $x=i$ IS a root. This directly illustrates why the theorem requires $\mathbb{C}$, not $\mathbb{R}$: `math.found.complex-numbers`'s field is specifically what makes this existence guarantee actually TRUE.

**Example 2 (LO2 — deriving "exactly n roots" by repeating the minimal claim, breaking MC-2)**: for $p(x)=x^3-6x^2+11x-6$ (degree 3): the minimal claim guarantees SOME root exists; checking, $p(1)=1-6+11-6=0$, so $r_1=1$ is a root. Factor: $p(x)=(x-1)(x^2-5x+6)$. Apply the minimal claim AGAIN to $q(x)=x^2-5x+6$ (degree 2, still non-constant): it has a root too; checking, $q(2)=4-10+6=0$, so $r_2=2$. Factor: $q(x)=(x-2)(x-3)$. Now $s(x)=x-3$ is degree 1 — its own root is trivially $r_3=3$. Total: $p(x)=(x-1)(x-2)(x-3)$ — EXACTLY 3 roots, obtained by invoking the SAME minimal existence claim three times in succession, not by a separately-proved "exactly 3" fact.

**Example 3 (LO3, orientation level — the analytic proof gap, breaking MC-3)**: the standard proof sketch of the minimal claim: suppose (for contradiction) $p(z)$ had NO complex roots at all. Then $f(z)=1/p(z)$ would be defined and ANALYTIC (holomorphic) everywhere on $\mathbb{C}$ (an entire function), and — using growth estimates on $p$ — BOUNDED. By Liouville's theorem (a genuinely ANALYTIC fact: every bounded entire function is constant), $f$ would have to be constant, forcing $p$ itself to be constant — contradicting the assumption that $p$ is non-constant. This proof uses ANALYSIS (entire functions, boundedness, Liouville's theorem) at its core — there is no known proof using only algebraic manipulation, despite the theorem's algebraic name and its constant algebraic use (as in Example 2's factoring).

## Component 5 — Teaching Actions

### Teaching Action A01 — The Real Theorem Is "At Least One Root," Not "Exactly N" (Primitive P11: Representation Shift)

State: "the actual Fundamental Theorem is a simpler, more basic claim than the 'exactly $n$ roots' statement you've already used — it just says at least one root exists, full stop, and $\mathbb{C}$ is specifically built to make that true." Walk Example 1's verification that $x^2+1$ has no real root but does have $x=i$.

- **MC-1 hook**: ask "is 'every degree-$n$ polynomial has exactly $n$ roots' the actual minimal statement of the Fundamental Theorem of Algebra, or is there a simpler underlying claim it's built from?" — a "yes, exactly-$n$-is-the-minimal-statement" answer reveals MC-1 (missing that the true minimal claim is simply "at least one root exists").

### Teaching Action A02 — "Exactly N Roots" Comes From Repeating the Minimal Claim, Not a Separate Proof (Primitive P28: Conflict Evidence)

Present Example 2's direct evidence: the full factorization into 3 roots was obtained by invoking the SAME existence claim three separate times (once per remaining factor), not via one all-at-once "exactly 3" argument. State: "you're not proving 'exactly $n$ roots' as its own separate fact — you're applying the minimal existence claim repeatedly, once per degree reduction, until nothing but a constant remains."

- **MC-2 hook**: ask "is 'a degree-$n$ polynomial has exactly $n$ roots' proved by an entirely separate argument from 'at least one root exists,' or does it follow by repeating that minimal claim?" — a "yes, entirely separate" answer reveals MC-2 (missing that the full statement follows directly from repeated application of the minimal existence claim).

### Teaching Action A03 — The Proof Is Genuinely Analytic, Despite the Algebraic Name (Primitive P06: Contrast Pair)

Contrast Example 2's purely ALGEBRAIC use of the theorem (factoring, root-finding) against Example 3's genuinely ANALYTIC proof (entire functions, boundedness, Liouville's theorem). State: "you use this theorem constantly for algebraic bookkeeping, but proving it in the first place requires tools from a completely different branch of mathematics — analysis, not algebra."

- **MC-3 hook**: ask "since the Fundamental Theorem of Algebra is used for purely algebraic purposes (like factoring and counting roots), does it also have a purely algebraic proof?" — a "yes" answer reveals MC-3 (missing that every known proof requires genuinely analytic tools like Liouville's theorem, despite the theorem's algebraic name and use).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. State the MINIMAL form of the Fundamental Theorem of Algebra (the "at least one root" version), distinguishing it from the "exactly $n$ roots" statement.
  2. Verify $p(x)=x^2+4$ has no real roots, but find its complex root(s) directly.
  3. For $p(x)=x^3-2x^2-x+2$, find one root, factor it out, and repeat the process to obtain the FULL factorization, explicitly noting each application of the minimal existence claim.
  4. Explain, in one or two sentences, why the Fundamental Theorem of Algebra's proof requires analytic tools despite its algebraic name and use.
- **P76 (Transfer Probe, mode = independence)**: "A control-systems engineer needs to know that a degree-6 characteristic polynomial (from a system's differential equation) has exactly 6 roots (poles) in $\mathbb{C}$, to fully characterize the system's behavior. (a) Explain, citing the minimal existence claim applied repeatedly, why this 'exactly 6' guarantee is justified, rather than simply asserted as a separate fact. (b) If the engineer only worked with real coefficients and wondered whether all 6 roots might fail to exist in the REAL numbers alone, explain what role `math.found.complex-numbers`'s field $\mathbb{C}$ plays in guaranteeing they exist somewhere. (c) A colleague claims 'since we use this theorem for purely algebraic root-counting, its proof must also be purely algebraic' — evaluate this claim, citing the Liouville's-theorem proof sketch."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | EXACTLY-N-ROOTS-ASSUMED-MINIMAL-STATEMENT | Believing "exactly $n$ roots" is the minimal statement of the Fundamental Theorem, missing that the true minimal claim is simply "at least one root exists" | Foundational |
| MC-2 | EXACTLY-N-ASSUMED-SEPARATELY-PROVED | Believing "exactly $n$ roots" is proved by an entirely separate argument from the minimal existence claim, missing that it follows from repeating that claim | High |
| MC-3 | FTA-ASSUMED-TO-HAVE-ALGEBRAIC-PROOF | Believing the Fundamental Theorem of Algebra has a purely algebraic proof since it is used algebraically, missing that every known proof requires genuinely analytic tools | Moderate |

- **B01 (targets MC-1)**: P27 (name it: "Exactly-N-Roots Assumed Minimal Statement") → P41 (detect: ask whether "exactly $n$ roots" is the minimal statement of the theorem) → P64 (conceptual shift: re-walk Example 1's $x^2+1$/$x=i$ verification, re-anchoring on "the true minimal claim is simply 'at least one root exists'").
- **B02 (targets MC-2)**: P27 (name it: "Exactly-N Assumed Separately Proved") → P41 (detect: ask whether "exactly $n$ roots" is proved separately from the minimal existence claim) → P64 (conceptual shift: re-walk Example 2's three-times-repeated factoring, re-anchoring on "the full statement follows from repeated application of the minimal claim").
- **B03 (targets MC-3)**: P27 (name it: "FTA Assumed to Have Algebraic Proof") → P41 (detect: ask whether the theorem has a purely algebraic proof) → P64 (conceptual shift: re-walk Example 3's Liouville's-theorem proof sketch, re-anchoring on "the proof genuinely requires analytic tools, despite algebraic use").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.alg.polynomial-roots` (the "exactly $n$ roots" statement this concept derives from the minimal claim, and the factoring/multiplicity bookkeeping directly reused) and `math.found.complex-numbers` ($\mathbb{C}$, the field this concept's existence guarantee is stated over).
- **Unlocks**: none listed in the KG for this concept.
- **Cross-link**: KG lists `math.cx.fundamental-theorem-algebra`, checked via `ls docs/curriculum/blueprints/` and confirmed NOT YET authored. $P76_{mode}=$ **independence**.

## Component 8 — Teaching Notes

- estimated_hours = 5 with an advanced/understand tag supports the "3 TAs + gate" tier, with LO1 and LO2 given full conceptual and computational depth (the minimal-versus-full statement distinction and the repeated-factoring derivation) and LO3 kept orientation-level, appropriately sketching the Liouville's-theorem proof idea without deriving Liouville's theorem itself.
- **Division of labor**: `math.alg.polynomial-roots` owns the OPERATIONAL use of "exactly $n$ roots counting multiplicity" (multiplicity bookkeeping, conjugate root pairing); this concept owns JUSTIFYING that statement as a corollary of the theorem's genuine minimal form, and flagging the analytic (not algebraic) nature of its proof — deliberately using a fully factorable cubic in Example 2 so the repeated-application derivation can be verified completely by hand, root by root.
- Example 1's deliberate choice of $x^2+1$ (the simplest possible real-rootless polynomial) was chosen because it is the most transparent, immediately checkable illustration of why $\mathbb{R}$ alone is insufficient and $\mathbb{C}$'s construction is what makes the existence guarantee actually hold.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS (none listed) |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (`math.cx.fundamental-theorem-algebra` confirmed unauthored → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.85×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Concrete: complete factoring of one specific polynomial over ℂ precedes the general minimal/full theorem statements) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
