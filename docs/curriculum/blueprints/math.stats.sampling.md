<!-- BLUEPRINT: math.stats.sampling -->
<!-- STATUS: PACKAGE_READY -->
<!-- SPEC VERSION: 1.0 -->

# Teaching Blueprint: Sampling Methods
**Concept ID:** `math.stats.sampling`
**KG Fields:** difficulty=developing | bloom=understand | estimated_hours=3 | mastery_threshold=0.85

---

## Component 0 — Metadata

| Field | Value |
|-------|-------|
| concept_id | math.stats.sampling |
| name | Sampling Methods |
| difficulty | developing |
| bloom | understand |
| estimated_hours | 3 |
| mastery_threshold | 0.85 |
| CPA_entry_stage | C (Concrete) |
| requires (Tier-1) | math.stats.population-sample, math.prob.probability-axioms |
| cross_links | (none) |
| P76_mode | independence |
| MAMR | 5/5 (⌈0.85 × 5⌉) |

---

## Component 1 — Cognitive Map

### Prior Knowledge Anchors
- **math.stats.population-sample**: a population is the complete set of units of interest; a sample is a subset drawn from it; inference uses the sample to draw conclusions about the population, and sampling must be REPRESENTATIVE to be valid
- **math.prob.probability-axioms**: P(A)≥0, P(Ω)=1, additivity for mutually exclusive events — the machinery that makes "each unit equally likely to be selected" a precise, checkable probabilistic statement rather than a vague intention

### Target Knowledge State
Student can define simple random sampling (SRS: every unit, and every subset of a given size, equally likely to be selected) and distinguish it from stratified sampling (population divided into strata, then SRS within each stratum) and cluster sampling (population divided into clusters, then entire clusters are sampled, with all units in a selected cluster included); correctly identify selection bias when a sampling method systematically favors some units over others; explain concretely why sample SIZE alone does not compensate for a biased sampling METHOD; and recognise "random" as a precise procedural guarantee (known, typically equal, selection probabilities) rather than a synonym for "haphazard" or "convenient."

### Conceptual Obstacles
1. Believing a larger biased sample is more trustworthy than a smaller random one — sample size only reduces variability WITHIN a method that is already unbiased; a systematically biased method produces a wrong answer more precisely (with more confidence) as size grows, not a more correct one
2. Confusing stratified sampling (SRS conducted separately WITHIN each subgroup) with cluster sampling (ENTIRE subgroups are sampled, with everyone inside included) — both "divide the population into groups" first, but what happens next is opposite: sample WITHIN groups (stratified) vs. sample BETWEEN groups (cluster)
3. Treating "random" as a synonym for "haphazard" or "whatever is convenient" — a sample of convenience (e.g. surveying whoever walks by) is emphatically NOT random in the statistical sense, which requires every unit to have a known, typically equal, and pre-specified probability of selection

---

## Component 2 — Misconception Registry

| ID | Label | Description | Trigger |
|----|-------|-------------|---------|
| MC-1 | LARGER-SAMPLE-FIXES-BIAS | Student believes a large biased sample is more reliable than a small properly randomized one, treating sample size as a cure for a flawed selection method | Any comparison between a large convenience/self-selected sample and a smaller genuinely random one; historical polling-failure scenarios |
| MC-2 | STRATIFIED-CLUSTER-CONFUSION | Student conflates stratified sampling (SRS within each subgroup, ALL subgroups represented) with cluster sampling (whole subgroups selected, only SOME subgroups represented, but fully); cannot correctly classify a described procedure as one or the other | Any scenario describing "the population is divided into groups" without further detail on what happens next |
| MC-3 | RANDOM-MEANS-HAPHAZARD | Student uses "random" to mean "arbitrary," "unplanned," or "convenient" (e.g. "I randomly asked whoever was nearby"), rather than a procedure with known, typically equal, selection probabilities for every unit | Any self-described "random" sample that is actually a convenience sample; word problems using "random" colloquially |

**Foundational Misconception:** MC-1 (LARGER-SAMPLE-FIXES-BIAS) — it is historically the most consequential sampling error (the 1936 Literary Digest poll, discussed in A02, predicted the wrong U.S. presidential election winner from 2.4 million responses, while a much smaller genuinely random Gallup sample got it right), and it undermines the entire rationale for this concept: a student who believes size alone guarantees accuracy has no motivation to learn WHICH method was used, since "big enough" would seem to settle every question regardless of method.

---

## Component 3 — Scaffolding Protocol

**Entry point:** C (Concrete) — developing learner works through a small population example, physically distinguishing SRS, stratified, and cluster sampling procedures before any formal vocabulary is introduced.

**Scaffolding sequence:**
1. **A01 P11 REPRESENTATION SHIFT** — C: a 20-unit toy population sampled three different ways (SRS, stratified, cluster), tracing exactly which units get selected under each; P: a diagram contrasting "sample within every group" (stratified) against "sample whole groups" (cluster); A: formal definitions of SRS, stratified, cluster, systematic, multistage, and selection bias
2. **A02 P06 CONTRAST PAIR** — large biased sample vs. small random sample using the Literary Digest/Gallup 1936 case (MC-1); stratified vs. cluster procedures on the same population (MC-2); a genuine random draw vs. a convenience sample both self-described as "random" (MC-3)
3. **A03 P91 Gate** — mastery assessment

---

## Component 4 — Protocol A (Main Teaching Sequence)

### Teaching Action A01 — Four Ways to Draw a Sample

**Primitive:** P11 REPRESENTATION SHIFT
**Purpose:** Trace each sampling method mechanically on a small concrete population before naming it; state the formal definitions together so their structural differences are visible from the start

---

**[P11 — REPRESENTATION SHIFT]**

**Stage C — Concrete (population of 20 students, 12 in "Group A" and 8 in "Group B," want a sample of size 4):**

- **Simple random sample (SRS):** Number all 20 students 1–20; draw 4 numbers using a random-number generator (or equivalently, a well-shuffled lottery draw with no replacement) — every one of the $\binom{20}{4}=4845$ possible groups of 4 students is EQUALLY likely to be the one drawn. Group membership (A or B) plays no role in the draw at all.
- **Stratified sample:** Split the population into its two existing strata (Group A: 12 students, Group B: 8 students). Decide a per-stratum sample size (e.g. proportional: $4\times(12/20)=2.4\to2$ from A, $4\times(8/20)=1.6\to2$ from B, adjusted to a whole-number split), then draw an SRS of that size WITHIN each stratum, independently. Every stratum is guaranteed to be represented in the final sample.
- **Cluster sample:** Suppose the 20 students are actually arranged in 5 pre-existing groups of 4 (a natural clustering, e.g. 5 classrooms). Randomly select, say, 1 of the 5 classrooms — and include **every** student in that selected classroom. Most classrooms (clusters) contribute NOTHING to the sample; the one selected cluster contributes ALL of its members.

**Stage P — Pictorial (stratified samples WITHIN groups; cluster samples BETWEEN groups):**

```
  STRATIFIED:  sample a slice from EVERY group        CLUSTER: sample WHOLE groups, skip the rest

  Group A: [■■■■■■■■■■■■]  → draw 2 (■)               Cluster 1: [■■■■]  → NOT selected
  Group B: [■■■■■■■■]      → draw 2 (■)                Cluster 2: [■■■■]  → SELECTED (all 4 in)
                                                        Cluster 3: [■■■■]  → NOT selected
  every group contributes SOME units                   Cluster 4: [■■■■]  → NOT selected
                                                        Cluster 5: [■■■■]  → NOT selected

                                                        only SOME clusters contribute, but
                                                        those clusters contribute ALL units
```

**Stage A — Abstract (formal definitions):**

- **Simple random sample (SRS):** every subset of the population of the target size is equally likely to be the sample selected; equivalently, every unit has the same probability of inclusion, with no dependence on group membership.
- **Stratified sample:** the population is partitioned into strata (groups sharing a relevant characteristic); an independent SRS is drawn WITHIN each stratum. Guarantees representation of every stratum; typically reduces variability when strata differ meaningfully on the outcome of interest.
- **Cluster sample:** the population is partitioned into clusters (often based on natural or geographic groupings); a random subset of WHOLE clusters is selected, and every unit within a selected cluster is included. Often cheaper to administer (e.g. surveying entire households or entire schools) but can be less precise than stratified sampling if clusters are internally similar.
- **Systematic sample:** select every $k$th unit from an ordered list, starting from a random point.
- **Multistage sample:** cluster and/or stratified sampling applied in successive stages (e.g. randomly select regions, then randomly select households within each selected region).
- **Selection bias:** occurs when the sampling method systematically favors certain units over others in a way that is not accounted for, so the sample cannot be treated as representative of the population — most seriously when the method is not random at all (a convenience or self-selected sample).

---

**[P49 — ADAPTIVE CHECKPOINT]**

**Prompt:** A school wants to survey students about cafeteria food. It has 10 homerooms of 25 students each. Describe what the school would do differently under (a) a stratified sample by grade level (assume each homeroom is a single grade) targeting a fixed total sample size, versus (b) a cluster sample.

**CORRECT:** (a) Stratified: decide how many students to survey from EACH grade/homeroom (e.g. proportionally or equally), then draw an independent SRS of that size from within each of the 10 homerooms — every homeroom contributes some students to the final sample. (b) Cluster: randomly select a handful of the 10 homerooms entirely (e.g. 2 of the 10), and survey EVERY student in those selected homerooms — the other 8 homerooms contribute nobody.
→ "Correct — the sharpest distinction: stratified guarantees every homeroom appears in the sample (a few students from each); cluster guarantees only a few homerooms appear at all (but everyone in them)." → Proceed to A02.

**PARTIAL:** Student correctly describes (a) but describes (b) as "survey a random sample of students from a few homerooms" instead of "survey EVERY student in the selected homerooms" (missing the defining "include everyone in the cluster" feature).
→ "Cluster sampling's defining feature is exhaustiveness WITHIN the selected clusters — once a homeroom is chosen, every single student in it is surveyed, not a further random subset. This is what makes cluster sampling operationally cheap (survey whoever happens to be in the room you already selected) compared to needing a fresh random draw inside every group."

**INCORRECT:** Student describes both (a) and (b) identically, as "pick some students from some homerooms" (MC-2).
→ "The key difference is WHICH homerooms and HOW MANY students per homeroom get sampled. Stratified: ALL 10 homerooms contribute (a partial sample from each). Cluster: only a FEW homerooms are chosen at all, but those chosen ones are surveyed completely (100% of their students). 'Some students from some homerooms' blurs exactly the distinction the terms are meant to capture."

**NO_RESPONSE:** → "(a) Stratified: draw a partial SRS from EVERY one of the 10 homerooms (all 10 contribute some students). (b) Cluster: randomly select a few of the 10 homerooms entirely, and survey EVERY student in just those selected homerooms (most homerooms contribute nobody)."

---

### Teaching Action A02 — Size Doesn't Fix Bias; Stratified ≠ Cluster; Random ≠ Haphazard

**Primitive:** P06 CONTRAST PAIR
**Purpose:** Break MC-1 with the historical Literary Digest/Gallup contrast; break MC-2 with a side-by-side procedural comparison; break MC-3 with a genuine-random-vs-convenience contrast

---

**[P06 — CONTRAST PAIR]**

**Contrast 1 — 2.4 million biased responses vs. 50,000 random ones (MC-1), the 1936 case:**

In the 1936 U.S. presidential election, the magazine *Literary Digest* mailed 10 million survey postcards (drawn largely from telephone directories and car-registration lists — in 1936, disproportionately wealthier households) and received 2.4 million responses, predicting a landslide win for Landon. Simultaneously, George Gallup used a much smaller (about 50,000-person) sample selected to be broadly representative across income and region. **Gallup correctly predicted Roosevelt's win; the Literary Digest, despite a sample nearly 50× larger, was badly wrong.**

The failure was not sample SIZE — it was sample METHOD: telephone/car ownership in 1936 systematically excluded lower-income voters, who leaned differently politically. No amount of additional postcards (even surveying all 10 million recipients) would have fixed this, because every additional response was drawn from the SAME biased frame. **A larger sample makes a biased estimate more PRECISELY wrong, not more correct** — it narrows the spread around the wrong number, it does not move the estimate toward the truth.

**Contrast 2 — Stratified (sample within every group) vs. cluster (sample whole groups) on the identical population (MC-2):**

Take a hospital with 8 wards, aiming to survey patient satisfaction.

| Approach | What happens |
|----------|----------------|
| Stratified by ward | Draw some patients from EACH of the 8 wards (e.g. 3 patients per ward) — all 8 wards represented, sample spread thin across the hospital |
| Cluster by ward | Randomly select, say, 2 of the 8 wards, and survey EVERY patient in those 2 wards — only 2 wards represented, but completely (all patients in them) |

Both start with "divide by ward," but stratified spreads a thin sample across ALL groups, while cluster concentrates a thick (complete) sample within a FEW groups. Choosing the wrong one changes what conclusions are even possible: cluster sampling risks missing ward-specific issues entirely if the unselected wards happen to differ, while stratified sampling guarantees every ward contributes information but may be more expensive to administer if visiting many wards is costly (cluster's practical advantage).

**Contrast 3 — Genuine random selection vs. a "random-sounding" convenience sample (MC-3):**

"I randomly asked shoppers in the mall parking lot about their favorite grocery store" is NOT a random sample in the statistical sense — every uncontrolled feature of who happens to be in that parking lot, at that time, on that day (car owners, people free during those hours, people who shop at that particular mall) creates systematic selection: this is a **convenience sample**, and no single shopper had a known, pre-specified probability of being asked.

Contrast with genuine randomization: assign every registered shopper a number, and use a computer to select 200 numbers uniformly at random from the full registered list. Here, every shopper's inclusion probability is known and equal (200/total registered) BEFORE any data is collected — this is what "random" means precisely in sampling, a controlled PROCEDURE with specified probabilities, not a colloquial feeling of arbitrariness.

---

**[P49 — ADAPTIVE CHECKPOINT]**

**Prompt:** A city council wants residents' opinions on a new park. (a) Explain why posting an online survey link on the council's Twitter account and accepting all responses would NOT produce a random sample, even with 5,000 responses. (b) A pollster instead divides the city into 40 neighborhoods and randomly selects 6 of them, surveying every household in each selected neighborhood. Name this method. (c) Would drawing 3 households from EVERY one of the 40 neighborhoods instead be the same method? If not, name the difference.

**CORRECT:** (a) Not random — only Twitter followers (and only those who happen to see and choose to respond) could ever be included; this systematically excludes non-Twitter-users and the less socially engaged, regardless of how many of them respond. 5,000 is a large number but does not fix the selection bias baked into who could possibly respond. (b) Cluster sampling — whole neighborhoods (clusters) are selected, and everyone within a selected neighborhood is surveyed. (c) No — that would be stratified sampling instead (a partial draw from EVERY neighborhood, rather than a complete draw from only SOME neighborhoods); the difference is which neighborhoods get skipped entirely (cluster) vs. none skipped at all (stratified, just spread thin).
→ "Correct throughout — (a) revisits MC-1's lesson in a modern (online) setting, and (c) tests the stratified/cluster distinction by asking for the SPECIFIC procedural change, not just a label." → Proceed to A03.

**PARTIAL:** Student gets (a) and (b) but in (c) says "yes, same method, just more locations" (MC-2).
→ "The number of neighborhoods sampled is a surface difference; the STRUCTURAL difference is what happens once you're in a neighborhood. In (b) (cluster), 6 neighborhoods are FULLY surveyed and the other 34 contribute nothing. In the new version, all 40 neighborhoods contribute a partial sample (3 households each) — every neighborhood is represented, just not exhaustively. That structural difference (some-groups-completely vs. all-groups-partially) is exactly what separates cluster from stratified."

**INCORRECT:** Student answers (a) "the sample is random because respondents choose freely, on their own, to respond" (treating self-selection as a form of randomness, MC-3).
→ "Free choice to respond is precisely what makes this NOT random in the statistical sense — 'random' requires the SURVEYOR to control who is asked, with a known and typically equal probability of being included, decided in advance. When people self-select (choosing whether to respond), those who feel strongly (in either direction) are systematically more likely to respond than those who don't — a real and common source of selection bias, the opposite of a controlled random draw."

**NO_RESPONSE:** → "(a) Only Twitter followers who see and choose to respond could be included — systematic exclusion of everyone else, unfixed by response count. (b) Cluster sampling. (c) No — drawing from every neighborhood makes it stratified, not cluster; cluster leaves most neighborhoods out entirely, stratified includes all of them partially."

---

### Teaching Action A03 — Mastery Gate (P91)

**Primitive:** P91 = P77→P55→P76→P55→P75→P55→P74→P55→P78
**Purpose:** Assess correct classification of sampling methods, the size-vs-bias distinction, and the operational definition of "random" under transfer

---

**[P77 — MULTI-PROBLEM SET]** *(4 problems)*

**Problem 1:** A university surveys students by randomly selecting 50 out of the 15,000 total students, each with equal probability. Name this sampling method.

*Solution:* Simple random sample (SRS) — every student has an equal, known chance of selection, with no grouping structure involved.

**Problem 2:** A researcher divides a country into 500 voting districts, randomly selects 20 of them, and interviews every registered voter in those 20 districts. Name this method, and state one advantage it has over surveying a few voters from all 500 districts.

*Solution:* Cluster sampling. Advantage: administratively cheaper/more feasible — interviewers only need to travel to 20 locations rather than a scattering of individuals across all 500 districts.

**Problem 3:** A pollster claims: "My sample of 8,000 self-selected online respondents is more trustworthy than a competitor's random sample of 800, because mine is 10 times bigger." Evaluate this claim.

*Solution:* The claim is false as stated — size does not compensate for a biased selection method. If the 8,000 are self-selected (only those who choose to respond, and choose to visit the relevant website/link), the sample can be systematically unrepresentative regardless of size; the smaller random sample of 800, drawn so every unit has a known, typically equal probability of selection, can be more trustworthy despite being smaller, precisely because its method avoids selection bias.

**Problem 4:** A school divides students into strata by grade level and draws a proportional SRS within each stratum. Explain in one sentence why this differs from simply drawing one large SRS from the whole school ignoring grade level.

*Solution:* Stratifying GUARANTEES every grade level is represented in the sample (each stratum is separately sampled), whereas a single school-wide SRS could, by chance, over- or under-represent some grade levels (especially with a small sample size), even though it is still unbiased on average.

---

**[P55 — SCORE]**
Count correct responses. Record raw score S₁ (0–4) after P77.

---

**[P76 — TRANSFER PROBE]** *(P76_mode: independence)*

**Prompt:** A national health survey wants to estimate the average commute time for workers across a large country. Three proposals are under consideration:

**Proposal X:** Post the survey on a popular commuting app, open to anyone who wants to fill it out; expect roughly 200,000 responses.
**Proposal Y:** Randomly select 150 towns from a national list of all towns, then survey every working adult in each selected town (a total of roughly 40,000 respondents).
**Proposal Z:** From the national voter registration list (covering nearly all adults), randomly select 3,000 individuals, each with equal and known probability of selection.

(a) Classify Y and Z by sampling method name.
(b) Rank X, Y, and Z from MOST to LEAST likely to produce an accurate estimate of the national average commute time, and justify the ranking using the concepts from this blueprint (not simply by sample size).
(c) A colleague argues: "Z has the smallest sample, so it must be the least accurate." Explain precisely what is wrong with this reasoning, referencing the historical example from A02.

**Expected solution:**

(a) Y is a **cluster sample** (whole towns selected, everyone within them surveyed). Z is a **simple random sample** (individuals selected directly and independently from a near-complete population list, with equal, known probability).

(b) Likely ranking: **Z, then Y, then X** (or Z and Y close, both well ahead of X). Z uses a controlled random draw from a list covering nearly the entire population, giving every adult a known, equal chance of selection — the gold-standard setup for representativeness, limited mainly by its smaller size (which affects PRECISION, i.e. how tight the estimate is, not whether it's systematically biased). Y is also genuinely randomized (towns are randomly selected) but risks a different issue: if commute times vary systematically by TYPE of town (e.g. urban vs. rural), and the 150 randomly selected towns happen to skew in one direction, or if towns are internally quite homogeneous in commute time, cluster sampling can be less precise than an equivalent-sized SRS or stratified sample (though it remains unbiased in expectation, since towns were randomly chosen). X is the clear worst: only people who use the commuting app AND choose to respond can be included — this systematically excludes non-commuters, non-app-users, and biases toward whichever demographic uses that app most, no matter how large the response count grows (echoing the Literary Digest failure exactly).

(c) The colleague's reasoning applies size as if it were the only factor in accuracy, ignoring METHOD. Z's smaller size affects only its PRECISION (how much its estimate might vary from sample to sample) — but because its method (random selection from a near-complete list) has no systematic selection bias, Z's estimate is centered correctly (unbiased) even though based on fewer people. X's 200,000 responses, by contrast, are drawn from a method with built-in selection bias (only app users who choose to respond), so X's estimate can be confidently wrong — precisely the Literary Digest lesson: a huge biased sample produces a precise, confident, and WRONG answer, while a much smaller properly randomized sample (Gallup's ~50,000, or here Z's 3,000) is centered on the truth. Size determines how tightly an estimate clusters around whatever it's centered on; method determines what it's centered on in the first place.

---

**[P55 — SCORE]**
Record transfer score S₂ (0 or 1) after P76.

Total score S = S₁ + S₂ (max 5).

---

**[P75 — MASTERY ASSESSMENT]**

MAMR: 5/5 (⌈0.85 × 5⌉ = ⌈4.25⌉ = 5)

- S ≥ 5: MASTERY ACHIEVED → proceed to P74
- S = 4: NEAR MASTERY → attempt repair on missed items; re-gate at next session
- S ≤ 3: MASTERY NOT ACHIEVED → execute Protocol B

---

**[P55 — SCORE]**
Record mastery determination (ACHIEVED / NEAR / NOT ACHIEVED).

---

**[P74 — ROUTING DECISION]**

- MASTERY ACHIEVED → unlock math.stats.sampling-distribution; record completion
- NEAR MASTERY → flag for Protocol B on specific missed item(s); re-assess next session
- MASTERY NOT ACHIEVED → execute Protocol B immediately

---

**[P55 — SCORE]**
Record routing outcome.

---

**[P78 — COMPLETION]**

Session record: concept math.stats.sampling assessed. Mastery status logged. Student directed to next concept or repair protocol per P74 routing.

---

## Component 5 — Protocol B (Misconception Repair)

### Repair Action B01 — LARGER-SAMPLE-FIXES-BIAS (MC-1)

**[P27 — MISCONCEPTION NAMING]**
"Believing a bigger biased sample beats a smaller random one is LARGER-SAMPLE-FIXES-BIAS. Sample size only reduces the SPREAD of estimates around whatever the method is already centered on — it never corrects a systematically biased method's center."

**[P41 — MISCONCEPTION DETECTOR]**
Diagnostic: "A survey with 100,000 self-selected online responses versus a random sample of 1,000 — which is more trustworthy?"
- MC-1 response: "The 100,000 one, since it's a much bigger sample."

**[P64 — CONCEPTUAL SHIFT]**
"Recall the 1936 Literary Digest: 2.4 million responses, drawn from a systematically skewed list, predicted the WRONG winner; Gallup's much smaller (~50,000) genuinely random sample got it right. Every additional self-selected response in a biased pool is drawn from the SAME flawed frame, so it sharpens a wrong estimate rather than correcting it. Mental model: sample size controls PRECISION (how tightly repeated samples would cluster); sampling METHOD controls WHETHER that cluster is centered on the truth. A huge biased sample is precisely wrong; a smaller random sample is roughly right."

Practice: Explain in your own words why doubling the Literary Digest's response count (to 4.8 million, still from the same telephone/car-registration lists) would NOT have fixed its prediction.

---

### Repair Action B02 — STRATIFIED-CLUSTER-CONFUSION (MC-2)

**[P27 — MISCONCEPTION NAMING]**
"Conflating stratified with cluster sampling is STRATIFIED-CLUSTER-CONFUSION. Stratified samples WITHIN every group (all groups represented, partially); cluster samples WHOLE groups (only some groups represented, but completely)."

**[P41 — MISCONCEPTION DETECTOR]**
Diagnostic: "A pollster divides a city into 50 neighborhoods and samples from some of them. Is this stratified or cluster?"
- MC-2 response: "Can't tell / doesn't matter, they're basically the same idea."

**[P64 — CONCEPTUAL SHIFT]**
"The deciding question is: after dividing into groups, do you sample a PORTION from EVERY group (stratified — all 50 neighborhoods contribute something), or do you sample ALL of a FEW groups and NONE of the rest (cluster — a handful of neighborhoods contribute everything, most contribute nothing)? Picture it as a grid: stratified shades a thin strip across every row; cluster fully shades a few whole rows and leaves the rest blank. The two methods trade off differently too — stratified guarantees representation of every group but can be more expensive to administer broadly; cluster is administratively cheaper (visit fewer locations) but risks missing something if the skipped groups happen to differ."

Practice: A hospital survey draws 5 patients from each of its 12 wards (stratified) versus randomly picking 3 of the 12 wards and surveying every patient in them (cluster) — state which method guarantees every ward is represented, and which is cheaper to administer if visiting each ward has a fixed cost.

---

### Repair Action B03 — RANDOM-MEANS-HAPHAZARD (MC-3)

**[P27 — MISCONCEPTION NAMING]**
"Using 'random' to mean 'haphazard' or 'convenient' is RANDOM-MEANS-HAPHAZARD. Statistically, random means every unit has a KNOWN, pre-specified (typically equal) probability of selection — a controlled procedure, not an absence of a plan."

**[P41 — MISCONCEPTION DETECTOR]**
Diagnostic: "Is asking random people at a bus stop about their commute a random sample?"
- MC-3 response: "Yes, since I'm not choosing who to ask on purpose — it's random who happens to be there."

**[P64 — CONCEPTUAL SHIFT]**
"Who happens to be AT the bus stop, at that TIME, on that DAY is itself a systematic filter — only bus riders, only people free at that hour, only people willing to talk to a stranger. None of them had a pre-specified, known probability of being asked; the surveyor did not control the selection at all. Genuine randomness requires the OPPOSITE of 'whoever happens to show up': a predetermined procedure (e.g. a numbered list and a random-number draw) where every unit's chance of inclusion is fixed and known in advance, independent of who happens to be convenient to reach."

Practice: Contrast "I'll call the first 50 names in the phone book" (not random — early alphabetical names are systematically overrepresented relative to a true random draw) with "I'll have a computer select 50 names uniformly at random from the full phone book" (genuinely random), explaining the difference in selection probability for each phone-book entry under both procedures.

---

## Component 6 — P89 Spaced Repetition Schedule

**[P89 — SPACED REPETITION]**

| Review | Delay | Focus |
|--------|-------|-------|
| SR-1 | +1 day | Restate the four method definitions (SRS, stratified, cluster, systematic) from memory, with one distinguishing feature each |
| SR-2 | +3 days | Re-explain the Literary Digest/Gallup 1936 contrast without looking it up, focusing on why size didn't fix the bias |
| SR-3 | +7 days | Classify three fresh described sampling procedures as SRS/stratified/cluster/convenience, catching any disguised convenience sample |
| SR-4 | +14 days | Reconstruct the transfer probe's size-vs-method ranking argument (A03) for a new scenario with a large biased sample vs. a small random one |

Retrieval flag: if student ranks a larger sample as more trustworthy purely by size (MC-1) or mislabels a convenience sample as random (MC-3), re-execute B01/B03 before continuing.

---

## Component 7 — Cross-Blueprint Dependencies

**[GR-8: Cross-link documentation]**

| Direction | Concept | Relationship |
|-----------|---------|---------------|
| Requires (Tier-1) | math.stats.population-sample | Supplies the population/sample vocabulary and the "representativeness" goal that sampling methods are designed to achieve |
| Requires (Tier-1) | math.prob.probability-axioms | Makes "equally likely selection" a precise, checkable probabilistic claim rather than an informal notion |
| Unlocks | math.stats.sampling-distribution | The behavior of a statistic (e.g. the sample mean) computed from repeated SRS draws — this concept's SRS definition is the exact mechanism that distribution is built on |

**GR-9:** cross_links: none in the KG for this concept; P76_mode = independence (the transfer probe applies the size-vs-method distinction to a fresh national-survey scenario rather than a named cross-linked concept).

---

## Component 8 — Teaching Notes

**Structural decisions:**
- h=3 → compact structure (2 main TAs + gate), matching other h=3, developing/understand Tier-2 concepts
- bloom=understand → V-4 = N/A (no P07 required; classification and justification tasks, not derivations)
- CPA_entry = C for a developing learner: a concrete, physically traceable toy population (20 students, 2 groups) grounds all four method definitions before the formal vocabulary is introduced

**Key teaching insight:** MC-1 (LARGER-SAMPLE-FIXES-BIAS) is the single highest-leverage misconception in this concept because it removes the STUDENT'S OWN MOTIVATION to learn method distinctions at all — if "big enough" always wins, method choice seems irrelevant. The Literary Digest/Gallup 1936 case is reused deliberately across A02 (introduction), B01 (repair), and the A03 transfer probe (application) specifically because it is a single, memorable, real historical event that makes the abstract size-vs-bias distinction concrete and falsifiable (an actual wrong election prediction, not a hypothetical).

**MC-2 as a genuine terminology hazard:** Stratified and cluster sampling are frequently confused specifically because both begin with the identical first step ("divide the population into groups") — the entire teaching burden is on what happens AFTER that shared first step (sample within every group vs. sample whole groups), which A01's Stage P diagram and A02's Contrast 2 are both built to isolate visually.

**Sequencing note:** No cross-link concept exists yet for math.stats.sampling; the P76 transfer probe instead uses a fresh national-survey scenario deliberately combining all three misconceptions at once (a convenience sample, a cluster sample, and a small random sample), requiring the student to apply the size-vs-method distinction, correct method classification, and the random-vs-haphazard distinction together in a single ranking task.

---

## Component 10 — Validation Checklist

| Code | Rule | Check | Status |
|------|------|-------|--------|
| V-1 | Concept ID matches KG | math.stats.sampling ✓ | PASS |
| V-2 | All Tier-1 requires have existing blueprints | math.stats.population-sample ✓, math.prob.probability-axioms ✓ | PASS |
| V-3 | CPA entry = C for developing difficulty | C (Concrete) ✓ | PASS |
| V-4 | bloom=understand → P07 N/A | bloom=understand; no P07; V-4=N/A ✓ | N/A |
| V-5 | GR-1: A01 opens with B-category primitive | P11 REPRESENTATION SHIFT ✓ | PASS |
| V-6 | GR-2: each non-gate TA has P49 with 4 branches | A01, A02 each have P49 CORRECT/PARTIAL/INCORRECT/NO_RESPONSE ✓ | PASS |
| V-7 | GR-3: gate TA (A03) is terminal | A03=P91; no further TAs ✓ | PASS |
| V-8 | GR-4: repair TAs open with P27+P41+P64 | B01, B02, B03 each: P27→P41→P64 ✓ | PASS |
| V-9 | GR-6: P91 terminal in its TA | P91 is A03; A03 is the last TA ✓ | PASS |
| V-10 | GR-7: P76 present in mastery gate | P76 in A03 between P77 and P75 ✓ | PASS |
| V-11 | GR-8: cross_links documented in Component 7 | requires and unlocks documented ✓ | PASS |
| V-12 | GR-9: P76 mode correct for cross_links | no cross_links → P76=independence ✓ | PASS |
| V-13 | GR-10: MAMR stated and enforced | MAMR=5/5 stated in C0 and P75 gate ✓ | PASS |
| V-14 | MAMR formula correct | ⌈0.85×5⌉=⌈4.25⌉=5; PASS=5/5 ✓ | PASS |
| V-15 | P91 structure complete | P77(4)→P55→P76(1)→P55→P75→P55→P74→P55→P78 ✓ | PASS |
| V-16 | P77 has exactly 4 problems | Problems 1–4 verified ✓ | PASS |
| V-17 | 3 misconceptions with FOUNDATIONAL declared | MC-1 FOUNDATIONAL, MC-2, MC-3 ✓ | PASS |
| V-18 | P89 spaced repetition present | Component 6 with 4 SR intervals ✓ | PASS |
| V-19 | Structure matches h | h=3 → compact (2 main TAs + gate); A01+A02+A03 ✓ | PASS |
| V-20 | P76 transfer probe is novel and correct | National survey X/Y/Z ranking; size-vs-method reasoning ✓ | PASS |
| AIR | All internal references consistent | Concept IDs, MAMR, bloom, difficulty consistent throughout ✓ | PASS |
