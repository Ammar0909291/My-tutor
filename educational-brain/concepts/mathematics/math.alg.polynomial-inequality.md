# math.alg.polynomial-inequality

## Identity
- **KG ID**: `math.alg.polynomial-inequality`
- **Domain**: math.alg (Algebra)
- **Requires**:
  - `math.alg.polynomial-roots` — load-bearing part: solving a polynomial inequality begins with
    finding the polynomial's roots (the boundary points between sign-consistent intervals);
    without root-finding already secure, the sign-chart procedure has no starting point, and
    without multiplicity already understood, the even-versus-odd sign-flip distinction (this
    concept's own Learning Objective 3) has no foundation.
  - `math.alg.inequality` — load-bearing part: this concept's endpoint-inclusion rule (Learning
    Objective 2) depends directly on the already-secure distinction between strict and non-strict
    inequality relations.
- **Unlocks**: none in the KG
- **Cross-links**: none in the KG
- **Difficulty**: proficient
- **Bloom level**: apply
- **Mastery threshold**: 0.75 (MAMR = ⌈0.75×5⌉ = 4/5)
- **Estimated hours**: 6
- **Blueprint**: `docs/curriculum/blueprints/math.alg.polynomial-inequality.md` (reused by
  reference throughout)

## Learning Objective
- The learner can solve a polynomial inequality p(x)>0 (or <, ≥, ≤) by finding the polynomial's
  ROOTS, constructing a SIGN CHART (testing a point in each interval between consecutive roots),
  and identifying which intervals satisfy the required sign.
- The learner can correctly determine whether ENDPOINTS (the roots themselves) are INCLUDED or
  EXCLUDED based on whether the inequality is strict (<, >) or non-strict (≤, ≥).
- The learner can handle a REPEATED root correctly — recognising that the polynomial's sign does
  NOT change across a root of EVEN multiplicity (it touches zero but stays the same sign on both
  sides), unlike a root of ODD multiplicity (where the sign genuinely flips).

## Core Understanding
A polynomial inequality p(x)>0 (or <, ≥, ≤) is solved by a four-step procedure: find all ROOTS of
p(x) (setting p(x)=0); these roots divide the number line into INTERVALS; construct a SIGN CHART by
testing one representative point from EACH interval, determining p(x)'s sign there; identify which
intervals satisfy the required sign, forming the solution set. Two subtleties, each genuinely
separate from the core procedure, determine the exact form of the final answer. First, endpoint
inclusion: for STRICT inequalities (<, >), the roots themselves are EXCLUDED (open interval
endpoints, since p(x)=0 does not itself satisfy p(x)>0 or p(x)<0); for NON-STRICT inequalities
(≤, ≥), the roots ARE included (closed endpoints, since p(x)=0 does satisfy p(x)≥0 or p(x)≤0).
Second, and more subtle, multiplicity matters at every root: at a root of ODD multiplicity
(1, 3, 5, ...), the polynomial's sign genuinely FLIPS across that root; at a root of EVEN
multiplicity (2, 4, ...), the polynomial TOUCHES zero but does NOT change sign — it stays the same
sign on both sides. This means the sign chart cannot be constructed by assuming every root causes a
flip; each interval's sign must genuinely be TESTED, never merely inferred from an alternating
pattern.

## Mental Models
1. **Beginner — find the roots, test a point in each interval, keep the intervals with the right
   sign.** For (x−2)(x+1)>0, test points in (−∞,−1), (−1,2), (2,∞), keep the positive ones.
   *Upgrade trigger*: a non-strict inequality, where "keep the right intervals" alone doesn't
   specify whether the boundary points themselves belong in the answer. *Shelf life*: one session.
2. **Intermediate — strict versus non-strict inequality determines whether the roots themselves are
   included in the final answer, independent of which intervals the sign chart selects.** *Upgrade
   trigger*: a repeated root, where testing both sides reveals the sign does NOT flip — contrary to
   an assumed alternating pattern. *Shelf life*: durable once endpoint-inclusion is treated as a
   genuinely separate check from interval selection.
3. **Advanced — never assume the sign automatically alternates between consecutive roots; always
   TEST, because a root of even multiplicity is a "touch point," not a genuine sign-change point,
   and only actual testing reveals which kind it is.** *Upgrade trigger*: a realistic applied
   scenario (e.g. an engineering stress function) where an incorrect assumed sign-flip produces a
   genuinely wrong practical conclusion, not merely an abstract algebra error.
4. **Expert — a polynomial inequality's complete solution requires three independently-checked
   pieces of information at every root: is it actually a sign-change point (odd multiplicity) or
   not (even multiplicity); and separately, is the root itself included (non-strict) or excluded
   (strict) — treating these as one combined "obvious" rule risks getting both wrong
   simultaneously.** *Shelf life*: permanent.

## Why Students Fail
The single most frequent failure, ranked foundational, is using the WRONG endpoint notation — not
matching the actual strictness of the given inequality — for instance, using open-interval notation
(endpoints excluded) for a non-strict inequality (≤ or ≥), where the roots genuinely DO satisfy the
inequality (since p(x)=0 satisfies p(x)≥0) and must therefore be included; this error is especially
easy to make because the underlying sign chart is IDENTICAL for the strict and non-strict versions
of the same inequality — only the final endpoint notation differs, making it easy to copy the wrong
convention from a recently-solved, superficially similar problem. The second failure, equally
ranked foundational and identified as revealing a structural misunderstanding of why sign charts
work at all, is assuming the polynomial's sign changes at EVERY root, missing that even-multiplicity
roots don't cause a sign flip — a learner holding this misconception will assume the intervals
alternate in a fixed +/−/+/− pattern without ever testing, and will systematically get every problem
involving a repeated root wrong, since the assumed alternation is simply false at an even-
multiplicity root (the polynomial "touches" zero there but continues in the same sign on both
sides). The third failure is a mechanical one: accidentally choosing a test point that coincides
with one of the roots itself, giving a result of exactly zero — which is entirely uninformative
about the surrounding interval's actual sign, since zero is neither positive nor negative, and using
it as if it answered the sign-chart question produces no usable information at all.

## Misconceptions
Reused by reference from the Blueprint's Component 6 registry (MC-1..MC-3), with birth-type
classification added.

- **MC-1 — ENDPOINT-INCLUSION-NOT-MATCHED-TO-INEQUALITY-STRICTNESS** (FOUNDATIONAL)
  - **Birth type**: Type 4, notation-induced — the sign chart itself is identical for the strict
    and non-strict versions of the same inequality, so the notation choice (open versus closed
    interval) is easy to copy by habit from a recently-solved problem rather than checked against
    the SPECIFIC inequality currently being solved.
  - **Characteristic phrase**: using open-interval (excluded-endpoint) notation for a non-strict
    inequality, where the roots genuinely satisfy the inequality and must be included.
  - **Detection probe** (verbatim, Blueprint): presenting Example 2 and checking whether open or
    closed interval notation is used — confirms MC-1 if mismatched.
  - **Repair**: Blueprint Repair Action B01 — re-check whether the root value itself satisfies the
    ORIGINAL inequality (with equality), directly determining inclusion from that check rather than
    from habit.
  - **Verification of death**: given a mixed set of strict and non-strict inequalities sharing an
    identical sign chart, the learner correctly matches the endpoint notation to each inequality's
    actual strictness, every time.

- **MC-2 — SIGN-ASSUMED-TO-FLIP-AT-EVERY-ROOT-REGARDLESS-OF-MULTIPLICITY** (FOUNDATIONAL)
  - **Birth type**: Type 1, overgeneralisation — the alternating +/−/+/− pattern is correct at
    ODD-multiplicity roots (the common case in introductory practice), so it is overgeneralised to
    ALL roots, missing that even-multiplicity roots break the alternation entirely.
  - **Characteristic phrase**: treating a repeated (even-multiplicity) root as a genuine sign-
    change point, incorrectly splitting an interval that should remain one continuous sign region.
  - **Detection probe** (verbatim, Blueprint): presenting Example 3 and checking whether the
    even-multiplicity root is treated as a genuine sign-change point — confirms MC-2.
  - **Repair**: Blueprint Repair Action B02 — re-test explicit points on both sides of the
    even-multiplicity root, confirming the sign doesn't actually change.
  - **Verification of death**: given a polynomial with a mix of odd- and even-multiplicity roots,
    the learner correctly identifies which are genuine sign-change points by testing, never by
    assuming an alternating pattern.

- **MC-3 — SIGN-CHART-TEST-POINT-CHOSEN-ON-A-ROOT** (moderate)
  - **Birth type**: Type 4, notation-induced — selecting a "convenient" test value (often a round
    number) without explicitly checking it against the list of roots can accidentally land exactly
    on a root, especially when roots include common integers.
  - **Characteristic phrase**: choosing a test point that coincides with a root, giving zero — an
    uninformative result about the surrounding interval's sign.
  - **Detection probe**: reviewing a submitted sign chart for a test point coinciding with a root —
    confirms MC-3.
  - **Repair**: Blueprint Repair Action B03 — re-select a genuinely interior test point for each
    interval, strictly between consecutive roots.
  - **Verification of death**: given several intervals bounded by roots, the learner consistently
    selects genuinely interior test points, never one that coincides with a boundary.

## Analogies
- **A weather report for each neighbourhood between two landmarks, never trusting an assumed
  pattern.** Testing each interval's sign is like checking the actual weather in a specific
  neighbourhood rather than assuming it alternates sunny/rainy/sunny/rainy between towns just
  because that happened to be the pattern last time — sometimes a "border town" (an even-
  multiplicity root) has the SAME weather as its neighbours on both sides, breaking any assumed
  alternation. *Where it holds*: the "always check directly, never assume a pattern" discipline,
  directly targeting MC-2. *Where it breaks*: weather has no equivalent of "strict versus
  non-strict" boundary inclusion — the analogy addresses only the sign-testing half of this
  concept, not the endpoint-notation half, which needs its own separate teaching.
- **A guest list with a strict door policy versus a more lenient one.** Endpoint inclusion is like
  two different events with the same guest list but different door policies: a STRICT event turns
  away anyone exactly on the boundary list (open interval — root excluded), while a LENIENT event
  welcomes them (closed interval — root included) — the underlying list (the sign chart) is
  identical, only the policy (strictness of the inequality symbol) differs. *Where it holds*: the
  "same underlying data, different inclusion policy" structure, directly targeting MC-1. *Where it
  breaks*: a door policy is an arbitrary external rule; here the "policy" is derived directly and
  mechanically from the inequality symbol itself (< or > excludes; ≤ or ≥ includes), which the
  analogy doesn't convey and must be taught as the direct symbol-to-notation mapping.

## Demonstrations
1. **A standard strict-inequality sign chart, establishing the base procedure.** Solve
   (x−2)(x+1)>0. Roots: x=2, −1, dividing the line into three intervals: (−∞,−1), (−1,2), (2,∞).
   Test x=−2: (−4)(−1)=4>0 ✓. Test x=0: (−2)(1)=−2<0 ✗. Test x=3: (1)(4)=4>0 ✓. Solution:
   (−∞,−1)∪(2,∞) — strict inequality, endpoints EXCLUDED (open intervals).
2. **The identical sign chart with a non-strict inequality, directly confronting MC-1.** Solve
   (x−2)(x+1)≥0. Using the SAME sign chart as Demonstration 1, the solution is
   (−∞,−1]∪[2,∞) — the endpoints are now INCLUDED (square brackets), since x=−1 and x=2 make
   (x−2)(x+1)=0, which DOES satisfy ≥0.
3. **An even-multiplicity root, directly confronting MC-2.** Solve (x−3)²(x+2)>0. Roots: x=3
   (multiplicity 2, EVEN), x=−2 (multiplicity 1, odd). Test x=−3: (36)(−1)=−36<0 ✗. Test x=0:
   (9)(2)=18>0 ✓. Test x=4: (1)(6)=6>0 ✓. Notice the sign STAYS POSITIVE across x=3 (both x=0 and
   x=4 give positive results) — because x=3 has EVEN multiplicity, the polynomial touches zero
   there but doesn't flip sign. Solution: (−2,3)∪(3,∞) — x=3 itself is EXCLUDED (strict inequality)
   even though the sign doesn't change around it.

## Discovery Questions
- "You have the same sign chart for (x−2)(x+1)>0 and (x−2)(x+1)≥0. Does the FINAL ANSWER look
  identical for both, or does something change?" — surfaces MC-1 by requiring the learner to
  compare the two inequalities' endpoint treatment directly.
- "At x=3, this polynomial has a repeated (multiplicity-2) root. Before assuming the sign flips
  there, can you actually TEST a point just below 3 and a point just above 3?" — surfaces MC-2 by
  requiring direct testing rather than an assumed pattern.
- "You picked x=2 to test the interval — but isn't 2 one of the roots? What does testing exactly on
  a root actually tell you?" — surfaces MC-3 by requiring the learner to evaluate their own test
  point's validity.

## Teaching Sequence
1. **Anchor**: connect explicitly to the already-secure `math.alg.polynomial-roots` (root-finding)
   and `math.alg.inequality` (strict versus non-strict relations) — this concept combines both into
   a systematic solving procedure.
2. **Establish the full four-step sign-chart procedure on a clean example** (Demonstration 1),
   modelling the complete process before any complication is introduced.
3. **Introduce the identical-sign-chart, different-endpoint-notation contrast directly**
   (Demonstration 2), directly pre-empting MC-1 by placing strict and non-strict versions side by
   side.
4. **Introduce the even-multiplicity case with explicit both-sides testing shown**
   (Demonstration 3), directly pre-empting MC-2 by making "always test, never assume" the standing
   rule.
5. **Install genuinely-interior test-point selection as its own explicit habit** throughout every
   demonstration, directly pre-empting MC-3.
6. **Practice mixed problems** deliberately combining strict/non-strict pairs sharing an identical
   sign chart, and even/odd-multiplicity roots, always requiring both checks (endpoint inclusion,
   sign-flip testing) to be performed independently.
7. **Bridge forward**: state explicitly that this concept's sign-chart technique extends directly
   to rational inequalities (`math.alg.rational-inequality`, a sibling concept named in the
   Blueprint's own Cross-Blueprint Dependencies, not yet authored).

## Tutor Actions
- Before accepting any final interval notation, ask "is this inequality strict or non-strict? Does
  your notation match?" — this single question directly defends against MC-1.
- Before accepting any claim that the sign flips at a specific root, ask "did you actually test a
  point on each side, or are you assuming it flips?" — targeting MC-2 directly.
- Before accepting any test-point result, ask "is that test point strictly between two roots, or
  does it land exactly on one?" — targeting MC-3 directly.
- Never accept a solved polynomial inequality without both the endpoint-inclusion check and the
  actual (not assumed) sign-testing shown explicitly.

## Voice Teaching Notes
- When stating a final solution aloud, speak the endpoint notation with explicit justification:
  "closed bracket — because this inequality is non-strict, and the root itself satisfies it" —
  audibly connecting the notation to its cause, directly targeting MC-1.
- When testing around a suspected even-multiplicity root aloud, narrate genuine uncertainty before
  resolving it: "let's actually check... same sign on both sides? Then it doesn't flip here" — the
  audible "let's actually check" models testing over assuming, targeting MC-2.
- When selecting a test point aloud, verify it explicitly: "is this point one of my roots? No —
  good, it's safely inside the interval" — targeting MC-3 directly.

## Assessment Signals
- **Correct + fast + independently checks endpoint-inclusion and sign-flip behaviour every time,
  unprompted** → MASTERED.
- **Sign chart correct, endpoint notation mismatched to the inequality's strictness** → MC-1
  active; needs the strictness-check repair.
- **A repeated root treated as a genuine sign-change point without testing** → MC-2 active; needs
  the explicit both-sides-testing repair.
- **A test point chosen exactly on a root, giving an uninformative zero result** → MC-3 active;
  needs the interior-point-selection repair.
- **Cannot find the polynomial's roots at all** → prerequisite gap in `math.alg.polynomial-roots`,
  not specific to this concept's sign-chart/endpoint content; route back accordingly.

## Tutor Recovery Strategy
If a learner has just had MC-1 pointed out and expresses frustration that "the chart was right, so
why is the answer wrong," clarify directly that the SIGN CHART genuinely was correct — the error is
specifically in the final NOTATION step, a distinct and separate check from the sign-chart work
itself; separating the two explicitly prevents the correction from reading as "your whole solution
was wrong" when only the last step needs adjustment. If MC-2 persists after one correction, avoid
simply restating "test, don't assume" — instead have the learner explicitly write out both test
values and their computed signs side by side for the suspected even-multiplicity root, since seeing
the two matching sign values directly (rather than being told they match) is more durable for this
specific, pattern-breaking case.

## Memory Hooks
- "Match the bracket to the symbol" — the endpoint-inclusion rule, directly targeting MC-1.
- "Test both sides — never assume the flip" — the multiplicity-testing discipline, directly
  targeting MC-2.
- "Never test exactly on a root" — the interior-test-point rule, directly targeting MC-3.

## Transfer Connections
- **`math.alg.polynomial-roots`** (prerequisite, reused): root-finding and multiplicity are the
  direct foundation this concept's sign-chart procedure builds on.
- **`math.alg.inequality`** (prerequisite, reused): the strict-versus-non-strict distinction this
  concept's endpoint-inclusion rule depends on directly.
- **`math.alg.rational-inequality`** (sibling concept, per the Blueprint's own Cross-Blueprint
  Dependencies, not yet authored): extends this exact sign-chart technique to rational expressions,
  reusing the identical root-finding-then-testing structure.

## Cross-Subject Connections
- **Engineering** (`phys.`/`cs.` stress analysis, structural design): the Blueprint's own transfer
  probe uses a beam stress function requiring a "safe range" conclusion — an incorrect assumed
  sign-flip at an even-multiplicity root would produce a genuinely wrong, practically consequential
  safety conclusion, not merely an abstract algebra error.
- **Economics** (`math.` optimization-adjacent applications): determining the range of a variable
  (e.g. price or quantity) over which a polynomial-modelled profit or cost function is positive or
  negative reuses this exact sign-chart procedure directly.

## Blueprint References
- `docs/curriculum/blueprints/math.alg.polynomial-inequality.md` — Component 0 (metadata:
  difficulty proficient, bloom apply, mastery_threshold 0.75, estimated_hours 6, requires
  [math.alg.polynomial-roots, math.alg.inequality]); Component 6 (Misconception Registry
  MC-1..MC-3, reused above with birth-type classification added); Component 4 (worked examples for
  (x−2)(x+1)>0, (x−2)(x+1)≥0, (x−3)²(x+2)>0, reused directly in the Demonstrations above); the P76
  transfer probe (an engineering beam-stress scenario with an embedded even-multiplicity root,
  requiring the "safe range" conclusion to be corrected against an assumed-sign-flip error,
  independence mode) — held in the Blueprint's own mastery-gate item bank, not restated here per
  the Standard's ownership boundary.

## Runtime Asset References
- No AssetIdentity rows exist yet for this concept (mathematics EB authoring is ahead of the
  AssetIdentity seeding campaign for math.alg — see CLAUDE.md's "Mathematics Educational Brain
  serving-asset campaign" section for the seeding mechanism this concept will use once authored
  content is selected for transcription).

## Curriculum Feedback
- No genuine content-overlap or metadata discrepancy was found between this Blueprint and any
  already-authored sibling entry. The Blueprint's own named sibling concept,
  `math.alg.rational-inequality`, is not yet authored — recorded as a standing forward-work note
  for when it is reached in a future wave, not a defect.

## Version History
- 2026-09-11 — Initial authoring (Batch 12 / math.alg Wave 12 part 3 of the Mathematics Educational
  Brain completion campaign). Blueprint reused by reference in full. No KG or Blueprint file
  modified.
