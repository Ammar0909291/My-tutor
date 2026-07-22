# KGCS — Knowledge Graph Concept Granularity Standard

**Document class:** Architectural specification — answers the question CEKR's
own roadmap (§18) explicitly leaves open: *"Skill vs Concept boundary in
mathematics… needs piloting on one domain."* This document is that piloting,
generalized across subjects, and formalized into a rulebook.
**Status:** RESEARCH / SPECIFICATION — design only. No runtime code, no KG
content changes, no schema changes. Adoption and any KG rebuild remain
G1/G2-gated owner decisions, per standing governance.
**Version:** 1.0.0. **Normative language:** RFC 2119.
**Relationship to existing frozen documents:** this document does not modify
`CEKR_CANONICAL_EDUCATIONAL_KNOWLEDGE_REPRESENTATION.md`,
`EDUCATIONAL_BRAIN_COMPILER.md`, `EOS_V2_ARCHITECTURE.md`, or any Canonical
KG file. It governs a question those documents deliberately left open: **how
large should one `Concept` (or `Concept` vs `Skill`) be**, for the KG that
CEKR's Family S ingests and that today's `docs/{subject}/kg/graph.json`
files already instantiate at the 10-field schema level.

**Why this document exists now:** two independent findings, from two
independent audits already in this repository, converge on the same
unresolved question. ADR 07 found the entire "what counts as mastered"
judgment resting on one flat constant, "blind to the curriculum-authored
per-concept granularity" — i.e., mastery quality is bounded by concept
granularity. ADR 05/07 both flag "concept-level granularity" vs. "chapter
granularity" as a live, unresolved risk in exactly these words. CEKR's own
§18 asks the identical question from the data-model side and defers it.
This document supplies the missing rulebook.

---

## Table of Contents

1. The primary research question, answered
2. Canonical definition of a Knowledge Graph concept
3. Node property cardinality (one-vs-many, for every property listed)
4. Canonical granularity rules (min/max scope, node size)
5. Canonical split rules
6. Canonical merge rules
7. Canonical prerequisite rules
8. Canonical mastery rules
9. Canonical assessment rules
10. Canonical misconception rules
11. Worked examples across subjects
12. Re-estimated concept counts (Mathematics, Physics, Chemistry, Biology,
    English)
13. Confidence ledger (established research / expert consensus / informed
    estimate)
14. Migration strategy — refining an existing coarse graph without breakage
15. Risks and unresolved questions

---

## 1. The Primary Research Question, Answered

**What should one Knowledge Graph node represent?**

**One Knowledge Component (KC)**, in the formal sense defined by Koedinger,
Corbett & Perfetti's Knowledge-Learning-Instruction (KLI) framework (2012,
*Cognitive Science*): *"an acquired unit of cognitive function or structure
that can be inferred from performance on a set of related tasks."* This is
not a stylistic preference — it is the only candidate among the ones this
research question asked us to test that is **empirically falsifiable**: a
proposed KC boundary can be checked against real performance data (do
students who succeed on task-family A also succeed on task-family B, or are
the two dissociable?), the way Cognitive Tutor / Carnegie Learning's
Learning Factors Analysis and Additive Factors Model tooling has done for
two decades of production ITS deployments. Every other candidate the
investigation was asked to test fails a specific, nameable way:

| Candidate | Verdict | Why |
|---|---|---|
| A chapter | REJECTED | A packaging/delivery unit, not a cognitive unit. Bundles many independent skills; cannot carry one mastery state honestly (a learner can be 80% through a chapter and 0% or 100% on any given skill inside it). |
| A topic | REJECTED (as commonly used) | "Topic" is used ambiguously across curricula to mean anything from chapter to KC; not a rigorous unit on its own. |
| A lesson | REJECTED as the KG unit (but real, at a different layer) | A lesson is a **pacing** decision (how much to teach in one sitting), which legitimately varies by instructor/learner/register. This repository already separates this correctly: the Dynamic Lesson Composer (ADR 09) sequences **multiple** KG nodes into one session. Conflating lesson-grain with KG-node-grain would collapse a layer this repo has already, correctly, kept apart. |
| A learning objective | CLOSE, but not the formal definition | AP/IB "students will be able to…" objectives are a strong **empirical proxy** for real KC boundaries (curriculum bodies have iterated these against decades of exam data), and are used throughout §12 as calibration evidence. But objectives as written are inconsistently grained across authors — sometimes bundling 2–3 KCs, sometimes exactly one. KC is the underlying construct; "learning objective" is frequently a good but not guaranteed proxy for it. |
| **A Knowledge Component** | **ADOPTED** | Falsifiable, empirically validated in decades of ITS deployment (Cognitive Tutor, Carnegie Learning), and directly compatible with this repo's own frozen machinery: Bayesian-Knowledge-Tracing-style mastery estimation (Corbett & Anderson, 1995) is mathematically defined *per skill*, and only produces meaningful probabilities when "skill" = KC grain. |
| A misconception unit | REJECTED as the node itself | A single KC routinely carries 2–6 distinct misconceptions (confirmed directly in this repo's own `educational-brain/concepts/*.md` entries, each authoring a *library* of misconceptions per concept, not one). A misconception is a property attached to a node, never the node's definition. |
| A mastery unit | CONVERGES with KC | "The thing you track one mastery state for" is the operational description of a KC, not a competing definition. Kept as a synonym, not a fourth candidate. |

**Working definition adopted for the rest of this document:**

> A Knowledge Graph node (a CEKR `Concept` or `Skill`) SHOULD represent the
> smallest unit of subject knowledge for which (a) mastery is assessable by
> a small family of related items, (b) a single coherent, non-decomposable
> prerequisite set can be stated, (c) a specific, nameable set of
> misconceptions can be attached, and (d) one explanation can be authored
> that teaches that thing and nothing else — where "smallest" is bounded
> below by Cognitive Load Theory's working-memory ceiling (§4) and the split
> tests are empirically checkable, not aesthetic (§5).

This directly answers CEKR §18's open question: **a `Concept` is
understood** (a fact, relationship, or mental model — Bloom remember through
analyze without a fluency/procedural-automaticity requirement); **a `Skill`
is performed under a fluency/mastery gate** (a procedure the learner
executes, timed or repeated to automaticity — CEKR's own proposed default,
adopted here as the tie-break rule, §5 Rule S6). Both are KCs; `Skill` is
the procedural subtype.

---

## 2. Canonical Definition of a Knowledge Graph Concept

A **Concept** (or **Skill**, its procedural subtype) is a KC satisfying all
four tests in §1's working definition, MUST have:

- Exactly one **primary learning objective** (§3).
- Exactly one **coherent prerequisite set** (§3, §7) — a set of nodes that
  are ALL required together, which MAY be empty (root nodes) but MUST NOT
  silently omit a genuinely required dependency, and MUST NOT bundle
  dependencies only some downstream users of the node actually need (that
  is a split signal, §5 Rule S3).
- Exactly one **mastery state** per learner (§8) — if honestly describing a
  learner's understanding requires two independent numbers, the node is two
  KCs (§5 Rule S1, restated as a mastery-state test).
- A **misconception library**: zero or more (typically 1–6) distinct,
  named misconceptions (§10) — never "the concept is hard," always specific
  wrong models.
- One or more **explanations/assets**, all teaching the SAME KC (register-,
  modality-, and difficulty-varied) — this is many-to-one by design and
  already matches this repo's live `AssetIdentity` model (ADR 14:
  `ExplanationAsset` is many-to-one against `conceptId`).
- One or more **assessment items** testing the SAME KC via varied surface
  form (§9) — never assessed by exactly one fixed-wording item.

---

## 3. Node Property Cardinality

Directly answering the "for every node, exactly one or multiple?" question:

| Property | Cardinality | Rationale |
|---|---|---|
| Learning objective | **Exactly one** (primary) | Definitional (§2). A node needing two independent objectives that don't share assessment/prerequisite structure is two nodes (§5 Rule S1). |
| Prerequisite set | **One set, may contain multiple edges** | "One coherent set that's all required together," not "one prerequisite." Multiple incoming `REQUIRES` edges are normal and expected. |
| Misconception library | **Multiple (0–6 typical)** | Matches this repo's own `educational-brain/concepts/*.md` authoring pattern exactly — every existing seed entry authors a library, never a singleton. |
| Mastery state | **Exactly one per (learner, node)** | Definitional; this is precisely what Bayesian/Deep Knowledge Tracing estimate per skill. A coarser node produces a mastery *average* across unrelated skills, which is not a meaningful mastery claim (this is the exact failure mode ADR 07 documents against the current flat `ASSESSMENT_PASS_THRESHOLD` constant). |
| Assessment objective | **One primary, multiple items** | Standard psychometric practice: never assess a construct with one fixed item (reliability), and varied surface form guards against pattern-matching rather than genuine mastery (testing-effect / retrieval-practice literature, Roediger & Karpicke 2006). |
| Explanation | **Multiple, same KC** | Register/modality/difficulty variants of the same idea. Matches CEKR's `EXPLAINS` edge (many Explanation-family entities → one Concept) and this repo's live ExplanationAsset cardinality. |
| Worked example | **Multiple, same KC** | Same reasoning as explanations — varied surface features, same underlying procedure. |
| Retrieval schedule entry | **One per (learner, node)** | Spaced-repetition research (the forgetting-curve literature since Ebbinghaus 1885, operationalized in SuperMemo's SM-family algorithms) schedules review at the grain of "this specific fact/skill." A coarser grain force-reviews already-solid material alongside decaying material (review-efficiency loss); a finer grain than KC explodes review burden without proportionate benefit — the KC boundary is also the correct spaced-repetition boundary, not a coincidence: both are answering "what is the smallest thing that decays independently in memory?" |
| Confidence estimate | **One distribution per (learner, node), updated over time** | This IS the Bayesian Knowledge Tracing state variable (Corbett & Anderson 1995: P(mastery) per skill, updated per observation via a 4-parameter HMM). The mathematics of BKT is defined at KC grain; applying it to a coarser node produces a P(mastery) that mixes unrelated evidence and is not interpretable. |

---

## 4. Canonical Granularity Rules

**Node Size (RFC 2119: SHOULD).** A node's content — one explanation, at
teaching time — SHOULD require holding no more than **~4 novel, interacting
elements** in working memory simultaneously. This is Cognitive Load Theory's
(Sweller 1988, 2011) intrinsic-load ceiling, refined from Miller's original
7±2 (1956) to the now-standard ~4-chunk estimate for genuinely novel material
(Cowan 2001). This gives node size a **cognitive**, not merely
assessment-based, upper bound — independent evidence converging on the same
answer as the KC/assessability tests in §5, which is why granularity rules
below rarely conflict with each other in practice.

**Maximum scope (MUST NOT exceed).** A node MUST NOT bundle two sub-ideas
that fail *any* of the five split tests in §5. Practically: a node
describing an entire organ system, an entire named theorem-and-all-its-
corollaries, or an entire multi-stage biochemical pathway is presumptively
too large and should be treated as a **cluster to be decomposed**, not a
single Concept.

**Minimum scope (MUST NOT go below).** A node MUST NOT represent something
with no independent assessability (nothing you could write a probe item for
that isn't identical to a sibling node's probe) and MUST NOT represent a
pure delivery/wording variant of an already-existing node (that is a
`VARIANT_OF` relationship in CEKR terms, not a new Concept). This is the
direct KG-layer restatement of `TEACHING_PRIMITIVE_ARCHITECTURE.md`'s
already-adopted admission test for the *action* layer ("does this primitive
have a single, observable cognitive effect? … If a 'primitive' has two
effects — it is a composition, not a primitive"). This document applies the
identical test to the *knowledge* layer: **does this concept have a single,
observable mastery-relevant effect on learner performance? If yes — correct
granularity. If a proposed node has two independently-checkable effects, it
is a composition, not a concept.**

---

## 5. Canonical Split Rules

A concept SHOULD split into two or more when it fails one or more of:

**Rule S1 — Independent assessability (primary test).** Can you construct,
or find in existing item banks, two items where a real learner is likely to
answer one correctly and the other incorrectly, independent of overall
subject strength? If yes, split. This is the operational form of the
KC-admission test and is directly checkable against this repo's own
`MistakeRecord`/probe-outcome evidence once populated — a candidate split
can be validated the same way Cognitive Tutor validates KC models: does the
split improve prediction of held-out performance (Learning Factors Analysis,
Cen, Koedinger & Junker 2006)?

**Rule S2 — Distinct misconception test.** Do the two sub-ideas have
different, non-overlapping common misconceptions? A single repair sequence
cannot productively address two unrelated wrong models at once; distinct
misconception libraries is strong evidence of distinct KCs.

**Rule S3 — Distinct prerequisite test.** Do the two sub-ideas require
different prerequisite sets (not merely different depths of the same
prerequisite)? Bundling them creates a false gating requirement: a learner
needing only sub-idea A would be incorrectly blocked by a prerequisite that
only sub-idea B actually needs.

**Rule S4 — Cognitive load ceiling (§4).** Would teaching the concept in one
coherent explanation require holding more than ~4 novel interacting elements
in working memory at once? If yes, split along the natural sub-idea
boundary.

**Rule S5 — Transfer dissociation test.** Does mastering sub-idea A fail to
reliably predict performance on sub-idea B in a different-but-related
context (poor near-transfer)? This is the KLI framework's own empirical
signature for a genuine KC boundary, and is the most rigorous test — it
requires real evidence, so it is the test to apply retrospectively (§14),
not necessarily at first-authoring time.

**Rule S6 — Concept/Skill tie-break (resolves CEKR §18).** When a candidate
node is "understood" (Concept) with no fluency/automaticity requirement,
keep it a Concept. When it is a **procedure the learner performs under a
fluency or timing gate**, model it as a `Skill` that `REALIZES` the parent
Concept (CEKR §2.1, Family S kind 2), not as a same-family sibling Concept.
This is CEKR's own proposed default, adopted here as binding guidance rather
than an open question, on the strength of the worked examples in §11.

---

## 6. Canonical Merge Rules

Formal rules — the precise negation of §5, plus two rules with no §5
counterpart:

**Rule M1 — No discriminating item exists.** If Rule S1 cannot be satisfied
— no realistic item, and none constructible, discriminates between the two
sub-ideas — merge. This is the direct empirical justification (Occam's
razor over model fit, matching how Additive Factors Model comparison
penalizes unjustified graph complexity).

**Rule M2 — Identical misconception set.** If A and B share an identical
misconception library with no A-only or B-only entries, that is evidence
for merging — but only when Rule M3 also holds (misconception overlap alone
is suggestive, not sufficient).

**Rule M3 — Full structural identity (the formal answer to the user's own
worked example).** Merge A and B when **all four** hold simultaneously:
identical prerequisite sets, identical misconception libraries, identical
assessment/probe families, and identical downstream `UNLOCKS` edges (nothing
depends on only A or only B). When all four hold, merging is
topology-preserving — no structural information is lost. When only some
hold, that is a signal for further investigation, not an automatic merge.

**Rule M4 — Naming/aliasing, not merging.** Sometimes two "concepts" are the
same KC under two different names or framings (this document's own worked
example: "inertia" and "Newton's First Law" — §11). This is not a
structural merge decision; it is recognizing they were never two things.
The correct fix is canonical-name/alias resolution (a `VARIANT_OF`-style
relationship or simple alias registry), not a topology change.

**Rule M5 — Resource-constrained merge (MUST be flagged as such).** A node
pair may fail Rules S1–S5 (i.e., genuinely deserve to be split by the
research) but be kept merged anyway for authoring-cost reasons at a given
KG maturity stage. This is a legitimate, explicit **decision**, not a
theoretical claim that they are one KC — and MUST be recorded as
`status: MERGED_FOR_NOW` (or equivalent), distinguishable from a true
Rule-M3 merge, specifically so a future audit (or the migration strategy in
§14) can find and prioritize these first. Biology's `bio.mol` domain
(`docs/biology/VALIDATION_REPORT.md`) is exactly this kind of decision,
self-documented with its own stated rationale — a good precedent for how to
record one, though it does not itself use this document's exact tagging
convention.

---

## 7. Canonical Prerequisite Rules

**Rule P1 — Necessity, not sequencing.** An edge `A REQUIRES B` MUST encode
strict necessity (B is not achievable without A), never mere curricular
convention (topics commonly *taught* before others for pacing reasons, with
no true dependency). Conflating the two is the single most common curriculum
KG defect in practice, and produces gates that block learners who don't
actually need the blocking prerequisite.

**Rule P2 — Minimal edge set (transitive reduction).** Do not add an edge if
it is already implied transitively through another listed prerequisite.
Redundant edges bloat the graph and complicate gating logic without adding
information — standard DAG-minimization practice, and consistent with this
repo's own KG validator already checking for cycles/broken references.

**Rule P3 — Cross-domain edges are expected, not exceptional.** A
prerequisite legitimately crosses subject boundaries (e.g., a Biology
membrane-transport Concept genuinely depending on a Chemistry
concentration-gradient Concept). This matches CEKR's `CROSS_LINK` edge kind
and this repo's existing `cross_links` field — do not force artificially
subject-siloed graphs.

**Rule P4 — Sparse over dense.** Prefer the fewest direct prerequisites that
cleanly capture true dependency. This follows Knowledge Space Theory
(Doignon & Falmagne, *Knowledge Spaces*, 1999): the formal "surmise
relation" over a knowledge space is both theoretically cleaner and more
tractable for adaptive sequencing algorithms when sparse; dense,
poorly-justified prerequisite graphs degrade interpretability and the
practical performance of any adaptive-sequencing algorithm built on top.

---

## 8. Canonical Mastery Rules

**Rule Ma1 — Per (learner, node), probabilistic not binary.** Mastery is a
continuous or probabilistic estimate per node, consistent with Bayesian/Deep
Knowledge Tracing's core design, and already the direction this repo's own
`ConceptMasteryRecord`/decay design (ADR 10) independently converged on.

**Rule Ma2 — Threshold scales with Bloom level.** A recall-level KC's
mastery bar can be set from accuracy on direct-recall items quickly; an
application/analysis-level KC requires demonstrated performance across
*varied* transfer contexts before mastery is claimed — directly consistent
with the KLI framework's near/far-transfer distinction, and with this
repo's own already-authored placement engine definition of `ANCHORED`
mastery (`AUTOMATIC + STABLE + one transfer event` — Educational Brain
Delivery 10) — a strong internal precedent that independently arrived at a
transfer-gated mastery bar.

**Rule Ma3 — Evidence-based, not exposure-based.** Mastery MUST NOT be
inferred from time-on-task or content-completion alone. This follows
directly from Deliberate Practice research (Ericsson, Krampe & Tesch-Römer
1993): repetition without effortful, feedback-driven correction does not
reliably produce skill growth, so a mastery claim must be earned through
assessed performance, never mere exposure.

---

## 9. Canonical Assessment Rules

**Rule As1 — Multiple items per node, varied surface form.** Guards against
false-positive mastery from pattern-matching/rote memorization rather than
genuine understanding (retrieval-practice / testing-effect literature,
Roediger & Karpicke 2006).

**Rule As2 — At least one near-transfer item per node.** Operationalizes the
KLI framework's transfer-based validation that a KC boundary is genuine
(§5 Rule S5) directly into the assessment design, not just the authoring
audit.

**Rule As3 — One primary node per item, incidental exercise of prerequisites
allowed and expected.** An item should be traceable to exactly one *primary*
node for clean diagnostic attribution, even though it may legitimately also
exercise prerequisite nodes (this is expected under Knowledge Space Theory's
cumulative structure) — the "primary" tag is what matters for correctly
attributing evidence in any downstream model-fitting.

---

## 10. Canonical Misconception Rules

**Rule Mc1 — Named, specific, plural.** A node's misconception library MUST
consist of distinct, named alternative conceptions, never a generic "this
concept is hard" flag. This follows the Conceptual Change framework
(Posner, Strike, Hewson & Gertzog 1982): productive conceptual change
requires a misconception to be surfaced as a specific, nameable alternative
model that can be directly confronted — a vague "hard concept" flag cannot
be repaired, only a named wrong model can.

**Rule Mc2 — Origin node vs. detection node may differ.** A misconception's
*origin* (where the wrong model is formed) and its *detection point* (where
it first becomes behaviorally visible) may be different nodes — this repo's
own Misconception Evolution Library (Educational Brain Delivery 13) already
formalizes this as a "metastasis chain," and this document's rules are
fully compatible with, and do not duplicate, that existing work. When
authoring a misconception, record both the origin node (`TARGETS`, per
CEKR) and, where distinct, the downstream detection trigger.

---

## 11. Worked Examples Across Subjects

Each example is evaluated against §5/§6's rules explicitly, not by
intuition alone.

**Physics — "Newton's Laws."** Should this be one node? Apply S1: can a
learner correctly state the First Law (inertia) while failing to apply
F=ma quantitatively? Trivially yes — a very common learner profile. Apply
S2: the First Law's classic misconception is the Aristotelian "an object
needs continued force to keep moving"; the Second Law's is "more force
always means more acceleration, regardless of mass" or a force/velocity
confusion; the Third Law's is "equal and opposite forces cancel and produce
no motion" — three distinct, well-documented misconception clusters,
independently validated by the Force Concept Inventory (Hestenes, Wells &
Swackhamer 1992), a psychometrically validated instrument built on exactly
this kind of item-level dissociation. Apply S3: the Second Law additionally
requires "mass as distinct from weight" and algebraic F=ma manipulation that
the First Law does not. **Verdict: split into First Law, Second Law, Third
Law — three nodes.**
- "Inertia" as a fourth node? Apply S1: can you meaningfully distinguish
  "understands inertia as a property of matter" from "can state/apply the
  First Law" in a real assessment? No — these are the same KC under two
  names. **Verdict: Rule M4 (alias), not a fourth node.**
- "Free Body Diagrams" as a node under Newton's Laws? Apply S1/S3: FBD
  construction is a representational/procedural skill — a learner can draw
  a correct FBD (mechanical, procedural) while still computing net force
  incorrectly from it (conceptual), a well-documented, independent source
  of error in physics-education research. It is also a genuinely
  cross-cutting skill used well beyond Newton's-Laws problems. **Verdict:
  its own node, modeled as a `Skill` per Rule S6 (a performed procedure
  under a fluency gate), with `REQUIRES`/usage edges into multiple
  downstream mechanics Concepts — not nested inside "Newton's Laws."**
- "Applications" (friction, inclined planes, pulleys) as one node? Apply
  S3/S4: each context typically introduces its own new element (a new
  equation or consideration) and its own characteristic errors. **Verdict:
  each becomes its own downstream node** (Friction, Inclined-Plane
  Dynamics, Pulley Systems/Atwood Machines), each listing the relevant
  Newton's-Law node(s) as prerequisites — not one "applications" blob.

**Biology — Photosynthesis.** Light-dependent reactions (thylakoid;
electron transport, water-splitting, ATP/NADPH) vs. the Calvin cycle
(stroma; CO2 fixation, RuBisCO, G3P): different location, different
inputs/outputs, and distinguishable misconceptions (a well-documented
finding that students often hold the slogan "light makes glucose from CO2
and water" while being unable to correctly localize or sequence either
sub-process independently). **Verdict: split into at least two mechanism
nodes**, with a foundational, deliberately shallow "Photosynthesis
Overview" orientation node as an entry point — mirroring this repo's own
existing `bio.found.what-is-biology` pattern (a low-depth anchor node
preceding mechanism nodes) rather than inventing a new pattern.

**Biology — Cellular Respiration.** Glycolysis, Pyruvate
Oxidation/Link Reaction, Krebs Cycle, Electron Transport Chain +
Oxidative Phosphorylation, and Fermentation/Anaerobic Respiration each have
distinct locations (cytoplasm vs. mitochondrial matrix vs. inner membrane),
distinct inputs/outputs, and distinct, separately-documented misconceptions
(e.g., conflating "most ATP comes from the ETC via chemiosmosis" with "most
ATP comes from glycolysis" is a specific, nameable, separately-diagnosable
error). **Verdict: at least five nodes**, not one.

**Mathematics — Quadratic Equations.** Solving by factoring, completing the
square, the quadratic formula, the discriminant/nature-of-roots, and
graphing (vertex form) are procedurally and diagnostically distinct: a
learner can be fluent with the quadratic formula while unable to factor, or
vice versa (Rule S1 applies cleanly). **Verdict: separate nodes** — and
notably, this is **already how this repository's own Mathematics KG is
authored** (`quadratic-equation`, `completing-the-square`,
`quadratic-formula`, `discriminant` already exist as separate concepts in
`docs/mathematics/kg/graph.json`'s `math.alg` domain). This is used in §12
as direct evidence that Mathematics is already close to the grain this
document derives from first principles — the rules were not fit to
Mathematics after the fact; Mathematics independently landed near the same
answer the rules produce, which is exactly the kind of convergent evidence
that increases confidence in the rules (§13).

**Chemistry — Chemical Bonding.** Ionic, covalent (further: polar vs.
nonpolar), metallic, and intermolecular forces (hydrogen bonding, van der
Waals, dipole-dipole) each have distinct, well-documented, non-overlapping
misconceptions (Rule S2) — e.g., "ionic bonds share electrons" is a specific
covalent-bonding misconception bleeding into ionic contexts, catalogued as a
discrete, nameable error in chemistry-education research (Nakhleh 1992,
*Journal of Chemical Education*) — and distinct prerequisites (ionic needs
electronegativity difference/ion formation; covalent needs orbital-overlap
concepts; metallic needs a delocalized-electron-sea model). **Verdict: at
least four nodes**, with molecular polarity/VSEPR geometry as a plausible
fifth (a genuinely distinguishable shape-prediction skill, not merely bond
classification).

**Biology/Genetics — Evolution.** Mechanisms (natural selection, genetic
drift, gene flow, mutation), evidence (fossil record, comparative
anatomy/homology, molecular evidence, biogeography), speciation
(allopatric/sympatric, reproductive isolation), and Hardy-Weinberg
population-genetics mathematics are each independently assessable with
independent misconceptions — e.g., the teleological "organisms evolve
traits because they need them" (Lamarckian) misconception is specific to
mechanism-understanding and fully dissociable from a learner who
understands mechanism but cannot read a phylogenetic tree (an
evidence/cladistics-specific skill). **Verdict: at least four node
clusters**, not one "Evolution" node.

**English — Grammar (a genuine merge example, not just splits).**
"Subject-verb agreement" is plausibly **one** node: apply S1 — it is hard to
construct realistic cases where a learner is independently right on
"singular subject → singular verb" and wrong on "plural subject → plural
verb" as dissociable skills; usually one symmetric underlying rule, one
error pattern. **But** "subject-verb agreement with an intervening phrase"
(the classic "the box of chocolates IS/ARE on the table" distractor-noun
error) is empirically a **separate, well-documented** error source in
grammar-instruction research — a learner fluent with simple agreement often
specifically fails this case. **Verdict: keep basic agreement as one node;
split out intervening-phrase agreement as a second node (or, at minimum, an
explicitly flagged misconception-bearing variant with its own probe
family).** This demonstrates the rules genuinely produce "don't split" as
often as "do split" — they are a test, not a bias toward decomposition.

**English — Reading Comprehension (a required split, not a judgment call).**
Reading-comprehension research (RAND Reading Study Group, *Reading for
Understanding*, 2002; Palincsar & Brown's reciprocal-teaching work) has
long established that comprehension is **not** a single unified skill:
literal recall, inference-making, main-idea identification,
vocabulary-in-context, author's-purpose/tone, text-structure recognition,
and summarization are empirically dissociable — a learner can be strong at
literal recall while weak at inference, a well-replicated finding. **Verdict:
split into these named sub-strategies at minimum**, matching how serious
reading curricula (including the Common Core reading standards) already
structure the domain. Word-level **vocabulary** is a separate scoping call:
per Rule S1/S4, individual vocabulary items generally should **not** become
individual KG Concepts at all — they are better modeled as a bulk
spaced-repetition item set (already this repo's own pattern for
`spacedRetrievalScheduler.ts`, which operates on concepts, not on
individual words) outside the conceptual KG proper.

---

## 12. Re-Estimated Concept Counts

Per instruction, these numbers are **derived from §4–§10's rules and
calibrated against external curriculum-objective counts as empirical
proxies**, not chosen as targets. Ranges, not points, because the rules
produce ranges (any two careful authors applying the same rules to the same
domain will disagree by some margin — that is expected, not a flaw).

| Subject | Current KG | Rule-derived estimate: school → intro-university scope | Rule-derived estimate: lifelong/expert scope (matching Mathematics' own precedent) | Note |
|---|---:|---:|---:|---|
| Mathematics | 908 | *(already at this scope)* | 800–1,200 | Current count is **plausibly already close to correct grain** — §11's worked example shows Mathematics independently split quadratics the way these rules derive from first principles. Recommend targeted local audit for outlier clusters, not a rebuild. |
| Physics | 216 | 200–350 | 600–900 | Plausible order-of-magnitude fit for the stated "school through university-introductory" scope, calibrated against AP Physics 1/2/C + IB Physics SL/HL's combined ~150–250 discrete objectives. §11's Newton's-Laws analysis is a worked example of exactly the kind of targeted audit needed to confirm actual current grain — not performed here (would require reading the live KG, outside this document's no-reverification scope for this turn). |
| Chemistry | 186 | 150–350 | 600–1,000+ | Same reasoning as Physics, calibrated against AP Chemistry's ~150–200 College-Board learning objectives and IB Chemistry SL/HL. §11's Bonding analysis is the template for a targeted audit. |
| Biology | 89 | 300–500 | 800–1,200+ | Already established in prior-turn analysis (retained here for completeness): current count is markedly below even the school-through-intro-undergraduate estimate. |
| English | 216 | 300–600 (excluding bulk vocabulary, per §11) | Not estimated — "lifelong" is a different kind of ceiling for a language subject (fluency, not topic coverage); out of scope for a single number | Lower confidence than the other four rows — not independently re-verified this session; flagged for the same kind of targeted audit as Physics/Chemistry, using the Grammar/Reading-Comprehension worked examples in §11 as the template. |

**Explicitly not done:** rounding any of these to a "nice" target number,
and not asserting any of these as a mandate — per instruction, they are
**derived estimates for calibration**, to be checked against the actual
current graphs (a task this document deliberately does not perform, since
verifying the current repository was out of scope for this turn).

---

## 13. Confidence Ledger

Per instruction, every recommendation is tagged. This section is the index;
inline citations above carry the same tags implicitly.

**Established research (high confidence — replicated, or a validated
instrument/model exists):**
- The Knowledge Component / KLI framework definition (§1, §2) — Koedinger,
  Corbett & Perfetti 2012.
- Bayesian Knowledge Tracing's per-skill mathematical structure (§3, §8) —
  Corbett & Anderson 1995.
- Cognitive Load Theory's working-memory ceiling for novel material (§4) —
  Sweller 1988/2011; Cowan 2001 refinement.
- The testing-effect / retrieval-practice literature (§9) — Roediger &
  Karpicke 2006.
- Conceptual Change's "named alternative model" requirement (§10) — Posner,
  Strike, Hewson & Gertzog 1982.
- Deliberate Practice's evidence-over-exposure requirement (§8) — Ericsson,
  Krampe & Tesch-Römer 1993.
- The Force Concept Inventory as validated evidence for the Newton's-Laws
  split (§11) — Hestenes, Wells & Swackhamer 1992.
- Reading comprehension's multi-strategy dissociability (§11) — RAND
  Reading Study Group 2002; supported by decades of subsequent
  reading-research replication.
- Knowledge Space Theory's sparse-prerequisite-graph tractability argument
  (§7) — Doignon & Falmagne 1999.

**Expert consensus / widely-adopted production practice (medium-high
confidence — convergent across independent systems, less individually
"proven" as a controlled-study result):**
- Cognitive Tutor / Carnegie Learning's practical KC-grain choices in
  deployed systems, and the Learning Factors Analysis model-comparison
  methodology used to refine them (§5 Rule S1).
- AP/IB curriculum-framework objective grain as a reasonable, if imperfect,
  proxy for real KC boundaries (§1, §12) — refined against real exam data
  over years, but not itself a controlled cognitive-science study.
- The general practice among mature adaptive-learning systems (Khan
  Academy's skill graph, ALEKS's knowledge-space-based item bank) of
  hundreds-to-low-thousands of skills per subject.
- This document's own Concept/Skill tie-break rule (§5 Rule S6) — CEKR's
  proposed default, adopted here, not independently re-derived from a
  separate study.

**Informed estimate (explicitly lower confidence — this document's own
extrapolation, not a measured fact):**
- All specific numeric ranges in §12 — reasoned from anchor points
  (published curriculum objective counts), genuinely uncertain, and
  explicitly NOT targets.
- The claim that Physics/Chemistry/English are similarly undercounted to
  Biology — plausible by the same reasoning that produced the Biology
  finding, but **not independently re-verified this session** for those
  three subjects the way Biology was (this session read Biology's KG and
  validation report directly; it did not re-read Physics/Chemistry/English
  KGs for this specific granularity question).
- The precise domain-by-domain split recommendations in §11 beyond the
  worked examples explicitly reasoned through (i.e., generalizing "split
  Newton's Laws into three" to "every physics topic needs roughly this much
  splitting" is an extrapolation, not a claim independently checked topic
  by topic).

---

## 14. Migration Strategy — Refining a Coarse Graph Without Breakage

**Principle 1 — Splits preserve the parent id as a resolvable supernode,
never delete-and-replace.** When node X splits into X1, X2, X3, X remains
resolvable (as a non-terminal cluster reference), so any existing reference
to X — `TopicProgress` rows, `MistakeRecord` entries,
`contextSnapshot.currentConceptNodeId`, learner evidence history — does not
silently break. New prerequisite edges from other nodes point at the
specific child actually needed, determined by re-applying Rule S3
retroactively; where the specific child cannot be determined from source
material, the conservative default is "requires ALL children of X" — a
split MUST NOT loosen an existing prerequisite requirement, only preserve or
tighten it.

**Principle 2 — Downstream (`UNLOCKS`) edges migrate before upstream
(`REQUIRES`) edges.** Splitting a node is more disruptive to what depends ON
it than to what it depends on. For each existing downstream dependent,
determine (via Rule S3, applied retroactively) whether it truly needed all
sub-parts or only one.

**Principle 3 — Never silently merge or discard learner evidence.** If real
learners already have separate mastery/evidence history for two nodes that
the canonical rules say should merge (§6), the migration requires an
explicit reconciliation policy — e.g., the more conservative (lower)
mastery estimate wins, or both historical records are retained and only
future evidence is pooled. Never silently overwrite or average away real
evidence; this follows directly from this repo's own Evidence Architecture
principle that decisions must be evidenced and honest measurement beats
inflated sample size (matching CEKR §13's `evidenceCompatible` rev-skew
rule, which makes the identical choice for revision-level pooling).

**Principle 4 — Version, never overwrite.** A re-grained graph is a new
major KG version, requiring the same freeze-and-approval discipline as any
other canonical KG change (matching this repo's existing `version`/
`status: frozen` governance), shipped with an explicit old-id →
new-id(s) compatibility map — the same discipline a database schema
migration ships an up/down script.

**Principle 5 — Stage rollout by domain, evidence-first.** Re-grain one
domain at a time (start with the domain most clearly too coarse by an
initial audit — e.g., Biology's Human Physiology per this document's own
findings), validate the new sub-nodes against real usage/evidence data for a
period, THEN proceed. This is not merely a risk-mitigation convenience — it
is methodologically required by Rule S5 (the transfer-dissociation test),
which can only be checked against real evidence, meaning the granularity
rules themselves should be expected to be refined by what the first
domain's re-grain reveals. A single big-bang rewrite forfeits this feedback
loop entirely.

**Principle 6 — Automated detection, human-approved execution.** Rules
S1–S5/M1–M5 can partly be automated as a *candidate-flagging* pass (e.g.,
flag nodes whose existing `MistakeRecord`/probe-outcome evidence already
shows two distinct error clusters — a live signature of a Rule-S1 split
candidate; flag nodes whose `estimated_hours` or description length is a
statistical outlier versus domain siblings, as a coarse proxy for bundling).
Actual splitting/merging of canonical curriculum content remains
Curriculum-Production-Pipeline/human-authored territory per this
repository's standing governance — this document supplies the rulebook a
human author or reviewer applies, not an auto-execution mechanism.

---

## 15. Risks and Unresolved Questions

- **Authoring cost.** Finer granularity multiplies authoring surface area
  (more nodes each needing their own misconception library, assessment
  items, explanations). This is the direct cost side of Rule M5's
  resource-constrained-merge escape valve — the rulebook does not pretend
  this cost is free, only that it should be an explicit, tagged decision
  rather than an unexamined default.
- **Rule S5 requires evidence this repository does not yet have at scale.**
  The most rigorous split test (transfer dissociation) can only be checked
  against real learner performance data. Until evidence volume is
  sufficient, Rules S1–S4 (assessability, misconceptions, prerequisites,
  cognitive load) are the practically applicable tests; S5 becomes a
  retrospective validator once evidence accumulates (directly consistent
  with the "production learning data" gate this project's own governance
  has already invoked for several other engineering decisions this
  session).
- **Grain consistency across independently-authored subjects.** Without a
  shared reviewer or automated check, different subject authors may apply
  these rules with different strictness (exactly what appears to have
  happened between Mathematics — closer to this document's derived grain —
  and Biology/Physics/Chemistry/English, which were not verified this
  session). A cross-subject consistency audit is a natural, low-risk next
  step this document recommends but does not perform.
- **Where this document is silent, defer to CEKR.** This document governs
  *sizing*; CEKR governs *representation*. Any apparent conflict should be
  read as this document constraining a choice CEKR left open (e.g., §5 Rule
  S6 resolves CEKR §18's open question), never as amending CEKR's frozen
  design laws (K1–K8) or entity/edge model.

---

*End of specification v1.0.0. Research and rulebook only — no KG content,
schema, or runtime changes. Adoption, any KG rebuild, and any subject
re-grain remain owner decisions under the standing G1/G2 governance rules.*
