# Teaching Blueprint — eng.grammar.pronoun-antecedent-agreement

---

## Component 0 — Concept Identity & Routing

```yaml
concept_id: eng.grammar.pronoun-antecedent-agreement
name: Pronoun-Antecedent Agreement
domain: english / grammar
difficulty:
  label: proficient
  number: 3
bloom: apply
prerequisites:
  - eng.grammar.pronouns
  - eng.grammar.subject-verb-agreement
mastery_threshold: 0.75
estimated_hours: 1
cross_links: []
session_cap: 4 TAs
cpa_entry_stage: C (english/grammar domain → concrete/visual entry always)
status: READY / PACKAGE_READY
```

---

## Component 1 — Misconception Register

### MC-INDEFINITE-PRONOUNS-ARE-ALWAYS-PLURAL
- **Trigger signal:** Student uses a plural pronoun to refer back to singular indefinite-pronoun antecedents (everyone, someone, each, everybody, anybody), reasoning that words like "everyone" refer to many people so should take a plural pronoun — e.g., "Everyone brought their own lunch" is common in casual usage, but in STRICT standard/formal grammar, "everyone" is singular and traditionally pairs with "his or her" (though "their" as a gender-neutral singular is increasingly accepted in modern standard usage — the key misconception is not recognizing indefinite pronouns' singular grammatical status at all).
- **Conflict evidence [P28]:** "You said 'everyone' should get a plural pronoun because it means a lot of people. But does 'everyone' pair with 'is' or 'are' — 'Everyone IS here' or 'Everyone ARE here'? What does that tell you about whether 'everyone' is grammatically singular or plural?"
- **Bridge text [P30]:** "Indefinite pronouns like 'everyone,' 'someone,' 'each,' 'everybody,' 'anybody' are grammatically SINGULAR, even though they refer to a group of people conceptually — this is confirmed by their singular verb agreement ('Everyone IS here,' not 'ARE'). Traditionally, formal grammar pairs these with 'his or her'; modern standard usage increasingly accepts singular 'they/their' as a gender-neutral option, but recognizing these words' singular grammatical STATUS (regardless of which pronoun option you choose) is the key point."
- **Replacement text [P31]:** "Check an indefinite pronoun's verb agreement (is/are) to confirm it's grammatically singular before choosing an appropriately agreeing pronoun."
- **Discrimination pairs [P33]:**
  - "Everyone IS here" (singular verb, confirming "everyone" is singular) vs. incorrectly reasoning "everyone" must be plural because it means many people.
  - "Each student HAS their own locker" (singular "has," singular-grammatically-but-gender-neutral "their," now broadly standard) vs. "Each students HAVE their own lockers" (incorrect double pluralization).
- **s6_path:** "It's a very reasonable, logical assumption that a word referring to a group of people should be grammatically plural — but 'everyone/someone/each' are treated as singular by English grammar convention, confirmed by checking their verb agreement."

### MC-AMBIGUOUS-PRONOUN-REFERENCE-IS-FINE-IF-CONTEXT-SEEMS-CLEAR
- **Trigger signal:** Student writes sentences with an ambiguous pronoun (unclear which of two or more possible antecedents it refers to), assuming the intended meaning is "obvious enough" from context, without recognizing that a reader/listener without the writer's inside knowledge may genuinely be unable to determine which antecedent is meant (e.g., "Sarah told Maria that she had won the award" — "she" could refer to either Sarah or Maria, and only the writer knows which).
- **Conflict evidence [P28]:** "In 'Sarah told Maria that she had won the award,' who won the award — Sarah or Maria? Can you tell for certain just from this sentence, without already knowing the answer?"
- **Bridge text [P30]:** "A pronoun must have a clear, single, unambiguous antecedent — when a sentence has two or more possible antecedents (like 'Sarah' and 'Maria,' both female singular nouns the pronoun 'she' could refer to), the reader genuinely cannot determine the intended meaning without additional information. This is a real communication failure, not something 'context makes obvious,' since the writer's inside knowledge isn't available to the reader."
- **Replacement text [P31]:** "Check whether a pronoun has exactly ONE possible antecedent in the sentence — if multiple candidates exist, rewrite the sentence (using a name instead of a pronoun, or restructuring) to eliminate the ambiguity."
- **Discrimination pairs [P33]:**
  - "Sarah told Maria that she had won the award" (ambiguous — "she" could be Sarah or Maria) vs. "Sarah told Maria, 'You won the award'" (unambiguous, rewritten to remove the ambiguous pronoun).
  - "When the plate hit the table, it broke" (ambiguous — "it" could refer to the plate or the table) vs. "The plate broke when it hit the table" (clearer, since "it" now more naturally refers to "the plate," the more recently established subject).
- **s6_path:** "As the writer, you already know which person or thing you mean, so the sentence can feel perfectly clear to you — but a reader without that inside knowledge may genuinely be unable to tell, which is exactly why checking for ambiguous antecedents is a valuable, separate proofreading step."

---

## Component 2 — Prerequisite Diagnostic Block

**PD-1 [P41] — Pronoun readiness**
Prompt: "In 'Maria lost her keys,' identify the pronoun and what it refers to."
- Pass: correctly identifies "her" referring to "Maria" (per `eng.grammar.pronouns`).
- Fail → [P52]: brief pronouns refresher before proceeding. Persistent failure → route to eng.grammar.pronouns for reteaching.

**PD-2 [P41] — Subject-verb-agreement readiness**
Prompt: "Does 'everyone' take 'is' or 'are'?"
- Pass: correctly identifies "is" (per `eng.grammar.subject-verb-agreement`).
- Fail → [P52]: brief subject-verb-agreement refresher before proceeding. Persistent failure → route to eng.grammar.subject-verb-agreement for reteaching.

---

## Component 3 — Concrete Anchor [P06]

**Anchor scene — The antecedent-arrow trace**

> Write a sentence with a pronoun and its antecedent on a card, drawing a physical arrow from the pronoun back to the noun it refers to ("Maria lost her keys" — arrow from "her" to "Maria"). Then present an ambiguous sentence ("Sarah told Maria that she won") and attempt to draw the arrow — showing that TWO possible arrows could be drawn (to Sarah or to Maria), visually demonstrating the ambiguity problem.

---

## Component 4 — Conceptual Development Sequence

**TA-1 — Basic Singular/Plural Pronoun-Antecedent Agreement [C]**

Present sentences with clear singular and plural antecedents; student selects the correctly agreeing pronoun.

**TA-2 — Indefinite Pronoun Antecedents (Singular Status) [C→P]**

Present sentences with indefinite pronoun antecedents (everyone, someone, each); student confirms singular verb agreement first, then selects an appropriately agreeing pronoun (his/her, or singular "their" as an accepted gender-neutral option), directly targeting MC-INDEFINITE-PRONOUNS-ARE-ALWAYS-PLURAL.

**TA-3 — Identifying Ambiguous Pronoun Reference [P]**

Present sentences with genuinely ambiguous pronoun antecedents (two possible referents); student identifies the ambiguity using the antecedent-arrow technique, directly targeting MC-AMBIGUOUS-PRONOUN-REFERENCE-IS-FINE-IF-CONTEXT-SEEMS-CLEAR.

**TA-4 — Correcting Ambiguous Pronoun Reference [P]**

Given an ambiguous sentence, student rewrites it (using a name, restructuring, or adding clarifying detail) to eliminate the ambiguity.

---

## Component 5 — Worked Examples

**WE-1 (Foundational — basic agreement)**

> "Fill in: 'The dog wagged ___ tail.'"

Target response: "its" — singular antecedent "dog."

**WE-2 (Foundational — indefinite pronoun)**

> "Fill in: 'Everyone should bring ___ own lunch.'"

Target response: "their" (or "his or her" in strictly formal contexts) — "everyone" is grammatically singular but commonly paired with gender-neutral "their" in modern standard usage.

**WE-3 (Intermediate — ambiguous reference)**

> "Is this sentence clear? 'When John met Tom, he was nervous.' Who was nervous?"

Target response: ambiguous — "he" could refer to John or Tom; needs rewriting for clarity (e.g., "John was nervous when he met Tom").

---

## Component 6 — Mastery Probe Set

**MP-1 [P36] — Basic agreement, novel example**
"Fill in: 'The students turned in ___ assignments.'"
*Target:* "their" — plural antecedent "students."

**MP-2 [P36] — Indefinite pronoun, novel example**
"Fill in: 'Each employee must submit ___ report by Friday.'"
*Target:* "their" (or "his or her") — "each" is grammatically singular.

**MP-3 [P36] — Identifying ambiguity, novel example**
"Is this clear? 'The manager told the intern that she needed more training.' Who needs more training?"
*Target:* correctly identifies the ambiguity — "she" could refer to the manager or the intern.

**MP-4 [P36] — Correcting ambiguity, novel example**
"Rewrite to fix the ambiguity: 'When the ball hit the window, it shattered.'"
*Target:* a clarified version, e.g., "The window shattered when the ball hit it" (making "it" unambiguously refer to the window).

**MP-5 [P36] — Explain pronoun-antecedent agreement**
"In your own words: are words like 'everyone' singular or plural, and why does an ambiguous pronoun matter even if you know what you meant?"
*Target:* states or demonstrates that indefinite pronouns like "everyone/someone/each" are grammatically singular (confirmed by verb agreement), and that ambiguous pronoun reference is a genuine communication problem since readers lack the writer's inside knowledge of intended meaning.

---

## Component 7 — Session Architecture

```
[P01] Session open — antecedent-arrow trace warm-up (clear example)
  ↓
[P41] PD-1 (pronoun readiness)
  ↓ PASS
[P41] PD-2 (subject-verb-agreement readiness)
  ↓ PASS
[P06] Anchor: antecedent-arrow trace (clear vs. ambiguous — two possible arrows)
  ↓
TA-1: Basic singular/plural pronoun-antecedent agreement [C]
  ↓
TA-2: Indefinite pronoun antecedents (singular status) [C→P]
  ↓
[P28] Conflict: indefinite pronouns assumed plural → MC-INDEFINITE-PRONOUNS-ARE-ALWAYS-PLURAL (if triggered)
  ↓
TA-3: Identifying ambiguous pronoun reference [P]
  ↓
[P28] Conflict: ambiguity dismissed as "obvious from context" → MC-AMBIGUOUS-PRONOUN-REFERENCE-IS-FINE-IF-CONTEXT-SEEMS-CLEAR (if triggered)
  ↓
TA-4: Correcting ambiguous pronoun reference [P]
  ↓
[P51] Check-in WE-1 → WE-2 → WE-3
  ↓
[P36] MP-1 through MP-5 (mastery probe set)
  ↓
[P62] Retrieval seed: "Tomorrow, find one sentence with 'everyone' or 'someone' and check pronoun agreement."
[P68] Session close
[P85] Regulation tail — praise checking verb agreement for indefinite pronouns and scanning for ambiguity
[P89] Retrieval schedule: 1 day, 3 days, 7 days
[P91] Mastery gate: 75%; re-route to Component 3 anchor if below
```

**Protocol routing:** S0 (secure on pronouns/subject-verb-agreement, new to pronoun-antecedent agreement specifically): dwell on TA-1's basic agreement before introducing indefinite-pronoun and ambiguity nuances. S1 (already agrees pronouns correctly in simple cases but writes ambiguous references in longer compositions): focus on TA-3/TA-4, since ambiguous reference is a common issue in more complex, multi-character writing. S6 (frustrated by the singular/plural "logic mismatch" for indefinite pronouns): validate that this is a genuine grammatical convention worth checking via the verb-agreement test, not an inconsistency to feel confused by. S9 (L1 doesn't require pronoun-antecedent number agreement, or handles ambiguous reference differently, e.g. relies more heavily on context/omission): expect indefinite-pronoun agreement and ambiguity-detection to require dedicated, explicit practice, since both rely on English-specific grammatical conventions and proofreading habits that may not transfer directly.

---

## Component 8 — Adaptive Flags

- **Verb-agreement test resolves indefinite-pronoun singular/plural confusion reliably**: teach "check is/are" as the standing diagnostic for any indefinite-pronoun antecedent question.
- **Ambiguity is a genuine communication failure, not a stylistic nitpick**: frame TA-3/TA-4 around the reader's actual inability to determine meaning, not an arbitrary rule — this motivates the proofreading habit more effectively than treating it as a pedantic correctness issue.
- **This is a proofreading skill as much as a grammar rule**: emphasize that catching ambiguous references requires deliberately re-reading one's own writing as if seeing it for the first time, without the writer's inside knowledge.
- **Lower session_cap (4 TAs) reflects the concept's genuine scope**: this is a smaller, single-hour concept per the KG's `estimated_hours: 1` — the TA sequence is proportionally shorter, consistent with the established convention.

---

## Component 9 — Validation Checklist

| Check | Criterion | Status |
|---|---|---|
| V-1 | concept_id matches KG exactly | PASS — eng.grammar.pronoun-antecedent-agreement |
| V-2 | All prerequisites exist in KG and have blueprints | PASS — eng.grammar.pronouns ✓, eng.grammar.subject-verb-agreement ✓ (both authored) |
| V-3 | difficulty label matches KG | PASS — proficient |
| V-4 | bloom level matches KG | PASS — apply |
| V-5 | mastery_threshold matches KG | PASS — 0.75 |
| V-6 | estimated_hours matches KG | PASS — 1h |
| V-7 | ≥ 2 misconceptions in register | PASS — MC-INDEFINITE-PRONOUNS-ARE-ALWAYS-PLURAL, MC-AMBIGUOUS-PRONOUN-REFERENCE-IS-FINE-IF-CONTEXT-SEEMS-CLEAR |
| V-8 | Each MC has all 5 fields | PASS |
| V-9 | ≥ 1 PD block per prerequisite | PASS — PD-1 (pronoun readiness), PD-2 (subject-verb-agreement readiness) |
| V-10 | Concrete anchor present [P06] | PASS — antecedent-arrow trace |
| V-11 | ≥ 4 TAs in development sequence | PASS — TA-1 through TA-4 (concise concept; 4 TAs proportional to 1h estimated duration) |
| V-12 | ≥ 3 worked examples | PASS — WE-1, WE-2, WE-3 |
| V-13 | ≥ 5 mastery probes | PASS — MP-1 through MP-5 |
| V-14 | Session architecture references correct primitives | PASS — P01, P06, P28, P30, P31, P33, P36, P41, P51, P52, P62, P68, P85, P89, P91 |
| V-15 | session_cap correctly set | PASS — 4 TAs |
| V-16 | cpa_entry_stage correctly set | PASS — C (english/grammar domain always concrete/visual) |
| V-17 | Student-state routing covers plausible states | PASS — S0, S1, S6, S9 |
| V-18 | Adaptive flags address subject-specific hazards | PASS — verb-agreement diagnostic, communication-failure framing, proofreading-skill emphasis, proportional scope |
| V-19 | No implementation / framework changes introduced | PASS |
| V-20 | status field set | PASS — READY / PACKAGE_READY |
