# Teaching Blueprint: Pigeonhole Principle (`math.disc.pigeonhole`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.disc.pigeonhole` |
| name | Pigeonhole Principle |
| domain | Discrete Mathematics |
| difficulty | proficient |
| bloom | apply |
| mastery_threshold | 0.90 → MAMR = ⌈0.90×5⌉ = 5/5 |
| estimated_hours | 3 |
| requires | `math.disc.counting-principles` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | P (Pictorial) — literal pigeon/hole diagrams before symbolic generalization |
| description (KG) | If n+1 objects are placed into n containers, at least one contains ≥2 objects. Generalized: at least one container has ≥⌈N/k⌉ objects. Used to prove existence of coincidences.

 |

## Component 1 — Learning Objectives

- LO1: State and apply the basic pigeonhole principle: placing $n+1$ objects into $n$ containers guarantees at least one container holds $\ge2$ objects.
- LO2: Apply the GENERALIZED pigeonhole principle: placing $N$ objects into $k$ containers guarantees at least one container holds $\ge\lceil N/k\rceil$ objects.
- LO3: Identify, in a word problem, WHAT plays the role of "objects" and WHAT plays the role of "containers" — the genuinely hard step in applying this principle, since neither is usually labeled explicitly.

## Component 2 — Prerequisite Check

Assumes mastery of `math.disc.counting-principles` (the basic counting reasoning this existence-proof technique builds on).

## Component 3 — Core Explanation

The **pigeonhole principle**, in its basic form, states: if $n+1$ objects (pigeons) are placed into $n$ containers (holes), at least one container must hold 2 or more objects — this is a pure counting/existence argument (no specific container is identified, only that SOME container must be overloaded), provable by contradiction (if every container held at most 1, the total would be at most $n$, contradicting $n+1$ objects placed).

The **generalized** version extends this: placing $N$ objects into $k$ containers guarantees at least one container holds $\ge\lceil N/k\rceil$ objects (the ceiling of the average) — because if every container held strictly fewer than $\lceil N/k\rceil$, the total would fall short of $N$.

This principle is an EXISTENCE tool — it proves that some coincidence or overload MUST occur, without identifying which specific container or object is involved.

## Component 4 — Worked Examples

**Example 1 (LO1 — the basic principle)**: In a group of 13 people, at least two must share a birth month (12 months = 12 containers, 13 people = 13 objects, $13>12$ guarantees a repeat by the basic pigeonhole principle).

**Example 2 (LO2 — the generalized principle, breaking MC-1)**: In a group of 100 people, how many must share a birth month (guaranteed)? Using the generalized principle: $N=100$ objects, $k=12$ containers, $\lceil100/12\rceil=\lceil8.33\rceil=9$ — at least one month has $\ge9$ people. A common error rounds DOWN instead of up ($\lfloor8.33\rfloor=8$), or simply divides without rounding at all, understating the guaranteed minimum — the CEILING (round up, even for a small remainder) is essential, since a fractional average of 8.33 people per container is impossible; the guaranteed overload must be a whole number at or above that average.

**Example 3 (LO3 — identifying objects and containers, breaking MC-2)**: "Prove that among any 5 points chosen inside a unit square, two must be within distance $\frac{\sqrt2}{2}$ of each other." Here the "objects" are the 5 chosen points, and the "containers" are 4 smaller sub-squares (dividing the unit square into a $2\times2$ grid of quarter-squares, each with diagonal exactly $\frac{\sqrt2}{2}$) — by the basic pigeonhole principle, 5 points into 4 sub-squares guarantees two points share a sub-square, and any two points within the same sub-square are at most that sub-square's diagonal apart. The genuinely hard step here is recognizing that "sub-squares" (not points, not distances) are the containers — a construction that must be actively DESIGNED, not read directly off the problem statement.

## Component 5 — Teaching Actions

### Teaching Action A01 — Objects and Containers, Basic Case (Primitive P11: Representation Shift)

Work Example 1 with a literal pigeon/hole diagram (13 dots distributed among 12 labeled boxes), showing physically that at least one box must end up with 2+ dots regardless of how the distribution is attempted.

### Teaching Action A02 — Generalized Principle Uses the CEILING of the Average (Primitive P06: Contrast Pair)

Work Example 2's correct ceiling-based computation against a flawed floor-based or unrounded one, showing the discrepancy (9 vs. 8) and why 9 is the TRUE guaranteed minimum. State the rule: "the generalized pigeonhole guarantee is always the CEILING of $N/k$ — round UP, even for a small fractional remainder, since a whole container can't hold a fractional number of objects."

- **MC-1 hook**: this contrast directly targets MC-1 (rounding the wrong direction).

### Teaching Action A03 — Designing the Containers Is the Hard Step (Primitive P64: Conceptual Shift)

Work Example 3 in full, emphasizing that the "containers" here (four sub-squares) are not given in the problem statement — they must be actively CONSTRUCTED as part of the solution strategy, a genuinely creative step distinct from applying the pigeonhole formula itself.

- **MC-2 hook**: present a pigeonhole word problem without an obvious container structure and check whether the student attempts to design one or gets stuck looking for pre-labeled "containers" (revealing MC-2: expecting objects and containers to be explicitly identified in the problem, rather than recognizing container-construction as an active problem-solving step).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.90×5⌉ = 5/5.

- **P77 (4-problem set)**:
  1. Prove that among any 8 people, at least two share the same day of the week they were born on.
  2. In a group of 50 students, using the generalized pigeonhole principle, find the minimum number guaranteed to share the same birth month.
  3. Prove that if 6 integers are chosen from $\{1,2,\ldots,10\}$, at least two must sum to 11 (hint: design pairs $\{1,10\},\{2,9\},\ldots$ as the 5 "containers").
  4. Explain, in one sentence, why the pigeonhole principle can prove a coincidence EXISTS without identifying which specific objects are involved.
- **P76 (Transfer Probe, mode = independence)**: "A network administrator has 500 devices that must each be assigned one of 24 available IP address ranges. (a) Using the generalized pigeonhole principle, determine the minimum number of devices guaranteed to share the SAME IP range. (b) A colleague designs a DIFFERENT container structure — grouping devices by which of 3 physical server racks they're connected to instead of by IP range — and asks whether the same pigeonhole reasoning still applies. Explain, using Example 3's container-design idea, what would need to be true about this rack-based grouping for the pigeonhole argument to still guarantee a meaningful overload."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | GENERALIZED-PIGEONHOLE-ROUNDED-DOWN | Using the floor (or no rounding) of $N/k$ instead of the ceiling, understating the guaranteed minimum overload | Foundational |
| MC-2 | CONTAINERS-EXPECTED-TO-BE-PRE-LABELED | Expecting a word problem to explicitly identify "objects" and "containers," rather than recognizing that designing an appropriate container structure is often the actual problem-solving task | Foundational |
| MC-3 | PIGEONHOLE-CONCLUSION-OVERSTATED-AS-IDENTIFYING-SPECIFICS | Believing the pigeonhole principle identifies WHICH specific objects/container is overloaded, rather than only guaranteeing that SOME overload exists | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Generalized Pigeonhole Rounded Down") → P41 (detect: present Example 2 and check whether $\lceil8.33\rceil$ is computed as 9 or left as 8) → P64 (conceptual shift: re-derive by contradiction — if every container held at most 8, the total would be at most $12\times8=96<100$, forcing at least one container to hold 9).
- **B02 (targets MC-2)**: P27 ("Containers Expected to Be Pre-Labeled") → P41 (detect: present Example 3's point-distance problem and check whether the student stalls looking for explicit containers) → P64 (conceptual shift: re-walk the sub-square construction explicitly as a deliberate DESIGN choice made to fit the problem's geometry, not something read off the statement).
- **B03 (targets MC-3)**: P27 ("Pigeonhole Conclusion Overstated") → P41 (detect: ask which specific two people share a birth month in Example 1's scenario) → P64 (conceptual shift: clarify that the principle guarantees existence of SOME coincidence, with no mechanism to identify which one — a genuinely different (and usually harder) further question).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.disc.counting-principles`.
- **Unlocks**: none recorded in the KG.
- **Related**: none declared.

## Component 8 — Teaching Notes

- estimated_hours = 3 and mastery_threshold = 0.90 reflect that the FORMULA itself is simple, but correct APPLICATION (especially container design, LO3) is a genuinely demanding skill this concept must build carefully.
- MC-2 was ranked most severe alongside MC-1 because it represents the primary barrier to actually using this principle in practice — most real pigeonhole problems require the solver to invent the container structure, and students who expect it pre-given will fail to apply the principle at all, not merely apply it incorrectly.
- The network/IP-range transfer probe's part (b) was deliberately designed to require evaluating an ALTERNATIVE container-design choice, directly testing whether LO3's container-design skill generalizes to genuinely novel structures rather than only the specific constructions practiced in the worked examples.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.disc.counting-principles`) |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
| V-5 | cross_links checked against disk | PASS (none declared) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.90×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Pictorial: pigeon/hole diagrams before symbols) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
