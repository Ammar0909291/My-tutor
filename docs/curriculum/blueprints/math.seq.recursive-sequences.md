# Teaching Blueprint: Recursive Sequences (`math.seq.recursive-sequences`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.seq.recursive-sequences` |
| name | Recursive Sequences |
| domain | Sequences and Series |
| difficulty | proficient |
| bloom | apply |
| mastery_threshold | 0.8 → MAMR = ⌈0.8×5⌉ = 4/5 |
| estimated_hours | 5 |
| requires | `math.seq.sequence`, `math.found.proof-by-induction` |
| unlocks | none |
| cross_links | `math.disc.recurrence-relation` (authored earlier — see Component 7) |
| CPA_entry_stage | C (Concrete) — computing terms of one specific recursively-defined sequence before naming the general definition |
| description (KG) | Sequences defined by a recurrence relation $a_n=f(a_{n-1},a_{n-2},\dots)$ and initial conditions; e.g., Fibonacci: $F_1=F_2=1$, $F_n=F_{n-1}+F_{n-2}$. |

## Component 1 — Learning Objectives

- LO1: Define a **recursive sequence** as `math.seq.sequence`'s own function $\mathbb{N}\to$ (a set), but SPECIFIED by giving initial conditions plus a rule $a_n=f(a_{n-1},a_{n-2},\dots)$ for later terms in terms of EARLIER ones — a genuinely different specification method from an explicit closed-form formula $a_n=g(n)$, though both describe sequences in `math.seq.sequence`'s general sense.
- LO2: Compute terms of a recursively-defined sequence (e.g. Fibonacci) by repeated application of the recurrence, and recognize that computing $a_n$ this way requires knowing ALL earlier referenced terms first — you cannot "jump ahead" to $a_{100}$ without passing through the terms it depends on.
- LO3 (orientation level — full closed-form-solving theory deferred): recognize, without full derivation, that `math.found.proof-by-induction` is the natural tool for PROVING properties of a recursively-defined sequence (since the recurrence's own structure — depending on earlier terms — mirrors induction's own "truth at $n$ implies truth at $n+1$" structure), and that solving a recurrence into an explicit closed form (via the characteristic-equation method) is a DIFFERENT, separate task, deferred to `math.disc.recurrence-relation`.

## Component 2 — Prerequisite Check

Assumes mastery of `math.seq.sequence` (a sequence as a function $\mathbb{N}\to$ (a set), listing values $a_1,a_2,a_3,\dots$) and `math.found.proof-by-induction` (base case + "$n$ implies $n+1$" as a proof technique).

## Component 3 — Core Explanation

**A recursive sequence is still a sequence in `math.seq.sequence`'s sense, just specified differently**: `math.seq.sequence` defined a sequence generally as a function from $\mathbb{N}$ to a set. A RECURSIVE sequence is one particular way of PINNING DOWN which function that is: rather than giving an explicit formula $a_n=g(n)$ directly, you give initial value(s) and a rule expressing $a_n$ in terms of PREVIOUS terms. Both methods produce a genuine sequence in the same sense — the difference is entirely in HOW the sequence is specified, not in what kind of mathematical object results.

**Computing terms requires passing through all earlier dependencies**: since $a_n=f(a_{n-1},a_{n-2},\dots)$ literally REFERENCES earlier terms, computing $a_n$ requires first knowing those earlier terms — which themselves may require even earlier ones, all the way back to the given initial conditions. This is fundamentally different from an explicit formula $a_n=g(n)$, which can be evaluated directly at any $n$ without computing any other term first; a recursive definition inherently builds up sequentially.

**Induction is the natural tool for proving properties of recursive sequences (orientation level)**: because a recurrence's OWN structure (each term built from earlier ones) mirrors `math.found.proof-by-induction`'s own structure (truth at $n$ propagating to $n+1$), induction is the natural technique for PROVING facts about a recursively-defined sequence (e.g. "$F_n>0$ for all $n$," or closed-form conjectures). This is a DIFFERENT task from actually SOLVING the recurrence into an explicit closed-form formula (via the characteristic-equation method) — proving properties of a recursively-given sequence, versus finding an explicit non-recursive formula for it, are related but distinct goals, with the latter deferred to `math.disc.recurrence-relation`.

## Component 4 — Worked Examples

**Example 1 (LO1 — recursive versus explicit specification of the same kind of object, breaking MC-1)**: the Fibonacci sequence is specified RECURSIVELY: $F_1=F_2=1$, $F_n=F_{n-1}+F_{n-2}$ for $n\ge3$. This produces the SAME kind of mathematical object `math.seq.sequence` already studied (a function $\mathbb{N}\to\mathbb{N}$, listing $1,1,2,3,5,8,13,\dots$) — it is simply specified by a rule referencing earlier terms rather than by a direct formula in $n$. `math.seq.sequence`'s own explicit-formula sequences (e.g. $a_n=2n+1$, giving $3,5,7,9,\dots$) describe the identical KIND of object, just specified the other way.

**Example 2 (LO2 — computing terms requires all earlier dependencies, breaking MC-2)**: to compute $F_6$ from the Fibonacci recurrence: $F_1=1$, $F_2=1$, $F_3=F_2+F_1=1+1=2$, $F_4=F_3+F_2=2+1=3$, $F_5=F_4+F_3=3+2=5$, $F_6=F_5+F_4=5+3=8$. Notice: computing $F_6$ genuinely REQUIRED computing $F_1$ through $F_5$ first — there was no way to "jump directly" to $F_6$ without passing through every earlier term the recurrence depends on, unlike an explicit formula which could be evaluated at $n=6$ directly.

**Example 3 (LO3, orientation level — induction proves properties; solving the recurrence is a separate task, breaking MC-3)**: to prove $F_n\ge n$ for all $n\ge5$ (say), induction is the natural tool: BASE CASE, $F_5=5\ge5$ ✓. INDUCTIVE STEP: assuming $F_k\ge k$ and $F_{k-1}\ge k-1$ for some $k\ge5$, show $F_{k+1}\ge k+1$: $F_{k+1}=F_k+F_{k-1}\ge k+(k-1)=2k-1\ge k+1$ (for $k\ge2$) — the recurrence's OWN "each term from earlier ones" structure is exactly what makes the inductive step work naturally. This is a DIFFERENT task from finding Fibonacci's actual CLOSED-FORM formula (Binet's formula, involving the golden ratio) — proving a property about the recursively-defined sequence, versus deriving an explicit non-recursive formula for it via the characteristic-equation method, are related but genuinely separate goals.

## Component 5 — Teaching Actions

### Teaching Action A01 — Recursive Definition Is a Different SPECIFICATION Method, Not a Different Kind of Object (Primitive P11: Representation Shift)

State: "a recursively-defined sequence isn't a fundamentally different mathematical object from the explicit-formula sequences you already know — it's the SAME kind of function $\mathbb{N}\to$(a set), just described by a different method: earlier terms building later ones, instead of a direct formula in $n$." Walk Example 1's side-by-side comparison.

- **MC-1 hook**: ask "is a recursively-defined sequence a fundamentally different KIND of mathematical object from an explicit-formula sequence?" — a "yes" answer reveals MC-1 (missing that both are genuine sequences in `math.seq.sequence`'s sense, differing only in specification method).

### Teaching Action A02 — You Cannot Skip Ahead in a Recursive Sequence (Primitive P28: Conflict Evidence)

Present Example 2's direct evidence: computing $F_6$ genuinely required computing $F_1$ through $F_5$ first, term by term. State: "unlike an explicit formula, which you can evaluate at any $n$ directly, a recursive definition FORCES you to build up sequentially through every earlier term it depends on."

- **MC-2 hook**: ask "can you compute $a_n$ for a recursively-defined sequence directly, without first computing the earlier terms it depends on?" — a "yes" answer reveals MC-2 (missing that a recursive definition inherently requires building up through all earlier dependencies).

### Teaching Action A03 — Proving a Property Is Not the Same Task as Solving the Recurrence (Primitive P06: Contrast Pair)

Contrast Example 3's induction-based PROOF that $F_n\ge n$ (a property of the recursively-given sequence) against the SEPARATE task of finding Fibonacci's actual closed-form formula. State: "proving something about a recursively-defined sequence, using induction, is a genuinely different goal from actually SOLVING the recurrence into an explicit non-recursive formula — the second task needs its own separate method, the characteristic equation, covered in `math.disc.recurrence-relation`."

- **MC-3 hook**: ask "does proving a property of a recursively-defined sequence via induction also give you its explicit closed-form formula?" — a "yes" answer reveals MC-3 (missing that these are separate tasks — induction proves properties of the recursive definition; solving the recurrence requires a different method entirely).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Compute the first 6 terms of the sequence defined by $a_1=2$, $a_n=3a_{n-1}-1$ for $n\ge2$.
  2. Explain why computing $a_{10}$ for this sequence requires first computing $a_1$ through $a_9$.
  3. Using induction, prove $a_n>1$ for all $n\ge1$ in the sequence from problem 1.
  4. Explain, in one or two sentences, why proving $a_n>1$ via induction is a different task from finding an explicit closed-form formula for $a_n$.
- **P76 (Transfer Probe, mode = cross-link probe engaging `math.disc.recurrence-relation`)**: "A population model is given recursively by $P_1=100$, $P_n=P_{n-1}+50$ for $n\ge2$. (a) Compute $P_5$, showing each step's dependency on the previous term. (b) Use induction to prove $P_n=100+50(n-1)$ for all $n\ge1$ (verifying this closed form matches the recursive definition at every step). (c) Explain, citing `math.disc.recurrence-relation`'s characteristic-equation method, how one would approach FINDING such a closed-form formula in the first place for a recurrence where the answer isn't already guessed — as distinct from merely VERIFYING a proposed closed form via induction, which is what part (b) did."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | RECURSIVE-SEQUENCE-ASSUMED-DIFFERENT-KIND-OF-OBJECT | Believing a recursively-defined sequence is a fundamentally different kind of mathematical object from an explicit-formula sequence, missing that both are genuine sequences, differing only in specification method | Foundational |
| MC-2 | RECURSIVE-TERMS-ASSUMED-DIRECTLY-COMPUTABLE | Believing $a_n$ can be computed directly for a recursively-defined sequence without first computing the earlier terms it depends on, missing the inherent sequential-buildup requirement | High |
| MC-3 | INDUCTION-PROOF-ASSUMED-TO-GIVE-CLOSED-FORM | Believing proving a property of a recursive sequence via induction also produces its explicit closed-form formula, missing that solving the recurrence is a separate task | Moderate |

- **B01 (targets MC-1)**: P27 (name it: "Recursive Sequence Assumed Different Kind of Object") → P41 (detect: ask whether a recursively-defined sequence is a fundamentally different kind of object from an explicit-formula sequence) → P64 (conceptual shift: re-walk Example 1's side-by-side comparison, re-anchoring on "the same kind of function, differing only in specification method").
- **B02 (targets MC-2)**: P27 (name it: "Recursive Terms Assumed Directly Computable") → P41 (detect: ask whether $a_n$ can be computed directly without the earlier terms it depends on) → P64 (conceptual shift: re-walk Example 2's step-by-step Fibonacci computation, re-anchoring on "sequential buildup through every earlier dependency is inherent").
- **B03 (targets MC-3)**: P27 (name it: "Induction Proof Assumed to Give Closed Form") → P41 (detect: ask whether an induction proof about a recursive sequence also gives its closed-form formula) → P64 (conceptual shift: re-walk Example 3's contrast between proving $F_n\ge n$ and finding Binet's formula, re-anchoring on "these are separate tasks").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.seq.sequence` (the general definition of a sequence, of which recursively-defined sequences are one specification method) and `math.found.proof-by-induction` (the base-case-plus-inductive-step technique this concept's LO3 directly applies).
- **Unlocks**: none listed in the KG for this concept.
- **Cross-link**: KG lists `math.disc.recurrence-relation`, checked via `ls docs/curriculum/blueprints/` and confirmed ALREADY authored. $P76_{mode}=$ **cross-link probe**, engaging `math.disc.recurrence-relation`'s own characteristic-equation method directly in Component 3's task-separation argument and the P76 transfer probe.

## Component 8 — Teaching Notes

- estimated_hours = 5 with a proficient/apply tag supports the "3 TAs + gate" tier, with LO1 and LO2 given full computational depth (the specification-method comparison and the term-by-term computation) and LO3 kept orientation-level, appropriately previewing induction's natural fit and the separate closed-form-solving task without deriving the characteristic-equation method itself.
- **Division of labor**: `math.seq.sequence` owns the general definition of a sequence; `math.found.proof-by-induction` owns the induction technique generally. This concept owns the SPECIFIC recursive specification method and its natural pairing with induction for proving properties — deliberately using the Fibonacci sequence throughout Examples 1–3 as one continuous running example, and explicitly deferring (not attempting) the closed-form-solving task to `math.disc.recurrence-relation`, whose own characteristic-equation method is the genuinely different tool for that separate goal.
- Example 3's deliberate choice of a provable INEQUALITY ($F_n\ge n$) rather than attempting Binet's full closed-form formula was chosen to demonstrate induction's natural fit for PROVING properties, while explicitly flagging closed-form-finding as a task requiring different (cross-linked) machinery, avoiding any appearance that induction alone solves recurrences.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS (none listed) |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (`math.disc.recurrence-relation` confirmed authored → cross-link probe) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (cross-link probe) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.8×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Concrete: computing terms of a specific sequence precedes the general definition) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
