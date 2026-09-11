# math.disc.pigeonhole — Pigeonhole Principle

## Identity
- **KG ID:** `math.disc.pigeonhole`
- **Domain:** math.disc (Discrete Mathematics)
- **Requires:** `math.disc.counting-principles`
- **Unlocks:** (none in KG)
- **Cross-links:** (none)
- **Difficulty:** proficient
- **Bloom level:** apply
- **Mastery threshold:** 0.9 (MAMR 5/5)
- **Estimated hours:** 3

## Learning Objective
By the end of this concept, the student can: (1) state and apply the pigeonhole principle in its basic form ($n+1$ objects in $n$ holes $\Rightarrow$ some hole has $\ge 2$) and its generalized form ($m$ objects in $n$ holes $\Rightarrow$ some hole has $\ge\lceil m/n\rceil$); (2) set up the "pigeons" and "holes" correctly for a given problem by identifying the objects and the categories, including creatively-defined categories (remainder classes, intervals, parity classes); (3) apply the principle to number theory, combinatorics, and geometric problems, and recognize that the principle is NON-CONSTRUCTIVE — it guarantees existence without identifying the specific collision.

## Core Understanding
The pigeonhole principle, in its basic form, states: if $n+1$ or more objects are placed into $n$ boxes, at least one box contains 2 or more objects. The generalized form strengthens this: if $m$ objects are distributed among $n$ boxes, at least one box contains at least $\lceil m/n\rceil$ objects — proved by contradiction: if every box had fewer than $\lceil m/n\rceil$ objects, the total would be strictly less than $n\cdot\lceil m/n\rceil \ge m$, a contradiction.

Applying the principle to any specific problem requires two separate steps: IDENTIFY what the objects are (the pigeons) and what the categories are (the holes), then COUNT to confirm objects outnumber holes appropriately. The genuine skill the principle demands is not the counting step, which is mechanical once the setup is chosen — it is the CREATIVE choice of holes. In the standard birthday problem, holes are obviously the 365 possible birthdays. But in less obvious applications — proving two integers share a remainder mod $k$, proving two lattice points share a parity class, proving two real numbers in an interval are close together — the holes must be actively CONSTRUCTED (remainder classes, parity classes, subintervals) rather than read directly off the problem statement.

The principle is fundamentally NON-CONSTRUCTIVE: once the argument concludes "some hole has $\ge 2$ pigeons" (or $\ge\lceil m/n\rceil$), the proof is complete — nothing more needs to be shown, and in particular the argument does NOT identify WHICH hole contains the collision or which specific objects collide. This is a genuine and sometimes counter-intuitive feature: the principle proves existence without providing a method to locate the guaranteed collision.

## Mental Models
1. **Rung 1 — more objects than categories forces a collision.** The bare arithmetic fact: $m$ objects, $n$ categories, $m>n$ (or more precisely $m > n(k-1)$ for the generalized threshold $k$) guarantees some category holds more than one object.
2. **Rung 2 — the creativity is in choosing the holes, not in the counting.** Once pigeons and holes are correctly identified, "$m>n\Rightarrow$ collision" is automatic; the actual mathematical work is often designing which categorization to use.
3. **Rung 3 — the bound is a floor, not an exact value.** $\lceil m/n\rceil$ is the GUARANTEED MINIMUM for the fullest hole — the actual maximum could be much larger; the principle says nothing about the exact distribution.
4. **Rung 4 — existence without location.** The conclusion "a collision exists" is the full content of the proof; asking "which hole/which objects?" is asking a question the principle cannot by itself answer.

## Why Students Fail
The principle is nearly always taught with its formal statement first, followed by examples where the pigeons and holes are already obvious from the problem's surface wording — so students learn to recognize the "$n+1$ into $n$" arithmetic pattern without developing the META-SKILL of actively choosing non-obvious categories for a problem that does not hand them the holes directly. Separately, the notation $\lceil m/n\rceil$, written as a single computed value, invites treating it as an exact answer rather than a lower bound — the "$\ge$" in the principle's statement is easy to read past when the immediate task is "compute the number." Finally, having seen the principle applied to problems where the specific colliding pair is obvious once the collision is known to exist, students often assume the argument itself locates the collision, which it structurally cannot do.

## Misconceptions

### MC-1: PIGEONHOLE-IS-A-FORMULA-NOT-AN-ARGUMENT
- **Birth type:** Type 5 (instruction-induced) — foundational
- **Description:** The student memorizes "$n+1$ into $n$ gives $\ge2$ in one hole" as a formula and applies it mechanically without identifying the pigeons and holes, failing on non-obvious problems where the objects and categories require creative definition.
- **Why this birth type:** Instruction-induced: the principle is conventionally stated formally first, then illustrated with examples where the categorization is already given by the problem's surface wording (birthdays, cards, colors) — so the student practices recognizing the arithmetic pattern but is never explicitly required to construct a non-obvious categorization from scratch until confronted with one, by which point the "formula-application" habit is already entrenched.
- **Detection probe:** "Among any 5 lattice points in the plane, prove two have a midpoint with integer coordinates." A student with MC-1 either cannot begin (no obvious "holes" are visible in the problem statement) or attempts to treat the 5 points themselves as pigeons with no corresponding holes defined.
- **Repair:** State explicitly, as a fixed two-step procedure applied EVERY time: (1) identify the pigeons (what you have many of), (2) actively CONSTRUCT the holes (what categories could each pigeon be sorted into, such that the problem's target property corresponds to two pigeons sharing a hole). For the lattice-point problem: holes are the 4 parity classes of $(x\bmod 2, y\bmod 2)$ — not the points themselves.
- **Verification of death:** Given a novel problem with no obviously-stated categories, the student's first move is to ask "what could I use as holes here?" rather than searching for a directly-applicable formula.

### MC-2: PIGEONHOLE-GUARANTEES-THE-MAXIMUM
- **Birth type:** Type 4 (notation-induced) — moderate
- **Description:** The student thinks $\lceil m/n\rceil$ is an EXACT value for the maximum category size, not a lower bound — saying "some hole has EXACTLY $\lceil m/n\rceil$ objects" — and misses that the principle only guarantees AT LEAST $\lceil m/n\rceil$, with the actual maximum potentially much larger.
- **Why this birth type:** Notation-induced: $\lceil m/n\rceil$ is written and computed as a single numerical value, which visually and procedurally resembles computing "the answer" to a direct question, so the "$\ge$" qualifier attached to it in the principle's formal statement is easy to underweight compared to the concrete number just calculated.
- **Detection probe:** "13 people live in 4 cities. What is the maximum number of people in any one city?" A student with MC-2 answers "$\lceil 13/4\rceil=4$, exactly" rather than recognizing that one city could hold as many as 10.
- **Repair:** Present an explicit counterexample: 7 objects in 3 holes gives $\lceil 7/3\rceil=3$; the distribution $[5,1,1]$ satisfies the principle (max $=5\ge3$) while $[3,2,2]$ also satisfies it (max $=3=3$) — both are valid, and the principle only guarantees max $\ge3$, never an exact value, except in the special case where $m$ is divisible by $n$ and the uniform distribution is forced.
- **Verification of death:** Given a distribution problem, the student correctly states the guaranteed LOWER BOUND on the fullest category, while explicitly acknowledging the true maximum could be higher without further information.

### MC-3: THE-PRINCIPLE-FINDS-THE-COLLISION
- **Birth type:** Type 1 (overgeneralization) — moderate
- **Description:** The student believes the pigeonhole principle identifies WHICH objects share a category, or which hole is the full one, and attempts to use it to find a specific example rather than just prove one exists.
- **Why this birth type:** An overgeneralization from examples where the collision, once known to exist, happens to be easy to point to (e.g. in a small birthday-problem instance) — the student assumes this transparency generalizes to every application, including genuinely non-constructive ones (Dirichlet's approximation theorem, existence of two points at integer distance) where the specific colliding pair is not determined by the proof at all.
- **Detection probe:** "By pigeonhole, among any 366 people, two share a birthday. Which two people share it?" A student with MC-3 attempts to answer this question directly from the pigeonhole argument itself, rather than recognizing the argument cannot determine this.
- **Repair:** State explicitly, after every pigeonhole conclusion: "the argument stops here — we have proven existence, and the proof itself gives no method for locating the specific collision." Contrast a case where the collision happens to be findable by OTHER means (e.g. direct search in a small instance) against a genuinely non-constructive application where no such alternative exists.
- **Verification of death:** After completing a pigeonhole argument, the student states the conclusion (existence) and explicitly declines to attempt to identify the specific collision unless a separate method is available.

## Analogies
1. **The overbooked-flights analogy.** If an airline sells more tickets than seats on a plane, SOME seat must be double-booked — but knowing this doesn't tell you WHICH seat, only that at least one collision is guaranteed.
2. **The mailbox-and-letters analogy.** If more letters arrive than there are mailboxes, some mailbox must receive more than one letter — the creative work is deciding how to sort the letters into mailboxes (the holes), not the trivial observation that a collision must occur once the sorting is fixed.

## Demonstrations
### Demonstration 1 — basic and generalized forms (mirrors Blueprint's A01 worked examples)
Basic: 366 people $\Rightarrow$ at least 2 share a birthday (365 possible birthdays as holes). Generalized: among 6 integers, two have the same remainder mod 5 (5 remainder classes as holes; $6>5$).

### Demonstration 2 — creatively-chosen holes, breaking MC-1 (mirrors Blueprint's lattice-point example)
Among any 5 lattice points in the plane, two have a midpoint with integer coordinates. Define each point's parity class as $(x\bmod 2, y\bmod 2)$ — 4 possible classes. With 5 points and 4 classes, two points share a class; their coordinate sum is even in both components, so their midpoint has integer coordinates.

### Demonstration 3 — the bound is a floor, not an exact value, breaking MC-2 (mirrors Blueprint's TB-R02)
7 objects distributed among 3 holes: $\lceil 7/3\rceil=3$. Distribution $[5,1,1]$ satisfies the principle (max $=5\ge3$); distribution $[3,2,2]$ also satisfies it (max $=3=3$). Only when $m$ is a multiple of $n$ does the uniform distribution force the bound to be exact.

## Discovery Questions
1. "If you're told two of any 5 lattice points share a midpoint with integer coordinates, but the problem gives you no obvious categories to sort the points into, what property of a point's coordinates might make a useful category?"
2. "If 13 people live in 4 cities, is it POSSIBLE for the fullest city to have more than $\lceil 13/4\rceil=4$ people? Is it GUARANTEED?"
3. "Once you've shown that some hole must contain $\ge2$ pigeons, have you shown WHICH hole? What would it take to answer that second question — is it always possible?"

## Teaching Sequence
Best taught by **direct instruction of the basic/generalized statements, then guided discovery of the hole-construction skill** — the arithmetic form of the principle is a short, easily-stated fact best presented directly, but the genuine skill (constructing non-obvious holes) is best developed by working through increasingly less-obvious examples where the student is pushed to propose their own categorization before being shown one.
1. State the basic and generalized forms directly (Demonstration 1), applying to an obvious-holes example (birthdays, remainders).
2. Pose Discovery Question 1 and let the student attempt to propose a categorization for the lattice-point problem before revealing the parity-class answer (Demonstration 2).
3. Pose Discovery Question 2, then work Demonstration 3 to correct any "exact value" assumption.
4. Pose Discovery Question 3 to consolidate the non-constructive nature of the principle (targeting MC-3).
5. Assess with the P77 problem set and transfer probe.

## Tutor Actions
1. **On a novel problem with no stated categories:** always ask "what could you use as the pigeons? What could you use as the holes?" as the FIRST question, before any counting.
2. **On a computed $\lceil m/n\rceil$ value:** ask "is this the EXACT maximum, or a guaranteed MINIMUM for the maximum?" to surface MC-2 before it propagates into a later error.
3. **On a "which objects collide?" question following a pigeonhole conclusion:** state plainly that the argument as given cannot answer this, and that answering it (if possible at all) would require additional information or a separate method.
4. **On a creative-holes success:** explicitly praise and name the categorization chosen (e.g. "using parity classes as holes was the key insight here") to reinforce that this is the transferable skill, not the arithmetic.

## Voice Teaching Notes
1. **Register:** puzzle-solving and investigative — pigeonhole problems often feel like small mysteries, and framing them that way supports the creative-categorization skill this concept targets.
2. **Load-bearing sentence, spoken slowly:** "The hard part isn't the counting — it's choosing what counts as a 'hole.'"
3. **Wait time:** pause deliberately after posing a problem with non-obvious holes, giving genuine space for the student to propose (and possibly revise) a categorization before any hint is offered.

## Assessment Signals
1. **Gate concept:** correctly applies the basic pigeonhole principle to a problem with directly-stated categories.
2. **Creative categorization:** proposes a non-obvious hole construction (remainder class, parity class, interval) for a problem that does not state categories directly.
3. **Bound-vs-exact distinction:** correctly identifies $\lceil m/n\rceil$ as a guaranteed lower bound, not an exact maximum, when asked.
4. **Non-constructive recognition:** after completing a pigeonhole argument, correctly states that the specific collision is not identified by the argument itself.
5. **Transfer:** applies the principle in a genuinely novel domain (e.g. Dirichlet's approximation or a geometric packing argument) with correctly-constructed holes.

## Tutor Recovery Strategy
If the student consistently cannot propose holes for a non-obvious problem, do not simply supply the categorization — ask a sequence of narrowing questions ("what property of each object could two different objects share?", "is there a natural finite set of values that property could take?") until the student arrives at the construction themselves, since the transferable skill is the SEARCH process, not any single memorized example. If the student conflates the bound with an exact value, work through the explicit counterexample (Demonstration 3) live rather than merely restating the distinction.

## Memory Hooks
1. "Pigeons = objects, holes = categories — the creativity is in choosing the holes."
2. "$\lceil m/n\rceil$ is a guaranteed MINIMUM for the fullest hole, not the exact answer."
3. "The principle proves existence — it never tells you which hole is full."

## Transfer Connections
- **`math.disc.counting-principles`:** the basic counting framework (addition/multiplication principles) this concept's arithmetic argument relies on.
- **`math.disc.combinatorics`:** the broader field this concept's non-obvious-categorization skill exemplifies as a genuinely independent counting/existence technique.
- **`math.disc.inclusion-exclusion`:** a sibling existence/counting technique addressing a structurally different problem shape (correcting for overcounting rather than forcing a collision).

## Cross-Subject Connections
- **Number theory (Dirichlet's approximation theorem):** a canonical non-constructive application, proving that good rational approximations to any real number exist without constructing them directly.
- **Computer Science (hashing/collision analysis):** the pigeonhole principle underlies the guarantee that a hash function mapping more inputs than available output slots must produce collisions.

## Blueprint References
- Primary source: `docs/curriculum/blueprints/math.disc.pigeonhole.md` — reused by reference throughout (Learning Objective, worked examples, misconception inventory MC-1–MC-3 with birth types already assigned in the Blueprint itself and confirmed independently here, transfer probe). Not restated verbatim; this entry adds the mental-model ladder, analogies, discovery-vs-direct-instruction argument, voice teaching notes, and cross-subject connections per `EDUCATIONAL_BRAIN_STANDARD.md`'s ownership boundary.

## Runtime Asset References
- No AssetIdentity rows exist for this concept yet (Layer 3/7 DB-backed assets are populated separately, by live LLM generation plus admin review or by deliberate seed-script batches — never by this authoring layer). This entry is Layer 1/2 content only.

## Curriculum Feedback
- No genuine Blueprint/KG metadata discrepancy found — requires, unlocks, cross_links, difficulty, bloom, mastery_threshold, and estimated_hours all match the live KG exactly.
- This Blueprint is notable among this program's math.disc sources for already assigning birth-type classifications to each misconception (Type 5, Type 4, Type 1 respectively) — independently confirmed and adopted directly in this entry, rather than re-derived from scratch, since the Blueprint's own reasoning matches this program's own taxonomy exactly.
- No genuine content-overlap was found with sibling entries — this concept's non-obvious-categorization skill is distinct from `math.disc.inclusion-exclusion`'s overcounting-correction technique, though both are cross-referenced as sibling existence/counting arguments.

## Version History
- **Batch 19** (2026-09-11): initial authoring, part 2 of 5 this batch (with `math.disc.combinatorics`, `math.disc.stars-bars`, `math.disc.inclusion-exclusion`, `math.disc.binomial-theorem`). Blueprint reused by reference, including its own already-assigned birth-type classifications (MC-1 Type 5 foundational, MC-2 Type 4 moderate, MC-3 Type 1 moderate), independently confirmed.
