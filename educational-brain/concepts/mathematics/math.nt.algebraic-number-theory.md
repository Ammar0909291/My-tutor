# math.nt.algebraic-number-theory

## Identity
- **KG ID**: `math.nt.algebraic-number-theory`
- **Domain**: math.nt (Number Theory)
- **Requires**:
  - `math.nt.general-diophantine` — load-bearing part: the habit of asking whether an equation has *integer* solutions, and the experience of that question being hard. Algebraic number theory is largely the machinery built to answer such questions by enlarging what "integer" means.
  - `math.abst.ring-theory` — load-bearing part: ideals, quotients, and the notion of a ring failing to have a property ℤ has. Specifically the learner must already accept that "ideal" is a first-class object, not a bookkeeping device.
- **Unlocks**: `math.nt.algebraic-integers`
- **Cross-links**: `math.abst.galois-theory` (not yet authored in this corpus)
- **Difficulty**: research
- **Bloom level**: analyze
- **Mastery threshold**: 0.6 (⌈0.6×5⌉ = 3/5)
- **Estimated hours**: 60
- **Blueprint**: `docs/curriculum/blueprints/math.nt.algebraic-number-theory.md` (reused by reference throughout)

## Learning Objective
- The learner can define a number field K = ℚ(α) as a finite extension of ℚ of degree [K:ℚ] = n, and identify 𝒪_K as the subring of algebraic integers in K.
- The learner can state that 𝒪_K is a Dedekind domain, exhibit a ring of integers that is *not* a UFD (ℤ[√−5]), and explain how unique factorisation of *ideals* restores what element factorisation lost.
- The learner can define the ideal class group Cl(K) and the class number h_K, and say what h_K = 1 means.
- The learner can state Minkowski's bound and explain, at orientation level, the class-number connection to Fermat's Last Theorem for regular primes.

## Core Understanding
The subject exists because the Fundamental Theorem of Arithmetic is a fact about ℤ, not a law of nature. Extend ℚ by a root of a polynomial and you get a number field K; inside it sits 𝒪_K, the ring of its algebraic integers, playing the role ℤ plays in ℚ. But 𝒪_K need not be a UFD: in ℤ[√−5], 6 = 2 × 3 = (1 + √−5)(1 − √−5), two genuinely distinct factorisations into irreducibles, and the culprit is that irreducible no longer implies prime. Kummer's repair does not force elements to behave; it changes the objects being factored. Every nonzero *ideal* of 𝒪_K factors uniquely into prime ideals — always, in every 𝒪_K — so unique factorisation is not lost but relocated one level up. The ideal class group Cl(K) is the quotient of fractional ideals by the principal ones, and it measures precisely how far the ring is from having every ideal principal; its order h_K is the class number, and h_K = 1 is exactly the UFD condition. Minkowski's bound makes h_K computable by restricting the search for non-principal classes to ideals of bounded norm. The payoff is not decorative: Kummer proved Fermat's Last Theorem for regular primes — those not dividing the class number of the corresponding cyclotomic field — and the class number is the obstruction in exactly the way this framework predicts.

## Mental Models
1. **Beginner — a bigger ℤ.** 𝒪_K is "the integers of K", built the same way and behaving the same way. *Upgrade trigger*: meeting ℤ[√−5] and finding two factorisations. *Shelf life*: short and deliberately so — this model exists to be broken, and the breaking is the lesson.
2. **Intermediate — factorisation moved up a level.** Elements misbehave; ideals do not. Factor ideals instead. *Upgrade trigger*: asking how badly the elements misbehave, which has a numerical answer. This is the concept's central model.
3. **Advanced — the class group as a measurement.** Cl(K) is an instrument reading the *amount* of failure, not a collection of ideals. h_K = 1 means no failure; h_K = 2 for ℤ[√−5] means one non-principal class, and P² = (2) shows the failure is finite and structured. *Upgrade trigger*: asking whether h_K can be computed — Minkowski says yes.
4. **Expert — the class number as an obstruction.** Whenever a naive argument over ℤ fails to generalise to 𝒪_K, the class number is usually what is in the way; Kummer's regular primes are the canonical instance. *Shelf life*: install as orientation; this is the model that makes the subject feel like a subject rather than a list.

## Why Students Fail
The learner arrives with unique factorisation not as a theorem but as a fact about numbers — it was taught in primary school, called *fundamental*, and never once qualified. Nothing in that history flags it as contingent on the ring. So when 𝒪_K fails to be a UFD, the learner's first response is to suspect the example rather than the belief, and they will look for an error in the ℤ[√−5] computation for some time before accepting it. The second failure is that "class group" is transparently misleading language: both words suggest a collection being counted, and the actual object — equivalence classes of fractional ideals under principal equivalence — is abstract enough that the misleading reading is easier to hold. The third is that early examples systematically confirm 𝒪_K = ℤ[α]; ℚ(√2) and ℚ(i) both cooperate, and the learner generalises from a sample chosen for its convenience.

## Misconceptions
Reused by reference from the Blueprint's misconception registry and its TB-R repair actions; birth types as classified there, restated here with the diagnostic material this entry adds.

- **MC-1 — ALL-RINGS-OF-INTEGERS-ARE-UFDS** (foundational)
  - **Birth type**: Type 5, instruction-induced. ℤ is the canonical number ring and it *is* a UFD; the Fundamental Theorem of Arithmetic is taught as universal, with no ring named as its domain of validity. The learner was never told a condition, so they hold none.
  - **Characteristic phrase**: "but factorisation is unique — that's the fundamental theorem."
  - **Detection probe** (verbatim): "In ℤ[√−5], is 6 = 2 × 3 the only factorisation into irreducibles?"
  - **Repair**: Blueprint TB-R01. The norm argument is what makes it undeniable: N(a + b√−5) = a² + 5b², so N(2) = 4, and 4 = (a² + 5b²)(c² + 5d²) has no factorisation with both factors > 1 because a² + 5b² = 2 has no integer solution. 2 is therefore irreducible — and yet 2 divides (1 + √−5)(1 − √−5) while dividing neither factor, so it is not prime. Irreducible ≠ prime is the precise breakage, and the norm makes it arithmetic rather than assertion.
  - **Verification of death**: the learner states the UFD condition *with its ring* attached, and can say what h_K has to be for it to hold.

- **MC-2 — IDEAL-CLASS-GROUP-MEASURES-HOW-MANY-IDEALS-THERE-ARE** (high)
  - **Birth type**: Type 3, language contamination. "Class" suggests a category of things; "group" suggests a collection; together they read as "the group of classes of ideals", i.e. a count of ideals. The actual referent — a quotient measuring failure of principality — is invisible in the name.
  - **Characteristic phrase**: "so h_K is how many ideals there are."
  - **Detection probe**: "ℤ[√−5] has h_K = 2. Does that mean it has two ideals?"
  - **Repair**: Blueprint TB-R02. Two moves. First, the definition as a quotient: I ∼ J when αI = βJ, so the class group forgets everything a principal factor can change. Second, the concrete instance: P = (2, 1 + √−5) is not principal, but P² = (2) is — one non-principal class, order 2, and the ring has infinitely many ideals throughout. Showing an ideal that is not principal *and* whose square is settles both halves at once.
  - **Verification of death**: the learner explains what h_K = 1 means without using the word "count".

- **MC-3 — ALGEBRAIC-INTEGERS-IN-K-ARE-JUST-INTEGER-LINEAR-COMBINATIONS-OF-BASIS** (moderate)
  - **Birth type**: Type 5, instruction-induced by example selection. ℚ(√2) gives 𝒪_K = ℤ[√2]; ℚ(i) gives ℤ[i]. Both first examples confirm the rule, and the learner has no reason to doubt it.
  - **Characteristic phrase**: "𝒪_K is just ℤ adjoin alpha."
  - **Detection probe**: "For K = ℚ(√5), is 𝒪_K = ℤ[√5]?"
  - **Repair**: Blueprint TB-R03. The golden ratio (1 + √5)/2 satisfies x² − x − 1 = 0 — monic, integer coefficients — so it is an algebraic integer, and it is plainly not in ℤ[√5]. One element, one minimal polynomial, and the belief is gone. Then the general rule (for ℚ(√D) with D ≡ 1 mod 4, half-integers enter) and the discriminant test: disc(ℤ[√5]) = 20, disc(K) = 5, index f = 2 ≠ 1.
  - **Verification of death**: the learner *checks* rather than assumes, computing a discriminant ratio before asserting 𝒪_K.

## Analogies
- **Best — the chemistry of a different element set.** In ℤ the primes are the atoms and every molecule has one formula. In ℤ[√−5] the atoms are the wrong objects — 6 has two decompositions — and Kummer's fix is to posit finer "ideal" atoms that recombine correctly. *Breaking point*: real atoms are not invented to fix bookkeeping, and the analogy hides that ideals are genuine objects with an independent definition, not a device. Say so.
- **Alternative — currency and exchange rates.** Two ideals in the same class differ by a principal factor, the way two prices differ by a unit conversion; the class group is what remains when you stop caring about the conversion. Carries "quotient by an equivalence" better than any physical image, and directly attacks MC-2.
- **Story analogy** — Kummer, Fermat's Last Theorem, and the flawed proofs of the 1840s that assumed unique factorisation in cyclotomic rings. Genuinely load-bearing rather than decorative: it establishes that MC-1 is not a beginner's error but the error that occupied competent mathematicians, which both dignifies the learner's version of it and explains why the whole subject exists.
- **ANTI-ANALOGY — "the class group is the group of ideal classes, so it lists the ideals."** This is MC-2 stated as if it were an explanation, and it is what the name itself suggests. Pre-empt it by defining the quotient before naming the object.
- **ANTI-ANALOGY — "𝒪_K is just ℤ with a new symbol added."** Installs MC-3 and makes ℚ(√5) a surprise rather than a check.

## Demonstrations
- **The 6 = 2 × 3 = (1 + √−5)(1 − √−5) collision.** Run the norm argument in full. *Elicit the prediction first*: "is 2 irreducible here? Guess before we compute the norms." Learners overwhelmingly say no, expecting √−5 to help — and finding that it does not is the moment the concept becomes necessary.
- **The golden-ratio counterexample.** Write x² − x − 1 = 0, check monic, check integer coefficients, check (1 + √5)/2 is a root, then ask whether it lies in ℤ[√5]. *Predict first*: "is 𝒪_K = ℤ[√5]?" Take the answer in writing; MC-3 is confidently held and worth catching on the record.
- **P and P² in ℤ[√−5].** Exhibit P = (2, 1 + √−5), show it is not principal, show P² = (2). *Predict first*: "if P isn't generated by one element, can any power of it be?"

## Discovery Questions
**Genuine guided discovery is available for the concept's central move, and should be used — this is one of the few research-level nodes where it is.** The subject's founding realisation is reachable in six steps because the counterexample is small enough to compute by hand.
1. **Need**: "Factor 6 in ℤ[√−5]. Find as many factorisations into non-unit factors as you can."
2. **Playground**: 2 × 3, and (1 + √−5)(1 − √−5). Both check out by direct multiplication.
3. **Invention**: "One of these must decompose further — find which." The learner tries, and fails, and the norm computation shows why.
4. **Collision**: irreducible does not imply prime here. State the definitions side by side and let the learner see that ℤ merges two notions that are actually distinct.
5. **Formalisation**: "What would have to be true for uniqueness to come back?" — introduce ideals, and the theorem that ideal factorisation is always unique.
6. **Compression**: "Elements can fail; ideals never do. The class group measures how much the elements failed."
The class group's *definition* (step 5–6) is direct instruction and should be labelled as such; Minkowski's bound and the FLT connection are report-level and are not staged as discovery.

## Teaching Sequence
The Blueprint's teaching-action components own the turn-level scripts. Three ordering constraints are pedagogically load-bearing. First, **the ℤ[√−5] failure must come before ideals are mentioned at all.** Ideals introduced first are unmotivated machinery, and the learner memorises a definition; introduced as the *repair* to a failure they personally computed, they are obviously necessary. Second, **irreducible-versus-prime must be separated explicitly at the collision**, because in ℤ the two coincide and the learner has one merged concept — leaving them merged makes the failure look like a computational accident rather than a structural one. Third, **the class group must be defined as a quotient before it is named**, since the name is what produces MC-2 (Type 3, language contamination); a definition met after the label is read through the label. MC-3's counterexample is independent of this chain and can be placed wherever 𝒪_K is first constructed, but it must be placed *somewhere* before ℚ(√5) is used for anything.

## Tutor Actions
- **DO: Worked Example** — the 6 = 2 × 3 = (1+√−5)(1−√−5) norm computation. First choice; it is the concept's foundation and it is fully hand-computable.
- **TEST-THINKING: Prediction** — "is 2 irreducible in ℤ[√−5]?" taken before the norms.
- **TEST-THINKING: Error Analysis** — hand the learner a 19th-century-style flawed FLT argument that assumes unique factorisation, and ask them to find the step that fails. Only usable once the correct structure is secure, per the stability guard.
- **ORGANIZE: Representation Table** — irreducible vs prime, in ℤ and in ℤ[√−5], four cells. This is the artefact that keeps the two notions apart.
- **SHOW: Story** — Kummer and the flawed proofs.
- **Does NOT fit: Analogy-first.** The chemistry analogy is good and must follow the computation; delivered first it explains a failure the learner has not yet seen and therefore explains nothing.

## Voice Teaching Notes
The load-bearing sentence is "in this ring, irreducible does not mean prime." Slow down through it; it is six words carrying the entire subject, and it is easy to deliver as a technicality. Listen for the learner using "irreducible" and "prime" interchangeably in their own speech — that substitution is audible long before it produces a wrong answer, and it is the cleanest early signal that the ℤ-merged concept is still in place. Also listen for the learner saying "the class group" with confidence but never saying what it is *of* — MC-2 characteristically presents as fluent use of the term with no relational content behind it. Pronunciation matters here more than usual: 𝒪_K, ℤ[√−5] and Cl(K) must be sayable, and a learner who cannot say them aloud will not carry them through a multi-step argument. Channel reality is owned by `../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals
- **Fast-wrong on "is 6's factorisation unique in ℤ[√−5]?"** — MC-1 at DOMINANT strength, and expect it: the belief has been reinforced since primary school. Do not read it as inattention.
- **Correct that factorisation fails, but attributing it to the *example* rather than the *ring*** ("√−5 is a weird choice") — MC-1 partially repaired; the learner has accepted the instance and not the principle. Probe with a second non-UFD ring before advancing.
- **Fluent class-group vocabulary, no relational content** — MC-2. This passes any probe that asks for a definition and fails the probe that asks what h_K = 2 *means* for ℤ[√−5]. The gate must contain the latter.
- **Assumes 𝒪_K = ℤ[α] without checking** — MC-3, and it is fast and confident, which places it in the D1 grid's dangerous quadrant. Treat as misconception, not guess.
- **Slow-correct throughout** — expected and healthy; this is research-level material with a lenient gate, and reconstructing rather than recalling is the intended behaviour at MAMR 3/5.
- **Mastery trigger**: the Blueprint's gate at MAMR 3/5, with the added requirement that the "what does h_K = 2 mean" item be among the correct answers.

## Tutor Recovery Strategy
The likely utterance is "I don't even know what I'm looking at" — reasonable, since the notation load here (𝒪_K, fractional ideals, Cl(K), disc) arrives faster than in almost any other node in this corpus. The concept-specific smaller question strips every symbol out: **"Just this. 6 = 2 × 3. Also 6 = (1 + √−5)(1 − √−5). Multiply the second one out and check it really is 6."** One multiplication, no theory, and the answer is a number the learner can verify themselves. The surprise does the motivational work and the arithmetic restores footing. Rebuild from there — norms next, then irreducibility, then ideals, one at a time. Generic machinery is owned by `../foundations/01-recovery-engine.md`.

## Memory Hooks
- Concept type: **concept**, with one embedded **procedure** (norm computation in a quadratic field). Review both forms; the norm computation should be speeded, the structural story should be explanation-on-demand.
- Concept-specific deviation: MC-1 is unusually regrowth-prone because its source — the unqualified Fundamental Theorem of Arithmetic — remains true and remains in constant use everywhere else in the learner's mathematics. Per `../student-state/03`, a second regrowth should trigger re-rating to HIGH and a redesign of the repair path rather than a repetition of it.
- Interleaving partners: `math.nt.fundamental-theorem-arithmetic` (the discrimination that matters most — ℤ versus a general 𝒪_K), and `math.abst.ring-theory`'s ideal material, to keep ideals from becoming a number-theory-only object.

## Transfer Connections
- **Near**: `math.nt.algebraic-integers` and `math.nt.number-fields`, which unpack the two halves of this concept's setup in detail.
- **Far**: the general pattern of *restoring a lost property by changing the objects* — the same move as passing to equivalence classes, completing a space, or working with sheaves. Naming the pattern explicitly is worth more than the instance.
- **Real-world**: none direct. The FLT connection is the honest payoff and it is internal to mathematics.
- **Expert transfer**: the reflex of asking "over which ring?" whenever a factorisation claim is made. That question, once installed, never stops being useful.

## Cross-Subject Connections
- The KG lists `math.abst.galois-theory` as a cross-link; unauthored in this corpus, so no probe can be built against it yet. The connection is real and load-bearing — the Galois group acts on the ideals and the class group carries that action.
- **Computer science**, weak but real: class-group computation is a genuine computational-algebra problem and the hardness of related problems has been proposed as a cryptographic basis. Recorded as honest but thin; not asserted as a KG edge.
- No genuine connection to physics, chemistry, biology, or English.

## Blueprint References
`docs/curriculum/blueprints/math.nt.algebraic-number-theory.md`. Reused by reference, not restated: the misconception registry with its birth-type column, the TB-R01/TB-R02/TB-R03 three-step repair scripts (including the full norm argument, the P/P² demonstration, and the discriminant test), the learning-objective statement, and the mastery gate item set. This entry adds the mental-model ladder, the two anti-analogies, the discovery staging with its labelled direct-instruction boundary, the three ordering constraints, the response-pattern diagnostics, the regrowth ruling on MC-1, and the recovery shrink-question.

## Runtime Asset References
No seeded `AssetIdentity` records exist for this concept. None were created here.

## Curriculum Feedback
The KG's `requires` for this node are `math.nt.general-diophantine` and `math.abst.ring-theory`, and `math.nt.algebraic-integers` is listed as *unlocked by* it — yet the Blueprint's own learning objectives define 𝒪_K as "the subring of algebraic integers in K" in its first sentence, i.e. this concept consumes the notion its successor formalises. The dependency reads inverted, or at least mutually recursive. The same holds for `math.nt.number-fields`, which requires `algebraic-integers` while this node already assumes number fields. The three nodes are genuinely one body of material split three ways, and the split's direction is not consistent. Recorded for the Curriculum Production Pipeline; not fixed here, and the entries for all three have been authored so that each is self-contained enough to survive whichever order a learner meets them in.

## Version History
- v1.0 (2026-08-12): Initial authoring. Domain Certification Mode, math.nt tail batch (Phase 1, batch 1).
