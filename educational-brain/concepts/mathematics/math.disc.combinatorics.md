# math.disc.combinatorics — Combinatorics

## Identity
- **KG ID:** `math.disc.combinatorics`
- **Domain:** math.disc (Discrete Mathematics)
- **Requires:** `math.disc.combinations`
- **Unlocks:** `math.disc.generating-functions`
- **Cross-links:** (none)
- **Difficulty:** proficient
- **Bloom level:** apply
- **Mastery threshold:** 0.85 (MAMR 5/5)
- **Estimated hours:** 5

## Learning Objective
By the end of this concept, the student can: (1) apply BIJECTIVE counting — establishing a one-to-one correspondence between a hard-to-count set and an easy-to-count one — on a problem that does not superficially resemble `math.disc.combinations`'s own $\binom{n}{r}$ setup; (2) apply RECURSIVE counting — expressing the count for a size-$n$ problem in terms of counts for smaller sizes — and recognize that a valid recurrence is itself a complete answer, even without a closed-form formula; (3) at orientation level, recognize generating functions as a technique encoding an entire counting sequence into one algebraic object, and recognize this concept's own three named children — stars-and-bars, the pigeonhole principle, and inclusion-exclusion — as dedicated further counting techniques surveyed here but not developed.

## Core Understanding
Combinatorics is the whole FIELD of counting techniques, not a synonym for the permutations and combinations formulas already mastered in `math.disc.combinations`. This concept surveys two genuinely general further techniques and previews three more.

BIJECTIVE COUNTING proves two sets have the same size by exhibiting a one-to-one correspondence between them, without directly enumerating the harder set. If a counting problem does not obviously match $\binom{n}{r}$ or $P(n,r)$'s setup, the productive move is to look for a bijection to some OTHER set whose size is already known or easier to determine — for example, mapping each subset of a 5-element set onto a unique length-5 binary string (bit $i=1$ if element $i$ is included), proving there are exactly $2^5=32$ subsets without listing them.

RECURSIVE COUNTING expresses the count for size $n$ in terms of counts for smaller sizes, typically by reasoning about what happens at a "last step" (the last digit, the last item placed). A correctly-derived recurrence relation is a COMPLETE and valid solution to "how many" — it does not need to be converted into a closed-form formula to count as a genuine answer, even though a closed form may sometimes be found later through separate algebraic work (often via generating functions).

GENERATING FUNCTIONS, at orientation level, encode an entire counting sequence $a_0,a_1,a_2,\ldots$ as the coefficients of one power series $A(x)=\sum a_n x^n$; algebraic manipulation of this single object can extract closed forms or relationships among the $a_n$ that would be difficult to find by direct combinatorial reasoning. This concept's own three named children each target a distinct counting-problem SHAPE: stars-and-bars (distributing identical items into distinct bins), the pigeonhole principle (guaranteeing a collision when items outnumber categories), and inclusion-exclusion (correcting for overcounting in a union of overlapping sets) — each surveyed here by name only, developed in its own dedicated concept.

## Mental Models
1. **Rung 1 — a bijection proves equal size without counting either side directly.** If every element of set $A$ corresponds to exactly one element of set $B$ and vice versa, $|A|=|B|$ — a purely structural argument.
2. **Rung 2 — a recurrence is a complete answer, built from smaller already-solved cases.** "How many for size $n$, given how many for smaller sizes" is a legitimate final form of "how many," not a placeholder awaiting a closed form.
3. **Rung 3 — combinatorics is a toolbox, not a single tool.** $\binom{n}{r}$ and $P(n,r)$ are two specific formulas within a much broader field encompassing bijection, recursion, generating functions, and the further named techniques this concept previews.
4. **Rung 4 — a generating function packages an infinite sequence into one algebraic object.** Manipulating that one object algebraically can answer questions about the whole sequence at once, a technique this concept names but defers to `math.disc.generating-functions`.

## Why Students Fail
Having just mastered two specific, powerful formulas in `math.disc.combinations`, students naturally over-rely on them, treating every counting problem as either "matches $\binom{n}{r}$/$P(n,r)$" or "must be enumerated by hand" — missing bijection as a genuinely independent technique that applies precisely when neither of those options is available. Separately, students accustomed to earlier algebra where a "solution" always means a closed formula tend to treat an unresolved recurrence as incomplete, not recognizing that the recurrence relation itself IS the mathematical content being sought.

## Misconceptions

### MC-1: COUNTING-LIMITED-TO-FORMULAS-OR-ENUMERATION
- **Birth type:** Type 1 (overgeneralization) — foundational
- **Description:** Believing every counting problem must be solved by direct enumeration or matching a memorized permutations/combinations formula, missing bijection as a general, independent technique.
- **Why this birth type:** An overgeneralization of the two techniques most recently and thoroughly practiced (`math.disc.combinations`'s formulas plus brute-force listing), applied as if they were the ENTIRE space of counting methods rather than two tools among several — the student has not yet encountered a problem type where bijection is the only tractable route.
- **Detection probe:** "Can every counting problem be solved by directly enumerating or by matching a memorized permutations/combinations formula?" A student with MC-1 answers "yes."
- **Repair:** Walk the subset-to-binary-string bijection (Demonstration 1) explicitly, then pose a genuinely novel problem where neither direct enumeration nor $\binom{n}{r}$/$P(n,r)$ applies cleanly, and guide the student toward searching for a correspondence to an already-countable set.
- **Verification of death:** Given a novel counting problem with no obvious formula match, the student's first instinct is to search for a bijection rather than attempting brute-force enumeration.

### MC-2: RECURRENCE-TREATED-AS-INCOMPLETE
- **Birth type:** Type 1 (overgeneralization) — high
- **Description:** Believing a valid recurrence relation is only a partial or placeholder answer until converted to a closed form, missing that a correctly-derived recurrence is itself a complete solution.
- **Why this birth type:** An overgeneralization of the expectation, built up across most of a student's prior algebra experience, that "solving" a problem always means producing a single closed-form expression — a reasonable default that simply does not hold for every legitimate mathematical answer, recurrences included.
- **Detection probe:** "If you've derived a valid recurrence relation for a counting problem but haven't yet found a closed-form formula, have you actually solved the problem?" A student with MC-2 answers "no."
- **Repair:** Present the no-two-consecutive-1s recurrence (Demonstration 2), verify it numerically against direct enumeration, and state explicitly: a correctly-derived, verified recurrence IS the complete answer to "how many" — closed forms are a separate, optional further achievement.
- **Verification of death:** Given a counting problem amenable to recursive reasoning, the student derives and states a recurrence relation as a confident final answer, without treating it as unfinished.

### MC-3: COMBINATORICS-CONFLATED-WITH-ITS-TWO-FORMULAS
- **Birth type:** Type 1 (overgeneralization) — moderate
- **Description:** Treating "combinatorics" as a synonym for permutations and combinations specifically, missing the much broader field of bijections, recursion, generating functions, and further named techniques.
- **Why this birth type:** An overgeneralization of naming convention — since `math.disc.combinations` was the student's first and most memorable encounter with the WORD "combinatorics"-adjacent content, the specific formulas learned there get mentally identified with the entire field's name.
- **Detection probe:** "Is 'combinatorics' just another name for the permutations and combinations formulas you already know?" A student with MC-3 answers "yes."
- **Repair:** Present the survey in Demonstration 3 — bijection, recursion, generating functions, stars-and-bars, pigeonhole, inclusion-exclusion — explicitly naming each as a distinct technique within the broader field, making clear that $\binom{n}{r}$ and $P(n,r)$ are two specific tools among many.
- **Verification of death:** When asked to define combinatorics, the student describes it as the broad field of counting techniques rather than naming only permutations and combinations.

## Analogies
1. **The toolbox analogy.** `math.disc.combinations` handed the student two specific tools (a wrench and a screwdriver); combinatorics is the entire toolbox, containing many more tools (bijection, recursion, generating functions) each suited to different jobs.
2. **The "prove equal without counting either" analogy.** A bijection is like proving two rooms hold the same number of people by pairing each person in room A with exactly one person in room B, with nobody left over on either side — no headcount in either room is ever taken.

## Demonstrations
### Demonstration 1 — bijection to binary strings, breaking MC-1 (mirrors Blueprint Ex1)
How many subsets does a 5-element set have? Biject each subset onto a length-5 binary string (bit $i=1$ if element $i$ is included). There are $2^5=32$ such strings, so there are $32$ subsets — determined via bijection, without direct enumeration.

### Demonstration 2 — a recurrence relation as a complete answer, breaking MC-2 (mirrors Blueprint Ex2)
Let $a_n$ count length-$n$ binary strings with no two consecutive 1s. A valid string starting with 0 leaves $a_{n-1}$ ways for the rest; starting with 1 forces the next digit to 0, leaving $a_{n-2}$ ways for the remainder. So $a_n=a_{n-1}+a_{n-2}$, with $a_1=2$, $a_2=3$. Computing $a_3=a_2+a_1=5$: verified by direct listing ($000,001,010,100,101$) — exactly 5. The recurrence is itself a complete, valid answer.

### Demonstration 3 — generating functions and the named children survey (mirrors Blueprint Ex3)
The sequence $a_n$ from Demonstration 2 has a generating function $A(x)=\sum a_n x^n$ that can be manipulated (a technique developed elsewhere) to extract a closed form related to the Fibonacci numbers. Separately, this concept names its three dedicated children: stars-and-bars (e.g. distributing 10 identical candies among 4 children), the pigeonhole principle (e.g. among 13 people, two must share a birth month), and inclusion-exclusion (e.g. counting numbers up to 100 divisible by 2 or 3, correcting for double-counted multiples of 6).

## Discovery Questions
1. "If you can pair every element of a set you're trying to count with exactly one element of a set whose size you already know, what does that tell you about the size of the set you're trying to count?"
2. "If deriving a recurrence relation like $a_n=a_{n-1}+a_{n-2}$ already lets you compute $a_n$ for any specific $n$ you want, what more would a closed-form formula actually add?"
3. "You've now met $\binom{n}{r}$, $P(n,r)$, bijection, and recursion. Based on how differently each one works, does 'combinatorics' sound like one formula or a whole field of techniques?"

## Teaching Sequence
Best taught by **direct instruction of the bijection and recursion techniques with an embedded discovery moment**, not open-ended discovery for the whole concept — bijective and recursive reasoning are genuinely transferable skills best demonstrated on a clear worked example first, but the "is a recurrence complete?" question (Discovery Question 2) is worth letting the student reason through before being told the answer.
1. Work Demonstration 1's bijection directly, stating the general principle: look for a correspondence to an easy-to-count set.
2. Work Demonstration 2's recurrence derivation, then pose Discovery Question 2 before confirming that the recurrence is already a complete answer.
3. Survey generating functions and the three named children (Demonstration 3) at orientation level only — name each, describe its problem shape, do not develop any.
4. Pose Discovery Question 3 to consolidate the "field, not formula" reframing (targeting MC-3).
5. Assess with the P77 problem set and transfer probe.

## Tutor Actions
1. **On a counting problem with no obvious formula match:** prompt "can you find a correspondence between this set and something easier to count?" before allowing brute-force enumeration as a fallback.
2. **On a derived recurrence:** explicitly confirm it as a complete answer before moving on, rather than implicitly treating it as an intermediate step toward a closed form.
3. **On the generating-functions/named-children survey:** keep strictly at orientation level — name and describe the problem shape each technique targets, but do not attempt to develop stars-and-bars, pigeonhole, or inclusion-exclusion content here (their own dedicated concepts own that).
4. **On "what is combinatorics?":** always answer with the broad-field framing, never reducing it to $\binom{n}{r}$/$P(n,r)$.

## Voice Teaching Notes
1. **Register:** exploratory and toolbox-expanding — this concept's job is to widen the student's sense of what counting even means, so curiosity-inviting language fits better than drill-oriented precision.
2. **Load-bearing sentence, spoken slowly:** "A correctly-derived recurrence relation is a complete answer — it doesn't need to become a formula to count as solved."
3. **Wait time:** pause after posing Discovery Question 1 (the bijection question) before revealing Demonstration 1's specific mapping, letting the student attempt their own correspondence first.

## Assessment Signals
1. **Gate concept:** given a novel counting problem without an obvious formula match, attempts a bijective argument rather than defaulting to enumeration.
2. **Recurrence confidence:** derives a recurrence relation for a novel counting problem and states it as a complete answer without hedging.
3. **Field-vs-formula distinction:** correctly defines combinatorics as the broad field of counting techniques, not as a synonym for permutations/combinations.
4. **Survey recall:** names all three previewed children (stars-and-bars, pigeonhole, inclusion-exclusion) and briefly states the problem shape each addresses.
5. **Transfer:** applies bijective and recursive reasoning together in a novel context (e.g. a symbol-based password-counting problem).

## Tutor Recovery Strategy
If the student defaults to enumeration on every problem, do not simply supply the bijection — ask "what easy-to-count set could this correspond to?" and let several candidate mappings be tried before confirming or correcting. If the student keeps calling a recurrence "unfinished," have them use the recurrence to actually COMPUTE a specific value (as in Demonstration 2's $a_3=5$) and verify it against direct enumeration — the lived success of the recurrence answering a concrete question is more convincing than a restated rule.

## Memory Hooks
1. "Can't match a formula? Look for a bijection to something you CAN count."
2. "A verified recurrence is a complete answer — no closed form required."
3. "Combinatorics is the whole toolbox, not just $\binom{n}{r}$ and $P(n,r)$."

## Transfer Connections
- **`math.disc.combinations`:** the specific $\binom{n}{r}$ formula and order-matters distinction this concept's bijections build beyond.
- **`math.disc.generating-functions`:** develops the technique this concept previews at orientation level.
- **`math.disc.stars-bars`, `math.disc.pigeonhole`, `math.disc.inclusion-exclusion`:** the three dedicated further techniques named, not developed, here.

## Cross-Subject Connections
- **Computer Science (algorithm analysis):** recursive counting arguments directly parallel the recurrence relations used to analyze recursive algorithms' running time.
- **Biology (population/genetics counting):** bijective arguments are commonly used to count genetic sequence possibilities or population configurations without direct enumeration.

## Blueprint References
- Primary source: `docs/curriculum/blueprints/math.disc.combinatorics.md` — reused by reference throughout (Learning Objectives, worked examples Ex1–Ex3, misconception inventory MC-1–MC-3, transfer probe P76). Not restated verbatim; this entry adds birth-type classification, mental-model ladder, analogies, discovery-vs-direct-instruction argument, voice teaching notes, and cross-subject connections per `EDUCATIONAL_BRAIN_STANDARD.md`'s ownership boundary.

## Runtime Asset References
- No AssetIdentity rows exist for this concept yet (Layer 3/7 DB-backed assets are populated separately, by live LLM generation plus admin review or by deliberate seed-script batches — never by this authoring layer). This entry is Layer 1/2 content only.

## Curriculum Feedback
- No genuine Blueprint/KG metadata discrepancy found — requires, unlocks, cross_links, difficulty, bloom, mastery_threshold, and estimated_hours all match the live KG exactly.
- No genuine content-overlap was found with sibling entries — this concept deliberately surveys bijection and recursion on problems distinct from `math.disc.combinations`'s own examples, and names (without developing) its three children, whose own entries (authored later this batch) develop that content independently.
- This entry is the first authored concept in this program's continuation of `math.disc` as a standalone domain campaign (following math.alg's certification in Batch 18) — its unlocked child `math.disc.generating-functions` is not yet authored.

## Version History
- **Batch 19** (2026-09-11): initial authoring, part 1 of 5 this batch (with `math.disc.pigeonhole`, `math.disc.stars-bars`, `math.disc.inclusion-exclusion`, `math.disc.binomial-theorem`). Blueprint reused by reference; 3 misconceptions birth-type classified (MC-1 Type 1 foundational, MC-2 Type 1 high, MC-3 Type 1 moderate).
