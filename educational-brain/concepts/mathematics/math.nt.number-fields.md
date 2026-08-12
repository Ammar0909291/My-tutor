# math.nt.number-fields

## Identity
- **KG ID**: `math.nt.number-fields`
- **Domain**: math.nt (Number Theory)
- **Requires**:
  - `math.nt.algebraic-integers` — load-bearing part: the monic-polynomial definition and the norm/trace machinery. 𝒪_K is assembled here out of exactly those elements.
  - `math.abst.field-extension` — load-bearing part: degree [K:ℚ] as a vector-space dimension, and the minimal polynomial as the object whose degree it equals.
- **Unlocks**: none in the KG
- **Cross-links**: `math.abst.galois-theory` (not yet authored in this corpus)
- **Difficulty**: research
- **Bloom level**: analyze
- **Mastery threshold**: 0.55 (⌈0.55×5⌉ = 3/5)
- **Estimated hours**: 30
- **Blueprint**: `docs/curriculum/blueprints/math.nt.number-fields.md` (reused by reference throughout)

## Learning Objective
- The learner can define a number field as a finite-degree extension of ℚ, construct K = ℚ(α) ≅ ℚ[x]/(f), and identify [K:ℚ] as deg f.
- The learner can identify 𝒪_K for quadratic fields, including the D ≡ 1 (mod 4) half-integer case, and can use the discriminant to detect when 𝒪_K ⊋ ℤ[α].
- The learner can classify a rational prime's behaviour in 𝒪_K as split, inert, or ramified, and can compute it from the factorisation of f mod p.
- The learner can define Gal(K/ℚ) for a Galois extension and state the fundamental theorem of Galois theory as a correspondence between subfields and subgroups.

## Core Understanding
A number field is not any field: it is a field K with ℚ ⊆ K and [K:ℚ] finite. Both conditions do work. Characteristic 0 is forced by containing ℚ, which excludes 𝔽_p; finite degree excludes ℝ, ℂ, and ℚ̄. Every such K is ℚ(α) for a single α (primitive element theorem over ℚ), so K ≅ ℚ[x]/(f) with f the minimal polynomial and [K:ℚ] = deg f, and every element is a ℚ-combination of 1, α, …, αⁿ⁻¹. Inside K sits 𝒪_K, and for quadratic fields it is *not* always ℤ[√D]: when D ≡ 1 (mod 4) the ring of integers is ℤ[(1 + √D)/2], and the discriminant detects the difference — disc(ℤ[α]) = f² · disc(K) with index f > 1 exactly when ℤ[α] is too small. The arithmetic that makes the subject move is prime splitting: a rational prime p, viewed in 𝒪_K, may split into distinct prime ideals, stay inert as one, or ramify with repeated factors, and Kummer's theorem says the pattern is read directly off the factorisation of f mod p (for p ∤ disc(K)). For ℚ(√D) this reduces to whether D is a quadratic residue mod p — a Legendre symbol — which depends on both D and p, and quadratic reciprocity is what makes it computable. Finally, when K/ℚ is normal and separable, Gal(K/ℚ) is defined and its subgroups correspond order-reversingly to K's intermediate subfields.

## Mental Models
1. **Beginner — ℚ with a root thrown in.** ℚ(√2) is ℚ plus √2 and whatever you can build from them. *Upgrade trigger*: asking how *many* things that is. *Shelf life*: fine until degree matters, then insufficient.
2. **Intermediate — a finite-dimensional ℚ-vector space that happens to multiply.** K has a basis 1, α, …, αⁿ⁻¹, and n is the degree. *Upgrade trigger*: needing to know 𝒪_K, which the vector-space picture does not determine. This is the model that makes [K:ℚ] and the minimal polynomial one idea rather than two.
3. **Advanced — a field with an arithmetic.** K carries 𝒪_K, and primes of ℤ behave differently once inside it: some break apart, some do not, a few collapse. *Upgrade trigger*: asking which primes do which, which is Kummer's theorem. This is where the concept becomes number theory rather than algebra.
4. **Expert — the symmetry dictionary.** Gal(K/ℚ)'s subgroup lattice *is* K's subfield lattice, upside down, and splitting behaviour is Galois-theoretic. *Shelf life*: install as orientation; the full correspondence belongs to `math.abst.galois-theory`.

## Why Students Fail
The word "field" is the first problem. The learner has met fields abstractly and correctly, and "number field" reads as "a field, of numbers" — a description, not a definition with two binding constraints. Neither constraint is audible in the name, so 𝔽_p, ℝ, and ℚ̄ all get admitted, and ℚ̄ in particular is admitted by learners who are otherwise careful, because it is algebraic and it is a field and its infinite degree is not something the name prompts them to check. The second failure is that splitting is first taught through the Gaussian integers, where the rule (p splits iff p ≡ 1 mod 4) is memorable, clean, and *specific to ℤ[i]* — and it is the only splitting rule most learners can state, so it becomes the splitting rule. The third is that every Galois group in a first course is abelian, for the good reason that cyclotomic and quadratic examples are the computable ones, and the learner generalises from a sample selected for tractability.

## Misconceptions
Reused by reference from the Blueprint's misconception registry and its TB-R repair actions; birth types as classified there.

- **MC-1 — NUMBER-FIELDS-ARE-JUST-FIELDS** (foundational)
  - **Birth type**: Type 3, language contamination. "Field" is already a term the learner owns, and "number" reads as an informal qualifier rather than as shorthand for "finite extension of ℚ". The two actual constraints are invisible in the phrase.
  - **Characteristic phrase**: "𝔽₇ is a number field — its elements are numbers."
  - **Detection probe** (verbatim): "Which of these are number fields: ℚ(√2), 𝔽₇, ℝ, ℚ̄?"
  - **Repair**: Blueprint TB-R01. Run all four against the two conditions explicitly. 𝔽₇ fails on containing ℚ; ℝ and ℂ fail on finite degree; ℚ̄ fails on finite degree too, and *that* is the instructive one — [ℚ(2^{1/n}):ℚ] = n grows without bound, so the algebraic closure is an infinite-degree extension despite every element being algebraic. Learners who get the first three right often miss ℚ̄.
  - **Verification of death**: given a novel field, the learner states both conditions and checks each, rather than judging by appearance.

- **MC-2 — ALL-PRIMES-SPLIT-THE-SAME-WAY** (high)
  - **Birth type**: Type 1, overgeneralisation. The Gaussian-integer rule is correct, memorable, and the only instance in the sample. Nothing in how it is taught marks it as field-specific.
  - **Characteristic phrase**: "p splits if p ≡ 1 mod 4" — offered for a field that is not ℚ(i).
  - **Detection probe**: "Does 5 split in ℚ(√3)? Use the rule you know."
  - **Repair**: Blueprint TB-R02. Kummer's theorem is the general statement and it makes the field-dependence structural rather than anecdotal: factor f mod p. For ℚ(√D), f = x² − D, so the question is whether D is a QR mod p — a Legendre symbol (D/p) depending on *both* arguments. Change D, change the law. Then quadratic reciprocity, which reveals that the law depends only on p mod 4D, i.e. the splitting is governed by congruence conditions — the first instance of class field theory, and worth naming as such.
  - **Verification of death**: the learner computes splitting in a field they have not seen before, starting from f mod p rather than from a remembered rule.

- **MC-3 — GALOIS-GROUP-EQUALS-CYCLIC-GROUP** (moderate)
  - **Birth type**: Type 5, instruction-induced. Quadratic (ℤ/2), cyclotomic (abelian by Kronecker–Weber), and the tractable cubics are the only examples in a first pass; the smallest non-abelian instance needs the degree-6 splitting field of x³ − 2.
  - **Characteristic phrase**: "Galois groups are cyclic, aren't they?"
  - **Detection probe**: "What is Gal of the splitting field of x³ − 2 over ℚ?"  (S₃, order 6.)
  - **Repair**: Blueprint TB-R03. Give the catalogue by group type — ℤ/2 from ℚ(√2), ℤ/3 from the cubic subfield of ℚ(ζ₇), ℤ/4 from ℚ(ζ₅), (ℤ/2)² from ℚ(√2, √3), S₃ from x³ − 2, A₄ from x⁴ − x − 1, S₄ generically — and *explain the sampling bias*: abelian extensions of ℚ are exactly the subfields of cyclotomic fields (Kronecker–Weber), which are the natural explicit examples, so the first examples are abelian by construction, not by nature.
  - **Verification of death**: the learner names a non-abelian Galois group over ℚ and its polynomial, unprompted.

## Analogies
- **Best — the two-condition passport check.** ℚ inside, finite degree — both stamps required. Deliberately bureaucratic: MC-1 is a failure to *check*, and the analogy's whole job is to make checking feel obligatory.
- **Alternative — primes as rocks and 𝒪_K as a hammer of a particular hardness.** The same rock shatters in one ring, holds in another, and crumbles in a third; splitting is a property of the pair, never of the rock alone. This is the cleanest carrier of MC-2's correction, because it puts the field into the sentence.
- **Story analogy** — Kummer–Dedekind and the discovery that ideals, not elements, are the right primes. Continuity with `math.nt.algebraic-number-theory`'s story, and it explains why splitting is phrased in ideals at all.
- **ANTI-ANALOGY — "a number field is a field whose elements are numbers."** This is MC-1 verbatim, and it is what the name says. It must be pre-empted rather than answered, because once offered it sounds like a definition.
- **ANTI-ANALOGY — "primes either split or they don't."** Erases ramification, which is a third behaviour and precisely the one tied to the discriminant.

## Demonstrations
- **The four-field admission test.** ℚ(√2), 𝔽₇, ℝ, ℚ̄, judged against both conditions. *Elicit predictions first, in writing, all four.* ℚ̄ is the diagnostic item and the predictions on it are worth recording separately.
- **The ℚ(√5) discriminant check.** disc(ℤ[√5]) = 20, disc(K) = 5, index 2 — so 𝒪_K = ℤ[(1 + √5)/2] and the golden ratio is inside. *Predict first*: "is 𝒪_K = ℤ[√5]?" This is the same demonstration as `math.nt.algebraic-integers`' MC-3 probe, deliberately reused rather than re-derived; if that entry has already been taught, cite it and move on.
- **Splitting in three fields.** Take p = 5 and run it through ℚ(i), ℚ(√3), ℚ(√5) via f mod 5. Three different outcomes from one prime. *Predict first*: "same prime — will it behave the same way each time?" MC-2 dies here or not at all.
- **The x³ − 2 splitting field.** Degree 6, group S₃, with ℚ(∛2) as a non-normal intermediate field. *Predict first*: "the polynomial has degree 3 — what degree do you expect the splitting field to have?"

## Discovery Questions
**Mixed, and the boundary should be stated to the learner.** LO3 is genuinely discoverable and is the concept's centre of gravity; LO1 is a definition and LO4 is a report on a theory that belongs to another node.
1. **Need** (LO3): "Here is 5. In ℤ it is prime. Is it still prime in ℤ[i]?" — the learner finds 5 = (2 + i)(2 − i) and the question becomes urgent.
2. **Playground**: try 2, 3, 5, 7, 11, 13 in ℤ[i]. A pattern appears: 1 mod 4 splits, 3 mod 4 does not, 2 is odd one out.
3. **Invention**: "State the rule." The learner states the Gaussian rule — correctly, and this is the moment MC-2 is *created* if the lesson stops here.
4. **Collision**: "Now try 5 in ℤ[√3]." The rule fails. The learner has just built a false generalisation and watched it break, which is far stronger than being warned.
5. **Formalisation**: Kummer — factor f mod p. Re-derive the Gaussian rule as the special case f = x² + 1, and the ℚ(√3) case as f = x² − 3.
6. **Compression**: "Splitting is a property of the prime *and* the field. Factor the defining polynomial mod p."
Step 3 is deliberately allowed to produce the misconception. It is the cheapest inoculation available, and it only works if step 4 follows in the same session. LO1's definition and LO4's Galois correspondence are **direct instruction**, labelled as such.

## Teaching Sequence
The Blueprint's teaching-action components own the turn-level scripts. Three constraints matter. First, **the two admission conditions must be checked against non-examples before any number field is constructed** — MC-1 is a checking failure, and constructing ℚ(√2) first supplies a positive example that makes checking feel unnecessary. ℚ̄ must be among the non-examples; without it the test is passed by learners who are only screening on "does it look like ℚ". Second, **the discovery sequence above must not be split across sessions.** Step 3 manufactures MC-2 deliberately, and a learner who leaves the session between steps 3 and 4 has been actively taught a false rule. If time is short, run steps 1–2 and 5 and skip the invention rather than orphaning it. Third, **𝒪_K's construction must precede splitting**, since splitting is a statement about ideals of 𝒪_K, and the D ≡ 1 (mod 4) case must appear there rather than being discovered as an anomaly during a splitting computation.

## Tutor Actions
- **TEST-THINKING: Prediction** — the four-field admission test, in writing, before anything is taught. First action; it is the diagnostic and the motivation at once.
- **DO: Demonstration** — 5 in three different quadratic fields.
- **TEST-THINKING: Error Analysis** — the deliberately over-general Gaussian rule, applied to ℚ(√3) and watched to fail. Per the stability guard this is safe only because the correct general rule (Kummer) follows immediately; planting the flawed rule with no repair in the same session would teach it.
- **ORGANIZE: Representation Table** — prime × field → split / inert / ramified, filled in jointly. This is the artefact that makes the two-argument dependence visible.
- **ORGANIZE: Concept Map** — the Galois correspondence, subgroups against subfields, order-reversed.
- **Does NOT fit: Drill on the Gaussian rule.** It would automate the special case the concept exists to generalise.

## Voice Teaching Notes
The load-bearing sentence is "splitting depends on the prime *and* the field." Stress the *and*; the sentence is short and the stress is the content. Listen for the learner asking "does 7 split?" with no field named — the missing prepositional phrase is the audible form of MC-2 and it appears in ordinary conversation long before any wrong computation. Listen also for "number field" used interchangeably with "field" in the learner's own speech, which is MC-1 before it produces an error. The vocabulary here is heavy — inert, ramified, split, disc, Gal — and *inert* in particular is a word learners avoid saying, which is a reliable marker that the trichotomy has collapsed into a dichotomy in their model; ask them to name all three behaviours aloud rather than accepting "splits or doesn't". Channel reality is owned by `../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals
- **ℚ̄ admitted as a number field** — MC-1's diagnostic case, and it is missed by learners who correctly reject 𝔽₇ and ℝ. A probe without ℚ̄ in it will read as a pass.
- **Correct splitting in ℚ(i), wrong elsewhere** — MC-2, and it is fast and confident because the rule has always worked. Dangerous quadrant; route to the three-field demonstration, not to more Gaussian examples.
- **Correct splitting computed from f mod p, slowly** — the general method is installed and not yet fluent. FRAGILE but exactly right; consolidate with two more fields rather than advancing.
- **𝒪_K stated as ℤ[√D] for D ≡ 1 mod 4** — the discriminant check was skipped. Note this is the same failure as `math.nt.algebraic-integers`' MC-3; if it has already been repaired there, this is a regrowth and the repair path should be redesigned rather than repeated.
- **"Galois groups are cyclic"** — MC-3, and it will not surface at all unless a non-abelian example is in the probe set.
- **Mastery trigger**: the Blueprint's gate at MAMR 3/5, with the added requirement that one splitting item use a field not seen during teaching.

## Tutor Recovery Strategy
The likely utterance is "there's too much notation" — accurate; this node stacks [K:ℚ], 𝒪_K, disc(K), Gal(K/ℚ), Legendre symbols and ideal factorisations, and the load is genuinely the highest in the `math.nt` domain. The concept-specific smaller question drops to one concrete arithmetic fact: **"Just this: 5 = (2 + i)(2 − i). Multiply it out and check."** One multiplication, no vocabulary, and it re-establishes that primes really do behave differently inside a bigger ring — which is the concept's only irreducible idea. Rebuild from there: one more prime, then a second field, then the word "splits", then the general rule. Introduce no symbol until the thing it names has been computed twice. Generic machinery is owned by `../foundations/01-recovery-engine.md`.

## Memory Hooks
- Concept type: **concept** (the definition, the Galois correspondence) fused with **procedure** (compute 𝒪_K; factor f mod p to get splitting). Review both; the procedure decays slowly and the two admission conditions decay fast.
- Concept-specific deviation: MC-2 regrows whenever the learner works in a single field for an extended period, because within one field the rule genuinely is fixed. Re-probes must always cross fields; a same-field re-probe cannot detect it.
- Interleaving partners: `math.nt.algebraic-integers` (shared discriminant material — interleave rather than re-teach), `math.abst.field-extension` (degree), and `math.nt.congruence` (the Legendre-symbol machinery is congruence arithmetic and treating it as new here doubles the load unnecessarily).

## Transfer Connections
- **Near**: `math.nt.algebraic-number-theory`'s class group, which is the next question once 𝒪_K and its ideals exist.
- **Far**: the general lesson that an object's behaviour is a property of the *pair* (object, ambient structure) — irreducibility over ℚ versus over ℝ versus over ℂ is the same lesson met earlier and rarely generalised.
- **Real-world**: none direct at this level; the splitting laws feed elliptic-curve and lattice cryptography downstream, which is real but two nodes away and should not be oversold here.
- **Expert transfer**: reading a congruence condition as a statement about *which extension* a prime splits in — the class-field-theory reflex, and the most valuable single habit this concept can install.

## Cross-Subject Connections
- The KG lists `math.abst.galois-theory` as a cross-link; unauthored in this corpus, so no probe can be built against it yet. The connection is load-bearing rather than lateral — LO4 is Galois theory, borrowed.
- **Computer science**, genuine: number fields are the working representation in the number field sieve, the fastest known classical factoring algorithm, so the splitting behaviour of primes in 𝒪_K is directly what makes RSA key sizes what they are. This is a real and teachable link and the KG does not encode it.
- No genuine connection to physics, chemistry, biology, or English.

## Blueprint References
`docs/curriculum/blueprints/math.nt.number-fields.md`. Reused by reference, not restated: the misconception registry with its birth-type column, the TB-R01/TB-R02/TB-R03 three-step repair scripts (including the four-field admission test, Kummer's theorem with the quadratic-reciprocity consequence, and the Galois-group catalogue by group type), the learning-objective statement, and the mastery gate item set. This entry adds the mental-model ladder, the two anti-analogies, the deliberate misconception-inoculation staging at discovery step 3 with its explicit same-session constraint, the finding that MC-2 is undetectable by same-field re-probes, the overlap ruling with `math.nt.algebraic-integers`' discriminant material, and the recovery shrink-question.

## Runtime Asset References
No seeded `AssetIdentity` records exist for this concept. None were created here.

## Curriculum Feedback
Third and final record of the dependency-direction finding for this cluster. `math.nt.number-fields` requires `math.nt.algebraic-integers`, which requires `math.nt.algebraic-number-theory`, which itself opens by defining number fields and their rings of integers — so the chain's prerequisites run opposite to its logical build order, and a learner following the KG's edges meets the synthesis before either component. The three Blueprints each compensate in prose, which is why the problem is invisible from inside any one of them. Recorded for the Curriculum Production Pipeline as a single cluster-level finding rather than three separate ones; not fixed here. Separately, the `math.nt` domain reaches 36/36 with this entry.

## Version History
- v1.0 (2026-08-12): Initial authoring. Domain Certification Mode, math.nt tail batch (Phase 1, batch 1) — completes the math.nt domain at 36/36.
