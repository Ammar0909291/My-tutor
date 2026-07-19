# Teaching Blueprint: Algebraic Extension (`math.abst.algebraic-extension`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.abst.algebraic-extension` |
| name | Algebraic Extension |
| domain | Abstract Algebra |
| difficulty | expert |
| bloom | apply |
| mastery_threshold | 0.75 → MAMR = ⌈0.75×5⌉ = 4/5 |
| estimated_hours | 5 |
| requires | `math.abst.field-extension` |
| unlocks | `math.abst.galois-theory` |
| cross_links | (none) |
| CPA_entry_stage | A (Abstract) — expert learner already fluent in field extensions and degree; the minimal polynomial is introduced directly at the symbolic level |
| description (KG) | α is algebraic over F if it satisfies some polynomial with F-coefficients. Minimal polynomial mα(x): the monic irreducible polynomial of least degree satisfied by α. F(α)≅F[x]/(mα(x)); [F(α):F]=deg(mα). |

## Component 1 — Learning Objectives

- LO1: Define the **minimal polynomial** $m_\alpha(x)$ of an algebraic element $\alpha$ over $F$ — the **monic**, **irreducible** polynomial of **least degree** satisfied by $\alpha$ — and verify whether a given candidate polynomial actually qualifies, checking all three conditions rather than accepting any polynomial that merely has $\alpha$ as a root.
- LO2: Explain WHY $[F(\alpha):F]=\deg(m_\alpha)$ via the isomorphism $F(\alpha)\cong F[x]/(m_\alpha(x))$ — the cosets of $F[x]/(m_\alpha(x))$ correspond exactly to polynomials in $\alpha$ of degree less than $\deg(m_\alpha)$, giving the basis $\{1,\alpha,\alpha^2,\dots,\alpha^{\deg(m_\alpha)-1}\}$ directly, without needing to separately verify linear independence by hand.
- LO3: Compute $[F(\alpha):F]$ directly by finding $\alpha$'s TRUE minimal polynomial — searching for the lowest-degree irreducible polynomial $\alpha$ satisfies, rather than assuming the degree of whatever equation was originally used to introduce $\alpha$ is automatically minimal.

## Component 2 — Prerequisite Check

Assumes mastery of `math.abst.field-extension` ($K/F$, degree $[K:F]=\dim_F(K)$, the Tower Law, and the algebraic-vs-transcendental distinction already established there via $\mathbb{Q}(\sqrt2)/\mathbb{Q}$ vs. $\mathbb{Q}(\pi)/\mathbb{Q}$).

## Component 3 — Core Explanation

**The minimal polynomial requires three conditions, all at once**: `math.abst.field-extension` already established that $\alpha$ is algebraic over $F$ if it satisfies SOME nonzero polynomial with $F$-coefficients — but many different polynomials can have $\alpha$ as a root (scalar multiples, products with other factors, higher-degree combinations). The MINIMAL polynomial $m_\alpha(x)$ is the ONE specific polynomial satisfying all three conditions simultaneously: **monic** (leading coefficient $1$), **irreducible** over $F$ (cannot be factored into lower-degree polynomials over $F$), and of **least degree** among all polynomials $\alpha$ satisfies. These three conditions together determine $m_\alpha(x)$ uniquely.

**The isomorphism $F(\alpha)\cong F[x]/(m_\alpha(x))$ explains the degree formula directly**: every polynomial in $x$ can be divided by $m_\alpha(x)$ (polynomial division), leaving a remainder of degree strictly less than $\deg(m_\alpha)$; substituting $\alpha$ for $x$, this means every element of $F(\alpha)$ can be written UNIQUELY as $c_0+c_1\alpha+\cdots+c_{d-1}\alpha^{d-1}$ where $d=\deg(m_\alpha)$ — exactly a basis of size $d$. This is why $[F(\alpha):F]=\deg(m_\alpha)$ falls out directly from the minimal polynomial's degree, rather than requiring a separate hand-verification of linear independence each time (the kind `math.abst.field-extension`'s own examples performed directly).

**Finding the TRUE minimal polynomial sometimes requires looking past the "obvious" defining equation**: an element $\alpha$ may first be introduced via some polynomial equation it satisfies, but that equation need not itself be irreducible — a lower-degree irreducible factor may be the genuine minimal polynomial. Always fully factor (or otherwise verify irreducibility of) the defining equation before declaring its degree to be $[F(\alpha):F]$.

## Component 4 — Worked Examples

**Example 1 (LO1 — checking all three conditions among several candidates, breaking MC-1)**: For $\alpha=\sqrt2$ over $\mathbb{Q}$, consider three candidate polynomials each satisfied by $\alpha$: (a) $3x^2-6$ — has $\sqrt2$ as a root ($3(2)-6=0$), but is NOT monic (leading coefficient $3$) — reject; (b) $(x^2-2)(x-1)$ — has $\sqrt2$ as a root (the $x^2-2$ factor vanishes), monic, but REDUCIBLE (factors into $(x^2-2)(x-1)$) and not of least degree — reject; (c) $x^2-2$ — monic, irreducible over $\mathbb{Q}$ (since $\sqrt2$ is irrational, no linear factor over $\mathbb{Q}$ exists), and of least possible degree (degree $1$ would require $\sqrt2\in\mathbb{Q}$, false) — the UNIQUE candidate satisfying all three conditions. $m_{\sqrt2}(x)=x^2-2$.

**Example 2 (LO2 — the isomorphism directly explains the degree, breaking MC-2)**: For $m_{\sqrt2}(x)=x^2-2$, the isomorphism $\mathbb{Q}(\sqrt2)\cong\mathbb{Q}[x]/(x^2-2)$ means every coset in $\mathbb{Q}[x]/(x^2-2)$ is represented by a polynomial of degree less than $2$ (since $x^2\equiv2$ lets any higher power be reduced), i.e. every coset looks like $a+bx$ for $a,b\in\mathbb{Q}$. Substituting $\alpha=\sqrt2$ for $x$: every element of $\mathbb{Q}(\sqrt2)$ is $a+b\sqrt2$ — the basis $\{1,\sqrt2\}$ falls directly out of the reduction-by-$m_\alpha$ process, giving $[\mathbb{Q}(\sqrt2):\mathbb{Q}]=\deg(x^2-2)=2$ immediately, with no separate linear-independence check required.

**Example 3 (LO3 — finding the TRUE minimal polynomial past a misleading "obvious" equation, breaking MC-3)**: Let $\alpha=i$. The "obvious" defining equation might be $x^4-1=0$ (since $i^4=1$), a degree-4 polynomial — but $x^4-1=(x^2-1)(x^2+1)=(x-1)(x+1)(x^2+1)$ is REDUCIBLE, so it is NOT the minimal polynomial. Checking the irreducible factor $x^2+1$: $i$ satisfies it ($i^2+1=-1+1=0$), it is monic, and irreducible over $\mathbb{Q}$ (no rational root, since $i\notin\mathbb{Q}$, and a degree-2 polynomial with no rational root is irreducible over $\mathbb{Q}$). So $m_i(x)=x^2+1$, giving $[\mathbb{Q}(i):\mathbb{Q}]=2$ — NOT $4$, which the "obvious" degree-4 equation would have wrongly suggested. As a further check, `math.abst.field-extension`'s own transfer probe asserted that $\sqrt[3]2$ generates a degree-3 extension of $\mathbb{Q}$ (relevant to why the cube cannot be doubled by compass and straightedge); this is now directly CONFIRMED here: $\sqrt[3]2$ satisfies $x^3-2$, irreducible over $\mathbb{Q}$ by Eisenstein's criterion at $p=2$, so $[\mathbb{Q}(\sqrt[3]2):\mathbb{Q}]=\deg(x^3-2)=3$ exactly as that concept's transfer probe claimed, now actually derived rather than merely asserted.

## Component 5 — Teaching Actions

### Teaching Action A01 — Three Conditions, Not Just "Some Polynomial with α as a Root" (Primitive P06: Contrast Pair)

Contrast Example 1's three candidates side by side: the non-monic one (rejected), the reducible/non-minimal one (rejected), and $x^2-2$ (the only one satisfying all three conditions). State: "algebraic just means SOME polynomial has $\alpha$ as a root — the MINIMAL polynomial is the one specific polynomial satisfying monic, irreducible, AND least degree, all simultaneously."

- **MC-1 hook**: ask "does any polynomial with $\alpha$ as a root qualify as $\alpha$'s minimal polynomial?" — a "yes" answer reveals MC-1 (missing the monic/irreducible/least-degree requirements).

### Teaching Action A02 — The Degree Formula Comes Directly from the Isomorphism (Primitive P11: Representation Shift)

State: "you don't need to separately guess and verify a basis for $F(\alpha)$ — the isomorphism $F(\alpha)\cong F[x]/(m_\alpha(x))$ hands you the basis $\{1,\alpha,\dots,\alpha^{d-1}\}$ directly, the moment you know $m_\alpha$'s degree $d$." Work Example 2's reduction-by-$m_\alpha$ argument for $\mathbb{Q}(\sqrt2)$.

- **MC-2 hook**: ask "must $[F(\alpha):F]$ always be found by separately constructing and verifying a basis from scratch, even once the minimal polynomial is known?" — a "yes" answer reveals MC-2 (missing that the degree can be read directly off $\deg(m_\alpha)$).

### Teaching Action A03 — The First Equation You See May Not Be Minimal (Primitive P28: Conflict Evidence)

Present Example 3's direct evidence: $i$ satisfies the degree-4 equation $x^4-1=0$, but its TRUE minimal polynomial is the degree-2 $x^2+1$, since $x^4-1$ factors further. State: "always fully check irreducibility — an equation's surface degree can overstate the actual extension degree if it isn't already irreducible."

- **MC-3 hook**: ask "if $\alpha$ is first introduced via a degree-$n$ equation it satisfies, is $[F(\alpha):F]$ automatically $n$?" — a "yes" answer reveals MC-3 (assuming the defining equation's degree is automatically minimal, without checking irreducibility).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. For $\alpha=\sqrt3$ over $\mathbb{Q}$, verify $x^2-3$ satisfies all three minimal-polynomial conditions, and state $[\mathbb{Q}(\sqrt3):\mathbb{Q}]$.
  2. Explain, using the isomorphism $F(\alpha)\cong F[x]/(m_\alpha(x))$, why the basis for $F(\alpha)$ over $F$ always has exactly $\deg(m_\alpha)$ elements.
  3. An element $\beta$ satisfies $x^4-4x^2+3=0$. Factor this polynomial and determine $\beta$'s true minimal polynomial if $\beta=\sqrt3$ specifically (checking which factor $\sqrt3$ actually satisfies).
  4. Explain why a non-monic polynomial with $\alpha$ as a root, even if otherwise irreducible and of least degree, cannot itself be "the" minimal polynomial as defined.
- **P76 (Transfer Probe, mode = independence)**: "A cryptography researcher works with $\alpha=\sqrt2+\sqrt3$ over $\mathbb{Q}$, and has verified that $\alpha$ satisfies $x^4-10x^2+1=0$. (a) Assuming this quartic is irreducible over $\mathbb{Q}$ (given, not asked to prove), state $[\mathbb{Q}(\alpha):\mathbb{Q}]$ and the resulting basis for $\mathbb{Q}(\alpha)$ over $\mathbb{Q}$, using this lesson's isomorphism-based reasoning rather than separately verifying linear independence of four elements by hand. (b) A colleague claims 'since $\alpha$ is built from $\sqrt2$ (degree 2) and $\sqrt3$ (degree 2), the extension $\mathbb{Q}(\alpha)$ must have degree $2+2=4$ automatically, regardless of which specific polynomial $\alpha$ satisfies.' Using this lesson's emphasis on VERIFYING the minimal polynomial rather than assuming a degree from surface reasoning, explain what is genuinely missing from the colleague's argument, even though the numeric answer happens to match. (c) Explain why simply knowing '$\alpha$ satisfies a degree-4 polynomial' would NOT be enough evidence on its own, without checking that quartic's irreducibility."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | MINIMAL-POLYNOMIAL-ANY-SATISFYING-POLYNOMIAL | Believing any polynomial with α as a root qualifies as "the" minimal polynomial, missing the required monic, irreducible, and least-degree conditions | Foundational |
| MC-2 | DEGREE-REQUIRES-EXPLICIT-BASIS-VERIFICATION | Believing [F(α):F] must always be computed by separately constructing and verifying a basis from scratch, missing that it can be read directly off deg(mα) once the minimal polynomial is known | Moderate |
| MC-3 | MINIMAL-POLYNOMIAL-DEGREE-ASSUMED-FROM-DEFINING-EQUATION | Believing the degree of whichever equation was first used to introduce α is automatically the minimal polynomial's degree, without checking that the equation is actually irreducible | Foundational |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Minimal Polynomial as Any Satisfying Polynomial") → P41 (detect: present a non-monic or reducible polynomial with $\alpha$ as a root and ask whether it is $\alpha$'s minimal polynomial, checking for "yes") → P64 (conceptual shift: re-walk Example 1's three-candidate elimination, re-anchoring on "monic AND irreducible AND least degree, all three, simultaneously").
- **B02 (targets MC-2)**: P27 (name it: "Degree Requires Explicit Basis Verification") → P41 (detect: ask a student how they would find $[F(\alpha):F]$ once $m_\alpha$ is known, checking whether they still reach for separate basis verification) → P64 (conceptual shift: re-walk Example 2's isomorphism-based reduction argument, re-anchoring on "the degree IS $\deg(m_\alpha)$, directly, once the minimal polynomial is found").
- **B03 (targets MC-3)**: P27 (name it: "Minimal Polynomial Degree Assumed from Defining Equation") → P41 (detect: present $i$ satisfying $x^4-1=0$ and ask whether $[\mathbb{Q}(i):\mathbb{Q}]=4$, checking for "yes") → P64 (conceptual shift: re-walk Example 3's factorization revealing the true degree-2 minimal polynomial $x^2+1$, re-anchoring on "always verify irreducibility before trusting a defining equation's degree").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.abst.field-extension` (the degree $[K:F]$ definition and the algebraic-vs-transcendental distinction this concept builds directly on top of).
- **Unlocks**: `math.abst.galois-theory` (uses minimal polynomials and algebraic extensions as its foundational building blocks for studying field automorphisms).
- **Cross-link**: KG lists no cross_links for this concept (checked via `ls docs/curriculum/blueprints/` before setting P76_mode — none to check). $P76_{mode}=$ **independence**.

## Component 8 — Teaching Notes

- estimated_hours = 5 with an expert/apply tag places this at a "3 TAs + gate" tier; the concept builds directly on `math.abst.field-extension`'s already-mastered degree machinery, focusing entirely on the NEW minimal-polynomial layer rather than re-deriving field extension basics.
- **Division of labor**: `math.abst.field-extension` owns the basic algebraic-vs-transcendental distinction (its own Example 3, $\mathbb{Q}(\sqrt2)$ vs. $\mathbb{Q}(\pi)$) and hand-verified degree computations via explicit bases. This concept, `math.abst.algebraic-extension`, deliberately does not re-teach that distinction; it owns the MINIMAL POLYNOMIAL machinery (the monic/irreducible/least-degree definition) and the structural EXPLANATION (via the $F[x]/(m_\alpha(x))$ isomorphism) for why the degree formula works, rather than the basis-counting approach the prerequisite concept used.
- Example 3 deliberately closes a loop with `math.abst.field-extension`'s own P76 transfer probe (which asserted, without deriving, that $\sqrt[3]2$ generates a degree-3 extension relevant to cube-doubling) — this concept actually DERIVES that fact via Eisenstein's criterion, turning a previously-asserted claim into a proven one.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (no cross_links listed → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.75×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract: expert learner already fluent in field extensions; minimal polynomial introduced directly) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
