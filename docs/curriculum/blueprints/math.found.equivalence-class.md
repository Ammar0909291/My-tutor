# Teaching Blueprint: Equivalence Class (`math.found.equivalence-class`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.found.equivalence-class` |
| name | Equivalence Class |
| domain | Foundations |
| difficulty | developing |
| bloom | understand |
| mastery_threshold | 0.8 → MAMR = ⌈0.8×5⌉ = 4/5 |
| estimated_hours | 3 |
| requires | `math.found.equivalence-relation` |
| unlocks | `math.nt.congruence`, `math.abst.quotient-group` |
| cross_links | `math.abst.quotient-group` |
| CPA_entry_stage | C (Concrete) — computing a specific equivalence class before the general definition | 
| description (KG) | The equivalence class [a] of an element a is the set of all elements related to a under the equivalence relation. |

## Component 1 — Learning Objectives

- LO1: Define the **equivalence class** $[a]=\{x\in A : x\sim a\}$ for an equivalence relation $\sim$ on $A$, compute a specific class directly, and recognize $a\in[a]$ ALWAYS (guaranteed by reflexivity — `math.found.equivalence-relation`'s own first required property).
- LO2: State and apply the criterion $[a]=[b]$ **iff** $a\sim b$ — directly parallel to `math.abst.coset`'s own equality criterion — recognizing that two DIFFERENT elements can generate the identical class (as SETS), and that $[a]=[b]$ never requires $a=b$ literally.
- LO3: Recognize that every element of $A$ belongs to exactly one DISTINCT equivalence class, and that the collection of distinct classes forms a genuine partition of $A$ per `math.found.partition`'s own three-condition definition — correctly distinguishing "distinct classes" from "distinct representative names" (a single class can be named by several different representative elements).

## Component 2 — Prerequisite Check

Assumes mastery of `math.found.equivalence-relation` (reflexive + symmetric + transitive combined; the Partition Theorem in both directions; classes are always identical or disjoint, never partial).

## Component 3 — Core Explanation

**The class as "everything related to $a$," always containing $a$ itself**: for an equivalence relation $\sim$ on $A$, the equivalence class $[a]=\{x\in A : x\sim a\}$ collects every element related to $a$. Since $\sim$ is reflexive, $a\sim a$ always holds — so $a\in[a]$ is guaranteed for every $a$, with no exceptions.

**Same class, different names — the criterion $[a]=[b]$ iff $a\sim b$**: two elements $a$ and $b$ generate the IDENTICAL class (as sets) exactly when $a\sim b$ — this is a direct, checkable criterion, exactly parallel to `math.abst.coset`'s own coset-equality test. Critically, $[a]=[b]$ does NOT require $a=b$: two genuinely different elements can be related to each other, in which case their classes are literally the SAME set, just reachable via two different "representative" names.

**Distinct classes partition $A$**: while every element $a$ generates its own class $[a]$, many different elements can generate the SAME class (whenever they are all related to each other). The collection of genuinely DISTINCT classes — after collapsing duplicates named by different representatives — satisfies `math.found.partition`'s three conditions exactly (nonempty, pairwise disjoint, union equals $A$), directly cashing out `math.found.equivalence-relation`'s own Partition Theorem.

## Component 4 — Worked Examples

**Example 1 (LO1 — computing a class directly, breaking MC-1)**: For "same parity" on $A=\{1,2,3,4\}$ (`math.found.equivalence-relation`'s own Example 1 relation): $[1]=\{x\in A : x\text{ has the same parity as }1\}=\{1,3\}$ (both odd). Note $1\in[1]$ directly, since $1\sim1$ by reflexivity.

**Example 2 (LO2 — $[a]=[b]$ iff $a\sim b$, breaking MC-2)**: Compute $[3]=\{x : x\sim3\}=\{1,3\}$ — IDENTICAL to $[1]$ from Example 1. Checking the criterion: $[1]=[3]$ iff $1\sim3$ — TRUE (both odd). So $[1]$ and $[3]$ are literally the SAME set, not two different classes that happen to share members — one single class, reachable via either representative name.

**Example 3 (LO3 — distinct classes partition A, different representatives name the same class, breaking MC-3)**: Listing every element's class for the same relation on $\{1,2,3,4\}$: $[1]=\{1,3\}$, $[2]=\{2,4\}$, $[3]=\{1,3\}=[1]$ (NOT a third distinct class), $[4]=\{2,4\}=[2]$ (NOT a fourth distinct class). So despite $4$ elements each generating "their own" named class, there are only $2$ genuinely DISTINCT classes: $\{1,3\}$ and $\{2,4\}$ — both nonempty, disjoint from each other, and their union is all of $\{1,2,3,4\}$, exactly satisfying `math.found.partition`'s three conditions.

## Component 5 — Teaching Actions

### Teaching Action A01 — Every Element Belongs to Its Own Class (Primitive P11: Representation Shift)

State: "$[a]$ collects everything related to $a$ — and since $a\sim a$ always, $a$ itself is guaranteed to be one of those elements." Work Example 1's direct computation.

- **MC-1 hook**: ask "is it possible for an element $a$ to NOT belong to its own equivalence class $[a]$?" — a "yes" answer reveals MC-1 (missing the guaranteed self-membership from reflexivity).

### Teaching Action A02 — Same Class, Different Representative Names (Primitive P28: Conflict Evidence)

Present Example 2's direct evidence: $[1]$ and $[3]$ are computed separately but turn out to be the IDENTICAL set. State: "$[a]=[b]$ means $a\sim b$ — never that $a$ and $b$ must be the same element. Different elements can name the exact same class."

- **MC-2 hook**: ask "does [a]=[b] require a and b to be the literal same element?" — a "yes" answer reveals MC-2 (missing that different, related elements can generate the identical class as a set).

### Teaching Action A03 — Distinct Classes, Not Distinct Names (Primitive P06: Contrast Pair)

Present Example 3's direct evidence: $4$ elements generate only $2$ genuinely distinct classes, since $[3]=[1]$ and $[4]=[2]$. State: "count the DISTINCT sets, not the number of elements you started with — several different representative names can all point to the same class."

- **MC-3 hook**: ask "if a set A has 4 elements, must an equivalence relation on A produce 4 distinct equivalence classes?" — a "yes" answer reveals MC-3 (missing that different elements can share the identical class, reducing the true count of distinct classes).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. For $A=\{1,2,3,4,5,6\}$ and $R=\{(a,b):a\equiv b\pmod3\}$, compute $[1]$ and $[4]$, and state whether they are equal.
  2. Using the same relation, list all genuinely distinct equivalence classes.
  3. Explain why $a\in[a]$ is guaranteed for any equivalence relation, citing the specific property responsible.
  4. Explain why the number of distinct equivalence classes can be smaller than $|A|$, using problem 2's result as an example.
- **P76 (Transfer Probe, mode = independence)**: "A university groups students by declaring two students 'equivalent' if they have the same major. (a) Describe, in words, what the equivalence class of a specific student named Alex represents in this context. (b) Explain why two different students, say Alex and Priya, could have the exact same equivalence class, and what condition on Alex and Priya would guarantee this. (c) If the university has 500 students but only 12 different majors, explain what this tells you about the number of DISTINCT equivalence classes, versus the number of students."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | SELF-MEMBERSHIP-IN-OWN-CLASS-DOUBTED | Believing an element might not belong to its own equivalence class, missing the guaranteed self-membership from reflexivity | Foundational |
| MC-2 | CLASS-EQUALITY-CONFUSED-WITH-ELEMENT-EQUALITY | Believing [a]=[b] requires a and b to be the literal same element, missing that different related elements can generate the identical class | Foundational |
| MC-3 | DISTINCT-CLASS-COUNT-ASSUMED-EQUAL-TO-ELEMENT-COUNT | Believing the number of distinct equivalence classes must equal the number of elements in A, missing that several elements can share the same class | Foundational |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Self-Membership in Own Class Doubted") → P41 (detect: ask a student whether an element always belongs to its own class, and check for a "no" or uncertain answer) → P64 (conceptual shift: re-walk Example 1's direct verification $1\in[1]$, re-anchoring on "reflexivity guarantees this every single time").
- **B02 (targets MC-2)**: P27 (name it: "Class Equality Confused with Element Equality") → P41 (detect: ask a student whether [a]=[b] requires a=b, and check for a "yes") → P64 (conceptual shift: re-walk Example 2's $[1]=[3]$ verification, re-anchoring on "the criterion is a~b, not a=b — the classes can coincide even when the elements are genuinely different").
- **B03 (targets MC-3)**: P27 (name it: "Distinct Class Count Assumed Equal to Element Count") → P41 (detect: ask a student how many distinct classes an equivalence relation on a 4-element set must produce, and check for an automatic "4") → P64 (conceptual shift: re-walk Example 3's full listing, showing only 2 genuinely distinct classes among 4 elements, re-anchoring on "count the distinct SETS, not the number of representative names").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.found.equivalence-relation` (the combined reflexive+symmetric+transitive property, and the Partition Theorem this concept's classes directly instantiate).
- **Unlocks**: `math.nt.congruence` (congruence classes mod $n$ are the canonical number-theoretic instance of equivalence classes), `math.abst.quotient-group` (builds a new group structure directly on the set of equivalence classes).
- **Cross-link**: KG lists `math.abst.quotient-group` as a cross-link — **not yet authored** (checked via `ls docs/curriculum/blueprints/` before setting P76_mode). $P76_{mode}=$ **independence**; a future revision may add a genuine cross-link transfer probe into quotient-group construction once that entry exists.

## Component 8 — Teaching Notes

- estimated_hours = 3 with a developing/understand tag places this at a "3 TAs + gate" tier, appropriately compact given the concept's small scope — one definition, one equality criterion, and one counting caution.
- All three worked examples deliberately reuse `math.found.equivalence-relation`'s own "same parity" relation on $\{1,2,3,4\}$, directly cashing out that concept's own informal partition discussion into this concept's precise class-by-class computation, rather than introducing a fresh relation.
- This concept's MC-2 and MC-3 are two faces of the same underlying insight (different elements can share a class) — deliberately split into two separate misconceptions since MC-2 addresses the equality CRITERION directly while MC-3 addresses its COUNTING consequence, a distinction worth teaching separately per this corpus's established practice of isolating one idea per misconception.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (math.abst.quotient-group unauthored → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.8×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Concrete: specific class computed before the general definition) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
