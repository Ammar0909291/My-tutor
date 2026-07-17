# Teaching Blueprint — eng.grammar.subject-verb-agreement

---

## Component 0 — Concept Identity & Routing

```yaml
concept_id: eng.grammar.subject-verb-agreement
name: Subject-Verb Agreement
domain: english / grammar
difficulty:
  label: developing
  number: 2
bloom: apply
prerequisites:
  - eng.grammar.nouns
  - eng.grammar.verbs
  - eng.grammar.present-tenses
mastery_threshold: 0.80
estimated_hours: 2
cross_links: []
session_cap: 5 TAs
cpa_entry_stage: C (english/grammar domain → concrete/visual entry always)
status: READY / PACKAGE_READY
```

---

## Component 1 — Misconception Register

### MC-AGREE-WITH-THE-NEAREST-NOUN
- **Trigger signal:** Student makes the verb agree with whichever noun is CLOSEST to it, rather than the TRUE subject, especially when a prepositional phrase or other modifier sits between the subject and verb (e.g., "The box of toys ARE on the floor" — incorrectly agreeing with the nearby plural "toys" instead of the true singular subject "box").
- **Conflict evidence [P28]:** "You said 'The box of toys ARE on the floor.' What's the TRUE subject of this sentence — is it 'box' or 'toys'? Does 'of toys' change what the main subject is?"
- **Bridge text [P30]:** "The verb must agree with the TRUE subject, not whichever noun happens to sit closest to it. Prepositional phrases (of toys, in the room, with her friends) and other modifiers between the subject and verb don't change what the real subject is — mentally 'crossing out' these interrupting phrases helps identify the true subject to agree with."
- **Replacement text [P31]:** "Identify the TRUE subject first (ignoring any prepositional phrases or modifiers between subject and verb), then make the verb agree with that true subject, not the nearest noun."
- **Discrimination pairs [P33]:**
  - "The box of toys IS on the floor" (true subject "box," singular, correct agreement) vs. "The box of toys ARE on the floor" (incorrectly agrees with "toys").
  - "One of the students HAS finished" (true subject "one," singular) vs. "One of the students HAVE finished" (incorrectly agrees with "students").
- **s6_path:** "Agreeing with the closest noun is a very understandable shortcut, since it's right next to the verb — but mentally crossing out the interrupting phrase to find the TRUE subject is a reliable, learnable check."

### MC-COLLECTIVE-NOUNS-ARE-ALWAYS-PLURAL-VERBS
- **Trigger signal:** Student assumes collective nouns (team, family, group, committee — nouns naming a group treated as one unit) always take a plural verb because they refer to multiple individuals, when standard American English usage treats them as SINGULAR when the group acts as one unit ("The team IS playing well"), reserving plural verbs for cases emphasizing the individual members acting separately (less common, and more typical of British English usage in some contexts).
- **Conflict evidence [P28]:** "You said 'The team ARE playing well' because a team has many players. In standard American usage, when we're thinking of the team as ONE unit, do we usually use 'is' or 'are'?"
- **Bridge text [P30]:** "Collective nouns (team, family, group, committee, audience) name a group of individuals treated as a SINGLE unit — in standard American English, they typically take a SINGULAR verb when the group acts together as one ('The team IS playing well,' 'The family IS coming to dinner'). This may differ in British English, which more often uses plural verbs with collective nouns to emphasize the individual members, but standard American usage treats them as singular by default."
- **Replacement text [P31]:** "Treat collective nouns as singular (matching a singular verb) by default in standard American usage, since they represent a group acting as one unit."
- **Discrimination pairs [P33]:**
  - "The team IS practicing" (standard American usage, singular) vs. "The team ARE practicing" (this pattern is more typical of British English usage, not the American default).
  - "The committee HAS decided" (singular, group acting as one) vs. "The committee HAVE decided" (typical British usage variant).
- **s6_path:** "It feels logical that a word referring to many people should take a plural verb — but English (especially American usage) treats these group-words as singular units by convention, which is a specific, learnable rule rather than a logical derivation."

---

## Component 2 — Prerequisite Diagnostic Block

**PD-1 [P41] — Noun readiness**
Prompt: "In 'The dog barks,' identify the noun and whether it's singular or plural."
- Pass: correctly identifies "dog" as singular (per `eng.grammar.nouns`).
- Fail → [P52]: brief nouns refresher before proceeding. Persistent failure → route to eng.grammar.nouns for reteaching.

**PD-2 [P41] — Verb readiness**
Prompt: "In 'The dogs bark,' identify the verb."
- Pass: correctly identifies "bark" as the verb (per `eng.grammar.verbs`).
- Fail → [P52]: brief verbs refresher before proceeding. Persistent failure → route to eng.grammar.verbs for reteaching.

**PD-3 [P41] — Present-tenses readiness**
Prompt: "Why does 'she' take 'runs' but 'they' take 'run'?"
- Pass: correctly identifies the third-person singular "-s" pattern (per `eng.grammar.present-tenses`).
- Fail → [P52]: brief present-tenses refresher before proceeding. Persistent failure → route to eng.grammar.present-tenses for reteaching.

---

## Component 3 — Concrete Anchor [P06]

**Anchor scene — The cross-out-the-interrupter check**

> Write a sentence with an interrupting prepositional phrase between subject and verb on a card (e.g., "The box (of toys) ___ on the floor"). Physically cover/cross out the phrase in parentheses, revealing the true subject-verb relationship ("The box ___ on the floor" → clearly singular "is"). Practice this crossing-out technique on several examples to build a standing habit.

---

## Component 4 — Conceptual Development Sequence

**TA-1 — Basic Singular/Plural Agreement [C]**

Present simple sentences (no interrupting phrases); student selects the correctly agreeing verb form based on singular/plural subject.

**TA-2 — Agreement with Interrupting Phrases [C]**

Present sentences with prepositional phrases or modifiers between subject and verb; student uses the cross-out technique to find the true subject and agree correctly, directly targeting MC-AGREE-WITH-THE-NEAREST-NOUN.

**TA-3 — Collective Noun Agreement [C→P]**

Present sentences with collective nouns (team, family, committee, audience); student applies standard singular agreement, directly targeting MC-COLLECTIVE-NOUNS-ARE-ALWAYS-PLURAL-VERBS.

**TA-4 — Compound Subject Agreement (And vs. Or) [P]**

Present compound subjects joined by "and" (typically plural: "Tom and Jerry ARE friends") vs. "or/nor" (agrees with the nearer subject: "Neither the teacher nor the students ARE ready" / "Neither the students nor the teacher IS ready"); student applies the correct rule for each conjunction type.

**TA-5 — Indefinite Pronoun Agreement [P]**

Present sentences using indefinite pronoun subjects (everyone, someone, each — typically singular; several, many, few — typically plural); student applies correct agreement based on the specific indefinite pronoun's number.

---

## Component 5 — Worked Examples

**WE-1 (Foundational — basic agreement)**

> "Fill in: 'The cat ___ (chase/chases) the mouse.'"

Target response: "chases" — singular subject "cat" takes the "-s" verb form.

**WE-2 (Foundational — interrupting phrase)**

> "Fill in: 'The stack of papers ___ (is/are) on the desk.'"

Target response: "is" — true subject "stack" is singular, despite the plural "papers" nearby.

**WE-3 (Intermediate — collective noun)**

> "Fill in: 'The class ___ (is/are) taking a test.'"

Target response: "is" — standard American usage treats "class" as a singular collective unit.

---

## Component 6 — Mastery Probe Set

**MP-1 [P36] — Basic agreement, novel sentence**
"Fill in: 'The birds ___ (sing/sings) every morning.'"
*Target:* "sing" — plural subject "birds" takes the base form.

**MP-2 [P36] — Interrupting phrase, novel example**
"Fill in: 'One of the answers ___ (is/are) incorrect.'"
*Target:* "is" — true subject "one" is singular, despite the plural "answers" nearby.

**MP-3 [P36] — Collective noun, novel example**
"Fill in: 'The audience ___ (was/were) cheering loudly.'"
*Target:* "was" — standard American usage treats "audience" as singular.

**MP-4 [P36] — Compound subject with or/nor**
"Fill in: 'Neither the manager nor the employees ___ (was/were) available.'"
*Target:* "were" — agrees with the nearer subject "employees" (plural) in a "nor" construction.

**MP-5 [P36] — Explain subject-verb agreement**
"In your own words: how do you find the TRUE subject when there's a phrase in between, and are collective nouns like 'team' singular or plural?"
*Target:* states or demonstrates that the true subject (found by mentally crossing out interrupting phrases) determines agreement, not the nearest noun, and that collective nouns are typically treated as singular in standard American usage.

---

## Component 7 — Session Architecture

```
[P01] Session open — cross-out-the-interrupter check warm-up
  ↓
[P41] PD-1 (noun readiness)
  ↓ PASS
[P41] PD-2 (verb readiness)
  ↓ PASS
[P41] PD-3 (present-tenses readiness)
  ↓ PASS
[P06] Anchor: cross-out-the-interrupter check (reveal the true subject)
  ↓
TA-1: Basic singular/plural agreement [C]
  ↓
TA-2: Agreement with interrupting phrases [C]
  ↓
[P28] Conflict: agreeing with the nearest noun → MC-AGREE-WITH-THE-NEAREST-NOUN (if triggered)
  ↓
TA-3: Collective noun agreement [C→P]
  ↓
[P28] Conflict: collective nouns assumed always plural → MC-COLLECTIVE-NOUNS-ARE-ALWAYS-PLURAL-VERBS (if triggered)
  ↓
TA-4: Compound subject agreement (and vs. or) [P]
  ↓
TA-5: Indefinite pronoun agreement [P]
  ↓
[P51] Check-in WE-1 → WE-2 → WE-3
  ↓
[P36] MP-1 through MP-5 (mastery probe set)
  ↓
[P62] Retrieval seed: "Tomorrow, find one sentence with an interrupting phrase and check subject-verb agreement."
[P68] Session close
[P85] Regulation tail — praise finding the true subject over agreeing with the nearest noun
[P89] Retrieval schedule: 1 day, 3 days, 7 days
[P91] Mastery gate: 80%; re-route to Component 3 anchor if below
```

**Protocol routing:** S0 (secure on nouns/verbs/present-tenses, new to agreement rules specifically): dwell on TA-1's basic agreement before introducing interrupting phrases and collective nouns. S1 (already produces correct agreement fluently in simple sentences but errs on complex/interrupted structures): focus on TA-2/TA-4, since these are common, persistent error sources even for fluent speakers, especially in writing. S6 (frustrated by the number of agreement sub-rules): explicitly frame the cross-out technique as the single unifying strategy underlying most cases, reducing the sense of needing separate memorized rules for every situation. S9 (L1 doesn't mark subject-verb agreement the same way, e.g. many languages have no or different agreement systems, or marks agreement differently for collective/group nouns): expect this concept, especially interrupting-phrase and collective-noun cases, to require substantial dedicated practice, since these are well-documented persistent error areas even among advanced L2 English learners and writers.

---

## Component 8 — Adaptive Flags

- **Cross-out-the-interrupter is the single most valuable, reusable strategy**: teach this technique explicitly and revisit it whenever any agreement confusion arises, since it resolves the majority of complex agreement cases.
- **Collective nouns follow a specific American-English convention worth naming explicitly**: frame the singular-by-default rule as a specific convention (not pure logic) to reduce the sense of arbitrariness, and note the British-English variation for completeness without requiring mastery of dialect-switching.
- **And vs. or/nor produce genuinely different agreement rules**: teach compound-subject agreement as two distinct sub-rules (and = typically plural; or/nor = agrees with the nearer element) rather than a single unified rule.
- **Persistent, well-documented challenge area deserving sustained practice**: for S9 learners (and many native speakers in complex writing), budget ongoing practice specifically for interrupting-phrase and collective-noun agreement, since these remain common errors even at advanced proficiency.

---

## Component 9 — Validation Checklist

| Check | Criterion | Status |
|---|---|---|
| V-1 | concept_id matches KG exactly | PASS — eng.grammar.subject-verb-agreement |
| V-2 | All prerequisites exist in KG and have blueprints | PASS — eng.grammar.nouns ✓, eng.grammar.verbs ✓, eng.grammar.present-tenses ✓ (all authored) |
| V-3 | difficulty label matches KG | PASS — developing |
| V-4 | bloom level matches KG | PASS — apply |
| V-5 | mastery_threshold matches KG | PASS — 0.80 |
| V-6 | estimated_hours matches KG | PASS — 2h |
| V-7 | ≥ 2 misconceptions in register | PASS — MC-AGREE-WITH-THE-NEAREST-NOUN, MC-COLLECTIVE-NOUNS-ARE-ALWAYS-PLURAL-VERBS |
| V-8 | Each MC has all 5 fields | PASS |
| V-9 | ≥ 1 PD block per prerequisite | PASS — PD-1 (noun), PD-2 (verb), PD-3 (present-tenses readiness) |
| V-10 | Concrete anchor present [P06] | PASS — cross-out-the-interrupter check |
| V-11 | ≥ 4 TAs in development sequence | PASS — TA-1 through TA-5 |
| V-12 | ≥ 3 worked examples | PASS — WE-1, WE-2, WE-3 |
| V-13 | ≥ 5 mastery probes | PASS — MP-1 through MP-5 |
| V-14 | Session architecture references correct primitives | PASS — P01, P06, P28, P30, P31, P33, P36, P41, P51, P52, P62, P68, P85, P89, P91 |
| V-15 | session_cap correctly set | PASS — 5 TAs |
| V-16 | cpa_entry_stage correctly set | PASS — C (english/grammar domain always concrete/visual) |
| V-17 | Student-state routing covers plausible states | PASS — S0, S1, S6, S9 |
| V-18 | Adaptive flags address subject-specific hazards | PASS — cross-out strategy, American-convention framing, and/or-nor distinct rules, sustained-practice priority |
| V-19 | No implementation / framework changes introduced | PASS |
| V-20 | status field set | PASS — READY / PACKAGE_READY |
