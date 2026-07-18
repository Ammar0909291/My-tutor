# Teaching Blueprint: Surjective (Onto) Function (`math.func.surjectivity`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.func.surjectivity` |
| name | Surjective (Onto) Function |
| domain | Functions |
| difficulty | proficient |
| bloom | understand |
| mastery_threshold | 0.8 → MAMR = ⌈0.8×5⌉ = 4/5 |
| estimated_hours | 3 |
| requires | `math.func.function-concept` |
| unlocks | `math.func.bijection` |
| cross_links | none |
| CPA_entry_stage | P (Pictorial) — an arrow diagram before the formal quantifier statement |
| description (KG) | f: A → B is surjective if every b ∈ B has at least one a ∈ A with f(a) = b; the range equals the codomain. |

## Component 1 — Learning Objectives

- LO1: Define $f:A\to B$ as **surjective** (or **onto**) if **every** $b\in B$ has **at least one** $a\in A$ with $f(a)=b$ — formally, $\forall b\in B, \exists a\in A: f(a)=b$ — and determine whether a given function is surjective by checking this condition.
- LO2: Connect surjectivity to the equivalent statement "the **range** (actual set of outputs) equals the **codomain** (the stated target set)," and use this equivalence to quickly disqualify a function as non-surjective by finding a single codomain element with no preimage.
- LO3: Correctly distinguish surjectivity (about every codomain element being HIT) from injectivity (about no two domain elements mapping to the SAME output) — recognizing these are independent properties, and a function can be surjective without being injective, or vice versa.

## Component 2 — Prerequisite Check

Assumes mastery of `math.func.function-concept` (the domain/codomain/rule structure of a function).

## Component 3 — Core Explanation

A function $f:A\to B$ is **surjective** (or **onto**) if every element of the codomain $B$ is "hit" by $f$ — i.e., for every $b\in B$, there exists **at least one** $a\in A$ with $f(a)=b$. Formally: $\forall b\in B,\ \exists a\in A: f(a)=b$.

**Equivalent characterization via range**: the **range** of $f$ (sometimes called the image) is the actual set of output values $\{f(a): a\in A\}$ — this is always a subset of the codomain $B$, but not necessarily all of it. $f$ is surjective **exactly when** the range equals the entire codomain (range $=B$) — no codomain element is left "unreached."

**To disqualify surjectivity**: finding just ONE element of $B$ with no preimage in $A$ is enough to conclude $f$ is not surjective — you don't need to check every element, just find a single counterexample.

**Surjectivity is independent of injectivity**: surjectivity is entirely about whether every OUTPUT gets hit (allows multiple inputs mapping to the same output); injectivity (a separate property) is about whether DIFFERENT inputs always give different outputs. A function can satisfy either, both, or neither — checking one tells you nothing about the other.

## Component 4 — Worked Examples

**Example 1 (LO1 — verifying surjectivity directly)**: $f:\{1,2,3\}\to\{a,b\}$ defined by $f(1)=a, f(2)=a, f(3)=b$. Is $f$ surjective? Check every element of the codomain $\{a,b\}$: is there some input mapping to $a$? Yes ($1$ or $2$). Is there some input mapping to $b$? Yes ($3$). Every codomain element is hit — $f$ is surjective (even though both $1$ and $2$ map to the same output $a$ — that's fine, surjectivity doesn't care about this).

**Example 2 (LO2 — a non-surjective function, found via a single counterexample)**: $g:\{1,2,3\}\to\{x,y,z\}$ defined by $g(1)=x,g(2)=x,g(3)=y$. Is $g$ surjective? Check $z$: is there any input mapping to $z$? No — nothing in the domain maps to $z$. Since $z\in$ codomain has no preimage, $g$ is **not** surjective. (Range $=\{x,y\}\neq$ codomain $\{x,y,z\}$.)

**Example 3 (LO3 — surjective but not injective, breaking MC-1)**: $h:\mathbb{R}\to[0,\infty)$ defined by $h(x)=x^2$. Is $h$ surjective? Every $b\geq0$ has SOME real $a$ with $a^2=b$ (namely $a=\sqrt b$), so yes, surjective. Is $h$ injective? No — $h(2)=4$ and $h(-2)=4$, two different inputs giving the same output. This confirms $h$ is surjective but NOT injective — directly demonstrating the two properties are independent, since $h$ has one without the other.

## Component 5 — Teaching Actions

### Teaching Action A01 — Checking Every Codomain Element via an Arrow Diagram (Primitive P11: Representation Shift)

Draw an arrow diagram: domain $\{1,2,3\}$ on the left, codomain $\{a,b\}$ on the right, with arrows for Example 1's $f$. Ask: "does every dot on the right have at least one arrow pointing to it?" — trace and confirm both $a$ and $b$ are hit. State: "that's exactly what surjective/onto means — literally, does the function's arrows cover the WHOLE target set, with nothing left out."

Shift to the formal quantifier statement: $\forall b\in B,\exists a\in A: f(a)=b$. Work Example 2 as a non-example: draw the arrow diagram, showing $z$ has no incoming arrow — a single missed dot is enough to disqualify surjectivity.

- **MC-1 hook**: ask "if a function is surjective, must it also be injective (no two inputs sharing an output)?" — a "yes" answer reveals MC-1 (confusing or conflating surjectivity with injectivity, believing one implies the other).

### Teaching Action A02 — Range vs. Codomain, and Independence from Injectivity (Primitive P06: Contrast Pair)

**Contrast 1**: Compute the range explicitly for Example 1 (range $=\{a,b\}=$ codomain, surjective) versus Example 2 (range $=\{x,y\}\neq$ codomain $\{x,y,z\}$, not surjective). State the rule: "surjective exactly means range = codomain — nothing more to check once you've confirmed this equality (or found a counterexample element proving inequality)."

**Contrast 2 (targets MC-1)**: Work Example 3's $h(x)=x^2$ explicitly — verify surjectivity (every non-negative output is hit) alongside verifying NON-injectivity (two inputs, $2$ and $-2$, share output $4$). State clearly: "these are two completely separate yes/no questions about a function — surjective asks about OUTPUTS being covered; injective asks about INPUTS never colliding. A function can be surjective and non-injective (like this one), injective and non-surjective, both, or neither — check each property independently, never assume one from the other."

### Teaching Action A03 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. $f:\{1,2,3,4\}\to\{p,q\}$ with $f(1)=p,f(2)=p,f(3)=q,f(4)=q$. Is $f$ surjective? Justify by checking each codomain element.
  2. $g:\mathbb{Z}\to\mathbb{Z}$ defined by $g(n)=2n$. Is $g$ surjective? (Hint: is every integer, including odd ones, actually reached?)
  3. $h:\mathbb{R}\to\mathbb{R}$ defined by $h(x)=x^3$. Determine whether $h$ is surjective, and separately whether it is injective, treating these as two independent checks.
  4. A student claims "since every element of the domain maps somewhere in the codomain, the function must be surjective." Explain what is wrong with this reasoning, using Example 2 as a counterexample.
- **P76 (Transfer Probe, mode = independence)**: "A company assigns every one of its 50 employees (the domain) to exactly one of 5 project teams (the codomain), and every one of the 5 teams currently has at least one employee assigned. (a) Using this lesson's definition, explain why this assignment function is surjective. (b) A new team (team 6) is added but has zero employees assigned to it yet — explain, using the range-equals-codomain characterization, why the assignment function is now NOT surjective, purely because of this one empty team, even though every existing employee is still validly assigned somewhere. (c) Separately, is it possible for this assignment to be surjective while still having two employees on the exact same team? Explain why this does not contradict surjectivity."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | SURJECTIVE-CONFLATED-WITH-INJECTIVE | Believing surjectivity implies (or is the same as) injectivity, rather than recognizing these as independent properties | Foundational |
| MC-2 | ALL-DOMAIN-ELEMENTS-MAPPED-ASSUMED-SUFFICIENT | Believing that since every domain element maps to SOME codomain element (a property every function trivially has), the function must automatically be surjective | Foundational |
| MC-3 | SINGLE-COUNTEREXAMPLE-NOT-RECOGNIZED-AS-SUFFICIENT | Believing that disqualifying surjectivity requires checking many or all codomain elements exhaustively, rather than recognizing a single unreached codomain element as sufficient to disprove it | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Surjective/Injective Conflation") → P41 (detect: ask whether every surjective function must also be injective, checking against Example 3's $x^2$) → P64 (conceptual shift: re-anchor on "surjective is about outputs being covered; injective is about inputs never colliding — two independent yes/no questions").
- **B02 (targets MC-2)**: P27 (name it: "Domain-Mapped Assumed Sufficient") → P41 (detect: present Example 2's $g$, note every domain element DOES map somewhere, then ask if $g$ is surjective) → P64 (conceptual shift: re-anchor on "every function, by definition, sends each domain element somewhere — that's not what surjective asks; surjective asks whether EVERY codomain element gets reached FROM somewhere").
- **B03 (targets MC-3)**: P27 (name it: "Exhaustive Check Overestimation") → P41 (detect: ask how many codomain elements you need to check to DISPROVE surjectivity) → P64 (conceptual shift: re-anchor on "finding just ONE unreached codomain element is enough — you don't need to check the rest once you've found a single counterexample").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.func.function-concept` (the domain/codomain structure surjectivity is defined relative to).
- **Unlocks**: `math.func.bijection` (a bijection is defined as a function that is both surjective and injective — this concept supplies exactly half of that definition).
- **Cross-link**: KG lists no cross-links for this concept.

## Component 8 — Teaching Notes

- estimated_hours = 3 with a proficient/understand tag places this at the corpus's compact "2 main TAs + gate" tier — A01 (checking every codomain element via the arrow diagram) and A02 (range-vs-codomain plus independence from injectivity) jointly cover all three LOs, appropriate for a narrowly-scoped single-property definition.
- MC-1 (surjective conflated with injective) was deliberately given the most weight (both A01's hook and the entirety of A02 Contrast 2), because when injectivity and surjectivity are taught close together in a course sequence (as the KG's own unlock structure — this concept feeding directly into `math.func.bijection`, which requires BOTH — suggests they typically are), conflating the two is the single most common and persistent error, and Example 3's clean surjective-but-not-injective case was chosen specifically because it cannot be resolved by any shortcut other than genuinely checking both properties separately.
- The employee-assignment transfer probe's part (b) — adding an empty team retroactively breaks surjectivity — was deliberately designed to test the CODOMAIN-not-fixed-in-advance subtlety: surjectivity is a property of the SPECIFIC codomain set stated, and changing that set (even without touching the function's actual rule) can change whether the same rule counts as surjective.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.func.function-concept`) |
| V-4 | unlocks concepts named accurately from KG | PASS |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (empty in KG → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A03) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.8×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Pictorial: arrow diagram before quantifier statement) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
