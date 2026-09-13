# math.func.rational-root

## Identity
- **KG ID**: `math.func.rational-root`
- **Domain**: math.func (Functions)
- **Requires**: `math.func.polynomial-function`, `math.alg.polynomial-roots`
- **Unlocks**: none listed in the KG
- **Cross-links**: none listed in the KG
- **Difficulty**: proficient
- **Bloom level**: analyze
- **Mastery threshold**: 0.75 (MAMR 4/5)
- **Estimated hours**: 4
- **CPA stage**: Concrete (an explicit factored polynomial expanded, then worked backwards — a candidate confirmed by synthetic division, showing how factors relate to the candidate list)

## Learning Objective
By the end of this concept, the learner can:
1. State the Rational Root Theorem: for a polynomial with integer coefficients, any rational root $p/q$ in lowest terms satisfies $p\mid a_0$ (the constant term) and $q\mid a_n$ (the leading coefficient).
2. Generate the complete list of candidate rational roots from a polynomial's constant term and leading coefficient.
3. Test candidates using synthetic or polynomial division.
4. Use confirmed roots to factor the polynomial and reduce its degree, repeating the process on the resulting quotient.
5. Correctly interpret a failed test of every candidate: no RATIONAL roots exist — irrational or complex roots may still exist, and the theorem says nothing about them.

## Core Understanding
The Rational Root Theorem (RRT) is a FILTER, not a finder: it shrinks the search for a polynomial's rational roots from "infinitely many possible rational numbers" down to one short, finite, checkable list — but it never guarantees that any candidate on that list is actually a root, and it says nothing at all about roots that aren't rational.

**THE THEOREM STATES A NECESSARY CONDITION, NOT A GUARANTEE.** If $f(x)=a_nx^n+\cdots+a_0$ has integer coefficients and $p/q$ (in lowest terms) is a rational root, then $p$ must divide $a_0$ and $q$ must divide $a_n$. This can be derived directly: substituting $f(p/q)=0$ and multiplying through by $q^n$ gives $a_np^n=-q(a_{n-1}p^{n-1}+\cdots+a_0q^{n-1})$, so $q$ divides $a_np^n$; since $\gcd(p,q)=1$, $q$ must divide $a_n$ specifically. A symmetric argument shows $p$ divides $a_0$. This derivation is exactly WHY the theorem only narrows the search — it proves a necessary condition on any rational root that exists, never that one does.

**GENERATING CANDIDATES REQUIRES BOTH THE CONSTANT TERM AND THE LEADING COEFFICIENT.** The complete candidate list is every $\pm(\text{factor of }a_0)/(\text{factor of }a_n)$. When the leading coefficient is $1$, every candidate is simply an integer divisor of $a_0$ — a special case that can mislead a learner into believing the denominator step is unnecessary. The moment $a_n\neq1$, the candidate list genuinely includes fractions (like $\pm1/2$ or $\pm3/2$), and omitting the leading-coefficient's factors from the denominator silently drops real candidates from the search.

**EVERY CANDIDATE MUST BE TESTED — THE THEOREM DOES NOT CERTIFY ANY OF THEM.** Substituting each candidate into $f$ (directly, or via synthetic division, which also reveals the reduced quotient on a successful test) is the only way to determine which candidates, if any, are actual roots. A confirmed root allows dividing out its corresponding factor, reducing the polynomial's degree by one and repeating the search on the smaller quotient — this progressive reduction is how RRT combines with factoring to fully solve higher-degree polynomials.

**EXHAUSTING THE CANDIDATE LIST WITHOUT A HIT MEANS "NO RATIONAL ROOTS," NOT "NO ROOTS AT ALL."** RRT is scoped entirely to rational roots — it structurally cannot detect irrational roots (like $\sqrt2$) or complex roots, because those numbers are never expressible as a ratio of integers and so never appear on the candidate list in the first place. A polynomial whose RRT search fails completely may still have real (irrational) or complex roots, found instead via the quadratic formula (once reduced to degree 2), numerical methods, or other techniques entirely outside RRT's scope.

## Mental Models
1. **Rung 1 — A filter, not a finder.** RRT narrows infinitely many possibilities down to a short finite list; it never tells you which (if any) of that list actually work — testing is a separate, mandatory step.
2. **Rung 2 — Two factor lists, cross-multiplied.** The candidate list is built from BOTH the constant term's factors (numerators) AND the leading coefficient's factors (denominators) — omitting either half produces an incomplete search.
3. **Rung 3 — A closed door, not a locked house.** When every candidate fails, the door to RATIONAL roots is closed — but the house (the full space of real and complex roots) may still have other doors (irrational, complex) that RRT was never built to open.

## Why Students Fail
MC-1 happens because the candidate list is typically presented under language like "the possible rational roots," and a learner conflates the word "possible" with "actual" — the theorem's genuine, structural role as a NECESSARY-but-not-sufficient filter gets lost in the instructional framing that names the list "the roots" rather than "the candidates to test." MC-2 happens because RRT is often the FIRST and, at this stage, the ONLY root-finding technique a learner has encountered, so when it fails to produce any hits, the tool's failure gets misread as the PROBLEM having no solution — the learner has no other lens yet through which to imagine a root existing outside RRT's search space. MC-3 happens because the earliest worked examples typically use polynomials with leading coefficient $1$ (where every candidate is simply an integer factor of the constant term), so the habit "candidates are just factors of $a_0$" becomes deeply set before the leading-coefficient's role is even introduced; when $a_n\neq1$ finally appears, the earlier, incomplete pattern persists uncorrected.

## Misconceptions

### MC-1: ALL-CANDIDATES-ARE-ROOTS
- **Birth type**: Type 5 — Instruction-induced (adopted directly from the Blueprint's own explicit classification)
- **Description**: The learner lists $\pm(\text{factors of }a_0)/(\text{factors of }a_n)$ and declares all of them to be roots without testing, assuming the theorem guarantees roots rather than merely candidates.
- **Why this birth type**: The candidate list is presented as "the possible rational roots," and the word "possible" is conflated with "actual" — the theorem only filters down to a finite list; testing every candidate is always a required, separate step that the instructional phrasing doesn't emphasize strongly enough.
- **Detection probe**: "$f(x)=x^2-5x+6$. List the RRT candidates and state the roots." — a learner holding this misconception lists $\pm1,\pm2,\pm3,\pm6$ (all 8 candidates) and declares all 8 to be roots.
- **Repair**: Test every one of the 8 candidates directly: only $x=2$ and $x=3$ give $f=0$; the other six ($1,-1,-2,-3,6,-6$) all fail. A degree-2 polynomial has at most 2 roots — the candidate list of 8 was never a claim that all 8 are roots, only that IF a rational root exists, it must be among these 8.
- **Verification of death**: Given any polynomial, the learner explicitly tests each candidate (via substitution or synthetic division) before declaring any of them a root, and correctly identifies which subset of the candidate list actually passes.

### MC-2: RRT-FINDS-ALL-ROOTS
- **Birth type**: Type 1 — Overgeneralization (adopted directly from the Blueprint's own explicit classification)
- **Description**: After finding no rational roots, the learner concludes the polynomial has no roots at all, not considering irrational or complex roots.
- **Why this birth type**: RRT is the ONLY root-finding technique the learner has encountered at this stage, so the absence of rational roots is incorrectly interpreted as the absence of ALL roots — the tool's failure is confused with the problem genuinely having no solution, since no alternative root-finding lens has yet been introduced.
- **Detection probe**: "$f(x)=x^2-2$. All RRT candidates ($\pm1,\pm2$) fail. Does $f$ have any roots?" — a learner holding this misconception says no.
- **Repair**: Solve $x^2-2=0$ directly: $x=\pm\sqrt2$. These ARE real roots — they are simply irrational, so they were never on the candidate list in the first place, since $\sqrt2$ cannot be written as a ratio of integers. RRT's failure here is exactly what should happen when the true roots are irrational — it is not a sign that no roots exist.
- **Verification of death**: After exhausting RRT candidates unsuccessfully, the learner correctly states "no RATIONAL roots" (never "no roots") and proceeds to an appropriate alternative technique (quadratic formula for a degree-2 remainder, or acknowledging irrational/complex roots may exist) rather than stopping.

### MC-3: LEADING-COEFFICIENT-IGNORED
- **Birth type**: Type 5 — Instruction-induced (adopted directly from the Blueprint's own explicit classification)
- **Description**: The learner uses only factors of the constant term $a_0$ as candidates, forgetting to divide by factors of the leading coefficient $a_n$, missing fractional candidates like $\pm1/2,\pm3/2$.
- **Why this birth type**: Leading-coefficient-1 polynomials are taught first, where candidates are simply $\pm(\text{factors of }a_0)$ with no denominator step needed; when $a_n\neq1$ is introduced, the earlier, incomplete pattern is too deeply set, and the extra division-by-$a_n$-factors step gets missed.
- **Detection probe**: "$f(x)=2x^2-5x+2$. List all RRT candidates." — a learner holding this misconception lists only $\pm1,\pm2$ (factors of the constant term $2$), missing $\pm1/2$.
- **Repair**: Show that $f(1/2)=2(1/4)-5(1/2)+2=1/2-5/2+2=0$ — a genuine root that would have been missed entirely. The complete candidate list requires factors of BOTH the constant term (numerator) $a_0=2$ (factors $\pm1,\pm2$) AND the leading coefficient (denominator) $a_n=2$ (factors $\pm1,\pm2$), forming all fractions $\pm(\text{factor of }a_0)/(\text{factor of }a_n)$: $\pm1,\pm2,\pm1/2$ (after removing duplicates).
- **Verification of death**: Given a polynomial with leading coefficient $\neq1$, the learner correctly includes fractional candidates by dividing by every factor of the leading coefficient, not just the constant term's factors.

## Analogies
1. **The suspect lineup, not a confession (for MC-1)**: RRT produces a lineup of suspects who COULD have committed the crime (be a root) based on the evidence (the coefficients) — appearing in the lineup is not a confession; each suspect must still be individually questioned (tested) before being convicted (confirmed as a root).
2. **A locked door, not the only door (for MC-2)**: finding that none of RRT's candidate keys opens the door means THAT SPECIFIC SET of keys (rational-number keys) doesn't work — it says nothing about whether a different kind of key (an irrational-number key) might open the same door.
3. **Two ingredient lists, not one (for MC-3)**: forming the candidate list without the leading coefficient's factors is like following a recipe using only half its ingredient list — the result is systematically incomplete, missing exactly the fractional candidates that the leading coefficient's factors were supposed to contribute.

## Demonstrations
1. **D1 — The eight-candidate reality check.** List all 8 RRT candidates for a degree-2 polynomial with only 2 actual roots, testing each live to show the majority genuinely fail — directly confronting MC-1.
2. **D2 — The irrational-root reveal.** Exhaust RRT for $x^2-2$, then solve it directly by the square-root method, revealing $\pm\sqrt2$ as genuine roots RRT structurally could never have found — directly confronting MC-2.
3. **D3 — The missing fractional candidate.** Generate an incomplete (integers-only) candidate list for a non-monic polynomial, test all of them (all fail), then reveal the complete list including a fractional candidate that IS a root — directly confronting MC-3.

## Discovery Questions
1. "If a candidate appears on the RRT list, does that guarantee it is a root? What would you have to do to find out?"
2. "You've tested every RRT candidate for a polynomial and none of them work. Does that mean the polynomial has no roots at all? What kind of root might you be missing?"
3. "A polynomial has leading coefficient 6, not 1. Does that change what candidates you need to check, compared to a leading coefficient of 1?"

## Teaching Sequence
Entry stage: Concrete (an explicit factored polynomial expanded, then worked backwards from a confirmed candidate via synthetic division, before the general theorem statement).
1. The eight-candidate reality check (D1) — establishing candidates as a list to TEST, pre-empting MC-1.
2. The irrational-root reveal (D2) — directly confronting MC-2 with a concrete counterexample.
3. The missing fractional candidate (D3) — directly confronting MC-3 with a non-monic polynomial.
4. Progressive degree reduction (confirmed root → divide out → reapply RRT to the quotient) combined with the quadratic formula once degree 2 is reached, then transfer probe (P76: the depressed cubic, discriminant analysis, and the historical casus irreducibilis connecting RRT failure to trigonometric root expressions).

## Tutor Actions
1. Whenever a learner produces a candidate list, require them to TEST at least one candidate explicitly (substitution or synthetic division) before accepting any of the list as an actual root — never let "it's on the list" stand alone as a claim of being a root.
2. When RRT fails completely for a polynomial, ask the learner what CAN still be concluded (no rational roots) versus what CANNOT be concluded (no roots at all) — make the distinction an explicit checkpoint, not an assumed default.
3. Before generating a candidate list for a polynomial with leading coefficient $\neq1$, ask the learner to state both factor lists (of $a_0$ and of $a_n$) separately before combining them — catch MC-3 at the list-generation step, before any testing begins.

## Voice Teaching Notes
- **Register**: proficient/analyze — the learner is combining a stated theorem with a testing procedure and interpreting negative results correctly; language should treat "why does testing matter" and "why doesn't failure mean no roots" as the central reasoning moves, not just the mechanical candidate-generation and division steps.
- **Load-bearing sentence**: "The theorem gives you a list to check — it never promises any of them work, and it never claims to have listed every possible root."
- **Wait time note**: after presenting a fully-exhausted RRT search with no hits, allow enough silence for the learner to attempt stating the correct conclusion ("no rational roots" rather than "no roots") before confirming or correcting — this is the single most diagnostic moment for MC-2.

## Assessment Signals
1. Correctly generates a complete candidate list (including fractional candidates when the leading coefficient is not 1) from a polynomial's constant term and leading coefficient.
2. Correctly tests candidates via synthetic or polynomial division and identifies which subset are actual roots.
3. Correctly uses a confirmed root to factor and reduce the polynomial's degree, then reapplies RRT to the resulting quotient.
4. Correctly interprets an exhausted, unsuccessful RRT search as "no rational roots" rather than "no roots at all," and names an appropriate next technique (quadratic formula, or acknowledging irrational/complex roots).
5. **P76 Transfer Probe** (independence mode): for a depressed cubic with three real but irrational roots, applies RRT to confirm no rational roots exist, computes the discriminant to confirm three real roots, and connects the result to the trigonometric expression of those roots (casus irreducibilis).

## Tutor Recovery Strategy
If a learner has just been corrected on MC-1 (treating every candidate as a root) and overcorrects by distrusting the candidate list entirely (re-testing values NOT on the list), clarify that the theorem's guarantee runs the OTHER direction: any rational root that exists MUST be on the list, so testing values outside the list for rationality is unnecessary — only candidates on the list can possibly be rational roots. If a learner correctly states "no rational roots" after an exhausted search (MC-2 resolved) but then cannot proceed to find the actual (irrational) roots, return to the quadratic-formula fallback explicitly: once reduced to degree 2 with no rational roots, the quadratic formula always produces the remaining roots directly.

## Memory Hooks
1. "On the list doesn't mean it's a root — test every candidate before you believe it."
2. "No rational roots isn't no roots — it's just the wrong kind of key for this lock."
3. "Two factor lists, not one — the leading coefficient's factors go in the denominator."

## Transfer Connections
- `math.func.polynomial-function` — this concept's own prerequisite; RRT's candidate testing directly reuses that concept's evaluation-by-substitution and sign-change-search machinery.
- `math.alg.polynomial-roots` — this concept's own prerequisite; RRT is the specific, systematic technique for locating a subset (the rational ones) of the roots that concept introduces generally.
- `math.alg.quadratic-formula` — the standard fallback once RRT reduces a polynomial to a degree-2 quotient with no further rational roots; the two techniques compose into a complete workflow for degree-4 (and higher, progressively) polynomials.

## Cross-Subject Connections
- Computer science: RRT's systematic candidate-generation-then-testing structure is a direct instance of the search-and-verify algorithmic pattern (generate a finite candidate set from structural constraints, then verify each), the same shape as many combinatorial search algorithms.
- Engineering: root-finding for characteristic polynomials (in control systems or structural analysis) often begins with an RRT-style rational-root check before falling back to numerical methods for the irrational or complex roots RRT cannot find.

## Blueprint References
- `docs/curriculum/blueprints/math.func.rational-root.md` — fully reused by reference. All 3 misconceptions' birth types adopted directly from the Blueprint's own classification (MC-1 Type 5, MC-2 Type 1, MC-3 Type 5), independently confirmed rather than re-derived.
- No cross-link listed in the KG for this concept; none to verify.

## Runtime Asset References
No AssetIdentity rows exist for this concept yet — Layer 3/7 (DB-backed Explanation/Probe assets) is populated separately by production LLM-generation-plus-admin-review or deliberate seed-script batches, per this program's own layer-ownership mapping. This Educational Brain entry is the Layer 2 authored source those future runtime assets will draw from.

## Curriculum Feedback
No genuine Blueprint/KG metadata discrepancy found — requires, unlocks, cross_links, difficulty, bloom, mastery_threshold, and estimated_hours all match the live KG exactly (unlocks and cross_links both empty per the KG, matching the Blueprint's own declaration).

## Version History
- **Batch 34** (2026-09-13): initial authoring, part 3 of 3 this batch (with `math.func.end-behavior`, `math.func.rational-function`), continuing `math.func` as a standalone domain campaign. Blueprint reused by reference; 3 misconceptions adopted at the Blueprint's own classified birth types (MC-1 Type 5, MC-2 Type 1, MC-3 Type 5).
