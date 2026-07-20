# Teaching Blueprint: Modular Inverse (`math.nt.modular-inverse`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.nt.modular-inverse` |
| name | Modular Inverse |
| domain | Number Theory |
| difficulty | proficient |
| bloom | apply |
| mastery_threshold | 0.8 → MAMR = ⌈0.8×5⌉ = 4/5 |
| estimated_hours | 5 |
| requires | `math.nt.modular-arithmetic`, `math.nt.extended-euclidean-algorithm` |
| unlocks | `math.nt.rsa-basics` |
| cross_links | none |
| CPA_entry_stage | A (Abstract) — proficient learner already knows an inverse exists iff $\gcd(a,n)=1$ and has computed Bézout coefficients before; the task is the FULL computational method and genuine cryptographic application |
| description (KG) | An integer $b$ such that $ab\equiv1\pmod n$; exists iff $\gcd(a,n)=1$, computable via the extended Euclidean algorithm. |

## Component 1 — Learning Objectives

- LO1 (cross-link objective): State the modular inverse's precise definition — $b$ such that $ab\equiv1\pmod n$ — and recognize `math.nt.modular-arithmetic`'s own already-established existence criterion ($a$ has an inverse mod $n$ iff $\gcd(a,n)=1$) as the EXACT condition this concept now shows how to CONSTRUCT an inverse for, rather than merely detect.
- LO2 (cross-link objective): Compute a modular inverse via `math.nt.extended-euclidean-algorithm`'s own output DIRECTLY — that algorithm produces integers $x,y$ with $ax+ny=\gcd(a,n)$; when $\gcd(a,n)=1$, this becomes $ax+ny=1$, i.e. $ax\equiv1\pmod n$ (since $ny\equiv0\pmod n$) — so $x$ (reduced mod $n$ to lie in $\{0,\ldots,n-1\}$) IS the modular inverse, with NO further computation beyond what that algorithm already produces.
- LO3: Apply modular inverses to SOLVE a linear congruence $ax\equiv c\pmod n$ (not merely $ax\equiv1$) — multiplying both sides by $a$'s modular inverse to isolate $x$ — and correctly recognize this technique as the modular analogue of "dividing both sides by $a$," previewing its role in RSA-style cryptographic decryption (this concept's own unlock).

## Component 2 — Prerequisite Check

Assumes mastery of `math.nt.modular-arithmetic` (residues mod $n$; the existence criterion $\gcd(a,n)=1$ for an inverse to exist, already verified there by exhaustive search for small cases) and `math.nt.extended-euclidean-algorithm` (computing $x,y$ with $ax+ny=\gcd(a,n)$, already previewed there via a modular-inverse-flavored transfer probe).

## Component 3 — Core Explanation

**The existence criterion is already known — this concept supplies the CONSTRUCTION**: `math.nt.modular-arithmetic` already establishes, via exhaustive search on small examples, that $a$ has a multiplicative inverse mod $n$ if and only if $\gcd(a,n)=1$. That concept's method for FINDING the inverse (when it exists) was direct trial search — workable for small $n$, but hopelessly inefficient for the large $n$ genuine cryptographic applications require. This concept supplies the EFFICIENT construction, replacing search with direct computation.

**The extended Euclidean algorithm's own output directly IS the inverse — no extra step needed**: `math.nt.extended-euclidean-algorithm` computes integers $x,y$ satisfying $ax+ny=\gcd(a,n)$ for ANY $a,n$. When $\gcd(a,n)=1$ (exactly `math.nt.modular-arithmetic`'s own existence condition), this equation becomes $ax+ny=1$. Reducing modulo $n$: since $ny\equiv0\pmod n$ (it's a multiple of $n$), this gives $ax\equiv1\pmod n$ — EXACTLY the defining property of a modular inverse. So the coefficient $x$ that `math.nt.extended-euclidean-algorithm` ALREADY computes (as part of its own standard output, previewed there via a modular-inverse-flavored transfer probe) IS the modular inverse directly — reduced to lie in the standard range $\{0,\ldots,n-1\}$ if it comes out negative or too large, but requiring NO separate new algorithm.

**Solving linear congruences: the modular analogue of division**: to solve $ax\equiv c\pmod n$ for $x$ (given $\gcd(a,n)=1$), multiply BOTH sides by $a^{-1}$ (the modular inverse just constructed): $a^{-1}(ax)\equiv a^{-1}c\pmod n\Rightarrow x\equiv a^{-1}c\pmod n$ — directly analogous to solving $ax=c$ in ordinary arithmetic by dividing by $a$, except modular arithmetic has no direct "division" operation, so multiplying by the inverse plays exactly that role. This technique is the KEY mechanism underlying RSA-style decryption (`math.nt.rsa-basics`'s own territory, previewed here): decrypting a ciphertext genuinely amounts to solving a congruence of exactly this form.

## Component 4 — Worked Examples

**Example 1 (LO1 — the existence criterion as the launching point for construction, breaking MC-1)**: for $a=15,n=26$: `math.nt.modular-arithmetic`'s own criterion requires checking $\gcd(15,26)$. Computing directly: $\gcd(15,26)=1$ (15 and 26 share no common factors — $15=3\times5$, $26=2\times13$) — so an inverse EXISTS, per the already-known criterion. This concept's job now is CONSTRUCTING it efficiently, rather than searching through all 26 residues by trial — confirming LO1's framing that the existence question is already settled, and the remaining task is genuinely new.

**Example 2 (LO2 — computing the inverse directly from the extended Euclidean algorithm's output, breaking MC-2)**: continuing Example 1 ($a=15,n=26$): running `math.nt.extended-euclidean-algorithm` on $(15,26)$: Euclidean steps: $26=1\times15+11$; $15=1\times11+4$; $11=2\times4+3$; $4=1\times3+1$; $3=3\times1+0$ — confirming $\gcd=1$. Back-substituting: $1=4-1\times3$; $3=11-2\times4\Rightarrow1=4-1\times(11-2\times4)=3\times4-1\times11$; $4=15-1\times11\Rightarrow1=3\times(15-11)-1\times11=3\times15-4\times11$; $11=26-1\times15\Rightarrow1=3\times15-4\times(26-15)=7\times15-4\times26$. So $x=7,y=-4$, giving $15\times7+26\times(-4)=105-104=1$ ✓. Reading off DIRECTLY: $x=7$ is the modular inverse of 15 mod 26 — verifying $15\times7=105=4\times26+1\equiv1\pmod{26}$ ✓ — confirming LO2's claim that the algorithm's own output IS the inverse, with no further computation.

**Example 3 (LO3 — solving a linear congruence using the constructed inverse, breaking MC-3)**: solve $15x\equiv9\pmod{26}$. Using Example 2's already-computed inverse $15^{-1}\equiv7\pmod{26}$: multiply both sides by 7: $7\times15x\equiv7\times9\pmod{26}\Rightarrow x\equiv63\pmod{26}$ (since $7\times15=105\equiv1\pmod{26}$, the left side collapses to just $x$); reducing $63\pmod{26}$: $63=2\times26+11$, so $x\equiv11\pmod{26}$. Verifying directly: $15\times11=165=6\times26+9\equiv9\pmod{26}$ ✓ — confirming the solution, obtained via the "multiply by the inverse" technique DIRECTLY analogous to ordinary division, exactly as LO3 requires demonstrating.

## Component 5 — Teaching Actions

### Teaching Action A01 — The Existence Question Is Already Settled — This Concept Constructs, Not Detects (Primitive P11: Representation Shift)

State: "`math.nt.modular-arithmetic` already told you WHETHER an inverse exists ($\gcd(a,n)=1$) — this concept's entire job is CONSTRUCTING it efficiently, replacing exhaustive search with a direct computation." Walk Example 1's direct gcd check as the already-settled launching point.

- **MC-1 hook**: ask "does this concept re-derive or re-establish the criterion for WHEN a modular inverse exists, or does it take that criterion as already known and focus on constructing the inverse?" — a "re-derives the criterion" answer reveals MC-1 (missing that the existence question is already settled, and the new content is the construction method).

### Teaching Action A02 — The Extended Euclidean Algorithm's Own Output IS the Inverse, No Extra Step (Primitive P28: Conflict Evidence)

Present Example 2's direct evidence: the coefficient $x=7$ obtained from `math.nt.extended-euclidean-algorithm`'s own standard back-substitution process is verified DIRECTLY to satisfy $15\times7\equiv1\pmod{26}$ — no additional computation performed beyond what that algorithm already produces. State: "you don't run the extended Euclidean algorithm and THEN do something else to get the inverse — the $x$ coefficient it already computes IS the inverse, straight away."

- **MC-2 hook**: ask "after running the extended Euclidean algorithm to get $x,y$ with $ax+ny=1$, is an ADDITIONAL computation needed to find the modular inverse, or is $x$ itself (reduced mod $n$) already the answer?" — an "additional computation needed" answer reveals MC-2 (missing that the algorithm's own output directly is the inverse).

### Teaching Action A03 — Multiplying by the Inverse Is the Modular Analogue of Division (Primitive P06: Contrast Pair)

Contrast ordinary arithmetic's division (solving $ax=c$ by dividing by $a$) directly against Example 3's modular technique (solving $ax\equiv c\pmod n$ by multiplying by $a^{-1}\bmod n$, since there's no direct "division" operation in modular arithmetic). State: "there's no modular division operator — multiplying by the modular inverse IS how you 'divide' in modular arithmetic, playing exactly the same algebraic role ordinary division plays."

- **MC-3 hook**: ask "to solve $ax\equiv c\pmod n$, is there a direct modular 'division' operation to isolate $x$, or does solving require multiplying by $a$'s modular inverse instead?" — a "direct division operation exists" answer reveals MC-3 (missing that multiplication by the inverse is the modular substitute for division).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Verify $\gcd(7,20)=1$, confirming an inverse of 7 exists modulo 20.
  2. Run the extended Euclidean algorithm on $(7,20)$ and read off the modular inverse of 7 mod 20 directly from the output.
  3. Verify your answer to problem 2 by direct multiplication modulo 20.
  4. Solve the linear congruence $7x\equiv15\pmod{20}$ using your computed inverse.
- **P76 (Transfer Probe, mode = independence — no cross-link target listed in the KG for this concept)**: "A cryptography student is implementing a simplified RSA-style decryption step, which requires computing $d$, the modular inverse of a public encryption exponent $e=13$ modulo $\phi=40$ (a value derived from two secret primes, not needed for this problem). (a) Verify $\gcd(13,40)=1$, confirming the inverse exists. (b) Run the extended Euclidean algorithm on $(13,40)$ and read off the modular inverse $d$ directly from its output, exactly as this lesson's method demonstrates. (c) Explain, at a conceptual level (without executing full RSA decryption), why having this modular inverse $d$ available is what allows the decryption process to 'undo' the encryption step — connecting to this lesson's framing of modular inverse multiplication as the modular analogue of division."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | EXISTENCE-CRITERION-ASSUMED-RE-DERIVED-HERE | Believing this concept re-derives or re-establishes the modular-inverse existence criterion, missing that it is already known from `math.nt.modular-arithmetic` and this concept's job is construction | Foundational |
| MC-2 | EXTENDED-EUCLIDEAN-OUTPUT-ASSUMED-TO-NEED-FURTHER-PROCESSING | Believing an additional computation is needed after the extended Euclidean algorithm to find the modular inverse, missing that its own $x$ coefficient directly is the inverse | High |
| MC-3 | MODULAR-DIVISION-ASSUMED-DIRECT-OPERATION | Believing there is a direct modular "division" operation to isolate $x$ in $ax\equiv c\pmod n$, missing that multiplying by the modular inverse is the substitute technique | Moderate |

- **B01 (targets MC-1)**: P27 (name it: "Existence Criterion Assumed Re-Derived Here") → P41 (detect: ask whether this concept re-establishes the existence criterion) → P64 (conceptual shift: re-walk Example 1's direct citation of the already-known criterion).
- **B02 (targets MC-2)**: P27 (name it: "Extended Euclidean Output Assumed to Need Further Processing") → P41 (detect: ask whether additional computation is needed after the extended Euclidean algorithm) → P64 (conceptual shift: re-walk Example 2's direct read-off of $x=7$ as the inverse).
- **B03 (targets MC-3)**: P27 (name it: "Modular Division Assumed Direct Operation") → P41 (detect: ask whether modular division is a direct operation) → P64 (conceptual shift: re-walk Example 3's multiply-by-inverse technique).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.nt.modular-arithmetic` (the existence criterion $\gcd(a,n)=1$ this concept takes as already established) and `math.nt.extended-euclidean-algorithm` (the Bézout-coefficient computation this concept's construction directly reuses).
- **Unlocks**: `math.nt.rsa-basics` (RSA decryption directly uses modular inverse computation, previewed in this concept's Component 3 and P76 transfer probe).
- **Cross-link**: KG lists none for this concept. $P76_{mode}=$ **independence** (no cross-link target to check).

## Component 8 — Teaching Notes

- estimated_hours = 5 with a proficient/apply tag supports the "3 TAs + gate" tier, with LO1 grounding the concept in the already-known existence criterion, LO2 given full computational depth directly reusing the extended Euclidean algorithm's own output, and LO3 demonstrating the genuine congruence-solving application previewing RSA.
- **Division of labor**: `math.nt.modular-arithmetic` already owns the existence criterion (verified by grep — its own Teaching Notes explicitly state the RSA-adjacent framing was deliberately left to this concept to avoid scope creep); `math.nt.extended-euclidean-algorithm` already owns the Bézout-coefficient computation itself, previewing modular inverses via its own transfer probe but explicitly deferring full development here (verified by grep — its own Teaching Notes state this explicitly). This concept owns the direct construction method (reading the inverse straight off the extended Euclidean algorithm's output) and the congruence-solving application.
- Example 2's deliberate reuse of the SAME numbers ($a=15,n=26$) across Examples 1, 2, and 3 (rather than fresh numbers per example) was chosen so the existence check, the construction, and the congruence-solving application (in Example 3, closely related via $15x\equiv9$) all connect to a single running computation, making the full pipeline (check existence → construct inverse → use inverse) visibly continuous rather than three disconnected illustrations.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS (`math.nt.rsa-basics`) |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (none listed in KG → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.8×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract: proficient learner already knows the existence criterion and Bézout coefficients; task is the full construction method and application) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
