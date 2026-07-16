# Teaching Blueprint: Population and Sample

## Component 0 — Metadata Header

| Field | Value |
|---|---|
| BLUEPRINT_ID | math.stats.population-sample |
| KG_ID | math.stats.population-sample |
| KG_VERSION | v1.0.1 |
| STATUS | PACKAGE_READY |
| DOMAIN | Statistics |
| NAME | Population and Sample |
| ALIASES | (none) |
| DIFFICULTY | developing |
| BLOOM | understand |
| MASTERY_THRESHOLD | 0.90 |
| ESTIMATED_HOURS | 2 |
| REQUIRES | math.arith.fractions |
| UNLOCKS | math.stats.descriptive-statistics, math.stats.sampling |
| CROSS_LINKS | (none) |
| CPA_ENTRY | C (Concrete) |
| SESSION_TA_CAP | 7 (hours ≥ 1h) |
| PROTOCOL_A_TA_COUNT | 4 (TA-A01 through TA-A04) |
| MASTERY_GATE_TA | TA-A04 (P91, terminal) |
| PASS_CRITERION | 5/5 (⌈0.90 × 5⌉ = 5; threshold = 0.90) |
| MAMR | MC-1 SAMPLE-IS-POPULATION is FOUNDATIONAL; cleared before MC-2 or MC-3 in all repair routing |
| P76_MODE | Independence (cross_links = []; self-contained real-world context) |

---

## Component 1 — Cognitive Map

### Prerequisites Activated
- **math.arith.fractions**: The sampling fraction n/N (sample size ÷ population size) and proportions from sample data use fraction arithmetic.

### Target Understanding
1. The population is the complete set of all units (people, objects, measurements) about which a conclusion is sought. It is defined by the research question and may be finite or conceptually infinite.
2. A sample is a subset of the population — the selected units actually studied. n denotes sample size; N denotes population size (when finite).
3. Statistical inference uses sample data to estimate population characteristics. Samples are studied because surveying the full population is often impossible, impractical, or too costly.
4. A representative sample reflects the population's characteristics proportionally and without systematic bias. A biased sample systematically over- or under-represents some segment.
5. Larger sample size alone does NOT guarantee representativeness. Sampling method (random selection vs. voluntary/convenience) is the primary determinant of representativeness.
6. The sampling fraction = n/N; meaningful when N is finite and known.

### Cross-Link Activation
- No cross-links. P76 uses an independence probe (national polling scenario).

---

## Component 2 — Misconception Registry

### MC-1 [FOUNDATIONAL] — SAMPLE-IS-POPULATION
- **Trigger**: Treating sample results as definitive truth for the entire population without qualification.
- **Root cause**: Learner doesn't distinguish "what I found in my sample" from "what is true in the population." Every data set studied is a sample of something larger, yet the distinction often goes unstated.
- **Error pattern**: "I surveyed 30 students and found 60% prefer pizza — so 60% of all students prefer pizza." No hedging; treats sample percentage as a known population percentage.
- **Repair**: TA-B01.
- **MAMR**: FOUNDATIONAL — addressed in TA-A02 via P41/P64; if triggered later, route to TA-B01 before returning.

### MC-2 — LARGER-IS-ALWAYS-BETTER
- **Trigger**: "1,000,000 respondents is always more accurate than 1,000 respondents, no matter how they were selected."
- **Root cause**: Intuition that more data = more accurate. Doesn't account for sampling bias.
- **Error pattern**: Rates a voluntary online poll of 10,000 as more trustworthy than a random sample of 500; dismisses the small random sample as "too small to matter."
- **Repair**: TA-B02.
- **MAMR**: After MC-1 cleared. FIFO with MC-3.

### MC-3 — POPULATION-IS-PEOPLE
- **Trigger**: "A population in statistics has to be a group of people."
- **Root cause**: Everyday usage of "population" means human population (residents of a city or country).
- **Error pattern**: Cannot identify the population in a study of manufactured parts, tree heights, or bacteria counts; says "there's no population here — it's not about people."
- **Repair**: TA-B03.
- **MAMR**: After MC-1 cleared. FIFO with MC-2.

---

## Component 3 — Scaffolding Protocol

### CPA Entry: Concrete
Open with the soup-tasting analogy (a pot of soup = population; a spoonful = sample) (Concrete). Pictorial: large circle labeled "Population N" containing smaller circle "Sample n." Abstract: sampling fraction n/N; notation for population parameter (μ) vs. sample statistic (x̄).

### MAMR Enforcement
MC-1 addressed in TA-A02 (P41/P64). Route → TA-B01 if triggered later. MC-2 and MC-3 FIFO.

---

## Component 4 — Protocol A (Main Teaching Sequence)

### TA-A01 — Population and Sample: Core Definitions
**Primitives**: P03 → P11 → P49

**P03 (ANALOGY BRIDGE):**
- **Source**: A chef tasting soup. The full pot of soup = the population (everything of interest). The chef takes one spoonful = the sample (the piece studied). Based on that spoonful, the chef judges the whole pot: "needs more salt." The chef doesn't finish the whole pot — the spoonful (sample) represents the population (pot).
- **Target**: The population is the complete group under study; the sample is the selected subset actually examined. Inferences about the population are drawn from the sample.
- **Key insight**: The spoonful must be representative — well-stirred, from the middle of the pot. A spoonful from the saltiest top layer would mislead the chef. The quality of inference depends on how well the sample represents the population.

**P11 (REPRESENTATION SHIFT):**
Three representations of the population–sample relationship:
| Representation | Form | Key feature |
|---|---|---|
| Diagram | Large circle (N units, label "Population") with smaller circle inside (n units, label "Sample") | Sample is a proper subset of the population |
| Symbolic | N = population size; n = sample size; Sampling fraction = n/N | Quantifies how much of the population is sampled |
| Verbal | "We studied n = 200 patients randomly selected from a population of N = 10,000 hospital patients." | Explicit scope statement required in any study report |

**P49:** "A researcher wants the average height of all 1,000 students in a school. She measures 50 randomly chosen students. What is the population? What is the sample?"
- **CORRECT**: Population = all 1,000 students in the school. Sample = the 50 measured students. → TA-A02.
- **PARTIAL**: Clarify which is the complete group of interest (1,000 students = population) and which is the actually studied subset (50 students = sample). → TA-A02.
- **INCORRECT/NO_RESPONSE**: "POPULATION = what you want to learn about — all 1,000. SAMPLE = what you actually study — the 50 you measured." → TA-A02.

---

### TA-A02 — Misconception Gate: SAMPLE-IS-POPULATION (FOUNDATIONAL)
**Primitives**: P41 → P64 → P49

**P41 (MISCONCEPTION DETECTOR):**
Probe: "A student polls her 25 classmates and finds 80% own a smartphone. She concludes '80% of all teenagers own a smartphone.' Is this conclusion justified?"
- If learner says "yes — 80% of teenagers own smartphones": proceed to P64.
- If learner says "no — 25 classmates may not represent all teenagers": validate and advance.

**P64 (CONCEPTUAL SHIFT):**
"The student's SAMPLE is 25 classmates. The claimed POPULATION is all teenagers. These are different things:
- SAMPLE result (what she found): 80% of her 25 classmates own smartphones.
- POPULATION claim (what she concluded): 80% of ALL teenagers own smartphones.

To make that population claim, she would need a sample that REPRESENTS all teenagers — different regions, income levels, school types. 25 classmates is a convenient sample that likely mirrors only her immediate social circle.

Correct statement: '80% of the 25 surveyed classmates own smartphones. This ESTIMATES (but does not establish) the population proportion, with significant uncertainty given the small and non-random sample.'"

**P49:** "The same student then randomly selects 500 students from 100 different schools nationwide. Is this sample more likely to represent all teenagers?"
- **CORRECT**: Yes — random selection across diverse schools reduces the bias of "only my friends." → TA-A03.
- **PARTIAL**: "Random sampling from geographically diverse schools avoids the convenience-sample bias. More representative method → more trustworthy estimate." → TA-A03.
- **INCORRECT/NO_RESPONSE**: → TA-B01, then return.

---

### TA-A03 — Representative Samples and Bias
**Primitives**: P06 → P49

**P06 (CONTRAST PAIR):**
| | Representative Sample | Biased Sample |
|---|---|---|
| Definition | Reflects population proportionally; no systematic over/under-representation | Systematically misrepresents some population segment |
| Example | 500 voters randomly drawn from registered voter rolls | Voluntary online poll (only motivated respondents reply) |
| Is larger always better? | Larger random sample → smaller uncertainty | Larger biased sample → still biased |
| Key factor | Sampling METHOD (random = unbiased) | Sampling METHOD (self-selected = biased) |

Historical anchor: The 1936 Literary Digest poll surveyed 2.4 million Americans and predicted the wrong presidential winner — because it sampled from telephone directories and car registrations, which excluded lower-income voters. A Gallup poll of 50,000 random voters called the election correctly. Method beat size by a ratio of 48 to 1.

**P49:** "Which gives a better estimate of city residents' opinions: (A) 500 residents selected by random phone dialing from the full city directory; (B) 5,000 volunteers who saw an online ad and chose to respond?"
- **CORRECT**: A — despite being smaller, random selection avoids self-selection bias. B's respondents chose to participate, over-representing those with strong opinions. → TA-A04.
- **PARTIAL**: "B's volunteers self-selected — strong opinions over-represented. A's participants were randomly selected — no self-selection. Method > size." → TA-A04.
- **INCORRECT/NO_RESPONSE**: "More data doesn't fix bias. A biased method on 5,000 respondents gives a biased result. A random method on 500 gives an unbiased estimate." → TA-A04.

---

### TA-A04 — P91 Mastery Gate (Terminal)
**Primitive**: P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78

**[GR-3: Terminal TA]** **[GR-6: P91 terminal]** **[GR-7: P76 present]**

**P77 (MULTI-PROBLEM SET):**
Q1: A biologist studies all fish in a lake by capturing and measuring 200 fish, then releasing them. What is the population? What is the sample?
Q2: True or False: A sample of 10,000 is always more reliable than a sample of 100.
Q3: A factory produces 50,000 bolts per day. A quality inspector tests 250 randomly selected bolts. What is the sampling fraction?
Q4: Why might surveying only people who voluntarily respond to an online poll produce a biased sample?

**P55 (SCORE):**
Q1: Population = all fish in the lake. Sample = the 200 captured and measured fish.
Q2: FALSE — a larger sample is not automatically more reliable. A biased sampling method produces biased results regardless of size.
Q3: Sampling fraction = n/N = 250/50,000 = 1/200 = 0.5%.
Q4: Voluntary respondents self-select: people with strong opinions are more likely to respond, so their views are over-represented. Those with moderate or no opinion are under-represented. The result is systematically biased.

**P76 (TRANSFER PROBE — Independence):**
A polling company wants to estimate the percentage of adults nationwide who support a proposed tax policy. They randomly select 1,000 adults from a national voter registration database and interview them.
(a) What is the population?
(b) What is the sample?
(c) A critic says: "1,000 people is far too small — you need at least 100,000 to get an accurate result." Evaluate this criticism.

**Expected**: (a) Population = all adults nationwide (the group whose opinion is being estimated). (b) Sample = the 1,000 randomly selected adults interviewed. (c) The criticism confuses size with method. A random sample of 1,000 from a national database can produce accurate national estimates (standard practice for national polls); the critical factor is that the 1,000 were randomly selected, not that 100,000 were sampled. An unrepresentative sample of 100,000 would still be biased.

**P55 (SCORE):** Population correctly identified; sample identified; size-vs-method distinction correctly explained.

**P75 (MASTERY ASSESSMENT):** Items: Q1, Q2, Q3, Q4, P76 = **5 items**. Pass: **5/5** (⌈0.90×5⌉ = 5).
- PASS → P78.
- FAIL → P74.

**P74 (ROUTING DECISION):**
- PASS → P78.
- Q1 or P76(a,b) wrong → TA-B01 (SAMPLE-IS-POPULATION; apply MAMR).
- Q2 or P76(c) wrong → TA-B02 (LARGER-IS-ALWAYS-BETTER).
- Q1 wrong due to non-human population confusion → TA-B03 (POPULATION-IS-PEOPLE).
- Multiple → MAMR: TA-B01 first; FIFO TA-B02, TA-B03; re-gate.

**P78 (COMPLETION):** Mastery confirmed. Schedule P89. Activate: math.stats.descriptive-statistics, math.stats.sampling.

---

## Component 5 — Protocol B (Repair Chains)

### TA-B01 — Repair MC-1 SAMPLE-IS-POPULATION
**Primitives**: P41 → P06 → P64 → P49

**P41**: "You stated the sample result as a fact about the population — what is the difference between what you measured (sample) and what you want to know about (population)?"

**P06 (CONTRAST):**
| | Sample statistic | Population parameter |
|---|---|---|
| Definition | Computed from the n studied units | True value for all N population units |
| Example | x̄ = 5.3 cm (sample mean) | μ = ? (population mean, typically unknown) |
| Certainty | Known exactly (we computed it) | Unknown unless we study the entire population |
| Role | Estimates the population parameter | The target of inference |

**P64**: "A SAMPLE STATISTIC (x̄, sample proportion) is a number computed from your data. A POPULATION PARAMETER (μ, population proportion) is the true value you want to know but usually can't measure directly. The sample statistic ESTIMATES the population parameter — they are not the same. Saying '80% of my sample prefers X' does not mean '80% of the population prefers X'; it means '80% of my sample prefers X, which estimates the population percentage.'"

**P49**: "A random sample of 100 households in a city has a mean income of $55,000. The population is all 500,000 households. Is the population mean income exactly $55,000?"
- **CORRECT**: Not necessarily — $55,000 is the sample mean, an estimate of the unknown population mean. → return.
- **PARTIAL/INCORRECT/NO_RESPONSE**: "$55,000 is the SAMPLE mean. We ESTIMATE the population mean is around $55,000, but we'd need all 500,000 households to know exactly." → return.

---

### TA-B02 — Repair MC-2 LARGER-IS-ALWAYS-BETTER
**Primitives**: P06 → P27 → P49

**P27**: "MC-2 LARGER-IS-ALWAYS-BETTER: 'Bigger sample = always better.' Wrong. Size without proper method gives more of the same bias. The 1936 Literary Digest disaster: 2.4 million surveys, wrong answer — because the sample was drawn from telephone directories and car registrations (excluding poorer voters). Gallup's 50,000 random sample called the election correctly. The key variable is REPRESENTATIVENESS, which comes from the sampling METHOD, not the sample size."

**P06 (CONTRAST):**
| | Large biased sample | Small random sample |
|---|---|---|
| Sample size | Very large (e.g., 2,400,000) | Modest (e.g., 50,000 or even 1,000) |
| Sampling method | Self-selected, biased list, convenience | Random selection from target population |
| Reliability | Low — systematic bias persists | High — unbiased estimate |
| Lesson | Garbage in, garbage out — regardless of volume | Method determines validity; size determines precision |

**P49**: "Which gives a better estimate of voter preferences: (A) 500,000 self-selected online respondents; (B) 2,000 randomly selected registered voters?"
- **CORRECT**: B — random selection removes self-selection bias, regardless of smaller size. → return.
- **PARTIAL/INCORRECT/NO_RESPONSE**: "A is self-selected — strong opiners over-represented. B is random — every registered voter had an equal chance. Method wins over size." → return.

---

### TA-B03 — Repair MC-3 POPULATION-IS-PEOPLE
**Primitives**: P27 → P06 → P49

**P27**: "MC-3 POPULATION-IS-PEOPLE: 'A statistical population has to be people.' Wrong. In statistics, a POPULATION is any complete, well-defined collection of units of interest — people, manufactured items, measurements, biological specimens, even abstract outcomes. The word comes from the general idea of 'everything in the defined group,' not just humans."

**P06 (CONTRAST):**
| Study | Population | Sample |
|---|---|---|
| Election poll | All registered voters in the country | 1,000 randomly selected voters |
| Factory quality control | All bolts produced in one day (50,000) | 250 randomly inspected bolts |
| Ecology | All redwood trees in California | 150 randomly sampled trees |
| Medical lab | All blood samples from a hospital's storage | 40 randomly tested vials |
| Probability | All possible coin-flip outcomes (conceptually infinite) | 100 observed flips |

**P49**: "A pharmaceutical company tests a new drug on 300 randomly chosen lab mice from a colony of 3,000. What is the population?"
- **CORRECT**: The population is all 3,000 lab mice in the colony — not people. → return.
- **PARTIAL/INCORRECT/NO_RESPONSE**: "The POPULATION is defined by the study: all 3,000 mice. The sample is the 300 actually tested. Populations don't have to be people." → return.

---

## Component 6 — P89 Spaced Repetition Schedule

| Interval | Review Content | Pass Criterion |
|---|---|---|
| Day 1 | Q1 (population vs. sample) + Q2 (size fallacy) | 2/2 |
| Day 3 | Q3 (sampling fraction) + P76 (a, b) | 2/2 |
| Day 7 | Mixed 2-item: identify population and sample in a novel study; explain one source of bias | 2/2 |
| Day 21 | Q1, Q2, Q3, Q4 (4 items) | 4/4 |
| Day 60 | Full 5-item mastery gate | 5/5 |

**Decay**: Failure → reset to Day 1 + TA-B routing.

---

## Component 7 — Cross-Blueprint Dependencies

### Input Dependencies
| Blueprint | KG ID | What it supplies |
|---|---|---|
| Fractions | math.arith.fractions | Sampling fraction n/N; percentages and proportions from sample data |

### Output Unlocks
| Blueprint | KG ID | What this blueprint enables |
|---|---|---|
| Descriptive Statistics | math.stats.descriptive-statistics | Descriptive statistics summarize sample data; the population–sample distinction determines which statistics are parameters vs. estimates |
| Sampling | math.stats.sampling | Sampling methods (random, stratified, cluster, convenience) build on the foundational population–sample framework |

### Cross-Links
- None.

---

## Component 8 — Teaching Notes

1. **Population size**: N is meaningful when finite and known. For conceptually infinite populations (all possible measurements, all future coin flips), N is not defined and the sampling fraction is effectively 0 — don't force a numerical sampling fraction calculation in these cases.
2. **Inference vs. description**: At this stage, "inference" is mentioned but not taught. The distinction (sample mean estimates population mean) primes the learner for descriptive statistics and hypothesis testing; the formal tools appear in later blueprints.
3. **Literary Digest 1936**: This is the most memorable example of MC-2. Use it in TA-B02 whenever available — the scale (2.4 million wrong vs. 50,000 correct) is striking and counterintuitive.
4. **Bloom=understand**: Learners must EXPLAIN why a sample is or is not representative, and WHY larger size alone doesn't guarantee reliability. Application to novel scenarios (Q4, P76) is required, not just definition recall.

---

## Component 10 — Validation Checklist

| Check | Criterion | Status |
|---|---|---|
| V-1 | Blueprint ID matches KG node ID | ✓ math.stats.population-sample |
| V-2 | KG node ID exists in graph.json v1.0.1 | ✓ Verified |
| V-3 | All Component 0 fields populated | ✓ |
| V-4 | DIFFICULTY matches KG (developing) | ✓ |
| V-5 | BLOOM matches KG (understand) | ✓ |
| V-6 | MASTERY_THRESHOLD matches KG (0.90) | ✓ |
| V-7 | ESTIMATED_HOURS matches KG (2) | ✓ |
| V-8 | REQUIRES listed; blueprint exists | ✓ math.arith.fractions ✓ |
| V-9 | CPA_ENTRY correct (developing → C) | ✓ C |
| V-10 | SESSION_TA_CAP correct (hours=2 ≥ 1h → max 7; used 4) | ✓ 4 ≤ 7 |
| V-11 | GR-1: non-repair TAs open with B-category primitive | ✓ A01:P03, A02:P41, A03:P06 |
| V-12 | GR-2: every non-gate TA has P49 | ✓ TA-A01, TA-A02, TA-A03 |
| V-13 | GR-3: mastery gate TA is terminal | ✓ TA-A04 uses P91 |
| V-14 | GR-4: P41/P64 gates repair chain in TA-A02 | ✓ P41 detects MC-1; P64 shifts sample-result→population-estimate |
| V-15 | GR-6: P91 terminal in TA-A04 | ✓ |
| V-16 | GR-7: P76 in mastery gate | ✓ P76 independence probe (national tax poll) |
| V-17 | GR-8: cross_links documented | ✓ (none) — stated in Component 0 and Component 7 |
| V-18 | GR-9: P76 mode correct (cross_links=[] → independence probe) | ✓ |
| V-19 | GR-10: MAMR stated and enforced | ✓ MC-1 FOUNDATIONAL; P74 routing |
| V-20 | Protocol B TAs open with B-category primitive | ✓ B01:P41, B02:P06, B03:P27 |
| AIR | All content fully specified; human tutor can execute without AI | ✓ |

**PACKAGE_READY**: V-1 through V-20 PASS. AIR PASS.
