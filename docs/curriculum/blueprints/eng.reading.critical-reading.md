# Teaching Blueprint: Critical Reading

## Component 0 — Concept Identity & Routing

```yaml
concept_id: eng.reading.critical-reading
name: Critical Reading
domain: english/reading
difficulty:
  label: advanced
  numeric: 4
bloom: evaluate
prerequisites:
  - eng.reading.close-reading
mastery_threshold: 0.75
estimated_hours: 3
cross_links:
  - eng.reading.evaluating-sources
  - eng.composition.rhetorical-analysis
session_cap: 5
cpa_entry_stage: concrete/visual
status: draft
```

## Component 1 — Misconception Register

### MC-CRITICAL-READING-MEANS-FINDING-FAULT-OR-DISAGREEING-WITH-THE-TEXT
- **Trigger signal:** Student interprets "critical" reading as meaning the reader must find something wrong with, disagree with, or criticize the text — searching for flaws even when a text is genuinely well-argued and credible, rather than understanding "critical" in its analytical sense (evaluating evidence, assumptions, and credibility, which may lead to agreement, disagreement, or qualified acceptance).
- **Conflict evidence [P28]:** Present a well-researched, carefully-argued article with strong evidence and no significant flaws. Ask the student to "critically read" it. If the student forces some manufactured criticism to satisfy the "critical" label, contrast this with a critical reading that concludes "this argument is well-supported because the evidence comes from credible sources and addresses likely counterarguments" — a genuine critical evaluation that happens to result in a positive assessment.
- **Bridge text [P30]:** "'Critical' in critical reading doesn't mean 'negative' or 'fault-finding' — it means evaluative: carefully examining evidence, assumptions, and credibility rather than accepting claims at face value. Sometimes that careful examination leads you to conclude a text IS credible and well-argued — that's still critical reading, because you evaluated it rather than just believing it automatically."
- **Replacement text [P31]:** "Don't force disagreement to prove you're 'being critical.' Instead, genuinely evaluate: what evidence supports this claim? Is the evidence credible? Are there unstated assumptions? Your conclusion — agreement, disagreement, or something in between — should follow from that genuine evaluation, not be decided in advance."
- **Discrimination pairs [P33]:** (a) Critical-as-fault-finding (critical reading requires identifying flaws or disagreeing with the text) vs. (b) Critical-as-evaluative-analysis (critical reading means genuinely evaluating evidence/assumptions/credibility, which can validly conclude the text is credible and well-argued).
- **s6_path:** If detected, drop to PD-1 re-check, then re-run TA-1's evaluation-not-verdict framing before continuing.

### MC-IF-A-TEXT-CITES-SOURCES-OR-STATISTICS-ITS-CLAIMS-ARE-AUTOMATICALLY-CREDIBLE
- **Trigger signal:** Student treats the mere presence of citations, statistics, or expert quotations as sufficient proof of credibility, without examining whether those sources are actually relevant, current, unbiased, or correctly interpreted — accepting a text's evidentiary trappings uncritically rather than evaluating the evidence itself.
- **Conflict evidence [P28]:** Present a passage citing "a study" to support a claim, without naming the study, its sample size, its date, or its source — versus a passage citing a specific, recent, peer-reviewed study with a reasonable sample size from a relevant field. Ask the student whether both citations deserve equal trust just because both "cite a source."
- **Bridge text [P30]:** "Citing something isn't the same as citing something credible. A vague reference to 'a study' with no details is far weaker evidence than a specific, well-sourced, relevant citation — even though both LOOK like they're backing up a claim with evidence. You have to evaluate the quality of the citation itself, not just its presence."
- **Replacement text [P31]:** "When you see a citation or statistic, ask: is the source specific and identifiable? Is it recent and relevant to the claim? Is it from a credible, relevant field? A vague or outdated citation doesn't earn the same trust as a well-specified, relevant one, even though both 'have a source.'"
- **Discrimination pairs [P33]:** (a) Citation-presence-equals-credibility (any cited source or statistic automatically makes a claim credible) vs. (b) Citation-quality-evaluation (credibility depends on evaluating the source's specificity, relevance, currency, and reliability, not merely whether a citation exists).
- **s6_path:** If detected, drop to PD-1, then re-present the Concrete Anchor's credential-check framing before continuing to TA-3.

## Component 2 — Prerequisite Diagnostic Block

### PD-1: Close-Reading Readiness
- **Tests:** Can the student already perform strategic, evidence-based textual analysis — the foundational skill critical reading extends into evaluative judgment about credibility and argument quality?
- **Probe:** Give a short argumentative passage and ask the student to identify its main claim and one piece of evidence supporting it.
- **Pass condition:** Correctly identifies both.
- **Fail routing:** If close-reading analysis is weak, route to `eng.reading.close-reading` review — critical reading requires this same analytical foundation before adding evaluative judgment.

## Component 3 — Concrete Anchor [P06]

**"The Evidence Credential Check."** Present a courtroom-style "witness stand" metaphor: each piece of evidence in a text is a "witness" that must be cross-examined before being trusted. Give the student 4 evidence cards (a vague "studies show" claim, a specific named recent study, an outdated statistic from 20 years ago, an expert quote from someone outside their field of expertise) and have the student "cross-examine" each by asking a checklist of questions (Is the source specific? Is it recent/relevant? Is the person/study actually qualified on this topic?) before deciding how much to trust each witness — directly seeding MC-IF-A-TEXT-CITES-SOURCES-OR-STATISTICS-ITS-CLAIMS-ARE-AUTOMATICALLY-CREDIBLE's fix. Separately, present a genuinely strong, well-argued text and have the student conduct a full "critical reading" that concludes with a credibility verdict of "well-supported, evidence checks out" — demonstrating that critical reading is a genuine evaluation process, not a predetermined search for flaws (seeding MC-CRITICAL-READING-MEANS-FINDING-FAULT-OR-DISAGREEING-WITH-THE-TEXT's fix).

## Component 4 — Conceptual Development Sequence

### TA-1: Evaluation, Not a Predetermined Verdict
Present a well-argued text and have the student conduct a genuine critical evaluation, allowing for the honest conclusion that the text is credible and well-supported. Directly counters MC-CRITICAL-READING-MEANS-FINDING-FAULT-OR-DISAGREEING-WITH-THE-TEXT.

### TA-2: Evidence Credential Checks
Using the discrimination pairs from MC-IF-A-TEXT-CITES-SOURCES-OR-STATISTICS-ITS-CLAIMS-ARE-AUTOMATICALLY-CREDIBLE, present 4 evidence citations of varying quality (as in the Concrete Anchor) and have the student cross-examine each using the specificity/relevance/currency/qualification checklist.

### TA-3: Identifying Unstated Assumptions
Teach the student to identify assumptions an argument relies on but never states explicitly (e.g., an argument for a policy that assumes, without stating, that cost is the only relevant factor). Student practices surfacing hidden assumptions in 3 short arguments.

### TA-4: Detecting Bias and Perspective
Teach signals of potential bias (one-sided evidence presentation, loaded language, omission of counterarguments, funding/interest conflicts) and have the student identify these signals in 2 passages with detectable bias.

### TA-5: Full Critical Evaluation of a Novel Text
Student conducts a complete critical reading of a new, unscaffolded argumentative text: evaluates evidence credibility, identifies assumptions, checks for bias, and produces an overall credibility judgment with justification — the generative capstone.

## Component 5 — Worked Examples

### WE-1: Genuine Evaluation (Scaffolded)
**Text:** A well-researched article about a health topic, citing specific, recent, peer-reviewed studies from qualified researchers, addressing likely counterarguments.
**Walkthrough:** Conduct a critical reading and arrive at the honest conclusion: "this text is well-supported — the evidence is specific, recent, and from qualified sources, and counterarguments are addressed," demonstrating that critical evaluation validly supports a positive credibility verdict.

### WE-2: Evidence Credential Check (Guided)
**Citations to evaluate:** "Studies show most people prefer this option" (vague, no source) vs. "A 2024 survey of 2,000 participants published in [named journal] found 68% preferred this option" (specific, recent, sourced).
**Walkthrough:** Apply the cross-examination checklist; confirm the second citation earns significantly more trust due to its specificity, currency, and identifiable source.

### WE-3: Full Critical Reading (Independent)
**Text:** An opinion article arguing for a controversial policy change, citing one outdated statistic, omitting any counterarguments, and using emotionally loaded language throughout.
**Walkthrough:** Student identifies the outdated statistic as weak evidence, notes the omission of counterarguments as a bias signal, flags the loaded language, and produces a critical verdict: "this argument is weakly supported due to outdated evidence, one-sided presentation, and biased language" — a genuine evaluative conclusion, not a predetermined judgment.

## Component 6 — Mastery Probe Set

**MP-1 [P36] — Produce a genuine positive credibility verdict**
Given a well-argued, well-supported text, student conducts a critical evaluation and honestly concludes the text is credible, rather than manufacturing criticism. *(Directly targets MC-CRITICAL-READING-MEANS-FINDING-FAULT-OR-DISAGREEING-WITH-THE-TEXT.)*

**MP-2 [P36] — Distinguish citation quality**
Given two citations of differing quality (vague vs. specific/recent/sourced), student correctly evaluates and ranks their credibility rather than trusting both equally. *(Directly targets MC-IF-A-TEXT-CITES-SOURCES-OR-STATISTICS-ITS-CLAIMS-ARE-AUTOMATICALLY-CREDIBLE.)*

**MP-3 [P36] — Identify an unstated assumption**
Given an argument, student identifies at least one assumption the argument relies on without stating it explicitly.

**MP-4 [P36] — Detect bias signals**
Given a passage with detectable bias, student identifies at least 2 specific bias signals (loaded language, omitted counterarguments, one-sided evidence).

**MP-5 [P36] — Full novel-text critical evaluation**
Given a novel argumentative text, student produces a complete critical evaluation covering evidence quality, assumptions, and bias, with an overall justified credibility verdict.

## Component 7 — Session Architecture

```
[PD-1: Close-Reading Readiness Check]
        |
        v
[Concrete Anchor: The Evidence Credential Check]
        |
        v
[TA-1: Evaluation, Not a Predetermined Verdict]
        |
        v
[TA-2: Evidence Credential Checks]
        |
        v
[TA-3: Identifying Unstated Assumptions]
        |
        v
[TA-4: Detecting Bias and Perspective]
        |
        v
[TA-5: Full Critical Evaluation of a Novel Text]
        |
        v
[WE-1] --> [WE-2] --> [WE-3]
        |
        v
[MP-1 through MP-5]
```

**Protocol routing paragraph:** At session open (S0), confirm PD-1 passes — critical reading extends close reading's evidence-based analytical habit into evaluative judgment about credibility, so weak close-reading skill undermines the more demanding evaluative task. During instruction (S1), watch for both misconception patterns: forcing fault-finding (MC-CRITICAL-READING-MEANS-FINDING-FAULT-OR-DISAGREEING-WITH-THE-TEXT) and accepting citations uncritically (MC-IF-A-TEXT-CITES-SOURCES-OR-STATISTICS-ITS-CLAIMS-ARE-AUTOMATICALLY-CREDIBLE) both substitute a shortcut for genuine evaluation — redirect both to the Evidence Credential Check anchor. If the student manufactures criticism of a strong text or accepts a weak citation during TA-1/TA-2 (S6), drop back to the Concrete Anchor's cross-examination checklist before returning to independent evaluation. At mastery-probe stage (S9), do not certify mastery unless MP-1 and MP-2 both pass — a student who identifies assumptions and bias correctly (MP-3/MP-4) but still forces a predetermined verdict or trusts weak citations has not learned the core evaluative judgment this concept requires.

## Component 8 — Adaptive Flags

- If the student manufactures criticism of well-argued texts, weight remediation toward MC-CRITICAL-READING-MEANS-FINDING-FAULT-OR-DISAGREEING-WITH-THE-TEXT's bridge text and re-run TA-1's genuine-evaluation practice before returning to independent critical reading.
- If the student trusts any cited source equally regardless of quality, weight remediation toward MC-IF-A-TEXT-CITES-SOURCES-OR-STATISTICS-ITS-CLAIMS-ARE-AUTOMATICALLY-CREDIBLE's bridge text and TA-2's credential-check practice specifically.
- This concept feeds two direct downstream unlocks (`eng.reading.evaluating-sources`, `eng.composition.rhetorical-analysis`) — do not certify mastery without TA-5's full novel-text evaluation, since both downstream concepts assume the student can already independently evaluate credibility without heavy scaffolding.
- Reuse the "evidence credential check" framing explicitly when introducing `eng.reading.evaluating-sources` — that concept formalizes the same source-quality evaluation into a systematic source-evaluation framework for research contexts.

## Component 9 — Validation Checklist

| ID | Check | Result |
|----|-------|--------|
| V-1 | Concept identity block complete (id, name, domain, difficulty, bloom, prerequisites, mastery_threshold, estimated_hours, cross_links, session_cap, cpa_entry_stage) | PASS |
| V-2 | Exactly 2 misconceptions registered | PASS |
| V-3 | Each misconception has trigger, conflict evidence, bridge, replacement, discrimination pairs, s6_path | PASS |
| V-4 | At least 1 prerequisite diagnostic block present | PASS |
| V-5 | Concrete anchor tagged [P06] and physically/visually manipulable | PASS |
| V-6 | Conceptual development sequence has 5 TAs matching session_cap | PASS |
| V-7 | TAs progress from recognition to construction (concrete → generative) | PASS |
| V-8 | 3 worked examples present (WE-1 to WE-3) | PASS |
| V-9 | Worked examples span scaffolded → guided → independent difficulty | PASS |
| V-10 | Counterexample present where appropriate (vague vs. specific citation) | PASS |
| V-11 | Mastery probes each tagged [P36] | PASS |
| V-12 | ≥ 5 mastery probes present | PASS |
| V-13 | Mastery probes map to both misconceptions | PASS |
| V-14 | Mastery probes include at least one generative/constructive task | PASS |
| V-15 | Session architecture diagram present with primitive tags | PASS |
| V-16 | Protocol routing paragraph covers S0/S1/S6/S9 | PASS |
| V-17 | Adaptive flags present (≥ 4 bullets) | PASS |
| V-18 | Cross-links to downstream concepts referenced in adaptive flags | PASS |
| V-19 | No modification to Knowledge Graph, schema, or runtime code | PASS |
| V-20 | Blueprint content grounded in verified KG node data (requires/unlocks/difficulty/bloom/mastery_threshold/estimated_hours) | PASS |
