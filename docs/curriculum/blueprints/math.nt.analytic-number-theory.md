# Teaching Blueprint: Analytic Number Theory (`math.nt.analytic-number-theory`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.nt.analytic-number-theory` |
| name | Analytic Number Theory |
| domain | Number Theory |
| difficulty | research |
| bloom | analyze |
| mastery_threshold | 0.55 → MAMR = ⌈0.55×5⌉ = 3/5 |
| estimated_hours | 60 |
| requires | `math.nt.prime-distribution`, `math.cx.complex-numbers-analysis` |
| unlocks | (none — terminal node in the current KG) |
| cross_links | `math.cx.riemann-zeta` (**not yet authored** — verified via `ls`; P76_mode = independence, see Component 7) |
| CPA_entry_stage | A (Abstract) — direct orientation to the field's central objects, grounded immediately in the already-known Prime Number Theorem |
| description (KG) | The use of complex analysis and real analysis to study number-theoretic problems, particularly the distribution of primes via L-functions and Dirichlet series. |

## Component 1 — Learning Objectives

- LO1: Define a **Dirichlet series** $\sum_{n=1}^\infty \frac{a_n}{n^s}$ (a generalization of ordinary power series, indexed by $n^s$ instead of $x^n$), identify the **Riemann zeta function** $\zeta(s)=\sum_{n=1}^\infty\frac{1}{n^s}$ as the simplest example ($a_n=1$ for all $n$), and state its **Euler product** $\zeta(s)=\prod_{p\text{ prime}}\frac{1}{1-p^{-s}}$, explaining informally why this product identity directly encodes the Fundamental Theorem of Arithmetic (unique prime factorization).
- LO2: Explain, at an orientation level (without full proof), the core strategy connecting complex analysis to prime distribution: **analytic properties of $\zeta(s)$** (particularly the location of its zeros, and its behavior/non-vanishing on the line $\mathrm{Re}(s)=1$) translate into **precise statements about $\pi(x)$** — this is the analytic machinery underlying the actual proof of the Prime Number Theorem, which `math.nt.prime-distribution` stated but did not prove.
- LO3: State the **Riemann Hypothesis** precisely — all nontrivial zeros of $\zeta(s)$ have real part exactly $\frac12$ — and explain (in terms already established by `math.nt.prime-distribution`'s ratio-vs-difference distinction) why this conjecture, if true, would give the *tightest possible* control on the ERROR TERM in the Prime Number Theorem, correctly distinguishing "RH implies a specific error bound" from "RH is required for the PNT itself to be true" (the PNT is already a proven theorem, independent of RH).

## Component 2 — Prerequisite Check

Assumes mastery of `math.nt.prime-distribution` (the Prime Number Theorem's statement, and critically its own ratio-vs-difference asymptotic distinction, directly reused here to correctly frame the Riemann Hypothesis's significance) and `math.cx.complex-numbers-analysis` (complex numbers, modulus, argument — the ambient setting $s\in\mathbb{C}$ that Dirichlet series and $\zeta(s)$ are defined over).

## Component 3 — Core Explanation

**Analytic number theory** studies number-theoretic questions (especially prime distribution) using tools from complex and real analysis — chiefly via **Dirichlet series**, functions of the form
$$D(s) = \sum_{n=1}^\infty \frac{a_n}{n^s}, \qquad s\in\mathbb{C}$$
The simplest and most important example is the **Riemann zeta function**:
$$\zeta(s) = \sum_{n=1}^\infty \frac{1}{n^s} \quad (\text{converges for } \mathrm{Re}(s)>1)$$

**The Euler product**: remarkably, $\zeta(s)$ also equals an infinite product over primes:
$$\zeta(s) = \prod_{p \text{ prime}} \frac{1}{1-p^{-s}}$$
This identity is a direct analytic encoding of the **Fundamental Theorem of Arithmetic** (every integer factors uniquely into primes) — expanding each factor $\frac{1}{1-p^{-s}} = 1+p^{-s}+p^{-2s}+\cdots$ as a geometric series and multiplying everything out, unique factorization guarantees each integer $n$'s term $\frac{1}{n^s}$ appears from the product **exactly once**, recovering the sum-over-$n$ form. This single identity is the bridge letting complex-analytic techniques (studying $\zeta(s)$ as a function of a complex variable) say something about primes (via the product formula).

**The connection to prime distribution (orientation level)**: the actual proof of the Prime Number Theorem (which `math.nt.prime-distribution` stated without proving) proceeds by studying $\zeta(s)$'s analytic behavior — specifically, showing $\zeta(s)$ has no zeros on the vertical line $\mathrm{Re}(s)=1$, a delicate complex-analysis fact that, via a chain of further analytic arguments (contour integration, Tauberian theorems), yields exactly the asymptotic $\pi(x)\sim x/\ln x$.

**The Riemann Hypothesis (RH)**: $\zeta(s)$ has certain "trivial" zeros (at negative even integers) and infinitely many "nontrivial" zeros known to lie in the **critical strip** $0<\mathrm{Re}(s)<1$. RH conjectures that **every** nontrivial zero has real part **exactly** $\frac12$ (lying precisely on the "critical line"). This remains unproven (one of the most famous open problems in mathematics). Its significance: if true, RH would pin down the *precise, optimal* error term in the Prime Number Theorem — a much sharper statement than the PNT's own ratio-only asymptotic. Crucially: **the PNT is already a fully proven theorem**, established (via the zero-free-on-$\mathrm{Re}(s)=1$ fact alone) independently of RH; RH's role is to sharpen the KNOWN error behavior, not to establish the PNT's basic truth.

## Component 4 — Worked Examples

**Example 1 (LO1 — the Euler product, small-scale verification)**: Verify the Euler product identity's mechanism using only the primes 2 and 3, truncated: $\frac{1}{1-2^{-s}}\cdot\frac{1}{1-3^{-s}} = (1+2^{-s}+4^{-s}+\cdots)(1+3^{-s}+9^{-s}+\cdots)$. Multiplying out the first few terms: $1 + 2^{-s}+3^{-s}+4^{-s}+6^{-s}+8^{-s}+9^{-s}+\cdots$ — exactly the terms $\frac{1}{n^s}$ for every $n$ whose ONLY prime factors are 2 and/or 3 (1,2,3,4,6,8,9,...), each appearing exactly once, directly reflecting that each such $n$ has a UNIQUE factorization into powers of 2 and 3.

**Example 2 (LO2/LO3 — orientation-level statement matching, breaking MC-1)**: A student reads that "RH would give a precise error bound for the Prime Number Theorem" and concludes "so the Prime Number Theorem hasn't actually been proven yet — it's waiting on RH." Correct this: the PNT ($\pi(x)\sim x/\ln x$, a ratio-converges-to-1 statement) was proven in 1896 by Hadamard and de la Vallée Poussin using ONLY the (also proven) fact that $\zeta(s)\neq0$ on $\mathrm{Re}(s)=1$ — RH is a MUCH stronger, still-open statement about exactly where all the zeros sit (on the critical line $\mathrm{Re}(s)=\frac12$, not merely off $\mathrm{Re}(s)=1$), and its role would be to improve the KNOWN good asymptotic into an even more precise one — not to establish the PNT's basic truth, which is already settled.

**Example 3 (LO1 — Dirichlet series beyond zeta)**: A Dirichlet L-function has the form $L(s,\chi) = \sum_n \frac{\chi(n)}{n^s}$ for a specific arithmetic function $\chi(n)$ (a "character") rather than the constant $a_n=1$ used in $\zeta(s)$ — these generalized Dirichlet series are the actual tool (beyond the scope of full treatment here) used to prove refined prime-distribution results, such as primes' distribution among arithmetic progressions (Dirichlet's theorem), illustrating that $\zeta(s)$ is the simplest member of a much larger family of tools this field studies.

## Component 5 — Teaching Actions

### Teaching Action A01 — Dirichlet Series, Zeta, and the Euler Product (Primitive P11: Representation Shift)

Recall $\zeta(s)=\sum\frac{1}{n^s}$ as a natural analytic generalization already grounded in familiar power-series ideas from calculus (with $n^s$ playing the role of $x^n$). State: "this simple-looking sum turns out to ALSO equal a product over just the primes — that's the Euler product, and it's the single fact making this entire field possible: it turns questions about ALL integers into questions about the (much sparser, more structured) primes."

Work Example 1's small-scale (primes 2,3 only) verification, explicitly connecting each multiplied-out term back to unique factorization.

- **MC-1 hook**: present the claim "RH would give a precise error bound for the PNT" and ask "does this mean the Prime Number Theorem itself is still unproven, pending RH?" — a "yes" answer reveals MC-1 (conflating a conjecture that would SHARPEN a known result with a prerequisite for that result's basic truth).

### Teaching Action A02 — The Analytic Strategy (Orientation) and the Riemann Hypothesis's Precise Role (Primitive P06: Contrast Pair)

**Contrast 1**: Present the actual (already proven) zero-free-on-$\mathrm{Re}(s)=1$ fact — the genuine analytic input the 1896 PNT proof needed — directly beside RH's much stronger, still-open claim (all nontrivial zeros exactly on $\mathrm{Re}(s)=\frac12$). State: "these are two DIFFERENT statements about where $\zeta(s)$'s zeros can be — the weaker one (proven) already gives you the PNT; the much stronger one (open) would give you something sharper still."

**Contrast 2 (targets MC-1)**: Work Example 2's precise correction explicitly — separating "PNT: proven, 1896, needs only the weaker zero-free fact" from "RH: open, would sharpen the KNOWN error term, does not retroactively unprove or re-open the PNT." Connect back to `math.nt.prime-distribution`'s own ratio-vs-difference distinction: "the PNT already tells you the RATIO converges to 1; RH (if true) would tell you exactly how FAST, and how tightly bounded, the actual DIFFERENCE $\pi(x)-\mathrm{Li}(x)$ (a refined estimate) stays — a genuinely separate, additional question."

### Teaching Action A03 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Write out the Euler product's first few terms using only the primes 2 and 5, and identify which integers' $\frac{1}{n^s}$ terms appear in the resulting expansion.
  2. Explain in your own words why the Euler product identity is a direct analytic restatement of unique prime factorization.
  3. State precisely what is proven (as of the 1896 PNT proof) about $\zeta(s)$'s zeros, versus what the Riemann Hypothesis additionally conjectures.
  4. A textbook states "the Riemann Hypothesis, if proven, would finally establish the Prime Number Theorem." Identify and correct the specific error in this statement.
- **P76 (Transfer Probe, mode = independence)**: "A popular science article claims: 'Mathematicians still don't know for certain how primes are distributed, since the key theorem about it — the Prime Number Theorem — depends on the still-unsolved Riemann Hypothesis.' (a) Using this lesson's precise distinction between the PNT (proven, 1896) and RH (open, a sharper conjecture), identify exactly what is wrong with this journalistic claim. (b) Explain what a mathematician COULD accurately say instead about what RH's resolution (if it happens) would actually change about our knowledge of prime distribution, given that the PNT's basic asymptotic is already secure regardless of RH's fate." *Component 7 note: this scenario was chosen independently rather than cross-linking to `math.cx.riemann-zeta`, since that blueprint does not yet exist; a future revision may connect this probe directly to that concept's own detailed treatment of $\zeta(s)$'s zeros.*
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 3/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | RIEMANN-HYPOTHESIS-CONFLATED-WITH-PNT-PREREQUISITE | Believing the Riemann Hypothesis must be resolved before the Prime Number Theorem can be considered proven, rather than recognizing the PNT was already proven in 1896 using a strictly weaker (already-established) fact | Foundational |
| MC-2 | EULER-PRODUCT-TREATED-AS-COINCIDENCE | Viewing the Euler product identity as a surprising but essentially arbitrary algebraic coincidence, rather than recognizing it as a direct, necessary consequence of unique prime factorization | Moderate |
| MC-3 | DIRICHLET-SERIES-ASSUMED-LIMITED-TO-ZETA | Believing the Riemann zeta function is the only Dirichlet series relevant to number theory, not recognizing it as the simplest member of a broader family (L-functions) used for more refined results | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "RH-as-PNT-Prerequisite Confusion") → P41 (detect: ask whether the Prime Number Theorem is "still unproven, pending RH") → P64 (conceptual shift: re-anchor on the historical/logical separation — the 1896 proof used only the weaker zero-free-on-$\mathrm{Re}(s)=1$ fact, fully establishing the PNT independently of RH, which addresses a separate, sharper question).
- **B02 (targets MC-2)**: P27 (name it: "Euler Product as Coincidence") → P41 (detect: ask why the Euler product identity holds, checking for an appeal to "coincidence" or memorized formula rather than the unique-factorization argument) → P64 (conceptual shift: re-derive via Example 1's explicit small-scale expansion, tracing exactly how each integer's unique factorization produces exactly one matching term).
- **B03 (targets MC-3)**: P27 (name it: "Dirichlet-Series-Is-Only-Zeta Assumption") → P41 (detect: ask whether any Dirichlet series besides $\zeta(s)$ are used in number theory) → P64 (conceptual shift: introduce Example 3's L-function briefly, establishing $\zeta(s)$ as the simplest instance of a broader family, not the field's sole object of study).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.nt.prime-distribution` (the Prime Number Theorem's statement, and its own ratio-vs-difference distinction, directly reused to correctly frame RH's significance), `math.cx.complex-numbers-analysis` (the complex variable $s$ that Dirichlet series and $\zeta(s)$ are functions of).
- **Unlocks**: none — this is a terminal node in the current Mathematics Knowledge Graph (no further concepts build on it as a prerequisite).
- **Cross-link**: KG lists `math.cx.riemann-zeta` as a cross-link. Verified via directory listing that no blueprint yet exists at `docs/curriculum/blueprints/math.cx.riemann-zeta.md`. Per the established P76_mode rule, this blueprint uses **independence** mode. A future revision, once that concept is authored, may add a genuine cross-link probe connecting this concept's orientation-level zero-location discussion directly to that concept's presumably more detailed treatment of $\zeta(s)$'s analytic continuation, functional equation, and the precise zero-counting machinery.

## Component 8 — Teaching Notes

- estimated_hours = 60 is, by a wide margin, the largest hour-estimate encountered in this corpus to date — reflecting the KG's own honest acknowledgment that "analytic number theory" as a named field genuinely represents a full graduate-level subject (comparable in scope to an entire semester or year-long course), not a single teachable unit in the ordinary sense. Consistent with the precedent set by `math.cat.limits` (the corpus's previous largest research-tier outlier), this blueprint deliberately provides an ORIENTATION-level treatment — correctly stating the field's central objects (Dirichlet series, $\zeta(s)$, the Euler product), the logical structure connecting analysis to prime distribution, and the precise, often-misreported relationship between the (proven) PNT and the (open) Riemann Hypothesis — rather than attempting anything resembling exhaustive coverage of the field's actual technical content (contour integration arguments, the explicit formula, zero-density estimates, L-function theory), which would require dozens of dedicated future concept entries the KG's own empty `unlocks` list does not yet provide for.
- The mastery_threshold of 0.55 (this corpus's lowest yet, MAMR 3/5) was computed directly and correctly from the KG's own authored value, appropriately reflecting that genuine mastery of this field's actual content vastly exceeds what a single concept entry's assessment can certify — the gate here certifies correct ORIENTATION and disambiguation of commonly-confused claims (chiefly MC-1), not command of the field's technical machinery.
- MC-1 (RH conflated with a PNT prerequisite) was made this blueprint's central focus because it is very likely the single most common public misunderstanding about this exact area of mathematics (frequently appearing in popular science writing, as dramatized in the transfer probe) — correcting it cleanly, using machinery already built by `math.nt.prime-distribution`'s own ratio-vs-difference distinction, was judged the highest-value single teaching outcome achievable within this concept's necessarily bounded scope.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (both) |
| V-4 | unlocks concepts named accurately from KG | PASS (none — terminal node, correctly empty) |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (`math.cx.riemann-zeta` confirmed absent → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A03) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.55×5⌉=3) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract, grounded directly in the already-known PNT) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2/LO3, Ex3→LO1) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
