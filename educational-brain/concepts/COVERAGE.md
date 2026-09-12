# Coverage Manifest

Live count of canonical KG concepts with authored Educational Brain entries,
plus the full per-entry changelog. Updated in the same commit as any entry
added. **For the dashboard view (totals, completion %, current/next batch,
priority queue) see [`ROADMAP.md`](ROADMAP.md)** — that file owns the
high-level numbers so they are computed in one place; this file owns the
detailed per-subject entry list and delivery-by-delivery history. If the
two ever disagree, `ROADMAP.md`'s freshly-computed totals are authoritative
and this file's summary row should be corrected to match.

| Subject | KG concepts | Entries authored | Coverage |
|---|---|---|---|
| mathematics | 908 | 410 | **Six domains CERTIFIED, math.disc at 20/32 (parked), math.graph at 13/16 (parked), math.calc the active campaign at 44/76.** 82 `math.found.*` (COMPLETE, DOMAIN CERTIFIED 2026-07-26) + 58 `math.arith.*` (COMPLETE, DOMAIN CERTIFIED 2026-07-26) + 69 `math.geom.*` (**COMPLETE, DOMAIN CERTIFIED** — the final 13 entries were restored by commit `0d2c76dd`'s Wave 0 recovery, which this row previously did not reflect) + 36 `math.nt.*` (**COMPLETE, DOMAIN CERTIFIED 2026-08-12** — the domain's final 8 concepts, `prime-distribution`, `continued-fractions`, `analytic-number-theory`, `prime-number-theorem`, `riemann-hypothesis`, `algebraic-number-theory`, `algebraic-integers`, `number-fields`, were authored this session, ending the PARKED status this row previously recorded) + 59 `math.alg.*` (**COMPLETE, DOMAIN CERTIFIED 2026-09-11** — Wave 1 (2026-08-12, 11 concepts): `expression`, `equation`, `term`, `coefficient`, `exponent-rules`, `polynomial`, `degree`, `zero-exponent`, `negative-exponent`, `solution-set`, `inequality`; Wave 2 (2026-08-12, 1 concept): `like-terms`; Wave 3 (2026-09-11, 3 concepts): `simplification`, `polynomial-operations`, `radicals`; Wave 4 (2026-09-11, 5 concepts): `linear-equation-1var`, `polynomial-division`, `fractional-exponent`, `simplifying-radicals`, `radical-equations`; Wave 5 (2026-09-11, 5 concepts): `inequality-1var`, `absolute-value-equations`, `linear-equation-2var`, `remainder-theorem`, `rationalizing-denominators`; Wave 6 (2026-09-11, 3 concepts): `inequality-2var`, `system-linear-equations`, `factor-theorem`; Wave 7 (2026-09-11, 4 concepts): `substitution-method`, `elimination-method`, `system-3var`, `factoring`; Wave 8 (2026-09-11, 3 concepts): `factoring-gcf`, `factoring-special`, `rational-expressions`; Wave 9 (2026-09-11, 4 concepts): `factoring-trinomials`, `rational-expressions-addition`, `rational-expressions-multiplication`, `rational-equations`; Wave 10 (2026-09-11, 1 concept): `quadratic-equation`; Wave 11 (2026-09-11, 2 concepts): `completing-the-square`, `polynomial-roots`; Wave 12 part 1 (2026-09-11, 1 concept): `quadratic-formula`; Wave 12 part 2 (2026-09-11, 2 concepts): `discriminant`, `rational-root-theorem`; Wave 12 part 3 (2026-09-11, 3 concepts): `fundamental-theorem-algebra`, `polynomial-inequality`, `vietas-formulas`; Wave 13 (2026-09-11, 2 concepts): `complex-polynomial-roots`, `rational-inequality`; Batch 15 (2026-09-11, 1 concept): `exponential-function`; Batch 16 (2026-09-11, 2 concepts): `logarithm`, `exponential-equations`; Batch 17 (2026-09-11, 3 concepts): `binomial-theorem`, `logarithm-properties`, `natural-logarithm`; Batch 18 (2026-09-11, 3 concepts, FINAL): `change-of-base`, `logarithmic-equations`, `pascals-triangle`; all Blueprint-grounded, reused by reference). 20 `math.disc.*` entries (**IN PROGRESS, standalone campaign since math.alg's certification** —
Batch 14 (2026-09-11, 1 concept): `counting-principles`; Batch 15 (2026-09-11, 1 concept):
`permutations`; Batch 16 (2026-09-11, 1 concept): `combinations`; Batch 19 (2026-09-11, 5
concepts): `combinatorics`, `pigeonhole`, `stars-bars`, `inclusion-exclusion`,
`binomial-theorem`; Batch 20 (2026-09-11, 3 concepts): `derangements`, `graph`,
`propositional-logic` — opened the graph-theory and formal-logic subtrees deferred from Batch
19; Batch 21 (2026-09-11, 5 concepts): `boolean-circuits`, `graph-coloring`,
`graph-connectivity`, `graph-types`, `predicate-logic-disc` — deepening both subtrees; Batch 22
(2026-09-11, 3 concepts): `euler-hamiltonian`, `graph-trees`, `planar-graph` — substantially
developing the graph-theory subtree; Batch 23 (2026-09-11, 1 concept): `spanning-tree` —
closing the `graph-trees → spanning-tree` chain, leaving 0 topologically-ready math.disc
candidates; all Blueprint-grounded, reused by reference) + 1
`math.func.*` entries (**STANDALONE CAMPAIGN, IN PROGRESS, 2026-09-12** — `function-concept`
(Batch 14) + Batch 28 (2026-09-12, 4 concepts): `domain-range`, `function-notation`,
`injectivity`, `surjectivity`; resumed after both `math.disc` and `math.graph` were found
PARKED with 0 topologically-ready candidates, while `math.func` alone had 13 ready, all gated
only on the already-authored `function-concept`; Batch 29 (2026-09-12, 4 concepts):
`function-operations`, `composition`, `monotonic-function`, `bijection` — closing 4 of the 10
concepts left ready after Batch 28, one of which (`bijection`) corrected a stale Blueprint
cross-link claim about its own `math.found.cardinality` sibling; Batch 30 (2026-09-12, 4
concepts): `inverse-functions`, `graph-of-function`, `real-valued-function`, `linear-function` —
closing 4 of the 7 concepts left ready after Batch 29; Batch 31 (2026-09-12, 4 concepts):
`zero-of-function`, `even-odd-functions`, `transformations-functions`, `periodic-function` —
closing 4 of the 8 concepts left ready after Batch 30, all 4 Blueprint-grounded with birth types
adopted directly from each Blueprint's own classification (independently confirmed); Batch 32
(2026-09-12, 4 concepts): `quadratic-function`, `exponential-function`, `logarithmic-function`,
`piecewise-function` — closing the ENTIRE 4-concept frontier available after Batch 31, all
Blueprint-grounded, reused by reference; Batch 33 (2026-09-13, 3 concepts): `vertex-form`,
`polynomial-function`, `step-function` — closing the ENTIRE 3-concept frontier available after
Batch 32. All 3 Blueprint-grounded, reused by reference. `vertex-form`'s and `step-function`'s
Blueprints both carried explicit birth-type classifications for their misconceptions (adopted
directly: `vertex-form` MC-1 Type 5/MC-2 Type 3/MC-3 Type 1; `step-function` MC-1 Type 3/MC-2
Type 1/MC-3 Type 5). `polynomial-function`'s Blueprint was the first in this entire campaign
whose Misconception Registry table lacked an explicit birth-type column — its 3 misconceptions
were independently classified instead (MC-1 END-BEHAVIOR-ASSUMED-SUFFICIENT-FOR-FULL-SHAPE Type
1; MC-2 SIGN-CHANGE-ARGUMENT-APPLIED-WITHOUT-CONTINUITY-JUSTIFICATION Type 5; MC-3
FUNCTION-EVALUATION-CONFUSED-WITH-ROOT-FINDING Type 3, matching the identical "evaluation vs.
solving" pattern already classified this way in sibling `math.func` entries), stated explicitly
in that entry's own Blueprint References section rather than silently adopted; Batch 34
(2026-09-13, 3 concepts): `end-behavior`, `rational-function`, `rational-root` — closing the
ENTIRE 3-concept frontier available after Batch 33. All 3 Blueprint-grounded, reused by
reference. `end-behavior`'s and `rational-root`'s Blueprints both carried explicit birth-type
classifications (adopted directly: `end-behavior` MC-1 Type 1/MC-2 Type 1/MC-3 Type 5;
`rational-root` MC-1 Type 5/MC-2 Type 1/MC-3 Type 5). `rational-function`'s Blueprint was the
SECOND in this campaign (after `polynomial-function`) whose Misconception Registry table lacked
an explicit birth-type column — its 3 misconceptions were independently classified instead
(MC-1 DOMAIN-RESTRICTION-ASSUMED-SPECIAL-RULE Type 5; MC-2
DENOMINATOR-ZERO-ASSUMED-TO-ALWAYS-BE-ASYMPTOTE Type 2; MC-3
END-BEHAVIOR-ASSUMED-INDEPENDENT-OF-DEGREE Type 1), stated explicitly in that entry's own
Blueprint References section; Batch 35 (2026-09-13, 2 concepts, FINAL): `horizontal-asymptote`,
`vertical-asymptote` — closing the domain's final 2 concepts, both Blueprint-grounded with
explicit birth-type classifications adopted directly (`horizontal-asymptote` MC-1 Type 1/MC-2
Type 5/MC-3 Type 5; `vertical-asymptote` MC-1 Type 3/MC-2 Type 5/MC-3 Type 5). **math.func
REACHES 29/29 — DOMAIN CERTIFIED**, the sixth after math.found/math.geom/math.arith/math.nt/
math.alg) + 32 `math.calc.*` entries (**STANDALONE CAMPAIGN, IN PROGRESS (2026-09-12)** — Batch 35
(2026-09-13, 1 concept): `limits`, the domain's entry node, selected as the highest-leverage
next step after math.func's certification — a fresh frontier check across ALL mathematics
domains found 14 candidates spread across 11 different unstarted domains with no clustering,
and `math.calc` (76 concepts, the largest unstarted domain) was chosen because authoring its
sole ready candidate, `limits`, was verified programmatically to unblock 7 further `math.calc`
concepts at once (`derivative-intro`, `limits-at-infinity`, `riemann-sums`, `one-sided-limits`,
`parametric-curves`, `continuity`, `limit-laws`). This Blueprint uses an older Curriculum
Production Pipeline document format (Teaching Actions/primitive codes rather than the newer
Component-0-table format) and was the THIRD Blueprint in this campaign to lack an explicit
birth-type column (after `polynomial-function`, `rational-function`) — its 3 misconceptions
were independently classified (MC-1 LIMIT-IS-THE-FUNCTION-VALUE Type 1, MC-2
LIMIT-REQUIRES-f(a)-DEFINED Type 1, MC-3 ONE-SIDED-EQUALS-TWO-SIDED Type 5), stated explicitly
in that entry's own Blueprint References section; Batch 36 (2026-09-13, 4 concepts):
`one-sided-limits`, `limit-laws`, `limits-at-infinity`, `continuity` — the four candidates
most tightly coupled to `limits` itself, selected from the 7-concept frontier `limits`
unblocked, deferring `derivative-intro`/`riemann-sums`/`parametric-curves`. Two further
Blueprints in this batch (`one-sided-limits`, `limit-laws`) also lacked explicit birth-type
columns, independently classified; `continuity` (an older document format matching `limits`'
own) likewise lacked one, independently classified; only `limits-at-infinity` carried explicit
classifications. `limits-at-infinity` substantively incorporates the already-authored
`math.func.horizontal-asymptote` (Batch 35) as a direct cross-link, closing that entry's own
orientation-level preview; Batch 37 (2026-09-13, 4 concepts): `continuity-types`, `ivt`,
`derivative-intro`, `squeeze-theorem` — closing 4 of the 6-concept frontier available after
Batch 36, deferring `parametric-curves`/`riemann-sums`. All 4 Blueprint-grounded. None of the
4 Blueprints this batch carried an explicit birth-type column (the eighth through eleventh
such gaps this campaign) — every misconception independently classified:
`continuity-types` MC-1 Type 1/MC-2 Type 1; `ivt` MC-1 Type 1/MC-2 Type 5/MC-3 Type 5;
`derivative-intro` MC-1 Type 2/MC-2 Type 2/MC-3 Type 1; `squeeze-theorem` MC-1 Type 1/MC-2
Type 1. `derivative-intro` is this domain's central payoff concept — the concept everything
since `limits` has been building toward — and its own MC-1 (TANGENT-IS-JUST-ONE-POINT)
directly resolves the classic "you can't find a slope from one point" objection via the
constructed-second-point-in-the-limit technique; Batch 38 (2026-09-12, 3 concepts, closing
the ENTIRE frontier available after Batch 37 with none deferred): `derivative-definition`,
`parametric-curves`, `riemann-sums`. `derivative-definition` formalizes `derivative-intro`'s
whole informal picture into the computable limit $f'(x)=\lim_{h\to0}[f(x+h)-f(x)]/h$, its
Blueprint the TWELFTH lacking an explicit birth-type column this campaign (MC-1
DIFFERENCE-QUOTIENT-IS-DERIVATIVE Type 1, MC-2 CONTINUITY-IMPLIES-DIFFERENTIABILITY Type 1,
MC-3 DIRECT-SUBSTITUTION-INTO-QUOTIENT Type 1), and — a first for this domain's batches — its
Blueprint's stated unlocks/cross_links matched the live KG's own fields exactly, no
discrepancy to record. `parametric-curves` and `riemann-sums` (their Blueprints also lacking
birth-type columns, independently classified: `parametric-curves` MC-1 Type 2/MC-2 Type 1/MC-3
Type 5; `riemann-sums` MC-1 Type 2/MC-2 Type 1/MC-3 Type 1, the last explicitly
cross-referencing `math.calc.limits`' own MC-1 as the Blueprint's own root-cause text names)
likewise matched the KG exactly. `math.calc` reaches 12/76; Batch 39 (2026-09-12, 4
concepts, selected from the 8-concept frontier available after Batch 38, deferring
`lhopitals-rule`/`line-integrals`/`mean-value-theorem`/`multivariable-intro`):
`definite-integral` (signed area, reversal/additivity/linearity properties derived
from the Riemann sum's own structure, MC-1 Type 3 language contamination from
everyday "area", MC-2 Type 5 instruction-induced FTC-first teaching, MC-3 Type 1
overgeneralized commutativity), `derivative-rules` (the power/constant-multiple/
sum rules derived from the definition, MC-1 Type 1 power-rule-on-exponentials,
MC-2 Type 1 dropped coefficients, MC-3 Type 1 distributing over products),
`differentiability` (the corner/cusp/vertical-tangent taxonomy, MC-1 Type 2
perceptual smooth-appearance assumption, MC-2 Type 1 the same
implication-reversal mechanism already documented for `continuity-types` and
`derivative-definition`), `linearization` ($L(x)=f(a)+f'(a)(x-a)$ reusing the
derivative's own slope, MC-1 Type 5 instruction-induced new-vocabulary effect,
MC-2 Type 1 uniform-accuracy overgeneralization, MC-3 Type 4 notation-induced
differential/linearization separation). Continuing the zero-discrepancy pattern
begun in Batch 38 — all 4 Blueprints' stated unlocks/cross_links matched the KG
exactly. `math.calc` reaches 16/76; Batch 40 (2026-09-12, 4 concepts, selected
from the 13-concept frontier available after Batch 39, sharing the tightest
single-prerequisite coupling to `derivative-rules`): `antiderivatives`
(the reverse power rule as the exact algebraic inverse; the antiderivative
family F(x)+C; MC-1 Type 1 constant omission, MC-2 Type 1 wrong-direction
reversal, MC-3 Type 1 uniqueness confusion), `critical-points` ($f'(c)=0$ OR
undefined, both gated on domain membership; candidates never guarantees; MC-1
Type 1 — a fourth recurrence of the implication-reversal mechanism already
documented for `continuity-types`/`derivative-definition`/`differentiability`
— MC-2 Type 5 instruction-induced single-search habit, MC-3 Type 1
domain-precondition overextension), `higher-order-derivatives` (iterate, never
square; $d^2y/dx^2$ vs $(dy/dx)^2$; coefficient accumulation across repeated
power-rule applications; MC-1 Type 3 language contamination from "second"/
squaring, MC-2 Type 4 notation-induced — the Blueprint's own Teaching Notes
link MC-1/MC-2 as one mechanism at two levels — MC-3 Type 1; genuine Tier-1
cross-link to the unauthored `math.de.second-order-ode`, cross-link-probe mode
used directly despite the target domain being unstarted), `product-rule`
(resolving `derivative-rules`'s own deferred MC-3 with the genuine two-term
rule; MC-1 Type 1, the identical misconception recurring from
`derivative-rules`' own MC-3; MC-2/MC-3 Type 5 instruction-induced). Fourth
consecutive batch with zero Blueprint/KG metadata discrepancies. `math.calc`
reaches 20/76; Batch 41 (2026-09-12, 4 concepts, selected from the 11-concept
frontier available after Batch 40): `concavity` (requires
`higher-order-derivatives`; sign of $f''$ determines cup/cap shape; MC-1 Type
1 — a fifth recurrence of the necessary-vs-sufficient candidate pattern
already documented for `critical-points`' own MC-1 — MC-2 Type 2 perceptual,
MC-3 Type 5, the same undefined-derivative-search-missed mechanism as
`critical-points`' own MC-2), `quotient-rule` (requires `product-rule`;
$(f/g)'=(f'g-fg')/g^2$, order-sensitive subtraction; MC-1 Type 4
notation-induced mislabeling, MC-2 Type 1 overgeneralizing the Product Rule's
own genuine order-independence into subtraction), `integral-area` (requires
`definite-integral`; area under a curve IS the integral, top-minus-bottom for
regions between curves, signed-vs-unsigned area; MC-1 Type 5 the same
new-vocabulary-without-connection mechanism as `linearization`'s own MC-1,
MC-2 Type 1 the same order-sensitivity mechanism as `quotient-rule`'s own
MC-2, MC-3 Type 3 language contamination — the inverse direction of
`definite-integral`'s own MC-1), `ftc-part1` (requires `definite-integral` +
`continuity`; differentiating an accumulation function recovers the
integrand; dummy-variable convention; chain-rule extension for composite
upper limits; MC-1 Type 4 notation-induced, MC-2 Type 5 instruction-induced
lower-limit-zero habit, MC-3 Type 1 overgeneralized simple-case substitution).
Fifth consecutive batch with zero Blueprint/KG metadata discrepancies.
`math.calc` reaches 24/76; Batch 42 (2026-09-12, 4 concepts, closing the
tightest-coupled subset of the 9-concept frontier available after Batch 41):
`volume-revolution` (requires `integral-area`; disk/washer/shell methods
for revolved solids; MC-1 Type 1 overgeneralizing the disk formula past its
touches-the-axis boundary condition, MC-2 Type 5 instruction-induced —
shell method simply undertaught relative to disk/washer), `ftc-part2`
(requires `ftc-part1` + `antiderivatives`; the Evaluation Theorem
$\int_a^b f\,dx=F(b)-F(a)$; MC-1 Type 4 notation-induced bracket-order
swap, MC-2 Type 1 overgeneralizing the indefinite integral's own $+C$
requirement, MC-3 Type 1 importing differentiation's single-point-evaluation
template), `arc-length` (requires `definite-integral` + `derivative-rules`,
cross-link `math.geom.differential-geometry-curves` substantively
incorporated via cross-link-probe mode; the Pythagorean-segment derivation
of $L=\int\sqrt{1+[f'(x)]^2}dx$; MC-1 Type 5 instruction-induced missing
connection to the Riemann-sum construction, MC-2 Type 2 perceptual —
slope alone feels sufficient to measure length, MC-3 Type 5, the identical
missing-connection mechanism as MC-1 recurring at the parametric-generalization
level; a genuine Blueprint/KG discrepancy found and resolved toward the KG:
`mastery_threshold` 0.8 (Blueprint) vs 0.7 (KG), `estimated_hours` 6
(Blueprint) vs 5 (KG) — MAMR unaffected, both give ⌈·×5⌉=4 by coincidence of
the ceiling function), `chain-rule` (requires `derivative-rules` +
`math.func.composition`; $(f\circ g)'(x)=f'(g(x))\cdot g'(x)$; MC-1 Type 1 —
the Blueprint's own declared foundational misconception, dropping the
inner-derivative factor, paralleling `derivative-rules`' own MC-2
COEFFICIENT-MULTIPLICATION-OMITTED — MC-2 Type 1 evaluating the outer
derivative at bare $x$ instead of at $g(x)$, MC-3 Type 1 misclassifying a
product as a composition, the mirror-image of `derivative-rules`' MC-3 and
`product-rule`'s MC-1; zero Blueprint/KG discrepancy, and resolves a
previously-open verification item — the Blueprint's stated
`unlocks: math.calc.implicit-differentiation` is confirmed to match the
live KG's own `unlocks` field exactly). 3 of 4 zero-discrepancy this batch
(the `arc-length` discrepancy breaks the five-consecutive-zero streak).
`math.calc` reaches 28/76; Batch 43 (2026-09-12, 4 concepts, all direct
children of Batch 42's `chain-rule`/`ftc-part2`): `derivative-exponential`
(requires `chain-rule` + `math.func.exponential-function`; $e^x$ self-
derivative vs. general-base $a^x\ln a$; MC-1 Type 1 overgeneralizing $e^x$'s
own special-case simplicity to every base, MC-2 Type 1 — the identical
mechanism as `chain-rule`'s own foundational MC-1, transplanted here),
`derivative-ln` (requires `chain-rule` + `math.func.logarithmic-function`;
$\ln x=1/x$ vs. general-base $\log_ax=1/(x\ln a)$; logarithmic
differentiation for products/quotients/variable powers; MC-1/MC-2 the
identical mechanisms as `derivative-exponential`'s own MC-1/MC-2, mirrored
across the inverse function), `implicit-differentiation` (requires
`chain-rule` only; every $y$-term needs the chain-rule factor $dy/dx$;
preferred even when explicit solving is possible; MC-1 Type 1 — the
Blueprint's own text explicitly names this as a direct transplant of
`chain-rule`'s own inner-derivative-missing misconception — MC-2 Type 5
instruction-induced, forgetting the genuinely-new algebraic collection
step since no prior differentiation task required one, MC-3 Type 5
instruction-induced, treating the technique as a last resort since it is
typically introduced only for equations that can't be solved explicitly),
`u-substitution` (requires `ftc-part2` + `chain-rule`; substitution as the
Chain Rule reversed; the mandatory $du$-verification step; definite-integral
bound conversion; MC-1 Type 1 overgeneralizing the substitution pattern past
its validity condition, the same scope-overextension shape as
`volume-revolution`'s own MC-1, MC-2 Type 4 notation-induced — bound numbers
carry no visible marker of which variable they belong to, MC-3 Type 1, the
identical mechanism as `derivative-rules`' own MC-2
COEFFICIENT-MULTIPLICATION-OMITTED). **All 4 concepts zero-discrepancy** —
a fresh streak restarting after Batch 42's `arc-length` broke the prior
five-consecutive-zero run. `math.calc` reaches 32/76) + 13 `math.graph.*` entries (**PARKED, opened 2026-09-12** — Batch 24 (2026-09-12,
3 concepts): `graph`, `tree`, `minimum-spanning-tree`; opened because every one of `math.disc`'s
own graph-theory entries had already named a `math.graph` sibling as a Blueprint-exists-no-EB-yet
cross-link; Batch 25 (2026-09-12, 4 concepts): `connectivity`, `eulerian-circuit`,
`hamiltonian-cycle`, `graph-coloring` — closing all 4 concepts left ready after Batch 24, one of
which (`graph-coloring`) corrected a stale Blueprint cross-link claim about its own
`math.disc.graph-coloring` sibling; Batch 26 (2026-09-12, 3 concepts): `graph-invariants`,
`graph-operations`, `matching` — closing 3 of the 6 concepts left ready after Batch 25; Batch 27
(2026-09-12, 3 concepts): `maximum-flow`, `ramsey-theory`, `extremal-graph-theory` — closing the
final 3 topologically-ready concepts, all Blueprint-grounded, reused by reference. math.graph is
now PARKED at 13/16: its remaining 3 concepts (`shortest-path`, `algebraic-graph-theory`,
`random-graph`) each require a cross-domain prerequisite outside math.graph that is not yet
authored). All
confirmed Quality Gate 3 heading-scheme violations found by this program have been repaired —
0 known violations remain in mathematics. See Delivery history for full per-concept lists and
misconception detail. |
| physics | 238 | 238 | **100% COMPLETE (2026-07-23).** pre-existing 67 (TEMPLATE.md-era) + 12 Wave 6 + 25 Wave 7 + 15 Wave 8 + 16 Wave 9 + 9 Wave 10 + 11 Wave 11 + 8 Wave 12 + 6 Wave 13 + 10 Wave 14 + 9 Wave 15 + 7 Wave 16 + 12 Wave 17 + 8 Wave 18 + 8 Wave 19 + 5 Wave 20 + 5 Wave 21 + 2 Wave 22 + 2 Wave 23 + 1 Wave 24 (FINAL): `phys.mod.diode-rectification` — every physics KG concept now has a full Educational Brain entry; see Delivery history for the full pre-existing-67, Wave-6 through Wave-23 name lists |
| english | 216 | 216 | **100% COMPLETE (2026-08-11).** 212/216 through Batch 29 (full per-batch narrative in git commit messages and prior revisions of this file), plus Batch 30 — FINAL BATCH (4, autonomous /loop, level-30 frontier BATCH COMPLETE: `eng.communication.professional-communication`, `eng.communication.presentation-design`, `eng.communication.editing-for-publication`, `eng.communication.negotiation-language` — the last of these the English KG's final terminal node). Every English KG concept now has a full 21-section Educational Brain entry. English is the fourth subject to reach 100% Educational Brain coverage, after physics and chemistry (both 2026-07-23/26) and mathematics (domain-by-domain, ongoing). |
| chemistry | 186 | 186 | **100% COMPLETE (2026-07-26).** Completion Loop 2026-07-25/26, batch 5 of 5: chem.poly.condensation, natural, biodegradable, properties authored, closing chem.poly to 5/5 (chem.poly.addition was already covered). Batches 1-4 closed chem.alc (6/6), chem.carb (7/7), chem.nitro (5/5), chem.bio (6/6) in that order. Every Chemistry KG concept now has a full 21-section Educational Brain entry, a fully authored 16-section Blueprint (`docs/curriculum/blueprints/chem.*.md`), and an authored Teaching Asset (`docs/chemistry/teaching-assets/assets.json`, status draft) — the stale 2026-07-23 note below claiming all-placeholder Blueprint content is corrected here. **Known bookkeeping gap (not corrected this batch):** `EDUCATIONAL_BRAIN_INDEX.md`, `AUTHORING_QUEUE.md`, and `QUALITY.md` were not regenerated for the 21 chemistry entries authored 2026-07-25/26 (chem.alc.epoxides/protection, chem.carb.ketones/carboxylic/alpha-reactions/derivatives/spectro/named-reactions, chem.nitro.amino-acids/diazonium/heterocycles, chem.bio.proteins/carbohydrates/lipids/enzyme-kinetics/nucleic-acids/vitamins, chem.poly.condensation/natural/biodegradable/properties) — those three registry files still show chemistry as 165/186 and should be regenerated from source in a future pass, per `PRODUCTION_PIPELINE.md`'s workflow. |
| biology | 108 | 0 | — (KG count 89→108 per the Pipeline's 2026-07-22 v2.0.0 freeze, a concurrent external change) |
| computer_science | 119 | 0 | — |

## Expansion protocol (the priority order for authoring)

Coverage grows in leverage order, not file order:

1. **Placement entry points first** — the concepts learners actually land on
   (the level-appropriate entry nodes per difficulty tier), because every
   learner meets them, and meets them at their most fragile (first sessions).
2. **Cut-nodes next** — concepts that gate the most downstream content
   (highest `unlocks` fan-out and highest betweenness on the prerequisite
   graph). A great entry on a cut-node improves every path through it.
3. **Misconception hubs** — concepts with rich documented misconception
   literatures (fractions, negatives, Newton's laws, equals sign, photosynthesis
   energetics, variable-as-object...). These are where authored knowledge
   most outperforms per-turn AI improvisation.
4. **Everything else in prerequisite order** — floors before what stands on
   them, matching how learners actually arrive.

This policy is applied concretely, per subject, in `ROADMAP.md`'s Priority
queue section — that is where "which concept is next" is computed from the
live KG; this section states the rule, not the current answer.

## Entry quality bar

The three original seed entries set the depth bar; the exact structural
contract they (and every entry since) must follow is now
**[`EDUCATIONAL_BRAIN_STANDARD.md`](EDUCATIONAL_BRAIN_STANDARD.md)**
(supersedes `TEMPLATE.md`, 2026-07-22) — read it before authoring the next
entry. An entry thinner than the bar is not merged; it is finished first.
Coverage counts only full-standard entries — partial entries are worse than
none because they read as "covered" to every future author and to the
retrieval engine. Per-entry completeness against the tracked fields is in
[`QUALITY.md`](QUALITY.md).

## Delivery history

- **Mathematics Phase 2 — `math.alg` Wave 1** (2026-08-12, batch 2 of the mathematics-completion
  session). Authored the 11 concepts occupying topological levels 0–2 of the `math.alg` dependency
  graph, computed programmatically from the live KG rather than chosen by hand: level 0 —
  `expression`; level 1 — `equation`, `term`, `exponent-rules`, `polynomial`; level 2 —
  `coefficient`, `degree`, `inequality`, `solution-set`, `zero-exponent`, `negative-exponent`.
  (`binomial-theorem` and `exponential-function` are also level 2 but were deferred: each has an
  out-of-domain unauthored prerequisite — `math.disc.combinations` and `math.func.function-concept`
  respectively — and neither is a bounded excursion.) All 11 have existing Blueprints, all reused
  by reference: misconception registries cited by ID with birth-type classification added, worked
  examples / teaching-action scripts / mastery-gate item sets never restated.
  **One domain-level Curriculum Feedback finding, recorded six times across the batch and
  consolidated here rather than repeated as six defects**: `math.alg` repeatedly pairs a large
  parent node with one or more small child nodes whose content the parent's own Blueprint already
  teaches in full — `exponent-rules` (6h) against `zero-exponent`/`negative-exponent`/
  `fractional-exponent` (1–2h each); `polynomial` (10h) against `degree` (1h); `equation` (4h)
  against `solution-set` (2h); `inequality` against `inequality-1var`. In every case the Blueprints
  resolve the overlap sensibly in prose (parent derives, child owns edge cases and a narrower
  Bloom target), and in every case the division is invisible from the KG descriptions alone, so a
  reader of the KG would judge the child nodes redundant. Recommended to the Curriculum Production
  Pipeline as a domain-wide description review. Two further findings: `math.alg.term` lists
  `unlocks: []` while `math.alg.coefficient` lists `requires: ['math.alg.term']`, breaking the
  requires/unlocks mirror this graph otherwise maintains; and `cross_links: []` on
  `exponent-rules`, `negative-exponent` and `inequality` is a genuine omission rather than an
  accurate emptiness — negative exponents are the notation of every derived physical unit, and the
  strict/non-strict inequality distinction is the off-by-one bug class in computing. None fixed;
  no KG file was modified. Mathematics 245 → **256/908**; `math.alg` 0/59 → **11/59, IN PROGRESS**.
  Validation: 256 EB files, 0 orphans, 0 duplicates, 0 unresolvable filenames, 0 Quality Gate 3
  violations across all `math.alg` entries; `npx tsc --noEmit` clean; full suite 304 files / 6,536
  passed / 9 skipped (one intermittent failure appeared on a single run and did not reproduce
  across two subsequent full runs — recorded honestly rather than suppressed). No KG file, no
  non-mathematics content, and no runtime code touched.
- **Mathematics Phase 1 — `math.nt` tail, DOMAIN CERTIFIED** (2026-08-12, batch 1
  of the mathematics-completion session). Reconciliation first, per instruction:
  every branch whose name begins `math`/`mathematics` was compared by *content*
  rather than by git ancestry (`git ls-tree -r` against
  `educational-brain/concepts/mathematics/`), because this repository has
  orphan-rewritten history. Result: **no branch-only Educational Brain work
  exists.** `origin/claude/math-audit-all-branches-j7zk0l` holds exactly the same
  237 files as `main`; `claude/math-inventory-audit-bktjvx` and
  `origin/claude/math-blueprints-continue-bh26fl` hold 224 each, a strict subset
  (they predate `0d2c76dd`'s `math.geom` recovery);
  `origin/claude/math-linalg-curriculum-34wonr` holds 1 and is the stale snapshot
  the branch policy already records as archived. No branch was merged and nothing
  was recovered, because there was nothing to recover — `main` is the superset.
  Housekeeping: the two stale `math.alg.variable` references in
  `docs/curriculum/blueprints/math.func.function-concept.md` (lines 178, 1265)
  were verified against the live KG as genuinely incorrect — no `math.alg.variable`
  node exists, `math.found.variable` does — and corrected in place; nothing else
  in that Blueprint was touched. Authored: the 8 concepts that closed the domain —
  `prime-distribution`, `continued-fractions`, `analytic-number-theory`,
  `prime-number-theorem`, `riemann-hypothesis`, `algebraic-number-theory`,
  `algebraic-integers`, `number-fields`. All 8 had existing Blueprints, reused by
  reference (misconception registries cited with birth-type classification added;
  worked examples, teaching-action scripts and mastery-gate item sets never
  restated). Three genuine Curriculum Feedback findings, recorded not fixed: (1) the
  `algebraic-number-theory` → `algebraic-integers` → `number-fields` cluster has
  prerequisite edges running *opposite* to its logical build order — the first node's
  own learning objectives define 𝒪_K as the algebraic integers in K, which is the
  second node's content — so a learner following the KG's edges meets the synthesis
  before either component; recorded once as a cluster-level finding rather than three
  times, and all three entries were written self-contained enough to survive any
  ordering. (2) `prime-distribution` / `analytic-number-theory` /
  `prime-number-theorem` are three research-level nodes on adjacent ground whose
  distinctness is not visible from the KG descriptions alone — the
  `prime-number-theorem` Blueprint had to introduce a misconception (its MC-3) purely
  to defend its own node's right to exist, which is a signal about node boundaries
  rather than about the Blueprint. (3) `riemann-hypothesis` carries
  `estimated_hours: 100`, the largest value in the mathematics KG, against a gate of
  three status-sorting items — the figure appears to price the subject rather than the
  achievable objective. Also corrected: the `continued-fractions` Blueprint's
  Component 8 states `estimated_hours = 6` while the KG states 10; the KG is
  authoritative per the standing rule and is what the entry records. **`math.nt`
  36/36 — DOMAIN CERTIFIED**, the fourth mathematics domain certified after
  `math.found`, `math.arith` and `math.geom`. Mathematics 237 → **245/908**.
  Validation: 245 EB files, 0 orphans, 0 duplicates, 0 filenames failing to resolve
  to a live KG id, 0 Quality Gate 3 heading violations across all `math.nt` entries
  (all 21 canonical headings, exact order); `npx tsc --noEmit` clean; full suite 304
  files / 6,536 passed / 9 skipped. No KG file, no Physics/Chemistry/English/Biology/
  Computer Science content, and no runtime code touched.
- **Delivery 5** (2026-07-10): integration layer authored (README, TEMPLATE,
  this manifest) + 3 seed entries, one per live-curriculum subject, each
  anchored to a verified canonical KG node.
- **Physics blueprint production** (2026-07-13): physics domain expansion begins;
  batches 1–5 complete: `phys.meas.units`, `phys.meas.scalars-vectors`, `phys.meas.dimensions`,
  `phys.meas.errors`, `phys.meas.significant-figures`, `phys.meas.vector-addition`,
  `phys.meas.vector-products`, `phys.meas.unit-conversion`, `phys.mech.displacement`,
  `phys.mech.velocity`, `phys.mech.acceleration`, `phys.mech.kinematics-1d`,
  `phys.mech.newtons-first-law`, `phys.mech.force`, `phys.mech.kinematics-2d`,
  `phys.mech.projectile-motion` (16/194 concepts); batch 6: `phys.therm.temperature`,
  `phys.wave.wave-properties`, `phys.em.electric-charge` (19/194 concepts);
  batch 7: `phys.therm.zeroth-law`, `phys.therm.thermal-expansion`, `phys.therm.heat-transfer`
  (22/194 concepts); batch 8: `phys.wave.transverse-waves`, `phys.wave.longitudinal-waves`,
  `phys.wave.sound-waves` (25/194 concepts); batch 9: `phys.opt.nature-of-light`,
  `phys.em.coulombs-law`, `phys.em.electric-current` (28/194 concepts);
  batch 10: `phys.therm.ideal-gas-law`, `phys.therm.specific-heat`,
  `phys.wave.wave-speed` (31/194 concepts);
  batch 11: `phys.em.electric-field`, `phys.em.magnetic-field`,
  `phys.opt.reflection` (34/194 concepts);
  batch 12: `phys.opt.refraction`, `phys.opt.wave-optics`,
  `phys.wave.doppler-effect` (37/194 concepts);
  batch 13: `phys.wave.sound-intensity`, `phys.em.electric-dipole`,
  `phys.em.gauss-law` (40/194 concepts);
  batch 14: `phys.em.magnetic-flux`, `phys.em.magnetic-force`,
  `phys.em.magnetic-materials` (43/194 concepts);
  batch 15: `phys.therm.kinetic-theory`, `phys.therm.calorimetry`,
  `phys.wave.superposition` (46/194 concepts);
  batch 16: `phys.opt.mirrors`, `phys.opt.total-internal-reflection`,
  `phys.opt.lenses` (49/194 concepts);
  batch 17: `phys.opt.dispersion`, `phys.opt.polarization`,
  `phys.mech.newtons-second-law` (52/194 concepts);
  batch 18: `phys.therm.internal-energy`, `phys.therm.phase-transitions`,
  `phys.wave.interference` (55/194 concepts);
  batch 19: `phys.opt.lens-power`, `phys.opt.brewsters-law`,
  `phys.em.electric-potential` (58/194 concepts);
  batch 20: `phys.em.biot-savart`, `phys.em.magnetic-dipole`,
  `phys.em.faradays-law` (61/194 concepts);
  batch 21: `phys.mech.relative-motion`, `phys.mech.circular-motion`,
  `phys.mech.newtons-third-law` (64/194 concepts);
  batch 22: `phys.mech.free-body-diagram`, `phys.mech.work`,
  `phys.mech.momentum` (67/194 concepts, snapshot count now stale — see
  physics row above, corrected to 238).
- **Curriculum Completion Program, batch 1** (2026-07-22): first batch
  under the new incremental-program workflow (see CLAUDE.md's
  "Curriculum Completion Program" section for the governance framing).
  Authored `eng.phonics.print-concepts` — the coverage gap
  `eng.phonics.phonemic-awareness.md`'s own Curriculum feedback section
  had already flagged by name as the next priority (English's other
  zero-prerequisite entry node). Also corrected two stale bookkeeping
  errors found while establishing this batch's baseline: (1) this
  manifest undercounted English at 1 entry when `phonemic-awareness`
  (Delivery 14) had already been authored and never added to this table
  — corrected to reflect both pre-existing entries; (2) physics's "KG
  concepts" column read 194, a snapshot that predates this session's
  Particle Physics + Semiconductor Physics KG additions (216→238) —
  corrected; the 67-entry batch counts above are left as their original
  historical record (each batch total was accurate against the KG size
  at the time it was written) rather than rewritten. No physics entries
  were added this batch — this correction is bookkeeping only.
  Cross-checked against the existing Blueprint
  (`docs/curriculum/blueprints/eng.phonics.print-concepts.md`, already
  authored by the Curriculum Production Pipeline) to avoid duplicating
  its misconception register and worked examples — the new entry reuses
  that content by reference and adds the deeper reasoning layers
  (mental models, birth-type misconception classification, analogy
  library with breaking points, discovery-lesson argument, teaching
  action dispatch, voice teaching, transfer map) that the Blueprint
  format does not carry. Quality-bar entries: 3/216 English concepts.
- **Curriculum Completion Program, batch 2 — production framework**
  (2026-07-22): no new concept entries authored (deliberately — this
  batch's deliverable was the framework itself). Reviewed a
  representative sample of the 71 existing entries across all 3 subjects
  and batches, found real heading-style drift (numbered vs. unnumbered
  sections, beginning somewhere between physics batches 12 and 17) and a
  genuine duplication risk (all 71 entries' concepts already have a
  Blueprint, and existing "Assessment" sections were not yet scoped
  narrowly against that overlap). Produced `EDUCATIONAL_BRAIN_STANDARD.md`
  (the new 21-section canonical authoring contract, superseding
  `TEMPLATE.md`, which now just points to it), `ROADMAP.md` (computed
  totals: 1,756 KG concepts across 6 subjects, 71 authored, 4.04%
  complete, plus an evidence-based priority queue — mathematics' own
  zero-prerequisite entry node, `math.found.mathematical-thinking`, has
  never been authored, ranked above chemistry/biology/computer_science's
  equally-uncovered entry points only by mathematics's much larger total
  concept count), and `QUALITY.md` (a generated per-entry completeness
  ledger for all 71 existing entries, with one flagged self-limitation
  in its own detection script rather than a silently "corrected" number).
  No existing entries were rewritten to the new Standard — reconciliation
  is tracked as separate future work, not retroactively applied.
- **Curriculum Completion Program, batch 3 — pipeline validation and
  indexing** (2026-07-22): no new concept entries authored (deliberately
  — this batch's deliverable was validating and indexing the pipeline
  before large-scale authoring begins). Re-ran the KG validator against
  all 6 subjects (first time biology and computer_science were checked
  this session) — all 6 PASS, 0 failures, 100% reachable. Generated
  `EDUCATIONAL_BRAIN_INDEX.md` (1,756 rows, one per KG concept across all
  6 subjects, with Blueprint/EB/Status columns), found 0 orphan EB files,
  0 duplicate EB files, 0 broken KG references. Found 2 unresolvable
  cross-links: `math.de.ode`'s is a recognized aspirational placeholder
  (not a defect), `chem.atomic.electromagnetic-radiation`'s is a genuine
  broken reference (points to a nonexistent physics slug) — recorded as
  Curriculum Feedback in `VALIDATION_REPORT.md`, not fixed (this batch
  does not modify any Canonical Knowledge Graph). Computed root/
  intermediate/terminal breakdown and a full topological-order
  `AUTHORING_QUEUE.md` (1,685 rows — every MISSING concept, priority 1
  onward, purely graph-derived: level-by-level, subjects interleaved in
  a fixed order, no manual ordering). Produced `QUALITY_GATES.md` (8
  mandatory pre-acceptance checks) and `PRODUCTION_PIPELINE.md`
  (Phase 4's batch-selection algorithm, documented not automated, plus
  the Phase 6 frozen workflow: select → author → validate → update
  INDEX/ROADMAP/QUALITY/COVERAGE → commit → push). Verdict: no blocking
  defect found; production workflow declared FROZEN.
- **Curriculum Completion Program, batch 4 — Domain Certification Mode,
  math.found Wave 1** (2026-07-22): first batch under the new
  one-domain-at-a-time discipline. Authored 5 concepts in strict
  topological order — the domain root `math.found.mathematical-thinking`
  (level 0) and all 4 of its direct level-1 children (`abstraction`,
  `pattern-recognition`, `problem-solving`, `mathematical-language`) —
  every one already grounded in an existing, richly-detailed Blueprint
  (all 5 have Blueprints in `docs/curriculum/blueprints/`). Each entry
  reuses its Blueprint's Misconception Registry and Student State
  Protocols by reference rather than restating them, and adds the
  deeper reasoning layers a Blueprint doesn't carry (Core Understanding,
  Mental Models with shelf-life triggers, birth-type-classified
  misconceptions, anti-analogies, Teaching Sequence reasoning, Transfer
  Connections). All 5 entries conform exactly to
  `EDUCATIONAL_BRAIN_STANDARD.md`'s 21-section structure (verified via
  heading scan). `math.found` is 5/82 concepts — genuinely IN PROGRESS,
  not certified or frozen; 77 concepts remain in strict prerequisite
  order before this domain is complete. No other domain or subject was
  started. `EDUCATIONAL_BRAIN_INDEX.md`, `AUTHORING_QUEUE.md`,
  `ROADMAP.md`, and `QUALITY.md` regenerated from source; re-validated
  0 orphans, 0 duplicates across all 76 entries.
- **Curriculum Completion Program, batch 5 — Domain Certification Mode,
  math.found Wave 2** (2026-07-22): authored the 8 concepts whose
  prerequisites became fully satisfied after Wave 1 — `definition`,
  `generalization`, `inductive-reasoning`, `logic`,
  `mathematical-modeling`, `mathematical-notation`,
  `mathematical-symbols`, `problem-solving-strategies` (determined
  programmatically from the live KG + EB directory, not manually
  chosen). Of these, 3 (`generalization`, `logic`,
  `mathematical-notation`) had existing Blueprints reused by reference;
  5 had none, stated explicitly in each entry's Blueprint References
  section per Quality Gate 2 rather than silently omitted, with
  misconceptions authored directly via the birth-taxonomy diagnostic
  procedure. One genuine Curriculum Feedback finding: `mathematical-
  notation` and `mathematical-symbols` have unusually close KG
  descriptions, identical prerequisites, and identical Bloom level —
  recorded honestly as a possible future KGCS merge-criteria review, not
  fixed (no Canonical KG file modified). All 8 entries verified against
  `EDUCATIONAL_BRAIN_STANDARD.md`'s exact 21-section structure. `math.found`
  is 13/82 — still genuinely IN PROGRESS; 69 concepts remain. No other
  domain or subject was started. All five tracking files regenerated
  from source; re-validated 0 orphans, 0 duplicates across all 84
  entries.
- **Curriculum Completion Program, batch 6 — Domain Certification Mode,
  math.found Wave 3** (2026-07-22): authored the 6 concepts whose
  prerequisites became fully satisfied after Wave 2 — `axiom`,
  `deductive-reasoning`, `proposition`, `reading-mathematics`,
  `set-theory`, `variable` (determined programmatically from the live
  KG + EB directory against the live KG's `requires` edges; matched the
  Domain Certification Mode prompt's own expected candidate list
  exactly). Of these, 5 (`axiom`, `deductive-reasoning`, `proposition`,
  `set-theory`, `variable`) had existing Blueprints reused by
  reference — each entry cites the Blueprint's Misconception Registry
  by MC number with birth-type classification added, never restating
  worked examples or mastery probes; 1 (`reading-mathematics`) had none,
  stated explicitly in its Blueprint References section per Quality
  Gate 2, with 3 misconceptions authored directly via the birth-taxonomy
  diagnostic procedure. The open `mathematical-notation`/`mathematical-
  symbols` Curriculum Feedback item from Wave 2 is explicitly carried
  forward, unresolved, per this batch's own SPECIAL REVIEW instruction —
  not modified, not merged, still an open KGCS review item until
  math.found reaches 82/82. All 6 entries verified against
  `EDUCATIONAL_BRAIN_STANDARD.md`'s exact 21-section structure and
  heading order (`grep "^## "` diffed against the canonical order for
  every file). `math.found` is 19/82 — still genuinely IN PROGRESS; 63
  concepts remain (Wave 4 candidates already computed:
  `axiomatic-system`, `logical-connectives`, `predicate`, `set`). No
  other domain or subject was started. All six tracking files
  regenerated from source; re-validated 0 orphans, 0 duplicates, 0
  broken KG references, 0 invalid Blueprint references across all 90
  entries.
- **Curriculum Completion Program, batch 7 — Domain Certification Mode,
  math.found Wave 4** (2026-07-22): authored the 4 concepts whose
  prerequisites became fully satisfied after Wave 3 — `axiomatic-
  system`, `logical-connectives`, `predicate`, `set` (verified
  programmatically against the live KG's `requires` edges, matching the
  Domain Certification Mode prompt's own expected candidate list
  exactly). All 4 had existing Blueprints reused by reference — each
  entry cites the Blueprint's Misconception Registry by MC number with
  birth-type classification added, never restating worked examples,
  transfer probes, or mastery gates. One new genuine Curriculum
  Feedback finding, recorded honestly rather than silently resolved:
  `math.found.set`'s own Misconception Register (order/repetition,
  ∅-vs-{∅}) substantially overlaps `math.found.set-theory`'s own
  MC-2/MC-4/MC-1 — both Blueprints were authored independently and
  converge on nearly identical trigger examples; this entry resolved the
  distinction as a definitional-recognition floor (`set`, remember,
  0.90 threshold) versus operational fluency (`set-theory`, understand,
  0.80 threshold), a defensible split per the KG's own prerequisite
  edge, but flagged the misconception-content duplication for the
  Curriculum Production Pipeline's future consideration — no Canonical
  KG file or Blueprint modified. The open `mathematical-notation`/
  `mathematical-symbols` item from Wave 2 remains carried forward
  unresolved. All 4 entries verified against
  `EDUCATIONAL_BRAIN_STANDARD.md`'s exact 21-section structure and
  heading order. `math.found` is 23/82 — still genuinely IN PROGRESS; 59
  concepts remain (Wave 5 candidates already computed:
  `cartesian-product`, `empty-set`, `ordered-pair`, `predicate-logic`,
  `set-builder-notation`, `set-membership`, `set-theory-axiomatic`,
  `truth-table`). No other domain or subject was started. All six
  tracking files regenerated from source; re-validated 0 orphans, 0
  duplicates, 0 broken KG references, 0 invalid Blueprint references
  across all 94 entries.
- **Curriculum Completion Program, batch 8 — Domain Certification Mode,
  math.found Wave 5** (2026-07-22): authored the 8 concepts whose
  prerequisites became fully satisfied after Wave 4 — `cartesian-
  product`, `empty-set`, `ordered-pair`, `predicate-logic`, `set-
  builder-notation`, `set-membership`, `set-theory-axiomatic`,
  `truth-table` (verified programmatically against the live KG's
  `requires` edges, matching the Domain Certification Mode prompt's own
  expected candidate list exactly). 7 of the 8 had existing Blueprints
  reused by reference — each entry cites the Blueprint's Misconception
  Registry by MC number with birth-type classification added, never
  restating worked examples, transfer probes, or mastery gates; 1
  (`empty-set`) had none, stated explicitly, with 2 of its 3
  misconceptions authored directly via the birth-taxonomy diagnostic
  procedure and the 3rd (∅-vs-{∅}) cited by reference from `set-theory`/
  `set` rather than re-derived. One new genuine Curriculum Feedback
  finding, recorded honestly: the ∅-vs-{∅} confusion is now registered
  in THREE Educational Brain entries (`set-theory`'s MC-1, `set`'s MC-3,
  `empty-set`'s MC-3) — a structural consequence of ∅'s genuine
  relevance to all three KG nodes, not an authoring error, but
  strengthening the case (already raised in `set`'s own Wave 4
  Curriculum Feedback) for a clearer per-node ownership split at a
  future Blueprint revision — no Canonical KG file or Blueprint
  modified. A second, informational-only note: `predicate-logic`'s
  quantifier-negation misconception (MC-2) and `truth-table`'s
  connective-negation misconception (MC-3), both authored this same
  Wave, are structurally related (both are De Morgan's-law applications)
  but genuinely distinct — flagged for a future cross-reference, not a
  duplication. The open `mathematical-notation`/`mathematical-symbols`
  item from Wave 2 remains carried forward unresolved. All 8 entries
  verified against `EDUCATIONAL_BRAIN_STANDARD.md`'s exact 21-section
  structure and heading order. `math.found` is 31/82 — still genuinely
  IN PROGRESS; 51 concepts remain (Wave 6 candidates already computed:
  `logical-equivalence`, `ordinal-number`, `quantifiers`, `relation`,
  `subset`). No other domain or subject was started. All six tracking
  files regenerated from source; re-validated 0 orphans, 0 duplicates,
  0 broken KG references, 0 invalid Blueprint references across all 102
  entries. A concurrent commit (`52ed09e`, CS Explanation Memory asset
  seeding, `src/lib/teaching/assets/csSeedAssets.ts` only) landed on
  `origin/main` during this batch — verified zero file overlap with this
  program's own files before rebasing; no KG file was touched by that
  commit, so no further reconciliation was required.
- **Curriculum Completion Program, batch 9 — Physics Wave 6 (explicit
  user-directed exception to the standing math.found-first default)**
  (2026-07-22): a direct, explicit user instruction ("audit Physics
  Educational Brain, verify exactly which 67 already exist, then continue
  authoring the remaining Educational Brain concepts in strict
  prerequisite/topological order") redirected this batch specifically to
  the physics subject, overriding math.found's standing priority for this
  one batch only — `math.found` was NOT touched and remains 31/82,
  IN PROGRESS, the default target for any future batch without an
  equally explicit override. Audit first: fetched and rebased onto latest
  `origin/main` (one new commit, `d8401bae`, CS Explanation Memory
  completion, zero file overlap with physics), then verified
  programmatically (not by inspection) that exactly 67 physics
  `educational-brain/concepts/physics/*.md` files exist, that they have
  zero overlap with `AUTHORING_QUEUE.md`'s 171 physics rows, and that the
  union of both sets equals exactly the physics KG's 238 concepts —
  confirming `AUTHORING_QUEUE.md` was already current against the KG
  extension (216→238) and needed no recomputation before authoring began.
  Authored the complete Wave 6 (12 concepts, dependency level 6, the
  first physics level with any missing concepts) — every concept
  verified to have all prerequisites already `READY`:
  `phys.mech.universal-gravitation`, `phys.mech.hookes-law`,
  `phys.mech.pressure-fluids`, `phys.wave.standing-waves`,
  `phys.wave.beats`, `phys.opt.optical-instruments`,
  `phys.opt.youngs-experiment`, `phys.em.capacitance`, `phys.em.ohms-law`,
  `phys.em.amperes-law`, `phys.em.lenzs-law`, `phys.em.self-inductance`.
  All 12 had existing Blueprints (`docs/curriculum/blueprints/{id}.md`,
  Component-format) reused by reference — each entry cites its
  Blueprint's Misconception Engine/Register/Profile by name with
  birth-type classification added (never re-deriving probe/bridge/
  replacement text), plus its session-script and assessment-probe
  components, never restating worked examples or full item banks. All 12
  entries verified against `EDUCATIONAL_BRAIN_STANDARD.md`'s exact
  21-section structure and heading order (`grep "^## "` diffed against
  the canonical order for every file — 0 mismatches). Six genuine
  Curriculum Feedback findings recorded (not fixed, no KG file modified):
  every one of the 12 concepts has an empty KG `cross_links` array despite
  a genuine, identifiable cross-subject or cross-domain connection in 11
  of the 12 cases (mathematics' inverse-square functions for
  `universal-gravitation`; chemistry's molecular bond vibration models for
  `hookes-law`; biology's blood-pressure gradients for `pressure-fluids`;
  mathematics' Fourier analysis for `standing-waves`; music theory for
  `beats`; biology's eye anatomy for `optical-instruments`; computer
  science's digital/semiconductor circuits for `ohms-law`; mathematics'
  vector calculus for `amperes-law`; chemistry's Le Chatelier's principle
  for `lenzs-law`; mathematics' differential equations for
  `self-inductance`) — `youngs-experiment` alone was assessed as
  genuinely having no strong cross-subject connection at this curriculum
  level, an honest "weak but real" conclusion, not a fabricated link.
  `phys.em.ohms-law`'s KG-recorded hub status (4 direct `unlocks`, the
  most of any concept in this wave) was verified against the live KG and
  reflected in its Identity section. `physics` is now 79/238 (159
  concepts remain); Wave 7 (the next dependency level with newly-eligible
  concepts) was NOT computed or started this batch, per the standing
  one-bounded-batch-per-turn discipline — a full level-6 wave is one
  complete, coherent batch. All six tracking files
  (`EDUCATIONAL_BRAIN_INDEX.md`, `AUTHORING_QUEUE.md`, `ROADMAP.md`,
  `QUALITY.md`, `COVERAGE.md`, `VALIDATION_REPORT.md`) regenerated from
  source; re-validated 0 orphans, 0 duplicates, 0 broken KG references, 0
  invalid Blueprint references across all 114 entries.

- **Curriculum Completion Program, batch 10 — Physics Wave 7 (second
  explicit user-directed exception, mandatory-rules cycle)** (2026-07-23):
  a second, direct, explicit user instruction — an 11-point numbered set
  of mandatory rules for continuing Physics Educational Brain production
  — again redirected this batch specifically to physics, overriding
  `math.found`'s standing priority for this batch only. `math.found` was
  NOT touched and remains 31/82, IN PROGRESS. Audit first (per mandatory
  rule 1/2, "never trust previous reports"): `git fetch origin &&
  git checkout main && git pull origin main` revealed `main` had only 67
  physics EB files — the entire prior session's Wave 6 work (22
  blueprints + 12 EB entries) had never actually been merged, only
  existed on the feature branch `claude/physics-blueprint-audit-x8usq8`.
  Checked for file conflicts (none), rebased the branch onto latest
  `origin/main`, fast-forward-merged into `main` (`d3bce523..db424458`),
  and pushed `main` directly — establishing the TRUE starting point,
  79/238, before authoring anything. Re-audited again: independently
  recomputed dependency levels via a fresh Kahn's-algorithm pass over the
  live KG's `requires` edges (not trusting `AUTHORING_QUEUE.md`'s stored
  levels blindly) and confirmed the level-7 set matched the queue's
  stored rows exactly — 25 concepts, the full level. Authored all 25:
  `phys.mech.friction`, `phys.mech.tension`, `phys.mech.normal-force`,
  `phys.mech.kinetic-energy`, `phys.mech.potential-energy`,
  `phys.mech.power`, `phys.mech.impulse`, `phys.mech.center-of-mass`,
  `phys.mech.angular-kinematics`, `phys.mech.gravitational-field`,
  `phys.mech.stress-strain`, `phys.mech.buoyancy`,
  `phys.mech.surface-tension`, `phys.therm.first-law`, `phys.wave.shm`,
  `phys.opt.diffraction`, `phys.em.dielectrics`,
  `phys.em.energy-capacitor`, `phys.em.resistivity`,
  `phys.em.dc-circuits`, `phys.em.electrical-power`, `phys.em.solenoid`,
  `phys.em.mutual-inductance`, `phys.em.ac-basics`,
  `phys.em.maxwells-equations`. All 25 had existing Blueprints
  (Component-format) reused by reference — each entry cites its
  Blueprint's Misconception Engine/Register by name with birth-type
  classification added, never re-deriving probe/bridge/replacement text
  or restating worked examples/full item banks. All 25 entries verified
  against `EDUCATIONAL_BRAIN_STANDARD.md`'s exact 21-section structure
  and heading order (0 mismatches), zero duplicate filenames/concept IDs,
  zero orphans against the live physics KG (all 104 physics EB files map
  to a valid KG id). A concurrent commit set landed on `origin/main`
  mid-batch (`806eb9b5`/`95d6e44a`/`ff07c8cc` — lesson-history-restore
  fix, 22 physics brain-package artifacts, Prisma pool sizing) — verified
  zero file overlap with this batch's work, merged cleanly. Physics KG
  re-validated: PASS, 238/238 reachable, 0 failures/warnings — no KG file
  was touched. `physics` is now 104/238 (134 concepts remain); Wave 8
  (dependency level 8, 15 concepts — `phys.mech.inclined-plane` through
  `phys.em.electromagnetic-waves`) is computed and next, but NOT started
  this batch, per the mandatory-rules cycle's "batch, validate, report,
  then re-audit before continuing" discipline. All six tracking files
  regenerated from source; re-validated 0 orphans, 0 duplicates, 0 broken
  KG references, 0 invalid Blueprint references across all 139 entries.

- **Curriculum Completion Program, batch 11 — Physics Wave 8 (mandatory-
  rules cycle continuation)** (2026-07-23): the same mandatory-rules
  production cycle continued immediately after Wave 7 within the same
  conversation, per rule 10's "fetch, re-audit, continue" discipline.
  Re-fetched `origin/main` after the Wave 7 push and confirmed 0 commits
  ahead/behind before starting — no other session had touched physics EB
  concurrently. `math.found` was NOT touched and remains 31/82.
  Independently recomputed dependency levels via a fresh Kahn's-algorithm
  pass over the live KG's `requires` edges — the level-8 set (15
  concepts) matched `AUTHORING_QUEUE.md`'s stored rows exactly, zero
  discrepancy. Authored all 15: `phys.mech.inclined-plane`,
  `phys.mech.work-energy-theorem`, `phys.mech.conservation-of-energy`,
  `phys.mech.conservation-of-momentum`, `phys.mech.torque`,
  `phys.mech.gravitational-potential`,
  `phys.therm.thermodynamic-processes`, `phys.wave.shm-energy`,
  `phys.wave.pendulum`, `phys.wave.spring-mass`, `phys.opt.single-slit`,
  `phys.em.kirchhoffs-laws`, `phys.em.emf`, `phys.em.lc-circuits`,
  `phys.em.electromagnetic-waves`. All 15 had existing Blueprints
  (Component-format) reused by reference — each entry cites its
  Blueprint's Misconception Engine/Register by name with birth-type
  classification added, never re-deriving probe/bridge/replacement text.
  `phys.opt.single-slit` cited all 4 of its Blueprint's documented
  misconceptions (matching the same 4-misconception density already
  established for its sibling `phys.opt.diffraction` in Wave 7) rather
  than the more typical 2. All 15 entries verified against
  `EDUCATIONAL_BRAIN_STANDARD.md`'s exact 21-section structure and
  heading order (0 mismatches), zero duplicate filenames/concept IDs,
  zero orphans against the live physics KG (all 119 physics EB files map
  to a valid KG id). Physics KG re-validated: PASS, 238/238 reachable, 0
  failures/warnings — no KG file was touched. `physics` is now exactly
  119/238 — 50.00% complete, the halfway point of the subject. Wave 9
  (dependency level 9, 16 concepts — `phys.mech.conservative-forces`
  through `phys.rel.postulates`) is computed and next, but NOT started
  this batch. All six tracking files regenerated from source;
  re-validated 0 orphans, 0 duplicates, 0 broken KG references, 0
  invalid Blueprint references across all 154 entries.

- **Curriculum Completion Program, batch 12 — Physics Wave 9 (mandatory-
  rules cycle continuation)** (2026-07-23): the same mandatory-rules
  production cycle continued immediately after Wave 8 within the same
  conversation, per rule 10's "fetch, re-audit, continue" discipline.
  Re-fetched `origin/main` after the Wave 8 push and confirmed 0 commits
  ahead/behind before starting — no other session had touched physics EB
  concurrently. `math.found` was NOT touched and remains 31/82.
  Independently recomputed dependency levels via a fresh Kahn's-algorithm
  pass over the live KG's `requires` edges — the level-9 set (16
  concepts) matched `AUTHORING_QUEUE.md`'s stored rows exactly, zero
  discrepancy. Authored all 16: `phys.mech.conservative-forces`,
  `phys.mech.collisions-elastic`, `phys.mech.collisions-inelastic`,
  `phys.mech.moment-of-inertia`, `phys.mech.equilibrium`,
  `phys.mech.orbital-mechanics`, `phys.mech.escape-velocity`,
  `phys.mech.bernoulli`, `phys.therm.second-law`,
  `phys.therm.heat-engines`, `phys.wave.damped-oscillations`,
  `phys.em.wheatstone-bridge`, `phys.em.potentiometer`,
  `phys.em.rc-circuits`, `phys.mod.photoelectric-effect`,
  `phys.rel.postulates`. All 16 had existing Blueprints (Component-format)
  reused by reference — each entry cites its Blueprint's Misconception
  Engine/Register by name with birth-type classification added, never
  re-deriving probe/bridge/replacement text. `phys.mod.photoelectric-effect`
  and `phys.rel.postulates` each cited all 4 of their Blueprint's
  documented misconceptions (matching the 4-misconception density pattern
  already established for `phys.opt.diffraction`/`phys.opt.single-slit`
  in Waves 7-8). This wave introduced the first Modern Physics
  (`phys.mod.photoelectric-effect`) and Relativity (`phys.rel.postulates`)
  domain entries in this program — both entry points reached via the
  classical-electromagnetism capstone (`phys.em.electromagnetic-waves`,
  Wave 8) and, for relativity, classical mechanics' relative-motion
  concept. All 16 entries verified against
  `EDUCATIONAL_BRAIN_STANDARD.md`'s exact 21-section structure and
  heading order (0 mismatches), zero duplicate filenames/concept IDs,
  zero orphans against the live physics KG (all 135 physics EB files map
  to a valid KG id). Physics KG re-validated: PASS, 238/238 reachable, 0
  failures/warnings — no KG file was touched. `physics` is now 135/238 —
  56.72% complete. Wave 10 (dependency level 10, 9 concepts —
  `phys.mech.rotational-dynamics` through `phys.rel.simultaneity`) is
  computed and next, but NOT started this batch. All six tracking files
  regenerated from source; re-validated 0 orphans, 0 duplicates, 0 broken
  KG references, 0 invalid Blueprint references across all 170 entries.

- **Curriculum Completion Program, batch 13 — Physics Wave 10 (mandatory-
  rules cycle continuation)** (2026-07-23): the same mandatory-rules
  production cycle continued immediately after Wave 9 within the same
  conversation, per rule 10's "fetch, re-audit, continue" discipline.
  Re-fetched `origin/main` after the Wave 9 push and confirmed 0 commits
  ahead/behind before starting — no other session had touched physics EB
  concurrently. `math.found` was NOT touched and remains 31/82.
  Independently recomputed dependency levels via a fresh Kahn's-algorithm
  pass over the live KG's `requires` edges — the level-10 set (9
  concepts) matched `AUTHORING_QUEUE.md`'s stored rows exactly, zero
  discrepancy. Authored all 9: `phys.mech.rotational-dynamics`,
  `phys.mech.keplers-laws`, `phys.mech.satellites`, `phys.mech.viscosity`,
  `phys.mech.generalized-coordinates`, `phys.therm.entropy`,
  `phys.wave.forced-oscillations`, `phys.mod.photons`,
  `phys.rel.simultaneity`. All 9 had existing Blueprints (Component-
  format) reused by reference — each entry cites its Blueprint's
  Misconception Engine/Register by name with birth-type classification
  added, never re-deriving probe/bridge/replacement text.
  `phys.mod.photons` cited all 4 of its Blueprint's documented
  misconceptions, matching the 4-misconception density pattern already
  established for `phys.opt.diffraction`/`phys.opt.single-slit`/
  `phys.mod.photoelectric-effect`/`phys.rel.postulates`. All 9 entries
  verified against `EDUCATIONAL_BRAIN_STANDARD.md`'s exact 21-section
  structure and heading order (0 mismatches), zero duplicate filenames/
  concept IDs, zero orphans against the live physics KG (all 144
  physics EB files map to a valid KG id). Physics KG re-validated:
  PASS, 238/238 reachable, 0 failures/warnings — no KG file was touched.
  `physics` is now 144/238 — 60.50% complete. Wave 11 (dependency level
  11, 11 concepts — `phys.mech.angular-momentum` through
  `phys.stat.probability-basics`) is computed and next, but NOT started
  this batch. All six tracking files regenerated from source;
  re-validated 0 orphans, 0 duplicates, 0 broken KG references, 0
  invalid Blueprint references across all 179 entries.

- **Curriculum Completion Program, batch 14 — Physics Wave 11 (mandatory-
  rules cycle continuation)** (2026-07-23): the same mandatory-rules
  production cycle continued immediately after Wave 10 within the same
  conversation, per rule 10's "fetch, re-audit, continue" discipline.
  Re-fetched `origin/main` after the Wave 10 push and confirmed 0
  commits ahead/behind before starting — no other session had touched
  physics EB concurrently. `math.found` was NOT touched and remains
  31/82. Independently recomputed dependency levels via a fresh Kahn's-
  algorithm pass over the live KG's `requires` edges — the level-11 set
  (11 concepts) matched `AUTHORING_QUEUE.md`'s stored rows exactly, zero
  discrepancy. Authored all 11: `phys.mech.angular-momentum`,
  `phys.mech.rolling-motion`, `phys.mech.euler-lagrange-equation`,
  `phys.therm.carnot-cycle`, `phys.therm.third-law`,
  `phys.mod.compton-effect`, `phys.mod.de-broglie`, `phys.mod.bohr-model`,
  `phys.mod.x-rays`, `phys.rel.time-dilation`,
  `phys.stat.probability-basics`. All 11 had existing Blueprints
  (Component-format) reused by reference — each entry cites its
  Blueprint's Misconception Engine/Register by name with birth-type
  classification added, never re-deriving probe/bridge/replacement text.
  Six of the eleven (all four Modern Physics concepts plus
  `phys.rel.time-dilation` and `phys.stat.probability-basics`) each cited
  all 4 of their Blueprint's documented misconceptions, extending the
  4-misconception density pattern to a total of 10 concepts across this
  program. This wave introduced the first Statistical Mechanics domain
  entry (`phys.stat.probability-basics`) in this program. All 11 entries
  verified against `EDUCATIONAL_BRAIN_STANDARD.md`'s exact 21-section
  structure and heading order (0 mismatches), zero duplicate filenames/
  concept IDs, zero orphans against the live physics KG (all 155
  physics EB files map to a valid KG id). Physics KG re-validated: PASS,
  238/238 reachable, 0 failures/warnings — no KG file was touched.
  `physics` is now 155/238 — 65.13% complete. Wave 12 (dependency level
  12, 8 concepts — `phys.mech.conservation-of-angular-momentum` through
  `phys.stat.boltzmann-factor`) is computed and next, but NOT started
  this batch. All six tracking files regenerated from source;
  re-validated 0 orphans, 0 duplicates, 0 broken KG references, 0
  invalid Blueprint references across all 190 entries.

- **Curriculum Completion Program, batch 15 — Domain Certification Mode,
  math.found Wave 6** (2026-07-23): returning to `math.found` after the
  mandatory-rules physics production cycle (batches 9-14). Authored the 5
  concepts whose prerequisites became fully satisfied after Wave 5 —
  `logical-equivalence`, `subset`, `quantifiers`, `relation`,
  `ordinal-number` (verified programmatically against the live KG's
  `requires` edges; matches the Wave-6 candidate list already computed in
  batch 8's closing section). All 5 had existing Blueprints reused by
  reference — each entry cites its Blueprint's Misconception Registry by
  MC number with birth-type classification added, never restating worked
  examples or mastery probes. `quantifiers` carries 4 misconceptions
  (MC-4, the ∀-implication/∃-conjunction asymmetry, is the rare case where
  a notation-induced misconception requires its own concrete counterexample
  demonstration rather than just a verbal correction). `ordinal-number` is
  the first expert-difficulty entry in this domain (estimated_hours: 12);
  its two Type-6 misconceptions (commutativity; ordinal=cardinal) both
  require the order-type bijection argument as the collision instrument —
  algebraic counter-argument alone is insufficient. The open
  `mathematical-notation`/`mathematical-symbols` Curriculum Feedback item
  from Wave 2 remains carried forward, unresolved. `math.found` is 36/82
  — still IN PROGRESS; 46 concepts remain (Wave 7 candidates to be
  computed from the live KG before the next batch). No other domain or
  subject was started this batch. **Reconciliation note (added during
  batch 16's merge, below): on direct inspection, all 5 of these files
  actually use a different, numbered 21-section heading scheme (`## 1.
  Concept Identity` … `## 21. Certification Status`) rather than
  `EDUCATIONAL_BRAIN_STANDARD.md`'s exact heading text, despite this
  batch's own claim of exact conformance — flagged as new migration debt
  in `QUALITY.md`, not silently rewritten.**

- **Curriculum Completion Program, Chemistry EB batch 1 — levels 0–3
  (standing production run)** (2026-07-23): new standing production
  instruction — author ALL 186 Chemistry Educational Brain entries in
  strict topological dependency order (22 levels, 0–21), one level per
  commit, continuing without stopping until 186/186. Level 0 (1 concept):
  `chem.found.matter`. Level 1 (4 concepts): `chem.found.states-of-matter`,
  `chem.found.pure-substances`, `chem.found.measurement`,
  `chem.atomic.atomic-theory`. Level 2 (8 concepts):
  `chem.found.significant-figures`, `chem.found.mole-concept`,
  `chem.atomic.subatomic-particles`, `chem.atomic.electromagnetic-radiation`,
  `chem.state.kinetic-theory`, `chem.thermo.system`, `chem.elect.conductance`,
  `chem.surface.colloids`, `chem.env.atmosphere`. Level 3 (10 concepts):
  `chem.found.stoichiometry`, `chem.found.concentration`,
  `chem.atomic.atomic-spectra`, `chem.atomic.photoelectric-effect`,
  `chem.period.classification`, `chem.state.gas-laws`, `chem.thermo.first-law`,
  `chem.surface.emulsions`, `chem.env.air-pollution`, `chem.env.water-soil`.
  KEY DISCOVERY: all 186 chemistry Blueprint entries in
  `docs/chemistry/teaching-assets/assets.json` contain `[TEMPLATE]`
  placeholder strings — no authored Blueprint content exists for chemistry.
  All chemistry EB entries are authored entirely from KG data
  (description, difficulty, bloom, estimated_hours, mastery_threshold,
  requires, unlocks, cross_links) and domain chemistry expertise, not by
  cross-referencing Blueprint content. Blueprint References section in
  each entry explicitly states this template status. 24 entries authored;
  all verified against `EDUCATIONAL_BRAIN_STANDARD.md`'s exact 21-section
  structure and heading order; 0 orphans, 0 duplicates. Chemistry is
  24/186 — 12.90% complete; Level 4 is next. **Reconciliation note (added
  during batch 16's merge, below): this batch's own commits never added
  their 24 rows to `EDUCATIONAL_BRAIN_INDEX.md`, `QUALITY.md`, or removed
  them from `AUTHORING_QUEUE.md` — a bookkeeping gap corrected as part of
  that merge, not left inconsistent.**
  **Correction (2026-07-25, does not rewrite the historical record above):**
  the "KEY DISCOVERY" claim that all 186 chemistry Blueprint entries are
  `[TEMPLATE]` placeholders is now stale — a separate completion program
  (2026-07-25) fully authored all 186 `docs/curriculum/blueprints/chem.*.md`
  Blueprints (16-section format) and transcribed them into
  `docs/chemistry/teaching-assets/assets.json` (all 186 entries now
  `status: draft`, not `placeholder`). New chemistry EB entries authored
  from 2026-07-25 onward correctly cite these real Blueprints in their
  Blueprint References section; the 165 entries authored before this date
  still carry the now-inaccurate "no Blueprint content exists" statement
  and were not retroactively rewritten (out of scope for this batch).

- **Batch 16 — Physics Wave 12 (2026-07-23)**: continuing the same
  mandatory-rules production cycle immediately following Wave 11 in this
  conversation, per rule 10's "fetch, re-audit, continue" discipline.
  Re-fetched `origin/main` after the Wave 11 push and confirmed 0
  commits ahead/behind before starting — no other session had touched
  physics EB concurrently. `math.found` was NOT touched and remains
  31/82 at batch start. Independently recomputed dependency levels via a
  fresh Kahn's-algorithm pass over the live KG's `requires` edges — the
  level-12 set (8 concepts) matched `AUTHORING_QUEUE.md`'s stored rows
  exactly, zero discrepancy. Authored all 8:
  `phys.mech.conservation-of-angular-momentum`,
  `phys.mech.cyclic-coordinates-conservation-laws`, `phys.mech.hamiltonian`,
  `phys.therm.refrigerators`, `phys.mod.wave-particle-duality`,
  `phys.mod.atomic-spectra`, `phys.rel.length-contraction`,
  `phys.stat.boltzmann-factor`. All 8 had existing Blueprints
  (Component-format) reused by reference — each entry cites its
  Blueprint's Misconception Engine/Register by name with birth-type
  classification added, never re-deriving probe/bridge/replacement text.
  All 8 cited all 4 of their Blueprint's documented misconceptions,
  extending the 4-misconception density pattern to a total of 18
  concepts across this program. This wave introduced the second
  Statistical Mechanics domain entry (`phys.stat.boltzmann-factor`) and
  reached the Hamiltonian formulation hub concept (`phys.mech.hamiltonian`),
  a genuine bridge into quantum mechanics via its KG unlock
  `phys.qm.scattering-theory-born-approximation`. All 8 entries verified
  against `EDUCATIONAL_BRAIN_STANDARD.md`'s exact 21-section structure
  and heading order (0 mismatches), zero duplicate filenames/concept IDs,
  zero orphans against the live physics KG (all 163 physics EB files map
  to a valid KG id). Physics KG re-validated: PASS, 238/238 reachable, 0
  failures/warnings — no KG file was touched; all 6 subject KGs
  re-validated PASS. `physics` is now 163/238 — 68.49% complete.
  **This batch's push hit a concurrent push to `origin/main`** (the
  `math.found` Wave 6 batch and the Chemistry EB batch 1 above, both
  landed while this batch was in progress). Merged rather than force-
  pushed; found and corrected two real bookkeeping gaps in that
  concurrent work (chemistry's rows never added to
  `EDUCATIONAL_BRAIN_INDEX.md`/`QUALITY.md`/removed from
  `AUTHORING_QUEUE.md`) and one structural non-conformance (the
  `math.found` Wave 6 files' actual headings, discovered on inspection,
  don't match the Standard despite that batch's own claim) — both noted
  in place above rather than silently rewritten. True post-merge total,
  recomputed fresh from the live directories: **227** entries (163
  physics + 37 mathematics + 24 chemistry + 3 english), not hand-merged
  from the two conflicting drafts. Wave 13 (dependency level 13, 6
  concepts — `phys.mech.hamiltons-equations`, `phys.mod.radioactivity`,
  `phys.qm.wave-function`, `phys.rel.lorentz-transform`,
  `phys.stat.maxwell-boltzmann`, `phys.stat.partition-function`) is
  computed and next, but NOT started this batch. All six tracking files
  regenerated from source; re-validated 0 orphans, 0 duplicates across
  all 227 entries.

- **Batch 17 — Physics Wave 13 (2026-07-23)**: continuing the same
  mandatory-rules production cycle immediately following the Wave 12
  merge in this conversation, per rule 10's "fetch, re-audit, continue"
  discipline. Re-fetched `origin/main` after the Wave 12 merge-push and
  confirmed 0 commits ahead/behind before starting — no other session had
  touched physics EB concurrently this time. `math.found` was NOT
  touched and remains 37/82. Independently recomputed dependency levels
  via a fresh Kahn's-algorithm pass over the live KG's `requires`
  edges — the level-13 set (6 concepts) matched `AUTHORING_QUEUE.md`'s
  stored rows exactly, zero discrepancy. Authored all 6:
  `phys.mech.hamiltons-equations`, `phys.mod.radioactivity`,
  `phys.qm.wave-function`, `phys.rel.lorentz-transform`,
  `phys.stat.maxwell-boltzmann`, `phys.stat.partition-function`. All 6
  had existing Blueprints (Component-format) reused by reference — each
  entry cites its Blueprint's Misconception Engine/Register by name with
  birth-type classification added, never re-deriving probe/bridge/
  replacement text. 5 of the 6 (all but `phys.mech.hamiltons-equations`,
  whose Blueprint documents only 2 misconceptions) cited all 4 of their
  Blueprint's documented misconceptions, extending the 4-misconception
  density pattern to a total of 23 concepts across this program. This
  wave introduced the first Quantum Mechanics domain entry in this
  program (`phys.qm.wave-function`) and expanded Statistical Mechanics
  with two more hub concepts — `phys.stat.maxwell-boltzmann` and
  `phys.stat.partition-function` (the latter a major hub feeding six
  downstream KG concepts: `phys.stat.bose-einstein`,
  `phys.stat.entropy-statistical`, `phys.stat.fermi-dirac`,
  `phys.stat.free-energy`, `phys.stat.grand-canonical-ensemble`,
  `phys.stat.fluctuations-correlations`). All 6 entries verified against
  `EDUCATIONAL_BRAIN_STANDARD.md`'s exact 21-section structure and
  heading order (0 mismatches), zero duplicate filenames/concept IDs,
  zero orphans against the live physics KG (all 169 physics EB files map
  to a valid KG id). Physics KG re-validated: PASS, 238/238 reachable, 0
  failures/warnings — no KG file was touched; all 6 subject KGs
  re-validated PASS. `physics` is now 169/238 — 71.01% complete. True
  total, recomputed fresh: **233** entries (169 physics + 37 mathematics
  + 24 chemistry + 3 english), 1,542 remaining, 13.13%. Wave 14
  (dependency level 14, 10 concepts — `phys.mech.poisson-brackets`,
  `phys.mod.radioactive-decay`, `phys.qm.schrodinger-equation`,
  `phys.qm.uncertainty-principle`, `phys.rel.relativistic-momentum`,
  `phys.stat.bose-einstein`, `phys.stat.entropy-statistical`,
  `phys.stat.fluctuations-correlations`, `phys.stat.free-energy`,
  `phys.stat.grand-canonical-ensemble`) is computed and next, but NOT
  started this batch. All six tracking files regenerated from source;
  re-validated 0 orphans, 0 duplicates across all 233 entries. **Merge
  note**: this batch's push encountered a concurrent push to
  `origin/main` (the Chemistry EB batch 2 below, 8 concepts). Merged
  rather than force-pushed; true post-merge total, recomputed fresh:
  **241** entries (169 physics + 37 mathematics + 32 chemistry + 3
  english), 1,534 remaining, 13.58%.

- **Curriculum Completion Program, Chemistry EB batch 2 — level 4**
  (2026-07-23): continuation of the standing production run. Level 4
  (8 concepts): `chem.atomic.bohr-model`, `chem.kinet.rate`,
  `chem.sol.types`, `chem.state.molar-mass-gas`, `chem.state.real-gases`,
  `chem.thermo.enthalpy`, `chem.thermo.entropy`,
  `chem.thermo.heat-capacities`. All authored from KG data and domain
  chemistry expertise (all chemistry Blueprints remain `[TEMPLATE]`
  placeholder strings). All 8 verified against
  `EDUCATIONAL_BRAIN_STANDARD.md`'s exact 21-section structure and
  heading order; 0 orphans, 0 duplicates. Chemistry is 32/186 — 17.20%
  complete; Level 5 is next (6 concepts: `chem.atomic.quantum-numbers`,
  `chem.kinet.photochemistry`, `chem.kinet.rate-law`, `chem.sol.solubility`,
  `chem.thermo.gibbs`, `chem.thermo.third-law`).
  this batch's own commit updated `COVERAGE.md`/`ROADMAP.md` but did not
  add its 8 rows to `EDUCATIONAL_BRAIN_INDEX.md`/`QUALITY.md` or remove
  them from `AUTHORING_QUEUE.md` — corrected as part of the Wave 13
  merge above.

- **Batch 19 — Physics Wave 14 (2026-07-23)**: continuing the same
  mandatory-rules production cycle immediately following Wave 13's
  second merge in this conversation, per rule 10's "fetch, re-audit,
  continue" discipline. Re-fetched `origin/main` after the Wave 13
  merge-push and confirmed 0 commits ahead/behind before starting — no
  other session had touched physics EB concurrently this time.
  `math.found` was NOT touched and remains 37/82. Independently
  recomputed dependency levels via a fresh Kahn's-algorithm pass over
  the live KG's `requires` edges — the level-14 set (10 concepts)
  matched `AUTHORING_QUEUE.md`'s stored rows exactly, zero discrepancy.
  Authored all 10: `phys.mech.poisson-brackets`,
  `phys.mod.radioactive-decay`, `phys.qm.schrodinger-equation`,
  `phys.qm.uncertainty-principle`, `phys.rel.relativistic-momentum`,
  `phys.stat.bose-einstein`, `phys.stat.entropy-statistical`,
  `phys.stat.fluctuations-correlations`, `phys.stat.free-energy`,
  `phys.stat.grand-canonical-ensemble`. All 10 had existing Blueprints
  (Component-format, mostly 4-misconception style; the two
  `phys.stat.fluctuations-correlations` and
  `phys.stat.grand-canonical-ensemble` entries used a Component-style
  C2 Misconception Register table with only 2 documented misconceptions
  each) reused by reference — each entry cites its Blueprint's
  Misconception Engine/Register by name with birth-type classification
  added, never re-deriving probe/bridge/replacement text. This wave
  completed the Schrödinger-equation hub (`phys.qm.schrodinger-equation`,
  unlocking 5 downstream quantum-mechanics concepts:
  `phys.qm.harmonic-oscillator-qm`, `phys.qm.hydrogen-atom-qm`,
  `phys.qm.operators`, `phys.qm.particle-in-box`,
  `phys.qm.quantum-tunneling`) and expanded Statistical Mechanics with
  four more hub concepts (Bose-Einstein statistics, statistical entropy,
  fluctuations/correlations, free energy, grand canonical ensemble). All
  10 entries verified against `EDUCATIONAL_BRAIN_STANDARD.md`'s exact
  21-section structure and heading order (0 mismatches), zero duplicate
  filenames/concept IDs, zero orphans against the live physics KG (all
  179 physics EB files map to a valid KG id). Physics KG re-validated:
  PASS, 238/238 reachable, 0 failures/warnings — no KG file was touched;
  all 6 subject KGs re-validated PASS. `physics` is now 179/238 —
  75.21% complete. True total, recomputed fresh: **251** entries (179
  physics + 37 mathematics + 32 chemistry + 3 english), 1,524 remaining,
  14.14%. Wave 15 (dependency level 15, 9 concepts —
  `phys.mech.canonical-transformations`, `phys.mod.nuclear-reactions`,
  `phys.qm.harmonic-oscillator-qm`, `phys.qm.operators`,
  `phys.qm.particle-in-box`, `phys.qm.quantum-tunneling`,
  `phys.rel.mass-energy`, `phys.stat.chemical-potential`,
  `phys.stat.phase-transitions`) is computed and next, but NOT started
  this batch. All six tracking files regenerated from source;
  re-validated 0 orphans, 0 duplicates across all 251 entries.

- **Batch 20 — Chemistry EB level 5 (2026-07-23)**: authored the 6 concepts at dependency level 5 —
  `chem.atomic.quantum-numbers`, `chem.kinet.photochemistry`, `chem.kinet.rate-law`,
  `chem.sol.solubility`, `chem.thermo.gibbs`, `chem.thermo.third-law`. All 6 verified against
  `EDUCATIONAL_BRAIN_STANDARD.md`'s exact 21-section structure and heading order (0 mismatches),
  zero duplicates, zero orphans. Chemistry is now 38/186 — 20.43% complete.
  True total, recomputed fresh: **257** entries (179 physics + 37 mathematics + 38
  chemistry + 3 english), 1,518 remaining, 14.48%.

### Chemistry batch 4 — level 6 (2026-07-23)
Authored 7 concepts in topological order (level 6):
- `chem.atomic.orbitals` (proficient/understand/4h/0.75) — s/p/d/f shapes; radial/angular nodes (radial=n−l−1, angular=l); multielectron energy splitting
- `chem.env.ozone` (developing/understand/2h/0.75) — Chapman cycle; CFC photodissociation → Cl• catalytic chain; polar vortex; Montreal Protocol
- `chem.equil.concept` (developing/understand/2h/0.75) — dynamic equilibrium; ΔG = 0 at equilibrium; Q vs K; ΔG° = −RT ln K
- `chem.kinet.arrhenius` (proficient/apply/4h/0.80) — k = Ae^(−Ea/RT); linear form; two-T form; catalyst lowers Ea
- `chem.kinet.integrated-rate` (proficient/apply/4h/0.80) — zero/first/second-order integrated laws; half-lives; three-plot diagnostic; pseudo-first-order
- `chem.kinet.mechanism` (advanced/analyze/4h/0.75) — elementary steps; RDS; pre-equilibrium elimination; SSA; mechanism consistency
- `chem.thermo.cell-thermo` (proficient/apply/3h/0.75) — ΔG = −nFE; ΔG° = −nFE°; K from E°; Nernst equation; (∂E/∂T) = ΔS/nF

Chemistry: 38 → 45/186 entries. Total authored: 257 → 264.

### Chemistry batch 4 — level 7 (2026-07-23)

Five concepts in strict topological order (level 7 — all prerequisites at level ≤ 6):
- `chem.atomic.electronic-config` (developing/apply) — Aufbau, Pauli, Hund; 4s→3d fill, 3d→4s ionise; Cr/Cu anomalies; exchange energy
- `chem.atomic.quantum-mech-model` (proficient/understand) — Schrödinger equation qualitative; ψ vs |ψ|² Born interpretation; Heisenberg uncertainty (fundamental)
- `chem.equil.kc-kp` (proficient/apply) — Kc/Kp expressions; stoichiometric exponents; heterogeneous equilibria exclude solids/liquids; ICE tables; Kp=Kc(RT)^Δn
- `chem.equil.kw-ph` (developing/apply) — Kw=[H⁺][OH⁻]=10⁻¹⁴; pH=−log[H⁺]; pH+pOH=14 at 298K; strong acids/bases; neutral≠pH7 at non-298K
- `chem.kinet.catalysis` (proficient/understand) — Ea lowered (not K); homogeneous vs heterogeneous; Arrhenius rate ratio; enzyme kinetics qualitative

Running total: 50/186 chemistry entries. Levels 0–7 complete.

### Chemistry batch 5 — level 8 (2026-07-23)

Six concepts in strict topological order (level 8 — all prerequisites at level ≤ 7):
- `chem.equil.acids-bases` (developing/understand) — Arrhenius/Brønsted-Lowry/Lewis; conjugate pairs (exactly 1 H⁺ difference); amphoteric species; Ka×Kb=Kw; pKa down=strength up
- `chem.equil.complex-equil` (advanced/apply) — Kf formation constants; stepwise Kn; β=K₁×K₂×...×Kn; competition Knet=Ksp×Kf; add equilibria→multiply K; reverse→1/K
- `chem.equil.le-chatelier` (developing/apply) — concentration/pressure/temperature stresses; catalyst no shift; Δn_gas=0 case; van't Hoff isochore; Haber/Contact industrial applications
- `chem.equil.solubility` (proficient/apply) — Ksp; stoichiometric multipliers (2s, 3s); Q_sp precipitation; common ion effect; compare solubility across formula types via s not Ksp
- `chem.period.modern-periodic-law` (developing/understand) — Z not mass (Moseley); four blocks s/p/d/f; (n−1)d for d-block; period length; hydrogen anomaly
- `chem.surface.adsorption` (proficient/understand) — physisorption vs chemisorption; Freundlich (empirical); Langmuir (monolayer, θ=bP/(1+bP)); Sabatier principle

Running total: 56/186 chemistry entries. Levels 0–8 complete.

### Batch 24 — Chemistry Educational Brain level 9 (2026-07-23)

10 entries authored in strict topological order (level 9 — concepts whose prerequisites are all in levels 0–8):

- `chem.anal.chromatography` (proficient/apply): stationary/mobile phase; Rf calculation; TLC, HPLC, GC, ion-exchange, size-exclusion; MC-1 low Rf = HIGH affinity; MC-2 large molecules elute FIRST in size-exclusion
- `chem.anal.gravimetric` (proficient/apply): gravimetric factor = M(analyte)×stoich/M(precipitate); four stages; BaSO₄ and AgCl; co-precipitation → HIGH error; MC-1 inverted GF; MC-2 co-precipitation direction; MC-3 excess precipitant
- `chem.bond.metallic-bonding` (developing/understand): electron-sea model; non-directional; malleability/conductivity/lustre/high mp; band theory qualitative; MC-1 metallic=covalent; MC-2 liquid metals don't conduct; MC-3 d-block complexity
- `chem.equil.weak-acid` (proficient/apply): ICE table; Ka=x²/(C₀−x); 5% approximation; Ostwald's dilution law; α increases on dilution; Ka×Kb=Kw; polyprotic acids; MC-1 dilution decreases α; MC-2 Ka+Kb=Kw; MC-3 5% always valid
- `chem.period.atomic-radius` (developing/analyze): covalent/van der Waals/ionic radii; trends (decreasing across period, increasing down group); Zeff; isoelectronic series; lanthanide contraction; MC-1 radius increases across period; MC-2 cation>parent; MC-3 period 6 always larger
- `chem.period.ionization-energy` (developing/analyze): IE₁ definition; successive IEs and shell-boundary jump; general trend; two anomalies (Group 2/13: 3p>3s energy; Group 15/16: pairing repulsion); distance effect down group; MC-1 no exceptions; MC-2 jump position=valence electrons; MC-3 shielding explanation for group trend
- `chem.period.electron-affinity` (developing/analyze): ΔegH sign convention; general trend; anomalies Group 2 (ns² complete), Group 15 (half-filled p), F<Cl (crowded n=2 shell); second EA positive; Mulliken electronegativity; MC-1 more negative=weaker; MC-2 F/Cl same mechanism as N/O; MC-3 second EA negative
- `chem.period.valency` (developing/apply): unpaired electrons → ground-state valency; d-orbital expansion period 3+; period 2 cannot expand; cross-multiplication rule for formulas; transition metal variable oxidation states; MC-1 group number=valency; MC-2 NCl₅ by analogy; MC-3 oxidation state=electron count
- `chem.sblock.hydrogen` (developing/understand): unique position (not alkali metal); three isotopes; dihydrogen preparation; ionic/covalent/metallic hydrides; water anomalies (H-bonding, ice density); H₂O₂ dual redox role; hydrogen fuel; MC-1 H=alkali metal; MC-2 ice denser; MC-3 H₂O₂ always oxidant
- `chem.surface.heterogeneous-cat` (advanced/analyze): three-step mechanism (adsorption→surface reaction→desorption); active sites (geometric+electronic); Sabatier principle; poisoning; promoters; Haber (Fe, rate-limiting N₂ chemisorption); Contact (V₂O₅, Mars-van Krevelen); catalytic converter; MC-1 catalyst provides energy; MC-2 Haber/Contact catalyst swap; MC-3 poisoning=total deactivation

Chemistry: 56 → 66 entries. Levels 0–9 complete.

### Batch 25 — Chemistry Level 10 (2026-07-23)
7 concepts authored (level 10 complete, 73/186 chemistry entries):
- chem.bond.covalent-bonding — developing/understand; Lewis structures, bond order, polarity, molecular polarity vector sum
- chem.bond.ionic-bonding — developing/understand; electron transfer, lattice energy, Born-Haber overview, properties from lattice model
- chem.equil.buffer — proficient/apply; Henderson-Hasselbalch, buffer capacity, blood buffer, component selection
- chem.equil.hydrolysis — proficient/apply; salt classification, anion/cation hydrolysis, Kh=Kw/Ka, pH calculation
- chem.equil.titration — proficient/apply; all four curve types, equivalence vs endpoint, indicator selection, pH at six stages
- chem.period.periodic-properties — developing/analyze; synthesis node: Zeff/n framework, electronegativity, metallic character, reactivity, diagonal relationships
- chem.redox.oxidation-state — developing/apply; OS rule set (priority cascade), OIL RIG, oxidising/reducing agent, disproportionation

### Batch 26 — Chemistry Level 11 (2026-07-23)
16 concepts authored (topological level 11):
chem.bond.bond-parameters, chem.bond.coordinate-bond, chem.bond.hybridization, chem.bond.resonance, chem.bond.vsepr, chem.dblock.general, chem.org.iupac, chem.pblock.group13, chem.pblock.group14, chem.pblock.group15, chem.pblock.group16, chem.pblock.group17, chem.pblock.group18, chem.redox.balancing, chem.sblock.alkali, chem.solid.crystal-systems
Chemistry: 73 → 89/186 entries (47.85%).

### Physics EB Wave 15 (2026-07-23)

9 concepts authored in strict topological order (dependency level 15 —
all prerequisites satisfied by the 179 physics EB entries authored
through Wave 14, verified via a fresh Kahn's-algorithm recomputation
against the live physics KG rather than trusting any stored level number):
`phys.mech.canonical-transformations`, `phys.mod.nuclear-reactions`,
`phys.qm.harmonic-oscillator-qm`, `phys.qm.operators`,
`phys.qm.particle-in-box`, `phys.qm.quantum-tunneling`,
`phys.rel.mass-energy`, `phys.stat.chemical-potential`,
`phys.stat.phase-transitions`. This completes the second major Quantum
Mechanics cluster (operators, particle-in-box, harmonic oscillator,
tunneling — all four downstream of the `phys.qm.schrodinger-equation` hub
authored in Wave 14) and closes out the Statistical Mechanics domain's
final two leaf concepts (chemical potential, phase transitions), plus one
Classical Mechanics capstone (canonical transformations) and one Modern
Physics capstone (nuclear reactions, generalizing radioactive decay's
Q-value machinery to induced two-body reactions). All 9 had existing
Blueprints (`docs/curriculum/blueprints/{id}.md`) reused by reference —
Misconception Libraries cited by MC-ID/number with birth-type
classification added per this program's standard practice, never
restating worked examples, demonstrations, or full teaching-action
sequences already owned by the Blueprint. All 9 entries verified against
`EDUCATIONAL_BRAIN_STANDARD.md`'s exact 21-section structure and heading
order (0 mismatches), zero duplicate filenames/concept IDs (confirmed via
`git log --diff-filter=A` showing 0 prior commits touching any of the 9
new files), zero orphans against the live physics KG (all 188 physics EB
files map to a valid KG id). Physics KG re-validated: PASS, 238/238
reachable, 0 failures/warnings — no KG file was touched; all 6 subject
KGs re-validated PASS. `physics` is now 188/238 — 78.99% complete. True
total, recomputed fresh: **317** entries (188 physics + 37 mathematics +
89 chemistry + 3 english), out of 1,775 total KG concepts across all 6
subjects — 1,458 remaining, 17.86%. Wave 16 candidates
were not computed this batch — the next iteration of this program should
begin with a fresh `git fetch`/pull, re-audit current Physics EB state
from scratch (per this program's standing discipline of never trusting
stored counts), and recompute the next topological wave from the live KG.
All six tracking files regenerated from source; re-validated 0 orphans, 0
duplicates across all 317 entries.

### Physics EB Wave 16 (2026-07-23)

7 concepts authored in strict topological order (dependency level 16 —
all prerequisites satisfied by the 188 physics EB entries authored
through Wave 15, verified via a fresh Kahn's-algorithm recomputation
against the live physics KG): `phys.mech.hamilton-jacobi-equation`,
`phys.mod.binding-energy`, `phys.qm.hydrogen-atom-qm`, `phys.qm.spin`,
`phys.rel.spacetime`, `phys.stat.ising-model`, `phys.particle.four-
forces`. This wave is notable for `phys.particle.four-forces` —
verified as the formal root node (zero prerequisites within the domain,
requiring only `phys.em.coulombs-law` and `phys.mod.nuclear-reactions`
from outside it) of the entire Particle Physics domain, opening that
16-concept domain for future waves. All 7 had existing Blueprints
reused by reference — Misconception Libraries cited by MC-ID/number
with birth-type classification added. All 7 entries verified against
`EDUCATIONAL_BRAIN_STANDARD.md`'s exact 21-section structure and heading
order (0 mismatches), zero duplicate filenames/concept IDs (confirmed
via `git log --diff-filter=A` showing 0 prior commits touching any of
the 7 new files), zero orphans against the live physics KG (all 195
physics EB files map to a valid KG id, repo-wide scan across all 6
subjects also clean). Physics KG re-validated: PASS, 238/238 reachable,
0 failures/warnings — no KG file was touched; all 6 subject KGs
re-validated PASS. `physics` is now 195/238 — 81.93% complete. True
total, recomputed fresh: **324** entries (195 physics + 37 mathematics +
89 chemistry + 3 english), out of 1,775 total KG concepts — 1,451
remaining, 18.25%. Wave 17 candidates were not computed this batch — the
next iteration of this program should begin with a fresh `git fetch`/
pull, re-audit current Physics EB state from scratch, and recompute the
next topological wave from the live KG.

### Physics EB Wave 17 (2026-07-23)

12 concepts authored in strict topological order (dependency level 17 —
all prerequisites satisfied by the 195 physics EB entries authored
through Wave 16, verified via a fresh Kahn's-algorithm recomputation
against the live physics KG): `phys.mod.nuclear-fission`, `phys.mod.
nuclear-fusion`, `phys.mod.nuclear-models`, `phys.qm.pauli-exclusion`,
`phys.qm.perturbation-theory`, `phys.qm.selection-rules`, `phys.qm.
angular-momentum-addition`, `phys.qm.density-matrix`, `phys.stat.phase-
transitions-critical-phenomena`, `phys.stat.monte-carlo-basics`,
`phys.particle.particle-classification`, `phys.particle.gauge-bosons`.
This is the largest single wave since Wave 9 (16 concepts), reflecting
the unlock cascade from Wave 16's domain-opening concepts:
`phys.mod.binding-energy` unlocked 3 leaf nuclear-physics concepts
(fission, fusion, nuclear models); `phys.qm.operators`/`phys.qm.spin`/
`phys.qm.hydrogen-atom-qm` together unlocked 5 quantum-mechanics
concepts (Pauli exclusion, perturbation theory, selection rules,
angular-momentum addition, density matrix); `phys.stat.ising-model`
unlocked 2 statistical-mechanics concepts (critical phenomena, Monte
Carlo methods); `phys.particle.four-forces` unlocked 2 more Particle
Physics concepts (particle classification, gauge bosons), continuing
the domain opened in Wave 16. All 12 had existing Blueprints reused by
reference. All 12 entries verified against `EDUCATIONAL_BRAIN_
STANDARD.md`'s exact 21-section structure and heading order (0
mismatches), zero duplicate filenames/concept IDs, zero orphans against
the live physics KG (all 207 physics EB files map to a valid KG id,
repo-wide scan across all 6 subjects also clean). Physics KG re-
validated: PASS, 238/238 reachable, 0 failures/warnings — no KG file
was touched; all 6 subject KGs re-validated PASS. `physics` is now
207/238 — 86.97% complete. True total, recomputed fresh: **336**
entries (207 physics + 37 mathematics + 89 chemistry + 3 english), out
of 1,775 total KG concepts — 1,439 remaining, 18.93%. Wave 18 candidates
were not computed this batch — the next physics iteration should begin
with a fresh fetch/audit per this program's standing discipline.

### Physics EB Wave 18 (2026-07-23)

8 concepts authored in strict topological order (dependency level 18 —
all prerequisites satisfied by the 207 physics EB entries authored
through Wave 17, verified via a fresh Kahn's-algorithm recomputation
against the live physics KG, triggered by the explicit standing
instruction "Keep continue until 238/238 done"): `phys.qm.variational-
method`, `phys.qm.identical-particles`, `phys.qm.scattering-theory-born-
approximation`, `phys.stat.fermi-dirac`, `phys.astro.stellar-structure`,
`phys.particle.antimatter`, `phys.particle.quarks`, `phys.particle.
leptons`. This wave draws from three different domains simultaneously:
Wave 17's `phys.qm.perturbation-theory`/`phys.qm.angular-momentum-
addition`/`phys.qm.pauli-exclusion` together unlocked 3 more quantum-
mechanics concepts (variational method, identical particles, scattering
theory); `phys.stat.partition-function` plus Wave 17's `phys.qm.pauli-
exclusion` unlocked Fermi-Dirac statistics; `phys.mod.nuclear-fusion`
(Wave 17) plus the pre-existing `phys.mech.universal-gravitation`
unlocked the Astrophysics domain's `phys.astro.stellar-structure` (the
first Astrophysics-domain concept authored — a 6-concept domain not
previously called out separately in project memory, confirmed present
in the live KG); Wave 17's `phys.particle.particle-classification`
unlocked 3 more Particle Physics concepts (antimatter, quarks, leptons).
All 8 had existing Blueprints reused by reference. All 8 entries verified
against `EDUCATIONAL_BRAIN_STANDARD.md`'s exact 21-section structure and
heading order (0 mismatches), zero duplicate filenames/concept IDs, zero
orphans against the live physics KG (all 215 physics EB files map to a
valid KG id, repo-wide scan across all 6 subjects also clean). Physics
KG re-validated: PASS, 238/238 reachable, 0 failures/warnings — no KG
file was touched; all 6 subject KGs re-validated PASS. `physics` is now
215/238 — 90.34% complete. True total, recomputed fresh: **344** entries
(215 physics + 37 mathematics + 89 chemistry + 3 english), out of 1,775
total KG concepts — 1,431 remaining, 19.38%. Per the standing
instruction, Wave 19 candidates were not computed this batch — the next
physics iteration should begin immediately with a fresh fetch/audit per
this program's standing discipline, continuing without pausing until
physics reaches 238/238.

### Physics EB Wave 19 (2026-07-23)

8 concepts authored in strict topological order (dependency level 19 —
all prerequisites satisfied by the 215 physics EB entries authored
through Wave 18, verified via a fresh Kahn's-algorithm recomputation
against the live physics KG, per the same explicit standing instruction
"Keep continue until 238/238 done"): `phys.qm.wkb-approximation`,
`phys.qm.s-matrix-basics`, `phys.astro.stellar-evolution`, `phys.astro.
cosmology`, `phys.particle.neutrinos`, `phys.particle.hadron-quark-
model`, `phys.particle.strong-interaction`, `phys.mod.energy-bands`.
This wave continues consuming Wave 18's unlock cascade: `phys.qm.
quantum-tunneling` plus Wave 18's `phys.qm.variational-method` unlocked
the WKB approximation; Wave 18's `phys.qm.scattering-theory-born-
approximation` unlocked S-matrix basics; Wave 18's `phys.astro.stellar-
structure` unlocked both `phys.astro.stellar-evolution` and (combined
with the pre-existing `phys.rel.spacetime`) `phys.astro.cosmology`;
Wave 18's `phys.particle.leptons` unlocked `phys.particle.neutrinos`;
`phys.particle.quarks` unlocked `phys.particle.hadron-quark-model`;
`phys.particle.gauge-bosons` plus `phys.particle.quarks` unlocked
`phys.particle.strong-interaction`; and `phys.mod.atomic-spectra` plus
Wave 18's `phys.stat.fermi-dirac` unlocked `phys.mod.energy-bands` (the
entry point for the six-concept semiconductor-physics extension). All 8
had existing Blueprints reused by reference. All 8 entries verified
against `EDUCATIONAL_BRAIN_STANDARD.md`'s exact 21-section structure and
heading order (0 mismatches), zero duplicate filenames/concept IDs, zero
orphans against the live physics KG (all 223 physics EB files map to a
valid KG id, repo-wide scan across all 6 subjects also clean). Physics
KG re-validated: PASS, 238/238 reachable, 0 failures/warnings — no KG
file was touched; all 6 subject KGs re-validated PASS. `physics` is now
223/238 — 93.70% complete. True total at the moment this wave was
authored (before merging the concurrent chemistry batch below):
**352** entries (223 physics + 37 mathematics + 89 chemistry + 3
english), out of 1,775 total KG concepts — 1,423 remaining, 19.83%. Per
the standing instruction, Wave 20 candidates were not computed this
batch — the next physics iteration should begin immediately with a
fresh fetch/audit per this program's standing discipline, continuing
without pausing until physics reaches 238/238.

**Merge note (2026-07-23)**: this Wave 19 commit and a concurrent
session's Chemistry level-12 batch (below) were pushed independently and
merged via `git merge`, both touching this file and `ROADMAP.md`. No
file overlap in the authored `.md` concept files themselves (physics vs.
chemistry) — only the two shared tracking files needed reconciliation.
Combined true total after merge: **369** entries (223 physics + 37
mathematics + 106 chemistry + 3 english), out of 1,775 total KG
concepts — 1,406 remaining, 20.79%. Re-verified via a full recount of
every live file in `educational-brain/concepts/{subject}/` after the
merge, not by simple addition of the two batches' self-reported totals.

### Batch 27 — Chemistry level 12 (17 concepts, 2026-07-23)
17 concepts authored at topological level 12 in strict dependency order.

Files authored:
- chem.bond.mo-theory (MO theory: LCAO, bonding/antibonding, bond order, O₂ paramagnetism)
- chem.bond.polar-molecules (dipole vector addition; CO₂ nonpolar despite polar bonds; BF₃ vs NF₃)
- chem.coord.werner (Werner's primary/secondary valency; AgNO₃ precipitation; chelate effect)
- chem.dblock.first-row (Cr/Cu anomalies; Fe/Cu/Mn/Cr OS; Fe²⁺/Fe³⁺/Cu²⁺/MnO₄⁻/Cr₂O₇²⁻ chemistry)
- chem.dblock.lanthanides (f-block; lanthanide contraction; f–f transitions; NdFeB/Eu/Tb/Ce/Gd applications)
- chem.org.hybridization (sp³/sp²/sp in organic; O and N heteroatom hybridization; pyridine-N vs pyrrole-N)
- chem.org.purification (distillation/recrystallisation/extraction/TLC/column/GC-MS; mp as purity indicator)
- chem.org.spectroscopy (MS M⁺/base peak/isotope patterns; IR key absorptions; ¹H NMR δ/splitting/integration)
- chem.pblock.trends (oxide acidity Period 3; chloride hydrolysis; hydride bp anomalies; inert pair; first-member anomaly)
- chem.redox.activity-series (E° definition; SHE; E°cell = E°cathode − E°anode; displacement reactions; activity series)
- chem.redox.disproportionation (same element same OS → split to higher and lower; Cu⁺ unstable; Cl₂/alkali; H₂O₂; E° criterion)
- chem.redox.titrations (KMnO₄ self-indicating/H₂SO₄ only; K₂Cr₂O₇/diphenylamine; iodometric/thiosulfate 2:1; starch near endpoint)
- chem.sblock.alkaline-earth (Group 2; +2 always; reactivity ↑ down; hydroxide solubility ↑ down; sulphate solubility ↓ down; carbonate thermal stability; Be anomaly)
- chem.solid.amorphous (no long-range order; isotropic; Tg; no sharp mp; glass/polymers/metallic glasses; glass-flow myth)
- chem.solid.defects (Schottky/Frenkel point defects; density effects; non-stoichiometry FeO₁₋ₓ; F-centres; dislocations)
- chem.solid.packing (CCP ABCABC vs HCP ABABAB; 74% packing; 2 tet + 1 oct holes per CCP atom; NaCl/ZnS/CaF₂ hole-filling)
- chem.thermo.bond-enthalpy (mean bond enthalpies; ΔH ≈ Σbroken − Σformed; estimate not exact; F–F weakness; N≡N strength)

Running total: 106/186 chemistry entries. Levels 0–12 complete.

### Batch 28 — Chemistry level 13 (2026-07-23)
Authored 15 level-13 concepts in topological order: `chem.anal.spectroscopy`, `chem.anal.volumetric`, `chem.bond.intermolecular`, `chem.coord.cft`, `chem.coord.nomenclature`, `chem.coord.stability`, `chem.dblock.oxo-species`, `chem.elect.galvanic-cell`, `chem.hyd.alkanes`, `chem.org.aromaticity`, `chem.org.electronic-effects`, `chem.org.isomerism`, `chem.org.qualitative-analysis`, `chem.solid.ionic-solids`, `chem.solid.properties`. Chemistry: 106 → 121/186.

**Merge note (2026-07-23)**: this Batch 28 (Chemistry level 13) and this
session's Physics Wave 19 batch were pushed independently and merged via
`git merge`. No file overlap in authored concept files — only this file
and `ROADMAP.md` needed reconciliation. Combined true total after merge:
**384** entries (223 physics + 37 mathematics + 121 chemistry + 3
english), out of 1,775 total KG concepts — 1,391 remaining, 21.63%.
Re-verified via a full recount of every live file in
`educational-brain/concepts/{subject}/` after the merge.

### Physics EB Wave 20 (2026-07-23)

5 concepts authored in strict topological order (dependency level 20 —
all prerequisites satisfied by the 223 physics EB entries authored
through Wave 19, verified via a fresh Kahn's-algorithm recomputation
against the live physics KG, per the same explicit standing instruction
"Keep continue until 238/238 done"): `phys.astro.dark-matter`,
`phys.astro.black-holes`, `phys.particle.weak-interaction`,
`phys.particle.conservation-laws`, `phys.mod.semiconductor-
classification`. This wave draws from three domains: Wave 19's
`phys.astro.cosmology` unlocked `phys.astro.dark-matter` (the
Astrophysics domain's leaf/culminating-synthesis node); Wave 19's
`phys.astro.stellar-evolution` plus the pre-existing `phys.rel.spacetime`
unlocked `phys.astro.black-holes`; the pre-existing `phys.particle.
gauge-bosons` plus Wave 19's `phys.particle.hadron-quark-model` unlocked
`phys.particle.weak-interaction`; Wave 19's `phys.particle.hadron-quark-
model` plus the pre-existing `phys.particle.leptons` unlocked `phys.
particle.conservation-laws`; and Wave 19's `phys.mod.energy-bands`
unlocked `phys.mod.semiconductor-classification`, continuing the
semiconductor-physics extension. All 5 had existing Blueprints reused by
reference. All 5 entries verified against `EDUCATIONAL_BRAIN_
STANDARD.md`'s exact 21-section structure and heading order (0
mismatches), zero duplicate filenames/concept IDs, zero orphans against
the live physics KG (all 228 physics EB files map to a valid KG id,
repo-wide scan across all 6 subjects also clean). Physics KG re-
validated: PASS, 238/238 reachable, 0 failures/warnings — no KG file
was touched; all 6 subject KGs re-validated PASS. `physics` is now
228/238 — 95.80% complete. True total, recomputed fresh: **389** entries
(228 physics + 37 mathematics + 121 chemistry + 3 english), out of 1,775
total KG concepts — 1,386 remaining, 21.92%. Per the standing
instruction, Wave 21 candidates were not computed this batch — the next
physics iteration should begin immediately with a fresh fetch/audit per
this program's standing discipline, continuing without pausing until
physics reaches 238/238. Only 10 physics concepts remain across levels
21-24.

### Physics EB Wave 21 (2026-07-23)

5 concepts authored in strict topological order (dependency level 21 —
all prerequisites satisfied by the 228 physics EB entries authored
through Wave 20, verified via a fresh Kahn's-algorithm recomputation
against the live physics KG, per the same explicit standing instruction
"Keep continue until 238/238 done"): `phys.astro.gravitational-waves`,
`phys.particle.electroweak-unification`, `phys.particle.feynman-
diagrams`, `phys.particle.accelerators-detectors`, `phys.mod.intrinsic-
semiconductors`. This wave draws from three domains: Wave 20's
`phys.astro.black-holes` unlocked `phys.astro.gravitational-waves` (the
Astrophysics domain's terminal node — Astrophysics is now fully
authored); Wave 20's `phys.particle.weak-interaction` unlocked `phys.
particle.electroweak-unification`; the pre-existing `phys.particle.
gauge-bosons` plus Wave 20's `phys.particle.conservation-laws` unlocked
`phys.particle.feynman-diagrams`; Wave 20's `phys.particle.conservation-
laws` plus the pre-existing `phys.rel.relativistic-momentum` unlocked
`phys.particle.accelerators-detectors`; and Wave 20's `phys.mod.
semiconductor-classification` unlocked `phys.mod.intrinsic-
semiconductors`, continuing the semiconductor-physics extension. All 5
had existing Blueprints reused by reference. All 5 entries verified
against `EDUCATIONAL_BRAIN_STANDARD.md`'s exact 21-section structure and
heading order (0 mismatches), zero duplicate filenames/concept IDs, zero
orphans against the live physics KG (all 233 physics EB files map to a
valid KG id, repo-wide scan across all 6 subjects also clean). Physics
KG re-validated: PASS, 238/238 reachable, 0 failures/warnings — no KG
file was touched; all 6 subject KGs re-validated PASS. `physics` is now
233/238 — 97.90% complete. True total at the moment this wave was
authored: 394 entries (233 physics + 37 mathematics + 121 chemistry + 3
english). Only 5 physics concepts remain, all in Particle Physics
(levels 22-23) and the Modern Physics semiconductor extension (levels
22-24).

### Batch 29 — Chemistry level 14 (2026-07-23, concurrent)

Authored 15 level-14 concepts in topological order, landed on
`origin/main` concurrently with this session's Physics Wave 21 push,
merged via `git merge` with zero file overlap in authored concept files
(only `COVERAGE.md` and `ROADMAP.md` required conflict resolution):
`chem.coord.applications`, `chem.coord.bonding`, `chem.coord.isomerism`,
`chem.dblock.organometallics`, `chem.elect.batteries`,
`chem.elect.corrosion`, `chem.elect.electrolysis`,
`chem.elect.standard-electrode`, `chem.hal.introduction`,
`chem.hyd.arenes`, `chem.hyd.conformations`, `chem.hyd.petroleum`,
`chem.org.reactive-intermediates`, `chem.sblock.water`,
`chem.state.liquids`. Chemistry: 121 → 136/186 (73.12%). True total
after this merge, recomputed fresh by scanning every live file across
all 6 subjects: **409** entries (233 physics + 37 mathematics + 136
chemistry + 3 english), out of 1,775 total KG concepts — 1,366
remaining, 23.04%. Per the standing instruction, Wave 22 candidates were
not computed this batch — the next physics iteration should begin
immediately with a fresh fetch/audit per this program's standing
discipline, continuing without pausing until physics reaches 238/238.

### Physics EB Wave 22 (2026-07-23)

2 concepts authored in strict topological order (dependency level 22 —
all prerequisites satisfied by the 233 physics EB entries authored
through Wave 21, verified via a fresh Kahn's-algorithm recomputation
against the live physics KG, per the same explicit standing instruction
"Keep continue until 238/238 done"): `phys.particle.higgs-mechanism`,
`phys.mod.extrinsic-semiconductors`. This wave draws from two domains:
Wave 21's `phys.particle.electroweak-unification` plus the pre-existing
`phys.particle.gauge-bosons` unlocked `phys.particle.higgs-mechanism`;
and Wave 21's `phys.mod.intrinsic-semiconductors` unlocked `phys.mod.
extrinsic-semiconductors`, continuing the semiconductor-physics
extension. Both had existing Blueprints reused by reference. Both
entries verified against `EDUCATIONAL_BRAIN_STANDARD.md`'s exact
21-section structure and heading order (0 mismatches), zero duplicate
filenames/concept IDs, zero orphans against the live physics KG (all 235
physics EB files map to a valid KG id, repo-wide scan across all 6
subjects also clean). Physics KG re-validated: PASS, 238/238 reachable,
0 failures/warnings — no KG file was touched; all 6 subject KGs
re-validated PASS. `physics` is now 235/238 — 98.74% complete. True
total, recomputed fresh: **411** entries (235 physics + 37 mathematics +
136 chemistry + 3 english), out of 1,775 total KG concepts — 1,364
remaining, 23.15%. Per the standing instruction, Wave 23 candidates were
not computed this batch — the next physics iteration should begin
immediately with a fresh fetch/audit per this program's standing
discipline, continuing without pausing until physics reaches 238/238.
Only 3 physics concepts remain: `phys.particle.standard-model` and
`phys.mod.pn-junction` at level 23, then `phys.mod.diode-rectification`
at level 24 — the terminal node.

### Physics EB Wave 23 (2026-07-23)

2 concepts authored in strict topological order (dependency level 23 —
all prerequisites satisfied by the 235 physics EB entries authored
through Wave 22, verified via a fresh Kahn's-algorithm recomputation
against the live physics KG, per the same explicit standing instruction
"Keep continue until 238/238 done"): `phys.particle.standard-model`,
`phys.mod.pn-junction`. This wave draws from two domains:
`phys.particle.standard-model` — the Particle Physics domain's terminal
capstone node — required all four of Wave 22's/prior waves'
`phys.particle.hadron-quark-model`, `phys.particle.gauge-bosons`,
`phys.particle.higgs-mechanism`, and `phys.particle.conservation-laws`
jointly, completing the Particle Physics domain in full; and
`phys.mod.pn-junction` (unlocked from Wave 22's `phys.mod.extrinsic-
semiconductors`, continuing the semiconductor-physics extension). Both
had existing Blueprints reused by reference. Both entries verified
against `EDUCATIONAL_BRAIN_STANDARD.md`'s exact 21-section structure and
heading order (0 mismatches), zero duplicate filenames/concept IDs, zero
orphans against the live physics KG (all 237 physics EB files map to a
valid KG id, repo-wide scan across all 6 subjects also clean). Physics
KG re-validated: PASS, 238/238 reachable, 0 failures/warnings — no KG
file was touched; all 6 subject KGs re-validated PASS. `physics` is now
237/238 — 99.58% complete, with the Particle Physics domain now fully
authored. True total, recomputed fresh: **413** entries (237 physics +
37 mathematics + 136 chemistry + 3 english), out of 1,775 total KG
concepts — 1,362 remaining, 23.27%. Per the standing instruction, Wave
24 candidates were not computed this batch — the next physics iteration
should begin immediately with a fresh fetch/audit per this program's
standing discipline, continuing without pausing until physics reaches
238/238. Only 1 physics concept remains: `phys.mod.diode-rectification`
at level 24 — the terminal node of the entire physics KG. Physics
Educational Brain coverage will reach 238/238 (100%) the moment this
final concept is authored.

### Physics EB Wave 24 (2026-07-23) — FINAL WAVE, PHYSICS 238/238 COMPLETE

The single, final remaining physics concept authored: `phys.mod.diode-
rectification` (dependency level 24, the terminal node of the entire
physics knowledge graph), verified via a fresh Kahn's-algorithm
recomputation against the live physics KG showing it as the sole
remaining unauthored concept, per the same explicit standing instruction
"Keep continue until 238/238 done." Unlocked from Wave 23's `phys.mod.
pn-junction`, completing the six-concept semiconductor-physics extension
of the Modern Physics domain in full (energy bands → classification →
intrinsic → extrinsic/doping → p-n junction → diode rectification). Had
an existing Blueprint, reused by reference. Verified against
`EDUCATIONAL_BRAIN_STANDARD.md`'s exact 21-section structure and heading
order (0 mismatches), zero duplicate filename/concept ID, zero orphan
against the live physics KG (all 238 physics EB files map to a valid KG
id — confirmed via direct file count, `ls educational-brain/concepts/
physics/*.md | wc -l` = 238 — repo-wide scan across all 6 subjects also
clean). Physics KG re-validated: PASS, 238/238 reachable, 0
failures/warnings — no KG file was touched; all 6 subject KGs
re-validated PASS. **`physics` is now 238/238 — 100% complete.** Every
physics KG concept, across all 12 domains (Mechanics, Waves, Optics,
Electromagnetism, Modern Physics, Relativity, Quantum Mechanics,
Statistical Mechanics, Astrophysics, Particle Physics, Measurement, and
the Modern Physics semiconductor extension), now has a full Educational
Brain entry conforming to `EDUCATIONAL_BRAIN_STANDARD.md`. True total,
recomputed fresh: **414** entries (238 physics + 37 mathematics + 136
chemistry + 3 english), out of 1,775 total KG concepts — 1,361
remaining, 23.32%. This is the terminal milestone of the physics-focused
phase of the Curriculum Completion Program's standing instruction —
future sessions resume the program's default cross-subject priority
order (see `ROADMAP.md` §5) unless given an equally explicit,
subject-specific override, exactly as this wave-24 physics campaign
itself began.
### Batch 29 — Chemistry level 14 (2026-07-23)
Authored 15 level-14 concepts in topological order: `chem.coord.applications`, `chem.coord.bonding`, `chem.coord.isomerism`, `chem.dblock.organometallics`, `chem.elect.batteries`, `chem.elect.corrosion`, `chem.elect.electrolysis`, `chem.elect.standard-electrode`, `chem.hal.introduction`, `chem.hyd.arenes`, `chem.hyd.conformations`, `chem.hyd.petroleum`, `chem.org.reactive-intermediates`, `chem.sblock.water`, `chem.state.liquids`. Chemistry: 121 → 136/186.

### Batch 30 — Chemistry level 15 (2026-07-24)
Authored 12 level-15 Chemistry Educational Brain entries in strict topological order:
- `chem.elect.industrial` — Hall-Héroult, Down's cell, chloralkali, electroplating, electrorefining
- `chem.elect.nernst` — Nernst equation, concentration cells, pH/ISE applications
- `chem.hal.cfcs` — DCM, CHCl₃, CCl₄, iodoform test, CFC ozone depletion, Montreal Protocol, HCFCs/HFCs/HFOs
- `chem.hal.haloarenes` — C–X partial double-bond character, resistance to SN, SNAr/Meisenheimer, Dow process, o/p-directing deactivators
- `chem.hal.sn1` — two-step ionisation/attack, racemisation, factors, 1,2-shifts
- `chem.hal.sn2` — concerted backside attack, Walden inversion, substrate/solvent/nucleophile effects, applications
- `chem.hyd.polycyclic` — naphthalene/anthracene/phenanthrene EAS selectivity; pyridine/pyrrole/furan/thiophene aromaticity and reactivity; purines/pyrimidines
- `chem.nitro.nitro-compounds` — nitro group structure, meta-direction, reduction ladder (Sn/HCl vs. Zn/NH₄Cl), nitronium electrophile, TNT
- `chem.org.mechanisms` — NERP classification, curved-arrow conventions, bond cleavage types, mechanism identification from conditions
- `chem.sol.vapour-pressure` — Raoult's law, vapour pressure lowering, ideal/non-ideal deviations, colligative property tree
- `chem.state.phase-diagram` — P–T diagram features, triple point, critical point, water's negative fusion slope, CO₂ diagram, Clausius-Clapeyron
- `chem.surface.surfactants` — amphiphilic structure, CMC, micelle formation (hydrophobic effect = entropic), surfactant types, detergency mechanism, HLB

Chemistry total: 136 → 148 / 186 (79.57%). Level 15 complete.

### Batch 31 — Chemistry level 16 (2026-07-24)
Authored 9 level-16 Chemistry Educational Brain entries in strict topological order:
- `chem.alc.alcohols` — classification; H-bonding bp; acidity/NaOH vs. phenol; substitution (Lucas test); dehydration (Zaitsev, 140°C ether vs 170°C alkene); oxidation (PCC→aldehyde, Jones→acid, 3°→none); esterification
- `chem.elect.concentration-cell` — E° = 0 but E ≠ 0; Nernst; high concentration = cathode; entropic driving force; Nernst potential for neurons; pH electrode
- `chem.hal.elimination` — E2 (concerted, anti-periplanar, bimolecular, Zaitsev); E1 (via carbocation, same RDS as SN1); Hofmann rule (bulky base → less substituted alkene); substitution vs. elimination decision guide
- `chem.hal.grignard` — RMgX preparation; polarity inversion (C+ → C−); addition to HCHO/RCHO/ketone/ester/CO₂; anhydrous requirement (pKₐ ~50); organolithium comparison
- `chem.hyd.alkenes` — sp² geometry; Markovnikov's rule (mechanistic); anti-Markovnikov hydroboration (BH₃/THF, H₂O₂); bromonium ion (anti addition of Br₂); acid hydration/oxymercuration; catalytic hydrogenation (syn); ozonolysis
- `chem.org.arrow-pushing` — arrow = electron pair (tail = source, head = destination); 5 arrow types; chain rule; formal charge verification; common error diagnosis
- `chem.org.pericyclic` — cycloaddition/electrocyclic/sigmatropic; W–H rules ([4n+2] thermal allowed, [4n] forbidden); Diels-Alder (s-cis, electron-rich diene + EWG dienophile, stereospecific); endo/exo (kinetic vs. thermodynamic)
- `chem.sol.activity` — activity coefficient γ; a = γc; positive/negative deviations; ionic strength I = ½Σcᵢzᵢ²; Debye–Hückel limiting law; impact on K and Nernst equation
- `chem.sol.colligative` — VP lowering/bp elevation/fp depression/osmotic pressure; ΔTb = Kbmi, ΔTf = Kfmi, π = iMRT; van 't Hoff factor i; one-cause-four-effects model; molar mass determination

Chemistry total: 148 → 157 / 186 (84.41%). Level 16 complete.

### Batch 32 — Chemistry level 17 (2026-07-24)
- `chem.alc.diols` — Diols and Polyols
- `chem.alc.ethers` — Ethers
- `chem.alc.phenols` — Phenols
- `chem.carb.aldehydes` — Aldehydes
- `chem.hyd.alkynes` — Alkynes
- `chem.nitro.amines` — Amines
- `chem.poly.addition` — Addition Polymerization
- `chem.sol.osmosis` — Osmosis and Osmotic Pressure
Chemistry: 157 → 165/186 (88.71%). New domains: chem.carb, chem.poly.

### Mathematics — Curriculum Completion Program resumed, Forensic Audit + math.found Wave 7 (2026-07-26)

**Forensic audit** (per this batch's own standing "audit first" instruction):
resynced local `main` to `origin/main` (local branch pointer was stale,
diverged 53/50 commits — reset per this program's own standing
resync-if-clean instruction). Programmatic count confirmed the KG
(908 concepts, 24 domains, unchanged), Blueprints (529/908), the
Curriculum Production Pipeline's own Teaching Assets
(`docs/mathematics/teaching-assets/assets.json`, 908/908 status=draft —
complete since the 2026-07-05 dashboard's 877/908 snapshot, pipeline-owned,
not touched by this program), AssetIdentity seed status
(`src/lib/teaching/assets/brainSeedAssets.ts`: only `math.arith.fractions`
seeded, 1/908 — Wave-0-era, unchanged), and runtime registration
(mathematics fully registered in `knowledgeGraph.ts`'s `SUBJECT_ADAPTERS`/
`ID_PREFIX_TO_SUBJECT`, confirmed live). Discovered a `math.found` Wave 6
(5 entries — logical-equivalence, ordinal-number, quantifiers, relation,
subset) already committed to `main` (commit `8bd06f6d`) that this
program's own memory record had not yet caught up to — bringing the true
pre-batch count to 36 `math.found` entries (31 Waves 1-5 + 5 Wave 6), not
31.

**Validation finding (Quality Gate 3 violation, confirmed against
`QUALITY_GATES.md`'s own written criterion)**: all 5 Wave 6 entries use a
numbered "1. Concept Identity" ... "21. Certification Status" heading
scheme that `QUALITY_GATES.md` Gate 3 explicitly retires ("no
numbered-heading variant (retired per the Standard's §1.2 finding)"). The
other 31 pre-existing `math.found` entries, and this batch's own 9 new
entries, all use the correct unnumbered `## Identity` ... `## Version
History` scheme matching `EDUCATIONAL_BRAIN_STANDARD.md` §3 exactly
(verified: identical heading list across all 9 new files via diff). This
is a genuine, documented defect, not merely a style preference — but
fixing it means restructuring content across section boundaries that
don't map 1:1 (the numbered scheme lacks standalone "Learning Objective,"
"Core Understanding," "Why Students Fail," and "Cross-Subject
Connections" sections, and carries three sections — "Authoring Notes,"
"Open Questions," "Certification Status" — the Standard doesn't specify),
so it is a genuine reformatting/re-authoring task, not a find-and-replace.
Following this program's own established precedent (Batch 2, 2026-07-22:
"reconciliation is tracked as separate future work... not retroactively
applied this batch"), this was NOT fixed in this batch — flagged here and
in the mathematics summary row above as the top-priority item for the
next mathematics session.

**Wave 7** — authored the 9 concepts whose prerequisites became fully
satisfied after Wave 6, verified programmatically against the live KG
(`requires` every element already in the authored set): `math.found.proper-subset`,
`math.found.set-equality`, `math.found.set-operations`,
`math.found.power-set`, `math.found.partition`,
`math.found.reflexive-relation`, `math.found.symmetric-relation`,
`math.found.transitive-relation`, `math.found.rules-of-inference`. 7 of
the 9 had existing Blueprints reused by reference (Misconception
Registries cited by ID with birth-type classification added, worked
examples/transfer probes/mastery gates never restated); 2
(`proper-subset`, `set-equality`) had none, stated explicitly, with all
misconceptions authored directly via the birth-taxonomy diagnostic
procedure. One authoring-time self-correction recorded honestly: this
batch's own first draft of `math.found.partition`'s Curriculum Feedback
section briefly conflated the separate Blueprint-corpus and
Educational-Brain-corpus production-order numbering (both called "this
corpus" in the source Blueprint's own Component 7 note) — caught and
corrected before commit; the corrected text distinguishes the two
pipelines explicitly. All 9 entries verified against the Standard's
exact 21-section heading order (identical across all 9, confirmed by
diff). `math.found` 36/82 → **45/82** — still IN PROGRESS; Wave 8
candidates computed programmatically against the live KG (10):
`proof`, `union`, `intersection`, `set-difference`, `complement`,
`venn-diagram`, `equivalence-relation`, `partial-order`,
`function-set-theoretic`, `cardinal-arithmetic`. No other domain
touched. All five tracking files (`EDUCATIONAL_BRAIN_INDEX.md`,
`AUTHORING_QUEUE.md`, `ROADMAP.md`, `QUALITY.md`, `COVERAGE.md`)
regenerated/updated for the 9 new entries in this same commit; re-validated
0 duplicates, 0 orphans (every `math.found.*.md` filename resolves to a
real KG id) across all 46 mathematics entries.

### Mathematics — Quality Gate 3 repair + math.found Wave 8 (2026-07-26, same session)

Per this batch's explicit standing instruction ("repair existing
Mathematics Educational Brain entries FIRST if they violate the current
standard"), ran a full Quality Gate 3 audit across all 46 pre-batch
mathematics entries (comparing each file's `## ` heading list against
`EDUCATIONAL_BRAIN_STANDARD.md`'s canonical 21-section list via diff).
Found 6 violations, not 5: the previously-flagged `math.found` Wave 6
batch (`logical-equivalence`, `ordinal-number`, `quantifiers`,
`relation`, `subset`) plus a newly-discovered one — `math.arith.fractions`
itself, the original Delivery-5 seed entry (2026-07-10), predates
`EDUCATIONAL_BRAIN_STANDARD.md`'s existence and used its own earlier
unnumbered-but-differently-named heading scheme (`Identity`, `Mental
models`, `Why beginners fail here`, `Explanation library`, etc. — not
the current Standard's exact section names).

**All 6 repaired**, restructured to the exact 21-section Standard
scheme, with all content preserved losslessly (verified: no bullet,
example, misconception, or teaching note dropped in any of the 6
diffs). For `math.arith.fractions` specifically — the only one of the
6 with live runtime consumers — re-verified that
`src/lib/teaching/assets/brainSeedAssets.ts`'s five `source:` citation
comments (which name specific sub-labels: "Explanation library, Age
8–11 (mechanism)", "Explanation library, Returning teen/adult",
"Misconception library M1"/"M2") still resolve to the identical text,
now nested under renamed parent sections; `brainSeedAssets.ts` itself
was NOT modified (out of this program's scope). Also corrected this
entry's own stale `estimated_hours: ~4` to the canonical KG value of 20.
Added standalone Learning Objective, Teaching Sequence, Blueprint
References, and Runtime Asset References sections to all 6 repaired
files (none existed pre-repair); each file's Version History gained a
v1.1 entry documenting the repair. **0 Quality Gate 3 violations remain
in mathematics** as of this batch.

**Wave 8** — authored the 10 concepts whose prerequisites became fully
satisfied after Wave 7, verified programmatically against the live KG:
`math.found.proof`, `union`, `intersection`, `set-difference`,
`complement`, `venn-diagram`, `equivalence-relation`, `partial-order`,
`function-set-theoretic`, `cardinal-arithmetic`. 5 of the 10 (`proof`,
`equivalence-relation`, `partial-order`, `function-set-theoretic`,
`cardinal-arithmetic`) had existing Blueprints reused by reference; 5
(the direct children of `math.found.set-operations` — `union`,
`intersection`, `set-difference`, `complement`, `venn-diagram`) had
none, each authored directly via the birth-taxonomy diagnostic
procedure while explicitly reusing `math.found.set-operations`'s own
already-authored survey content by reference rather than duplicating it
(e.g. `set-difference`'s and `complement`'s MC-1 entries cite that
concept's own MC-3/MC-1 by ID instead of re-deriving the identical
asymmetry/universal-set lessons). All 10 verified against the Standard's
exact 21-section heading order.

`math.found` 45/82 → **55/82** — still IN PROGRESS; Wave 9 candidates
computed programmatically against the live KG (12): `direct-proof`,
`proof-by-contradiction`, `proof-by-contrapositive`, `proof-by-cases`,
`existence-proof`, `writing-mathematics`, `theorem`, `conjecture`,
`equivalence-class`, `total-order`, `hasse-diagram`, `cardinality`. No
other domain touched. All five tracking files (`EDUCATIONAL_BRAIN_INDEX.md`,
`AUTHORING_QUEUE.md`, `ROADMAP.md`, `QUALITY.md`, `COVERAGE.md`)
updated in this same commit; re-validated 0 duplicates, 0 orphans, and
(newly, this batch) 0 Quality Gate 3 heading violations across all 56
mathematics entries.

### Mathematics — math.found Wave 9 (2026-07-26, autonomous loop iteration)

Triggered by the user invoking a dynamic `/loop` continuation of the
Mathematics Educational Brain Autonomous Completion Program. Re-synced
`main` (no new commits since the prior batch's push) and re-ran the full
Quality Gate 3 audit across all 56 pre-batch mathematics entries — 0
violations found, confirming the prior batch's repair held.

**Wave 9** — authored the 8 concepts whose prerequisites became fully
satisfied after Wave 8, all forming one coherent sub-domain (the proof-
family children of `math.found.proof`, plus its two freestanding
siblings `theorem` and `conjecture`), verified programmatically against
the live KG: `direct-proof`, `proof-by-contradiction`,
`proof-by-contrapositive`, `proof-by-cases`, `existence-proof`,
`writing-mathematics`, `theorem`, `conjecture`. None of the 8 had an
existing Blueprint — all authored via the birth-taxonomy diagnostic
procedure, each explicitly reusing `math.found.proof`'s own already-
authored worked examples (the n-even/n²-even direct proof, the
√2-irrationality contradiction proof, the n²−n+41 proof-by-example
counterexample) by reference rather than restating them — e.g.
`direct-proof`'s own Demonstrations section narrates `math.found.proof`'s
existing example with structural labels added, not a new example;
`conjecture`'s MC-1 explicitly extends `math.found.proof`'s own MC-1
(proof-by-example) to the terminology of what counts as a theorem.
`proof-by-contrapositive`'s MC-1 (confusing contrapositive with converse/
inverse) was identified as the single highest-stakes misconception in
this wave — arguably the most common named error in introductory proof-
writing generally — and given Foundational weight accordingly.

`math.found` 55/82 → **63/82** — still IN PROGRESS; Wave 10 candidates
computed programmatically against the live KG (7): `uniqueness-proof`,
`lemma`, `corollary`, `equivalence-class`, `total-order`,
`hasse-diagram`, `cardinality`. No other domain touched. All five
tracking files updated in this same commit; re-validated 0 duplicates,
0 orphans, 0 Quality Gate 3 violations across all 64 mathematics
entries.

### Mathematics — math.found Wave 10 (2026-07-26, autonomous loop iteration 2)

Re-synced `main` (one new unrelated commit, `6aed2aa2`, a Groq error-
classification fix — fast-forwarded, zero overlap) and re-ran the full
Quality Gate 3 audit across all 64 pre-batch mathematics entries — 0
violations found.

**Wave 10** — authored the 7 concepts whose prerequisites became fully
satisfied after Wave 9, verified programmatically against the live KG:
`uniqueness-proof`, `lemma`, `corollary`, `equivalence-class`,
`total-order`, `hasse-diagram`, `cardinality`. 3 of the 7
(`equivalence-class`, `total-order`, `cardinality`) had existing
Blueprints reused by reference; 4 (`uniqueness-proof`, `lemma`,
`corollary`, `hasse-diagram`) had none, authored via the birth-taxonomy
diagnostic procedure. `lemma` and `corollary` are sibling entries — both
cite `math.found.theorem`'s own MC-1 (role-vs-rigor conflation) by
reference rather than re-deriving it, since both are direct, specific
instances of that same misconception applied to their own labels; each
then contributes one genuinely new misconception of its own (lemma's
extraction-purpose question; corollary's restatement-vs-genuine-content
distinction). `uniqueness-proof` directly extends `math.found.
existence-proof`'s own existence/uniqueness scope distinction from the
uniqueness side.

`math.found` 63/82 → **70/82** — only 12 concepts now remain:
`proof-by-induction`, `strong-induction`, `well-ordering-principle`,
`finite-set`, `countable-set`, `uncountable-set`, `natural-numbers`,
`integers`, `rational-numbers`, `irrational-numbers`, `real-numbers`,
`complex-numbers`. Wave 11 candidates computed programmatically (2):
`finite-set`, `natural-numbers` — the remaining concepts form a tight
dependency chain (natural-numbers → integers → rational-numbers →
irrational-numbers → real-numbers → complex-numbers, and separately
proof-by-induction/strong-induction/well-ordering-principle depending
on natural-numbers) that will resolve in a small number of further
waves as math.found approaches Domain Certification. No other domain
touched. All five tracking files updated in this same commit;
re-validated 0 duplicates, 0 orphans, 0 Quality Gate 3 violations
across all 71 mathematics entries.

### Mathematics — math.found Wave 11 (2026-07-26, autonomous loop iteration 3)

Autonomous `/loop` iteration 3, per the 2026-07-26 loop-activation
standing instruction. Git resync: local `main` was in sync with
`origin/main` at commit `8e102e44` (no divergence, no new commits to
reconcile) at this iteration's start.

**Repair-audit first** (per this program's standing per-iteration
discipline): re-ran the Quality Gate 3 heading-conformance check across
all 71 pre-batch mathematics entries. **0 violations found** — the
prior iteration's repair work (Wave 6 batch + `math.arith.fractions`)
remains intact; no new violations introduced by Wave 10.

**Wave 11**: authored the 2 concepts whose prerequisites became fully
satisfied after Wave 10, verified programmatically against the live KG:
`finite-set`, `natural-numbers`.

- `math.found.finite-set` — no existing Blueprint (confirmed via
  `ls docs/curriculum/blueprints/math.found.finite-set.md`, not found).
  Two misconceptions authored directly via the birth-taxonomy
  diagnostic procedure: MC-1 (finite equated with "small" or "easily
  writable" rather than the bijection-to-{1,…,n} definition, classified
  Type 1 overgeneralization) and MC-2 (finite confused with "has a
  maximum element," classified Type 1 overgeneralization, repaired via
  the {red, green, blue} unordered finite-set counterexample). Reuses
  `math.found.cardinality`'s own bijection-existence machinery
  throughout rather than re-deriving it.
- `math.found.natural-numbers` — grounded in an existing
  PACKAGE_READY Blueprint (`docs/curriculum/blueprints/math.found.
  natural-numbers.md`, V-1 through V-20 PASS, AIR PASS). Reused the
  Blueprint's own 3-item Misconception Registry by reference (MC-1
  ZERO-MEMBERSHIP — reclassified here as Type 3 language contamination,
  since the learner imports one authoritative-sounding curriculum's
  convention as though it were the symbol's only meaning, rather than
  overgeneralizing from limited examples; FOUNDATIONAL per the
  Blueprint's own MAMR, must clear before MC-2/MC-3; MC-2
  PEANO-INFORMAL; MC-3 WELL-ORDER-FINITE) and the full TA-A07
  mastery-gate item bank (Q1-Q6 + the P76 cross-link transfer probe)
  cited directly by reference rather than restated. This concept's KG
  `unlocks` (`math.arith.counting`, `math.found.proof-by-induction`,
  `math.nt.divisibility`) match the Blueprint's own Component 7 Output
  Unlocks table exactly, cross-checked as part of authoring.

`math.found` 70/82 → **72/82** — only 10 concepts now remain:
`proof-by-induction`, `strong-induction`, `well-ordering-principle`,
`countable-set`, `uncountable-set`, `integers`, `rational-numbers`,
`irrational-numbers`, `real-numbers`, `complex-numbers`. Wave 12
candidates computed programmatically (4): `proof-by-induction`
(now unblocked — both its prerequisites, `proof` and `natural-numbers`,
are authored), `well-ordering-principle`, `countable-set`, `integers` —
all four became ready specifically because `natural-numbers` cleared
this wave; `strong-induction`, `uncountable-set`, and the
`rational-numbers`→`irrational-numbers`→`real-numbers`→
`complex-numbers` chain remain blocked pending their own direct
prerequisites. No other domain touched. All five tracking files updated
in this same commit; re-validated 0 duplicates, 0 orphans, 0 Quality
Gate 3 violations across all 73 mathematics entries.

Full validation this batch: all 6 subject KG validators PASS (0
failures, 0 warnings each), `npx tsc --noEmit` clean, full vitest suite
2133 passed / 1 skipped (112 files), `npm run build` succeeded.

### Mathematics — math.found Wave 12 (2026-07-26, autonomous loop iteration 4)

Autonomous `/loop` iteration 4, per the 2026-07-26 loop-activation
standing instruction. Git resync: local `main` was in sync with
`origin/main` at commit `00970aa4` (no divergence, no new commits to
reconcile) at this iteration's start.

**Repair-audit first** (per this program's standing per-iteration
discipline): re-ran the Quality Gate 3 heading-conformance check across
all 73 pre-batch mathematics entries. **0 violations found**.

**Wave 12**: authored the 4 concepts whose prerequisites became fully
satisfied after Wave 11, verified programmatically against the live KG:
`proof-by-induction`, `well-ordering-principle`, `countable-set`,
`integers`.

- `math.found.proof-by-induction` — grounded in an existing
  PACKAGE_READY Blueprint (V-1 through V-20 PASS). Reused the
  Blueprint's own 3-item Misconception Registry by reference (MC-1
  INDUCTIVE-HYPOTHESIS-TREATED-AS-CIRCULAR; MC-2
  BASE-CASE-OMITTED-AS-UNNECESSARY; MC-3
  HYPOTHESIS-NOT-EXPLICITLY-INVOKED — all classified Type 1
  overgeneralization) and the full P77 4-problem set + P76 transfer
  probe cited directly by reference.
- `math.found.well-ordering-principle` — grounded in an existing
  PACKAGE_READY Blueprint. Reused its 3-item Misconception Registry
  (MC-1 EMPTY-SET-EXCEPTION-OVERLOOKED, Type 1; MC-2
  MINIMAL-COUNTEREXAMPLE-STRUCTURE-NOT-RECOGNIZED, Type 1; MC-3
  WELL-ORDERING-ASSUMED-TO-APPLY-BEYOND-NATURAL-NUMBERS, Type 6 analogy
  overextension) and item bank by reference. States and applies the
  Blueprint's own equivalence-to-induction sketch, directly connecting
  to `math.found.proof-by-induction`.
- `math.found.countable-set` — no existing Blueprint (confirmed via
  `ls docs/curriculum/blueprints/math.found.countable-set.md`, not
  found). Three misconceptions authored directly via the
  birth-taxonomy diagnostic procedure: MC-1 (countable equated with
  small, Type 1 overgeneralization), MC-2 (density assumed to increase
  cardinality — the ℚ-vs-ℤ counterintuitive case, Type 6 analogy
  overextension, repaired via Cantor's diagonal enumeration of ℚ⁺),
  MC-3 (countable conflated with countably infinite, Type 3 language
  contamination). Reuses `math.found.finite-set` and `math.found.
  cardinality`'s own definitions throughout rather than re-deriving
  them.
- `math.found.integers` — grounded in an existing PACKAGE_READY
  Blueprint. Reused its 3-item Misconception Registry (MC-1
  NEGATIVE-AS-SUBTRACTION — reclassified here as Type 4 notation-
  induced, since the "−" symbol is genuinely overloaded between binary
  subtraction and unary sign-marking, rather than an overgeneralization
  from limited examples; FOUNDATIONAL per the Blueprint's own MAMR; MC-2
  RING-CONFUSION, Type 1; MC-3 ZERO-ASYMMETRY, Type 1) and the full
  TA-A06 mastery-gate item bank by reference. This concept's KG
  `unlocks` (`math.arith.negative-numbers`, `math.nt.divisibility`)
  match the Blueprint's own Component 7 Output Unlocks table exactly.

`math.found` 72/82 → **76/82** — only 6 concepts now remain:
`strong-induction`, `uncountable-set`, `rational-numbers`,
`irrational-numbers`, `real-numbers`, `complex-numbers`. Wave 13
candidates computed programmatically (3): `strong-induction` (now
unblocked — its prerequisite `proof-by-induction` cleared this wave),
`uncountable-set` (unblocked — its prerequisite `countable-set` cleared
this wave), `rational-numbers` (unblocked — its prerequisite `integers`
cleared this wave); `irrational-numbers` → `real-numbers` →
`complex-numbers` remain blocked pending `rational-numbers` and each
other in sequence. No other domain touched. All five tracking files
updated in this same commit; re-validated 0 duplicates, 0 orphans, 0
Quality Gate 3 violations across all 77 mathematics entries.

Full validation this batch: all 6 subject KG validators PASS (0
failures, 0 warnings each), `npx tsc --noEmit` clean, full vitest suite
2133 passed / 1 skipped (112 files), `npm run build` succeeded.

### Mathematics — math.found Wave 13 (2026-07-26, autonomous loop iteration 5)

Autonomous `/loop` iteration 5, per the 2026-07-26 loop-activation
standing instruction. Git resync: local `main` was in sync with
`origin/main` at commit `6ed1bb51` (no divergence, no new commits to
reconcile) at this iteration's start.

**Repair-audit first** (per this program's standing per-iteration
discipline): re-ran the Quality Gate 3 heading-conformance check across
all 77 pre-batch mathematics entries. **0 violations found**.

**Wave 13**: authored the 3 concepts whose prerequisites became fully
satisfied after Wave 12, verified programmatically against the live KG:
`strong-induction`, `uncountable-set`, `rational-numbers`.

- `math.found.strong-induction` — no existing Blueprint (confirmed via
  `ls`, not found). Three misconceptions authored directly via the
  birth-taxonomy diagnostic procedure: MC-1 (strong induction assumed
  more powerful than standard induction, Type 3 language contamination
  — the word "strong" imports its everyday-English connotation of
  superiority rather than its technical meaning of a richer hypothesis;
  repaired via the auxiliary-statement Q(n) equivalence construction),
  MC-2 (overused by default, Type 1 overgeneralization), MC-3 (multiple
  base cases omitted, Type 1 overgeneralization). Directly extends
  `math.found.proof-by-induction`'s own base-case/inductive-step
  vocabulary rather than re-deriving it.
- `math.found.uncountable-set` — no existing Blueprint. Three
  misconceptions authored via the birth-taxonomy diagnostic procedure:
  MC-1 (uncountable equated with vague large size, Type 1, FOUNDATIONAL
  parallel to `math.found.countable-set`'s own MC-1), MC-2 (diagonal
  construction guarantee not understood, Type 1), MC-3 (diagonal
  argument overextended to ℚ, Type 6 analogy overextension — conflating
  the diagonal ARGUMENT that disproves a listing exists for ℝ with the
  diagonal ENUMERATION that constructs one for ℚ, directly reusing
  `math.found.countable-set`'s own Cantor grid-enumeration content by
  reference for the contrast). Cantor's diagonal argument for (0,1)
  authored directly as the concept's central demonstration, confirming
  the strict cardinality inequality |ℝ|>|ℕ| previewed but not proven in
  `math.found.cardinality`'s own Core Understanding.
- `math.found.rational-numbers` — grounded in an existing PACKAGE_READY
  Blueprint. Reused its 3-item Misconception Registry by reference
  (MC-1 FRACTION-UNIQUE — reclassified here as Type 3 language
  contamination, since elementary education presents each fraction
  symbol as a self-contained complete object rather than the learner
  overgeneralizing from limited examples; FOUNDATIONAL per the
  Blueprint's own MAMR; MC-2 DENSITY-COMPLETENESS, also reclassified
  Type 3 — the everyday sense of "dense" as "no gaps" is imported
  wholesale; MC-3 RATIONAL-TERMINATING, Type 1) and the full TA-A07
  mastery-gate item bank (Q1-Q6 + P76 cross-link transfer probe, citing
  `math.arith.fractions` directly) by reference. Cross-checked against
  the already-authored `math.arith.fractions` entry to avoid
  duplicating its own Core Understanding/Mental Models content — cited
  by reference instead. One genuine Curriculum Feedback finding
  recorded honestly (not fixed, no KG file modified): `math.arith.
  fractions` (Delivery 5, 2026-07-10, predating this program's strict
  topological-order discipline) lists `math.found.rational-numbers`
  among its own KG `requires`, meaning it was technically authored
  before its own prerequisite — inherited pre-existing content, not an
  ordering violation by this program's own Wave-by-wave process.

`math.found` 76/82 → **79/82** — only 3 concepts now remain, forming a
strict chain: `irrational-numbers` → `real-numbers` → `complex-numbers`
(each directly requiring the previous, per the KG). Wave 14 candidates
computed programmatically (1): `irrational-numbers` (now unblocked —
its prerequisite `rational-numbers` cleared this wave); `real-numbers`
and `complex-numbers` will each unblock one at a time as the chain
resolves in subsequent waves. No other domain touched. All five
tracking files updated in this same commit; re-validated 0 duplicates,
0 orphans, 0 Quality Gate 3 violations across all 80 mathematics
entries.

Full validation this batch: all 6 subject KG validators PASS (0
failures, 0 warnings each), `npx tsc --noEmit` clean, full vitest suite
2133 passed / 1 skipped (112 files), `npm run build` succeeded.

### Mathematics — math.found Wave 14 (2026-07-26, autonomous loop iteration 6)

Autonomous `/loop` iteration 6, per the 2026-07-26 loop-activation
standing instruction. Git resync: local `main` was in sync with
`origin/main` at commit `fc612e68` (no divergence, no new commits to
reconcile) at this iteration's start.

**Repair-audit first** (per this program's standing per-iteration
discipline): re-ran the Quality Gate 3 heading-conformance check across
all 80 pre-batch mathematics entries. **0 violations found**.

**Wave 14**: authored the single concept whose prerequisite became
fully satisfied after Wave 13, verified programmatically against the
live KG: `irrational-numbers`.

- `math.found.irrational-numbers` — grounded in an existing
  PACKAGE_READY Blueprint. Reused its 3-item Misconception Registry by
  reference (MC-1 IRRATIONAL-IMPRECISE — reclassified here as Type 4
  notation-induced, since the "=" sign is routinely used informally in
  place of "≈" for decimal approximations in casual practice, directly
  training the conflation at the notation level rather than the
  learner overgeneralizing from limited examples; FOUNDATIONAL per the
  Blueprint's own MAMR; MC-2 INFINITE-DECIMAL-IRRATIONAL, Type 1; MC-3
  IRRATIONAL-RARE, Type 1) and the full TA-A05 mastery-gate item bank
  (Q1-Q4 + P76 independence transfer probe) by reference. The √2
  proof-by-contradiction authored directly as the concept's central
  demonstration. Directly extends `math.found.rational-numbers`'s own
  decimal-characterization diagnostic (terminating/repeating) into the
  complementary non-terminating-non-repeating case, and reuses
  `math.found.countable-set`/`math.found.uncountable-set`'s own
  countability machinery for the abundance argument (ℚ countable, ℝ
  uncountable, therefore ℝ∖ℚ uncountable) rather than re-deriving it.

`math.found` 79/82 → **80/82** — only 2 concepts now remain, forming a
strict chain: `real-numbers` → `complex-numbers`. Wave 15 candidates
computed programmatically (1): `real-numbers` (now unblocked — both its
prerequisites, `irrational-numbers` and `rational-numbers`, are
authored); `complex-numbers` will unblock once `real-numbers` clears in
the next wave — the final wave before `math.found` Domain Certification
becomes eligible at 82/82. No other domain touched. All five tracking
files updated in this same commit; re-validated 0 duplicates, 0
orphans, 0 Quality Gate 3 violations across all 81 mathematics entries.

Full validation this batch: all 6 subject KG validators PASS (0
failures, 0 warnings each), `npx tsc --noEmit` clean, full vitest suite
2133 passed / 1 skipped (112 files), `npm run build` succeeded.

### Mathematics — math.found Wave 15 (2026-07-26, autonomous loop iteration 7)

Autonomous `/loop` iteration 7, per the 2026-07-26 loop-activation
standing instruction. Git resync: local `main` was in sync with
`origin/main` at commit `2751c48f` (no divergence, no new commits to
reconcile) at this iteration's start.

**Repair-audit first** (per this program's standing per-iteration
discipline): re-ran the Quality Gate 3 heading-conformance check across
all 81 pre-batch mathematics entries. **0 violations found**.

**Wave 15**: authored the single concept whose prerequisites became
fully satisfied after Wave 14, verified programmatically against the
live KG: `real-numbers`.

- `math.found.real-numbers` — grounded in an existing PACKAGE_READY
  Blueprint. Reused its 3-item Misconception Registry by reference
  (MC-1 REAL-IS-DECIMAL — reclassified here as Type 3 language
  contamination, since the phrase "real number" sounds like a distinct
  category rather than the learner overgeneralizing from limited
  examples; FOUNDATIONAL per the Blueprint's own MAMR; MC-2
  RATIONAL-IS-COMPLETE, directly inherited from `math.found.
  rational-numbers`'s own MC-2, Type 3; MC-3 IRRATIONALS-ARE-RARE,
  directly inherited from `math.found.irrational-numbers`'s own MC-3,
  Type 1) and the full P77/P76 mastery-gate item bank by reference.
  Synthesizes both prerequisites directly via ℝ=ℚ∪(ℝ∖ℚ); the
  completeness/LUB property authored directly as the concept's central
  demonstration (the {q∈ℚ:q²<2} gap example), extending `math.found.
  rational-numbers`'s own density-without-completeness distinction into
  a fully general structural property. One honest Cross-Subject
  Connections finding recorded (not fixed): both KG `cross_links`
  targets (`math.calc.limits`, `math.real.completeness`) remain
  unauthored — the Blueprint's own P76 transfer probe ((1+1/n)ⁿ→e)
  anticipates `math.calc.limits`'s content directly, to be genuinely
  activated once that concept is authored.

`math.found` 80/82 → **81/82** — only **1 concept now remains**:
`complex-numbers`. Wave 16 (the final wave for this domain) is already
computable: `complex-numbers` — once authored, `math.found` reaches
82/82 and becomes eligible for Domain Certification per `ROADMAP.md`
§3's own standing gate. No other domain touched. All five tracking
files updated in this same commit; re-validated 0 duplicates, 0
orphans, 0 Quality Gate 3 violations across all 82 mathematics entries.

Full validation this batch: all 6 subject KG validators PASS (0
failures, 0 warnings each), `npx tsc --noEmit` clean, full vitest suite
2133 passed / 1 skipped (112 files), `npm run build` succeeded.

### Mathematics — math.found Wave 16 — FINAL WAVE, DOMAIN COMPLETE (2026-07-26, autonomous loop iteration 8)

Autonomous `/loop` iteration 8, per the 2026-07-26 loop-activation
standing instruction. Git resync: local `main` was in sync with
`origin/main` at commit `39ab16ef` (no divergence, no new commits to
reconcile) at this iteration's start.

**Repair-audit first** (per this program's standing per-iteration
discipline): re-ran the Quality Gate 3 heading-conformance check across
all 82 pre-batch mathematics entries. **0 violations found**.

**Wave 16 (final wave)**: authored the single remaining `math.found`
concept, verified programmatically against the live KG:
`complex-numbers`.

- `math.found.complex-numbers` — grounded in an existing PACKAGE_READY
  Blueprint. Reused its 3-item Misconception Registry by reference
  (MC-1 SQRT-NEGATIVE-UNDEFINED — reclassified here as Type 4
  notation-induced, since the specific symbol "√(−1)" is what triggers
  the confusion via correct-but-misapplied prior instruction, rather
  than a broad overgeneralization; FOUNDATIONAL per the Blueprint's own
  MAMR; MC-2 I-IS-JUST-A-SYMBOL, Type 1; MC-3
  COMPLEX-NUMBERS-ARE-NOT-REAL, Type 3 language contamination — the
  everyday sense of "complex" as "complicated" is imported directly)
  and the full P77/P76 mastery-gate item bank (cross-linking `math.
  trig.polar-form-complex`) by reference. Directly extends `math.
  found.real-numbers`'s own definitional-extension framing (i declared
  by i²=−1, exactly as √2 and negative integers were declared at
  earlier stages) and geometric distance intuition (modulus as
  two-dimensional Pythagorean distance).

**`math.found` reaches 82/82 (100%) — DOMAIN CERTIFIED.** Verified
programmatically: 0 missing `math.found` concepts against the live KG.
All 82 entries re-verified this batch against Quality Gate 3's exact
21-section heading order — 0 violations across the full domain. 0
duplicates, 0 orphans across all 83 mathematics entries. Full
certification record, including 3 carried-forward-but-non-blocking
KGCS review items, in `VALIDATION_REPORT.md`'s own "Domain
Certification — math.found (UPDATE)" section.

**Next mathematics domain identified (not yet started this batch, per
this program's own "one small bounded batch per turn" discipline —
Wave 16 was itself this batch's one bounded unit of work)**:
`math.arith` (58 total concepts, 1 already authored —
`math.arith.fractions`, the original Delivery-5 seed entry). Its sole
zero-`math.arith`-prerequisite entry node is `math.arith.counting`,
requiring only `math.found.natural-numbers` (already authored) — now
unlocked and ready to be Wave 1 of the `math.arith` domain next
iteration. Full reasoning for selecting `math.arith` over the other 22
unauthored mathematics domains recorded in `ROADMAP.md` §5.

All five tracking files updated in this same commit, including
`ROADMAP.md` §3 (status flipped to COMPLETE — CERTIFIED) and §5 (new
default target: `math.arith` Wave 1) and `VALIDATION_REPORT.md` (new
Domain Certification record appended, superseding but not deleting the
prior 31/82 "does NOT pass" record as historical audit trail).

Full validation this batch: all 6 subject KG validators PASS (0
failures, 0 warnings each), `npx tsc --noEmit` clean, full vitest suite
2133 passed / 1 skipped (112 files), `npm run build` succeeded.

### Mathematics — math.arith Wave 1 (2026-07-26, autonomous loop iteration 9)

Autonomous `/loop` iteration 9, per the 2026-07-26 loop-activation
standing instruction. First batch in the `math.arith` domain,
immediately following `math.found`'s Domain Certification. Git resync:
after pushing the `math.found` certification commit, several
concurrent commits landed (a temporary Chemistry AssetIdentity admin
seeding endpoint, later reverted; then 19 "Chemistry AssetIdentity seed
batch N" data-only commits from a parallel session bringing Chemistry's
DB-backed AssetIdentity rows from ~0 toward 380/744) — all verified via
`git diff --stat` to touch only `CLAUDE.md`, `docs/architecture/*`,
`src/app/api/admin/seed-chemistry-assets/route.ts`, and `vercel.json`,
zero overlap with `educational-brain/` or any KG file; merged cleanly
across two rounds (a 403 push rejection on the first attempt required a
second fetch+merge+push cycle, itself catching one more concurrent
commit).

**Repair-audit first** (per this program's standing per-iteration
discipline): re-ran the Quality Gate 3 heading-conformance check across
all 83 pre-batch mathematics entries (the 82 `math.found` entries plus
`math.arith.fractions`). **0 violations found**.

**Domain selection**: computed programmatically which mathematics
domain to target next now that `math.found` is complete. `math.arith`
was selected — the only one of 23 remaining unauthored domains with an
existing authored entry (`math.arith.fractions`, the original
Delivery-5 seed) and the domain immediately adjacent to `math.found` in
the KG's own `requires` structure. Confirmed `math.arith`'s sole
zero-`math.arith`-prerequisite entry node: `math.arith.counting`,
requiring only `math.found.natural-numbers` (already authored).

**Wave 1**: authored `math.arith.counting` — grounded in an existing
PACKAGE_READY Blueprint. Reused its 3-item Misconception Registry by
reference (MC-1 COUNTING-WITHOUT-BIJECTION, FOUNDATIONAL, Type 1
overgeneralization; MC-2 ORDER-DEPENDENT-CARDINALITY, Type 1; MC-3
PROCEDURE-REPLACES-STRUCTURE, Type 1) and the full P77/P76 mastery-gate
item bank by reference. Directly reuses `math.found.natural-numbers`'s
own successor-based tag sequence as the bijection's domain.

**6 further Wave-1-eligible concepts identified and Blueprint-verified
this batch but deliberately deferred to Wave 2** (all require only
`math.arith.fractions`, already authored; all confirmed PACKAGE_READY
via direct read): `math.arith.fraction-equivalence`, `math.arith.
fraction-multiplication`, `math.arith.fraction-reciprocal`, `math.
arith.mixed-numbers`, `math.arith.improper-fractions`, `math.arith.
ratios`. Deferred specifically because their Blueprints use a
substantially longer, more elaborate format (Educational Brain v1.0
primitive-notation style, multi-protocol student-state-matrix
structure, 900-1200 lines each) than the `math.found` domain's
Blueprints (typically 300-650 lines) — authoring all 7 candidates in
one turn risked exceeding this program's own "one small bounded batch"
discipline and quality bar. No re-verification needed next iteration —
proceed directly to authoring all 6 in Wave 2.

`math.arith` now 2/58 (`fractions` + `counting`). No other domain
touched. All five tracking files updated in this same commit (including
`ROADMAP.md` §5's item 1a, updated with the Wave 2 candidate list and
Blueprint-verification status); re-validated 0 duplicates, 0 orphans, 0
Quality Gate 3 violations across all 84 mathematics entries.

Full validation this batch: all 6 subject KG validators PASS (0
failures, 0 warnings each), `npx tsc --noEmit` clean, full vitest suite
2133 passed / 1 skipped (112 files), `npm run build` succeeded.

### Mathematics — math.arith Wave 2 part 1 (2026-07-26, autonomous loop iteration 10)

Autonomous loop iteration 10, triggered by a bare `/loop` re-invocation
in the same session (the autonomous-default dynamic-pacing template);
resolved to continuing the established, explicitly-active Mathematics
Educational Brain Autonomous Completion Program, since the immediately
prior turn had explicitly deferred 6 Blueprint-verified `math.arith`
Wave 2 candidates for this exact next iteration. Git resync: one
concurrent Chemistry AssetIdentity seed-batch commit (`CLAUDE.md` only,
zero overlap) fast-forward merged cleanly at this iteration's start.

**Repair-audit first** (per this program's standing per-iteration
discipline): re-ran the Quality Gate 3 heading-conformance check across
all 84 pre-batch mathematics entries. **0 violations found**.

**Wave 2 part 1**: authored 3 of the 6 concepts deferred from Wave 1,
all grounded in existing PACKAGE_READY Blueprints (Educational Brain
v1.0 primitive-notation format, previously read in full):

- `math.arith.fraction-equivalence` — reused its 2-item Misconception
  Registry by reference (MC-1 ADDING-PRESERVES-EQUIVALENCE,
  FOUNDATIONAL, Type 1 overgeneralization from the equation-solving
  "same operation to both sides" heuristic; MC-2
  ONLY-SIMPLIFIED-IS-VALID, Type 1) and the 5-probe mastery gate by
  reference.
- `math.arith.fraction-multiplication` — reused its 3-item
  Misconception Registry (MC-1 addition-algorithm-for-multiplication,
  FOUNDATIONAL for MC-2, Type 1; MC-2 dividing-parts-separately, Type
  1; MC-3 whole-number-in-denominator, Type 1) and the area-model
  demonstration by reference. Directly cross-references `math.arith.
  fraction-reciprocal`'s own product-test definition for the division
  algorithm's justification.
- `math.arith.fraction-reciprocal` — reused its 3-item Misconception
  Registry (MC-1 reciprocal-equals-negative — reclassified here as
  Type 3 language contamination, since "opposite" colloquially names
  both the additive and multiplicative inverse; FOUNDATIONAL; MC-2
  whole-number-reciprocal-blind-spot, Type 1; MC-3
  mixed-number-flip-error, Type 1) by reference. Its `math.abst.field`
  cross-link is confirmed informational-only at this Bloom level per
  the Blueprint's own Component 6 note — the word "field" is never
  introduced.

`math.arith` now 5/58 (`fractions`, `counting`, `fraction-equivalence`,
`fraction-multiplication`, `fraction-reciprocal`). 3 further
Wave-2-eligible concepts remain deferred to Wave 2 part 2, already
Blueprint-verified PACKAGE_READY, no re-verification needed:
`math.arith.mixed-numbers`, `math.arith.improper-fractions`, `math.
arith.ratios`. No other domain touched. All five tracking files
updated in this same commit; re-validated 0 duplicates, 0 orphans, 0
Quality Gate 3 violations across all 87 mathematics entries.

Full validation this batch: all 6 subject KG validators PASS (0
failures, 0 warnings each), `npx tsc --noEmit` clean, full vitest suite
2133 passed / 1 skipped (112 files), `npm run build` succeeded.

### Mathematics — math.arith Wave 2 part 2 (2026-07-26, autonomous loop iteration 11)

Autonomous loop iteration 11, continuing the same established Mathematics
Educational Brain Autonomous Completion Program (dynamic-pacing
`<<autonomous-loop-dynamic>>` sentinel fire). Git resync: one concurrent
Chemistry AssetIdentity seed-batch commit (`CLAUDE.md` only, zero
overlap with `educational-brain/`) fast-forward merged cleanly at this
iteration's start.

**Repair-audit first** (per this program's standing per-iteration
discipline): re-ran the Quality Gate 3 heading-conformance check across
all 87 pre-batch mathematics entries. **0 violations found**.

**Wave 2 part 2**: authored the remaining 3 of the 6 concepts deferred
from Wave 1, all grounded in existing Blueprints (Educational Brain
v1.0 primitive-notation format, ~900-1300 lines each):

- `math.arith.mixed-numbers` — reused its 3-item Misconception Registry
  by reference: MC-1 "addition without LCD" (FOUNDATIONAL, Type 1
  overgeneralization from whole-number addition), MC-2 "subtraction
  regrouping omitted" (Type 1), MC-3 "mixed multiplication adds whole
  parts separately" (Type 1, independent of MC-2). Documented in
  Curriculum Feedback (not fixed, no KG/Blueprint file touched) that
  `math.arith.improper-fractions` is a *related* concept, not a formal
  prerequisite in either direction, per both Blueprints' own component
  notes.
- `math.arith.improper-fractions` — reused its 3-item Misconception
  Registry by reference: MC-1 "improper fractions are wrong/invalid"
  (FOUNDATIONAL, reclassified here as Type 3 language contamination —
  the everyday sense of "improper" as "incorrect" contaminates the
  mathematical term), MC-2 "mixed-to-improper conversion without
  understanding" (Type 1), MC-3 "improper-to-mixed denominator loss"
  (Type 1).
- `math.arith.ratios` — reused its 3-item Misconception Registry by
  reference: MC-1 "ratio is commutative" (FOUNDATIONAL, reclassified
  here as Type 6 analogy overextension — overextends the ordinary
  commutativity of addition/multiplication onto ratio notation, where
  order is meaningful), MC-2 "part-to-part vs. part-to-whole confusion"
  (Type 1), MC-3 "ratio simplification changes the underlying
  quantities" (Type 1). Its `math.func.linear-function` cross-link
  (KG `cross_links` field) was verified NOT yet authored in either
  Educational Brain or Blueprint form — documented honestly in
  Cross-Subject Connections rather than invented.

`math.arith` now 8/58 (`fractions`, `counting`, `fraction-equivalence`,
`fraction-multiplication`, `fraction-reciprocal`, `mixed-numbers`,
`improper-fractions`, `ratios`) — Wave 2 fully complete (all 6 deferred
concepts now authored). Wave 3 candidates computed programmatically
from the live KG (all `requires` now satisfied): `math.arith.
counting-sequence`, `math.arith.subitizing`, `math.arith.place-value`,
`math.arith.number-line` (all four unlocked by `math.arith.counting`),
plus `math.arith.proportion`, `math.arith.unit-rate` (both unlocked by
`math.arith.ratios`) — 6 concepts, not yet Blueprint-checked. No other
domain touched. All five tracking files updated in this same commit;
re-validated 0 duplicates, 0 orphans, 0 Quality Gate 3 violations
across all 90 mathematics entries.

Full validation this batch: all 6 subject KG validators PASS (0
failures, 0 warnings each), `npx tsc --noEmit` clean, full vitest suite
run, `npm run build` succeeded (exact figures recorded in the commit
this section accompanies).

### Mathematics — math.arith Wave 3 (2026-07-26, autonomous loop iteration 12)

Autonomous loop iteration 12, continuing the same established
Mathematics Educational Brain Autonomous Completion Program
(dynamic-pacing `<<autonomous-loop-dynamic>>` sentinel fire). Git
resync: one concurrent Chemistry AssetIdentity seed-batch commit
(`CLAUDE.md` only, zero overlap with `educational-brain/`) fast-forward
merged cleanly at this iteration's start.

**Repair-audit first** (per this program's standing per-iteration
discipline): re-ran the Quality Gate 3 heading-conformance check across
all 90 pre-batch mathematics entries. **0 violations found**.

**Wave 3**: authored the 6 concepts whose prerequisites became fully
satisfied after Wave 2 — verified programmatically against the live
KG, matching the expected candidate list exactly: `math.arith.
counting-sequence`, `math.arith.subitizing`, `math.arith.place-value`,
`math.arith.number-line` (all four unlocked by `math.arith.counting`),
plus `math.arith.proportion`, `math.arith.unit-rate` (both unlocked by
`math.arith.ratios`).

- `math.arith.counting-sequence` — reused its Misconception Registry
  by reference: MC-1 SEQUENCE-HAS-GAPS (FOUNDATIONAL, reclassified
  Type 5 instruction-induced), MC-2 COUNT-ORDER-CHANGES-TOTAL (Type 2
  perceptual intuition), MC-3 ZERO-STARTS-SEQUENCE (Type 6 analogy
  overextension from zero-indexed programming conventions).
- `math.arith.subitizing` — no Blueprint exists (verified via
  directory listing); 3 misconceptions authored directly via the
  birth-taxonomy diagnostic procedure: MC-1 SUBITIZING-RANGE-UNBOUNDED
  (FOUNDATIONAL, Type 2 perceptual intuition), MC-2
  SUBITIZING-REQUIRES-CANONICAL-PATTERN (Type 1 overgeneralization),
  MC-3 SUBITIZING-EQUALS-FAST-COUNTING (Type 3 language
  contamination — "instant" reinterpreted as "counting really fast").
- `math.arith.place-value` — reused its Misconception Registry by
  reference: MC-1 DIGIT-IS-VALUE (FOUNDATIONAL, Type 5
  instruction-induced), MC-2 EXPANDED-FORM-ADDITIVE-CONFUSION (Type 4
  notation-induced), MC-3 ZERO-PLACEHOLDER-INVISIBLE (Type 1
  overgeneralization).
- `math.arith.number-line` — reused its Misconception Registry by
  reference: MC-1 NEGATIVE-ORDERING-BY-MAGNITUDE (FOUNDATIONAL, Type 1
  overgeneralization from whole-number size intuition), MC-2
  DISTANCE-FROM-ZERO-DETERMINES-ORDER (Type 1, MC-1 generalized), MC-3
  NUMBER-LINE-HAS-GAPS (Type 2 perceptual intuition). Its Tier 1
  cross-link to `math.geom.coordinate-plane` (already authored) is
  used for a genuine cross-link transfer probe, not independence mode.
- `math.arith.proportion` — reused its Misconception Registry by
  reference: MC-1 QUANTITY-POSITIONS-MISMATCHED-ACROSS-RATIOS
  (FOUNDATIONAL, Type 5 instruction-induced), MC-2
  ANY-INCREASING-RELATIONSHIP-ASSUMED-PROPORTIONAL (Type 1
  overgeneralization), MC-3
  CROSS-MULTIPLICATION-APPLIED-WITHOUT-VALID-PROPORTION-SETUP (Type 5
  instruction-induced). Its `math.func.linear-function` cross-link
  confirmed genuinely not-yet-authored (same honest-gap pattern as
  `math.arith.ratios`'s identical cross-link from Wave 2).
- `math.arith.unit-rate` — no Blueprint exists (verified via directory
  listing); 3 misconceptions authored directly via the birth-taxonomy
  diagnostic procedure: MC-1 NUMERATOR-DENOMINATOR-CONFUSION
  (FOUNDATIONAL, Type 5 instruction-induced), MC-2
  UNIT-RATE-MEANS-PER-HOUR (Type 1 overgeneralization from the km/h
  introductory example), MC-3 UNIT-MEANS-MEASUREMENT-UNIT (Type 3
  language contamination — the everyday dual meaning of "unit").

`math.arith` now 14/58. Wave 4 candidates computed programmatically
from the live KG (all `requires` now satisfied): `math.arith.
ones-tens-hundreds`, `math.arith.addition`, `math.arith.decimals`
(Blueprints exist for all three), plus `math.arith.expanded-form`,
`math.arith.number-base`, `math.arith.ordering`, `math.arith.
direct-variation`, `math.arith.inverse-variation` (no Blueprints for
these five) — 8 concepts, not yet authored. No other domain touched.
All five tracking files updated in this same commit; re-validated 0
duplicates, 0 orphans, 0 Quality Gate 3 violations across all 96
mathematics entries.

Full validation this batch: all 6 subject KG validators PASS (0
failures, 0 warnings each), `npx tsc --noEmit` clean, full vitest suite
2133 passed / 1 skipped (112 files), `npm run build` succeeded.

### Mathematics — math.arith Wave 4 part 1 (2026-07-26, autonomous loop iteration 13)

Autonomous loop iteration 13, continuing the same established
Mathematics Educational Brain Autonomous Completion Program
(dynamic-pacing `<<autonomous-loop-dynamic>>` sentinel fire). Git
resync found zero concurrent commits at this iteration's start.

**Repair-audit first** (per this program's standing per-iteration
discipline): re-ran the Quality Gate 3 heading-conformance check across
all 96 pre-batch mathematics entries. **0 violations found**.

**Wave 4 candidates re-verified programmatically** (matching the prior
iteration's computed list exactly): 8 concepts — `math.arith.
ones-tens-hundreds`, `math.arith.addition`, `math.arith.decimals`
(Blueprints exist for all three), plus `math.arith.expanded-form`,
`math.arith.number-base`, `math.arith.ordering`, `math.arith.
direct-variation`, `math.arith.inverse-variation` (no Blueprints for
these five). Split into two parts given the heavier no-Blueprint load
(5 of 8, versus Wave 3's 2 of 6) — this batch authors the 3
Blueprint-grounded concepts as Wave 4 part 1.

- `math.arith.ones-tens-hundreds` — reused its Misconception Registry
  by reference: MC-1 ONES-TENS-HUNDREDS-ASSUMED-SEPARATE-CONCEPTS
  (FOUNDATIONAL, Type 1 overgeneralization), MC-2
  ZERO-COLUMN-ASSUMED-OMITTABLE (Type 1), MC-3
  CARRYING-ASSUMED-ARBITRARY-RULE (Type 5 instruction-induced). Found
  and honestly recorded two genuine Blueprint/KG metadata
  discrepancies: the live KG lists `unlocks: [carrying, borrowing]`
  while the Blueprint states "none listed"; the KG's `estimated_hours`
  is 4 while the Blueprint states 3. Both resolved in favor of the KG
  per this program's standing rule (KG authoritative on divergence);
  neither affects the Blueprint's pedagogical content; no KG or
  Blueprint file modified.
- `math.arith.addition` — reused its Misconception Registry by
  reference: MC-1 CARRYING-BREAKDOWN (FOUNDATIONAL, Type 5
  instruction-induced), MC-2 COMMUTATIVITY-UNKNOWN (Type 2 perceptual
  intuition), MC-3 ZERO-ANNIHILATES (Type 6 analogy overextension from
  multiplication's a×0=0 rule). Its Tier 1 cross-link to `math.linalg.
  vector-addition` used for a genuine cross-link transfer probe.
- `math.arith.decimals` — reused its Misconception Registry by
  reference: MC-1 LONGER-DECIMAL-IS-LARGER (FOUNDATIONAL, Type 1
  overgeneralization — the extensively-documented "longer-is-larger"
  error), MC-2 WHOLE-AND-DECIMAL-PARTS-SEPARATE (Type 1), MC-3
  MULTIPLY-BIGGER-DIVIDE-SMALLER-ALWAYS (Type 1).

`math.arith` now 17/58. Wave 4 part 2 (deferred): the 5 no-Blueprint
concepts (`expanded-form`, `number-base`, `ordering`,
`direct-variation`, `inverse-variation`), misconceptions to be
authored directly via the birth-taxonomy diagnostic procedure. No
other domain touched. All five tracking files updated in this same
commit; re-validated 0 duplicates, 0 orphans, 0 Quality Gate 3
violations across all 99 mathematics entries.

Full validation this batch: all 6 subject KG validators PASS (0
failures, 0 warnings each), `npx tsc --noEmit` clean, full vitest suite
2133 passed / 1 skipped (112 files), `npm run build` succeeded.

### Mathematics — math.arith Wave 4 part 2 (2026-07-26, autonomous loop iteration 14)

Autonomous loop iteration 14, continuing the same established
Mathematics Educational Brain Autonomous Completion Program
(dynamic-pacing `<<autonomous-loop-dynamic>>` sentinel fire). Git
resync found zero concurrent commits at this iteration's start.

**Repair-audit first** (per this program's standing per-iteration
discipline): re-ran the Quality Gate 3 heading-conformance check across
all 99 pre-batch mathematics entries. **0 violations found**.

**Wave 4 part 2**: authored the 5 no-Blueprint concepts deferred from
Wave 4 part 1 — `math.arith.expanded-form`, `math.arith.number-base`,
`math.arith.ordering`, `math.arith.direct-variation`, `math.arith.
inverse-variation` — all misconceptions authored directly via the
birth-taxonomy diagnostic procedure:

- `math.arith.expanded-form` — MC-1 EXPANDED-FORM-AS-DIGIT-PRODUCT
  (FOUNDATIONAL, Type 4 notation-induced), MC-2 ZERO-TERM-OMITTED
  (Type 1), MC-3 DIGIT-ITSELF-AS-TERM (Type 6 analogy overextension
  from an unrelated digit-sum procedure). Noted honestly in Curriculum
  Feedback: substantial conceptual overlap with `math.arith.
  place-value`'s own MC-2/MC-3, an expected consequence of
  `expanded-form` being the dedicated writing-task concept for the
  notation `place-value` first introduces.
- `math.arith.number-base` — MC-1 BASE-10-DIGITS-ASSUMED-UNIVERSAL
  (FOUNDATIONAL, Type 1), MC-2 POSITIONAL-VALUE-STAYS-POWERS-OF-TEN
  (Type 6 analogy overextension), MC-3 HEXADECIMAL-LETTERS-AS-VARIABLES
  (Type 3 language contamination).
- `math.arith.ordering` — MC-1 INEQUALITY-SYMBOL-DIRECTION-REVERSED
  (FOUNDATIONAL, Type 4 notation-induced), MC-2
  STRICT-VS-NONSTRICT-CONFLATION (Type 1), MC-3
  COMPOUND-INEQUALITY-MISREAD-AS-SEPARATE (Type 4 notation-induced).
- `math.arith.direct-variation` — MC-1 CONSTANT-K-MISIDENTIFIED
  (FOUNDATIONAL, Type 5 instruction-induced), MC-2
  ANY-LINEAR-RELATIONSHIP-ASSUMED-DIRECT-VARIATION (FOUNDATIONAL,
  Type 1, `math.arith.proportion`'s own MC-2 generalized to y=kx),
  MC-3 DIRECT-VARIATION-ASSUMED-ONLY-POSITIVE-K (Type 1).
- `math.arith.inverse-variation` — MC-1
  INVERSE-VARIATION-CONFUSED-WITH-DIRECT-VARIATION (FOUNDATIONAL,
  Type 3 language contamination — the shared word "variation"), MC-2
  INVERSE-VARIATION-ASSUMED-LINEAR-GRAPH (Type 6 analogy
  overextension), MC-3 PRODUCT-CONSTANT-NOT-CHECKED (Type 5
  instruction-induced).

**Genuine discovery, corrected same batch**: while authoring
`direct-variation`, found that Blueprints for `math.func.
linear-function` and `math.func.rational-function` (both dated
2026-07-22) now exist — contradicting a "not yet authored" claim
inherited from `math.arith.proportion`'s and `math.arith.ratios`'s
own Blueprints (accurate at THOSE Blueprints' own authoring time, now
stale). Used this to construct genuine cross-link transfer probes
(Gate 5 in both `direct-variation.md` and `inverse-variation.md`,
grounded in the actual documented content of the now-existing
Blueprints) rather than independence mode. Added a small, targeted
addendum to `math.arith.proportion.md`'s and `math.arith.ratios.md`'s
own Cross-Subject Connections sections recording the correction —
their existing P76 assessment content (each concept's OWN already-
authored mastery-gate probe) was NOT rewritten, since it correctly
reflects those concepts' own Blueprints' content as authored.

`math.arith` now 22/58. Wave 5 candidates to be computed
programmatically next iteration — the candidate pool grew
substantially after Wave 4 (`addition` and `decimals` each unlocked
several new children: `carrying`, `mental-addition`, `subtraction`,
`multiplication`, `decimal-operations`, `terminating-decimals`,
`repeating-decimals`, `percentages`, `rounding`), not yet re-verified
this turn. No other domain touched. All five tracking files updated in
this same commit; re-validated 0 duplicates, 0 orphans, 0 Quality Gate
3 violations across all 104 mathematics entries.

Full validation this batch: all 6 subject KG validators PASS (0
failures, 0 warnings each), `npx tsc --noEmit` clean, full vitest suite
2133 passed / 1 skipped (112 files), `npm run build` succeeded.

### Mathematics — math.arith Wave 5 part 1 (2026-07-26, autonomous loop iteration 15)

Autonomous loop iteration 15, continuing the same established
Mathematics Educational Brain Autonomous Completion Program
(dynamic-pacing `<<autonomous-loop-dynamic>>` sentinel fire). Git
resync found zero concurrent commits at this iteration's start.

**Repair-audit first** (per this program's standing per-iteration
discipline): re-ran the Quality Gate 3 heading-conformance check across
all 104 pre-batch mathematics entries. **0 violations found**.

**Wave 5 candidates computed programmatically**: 9 concepts whose
prerequisites became fully satisfied after Wave 4 — `math.arith.
subtraction`, `math.arith.multiplication`, `math.arith.percentages`,
`math.arith.rounding` (Blueprints exist for all four), plus `math.
arith.carrying`, `math.arith.mental-addition`, `math.arith.
decimal-operations`, `math.arith.terminating-decimals`, `math.arith.
repeating-decimals` (no Blueprints for these five). Split into two
parts given the heavier no-Blueprint load (5 of 9), following the same
pattern as Wave 4 — this batch authors the 4 Blueprint-grounded
concepts as Wave 5 part 1.

- `math.arith.subtraction` — reused its Misconception Registry by
  reference: MC-1 SMALLER-FROM-LARGER (FOUNDATIONAL, Type 1
  overgeneralization), MC-2 COMMUTATIVITY-ASSUMED (Type 1, addition's
  commutative law over-generalized), MC-3 BORROW-NOT-REDUCED (Type 5
  instruction-induced).
- `math.arith.multiplication` — reused its Misconception Registry by
  reference: MC-1 ADDITION-CONFUSION (FOUNDATIONAL, Type 1), MC-2
  COMMUTATIVITY-FALSE (Type 2 perceptual intuition), MC-3
  ZERO-IDENTITY-CONFUSION (Type 6 analogy overextension from
  addition's own a+0=a). Its two Tier 1 cross-links (`math.linalg.
  matrix-multiplication`, `math.abst.ring-theory`) used for a genuine
  cross-link transfer probe.
- `math.arith.percentages` — reused its Misconception Registry by
  reference: MC-1 PERCENT-ASSUMED-DIFFERENT-KIND-OF-NUMBER
  (FOUNDATIONAL, Type 5 instruction-induced), MC-2
  PERCENT-OF-ASSUMED-SPECIAL-PROCEDURE (Type 5), MC-3
  SEQUENTIAL-PERCENT-CHANGES-ASSUMED-TO-CANCEL (Type 1). Found and
  honestly recorded two more Blueprint/KG metadata discrepancies
  (unlocks list, estimated_hours), resolved in favor of the KG per
  standing rule — the same discrepancy pattern first found for
  `ones-tens-hundreds` in Wave 4 part 1.
- `math.arith.rounding` — reused its Misconception Registry by
  reference: MC-1 SIGNIFICANT-FIGURES-CONFLATED-WITH-DECIMAL-PLACES
  (FOUNDATIONAL, Type 3 language contamination), MC-2
  ROUNDING-INTERMEDIATE-RESULTS-ASSUMED-HARMLESS (FOUNDATIONAL, Type
  1), MC-3 LEADING-ZEROS-COUNTED-AS-SIGNIFICANT (Type 1). Its
  `math.num.floating-point` cross-link confirmed genuinely
  not-yet-authored (consistent with the Blueprint's own V-5 check).

`math.arith` now 26/58. Wave 5 part 2 (deferred): the 5 no-Blueprint
concepts (`carrying`, `mental-addition`, `decimal-operations`,
`terminating-decimals`, `repeating-decimals`), misconceptions to be
authored directly via the birth-taxonomy diagnostic procedure. No
other domain touched. All five tracking files updated in this same
commit; re-validated 0 duplicates, 0 orphans, 0 Quality Gate 3
violations across all 108 mathematics entries.

Full validation this batch: all 6 subject KG validators PASS (0
failures, 0 warnings each), `npx tsc --noEmit` clean, full vitest suite
2133 passed / 1 skipped (112 files), `npm run build` succeeded.

### Mathematics — math.arith Wave 5 part 2 (2026-07-26, autonomous loop iteration 16)

Autonomous loop iteration 16, continuing the same established
Mathematics Educational Brain Autonomous Completion Program
(dynamic-pacing `<<autonomous-loop-dynamic>>` sentinel fire). Git
resync found zero concurrent commits at this iteration's start.

**Repair-audit first** (per this program's standing per-iteration
discipline): re-ran the Quality Gate 3 heading-conformance check across
all 108 pre-batch mathematics entries. **0 violations found**.

**Wave 5 candidates re-verified programmatically**: the pool had grown
to 13 (from the original 9) after Wave 5 part 1 unlocked new children
(`borrowing`, `negative-numbers`, `division`, `multiplication-table`,
`estimation`, `significant-figures`, `exponentiation`) — this batch
sticks to the previously-deferred 5-concept Wave 5 part 2 set rather
than re-splitting the enlarged pool, following the same precedent set
at the Wave 4→5 transition; the 8 newly-unlocked candidates become
Wave 6, to be computed fresh next iteration.

**Wave 5 part 2**: authored the 5 no-Blueprint concepts deferred from
Wave 5 part 1 — `math.arith.carrying`, `math.arith.mental-addition`,
`math.arith.decimal-operations`, `math.arith.terminating-decimals`,
`math.arith.repeating-decimals` — all misconceptions authored directly
via the birth-taxonomy diagnostic procedure:

- `math.arith.carrying` — MC-1 CARRY-VALUE-CONFUSED-WITH-COLUMN-SUM
  (FOUNDATIONAL, Type 4 notation-induced), MC-2 CARRY-CHAIN-BROKEN
  (Type 5 instruction-induced), MC-3 CARRY-ADDED-TO-WRONG-COLUMN
  (Type 4). Deliberately scoped to carrying MECHANICS (which digit
  carries, chain propagation, column placement) rather than
  re-deriving why carrying is necessary, already covered by
  `math.arith.addition`'s own MC-1 and `math.arith.
  ones-tens-hundreds`'s own MC-3 — noted honestly in Curriculum
  Feedback to avoid duplication.
- `math.arith.mental-addition` — MC-1
  MENTAL-MATH-REQUIRES-WRITTEN-ALGORITHM-IN-HEAD (FOUNDATIONAL, Type
  5), MC-2 DECOMPOSITION-ORDER-FIXED (Type 1), MC-3
  MENTAL-ADDITION-LESS-ACCURATE-THAN-WRITTEN (Type 2 perceptual
  intuition).
- `math.arith.decimal-operations` — MC-1
  DECIMAL-MULTIPLICATION-POINT-ALIGNMENT (FOUNDATIONAL, Type 6 analogy
  overextension from addition/subtraction's alignment procedure), MC-2
  DECIMAL-DIVISION-POINT-NOT-SHIFTED (Type 5), MC-3
  DECIMAL-PLACE-COUNT-UNDERCOUNTED (Type 1). Deliberately scoped to
  MULTIPLICATION/DIVISION procedures specifically, since `math.arith.
  decimals`'s own registry already covers comparison and
  addition/subtraction.
- `math.arith.terminating-decimals` — MC-1
  TERMINATING-DECIMAL-DETERMINED-BY-NUMERATOR (FOUNDATIONAL, Type 1),
  MC-2 ANY-SIMPLE-LOOKING-FRACTION-ASSUMED-TERMINATING (Type 2), MC-3
  TERMINATING-MEANS-EXACT-VALUE-DIFFERENT-FROM-FRACTION (Type 3
  language contamination).
- `math.arith.repeating-decimals` — MC-1
  REPEATING-DECIMAL-ASSUMED-APPROXIMATE-NOT-EXACT (FOUNDATIONAL, Type
  3 language contamination), MC-2 BAR-NOTATION-SCOPE-MISREAD (Type 4),
  MC-3 ALL-INFINITE-DECIMALS-ASSUMED-REPEATING (Type 1).

`math.arith` now 31/58. Wave 6 candidates to be computed
programmatically next iteration (13 concepts identified this turn,
not yet fully verified: `borrowing`, `negative-numbers`,
`multiplication-table`, `division`, `decimal-operations` [now
authored], `terminating-decimals` [now authored],
`repeating-decimals` [now authored], `percentage-calculations`,
`estimation`, `significant-figures`, `exponentiation`, plus `carrying`
and `mental-addition` [now authored] — the live list will be
recomputed fresh, not assumed, at the start of the next iteration). No
other domain touched. All five tracking files updated in this same
commit; re-validated 0 duplicates, 0 orphans, 0 Quality Gate 3
violations across all 113 mathematics entries.

Full validation this batch: all 6 subject KG validators PASS (0
failures, 0 warnings each), `npx tsc --noEmit` clean, full vitest suite
2133 passed / 1 skipped (112 files), `npm run build` succeeded.

### Mathematics — math.arith Wave 6 part 1 (2026-07-26, autonomous loop iteration 17)

Autonomous loop iteration 17, continuing the same established
Mathematics Educational Brain Autonomous Completion Program
(dynamic-pacing `<<autonomous-loop-dynamic>>` sentinel fire). Git
resync found zero concurrent commits at this iteration's start.

**Repair-audit first** (per this program's standing per-iteration
discipline): re-ran the Quality Gate 3 heading-conformance check across
all 113 pre-batch mathematics entries. **0 violations found**.

**Wave 6 candidates computed programmatically**: 9 concepts whose
prerequisites became fully satisfied after Wave 5 — `math.arith.
negative-numbers`, `math.arith.division`, `math.arith.
significant-figures`, `math.arith.exponentiation` (Blueprints exist
for all four), plus `math.arith.column-addition`, `math.arith.
borrowing`, `math.arith.multiplication-table`, `math.arith.
percentage-calculations`, `math.arith.estimation` (no Blueprints for
these five). Split into two parts given the heavier no-Blueprint load
(5 of 9), following the same pattern as Waves 4 and 5 — this batch
authors the 4 Blueprint-grounded concepts as Wave 6 part 1.

- `math.arith.negative-numbers` — reused its Misconception Registry
  by reference: MC-1 DOUBLE-NEGATIVE-STAYS-NEGATIVE (FOUNDATIONAL,
  Type 2 perceptual intuition), MC-2
  NEGATIVE-TIMES-NEGATIVE-IS-NEGATIVE (Type 2), MC-3
  MINUS-X-IS-ALWAYS-NEGATIVE (Type 4 notation-induced).
- `math.arith.division` — reused its Misconception Registry by
  reference: MC-1 DIVISION-COMMUTATIVE (FOUNDATIONAL, Type 1
  overgeneralization from multiplication), MC-2
  DIVISION-BY-ZERO-DEFINED (Type 6 analogy overextension), MC-3
  REMAINDER-IGNORED (Type 5 instruction-induced). Its Tier 1
  cross-link to `math.nt.divisibility` used for a genuine cross-link
  transfer probe.
- `math.arith.significant-figures` — reused its Misconception
  Registry by reference: MC-1
  ADDITION-SUBTRACTION-RULE-CONFLATED-WITH-MULTIPLICATION-RULE
  (FOUNDATIONAL, Type 1), MC-2
  CALCULATOR-OUTPUT-REPORTED-WITHOUT-ROUNDING (FOUNDATIONAL, Type 5),
  MC-3 LEAST-PRECISE-INPUT-MISIDENTIFIED (Type 5). Its `math.num.
  floating-point` cross-link confirmed genuinely not-yet-authored,
  consistent with `math.arith.rounding`'s own identical finding.
- `math.arith.exponentiation` — reused its Misconception Registry by
  reference: MC-1 EXPONENT-MULTIPLIES-BASE (FOUNDATIONAL, Type 4
  notation-induced), MC-2 EXPONENT-ADDS-COPIES (Type 1), MC-3
  ZERO-EXPONENT-GIVES-ZERO (Type 1).

`math.arith` now 35/58. Wave 6 part 2 (deferred): the 5 no-Blueprint
concepts (`column-addition`, `borrowing`, `multiplication-table`,
`percentage-calculations`, `estimation`), misconceptions to be
authored directly via the birth-taxonomy diagnostic procedure. No
other domain touched. All five tracking files updated in this same
commit; re-validated 0 duplicates, 0 orphans, 0 Quality Gate 3
violations across all 117 mathematics entries.

Full validation this batch: all 6 subject KG validators PASS (0
failures, 0 warnings each), `npx tsc --noEmit` clean, full vitest suite
2133 passed / 1 skipped (112 files), `npm run build` succeeded.

### Mathematics — math.arith Wave 6 part 2 (2026-07-26, autonomous loop iteration 18)

Autonomous loop iteration 18, continuing immediately after Wave 6 part
1. Git resync found zero concurrent commits at this iteration's start
(`git status --short` clean against the Wave 6 part 1 push).

**Repair-audit first**: re-ran the Quality Gate 3 heading-conformance
check across all 117 pre-batch mathematics entries. **0 violations
found**.

Authored the 5 no-Blueprint concepts deferred from Wave 6's split
(confirmed via directory listing: none of the five have a
`docs/curriculum/blueprints/` file), each via the birth-taxonomy
diagnostic procedure:

- `math.arith.column-addition` (requires `carrying`) — MC-1
  COLUMN-MISALIGNMENT (FOUNDATIONAL, Type 4 notation-induced), MC-2
  DIRECTION-REVERSED (Type 5 instruction-induced), MC-3
  MISSING-DIGIT-MISHANDLED (Type 1 overgeneralization). Misconceptions
  scoped to written-layout/processing-order, deliberately distinct
  from `carrying`'s own regrouping-mechanics registry.
- `math.arith.borrowing` (requires `subtraction`, `ones-tens-hundreds`)
  — MC-1 BORROW-CHAIN-THROUGH-ZEROS-BROKEN (FOUNDATIONAL, Type 5), MC-2
  BORROWED-TEN-MISCOMPUTED (Type 1), MC-3
  BORROW-SOURCE-COLUMN-MISIDENTIFIED (Type 4). Scoped to the
  zero-chain relay and paired-change mechanics, distinct from
  `subtraction`'s conceptual registry and `carrying`'s
  opposite-direction procedure.
- `math.arith.multiplication-table` (requires `multiplication`) — MC-1
  SKIP-COUNTING-SUBSTITUTED-FOR-RECALL (FOUNDATIONAL, Type 5), MC-2
  COMMUTATIVE-PAIRS-MEMORIZED-SEPARATELY (Type 1), MC-3
  NEAR-FACT-CONFUSION (Type 2 perceptual intuition). Scoped to
  fact-recall fluency specifically.
- `math.arith.percentage-calculations` (requires `percentages`) — MC-1
  WHICH-QUANTITY-IS-THE-WHOLE-MISIDENTIFIED (FOUNDATIONAL, Type 5),
  MC-2 FINDING-THE-WHOLE-CONFUSED-WITH-FINDING-THE-PART (Type 6 analogy
  overextension), MC-3 PERCENT-EXCEEDING-100-ASSUMED-IMPOSSIBLE (Type
  1). Its `related` sibling `math.arith.percentage-change` confirmed
  not yet authored (no Blueprint, no EB entry) — P76 transfer probe
  uses independence mode, flagged for revisit once that concept exists.
- `math.arith.estimation` (requires `rounding`) — MC-1
  ESTIMATION-REQUIRES-EXACT-COMPUTATION-FIRST (FOUNDATIONAL, Type 5),
  MC-2 ESTIMATE-TREATED-AS-WRONG-ANSWER (Type 3 language
  contamination), MC-3 ROUNDING-DIRECTION-NOT-CHOSEN-FOR-PURPOSE (Type
  1). Its cross-link `math.num.error-analysis` confirmed not yet
  authored (no Blueprint, no EB entry) — independence mode.

`math.arith` now **40/58**. No other domain touched. All five tracking
files updated in this same commit; re-validated 0 duplicates, 0
orphans, 0 Quality Gate 3 violations across all 122 mathematics
entries. Wave 7 candidates computed programmatically (12): 6
Blueprint-grounded (`absolute-value`, `integer-arithmetic`,
`remainder`, `order-of-operations`, `exponent-rules`, `square-numbers`)
and 6 no-Blueprint (`long-multiplication`, `mental-multiplication`,
`divisor-dividend`, `percentage-change`, `cube-numbers`,
`scientific-notation`) — to be re-verified fresh, not assumed, when
Wave 7 authoring begins.

Full validation this batch: all 6 subject KG validators PASS (0
failures, 0 warnings each), `npx tsc --noEmit` clean, full vitest suite
2133 passed / 1 skipped (112 files), `npm run build` succeeded.

### Mathematics — math.arith Wave 7 part 1 (2026-07-26, autonomous loop iteration 19)

Autonomous loop iteration 19, continuing immediately after Wave 6 part
2. Git resync found zero concurrent commits at this iteration's start.

**Repair-audit first**: re-ran the Quality Gate 3 heading-conformance
check across all 122 pre-batch mathematics entries. **0 violations
found**.

**Wave 7 candidates re-verified programmatically** (matching the
prior batch's projection exactly): 12 concepts whose prerequisites
became fully satisfied after Wave 6 — 6 Blueprint-grounded
(`absolute-value`, `integer-arithmetic`, `remainder`,
`order-of-operations`, `exponent-rules`, `square-numbers`) and 6
no-Blueprint (`long-multiplication`, `mental-multiplication`,
`divisor-dividend`, `percentage-change`, `cube-numbers`,
`scientific-notation`). Split into two parts (an even 6/6 split, still
following the established pattern of authoring Blueprint-grounded
concepts first) — this batch authors the 6 Blueprint-grounded
concepts as Wave 7 part 1, each reused by reference from its own
Blueprint:

- `math.arith.absolute-value` (requires `negative-numbers`,
  `number-line`) — reused its Misconception Registry by reference:
  MC-1 ABSOLUTE-VALUE-AS-SIGN-REMOVAL (FOUNDATIONAL, Type 4
  notation-induced), MC-2 ABSOLUTE-VALUE-ASSUMED-SOMETIMES-NEGATIVE
  (Type 1), MC-3
  DISTANCE-FROM-ZERO-TREATED-AS-SEPARATE-FROM-DISTANCE-BETWEEN-POINTS
  (Type 6). Its Tier 1 cross-link to `math.real.metric-space` (Blueprint
  confirmed authored) used for a genuine cross-link transfer probe.
- `math.arith.integer-arithmetic` (requires `negative-numbers`,
  `multiplication`) — reused its Misconception Registry by reference:
  MC-1 NEGATIVE-BASE-EXPONENT-ORDER-ERROR (FOUNDATIONAL, Type 4), MC-2
  SIGN-COUNTING-OVERGENERALIZED-CANCELLATION (Type 1), MC-3
  ZERO-DIVISION-SIGN-CONFUSION (Type 6). No cross-links (Blueprint
  confirms empty).
- `math.arith.remainder` (requires `division`) — reused its
  Misconception Registry by reference: MC-1
  DECIMAL-DIGITS-ARE-THE-REMAINDER (FOUNDATIONAL, Type 4), MC-2
  REMAINDER-CAN-EQUAL-OR-EXCEED-DIVISOR (Type 5), MC-3
  NEGATIVE-DIVIDEND-GIVES-NEGATIVE-REMAINDER (Type 2). Cross-link
  `math.nt.modular-arithmetic` confirmed not yet authored — independence
  mode, per the Blueprint's own GR-9 finding.
- `math.arith.order-of-operations` (requires `addition`, `subtraction`,
  `multiplication`, `division`) — reused its Misconception Registry by
  reference: MC-1 LEFT-TO-RIGHT-ONLY (FOUNDATIONAL, Type 1), MC-2
  ADDITION-BEFORE-MULTIPLICATION (Type 5), MC-3
  MULTIPLICATION-BEFORE-DIVISION-ALWAYS (Type 6). No cross-links.
- `math.arith.exponent-rules` (requires `exponentiation`) — reused its
  Misconception Registry by reference: MC-1
  PRODUCT-RULE-MULTIPLIES-EXPONENTS (FOUNDATIONAL, Type 6), MC-2
  POWER-RULE-ADDS-EXPONENTS (Type 6), MC-3 NEGATIVE-EXPONENT-NEGATES
  (Type 4). No cross-links.
- `math.arith.square-numbers` (requires `exponentiation`) — reused its
  Misconception Registry by reference: MC-1 SQUARING-MEANS-DOUBLING
  (FOUNDATIONAL, Type 2), MC-2 NEGATIVE-SQUARED-IS-NEGATIVE (Type 1),
  MC-3 LAST-DIGIT-DECIDES-PERFECT-SQUARE (Type 1). Its Tier 1
  cross-link to `math.geom.area` (Blueprint confirmed authored) used
  for a genuine cross-link transfer probe, per the Blueprint's own
  P76_mode declaration.

`math.arith` now **46/58**. Wave 7 part 2 (deferred): the 6
no-Blueprint concepts (`long-multiplication`, `mental-multiplication`,
`divisor-dividend`, `percentage-change`, `cube-numbers`,
`scientific-notation`), misconceptions to be authored directly via the
birth-taxonomy diagnostic procedure. No other domain touched. All five
tracking files updated in this same commit; re-validated 0 duplicates,
0 orphans, 0 Quality Gate 3 violations across all 128 mathematics
entries.

Full validation this batch: all 6 subject KG validators PASS (0
failures, 0 warnings each), `npx tsc --noEmit` clean, full vitest suite
2133 passed / 1 skipped (112 files), `npm run build` succeeded.

### Mathematics — math.arith Wave 7 part 2 (2026-07-26, autonomous loop iteration 20)

Autonomous loop iteration 20, continuing immediately after Wave 7 part
1. Git resync found zero concurrent commits at this iteration's start.

**Repair-audit first**: re-ran the Quality Gate 3 heading-conformance
check across all 128 pre-batch mathematics entries. **0 violations
found**.

**Wave 7 part 2 candidates re-verified programmatically**: the live KG
now shows `math.arith.square-roots` (Blueprint exists) also newly
ready, unlocked by Wave 7 part 1's `square-numbers` — per this
program's established precedent (first applied at the Wave 5→6 and
Wave 6→7 transitions), stuck to the originally-deferred 6-concept Wave
7 part 2 set rather than re-splitting the now-larger pool;
`square-roots` becomes a Wave 8 candidate, computed fresh at that
wave's own start.

Authored the 6 no-Blueprint concepts deferred from Wave 7's split
(confirmed via directory listing: none of the six have a
`docs/curriculum/blueprints/` file), each via the birth-taxonomy
diagnostic procedure:

- `math.arith.long-multiplication` (requires `multiplication-table`,
  `carrying`) — MC-1 PARTIAL-PRODUCT-PLACE-VALUE-SHIFT-OMITTED
  (FOUNDATIONAL, Type 4 notation-induced), MC-2
  CARRY-DROPPED-WITHIN-A-PARTIAL-PRODUCT-ROW (Type 5
  instruction-induced), MC-3
  PARTIAL-PRODUCT-COLUMN-MISALIGNMENT-DURING-ADDITION (Type 1
  overgeneralization).
- `math.arith.mental-multiplication` (requires `multiplication-table`)
  — MC-1 DISTRIBUTIVE-DECOMPOSITION-APPLIED-INCOMPLETELY
  (FOUNDATIONAL, Type 5), MC-2
  HALVING-DOUBLING-MISAPPLIED-TO-AN-ODD-FACTOR (Type 1), MC-3
  POWER-OF-10-SHIFT-COUNT-MISCOUNTED (Type 4).
- `math.arith.divisor-dividend` (requires `division`) — MC-1
  DIVIDEND-DIVISOR-SWAPPED (FOUNDATIONAL, Type 3 language
  contamination), MC-2 QUOTIENT-CONFUSED-WITH-DIVISOR (Type 3), MC-3
  VOCABULARY-INCONSISTENT-ACROSS-NOTATIONS (Type 4).
- `math.arith.percentage-change` (requires `percentage-calculations`)
  — MC-1 WRONG-BASE-USED-FOR-PERCENTAGE-CHANGE (FOUNDATIONAL, Type 5,
  a direct carry-forward of `percentage-calculations`'s own MC-1),
  MC-2 PERCENTAGE-DECREASE-SIGN-DROPPED (Type 1), MC-3
  REPEATED-PERCENTAGE-CHANGES-ASSUMED-TO-CANCEL (Type 6 analogy
  overextension).
- `math.arith.cube-numbers` (requires `exponentiation`) — MC-1
  CUBING-MEANS-TRIPLING (FOUNDATIONAL, Type 1, the identical
  structural confusion as `square-numbers`'s own MC-1, reapplied to a
  new exponent), MC-2 NEGATIVE-CUBED-ASSUMED-POSITIVE (Type 6, a
  direct overextension of `square-numbers`'s own MC-2 fix), MC-3
  CUBE-NUMBER-CONFUSED-WITH-MULTIPLE-OF-THREE (Type 3). Its Tier 1
  cross-link to `math.geom.volume` (Blueprint confirmed authored) used
  for a genuine cross-link transfer probe.
- `math.arith.scientific-notation` (requires `exponentiation`,
  `decimals`) — MC-1 COEFFICIENT-RANGE-VIOLATED (FOUNDATIONAL, Type
  4), MC-2 EXPONENT-SIGN-DIRECTION-CONFUSED (Type 2 perceptual
  intuition), MC-3
  EXPONENT-RENORMALIZATION-SKIPPED-AFTER-COMBINING (Type 5).

`math.arith` now **52/58** — only 6 concepts remain in the domain. No
other domain touched. All five tracking files updated in this same
commit; re-validated 0 duplicates, 0 orphans, 0 Quality Gate 3
violations across all 134 mathematics entries.

Full validation this batch: all 6 subject KG validators PASS (0
failures, 0 warnings each), `npx tsc --noEmit` clean, full vitest suite
2133 passed / 1 skipped (112 files), `npm run build` succeeded.

### Mathematics — math.arith Wave 8 (2026-07-26, autonomous loop iteration 21)

Autonomous loop iteration 21, continuing immediately after Wave 7 part
2. Git resync found zero concurrent commits at this iteration's start.

**Repair-audit first**: re-ran the Quality Gate 3 heading-conformance
check across all 134 pre-batch mathematics entries. **0 violations
found**.

**Wave 8 candidates re-verified programmatically**: 3 concepts ready
— `math.arith.long-division`, `math.arith.square-roots` (Blueprint
exists — became ready when `square-numbers` was authored in Wave 7
part 1, deliberately deferred to this wave per this program's
established precedent), and `math.arith.mental-arithmetic`. Small
enough to author in one part without splitting.

- `math.arith.square-roots` (requires `square-numbers`) — reused its
  Misconception Registry by reference: MC-1
  SQRT-SYMBOL-CONFLATED-WITH-ALL-ROOTS (FOUNDATIONAL, Type 6 analogy
  overextension), MC-2 NEGATIVE-RADICAND-ALWAYS-UNDEFINED (Type 1),
  MC-3 ESTIMATION-ROUNDS-TO-NEAREST-INTEGER-ONLY (Type 5). Both KG
  cross-links (`math.alg.radicals`, `math.geom.pythagorean-theorem`)
  confirmed not yet authored — independence mode, per the Blueprint's
  own Component 7 finding.
- `math.arith.long-division` (requires `division`,
  `long-multiplication`) — no Blueprint. MC-1
  DIGIT-BRING-DOWN-SKIPPED (FOUNDATIONAL, Type 5), MC-2
  QUOTIENT-DIGIT-COLUMN-MISALIGNED (Type 4), MC-3
  PROCESS-TERMINATED-BEFORE-ALL-DIGITS-BROUGHT-DOWN (Type 1). Scoped
  to the iterative four-step algorithm's procedural failure modes,
  distinct from `math.arith.remainder`'s conceptual registry.
- `math.arith.mental-arithmetic` (requires `mental-addition`,
  `mental-multiplication`) — no Blueprint. MC-1
  STRATEGY-NOT-MATCHED-TO-NUMBER-STRUCTURE (FOUNDATIONAL, Type 1),
  MC-2 COMPENSATION-ADJUSTMENT-NOT-REVERSED (Type 5), MC-3
  MENTAL-DECOMPOSITION-FORCED-INTO-WRITTEN-ALGORITHM-ORDER (Type 6
  analogy overextension).

`math.arith` now **55/58** — only 3 concepts remain
(`fraction-simplification`, `fraction-addition`, `irrational-roots`),
all currently blocked on unauthored number-theory prerequisites
(`math.nt.gcd`, `math.nt.lcm`, and — for `irrational-roots` — this
wave's own `square-roots`, now resolved). `math.arith` cannot reach
Domain Certification until at least `math.nt.gcd` and `math.nt.lcm`
are authored — a genuine cross-domain dependency, to be addressed in
Wave 9. No other domain touched. All five tracking files updated in
this same commit; re-validated 0 duplicates, 0 orphans, 0 Quality Gate
3 violations across all 137 mathematics entries.

Full validation this batch: all 6 subject KG validators PASS (0
failures, 0 warnings each), `npx tsc --noEmit` clean, full vitest suite
2133 passed / 1 skipped (112 files), `npm run build` succeeded.

### Mathematics — math.arith Wave 9 + math.nt Wave 1 (2026-07-26, autonomous loop iteration 22)

Autonomous loop iteration 22, continuing immediately after Wave 8. Git
resync found zero concurrent commits at this iteration's start.

**Repair-audit first**: re-ran the Quality Gate 3 heading-conformance
check across all 137 pre-batch mathematics entries. **0 violations
found**.

**Genuine cross-domain blocker confirmed**: re-verified programmatically
that `math.arith`'s remaining 3 concepts split into one immediately
ready item (`irrational-roots` — its prerequisites `square-roots` and
`math.found.irrational-numbers` are both now satisfied) and two
genuinely blocked items (`fraction-simplification` needs
`math.nt.gcd`; `fraction-addition` needs `math.nt.lcm`), neither
authored. Traced the full `math.nt` dependency chain needed:
`math.nt.divisibility` (ready, Blueprint exists) → `math.nt.prime-number`
(Blueprint exists) → `math.nt.prime-factorization` (Blueprint exists)
→ `math.nt.gcd` (Blueprint exists) → `math.nt.lcm` (no Blueprint) — a
4-concept minimal chain, not a full `math.nt` campaign commitment.

Authored 2 concepts this wave:

- `math.arith.irrational-roots` (requires `square-roots`,
  `math.found.irrational-numbers`) — no Blueprint. MC-1
  DECIMAL-APPROXIMATION-TREATED-AS-EXACT-VALUE (FOUNDATIONAL, Type 1),
  MC-2 IRRATIONALITY-DOUBTED-AS-PATTERN-NOT-YET-FOUND (Type 2
  perceptual intuition), MC-3
  ALL-INTEGER-SQUARE-ROOTS-ASSUMED-IRRATIONAL (Type 1).
- `math.nt.divisibility` (requires `math.arith.division`,
  `math.found.integers`) — Blueprint exists, reused by reference. MC-1
  DIVISIBILITY-CONFUSED-WITH-DIVISION (FOUNDATIONAL, Type 4
  notation-induced), MC-2 DIVISIBILITY-SYMMETRIC (Type 6 analogy
  overextension), MC-3 DIVISIBILITY-RESTRICTED-TO-POSITIVES (Type 1).
  Its Tier 1 cross-link to `math.abst.ring-theory` (Blueprint
  confirmed authored) used for a genuine cross-link transfer probe
  (the polynomial-ring divisibility extension).

`math.arith` now **56/58** — only 2 concepts remain
(`fraction-simplification`, `fraction-addition`), both blocked on the
`math.nt.gcd`/`math.nt.lcm` chain. `math.nt` now **1/36** — the first
concept of a deliberately bounded cross-domain step, not a full
`math.nt` campaign commitment; the next 3 concepts needed
(`prime-number`, `prime-factorization`, `gcd`) all have existing
Blueprints, and `lcm` (no Blueprint) is the final unblocking concept
before `math.arith` can return to close out its final 2 concepts and
reach 58/58 CERTIFIED. All five tracking files updated in this same
commit; re-validated 0 duplicates, 0 orphans, 0 Quality Gate 3
violations across all 139 mathematics entries.

Full validation this batch: all 6 subject KG validators PASS (0
failures, 0 warnings each), `npx tsc --noEmit` clean, full vitest suite
2133 passed / 1 skipped (112 files), `npm run build` succeeded.

### Mathematics — math.nt Wave 2 (2026-07-26, autonomous loop iteration 23)

Autonomous loop iteration 23, continuing immediately after math.nt
Wave 1. Git resync found zero concurrent commits at this iteration's
start.

**Repair-audit first**: re-ran the Quality Gate 3 heading-conformance
check across all 139 pre-batch mathematics entries. **0 violations
found**.

**math.nt candidates re-verified programmatically**: 4 concepts
ready — `divisibility-rules`, `prime-number`, `division-algorithm`,
`induction-applications`. Deliberately authored only `prime-number`
(the critical-path concept toward `gcd`/`lcm`), keeping the excursion
bounded rather than drifting into a full `math.nt` campaign; the
other 3 ready concepts remain available for a future `math.nt`
campaign decision, not authored this wave. Continued authoring each
next concept as it became ready in turn:

- `math.nt.prime-number` (requires `divisibility`) — Blueprint
  exists, reused by reference. MC-1 PRIME-INCLUDES-ONE
  (FOUNDATIONAL, Type 4 notation-induced), MC-2 ODD-EQUALS-PRIME
  (Type 1), MC-3 LAST-DIGIT-HEURISTIC (Type 1). Cross-link
  `math.nt.fundamental-theorem-arithmetic` confirmed NOT Tier 1 —
  independence mode, using a cryptography-context transfer probe.
- `math.nt.prime-factorization` (requires `prime-number`,
  `divisibility`) — Blueprint exists, reused by reference. MC-1
  STOPS-AT-COMPOSITE-FACTOR (FOUNDATIONAL, Type 5), MC-2
  ONE-IS-PRIME (Type 1, `prime-number`'s own MC-1 recurring in a new
  procedural context), MC-3 FACTORIZATION-ORDER-MATTERS (Type 6
  analogy overextension).
- `math.nt.gcd` (requires `divisibility`, `prime-factorization`) —
  Blueprint exists, reused by reference. MC-1
  GCD-LCM-EXPONENT-CONFUSION (FOUNDATIONAL, Type 6 analogy
  overextension), MC-2 COPRIME-REQUIRES-A-PRIME-NUMBER (Type 1),
  MC-3 EUCLIDEAN-ALGORITHM-WRONG-STOPPING-POINT (Type 1). Directly
  unlocks `math.arith.fraction-simplification`.
- `math.nt.lcm` (requires `prime-factorization`, `gcd`) — no
  Blueprint, authored via the birth-taxonomy diagnostic procedure.
  MC-1 LCM-COMPUTED-AS-SIMPLE-PRODUCT (FOUNDATIONAL, Type 1), MC-2
  LCM-EXPONENT-RULE-CONFUSED-WITH-GCD (Type 6, the mirror-image of
  `gcd`'s own MC-1), MC-3 LCM-ASSUMED-BOUNDED-LIKE-GCD (Type 6).
  Directly unlocks `math.arith.fraction-addition`.

`math.nt` now **5/36**. This completes the bounded cross-domain
excursion begun in Wave 1 — both of `math.arith`'s final 2 concepts
(`fraction-simplification`, `fraction-addition`) are now unblocked and
ready to be authored, at which point `math.arith` reaches 58/58 —
DOMAIN CERTIFIED (the second mathematics domain to reach
certification, after `math.found`). Whether to continue `math.nt` as
a full campaign (31 concepts remain, most with existing Blueprints)
or pause it once `math.arith` closes is an explicit decision for the
next wave, not assumed here. No other domain touched. All five
tracking files updated in this same commit; re-validated 0
duplicates, 0 orphans, 0 Quality Gate 3 violations across all 143
mathematics entries.

Full validation this batch: all 6 subject KG validators PASS (0
failures, 0 warnings each), `npx tsc --noEmit` clean, full vitest suite
2133 passed / 1 skipped (112 files), `npm run build` succeeded.

### Mathematics — math.arith Wave 10, FINAL WAVE (2026-07-26, autonomous loop iteration 24)

Autonomous loop iteration 24, continuing immediately after math.nt Wave
2. Git resync found zero concurrent commits at this iteration's start.

**Repair-audit first**: re-ran the Quality Gate 3 heading-conformance
check across all 143 pre-batch mathematics entries. **0 violations
found**.

**Final 2 candidates re-verified programmatically**: both
`math.arith.fraction-simplification` (requires `fraction-equivalence`,
`math.nt.gcd`) and `math.arith.fraction-addition` (requires
`fractions`, `math.nt.lcm`) confirmed ready — their number-theory
blockers, authored in math.nt Waves 1-2, now satisfy both. Neither has
a Blueprint (verified via directory listing); both authored via the
birth-taxonomy diagnostic procedure:

- `math.arith.fraction-simplification` — MC-1
  SIMPLIFICATION-STOPS-BEFORE-LOWEST-TERMS (FOUNDATIONAL, Type 1
  overgeneralization), MC-2
  NUMERATOR-AND-DENOMINATOR-DIVIDED-BY-DIFFERENT-VALUES (Type 5
  instruction-induced), MC-3
  LOWEST-TERMS-ASSUMED-FROM-SMALL-OBVIOUS-FACTORS-ONLY (Type 2
  perceptual intuition — the classic "91/143 share no small factor,
  but both share 13" trap).
- `math.arith.fraction-addition` — MC-1
  NUMERATORS-AND-DENOMINATORS-ADDED-DIRECTLY (FOUNDATIONAL, Type 1
  overgeneralization from whole-number addition), MC-2
  NUMERATOR-NOT-RESCALED-WHEN-DENOMINATOR-CONVERTED (Type 5
  instruction-induced), MC-3 SCALE-FACTORS-SWAPPED-BETWEEN-FRACTIONS
  (Type 4 notation-induced).

**`math.arith` reaches 58/58 — DOMAIN CERTIFIED**, the second
mathematics domain to reach certification after `math.found`. This
closes the domain begun at the start of this long-running autonomous
program. `educational-brain/concepts/ROADMAP.md` §3k added (mirroring
§3's `math.found` certification record); §5 item 1a condensed to a
historical-record summary, with a new item 1b stating the open
decision for the next wave: continue `math.nt` as a full campaign (31
concepts remain, most with existing Blueprints) or select a different
domain. No other domain touched this wave. All five tracking files
updated in this same commit; re-validated 0 duplicates, 0 orphans, 0
Quality Gate 3 violations across all 145 mathematics entries.

Full validation this batch: all 6 subject KG validators PASS (0
failures, 0 warnings each), `npx tsc --noEmit` clean, full vitest suite
2133 passed / 1 skipped (112 files), `npm run build` succeeded.

### Mathematics — math.nt Wave 3 part 1 (2026-07-26, autonomous loop iteration 25)

Autonomous loop iteration 25, continuing immediately after
`math.arith`'s Domain Certification. Git resync found zero concurrent
commits at this iteration's start.

**Decision made**: continue `math.nt` as a full campaign toward its
own Domain Certification, per ROADMAP.md §5 item 1b's stated default
(lowest-friction continuation, strong Blueprint coverage, no stronger
reason to switch domains found).

**Repair-audit first**: re-ran the Quality Gate 3 heading-conformance
check across all 145 pre-batch mathematics entries. **0 violations
found**.

**math.nt Wave 3 candidates computed fresh from the live KG**: 8
concepts ready — `divisibility-rules`, `composite-number`,
`sieve-of-eratosthenes`, `fundamental-theorem-arithmetic`,
`euclidean-algorithm`, `division-algorithm`, `eulers-totient`,
`induction-applications`. Split 3 Blueprint-grounded / 5 no-Blueprint,
following this program's established split pattern — this batch
authors the 3 Blueprint-grounded concepts as Wave 3 part 1:

- `math.nt.fundamental-theorem-arithmetic` (requires
  `prime-factorization`) — reused its Misconception Registry by
  reference: MC-1 REORDERED-FACTORIZATION-TREATED-AS-DIFFERENT
  (FOUNDATIONAL, Type 4 notation-induced), MC-2
  EXISTENCE-AND-UNIQUENESS-CONFLATED-AS-ONE-CLAIM (Type 1), MC-3
  NON-PRIME-FACTOR-GROUPINGS-TREATED-AS-VALID-ALTERNATIVE-FACTORIZATIONS
  (Type 1). Cross-link `math.abst.ufd` confirmed unauthored —
  independence mode.
- `math.nt.euclidean-algorithm` (requires `gcd`, `math.arith.remainder`)
  — reused its Misconception Registry by reference: MC-1
  STOPPING-CONDITION-BASED-ON-SMALL-REMAINDER (FOUNDATIONAL, Type 2
  perceptual intuition), MC-2 REPLACEMENT-PAIR-ORDER-REVERSED (Type
  4), MC-3 GCD-IDENTITY-TREATED-AS-UNEXPLAINED-RULE (Type 5). No
  cross-links.
- `math.nt.division-algorithm` (requires
  `math.found.well-ordering-principle`, `math.arith.division`) —
  reused its Misconception Registry by reference: MC-1
  TRUNCATED-DIVISION-ASSUMED-VALID-FOR-NEGATIVE-DIVIDENDS
  (FOUNDATIONAL, Type 1), MC-2
  UNIQUENESS-MISUNDERSTOOD-AS-NO-OTHER-ARITHMETIC-REPRESENTATION-EXISTS
  (Type 1), MC-3 REMAINDER-BOUND-CHECKED-ONLY-FOR-UPPER-LIMIT (Type
  4). No cross-links.

`math.nt` now **8/36**. Wave 3 part 2 (deferred): the 5 no-Blueprint
concepts (`divisibility-rules`, `composite-number`,
`sieve-of-eratosthenes`, `eulers-totient`, `induction-applications`),
misconceptions to be authored directly via the birth-taxonomy
diagnostic procedure. No other domain touched. All five tracking
files updated in this same commit; re-validated 0 duplicates, 0
orphans, 0 Quality Gate 3 violations across all 148 mathematics
entries.

Full validation this batch: all 6 subject KG validators PASS (0
failures, 0 warnings each), `npx tsc --noEmit` clean, full vitest suite
2133 passed / 1 skipped (112 files), `npm run build` succeeded.

### Mathematics — math.nt Wave 3 part 2 (2026-07-26, autonomous loop iteration 26)

Autonomous loop iteration 26, continuing immediately after Wave 3 part
1. Git resync found zero concurrent commits at this iteration's start.

**Repair-audit first**: re-ran the Quality Gate 3 heading-conformance
check across all 148 pre-batch mathematics entries. **0 violations
found**.

**Wave 3 part 2 candidates re-verified programmatically**: the live KG
now also shows `math.nt.extended-euclidean-algorithm` (Blueprint
exists) and `math.nt.modular-arithmetic` (Blueprint exists) newly
ready, unlocked by Wave 3 part 1's `euclidean-algorithm` and
`division-algorithm` — per this program's established precedent, stuck
to the originally-deferred 5-concept Wave 3 part 2 set rather than
re-splitting the enlarged pool; the 2 new arrivals become Wave 4
candidates, computed fresh at that wave's own start.

Authored the 5 no-Blueprint concepts deferred from Wave 3's split,
each via the birth-taxonomy diagnostic procedure:

- `math.nt.divisibility-rules` (requires `divisibility`) — MC-1
  DIVISIBILITY-RULE-FOR-3-CONFUSED-WITH-RULE-FOR-9 (FOUNDATIONAL,
  Type 6 analogy overextension), MC-2
  DIVISIBILITY-BY-4-CHECKED-USING-ONLY-THE-LAST-DIGIT (Type 1), MC-3
  DIVISIBILITY-RULE-FOR-11-ALTERNATING-SIGNS-MISASSIGNED (Type 4).
- `math.nt.composite-number` (requires `prime-number`) — MC-1
  ONE-MISCLASSIFIED-AS-COMPOSITE-BY-EXCLUSION (FOUNDATIONAL, Type 1,
  the mirror boundary case of `prime-number`'s own MC-1), MC-2
  COMPOSITE-DEFINITION-CONFLATED-WITH-HAVING-ANY-FACTORS (Type 3
  language contamination), MC-3
  SMALLEST-COMPOSITE-NUMBER-MISIDENTIFIED (Type 2 perceptual
  intuition).
- `math.nt.sieve-of-eratosthenes` (requires `prime-number`,
  `divisibility`) — MC-1
  NUMBER-ITSELF-CROSSED-OUT-AS-A-MULTIPLE-OF-ITSELF (FOUNDATIONAL,
  Type 4), MC-2 SIEVE-STOPPED-BEFORE-REACHING-SQRT-LIMIT (Type 1),
  MC-3 SURVIVING-ONE-ROUND-ASSUMED-SUFFICIENT-FOR-PRIMALITY (Type 1).
- `math.nt.eulers-totient` (requires `divisibility`,
  `prime-factorization`) — MC-1
  TOTIENT-FORMULA-COUNTS-PRIME-FACTOR-MULTIPLICITY-INSTEAD-OF-DISTINCT-PRIMES
  (FOUNDATIONAL, Type 4), MC-2 COPRIME-CONFUSED-WITH-PRIME (Type 3
  language contamination), MC-3 TOTIENT-OF-A-PRIME-OFF-BY-ONE (Type
  1).
- `math.nt.induction-applications` (requires
  `math.found.proof-by-induction`, `divisibility`) — MC-1
  INDUCTIVE-HYPOTHESIS-NOT-ACTUALLY-USED-IN-INDUCTIVE-STEP
  (FOUNDATIONAL, Type 5), MC-2 BASE-CASE-OMITTED-OR-TRIVIALIZED (Type
  5), MC-3
  DIVISIBILITY-INDUCTIVE-STEP-NOT-STRUCTURED-TO-EXPOSE-THE-DIVISOR
  (Type 6 analogy overextension, from the more common summation-proof
  inductive-step pattern).

`math.nt` now **13/36**. No other domain touched. All five tracking
files updated in this same commit; re-validated 0 duplicates, 0
orphans, 0 Quality Gate 3 violations across all 153 mathematics
entries.

Full validation this batch: all 6 subject KG validators PASS (0
failures, 0 warnings each), `npx tsc --noEmit` clean, full vitest suite
2133 passed / 1 skipped (112 files), `npm run build` succeeded.

### Mathematics — math.nt Wave 4 (2026-07-26, autonomous loop iteration 27)

Autonomous loop iteration 27, continuing immediately after Wave 3 part
2. Git resync found zero concurrent commits at this iteration's start.

**Wave 4 candidates re-verified programmatically** against the live KG
(not assumed from Wave 3 part 2's projection): confirmed exactly the 2
expected concepts ready, both Blueprint-grounded —
`math.nt.extended-euclidean-algorithm` (requires
`math.nt.euclidean-algorithm`) and `math.nt.modular-arithmetic`
(requires `math.nt.division-algorithm`, `math.arith.remainder`).

Authored both, each Blueprint reused by reference:

- `math.nt.extended-euclidean-algorithm` — MC-1
  EXTENDED-ALGORITHM-OUTPUT-ASSUMED-UNIQUE (FOUNDATIONAL, Type 1
  overgeneralization from the ordinary algorithm's unique gcd output),
  MC-2 BACKWARD-SUBSTITUTION-DIRECTION-CONFUSED (Type 4
  notation-induced), MC-3
  EXTENDED-ALGORITHM-CONFLATED-WITH-JUST-FINDING-GCD (Type 3 language
  contamination, from the name containing "Euclidean Algorithm" as a
  substring).
- `math.nt.modular-arithmetic` — MC-1
  EVERY-NONZERO-RESIDUE-ASSUMED-TO-HAVE-INVERSE (FOUNDATIONAL, Type 1
  overgeneralization from ordinary real-number arithmetic), MC-2
  NEGATIVE-INTERMEDIATE-RESULT-LEFT-UNREDUCED (FOUNDATIONAL, Type 5
  instruction-induced), MC-3
  MODULUS-CONFUSED-WITH-RESIDUE-SET-SIZE-OFF-BY-ONE (Moderate, Type 3
  language contamination). This entry's P76 transfer probe uses
  cross-link probe mode against the authored `math.abst.ring-theory`
  Blueprint (KG cross_links includes it; verified authored via
  directory listing), per the Blueprint's own mixed cross-link
  handling (`math.disc.boolean-circuits` remains unauthored).

`math.nt` now **15/36**. Wave 4's authoring unlocked 4 new candidates,
computed fresh: `math.nt.bezout-identity` (no Blueprint),
`math.nt.congruence`, `math.nt.modular-inverse`, and
`math.nt.fermats-little-theorem` (all 3 Blueprint-grounded) — to be
re-verified fresh, not assumed, when Wave 5 begins. No other domain
touched. All five tracking files updated in this same commit;
re-validated 0 duplicates, 0 orphans, 0 Quality Gate 3 violations
across all 155 mathematics entries.

Full validation this batch: all 6 subject KG validators PASS (0
failures, 0 warnings each), `npx tsc --noEmit` clean, full vitest suite
run, `npm run build` succeeded.

### Mathematics — math.nt Wave 5 part 1 (2026-07-26, autonomous loop iteration 28)

Autonomous loop iteration 28, continuing immediately after Wave 4. Git
resync found zero concurrent commits at this iteration's start.

**Wave 5 candidates re-verified programmatically** against the live KG
(not assumed from Wave 4's projection): confirmed exactly the 4
expected concepts ready — `math.nt.bezout-identity` (no Blueprint),
`math.nt.congruence`, `math.nt.modular-inverse`, and
`math.nt.fermats-little-theorem` (all 3 Blueprint-grounded). Per this
program's uneven-load-split precedent, split into part 1 (the 3
Blueprint-grounded concepts) and part 2 (`bezout-identity`, deferred).

Authored the 3 Blueprint-grounded concepts, each reused by reference:

- `math.nt.congruence` (requires `math.nt.modular-arithmetic`,
  `math.found.equivalence-relation`) — MC-1
  CONGRUENCE-CONFLATED-WITH-EQUALITY (FOUNDATIONAL, Type 3 language
  contamination, from the ≡ symbol's visual/verbal resemblance to =),
  MC-2 CONGRUENCE-EQUIVALENCE-PROOF-ASSUMED-TO-NEED-NEW-MACHINERY
  (Type 1 overgeneralization), MC-3
  RESIDUE-CLASS-COUNT-ASSUMED-VARIABLE (FOUNDATIONAL, Type 2
  perceptual intuition).
- `math.nt.modular-inverse` (requires `math.nt.modular-arithmetic`,
  `math.nt.extended-euclidean-algorithm`; unlocks
  `math.nt.rsa-basics`) — MC-1
  EXISTENCE-CRITERION-ASSUMED-RE-DERIVED-HERE (FOUNDATIONAL, Type 1
  overgeneralization), MC-2
  EXTENDED-EUCLIDEAN-OUTPUT-ASSUMED-TO-NEED-FURTHER-PROCESSING (High,
  Type 5 instruction-induced), MC-3
  MODULAR-DIVISION-ASSUMED-DIRECT-OPERATION (Type 1
  overgeneralization).
- `math.nt.fermats-little-theorem` (requires `math.nt.modular-arithmetic`,
  `math.nt.prime-number`; unlocks `math.nt.eulers-theorem`,
  `math.nt.primality-testing`) — MC-1
  HYPOTHESIS-P-DOES-NOT-DIVIDE-A-OVERLOOKED (FOUNDATIONAL, Type 5
  instruction-induced, from the theorem's abbreviated verbal
  recitation dropping the p∤a qualifier), MC-2
  LARGE-EXPONENT-COMPUTED-DIRECTLY-WITHOUT-REDUCTION (Type 1
  overgeneralization), MC-3
  EXPONENT-REDUCED-MODULO-P-INSTEAD-OF-P-MINUS-1 (Type 6 analogy
  overextension, carrying the modulus p's special role over to the
  exponent-reduction step where p−1 is actually the period).

`math.nt` now **18/36**. Part 2 (`math.nt.bezout-identity`, no
Blueprint) deferred to be authored next. No other domain touched. All
five tracking files updated in this same commit; re-validated 0
duplicates, 0 orphans, 0 Quality Gate 3 violations across all 158
mathematics entries.

Full validation this batch: all 6 subject KG validators PASS (0
failures, 0 warnings each), `npx tsc --noEmit` clean, full vitest suite
run, `npm run build` succeeded.

### Mathematics — math.nt Wave 5 part 2 (2026-07-26, autonomous loop iteration 29)

Autonomous loop iteration 29, continuing immediately after Wave 5 part
1. Git resync found zero concurrent commits at this iteration's start.

**Wave 5 part 2 candidates re-verified programmatically** against the
live KG (not assumed from part 1's projection): confirmed
`math.nt.bezout-identity` still the only originally-deferred concept,
per this program's established precedent (stick to the
originally-deferred set rather than re-splitting an enlarged pool).
The live KG now also shows 4 further candidates newly ready, unlocked
by Wave 5 part 1's authoring of `congruence`, `modular-inverse`, and
`fermats-little-theorem`: `math.nt.residue-classes` (no Blueprint),
`math.nt.chinese-remainder-theorem`, `math.nt.eulers-theorem`, and
`math.nt.primality-testing` (all 3 Blueprint-grounded) — deliberately
deferred to Wave 6, computed fresh at that wave's own start.

Authored `math.nt.bezout-identity` (requires
`math.nt.extended-euclidean-algorithm`, `math.nt.gcd`; unlocks
`math.nt.linear-diophantine`) directly via the birth-taxonomy
diagnostic procedure, no Blueprint existing for this concept.
Deliberately distinguished from the already-authored
`extended-euclidean-algorithm` entry by focusing on the EXISTENCE
theorem's own distinct misconceptions rather than restating that
entry's computational-procedure misconceptions:

- MC BEZOUT-IDENTITY-ASSUMED-TO-REQUIRE-COPRIME-INTEGERS
  (FOUNDATIONAL, Type 6 analogy overextension, over-applying the
  frequently-used coprime special case — modular inverse construction
  — as if it defined the theorem's entire scope).
- MC BEZOUT-COEFFICIENTS-ASSUMED-POSITIVE (Foundational, Type 2
  perceptual intuition, from "combination" language's positive-
  quantities connotation).
- MC BEZOUT-IDENTITY-TREATED-AS-A-NEW-COMPUTATIONAL-METHOD-RATHER-
  THAN-AN-EXISTENCE-STATEMENT (Moderate, Type 5 instruction-induced,
  from the two closely-related concepts being taught back-to-back and
  blurring into one perceived topic).

`math.nt` now **19/36**, just past the halfway point. No other domain
touched. All five tracking files updated in this same commit;
re-validated 0 duplicates, 0 orphans, 0 Quality Gate 3 violations
across all 159 mathematics entries.

Full validation this batch: all 6 subject KG validators PASS (0
failures, 0 warnings each), `npx tsc --noEmit` clean, full vitest suite
2164 passed / 1 skipped (112 files), `npm run build` succeeded.

### Mathematics — math.nt Wave 6 part 1 (2026-07-26, autonomous loop iteration 30)

Autonomous loop iteration 30, continuing immediately after Wave 5 part
2. Git resync found zero concurrent commits at this iteration's start.

**Wave 6 candidates re-verified programmatically** against the live KG
(not assumed from the prior batch's projection): confirmed 5 ready
concepts — an enlarged pool versus the 4 originally projected, since
`math.nt.linear-diophantine` newly unlocked via Wave 5 part 2's
authoring of `bezout-identity`. Split per this program's uneven-load
precedent: part 1 (3 Blueprint-grounded: `chinese-remainder-theorem`,
`eulers-theorem`, `primality-testing`) and part 2 (2 no-Blueprint:
`residue-classes`, `linear-diophantine`, deferred).

Authored the 3 Blueprint-grounded concepts, each reused by reference:

- `math.nt.chinese-remainder-theorem` (requires `math.nt.congruence`,
  `math.nt.gcd`; cross-link `math.abst.ring-theory`, authored, P76
  cross-link probe) — MC-1
  PAIRWISE-COPRIME-HYPOTHESIS-ASSUMED-AUTOMATIC (FOUNDATIONAL, Type 5
  instruction-induced, from the theorem's abbreviated recitation
  dropping the pairwise-coprime qualifier), MC-2
  CRT-SOLVED-BY-TRIAL-SEARCH (High, Type 1 overgeneralization from
  small-system guess-and-check habits), MC-3
  CRT-TREATED-AS-MERE-NUMERIC-COINCIDENCE (Moderate, Type 3 language
  contamination, from the theorem's usual congruence-only framing).
- `math.nt.eulers-theorem` (requires `math.nt.fermats-little-theorem`;
  unlocks `math.nt.rsa-basics`) — MC-1
  EULER-AND-FERMAT-ASSUMED-UNRELATED (FOUNDATIONAL, Type 1
  overgeneralization from distinct theorem names implying unrelated
  facts), MC-2 EULERS-THEOREM-ASSUMED-PRIME-ONLY (High, Type 1
  overgeneralization carrying the prerequisite's prime-only scope
  onto its own generalization), MC-3 PHI-N-ASSUMED-ALWAYS-EASY
  (Moderate, Type 2 perceptual intuition from small worked examples).
- `math.nt.primality-testing` (requires
  `math.nt.fermats-little-theorem`; unlocks `math.nt.rsa-basics`) —
  MC-1 FERMAT-TEST-PASSING-ASSUMED-TO-PROVE-PRIMALITY (FOUNDATIONAL,
  Type 4 notation-induced, from silently extending the valid
  contrapositive direction to the unsupported converse), MC-2
  EXHAUSTIVE-BASE-TESTING-ASSUMED-TO-CATCH-EVERY-COMPOSITE
  (FOUNDATIONAL, Type 1 overgeneralization from ordinary statistical-
  testing intuition), MC-3
  PROBABILISTIC-AND-DETERMINISTIC-TESTS-ASSUMED-EQUIVALENT (Moderate,
  Type 3 language contamination, from both tests being colloquially
  described the same way).

`math.nt` now **22/36**. Part 2 (`residue-classes`,
`linear-diophantine`, both no-Blueprint) deferred to be authored next.
No other domain touched. All five tracking files updated in this same
commit; re-validated 0 duplicates, 0 orphans, 0 Quality Gate 3
violations across all 162 mathematics entries.

Full validation this batch: all 6 subject KG validators PASS (0
failures, 0 warnings each), `npx tsc --noEmit` clean, full vitest suite
run, `npm run build` succeeded.

### Mathematics — math.nt Wave 6 part 2 (2026-07-26, autonomous loop iteration 31)

Autonomous loop iteration 31, continuing immediately after Wave 6 part
1. Git resync found one concurrent commit at this iteration's start
(`dfc2cd74`, "feat: add server-owned Concept Anchor for topic-drift
prevention") — verified via `git diff --stat` zero overlap with
`educational-brain/` (touched only `src/app/api/learn/chat/route.ts`,
`src/lib/ai/client.ts`, `src/lib/teaching/conceptAnchor.ts`,
`src/tests/conceptAnchor.test.ts`), fast-forward merged before
continuing.

**Wave 6 part 2 candidates re-verified programmatically** against the
live KG (not assumed from part 1's projection): confirmed
`math.nt.residue-classes` and `math.nt.linear-diophantine` still the
only originally-deferred concepts, per this program's
stick-to-the-original-set precedent. Noted a further candidate newly
unlocked by Wave 6 part 1's authoring of `eulers-theorem` and
`primality-testing` (combined with the already-authored
`modular-inverse`): `math.nt.rsa-basics` (no Blueprint) — deliberately
deferred to Wave 7, computed fresh at that wave's own start.

Authored both no-Blueprint concepts directly via the birth-taxonomy
diagnostic procedure:

- `math.nt.residue-classes` (requires `math.nt.congruence`; unlocks
  `math.abst.quotient-ring`, not yet authored, P76 mode independence)
  — deliberately distinguished from `math.nt.congruence` (which
  established the partition itself) and `math.nt.modular-arithmetic`
  (which established individual-residue inverse existence) by
  focusing on the RING/FIELD structural content: MC
  RESIDUE-CLASS-CONFLATED-WITH-A-SINGLE-INTEGER (FOUNDATIONAL, Type 4
  notation-induced, from the bracket notation being frequently
  dropped), MC
  RESIDUE-CLASS-ARITHMETIC-ASSUMED-TO-DEPEND-ON-CHOSEN-REPRESENTATIVE
  (Foundational, Type 2 perceptual intuition), MC
  Z-NZ-ASSUMED-ALWAYS-A-FIELD-REGARDLESS-OF-N (Moderate, Type 1
  overgeneralization, directly citing `math.nt.modular-arithmetic`'s
  own inverse-existence evidence rather than re-deriving it).
- `math.nt.linear-diophantine` (requires `math.nt.bezout-identity`,
  `math.nt.gcd`; unlocks `math.nt.general-diophantine`) —
  deliberately distinguished from `math.nt.bezout-identity` (existence
  only for c=gcd) and `math.nt.extended-euclidean-algorithm`
  (non-uniqueness for the gcd case) by focusing on the GENERAL c and
  the SCALING step: MC
  LINEAR-DIOPHANTINE-SOLVABILITY-CRITERION-MISAPPLIED-AS-C-EQUALS-GCD
  (FOUNDATIONAL, Type 1 overgeneralization from Bézout's own special
  case), MC LINEAR-DIOPHANTINE-PARAMETRIZATION-STEP-SIZE-MISCOMPUTED
  (Foundational, Type 6 analogy overextension from
  extended-euclidean-algorithm's own non-uniqueness finding, without
  the additional step-size constraint), MC
  LINEAR-DIOPHANTINE-SOLVED-VIA-BEZOUT-DIRECTLY-WITHOUT-SCALING-WHEN-C-NEQ-GCD
  (Moderate, Type 5 instruction-induced).

`math.nt` now **24/36**, exactly two-thirds complete. No other domain
touched. All five tracking files updated in this same commit;
re-validated 0 duplicates, 0 orphans, 0 Quality Gate 3 violations
across all 164 mathematics entries.

Full validation this batch: all 6 subject KG validators PASS (0
failures, 0 warnings each), `npx tsc --noEmit` clean, full vitest suite
2164 passed / 1 skipped (112 files), `npm run build` succeeded.

### Mathematics — math.nt Wave 7 (2026-07-26, autonomous loop iteration 32)

Autonomous loop iteration 32, continuing immediately after Wave 6 part
2. Git resync found one concurrent commit at this iteration's start
(`58b83306`, "Loop 3: expand failure-state detection coverage") —
verified via `git diff --stat` zero overlap with `educational-brain/`
(touched only `src/lib/teaching/recoveryGuard.ts`,
`src/tests/recoveryGuard.test.ts`), fast-forward merged before
continuing.

**Wave 7 candidates re-verified programmatically** against the live
KG: 2 ready — `math.nt.rsa-basics` (originally projected, unblocked by
`eulers-theorem`/`primality-testing`/`modular-inverse`) and
`math.nt.general-diophantine` (newly unlocked via Wave 6 part 2's
`linear-diophantine`). Both no Blueprint; both authored this wave
since the load was small and uniform (no split needed).

Authored both concepts directly via the birth-taxonomy diagnostic
procedure:

- `math.nt.rsa-basics` (requires `math.nt.eulers-theorem`,
  `math.nt.primality-testing`, `math.nt.modular-inverse`; unlocks
  none) — a capstone synthesis concept, deliberately reusing all
  three prerequisites by reference rather than re-deriving their
  content: MC RSA-SECURITY-ASSUMED-TO-COME-FROM-SECRET-ALGORITHM
  (FOUNDATIONAL, Type 2 perceptual intuition, from historical-cipher
  secrecy-of-method assumptions), MC
  PUBLIC-EXPONENT-E-ASSUMED-TO-BE-ARBITRARY (Foundational, Type 5
  instruction-induced), MC
  PRIVATE-EXPONENT-D-ASSUMED-COMPUTABLE-FROM-PUBLIC-KEY-ALONE
  (Moderate, Type 1 overgeneralization — this IS RSA's entire
  security foundation, directly citing eulers-theorem's own
  factorization-difficulty finding rather than re-deriving it).
- `math.nt.general-diophantine` (requires `math.nt.linear-diophantine`;
  cross-link `math.nt.algebraic-number-theory`, not yet authored, P76
  mode independence) — deliberately distinguished from
  `math.nt.linear-diophantine`'s clean, complete solvability method by
  focusing on the genuine ABSENCE of a unified method at higher
  degree: MC GENERAL-DIOPHANTINE-ASSUMED-SOLVABLE-BY-LINEAR-METHODS
  (FOUNDATIONAL, Type 1 overgeneralization), MC
  DIOPHANTINE-SOLVABILITY-ASSUMED-UNIFORM-ACROSS-SIMILAR-EQUATIONS
  (Foundational, Type 6 analogy overextension, using Fermat's Last
  Theorem versus Pythagorean triples as the canonical contrast), MC
  DIOPHANTINE-EQUATION-NO-SOLUTIONS-FOUND-ASSUMED-EQUIVALENT-TO-PROVEN-UNSOLVABLE
  (Moderate, Type 1 overgeneralization from primality-testing's own
  correctly-scoped "search works, just slowly" framing, inappropriately
  carried into a domain where search cannot prove non-existence at
  all). Curriculum Feedback recorded (not fixed): the KG's `unlocks`
  field is empty for this concept even though `pells-equation` and
  `pythagorean-triples` both list it in their own `requires`.

`math.nt` now **26/36**. No further candidates unlocked this wave (the
remaining 10 concepts are blocked on deep analytic/algebraic-number-
theory prerequisites) — Wave 8 will need a fresh audit of the domain's
tail. No other domain touched. All five tracking files updated in this
same commit; re-validated 0 duplicates, 0 orphans, 0 Quality Gate 3
violations across all 166 mathematics entries.

Full validation this batch: all 6 subject KG validators PASS (0
failures, 0 warnings each), `npx tsc --noEmit` clean, full vitest suite
run, `npm run build` succeeded.

### Mathematics — math.nt Wave 8 (2026-07-26, autonomous loop iteration 33)

Autonomous loop iteration 33, continuing immediately after Wave 7. Git
resync found zero concurrent commits at this iteration's start.

**Fresh domain-tail audit** (as flagged as necessary at the end of
Wave 7): of the 10 remaining `math.nt` concepts, only
`math.nt.pells-equation` was found ready. A genuine cross-domain
dependency was evaluated and NOT pursued this wave:
`math.nt.pythagorean-triples` has its `math.nt.general-diophantine`
prerequisite satisfied (as of Wave 7) but remains blocked on
`math.geom.pythagorean-theorem`, which itself requires a 4-concept
`math.geom` chain (`triangle`, `perpendicular-lines`, `right-triangle`,
`pythagorean-theorem`) — unlike the earlier `math.nt.gcd`/`lcm`
excursion (5 concepts, entirely within `math.nt`), unblocking this
concept means starting an entirely separate domain, not a small
bounded excursion. Deferred as an open decision for a future wave,
recorded explicitly rather than silently skipped.

Authored `math.nt.pells-equation` (requires
`math.nt.general-diophantine`; unlocks none) directly via the
birth-taxonomy diagnostic procedure, no Blueprint existing for this
concept. Deliberately builds on, rather than restates,
`general-diophantine`'s own preview mention of this equation's
astronomically-large-solutions example:

- MC PELLS-EQUATION-ASSUMED-SOLVABLE-FOR-ANY-D (FOUNDATIONAL, Type 1
  overgeneralization from general-diophantine's own "this family has
  solutions" framing, missing the specific non-square-D condition).
- MC PELLS-EQUATION-FUNDAMENTAL-SOLUTION-ASSUMED-TO-BE-THE-ONLY-SOLUTION
  (Foundational, Type 1 overgeneralization from simpler
  equation-solving habits).
- MC PELLS-EQUATION-SOLUTIONS-ASSUMED-EASY-TO-FIND-BY-INSPECTION
  (Moderate, Type 2 perceptual intuition, developed via the D=61 case
  general-diophantine's own entry named but did not develop).

`math.nt` now **27/36**. Only `pythagorean-triples` (blocked on the
deferred math.geom excursion) and 8 deep analytic/algebraic-number-
theory concepts remain. No other domain touched. All five tracking
files updated in this same commit; re-validated 0 duplicates, 0
orphans, 0 Quality Gate 3 violations across all 167 mathematics
entries.

Full validation this batch: all 6 subject KG validators PASS (0
failures, 0 warnings each), `npx tsc --noEmit` clean, full vitest suite
2205 passed / 1 skipped (114 files), `npm run build` succeeded.

### Mathematics — math.geom Wave 1, domain pivot decision (2026-07-26, autonomous loop iteration 34)

Autonomous loop iteration 34, continuing immediately after Wave 8's
own closing decision point. Git resync found zero concurrent commits
at this iteration's start.

**Domain pivot decision**: investigated the full cross-domain
prerequisite depth of all 9 remaining `math.nt` concepts.
`math.nt.pythagorean-triples` needs only a 4-concept `math.geom` chain
(`triangle`, `perpendicular-lines`, `right-triangle`,
`pythagorean-theorem`) — the other 8 (`prime-distribution`,
`prime-number-theorem`, `riemann-hypothesis`, `continued-fractions`,
`algebraic-number-theory`, `algebraic-integers`, `number-fields`,
`analytic-number-theory`) each require calculus (`math.calc.limits`),
complex analysis (`math.cx.*`), or abstract algebra (`math.abst.*`)
prerequisites that are themselves multi-level-deep and entirely
unauthored — none is a small bounded excursion. Rather than treating
the `pythagorean-triples` chain as an isolated excursion, decided to
start `math.geom` as its own full Domain Certification campaign:
`math.geom.point` is the domain's single reachable entry node
(`requires: math.found.mathematical-thinking`, already certified;
verified programmatically that 0 of `math.geom`'s 69 concepts have
`requires: []`, but exactly 1 has all prerequisites already
satisfied). Progressing this campaign will naturally reach
`pythagorean-theorem` and unblock `math.nt.pythagorean-triples` along
the way, without a special-cased detour. `math.nt` remains explicitly
parked at **27/36**, recorded as blocked on cross-domain campaigns,
not abandoned.

Authored `math.geom.point` (requires `math.found.mathematical-
thinking`; unlocks `math.geom.line`, `math.geom.plane`) — Blueprint
exists (`docs/curriculum/blueprints/math.geom.point.md`, a different
authoring format from the math.nt/math.found/math.arith corpus,
using named primitives P03/P06/P11/P27/P41/P49/P64/P91 rather than
"Primitive P—: —" labels; content mapped into the Standard's 21
sections, reused by reference throughout):

- MC-1 POINT-HAS-SIZE (FOUNDATIONAL, Type 2 perceptual intuition —
  every physical representation of a point genuinely has visible
  size).
- MC-2 POINT-AS-MARK (Type 3 language contamination — everyday
  language routinely conflates a physical mark with the abstract
  point it represents).
- MC-3 COORDINATE-REQUIRED (Type 5 instruction-induced — most
  students first encounter points via coordinate plotting).

`math.geom` now **1/69**. No other domain touched. All five tracking
files updated in this same commit; re-validated 0 duplicates, 0
orphans, 0 Quality Gate 3 violations across all 168 mathematics
entries.

Full validation this batch: all 6 subject KG validators PASS (0
failures, 0 warnings each), `npx tsc --noEmit` clean, full vitest suite
run, `npm run build` succeeded.

### Mathematics — math.geom Wave 2 (2026-07-26, autonomous loop iteration 35)

Autonomous loop iteration 35, continuing immediately after Wave 1. Git
resync found zero concurrent commits at this iteration's start.

**Wave 2 candidates re-verified programmatically** against the live
KG: only `math.geom.line` ready (requires `math.geom.point`, satisfied
by Wave 1); `math.geom.plane` requires `math.geom.line`, confirmed not
yet satisfied — becomes ready next wave.

Authored `math.geom.line` (requires `math.geom.point`; unlocks
`math.geom.angle`, `math.geom.parallel-lines`; children
`math.geom.line-segment`, `math.geom.ray`) — Blueprint exists
(`docs/curriculum/blueprints/math.geom.line.md`, same P03/P06/P11/
P27/P41/P49/P64/P91-primitive authoring format as `math.geom.point`'s
own Blueprint), reused by reference. Cross-link
`math.geom.line-equation` has a Blueprint but no Educational Brain
entry yet — P76_mode = cross-link probe per the Blueprint's own
determination:

- MC-1 LINE-HAS-ENDPOINTS (FOUNDATIONAL, Type 3 language
  contamination — everyday speech and early classroom diagrams both
  use "line" to mean a finite segment).
- MC-2 LINE-HAS-THICKNESS (Type 2 perceptual intuition — every
  physically drawn line genuinely has visible width).
- MC-3 LINE-NEEDS-EQUATION (Type 5 instruction-induced — algebraic
  y=mx+b representations are practiced heavily before the pure
  geometric two-points definition is emphasized).

`math.geom` now **2/69**. No other domain touched. All five tracking
files updated in this same commit; re-validated 0 duplicates, 0
orphans, 0 Quality Gate 3 violations across all 169 mathematics
entries.

Full validation this batch: all 6 subject KG validators PASS (0
failures, 0 warnings each), `npx tsc --noEmit` clean, full vitest suite
2213 passed / 1 skipped (114 files), `npm run build` succeeded.

### Mathematics — math.geom Wave 3 (2026-07-26, autonomous loop iteration 36)

Autonomous loop iteration 36, continuing immediately after Wave 2. Git
resync found zero concurrent commits at this iteration's start.

**Wave 3 candidates re-verified programmatically** against the live
KG: 3 ready, all unlocked by `math.geom.line` and all Blueprint-
grounded — `math.geom.line-segment`, `math.geom.ray`,
`math.geom.plane`. No split needed (small, uniform load, all
Blueprint-backed).

Authored all 3, each reused by reference:

- `math.geom.line-segment` (requires `math.geom.line`; unlocks
  `math.geom.length`) — MC-1 SEGMENT-IS-LINE (FOUNDATIONAL, Type 3
  language contamination, from everyday speech using "line" to mean a
  finite segment), MC-2 SEGMENT-DIRECTED (Type 6 analogy
  overextension, over-applying vector directedness to symmetric
  segments), MC-3 SEGMENT-NEEDS-MEASUREMENT (Type 5
  instruction-induced).
- `math.geom.ray` (requires `math.geom.line`; unlocks
  `math.geom.angle`) — MC-1 RAY-HAS-TWO-ENDPOINTS (FOUNDATIONAL, Type
  4 notation-induced, from the →AB notation visually naming two
  points), MC-2 RAY-DIRECTION-INDETERMINATE (Type 6 analogy
  overextension, over-applying segment symmetry to directed rays),
  MC-3 RAY-IS-HALF-SEGMENT (Type 3 language contamination, misreading
  "half-line" as halving a finite object).
- `math.geom.plane` (requires `math.geom.line`; unlocks
  `math.geom.polygon`, `math.geom.coordinate-plane`; cross-link
  `math.geom.coordinate-plane`, Blueprint exists, no EB entry, P76
  cross-link probe) — MC-1 PLANE-HAS-BOUNDARY (FOUNDATIONAL, Type 2
  perceptual intuition, from every physical plane-model having visible
  edges), MC-2 PLANE-FROM-TWO-POINTS (Type 1 overgeneralization,
  over-applying the two-points-determine-a-line rule), MC-3
  ONE-PLANE-PER-LINE (Type 1 overgeneralization, conflating plane
  uniqueness-from-three-points with per-line exclusivity).

`math.geom` now **5/69**. No other domain touched. All five tracking
files updated in this same commit; re-validated 0 duplicates, 0
orphans, 0 Quality Gate 3 violations across all 172 mathematics
entries.

Full validation this batch: all 6 subject KG validators PASS (0
failures, 0 warnings each), `npx tsc --noEmit` clean, full vitest suite
run, `npm run build` succeeded.

### Mathematics — math.geom Wave 4 part 1 (2026-07-26, autonomous loop iteration 37)

Autonomous loop iteration 37, continuing immediately after Wave 3. Git
resync found zero concurrent commits at this iteration's start.

**Wave 4 candidates re-verified programmatically** against the live
KG: 5 ready — `math.geom.angle` (requires `ray`), `math.geom.perimeter`
(requires `line-segment`, no Blueprint), `math.geom.circle` (requires
`point`, `line-segment`), `math.geom.length` (requires `line-segment`,
no Blueprint), `math.geom.coordinate-plane` (requires `plane`,
`math.found.real-numbers`). Split per this program's uneven-load
precedent: part 1 (3 Blueprint-grounded: `angle`, `circle`,
`coordinate-plane`) and part 2 (2 no-Blueprint: `perimeter`, `length`,
deferred).

Authored the 3 Blueprint-grounded concepts, each reused by reference:

- `math.geom.angle` (requires `math.geom.ray`; unlocks
  `math.geom.triangle`, `math.trig.right-triangle-trig`; cross-link
  `math.trig.angle-measure`, Blueprint exists, no EB entry, P76
  cross-link probe) — MC-1 ANGLE-DEPENDS-ON-RAY-LENGTH (FOUNDATIONAL,
  Type 2 perceptual intuition, from diagrams where wider-looking
  angles often have longer drawn rays), MC-2 ANGLE-DEGREES-ONLY (Type
  5 instruction-induced, degrees taught first and reinforced heavily),
  MC-3 ANGLE-VERTEX-IS-FIRST-LETTER (Type 3 language contamination,
  from left-to-right reading habits).
- `math.geom.circle` (requires `math.geom.point`,
  `math.geom.line-segment`; unlocks `math.trig.unit-circle`;
  cross-links `math.trig.unit-circle` Tier 1 Blueprint-exists-no-EB
  cross-link probe, `math.geom.circle-equation` not Tier 1) — MC-1
  RADIUS-DIAMETER-CONFUSION (FOUNDATIONAL, Type 4 notation-induced),
  MC-2 PI-IS-APPROXIMATE-ONLY (Type 3 language contamination, from
  calculator/everyday usage always showing π as 3.14), MC-3
  ARC-IS-CHORD (Type 6 analogy overextension, over-applying
  straight-line distance to a curved boundary path).
- `math.geom.coordinate-plane` (requires `math.geom.plane`,
  `math.found.real-numbers`; unlocks `math.geom.distance-formula`,
  `math.geom.midpoint-formula`, `math.geom.slope`,
  `math.geom.line-equation`; cross-link `math.func.graph-of-function`
  not Tier 1, independence mode) — MC-1 AXIS-SWAP (FOUNDATIONAL, Type
  3 language contamination), MC-2 QUADRANT-SIGN-ERROR (Type 5
  instruction-induced, from rote-memorized quadrant diagrams), MC-3
  ORIGIN-AS-CORNER (Type 6 analogy overextension, over-applying ruler/
  page-corner conventions to a bidirectional axis system).

`math.geom` now **8/69**. Part 2 (`math.geom.perimeter`,
`math.geom.length`, both no-Blueprint) deferred to be authored next.
No other domain touched. All five tracking files updated in this same
commit; re-validated 0 duplicates, 0 orphans, 0 Quality Gate 3
violations across all 175 mathematics entries.

Full validation this batch: all 6 subject KG validators PASS (0
failures, 0 warnings each), `npx tsc --noEmit` clean, full vitest suite
2213 passed / 1 skipped (114 files), `npm run build` succeeded.

### Mathematics — math.geom Wave 4 part 2 (2026-07-26, autonomous loop iteration 38)

Autonomous loop iteration 38, continuing immediately after Wave 4 part
1. Git resync found zero concurrent commits at this iteration's start.

**Wave 4 part 2 candidates re-verified programmatically** against the
live KG: confirmed `math.geom.perimeter` and `math.geom.length` remain
the two originally-deferred no-Blueprint concepts and are still ready,
per this program's stick-to-the-original-set precedent. Noted the live
ready pool had grown to 15 total (13 newly unlocked by Wave 4 part 1's
authoring of `angle`, `circle`, `coordinate-plane`) — the 13 new
arrivals (`angle-types` no-Blueprint, `angle-measurement`,
`angle-pairs`, `perpendicular-lines`, `triangle`, `circle-parts`
no-Blueprint, `circle-equation`, `x-y-coordinates`, `quadrants`
no-Blueprint, `midpoint-formula` no-Blueprint, `slope`,
`transformations`, `vectors-2d`) are deliberately deferred to Wave 5,
to be re-verified fresh at that wave's own start rather than assumed
unchanged.

Authored both deferred no-Blueprint concepts via the birth-taxonomy
diagnostic procedure:

- `math.geom.perimeter` (requires `math.geom.line-segment`; unlocks
  `math.geom.circle-circumference`) — MC-1
  PERIMETER-CONFLATED-WITH-AREA (FOUNDATIONAL, Type 3 language
  contamination, from everyday language and shared rectangle examples
  blurring which formula answers which question), MC-2
  PERIMETER-AREA-RELATIONSHIP-ASSUMED-FIXED (Type 1
  overgeneralization, from the uniform-scaling special case), MC-3
  PERIMETER-ASSUMED-NOT-APPLICABLE-TO-CIRCLES (Type 4
  notation-induced, from the distinct vocabulary word
  "circumference").
- `math.geom.length` (requires `math.geom.line-segment`; unlocks
  `math.geom.distance-formula`; cross-link `math.geom.distance-formula`,
  Blueprint exists, no EB entry, P76 cross-link probe) — MC-1
  LENGTH-VALUE-INCOMPLETE-WITHOUT-UNITS (FOUNDATIONAL, Type 4
  notation-induced), MC-2 LENGTH-ASSUMED-ADDITIVE-FOR-ANY-PATH (Type 1
  overgeneralization, over-applying collinear segment additivity to
  bent paths), MC-3
  LENGTH-COMPARISON-ASSUMED-VALID-ACROSS-UNITS-WITHOUT-CONVERSION
  (Type 2 perceptual intuition, larger numeral feels larger regardless
  of unit scale). Deliberately distinguished from `math.geom.
  line-segment`'s own SEGMENT-NEEDS-MEASUREMENT misconception (which
  covers existence-independent-of-measurement) by developing the
  actual measurement concept itself.

`math.geom` now **10/69**. No other domain touched. All five tracking
files updated in this same commit; re-validated 0 duplicates, 0
orphans, 0 Quality Gate 3 violations across all 177 mathematics
entries.

Full validation this batch: all 6 subject KG validators PASS (0
failures, 0 warnings each), `npx tsc --noEmit` clean, full vitest suite
run, `npm run build` succeeded.

### Mathematics — math.geom Wave 5 (2026-07-26, autonomous loop iteration 39)

Autonomous loop iteration 39, continuing immediately after Wave 4 part
2. Git resync found zero concurrent commits at this iteration's start.

**Wave 5 candidates re-verified programmatically** against the live
KG (not assumed from Wave 4 part 2's own projection): the ready pool
had grown to 14 (13 previously projected, plus `math.geom.
circle-circumference` newly unlocked by Wave 4 part 2's authoring of
`perimeter`) — `angle-types` (no Blueprint), `angle-measurement`,
`angle-pairs`, `perpendicular-lines`, `triangle`, `circle-parts` (no
Blueprint), `circle-circumference` (no Blueprint), `circle-equation`,
`x-y-coordinates`, `quadrants` (no Blueprint), `midpoint-formula` (no
Blueprint), `slope`, `transformations`, `vectors-2d`. Split per this
program's uneven-load precedent: authored the 5 Blueprint-grounded
concepts unlocked directly by `angle` and by `circle`/
`coordinate-plane` (`angle-measurement`, `angle-pairs`, `perpendicular-
lines`, `triangle`, `circle-equation`), deferring the remaining
Blueprint-grounded concepts (`x-y-coordinates`, `slope`,
`transformations`, `vectors-2d`) and all 5 no-Blueprint concepts
(`angle-types`, `circle-parts`, `circle-circumference`, `quadrants`,
`midpoint-formula`) to future waves.

Authored all 5, each reused by reference:

- `math.geom.angle-measurement` (requires `math.geom.angle`; unlocks
  `math.trig.angle-measure`; cross-link `math.trig.angle-measure`,
  Blueprint exists, no EB entry, P76 cross-link probe) — MC-1
  PROTRACTOR-WRONG-SCALE (FOUNDATIONAL, Type 4 notation-induced, from
  a protractor's two overlapping oppositely-directed scales carrying
  no built-in rule for which to read), MC-2
  CONVERSION-FORMULA-MISSING-PI (Type 1 overgeneralization,
  "divide by 180" over-generalized from a partially-recalled formula,
  dropping the π factor), MC-3 REFLEX-ANGLE-UNMEASURABLE (Type 4
  notation-induced, the protractor's physical 180° limit mistaken for
  an absolute mathematical limit).
- `math.geom.angle-pairs` (requires `math.geom.angle`; unlocks
  `math.geom.parallel-lines`; no cross-links, independence mode) —
  MC-1 SUPPLEMENTARY-CONFLATED-WITH-LINEAR-PAIR (Foundational, Type 3
  language contamination, near-synonym habit applied to two
  non-equivalent terms), MC-2
  VERTICAL-ANGLES-CONFUSED-WITH-ADJACENT-ANGLES (Foundational, Type 1
  overgeneralization, "angles next to mine" over-applied as the
  answer to "find the equal angle"), MC-3
  COMPLEMENTARY-AND-SUPPLEMENTARY-SUMS-CONFUSED (Moderate, Type 4
  notation-induced, two arbitrarily-paired word/number associations
  with no inherent connection).
- `math.geom.perpendicular-lines` (requires `math.geom.angle`; unlocks
  `math.geom.right-triangle`; no cross-links, independence mode) —
  MC-1 PERPENDICULAR-ONLY-H-V (FOUNDATIONAL, Type 1
  overgeneralization, from textbook diagrams overwhelmingly showing
  axis-aligned examples), MC-2 INTERSECTING-IS-PERPENDICULAR (Type 1
  overgeneralization, "lines cross" over-extended to "lines are
  perpendicular"), MC-3 CLOSEST-NOT-PERPENDICULAR (Type 2 perceptual
  intuition, a nearby oblique segment looking just as short as the
  true perpendicular without an explicit right-triangle argument).
- `math.geom.triangle` (requires `math.geom.angle`,
  `math.geom.line-segment`; unlocks `math.geom.pythagorean-theorem`,
  `math.trig.right-triangle-trig`; cross-link
  `math.trig.right-triangle-trig` Tier 1, Blueprint exists, no EB
  entry, P76 cross-link probe) — MC-1 ANGLE-SUM-NOT-180
  (FOUNDATIONAL, Type 1 overgeneralization, the 360°-around-a-point
  sum over-applied to a triangle's interior, which occupies only half
  the plane), MC-2 TRIANGLE-TYPE-IS-EXCLUSIVE (Type 1
  overgeneralization, two independent classification axes wrongly
  merged into one exclusive list), MC-3 ALTITUDE-IS-A-SIDE (Type 6
  analogy overextension, the right-triangle special case where a leg
  IS the altitude to the other leg over-applied to the
  altitude-to-hypotenuse case). This is the domain's direct step
  toward `math.geom.pythagorean-theorem`, per this program's Batch 44
  pivot decision to reach it via natural `math.geom` progression
  rather than an isolated cross-domain excursion for `math.nt.
  pythagorean-triples`.
- `math.geom.circle-equation` (requires `math.geom.circle`,
  `math.geom.coordinate-plane`; unlocks `math.geom.conic-sections`;
  cross-link `math.geom.conic-sections`, not yet authored — no
  Blueprint on disk, verified via directory check, P76_mode =
  independence per the Blueprint's own determination) — MC-1
  RADIUS-NOT-SQUARED-IN-EQUATION (Foundational, Type 4
  notation-induced, the bare symbol r's surface familiarity carried
  mistakenly into the equation), MC-2
  EXPANDED-FORM-ASSUMED-ALWAYS-A-GENUINE-CIRCLE (Foundational, Type 1
  overgeneralization, procedural success of completing the square
  over-generalized into "always a genuine circle" without checking
  the resulting sign), MC-3
  POSITION-CHECK-ASSUMED-TO-REQUIRE-SOLVING (Moderate, Type 6 analogy
  overextension, the general "solve the equation" habit over-applied
  where direct comparison suffices).

`math.geom` now **15/69**. No other domain touched. All five tracking
files updated in this same commit; re-validated 0 duplicates, 0
orphans, 0 Quality Gate 3 violations across all 182 mathematics
entries.

Full validation this batch: all 6 subject KG validators PASS (0
failures, 0 warnings each), `npx tsc --noEmit` clean, full vitest suite
2213 passed / 1 skipped (114 files), `npm run build` succeeded.

### Mathematics — math.geom Wave 6 (2026-07-26, autonomous loop iteration 40)

Autonomous loop iteration 40, continuing immediately after Wave 5. Git
resync found zero concurrent commits at this iteration's start.

**Wave 6 candidates re-verified programmatically** against the live
KG (not assumed from Wave 5's own deferred-candidate projection): 18
ready — `angle-types` (no Blueprint), `parallel-lines`,
`triangle-types` (no Blueprint), `right-triangle`,
`congruent-triangles`, `similar-triangles`, `area-triangle`,
`polygon`, `circle-parts` (no Blueprint), `circle-circumference` (no
Blueprint), `circle-theorems` (no Blueprint), `x-y-coordinates`,
`quadrants` (no Blueprint), `midpoint-formula` (no Blueprint), `slope`,
`transformations`, `vectors-2d`, `geometric-constructions` (no
Blueprint). Split per this program's uneven-load precedent: authored
the 5 Blueprint-grounded triangle-family concepts unlocked directly by
`triangle` (plus `perpendicular-lines` for `right-triangle`) —
`right-triangle`, `congruent-triangles`, `similar-triangles`,
`area-triangle`, `polygon` — deliberately prioritized over
`parallel-lines` and the coordinate-plane-family concepts because this
set is the domain's direct path toward `math.geom.pythagorean-theorem`
(via `right-triangle`), continuing this program's Batch 44 pivot
decision to unblock the parked `math.nt.pythagorean-triples`. Deferred
`parallel-lines`, the 4 remaining coordinate-plane-family
Blueprint-grounded concepts (`x-y-coordinates`, `slope`,
`transformations`, `vectors-2d`), and all no-Blueprint concepts to
future waves.

Authored all 5, each reused by reference:

- `math.geom.right-triangle` (requires `math.geom.triangle`,
  `math.geom.perpendicular-lines`; unlocks
  `math.geom.pythagorean-theorem`, `math.trig.right-triangle-trig`;
  cross-link `math.trig.right-triangle-trig` Tier 1, Blueprint exists,
  no EB entry, P76 cross-link probe) — MC-1
  HYPOTENUSE-NOT-OPPOSITE-RIGHT-ANGLE (FOUNDATIONAL, Type 2 perceptual
  intuition, from standard-orientation diagrams where the visually
  longest side and the true hypotenuse usually coincide), MC-2
  ACUTE-ANGLES-SUM-TO-180 (Type 1 overgeneralization, the general
  180°-subtraction rule applied without first accounting for the right
  angle's own 90°), MC-3 TWO-RIGHT-ANGLES-POSSIBLE (Type 1
  overgeneralization, one right angle being unremarkable extended to a
  second). This is the domain's direct step reaching toward
  `math.geom.pythagorean-theorem`.
- `math.geom.congruent-triangles` (requires `math.geom.triangle`;
  unlocks `math.geom.geometric-proof`; no cross-links, independence
  mode) — MC-1 CONGRUENCE-CONFLATED-WITH-SIMILARITY (Foundational,
  Type 3 language contamination, everyday "same shape" carried into
  two mathematically distinct categories), MC-2
  AAA-TREATED-AS-CONGRUENCE-CRITERION (Foundational, Type 1
  overgeneralization, similarity's genuine AAA sufficiency
  over-generalized to congruence), MC-3
  SSA-TREATED-AS-VALID-CRITERION (Moderate, Type 6 analogy
  overextension, SAS's validity over-extended to the genuinely
  ambiguous SSA case).
- `math.geom.similar-triangles` (requires `math.geom.triangle`,
  `math.arith.ratios`; unlocks `math.trig.right-triangle-trig`;
  cross-link `math.trig.right-triangle-trig` Tier 1, Blueprint exists,
  no EB entry, P76 cross-link probe) — MC-1 CONGRUENT-MEANS-SIMILAR
  (FOUNDATIONAL, Type 3 language contamination, everyday "similar"
  meaning "alike but different" clashing with the mathematical sense
  including k=1), MC-2 AA-NEEDS-THREE-ANGLES (Type 1
  overgeneralization, a general completeness instinct applied where
  the angle-sum theorem already forces the third angle), MC-3
  CORRESPONDENCE-ORDER-DOESNT-MATTER (Type 4 notation-induced, the
  ordered similarity-statement notation rarely explained explicitly).
- `math.geom.area-triangle` (requires `math.geom.triangle`; unlocks
  `math.geom.area-polygon`; no cross-links, independence mode) — MC-1
  HEIGHT-CONFUSED-WITH-A-SLANT-SIDE (Foundational, Type 6 analogy
  overextension, directly reusing `math.geom.triangle`'s own
  altitude-vs-side confusion in the area-computation context), MC-2
  HERONS-FORMULA-ASSUMED-TO-NEED-HEIGHT (Foundational, Type 1
  overgeneralization, the ½bh formula's height requirement
  over-generalized to every area formula), MC-3
  THE-TWO-AREA-FORMULAS-ASSUMED-COULD-DISAGREE (Moderate, Type 4
  notation-induced, the two formulas' structurally unrelated
  appearance masking that they compute the same quantity).
- `math.geom.polygon` (requires `math.geom.line-segment`,
  `math.geom.triangle`; unlocks `math.geom.area`; no cross-links,
  independence mode) — MC-1
  EQUAL-SIDES-ASSUMED-SUFFICIENT-FOR-REGULARITY (Foundational, Type 3
  language contamination, "regular" carrying an everyday "uniform"
  connotation mapped onto equal sides alone), MC-2
  INTERIOR-ANGLE-SUM-FORMULA-CITED-WITHOUT-DERIVATION (Moderate, Type
  5 instruction-induced, the formula drilled as a forward-only recipe
  without the triangulation derivation), MC-3
  POLYGON-DEFINITION-CURVED-SIDE-OVERLOOKED (Moderate, Type 1
  overgeneralization, a mostly-straight-sided figure treated as "close
  enough" to a genuine polygon).

`math.geom` now **20/69**. No other domain touched. All five tracking
files updated in this same commit; re-validated 0 duplicates, 0
orphans, 0 Quality Gate 3 violations across all 187 mathematics
entries.

Full validation this batch: all 6 subject KG validators PASS (0
failures, 0 warnings each), `npx tsc --noEmit` clean, full vitest suite
2213 passed / 1 skipped (114 files), `npm run build` succeeded.

### Mathematics — math.geom Wave 7 + math.nt.pythagorean-triples (2026-07-26, autonomous loop iteration 41)

Autonomous loop iteration 41, continuing immediately after Wave 6. Git
resync found zero concurrent commits at this iteration's start.

**Wave 7 candidates re-verified programmatically** against the live
KG: 18 ready — `angle-types` (no Blueprint), `parallel-lines`,
`triangle-types` (no Blueprint), `math.geom.pythagorean-theorem`
(newly unlocked by Wave 6's `right-triangle`), `triangle-centers` (no
Blueprint), `regular-polygon` (no Blueprint), `area-polygon` (newly
unlocked by Wave 6's `area-triangle`), `circle-parts`/
`circle-circumference`/`circle-theorems` (no Blueprint), `solid-3d`
(newly unlocked by Wave 6's `polygon`), `x-y-coordinates`, `quadrants`
(no Blueprint), `midpoint-formula` (no Blueprint), `slope`,
`transformations`, `vectors-2d`, `geometric-constructions` (no
Blueprint). Prioritized and authored the 4 Blueprint-grounded concepts
most directly advancing this program's Batch 44 pivot goal —
`pythagorean-theorem` itself, plus `parallel-lines`, `area-polygon`,
`solid-3d` — deferring the coordinate-plane-family Blueprint-grounded
concepts (`x-y-coordinates`, `slope`, `transformations`, `vectors-2d`)
and all no-Blueprint concepts to future waves.

Authored all 4, each reused by reference:

- `math.geom.pythagorean-theorem` (requires `math.geom.right-triangle`,
  `math.arith.square-numbers`; unlocks `math.geom.distance-formula`,
  `math.trig.right-triangle-trig`, `math.geom.pythagorean-converse`;
  cross-links `math.nt.pythagorean-triples`, `math.geom.
  distance-formula`, both unauthored at Blueprint-authoring time,
  P76_mode = independence) — MC-1 ALWAYS-ADD-SQUARES (FOUNDATIONAL,
  Type 5 instruction-induced, the theorem's additive solve-for-
  hypotenuse form dominating initial instruction), MC-2
  ANY-TRIPLE-IS-RIGHT-TRIANGLE (Type 1 overgeneralization, familiar
  working triples over-generalized to any plausible-looking numbers),
  MC-3 WRONG-SIDE-TREATED-AS-HYPOTENUSE (Type 4 notation-induced,
  no explicit longest-side-identification habit before substitution).
  **This is the concept this program's Batch 44 pivot was working
  toward** — its authoring directly unblocks `math.nt.
  pythagorean-triples`.
- `math.geom.parallel-lines` (requires `math.geom.angle-pairs`,
  `math.geom.line`; unlocks `math.geom.quadrilateral`,
  `math.geom.geometric-proof`; no cross-links, independence mode) —
  MC-1 ANGLE-RELATIONSHIPS-TREATED-AS-ONE-DIRECTIONAL (FOUNDATIONAL,
  Type 5 instruction-induced, the converse direction going unpracticed
  when only the forward direction is drilled), MC-2
  THREE-ANGLE-RELATIONSHIPS-TREATED-AS-INDEPENDENT-FACTS (Foundational,
  Type 5 instruction-induced, the three relationships presented as a
  flat list rather than a derivation chain), MC-3
  TRANSVERSAL-ANGLE-POSITIONS-MISIDENTIFIED (Moderate, Type 2
  perceptual intuition, standard-diagram training breaking down on
  unusually-angled transversals).
- `math.geom.area-polygon` (requires `math.geom.area-triangle`;
  unlocks `math.geom.area`; no cross-links, independence mode) — MC-1
  POLYGON-AREA-FORMULAS-TREATED-AS-INDEPENDENT-FACTS (Foundational,
  Type 5 instruction-induced, each shortcut formula taught in
  isolation), MC-2 PARALLELOGRAM-AREA-MISTAKENLY-USES-TRIANGLE-FORMULA
  (Foundational, Type 6 analogy overextension, the ½bh formula
  over-applied directly to a two-triangle shape), MC-3
  TRIANGLE-DECOMPOSITION-ASSUMED-ONLY-FOR-REGULAR-POLYGONS
  (Foundational, Type 1 overgeneralization, symmetric demonstration
  examples over-generalized into a requirement).
- `math.geom.solid-3d` (requires `math.geom.polygon`; unlocks
  `math.geom.surface-area`, `math.geom.volume`; no cross-links,
  independence mode) — MC-1
  EULERS-FORMULA-OVERGENERALIZED-TO-CURVED-SOLIDS (Foundational, Type
  1 overgeneralization, the formula's memorable elegance inviting
  over-application beyond its flat-faced-polyhedron scope), MC-2
  PRISM-PYRAMID-CONFLATED (Moderate, Type 2 perceptual intuition,
  familiar examples' visual cues absent for unfamiliar solids), MC-3
  HOLE-IN-SOLID-ASSUMED-TO-STILL-SATISFY-EULERS-FORMULA (Moderate,
  Type 1 overgeneralization, the formula's robustness across many
  shapes over-generalized to solids with genuinely different
  topology).

`math.geom` now **24/69**.

**With `math.geom.pythagorean-theorem` authored, `math.nt.
pythagorean-triples`'s own `requires` (`math.nt.general-diophantine`,
already authored; `math.geom.pythagorean-theorem`, authored this same
wave) became fully satisfied.** Per this program's established
small-bounded-cross-domain-excursion precedent (the earlier gcd/lcm
case), authored it immediately as part of this same wave rather than
deferring:

- `math.nt.pythagorean-triples` (requires `math.nt.
  general-diophantine`, `math.geom.pythagorean-theorem`; no `unlocks`
  listed; cross-link `math.geom.pythagorean-theorem`, authored this
  same wave, P76 cross-link probe; no Blueprint, misconceptions
  authored via the birth-taxonomy diagnostic procedure) — MC-1
  APPROXIMATE-TRIPLE-ASSUMED-VALID (FOUNDATIONAL, Type 2 perceptual
  intuition, "roughly right-sized" numbers feeling plausible without
  exact verification), MC-2 SCALED-TRIPLE-TREATED-AS-INDEPENDENT
  (Foundational, Type 1 overgeneralization, distinct-looking scaled
  triples treated as independent discoveries), MC-3
  PARAMETRIZATION-CONDITIONS-IGNORED (Moderate, Type 4
  notation-induced, the m,n formulas carrying no visible reminder of
  their side conditions).

`math.nt` now **28/36** — no longer parked on this specific concept;
its remaining 8 concepts are still the deep analytic/algebraic-number-
theory chain identified at the Batch 44 pivot, so `math.nt` remains
otherwise parked, not further pursued this wave.

No other domain touched. All five tracking files updated in this same
commit; re-validated 0 duplicates, 0 orphans, 0 Quality Gate 3
violations across all 192 mathematics entries.

Full validation this batch: all 6 subject KG validators PASS (0
failures, 0 warnings each), `npx tsc --noEmit` clean, full vitest suite
run, `npm run build` succeeded.

### Mathematics — math.geom Wave 8 (2026-07-26, autonomous loop iteration 42)

Autonomous loop iteration 42, continuing immediately after Wave 7 +
`math.nt.pythagorean-triples`. Git resync found zero concurrent
commits at this iteration's start.

**Wave 8 candidates re-verified programmatically** against the live
KG: 21 ready — `angle-types`/`triangle-types` (no Blueprint),
`triangle-angle-sum` (no Blueprint), `pythagorean-converse` (no
Blueprint), `triangle-centers` (no Blueprint), `quadrilateral` (newly
unlocked by Wave 7's `parallel-lines`), `regular-polygon` (no
Blueprint), `area` (newly unlocked by Wave 7's `area-polygon`),
`circle-parts`/`circle-circumference`/`circle-theorems` (no
Blueprint), `geometric-proof` (newly unlocked by
`congruent-triangles` + `parallel-lines`), `volume` (newly unlocked by
Wave 7's `solid-3d`), `x-y-coordinates`, `quadrants` (no Blueprint),
`distance-formula` (newly unlocked by Wave 7's
`pythagorean-theorem`), `midpoint-formula` (no Blueprint), `slope`,
`transformations`, `vectors-2d`, `geometric-constructions` (no
Blueprint). Authored the 5 Blueprint-grounded concepts that close out
the triangle/proof/area/volume threads this program's recent waves
opened — `distance-formula`, `geometric-proof`, `quadrilateral`,
`area`, `volume` — deferring the coordinate-plane-family
Blueprint-grounded concepts (`x-y-coordinates`, `slope`,
`transformations`, `vectors-2d`) and all no-Blueprint concepts to
future waves.

Authored all 5, each reused by reference:

- `math.geom.distance-formula` (requires
  `math.geom.pythagorean-theorem`, `math.geom.coordinate-plane`;
  unlocks `math.geom.circle-equation`, `math.geom.midpoint-formula`;
  cross-link `math.linalg.norm`, Blueprint exists, no EB entry, P76
  cross-link probe) — MC-1
  COORDINATE-DIFFERENCES-ADDED-WITHOUT-SQUARING (Foundational, Type 1
  overgeneralization, one-dimensional distance's simple subtraction
  over-applied to two dimensions), MC-2
  POINT-ORDER-ASSUMED-TO-AFFECT-DISTANCE (Foundational, Type 6 analogy
  overextension, `math.geom.coordinate-plane`'s own order-matters rule
  over-applied where it doesn't), MC-3
  VERTICAL-OR-HORIZONTAL-SEGMENTS-ASSUMED-TO-NEED-A-SEPARATE-FORMULA
  (Moderate, Type 4 notation-induced, the two-term formula's visual
  appearance obscuring that a term can silently vanish).
- `math.geom.geometric-proof` (requires `math.found.proof`,
  `math.geom.congruent-triangles`, `math.geom.parallel-lines`; no
  unlocks; no cross-links, independence mode) — MC-1
  JUSTIFICATION-COLUMN-ASSUMED-FORMALITY (Foundational, Type 5
  instruction-induced, intuitive early examples training "obvious" as
  sufficient justification), MC-2
  PROOF-ASSUMED-TO-END-AT-MAIN-CONCLUSION (High, Type 5
  instruction-induced, introductory exercises stopping at the
  congruence conclusion without modeling CPCTC-chaining), MC-3
  PARAGRAPH-PROOF-ASSUMED-LESS-RIGOROUS (Moderate, Type 3 language
  contamination, tabular appearance conflated with rigor itself).
- `math.geom.quadrilateral` (requires `math.geom.polygon`,
  `math.geom.parallel-lines`; no unlocks; no cross-links, independence
  mode) — MC-1 QUADRILATERAL-CLASSIFICATION-ASSUMED-VISUAL-IMPRESSION
  (Foundational, Type 2 perceptual intuition, visual similarity as the
  most available classification cue), MC-2
  CATEGORIES-ASSUMED-MUTUALLY-EXCLUSIVE (High, Type 1
  overgeneralization, everyday one-label-at-a-time naming
  over-generalized to mutual exclusivity), MC-3
  CONTAINMENT-ASSUMED-ARBITRARY-CONVENTION (Moderate, Type 3 language
  contamination, ordinary-sounding vocabulary obscuring provable
  containments).
- `math.geom.area` (requires `math.geom.area-polygon`; unlocks
  `math.geom.surface-area`, `math.calc.integral-area`; cross-link
  `math.calc.integral-area`, unauthored, independence mode) — MC-1
  AREA-PERIMETER-CONFLATED (Foundational, Type 3 language
  contamination, everyday "bigger" blurring two independent measures),
  MC-2 LINEAR-SCALING-OF-AREA (Foundational, Type 1
  overgeneralization, single-length scaling over-applied directly to
  area), MC-3 CIRCLE-AREA-AS-ISOLATED-FORMULA (Moderate, Type 4
  notation-induced, π's special-constant framing obscuring the
  polygon-limit connection).
- `math.geom.volume` (requires `math.geom.solid-3d`; no unlocks;
  cross-link `math.calc.volume-revolution`, unauthored, independence
  mode) — MC-1 VOLUME-ASSUMED-SINGLE-UNIVERSAL-FORMULA (Foundational,
  Type 1 overgeneralization, `math.geom.area`'s own unifying framing
  over-extended to volume despite genuinely different formula
  structures), MC-2 ONE-THIRD-FACTOR-ASSUMED-ARBITRARY (High, Type 4
  notation-induced, a bare fraction carrying no visible geometric
  cause), MC-3 STANDARD-FORMULAS-ASSUMED-UNDERIVABLE (Moderate, Type 5
  instruction-induced, formulas drilled as given facts without the
  cross-sectional-integration derivation).

`math.geom` now **29/69**. No other domain touched. All five tracking
files updated in this same commit; re-validated 0 duplicates, 0
orphans, 0 Quality Gate 3 violations across all 197 mathematics
entries.

Full validation this batch: all 6 subject KG validators PASS (0
failures, 0 warnings each), `npx tsc --noEmit` clean, full vitest suite
2213 passed / 1 skipped (114 files), `npm run build` succeeded.


### Mathematics — math.geom Wave 9 (2026-07-27, autonomous loop iteration 43)

Loop resumed by explicit user instruction ("go") after the Batch 52
stop. Re-synced `main` first: 18 new commits on `origin/main` (an
unrelated parallel EOS v3 / kernel / CEKR runtime engineering track —
zero file overlap with `educational-brain/concepts/`), fast-forwarded
cleanly.

**Wave 9 candidates re-verified programmatically**: 20 ready. Authored
the 5 remaining Blueprint-grounded candidates — exactly the
coordinate-plane family Wave 8 deferred, plus `surface-area`:

- `math.geom.x-y-coordinates` (requires `coordinate-plane`; no unlocks,
  no cross-links, independence mode; mastery 0.95 → the domain's
  strictest 5/5 gate) — MC-1 COORDINATE-SWAP (Foundational, Type 4
  notation-induced, the parenthesized pair carrying no visual cue which
  slot is horizontal), MC-2 SIGN-IGNORED (Type 1 overgeneralization,
  unsigned counting-distance experience over-applied to signed
  coordinates), MC-3 ORIGIN-MISSING (Type 2 perceptual intuition, the
  grid corner as the perceptually salient start point).
- `math.geom.slope` (requires `coordinate-plane`; unlocks
  `line-equation`; cross-link `math.calc.derivative-intro`, Blueprint
  exists, cross-link probe mode — the secant-to-tangent P76) — MC-1
  DELTA-Y-OVER-DELTA-X-REVERSED (Foundational, Type 4 notation-induced,
  the visually symmetric "difference over difference" shape), MC-2
  SLOPE-DEPENDS-ON-POINT-CHOICE (High, Type 1 overgeneralization,
  point-pair-dependent measurements over-applied to the invariant
  ratio), MC-3 PERPENDICULAR-SLOPES-EQUAL (High, Type 5
  instruction-induced, the parallel rule garbling into "related pairs
  have equal slopes").
- `math.geom.transformations` (requires `coordinate-plane`; unlocks
  `math.linalg.linear-map`; cross-links `math.linalg.linear-map` +
  `math.abst.group-action`, Blueprint-declared independence mode — see
  the Curriculum Feedback finding below) — MC-1
  ALL-TRANSFORMATIONS-PRESERVE-CONGRUENCE (Foundational, Type 1
  overgeneralization, the isometry property absorbed into the whole
  category), MC-2 COMPOSITION-ASSUMED-COMMUTATIVE (Foundational, Type 6
  analogy overextension from commutative arithmetic), MC-3
  ROTATION-CENTER-ASSUMED-ORIGIN (Moderate, Type 5 instruction-induced,
  every taught formula being origin-centered).
- `math.geom.vectors-2d` (requires `coordinate-plane` +
  `math.arith.addition`; unlocks `vectors-3d` + `math.linalg.vector`;
  cross-link `math.linalg.vector`, Blueprint exists, cross-link probe
  mode — the ℝ²/Euclidean-norm P76) — MC-1 VECTOR-IS-A-POINT
  (Foundational, Type 4 notation-induced, the (a,b) notation shared
  between points and vectors), MC-2 MAGNITUDE-IS-COORDINATE-SUM (High,
  Type 1 overgeneralization, component-wise operations over-applied to
  the Pythagorean magnitude), MC-3 NEGATIVE-SCALAR-REVERSES-MAGNITUDE
  (Moderate, Type 1 overgeneralization, arithmetic sign-propagation
  over-applied to a structurally non-negative length).
- `math.geom.surface-area` (requires `area` + `solid-3d`; unlocks
  `math.calc.surface-area-integral` per the KG; cross-link the same
  target, no Blueprint, independence mode) — MC-1
  SURFACE-AREA-ASSUMED-NEW-TECHNIQUE (Foundational, Type 5
  instruction-induced, one standalone formula taught per solid hiding
  the shared face-summing structure), MC-2 MISSED-FACE-ASSUMED-MINOR-
  ERROR (High, Type 2 perceptual intuition, the dropped faces being
  exactly the perceptually hidden ones), MC-3
  SPHERE-ASSUMED-COMPUTABLE-BY-FACE-SUMMING (Moderate, Type 1
  overgeneralization, face-summing over-applied to a solid with no
  face list).

All 15 no-Blueprint Wave 9 candidates (`angle-types`, `triangle-types`,
`triangle-angle-sum`, `pythagorean-converse`, `triangle-centers`,
`parallelogram`, `trapezoid`, `regular-polygon`, `circle-parts`,
`circle-circumference`, `circle-area`, `circle-theorems`, `quadrants`,
`midpoint-formula`, `geometric-constructions`) deferred to future
waves.

**Two genuine Curriculum Feedback findings recorded (not fixed — no KG
or Blueprint file modified)**:
1. `math.geom.surface-area`'s Blueprint Component 0 states
   estimated_hours 5 and "unlocks: none"; the KG states 8 hours and
   unlocks `math.calc.surface-area-integral`. Resolved in the KG's
   favor per the standing rule; both divergences recorded in the
   entry's own Curriculum Feedback section.
2. `math.geom.transformations`'s Blueprint claims the
   `math.linalg.linear-map` and `math.abst.group-action` Blueprints
   "do not exist — verified via ls" and sets P76_mode = independence on
   that basis; both Blueprints NOW exist on disk (authored after that
   check). The Blueprint's own Component 7 anticipates a future
   revision adding a genuine cross-link probe. The EB entry follows
   the Blueprint's declared independence mode as written.

`math.geom` now **35/69**. No other domain touched. All five tracking
files updated in this same commit; re-validated 0 duplicates, 0
orphans, 0 Quality Gate 3 violations across all 203 mathematics
entries.

### Mathematics — math.geom Wave 10 part 1 (2026-07-27, autonomous loop iteration 43 resumption)

Loop resumed by explicit user instruction ("go") after a scheduled
120-second delay. Re-synced `origin/main` to confirm latest state; no
unrelated commits had landed since Wave 9 push.

**Wave 10 candidates identified**: the 15 no-Blueprint candidates
deferred from Wave 9 (`angle-types`, `triangle-types`,
`triangle-angle-sum`, `pythagorean-converse`, `triangle-centers`,
`parallelogram`, `trapezoid`, `regular-polygon`, `circle-parts`,
`circle-circumference`, `circle-area`, `circle-theorems`, `quadrants`,
`midpoint-formula`, `geometric-constructions`) are now ready. Authored
the first (angle-types):

- `math.geom.angle-types` (foundational/remember, mastery 0.95 [5/5]) —
  MC-1 CLASSIFICATION-READ-FROM-ARM-LENGTH-OR-ORIENTATION (Type 2
  perceptual intuition, the visual size of arms/ upright orientation
  over rotational opening), MC-2 BOUNDARY-VALUES-ABSORBED-INTO-RANGES
  (Type 5 instruction-induced, early teaching via prototypes without
  boundaries), MC-3 STRAIGHT-AND-REFLEX-NOT-COUNTED-AS-ANGLES (Type 1
  overgeneralization, the prototype "corner smaller than half turn"
  over-applied, excluding legitimate 180°+ cases).

No Blueprint exists; misconceptions authored via birth-taxonomy
diagnostic procedure. Mental models: clock-face, measure-band,
two-openings. Assessment: P76 skateboard-ramp transfer probe (classify
12°/36°, when does tripling change class?); P77 mastery gate (5 items).

`math.geom` now **35/69** (first of the 14 remaining Wave 10 part 1
candidates deferred). One tracking file updated (COVERAGE.md per the
workflow); remaining 4 files (INDEX, QUEUE, ROADMAP, QUALITY) also
updated; re-validated 0 duplicates, 0 orphans, 0 Quality Gate 3
violations across all 203 mathematics entries. Full suite 2574 passed/1
skipped, `npx tsc --noEmit` clean.

Continuing the same wave, authored the second candidate:

- `math.geom.triangle-types` (developing/remember, mastery 0.90) — no
  Blueprint exists. MC-1 VISUAL-APPEARANCE-OVERRIDES-MEASUREMENT (Type 2
  perceptual intuition, classifying by visual impression instead of
  measuring), MC-2 PROTOTYPE-BIAS (Type 5 instruction-induced, rejecting
  right/obtuse triangles as "not really" triangles because early
  examples were all acute), MC-3 ONE-CLASSIFICATION-SYSTEM-AT-A-TIME
  (Type 1 overgeneralization, treating by-sides and by-angles
  classification as alternatives rather than two independent systems),
  MC-4 RIGHT-ANGLE-AS-SPECIAL-MARKER-ERASES-SIDE-CLASSIFICATION (Type 5
  instruction-induced, fixating on the salient right angle and skipping
  the independent side-length check). Mental models: side-measurement
  toolkit, angle-measurement toolkit, the 2×3 classification grid.
  Teaching sequence builds both classification systems separately before
  the independence discovery ("can a triangle be both isosceles and
  obtuse?").

`math.geom` now **36/69**. All five tracking files updated in this same
commit; re-validated 0 duplicates, 0 orphans, 0 Quality Gate 3
violations across all 204 mathematics entries.

Continuing the same wave, authored the third candidate:

- `math.geom.triangle-angle-sum` (developing/understand, mastery 0.95) —
  no Blueprint exists. Requires both `math.geom.triangle` and
  `math.geom.parallel-lines` (the latter enabling the classical
  parallel-line proof construction). MC-1 SIZE-SCALES-ANGLE-SUM (Type 1
  overgeneralization, confusing linear/area scaling with angle-sum
  scaling), MC-2 MEASUREMENT-ERROR-UNDERMINES-EXACTNESS (Type 2
  perceptual intuition, treating the theorem as approximate because
  protractor measurement has error), MC-3 TYPE-SPECIFIC-RULE-NOT-
  GENERALIZED (Type 1 overgeneralization, not generalizing the pattern
  beyond familiar triangle types), MC-4 SETUP-ERROR-IN-ALGEBRAIC-
  APPLICATION (Type 4 notation-induced, dropping a term when three
  algebraic/numeric angle expressions are summed). Mental models:
  parallel-line proof construction, torn-corner demonstration, exterior
  rotation/pivot model. Unlocks `math.geom.polygon-angle-sum` (not yet
  authored — next natural downstream target).

`math.geom` now **37/69**. All five tracking files updated in this same
commit; re-validated 0 duplicates, 0 orphans, 0 Quality Gate 3
violations across all 205 mathematics entries. Full suite 2769 passed/1
skipped (post-merge with concurrent `iss-24`/engineering commits), `npx
tsc --noEmit` clean, mathematics KG PASS (908/908 reachable).

Continuing Wave 10 part 1, authored the fourth candidate:

- `math.geom.pythagorean-converse` (developing/apply, mastery 0.85) —
  no Blueprint exists (stated explicitly in Blueprint References section;
  references Euclid's Elements Book I Proposition 48, NCERT Grade 10,
  OpenStax Geometry). Requires `math.geom.pythagorean-theorem` only.
  No `unlocks` currently in the live KG. Core concept: the converse
  (if a²+b²=c² then the triangle is right-angled with hypotenuse c) is
  a SEPARATE theorem from the original — not automatically true — proven
  via SSS uniqueness. Full three-way classification tool: a²+b²=c² →
  right, a²+b²>c² → acute, a²+b²<c² → obtuse (c must always be the
  LONGEST side). MC-1 CONVERSE-AUTOMATICALLY-TRUE-BECAUSE-ORIGINAL-IS-
  TRUE (Type 6 analogy overextension — treating the logical reverse as
  self-evident without recognizing it requires separate proof; the
  square/rectangle false-converse counterexample is the repair anchor),
  MC-2 WRONG-SIDE-DESIGNATED-AS-C (Type 4 notation-induced — using a
  non-longest side as c, producing nonsensical results), MC-3 EQUALITY-
  ONLY-NO-ACUTE-OBTUSE-EXTENSION (Type 5 instruction-induced — knowing
  only the right-triangle test, stopping at "not equal" without
  classifying acute vs. obtuse), MC-4 SKIPS-TRIANGLE-INEQUALITY-
  PRECHECK (Type 5 instruction-induced — applying the converse test to
  side lengths that cannot form a triangle, without checking the
  Triangle Inequality first). Mental models: the diagnostic-test model
  (like a lab test checking for a specific condition), the three-outcome
  number line (a²+b² vs c²: less→obtuse, equal→right, greater→acute),
  the construction-and-uniqueness argument (SSS uniqueness means if a
  right triangle with those lengths exists, the given triangle MUST be
  it).

`math.geom` now **38/69**. All six tracking files (INDEX, QUEUE,
ROADMAP, QUALITY, COVERAGE, CLAUDE.md) updated; mathematics 205 → 206.
Remaining Wave 10 part 1 candidates (11): `triangle-centers`,
`parallelogram`, `trapezoid`, `regular-polygon`, `circle-parts`,
`circle-circumference`, `circle-area`, `circle-theorems`, `quadrants`,
`midpoint-formula`, `geometric-constructions`.

Continuing Wave 10 part 1, authored the fifth candidate:

- `math.geom.triangle-centers` (proficient/apply, mastery 0.75) — no
  Blueprint exists (stated explicitly; references NCERT Grade 9,
  AoPS Geometry). Requires `math.geom.triangle` and
  `math.geom.congruent-triangles`. No `unlocks` in the live KG.
  Four classical centers: centroid G (medians, always inside, 2:1
  ratio, center of mass), circumcenter O (perpendicular bisectors,
  equidistant from vertices, inside/on/outside depending on
  acute/right/obtuse), incenter I (angle bisectors, equidistant from
  sides, always inside), orthocenter H (altitudes, inside/vertex/
  outside for acute/right/obtuse). MC-1 BOTH-EQUIDISTANT-CENTERS-
  CONFUSED (Type 1 overgeneralization — swapping circumcenter/incenter
  equidistance; repair via circumscribed→vertices / inscribed→sides
  word-chain), MC-2 ALL-CENTERS-ALWAYS-INSIDE (Type 5 instruction-
  induced — expecting every center to lie inside; repair via explicit
  obtuse-triangle construction demo), MC-3 ALTITUDE-MEDIAN-CONFLATION
  (Type 4 notation-induced — confusing altitude and median as both
  going from vertex to opposite side; repair via ⊥ mark vs. M-midpoint
  mark habit), MC-4 NAME-CENTER-MISMATCH-UNDER-RECALL (Type 1
  overgeneralization — scrambling names and constructions under
  retrieval pressure; repair via one-sentence mnemonics for all four).

`math.geom` now **39/69**. Mathematics 206 → 207.
Remaining Wave 10 part 1 candidates (10): `parallelogram`, `trapezoid`,
`regular-polygon`, `circle-parts`, `circle-circumference`, `circle-area`,
`circle-theorems`, `quadrants`, `midpoint-formula`,
`geometric-constructions`.

Continuing Wave 10 part 1, authored three more candidates as a batch:

- `math.geom.parallelogram` (developing/understand, mastery 0.85) — no
  Blueprint exists (stated explicitly; references NCERT Grade 9, Common
  Core Geometry). Requires `math.geom.quadrilateral`. No `unlocks` in
  the live KG. Core properties derived from two pairs of parallel sides:
  opposite sides equal, opposite angles equal, consecutive angles
  supplementary, diagonals bisect each other (NOT equal). Area A = base
  × height (perpendicular height, not the slant side). Rectangles,
  rhombuses, and squares ARE special parallelograms (inherit all
  properties). MC-1 SLANT-SIDE-AS-HEIGHT (Type 5 instruction-induced —
  confusing the oblique side with the perpendicular height in area
  computation), MC-2 OPPOSITE-ANGLES-SUPPLEMENTARY (Type 5 instruction-
  induced — believing opposite angles are supplementary rather than equal,
  likely a confusion with consecutive-angle rule), MC-3 DIAGONALS-EQUAL-
  IN-PARALLELOGRAM (Type 1 overgeneralization from rectangles), MC-4
  SPECIAL-CASES-NOT-INHERITED (Type 1 overgeneralization — failing to
  recognize that rectangles/rhombuses/squares are subtypes that share all
  parallelogram properties).

- `math.geom.trapezoid` (developing/apply, mastery 0.80) — no Blueprint
  exists (stated explicitly; references NCERT Grade 8, Common Core
  Geometry). Requires `math.geom.quadrilateral`. No `unlocks` in the
  live KG. Exactly one pair of parallel sides (the bases b₁ and b₂);
  non-parallel sides are the legs. Area A = ½(b₁+b₂)×h where h is the
  perpendicular height. Isosceles trapezoid: equal legs, equal base
  angles, equal diagonals. Inclusive vs. exclusive definition convention
  documented (inclusive treats parallelograms as degenerate trapezoids;
  exclusive requires exactly one pair). MC-1 LEG-AS-HEIGHT (Type 5
  instruction-induced — using the slant leg length as h), MC-2 ONE-BASE-
  ONLY (Type 3 language contamination — "base" evokes only the bottom
  edge, missing the second parallel side in the area formula), MC-3
  ALL-TRAPEZOIDS-ARE-ISOSCELES (Type 5 instruction-induced — textbook
  diagrams overwhelmingly show isosceles trapezoids), MC-4 PARALLELOGRAM-
  TRAPEZOID-CATEGORY-CONFUSION (Type 1 overgeneralization — incorrect
  inclusion or exclusion depending on which convention was taught).

- `math.geom.regular-polygon` (developing/understand, mastery 0.85) — no
  Blueprint exists (stated explicitly; references NCERT Grade 8, OpenStax
  Geometry, AoPS Geometry). Requires `math.geom.polygon`. No `unlocks`
  in the live KG; cross-link to `math.geom.circle`. Both conditions
  required simultaneously: all sides equal AND all angles equal. Interior
  angle = (n−2)×180°/n (derived from polygon angle sum); exterior angle =
  360°/n (derived from full-rotation model); interior + exterior = 180°
  at each vertex. All vertices lie on a circumscribed circle. As n→∞,
  the polygon approaches a circle. MC-1 ONE-CONDITION-SUFFICIENT (Type 5
  instruction-induced — accepting equilateral-only like a rhombus, or
  equiangular-only like a rectangle, as "regular"), MC-2 INTERIOR-
  EXTERIOR-ANGLE-SWAP (Type 4 notation-induced — applying 360°/n to the
  interior angle question), MC-3 INTERIOR-ANGLE-AS-180/n (Type 5
  instruction-induced — dropping the (n−2) factor, computing 180°/n
  instead of (n−2)×180°/n), MC-4 EXTERIOR-ANGLE-NOT-SEEN-AS-SUPPLEMENT
  (Type 1 overgeneralization — treating the two angle formulas as
  unrelated rather than supplementary pairs at each vertex).

`math.geom` now **42/69**. Mathematics 207 → 210.
Remaining Wave 10 part 1 candidates (7): `circle-parts`,
`circle-circumference`, `circle-area`, `circle-theorems`, `quadrants`,
`midpoint-formula`, `geometric-constructions`.

---

### Batch 55 — math.geom Wave 10 part 2 (2026-07-28, autonomous loop,
Wave 10 final)

All 7 remaining no-Blueprint Wave 10 candidates, all via birth-taxonomy
diagnostic procedure. No Blueprint exists for any of the 7; Blueprint
References section in each states this explicitly per Quality Gate 2.

- **`math.geom.circle-parts`** (developing/remember, mastery 0.90, 4 hr)
  — radius, diameter (= 2r, longest chord), chord, arc (minor vs major),
  sector ("pie slice": 2 radii + arc), segment (chord + arc, no radii).
  4 misconceptions: MC-1 SECTOR-SEGMENT-SWAP (Type 1), MC-2
  DIAMETER-RADIUS-CONFUSION-IN-FORMULA (Type 5), MC-3
  CHORD-MEANS-DIAMETER (Type 3), MC-4 ARC-MEASURE-CONFUSION (Type 4).

- **`math.geom.circle-circumference`** (developing/apply, mastery 0.90,
  3 hr) — C = 2πr = πd; π = C/d universally; exact (keep π symbol) vs
  approximate (compute decimal); estimation C ≈ 3d. 4 misconceptions:
  MC-1 WRONG-FORMULA-VARIANT (Type 5 — plugging diameter into C=2πr
  giving 2× answer), MC-2 π-IS-EXACTLY-22/7-OR-3 (Type 5), MC-3
  CIRCUMFERENCE-AREA-FORMULA-SWAP (Type 1), MC-4
  EXACT-VS-APPROXIMATE-CONTEXT-CONFUSION (Type 4).

- **`math.geom.circle-area`** (developing/apply, mastery 0.90, 3 hr) —
  A = πr²; ring-unrolling derivation (base=2πr, height=r,
  area=½×2πr×r=πr²); area scales as r² (quadratic — doubling r
  quadruples A); estimation A ≈ 3r²; uses radius not diameter. 4
  misconceptions: MC-1 DIAMETER-IN-AREA-FORMULA (Type 5 — giving 4×
  answer), MC-2 AREA-CIRCUMFERENCE-FORMULA-SWAP (Type 1), MC-3
  RADIUS-NOT-SQUARED (Type 5 — computing πr instead of πr²), MC-4
  AREA-SCALES-LINEARLY-WITH-RADIUS (Type 1 — doubling r doubles A).

- **`math.geom.circle-theorems`** (proficient/apply, mastery 0.80,
  10 hr) — 5 core theorems: (1) inscribed angle = ½ central angle on
  same arc; (2) inscribed angles on same arc equal; (3) angle in
  semicircle = 90°; (4) tangent ⊥ radius at tangency point; (5) equal
  chords equidistant from centre; isosceles triangle factory (draw all
  radii first). 4 misconceptions: MC-1
  CENTRAL-ANGLE-HALVED-WHEN-NOT-INSCRIBED (Type 5), MC-2
  SEMICIRCLE-RULE-OVERGENERALISED (Type 1), MC-3
  MISSING-THE-ISOSCELES-TRIANGLE (Type 2 perceptual), MC-4
  TANGENT-SECANT-CONFUSION (Type 4).

- **`math.geom.quadrants`** (elementary/remember, mastery 0.95, 1 hr)
  — I(++), II(−+), III(−−), IV(+−); counter-clockwise from upper-right;
  axis points belong to no quadrant; Roman numeral convention. 4
  misconceptions: MC-1 CLOCKWISE-LABELLING (Type 5), MC-2
  QUADRANT-II-IV-SIGN-SWAP (Type 1), MC-3
  AXES-POINTS-PLACED-IN-QUADRANTS (Type 5), MC-4
  ARABIC-VS-ROMAN-NUMERAL-CONFUSION (Type 4).

- **`math.geom.midpoint-formula`** (intermediate/apply, mastery 0.90,
  2 hr) — M = ((x₁+x₂)/2, (y₁+y₂)/2); two separate independent
  averages; inverse: x₂ = 2M_x − x₁ (double then subtract);
  verification by distance check. 4 misconceptions: MC-1
  MIXED-COORDINATE-AVERAGE (Type 5), MC-2
  MIDPOINT-DISTANCE-FORMULA-CONFUSION (Type 1), MC-3
  INVERSE-ENDPOINT-BY-HALVING (Type 5), MC-4 LABEL-ASSIGNMENT-ERROR
  (Type 4).

- **`math.geom.geometric-constructions`** (intermediate/apply, mastery
  0.75, 10 hr) — compass (equal lengths only) + unmarked straightedge
  (lines through known points only); 6 fundamental constructions;
  equidistance foundation; SSS-congruence for angle bisector;
  impossibility results (trisection, squaring the circle, doubling the
  cube — mathematical not practical impossibility, Gauss-Wantzel
  theorem). cross_link: `math.abst.galois-theory`. 4 misconceptions:
  MC-1 MEASUREMENT-AS-CONSTRUCTION (Type 5), MC-2 ARCS-ERASED (Type 5),
  MC-3 WRONG-JUSTIFICATION-FOR-BISECTOR (Type 1), MC-4
  IMPOSSIBILITY-RESULTS-DISBELIEVED (Type 6 analogy overextension).

`math.geom` now **49/69**. Mathematics 210 → 217. Wave 10 is complete.
20 concepts remain in `math.geom` — Wave 11 candidates to be computed
fresh from the live KG at the next iteration.

### Batch 56 — math.geom Wave 11 (2026-07-28, autonomous loop)

7 concepts authored in strict topological order (Wave 11 — all prerequisites
satisfied by the 49 `math.geom` EB entries authored through Wave 10,
verified programmatically via a Node.js script against the live KG's
`requires` edges). 2 had existing Blueprints reused by reference; 5 had none
— all 5 authored via the birth-taxonomy diagnostic procedure, with Blueprint
References section in each stating the absence explicitly per Quality Gate 2.

- **`math.geom.line-equation`** (proficient/apply, mastery 0.85, 8 hr) —
  Blueprint-grounded (PACKAGE_READY). Three equivalent forms: slope-intercept
  y=mx+b, point-slope y−y₁=m(x−x₁), standard ax+by=c; form-selection
  principle (use the form that matches what you're given, not always
  slope-intercept); intercept extraction (set x=0 or y=0); parallel (same m)
  vs perpendicular (m₁·m₂=−1). 3 misconceptions: MC-1
  POINT-SLOPE-FORM-AVOIDED (Type 1 — overgeneralizing slope-intercept as
  always the start), MC-2 INTERCEPTS-EXTRACTED-VIA-CONVERSION-ONLY (Type 1
  — converting before reading intercepts from standard form), MC-3
  FORMS-TREATED-AS-DIFFERENT-LINES (Type 1 — different forms seen as
  different mathematical objects).

- **`math.geom.vectors-3d`** (proficient/apply, mastery 0.80, 6 hr) —
  Blueprint-grounded (PACKAGE_READY). 3D extension of 2D vector ops: triples
  (a,b,c), magnitude √(a²+b²+c²); dot product (scalar, u·v=Σuᵢvᵢ,
  u·v=|u||v|cosθ); cross product (anticommutative vector, u×v=−v×u,
  right-hand rule); standard basis i,j,k. Scope: defers full computational
  treatment to child EB entries (`math.geom.dot-product`,
  `math.geom.cross-product`). 3 misconceptions: MC-1 Z-AXIS-IS-DECORATIVE
  (Type 2 — perceptual; z invisible on flat page), MC-2
  CROSS-PRODUCT-IS-COMMUTATIVE (Type 6 — analogy overextension from dot
  product commutativity), MC-3 DOT-PRODUCT-IS-A-VECTOR (Type 1 —
  overgeneralizing that vector ops always produce vectors).

- **`math.geom.polygon-angle-sum`** (developing/apply, mastery 0.85, 4 hr) —
  No Blueprint. (n−2)×180° via triangulation from one vertex; regular polygon
  each angle = (n−2)×180°/n; exterior angle sum always 360°; applies to
  convex polygons. 4 misconceptions: MC-1 N-TIMES-180-ERROR (Type 5 —
  "triangulate" instruction without n−2 grounding), MC-2
  FORMULA-FOR-EACH-ANGLE-APPLIED-TO-IRREGULAR-POLYGON (Type 1 — dividing by
  n for non-regular), MC-3 EXTERIOR-INTERIOR-CONFUSION (Type 5 — both
  introduced simultaneously with different summation rules), MC-4
  APPLYING-TO-CONCAVE-POLYGONS-UNCHANGED (Type 1 — overgeneralizing from
  convex).

- **`math.geom.platonic-solids`** (proficient/understand, mastery 0.75, 5 hr)
  — No Blueprint. Exactly 5 convex regular polyhedra: tetrahedron (4T/4V/6E),
  cube (6F/8V/12E), octahedron (8F/6V/12E), dodecahedron (12F/20V/30E),
  icosahedron (20F/12V/30E); Euler's formula V−E+F=2; why exactly 5 (vertex
  angle budget <360°); dual pairs. 4 misconceptions: MC-1
  CUBE-IS-NOT-PLATONIC-BECAUSE-NOT-TRIANGLES (Type 3 — language
  contamination), MC-2 RECTANGULAR-BOX-IS-ALSO-PLATONIC (Type 2 —
  perceptual), MC-3 EULER-FORMULA-SIGN-CONFUSION (Type 5 — memorization
  error), MC-4 DODECAHEDRON-ICOSAHEDRON-FACE-COUNT-SWAP (Type 4 — Greek
  prefix unfamiliar).

- **`math.geom.translation`** (proficient/apply, mastery 0.85, 2 hr) —
  No Blueprint. (x,y)→(x+h,y+k); same vector (h,k) applied to every point;
  no fixed points (except identity); isometry; orientation preserved;
  composition commutative (translation vectors add). 3 misconceptions: MC-1
  INCONSISTENT-SHIFT-PER-VERTEX (Type 2 — arithmetic errors produce varying
  shifts that still "look close"), MC-2 DIRECTION-SIGN-ERROR (Type 5 —
  "3 left" → student writes +3 instead of −3), MC-3 TRANSLATION-AS-ROTATION
  (Type 1 — diagonal movement confused with rotation).

- **`math.geom.reflection`** (proficient/apply, mastery 0.85, 3 hr) —
  No Blueprint. Mirror line = perpendicular bisector of PP′; standard rules
  (x-axis: y→−y; y-axis: x→−x; y=x: swap; y=−x: swap+negate; x=a: x→2a−x;
  y=b: y→2b−y); isometry; orientation REVERSED (only rigid motion to reverse
  it); finding mirror line = perpendicular bisector of any pre-image/image
  pair. 4 misconceptions: MC-1 Y-EQUALS-X-REFLECTION-NEGATES-COORDINATES
  (Type 5 — confusing y=x rule with y=−x rule), MC-2
  PERPENDICULAR-DISTANCE-NOT-MAINTAINED (Type 2 — eyeballing instead of
  constructing), MC-3 REFLECTION-PRESERVES-ORIENTATION (Type 1 —
  overgeneralizing orientation preservation from other transformations), MC-4
  REFLECTION-OVER-Y-AXIS-NEGATES-Y-COORDINATE (Type 5 — swapping which axis
  rule applies to which coordinate).

- **`math.geom.dilation`** (proficient/apply, mastery 0.80, 3 hr) —
  No Blueprint. CP′=k×CP; center-at-origin rule (x,y)→(kx,ky); general
  center rule (cx+k(x−cx), cy+k(y−cy)); preserves angles+shape (similarity);
  lengths scale by |k|; area scales by k² (quadratic); k=1 identity, k=−1
  point reflection, |k|>1 enlargement, 0<|k|<1 reduction. 4 misconceptions:
  MC-1 AREA-SCALES-BY-K-NOT-K² (Type 1 — linearizing quadratic area
  scaling), MC-2 CENTER-ALWAYS-AT-ORIGIN (Type 5 — instruction-induced from
  origin-only examples), MC-3 NEGATIVE-SCALE-FACTOR-MEANS-REFLECTION (Type 1
  — ignoring the scaling component of negative k), MC-4
  DILATION-CHANGES-ANGLE-MEASURES (Type 1 — overgeneralizing size change to
  angle change).

`math.geom` now **56/69**. Mathematics 217 → 224. Wave 11 is complete. 13
concepts remain in `math.geom`; Wave 12 has 1 immediately unlocked candidate
(`cross-product`), the remaining 12 are blocked on `math.alg` or `math.trig`
prerequisites not yet in the EB. All six tracking files updated in the same
commit; re-validated 0 duplicates, 0 orphans, 0 broken KG references, 0
invalid Blueprint references across all 224 mathematics entries.

### Batch — English level-1 (2026-08-04)

**Explicit subject-scope instruction**: the owner directed this session
specifically at English ("English is now the active implementation
subject on THIS account... Mathematics is being implemented on another
account... do NOT duplicate work across accounts"), overriding the
global cross-subject interleaving order for this batch only — the same
precedent as the 2026-07-22 Physics Wave 6 exception recorded earlier in
this file. Mathematics, Physics, and Chemistry were not touched.

Authored the 3 concepts at English's dependency level 1 — every concept
whose sole prerequisite is one of the two already-`READY` zero-
prerequisite entry nodes, verified programmatically against the live
English KG's `requires` edges (matches `AUTHORING_QUEUE.md`'s own
level-1 row set exactly): `eng.phonics.alphabet-recognition` (requires
`eng.phonics.print-concepts`), `eng.phonics.rhyming` and
`eng.phonetics.speech-sounds-overview` (both require
`eng.phonics.phonemic-awareness`). All 3 had existing Blueprints, read
in full and reused by reference (misconceptions, concrete anchors,
worked examples, mastery probe sets, session architecture) per the
Standard's ownership boundary — no Blueprint content restated. All 3
also had existing seeded runtime assets discovered in
`authoredSeedAssets.ts` (`ALPHA`, `RHYME`, `SNDO` constant blocks,
sourced from the Blueprints directly since no EB entry existed at
seeding time) — `eng.phonics.rhyming` is the one exception, confirmed to
have zero seeded assets, recorded honestly in its own Runtime Asset
References section rather than assumed present.

**First English entries authored to the full 21-section
`EDUCATIONAL_BRAIN_STANDARD.md`** (the 3 pre-existing English entries
use the earlier 15-section `TEMPLATE.md` format, per the Standard's own
§6 migration note — not reconciled retroactively this batch, consistent
with that note's explicit deferral). One new misconception per concept
was authored via the birth-taxonomy diagnostic procedure, beyond what
each Blueprint already documents, each verified genuinely distinct in
mechanism and scope from both its own Blueprint's misconceptions and
every other misconception already in the tree:
`MC-NONMIRROR-SHAPE-CONFUSION` (alphabet-recognition, Type 2 —
n/h/m-style stroke-count confusion, distinct from the Blueprint's
mirror-orientation b/d/p/q confusion), `MC-SYLLABLE-COUNT-MUST-MATCH`
(rhyming, Type 5 — an over-restrictive length constraint layered onto an
otherwise-correct ending check), `MC-VOICING-IS-LOUDNESS`
(speech-sounds-overview, Type 2 — perceived loudness substituted for the
vocal-cord-vibration mechanism TA-2 targets).

Two deliberately different Discovery Questions designs were argued
across the batch, demonstrating the choice is genuinely concept-driven
rather than defaulted: `alphabet-recognition` argues direct instruction
(pure arbitrary convention — names, case, sequence order — nothing to
discover), while `rhyming` and `speech-sounds-overview` each argue a
full 6-step discovery design, but for two different reasons —
`rhyming`'s discovery target is an inducible RULE (match the ending
sound), while `speech-sounds-overview`'s is an inducible EMPIRICAL FACT
about English specifically (sounds and letters do not correspond
one-to-one), a distinction made explicit in the latter's own Discovery
Questions section rather than treating "discovery" as one undifferentiated
choice.

`english` 3/216 → **6/216**. Level-2 candidates already visible in
`AUTHORING_QUEUE.md` (`eng.phonics.blending-segmenting`,
`eng.phonetics.articulation-organs`, `eng.writing.handwriting-and-
formation`) but deliberately NOT started this batch, per the standing
"one small bounded batch per turn" discipline and this task's explicit
"stop after one logical batch" instruction. All 8 `QUALITY_GATES.md`
gates verified programmatically for all 3 entries (KG existence,
Blueprint existence, exact 21-heading match in order, cross-link
resolution, non-empty Curriculum Feedback, dated Version History); full
corpus re-validated after this batch: 654 total EB entries, 0 orphans, 0
duplicate filenames across all 6 subjects. `EDUCATIONAL_BRAIN_INDEX.md`,
`ROADMAP.md`, and `QUALITY.md` updated in the same batch. No KG,
Blueprint, or runtime file was modified.

### Batch 25 — English Educational Brain level-25 frontier (2026-08-11, autonomous /loop)
Authored 4 concepts computed programmatically as the "ready now" frontier against the true
201-concept English baseline (post-Batch-24): `eng.composition.counterargument-and-rebuttal`,
`eng.composition.logical-fallacies`, `eng.composition.figurative-language-in-composition`,
`eng.composition.rhetorical-analysis`. All 4 had existing Blueprints, read in full and reused by
reference (Misconception Registers, Concrete Anchors, Worked Examples, Mastery Probe Sets,
Session Architecture) per the Standard's ownership boundary. Each entry authored 2 misconceptions
via the birth-taxonomy diagnostic procedure grounded directly in its Blueprint's own Misconception
Register content. `english` 197/216 → **201/216**. Newly-unlocked level-26 frontier (computed):
`eng.composition.style-voice-and-tone`, `eng.composition.persuasive-techniques`,
`eng.composition.comparative-essay-writing`, `eng.composition.research-paper-writing` —
deliberately NOT started this batch. All 5 tracking files updated in the same batch. No KG,
Blueprint, or runtime file was modified.

### Batch 26 — English Educational Brain level-26 frontier (2026-08-11, autonomous /loop)
Authored 4 concepts computed programmatically as the "ready now" frontier against the true
201-concept English baseline (post-Batch-25): `eng.composition.style-voice-and-tone`,
`eng.composition.persuasive-techniques`, `eng.composition.comparative-essay-writing`,
`eng.composition.research-paper-writing`. All 4 had existing Blueprints, read in full and reused
by reference (Misconception Registers, Concrete Anchors, Worked Examples, Mastery Probe Sets,
Session Architecture) per the Standard's ownership boundary. Each entry authored 2 misconceptions
via the birth-taxonomy diagnostic procedure grounded directly in its Blueprint's own Misconception
Register content. `english` 201/216 → **205/216**. Newly-unlocked level-27 frontier (computed):
`eng.composition.academic-writing-conventions` (single concept, unblocked by
`research-paper-writing`) — deliberately NOT started this batch. All 5 tracking files updated in
the same batch. No KG, Blueprint, or runtime file was modified.

### Batch 27 — English Educational Brain level-27 frontier (2026-08-11, autonomous /loop)
Authored 1 concept computed programmatically as the "ready now" frontier against the true
205-concept English baseline (post-Batch-26): `eng.composition.academic-writing-conventions`. Had
an existing Blueprint, read in full and reused by reference (Misconception Register, Concrete
Anchor, Worked Examples, Mastery Probe Set, Session Architecture) per the Standard's ownership
boundary. Authored 2 misconceptions via the birth-taxonomy diagnostic procedure grounded directly
in the Blueprint's own Misconception Register content. `english` 205/216 → **206/216**.
Newly-unlocked level-28 frontier (computed, 3 concepts): `eng.composition.plagiarism-and-citation-
ethics`, `eng.composition.editing-for-style`, `eng.communication.academic-writing-advanced` —
deliberately NOT started this batch. All 5 tracking files updated in the same batch. No KG,
Blueprint, or runtime file was modified.

### Batch 28 — English Educational Brain level-28 frontier (2026-08-11, autonomous /loop)
Authored 3 concepts computed programmatically as the "ready now" frontier against the true
206-concept English baseline (post-Batch-27): `eng.composition.plagiarism-and-citation-ethics`,
`eng.composition.editing-for-style` (dual prerequisite: `eng.composition.style-voice-and-tone` +
`eng.composition.academic-writing-conventions`), `eng.communication.academic-writing-advanced`
(the first `eng.communication.*` entry authored this program, a 4-way unlock fan-out to
research-methodology-writing/technical-writing/business-writing/editing-for-publication verified
directly against the live KG). All 3 had existing Blueprints, read in full and reused by reference
(Misconception Registers, Concrete Anchors, Worked Examples, Mastery Probe Sets, Session
Architecture) per the Standard's ownership boundary. Each entry authored 2 misconceptions via the
birth-taxonomy diagnostic procedure grounded directly in its Blueprint's own Misconception
Register content. `english` 206/216 → **209/216**. Newly-unlocked level-29 frontier (computed, 3
concepts): `eng.communication.research-methodology-writing`, `eng.communication.technical-writing`,
`eng.communication.business-writing` — deliberately NOT started this batch. All 5 tracking files
updated in the same batch. No KG, Blueprint, or runtime file was modified.

### Batch 29 — English Educational Brain level-29 frontier (2026-08-11, autonomous /loop)
Authored 3 concepts computed programmatically as the "ready now" frontier against the true
209-concept English baseline (post-Batch-28): `eng.communication.research-methodology-writing`,
`eng.communication.technical-writing` (cross-link `eng.writing.expository-writing`),
`eng.communication.business-writing`. All 3 had existing Blueprints, read in full and reused by
reference (Misconception Registers, Concrete Anchors, Worked Examples, Mastery Probe Sets, Session
Architecture) per the Standard's ownership boundary. Each entry authored 2 misconceptions via the
birth-taxonomy diagnostic procedure grounded directly in its Blueprint's own Misconception Register
content. `english` 209/216 → **212/216**. Only 4 concepts remain. Newly-unlocked level-30 frontier
(computed, 3 concepts): `eng.communication.professional-communication`,
`eng.communication.presentation-design`, `eng.communication.editing-for-publication` —
deliberately NOT started this batch. All 5 tracking files updated in the same batch. No KG,
Blueprint, or runtime file was modified.

### Batch 30 — English Educational Brain FINAL BATCH: 216/216 COMPLETE (2026-08-11, autonomous /loop)
Authored the final 4 concepts computed programmatically as the "ready now" frontier against the
true 212-concept English baseline (post-Batch-29): `eng.communication.professional-communication`
(dual prerequisite: `eng.communication.business-writing` + `eng.speaking.presentation-skills`),
`eng.communication.presentation-design` (dual prerequisite: `eng.speaking.presentation-skills` +
`eng.communication.technical-writing`), `eng.communication.editing-for-publication` (dual
prerequisite: `eng.communication.research-methodology-writing` +
`eng.communication.academic-writing-advanced`), and `eng.communication.negotiation-language`
(cross-link `eng.composition.counterargument-and-rebuttal`) — the English Knowledge Graph's final
terminal node, unblocked only after `professional-communication` was authored in this same batch.
All 4 had existing Blueprints, read in full and reused by reference (Misconception Registers,
Concrete Anchors, Worked Examples, Mastery Probe Sets, Session Architecture) per the Standard's
ownership boundary. Each entry authored 2 misconceptions via the birth-taxonomy diagnostic
procedure grounded directly in its Blueprint's own Misconception Register content.
**`english` 212/216 → 216/216 — DOMAIN/SUBJECT COMPLETE.** Verified programmatically: 0 concepts
missing an Educational Brain entry across the entire 216-concept English KG. This closes out the
multi-session English Educational Brain authoring program (Batches 1-30) started 2026-07-10. All 5
tracking files updated in the same batch; no KG, Blueprint, or runtime file was modified.

### Batch 57 — math.alg Wave 3 (2026-09-11, Mathematics Educational Brain completion campaign)

**Bookkeeping note found on session start, not fixed retroactively**: this file's Delivery
history jumps directly from Batch 56 (`math.geom` Wave 11, 2026-07-28) to English Batch 1
(2026-08-04) with no narrative entries for the `math.nt` domain's certifying final 8 concepts or
for `math.alg` Waves 1-2 (11 + 1 concepts), even though `CLAUDE.md`'s "Mathematics Educational
Brain serving-asset campaign" and "Mathematics readiness build" sections and the live repository
state confirm all of that work exists and is genuine (verified via `scripts/math/state.ts`: 0
orphan EB files, 0 duplicate EB files). Those entries were apparently never appended to this
specific file. Reconstructing their full per-concept narrative retroactively is out of scope for
this batch (the authoritative record for that work is git commit history and `CLAUDE.md`); flagged
here rather than silently left unexplained, per this program's own "record genuine findings, never
hide them" convention. This batch's own record below is complete and current.

Verified current state first, per this campaign's own instruction, rather than trusting any
baseline figure: `npx tsx scripts/math/state.ts` reported KG 908/908, Educational Brain 257/908
(not the 256 recorded in the task's own stated baseline), math.alg 12/59 (not 11/59 — the file
above had not been corrected for Wave 2's `like-terms` addition). Computed the topologically-ready
`math.alg` frontier programmatically against the live KG and the live EB directory: exactly 3
concepts had every prerequisite already authored — `math.alg.simplification` (requires
`like-terms`, `expression`, both present), `math.alg.polynomial-operations` (requires `polynomial`,
`like-terms`, both present), `math.alg.radicals` (requires `math.arith.square-roots`,
`math.alg.exponent-rules`, both present in `math.arith`/`math.alg` respectively).

All 3 had existing Blueprints (`docs/curriculum/blueprints/math.alg.{simplification,
polynomial-operations,radicals}.md`), read in full and reused by reference per the Standard's
ownership boundary (Misconception Registries, worked-example structure, session-architecture
component numbering) — no worked example, mastery-probe item bank, or turn-by-turn script was
restated, only cited. Each entry authored its own birth-type classification for every
Blueprint-registered misconception (not present in the Blueprints themselves, which are
schema/structure documents without pedagogical-science classification):

- **`math.alg.simplification`** (developing/apply, mastery 0.85, 5 hr) — bracket expansion via the
  distributive law, sign management under a negative outside factor, then `like-terms` collection
  on the expanded result. 3 misconceptions: MC-1 DISTRIBUTES-INCORRECTLY (Type 1 —
  overgeneralizing single-term multiplication a(b)=ab, where there is only ever one product, to
  the multi-term case), MC-2 SIGN-FLIPS-MISSED (Type 4 — notation-induced; a leading minus sign is
  read as binding only to the adjacent term rather than to the whole bracket), MC-3
  UNLIKE-TERMS-COMBINED-AFTER-EXPANSION (Type 1 — `like-terms` MC-1's own merge reflex resurfacing
  once expansion produces several terms that look like an unfinished sum again).
- **`math.alg.polynomial-operations`** (proficient/apply, mastery 0.85, 8 hr) — addition/
  subtraction by degree-matched term collection, subtraction as addition of the negative,
  multiplication as full term-by-term distribution with FOIL demoted to a named special case, and
  degree arithmetic (deg(p+q)≤max, deg(p·q)=sum) as a free structural consequence rather than a
  separately memorised rule. 3 misconceptions: MC-1 UNLIKE-TERMS-COMBINE (Type 1 — the same
  `like-terms` MC-1 reflex at polynomial scale), MC-2 SUBTRACTION-DISTRIBUTES-FIRST-TERM-ONLY
  (Type 4 — notation-induced, the polynomial-scale recurrence of `simplification` MC-2), MC-3
  FOIL-FOR-ALL-PRODUCTS (Type 5 — instruction-induced; FOIL taught as a standalone named method
  rather than as the 2×2 special case of general distribution, leaving no fallback once a factor
  exceeds two terms).
- **`math.alg.radicals`** (proficient/apply, mastery 0.80, 8 hr) — simplification by extracting the
  largest perfect n-th-power factor (the product rule for exponents restated in radical notation),
  rationalizing single-radical and binomial (conjugate, difference-of-squares) denominators, and
  combining like radicals only when both index and radicand match. 3 misconceptions: MC-1
  UNLIKE-RADICALS-COMBINED-INCORRECTLY (Type 1 — overgeneralizing `like-terms`' own combination
  notation, since a√r+b√r visually echoes ax+bx), MC-2 RATIONALIZATION-SKIPPED-FOR-BINOMIAL-
  DENOMINATOR (Type 1 — applying the single-radical-term method unmodified to a binomial
  denominator, where it silently fails to eliminate the radical), MC-3
  PERFECT-POWER-FACTOR-NOT-FULLY-EXTRACTED (Type 1 — treating "found a perfect-power factor" as a
  stopping condition rather than "found the *largest*").

`math.alg` **12/59 → 15/59**, still IN PROGRESS. Mathematics **257/908 → 260/908**. Topologically
next-ready `math.alg` candidates were re-verified programmatically after this batch and NOT yet
computed for a Wave 4 selection — deferred to the next batch per this program's own "one bounded
batch, then re-derive the frontier fresh" discipline (a concept newly authored in this batch may
unlock new candidates that a pre-computed list would miss). All five tracking files
(`EDUCATIONAL_BRAIN_INDEX.md` — see note below, `ROADMAP.md`, `QUALITY.md` — see note below,
`COVERAGE.md`, `VALIDATION_REPORT.md` — not touched, no validation-relevant finding this batch)
were reviewed; `ROADMAP.md`'s Section 1 (totals) and Section 2 (mathematics per-domain table) were
regenerated from source and corrected (they were themselves stale, still showing 256/908 and
math.alg 11/59). `EDUCATIONAL_BRAIN_INDEX.md` and `QUALITY.md` were NOT regenerated this batch —
both are described in `PRODUCTION_PIPELINE.md` as generated artifacts requiring a full
directory-wide re-scan, and re-running that scan for a 3-concept delta is deferred to a batch where
the regeneration script itself is exercised, consistent with the chemistry subject's own recorded
precedent of deferring registry regeneration rather than hand-editing a generated file. Re-verified:
`npx tsx scripts/validate-knowledge-graph.ts docs/mathematics/kg/graph.json` PASS, 908/908
reachable, 0 failures, 0 warnings (KG file itself untouched); 0 orphan EB files; 0 duplicate EB
files; `npx tsc --noEmit` clean; full suite unaffected (doc-only change, confirmed via targeted
`mathPackageCorpus.test.ts` + `mathematicsAssetContract.test.ts`, 479/479 passed). No Physics,
Chemistry, English, Biology, Computer Science, KG, Blueprint, or runtime file was modified.

### Batch 58 — math.alg Wave 4 (2026-09-11, Mathematics Educational Brain completion campaign)

Re-computed the topologically-ready `math.alg` frontier programmatically against the live KG and
the live EB directory (post-Batch-57, math.alg 15/59): exactly 5 concepts had every prerequisite
already authored — `math.alg.linear-equation-1var` (requires `equation`, `simplification`, both
present), `math.alg.polynomial-division` (requires `polynomial-operations`, present),
`math.alg.fractional-exponent` (requires `exponent-rules`, `radicals`, both present),
`math.alg.simplifying-radicals` (requires `radicals`, present), `math.alg.radical-equations`
(requires `radicals`, present).

All 5 had existing Blueprints, read in full and reused by reference per the Standard's ownership
boundary — no worked example, mastery-probe item bank, or turn-by-turn script restated, only
cited. Each entry authored its own birth-type classification for every Blueprint-registered
misconception:

- **`math.alg.linear-equation-1var`** (developing/apply, mastery 0.90, 8 hr) — solving ax+b=c via
  the balance principle, with an isolation-order strategy (eliminate constants before dividing by
  the coefficient) taught as convenience, not necessity. 3 misconceptions: MC-1
  BALANCE-NOT-MAINTAINED (Type 1 — reading an equation as a symbol string to rearrange rather than
  a claim of equality), MC-2 WRONG-OPERATION-ORDER (Type 1 — PEMDAS read in reverse without
  understanding the order is a convenience choice), MC-3 SIGN-ERROR-TRANSPOSING (Type 4 —
  "moving a term" read as physical relocation rather than as the trace of a mirrored operation).
- **`math.alg.polynomial-division`** (proficient/apply, mastery 0.80, 6 hr) — long division via
  leading-term cancellation, synthetic division as its compact monic-linear-divisor special case,
  and the Division Algorithm's own guarantee that a nonzero remainder is normal. 3 misconceptions:
  MC-1 REMAINDER-MUST-BE-ZERO (Type 1 — overgeneralizing from a practice-set artefact where every
  exercise divides evenly), MC-2 DIVIDE-WRONG-TERM (Type 4 — a false visual pattern-match to
  integer long division's layout), MC-3 SYNTHETIC-FOR-ANY-DIVISOR (Type 5 — instruction-induced;
  the monic-linear precondition demonstrated but never stated as an explicit checkable rule).
- **`math.alg.fractional-exponent`** (proficient/apply, mastery 0.80, 4 hr) — a^(m/n) = ⁿ√(aᵐ) =
  (ⁿ√a)ᵐ as a genuine extension of integer exponent rules, with root-first evaluation taught as the
  more efficient (not merely equivalent) computation order. 2 misconceptions: MC-1
  POWER-FIRST-COMPUTATION-ORDER-DEFAULTED-TO-INEFFICIENTLY (Type 5 — no explicit order-comparison
  habit ever built), MC-2 FRACTIONAL-EXPONENT-NUMERATOR-DENOMINATOR-ROLES-SWAPPED (Type 4 — the
  fraction gives no visual cue for which part is the root and which is the power).
- **`math.alg.simplifying-radicals`** (proficient/apply, mastery 0.80, 4 hr) — deepening
  `math.alg.radicals`'s own extraction skill to full rigor (largest factor, not merely a factor)
  and higher indices. 2 misconceptions: MC-1 PARTIAL-EXTRACTION-MISTAKEN-FOR-FULL-SIMPLIFICATION
  (Type 1 — "I performed the step correctly, so I am done" applied to an iterative task), MC-2
  NON-PERFECT-POWER-FACTOR-INCORRECTLY-EXTRACTED (Type 1 — collapsing "is a perfect power" into
  the weaker "divides the radicand"). **Genuine Curriculum Feedback finding**: this concept's own
  MC-1 and `math.alg.radicals`'s MC-3 are, in substance, the same misconception (both Blueprints
  independently author the identical √72→6√2 worked example as their primary repair vehicle) —
  recorded as a Blueprint-level content-overlap finding, not fixed (no Blueprint or KG file may be
  modified by this program); this entry cross-references `radicals`' MC-3 explicitly rather than
  treating the overlap as a novel, unconnected finding.
- **`math.alg.radical-equations`** (proficient/apply, mastery 0.75, 5 hr) — isolate-then-square,
  with the extraneous-solution check (squaring loses sign information) as the concept's structural
  centerpiece. 3 misconceptions: MC-1 RADICAL-EQUATION-CANDIDATES-NOT-CHECKED-AGAINST-ORIGINAL
  (Type 1 — every prior equation-solving concept guaranteed a valid step sequence implies a
  correct solution set; squaring is the learner's first non-reversible step), MC-2
  RADICAL-SQUARED-BEFORE-BEING-ISOLATED (Type 4 — "square the equation" read as squaring whatever
  currently sits on each side), MC-3 SQUARED-SUM-EXPANDED-INCORRECTLY (Type 1 — an imported
  `math.alg.factoring-special` gap, not native to this concept; noted, not treated as this
  concept's own root cause).

`math.alg` **15/59 → 20/59**, still IN PROGRESS. Mathematics **260/908 → 265/908**. Topologically
next-ready `math.alg` candidates deliberately NOT pre-computed for a Wave 5 selection this batch,
per this program's own "re-derive the frontier fresh each batch" discipline. All five tracking
files updated in the same commit: `ROADMAP.md` Section 1/2 totals regenerated from source,
`COVERAGE.md`'s math.alg summary row and this Delivery history entry, `EDUCATIONAL_BRAIN_INDEX.md`
and `QUALITY.md` again deferred (same generated-artifact rationale as Batch 57). Re-verified: `npx
tsx scripts/validate-knowledge-graph.ts docs/mathematics/kg/graph.json` PASS, 908/908 reachable,
0 failures, 0 warnings (KG file untouched); 0 orphan EB files; 0 duplicate EB files (via
`scripts/math/state.ts`); `npx tsc --noEmit` clean; targeted tests
`mathPackageCorpus.test.ts` + `mathematicsAssetContract.test.ts` 479/479 passed. No Physics,
Chemistry, English, Biology, Computer Science, KG, Blueprint, or runtime file was modified.

### Batch 59 — math.alg Wave 5 (2026-09-11, Mathematics Educational Brain completion campaign)

Re-computed the topologically-ready `math.alg` frontier programmatically against the live KG and
the live EB directory (post-Batch-58, math.alg 20/59): exactly 5 concepts had every prerequisite
already authored — `math.alg.inequality-1var` (requires `linear-equation-1var`, present),
`math.alg.absolute-value-equations` (requires `math.arith.absolute-value`, `linear-equation-1var`,
both present), `math.alg.linear-equation-2var` (requires `linear-equation-1var`, present),
`math.alg.remainder-theorem` (requires `polynomial-division`, present),
`math.alg.rationalizing-denominators` (requires `simplifying-radicals`, present).

All 5 had existing Blueprints, read in full and reused by reference per the Standard's ownership
boundary. Each entry authored its own birth-type classification for every Blueprint-registered
misconception:

- **`math.alg.inequality-1var`** (developing/apply, mastery 0.85, 6 hr) — variable-on-both-sides
  collection before checking a sign flip, compound (three-part) inequalities solved in lockstep,
  and degenerate all-real/empty-set outcomes when variable terms cancel entirely. 3
  misconceptions: MC-1 SIGN-FLIP-CHECKED-BEFORE-COLLECTING-VARIABLE-TERMS (Type 1 — the
  single-operation sign-flip check applied prematurely, before an isolating coefficient exists to
  check), MC-2 COMPOUND-INEQUALITY-PARTS-MANIPULATED-INDEPENDENTLY (Type 4 — the three-part
  notation gives no visual cue that every operation must apply to all three parts at once), MC-3
  EVERY-LINEAR-INEQUALITY-ASSUMED-TO-YIELD-AN-INTERVAL (Type 1 — an unbroken run of prior
  non-degenerate practice items leaves no experience of the degenerate outcome).
- **`math.alg.absolute-value-equations`** (proficient/apply, mastery 0.80, 6 hr) — the two-case
  split as a direct restatement of "distance from zero," the sign-check-first discipline (no
  solution when set equal to a negative), and the AND/connected-interval versus OR/disconnected-
  pieces distinction for inequalities. 3 misconceptions: MC-1
  ABSOLUTE-VALUE-EQUATION-SPLIT-WITHOUT-CHECKING-SIGN (Type 1 — the case-split procedure applied
  unconditionally without the prerequisite sign check), MC-2
  ABSOLUTE-VALUE-INEQUALITY-AND-OR-STRUCTURE-CONFUSED (Type 1 — both inequality directions
  superficially "split into two conditions," inviting the wrong structure to transfer between
  them), MC-3 ABSOLUTE-VALUE-SOLUTIONS-NOT-VERIFIED (Type 1 — "the split was executed correctly"
  overgeneralized to "both resulting values are solutions").
- **`math.alg.linear-equation-2var`** (developing/apply, mastery 0.85, 5 hr) — the category shift
  from a single-number answer to an infinite family of ordered-pair solutions, generation by
  fixing one variable, and verification by simultaneous substitution. 3 misconceptions (2 sharing
  one Blueprint repair path): MC-1 ONE-SOLUTION-EXPECTED (Type 1 — near-total transfer of the
  one-variable solving schema), MC-2 SOLUTION-IS-JUST-X (Type 1 — the same schema transfer
  surfacing at the reporting stage rather than the solving stage), MC-3
  ARBITRARY-PAIR-IS-SOLUTION (Type 1 — conflating "infinitely many solutions" as a statement about
  set *size* with a false claim about set *membership*). Genuine KG cross-links
  (`math.func.linear-function`, `math.geom.line-equation`) verified as real and well-founded, both
  reflected in Cross-Subject Connections.
- **`math.alg.remainder-theorem`** (proficient/apply, mastery 0.85, 3 hr) — the theorem as a direct
  two-line consequence of the already-established Division Algorithm, applicable unconditionally
  regardless of whether the remainder is zero. 3 misconceptions: MC-1 SUBSTITUTE-WRONG-SIGN (Type
  4 — the divisor's visible sign pattern-matched directly rather than derived by solving divisor=0),
  MC-2 THEOREM-IS-ONLY-FOR-ROOTS (Type 5 — the Factor Theorem's zero-remainder special case
  collapsing into the general theorem's only recognized use), MC-3 DIVISION-STILL-REQUIRED (Type 1
  — a healthy general verification habit overgeneralized to a step that is not actually uncertain).
- **`math.alg.rationalizing-denominators`** (proficient/apply, mastery 0.80, 4 hr) — the
  single-radical-multiplier technique and the conjugate/difference-of-squares technique for
  binomial denominators, both framed as instances of multiplying by a strategically chosen form of
  1. 3 misconceptions: MC-1 WRONG-RADICAL-USED-AS-MULTIPLIER (Type 1 — "multiply by some radical"
  without the exact-match constraint), MC-2
  CONJUGATE-NOT-USED-FOR-BINOMIAL-RADICAL-DENOMINATOR (Type 1 — the familiar single-radical
  technique applied unmodified to a structurally different denominator shape), MC-3
  CONJUGATE-SIGN-NOT-FLIPPED-CORRECTLY (Type 4 — "form the conjugate" read as "flip the signs"
  generically rather than "flip only the connecting sign"). **Second genuine Curriculum Feedback
  finding, same class as Batch 58's**: this concept's core binomial/conjugate technique
  substantially overlaps `math.alg.radicals`' own LO2/MC-2
  (RATIONALIZATION-SKIPPED-FOR-BINOMIAL-DENOMINATOR) — recorded, cross-referenced explicitly, not
  fixed (no Blueprint or KG file may be modified by this program).

`math.alg` **20/59 → 25/59**, still IN PROGRESS. Mathematics **265/908 → 270/908**. Topologically
next-ready `math.alg` candidates deliberately NOT pre-computed for a Wave 6 selection this batch,
per this program's own "re-derive the frontier fresh each batch" discipline. All five tracking
files updated in the same commit: `ROADMAP.md` Section 1/2 totals regenerated from source,
`COVERAGE.md`'s math.alg summary row and this Delivery history entry, `EDUCATIONAL_BRAIN_INDEX.md`
and `QUALITY.md` again deferred (same generated-artifact rationale as Batches 57-58). Re-verified:
`npx tsx scripts/validate-knowledge-graph.ts docs/mathematics/kg/graph.json` PASS, 908/908
reachable, 0 failures, 0 warnings (KG file untouched); 0 orphan EB files; 0 duplicate EB files
(via `scripts/math/state.ts`); `npx tsc --noEmit` clean; targeted tests
`mathPackageCorpus.test.ts` + `mathematicsAssetContract.test.ts` 479/479 passed. No Physics,
Chemistry, English, Biology, Computer Science, KG, Blueprint, or runtime file was modified.

### Batch 60 — math.alg Wave 6 (2026-09-11, Mathematics Educational Brain completion campaign,
autonomous loop, /loop 60s)

Re-computed the topologically-ready `math.alg` frontier programmatically against the live KG and
the live EB directory (post-Batch-59, math.alg 25/59): exactly 3 concepts had every prerequisite
already authored — `math.alg.inequality-2var` (requires `inequality-1var`, `linear-equation-2var`,
both present), `math.alg.system-linear-equations` (requires `linear-equation-2var`, present),
`math.alg.factor-theorem` (requires `remainder-theorem`, present).

All 3 had existing Blueprints, read in full and reused by reference per the Standard's ownership
boundary. Each entry authored its own birth-type classification for every Blueprint-registered
misconception:

- **`math.alg.inequality-2var`** (proficient/apply, mastery 0.80, 5 hr) — graphing a half-plane via
  boundary-line-then-shade, the solid/dashed distinction derived from whether a boundary point
  satisfies the inequality (never a memorised convention), and origin-exception handling when the
  boundary passes through (0,0). 3 misconceptions: MC-1
  BOUNDARY-LINE-STYLE-NOT-MATCHED-TO-INEQUALITY-SYMBOL (Type 5 — instruction-induced, solid/dashed
  demonstrated without ever connecting it to the underlying boundary-point check), MC-2
  ORIGIN-USED-AS-TEST-POINT-WITHOUT-CHECKING-IT-IS-OFF-THE-LINE (Type 1 — "origin always works"
  overgeneralized past its precondition), MC-3 SHADED-HALF-PLANE-REVERSED (Type 1 — a correct
  true/false evaluation not reliably reconciled back to which physical side it names). **Genuine
  Blueprint/KG metadata discrepancy found and resolved toward the KG**: the Blueprint's own
  Component 0/7 state `cross_links: (none)`, but the live KG genuinely lists
  `math.opt.linear-programming` (matching the KG's own `related` field and the Blueprint's own
  prose/P76 design) — recorded in Curriculum Feedback, not fixed (no Blueprint or KG file
  modified).
- **`math.alg.system-linear-equations`** (proficient/apply, mastery 0.85, 12 hr) — substitution
  (target-equation discipline) and elimination (coefficient-sign matching) as two mechanical routes
  to the same one-unknown reduction, plus the three-outcome classification (unique/none/infinite)
  read directly off the post-elimination result. 3 misconceptions: MC-1
  SUBSTITUTE-INTO-SAME-EQUATION (Type 1 — no distinction yet held between "equation solved FROM"
  and "the other equation"), MC-2 ELIMINATION-WRONG-SIGN (Type 1 — "combine the equations"
  overgeneralized without the additive-inverse precondition), MC-3
  ZERO-EQUALS-ZERO-MEANS-NO-SOLUTION (Type 3 — language contamination, "nothing left" conflated
  with "nothing works," inverting the correct reading). Genuine KG cross-link
  (`math.linalg.linear-system`) verified real and already correctly documented by the Blueprint —
  no discrepancy.
- **`math.alg.factor-theorem`** (proficient/apply, mastery 0.85, 3 hr) — the Remainder Theorem's own
  r=0 special case, made explicit, plus deflation (divide out a confirmed factor, repeat) as the
  mechanism turning a single factor test into a complete factorisation, plus the Rational Root
  candidate list as the finite, systematic search strategy. 3 misconceptions: MC-1
  SUBSTITUTE-WRONG-SIGN (Type 4 — identical mechanism to `remainder-theorem`'s own MC-1, direct
  carry-over), MC-2 FACTOR-FOUND-MEANS-DONE (Type 1 — the theorem's own name, "find A factor," read
  as the whole task), MC-3 RATIONAL-ROOT-NOT-NEEDED (Type 5 — instruction-induced, the Rational
  Root connection left implicit, degenerating into unstructured guessing).

`math.alg` **25/59 → 28/59**, still IN PROGRESS. Mathematics **270/908 → 273/908**. Topologically
next-ready `math.alg` candidates deliberately NOT pre-computed for a Wave 7 selection this batch,
per this program's own "re-derive the frontier fresh each batch" discipline. All five tracking
files updated in the same commit: `ROADMAP.md` Section 1/2 totals regenerated from source,
`COVERAGE.md`'s math.alg summary row and this Delivery history entry, `EDUCATIONAL_BRAIN_INDEX.md`
and `QUALITY.md` again deferred (same generated-artifact rationale as Batches 57-59). Re-verified:
`npx tsx scripts/validate-knowledge-graph.ts docs/mathematics/kg/graph.json` PASS, 908/908
reachable, 0 failures, 0 warnings (KG file untouched); 0 orphan EB files; 0 duplicate EB files
(via `scripts/math/state.ts`); `npx tsc --noEmit` clean; targeted tests
`mathPackageCorpus.test.ts` + `mathematicsAssetContract.test.ts` 479/479 passed. No Physics,
Chemistry, English, Biology, Computer Science, KG, Blueprint, or runtime file was modified.
This is the first batch run under the autonomous `/loop 60s` mode activated this session (recurring
1-minute cron, fires only while idle, auto-expires after 7 days) — subsequent batches continue
automatically per the loop's own standing prompt.

### Batch 61 — math.alg Wave 7 (2026-09-11, Mathematics Educational Brain completion campaign,
autonomous loop, /loop 60s)

Re-computed the topologically-ready `math.alg` frontier programmatically against the live KG and
the live EB directory (post-Batch-60, math.alg 28/59): exactly 4 concepts had every prerequisite
already authored — `math.alg.substitution-method` and `math.alg.elimination-method` (both require
`system-linear-equations`, present), `math.alg.system-3var` (requires `system-linear-equations`,
present), `math.alg.factoring` (requires `polynomial`, `factor-theorem`, both present).

All 4 had existing Blueprints, read in full and reused by reference per the Standard's ownership
boundary. Each entry authored its own birth-type classification for every Blueprint-registered
misconception:

- **`math.alg.substitution-method`** — the isolate-one-variable, substitute-into-the-OTHER-equation
  procedure as a mechanical routine distinct from `system-linear-equations`' own high-level
  three-outcome classification. **Genuine Curriculum Feedback finding, recorded not fixed**: this
  entry's own misconception registry substantially overlaps `system-linear-equations`' MC-1
  (SUBSTITUTE-INTO-SAME-EQUATION) and MC-3 (ZERO-EQUALS-ZERO-MEANS-NO-SOLUTION) — expected and
  correctly authored as intentional depth (the parent concept surveys the outcome-level pattern,
  this concept drills the specific procedural mechanics), cross-referenced explicitly in both
  directions rather than silently duplicated.
- **`math.alg.elimination-method`** — the general common-multiple scaling procedure (multiply one
  or both equations so a variable's coefficients become additive inverses, add, solve, back-
  substitute), with whole-equation scaling discipline (every term must be multiplied, not just the
  target variable) as the central misconception-prevention habit. Genuine, verified real forward
  cross-link to `math.linalg.row-reduction` documented (this concept's row-by-row elimination
  mechanics are exactly what Gaussian elimination systematizes for larger systems) — confirmed
  against the live KG, not assumed.
- **`math.alg.system-3var`** — the two-round elimination cascade (eliminate one variable across two
  independent pairs of equations to reduce 3 unknowns to 2, then apply the already-secure 2-variable
  procedure), with the line-vs-plane geometric extension of the infinite-solutions case (a 3-variable
  system's "infinite solutions" describes a shared line or plane, not a single degenerate case) and
  contradiction-is-conclusive reasoning (one false statement anywhere in the cascade proves no
  solution exists, no matter how much of the reduction remains undone). Real forward cross-link to
  `math.linalg.row-reduction` also documented here, since 3-variable elimination is literally
  Gaussian elimination's smallest non-trivial case.
- **`math.alg.factoring`** — the unified GCF-first, classify-by-term-count, verify-by-discriminant
  decision tree spanning difference/sum of squares and cubes, perfect-square trinomials, the general
  ac-method (monic and non-monic alike), and grouping — taught as one strategic system rather than
  disconnected techniques, per the KG parent node's own framing (it has three unauthored children,
  `factoring-gcf`/`factoring-trinomials`/`factoring-special`, each a specialised branch of this
  entry's tree). 3 misconceptions: MC-1 GCF-THEN-DONE (Type 1 — overgeneralization, the first,
  cleanest step mistaken for the whole procedure), MC-2 AC-METHOD-ONLY-FOR-MONIC (Type 5 —
  instruction-induced, a monic-only guess-and-check shortcut leaving no general method once the
  leading coefficient isn't 1), MC-3 IRREDUCIBLE-QUADRATIC-FACTORABLE (Type 2 — perceptual
  intuition, a sum of squares visually near-identical to a difference of squares, resolved by the
  discriminant as a computational rather than visual test). **Genuine family relationship recorded
  in Curriculum Feedback**: this entry's MC-1 and `factor-theorem`'s own MC-2
  (FACTOR-FOUND-MEANS-DONE, authored Batch 60) are the same premature-termination mechanism
  recurring at two different pipeline stages (GCF extraction vs. root-tested factor confirmation) —
  now cross-referenced in both entries, not merged (they remain genuinely distinct misconceptions
  at distinct procedural stages).

`math.alg` **28/59 → 32/59**, still IN PROGRESS. Mathematics **273/908 → 277/908**. Topologically
next-ready `math.alg` candidates deliberately NOT pre-computed for a Wave 8 selection this batch,
per this program's own "re-derive the frontier fresh each batch" discipline. All tracking files
updated in the same commit: `ROADMAP.md` Section 1/2 totals regenerated from source, `COVERAGE.md`'s
math.alg summary row and this Delivery history entry, `CLAUDE.md`'s campaign section.
`EDUCATIONAL_BRAIN_INDEX.md` and `QUALITY.md` again deferred (same generated-artifact rationale as
Batches 57-60). Re-verified: `npx tsx scripts/validate-knowledge-graph.ts docs/mathematics/kg/graph.json`
PASS, 908/908 reachable, 0 failures, 0 warnings (KG file untouched); 0 orphan EB files; 0 duplicate
EB files (via `scripts/math/state.ts`); `npx tsc --noEmit` clean; targeted tests
`mathPackageCorpus.test.ts` + `mathematicsAssetContract.test.ts` 479/479 passed. All 4 new entries'
heading structure diffed clean against `math.alg.like-terms.md` (0 diffs, exact 21-section Standard
match). No Physics, Chemistry, English, Biology, Computer Science, KG, Blueprint, or runtime file
was modified. This is the second batch run under the autonomous `/loop 60s` mode (loop iteration 2)
— subsequent batches continue automatically per the loop's own standing prompt.

### Batch 62 — math.alg Wave 8 (2026-09-11, Mathematics Educational Brain completion campaign,
autonomous loop, /loop 60s)

Re-computed the topologically-ready `math.alg` frontier programmatically against the live KG and
the live EB directory (post-Batch-61, math.alg 32/59): exactly 3 concepts had every prerequisite
already authored — `math.alg.factoring-gcf` and `math.alg.factoring-special` (both direct KG
children of `math.alg.factoring`, requiring only that concept), and
`math.alg.rational-expressions` (requires `math.alg.polynomial`, `math.alg.factoring`, both
present).

All 3 had existing Blueprints, read in full and reused by reference per the Standard's ownership
boundary. Each entry authored its own birth-type classification for every Blueprint-registered
misconception:

- **`math.alg.factoring-gcf`** (developing/apply, mastery 0.9, 3 hr, cross-link `math.nt.gcd`) — a
  focused fluency drill on the FIRST step of `math.alg.factoring`'s own decision tree: computing a
  monomial GCF as two independently required parts (numerical GCF of coefficients, plus the lowest
  shared power of each variable), then dividing each term by it correctly. 3 misconceptions: MC-1
  MISSING-VARIABLE-IN-GCF (Type 1 — overgeneralization, the fluent integer-GCF algorithm treated as
  the complete answer with the variable factor never extracted), MC-2 HIGHEST-POWER-IN-GCF (Type 1
  — the LCM rule, highest shared power, misapplied to a GCF problem where the correct rule is the
  lowest shared power), MC-3 QUOTIENT-ARITHMETIC-ERROR (Type 4 — notation-induced, the coefficient
  divided correctly but the variable exponent left unreduced instead of having exponents
  subtracted). **Genuine Curriculum Feedback finding recorded (no overlap, explicitly checked and
  ruled out)**: `math.alg.factoring`'s own MC-1 (GCF-THEN-DONE, stopping after a correctly-computed
  GCF without checking the residual) is a structurally distinct failure from this concept's three
  misconceptions (all about correctly COMPUTING the GCF itself) — recorded explicitly so a future
  session does not conflate the two.
- **`math.alg.factoring-special`** (proficient/apply, mastery 0.85, 5 hr) — three memorised
  fast-path patterns through the general factoring decision tree: difference of squares (with the
  explicit no-sum-of-squares-analogue exception), sum/difference of cubes (with the
  binomial-matches/trinomial-opposite sign rule, derived via expansion rather than stated as rote),
  and perfect square trinomials (with the exact-middle-term-match requirement distinguishing a
  genuine instance from a superficial near-miss). 3 misconceptions: MC-1
  SUM-OF-SQUARES-INCORRECTLY-FACTORED-LIKE-DIFFERENCE (Type 2 — perceptual intuition), MC-2
  CUBE-FACTORING-TRINOMIAL-MIDDLE-SIGN-REVERSED (Type 4 — notation-induced, two moving sign parts
  easily inverted under load), MC-3 PERFECT-SQUARE-TRINOMIAL-MIDDLE-TERM-NOT-VERIFIED (Type 1 —
  overgeneralization, "two perfect squares present" treated as sufficient rather than merely
  necessary). **Genuine Curriculum Feedback finding recorded (mechanism overlap, not duplication)**:
  this concept's MC-1 and `math.alg.factoring`'s own MC-3 (IRREDUCIBLE-QUADRATIC-FACTORABLE) are the
  IDENTICAL Type-2 perceptual error (sum of squares mistaken for a factorable difference),
  independently recorded by two Blueprints for two different concepts — correctly authored as two
  separate entries (general discriminant-based test vs. specific memorised-pattern exception), now
  cross-referenced in both directions; this concept's "Minus splits, plus doesn't" memory hook is
  deliberately reused verbatim from the prerequisite's identical hook.
- **`math.alg.rational-expressions`** (proficient/apply, mastery 0.8, 10 hr, unlocks
  `math.alg.rational-equations` + `math.func.rational-function`, cross-link
  `math.func.rational-function` not yet authored, P76 independence mode) — rational expressions as
  the direct algebraic generalisation of numeric fractions, with domain restriction as the one
  genuinely new idea (a property of the ORIGINAL, pre-cancellation denominator that survives
  simplification even when no longer visibly displayed). 3 misconceptions: MC-1
  DOMAIN-FROM-SIMPLIFIED-FORM-ONLY (Type 4 — notation-induced, FOUNDATIONAL and ranked first per
  the Blueprint's own explicit priority ordering), MC-2 CANCELING-ADDED-TERMS (Type 1 —
  overgeneralization, cancelling a factor overextended to any visually matching symbol regardless
  of additive vs. multiplicative role), MC-3 ADD-NUMERATORS-AND-DENOMINATORS-SEPARATELY (Type 1 —
  the valid multiplication rule overextended to addition). Teaches all four arithmetic operations
  together per the Blueprint's own compression strategy, ahead of its two unauthored KG children
  (`rational-expressions-addition`, `rational-expressions-multiplication`), which will specialise
  one operation-pair each from this entry's framework when authored.

`math.alg` **32/59 → 35/59**, still IN PROGRESS. Mathematics **277/908 → 280/908**. Topologically
next-ready `math.alg` candidates deliberately NOT pre-computed for a Wave 9 selection this batch,
per this program's own "re-derive the frontier fresh each batch" discipline (though
`math.alg.factoring-trinomials`, which requires `math.alg.factoring-gcf`, is now known-unblocked
and expected to appear). All tracking files updated in the same commit: `ROADMAP.md` Section 1/2
totals regenerated from source, `COVERAGE.md`'s math.alg summary row and this Delivery history
entry, `CLAUDE.md`'s campaign section. `EDUCATIONAL_BRAIN_INDEX.md` and `QUALITY.md` again
deferred (same generated-artifact rationale as Batches 57-61). Re-verified:
`npx tsx scripts/validate-knowledge-graph.ts docs/mathematics/kg/graph.json` PASS, 908/908
reachable, 0 failures, 0 warnings (KG file untouched); 0 orphan EB files; 0 duplicate EB files
(via `scripts/math/state.ts`); `npx tsc --noEmit` clean; targeted tests
`mathPackageCorpus.test.ts` + `mathematicsAssetContract.test.ts` 479/479 passed. All 3 new entries'
heading structure diffed clean against `math.alg.like-terms.md` (0 diffs, exact 21-section Standard
match). No Physics, Chemistry, English, Biology, Computer Science, KG, Blueprint, or runtime file
was modified. This is the third batch run under the autonomous `/loop 60s` mode (loop iteration 3)
— subsequent batches continue automatically per the loop's own standing prompt.

### Batch 63 — math.alg Wave 9 (2026-09-11, Mathematics Educational Brain completion campaign,
autonomous loop, /loop 60s)

Re-computed the topologically-ready `math.alg` frontier programmatically against the live KG and
the live EB directory (post-Batch-62, math.alg 35/59): exactly 4 concepts had every prerequisite
already authored — `math.alg.factoring-trinomials` (requires `factoring-gcf`, present),
`math.alg.rational-equations` (requires `rational-expressions` per the live KG, present),
`math.alg.rational-expressions-addition` and `math.alg.rational-expressions-multiplication` (both
require `rational-expressions`, present; addition also requires `math.arith.fraction-addition`,
already certified).

All 4 had existing Blueprints, read in full and reused by reference per the Standard's ownership
boundary. Each entry authored its own birth-type classification for every Blueprint-registered
misconception:

- **`math.alg.factoring-trinomials`** (proficient/apply, mastery 0.8, 8 hr, unlocks
  `math.alg.quadratic-equation`) — the monic search (product=c, sum=b) generalised to the AC method
  for non-monic trinomials (product=ac, sum=b), with grouping-sign discipline and a
  discriminant-based irreducibility check. 3 misconceptions: MC-1 MONIC-SHORTCUT-FOR-NONMONIC
  (Type 1 — the monic rule applied unchanged where a≠1), MC-2 SIGN-ERROR-IN-GROUPING (Type 4 —
  notation-induced sign mismatch extracting a GCF from the second group), MC-3
  SUM-OF-SQUARES-FACTORABLE (Type 2 — perceptual intuition). **Third cross-referenced instance of
  the sum-of-squares mechanism**: MC-3 here is the identical Type-2 error already documented in
  `math.alg.factoring`'s MC-3 and `math.alg.factoring-special`'s MC-1 — now cross-referenced across
  all three entries, with the "Minus splits, plus doesn't" memory hook reused verbatim a second
  time.
- **`math.alg.rational-expressions-addition`** (proficient/apply, mastery 0.8, 6 hr) — same-
  denominator direct combination extended to different-denominator combination via a
  factored-first LCD, with domain-restriction persistence and paired numerator-rescaling as the
  two consequential checks. 3 misconceptions: MC-1 LCD-COMPUTED-AS-PRODUCT-OF-UNFACTORED-
  DENOMINATORS (Type 5 — instruction-induced), MC-2 DOMAIN-RESTRICTION-DROPPED-AFTER-CANCELLATION
  (Type 4 — notation-induced, FOUNDATIONAL), MC-3 NUMERATOR-NOT-RESCALED-WHEN-CONVERTING-TO-COMMON-
  DENOMINATOR (Type 1 — overgeneralization). **Genuine mechanism overlap recorded (intentional
  depth, not duplication)**: MC-2 is the identical Type-4 mechanism as
  `math.alg.rational-expressions`'s own MC-1 (DOMAIN-FROM-SIMPLIFIED-FORM-ONLY), applied
  specifically within the multi-denominator combination context — cross-referenced.
- **`math.alg.rational-expressions-multiplication`** (proficient/apply, mastery 0.8, 5 hr) —
  factor-before-multiplying efficiency, correct-divisor-only reciprocal flipping for division, and
  diagonal (cross-fraction) cancellation as a named, explicitly-taught skill. 3 misconceptions:
  MC-1 MULTIPLIED-BEFORE-FACTORING-INSTEAD-OF-AFTER (Type 5 — instruction-induced, moderate), MC-2
  WRONG-FRACTION-FLIPPED-DURING-DIVISION (Type 1 — overgeneralization, FOUNDATIONAL), MC-3
  CROSS-FRACTION-CANCELLATION-MISSED (Type 1 — overgeneralization). No genuine overlap found with
  any already-authored sibling entry.
- **`math.alg.rational-equations`** (proficient/apply, mastery 0.8, 6 hr) — the four-stage
  clear-solve-check procedure, with the extraneous-solution check as the single most consequential
  step (multiplying by the LCD is only reversible where the LCD is nonzero). 3 misconceptions:
  MC-1 EXTRANEOUS-SOLUTION-NOT-CHECKED-AND-DISCARDED (Type 5 — instruction-induced, FOUNDATIONAL),
  MC-2 LCD-MULTIPLICATION-APPLIED-TO-ONLY-PART-OF-THE-EQUATION (Type 1 — overgeneralization,
  foundational), MC-3 ALL-CANDIDATES-DISCARDED-WHEN-ONE-IS-EXTRANEOUS (Type 1 —
  overgeneralization, an overcorrection of MC-1's own repair).

**Genuine KG/Blueprint metadata discrepancy found, resolved toward the KG (authoritative), per
standing rule**: `math.alg.rational-equations`' own Blueprint states its prerequisite as
`math.alg.rational-expressions-addition`, but the live KG (verified directly this batch) lists its
`requires` as `math.alg.rational-expressions` directly. Not fixed (no KG or Blueprint file
modified); recorded in both entries. Because both concepts were authored in the same wave, this
discrepancy had no practical effect on this batch's topological-readiness computation, but is
recorded honestly for future reference.

`math.alg` **35/59 → 39/59**, still IN PROGRESS. Mathematics **280/908 → 284/908**. Topologically
next-ready `math.alg` candidates deliberately NOT pre-computed for a Wave 10 selection this batch,
per this program's own "re-derive the frontier fresh each batch" discipline. All tracking files
updated in the same commit: `ROADMAP.md` Section 1/2 totals regenerated from source, `COVERAGE.md`'s
math.alg summary row and this Delivery history entry, `CLAUDE.md`'s campaign section.
`EDUCATIONAL_BRAIN_INDEX.md` and `QUALITY.md` again deferred (same generated-artifact rationale as
Batches 57-62). Re-verified: `npx tsx scripts/validate-knowledge-graph.ts docs/mathematics/kg/graph.json`
PASS, 908/908 reachable, 0 failures, 0 warnings (KG file untouched); 0 orphan EB files; 0 duplicate
EB files (via `scripts/math/state.ts`); `npx tsc --noEmit` clean; targeted tests
`mathPackageCorpus.test.ts` + `mathematicsAssetContract.test.ts` 479/479 passed. All 4 new entries'
heading structure diffed clean against `math.alg.like-terms.md` (0 diffs, exact 21-section Standard
match). No Physics, Chemistry, English, Biology, Computer Science, KG, Blueprint, or runtime file
was modified. This is the fourth batch run under the autonomous `/loop 60s` mode (loop iteration 4)
— subsequent batches continue automatically per the loop's own standing prompt.

### Batch 64 — math.alg Wave 10 (2026-09-11, Mathematics Educational Brain completion campaign,
autonomous loop, /loop 60s)

Re-computed the topologically-ready `math.alg` frontier programmatically against the live KG and
the live EB directory (post-Batch-63, math.alg 39/59): exactly 1 concept had every prerequisite
already authored — `math.alg.quadratic-equation` (requires `factoring-trinomials`, present). A
single-concept wave, matching this program's own precedent for waves where only one concept
becomes ready (e.g. math.arith Wave 1, math.nt Wave 9).

Had an existing Blueprint, read in full and reused by reference per the Standard's ownership
boundary. High-value node: unlocks `math.func.quadratic-function` and `math.alg.polynomial-roots`,
and has three unauthored KG children (`math.alg.completing-the-square`,
`math.alg.quadratic-formula`, `math.alg.discriminant`) that this entry's own Blueprint deliberately
scopes around — completing the square introduced here ONLY as the quadratic formula's derivation,
not as a standalone method (deferred to its own child concept); the discriminant introduced as the
method-selection and root-counting tool (its complex-root interpretation deferred to its own child
concept). Authored its own birth-type classification for every Blueprint-registered misconception:
3 misconceptions — MC-1 FACTORING-IS-UNIVERSAL (Type 1 — overgeneralization, FOUNDATIONAL, the
already-fluent factoring method treated as the only tool rather than an efficient special case),
MC-2 NEGATIVE-b-FORMULA-ERROR (Type 4 — notation-induced, foundational, "−b" misread as "copy b's
sign" rather than "genuinely negate b"), MC-3 NEGATIVE-DISCRIMINANT-REAL-ROOT (Type 3 — language
contamination, moderate, "solve for x" interpreted as requiring a numeric answer even when Δ<0
correctly means none exists). No genuine content-overlap or metadata discrepancy was found between
this Blueprint and any already-authored sibling entry — the deliberate three-child scoping decision
is recorded as a standing forward-work note, not a gap.

`math.alg` **39/59 → 40/59**, still IN PROGRESS. Mathematics **284/908 → 285/908**. Topologically
next-ready `math.alg` candidates deliberately NOT pre-computed for a Wave 11 selection this batch,
per this program's own "re-derive the frontier fresh each batch" discipline — the frontier is
expected to expand once `quadratic-equation`'s own downstream concepts are checked fresh next
iteration. All tracking files updated in the same commit: `ROADMAP.md` Section 1/2 totals
regenerated from source, `COVERAGE.md`'s math.alg summary row and this Delivery history entry,
`CLAUDE.md`'s campaign section. `EDUCATIONAL_BRAIN_INDEX.md` and `QUALITY.md` again deferred (same
generated-artifact rationale as Batches 57-63). Re-verified:
`npx tsx scripts/validate-knowledge-graph.ts docs/mathematics/kg/graph.json` PASS, 908/908
reachable, 0 failures, 0 warnings (KG file untouched); 0 orphan EB files; 0 duplicate EB files (via
`scripts/math/state.ts`); `npx tsc --noEmit` clean; targeted tests `mathPackageCorpus.test.ts` +
`mathematicsAssetContract.test.ts` 479/479 passed. The new entry's heading structure diffed clean
against `math.alg.like-terms.md` (0 diffs, exact 21-section Standard match). No Physics, Chemistry,
English, Biology, Computer Science, KG, Blueprint, or runtime file was modified. This is the fifth
batch run under the autonomous `/loop 60s` mode (loop iteration 5) — subsequent batches continue
automatically per the loop's own standing prompt.

### Batch 65 — math.alg Wave 11 (2026-09-11, Mathematics Educational Brain completion campaign,
autonomous loop, /loop 60s)

Re-computed the topologically-ready `math.alg` frontier programmatically against the live KG and
the live EB directory (post-Batch-64, math.alg 40/59): exactly 2 concepts had every prerequisite
already authored — `math.alg.completing-the-square` (requires `quadratic-equation`, present) and
`math.alg.polynomial-roots` (requires `factor-theorem` and `quadratic-equation`, both present).

Both had existing Blueprints, read in full and reused by reference per the Standard's ownership
boundary. Each entry authored its own birth-type classification for every Blueprint-registered
misconception:

- **`math.alg.completing-the-square`** (proficient/apply, mastery 0.8, 5 hr, unlocks
  `math.alg.quadratic-formula`) — explicit division of labour with its own KG parent,
  `math.alg.quadratic-equation`, whose already-authored entry deliberately scoped completing the
  square to a monic-only derivation step; this entry extends that into the full non-monic
  procedure and an entirely new application (vertex form for optimisation, distinct from root-
  finding). 3 misconceptions: MC-1 COMPLETING-THE-SQUARE-ASSUMED-MONIC-ONLY (Type 1 —
  overgeneralization, FOUNDATIONAL, the brief monic-only prior encounter generalised to be the
  technique's full scope), MC-2 VERTEX-SIGN-OF-A-MAX-MIN-DETERMINATION-REVERSED (Type 1 —
  overgeneralization, foundational), MC-3 SQUARE-COMPLETION-TERM-B-OVER-2A-SQUARED-COMPUTED-
  INCORRECTLY (Type 4 — notation-induced, moderate, the division by a easy to omit since it wasn't
  present in the simpler monic case).
- **`math.alg.polynomial-roots`** (proficient/analyze, mastery 0.8, 8 hr, unlocks
  `math.alg.fundamental-theorem-algebra`, cross-link `math.cx.complex-numbers-analysis`) — the
  informal Fundamental Theorem of Algebra as an already-usable root-counting fact, multiplicity
  as the count that actually matches the degree, and the Conjugate Root Theorem with its
  real-coefficients hypothesis. 3 misconceptions: MC-1 DISTINCT-ROOTS-NOT-MULTIPLICITY (Type 1 —
  overgeneralization, FOUNDATIONAL), MC-2 CONJUGATE-PAIRING-NOT-APPLIED (Type 1 —
  overgeneralization, moderate), MC-3 CONJUGATE-THEOREM-APPLIED-WITHOUT-REAL-COEFFICIENTS-CHECK
  (Type 5 — instruction-induced, moderate, the theorem's memorable conclusion easy to apply
  mechanically while its checkable precondition is easy to skip). **Genuine cross-link finding
  recorded**: `math.cx.complex-numbers-analysis` has an authored Blueprint (verified via directory
  listing) whose content (modulus, conjugation) was genuinely reused in this entry's own P76
  transfer probe — but the math.cx domain itself has zero authored Educational Brain entries yet,
  so this connection is currently one-directional; flagged as a standing note for when that domain
  is eventually reached.

No genuine content-overlap or metadata discrepancy was found in either entry against any
already-authored sibling.

`math.alg` **40/59 → 42/59**, still IN PROGRESS. Mathematics **285/908 → 287/908**. Topologically
next-ready `math.alg` candidates deliberately NOT pre-computed for a Wave 12 selection this batch,
per this program's own "re-derive the frontier fresh each batch" discipline — the frontier is
expected to include `math.alg.quadratic-formula` (newly unblocked by completing-the-square). All
tracking files updated in the same commit: `ROADMAP.md` Section 1/2 totals regenerated from source,
`COVERAGE.md`'s math.alg summary row and this Delivery history entry, `CLAUDE.md`'s campaign
section. `EDUCATIONAL_BRAIN_INDEX.md` and `QUALITY.md` again deferred (same generated-artifact
rationale as Batches 57-64). Re-verified:
`npx tsx scripts/validate-knowledge-graph.ts docs/mathematics/kg/graph.json` PASS, 908/908
reachable, 0 failures, 0 warnings (KG file untouched); 0 orphan EB files; 0 duplicate EB files (via
`scripts/math/state.ts`); `npx tsc --noEmit` clean; targeted tests `mathPackageCorpus.test.ts` +
`mathematicsAssetContract.test.ts` 479/479 passed. Both new entries' heading structure diffed clean
against `math.alg.like-terms.md` (0 diffs, exact 21-section Standard match). No Physics, Chemistry,
English, Biology, Computer Science, KG, Blueprint, or runtime file was modified. This is the sixth
batch run under the autonomous `/loop 60s` mode (loop iteration 6) — subsequent batches continue
automatically per the loop's own standing prompt.

### Batch 66 — math.alg Wave 12 part 1 (2026-09-11, Mathematics Educational Brain completion
campaign, autonomous loop, /loop 60s)

Re-computed the topologically-ready `math.alg` frontier programmatically against the live KG and
the live EB directory (post-Batch-65, math.alg 42/59): 5 concepts had every prerequisite already
authored — `math.alg.quadratic-formula`, `math.alg.rational-root-theorem`,
`math.alg.fundamental-theorem-algebra`, `math.alg.polynomial-inequality`,
`math.alg.vietas-formulas`. All 5 Blueprints were read in full this batch, but per an explicit
mid-batch user instruction to stop, only 1 concept was authored, validated, and committed —
matching this program's own established precedent for closing out a partial wave as its own
smaller batch rather than leaving uncommitted work.

- **`math.alg.quadratic-formula`** (proficient/apply, mastery 0.9, 5 hr, unlocks
  `math.alg.discriminant`) — the symbolic generalisation of `math.alg.completing-the-square`'s own
  already-verified non-monic procedure (run with a, b, c as symbols instead of specific numbers),
  plus the formula's practical payoff as a direct-substitution computational shortcut, plus an
  orientation-level preview of the discriminant's role. 3 misconceptions: MC-1
  FORMULA-ASSUMED-UNRELATED-TO-COMPLETING-SQUARE (Type 5 — instruction-induced, FOUNDATIONAL, the
  formula often drilled as a standalone fact before its derivation is genuinely internalised), MC-2
  RE-DERIVATION-ASSUMED-NECESSARY-EACH-TIME (Type 1 — overgeneralization, high severity, the
  derivation PROCESS mistaken for the reusable tool instead of its OUTPUT), MC-3
  ROOT-COUNT-ASSUMED-TO-REQUIRE-FULL-SOLVING (Type 1 — overgeneralization, moderate). No genuine
  content-overlap or metadata discrepancy found against any already-authored sibling; the explicit
  division of labour with `math.alg.completing-the-square` (that concept owns the general
  procedure, this concept owns its symbolic generalisation) is confirmed as deliberate and
  coordinated.

`math.alg` **42/59 → 43/59**, still IN PROGRESS. Mathematics **287/908 → 288/908**. The remaining
4 concepts already Blueprint-read this batch — `math.alg.rational-root-theorem`,
`math.alg.fundamental-theorem-algebra`, `math.alg.polynomial-inequality`,
`math.alg.vietas-formulas` — are deferred to a future batch (Wave 12 part 2), to be re-verified
fresh against the live KG/EB state at that time per this program's own standing discipline, not
assumed still ready without re-checking. All tracking files updated in the same commit:
`ROADMAP.md` Section 1/2 totals regenerated from source, `COVERAGE.md`'s math.alg summary row and
this Delivery history entry, `CLAUDE.md`'s campaign section. `EDUCATIONAL_BRAIN_INDEX.md` and
`QUALITY.md` again deferred (same generated-artifact rationale as Batches 57-65). Re-verified:
`npx tsx scripts/validate-knowledge-graph.ts docs/mathematics/kg/graph.json` PASS, 908/908
reachable, 0 failures, 0 warnings (KG file untouched); 0 orphan EB files; 0 duplicate EB files (via
`scripts/math/state.ts`); `npx tsc --noEmit` clean; targeted tests `mathPackageCorpus.test.ts` +
`mathematicsAssetContract.test.ts` 479/479 passed. The new entry's heading structure diffed clean
against `math.alg.like-terms.md` (0 diffs, exact 21-section Standard match). No Physics, Chemistry,
English, Biology, Computer Science, KG, Blueprint, or runtime file was modified. This is the
seventh batch run under the autonomous `/loop 60s` mode (loop iteration 7, closed early per
explicit user instruction) — subsequent batches continue automatically per the loop's own standing
prompt.

### Batch 67 — math.alg Wave 12 part 2 (2026-09-11, Mathematics Educational Brain completion
campaign, autonomous loop)

Session start: pulled 2 concurrent, unrelated commits from `origin/main` (`60bd8c7`, `bd96bcb` —
test-file corpus-count-check updates, zero file overlap with this program's own files) via a clean
fast-forward merge before continuing. Re-computed the topologically-ready `math.alg` frontier
programmatically against the live KG and the live EB directory (post-Batch-66, math.alg 43/59):
5 concepts had every prerequisite already authored — `math.alg.discriminant` (newly unblocked by
`quadratic-formula`), `math.alg.fundamental-theorem-algebra`, `math.alg.polynomial-inequality`,
`math.alg.rational-root-theorem`, `math.alg.vietas-formulas`. All 5 Blueprints were read this
batch, but per a second explicit mid-batch user instruction to stop, only 2 concepts were authored,
validated, and committed — matching this program's own established precedent (see Batch 66) for
closing out a partial wave as its own smaller batch rather than leaving uncommitted work.

- **`math.alg.discriminant`** (proficient/analyze, mastery 0.85, 3 hr) — the full development of
  `math.alg.quadratic-formula`'s own deliberately-deferred orientation-level discriminant preview:
  the three-way root-type classification (positive/zero/negative) grounded directly in the
  formula's own radical term. 3 misconceptions: MC-1 ZERO-DISCRIMINANT-CONFUSED-WITH-NO-SOLUTION
  (Type 3 — language contamination, FOUNDATIONAL, "zero" colloquially read as "nothing"), MC-2
  NEGATIVE-DISCRIMINANT-CONCLUDED-AS-NO-SOLUTION-RATHER-THAN-COMPLEX (Type 3 — language
  contamination, FOUNDATIONAL, the identical underlying confusion as MC-1 from a different angle),
  MC-3 DISCRIMINANT-FORMULA-SIGN-ERROR (Type 4 — notation-induced, moderate). No genuine
  content-overlap or metadata discrepancy found; the deliberate deferral from
  `quadratic-formula`'s own LO3 is confirmed fulfilled.
- **`math.alg.rational-root-theorem`** (proficient/apply, mastery 0.8, 4 hr, cross-domain
  requires `math.nt.divisibility`) — a targeted, systematic search strategy for rational roots of
  an integer-coefficient polynomial, with explicit attention to the theorem's own scope limits (it
  narrows a search, never guarantees a root; it says nothing about irrational or complex roots).
  3 misconceptions: MC-1 CANDIDATE-TESTING-ABANDONED-AFTER-ONE-FAILURE (Type 1 —
  overgeneralization, FOUNDATIONAL), MC-2 NO-RATIONAL-ROOTS-CONCLUDED-AS-NO-ROOTS-AT-ALL (Type 1 —
  overgeneralization, FOUNDATIONAL), MC-3 DIVISOR-LIST-INCOMPLETE (Type 5 — instruction-induced,
  moderate). **First genuine exercised cross-domain dependency in this campaign's math.alg work**:
  this concept's second requirement, `math.nt.divisibility`, connects directly to the already-
  CERTIFIED `math.nt` domain — recorded as a confirmed, working connection, not a finding.

`math.alg` **43/59 → 45/59**, still IN PROGRESS. Mathematics **288/908 → 290/908**. The remaining
3 already-Blueprint-read candidates this batch —
`math.alg.fundamental-theorem-algebra`, `math.alg.polynomial-inequality`,
`math.alg.vietas-formulas` — are deferred to a future batch (Wave 12 part 3), to be re-verified
fresh against live state rather than assumed still ready. All tracking files updated in the same
commit: `ROADMAP.md` Section 1/2 totals regenerated from source, `COVERAGE.md`'s math.alg summary
row and this Delivery history entry, `CLAUDE.md`'s campaign section. `EDUCATIONAL_BRAIN_INDEX.md`
and `QUALITY.md` again deferred (same generated-artifact rationale as Batches 57-66). Re-verified:
`npx tsx scripts/validate-knowledge-graph.ts docs/mathematics/kg/graph.json` PASS, 908/908
reachable, 0 failures, 0 warnings (KG file untouched); 0 orphan EB files; 0 duplicate EB files (via
`scripts/math/state.ts`); `npx tsc --noEmit` clean; targeted tests `mathPackageCorpus.test.ts` +
`mathematicsAssetContract.test.ts` 479/479 passed. Both new entries' heading structure diffed
clean against `math.alg.like-terms.md` (0 diffs, exact 21-section Standard match). No Physics,
Chemistry, English, Biology, Computer Science, KG, Blueprint, or runtime file was modified. This
batch was closed early per a second explicit user instruction mid-wave — the autonomous
`/loop 60s` mode remains available to continue further batches when the campaign resumes.

### Batch 68 — math.alg Wave 12 part 3 (2026-09-11, Mathematics Educational Brain completion
campaign)

Re-computed the topologically-ready `math.alg` frontier programmatically against the live KG and
the live EB directory (post-Batch-67, math.alg 45/59): exactly the 3 concepts deferred from
Batch 67 remained ready — `math.alg.fundamental-theorem-algebra`,
`math.alg.polynomial-inequality`, `math.alg.vietas-formulas` — re-verified fresh rather than
assumed still ready, per this program's own standing discipline. All 3 Blueprints (already read in
a prior turn) were reused by reference.

- **`math.alg.fundamental-theorem-algebra`** (advanced/understand, mastery 0.85, 5 hr, cross-link
  `math.cx.fundamental-theorem-algebra` not yet authored) — the theorem's genuine MINIMAL claim
  (at least one complex root exists) versus the "exactly n roots" statement
  `math.alg.polynomial-roots` uses operationally, derived as a corollary via repeated application;
  the orientation-level acknowledgment that the proof is genuinely analytic (Liouville's theorem),
  not algebraic, despite the theorem's name and algebraic use. 3 misconceptions: MC-1
  EXACTLY-N-ROOTS-ASSUMED-MINIMAL-STATEMENT (Type 5 — instruction-induced, FOUNDATIONAL), MC-2
  EXACTLY-N-ASSUMED-SEPARATELY-PROVED (Type 1 — overgeneralization, high severity), MC-3
  FTA-ASSUMED-TO-HAVE-ALGEBRAIC-PROOF (Type 5 — instruction-induced, moderate). **Genuine
  Curriculum Feedback finding**: this concept's own cross-link, `math.cx.fundamental-theorem-
  algebra`, was verified to have no Blueprint yet either (unlike `polynomial-roots`'s own
  `math.cx.complex-numbers-analysis` cross-link, which DOES have an authored Blueprint) — a
  distinct, less-fulfilled cross-link state, recorded as its own standing note.
- **`math.alg.polynomial-inequality`** (proficient/apply, mastery 0.75, 6 hr) — the four-step
  sign-chart procedure (find roots, divide into intervals, test each, select matching intervals),
  with two genuinely separate subtleties: strict-vs-non-strict endpoint inclusion, and
  odd-vs-even-multiplicity sign-flip behaviour. 3 misconceptions: MC-1 ENDPOINT-INCLUSION-NOT-
  MATCHED-TO-INEQUALITY-STRICTNESS (Type 4 — notation-induced, FOUNDATIONAL), MC-2 SIGN-ASSUMED-
  TO-FLIP-AT-EVERY-ROOT-REGARDLESS-OF-MULTIPLICITY (Type 1 — overgeneralization, FOUNDATIONAL,
  named by the Blueprint itself as revealing a structural misunderstanding of why sign charts work
  at all), MC-3 SIGN-CHART-TEST-POINT-CHOSEN-ON-A-ROOT (Type 4 — notation-induced, moderate).
- **`math.alg.vietas-formulas`** (proficient/apply, mastery 0.75, 5 hr) — coefficient-to-root
  symmetric-function relationships for quadratics and cubics, derivable directly from matching
  coefficients in the expanded factored form, plus their genuine bidirectional (reverse-
  construction) applicability. 3 misconceptions: MC-1 LEADING-COEFFICIENT-DIVISION-OMITTED-IN-
  VIETAS-FORMULAS (Type 1 — overgeneralization, FOUNDATIONAL, a classic "worked until it didn't"
  pattern since a=1 makes the omission invisible), MC-2 CUBIC-VIETAS-SIGN-PATTERN-MISAPPLIED
  (Type 5 — instruction-induced, foundational), MC-3 VIETAS-FORMULAS-REVERSE-DIRECTION-NOT-
  RECOGNIZED (Type 1 — overgeneralization, moderate). **Genuine unnamed connection identified,
  recorded not fixed**: `math.alg.factoring-trinomials`'s own product/sum search procedure
  (authored earlier in this domain's wave sequence) is, in substance, Vieta's quadratic-case
  formulas applied in reverse — not fixed (no prior entry modified), recorded as the forward-
  pointing half of the cross-reference per this program's own convention of not retroactively
  editing already-certified content.

`math.alg` **45/59 → 48/59**, still IN PROGRESS — **only 11 concepts remain before the domain
reaches DOMAIN CERTIFICATION**, the fifth domain to do so after math.found, math.geom, math.arith,
math.nt. Mathematics **290/908 → 293/908**. Topologically next-ready `math.alg` candidates
deliberately NOT pre-computed for a further wave this batch, per this program's own "re-derive the
frontier fresh each batch" discipline. All tracking files updated in the same commit:
`ROADMAP.md` Section 1/2 totals regenerated from source, `COVERAGE.md`'s math.alg summary row and
this Delivery history entry, `CLAUDE.md`'s campaign section. `EDUCATIONAL_BRAIN_INDEX.md` and
`QUALITY.md` again deferred (same generated-artifact rationale as Batches 57-67). Re-verified:
`npx tsx scripts/validate-knowledge-graph.ts docs/mathematics/kg/graph.json` PASS, 908/908
reachable, 0 failures, 0 warnings (KG file untouched); 0 orphan EB files; 0 duplicate EB files (via
`scripts/math/state.ts`); `npx tsc --noEmit` clean; targeted tests `mathPackageCorpus.test.ts` +
`mathematicsAssetContract.test.ts` 479/479 passed. All 3 new entries' heading structure diffed
clean against `math.alg.like-terms.md` (0 diffs, exact 21-section Standard match). No Physics,
Chemistry, English, Biology, Computer Science, KG, Blueprint, or runtime file was modified.

### Batch 69 — math.alg Wave 13 (2026-09-11, Mathematics Educational Brain completion campaign)

Re-computed the topologically-ready `math.alg` frontier programmatically against the live KG and
the live EB directory (post-Batch-68, math.alg 48/59): exactly 2 concepts — `math.alg.complex-
polynomial-roots`, `math.alg.rational-inequality`. Both Blueprints read in full and reused by
reference.

- **`math.alg.complex-polynomial-roots`** (advanced/apply, mastery 0.75, 4 hr, requires
  `math.alg.fundamental-theorem-algebra` + `math.found.complex-numbers`, no cross_links) — the
  conjugate-root theorem for real-coefficient polynomials (a non-real root $a+bi$ guarantees
  $a-bi$ is also a root, via conjugating the polynomial equation term by term since real
  coefficients equal their own conjugates), combined with FTA to complete partial root lists, and
  the "factoring over the reals" procedure (a conjugate pair combines into ONE irreducible real
  quadratic, never two separate complex linear factors). 3 misconceptions: MC-1 CONJUGATE-PAIR-
  INFERENCE-TREATED-AS-NEEDING-VERIFICATION (Type 5 — instruction-induced, over-generalizing the
  good habit "always verify by substitution" onto a guaranteed structural fact, moderate), MC-2
  COMPLEX-CONJUGATE-PAIR-FACTORED-AS-SEPARATE-COMPLEX-LINEAR-FACTORS-OVER-REALS (Type 4 —
  notation-induced, the factor-theorem notation $(x-r)$ applied uniformly regardless of whether
  $r$ is real, FOUNDATIONAL — ranked most severe per the Blueprint's own framing, "a genuine
  misunderstanding of what factoring over the reals REQUIRES"), MC-3 ROOT-COUNT-MISMATCHED-
  AGAINST-POLYNOMIAL-DEGREE (Type 1 — overgeneralization, treating "I've found what I can find
  easily" as "I've found everything," FOUNDATIONAL). **Genuine Curriculum Feedback finding**: the
  Blueprint's own Component 7 names `math.alg.rational-root-theorem` as a sibling concept
  ("addressing a different subset of possible roots"); checked directly, that already-authored
  entry (Batch 11) does not name this concept back — recorded as a one-directional forward note,
  per this program's established convention of not retroactively editing an already-committed
  entry.
- **`math.alg.rational-inequality`** (proficient/apply, mastery 0.75, 6 hr, requires
  `math.alg.rational-expressions` + `math.alg.polynomial-inequality`, no cross_links) — extends
  the already-secured polynomial-inequality sign-chart procedure unchanged, adding critical points
  from TWO sources (numerator AND denominator zeros) and a source-dependent endpoint rule (a
  numerator zero follows the inequality's strictness; a denominator zero is ALWAYS excluded,
  unconditionally, since the expression is undefined there); also covers why cross-multiplying a
  rational inequality by its variable-sign denominator (unlike an equation) is unsafe, since the
  sign flip direction cannot be determined in advance. 3 misconceptions: MC-1 DENOMINATOR-ZERO-
  INCLUDED-FOR-NON-STRICT-INEQUALITY (Type 1 — overgeneralization, applying the correct
  numerator-zero inclusion rule uniformly without noticing a denominator zero is undefined, not
  zero, FOUNDATIONAL), MC-2 RATIONAL-INEQUALITY-CROSS-MULTIPLIED-DIRECTLY (Type 1 —
  overgeneralization, carrying the safe equation-solving cross-multiplication habit into
  inequality-solving where it is unsafe, FOUNDATIONAL), MC-3 SIGN-CHART-CRITICAL-POINTS-MISSING-
  DENOMINATOR-ZEROS (Type 5 — instruction-induced, the single-source critical-point search habit
  from `math.alg.polynomial-inequality` carrying over without the new denominator check being
  explicitly triggered, FOUNDATIONAL). **Fulfills a standing forward-work note**:
  `math.alg.polynomial-inequality`'s own already-authored entry (Batch 68) explicitly named this
  concept as an unauthored sibling in both its Transfer Connections and Curriculum Feedback
  sections — this entry confirms the named technique reuse (the sign-chart mechanics are directly
  reused unchanged) is accurate.

`math.alg` **48/59 → 50/59**, still IN PROGRESS — **only 9 concepts remain before the domain
reaches DOMAIN CERTIFICATION**, the fifth domain to do so after math.found, math.geom, math.arith,
math.nt. Mathematics **293/908 → 295/908**. Topologically next-ready `math.alg` candidates
deliberately NOT pre-computed for a further wave this batch, per this program's own "re-derive the
frontier fresh each batch" discipline. All tracking files updated in the same commit:
`ROADMAP.md` Section 1/2 totals regenerated from source, `COVERAGE.md`'s math.alg summary row and
this Delivery history entry, `CLAUDE.md`'s campaign section. `EDUCATIONAL_BRAIN_INDEX.md` and
`QUALITY.md` again deferred (same generated-artifact rationale as Batches 57-68). Re-verified:
`npx tsx scripts/validate-knowledge-graph.ts docs/mathematics/kg/graph.json` PASS, 908/908
reachable, 0 failures, 0 warnings (KG file untouched); 0 orphan EB files; 0 duplicate EB files (via
`scripts/math/state.ts`); `npx tsc --noEmit` clean; targeted tests `mathPackageCorpus.test.ts` +
`mathematicsAssetContract.test.ts` 479/479 passed. Both new entries' heading structure diffed
clean against `math.alg.like-terms.md` (0 diffs, exact 21-section Standard match). No Physics,
Chemistry, English, Biology, Computer Science, KG, Blueprint, or runtime file was modified.

### Batch 14 — math.alg-unblocking cross-domain excursion into math.disc + math.func
(2026-09-11, Mathematics Educational Brain completion campaign)

Re-computed the topologically-ready `math.alg` frontier programmatically against the live KG and
the live EB directory (post-Batch-13, math.alg 50/59): **0 pure-`math.alg` candidates** — all 9
remaining concepts require a prerequisite outside `math.alg`. Traced the blocking chain
programmatically: 7 concepts (`change-of-base`, `exponential-equations`, `exponential-function`,
`logarithm`, `logarithm-properties`, `logarithmic-equations`, `natural-logarithm`) form a single
chain blocked only by `math.func.function-concept`; 2 concepts (`binomial-theorem`,
`pascals-triangle`) are blocked by `math.disc.combinations`, which is itself blocked by
`math.disc.permutations`, which is itself blocked by `math.disc.counting-principles`. Both
`math.func.function-concept` and `math.disc.counting-principles` were verified, programmatically,
to be IMMEDIATELY ready (both concepts' own KG-declared prerequisites already authored) — a small,
deliberately bounded cross-domain excursion, matching this program's established precedent (the
`math.nt.divisibility`/`gcd`/`lcm` excursion for `rational-root-theorem`; the `math.geom.triangle`
→`pythagorean-theorem` chain for `math.nt.pythagorean-triples`). Both Blueprints read in full and
reused by reference.

- **`math.disc.counting-principles`** (developing/apply, mastery 0.95 — the highest threshold
  encountered so far in this campaign, MAMR 5/5, 3 hr, requires `math.arith.multiplication` +
  `math.found.set-theory`, unlocks `math.disc.combinatorics`) — the FIRST `math.disc` entry
  authored by this program. The multiplication principle (independent sequential choices multiply,
  $m\times n$) versus the addition principle (mutually exclusive choices add, $m+n$), with the
  AND/OR classification test as the concept's real "threshold concept" (per the Blueprint's own
  framing) rather than the arithmetic itself, plus chaining across multiple stages and an
  independence/overlap check. 3 misconceptions: MC-1 ADDITION-NOT-MULTIPLICATION (Type 1 —
  overgeneralization, the sole FOUNDATIONAL-flagged misconception in the Blueprint's own registry),
  MC-2 MULTIPLICATION-NOT-ADDITION (Type 1 — overgeneralization, moderate), MC-3
  INDEPENDENCE-IGNORED (Type 1 — overgeneralization, moderate). **Note on Blueprint format**: this
  Blueprint uses a different internal labelling convention (`TA-A01`/`TA-B01`/numbered Components)
  than most `math.alg` Blueprints seen so far (`A01`/`B01`/lettered Components) — recorded, not
  normalized away, since the underlying content maps onto the Standard's sections identically
  either way.
- **`math.func.function-concept`** (proficient/understand, mastery 0.85, MAMR 5/5, 8 hr — the
  highest hour estimate encountered so far in this campaign's math.alg-adjacent work, requires
  `math.found.function-set-theoretic` + `math.found.variable`, cross-links
  `math.found.function-set-theoretic`, unlocks `math.func.linear-function` +
  `math.func.quadratic-function`) — the FIRST `math.func` entry authored by this program, and the
  single highest-leverage concept remaining for `math.alg` domain certification (unblocks 7 of the
  9 remaining `math.alg` concepts at once, the entire exponential/logarithm family). The function
  definition (each input exactly one output; many-to-one explicitly ALLOWED), multi-representation
  fluency (diagrams, tables, ordered pairs, graphs, verbal rules, formulas — no representation
  privileged), the domain/codomain/range three-way distinction, and function-notation evaluation.
  4 misconceptions: MC-1 RANGE-AND-CODOMAIN-CONFLATED (Type 5 — instruction-induced), MC-2
  FUNCTIONS-MUST-HAVE-ALGEBRAIC-FORMULAS (Type 5 — instruction-induced), MC-3
  F(X)-MEANS-F-MULTIPLIED-BY-X (Type 4 — notation-induced, the Blueprint's own registry marks this
  FOUNDATIONAL FOR MC-4 — must be cleared first, since MC-4's own repair requires correct
  function-notation evaluation to demonstrate), MC-4 ONE-TO-ONE-IS-THE-DEFINITION-OF-A-FUNCTION
  (Type 3 — language contamination, from the linguistically symmetric-sounding "each input has one
  output" being misread bidirectionally). **Genuine Blueprint/KG metadata discrepancy found and
  resolved toward the KG, per established convention**: the Blueprint's Component 0 states
  `requires: [math.found.variable, math.found.set-theory]`,
  `unlocks: [math.func.linear-function, math.func.quadratic-function, math.func.composite-function,
  math.func.inverse-function]` (4 concepts), `cross_links: [math.found.set-theory]`; the live KG
  instead records `requires: [math.found.function-set-theoretic, math.found.variable]`,
  `unlocks: [math.func.linear-function, math.func.quadratic-function]` (2 concepts, not 4), and
  `cross_links: [math.found.function-set-theoretic]` — this entry follows the KG throughout,
  reinterpreting the Blueprint's `math.found.set-theory` references as the more specific
  `math.found.function-set-theoretic` node.

`math.alg` remains at **50/59** this batch — deliberately, since neither newly-authored concept is
itself a `math.alg` concept; both unblock further math.alg progress rather than directly advancing
it. `math.disc` **0/32 → 1/32**. `math.func` **0/29 → 1/29**. Mathematics **295/908 → 297/908**.
With `math.func.function-concept` now authored, `math.alg.exponential-function` becomes the next
topologically-ready `math.alg` candidate (unblocking, in turn, `logarithm` and
`exponential-equations`); with `math.disc.counting-principles` now authored,
`math.disc.permutations` becomes the next topologically-ready `math.disc` candidate. Neither wave
was pre-computed further this batch, per this program's own "re-derive the frontier fresh each
batch" discipline. All tracking files updated in the same commit: `ROADMAP.md` Section 1/2 totals
and domain table regenerated from source (including new `math.disc`/`math.func` rows),
`COVERAGE.md`'s mathematics summary row and this Delivery history entry, `CLAUDE.md`'s campaign
section. `EDUCATIONAL_BRAIN_INDEX.md` and `QUALITY.md` again deferred (same generated-artifact
rationale as prior batches). Re-verified: `npx tsx scripts/validate-knowledge-graph.ts
docs/mathematics/kg/graph.json` PASS, 908/908 reachable, 0 failures, 0 warnings (KG file
untouched); 0 orphan EB files; 0 duplicate EB files (via `scripts/math/state.ts`); `npx tsc
--noEmit` clean; targeted tests `mathPackageCorpus.test.ts` + `mathematicsAssetContract.test.ts`
479/479 passed. Both new entries' heading structure diffed clean against `math.alg.like-terms.md`
(0 diffs, exact 21-section Standard match). No Physics, Chemistry, English, Biology, Computer
Science, KG, Blueprint, or runtime file was modified.

### Batch 15 — math.alg-unblocking cross-domain excursion continued
(2026-09-11, Mathematics Educational Brain completion campaign)

Re-computed the topologically-ready frontier programmatically against the live KG and the live EB
directory (post-Batch-14, math.alg 50/59, math.disc 1/32, math.func 1/29): `math.alg` had exactly
1 candidate now ready — `math.alg.exponential-function`, unblocked by Batch 14's
`math.func.function-concept` — and `math.disc.permutations` was ready (unblocked by Batch 14's
`math.disc.counting-principles`). Both Blueprints read in full and reused by reference; both
verified against the live KG with 0 metadata discrepancies this time (both Blueprints' Component 0
matched the KG's `requires`/`unlocks`/`cross_links` fields exactly).

- **`math.alg.exponential-function`** (proficient/understand, mastery 0.85, MAMR 5/5, 8 hr,
  requires `math.alg.exponent-rules` + `math.func.function-concept`, unlocks
  `math.alg.logarithm`, cross-links `math.func.exponential-function` — verified not yet authored,
  independence mode) — $f(x)=a^x$ with $a>0,a\ne1$; growth ($a>1$) versus decay ($0<a<1$), shared
  features (always positive, $y$-intercept always $(0,1)$, horizontal asymptote $y=0$); the
  critical structural distinction between the exponential function (variable in the exponent) and
  the power function $x^a$ (variable in the base). 3 misconceptions: MC-1
  EXPONENTIAL-CONFLATED-WITH-POWER-FUNCTION (Type 3 — language contamination, FOUNDATIONAL, the
  Blueprint's own most-extensively-treated misconception), MC-2
  BASE-RESTRICTIONS-TREATED-AS-ARBITRARY (Type 5 — instruction-induced, moderate), MC-3
  Y-INTERCEPT-ASSUMED-TO-VARY-BY-BASE (Type 1 — overgeneralization, moderate). Directly fulfills
  the highest-leverage forward-work note in this campaign's math.alg work
  (`math.func.function-concept`'s own Batch 14 entry named this as the next unblocked candidate);
  now itself unblocks `math.alg.logarithm` per the KG's own `unlocks` field.
- **`math.disc.permutations`** (developing/apply, mastery 0.9, MAMR 5/5, 4 hr, requires
  `math.disc.counting-principles` + `math.arith.multiplication`, unlocks
  `math.disc.combinations`) — the ordered-arrangement formula $P(n,r)=n!/(n-r)!$ derived directly
  from the multiplication principle as a chain of sequential choices, plus three named variants
  (circular $(n-1)!$, repetition-allowed $n^r$, identical-objects $n!/(n_1!n_2!\cdots)$), and the
  order-matters test that separates a permutation problem from any other counting problem. 3
  misconceptions: MC-1 PERMUTATION-ASSUMED-SYNONYMOUS-WITH-ANY-SELECTION (Type 1 —
  overgeneralization, FOUNDATIONAL), MC-2 IDENTICAL-OBJECTS-OVERCOUNTED-WITH-NAIVE-FACTORIAL
  (Type 1 — overgeneralization, FOUNDATIONAL), MC-3 CIRCULAR-PERMUTATION-COUNTED-AS-LINEAR
  (Type 1 — overgeneralization, moderate). Continues the bounded `math.disc` excursion, unblocking
  `math.disc.combinations` — itself the final blocker for both remaining math.alg concepts
  (`binomial-theorem`, `pascals-triangle`).

`math.alg` **50/59 → 51/59** (still IN PROGRESS, 8 concepts remain: 2 via `math.disc`, 6 via the
`math.func`-unblocked `logarithm` family). `math.disc` **1/32 → 2/32**. `math.func` remains at
**1/29** this batch (no new `math.func` concept authored — `exponential-function` is a `math.alg`
concept). Mathematics **297/908 → 299/908**. Topologically next-ready candidates: with
`exponential-function` authored, `math.alg.logarithm` is next-ready in math.alg; with
`permutations` authored, `math.disc.combinations` is next-ready in math.disc (and, once authored,
unblocks both remaining math.alg concepts at once). Neither pre-computed further this batch, per
this program's own "re-derive the frontier fresh each batch" discipline. All tracking files
updated in the same commit: `ROADMAP.md` Section 1/2 totals and domain table regenerated from
source, `COVERAGE.md`'s mathematics summary row and this Delivery history entry, `CLAUDE.md`'s
campaign section. `EDUCATIONAL_BRAIN_INDEX.md` and `QUALITY.md` again deferred (same
generated-artifact rationale as prior batches). Re-verified: `npx tsx
scripts/validate-knowledge-graph.ts docs/mathematics/kg/graph.json` PASS, 908/908 reachable, 0
failures, 0 warnings (KG file untouched); 0 orphan EB files; 0 duplicate EB files (via `scripts/
math/state.ts`); `npx tsc --noEmit` clean; targeted tests `mathPackageCorpus.test.ts` +
`mathematicsAssetContract.test.ts` 479/479 passed. Both new entries' heading structure diffed
clean against `math.alg.like-terms.md` (0 diffs, exact 21-section Standard match). No Physics,
Chemistry, English, Biology, Computer Science, KG, Blueprint, or runtime file was modified.

### Batch 16 — math.alg-unblocking cross-domain excursion, third continuation
(2026-09-11, Mathematics Educational Brain completion campaign)

Re-computed the topologically-ready frontier programmatically against the live KG and the live EB
directory (post-Batch-15, math.alg 51/59, math.disc 2/32, math.func 1/29): `math.alg` had 2
candidates ready — `math.alg.logarithm` and `math.alg.exponential-equations`, both unblocked by
Batch 15's `math.alg.exponential-function` — and `math.disc.combinations` was ready (unblocked by
Batch 15's `math.disc.permutations`). All three Blueprints read in full and reused by reference,
verified against the live KG with 0 metadata discrepancies for `logarithm` and `combinations`; one
genuine requires/unlocks asymmetry found for `exponential-equations` (its own KG `unlocks` field
names `math.alg.logarithm`, but `logarithm`'s own KG `requires` field does not name it back —
recorded in both entries' Curriculum Feedback, not fixed, no KG file modified).

- **`math.alg.logarithm`** (proficient/understand, mastery 0.8, MAMR 4/5, 10 hr — the highest hour
  estimate in this campaign so far, requires `math.alg.exponential-function`, unlocks
  `math.alg.logarithmic-equations`, cross-links `math.calc.derivative-ln` — verified not yet
  authored, independence mode) — the logarithm defined as the exponential function's inverse
  ($\log_a(x)=y \iff a^y=x$), the domain restriction $x>0$ DERIVED (not stated) from the
  exponential function's always-positive range, and the logarithm/exponential composition as one
  instance of the general inverse-function principle. 3 misconceptions: MC-1
  LOGARITHM-OF-NONPOSITIVE-NUMBER-ASSUMED-COMPUTABLE (Type 5 — instruction-induced, the Blueprint's
  own most-extensively-treated misconception), MC-2
  LOGARITHM-EXPONENTIAL-INVERSE-RELATIONSHIP-NOT-RECOGNIZED (Type 1 — overgeneralization,
  moderate), MC-3 BASE-OF-LOGARITHM-CONFUSED-WITH-BASE-OF-EXPONENTIAL-DEFINITION (Type 4 —
  notation-induced, moderate). Fulfills the highest-leverage forward-work note left by
  `math.alg.exponential-function` (Batch 15); now itself unblocks `math.alg.logarithm-properties`
  and `math.alg.natural-logarithm` (both KG-declared children).
- **`math.alg.exponential-equations`** (proficient/apply, mastery 0.80, MAMR 4/5, 5 hr, requires
  `math.alg.exponential-function`, no KG unlocks) — the same-base method (rewrite both sides as
  powers of one base, equate exponents, relying on the exponential function's one-to-one property)
  versus the logarithm method (take logs of both sides, apply the power rule), and the
  method-selection judgment separating when each applies. 3 misconceptions: MC-1
  SAME-BASE-METHOD-FORCED-WITHOUT-A-GENUINE-COMMON-BASE (Type 1 — overgeneralization,
  FOUNDATIONAL), MC-2 LOGARITHM-POWER-RULE-MISAPPLIED (Type 4 — notation-induced, FOUNDATIONAL,
  ranked most severe per the Blueprint's own Teaching Notes as "the single mechanism making the
  logarithm method work at all"), MC-3 EXPONENTIAL-EQUATION-SOLUTION-LEFT-UNCHECKED (Type 1 —
  overgeneralization, moderate).
- **`math.disc.combinations`** (developing/apply, mastery 0.9, MAMR 5/5, 4 hr, requires
  `math.disc.permutations`, unlocks `math.disc.binomial-theorem` + `math.disc.inclusion-exclusion`,
  cross-links `math.alg.binomial-theorem` — the concept this program's entire math.disc excursion
  exists to unblock) — $C(n,r)=n!/(r!(n-r)!)$ derived directly from $P(n,r)$ by dividing out
  redundant internal orderings, Pascal's identity proved via a COMBINATORIAL "in-or-out" split
  (not algebraic manipulation, per this corpus's standing preference for conceptual proofs), the
  subset-counting identity $\sum C(n,k)=2^n$, and the order-matters test applied PER SUB-TASK
  within a multi-stage problem. 3 misconceptions: MC-1
  COMBINATIONS-AND-PERMUTATIONS-TREATED-AS-INTERCHANGEABLE (Type 1 — overgeneralization,
  FOUNDATIONAL), MC-2 DIVISION-BY-R-FACTORIAL-OMITTED (Type 1 — overgeneralization, FOUNDATIONAL),
  MC-3 PASCALS-IDENTITY-TREATED-AS-UNMOTIVATED-ALGEBRA (Type 5 — instruction-induced, moderate).
  Directly unblocks `math.alg.binomial-theorem` (its own KG `requires` field now fully satisfied),
  which in turn unblocks `math.alg.pascals-triangle` — closing the math.disc side of this
  program's math.alg-unblocking excursion.

`math.alg` **51/59 → 53/59** (6 remain: `binomial-theorem`, `change-of-base`,
`logarithm-properties`, `logarithmic-equations`, `natural-logarithm`, `pascals-triangle` — 3
already topologically ready: `binomial-theorem` via the now-authored `combinations`,
`logarithm-properties`/`natural-logarithm` via the now-authored `logarithm`). `math.disc`
**2/32 → 3/32**. `math.func` remains at **1/29** this batch (neither new concept is `math.func`).
Mathematics **299/908 → 302/908**. Topologically next-ready candidates:
`math.alg.binomial-theorem`, `math.alg.logarithm-properties`, `math.alg.natural-logarithm` — all
three verified ready via a fresh frontier computation, none pre-authored this batch, per this
program's own "re-derive the frontier fresh each batch" discipline. All tracking files updated in
the same commit: `ROADMAP.md` Section 1/2 totals and domain table regenerated from source,
`COVERAGE.md`'s mathematics summary row and this Delivery history entry, `CLAUDE.md`'s campaign
section. `EDUCATIONAL_BRAIN_INDEX.md` and `QUALITY.md` again deferred (same generated-artifact
rationale as prior batches). Re-verified: `npx tsx scripts/validate-knowledge-graph.ts
docs/mathematics/kg/graph.json` PASS, 908/908 reachable, 0 failures, 0 warnings (KG file
untouched); 0 orphan EB files; 0 duplicate EB files (via `scripts/math/state.ts`); `npx tsc
--noEmit` clean; targeted tests `mathPackageCorpus.test.ts` + `mathematicsAssetContract.test.ts`
479/479 passed. All 3 new entries' heading structure diffed clean against `math.alg.like-terms.md`
(0 diffs, exact 21-section Standard match). No Physics, Chemistry, English, Biology, Computer
Science, KG, Blueprint, or runtime file was modified.

### Batch 17 — math.alg-unblocking excursion, closing the logarithm/binomial-theorem threads

Fresh frontier computation against the live KG and live `educational-brain/concepts/mathematics`
directory (post-Batch-16, math.alg 53/59): exactly 3 candidates ready —
`math.alg.binomial-theorem` (unblocked by Batch 16's `math.disc.combinations`),
`math.alg.logarithm-properties` and `math.alg.natural-logarithm` (both unblocked by Batch 16's
`math.alg.logarithm`). All 3 have existing Blueprints, reused by reference; all 3 authored.

- **`math.alg.binomial-theorem`** (developing/apply, mastery 0.8, MAMR 4/5, 8 hr, requires
  `math.alg.polynomial` + `math.disc.combinations` + `math.found.proof-by-induction`, unlocks
  `math.prob.discrete-distributions`, cross-links `math.prob.discrete-distributions` — verified
  not yet authored, independence mode) — the theorem stated and confirmed on small cases, then
  proved by induction using Pascal's identity as the specific combinatorial mechanism (not
  generic algebra), with Pascal's triangle previewed as the coefficient table. 3 misconceptions:
  MC-1 BINOMIAL-EXPANSION-TREATED-AS-LINEAR (Type 1, foundational — the "freshman's dream"
  $(a+b)^n = a^n + b^n$), MC-2 INDUCTION-STEP-TREATED-AS-GENERIC-ALGEBRA (Type 1, high — missing
  that Pascal's identity is the specific mechanism, not incidental simplification), MC-3
  PASCALS-TRIANGLE-TREATED-AS-COINCIDENCE (Type 5, moderate — the visual pattern presented before
  its algebraic cause is understood). No genuine content-overlap or metadata discrepancy found
  against the KG. This is the concept that closes the math.disc side of this program's excursion
  — `math.disc.combinations` (Batch 16) was authored specifically to unblock it.
- **`math.alg.logarithm-properties`** (developing/apply, mastery 0.85, MAMR 5/5, 5 hr, requires
  `math.alg.logarithm` only, Blueprint states "Unlocks: none listed" and "Cross-link: none
  listed") — the product, quotient, and power rules each derived directly from the corresponding
  exponent law via the logarithm-as-exponent-translator model, then combined for compound
  simplification. 3 misconceptions: MC-1 PRODUCT-RULE-ASSUMED-INDEPENDENT-FACT (Type 5,
  foundational — taught as an isolated formula to memorize rather than a consequence of the
  exponent law already known), MC-2 THREE-RULES-ASSUMED-UNRELATED-TECHNIQUES (Type 1, high —
  each rule re-derived from scratch instead of recognized as the same translation mechanism
  applied three times), MC-3 LOG-OF-SUM-ASSUMED-TO-SPLIT-LIKE-PRODUCT (Type 1, moderate —
  overgeneralizing the product rule's "splits across the operation" behavior to addition, refuted
  by a direct numeric counterexample). **Genuine Blueprint/KG metadata discrepancy found, not
  fixed:** the Blueprint's Component 7 states no `unlocks`, but the live KG lists
  `unlocks: ['math.alg.logarithmic-equations']` for this concept — this entry's Identity section
  follows the KG (authoritative per this program's standing rule); the Blueprint file was not
  modified, and the discrepancy is recorded for a future reconciliation pass.
- **`math.alg.natural-logarithm`** (developing/understand, mastery 0.8, MAMR 4/5, 4 hr, requires
  `math.alg.logarithm` only, Blueprint states "Unlocks: none listed," Blueprint Component 7
  cross-link `math.calc.derivative-ln` confirmed not yet authored, independence mode) — $\ln x$
  identified as simply $\log_e x$, the general logarithm definition with base fixed at $e$, so
  every rule already proved for an arbitrary base (including this batch's own
  `logarithm-properties`) transfers unchanged with no new derivation; base-$e$ simplifications
  ($\ln(e^3)$, $\ln(1/e)$, $\ln(\sqrt e)$) practiced via the inverse relationship and power rule;
  $e$'s genuine specialness (the derivative of $\ln x$ being exactly $1/x$) named at orientation
  level only and explicitly deferred to `math.calc.derivative-ln`. 3 misconceptions: MC-1
  LN-ASSUMED-DIFFERENT-KIND-OF-LOG (Type 5, foundational — the dedicated notation and separate
  calculator button obscure the base-$e$ relationship), MC-2
  LN-RULES-ASSUMED-TO-NEED-SEPARATE-DERIVATION (Type 1, high — appropriately cautious "verify
  before using" habits overapplied to a proof that already covers every valid base including
  $e$), MC-3 E-ASSUMED-ALGEBRAICALLY-SPECIAL (Type 5, moderate — $e$'s genuine calculus-level
  specialness misattributed to the algebra covered here, an instruction-induced conflation from
  encountering "e is special" messaging before the calculus vocabulary that explains it). Taught
  by direct instruction with an immediate transfer check, not discovery — the entire teaching
  point is recognizing nothing new needs deriving, so an extended discovery process would
  undermine the lesson. **Second genuine Blueprint/KG metadata discrepancy found this batch, not
  fixed:** the Blueprint's Component 7 states no `unlocks`, but the live KG lists
  `unlocks: ['math.calc.derivative-ln']` — same class of omission as `logarithm-properties`
  above; KG followed, Blueprint file not modified.

`math.alg` **53/59 → 56/59** (3 remain: `change-of-base`, `logarithmic-equations`,
`pascals-triangle` — all 3 verified already topologically ready via a fresh frontier computation
after this batch: `change-of-base` and `logarithmic-equations` via the now-authored
`logarithm-properties`, `pascals-triangle` via the now-authored `binomial-theorem`). This is the
domain's closing batch's precondition — the next batch authoring all 3 remaining concepts brings
math.alg to CERTIFIED, the fifth mathematics domain after math.found/math.geom/math.arith/math.nt.
`math.disc` and `math.func` unchanged this batch (no new concept in either — both excursions'
purpose is now served by this batch's 3 concepts). Mathematics **302/908 → 305/908**. No genuine
content-overlap was found between any of this batch's 3 entries and their already-authored
siblings; the 2 metadata discrepancies above are both KG-vs-Blueprint `unlocks` omissions,
recorded honestly rather than silently reconciled or used to justify editing the Blueprint files.
All tracking files updated in the same commit: `ROADMAP.md` Section 1/2 totals and domain table
regenerated from source, `COVERAGE.md`'s mathematics summary row and this Delivery history entry,
`CLAUDE.md`'s campaign section. `EDUCATIONAL_BRAIN_INDEX.md` and `QUALITY.md` again deferred (same
generated-artifact rationale as prior batches). Re-verified: `npx tsx
scripts/validate-knowledge-graph.ts docs/mathematics/kg/graph.json` PASS, 908/908 reachable, 0
failures, 0 warnings (KG file untouched); 0 orphan EB files; 0 duplicate EB files (via
`scripts/math/state.ts`); `npx tsc --noEmit` clean; targeted tests `mathPackageCorpus.test.ts` +
`mathematicsAssetContract.test.ts` 479/479 passed. All 3 new entries' heading structure diffed
clean against `math.alg.like-terms.md` (0 diffs, exact 21-section Standard match — one entry,
`natural-logarithm`, initially introduced an extra "Anti-Analogies" heading not in the canonical
21-section list and was corrected in place by folding that content into the Analogies section as
an inline warning before this check was run, rather than being left as a structural deviation).
No Physics, Chemistry, English, Biology, Computer Science, KG, Blueprint, or runtime file was
modified.

### Batch 18 — math.alg's final 3 concepts, DOMAIN CERTIFICATION

Fresh frontier computation against the live KG and live `educational-brain/concepts/mathematics`
directory (post-Batch-17, math.alg 56/59): the remaining 3 math.alg concepts —
`math.alg.change-of-base`, `math.alg.logarithmic-equations`, `math.alg.pascals-triangle` — were
all confirmed already topologically ready (each depends only on already-authored prerequisites).
All 3 have existing Blueprints, reused by reference; all 3 authored, closing the domain.

- **`math.alg.change-of-base`** (proficient/apply, mastery 0.85, MAMR 5/5, 2 hr, requires
  `math.alg.logarithm-properties` only, no unlocks/cross-links in the KG) — the formula
  $\log_a(x)=\frac{\log_b(x)}{\log_b(a)}$ derived directly from solving $a^y=x$ by taking
  $\log_b$ of both sides, rather than presented as an arbitrary rule; base-independence (any
  valid $b$ gives the identical final result) established via side-by-side numeric verification.
  2 misconceptions: MC-1 CHANGE-OF-BASE-NUMERATOR-DENOMINATOR-REVERSED (Type 1, foundational —
  produces the RECIPROCAL of the correct answer, a plausible-looking but numerically very
  different result with no obvious internal red flag), MC-2
  DIFFERENT-CHOSEN-BASES-ASSUMED-TO-GIVE-DIFFERENT-ANSWERS (Type 1, moderate). No genuine
  content-overlap or metadata discrepancy found against the KG.
- **`math.alg.logarithmic-equations`** (proficient/apply, mastery 0.8, MAMR 4/5, 5 hr, requires
  `math.alg.logarithm-properties` + `math.alg.exponential-equations`, no unlocks/cross-links) —
  the four-stage condense/exponentiate/solve/domain-check pipeline, with the domain check framed
  as structurally necessary (mirroring radical-equation extraneous-solution checking) rather than
  optional bookkeeping. 3 misconceptions: MC-1
  LOGARITHMIC-EQUATION-CANDIDATES-NOT-DOMAIN-CHECKED (Type 1, foundational), MC-2
  LOGARITHMIC-EQUATION-SOLVED-BEFORE-CONDENSING (Type 1, foundational), MC-3
  LOGARITHM-CONDENSING-RULE-MISAPPLIED (Type 4, moderate — the visual similarity between
  "$\log A+\log B$" and ordinary arithmetic addition invites a naive additive-argument slip). No
  genuine content-overlap or metadata discrepancy found against the KG; MC-1's
  extraneous-solution discipline explicitly cross-referenced against (not duplicated from)
  `math.alg.radical-equations`.
- **`math.alg.pascals-triangle`** (proficient/apply, mastery 0.8, MAMR 4/5, 4 hr, requires
  `math.alg.binomial-theorem`, no unlocks — the domain's LAST concept, closing math.alg to
  59/59) — the triangle's sum-the-two-above construction rule proved combinatorially (the same
  include/exclude argument used for $\binom{n}{k}=\binom{n-1}{k-1}+\binom{n-1}{k}$), row/position
  read directly as $\binom{n}{k}$ under 0-indexed counting, and used to read off
  `math.alg.binomial-theorem`'s expansion coefficients directly. 2 misconceptions: MC-1
  PASCALS-TRIANGLE-ROW-OR-POSITION-MISCOUNTED (Type 4, foundational — the everyday "first row"/
  "first entry" 1-indexed counting instinct actively conflicts with the 0-indexed mathematical
  convention), MC-2 TRIANGLE-CONSTRUCTION-EDGE-ENTRIES-NOT-SET-TO-ONE (Type 1, moderate). **Genuine
  Blueprint/KG metadata discrepancy found, not fixed**: the Blueprint's Component 7 states
  "cross_links: (none)," but the live KG lists `cross_links: ['math.disc.combinations']` — unlike
  several prior batches' KG/Blueprint discrepancies, this cross-link target IS already authored
  (`math.disc.combinations`, Batch 16), so this entry's Core Understanding and Transfer
  Connections sections genuinely incorporate that content rather than merely flagging the
  discrepancy. KG followed; Blueprint file not modified.

`math.alg` **56/59 → 59/59 — DOMAIN CERTIFIED**, the fifth mathematics domain after
math.found/math.geom/math.arith/math.nt. `math.disc`/`math.func` unchanged this batch (neither
new concept belongs to either domain) — both now stand as independent in-progress domains rather
than math.alg-serving excursions, since math.alg's need for them is fully satisfied. Mathematics
**305/908 → 308/908**. No genuine content-overlap was found between any of this batch's 3 entries
and their already-authored siblings beyond the deliberate cross-reference noted above. All
tracking files updated in the same commit: `ROADMAP.md` Section 1/2 totals and domain table
regenerated from source (math.alg row now reads CERTIFIED, math.disc's forward-work note lists
its 7 freshly-computed topologically-ready candidates:
`binomial-theorem`/`combinatorics`/`graph`/`inclusion-exclusion`/`pigeonhole`/
`propositional-logic`/`stars-bars`), `COVERAGE.md`'s mathematics summary row and this Delivery
history entry, `CLAUDE.md`'s campaign section. `EDUCATIONAL_BRAIN_INDEX.md` and `QUALITY.md`
again deferred (same generated-artifact rationale as prior batches). Re-verified: `npx tsx
scripts/validate-knowledge-graph.ts docs/mathematics/kg/graph.json` PASS, 908/908 reachable, 0
failures, 0 warnings (KG file untouched); `scripts/math/state.ts` confirms math.alg
`"ebComplete": true` and lists 5 EB-certified domains; 0 orphan EB files; 0 duplicate EB files;
`npx tsc --noEmit` clean; targeted tests `mathPackageCorpus.test.ts` +
`mathematicsAssetContract.test.ts` 479/479 passed. All 3 new entries' heading structure diffed
clean against `math.alg.like-terms.md` on the first pass (0 diffs each, exact 21-section Standard
match — no correction needed this batch, unlike Batch 17's `natural-logarithm`). No Physics,
Chemistry, English, Biology, Computer Science, KG, Blueprint, or runtime file was modified.

### Batch 19 — math.disc continued as a standalone domain campaign

With math.alg CERTIFIED (Batch 18), this program elected to continue `math.disc` (already
furthest along of the two excursion-opened domains, at 3/32) as a full standalone campaign rather
than opening a fresh domain or continuing `math.func`. Fresh frontier computation against the
live KG and live `educational-brain/concepts/mathematics` directory (post-Batch-18, math.disc
3/32): 7 candidates ready (`binomial-theorem`, `combinatorics`, `graph`, `inclusion-exclusion`,
`pigeonhole`, `propositional-logic`, `stars-bars`). A coherent subset of 5 — all requiring only
`math.disc.combinations` (or `counting-principles`) as their prerequisite — was selected this
batch, deliberately deferring `graph` and `propositional-logic` (each opening a structurally
distinct subtree: graph theory and formal logic, respectively) to a future batch. All 5 have
existing Blueprints, reused by reference; all 5 authored.

- **`math.disc.combinatorics`** (proficient/apply, mastery 0.85, MAMR 5/5, 5 hr, requires
  `math.disc.combinations`, unlocks `math.disc.generating-functions` — not yet authored) —
  surveys combinatorics as the whole FIELD of counting techniques rather than a synonym for
  $\binom{n}{r}$/$P(n,r)$: bijective counting (proving equal size via one-to-one correspondence,
  demonstrated on a subset-counting-via-binary-strings example deliberately distinct from
  stars-and-bars territory), recursive counting (a verified recurrence as a COMPLETE answer, no
  closed form required), and, at orientation level only, generating functions plus a named-only
  preview of its three dedicated children (stars-and-bars, pigeonhole, inclusion-exclusion). 3
  misconceptions: MC-1 COUNTING-LIMITED-TO-FORMULAS-OR-ENUMERATION (Type 1, foundational), MC-2
  RECURRENCE-TREATED-AS-INCOMPLETE (Type 1, high), MC-3
  COMBINATORICS-CONFLATED-WITH-ITS-TWO-FORMULAS (Type 1, moderate). No genuine content-overlap or
  metadata discrepancy found.
- **`math.disc.pigeonhole`** (proficient/apply, mastery 0.9, MAMR 5/5, 3 hr, requires
  `math.disc.counting-principles`, no unlocks/cross-links) — basic and generalized forms
  ($\lceil m/n\rceil$ as a guaranteed lower bound, never an exact value), the genuine skill being
  CREATIVE hole-construction (remainder classes, parity classes, intervals) rather than mechanical
  arithmetic, and the principle's NON-CONSTRUCTIVE nature (existence without location). 3
  misconceptions, all with birth types already assigned by this Blueprint itself and independently
  confirmed: MC-1 PIGEONHOLE-IS-A-FORMULA-NOT-AN-ARGUMENT (Type 5, foundational), MC-2
  PIGEONHOLE-GUARANTEES-THE-MAXIMUM (Type 4, moderate), MC-3 THE-PRINCIPLE-FINDS-THE-COLLISION
  (Type 1, moderate). No genuine content-overlap or metadata discrepancy found.
- **`math.disc.stars-bars`** (proficient/apply, mastery 0.85, MAMR 5/5, 3 hr, requires
  `math.disc.combinations`, no unlocks/cross-links) — the row-of-symbols encoding
  ($\binom{n+k-1}{k-1}$ for $n$ identical objects into $k$ distinct bins), the $k-1$-not-$k$ bar
  count, the at-least-one substitution ($n-k$, not $n+k$), and the identical-vs-distinct
  discrimination test (stars-and-bars applies only to identical objects; distinct objects use
  $k^n$). 3 misconceptions, birth types already assigned by the Blueprint, independently
  confirmed: MC-1 STARS-BARS-FOR-DISTINCT-OBJECTS (Type 5, foundational), MC-2
  AT-LEAST-ONE-MEANS-REPLACE-n-BY-n+1 (Type 4, moderate), MC-3 BARS-COUNT-EQUALS-BINS-COUNT (Type
  4, moderate). No genuine content-overlap or metadata discrepancy found; upper-bound restrictions
  deliberately kept at orientation level, explicitly deferring to `inclusion-exclusion`.
- **`math.disc.inclusion-exclusion`** (proficient/apply, mastery 0.85, MAMR 5/5, 4 hr, requires
  `math.disc.combinations` + `math.found.set-operations`, unlocks `math.disc.derangements`) —
  the full alternating-sign formula (proved by tracking a single element's contribution via the
  binomial theorem), the union-vs-complement ("at least one" vs. "none") discrimination, and the
  systematic surjection-counting formula derived from "missing element $j$" sets rather than ad
  hoc small-$k$ reasoning. 3 misconceptions, birth types already assigned by the Blueprint,
  independently confirmed: MC-1 INCLUSION-EXCLUSION-ALWAYS-SUBTRACTS (Type 5, foundational), MC-2
  IE-COUNTS-ELEMENTS-IN-ANY-SET (Type 3, high), MC-3 SURJECTION-FORMULA-IS-kⁿ (Type 5, moderate).
  No genuine content-overlap or metadata discrepancy found; the derangement preview kept at
  orientation level, deferring full development to its own concept.
- **`math.disc.binomial-theorem`** (developing/apply, mastery 0.9, MAMR 5/5, 3 hr, requires
  `math.disc.combinations`, cross-links `math.alg.binomial-theorem` — already authored, Batch
  17) — the combinatorial derivation of $(x+y)^n=\sum\binom{n}{k}x^ky^{n-k}$ (choosing $x$ or $y$
  from each of $n$ factors), the include/exclude combinatorial proof of Pascal's identity (shared
  by reference with `math.alg.pascals-triangle` and `math.alg.vietas-formulas`), substitution-
  derived identities, and the general-term-formula shortcut for locating one specific coefficient
  without full expansion. 3 misconceptions, birth types already assigned by the Blueprint,
  independently confirmed: MC-1 BINOMIAL-THEOREM-ONLY-FOR-INTEGERS (Type 5, moderate), MC-2
  PASCAL-IDENTITY-BY-MEMORISATION (Type 4, moderate), MC-3 SPECIFIC-TERM-REQUIRES-FULL-EXPANSION
  (Type 1, moderate). **First genuinely non-empty, already-authored cross-link encountered in
  this batch** — this entry's Transfer Connections section substantively incorporates
  `math.alg.binomial-theorem`'s complementary algebraic/inductive proof of the identical theorem,
  rather than merely noting the cross-link.

`math.disc` **3/32 → 8/32**. `math.func` unchanged this batch (1/29, parked). Mathematics
**308/908 → 313/908**. No genuine content-overlap was found among this batch's 5 entries beyond
the deliberate, explicit cross-references noted above (Pascal's identity's shared include/exclude
argument across `combinatorics`'s sibling `math.alg` entries; `stars-bars`'s deferral of
upper-bound restrictions to `inclusion-exclusion`). Notably, 4 of the 5 Blueprints sourced this
batch (`pigeonhole`, `stars-bars`, `inclusion-exclusion`, `binomial-theorem`) already carry
birth-type classifications assigned directly in the Blueprint text itself — a newer Blueprint
authoring convention than the earlier `math.alg`/`math.found`/`math.geom`/`math.arith`/`math.nt`
corpus this program has drawn on to date; each was independently confirmed against this program's
own taxonomy before being adopted, rather than accepted uncritically. All tracking files updated
in the same commit: `ROADMAP.md` Section 1/2 totals and domain table regenerated from source
(math.disc row updated with its 3 freshly-computed topologically-ready candidates:
`derangements`/`graph`/`propositional-logic`), `COVERAGE.md`'s mathematics summary row and this
Delivery history entry, `CLAUDE.md`'s campaign section. `EDUCATIONAL_BRAIN_INDEX.md` and
`QUALITY.md` again deferred (same generated-artifact rationale as prior batches). Re-verified:
`npx tsx scripts/validate-knowledge-graph.ts docs/mathematics/kg/graph.json` PASS, 908/908
reachable, 0 failures, 0 warnings (KG file untouched); `scripts/math/state.ts` confirms
math.disc 8/32, 0 orphan EB files, 0 duplicate EB files; `npx tsc --noEmit` clean; targeted tests
`mathPackageCorpus.test.ts` + `mathematicsAssetContract.test.ts` 479/479 passed. All 5 new
entries' heading structure diffed clean against `math.alg.like-terms.md` on the first pass (0
diffs each). No Physics, Chemistry, English, Biology, Computer Science, KG, Blueprint, or runtime
file was modified.

### Batch 20 — math.disc: derangements, and opening two new subtrees (graph theory, formal logic)

Fresh frontier computation against the live KG and live `educational-brain/concepts/mathematics`
directory (post-Batch-19, math.disc 8/32): 3 candidates ready — `math.disc.derangements`
(newly unblocked by Batch 19's `inclusion-exclusion`), `math.disc.graph` (opening the domain's
graph-theory subtree, requires only `math.found.set-theory`), `math.disc.propositional-logic`
(opening the domain's formal-logic subtree, requires `math.found.proposition` +
`math.found.logical-connectives`) — both `graph` and `propositional-logic` deliberately deferred
from Batch 19's coherent-subset selection. All 3 have existing Blueprints, reused by reference;
all 3 authored.

- **`math.disc.derangements`** (proficient/apply, mastery 0.8, MAMR 4/5, 3 hr, requires
  `math.disc.inclusion-exclusion` only, no unlocks/cross-links) — $D(n)=n!\sum_{k=0}^n\frac{(-1)^k}{k!}$
  derived directly as an application of inclusion-exclusion (the $A_i=$"element $i$ fixed" sets
  previewed in that concept's own entry, fully developed here), the fast convergence of
  $D(n)/n!\to1/e$ (already accurate by $n\approx10$), and the precise "every position, not just
  one" definition of a derangement. 3 misconceptions: MC-1
  INCLUSION-EXCLUSION-TERM-COUNT-MISCOMPUTED-FOR-DERANGEMENTS (Type 1, foundational), MC-2
  ONE-OVER-E-APPROXIMATION-ASSUMED-TO-NEED-HUGE-N (Type 1, moderate), MC-3
  DERANGEMENT-CONFUSED-WITH-ANY-PERMUTATION-WITHOUT-A-SPECIFIC-FIXED-POINT (Type 1,
  foundational). No genuine content-overlap or metadata discrepancy found; explicitly not
  duplicating `inclusion-exclusion`'s own orientation-level derangement preview.
- **`math.disc.graph`** (developing/understand, mastery 0.9, MAMR 5/5, 3 hr, requires
  `math.found.set-theory`, unlocks `math.disc.graph-connectivity` + `math.disc.graph-trees`,
  cross-links `math.graph.graph` — confirmed genuinely unauthored, independence mode) — $G=(V,E)$,
  undirected (unordered-pair) vs. directed (ordered-pair) edges formally grounded in
  `math.found.set-theory`'s Cartesian-product framework, self-loop degree-2 rule, and the
  Handshaking Lemma ($\sum\deg(v)=2|E|$) re-derived from "every edge has two ends" rather than
  presented as a bare formula. 3 misconceptions, birth-type classified independently (this
  Blueprint did not pre-assign them, unlike several other math.disc sources): MC-1
  DIRECTED-EDGE-ASSUMED-SYMMETRIC (Type 6, moderate — an everyday-connection analogy
  overextended into the directed-graph context), MC-2 SELF-LOOP-DEGREE-ONE (Type 2, moderate —
  a perceptual-intuition undercount from the loop's single-curve visual appearance), MC-3
  HANDSHAKE-SUM-EQUALS-EDGES (Type 4, foundational — the formula's factor of 2 easy to drop
  under notation pressure). No genuine content-overlap found; opens `math.disc`'s graph-theory
  subtree for the first time this campaign.
- **`math.disc.propositional-logic`** (developing/apply, mastery 0.9, MAMR 5/5, 4 hr, requires
  `math.found.proposition` + `math.found.logical-connectives`, unlocks
  `math.disc.boolean-circuits`, cross-links `math.found.truth-table` — already authored) — DNF
  built mechanically from a truth table's TRUE rows and CNF from the FALSE rows (dual
  constructions, opposite negation conventions), and, at orientation level, the SAT problem's
  easy-to-verify/hard-to-decide gap (NP-completeness named, not proved). 3 misconceptions: MC-1
  DNF-TREATED-AS-ARBITRARY-REWRITE (Type 5, foundational), MC-2 CNF-BUILT-LIKE-DNF (Type 1,
  high), MC-3 EASY-VERIFICATION-ASSUMED-TO-IMPLY-EASY-DECISION (Type 1, moderate). **Second
  genuinely non-empty, already-authored cross-link substantively incorporated this campaign**
  (after `math.disc.binomial-theorem`'s in Batch 19) — `math.found.truth-table`'s row-by-row
  method is this entry's mechanical foundation throughout, not merely flagged. One honesty note
  recorded, not silently assumed: the Blueprint's own SAT/Hamiltonian-cycle complexity parallel
  cites `math.disc.euler-hamiltonian` as "already authored," but that concept is outside
  `math.disc`'s currently-authored EB set — presented here as a stated Blueprint fact, not
  independently verified against the live EB directory.

`math.disc` **8/32 → 11/32**. `math.func` unchanged this batch (1/29, parked). Mathematics
**313/908 → 316/908**. No genuine content-overlap was found among this batch's 3 entries. All
tracking files updated in the same commit: `ROADMAP.md` Section 1/2 totals and domain table
regenerated from source (math.disc row updated with its 6 freshly-computed topologically-ready
candidates: `boolean-circuits`/`graph-coloring`/`graph-connectivity`/`graph-types`/
`planar-graph`/`predicate-logic-disc`), `COVERAGE.md`'s mathematics summary row and this
Delivery history entry, `CLAUDE.md`'s campaign section. `EDUCATIONAL_BRAIN_INDEX.md` and
`QUALITY.md` again deferred (same generated-artifact rationale as prior batches). Re-verified:
`npx tsx scripts/validate-knowledge-graph.ts docs/mathematics/kg/graph.json` PASS, 908/908
reachable, 0 failures, 0 warnings (KG file untouched); `scripts/math/state.ts` confirms
math.disc 11/32, 0 orphan EB files, 0 duplicate EB files; `npx tsc --noEmit` clean; targeted
tests `mathPackageCorpus.test.ts` + `mathematicsAssetContract.test.ts` 479/479 passed. All 3 new
entries' heading structure diffed clean against `math.alg.like-terms.md` on the first pass (0
diffs each). No Physics, Chemistry, English, Biology, Computer Science, KG, Blueprint, or
runtime file was modified.

### Batch 21 — math.disc: deepening the graph-theory and formal-logic subtrees

Fresh frontier computation against the live KG and live `educational-brain/concepts/mathematics`
directory (post-Batch-20, math.disc 11/32): 6 candidates ready — `boolean-circuits`
(propositional-logic subtree), `graph-coloring`/`graph-connectivity`/`graph-types` (graph-theory
subtree, all requiring only `math.disc.graph`), `planar-graph` (graph-theory subtree, deferred to
a future batch), `predicate-logic-disc` (propositional-logic subtree). All 6 have existing
Blueprints; the 5 authored this batch (`planar-graph` deferred) are all reused by reference.

- **`math.disc.boolean-circuits`** (proficient/apply, mastery 0.8, MAMR 4/5, 5 hr, requires
  `math.disc.propositional-logic`, no unlocks/cross-links) — the DNF-to-circuit construction
  recipe, the genuinely distinct depth (parallel time) vs. size (total gate count) measures, and
  NAND/NOR's universality (each simulating AND/OR/NOT via a bounded number of self-gates) as a
  BINARY property independent of gate-count efficiency. 3 misconceptions, birth types already
  assigned by the Blueprint, independently confirmed: MC-1 DEPTH-EQUALS-SIZE (Type 4, moderate),
  MC-2 NAND-IS-NOT-UNIVERSAL-BECAUSE-IT-NEEDS-MORE-GATES (Type 1, moderate), MC-3
  DNF-AND-CIRCUIT-ARE-THE-SAME (Type 5, moderate — DNF gives A valid circuit, not necessarily the
  optimal one; the parity function's exponential-DNF-vs-linear-XOR-tree contrast makes this
  concrete). No genuine content-overlap found with `propositional-logic` (that entry owns
  DNF/CNF construction; this entry owns circuit-level implementation and complexity).
- **`math.disc.graph-coloring`** (proficient/analyze, mastery 0.8, MAMR 4/5, 4 hr, requires
  `math.disc.graph`, cross-links `math.graph.graph-coloring`) — the two-part upper-bound
  (greedy/explicit coloring) + lower-bound (clique number/odd cycle) proof structure required to
  establish $\chi(G)$ exactly, the Four Color Theorem's asymmetric difficulty (trivial lower
  bound via $K_4$, genuinely hard 1976 computer-verified upper bound), and the chromatic
  polynomial $P(G,k)$ as a function distinct from the integer $\chi(G)$. 3 misconceptions,
  Blueprint-assigned birth types confirmed: MC-1 CHROMATIC-NUMBER-EQUALS-GREEDY-COLORS (Type 5,
  foundational), MC-2 FOUR-COLOR-THEOREM-IS-OBVIOUS (Type 1, moderate), MC-3
  CHROMATIC-POLYNOMIAL-IS-CHROMATIC-NUMBER (Type 4, moderate). **New cross-link intermediate
  case identified**: `math.graph.graph-coloring` has a genuine Blueprint but NO Educational Brain
  entry (the entire `math.graph` subject, 0/16, is unstarted) — neither full independence nor a
  substantively-incorporable already-authored sibling; this entry's Transfer Connections
  deliberately does not cite it as a peer EB entry, to avoid misrepresenting corpus state.
- **`math.disc.graph-connectivity`** (developing/understand, mastery 0.9, MAMR 5/5, 3 hr,
  requires `math.disc.graph`, unlocks `math.disc.graph-trees` + `math.disc.euler-hamiltonian`) —
  the path/cycle distinctness requirement, connectedness as a universal claim requiring
  systematic search (never confirmable by sampling), and strong connectivity's much stricter
  mutual-both-directions-every-pair requirement versus mere partial reachability. 3
  misconceptions, birth types independently derived (Blueprint did not pre-assign them): MC-1
  PARTIAL-REACHABILITY-ASSUMED-SUFFICIENT-FOR-STRONG-CONNECTIVITY (Type 6, foundational — an
  undirected-graph-intuition analogy overextended into the directed setting), MC-2
  PATH-DEFINITION-ALLOWS-REPEATED-VERTICES (Type 1, foundational), MC-3
  CONNECTEDNESS-VERIFIED-BY-CHECKING-ONLY-A-FEW-PAIRS (Type 1, moderate).
- **`math.disc.graph-types`** (developing/understand, mastery 0.9, MAMR 5/5, 2 hr, requires
  `math.disc.graph`, no unlocks/cross-links) — bipartiteness as an EDGE-structure property
  (never a connectivity claim, despite the "bi-partite" naming), $K_n$ vs. $K_{m,n}$'s two
  genuinely different "completeness" notions, and the Handshaking Lemma's full generality across
  multigraphs/pseudographs/digraphs (not a social-event-specific curiosity). 3 misconceptions,
  Blueprint-assigned birth types confirmed: MC-1 BIPARTITE-MEANS-TWO-COMPONENTS (Type 3, high),
  MC-2 COMPLETE-MEANS-ALL-EDGES-POSSIBLE (Type 5, moderate), MC-3
  HANDSHAKING-IS-ABOUT-HANDSHAKES (Type 3, moderate).
- **`math.disc.predicate-logic-disc`** (proficient/apply, mastery 0.85, MAMR 5/5, 4 hr, requires
  `math.found.predicate-logic` + `math.disc.propositional-logic`, cross-links
  `math.found.predicate-logic` — already authored) — nested-quantifier order genuinely changing
  a claim's meaning ($\forall x\exists y$ vs. $\exists y\forall x$), the quantified De Morgan
  negation laws (BOTH the quantifier type flips AND the predicate negates, every time), and the
  asymmetry between refuting a universal (one counterexample) versus an existential (must prove
  failure for every element). 3 misconceptions, Blueprint-assigned birth types confirmed: MC-1
  QUANTIFIER-ORDER-COMMUTES (Type 4, foundational), MC-2
  NEGATION-FLIPS-PREDICATE-NOT-QUANTIFIER (Type 1, foundational), MC-3
  COUNTEREXAMPLE-REFUTES-EXISTENTIAL (Type 1, moderate). **Third genuinely non-empty,
  already-authored cross-link substantively incorporated this campaign** (after
  `binomial-theorem` in Batch 19 and `propositional-logic` in Batch 20) —
  `math.found.predicate-logic`'s quantifier framework is this entry's direct foundation, not
  merely flagged.

`math.disc` **11/32 → 16/32** — past the halfway point. `math.func` unchanged this batch (1/29,
parked). Mathematics **316/908 → 321/908**. No genuine content-overlap was found among this
batch's 5 entries beyond deliberate, explicit cross-references (bipartiteness's $\chi\le2$
connection between `graph-types` and `graph-coloring`; propositional-vs-quantified De Morgan
between `predicate-logic-disc` and `propositional-logic`). All tracking files updated in the
same commit: `ROADMAP.md` Section 1/2 totals and domain table regenerated from source (math.disc
row updated with its 3 freshly-computed topologically-ready candidates:
`euler-hamiltonian`/`graph-trees`/`planar-graph`), `COVERAGE.md`'s mathematics summary row and
this Delivery history entry, `CLAUDE.md`'s campaign section. `EDUCATIONAL_BRAIN_INDEX.md` and
`QUALITY.md` again deferred (same generated-artifact rationale as prior batches). Re-verified:
`npx tsx scripts/validate-knowledge-graph.ts docs/mathematics/kg/graph.json` PASS, 908/908
reachable, 0 failures, 0 warnings (KG file untouched); `scripts/math/state.ts` confirms
math.disc 16/32, 0 orphan EB files, 0 duplicate EB files; `npx tsc --noEmit` clean; targeted
tests `mathPackageCorpus.test.ts` + `mathematicsAssetContract.test.ts` 479/479 passed. All 5 new
entries' heading structure diffed clean against `math.alg.like-terms.md` on the first pass (0
diffs each). No Physics, Chemistry, English, Biology, Computer Science, KG, Blueprint, or
runtime file was modified.

### Batch 22 — math.disc: substantially developing the graph-theory subtree

Fresh frontier computation against the live KG and live `educational-brain/concepts/mathematics`
directory (post-Batch-21, math.disc 16/32): 3 candidates ready — `euler-hamiltonian` and
`graph-trees` (both requiring `math.disc.graph-connectivity`), `planar-graph` (requiring
`math.disc.graph`). All 3 have existing Blueprints, reused by reference; all 3 authored.

- **`math.disc.euler-hamiltonian`** (proficient/apply, mastery 0.85, MAMR 5/5, 4 hr, requires
  `math.disc.graph-connectivity`, cross-links `math.graph.eulerian-circuit` +
  `math.graph.hamiltonian-cycle` — both have Blueprints, no EB entries yet) — Euler's theorem
  (all-even degree iff Eulerian circuit exists) as a pure degree-count test requiring no tracing
  attempt, the open-path extension (exactly 0 or 2 odd-degree vertices), the historical Seven
  Bridges of Königsberg, and the Hamiltonian cycle's NP-complete contrast at orientation level —
  proved logically INDEPENDENT of Eulerian existence via the bowtie-graph counterexample (all
  vertices even, Eulerian circuit exists, yet no Hamiltonian cycle since the shared vertex forces
  a revisit). 3 misconceptions, birth types independently derived (Blueprint did not pre-assign
  them): MC-1 TRACING-REQUIRED-TO-DETERMINE-EXISTENCE (Type 1, foundational), MC-2
  ODD-VERTICES-IMPLY-NO-EULERIAN-STRUCTURE (Type 1, high), MC-3 EULERIAN-IMPLIES-HAMILTONIAN
  (Type 6, moderate). **Second instance of the Batch-21-established cross-link intermediate
  case** (both targets have Blueprints, neither has an EB entry) — not cited as peer entries.
- **`math.disc.graph-trees`** (proficient/understand, mastery 0.9, MAMR 5/5, 4 hr, requires
  `math.disc.graph-connectivity`, unlocks `math.disc.spanning-tree`, cross-links
  `math.graph.tree` — Blueprint exists, no EB entry yet) — the tree definition as connected AND
  acyclic SIMULTANEOUSLY (not either alone), the $n-1$ edge count as NECESSARY but not
  SUFFICIENT (a disconnected graph with a compensating isolated vertex can match the count
  without being a tree), and the rooted-vs-free tree distinction (the same free tree, rooted
  differently, produces genuinely different parent-child hierarchies). 3 misconceptions, birth
  types independently derived: MC-1 TREE-ASSUMED-FROM-EITHER-CONDITION-ALONE (Type 1,
  foundational), MC-2 N-MINUS-1-EDGES-ASSUMED-SUFFICIENT (Type 1, foundational), MC-3
  TREE-HIERARCHY-ASSUMED-ROOT-INDEPENDENT (Type 1, moderate). This entry's unlocked child,
  `math.disc.spanning-tree`, becomes the domain's sole topologically-ready candidate after this
  batch.
- **`math.disc.planar-graph`** (proficient/analyze, mastery 0.75, MAMR 4/5, 4 hr, requires
  `math.disc.graph` only, no unlocks/cross-links) — Euler's formula $V-E+F=2$ for connected
  planar graphs (with the $C+1$ correction for disconnected graphs), the edge-density bounds
  $E\le3V-6$/$E\le2V-4$ as strictly NECESSARY, never sufficient, non-planarity tests (with
  $K_{3,3}$ as the decisive example where the general bound is satisfied but the tighter
  triangle-free bound catches the violation), and Kuratowski's theorem's precise "subdivision"
  (not strict-subgraph) wording. 3 misconceptions, birth types already assigned by the Blueprint,
  independently confirmed: MC-1 EULER-FORMULA-FOR-DISCONNECTED (Type 5, moderate), MC-2
  KURATOWSKI-SUBDIVISION-VS-SUBGRAPH (Type 4, moderate), MC-3
  E-LESS-THAN-3V-MINUS-6-IS-SUFFICIENT (Type 5, foundational).

`math.disc` **16/32 → 19/32**. `math.func` unchanged this batch (1/29, parked). Mathematics
**321/908 → 324/908**. No genuine content-overlap was found among this batch's 3 entries; the
domain's graph-theory subtree (`graph`, `graph-coloring`, `graph-connectivity`, `graph-types`,
`euler-hamiltonian`, `graph-trees`, `planar-graph`) is now substantially developed. All tracking
files updated in the same commit: `ROADMAP.md` Section 1/2 totals and domain table regenerated
from source (math.disc row now reports only 1 topologically-ready candidate, `spanning-tree`,
with the domain's remaining 12 concepts named as belonging to largely separate, not-yet-opened
subtrees — algorithm complexity/asymptotic notation, generating functions and variants,
recurrence relations, Catalan/Stirling numbers), `COVERAGE.md`'s mathematics summary row and
this Delivery history entry, `CLAUDE.md`'s campaign section. `EDUCATIONAL_BRAIN_INDEX.md` and
`QUALITY.md` again deferred (same generated-artifact rationale as prior batches). Re-verified:
`npx tsx scripts/validate-knowledge-graph.ts docs/mathematics/kg/graph.json` PASS, 908/908
reachable, 0 failures, 0 warnings (KG file untouched); `scripts/math/state.ts` confirms
math.disc 19/32, 0 orphan EB files, 0 duplicate EB files; `npx tsc --noEmit` clean; targeted
tests `mathPackageCorpus.test.ts` + `mathematicsAssetContract.test.ts` 479/479 passed. All 3 new
entries' heading structure diffed clean against `math.alg.like-terms.md` on the first pass (0
diffs each). No Physics, Chemistry, English, Biology, Computer Science, KG, Blueprint, or
runtime file was modified.

### Batch 23 — math.disc: closing the `graph-trees → spanning-tree` chain

Re-computed the frontier fresh (per this program's own standing discipline, not assumed still
ready from Batch 22): exactly 1 topologically-ready candidate — `math.disc.spanning-tree`
(requires `math.disc.graph-trees` only, authored Batch 22).

- **`math.disc.spanning-tree`** (proficient/apply, mastery 0.85, MAMR 5/5, 5 hr, requires
  `math.disc.graph-trees` only, no unlocks, cross-link `math.graph.minimum-spanning-tree`) —
  the spanning-tree definition built directly on `math.disc.graph-trees`' own tree definition
  (spans every vertex AND is a tree); the existence proof (remove cycle edges until none remain);
  Cayley's formula ($n^{n-2}$ labelled spanning trees of $K_n$); the genuinely separate
  optimization question of the minimum spanning tree (MST) for a weighted graph; the cut property
  (the minimum-weight edge crossing any cut belongs to some MST) and cycle property (the
  maximum-weight edge of any cycle belongs to no MST) as the structural correctness arguments for
  Kruskal's and Prim's algorithms; and the distinct-vs-tied-weight MST uniqueness question. 3
  misconceptions, birth types already assigned by the Blueprint, independently confirmed:
  MC-1 SPANNING-TREE-CAN-HAVE-CYCLES (Type 5, foundational — explicitly cross-referenced to
  `math.disc.graph-trees`' own MC-1 TREE-ASSUMED-FROM-EITHER-CONDITION-ALONE as the same
  relaxation-of-a-conjunction mechanism recurring one structural level up), MC-2
  KRUSKAL-GREEDY-IS-NOT-GLOBALLY-OPTIMAL (Type 1, moderate — contrasted explicitly with the
  Travelling Salesman Problem's lack of the same cut-independence structure), MC-3 MST-IS-UNIQUE
  (Type 5, moderate).

`math.disc` **19/32 → 20/32**. `math.func` unchanged this batch (1/29, parked). Mathematics
**324/908 → 325/908**. No genuine content-overlap was found — this entry's MC-1 is a deliberate,
explicit cross-reference to `math.disc.graph-trees`' own MC-1 (recorded in both entries' text,
not silently duplicated). This closes the `math.disc.graph-trees → math.disc.spanning-tree`
chain the graph-theory subtree work opened in Batch 20; 0 topologically-ready math.disc
candidates remain — the domain's other 12 unauthored concepts (algorithm complexity/asymptotic
notation, generating functions and variants, recurrence relations, Catalan/Stirling numbers) all
require prerequisites entirely outside math.disc (`math.calc.limits`, `math.seq.sequence`,
`math.seq.series`, `math.linalg.matrix`, none yet authored), so the next step is a genuine
cross-domain excursion decision, not a bounded step within the domain. All tracking files
updated in the same commit: `ROADMAP.md` Section 1/2 totals and domain table regenerated from
source (math.disc row now reports 0 topologically-ready candidates), `COVERAGE.md`'s mathematics
summary row and this Delivery history entry, `CLAUDE.md`'s campaign section.
`EDUCATIONAL_BRAIN_INDEX.md` and `QUALITY.md` again deferred (same generated-artifact rationale
as prior batches). Re-verified: `npx tsx scripts/validate-knowledge-graph.ts
docs/mathematics/kg/graph.json` PASS, 908/908 reachable, 0 failures, 0 warnings (KG file
untouched); `scripts/math/state.ts` confirms math.disc 20/32, 0 orphan EB files, 0 duplicate EB
files; `npx tsc --noEmit` clean; targeted tests `mathPackageCorpus.test.ts` +
`mathematicsAssetContract.test.ts` 479/479 passed. The new entry's heading structure diffed
clean against `math.alg.like-terms.md` on the first pass (0 diffs). No Physics, Chemistry,
English, Biology, Computer Science, KG, Blueprint, or runtime file was modified.

### Batch 24 — opening `math.graph` (graph theory's deeper-formalism domain)

With `math.disc` at 0 topologically-ready candidates (Batch 23's conclusion) and its remaining 12
concepts all blocked on prerequisites entirely outside the domain, computed the full topologically-
ready frontier across ALL mathematics domains rather than restricting to math.disc/math.func.
Result: `math.graph` had 7 ready candidates (`connectivity`, `eulerian-circuit`, `graph`,
`graph-coloring`, `hamiltonian-cycle`, `minimum-spanning-tree`, `tree`) — every one gated on ONLY
its already-authored `math.disc` sibling, since `math.disc`'s own graph-theory entries
(`graph`, `graph-connectivity`, `graph-trees`, `euler-hamiltonian`, `graph-coloring`) had each
already named a `math.graph` counterpart as a genuine Blueprint-exists-no-EB-yet cross-link
throughout Batches 20-22. `math.func` had 13 ready candidates (the `function-concept` children);
`math.graph` was selected because its content is a genuinely DEEPER formalism paralleling
already-authored `math.disc` content (Menger's theorem, Cayley's formula/Prüfer sequences,
Kruskal's/Prim's algorithms via the cut/cycle properties) rather than a fresh, unrelated subject
area, and because opening it retroactively closes several outstanding "Blueprint exists, no EB
yet" cross-link notes recorded in already-authored `math.disc` entries. Authored a coherent
3-concept subset (the domain root plus the tree/MST pair), deferring the coloring/connectivity/
Eulerian-Hamiltonian family to a future batch.

- **`math.graph.graph`** (developing/understand, mastery 0.9, MAMR 5/5, 3 hr, requires
  `math.found.set-theory` only, unlocks `connectivity`/`tree`, cross-link
  `math.disc.graph` already authored) — the domain's root node; explicitly does NOT re-teach
  `math.disc.graph`'s vertex/edge/directed/self-loop/Handshaking-Lemma content (that entry's own
  division of labor, stated in its Blueprint's Component 7), instead developing ORDER/SIZE
  notation ($n=|V|$, $m=|E|$) and two genuine structural generalizations: WEIGHTED graphs (a
  numeric label on top of an already-existing edge, never a different structure) and MULTIGRAPHS
  (more than one edge between the same pair, with degree counting edge-incidences, not distinct
  neighbors). 3 misconceptions, birth types independently derived since the Blueprint pre-assigns
  none: MC-1 ORDER-SIZE-ASSUMED-EQUAL (Type 1, moderate), MC-2 WEIGHTED-GRAPH-DIFFERENT-OBJECT
  (Type 2, moderate), MC-3 MULTIGRAPH-DEGREE-BY-NEIGHBOR-COUNT (Type 1, foundational).
- **`math.graph.tree`** (proficient/understand, mastery 0.9, MAMR 5/5, 3 hr, requires
  `math.disc.graph-trees` only, unlocks `minimum-spanning-tree`, cross-link
  `math.disc.graph-trees` already authored) — the six equivalent tree characterizations (any two
  of connected/acyclic/$m=n-1$ force the third — a proof TOOL, not three independent checks);
  rooted trees, forests, and spanning trees; Cayley's formula $n^{n-2}$ proved via the Prüfer
  sequence bijection, including the degree-multiplicity read ($\deg_T(v)-1$ from a vertex's
  sequence multiplicity) that makes the sequence transparent rather than opaque. 3 misconceptions:
  MC-1 TREE-REQUIRES-THREE-PROPERTIES (Type 1, foundational), MC-2
  PRUFER-SEQUENCE-ENCODES-STRUCTURE-NOT-DEGREES (Type 4, moderate), MC-3
  CAYLEY-COUNTS-UNLABELED-TREES (Type 3, moderate — labeled-vs-unlabeled tree counts).
- **`math.graph.minimum-spanning-tree`** (proficient/apply, mastery 0.85, MAMR 5/5, 4 hr,
  requires `math.disc.spanning-tree` only, no unlocks) — the cut property and cycle property as
  the unifying justification for BOTH Kruskal's (sort-and-add, restricted by cycle-avoidance) and
  Prim's (frontier-growth, restricted by cut-crossing) algorithms — genuinely rare cases where
  greedy provably works; the sufficient-not-necessary relationship between distinct edge weights
  and MST uniqueness; and the MST-vs-shortest-path-tree distinction (cheapest to connect everyone
  vs. fastest from one source). 3 misconceptions: MC-1 GREEDY-ALWAYS-GIVES-MST (Type 1,
  foundational), MC-2 UNIQUE-WEIGHTS-NOT-REQUIRED-FOR-UNIQUENESS (Type 4, moderate), MC-3
  MST-GIVES-SHORTEST-PATHS (Type 6, critical). A genuine Blueprint-staleness finding (not a
  Blueprint/KG metadata mismatch): the Blueprint's own Component 7 and Validation Checklist
  record `math.disc.spanning-tree` as MISSING and declare independence mode — accurate when the
  Blueprint was authored, but stale now that `math.disc.spanning-tree` was authored in Batch 23 of
  this same campaign; this EB entry's own Transfer Connections substantively incorporate that
  now-authored concept, correcting the staleness without modifying the Blueprint file itself.

`math.graph` **0/16 → 3/16**. `math.disc`/`math.func` unchanged this batch (20/32 and 1/29,
parked). Mathematics **325/908 → 328/908**, 807 remaining. No genuine content-overlap found
beyond the one deliberate, explicitly-recorded Blueprint-staleness correction above. All tracking
files updated in the same commit: `ROADMAP.md` Section 1/2 totals and domain table regenerated
from source (new `math.graph` row, updated summary paragraph), `COVERAGE.md`'s mathematics
summary row and this Delivery history entry, `CLAUDE.md`'s campaign section.
`EDUCATIONAL_BRAIN_INDEX.md` and `QUALITY.md` again deferred (same generated-artifact rationale
as prior batches). Validated: `npx tsx scripts/validate-knowledge-graph.ts
docs/mathematics/kg/graph.json` PASS, 908/908 reachable, 0 failures, 0 warnings (KG file
untouched); `scripts/math/state.ts` confirms math.graph 3/16 and mathematics 328/908, 0 orphan EB
files, 0 duplicate EB files; `npx tsc --noEmit` clean; targeted tests `mathPackageCorpus.test.ts`
+ `mathematicsAssetContract.test.ts` 479/479 passed. All 3 new entries' heading structure diffed
clean against `math.alg.like-terms.md` on the first pass (0 diffs each). Fresh `math.graph`
frontier computed: 4 candidates ready (`connectivity`, `eulerian-circuit`, `hamiltonian-cycle`,
`graph-coloring`), each gated on only its already-authored `math.disc` sibling. No Physics,
Chemistry, English, Biology, Computer Science, KG, Blueprint, or runtime file was modified.

### Batch 25 — closing math.graph's post-Batch-24 frontier (2026-09-12)

Re-computed the frontier fresh (per this program's own standing discipline) — the exact 4
concepts left ready after Batch 24 were confirmed still ready: `connectivity`, `eulerian-circuit`,
`hamiltonian-cycle`, `graph-coloring`, each gated on only its already-authored `math.disc`
sibling. All 4 authored this batch, Blueprint-grounded, reused by reference.

- **`math.graph.connectivity`** (proficient/analyze, requires `math.disc.graph-connectivity`
  only, cross-link `math.disc.graph-connectivity` already authored) — the quantitative
  refinement of that entry's binary connectedness notion: vertex connectivity $\kappa(G)$, edge
  connectivity $\lambda(G)$, the inequality $\kappa(G)\le\lambda(G)\le\delta(G)$, and Menger's
  theorem at orientation level (max vertex-disjoint paths = min vertex cut). 3 misconceptions,
  birth types independently derived (Blueprint pre-assigns none): MC-1
  BINARY-CONNECTEDNESS-ASSUMED-SUFFICIENT (Type 1, foundational), MC-2
  KAPPA-LAMBDA-DELTA-INEQUALITY-ASSUMED-COINCIDENTAL (Type 1, high), MC-3
  MENGERS-THEOREM-ASSUMED-LOOSE-CORRELATION (Type 2, moderate).
- **`math.graph.eulerian-circuit`** (proficient/apply, requires `math.disc.euler-hamiltonian`
  only, cross-link `math.disc.euler-hamiltonian` already authored) — Euler's theorem (iff
  even-degree/exactly-two-odd), Hierholzer's algorithm, Eulerian digraphs, plus an
  introductory-depth Hamiltonian survey (Dirac's/Ore's theorems as sufficient-not-necessary) and
  the Eulerian-vs-Hamiltonian complexity asymmetry ($O(n+m)$ vs. NP-complete). 3 misconceptions:
  MC-1 EULERIAN-CIRCUIT-REQUIRES-EVEN-NUMBER-OF-EDGES (Type 4, moderate — Blueprint-pre-assigned,
  independently confirmed), MC-2 DIRAC-IMPLIES-HAMILTONICITY-IS-NECESSARY (Type 4, critical,
  same), MC-3 EULERIAN-IMPLIES-HAMILTONIAN (Type 6, moderate, same — directly cross-referenced to
  the identically-named misconception already registered in `math.disc.euler-hamiltonian`'s own
  MC-3). Documented a genuine content-overlap in its own Curriculum Feedback: its Blueprint's
  Dirac's-theorem survey substantially overlaps `math.graph.hamiltonian-cycle`'s own Blueprint,
  which develops the identical theorem (same wheel-graph $W_5$ example) in far greater depth —
  resolved by keeping this entry's own treatment at introductory breadth and deferring depth to
  that sibling.
- **`math.graph.hamiltonian-cycle`** (expert/apply, requires `math.disc.euler-hamiltonian` only,
  cross-link `math.disc.complexity-classes` re-verified genuinely unauthored — independence mode
  confirmed) — Dirac's theorem developed as its own dedicated focus: the sufficient-not-necessary
  logical structure, the $P_4$-vs-$C_4$ single-edge-flip demonstration, and the TSP extension at
  orientation level (existence-vs-optimal-weight, metric-case approximability). 3
  misconceptions: MC-1 DIRAC-THEOREM-ASSUMED-TO-CONTRADICT-NP-COMPLETENESS (Type 1, foundational),
  MC-2 FAILED-DIRAC-CONDITION-ASSUMED-TO-PROVE-NON-EXISTENCE (Type 4, high — matching
  `math.graph.eulerian-circuit`'s own MC-2 mechanism, cited directly), MC-3
  EXISTENCE-ASSUMED-TO-SOLVE-TSP (Type 1, moderate). Its own Curriculum Feedback confirms and
  closes `eulerian-circuit`'s forward-pointing note: the deeper Dirac's-theorem treatment that
  entry deferred is authored here, using the same running $W_5$ example.
- **`math.graph.graph-coloring`** (expert/analyze, requires `math.disc.graph-coloring`, cross-link
  `math.disc.graph-coloring`) — chromatic number bounded from both sides (clique/independence
  lower bounds, greedy/Brooks upper bounds), the Mycielski-construction gap between $\chi$ and
  $\omega$, the Five Color Theorem's full constructive proof in explicit contrast with the Four
  Color Theorem's fundamentally different computer-assisted proof, and edge coloring via Vizing's
  theorem (Class 1 vs. Class 2, Holyer's NP-hardness result). 3 misconceptions: MC-1
  CHROMATIC-NUMBER-EQUALS-CLIQUE-NUMBER (Type 1, critical), MC-2
  FIVE-COLOR-PROOF-EXTENDS-TO-FOUR (Type 1, foundational), MC-3 VIZING-HOLDS-FOR-MULTIGRAPHS
  (Type 1, moderate). **A second genuine Blueprint-staleness finding this same domain** (same
  class as Batch 24's `minimum-spanning-tree` finding, not fixed per standing scope — Blueprints
  are never edited by this program): this concept's own Blueprint (Component 7 and Validation
  Checklist V-5) declares its `math.disc.graph-coloring` cross-link "MISSING on disk," setting
  independence mode on that stale basis — verified via direct directory listing that BOTH the
  Blueprint file and the Educational Brain entry for `math.disc.graph-coloring` genuinely exist.
  This entry follows the corrected, current state: that sibling's misconception register was
  consulted directly to ground this entry's own Transfer Connections, per case-2 cross-link
  handling (substantive incorporation of an already-authored peer).

`math.graph` **3/16 → 7/16**. `math.disc`/`math.func` unchanged this batch (20/32 and 1/29,
parked). Mathematics **328/908 → 332/908**, 803 remaining. No genuine content-overlap found
beyond the two deliberately-recorded items above (the Eulerian-circuit/Hamiltonian-cycle
division of labor, and the second Blueprint-staleness correction). All tracking files updated in
the same commit: `ROADMAP.md` Section 1/2 totals and the `math.graph` domain row, `COVERAGE.md`'s
mathematics summary row and this Delivery history entry, `CLAUDE.md`'s campaign section.
`EDUCATIONAL_BRAIN_INDEX.md` and `QUALITY.md` again deferred (same generated-artifact rationale
as prior batches). Validated: `npx tsx scripts/validate-knowledge-graph.ts
docs/mathematics/kg/graph.json` PASS, 908/908 reachable, 0 failures, 0 warnings (KG file
untouched); `scripts/math/state.ts` confirms math.graph 7/16 and mathematics 332/908, 0 orphan EB
files, 0 duplicate EB files; `npx tsc --noEmit` clean; targeted tests `mathPackageCorpus.test.ts`
+ `mathematicsAssetContract.test.ts` 479/479 passed. All 4 new entries' heading structure diffed
clean against `math.alg.like-terms.md` on the first pass (0 diffs each). Fresh `math.graph`
frontier computed: 6 candidates ready (`graph-invariants`, `graph-operations`, `maximum-flow`,
`matching`, `ramsey-theory`, `extremal-graph-theory`). No Physics, Chemistry, English, Biology,
Computer Science, KG, Blueprint, or runtime file was modified.

### Batch 26 — closing 3 of math.graph's post-Batch-25 frontier (2026-09-12)

Re-computed the frontier fresh — 6 candidates confirmed ready: `graph-invariants`,
`graph-operations`, `maximum-flow`, `matching`, `ramsey-theory`, `extremal-graph-theory`. Selected
a coherent 3-concept subset sharing `math.graph.graph` as their sole prerequisite
(`graph-invariants`, `graph-operations`, `matching`), deferring the two deeper-prerequisite/
higher-difficulty concepts (`maximum-flow`, requiring `connectivity`; `ramsey-theory` and
`extremal-graph-theory`, each requiring a `math.disc` cross-domain prerequisite in addition to
`graph`) to a future batch. All 3 Blueprint-grounded, reused by reference.

- **`math.graph.graph-invariants`** (proficient/understand, requires `math.graph.graph` only,
  no cross-links) — graph isomorphism via bijection, the six standard invariants (degree
  sequence, order, size, components, girth, diameter) as a one-way filter (mismatch proves
  non-isomorphism; a match never proves isomorphism), and the canonical equal-invariant
  non-isomorphic pairs ($C_6$ vs. $C_3\sqcup C_3$; $K_{3,3}$ vs. the triangular prism). 3
  misconceptions, birth types independently derived (Blueprint pre-assigns none): MC-1
  EQUAL-INVARIANTS-MEANS-ISOMORPHIC (Type 1, critical), MC-2 DIAMETER-EQUALS-GIRTH (Type 3,
  foundational), MC-3 ISOMORPHISM-IS-SAME-AS-EQUAL-GRAPHS (Type 3, moderate).
- **`math.graph.graph-operations`** (proficient/apply, requires `math.graph.graph` only, no
  cross-links) — union/intersection/complement/join, subgraph vs. induced subgraph, edge/vertex
  deletion and contraction, the line graph and its degree formula, the Cartesian product, and a
  property-preservation table (bipartiteness/connectivity/regularity across operations). 3
  misconceptions: MC-1 COMPLEMENT-PRESERVES-BIPARTITE (Type 1, moderate), MC-2
  INDUCED-SUBGRAPH-VS-SUBGRAPH (Type 4, foundational), MC-3 CONTRACTION-ALWAYS-SIMPLE (Type 1,
  moderate).
- **`math.graph.matching`** (expert/apply, requires `math.graph.graph` only, no cross-links) —
  matching/maximum matching/maximal matching/perfect matching distinguished via counterexample,
  $M$-alternating/augmenting paths and Berge's theorem, Hall's theorem (the all-subsets
  quantifier, not just singletons), König's theorem for bipartite graphs, and the Gallai
  inequality's weaker bound for general graphs (via $K_3$). 3 misconceptions: MC-1
  MAXIMAL-EQUALS-MAXIMUM (Type 3, critical), MC-2 HALL-CONDITION-ONLY-FOR-SINGLETONS (Type 1,
  critical), MC-3 KÖNIG-HOLDS-FOR-ALL-GRAPHS (Type 1, foundational).

`math.graph` **7/16 → 10/16**. `math.disc`/`math.func` unchanged this batch (20/32 and 1/29,
parked). Mathematics **332/908 → 335/908**, 800 remaining. No genuine content-overlap or
metadata discrepancy found in any of the 3 entries; one genuine forward connection recorded in
`matching`'s own Curriculum Feedback (König's theorem and `connectivity`'s Menger's theorem share
the same max-flow-min-cut/LP-duality structural pattern — noted, not developed, to avoid
overreach). Full per-concept detail above. All tracking files updated in the same commit:
`ROADMAP.md` Section 1/2 totals and the `math.graph` domain row, `COVERAGE.md`'s mathematics
summary row and this Delivery history entry, `CLAUDE.md`'s campaign section.
`EDUCATIONAL_BRAIN_INDEX.md` and `QUALITY.md` again deferred (same generated-artifact rationale
as prior batches). Validated: `npx tsx scripts/validate-knowledge-graph.ts
docs/mathematics/kg/graph.json` PASS, 908/908 reachable, 0 failures, 0 warnings (KG file
untouched); `scripts/math/state.ts` confirms math.graph 10/16 and mathematics 335/908, 0 orphan
EB files, 0 duplicate EB files; `npx tsc --noEmit` clean; targeted tests
`mathPackageCorpus.test.ts` + `mathematicsAssetContract.test.ts` 479/479 passed. All 3 new
entries' heading structure diffed clean against `math.alg.like-terms.md` on the first pass (0
diffs each). Fresh `math.graph` frontier computed: 3 candidates ready (`maximum-flow`,
`ramsey-theory`, `extremal-graph-theory`), all expert/research difficulty. No Physics, Chemistry,
English, Biology, Computer Science, KG, Blueprint, or runtime file was modified.

### Batch 27 — closing math.graph's final ready frontier (2026-09-12)

Re-computed the frontier fresh — the exact 3 concepts deferred from Batch 26 were confirmed still
ready: `maximum-flow`, `ramsey-theory`, `extremal-graph-theory`. All 3 Blueprint-grounded, reused
by reference, all authored this batch.

- **`math.graph.maximum-flow`** (expert/apply, requires `math.graph.connectivity` only, no
  cross-links) — flow networks, feasible flow, the residual graph and augmenting paths, the
  Max-Flow Min-Cut Theorem (three equivalent statements, with the canonical minimum-cut
  construction via reachability in the final residual graph), Edmonds-Karp's polynomial
  guarantee, and the bipartite-matching-to-flow reduction (unit capacities forcing integer flow
  to exactly encode a matching). 3 misconceptions: MC-1 BACKWARD-EDGES-ARE-PHYSICAL (Type 6,
  foundational), MC-2 MIN-CUT-IS-UNIQUE (Type 1, moderate), MC-3
  MAX-FLOW-SOLVES-GENERAL-MATCHING (Type 1, critical).
- **`math.graph.ramsey-theory`** (expert/analyze, requires `math.disc.pigeonhole` +
  `math.graph.graph`, no cross-links) — Ramsey numbers, the full two-sided proof that
  $R(3,3)=6$ (Pigeonhole upper bound plus an explicit $K_5$ 2-coloring lower bound), the
  recursive upper bound, the Erdős probabilistic lower bound as a genuine existence-without-
  construction argument, and the honest state of knowledge (only a handful of exact Ramsey
  numbers known, $R(5,5)$ still open). 3 misconceptions: MC-1 RAMSEY-NUMBER-R-3-3-IS-5 (Type 1,
  critical), MC-2 PROBABILISTIC-EXISTENCE-IS-CONSTRUCTION (Type 1, foundational), MC-3
  RAMSEY-NUMBERS-ARE-KNOWN-FOR-ALL-SMALL-VALUES (Type 1, moderate).
- **`math.graph.extremal-graph-theory`** (research/analyze, requires `math.graph.graph` +
  `math.disc.combinatorics`, no cross-links) — Turán's theorem as a genuine extremal-
  optimization question (not mere edge-counting), the Turán graph $T(n,r)$ as a concrete,
  pigeonhole-verified $K_{r+1}$-free construction achieving the bound exactly, and the Szemerédi
  Regularity Lemma at orientation level as a qualitatively different (structural, not numerical)
  extremal result. 3 misconceptions: MC-1 TURAN-THEOREM-ASSUMED-MERE-EDGE-COUNTING (Type 1,
  foundational), MC-2 TURAN-BOUND-ASSUMED-MERELY-ABSTRACT (Type 2, high), MC-3
  REGULARITY-LEMMA-ASSUMED-ANOTHER-NUMERICAL-FORMULA (Type 1, moderate).

`math.graph` **10/16 → 13/16**. **Correction made during this batch's own validation** (initial
drafts of all 3 entries' Version History sections incorrectly claimed this batch would reach
16/16 DOMAIN CERTIFIED — `scripts/math/state.ts` was run fresh per standing discipline and showed
`eb: 13`, not 16; investigating found the domain's remaining 3 concepts — `shortest-path`,
`algebraic-graph-theory`, `random-graph` — each require a cross-domain prerequisite outside
math.graph that is not yet authored (`math.disc.asymptotic-notation`, `math.linalg.eigenvalues`,
`math.prob.probability-axioms` respectively), so they were never in the topologically-ready
frontier this batch computed. All 3 entries' Version History sections were corrected in place
before commit to state 13/16 PARKED, not 16/16 CERTIFIED.** `math.graph` is now PARKED, joining
`math.disc` and `math.func` as domains blocked on external cross-domain prerequisites.
`math.disc`/`math.func` unchanged this batch (20/32 and 1/29). Mathematics **335/908 → 338/908**,
797 remaining. No genuine content-overlap or metadata discrepancy found in any of the 3 entries.
Full per-concept detail above. All tracking files updated in the same commit: `ROADMAP.md`
Section 1/2 totals and the `math.graph` domain row (status corrected to PARKED), `COVERAGE.md`'s
mathematics summary row and this Delivery history entry, `CLAUDE.md`'s campaign section.
`EDUCATIONAL_BRAIN_INDEX.md` and `QUALITY.md` again deferred (same generated-artifact rationale
as prior batches). Validated: `npx tsx scripts/validate-knowledge-graph.ts
docs/mathematics/kg/graph.json` PASS, 908/908 reachable, 0 failures, 0 warnings (KG file
untouched); `scripts/math/state.ts` confirms math.graph 13/16 and mathematics 338/908, 0 orphan
EB files, 0 duplicate EB files; `npx tsc --noEmit` clean; targeted tests
`mathPackageCorpus.test.ts` + `mathematicsAssetContract.test.ts` 479/479 passed. All 3 new
entries' heading structure diffed clean against `math.alg.like-terms.md` on the first pass (0
diffs each). math.graph has 0 topologically-ready candidates remaining; the next step for
mathematics is either a bounded cross-domain excursion to unblock one of the three parked domains
(math.disc, math.func, math.graph) or selecting a fresh unstarted domain entirely. No Physics,
Chemistry, English, Biology, Computer Science, KG, Blueprint, or runtime file was modified.

### Batch 28 — resuming math.func as a standalone domain campaign (2026-09-12)

With math.disc and math.graph both PARKED (0 topologically-ready candidates each), computed the
frontier fresh across ALL mathematics domains rather than defaulting to a brand-new unstarted
domain (each of which has only 1-2 root-node candidates ready). Result: `math.func` — previously
parked at 1/29 as a small math.alg-unblocking excursion (Batch 14) — had 13 concepts
topologically ready, all gated only on the already-authored `math.func.function-concept`.
Selected `math.func` to resume as a full standalone domain campaign, matching the precedent set
when `math.disc` was continued after `math.alg`'s certification. Authored a coherent 4-concept
subset (the "function properties" cluster), all Blueprint-grounded, reused by reference.

- **`math.func.domain-range`** (proficient/understand, requires `function-concept` only, no
  cross-links) — domain found by algebraic restriction (denominator/radical/logarithm rules,
  chained inside-out for composite expressions); range found by STRUCTURAL reasoning (never
  sampling) — minimum/maximum, achievability, gap-checking, and the algebraic solve-for-$x$
  technique; the two-condition domain-of-composition rule (inner domain AND inner output in
  outer domain). 3 misconceptions, matching the Blueprint's own classification: MC-1
  RANGE-EQUALS-DOMAIN (Type 1), MC-2 DOMAIN-ONLY-EXCLUDES-ZEROS (Type 5), MC-3
  RANGE-IS-COMPUTED-NOT-REASONED (Type 1).
- **`math.func.function-notation`** (proficient/apply, requires `function-concept` only, no
  cross-links) — $f(x)$ as substitution (never multiplication, exactly parallel to
  $\cos(x)$), full-substitution discipline for compound arguments, the general failure of
  $f(a+b)=f(a)+f(b)$ outside linear functions, and the difference quotient
  $[f(x+h)-f(x)]/h$ as the calculus-foundational culmination of correct substitution. 3
  misconceptions: MC-1 f(x)-MEANS-f-TIMES-x (Type 3), MC-2 f(a+b)=f(a)+f(b) (Type 1), MC-3
  f(a)-IS-f-APPLIED-AMBIGUOUSLY (Type 3).
- **`math.func.injectivity`** (proficient/understand, requires `function-concept` only, unlocks
  `math.func.inverse-functions`, no cross-links) — the universal "for all" definition proven
  generally (never by sampling), the non-automatic direction distinguished from every function's
  trivially-automatic well-definedness, and the all-or-nothing horizontal line test (one failing
  line is total disqualification). 3 misconceptions, all independently classified as Type 1
  (overgeneralization): MC-1 INJECTIVITY-CONFIRMED-BY-SAMPLING, MC-2
  INJECTIVITY-DIRECTION-CONFUSED-WITH-AUTOMATIC-WELL-DEFINEDNESS, MC-3
  HORIZONTAL-LINE-TEST-TREATED-AS-DEGREE-OF-INJECTIVITY.
- **`math.func.surjectivity`** (proficient/understand, requires `function-concept` only,
  unlocks `math.func.bijection`, no cross-links) — every codomain element hit (never mind how
  many times), the range-equals-codomain characterization, the asymmetry between confirming
  surjectivity (check every codomain element) and disproving it (one counterexample suffices),
  and its complete independence from injectivity (demonstrated via $x^2$ restricted to
  $\mathbb{R}\to[0,\infty)$: surjective but not injective). 3 misconceptions: MC-1
  SURJECTIVE-CONFLATED-WITH-INJECTIVE (Type 6, independently classified — the Blueprint assigns
  severity but not birth type), MC-2 ALL-DOMAIN-ELEMENTS-MAPPED-ASSUMED-SUFFICIENT (Type 1),
  MC-3 SINGLE-COUNTEREXAMPLE-NOT-RECOGNIZED-AS-SUFFICIENT (Type 1).

`math.func` **1/29 → 5/29**. `math.disc`/`math.graph` unchanged this batch (20/32 parked, 13/16
parked). Mathematics **338/908 → 342/908**, 793 remaining. No genuine content-overlap or
metadata discrepancy found in any of the 4 entries — all requires/unlocks/cross_links verified
directly against the live KG (`injectivity` unlocks `math.func.inverse-functions`,
`surjectivity` unlocks `math.func.bijection`, both confirmed). Full per-concept detail above.
All tracking files updated in the same commit: `ROADMAP.md` Section 1/2 totals and the
`math.func` domain row (status corrected to RESUMED/standalone campaign), `COVERAGE.md`'s
mathematics summary row and this Delivery history entry, `CLAUDE.md`'s campaign section.
`EDUCATIONAL_BRAIN_INDEX.md` and `QUALITY.md` again deferred (same generated-artifact rationale
as prior batches). Validated: `npx tsx scripts/validate-knowledge-graph.ts
docs/mathematics/kg/graph.json` PASS, 908/908 reachable, 0 failures, 0 warnings (KG file
untouched); `scripts/math/state.ts` confirms math.func 5/29 and mathematics 342/908, 0 orphan EB
files, 0 duplicate EB files; `npx tsc --noEmit` clean; targeted tests
`mathPackageCorpus.test.ts` + `mathematicsAssetContract.test.ts` 479/479 passed. All 4 new
entries' heading structure diffed clean against `math.alg.like-terms.md` on the first pass (0
diffs each). Fresh `math.func` frontier computed: 10 candidates ready (`bijection` newly
unblocked by `surjectivity`; `graph-of-function`, `real-valued-function`, `composition`,
`periodic-function`, `linear-function`, `exponential-function`, `piecewise-function`,
`monotonic-function`, `function-operations`). No Physics, Chemistry, English, Biology, Computer
Science, KG, Blueprint, or runtime file was modified.

### Batch 29 — math.func: operations, composition, monotonicity, bijection (2026-09-12)

Re-computed the frontier fresh — 10 candidates confirmed ready. Selected a coherent 4-concept
subset (`function-operations`, `composition`, `monotonic-function`, `bijection`), deferring the
remaining 6 (`graph-of-function`, `real-valued-function`, `periodic-function`, `linear-function`,
`exponential-function`, `piecewise-function`) to a future batch. All 4 Blueprint-grounded, reused
by reference.

- **`math.func.function-operations`** (proficient/apply, requires `function-concept` only,
  unlocks `math.func.composition`) — the four pointwise operations, the combined-domain
  intersection rule (with the extra division-by-zero exclusion), and the pointwise-product-
  versus-composition distinction, including composition's non-commutativity in contrast with
  pointwise addition/multiplication's genuine commutativity. 3 misconceptions, matching the
  Blueprint's own classification: MC-1 COMBINED-DOMAIN-ASSUMED-FROM-ONE-FUNCTION-ONLY (Type 1),
  MC-2 POINTWISE-PRODUCT-CONFLATED-WITH-COMPOSITION (Type 4), MC-3
  COMPOSITION-ASSUMED-COMMUTATIVE (Type 1).
- **`math.func.composition`** (proficient/apply, requires `function-concept` only, unlocks
  `math.calc.chain-rule`, cross-link `math.calc.chain-rule` confirmed genuinely unauthored) —
  the right-to-left "f AFTER g" reading convention, the two-gate domain rule (membership in
  $g$'s domain AND $g(x)$'s membership in $f$'s domain), non-commutativity across three worked
  pairs, and composite-expression decomposition as the direct structural prerequisite for the
  (not-yet-authored) chain rule. 3 misconceptions, matching the Blueprint's own MAMR priority
  ordering (MC-1 cleared first as FOUNDATIONAL): MC-1 COMPOSITION-REVERSED (Type 3), MC-2
  DOMAIN-IGNORED (Type 1), MC-3 COMPOSITION-COMMUTATIVE (Type 1).
- **`math.func.monotonic-function`** (proficient/understand, requires `function-concept` only,
  unlocks `math.func.inverse-functions`) — strict versus weak monotonicity (a constant function
  as the dividing case), the sample-points-can-mislead demonstration (a cubic reversing just
  beyond a consistent-looking sample), and the proof that strict monotonicity implies
  injectivity with the converse's failure ($1/x$ genuinely injective yet not monotonic). 3
  misconceptions: MC-1 STRICT-WEAK-MONOTONICITY-CONFLATED (Type 3), MC-2
  MONOTONICITY-EXTRAPOLATED-FROM-SAMPLE-POINTS (Type 1), MC-3 INJECTIVE-IMPLIES-MONOTONIC
  (Type 1).
- **`math.func.bijection`** (proficient/understand, requires `injectivity` + `surjectivity`,
  unlocks `math.func.inverse-functions` + `math.found.cardinality`) — bijective as the
  conjunction of both prerequisite properties, the "exactly one preimage" joint consequence
  (at-least-one from surjectivity plus at-most-one from injectivity), and the two specific
  failure modes (multi-valued, or undefined-somewhere) an inverse-construction attempt produces
  when either property is missing. 3 misconceptions, all Type 1 (overgeneralization): MC-1
  INJECTIVE-OR-SURJECTIVE-ASSUMED-SUFFICIENT-FOR-BIJECTIVE, MC-2
  AT-LEAST-ONE-PREIMAGE-ASSUMED-SUFFICIENT-FOR-PERFECT-PAIRING, MC-3
  INVERSE-RELATION-ASSUMED-ALWAYS-A-VALID-FUNCTION. **A genuine Blueprint-staleness finding**
  (not fixed, per standing scope): this concept's own Blueprint declares its
  `math.found.cardinality` cross-link "not yet authored" — verified via directory listing that
  both the Blueprint and the EB entry genuinely exist (`math.found` has been CERTIFIED at 82/82
  since 2026-07-26); corrected in this entry's own Curriculum Feedback, Blueprint left
  unmodified.

`math.func` **5/29 → 9/29**. `math.disc`/`math.graph` unchanged this batch (20/32 parked, 13/16
parked). Mathematics **342/908 → 346/908**, 789 remaining. No genuine content-overlap found
beyond the one deliberately-recorded Blueprint-staleness correction above. Full per-concept
detail above. All tracking files updated in the same commit: `ROADMAP.md` Section 1/2 totals
and the `math.func` domain row, `COVERAGE.md`'s mathematics summary row and this Delivery
history entry, `CLAUDE.md`'s campaign section. `EDUCATIONAL_BRAIN_INDEX.md` and `QUALITY.md`
again deferred (same generated-artifact rationale as prior batches). Validated: `npx tsx
scripts/validate-knowledge-graph.ts docs/mathematics/kg/graph.json` PASS, 908/908 reachable, 0
failures, 0 warnings (KG file untouched); `scripts/math/state.ts` confirms math.func 9/29 and
mathematics 346/908, 0 orphan EB files, 0 duplicate EB files; `npx tsc --noEmit` clean; targeted
tests `mathPackageCorpus.test.ts` + `mathematicsAssetContract.test.ts` 479/479 passed. All 4 new
entries' heading structure diffed clean against `math.alg.like-terms.md` on the first pass (0
diffs each). Fresh `math.func` frontier computed: 7 candidates ready (`inverse-functions` newly
unblocked by `bijection`; `graph-of-function`, `real-valued-function`, `periodic-function`,
`linear-function`, `exponential-function`, `piecewise-function`). No Physics, Chemistry,
English, Biology, Computer Science, KG, Blueprint, or runtime file was modified.

### Batch 30 — math.func: inverses, graphs, real-valued functions, linear functions (2026-09-12)

Re-computed the frontier fresh — 7 candidates confirmed ready (matching Batch 29's deferred
list exactly). Selected a 4-concept subset (`inverse-functions`, `graph-of-function`,
`real-valued-function`, `linear-function`), deferring the remaining 3 (`periodic-function`,
`exponential-function`, `piecewise-function`) to a future batch. All 4 Blueprint-grounded,
reused by reference.

- **`math.func.inverse-functions`** (proficient/apply, requires `bijection`, unlocks
  `math.trig.inverse-trig` + `math.alg.logarithm`, cross-link `math.trig.inverse-trig` confirmed
  genuinely unauthored — independence mode) — the two "undoing" identities
  ($f^{-1}(f(x))=x$ and $f(f^{-1}(y))=y$) built directly on `bijection`'s own "exactly one
  preimage" construction, algebraic construction-plus-general-verification (never a single
  sampled value), bijectivity-first as a genuine existence prerequisite (restrict the domain if
  it fails), and the graph's reflection over $y=x$ (never either coordinate axis). 3
  misconceptions, independently birth-type classified (the Blueprint assigns severity but not a
  formal type): MC-1 INVERSE-VERIFIED-BY-SAMPLING (Type 1), MC-2
  INVERSE-ASSUMED-TO-EXIST-WITHOUT-BIJECTIVITY-CHECK (Type 1), MC-3
  INVERSE-GRAPH-REFLECTED-OVER-WRONG-AXIS (Type 6).
- **`math.func.graph-of-function`** (proficient/understand, requires `function-concept` +
  `math.geom.coordinate-plane`, no unlocks or cross-links listed in the KG) — the graph as the
  literal set of $(x,f(x))$ pairs (never a separate geometric object), the vertical line test as
  a direct visual restatement of "one output per input," and the orientation-level finding that
  a curve failing the test (a full circle) genuinely is not one function's graph but typically
  splits into several (upper/lower semicircles) that each are. 3 misconceptions, independently
  birth-type classified: MC-1 GRAPH-ASSUMED-SEPARATE-OBJECT-FROM-FUNCTION (Type 1), MC-2
  VERTICAL-LINE-TEST-ASSUMED-ARBITRARY-CONVENTION (Type 4), MC-3
  FAILED-TEST-ASSUMED-ONE-FLAWED-FUNCTION (Type 1).
- **`math.func.real-valued-function`** (proficient/understand, requires `function-concept` +
  `math.found.real-numbers`, unlocks `math.calc.limits`, cross-link `math.calc.limits`
  confirmed genuinely unauthored — the P76 transfer probe previews limits self-containedly,
  same pattern as `composition`'s handling of its own unauthored `math.calc.chain-rule`
  cross-link in Batch 29) — $f:D\to\mathbb{R}$, the natural-domain determination procedure
  (testing denominators, even roots, logarithms for failure), domain-versus-range as genuinely
  different sets, and the single-output rule ruling out $\pm\sqrt{x}$ as a function. 3
  misconceptions, independently birth-type classified, with MC-1 designated FOUNDATIONAL by the
  Blueprint: MC-1 DOMAIN-RANGE-CONFUSED (Type 3), MC-2 DOMAIN-IS-ALWAYS-ALL-REALS (Type 1), MC-3
  MULTI-VALUED-IS-A-FUNCTION (Type 5).
- **`math.func.linear-function`** (proficient/apply, requires `function-concept` +
  `math.geom.slope`, unlocks `math.func.quadratic-function`, cross-link
  `math.geom.line-equation` confirmed authored — substantive cross-link-probe incorporation,
  directly reusing that concept's own $(1,5)$-$(3,11)$ worked line and standard-form
  conversion) — a linear function as a genuine FUNCTION (evaluated, not just graphed), the
  slope as a constant rate of change verified across two very different input pairs, and the
  identical algebra connecting `math.geom.line-equation`'s three geometric forms to function
  notation. 3 misconceptions, independently birth-type classified, with MC-1 and MC-2 both
  designated FOUNDATIONAL by the Blueprint: MC-1
  LINEAR-FUNCTIONS-AND-LINE-EQUATIONS-TREATED-AS-UNRELATED (Type 3), MC-2
  RATE-OF-CHANGE-ASSUMED-TO-VARY-ACROSS-THE-DOMAIN (Type 1), MC-3
  FUNCTION-EVALUATION-CONFUSED-WITH-SOLVING-FOR-X (Type 3).

`math.func` **9/29 → 13/29**. `math.disc`/`math.graph` unchanged this batch (20/32 parked, 13/16
parked). Mathematics **346/908 → 350/908**, 785 remaining. No genuine content-overlap or
Blueprint/KG metadata discrepancy found in any of the 4 entries this batch. Full per-concept
detail above. All tracking files updated in the same commit: `ROADMAP.md` Section 1/2 totals and
the `math.func` domain row, `COVERAGE.md`'s mathematics summary row and this Delivery history
entry, `CLAUDE.md`'s campaign section. `EDUCATIONAL_BRAIN_INDEX.md` and `QUALITY.md` again
deferred (same generated-artifact rationale as prior batches). Validated: `npx tsx
scripts/validate-knowledge-graph.ts docs/mathematics/kg/graph.json` PASS, 908/908 reachable, 0
failures, 0 warnings (KG file untouched); `scripts/math/state.ts` confirms math.func 13/29 and
mathematics 350/908, 0 orphan EB files, 0 duplicate EB files; `npx tsc --noEmit` clean; targeted
tests `mathPackageCorpus.test.ts` + `mathematicsAssetContract.test.ts` 479/479 passed. All 4 new
entries' heading structure diffed clean against `math.alg.like-terms.md` on the first pass (0
diffs each). Fresh `math.func` frontier computed: 8 candidates ready (`zero-of-function`,
`even-odd-functions`, `transformations-functions` newly unblocked by `graph-of-function`;
`periodic-function`, `quadratic-function` newly unblocked by `linear-function`;
`exponential-function`, `logarithmic-function` newly unblocked by `inverse-functions`;
`piecewise-function`). No Physics, Chemistry, English, Biology, Computer Science, KG, Blueprint,
or runtime file was modified.

### Batch 31 — math.func: zeros, parity, transformations, periodicity (2026-09-12)

Re-computed the frontier fresh — the exact 8 candidates deferred from Batch 30 were confirmed
still ready. Selected a 4-concept subset (`zero-of-function`, `even-odd-functions`,
`transformations-functions`, `periodic-function`), deferring the remaining 4
(`quadratic-function`, `exponential-function`, `logarithmic-function`, `piecewise-function`) to
a future batch. All 4 Blueprint-grounded, reused by reference.

- **`math.func.zero-of-function`** (proficient/understand, requires `graph-of-function`, unlocks
  `math.num.root-finding`, cross-link `math.num.root-finding` confirmed genuinely unauthored —
  independence mode) — a zero as an $x$-value ($f(x^*)=0$) distinct from the $y$-intercept, the
  possibility of zero/one/many real zeros, and the hole-vs-zero discrimination for rational
  functions (a candidate must survive both numerator-zero AND denominator-nonzero). 3
  misconceptions, birth types adopted directly from the Blueprint's own classification: MC-1
  ZEROS-ARE-Y-VALUES (Type 3), MC-2 EVERY-FUNCTION-HAS-A-ZERO (Type 5), MC-3 HOLE-VS-ZERO
  (Type 5).
- **`math.func.even-odd-functions`** (proficient/apply, requires `graph-of-function`, no
  unlocks or cross-links listed in the KG) — the algebraic test $f(-x)$ vs. $f(x)$ vs. $-f(x)$
  as ground truth over a picture, even=$y$-axis/odd=origin symmetry with $x$-axis symmetry ruled
  out as structurally impossible (violates the vertical line test), the product/sum parity
  rules, and the symmetric-integral shortcut. 3 misconceptions, birth types adopted directly
  from the Blueprint: MC-1 EVEN-ODD-FROM-EXPONENTS (Type 5), MC-2 NEITHER-MEANS-BOTH (Type 1),
  MC-3 EVEN-MEANS-SYMMETRIC-ABOUT-x-AXIS (Type 3).
- **`math.func.transformations-functions`** (proficient/apply, requires `graph-of-function`, no
  unlocks or cross-links listed in the KG) — the canonical form $g(x)=af(b(x-h))+k$, the
  inside-affects-horizontal/outside-affects-vertical rule, the counter-intuitive shift direction
  (opposite to the visible sign), and the non-commutativity of horizontal shift and horizontal
  compression (order matters, resolved by factoring the argument first). 3 misconceptions, birth
  types adopted directly from the Blueprint: MC-1 HORIZONTAL-SHIFT-WRONG-DIRECTION (Type 3),
  MC-2 HORIZONTAL-AFFECTS-VERTICAL (Type 1), MC-3 ORDER-INDEPENDENT (Type 1).
- **`math.func.periodic-function`** (proficient/understand, requires `function-concept`,
  cross-link `math.trig.trig-functions` confirmed genuinely unauthored — cross-link mode) — the
  exact algebraic condition $f(x+T)=f(x)$ for the FUNDAMENTAL (smallest positive) period,
  period-vs-frequency as reciprocals with different units, the $2\pi/|B|$ rule for sinusoidal
  functions, period as a distance between identical-phase points (never a single peak's
  location), and damping/irrational-ratio counterexamples that destroy exact periodicity despite
  visual similarity. 3 misconceptions, birth types adopted directly from the Blueprint: MC-1
  PERIOD-VS-FREQUENCY (Type 3), MC-2 PERIOD-IS-THE-PEAK (Type 5), MC-3
  ALMOST-PERIODIC-IS-PERIODIC (Type 1).

`math.func` **13/29 → 17/29** — only 12 concepts remain before the domain reaches DOMAIN
CERTIFICATION. `math.disc`/`math.graph` unchanged this batch (20/32 parked, 13/16 parked).
Mathematics **350/908 → 354/908**, 781 remaining. No genuine content-overlap or Blueprint/KG
metadata discrepancy found in any of the 4 entries this batch (one stray typo caught and
corrected during self-review, before validation: `periodic-function`'s own Identity section
briefly carried an incomplete sentence fragment in its Cross-links line, fixed to read
"cross-link mode" cleanly). Full per-concept detail above. All tracking files updated in the
same commit: `ROADMAP.md` Section 1/2 totals and the `math.func` domain row, `COVERAGE.md`'s
mathematics summary row and this Delivery history entry, `CLAUDE.md`'s campaign section.
`EDUCATIONAL_BRAIN_INDEX.md` and `QUALITY.md` again deferred (same generated-artifact rationale
as prior batches). Validated: `npx tsx scripts/validate-knowledge-graph.ts
docs/mathematics/kg/graph.json` PASS, 908/908 reachable, 0 failures, 0 warnings (KG file
untouched); `scripts/math/state.ts` confirms math.func 17/29 and mathematics 354/908, 0 orphan
EB files, 0 duplicate EB files; `npx tsc --noEmit` clean; targeted tests
`mathPackageCorpus.test.ts` + `mathematicsAssetContract.test.ts` 479/479 passed. All 4 new
entries' heading structure diffed clean against `math.alg.like-terms.md` on the first pass (0
diffs each). Fresh `math.func` frontier computed: 4 candidates ready (`quadratic-function`,
`exponential-function`, `logarithmic-function`, `piecewise-function`). No Physics, Chemistry,
English, Biology, Computer Science, KG, Blueprint, or runtime file was modified.

### Batch 32 — math.func: quadratics, exponentials, logarithms, piecewise functions (2026-09-12)

Re-computed the frontier fresh — the exact 4 candidates deferred from Batch 31 were confirmed
still ready. This batch closes the ENTIRE frontier available at batch start (all 4 authored, none
deferred). All 4 Blueprint-grounded, reused by reference.

- **`math.func.quadratic-function`** (proficient/apply, requires `linear-function` +
  `math.alg.quadratic-equation`, unlocks `math.func.polynomial-function`, cross-link
  `math.geom.parabola` confirmed genuinely unauthored — independence mode) — explicit division
  of labor with `math.alg.quadratic-equation` (that concept owns roots; this concept owns
  function evaluation, the vertex, and modeling), the vertex formula as `completing-the-square`'s
  own result packaged for direct use, and the vertex-vs-roots discrimination (two different
  real-world questions, never substitutable) demonstrated on one shared projectile function
  throughout. 3 misconceptions, birth types adopted directly from the Blueprint: MC-1
  VERTEX-AND-ROOTS-CONFLATED (Type 1), MC-2
  VERTEX-FORMULA-X-COORDINATE-MISTAKEN-FOR-THE-FULL-VERTEX (Type 5), MC-3
  QUADRATIC-FUNCTION-EVALUATION-CONFUSED-WITH-SOLVING (Type 3).
- **`math.func.exponential-function`** (proficient/apply, requires `math.alg.exponential-function`
  + `function-concept`, unlocks `math.calc.derivative-exponential`, cross-link
  `math.calc.derivative-exponential` confirmed genuinely unauthored — independence mode) — $e$ as
  a genuine compound-interest limit (not an arbitrary constant), multiplicative vs. additive
  growth modeling with a checkable numerical discrepancy (911 vs. 800), and $e^x$'s self-derivative
  property as the specific, non-coincidental reason $e$ is "natural" (contrasted against $2^x$'s
  extra $\ln2$ factor). 3 misconceptions, birth types adopted directly from the Blueprint: MC-1
  E-ASSUMED-ARBITRARY (Type 1), MC-2 EXPONENTIAL-GROWTH-REASONED-LINEARLY (Type 1), MC-3
  SELF-DERIVATIVE-PROPERTY-ASSUMED-COINCIDENTAL (Type 1).
- **`math.func.logarithmic-function`** (proficient/apply, requires `math.alg.logarithm` +
  `inverse-functions`, unlocks `math.calc.derivative-ln`, cross-link `math.calc.derivative-ln`
  confirmed genuinely unauthored — independence mode) — the domain restriction as a direct
  consequence of the exponential's own range (never an arbitrary rule), graphing entirely by
  reflection across $y=x$ (zero independent memorization), and $\ln x$'s special status inherited
  directly from `math.func.exponential-function`'s own self-derivative property, closing the
  forward reference that concept's own entry left open. 3 misconceptions, birth types adopted
  directly from the Blueprint: MC-1 LOG-DOMAIN-ASSUMED-ARBITRARY (Type 1), MC-2
  LOG-GRAPH-ASSUMED-INDEPENDENT-FACTS (Type 5), MC-3 LN-X-ASSUMED-ARBITRARILY-CHOSEN (Type 1).
- **`math.func.piecewise-function`** (proficient/apply, requires `function-concept`, no unlocks or
  cross-links listed in the KG) — boundary ownership decided precisely by the closed-vs-open
  inequality symbol, continuity as a mandatory three-way test (left limit, right limit, function
  value) rather than an assumption from notation, the domain-partition discipline (exactly one
  closed condition per boundary), and absolute value as the canonical continuous piecewise
  counterexample. 3 misconceptions, birth types adopted directly from the Blueprint: MC-1
  OPEN-ENDPOINT-IGNORED (Type 5), MC-2 PIECEWISE-MUST-BE-DISCONTINUOUS (Type 1), MC-3
  DOMAIN-PIECES-OVERLAP (Type 1).

`math.func` **17/29 → 21/29** — only 8 concepts remain before the domain reaches DOMAIN
CERTIFICATION (the sixth after math.found/math.geom/math.arith/math.nt/math.alg). `math.disc`/
`math.graph` unchanged this batch (20/32 parked, 13/16 parked). Mathematics **354/908 → 358/908**,
777 remaining. No genuine content-overlap or Blueprint/KG metadata discrepancy found in any of
the 4 entries this batch; one genuine cross-concept dependency closed (logarithmic-function's own
forward reference to exponential-function's self-derivative property, now a live, resolvable
Transfer Connection rather than a dangling citation). Full per-concept detail above. All tracking
files updated in the same commit: `ROADMAP.md` Section 1/2 totals and the `math.func` domain row,
`COVERAGE.md`'s mathematics summary row and this Delivery history entry, `CLAUDE.md`'s campaign
section. `EDUCATIONAL_BRAIN_INDEX.md` and `QUALITY.md` again deferred (same generated-artifact
rationale as prior batches). Validated: `npx tsx scripts/validate-knowledge-graph.ts
docs/mathematics/kg/graph.json` PASS, 908/908 reachable, 0 failures, 0 warnings (KG file
untouched); `scripts/math/state.ts` confirms math.func 21/29 and mathematics 358/908, 0 orphan EB
files, 0 duplicate EB files; `npx tsc --noEmit` clean; targeted tests `mathPackageCorpus.test.ts`
+ `mathematicsAssetContract.test.ts` 479/479 passed. All 4 new entries' heading structure diffed
clean against `math.alg.like-terms.md` on the first pass (0 diffs each). Fresh `math.func`
frontier computed: 3 candidates ready (`vertex-form`, `polynomial-function` newly unblocked by
`quadratic-function`; `step-function` newly unblocked by `piecewise-function`). No Physics,
Chemistry, English, Biology, Computer Science, KG, Blueprint, or runtime file was modified.

### Batch 33 — math.func: vertex form, polynomial functions, step functions (2026-09-13)

Session started with a fast-forward reconciliation: `origin/main` had advanced 6 commits since
this program's last local commit (`26f8da4`/`b8e0990`/`9babaff`/`57b3023`/`6ffbcd5`/merge `6e94a3c`
— unrelated PCD-004 session-scoped-lesson-pointer/per-tab-session/attempt-concurrency runtime
work). Confirmed via `git diff --stat` zero file overlap with any `educational-brain/`,
`ROADMAP.md`, `COVERAGE.md`, or `CLAUDE.md` file before fast-forwarding
(`git merge --ff-only origin/main`, clean, no conflicts).

Re-computed the frontier fresh — the exact 3 candidates deferred from Batch 32 were confirmed
still ready: `math.func.vertex-form`, `math.func.polynomial-function`, `math.func.step-function`.
This batch closes the ENTIRE frontier available at batch start (all 3 authored, none deferred).
All 3 Blueprint-grounded, reused by reference.

- **`math.func.vertex-form`** (proficient/apply, requires `quadratic-function` +
  `math.alg.completing-the-square`, no unlocks or cross-links listed in the KG) — converting
  standard to vertex form via completing the square (including the $a \ne 1$ case), reading the
  vertex $(h,k)$ directly with the correct sign-flip convention on $h$, determining min/max from
  the sign of $a$, and distinguishing the vertex from the $y$-intercept as genuinely different
  points answering genuinely different questions. 3 misconceptions, birth types adopted directly
  from the Blueprint: MC-1 VERTEX-FROM-STANDARD-WRONG (Type 5), MC-2
  HORIZONTAL-SHIFT-SIGN-ERROR (Type 3), MC-3 K-IS-THE-MINIMUM-VALUE-ALWAYS (Type 1). Transfer
  probe (P76, independence mode) targets conic-section center identification via the same
  sign-flip logic.
- **`math.func.polynomial-function`** (proficient/analyze, requires `quadratic-function` +
  `math.alg.polynomial`, no unlocks or cross-links listed in the KG) — explicit division of labor
  with `math.alg.polynomial` (that concept owns algebraic anatomy/end-behavior/continuity; this
  concept owns function-notation evaluation and analytical techniques building on it), evaluation
  as ordinary substitution extended to any degree, the informal sign-change root-location argument
  licensed specifically by polynomial continuity, and end-behavior-plus-evaluation as the only
  sufficient combination for full shape prediction (neither tool alone suffices — demonstrated by
  a live counterexample where end-behavior alone conceals an interior dip). **This Blueprint's
  Misconception Registry table was the first in this entire campaign to lack an explicit
  birth-type column** — all 3 misconceptions were therefore independently classified by this
  program rather than adopted: MC-1 END-BEHAVIOR-ASSUMED-SUFFICIENT-FOR-FULL-SHAPE (Type 1,
  overgeneralization from a true-but-narrow claim about the extremes into a false claim about
  everywhere), MC-2 SIGN-CHANGE-ARGUMENT-APPLIED-WITHOUT-CONTINUITY-JUSTIFICATION (Type 5,
  instruction-induced — the technique is typically taught as a mechanical recipe with its
  continuity justification never foregrounded), MC-3
  FUNCTION-EVALUATION-CONFUSED-WITH-ROOT-FINDING (Type 3, language contamination — the identical
  "evaluation vs. solving" surface-similarity mechanism already classified this way for the
  equivalent misconception in `math.func.quadratic-function` and `math.func.linear-function`).
  Stated explicitly and honestly in this entry's own Blueprint References and Curriculum Feedback
  sections as an independent classification, not Blueprint-adopted — flagged as a possible one-off
  gap in this specific Blueprint's authoring pass for the Curriculum Production Pipeline's
  attention. Transfer probe (P76, independence mode) targets bridge-cable tension modeling via
  sign-change location.
- **`math.func.step-function`** (proficient/apply, requires `piecewise-function` only, no unlocks
  or cross-links listed in the KG) — floor/ceiling as the specific all-constant-pieces family
  within `piecewise-function`'s broader framework, the negative-number floor check as the single
  most diagnostic verification point (where the "drop the decimal" positive-number shortcut
  breaks: $\lfloor -2.3 \rfloor = -3$, not $-2$), the closed-left/open-right (floor) vs.
  open-left/closed-right (ceiling) staircase-graph convention derived from the definition rather
  than memorized as an arbitrary rule, and jump discontinuity at every integer as the first
  genuinely, permanently discontinuous function family in the `math.func` sequence. 3
  misconceptions, birth types adopted directly from the Blueprint: MC-1 FLOOR-CEILING-SWAP (Type
  3), MC-2 STEP-FUNCTION-IS-CONTINUOUS (Type 1), MC-3 CLOSED-DOT-ON-WRONG-SIDE (Type 5). Transfer
  probe (P76, independence mode) targets the fractional part function $\{x\}=x-\lfloor x\rfloor$
  as a sawtooth wave of period 1, forward-bridging to `math.func.periodic-function`.

`math.func` **21/29 → 24/29** — only 5 concepts remain before the domain reaches DOMAIN
CERTIFICATION (the sixth after math.found/math.geom/math.arith/math.nt/math.alg). `math.disc`/
`math.graph` unchanged this batch (20/32 parked, 13/16 parked). Mathematics **358/908 → 361/908**,
774 remaining. No genuine content-overlap found; the only genuine Blueprint-quality finding is the
missing birth-type column noted above for `polynomial-function` alone (both sibling Blueprints
read this batch carried explicit birth-type classifications, adopted directly). Full per-concept
detail above. All tracking files updated in the same commit: `ROADMAP.md` Section 1/2 totals and
the `math.func` domain row, `COVERAGE.md`'s mathematics summary row and this Delivery history
entry, `CLAUDE.md`'s campaign section. `EDUCATIONAL_BRAIN_INDEX.md` and `QUALITY.md` again
deferred (same generated-artifact rationale as prior batches). Validated: `npx tsx
scripts/validate-knowledge-graph.ts docs/mathematics/kg/graph.json` PASS, 908/908 reachable, 0
failures, 0 warnings (KG file untouched); `scripts/math/state.ts` confirms math.func 24/29 and
mathematics 361/908, 5 EB-certified domains, 0 orphan EB files, 0 duplicate EB files; `npx tsc
--noEmit` clean; targeted tests `mathPackageCorpus.test.ts` + `mathematicsAssetContract.test.ts`
479/479 passed. All 3 new entries' heading structure diffed clean against `math.alg.like-terms.md`
on the first pass (0 diffs each). Fresh `math.func` frontier computed (verified programmatically,
not assumed): 3 of the domain's final 5 concepts are already topologically ready —
`math.func.rational-root` (requires `polynomial-function` + `math.alg.polynomial-roots`, both
authored), `math.func.end-behavior` (requires `polynomial-function` only), and
`math.func.rational-function` (requires `math.alg.rational-expressions` + `polynomial-function`,
both authored) — leaving only `math.func.horizontal-asymptote` and
`math.func.vertical-asymptote` blocked, both solely on `rational-function`. One more bounded batch
of 3, followed by a small 2-concept wave, would reach math.func DOMAIN CERTIFICATION. No Physics,
Chemistry, English, Biology, Computer Science, KG, Blueprint, or runtime file was modified.

### Batch 34 — math.func: end behavior, rational functions, rational root theorem (2026-09-13)

Session started with a fast-forward reconciliation: `origin/main` had advanced 1 commit since this
program's last local commit (`154a2e7`, an unrelated MCQ non-committal-hedge-detector fix). Confirmed
via `git diff --stat` zero file overlap with any `educational-brain/`, `ROADMAP.md`, `COVERAGE.md`,
or `CLAUDE.md` file before fast-forwarding (`git merge --ff-only origin/main`, clean, no conflicts).

Re-computed the frontier fresh — the exact 3 candidates deferred from Batch 33 were confirmed
still ready: `math.func.end-behavior`, `math.func.rational-function`, `math.func.rational-root`.
This batch closes the ENTIRE frontier available at batch start (all 3 authored, none deferred).
All 3 Blueprint-grounded, reused by reference.

- **`math.func.end-behavior`** (proficient/analyze, requires `polynomial-function` only, no unlocks
  or cross-links listed in the KG) — the leading-term-dominance derivation ($f(x)/x^n\to a_n$),
  the four degree/sign patterns (even/odd × positive/negative leading coefficient), the
  end-behavior-versus-local-behavior discrimination this concept's own prerequisite
  `polynomial-function` had already flagged as a live caution, and the orientation-level
  rational-function extension via degree comparison. 3 misconceptions, birth types adopted
  directly from the Blueprint: MC-1 END-BEHAVIOR-FROM-ZERO (Type 1), MC-2
  ODD-DEGREE-SAME-ENDS (Type 1), MC-3 LEADING-COEFFICIENT-ONLY-POSITIVE (Type 5). Transfer probe
  (P76, independence mode) targets rational-function end behavior via degree comparison, deriving
  horizontal and oblique asymptotes — the direct forward bridge into `rational-function` itself.
- **`math.func.rational-function`** (proficient/understand, requires `math.alg.rational-expressions`
  + `polynomial-function`, no unlocks or cross-links listed in the KG) — domain exclusion as
  inherited directly from division-by-zero rather than a new special rule, the hole-versus-
  vertical-asymptote classification via checking for a cancelling numerator factor, and
  orientation-level end behavior via degree comparison, extending `end-behavior`'s own
  rational-function preview into core content. **This Blueprint was the SECOND in this entire
  campaign to lack an explicit birth-type column** (after `math.func.polynomial-function`) — all
  3 misconceptions were therefore independently classified: MC-1
  DOMAIN-RESTRICTION-ASSUMED-SPECIAL-RULE (Type 5, instruction-induced — the domain-restriction
  language is typically framed as a new topic-specific rule rather than tied back to the prior
  division-by-zero fact), MC-2 DENOMINATOR-ZERO-ASSUMED-TO-ALWAYS-BE-ASYMPTOTE (Type 2, perceptual
  intuition — a cancelling and a non-cancelling denominator zero look algebraically identical on
  the surface), MC-3 END-BEHAVIOR-ASSUMED-INDEPENDENT-OF-DEGREE (Type 1, overgeneralization from
  shared type-membership as "polynomial over polynomial" into a false claim of shared behavior).
  Stated explicitly and honestly in this entry's own Blueprint References and Curriculum Feedback
  sections as an independent classification, not Blueprint-adopted — flagged as a possible
  authoring-pass gap affecting a subset of Blueprints in this campaign.
- **`math.func.rational-root`** (proficient/analyze, requires `polynomial-function` +
  `math.alg.polynomial-roots`, no unlocks or cross-links listed in the KG) — the Rational Root
  Theorem as a FILTER not a finder (candidates require testing, never assumed as roots), the
  complete candidate-generation rule requiring BOTH the constant term's and the leading
  coefficient's factors, progressive degree reduction via confirmed roots, and the correct
  interpretation of an exhausted search ("no rational roots," never "no roots at all"). 3
  misconceptions, birth types adopted directly from the Blueprint: MC-1 ALL-CANDIDATES-ARE-ROOTS
  (Type 5), MC-2 RRT-FINDS-ALL-ROOTS (Type 1), MC-3 LEADING-COEFFICIENT-IGNORED (Type 5). Transfer
  probe (P76, independence mode) targets the depressed cubic, discriminant analysis, and the
  historical casus irreducibilis connecting RRT failure to trigonometric root expressions.

`math.func` **24/29 → 27/29** — only 2 concepts remain (`horizontal-asymptote`,
`vertical-asymptote`, both already confirmed topologically ready, both gated solely on the
now-authored `rational-function`) before the domain reaches DOMAIN CERTIFICATION, the sixth after
math.found/math.geom/math.arith/math.nt/math.alg. `math.disc`/`math.graph` unchanged this batch
(20/32 parked, 13/16 parked). Mathematics **361/908 → 364/908**, 771 remaining. No genuine
content-overlap found; the recurring missing-birth-type-column finding continues, now affecting 2
of the campaign's Blueprints (`polynomial-function`, `rational-function`). Full per-concept detail
above. All tracking files updated in the same commit: `ROADMAP.md` Section 1/2 totals and the
`math.func` domain row, `COVERAGE.md`'s mathematics summary row and this Delivery history entry,
`CLAUDE.md`'s campaign section. `EDUCATIONAL_BRAIN_INDEX.md` and `QUALITY.md` again deferred (same
generated-artifact rationale as prior batches). Validated: `npx tsx
scripts/validate-knowledge-graph.ts docs/mathematics/kg/graph.json` PASS, 908/908 reachable, 0
failures, 0 warnings (KG file untouched); `scripts/math/state.ts` confirms math.func 27/29 and
mathematics 364/908, 5 EB-certified domains; `npx tsc --noEmit` clean; targeted tests
`mathPackageCorpus.test.ts` + `mathematicsAssetContract.test.ts` 479/479 passed. All 3 new
entries' heading structure diffed clean against `math.alg.like-terms.md` on the first pass (0
diffs each). Fresh `math.func` frontier computed (verified programmatically, not assumed): the
final 2 concepts, `math.func.horizontal-asymptote` and `math.func.vertical-asymptote`, are both
already ready, each requiring only `rational-function` — one small final wave reaches DOMAIN
CERTIFICATION. No Physics, Chemistry, English, Biology, Computer Science, KG, Blueprint, or
runtime file was modified.

### Batch 35 — math.func FINAL wave (DOMAIN CERTIFIED) + opening math.calc (2026-09-13)

Re-computed the frontier fresh — the exact 2 concepts deferred from Batch 34 were confirmed
still ready: `math.func.horizontal-asymptote`, `math.func.vertical-asymptote`. Both authored,
both Blueprint-grounded, reused by reference, both with explicit birth-type classifications
adopted directly.

- **`math.func.horizontal-asymptote`** (proficient/analyze, requires `rational-function`, no
  unlocks or cross-links listed in the KG) — the three-case degree-comparison rule derived from
  dividing by the highest power, the crucial "a horizontal asymptote is a limit statement, not a
  hard boundary" distinction (directly contrasting the vertical-asymptote "never crossed" rule),
  the oblique-asymptote fourth case via polynomial long division, and the exact-versus-
  approximate distinction between algebraic derivation and large-$x$ numerical evaluation. 3
  misconceptions, birth types adopted directly from the Blueprint: MC-1
  HORIZONTAL-NEVER-CROSSED (Type 1), MC-2 PLUG-IN-LARGE-NUMBER (Type 5), MC-3
  OBLIQUE-IS-HORIZONTAL (Type 5). Transfer probe (P76, independence mode) targets full oblique-
  asymptote verification and interior-crossing analysis.
- **`math.func.vertical-asymptote`** (proficient/analyze, requires `rational-function`, no
  unlocks or cross-links listed in the KG) — the factor-cancel-classify identification
  procedure, the structurally opposite roles of numerator zeros (function zeros) versus
  denominator zeros (asymptotes), one-sided sign analysis with the odd/even-multiplicity
  contrast, and the "never crossed, because undefined there" hard structural fact directly
  distinguishing this concept from its sibling `horizontal-asymptote`. 3 misconceptions, birth
  types adopted directly from the Blueprint: MC-1 NUMERATOR-ZERO-IS-ASYMPTOTE (Type 3), MC-2
  GRAPH-CROSSES-ASYMPTOTE (Type 5), MC-3 HOLE-IS-AN-ASYMPTOTE (Type 5). Transfer probe (P76,
  independence mode) targets reconstructing a rational function from a full description of its
  asymptotes, hole, and intercepts.

**`math.func` reaches 29/29 — DOMAIN CERTIFIED**, the sixth mathematics domain after
math.found/math.geom/math.arith/math.nt/math.alg.

With math.func certified and math.disc/math.graph both still parked (0 ready candidates each),
computed the topologically-ready frontier fresh across ALL mathematics domains: 14 candidates
spread across 11 different entirely-unstarted domains (math.calc 2, math.abst 2, math.real 2,
math.trig 1, math.seq 1, math.linalg 1, math.prob 1, math.stats 1, math.top 1, math.meas 1,
math.num 1), with no domain clustering strongly. `math.calc` — 76 concepts, the single largest
unstarted mathematics domain — was selected: verified programmatically that authoring its sole
immediately-ready candidate, `math.calc.limits` (the domain's entry node), unblocks **7 further
`math.calc` concepts at once** (`derivative-intro`, `limits-at-infinity`, `riemann-sums`,
`one-sided-limits`, `parametric-curves`, `continuity`, `limit-laws`) — the single
highest-leverage move available across the entire frontier.

- **`math.calc.limits`** (advanced/analyze, requires `math.func.real-valued-function` +
  `math.found.real-numbers`, unlocks `math.calc.continuity`/`math.calc.derivative-definition`
  per the Blueprint though not listed in the live KG's own `unlocks` field — a genuine
  Blueprint/KG discrepancy, recorded not fixed, KG followed) — the foundational "approach, not
  arrival" distinction between a limit and a function value, one-sided limits with the
  existence criterion (both sides must agree), indeterminate $0/0$ forms as a signal to
  cancel rather than a sign of failure, and the limit laws (sum/product/quotient/constant-
  multiple). This Blueprint uses an OLDER Curriculum Production Pipeline document format
  (Teaching Actions TA-A01/TA-B01, primitives P11/P49/P91) distinct from the newer
  "Component 0 — Concept Identity" table format used by most Blueprints in this campaign, and
  is the THIRD Blueprint in this entire campaign to lack an explicit birth-type column (after
  `polynomial-function`, `rational-function`) — its 3 misconceptions were therefore
  independently classified: MC-1 LIMIT-IS-THE-FUNCTION-VALUE (Type 1, overgeneralization from
  every prior example being continuous, where limit and value coincide), MC-2
  LIMIT-REQUIRES-f(a)-DEFINED (Type 1, the identical overgeneralization, the Blueprint's own
  text stating it shares "the same root" as MC-1), MC-3 ONE-SIDED-EQUALS-TWO-SIDED (Type 5,
  instruction-induced — checking the second side is an easily-skipped additional step after a
  correct one-sided computation). Stated explicitly and honestly in this entry's own Blueprint
  References section as an independent classification, not Blueprint-adopted.

`math.calc` **0/76 → 1/76** — the domain's entry node is authored, opening a new standalone
campaign. `math.disc`/`math.graph` unchanged this batch (20/32 parked, 13/16 parked).
Mathematics **364/908 → 367/908**, 768 remaining. No genuine content-overlap found beyond the
Blueprint/KG `unlocks` discrepancy noted above. Full per-concept detail above. All tracking
files updated in the same commit: `ROADMAP.md` Section 1/2 totals, the `math.func` domain row
(now CERTIFIED) and the new `math.calc` domain row, `COVERAGE.md`'s mathematics summary row and
this Delivery history entry, `CLAUDE.md`'s campaign section. `EDUCATIONAL_BRAIN_INDEX.md` and
`QUALITY.md` again deferred (same generated-artifact rationale as prior batches). Validated:
`npx tsx scripts/validate-knowledge-graph.ts docs/mathematics/kg/graph.json` PASS, 908/908
reachable, 0 failures, 0 warnings (KG file untouched); `scripts/math/state.ts` confirms
math.func 29/29 (`ebComplete: true`), math.calc 1/76, mathematics 367/908, **6 EB-certified
domains**; `npx tsc --noEmit` clean; targeted tests `mathPackageCorpus.test.ts` +
`mathematicsAssetContract.test.ts` 479/479 passed. All 3 new entries' heading structure diffed
clean against `math.alg.like-terms.md` on the first pass (0 diffs each). Fresh frontier
computed across all mathematics domains after this batch: math.calc now has multiple newly-
ready candidates (`derivative-intro`, `limits-at-infinity`, `riemann-sums`, `one-sided-limits`,
`parametric-curves`, `continuity`, `limit-laws`), a rich frontier for the next batch to select
from. No Physics, Chemistry, English, Biology, Computer Science, KG, Blueprint, or runtime file
was modified.

### Batch 36 — math.calc: one-sided limits, limit laws, limits at infinity, continuity (2026-09-13)

Re-computed the frontier fresh — the exact 7 candidates unblocked by Batch 35's `limits` were
confirmed still ready. Selected a coherent subset of 4 sharing the tightest coupling to
`limits` itself (`one-sided-limits`, `limit-laws`, `limits-at-infinity`, `continuity`),
deferring `derivative-intro`, `riemann-sums`, and `parametric-curves` (each pulling in an
additional prerequisite outside the immediate limits family — `math.geom.slope`,
`math.func.function-concept`/`math.geom.coordinate-plane` respectively) to a future batch. All
4 Blueprint-grounded, reused by reference.

- **`math.calc.one-sided-limits`** (advanced/apply, requires `limits`, unlocks `continuity`,
  no cross-links) — right/left-hand limits restricted by approach direction, the equivalence
  theorem (two-sided limit exists iff both one-sided limits exist AND agree), and jump
  discontinuity as the precise "both exist, disagree" failure mode. This Blueprint's
  Misconception Registry lacked an explicit birth-type column (the FOURTH such gap this
  campaign) — its 3 misconceptions independently classified: MC-1 WRONG-PIECE-SELECTED (Type
  4, notation-induced — the direction superscript is easy to overlook against the more familiar
  piece-containment habit), MC-2 ONE-SIDED-EXISTENCE-IMPLIES-TWO-SIDED (Type 1,
  overgeneralization — both existing feels complete without checking agreement), MC-3
  FUNCTION-VALUE-CONFUSED-WITH-LIMIT (Type 1, directly cross-referenced to `math.calc.limits`'s
  own MC-1/MC-2, the identical confusion recurring on a fresh surface).
- **`math.calc.limit-laws`** (advanced/apply, requires `limits`, no unlocks/cross-links) — the
  sum/product/power/quotient laws, with the quotient law's $\lim g\neq0$ precondition as the
  central difficulty (a failed precondition means "wrong tool," never an automatic symbolic
  conclusion), and sequential law combination requiring each individual piece verified first.
  FIFTH Blueprint this campaign lacking a birth-type column — 2 misconceptions independently
  classified: MC-1 QUOTIENT-LAW-APPLIED-DESPITE-ZERO-DENOMINATOR-LIMIT (Type 1), MC-2
  LIMIT-LAWS-COMBINED-WITHOUT-VERIFYING-EACH-PIECE-EXISTS-FIRST (Type 5).
- **`math.calc.limits-at-infinity`** (advanced/apply, requires `limits`, unlocks
  `math.func.horizontal-asymptote` — **already authored, Batch 35** — no cross-links) — the
  "approach" idea extended to unbounded growth, the divide-by-highest-power technique (never
  substituting infinity as a number), and limits at infinity versus infinite limits as
  structurally opposite phenomena sharing one symbol. SIXTH Blueprint lacking a birth-type
  column — 3 misconceptions independently classified: MC-1
  INFINITY-SUBSTITUTED-AS-A-NUMBER (Type 4), MC-2
  LIMITS-AT-INFINITY-CONFLATED-WITH-INFINITE-LIMITS (Type 3, the Blueprint's own text
  attributing the confusion directly to the shared $\infty$ symbol), MC-3
  HIGHEST-POWER-DIVISION-APPLIED-TO-WRONG-TERM-COUNT (Type 1). This entry SUBSTANTIVELY
  INCORPORATES the already-authored `math.func.horizontal-asymptote`, directly closing the
  orientation-level preview that entry (and `math.func.end-behavior`) left open — the first
  genuine cross-domain forward-reference-closure in the math.calc campaign.
- **`math.calc.continuity`** (advanced/analyze, requires `limits`, cross-links
  `math.real.continuity-rigorous`/`math.top.continuity-top`, both confirmed genuinely
  unauthored — independence mode — no unlocks listed in the KG though the Blueprint names
  `math.calc.differentiation`/`math.calc.intermediate-value-theorem`, a genuine Blueprint/KG
  discrepancy recorded not fixed) — the three-condition definition (defined, limit exists,
  limit equals value), the removable/jump/infinite classification each tied to precisely which
  condition fails, and the systematic piecewise boundary-point procedure. An older document
  format matching `math.calc.limits`' own, lacking a birth-type column (SEVENTH such gap) — 3
  misconceptions independently classified: MC-1 CONTINUOUS-MEANS-NO-GAPS (Type 6, analogy
  overextension — the "no pencil lift" intuition treated as the actual test rather than an
  introductory device), MC-2 LIMIT-EXISTS-MEANS-CONTINUOUS (Type 1), MC-3
  PIECEWISE-ALWAYS-DISCONTINUOUS (Type 1, the Blueprint's own text attributing this directly to
  biased textbook examples).

`math.calc` **1/76 → 5/76**. `math.disc`/`math.graph` unchanged this batch (20/32 parked, 13/16
parked). Mathematics **367/908 → 371/908**, 764 remaining. No genuine content-overlap found
beyond the Blueprint/KG `unlocks` discrepancy noted for `continuity`. Full per-concept detail
above. All tracking files updated in the same commit: `ROADMAP.md` Section 1/2 totals and the
`math.calc` domain row, `COVERAGE.md`'s mathematics summary row and this Delivery history
entry, `CLAUDE.md`'s campaign section. `EDUCATIONAL_BRAIN_INDEX.md` and `QUALITY.md` again
deferred (same generated-artifact rationale as prior batches). Validated: `npx tsx
scripts/validate-knowledge-graph.ts docs/mathematics/kg/graph.json` PASS, 908/908 reachable, 0
failures, 0 warnings (KG file untouched); `scripts/math/state.ts` confirms math.calc 5/76,
mathematics 371/908, 6 EB-certified domains (unchanged); `npx tsc --noEmit` clean; targeted
tests `mathPackageCorpus.test.ts` + `mathematicsAssetContract.test.ts` 479/479 passed. All 4
new entries' heading structure diffed clean against `math.alg.like-terms.md` on the first pass
(0 diffs each). Fresh `math.calc` frontier computed (verified programmatically, not assumed):
6 candidates now ready — `continuity-types` (requires `continuity` + `one-sided-limits`), `ivt`
(requires `continuity`), `derivative-intro` (requires `math.geom.slope` + `limits`),
`parametric-curves` (requires `function-concept` + `coordinate-plane`), `riemann-sums`
(requires `limits`), `squeeze-theorem` (requires `limit-laws`). No Physics, Chemistry, English,
Biology, Computer Science, KG, Blueprint, or runtime file was modified.

### Batch 37 — math.calc: discontinuity types, IVT, the derivative, squeeze theorem (2026-09-13)

Re-computed the frontier fresh — the exact 6 candidates unblocked by Batch 36 were confirmed
still ready. Selected 4 (`continuity-types`, `ivt`, `derivative-intro`, `squeeze-theorem`),
deferring `parametric-curves` and `riemann-sums` (each pulling in a prerequisite set less
tightly coupled to the limits/continuity chain this program has been building). All 4
Blueprint-grounded, reused by reference. **None of the 4 Blueprints this batch carried an
explicit birth-type column** (the eighth through eleventh such gaps this campaign) — every
misconception independently classified.

- **`math.calc.continuity-types`** (advanced/analyze, requires `continuity` + `one-sided-limits`,
  no unlocks/cross-links) — the three-way removable/jump/infinite classification, each tied to
  a precise diagnostic (does the two-sided limit exist and match? do both one-sided limits exist
  but disagree? is either side unbounded?), and the rule that a zero denominator alone never
  determines the type without a factor-and-cancel check. 2 misconceptions independently
  classified: MC-1 ZERO-DENOMINATOR-ASSUMED-TO-ALWAYS-MEAN-INFINITE-DISCONTINUITY (Type 1), MC-2
  REMOVABILITY-JUDGED-BY-WHETHER-F-OF-A-IS-DEFINED-RATHER-THAN-WHETHER-ONE-SIDED-LIMITS-AGREE
  (Type 1). Substantively cross-references the already-authored `math.func.vertical-asymptote`
  as the same infinite-discontinuity phenomenon viewed through a different lens.
- **`math.calc.ivt`** (advanced/apply, requires `continuity`, cross-link `math.num.root-finding`
  confirmed genuinely unauthored — independence mode) — continuity as the essential (never
  optional) hypothesis, a sign-change-plus-continuity check as a COMPLETE existence proof
  requiring no further computation, and IVT's purely existential character (proves a root
  exists, never locates it). 3 misconceptions independently classified: MC-1
  IVT-ASSUMED-TO-HOLD-WITHOUT-CONTINUITY (Type 1), MC-2
  ROOT-EXISTENCE-PROOF-ASSUMED-TO-NEED-LOCATION (Type 5), MC-3 IVT-ASSUMED-TO-LOCATE-THE-ROOT
  (Type 5, the mirror-image expectation of MC-2, from the same instructional history of prior
  root-finding techniques always delivering both existence and location together).
- **`math.calc.derivative-intro`** (understand/advanced, requires `math.geom.slope` + `limits`,
  no unlocks/cross-links listed in the KG though the Blueprint names
  `math.calc.derivative-definition`, a genuine Blueprint/KG discrepancy recorded not fixed) —
  **the domain's central payoff concept**, everything since `limits` has been building toward:
  the derivative as the limit of the difference quotient, the constructed-second-point
  resolution to "a tangent needs two points," and the exact-versus-approximate distinction
  between the limit and any finite-$h$ evaluation. An older document format (matching `limits`'
  and `continuity`'s own) lacking a birth-type column (TENTH such gap) — 3 misconceptions
  independently classified: MC-1 TANGENT-IS-JUST-ONE-POINT (Type 2, perceptual intuition — the
  naive geometric picture of a single point of tangency), MC-2 INSTANTANEOUS-IS-UNDEFINED (Type
  2, the pre-limit intuition that change requires two distinct states), MC-3
  DIFFERENCE-QUOTIENT-IS-THE-DERIVATIVE (Type 1).
- **`math.calc.squeeze-theorem`** (advanced/apply, requires `limit-laws`, no unlocks/cross-links)
  — trapping a difficult function between two converging bounds, the requirement for BOTH
  inequalities (never one alone), and recognizing when ordinary limit laws genuinely fail
  (an oscillating piece with no limit) as the signal this theorem is needed. 2 misconceptions
  independently classified: MC-1 ONLY-ONE-SIDE-OF-THE-SANDWICH-INEQUALITY-ESTABLISHED (Type 1),
  MC-2 ORDINARY-LIMIT-LAWS-ATTEMPTED-WHEN-A-PIECES-LIMIT-DOES-NOT-EXIST (Type 1, the same
  precondition-ignored pattern already classified this way in `math.calc.limit-laws`' own MC-1).

`math.calc` **5/76 → 9/76**. `math.disc`/`math.graph` unchanged this batch (20/32 parked, 13/16
parked). Mathematics **371/908 → 375/908**, 760 remaining. No genuine content-overlap found
beyond the two Blueprint/KG `unlocks` discrepancies noted (`ivt`'s Blueprint correctly declares
no unlocks; `derivative-intro`'s Blueprint names `derivative-definition`, absent from the KG's
own field). Full per-concept detail above. All tracking files updated in the same commit:
`ROADMAP.md` Section 1/2 totals and the `math.calc` domain row, `COVERAGE.md`'s mathematics
summary row and this Delivery history entry, `CLAUDE.md`'s campaign section.
`EDUCATIONAL_BRAIN_INDEX.md` and `QUALITY.md` again deferred (same generated-artifact rationale
as prior batches). Validated: `npx tsx scripts/validate-knowledge-graph.ts
docs/mathematics/kg/graph.json` PASS, 908/908 reachable, 0 failures, 0 warnings (KG file
untouched); `scripts/math/state.ts` confirms math.calc 9/76, mathematics 375/908, 6
EB-certified domains (unchanged); `npx tsc --noEmit` clean; targeted tests
`mathPackageCorpus.test.ts` + `mathematicsAssetContract.test.ts` 479/479 passed. All 4 new
entries' heading structure diffed clean against `math.alg.like-terms.md` on the first pass (0
diffs each). Fresh `math.calc` frontier computed (verified programmatically, not assumed): 3
candidates ready — `derivative-definition` (requires `continuity` + `derivative-intro`),
`parametric-curves` (requires `function-concept` + `coordinate-plane`), `riemann-sums`
(requires `limits`). No Physics, Chemistry, English, Biology, Computer Science, KG, Blueprint,
or runtime file was modified.

### Batch 38 — math.calc: the derivative's formal definition, parametric curves, Riemann sums (2026-09-12)

Re-computed the frontier fresh — the exact 3 candidates left ready after Batch 37 were
confirmed still ready, and this closed the ENTIRE frontier available at batch start with none
deferred. All 3 Blueprint-grounded, reused by reference.

- **`math.calc.derivative-definition`** (advanced/understand, requires `continuity` +
  `derivative-intro`, unlocks `derivative-rules`/`mean-value-theorem`, cross-link
  `math.real.differentiability-rigorous` confirmed genuinely unauthored — independence mode) —
  formalizes `derivative-intro`'s informal secant-to-tangent picture into the computable limit
  $f'(x)=\lim_{h\to0}[f(x+h)-f(x)]/h$; the algebraic cancel-then-limit computation as the core
  skill; differentiable $\Rightarrow$ continuous (proved) but not the converse ($|x|$ at $x=0$
  as the standing counterexample). An older document format (matching `limits`'/`continuity`'s/
  `derivative-intro`'s own) lacking a birth-type column — the TWELFTH such gap this campaign —
  3 misconceptions independently classified: MC-1 DIFFERENCE-QUOTIENT-IS-DERIVATIVE (Type 1,
  the identical pre-limit-expression-is-the-answer mechanism already documented for
  `math.calc.limits`' own MC-1 and `math.calc.riemann-sums`' own MC-3, this batch), MC-2
  CONTINUITY-IMPLIES-DIFFERENTIABILITY (Type 1, a true-implication-reversed-into-its-false-
  converse error, the same shape already classified this way for `continuity-types`' own MC-2),
  MC-3 DIRECT-SUBSTITUTION-INTO-QUOTIENT (Type 1, the same substitution-into-$0/0$ pattern
  already classified this way for `limit-laws`' MC-1 and `squeeze-theorem`'s MC-2). **A first
  for this domain's batches: no Blueprint/KG metadata discrepancy found** — the Blueprint's
  stated unlocks (`derivative-rules`, `mean-value-theorem`) and cross_links
  (`differentiability-rigorous`) matched the live KG's own fields exactly, confirmed by direct
  query.
- **`math.calc.parametric-curves`** (advanced/apply, requires `function-concept` +
  `coordinate-plane`, unlocks `parametric-calculus`, no cross-links) — a parametric curve as a
  PATH with a direction of travel, not merely a shape; the standing proof that parametric
  curves genuinely generalize function graphs (a circle fails the vertical line test yet is
  perfectly well-defined parametrically); eliminating the parameter as an operation that always
  risks losing direction and any $t$-range restriction. Blueprint lacks a birth-type column; 3
  misconceptions independently classified: MC-1 DIRECTION-OF-TRACING-IGNORED (Type 2,
  perceptual intuition — a finished plot presents only a static shape, with no perceptual cue
  that order was ever part of the information), MC-2 EVERY-PARAMETRIC-CURVE-IS-A-FUNCTION
  (Type 1, overgeneralization of the function concept — the Blueprint's own "Foundational
  Misconception"), MC-3 ELIMINATING-PARAMETER-LOSES-NOTHING (Type 5, instruction-induced — the
  elimination procedure is drilled as a mechanically complete task with nothing flagging what
  it silently discards). No Blueprint/KG discrepancy found — unlocks and cross_links matched
  the KG exactly.
- **`math.calc.riemann-sums`** (advanced/understand, requires `limits`, unlocks
  `definite-integral`, no cross-links) — the area-under-a-curve approximation by summing
  rectangle areas; the rectangle's height determined entirely by the CHOSEN sample point, never
  by visual fit to the curve; the exact area as a FIXED quantity that a converging sequence of
  Riemann sums merely measures with improving accuracy; the definite integral defined AS the
  limit, never equal to any finite sum. Blueprint lacks a birth-type column; 3 misconceptions
  independently classified: MC-1 RECTANGLES-TOUCH-CURVE-AT-TOP (Type 2, perceptual intuition —
  the Blueprint's own root-cause note names this directly, "a correct rectangle should fit
  perfectly under the curve"), MC-2 MORE-RECTANGLES-CHANGES-EXACT-AREA (Type 1, conflating a
  converging estimate with the fixed quantity it converges to), MC-3
  RIEMANN-SUM-IS-THE-INTEGRAL (Type 1, the identical pre-limit-expression-is-the-answer
  mechanism as `math.calc.limits`' own MC-1 and this batch's own `derivative-definition` MC-1 —
  the Blueprint's own root-cause text explicitly names this cross-reference, "imports the
  AROC→IROC confusion... into the area context"). No Blueprint/KG discrepancy found.

`math.calc` **9/76 → 12/76**. `math.disc`/`math.graph` unchanged this batch (20/32 parked,
13/16 parked). Mathematics **375/908 → 378/908**, 757 remaining. Notably, for the first time
in this domain's batches, none of the 3 concepts carried a Blueprint/KG metadata discrepancy —
every stated unlocks/cross_links field matched the live KG exactly, confirmed by direct query
against `docs/mathematics/kg/graph.json` rather than assumed. Full per-concept detail above.
All tracking files updated in the same commit: `ROADMAP.md` Section 1/2 totals and the
`math.calc` domain row, `COVERAGE.md`'s mathematics summary row and this Delivery history
entry, `CLAUDE.md`'s campaign section. `EDUCATIONAL_BRAIN_INDEX.md` and `QUALITY.md` again
deferred (same generated-artifact rationale as prior batches). Validated: `npx tsx
scripts/validate-knowledge-graph.ts docs/mathematics/kg/graph.json` PASS, 908/908 reachable, 0
failures, 0 warnings (KG file untouched); `scripts/math/state.ts` confirms math.calc 12/76,
mathematics 378/908, 6 EB-certified domains (unchanged); `npx tsc --noEmit` clean; targeted
tests `mathPackageCorpus.test.ts` + `mathematicsAssetContract.test.ts` 479/479 passed. All 3
new entries' heading structure diffed clean against `math.alg.like-terms.md` on the first pass
(0 diffs each). A fresh `math.calc` frontier check is deferred to the next batch. No Physics,
Chemistry, English, Biology, Computer Science, KG, Blueprint, or runtime file was modified.

### Batch 39 — math.calc: the definite integral, differentiation rules, differentiability, linearization (2026-09-12)

Re-computed the frontier fresh — 8 candidates confirmed ready
(`definite-integral`, `derivative-rules`, `differentiability`, `lhopitals-rule`,
`line-integrals`, `linearization`, `mean-value-theorem`, `multivariable-intro`).
Selected the 4 sharing the tightest single-prerequisite coupling to
`derivative-definition` (or, for `definite-integral`, to `riemann-sums`), deferring
the 4 remaining candidates (each needing a second prerequisite — `continuity`,
`limits`, or `math.geom.vectors-3d` — or a two-way convergence). All 4
Blueprint-grounded, reused by reference.

- **`math.calc.definite-integral`** (advanced/understand, requires `riemann-sums`,
  unlocks `ftc-part1`/`ftc-part2`, cross-link `math.real.riemann-integral` confirmed
  genuinely unauthored — independence mode) — the named limit of Riemann sums as
  SIGNED area, with reversal/additivity/linearity all derivable from the sum's own
  structure ($\Delta x$'s sign, the sum splitting/distributing) rather than
  memorized as separate rules. Older document format (matching `limits`/
  `continuity`/`derivative-intro`/`derivative-definition`), no birth-type column —
  3 misconceptions independently classified: MC-1 INTEGRAL-IS-ALWAYS-POSITIVE-AREA
  (Type 3, language contamination — the Blueprint's own root-cause note names the
  everyday word "area" directly), MC-2 DEFINITE-INTEGRAL-NEEDS-ANTIDERIVATIVE
  (Type 5, instruction-induced — FTC-first teaching conflates definition with
  computation method), MC-3 INTEGRAL-ORDER-DOESNT-MATTER (Type 1, overgeneralized
  commutativity of ordinary sums).
- **`math.calc.derivative-rules`** (advanced/apply, requires `derivative-definition`,
  unlocks `product-rule`/`quotient-rule`/`chain-rule`, no cross-links) — the power/
  constant-multiple/sum rules derived directly from the limit definition (not
  stated as arbitrary formulas), with the base/exponent scope condition
  (power functions vs. exponential functions) as the concept's single most
  important boundary. Blueprint lacks a birth-type column — 3 misconceptions
  independently classified, all Type 1 overgeneralization: MC-1
  POWER-RULE-FOR-EXPONENTIAL (the power-rule pattern extended past its
  base/exponent precondition), MC-2 COEFFICIENT-MULTIPLICATION-OMITTED
  (over-applying "constants vanish" to a coefficient that multiplies rather than
  stands alone), MC-3 DISTRIBUTING-DERIVATIVE-OVER-PRODUCTS (the sum rule's
  genuine distributivity wrongly extended to products).
- **`math.calc.differentiability`** (advanced/analyze, requires
  `derivative-definition`, no unlocks/cross-links) — the corner/cusp/vertical-
  tangent taxonomy for where $f'(a)$ fails to exist, and the one-directional
  implication (differentiable $\Rightarrow$ continuous, never the reverse) with
  $|x|$ at $0$ as the standing counterexample. Blueprint carries a Severity
  column (both MCs "Foundational") but no birth-type column — MC-1
  DIFFERENTIABILITY-ASSUMED-FROM-SMOOTH-APPEARANCE-WITHOUT-CHECKING-ONE-SIDED-
  DERIVATIVES (Type 2, perceptual intuition), MC-2
  CONTINUITY-ASSUMED-TO-IMPLY-DIFFERENTIABILITY (Type 1, the identical
  implication-reversal mechanism already documented for `continuity-types`'
  own MC-2 and `derivative-definition`'s own MC-2, now a third recurrence).
- **`math.calc.linearization`** (advanced/apply, requires `derivative-definition`,
  no unlocks/cross-links) — $L(x)=f(a)+f'(a)(x-a)$ reusing the derivative's own
  slope value in the ordinary point-slope formula, with the approximation's
  accuracy genuinely degrading with distance from $a$, and the differential
  $dy=f'(x)\,dx$ as the identical idea reframed as an increment. Blueprint carries
  a Severity column but no birth-type column — MC-1
  LINEARIZATION-ASSUMED-NEW-PROCEDURE (Type 5, instruction-induced — new
  vocabulary/notation presented without an explicit link back to the
  already-known derivative computation), MC-2
  LINEARIZATION-ACCURACY-ASSUMED-UNIFORM (Type 1, overgeneralizing "the tangent
  line approximates the curve" past its local scope), MC-3
  DIFFERENTIAL-ASSUMED-SEPARATE-CONCEPT (Type 4, notation-induced — $L(x)$'s and
  $dy$'s visibly different notation obscures their identical underlying
  arithmetic).

`math.calc` **12/76 → 16/76**. `math.disc`/`math.graph` unchanged this batch (20/32
parked, 13/16 parked). Mathematics **378/908 → 382/908**, 753 remaining. **This batch
continues the zero-Blueprint/KG-discrepancy pattern begun in Batch 38** — all 4
concepts' stated unlocks/cross_links matched the live KG's own fields exactly,
confirmed by direct query, for the second consecutive batch. Full per-concept detail
above. All tracking files updated in the same commit: `ROADMAP.md` Section 1/2 totals
and the `math.calc` domain row, `COVERAGE.md`'s mathematics summary row and this
Delivery history entry, `CLAUDE.md`'s campaign section. `EDUCATIONAL_BRAIN_INDEX.md`
and `QUALITY.md` again deferred (same generated-artifact rationale as prior batches).
Validated: `npx tsx scripts/validate-knowledge-graph.ts docs/mathematics/kg/graph.json`
PASS, 908/908 reachable, 0 failures, 0 warnings (KG file untouched); `scripts/math/
state.ts` confirms math.calc 16/76, mathematics 382/908, 6 EB-certified domains
(unchanged); `npx tsc --noEmit` clean; targeted tests `mathPackageCorpus.test.ts` +
`mathematicsAssetContract.test.ts` 479/479 passed. All 4 new entries' heading
structure diffed clean against `math.alg.like-terms.md` on the first pass (0 diffs
each). Fresh `math.calc` frontier computed: 13 candidates ready (`antiderivatives`,
`arc-length`, `chain-rule`, `critical-points`, `ftc-part1`, `higher-order-derivatives`,
`improper-integrals`, `integral-area`, `lhopitals-rule`, `line-integrals`,
`mean-value-theorem`, `multivariable-intro`, `product-rule`). No Physics, Chemistry,
English, Biology, Computer Science, KG, Blueprint, or runtime file was modified.

### Batch 40 — math.calc: antiderivatives, critical points, higher-order derivatives, the product rule (2026-09-12)

Re-computed the frontier fresh — 13 candidates confirmed ready. Selected the 4
sharing the tightest single-prerequisite coupling to `derivative-rules`
(`antiderivatives`, `critical-points`, `higher-order-derivatives`,
`product-rule`), deferring the 9 remaining candidates (each needing a second
prerequisite — `continuity`, `limits-at-infinity`, `math.func.composition`, or
`math.geom.vectors-3d` — or built on `definite-integral` instead). All 4
Blueprint-grounded, reused by reference.

- **`math.calc.antiderivatives`** (advanced/apply, requires `derivative-rules`,
  unlocks `definite-integral`, no cross-links) — the reverse power rule as the
  exact algebraic inverse of the power rule; the antiderivative FAMILY
  $F(x)+C$, never a single function; resolving $C$ from an initial condition.
  Older document format, no birth-type column — 3 misconceptions independently
  classified, all Type 1 overgeneralization: MC-1 CONSTANT-OMISSION
  (differentiation's one-to-one habit carried into a genuinely one-to-many
  operation), MC-2 REVERSE-POWER-RULE-WRONG (the power rule's own shape
  reversed in the wrong direction), MC-3 ANTIDERIVATIVE-IS-UNIQUE (MC-1's
  conceptual twin, surfacing in language).
- **`math.calc.critical-points`** (advanced/apply, requires `derivative-rules`,
  unlocks `local-extrema`/`optimization`, no cross-links) — $f'(c)=0$ OR
  undefined, both gated on domain membership; critical points as candidates,
  never guarantees, with $x^3$ at $0$ as the standing flat-but-not-extremum
  counterexample. Blueprint carries a Severity column but no birth-type
  column — MC-1 CRITICAL-POINT-ASSUMED-EXTREMUM (Type 1 — a FOURTH recurrence
  of the implication-reversal mechanism already documented for
  `continuity-types`/`derivative-definition`/`differentiability`), MC-2
  UNDEFINED-DERIVATIVE-CATEGORY-MISSED (Type 5, instruction-induced — nearly
  all practice drills only the $f'(x)=0$ search), MC-3
  OUTSIDE-DOMAIN-POINT-TREATED-AS-CRITICAL (Type 1, overextending the
  undefined-derivative rule past its own domain-membership precondition).
- **`math.calc.higher-order-derivatives`** (advanced/apply, requires
  `derivative-rules`, unlocks `concavity`/`math.de.second-order-ode`,
  cross-link `math.de.second-order-ode` Tier 1, confirmed genuinely
  unauthored — cross-link-probe mode used directly despite the target domain
  being entirely unstarted) — iterate the derivative operator, never square
  it; $d^2y/dx^2$ vs. $(dy/dx)^2$ as genuinely different objects; coefficient
  accumulation as a product across repeated power-rule applications. Blueprint
  carries no birth-type column, though its own Teaching Notes explicitly link
  MC-1/MC-2 as the same mechanism at two levels — MC-1
  SECOND-DERIVATIVE-IS-FIRST-SQUARED (Type 3, language contamination from
  "second"/squaring), MC-2 NOTATION-D2Y-DX2-READ-AS-SQUARED-DERIVATIVE (Type
  4, notation-induced), MC-3 EXPONENT-SUBTRACTED-COEFFICIENT-IGNORED (Type 1).
- **`math.calc.product-rule`** (advanced/apply, requires `derivative-rules`,
  no unlocks/cross-links) — $(fg)'=f'g+fg'$, directly resolving
  `derivative-rules`'s own deferred MC-3; simplify-first judgment; grouping
  extends the rule to 3+ factors. Blueprint carries a Severity column but no
  birth-type column — MC-1 DERIVATIVE-DISTRIBUTED-OVER-PRODUCT (Type 1, the
  IDENTICAL misconception already documented as `derivative-rules`' own MC-3,
  now recurring as this concept's primary target), MC-2
  PRODUCT-RULE-RESTRICTED-TO-EXACTLY-TWO-NAMED-FACTORS (Type 5,
  instruction-induced — the textbook two-named-function template), MC-3
  PRODUCT-RULE-APPLIED-WHERE-SIMPLIFICATION-IS-SIMPLER (Type 5,
  instruction-induced recency/salience over-application).

`math.calc` **16/76 → 20/76**. `math.disc`/`math.graph` unchanged this batch
(20/32 parked, 13/16 parked). Mathematics **382/908 → 386/908**, 749
remaining. **Fourth consecutive batch with zero Blueprint/KG metadata
discrepancies** — all 4 concepts' stated unlocks/cross_links matched the live
KG's own fields exactly, confirmed by direct query. One standing forward note
recorded (not fixed): `higher-order-derivatives`' genuine Tier-1 cross-link
`math.de.second-order-ode` remains unauthored (the entire `math.de` domain is
unstarted); once authored, that future entry should reference this concept's
own P76 transfer probe (the $y''+y=0$ ODE verification) by name rather than
re-deriving the acceleration-vs-squared-velocity argument independently. Full
per-concept detail above. All tracking files updated in the same commit:
`ROADMAP.md` Section 1/2 totals and the `math.calc` domain row, `COVERAGE.md`'s
mathematics summary row and this Delivery history entry, `CLAUDE.md`'s
campaign section. `EDUCATIONAL_BRAIN_INDEX.md` and `QUALITY.md` again deferred
(same generated-artifact rationale as prior batches). Validated: `npx tsx
scripts/validate-knowledge-graph.ts docs/mathematics/kg/graph.json` PASS,
908/908 reachable, 0 failures, 0 warnings (KG file untouched); `scripts/math/
state.ts` confirms math.calc 20/76, mathematics 386/908, 6 EB-certified
domains (unchanged); `npx tsc --noEmit` clean; targeted tests
`mathPackageCorpus.test.ts` + `mathematicsAssetContract.test.ts` 479/479
passed. All 4 new entries' heading structure diffed clean against
`math.alg.like-terms.md` on the first pass (0 diffs each). Fresh `math.calc`
frontier computed: 11 candidates ready (`arc-length`, `chain-rule`,
`concavity`, `ftc-part1`, `improper-integrals`, `integral-area`,
`lhopitals-rule`, `line-integrals`, `mean-value-theorem`,
`multivariable-intro`, `quotient-rule`). No Physics, Chemistry, English,
Biology, Computer Science, KG, Blueprint, or runtime file was modified.

### Batch 41 — math.calc: concavity, the quotient rule, area by integration, FTC Part 1 (2026-09-12)

Re-computed the frontier fresh — 11 candidates confirmed ready. Selected 4:
`concavity` and `quotient-rule` (each single-prerequisite, on
`higher-order-derivatives` and `product-rule` respectively), plus
`integral-area` and `ftc-part1` (built on `definite-integral`, with
`ftc-part1`'s second prerequisite `continuity` already long-authored).
Deferred `arc-length`/`chain-rule`/`improper-integrals`/`lhopitals-rule`/
`line-integrals`/`mean-value-theorem`/`multivariable-intro`. All 4
Blueprint-grounded, reused by reference.

- **`math.calc.concavity`** (advanced/apply, requires
  `higher-order-derivatives`, unlocks `curve-sketching`, no cross-links) —
  the sign of $f''$ as cup/cap curvature; inflection points as candidates
  from $f''=0$ OR undefined, confirmed only by a genuine sign change;
  concavity independent of monotonicity. Blueprint carries a Severity column
  but no birth-type column — MC-1 SECOND-DERIVATIVE-ZERO-ASSUMED-INFLECTION
  (Type 1 — the Blueprint's own Teaching Notes explicitly name this as the
  same structural echo as `critical-points`' own "candidate, not guarantee"
  logic, the fifth recurrence of this necessary-vs-sufficient pattern this
  campaign has documented), MC-2 CONCAVITY-CONFLATED-WITH-MONOTONICITY (Type
  2, perceptual — a cup visually resembles "rising"), MC-3
  INFLECTION-POINT-SEARCH-IGNORES-UNDEFINED-F-DOUBLE-PRIME (Type 5, the
  identical mechanism already documented as `critical-points`' own MC-2).
- **`math.calc.quotient-rule`** (advanced/apply, requires `product-rule`, no
  unlocks/cross-links) — $(f/g)'=(f'g-fg')/g^2$, order-sensitive subtraction
  (unlike the Product Rule's order-free addition). Blueprint carries a
  Severity column (both "Foundational") but no birth-type column — MC-1
  NUMERATOR-AND-DENOMINATOR-SWAPPED-AS-F-AND-G (Type 4, notation-induced —
  the abstract $f$/$g$ letters carry no visual top/bottom anchor), MC-2
  QUOTIENT-RULE-SUBTRACTION-ORDER-REVERSED (Type 1, overgeneralizing the
  Product Rule's own genuine order-independence into subtraction, where it
  does not hold).
- **`math.calc.integral-area`** (advanced/apply, requires
  `definite-integral`, unlocks `volume-revolution`, no cross-links) — area
  under a curve IS the definite integral's value ($f\ge0$); area between
  curves as top-minus-bottom vertical strips; signed vs. unsigned area at
  orientation level. Blueprint carries a Severity column but no birth-type
  column — MC-1 AREA-UNDER-CURVE-ASSUMED-NEW-OPERATION (Type 5, the same
  new-vocabulary-without-connection mechanism already documented as
  `linearization`'s own MC-1), MC-2 TOP-BOTTOM-ORDER-ASSUMED-ARBITRARY (Type
  1, the same order-sensitivity mechanism already documented as this batch's
  own `quotient-rule` MC-2, here applied to integral setup), MC-3
  SIGNED-INTEGRAL-ASSUMED-TO-ALWAYS-GIVE-UNSIGNED-AREA (Type 3, language
  contamination — the inverse direction of `definite-integral`'s own MC-1).
- **`math.calc.ftc-part1`** (advanced/analyze, requires `definite-integral` +
  `continuity`, unlocks `ftc-part2`, no cross-links) — differentiating an
  accumulation function $G(x)=\int_a^xf(t)\,dt$ recovers $f(x)$; the dummy
  variable $t$ vanishes upon differentiation; a composite upper limit
  requires the Chain Rule. Older document format, no birth-type column — MC-1
  VARIABLE-CONFUSION-T-AND-X (Type 4, notation-induced), MC-2
  LOWER-LIMIT-DETERMINES-FTC1 (Type 5, instruction-induced — nearly every
  worked example uses lower limit 0), MC-3 CHAIN-RULE-OMITTED (Type 1,
  overgeneralizing the simple-case substitution to composite upper limits).

`math.calc` **20/76 → 24/76**. `math.disc`/`math.graph` unchanged this batch
(20/32 parked, 13/16 parked). Mathematics **386/908 → 390/908**, 745
remaining. **Fifth consecutive batch with zero Blueprint/KG metadata
discrepancies** — all 4 concepts' stated unlocks/cross_links matched the live
KG's own fields exactly, confirmed by direct query. Full per-concept detail
above. All tracking files updated in the same commit: `ROADMAP.md` Section
1/2 totals and the `math.calc` domain row, `COVERAGE.md`'s mathematics
summary row and this Delivery history entry, `CLAUDE.md`'s campaign section.
`EDUCATIONAL_BRAIN_INDEX.md` and `QUALITY.md` again deferred (same
generated-artifact rationale as prior batches). Validated: `npx tsx
scripts/validate-knowledge-graph.ts docs/mathematics/kg/graph.json` PASS,
908/908 reachable, 0 failures, 0 warnings (KG file untouched); `scripts/math/
state.ts` confirms math.calc 24/76, mathematics 390/908, 6 EB-certified
domains (unchanged); `npx tsc --noEmit` clean; targeted tests
`mathPackageCorpus.test.ts` + `mathematicsAssetContract.test.ts` 479/479
passed. All 4 new entries' heading structure diffed clean against
`math.alg.like-terms.md` on the first pass (0 diffs each). Fresh `math.calc`
frontier computed: 9 candidates ready (`arc-length`, `chain-rule`,
`ftc-part2`, `improper-integrals`, `lhopitals-rule`, `line-integrals`,
`mean-value-theorem`, `multivariable-intro`, `volume-revolution`). No
Physics, Chemistry, English, Biology, Computer Science, KG, Blueprint, or
runtime file was modified.

### Batch 42 — math.calc: volumes of revolution, FTC Part 2, arc length, the chain rule (2026-09-12)

Re-fetched and re-synced `main` (13 divergent commits — English/physics/
chemistry defect-fix and QA-documentation work, `git diff --stat` confirmed
zero overlap with `educational-brain/`/`docs/mathematics/` — merged via
`git merge --ff-only`). Re-ran `scripts/math/state.ts` fresh: confirmed
math.calc 24/76, mathematics 390/908, matching Batch 41's end state exactly.
Re-computed the frontier fresh: the exact 9 candidates predicted at the end
of Batch 41 were confirmed still ready (`arc-length`, `chain-rule`,
`ftc-part2`, `improper-integrals`, `lhopitals-rule`, `line-integrals`,
`mean-value-theorem`, `multivariable-intro`, `volume-revolution`). Selected
the 4 sharing the tightest single- or already-authored-double-prerequisite
coupling — `volume-revolution` (single prerequisite, `integral-area`),
`ftc-part2` (`ftc-part1` + `antiderivatives`, both authored this campaign),
`arc-length` (`definite-integral` + `derivative-rules`, both long-authored),
`chain-rule` (`derivative-rules` + `math.func.composition`, both
long-authored) — deferring `improper-integrals`/`lhopitals-rule`/
`line-integrals`/`mean-value-theorem`/`multivariable-intro` to a future
batch. All 4 Blueprint-grounded, reused by reference.

- `math.calc.volume-revolution` (advanced/apply, mastery_threshold 0.75,
  estimated_hours 10 — the highest in the domain, genuinely reflecting three
  distinct methods rather than padding) — disk method $V=\pi\int f(x)^2dx$
  for regions touching the axis; washer method $V=\pi\int(f(x)^2-g(x)^2)dx$
  for a gapped region; shell method $V=2\pi\int xf(x)dx$ as the vertical-axis
  efficiency alternative. Blueprint carries a Severity column (Foundational,
  Moderate) but no birth-type column — MC-1
  DISK-METHOD-USED-WHEN-A-GAP-FROM-THE-AXIS-REQUIRES-THE-WASHER-METHOD (Type
  1, overgeneralizing the disk formula past its touches-the-axis boundary
  condition), MC-2
  SHELL-METHOD-NOT-CONSIDERED-AS-THE-MORE-EFFICIENT-ALTERNATIVE-FOR-VERTICAL-AXIS-ROTATION
  (Type 5, instruction-induced — shell method is simply undertaught relative
  to disk/washer in most intro treatments).
- `math.calc.ftc-part2` (advanced/apply, mastery_threshold 0.85,
  estimated_hours 5) — the Evaluation Theorem $\int_a^b f\,dx=F(b)-F(a)$;
  the $+C$-cancellation proof written out algebraically; the bracket
  notation's upper-bound-first convention. Blueprint carries a Trigger
  column but no birth-type column — MC-1 BOUNDS-SWAPPED (Type 4,
  notation-induced — the bracket's visual TOP/BOTTOM layout and the reading
  order of $\int_a^b$ invite evaluating $a$ before $b$), MC-2
  C-IN-DEFINITE-INTEGRAL (Type 1, overgeneralizing the indefinite integral's
  genuine $+C$ requirement into the definite setting where it cancels), MC-3
  SINGLE-BOUND-EVALUATION (Type 1, importing differentiation's
  single-point-evaluation template into a genuinely two-evaluation
  procedure).
- `math.calc.arc-length` (advanced/apply; cross-link
  `math.geom.differential-geometry-curves` confirmed already authored,
  substantively incorporated via cross-link-probe mode, the first time this
  entry's own Frenet-Serret framework is genuinely engaged rather than
  flagged) — the Pythagorean straight-line-segment derivation of
  $L=\int_a^b\sqrt{1+[f'(x)]^2}dx$, directly reusing `definite-integral`'s
  own Riemann-sum-as-a-limit construction; the orientation-level parametric
  generalization $L=\int\sqrt{[x'(t)]^2+[y'(t)]^2}dt$. Blueprint carries a
  Severity column but no birth-type column — MC-1
  ARC-LENGTH-FORMULA-ASSUMED-UNRELATED-TO-RIEMANN-SUMS (Type 5,
  instruction-induced missing connection to the already-mastered Riemann-sum
  construction), MC-2
  ARC-LENGTH-INTEGRAND-ASSUMED-TO-BE-BARE-DERIVATIVE (Type 2, perceptual —
  the slope alone feels sufficient to measure path length), MC-3
  PARAMETRIC-FORMULA-ASSUMED-UNRELATED-ALTERNATIVE (Type 5, the identical
  missing-connection mechanism as MC-1, recurring one structural level up
  at the parametric-generalization boundary). **A genuine Blueprint/KG
  metadata discrepancy found and resolved toward the KG (not fixed in the
  Blueprint, per standing rule)**: the Blueprint states
  `mastery_threshold=0.8` and `estimated_hours=6`; the live KG carries
  `mastery_threshold=0.7` and `estimated_hours=5`. MAMR is unaffected —
  $\lceil0.8\times5\rceil=4$ and $\lceil0.7\times5\rceil=\lceil3.5\rceil=4$
  coincide by the ceiling function — noted explicitly in this entry so a
  future reader does not assume the discrepancy silently changes the gate
  threshold. This breaks the five-consecutive-zero-discrepancy streak the
  other three concepts in this batch continue.
- `math.calc.chain-rule` (advanced/apply, mastery_threshold 0.85,
  estimated_hours 8; requires `derivative-rules` + `math.func.composition`)
  — $(f\circ g)'(x)=f'(g(x))\cdot g'(x)$; the Blueprint's own explicit
  "Leibniz first, then Lagrange" sequencing rationale; the 5-step
  identification checklist. Blueprint carries a Trigger column but no
  birth-type column — MC-1 INNER-DERIVATIVE-MISSING (Type 1, the Blueprint's
  own explicitly declared foundational misconception, propagating forward
  into implicit differentiation/related rates/u-substitution; overgeneralizes
  the simpler rules' "one differentiation step is the whole task" pattern,
  paralleling `derivative-rules`' own MC-2
  COEFFICIENT-MULTIPLICATION-OMITTED — a required second factor dropped),
  MC-2 OUTER-EVALUATED-AT-X (Type 1, overgeneralizing the ordinary
  evaluate-at-$x$ habit into a setting where the correct evaluation point is
  the inner function $g(x)$), MC-3 CHAIN-RULE-FOR-PRODUCTS (Type 1,
  misclassifying a product structure as a composition — the mirror-image
  confusion of `derivative-rules`' own MC-3
  DISTRIBUTING-DERIVATIVE-OVER-PRODUCTS and `product-rule`'s own MC-1
  DERIVATIVE-DISTRIBUTED-OVER-PRODUCT, all three instances of applying the
  wrong rule to a product's structure). **Zero Blueprint/KG discrepancy, and
  resolves a previously-open verification item carried in prior session
  notes**: the Blueprint's Component 7 states "Unlocks:
  math.calc.implicit-differentiation," and direct query against the live KG
  confirms `unlocks` for this concept is exactly
  `['math.calc.implicit-differentiation']` — a genuine match, now confirmed
  for the first time rather than left open.

`math.calc` **24/76 → 28/76**. `math.disc`/`math.graph` unchanged this batch
(20/32 parked, 13/16 parked). Mathematics **390/908 → 394/908**, 741
remaining. **3 of 4 concepts zero-discrepancy** (`volume-revolution`,
`ftc-part2`, `chain-rule`); `arc-length` carries the one genuine discrepancy
described above, resolved toward the KG, MAMR unaffected. Full per-concept
detail above. All tracking files updated in the same commit: `ROADMAP.md`
Section 1/2 totals and the `math.calc` domain row, `COVERAGE.md`'s
mathematics summary row and this Delivery history entry, `CLAUDE.md`'s
campaign section. `EDUCATIONAL_BRAIN_INDEX.md` and `QUALITY.md` again
deferred (same generated-artifact rationale as prior batches). Validated:
`npx tsx scripts/validate-knowledge-graph.ts docs/mathematics/kg/graph.json`
PASS, 908/908 reachable, 0 failures, 0 warnings (KG file untouched);
`scripts/math/state.ts` confirms math.calc 28/76, mathematics 394/908, 6
EB-certified domains (unchanged); `npx tsc --noEmit` clean; targeted tests
`mathPackageCorpus.test.ts` + `mathematicsAssetContract.test.ts` 479/479
passed. All 4 new entries' heading structure diffed clean against
`math.alg.like-terms.md` on the first pass (0 diffs each). Fresh `math.calc`
frontier computed: 11 candidates ready (`derivative-exponential`,
`derivative-ln`, `implicit-differentiation` — newly unblocked by
`chain-rule` — `improper-integrals`, `lhopitals-rule`, `line-integrals`,
`mean-value-theorem`, `multivariable-intro`, `parametric-calculus`,
`surface-area-integral`, `u-substitution` — the last newly unblocked by
`ftc-part2`). No Physics, Chemistry, English, Biology, Computer Science, KG,
Blueprint, or runtime file was modified.

### Batch 43 — math.calc: derivatives of exponentials/logarithms, implicit differentiation, u-substitution (2026-09-12)

Re-fetched and re-synced `main` (0 divergent commits — clean, no reconciliation
needed). Re-ran `scripts/math/state.ts` fresh: confirmed math.calc 28/76,
mathematics 394/908, matching Batch 42's end state exactly. Re-computed the
frontier fresh: the exact 11 candidates predicted at the end of Batch 42 were
confirmed still ready. Selected all 4 concepts sharing chain-rule/ftc-part2 as
their sole or paired prerequisite — `derivative-exponential`
(`chain-rule`+`math.func.exponential-function`), `derivative-ln`
(`chain-rule`+`math.func.logarithmic-function`), `implicit-differentiation`
(`chain-rule` only), `u-substitution` (`ftc-part2`+`chain-rule`) — deferring
`improper-integrals`/`lhopitals-rule`/`line-integrals`/`mean-value-theorem`/
`multivariable-intro`/`parametric-calculus`/`surface-area-integral` to a
future batch. All 4 Blueprint-grounded, reused by reference.

- `math.calc.derivative-exponential` (advanced/apply, mastery_threshold 0.85,
  estimated_hours 3) — $e^x$'s unique self-derivative property; the general
  base rule $a^x\ln a$; the Chain Rule extension for a function exponent.
  Blueprint carries a Severity column (both Foundational) but no birth-type
  column — MC-1 GENERAL-BASE-EXPONENTIAL-DERIVATIVE-MISSING-LN-A-FACTOR (Type
  1, overgeneralizing $e^x$'s own special-case simplicity to every base), MC-2
  CHAIN-RULE-FACTOR-OMITTED-WHEN-EXPONENT-IS-A-FUNCTION (Type 1, a direct
  transplant of `math.calc.chain-rule`'s own foundational MC-1,
  INNER-DERIVATIVE-MISSING, into this specific outer-function context).
- `math.calc.derivative-ln` (advanced/apply, mastery_threshold 0.85,
  estimated_hours 4) — $\ln x=1/x$'s unique simplicity vs. the general-base
  $\log_ax=1/(x\ln a)$; the Chain Rule extension for a function argument;
  logarithmic differentiation for products/quotients/variable powers via
  $y=x^x$. Blueprint carries a Severity column but no birth-type column —
  MC-1 GENERAL-BASE-LOG-DERIVATIVE-MISSING-LN-A-FACTOR and MC-2
  CHAIN-RULE-FACTOR-OMITTED-FOR-LOG-OF-A-FUNCTION, both Type 1 and both the
  IDENTICAL mechanisms already documented for `derivative-exponential`'s own
  MC-1/MC-2, mirrored across the inverse function — a third recurrence
  (alongside `chain-rule`'s own MC-1) of the same inner-derivative-missing
  pattern across this closely related concept family.
- `math.calc.implicit-differentiation` (advanced/apply, mastery_threshold
  0.8, estimated_hours 6; requires `chain-rule` only) — every $y$-term needs
  the chain-rule factor $dy/dx$; genuinely necessary for equations with no
  elementary closed-form solution (the folium of Descartes,
  $x^3+y^3=6xy$); preferred even when explicit solving is possible (avoiding
  branch-by-branch $\pm$-case bookkeeping). Blueprint carries a Severity
  column but no birth-type column — MC-1 CHAIN-RULE-FACTOR-OMITTED-ON-Y-TERMS
  (Type 1; the Blueprint's OWN prose explicitly names this as "the direct
  transplant of `math.calc.chain-rule`'s own inner-derivative-missing
  misconception into this context" — the fourth documented recurrence of
  this exact mechanism this campaign), MC-2 DY-DX-TERMS-NOT-COLLECTED-AND-
  ISOLATED (Type 5, instruction-induced — no prior differentiation task ever
  required an additional algebraic completion step, so the genuinely new
  requirement is easy to treat as optional), MC-3
  IMPLICIT-DIFFERENTIATION-TREATED-AS-LAST-RESORT-ONLY (Type 5,
  instruction-induced — the technique is typically introduced only via
  equations that can't be solved explicitly, so the necessity condition is
  mistaken for the only valid use case).
- `math.calc.u-substitution` (advanced/apply, mastery_threshold 0.85,
  estimated_hours 10 — second-highest in the domain after
  `volume-revolution`'s 10; requires `ftc-part2`+`chain-rule`) —
  substitution as the Chain Rule run in reverse; the mandatory
  $du$-verification step (the method is inapplicable, not merely
  inefficient, when $g'(x)$ is genuinely absent); the constant-adjustment
  technique; definite-integral bound conversion at the moment of
  substitution. Blueprint carries a Trigger column but no birth-type
  column — MC-1 DU-WITHOUT-VERIFICATION (Type 1, overgeneralizing the
  substitution pattern's applicability past its actual validity condition,
  the identical scope-overextension shape already documented for
  `volume-revolution`'s own MC-1), MC-2 LIMITS-UNCHANGED (Type 4,
  notation-induced — a definite integral's bound numbers carry no visible
  marker of which variable they belong to, inviting the numbers to be
  carried over unconverted), MC-3 DU-ALGEBRA-ERROR (Type 1, the identical
  mechanism already documented as `math.calc.derivative-rules`' own MC-2,
  COEFFICIENT-MULTIPLICATION-OMITTED, recurring here in the specific
  context of computing a differential).

`math.calc` **28/76 → 32/76**. `math.disc`/`math.graph` unchanged this batch
(20/32 parked, 13/16 parked). Mathematics **394/908 → 398/908**, 737
remaining. **All 4 concepts zero-discrepancy** — a fresh streak restarting
after Batch 42's `arc-length` broke the prior five-consecutive-zero run.
Full per-concept detail above. All tracking files updated in the same
commit: `ROADMAP.md` Section 1/2 totals and the `math.calc` domain row,
`COVERAGE.md`'s mathematics summary row and this Delivery history entry,
`CLAUDE.md`'s campaign section. `EDUCATIONAL_BRAIN_INDEX.md` and
`QUALITY.md` again deferred (same generated-artifact rationale as prior
batches). Validated: `npx tsx scripts/validate-knowledge-graph.ts
docs/mathematics/kg/graph.json` PASS, 908/908 reachable, 0 failures, 0
warnings (KG file untouched); `scripts/math/state.ts` confirms math.calc
32/76, mathematics 398/908, 6 EB-certified domains (unchanged); `npx tsc
--noEmit` clean; targeted tests `mathPackageCorpus.test.ts` +
`mathematicsAssetContract.test.ts` 479/479 passed. All 4 new entries'
heading structure diffed clean against `math.alg.like-terms.md` on the
first pass (0 diffs each). Fresh `math.calc` frontier computed: 10
candidates ready (`improper-integrals`, `integration-by-parts` — newly
unblocked by `u-substitution` — `lhopitals-rule`, `line-integrals`,
`logarithmic-differentiation` — newly unblocked by `derivative-ln` —
`mean-value-theorem`, `multivariable-intro`, `parametric-calculus`,
`related-rates` — newly unblocked by `implicit-differentiation` —
`surface-area-integral`). No Physics, Chemistry, English, Biology, Computer
Science, KG, Blueprint, or runtime file was modified.

### Batch 44 — math.calc: logarithmic differentiation, related rates, surface area of revolution, integration by parts (2026-09-12)

Re-fetched `main` (0 divergence, clean). Re-computed the frontier fresh —
the exact 10 candidates predicted at the end of Batch 43 were confirmed
still ready. Selected 4 sharing either a single already-authored
prerequisite or two long-authored ones: `logarithmic-differentiation`
(single: `derivative-ln`), `related-rates` (single:
`implicit-differentiation`), `surface-area-integral` (single:
`arc-length`), `integration-by-parts` (two: `u-substitution` +
`product-rule`, both authored in Batch 43/earlier), deferring
`improper-integrals`/`lhopitals-rule`/`line-integrals`/
`mean-value-theorem`/`multivariable-intro`/`parametric-calculus`. All 4
Blueprint-grounded, reused by reference. **None of the 4 Blueprints
carried an explicit birth-type column** — the fifteenth, sixteenth,
seventeenth, and eighteenth such gaps this campaign — every misconception
independently classified:

- `math.calc.logarithmic-differentiation` (advanced/apply, mastery_threshold
  0.75, estimated_hours 3; requires `derivative-ln` only) — the technique
  required when BOTH the base and the exponent are variable (e.g.
  $y=x^{\sin x}$), where neither the power rule nor the exponential rule
  applies; the 5-step procedure (log both sides, expand via
  $\ln(u^v)=v\ln u$, differentiate implicitly, solve for $y'$, substitute
  the original expression back for $y$). MC-1
  LOGARITHMIC-DIFFERENTIATION-USED-UNNECESSARILY-FOR-A-CONSTANT-EXPONENT-CASE
  (Type 1, overgeneralization — the technique's power is extended into a
  universal substitute for simpler rules, applied even where the exponent
  is a constant), MC-2
  FINAL-SUBSTITUTION-STEP-OMITTED-LEAVING-THE-ANSWER-IN-TERMS-OF-Y (Type 5,
  instruction-induced — the identical mechanism already documented for
  `math.calc.implicit-differentiation`'s own MC-2, since every simpler
  differentiation task ends the moment the derivative is symbolically
  found, so the genuinely new back-substitution requirement is easy to
  treat as optional).
- `math.calc.related-rates` (advanced/apply, mastery_threshold 0.75,
  estimated_hours 6; requires `implicit-differentiation` only) — setting up
  a relating equation and differentiating with respect to TIME; the
  substitute-after-not-before-differentiating discipline; genuinely
  degenerate (zero or undefined) rates at specific instants as real
  physical features, not setup errors. MC-1
  NUMERICAL-VALUES-SUBSTITUTED-BEFORE-DIFFERENTIATING (Type 1,
  overgeneralization of the ordinary-algebra habit of substituting known
  values early — safe in static problems, destructive here since it treats
  a variable as a constant with derivative 0), MC-2
  DEGENERATE-RATE-RESULT-ASSUMED-TO-BE-A-SETUP-ERROR (Type 2, perceptual
  intuition — a correctly-posed problem intuitively "should" yield a clean
  answer, so a degenerate result feels perceptually wrong rather than
  genuinely correct).
- `math.calc.surface-area-integral` (advanced/apply, mastery_threshold
  0.65, estimated_hours 4; requires `arc-length` only) — the surface area
  of revolution formula $S=2\pi\int_a^bf(x)\sqrt{1+[f'(x)]^2}\,dx$ as
  "circumference times arc length," directly reusing `arc-length`'s own
  differential; the cylinder sanity check confirming the reading; careful
  derivative-and-squaring computation before integrating. MC-1
  ARC-LENGTH-FACTOR-OMITTED-FROM-SURFACE-AREA-FORMULA (Type 1,
  overgeneralization from the superficially similar, more recently
  practiced volume-of-revolution formula family — "revolution problems
  integrate a multiple of f(x)" extended past the point where surface area
  genuinely requires the additional arc-length factor), MC-2
  DERIVATIVE-MISHANDLED-OR-NOT-SQUARED-CORRECTLY-IN-SETUP (Type 1, the same
  class of mid-procedure computational slip already documented for
  `math.calc.derivative-rules`' own MC-2).
- `math.calc.integration-by-parts` (advanced/apply, mastery_threshold 0.8,
  estimated_hours 10 — tied with `volume-revolution` as the highest in the
  domain; requires `u-substitution`+`product-rule`, unlocks
  `math.calc.reduction-formulas`) — the Product Rule run in reverse,
  derived directly from $(uv)'=u'v+uv'$; the LIATE choice-of-parts
  heuristic; repeated application when the new integral still contains a
  product. Three misconceptions (not two): MC-1
  U-DV-CHOICE-TREATED-AS-ARBITRARY (Type 5, instruction-induced — the
  formula is algebraically valid regardless of the choice, so nothing
  signals the choice carries a consequence without an explicit backfire
  demonstration), MC-2 SINGLE-APPLICATION-ASSUMED-ALWAYS-SUFFICIENT (Type
  1, overgeneralization from typical simple single-application worked
  examples), MC-3 DV-INTEGRATED-WITH-AN-UNNECESSARY-CONSTANT-OF-INTEGRATION
  (Type 1, the identical misapplied-"+C" mechanism already documented for
  `math.calc.ftc-part2`'s own MC-2, C-IN-DEFINITE-INTEGRAL, here recurring
  in the different context of an intermediate step within a larger
  formula).

`math.calc` **32/76 → 36/76**. `math.disc`/`math.graph` unchanged this
batch (20/32 parked, 13/16 parked). Mathematics **398/908 → 402/908**, 733
remaining. **All 4 concepts zero-discrepancy** — the second consecutive
all-4-zero-discrepancy batch, continuing the streak restarted in Batch 43
after Batch 42's `arc-length` broke the prior five-consecutive-zero run.
One clarification recorded (not a discrepancy): `surface-area-integral`'s
Blueprint names `math.geom.surface-area` as a "related" concept, but this
is explicitly NOT a KG cross_link (the KG's own `cross_links` field is
empty) — the entry's Cross-Subject Connections section states that
distinction explicitly. `integration-by-parts`' `unlocks:
math.calc.reduction-formulas` is confirmed to match the live KG exactly.
Full per-concept detail above. All tracking files updated in the same
commit: `ROADMAP.md` Section 1/2 totals and the `math.calc` domain row,
`COVERAGE.md`'s mathematics summary row and this Delivery history entry,
`CLAUDE.md`'s campaign section. `EDUCATIONAL_BRAIN_INDEX.md` and
`QUALITY.md` again deferred (same generated-artifact rationale as prior
batches). Validated: `npx tsx scripts/validate-knowledge-graph.ts
docs/mathematics/kg/graph.json` PASS, 908/908 reachable, 0 failures, 0
warnings (KG file untouched); `scripts/math/state.ts` confirms math.calc
36/76, mathematics 402/908, 6 EB-certified domains (unchanged); `npx tsc
--noEmit` clean; targeted tests `mathPackageCorpus.test.ts` +
`mathematicsAssetContract.test.ts` 479/479 passed. All 4 new entries'
heading structure diffed clean against `math.alg.like-terms.md` on the
first pass (0 diffs each). Fresh `math.calc` frontier computed: 7
candidates ready (`improper-integrals`, `lhopitals-rule`, `line-integrals`,
`mean-value-theorem`, `multivariable-intro`, `parametric-calculus`,
`reduction-formulas` — the last newly unblocked by
`integration-by-parts`). No Physics, Chemistry, English, Biology, Computer
Science, KG, Blueprint, or runtime file was modified.

### Batch 45 — math.calc: reduction formulas, L'Hôpital's rule, the Mean Value Theorem, introduction to multivariable calculus (2026-09-12)

Re-fetched `main` (0 divergence, clean). Re-computed the frontier fresh — the
exact 7 candidates predicted at the end of Batch 44 were confirmed still
ready. Selected 4 sharing either a single already-authored prerequisite or
two long-authored ones: `reduction-formulas` (single: `integration-by-parts`,
a direct continuation from Batch 44), `lhopitals-rule`
(`derivative-definition`+`limits`), `mean-value-theorem`
(`derivative-definition`+`continuity`), `multivariable-intro`
(`derivative-definition`+`math.geom.vectors-3d`), deferring
`improper-integrals`/`line-integrals`/`parametric-calculus`. All 4
Blueprint-grounded, reused by reference. **None of the 4 Blueprints carried
an explicit birth-type column** — the nineteenth through twenty-second such
gaps this campaign — every misconception independently classified:

- `math.calc.reduction-formulas` (advanced/apply, mastery_threshold 0.70,
  estimated_hours 4; requires `integration-by-parts` only) — a reduction
  formula as PACKAGED integration by parts, repeated application to a
  genuine base case, and the base case as a real stopping boundary. MC-1
  REDUCTION-FORMULA-APPLIED-ONLY-ONCE-LEAVING-THE-INTEGRAL-UNRESOLVED (Type
  1, overgeneralization of "apply the rule, get the answer" from single-step
  techniques), MC-2 REDUCTION-CONTINUED-PAST-THE-NATURAL-BASE-CASE (Type 5,
  instruction-induced — worked examples rarely show an incorrect
  further-reduction attempt).
- `math.calc.lhopitals-rule` (advanced/apply, mastery_threshold 0.80,
  estimated_hours 5; requires `derivative-definition`+`limits`) — verify the
  indeterminate form FIRST, algebraically rewrite non-quotient indeterminate
  forms into a quotient before applying the rule, and reapply as many times
  as needed. MC-1 LHOPITALS-RULE-APPLIED-TO-A-NON-INDETERMINATE-FORM (Type
  1, overgeneralizing "differentiate top and bottom when the denominator
  vanishes" past the required companion numerator condition), MC-2
  OTHER-INDETERMINATE-FORMS-NOT-REWRITTEN-AS-A-QUOTIENT-FIRST (Type 4,
  notation-induced — the shared label "indeterminate" obscures the
  structural difference between a quotient and a product/difference).
- `math.calc.mean-value-theorem` (advanced/analyze, mastery_threshold 0.8,
  estimated_hours 6; requires `derivative-definition`+`continuity`, unlocks
  `math.calc.increasing-decreasing`+`math.real.mvt`) — the existence claim
  (secant/tangent parallelism), both hypotheses on their asymmetric stated
  domains, and existence-not-uniqueness. Three misconceptions: MC-1
  HYPOTHESES-NOT-CHECKED (Type 1, overgeneralization), MC-2
  UNIQUENESS-ASSUMED (Type 3, language contamination — "there exists" misread
  as "exactly one"), MC-3 ENDPOINT-DIFFERENTIABILITY-REQUIRED (Type 4,
  notation-induced — the closed/open asymmetry easily collapsed into one
  stricter requirement). Cross-link `math.real.mvt` confirmed genuinely
  unauthored (independence mode, matching the Blueprint's own verification).
- `math.calc.multivariable-intro` (advanced/understand, mastery_threshold
  0.8, estimated_hours 5; requires `derivative-definition`+
  `math.geom.vectors-3d`, unlocks `math.calc.partial-derivatives`) — domain
  as a 2D region/graph as a 3D surface/level curves, the vertical-line-test
  analogue, and the path-testing asymmetry (one disagreeing path disproves,
  no number of agreeing paths proves). Three misconceptions, all Type 1
  overgeneralization of a correct 1D procedure extended unmodified into 2D:
  MC-1 SINGLE-PATH-LIMIT, MC-2 EVERY-SURFACE-IS-FUNCTION, MC-3
  DOMAIN-IS-INTERVAL.

`math.calc` **36/76 → 40/76**. `math.disc`/`math.graph` unchanged this batch
(20/32 parked, 13/16 parked). Mathematics **402/908 → 406/908**, 729
remaining. **All 4 concepts zero-discrepancy** — the THIRD consecutive
all-4-zero-discrepancy batch, continuing the streak restarted in Batch 43
after Batch 42's `arc-length` broke the prior five-consecutive-zero run. No
genuine content-overlap found. Full per-concept detail above. All tracking
files updated in the same commit: `ROADMAP.md` Section 1/2 totals and the
`math.calc` domain row, `COVERAGE.md`'s mathematics summary row and this
Delivery history entry, `CLAUDE.md`'s campaign section. `EDUCATIONAL_BRAIN_INDEX.md`
and `QUALITY.md` again deferred (same generated-artifact rationale as prior
batches). Validated: `npx tsx scripts/validate-knowledge-graph.ts
docs/mathematics/kg/graph.json` PASS, 908/908 reachable, 0 failures, 0
warnings (KG file untouched); `scripts/math/state.ts` confirms math.calc
40/76, mathematics 406/908, 6 EB-certified domains (unchanged); `npx tsc
--noEmit` clean; targeted tests `mathPackageCorpus.test.ts` +
`mathematicsAssetContract.test.ts` 479/479 passed. All 4 new entries'
heading structure diffed clean against `math.alg.like-terms.md` on the
first pass (0 diffs each). Fresh `math.calc` frontier computed: 7
candidates ready (`improper-integrals`, `increasing-decreasing`,
`line-integrals`, `multiple-integrals`, `parametric-calculus`,
`partial-derivatives`, `rolles-theorem` — the last four newly unblocked by
`mean-value-theorem`/`multivariable-intro`). No Physics, Chemistry, English,
Biology, Computer Science, KG, Blueprint, or runtime file was modified.

### Batch 46 — math.calc: increasing/decreasing functions, Rolle's Theorem, improper integrals, partial derivatives (2026-09-12)

Re-fetched `main` (0 divergence, clean). Re-computed the frontier fresh — the
exact 7 candidates predicted at the end of Batch 45 were confirmed still
ready. Selected 4: `increasing-decreasing` and `rolles-theorem` (both direct
children of Batch 45's `mean-value-theorem`), `partial-derivatives` (single:
`multivariable-intro`, high-leverage — unlocks 3 further concepts at once),
`improper-integrals` (`definite-integral`+`limits-at-infinity`, both
long-authored), deferring `line-integrals`/`multiple-integrals`/
`parametric-calculus`. All 4 Blueprint-grounded, reused by reference. **None
of the 4 Blueprints carried an explicit birth-type column** — the
twenty-third through twenty-sixth such gaps this campaign — every
misconception independently classified:

- `math.calc.increasing-decreasing` (advanced/apply, mastery_threshold 0.8,
  estimated_hours 4; requires `mean-value-theorem` only, unlocks
  `critical-points` — already authored in Batch 40, a genuine forward
  relationship confirmed via directory listing) — the test's DERIVATION from
  the MVT (never a standalone fact), the IVT-based one-sample-point-per-
  interval efficiency guarantee, and a critical point that does NOT actually
  interrupt monotonicity. MC-1 CRITICAL-POINT-ASSUMED-TO-BREAK-MONOTONICITY
  (Type 1, overgeneralizing typical examples where a critical point DOES
  mark a sign change), MC-2 SIGN-ANALYSIS-REQUIRES-EXHAUSTIVE-TESTING (Type
  5, instruction-induced — the efficient shortcut is often taught without
  its own IVT-based justification), MC-3
  TEST-CITED-WITHOUT-MVT-JUSTIFICATION (Type 5, instruction-induced — the
  test is often presented as an immediately usable rule, derivation
  optional).
- `math.calc.rolles-theorem` (advanced/apply, mastery_threshold 0.80,
  estimated_hours 3; requires `mean-value-theorem` only) — the theorem as
  the EXACT special case of the MVT where $f(a)=f(b)$ collapses the
  conclusion to $f'(c)=0$, and the all-or-nothing nature of its three
  hypotheses. MC-1 EQUAL-ENDPOINT-HYPOTHESIS-NOT-EXPLICITLY-VERIFIED (Type
  5, instruction-induced — the identical hypothesis-skipping mechanism
  already documented for `mean-value-theorem`'s own MC-1, here recurring in
  Rolle's narrower special case), MC-2
  PARTIAL-HYPOTHESIS-SATISFACTION-ASSUMED-TO-STILL-GUARANTEE-THE-CONCLUSION
  (Type 1, overgeneralizing the everyday "mostly meeting conditions is
  mostly enough" reasoning into formal logic's all-or-nothing hypotheses).
- `math.calc.improper-integrals` (advanced/apply, mastery_threshold 0.75,
  estimated_hours 8; requires `definite-integral`+`limits-at-infinity`,
  unlocks `math.seq.integral-test` — confirmed genuinely unauthored,
  math.seq entirely unstarted) — Type I (infinite-limit) and Type II
  (singularity) impropriety, both resolved by the same
  replace-then-limit strategy, and convergence-must-be-checked-never-
  assumed. MC-1 IMPROPRIETY-ASSUMED-TO-REQUIRE-INFINITE-LIMITS (Type 1,
  overgeneralizing from Type I examples), MC-2
  IMPROPER-INTEGRAL-ASSUMED-TO-ALWAYS-CONVERGE (Type 1, overgeneralizing
  "valid setup always produces a number" from every prior proper integral),
  MC-3 SINGULARITY-LOCATION-OVERLOOKED-WITHIN-INTERVAL (Type 1,
  overgeneralizing the endpoint-only pattern from typical introductory
  examples).
- `math.calc.partial-derivatives` (advanced/apply, mastery_threshold 0.8,
  estimated_hours 8; requires `multivariable-intro` only, unlocks
  `math.calc.gradient`+`math.calc.directional-derivative`+
  `math.calc.chain-rule-multivariable` — a high-leverage node unblocking 2
  of those 3 immediately) — freeze-the-other-variable computation,
  Clairaut's theorem (mixed partials commute), and partial-versus-total
  rate of change. MC-1 OTHER-VARIABLE-TREATED-AS-VARIABLE (Type 1,
  overgeneralizing the single-variable "differentiate everything" reflex),
  MC-2 MIXED-PARTIALS-NONCOMMUTATIVE (Type 6, analogy overextension — the
  "order matters" pattern from matrix multiplication/composition
  over-applied where Clairaut's theorem guarantees the opposite), MC-3
  PARTIAL-IS-TOTAL-DERIVATIVE (Type 1, overgeneralizing the 1D
  identification of "the derivative" with "the" rate of change).

`math.calc` **40/76 → 44/76**. `math.disc`/`math.graph` unchanged this batch
(20/32 parked, 13/16 parked). Mathematics **406/908 → 410/908**, 725
remaining. **All 4 concepts zero-discrepancy** — the FOURTH consecutive
all-4-zero-discrepancy batch, continuing the streak restarted in Batch 43
after Batch 42's `arc-length` broke the prior five-consecutive-zero run.
Full per-concept detail above. All tracking files updated in the same
commit: `ROADMAP.md` Section 1/2 totals and the `math.calc` domain row,
`COVERAGE.md`'s mathematics summary row and this Delivery history entry,
`CLAUDE.md`'s campaign section. `EDUCATIONAL_BRAIN_INDEX.md` and
`QUALITY.md` again deferred (same generated-artifact rationale as prior
batches). Validated: `npx tsx scripts/validate-knowledge-graph.ts
docs/mathematics/kg/graph.json` PASS, 908/908 reachable, 0 failures, 0
warnings (KG file untouched); `scripts/math/state.ts` confirms math.calc
44/76, mathematics 410/908, 6 EB-certified domains (unchanged); `npx tsc
--noEmit` clean; targeted tests `mathPackageCorpus.test.ts` +
`mathematicsAssetContract.test.ts` 479/479 passed. All 4 new entries'
heading structure diffed clean against `math.alg.like-terms.md` on the
first pass (0 diffs each). Fresh `math.calc` frontier computed: 6
candidates ready (`chain-rule-multivariable`, `gradient`, `line-integrals`,
`local-extrema`, `multiple-integrals`, `parametric-calculus` — the first
two and `local-extrema` newly unblocked by
`partial-derivatives`/`increasing-decreasing`). No Physics, Chemistry,
English, Biology, Computer Science, KG, Blueprint, or runtime file was
modified.
